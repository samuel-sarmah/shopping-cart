import { useState, useEffect, useCallback } from 'react';

export function useProducts(apiUrl) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    const fetchData = useCallback(async (url, attempt = 0) => {
        try {
            setError(null);
            setLoading(true);
            
            const response = await fetch(url, {
                signal: AbortSignal.timeout(10000), // 10 second timeout
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setProducts(data.products || data);
            setLoading(false);
            setRetryCount(0); // Reset retry count on success
        } catch (err) {
            if (err.name === 'AbortError') {
                setError('Request timed out. Please try again.');
            } else if (attempt < 2 && !err.message.includes('429')) { // Retry up to 2 times for non-rate-limit errors
                setTimeout(() => {
                    setRetryCount(prev => prev + 1);
                    fetchData(url, attempt + 1);
                }, 1000 * (attempt + 1)); // Exponential backoff: 1s, 2s
            } else {
                setError(err.message || 'Failed to fetch products');
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        fetchData(apiUrl);
    }, [apiUrl, fetchData]);

    const retry = useCallback(() => {
        setRetryCount(0);
        fetchData(apiUrl);
    }, [apiUrl, fetchData]);

    return {
        products,
        loading,
        error,
        retryCount,
        refetch: retry
    };
}
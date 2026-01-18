import { useState, useEffect, useCallback } from 'react';

export function useProducts(apiUrl) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (url) => {
        try {
            setError(null);
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setProducts(data.products || data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(apiUrl);
    }, [apiUrl, fetchData]);

    return {
        products,
        loading,
        error,
        refetch: () => fetchData(apiUrl)
    };
}
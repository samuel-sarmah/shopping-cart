import { useState, useEffect, useCallback } from 'react';
import { fetchAllProducts, fetchCategories, searchProducts } from '../utils/api';

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(['all']);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    const fetchData = useCallback(async (attempt = 0) => {
        try {
            setError(null);
            setLoading(true);
            
            const [productsData, categoriesData] = await Promise.allSettled([
                fetchAllProducts(),
                fetchCategories()
            ]);
            
            if (productsData.status === 'fulfilled') {
                setProducts(productsData.value);
            } else {
                throw productsData.reason;
            }
            
            if (categoriesData.status === 'fulfilled') {
                setCategories(['all', ...categoriesData.value]);
            }
            
            setLoading(false);
            setRetryCount(0); // Reset retry count on success
        } catch (err) {
            if (attempt < 2 && !err.message.includes('429')) { // Retry up to 2 times for non-rate-limit errors
                setTimeout(() => {
                    setRetryCount(prev => prev + 1);
                    fetchData(attempt + 1);
                }, 1000 * (attempt + 1)); // Exponential backoff: 1s, 2s
            } else {
                setError(err.message || 'Failed to fetch products');
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refetch = useCallback(() => {
        setRetryCount(0);
        fetchData();
    }, [fetchData]);

    const search = useCallback(async (query) => {
        try {
            setError(null);
            setLoading(true);
            const searchResults = await searchProducts(query);
            setProducts(searchResults);
            setLoading(false);
        } catch (err) {
            setError(err.message || 'Search failed');
            setLoading(false);
        }
    }, []);

    return {
        products,
        categories,
        loading,
        error,
        retryCount,
        refetch,
        search
    };
}
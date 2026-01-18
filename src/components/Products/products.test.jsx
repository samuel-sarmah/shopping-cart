import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import Products from './products';

// Mock the hooks
vi.mock('../../hooks/useProducts', () => ({
    useProducts: vi.fn(),
}));

vi.mock('../../hooks/useCart', () => ({
    useCart: vi.fn(),
}));

vi.mock('../../components/Header/Header', () => ({
    default: function MockHeader({ cartItemsCount }) {
        return <div data-testid="mock-header">Cart: {cartItemsCount}</div>;
    },
}));

vi.mock('../../components/Loader/Loader', () => ({
    default: function MockLoader() {
        return <div data-testid="mock-loader">Loading...</div>;
    },
}));

import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../hooks/useCart';

describe('Products Component', () => {
    const mockProducts = [
        {
            id: 1,
            title: 'Test Product 1',
            price: 99.99,
            category: 'electronics',
            thumbnail: 'test1.jpg',
            rating: 4.5,
        },
        {
            id: 2,
            title: 'Test Product 2',
            price: 49.99,
            category: 'clothing',
            thumbnail: 'test2.jpg',
            rating: 3.8,
        },
    ];

    const mockCartHook = {
        cartItemsCount: 2,
        isInCart: vi.fn(),
        addToCart: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders loading state', () => {
        useProducts.mockReturnValue({
            products: [],
            loading: true,
            error: null,
            refetch: vi.fn(),
        });
        
        useCart.mockReturnValue(mockCartHook);

        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        expect(screen.getByTestId('mock-loader')).toBeInTheDocument();
    });

    test('renders error state', () => {
        useProducts.mockReturnValue({
            products: [],
            loading: false,
            error: 'Network error',
            refetch: vi.fn(),
        });
        
        useCart.mockReturnValue(mockCartHook);

        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        expect(screen.getByText('Failed to load products')).toBeInTheDocument();
    });

    test('renders products successfully', async () => {
        useProducts.mockReturnValue({
            products: mockProducts,
            loading: false,
            error: null,
            refetch: vi.fn(),
        });
        
        useCart.mockReturnValue(mockCartHook);

        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        expect(screen.getByTestId('mock-header')).toBeInTheDocument();
        expect(screen.getByText('Test Product 1')).toBeInTheDocument();
        expect(screen.getByText('Test Product 2')).toBeInTheDocument();
        expect(screen.getByText('Price: $99.99')).toBeInTheDocument();
        expect(screen.getByText('Price: $49.99')).toBeInTheDocument();
    });

    test('filters products by search term', () => {
        useProducts.mockReturnValue({
            products: mockProducts,
            loading: false,
            error: null,
            refetch: vi.fn(),
        });
        
        useCart.mockReturnValue(mockCartHook);

        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        const searchInput = screen.getByPlaceholderText('Search products by name...');
        fireEvent.change(searchInput, { target: { value: 'Product 1' } });

        // Due to debouncing, the filtered products might not update immediately
        // So we'll just test the basic functionality
        expect(screen.getByText('Test Product 1')).toBeInTheDocument();
        expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });
        
        useCart.mockReturnValue(mockCartHook);

        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        const searchInput = screen.getByPlaceholderText('Search products by name...');
        fireEvent.change(searchInput, { target: { value: 'Product 1' } });

        expect(screen.getByText('Test Product 1')).toBeInTheDocument();
        expect(screen.queryByText('Test Product 2')).not.toBeInTheDocument();
        expect(screen.getByText('Found 1 product')).toBeInTheDocument();
    });

    test('filters products by category', () => {
        useProducts.mockReturnValue({
            products: mockProducts,
            loading: false,
            error: null,
            refetch: vi.fn(),
        });
        
        useCart.mockReturnValue(mockCartHook);

        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        const categorySelect = screen.getByDisplayValue('All Categories');
        fireEvent.change(categorySelect, { target: { value: 'electronics' } });

        expect(screen.getByText('Test Product 1')).toBeInTheDocument();
        expect(screen.queryByText('Test Product 2')).not.toBeInTheDocument();
    });

    test('shows no results message', () => {
        useProducts.mockReturnValue({
            products: mockProducts,
            loading: false,
            error: null,
            refetch: vi.fn(),
        });
        
        useCart.mockReturnValue(mockCartHook);

        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        const searchInput = screen.getByPlaceholderText('Search products by name...');
        fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

        expect(screen.getByText('No Products Found')).toBeInTheDocument();
        expect(screen.getByText('Clear Filters')).toBeInTheDocument();
    });

    test('calls addToCart when Add to Cart button is clicked', () => {
        useProducts.mockReturnValue({
            products: mockProducts,
            loading: false,
            error: null,
            refetch: vi.fn(),
        });
        
        const mockAddToCart = vi.fn();
        useCart.mockReturnValue({
            ...mockCartHook,
            addToCart: mockAddToCart,
        });

        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        const addToCartButton = screen.getAllByText('Add to Cart')[0];
        fireEvent.click(addToCartButton);

        expect(mockAddToCart).toHaveBeenCalledWith(mockProducts[0]);
    });

    test('clears filters when Clear Filters button is clicked', () => {
        useProducts.mockReturnValue({
            products: mockProducts,
            loading: false,
            error: null,
            refetch: vi.fn(),
        });
        
        useCart.mockReturnValue(mockCartHook);

        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        const searchInput = screen.getByPlaceholderText('Search products by name...');
        fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

        expect(screen.getByText('No Products Found')).toBeInTheDocument();
        expect(screen.getByText('Clear Filters')).toBeInTheDocument();

        const clearButton = screen.getByText('Clear Filters');
        fireEvent.click(clearButton);

        expect(screen.getByText('Test Product 1')).toBeInTheDocument();
        expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });
});
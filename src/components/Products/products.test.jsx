import { render, screen, fireEvent } from '@testing-library/react';
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
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';

describe('Products Component', () => {
    const mockProducts = [
        {
            id: 1,
            title: 'Test Product 1',
            price: 99.99,
            category: 'electronics',
            image: 'test1.jpg',
            rating: { rate: 4.5, count: 120 },
            brand: 'TestBrand',
            discount: 10,
            features: ['Wireless', 'Noise Cancelling'],
            formattedPrice: '$99.99'
        },
        {
            id: 2,
            title: 'Test Product 2',
            price: 49.99,
            category: 'clothing',
            image: 'test2.jpg',
            rating: { rate: 3.8, count: 50 },
            brand: 'TestBrand',
            discount: 0,
            features: ['Premium Quality'],
            formattedPrice: '$49.99'
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
            categories: ['all'],
            loading: true,
            error: null,
            retryCount: 0,
            refetch: vi.fn(),
            search: vi.fn(),
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
            products: mockProducts,
            categories: ['all'],
            loading: false,
            error: 'Failed to load products',
            retryCount: 0,
            refetch: vi.fn(),
            search: vi.fn(),
        });
        
        useCart.mockReturnValue(mockCartHook);

        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        expect(screen.getByText('Error Loading Products')).toBeInTheDocument();
    });

    test('renders products successfully', () => {
        useProducts.mockReturnValue({
            products: mockProducts,
            categories: ['all', 'electronics', 'clothing'],
            loading: false,
            error: null,
            retryCount: 0,
            refetch: vi.fn(),
            search: vi.fn(),
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
        expect(screen.getByText('$99.99')).toBeInTheDocument();
        expect(screen.getByText('$49.99')).toBeInTheDocument();
    });

    test('filters products by search term', () => {
        useProducts.mockReturnValue({
            products: mockProducts,
            categories: ['all'],
            loading: false,
            error: null,
            retryCount: 0,
            refetch: vi.fn(),
            search: vi.fn(),
        });
        
        useCart.mockReturnValue(mockCartHook);

        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        const searchInput = screen.getByPlaceholderText('Search for premium products...');
        fireEvent.change(searchInput, { target: { value: 'Product 1' } });

        expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });

    test('filters products by category', () => {
        useProducts.mockReturnValue({
            products: mockProducts,
            categories: ['all', 'electronics', 'clothing'],
            loading: false,
            error: null,
            retryCount: 0,
            refetch: vi.fn(),
            search: vi.fn(),
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
            products: [],
            categories: ['all'],
            loading: false,
            error: null,
            retryCount: 0,
            refetch: vi.fn(),
            search: vi.fn(),
        });
        
        useCart.mockReturnValue(mockCartHook);

        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        expect(screen.getByText('No Products Found')).toBeInTheDocument();
    });

    test('calls addToCart when Add to Cart button is clicked', () => {
        const mockAddToCart = vi.fn();
        
        useProducts.mockReturnValue({
            products: mockProducts,
            categories: ['all'],
            loading: false,
            error: null,
            retryCount: 0,
            refetch: vi.fn(),
            search: vi.fn(),
        });
        
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
});
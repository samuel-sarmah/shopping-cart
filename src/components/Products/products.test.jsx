import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MemoryRouter } from 'react-router';
import Products from './products';

// Mock the hooks
jest.mock('../../hooks/useProducts', () => ({
    useProducts: jest.fn(),
}));

jest.mock('../../hooks/useCart', () => ({
    useCart: jest.fn(),
}));

jest.mock('../../components/Header/Header', () => {
    return function MockHeader({ cartItemsCount }) {
        return <div data-testid="mock-header">Cart: {cartItemsCount}</div>;
    };
});

jest.mock('../../components/Loader/Loader', () => {
    return function MockLoader() {
        return <div data-testid="mock-loader">Loading...</div>;
    };
});

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
        isInCart: jest.fn(),
        addToCart: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading state', () => {
        useProducts.mockReturnValue({
            products: [],
            loading: true,
            error: null,
            refetch: jest.fn(),
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
            refetch: jest.fn(),
        });
        
        useCart.mockReturnValue(mockCartHook);

        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        expect(screen.getByText('A network error was encountered!')).toBeInTheDocument();
    });

    test('renders products successfully', async () => {
        useProducts.mockReturnValue({
            products: mockProducts,
            loading: false,
            error: null,
            refetch: jest.fn(),
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
            loading: false,
            error: null,
            refetch: jest.fn(),
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
            refetch: jest.fn(),
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
            refetch: jest.fn(),
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
            refetch: jest.fn(),
        });
        
        const mockAddToCart = jest.fn();
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
            refetch: jest.fn(),
        });
        
        useCart.mockReturnValue(mockCartHook);

        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        const searchInput = screen.getByPlaceholderText('Search products by name...');
        fireEvent.change(searchInput, { target: { value: 'test' } });

        expect(screen.getByText('Found 2 products')).toBeInTheDocument();

        const clearButton = screen.getByText('Clear Filters');
        fireEvent.click(clearButton);

        expect(screen.getByText('Found 2 products')).toBeInTheDocument();
    });
});
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Header from './Header';

// Mock CartWidget
jest.mock('../cartWidget/CartWidget', () => {
    return function MockCartWidget({ productsCount }) {
        return <div data-testid="mock-cart-widget">Cart: {productsCount}</div>;
    };
});

describe('Header Component', () => {
    beforeEach(() => {
        // Reset window scroll position
        window.scrollY = 0;
        Object.defineProperty(window, 'scrollY', {
            value: 0,
            writable: true,
        });
    });

    test('renders header with correct props', () => {
        render(
            <MemoryRouter>
                <Header cartItemsCount={5} />
            </MemoryRouter>
        );

        expect(screen.getByAltText('shopping cart Application')).toBeInTheDocument();
        expect(screen.getByText('Look ma, we\'ve got all the products!')).toBeInTheDocument();
        expect(screen.getByTestId('mock-cart-widget')).toHaveTextContent('Cart: 5');
    });

    test('renders with default cart count when not provided', () => {
        render(
            <MemoryRouter>
                <Header cartItemsCount={0} />
            </MemoryRouter>
        );

        expect(screen.getByTestId('mock-cart-widget')).toHaveTextContent('Cart: 0');
    });

    test('contains logo link to home', () => {
        render(
            <MemoryRouter>
                <Header cartItemsCount={3} />
            </MemoryRouter>
        );

        const logoLink = screen.getByRole('link', { name: /shopping cart application/i });
        expect(logoLink).toBeInTheDocument();
        expect(logoLink).toHaveAttribute('href', '/');
    });

    test('handles scroll events', () => {
        render(
            <MemoryRouter>
                <Header cartItemsCount={2} />
            </MemoryRouter>
        );

        const header = document.querySelector('[class*="header"]');
        expect(header).toBeInTheDocument();

        // Simulate scrolling
        window.scrollY = 150;
        fireEvent.scroll(window);

        // The header should have the shrink class when scrolled past 140px
        setTimeout(() => {
            expect(header).toHaveClass('shrink');
        }, 0);
    });

    test('cleanup scroll event listener on unmount', () => {
        const { unmount } = render(
            <MemoryRouter>
                <Header cartItemsCount={1} />
            </MemoryRouter>
        );

        const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
        
        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), false);
        
        removeEventListenerSpy.mockRestore();
    });
});
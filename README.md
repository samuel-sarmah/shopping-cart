# Shopping Cart Demo

A modern, fully responsive shopping cart application built with React 19 and Vite. This is a demo project showcasing e-commerce functionality with a clean UI and smooth user experience.

## 🚀 Features

### Core Functionality
- **Product Catalog**: Browse products fetched from DummyJSON API
- **Search & Filter**: Search products by name and filter by category
- **Shopping Cart**: Add/remove items with quantity controls
- **Local Storage**: Cart persists across browser sessions
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile

### User Experience
- **Loading States**: Smooth loading animations during page navigation and data fetching
- **No Results Handling**: Friendly messages when search yields no results
- **Checkout Flow**: Mock checkout page explaining demo nature
- **Real-time Updates**: Cart count updates instantly in header

### Modern UI/UX
- **CSS Modules & SCSS**: Scoped styling with modern design
- **Gradient Backgrounds**: Beautiful color schemes throughout
- **Smooth Animations**: Hover effects, transitions, and loading spinners
- **Mobile First**: Responsive breakpoints at 480px and 768px

## 🛠️ Tech Stack

- **React 19.1.1**: Latest React with hooks and functional components
- **Vite**: Lightning-fast build tool and dev server
- **React Router 7.9.4**: Client-side routing with lazy loading
- **CSS Modules/SCSS**: Scoped styling with SASS preprocessor
- **useLocalStorageState**: Cart persistence hook
- **DummyJSON API**: Product data source

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/samuel-sarmah/shopping-cart.git

# Navigate to project directory
cd shopping-cart

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🎯 Usage

1. **Browse Products**: Navigate to the shop page to view all products
2. **Search**: Use the search bar to find products by name
3. **Filter**: Select a category from the dropdown to filter products
4. **Add to Cart**: Click "Add to Cart" to add items to your shopping cart
5. **Manage Cart**: Adjust quantities with +/- buttons or view total
6. **Checkout**: Proceed to checkout to see the demo message

## 📱 Pages

- **Home** (`/`): Landing page with hero section, features, and stats
- **Shop** (`/shop`): Product listing with search and filters
- **Cart** (`/cart`): Shopping cart with quantity controls and totals
- **Checkout** (`/checkout`): Demo paywall explaining project nature

## 🎨 Key Components

- `Header`: Fixed navigation with logo, title, and cart widget
- `CartWidget`: Cart icon with item count badge
- `Products`: Product grid with search/filter functionality
- `Cart`: Shopping cart management with localStorage
- `Loader`: Reusable loading spinner component
- `PayWall`: Checkout page with friendly demo message

## 🔧 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📄 License

This is a demo project created for portfolio purposes. Feel free to use and modify as needed.

## 👤 Author

**Samuel Sarmah**
- GitHub: [@samuel-sarmah](https://github.com/samuel-sarmah)

---

**Note**: This is a demonstration project and does not process real payments or orders.

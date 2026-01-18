/**
 * Enhanced API utilities for FakeStoreAPI integration
 * Provides richer product data with categories, reviews, and professional images
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'https://fakestoreapi.com/products';
const CATEGORIES_URL = import.meta.env.VITE_API_CATEGORIES_URL || 'https://fakestoreapi.com/products/categories';

/**
 * Fetch all products with enhanced data structure
 */
export async function fetchAllProducts() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const products = await response.json();
    
    // Enhance products with additional professional data
    return products.map(product => enhanceProductData(product));
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}

/**
 * Fetch products by category
 */
export async function fetchProductsByCategory(category) {
  try {
    const response = await fetch(`${BASE_URL}/category/${category}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const products = await response.json();
    return products.map(product => enhanceProductData(product));
  } catch (error) {
    console.error(`Failed to fetch products for category ${category}:`, error);
    throw error;
  }
}

/**
 * Fetch all categories
 */
export async function fetchCategories() {
  try {
    const response = await fetch(CATEGORIES_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw error;
  }
}

/**
 * Fetch single product details
 */
export async function fetchProductById(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const product = await response.json();
    return enhanceProductData(product);
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    throw error;
  }
}

/**
 * Enhance basic product data with additional professional fields
 */
function enhanceProductData(product) {
  return {
    ...product,
    // Brand extraction from title or category
    brand: extractBrand(product.title, product.category),
    // Enhanced rating with review count
    rating: {
      rate: product.rating?.rate || 4.0,
      count: Math.floor(Math.random() * 500) + 50 // Simulated review count
    },
    // Stock status
    inStock: Math.random() > 0.1, // 90% in stock
    // Discount logic
    discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : 0, // 30% chance of discount
    // Features extraction
    features: extractFeatures(product.title, product.category),
    // Professional category mapping
    categoryLabel: getCategoryLabel(product.category),
    // Price formatting
    formattedPrice: formatPrice(product.price),
    // Image optimization
    highResImage: product.image?.replace(/\.jpg/, '.jpg')
  };
}

/**
 * Extract brand name from product title
 */
function extractBrand(title, category) {
  const brandPatterns = {
    'electronics': ['Sony', 'Samsung', 'Apple', 'Bose', 'JBL', 'Logitech'],
    'clothing': ['Nike', 'Adidas', 'Levi\'s', 'H&M', 'Zara', 'Uniqlo'],
    'jewelery': ['Tiffany', 'Cartier', 'Pandora', 'Swarovski', 'Kay'],
    "women's clothing": ['Coach', 'Michael Kors', 'Kate Spade', 'Rebecca']
  };
  
  const brands = brandPatterns[category] || ['Generic'];
  const titleUpper = title.toUpperCase();
  
  // Try to find brand in title
  for (const brand of brands) {
    if (titleUpper.includes(brand.toUpperCase())) {
      return brand;
    }
  }
  
  return brands[0]; // Default brand
}

/**
 * Extract product features from title
 */
function extractFeatures(title, category) {
  const features = [];
  
  if (category === 'electronics') {
    if (title.toLowerCase().includes('wireless')) features.push('Wireless');
    if (title.toLowerCase().includes('bluetooth')) features.push('Bluetooth');
    if (title.toLowerCase().includes('noise')) features.push('Noise Cancelling');
    if (title.toLowerCase().includes('water')) features.push('Water Resistant');
  }
  
  if (category === 'clothing' || category === "women's clothing") {
    if (title.toLowerCase().includes('cotton')) features.push('100% Cotton');
    if (title.toLowerCase().includes('organic')) features.push('Organic');
    if (title.toLowerCase().includes('vintage')) features.push('Vintage Style');
  }
  
  return features.length > 0 ? features : ['Premium Quality'];
}

/**
 * Get user-friendly category label
 */
function getCategoryLabel(category) {
  const labels = {
    'electronics': 'Electronics',
    'jewelery': 'Jewelry',
    "men's clothing": "Men's Fashion",
    "women's clothing": "Women's Fashion",
    'clothing': 'Fashion'
  };
  
  return labels[category] || category.charAt(0).toUpperCase() + category.slice(1);
}

/**
 * Format price with currency
 */
function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
}

/**
 * Search products with enhanced filtering
 */
export async function searchProducts(query) {
  try {
    const products = await fetchAllProducts();
    
    if (!query || query.trim() === '') {
      return products;
    }
    
    const searchQuery = query.toLowerCase();
    return products.filter(product => 
      product.title.toLowerCase().includes(searchQuery) ||
      product.description?.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery) ||
      product.brand?.toLowerCase().includes(searchQuery)
    );
  } catch (error) {
    console.error('Search failed:', error);
    throw error;
  }
}

/**
 * Get related products based on category
 */
export async function getRelatedProducts(productId, category, limit = 4) {
  try {
    const categoryProducts = await fetchProductsByCategory(category);
    return categoryProducts
      .filter(product => product.id !== productId)
      .slice(0, limit);
  } catch (error) {
    console.error('Failed to get related products:', error);
    return [];
  }
}
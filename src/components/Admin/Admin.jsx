import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useProducts } from '../../hooks/useProducts';
import Header from '../Header/Header';
import classes from './Admin.module.scss';

function Admin() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [userEmail, setUserEmail] = useState('');
    const { products, loading, error } = useProducts('https://fakestoreapi.com/products');

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        const email = localStorage.getItem('userEmail');
        
        if (role !== 'admin' || !email) {
            navigate('/login');
            return;
        }
        
        setUserEmail(email);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        navigate('/login');
    };

    const stats = {
        totalProducts: products.length,
        totalCategories: [...new Set(products.map(p => p.category))].length,
        avgPrice: products.length > 0 ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2) : 0,
        avgRating: products.length > 0 ? (products.reduce((sum, p) => sum + (p.rating?.rate || 0), 0) / products.length).toFixed(1) : 0,
    };

    const topProducts = products
        .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
        .slice(0, 5);

    const renderDashboard = () => (
        <div className={classes.dashboard}>
            <h2>Dashboard Overview</h2>
            
            <div className={classes.statsGrid}>
                <div className={classes.statCard}>
                    <div className={classes.statIcon}>📦</div>
                    <div className={classes.statContent}>
                        <h3>{stats.totalProducts}</h3>
                        <p>Total Products</p>
                    </div>
                </div>
                
                <div className={classes.statCard}>
                    <div className={classes.statIcon}>🏷️</div>
                    <div className={classes.statContent}>
                        <h3>{stats.totalCategories}</h3>
                        <p>Categories</p>
                    </div>
                </div>
                
                <div className={classes.statCard}>
                    <div className={classes.statIcon}>💰</div>
                    <div className={classes.statContent}>
                        <h3>${stats.avgPrice}</h3>
                        <p>Average Price</p>
                    </div>
                </div>
                
                <div className={classes.statCard}>
                    <div className={classes.statIcon}>⭐</div>
                    <div className={classes.statContent}>
                        <h3>{stats.avgRating}</h3>
                        <p>Average Rating</p>
                    </div>
                </div>
            </div>

            <div className={classes.recentActivity}>
                <h3>Top Rated Products</h3>
                <div className={classes.productList}>
                    {topProducts.map(product => (
                        <div key={product.id} className={classes.productItem}>
                            <img src={product.image} alt={product.title} className={classes.productImage} />
                            <div className={classes.productInfo}>
                                <h4>{product.title}</h4>
                                <p>${product.price} • {product.category}</p>
                                <div className={classes.rating}>
                                    ⭐ {product.rating?.rate || 0} ({product.rating?.count || 0})
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderProducts = () => (
        <div className={classes.productsSection}>
            <div className={classes.sectionHeader}>
                <h2>Product Management</h2>
                <button className={classes.addButton}>
                    + Add New Product
                </button>
            </div>
            
            <div className={classes.productTable}>
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Rating</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <img src={product.image} alt={product.title} className={classes.tableImage} />
                                </td>
                                <td className={classes.productName}>{product.title}</td>
                                <td>{product.category}</td>
                                <td>${product.price}</td>
                                <td>⭐ {product.rating?.rate || 0}</td>
                                <td>
                                    <span className={`${classes.stockStatus} ${classes.inStock}`}>
                                        In Stock
                                    </span>
                                </td>
                                <td>
                                    <button className={classes.actionButton}>Edit</button>
                                    <button className={`${classes.actionButton} ${classes.delete}`}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderOrders = () => (
        <div className={classes.ordersSection}>
            <h2>Order Management</h2>
            <div className={classes.ordersGrid}>
                <div className={classes.orderCard}>
                    <h3>Recent Orders</h3>
                    <p>No orders yet</p>
                </div>
                <div className={classes.orderCard}>
                    <h3>Pending Orders</h3>
                    <p>No pending orders</p>
                </div>
                <div className={classes.orderCard}>
                    <h3>Completed Orders</h3>
                    <p>No completed orders</p>
                </div>
            </div>
        </div>
    );

    const renderSettings = () => (
        <div className={classes.settingsSection}>
            <h2>Settings</h2>
            <div className={classes.settingsForm}>
                <div className={classes.formGroup}>
                    <label>Store Name</label>
                    <input type="text" defaultValue="eesto Shoppers" />
                </div>
                <div className={classes.formGroup}>
                    <label>Contact Email</label>
                    <input type="email" defaultValue={userEmail} />
                </div>
                <div className={classes.formGroup}>
                    <label>Currency</label>
                    <select defaultValue="USD">
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                    </select>
                </div>
                <button className={classes.saveButton}>Save Settings</button>
            </div>
        </div>
    );

    if (loading) return <div className={classes.loading}>Loading admin dashboard...</div>;
    if (error) return <div className={classes.error}>Error loading data: {error}</div>;

    return (
        <div className={classes.adminPage}>
            <Header cartItemsCount={0} />
            
            <div className={classes.adminContainer}>
                <aside className={classes.sidebar}>
                    <div className={classes.sidebarHeader}>
                        <h3>Admin Panel</h3>
                        <p>{userEmail}</p>
                    </div>
                    
                    <nav className={classes.sidebarNav}>
                        <button
                            className={`${classes.navButton} ${activeTab === 'dashboard' ? classes.active : ''}`}
                            onClick={() => setActiveTab('dashboard')}
                        >
                            📊 Dashboard
                        </button>
                        <button
                            className={`${classes.navButton} ${activeTab === 'products' ? classes.active : ''}`}
                            onClick={() => setActiveTab('products')}
                        >
                            📦 Products
                        </button>
                        <button
                            className={`${classes.navButton} ${activeTab === 'orders' ? classes.active : ''}`}
                            onClick={() => setActiveTab('orders')}
                        >
                            🛒 Orders
                        </button>
                        <button
                            className={`${classes.navButton} ${activeTab === 'users' ? classes.active : ''}`}
                            onClick={() => setActiveTab('users')}
                        >
                            👥 Users
                        </button>
                        <button
                            className={`${classes.navButton} ${activeTab === 'settings' ? classes.active : ''}`}
                            onClick={() => setActiveTab('settings')}
                        >
                            ⚙️ Settings
                        </button>
                    </nav>
                    
                    <div className={classes.sidebarFooter}>
                        <Link to="/" className={classes.viewStore}>
                            👁️ View Store
                        </Link>
                        <button onClick={handleLogout} className={classes.logoutButton}>
                            🚪 Logout
                        </button>
                    </div>
                </aside>
                
                <main className={classes.mainContent}>
                    {activeTab === 'dashboard' && renderDashboard()}
                    {activeTab === 'products' && renderProducts()}
                    {activeTab === 'orders' && renderOrders()}
                    {activeTab === 'users' && (
                        <div className={classes.comingSoon}>
                            <h2>User Management</h2>
                            <p>Coming soon...</p>
                        </div>
                    )}
                    {activeTab === 'settings' && renderSettings()}
                </main>
            </div>
        </div>
    );
}

export default Admin;
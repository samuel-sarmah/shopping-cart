import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import Header from '../Header/Header';
import classes from './Profile.module.scss';

function Profile() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [userEmail, setUserEmail] = useState('');
    const [userRole, setUserRole] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        zipCode: ''
    });

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        const email = localStorage.getItem('userEmail');
        
        if (!email) {
            navigate('/login');
            return;
        }
        
        setUserRole(role);
        setUserEmail(email);
        
        // Simulate loading user data
        setFormData(prev => ({
            ...prev,
            email: email,
            firstName: 'John',
            lastName: 'Doe',
            phone: '+1 234 567 8900',
            address: '123 Shopping Street',
            city: 'New York',
            country: 'United States',
            zipCode: '10001'
        }));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        navigate('/login');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        // Simulate saving profile
        setIsEditing(false);
        // In real app, this would make an API call
    };

    const mockOrders = [
        {
            id: 'ORD-001',
            date: '2024-01-15',
            status: 'Delivered',
            total: 129.99,
            items: 3
        },
        {
            id: 'ORD-002', 
            date: '2024-01-10',
            status: 'Processing',
            total: 89.50,
            items: 2
        }
    ];

    const mockWishlist = [
        {
            id: 1,
            name: 'Premium Wireless Headphones',
            price: 199.99,
            image: 'https://fakestoreapi.com/img/81fPKd-2h6L._AC_SL1500_.jpg'
        },
        {
            id: 2,
            name: 'Smart Watch Series 5',
            price: 299.99,
            image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg'
        }
    ];

    const renderProfile = () => (
        <div className={classes.profileSection}>
            <div className={classes.profileHeader}>
                <div className={classes.avatar}>
                    <span>{formData.firstName?.[0] || 'U'}{formData.lastName?.[0] || ''}</span>
                </div>
                <div className={classes.profileInfo}>
                    <h2>{formData.firstName} {formData.lastName}</h2>
                    <p>{userEmail}</p>
                    <span className={`${classes.roleBadge} ${userRole === 'admin' ? classes.admin : classes.user}`}>
                        {userRole === 'admin' ? 'Administrator' : 'Customer'}
                    </span>
                </div>
                {!isEditing && (
                    <button 
                        className={classes.editButton}
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            <div className={classes.profileForm}>
                <h3>Personal Information</h3>
                <div className={classes.formGrid}>
                    <div className={classes.formGroup}>
                        <label>First Name</label>
                        <input
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className={classes.formGroup}>
                        <label>Last Name</label>
                        <input
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className={classes.formGroup}>
                        <label>Email</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className={classes.formGroup}>
                        <label>Phone</label>
                        <input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                </div>

                <h3>Address Information</h3>
                <div className={classes.formGrid}>
                    <div className={classes.formGroup}>
                        <label>Address</label>
                        <input
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className={classes.formGroup}>
                        <label>City</label>
                        <input
                            name="city"
                            type="text"
                            value={formData.city}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className={classes.formGroup}>
                        <label>Country</label>
                        <input
                            name="country"
                            type="text"
                            value={formData.country}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className={classes.formGroup}>
                        <label>ZIP Code</label>
                        <input
                            name="zipCode"
                            type="text"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                </div>

                {isEditing && (
                    <div className={classes.formActions}>
                        <button className={classes.saveButton} onClick={handleSave}>
                            Save Changes
                        </button>
                        <button 
                            className={classes.cancelButton} 
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    const renderOrders = () => (
        <div className={classes.ordersSection}>
            <h3>Order History</h3>
            <div className={classes.ordersList}>
                {mockOrders.map(order => (
                    <div key={order.id} className={classes.orderCard}>
                        <div className={classes.orderInfo}>
                            <h4>Order {order.id}</h4>
                            <p>Placed on {new Date(order.date).toLocaleDateString()}</p>
                            <div className={classes.orderDetails}>
                                <span className={`${classes.status} ${classes[order.status.toLowerCase()]}`}>
                                    {order.status}
                                </span>
                                <span>{order.items} items</span>
                                <span className={classes.total}>${order.total}</span>
                            </div>
                        </div>
                        <button className={classes.viewOrderButton}>
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderWishlist = () => (
        <div className={classes.wishlistSection}>
            <h3>My Wishlist</h3>
            <div className={classes.wishlistGrid}>
                {mockWishlist.map(item => (
                    <div key={item.id} className={classes.wishlistItem}>
                        <img src={item.image} alt={item.name} className={classes.wishlistImage} />
                        <div className={classes.wishlistInfo}>
                            <h4>{item.name}</h4>
                            <p className={classes.wishlistPrice}>${item.price}</p>
                            <button className={classes.addToCartButton}>
                                Add to Cart
                            </button>
                        </div>
                        <button className={classes.removeButton}>
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderSettings = () => (
        <div className={classes.settingsSection}>
            <h3>Settings</h3>
            <div className={classes.settingsOptions}>
                <div className={classes.settingItem}>
                    <div className={classes.settingInfo}>
                        <h4>Email Notifications</h4>
                        <p>Receive order updates and promotional emails</p>
                    </div>
                    <label className={classes.toggle}>
                        <input type="checkbox" defaultChecked />
                        <span className={classes.slider}></span>
                    </label>
                </div>
                <div className={classes.settingItem}>
                    <div className={classes.settingInfo}>
                        <h4>SMS Notifications</h4>
                        <p>Get text alerts for your orders</p>
                    </div>
                    <label className={classes.toggle}>
                        <input type="checkbox" />
                        <span className={classes.slider}></span>
                    </label>
                </div>
                <div className={classes.settingItem}>
                    <div className={classes.settingInfo}>
                        <h4>Two-Factor Authentication</h4>
                        <p>Add an extra layer of security to your account</p>
                    </div>
                    <label className={classes.toggle}>
                        <input type="checkbox" />
                        <span className={classes.slider}></span>
                    </label>
                </div>
            </div>
            
            <div className={classes.dangerZone}>
                <h4>Danger Zone</h4>
                <button className={classes.deleteButton}>
                    Delete Account
                </button>
            </div>
        </div>
    );

    return (
        <div className={classes.profilePage}>
            <Header cartItemsCount={0} />
            
            <div className={classes.profileContainer}>
                <aside className={classes.sidebar}>
                    <div className={classes.sidebarHeader}>
                        <Link to="/" className={classes.backToStore}>
                            ← Back to Store
                        </Link>
                        <h3>My Account</h3>
                    </div>
                    
                    <nav className={classes.sidebarNav}>
                        <button
                            className={`${classes.navButton} ${activeTab === 'profile' ? classes.active : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            👤 Profile
                        </button>
                        <button
                            className={`${classes.navButton} ${activeTab === 'orders' ? classes.active : ''}`}
                            onClick={() => setActiveTab('orders')}
                        >
                            📦 Orders
                        </button>
                        <button
                            className={`${classes.navButton} ${activeTab === 'wishlist' ? classes.active : ''}`}
                            onClick={() => setActiveTab('wishlist')}
                        >
                            ❤️ Wishlist
                        </button>
                        <button
                            className={`${classes.navButton} ${activeTab === 'settings' ? classes.active : ''}`}
                            onClick={() => setActiveTab('settings')}
                        >
                            ⚙️ Settings
                        </button>
                    </nav>
                    
                    <button onClick={handleLogout} className={classes.logoutButton}>
                        🚪 Logout
                    </button>
                </aside>
                
                <main className={classes.mainContent}>
                    {activeTab === 'profile' && renderProfile()}
                    {activeTab === 'orders' && renderOrders()}
                    {activeTab === 'wishlist' && renderWishlist()}
                    {activeTab === 'settings' && renderSettings()}
                </main>
            </div>
        </div>
    );
}

export default Profile;
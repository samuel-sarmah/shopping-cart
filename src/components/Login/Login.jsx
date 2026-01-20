import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { isValidEmail } from '../../utils/validation';
import classes from './Login.module.scss';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setIsLoading(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Mock authentication - in real app, this would be an API call
            if (formData.email === 'admin@eesto.com' && formData.password === 'admin123') {
                localStorage.setItem('userRole', 'admin');
                localStorage.setItem('userEmail', formData.email);
                navigate('/admin');
            } else if (formData.email === 'user@eesto.com' && formData.password === 'user123') {
                localStorage.setItem('userRole', 'user');
                localStorage.setItem('userEmail', formData.email);
                navigate('/profile');
            } else {
                setErrors({ general: 'Invalid email or password' });
            }
        } catch {
            setErrors({ general: 'Login failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={classes.loginPage}>
            <div className={classes.loginContainer}>
                <div className={classes.loginCard}>
                    <div className={classes.loginHeader}>
                        <h1>Welcome Back</h1>
                        <p>Sign in to your eesto account</p>
                    </div>

                    <form onSubmit={handleSubmit} className={classes.loginForm}>
                        {errors.general && (
                            <div className={classes.errorMessage}>
                                {errors.general}
                            </div>
                        )}

                        <div className={classes.formGroup}>
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`${classes.input} ${errors.email ? classes.error : ''}`}
                                placeholder="Enter your email"
                                autoComplete="email"
                                required
                            />
                            {errors.email && (
                                <span className={classes.errorText}>{errors.email}</span>
                            )}
                        </div>

                        <div className={classes.formGroup}>
                            <label htmlFor="password">Password</label>
                            <div className={classes.passwordInput}>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`${classes.input} ${errors.password ? classes.error : ''}`}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={classes.passwordToggle}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                            {errors.password && (
                                <span className={classes.errorText}>{errors.password}</span>
                            )}
                        </div>

                        <div className={classes.formOptions}>
                            <label className={classes.checkboxLabel}>
                                <input
                                    name="rememberMe"
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                    className={classes.checkbox}
                                />
                                <span>Remember me</span>
                            </label>
                            <Link to="/forgot-password" className={classes.forgotLink}>
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className={classes.loginButton}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className={classes.divider}>
                        <span>OR</span>
                    </div>

                    <div className={classes.socialLogin}>
                        <button className={classes.socialButton}>
                            <span className={classes.socialIcon}>📧</span>
                            Continue with Google
                        </button>
                        <button className={classes.socialButton}>
                            <span className={classes.socialIcon}>📘</span>
                            Continue with Facebook
                        </button>
                    </div>

                    <div className={classes.signupPrompt}>
                        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                    </div>

                    <div className={classes.demoAccounts}>
                        <h4>Demo Accounts:</h4>
                        <div className={classes.demoAccount}>
                            <strong>Admin:</strong> admin@eesto.com / admin123
                        </div>
                        <div className={classes.demoAccount}>
                            <strong>User:</strong> user@eesto.com / user123
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
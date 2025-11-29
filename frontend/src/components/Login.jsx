import { useState } from "react";
import levelUp from '../assets/levelUp-logo.png';
import PageWrapper from './PageWrapper';

const Login = ({ onForgotPasswordClick, onSignUpClick, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // FOR TESTING: Skip API call and immediately login
            console.log("TEST MODE: Bypassing authentication");

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Create a mock token for testing
            const mockToken = 'mock_jwt_token_for_testing_' + Date.now();
            localStorage.setItem('auth_token', mockToken);

            // Success - go to main app
            onLoginSuccess();

        } catch (err) {
            setError(err.message || 'Invalid email or password.');
        } finally {
            setIsLoading(false);
        }

        // OLD CODE (commented out for testing):
        /*
        try {
            // Replace with your actual backend URL
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('auth_token', data.token);
            onLoginSuccess();
        } catch (err) {
            setError(err.message || 'Invalid email or password.');
        } finally {
            setIsLoading(false);
        }
        */
    };

    return (
        <PageWrapper>
            <div className="auth-card">
                <div>
                    <div className="logo-container">
                        <img src={levelUp} alt="LevelUp Logo" className="logo" />
                    </div>
                    <h2 className="auth-title">
                        Welcome to LevelUp
                    </h2>
                    <p className="auth-subtitle">
                        Sign in to continue to your dashboard
                    </p>
                    {/* TEST MODE NOTICE */}
                    <p style={{
                        textAlign: 'center',
                        color: '#ff747b',
                        fontSize: '12px',
                        marginTop: '10px',
                        fontWeight: 'bold'
                    }}>
                        TEST MODE: Click "Sign in" to enter app
                    </p>
                </div>

                <form className="form-stack" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="form-input top-single"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="form-input bottom-single"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="error-msg">{error}</p>
                    )}

                    <div className="form-actions">
                        <div className="checkbox-container">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="checkbox"
                            />
                            <label htmlFor="remember-me" className="checkbox-label">
                                Remember me
                            </label>
                        </div>
                        <div>
                            <button
                                onClick={(e) => { e.preventDefault(); onForgotPasswordClick(); }}
                                className="link-btn"
                            >
                                Forgot your password?
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary"
                        >
                            {isLoading ? 'Signing in...' : 'Sign in (TEST MODE)'}
                        </button>
                    </div>
                </form>
                <div className="text-center mt-6">
                    <p className="auth-subtitle">
                        Don't have an account?{' '}
                        <button onClick={(e) => { e.preventDefault(); onSignUpClick(); }} className="link-btn">
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Login;
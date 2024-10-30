import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios with `npm install axios`

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            return alert("Passwords do not match!");
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/signup', {
                username: email, // Adjust based on your backend requirements
                password,
            });
            setSuccess("Signup successful! Please log in.");
            // Optionally reset the form
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error("Error signing up:", error);
            setError("Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label>Confirm Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit" className="auth-button" disabled={loading}>
                    {loading ? 'Signing up...' : 'Signup'}
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
};

export default Signup;

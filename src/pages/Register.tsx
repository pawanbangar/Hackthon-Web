import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/auth';
import { AxiosError } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from "../assets/Logo.svg";
import background from "../assets/geoffrey-moffett-TFRezw7pQwI-unsplash.jpg";

const Register = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { login, isAuthenticated, isLoading } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated && !isLoading) {
			navigate('/');
		}
	}, [isAuthenticated, isLoading, navigate]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		if (password !== confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		setLoading(true);

		try {
			const registerResponse = await authService.register({ username, email, password });
			if (registerResponse.success) {
				await login(registerResponse.data);
				navigate('/');
			} else {
				setError(registerResponse.message || 'Registration failed');
			}
		} catch (err) {
			if (err instanceof AxiosError) {
				setError(err.response?.data?.message || 'Registration failed');
			} else {
				setError('Unexpected error');
			}
		} finally {
			setLoading(false);
		}
	};

	const inputStyle = {
		width: '100%',
		padding: '12px 14px',
		borderRadius: '8px',
		border: '1px solid #ccc',
		marginTop: '6px',
		outline: 'none',
		boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
		transition: 'all 0.3s ease',
		fontSize: '14px',
	};

	return (
		<div
			style={{
				backgroundImage: `url("${background}")`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				minHeight: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '20px',
			}}
		>
			<div
				style={{
					width: '100%',
					maxWidth: '420px',
					background: '#fff',
					borderRadius: '16px',
					padding: '25px',
					boxShadow: '0px 4px 20px rgba(0,0,0,0.15)',
				}}
			>
				<div style={{ textAlign: 'center', marginBottom: '5px' }}>
					<img src={logo} alt="RHEOflix Logo" style={{ width: '200px' }} />
				</div>
				{error && (
					<div
						style={{
							backgroundColor: '#f8d7da',
							color: '#721c24',
							padding: '10px 14px',
							borderRadius: '6px',
							marginBottom: '16px',
							fontSize: '14px',
						}}
					>
						{error}
					</div>
				)}
				<form onSubmit={handleSubmit}>
					<div style={{ marginBottom: '18px' }}>
						<label style={{ fontWeight: 500, fontSize: '14px' }}>Username</label>
						<input
							type="text"
							placeholder="Enter your username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							style={inputStyle}
						/>
					</div>
					<div style={{ marginBottom: '18px' }}>
						<label style={{ fontWeight: 500, fontSize: '14px' }}>Email address</label>
						<input
							type="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							style={inputStyle}
						/>
					</div>
					<div style={{ marginBottom: '18px' }}>
						<label style={{ fontWeight: 500, fontSize: '14px' }}>Password</label>
						<div style={{ position: 'relative' }}>
							<input
								type={showPassword ? 'text' : 'password'}
								placeholder="Enter password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								style={{ ...inputStyle, paddingRight: '40px' }}
							/>
							<FontAwesomeIcon
								icon={showPassword ? faEyeSlash : faEye}
								onClick={() => setShowPassword(!showPassword)}
								style={{
									position: 'absolute',
									right: '12px',
									top: '50%',
									transform: 'translateY(-50%)',
									color: '#888',
									cursor: 'pointer',
								}}
							/>
						</div>
					</div>
					<div style={{ marginBottom: '24px' }}>
						<label style={{ fontWeight: 500, fontSize: '14px' }}>Confirm Password</label>
						<div style={{ position: 'relative' }}>
							<input
								type={showConfirmPassword ? 'text' : 'password'}
								placeholder="Confirm password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
								style={{ ...inputStyle, paddingRight: '40px' }}
							/>
							<FontAwesomeIcon
								icon={showConfirmPassword ? faEyeSlash : faEye}
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								style={{
									position: 'absolute',
									right: '12px',
									top: '50%',
									transform: 'translateY(-50%)',
									color: '#888',
									cursor: 'pointer',
								}}
							/>
						</div>
					</div>
					<button
						type="submit"
						disabled={loading}
						style={{
							width: '100%',
							padding: '12px',
							backgroundColor: '#f4b126',
							color: '#fff',
							fontWeight: 'bold',
							border: 'none',
							borderRadius: '8px',
							cursor: 'pointer',
							fontSize: '15px',
						}}
					>
						{loading ? 'Creating account...' : 'Create account'}
					</button>
				</form>
				<div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
					Already have an account?{' '}
					<a href="/login" style={{ color: '#007bff', textDecoration: 'none' }}>
						Login
					</a>
				</div>
			</div>
		</div>
	);
};

export default Register;
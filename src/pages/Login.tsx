import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/auth';
import { AxiosError } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import background from "../assets/geoffrey-moffett-TFRezw7pQwI-unsplash.jpg";
import logo from "../assets/Logo.svg";
import { notify } from '../utils/notify';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { login, isAuthenticated, isLoading } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated && !isLoading) {
			navigate('/', { replace: true });
		}
	}, [isAuthenticated, isLoading, navigate]);

	if (isLoading) {
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
				}}
			>
				<div
					style={{
						width: '100%',
						maxWidth: '400px',
						background: '#fff',
						borderRadius: '16px',
						padding: '25px',
						boxShadow: '0px 4px 20px rgba(0,0,0,0.15)',
						textAlign: 'center'
					}}
				>
					Loading...
				</div>
			</div>
		);
	}

	if (isAuthenticated) {
		return null;
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			const loginResponse = await authService.login({ email, password });
			if (loginResponse.success) {
				notify('Login successful', 'success');
				await login(loginResponse.data, true);
			} else {
				notify(loginResponse.message || 'Login failed', 'error');
				setError(loginResponse.message || 'Login failed');
			}
		} catch (err) {
			if (err instanceof AxiosError) {
				notify(err.response?.data?.message || 'Login failed', 'error');
				setError(err.response?.data?.message || 'Login failed');
			} else {
				notify('Unexpected error', 'error');
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
			}}
		>
			<div
				style={{
					width: '100%',
					maxWidth: '400px',
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
						<label style={{ fontWeight: 500, fontSize: '14px' }}>Login</label>
						<input
							type="text"
							placeholder="Email or phone number"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							style={inputStyle}
						/>
					</div>

					<div style={{ marginBottom: '12px' }}>
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
								onClick={() => setShowPassword((prev) => !prev)}
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

					<div
						style={{
							display: 'flex',
							justifyContent: 'end',
							alignItems: 'center',
							marginBottom: '20px',
							fontSize: '14px',
						}}
					>
						<a href="#" style={{ color: '#007bff', textDecoration: 'none' }}>
							Forgot password?
						</a>
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
							marginBottom: '20px',
							cursor: 'pointer',
							fontSize: '15px',
						}}
					>
						{loading ? 'Signing in...' : 'Sign in'}
					</button>
				</form>

				<div
					style={{
						textAlign: 'center',
						color: '#888',
						marginBottom: '20px',
						position: 'relative',
					}}
				>
					<div
						style={{
							height: '1px',
							background: '#ccc',
							position: 'absolute',
							top: '50%',
							left: 0,
							right: 0,
							zIndex: 0,
						}}
					/>
				</div>

				<div style={{ textAlign: 'center', fontSize: '14px' }}>
					Don't have an account?{' '}
					<a href="/register" style={{ color: '#007bff', textDecoration: 'none' }}>
						Sign up now
					</a>
				</div>
			</div>
		</div>
	);
};

export default Login;

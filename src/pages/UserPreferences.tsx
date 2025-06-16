import { useState, useEffect } from 'react';
import background from '../assets/geoffrey-moffett-TFRezw7pQwI-unsplash.jpg';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import { movieService } from '../services/movie';
import { notify } from '../utils/notify';
import { useAuth } from '../context/AuthContext';

interface Genre {
	genre_id: number;
	genre_name: string;
	genre_poster: string;
}

const languagesList = ['English', 'Tamil', 'Hindi', 'Telugu', 'Kannada', 'Malayalam'];
const locationsList = ['Chennai', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Kolkata'];

const UserPreferences = () => {
	const [location, setLocation] = useState('');
	const [languages, setLanguages] = useState<string[]>([]);
	const [genres, setGenres] = useState<string[]>([]);
	const [genresList, setGenresList] = useState<Genre[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const { user, setUser } = useAuth();

	useEffect(() => {
		// Populate user preferences if they exist
		if (user) {
			if (user.location) setLocation(user.location);
			if (user.languages) setLanguages(user.languages.split(','));
			if (user.genres) setGenres(user.genres.split(','));
		}
	}, [user]);

	useEffect(() => {
		const fetchGenres = async () => {
			try {
				const response = await movieService.getAllGenres();
				if (response.success) {
					setGenresList(response.data.genres);
				} else {
					notify(response.message || 'Failed to fetch genres', 'error');
				}
			} catch (error) {
				console.error('Error fetching genres:', error);
				notify('Failed to fetch genres', 'error');
			} finally {
				setIsLoading(false);
			}
		};

		fetchGenres();
	}, []);

	const handleToggle = (item: string, list: string[], setList: (val: string[]) => void) => {
		setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
	};

	const sortedGenres = [...genresList].sort((a, b) =>
		a.genre_name.localeCompare(b.genre_name)
	);


	const handleSubmit = async () => {
		try {
			const response = await authService.updatePreferences({
				location,
				languages: languages.join(','),
				genres: genres.join(','),
			});
			if (response.success) {
				notify('Preferences updated successfully!', 'success');
				if (user) {
					setUser({
						...user,
						location,
						languages: languages.join(','),
						genres: genres.join(','),
					});
				}
				navigate('/');
			} else {
				notify(response.message || 'Failed to update preferences', 'error');
			}
		} catch (error) {
			console.error('Error updating preferences:', error);
			notify('An error occurred while updating preferences. Please try again.', 'error');
		}
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
				padding: '30px',
				fontFamily: 'Segoe UI, sans-serif',
			}}
		>
			<div
				style={{
					background: 'rgba(255, 255, 255, 0.95)',
					padding: '40px 32px',
					borderRadius: '20px',
					width: '100%',
					maxWidth: '520px',
					boxShadow: '0 12px 28px rgba(0,0,0,0.25)',
					backdropFilter: 'blur(10px)',
				}}
			>
				<h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '24px' }}>
					Tell us your preferences 🎯
				</h2>
				<div style={{ marginBottom: '25px' }}>
					<label style={{ fontWeight: 600, fontSize: '15px' }}>Select Location</label>
					<select
						value={location}
						onChange={(e) => setLocation(e.target.value)}
						style={{
							width: '100%',
							padding: '12px',
							borderRadius: '10px',
							border: '1px solid #ccc',
							marginTop: '10px',
							fontSize: '14px',
							backgroundColor: '#f8f8f8',
							cursor: 'pointer',
						}}
					>
						<option value="">-- Choose your city --</option>
						{locationsList.map(loc => (
							<option key={loc} value={loc}>{loc}</option>
						))}
					</select>
				</div>
				<div style={{ marginBottom: '25px' }}>
					<label style={{ fontWeight: 600, fontSize: '15px' }}>Preferred Languages</label>
					<div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
						{languagesList.map(lang => (
							<div
								key={lang}
								onClick={() => handleToggle(lang, languages, setLanguages)}
								style={{
									padding: '8px 16px',
									borderRadius: '20px',
									border: `2px solid ${languages.includes(lang) ? '#ff9900' : '#ccc'}`,
									backgroundColor: languages.includes(lang) ? '#ff9900' : '#f2f2f2',
									color: languages.includes(lang) ? '#fff' : '#444',
									cursor: 'pointer',
									transition: '0.3s',
									fontSize: '14px',
									fontWeight: 500,
								}}
							>
								{lang}
							</div>
						))}
					</div>
				</div>
				<div style={{ marginBottom: '32px' }}>
					<label style={{ fontWeight: 600, fontSize: '15px' }}>Favorite Genres</label>
					{isLoading ? (
						<div style={{ textAlign: 'center', padding: '20px' }}>Loading genres...</div>
					) : (
						<div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' , maxHeight:"200px" , overflowY:"auto" , scrollbarWidth:"none" }}>
							{sortedGenres.map(genre => (
								<div
									key={genre.genre_id}
									onClick={() => handleToggle(genre.genre_name, genres, setGenres)}
									style={{
										padding: '8px 16px',
										borderRadius: '20px',
										border: `2px solid ${genres.includes(genre.genre_name) ? '#ff5c5c' : '#ccc'}`,
										backgroundColor: genres.includes(genre.genre_name) ? '#ff5c5c' : '#f2f2f2',
										color: genres.includes(genre.genre_name) ? '#fff' : '#444',
										cursor: 'pointer',
										transition: '0.3s',
										fontSize: '14px',
										fontWeight: 500,
										display: 'flex',
										alignItems: 'center',
										gap: '8px',
									}}
								>
									<img
										src={genre.genre_poster}
										alt={genre.genre_name}
										style={{
											width: '24px',
											height: '24px',
											borderRadius: '4px',
											objectFit: 'cover',
										}}
									/>
									{genre.genre_name}
								</div>
							))}
						</div>
					)}
				</div>
				<div style={{ display: 'flex', gap: '12px' }}>
					<button
						onClick={() => navigate('/')}
						style={{
							flex: 1,
							padding: '14px',
							background: '#f5f5f5',
							color: '#666',
							border: 'none',
							borderRadius: '10px',
							fontWeight: 'bold',
							fontSize: '16px',
							cursor: 'pointer',
							boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
							transition: 'all 0.3s ease',
						}}
						onMouseOver={(e) => (e.currentTarget.style.background = '#e0e0e0')}
						onMouseOut={(e) => (e.currentTarget.style.background = '#f5f5f5')}
					>
						Cancel
					</button>
					<button
						onClick={handleSubmit}
						style={{
							flex: 1,
							padding: '14px',
							background: '#1e88e5',
							color: '#fff',
							border: 'none',
							borderRadius: '10px',
							fontWeight: 'bold',
							fontSize: '16px',
							cursor: 'pointer',
							boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
							transition: 'background 0.3s ease',
						}}
						onMouseOver={(e) => (e.currentTarget.style.background = '#1565c0')}
						onMouseOut={(e) => (e.currentTarget.style.background = '#1e88e5')}
					>
						Continue
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserPreferences;

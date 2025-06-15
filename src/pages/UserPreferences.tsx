import { useState } from 'react';
import background from '../assets/geoffrey-moffett-TFRezw7pQwI-unsplash.jpg';
import { useNavigate } from 'react-router-dom';

const genresList = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller', 'Fantasy'];
const languagesList = ['English', 'Tamil', 'Hindi', 'Telugu', 'Kannada', 'Malayalam'];
const locationsList = ['Chennai', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Kolkata'];

const UserPreferences = () => {
	const [location, setLocation] = useState('');
	const [languages, setLanguages] = useState<string[]>([]);
	const [genres, setGenres] = useState<string[]>([]);
	const navigate = useNavigate();

	const handleToggle = (item: string, list: string[], setList: (val: string[]) => void) => {
		setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
	};

	const handleSubmit = () => {
		console.log({ location, languages, genres });
		navigate('/');
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
					<div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
						{genresList.map(genre => (
							<div
								key={genre}
								onClick={() => handleToggle(genre, genres, setGenres)}
								style={{
									padding: '8px 16px',
									borderRadius: '20px',
									border: `2px solid ${genres.includes(genre) ? '#ff5c5c' : '#ccc'}`,
									backgroundColor: genres.includes(genre) ? '#ff5c5c' : '#f2f2f2',
									color: genres.includes(genre) ? '#fff' : '#444',
									cursor: 'pointer',
									transition: '0.3s',
									fontSize: '14px',
									fontWeight: 500,
								}}
							>
								{genre}
							</div>
						))}
					</div>
				</div>
				<button
					onClick={handleSubmit}
					style={{
						width: '100%',
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
	);
};

export default UserPreferences;

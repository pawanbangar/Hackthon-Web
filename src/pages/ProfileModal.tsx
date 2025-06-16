import { useEffect, useState } from 'react';
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

interface Props {
    onClose: () => void;
}

const ProfileModal = ({ onClose }: Props) => {
    const [location, setLocation] = useState('');
    const [languages, setLanguages] = useState<string[]>([]);
    const [genres, setGenres] = useState<string[]>([]);
    const [genresList, setGenresList] = useState<Genre[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user, setUser } = useAuth();

    useEffect(() => {
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
                onClose();
                setTimeout(() => {
                    window.location.reload();
                },2000)
            } else {
                notify(response.message || 'Failed to update preferences', 'error');
            }
        } catch (error) {
            console.error('Error updating preferences:', error);
            notify('An error occurred while updating preferences. Please try again.', 'error');
        }
    };

    const sortedGenres = [...genresList].sort((a, b) => a.genre_name.localeCompare(b.genre_name));

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
            }}
        >
            <div
                style={{
                    background: '#121212',
                    borderRadius: '20px',
                    padding: '30px',
                    width: '90%',
                    maxWidth: '620px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    position: 'relative',
                    color: '#fff',
                    boxShadow: '0 0 20px rgba(255, 255, 0, 0.2)',
                }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#FFD700' }}>Your Preferences 🎯</h2>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 600, color: '#ccc' }}>Location</label>
                    <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid #444',
                            background: '#1c1c1c',
                            color: '#fff',
                            marginTop: '10px',
                            fontSize: '14px',
                        }}
                    >
                        <option value="">-- Choose your city --</option>
                        {locationsList.map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 600, color: '#ccc' }}>Preferred Languages</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                        {languagesList.map(lang => (
                            <div
                                key={lang}
                                onClick={() => handleToggle(lang, languages, setLanguages)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    border: `2px solid ${languages.includes(lang) ? '#FFD700' : '#444'}`,
                                    backgroundColor: languages.includes(lang) ? '#FFD700' : '#1c1c1c',
                                    color: languages.includes(lang) ? '#000' : '#fff',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                {lang}
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 600, color: '#ccc' }}>Favorite Genres</label>
                    {isLoading ? (
                        <p>Loading genres...</p>
                    ) : (
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '10px',
                            marginTop: '10px',
                            maxHeight: '230px',
                            overflowY: 'auto',
                            scrollbarWidth: "none"
                        }}>
                            {sortedGenres.map(genre => (
                                <div
                                    key={genre.genre_id}
                                    onClick={() => handleToggle(genre.genre_name, genres, setGenres)}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '20px',
                                        border: `2px solid ${genres.includes(genre.genre_name) ? '#FF4444' : '#444'}`,
                                        backgroundColor: genres.includes(genre.genre_name) ? '#FF4444' : '#1c1c1c',
                                        color: genres.includes(genre.genre_name) ? '#fff' : '#ddd',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    <img
                                        src={genre.genre_poster}
                                        alt={genre.genre_name}
                                        style={{ width: '24px', height: '24px', borderRadius: '4px' }}
                                    />
                                    {genre.genre_name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '8px',
                            border: '1px solid #666',
                            background: 'transparent',
                            color: '#fff',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '8px',
                            border: 'none',
                            background: '#FFD700',
                            color: '#000',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;

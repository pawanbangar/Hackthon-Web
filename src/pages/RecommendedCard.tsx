import type { Movie } from "./Home";
import StarRating from "./Stars";
import "./Recommended.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useFavorites } from "../context/FavoritesContext";
import { motion } from "framer-motion";

interface Props {
	movie: Movie;
	onClick?: (movie: Movie) => void;
}

const RecommendedCard = ({ movie, onClick }: Props) => {
	const { isFavorite, addFavorite, removeFavorite, isUpdating } = useFavorites();
	const isMovieFavorite = isFavorite(movie.movie_id);
	const isMovieUpdating = isUpdating(movie.movie_id);

	const handleFavorite = async (e: React.MouseEvent) => {
		e.stopPropagation();
		try {
			if (!isMovieFavorite) {
				await addFavorite(movie.movie_id);
			} else {
				await removeFavorite(movie.movie_id);
			}
		} catch (err) {
			console.error("Failed to update favorites:", err);
		}
	};

	return (
		<div className="card-container" onClick={() => onClick?.(movie)} style={{ position: "relative", cursor: "pointer" }}>
			<img src={movie.poster_path} alt={movie.title} className="card-img" />
			<div
				className="favorite-icon"
				onClick={handleFavorite}
			>
				<motion.div
					animate={{
						scale: isMovieUpdating ? [1, 1.2, 1] : 1,
						rotate: isMovieUpdating ? [0, 10, -10, 0] : 0,
					}}
					transition={{
						duration: 0.5,
						repeat: isMovieUpdating ? Infinity : 0,
						ease: "easeInOut"
					}}
				>
					<FontAwesomeIcon
						icon={isMovieFavorite ? solidHeart : regularHeart}
						color={isMovieFavorite ? "#ff4d4d" : "#fff"}
						style={{ 
							fontSize: "25px",
							opacity: isMovieUpdating ? 0.7 : 1,
							transition: "all 0.3s ease"
						}}
					/>
				</motion.div>
			</div>

			<div className="card-overlay">
				<div className="card-title">{movie.title}</div>
				<div className="card-info">
					<StarRating rating={movie?.rating ?? 10} />
					<span>{movie.rating} | {movie.runtime} min</span>
				</div>
				<div className="card-genres">
					{movie.genres.map((g) => g.genre.genre_name).join(" • ")}
				</div>
				<div className="card-desc">
					{movie.overview.slice(0, 100)}...
				</div>
			</div>
		</div>
	);
};

export default RecommendedCard;

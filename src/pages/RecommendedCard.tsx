import type { Movie } from "./Home";
import StarRating from "./Stars";
import "./Recommended.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import api from "../utils/axios";

interface Props {
	movie: Movie;
	onClick?: (movie: Movie) => void;
}

const RecommendedCard = ({ movie, onClick }: Props) => {
	const [isFavorite, setIsFavorite] = useState(false);

	const handleFavorite = async () => {
		try {
			setIsFavorite((prev) => !prev);
			if (!isFavorite) {
				await api.post(`/user-activity/favorites/${movie.movie_id}`);
			} else {
				await api.delete(`/user-activity/favorites/${movie.movie_id}`);
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
				onClick={(e) => {
					e.stopPropagation();
					handleFavorite();
				}}
			>
				<FontAwesomeIcon
					icon={isFavorite ? solidHeart : regularHeart}
					color={isFavorite ? "#ff4d4d" : "#fff"}
					style={{ fontSize: "25px" }}
				/>
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

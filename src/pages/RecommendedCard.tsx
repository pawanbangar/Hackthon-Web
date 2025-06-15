import type { Movie } from "./Home";
import StarRating from "./Stars";
import "./Recommended.css"

interface Props {
	movie: Movie;
	onClick?: (movie: Movie) => void;
}

const RecommendedCard = ({ movie, onClick }: Props) => {
	return (
		<div className="card-container" onClick={() => onClick?.(movie)} style={{ cursor: "pointer" }}>
			<img src={movie.poster_path} alt={movie.title} className="card-img" />
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

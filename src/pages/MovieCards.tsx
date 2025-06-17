import { useState } from "react";
import play2 from "../assets/play-button 1.svg";
import add from "../assets/add 1.svg";
import like from "../assets/thumbs-up 1.svg";
import type { Movie } from "./Home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useFavorites } from "../context/FavoritesContext";
import { motion } from "framer-motion";

interface MovieCardProps {
	poster: string;
	isTop?: boolean;
	isSelected: boolean;
	setSelectedMovie: React.Dispatch<React.SetStateAction<Movie | null | undefined>>
	movie: Movie;
}

const MovieCard = ({
	poster,
	isTop = false,
	isSelected,
	setSelectedMovie,
	movie
}: MovieCardProps) => {
	const [hovered, setHovered] = useState(false);
	const isActive = hovered || isSelected;
	const { isFavorite, addFavorite, removeFavorite, isUpdating } = useFavorites();
	const isMovieFavorite = isFavorite(movie.movie_id);
	const isMovieUpdating = isUpdating(movie.movie_id);

	const hr = Math.floor(movie.runtime / 60);
	const min = movie.runtime % 60

	const time = `${hr} Hours ${min} Minutes`

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
		<div
			style={{
				minWidth: isActive ? "250px" : "186px",
				height: isActive ? "360px" : "234px",
				borderRadius: "12px",
				border: isActive ? "1px solid #262626" : "none",
				background: isActive ? "rgb(94, 94, 93)" : "none",
				position: "relative",
				zIndex: 1,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				paddingTop: isActive ? "15px" : "0",
				cursor: "pointer",
				transition: "all 0.3s ease-in-out",
				overflow: "hidden"
			}}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => {
				setHovered(false);
			}}
			onClick={() => setSelectedMovie(movie)}
		>
			<div
				style={{
					width: isActive ? "224px" : "100%",
					height: isActive ? "250px" : "100%",
					borderRadius: "12px",
					position: isActive ? "absolute" : "relative",
					top: isActive ? "15px" : "0px",
					overflow: "hidden",
					transition: "all 0.3s ease-in-out",
				}}
			>
				<img
					src={poster}
					alt="poster"
					style={{
						width: "100%",
						height: "100%",
						objectFit: "cover",
						borderRadius: "12px",
					}}
				/>
			</div>

			{isActive && (
				<>
					<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
						<div>
							<div
								style={{
									display: "flex",
									position: "absolute",
									zIndex: 2,
									left: "18px",
									bottom: "45px",
									gap: "6px",
									color: "white",
									alignItems: "center",
								}}
							>
								<img style={{ width: "30px", height: "30px" }} src={play2} alt="play" />
								<img style={{ width: "30px", height: "30px" }} src={add} alt="add" />
								<img style={{ width: "30px", height: "30px" }} src={like} alt="like" />
							</div>
							<div
								style={{
									display: "flex",
									position: "absolute",
									zIndex: 2,
									left: "18px",
									bottom: "10px",
									color: "black",
									fontSize: "12px",
									fontWeight: "700"
								}}
							>
								{time}
							</div>
						</div>
						<div style={{
							color: "black", position: "absolute",
							zIndex: 2, right: "15px",
							bottom: "50px",
							fontWeight: "700"
						}}>
							{new Date(movie?.release_date).getFullYear()}
						</div>
						<div style={{
							color: "black", position: "absolute",
							zIndex: 2, right: "15px",
							bottom: "10px",
							fontWeight: "700"
						}}>
							<div onClick={handleFavorite}>
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
						</div>
					</div>
					{isTop && (
						<div
							style={{
								position: "absolute",
								left: "31px",
								bottom: "105px",
								borderRadius: "5px",
								background: "#F26B0F",
								zIndex: 3,
								color: "white",
								fontWeight: 900,
								display: "flex",
								padding: "3px 15px",
								alignItems: "flex-start",
							}}
						>
							Top
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default MovieCard;

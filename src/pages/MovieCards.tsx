import { useState } from "react";
import play2 from "../assets/play-button 1.svg";
import add from "../assets/add 1.svg";
import like from "../assets/thumbs-up 1.svg";
import type { Movie } from "./Home";

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

	const hr = Math.floor(movie.runtime / 60);
	const min = movie.runtime % 60

	const time = `${hr} Hours ${min} Minutes`

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
									fontWeight:"700"
								}}
							>
								{time}
							</div>
						</div>
						<div style={{
							color: "black", position: "absolute",
							zIndex: 2, right: "15px",
							bottom: "38px",
							fontWeight:"700"
						}}>
							{new Date(movie?.release_date).getFullYear()}
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

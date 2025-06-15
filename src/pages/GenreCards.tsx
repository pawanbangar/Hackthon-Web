import type { GenreDetails } from "./Home";

interface Props {
	genre: GenreDetails;
	onClick?: (genre: GenreDetails) => void;
}

const GenreCards = ({ genre , onClick }: Props) => {

	return (
		<div
			style={{
				minWidth: "240px",
				minHeight: "130px",
				position: "relative",
				borderRadius: "18px",
				overflow: "hidden",
				cursor: "pointer",
				transform: "translateZ(0)",
				boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
				transition: "transform 0.3s ease, box-shadow 0.3s ease-in-out",
			}}
			onClick={() => onClick?.(genre)}
			onMouseEnter={(e) => {
				e.currentTarget.style.transform = "scale(1.06)";
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.transform = "scale(1)";
			}}
		>
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					backgroundImage: `url("${genre.genre_poster}")`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					filter: "brightness(0.8)",
				}}
			/>
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					background: "rgba(0, 0, 0, 0.2)",
				}}
			/>
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: "#ffffff",
					fontSize: "20px",
					fontWeight: 700,
					textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
					textAlign: "center",
					padding: "16px",
					pointerEvents: "none",
				}}
			>
				{genre.genre_name}
			</div>
		</div>
	);
};

export default GenreCards;

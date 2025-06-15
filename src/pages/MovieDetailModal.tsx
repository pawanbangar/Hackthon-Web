import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faStar, faClock, faMoneyBill, faUsers } from "@fortawesome/free-solid-svg-icons";
import type { Movie } from "./Home";

const formatDate = (dateString: string) =>
	new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

const formatCurrency = (value: number) =>
	value.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
	});

const MovieDetailModal = ({ movie, onClose }: { movie: Movie; onClose: () => void }) => {
	return (
		<div
			onClick={onClose}
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				backgroundColor: "rgba(0,0,0,0.6)",
				backdropFilter: "blur(8px)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				zIndex: 9999,
				padding: "20px",
			}}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				style={{
					backgroundColor: "#111",
					color: "white",
					borderRadius: "16px",
					width: "90vw",
					maxWidth: "1000px",
					maxHeight: "90vh",
					overflowY: "auto",
					boxShadow: "0 0 25px rgba(0,0,0,0.7)",
					position: "relative",
					padding: "30px",
					scrollbarWidth:"none"
				}}
			>
				<FontAwesomeIcon
					icon={faXmark}
					onClick={onClose}
					style={{
						position: "absolute",
						top: "20px",
						right: "30px",
						fontSize: "26px",
						color: "#fff",
						cursor: "pointer",
					}}
				/>
				<h2 style={{ fontSize: "36px", marginBottom: "20px", fontWeight: "bold" }}>
					{movie.title}
				</h2>
				<div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
					<img
						src={movie.poster_path}
						alt={movie.title}
						style={{
							width: "280px",
							borderRadius: "12px",
							objectFit: "cover",
							boxShadow: "0 0 15px rgba(0,0,0,0.5)",
						}}
					/>

					<div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
						<p style={{ lineHeight: "1.6", fontSize: "16px", marginBottom: "10px" }}>
							{movie.overview}
						</p>

						<p>
							<strong>📅 Release Date:</strong> {formatDate(movie.release_date)}
						</p>

						<p>
							<strong>⭐ Rating:</strong>{" "}
							<FontAwesomeIcon icon={faStar} style={{ color: "#F5B82B" }} />{" "}
							{movie.rating}/10
						</p>

						<p>
							<strong>🎭 Genres:</strong>{" "}
							{movie.genres.map((g) => g.genre.genre_name).join(" • ")}
						</p>

						<p>
							<FontAwesomeIcon icon={faClock} /> <strong>Runtime:</strong>{" "}
							{movie.runtime} minutes
						</p>

						<p>
							<FontAwesomeIcon icon={faUsers} /> <strong>Cast:</strong>{" "}
							{movie.cast.slice(0, 5).join(", ")} {movie.cast.length > 5 && "..."}
						</p>

						<p>
							<FontAwesomeIcon icon={faMoneyBill} /> <strong>Budget:</strong>{" "}
							{formatCurrency(movie.budget)}
						</p>

						<p>
							<FontAwesomeIcon icon={faMoneyBill} /> <strong>Revenue:</strong>{" "}
							{formatCurrency(movie.revenue)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieDetailModal;

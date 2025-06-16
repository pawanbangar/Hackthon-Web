import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faXmark,
	faStar,
	faClock,
	faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import YouTube from "react-youtube";
import { motion, AnimatePresence } from "framer-motion";
import { fetchTrailerId } from "./fetchTrailer";
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

const infoCardStyle: React.CSSProperties = {
	background: "rgba(255, 255, 255, 0.03)",
	border: "1px solid rgba(255, 255, 255, 0.1)",
	borderRadius: "12px",
	padding: "14px 18px",
	boxShadow: "0 0 12px rgba(255,255,255,0.04)",
	fontSize: "15px",
	backdropFilter: "blur(6px)",
};

const MovieDetailModal = ({ movie, onClose }: { movie: Movie; onClose: () => void }) => {
	const [trailerId, setTrailerId] = useState<string | null>(null);

	useEffect(() => {
		const year = new Date(movie.release_date).getFullYear().toString();
		fetchTrailerId(movie.title, year).then(setTrailerId);
	}, [movie]);

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={onClose}
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					width: "100vw",
					height: "100vh",
					background: "rgba(0, 0, 0, 0.8)",
					backdropFilter: "blur(15px)",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					zIndex: 9999,
					padding: "20px",
					overflowY: "auto",
				}}
			>
				<motion.div
					initial={{ y: 80, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 80, opacity: 0 }}
					transition={{ type: "spring", damping: 20 }}
					onClick={(e) => e.stopPropagation()}
					style={{
						background:
							"linear-gradient(to right bottom, rgba(20, 20, 20, 0.9), rgba(40, 40, 40, 0.9))",
						color: "white",
						borderRadius: "20px",
						width: "90vw",
						maxWidth: "1000px",
						maxHeight: "90vh",
						overflowY: "auto",
						boxShadow: "0 0 25px rgba(0,0,0,0.6)",
						position: "relative",
						padding: "30px",
						fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
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
							fontSize: "28px",
							color: "#fff",
							cursor: "pointer",
							transition: "transform 0.3s ease",
						}}
						onMouseEnter={(e) =>
							((e.currentTarget.style.transform = "scale(1.2)"))
						}
						onMouseLeave={(e) =>
							((e.currentTarget.style.transform = "scale(1)"))
						}
					/>

					<h2 style={{ fontSize: "36px", marginBottom: "20px", fontWeight: "bold" }}>
						{movie.title}
					</h2>

					{trailerId && (
						<div
							style={{
								marginBottom: "24px",
								borderRadius: "14px",
								overflow: "hidden",
								boxShadow: "0 0 20px rgba(255,255,255,0.1)",
							}}
						>
							<YouTube
								videoId={trailerId}
								opts={{
									width: "100%",
									playerVars: { autoplay: 0, rel: 0 },
								}}
							/>
						</div>
					)}

					<div style={{ display: "flex", flexDirection: "row", gap: "30px", flexWrap: "wrap" }}>
						<img
							src={movie.poster_path}
							alt={movie.title}
							style={{
								width: "280px",
								borderRadius: "14px",
								objectFit: "cover",
								boxShadow: "0 0 15px rgba(0,0,0,0.4)",
								transition: "transform 0.3s",
							}}
							onMouseEnter={(e) => ((e.currentTarget.style.transform = "scale(1.03)"))}
							onMouseLeave={(e) => ((e.currentTarget.style.transform = "scale(1)"))}
						/>

						<div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
							<p style={{ lineHeight: "1.8", fontSize: "16px", opacity: 0.9 }}>{movie.overview}</p>

							<div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
								{movie.genres.map((g) => (
									<span
										key={g.genre.genre_name}
										style={{
											background: "linear-gradient(90deg, #F5B82B, #ff930f)",
											color: "#000",
											padding: "4px 14px",
											borderRadius: "20px",
											fontSize: "13px",
											fontWeight: 500,
										}}
									>
										{g.genre.genre_name}
									</span>
								))}
							</div>

							<div
								style={{
									display: "grid",
									gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
									gap: "16px",
									marginTop: "20px",
								}}
							>
								<div style={infoCardStyle}>
									<strong>📅 Release Date:</strong>
									<br />
									{formatDate(movie.release_date)}
								</div>
								<div style={infoCardStyle}>
									<strong>
										<FontAwesomeIcon icon={faStar} style={{ color: "#F5B82B" }} /> Rating:
									</strong>
									<br />
									{movie.rating}/10
								</div>
								<div style={infoCardStyle}>
									<strong>
										<FontAwesomeIcon icon={faClock} /> Runtime:
									</strong>
									<br />
									{movie.runtime} minutes
								</div>
								<div style={infoCardStyle}>
									<strong>
										<FontAwesomeIcon icon={faMoneyBill} /> Budget:
									</strong>
									<br />
									{formatCurrency(movie.budget)}
								</div>
								<div style={infoCardStyle}>
									<strong>
										<FontAwesomeIcon icon={faMoneyBill} /> Revenue:
									</strong>
									<br />
									{formatCurrency(movie.revenue)}
								</div>
							</div>

							<div
								style={{
									marginTop: "30px",
									textAlign: "center",
									fontSize: "14px",
									color: "#aaa",
								}}
							>
								🎬 Sit back, relax and enjoy your show!
							</div>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export default MovieDetailModal;

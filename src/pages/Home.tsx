import { useEffect, useRef, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import StarRating from "./Stars";
import play from "../assets/Vector 1.png";
import MovieCard from "./MovieCards";
import bgImage from "../assets/Copilot_20250614_002000.png"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import RecommendedCard from "./RecommendedCard";
import { motion } from "framer-motion";
import GenreCards from "./GenreCards";
import { MoviesGenreModal } from "./MoviesGenreModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MovieDetailModal from "./MovieDetailModal";
import { config } from "../config";

export interface GenreDetails {
	genre_id: number;
	genre_name: string;
	genre_poster: string
}

export interface Genre {
	genre_id: number;
	genre: GenreDetails;
}

export interface Movie {
	movie_id: number;
	title: string;
	poster_path: string;
	release_date: string;
	budget: number;
	revenue: number;
	runtime: number;
	overview: string;
	rating: number;
	cast: string[];
	genres: Genre[];
}

const Home = () => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [selectedMovie, setSelectedMovie] = useState<Movie | null>();
	const [genres, setGenres] = useState<GenreDetails[]>([]);
	const [startIndex, setStartIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedGenre, setSelectedGenre] = useState<GenreDetails | null>(null);
	const [showFullOverview, setShowFullOverview] = useState(false);
	const [genreMovies, setGenreMovies] = useState<Movie[]>([]);
	const [genrePage, setGenrePage] = useState(1);
	const [genreSearchInput, setGenreSearchInput] = useState("");
	const genrePerPage = 20;
	const [selectedRecommendedMovie, setSelectedRecommendedMovie] = useState<Movie | null>(null);
	const [selectedGenereMovie, setSelectedGenereMovie] = useState<Movie | null>(null);
	const [genreIsLoading, setGenreIsLoading] = useState(false);

	const visibleCount = 6;

	const getAllMoviesBasedOnGenres = async () => {
		setGenreIsLoading(true);
		try {
			if (selectedGenre?.genre_id) {
				const query = genreSearchInput.trim()
					? `&query=${genreSearchInput.trim()}`
					: "";
				const res = await axios.get(
					`${config.backendUrl}/movie/search?genre_id=${selectedGenre.genre_id}&page=${genrePage}&page_size=${genrePerPage}${query}`
				);
				setGenreMovies(res.data.data.movies);
			}
		} catch (error) {
			console.error("Error fetching movies:", error);
		}
		setGenreIsLoading(false);
	};

	const getAllMovies = async () => {
		setIsLoading(true)
		try {
			const res = await axios.get(`${config.backendUrl}/movie?page=1&page_size=50`);
			setMovies(res.data.data.movies);
			setSelectedMovie(res.data.data.movies[3])
		} catch (error) {
			console.error("Error fetching movies:", error);
		}
		setIsLoading(false)
	};

	const getAllGenre = async () => {
		try {
			const res = await axios.get(`${config.backendUrl}/movie/genres/all`);
			setGenres(res.data.data.genres);
		} catch (error) {
			console.error("Error fetching movies:", error);
		}
	};


	useEffect(() => {
		getAllMovies();
		getAllGenre();
	}, []);

	useEffect(() => {
		if (selectedGenre) {
			getAllMoviesBasedOnGenres();
		}
	}, [genrePage, selectedGenre, genreSearchInput]);

	const handlePrev = () => {
		const newIndex = Math.max(startIndex - visibleCount, 0);
		setStartIndex(newIndex);
		const randomOffset = Math.floor(Math.random() * 5);
		setSelectedMovie(movies[newIndex + randomOffset]);
	};

	const handleNext = () => {
		const newIndex = Math.min(startIndex + visibleCount, movies.length - visibleCount);
		setStartIndex(newIndex);
		const randomOffset = Math.floor(Math.random() * 5);
		setSelectedMovie(movies[newIndex + randomOffset]);
	};

	const overview = selectedMovie?.overview || "";
	const isLong = overview.length > 90;
	const displayedText = showFullOverview || !isLong ? overview : overview.slice(0, 90) + "...";


	const titleLength = selectedMovie?.title.length ?? 0

	const recommendedRef = useRef(null);
	const popularRef = useRef(null);


	useEffect(() => {
		if (selectedGenre) {
			setGenrePage(1);
		}
	}, [selectedGenre]);

	useEffect(() => {
		if (selectedGenre) {
			getAllMoviesBasedOnGenres();
		}
	}, [genrePage, selectedGenre]);


	return (
		<>
			<div
				style={{
					position: "relative",
					width: "100vw",
					minHeight: "100vh",
					background: `url(${bgImage})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover"
				}}
			>
				<div
					style={{
						position: "absolute",
						bottom: 0,
						left: 0,
						width: "100%",
						height: "26%",
						background: `linear-gradient(to bottom, rgba(0,0,0,0) ${Math.min(scrollY, 300)}px, black 100%)`,
						transition: "all 0.3s ease-in-out",
						zIndex: 0,
						pointerEvents: "none",
					}}
				/>
				{isLoading ? (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: "100vh",
							width: "100vw",
							position: "fixed",
							top: 0,
							left: 0,
							backgroundColor: "#000",
							zIndex: 9999,
						}}
					>
						<div style={{ position: "relative", width: "200px", height: "200px" }}>
							<DotLottieReact
								src="https://lottie.host/0dd37147-614e-4f55-a708-43db23c5831a/0XHUh8zquF.lottie"
								loop
								autoplay
								style={{ width: "100%", height: "100%" }}
							/>
							<style>
								{`
									@keyframes blink {
									0%, 100% { opacity: 1; }
									50% { opacity: 0.2; }
									}
								`}
							</style>
							<div
								style={{
									position: "absolute",
									top: "50%",
									left: "50%",
									transform: "translate(-50%, -50%)",
									fontWeight: "bold",
									color: "white",
									fontSize: "12px",
									animation: "blink 3s infinite"
								}}
							>
								LOADING
							</div>
						</div>
					</div>
				) :
					<>
						<NavBar />

						<motion.div initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }} className="content" style={{ width: "60vw", paddingTop: "3%", paddingLeft: "3%", display: "flex", flexDirection: "column", gap: "20px" }}>
							<div style={{
								color: "#F7F7F7",
								fontSize: titleLength > 24 ? "40px" : "72px",
								fontWeight: 700,
							}}>
								{selectedMovie?.title}
							</div>
							<div style={{ display: "flex", alignItems: "center", color: "white" }}>
								<StarRating rating={selectedMovie?.rating ?? 10} />
								{selectedMovie?.genres && selectedMovie.genres.length > 0 && (
									<div style={{ paddingLeft: "10px" }}>
										<span style={{ marginRight: "10px" }}>|</span>
										{selectedMovie.genres.map(g => g.genre.genre_name).join(" . ")}
									</div>
								)}
							</div>
							<div style={{ color: "white", width: showFullOverview ? "70vw" : "20vw", overflow: "hidden", transform: "0.5s ease-in-out" }}>
								{displayedText}
								{isLong && (
									<span
										onClick={() => setShowFullOverview(!showFullOverview)}
										style={{ color: "#F5B82B", cursor: "pointer", marginLeft: "6px" }}
									>
										{showFullOverview ? "See less" : "See more"}
									</span>
								)}
							</div>
							<div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
								<button style={{
									background: "transparent", width: "144px", height: "48px",
									color: "#F5C51C", border: "2px solid #F5C51C", borderRadius: "8px"
								}}>
									Watch Trailer
								</button>
								<button style={{
									background: "rgb(118, 118, 116)", width: "144px", height: "48px",
									color: "white", border: "2px solid white", borderRadius: "8px",
									display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"
								}}>
									<img src={play} style={{ width: "15px", height: "15px" }} alt="play" />
									Watch Now
								</button>
							</div>
						</motion.div>
						<div style={{
							display: "flex",
							alignItems: "center",
							padding: "30px",
							gap: "10px",
							width: "100%",
							overflow: "hidden",
							justifyContent: "center"
						}}>
							<button
								style={{
									background: "#F5B82B",
									color: "black",
									padding: "10px 15px",
									borderRadius: "8px",
									border: "none",
									cursor: "pointer",
									fontSize: "18px",
									fontWeight: "900"
								}}
								onClick={handlePrev}
								disabled={!(startIndex > 0)}
							>
								←
							</button>
							<div
								style={{
									display: "flex",
									gap: "15px",
									overflow: "hidden",
									width: "calc(260px * 6 + 12px * 5)",
									transition: "transform 0.5s ease-in-out",
									alignItems: "center",
									justifyContent: "center"
								}}
							>
								{movies.slice(startIndex, startIndex + visibleCount).map((movie, index) => (
									<motion.div
										key={movie.movie_id}
										style={{ flexShrink: 0 }}
										initial={{ opacity: 0, scale: 0.95, y: 20 }}
										animate={{ opacity: 1, scale: 1, y: 0 }}
										transition={{ delay: index * 0.1, duration: 0.4 }}
									>
										<MovieCard
											poster={movie.poster_path}
											isTop={true}
											isSelected={selectedMovie?.movie_id === movie.movie_id}
											setSelectedMovie={setSelectedMovie}
											movie={movie}
										/>
									</motion.div>
								))}
							</div>
							<button
								style={{
									background: "#F5B82B",
									color: "black",
									padding: "10px 15px",
									borderRadius: "8px",
									border: "none",
									cursor: "pointer",
									fontSize: "18px",
									fontWeight: "900"
								}}
								onClick={handleNext}
								disabled={!(startIndex + visibleCount < movies.length)}
							>
								→
							</button>
						</div>
					</>
				}
			</div>
			<div style={{ backgroundColor: "black" }}>
				<motion.div
					ref={recommendedRef}
					style={{ padding: "30px", color: "white" }}
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<motion.h2
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.4 }}
						style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "15px" }}
					>
						Recommended for You
					</motion.h2>
					<div
						style={{
							display: "flex",
							gap: "15px",
							overflowX: "auto",
							overflowY: "hidden",
							paddingBottom: "10px",
							flexWrap: "nowrap",
							scrollBehavior: "smooth",
							scrollbarWidth: "none"
						}}
					>
						{movies.map((movie, index) => (
							<motion.div
								key={`rec-${movie.movie_id}`}
								initial={{ opacity: 0, x: 50 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.05, duration: 0.3 }}
							>
								<RecommendedCard movie={movie} onClick={() => setSelectedRecommendedMovie(movie)} />
							</motion.div>
						))}
					</div>
				</motion.div>
				{genres &&
					<motion.div
						ref={popularRef}
						style={{ padding: "30px", color: "white" }}
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<motion.h2
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.4 }}
							style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "15px" }}
						>
							Genres
						</motion.h2>
						<div
							style={{
								display: "flex",
								gap: "15px",
								overflowX: "auto",
								overflowY: "hidden",
								padding: "10px",
								flexWrap: "nowrap",
								scrollBehavior: "smooth",
								justifyContent: genres.length * 150 < window.innerWidth ? "center" : "flex-start",
								alignItems: "center",
								scrollbarWidth: "none"
							}}
						>

							{genres.map((genre, index) => (
								<motion.div
									key={`pop-${genre.genre_id}`}
									initial={{ opacity: 0, x: 50 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.05, duration: 0.3 }}
								>
									<GenreCards genre={genre} onClick={setSelectedGenre} />
								</motion.div>
							))}
						</div>
					</motion.div>
				}
			</div>
			{selectedGenre && (
				<MoviesGenreModal onClose={() => setSelectedGenre(null)}>
					<div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column" }}>
						<div
							style={{
								position: "sticky",
								top: 0,
								zIndex: 10,
								backgroundColor: "black",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								padding: "20px",
								gap: "20px",
								borderBottom: "1px solid #333",
								flexWrap: "wrap",
							}}
						>
							<div
								style={{
									color: "white",
									fontSize: "32px",
									fontWeight: "bold",
									whiteSpace: "nowrap",
								}}
							>
								{selectedGenre.genre_name} Movies
							</div>
							<div style={{ position: "relative", width: "300px" }}>
								<FontAwesomeIcon
									icon={faSearch}
									style={{
										position: "absolute",
										top: "50%",
										left: "15px",
										transform: "translateY(-50%)",
										color: "#fff",
									}}
								/>
								<input
									type="text"
									placeholder="Search movies..."
									value={genreSearchInput}
									onChange={(e) => setGenreSearchInput(e.target.value)}
									style={{
										padding: "10px 40px",
										width: "100%",
										maxWidth: "300px",
										borderRadius: "8px",
										border: "1px solid white",
										outline: "none",
										backgroundColor: "#111",
										color: "white",
									}}
								/>
							</div>
						</div>
						<div
							style={{
								flex: 1,
								position: "relative",
								overflowY: "auto",
								overflowX: "hidden",
								padding: "20px",
								scrollbarWidth:"none"
							}}
						>
							{genreIsLoading && (
								<div
									style={{
										position: "absolute",
										top: 0,
										left: 0,
										width: "100%",
										height: "100%",
										backgroundColor: "rgba(0, 0, 0, 0.85)",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										zIndex: 10,
									}}
								>
									<div style={{ position: "relative", width: "180px", height: "180px" }}>
										<DotLottieReact
											src="https://lottie.host/0dd37147-614e-4f55-a708-43db23c5831a/0XHUh8zquF.lottie"
											loop
											autoplay
											style={{ width: "100%", height: "100%" }}
										/>
										<div
											style={{
												position: "absolute",
												top: "50%",
												left: "50%",
												transform: "translate(-50%, -50%)",
												fontWeight: "bold",
												color: "white",
												fontSize: "12px",
												animation: "blink 3s infinite",
											}}
										>
											LOADING
										</div>
									</div>
								</div>
							)}
							{!genreIsLoading && (
								<div
									style={{
										display: "flex",
										flexWrap: "wrap",
										gap: "16px",
										justifyContent: "center",
									}}
								>
									{genreMovies.map((movie, index) => (
										<motion.div
											key={`rec-${movie.movie_id}`}
											initial={{ opacity: 0, x: 50 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{ delay: index * 0.05, duration: 0.3 }}
										>
											<RecommendedCard movie={movie} onClick={() => setSelectedGenereMovie(movie)}/>
										</motion.div>
									))}
								</div>
							)}
						</div>
						<div
							style={{
								marginTop: "10px",
								marginBottom: "20px",
								display: "flex",
								justifyContent: "center",
								gap: "10px",
							}}
						>
							<button
								style={{
									background: "#F5B82B",
									color: "black",
									padding: "10px 15px",
									borderRadius: "8px",
									border: "none",
									cursor: "pointer",
									fontWeight: "bold",
								}}
								onClick={() => setGenrePage((prev) => Math.max(prev - 1, 1))}
								disabled={genrePage === 1}
							>
								← Prev
							</button>
							<button
								style={{
									background: "#F5B82B",
									color: "black",
									padding: "10px 15px",
									borderRadius: "8px",
									border: "none",
									cursor: "pointer",
									fontWeight: "bold",
								}}
								onClick={() => setGenrePage((prev) => prev + 1)}
								disabled={genreMovies.length < genrePerPage}
							>
								Next →
							</button>
						</div>
					</div>
				</MoviesGenreModal>
			)}
			{selectedRecommendedMovie && (
				<MovieDetailModal movie={selectedRecommendedMovie} onClose={() => setSelectedRecommendedMovie(null)} />
			)}
			{selectedGenereMovie && (
				<MovieDetailModal movie={selectedGenereMovie} onClose={() => setSelectedGenereMovie(null)} />
			)}
		</>
	);
};

export default Home;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import RecommendedCard from "./RecommendedCard";
import type { Movie } from "./Home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import MovieDetailModal from "./MovieDetailModal";

const SearchResultsModal = ({
	movies,
	onClose,
	initialSearch
}: {
	movies: Movie[];
	onClose: () => void;
	initialSearch: string;
}) => {
	const [searchInput, setSearchInput] = useState("");
	const [results, setResults] = useState<Movie[]>(movies);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [selectedMovie,setSelectedMovie] = useState<Movie | null>()
	const [hasMore, setHasMore] = useState(true);
	const [pageSize] = useState(20);
	const token = localStorage.getItem('token');

	const fetchMovies = async (customPage = page, search = searchInput) => {
		setLoading(true);
		try {
			const res = await axios.get(
				`https://hackethonbe.onrender.com/movie/search?query=${search}&page=${customPage}&page_size=${pageSize}`
			);
			const newMovies: Movie[] = res.data.data.movies;
			setResults(newMovies);
			setHasMore(newMovies.length === pageSize);
		} catch (err) {
			console.error("Search error:", err);
			setResults([]);
			setHasMore(false);
		}
		setLoading(false);
	};

	const handleSearch = () => {
		setPage(1);
		setHasMore(true);
		fetchMovies(1, searchInput);
	};

	const handleNextPage = () => {
		const nextPage = page + 1;
		setPage(nextPage);
		fetchMovies(nextPage, searchInput);
	};

	const handlePrevPage = () => {
		const prevPage = Math.max(1, page - 1);
		setPage(prevPage);
		fetchMovies(prevPage, searchInput);
	};

	useEffect(() => {
		if (initialSearch) {
			setSearchInput(initialSearch);
			setPage(1);
			setHasMore(true);
			fetchMovies(1, initialSearch);
		}
	}, [initialSearch]);

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
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				zIndex: 10000,
				backdropFilter: "blur(6px)",
			}}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				style={{
					width: "80vw",
					height: "100vh",
					background: "#000",
					borderRadius: "16px",
					padding: "0px 20px",
					boxShadow: "0 0 20px rgba(0,0,0,0.7)",
					display: "flex",
					flexDirection: "column",
					position: "relative",
					overflow: "hidden",

				}}
			>
				<div
					style={{
						position: "sticky",
						top: 0,
						backgroundColor: "#000",
						zIndex: 5,
						paddingTop: "20px",
						paddingBottom: "10px",
					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							gap: "20px",
							flexWrap: "wrap",
							marginBottom: "10px",
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
							 Explore Results
						</div>

						<div style={{ position: "relative", width: "300px" }}>
							<FontAwesomeIcon
								icon={faSearch}
								style={{
									position: "absolute",
									top: "50%",
									left: "10px",
									transform: "translateY(-50%)",
									color: "#fff",
								}}
							/>
							<input
								type="text"
								placeholder="Search..."
								value={searchInput}
								onChange={(e) => { setSearchInput(e.target.value); handleSearch() }}
								style={{
									width: "100%",
									padding: "10px 15px 10px 35px",
									borderRadius: "10px",
									border: "2px solid #fff",
									background: "transparent",
									color: "white",
									outline: "none",
								}}
							/>
						</div>
					</div>
					<hr style={{ borderColor: "#F5B82B", opacity: 0.5 }} />
				</div>
				<div
					style={{
						flex: 1,
						overflowY: "auto",
						paddingTop: "20px",
						paddingBottom: "80px",
						position: "relative",
						scrollbarWidth:"none"
					}}
				>
					{loading && (
						<div
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								height: "100%",
								backgroundColor: "rgba(0, 0, 0)",
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
										fontSize: "14px",
										animation: "blink 1.5s infinite",
									}}
								>
									LOADING
								</div>
							</div>
						</div>
					)}

					{results.length === 0 && !loading ? (
						<div style={{ color: "white", textAlign: "center" }}>No movies found</div>
					) : (
						<div
							style={{
								display: "flex",
								flexWrap: "wrap",
								gap: "20px",
								justifyContent: "center",
							}}
						>
							{results.map((movie, i) => (
								<motion.div
									key={movie.movie_id}
									initial={{ opacity: 0, y: 40 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: i * 0.05 }}
								>
									<RecommendedCard movie={movie} onClick={() => setSelectedMovie(movie)}/>
								</motion.div>
							))}
						</div>
					)}
				</div>
				<div
					style={{
						position: "sticky",
						bottom: 0,
						background: "#000",
						padding: "15px 0",
						display: "flex",
						justifyContent: "center",
						gap: "10px",
						borderTop: "1px solid #222",
						zIndex: 5,
					}}
				>
					<button
						onClick={handlePrevPage}
						disabled={page === 1}
						style={{
							background: "#F5B82B",
							color: "black",
							padding: "10px 15px",
							borderRadius: "8px",
							border: "none",
							cursor: "pointer",
							fontWeight: "bold",
						}}
					>
						← Prev
					</button>
					<button
						onClick={handleNextPage}
						disabled={!hasMore}
						style={{
							background: "#F5B82B",
							color: "black",
							padding: "10px 15px",
							borderRadius: "8px",
							border: "none",
							cursor: "pointer",
							fontWeight: "bold",
						}}
					>
						Next →
					</button>
				</div>
			</div>
			{selectedMovie && (
				<MovieDetailModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
			)}
		</div>
	);
};

export default SearchResultsModal;

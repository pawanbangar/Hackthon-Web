import { useEffect, useState } from "react";
import vector1 from "../assets/Vector1.svg"
import vector2 from "../assets/Vector2.svg"
import NavBar from "../components/NavBar";

export type Movie = {
	id: number;
	title: string;
	description: string;
	image: string;
	releaseDate: string;
	rating: string;
	genre : string
}

export const rawMovies = [
	{
		id: 1,
		title: "friday after next",
		description: "When a burglar robs Craig and D-Day on Christmas Eve, the penniless cousins must acquire rent money quickly. Chaos ensues as they get hired as a security guard and stumble into trouble.",
		image: "https://5aca-27-5-183-17.ngrok-free.app/posters/10426.jpg",
		releaseDate: "2002-11-22",
		rating: "5.8",
		genre : "Action"
	},
	{
		id: 2,
		title: "Interstellar",
		description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
		image: "https://5aca-27-5-183-17.ngrok-free.app/posters/31357.jpg",
		releaseDate: "2014-11-07",
		rating: "8.6",
		genre : "Action"
	},
	{
		id: 3,
		title: "Spider-Man: No Way Home",
		description: "Peter Parker seeks help from Doctor Strange when his identity is revealed, but things spiral out of control.",
		image: "https://5aca-27-5-183-17.ngrok-free.app/posters/10007.jpg",
		releaseDate: "2021-12-17",
		rating: "8.2",
		genre : "Drama"
	},
	{
		id: 4,
		title: "The Batman",
		description: "Batman uncovers corruption in Gotham while pursuing the Riddler, a sadistic serial killer.",
		image: "https://5aca-27-5-183-17.ngrok-free.app/posters/11862.jpg",
		releaseDate: "2022-03-04",
		rating: "7.9",
		genre : "Drama"
	},
	{
		id: 5,
		title: "Doctor Strange",
		description: "A former neurosurgeon embarks on a journey of healing and becomes the Sorcerer Supreme.",
		image: "https://5aca-27-5-183-17.ngrok-free.app/posters/9087.jpg",
		releaseDate: "2016-11-04",
		rating: "7.5",
		genre : "Drama"
	},
	{
		id: 6,
		title: "Black Panther",
		description: "T'Challa returns to Wakanda to take his place as king but faces a formidable enemy from the past.",
		image: "https://5aca-27-5-183-17.ngrok-free.app/posters/524.jpg",
		releaseDate: "2018-02-16",
		rating: "7.3",
		genre : "Horror"
		
	},
	{
		id: 8,
		title: "Iron Man",
		description: "After being held captive, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
		image: "https://5aca-27-5-183-17.ngrok-free.app/posters/8012.jpg",
		releaseDate: "2008-05-02",
		rating: "7.9",
		genre : "Horror"
	},
	{
		id: 9,
		title: "Avatar",
		description: "A paraplegic Marine dispatched to Pandora becomes torn between following orders and protecting an alien civilization.",
		image: "https://5aca-27-5-183-17.ngrok-free.app/posters/9691.jpg",
		releaseDate: "2009-12-18",
		rating: "7.8",
		genre : "Action"
	},
	{
		id: 10,
		title: "The Dark Knight",
		description: "Batman sets out to dismantle the remaining criminal organizations in Gotham, but is soon faced with chaos unleashed by the Joker.",
		image: "https://5aca-27-5-183-17.ngrok-free.app/posters/451.jpg",
		releaseDate: "2008-07-18",
		rating: "9.0",
		genre : "Horror"
	},
	{
		id: 12,
		title: "Captain America: Civil War",
		description: "Political pressure mounts to install a system of accountability when the actions of the Avengers lead to collateral damage.",
		image: "https://5aca-27-5-183-17.ngrok-free.app/posters/1710.jpg",
		releaseDate: "2016-05-06",
		rating: "7.8",
		genre : "Action"
	},
	{
		id: 13,
		title: "Shang-Chi and the Legend of the Ten Rings",
		description: "Shang-Chi must confront the past he thought he left behind when he is drawn into the web of the mysterious Ten Rings organization.",
		image: "https://5aca-27-5-183-17.ngrok-free.app/posters/9091.jpg",
		releaseDate: "2021-09-03",
		rating: "7.7",
		genre : "Sci-Fi"
	},
	{
		id: 14,
		title: "The Flash",
		description: "Barry Allen uses his super speed to travel back in time to change the events of the past, but his attempt alters the future.",
		image: "https://5aca-27-5-183-17.ngrok-free.app/posters/8844.jpg",
		releaseDate: "2023-06-16",
		rating: "6.9",
		genre : "Sci-Fi"
	}
];



const Home = () => {
	const [selectedMovie, setSelectedMovie] = useState(rawMovies[0]);
	const [currentPage, setCurrentPage] = useState(1);
	const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);

	useEffect(() => {
		const end = currentPage * 6;
		if (currentPage == 1) {
			setDisplayedMovies(rawMovies.slice(0, end));
		} else {
			setDisplayedMovies(rawMovies.slice((currentPage * 6) - 6, end));
		}
	}, [currentPage]);

	return (
		<>
			<style>
				{`
          .transparent-input::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }
        `}
			</style>
			<div className="bg-container" style={{ width: "100vw", minHeight: "100vh", position: "relative", zIndex: "1", display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: `url(${selectedMovie.image})`, backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden" }}>
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						background: "linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))",
						zIndex: 1,
					}}
				/>
				<NavBar/>
				<div className="content-container" style={{ height: "50vh", width: "95vw", position: "absolute", zIndex: "2", top: "10%", display: "flex", alignItems: "center" }}>
					<div className="content" style={{ height: "35vh", width: "40vw", paddingLeft: "10px", color: "white" }}>
						<div className="col-lg-12 col-md-12">
							<h1 className="fw-bold display-5">{selectedMovie.title}</h1>
							<p className="lead">{selectedMovie.description}</p>
							<p className="mt-3">
								<strong>Release Date:</strong> {selectedMovie.releaseDate}
							</p>
							<p>
								<strong>IMDb Rating:</strong> {selectedMovie.rating} / 10
							</p>
							<button className="btn btn-warning mt-3 px-4">Preview</button>
						</div>
					</div>
				</div>
				<div
					className="card-container"
					style={{
						height: "40vh",
						width: "95vw",
						position: "absolute",
						zIndex: "2",
						bottom: "0",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<button
						onClick={() => setCurrentPage((prev) => prev - 1)}
						style={{
							position: "absolute",
							left: "10px",
							bottom: "50%",
							transform: "translateY(50%)",
							zIndex: 3,
							backgroundColor: "rgba(255, 255, 255, 0.2)",
							border: "none",
							borderRadius: "8px",
							cursor: "pointer",
							fontWeight: "bold",
							padding: "8px",
							backdropFilter: "blur(6px)",
							WebkitBackdropFilter: "blur(6px)",
							boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
							transition: "background-color 0.3s ease",
						}}
						disabled={currentPage === 1}
					>
						<img src={vector1} alt="Previous" />
					</button>

					<div
						className="content"
						style={{
							height: "45vh",
							maxWidth: "95vw",
							overflowX: "auto",
							whiteSpace: "nowrap",
							display: "flex",
							alignItems: "center",
							gap: "30px",
							paddingLeft: "40px",
							paddingRight: "40px",
							scrollbarWidth: "none",
							scrollSnapType: "x mandatory",
						}}
					>
						{displayedMovies.map((movie, idx) => (
							<img
								key={`${movie.id}-${idx}`}
								src={movie.image}
								alt={movie.title}
								onClick={() => setSelectedMovie(movie)}
								className={`rounded shadow ${selectedMovie.image === movie.image ? "border border-warning border-3" : ""}`}
								style={{
									width: "186px",
									height: "244px",
									objectFit: "cover",
									cursor: "pointer",
									transition: "transform 0.3s",
									flex: "0 0 auto",
									scrollSnapAlign: "start",
									transform: selectedMovie.image === movie.image ? "scale(1.2)" : "scale(1)",
									zIndex: selectedMovie.image === movie.image ? 20 : 10,
									position: selectedMovie.image === movie.image ? "relative" : "static",
									filter: selectedMovie && selectedMovie.image !== movie.image ? "blur(1px)" : "none",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform = "scale(1.2)";
									e.currentTarget.style.zIndex = "10";
									e.currentTarget.style.position = "relative";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform = selectedMovie.image !== movie.image ? "scale(1)" : "scale(1.2)";
									e.currentTarget.style.zIndex = selectedMovie.image !== movie.image ? "1" : "10";
									e.currentTarget.style.position = selectedMovie.image !== movie.image ? "static" : "relative";
								}}
							/>
						))}
					</div>
					<button
						onClick={() => setCurrentPage((prev) => prev + 1)}
						style={{
							position: "absolute",
							right: "10px",
							bottom: "50%",
							transform: "translateY(50%)",
							zIndex: 3,
							border: "none",
							borderRadius: "8px",
							cursor: "pointer",
							fontWeight: "bold",
							backdropFilter: "blur(6px)",
							WebkitBackdropFilter: "blur(6px)",
							boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
							transition: "background-color 0.3s ease",
							backgroundColor: "rgba(255, 255, 255, 0.2)",
							padding: "8px",
						}}
						disabled={!(currentPage * 6 <= rawMovies.length)}
					>
						<img src={vector2} />
					</button>
				</div>
			</div>
		</>
	);
};

export default Home;

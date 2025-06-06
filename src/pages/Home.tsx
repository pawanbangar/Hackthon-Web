import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import api from "../utils/axios";

const rawMovies = [
	{
		id: 1,
		title: "Avengers: Endgame",
		description: "The Avengers assemble once more to reverse Thanos's actions and restore balance to the universe.",
		image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
		releaseDate: "2019-04-26",
		rating: "8.4",
	},
	{
		id: 2,
		title: "Interstellar",
		description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
		image: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
		releaseDate: "2014-11-07",
		rating: "8.6",
	},
	{
		id: 3,
		title: "Spider-Man: No Way Home",
		description: "Peter Parker seeks help from Doctor Strange when his identity is revealed, but things spiral out of control.",
		image: "https://image.tmdb.org/t/p/w500/uJYYizSuA9Y3DCs0qS4qWvHfZg4.jpg",
		releaseDate: "2021-12-17",
		rating: "8.2",
	},
	{
		id: 4,
		title: "The Batman",
		description: "Batman uncovers corruption in Gotham while pursuing the Riddler, a sadistic serial killer.",
		image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
		releaseDate: "2022-03-04",
		rating: "7.9",
	},
	{
		id: 5,
		title: "Doctor Strange",
		description: "A former neurosurgeon embarks on a journey of healing and becomes the Sorcerer Supreme.",
		image: "https://image.tmdb.org/t/p/w500/xfNHRI2f5kHGvogxLd0C5sB90L7.jpg",
		releaseDate: "2016-11-04",
		rating: "7.5",
	},
	{
		id: 6,
		title: "Black Panther",
		description: "T'Challa returns to Wakanda to take his place as king but faces a formidable enemy from the past.",
		image: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
		releaseDate: "2018-02-16",
		rating: "7.3",
	},
	{
		id: 8,
		title: "Iron Man",
		description: "After being held captive, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
		image: "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
		releaseDate: "2008-05-02",
		rating: "7.9",
	},
	{
		id: 9,
		title: "Avatar",
		description: "A paraplegic Marine dispatched to Pandora becomes torn between following orders and protecting an alien civilization.",
		image: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
		releaseDate: "2009-12-18",
		rating: "7.8",
	},
	{
		id: 10,
		title: "The Dark Knight",
		description: "Batman sets out to dismantle the remaining criminal organizations in Gotham, but is soon faced with chaos unleashed by the Joker.",
		image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
		releaseDate: "2008-07-18",
		rating: "9.0",
	},
	{
	id: 12,
	title: "Captain America: Civil War",
	description: "Political pressure mounts to install a system of accountability when the actions of the Avengers lead to collateral damage.",
	image: "https://image.tmdb.org/t/p/w500/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg",
	releaseDate: "2016-05-06",
	rating: "7.8",
},
{
	id: 13,
	title: "Shang-Chi and the Legend of the Ten Rings",
	description: "Shang-Chi must confront the past he thought he left behind when he is drawn into the web of the mysterious Ten Rings organization.",
	image: "https://image.tmdb.org/t/p/w500/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg",
	releaseDate: "2021-09-03",
	rating: "7.7",
},
{
	id: 14,
	title: "The Flash",
	description: "Barry Allen uses his super speed to travel back in time to change the events of the past, but his attempt alters the future.",
	image: "https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
	releaseDate: "2023-06-16",
	rating: "6.9",
},
{
	id: 15,
	title: "Deadpool",
	description: "A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.",
	image: "https://image.tmdb.org/t/p/w500/fSRb7vyIP8rQpL0I47P3qUsEKX3.jpg",
	releaseDate: "2016-02-12",
	rating: "8.0",
},
{
	id: 16,
	title: "Joker",
	description: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society, leading him to a downward spiral.",
	image: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
	releaseDate: "2019-10-04",
	rating: "8.4",
}

];

const Home = () => {
	const [selectedMovie, setSelectedMovie] = useState(rawMovies[0]);
	// const [movies , setMovies] = useState([]);

	const getAllMovies = async () => {
		const res = await api.get("/movie/")

		console.log(res);

	}

	useEffect(() => {
		getAllMovies()
	}, [])

	return (
		<div
			className="text-white d-flex flex-column justify-content-end position-relative"
			style={{
				minHeight: "100vh",
				backgroundImage: `url(${selectedMovie.image})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				overflow: "hidden",
			}}
		>
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					backdropFilter: "blur(10px)",
					backgroundColor: "rgba(0, 0, 0, 0.4)",
					zIndex: 1,
				}}
			/>
			<NavBar />
			<div
				style={{
					zIndex: 2,
					paddingTop: "6rem",
					paddingBottom: "6rem",
					paddingLeft: "1rem"
				}}
			>
				<div className="col-lg-8 col-md-10">
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
			<div
				className="py-4 px-3 px-md-5"
				style={{
					zIndex: 2,
					overflowX: "auto",
					whiteSpace: "nowrap",
					scrollSnapType: "x mandatory",
				}}
			>
				<div className="d-flex gap-3" style={{ maxWidth: "100%", height: "auto" }}>
					{rawMovies.map((movie, idx) => (
						<img
							key={`${movie.id}-${idx}`}
							src={movie.image}
							alt={movie.title}
							onClick={() => setSelectedMovie(movie)}
							className={`rounded shadow ${selectedMovie.image === movie.image ? "border border-warning border-3" : ""
								}`}
							style={{
								width: "140px",
								height: "200px",
								objectFit: "cover",
								cursor: "pointer",
								transition: "transform 0.3s",
								flex: "0 0 auto",
								scrollSnapAlign: "start",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = "scale(1.1)";
								e.currentTarget.style.zIndex = "10";
								e.currentTarget.style.position = "relative";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = "scale(1)";
								e.currentTarget.style.zIndex = "1";
								e.currentTarget.style.position = "static";
							}}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;

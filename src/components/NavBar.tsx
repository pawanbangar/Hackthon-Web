import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/Logo.svg";
import { faSearch, faSpinner, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SearchResultsModal from "../pages/SearchModal";
import type { Movie } from "../pages/Home";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { notify } from "../utils/notify";

const NavBar = () => {
	const [showSearchModal, setShowSearchModal] = useState(false);
	const [allMovies, setAllMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState(false);
	const [initialSearchText, setInitialSearchText] = useState("");
	const navigate = useNavigate();
	const { logout } = useAuth();

	const handleLogout = () => {
		logout();
		notify('Logged out successfully', 'success');
		navigate('/login');
	};

	const fetchAllMovies = async () => {
		setLoading(true);
		try {
			const res = await api.get(
				`/movie?page=1&page_size=20`
			);
			setAllMovies(res.data.data.movies);
		} catch (error) {
			console.error("Failed to fetch movies", error);
			setAllMovies([]);
		}
		setLoading(false);
	};

	return (
		<>
			<style>
				{`
					.transparent-input::placeholder {
						color: #fff;
					}
        		`}
			</style>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "10px 20px",
				}}
			>
				<img src={logo} alt="Logo" style={{ width: "261.587px" }} />

				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "25px",
						cursor: "pointer",
					}}
				>
					<div
						style={{
							position: "relative",
							display: "flex",
							alignItems: "center",
							border: "2px solid #fff",
							borderRadius: "10px",
							padding: "6px 12px",
							color: "#fff",
							width: "400px",
							background: "transparent",
							justifyContent: "space-between",
						}}
					>
						<div style={{ display: "flex", alignItems: "center" }}>
							<FontAwesomeIcon
								icon={faSearch}
								style={{
									marginRight: "10px",
									color: "#fff",
								}}
							/>
							<input
								type="text"
								placeholder="Search..."
								value={initialSearchText}
								onChange={(e) => setInitialSearchText(e.target.value)}
								onKeyDown={async (e) => {
									if (e.key === "Enter") {
										await fetchAllMovies();
										setShowSearchModal(true);
									}
								}}
								style={{
									background: "transparent",
									border: "none",
									outline: "none",
									color: "white",
									opacity: 0.8,
									width: "100%",
								}}
							/>

						</div>
						{loading && (
							<FontAwesomeIcon
								icon={faSpinner}
								spin
								style={{ color: "#fff", fontSize: "16px", marginLeft: "10px" }}
							/>
						)}
					</div>

					<div
						onClick={() => {
							navigate('/preferences');
						}}
						style={{
							width: "32px",
							height: "32px",
							borderRadius: "50%",
							backgroundColor: "#aaa",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							color: "white",
							fontWeight: "bold",
							fontSize: "14px",
							cursor: "pointer",
							border: "2px solid white",
						}}
					>
						P
					</div>

					<div
						onClick={handleLogout}
						style={{
							width: "32px",
							height: "32px",
							borderRadius: "50%",
							backgroundColor: "#ff4444",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							color: "white",
							cursor: "pointer",
							border: "2px solid white",
							transition: "all 0.3s ease",
						}}
						onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#ff0000")}
						onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ff4444")}
					>
						<FontAwesomeIcon icon={faSignOutAlt} />
					</div>
				</div>
			</div>

			{showSearchModal && (
				<SearchResultsModal
					movies={allMovies}
					onClose={() => setShowSearchModal(false)}
					initialSearch={initialSearchText}
				/>
			)}
		</>
	);
};

export default NavBar;

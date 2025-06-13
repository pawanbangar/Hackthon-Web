import { useAuth } from '../context/AuthContext';
import filmIcon from "../assets/film1.svg"
import searchIcon from "../assets/search.png"
import vector1 from "../assets/Vector1.svg"
import vector2 from "../assets/Vector2.svg"
import Profile from "../assets/Profile.png"
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <style>
        {`
          .transparent-input::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }
        `}
      </style>

      <div className="navbar-container" style={{ height: "10vh", width: "95vw", position: "absolute", zIndex: "2", top: "0", display: "flex", justifyContent: "center", alignItems: "center" }}>
					<div className="logo-text" style={{ height: "7vh", width: "50vw", display: "flex", alignItems: "center", gap: "3px" }}>
						<div className="log">
							<img src={filmIcon} alt="" />
						</div>
						<div className="text" style={{ fontSize: "32px", fontStyle: "italic", fontWeight: 700, lineHeight: "normal", background: "linear-gradient(275deg, #00DDB3 -42.06%, #0857A0 89.98%)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
							RHEOflix
						</div>
					</div>
					<div className="search-bar" style={{ height: "7vh", width: "45vw", display: "flex", alignItems: "center", gap: "20px", justifyContent: "end", position: "relative", zIndex: "3" }}>
						<Link to="/" style={{ color: "white", textDecoration: "none", fontWeight:"900" }}>Home</Link>
						<Link to="/movie" style={{ color: "white", textDecoration: "none",fontWeight:"900" }}>Movie</Link>
						<img style={{fontWeight:"900"}} src={searchIcon} />
						<img src={Profile} style={{ width: "5vh", height: "5vh", borderRadius: "100%", backgroundColor: "white" }} />
					</div>
				</div>
    </>
  );
}

export default NavBar;

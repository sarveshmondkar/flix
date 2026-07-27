import { Link } from "react-router-dom";
import { Film, Heart } from "lucide-react";
import "../css/Navbar.css";

function Navbar() {
  const handleLogoClick = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <nav className="navbar">
      <Link
        to="/?reset=true"
        className="navbar-brand"
        onClick={handleLogoClick}
      >
        <div className="logo">
          <Film size={22} strokeWidth={2.5} />
        </div>

        <span className="brand-text">Flix</span>
      </Link>

      <div className="navbar-links">
        <Link to="/favorites" className="nav-link">
          <Heart size={18} className="heart-icon" />
          Favorites
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

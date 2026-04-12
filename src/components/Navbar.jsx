// ============================================================
// NAVBAR COMPONENT
// A sticky top bar with the logo and a badge.
// "Sticky" means it stays at the top as you scroll down.
// ============================================================

import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__inner">

        {/* Logo — clicking scrolls back to top */}
        <a href="#top" className="navbar__logo">
          ResumeLens
          <span className="navbar__dot" /> {/* blinking green dot */}
        </a>

        {/* Right-side badge */}
        <span className="navbar__badge">AI-Powered ✦</span>

      </div>
    </nav>
  );
}

export default Navbar;

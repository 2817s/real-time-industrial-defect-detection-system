import { Bell, Search } from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-search">
        <Search size={19} />

        <input
          type="text"
          placeholder="Search inspections, reports, defects..."
        />
      </div>

      <div className="navbar-actions">
        <button className="notification-button" type="button">
          <Bell size={20} />
          <span></span>
        </button>

        <div className="user-profile">
          <div className="user-avatar">MP</div>

          <div>
            <strong>Mukt Patel</strong>
            <p>Frontend Engineer</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
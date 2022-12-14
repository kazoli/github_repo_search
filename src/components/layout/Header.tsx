import { memo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  AiOutlineHistory,
  AiOutlineFileSearch,
  AiOutlineMenu
} from 'react-icons/ai';
import DropDownMenu from '../general/DropDownMenu';

function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <div className="header-left">
        <NavLink to="/" className="header-logo">
          <span>Repo</span>Search
        </NavLink>
      </div>
      <div className="header-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'header-nav highlighted' : 'header-nav'
          }
        >
          <AiOutlineFileSearch className="header-nav-icon" />
          <span>Search</span>
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive ? 'header-nav highlighted' : 'header-nav'
          }
        >
          <AiOutlineHistory className="header-nav-icon" />
          <span>History</span>
        </NavLink>
      </div>
      <div className="header-right">
        <DropDownMenu
          trigger={<AiOutlineMenu className="header-nav-icon" />}
          options={{
            '/': 'Search',
            '/history': 'History',
            '/page1': 'Page 1',
            '/page2': 'Page 2'
          }}
          action={(value) => navigate(value)}
        />
      </div>
    </header>
  );
}

export default memo(Header);

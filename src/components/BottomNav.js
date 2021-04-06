import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faUserCircle, faHeart } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/components/BottomNav.module.css';

const tabs = [{
  route: "/",
  icon: faHome,
  label: "Home"
},{
  route: "/favorites",
  icon: faHeart,
  label: "Favorites"
}]

export default function Footer() {
  return (
    <div className={styles.bottomNav}>
      <div className={styles.bottomNavContainer}>
        {tabs.map((tab, index) => (
          <NavLink
            to={tab.route}
            exact={true}
            className={styles.bottomNavLinks}
            activeClassName={styles.bottomNavLinksActive}
            key={`tab-${index}`}
          >
            <div>
              <FontAwesomeIcon size="lg" icon={tab.icon} />
              <div>{tab.label}</div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  )
};

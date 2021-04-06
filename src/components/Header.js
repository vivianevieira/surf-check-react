import React from 'react';
import { Link } from 'react-router-dom'

import styles from '../styles/components/Header.module.css';

export default function Header() {
  return (
    <header>
      <div className={styles.headerContainer}>
        <div className={styles.headerTitle}>
          <h3><Link to="/">Surf Check</Link></h3>
        </div>
      </div>
    </header>
  )
};

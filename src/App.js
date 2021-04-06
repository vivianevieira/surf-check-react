import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import SurfCheck from './pages/SurfCheck';
import { LocSearchProvider } from './contexts/LocSearchContext';
import { SurfDataProvider } from './contexts/SurfDataContext';

import styles from '../src/styles/App.module.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <SurfDataProvider>
        <LocSearchProvider>
        <div className={styles.container}>
          <Switch>
            <Route path="/favorites">
              <Favorites />
            </Route>
            <Route path="/surfcheck">
              <SurfCheck />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
        </LocSearchProvider>
        </SurfDataProvider>
        <BottomNav />
     </BrowserRouter>
    </>
  );
}

export default App;

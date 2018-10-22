import React from 'react';
import { state } from 'cerebral';
import { connect } from '@cerebral/react';

import UsaBanner from './UsaBanner';
import Header from './Header';
import Footer from './Footer';

import Home from './Home';
import StyleGuide from './StyleGuide';

const pages = {
  Home,
  StyleGuide,
};

/**
 * Root application component
 */
export default connect(
  {
    currentPage: state.currentPage,
  },
  function App({ currentPage }) {
    const CurrentPage = pages[currentPage];
    return (
      <React.Fragment>
        <UsaBanner />
        <Header />
        <main id="main-content">
          <CurrentPage />
        </main>
        <Footer />
      </React.Fragment>
    );
  },
);
import { connect } from '@cerebral/react';
import { state } from 'cerebral';
import PropTypes from 'prop-types';
import React from 'react';

import CaseDetailInternal from './CaseDetailInternal';
import CaseDetailPetitioner from './CaseDetailPetitioner';
import CaseDetailPublic from './CaseDetailPublic';
import CaseDetailRespondent from './CaseDetailRespondent';
import DashboardDocketClerk from './DashboardDocketClerk';
import DashboardIntakeClerk from './DashboardIntakeClerk';
import DashboardPetitioner from './DashboardPetitioner';
import DashboardPetitionsClerk from './DashboardPetitionsClerk';
import DashboardPublic from './DashboardPublic';
import DashboardRespondent from './DashboardRespondent';
import DashboardSeniorAttorney from './DashboardSeniorAttorney';
import DocumentDetail from './DocumentDetail';
import FilePetition from './FilePetition';
import Footer from './Footer';
import Header from './Header';
import Loading from './Loading';
import LogIn from './LogIn';
import StyleGuide from './StyleGuide';
import UsaBanner from './UsaBanner';

const pages = {
  CaseDetailInternal,
  CaseDetailPetitioner,
  CaseDetailPublic,
  CaseDetailRespondent,
  DashboardDocketClerk,
  DashboardIntakeClerk,
  DashboardPetitioner,
  DashboardPetitionsClerk,
  DashboardPublic,
  DashboardRespondent,
  DashboardSeniorAttorney,
  DocumentDetail,
  FilePetition,
  Loading,
  LogIn,
  StyleGuide,
};

/**
 * Root application component
 */
class App extends React.Component {
  componentDidUpdate() {
    this.focusMain();
  }
  focusMain(e) {
    e && e.preventDefault();
    document.querySelector('#main-content h1').focus();
    return false;
  }
  render() {
    const CurrentPage = pages[this.props.currentPage];
    return (
      <React.Fragment>
        <a
          tabIndex="0"
          className="usa-skipnav"
          href="#main-content"
          onClick={this.focusMain}
        >
          Skip to main content
        </a>
        <UsaBanner />
        <Header />
        <main id="main-content" role="main">
          <CurrentPage />
        </main>
        <Footer />
        <Loading />
      </React.Fragment>
    );
  }
}
App.propTypes = {
  currentPage: PropTypes.string,
};

export default connect(
  {
    currentPage: state.currentPage,
  },
  App,
);
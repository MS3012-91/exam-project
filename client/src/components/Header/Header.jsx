import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import styles from './Header.module.sass';
import CONSTANTS from '../../constants';
import { clearUserStore } from '../../store/slices/userSlice';
import { getUser } from '../../store/slices/userSlice';
import { menuItems } from './HeaderRouting';

class Header extends React.Component {
  componentDidMount () {
    if (!this.props.data) {
      this.props.getUser();
    }
  }

  logOut = () => {
    localStorage.clear();
    this.props.clearUserStore();
    this.props.history.replace('/login');
  };

  startContests = () => {
    this.props.history.push('/startContest');
  };

  renderLoginButtons = () => {
    const { data } = this.props;
    if (data) {
      const avatarSrc =
        data.avatar === 'anon.png'
          ? CONSTANTS.ANONYM_IMAGE_PATH
          : `${CONSTANTS.publicURL}${data.avatar}`;

      const userLinks = [
        { to: '/dashboard', text: 'View Dashboard' },
        { to: '/account', text: 'My Account' },
        { to: '#', text: 'Messages' },
        { to: '#', text: 'Affiliate Dashboard' },
        { onClick: this.logOut, text: 'Logout' },
      ];

      return (
        <>
          <div className={styles.userInfo}>
            <img src={avatarSrc} alt='user' />
            <span>{`Hi, ${data.displayName}`}</span>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
              alt='menu'
            />
            <ul>
              {userLinks.map((link, index) => (
                <li key={index}>
                  {link.to ? (
                    <Link to={link.to}>
                      <span>{link.text}</span>
                    </Link>
                  ) : (
                    <button onClick={link.onClick} className={styles.logout}>
                      {link.text}{' '}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <a href='mailto: email@example.com'>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`}
              alt='email'
              className={styles.emailIcon}
            />
          </a>
        </>
      );
    } else {
      const authLinks = [
        { to: '/login', text: 'LOGIN' },
        { to: '/registration', text: 'SIGN UP' },
      ];
      return (
        <ul className={styles.loginButtons}>
          {authLinks.map((link, index) => (
            <li key={index}>
              <Link to={link.to}>
                <button className={styles.btn}>{link.text}</button>
              </Link>
            </li>
          ))}
        </ul>
      );
    }
  };

  render () {
    const { isFetching, data } = this.props;
    const isBuyer = data && data.role !== CONSTANTS.CREATOR;

    if (isFetching) {
      return null;
    }
    return (
      <div className={styles.headerContainer}>
        <div className={styles.fixedHeader}>
          <span className={styles.info}>
            Squadhelp recognized as one of the Most Innovative Companies by Inc
            Magazine.
          </span>
          <a href='#'>Read Announcement</a>
        </div>
        <div className={styles.loginSignUpHeaders}>
          <div className={styles.numberContainer}>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`} alt='phone' />
            <a href={`tel:${CONSTANTS.TELEPHONE_SQUADHELP_SERVICE}`}>
              {CONSTANTS.TELEPHONE_SQUADHELP_SERVICE}
            </a>
          </div>
          <div className={styles.userButtonsContainer}>
            {this.renderLoginButtons()}
          </div>
        </div>
        <div className={styles.navContainer}>
          <a href='/'>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`}
              className={styles.logo}
              alt='blue_logo'
            />
          </a>
          <div className={styles.leftNav}>
            <nav className={styles.nav}>
              <ul className={styles.menuItem}>
                {menuItems.map((menuItem, index) => (
                  <li key={index}>
                    <span>{menuItem.section}</span>
                    <img
                      src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                      alt='menu'
                    />
                    <ul className={styles.submenu}>
                      {menuItem.submenu &&
                        menuItem.submenu.map((subItem, subIndex) => (
                          <li
                            key={subIndex}
                            className={subItem.last ? styles.last : ''}
                          >
                            <a href={subItem.href}>{subItem.chapter}</a>
                          </li>
                        ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </nav>
            {isBuyer && (
              <div
                className={styles.startContestBtn}
                onClick={this.startContests}
              >
                START CONTEST
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state.userStore;
const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser()),
  clearUserStore: () => dispatch(clearUserStore()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

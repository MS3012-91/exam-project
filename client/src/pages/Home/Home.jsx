import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import CONSTANTS from '../../constants';
import SlideBar from '../../components/SlideBar/SlideBar';
import Footer from '../../components/Footer/Footer';
import styles from './Home.module.sass';
import carouselConstants from '../../carouselConstants';
import Spinner from '../../components/Spinner/Spinner';
import { articles } from './Articles';
import { sponsorImages } from './Sponsors';
import { stepsData } from './StepsData';

const Home = props => {
  const [index, setIndex] = useState(0);
  const [styleName, setStyle] = useState(styles.headline__static);
  const [activeIndex, setActiveIndex] = useState(null);
  let timeout;

  const userData = useSelector(state => state.userStore.data);

  const handleImageClick = index => {
    setActiveIndex(index);
  };

  useEffect(() => {
    timeout = setInterval(() => {
      setIndex(index + 1);
      setStyle(styles.headline__isloading);
    }, 3000);
    return () => {
      setStyle(styles.headline__static);
      clearInterval(timeout);
    };
  }, []);

  const { isFetching } = props;
  const text =
    CONSTANTS.HEADER_ANIMATION_TEXT[
      index % CONSTANTS.HEADER_ANIMATION_TEXT.length
    ];
  return (
    <>
      <Header />
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.container}>
            <section className={styles.headerBar}>
              <div className={styles.headline}>
                <h1>
                  Find the Perfect Name for
                  <span className={styleName}>{text}</span>
                </h1>
              </div>
              <p>
                Launch a naming contest to engage hundreds of naming experts as
                you’re guided through our agency-level naming process. Or,
                explore our hand-picked collection of premium names available
                for immediate purchase
              </p>
              {userData && (
                <div className={styles.button}>
                  <Link className={styles.button__link} to='/dashboard'>
                    DASHBOARD
                  </Link>
                </div>
              )}
            </section>
            <section className={styles.greyContainer}>
              <SlideBar
                images={carouselConstants.mainSliderImages}
                carouselType={carouselConstants.MAIN_SLIDER}
              />
            </section>
            <section className={styles.container__description}>
              <h2 className={styles.blueUnderline}>Why Squadhelp?</h2>
              <div className={styles.cardContainer}>
                {articles.map((article, index) => (
                  <article className={styles.card} key={index}>
                    <img src={article.imageSrc} alt='icon' />
                    <h3>{article.title}</h3>
                    <p>{article.content}</p>
                  </article>
                ))}
              </div>
            </section>
            <section className={styles.greyContainer}>
              <div className={styles.adv}>
                {sponsorImages.map((image, index) => (
                  <div
                    className={styles.images}
                    key={index}
                    onClick={() => handleImageClick(index)}
                  >
                    <img
                      src={
                        activeIndex === index
                          ? image.activeSrc
                          : image.inactiveSrc
                      }
                      alt={image.name}
                    />
                  </div>
                ))}
              </div>
              <div className={styles.stats}>
                <div>
                  <p>119,525</p>
                  <span>Creatives</span>
                </div>
                <div>
                  <p>21,875</p>
                  <span>Customers</span>
                </div>
                <div>
                  <p>85</p>
                  <span>Industries</span>
                </div>
              </div>
            </section>
            <section>
              <h2>How Do Name Contest Work?</h2>
              {stepsData.map((step, index) => (
                <div className={step.containerStyle} key={index}>
                  <div className={step.stepStyle}>
                    <div className={step.textStyle}>
                      <h3>{step.title}</h3>
                      {step.points.map((point, pointIndex) => (
                        <p key={pointIndex}>
                          <i className='fas fa-check' />
                          <span>{point}</span>
                        </p>
                      ))}
                    </div>
                    <img src={step.imageSrc} alt='compressed' />
                  </div>
                </div>
              ))}
            </section>
            <section className={styles.headerBar}>
              <h3>Names For Sale</h3>
              <p className={styles.blueUnderline}>
                Not interested in launching a contest? Purchase a name instantly
                from our hand-picked collection of premium names. Price includes
                a complimentary Trademark Report, a Domain name as well as a
                Logo design
              </p>
            </section>
            <SlideBar
              images={carouselConstants.exampleSliderImages}
              carouselType={carouselConstants.EXAMPLE_SLIDER}
            />
            <section>
              {userData && (
                <div className={styles.button}>
                  <Link className={styles.button__link} to='/dashboard'>
                    DASHBOARD
                  </Link>
                </div>
              )}
            </section>
            <section>
              <div className={styles.blueContainer}>
                <h2 className={styles.whiteUnderline}>What our customers say</h2>
                <SlideBar
                  images={carouselConstants.feedbackSliderImages}
                  carouselType={carouselConstants.FEEDBACK_SLIDER}
                />
              </div>
            </section>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

const mapStateToProps = state => {
  const { isFetching } = state.userStore;
  return { isFetching };
};

export default connect(mapStateToProps, null)(Home);

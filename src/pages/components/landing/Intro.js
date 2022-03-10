import React, {useState} from "react";
import {Carousel} from "react-responsive-carousel";
import {BsArrowLeftCircle, BsArrowRightCircle} from "react-icons/bs";
import TravelForest from "../../../assets/img/videos/travel_forest.mp4";
import Travel_HaLong3 from "../../../assets/img/photos/halong2.jpg";
import Travel_ChauAu from "../../../assets/img/photos/chauau.jpg";

const Intro = (props) => {

    const [hoverArrow, setHoverArrow] = useState(false);

    return (
        <section className="intro"
                 onMouseEnter={() => setHoverArrow(true)}
                 onMouseLeave={() => setHoverArrow(false)}
        >
            <Carousel
                showIndicators={true}
                animationHandler="fade"
                // swipeable={false}
                // autoPlay
                showStatus={false}
                showThumbs={false}
                infiniteLoop
                renderArrowNext={(onClickHandler,hasNext,label) =>
                    hasNext && (
                        <div onClick={onClickHandler} title={label} className="arrownext-custom ">
                            <BsArrowRightCircle size={45} color={'#CADEE6'} fontWeight={100} className={hoverArrow ? "animate__animated animate__fadeInRight" : "animate__animated animate__fadeOutRight"}/>
                            {/* <ArrowRight size={45} color={'white'} fontWeight={100} className={hoverArrow ? "animate__animated animate__fadeInRight" : "animate__animated animate__fadeOutRight"}/> */}
                        </div>
                    )
                }
                renderArrowPrev={(onClickHandler,hasPrev,label) =>
                    hasPrev && (
                        <div onClick={onClickHandler} title={label} className="arrowprev-custom ">
                            <BsArrowLeftCircle size={45} color={'#CADEE6'} fontWeight={100} className={hoverArrow ? "animate__animated animate__fadeInLeft":"animate__animated animate__fadeOutLeft"}/>
                            {/* <ArrowLeft size={45} color={'white'} fontWeight={100} className={hoverArrow ? "animate__animated animate__fadeInLeft":"animate__animated animate__fadeOutLeft"}/> */}
                        </div>
                    )
                }
                renderIndicator={(onClickHandler, isSelected, index, label) => {
                    if(isSelected) {
                        return (
                            <li
                                style={{ width: 8, height: 8, display: 'inline-block', background: '#000' }}
                                aria-label={`Selected: ${label} ${index + 1}`}
                                title={`Selected: ${label} ${index + 1}`}
                            />
                        );
                    }
                    return(
                        <li
                            style={{ width: 8, height: 8, display: 'inline-block', background: '#fff' }}
                            onClick={onClickHandler}
                            onKeyDown={onClickHandler}
                            value={index}
                            key={index}
                            role="button"
                            tabIndex={0}
                            title={`${label} ${index + 1}`}
                            aria-label={`${label} ${index + 1}`}
                        />
                    );
                }

                }
                className="intro-carousel"
            >
                <div className='intro-travel' key="content-0">
                    <video src={TravelForest} type="video/mp4" autoPlay controls={false} loop muted className="intro-background"/>
                    <div className="intro-title">
                        <p className="intro-text">La Petite Venise <br /> Colmar, France </p>
                        <button className="intro-button">Explore now</button>
                        <div className="intro-info">
                            <div className="intro-info__price">
                                <p>Price<br/><span>1000$</span><br/>7 days on 4 persons </p>
                            </div>
                            <div className="intro-info__from">
                                <p>Departure from <br/> <span>Viet Nam</span></p>
                            </div>
                            <div className="intro-info__departureday">
                                <p>Flight day<br/> <span>20</span> <br/>February</p>
                            </div>

                        </div>
                    </div>
                </div>
                {/* <video src={Travel} type="video/mp4" controls={false}  loop muted className='travel-video'/> */}
                <div className="intro-travel">
                    <img src={Travel_HaLong3} alt="travel" className="intro-background" />
                    <div className="intro-title">
                        <p className="intro-text">Vịnh Hạ Long <br></br> Việt Nam </p>
                        <button className="intro-button">Explore now</button>
                        <div className="intro-info">
                            <div className="intro-info__price">
                                <p>Price<br/><span>1000$</span><br/>7 days on 4 persons </p>
                            </div>
                            <div className="intro-info__from">
                                <p>Departure from <br/> <span>Viet Nam</span></p>
                            </div>
                            <div className="intro-info__departureday">
                                <p>Flight day<br/> <span>20</span> <br/>February</p>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="intro-travel">
                    <img src={Travel_ChauAu} alt="travel" className="intro-background" />
                    <div className="intro-title">
                        <p className="intro-text">La Petite Venise <br/> Colmar, France </p>
                        <button className="intro-button">Explore now</button>
                        <div className="intro-info">
                            <div className="intro-info__price">
                                <p>Price<br/><span>1000$</span><br/>7 days on 4 persons </p>
                            </div>
                            <div className="intro-info__from">
                                <p>Departure from <br/> <span>Viet Nam</span></p>
                            </div>
                            <div className="intro-info__departureday">
                                <p>Flight day<br/> <span>20</span> <br/>February</p>
                            </div>

                        </div>
                    </div>
                </div>


            </Carousel>
        </section>
)};
export default Intro;
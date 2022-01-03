import React,{Fragment} from "react";
import video_1 from './../../videos/video_1.mp4';
import './../../css/home.css';

const Home = () => {
    return(
        <Fragment>
            <div className="" id="home-wrapper">
                <div id="home-video-div">
                    <video autoPlay muted loop id="home-video">
                        <source src={video_1} type="video/mp4"/>
                    </video>
                </div>
                <div className="home-cake-structure">
                    <div className="text-center">
                        <div className="text-center">
                            <i class="fas fa-birthday-cake fa-5x" id="home-cake-icon"></i>
                        </div>
                        <div className="text-center">
                            <button className="btn home-cake-btn" id="home-cake-designs" >Designs</button>
                        </div>
                        <div className="text-center">
                            <button className="btn home-cake-btn" id="home-cake-profiles" >Profiles</button>
                        </div>
                        <div className="text-center">
                            <div className="btn" id="home-cake-bottom"></div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Home
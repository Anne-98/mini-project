import React from 'react';
import './../../css/Home/Poster.css';
import logo from './../../images/logo/logo1.png';

const Poster = () => {
    return(
        <div className='poster-wrapper'>
            <h1 className='text-center navbar-brand poster-heading pt-5'><span>Cake Mount</span></h1>
            <div className='justify-content-center row pt-5'>
                <img src={logo} className="poster-logo text-center"/>
            </div>
            <div className='pt-5 row' style={{backdropFilter:"blur(5px)"}}>
                {/* <div className='col-6 poster-col-1'>
                </div> */}
                <div className='col-12 poster-col-2 '>
                    <p className='col-12'>
                        <p>The Cake Mount<br/> is the all-in-one web-based solution for all your needs for <b>buying and selling</b> cakes.</p>
                        <p>We provide <b>custom cake designing</b> facilities for customers and make their orders for cake makers as they wish.</p>
                        <p>The cake makers can <b>showcase</b> their projects and designs <br/> through our website and gather orders.</p>
                        <p>A live <b>chat option</b> <br/> is also available for a better experience on the website.</p>  <br/>
                        <h6>So why are you still waiting?</h6><br/>
                        <h4>Join and make your dream a truth.</h4>    
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Poster
import React            from 'react';
import GlobalMapImage from '../imageSrc/globalMap.png';

const Welcome = (props) => {
    return (
        <>
        <img className = "WelcomeImg" src ={GlobalMapImage}></img>
        <div className='welcome'  >
            Welcome To The
        </div>
        <div className='welcome'  >
            World Data Mapper
        </div>
        </>
        
    );
};

export default Welcome;
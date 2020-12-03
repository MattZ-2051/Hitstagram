import React from 'react';
import './Welcome.css';

const Welcome = () => {


    const redirect = () => {

    }

    return (
        <div className='welcome'>
            <div className='welcome__intro'>
                <p>Welcome to Picstagram! Since you just signed up you wont be following anybody or have any followers so you won't have anything on your home feed.
            That's ok! follow some cool cats by going to the explore page and looking at different posts! Lets Go!</p>
            </div>
            <div className='welcome__btn'>
                <button onClick={redirect}>Explore!</button>
            </div>
        </div>

    )
}

export default Welcome;

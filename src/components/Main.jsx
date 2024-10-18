import React from 'react';
import { Image, Gif, Poll, Emoticon, Schedule } from '../assets/ToolbarImages';
import TweetList from './TweetList';
import data from '../tweet.json';

const fakeTweet = {
    avatar: "https://robohash.org/tweeter.png",
    author: "Bax Jowitt",
    tag: "bjowitt0",
    date: "10/6/2020",   
    id: new Date().getTime()
};

const images = [Image, Gif, Poll, Emoticon, Schedule];

const Toolbar = () => {
    return (
        <div className="tools-content">
            {images.map((Component, index) => (
                <Component key={index} />
            ))}
        </div>
    );
};

const Header = () => {
    return (
        <div className="header">
            <h2>Inicio</h2>
        </div>
    );
};

const TweetForm = ({ onTweet }) => {
    const ref = React.useRef();

    const submit = (event) => {
        event.preventDefault();
        const tweet = ref.current.value;
        if (tweet.trim()) {
            onTweet(tweet);
            ref.current.value = ''; // Limpiar el textarea después de twittear
        }
    };

    return (
        <form className="tweet-form" onSubmit={submit}>
            <img src={fakeTweet.avatar} alt="avatar" className="avatar" />
            <div className="container">
                <textarea ref={ref} placeholder="¿Qué está pasando?"></textarea>
                <div className="tools">
                    <Toolbar />
                    <button type="submit">Twittear</button>
                </div>
            </div>
        </form>
    );
};

const Main = () => {
    const [tweets, setTweets] = React.useState(data);

    const onTweet = (tweetText) => {
        const newTweet = {
            ...fakeTweet,
            content: tweetText,
            date: new Date().toLocaleDateString(),
            id: new Date().getTime(),
        };
        setTweets([newTweet, ...tweets]); // Añadir el nuevo tweet al principio de la lista
    };

    return (
        <main className="main">
            <Header />
            <TweetForm onTweet={onTweet} />
            <TweetList tweets={tweets} />
        </main>
    );
};

export default Main;

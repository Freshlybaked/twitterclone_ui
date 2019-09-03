import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TweetContainer from './components/tweetcontainer/TweetContainer';
import TweetList from './components/tweetlist/TweetList';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<TweetContainer />, document.getElementById('root'));
ReactDOM.render(<TweetList />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

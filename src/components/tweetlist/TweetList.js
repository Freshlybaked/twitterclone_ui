import React from 'react';
import './TweetList.css';
import TweetContainer from "./../tweetcontainer/TweetContainer.js"
import CreateTweetButton from './../createtweet/CreateTweetButton.js';

class TweetList extends React.Component {
	state = {
		tweets:[]
	}
	
	componentDidMount(){
		this.fetchTweets();
	}
	
	newTweetCreatedCallbackFunction = () => {
		this.fetchTweets();
	}
	
	tweetRetweetedCallbackFunction = (tweet) => {
		let unsortedTweets = this.state.tweets;
		
		// i reset the tweet array here as if i dont do this, it wont force a full render of the retweet count in each TweetContainer. Hacky solution?
		this.setState({tweets:[]});
		
		// update the correct tweet object in my state array
		for(var i = 0; i < unsortedTweets.length; ++i){
			if(unsortedTweets[i].id === tweet.id){
				unsortedTweets[i].retweets = tweet.retweets;
				continue;
			}
		}
		
		// sort the tweets by retweet count
		let sortedTweets = unsortedTweets.sort((a, b) => {
			if(a.retweets < b.retweets){
				return 1
			}
			if(a.retweets > b.retweets){
				return -1;
			}
			
			return 0;
		});
		
		this.setState({tweets:sortedTweets});
	}
	
	fetchTweets(){
		fetch('http://localhost:4000/api/tweets/ordered')
		.then(res => res.json())
		.then((data) => {
			this.setState({
				tweets:data.data
			});
		})
	}
	
	render (){
		const tweetContainers = this.state.tweets.map((item, key) => 
			<li key={"tweet_" + key}><TweetContainer tweetObj={item} tweetRetweetedCallback={this.tweetRetweetedCallbackFunction}/></li>
		);
		
		let divContent = (
			<ul className="col-md-6 tweet-list-body">
				{tweetContainers}
			</ul>
		)
		
		if(this.state.tweets.length === 0){
			divContent = (
				<div className="text-center no_tweets_banner">
					<h1>No tweets!</h1>
					<h2>Share your thoughts with the world (anonymously!)</h2>
				</div>
			)
		}
		
		return (
			<div className="d-flex justify-content-center">
				{divContent}
				<CreateTweetButton newTweetCreatedCallback={this.newTweetCreatedCallbackFunction}/>
			</div>
		)
	}
}

export default TweetList;

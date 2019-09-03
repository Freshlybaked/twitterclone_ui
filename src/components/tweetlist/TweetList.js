import React from 'react';
import './TweetList.css';
import TweetContainer from "./../tweetcontainer/TweetContainer.js"

class TweetList extends React.Component {
	state={
		tweets:[]
	}
	
	componentDidMount(){
		fetch('http://localhost:4000/api/tweets/ordered')
		.then(res => res.json())
		.then((data) => {
			this.setState({
				tweets:data.data
			});
			console.log(this.state);
		})
	}
	
	render (){
		let tweetContainers = this.state.tweets.map((item, key) => 
			<li key={"tweet_" + key}><TweetContainer tweetObj={item}/></li>
		);
		
		return (
			<div className="d-flex justify-content-center">
				<ul className="col-md-6 tweet-list-body">
					{tweetContainers}
				</ul>
			</div>
		)
	}
}

export default TweetList;

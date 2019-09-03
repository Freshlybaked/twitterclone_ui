import React from 'react';

import './TweetContainer.css';
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class TweetContainer extends React.Component{
	state = {
		"retweets":this.props.tweetObj.retweets
	}
	
	retweet(id){
		fetch("http://localhost:4000/api/retweet/"+id, {
			method: 'PUT'
		}).then(res => res.json())
		.then((data) => {
			this.setState({"retweets":data.data.retweets});
			this.tweetRetweeted();
		});
	}
	
	tweetRetweeted = () => {
		const tweetObj = {
			"id":this.props.tweetObj.id,
			"retweets":this.state.retweets
		}
		this.props.tweetRetweetedCallback(tweetObj);
	}
	
	render(){
		return (
			<div className="card">
				<div className="card-body">
					<p className="card-text text-center">
						<FontAwesomeIcon icon={faQuoteLeft}/>
							&nbsp;{this.props.tweetObj.content}&nbsp;
						<FontAwesomeIcon icon={faQuoteRight}/>
					</p>
					
					<div className="text-center">
						<button className="btn btn-primary" onClick={() => this.retweet(this.props.tweetObj.id)}><FontAwesomeIcon icon={faRetweet}/></button>
						<div>Retweets&nbsp;{this.state.retweets}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default TweetContainer;

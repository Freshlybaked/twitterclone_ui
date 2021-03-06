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
		let url = process.env.REACT_APP_TWITTER_CLONE_API_URL || "http://localhost:4000";
		fetch(url + "/api/retweet/"+id, {
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
					<div className="row">
						<div className="col-10">
							<div className="row">
								<div className="col-1 d-flex justify-content-start left_quote">
									<FontAwesomeIcon icon={faQuoteLeft}/>
								</div>
								<div className="col-10">
									{this.props.tweetObj.content}
								</div>
								<div className="col-1 d-flex justify-content-end right_quote">
									<FontAwesomeIcon icon={faQuoteRight}/>
								</div>
							</div>
						</div>
						<div className="col-2">
							<div className="d-flex justify-content-end retweet-button-div">
								<button className="btn btn-primary d-flex align-items-center retweet-button" onClick={() => this.retweet(this.props.tweetObj.id)}>
									<FontAwesomeIcon icon={faRetweet}/>
									<span className="retweet_count">&nbsp;&nbsp;{this.state.retweets}</span>
								</button>	
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default TweetContainer;

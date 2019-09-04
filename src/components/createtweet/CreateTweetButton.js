import React from 'react';

import './CreateTweetButton.css';
import { faFeatherAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class CreateTweetButton extends React.Component{
	
	constructor(props) {
		super(props);
		this.state = {
			tweetcontent: "",
			charsremaining:140
		};
	
		this.handleChange = this.handleChange.bind(this);
		this.submitNewTweet = this.submitNewTweet.bind(this);
	}
	
	state = {
		tweetcontent:"",
		charsremaining:140
	}
	
	resetState(){
		this.setState({
			tweetcontent:"",
			charsremaining:140
		});
	}
	
	handleChange(event) {
		this.setState({
			"tweetcontent": event.target.value, 
			"charsremaining": 140 - event.target.value.length
		});
	}
	
	submitNewTweet(){
		let tweet_params = {
			"content":this.state.tweetcontent,
			"retweets":0
		}
		
		fetch("http://localhost:4000/api/tweets", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body:JSON.stringify({
				"tweet":tweet_params
			})
		}).then(res => res.json())
		.then((data) => {
			this.resetState();
			this.newTweetCreated();
		});
	}
	
	newTweetCreated = () => {
		this.props.newTweetCreatedCallback();
	}
	
	render(){
		return (
			<div>
				<div className="create_tweet_button_div">
					<button className="btn btn-primary create_tweet_button" data-toggle="modal" data-target="#createTweetModal"><FontAwesomeIcon icon={faFeatherAlt}/></button>
				</div>
				
				<div className="modal fade" id="createTweetModal" tabIndex="-1" role="dialog" aria-labelledby="createTweetModalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-body">
								<div className="form-group">
									<textarea className="form-control" id="tweetContentTextArea" rows="5" maxLength="140" onChange={this.handleChange} value={this.state.tweetcontent}></textarea>
								</div>
								<div className="characters_count">{this.state.charsremaining} Characters Remaining</div>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary text-center create_tweet_submit_button" data-dismiss="modal" onClick={this.submitNewTweet}>Submit</button>
							</div>
						</div>
					</div>
				</div>
				
			</div>
			
		);
	}
}

export default CreateTweetButton;

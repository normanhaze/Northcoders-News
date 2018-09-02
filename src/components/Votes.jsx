import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';

class Votes extends Component {
    state = {
        vote: 0
    };
    render() {
        return <div>
            <h4>Votes: {this.props.belongs_to.votes + this.state.vote}</h4>
            {this.props.currentUser._id !== this.props.created_by._id && 
                <div>
                    <button disabled={this.state.vote > 0} onClick={this.castVote} className="vote-button"><i className="fas fa-thumbs-up" id="up"></i></button> 
                    <button disabled={this.state.vote < 0} onClick={this.castVote} className="vote-button"><i className="fas fa-thumbs-down" id="down"></i></button>
                </div>}
        </div>
    };
    castVote = (event) => {
        const direction = event.target.id;
        if (this.props.type === "article") {
            api.updateArticleVote(this.props.belongs_to._id, direction); 
        }
        else if (this.props.type === "comment") {
            api.updateCommentVote(this.props.belongs_to._id, direction);
        };
        const increment = direction === "up" ? 1  : -1;
        this.setState({
            vote: this.state.vote + increment
            });
    };
};

Votes.propTypes = {
    belongs_to: PropTypes.object.isRequired,
    created_by: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    currentUser: PropTypes.object.isRequired
};

export default Votes;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';

class NewComment extends Component {
    state = {
        newComment: "",
        error: false
    };
    render() {
        return <div>
            {this.state.error && <p className="warning">Comment posting failed. Try again later.</p>}
            <form onSubmit={this.addComment}>
                <textarea className="add-comment" id="comment-input" type="text" wrap="hard" onChange={this.commentChange} value={this.state.newComment} placeholder="Enter your comment here"/>
                <button className="add-comment button" id="comment-button" type="submit">Post Comment</button>
            </form>
        </div>
    };
    commentChange = ({ target: { value } }) => {
        this.setState({
            newComment: value
        });
    };

    addComment = (event) => {
        event.preventDefault();
        if (this.state.newComment) {
            api.postComment(this.state.newComment, this.props.currentUser._id, this.props.article_id)
            .then(comment => {
                if (comment.type) {
                    this.setState({
                        error: true
                    });
                } else {
                    this.props.updateComments(comment);
                    this.setState({
                        newComment: "",
                        error: false
                    });
                };
            });
        };
    };   
};

NewComment.propTypes = {
    currentUser: PropTypes.object.isRequired,
    updateComments: PropTypes.func.isRequired,
    article_id: PropTypes.string.isRequired
};


export default NewComment;
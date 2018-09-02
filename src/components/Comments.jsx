import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import Comment from './Comment';
import NewComment from './NewComment';

class Comments extends Component {
    state = {
        comments: [],
        error: false
    };

    render() {
        return <div>
            <h3>Comments</h3>
            {this.state.comments.length === 0 && <p><i>Be the first to comment on this article.</i></p>}
            <div className="comments">
                {this.state.comments.map(comment => {
                    return <Comment key={comment._id} comment={comment} currentUser={this.props.currentUser} removeComment={this.removeComment} error={this.state.error}/>
                }).reverse()}
            </div>
            <NewComment currentUser={this.props.currentUser} updateComments={this.updateComments} article_id={this.props.article_id}/>      
        </div>
    };

    componentDidMount() {
        return api.fetchArticleComments(this.props.article_id)
        .then(comments => {
            this.setState({
                comments
            });
        });
    };

    updateComments = (comment) => {
        const comments = [comment, ...this.state.comments]
        this.setState({
            comments
        });
    };

    removeComment = (comment_id) => {
        api.deleteComment(comment_id)
        .then(comment => {
            if (comment.type) {
                this.setState({
                    error: true
                });
            } else {
                let comments = this.state.comments;
                const index = comments.findIndex(comment => comment._id === comment_id);
                comments.splice(index, 1);
                this.setState({
                    comments,
                    error: false
                });
            };
        }); 
    };
};

Comments.propTypes = {
    article_id: PropTypes.string.isRequired,
    currentUser: PropTypes.object
};

export default Comments;
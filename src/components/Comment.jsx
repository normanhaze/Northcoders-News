import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Votes from './Votes';

const Comment = ({comment, currentUser, removeComment, error}) => {
    return <div className="comment">
        <img className="avatar-img" src={comment.created_by.avatar_url} alt="user avatar"/>
        <h4 className="user-info"><span id="username">{comment.created_by.username}</span> | {dayjs(comment.created_at).format('ddd D MMM YYYY')}</h4>
        <p>{comment.body}</p>
        {currentUser._id === comment.created_by._id && 
        <button className="button" onClick={() => removeComment(comment._id)}>Delete</button>}
        {error && <p className="warning">Failed to delete comment. Try again later.</p>}
        <Votes belongs_to={comment} created_by={comment.created_by} type="comment" currentUser={currentUser}/>
    </div>
    };

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
    removeComment: PropTypes.func.isRequired,
    error: PropTypes.bool
};

export default Comment; 
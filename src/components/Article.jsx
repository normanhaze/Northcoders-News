import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Votes from './Votes';

const Article = ({article, currentUser}) => {
    return <div>
        <h2>{article.title}</h2>
        <img className="article-img-solo" src="https://cdn-images-1.medium.com/max/2000/1*uFINNsYNbYuPIC3sUMyy6w.jpeg" alt=""/>
        <h3><i>By {article.created_by.username}</i> | {dayjs(article.created_at).format('ddd D MMM YYYY')}</h3>
        <p id="article-body">{article.body}</p>
        <Votes belongs_to={article} created_by={article.created_by} type={"article"} currentUser={currentUser}/>
    </div>
};

Article.propTypes = {
    article: PropTypes.object.isRequired,
    currentUser: PropTypes.object
};

export default Article;
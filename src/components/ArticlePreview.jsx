import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const ArticlePreview = ({article}) => {
    return <div className="article" key={article._id} >
        <Link to={`/articles/${article._id}`}><img className="article-img" src="https://cdn-images-1.medium.com/max/2000/1*uFINNsYNbYuPIC3sUMyy6w.jpeg" alt=""/></Link>
        <h2><Link to={`/articles/${article._id}`}>{article.title}</Link></h2>
        <h3>By {article.created_by.username}</h3>
        <h4>{article.comment_count} {article.comment_count === 1 ? "comment": "comments"} | {article.votes} votes</h4>
        <h5>{dayjs(article.created_at).format('ddd D MMM YYYY')}</h5>
        <br/>
    </div>
};

ArticlePreview.propTypes = {
    article: PropTypes.object.isRequired
};

export default ArticlePreview;
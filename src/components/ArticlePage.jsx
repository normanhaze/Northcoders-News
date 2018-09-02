import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import Article from './Article';
import Comments from './Comments';


class ArticlePage extends Component {
    state = {
        article: {},
        loading: true
    };
    
    render() {
        if (this.state.loading === true) {
            return <i className="fas fa-spinner"></i>
        } 
        else {
        return <div>
            <Article article={this.state.article} currentUser={this.props.currentUser}/>
            <Comments article_id={this.props.match.params.article_id} currentUser={this.props.currentUser} />
        </div>
        };
    };

    componentDidMount = () => {
        return api.fetchArticleById(this.props.match.params.article_id)
        .then(article => {
            if (article.type) {
               this.props.handleError(article);
            } else {
                this.setState({
                    article,
                    loading: false
                });  
            };
        });
    };
};

ArticlePage.propTypes = {
    currentUser: PropTypes.object,
    handleError: PropTypes.func.isRequired,
    match: PropTypes.shape({params: PropTypes.shape({article_id: PropTypes.string})})
};

export default ArticlePage;
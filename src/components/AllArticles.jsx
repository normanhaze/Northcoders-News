import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';
import Topics from './Topics';
import NewArticle from './NewArticle';
import ArticlePreview from './ArticlePreview';

class AllArticles extends Component {
    state = {
        articles: [],
        loading: true,
        currentTopic: "",
    };

    render () {
        if (this.state.loading) {
            return <i className="fas fa-spinner"></i>
        } 
        else {
            return <div>
                <Topics handleChange={this.handleChange} handleError={this.props.handleError}/>
                <NewArticle currentTopic={this.state.currentTopic} addArticle={this.addArticle}/>
                <div className="articles">
                {this.state.articles.map(article => {
                    return <ArticlePreview key={article._id} article={article}/>
                })}
                </div>
            </div>
        };
    };

    componentDidMount() {
        return api.fetchArticles()
        .then(articles => {
            if (articles.type) {
                this.props.handleError(articles);
                this.setState({
                    loading: false
                });
            } else {
                this.setState({
                    articles,
                    loading: false
                }); 
            };
        });
    };

    handleChange = (event) => {
        const currentTopic = event.target.value;
        if (currentTopic === "all") return api.fetchArticles()
        .then(articles => {
            if (articles.type) this.props.handleError(articles);
            else this.setState({
                    articles,
                    currentTopic: ""
                });
        });
        else if (currentTopic !== "") return api.fetchArticlesByTopic(event.target.value)
        .then(articles => {
            if (articles.type) this.props.handleError(articles);
            else this.setState({
                articles,
                currentTopic
            });
        });
    };

    addArticle = (articleTitle, articleBody) => {
        api.postArticle(this.state.currentTopic, articleTitle, articleBody, this.props.currentUser)
        .then((newArticle) => {
            if (newArticle.type) this.props.handleError(newArticle);
            else {
                const articles = [newArticle, ...this.state.articles]
                this.setState({
                    articles
                });
            };
        }); 
    };
};

AllArticles.propTypes = {
    currentUser: PropTypes.object,
    handleError: PropTypes.func.isRequired
};

export default AllArticles;
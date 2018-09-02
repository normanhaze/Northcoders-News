import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewArticle extends Component {
    state = {
        articleField: false,
        articleTitle: '',
        articleBody: ''
    };
    render() {
        return <div className="add-article">
            {!this.state.articleField &&<button className="button" onClick={this.showArticleField}>New Article{this.state.currentTopic ? ` to ${this.state.currentTopic}` : ""}</button>}
            {this.state.articleField && <div>
                <button className="button" onClick={this.showArticleField}>Cancel</button>
                <input className="article-input" id="title-box" type="text" placeholder="Article title" onChange={this.updateTitle}/>
                <textarea className="article-input" id="body-box" type="text" wrap="hard" placeholder="Enter your article content here" onChange={this.updateBody}/>
                <button className="button" type="submit" disabled={!this.props.currentTopic || !this.state.articleTitle || !this.state.articleBody} onClick={this.handleSubmit}>Submit</button>
                {!this.props.currentTopic && this.state.articleField && <p className="warning" >Please select a topic for your article</p>}
                </div>}
        </div>
    };

    showArticleField = () => {
        const articleField = !this.state.articleField;
        this.setState({
            articleField
        });
    };
    
    updateTitle = (event) => {
        this.setState({
            articleTitle: event.target.value
        });
    };

    updateBody = (event) => {
        this.setState({
            articleBody: event.target.value
        });
    };

    handleSubmit = () => {
        this.props.addArticle(this.state.articleTitle, this.state.articleBody);
        this.showArticleField();
    };
};

NewArticle.propTypes = {
    currentTopic: PropTypes.string,
    addArticle: PropTypes.func.isRequired
};

export default NewArticle;
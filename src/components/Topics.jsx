import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';

class Topics extends Component {
    state = {
        topics: []
    };
    render () {
        return <select className="dropdown" name="select-topic" onChange={this.props.handleChange}>
        <option value="">Select Topic</option>
        <option value="all">All</option>
        {this.state.topics.map(topic => {
            return <option key={topic.slug} value={topic.slug}>{topic.title}</option>
        })}
    </select>
    }
    
    componentDidMount() {
        return api.fetchTopics()
        .then(topics => {
            if (topics.type) {
                this.props.handleError(topics);
            } else {
                this.setState({
                    topics
                });
            };
        });
    };
};

Topics.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleError: PropTypes.func.isRequired
};

export default Topics;
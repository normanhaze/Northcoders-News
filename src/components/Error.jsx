import React from 'react';
import PropTypes from 'prop-types';

const Error = ({error}) => {
    if (!error) error = {type: 404, msg: "Page Not Found", byline: "All dressed up and no place to go!"};
    return <div className="error">
        <h1>Oops! Something went wrong...</h1>
        <h2>{error.type}</h2>
        <h3>{error.msg}</h3>
        <h4>{error.byline}</h4>
    </div>
};

Error.propTypes = {
    error: PropTypes.object
};

export default Error;
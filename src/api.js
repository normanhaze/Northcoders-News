import axios from 'axios';
const URL = "https://hn-northcoders-news.herokuapp.com/api";

const sortArticles = (articles) => {
    return articles.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

const errorHandling = (apiCallFn) => {
    return (...args) => apiCallFn(...args)
    .catch(err => {
        let error;
        if (err.response.status === 400) error = {type: 400, msg: "Bad Request", byline: "No can do, buddy."};
        if (err.response.status === 404) error = {type: 404, msg: "Page Not Found", byline: "All dressed up and no place to go!"};
        if (err.response.status === 500) error = {type: 500, msg: "Internal Server Error", byline: "Everybody's dead, Dave."};
        return error;
    });    
};

export const fetchTopics = errorHandling(() => {
    return axios.get(`${URL}/topics`)
    .then(res => res.data.topics);
});

export const fetchArticles = errorHandling(() => {
    return axios.get(`${URL}/articles`)
    .then(res => sortArticles(res.data.all_articles));
});

export const fetchArticlesByTopic = errorHandling((topic) => {
    return axios.get(`${URL}/topics/${topic}/articles`)
    .then(res => sortArticles(res.data.articles));
});

export const postArticle = errorHandling((topic, title, body, created_by) => {
    const article = {
        title,
        body,
        created_by
    };
    return axios.post(`${URL}/topics/${topic}/articles`, article)
    .then(res => res.data.article);
});

export const fetchArticleById = errorHandling((article_id) => {
    return axios.get(`${URL}/articles/${article_id}`)
    .then(res => res.data.article);
});

export const fetchArticleComments = (article_id) => {
    return axios.get(`${URL}/articles/${article_id}/comments`, {validateStatus: (status) => status >= 200 && status < 405})
    .then(res => sortArticles(res.data.comments || []));
};

export const updateArticleVote = (article_id, direction) => {
    return axios.patch(`${URL}/articles/${article_id}?vote=${direction}`)
};

export const updateCommentVote = (comment_id, direction) => {
    return axios.patch(`${URL}/comments/${comment_id}?vote=${direction}`)
};

export const postComment = errorHandling((body, created_by, article_id) => {
    const comment = {
        body,
        created_by
    }
    return axios.post(`${URL}/articles/${article_id}/comments`, comment)
    .then(res => res.data.comment);
});

export const deleteComment = errorHandling((comment_id) => {
    return axios.delete(`${URL}/comments/${comment_id}`);
});

export const getUser = errorHandling((username) => {
    return axios.get(`${URL}/users/${username}`)
    .then(res => res.data.user);
});

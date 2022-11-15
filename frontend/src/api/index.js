import axios from "axios"

const ANIMES_URL = "http://10.0.2.2:5001/"
const DISCUSSIONS_URL = "http://10.0.2.2:5002/"
const TOPICS_URL = "http://10.0.2.2:5003/"
const POSTERS_URL = "http://10.0.2.2:5005/"


// ANIMES
export const getAnimes = (page, pagelength) => axios.get(
    ANIMES_URL + "animes/" + page + "/" + pagelength
);

export const searchAnimesByName = (name, page, pagelength) => axios.get(
    ANIMES_URL + "search_animes/" + name + "/" + page + "/" + pagelength
);

export const getAnimeById = (id) => axios.get(
    ANIMES_URL + "anime/" + id
);

export const getAnimePosterURL = (image_path) => {
    return {uri: POSTERS_URL + image_path}
};

export const saveSuggestion = (title, about) => axios.get(
    ANIMES_URL + "suggestion_anime/" + title + "/" + about
)



// Discussions
export const getDiscussionsTopic = (topic_id) => axios.get(
    DISCUSSIONS_URL + "discussions/" + topic_id
);

export const saveDiscussion = (topicId, text, author) => axios.get(
    DISCUSSIONS_URL + "add_discussion/" + topicId + "/" + text + "/" + author
);



// Topics
export const getAnimeTopics = (anime_id, page, pagelength) => axios.get(
    TOPICS_URL + "topics/" + anime_id + "/" + page + "/" + pagelength
);

export const getTopicById = (id) => axios.get(
    TOPICS_URL + "topic/" + id
);

export const saveTopic = (anime_id, title, description, author) => axios.get(
    TOPICS_URL + "add_topic/" + anime_id + "/" + title + "/" + description + "/" + author
);
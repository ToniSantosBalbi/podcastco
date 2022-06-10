import axios from 'axios';

export const getPodcast = podcastSlug => {
  return axios.get(`https://public-api.pod.co/podcasts/${podcastSlug}`);
};

export const getEpisode = podcastSlug => {
  return axios.get(
    `https://public-api.pod.co/podcasts/${podcastSlug}/episodes`,
  );
};

export const getPlayer = podcastSlug => {
  return axios.get(`https://public-api.pod.co/podcasts/${podcastSlug}/player`);
};

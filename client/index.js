'use strict';

const request = require('request-promise');

class Client {
  constructor(options) {
    this.options = options || {
      endpoints: {
        tracks: 'https://sc.com/api/tracks',
        playlists: 'https://sc.com/api/playlists',
        albums: 'https://sc.com/api/albums',
        replies: 'https://sc.com/api/replies',
        users: 'https://sc.com/api/users',
        tags: 'https://sc.com/api/tags',
        auth: 'https://sc.com/api/auth',
      },
    };
  }

  register(details) {
    const opts = {
      method: 'POST',
      uri: `${this.options.endpoints.auth}/register`,
      body: details,
      json: true,
    };

    return Promise.resolve(request(opts));
  }

  login(credentials) {
    let opts = {
      method: 'POST',
      uri: `${this.options.endpoints.auth}/login`,
      body: credentials,
      json: true,
    };

    return Promise.resolve(request(opts));
  }

  createTrack(details, token) {
    const options = {
      method: 'POST',
      uri: `${this.options.endpoints.tracks}/`,
      body: details,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: true,
    };

    return Promise.resolve(request(options));
  }

  updateTrack(id, newFields, token) {
    const options = {
      method: 'PATCH',
      uri: `${this.options.endpoints.tracks}/${id}`,
      body: newFields,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: true,
    };

    return Promise.resolve(request(options));
  }

  publishTrack(id, token) {
    const options = {
      method: 'PATCH',
      uri: `${this.options.endpoints.tracks}/${id}/publish`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: true,
    };

    return Promise.resolve(request(options));
  }

  getTrack(id) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.tracks}/${id}`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  replyTrack(id, details, token) {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      uri: `${this.options.endpoints.tracks}/${id}/replies`,
      body: details,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  getReply(id) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.replies}/${id}`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  favoriteTrack(id, token) {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      uri: `${this.options.endpoints.tracks}/${id}/favorite`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  unfavoriteTrack(id, token) {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      uri: `${this.options.endpoints.tracks}/${id}/unfavorite`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  shareTrack(id, token) {
    const options = {
      method: 'POST',
      uri: `${this.options.endpoints.tracks}/${id}/share`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: true,
    };

    return Promise.resolve(request(options));
  }

  deleteTrack(id, token) {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      uri: `${this.options.endpoints.tracks}/${id}`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  createPlaylist(details, token) {
    const options = {
      method: 'POST',
      uri: `${this.options.endpoints.playlists}/`,
      body: details,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: true,
    };

    return Promise.resolve(request(options));
  }

  getPlaylist(id) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.playlists}/${id}`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  updatePlaylist(id, details, token) {
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      uri: `${this.options.endpoints.playlists}/${id}`,
      body: details,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  deletePlaylist(id, token) {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      uri: `${this.options.endpoints.playlists}/${id}`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  favoritePlaylist(id, token) {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      uri: `${this.options.endpoints.playlists}/${id}/favorite`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  unfavoritePlaylist(id, token) {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      uri: `${this.options.endpoints.playlists}/${id}/unfavorite`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  addTrackToPlaylist(id, trackId, token) {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      uri: `${this.options.endpoints.playlists}/${id}/tracks/${trackId}/add`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  removeTrackFromPlaylist(id, trackId, token) {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      uri: `${this.options.endpoints.playlists}/${id}/tracks/${trackId}/remove`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  sharePlaylist(id, token) {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      uri: `${this.options.endpoints.playlists}/${id}/share`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  createAlbum(details, token) {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      uri: `${this.options.endpoints.albums}/`,
      body: details,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  getAlbum(id) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.albums}/${id}`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  updateAlbum(id, details, token) {
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      uri: `${this.options.endpoints.albums}/${id}`,
      body: details,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  publishAlbum(id, token) {
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      uri: `${this.options.endpoints.albums}/${id}`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  deleteAlbum(id, token) {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      uri: `${this.options.endpoints.albums}/${id}`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  favoriteAlbum(id, token) {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      uri: `${this.options.endpoints.albums}/${id}/favorite`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  shareAlbum(id, token) {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      uri: `${this.options.endpoints.albums}/${id}/share`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  getUser(id) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.users}/${id}`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  getUserTracks(id) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.users}/${id}/tracks`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  getUserPlaylists(id) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.users}/${id}/playlists`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  getUserAlbums(id) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.users}/${id}/albums`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  followUser(id, token) {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      uri: `${this.options.endpoints.users}/${id}/follow`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  unfollowUser(id, token) {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      uri: `${this.options.endpoints.users}/${id}/unfollow`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  getUserFollowers(id) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.users}/${id}/followers`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  getUsersFollowing(id) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.users}/${id}/following`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  deleteProfile(id, token) {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      uri: `${this.options.endpoints.users}/${id}`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  getTags() {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.tags}/`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  getTagTracks(id) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.tags}/${id}/tracks`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  getTagAlbums(id) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.tags}/${id}/albums`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  getTagPlaylists(id) {
    const options = {
      method: 'GET',
      uri: `${this.options.endpoints.tags}/${id}/playlists`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  getProfile(token) {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      uri: `${this.options.endpoints.me}/`,
      json: true,
    };

    return Promise.resolve(request(options));
  }

  updateProfile(details, token) {
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: details,
      uri: `${this.options.endpoints.me}/`,
      json: true,
    };

    return Promise.resolve(request(options));
  }
}

module.exports = Client;

'use strict';

const request = require('request-promise');

class Client {
  constructor(options) {
    this.options = options || {
      endpoints: {
        tracks: 'http://localhost:8000/api/tracks',
        playlists: 'http://localhost:8000/api/playlists',
        albums: 'http://localhost:8000/api/albums',
        replies: 'http://localhost:8000/api/replies',
        users: 'http://localhost:8000/api/users',
        tags: 'http://localhost:8000/api/tags',
        auth: 'http://localhost:8000/api/auth',
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
      method: 'POST',
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
}

module.exports = Client;

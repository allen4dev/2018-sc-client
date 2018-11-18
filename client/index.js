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
    let opts = {
      method: 'POST',
      uri: `${this.options.endpoints.auth}/register`,
      body: details,
      json: true,
    };

    return Promise.resolve(request(opts));
  }
}

module.exports = Client;

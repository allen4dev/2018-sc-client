'use strict';

const nock = require('nock');

const Client = require('./../client');

const fixtures = require('./fixtures');

const options = {
  endpoints: {
    tracks: 'http://localhost:8000/api/tracks',
    playlists: 'http://localhost:8000/api/playlists',
    albums: 'http://localhost:8000/api/albums',
    replies: 'http://localhost:8000/api/replies',
    users: 'http://localhost:8000/api/users',
    tags: 'http://localhost:8000/api/tags',
    auth: 'http://localhost:8000/api/auth',
    me: 'http://localhost:8000/api/me',
  },
};

describe('client', function() {
  const client = new Client(options);

  test('methods', function() {
    expect(typeof client.register).toBe('function');
    expect(typeof client.login).toBe('function');
  });

  describe('auth', function() {
    test('register', async function() {
      const response = fixtures.getTokenResponse();

      const details = {
        email: 'allen@example.test',
        password: 'secret',
        username: 'Allen',
      };

      nock(options.endpoints.auth)
        .post('/register', details)
        .reply(201, response);

      const result = await client.register(details);

      expect(result).toEqual(response);
    });

    test('login', async function() {
      const response = fixtures.getTokenResponse();

      const credentials = {
        email: 'allen@example.test',
        password: 'secret',
      };

      nock(options.endpoints.auth)
        .post('/login', credentials)
        .reply(200, response);

      const result = await client.login(credentials);

      expect(result).toEqual(response);
    });
  });
});

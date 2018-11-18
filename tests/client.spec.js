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
    expect(typeof client.createTrack).toBe('function');
  });

  describe('auth', function() {
    test('register', async function() {
      const details = fixtures.getUser();

      const expectedResponse = fixtures.getTokenResponse();

      nock(options.endpoints.auth)
        .post('/register', details)
        .reply(201, expectedResponse);

      const result = await client.register(details);

      expect(result).toEqual(expectedResponse);
    });

    test('login', async function() {
      const credentials = {
        email: 'allen@example.test',
        password: 'secret',
      };

      const expectedResponse = fixtures.getTokenResponse();

      nock(options.endpoints.auth)
        .post('/login', credentials)
        .reply(200, expectedResponse);

      const result = await client.login(credentials);

      expect(result).toEqual(expectedResponse);
    });
  });

  describe('tracks', function() {
    test('createTrack', async function() {
      const details = fixtures.getTrack();

      const token = 'xxx.xxx.xxx';

      const expectedResponse = fixtures.getTrackResponse();

      nock(options.endpoints.tracks, {
        reqheaders: {
          Authorization: `Bearer ${token}`,
        },
      })
        .post('/', details)
        .reply(201, expectedResponse);

      const result = await client.createTrack(details, token);

      expect(result).toEqual(expectedResponse);
    });
  });
});

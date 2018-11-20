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
    expect(typeof client.updateTrack).toBe('function');
    expect(typeof client.publishTrack).toBe('function');
    expect(typeof client.getTrack).toBe('function');
    expect(typeof client.replyTrack).toBe('function');
    expect(typeof client.deleteTrack).toBe('function');
    expect(typeof client.favoriteTrack).toBe('function');
    expect(typeof client.unfavoriteTrack).toBe('function');
    expect(typeof client.shareTrack).toBe('function');

    expect(typeof client.createPlaylist).toBe('function');
    expect(typeof client.getPlaylist).toBe('function');
    expect(typeof client.updatePlaylist).toBe('function');
    expect(typeof client.deletePlaylist).toBe('function');
    expect(typeof client.favoritePlaylist).toBe('function');
    expect(typeof client.unfavoritePlaylist).toBe('function');
    expect(typeof client.addTrackToPlaylist).toBe('function');
    expect(typeof client.removeTrackFromPlaylist).toBe('function');
    expect(typeof client.sharePlaylist).toBe('function');

    expect(typeof client.createAlbum).toBe('function');
    expect(typeof client.getAlbum).toBe('function');
    expect(typeof client.updateAlbum).toBe('function');

    expect(typeof client.getReply).toBe('function');
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

    test('updateTrack', async function() {
      const track = fixtures.getTrack();

      const newFields = { title: 'New title' };

      const token = 'xxx.xxx.xxx';

      const expectedResponse = fixtures.getTrackResponse();

      nock(options.endpoints.tracks, {
        reqheaders: {
          Authorization: `Bearer ${token}`,
        },
      })
        .patch(`/${track.id}`, newFields)
        .reply(200, expectedResponse);

      const result = await client.updateTrack(track.id, newFields, token);

      expect(result).toEqual(expectedResponse);
    });

    test('publishTrack', async function() {
      const track = fixtures.getTrack();

      const token = 'xxx.xxx.xxx';

      const expectedResponse = fixtures.getTrackResponse();

      nock(options.endpoints.tracks, {
        reqheaders: {
          Authorization: `Bearer ${token}`,
        },
      })
        .post(`/${track.id}/publish`)
        .reply(200, expectedResponse);

      const result = await client.publishTrack(track.id, token);

      expect(result).toEqual(expectedResponse);
    });

    test('getTrack', async function() {
      const track = fixtures.getTrack();

      const expectedResponse = fixtures.getTrackResponse();

      nock(options.endpoints.tracks)
        .get(`/${track.id}`)
        .reply(200, expectedResponse);

      const result = await client.getTrack(track.id);

      expect(result).toEqual(expectedResponse);
    });

    test('deleteTrack', async function() {
      const track = fixtures.getTrack();

      const token = 'xxx.xxx.xxx';

      nock(options.endpoints.tracks, {
        reqheaders: {
          Authorization: `Bearer ${token}`,
        },
      })
        .delete(`/${track.id}`)
        .reply(204);

      const result = await client.deleteTrack(track.id, token);

      expect(result).toBeUndefined();
    });

    test('replyTrack', async function() {
      const track = fixtures.getTrack();
      const details = fixtures.getReply();

      const token = 'xxx.xxx.xxx';

      const expectedResponse = fixtures.getReplyResponse();

      nock(options.endpoints.tracks, {
        reqheaders: {
          Authorization: `Bearer ${token}`,
        },
      })
        .post(`/${track.id}/replies`, details)
        .reply(201, expectedResponse);

      const result = await client.replyTrack(track.id, details, token);

      expect(result).toEqual(expectedResponse);
    });

    test('favoriteTrack', async function() {
      const track = fixtures.getTrack();

      const token = 'xxx.xxx.xxx';

      const expectedResponse = fixtures.getTrackResponse();

      nock(options.endpoints.tracks, {
        reqheaders: {
          Authorization: `Bearer ${token}`,
        },
      })
        .post(`/${track.id}/favorite`)
        .reply(200, expectedResponse);

      const result = await client.favoriteTrack(track.id, token);

      expect(result).toEqual(expectedResponse);
    });

    test('unfavoriteTrack', async function() {
      const track = fixtures.getTrack();

      const token = 'xxx.xxx.xxx';

      const expectedResponse = fixtures.getTrackResponse();

      nock(options.endpoints.tracks, {
        reqheaders: {
          Authorization: `Bearer ${token}`,
        },
      })
        .delete(`/${track.id}/unfavorite`)
        .reply(200, expectedResponse);

      const result = await client.unfavoriteTrack(track.id, token);

      expect(result).toEqual(expectedResponse);
    });

    test('shareTrack', async function() {
      const track = fixtures.getTrack();

      const token = 'xxx.xxx.xxx';

      const expectedResponse = fixtures.getTrackResponse();

      nock(options.endpoints.tracks, {
        reqheaders: {
          Authorization: `Bearer ${token}`,
        },
      })
        .post(`/${track.id}/share`)
        .reply(200, expectedResponse);

      const result = await client.shareTrack(track.id, token);

      expect(result).toEqual(expectedResponse);
    });
  });

  describe('playlists', function() {
    test('createPlaylist', async function() {
      const details = fixtures.getPlaylist();

      const token = 'xxx.xxx.xxx';

      const expectedResponse = fixtures.getPlaylistResponse();

      nock(options.endpoints.playlists, {
        reqheaders: {
          Authorization: `Bearer ${token}`,
        },
      })
        .post('/', details)
        .reply(201, expectedResponse);

      const result = await client.createPlaylist(details, token);

      expect(result).toEqual(expectedResponse);
    });

    test('getPlaylist', async function() {
      const playlist = fixtures.getPlaylist();

      const expectedResponse = fixtures.getPlaylistResponse();

      nock(options.endpoints.playlists)
        .get(`/${playlist.id}`)
        .reply(200, expectedResponse);

      const result = await client.getPlaylist(playlist.id);

      expect(result).toEqual(expectedResponse);
    });

    test('updatePlaylist', async function() {
      const playlist = fixtures.getPlaylist();

      const newFields = {
        title: 'A best title',
      };

      const token = 'xxx.xxx.xxx';

      const expectedResponse = fixtures.getPlaylistResponse();

      nock(options.endpoints.playlists, {
        reqheaders: {
          Authorization: `Bearer ${token}`,
        },
      })
        .patch(`/${playlist.id}`, newFields)
        .reply(200, expectedResponse);

      const result = await client.updatePlaylist(playlist.id, newFields, token);

      expect(result).toEqual(expectedResponse);
    });

    test('deletePlaylist', async function() {
      const playlist = fixtures.getPlaylist();

      const token = 'xxx.xxx.xxx';

      nock(options.endpoints.playlists, {
        reqheaders: {
          Authorization: `Bearer ${token}`,
        },
      })
        .delete(`/${playlist.id}`)
        .reply(204);

      const result = await client.deletePlaylist(playlist.id, token);

      expect(result).toBeUndefined();
    });

    test('favoritePlaylist', async function() {
      const playlist = fixtures.getPlaylist();

      const token = 'xxx.xxx.xxx';

      const expectedResponse = fixtures.getPlaylistResponse();

      nock(options.endpoints.playlists, {
        reqheaders: {
          Authorization: `Bearer ${token}`,
        },
      })
        .post(`/${playlist.id}/favorite`)
        .reply(200, expectedResponse);

      const result = await client.favoritePlaylist(playlist.id, token);

      expect(result).toEqual(expectedResponse);
    });

    test('unfavoritePlaylist', async function() {
      const playlist = fixtures.getPlaylist();

      const token = 'xxx.xxx.xxx';

      const expectedResponse = fixtures.getPlaylistResponse();

      nock(options.endpoints.playlists, {
        reqheaders: {
          Authorization: `Bearer ${token}`,
        },
      })
        .delete(`/${playlist.id}/unfavorite`)
        .reply(200, expectedResponse);

      const result = await client.unfavoritePlaylist(playlist.id, token);

      expect(result).toEqual(expectedResponse);
    });

    test('addTrackToPlaylist', async function() {
      const playlist = fixtures.getPlaylist();
      const track = fixtures.getTrack();

      const token = 'xxx.xxx.xxx';

      const expectedResponse = fixtures.getTrackResponse();

      nock(options.endpoints.playlists, {
        reqheaders: {
          Authorization: `Bearer ${token}`,
        },
      })
        .post(`/${playlist.id}/tracks/${track.id}/add`)
        .reply(200, expectedResponse);

      const result = await client.addTrackToPlaylist(
        playlist.id,
        track.id,
        token,
      );

      expect(result).toEqual(expectedResponse);
    });

    test('removeTrackFromPlaylist', async function() {
      const playlist = fixtures.getPlaylist();
      const track = fixtures.getTrack();

      const token = 'xxx.xxx.xxx';

      const expectedResponse = fixtures.getTrackResponse();

      nock(options.endpoints.playlists, {
        reqheaders: {
          Authorization: `Bearer ${token}`,
        },
      })
        .delete(`/${playlist.id}/tracks/${track.id}/remove`)
        .reply(200, expectedResponse);

      const result = await client.removeTrackFromPlaylist(
        playlist.id,
        track.id,
        token,
      );

      expect(result).toEqual(expectedResponse);
    });

    test('sharePlaylist', async function() {
      const playlist = fixtures.getPlaylist();

      const token = 'xxx.xxx.xxx';

      const expectedResponse = fixtures.getPlaylistResponse();

      nock(options.endpoints.playlists, {
        reqheaders: {
          Authorization: `Bearer ${token}`,
        },
      })
        .post(`/${playlist.id}/share`)
        .reply(200, expectedResponse);

      const result = await client.sharePlaylist(playlist.id, token);

      expect(result).toEqual(expectedResponse);
    });
  });

  describe('albums', function() {
    test('createAlbum', async function() {
      const values = fixtures.getRawAlbum();

      const token = 'xxx.xxx .xxx';

      const expectedResponse = fixtures.getAlbumResponse();

      nock(options.endpoints.albums, {
        reqheaders: {
          Authorization: `Bearer ${token}`,
        },
      })
        .post('/', values)
        .reply(201, expectedResponse);

      const result = await client.createAlbum(values, token);

      expect(result).toEqual(expectedResponse);
    });

    test('getAlbum', async function() {
      const album = fixtures.getAlbum();

      const expectedResponse = fixtures.getAlbumResponse();

      nock(options.endpoints.albums)
        .get(`/${album.id}`)
        .reply(200, expectedResponse);

      const result = await client.getAlbum(album.id);

      expect(result).toEqual(expectedResponse);
    });

    test('updateAlbum', async function() {
      const album = fixtures.getAlbum();
      const details = {
        ...album,
        title: 'A new album name',
      };

      const token = 'xxx.xxx.xxx';

      const expectedResponse = fixtures.getAlbumResponse();

      nock(options.endpoints.albums)
        .patch(`/${album.id}`)
        .reply(200, expectedResponse);

      const result = await client.updateAlbum(album.id, details, token);

      expect(result).toEqual(expectedResponse);
    });
  });

  describe('replies', function() {
    test('getReply', async function() {
      const reply = fixtures.getReply();

      const expectedResponse = fixtures.getReplyResponse();

      nock(options.endpoints.replies)
        .get(`/${reply.id}`)
        .reply(200, expectedResponse);

      const result = await client.getReply(reply.id);

      expect(result).toEqual(expectedResponse);
    });
  });
});

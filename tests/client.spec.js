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
    expect(typeof client.publishAlbum).toBe('function');
    expect(typeof client.getAlbum).toBe('function');
    expect(typeof client.updateAlbum).toBe('function');
    expect(typeof client.deleteAlbum).toBe('function');
    expect(typeof client.favoriteAlbum).toBe('function');
    expect(typeof client.shareAlbum).toBe('function');

    expect(typeof client.getUser).toBe('function');
    expect(typeof client.getUserTracks).toBe('function');
    expect(typeof client.getUserPlaylists).toBe('function');
    expect(typeof client.getUserAlbums).toBe('function');
    expect(typeof client.followUser).toBe('function');
    expect(typeof client.unfollowUser).toBe('function');
    expect(typeof client.getUserFollowers).toBe('function');
    expect(typeof client.getUsersFollowing).toBe('function');
    expect(typeof client.getUsersFollowing).toBe('function');
    expect(typeof client.deleteProfile).toBe('function');

    expect(typeof client.getReply).toBe('function');

    expect(typeof client.getTags).toBe('function');
    expect(typeof client.getTagTracks).toBe('function');
    expect(typeof client.getTagAlbums).toBe('function');
    expect(typeof client.getTagPlaylists).toBe('function');

    expect(typeof client.getProfile).toBe('function');
    expect(typeof client.updateProfile).toBe('function');
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

      const expectedResponse = fixtures.getResourceResponse('tracks', details);

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

      const expectedResponse = fixtures.getResourceResponse('tracks', track);

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

      const expectedResponse = fixtures.getResourceResponse('tracks', track);

      nock(options.endpoints.tracks, {
        reqheaders: {
          Authorization: `Bearer ${token}`,
        },
      })
        .patch(`/${track.id}/publish`)
        .reply(200, expectedResponse);

      const result = await client.publishTrack(track.id, token);

      expect(result).toEqual(expectedResponse);
    });

    test('getTrack', async function() {
      const track = fixtures.getTrack();

      const expectedResponse = fixtures.getResourceResponse('tracks', track);

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

      const expectedResponse = fixtures.getResourceResponse('replies', details);

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

      const expectedResponse = fixtures.getResourceResponse('tracks', track);

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

      const expectedResponse = fixtures.getResourceResponse('tracks', track);

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

      const expectedResponse = fixtures.getResourceResponse('tracks', track);

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

      const expectedResponse = fixtures.getResourceResponse(
        'playlists',
        details,
      );

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

      const expectedResponse = fixtures.getResourceResponse(
        'playlists',
        playlist,
      );

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

      const expectedResponse = fixtures.getResourceResponse(
        'playlists',
        playlist,
      );

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

      const expectedResponse = fixtures.getResourceResponse(
        'playlists',
        playlist,
      );

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

      const expectedResponse = fixtures.getResourceResponse(
        'playlists',
        playlist,
      );

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

      const expectedResponse = fixtures.getResourceResponse('tracks', track);

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

      const expectedResponse = fixtures.getResourceResponse('tracks', track);

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

      const expectedResponse = fixtures.getResourceResponse(
        'playlists',
        playlist,
      );

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

      const expectedResponse = fixtures.getResourceResponse(
        'albums',
        fixtures.getAlbum(),
      );

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

    test('publishAlbum', async function() {
      const album = fixtures.getAlbum();

      const token = 'xxx.xxx .xxx';

      const expectedResponse = fixtures.getResourceResponse('albums', album);

      nock(options.endpoints.albums, {
        reqheaders: {
          Authorization: `Bearer ${token}`,
        },
      })
        .patch(`/${album.id}`)
        .reply(200, expectedResponse);

      const result = await client.publishAlbum(album.id, token);

      expect(result).toEqual(expectedResponse);
    });

    test('getAlbum', async function() {
      const album = fixtures.getAlbum();

      const expectedResponse = fixtures.getResourceResponse('albums', album);

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

      const expectedResponse = fixtures.getResourceResponse('albums', album);

      nock(options.endpoints.albums)
        .patch(`/${album.id}`)
        .reply(200, expectedResponse);

      const result = await client.updateAlbum(album.id, details, token);

      expect(result).toEqual(expectedResponse);
    });

    test('favoriteAlbum', async function() {
      const album = fixtures.getAlbum();

      const token = 'xxx.xxx.xxx';

      const expectedResponse = fixtures.getResourceResponse('albums', album);

      nock(options.endpoints.albums)
        .post(`/${album.id}/favorite`)
        .reply(200, expectedResponse);

      const result = await client.favoriteAlbum(album.id, token);

      expect(result).toEqual(expectedResponse);
    });

    test('deleteAlbum', async function() {
      const album = fixtures.getAlbum();

      const token = 'xxx.xxx.xxx';

      nock(options.endpoints.albums)
        .delete(`/${album.id}`)
        .reply(204);

      const result = await client.deleteAlbum(album.id, token);

      expect(result).toBeUndefined();
    });

    test('shareAlbum', async function() {
      const album = fixtures.getAlbum();

      const expectedResponse = fixtures.getResourceResponse('albums', album);

      const token = 'xxx.xxx.xxx';

      nock(options.endpoints.albums)
        .post(`/${album.id}/share`)
        .reply(200, expectedResponse);

      const result = await client.shareAlbum(album.id, token);

      expect(result).toEqual(expectedResponse);
    });
  });

  describe('replies', function() {
    test('getReply', async function() {
      const reply = fixtures.getReply();

      const expectedResponse = fixtures.getResourceResponse('replies', reply);

      nock(options.endpoints.replies)
        .get(`/${reply.id}`)
        .reply(200, expectedResponse);

      const result = await client.getReply(reply.id);

      expect(result).toEqual(expectedResponse);
    });
  });

  describe('users', function() {
    test('getUser', async function() {
      const user = fixtures.getUser();

      const expectedResponse = fixtures.getResourceResponse('users', user);

      nock(options.endpoints.users)
        .get(`/${user.id}`)
        .reply(200, expectedResponse);

      const result = await client.getUser(user.id);

      expect(result).toEqual(expectedResponse);
    });

    test('getUserTracks', async function() {
      const user = fixtures.getUser();

      const expectedResponse = fixtures.getResourcesResponse(
        'tracks',
        fixtures.getTrack(),
      );

      nock(options.endpoints.users)
        .get(`/${user.id}/tracks`)
        .reply(200, expectedResponse);

      const result = await client.getUserTracks(user.id);

      expect(result).toEqual(expectedResponse);
    });

    test('getUserPlaylists', async function() {
      const user = fixtures.getUser();

      const expectedResponse = fixtures.getResourcesResponse(
        'playlists',
        fixtures.getPlaylist(),
      );

      nock(options.endpoints.users)
        .get(`/${user.id}/playlists`)
        .reply(200, expectedResponse);

      const result = await client.getUserPlaylists(user.id);

      expect(result).toEqual(expectedResponse);
    });

    test('getUserAlbums', async function() {
      const user = fixtures.getUser();

      const expectedResponse = fixtures.getResourcesResponse(
        'albums',
        fixtures.getAlbum(),
      );

      nock(options.endpoints.users)
        .get(`/${user.id}/albums`)
        .reply(200, expectedResponse);

      const result = await client.getUserAlbums(user.id);

      expect(result).toEqual(expectedResponse);
    });

    test('followUser', async function() {
      const followed = fixtures.getUser();

      const token = 'xxx.xxx.xxx';

      const expectedResponse = fixtures.getResourceResponse('users', followed);

      nock(options.endpoints.users, {
        reqheaders: {
          Authorization: `Bearer ${token}`,
        },
      })
        .post(`/${followed.id}/follow`)
        .reply(200, expectedResponse);

      const result = await client.followUser(followed.id, token);

      expect(result).toEqual(expectedResponse);
    });

    test('followUser', async function() {
      const unfollowed = fixtures.getUser();

      const token = 'xxx.xxx.xxx';

      const expectedResponse = fixtures.getResourceResponse(
        'users',
        unfollowed,
      );

      nock(options.endpoints.users, {
        reqheaders: {
          Authorization: `Bearer ${token}`,
        },
      })
        .delete(`/${unfollowed.id}/unfollow`)
        .reply(200, expectedResponse);

      const result = await client.unfollowUser(unfollowed.id, token);

      expect(result).toEqual(expectedResponse);
    });

    test('getUserFollowers', async function() {
      const user = fixtures.getUser();
      const follower = fixtures.getUser();

      const expectedResponse = fixtures.getResourcesResponse('users', follower);

      nock(options.endpoints.users)
        .get(`/${user.id}/followers`)
        .reply(200, expectedResponse);

      const result = await client.getUserFollowers(user.id);

      expect(result).toEqual(expectedResponse);
    });

    test('getUsersFollowing', async function() {
      const user = fixtures.getUser();
      const followed = fixtures.getUser();

      const expectedResponse = fixtures.getResourcesResponse('users', followed);

      nock(options.endpoints.users)
        .get(`/${user.id}/following`)
        .reply(200, expectedResponse);

      const result = await client.getUsersFollowing(user.id);

      expect(result).toEqual(expectedResponse);
    });

    test('deleteUser', async function() {
      const user = fixtures.getUser();

      const token = 'xxx.xxx.xxx';

      nock(options.endpoints.users, {
        reqheaders: {
          Authorization: `Bearer ${token}`,
        },
      })
        .delete(`/${user.id}`)
        .reply(204);

      const result = await client.deleteProfile(user.id, token);

      expect(result).toBeUndefined();
    });
  });

  describe('tags', function() {
    test('getTags', async function() {
      const tag = fixtures.getTag();

      const expectedResponse = fixtures.getResourceResponse('tags', tag);

      nock(options.endpoints.tags)
        .get('/')
        .reply(200, expectedResponse);

      const result = await client.getTags();

      expect(result).toEqual(expectedResponse);
    });

    test('getTagTracks', async function() {
      const tag = fixtures.getTag();
      const track = fixtures.getTrack();

      const expectedResponse = fixtures.getResourcesResponse('tracks', track);

      nock(options.endpoints.tags)
        .get(`/${tag.id}/tracks`)
        .reply(200, expectedResponse);

      const result = await client.getTagTracks(tag.id);

      expect(result).toEqual(expectedResponse);
    });

    test('getTagAlbums', async function() {
      const tag = fixtures.getTag();
      const album = fixtures.getAlbum();

      const expectedResponse = fixtures.getResourcesResponse('albums', album);

      nock(options.endpoints.tags)
        .get(`/${tag.id}/albums`)
        .reply(200, expectedResponse);

      const result = await client.getTagAlbums(tag.id);

      expect(result).toEqual(expectedResponse);
    });

    test('getTagPlaylists', async function() {
      const tag = fixtures.getTag();
      const playlist = fixtures.getPlaylist();

      const expectedResponse = fixtures.getResourcesResponse(
        'playlists',
        playlist,
      );

      nock(options.endpoints.tags)
        .get(`/${tag.id}/playlists`)
        .reply(200, expectedResponse);

      const result = await client.getTagPlaylists(tag.id);

      expect(result).toEqual(expectedResponse);
    });
  });

  describe('me', function() {
    test('getProfile', async function() {
      const user = fixtures.getUser();

      const token = 'xxx.xxx.xxx';

      const expectedResponse = fixtures.getResourceResponse('users', user);

      nock(options.endpoints.me, {
        reqheaders: {
          Authorization: `Bearer ${token}`,
        },
      })
        .get('/')
        .reply(200, expectedResponse);

      const result = await client.getProfile(token);

      expect(result).toEqual(expectedResponse);
    });

    test('updateProfile', async function() {
      const user = fixtures.getUser();

      const details = {
        ...user,
        fullname: 'User fullname',
      };

      const token = 'xxx.xxx.xxx';

      const expectedResponse = fixtures.getResourceResponse('users', user);

      nock(options.endpoints.me, {
        reqheaders: {
          Authorization: `Bearer ${token}`,
        },
      })
        .patch('/', details)
        .reply(200, expectedResponse);

      const result = await client.updateProfile(details, token);

      expect(result).toEqual(expectedResponse);
    });
  });
});

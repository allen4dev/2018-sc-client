const uuid = require('uuid');

module.exports = {
  getTrack() {
    return {
      id: uuid(),
      title: 'Track title',
      photo: 'Track image file',
      src: 'Track audio file',
      tags: [1, 2, 3],
    };
  },

  getUser() {
    return {
      id: uuid(),
      email: 'allen@example.test',
      password: 'secret',
      username: 'Allen',
    };
  },

  getReply() {
    return {
      id: uuid(),
      body: 'Horrible track',
    };
  },

  getPlaylist() {
    return {
      id: uuid(),
      body: 'Horrible playlist',
    };
  },

  getAlbum() {
    return {
      id: uuid(),
      title: 'Album title',
      photo: 'Album photo',
    };
  },

  getRawAlbum() {
    return {
      details: { title: 'My album' },
      photo: 'Album photo',
      tags: [1, 2, 3],
    };
  },

  getTokenResponse() {
    return {
      data: {
        type: 'auth',
        id: uuid(),
        attributes: {
          token: 'xxx.xxx.xxx',
        },
      },
    };
  },

  getUserResponse() {
    return {
      data: {
        type: 'users',
        id: uuid(),
        attributes: this.getUser(),
      },
    };
  },

  getTrackResponse() {
    return {
      data: {
        type: 'tracks',
        id: uuid(),
        attributes: this.getTrack(),
      },
    };
  },

  getAlbumResponse() {
    return {
      data: {
        type: 'alvyns',
        id: uuid(),
        attributes: this.getAlbum(),
      },
    };
  },

  getReplyResponse() {
    return {
      data: {
        type: 'replies',
        id: uuid(),
        attributes: this.getReply(),
      },
    };
  },

  getPlaylistResponse() {
    return {
      data: {
        type: 'playlists',
        id: uuid(),
        attributes: this.getPlaylist(),
      },
    };
  },
};

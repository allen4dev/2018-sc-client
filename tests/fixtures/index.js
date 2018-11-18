const uuid = require('uuid');

module.exports = {
  getTrack() {
    return {
      title: 'Track title',
      photo: 'Track image file',
      src: 'Track audio file',
      tags: [1, 2, 3],
    };
  },

  getUser() {
    return {
      email: 'allen@example.test',
      password: 'secret',
      username: 'Allen',
    };
  },

  getReply() {
    return {
      body: 'Horrible track',
    };
  },

  getPlaylist() {
    return {
      body: 'Horrible playlist',
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

  getTrackResponse() {
    return {
      data: {
        type: 'tracks',
        id: uuid(),
        attributes: this.getTrack(),
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

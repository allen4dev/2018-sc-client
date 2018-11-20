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

  getTag() {
    return {
      id: uuid(),
      name: 'Some tag name',
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

  getResourcesResponse(type, resource) {
    return {
      data: [
        {
          type: type,
          id: uuid(),
          attributes: resource,
        },
      ],
    };
  },

  getResourceResponse(type, resource) {
    return {
      data: {
        type,
        id: uuid(),
        attributes: resource,
      },
    };
  },
};

const uuid = require('uuid');

module.exports = {
  getTokenResponse() {
    return {
      data: {
        type: 'auth',
        attributes: {
          id: uuid(),
          token: 'xxx.xxx.xxx',
        },
      },
    };
  },
};

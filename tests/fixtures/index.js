const uuid = require('uuid');

module.exports = {
  getTokenResponse() {
    return {
      data: {
        type: 'auth',
        attributes: {
          id: '1',
          token:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9hdXRoXC9yZWdpc3RlciIsImlhdCI6MTU0MjUwMTcxMiwiZXhwIjoxNTQyNTA1MzEyLCJuYmYiOjE1NDI1MDE3MTIsImp0aSI6ImlYSGxjVXpNRWx3UmJweHMiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.q8zAsCWoLfZ4rjs0qhV99KGXi84IYYjcLCFFUrZk9N8',
        },
      },
    };
  },
};

var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'replica';

var config = {
  replica: {
    baseUrl: "/2tvideos/",
    root: rootPath,
    app: {
      name: '2Tvideos'
    },
    port: process.env.PORT || 3001,
    db: 'mongodb://10.131.137.235:27017,10.131.137.243:27017,10.131.137.168:27017/2Tvideos'
  },

  development: {
    baseUrl: "/2tvideos/",
    root: rootPath,
    app: {
      name: '2Tvideos'
    },
    port: process.env.PORT || 3001,
    db: 'mongodb://localhost/2Tvideos_Desarrollo'
  },

  test: {
    baseUrl: "/2tvideos/",
    root: rootPath,
    app: {
      name: '2Tvideos'
    },
    port: process.env.PORT || 3001,
    db: 'mongodb://localhost/2Tvideos_test'
  },

  production: {
    baseUrl: "/2tvideos/",
    root: rootPath,
    app: {
      name: '2Tvideos'
    },
    port: process.env.PORT || 3001,
    db: 'mongodb://lauramv21:laura.21@ds135963.mlab.com:35963/2tvideos'
  }
};

module.exports = config[env];

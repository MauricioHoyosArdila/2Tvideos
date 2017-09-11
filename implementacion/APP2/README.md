# Disponibilidad

#### /etc/sysconfig/selinux
    SELINUX=disabled

#### /etc/hosts
    10.131.137.169  app1
    10.131.137.244  app2
    10.131.137.235  mongo1
    10.131.137.243  mongo2
    10.131.137.168  mongo3

#### /etc/fstab
    mongo2:/uploads2 /mnt/uploads glusterfs defaults,_netdev 0 0

#### /etc/nginx/nginx.conf
    server {
        client_max_body_size 100M;
        listen       80 default_server;
        server_name  10.131.137.169;
        root    /usr/share/nginx/html;

    # Load configuration files for the default server block.
    include /etc/nginx/default.d/*.conf;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header HOST $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://127.0.0.1:3001/;
        proxy_redirect off;
    }

# Rendimiento

# Seguridad

#### app/controllers/users.js
    var User = require('../models/user');
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var configAuth = require('../../config/auth');
    
    router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
    router.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/videos',failureRedirect: '/'}));
    
    router.get('/profile', function(req, res){res.render("profile");});
    
    passport.use(new GoogleStrategy({
          clientID: configAuth.googleAuth.clientID,
          clientSecret: configAuth.googleAuth.clientSecret,
          callbackURL: configAuth.googleAuth.callbackURL
          },
          function(accessToken, refreshToken, profile, done) {
          process.nextTick(function(){
            User.findOne({'google.id': profile.id}, function(err, user){
            //User.getUserByUsername(google.username, function(err, user){
              if(err)
                return done(err);
              if(user)
                return done(null, user);
              else {
                var newUser = new User();
                newUser.google.id = profile.id;
                newUser.google.token = accessToken;
                newUser.google.name = profile.displayName;
                newUser.google.email = profile.emails[0].value;
                
                newUser.save(function(err){
                  if(err)
                    throw err;
                    return done(null, newUser);
                  })
                console.log(profile);
              }
            });
          });
        }
      ));

#### app/models/user.js
      var UserSchema = new Schema({
        name: String,
        lastname: String,
        username:String,
        password: String,
        google: {
          id: String,
          token: String,
          email: String,
          name: String
        }
      });

#### app/views/login.handlebars
      <p class="message">Iniciar sesión con Google </p><a href="/auth/google" class="btn btn-danger"><span class="fa fa-google-plus"></span> Google</a>

#### config/auth.js
      module.exports = {
        'googleAuth' : {
          'clientID': '708076208048-ut0japs4r94i2mtr5r2inlh9k7p3g84i.apps.googleusercontent.com',
          'clientSecret': 'SVaiHk4tJMdLAX_2A3C_eML2',
          'callbackURL': 'http://localhost:3001/auth/google/callback'
        }
      }

#### package.json
    "passport-google-oauth": "^1.0.0";

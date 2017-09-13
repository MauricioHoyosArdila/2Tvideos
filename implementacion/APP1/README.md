# Disponibilidad
Primero se desactivo Selinux:
#### /etc/sysconfig/selinux
    SELINUX=disabled

#### /etc/hosts
    10.131.137.169  app1
    10.131.137.244  app2
    10.131.137.235  mongo1
    10.131.137.243  mongo2
    10.131.137.168  mongo3

### Configurando GlusterFS

Se añadio el repositorio para GlusterFS:
#### /etc/yum.repos.d/gluster.repo
    [gluster]
    name=Gluster
    baseurl=http://mirror.upb.edu.co/centos/7.3.1611/storage/x86_64/gluster-3.8/
    gpgcheck=0

Se instalo GlusterFS:

    sudo yum install glusterfs-client
    
Se creo una carpeta dentro de /mnt:

    mkdir /mnt/uploads
    
Se monto el sistema de archivos en dicha carpeta:

    mount.glusterfs mongo1:/uploads1 /mnt/uploads

Para verificar se ejecuto el comando:

    mount
    df -h
    
Y se observo la existencia de la carpeta compartida.
Para finalizar, se configuro de tal manera que se ejecutara automaticamente al iniciarse el sistema:

#### /etc/fstab
    mongo1:/uploads1 /mnt/uploads glusterfs defaults,_netdev 0 0

### Configurando NGINGX
Se instalo NGINX:

    yum install nginx
    
Se inicio el servicio:

    systemctl enable nginx
    systemctl start nginx

Se abrieron los puertos necesarios:

    firewall-cmd --zone=public --add-port=80/tcp --permanent
    
Se configuro NGINX para la aplicación:
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

### Configurando PM2
Se instalo pm2:

    npm install pm2

Se configuro pm2 para que inicie con el sistema:

    pm2 startup

Se inicio la aplicacion:

    pm2 start app.js

Guardamos en pm2 la aplicacion:

    pm2 save


# Rendimiento

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

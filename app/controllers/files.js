var express = require('express'),
  router = express.Router(),
  multer = require('multer'),
  cloudinary = require('cloudinary'),
  mongoose = require('mongoose'),
  File = mongoose.model('File'),
  fs= require('fs');

 var copyFile = require('quickly-copy-file');
//destino de videos subidos
//var upload = multer({dest :'./videos'});
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './../../../mnt/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname )
  }
})

var upload = multer({ storage: storage })

//conexión con Cloudinary
cloudinary.config({
  cloud_name: "lauramv21",
  api_key: "127686626259722",
  api_secret: "_LPx0JveMPU6ssLdjNyZuSWxSDg"
});

module.exports = function (app) {
  app.use('/', router);
};

/* Servicio Web: Entrada al formato de subir un archivo.
 Método: GET
 URI: /publicar
 */

router.get('/publicar', ensureAuthenticated, function(req, res){
  res.render('upload');
});

/* Servicio Web: Almacena en la base de datos la referencia al video junto con sus atributos.
 Método: POST
 URI: /publicando
 */
var cache={};
router.post("/publicando", upload.single('video'), function(req,res){
  var private = false;
  if(req.body.privateFile == 'on'){
    private = true;
  }

  var video = {
    username:req.user.username,
    title:req.body.title,
    description:req.body.description,
    video:req.file.path,
    privateFile:private
  };
  console.log(req.file.path);
  var archivo = new File(video);
  archivo.video = "/uploads/" +req.file.filename;
  archivo.save(function(err){
    console.log(archivo);
    res.redirect("/misvideos");
  });

  /*
  cloudinary.uploader.upload(req.file.path,
    function(result){
      archivo.video = result.url;
      archivo.save(function(err){
        console.log(archivo);
        res.render("display");
      });
    },
    {resource_type: "video"}
  );
  */
});

/* Servicio Web: Busca y muestra todos los videos en estado publico subidos por los usuarios
 en la Base de datos.
 Método: GET
 URI: /videos
 */


router.get("/videos",ensureAuthenticated,function(req, res){
  //console.log(req.file);
  File.find({privateFile:"false"},function(err, documento){
    if(err){console.log(err);}
    for (i = 0; i < documento.length; i++) {
      var camino= documento[i].video;
      //console.log(documento[i].video);
      var vec = camino.split('/');
      camino= "/cache/"+vec[vec.length-1];
      if (cache[camino]) {

        documento[i].video=camino;
        //console.log(documento[i].video);
        console.log('Recurso recuperado del cache:'+camino);
      }else{
        cache[camino]=true;

        var dir=process.cwd();
        //console.log(__dirname-"/app/controllers");
        //console.log('Recurso leido del disco:'+camino);
        //console.log(__dirname+documento[i].video);
        //console.log(__dirname+camino);

        copyFile('/mnt'+documento[i].video, dir+'/public'+camino, function(error) {
           if (error) return console.error(error);
              //console.log('File was copied!')
        });

      }
    }
    //console.log(documento);
    res.render("display",{ videos : documento})
  });
});

/* Servicio Web: Despliega la lista de archivos subidos por el usuario en la sesión actual.
 Método: GET
 URI: /misvideos
 */

router.get('/misvideos', ensureAuthenticated, function(req, res){
  File.find({username:req.user.username}, function(err, documento){
    if(err){console.log(err);}
    console.log(documento);
    res.render('profile', {videos:documento});
  });
});

/* Servicio Web: Entrada al formato de actualización de los datos de la publicación.
 Método: GET
 URI: /editar/:id
 */

router.get('/editar/:id', ensureAuthenticated, function(req, res) {
  var id_video = req.params.id;
  File.findOne({"_id": id_video}, function (err, video) {
    res.render('edit', {video:video});
  });
});

router.post('/editar/:id', function(req, res){
  var privado = false;
  if(req.body.privateFile == 'on'){
    privado = true;
  }
  var videoData = {
    title: req.body.titulo,
    description: req.body.description,
    privateFile : privado
  };
  console.log(videoData);
  File.update({"_id":req.params.id}, videoData, function(){
    res.redirect("/misvideos")
  });
});

/* Servicio Web: Filtra los videos públicos por usuario y los muestra.
 Método: POST
 URI: /buscar
 */

router.post('/buscar', function(req, res) {
  File.find({username: req.body.buscar, privateFile: "false"}, function (err, documento) {
    if (err) {
      console.log(err);
    }
    res.render('display', {username: req.user.username, videos: documento});
  });
});

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    //req.flash('error_msg','You are not logged in');
    res.redirect('/ingresar');
  }
}

/* Servicio Web: Elimina la publicación de la Base de datos.
 Método: POST
 URI: /delete/:id
 */
router.post('/delete/:id',function (req, res) {
  File.remove({"_id":req.params.id},function (err) {
    if (err){console.log(err);}
    res.redirect("/misvideos");
  });
});


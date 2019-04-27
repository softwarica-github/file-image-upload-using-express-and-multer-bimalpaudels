var express = require('express');
var body_parser = require('body-parser');
var multer = require('multer');

var app = express();
app.use(body_parser.urlencoded({extended:true}));
app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');

});

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'Images');
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname+'-'+Date.now('-'));
    }
});

var upload = multer({storage:storage});

app.post('/uploadfile', upload.single('image'), (req, res, next) =>{
    const file = req.file;
    if(!file){
        const error = new Error('Select an image please');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send('Image uploaded successfully. Check the Images folder in the working directory');
})

app.listen(app.get('port'), function(){
    console.log('Express started on localhost: ' + app.get('port') + ' Press Ctrl + C to terminate');
} )
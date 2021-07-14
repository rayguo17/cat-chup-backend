const express = require('express');
const cors = require('cors');
const development = require('./knexfile').development;
const knex = require('knex')(development);
const authClass = require('./auth')(knex);
const app = express();
const path = require('path')
const fileUpload = require('express-fileupload');
const UserService = require('./service/userService');
const UserRouter = require('./router/userRouter');
const PublicService = require('./service/publicService');
const PublicRouter = require('./router/publicRouter');
const FriendService = require('./service/friendService');
const FriendRouter = require('./router/friendRouter');
const server = require('http').Server(app);
const setupSocket = require('./socketIo');


app.use(express.json());
app.use(cors());
app.use(authClass.initialize());
app.use(express.static('public'))
app.use(fileUpload());
setupSocket(server);

// const upload = multer({
//     dest:'./public/profilePic'
// })
app.use('/api',new PublicRouter(new PublicService(knex)).router());
app.use('/api/user',authClass.authenticate(),new UserRouter(new UserService(knex)).router())
app.use('/api/friends',authClass.authenticate(),new FriendRouter(new FriendService(knex)).router());





app.post('/api/upload-profile-pic',(req, res) => {
    let sampleFile;
    let uploadPath;
    console.log('req.files',req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
      console.log('req',req.body);
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      sampleFile = req.files.profile_pic;
      let resultPath = '/profilePic/' + Date.now() +path.extname(req.body.pic_name)
      uploadPath = __dirname + '/public' + resultPath;
    
      // Use the mv() method to place the file somewhere on your server
      sampleFile.mv(uploadPath, function(err) {
        if (err)
          return res.status(500).send(err);
    
        res.send(resultPath);
      });        
})
app.post('/api/upload-bg-pic',(req, res) => {
    let sampleFile;
    let uploadPath;
    console.log('req.files',req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
      console.log('req',req.body);
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      sampleFile = req.files.profile_pic;
      let resultPath = '/bgPic/' + Date.now() +path.extname(req.body.pic_name)
      uploadPath = __dirname + '/public' + resultPath;
    
      // Use the mv() method to place the file somewhere on your server
      sampleFile.mv(uploadPath, function(err) {
        if (err)
          return res.status(500).send(err);
    
        res.send(resultPath);
      });        
})








server.listen(8080, () => {
    console.log('server running on port 8080...')
})
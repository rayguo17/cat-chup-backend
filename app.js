const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const development = require('./knexfile').development;
const { hashPassword, checkPassword } = require('./bcrypt');
const { jwtSecret } = require('./config');
const knex = require('knex')(development);
const authClass = require('./auth')(knex);
const app = express();
const path = require('path')
const axios = require('axios');
const fileUpload = require('express-fileupload');

app.use(express.json());
app.use(cors());
app.use(authClass.initialize());
app.use(express.static('public'))
app.use(fileUpload());

// const upload = multer({
//     dest:'./public/profilePic'
// })


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
app.post('/api/checkUsername',async (req,res)=>{
    try {
        console.log('username',req.body.username);
        let username = req.body.username;
        let query = await knex('user').where('username',username);
        console.log('query',query);
        if(query[0]){
            res.send(false)
        }else{
            res.send(true)
        }
    } catch (error) {
        console.log('check username error',error);
    }
})

app.post('/api/register', async (req, res) => {
    try {
        console.log('register process', req.body);
        //get three things: username email password,
        //set the password into bcrypt item, and then store in db
        let hash = await hashPassword(req.body.password);
        let newUser = {}
        Object.assign(newUser,req.body);
        delete newUser.password;
        newUser.hash = hash;
        let id = await knex('user').insert(newUser)
            .returning('id');
        let payload = {
            id: id[0]
        }
        let token = jwt.sign(payload, jwtSecret);
        res.json({
            token: token
        })
    } catch (error) {
        console.log('register', error)
    }


})
app.post('/api/login', async (req, res) => {
    try {
        console.log('login process',req.body)
    if (req.body.username && req.body.password) {
        let username = req.body.username;
        let password = req.body.password;
        let query = await knex('user').where('username', username)
            .select('id', 'hash');
        if(query[0]){
            let hash = query[0].hash;
        let match = await checkPassword(password,hash);
        if(match){
            let payload = {
                id:query[0].id
            };
            let token =jwt.sign(payload,jwtSecret);
            res.json({token:token})
        }else{
            res.sendStatus(401);
        }
        }else{
            res.sendStatus(401);
        }
        
    }else{
        res.sendStatus(401);
    }
    } catch (error) {
        console.log('login error',error);
    }
    
});





app.listen(8080, () => {
    console.log('server running on port 8080...')
})
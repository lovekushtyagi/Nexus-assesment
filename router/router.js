const Router = require('express').Router();

const {
  CreateMusic,
  GetMusic,
  UpdateMusic,
  DeleteMusic,
  Upload
 } = require('../controllers/musicController');


 Router.post('/add-music', CreateMusic);
 Router.get('/get-music', GetMusic);
 Router.patch('/update-music/:musicId', UpdateMusic);
 Router.delete('/delete-music/:musicId', DeleteMusic);
 Router.post('/upload-music', Upload);


module.exports = Router;
const Router = require('express').Router();

const {
  CreateMusic,
  GetMusic,
  GetMusicById,
  UpdateMusic,
  DeleteMusic,
  Upload
 } = require('../controllers/musicController');


 Router.post('/add-music', CreateMusic); // add music
 Router.get('/get-music', GetMusic); // get music
 Router.get('/get-music-by-id/:musicId', GetMusicById); // get music by id
 Router.patch('/update-music/:musicId', UpdateMusic); // update music
 Router.delete('/delete-music/:musicId', DeleteMusic); // delete music
 Router.post('/upload-music', Upload); // upload


module.exports = Router;
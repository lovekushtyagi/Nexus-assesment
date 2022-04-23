const Router = require('express')();
const mongoose = require('mongoose');
const MusicModel = require("../models/music");
const upload = require('../middlwares/uploadMusic');
const { query } = require('express');

// Not authenticating the route - doing as per requirements
// Add Music
const CreateMusic = Router.post('/add-music', async(req, res) => {
  try {
    const musicObj = new MusicModel(req.body);
    musicObj.dateAdded = new Date(Date.now());
    const data = await musicObj.save();
    res.send({
      data: data
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message ? error.message : 'error'})
  }
});

// Get Music
const GetMusic = Router.get('/get-music', async(req, res) => {
  try {
    const params = {
      skip: (parseInt(req.query.page) - parseInt(1)) * 5  || 0,
      limit: parseInt(req.query.limit) || 5
    }
    const [musics] = await MusicModel.aggregate([
        {
            $facet: {
                metaData: [
                    { $count: 'total' }
                ],
                data: [
                    { $skip: params.skip },
                    { $limit: params.limit },
                    {$sort: { genre: 1, category: 1 }},

                ]
            }
        },
        {
            $addFields: {
                "totalRecords": "$metaData.total",
            }
        },
        {
            $unwind: {
                path: "$totalRecords",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                "metaData": 0
            }
        }
    ]);
    res.send(musics)
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message ? error.message : 'error' })
  }
});

// Get Music by Id
const GetMusicById = Router.get('/get-music-by-id/:musicId', async(req, res) => {
  try {
    const music = await MusicModel.findOne({_id: mongoose.Types.ObjectId(req.params.musicId)}, "mp3File");
    res.send(music)
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message ? error.message : 'error' });
  }
})

// Update Music
const UpdateMusic = Router.patch('/update-music/:musicId', async(req, res) => {
  try {
    const updatedMusic = await MusicModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.musicId)}, 
      {$set: req.body}, {new: true});
      res.send(updatedMusic);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message ? error.message : 'error' })
  }
})

// Delete Music
const DeleteMusic = Router.delete('/delete-music/:musicId', async(req, res) => {
  try {
    const deletedItem = await MusicModel.deleteOne({_id: mongoose.Types.ObjectId(req.params.musicId)});
    if(deletedItem.acknowledged && deletedItem.deletedCount){
      return res.send({message: 'Item deleted'})
    } else {
      return res.status(403).json({error: 'Something went wrong  or item already deleted'})
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message ? error.message : 'error' })
  }
})

// Upload Music
const Upload = Router.post('/upload-music', upload.single('userFile'), async(req, res) => {
  var test =  req.protocol + "://" + req.headers.host + '/upload/' + req.file.fieldname + '-' +req.body.location;
  res.send(test);
})

module.exports = {
  CreateMusic,
  GetMusic,
  GetMusicById,
  UpdateMusic,
  DeleteMusic,
  Upload
}
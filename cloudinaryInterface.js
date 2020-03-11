var cloudinary = require('cloudinary').v2;
var presets = require('./cloudinaryPresets.js');
require('dotenv').config();

cloudinary.config({ 
    cloud_name: 'kclsu-media', 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET
  });

  function cloudinaryUpload(data){
        return cloudinary.uploader.upload(data.imageRef, { folder: "website_uploads/", public_id: 'kings6'}, (error, result) => { 
        if (error) console.log('Error: ', error)
        return result
    });
  }

  function manipulateImage(public_id, data){
      let preset = !data.preset? {} : presets[data.preset];
      if (data.edit) preset = editPreset(preset);
      let promise =  new Promise(resolve => {
          let transform = cloudinary.url(public_id, { transformation: preset});
          resolve(transform)
      })
        return promise;
  }

  function editPreset(preset){
    console.log('Editing Preset...')
  }

  module.exports = {
    cloudinaryUpload: cloudinaryUpload,
    manipulateImage: manipulateImage
  };
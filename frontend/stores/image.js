var Store = require('flux/utils').Store;
var ImageConstants = require('../constants/image_constants');
var AppDispatcher = require('../dispatcher/Dispatcher');
var UserStore = require('../stores/user');

var ImageStore = new Store(AppDispatcher);

var _images = [];

var resetImages = function(images){
  _images = images.slice(0);
};

var addNewImage = function(newImage){
  _images.unshift(newImage);
};

ImageStore.all = function () {
  return _images.slice(0);
};

// for use on profile page, will return images the user imageed
// or images imageed to their wall
ImageStore.getByUserId = function(userIdString) {

  var userId = parseInt(userIdString);
  var images = ImageStore.all();
  var relevantImages = [];


  images.forEach(function(image){

    if (image.owner_id === userId){
      relevantImages.push(image);
    }
  });

  return relevantImages;
};

ImageStore.getByUserIdOnlyFirstNine = function(userIdString) {

  var userId = parseInt(userIdString);
  var images = ImageStore.all();
  var relevantImages = [];


  images.forEach(function(image){

    if (image.owner_id === userId){
      relevantImages.push(image);
    }
  });

  return relevantImages.slice(0,9);
};

// Could be useful for putting images in the feed, not sure yet
// ImageStore.getUsersFollowedImages = function(userIdString){
//   var userId = parseInt(userIdString);
//   var user = UserStore.findUser(userId);
//   var images = ImageStore.all();
//
//   if(images === [] || user.string === "Bad User"){
//     return null;
//   }
//   var relevantImages = [];
//   var relevantUsers = [];
//
// // now we get an array of good user ids
//     user.usersFollowing.forEach(function(user){
//       relevantUsers.push(user.id);
//     });
//
// // now we reference the images against the
//   images.forEach(function(image){
//     if (relevantUsers.indexOf(image.author_id) !== -1){
//       relevantImages.push(image);
//     }
//   });
//   return relevantImages;
// },

ImageStore.__onDispatch = function (payload) {

  switch(payload.actionType) {
    case ImageConstants.IMAGES_RECEIVED:
      var result = resetImages(payload.images);
      ImageStore.__emitChange();
      break;
    case ImageConstants.NEW_IMAGE_RECEIVED:
      var result = addNewImage(payload.newImage);
      ImageStore.__emitChange();
      break;
  }
};

module.exports = ImageStore;

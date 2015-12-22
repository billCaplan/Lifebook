var Store = require('flux/utils').Store;
var ImageConstants = require('../constants/image_comment_constants');
var AppDispatcher = require('../dispatcher/Dispatcher');

var ImageCommentsStore = new Store(AppDispatcher);

var _image_comments = [];

var resetImageComments = function(image_comments){

  _image_comments = image_comments.slice(0);
};

var addNewImageComment = function(newImageComment){

  _image_comments.push(newImageComment);
};

ImageCommentsStore.all = function () {
  return _image_comments.slice(0);
};

ImageCommentsStore.getByPostId = function(imageIdString) {

  var imageId = parseInt(imageIdString);
  var image_comments = ImageCommentsStore.all();
  var relevantImageComments = [];


  image_comments.forEach(function(comment){

    if (comment.image_id === imageId){
      relevantImageComments.push(comment);
    }
  });

  return relevantImageComments;
};

ImageCommentsStore.__onDispatch = function (payload) {

  switch(payload.actionType) {
    case ImageConstants.IMAGE_COMMENTS_RECEIVED:

      var result = resetImageComments(payload.image_comments);
      ImageCommentsStore.__emitChange();
      break;
    case ImageConstants.NEW_IMAGE_COMMENT_RECEIVED:
      var result = addNewImageComment(payload.newImageComment);
      ImageCommentsStore.__emitChange();
      break;
  }
};

module.exports = ImageCommentsStore;

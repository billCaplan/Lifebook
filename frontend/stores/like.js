var Store = require('flux/utils').Store;
var LikeConstants = require('../constants/like_constants');
var AppDispatcher = require('../dispatcher/Dispatcher');

var LikeStore = new Store(AppDispatcher);

var _likes = [];

var resetLikes = function(likes){
  _likes = likes.slice(0);
};

var addNewLike = function(newLike){
  _likes.push(newLike);
};

LikeStore.all = function () {
  return _likes.slice(0);
};

LikeStore.getByLikeParties = function(likeParties) {
  var author_id = parseInt(likeParties.author_id);
  var likeed_user_id = parseInt(likeParties.likeed_user_id);
  var likes = LikeStore.all();
  var relevantLike = {};

  likes.forEach(function(like){

    if (like.author_id === author_id && like.likeed_user_id === likeed_user_id){
      relevantLike = like;
    }
  });

  return relevantLike;
};

LikeStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UserConstants.LIKE_RECEIVED:
      // var result = addNewLike(payload.newLike);
      var result = resetLikes(payload.like);
      LikeStore.__emitChange();
      break;
    case LikeConstants.LIKES_RECEIVED:
      var result = resetLikes(payload.likes);
      LikeStore.__emitChange();
      break;
    case LikeConstants.LIKE_REMOVED:
      var result = resetLikes(payload.likes);
      LikeStore.__emitChange();
  }
};

module.exports = LikeStore;

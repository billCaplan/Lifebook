var Store = require('flux/utils').Store;
var LikeConstants = require('../constants/like_constants');
var AppDispatcher = require('../dispatcher/Dispatcher');
var UserStore = require('../stores/user');

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

LikeStore.getByLikeParties = function(like) {
  var author_id = parseInt(like.author_id);
  var post_id = parseInt(like.post_id);
  var like_type = like.like_type;
  var likes = LikeStore.all();
  var relevantLike = {};

  likes.forEach(function(like){

    if (like.author_id === author_id &&
      like.post_id === post_id &&
      like.like_type === like_type){
      relevantLike = like;
    }
  });

  return relevantLike;
};

LikeStore.getAllOtherLikers = function(like){

  var users = UserStore.all();
  var likes = LikeStore.all();
  var author_id = parseInt(like.author_id);
  var post_id = parseInt(like.post_id);
  var like_type = like.like_type;


  var relevantLikes = [];
  likes.forEach(function(like){
    if (like.post_id === post_id &&
        like.like_type === like_type){
        relevantLikes.push(like);
    }
  });

  return relevantLikes;

};


LikeStore.getTheUsers = function(like){

  var relevantLikes = LikeStore.getAllOtherLikers(like);
  var relevantUsers = [];
  relevantLikes.forEach(function(like){
    relevantUsers.push(UserStore.findUser(like.author_id));
  });
  return relevantUsers;
};

LikeStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case LikeConstants.NEW_LIKE_RECEIVED:
      // var result = addNewLike(payload.newLike);
      var result = addNewLike(payload.newLike);
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

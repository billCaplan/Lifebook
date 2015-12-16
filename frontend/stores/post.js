var Store = require('flux/utils').Store;
var CHANGE_EVENT = "change";
var PostConstants = require('../constants/post_constants');
var AppDispatcher = require('../dispatcher/Dispatcher');

var PostStore = new Store(AppDispatcher);

var _posts = [];

var resetPosts = function(posts){
  _posts = posts.slice(0);
};

var addNewPost = function(newPost){
  _posts.push(newPost);
};

PostStore.all = function () {
  return _posts.slice(0);
};

PostStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case PostConstants.POSTS_RECEIVED:
      var result = resetPosts(payload.posts);
      PostStore.__emitChange();
      break;
    case PostConstants.NEW_POST_RECEIVED:
      var result = addNewPost(payload.post);
      PostStore.__emitChange();
      break;
  }
};

module.exports = PostStore;

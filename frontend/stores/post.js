var Store = require('flux/utils').Store;
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

PostStore.getByUserId = function(userIdString) {
  var userId = parseInt(userIdString);
  var posts = PostStore.all();
  var relevantPosts = [];

  posts.forEach(function(post){

    if (post.author_id === userId || post.target_id === userId){
      relevantPosts.push(post);
    }
  });

  return relevantPosts;
};

PostStore.__onDispatch = function (payload) {

  switch(payload.actionType) {
    case PostConstants.POSTS_RECEIVED:
      var result = resetPosts(payload.posts);
      PostStore.__emitChange();
      break;
    case PostConstants.NEW_POST_RECEIVED:
      var result = addNewPost(payload.newPost);
      PostStore.__emitChange();
      break;
  }
};

module.exports = PostStore;

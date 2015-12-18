var Store = require('flux/utils').Store;
var PostConstants = require('../constants/post_constants');
var AppDispatcher = require('../dispatcher/Dispatcher');
var UserStore = require('../stores/user');

var PostStore = new Store(AppDispatcher);

var _posts = [];

var resetPosts = function(posts){
  _posts = posts.slice(0);
};

var addNewPost = function(newPost){
  _posts.unshift(newPost);
};

PostStore.all = function () {
  return _posts.slice(0);
};

// for use on profile page, will return posts the user posted
// or posts posted to their wall
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

// Used for populating the feed
PostStore.getUsersFollowedPosts = function(userIdString){
  var userId = parseInt(userIdString);
  var user = UserStore.findUser(userId);
  var posts = PostStore.all();
  console.log(user);
  console.log(posts);

  if(posts === [] || user.string === "Bad User"){
    return null;
  }
  var relevantPosts = [];
  var relevantUsers = [];

// now we get an array of good user ids
    user.usersFollowing.forEach(function(user){
      relevantUsers.push(user.id);
    });

// now we reference the posts against the
  posts.forEach(function(post){
    if (relevantUsers.indexOf(post.author_id) !== -1){
      relevantPosts.push(post);
    }
  });
  return relevantPosts;
},

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

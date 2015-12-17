var AppDispatcher = require('../dispatcher/Dispatcher');
var PostConstants = require('../constants/post_constants');
var UserConstants = require('../constants/user_constants');

var ApiActions = {
  receiveAll: function(posts){
    AppDispatcher.dispatch({
      actionType: PostConstants.POSTS_RECEIVED,
      posts: posts
    });
  },
  recieveCurrentUser: function(currentUser){
    AppDispatcher.dispatch({
      actionType: UserConstants.CURRENT_USER_RECEIVED,
      currentUser: currentUser
    });
  },
  receiveNewPost: function(newPost){
    AppDispatcher.dispatch({
      actionType: PostConstants.NEW_POST_RECEIVED,
      newPost: newPost
    });
  },
  receiveAllUsers: function(users){
    console.log("In the actions");
    AppDispatcher.dispatch({
      actionType: UserConstants.USERS_RECEIVED,
      users: users
    });
  }
};

module.exports = ApiActions;

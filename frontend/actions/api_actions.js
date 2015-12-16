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
  }
};

module.exports = ApiActions;

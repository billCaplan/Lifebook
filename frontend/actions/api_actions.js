var AppDispatcher = require('../dispatcher/Dispatcher');
var PostConstants = require('../constants/post_constants');

var ApiActions = {
  receiveAll: function(posts){
    AppDispatcher.dispatch({
      actionType: PostConstants.POSTS_RECEIVED,
      posts: posts
    });
  },
  recieveCurrentUser: function(currentUser){
    AppDispatcher.dispatch({
      actionType: "CURRENT_USER_RECIEVED",
      currentUser: currentUser
    });
  }
};

module.exports = ApiActions;

var AppDispatcher = require('../dispatcher/dispatcher');
var PostConstants = require('../constants/post_constants');

var ApiActions = {
  receiveAll: function(posts){
    AppDispatcher.dispatch({
      actionType: PostConstants.POSTS_RECEIVED,
      posts: posts
    });
  }
};

module.exports = ApiActions;

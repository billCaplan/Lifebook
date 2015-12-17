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
    AppDispatcher.dispatch({
      actionType: UserConstants.USERS_RECEIVED,
      users: users
    });
  },
  receiveAllComments: function(comments){
    AppDispatcher.dispatch({
      actionType: CommentConstants.COMMENTS_RECEIVED,
      comments: comments
    });
  },
  receiveNewComment: function(newComment){
    AppDispatcher.dispatch({
      actionType: CommentConstants.NEW_COMMENT_RECEIVED,
      newComment: newComment
    });
  }
};

module.exports = ApiActions;

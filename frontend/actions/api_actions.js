var AppDispatcher = require('../dispatcher/Dispatcher');
var PostConstants = require('../constants/post_constants');
var UserConstants = require('../constants/user_constants');
var FollowConstants = require('../constants/follow_constants');

var ApiActions = {
  // receiveAllPosts
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
  },
  receiveNewFollow: function(newPost){
    AppDispatcher.dispatch({
      actionType: UserConstants.FOLLOW_RECEIVED
    });
  },
  receiveAllImages: function(images){
    AppDispatcher.dispatch({
      actionType: ImageConstants.IMAGES_RECEIVED,
      images: images
    });
  },
  receiveNewImage: function(newImage){
    AppDispatcher.dispatch({
      actionType: ImageConstants.NEW_IMAGE_RECEIVED,
      newImage: newImage
    });
  },
  receiveAllFollows: function(follows){
    AppDispatcher.dispatch({
      actionType: FollowConstants.FOLLOWS_RECEIVED,
      follows: follows
    });
  },
};

module.exports = ApiActions;

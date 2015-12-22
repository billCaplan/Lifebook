var AppDispatcher = require('../dispatcher/Dispatcher');
var PostConstants = require('../constants/post_constants');
var UserConstants = require('../constants/user_constants');
var FollowConstants = require('../constants/follow_constants');
var ImageCommentConstants = require('../constants/image_comment_constants');

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
  receiveNewFollow: function(newFollow){
    AppDispatcher.dispatch({
      actionType: UserConstants.FOLLOW_RECEIVED,
      newFollow: newFollow
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
  removedFollow: function(follows){
    AppDispatcher.dispatch({
      actionType: FollowConstants.FOLLOW_REMOVED,
      follows: follows
    });
  },
  receiveAllFollows: function(follows){
    AppDispatcher.dispatch({
      actionType: FollowConstants.FOLLOWS_RECEIVED,
      follows: follows
    });
  },
  receiveAllImageComments: function(comments){
    AppDispatcher.dispatch({
      actionType: ImageCommentConstants.IMAGE_COMMENTS_RECEIVED,
      image_comments: comments
    });
  },
  receiveNewImageComment: function(newImageComment){
    AppDispatcher.dispatch({
      actionType: ImageCommentConstants.NEW_IMAGE_COMMENT_RECEIVED,
      newImageComment: newImageComment
    });
  }
};

module.exports = ApiActions;

var Store = require('flux/utils').Store;
var CommentConstants = require('../constants/comment_constants');
var AppDispatcher = require('../dispatcher/Dispatcher');

var CommentStore = new Store(AppDispatcher);

var _comments = [];

var resetComments = function(comments){
  _comments = comments.slice(0);
};

var addNewComment = function(newComment){
  _comments.push(newComment);
};

CommentStore.all = function () {
  return _comments.slice(0);
};

CommentStore.getByPostId = function(postIdString) {
  var postId = parseInt(postIdString);
  var comments = CommentStore.all();
  var relevantComments = [];

  comments.forEach(function(comment){

    if (comment.post_id === postId){
      relevantComments.push(comment);
    }
  });

  return relevantComments;
};

CommentStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case CommentConstants.COMMENTS_RECEIVED:
      var result = resetComments(payload.comments);
      CommentStore.__emitChange();
      break;
    case CommentConstants.NEW_COMMENT_RECEIVED:
      var result = addNewComment(payload.newComment);
      CommentStore.__emitChange();
      break;
  }
};

module.exports = CommentStore;

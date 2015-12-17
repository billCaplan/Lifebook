var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  fetchPosts: function(){
    $.get('/api/posts', function(posts){
      ApiActions.receiveAll(posts);
    });
  },
  createPost: function(data){
    $.post('api/posts', { post: data }, function(post) {
      ApiActions.receiveNewPost(post);
    });
  },
  getCurrentUser: function(){
    $.get('/current', function(currentUser){
      ApiActions.recieveCurrentUser(currentUser);
  });
},
  fetchUsers: function(){
    $.get('/api/users', function(users){
      ApiActions.receiveAllUsers(users);
    });
  },
  fetchComments: function(){
    $.get('/api/comments', function(comments){
      ApiActions.receiveAllComments(comments);
    });
  },
  createComment: function(data){
    $.post('api/comments', { comment: data }, function(comment) {
      ApiActions.receiveNewComment(comment);
    });
  }
};

module.exports = ApiUtil;

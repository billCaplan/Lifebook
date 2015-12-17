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
};

module.exports = ApiUtil;

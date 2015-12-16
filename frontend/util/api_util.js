var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  fetchPosts: function(){
    $.get('/api/posts', function(posts){
      ApiActions.receiveAll(posts);
    });
  },
  createPost: function(data){
  
    $.post('api/posts', { post: data }, function(post) {
      ApiActions.receiveAll([post]);
    });
  },
  getCurrentUser: function(){
    //  Ajax request to fetch the current user so i need to write a custom route in the user controller

    $.get('/current', function(currentUser){
      ApiActions.recieveCurrentUser(currentUser);
  });
}
};

module.exports = ApiUtil;

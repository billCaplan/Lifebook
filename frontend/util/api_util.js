var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  fetchPosts: function(){
    $.get('/api/posts', function(posts){
      ApiActions.receiveAll(posts);
    });
  },
  createPost: function(data){
    $.post('api/posts', { bench: data }, function(post) {
      ApiActions.receiveAll([post]);
    });
  }
};

module.exports = ApiUtil;

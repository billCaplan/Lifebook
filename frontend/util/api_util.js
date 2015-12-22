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
  },
  createFollow: function(data){
    $.post('api/follows', { follow: data }, function(follow) {
      ApiActions.receiveNewFollow(follow);
    });
  },
  fetchImages: function(){
    $.get("/api/images", function (images) {
      ApiActions.receiveAllImages(images);
    });
  },
  createImage: function(data){
    $.post('api/images', { image: {image_path: data.public_id} }, function(image) {
      ApiActions.receiveNewImage(image);
    });
  },
  fetchFollows: function(){
    $.get('/api/follows', function(follows){
      ApiActions.receiveAllFollows(follows);
    });
  },
  deleteFollow: function(data){

    $.ajax({
       method: 'DELETE',
       url: '/api/follows/' + data.id,
       data: data,
       success: function(resp) {

        console.log("Success");
      },
       error: function (xhr, ajaxOptions, thrownError) {
          console.log("Fail");
        }
     });
  },
  fetchImageComments: function(){
    $.get('/api/image_comments', function(imageComments){
      ApiActions.receiveAllImageComments(imageComments);
    });
  },
  createImageComment: function(data){
    $.post('api/image_comments', { image_comment: data }, function(imageComment) {
      ApiActions.receiveNewImageComment(imageComment);
    });
  },
};

module.exports = ApiUtil;

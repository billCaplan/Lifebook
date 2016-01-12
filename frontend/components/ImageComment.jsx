var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');
var ImageCommentLikeButton = require('../components/ImageCommentLikeButton');
var ImageCommentStore = require('../stores/image_comment');
var LikeStore = require('../stores/like');

var ApiUtil = require('../util/api_util');
var History = require('react-router').History;

var ImageComment = React.createClass({
    mixins: [History],

    _commentsChanged: function(){
      this.setState({comments: ImageCommentStore.getByPostId(this.props.image.id)});
    },

    getInitialState: function(){
      return {
        comments: ImageCommentStore.getByPostId(this.props.image.id),
      };
    },

    componentDidMount: function(){
      this.commentListener = ImageCommentStore.addListener(this._commentsChanged);
      ApiUtil.fetchComments();
    },

    componentWillUnmount: function(){
      this.commentListener.remove();
    },
    handleAuthorClick: function(authorId){
      this.history.pushState(null, "user/" + authorId);
      window.scrollTo(0, 0);
    },
    likeButtonLogic: function(comment){
      var likes = LikeStore.all();
      var current_comment = comment;
      var current_user = UserStore.getCurrentUser();

      if (!current_comment.id){
        return false;
      }
      var liking = false;
      var that = this;

      likes.forEach(function(like){
        if (like.post_id === current_comment.id &&
            like.author_id === current_user.id &&
            like.like_type === "image-comment"){
          liking = like;
        }
      });

      return liking;
    },
    _buttonRenderFunction: function(comment){
      var placeholder = this.likeButtonLogic(comment);
      var likeButton;
      var currentUser = UserStore.getCurrentUser();

      if (placeholder) {
        likeButton = <div className="like-button">
                          <ImageCommentLikeButton currentUser={currentUser}
                          comment={comment}
                          like={placeholder}/>
                      </div>;
      } else {
        likeButton =  <div className="like-button">
                          <ImageCommentLikeButton currentUser={currentUser}
                          comment={comment}
                          like={placeholder}/>
                      </div>;
      }

      return likeButton;
    },
    _buildUrl: function(image_path){
      var publicID;
      if (!image_path){
        publicID = "lifebook_default_pic.jpg";
      } else {
        publicID = image_path;
      }
      var url = "http://res.cloudinary.com/lifebook/image/upload/c_scale,h_50,w_50/v1450463928/" + publicID;
      return url;
    },
    profilePicFunction: function(comment){
      var profilePicFunction;
      var that = this;
      if (comment){
        profilePicFunction = <img className="post-profile-pic-actual-pic" src={that._buildUrl(comment.author.profile_image)}></img>;
      } else {
        profilePicFunction = <img className="post-profile-pic-actual-pic" src={that._buildUrl(false)}></img>;
      }
      return profilePicFunction;
    },


    render: function(){
      var that=this;
      var Comments = this.state.comments.map(function (comment, i) {
        return(
          <div key={comment.id} className="post-comment">
            {that.profilePicFunction(comment)}
            <div  className="post-user-name"
                  onClick={that.handleAuthorClick.bind(null, comment.author.id)}>
                  {comment.author.real_name}
            </div>
            <div className="comment-only-the-body">{comment.body}</div>
            {that._buttonRenderFunction(comment)}
          </div>

        );
      });
    return(
      <div className="image-post-comments">
        {Comments}
      </div>
    );
  }
});

module.exports = ImageComment;

var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');
var CommentStore = require('../stores/comment');
var CommentLikeButton = require('../components/CommentLikeButton');
var LikeStore = require('../stores/like');

var ApiUtil = require('../util/api_util');
var History = require('react-router').History;

var Comment = React.createClass({
    mixins: [History],

    _commentsChanged: function(){
      this.setState({comments: CommentStore.getByPostId(this.props.postId)});
    },

    getInitialState: function(){
      return {
        comments: CommentStore.getByPostId(this.props.postId),
      };
    },

    componentDidMount: function(){
      this.commentListener = CommentStore.addListener(this._commentsChanged);
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
      debugger
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
            like.like_type === "comment"){
          liking = true;
        }
      });

      return liking;
    },
    _buttonRenderFunction: function(comment){
      // console.log(comment);
      // var targetComment = comment;
      var placeholder = this.likeButtonLogic(comment);
      var likeButton;
      var currentUser = UserStore.getCurrentUser();

      if (placeholder === true) {
        likeButton = <div className="like-button">
                          <CommentLikeButton currentUser={currentUser}
                          comment={comment}
                          like={true}/>
                      </div>;
      } else {
        likeButton =  <div className="like-button">
                          <CommentLikeButton currentUser={currentUser}
                          comment={comment}
                          like={false}/>
                      </div>;
      }
      debugger
      return likeButton;
    },

    render: function(){
      var that=this;



      var Comments = this.state.comments.map(function (comment, i) {
        return(
          <div key={comment.id} className="post-comment">
            <div  onClick={that.handleAuthorClick.bind(null, comment.author.id)}>
                  {comment.author.real_name}
            </div>

            <div>{comment.body}</div>
            {that._buttonRenderFunction(comment)}
          </div>

        );
      });
    return(
      <div>
        {Comments}
      </div>
    );
  }
});

// render the top level comment, then render its kids


module.exports = Comment;

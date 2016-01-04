var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var moment = require('moment');
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
                          <CommentLikeButton currentUser={currentUser}
                          comment={comment}
                          like={placeholder}/>
                      </div>;
      } else {
        likeButton =  <div className="like-button">
                          <CommentLikeButton currentUser={currentUser}
                          comment={comment}
                          like={placeholder}/>
                      </div>;
      }

      return likeButton;
    },
    getTimeFrame: function(comment){
      var time;
      if (comment.created_at.created_at){
        time = comment.created_at.created_at;
      } else {
        time = comment.created_at;
      }
      var finalTime = moment(time*1000).fromNow();
      var that = this;
      debugger
      return <div time={time}
                  onMouseOver={this.mouseOverTime.bind(null, time, comment)}
                  onMouseOut={this.mouseLeaveTime.bind(null, time, comment)}
                  className={comment.id}
                  text="WOrds">{finalTime}</div>;
    },
    mouseOverTime: function(time, comment){
      var date = moment(time*1000).format('MMMM Do YYYY, h:mm:ss a');
      $(('.' + comment.id)).each(function() {
      $(this).text(date);
    });

      // event.value===time;
    },
    mouseLeaveTime: function(time, comment){
      $(('.' + comment.id)).each(function() {
        $(this).text(moment(time*1000).fromNow());
    });
      // value===finalTime
    },

    render: function(){
      var that=this;
      // var timeline;
      //
      // if (this.state.comment){
      //   timeline = this.getTimeFrame();
      // } else {
      //   timeline = <div>Loading</div>;
      // }




      var Comments = this.state.comments.map(function (comment, i) {
        return(
          <div key={comment.id} className="post-comment">
            <div  className="comment-user-name"
                  onClick={that.handleAuthorClick.bind(null, comment.author.id)}>
                  {comment.author.real_name}
            </div>
            {that.getTimeFrame(comment)}
            <div className="comment-only-the-body">{comment.body}</div>
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


module.exports = Comment;

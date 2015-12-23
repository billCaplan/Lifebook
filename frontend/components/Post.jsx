// Note: this is the page for posts that appear in the FEED

var React = require('react');
var PostStore = require('../stores/post');

var ApiUtil = require('../util/api_util');
var History = require('react-router').History;
var NewComment = require('../components/NewComment');
var Comment = require('../components/Comment');
var UserStore = require('../stores/user');
var LikeStore = require('../stores/like');
var PostLikeButton = require('../components/PostLikeButton');

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Post = React.createClass({
  mixins: [History],
  contextTypes: {
    router: React.PropTypes.func
  },
  componentDidMount: function(){
    ApiUtil.fetchLikes();
    this.likeListener = LikeStore.addListener(this._likesChanged);
  },
  componentWillUnmount: function(){
    this.likeListener.remove();
  },
  _likesChanged: function(){
    this.forceUpdate();
  },
  handleAuthorClick: function(destinationId){
    this.history.pushState(null, "user/" + this.props.post.author.id);
    window.scrollTo(0, 0);
  },
  handleSubjectClick: function(destinationId){
    this.history.pushState(null, "user/" + this.props.post.subject.id);
    window.scrollTo(0, 0);
  },
  handlePostClick: function (post) {
    this.history.pushState(null, "posts/" + this.props.post.id);
    window.scrollTo(0, 0);
  },
  likeButtonLogic: function(){
    var likes = LikeStore.all();
    var current_post = this.props.post;
    var current_user = UserStore.getCurrentUser();

    if (!this.props.post.id){
      return false;
    }
    var liking = false;
    var that = this;

    likes.forEach(function(like){
      if (like.post_id === that.props.post.id &&
          like.author_id === current_user.id &&
          like.like_type === "post"){
        liking = true;
      }
    });

    return liking;
  },

  render: function(){
    var currentUser = UserStore.getCurrentUser();
    var subjectName = this.props.post.subject.real_name;
    var authorName = this.props.post.author.real_name;
    var nameLine = {};
    if (subjectName === authorName){
      nameLine = <div className="post-user-name" onClick={this.handleAuthorClick}>{authorName}</div>;
    } else {
      nameLine = <p>
                    <span className="post-user-name" onClick={this.handleAuthorClick}>{authorName}</span>
                     --->>>
                    <span className="post-user-name" onClick={this.handleSubjectClick}>{subjectName}</span>
                </p>;
    }

    var placeholder = this.likeButtonLogic();
    var followButton;

    if (placeholder === true) {
      likeButton = <div className="like-button">
                        <PostLikeButton currentUser={currentUser}
                        post={this.props.post}
                        like={true}/>
                    </div>;
    } else {
      likeButton =  <div className="like-button">
                        <PostLikeButton currentUser={currentUser}
                        post={this.props.post}
                        like={false}/>
                    </div>;
    }
    return(
    <ReactCSSTransitionGroup transitionName="example"
                              transitionAppear={true}
                              transitionAppearTimeout={500}
                              transitionEnterTimeout={500}
                              transitionLeaveTimeout={500}>
      <div className="whole-post">
        <div className="feed-post-body">
         {nameLine}
         <p>{this.props.post.body}</p>
       </div>
        {likeButton}
       <div>
          <Comment postId={this.props.post.id}/>
      </div>
      <div className="feed-post-new-comment">
          <NewComment parentCommentId={this.props.post.id}/>
      </div>
      <div className="post-seperator-black"></div>
      </div>
    </ReactCSSTransitionGroup>
    );
  }
});

module.exports = Post;

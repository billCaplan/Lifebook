// Note: this is the page for posts that appear in the FEED

var React = require('react');
var PostStore = require('../stores/post');
var moment = require('moment');
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
        liking = like;
      }
    });

    return liking;
  },
getTimeFrame: function(){
  var time;
  if (this.props.post.created_at.created_at){
    time = this.props.post.created_at.created_at;
  } else {
    time = this.props.post.created_at;
  }
  var finalTime = moment(time*1000).fromNow();
  var that = this;

  return <div time={time}
              onMouseOver={this.mouseOverTime.bind(null, time)}
              onMouseOut={this.mouseLeaveTime.bind(null, time)}
              id={that.props.post.id}
              className="dateline"
              text="WOrds">{finalTime}</div>;
},
mouseOverTime: function(time){
  var date = moment(time*1000).format('MMMM Do YYYY, h:mm:ss a');
  $(('#' + this.props.post.id)).each(function() {
  $(this).text(date);
});

  // event.value===time;
},
mouseLeaveTime: function(time){
  $(('#' + this.props.post.id)).each(function() {
    $(this).text(moment(time*1000).fromNow());
});
  // value===finalTime
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

  render: function(){
    var timeline = this.getTimeFrame();

    var currentUser = UserStore.getCurrentUser();
    var subjectName = this.props.post.subject.real_name;
    var authorName = this.props.post.author.real_name;
    var profile_image = this.props.post.author.profile_image;
    var nameLine = {};
    if (subjectName === authorName){
      nameLine = <div className="post-user-name" onClick={this.handleAuthorClick}>{authorName}</div>;
    } else {
      nameLine = <div className="post-user-name">
                    <span  onClick={this.handleAuthorClick}>{authorName}</span>
                      <i className="fa fa-arrow-right"></i>
                    <span  onClick={this.handleSubjectClick}>{subjectName}</span>
                </div>;
    }


    // is like true or false
    var placeholder = this.likeButtonLogic();
    var followButton;

    if (placeholder) {
      likeButton = <div className="like-button">
                        <PostLikeButton currentUser={currentUser}
                        post={this.props.post}
                        like={placeholder}/>
                    </div>;
    } else {
      likeButton =  <div className="like-button">
                        <PostLikeButton currentUser={currentUser}
                        post={this.props.post}
                        like={placeholder}/>
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
          <div className="post-info-line">
            <img className="post-profile-pic-actual-pic" src={this._buildUrl(profile_image)}></img>
            <div className="post-name-and-date">
              {nameLine}
              {timeline}
            </div>
          </div>
         <div className="post-only-the-body">{this.props.post.body}</div>
         {likeButton}
       </div>
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

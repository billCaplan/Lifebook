var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');

var ApiUtil = require('../util/api_util');
var UserProfileUserInfo = require('../components/UserProfileUserInfo');
var NewPost = require('../components/NewPost');
var UserStore = require('../stores/user');
var UploadButton = require("../components/UploadButton");
var FriendsPane = require('../components/FriendsPane');
var FollowButton = require('../components/FollowButton');
var UnfollowButton = require('../components/UnfollowButton');
var Images = require('../components/Images');
var ImagesBody = require('../components/ImagesBody');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var FollowStore = require('../stores/follow');

function _getRelevantPosts(userId) {
  return PostStore.getByUserId(userId);
}

function _getApplicableUser(currentProfileUserId){
  var user = UserStore.findUser(currentProfileUserId);
  return user;
}

var UserProfile = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function(){
    var user_id = this.props.routeParams.userId;
    return {
      user_id: user_id,
      posts: _getRelevantPosts(user_id),
      user: {},
      showing: "posts",
      nothing: {}
    };
  },
  componentDidMount: function(){


      ApiUtil.fetchPosts();
      ApiUtil.fetchUsers();
      ApiUtil.fetchImages();
      ApiUtil.fetchFollows();
      ApiUtil.fetchImageComments();

    this.postListener = PostStore.addListener(this._postsChanged);
    this.userListener = UserStore.addListener(this._usersChanged);
    this.followListener = FollowStore.addListener(this._followsChanged);
  },
  componentWillUnmount: function(){
    this.postListener.remove();
    this.userListener.remove();
    this.followListener.remove();
  },

  componentWillReceiveProps: function (newProps) {
    var userId = this.props.routeParams.userId;
    this.setState({user_id: userId, user: UserStore.findUser(userId)});
    ApiUtil.fetchPosts();
  },

  _postsChanged: function(){
    this.setState({posts: _getRelevantPosts(this.state.user_id)});
    window.scrollTo(0, 0);
  },

  _usersChanged: function(){
    this.setState({user: _getApplicableUser(this.state.user_id)});
    window.scrollTo(0, 0);
  },
  _followsChanged: function(){
    this.setState({nothing: {}});
  },
  _renderPicturePage: function(){
    return <div className="user-profile-picture-content">
              <button onClick={this._setPostsPage} className="return-to-profile button">Return to Profile</button>
              <ImagesBody user={this.state.user.id} />
          </div>;
  },
  _renderPostsPage: function(){
    var Posts = this.state.posts.map(function (post) {
      return <Post key={post.id} post={post}/>;
    });

    return Posts;
  },
  _setPicturePage: function(){
    this.setState({showing: "pictures"});
  },
  _setPostsPage: function(){
    this.setState({showing: "posts"});
  },
  followButtonLogic: function(){
    var follows = FollowStore.all();
    var profile_user = this.state.user;
    var current_user = UserStore.getCurrentUser();


    if (!this.state.user.id){
      return false;
    }
    var following = false;
    var that = this;

    follows.forEach(function(follow){
      if (follow.followed_user_id === that.state.user.id && follow.author_id === current_user.id){
        following = true;
      }
    });

    return following;
  },


  render: function(){

    var placeholder = this.followButtonLogic();
    var followButton;
    var uploadButton;
    var currentUser = UserStore.getCurrentUser();

    if (placeholder === true && parseInt(this.state.user_id) !== currentUser.id) {
      followButton = <UnfollowButton user={this.state.user} />;
      uploadButton = <div className="empty-follow-button"></div>;
    } else if (placeholder === false && parseInt(this.state.user_id) !== currentUser.id) {
      followButton = <FollowButton user={this.state.user} />;
      uploadButton = <div className="empty-follow-button"></div>;
    } else {
      followButton = <div className="empty-follow-button"></div>;
      uploadButton = <UploadButton />;
    }

    if (this.state.showing === "posts"){
      var content = this._renderPostsPage();
    } else if (this.state.showing === "pictures"){
      var content = this._renderPicturePage();
    }

    return(
    <ReactCSSTransitionGroup transitionName="example"
                              transitionAppear={true}
                              transitionAppearTimeout={500}
                              transitionEnterTimeout={500}
                              transitionLeaveTimeout={500}>
      <div className="user-profile">
        <div className="user-profile-info">
          <div>
            <UserProfileUserInfo userId={this.state.user_id}  user={this.state.user} />
          </div>
          <div>
            <FriendsPane user={this.state.user}/>
          </div>
          <div>
            {followButton}
          </div>
          <div>
            <Images user={this.state.user.id}/>
            <button className="button change-to-pic" onClick={this._setPicturePage}>View All Pictures</button>
            {uploadButton}
          </div>
        </div>
        <div className="user-profile-new-post">
          <NewPost targetUserId={this.state.user.id}/>
        </div>
        <div className="user-profile-content">
          {content}
        </div>
      </div>
    </ReactCSSTransitionGroup>
    );
  }
});

module.exports = UserProfile;

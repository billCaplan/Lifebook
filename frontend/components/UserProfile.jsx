var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');

var ApiUtil = require('../util/api_util');
var UserProfileUserInfo = require('../components/UserProfileUserInfo');
var NewPost = require('../components/NewPost');
var UserStore = require('../stores/user');
var FriendsPane = require('../components/FriendsPane');
var FollowButton = require('../components/FollowButton');
var Images = require('../components/Images');
var ImagesBody = require('../components/ImagesBody');


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
    };
  },
  componentDidMount: function(){
    //ApiUtil to fetch users

      ApiUtil.fetchPosts();
      ApiUtil.fetchUsers();
      ApiUtil.fetchImages();
    //Add listener to update state
    this.postListener = PostStore.addListener(this._postsChanged);
    this.userListener = UserStore.addListener(this._usersChanged);

  },
  componentWillUnmount: function(){
    this.postListener.remove();
    this.userListener.remove();
  },
  //Fixes navigating to new user id
  componentWillReceiveProps: function (newProps) {
    var userId = this.props.routeParams.userId;
    this.setState({user_id: userId, user: UserStore.findUser(userId)});
    ApiUtil.fetchPosts();
  },

  _postsChanged: function(){
    this.setState({posts: _getRelevantPosts(this.state.user_id)});
  },

  _usersChanged: function(){
    this.setState({user: _getApplicableUser(this.state.user_id)});
  },
  _renderPicturePage: function(){
    return <div>
              <button onClick={this._setPostsPage}>Return to Profile</button>
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


  render: function(){
    // All posts here will have a target_id === profile.user_id, or user_id = profile.user_id

    if (this.state.showing === "posts"){
      var content = this._renderPostsPage();
    } else if (this.state.showing === "pictures"){
      var content = this._renderPicturePage();
    }

    return(
      <div className="user-profile">
        <div className="user-profile-info">
          <div>
            <UserProfileUserInfo userId={this.state.user_id}  user={this.state.user} />
          </div>
          <div>
            <FriendsPane user={this.state.user}/>
          </div>
          <div>
            <FollowButton user={this.state.user} />
          </div>
          <div>
            <Images user={this.state.user.id}/>
            <button onClick={this._setPicturePage}>View All Picture</button>
          </div>
        </div>
        <div className="user-profile-new-post">
          <NewPost targetUserId={this.state.user.id}/>
        </div>
        <div className="user-profile-content">
          {content}
        </div>
      </div>
    );
  }
});

module.exports = UserProfile;

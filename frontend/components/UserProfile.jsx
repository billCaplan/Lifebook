var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');

var ApiUtil = require('../util/api_util');
var UserProfileUserInfo = require('../components/UserProfileUserInfo');
var NewPost = require('../components/NewPost');
var UserStore = require('../stores/user');


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
      user: {}
    };
  },
  componentDidMount: function(){
    //ApiUtil to fetch users
      ApiUtil.fetchPosts();
      ApiUtil.fetchUsers();
    //Add listener to update state
    this.postListener = PostStore.addListener(this._postsChanged);
    this.userListener = UserStore.addListener(this._usersChanged);

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

  render: function(){
    // All posts here will have a target_id === profile.user_id, or user_id = profile.user_id

    var Posts = this.state.posts.map(function (post) {
      return <Post key={post.id} post={post}/>;
    });


    return(
      <div>
        <div>
          <UserProfileUserInfo userId={this.state.user_id}  user={this.state.user} />
        </div>
        <div>
          <NewPost user={this.state.user}/>
        </div>
        <div>
          {Posts}
        </div>
      </div>
    );
  }
});

module.exports = UserProfile;

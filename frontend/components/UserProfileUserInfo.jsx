var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');

var ApiUtil = require('../util/api_util');

function _getApplicableUser (currentProfileUserId){
  console.log("Should be the Applicable user");
  var user = UserStore.findUser(currentProfileUserId);
  console.log(user);
  return user;
}


var UserProfileUserInfo = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function(){
    return {
      user: _getApplicableUser(this.props.userId),
    };
  },
  componentDidMount: function(){
    ApiUtil.fetchUsers();
    console.log("in component did mount the fetch should have just started");
    this.userListener = PostStore.addListener(this._usersChanged);
  },
  _usersChanged: function(){
    this.setState({user: _getApplicableUser(this.props.userId)});
  },
  // // componentWillUnmount: function(){
  // //   this.setState({
  // //     user_id: {},
  // //     posts: {},
  // //   });
  // // },
  // _postsChanged: function(){
  //
  // },

  render: function(){

    console.log(this.state);

    //Profile pics will render along with the Username, User age, email, and Location, maybe number of posts
    return(
      <div>
        <h2>User Profile User Info</h2>
        <div className="profile-pic"><img src="http://placehold.it/150x150"></img></div>
        <div>{this.state.user.real_name}</div>
        <div>{this.state.user.age}</div>
        <div>{this.state.user.location}</div>
        <div>{this.state.user.email}</div>
      </div>
    );
  }
});

module.exports = UserProfileUserInfo;

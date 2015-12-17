var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');

var ApiUtil = require('../util/api_util');




var UserProfileUserInfo = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function(){
    return {
      user: this.props.user,
    };
  },
  componentDidMount: function(){
    ApiUtil.fetchUsers();
    this.userListener = UserStore.addListener(this._usersChanged);
  },
  _usersChanged: function(){
    this.setState({user: this.props.user});
  },
  componentWillUnmount: function(){
    this.setState({user: null});
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({user: newProps.user});
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
    //Profile pics will render along with the Username, User age, email, and Location, maybe number of posts
    return(
      <div>
        <div>
          <h2>User Profile User Info</h2>
          <div className="profile-pic"><img src="http://placehold.it/150x150"></img></div>
          <div>{this.props.user.real_name}</div>
          <div>{this.props.user.age}</div>
          <div>{this.props.user.location}</div>
          <div>{this.props.user.email}</div>
        </div>
      </div>
    );
  }
});

module.exports = UserProfileUserInfo;

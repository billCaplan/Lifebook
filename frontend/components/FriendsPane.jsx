var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');

var ApiUtil = require('../util/api_util');

var FriendsPane = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function(){
    return {user: {}};
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({user: newProps.user});
  },

  render: function(){
    if (!this.state.user.usersFollowing){
      var users = <div></div>;
    } else {
    var users = this.state.user.usersFollowing.map(function (user) {
      return <div key={user.id}>{user.real_name}</div>;
      });
    }

    return(
      <div className="profile-friends-pane">
        <h2>Following</h2>
        {users}
      </div>
    );
  }
});

module.exports = FriendsPane;

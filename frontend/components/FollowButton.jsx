var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');

var ApiUtil = require('../util/api_util');

var FollowButton = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function(){
    return {user: {}};
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({user: newProps.user});
  },

  handleSubmit: function(event){
    event.preventDefault();

    var follow = {followed_user_id: this.state.user.id};
    ApiUtil.createFollow(follow);
  },

  unfollowButton: function(){

  },

  followButton: function(){

  },

  render: function(){
    return (
      <div>
        <button onClick={this.handleSubmit}>Follow</button>
      </div>
    );
  }
});

module.exports = FollowButton;

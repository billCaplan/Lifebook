var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');
var FollowStore = require('../stores/follow');

var ApiUtil = require('../util/api_util');

var FollowButton = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function(){
    ApiUtil.fetchFollows();
    return {user: {}, isFollowing:{}, newProps:{}};
  },
  componentDidMount: function(){
    this.followListener = FollowStore.addListener(this._followsChanged);
  },
  _followsChanged: function(){
    this.setState({
      user: UserStore.findUser(this.state.user.id),
      isFollowing: this.decideIfFollowOrUnfollow({user: UserStore.findUser(this.state.user.id)})
    });
  },
  componentWillUnmount: function(){
    this.followListener.remove();
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({user: newProps.user,
                  isFollowing: this.decideIfFollowOrUnfollow(newProps)

                    });
  },
  // old handleSubmit
  // handleSubmit: function(event){
  //   event.preventDefault();
  //
  //   var follow = {followed_user_id: this.state.user.id};
  //   ApiUtil.createFollow(follow);
  // },
  decideIfFollowOrUnfollow: function(newProps){

    if (!newProps.user.id){
      return false;
    }
    var profile_user = newProps.user;
    var current_user = UserStore.getCurrentUser();

    var followingList = current_user.usersFollowing;
    var following;
    var that = this;

    followingList.forEach(function(user){
      if (user.id === that.state.user.id){
        following = true;
      }
    });
    return following;

  },
  handleFollowSubmit: function(event){
    event.preventDefault();

    var follow = {followed_user_id: this.state.user.id};
    ApiUtil.createFollow(follow);
  },
  handleUnfollowSubmit: function(event){
    event.preventDefault();
    var current_user = UserStore.getCurrentUser();

    var followParams = {followed_user_id: this.state.user.id, author_id: current_user.id };

    var follow = FollowStore.getByFollowParties(followParams);

    ApiUtil.deleteFollow(follow);

    // going to need to find the follow by the combo, then pass that id to destroy
    // ApiUtil.deleteFollow(follow);
  },

  render: function(){
    var properButton;

    if (this.state.isFollowing){
      properButton = <button onClick={this.handleUnfollowSubmit}>Unfollow</button>;
    } else {
      properButton = <button onClick={this.handleFollowSubmit}>Follow</button>;
    }
    return (
      <div>
        {properButton}
      </div>
    );
  }
});

module.exports = FollowButton;

var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');
var FollowStore = require('../stores/follow');

var ApiUtil = require('../util/api_util');

var UnfollowButton = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  handleUnfollowSubmit: function(event){
    event.preventDefault();
    var current_user = UserStore.getCurrentUser();

    var followParams = {followed_user_id: this.props.user.id, author_id: current_user.id };

    var follow = FollowStore.getByFollowParties(followParams);

    ApiUtil.deleteFollow(follow);
  },

  render: function(){
    var properButton;

      properButton = <button className="button" onClick={this.handleUnfollowSubmit}>Unfollow</button>;

    return (
      <div>
        {properButton}
      </div>
    );
  }
});

module.exports = UnfollowButton;

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

  handleFollowSubmit: function(event){
    event.preventDefault();
    var follow = {followed_user_id: this.props.user.id};
    ApiUtil.createFollow(follow);
  },


  render: function(){
    var properButton;

    properButton = <button  className="button" onClick={this.handleFollowSubmit}>Follow</button>;

    return (
      <div>
        {properButton}
      </div>
    );
  }
});

module.exports = FollowButton;

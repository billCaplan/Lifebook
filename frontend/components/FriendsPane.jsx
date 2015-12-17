var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');

var ApiUtil = require('../util/api_util');

var FriendsPane = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  componentWillMount: function(){
    this.setState({user: this.props.user});
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({user: newProps.user});
  },
  render: function(){
    var User = this.state.user.real_name;
    return(
      <div className="profile-friends-pane">
        {User}
      </div>
    );
  }
});

module.exports = FriendsPane;

var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');

var ApiUtil = require('../util/api_util');

var HeaderBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function(){
    return {user: {}};
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({user: newProps.currentUser});
  },

  render: function(){
    if (this.state.user.real_name){
      var name = this.state.user.real_name;
    } else {
      var name = "Loading"
    }

    return(
      <div className="header-bar">
        <div className="header-bar-real-name">{name}</div>
      </div>
    );
  }
});

module.exports = HeaderBar;

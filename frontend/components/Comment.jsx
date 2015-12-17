var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');

var ApiUtil = require('../util/api_util');

var Comment = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function(){
    return(
      <div>
        Words here
      </div>
    );
  }
});

module.exports = Comment;

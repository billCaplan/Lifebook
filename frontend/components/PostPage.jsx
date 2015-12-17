// This page is intended to be the page you go to when you are looking at that exact
// single post.  May not make in into final production

var React = require('react');
var PostStore = require('../stores/post');

var ApiUtil = require('../util/api_util');


var PostPage = React.createClass({
  render: function(){
    return(
      <div>
        <div>
          This is where the posts will go
        </div>
      </div>
    );
  }
});

module.exports = PostPage;

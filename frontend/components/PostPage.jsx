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

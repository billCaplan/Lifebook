// Note: this is the page for posts that appear in the FEED

var React = require('react');
var PostStore = require('../stores/post');

var ApiUtil = require('../util/api_util');

var Post = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  // getInitialState: function(){
  //   debugger
  // },
  componentDidMount: function(){
    this.postListener = PostStore.addListener(this._postsChanged);
    ApiUtil.fetchPosts();
  },
  componentWillUnmount: function(){
    this.postListener.remove();
  },
  handleProfileClick: function(coords){
    this.props.history.pushState(null, "users/" + author.id);
  },
  handlePostClick: function (post) {
    this.props.history.pushState(null, "posts/" + post.id);
  },
  render: function(){
    debugger
    return(
      <div>
        <div className="feed-post">
         <p>Name: {this.props.post.author.real_name}</p>
         <p>{this.props.post.body}</p>
       </div>
      </div>
    );
  }
});

module.exports = Post

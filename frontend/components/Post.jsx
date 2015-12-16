// Note: this is the page for posts that appear in the FEED

var React = require('react');
var PostStore = require('../stores/post');

var ApiUtil = require('../util/api_util');
var History = require('react-router').History;

var Post = React.createClass({
  mixins: [History],
  contextTypes: {
    router: React.PropTypes.func
  },
  // getInitialState: function(){
  //   debugger
  // },
  // componentDidMount: function(){
  //   this.postListener = PostStore.addListener(this._postsChanged);
  //   ApiUtil.fetchPosts();
  // },
  // _postsChanged: function(){
  //
  // },
  // componentWillUnmount: function(){
  //   this.postListener.remove();
  // },
  handleProfileClick: function(coords){
    this.history.pushState(null, "user/" + this.props.post.author.id);
  },
  handlePostClick: function (post) {
    this.props.history.pushState(null, "posts/" + this.props.post.id);
  },
  render: function(){
    return(
      <div>
        <div className="feed-post">
         <p onClick={this.handleProfileClick}>Name: {this.props.post.author.real_name}</p>
         <p>{this.props.post.body}</p>
       </div>
      </div>
    );
  }
});

module.exports = Post

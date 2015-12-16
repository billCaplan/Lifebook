var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');

var ApiUtil = require('../util/api_util');


function _getAllPosts() {
  return PostStore.all();
}

var Feed = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  
  _postsChanged: function(){
    this.setState({posts: _getAllPosts()});
  },

  getInitialState: function(){
    return {
      posts: _getAllPosts(),
    };
  },

  componentDidMount: function(){
    this.postListener = PostStore.addListener(this._postsChanged);
    ApiUtil.fetchPosts();
  },

  componentWillUnmount: function(){
    this.postListener.remove();
  },

  render: function(){
    // Here I will attempt to filter the posts to only the ones that are being followed


    var unorderedPosts = this.state.posts.reverse();
    var Posts = unorderedPosts.map(function (post) {
      return <Post key={post.id} post={post} />;
    });

    return(
      <div>
      <ul>
        {Posts}
      </ul>
      </div>
    );
  }
});

module.exports = Feed

var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');

var ApiUtil = require('../util/api_util');
var NewPost = require('../components/NewPost');


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
    // need to filter the posts to only the ones that are being followed

    //  json does not have id
    var unorderedPosts = this.state.posts.reverse();
    var Posts = unorderedPosts.map(function (post, i) {
      return <Post key={i} post={post} />;
    });

    return(
      <div>
        <div>
          <NewPost />
        </div>
        <br></br>
          <ul>
            {Posts}
          </ul>
      </div>
    );
  }
});

module.exports = Feed

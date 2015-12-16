var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');

var ApiUtil = require('../util/api_util');


function _getRelevantPosts(userId) {
  return PostStore.getByUserId(userId);
}

var UserProfile = React.createClass({


  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function(){
    var user_id = this.props.routeParams["userId"];
    return {
      user_id: user_id,
      posts: _getRelevantPosts(user_id),
    };
  },
  // componentDidMount: function(){
  //   this.postListener = PostStore.addListener(this._postsChanged);
  //   ApiUtil.fetchPosts();
  // },
  // componentWillUnmount: function(){
  //   this.postListener.remove();
  // },
  // handleProfileClick: function(coords){
  //   this.props.history.pushState(null, "users/" + author.id);
  // },
  // handlePostClick: function (post) {
  //   this.props.history.pushState(null, "posts/" + post.id);
  // },

  render: function(){
    // All posts here will have a target_id === profile.user_id, or user_id = profile.user_id
    var unorderedPosts = this.state.posts.reverse();
    var Posts = unorderedPosts.map(function (post) {
      return <Post key={post.id} post={post} />;
    });

    return(
      <div>
        <div>
          {Posts}
        </div>
      </div>
    );
  }
});

module.exports = UserProfile;

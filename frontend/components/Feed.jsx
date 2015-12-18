var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');

var ApiUtil = require('../util/api_util');
var NewPost = require('../components/NewPost');
var UserStore = require('../stores/user');


var Feed = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  _postsChanged: function(){
    debugger
    this.setState({posts: PostStore.getUsersFollowedPosts(this.state.currentUser.id)});
  },
  _usersChanged: function(){
    this.setState({currentUser: UserStore.getCurrentUser()});
    this.setState({posts: PostStore.getUsersFollowedPosts(this.state.currentUser.id)});
  },

  getInitialState: function(){
    return {
      posts: PostStore.getUsersFollowedPosts(),
      currentUser: UserStore.getCurrentUser()
    };
  },

  componentDidMount: function(){
    ApiUtil.fetchPosts();
    ApiUtil.fetchUsers();
    this.postListener = PostStore.addListener(this._postsChanged);
    this.userListener = UserStore.addListener(this._usersChanged);
  },

  componentWillUnmount: function(){
    this.postListener.remove();
    this.userListener.remove();
  },

  render: function(){
    // need to filter the posts to only the ones that are being followed
    if (!this.state.posts){
      var posts = <div>Loading</div>
    }
    else {
    var posts = this.state.posts.map(function (post, i) {
      return <Post key={i} post={post} />;
    });
  }


    return(
      <div>
        <div>
          <NewPost/>
        </div>
        <br></br>
          <ul>
            {posts}
          </ul>
      </div>
    );
  }
});

module.exports = Feed;

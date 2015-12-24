var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');

var ApiUtil = require('../util/api_util');
var NewPost = require('../components/NewPost');
var UserStore = require('../stores/user');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Footer = require('../components/Footer');


var Feed = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  _postsChanged: function(){

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
    var posts;

    if (!this.state.posts){
      posts = <div>Loading</div>;
    } else if (this.state.posts.length === 0) {
      posts = <p>Welcome to Lifebook.  Try making a post above, or searching for your friend's using the Search Bar above.</p>;
    }
    else {
      posts = this.state.posts.map(function (post, i) {
      return <Post key={i} post={post} />;
    });
  }


    return(
      <ReactCSSTransitionGroup transitionName="example"
                                transitionAppear={true}
                                transitionAppearTimeout={500}
                                transitionEnterTimeout={500}
                                transitionLeaveTimeout={500}>
        <div className="feed">
          <div className="feed-new-post">
            <NewPost/>
          </div>
          <br></br>
          <ul className="feed-post">
            {posts}
          </ul>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
});

module.exports = Feed;

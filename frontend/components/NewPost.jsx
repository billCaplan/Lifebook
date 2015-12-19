var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');

var ApiUtil = require('../util/api_util');
var UserStore = require('../stores/user');

var History = require('react-router').History;


var NewPost = React.createClass({
  mixins: [History],
  contextTypes: {
    router: React.PropTypes.func
  },

  navigateToFeed: function(){
   this.props.history.pushState(null, "/");
  },
  componentWillMount: function(){
    this.setState({currentUser: UserStore.getCurrentUser()});
  },


  handleSubmit: function(event){
    event.preventDefault();

    var post = {body: event.currentTarget[0].value, target_id: this.props.targetUserId};
    ApiUtil.createPost(post);
  },

  render: function(){

    return(
      <div className="feed-new-post">
        <form onSubmit={this.handleSubmit}>
         <label htmlFor="post_body">What's on your mind?</label>
         <br></br>
         <textarea
           name="post[body]"
           id="post_body" rows="4" cols="50"></textarea>
         <br></br>
         <input type="submit" value="Post"/>
        </form>
      </div>
    );
  }
});

module.exports = NewPost;

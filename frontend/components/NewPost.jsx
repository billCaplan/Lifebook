var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');

var ApiUtil = require('../util/api_util');

var History = require('react-router').History;



var NewPost = React.createClass({
  mixins: [History],
  contextTypes: {
    router: React.PropTypes.func
  },

  navigateToFeed: function(){
   this.props.history.pushState(null, "/");
  },

  handleSubmit: function(event){
    event.preventDefault();

    var post = {body: event.currentTarget[1].value, target_id: event.currentTarget[2].value};
    ApiUtil.createPost(post);
  },

  render: function(){
    var targetId = this.props.user.id;

    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="hidden" name="authenticity_token"
                 value="<%= form_authenticity_token %>"></input>
               <br></br>
         <label for="post_body">What's on your mind?</label>
         <br></br>
         <textarea
           name="post[body]"
           id="post_body" rows="4" cols="50"></textarea>
         <br></br>
         <input type="hidden" name="post[target_id]" id="post_target_id" value={targetId}></input>
         <input type="submit" value="Post"/>
        </form>
      </div>
    );
  }
});

module.exports = NewPost

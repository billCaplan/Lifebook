var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');

var ApiUtil = require('../util/api_util');



var NewPost = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  // navigateToSearch: function(){
  //  this.props.history.pushState(null, "/");
  // },

  handleSubmit: function(event){
  event.preventDefault();

  var post = {body: event.currentTarget[1].value};
  ApiUtil.createPost(post);
  // this.navigateToSearch();
  },

  render: function(){

    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="hidden" name="authenticity_token"
                 value="<%= form_authenticity_token %>"></input>
         <label for="post_body">What's on your mind?</label>
         <textarea
           name="post[body]"
           id="post_body"></textarea>
         <br></br>
         <input type="submit" value="Post"/>
        </form>
      </div>
    );
  }
});

module.exports = NewPost

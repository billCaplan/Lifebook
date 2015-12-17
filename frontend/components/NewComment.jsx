var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');

var ApiUtil = require('../util/api_util');

var NewComment = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  componentWillMount: function(){
    this.setState({currentUser: UserStore.getCurrentUser()});
  },

  render: function(){
    return(
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="hidden" name="authenticity_token"
                   value="<%= form_authenticity_token %>"></input>
                 <br></br>
           <label htmlFor="post_body">Leave a comment</label>
           <br></br>
           <textarea
             name="comment[body]"
             id="comment_body" rows="4" cols="50"></textarea>
           <br></br>
           <input type="submit" value="Post"/>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = NewComment;

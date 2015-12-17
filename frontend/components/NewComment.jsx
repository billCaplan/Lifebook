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
  handleSubmit: function(event){
    event.preventDefault();
    var post = {body: event.currentTarget[1].value, post_id: this.props.parentCommentId};
    ApiUtil.createComment(post);
  },

  render: function(){
    return(
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="hidden" name="authenticity_token"
                   value="<%= form_authenticity_token %>"></input>
                 <br></br>
           <label htmlFor="comment_body">Leave a new comment</label>
           <br></br>
           <textarea
             name="comment[body]"
             id="comment_body" rows="4" cols="50"></textarea>
           <br></br>
           <input type="submit" value="Comment"/>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = NewComment;

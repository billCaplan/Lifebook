

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
    var post = {body: event.currentTarget[0].value, post_id: this.props.parentCommentId};
    ApiUtil.createComment(post);
    event.currentTarget[0].value = null;
  },

  render: function(){
    return(
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
           <label htmlFor="comment_body">Leave a new comment</label>
           <br></br>
           <textarea
             name="comment[body]"
             id="comment_body" rows="2" cols="75"></textarea>
           <br></br>
           <input type="submit" className="button" value="Comment"/>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = NewComment;

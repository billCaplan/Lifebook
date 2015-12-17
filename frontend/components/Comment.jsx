var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');
var CommentStore = require('../stores/comment');

var ApiUtil = require('../util/api_util');

var Comment = React.createClass({

    _commentsChanged: function(){
      this.setState({comments: CommentStore.all()});
    },

    getInitialState: function(){
      return {
        comments: CommentStore.all(),
      };
    },

    componentDidMount: function(){
      this.commentListener = CommentStore.addListener(this._commentsChanged);
      ApiUtil.fetchComments();
    },

    componentWillUnmount: function(){
      this.commentListener.remove();
    },

    render: function(){

      // need to filter the posts to only the ones that are being followed
      var Comments = this.state.comments.map(function (comment, i) {
        return(
          <div key={comment.id}>
            <div>{comment.author.real_name}</div>
            <div>{comment.body}</div>
          </div>
        );
      });
    return(
      <div>
        {Comments}
      </div>
    );
  }
});

// render the top level comment, then render its kids


module.exports = Comment;

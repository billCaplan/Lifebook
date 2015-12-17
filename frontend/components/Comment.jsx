var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');
var CommentStore = require('../stores/comment');

var ApiUtil = require('../util/api_util');
var History = require('react-router').History;

var Comment = React.createClass({
    mixins: [History],

    _commentsChanged: function(){
      this.setState({comments: CommentStore.getByPostId(this.props.postId)});
    },

    getInitialState: function(){
      return {
        comments: CommentStore.getByPostId(this.props.postId),
      };
    },

    componentDidMount: function(){
      this.commentListener = CommentStore.addListener(this._commentsChanged);
      ApiUtil.fetchComments();
    },

    componentWillUnmount: function(){
      this.commentListener.remove();
    },
    handleAuthorClick: function(authorId){
      this.history.pushState(null, "user/" + authorId);
    },

    render: function(){
      var that=this;
      var Comments = this.state.comments.map(function (comment, i) {
        return(
          <div key={comment.id} className="post-comment">
            <div  onClick={that.handleAuthorClick.bind(null, comment.author.id)}>
                  {comment.author.real_name}
            </div>

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

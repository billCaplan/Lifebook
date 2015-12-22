var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');
var ImageCommentStore = require('../stores/image_comment');

var ApiUtil = require('../util/api_util');
var History = require('react-router').History;

var ImageComment = React.createClass({
    mixins: [History],

    _commentsChanged: function(){
      this.setState({comments: ImageCommentStore.getByPostId(this.props.image.id)});
    },

    getInitialState: function(){

      return {
        comments: ImageCommentStore.getByPostId(this.props.image.id),
      };
    },

    componentDidMount: function(){
      this.commentListener = ImageCommentStore.addListener(this._commentsChanged);
      ApiUtil.fetchComments();
    },

    componentWillUnmount: function(){
      this.commentListener.remove();
    },
    handleAuthorClick: function(authorId){
      this.history.pushState(null, "user/" + authorId);
      window.scrollTo(0, 0);
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
      <div className="image-post-comments">
        {Comments}
      </div>
    );
  }
});

module.exports = ImageComment;

// Note: this is the page for posts that appear in the FEED

var React = require('react');
var PostStore = require('../stores/post');

var ApiUtil = require('../util/api_util');
var History = require('react-router').History;
var NewComment = require('../components/NewComment');
var Comment = require('../components/Comment');

var Post = React.createClass({
  mixins: [History],
  contextTypes: {
    router: React.PropTypes.func
  },
  handleAuthorClick: function(destinationId){
    this.history.pushState(null, "user/" + this.props.post.author.id);
  },
  handleSubjectClick: function(destinationId){
    this.history.pushState(null, "user/" + this.props.post.subject.id);
  },
  handlePostClick: function (post) {
    this.history.pushState(null, "posts/" + this.props.post.id);
  },
  render: function(){

    var subjectName = this.props.post.subject.real_name;
    var authorName = this.props.post.author.real_name;
    var nameLine = {};
    if (subjectName === authorName){
      nameLine = <div className="post-user-name" onClick={this.handleAuthorClick}>{authorName}</div>;
    } else {
      nameLine = <p>
                    <span onClick={this.handleAuthorClick}>{authorName}</span>
                     --->>>
                    <span onClick={this.handleSubjectClick}>{subjectName}</span>
                </p>;
    }
    return(
      <div className="whole-post">
        <div className="feed-post-body">
         {nameLine}
         <p>{this.props.post.body}</p>
       </div>
       <div>
          <Comment postId={this.props.post.id}/>
      </div>
      <div className="feed-post-new-comment">
          <NewComment parentCommentId={this.props.post.id}/>
      </div>
      <div className="post-seperator-black"></div>
      </div>
    );
  }
});

module.exports = Post;

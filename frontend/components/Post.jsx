// Note: this is the page for posts that appear in the FEED

var React = require('react');
var PostStore = require('../stores/post');

var ApiUtil = require('../util/api_util');
var History = require('react-router').History;

var Post = React.createClass({
  mixins: [History],
  contextTypes: {
    router: React.PropTypes.func
  },
  // getInitialState: function(){
  //   debugger
  // },
  // componentDidMount: function(){
  //   this.postListener = PostStore.addListener(this._postsChanged);
  //   ApiUtil.fetchPosts();
  // },
  // _postsChanged: function(){
  //
  // },
  // componentWillUnmount: function(){
  //   this.postListener.remove();
  // },
  handleAuthorClick: function(destinationId){
    this.history.pushState(null, "user/" + this.props.post.author.id);
  },
  handleSubjectClick: function(destinationId){
    this.history.pushState(null, "user/" + this.props.post.subject.id);
  },
  handlePostClick: function (post) {
    this.props.history.pushState(null, "posts/" + this.props.post.id);
  },
  render: function(){

    var subjectName = this.props.post.subject.real_name;
    var authorName = this.props.post.author.real_name;
    var nameLine = {};
    if (subjectName === authorName){
      nameLine = <p onClick={this.handleAuthorClick}>{authorName}</p>;
    } else {
      nameLine = <p>
                    <span onClick={this.handleAuthorClick}>{authorName}</span>
                     --->>>
                    <span onClick={this.handleSubjectClick}>{subjectName}</span>
                </p>;
    }
    return(
      <div>
        <div className="feed-post">
         {nameLine}
         <p>{this.props.post.body}</p>
       </div>
      </div>
    );
  }
});

module.exports = Post;

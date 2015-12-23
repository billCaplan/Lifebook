var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');
var FollowStore = require('../stores/follow');
var LikeStore = require('../stores/like');

var ApiUtil = require('../util/api_util');

var FollowButton = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  handleLikeSubmit: function(event){
    event.preventDefault();
    debugger
    var like = {author_id: this.props.currentUser.id,
                  like_type: "post",
                  post_id: this.props.post.id};

    if (this.props.like){
      var targetLike = LikeStore.getByLikeParties(like);
      ApiUtil.deleteLike(targetLike);
    } else {
      ApiUtil.createLike(like);
    }

  },
  componentWillReceiveProps: function(newProps){

  },
  buttonText: function(){
    var text;

    if (this.props.like){
      text = "Unlike";
    } else {
      text = "Like";
    }
  return text;
  },
  render: function(){
    var properButton;
    debugger
    properButton = <button  className="button" onClick={this.handleLikeSubmit}>{this.buttonText()}</button>;

    return (
      <div>
        {properButton}
      </div>
    );
  }
});

module.exports = FollowButton;

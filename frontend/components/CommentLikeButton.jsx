var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');
var FollowStore = require('../stores/follow');
var LikeStore = require('../stores/like');
var classNames = require('classnames');
var ApiUtil = require('../util/api_util');

var CommentLikeButton = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  handleLikeSubmit: function(event){
    event.preventDefault();

    var like = {author_id: this.props.currentUser.id,
                  like_type: "comment",
                  post_id: this.props.comment.id};

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
  getAllLikers: function(){

    var otherPeople = LikeStore.getTheUsers(this.props.like);
      return otherPeople;
  },
  likeClass: function(){
    var likeClass = classNames({
      "like-button": true,
      'like-button-liked': this.props.like,
      'like-button-unliked': this.props.like === false
    });
    return likeClass;
  },
  render: function(){
    var people = this.getAllLikers();

    if (!people){
      fellowLikers = <div>Loading</div>;
    }
    else {
      fellowLikers = people.map(function (person, i) {
        return <div className="liker-name"
                    key={i}>{person.real_name}</div>;
        });
    }

    var properText = this.buttonText();

    var properButton;
    properButton = <button className={this.likeClass()}
                            onClick={this.handleLikeSubmit}>
                            {this.buttonText()}</button>;

    return (
      <div className="like-area">
        <div>
          <img src="/assets/thumb.png"
              height="20" width="20"
              className={this.likeClass()}
              onClick={this.handleLikeSubmit}></img>
            {properText}
        </div>
        <div className="liker-names">
          {fellowLikers}
        </div>
      </div>
    );
  }
});

module.exports = CommentLikeButton;

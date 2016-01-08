var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');
var FollowStore = require('../stores/follow');
var LikeStore = require('../stores/like');
var classNames = require('classnames');


var ApiUtil = require('../util/api_util');

var PostLikeButton = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  likeClass: function(){
    var likeClass = classNames({
      'like-button-liked': this.props.like,
      'like-button-unliked': this.props.like === false
    });
    return likeClass;
  },
  getAllLikers: function(){
    var otherPeople = LikeStore.getTheUsers(this.props.like);
      return otherPeople;
  },

  handleLikeSubmit: function(event){
    event.preventDefault();

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

  // <img src="app/assets/images/thumb.png" ></img>
  render: function(){
    var people = this.getAllLikers();

    if (!people){
      fellowLikers = <div>Loading</div>;
    }
    else {
      fellowLikers = people.map(function (person, i) {
        return <div key={i}>{person.real_name}</div>;
        });
    }
    var properText = this.buttonText();
    var properButton;
    properButton = <button  className={this.likeClass()} onClick={this.handleLikeSubmit}>{this.buttonText()}</button>;

    return (
      <div>
        <div>
          <span className="fa-stack fa-lg">
            <i className="fa fa-thumbs-o-up"></i>
              <i className="fa icon-thumbs-o-up fa-inverse"></i>

          </span>

          <span className="fa-stack fa-lg">
            <i className="fa fa-square-o fa-stack-2x"></i>
            <i className="fa icon-thumbs-up-alt fa-stack-1x"></i>
          </span>


          <span>{properText}</span>
        </div>
        <div>
        {fellowLikers}
        </div>
      </div>
    );
  }
});

module.exports = PostLikeButton;

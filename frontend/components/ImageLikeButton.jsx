var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');
var FollowStore = require('../stores/follow');
var LikeStore = require('../stores/like');
var classNames = require('classnames');
var ApiUtil = require('../util/api_util');

var ImageLikeButton = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  handleLikeSubmit: function(event){
    event.preventDefault();

    var like = {author_id: this.props.currentUser.id,
                  like_type: "image",
                  post_id: this.props.image.id};

    if (this.props.like){
      var targetLike = LikeStore.getByLikeParties(like);
      ApiUtil.deleteLike(targetLike);
    } else {
      ApiUtil.createLike(like);
    }

  },
  componentWillReceiveProps: function(newProps){

  },
  mouseOver: function(){
    // var date = moment(time*1000).format('MMMM Do YYYY, h:mm:ss a');

    $(('#image-like-' + this.props.image.id)).each(function() {

    $(this).addClass("fellow-likers-show").removeClass("fellow-likers");
  });

  },
  mouseLeave: function(){

    $(('#image-like-' + this.props.image.id)).each(function() {

    $(this).removeClass("fellow-likers-show").addClass("fellow-likers");
  });

},
  buttonText: function(){
    var text;
    var people = this.getAllLikers();
    var count = people.length;

    if (count === 1){
      text = "Like";
    } else {
      text = "Likes";
    }
  return text;
  },
  likeClass: function(){
    var likeClass = classNames({
      'like-button-liked': this.props.like,
      'like-button-unliked': this.props.like === false,
      'fa': true,
      'fa-thumbs-up':true
    });
    return likeClass;
  },
  getAllLikers: function(){
    var that = this;
    var otherPeople = LikeStore.getTheUsers({like_type: "image", post_id:that.props.image.id});
      return otherPeople;
  },
  render: function(){
    var people = this.getAllLikers();
    var count = people.length;

    var idLine = "image-like-"+this.props.image.id;

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
    properButton = <button  className={this.likeClass} onClick={this.handleLikeSubmit}>{this.buttonText()}</button>;

    return (
      <div>
        <div>
          <i className={this.likeClass()}
            onClick={this.handleLikeSubmit}
            onMouseOver={this.mouseOver}
            onMouseOut={this.mouseLeave}
            ></i>
        <span className="like-span">{count} {properText}</span>
      </div>
      <div id={idLine} className="fellow-likers">
        {fellowLikers}
      </div>
    </div>
    );
  }
});

module.exports = ImageLikeButton;

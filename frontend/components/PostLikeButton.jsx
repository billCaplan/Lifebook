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
      'like-button-unliked': this.props.like === false,
      'fa': true,
      'fa-thumbs-up':true
    });
    return likeClass;
  },
  mouseOver: function(){
    // var date = moment(time*1000).format('MMMM Do YYYY, h:mm:ss a');

    $(('#post-like-' + this.props.post.id)).each(function() {

    $(this).addClass("fellow-likers-show").removeClass("fellow-likers");
  });

  },
  mouseLeave: function(){

    $(('#post-like-' + this.props.post.id)).each(function() {

    $(this).removeClass("fellow-likers-show").addClass("fellow-likers");
  });

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
    var people = this.getAllLikers();
    var count = people.length;

    if (count === 1){
      text = "Like";
    } else {
      text = "Likes";
    }
  return text;
  },

  // <img src="app/assets/images/thumb.png" ></img>
  render: function(){
    var people = this.getAllLikers();
    var count = people.length;
    var idLine;

    idLine = "post-like-"+this.props.post.id;


    if (!people){
      fellowLikers = <div>Loading</div>;
    }
    else {
      fellowLikers = people.map(function (person, i) {
        return <div key={idLine}>{person.real_name}</div>;
        });
    }
    var properText = this.buttonText();
    var properButton;
    properButton = <button  className={this.likeClass()} onClick={this.handleLikeSubmit}>{this.buttonText()}</button>;

      // <img src="/assets/thumb.png" height="20" width="20" className={this.likeClass()} onClick={this.handleLikeSubmit}></img>
      // <div className="liker-list">
      //   {fellowLikers}
      // </div>
    return (
      <div>
        <div>
          <i className={this.likeClass()}
            onClick={this.handleLikeSubmit}
            onMouseOver={this.mouseOver}
            onMouseOut={this.mouseLeave}
            ></i>
          <span>{count} {properText}</span>
        </div>
        <div id={idLine} className="fellow-likers">
          {fellowLikers}
        </div>
      </div>
    );
  }
});

module.exports = PostLikeButton;

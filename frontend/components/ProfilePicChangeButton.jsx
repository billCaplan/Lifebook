var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');

var ApiUtil = require('../util/api_util');

var UserProfileUserInfo = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  // getInitialState: function(){
  //   return ({})
  // },

  handleClick: function(event){
    var image_path = this.props.image.image_path;
    var current_user = UserStore.getCurrentUser();
    ApiUtil.updateProfilePic({user: current_user, profile_image: image_path});

  },
  buildUrl: function(image_path){
    var url = "http://res.cloudinary.com/lifebook/image/upload/c_scale,h_168,w_168/v1450463928/" + image_path;
    return url;
  },

  render: function(){
    return(
      <div>
        <button onClick={this.handleClick}>Make this your Profile Picture</button>
      </div>
    );
  }
});

module.exports = UserProfileUserInfo;

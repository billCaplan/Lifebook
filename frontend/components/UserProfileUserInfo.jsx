var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');

var ApiUtil = require('../util/api_util');

var UserProfileUserInfo = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  _getProfilePic: function(){
    if(this.props.user.profile_image){
      var profileLocation = this.buildUrl(this.props.user.profile_image);
    } else {
      var profileLocation = this.buildUrl("lifebook_default_pic");
    }
    return profileLocation;

  },
  buildUrl: function(image_path){
    var url = "http://res.cloudinary.com/lifebook/image/upload/c_scale,h_168,w_168/v1450463928/" + image_path;
    return url;
  },

  render: function(){
    
    return(
      <div>
          <h2>User Profile User Info</h2>
          <div className="profile-pic"><img src={this._getProfilePic()}></img></div>
          <div>{this.props.user.real_name}</div>
          <div>{this.props.user.age}</div>
          <div>{this.props.user.location}</div>
          <div>{this.props.user.email}</div>
      </div>
    );
  }
});

module.exports = UserProfileUserInfo;

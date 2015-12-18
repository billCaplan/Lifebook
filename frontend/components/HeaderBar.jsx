var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');
var SearchBar = require('../components/SearchBar');

var ApiUtil = require('../util/api_util');

var HeaderBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function(){
    return {user: {}};
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({user: newProps.currentUser});
  },
  _buildUrl: function(image_path){
    var publicID;
    if (!image_path){
      var publicID = "lifebook_default_pic.jpg";
    } else {
      var publicID = image_path;
    }
    var url = "http://res.cloudinary.com/lifebook/image/upload/c_scale,h_50,w_50/v1450463928/" + publicID;
    return url;
  },

  render: function(){

    if (this.state.user.real_name){
      var name = this.state.user.real_name;
      var profile_image = this.state.user.profile_image;
    } else {
      var name = "Loading";
    }

    return(
      <div className="header-bar">
        <span className="header-bar-profile-pic"><img src={this._buildUrl(profile_image)}></img></span>
        <span className="header-bar-real-name">{name}</span>
      </div>
    );
  }
});

module.exports = HeaderBar;

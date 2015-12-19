var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');
var SearchBar = require('../components/SearchBar');
var History = require('react-router').History;
var SignoutButton = require('../components/SignoutButton');

var ApiUtil = require('../util/api_util');

var HeaderBar = React.createClass({
  mixins: [History],
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function(){
    return {user: {}};
  },
  redirectToHome: function(){
    this.history.pushState(null, "/");
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({user: newProps.currentUser});
  },
  _buildUrl: function(image_path){
    var publicID;
    if (!image_path){
      publicID = "lifebook_default_pic.jpg";
    } else {
      publicID = image_path;
    }
    var url = "http://res.cloudinary.com/lifebook/image/upload/c_scale,h_50,w_50/v1450463928/" + publicID;
    return url;
  },

  render: function(){
    var name, profile_image;

    if (this.state.user.real_name){
      name = this.state.user.real_name;
      profile_image = this.state.user.profile_image;
    } else {
      name = "Loading";
    }

    return(
      <div className="header-bar">
        <div className="header-bar-profile-pic"><img src={this._buildUrl(profile_image)}></img></div>
        <div className="header-bar-real-name">{name}</div>
        <div className="header-bar-search-bar"><SearchBar /></div>
        <div className="header-bar-go-home"><h1 onClick={this.redirectToHome}>Lifebook</h1></div>
      </div>
    );
  }
});

module.exports = HeaderBar;

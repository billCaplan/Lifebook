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
    window.scrollTo(0, 0);
  },
  handleAuthorClick: function(destinationId){
    this.history.pushState(null, "user/" + this.state.user.id);
    window.scrollTo(0, 0);
  },
  componentDidMount: function(){
    this.userListener = UserStore.addListener(this._usersChanged);
  },
  _usersChanged: function(){
    this.setState({user: UserStore.getCurrentUser()});
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
    var url = "http://res.cloudinary.com/lifebook/image/upload/c_scale,h_30,w_30/v1450463928/" + publicID;
    return url;
  },

  render: function(){
    var name, profile_image;

    if (this.state.user.real_name){
      var string = this.state.user.real_name;
      if(string.includes(" ")){
        name = string.substring(0, string.indexOf(" "));
      } else {
        name = this.state.user.real_name;
      }



      profile_image = this.state.user.profile_image;
    } else {
      name = "Loading";
    }

    return(
      <nav className="header-bar">
        <div className="header-bar-search-bar"><SearchBar /></div>
        <div className="header-bar-go-home"><h1 onClick={this.redirectToHome}>Lifebook</h1></div>
        <div className="header-bar-profile-pic" onClick={this.handleAuthorClick}><img className="header-bar-profile-pic-actual-pic" src={this._buildUrl(profile_image)}></img></div>
        <div className="header-bar-real-name" onClick={this.handleAuthorClick}>{name}</div>
        <SignoutButton />
      </nav>
    );
  }
});

module.exports = HeaderBar;

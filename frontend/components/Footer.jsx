var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');
var SearchBar = require('../components/SearchBar');
var History = require('react-router').History;
var SignoutButton = require('../components/SignoutButton');
var ApiUtil = require('../util/api_util');

var Footer = React.createClass({
  mixins: [History],
  contextTypes: {
    router: React.PropTypes.func
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
      <div className="footer-bar">
        <div>End of Page</div>
      </div>
    );
  }
});

module.exports = Footer;

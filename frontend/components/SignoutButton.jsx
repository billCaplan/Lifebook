var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');
var History = require('react-router').History;

var ApiUtil = require('../util/api_util');

var SignoutButton = React.createClass({
  mixins: [History],
  contextTypes: {
    router: React.PropTypes.func
  },
  logout: function(){

  },
  handleSignout: function(){
    var that = this;
    $.ajax({
       method: 'DELETE',
       url: 'session/',
       success: function(resp) {
        window.location.replace(window.location.origin);
       },
       error: function (xhr, ajaxOptions, thrownError) {

        }
     });
  },

  render: function(){
    return (
      <div className="header-bar-signout-button">
        <button onClick={this.handleSignout}>Sign Out</button>
      </div>
    );
  }
});

module.exports = SignoutButton;

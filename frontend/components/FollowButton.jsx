var React = require('react');
var PostStore = require('../stores/post');
var Post = require('../components/Post');
var UserStore = require('../stores/user');

var ApiUtil = require('../util/api_util');

var FollowButton = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function(){
    return {user: {}};
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({user: newProps.user});
  },

  handleSubmit: function(event){
    event.preventDefault();

    var follow = {followed_user_id: event.currentTarget[1].value};
    ApiUtil.createFollow(follow);
  },

  render: function(){

    return(
      <div className="follow-button">
        <form onSubmit={this.handleSubmit}>
          <input type="hidden" name="authenticity_token"
                 value="<%= form_authenticity_token %>"></input>
         <input type="hidden"
                name="follow[followed_user_id]"
                id="post_followed_user_id"
                value={this.state.user.id} />
              <input type="submit" value="Follow"/>
        </form>
      </div>
    );
  }
});

module.exports = FollowButton;

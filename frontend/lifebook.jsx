var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var root = document.getElementById('content');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var Feed = require('./components/Feed');
var UserProfile = require('./components/UserProfile');
var PostPage = require('./components/PostPage');
var ApiUtil = require('./util/api_util');
var UserStore = require('./stores/user');
var NewPost = require('./components/NewPost');
var NewComment = require('./components/NewComment');
var Comment = require('./components/Comment');
var HeaderBar = require('./components/HeaderBar');


var App = React.createClass({

  componentWillMount: function(){
    var that = this;
    ApiUtil.getCurrentUser();
    ApiUtil.fetchLikes();
    UserStore.addListener(this._onChange);
  },

  getInitialState: function(){
    return {currentUser: {}};
  },

  _onChange: function(){
    this.setState({currentUser: UserStore.getCurrentUser()});
  },



  render: function(){

    return (
      <div className="app-body">
        <div>
          <HeaderBar currentUser={this.state.currentUser}/>
        </div>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Feed}></IndexRoute>
    <Route path="/post/new" component={NewPost}></Route>
    <Route path="comments/new" component={NewComment}></Route>
    <Route path="comment/" component={Comment}></Route>
    <Route path="user/:userId" component={UserProfile}></Route>
  </Route>
);

ReactDOM.render(<Router>{routes}</Router>, root);

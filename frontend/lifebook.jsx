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




var App = React.createClass({

  componentWillMount: function(){
    var that = this;

    $.get('/current', function(currentUser){
      that.setState({currentUser: currentUser});
    });

  },

  render: function(){
    return (
      <div>
        <header><h1>Bench BnB</h1></header>
        <div>Your Feed</div>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Feed}/>
    <Route path="user/:userId" component={UserProfile}></Route>
    <Route path="post/:postId" component={PostPage}></Route>

  </Route>
);

ReactDOM.render(<Router>{routes}</Router>, root);

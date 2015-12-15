var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var root = document.getElementById('content');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var App = React.createClass({
  render: function(){
    debugger
    return (
      <div>
        <header><h1>Bench BnB</h1></header>
        <div>This is my App page</div>
        {this.props.children}
      </div>
    );
  }
});
var routes = (
  <Route path="/" component={App}>

  </Route>
);
ReactDOM.render(<Router>{routes}</Router>, root);

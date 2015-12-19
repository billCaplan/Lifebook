var React = require('react');
var UserStore = require('../stores/user.js');

var SearchBar = React.createClass({
  getInitialState: function () {
    this.userListener = UserStore.addListener(this._usersChanged);
    return { inputVal: "",
             users: UserStore.all()
           };
  },
  _usersChanged: function () {
    this.setState({users: UserStore.all()});
  },

  handleInput: function (event) {
    this.setState({ inputVal: event.currentTarget.value });
  },

  matches: function () {
    var matches = [];
    if(this.state.inputVal.length === 0){
      return this.state.users;
    }

    this.state.users.forEach(function (user) {
      var name = user.real_name;
      var sub = name.slice(0, this.state.inputVal.length);
      if(sub.toLowerCase() === this.state.inputVal.toLowerCase()){
        matches.push(name);
      }
    }.bind(this));

    if (matches.length === 0) {
      matches.push("No matches");
    }
    return matches;
  },

  selectName: function (event) {
    var name = event.currentTarget.innerText;
    this.setState({ inputVal: name });
  },
  _setContent: function(results){
  return  <div>
      <input onChange={this.handleInput} value={this.state.inputVal} />
      <ul className="search-list">
        {
          results.map(function (result, i) {
            return <li key={i} onClick={this.selectName}>{result.real_name}</li>
          }.bind(this))
        }
      </ul>
    </div>;
  },

  render: function () {
    debugger
    var results = this.matches();

    if (this.state.users && results){
    var content = this._setContent(results);
    } else {
      var content = <div>Loading</div>;
    }
    return(
      <div>
        {content}
      </div>
    );
  }
});

module.exports = SearchBar;

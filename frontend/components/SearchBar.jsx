var React = require('react');
var UserStore = require('../stores/user.js');
var History = require('react-router').History;
var classNames = require('classnames');

var SearchBar = React.createClass({
  mixins: [History],
  getInitialState: function () {
    this.userListener = UserStore.addListener(this._usersChanged);
    return { inputVal: "",
             users: UserStore.all(),
             listVisible: false
           };
  },
  _usersChanged: function () {
    this.setState({users: UserStore.all()});
  },
  handleSubjectClick: function(destinationId){
    this.setState({listVisible: false});
    this.history.pushState(null, "user/" + this.props.post.subject.id);
  },

  handleInput: function (event) {
    this.setState({ inputVal: event.currentTarget.value });
    if(event.currentTarget.value.length !== 0){
     this.setState({listVisible: true});
   } else {
     this.setState({listVisible: false});
   }

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
        matches.push(user);
      }
    }.bind(this));

    if (matches.length === 0) {
      matches.push("No matches");
    }
    return matches;
  },

  selectName: function (result) {
    this.setState({listVisible: false, inputVal: ""});
    this.history.pushState(null, "user/" + result.id);
    window.scrollTo(0, 0);

  },
  _setContent: function(results){
    var glass = <i class="fa fa-search"></i>;
  return  <div>
      <label>Search: </label>
      <input onChange={this.handleInput}
            value={this.state.inputVal}
            size="50"
           />
      <ul className={this.listClass()}>
        {
          results.map(function (result, i) {
            return <li key={i} onClick={this.selectName.bind(null, result)}>
                    {result.real_name}
                   </li>;
          }.bind(this))
        }
      </ul>
    </div>;
  },
  componentWillUnmount: function(){
    this.userListener.remove();
  },
  listClass: function(){
    var listClass = classNames({
      'search-list': true,
      'search-list-hidden': this.state.listVisible === false,
      'search-list-visible': this.state.listVisible,
      'search-list-username': true,
    });
    return listClass;
  },

  render: function () {
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

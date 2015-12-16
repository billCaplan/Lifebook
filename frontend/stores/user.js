var Store = require('flux/utils').Store;
var CHANGE_EVENT = "change";
var UserConstants = require('../constants/user_constants');
var AppDispatcher = require('../dispatcher/Dispatcher');

var UserStore = new Store(AppDispatcher);

var _users = [];

var _currentUser = {};

var resetUsers = function(users){
  _users = users.slice(0);
};

UserStore.all = function () {
  return _users.slice(0);
};

UserStore.setCurrentUser = function(currentUser){
   _currentUser = currentUser;
};

UserStore.getCurrentUser = function(){

  return _currentUser;
};

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UserConstants.CURRENT_USER_RECEIVED:
      this.setCurrentUser(payload.currentUser);
      UserStore.__emitChange();
      break;
  }
};

module.exports = UserStore;

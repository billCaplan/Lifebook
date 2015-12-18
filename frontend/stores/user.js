var Store = require('flux/utils').Store;
var UserConstants = require('../constants/user_constants');
var AppDispatcher = require('../dispatcher/Dispatcher');
var ApiUtil = require('../util/api_util');


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

UserStore.findUser = function(userId){

  var targetUserId = parseInt(userId);
  var users = UserStore.all();
  var targetUser = {string: "Bad User"};

  users.forEach(function(user){
    if (user.id === targetUserId){
      targetUser = user;
    }
  });
  return targetUser;
};

UserStore.__onDispatch = function (payload) {

  switch(payload.actionType) {
    case UserConstants.CURRENT_USER_RECEIVED:
      this.setCurrentUser(payload.currentUser);
      UserStore.__emitChange();
      break;
    case UserConstants.USERS_RECEIVED:
      var result = resetUsers(payload.users);
      UserStore.__emitChange();
      break;
    case UserConstants.FOLLOW_RECEIVED:
      ApiUtil.fetchUsers();
      break;
  }
};


module.exports = UserStore;

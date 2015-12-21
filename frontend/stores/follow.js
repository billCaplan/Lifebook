var Store = require('flux/utils').Store;
var FollowConstants = require('../constants/follow_constants');
var AppDispatcher = require('../dispatcher/Dispatcher');

var FollowStore = new Store(AppDispatcher);

var _follows = [];

var resetFollows = function(follows){
  debugger
  _follows = follows.slice(0);
};

var addNewFollow = function(newFollow){
  _follows.push(newFollow);
};

FollowStore.all = function () {
  return _follows.slice(0);
};

FollowStore.getByFollowParties = function(followParties) {
  var author_id = parseInt(followParties.author_id);
  var followed_user_id = parseInt(followParties.followed_user_id);
  var follows = FollowStore.all();
  var relevantFollow = {};

  follows.forEach(function(follow){

    if (follow.author_id === author_id && follow.followed_user_id === followed_user_id){
      relevantFollow = follow;
    }
  });

  return relevantFollow;
};

FollowStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UserConstants.FOLLOW_RECEIVED:
      var result = resetFollows(payload.follows);
      FollowStore.__emitChange();
      break;
      case FollowConstants.FOLLOWS_RECEIVED:
        var result = resetFollows(payload.follows);
        FollowStore.__emitChange();
        break;
  }
};

module.exports = FollowStore;

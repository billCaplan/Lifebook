# Phase 5: Notification

## Rails
### Models
* Notification

### Controllers
* Api::NotificationsController (create, destroy, index, show, update)

### Views
* notifications/index.json.jbuilder

## Flux
### Views (React Components)
* NotificationsIndex
  - NotificationIndexItem
* NotificationShow
* NotificationForm

### Stores
* Notification

### Actions
* ApiActions.receiveAllNotifications -> triggered by ApiUtil
* ApiActions.receiveSingleNotification
* ApiActions.deleteNotification
* NotificationActions.fetchAllNotifications -> triggers ApiUtil
* NotificationActions.fetchSingleNotification
* NotificationActions.createNotification
* NotificationActions.updateNotification
* NotificationActions.destroyNotification

### ApiUtil
* ApiUtil.fetchAllNotifications
* ApiUtil.fetchSingleNotification
* ApiUtil.createNotification
* ApiUtil.updateNotification
* ApiUtil.destroyNotification

## Gems/Libraries

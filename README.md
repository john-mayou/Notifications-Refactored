# Notifications-Refactored

I've decided that my implementation of notifications for our Prime group project was unreadable and did not scale well, so I've re-written it (new code is in this repo). Here is a brief explanation.

This is a front-end implementation. If you choose to do this in the backend, this code can be repurposed with endpoint calls instead of dispatching to Redux. You would just send the id and click action ('accept' or 'reject'), then you can use the config to figure out what to do inside the end-point. You would then have to account for the message and button_text not being in the front end any longer. But anyways, whatever you prefer :)

## Example Notification Workflow Config
![CleanShot 2023-07-23 at 16 18 41](https://github.com/john-mayou/Notifications-Refactored/assets/109235738/0060f69c-2a4b-4f95-b26c-1f0b58bfb241)

On the front end, when the user gets a notification, you can pass that notification type into the `_root.js` notification map (which would already be imported into the notification view you are using) and get its corresponding data. The original implementation used 'magic strings' for object keys so I've put them all into a `/constants/notificationTypes.js` to remove the chance of syntax errors.
The map looks like this:
```
{
  type_of_notification: (pass_notification) => get_message_and_actions    
}
```

If the notification has an 'actions' key associated with it, it will have both 'accept' and 'reject' attributes which correspond to the two actions a user can perform on the notification. Each action will have a button_text and actions to be dispatched if that button is clicked. The 'dispatch' key houses an array of actions. Helper functions for creating these are kept in `/modules/notificationHelpers.js`
The Array of actions will look like this:
```
{
  [ { type: saga_action, payload: notification_data }, ........ ]
}
```

## Example View
![CleanShot 2023-07-23 at 17 51 35](https://github.com/john-mayou/Notifications-Refactored/assets/109235738/f24cf48d-40c5-4f12-ae40-8c6b7341bdf4)

On the front end, when a button is clicked, the actions should be looped over and all dispatched to Redux. After all the actions have been dispatched (or if there were no actions in the first place), a dispatch should go to the `"COMPLETE_NOTIFICATION"` saga to complete the notification. (I chose not to include this in the config files, as all notifications should be complete by default anyways).

## Database
![CleanShot 2023-07-23 at 18 21 51](https://github.com/john-mayou/Notifications-Refactored/assets/109235738/494aadb4-cdbf-453d-868b-957dfbbb6260)


- `actor` -> user that initiated the notification
- `recipient` -> user it's going to

The nominations table exists to keep track of the initial nominator and the nominated user. For the nominateMember workflow, it is important to keep track of this throughout the whole process. This is because the initial nominator is notified of the end outcome of the nomination. Instead of adding more columns to the notification table to account for this, I made a separate table. This could go both ways.

I re-wrote this rather quickly without testing, but the overall structure is there. Hope this helps. If you have any questions feel free to reach out.

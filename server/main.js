import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Meteor.users.find({}).count() === 0) {
      Accounts.createUser({
      	username: 'admin',
      	password: 'admin888'
      });
    }
  });
}
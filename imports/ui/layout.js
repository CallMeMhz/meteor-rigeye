import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './layout.html';

Template.login.events({
	'click #login'(evt, template) {
		Meteor.loginWithPassword(template.find('#username').value, template.find('#password').value);
	},
});
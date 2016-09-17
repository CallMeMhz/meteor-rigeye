import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './login.html';

Template.login.events({
	'submit #login'(evt, template) {
		evt.preventDefault();
		Meteor.loginWithPassword(template.find('#username').value, template.find('#password').value);
	}
});
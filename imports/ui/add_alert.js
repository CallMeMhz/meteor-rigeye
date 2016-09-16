import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Instances, Alerts } from '../api/collections.js';

import './add_alert.html';

Template.addAlert.helpers({
	instances() {
		instances = Instances.find({});
		return instances;
	},
});

Template.addAlert.events({
	'click #addAlert'(evt, template) {
		Alerts.insert({
			'name': template.find('#name').value,
			'instanceId': template.find('#instance').value,
			'module': template.find('#module').value,
			'condition': template.find('#condition').value,
			'standard': parseInt(template.find('#standard').value),
			'createdAt': new Date().getTime(),
			'createdBy': Meteor.user().username,
		});
		FlowRouter.go('/alert');
	},
});
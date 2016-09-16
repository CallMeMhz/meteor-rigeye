import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Alerts } from '../api/collections';

import './alert_list.html';

Template.alertList.helpers({
	alerts() {
		alerts = Alerts.find({});
		return alerts;
	},
});

Template.alertList.events({
	'click #addAlert'() {
		FlowRouter.go('/alert/add');
	},
	'click #checkAll'(evt) {
		$('input[type=checkbox]').each(function (i, c) {
			c.checked = evt.target.checked;
		});
	},
});

Template.alertItem.helpers({
	statusToLevel(status) {
		if (status == 'MONITORING') {
			return 'default';
		} else if (status == 'TRIGERING') {
			return 'danger';
		}
	},
	prettyTime(ts) {
		var date = new Date();
		date.setTime(ts);
		return date.toLocaleString();
	},
});
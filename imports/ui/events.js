import { Template } from 'meteor/templating';

import { Events } from '../api/collections.js';

import './events.html';

Template.events.helpers({
	events() {
		return Events.find({}, { sort: { 'updatedAt': -1, 'createdAt': -1 } });
	},
});

Template.event.helpers({
	prettyTime(ts) {
		var date = new Date();
		date.setTime(ts);
		return date.toLocaleString();
	},
});
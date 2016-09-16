import { Meteor } from 'meteor/meteor';

import { Instances, Events, Alerts } from '../imports/api/collections.js';

Meteor.setInterval(function () {
	var now = new Date().getTime();
	
	var instances = Instances.find({});
	instances.forEach(function (instance) {
		if ((now - (instance.updatedAt*1000)) < 5000) {
			if (instance.status != 'MONITORING') {
				if (Events.findOne({'content': instance._id + '.CATCH_SIGNAL'})) {
					Events.update({'content': instance._id + '.CATCH_SIGNAL'}, { $set: { 'updatedAt': new Date().getTime() } });
				} else {
					Events.insert({
						'eName': 'CATCH SIGNAL',
						'level': 'success',
						'content': instance._id + '.CATCH_SIGNAL',
						'createdAt': new Date().getTime(),
						'updatedAt': new Date().getTime(),
					});
				}
			}
			Instances.update({'_id': instance._id}, { $set: { 'status': 'MONITORING' } }, true);
		} else {
			if (instance.status == 'MONITORING') {
				if (Events.findOne({'content': instance._id + '.LOSE_SIGNAL'})) {
					Events.update({'content': instance._id + '.LOSE_SIGNAL'}, { $set: { 'updatedAt': new Date().getTime() } });
				} else {
					Events.insert({
						'eName': 'LOSE SIGNAL',
						'level': 'danger',
						'content': instance._id + '.LOSE_SIGNAL',
						'createdAt': new Date().getTime(),
						'updatedAt': new Date().getTime(),
					});
				}
			}
			Instances.update({'_id': instance._id}, { $set: { 'status': 'NO SIGNAL' } }, true);
		}
	});

	var alerts = Alerts.find({});
	alerts.forEach(function (alert) {
		var event = Events.findOne({'eName': alert.name}, { sort: { 'updatedAt': -1 } });
		if (event && (now - event.updatedAt) < 5000) {
			Alerts.update({'_id': alert._id}, { $set: { 'status': 'TRIGERING' } }, true);
		} else {
			Alerts.update({'_id': alert._id}, { $set: { 'status': 'MONITORING' } }, true);
		}
	});
	
}, 1000);
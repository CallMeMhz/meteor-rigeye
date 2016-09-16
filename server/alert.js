import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Instances, Alerts, Events } from '../imports/api/collections.js';

function compute(a, method, b) {
	if (method == 'gt') {
		return a > b;
	} else if (method == 'lt') {
		return a < b;
	}
}

Meteor.setInterval(function () {
	var now = new Date().getTime();

	var alerts = Alerts.find({});
	var events = Events.find({});
	alerts.forEach(function (alert) {
		var instance = Instances.findOne({'_id': alert.instanceId});
		if (compute(instance[alert.module][instance[alert.module].length-1].value, alert.condition, alert.standard) && instance.status == 'MONITORING') {
			if (!Events.findOne({'eName': alert.name})) {
				Events.insert({
					'eName': alert.name,
					'level': 'danger',
					'content': alert.instanceId + '.' + alert.module + '.' + alert.condition + '.' + alert.standard,
					'createdAt': now
				});
			} else {
				Events.update({'eName': alert.name}, { $set: { 'updatedAt': now } }, true);
			}
			Alerts.update({'_id': alert._id}, { $set: {'latestData': instance[alert.module][instance[alert.module].length-1].value, 'latestTime': now} }, true);
		}
	});

}, 1000);

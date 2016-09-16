import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Instances, Panels } from '../api/collections.js';

import './add_panel.html';

Template.addPanel.helpers({
	instances() {
		return Instances.find({});
	},
});

Template.addPanel.events({
	'click #addPanel'(event, template) {
		if (Panels.find({'pName': template.find('#pName').value}).count()>0) {
			alert('面板name已存在，请更换！');
			return
		}

		Panels.insert({
			'pName': template.find('#pName').value,
			'pTitle': template.find('#pTitle').value,
			'instanceId': template.find('#instances').value,
			'module': template.find('#module').value,
			'suggestedMax': parseInt(template.find('#suggestedMax').value),
		});

		FlowRouter.go('/panels');

	},
});
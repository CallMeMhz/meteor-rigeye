import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

import '../imports/ui/layout.js';
import '../imports/ui/login.js';
import '../imports/ui/preview.js';
import '../imports/ui/instances_list.js';
import '../imports/ui/panels.js';
import '../imports/ui/add_panel.js';
import '../imports/ui/alert_list.js';
import '../imports/ui/add_alert.js';
import '../imports/ui/events.js';
import '../imports/ui/settings.js';

FlowRouter.route('/logout', {
	name: 'logout',
	action() {
		if (Meteor.user()) {
			Meteor.logout();
		} else {
			FlowRouter.go('/');
		}
	}
});

FlowRouter.route('/', {
	name: 'preview',
	action() {
		BlazeLayout.render('layout', {main: 'preview'});
	}
});

FlowRouter.route('/instances', {
	name: 'instances',
	action() {
		BlazeLayout.render('layout', {main: 'instancesList'});
	}
});

FlowRouter.route('/panels', {
	name: 'panels',
	action() {
		BlazeLayout.render('layout', {main: 'panels'});
	}
});

FlowRouter.route('/panels/add', {
	name: 'panelsAdd',
	action() {
		BlazeLayout.render('layout', {main: 'addPanel'});
	}
});

FlowRouter.route('/alert', {
	name: 'alert',
	action() {
		BlazeLayout.render('layout', {main: 'alertList'});
	}
});

FlowRouter.route('/alert/add', {
	name: 'alertAdd',
	action() {
		BlazeLayout.render('layout', {main: 'addAlert'});
	}
});

FlowRouter.route('/events', {
	name: 'events',
	action() {
		BlazeLayout.render('layout', {main: 'events'});
	}
});

FlowRouter.route('/events', {
	name: 'events',
	action() {
		BlazeLayout.render('layout', {main: 'events'});
	}
});

FlowRouter.route('/settings', {
	name: 'settings',
	action() {
		BlazeLayout.render('layout', {main: 'settings'});
	}
});
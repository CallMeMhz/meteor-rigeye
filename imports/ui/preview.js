import { Template } from 'meteor/templating';

import { Events, Instances } from '../api/collections.js';

import './preview.html';

Template.previewEventsList.helpers({
	events() {
		events = Events.find({}, { sort: { updatedAt: -1, createdAt: -1 }, limit: 6 });
		return events;
	},
	levelToColor(level) {
		if (level == 'notice') {
			return 'gray';
		} else if (level == 'success') {
			return 'green';
		} else if (level == 'warning') {
			return 'orange';
		} else if (level == 'danger') {
			return 'red';
		}
	},
	prettyTime(ts) {
		var date = new Date();
		date.setTime(ts);
		return date.toLocaleString();
	},
});

Template.previewAvailableList.helpers({
	instances() {
		return Instances.find({}, { limit: 6 });
	},
});

Template.previewAvailableListItem.helpers({
	isWorking(status) {
		return status == 'MONITORING';
	},
	prettyTime(ts) {
		var date = new Date();
		date.setTime(ts*1000);
		return date.toLocaleString();
	},
});

function drawChartPreviewNetwork() {
	var instances = Instances.find({'status': 'MONITORING'}, { sort: { net_speed_r: -1 }, limit: 5 });

	var ctx = document.getElementById('chart-preview-network');
	var data = {
			labels: [],
			datasets: [{
					label: 'BPS',
					data: [],
					backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(255, 159, 64, 0.2)',
					],
					borderColor: [
							'rgba(255,99,132,1)',
							'rgba(255, 206, 86, 1)',
							'rgba(255, 159, 64, 1)',
					],
					borderWidth: 1
			}]
	}
	var options = {
			scales: {
					xAxes: [{
							ticks: {
									beginAtZero:true
							}
					}],
			}
	}
	if (!chartPreviewNetwork) {
		chartPreviewNetwork = new Chart(ctx, {type: 'horizontalBar', data: data, options: options});
	}


	data.labels = [];
	data.datasets[0].data = [];
	instances.forEach(function (instance) {
		data.labels.push([instance.node]);
		if (instance.net_speed_r) {
			data.datasets[0].data.push(parseInt(instance.net_speed_r[instance.net_speed_r.length-1].value));
		} else {
			data.datasets[0].data.push(0);
		}
	});

	chartPreviewNetwork.data.labels = data.labels;
	chartPreviewNetwork.data.datasets[0].data = data.datasets[0].data;
	chartPreviewNetwork.update();

}

function drawChartPreviewAlerts() {
	var ctx = document.getElementById('chart-preview-warn');
	var data = {
			labels: ['致命', '警告', '注意'],
			datasets: [{
					label: '次数',
					data: [],
					backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(255, 159, 64, 0.2)',
					],
					borderColor: [
							'rgba(255,99,132,1)',
							'rgba(255, 206, 86, 1)',
							'rgba(255, 159, 64, 1)',
					],
					borderWidth: 1
			}]
	}
	var options = {
			scales: {
					yAxes: [{
							ticks: {
								suggestedMax: 10,
								beginAtZero:true
							}
					}],
			}
	}
	if (!chartPriviewAlerts) {
		chartPriviewAlerts = new Chart(ctx, {type: 'bar', data: data, options: options});
	}

	data.datasets[0].data = [Events.find({'level': 'danger'}).count(), Events.find({'level': 'warning'}).count(), Events.find({'level': 'notice'}).count()];

	chartPriviewAlerts.data.datasets[0].data = data.datasets[0].data;
	chartPriviewAlerts.update();

}

Template.preview.onCreated(function () {
	chartPreviewNetwork = null;
	chartPriviewAlerts = null;
});

Template.preview.onRendered(function () {
	this.autorun(() => {
		drawChartPreviewAlerts();
		drawChartPreviewNetwork();
	});
});

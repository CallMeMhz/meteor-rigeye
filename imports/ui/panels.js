import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Panels, Instances } from '../api/collections.js';

import './panels.html';

Template.panels.helpers({
	panels() {
		panels = Panels.find({});
		return {panels: panels, count: panels.count()};
	},
});

Template.panels.events({
	'click #addPanel'() {
		FlowRouter.go('/panels/add');
	},
});

function drawCharts() {
	var panels = Panels.find({});
	
	var data = {
		labels: [],
		datasets: [
			{
				label: "",
				fill: true,
				lineTension: 0.1,
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: "rgba(75,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "rgba(75,192,192,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: [],
				spanGaps: false,
			}
		]
	};
	var options = {
		scales: {
			yAxes: [{
				display: true,
				ticks: {
					suggestedMax: 100,
					beginAtZero: true
				}
			}]
		}
	};

	panels.forEach(function (panel) {
		data.labels = [];
		data.datasets[0].label = panel.module;
		data.datasets[0].data = [];
		instance = Instances.findOne({'_id': panel.instanceId});
		instance[panel.module].reverse().slice(0,10).reverse().forEach(function (item) {
			var time = new Date();
			time.setTime(item.time*1000);
			data.labels.push(time.toLocaleString());
			data.datasets[0].data.push(item.value);
		});
		options.scales.yAxes[0].ticks.suggestedMax = panel.suggestedMax;

		var flag = false;
		var myLineChart = null;

		if (typeof chartsList === 'undefined') chartsList = [];

		for (var i = 0; i < chartsList.length; i++) {
			if (chartsList[i].pName == panel.pName) {
				chartsList[i].chart.data.labels = data.labels;
				chartsList[i].chart.data.datasets[0].label = data.datasets[0].label;
				chartsList[i].chart.data.datasets[0].data = data.datasets[0].data;
				chartsList[i].chart.update();
				flag = true;
			}
		}

		if (!flag) {
			var ctx = document.getElementById(panel.pName);
			chartsList.push({
				pName: panel.pName,
				chart: new Chart(ctx, {type: 'line', data: data, options: options})
			});
		}

	});
}

Template.panels.onCreated(function () {
	chartsList = [];
});

Template.panels.onRendered(function () {
	this.autorun(() => {
		drawCharts();
	});
});
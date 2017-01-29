
var app = app || {};

(function () {
	'use strict';

	app.Router = Backbone.Router.extend({
		routes: {          
			'': 'homeRoute',
			'timeline':'timelineRoute',
			'new':'createRoute'
		},
		homeRoute: function () {
			var horaireView = new app.horaireView();          
			$("#content").html(horaireView.el);
		},
		timelineRoute: function () {
			var timelineView = new app.timelineView();          
			$("#content").html(timelineView.el);
		},
		createRoute: function () {
			var timelineView = new app.createLogView();          
			$("#content").html(timelineView.el);
		}
	});
})();

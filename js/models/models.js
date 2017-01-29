
var app = app || {};

(function () {
	'use strict';

	app.Log = Backbone.Model.extend({
		defaults: {
			title: '',
			hours: 1,
			category: '',
			subcategory: '',
			date: 0
		}
	});

	app.Logs = Backbone.Collection.extend({
		model: app.Log,
		url: '/json/logs.json'
	});

	app.Category = Backbone.Model.extend({
		defaults: {
			name: '',
			percent: 0.0,
			hours: 0,
			logs: 0,
			category: '',
			data: [],
			size: 0,
			singular: true
		}
	});

	app.Categories = Backbone.Collection.extend({
		model: app.Category,

		comparator: function (property) {
	        return selectedStrategy.apply(myModel.get(property));
	    },
	    strategies: {
	        name: function (Category) { return Category.get("name"); }, 
	        category: function (Category) { return Category.get("category"); },
	        percent: function (Category) { return Category.get("percent"); },
	    },
	    changeSort: function (sortProperty) {
	        this.comparator = this.strategies[sortProperty];
	    },
	    initialize: function () {
	        this.changeSort("name");
	    } 
	});
})();

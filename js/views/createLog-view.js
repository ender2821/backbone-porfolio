(function ($) {
	'use strict';

	app.createLogView = Backbone.View.extend({
		template:  Handlebars.templates['line-template'], 

	   	initialize: function(){
	   		var self = this;

	   		this.categories = app.LogCategories;
	   		this.subcategories = app.LogSubCategories;

			this.render();
		},

		render: function () {
			this.$el.html(this.template(this));
		}
	});

})(jQuery);	
(function ($) {
	'use strict';

	app.timelineView = Backbone.View.extend({
		template:  Handlebars.templates['line-template'], 

	   	initialize: function(){
	   		var self = this;



			this.render();
		},

		doStuff: function() {
			
		},

		render: function () {
			this.$el.html(this.template(this));
		}
	});

})(jQuery);	
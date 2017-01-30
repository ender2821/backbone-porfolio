
$(function () {
	'use strict';

	var appRouter;
	app.LogData = new app.Logs;

	app.LogCategories = new app.Categories;
	app.LogSubCategories = new app.Categories;


	app.LogData.fetch({ 
       	url: "json/logs.json",
	    success: function () { //
			var t = app.LogData["models"]; // data
	        var temp;
	        for (var i = t.length - 1; i >= 0; i--) {
	        	// category creation
	        	temp = false;
	        	for (var j = app.LogCategories.length - 1; j >= 0; j--) {
					if 	(t[i].attributes.category == app.LogCategories["models"][j].attributes.name) {
						temp = true; // exists
						app.LogCategories["models"][j].attributes.hours += Number(t[i].attributes.hours);
	        			
	        			// http://jsfiddle.net/ambiguous/QwZDv/ 
	        			// See http://stackoverflow.com/questions/11661380/does-backbone-models-this-get-copy-an-entire-array-or-point-to-the-same-array
	        			var a = _(app.LogCategories["models"][j].get('data')).clone(); 
	        			a.push({ 
	        				hours: Number(t[i].attributes.hours), 
	        				date: t[i].attributes.date 
	        			}); 
	        			app.LogCategories["models"][j].set('data', a);
					}
		        }
		        if (!temp) { // does not exist
	        		app.LogCategories.add(new app.Category({
        				name: t[i].attributes.category, 
        				hours: Number(t[i].attributes.hours)
        			}));
	        	}
				// subcategory creation
	        	temp = false;
	        	for (var j = app.LogSubCategories.length - 1; j >= 0; j--) {
					if 	(t[i].attributes.subcategory == app.LogSubCategories["models"][j].attributes.name) {
						temp = true; // exists
	        			app.LogSubCategories["models"][j].attributes.hours += Number(t[i].attributes.hours);
	        			app.LogSubCategories["models"][j].attributes.logs += Number(1);						
					}
		        }
	        	if (!temp) { // does not exist
	        		app.LogSubCategories.add(new app.Category({
						name: t[i].attributes.subcategory,
						category: t[i].attributes.category,
						hours: Number(t[i].attributes.hours)
					}));
	        	}
	        }

			appRouter = new app.Router();
		  	Backbone.history.start();
	    },
	    error: function() {
	    	console.log("something went wrong");
	    }
	});
});

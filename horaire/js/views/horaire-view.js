(function ($) {
	'use strict';

	app.horaireView = Backbone.View.extend({
		template: Handlebars.templates['log-template'], 

		events: {
			"click .logs" : "logView"
		},

	   	initialize: function(){
			var self = this;

			this.LogData = app.LogData;
			this.LogCategories = app.LogCategories;
			this.LogSubCategories = app.LogSubCategories;

			this.OldestLog = new Date();
			this.NewestLog = 99999;
			this.TotalLog = 0;
			
			this.TotalHours = 0;

			this.MaxPoints = 25;
			this.LeftPoint = 30;
			this.RightPoint = 680;
			this.IncrementPoint = (this.RightPoint - this.LeftPoint) / this.MaxPoints;

			this.MaxHeight = 40;
			this.MinHeight = 160;

			this.selectedCategory = '';

			this.polyline1 = [];
			this.polyline2 = [];
			this.polyline3 = [];
			this.polyline4 = [];

			_.bindAll(this, "render");
			_.bindAll(this, "doStuff");

			this.doStuff();
		},

		logView: function(ev) {
			var self = this;
			var el = $(ev.currentTarget);
			var parentEl = el.parent();
			
			if (this.selectedCategory == el.attr('category')) {
				this.selectedCategory = '';
				parentEl.children().each( function () {
					$(this).removeClass('hidden');
				});
			} else {
				this.selectedCategory = el.attr('category');
				parentEl.children().each( function () {
					if (String($(this)[0].attributes[1].value) != String(self.selectedCategory)) {
						$(this).addClass('hidden');
					}
				});
			}
		},

		doStuff: function() {		
			var t = this.LogData["models"]; // data
	        this.TotalLog = t.length; // total logs

	        for (var i = t.length - 1; i >= 0; i--) {
	        	// datefix
	        	var date = t[i].attributes.date.split("-"); 
				t[i].attributes.date = new Date(date[2], date[0]-1, date[1],date[3] || 0);

				// oldest / newest dates
				if (t[i].attributes.date < this.OldestLog) {
					this.OldestLog = t[i].attributes.date;
				}
				if (t[i].attributes.date > this.NewestLog) {
					this.NewestLog = t[i].attributes.date;
				}

				// total hours
	        	this.TotalHours += Number(t[i].attributes.hours);
	        }

			// subcategory percentage
	        var maxPercent = 0; // circle size percentage scaling
	        for (var i = this.LogSubCategories["models"].length - 1; i >= 0; i--) {
	        	var n = this.LogSubCategories["models"][i].attributes.hours / this.TotalHours * 100;
	        	this.LogSubCategories["models"][i].attributes.percent = Number(n.toFixed(2));
	        	if (this.LogSubCategories["models"][i].attributes.logs > 1) {
	        		this.LogSubCategories["models"][i].attributes.singular = false;
	        	}
				if (this.LogSubCategories["models"][i].attributes.percent > maxPercent) {
					maxPercent = n.toFixed(2);
				}
	        }

	        // circle size calculation
			for (var i = this.LogSubCategories["models"].length - 1; i >= 0; i--) {
				this.LogSubCategories["models"][i].attributes.size = this.LogSubCategories["models"][i].attributes.percent / maxPercent * 65;
			}
			
			// date interval calculation 
			var dateMin = this.OldestLog.getTime();
			var dateInterval = (this.NewestLog.getTime() - this.OldestLog.getTime()) / this.MaxPoints;

			// fancy date conversion
			this.OldestLog = relativeTime(this.OldestLog);
			this.NewestLog = relativeTime(this.NewestLog);

			// graph data generation
			var pointWidth = 0.2;
			var lower,upper,total,value,RelativeMaxHeight = 0;

			for (var i = this.LogCategories["models"].length - 1; i >= 0; i--) {
				for (var j = this.MaxPoints; j >= 0; j--) {
					lower = dateMin + dateInterval * j;
					upper = dateMin + dateInterval * (j+1);
					total = 0;

					for (var k = this.LogCategories["models"][i].attributes.data.length - 1; k >= 0; k--) {
						value = new Date(this.LogCategories["models"][i].attributes.data[k].date).getTime();
						if ( value > lower && value < upper) {
							total += this.LogCategories["models"][i].attributes.data[k].hours;
						}
					}
					
					if (total > RelativeMaxHeight) {
						RelativeMaxHeight = total;
					}
					if (i == 0) {
						this.polyline1[this.polyline1.length] = [Math.floor(this.LeftPoint + (this.IncrementPoint * (j+pointWidth))), total];	
						this.polyline1[this.polyline1.length] = [Math.floor(this.LeftPoint + (this.IncrementPoint * (j-pointWidth))), total];	
					} else if (i == 1) {
						this.polyline2[this.polyline2.length] = [Math.floor(this.LeftPoint + (this.IncrementPoint * (j+pointWidth))), total];	
						this.polyline2[this.polyline2.length] = [Math.floor(this.LeftPoint + (this.IncrementPoint * (j-pointWidth))), total];	
					} else if (i == 2) {
						this.polyline3[this.polyline3.length] = [Math.floor(this.LeftPoint + (this.IncrementPoint * (j+pointWidth))), total];	
						this.polyline3[this.polyline3.length] = [Math.floor(this.LeftPoint + (this.IncrementPoint * (j-pointWidth))), total];	
					}
				}
			}
		
			// vertical scaling adjust
			var scaleHeight = (this.MinHeight - this.MaxHeight) / RelativeMaxHeight;
			var average = 0;

			for (var i = this.MaxPoints*2 + 1; i >= 0; i--) {
				this.polyline1[i][1] = Math.floor(this.MinHeight - (this.polyline1[i][1] * scaleHeight));
				this.polyline2[i][1] = Math.floor(this.MinHeight - (this.polyline2[i][1] * scaleHeight));
				this.polyline3[i][1] = Math.floor(this.MinHeight - (this.polyline3[i][1] * scaleHeight));
				// average line generation 
				average = (this.polyline1[i][1] + this.polyline2[i][1] + this.polyline3[i][1])/3;
				this.polyline4[i] = [this.polyline1[i][0],average];
			}

			this.render();
		},
		render: function () {
			this.$el.html(this.template(this));
		
			// svg path
			this.$("#polyline1").attr('d', "M"+this.polyline1 );
			this.$("#polyline2").attr('d', "M"+this.polyline2 );
			this.$("#polyline3").attr('d', "M"+this.polyline3 );
			this.$("#polyline4").attr('d', "M"+this.polyline4 );
			var doSVGAnimation = function(el, delay) {
				var path = el.get(0);
				var length = path.getTotalLength();

				$(el).css({
					'strokeDasharray': length + ' ' + length,
					'strokeDashoffset': -length,
				});
				path.getBoundingClientRect();
 				$(el).delay(delay).animate({
            		'stroke-dashoffset': 0
        		},{
        			duration: 1800,
        			easing: 'easeInOutQuad'
        		});
			};

			doSVGAnimation(this.$("#polyline1"),"0");
			doSVGAnimation(this.$("#polyline2"),"400");
			doSVGAnimation(this.$("#polyline3"),"800");
			this.$("#polyline4").css({"opacity":0}).delay( 2200 ).animate({
				opacity: 1
			},400);		

			var accumulator = 0;
			this.$(".logsWrapper").children().each( function () {
				$(this).delay( accumulator ).animate({
					opacity: 1
				},400);
				accumulator += 200;
			});
		}
	});

})(jQuery);
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['line-template'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"logsWrapper header\">\r\n	<a class=\"topNav\" href=\"/\"><h1>Timesheet</h1></a>\r\n	<a class=\"topNav\" href=\"/#timeline\"><h1>Timeline</h1></a>\r\n	<a class=\"topNav\" href=\"/#new\"><h1>New Log</h1></a>	\r\n	<p class=\"left\">"
    + container.escapeExpression(((helper = (helper = helpers.TotalLog || (depth0 != null ? depth0.TotalLog : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"TotalLog","hash":{},"data":data}) : helper)))
    + " Logs</p>\r\n</div>\r\n\r\n<div class=\"timeline\">\r\n	\r\n</div>\r\n\r\n<div class=\"note\">\r\n	<!--<p>Backbone.js + jQuery + Handlebars</p>-->\r\n	<!--<p>Based on design by XXIIVV</p>-->\r\n</div>";
},"useData":true});
templates['log-template'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "​\r\n	   	<div class=\"logs\" category=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.category : stack1), depth0))
    + "\">\r\n	   		<svg>\r\n				<circle cx=\"70\" cy=\"70\" r=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.size : stack1), depth0))
    + "\" class=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.category : stack1), depth0))
    + "\"></circle>\r\n			</svg>\r\n	   		<div class=\"text\">\r\n	   			<b>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.name : stack1), depth0))
    + "</b>\r\n	   			<span>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.percent : stack1), depth0))
    + "%</span>\r\n	   			<p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.hours : stack1), depth0))
    + " Hours</p>\r\n	   			\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.singular : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "	   		</div>\r\n	   	</div>​\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "					<p>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.logs : stack1), depth0))
    + " Log</p>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "					<p>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.logs : stack1), depth0))
    + " Logs</p>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div class=\"logsWrapper header\">\r\n	<a class=\"topNav\" href=\"/\"><h1>Timesheet</h1></a>\r\n	<a class=\"topNav\" href=\"/#timeline\"><h1>Timeline</h1></a>\r\n	<a class=\"topNav\" href=\"/#new\"><h1>New Log</h1></a>	\r\n	<p class=\"left\">"
    + alias4(((helper = (helper = helpers.TotalLog || (depth0 != null ? depth0.TotalLog : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"TotalLog","hash":{},"data":data}) : helper)))
    + " Logs</p>\r\n</div>\r\n\r\n<div class=\"graph\">\r\n	<svg>\r\n		<path id=\"polyline4\" style=\"fill:none;stroke:#222;stroke-width:1\" stroke-dasharray=\"1,2\"></path>\r\n		<path id=\"polyline3\" style=\"fill:none;stroke:#72dec2;stroke-width:1\"></path>\r\n		<path id=\"polyline2\" style=\"fill:none;stroke:red;stroke-width:1\"></path>\r\n		<path id=\"polyline1\" style=\"fill:none;stroke:#000;stroke-width:1\"></path>\r\n	</svg>\r\n\r\n	<p class=\"oldest\">"
    + alias4(((helper = (helper = helpers.OldestLog || (depth0 != null ? depth0.OldestLog : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"OldestLog","hash":{},"data":data}) : helper)))
    + "</p>\r\n	<p class=\"newest\">"
    + alias4(((helper = (helper = helpers.NewestLog || (depth0 != null ? depth0.NewestLog : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"NewestLog","hash":{},"data":data}) : helper)))
    + "</p>\r\n	<div class=\"legend\">\r\n		<span class=\"legend1\" category=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.category : stack1), depth0))
    + "\"><div></div><p>visual</p></span>\r\n		<span class=\"legend2\" category=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.category : stack1), depth0))
    + "\"><div></div><p>design</p></span>\r\n		<span class=\"legend3\" category=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.category : stack1), depth0))
    + "\"><div></div><p>development</p></span>\r\n	</div>\r\n	<p class=\"total\">"
    + alias4(((helper = (helper = helpers.TotalHours || (depth0 != null ? depth0.TotalHours : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"TotalHours","hash":{},"data":data}) : helper)))
    + " Hours</p>\r\n</div>\r\n\r\n<div class=\"logsWrapper\">\r\n  	"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.LogSubCategories : depth0)) != null ? stack1.models : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\r\n\r\n<div class=\"note\">\r\n	<!--<p>Backbone.js + jQuery + Handlebars</p>-->\r\n	<!--<p>Based on design by XXIIVV</p>-->\r\n</div>";
},"useData":true});
templates['new-template'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"logsWrapper header\">\r\n	<a class=\"topNav\" href=\"/\"><h1>Timesheet</h1></a>\r\n	<a class=\"topNav\" href=\"/#timeline\"><h1>Timeline</h1></a>\r\n	<a class=\"topNav\" href=\"/#new\"><h1>New Log</h1></a>	\r\n	<p class=\"left\">"
    + container.escapeExpression(((helper = (helper = helpers.TotalLog || (depth0 != null ? depth0.TotalLog : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"TotalLog","hash":{},"data":data}) : helper)))
    + " Logs</p>\r\n</div>";
},"useData":true});
templates['viewtwo'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"logsWrapper header\">\r\n	<h1>View Two</h1>\r\n</div>";
},"useData":true});
})();
var config = require("../app-frontend-config");
var app = window.app;

require("../factories/dom-factory");
require("../components/main-component");

app.appController = (function() {
    
    var domFactory = app.domFactory;
	var mainComponent = app.mainComponent;
    
    // set page metadata
    document.title = "blah";
    
    // add theme config to body tag
    document.body.classList.add(config().theme.ui.start);
    
    // add main wrap
	var id = "app";
    var container = domFactory.addElement("main", document.body, { id: id });
	
	// render components into container
	mainComponent.render(id);
    
})();
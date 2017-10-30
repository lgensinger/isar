/*************************** STYLE ***************************/

// app stylesheets

// design system

// base platform

// global components

// main

// themes

// secondary platforms

/*************************** CONFIGS ***************************/

// app configuration
require("./app-frontend-config");

/*************************** MODULES ***************************/

// app initialized
var app = window.app = (function(app) {
    app.init = function() {
        //init other stuff if needed
    };
    return app;
}(app || {}));

// initialize app
app.init();

// vanilla JS modules
require("./factories");
require("./controllers");

// React JS modules
require("./components");
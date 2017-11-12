/*************************** STYLE ***************************/

// app stylesheets
var styleBase = "./style/app/";
var platformBase = styleBase + "platforms/";
var themeBase = styleBase + "themes/";

// design system
require("./style/app/system");

// base platform
require(platformBase + "desktop.scss");

// global components
require("./style/app/global");

// main

// themes
require(themeBase + "dark.scss");
require(themeBase + "light.scss");
require("./style/app/themes/light");

// secondary platforms
require(platformBase + "desktop-small.scss");

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
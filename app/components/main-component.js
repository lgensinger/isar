var app = window.app;

var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require("create-react-class");

(function() {
    
    var payPeriod = [
        { name: "blah" },
        { name: "de" }
    ];
    
    var timekeeper = createReactClass({
        
        displayName: "timekeeper",
        
        render: function() {
            
            return (
                React.createElement(
                  "ul",
                  null,
                  payPeriod.map(function (week) {
                    return React.createElement(
                      "li",
                      null,
                      week.name
                    );
                  })
                )
            );
            
        }
        
    });
    
    ReactDOM.render(
        React.createElement(timekeeper, {}),
        document.getElementById("app")
    );
    
})();
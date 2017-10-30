var app = window.app;

var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require("create-react-class");

(function() {
    
    var initiatives = [
		{ name: "big data accessibility" },
        { name: "cognative computing" },
		{ name: "cyber security" },
		{ name: "identity" },
        { name: "urban informatics" }
    ];
    
	// aggregate list
	var aggregate = createReactClass({
        
        displayName: "aggregate map",
        
        render: function() {
            
            return (
				
				// component wrap
                React.createElement(
                  "div",
                  null,
                  initiatives.map(function (week) {
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
        React.createElement(aggregate, {}),
        document.getElementById("aggregate")
    );
    
})();
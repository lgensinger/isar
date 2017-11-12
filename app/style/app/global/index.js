var list = [
    "aggregate",
	"aggregate-list",
    "area-circle-chart",
    "personnel",
    "progress-list",
    "ring-chart"
];

// add dependent modules
for (var i=0; i < list.length; i++) {
    
    require("./" + list[i] + ".scss");
    
}
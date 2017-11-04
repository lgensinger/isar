// component prefixes
var list = [
	"aggregate",
	"aggregate-list",
    "main",
	"progress"
];

// add dependent modules
for (var i=0; i < list.length; i++) {
    
    require("./" + list[i] + "-component");
    
}
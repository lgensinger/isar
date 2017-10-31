// factory prefixes
var list = [
    "api",
    "data",
	"dom",
    "utils"
];

// add dependent modules
for (var i=0; i < list.length; i++) {
    
    require("./" + list[i] + "-factory");
    
}
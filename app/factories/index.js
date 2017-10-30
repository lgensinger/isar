// factory prefixes
var list = [
	"dom",
    "utils"
];

// add dependent modules
for (var i=0; i < list.length; i++) {
    
    require("./" + list[i] + "-factory");
    
}
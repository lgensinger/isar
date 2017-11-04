function config() {
    
    return {
        
        // theme
        theme: {
            ui: {
                start: "dark",
                opposite: "light"
            }
        },
		
		// layout specs
		layout: [
			{
				uid: "aggregate",
				components: [
					{
						uid: "aggregate-list",
						label: "initiatives",
						data: "initiatives"
					},
					{
						uid: "aggregate-list",
						label: "tasks",
						data: "tasks"
					}
				]
			},
			{
				uid: "progress",
				components: []
			}
		]
        
    };
    
}

module.exports = config;
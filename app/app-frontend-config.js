function config() {
    
    return {
        
        // theme
        theme: {
            ui: {
                start: "light",
                opposite: "dark"
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
                        uid: "ring-chart",
                        label: "mapping",
                        data: "rings"
                    },
					{
						uid: "aggregate-list",
						label: "foci",
						data: "foci"
					}
				]
			},
			{
				uid: "progress",
				components: [
					{
						uid: "personnel",
						label: "staff",
						data: "staff",
						components: [
							{
								uid: "area-circle-chart",
								label: "area",
								data: "staff"
							},
							{
								uid: "progress-list",
								label: "staff",
								data: "staff_list"
							}
						]
					},
					{
						uid: "foci",
						label: "foci",
						data: "foci",
						components: [
							{
								uid: "progress-card",
								label: "card",
								data: "foci"
							},
							{
								uid: "participation-list",
								label: "participation",
								data: "foci_list"
							}
						]
					}
				]
			}
		]
        
    };
    
}

module.exports = config;
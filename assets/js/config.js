function updateArrays(config) {
	switch (config.position) {
		case "A":
			winScenarios.x1.push(config.player);
			winScenarios.y1.push(config.player);
			winScenarios.d1.push(config.player);
			break;
		case "B":
			winScenarios.x2.push(config.player);
			winScenarios.y1.push(config.player);
			break;
		case "C":
			winScenarios.x3.push(config.player);
			winScenarios.y1.push(config.player);
			winScenarios.d2.push(config.player);
			break;
		case "D":
			winScenarios.x1.push(config.player);
			winScenarios.y2.push(config.player);
			break;
		case "E":
			winScenarios.x2.push(config.player);
			winScenarios.y2.push(config.player);
			winScenarios.d1.push(config.player);
			winScenarios.d2.push(config.player);
			break;
		case "F":
			winScenarios.x3.push(config.player);
			winScenarios.y2.push(config.player);
			break;
		case "G":
			winScenarios.x1.push(config.player);
			winScenarios.y3.push(config.player);
			winScenarios.d2.push(config.player);
			break;
		case "H":
			winScenarios.x2.push(config.player);
			winScenarios.y3.push(config.player);
			break;
		case "I":
			winScenarios.x3.push(config.player);
			winScenarios.y3.push(config.player);
			winScenarios.d1.push(config.player);
			break;	
	}
}
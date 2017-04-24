const getDemoData = (index, points, xMin, xMax, yMin, yMax) => {
	let start = [
		{x: xMin, y: Math.random() * (yMax - yMin) + yMin},
		{x: xMax, y: Math.random() * (yMax - yMin) + yMin}
	];
	return {
		name: `Line #${index+1}`,
		points: start.concat(Array.apply(null, {length: points-2}).map(() => ({
			x: ((Math.random() * (xMax*4 - xMin) + xMin + 1)|0)/4,
			y: Math.random() * (yMax-yMin)+yMin
		}))).sort((a,b) => a.x - b.x)
	};
}

export default getDemoData;
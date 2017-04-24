# Line Graph React Component

A flexible line graph react component with transitions.

### [Demo](https://kfergin.github.io/line-graph-react-component/demos/first/)
Adjust the number of lines, number of points for each line, and X and Y axis labels. Points are positioned at random.

### Props
* `width`: **Number** The ratio of width to height. If you want the graph area to be a square, this should be `1`. `Default: 1.8`
* `lines`: **Array<{name: String, values:Array&lt;{x: Number, y: Number}>}>** Your data should be an array of objects, each representing a line. `Default: []`
* `xMin`: **Number** The minimum X value the graph should represent. `Default: 0`
* `xMax`: **Number** The maximum X value the graph should represent. `Default: 1`
* `yMin`: **Number** The minimum Y value the graph should represent. `Default: 0`
* `yMax`: **Number** The maximum Y value the graph should represent. `Default: 1`
* `xLabels`: **Array&lt;String> | Number** The x-axis labels. Either an array of labels or a number. If number, will display dots. Labels/dots are evenly spaced along the x-axis. `Default: []`
* `yLabels`: **Array&lt;String> | Number** The y-axis labels. Either an array of labels or a number. If number, will display horizontal lines. Labels/lines are evenly spaced along the y-axis. `Default: []`
* `colors`: **Array&lt;String>** An array of hex colors. If you have more lines than colors, it will just loop through these colors. `Default: Array with six colors`
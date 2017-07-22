# Line Graph React Component

A flexible line graph React component with transitions. Uses `<TransitionMotion/>` to animate graph elements as data changes.

> This component might be more useful as an example of how to use [React-Motion](https://github.com/chenglou/react-motion/) with graph elements since it might not be a "fit" for the graph you are trying to display.

## Demos
* **[Component Demo](https://kfergin.github.io/line-graph-react-component/demos/first/)** - Adjust the number of lines, number of points for each line, and X and Y axis labels. Points are positioned at random.
* **[Component Implementation](http://kalebferg.in/running/)** - I used a customized version of this component to display running data.

## Props
* `width`: **Number** The ratio of width to height. If you want the graph area to be a square, this should be `1`. `Default: 1.8`
* `lines`: **Array<{name: String, points:Array&lt;{x: Number, y: Number}>}>** Your data should be an array of objects, each representing a line. *Assumes points are sorted (by x-axis value).* `Default: []`
* `xMin`: **Number** The minimum X value of the graph. `Default: 0`
* `xMax`: **Number** The maximum X value of the graph. `Default: 1`
* `yMin`: **Number** The minimum Y value of the graph. `Default: 0`
* `yMax`: **Number** The maximum Y value of the graph. `Default: 1`
* `xLabels`: **Array&lt;String> | Number** The x-axis labels. Either an array of labels or a number. If number, will display dots. Labels/dots are evenly spaced along the x-axis. `Default: []`
* `yLabels`: **Array&lt;String> | Number** The y-axis labels. Either an array of labels or a number. If number, will just display horizontal lines. Labels/lines are evenly spaced along the y-axis. `Default: []`
* `colors`: **Array&lt;String>** An array of colors. If you have more lines than colors, it will just loop through the color array. `Default: Array with six colors`
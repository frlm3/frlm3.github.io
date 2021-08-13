function monta_grafico(){
	
	document.getElementById("grafico").innerHTML = "";

	var data = [];
	
	for (let i = 0; i <= rodadas; i++) {
		var date = new Date();
		var ponto = {};
		dia = date.addDays(i);
		ponto.date = dia;
		ponto.close = precos[i];
		data.push(ponto);
	} 

	// set the dimensions and margins of the graph
	var margin = {top: 10, right: 10, bottom: 30, left: 40},
		width = document.getElementById("grafico").clientWidth - margin.left - margin.right,
		height = document.getElementById("grafico").clientHeight - margin.top - margin.bottom;

	// parse the date / time
	var parseTime = d3.timeParse("%Y-%m-%d");

	// set the ranges
	var x = d3.scaleTime().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);

	// define the line
	var valueline = d3.line()
		.x(function(d) { return x(d.date); })
		.y(function(d) { return y(d.close); });

	var svg = d3.select("#grafico").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform",
			  "translate(" + margin.left + "," + margin.top + ")");

	  // Scale the range of the data
	  x.domain(d3.extent(data, function(d) { return d.date; }));
	  //y.domain([0, d3.max(data, function(d) { return d.close; })]);//.nice();
		y.domain([0, d3.max(data, function(d) { return d.close > 200 ? d.close : 200; })]).nice();
		
	  // Add the valueline path.
	  svg.append("path")
		  .data([data])
		  .attr("class", "line")
		  .attr("d", valueline);



	  // Add the Y Axis
	  svg.append("g")
		  .attr("class", "axis")
		  .call(d3.axisLeft(y));
	
// gridlines in y axis function
function make_y_gridlines() { return d3.axisLeft(y).ticks(); }
	
  // add the Y gridlines
  svg.append("g")			
      .attr("class", "grid")
      .call(make_y_gridlines()
          .tickSize(-width)
          .tickFormat("")
      )
		.style("stroke-dasharray", ("3, 3"))
		.lower();;
	
		  // Add the X Axis
	  svg.append("g")
		  .attr("class", "axis")
		  .attr("transform", "translate(0," + height + ")")
		  .call(d3.axisBottom(x)
				  .tickFormat(d3.timeFormat("%d/%m")))
		  .selectAll("text")	
			.style("text-anchor", "center")
			.attr("dx", "0em")
			.attr("dy", "1em");
	
	svg.append("rect")
	.attr("x", 0)
	.attr("y", 0)
	.attr("width", width)
	.attr("height", height)
	.style("fill", "#6E6E6E50")
	.lower();

}
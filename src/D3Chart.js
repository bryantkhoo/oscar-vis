import * as d3 from "d3";
import nominated_films_data from "./datasets/nominated_films.csv";
import awarded_films_data from "./datasets/awarded_only_films.csv";
import awarded_details_data from "./datasets/top_10_awarded.csv";
import nominated_details_data from "./datasets/top_10_nominated.csv";

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 300, RIGHT: 100 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

export default class D3Chart {
  constructor(element) {
    const vis = this;

    vis.svg = d3
      .select(element)
      .append("svg")
      //.attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      //.attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 800 500`)
      .classed("svg-content-responsive", true)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    vis.tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    vis.xLabel = vis.svg
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 50)
      .attr("text-anchor", "middle");

    vis.yLabel = vis.svg
      .append("text")
      .attr("x", -(HEIGHT / 2))
      .attr("y", -50)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)");

    vis.xAxisGroup = vis.svg
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT})`);

    vis.yAxisGroup = vis.svg.append("g");

    d3.csv(nominated_films_data).then(function(dataset) {
      dataset = dataset.slice(0, 10);
      console.log(dataset);
      dataset.forEach(function(d) {
        d.nominated = +d.nominated;
        d.won = +d.won;
      });
      vis.nomineeData = dataset;
      vis.update(1);
    });

    d3.csv(awarded_films_data).then(function(dataset) {
      dataset = dataset.slice(0, 10);
      console.log(dataset);
      dataset.forEach(function(d) {
        d.won = +d.won;
      });
      vis.awardeeData = dataset;
    });

    d3.csv(awarded_details_data).then(function(dataset) {
      console.log(dataset);
      dataset.forEach(function(d) {
        d.won = +d.won;
      });
      vis.awardedDetailsData = dataset;
    });

    d3.csv(nominated_details_data).then(function(dataset) {
      console.log(dataset);
      dataset.forEach(function(d) {
        d.won = +d.won;
      });
      vis.nominatedDetailsData = dataset;
    });
  }

  update(topic) {
    const vis = this;

    if (topic === 1) {
      vis.data = vis.nomineeData;
      vis.xLabel.text(`Number of Awards/Nominations`);
      vis.yLabel
        .text(`Films`)
        .transition()
        .duration(500)
        .attr("y", -150);

      // update the axis scales for transition
      const x = d3
        .scaleLinear()
        .domain([0, d3.max(vis.data, d => d.nominated)])
        .range([0, WIDTH]);

      const y = d3
        .scaleBand()
        .domain(vis.data.map(d => d.film))
        .range([0, HEIGHT])
        .padding(0.4);

      const xAxisCall = d3.axisBottom(x);
      vis.xAxisGroup
        .attr("transform", `translate(0,${HEIGHT})`)
        .transition()
        .duration(500)
        .call(xAxisCall);

	  const yAxisCall = d3.axisLeft(y)
		  .ticks(8);
		  
      vis.yAxisGroup
        .transition()
        .duration(500)
        .call(yAxisCall)
		.selectAll("text")
		.style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
		.attr("transform", "rotate(-20)");

      // DATA JOIN
      const rectsNominated = vis.svg.selectAll("rect.nomRect").data(vis.data);

      // EXIT
      rectsNominated
        .exit()
        .transition()
        .duration(500)
        .attr("height", 0)
        .attr("width", 0)
        .remove();

      // UPDATE
      rectsNominated
        .transition()
        .duration(500)
        .attr("class", "nomRect")
        .attr("x", 0)
        .attr("y", d => y(d.film))
        .attr("height", y.bandwidth)
        .attr("width", d => x(d.nominated))
        .attr("fill", "#c3dce0");

      // ENTER
      rectsNominated
        .enter()
        .append("rect")
        .transition()
        .duration(500)
        .attr("class", "nomRect")
        .attr("x", 0)
        .attr("width", d => x(d.nominated))
        .attr("y", d => y(d.film))
        .attr("height", y.bandwidth)
        .attr("fill", "#c3dce0");

      // DATA JOIN
      const rectsWon = vis.svg.selectAll("rect.oscarRect").data(vis.data);

      // EXIT
      rectsWon
        .exit()
        .transition()
        .duration(500)
        .attr("height", 0)
        .attr("width", 0)
        .remove();

      // UPDATE
      rectsWon
        .transition()
        .duration(500)
        .attr("class", "oscarRect")
        .attr("x", 0)
        .attr("y", d => y(d.film))
        .attr("height", y.bandwidth)
        .attr("width", d => x(d.won))
        .attr("fill", "#78a5ad");

      // ENTER
      rectsWon
        .enter()
        .append("rect")
        .transition()
        .duration(500)
        .attr("class", "oscarRect")
        .attr("x", 0)
        .attr("width", d => x(d.won))
        .attr("y", d => y(d.film))
        .attr("height", y.bandwidth)
        .attr("fill", "#78a5ad");

      const rects = vis.svg.selectAll("rect");
      rects
        .on("mousemove", function(event) {
          vis.tooltip
            .style("top", d3.event.pageY - 51 + "px")
            .style("left", d3.event.pageX - 51 + "px");
        })
        .on("mouseover", function(d) {
          if (!d.nominated) {
            return;
          }
          vis.tooltip
            .transition()
            .duration(200)
            .style("opacity", 0.9);
          vis.tooltip
            .html(vis.getDetailsInTable(vis.nominatedDetailsData, d.film))
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY - 28 + "px");
        })
        .on("mouseout", function(d) {
          vis.tooltip.transition().style("opacity", 0);
        });

      vis.svg.selectAll(".mydots").remove();
      vis.svg.selectAll(".mylabels").remove();

      // create a list of keys
      let keys = ["Awarded", "Nominated"];

      // Usually you have a color scale in your chart already
      let color = d3
        .scaleOrdinal()
        .domain(keys)
        .range(["#78a5ad", "#c3dce0"]);

      // Add one dot in the legend for each name.
      let size = 20;
      vis.svg
        .selectAll("mydots")
        .data(keys)
        .enter()
        .append("rect")
        .attr("class", "mydots")
        .attr("x", WIDTH)
        .attr("y", function(d, i) {
          return HEIGHT - 100 + i * (size + 5);
        }) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size)
        .style("fill", function(d) {
          return color(d);
        });

      // Add one dot in the legend for each name.
      vis.svg
        .selectAll("mylabels")
        .data(keys)
        .enter()
        .append("text")
        .attr("class", "mylabels")
        .attr("x", WIDTH + size * 1.2)
        .attr("y", function(d, i) {
          return HEIGHT - 100 + i * (size + 5) + size / 2;
        }) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d) {
          return color(d);
        })
        .text(function(d) {
          return d;
        })
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle");
    } else if (topic === 2) {
      vis.data = vis.awardeeData;
      vis.xLabel.text(`Number of Awards/Nominations`);
      vis.yLabel
        .text(`Films`)
        .transition()
        .duration(500)
        .attr("y", -150);

      // update the axis scales for transition
      const x = d3
        .scaleLinear()
        .domain([0, d3.max(vis.data, d => d.won)])
        .range([0, WIDTH]);

      const y = d3
        .scaleBand()
        .domain(vis.data.map(d => d.film))
        .range([0, HEIGHT])
        .padding(0.4);

      const xAxisCall = d3.axisBottom(x);
      vis.xAxisGroup
        .attr("transform", `translate(0,${HEIGHT})`)
        .transition()
        .duration(500)
        .call(xAxisCall);

	  const yAxisCall = d3.axisLeft(y)
		  .ticks(8);
		  
      vis.yAxisGroup
        .transition()
        .duration(500)
        .call(yAxisCall)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
		.attr("transform", "rotate(-20)");

      // DATA JOIN
      const rectsWon = vis.svg.selectAll("rect").data(vis.data);

      // EXIT
      rectsWon
        .exit()
        .transition()
        .duration(500)
        .attr("height", 0)
        .attr("width", 0)
        .remove();

      // UPDATE
      rectsWon
        .transition()
        .duration(500)
        .attr("x", 0)
        .attr("y", d => y(d.film))
        .attr("height", y.bandwidth)
        .attr("width", d => x(d.won))
        .attr("fill", "#78a5ad");

      // ENTER
      rectsWon
        .enter()
        .append("rect")
        .transition()
        .duration(500)
        .attr("x", 0)
        .attr("width", d => x(d.won))
        .attr("y", d => y(d.film))
        .attr("height", y.bandwidth)
        .attr("fill", "#78a5ad");

      const rects = vis.svg.selectAll("rect");
      rects
        .on("mousemove", function(event) {
          vis.tooltip
            .style("top", d3.event.pageY - 51 + "px")
            .style("left", d3.event.pageX - 51 + "px");
        })
        .on("mouseover", function(d) {
          if (!d.won) {
            return;
          }
          vis.tooltip
            .transition()
            .duration(200)
            .style("opacity", 0.9);
          vis.tooltip
            .html(vis.getDetailsInTable(vis.awardedDetailsData, d.film))
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY - 28 + "px");
        })
        .on("mouseout", function(d) {
          vis.tooltip.transition().style("opacity", 0);
        });

      vis.svg.selectAll(".mydots").remove();
      vis.svg.selectAll(".mylabels").remove();

      // create a list of keys
      let keys = ["Awarded"];

      // Usually you have a color scale in your chart already
      let color = d3
        .scaleOrdinal()
        .domain(keys)
        .range(["#78a5ad"]);

      // Add one dot in the legend for each name.
      let size = 20;
      vis.svg
        .selectAll("mydots")
        .data(keys)
        .enter()
        .append("rect")
        .attr("class", "mydots")
        .attr("x", WIDTH )
        .attr("y", function(d, i) {
          return HEIGHT - 100 + i * (size + 5);
        }) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size)
        .style("fill", function(d) {
          return color(d);
        });

      // Add one dot in the legend for each name.
      vis.svg
        .selectAll("mylabels")
        .data(keys)
        .enter()
        .append("text")
        .attr("class", "mylabels")
        .attr("x", WIDTH + size * 1.2)
        .attr("y", function(d, i) {
          return HEIGHT - 100 + i * (size + 5) + size / 2;
        }) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d) {
          return color(d);
        })
        .text(function(d) {
          return d;
        })
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle");
    }
  }
  getDetailsInTable(dataset, name) {
    let html = "<table border=1>";
    html += "<tr><th>Year</th><th>Category<th>Name</th><th>Winner</th></tr>";
    console.log(dataset);
    dataset.forEach(data => {
      console.log(data.film + " and " + name);
      if (data.film === name) {
        if (data.winner === "True") {
          html += '<tr bgcolor="#b8cad4">';
        } else {
          html += "<tr>";
        }
        html += "<td>" + data.year_ceremony + "</td>";
        html += "<td>" + data.category + "</td>";
        html += "<td>" + data.name + "</td>";
        html += "<td>" + data.winner + "</td>";
        html += "</tr>";
      }
    });
    html += "</table>";
    return html;
  }
}
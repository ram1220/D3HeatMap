import React, {
    Component
} from 'react';
import * as d3 from "d3";
import moment from "moment";

import json from './data.json';

class WeeKViewChart extends Component {

    componentDidMount() {
        this.drawChart(json);
    }

    drawChart(json) {

        const jsonData = json.map(function (obj) {
            return ({
                day: moment(obj.start).day(),
                hour: moment(obj.start).hours(),
                value: obj.sleepStatus
            });
        });
        console.log(jsonData);
        
        const margin = {
                top: 50,
                right: 0,
                bottom: 100,
                left: 30
            },
            width = 960 - margin.left - margin.right,
            height = 430 - margin.top - margin.bottom,
            gridSize = Math.floor(width / 24),
            legendElementWidth = gridSize * 2,
            buckets = 9,
            data = [],
            colors = {
                'DEFAULT': "#ffffd9",
                'ASLEEP': "#d83131",
                'AWAKE': "#2889e2"
            },
            days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];


        days.forEach(function (d, di) {
            times.forEach(function (t, ti) {
                var objFound = jsonData.find(function (obj) {
                    return (obj.day === di && obj.hour === ti + 1);
                });
                data.push({
                    day: di + 1,
                    hour: ti + 1,
                    value: (objFound) ? objFound.value : 'DEFAULT'
                });
            });
        });

        console.log(data);

        const svg = d3.select("#heat-map").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.selectAll(".dayLabel")
            .data(days)
            .enter().append("text")
            .text(function (d) {
                return d;
            })
            .attr("x", 0)
            .attr("y", function (d, i) {
                return i * gridSize;
            })
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
            .attr("class", function (d, i) {
                return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis");
            });

        svg.selectAll(".timeLabel")
            .data(times)
            .enter().append("text")
            .text(function (d) {
                return d;
            })
            .attr("x", function (d, i) {
                return i * gridSize;
            })
            .attr("y", 0)
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + gridSize / 2 + ", -6)")
            .attr("class", function (d, i) {
                return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis");
            });

        const cards = svg.selectAll(".hour")
            .data(data, function (d) {
                return d.day + ':' + d.hour;
            });

        cards.enter().append("rect")
            .attr("x", function (d) {
                return (d.hour - 1) * gridSize;
            })
            .attr("y", function (d) {
                return (d.day - 1) * gridSize;
            })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("class", "hour bordered")
            .attr("width", gridSize)
            .attr("height", gridSize)
            .style("fill", function (d) {
                return colors[d.value]
            });
    }

    render() {
        return <div id = "heat-map"> </div>
    }
}

export default WeeKViewChart;
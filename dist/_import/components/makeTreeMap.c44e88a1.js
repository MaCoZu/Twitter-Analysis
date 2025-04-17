import * as d3 from "../../_npm/d3@7.9.0/e780feca.js";

export function makeTreeMap(data, options = {}) {
    const {
        container = null,
        width = 900,
        height = 600,
        colorScheme = d3.schemeTableau10,
        tileMethod = d3.treemapSquarify,
        legendFontSize = 14,
        hoverFontSize = "14px",
        metricName = "Count",
        showText = true  // New option to control initial text visibility
    } = options;

    // Select the container dynamically if provided
    const actualWidth = container ? d3.select(container).node().clientWidth : width;

    const color = d3.scaleOrdinal(
        data.children.map(d => d.name),
        colorScheme
    );

    const sortedGroups = data.children
        .map(group => ({
            name: group.name,
            totalSize: d3.sum(group.children, d => d.value || 0)
        }))
        .sort((a, b) => b.totalSize - a.totalSize);

    const root = d3
        .treemap()
        .tile(tileMethod)
        .size([width, height])
        .padding(1)
        .round(true)(
            d3.hierarchy(data)
                .sum(d => d.value || 0)
                .sort((a, b) => b.value - a.value)
        );

    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width + 300, height])
        .attr("width", width + 200)
        .attr("height", height)
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    const leaf = svg
        .selectAll("g")
        .data(root.leaves())
        .join("g")
        .attr("transform", d => `translate(${d.x0},${d.y0})`);

    const format = d3.format(",d");

    // Tooltip for full text on hover
    const tooltip = d3.select(container)
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("padding", "5px")
        .style("background", "#fff")
        .style("border", "1px solid #ccc")
        .style("border-radius", "3px")
        .style("box-shadow", "0 2px 4px rgba(0,0,0,0.2)")
        .style("pointer-events", "none")
        .style("opacity", 0)
        .style("font-size", hoverFontSize);

    leaf.append("title")
        .text(d => {
            const ancestors = d.ancestors().reverse();
            const screenName = ancestors[1]?.data.name || "Unknown";
            const tweet = d.data.name || "No Tweet";
            const size = format(d.value || 0);
            return `${screenName}\n${tweet}\n${metricName}: ${size}`;
        });

    leaf.append("rect")
        .attr("fill", d => {
            while (d.depth > 1) d = d.parent;
            return color(d.data.name);
        })
        .attr("fill-opacity", 0.6)
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0);

    // Text inside each rectangle
    const textElements = leaf.append("foreignObject")
        .attr("x", 2)
        .attr("y", 2)
        .attr("width", d => Math.max(0, d.x1 - d.x0 - 4))
        .attr("height", d => Math.max(0, d.y1 - d.y0 - 4))
        .append("xhtml:div")
        .attr("class", "leaf-text")
        .style("font-size", "18px")
        .style("line-height", "1.2")
        .style("overflow", "hidden")
        .style("text-overflow", "ellipsis")
        .style("display", showText ? null : "none") // Set visibility based on option
        .style("padding", "4px")
        .text(d => {
            const rectWidth = d.x1 - d.x0;
            const maxChars = Math.floor(rectWidth / 9);
            return d.data.name.length > maxChars
                ? `${d.data.name.slice(0, maxChars)}...`
                : d.data.name;
        });

    

    function formatTooltipText(screenName, tweet, metricName, size, fontSize) {
        return 
    }

    // Show full text on hover
    leaf.on("mouseover", (event, d) => {
        const ancestors = d.ancestors().reverse();
        const screenName = ancestors[1]?.data.name || "Unknown";
        const tweet = d.data.name || "No Tweet";
        const size = format(d.value || 0);
        tooltip
            .style("opacity", 1)
            .html(`<div style="font-size: ${hoverFontSize}; line-height: 1.8;">
                <strong>${screenName}</strong><br>${tweet}<br>${metricName}: ${size}
            </div>`)
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY + 10}px`);
    }).on("mouseout", () => {
        tooltip.style("opacity", 0);
    });

    // Legend
    const legend = svg.append("g")
        .attr("transform", `translate(${width + 20}, 20)`);

    legend.selectAll("g")
        .data(sortedGroups)
        .join("g")
        .attr("transform", (d, i) => `translate(0, ${i * 20})`)
        .call(g => {
            g.append("rect")
                .attr("width", 15)
                .attr("height", 15)
                .attr("fill", d => color(d.name));

            g.append("text")
                .attr("x", 20)
                .attr("y", 12)
                .attr("font-size", legendFontSize)
                .text(d => `${d.name}`);
        });

    return svg.node();
}

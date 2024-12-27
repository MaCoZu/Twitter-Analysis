import * as d3 from "npm:d3";

export function makeTreeMap(data, options = {}) {
    const { width = 800, height = 800, colorScheme = d3.schemeTableau10, tileMethod = d3.treemapSquarify } = options;

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
        .attr("viewBox", [0, 0, width + 200, height])
        .attr("width", width + 200)
        .attr("height", height)
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    const leaf = svg
        .selectAll("g")
        .data(root.leaves())
        .join("g")
        .attr("transform", d => `translate(${d.x0},${d.y0})`);

    const format = d3.format(",d");
    leaf.append("title").text(d => {
        const ancestors = d.ancestors().reverse();
        const screenName = ancestors[1]?.data.name || "Unknown";
        const tweet = d.data.name || "No Tweet";
        const size = format(d.value || 0);
        return `${screenName}\n${tweet}\nLikes: ${size}`;
    });

    leaf.append("rect")
        .attr("fill", d => {
            while (d.depth > 1) d = d.parent;
            return color(d.data.name);
        })
        .attr("fill-opacity", 0.6)
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0);

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
                .attr("font-size", "14px")
                .text(d => `${d.name}`);
        });

    return svg.node();
}
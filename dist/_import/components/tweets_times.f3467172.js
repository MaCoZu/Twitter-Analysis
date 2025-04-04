    import * as d3 from "../../_npm/d3@7.9.0/7055d4c5.js";

    export function tweets_ym(data, parentId, { width }) {
        if (!document.querySelector(parentId)) {
            console.error(`Parent element ${parentId} does not exist yet.`);
            return;
        }

        if (!document.querySelector(parentId)) {
            console.error(`Element ${parentId} not found`);
            return;
        }

        // Clear any existing content in the parent container
        d3.select(parentId).selectAll("*").remove();

        // Group data by year
        const groupedByYear = d3.group(data, d => d.date.getFullYear());


        // Set the dimensions and margins of the graph
        const margin = { top: 60, right: 90, bottom: 40, left: 50 };
        const height = (width * 0.55) - margin.top - margin.bottom;

        // Append the SVG object to the container
        const svg = d3.select(parentId)
            .append("svg")
            .attr("viewBox", `0 0 ${width} ${height + margin.top + margin.bottom}`) // Responsive scaling
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)

        const chartArea = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X axis (Months only)
        const x = d3.scalePoint()
            .domain(d3.range(1, 13))
            .range([0, width]);

        chartArea.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x)
                .tickFormat(d => d3.timeFormat("%b")(new Date(2006, d - 1, 1)))
                .tickSize(6)
                .tickPadding(15)
                .tickSizeOuter(0));

        // Y axis (Count scale)
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.count)])
            .range([height, 0]);

        chartArea.append("g")
            .call(d3.axisLeft(y).ticks(5).tickSize(6)
                .tickSizeOuter(0)
                .tickPadding(5)
                .tickFormat(d3.format("~s")))
            .selectAll(".tick text")
            .style("visibility", (d, i, nodes) => {
                return i === 0 ? "hidden" : "visible";
            });

        // Add vertical gridlines
        chartArea.selectAll("line.vertical-grid")
            .attr("class", "vertical-grid")
            .data(x.domain())
            .enter()
            .append("line")
            .attr("x1", d => x(d))
            .attr("x2", d => x(d))
            .attr("y1", 0)
            .attr("y2", height)
            .attr("stroke", "gray")
            .attr("stroke-width", 0.3);

        // Add a single tooltip div to the container
        const tooltip = d3.select(parentId)
            .append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("font-family", "sans-serif") 
            .style("font-size", "16px")
            .style("background", "white")
            .style("border", "1px solid #ddd")
            .style("opacity", 1)
            .style("transition", "opacity 0.2s")
            .style("box-shadow", "0 2px 5px rgba(0,0,0,0.1)")
            .style("padding", "8px")
            .style("border-radius", "4px")
            .style("display", "none")
            .style("pointer-events", "none")
            .style("z-index", "10");
        

        // Add lines for each year
        const line = d3.line()
            .x(d => x(d.date.getMonth() + 1))
            .y(d => y(d.count));

        // Get the years in sorted order
        const years = Array.from(groupedByYear.keys()).sort((a, b) => b - a);

        // Draw each line and add tooltip interactivity
        years.forEach((year, i) => {
            // Append the line for the current year
            const path = chartArea.append("path")
                .datum(groupedByYear.get(year)) // Bind the data for the current year
                .attr("fill", "none")
                .attr("stroke", d3.schemeCategory10[i % 10]) // Line color
                .attr("stroke-width", 2)
                .attr("d", line);
            
            // Tooltip interactivity for each line
            path.on("mouseover", (event, d) => {
                // Show the tooltip with details
                tooltip.style("display", "block")
                    .html(`
                            <strong>Year: ${year}</strong><br>
                            Count: ${d3.sum(d, d => d.count)}
                        `);
            })
            
                .on("mousemove", (event) => {
                    const [x, y] = d3.pointer(event, chartArea.node());

                    tooltip.style("left", `${x - 10}px`)
                        .style("top", `${y + 350}px`);
                })
                .on("mouseout", () => {
                    // Hide the tooltip
                    tooltip.style("display", "none");
                });
        });


            //   .on("mouseover", (event, d) => {
            //       // Show the tooltip
            //       tooltip.transition()
            //           .duration(200)
            //           .style("opacity", 0.9);

            //       // Use d3.pointer to get position relative to chart area
            //       const [x, y] = d3.pointer(event, chartArea.node());

            //       tooltip.html(`<strong>${d.month}</strong><br/>${d.count} tweets`)
            //           .style("left", `${x + 10}px`)
            //           .style("top", `${y + 10}px`);
            //   })
            // .on("mousemove", (event) => {
            //     // Use d3.pointer to get position relative to chart area
            //     const [x, y] = d3.pointer(event, chartArea.node());
            //     tooltip.style("left", `${x + 10}px`)
            //         .style("top", `${y + 10}px`);
            // })
            // .on("mousemove", (event) => {
            //     tooltip.style("left", `${event.offsetX + 10}px`)
            //         .style("top", `${event.offsetY - 40}px`);
            // })
            // .on("mouseout", () => {
            //     // Hide the tooltip
            //     tooltip.transition()
            //         .duration(500)
            //         .style("opacity", 0);
            // });

        const legend = svg.append("g")
            .attr("class", "chart-legend")
            .attr("transform", `translate(${width + margin.left * 1.5}, ${(height + margin.top) / 3})`);

        // Add legend entries for each year
        years.forEach((year, i) => {
            const legendEntry = legend.append("g")
                .attr("transform", `translate(0, ${i * 25})`);

            // Add color box
            legendEntry.append("circle")
                .attr("r", 7)
                .attr("fill", d3.schemeCategory10[i % 10]) // Assign color from color scheme
                .attr("cx", 0)
                .attr("cy", 0);

            // Add year label
            legendEntry.append("text")
                .attr("x", 20)
                .attr("y", 5)
                .text(year)
                .style("font", "18px sans-serif")
                .style("alignment-baseline", "middle");
        })

        // Title
        svg.append("text")
            .attr("class", "chart-title")
            .style("font", "bold 20px sans-serif")
            .attr("text-anchor", "middle")
            .attr("x", (width + margin.left + margin.right) / 2)
            .attr("y", margin.top / 2)
            .text("Number of Tweets over Time");

        // Return the SVG element or some indication of successful rendering
        return svg.node();
    }

    export function tweets_ym_classic(data, parentId, { width }) {

        d3.select(parentId).selectAll("*").remove();

        // Set the dimensions and margins of the graph
        const margin = { top: 60, right: 90, bottom: 60, left: 50 };
        const height = (width * 0.75) - margin.top - margin.bottom;

        // Append the SVG object to the container
        const svg = d3.select(parentId)
            .append("svg")
            .attr("viewBox", `0 0 ${width} ${height + margin.top + margin.bottom}`) // Responsive scaling
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)

        const chartArea = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X axis (Months only)
        const x = d3.scalePoint()
            .domain(d3.range(1, 13))
            .range([0, width]);

        chartArea.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x)
                .tickFormat(d => d3.timeFormat("%b")(new Date(2006, d - 1, 1)))
                .tickSize(6)
                .tickPadding(15)
                .tickSizeOuter(0));

        // Y axis (Count scale)
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.count)])
            .range([height, 0]);

        chartArea.append("g")
            .call(d3.axisLeft(y).ticks(5).tickSize(6)
                .tickSizeOuter(0)
                .tickPadding(5)
                .tickFormat(d3.format("~s")))
            .selectAll(".tick text")
            .style("visibility", (d, i, nodes) => {
                return i === 0 ? "hidden" : "visible";
            });


        // Add vertical gridlines
        chartArea.selectAll("line.vertical-grid")
            .attr("class", "vertical-grid")
            .data(x.domain())
            .enter()
            .append("line")
            .attr("x1", d => x(d))
            .attr("x2", d => x(d))
            .attr("y1", 0)
            .attr("y2", height)
            .attr("stroke", "gray")
            .attr("stroke-width", 0.3);

        // Add a single tooltip div to the container
        const tooltip = svg.append("div")
            .append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("background", "#fff")
            .style("border", "1px solid #ccc")
            .style("padding", "10px")
            .style("border-radius", "4px")
            .style("display", "none")
            .style("pointer-events", "none");

        // Add lines for each year
        const line = d3.line()
            .x(d => x(d.year_month.getMonth() + 1))
            .y(d => y(d.count));

        // Get the years in sorted order
        const groupedByYear = d3.group(data, d => d.year_month.getFullYear());
        const years = Array.from(groupedByYear.keys()).sort((a, b) => b - a);

        // Draw each line and add tooltip interactivity
        years.forEach((year, i) => {
            // Append the line for the current year
            const path = chartArea.append("path")
                .datum(groupedByYear.get(year)) // Bind the data for the current year
                .attr("fill", "none")
                .attr("stroke", d3.schemeCategory10[i % 10]) // Line color
                .attr("stroke-width", 2)
                .attr("d", line);

            // Tooltip interactivity for each line
            path.on("mouseover", (event, d) => {
                // Show the tooltip with details
                tooltip.style("display", "block")
                    .html(`
                            <strong>Year: ${year}</strong><br>
                            Count: ${d3.sum(d, d => d.count)}
                        `);
            })
                .on("mousemove", (event) => {
                    // Position the tooltip near the cursor
                    tooltip
                        .style("top", (event.pageY - 20) + "px")
                        .style("left", (event.pageX + 10) + "px");
                })
                .on("mouseout", () => {
                    // Hide the tooltip
                    tooltip.style("display", "none");
                });
        });

        const legend = svg.append("g")
            .attr("transform", `translate(${width + margin.left * 1.5}, ${(height + margin.top) / 3})`);

        // Add legend entries for each year
        years.forEach((year, i) => {
            const legendEntry = legend.append("g")
                .attr("transform", `translate(0, ${i * 25})`);

            // Add color box
            legendEntry.append("circle")
                .attr("r", 7)
                .attr("fill", d3.schemeCategory10[i % 10]) // Assign color from color scheme
                .attr("cx", 0)
                .attr("cy", 0);

            // Add year label
            legendEntry.append("text")
                .attr("x", 20)
                .attr("y", 5)
                .text(year)
                .style("font", "18px sans-serif")
                .style("alignment-baseline", "middle");
        })

        // Title
        svg.append("text")
            .attr("class", "chart-title")
            .style("font", "bold 24px sans-serif")
            .attr("text-anchor", "middle")
            .attr("x", (width + margin.left + margin.right) / 2)
            .attr("y", margin.top / 2)
            .text("Number of Tweets over Time");

        return svg.node();
    };
    export function user_onboarding(data, parentId, { width }) {
        // Set the dimensions and margins of the graph
        const margin = { top: 60, right: 40, bottom: 30, left: 40 };
        const height = (width * 0.55) - margin.top - margin.bottom;

        // Create tooltip
        const tooltip = d3.select(parentId)
            .append("div")
            .attr("class", "d3-tooltip")
            .style("position", "absolute")
            .style("background", "white")
            .style("border", "1px solid #ddd")
            .style("padding", "8px")
            .style("border-radius", "4px")
            .style("pointer-events", "none")
            .style("opacity", 0)
            .style("transition", "opacity 0.2s")
            .style("box-shadow", "0 2px 5px rgba(0,0,0,0.1)")
            .style("z-index", "10");

        // Append the SVG object to the container
        const svg = d3.select(parentId)
            .append("svg")
            .attr("viewBox", `0 0 ${width} ${height + margin.top + margin.bottom}`)
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("width", width)
            .attr("height", height + margin.top + margin.bottom);

        const chartArea = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X-axis: Time scale formatted as years
        const x = d3.scaleTime()
            .domain(d3.extent(data, d => d.week)) // Min and max dates
            .range([0, width - margin.left - margin.right]);

        // Primary Y-axis: Weekly count (bars)
        const y1 = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.weekly_count)]) // Weekly count range
            .nice()
            .range([height, 0]);

        // Secondary Y-axis: Cumulative count (line)
        const y2 = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.cum_count)]) // Cumulative count range
            .nice()
            .range([height, 0]);

        // Add X-axis
        chartArea.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(
                d3.axisBottom(x)
                    .ticks(d3.timeYear.every(1))
                    .tickFormat(d3.timeFormat("%Y"))
                .tickPadding(15).tickSize(6)
            )
            .selectAll("text")
            .style("text-anchor", "middle");

        // Add primary Y-axis (left) for weekly count
        chartArea.append("g")
            .call(d3.axisLeft(y1).ticks(4).tickPadding(5).tickSize(4))
            .call(g => g.append("text")
                .attr("x", width / 9)
                .attr("y", height / 14)
                .attr("fill", "steelblue")
                .attr("text-anchor", "middle")
                .text("Weekly Count"));

        // Add secondary Y-axis (right) for cumulative count
        chartArea.append("g")
            .attr("transform", `translate(${width - margin.left - margin.right}, 0)`)
            .call(d3.axisRight(y2).ticks(5).tickPadding(5).tickSize(4))
            .call(g => g.append("text")
                .attr("x", -width /7 )
                .attr("y", height/14)
                .attr("fill", "maroon")
                .attr("text-anchor", "middle")
                .text("Cumulative Count"));

        // Add bars for weekly count
        const barWidth = (width / data.length) * 0.8; // Dynamically adjust bar width

        // Add the area chart for weekly count
        const area = d3.area()
            .x(d => x(d.week))
            .y0(height) // Baseline of the area
            .y1(d => y1(d.weekly_count)); // Height of the area based on weekly count

        chartArea.append("path")
            .datum(data)
            .attr("fill", "steelblue")
            .attr("opacity", 0.6) // Make the area semi-transparent
            .attr("stroke", "none")
            .attr("d", area);
        
        // Add line for cumulative count
        const line = d3.line()
            .x(d => x(d.week))
            .y(d => y2(d.cum_count));

        chartArea.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "maroon")
            .attr("stroke-width", 2)
            .attr("d", line);
        
        svg.append("text")
            .attr("class", "chart-title")
            .style("font", "bold 20px sans-serif")
            .attr("text-anchor", "middle")
            .attr("x", (width + margin.left) / 2)
            .attr("y", margin.top / 2)
            .text("New users per week");
        
        svg.append("text")
            .attr("class", "chart-title")
            .style("font", "16px sans-serif")
            .attr("text-anchor", "middle")
            .attr("x", (width + margin.left) / 2)
            .attr("y", margin.top / 1.2)
            .text("First tweet by user as a proxy for new arrival.");
        

        return svg.node();
    }

    export function tweets_monthly(data, parentId, { width }) {

        d3.select(parentId).selectAll("*").remove();

        // Set the dimensions and margins of the graph
        const margin = { top: 60, right: 30, bottom: 30, left: 50 };
        const height = (width * 0.75) - margin.top - margin.bottom;

        // Append the SVG object to the container
        const svg = d3.select(parentId)
            .append("svg")
            .attr("viewBox", `0 0 ${width} ${height + margin.top + margin.bottom}`) // Responsive scaling
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)

        const chartArea = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X axis (Categorical for day names)
        const x = d3.scaleBand()
            .range([0, width])
            .domain(data.map(d => d.month)) // Use day names as strings/categories
            .padding(0.2);

        chartArea.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x)
                .tickFormat(d => d.slice(0, 1))
                .tickSize(6)
                .tickPadding(15)
                .tickSizeOuter(0)
            )


        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.count)])
            .range([height, 0]);


        chartArea.append("g")
            .call(d3.axisLeft(y)
                .ticks(5)
                .tickFormat(d => d3.format("~s")(d))
                .tickSize(6)
                .tickPadding(5)
                .tickSizeOuter(0))
            .selectAll(".tick text")
            .style("visibility", (d, i, nodes) => {
                return i === 0 ? "hidden" : "visible";
            });

        // const tooltip = d3.select(parentId).append("div")
        //     .attr("class", "tooltip")
        //     .style("opacity", 0)
        //     .style("position", "absolute")
        //     .style("background", "#fff")
        //     .style("border", "1px solid #ccc")
        //     .style("padding", "10px")
        //     .style("border-radius", "4px")
        //     .style("pointer-events", "none");

        const tooltip = d3.select(parentId)
            .append("div")
            .attr("class", "d3-tooltip")
            .style("position", "absolute")
            .style("background", "white")
            .style("border", "1px solid #ddd")
            .style("padding", "8px")
            .style("border-radius", "4px")
            .style("pointer-events", "none")
            .style("opacity", 0)
            .style("transition", "opacity 0.2s")
            .style("box-shadow", "0 2px 5px rgba(0,0,0,0.1)")
            .style("z-index", "10");

        // Bars
        chartArea.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.month))
            .attr("y", d => y(d.count))
            .attr("width", x.bandwidth())
            .attr("height", d => height - 1 - y(d.count))
            .attr("fill", "teal")
            .on("mouseover", (event, d) => {
                // Show the tooltip
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0.9);

                // Use d3.pointer to get position relative to chart area
                const [x, y] = d3.pointer(event, chartArea.node());

                tooltip.html(`<strong>${d.month}</strong><br/>${d.count} tweets`)
                    .style("left", `${x + 10}px`)
                    .style("top", `${y + 10}px`);
            })
            .on("mousemove", (event) => {
                // Use d3.pointer to get position relative to chart area
                const [x, y] = d3.pointer(event, chartArea.node());
                tooltip.style("left", `${x + 10}px`)
                    .style("top", `${y + 10}px`);
            })
            .on("mousemove", (event) => {
                tooltip.style("left", `${event.offsetX + 10}px`)
                    .style("top", `${event.offsetY - 40}px`);
            })
            .on("mouseout", () => {
                // Hide the tooltip
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svg.append("text")
            .attr("class", "chart-title")
            .attr("x", (width + margin.left + margin.right) / 2)
            .attr("y", margin.top / 1.5)
            .attr("text-anchor", "middle")
            .style("font", "bold 22px sans-serif")
            .text("Average Monthly Tweets");

        return svg.node();
    }

    export default function tweets_hour(parentId) {
        // Set the dimensions and margins of the graph
        const margin = { top: 60, right: 30, bottom: 30, left: 50 },
            width = 400 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;


        // Append the SVG object to the container
        const svg = d3.select(containerId)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)

        const chartArea = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const parseDate = d3.timeParse("%d");

        // Parse the Data
        d3.csv("./data/times_daily.csv").then(data => {
            // Convert count to a number
            data.forEach(d => {
                d.count = +d.avg_daily_tweets;
            });

            // X axis (Categorical for day names)
            const x = d3.scaleBand()
                .range([0, width])
                .domain(data.map(d => d.day)) // Use day names as strings/categories
                .padding(0.2);

            chartArea.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x)
                    .tickFormat(d => d.slice(0, 3))
                    .tickSize(6)
                    .tickPadding(15)
                    .tickSizeOuter(0)
                );

            // Add Y axis
            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.count)])
                .range([height, 0]);


            chartArea.append("g")
                .call(d3.axisLeft(y).ticks(4)
                    .tickFormat(d => d3.format(".0f")(d))
                    .tickSize(6)
                    .tickPadding(5)
                    .tickSizeOuter(0))
                .selectAll(".tick text")
                .style("visibility", (d, i, nodes) => {
                    return i === 0 ? "hidden" : "visible";
                });

            // Bars
            chartArea.selectAll(".bar")
                .data(data)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", d => x(d.day))
                .attr("y", d => y(d.count))
                .attr("width", x.bandwidth())
                .attr("height", d => height - 1 - y(d.count))
                .attr("fill", "#69b3a2")

        });


        // Title
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("class", "chart-title")
            .style("font", "bold 24px sans-serif")
            .attr("x", (width + margin.left + margin.right) / 2)
            .attr("y", margin.top / 2)
            .text("Average Daily Tweets");
    }
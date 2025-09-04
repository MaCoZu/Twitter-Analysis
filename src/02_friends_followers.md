---
title: Friends & Followers
toc: false
style: custom-style.css
---

<style>
.chart-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center; 
  max-width: 750px; 
  justify-content: center; /* Center horizontally */
  margin: 20px auto; /* Center the container within the page and add spacing */
  text-align: center; /* Match the alignment with text */
}

.text-container {
  text-align: left; 
  margin: 20px auto; 
  max-width: 1200px; 
  line-height: 1.4; 
  font-size: 22px;
  font-family: "Calibri", Arial, sans-serif;
}


.plot-title {
  font-size: 28px;        /* Larger title font size */
  font-weight: bold;      /* Bold text */
  color: darkblue;        /* Title color */
  text-align: center;     /* Center the title */
  font-family: "Georgia", serif; /* Custom font family */
  margin-bottom: 20px;    /* Add spacing below the title */
  text-transform: uppercase; /* Uppercase letters */
  letter-spacing: 1px;    /* Spacing between letters */
  text-align: center;   /* Center the title */
  font-size: 28px;      /* Increase the font size */
  font-weight: bold;    /* Bold title */
  font-family: "Arial, sans-serif"; /* Custom font */
  margin-top: 20px;     /* Add spacing above */
}

  /* Default (Light Mode) */
  .chart-title, .chart-legend {
    fill: black; /* Title and legend text in black */
  }

  /* Dark Mode */
  @media (prefers-color-scheme: dark) {
    .chart-title, .chart-legend {
      fill: white; /* Title and legend text in white */
    }
  }

  svg {
    max-width: 100%; /* Ensure the SVG scales within its container */
    height: auto;    /* Maintain aspect ratio */
  }

.d3-tooltip {
    position: absolute;
    z-index: 50;
    pointer-events: none;
}

  /* Code block styling */
  pre code {
    font-family: "Fira Code",  monospace; /* Monospaced font for code */
    font-size: 14px;
    line-height: 1.4;
    overflow-x: auto; /* Allow horizontal scroll */
  }
</style>


<div class="chart-wrapper">
  <div class="text-container">
  <h2>Friends & Followers</h2>
    <p>
    Some accounts have a pretty outsized followership, which skews the distribution of followers. For instance, Trump has often been criticized for having an army of bots supporting him. His two Twitter accounts break the mold in terms of followers while having few friends. Despite the presence of a substantial bot network — <a href="https://en.wikipedia.org/wiki/Trump%27s_network">numbering in the tens of thousands</a> —  Trump can't be ignored. He remains an influential figure and people around the world closely monitor his statements to gauge the American mood. Additionally, Trump ranks highest in terms of likes and retweets, which has to be taken with a grain of salt, considering the bots.
    </p>
  </div>
</div>



```js
const data_ff = await FileAttachment("./data/follower_friends.csv").csv({ typed: true });
```


```js
const table_ff = Inputs.table(data_ff, {
  rows: 20,
  select: false,
  columns: ["name", "followers_count", "friends_count"],
  header: {
    name: "Name",
    followers_count: "Followers",
    friends_count: "Friends"
  },
  format: {
    followers_count: sparkbar(d3.max(data_ff, d => d.followers_count)), 
    friends_count: sparkbar(d3.max(data_ff, d => d.friends_count)), 
  }
 
})


function sparkbar(max) {
  return (x) => {
    const isOutside = x < max * 0.3; 
    return htl.html`
      <div style="
        position: relative;
        display: flex;
        align-items: center;
        height: 24px; 
      ">
        <!-- Bar -->
        <div style="
          background: var(--theme-green); /* Bar color */
          color: ${isOutside ? 'black' : 'white'}; /* Text color */
          font: 10px/1.7 var(--sans-serif); /* Font styling */
          width: ${100 * x / max}%; /* Bar width */
          height: 100%; /* Fill parent container height */
          padding: 2px 5px; /* Add padding for spacing */
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: ${isOutside ? 'start' : 'end'}; 
          z-index: 0;
        ">
          ${!isOutside ? x.toLocaleString("en-US") : ""}
        </div>

        <!-- Label Outside (conditionally rendered) -->
        ${isOutside
          ? htl.html`<span style="
               position: absolute;
              //  align-items: center;
               padding: 2px 5px;
               display: flex;
               left: calc(${100 * x / max}% + 10px); 
               top: 50%; /* Center vertically */
               transform: translateY(-50%);
               justify-content: 'start';
               white-space: nowrap; /* Prevent text wrapping */
               color: black; /* Label color */
               font: 10px/1.7 var(--sans-serif);
             ">
             ${x.toLocaleString("en-US")}
           </span>`
          : ""}
      </div>
    `;
  };
}


```

<div class="chart-wrapper">
  <div class="card" style="padding: 0; z-index: 50;">
    ${display(table_ff)}
  </div>
</div>


<div class="chart-wrapper">
  <div class="text-container">
  <h2>Distributions</h2>
  <p>
  The average (mean) followership is 162,434 while the median is just a tenth of that 16,732. Suggesting a highly skewed distribution of followership. The mean of followership without outliers is 18,179 (median: 14,061).
  </p>
  </div>
  </div>

<div class="chart-wrapper">
  <div>
    ${PlotFollowers(dataWithoutOutliers1)}
  </div>
</div>


```js
// Calculate IQR to identify outliers
const values = data_ff.map(d => d.followers_count).sort((a, b) => a - b);
const q1 = d3.quantile(values, 0.25);
const q3 = d3.quantile(values, 0.75);
const iqr = q3 - q1;
const lowerBound = q1 - 1.5 * iqr;
const upperBound = q3 + 1.5 * iqr;

// Filtered datasets
const dataWithOutliers1 = data_ff; // Original data
const dataWithoutOutliers1 = data_ff.filter(
  d => d.followers_count >= lowerBound && d.followers_count <= upperBound
);


// Create the histogram function
function PlotFollowers(data1) {
  return Plot.plot({
    marginBottom: 60,
    marginTop: 40,
    marginLeft: 60,
    title: `Distribution of Followers (without outlier)`,
        x: { 
        padding: 0.05,
        label: "Follower Count",
        ticks: 5, // Number of ticks
        tickSize: 4, // Length of tick lines
        tickPadding: 15, // Space between tick line and label
        tickFormat: d3.format("~s"), // Format (e.g., 1000 → 1k)
        label: "Friends", // Label for the axis
        labelOffset: 50, 
        },
    y: { 
        grid: true, 
        label: "",
        lablelOffset: 40,  
        labelAnchor: "center", 
        grid: true,   // Show horizontal gridlines
        ticks: 5,     // Control the number of ticks and gridlines
        tickSize: 0,  // Remove tick lines if grid is enabled
        },
     marks: [
       Plot.rectY(data1, Plot.binX({y: "count"}, {x: "followers_count", padding: 0.2, fill: "steelblue"}),
       ),
    Plot.ruleY([0])
  ],
  });
}
```

<div class="chart-wrapper">
  <div class="text-container">
  <p>
  Average friendships without outliers are 894 (median: 650) you can can see the sek by switching to 'with outliers'.
  </p>

 <div class="text-wrapper">

```js

import * as Inputs from "npm:@observablehq/inputs";

// Calculate IQR to identify outliers
const values = data_ff.map(d => d.friends_count).sort((a, b) => a - b);
const q1 = d3.quantile(values, 0.25);
const q3 = d3.quantile(values, 0.75);
const iqr = q3 - q1;
const lowerBound = q1 - 1.5 * iqr;
const upperBound = q3 + 1.5 * iqr;

// Filtered datasets
const dataWithOutliers = data_ff; // Original data
const dataWithoutOutliers = data_ff.filter(
  d => d.friends_count >= lowerBound && d.friends_count <= upperBound
);

// Create the histogram function
function HistogramPlot(data2) {
  return Plot.plot({
    marginBottom: 60,
    marginTop: 40,
    marginLeft: 60,
    title: `Distribution of Friends (${dropdown2.value})`,
        x: { 
        padding: 0.05,
        label: "Friends Count",
        ticks: 5, // Number of ticks
        tickSize: 4, // Length of tick lines
        tickPadding: 15, // Space between tick line and label
        tickFormat: d3.format("~s"), // Format (e.g., 1000 → 1k)
        label: "Friends", // Label for the axis
        labelOffset: 50, 
        },
    y: { 
        grid: true, 
        label: "Frequency",
        lablelOffset: 40,  
        labelAnchor: "center", 
        grid: true,   // Show horizontal gridlines
        ticks: 5,     // Control the number of ticks and gridlines
        tickSize: 0,  // Remove tick lines if grid is enabled
        },
    marks: [
      Plot.rectY(data2, Plot.binX({y: "count"}, {x: "friends_count", padding: 0.2, fill: "steelblue"})),
      Plot.ruleY([0])
    ]
  });
}

// Create dropdown and dynamic rendering logic
const container = document.createElement("div"); // Container for the dropdown and chart
const dropdown2 = Inputs.select(["With Outliers", "Without Outliers"], {
  label: "Filter outliers:",
  value: "Without Outliers"
});
container.appendChild(dropdown2);

const chartDiv = document.createElement("div"); // Container for the chart
container.appendChild(chartDiv);

// Function to update the chart dynamically
function updateChart() {
  const selectedData2 = dropdown2.value === "With Outliers" 
    ? dataWithOutliers 
    : dataWithoutOutliers;

  // Clear the previous chart
  chartDiv.innerHTML = "";

  // Render the updated chart
  chartDiv.appendChild(HistogramPlot(selectedData2));
}

// Add event listener to update the chart when the dropdown changes
dropdown2.addEventListener("input", updateChart);

// Initial render
updateChart();
display(container);

```
  </div>
 </div>


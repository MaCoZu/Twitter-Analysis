---
theme: dashboard
title: General Statistics
toc: true
---

```js
// import * as Plot from "@observablehq/plot";
```

<style>
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
    z-index: 10;
    pointer-events: none;
}

  /* Set line length */
  .content {
    max-width: 800px; /* Adjust line length */
    margin: 0 auto;   /* Center the content */
  }

  /* Change font type */
  body {
    /* font-family: "Calibri", Arial, sans-serif;  */
    line-height: 1.5; /* Improve readability */
    font-size: 20px;
  }

  /* Code block styling */
  pre code {
    font-family: "Fira Code",  monospace; /* Monospaced font for code */
    font-size: 14px;
    line-height: 1.4;
    overflow-x: auto; /* Allow horizontal scroll */
  }
</style>

# General 
<!-- Cards with big numbers -->

<div class="grid grid-cols-4 ">
  <div class="card">
    <h2>Twitter Accounts</h2>
    <span class="big">545</span>
  </div>
  <div class="card">
    <h2>Tweets</span></h2>
    <span class="big">1243370
    </span>
  </div>
  <div class="card">
    <h2>FROM</h2>
    <span class="big">08-2008</span>
  </div>
  <div class="card">
    <h2>TO</h2>
    <span class="big">06-2017</span>
  </div>
</div>


# Tweets over time

Twitter activity has risen continuously over the observed timespan. 

<div id="chart-ym"></div>
${resize((width) => data_ym && tweets_ym(data_ym, "#chart-ym", { width }))}

```js
import {tweets_ym} from "./components/tweets_times.js";

const parseDate = d3.timeParse("%m/%d/%Y");
const data_ym = await FileAttachment("./data/times_ym.csv")
  .csv({ typed: true })
  .then(rawData => rawData.map(d => ({
    date: parseDate(d.year_month),
    count: +d.count,
  })));
```

<!-- MonthlyPlot -->
```js

const tweetData = await FileAttachment("./data/times_monthly.csv").csv({ typed: true }) 
 
function MonthlyPlot(data, {width} = {}) {
  return Plot.plot({
  title: "Average Monthly Tweets",
    marginLeft: 60,
     x: {
      tickFormat: Plot.formatMonth(), // Format x-axis ticks to abbreviated month names
      ticks: 12, // Ensure there’s one tick for each month
      tickSize: 0,
      tickPadding: 20,
      label:""
    },
    y: {
      tickFormat: (d) => `${d / 1000}k`,
      tickSize: 0,
      ticks: 3,
      label:""
    },
    color: {
    type: "diverging",
    scheme: "GnBu"
  },
  marks: [
    Plot.barY(tweetData, {x: "m_number", y: "tweets", fill: "tweets", sort: "x",
        title: (d) => {
          const format = d3.format(",.0f"); // Format as a whole number with commas for thousands
          return `${d.Month}\n${format(d.tweets)} Tweets`;}}),

    Plot.ruleY([0])
  ]
})
}
```

<!-- DailyPlot  -->
```js
const data_daily = await FileAttachment("./data/times_daily.csv").csv({ typed: true }) 

function DailyPlot(data, {width}) {
  const weekdayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return Plot.plot({
  title: "Average Daily Tweets",
  marginLeft: 60,
  marginBottom: 40,
  x: {
    domain: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ], // Correct order
    label: "",
    tickSize: 0,
    tickPadding: 20, // Remove x-axis label
    tickFormat: (day) => day.slice(0, 3) 
  },
  y: {
    label: "", // Remove y-axis label
    ticks: 3, // Number of ticks
    tickSize: 0,

  },
  color: {
    type: "diverging",
    scheme: "GnBu"
  },
  marks: [
    Plot.barY(data_daily, {
      x: "day", // Use "day" for x-axis
      y: "avg_count", // Use "avg_daily_tweets" for y-axis
      fill: "avg_count", // Map fill to "avg_daily_tweets" for coloring
         title: (d) => {
          const format = d3.format(",.0f"); // Format as a whole number with commas for thousands
          return `${d.day}\n${format(d.avg_count)} Tweets`;}
    }),
    Plot.ruleY([0]) // Add a baseline at y = 0
  ]
})}
```

<div class="grid grid-cols-2">
  <div class="card">
    ${resize((width) => MonthlyPlot(tweetData, {width}))}
  </div>
  <div class="card">
    ${resize((width) =>   DailyPlot(data_daily, {width}))}
  </div>
</div>








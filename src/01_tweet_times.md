---
theme: dashboard
title: General Statistics
toc: true
---

<style>
.chart-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center; 
  margin: 0 auto; 
  max-width: 900px; 

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
    <h2>Tweets over time</h2>
    <p>
      Twitter activity has risen continuously over the observed timespan. After 2010, Twitter gained prominence as a tool for political communication. The 545 tracked politicians joined the platform bit by bit, with surges every 2 years at the midterm elections, when the entire House of Representatives and one-third of the Senate is up for reelection. I counted the number of first tweets per week as a proxy for the new arrival of politicians to the platform.
    </p>
  </div>
</div>

<div style="text-align: center;">
  <div id="chart-on"></div>
  ${resize((width) => data_on && user_onboarding(data_on, "#chart-on", { width: 800 }))}
</div>

```js
import {user_onboarding} from "./components/tweets_times.js";

const data_on = await FileAttachment("./data/user_onboarding.csv")
   .csv({ typed: true })
   .then(rawData => rawData.map(d => ({
      week: d3.timeParse("%Y-%m-%dT%H:%M:%S.%L%Z")(d.cohort_week),
      weekly_count: +d.weekly_user_count,
      cum_count: +d.cumulative_user_count
   })));
```

<div class="chart-wrapper">
  <div class="text-container">
  <p>
Twitter activity rises from January and peaks in June. In the summer recess between July and August, average tweeting decreases. After the adjournment average tweeting rises for a month and goes quieter again towards the end of the year.
</p>
  </div>
</div>  

<div style="text-align: center;">
<div id="chart-ym"></div>
${resize((width) => data_ym && tweets_ym(data_ym, "#chart-ym", { width:750 }))}
</div>

<!-- Year-Month-Plot  -->
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

<div class="chart-wrapper">
  <div class="text-container">
  <p>
  Average monthly tweets, shows the above trend with more clarity. Also tweeting over the week follows a similar pattern: slow in the beginning, a peak on Thursdays and declining towards the weekend.
  </p>
  </div>
</div>



<!-- MonthlyPlot -->
```js

const tweetData = await FileAttachment("./data/times_monthly.csv").csv({ typed: true }) 
  .then(rawData => rawData.map(d => ({
    month: d.Month,
    tweets: +d.tweets,
    m_number: +d.m_number - 1 // Adjust month number to 0-based
  })));
 
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
          return `${d.month}\n${format(d.tweets)} Tweets`;}}),

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
    ${resize((width) => DailyPlot(data_daily, {width}))}
  </div>
</div>








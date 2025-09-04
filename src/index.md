---
title: Overview
toc: false
---

<style>
.card.hover-effect:hover {
  transform: scale(1.1); 
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* More prominent shadow */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100vh; /* Full viewport height */
  z-index: 50;
}

.card {
  display: grid; 
  place-items: right; /* Center text both horizontally and vertically */
  padding: 1rem; 
  border: 1px solid #ccc; 
  border-radius: 5px; 
}

.h3 {
  font-size: 30px;
  font-weight: 700;
}

h1, h2, h3, h4, h5, h6 {
  
  font-family: "Calibri", Arial, sans-serif;
}
</style>

<h1>Congressional Tweeting</h1>

<!--  Cards -->
<div class="grid grid-cols-4" style="width: 100%">
  <div class="card" style="max-height: 35px; padding-top: 6px">
    <h3>Tracked Twitter Accounts</h3>
    <span style="font-size: 20px; font-weight: 700">545</span>
  </div>
  <div class="card" style="max-height: 35px; padding-top: 6px">
    <h3>Number of Tweets </span></h3>
    <span style="font-size: 20px; font-weight: 700">986997
    </span>
  </div>
  <div class="card" style="max-height: 35px; padding-top: 6px">
    <h3>Date: FROM</h3>
    <span style="font-size: 20px; font-weight: 700">August 2008</span>
  </div>
  <div class="card" style="max-height: 35px; padding-top: 6px">
    <h3>Date: TO</h3>
    <span style="font-size: 20px; font-weight: 700">June 2017</span>
  </div>
</div>

<!-- Charts -->
<div class="grid grid-cols-2" style="padding: 20px 0 0px 0;  width: 100%">
  
<div class="chart-wrapper">
  <h3>Likes and Retweets</h3>
  <div class="card" style="padding: 20px 0px 0 0; margin-top: 20px;">
    <div style="overflow-y: auto; max-height: 400px;">
    <div style="margin: 5px 10px 10px 10px;">
      ${search}
    </div>
      ${table_avg_likes}
    </div>
  </div>
</div>


  <div class="chart-wrapper">
    <h3>Top Hashtags</h3>
    <div class="card " style="padding: 20px 50px 0 0; margin-top: 20px; overflow-y: auto; max-height: 400px;">
      ${display(hashPlot(data_hash, {width}))}
    </div>
  </div>
</div>

<h3 style="padding: 20px 0 0px 0; margin: auto; width: 100%; text-align: center;">Tweeting Times</h3>


<div class="card grid-colspan-2">
  ${resize((width) => YearMonthPlot(tweets_ym, {width}))}	
</div>

<div class="grid grid-cols-3">
 <div class="card ">${MonthlyPlot(tweetData)}</div>
 <div class="card ">${DailyPlot(data_daily)}</div>
 <div class="card ">${HourlyPlot(data_hourly)}</div>
</div>

<h3 style="padding: 20px 0 0px 0; margin: auto; width: 100%; text-align: center;">Most Liked Tweets</h3>

<div class="grid grid-cols-2" style="font-size: 30px">
  <div class="card" style="padding-top: 6px;">
  <h2 style="font-size: 18px"><b>Nr. 1</b></h2>	
  <h3 style="font-size: 18px">Bernie Sanders - Jan. 2017 | <b>984832</b> Likes</h3>
  <div style="font-size: 20px">	
  <quote><em>"President Trump, you made a big mistake. By trying to divide us up by race, religion, gender and nationality you actually brought us closer."</em></quote>
  </div>
  </div>


  <div class="card" style="padding-top: 6px;">
  <h2 style="font-size: 18px"><b>Nr. 2</b></h2>	
  <h3 style="font-size: 18px">Donald J. Trump	- Nov. 2016 | <b>627475</b> Likes</h3>	
  <div style="font-size: 20px">	
  <quote><em>"Such a beautiful and important evening! The forgotten man and woman will never be forgotten again. We will all come together as never before	"</em></quote>
  </div>
  </div>
</div>

<div class="chart-wrapper" style="padding: 20px 0 0px 0;  width: 100%">
<div class="chart-wrapper">
<h3>100 Most Liked Tweets</h3>
${display(makeTreeMap(tree_data, { width: 1200, height: 700, colorScheme: d3.schemeCategory10, tileMethod: d3.treemapSquarify, legendFontSize: 22, metricName: "Likes", showText: true }))}
</div>

<h3 style="padding: 20px 0 0px 0; margin: auto; width: 100%; text-align: center;">Most Retweeted Tweets</h3>

<div class="grid grid-cols-2" style="font-size: 30px">
  <div class="card" style="padding-top: 6px;">
  <h2 style="font-size: 18px"><b>Nr. 1</b></h2>	
  <h3 style="font-size: 18px">Bernie Sanders - Jan. 2017 | <b>461733</b> Retweets</h3>
  <div style="font-size: 20px">	
  <quote><em>"President Trump, you made a big mistake. By trying to divide us up by race, religion, gender and nationality you actually brought us closer."</em></quote>
  </div>
  </div>


  <div class="card" style="padding-top: 6px;">
  <h2 style="font-size: 18px"><b>Nr. 2</b></h2>	
  <h3 style="font-size: 18px">Donald J. Trump	- Nov. 2016 | <b>340294</b> Retweets</h3>	
  <div style="font-size: 20px">	
  <quote><em>"TODAY WE MAKE AMERICA GREAT AGAIN!"</em></quote>
  </div>
  </div>
</div>

<div class="chart-wrapper" style="padding: 20px 0 0px 0;  width: 100%">
<div class="chart-wrapper">
<h3>100 Most Retweeted Tweets</h3>
${display(makeTreeMap(data_rt, { width: 1400, height: 800, colorScheme: d3.schemeCategory10, tileMethod: d3.treemapSquarify, legendFontSize: 22, metricName: "Retweets"}))}
</div>

 <!-- Data and Input for Follower, Likes & RT -->
```js
const data_flrt = await FileAttachment("./data/follower_likes_rt.csv").csv({ typed: true });
const search = Inputs.search(data_flrt, {label: "Search names", placeholder: "Name…", datalist: ["names"],});
const filteredData = Generators.input(search);
```

<!--  Follower Likes and Retweets -->
```js
const table_avg_likes = Inputs.table(filteredData, {
  columns: ["name", "fav_avg", "rt_avg"],
  format: {
    fav_avg: sparkbar(d3.max(filteredData, d => d.fav_avg)),
    rt_avg: sparkbar(d3.max(filteredData, d => d.rt_avg))
  },
  header: {
    name: "Name",
    fav_avg: "Average Likes",
    rt_avg: "Average Retweets"
  },
  rows: 20,
  select: false,
  className: "custom-table"
})

function sparkbar(max) {
  return (x) => {
    const isOutside = x < max * 0.5; 
    return htl.html`
      <div style="
        position: relative;
        display: flex;
        align-items: center;
        height: 20px; /* Match table row height */
      ">
        <!-- Bar -->
        <div style="
          background: var(--theme-green); /* Bar color */
          color: ${isOutside ? 'black' : 'white'}; /* Text color */
          font: 10px/1.7 var(--sans-serif); /* Font styling */
          width: ${100 * x / max}%; /* Bar width */
          height: 100%; /* Match container height */
          padding: 2px 5px; /* Add padding for spacing */
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: ${isOutside ? 'start' : 'end'}; 
        ">
          ${!isOutside ? x.toLocaleString("en-US") : ""}
        </div>

        <!-- Label Outside -->
        ${isOutside
          ? htl.html`<span style="
               position: absolute;
               padding: 2px 5px;
               display: flex;
               left: calc(${100 * x / max}% + 10px); 
               top: 50%; /* Center vertically */
               transform: translateY(-50%);
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

<!-- Hash Plot -->
```js
const data_hash = await FileAttachment("./data/hash_top100.csv")
  .csv({ typed: true })
  .then(rawData => 
    rawData
      .map(d => ({
        hashtag: d.hashtag,
        count: +d.count // Ensure count is a number
      }))
      .sort((a, b) => b.count - a.count) 
      //.slice(0, 20) // Take the top 50 rows
  );

function hashPlot(data, { width, barHeight = 50 }) {
  const totalHeight = data.length * barHeight; // Dynamically calculate chart height

  return Plot.plot({
    style: {
      fontSize: "35px", // Set the base font size for the entire chart
      // fontFamily: "sans-serif", 
    },
    marginLeft: 290, // Leave enough space for large y-axis labels
    marginBottom: 20,
    height: totalHeight, // Set chart height dynamically
    width,
    // fontSize: 35,
    x: { axis: null },
    y: { 
      label: "", // No y-axis label
      tickSize: 0, // No tick marks
      tickPadding: 10, // Padding between tick and labels
    },
    color: { scheme: "YlOrRd" },
    marks: [
      Plot.barX(data, {
        x: "count",
        y: "hashtag",
        fill: "count",
        sort: { y: "x", reverse: true },
      }),
    Plot.text(data, {
      x: "count",
      y: "hashtag",
      text: (d) => d3.format(",")(d.count),
      fill: (d) => (d.count > 7000 ? "white" : "black"),
      textAnchor: "end",
      // textAnchor: (d) => (d.count > 1000 ? "end" : "start"),
      // dx: (d) => (d.count > 1000 ? -20 : 20),
      dx: -10,
      dy: barHeight / 17,
      }),
      Plot.ruleX([0]), // Add baseline at x = 0
    ],
  });
}
```

<!-- Year-Month-Plot  -->
```js
const parseDate = d3.timeParse("%m/%d/%Y");
const tweets_ym = await FileAttachment("./data/times_ym.csv")
  .csv({ typed: true })
  .then(rawData => rawData.map(d => ({
    date: d3.timeParse("%m/%d/%Y")(d.year_month), 
    year: d3.timeFormat("%Y")(d3.timeParse("%m/%d/%Y")(d.year_month)),
    month: d3.timeFormat("%m")(d3.timeParse("%m/%d/%Y")(d.year_month)), 
    count: +d.count 
  })));

function YearMonthPlot(data, {width} = {}) { 
  const height = Math.min(width * 0.25, 600);
  return Plot.plot({
  style: {
    fontSize: "18px" // Adjust font size globally
  },
  title: "Number of tweets over the years",
  subtitle:
    "Twitter activity rose every year and follows a similar monthly pattern.",
  marginLeft: 40,
  marginRight: 0,
  width, // Set chart width dynamically
  height, // Set
  x: {
    label: "",
    tickFormat: (d) => d3.timeFormat("%b")(new Date(2000, d - 1)), // Abbreviated month names
    domain: d3.range(1, 13).map((d) => d.toString().padStart(2, "0")),
    grid: true,
    inset: -20
  },
  y: {
    label: "",
    tickFormat: d3.format(".0s"),
    tickSize: 0
  },
  color: {
    legend: true,
    type: "ordinal",
    scheme: "category10",
    columns: 4, // Space out the legend horizontally with 4 columns
    legendX: 10, // Position legend with some padding to the chart
    legendY: 10,
    width: 600 // Restrict the legend width to prevent overflow
  },
  marks: [
    Plot.ruleY([0]), // Add a baseline at y = 0
    Plot.lineY(data, {
      x: "month", // Group by month
      y: "count", // Use the count for y-axis
      z: "year", // Different lines for each year
      stroke: "year", // Use color based on year
      strokeWidth: (d) => (d.year == 2016 ? 3 : 1.5)
    }),
    Plot.dot(data, {
      x: "month",
      y: "count",
      z: "year",
      title: (d) =>
        `${d3.timeFormat("%B")(new Date(2000, d.month - 1))}, ${
          d.year
        }\n\nTweets: ${d3.format(",")(d.count)}`,
      stroke: "none" // Disable additional stroke
    })
  ]
})};
```

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




function DailyPlot(data) {
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

<!-- Hourly Plot -->
```js
const data_hourly = await FileAttachment("./data/time_hourly.csv")
  .csv({ typed: true })
  .then(rawData => 
    rawData
  .map((d) => ({
    avg_hourly_tweets: +d.avg_hourly_tweets,
    hour: d.hour === 0 ? 24 : d.hour 
  }))
  .sort((a, b) => a.hour - b.hour) );

function HourlyPlot(data) {
  return Plot.plot({
    title: "Average Hourly Tweets",
    marginLeft: 60,
    marginBottom: 40,
    x: {
      label: "",
      tickSize: 0,
      tickPadding: 20,
      domain: d3.range(1, 25)
    },
    y: {
      label: "", // Remove y-axis label
      ticks: 3, // Number of ticks
      tickSize: 0
    },
    color: {
      type: "diverging",
      scheme: "GnBu"
    },
    marks: [
      Plot.barY(data, {
        x: "hour", // Use "day" for x-axis
        y: "avg_hourly_tweets",
        fill: "avg_hourly_tweets",
        title: (d) => {
          const format = d3.format(",.0f");
          return `${format(d.avg_hourly_tweets)} Tweets`;
        }
      }),
      Plot.ruleY([0]) // Add a baseline at y = 0
    ]
  })};
```

<!--  Treeamp Likes-->
```js
import { makeTreeMap } from "./components/makeTreeMap.js";

async function MakeTreemapData(fileAttachment) {
  // Load and parse the data from the attachment
  const data = await fileAttachment.csv({ typed: true });

  const top100Data = data
    .sort((a, b) => b.likes - a.likes) // Sort by likes descending
    .slice(0, 100);

return {
    name: "root",
    children: d3
      .groups(top100Data, (d) => d.name) // Group by full_name
      .map(([name, tweets]) => ({
        name: name, // Group name (full_name)
        children: tweets.map((tweet) => ({
          name: tweet.tweet, // Tweet text
          value: +tweet.likes // Size based on likes
        }))
      }))
  };
}

const tree_data = await MakeTreemapData(
  FileAttachment("./data/tweets_top1000_likes.csv")
)
```

<!--  Treeamp RT-->
```js

async function MakeTreemapData(fileAttachment) {
  const data_l = await fileAttachment.csv({ typed: true });

  const sortedData = data_l
    .sort((a, b) => b.retweets - a.retweets)
    .slice(0, 100); 

  // Structure the hierarchical data
  return {
    name: "root",
    children: d3
      .groups(sortedData, (d) => d.name) // Group by full_name
      .map(([name, tweets]) => ({
        name: name, // Group name (full_name)
        children: tweets.map((tweet) => ({
          name: tweet.tweet, // Tweet text
          value: +tweet.retweets // Size based on RT
        }))
      }))
  };
}

// Usage
const data_rt = await MakeTreemapData(
  FileAttachment("./data/tweets_top1000_rt.csv")
);

```
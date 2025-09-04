---
title: Tweets
toc: false
style: custom-style.css
---

<style>
  .tooltip {
    font-size: inherit;  /* Use inherited size from inline style */
}
/* Chart Wrapper: Center charts and text */
.chart-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    max-width: 900px;
}

/* Global Wrapper: Center all page content */
.page-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center; /* Center content horizontally */
    margin: 0 auto; /* Center the wrapper itself */
    max-width: 900px; /* Match the text dimensions */
    padding: 20px; /* Add spacing around the edges */
    box-sizing: border-box;
}

/* Text Container: Style the text block */
.text-container {
    text-align: left;
    margin: 20px auto;
    max-width: 1200px;
    line-height: 1.4;
    font-size: 22px;
    font-family: "Calibri", Arial, sans-serif;
}

.body{
  max-width: 900px;
  margin: 20px auto;
  max-width: 1200px;
}

svg {
    max-width: 100%; /* Ensure the SVG scales within its container */
    height: auto;    /* Maintain aspect ratio */
  }
</style>

<div class="chart-wrapper">
  <div class="text-container">
   <h2>Most Liked Tweets</h2>
   <p>Donald Trump dominates the top most liked tweets, but Bernie Sanders has the single most liked tweet in the dataset. Guess who he adresses.</p>
   <blockquote>
   "President Trump, you made a big mistake. By trying to divide us up by race, religion, gender and nationality you actually brought us closer." &ndash; Bernie Sanders, January 21, 2017
   </blockquote>
   <p>Hover over the rectangles to see the actual tweet and number of likes.</p>
  </div>
</div>

<div class="chart-wrapper">
  <div class="text-container">
   <h2>Top 1000 Most Liked Tweets</h2>
  </div>
</div>

<div class="w-4/5 margin-auto">

```js

async function MakeTreemapData(fileAttachment) {
  // Load and parse the data from the attachment
  const data_l = await fileAttachment.csv({ typed: true });

  // Sort the flat data by likes (descending) and take the top 1000
  const sortedData = data_l
    .sort((a, b) => b.likes - a.likes) // Sort by likes descending
    .slice(0, 1000);

  // Structure the hierarchical data
  return {
    name: "root",
    children: d3
      .groups(sortedData, (d) => d.name) // Group by full_name
      .map(([name, tweets]) => ({
        name: name, // Group name (full_name)
        children: tweets.map((tweet) => ({
          name: tweet.tweet, // Tweet text
          value: +tweet.likes // Size based on likes
        }))
      }))
  };
}

// Usage
const data = await MakeTreemapData(
  FileAttachment("./data/tweets_top1000_likes.csv")
);


import { makeTreeMap } from "./components/makeTreeMap.js";

const svg = makeTreeMap(data, { width: 1400, height: 800, colorScheme: d3.schemeCategory10, tileMethod: d3.treemapSquarify, legendFontSize: 23, showText: false, metricName: 'Likes' });

display(svg);

```

</div>



<div class="chart-wrapper">
  <div class="text-container">
   <h2>Top 1000 Most Retweeted Tweets</h2>
  </div>
</div>



```js

async function MakeTreemapData(fileAttachment) {
  const data_l = await fileAttachment.csv({ typed: true });

  const sortedData = data_l
    .sort((a, b) => b.retweets - a.retweets); 

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
const data = await MakeTreemapData(
  FileAttachment("./data/tweets_top1000_rt.csv")
);
console.log(data);


import { makeTreeMap } from "./components/makeTreeMap.js";

const svg = makeTreeMap(data, { width: 1400, height: 800, colorScheme: d3.schemeCategory10, tileMethod: d3.treemapSquarify, legendFontSize: 23, showText: false, metricName: 'Retweets' });

display(svg);

```
---
theme: wide
title: Tweets
toc: true
styles: custom-style.css
---

<style>
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


```js
const liked_tweets = await FileAttachment("./data/tweets_top1000_likes.csv").csv({
  typed: true
})

```

```js
async function MakeTreemapData(fileAttachment) {
  // Load and parse the data from the attachment
  const data = await fileAttachment.csv({ typed: true });

  // Structure the hierarchical data
  return {
    name: "root",
    children: d3
      .groups(data, (d) => d.full_name) // Group by full_name
      .map(([full_name, text]) => ({
        name: full_name, // Group name (full_name)
        children: text.map((text) => ({
          name: text.text, // Tweet text
          value: +text.favorite_count // Size based on favorite_count
        }))
      }))
  };
}

// Usage Example
const tree_data = await MakeTreemapData(
  FileAttachment("./data/tweets_top1000_likes.csv")
)
```


```js
import { makeTreeMap } from "./components/makeTreeMap.js";

const svg = makeTreeMap(tree_data, { width: 800, height: 500, colorScheme: d3.schemeCategory10, tileMethod: d3.treemapSquarify });

display(svg);

```




<div class="chart-wrapper">
  <div class="text-container">
   <h2>Most Retweeted Tweets</h2>
  <p>

  </p>
  </div>
</div>




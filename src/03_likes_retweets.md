---
theme: dashboard
title: Likes & Retweets
toc: false

---

<style>
.chart-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centers the chart and text container horizontally */
  margin: 40px auto; /* Center the wrapper itself */
  max-width: 900px; /* Adjust line length */
}

.text-container {
  text-align: left; /* Left-align the text */
  margin: 20px auto; /* Increase side margins for better spacing */
  max-width: 1200px; /* Increase this value for a longer text line */
  line-height: 1.4; /* Improve readability */
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
  <h2>Likes & Retweets</h2>
  <p>
  While likes seem to be given more generously on average, retweets are more volatile. The maximum number of retweets is 3.7 times that of the maximum number of likes. I would tip this is due to the fact that some tweets make waves because of their outrageousness rather than their likability.
  </p>
  </div>
</div>


```js
const data_flrt = await FileAttachment("./data/follower_likes_rt.csv").csv({ typed: true });
const search = Inputs.search(data_flrt, {label: "Search names", placeholder: "Name…", datalist: ["names"],});
const filteredData = Generators.input(search);
```


<div class="chart-wrapper">
  <!-- Chart -->
  <div class="card" >
    <div style="margin: 0px 10px 10px 10px">${search}</div>
    <div>${table_avg_likes}</div>
  </div>
</div>


```js
const table_avg_likes = Inputs.table(filteredData, {
  columns: ["name", "fav_avg", "rt_avg"],
  header: {
    name: "Name",
    fav_avg: "Average Likes",
    rt_avg: "Average Retweets"
  },
  format: {
    fav_avg: sparkbar(d3.max(filteredData, d => d.fav_avg)),
    rt_avg: sparkbar(d3.max(filteredData, d => d.rt_avg))
  },
  rows: 20,
  select: false,
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




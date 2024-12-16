---
theme: dashboard
title: Tweet Times
toc: true
---


```js
import { tweets_ym, tweets_monthly, tweets_ym_classic, tweets_hour } from "./components/tweets_times.js";
```

```js
const data_month = await FileAttachment("./data/times_monthly.csv")
  .csv({ typed: true })
  .then(rawData => rawData.map(d => ({
    month: d.Month,
    count: +d.tweets,
    m_number: +d.m_number
  })));
```

```js
const parseDate = d3.timeParse("%m/%d/%Y");
const data_ym = await FileAttachment("./data/times_ym.csv")
  .csv({ typed: true })
  .then(rawData => rawData.map(d => ({
    date: parseDate(d.year_month),
    count: +d.count,
  })))
```

<div id="chart-1">  </div>
${resize((width) => data_ym && tweets_ym(data_ym, "#chart-1", { width }))}

<div id="chart-2"></div>
${resize((width) => data_month && tweets_monthly(data_month, "#chart-2", { width }))}

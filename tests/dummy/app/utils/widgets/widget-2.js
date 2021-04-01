export const COLOR_PALETTE = {
  '8 - Track': '#5B8DB8',
  CD: '#EE7423',
  'CD Single': '#F59D3D',
  Cassette: '#7AAAD0',
  'Cassette Single': '#9BC7E4',
  'DVD Audio': '#9D7760',
  'Download Album': '#7C4D79',
  'Download Music Video': '#D5A5C4',
  'Download Single': '#9B6A97',
  Kiosk: '#E1575A',
  'LP/EP': '#2A5784',
  'Limited Tier Paid Subscription': '#B4E0A7',
  'Music Video (Physical)': '#F1CF63',
  'On-Demand Streaming (Ad-Supported)': '#398949',
  'Other Ad-Supported Streaming': '#61AA57',
  'Other Digital': '#EFC9E6',
  'Other Tapes': '#BADDF1',
  'Paid Subscription': '#24693D',
  'Ringtones & Ringbacks': '#BE89AC',
  SACD: '#FFC686',
  'SoundExchange Distributions': '#7DC470',
  Synchronization: '#BBB1AC',
  'Vinyl Single': '#43719F',
};

export function formatRevenue(revenue) {
  const revenueInBillions = (revenue / 1e9).toFixed(2);

  if (revenueInBillions >= 1) {
    return `$${new Intl.NumberFormat().format(revenueInBillions)} billion`;
  }

  const revenueInMillions = (revenue / 1e6).toFixed(1);

  if (revenueInMillions >= 1) {
    return `$${new Intl.NumberFormat().format(revenueInMillions)} million`;
  }

  return `$${new Intl.NumberFormat().format(revenue.toFixed(0))}`;
}

/*
  Transform the raw data into something useful for visualization
*/
export function createDataForVisualization(rawData) {
  return rawData.map((datum) => {
    const musicFormat = datum['Format'];
    const year = parseInt(datum['Year'], 10);
    const revenue = parseInt(datum['Revenue (Inflation Adjusted)'], 10);

    return { musicFormat, year, revenue };
  });
}

/*
  Transform the raw data into something useful for captions
*/
export function createSummariesForCaptions(rawData) {
  const groupedData = groupDataByMusicFormat(rawData);
  const sanitizedData = sanitizeData(groupedData);
  const summaries = summarizeData(sanitizedData);

  return summaries;
}

function groupDataByMusicFormat(rawData) {
  return rawData.reduce((accumulator, datum) => {
    const musicFormat = datum['Format'];
    const year = parseInt(datum['Year'], 10);
    const revenue = parseInt(datum['Revenue (Inflation Adjusted)'], 10);
    const didMusicFormatExist = revenue !== 0;

    if (accumulator[musicFormat]) {
      accumulator[musicFormat].data.set(year, revenue);

      if (didMusicFormatExist) {
        accumulator[musicFormat].relevantYears = {
          min: Math.min(year, accumulator[musicFormat].relevantYears.min),
          max: Math.max(year, accumulator[musicFormat].relevantYears.max),
        };
      }
    } else {
      accumulator[musicFormat] = {
        data: new Map([[year, revenue]]),
        relevantYears: {
          min: didMusicFormatExist ? year : Infinity,
          max: didMusicFormatExist ? year : -Infinity,
        },
      };
    }

    return accumulator;
  }, {});
}

function sanitizeData(groupedData) {
  const output = {};

  Object.keys(groupedData).forEach((musicFormat) => {
    const { data, relevantYears } = groupedData[musicFormat];
    const relevantData = new Map();

    // Remove data points outside of the relevant years
    for (let year = relevantYears.min; year <= relevantYears.max; year++) {
      const revenue = data.get(year);
      relevantData.set(year, revenue);
    }

    output[musicFormat] = {
      relevantData,
      relevantYears,
    };
  });

  return output;
}

function summarizeData(sanitizedData) {
  const summaries = [];

  Object.keys(sanitizedData)
    .sort()
    .forEach((musicFormat) => {
      const { relevantData, relevantYears } = sanitizedData[musicFormat];
      const numRelevantYears = relevantYears.max - relevantYears.min + 1;

      const revenues = Array.from(relevantData.values());
      const totalRevenue = revenues.reduce(
        (accumulator, sum) => accumulator + sum,
        0
      );
      const averageRevenue = totalRevenue / numRelevantYears;

      summaries.push({
        musicFormat,
        markerColor: COLOR_PALETTE[musicFormat],
        averageRevenue: formatRevenue(averageRevenue),
        relevantYears,
      });
    });

  return summaries;
}

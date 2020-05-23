/*
  D3 code adapted from https://observablehq.com/@mbostock/revenue-by-music-format-1973-2018
*/
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { COLOR_PALETTE, formatRevenue } from 'dummy/utils/widgets/widget-2';

import { extent, max, rollup, ticks } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
import { select } from 'd3-selection';
import { stack, stackOrderReverse } from 'd3-shape';

const musicFormats = Object.keys(COLOR_PALETTE);
const paletteColors = Object.values(COLOR_PALETTE);

export default class WidgetsWidget2StackedChartComponent extends Component {
  @tracked height = 0;
  @tracked width = 0;


  get color() {
    return scaleOrdinal()
      .domain(musicFormats)
      .range(paletteColors);
  }

  get data() {
    return this.args.data ?? [];
  }

  get margin() {
    return {
      top: 20,
      right: 15,
      bottom: 30,
      left: 35
    };
  }

  get series() {
    const foo = stack()
      .keys(musicFormats)
      .value((group, key) => group.get(key).revenue)
      .order(stackOrderReverse);

    const bar = Array.from(
      rollup(this.data, ([d]) => d, d => d.year, d => d.musicFormat).values()
    );

    const foobar = foo(bar)
      .map(s => (s.forEach(d => d.data = d.data.get(s.key)), s));

    return foobar;
  }

  get xAxis() {
    const { height, margin, xScale } = this;

    return g => g
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(
        axisBottom(xScale)
          .tickValues(ticks(...extent(xScale.domain()), 5))
          .tickSizeOuter(0)
      );
  }

  get xScale() {
    const { data, margin, width } = this;

    return scaleBand()
      .domain(data.map(d => d.year))
      .rangeRound([margin.left, width - margin.right]);
  }

  get yAxis() {
    const { data, margin, yScale } = this;

    return g => g
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(
        axisLeft(yScale)
          .tickFormat(x => (x / 1e9).toFixed(0))
          .tickValues(ticks(...extent(yScale.domain()), 5))
      )
      .call(g => g.select('.domain').remove())
      .call(g => g.select('.tick:last-of-type text').clone()
        .attr('x', 3)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        .text(data.y)
      );
  }

  get yScale() {
    const { height, margin, series } = this;

    return scaleLinear()
      .domain([0, max(series, d => max(d, d => d[1]))]).nice()
      .range([height - margin.bottom, margin.top]);
  }


  @action refreshChart(element) {
    this.clearSvg(element);
    this.measureDimensions(element);
    this.drawChart(element);
  }

  clearSvg(element) {
    element.querySelector('svg').innerHTML = '';
  }

  measureDimensions(element) {
    const { clientHeight, clientWidth } = element;

    this.height = clientHeight;
    this.width = clientWidth;
  }

  @action drawChart(element) {
    const { height, width } = this;
    const { color, series, xAxis, yAxis, xScale, yScale } = this;

    let svg = select(element.querySelector('svg'));

    svg.attr('viewBox', [0, 0, width, height]);

    svg
      .append('g')
      .selectAll('g')
      .data(series)
      .join('g')
        .attr('fill', ({ key }) => color(key))
        .call(g => g
          .selectAll('rect')
          .data(d => d)
          .join('rect')
            .attr('x', d => xScale(d.data.year))
            .attr('y', d => yScale(d[1]))
            .attr('width', xScale.bandwidth() - 1)
            .attr('height', d => Math.max(yScale(d[0]) - yScale(d[1]), 0))
          .append('title')
            .text(d => `${d.data.musicFormat}, ${d.data.year} ${formatRevenue(d.data.revenue)}`)
        );

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);
  }
}
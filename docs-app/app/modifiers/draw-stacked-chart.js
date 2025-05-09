import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { extent, max, rollup, ticks } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
import { select } from 'd3-selection';
import { stack, stackOrderReverse } from 'd3-shape';
import Modifier from 'ember-modifier';

import {
  COLOR_PALETTE,
  formatRevenue,
} from '../utils/components/widgets/widget-2';

const musicFormats = Object.keys(COLOR_PALETTE);
const paletteColors = Object.values(COLOR_PALETTE);

export default class DrawStackedChartModifier extends Modifier {
  @service resizeObserver;

  _element = undefined;
  _named = {};
  height = 0;
  width = 0;

  get color() {
    return scaleOrdinal().domain(musicFormats).range(paletteColors);
  }

  get data() {
    return this._named.data ?? [];
  }

  get margin() {
    return {
      top: 20,
      right: 15,
      bottom: 30,
      left: 35,
    };
  }

  get series() {
    const series = stack()
      .keys(musicFormats)
      .value((group, key) => group.get(key).revenue)
      .order(stackOrderReverse);

    const internMap = rollup(
      this.data,
      ([d]) => d,
      (d) => d.year,
      (d) => d.musicFormat,
    );

    return series(internMap.values()).map(
      (s) => (s.forEach((d) => (d.data = d.data.get(s.key))), s),
    );
  }

  get xAxis() {
    const { height, margin, xScale } = this;

    const xTicks = ticks(...extent(xScale.domain()), 5);

    return (g) =>
      g
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(axisBottom(xScale).tickValues(xTicks).tickSizeOuter(0));
  }

  get xScale() {
    const { data, margin, width } = this;

    const xDomain = data.map((d) => d.year);

    return scaleBand()
      .domain(xDomain)
      .rangeRound([margin.left, width - margin.right]);
  }

  get yAxis() {
    const { data, margin, yScale } = this;

    const yTicks = ticks(...extent(yScale.domain()), 5);

    return (g) =>
      g
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(
          axisLeft(yScale)
            .tickFormat((y) => (y / 1e9).toFixed(0))
            .tickValues(yTicks),
        )
        .call((g) => g.select('.domain').remove())
        .call((g) =>
          g
            .select('.tick:last-of-type text')
            .clone()
            .attr('x', 3)
            .attr('text-anchor', 'start')
            .attr('font-weight', 'bold')
            .text(data.y),
        );
  }

  get yScale() {
    const { height, margin, series } = this;

    const yDomain = [0, max(series, (d) => max(d, (d) => d[1]))];

    return scaleLinear()
      .domain(yDomain)
      .nice()
      .range([height - margin.bottom, margin.top]);
  }

  constructor(owner, args) {
    super(owner, args);

    registerDestructor(this, () => {
      this.resizeObserver.unobserve(this._element, this.onResize);
    });
  }

  clearSvg(element) {
    element.querySelector('svg').innerHTML = '';
  }

  drawChart(element) {
    const { color, height, series, width, xAxis, xScale, yAxis, yScale } = this;

    const svg = select(element.querySelector('svg'));

    svg.attr('viewBox', [0, 0, width, height]);

    svg
      .append('g')
      .selectAll('g')
      .data(series)
      .join('g')
      .attr('fill', ({ key }) => color(key))
      .call((g) =>
        g
          .selectAll('rect')
          .data((d) => d)
          .join('rect')
          .attr('x', (d) => xScale(d.data.year))
          .attr('y', (d) => yScale(d[1]))
          .attr('width', xScale.bandwidth() - 1)
          .attr('height', (d) => Math.max(yScale(d[0]) - yScale(d[1]), 0))
          .append('title')
          .text((d) => {
            const { musicFormat, revenue, year } = d.data;

            return `${musicFormat}, ${year} ${formatRevenue(revenue)}`;
          }),
      );

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);
  }

  measureDimensions(element) {
    this.height = element.clientHeight;
    this.width = element.clientWidth;
  }

  modify(element, _positional, named) {
    this._named = named;

    this.registerResizeObserver(element);
    this.refreshChart(element);
  }

  refreshChart(element) {
    this.clearSvg(element);
    this.measureDimensions(element);
    this.drawChart(element);
  }

  registerResizeObserver(element) {
    this.resizeObserver.unobserve(this._element, this.onResize);

    this._element = element;
    this.resizeObserver.observe(element, this.onResize);
  }

  @action onResize(resizeObserverEntry) {
    const element = resizeObserverEntry.target;

    this.refreshChart(element);
  }
}

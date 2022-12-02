import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { extent, max, rollup, ticks } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
import { select } from 'd3-selection';
import { stack, stackOrderReverse } from 'd3-shape';
import {
  COLOR_PALETTE,
  formatRevenue,
} from 'dummy/utils/components/widgets/widget-2';
import Modifier from 'ember-modifier';

const musicFormats = Object.keys(COLOR_PALETTE);
const paletteColors = Object.values(COLOR_PALETTE);

export default class DrawChartModifier extends Modifier {
  @service resizeObserver;

  height = 0;
  width = 0;
  _element = null;

  get color() {
    return scaleOrdinal().domain(musicFormats).range(paletteColors);
  }

  get data() {
    return this.args.named.data ?? [];
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
    const foo = stack()
      .keys(musicFormats)
      .value((group, key) => group.get(key).revenue)
      .order(stackOrderReverse);

    const bar = Array.from(
      rollup(
        this.data,
        ([d]) => d,
        (d) => d.year,
        (d) => d.musicFormat
      ).values()
    );

    const foobar = foo(bar).map(
      (s) => (s.forEach((d) => (d.data = d.data.get(s.key))), s)
    );

    return foobar;
  }

  get xAxis() {
    const { height, margin, xScale } = this;

    return (g) =>
      g.attr('transform', `translate(0, ${height - margin.bottom})`).call(
        axisBottom(xScale)
          .tickValues(ticks(...extent(xScale.domain()), 5))
          .tickSizeOuter(0)
      );
  }

  get xScale() {
    const { data, margin, width } = this;

    return scaleBand()
      .domain(data.map((d) => d.year))
      .rangeRound([margin.left, width - margin.right]);
  }

  get yAxis() {
    const { data, margin, yScale } = this;

    return (g) =>
      g
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(
          axisLeft(yScale)
            .tickFormat((x) => (x / 1e9).toFixed(0))
            .tickValues(ticks(...extent(yScale.domain()), 5))
        )
        .call((g) => g.select('.domain').remove())
        .call((g) =>
          g
            .select('.tick:last-of-type text')
            .clone()
            .attr('x', 3)
            .attr('text-anchor', 'start')
            .attr('font-weight', 'bold')
            .text(data.y)
        );
  }

  get yScale() {
    const { height, margin, series } = this;

    return scaleLinear()
      .domain([0, max(series, (d) => max(d, (d) => d[1]))])
      .nice()
      .range([height - margin.bottom, margin.top]);
  }

  constructor(owner, args) {
    super(owner, args);

    registerDestructor(this, () => {
      this.resizeObserver.unobserve(this._element, this.onResize);
    });
  }

  modify(element) {
    this.registerResizeObserver(element);
    this.refreshChart(element);
  }

  @action onResize(resizeObserverEntry) {
    const element = resizeObserverEntry.target;

    this.refreshChart(element);
  }

  registerResizeObserver(element) {
    this.resizeObserver.observe(element, this.onResize);
    this.resizeObserver.unobserve(this._element, this.onResize);
    this._element = element;
  }

  refreshChart(element) {
    this.clearSvg(element);
    this.measureDimensions(element);
    this.drawChart(element);
  }

  clearSvg(element) {
    element.querySelector('svg').innerHTML = '';
  }

  measureDimensions(element) {
    this.height = element.clientHeight;
    this.width = element.clientWidth;
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
          .text(
            (d) =>
              `${d.data.musicFormat}, ${d.data.year} ${formatRevenue(
                d.data.revenue
              )}`
          )
      );

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);
  }
}

import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class ContainerQueryComponent extends Component {
  @tracked queryResults = {};
  @tracked classSelectors = '';
  @tracked height;
  @tracked width;

  get breakpoints() {
    return this.args.breakpoints ?? {};
  }

  get classPrefix() {
    return this.args.classPrefix ?? 'container-query';
  }

  get debounce() {
    return this.args.debounce ?? 0;
  }

  @action queryContainer(element) {
    this.height = element.clientHeight;
    this.width = element.clientWidth;

    this.evaluateQueries();
    this.setClassSelectors();
  }

  evaluateQueries() {
    const { height, width } = this;
    const queryResults = {};

    for (const [name, metadata] of Object.entries(this.breakpoints)) {
      const { dimension, min, max } = metadata;

      if (dimension === 'width') {
        queryResults[name] = (min <= width && width < max);

      } else if (dimension === 'height') {
        queryResults[name] = (min <= height && height < max);

      }
    }

    this.queryResults = queryResults;
  }

  setClassSelectors() {
    const classPrefix = this.classPrefix;
    const classSelectors = [];

    for (const [name, meetsBreakpoint] of Object.entries(this.queryResults)) {
      if (meetsBreakpoint) {
        classSelectors.push(`${classPrefix}--${name}`);
      }
    }

    this.classSelectors = classSelectors.join(' ');
  }
}
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class ContainerQueryComponent extends Component {
  @tracked queryResults = {};

  get features() {
    return this.args.features ?? {};
  }

  get dataAttributePrefix() {
    return this.args.dataAttributePrefix ?? 'container-query';
  }

  get debounce() {
    return this.args.debounce ?? 0;
  }

  @action queryContainer(element) {
    this.measureDimensions(element);
    this.evaluateQueries();
    this.setDataAttributes(element);
  }

  measureDimensions(element) {
    this.height = element.clientHeight;
    this.width = element.clientWidth;
    this.aspectRatio = this.width / this.height;
  }

  evaluateQueries() {
    const queryResults = {};

    for (const [name, metadata] of Object.entries(this.features)) {
      const { dimension, min, max } = metadata;
      const value = this[dimension];

      queryResults[name] = (min <= value && value < max);
    }

    this.queryResults = queryResults;
  }

  setDataAttributes(element) {
    const prefix = this.dataAttributePrefix;

    for (const [name, meetsFeature] of Object.entries(this.queryResults)) {
      const attributeName = `data-${prefix}-${name}`;

      if (meetsFeature) {
        element.setAttribute(attributeName, '');

      } else {
        element.removeAttribute(attributeName);

      }
    }
  }
}
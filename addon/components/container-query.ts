import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type {
  Dimensions,
  Features,
  QueryResults,
} from 'ember-container-query/modifiers/container-query';

interface ContainerQueryComponentArgs {
  dataAttributePrefix?: string;
  debounce?: number;
  features?: Features;
  tagName?: string;
}

export default class ContainerQueryComponent extends Component<ContainerQueryComponentArgs> {
  @tracked dimensions?: Dimensions;
  @tracked queryResults?: QueryResults;

  // The dynamic tag is restricted to be immutable
  tagName = this.args.tagName ?? 'div';

  @action updateState({
    dimensions,
    queryResults,
  }: {
    dimensions: Dimensions;
    queryResults: QueryResults;
  }): void {
    this.dimensions = dimensions;
    this.queryResults = queryResults;
  }
}

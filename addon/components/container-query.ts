import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import type {
  Dimensions,
  Features,
  IndexSignatureParameter,
  QueryResults,
} from '../modifiers/container-query';

interface ContainerQueryComponentSignature<T extends IndexSignatureParameter> {
  Args: {
    dataAttributePrefix?: string;
    debounce?: number;
    features?: Features<T>;
    tagName?: string;
  };
  Blocks: {
    default: [
      {
        dimensions?: Dimensions;
        features?: QueryResults<T>;
      }
    ];
  };
  Element: HTMLElement;
}

export default class ContainerQueryComponent<
  T extends IndexSignatureParameter
> extends Component<ContainerQueryComponentSignature<T>> {
  @tracked dimensions?: Dimensions;
  @tracked queryResults?: QueryResults<T>;

  // The dynamic tag is restricted to be immutable
  tagName = this.args.tagName ?? 'div';

  @action updateState({
    dimensions,
    queryResults,
  }: {
    dimensions: Dimensions;
    queryResults: QueryResults<T>;
  }): void {
    this.dimensions = dimensions;
    this.queryResults = queryResults;
  }
}

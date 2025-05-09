import './container-query.css';

import { hash } from '@ember/helper';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { element } from 'ember-element-helper';

import type {
  Dimensions,
  Features,
  IndexSignatureParameter,
  QueryResults,
} from '../modifiers/container-query.ts';
import { default as containerQuery } from '../modifiers/container-query.ts';

interface ContainerQuerySignature<T extends IndexSignatureParameter> {
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
      },
    ];
  };
  Element: Element;
}

export default class ContainerQueryComponent<
  T extends IndexSignatureParameter,
> extends Component<ContainerQuerySignature<T>> {
  // The dynamic tag is restricted to be immutable
  tagName = this.args.tagName ?? 'div';

  updateState = ({
    dimensions,
    queryResults,
  }: {
    dimensions: Dimensions;
    queryResults: QueryResults<T>;
  }): void => {
    this.dimensions = dimensions;
    this.queryResults = queryResults;
  };

  @tracked dimensions?: Dimensions;
  @tracked queryResults?: QueryResults<T>;

  <template>
    {{#let (element this.tagName) as |Tag|}}
      <Tag
        class="container-query"
        {{containerQuery
          dataAttributePrefix=@dataAttributePrefix
          debounce=@debounce
          features=@features
          onQuery=this.updateState
        }}
        ...attributes
      >
        {{yield (hash dimensions=this.dimensions features=this.queryResults)}}
      </Tag>
    {{/let}}
  </template>
}

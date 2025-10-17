import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';
import type Owner from '@ember/owner';
import { debounce as _debounce } from '@ember/runloop';
import { service } from '@ember/service';
import type { ArgsFor, NamedArgs, PositionalArgs } from 'ember-modifier';
import Modifier from 'ember-modifier';

type IndexSignatureParameter = string | number | symbol;
type ObjectEntry<T> = [keyof T, T[keyof T]];
type ObjectEntries<T> = ObjectEntry<T>[];

type Dimensions = {
  aspectRatio: number;
  height: number;
  width: number;
};

type Metadata = {
  dimension: keyof Dimensions;
  max: number;
  min: number;
};

type Features<T extends IndexSignatureParameter> = Record<T, Metadata>;

type QueryResults<T extends IndexSignatureParameter> = Record<T, boolean>;

interface ContainerQuerySignature<T extends IndexSignatureParameter> {
  Args: {
    Named: {
      dataAttributePrefix?: string;
      debounce?: number;
      features?: Features<T>;
      onQuery?: ({
        dimensions,
        queryResults,
      }: {
        dimensions: Dimensions;
        queryResults: QueryResults<T>;
      }) => void;
    };
    Positional: [];
  };
  Element: Element;
}

export default class ContainerQuery<
  T extends IndexSignatureParameter,
> extends Modifier<ContainerQuerySignature<T>> {
  @service declare private readonly resizeObserver;

  private _dataAttributes: string[] = [];
  private _element?: Element;
  private _named!: NamedArgs<ContainerQuerySignature<T>>;

  dimensions!: Dimensions;
  queryResults!: QueryResults<T>;

  get dataAttributePrefix(): string {
    return this._named.dataAttributePrefix ?? 'container-query';
  }

  get debounce(): number {
    return this._named.debounce ?? 0;
  }

  get features(): Features<T> {
    return this._named.features ?? ({} as Features<T>);
  }

  constructor(owner: Owner, args: ArgsFor<ContainerQuerySignature<T>>) {
    super(owner, args);

    registerDestructor(this, () => {
      this.resizeObserver.unobserve(this._element, this.onResize);
    });
  }

  private evaluateQueries(): void {
    const queryResults = {} as QueryResults<T>;

    for (const [featureName, metadata] of Object.entries(
      this.features,
    ) as ObjectEntries<Features<T>>) {
      const { dimension, min, max } = metadata;
      const value = this.dimensions[dimension];

      queryResults[featureName] = min <= value && value < max;
    }

    this.queryResults = queryResults;
  }

  private measureDimensions(element: Element): void {
    const height = element.clientHeight;
    const width = element.clientWidth;

    this.dimensions = {
      aspectRatio: width / height,
      height,
      width,
    };
  }

  modify(
    element: Element,
    _positional: PositionalArgs<ContainerQuerySignature<T>>,
    named: NamedArgs<ContainerQuerySignature<T>>,
  ): void {
    this._named = named;

    this.registerResizeObserver(element);
    this.queryContainer(element);
  }

  private queryContainer(element: Element): void {
    this.measureDimensions(element);
    this.evaluateQueries();
    this.resetDataAttributes(element);
    this.setDataAttributes(element);

    this._named.onQuery?.({
      dimensions: this.dimensions,
      queryResults: this.queryResults,
    });
  }

  private registerResizeObserver(element: Element): void {
    this.resizeObserver.unobserve(this._element, this.onResize);

    this._element = element;
    this.resizeObserver.observe(this._element, this.onResize);
  }

  private resetDataAttributes(element: Element): void {
    this._dataAttributes.forEach((dataAttribute) => {
      element.removeAttribute(dataAttribute);
    });

    this._dataAttributes = [];
  }

  private setDataAttributes(element: Element): void {
    const prefix = this.dataAttributePrefix;

    for (const [featureName, meetsFeature] of Object.entries(
      this.queryResults,
    ) as ObjectEntries<QueryResults<T>>) {
      if (!meetsFeature) {
        continue;
      }

      const dataAttribute = prefix
        ? `data-${prefix}-${String(featureName)}`
        : `data-${String(featureName)}`;

      element.setAttribute(dataAttribute, '');

      this._dataAttributes.push(dataAttribute);
    }
  }

  @action private onResize(resizeObserverEntry: ResizeObserverEntry): void {
    const element = resizeObserverEntry.target;

    if (this.debounce > 0) {
      // eslint-disable-next-line ember/no-runloop
      _debounce(this, this.queryContainer, element, this.debounce);
      return;
    }

    this.queryContainer(element);
  }
}

export type {
  Dimensions,
  Features,
  IndexSignatureParameter,
  Metadata,
  QueryResults,
};

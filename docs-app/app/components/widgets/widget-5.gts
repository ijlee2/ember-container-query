import { hash } from '@ember/helper';
import Component from '@glimmer/component';
import { ContainerQuery, height, width } from 'ember-container-query';

import strictAnd from '../../helpers/strict-and';
import styles from './widget-5.css';

interface WidgetsWidget5Signature {}

export default class WidgetsWidget5Component extends Component<WidgetsWidget5Signature> {
  styles = styles;

  <template>
    <ContainerQuery
      @features={{hash large=(width min=224) tall=(height min=120)}}
      @tagName="section"
      class={{this.styles.container}}
      as |CQ|
    >
      {{#let
        (strictAnd CQ.features.large CQ.features.tall)
        as |showFullText|
      }}
        <div
          data-test-call-to-action
          class={{this.styles.call-to-action}}
        >
          {{#if showFullText}}
            <p>What will <em>you</em> create with</p>
          {{/if}}

          <p class={{this.styles.highlight}}>
            <a
              href="https://github.com/ijlee2/ember-container-query"
              target="_blank"
              rel="noopener noreferrer"
            >
              ember-container-query
            </a>
          </p>

          {{#if showFullText}}
            <p>?</p>
          {{/if}}
        </div>
      {{/let}}
    </ContainerQuery>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-5': typeof WidgetsWidget5Component;
  }
}
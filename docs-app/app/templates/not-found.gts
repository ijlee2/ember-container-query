import { hash } from '@ember/helper';
import UiPage from 'docs-app/components/ui/page';
import { ContainerQuery, width } from 'ember-container-query';
import { pageTitle } from 'ember-page-title';
import { local } from 'embroider-css-modules';

import styles from './not-found.module.css';

<template>
  {{pageTitle "Page Not Found"}}

  <UiPage @title="404">
    <p>Feeling lost? Un<em>contained</em>?</p>
    <p>Don't worry. We all have our off days.</p>

    <div class={{styles.animation}}>
      <ContainerQuery @features={{hash small=(width max=350)}} as |CQ|>
        <div
          class={{local
            styles
            "metaphor"
            (if CQ.features.small "small-layout")
          }}
        >
          <div class={{styles.mental-block}}>
          </div>

          <div aria-hidden="true" class={{styles.the-next-idea}}>
            ember-<br />container-<br />query
          </div>
        </div>
      </ContainerQuery>
    </div>
  </UiPage>
</template>

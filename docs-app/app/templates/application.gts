import { array, hash } from '@ember/helper';
import NavigationMenu from 'docs-app/components/navigation-menu';
import { NavigationNarrator } from 'ember-a11y-refocus';
import { pageTitle } from 'ember-page-title';

import styles from './application.module.css';

<template>
  {{pageTitle "Ember Container Query"}}

  <div class={{styles.application}}>
    <header class={{styles.header}}>
      <NavigationNarrator @skipTo="#main-content" />

      <NavigationMenu
        @menuItems={{array
          (hash label="Home" route="index")
          (hash label="Album" route="album")
          (hash label="Dashboard" route="dashboard")
          (hash label="Form" route="form")
          (hash label="Products" route="products")
        }}
        @name="Main Navigation"
      />
    </header>

    <main class={{styles.main}}>
      <div class={{styles.center}}>
        {{outlet}}
      </div>
    </main>

    <footer class={{styles.footer}}>
      <span class={{styles.copyright}}>
        Created by
        <a
          class={{styles.link}}
          href="https://www.linkedin.com/in/ijlee2/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Isaac J. Lee
        </a>
        © 2026
      </span>
    </footer>
  </div>
</template>

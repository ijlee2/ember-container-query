import { pageTitle } from 'ember-page-title';

<template>
  {{pageTitle "Ember Container Query"}}

  <div>
    <main>
      <div>
        {{outlet}}
      </div>
    </main>

    <footer>
      <span>
        Created by
        <a
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

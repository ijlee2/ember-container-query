// Add any types here that you need for local development only.
// These will *not* be published as part of your addon, so be careful that your published code does not rely on them!

import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';
import 'ember-source/types';
import 'ember-source/types/preview';

import { ComponentLike, HelperLike } from '@glint/template';
import type EmberContainerQueryRegistry from 'ember-container-query/template-registry';
import type EmberSvgJarRegistry from 'ember-svg-jar/glint';
import type EmbroiderCssModulesRegistry from 'embroider-css-modules/template-registry';

type NavigationNarratorComponent = ComponentLike<{
  Args: {
    skipTo: string;
  };
}>;

type PageTitleHelper = HelperLike<{
  Args: { Positional: [title: string] };
  Return: void;
}>;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberContainerQueryRegistry,
      EmberSvgJarRegistry,
      EmbroiderCssModulesRegistry {
    // Add any registry entries from other addons here that your addon itself uses (in non-strict mode templates)
    // See https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons
    NavigationNarrator: NavigationNarratorComponent;
    'page-title': PageTitleHelper;
  }
}

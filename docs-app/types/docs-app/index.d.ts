import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';
import 'ember-source/types';

import type { ComponentLike } from '@glint/template';
import type EmberContainerQueryRegistry from 'ember-container-query/template-registry';
import type EmberPageTitleRegistry from 'ember-page-title/template-registry';
import type EmberSvgJarRegistry from 'ember-svg-jar/template-registry';
import type EmberTruthHelpersRegistry from 'ember-truth-helpers/template-registry';
import type EmbroiderCssModulesRegistry from 'embroider-css-modules/template-registry';

type NavigationNarratorComponent = ComponentLike<{
  Args: {
    skipTo: string;
  };
}>;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberContainerQueryRegistry,
      EmberPageTitleRegistry,
      EmberSvgJarRegistry,
      EmberTruthHelpersRegistry,
      EmbroiderCssModulesRegistry {
    // Add any registry entries from other addons here that your addon itself uses (in non-strict mode templates)
    // See https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons
    NavigationNarrator: NavigationNarratorComponent;
  }
}

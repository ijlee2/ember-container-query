// Add any types here that you need for local development only.
// These will *not* be published as part of your addon, so be careful that your published code does not rely on them!

import '@glint/environment-ember-loose';

import type NavigationMenuComponent from 'dummy/components/navigation-menu';
import type AddHelper from 'dummy/helpers/add';
import type DynamicCssGridModifier from 'dummy/modifiers/dynamic-css-grid';
import type EmberContainerQueryRegistry from 'ember-container-query/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmberContainerQueryRegistry {
    // Add any registry entries from other addons here that your addon itself uses (in non-strict mode templates)
    // See https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons
    NavigationMenu: typeof NavigationMenuComponent;
    add: typeof AddHelper;
    'dynamic-css-grid': typeof DynamicCssGridModifier;
  }
}

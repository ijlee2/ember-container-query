// Add any types here that you need for local development only.
// These will *not* be published as part of your addon, so be careful that your published code does not rely on them!

import '@glint/environment-ember-loose';

import type SvgJarHelper from '@gavant/glint-template-types/types/ember-svg-jar/helpers/svg-jar';
import type AndHelper from '@gavant/glint-template-types/types/ember-truth-helpers/helpers/and';
import type NavigationMenuComponent from 'dummy/components/navigation-menu';
import type TracksComponent from 'dummy/components/tracks';
import type TracksListComponent from 'dummy/components/tracks/list';
import type TracksTableComponent from 'dummy/components/tracks/table';
import type AddHelper from 'dummy/helpers/add';
import type DynamicCssGridModifier from 'dummy/modifiers/dynamic-css-grid';
import type EmberContainerQueryRegistry from 'ember-container-query/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmberContainerQueryRegistry {
    // Add any registry entries from other addons here that your addon itself uses (in non-strict mode templates)
    // See https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons
    NavigationMenu: typeof NavigationMenuComponent;
    Tracks: typeof TracksComponent;
    'Tracks::List': typeof TracksListComponent;
    'Tracks::Table': typeof TracksTableComponent;
    add: typeof AddHelper;
    and: typeof AndHelper;
    'dynamic-css-grid': typeof DynamicCssGridModifier;
    'svg-jar': typeof SvgJarHelper;
  }
}

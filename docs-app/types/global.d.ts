// Types for compiled templates
declare module 'docs-app/templates/*' {
  import type { TemplateFactory } from 'ember-cli-htmlbars';

  const tmpl: TemplateFactory;
  export default tmpl;
}

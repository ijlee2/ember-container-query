import { precompileTemplate } from '@ember/template-compilation';

var TEMPLATE = precompileTemplate("{{! @glint-ignore: ember-element-helper needs to provide Glint signature }}\n{{#let (element this.tagName) as |Tag|}}\n  <Tag\n    class=\"container-query\"\n    {{container-query\n      dataAttributePrefix=@dataAttributePrefix\n      debounce=@debounce\n      features=@features\n      onQuery=this.updateState\n    }}\n    ...attributes\n  >\n    {{yield\n      (hash\n        dimensions=this.dimensions\n        features=this.queryResults\n      )\n    }}\n  </Tag>\n{{/let}}");

export { TEMPLATE as T };
//# sourceMappingURL=container-query.hbs-1b00a8f0.js.map

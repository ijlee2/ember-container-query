[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/ember-container-query/workflows/CI/badge.svg)](https://github.com/ijlee2/ember-container-query/actions?query=workflow%3ACI)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Isaac/ember-container-query)

# ember-container-query

_Make container queries that harness the power of Ember_


## Installation

```sh
pnpm add -D ember-container-query
```

<details>

<summary>Use Glint and <code>*.hbs</code> files?</summary>

Extend this addon's template registry to get native types.

```ts
/* types/index.d.ts */
import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';

import type EmberContainerQueryRegistry from 'ember-container-query/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmberContainerQueryRegistry, /* other addon registries */ {
    // local entries
  }
}
```

</details>


## Applications

Where can you use container queries? Here are real-life (and some theoretical) applications!

<details>

<summary>Create reusable components that are independent of screen size ♻️</summary>

1. Components form a core of an Ember app. We love components!

1. With media queries,

    - A design that looked amazing on 2 or 3 fixed screen sizes can end up looking terrible at a size in-between.

    - Designing the template for specific screen sizes isn't a future-proof solution. You may need to reuse the component under different local width and height constraints.

    - In `ember-qunit` tests, the window is scaled by default. You may end up stubbing a service (fake the window size) to get certain DOM elements to (dis)appear.

1. With container queries,

    - A component only needs to know how much space it has to figure out how to best present data.

    - Since each component can be free to decide how it looks, a webpage may end up with an unexpected combined look. This may be good, may be bad.

    - In tests, you will be driven to [have a correct window size](https://crunchingnumbers.live/2020/06/07/container-queries-cross-resolution-testing/). If the window size is correct, then all elements should (dis)appear just like they would on your browser.

</details>


<details>

<summary>To table or not to table? That is the question. 🤔</summary>

1. A table is great for showing structured data. On mobile, with a limited width, not so much.

1. You can use a list to show data vertically. This works until the user rotates the screen and sees only so much at a time.

1. You can use container queries to decide which table columns to show and how many columns to spread the list across.

</details>


<details>

<summary>Create a customizable dashboard 🎛️ 🎚️</summary>

1. It's difficult to create dashboard widgets that can be placed anywhere and look good.

1. As a result, you may artificially constrain your users from customizing their dashboard.

1. If you _combine_ media and container queries, you can better meet the wants of designers, developers, and users.

</details>


<details>

<summary>Responsive images, videos, and D3 visualizations 🖼️ 📽️ 📈</summary>

1. Currently, you have to use [`srcset`](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/srcset) to load images with the optimal file size. Alternatively, you can [use container queries to decide which images to load](https://crunchingnumbers.live/2020/06/03/container-queries-adaptive-images/).

2. Similarly, for videos, you could use container queries to decide format and display resolution.

3. D3 components can use container queries to decide what's the best way to show data. Do you show larger chart elements, show legends, allow scrolling, show text summary? etc.

</details>


<details>

<summary>Create beautiful, printable pages 🖨️</summary>

1. You may be able to compose this addon with others to arrive at something ambitious and unique.

1. For example, [`ember-printable-pages`](https://github.com/forge512/ember-printable-pages) lets us reuse components to make a printable document. The components could focus on presenting data with container queries, while `ember-printable-pages` could focus on deciding page layouts and lazily rendering components.

</details>


<details>

<summary>Hide secrets in games 🎮</summary>

1. You're designing [a game in Ember](https://www.youtube.com/watch?v=Ld1xnQWkqPU).

1. Maybe a secret, most powerful item appears when the game world is at a certain size? :)

</details>

You will find plenty of examples in [`docs-app`](./docs-app). Visit https://ember-container-query.netlify.app/ to see the app in action!

<div align="left">
  <img alt="A demo of ember-container-query shows a smooth transition when using a list or table to display data" src="https://user-images.githubusercontent.com/16869656/82177207-72699c00-989e-11ea-9cb6-2e388c5e98c0.gif" width="600" />
  <img alt="Another demo of ember-container-query shows a dashboard with widgets in mobile, tablet, and desktop resolutions" src="https://user-images.githubusercontent.com/16869656/233708509-1fac7262-239b-4f73-a58e-2ffd62456a73.gif" width="600" />
</div>


## API

`ember-container-query` provides 1 Glimmer component and 3 helpers:

- `<ContainerQuery>`
- `{{aspect-ratio}}`
- `{{height}}`
- `{{width}}`

The addon also provides a modifier so that you can opt out of using the provided component. You may also use the modifier to get the container dimensions when the window is resized.

- `{{container-query}}`

Expand the items below to learn more about the API.


<details>

<summary><code>&lt;ContainerQuery&gt;</code></summary>

### Arguments

You can pass these arguments to the component.

| Name | Required | Description | Type |
|--|:--:|--|--|
| @features | Yes<sup>1</sup> | Container query definitions | POJO |
| @dataAttributePrefix | No | Prefix for data attributes | string |
| @debounce | No | Debounce time for resize (ms) | number ≥ 0 |
| @tagName | No | Container tag name<sup>2</sup> | HTML tag name |

<sup>1. The component renders without error when `@features` isn't provided. In practice, you will always want to set `@features`.</sup>

<sup>2. By default, the component is a `<div>` element. You can pass a valid HTML tag name to facilitate accessibility and semantic HTML.</sup>

### Attributes

You _may_<sup>1</sup> pass attributes to the component for these reasons:

- Style (e.g. `class`, [`local-class`](https://github.com/salsify/ember-css-modules))
- Accessibility (e.g. ARIA attributes<sup>2</sup>, roles)

<sup>1. Do refrain from overusing splattributes (e.g. pass a `{{did-insert}}` modifier to fetch data), since the component's API may change and cause unexpected results. Practice separation of concerns when possible. For example, data fetching can be handled by another element or [`@use` decorator](https://github.com/emberjs/rfcs/blob/use-and-resources/text/0567-use-and-resources.md).</sup>

<sup>2. When an [ARIA attribute has multiple values](https://github.com/ijlee2/ember-container-query/issues/38#issuecomment-647017665), the order of values can matter. At the moment, splattributes doesn't guarantee the order.</sup>

### Output

You can consume these values in your app or addon.

| Name | Yielded | Description | Type |
|--|:--:|--|--|
| features | Yes | Container query results | POJO |
| dimensions | Yes | Container dimensions | POJO |
| data-container-query-_{featureName}_ | No | Data attributes for CSS selector | HTML data attribute |

</details>


<details>

<summary><code>{{aspect-ratio}}</code>, <code>{{height}}</code>, <code>{{width}}</code></summary>

### Arguments

All helpers accept these arguments:

| Name | Required | Description | Type |
|--|:--:|--|--|
| min | Yes<sup>1</sup> | Lower bound for feature<sup>2</sup> | number ≥ 0 |
| max | Yes<sup>1</sup> | Upper bound for feature<sup>2</sup> | number ≥ 0 |

<sup>1. The helpers use default values of `min = 0` and `max = Infinity`, and assume the inequalities `min ≤ x < max`. In practice, you will always want to set `min` or `max` (or both).</sup>

<sup>2. Aspect ratio is unitless. Height and width have the unit of pixel.</sup>

</details>


<details>

<summary><code>{{container-query}}</code></summary>

### Arguments

You can pass these arguments to the modifier.

- `@dataAttributePrefix`
- `@debounce`
- `@features`
- `@onQuery`

For more information, refer to [the arguments of `<ContainerQuery>` component](#arguments).


### Output

The output is similar to [those of `<ContainerQuery>` component](#output).

Data attributes are automatically applied to the HTML element. To get `dimensions` and `features`, you will need to pass the argument `@onQuery` (a function) to the modifier.

```ts
/* app/components/chart.gts */
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { containerQuery, type Dimensions } from 'ember-container-query';

export default class Chart extends Component {
  @tracked height: number;
  @tracked width: number;

  @action updateDimensions({ dimensions }: { dimensions: Dimensions }) {
    const { height, width } = dimensions;

    this.height = height;
    this.width = width;
  }

  // ...

  <template>
    <div {{containerQuery onQuery=this.updateDimensions}}>
      <svg></svg>
    </div>
  </template>
}
```

</details>


## Compatibility

- Ember.js v4.12 or above
- Node.js v20 or above


## Contributing

See the [Contributing](./CONTRIBUTING.md) guide for details.


## Credits

Much thanks goes to [Chad Carbert (@chadian)](https://github.com/chadian), who introduced me to container queries at [EmberFest 2019](https://www.youtube.com/watch?v=RIdjk9_RSBY) and created [`ember-fill-up`](https://github.com/chadian/ember-fill-up) 🌟. I modeled the API for `ember-container-query` based on Chad's addon.


## License

This project is licensed under the [MIT License](./LICENSE.md).

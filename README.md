[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/ember-container-query/workflows/CI/badge.svg)](https://github.com/ijlee2/ember-container-query/actions?query=workflow%3ACI)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Isaac/ember-container-query)

ember-container-query
==============================================================================

_Make container queries that harness the power of Ember Octane._

![Demo of ember-container-query](https://user-images.githubusercontent.com/16869656/82177207-72699c00-989e-11ea-9cb6-2e388c5e98c0.gif)

Open the [demo app](https://ember-container-query.netlify.app/) to see `ember-container-query` in action. (There's even a 404 page!)


Installation
------------------------------------------------------------------------------

```
ember install ember-container-query
```

<details>
<summary>Use FastBoot? ⚠️</summary>

This addon uses nullish coalescing operator `??`. If you use [FastBoot](https://github.com/ember-fastboot/ember-cli-fastboot) (with `Node < v14.0`) and only support [browsers that natively support `??`](https://v8.dev/features/nullish-coalescing#support), you will run into a build error:

```bash
/var/folders/2z/93zyyhx13rs879qr8rzyxrb40000gn/T/broccoli-689520dxo26a682Mz/out-529-broccoli_merge_trees/assets/vendor.js:121232
  return this.args.features ?? {};
                             ^
SyntaxError: Unexpected token '?'
```

To prevent this, please make sure to add `node: 'current'` to your `config/targets.js` file.

```javascript
'use strict';

const browsers = [ ... ];

module.exports = {
  browsers,
  node: 'current'
};
```

</details>


Applications
------------------------------------------------------------------------------

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


API
------------------------------------------------------------------------------

The addon provides 1 Glimmer component and 3 helpers:

- `<ContainerQuery>`
- `{{cq-aspect-ratio}}`
- `{{cq-height}}`
- `{{cq-width}}`


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

### Outputs

You can consume these values in your app or addon.

| Name | Yielded | Description | Type |
|--|:--:|--|--|
| features | Yes | Container query results | POJO |
| dimensions | Yes | Container dimensions | POJO |
| data-container-query-_{featureName}_ | No | Data attributes for CSS selector | HTML data attribute |

</details>


<details>
<summary><code>{{cq-aspect-ratio}}</code>, <code>{{cq-height}}</code>, <code>{{cq-width}}</code></summary>

### Arguments

All helpers accept these arguments:

| Name | Required | Description | Type |
|--|:--:|--|--|
| min | Yes<sup>1</sup> | Lower bound for feature<sup>2</sup> | number ≥ 0 |
| max | Yes<sup>1</sup> | Upper bound for feature<sup>2</sup> | number ≥ 0 |

<sup>1. The helpers use default values of `min = 0` and `max = Infinity`, and assume the inequalities `min ≤ x < max`. In practice, you will always want to set `min` or `max` (or both).</sup>

<sup>2. Aspect ratio is unitless. Height and width have the unit of pixel.</sup>

</details>


Example
------------------------------------------------------------------------------

Let's look at the code that created the video demo above.

<details>
<summary><code>app/templates/album.hbs</code></summary>

```handlebars
<ContainerQuery
  @features={{hash
    large=(cq-width min=960)
    tall=(cq-height min=400)
  }}
  as |CQ|
>
  {{#let
    (and CQ.features.large CQ.features.tall)
    as |showLyrics|
  }}
    <section local-class="container {{if showLyrics "with-lyrics"}}">
      <header local-class="album-header">
        <h1>{{@model.name}}</h1>
        <p>by <strong>{{@model.band.name}}</strong></p>
      </header>

      <div local-class="album-tracks">
        <Tracks
          @tracks={{@model.tracks}}
        />
      </div>

      {{#if showLyrics}}
        <div local-class="track-lyrics" tabindex="0">
          <Lyrics
            @lyrics={{this.currentTrack.lyrics}}
          />
        </div>
      {{/if}}
    </section>
  {{/let}}
</ContainerQuery>
```

</details>

<details>
<summary><code>app/components/tracks.hbs</code></summary>

```handlebars
<ContainerQuery
  @features={{hash
    small=(cq-width max=480)
    medium=(cq-width min=480 max=640)
    large=(cq-width min=640)
    tall=(cq-height min=320)
  }}
  as |CQ|
>
  {{#if (and CQ.features.large CQ.features.tall)}}
    <Tracks::Table
      @tracks={{@tracks}}
    />

  {{else}}
    <Tracks::List
      @numColumns={{
        if CQ.features.small 1
        (if CQ.features.medium 2 3)
      }}
      @tracks={{@tracks}}
    />

  {{/if}}
</ContainerQuery>
```

</details>

You can see that the album page uses 2 `<ContainerQuery>` components. Rest assured, they act independently of each other. When you pair `<ContainerQuery>` with some CSS, you can create layouts beyond the dreams of others! 🙌

For more examples, I encourage you to check out the code for my demo app. It is located under [`tests/dummy/app`](https://github.com/ijlee2/ember-container-query/tree/main/tests/dummy/app) folder and is structured like a typical Ember app.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.20 or above<sup>1</sup>
* Ember CLI v3.20 or above
* Node.js v12 or above
* Modern browsers<sup>1</sup> (IE 11 won't be supported)

<sup>1. Until you can adopt Ember Octane and drop support for IE 11, I recommend using [`ember-fill-up`](https://github.com/chadian/ember-fill-up) to do container queries. The APIs are similar so your migration should be smooth. Chad Carbert and I will ensure that the addons are maintained side-by-side for some time.</sup>


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


Credits
------------------------------------------------------------------------------

Much thanks goes to [Chad Carbert (@chadian)](https://github.com/chadian), who introduced me to container queries at [EmberFest 2019](https://www.youtube.com/watch?v=RIdjk9_RSBY) and created [`ember-fill-up`](https://github.com/chadian/ember-fill-up) 🌟. I modeled the API for `ember-container-query` based on Chad's addon.

Also to the Ember teams and [Garrett Murphey (@gmurphey)](https://github.com/gmurphey), without whom [`@ember/render-modifiers`](https://github.com/emberjs/ember-render-modifiers) and [`ember-did-resize-modifier`](https://github.com/gmurphey/ember-did-resize-modifier) wouldn't exist.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
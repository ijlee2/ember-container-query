![CI](https://github.com/ijlee2/ember-container-query/workflows/CI/badge.svg)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Isaac/ember-container-query)

ember-container-query
==============================================================================

_Make container queries that harness the power of Ember Octane._

![Demo of ember-container-query](https://user-images.githubusercontent.com/16869656/82177207-72699c00-989e-11ea-9cb6-2e388c5e98c0.gif)

Open the [demo app](https://ember-container-query.herokuapp.com/) to see `ember-container-query` in action. (There's even a 404 page!)


Installation
------------------------------------------------------------------------------

```
ember install ember-container-query
```


Usage
------------------------------------------------------------------------------

The addon provides 1 Glimmer component and 3 helpers:

- `<ContainerQuery>`
- `{{cq-aspect-ratio}}`
- `{{cq-height}}`
- `{{cq-width}}`


### API

#### `<ContainerQuery>`

The component uses `...attributes` so that you can pass `class` or [`local-class`](https://github.com/salsify/ember-css-modules) _for styling_.<sup>1</sup>

It also accepts these arguments:

| Name | Required | Description | Type |
|--|:--:|--|--|
| @features | Yes<sup>2</sup> | Container query definitions | POJO |
| @dataAttributePrefix | No | Prefix for data attributes | string |
| @debounce | No | Debounce time for resize (ms) | number ≥ 0 |

The component returns a few values that you can consume:

| Name | Yielded | Description | Type |
|--|:--:|--|--|
| features | Yes | Container query results | POJO |
| dimensions | Yes | Container dimensions | POJO |
| data-container-query-_{featureName}_ | No | Data attributes for CSS selector | HTML data attribute |

<sup>1. Do refrain from overusing splattributes (e.g. pass a `{{did-insert}}` modifier to fetch data), since the component's API may change and cause unexpected results. Practice separation of concerns when possible. For example, data fetching can be handled by another element or [`@use` decorator](https://github.com/emberjs/rfcs/blob/use-and-resources/text/0567-use-and-resources.md).</sup>

<sup>2. The component renders without error when `@features` isn't provided. In practice, you will always want to set `@features`.</sup>


#### `{{cq-aspect-ratio}}`, `{{cq-height}}`,  `{{cq-width}}`

All helpers accept these arguments:

| Name | Required | Description | Type |
|--|:--:|--|--|
| min | Yes<sup>1</sup> | Lower bound for feature<sup>2</sup> | number ≥ 0 |
| max | Yes<sup>1</sup> | Upper bound for feature<sup>2</sup> | number ≥ 0 |

<sup>1. The helpers use default values of `min = 0` and `max = Infinity`, and assume the inequalities `min ≤ x < max`. In practice, you will always want to set `min` or `max` (or both).</sup>

<sup>2. Aspect ratio is unitless. Height and width have the unit of pixel.</sup>


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

For more examples, I encourage you to check out the code for my demo app. It is located under [`tests/dummy/app`](https://github.com/ijlee2/ember-container-query/tree/master/tests/dummy/app) folder and is structured like a typical Ember app.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


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
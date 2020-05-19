![CI](https://github.com/ijlee2/ember-container-query/workflows/CI/badge.svg)

ember-container-query
==============================================================================

_Make container queries that harness the power of Ember Octane._

![Demo of ember-container-query](https://user-images.githubusercontent.com/16869656/82177207-72699c00-989e-11ea-9cb6-2e388c5e98c0.gif)


Installation
------------------------------------------------------------------------------

```
ember install ember-container-query
```


Usage
------------------------------------------------------------------------------

The addon provides 1 Glimmer component and 2 helpers:

- `<ContainerQuery>`
- `{{cq-height}}`
- `{{cq-width}}`


### API

#### `<ContainerQuery>`

The component accepts these arguments:

| Name | Required | Description | Type |
|--|:--:|--|--|
| @breakpoints | Yes<sup>1</sup> | Container query definitions | POJO |
| @classPrefix | No | Prefix for CSS selectors | string |
| @debounce | No | Debounce time (ms) for resize | number ≥ 0 |

It returns a few values that you can consume:<sup>2</sup>

| Name | Yielded | Description |
|--|:--:|--|
| breakpoints | Yes | container query results |
| height | Yes | container height |
| width | Yes | container width |
| container-query--_{breakpointName}_ | No | CSS selector(s) |
| data-test-container-query | No | test selector |

<sup>1. The component renders without error when `@breakpoints` isn't provided. In practice, you will always want to set `@breakpoints`.</sup>

<sup>2. In practice, you will likely only use `breakpoints` (maybe CSS selectors).</sup>

#### `{{cq-height}}`,  `{{cq-width}}`

Both helpers accept these arguments:

| Name | Required | Description | Type |
|--|:--:|--|--|
| min | Yes<sup>1,2</sup> | Lower bound for container size (px) | number ≥ 0 |
| max | Yes<sup>1,2</sup> | Upper bound for container size (px) | number ≥ 0 |

<sup>1. The helpers use default values of `min = 0` and `max = Infinity`. In practice, you will always want to set `min` or `max` (or both).</sup>

<sup>2. The helpers assume the inequalities `min ≤ x < max`.</sup>


Example
------------------------------------------------------------------------------

Let's look at the code that created the video demo above. You can see that the album page uses 2 `<ContainerQuery>` components. Rest assured, they act independently of each other.

When you pair `<ContainerQuery>` with some [CSS](https://github.com/salsify/ember-css-modules), you can create layouts beyond the dreams of others! 🙌

```handlebars
{{!-- app/templates/album.hbs --}}

<ContainerQuery
  @breakpoints={{hash
    large=(cq-width min=960)
    tall=(cq-height min=400)
  }}
  as |CQ|
>
  {{#let
    (and CQ.breakpoints.large CQ.breakpoints.tall)
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

```handlebars
{{!-- app/components/tracks.hbs --}}

<ContainerQuery
  @breakpoints={{hash
    small=(cq-width max=480)
    medium=(cq-width min=480 max=640)
    large=(cq-width min=640)
    tall=(cq-height min=320)
  }}
  as |CQ|
>
  {{#if (and CQ.breakpoints.large CQ.breakpoints.tall)}}
    <Tracks::Table
      @tracks={{@tracks}}
    />

  {{else}}
    <Tracks::List
      @numColumns={{
        if CQ.breakpoints.small 1
        (if CQ.breakpoints.medium 2 3)
      }}
      @tracks={{@tracks}}
    />

  {{/if}}
</ContainerQuery>
```


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

Much thanks goes to [Chad Carbert (@chadian)](https://github.com/chadian), who introduced us to container queries at [EmberFest 2019](https://www.youtube.com/watch?v=RIdjk9_RSBY) and created [`ember-fill-up`](https://github.com/chadian/ember-fill-up) 🌟. I modeled the API for `ember-container-query` based on Chad's addon.

Also to the Ember teams and [Garrett Murphey (@gmurphey)](https://github.com/gmurphey), without whom [`@ember/render-modifiers`](https://github.com/emberjs/ember-render-modifiers) and [`ember-did-resize-modifier`](https://github.com/gmurphey/ember-did-resize-modifier) wouldn't exist.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
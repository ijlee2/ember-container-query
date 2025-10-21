import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';
import Tracks from 'docs-app/components/tracks';
import UiPage from 'docs-app/components/ui/page';
import type { Model } from 'docs-app/routes/album';
import { ContainerQuery, height, width } from 'ember-container-query';
import { pageTitle } from 'ember-page-title';
import { and } from 'ember-truth-helpers';
import { local } from 'embroider-css-modules';

import styles from './album.module.css';

interface AlbumSignature {
  Args: {
    controller: unknown;
    model: Model;
  };
}

<template>
  {{pageTitle "Album"}}

  <UiPage @title={{@model.name}}>
    <ContainerQuery
      @features={{hash large=(width min=960) tall=(height min=400)}}
      as |CQ|
    >
      {{#let (and CQ.features.large CQ.features.tall) as |showLyrics|}}
        <div class={{local styles "container" (if showLyrics "with-lyrics")}}>
          <div class={{styles.album-summary}}>
            <div>
              by
              <strong>{{@model.band.name}}</strong>
            </div>

            <div>
              {{@model.publicationDate}}
              ·
              {{@model.tracks.length}}
              songs
              {{#if @model.tracks}}
                ·
                {{@model.totalLengthInMinutes}}
                minutes
              {{/if}}
            </div>
          </div>

          <div class={{styles.album-tracks}} tabindex={{if showLyrics "0"}}>
            <Tracks @tracks={{@model.tracks}} />
          </div>

          {{#if showLyrics}}
            <div
              class={{styles.track-lyrics}}
              data-test-track-lyrics
              tabindex="0"
            >
              <p class={{styles.heading-2}}>Lyrics</p>

              <div>
                <p class={{styles.heading-3}}>Verse 1</p>
                <p class={{styles.lyrics}}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p class={{styles.lyrics}}>
                  Feugiat in ante metus dictum at. Donec ac odio tempor orci
                  dapibus. Turpis in eu mi bibendum.
                </p>
                <p class={{styles.lyrics}}>
                  Aliquet nibh praesent tristique magna sit amet. Risus
                  ultricies tristique nulla aliquet enim tortor.
                </p>
              </div>

              <div>
                <p class={{styles.heading-3}}>Chorus</p>
                <p class={{styles.lyrics}}>
                  Aliquet eget sit amet tellus cras adipiscing. ♫
                </p>
                <p class={{styles.lyrics}}>
                  Diam vel quam elementum pulvinar etiam non quam lacus
                  suspendisse.
                </p>
              </div>

              <div>
                <p class={{styles.heading-3}}>Verse 2</p>
                <p class={{styles.lyrics}}>
                  Arcu dui vivamus arcu felis bibendum ut tristique. Est
                  pellentesque elit ullamcorper dignissim cras.
                </p>
                <p class={{styles.lyrics}}>
                  In mollis nunc sed id semper risus in hendrerit. Sit amet
                  aliquam id diam maecenas ultricies.
                </p>
                <p class={{styles.lyrics}}>
                  Massa sed elementum tempus egestas sed. At ultrices mi tempus
                  imperdiet nulla malesuada.
                </p>
              </div>

              <div>
                <p class={{styles.heading-3}}>Chorus</p>
                <p class={{styles.lyrics}}>
                  Aliquet eget sit amet tellus cras adipiscing. ♫
                </p>
                <p class={{styles.lyrics}}>
                  Mi ipsum faucibus vitae aliquet nec ullamcorper. Purus viverra
                  accumsan in nisl.
                </p>
              </div>

              <div>
                <p class={{styles.heading-3}}>Bridge</p>
                <p class={{styles.lyrics}}>
                  Maecenas sed enim ut sem viverra aliquet.
                </p>
                <p class={{styles.lyrics}}>
                  Vitae suscipit tellus mauris a diam maecenas sed.
                </p>
                <p class={{styles.lyrics}}>
                  At erat pellentesque adipiscing commodo elit at imperdiet.
                </p>
              </div>

              <div>
                <p class={{styles.heading-3}}>Chorus</p>
                <p class={{styles.lyrics}}>
                  Aliquet eget sit amet tellus cras adipiscing. ♫
                </p>
                <p class={{styles.lyrics}}>
                  Imperdiet proin fermentum leo vel orci porta non pulvinar
                  neque. Vulputate odio ut enim blandit.
                </p>
              </div>

              <div>
                <p class={{styles.heading-3}}>Outro</p>
                <p class={{styles.lyrics}}>
                  Aliquet lectus proin nibh nisl condimentum.
                </p>
                <p class={{styles.lyrics}}>
                  Ut aliquam purus sit amet luctus venenatis lectus magna.
                </p>
              </div>
            </div>
          {{/if}}
        </div>
      {{/let}}
    </ContainerQuery>
  </UiPage>
</template> satisfies TOC<AlbumSignature>;

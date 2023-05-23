/*
  ember-svg-jar ships its own code for the svg-jar helper in the `app` tree,
  which makes it un-importable from an addon like us.

  They seem to have fixed that on master
  (https://github.com/voltidev/ember-svg-jar/pull/213) but it is unreleased as
  of now.

  Until then, this vendors that small amount of code into our own utility here,
  along with some type annotations that are lacking upstream.
*/

import { importSync } from '@embroider/macros';
import type { ContentValue } from '@glint/template';
// @ts-expect-error no upstream types
import makeSVG from 'ember-svg-jar/utils/make-svg';

function getInlineAsset(assetId: string) {
  try {
    return (
      importSync(`ember-svg-jar/inlined/${assetId}`) as { default: unknown }
    ).default;
  } catch (err) {
    return null;
  }
}

export function svgJar(
  assetId: string,
  svgAttrs?: {
    class?: string;
    desc?: string;
    height?: string | number;
    role?: string;
    title?: string;
    width?: string | number;
  },
): ContentValue {
  const svgArgs = Object.assign({}, svgAttrs);

  if (svgAttrs?.height?.toString) {
    svgArgs.height = svgAttrs.height?.toString();
  }

  if (svgAttrs?.width?.toString) {
    svgArgs.width = svgAttrs.width?.toString();
  }

  return makeSVG(assetId, svgArgs, getInlineAsset);
}

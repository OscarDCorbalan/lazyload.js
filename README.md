# README not finished

## Install

```shell
npm install lazyloadjs --save
```

Also available for `<script>` users:
  - ....

## Simple example

See more [examples](examples/).

```html
<!DOCTYPE html>
<html>
  <head>
    <title>lazyload</title>
  </head>
  <body>
    <script src="lazyload.min.js"></script>

    <!-- A lot of content -->
    <!-- A lot of content -->

    <img
      data-src="real/image/src.jpg"
      src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
      onload="lzld(this)">
  </body>
</html>
```

Make sure your webpage is in [standards mode](http://en.wikipedia.org/wiki/Document_Type_Declaration#HTML5_DTD-less_DOCTYPE).

Viewport computing is badly handled by browsers when in [quirksmode](http://en.wikipedia.org/wiki/Quirks_mode).

If you do not want to use a data-uri as your src, you can also use the provided [b.gif](b.gif) which is
the [tiniest gif ever](http://probablyprogramming.com/2009/03/15/the-tiniest-gif-ever).

On most websites, you better let the first top images not bound to lzld method.
So that they shows really fast.

## Advanced example

`lazyloadjs` is an npm module and is compatible with browserify.

```js
global.myLazyload = require('lazyloadjs')();
```

```html
<img
  data-src="real/image/src.jpg"
  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
  onload="myLazyload(this)">
```

Per default, `lazyloadjs` exposes the `lzld` instance on the global
object. So that in most cases, you just need to require it in your webpage.

## API

## var lzld = lazyload([opts])

`opts` is an object with these defaults:

```js
{
  container: document.body,
  offset: 333,
  src: 'data-src' // or function(elt) { return customSrc }
}
```

`opts.container` is the referencing container, it's the viewport, defaults to `document.body`

`opts.offset` is a length in pixels used to compute when an element will
soon be visible. So that you load it just before it becomes visible.

`src` is the attribute name storing the real src of the element to load.

`src` can also be a `function`, so that you can have your custom `src` computing algorithm.
You can use it to [lazyload High DPI/retina images](examples/hidpi.html).

## Launching the examples

```shell
npm run examples
```

## Developing

Launch the dev server:

```shell
npm run dev
```

Browse to [http://localhost:8080/__zuul](http://localhost:8080/__zuul).

[Tests](test/) are written with [mocha](https://github.com/visionmedia/mocha).

## Building

We provide a pre-built version of `lazyloadjs` in `build/lazyload.min.js`.

But you can build your own:

```shell
npm run build
```

You get the build in `build/lazyload.min.js`.

Please consider using [browserify](https://github.com/substack/node-browserify).

## Sites using lazyload

...

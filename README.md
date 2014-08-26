# jquery-bottomless

<a href="http://apostrophenow.org/"><img src="https://raw.github.com/punkave/jquery-bottomless/master/logos/logo-box-madefor.png" align="right" /></a>

`jquery-bottomless` is an infinite scroll plugin that has been torture-tested by naive users with old versions of IE, which is important because permanently replacing pagination with infinite scroll on a public facing site is a high risk, high benefit proposition. `jquery-bottomless` has a sweet and simple API.

## Requirements

You need jQuery, of course. `jquery-bottomless` is actively supported with jQuery 1.9 and 2.0 but should work fine with older versions. `jquery-bottomless` is supported in IE7 or better and in recent versions of Firefox, Chrome, Opera and Safari. (We do not officially support IE6, because Microsoft doesn't, but that works too.)

## How to Use

This example assumes we have an element with the class `apos-blog-posts` that already contains the first page of blog posts. We also have a pager with the class `apos-pager` that should be hidden by JavaScript when infinite scroll is available. (This is a common pattern to ensure Google still sees a pager.)

    $(function() {
      $('.my-blog-posts').bottomless({
        url: '/fetch-blog-content'
      });
      // We don't need the pager if we can infinite scroll
      // However we hide it with JavaScript so that
      // Google still finds it otherwise we have serious SEO issues!
      $('.apos-pager').hide();
    });

### Basics

The element you apply this plugin to must be the element that you'd
like to append new pages of content to. It should be initially empty
(if you are using the `now` option) or be prepopulated with the content of page 1 (this is the default). Currently the element must not have an internal scrollbar and should cause the height of the page to grow.

### Required Option: `url`

`url` is the URL to fetch new "pages" from. The URL should return an
HTML fragment containing one page's worth of content, based on the
`page` parameter to the URL. Each retrieved fragment is appended to the element. The definition of "one page" is up to
you but it ought to be at least a screenful. **Your URL must return a 404 status code if a page beyond the last page is requested!**

The first `page` is page 1. It is OK to return an empty page for page 1 if there is no content.

### Other Options

`page` specifies the initial page number and defaults to 1,
which assumes you are preloading one page of content already. If you
are not preloading any content and wish the first page to load immediately, set `now` to true and do not set `page`.

Set `now` to true to load the first page immediately. You do not have to
set `page` if you set `now`.

`criteria` contains additional query string parameters and is often used when additional filtering options besides pagination are available. Also note the `aposScrollReset` event below.

`method` can be used to change the HTTP method from GET to POST.

`spinner` is a selector, jQuery object or DOM element to be displayed while a page is loading.

`distance` is the distance, in pixels, from the bottom of the element at
which the next page begins loading, hopefully preventing the user from
waiting in most cases. `distance` defaults to 350.

`success` allows you to pass your own function to accept a new page from the server and do something with it. This is your ticket if you are not simply appending HTML to a container element. The `success` function receives the data as its only argument. If your server does not use a 404 status code to indicate that there are no more pages, you may wish to trigger an `aposScrollEnded` event on the element from your success function to signify that there is no more data. Also see `skipAndLimit`.

`dataType`, which defaults to `html`, allows you to specify what kind of data is coming from the server. We suggest setting this to `json` if you want to specify a `success` function that expects data rather than appending HTML to a container.

`skipAndLimit` causes bottomless to send `skip` and `limit` parameters to the server, rather than the page number. You should also set the `perPage` option, which defaults to 20, so that `skip` and `limit` can be determined. `skip` and `limit` will be familiar to MongoDB developers, but can also be used as `offset` and `limit` with SQL-based servers.

`reset` allows you to specify a function to be called to actually empty the element of previous content when an `aposScrollReset` event is received. If you do not specify this option, `$el.html('')` is used. If there are children of the element that shouldn't be removed on reset, make sure you specify your own `reset` function.

### Events

You can trigger `aposScrollReset` on the element to clear it and
reload page one.

You can also trigger `aposScrollEnded` on the element to signify that there is no more content to load. This is useful if you do not wish to use a 404 status code from the server to signify this.

You can also provide new criteria for the URL's query string when triggering this event:

    $('.posts').trigger('aposScrollReset', [ { tag: 'blue' } ])

You can trigger `aposScrollDestroy` on the element to shut down bottomless completely, destroying its interval timer so it does not consume any resources. This is usually not necessary, but you may find it useful if you are removing an element powered by bottomless from the DOM without leaving the page entirely. Even if you don't trigger this event, bottomless will behave respectfully and not attempt to examine its position on the page or fetch more content while it is not in the DOM.

bottomless will trigger the following events on the element on its own:

`aposScrollStarted` means page loading has begun.
`aposScrollStopped` means page loading has just stopped (whether successfully or not).
`aposScrollLoaded` means a page has just been loaded successfully.
`aposScrollEnded` means a 404 has been received and there is no more content to load. No further pages will be loaded unless an `aposScrollReset` event is triggered.

### Properties

Assuming $('.posts') is your element, you may check whether the element is
currently loading a page with:

    $('.posts').data('loading')

You may check the current page number with:

    $('.posts').data('page')

## Changelog

0.2.5: gracefully debounce reset requests to prevent race conditions and slamming of the server. If an `aposScrollReset` arrives while a previous reset request is in progress, retry it in 500ms. If another reset has already been deferred, cancel that one in favor of the new one. This means you can safely trigger `aposScrollReset` on every keystroke, for instance. use Also safely queue simultaneous page loads, although that should be unlikely.

Also, when loading page one, defer emptying the container until a response is received. This prevents unsightly flicker when triggering `aposScrollReset` on keystrokes.

0.2.4: call `start` on every page load. Thanks to [Samer Buna](https://github.com/samerbuna).

0.2.3: added the `success`, `dataType`, `skipAndLimit` and `reset` options, which permit `jquery-bottomless` to be used easily when you are not rendering HTML on the server side or wish `bottomless` to calculate its own page offsets. Also the `aposScrollDestroy` event, which completely kills the interval timer so that bottomless ceases to use any resources. And bottomless behaves politely when not in the DOM even if you don't use that event. You should use `aposScrollDestroy` only if you are completely through with bottomless for this element forever.

0.2.2: packaging issues, no code changes.

0.2.1: the example and documentation are now correct. Thanks to Thibault.

0.2.0: all events now have camelCasedNames, for consistency with the rest of Apostrophe and because dotted names should be reserved for jQuery's "namespacing" mechanism, which is a way of adding and removing groups of event handlers and not a mechanism for setting up distinct events. Since this will break code that already triggers `apos.scroll.reset` we have bumped the middle version number.

## About P'unk Avenue and Apostrophe

`jquery-bottomless` was created at [P'unk Avenue](http://punkave.com) for use in Apostrophe, an open-source content management system built on node.js. If you like `jquery-bottomless` you should definitely [check out apostrophenow.org](http://apostrophenow.org). Also be sure to visit us on [github](http://github.com/punkave).

## Support

Feel free to open issues on [github](http://github.com/punkave/jquery-bottomless).

<a href="http://punkave.com/"><img src="https://raw.github.com/punkave/jquery-bottomless/master/logos/logo-box-builtby.png" /></a>


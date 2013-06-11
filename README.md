# jquery-bottomless

<a href="http://apostrophenow.org/"><img src="https://raw.github.com/punkave/jquery-bottomless/master/logos/logo-box-madefor.png" align="right" /></a>

`jquery-bottomless` is an infinite scroll plugin that has been torture-tested by naive users with old versions of IE, which is important because permanently replacing pagination with infinite scroll on a public facing site is a high risk, high benefit proposition. `jquery-bottomless` has a sweet and simple API.

## Requirements

You need jQuery, of course. `jquery-bottomless` is actively supported with jQuery 1.9 and 2.0 but should work fine with older versions. `jquery-bottomless` is supported in IE7 or better and in recent versions of Firefox, Chrome, Opera and Safari. (We do not officially support IE6, because Microsoft doesn't, but that works too.)

## How to Use

This example assumes we have an element with the class `apos-blog-posts` that already contains the first page of blog posts. We also have a pager with the class `apos-pager` that should be hidden by JavaScript when infinite scroll is available. (This is a common pattern to ensure Google still sees a pager.)

    $('.apos-blog-posts').infiniteScroll({
      // We'll hit up page.url with a `page` query parameter.
      // By default, assumes we already loaded page 1, and
      // fetches page 2. Server MUST return a 404 status code
      // if there are no more pages
      source: {{ page.url | json }}
    });

    // Hide our pager since we're doing infinite scroll
    $('.apos-pager').hide();

### Basics

The element you apply this plugin to must be the element that you'd
like to append new pages of content to. It should be initially empty
(if you are using the `now` option) or be prepopulated with the content of page 1 (this is the default). Currently the element must not have an internal scrollbar and should cause the height of the page to grow.

### Required Option: `source`

`source` is the URL to fetch new "pages" from. The URL should return an
HTML fragment containing one page's worth of content, based on the
`page` parameter to the URL. Each retrieved fragment is appended to the element. The definition of "one page" is up to
you but it ought to be at least a screenful. **Your source must return a 404 status cocde if a page beyond the last page is requested!**

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

### Events

You can trigger an `aposScrollReset` on the element to clear it and
reload page one.

You can also provide new criteria for the source URL's query string when triggering this event:

$('.posts').trigger('aposScrollReset', [ { tag: 'blue' } ])

bottomless will trigger the following events on the element on its own:

`aposScrollStarted` means page loading has begun.
`aposScrollStopped` means page loading has just stopped (whether successfully or not).
`aposScrollLoaded` means a page has just been loaded successfully.
`aposScrollEnded` means a 404 has been received and there is no
more content to load. No further pages will be loaded unless
an `aposScrollReset` event is triggered.

### Properties

Assuming $('.posts') is your element, you may check whether the element is
currently loading a page with:

    $('.posts').data('loading')

You may check the current page number with:

    $('.posts').data('page')

## Changelog

0.2.0: all events now have camelCasedNames, for consistency with the rest of Apostrophe and because dotted names should be reserved for jQuery's "namespacing" mechanism, which is a way of adding and removing groups of event handlers and not a mechanism for setting up distinct events. Since this will break code that already triggers `apos.scroll.reset` we have bumped the middle version number.

## About P'unk Avenue and Apostrophe

`jquery-bottomless` was created at [P'unk Avenue](http://punkave.com) for use in Apostrophe, an open-source content management system built on node.js. If you like `jquery-bottomless` you should definitely [check out apostrophenow.org](http://apostrophenow.org). Also be sure to visit us on [github](http://github.com/punkave).

## Support

Feel free to open issues on [github](http://github.com/punkave/jquery-bottomless).

<a href="http://punkave.com/"><img src="https://raw.github.com/punkave/jquery-bottomless/master/logos/logo-box-builtby.png" /></a>


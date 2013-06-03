# jquery-images-ready

<a href="http://apostrophenow.org/"><img src="https://raw.github.com/punkave/jquery-images-ready/master/logos/logo-box-madefor.png" align="right" /></a>

imagesReady waits until the size of certain images is known, then tells you the maximum width, maximum height, and maximum ratio of height to width of all the images. This is super useful for implementing slideshows and anything else where you need to know the worst case before proceeding, or simply for any situation where you need to be sure of the image dimensions before proceeding. Well-tested back to IE8.

## How to Use

$('.my-images').imagesReady(function(maxWidth, maxHeight, maxHeightToWidth) {
  // Your code here
});

Note that `imagesReady` will wait for all of the images either matching the selector directly or contained within elements that do match the selector. This is very useful when you wish to wait for all of the images in a slideshow. If you want to match only certain images, though, you can use filters in your selector to be more specific.

*The reported sizes are always the true size, regardless of any CSS that may be in effect.*

"Why `maxHeightToWidth`?" This ratio is useful when you are using `width: 100%` to size images and allowing the height to scale freely. In that situation it is important to know what the greatest height will be, so that you can size a slideshow intelligently to avoid jumpiness when the user scrolls below the slideshow. You can determine this maximum height by multiplying the width of the containing element by `maxHeightToWidth`.

For a sweet jQuery slideshow plugin that takes advantage of this, check out [projector](http://github.com/punkave/jquery-projector).

### Requirements

You need jQuery, of course. `jquery-images-ready` is actively supported with jQuery 1.9 and 2.0 but may work with older versions.

## About P'unk Avenue and Apostrophe

`jquery-images-ready` was created at [P'unk Avenue](http://punkave.com) for use in Apostrophe, an open-source content management system built on node.js. If you like `jquery-images-ready` you should definitely [check out apostrophenow.org](http://apostrophenow.org). Also be sure to visit us on [github](http://github.com/punkave).

## Support

Feel free to open issues on [github](http://github.com/punkave/jquery-images-ready).

<a href="http://punkave.com/"><img src="https://raw.github.com/punkave/jquery-images-ready/master/logos/logo-box-builtby.png" /></a>


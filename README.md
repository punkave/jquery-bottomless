# jquery-radio

<a href="http://apostrophenow.org/"><img src="https://raw.github.com/punkave/jquery-radio/master/logos/logo-box-madefor.png" align="right" /></a>

`jquery-radio` makes it easy to get or set the current value of a group of radio buttons, filling a gap in jQuery's `$.val()`.

## How to Use

Select *all* of the buttons in the group and call `.radio()`:

    // Check the box with value="5"
    $('input.my-radio-group').radio(5);
    // Get the value of the checked box
    var value = $('input.my-radio-group').radio();

This example assumes you have several radio buttons that all have the `.my-radio-group` class.

### Requirements

You need jQuery, of course. `jquery-radio` is actively supported with jQuery 1.9 and 2.0 but should work fine with older versions.

## About P'unk Avenue and Apostrophe

`jquery-radio` was created at [P'unk Avenue](http://punkave.com) for use in Apostrophe, an open-source content management system built on node.js. If you like `jquery-radio` you should definitely [check out apostrophenow.org](http://apostrophenow.org). Also be sure to visit us on [github](http://github.com/punkave).

## Support

Feel free to open issues on [github](http://github.com/punkave/jquery-radio).

<a href="http://punkave.com/"><img src="https://raw.github.com/punkave/jquery-radio/master/logos/logo-box-builtby.png" /></a>


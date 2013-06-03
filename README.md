# jquery-selective

<a href="http://apostrophenow.org/"><img src="https://raw.github.com/punkave/jquery-selective/master/logos/logo-box-madefor.png" align="right" /></a>

`jquery-selective` provides multiple selection with autocomplete: a list to which items may be added by typing part of the label. A server-side or client-side source may be specified for autocomplete (see jQuery UI $.autocomplete). Items may be reordered if the sortable option is present (this feature requires jQuery UI sortable). Items may also be removed. This plugin is basically a mashup of jQuery autocomplete and jQuery sortable. It is especially useful when there are too many options to be presented in an ordinary dropdown list.

## Requirements

You need jQuery, of course. `jquery-selective` is actively supported with jQuery 1.9 and 2.0 but should work fine with reasonably recent versions. `jquery-selective` is supported in IE7 or better and in recent versions of Firefox, Chrome, Opera and Safari. (We cannot officially support IE6, because Microsoft doesn't, but that probably works too.)

You also need jquery.ui.autocomplete. jquery.ui.sortable is optional. See [jqueryui.com](http://jqueryui.com/) for more information on these widely used plugins, typically downloaded as part of a single build.

## How to Use

### Your Markup

The element on which you call $.selective must have the following
structure (the div is the element itself):

<div class="my-list">
  <!-- Text entry for autocompleting the next item -->
  <input data-autocomplete />
  <!-- The list of existing items added so far -->
  <ul data-list>
    <li data-item>
      <span data-label>Example label</span>
      <a href="#" data-remove>x</a>
    </li>
  </ul>
</div>

Your markup can be different as long as nested elements with the data
attributes shown are present.

**The element with the data-item attribute
will be duplicated and given the label and value of each actual selection in the list. The original template element will be removed**, so it does not matter what the example label is.

We suggest hiding the entire element until after you call
`$('.my-element').selective({...})` to populate it with the
real data. Of course, if you are building a dialog before displaying it, you won't need to worry about that.

### Invoking selective

Just write:

    $('.my-list').selective({ source: 'http://mysite.com/autocomplete' });

The `source` URL will receive a GET request with a `term` query string parameter containing what the user has typed so far. This URL should respond with a JSON-encoded array in which each object has `value` and `label` properties. The `label` is what is shown in the menu of possible completions, while the `value` is what is actually returned by `get`, described below.


**source is passed to jquery.ui.autocomplete**, so it is actually possible to use any source property that is acceptable to that function, including an array of possible choices.

### Passing In Existing Selections

Often the user has already made several choices previously and you need to redisplay these existing selections. **Pass in any existing choices as the `data` property of options,** which must be an array in which each element has `label` and `value` properties, as described above. Here is an example:

    $('.my-list').selective({
      source: 'http://mysite.com/autocomplete',
      data: [ { label: 'One', value: 1 }, { label: 'Two', value: 2 } ]
    });

### Retrieving the Result

Call $('.my-element').selective('get') to retrieve an array of the current values. This will be a flat array containing the `value` properties of each selection, for example:

    [ 1, 2]

Most often the `value` properties are database identifiers. `jquery-selective` is great for managing one-to-many and many-to-many relationships.

## About P'unk Avenue and Apostrophe

`jquery-selective` was created at [P'unk Avenue](http://punkave.com) for use in Apostrophe, an open-source content management system built on node.js. If you like `jquery-selective` you should definitely [check out apostrophenow.org](http://apostrophenow.org). Also be sure to visit us on [github](http://github.com/punkave).

## Support

Feel free to open issues on [github](http://github.com/punkave/jquery-selective).

<a href="http://punkave.com/"><img src="https://raw.github.com/punkave/jquery-selective/master/logos/logo-box-builtby.png" /></a>


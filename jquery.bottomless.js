// bottomless: a jQuery plugin that makes it easy to set or get the
// current value of a group of bottomless buttons.
//
// Copyright 2013 P'unk Avenue LLC
//
// Please see:
//
// https://github.com/punkave/jquery-bottomless
//
// For complete documentation.

(function( $ ){
  $.fn.bottomless = function(value) {
    var $els = this;
    if (value === undefined) {
      return $els.filter(':checked').val();
    } else {
      $.each($els, function() {
        $(this).attr('checked', $(this).attr('value') === value);
      });
    }
  };
})( jQuery );

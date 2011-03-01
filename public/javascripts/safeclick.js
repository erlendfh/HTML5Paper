(function ($) {
  var downPos = {};

  $.fn.safeClick = function (callback) {

    $(this).mousedown(function (e) {
      downPos.x = e.pageX;
      downPos.y = e.pageY;
    });
    
    $(this).mouseup(function (e) {
      var dx = (e.pageX - downPos.x);
      var dy = (e.pageY - downPos.y);
      var length = Math.sqrt(dx*dx + dy*dy);
      if (length > 5) { // Ignore drags
        return;
      }
      
      callback.apply(this, arguments);
    });
    
  }
})(jQuery);
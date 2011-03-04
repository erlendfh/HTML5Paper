(function ($) {
  var downPos = {};
  var curPos = {};
  $.fn.safeClick = function (callback) {
    $(this).bind('touchmove', function (e) {
      var oe = e.originalEvent.targetTouches[0];

      curPos.x = e.pageX;
      curPos.y = e.pageY;      
    });

    $(this).bind('mousedown touchstart', function (e) {
      try {
        var oe = e.originalEvent.targetTouches[0];
        if (oe) e = oe;
      } catch(ex) {}
      if (!e.pageX) alert("x:" + e.pageX);
      downPos.x = e.pageX;
      downPos.y = e.pageY;
      curPos.x = e.pageX;
      curPos.y = e.pageY;
      console.log("mousedown");
    });
    
    $(this).bind('mouseup touchend', function (e) {
      if (e.pageX || e.pageY) {
        curPos.x = e.pageX;
        curPos.y = e.pageY;
      }
      
      var dx = (curPos.x - downPos.x);
      var dy = (curPos.y - downPos.y);

      var length = Math.sqrt(dx*dx + dy*dy);
      curPos = {};
      downPos = {};
      if (length > 5) { // Ignore drags
        return;
      }
      
      callback.apply(this, arguments);
    });
    
  }
  
  function isTouchDevice() {
     var el = document.createElement('div');
     el.setAttribute('ongesturestart', 'return;');
     if(typeof el.ongesturestart == "function"){
        return true;
     }else {
        return false
     }
  }
})(jQuery);
$.fn.stopFlash = function() {
  clearInterval(flashElements[this.attr('id')]);
  flashElements[this.attr('id')] = null;
};

$.fn.isOnScreen = function(){
  var viewport = {};
  viewport.top = $(window).scrollTop();
  viewport.bottom = viewport.top + $(window).height();
  var bounds = {};
  bounds.top = this.offset().top;
  bounds.bottom = bounds.top + this.outerHeight();
  return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
};

$.fn.flash = function(duration) {
  if(flashElements[this.attr('id')] == null) {
    var _this = this;

    var animateMs = duration || 1500;

    flashElements[this.attr('id')] = setInterval( function() { flashElement(_this, duration) }, animateMs);
  }
};

function flashElement(obj, duration) {
  var highlightBg = '-moz-linear-gradient(center top , #0Ac, #07c)' || "#FFFF9C";
  var originalBg = obj.css("backgroundImage");

  obj.stop().css("background-image", highlightBg).css("opacity", 0.9).animate({opacity: 1.0}, duration - 30, function() {
    obj.css("background-image", originalBg);
  });
}
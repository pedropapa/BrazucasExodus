var CountClock = function(ele) {
  this.clockElement = ele;
  this.initialDate = new Date();

  this.start();
}

CountClock.prototype = {
  initialDate: new Date(),
  clockElement: null,
  clockInterval: false,

  stop: function() {
    clearInterval(this.clockInterval);
  },

  start: function() {
    parent = this;
    this.clockInterval = setInterval(function() {parent.dingdong()}, 1000);
  },

  dingdong: function() {
    var difference = (new Date()).getTime() - this.initialDate.getTime();
    var countUp = new Date((new Date).getFullYear(), 0, 0, 0, 0, 0, difference);

    this.clockElement.html(("0" + countUp.getMinutes()).slice(-2) + ':' + ("0" + countUp.getSeconds()).slice(-2));
  }
};
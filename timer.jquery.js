/***
 * Events:
 * - timer.start triggered when timer starts
 * - timer.change triggered when time changes
 * - timer.timeout triggered when timeout
 ***/

(function(factory){
  if(typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module depending on jQuery.
    define(['jquery'], factory);
  }
  else {
    // No AMD. Register plugin with global jQuery object.
    factory(jQuery);
  }
})(function($) {
  $.timer = function(el,opts) {
    var defaults = {
      // default settings
      autoStart : true,
      initTime : 60,
      max : 999999,
      min : 0
    };

    var $this = $(el);
    var settings = {};
    var namespace = 'timer';
    var time = 0;
    var state;

    var __states = {
      ready: 'ready',
      playing: 'playing',
      paused: 'paused',
      stopped: 'stopped'
    };
    var __methods = {};
    var __timer = 0;

    

    $.data(el,'timer',$this);
    
    // private methods
    __methods = {

      init : function(opts) {
        // initialize plugins
        settings = $.extend({},defaults,opts);

        time = parseInt(settings.initTime);
        state = settings.autoStart ? __states.playing:__states.paused;
        __methods.setup();
        $this.trigger(namespace+'.start')
      },

      setup : function() {
        __timer = setInterval(function(){
          if(__methods.checkTimeout()) { return false; }
          if(state == __states.playing) {
            __methods.changeTime(-1); // For closure issues, DO NOT use `time` in this scope
            __methods.render();
          }
        }, 1000);
      },

      checkTimeout : function() {
        if(time<=0) {
          clearInterval(__timer);
          $this.trigger(namespace+'.timeout');
          state = __states.stopped;
          return true;
        }
        return false;
      },

      changeTime : function(t) {
        time += parseInt(t);
        __methods.setTime(time);
      },

      setTime : function(time) {
        time = time>settings.max ? settings.max:(time<settings.min ? settings.min:time);
        $this.trigger(namespace+'change');
        __methods.render();
      },

      render : function() {
        $this.text(time);
      }
    };
    
    // public methods
    $this.methods = {
      addTime : function(t) {
        __methods.changeTime(t);
      },
      pause : function() {
        state = __states.paused;
      },
      play : function() {
        state = __states.playing;
      },
      getState : function() {
        return state;
      },
      getTime : function() {
        return time;
      }
    };

    __methods.init(opts);
  }
  
  $.fn.timer = function(options) {
    if (options === undefined) { options = {}; }
    
    if (typeof options === 'object') {
      return this.each(function(index, el) {
        new $.timer(el, options);
      });
    }
    else if(this.data('timer').methods[options]) {
      return this.data('timer').methods[options].apply(this, Array.prototype.slice.call( arguments, 1 ));
    }
    else {
      $.error( 'Method ' +  options + ' does not exist on jQuery.timer' );
    } 
  }
});
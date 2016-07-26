# jQuery-Timer

jQuert-Timer is a very light (1.24KB) jQuery plugin for building controlable countdown timer.

---------------

# Options

`autoStart` start playing as soon as initialized, `true` by default

`initTime` time got when timer is initialized, `60` by default

`max` maximum time allowed, `Infinity` by default

`min` minimum time allowed, times out when reached. `0` by default

# Events

`timer.start` - triggered when timer starts

`timer.change` - triggered when time changes

`timer.timeout` - triggered when times out (get the minimum time)

# Public Methods

`addTime(t)` - add `t` seconds

`pause()` - pause the timer

`play()` - play the timer

`getState()` - get the state of timer, available states: `playing`, `paused`, `stopped`

`getTime()` - get the time rest

# Usage

### To initialize the timer, using: 

```javascript
$('#timer').timer();
```

or with options: 

```javascript
$('#timer').timer({
  // options
});
```

### To invoke the public methods, using:

```javascript
$('#timer').timer('method'[,arg1 [,arg2...]]);
```

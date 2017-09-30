# [Zen UI](https://github.com/ilyabogdanov/zen-ui/) &#x25B8; AngularJS implementation

This package contains UI components build with [AngularJS](https://angularjs.org/).

Documentation
-------------

Basic information about components is in the package [zen-ui](https://github.com/ilyabogdanov/zen-ui/).


Running tests
-------------

To start unit tests, use:

```
npm test
```

Setup
-------------

In your project install core package and AngularJS implementation package with npm:
```
npm install zen-ui-core zen-ui-angularjs
```
Use stylesheet and images from core package.

Every component use `rem` units, with initial size 13px.
It may be changed:
```CSS
html {
  font-size: 16px;
}
```
No more configuration of stylesheet is required.

Then use JavaScript from the package `zen-ui-angularjs`.
Add module `ZenUI` to your app module and configure it.
```
angular
    .module("app", ["ZenUI"])
    .run(function (ZEN_UI, ZenLogger, ZEN_LOG_LEVEL) {
        ZEN_UI.SYSTEM.LOADING_MASK_LOCATION = "assets/img/loading.gif";
        ZenLogger.setLevel(ZEN_LOG_LEVEL.OFF);
    });
```
In the above example there is everything you will need to configure:
* default path to loading animation, and
* log level.

By default logger will show all messages.
You may make it silent as in the above example.

Then use components in you template:
```HTML
<zen-vertical-layout>
    <zen-vertical-layout-row/>
    <zen-vertical-layout-row zen-height="::'100%'"/>
</zen-vertical-layout>
```
As you can see, all components and attributes have prefix `zen`.
And almost all properties have two way binding.
That is why better to use `::` notation when possible to remove watchers.

Examples
--------

There are examples at [angularjs-examples.zen-ui.org](https://angularjs-examples.zen-ui.org)
with sources in the package
[zen-ui-angularjs-examples](https://github.com/ilyabogdanov/zen-ui-angularjs-examples/)
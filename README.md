The Internet Countdown Widget
-----------------------------
#### Join the battle for net neutrality with our Internet Countdown widget!

[**The FCC is voting on net neutrality rules**][1] on February 26th, 2015. But
cable monopolies are trying to derail the process. The goal of this
project is to allow anyone with a web site to run their own campaign to save net
neutrality. Simply embed a couple of lines of Javascript and you're good to go!

To stay up-to-date on developments, please subscribe to our
[**developer mailing list**][1]. If you have any problems or questions regarding
the widget, please [submit an issue][4] or [email Jeff Lyon][5].


Installation Instructions (Banner)
---------------------------------

#### Basic installation:

The banner will show up wherever you put this snippet of code on your page: [**(See demo)**][3]
```html
<div><script src="//fightforthefuture.github.io/countdown-widget/widget.min.js"></script></div>
```
![Blue version (default)](https://fightforthefuture.github.io/countdown-widget/demos/widget.blue.png)

#### Red version:

```html
<script type="text/javascript">var _cd_options = { theme: 'red' };</script>
<div><script src="//fightforthefuture.github.io/countdown-widget/widget.min.js"></script></div>
```
![Red version](https://fightforthefuture.github.io/countdown-widget/demos/widget.red.png)

#### Optimizing for fast loading:

You can speed up loading of your page by loading the banner asynchronously.
Here's how.

1. Place this code at the bottom of your page, right before the closing /BODY tag:
  ```html
  <script type="text/javascript">
  var _cd_options = {
      theme: 'blue', // or 'red'
      elementId: '_cd_container'
  }
  </script>
  <script src="//fightforthefuture.github.io/countdown-widget/widget.min.js" async>
  ```

2. Then, place this empty DIV anywhere on your page where you want the banner to appear:
  ```html
  <div id="_cd_container"></div>
  ```


Which browsers are supported
----------------------------
Modern browsers, and the two latest versions of Internet Explorer (10 and 11).


[1]: https://www.battleforthenet.com/countdown
[2]: https://fightforthefuture.github.io/countdown-widget/demos/modal.html
[3]: https://fightforthefuture.github.io/countdown-widget/demos/banner.html
[4]: https://github.com/fightforthefuture/countdown-widget/issues
[5]: mailto:jeff@fightforthefuture.org
[6]: https://github.com/fightforthefuture/countdown-widget/blob/master/widget.js
[7]: https://fightforthefuture.github.io/countdown-widget/demos/banner.dark.html

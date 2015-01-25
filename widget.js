/*
 @licstart  The following is the entire license notice for the
    JavaScript code in this page.

 Copyright (C) 2014 Center for Rights in Action
 Copyright (C) 2014 Jeff Lyon

 The JavaScript code in this page is free software: you can
 redistribute it and/or modify it under the terms of the GNU
 General Public License (GNU GPL) as published by the Free Software
 Foundation, either version 3 of the License, or (at your option)
 any later version. The code is distributed WITHOUT ANY WARRANTY;
 without even the implied warranty of MERCHANTABILITY or FITNESS
 FOR A PARTICULAR PURPOSE. See the GNU GPL for more details.

 As additional permission under GNU GPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of 
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 @licend  The above is the entire license notice
    for the JavaScript code in this page.
*/

(function(){ // :)

// Default URL for animation iframe. This gets overlay'ed over your page.
var dfurl = 'https://fightforthefuture.github.io/countdown-widget/iframe';


/**
--------------------------------------------------------------------------------
CONFIGURATION OPTIONS
--------------------------------------------------------------------------------
These are default configuration values for the widget. You can override any of
these by pre-defining an object named _cd_options and setting the appropriate
properties as desired.
--------------------------------------------------------------------------------
*/

// The _cd_options object is created if it isn't already defined by you
if (typeof _cd_options == "undefined")
	_cd_options = {};

// The path to the iframe that gets injected over your page
if (typeof _cd_options.iframe_base_path == "undefined")
	_cd_options.iframe_base_path = dfurl;

// Which design to show, either "modal" or "banner" (see _cd_animations below)
if (typeof _cd_options.animation == "undefined")
	_cd_options.animation = 'banner';

/**
--------------------------------------------------------------------------------
ANIMATION DEFINITIONS
--------------------------------------------------------------------------------
Here's where the functionality and defaults for each of the animations (either
"modal" or "banner" to begin with). Each animation has its own options property,
which is an object containing default behaviors for that animation. These can be
overridden by passing the appropriately-named properties into the _cd_options
object (above). This will get merged over the defaults when init is called.
--------------------------------------------------------------------------------
*/
var _cd_animations = {

	// BANNER ANIMATION
	banner: {

		// Default options: Override these with _cd_options object (see above)
		options: {
			modalAnimation: 'banner',
			width: 320,
			height: 142,
			url: 'https://www.battleforthenet.com/',
			theme: 'blue',
			elementId: null
		},

		// init copies the _cd_options properties over the default options
		init: function(options) {
			for (var k in options) this.options[k] = options[k];
			return this;
		},

		// what to do when the animation starts
		start: function() {

			var css = '#_cd_iframe { \
					width: '+this.options.width+'px; \
					height: '+this.options.height+'px; \
				}';

			_cd_util.injectCSS('_cd_iframe_css', css);

			if (this.options.elementId)
				var el = document.getElementById(this.options.elementId);
			else if (_CD_INJECT_ELEM)
				var el = _CD_INJECT_ELEM;

			if (!el)
				return console.error('No element found for Countdown Widget');

			var iframe = _cd_util.createIframe(el, this.options.modalAnimation);
			_cd_util.bindIframeCommunicator(iframe, this);
		},

		// what to do when the animation stops
		stop: function() {
			_cd_util.destroyIframe();
		}
	}
}

/**
--------------------------------------------------------------------------------
UTILITY FUNCTIONS
--------------------------------------------------------------------------------
*/
var _cd_util = {

	// Inject CSS styles into the page
	injectCSS: function(id, css)
	{
		var style = document.createElement('style');
		style.type = 'text/css';
		style.id = id;
		if (style.styleSheet) style.styleSheet.cssText = css;
		else style.appendChild(document.createTextNode(css));
		document.head.appendChild(style);
	},

	// Create the iframe used to display the animation
	createIframe: function(el, animation) {
		var iframe = document.createElement('iframe');
		iframe.id = '_cd_iframe';
		iframe.src = _cd_options.iframe_base_path + '/' + animation + '.html';
		iframe.frameBorder = 0;
		iframe.allowTransparency = true;
		iframe.style.display = 'none';
		el.appendChild(iframe);
		return iframe;
	},

	// Destroy the iframe used to display the animation
	destroyIframe: function() {
		var iframe = document.getElementById('_cd_iframe');
		iframe.parentNode.removeChild(iframe);
	},

	// Sends / receives event messages to the iframe (IE9+)
	// Necessary because the iframe lives on a different domain and we can't
	// just call Javascript functions to/from it due to XSS protections.
	bindIframeCommunicator: function(iframe, animation) {
		var sendMessage = function(requestType, data)
		{
			data || (data = {});
			data.requestType = requestType;
			data.CD_WIDGET_MSG = true;
			data.HOST_NAME = hostname;
			iframe.contentWindow.postMessage(data, '*');
		}

		var method = window.addEventListener ? "addEventListener":"attachEvent";
		var eventer = window[method];
		var messageEvent = method == "attachEvent" ? "onmessage":"message";

		var hostname = window.location.host.replace('www.', '');

		eventer(messageEvent,function(e) {
			if (!e.data || !e.data.CD_IFRAME_MSG)
				return;

			delete e.data.CD_IFRAME_MSG;

			switch (e.data.requestType) {
				case 'getAnimation':
					iframe.style.display = 'block';
					sendMessage('putAnimation', animation.options);
					break;
				case 'stop':
					animation.stop();
					break;
			}
		}, false);

	}
}

/**
--------------------------------------------------------------------------------
MAIN FUNCTIONALITY (called once the page is ready)
--------------------------------------------------------------------------------
*/
var ready = function() {
	var animation = _cd_animations[_cd_options.animation];
	animation.init(_cd_options).start();
}

// Wait for DOM content to load.
var curState = document.readyState;
if (curState=="complete" || curState=="loaded" || curState=="interactive") {
	ready();
} else if (document.addEventListener) {
	document.addEventListener('DOMContentLoaded', ready, false);
}


})(); // :)


var target = document.documentElement;
while (target.childNodes.length && target.lastChild.nodeType == 1)
    target = target.lastChild;
var _CD_INJECT_ELEM = target.parentNode;

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
var animations = {
    bottomBar: {
        options: {
            debug: false,
            url: 'https://www.battleforthenet.com'
        },
        init: function(options) {
            for (var k in options) this.options[k] = options[k];
            return this;
        },
        start: function() {
            document.querySelector('a.close').addEventListener('click', this.close.bind(this), false);
            document.querySelector('#bottomBar').addEventListener('click', this.doClick.bind(this), false);
        },

        getUrl: function() {
            return sanitize(this.options.url)+'?from=bottomBar';
        },

        doClick: function(e) {
            e.preventDefault();

            if (e.target.className == 'close' || e.target.parentNode.className == 'close')
                return;

            window.open(animations.bottomBar.getUrl());
            trackLeaderboardStat({
                stat: 'click',
                data: animations.bottomBar.getUrl(),
                callback: function() {}
            });
        },

        close: function(e) {
            e.preventDefault();
            sendMessage('stop');
        }
    }
}

if (window.location.href.indexOf('EMBED') != -1)
    animations.bottomBar.start();
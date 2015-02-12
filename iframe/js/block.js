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
    block: { 
        options: {
            debug: false,
            url: 'https://www.battleforthenet.com',
            theme: 'blue'
        },
        init: function(options) {
            for (var k in options) this.options[k] = options[k];
            return this;
        },
        start: function() {
            if (this.options.theme == 'red')
                document.body.className += ' red ';

            document.querySelector('#block').addEventListener('click', this.doClick.bind(this), false);
        },

        getUrl: function() {
            return sanitize(this.options.url)+'?from=ad';
        },

        doClick: function(e) {
            e.preventDefault();
            window.open(animations.block.getUrl());
            trackLeaderboardStat({
                stat: 'click',
                data: animations.block.getUrl(),
                callback: function() {}
            });
        }
    }
}

if (window.location.href.indexOf('RED') != -1)
    animations.block.options.theme = 'red';

if (window.location.href.indexOf('EMBED') != -1)
    animations.block.start(); 
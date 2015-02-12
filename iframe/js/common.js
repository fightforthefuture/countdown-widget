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
window.addEventListener('message', function(e) {
	if (!e.data || !e.data.CD_WIDGET_MSG)
		return;

	delete e.data.CD_WIDGET_MSG;

    if (e.data.HOST_NAME)
    {
        host = e.data.HOST_NAME;
        delete e.data.HOST_NAME;
    }

	switch (e.data.requestType) {
		case 'putAnimation':
            trackLeaderboardStat({
                stat: 'display_widget',
                data: e.data.modalAnimation
            });
			animations[e.data.modalAnimation].init(e.data).start();
			break;
	}
});

var sanitize = function(str)
{
    str = str.replace(/\</g, '&lt;');
    str = str.replace(/javascript\:/gi, 'lolscript -');
    return str;
}

var sendMessage = function(requestType, data)
{
	data || (data = {});
	data.requestType = requestType;
	data.CD_IFRAME_MSG = true;
	parent.postMessage(data, '*');
}

var trackLeaderboardStat = function(options)
{
    options || (options = {});
    options.stat || (options.stat = 'unknown');
    options.data || (options.data = null);
    options.callback || (options.callback = function() {});

    if (!host)
        return;

    var data = {
        campaign: 'internetcountdown',
        stat: options.stat,
        data: options.data,
        host: host,
        session: session
    };

    // Serialize data
    var params = '';
    for (var key in data) {
        if (params.length !== 0) {
            params += '&';
        }

        params += key + '=' + data[key];
    }

    var http = new XMLHttpRequest();
    var url = 'https://fftf-host-counter.herokuapp.com/log';
    http.open('POST', url, true);

    // Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

     // Call a function when the state changes.
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            var res = JSON.parse(http.responseText);
            options.callback(res);
        }
    };

    http.send(params);
}

/**
 * Generates a GUID string.
 * @returns {String} The generated GUID.
 * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
 * @author Slavik Meltser (slavik@meltser.info).
 * @link http://slavik.meltser.info/?p=142
 */
var guid = function() {
    var _p8 = function(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

function onDOMReady() {
    sendMessage('getAnimation');
}

var readyState = document.readyState;
if (readyState === 'interactive' || readyState === "complete") {
    onDOMReady();
} else {
    document.addEventListener('DOMContentLoaded', onDOMReady);
}

var host = null;  // this will get populated with the domain of the widget install
var session = guid();

function Countdown() {
    this.date = new Date(Date.UTC(2015, 1, 26, 15, 30, 0)).getTime();
    this.interval = null;
    this.requestAnimationFrame = this.requestAnimationFrame.bind(this);
    this.targets = {};
    this.tick = this.tick.bind(this);
    this.curTick = false;
    this.start();
}

Countdown.prototype.constants = {
    day: (1000 * 60 * 60 * 24),
    hour: (1000 * 60 * 60),
    minute: (1000 * 60),
    second: (1000)
};

Countdown.prototype.padNumber = function(number) {
    if (number > 9) {
        return number;
    } else {
        return '0' + number;
    }
};

Countdown.prototype.requestAnimationFrame = function() {
    var request = window.requestAnimationFrame || setTimeout;
    request(this.tick);
};

Countdown.prototype.start = function() {
    this.stop();
    this.requestAnimationFrame();
    this.interval = setInterval(this.requestAnimationFrame, 1000);
};

Countdown.prototype.stop = function() {
    clearInterval(this.interval);
};

Countdown.prototype.tick = function() {
    var now = Date.now();
    var difference = this.date - now;

    this.updateDates(difference);

    if (difference < 0) {
        this.stop();
        document.getElementById('remaining').textContent = '00.00:00:00';
    }
};

Countdown.prototype.updateDates = function(difference) {

    this.curTick = !this.curTick;
    var c = this.curTick;

    var days = Math.floor(difference / this.constants.day);
    difference -= days * this.constants.day;

    var hours = Math.floor(difference / this.constants.hour);
    difference -= hours * this.constants.hour;

    var minutes = Math.floor(difference / this.constants.minute);
    difference -= minutes * this.constants.minute;

    var seconds = Math.floor(difference / this.constants.second);
    difference -= seconds * this.constants.second;

    /*
    var str =   this.padNumber(days)
                +(c ? '.' : '.')+this.padNumber(hours)
                +(c ? ':' : ' ')+this.padNumber(minutes)
                +(c ? ':' : ' ')+this.padNumber(seconds);
    */
    var str =   this.padNumber(days)
                +'.'+this.padNumber(hours)
                +':'+this.padNumber(minutes)
                +':'+this.padNumber(seconds);

    document.getElementById('remaining').textContent = str;
};


new Countdown();

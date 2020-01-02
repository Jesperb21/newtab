$(document).ready(function() {
    var moduleRoot = document.getElementById('clock-module');
    moduleRoot.innerHTML =`<h1 id="clock"></h1><p id="date-text"></p>`;

    var Clock = {
        el: document.getElementById('clock'),

        init: function() {
            Clock.setTime();
            setInterval(Clock.setTime, 1000);
        },
        zeros: function(num) {
            return ('0' + num.toString()).slice(-2);
        },
        setTime: function() {
            var date = new Date();
            var hours = Clock.zeros(date.getHours());
            var minutes = Clock.zeros(date.getMinutes());
            var time = hours + ':' + minutes;

            Clock.el.innerHTML = time;
        }
    };

    var DateText = {
        el: document.getElementById('date-text'),

        init: function() {
            DateText.setDateText();
            setInterval(DateText.setDateText, 10000);
        },
        setDateText: function() {
            var date = new Date();
            var options = { weekday: 'long', day: 'numeric', month: 'long' };
            var stringified = date.toLocaleDateString('en-GB', options);
            DateText.el.innerText = stringified;
        }
    };

    Clock.init();
    DateText.init();
});
! function(n) { n.preloadImages = function(n, o) { window.IMAGES_CACHE = {}; var e, t, i = n.length; if (0 === n.length) return void(o && "function" == typeof o && o()); for (; e = n.pop();) t = new Image, t.onload = function(n) { console.log("Loading image: ", n), window.IMAGES_CACHE[n] = this, i--, 0 === i && (console.log("All images are ready..."), o && "function" == typeof o && o()) }.bind(t, e), t.src = e }, n.loadScripts = function(n, o) { var e, t, i = n.length; if (0 === n.length) return void(o && "function" == typeof o && o()); for (; e = n.pop();) t = document.createElement("script"), t.defer = !0, t.onload = function() { i--, 0 === i && (console.log("All scripts are ready..."), o && "function" == typeof o && o()) }, t.src = e, document.getElementsByTagName("head")[0].appendChild(t) } }(window);

(function(win) {

    var $ = function(slt) { return document.querySelector(slt); }
    var timers = 0;
    var Tween;
    var loop = 1;
    var aniStatus = false;

    var $banner = {

        init: function() {
            this.config();
            this.startAds();

        },

        config: function() {
            console.log('banner config loaded !');
        },

        startAds: function() {
            var that = this;

            loadScripts([
                'https://s0.2mdn.net/ads/studio/cached_libs/timelinelite_1.19.0_13e3bd0e510d63fd5e5ef9bf9dac7017_min.js',
                'https://s0.2mdn.net/ads/studio/cached_libs/tweenlite_1.19.0_422f021fad4c20f20cf3640a06ac39e9_min.js',
                'https://s0.2mdn.net/ads/studio/cached_libs/cssplugin_1.19.0_cfbff7d208ccfdbe176b9855af1eb1fa_min.js',
                'https://s0.2mdn.net/ads/studio/cached_libs/easepack_1.19.0_be87087c08fcec83e2b64c70571fe91f_min.js'
            ], function() {
                that.loadAssets();
            });
        },

        loadAssets: function() {
            preloadImages([], this.mainDOM());
        },

        mainDOM: function() {
            var ad = $('#ad'),
                banner = $('#banner'),
                clickTag = $('#clickTag');

            addListeners();
            showAds(true, mainFunc);
            // include components
            $banner.snow();

            function showAds(e, callback) {
                switch (e) {
                    case true:
                        console.info(e);
                        banner.style.opacity = 1;
                        banner.style.visibility = 'visible';
                        break;
                    case false:
                        console.info(e);
                        break;
                }

                if (callback && typeof(callback) === "function") {
                    callback();
                }
            }

            function addListeners() {
                clickTag.addEventListener("click", function() { console.log('Banner Clicked !'); }, false);
            }

            function mainFunc() {
                console.info('Animation Starting ...!');

                // Create Timeline
                Tween = new TimelineLite({
                    onStart: _onStart,
                    onUpdate: _onUpdate,
                    onComplete: _onComplete
                });

                Tween.add(TweenLite.to([banner], 2, { autoAlpha: 0.5, backgroundColor: 'blue' }), timers);

            }

            function _onStart() { console.info('Tween Starting ...!'); }

            function _onUpdate() { console.info('Tween Updating ...!'); }

            function _onComplete() { console.info('Tween Completed ...!'); }

        },

        countdown: function() {
            var s = document.createElement('script');
            s.defer = !0;
            s.setAttribute('src', 'countdown.min.js');
            document.getElementsByTagName("head")[0].appendChild(s);

            function countdownCreate() {
                var eventDate = new Countdown({
                    selector: "#eventDate",
                    msgBefore: "",
                    msgAfter: "",
                    leadingZeros: "0",
                    initialize: true,
                    msgPattern: "<span>Fin dans</span> <br />\
                                        {days}:{hours}:{minutes}:{seconds}",
                    dateStart: new Date(),
                    dateEnd: new Date('2018/10/6 20:00')
                });
            }

            s.addEventListener("load", countdownCreate);

        },

        snow: function() {

            banner.innerHTML = '<canvas id="snow" class="snow"></canvas>';

            var w = window.innerWidth,
                h = window.innerHeight,
                canvas = document.getElementById('snow'),
                ctx = canvas.getContext('2d'),
                rate = 50,
                arc = 700,
                time,
                count,
                size = 1.1,
                speed = 5,
                lights = new Array,
                colors = ['#eee'];

            canvas.setAttribute('width', w);
            canvas.setAttribute('height', h);

            function init() {
                time = 0;
                count = 0;

                for (var i = 0; i < arc; i++) {
                    lights[i] = {
                        x: Math.ceil(Math.random() * w),
                        y: Math.ceil(Math.random() * h),
                        toX: Math.random() * 5 + 1,
                        toY: Math.random() * 5 + 1,
                        c: colors[Math.floor(Math.random() * colors.length)],
                        size: Math.random() * size
                    }
                }
            }

            function bubble() {
                ctx.clearRect(0, 0, w, h);

                for (var i = 0; i < arc; i++) {
                    var li = lights[i];

                    ctx.beginPath();
                    ctx.arc(li.x, li.y, li.size, 0, Math.PI * 2, false);
                    ctx.fillStyle = li.c;
                    ctx.fill();

                    li.x = li.x + li.toX * (time * 0.05);
                    li.y = li.y + li.toY * (time * 0.05);

                    if (li.x > w) { li.x = 0; }
                    if (li.y > h) { li.y = 0; }
                    if (li.x < 0) { li.x = w; }
                    if (li.y < 0) { li.y = h; }
                }
                if (time < speed) {
                    time++;
                }
                timerID = setTimeout(bubble, 1000 / rate);
            }
            init();
            bubble();
        }

    };

    window.addEventListener("DOMContentLoaded", $banner.init());

})(window);
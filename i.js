(function() {
    var a = [], m = parseFloat(seajs.version);
    define(["base", "lib", "game/common/widget/orientwarn/index"], function(l, f, c) {
        for (var e = (c.uri || c.id).split("?")[0].match(/^(.+\/)([^\/]*?)(?:\.js)?$/i), g = e && e[1], e = e && "./" + e[2], d = 0, h = a.length, k, b, e = e.replace(/\.r[0-9]{15}/, ""); d < h; d++)
            b = a[d], "string" === typeof b[0] && (e === b[0] && (k = b[2]), b[0] = g + b[0].replace("./", ""), 1 < m && define.apply(this, b));
        a = [];
        l.get = l;
        return "function" === typeof k ? k.apply(this, arguments) : l
    });
    define.pack = function() {
        a.push(arguments);
        1 <
        m || define.apply(null, arguments)
    }
})();
define.pack("./ad", ["base", "lib", "./tmpl", "./cgi"], function(a, m, l) {
    var f = a("base"), c = a("lib");
    a("./tmpl");
    a("./cgi");
    var e = {
        ios: {
            img: "http://imgcache.qq.com/qzone/qzact/act/game/water/images/ad/ios.jpg",
            url: "https://itunes.apple.com/cn/app/id685860437"
        },
        android: {
            img: "http://imgcache.qq.com/qzone/qzact/act/game/water/images/ad/android.jpg",
            url: "http://dlied5.qq.com/haina/apk/zgzr/10000144_sgzr-1.0.3-20140808.apk"
        },
        qzone: {
            img: "http://imgcache.qq.com/qzone/qzact/act/game/water/images/ad/qzone.jpg",
            url: "http://m.qzone.com/l?g=217&g_f=2000000217"
        }
    },
    g = f("#ad_container"), d;
    a = navigator.userAgent;
    var h = a.match(/(iPhone\sOS)\s([\d_]+)/), k = a.match(/(Android)\s+([\d.]+)/);
    l.exports = {
        init: function(b) {
            d = b;
            "qq" === d.isInClient && g.css({
                width: "100%",
                left: 0,
                marginLeft: 0
            })
        },
        show: function() {
            var b, n, a, p;
            "qq" === d.isInClient ? (b = f("<a>"), n = f("<img>"), mqq.data.getUserInfo(function(f) {
                f.uin%2 ? (a = e.qzone, h ? p = "qzoneIos" : k && (p = "qzoneAnd")) : h ? (a = e.ios, p = "asxy") : k ? (a = e.android, p = "sgzr") : a = e.qzone;
                n.css({
                    width: "100%"
                }).attr({
                    src: a.img
                });
                b.attr({
                    href: a.url
                }).append(n);
                if (p)
                    b.on("touchend", function() {
                        c.stat.reportHotClick("qzgame.iceBucket." + p, "wanba.qzone.com")
                    });
                g.html(b).show()
            })): (g.show(),
            window.TencentGDT = window.TencentGDT || [],
            TencentGDT.push({
                posid: "8575129707409691855",
                type: "banner",
                containerid: "ad_container",
                appid: 1101389801,
                filltype: "full"
            }), function() {
                var b = document, n = b.getElementsByTagName("head")[0], b = b.createElement("script");
                b.async=!0;
                b.src = "http://qzs.qq.com/qzone/biz/res/i.js";
                n && n.insertBefore(b, n.firstChild)
            }())
        }, hide : function() {
            g.hide()
        }
    }
});
define.pack("./audio", ["base"], function(a, m, l) {
    var f = a("base"), c = {}, e, g = ["audio/ice.mp3", "audio/pour.mp3"];
    if (window.AudioContext || window.webkitAudioContext || window.mozAudioContext) {
        var d = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext);
        a = {
            play: function(a) {
                function f(b) {
                    n.buffer = b;
                    n.connect(d.destination);
                    n.noteOn(0)
                }
                var b = c[a], n = d.createBufferSource();
                b ? f(b) : this.load(a).done(function(b) {
                    c[a] = b;
                    f(b)
                })
            },
            load: function(a) {
                var e = f.Deferred(), b = new XMLHttpRequest;
                b.open("GET",
                a, !0);
                b.responseType = "arraybuffer";
                b.onload = function() {
                    d.decodeAudioData(b.response, function(b) {
                        c[a] = b;
                        e.resolve(b)
                    }, function() {
                        e.reject()
                    })
                };
                b.send();
                return e.promise()
            }
        }
    } else 
        a = {
            play: function(a) {
                function f() {
                    b.currentTime = 0;
                    b.play();
                    d.removeEventListener("play", f, !1)
                }
                var b = c[a];
                e && e.pause();
                if (b) {
                    b.pause();
                    try {
                        b.currentTime = 0.01, b.play()
                    } catch (n) {
                        b.addEventListener("play", f, !1), b.play()
                    }
                } else {
                    var d = document.createElement("audio");
                    c[a] = d;
                    d.src = a;
                    d.play()
                }
                e = b
            },
            load: function(a) {
                var d = f.Deferred(),
                b = document.createElement("audio");
                b.preload = "auto";
                b.addEventListener("progress", function(b) {
                    d.resolve()
                }, !1);
                c[a] = b;
                b.src = a;
                return d.promise()
            }
        };
    a.loadAll = function() {
        for (var a = f.Deferred(), c = [], b = 0; b < g.length; b++)
            c.push(this.load(g[b]));
        f.when.apply(f, c).always(function() {
            a.resolve()
        });
        return a.promise()
    };
    return a
});
define.pack("./cgi", [], function(a, m, l) {
    return {
        uploadScore: "http://w.qzone.qq.com/cgi-bin/user/gamebar_update_score.cgi",
        getRank: "http://r.qzone.qq.com/cgi-bin/user/game_getrank",
        appid: 1102137317,
        appkey: "cEXtPOrqptvcvoOv"
    }
});
define.pack("./index", "base lib ./tmpl ./cgi game/common/widget/orientwarn/index ./audio ./over ./ad ./start ./playing".split(" "), function(a, m, l) {
    var f = a("base"), c = a("lib");
    a("./tmpl");
    a("./cgi");
    l.exports = {
        init: function(e) {
            var g = f("#j-game-area");
            a("game/common/widget/orientwarn/index")();
            e.isInClient && g.removeClass("touch-game");
            var d = navigator.userAgent.match(/Android\s([0-9\.]*)/);
            d && (d = d[1].split("."), 3 > 1 * d[0] && 4 > 1 * d[1] && g.removeClass("animate"));
            this.events(g, e);
            a("./audio").loadAll().done(function() {});
            g.trigger("stage:start");
            c.stat.reportPV("wanba.qzone.com", location.pathname + "/iceBucket");
            switch (e.isInClient) {
            case "qq":
                c.stat.reportPV("wanba.qzone.com", location.pathname + "/iceBucket/qq");
                break;
            case "qzone":
                c.stat.reportPV("wanba.qzone.com", location.pathname + "/iceBucket/qzone")
            }
            a("./over").shareToWeixin(g);
            a("./ad").init(e)
        },
        events: function(c, g) {
            c.on("stage:start", function(f) {
                a("./start").init(c)
            });
            c.on("stage:playing", function(f) {
                a("./playing").init(c)
            });
            c.on("stage:over", function(d, h) {
                a("./over").init(c,
                f.extend(h, g))
            })
        }
    }
});
define.pack("./over", ["base", "lib", "./tmpl", "./cgi", "./ad"], function(a, m, l) {
    var f = a("base"), c = a("lib"), e = a("./tmpl"), g = a("./cgi"), d = {
        img_url: "http://imgcache.qq.com/qzone/qzact/act/game/water/images/share.png",
        img_width: 90,
        img_height: 90,
        link: "http://qzs.qq.com/qzone/qzact/act/game/water/index.html",
        desc: "\u5168\u6c11\u51b0\u6876\u6311\u6218\u8d5b \u5173\u6ce8\u7f55\u89c1\u75c5\u6e10\u51bb\u4eba\u75c7\uff08ALS\uff09",
        title: "\u5168\u6c11\u51b0\u6876\u6311\u6218\u8d5b \u5173\u6ce8\u7f55\u89c1\u75c5\u6e10\u51bb\u4eba\u75c7\uff08ALS\uff09"
    }, h =
    f.extend({}, d), k = a("./ad");
    l.exports = {
        init: function(b, a) {
            var c = f("<div class='j-over-box'>");
            this.dataInit(a);
            a.word = this.getShareWord(a.ice);
            a.per = this.calPercent(a.ice);
            c.html(e.gameOver(a));
            b.html(c);
            this.events(c, a);
            h.title = h.desc = "\u51b0\u6876\u6311\u6218\u8d5b\u4e2d\u6211\u52a0\u4e86" + a.ice + "\u5757\u51b0\uff0c" + a.word;
            "qzone" === a.isInClient && this.updateScore(a.ice);
            k.show()
        },
        dataInit: function(b) {
            h = f.extend({}, d)
        },
        events: function(b, a) {
            b.on("touchend", ".j-again", function(a) {
                a.preventDefault();
                c.stat.reportHotClick("qzgame.iceBucket.again", "wanba.qzone.com");
                b.trigger("stage:playing");
                k.hide()
            });
            b.on("touchend", ".j-back", function(a) {
                a.preventDefault();
                b.trigger("stage:start");
                k.hide()
            });
            b.on("touchend", ".j-share", function(d) {
                function g() {
                    var a = f('<div id="j-share-area">');
                    a.html(e.share());
                    b.children().eq(0).append(a);
                    b.on("touchend", function(b) {
                        b.preventDefault();
                        a.remove()
                    })
                }
                d.preventDefault();
                c.stat.reportHotClick("qzgame.iceBucket.share", "wanba.qzone.com");
                switch (a.isInClient) {
                case "qzone":
                    QZAppExternal &&
                    QZAppExternal.qzoneGameBar({
                        type: "share"
                    });
                    break;
                case "qq":
                    g();
                    break;
                default:
                    g()
                }
            });
            b.on("touchend", ".j-txnews", function(b) {
                c.stat.reportHotClick("qzgame.iceBucket.new", "wanba.qzone.com")
            })
        },
        shareToWeixin: function(b) {
            function a() {
                b.removeClass("touch-game").addClass("game-wechat");
                d()
            }
            function d() {
                WeixinJSBridge.on("menu:share:timeline", function(b) {
                    c.stat.reportHotClick("qzact.water.shareToTimeline");
                    WeixinJSBridge.invoke("shareTimeline", h, function(b) {})
                });
                WeixinJSBridge.on("menu:share:appmessage",
                function(b) {
                    c.stat.reportHotClick("qzact.water.shareToFriend");
                    WeixinJSBridge.invoke("sendAppMessage", h, function(b) {})
                })
            }
            "object" == typeof mqq && (h.share_url = h.url, h.image_url = h.img_url, mqq.data.setShareInfo(f.extend(h, {
                title : "\u6211\u5728\u51b0\u6876\u6311\u6218\u8d5b\u4e2d\u6210\u529f\u6311\u6218\u5965\u5df4\u9a6c", desc : "\u5168\u7403\u6f6e\u6d41\u6e38\u620f\uff0c\u7b49\u4f60\u6311\u6218"
            })));
            "object" == typeof WeixinJSBridge && "function" == typeof WeixinJSBridge.invoke ? a() : document.addEventListener ? document.addEventListener("WeixinJSBridgeReady",
            a, !1) : document.attachEvent && (document.attachEvent("WeixinJSBridgeReady", a), document.attachEvent("onWeixinJSBridgeReady", a))
        },
        getShareWord: function(b) {
            var a = "\u6797\u5fd7\u73b2\u90fd\u6bd4\u6211\u6709\u52c7\u6c14 \u6bd4\u5c14\u76d6\u8328\u8868\u793a\u201c\u5475\u5475\u201d \u8a79\u59c6\u65af\u5728\u5632\u7b11\u6211 C\u7f57\u7528\u659c\u773c\u770b\u6211 \u5185\u9a6c\u5c14\u8bf4\u201c\u771f\u6ca1\u8bda\u610f\u201d \u9c8d\u5c14\u9ed8\u5728\u54c8\u54c8\u5927\u7b11 \u62c9\u91cc-\u4f69\u5947\u6447\u6447\u5934 \u5e93\u91cc\u53f9\u6c14\u9053\u201c\u771f\u6002\uff01\u201d".split(" "),
            c = "\u6bd4\u5c14\u76d6\u8328\u8868\u793a\u4f69\u670d\u6211 \u8d3e\u65af\u6c40\u6bd4\u4f2f\u8bf4\u201c\u70b9\u4e2a\u8d5e\u201d \u5218\u5fb7\u534e\u8bf4\u201c\u6211\u771f\u5e05\u201d \u8a79\u59c6\u65af\u5411\u6211\u4f38\u51fa\u5927\u62c7\u6307 \u8482\u59c6-\u5e93\u514b\u8bf4\u201c\u5c0f\u4f19\u5b50\u4e0d\u9519\u201d C\u7f57\u90fd\u8981\u62e5\u62b1\u6211 \u5185\u9a6c\u5c14\u70b9\u70b9\u5934\u201c\u6709\u7231\u5fc3\u201d \u79d1\u6bd4\u62cd\u62cd\u6211\u7684\u80a9\u8180 \u827e\u4f26\u8981\u9001\u6211\u4e00\u8f86\u201c\u7279\u65af\u62c9\u201d".split(" ");
            return 100 > b ? a[parseInt(Math.random() * a.length)] : c[parseInt(Math.random() * c.length)]
        },
        calRank: function(b) {
            b = (parseInt(9E6 * (1 - b / 100)) + "").split("");
            for (var a = 0; a < b.length; a++)
                "0" === b[a] && (b[a] = parseInt(Math.random() * a));
            return b.join("")-0
        },
        calPercent: function(a) {
            a/=2;
            return 0 === a ? 0 : 15 > a ? 10 + 3 * (a-1) : 21 > a ? 70 + 2 * (a-15) : 39 > a ? 81 + (a-21) : 99
        },
        updateScore: function(a) {
            function d() {
                e++;
                2 < e || f.ajax({
                    url: g.uploadScore,
                    type: "get",
                    dataType: "jsonp",
                    jsonpCallback: "Callback_" + parseInt(1E4 * Math.random()),
                    data: {
                        sid: decodeURIComponent(c.storage.cookie.get("keystr")),
                        level: a,
                        appid: g.appid,
                        appkey: g.appkey,
                        openid: localStorage.openid,
                        openkey: localStorage.openkey,
                        key1: 0,
                        key2: 0
                    }
                }).done(function(a) {}).fail(function() {
                    d()
                })
            }
            var e = 0;
            0 !== a && d()
        }
    }
});
define.pack("./playing", ["base", "lib", "./tmpl", "./cgi", "./audio"], function(a, m, l) {
    var f = a("base"), c = a("lib").animation, e = a("./tmpl");
    a("./cgi");
    var g, d, h, k, b =- 1;
    l.exports = {
        init: function(a) {
            k = f('<div id="j-playing-box">');
            this.dataInit();
            k.html(e.gamePlaying({
                temp: g,
                timeLeft: d,
                ice: h
            }));
            a.html(k);
            this.events(k)
        },
        dataInit: function() {
            g = 10;
            d = 1E4;
            h = 0
        },
        events: function(a) {
            this.logicalEvent(a);
            this.inputEvents(a)
        },
        logicalEvent: function(b) {
            var c = this, p = b.find(".j-time"), l = b.find(".j-ice"), m = b.find(".j-temp"),
            q = b.find(".j-bucket");
            b.on("time:left", function(a, f) {
                d -= f;
                0 >= d && (c.stopCountDown(), b.trigger("time:over"));
                var g = d, e = {};
                e.min = parseInt(g / 60 / 1E3);
                e.sec = parseInt(g / 1E3)-60 * e.min;
                e.msec = parseInt(g%1E3 / 10);
                for (var h in e)
                    10 > e[h] && (e[h] = "0" + e[h]);
                p.text(e.sec + "." + e.msec)
            });
            b.on("time:over", function(c) {
                k.html(e.gamePlaying2({
                    temp: g,
                    ice: h
                }));
                k.on("touchend", ".j-pour", function(c) {
                    c.preventDefault();
                    a("./audio").play("audio/pour.mp3");
                    k.find(".j-play-box").addClass("on");
                    setTimeout(function() {
                        b.trigger("stage:over",
                        [{
                            time: 10,
                            ice: h,
                            temp: g
                        }
                        ])
                    }, 3E3)
                })
            });
            b.on("ice:add", function(a, c) {
                var d = f('<b class="ice"></b>');
                d.addClass("i" + (Math.round(8 * Math.random()) + 1));
                setTimeout(function() {
                    d.remove()
                }, 800);
                q.append(d);
                h += c;
                l.text(h);
                b.trigger("temp:minus", [c / 10])
            });
            b.on("temp:minus", function(a, b) {
                function c(a) {
                    var b = {};
                    b["int"] = parseInt(a);
                    b.decimal = Math.round(10 * (a - b["int"]));
                    10 > b["int"] && (b["int"] = "0" + b["int"]);
                    return b["int"] + "." + b.decimal
                }
                var d = g - b;
                0 > d || (g = Math.round(10 * d) / 10, m.text(c(g)))
            })
        },
        inputEvents: function(b) {
            var c =
            this;
            b.one("touchend", ".j-add", function(a) {
                a.preventDefault();
                c.startCountDown()
            });
            b.on("touchend", ".j-add", function(c) {
                c.preventDefault();
                a("./audio").play("audio/ice.mp3");
                b.trigger("ice:add", 1)
            })
        },
        coutDown: function(a) {
            var d = this;
            d.requestId = c.request(function(c) {
                d.startTime = a ? c : d.startTime;
                var f = c - d.startTime;
                d.pauseGame || (0 > b ? 100 < c - new Date ? (b = 1, f/=1E3) : b = 0 : b && (f/=1E3), 100 < f && (d.startTime = c, k.trigger("time:left", [f])), d.coutDown())
            })
        },
        startCountDown: function() {
            this.pauseGame = 0;
            this.coutDown(!0)
        },
        stopCountDown: function() {
            this.pauseGame = 1;
            c.cancel(this.requestId)
        }
    }
});
define.pack("./start", ["base", "lib", "./tmpl", "./cgi"], function(a, m, l) {
    var f = a("base"), c = a("lib"), e = a("./tmpl");
    a("./cgi");
    l.exports = {
        init: function(a) {
            var c = f("<div class='j-start-box'>");
            c.html(e.gameStart());
            a.html(c);
            this.events(c)
        },
        events: function(a) {
            a.on("touchend", ".j-start", function(d) {
                d.preventDefault();
                a.trigger("stage:playing");
                c.stat.reportHotClick("qzgame.iceBucket.play", "wanba.qzone.com")
            });
            a.on("touchend", ".j-donate", function(a) {
                c.stat.reportHotClick("qzgame.iceBucket.charity", "wanba.qzone.com")
            })
        }
    }
});
define.pack("./tmpl", [], function(a, m, l) {
    return {
        gameStart: function(a) {
            var c = [];
            with (a || {})
                c.push('\t<section class="screen home">\r\n        <h1 class="title">\u51b0\u6876\u6311\u6218\u8d5b</h1>\r\n        <p class="summary">\u5173\u6ce8\u7f55\u89c1\u75c5 \u6e10\u51bb\u4eba\u75c7(ALS)</p>\r\n        <div class="action">\r\n            <b class="j-start btn">\u63a5\u53d7\u6311\u6218</b>\r\n            <a href="http://gongyi.qq.com/m/html5/detail.htm#p%3Ddetail%26id%3D1242" class="j-donate btn blue">\u6211\u8981\u6350\u6b3e</a>\r\n        </div>\r\n        <div class="bucket"></div>\r\n        <div class="waters"><b class="flow"></b></div>\r\n    </section>');
            return c.join("")
        },
        gamePlaying: function(a) {
            var c = [];
            with (a || {})
                c.push('\t<section class="j-play-box screen game step1">\r\n        <div class="status">\r\n            <span class="item">\u5012\u8ba1\u65f6\uff1a<b class="j-time value">'), a = parseInt(timeLeft / 10) / 100, c.push(a), c.push('</b><b class="units">S</b></span>\r\n            <span class="item">\u6c34\u6e29\uff1a<b class="j-temp value">'), c.push(temp), c.push('</b><b class="units">\u00b0C</b></span>\r\n        </div>        \r\n        <div class="action">\r\n            <b class="j-add btn">\u52a0\u51b0\u5757</b>\r\n        </div>\r\n        <div class="j-bucket bucket">\r\n        \t<div class="status-txt">\u4f60\u5df2\u52a0\u4e86<span class="j-ice value">'),
            c.push(ice), c.push("</span>\u5757\u51b0\u5757</div>\r\n        </div>\r\n    </section>");
            return c.join("")
        },
        gamePlaying2: function(a) {
            var c = [];
            with (a || {})
                c.push('\t<section class="j-play-box screen game step2">\r\n        <div class="status">\r\n            <span class="item">\u6c34\u6e29\uff1a<b class="value">'), c.push(temp), c.push('</b><b class="units">\u00b0C</b></span>\r\n        </div>\r\n        <div class="play-wrap">\r\n            <div class="switch"><b class="j-pour btn">\u5012\u6c34</b></div>\r\n            <div class="player"></div>\r\n            <div class="cool"></div>\r\n        </div>\r\n        <div class="bucket"></div>\r\n        <div class="waters"><b class="flow"></b></div>\r\n    </section>');
            return c.join("")
        },
        gameOver: function(a) {
            var c = [];
            with (a || {})
                c.push('\t<section class="screen">\r\n        <div class="pop result">\r\n            <div class="inner">\r\n            \t<div class="content">'), c.push(time), c.push("s\u5185\u5c45\u7136\u52a0\u4e86"), c.push(ice), c.push("\u5757\u51b0<br />\r\n\t\t\t\t\t\u6218\u80dc\u4e86\u5168\u7403"), c.push(per), c.push('%\u7684\u6311\u6218\u8005\r\n\t                <span class="honor"><strong class="value">'), a = word.replace("\u6211", "\u4f60"), c.push(a),
            c.push('</strong></span>\r\n                </div>\r\n                <div class="action">\r\n                    <b class="j-again btn">\u518d\u6765\u4e00\u6876</b>\r\n                    <b class="j-share btn blue">\u70b9\u540d\u597d\u53cb</b>\r\n                    <p class="link"><a class="j-txnews" href="http://view.inews.qq.com/a/ENT2014081908418908">\u770b\u540d\u4eba\u600e\u4e48\u73a9</a></p>\r\n                </div>\r\n                <b class="j-back close"></b>\r\n            </div>\r\n        </div>\r\n    </section>');
            return c.join("")
        },
        share: function(a) {
            var c = [];
            with (a || {})
                c.push('\t<div class="share" style="display: block;">\u70b9\u51fb\u53f3\u4e0a\u89d2[\u70b9\u540d\u4e09\u4e2a\u597d\u53cb]\u7528\u4e8e\u6311\u6218\u51b0\u6876\u6216\u6350\u6b3e\u6148\u5584</div>');
            return c.join("")
        }
    }
});
/*  |xGv00|b65603c714d0e1ecd40cbcdd1c31c75b */

(function() {
    var g = [], k = parseFloat(seajs.version);
    define(["base"], function(l, c, b) {
        for (var a = (b.uri || b.id).split("?")[0].match(/^(.+\/)([^\/]*?)(?:\.js)?$/i), d = a && a[1], a = a && "./" + a[2], m = 0, e = g.length, h, f, a = a.replace(/\.r[0-9]{15}/, ""); m < e; m++)
            f = g[m], "string" === typeof f[0] && (a === f[0] && (h = f[2]), f[0] = d + f[0].replace("./", ""), 1 < k && define.apply(this, f));
        g = [];
        l.get = l;
        return "function" === typeof h ? h.apply(this, arguments) : l
    });
    define.pack = function() {
        g.push(arguments);
        1 < k || define.apply(null, arguments)
    }
})();
define.pack("./animation", [], function(g, k, l) {
    return {
        request: function(c) {
            return (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(b) {
                return window.setTimeout(function() {
                    b((new Date).getTime())
                }, 1E3 / 60)
            })(c)
        },
        cancel: function(c) {
            (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function(b) {
                clearTimeout(b)
            })(c)
        },
        now: function() {
            return window.performance && window.performance.now ? window.performance.now() :
            (new Date).getTime()
        }
    }
});
define.pack("./index", "base ./stat ./util ./storage ./user ./animation".split(" "), function(g, k, l) {
    var c = g("base"), b = {
        stat: g("./stat"),
        util: g("./util"),
        storage: g("./storage"),
        user: g("./user"),
        animation: g("./animation")
    };
    c("body").delegate("[data-hottag],[hottag]", "click", function(a) {
        a = c(a.currentTarget);
        (a = c.trim(a.attr("data-hottag")) || c.trim(a.attr("hottag"))) && b.stat.reportHotClick(a)
    });
    g = location.pathname;
    k = b.util.getUrlParams();
    b.stat.reportPV("mall.qzone.qq.com", g, {
        referURL: k && (k.adtag || k.ADTAG) ||
        void 0
    });
    return b
});
define.pack("./stat", ["base"], function(g, k, l) {
    var c = g("base"), b = 1, a = {
        _send: function(d, a, e, h) {
            a = a || 100;
            e = e || 0;
            h && "function" == typeof h.callback && (e = e || 500);
            if (!(100 > a && 100 * Math.random() > a)) {
                var f = new Image;
                f.g_stat_reportId = b;
                window.g_stat_report = window.g_stat_report || {};
                window.g_stat_report[b] = f;
                b++;
                f.onload = f.onerror = f.ontimeout = function() {
                    h && "function" == typeof h.callback && h.callback();
                    delete window.g_stat_report[this.g_stat_reportId]
                };
                e ? setTimeout(function() {
                    f.src = d
                }, e) : f.src = d
            }
        },
        _pgvGetUserInfo: function() {
            var d =
            document.cookie.match(/(^|;|\s)*pvid=([^;]*)(;|$)/);
            d && 2 < d.length ? d = d[2] : (d = Math.round(2147483647 * Math.random()) * (new Date).getUTCMilliseconds()%1E10, document.cookie = "pvid=" + d + "; path=/; domain=qq.com; expires=Sun, 18 Jan 2038 00:00:00 GMT;");
            return "&pvid=" + d
        },
        reportPV: function(d, m, e) {
            d = d || "mall.qzone.qq.com";
            m = m || window.location && window.location.pathname || "/";
            e = c.extend({
                timeout: 500,
                referURL: document.referrer,
                referDomain: d
            }, e);
            try {
                Url = ["http://pingfore.qq.com/pingd?dm=", d, "&url=", m, "&tt=-&rdm=",
                e.referDomain, "&rurl=", escape(e.referURL), this._pgvGetUserInfo(), "&scr=-&scl=-&lang=-&java=1&cc=-&pf=-&tz=-8&ct=-&vs=3.3"].join(""), a._send(Url + "&emu=" + Math.random(), 100, e.timeout, e)
            } catch (b) {
                d = ScriptEngine() + ScriptEngineMajorVersion() + "." + ScriptEngineMinorVersion(), a._send("http://219.133.51.97/pingd?err=" + escape(b.message) + "&jsv=" + d + "&url=" + escape(location.href) + "&stone=" + Math.random())
            }
        },
        reportHotClick: function(d, b, e, h) {
            h = c.extend({
                x: 9999,
                y: 9999,
                reportRate: 100
            }, h);
            e = e || window.location && window.location.pathname ||
            "/";
            d = ["http://pinghot.qq.com/pingd?dm=", (b || "mall.qzone.qq.com") + ".hot", "&url=", escape(e), "&tt=-&hottag=", d, "&hotx=", h.x, "&hoty=", h.y, "&rand=", Math.random()].join("");
            a._send(d, h.reportRate, 500, h)
        },
        speed: {
            _configId: 1,
            _config: {},
            init: function(d, a, e, b) {
                var f = {};
                f.flag = [d, a, e];
                f.base = b || 0;
                f.value = {};
                this._config[this._configId] = f;
                return this._configId++
            },
            add: function(a, b, e) {
                if (3 > arguments.length) {
                    if (arguments[0]instanceof Array)
                        return this.addByArr(arguments[0]);
                    e = b;
                    b = a;
                    a = this._configId-1
                }
                this._config[a] &&
                (e = (e || 0) - this._config[a].base, this._config[a].value[b] = e)
            },
            addByArr: function(a) {
                if (a && a.length) {
                    var b = this._configId-1, e = this._config[b];
                    if (e)
                        for (var h = 0, f = a.length; h < f; h++)
                            e.value[h + 1] = (a[h] || 0) - this._config[b].base
                }
            },
            send: function(b, c) {
                c = c || 100;
                var e = Math.ceil(100 / c), h = 500, f;
                if (b) {
                    f = this._config[b];
                    var g = [], k = f.value, l;
                    for (l in k)
                        g.push(l + "=" + k[l]);
                    f = ["http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=", f.flag[0], "&flag2=", f.flag[1], "&flag3=", f.flag[2], "&flag5=", e, "&", g.join("&"), "&_=", Math.random()].join("");
                    a._send(f, c, h);
                    delete this._config[b]
                } else {
                    for (var n in this._config) {
                        f = this._config[n];
                        g = [];
                        k = f.value;
                        for (l in k)
                            g.push(l + "=" + k[l]);
                        f = ["http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=", f.flag[0], "&flag2=", f.flag[1], "&flag3=", f.flag[2], "&flag5=", e, "&", g.join("&"), "&_=", Math.random()].join("");
                        a._send(f, c, h);
                        h += 10
                    }
                    this._config = {}
                }
            }
        }
    };
    return a
});
define.pack("./storage", [], function(g, k, l) {
    g = {};
    k = document.domain.split(".");
    l = k.length;
    var c = k.slice(l-2, l).join(".");
    g.cookie = {
        name: "cookie",
        isSupported: "string" == typeof document.cookie,
        init: function() {},
        set: function(b, a, d, g, e) {
            var h;
            e && (h = new Date, h.setTime(h.getTime() + 36E5 * e));
            document.cookie = b + "=" + a + "; " + (h ? "expires=" + h.toGMTString() + "; " : "") + ("path=" + (g || "/") + "; ") + ("domain=" + (d || c) + ";")
        },
        get: function(b) {
            return (b = document.cookie.match(RegExp("(?:^|;\\s*)" + b + "=([^;]*)"))) && b[1] || ""
        },
        del: function(b,
        a, d) {
            document.cookie = b + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + ("path=" + (d || "/") + "; ") + ("domain=" + (a || c) + ";")
        },
        clear: function() {
            var b = document.cookie.match(/\w+=[^;]*/g);
            if (b)
                for (var a = 0, d = b.length; a < d; a++)
                    this.del(b[a].split("=")[0])
        }
    };
    return g
});
define.pack("./user", ["base", "./storage", "./util"], function(g, k, l) {
    var c = g("base"), b = g("./storage").cookie;
    return {
        getToken: function() {
            for (var a = 5381, d = b.get("skey"), c = 0, e = d.length; c < e; ++c)
                a += (a<<5) + d.charAt(c).charCodeAt();
            return a & 2147483647
        },
        userInfo: function() {
            var a;
            return function(d) {
                var k = c.Deferred();
                a ? k.resolve(a) : c.ajax({
                    type: "get",
                    url: "http://m.qzone.com/flower/rattan/cgi-bin/touch_fcg_get_user_flowerinfo",
                    dataType: "jsonp",
                    jsonpCallback: "Callback_" + parseInt(1E4 * Math.random()),
                    data: {
                        sid: decodeURIComponent(b.get("keystr")) ||
                        localStorage.sid
                    }
                }).done(function(b) {
                    0 === b.code ? (b = b.data.garden && b.data.garden.oBaseInfo || b.data.flower, a = {
                        uin : b.uMyUin, nick : g("./util").encodeHtml(b.sUserName)
                    }, k.resolve(a)) : k.reject(b)
                }).fail(function() {
                    k.reject({})
                });
                return k.promise()
            }
        }(),
        getAvatar: function(a,
        b) {
            return "http://qlogo.store.qq.com/qzone/" + a + "/" + a + "/" + (b || "50")
        }
    }
});
define.pack("./util", [], function(g, k, l) {
    return {
        getUrlParams: function(c) {
            c = c || {};
            c = (c.paramStr || location.search.substr(1)).split("&");
            for (var b = {}, a = 0; a < c.length; a++) {
                var d = c[a], g = d.indexOf("=");
                b[d.substr(0, g)] = d.substr(g + 1)
            }
            return b
        },
        getUrlParam: function(c, b) {
            b = b || window.location;
            var a = (b.href || "").match(RegExp("(\\?|#|&)" + c + "=(.*?)(&|#|$)"));
            return mod.encodeHtml(decodeURIComponent(a ? a[2] : ""))
        },
        encodeHtml: function(c) {
            return (c + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\x60/g,
            "&#96;").replace(/\x27/g, "&#39;").replace(/\x22/g, "&quot;")
        },
        decodeHtml: function(c) {
            return (c + "").replace(/&quot;/g, '"').replace(/&#0*39;/g, "'").replace(/&#0*96;/g, "`").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&")
        }
    }
});
/*  |xGv00|e0d0ecea7195c5995739116b06af718c */

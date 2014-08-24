(function() {
    function e(a, b) {
        var c = document, d = c.createElement("script"), c = c.getElementsByTagName("head")[0];
        b && (d.id = b);
        d.async=!0;
        d.src = a;
        c.appendChild(d)
    }
    function h(a, b, h, d, m, n, k, l) {
        function f(a) {
            return function() {
                l.push(a, arguments);
                return k
            }
        }
        a[b] || (a[b] = k = {
            args: l = [],
            config: f(1),
            use: f(2)
        }, a.define = f(0), a[b].config({
            charset: "utf-8",
            base: c,
            paths: {
                game: c + "/qzone/qzact/act/game"
            },
            alias: {
                lib: "game/common/lib/" + qzaVer["@lib@"],
                base: g
            },
            map: [[/^.+\/lib\/base\.js/, g]]
        }), e(d + "/ac/lib/sea/" + qzaVer.sea + "/sea.js",
        b + "node"))
    }
    window.qzaVer = window.qzaVer || {
        sea: "2.1.2",
        "@lib@": "index.r201405182013883.js"
    };
    var c = "http://qzonestyle.gtimg.cn", g = c + "/ac/lib/zepto/1.1.3/zepto.js";
    window.seajs || h(window, "seajs", document, c);
    e(g);
    e(c + "/qzone/qzact/act/game/common/lib/" + qzaVer["@lib@"]);
    seajs.use("lib", function(a) {
        a = a.util.getUrlParams();
        var b=!1;
        a.sid && (localStorage.sid = a.sid, b=!0);
        a.openkey && (localStorage.openid = a.openid, localStorage.openkey = a.openkey, b=!0);
        b && (a && (sessionStorage.urlParams = JSON.stringify(a)), history.replaceState &&
        history.replaceState({
            currentPos : "index"
        }, "", location.origin + location.pathname))
    })
})();
/*  |xGv00|9fe40ac848fc7a1f0a47219f6a3da582 */

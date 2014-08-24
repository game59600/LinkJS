(function() {
    "use strict";
    function $extend(from, fields) {
        function inherit() {};
        inherit.prototype = from;
        var proto = new inherit();
        for (var name in fields)
            proto[name] = fields[name];
        if (fields.toString !== Object.prototype.toString)
            proto.toString = fields.toString;
        return proto;
    }
    var HxOverrides = function() {}
    HxOverrides.__name__ = true;
    HxOverrides.cca = function(s, index) {
        var x = s.charCodeAt(index);
        if (x != x)
            return undefined;
        return x;
    }
    var laya = {}
    laya.Debug = function() {};
    laya.Debug.__name__ = true;
    laya.Debug.prototype = {
        warning: function(t) {
            this.alert("laya err:" + Std.string(t));
        },
        err: function(t) {
            Laya["debugger"]();
            this.alert("laya err:" + Std.string(t));
        },
        alert: function(t) {
            Laya.jwindow.alert(t);
        },
        show: function(b) {
            if (!Laya.setup.showinfo)
                return false;
            if (b == null)
                return this.window != null && this.window.style.display != "none" ? true : false;
            var bShow;
            if (Laya.typeIsString(b) && b == "xor" && this.window != null)
                bShow=!(this.window.style.display != "none");
            else 
                bShow = b == true || b == "true";
            if (this.window == null) {
                this.window = Laya.jdocument.createElement("iframe");
                if (this.window != null) {
                    this.window.style.cssText = "border:1px solid black;position:absolute;left:10px;top:10px;width:520px;" + "height:500px;z-index:100000;display:none;background:white;overflow:hidden";
                    this.window.src = "debug/debug.html";
                    laya.device.Screen.check();
                    this.window.style.left = laya.device.Screen.width-520 + "px";
                    this.window.scroll = "none";
                    this.window.draggable = "true";
                    Laya.jwindow.document.body.appendChild(this.window);
                }
            }
            this.window.style.display = bShow ? "" : "none";
            return b;
            return false;
        },
        __class__: laya.Debug
    }
    var Setup = function() {
        this.showinfo = true;
        this.maxUpdateDelayWithSocket = 50;
        this.maxUpdateDelayWithFile = 50;
        this.version = null;
        this.debugMode = true;
        this.urlToLower = true;
        this.enableParticle = true;
    };
    Setup.__name__ = true;
    Setup.prototype = {
        __class__: Setup
    }
    var Laya = function() {};
    Laya.__name__ = true;
    Laya.getStack = function() {
        try {
            _err_test = 123;
            return "";
        } catch (e) {
            var str = "" + Std.string(e.stack);
            return str;
        }
    }
    Laya.AREG = function(_class, name, paramdef, setfname, getfname) {
        return laya.utils.Method.AREG(_class, name, paramdef, setfname, getfname);
    }
    Laya.JGETSET = function(_class, name, paramcount, setfnName) {
        return laya.utils.Method.JGETSET(_class, name, paramcount, setfnName);
    }
    Laya.attachBrowserEvent = function(name, fn, dec) {
        if (dec == null)
            dec = Laya.jdocument;
        if (dec.addEventListener != null)
            dec.addEventListener(name.substring(2, name.length), fn, false);
        else 
            dec.attachEvent(name, fn);
    }
    Laya.start = function() {
        console.log("======================================\n" + "===============LAYA 0.2===============\n" + "============LAYA实验室2013============\n" + "======================================");
        if (Laya.window == null)
            Laya.window = new laya.Window();
        if (Laya.document == null)
            Laya.document = new laya.Document();
        laya.element.Input._init_();
        laya.Document.regNodeClass("CSSStyleDeclaration", laya.css.CSSStyleDeclaration, null);
        laya.Document.regNodeClass("file", laya.element.FileNode, null);
        laya.Document.regNodeClass("span", laya.element.Span, null);
        laya.Document.regNodeClass("script", laya.element.Script, null);
        laya.Document.regNodeClass("node", laya.element.Node, null);
        laya.Document.regNodeClass("link", laya.element.Link, null);
        laya.Document.regNodeClass("importonce", laya.element.ImportOnce, null);
        laya.Document.regNodeClass("image", laya.element.Image, null);
        laya.Document.regNodeClass("img", laya.element.Image, null);
        laya.Document.regNodeClass("ani", laya.element.Animation, null);
        laya.Document.regNodeClass("iframe", laya.element.Iframe, null);
        laya.Document.regNodeClass("head", laya.element.Head, null);
        laya.Document.regNodeClass("element", laya.element.Element, null);
        laya.Document.regNodeClass("div", laya.element.Div, null);
        laya.Document.regNodeClass("canvas", laya.element.CanvasNode, null);
        laya.Document.regNodeClass("button", laya.element.Button, null);
        laya.Document.regNodeClass("body", laya.element.Body, null);
        laya.Document.regNodeClass("assembly", laya.element.Assembly, null);
        laya.Document.regNodeClass("style", laya.element.Style, null);
        laya.Document.regNodeClass("input", laya.element.Input, null);
        laya.Document.regNodeClass("wait", laya.element.Wait, null);
        laya.Document.regNodeClass("Audio", laya.element.Audio, null);
        laya.Document.regNodeClass("WebSocket", laya.element.WebSocket, null);
        laya.Document.regNodeClass("ScrollMidBar", laya.element.ScrollMidBar, null);
        laya.Document.regNodeClass("ScrollBar", laya.element.ScrollBar, null);
        laya.Document.regNodeClass("meta", laya.element.Meta, null);
        laya.Document.regNodeClass("conditionalcomments", laya.element.ConditionalComments, null);
        laya.Document.regNodeClass("externallink", laya.element.ExternalLink, null);
        laya.Document.regNodeClass("webview", laya.element.WebView, null);
        laya.Document.regNodeClass("imagespack", laya.element.ImagesPack, null);
        Laya.document.enable();
        laya.event.EventDriver.enable();
        copter.Copter._init_();
        Laya.window.start();
        laya.element.ScrollBar.__define_default__();
        if (Laya._ISFLASH_ == false) {
            Laya.jwindow.onblur = function() {
                Laya.window.set_focus(false);
                laya.event.KeyEvent.clearKeyboardState();
            };
            Laya.jwindow.onfocus = function() {
                Laya.window.set_focus(true);
            };
        }
        if (Laya._ISAPP_)
            Laya.document.body.importHTML(Laya.jwindow.location.href);
        else if (Laya.layaStartSetup.autoloadfile != false)
            Laya.document.body.importHTML(Laya.location.defaultHtml);
    }
    Laya.main = function() {
        Laya.layaStartSetup = Laya.jwindow.layaStartSetup;
        if (Laya.layaStartSetup == null)
            Laya.layaStartSetup = {};
        Laya.location = new laya.Location();
        Laya.location.enable();
        Laya.setup.version = Laya.layaStartSetup.version;
        if (Laya.setup.version == "auto")
            Laya.setup.version = "" + laya.utils.Method.getCurTime();
        Laya.setup.showinfo = Laya.layaStartSetup.showinfo == true;
        if (!Laya._ISAPP_) {
            Laya.window = new laya.Window();
            Laya.document = new laya.Document();
            if (Laya.layaStartSetup.flash == true) {} else 
                Laya.attachBrowserEvent("onload", Laya.start, Laya.jwindow);
        } else 
            Laya.start();
    }
    Laya.istype = function(d, name) {
        return false;
    }
    Laya.typeIsString = function(d) {
        return false;
    }
    Laya.isNaN = function(d) {
        return false;
    }
    Laya.isUndefined = function(d) {
        return d == Laya.undefinedvar;
    }
    Laya.alert = function(d) {
        Laya.debug.alert(d);
    }
    Laya.parseInt = function(d, a) {
        return 0;
    }
    Laya.parseFloat = function(d, a) {
        return 0;
    }
    Laya.Number = function(d) {
        return null;
    }
    Laya.Round = function(d) {
        var result = 0;
        result = 0.5 + d | 0;
        if (result - d<-1 || result - d > 1)
            result = Math.round(d);
        return result;
    }
    Laya.I = function(id) {
        return Laya.document.getElementById(id);
    }
    Laya.G = function(id) {
        var t;
        t = Laya.I(id);
        return t;
    }
    Laya.B = function(obj, name) {
        return obj[name];
        return null;
    }
    Laya["eval"] = function(t) {
        return eval(t);
    }
    Laya["debugger"] = function() {
        Laya["eval"]("debugger");
    }
    Laya.prototype = {
        __class__: Laya
    }
    var IMap = function() {}
    IMap.__name__ = true;
    var Reflect = function() {}
    Reflect.__name__ = true;
    Reflect.hasField = function(o, field) {
        return Object.prototype.hasOwnProperty.call(o, field);
    }
    Reflect.field = function(o, field) {
        var v = null;
        try {
            v = o[field];
        } catch (e) {}
        return v;
    }
    Reflect.deleteField = function(o, field) {
        if (!Reflect.hasField(o, field))
            return false;
        delete (o[field]);
        return true;
    }
    var Std = function() {}
    Std.__name__ = true;
    Std.string = function(s) {
        return js.Boot.__string_rec(s, "");
    }
    Std.parseInt = function(x) {
        var v = parseInt(x, 10);
        if (v == 0 && (HxOverrides.cca(x, 1) == 120 || HxOverrides.cca(x, 1) == 88))
            v = parseInt(x);
        if (isNaN(v))
            return null;
        return v;
    }
    Std.parseFloat = function(x) {
        return parseFloat(x);
    }
    var StringTools = function() {}
    StringTools.__name__ = true;
    StringTools.htmlEscape = function(s, quotes) {
        s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
        return quotes ? s.split("\"").join("&quot;").split("'").join("&#039;") : s;
    }
    var copter = {}
    copter.Copter = function() {};
    copter.Copter.__name__ = true;
    copter.Copter._init_ = function() {
        laya.Document.regNodeClass("gamebody", copter.ui.GameBody, null);
        laya.Document.regNodeClass("avator", copter.ui.Avator, null);
    }
    copter.Copter.prototype = {
        __class__: copter.Copter
    }
    copter.game2 = {}
    copter.game2.Point = function(x, y) {
        if (y == null)
            y = 0.0;
        if (x == null)
            x = 0.0;
        this.y = 0.0;
        this.x = 0.0;
        this.x = x;
        this.y = y;
    };
    copter.game2.Point.__name__ = true;
    copter.game2.Point.rotate = function(center, p, degree, newPoint) {
        var radians = degree * 2.0 * 3.14 / 360.0;
        newPoint.x = center.x + (p.x - center.x) * Math.cos(radians) - (p.y - center.y) * Math.sin(radians);
        newPoint.y = center.y + (p.y - center.y) * Math.cos(radians) + (p.x - center.x) * Math.sin(radians);
    }
    copter.game2.Point.prototype = {
        __class__: copter.game2.Point
    }
    copter.game2.Obstacle = function() {
        this.m_swingSpeed = 0;
        this.m_theta =- 1;
        this.curRotate = 30 * Math.PI / 180;
        copter.game2.Obstacle.createIndex = (copter.game2.Obstacle.createIndex + 1)%2;
        if (copter.game2.Obstacle.createNumber < 5)
            this.left = (laya.utils.Method.random(3, 6)-9) * 24-12;
        else 
            this.left = copter.game2.Obstacle.createIndex == 0 ? (laya.utils.Method.random(1, 2)-9) * 24-12 : (laya.utils.Method.random(6, 8)-9) * 24-12;
        copter.game2.Obstacle.createNumber++;
        this.m_swingSpeed = 0.20;
        this.m_theta = (laya.utils.Method.random(0, 100) > 50 ? 1.0 : 0.0) * 180.0 + laya.utils.Method.random(0, 60)-60;
        this.update(0);
    };
    copter.game2.Obstacle.__name__ = true;
    copter.game2.Obstacle.getRotate = function(w, tm, theta, maxDegree) {
        var r = (w * tm + theta) * 2.0 * Math.PI / 360.0;
        return maxDegree * Math.sin(r);
    }
    copter.game2.Obstacle.createInstance = function() {
        return new copter.game2.Obstacle();
    }
    copter.game2.Obstacle.prototype = {
        checkCollide: function(x, y, w, h) {
            var rminx = x + 7;
            var rminy = y - h + 7;
            var rmaxx = x + w-7;
            var rmaxy = y-7;
            var miny = this.top - copter.game2.Scene.__SBSTACLEHEIGHT__;
            var maxy = this.top;
            var dx = 480;
            if (!(this.left + copter.game2.Scene.__SBSTACLEWIDTH__ < rminx || rmaxx < this.left || maxy < rminy || rmaxy < miny))
                return true;
            if (!(this.left + dx + copter.game2.Scene.__SBSTACLEWIDTH__ < rminx || rmaxx < this.left + dx || maxy < rminy || rmaxy < miny))
                return true;
            if (this.intersectsRotateRect(this.left + copter.game2.Scene.__CHUIZI1_OFFSETX__, this.top - copter.game2.Scene.__CHUIZI_DY__, rminx, rminy, rmaxx, rmaxy))
                return true;
            if (this.intersectsRotateRect(this.left + dx + copter.game2.Scene.__CHUIZI2_OFFSETX__, this.top - copter.game2.Scene.__CHUIZI_DY__, rminx, rminy, rmaxx, rmaxy))
                return true;
            return false;
        },
        intersectsRotateRect: function(midx, midy, r2minx, r2miny, r2maxx, r2maxy) {
            var r1minx = midx - copter.game2.Scene.__CHUIZI_WIDTH__ / 2;
            var r1miny = midy - copter.game2.Scene.__CHUIZI_LLNE__ - copter.game2.Scene.__CHUIZI_HEIGHT__;
            var r1maxx = midx + copter.game2.Scene.__CHUIZI_WIDTH__ / 2;
            var r1maxy = r1miny + copter.game2.Scene.__CHUIZI_HEIGHT__;
            this.rotate(midx, midy, r1minx, r1miny, this.curRotate, copter.game2.Obstacle.point1);
            if (this.intersectsRectWithPoint(r2minx, r2miny, r2maxx, r2maxy, copter.game2.Obstacle.point1.x, copter.game2.Obstacle.point1.y))
                return true;
            this.rotate(midx, midy, r1minx, r1maxy, this.curRotate, copter.game2.Obstacle.point2);
            if (this.intersectsRectWithPoint(r2minx, r2miny, r2maxx, r2maxy, copter.game2.Obstacle.point2.x, copter.game2.Obstacle.point2.y))
                return true;
            this.rotate(midx, midy, r1maxx, r1maxy, this.curRotate, copter.game2.Obstacle.point3);
            if (this.intersectsRectWithPoint(r2minx, r2miny, r2maxx, r2maxy, copter.game2.Obstacle.point3.x, copter.game2.Obstacle.point3.y))
                return true;
            this.rotate(midx, midy, r1maxx, r1miny, this.curRotate, copter.game2.Obstacle.point4);
            if (this.intersectsRectWithPoint(r2minx, r2miny, r2maxx, r2maxy, copter.game2.Obstacle.point4.x, copter.game2.Obstacle.point4.y))
                return true;
            return false;
        },
        rotate: function(cx, cy, px, py, radians, newPoint) {
            newPoint.x = cx + (px - cx) * Math.cos(radians) - (py - cy) * Math.sin(radians);
            newPoint.y = cy + (py - cy) * Math.cos(radians) + (px - cx) * Math.sin(radians);
        },
        intersectsRectWithPoint: function(r1minx, r1miny, r1maxx, r1maxy, px, py) {
            return !(px < r1minx || px > r1maxx || py < r1miny || py > r1maxy);
        },
        intersectsRect: function(r1minx, r1miny, r1maxx, r1maxy, r2minx, r2miny, r2maxx, r2maxy) {
            return !(r1maxx < r2minx || r2maxx < r1minx || r1maxy < r2miny || r2maxy < r1miny);
        },
        update: function(tm) {
            this.curRotate = copter.game2.Obstacle.getRotate(this.m_swingSpeed, tm, this.m_theta, copter.game2.Obstacle.maxSwingAngle) * Math.PI / 180;
        },
        __class__: copter.game2.Obstacle
    }
    copter.game2.Scene = function() {
        this.obstacle = [];
    };
    copter.game2.Scene.__name__ = true;
    copter.game2.Scene.prototype = {
        reset: function() {
            this.offsetY = 0;
            this.startIndex = 0;
            this.obstacle.length = 0;
            copter.game2.Obstacle.createNumber = 0;
        },
        update: function(deltaTimeMS, canRolling) {
            this.offsetY = canRolling ? copter.game2.Scene.__RAISINGSPEEDPERMS__ * deltaTimeMS * copter.game2.Scene.__HEIGHT__ : 0;
            this.startIndex = this.yToIndex(this.offsetY);
            this.endIndex = this.startIndex + copter.game2.Scene.__NUMBER__ + 2;
            if (this.obstacle.length <= this.endIndex) {
                var _g1 = this.obstacle.length, _g = this.endIndex;
                while (_g1 < _g) {
                    var i = _g1++;
                    var o = this.obstacle[i] = copter.game2.Obstacle.createInstance();
                    o.top = i * copter.game2.Scene.__OBSTACLEHEIGHT__ + copter.game2.Scene.s_beginObstaclePos * copter.game2.Scene.__HEIGHT__ - copter.game2.Scene.__AVATORHEIGHT__;
                }
            }
        },
        yToIndex: function(y) {
            var r = Laya.parseInt(y / copter.game2.Scene.__OBSTACLEHEIGHT__);
            return r;
        },
        __class__: copter.game2.Scene
    }
    laya.event = {}
    laya.event.EventTarget = function() {}
    laya.event.EventTarget.__name__ = true;
    laya.event.EventTarget.prototype = {
        dispatchEvent: function(event, name) {
            if (this.deleted || this.eventListenerList == null || this.eventListenerList.eventTarget == null)
                return true;
            if (name == null && event != null)
                name = event.name;
            if (this.eventListenerList.eventMap == null)
                Laya["debugger"]();
            var a = this.eventListenerList.eventMap.get(name);
            if (a == null || a.length < 1)
                return false;
            var i = 0, sz, n = 0;
            if (event == null)
                event = new laya.event.Event(name, 0);
            event.sender = this;
            var $as = a;
            if ($as._isinref_ == null)
                $as._isinref_ = 0;
            var isstart = $as._isinref_ == 0;
            $as._isinref_ += 1;
            do {
                sz = a.length;
                while (i < sz) {
                    var e = a[i];
                    if (e == null || e.owner == null&&!e.deleted) {
                        i++;
                        continue;
                    }
                    if (e.deleted || e.owner.deleted) {
                        e.owner = null;
                        e.deleted = true;
                        i++;
                        continue;
                    }
                    if (!isstart) {
                        e.call_back.call(e.owner, event, e);
                        i++;
                        continue;
                    }
                    a[n] = e;
                    e.call_back.call(e.owner, event, e);
                    i++;
                    n++;
                }
            }
            while (sz < a.length);
            if (isstart && n != sz)
                a.length = n;
            $as._isinref_--;
            return true;
        },
        _hasListener_: function(name) {
            var a = this.eventListenerList.eventMap.get(name);
            if (a == null || a.length < 1)
                return false;
            return true;
        },
        addEventListener: function(type, listener, useCapture) {
            var l = this.eventListenerList.getInstance(this);
            var a = l.eventMap.get(type);
            if (a == null) {
                this._onAddEventListener(type);
                a = new Array();
                l.eventMap.set(type, a);
            }
            a.push(listener);
        },
        _onAddEventListener: function(type) {},
        __class__: laya.event.EventTarget
    }
    laya.utils = {}
    laya.utils.StringMap = function() {
        this._data_ = [];
    };
    laya.utils.StringMap.__name__ = true;
    laya.utils.StringMap.prototype = {
        clear: function() {
            this._data_ = [];
        },
        toDataArray: function() {
            return this._data_.__toDataArray__();
        },
        toKeyArray: function() {
            return this._data_.__toKeyArray__();
        },
        remove: function(key) {
            this._data_.__removeKeyElement__("$" + key);
        },
        set: function(key, d) {
            this._data_["$" + key] = d;
        },
        get: function(key) {
            return this._data_["$" + key];
        },
        __class__: laya.utils.StringMap
    }
    laya.utils.LaRegExp = function(pattern, flags) {
        this.ref = 0;
        this.regExp = laya.utils.LaRegExp.__createRegExp__(pattern, flags);
    };
    laya.utils.LaRegExp.__name__ = true;
    laya.utils.LaRegExp.isHZ = function(str) {
        return HxOverrides.cca(str, 0) > 255;
    }
    laya.utils.LaRegExp.__createRegExp__ = function(pattern, flags) {
        return null;
    }
    laya.utils.LaRegExp.replaceBlankChar = function(t, decChr) {
        if (decChr == null)
            decChr = "";
        return t.replace(laya.utils.LaRegExp._removeBlankCharRegExp_.regExp, decChr);
    }
    laya.utils.LaRegExp.prototype = {
        replaceWithFunction: function(t, fn) {
            return t.replace(this.regExp, fn);
        },
        test: function(t) {
            return this.regExp.test(t);
            return false;
        },
        exec: function(t) {
            return this.regExp.exec(t);
            return null;
        },
        replace: function(t, decChr) {
            if (decChr == null)
                decChr = "";
            return t.replace(this.regExp, decChr);
        },
        getExp: function() {
            return this.regExp;
        },
        __class__: laya.utils.LaRegExp
    }
    laya.utils.Method = function() {};
    laya.utils.Method.__name__ = true;
    laya.utils.Method.getDefData = function(def, field, value) {
        return null;
    }
    laya.utils.Method.newObject = function(className) {
        var str = "laya.utils.Method._TMPFNDEF_=new " + className + "();";
        Laya["eval"](str);
        return laya.utils.Method._TMPFNDEF_;
    }
    laya.utils.Method.setArraySize = function(arr, sz) {
        arr.length = sz;
    }
    laya.utils.Method.numToStr = function(v, d) {
        console.log("flash no");
        return 0;
    }
    laya.utils.Method.getCurTime = function() {
        return new Date().getTime();
    }
    laya.utils.Method.field = function(obj, name) {
        return obj[name];
        return null;
    }
    laya.utils.Method.setField = function(obj, name, dt) {
        obj[name] = dt;
        return true;
    }
    laya.utils.Method.callFn = function(obj, fn, arg) {
        return fn.call(obj, arg);
    }
    laya.utils.Method.jsonParse = function(txt) {
        return Laya.jwindow.JSON.parse(txt);
    }
    laya.utils.Method.insetToArrayNullElement = function(a, d) {
        var i = 0, s = a.length;
        while (i < s) {
            if (a[i] == null) {
                a[i] = d;
                return;
            }
            i++;
        }
        a.push(d);
        return;
    }
    laya.utils.Method.set = function(obj, fnName, data) {
        if (data == null) {
            Laya.debug.warning("set " + fnName + " param null");
            return 0;
        }
        var fn;
        fn = obj[fnName + "-!-"];
        if (data.substring(0, 3) == "js:")
            data = obj.EVAL(data.substring(3, data.length));
        if (fn != null)
            return fn.call(obj, data);
        obj[fnName] = data;
        return null;
    }
    laya.utils.Method.get = function(obj, fnName) {
        var fn;
        fn = obj[fnName + "-?-"];
        return fn == null ? null : fn.call(obj);
    }
    laya.utils.Method.subString = function(str, headstr, endstr, nullrtn, pos) {
        if (str == null)
            return nullrtn;
        var b = str.indexOf(headstr);
        if (b < 0)
            return nullrtn;
        b += headstr.length;
        if (endstr == null)
            return str.substring(b, str.length);
        var e = str.indexOf(endstr, b);
        if (e < 0)
            e = str.length;
        if (pos != null) {
            pos.x = b;
            pos.y = e;
        }
        return str.substring(b, e);
    }
    laya.utils.Method.strInsert = function(src, instr, pos) {
        var sz = src.length;
        if (pos >= sz || sz == 0)
            return src + instr;
        if (pos <= 0)
            return instr + src;
        var pre = src.substring(0, pos);
        var next = src.substring(pos, sz);
        return pre + instr + next;
    }
    laya.utils.Method.strDelete = function(src, pos, num) {
        var sz = src.length;
        if (pos >= sz || sz == 0)
            return src;
        if (pos <= 0)
            pos = 0;
        var pre = src.substring(0, pos);
        var next = src.substring(pos + num, sz);
        return pre + next;
    }
    laya.utils.Method.strTrim = function(str) {
        return str.replace(laya.utils.LaRegExp._string_Trim_.regExp, "");
    }
    laya.utils.Method.strLTrim = function(str) {
        return str.replace(laya.utils.LaRegExp._string_LTrim_.regExp, "");
    }
    laya.utils.Method.strRTrim = function(str) {
        return str.replace(laya.utils.LaRegExp._string_RTrim_.regExp, "");
    }
    laya.utils.Method.strToTime = function(tm) {
        if (tm == null)
            return 0;
        var n = 1, sz = tm.length;
        if (tm.charAt(sz-1) == "s") {
            if (tm.substring(0, sz-2) == "ms")
                sz -= 2;
            else {
                sz--;
                n = 1000;
            }
        }
        return Math.floor(Laya.Number(tm.substring(0, sz)) * n);
    }
    laya.utils.Method.stringReplace = function(txt, src, dec) {
        return txt.replace(src, dec);
    }
    laya.utils.Method.stringNReplace = function(txt, src, dec, count) {
        while (txt.indexOf(src) >= 0)
            txt = txt.replace(src, dec);
        return txt;
    }
    laya.utils.Method.regEvent = function(node, name, value) {
        node.regEventCode(name, value);
    }
    laya.utils.Method.JGETSET = function(_class, name, paramcount, setfnName) {
        if (setfnName == null)
            setfnName = "set_" + name;
        if (_class.prototype[setfnName] == null) {
            Laya["debugger"]();
            console.log(_class);
            console.log("AREG err,no set fn:" + setfnName);
            return false;
        }
        var param = "";
        var _g = 0;
        while (_g < paramcount) {
            var i = _g++;
            param += (i > 0 ? ",a" : "a") + i;
        }
        var js = "laya.utils.Method._TMPFNDEF_=function(" + param + "){\nif (arguments.length == 0) return this.get_" + name + "();\n" + "this." + setfnName + "(" + param + ");return this;}";
        Laya["eval"](js);
        _class.prototype[name] = laya.utils.Method._TMPFNDEF_;
        return true;
    }
    laya.utils.Method.getParamStrByRegClass = function(type, dt) {
        switch (type) {
        case"d":
            if (dt == null || dt == "")
                return "null";
            return Std.string(Laya.Number(dt)) + "";
        case"i":
            if (dt == null || dt == "")
                return "null";
            return Laya.parseInt(dt) + "";
        case"I":
            if (dt == null || dt == "")
                return "null";
            if (dt == "infinite")
                return "" + 999999999;
            return Laya.parseInt(dt) + "";
        case"t":
            if (dt == null || dt == "")
                return "null";
            return laya.utils.Method.strToTime(dt) + "";
        case"b":
            return dt == "true" ? "true" : "false";
        case"x":
            if (dt == null || dt == "")
                return "null";
            if (!Laya.isNaN(dt))
                return Laya.parseInt(dt) + "";
            break;
        }
        if (dt == null || dt == "")
            return "null";
        if (dt.charAt(0) == "'" || dt.charAt(0) == "\"")
            return "\"" + dt.substring(1, dt.length-1) + "\"";
        return "\"" + dt + "\"";
    }
    laya.utils.Method._ToNormalText_ = function(txt) {
        txt = laya.utils.Method._doubleQuotationRegExp_.replace(txt, "\\\"");
        txt = laya.utils.Method._enterRegExp_.replace(txt, "\\n");
        txt = laya.utils.Method._senterRegExp_.replace(txt, "");
        return txt;
    }
    laya.utils.Method.endOfQuotes = function(str, quotes, start) {
        var ofs;
        while (true) {
            ofs = str.indexOf(quotes, start);
            if (ofs < 0)
                return -1;
            if (str.charAt(ofs-1) == "\\") {
                start = ofs + 1;
                continue;
            }
            return ofs;
        }
        return -1;
    }
    laya.utils.Method.AREG = function(_class, name, paramdef, setfname, getfname) {
        if (setfname == null) {
            setfname = "set_" + name;
            getfname = "get_" + name;
        }
        if (name == setfname && getfname == null)
            getfname = name;
        if (paramdef == null)
            paramdef = "s";
        var fn_str = "", fnmainTxt = "";
        fn_str = "laya.utils.Method._TMPFNDEF_=function(str){\n";
        if (paramdef.length == 1) {
            fnmainTxt = "this." + setfname + "(";
            switch (paramdef) {
            case"d":
                fnmainTxt += "str*1);";
                break;
            case"i":
                fnmainTxt += "parseInt(str));";
                break;
            case"I":
                fnmainTxt += "'infinite'==str)?Laya.MAXINT:parseInt(str));";
                break;
            case"b":
                fnmainTxt += "str=='true');";
                break;
            case"t":
                fnmainTxt += "laya.utils.Method.strToTime(str));";
                break;
            default:
                fnmainTxt += "str);";
            }
        } else {
            var c = paramdef.charAt(1);
            fnmainTxt += "var cs=str.split('" + c + "');\n";
            fnmainTxt += "this." + setfname + "(";
            var ps = paramdef.split(c);
            var _g1 = 0, _g = ps.length;
            while (_g1 < _g) {
                var i = _g1++;
                if (i > 0)
                    fnmainTxt += ",";
                var _g2 = ps[i];
                switch (_g2) {
                case"d":
                    fnmainTxt += "cs[" + i + "]*1";
                    break;
                case"i":
                    fnmainTxt += "parseInt(cs[" + i + "])";
                    break;
                case"I":
                    fnmainTxt += "'infinite'==(cs[" + i + "])?Laya.MAXINT:parseInt(cs[" + i + "])";
                    break;
                case"b":
                    fnmainTxt += "'true'==(cs[" + i + "])";
                    break;
                case"t":
                    fnmainTxt += "laya.utils.Method.strToTime(cs[" + i + "])";
                    break;
                default:
                    fnmainTxt += "cs[" + i + "]";
                }
            }
            fnmainTxt += ");";
        }
        fn_str += fnmainTxt + "\n}";
        Laya["eval"](fn_str);
        laya.utils.Method._TMPPROTOTYPE_ = _class.prototype;
        if (laya.utils.Method._TMPPROTOTYPE_[setfname] == null) {
            console.log(_class);
            console.log("!!!!!!!!!!!!!AREG err,no set fn:" + setfname + "/" + getfname);
        }
        var p = laya.utils.Method._TMPPROTOTYPE_[name + "-!-"] = laya.utils.Method._TMPFNDEF_;
        p.fnmainTxt = fnmainTxt;
        p.paramdef = paramdef;
        p.setfname = setfname;
        p.setfn = laya.utils.Method._TMPPROTOTYPE_[setfname];
        p.getfname = getfname;
        p.getfn = laya.utils.Method._TMPPROTOTYPE_[getfname];
        laya.utils.Method._TMPPROTOTYPE_[name + "-?-"] = laya.utils.Method._TMPPROTOTYPE_[getfname];
        return 0;
    }
    laya.utils.Method.RegSetGet = function(_class, name, setFn, getFn) {}
    laya.utils.Method.getAREG = function(_class, name) {
        if (_class == null)
            Laya["debugger"]();
        return _class.prototype[name + "-!-"];
    }
    laya.utils.Method.addFunToPrototype = function(_class, name, fn) {
        return _class.prototype[name] = fn;
    }
    laya.utils.Method.match = function(str, reg) {
        return str.match(reg);
        return null;
    }
    laya.utils.Method.arraySplice = function(array, index, s) {
        if (s == null)
            s = 1;
        return array.splice(index, s);
    }
    laya.utils.Method.ArrayRemove = function(array, obj) {
        var _g1 = 0, _g = array.length;
        while (_g1 < _g) {
            var i = _g1++;
            if (array[i] == obj) {
                array.splice(i, 1);
                return i;
            }
        }
        return -1;
    }
    laya.utils.Method.setArrayLength = function(array, s) {
        if (s == null)
            s = 1;
    }
    laya.utils.Method.toBool = function(str) {
        return str == true || str == "true";
    }
    laya.utils.Method.nChar = function(chr, n) {
        if (n < 1)
            return "";
        var str = [];
        var _g = 0;
        while (_g < n) {
            var i = _g++;
            str.push(chr);
        }
        return str.join("");
    }
    laya.utils.Method.getScriptArrayOfText = function(text, scriptName) {
        if (scriptName == null)
            scriptName = "script";
        var r = null;
        var startPos = 0;
        while (true) {
            startPos = text.indexOf(scriptName, startPos);
            if (startPos < 0)
                return r;
            startPos = text.indexOf("{", startPos);
            if (startPos < 0)
                return r;
            var leftBrace = 1;
            var rightBrace = 0;
            var err = true;
            var _g1 = startPos + 1, _g = text.length;
            while (_g1 < _g) {
                var i = _g1++;
                var c = text.charAt(i);
                if (c == "{")
                    leftBrace++;
                if (c == "}") {
                    rightBrace++;
                    if (leftBrace == rightBrace) {
                        if (r == null)
                            r = [];
                        r.push({
                            pos: startPos,
                            count: i - startPos + 1,
                            script: text.substring(startPos, i + 1)
                        });
                        startPos = i + 1;
                        err = false;
                        break;
                    }
                }
            }
            if (err)
                return null;
        }
        return null;
    }
    laya.utils.Method.deletEannotation = function(script) {
        if (script == null)
            return null;
        var b = 0, e;
        while ((b = script.indexOf("/*", b)) >= 0) {
            e = script.indexOf("*/", b + 2);
            if (e < 0)
                e = script.length;
            else 
                e += 2;
            script = script.substring(0, b) + script.substring(e, script.length);
        }
        b = 0;
        while ((b = script.indexOf("//", b)) >= 0) {
            var e1 = script.indexOf("\n", b + 2);
            if (e1 < 0)
                e1 = script.length;
            else 
                e1 += 1;
            script = script.substring(0, b) + script.substring(e1, script.length);
        }
        return script;
    }
    laya.utils.Method.toScriptArrayOfText = function(text) {
        var r = [];
        var startPos = 0, index;
        while (true) {
            index = text.indexOf("{", startPos);
            if (index < 0) {
                r.push(text.substring(startPos));
                return r;
            }
            r.push(text.substring(startPos, index));
            startPos = index;
            var leftBrace = 1;
            var rightBrace = 0;
            var err = true;
            var _g1 = startPos + 1, _g = text.length;
            while (_g1 < _g) {
                var i = _g1++;
                var c = text.charAt(i);
                if (c == "{")
                    leftBrace++;
                if (c == "}") {
                    rightBrace++;
                    if (leftBrace == rightBrace) {
                        r.push(text.substring(startPos, i + 1));
                        startPos = i + 1;
                        err = false;
                        break;
                    }
                }
            }
            if (err)
                return null;
        }
        return null;
    }
    laya.utils.Method.execScript = function(str, url) {
        console.log("err:" + str);
    }
    laya.utils.Method.getPath = function(url) {
        if (url == null || url == "")
            return "";
        var index = url.indexOf("?");
        if (index < 0)
            index = url.indexOf("#");
        if (index > 0)
            url = url.substring(0, index);
        index = url.lastIndexOf("/");
        if (index >= 0)
            url = url.substring(0, index + 1);
        else 
            url = "/";
        if (url.charAt(0) == "/")
            url = "file://" + url;
        return url;
    }
    laya.utils.Method.getRelativeUrl = function(url, path) {
        if (path == null)
            path = "";
        if (path == null || path.length < 1)
            return url;
        var urls = url.split("/");
        var paths = path.split("/");
        var name = "";
        var breakIndex = 0;
        var _g1 = 0, _g = paths.length;
        while (_g1 < _g) {
            var i = _g1++;
            if (urls[i] != paths[i]) {
                breakIndex = i;
                break;
            }
        }
        if (breakIndex < 1)
            return url;
        name = laya.utils.Method.nChar("../", paths.length - breakIndex-1);
        var _g1 = breakIndex, _g = urls.length;
        while (_g1 < _g) {
            var i = _g1++;
            if (i > breakIndex)
                name += "/";
            name += urls[i];
        }
        return name;
    }
    laya.utils.Method.formatUrl = function(fileName, basePath) {
        if (basePath == null)
            basePath = "";
        if (Laya.setup.urlToLower)
            fileName = fileName.toLowerCase();
        var urlcache = laya.utils.Method._urlCache.get(fileName);
        if (urlcache != null)
            return urlcache;
        if (fileName == null) {
            Laya.debug.err("formatUrl err:" + fileName + " " + basePath);
            return "";
        }
        if (fileName.charAt(1) == ":" && fileName.charAt(2) == "/")
            fileName = "file://" + fileName;
        if (fileName.charAt(0) == "/")
            return Laya.location.rootPath + fileName;
        if (basePath == null)
            basePath = Laya.location.fullpath;
        var urlfull = basePath + "/" + fileName;
        urlcache = laya.utils.Method._urlCache.get(urlfull);
        if (urlcache != null)
            return urlcache;
        if (fileName.indexOf("://") < 0)
            fileName = basePath + "/" + fileName;
        var urls = fileName.split("/");
        urls[1] = "";
        var str, i = 2, size = urls.length;
        while (i < size) {
            str = urls[i];
            if (str == null)
                break;
            if (str == "" || str == ".") {
                urls.splice(i, 1);
                continue;
            }
            if (str == "..") {
                urls.splice(i-1, 2);
                i -= 1;
                continue;
            }
            i += 1;
        }
        fileName = urls.join("/");
        laya.utils.Method._urlCache.set(fileName, fileName);
        laya.utils.Method._urlCache.set(urlfull, fileName);
        return fileName;
    }
    laya.utils.Method.floatAccuracy = function(num, accuracy) {
        if (num == Laya.parseInt(num))
            return num;
        var a = Laya.parseInt(1 / accuracy);
        return Laya.Round(num * a) / a;
    }
    laya.utils.Method.encodeURI = function(txt) {
        return null;
    }
    laya.utils.Method.encodeURIComponent = function(txt) {
        return null;
    }
    laya.utils.Method.decodeURI = function(txt) {
        return null;
    }
    laya.utils.Method.decodeURIComponent = function(txt) {
        return null;
    }
    laya.utils.Method.escape = function(txt) {
        return Laya.jwindow.escape(txt);
    }
    laya.utils.Method.unescape = function(txt) {
        return Laya.jwindow.unescape(txt);
    }
    laya.utils.Method.random = function(min, max) {
        var range = max - min;
        var rand = Math.random();
        return min + Math.round(rand * range);
    }
    laya.utils.Method.setCookie = function(objName, objValue, objHours, domain) {
        if (domain == null)
            domain = "";
        if (objHours == null)
            objHours = 0;
        var str = objName + "=" + laya.utils.Method.escape(objValue);
        if (objHours > 0) {
            var date = new Date();
            var ms = objHours * 3600 * 1000;
            date = (function($this) {
                var $r;
                var d = new Date();
                d.setTime(date.getTime() + ms);
                $r = d;
                return $r;
            }(this));
            str += "; expires=" + date.toGMTString();
        }
        if (domain != "")
            str += "; domain=" + domain;
        Laya.jdocument.cookie = str;
    }
    laya.utils.Method.getCookie = function(objName) {
        var arrStr = Laya.jdocument.cookie.split("; ");
        var _g1 = 0, _g = arrStr.length;
        while (_g1 < _g) {
            var i = _g1++;
            var temp = arrStr[i].split("=");
            if (temp[0] == objName)
                return laya.utils.Method.unescape(temp[1]);
        }
        return "";
    }
    laya.utils.Method.inArray = function(ele, array) {
        var _g1 = 0, _g = array.length;
        while (_g1 < _g) {
            var i = _g1++;
            if (array[i] == ele)
                return i;
        }
        return -1;
    }
    laya.utils.Method.prototype = {
        __class__: laya.utils.Method
    }
    laya.element = {}
    laya.element.Node = function() {
        this._type2_ = 0;
        this._type_ = 77824;
        this._matter_ = 0;
        this._repaintType_ = 1;
        this.hidden = 1;
        this._private_ = {};
        this._id_=++laya.element.Node.__lastid__;
        this.childNodes = laya.element.Node.__NULLARRAY__;
        this._sort_d_ = this._id_ / 100000;
        laya.Document._activeNodeCount_++;
        this.timerCtrl = laya.utils.LayaTimer._system_timer_;
        this.eventListenerList = laya.event.EventListenerList.__DEFAULT_;
    };
    laya.element.Node.__name__ = true;
    laya.element.Node.__super__ = laya.event.EventTarget;
    laya.element.Node.prototype = $extend(laya.event.EventTarget.prototype, {
        onloaded: function() {},
        reg_set_get: function(name, setfn, getfn) {
            var _this = this;
            _this[name + "-!-"] = setfn;
            _this[name + "-?-"] = getfn;
        },
        parseHtml: function(html, startOfs) {
            return startOfs;
        },
        cssText: function(css) {
            console.log("node cannot set style");
            return css;
        },
        REMOVEEXPARAM: function(a, type) {
            a&=~type;
            return a;
        },
        ADDEXPARAM: function(a, type) {
            return a | type;
        },
        CHECKEXPARAM: function(a, type) {
            return (a & type) == type;
        },
        getDepth: function(d) {
            if (d == null)
                d = 0;
            return this.parentNode == null ? d : this.parentNode.getDepth(d + 1);
        },
        removeType2: function(type) {
            if ((this._type2_ & type) == type)
                this._type2_&=~type;
        },
        removeType: function(type) {
            if ((this._type_ & type) == type)
                this._type_&=~type;
        },
        addType2: function(type) {
            this._type2_|=type;
        },
        addType: function(type) {
            this._type_|=type;
        },
        checkMatter: function(type) {
            return (this._matter_ & type) == type;
        },
        checkType2: function(type) {
            return (this._type2_ & type) == type;
        },
        checkType: function(type) {
            return (this._type_ & type) == type;
        },
        removeMatter: function(type) {
            if ((this._matter_ & type) == type) {
                this._matter_&=~type;
                this._paintfn_ = laya.display.RenderHtml._paint_check;
            }
        },
        addMatter: function(type) {
            var m = this._matter_;
            this._matter_|=type;
            this._paintfn_ = this._matter_ != m ? laya.display.RenderHtml._paint_check : this._paintfn_;
        },
        get_innerHTML: function() {
            var spaceStr = laya.utils.Method.nChar("  ", laya.element.Node.get_innerHTML_count);
            var str = spaceStr + "<" + this.toString();
            if (this.childNodes.length == 0) {
                str += "/>";
                return str;
            }
            str += ">";
            if (this.get_text() != null)
                str += this.get_text();
            var childs = this.childNodes;
            str += "\n";
            laya.element.Node.get_innerHTML_count++;
            var _g1 = 0, _g = childs.length;
            while (_g1 < _g) {
                var i = _g1++;
                var node = childs[i];
                if (node == null || node.deleted)
                    continue;
                str += node.get_innerHTML() + "\n";
            }
            laya.element.Node.get_innerHTML_count--;
            str += spaceStr + "</" + this.nodeName + ">";
            return str;
        },
        set_innerHTML: function(txt) {
            this.removeAllChild();
            if (txt != null && txt != "")
                new laya.xhtml.HtmlParse().parse(txt, this, this.baseURL);
            return null;
        },
        get_src: function() {
            return this.m_src;
        },
        set_src: function(src) {
            return this.m_src = src;
        },
        enableMouseEvent: function(event) {
            return !this.get_disabled();
        },
        get_disabled: function() {
            return (this._type_ & 8388608) == 8388608;
        },
        set_disabled: function(b) {
            if (b)
                this._type_|=8388608;
            else if ((this._type_ & 8388608) == 8388608)
                this._type_&=-8388609;
            return b;
        },
        get_mousedowndelay: function() {
            return this._private_.mousedowndelay;
        },
        set_mousedowndelay: function(i) {
            return this._private_.mousedowndelay = i;
        },
        get_group: function() {
            if (this.parentNode == null)
                return this;
            return (this.parentNode._type_ & 16777216) == 16777216 ? this.parentNode : this.parentNode.get_group();
        },
        set_group: function(n) {
            this._type_|=16777216;
            return this;
        },
        _checkAllComplete_: function() {
            if (!((this._type_ & 8192) == 8192) || this.deleted)
                return false;
            var childs = this.childNodes, node;
            var _g1 = 0, _g = childs.length;
            while (_g1 < _g) {
                var i = _g1++;
                node = childs[i];
                if (!node.deleted&&!((node._type_ & 8192) == 8192))
                    return false;
            }
            this.onComplete();
            return true;
        },
        set_complete: function(b) {
            if (b)
                this._type_|=8192;
            else 
                this._type_&=-8193;
            return b;
        },
        get_complete: function() {
            return (this._type_ & 8192) == 8192;
        },
        onComplete: function() {},
        set: function(fnName, data) {
            return fnName.substring(0, 2) == "on" ? this.regEventCode(fnName, data) : laya.utils.Method.set(this, fnName, data);
        },
        get_parent: function() {
            return this.parentNode;
        },
        set_parent: function(p) {
            if (p == null)
                return this.parentNode;
            if (Laya.istype(p, "string")) {
                var pid = Laya.I(p);
                if (pid == null) {
                    Laya.debug.warning("setParent err:" + Std.string(p));
                    return this;
                }
                p = pid;
            }
            if (this.parentNode != p)
                p.appendChild(this);
            return this;
        },
        getByGName: function(name) {
            return this._private_._gname_nodes_ == null ? null : this._private_._gname_nodes_.get(name);
        },
        getByGName2: function(name) {
            var t;
            t = this.getByGName(name);
            return t;
        },
        get_gname: function() {
            return this._private_._gname;
        },
        set_gname: function(name) {
            var p = this.get_group();
            if (p != null) {
                this._private_._gname = name;
                if (p._private_._gname_nodes_ == null)
                    p._private_._gname_nodes_ = new laya.utils.StringMap();
                p._private_._gname_nodes_.set(name, this);
            }
            return name;
        },
        get_name: function() {
            return this.m_name;
        },
        set_name: function(name) {
            if (this.m_name == name)
                return name;
            var p = this.parentNode;
            if (p != null) {
                if (this.m_name != null && Reflect.field(p, this.m_name) == this)
                    Reflect.deleteField(p, this.m_name);
                p[name] = this;
            }
            this.m_name = name;
            return name;
        },
        set_srcid: function(id) {
            var txt = Laya.document.textMap.get(id);
            if (txt == null)
                this.set_src("src ull:" + id);
            else 
                this.set_src(txt);
            return id;
        },
        set_textid: function(id) {
            var txt = Laya.document.textMap.get(id);
            if (txt == null)
                this.set_text("text ull:" + id);
            else 
                this.set_text(txt);
            return id;
        },
        get_text: function() {
            return this.textContent;
        },
        set_text: function(txt) {
            if (txt == null || this.textContent == txt)
                return this.textContent;
            this.textContent = txt;
            this.dispatchEvent(null, "onretext");
            this.addMatter(256);
            return txt;
        },
        get_value: function() {
            return this.textContent;
        },
        set_value: function(txt) {
            return this.set_text(txt);
        },
        __destroy__: function() {
            this.destroy();
        },
        _on_destroy_system_: function() {},
        indexOf: function(child) {
            if (this.childNodes.length > 0) {
                var cs = this.childNodes;
                var _g1 = 0, _g = this.childNodes.length;
                while (_g1 < _g) {
                    var i = _g1++;
                    if (cs[i] == child)
                        return i;
                }
            }
            return -1;
        },
        get_id: function() {
            return this.m_id;
        },
        set_id: function(id) {
            if (this.m_id == id)
                return id;
            var all = Laya.document.all;
            if (this.m_id != null && all.get(this.m_id) == this)
                all.set(this.m_id, null);
            this.m_id = id;
            if (id != null) {
                this._type_|=1024;
                all.set(id, this);
            }
            return id;
        },
        _to_sort_d: function() {
            return this._sort_d_ = this._id_ / 100000;
        },
        set_onupdate: function(d) {
            this.regEventCode("onupdate", d);
            return d;
        },
        set_onblur: function(d) {
            this.regEventCode("onblur", d);
            return d;
        },
        set_onfocus: function(d) {
            this.regEventCode("onfocus", d);
            return d;
        },
        set_ondragover: function(d) {
            this.regEventCode("ondragover", d);
            return d;
        },
        set_ondragleave: function(d) {
            this.regEventCode("ondragleave", d);
            return d;
        },
        set_ondragenter: function(d) {
            this.regEventCode("ondragenter", d);
            return d;
        },
        set_ondragend: function(d) {
            this.regEventCode("ondragend", d);
            return d;
        },
        set_ondragstart: function(d) {
            this.regEventCode("ondragstart", d);
            return d;
        },
        set_ondrag: function(d) {
            this.regEventCode("ondrag", d);
            return d;
        },
        set_onmouseout: function(d) {
            this.regEventCode("onmouseout", d);
            return d;
        },
        set_onmouseover: function(d) {
            this.regEventCode("onmouseover", d);
            return d;
        },
        set_ondbclick: function(d) {
            this.regEventCode("ondbclick", d);
            return d;
        },
        set_onmultouchup: function(d) {
            this.regEventCode("onmultouchup", d);
            return d;
        },
        set_onmouseup: function(d) {
            this.regEventCode("onmouseup", d);
            return d;
        },
        set_onmousedown: function(d) {
            this.regEventCode("onmousedown", d);
            return d;
        },
        set_onmousemove: function(d) {
            this.regEventCode("onmousemove", d);
            return d;
        },
        set_onclick: function(d) {
            this.regEventCode("onclick", d);
            return d;
        },
        set_onreshow: function(d) {
            this.regEventCode("onreshow", d);
            return d;
        },
        set_onrepos: function(d) {
            this.regEventCode("onrepos", d);
            return d;
        },
        set_onresize: function(d) {
            this.regEventCode("onresize", d);
            return d;
        },
        toHTML: function(checkSaveFn, _nodeName) {
            var spaceStr = laya.utils.Method.nChar("    ", laya.element.Node.get_innerHTML_count);
            _nodeName = _nodeName != null ? _nodeName : this.nodeName;
            var str = spaceStr + "<" + _nodeName + " _id_=" + this._id_ + " " + Std.string(this);
            if (this._private_.nodeParams != null) {
                var _g1 = 0, _g = this._private_.nodeParams.length;
                while (_g1 < _g) {
                    var i = _g1++;
                    var o = this._private_.nodeParams[i];
                    var value = "" + Std.string(laya.utils.Method.get(this, o.name));
                    if (value != "null" && value != o.defaultValue) {
                        if (o.type == "file")
                            value = laya.utils.Method.getRelativeUrl(value, this.baseURL != null ? this.baseURL.path : null);
                        str += " " + Std.string(o.name) + "=\"" + value + "\"";
                    }
                }
            }
            if (this.style != null && this._private_.styleParams != null) {
                var stylestr = "";
                if (((this.style._type_ & 131072) == 131072 ? 1 : 0) == 1)
                    stylestr += "position:absolute;";
                var _g1 = 0, _g = this._private_.styleParams.length;
                while (_g1 < _g) {
                    var i = _g1++;
                    var o = this._private_.styleParams[i];
                    var value = "" + Std.string(laya.utils.Method.get(this.style, o.name));
                    if (value != "null" && value != o.defaultValue)
                        stylestr += Std.string(o.name) + ":" + value + ";";
                }
                str += " style=\"" + stylestr + "\" ";
            }
            if (this.childNodes.length == 0) {
                str += "/>";
                return str;
            }
            var childs = this.childNodes;
            laya.element.Node.get_innerHTML_count++;
            var childhtml = "";
            var _g1 = 0, _g = childs.length;
            while (_g1 < _g) {
                var i = _g1++;
                var node = childs[i];
                if (node == null || node.deleted || checkSaveFn != null&&!checkSaveFn(node))
                    continue;
                var html = node.toHTML(checkSaveFn, null);
                if (html.length > 0)
                    childhtml += html + "\n";
            }
            if (childhtml.length > 1)
                str += ">\n" + childhtml + spaceStr + "</" + _nodeName + ">";
            else 
                str += "/>";
            laya.element.Node.get_innerHTML_count--;
            return str;
        },
        toString: function() {
            var str = this.nodeName + " _id_=" + this._id_ + (this.m_id != null ? " id='" + this.m_id + "'" : "");
            if (this.get_src() != null)
                str += " src='" + this.get_src() + "'";
            if (this.style != null) {
                if (this.hidden > 0)
                    str += " hidden=" + this.hidden;
                if (this.childNodes.length > 0)
                    str += " childs:=" + this.childNodes.length;
                str += " style=\"left:" + this.style.m_left;
                str += ";top:" + this.style.m_top;
                str += ";width:" + this.style.m_width;
                str += ";height:" + this.style.m_height + "\"";
            }
            if (this.textContent != null)
                str += " text=\"" + this.textContent + "\"";
            return str;
        },
        loadAllFile: function() {
            this.eachChilds(function(node) {
                node.startLoadFile();
            }, 999999999);
        },
        startLoadFile: function() {},
        eventReged: function(type) {
            this.regEventCode(type, this[type]);
        },
        dispatchEvent: function(event, name) {
            var r = true;
            if ((this._type_ & 16) == 16) {
                var fn = this[name != null ? name: event.name];
                if (fn != null)
                    r = fn.call(this, event) != false;
            }
            if (this.eventListenerList == null || this.eventListenerList.eventTarget == null || this.deleted)
                return r;
            return laya.event.EventTarget.prototype.dispatchEvent.call(this, event, name) || r;
        },
        attachEvent: function(type, fn, node) {
            fn = Laya.typeIsString(fn) ? Laya["eval"]("(function(e){" + Std.string(fn) + ";})") : fn;
            var l = new laya.event.EventListener(node != null ? node : this, fn);
            this.addEventListener(type, l);
            return l;
        },
        _onAddEventListener: function(type) {
            this._type_|=16;
            switch (type) {
            case"fileloadcomplete":
                laya.io.FileFactory.checkLoadComplete();
                break;
            case"onrepaint":
                this._type_|=262144;
                break;
            case"onresize":
                this._type2_|=1;
                break;
            case"onrepos":
                this._type_|=524288;
                break;
            case"onclick":
            case"onmouseup":
            case"onmousedown":
            case"ondbclick":
                laya.element.method.ElementMethod.setMouseEnable(this, 4);
                break;
            case"onmouseover":
            case"onmouseout":
                this._type_|=33554432;
                laya.element.method.ElementMethod.setMouseEnable(this, 12);
                break;
            case"ondrop":
                this._type_|=67108864;
                laya.element.method.ElementMethod.setMouseEnable(this, 12);
                break;
            case"onmousemove":
            case"onwheel":
                laya.element.method.ElementMethod.setMouseEnable(this, 12);
                break;
            case"ondrag":
            case"ondragstart":
            case"ondragend":
            case"ondragenter":
            case"ondragleave":
            case"ondragover":
                laya.element.method.ElementMethod.setMouseEnable(this, 32772);
                break;
            }
        },
        enableOnPaint: function(enableAutoReapint) {
            this.addMatter(65536);
            if (enableAutoReapint)
                this.set_onupdate($bind(this, this.repaint));
        },
        E: function(type, fn) {
            return this.regEventCode(type, fn);
        },
        eventset: function(events) {
            var type;
            if (Laya.typeIsString(events)) {
                type = events;
                this.regEventCode(type, this[type]);
                return;
            }
            var types;
            types = events;
            var _g1 = 0, _g = types.length;
            while (_g1 < _g) {
                var i = _g1++;
                type = types[i];
                this.regEventCode(type, this[type]);
            }
        },
        regEventCode: function(type, fn) {
            if (Laya.typeIsString(fn))
                Laya["eval"]("laya.utils.Method._TMPFNDEF_=function(e){" + Std.string(fn) + ";}");
            else 
                laya.utils.Method._TMPFNDEF_ = fn;
            if (type == "oncreated") {
                {
                    this.onCreated = laya.utils.Method._TMPFNDEF_;
                    this;
                }
                return null;
            }
            if (type == "onupdate") {
                if (this._private_.onupdatetimer != null)
                    this._private_.onupdatetimer.deleted = true;
                var timer = this._private_.onupdatetimer = this.timerCtrl.createUpdateTimer(this);
                timer.update = fn;
                return null;
            }
            this._type_|=16;
            switch (type) {
            case"onrepaint":
                this._type_|=262144;
                break;
            case"onrepos":
                this._type_|=524288;
                break;
            case"onresize":
                this._type2_|=1;
                break;
            case"onclick":
            case"onmouseup":
            case"onmousedown":
            case"ondbclick":
            case"onsingletouchup":
                laya.element.method.ElementMethod.setMouseEnable(this, 4);
                break;
            case"onmouseover":
            case"onmouseout":
                this._type_|=33554432;
                laya.element.method.ElementMethod.setMouseEnable(this, 12);
                break;
            case"ondrop":
                this._type_|=67108864;
                laya.element.method.ElementMethod.setMouseEnable(this, 12);
                break;
            case"onmousemove":
            case"onwheel":
                laya.element.method.ElementMethod.setMouseEnable(this, 12);
                break;
            case"ondrag":
            case"ondragstart":
            case"ondragend":
            case"ondragenter":
            case"ondragleave":
            case"ondragover":
                laya.element.method.ElementMethod.setMouseEnable(this, 32772);
                break;
            case"onload":
                Laya["eval"]("attachEvent(\"onload\", function (n, l) {" + Std.string(fn) + "});");
                break;
            }
            {
                this[type] = laya.utils.Method._TMPFNDEF_;
                this;
            }
            return null;
        },
        eventsToG: function(uiname, events) {
            var eventsstr = events.split(";");
            var _g1 = 0, _g = eventsstr.length;
            while (_g1 < _g) {
                var i = _g1++;
                var one = eventsstr[i].split(":");
                if (one.length == 1)
                    this.attachEvent(one[0], "this.group()." + uiname + "_" + one[0] + "(this,e)");
                else 
                    this.attachEvent(one[0], "this.get_group()." + uiname + "_" + one[0] + "(this,e,\"" + one[1] + "\")");
            }
        },
        isView: function() {
            return !(this.hidden > 0 ||!this.parentNode.isView());
        },
        getField: function(name) {
            return this[name];
        },
        setField: function(name, value) {
            this[name] = value;
            return this;
        },
        setAttribute: function(name, value) {
            this[name] = value;
            return this;
        },
        getAttribute: function(name) {
            return this[name];
        },
        enableChileNodes: function() {
            return true;
        },
        _toElement_: function() {
            return null;
        },
        addTimer: function(fn, delay, count) {
            if (count == null)
                count = 999999;
            if (delay == null)
                delay = 30;
            return this.timerCtrl.add(this, fn, delay, count);
        },
        getCurTime: function() {
            return this.timerCtrl.curtime;
        },
        killTimer: function(fn) {
            this.timerCtrl.kill(this, fn);
            return this;
        },
        getTimerCtrl: function() {
            return this.timerCtrl;
        },
        created: function() {
            this._type_|=2097152;
            this.onCreated();
        },
        getElementsByAttribute: function(name, value) {
            return this.select(function(o) {
                return laya.utils.Method.field(o, name) == value;
            });
        },
        getElementsByNodeName: function(name) {
            return this.select(function(o) {
                return o.nodeName == name;
            });
        },
        getElementsByName: function(name) {
            return this.select(function(o) {
                return o.get_name() == name;
            });
        },
        getElementsByClassName: function(name) {
            return this.select(function(o) {
                return o.get_className() == name;
            });
        },
        getByName: function(name) {
            return this[name];
        },
        getByName2: function(name) {
            return this[name];
        },
        select: function(fn, depth, resultSet) {
            if (depth == null)
                depth = 99999;
            if (resultSet == null)
                resultSet = [];
            depth--;
            var cs = this.childNodes;
            var sz = cs.length, r = 0;
            var _g1 = 0, _g = cs.length;
            while (_g1 < _g) {
                var i = _g1++;
                var c = cs[i];
                if (c.deleted)
                    continue;
                r = fn.call(c, c);
                if (r==-1)
                    continue;
                if (r != 0)
                    resultSet.push(c);
                if (r==-2)
                    continue;
                if (depth>-1 && c.childNodes.length > 0)
                    c.select(fn, depth, resultSet);
            }
            return resultSet;
        },
        eachChilds: function(fn, depth, result) {
            if (depth == null)
                depth = 1;
            depth--;
            var cs = this.childNodes, r;
            var _g1 = 0, _g = cs.length;
            while (_g1 < _g) {
                var i = _g1++;
                var c = cs[i];
                if (c == null || c.deleted)
                    continue;
                if (depth > 0 && c.childNodes.length > 0) {
                    if (fn.call(c, c, result) == 0)
                        return 0;
                    if ((r = c.eachChilds(fn, depth, result)) == 0)
                        return 0;
                    continue;
                } else if (fn.call(c, c, result) == 0)
                    return 0;
            }
            return 1;
        },
        runChildsThisFun: function(fnName, depth, result) {
            if (depth == null)
                depth = 1;
            depth--;
            var cs = this.childNodes, r, fn;
            var _g1 = 0, _g = cs.length;
            while (_g1 < _g) {
                var i = _g1++;
                var c = cs[i];
                if (c == null || c.deleted)
                    continue;
                if (depth > 0 && c.childNodes.length > 0) {
                    if ((fn = c[fnName]) != null) {
                        if (fn.call(c, result) == 0)
                            return 0;
                    }
                    if ((r = c.runChildsThisFun(fnName, depth, result)) == 0)
                        return 0;
                    continue;
                } else if ((fn = c[fnName]) != null) {
                    if (fn.call(c, result) == 0)
                        return 0;
                }
            }
            return 1;
        },
        get_explanation: function() {
            return this.explanation;
        },
        set_explanation: function(txt) {
            {
                this.explanation = txt;
                this;
            }
            return txt;
        },
        getCreateFile: function() {
            return this.baseURL == null ? null : laya.io.File._find_(this.baseURL.url);
        },
        get_basePath: function() {
            return this.baseURL != null ? this.baseURL.path : null;
        },
        formatUrl: function(url) {
            return laya.io.File._formatUrl_(url, this.baseURL != null ? this.baseURL.path : null);
        },
        importHTML: function(url, call_back) {
            var _g = this;
            url = Laya.document.toHtmlUrl(url);
            url = laya.io.File._formatUrl_(url, this.baseURL.path);
            laya.io.File._instance_(url, "text", {
                onload: function(file) {
                    new laya.xhtml.HtmlParse().parse(file.getData(), _g, new laya.utils.URLEX(file.getUrl()), call_back);
                }
            });
        },
        appendText: function(txt) {
            this.set_text(this.textContent == null ? txt : this.textContent + txt);
            return this;
        },
        appendHTML: function(txt) {
            if (txt != null && txt != "")
                new laya.xhtml.HtmlParse().parse(txt, this, this.baseURL);
            return this;
        },
        onDataChang: function(value) {
            if (this.deleted)
                return false;
            console.log("data chang:" + Std.string(value));
            if (Laya.typeIsString(value))
                this.set_text(value);
            else 
                this.set_value("" + Std.string(value));
            return true;
        },
        getElementById: function(id) {
            if (id == "parent")
                return this.parentNode;
            if (id == "group")
                return this.get_group();
            return Laya.document.getElementById(id);
        },
        destroyAllChild: function() {
            if (this.childNodes.length > 0) {
                var c;
                var _g1 = 0, _g = this.childNodes.length;
                while (_g1 < _g) {
                    var i = _g1++;
                    c = this.childNodes[i];
                    if (c != null&&!c.deleted)
                        c.destroy();
                }
                this.childNodes = laya.element.Node.__NULLARRAY__;
                if ((this._matter_ & 1) == 1) {
                    this._matter_&=-2;
                    this._paintfn_ = laya.display.RenderHtml._paint_check;
                }
            }
            return this;
        },
        destroy: function() {
            if (this.deleted)
                return false;
            this.dispatchEvent(null, "ondestroy");
            this.hidden = 1;
            this.deleted = true;
            this.set_complete(true);
            this._on_destroy_system_();
            if (this._private_._gname)
                this.get_group()._private_._gname_nodes_.set(this._private_._gname, null);
            var c = this.parentNode;
            if (c != null&&!c.deleted) {
                c.repaint();
                var index = c.indexOf(this);
                if (index >= 0)
                    laya.utils.Method.arraySplice(c.childNodes, index);
            }
            if ((this._type_ & 1024) == 1024) {
                if (c != null) {
                    var cc = c;
                    if (this.m_name != null && cc[this.m_name] != null)
                        cc[this.m_name] = null;
                }
                var childs = this.childNodes;
                this.childNodes = laya.element.Node.__NULLARRAY__;
                this.set_id(null);
                var _g1 = 0, _g = childs.length;
                while (_g1 < _g) {
                    var i = _g1++;
                    c = childs[i];
                    c != null && c.destroy();
                }
            }
            laya.element.Node.__node_deleted_list_.push(this);
            if (this.eventListenerList != laya.event.EventListenerList.__DEFAULT_) {
                this.eventListenerList.destroy(this);
                this.eventListenerList = laya.event.EventListenerList.__DEFAULT_;
            }
            return true;
        },
        alert: function(d) {
            Laya.jwindow.alert(d);
        },
        appendChild: function(c) {
            if (this.deleted)
                return null;
            if (Laya.typeIsString(c))
                c = Laya.document.createElement(c);
            else if (c.parentNode == this || c.active == 0)
                return c;
            this._type_|=1024;
            this.insert(c, this.childNodes.length);
            return c;
        },
        getStyle: function() {
            return null;
        },
        isCreated: function() {
            return (this._type_ & 2097152) == 2097152;
        },
        onCreated: function() {},
        repaint: function() {
            return this;
        },
        removeAllChild: function() {
            if (this.textContent != null)
                this.set_text("");
            if (this.childNodes.length < 1)
                return;
            var cs = this.childNodes;
            this.childNodes = laya.element.Node.__NULLARRAY__;
            var _g1 = 0, _g = cs.length;
            while (_g1 < _g) {
                var i = _g1++;
                cs[i].destroy();
            }
            this.repaint();
            if ((this._matter_ & 1) == 1) {
                this._matter_&=-2;
                this._paintfn_ = laya.display.RenderHtml._paint_check;
            }
        },
        removeChild: function(c) {
            c.parentNode = null;
            var index = this.indexOf(c);
            if (index < 0)
                return this;
            laya.utils.Method.arraySplice(this.childNodes, index);
            this._private_.documentModify = true;
            this.repaint();
            this.dispatchEvent(null, "onremovechild");
            return c;
        },
        lastChild: function() {
            return this.childNodes[this.childNodes.length-1];
        },
        firstChild: function() {
            return this.childNodes[0];
        },
        insert: function(c, index) {
            if (c.deleted == true)
                return this;
            if (c.parentNode != null) {
                if (c.parentNode == this)
                    return this;
                c.parentNode._type_|=4096;
                c.parentNode.removeChild(c);
            }
            c._private_._depth_ = this._private_._depth_ + 1;
            this.repaint();
            if (c.baseURL == null)
                c.baseURL = this.baseURL;
            if (this.childNodes == laya.element.Node.__NULLARRAY__) {
                this.childNodes = [];
                if (Laya._ISAPP_) {
                    this._renderNode = laya.element.Node.__RENDERNODE_GARBAGE__.length > 0 ? laya.element.Node.__RENDERNODE_GARBAGE__.pop() : Laya.conch.createRenderNode();
                    this._renderNode.clear();
                    if (this.parentNode != null)
                        this._renderNode.setParent(this.parentNode._renderNode);
                }
            }
            if (c._renderNode != null)
                c._renderNode.setParent(this._renderNode);
            if (index < 0 || index >= this.childNodes.length)
                this.childNodes.push(c);
            else 
                this.childNodes.splice(index, 0, c);
            c.parentNode = this;
            if (c.style != null)
                c.style.inheritFont(this.style);
            c.timerCtrl = this.timerCtrl;
            this._matter_|=1;
            this._paintfn_ = laya.display.RenderHtml._paint_check;
            this._type_|=4160;
            if (!((this._type_ & 65536) == 65536)) {
                if ((c._type_ & 65536) == 65536)
                    c._type_&=-65537;
            }
            c.onParent(this);
            return c;
        },
        onParent: function(parent) {},
        EVAL: function(txt) {
            return 0;
        },
        __class__: laya.element.Node
    });
    laya.element.TypesetInterface = function() {}
    laya.element.TypesetInterface.__name__ = true;
    laya.element.TypesetInterface.prototype = {
        __class__: laya.element.TypesetInterface
    }
    laya.element.Element = function() {
        laya.element.Node.call(this);
        this._paintfn_ = laya.display.RenderHtml._paint_check;
        this.extData = laya.element.method.NodeExtData.___DEFAULT__;
        this.hidden = 0;
        this.style = this._newStyle_();
    };
    laya.element.Element.__name__ = true;
    laya.element.Element.__interfaces__ = [laya.element.TypesetInterface];
    laya.element.Element.__super__ = laya.element.Node;
    laya.element.Element.prototype = $extend(laya.element.Node.prototype, {
        set_isModalWindow: function(b) {
            if (b)
                this._type_|=268435456;
            else if ((this._type_ & 268435456) == 268435456)
                this._type_&=-268435457;
        },
        playSound: function(url) {
            url = this.formatUrl(url);
            var a = new laya.element.Audio();
            a.created();
            a.parentNode = this;
            a.set_autoplay(true);
            a.set_src(url);
        },
        paintToCanvas: function(canvas) {
            canvas.render.paintToCanvas(this, canvas, 1);
        },
        set_className: function(name) {
            this.m_className = name;
            var css = Laya.document.styleSheets.get(name);
            if (css == null) {
                var cssSome = name.split(" ");
                if (cssSome.length > 1) {
                    var _g1 = 0, _g = cssSome.length;
                    while (_g1 < _g) {
                        var i = _g1++;
                        css = Laya.document.styleSheets.get(cssSome[i]);
                        if (css != null)
                            css.call(this.style);
                    }
                } else 
                    console.log(this.nodeName + " set class err:" + name);
            } else 
                css.call(this.style);
            return name;
        },
        get_className: function() {
            return this.m_className;
        },
        get_focus: function() {
            return Laya.document.activeElement == this;
        },
        set_focus: function(b) {
            if (b == false) {
                this.blur();
                return false;
            }
            if (Laya.document.activeElement == this) {
                this.dispatchEvent(null, "onfocus");
                return true;
            }
            if (Laya.document.activeElement != null)
                Laya.document.activeElement.blur();
            Laya.document.activeElement = this;
            this.dispatchEvent(null, "onfocus");
            return true;
        },
        blur: function() {
            if (Laya.document.activeElement != this)
                return;
            Laya.document.activeElement = null;
            this.dispatchEvent(null, "onblur");
        },
        onchildrepos: function(child) {},
        _enableInsertTypesetLine_: function() {
            return false;
        },
        _toElement_: function() {
            return this;
        },
        isWordNode: function() {
            return false;
        },
        mustTypeset: function() {
            this._type_|=4224;
            this._checkNeedTypeset_();
        },
        set_text: function(txt) {
            if (txt == null || this.textContent == txt)
                return this.textContent;
            this.textContent = txt;
            this.dispatchEvent(null, "onretext");
            this.addMatter(256);
            this.textNodes = null;
            this.mustTypeset();
            this.repaint();
            return txt;
        },
        animationby: function(text, duration, timingFunction, delay, count, direction, call_back) {
            return this.style.animationby(text, duration, timingFunction, delay, count, direction, call_back);
        },
        animation: function(text, duration, timingFunction, delay, count, direction, call_back) {
            return this.style.animation(text, duration, timingFunction, delay, count, direction, call_back);
        },
        getScaleFromParentNode: function(pnode, xScale, yScale) {
            if (pnode == null)
                pnode = Laya.document.body;
            var p;
            p = this.parentNode;
            xScale = xScale * this.get_scalex();
            yScale = yScale * this.get_scaley();
            if (pnode == this || p == null || p.style == null)
                return new laya.utils.Point(xScale, yScale);
            return p.getScaleFromParentNode(pnode, xScale, yScale);
        },
        posOfTop2: function(pnode, x, y) {
            if (pnode == null)
                pnode = Laya.document.body;
            x += Laya.Round(this._get_clientLeft() - this.get_scrollLeft());
            y += Laya.Round(this._get_clientTop() - this.get_scrollTop());
            var p;
            p = this.parentNode;
            if (p != null && p.style.transform.style != null) {
                var sx = p.style.get_scalex(), sy = p.style.get_scaley();
                x = x * sx;
                y = y * sy;
                var tfm = p.style.transform;
                tfm.translateByTransformOrigin(p.style);
                x += Laya.Round(tfm.translateX * (1 - sx));
                y += Laya.Round(tfm.translateY * (1 - sy));
            }
            if (pnode == this || p == null || p.style == null)
                return new laya.utils.Point(x, y);
            return p.posOfTop2(pnode, x, y);
        },
        posOfTop: function(pnode, x, y) {
            if (pnode == null)
                pnode = Laya.document.body;
            var p;
            p = this.parentNode;
            x += this.get_left() - this.style.transform.translateX;
            y += this.get_top() - this.style.transform.translateY;
            x = (x - this.get_scrollLeft()) * this.get_scalex();
            y = (y - this.get_scrollTop()) * this.get_scaley();
            if (pnode == this || p == null || p.style == null)
                return new laya.utils.Point(x, y);
            return p.posOfTop(pnode, x, y);
        },
        pointInNode: function(x, y) {
            if (this.deleted)
                return false;
            if ((this._type_ & 512) == 512)
                return this;
            var style = this.style;
            if (!((style._type_ & 32768) == 32768 || (style._type_ & 4194304) == 4194304 || (style._type_ & 65536) == 65536 || (style._type_ & 8388608) == 8388608) && this.childNodes.length > 0)
                return this;
            if (style.overflow != null || (style._type_ & 16777216) == 16777216)
                return x > 0 && y > 0 && x < this.get_offsetWidth() && y < this.get_offsetHeight() ? this : null;
            if (this.textNodes != null) {
                var _g1 = 0, _g = this.textNodes.length;
                while (_g1 < _g) {
                    var i = _g1++;
                    var os = this.textNodes[i];
                    var bx = os.left, by = os.top;
                    var ex = bx + os.width, ey = by + os.height;
                    if (x >= bx && y >= by && x <= ex && y <= ey)
                        return os;
                }
            }
            if (this.childNodes.length > 0) {
                var cs = this.childNodes;
                var x2 = x + this.get_scrollLeft();
                var y2 = y + this.get_scrollTop();
                var _g1 = 0, _g = cs.length;
                while (_g1 < _g) {
                    var i = _g1++;
                    if (cs[i].style != null && cs[i]._nodePointInNode(x2, y2))
                        return cs[i];
                }
            }
            return x > 0 && y > 0 && x < this.get_offsetWidth() && y < this.get_offsetHeight() ? this : null;
        },
        _nodePointInNode: function(x, y) {
            if (this.style.transform.style == null) {
                x -= Laya.Round(this._get_clientLeft());
                y -= Laya.Round(this._get_clientTop());
            } else {
                var sx = this.style.get_scalex(), sy = this.style.get_scaley();
                x = Laya.Round((x - this._get_clientLeft() - this.style.transform.translateX * (1 - sx)) / sx);
                y = Laya.Round((y - this._get_clientTop() - this.style.transform.translateY * (1 - sy)) / sy);
            }
            return this.pointInNode(x, y);
        },
        pointElement: function(x, y, fn) {
            if (this.deleted)
                return null;
            var style = this.style;
            if (style.transform.style == null) {
                x -= Laya.Round(this._get_clientLeft());
                y -= Laya.Round(this._get_clientTop());
            } else {
                var sx = style.get_scalex(), sy = style.get_scaley();
                x = Laya.Round((x - this._get_clientLeft() - style.transform.translateX * (1 - sx)) / sx);
                y = Laya.Round((y - this._get_clientTop() - style.transform.translateY * (1 - sy)) / sy);
            }
            var r = fn.call(this, this, x, y);
            if (r < 0)
                return null;
            var bin = x > 0 && y > 0 && x < this.get_offsetWidth() + 4 && y < this.get_offsetHeight() + 4;
            if (this.childNodes.length > 0) {
                var cs = this.childNodes, s = cs.length;
                x += this.get_scrollLeft();
                y += this.get_scrollTop();
                while (--s >= 0) {
                    var c = cs[s];
                    if (c == null || c.style == null || c.hidden != 0)
                        continue;
                    if ((c = c._toElement_().pointElement(x, y, fn)) != null)
                        return c._toElement_();
                }
            }
            return r == 2 && bin ? this : null;
        },
        getTextData: function(pos) {
            if (this.textNodes == null || this.textNodes.length == 0)
                return null;
            if (pos < 0)
                pos = 0;
            if (pos >= this.textNodes.length) {
                var os = this.textNodes[this.textNodes.length-1];
                return {
                    x: os.left + os.width,
                    y: os.top,
                    w: os.width,
                    h: os.height
                };
            }
            var os = this.textNodes[pos];
            return {
                x: os.left,
                y: os.top,
                w: os.width,
                h: os.height,
                wordobj: os
            };
        },
        _to_sort_d: function() {
            var z = this.style.m_zindex;
            return this._sort_d_ = this._id_ / 100000 + (((this.style._type_ & 131072) == 131072 ? 1 : 0) == 0 ? 0 : 100000) + (z == null ? 0 : z * 10);
        },
        get_dragCtrl: function() {
            return this.extData.dragCtrl;
        },
        get_draggable: function() {
            return this.extData.draggable;
        },
        set_draggable: function(s) {
            if (s != "false" && s != "none") {
                if (s != "default")
                    this.style.position("true");
                this.extData.create(this);
                this.extData.draggable = s;
                var params = s.split(" ");
                var dragNode;
                dragNode = params[1] == null ? null : this.getElementById(params[1])._toElement_();
                s = params[0];
                if (this.extData.dragCtrl == null) {
                    if (s == "move" || s == "move-view" || s == "move-in" || s == "move-resize" || s == "_edit_")
                        this.extData.dragCtrl = new laya.element.method.DragCtrl_Move(s, dragNode);
                    if (s == "true" || s == "default")
                        this.extData.dragCtrl = new laya.element.method.DragCtrl_Default(s);
                }
                this._type_|=16384;
                laya.element.method.ElementMethod.setMouseEnable(this, 32780);
                this.set_mousedowndelay(100);
            } else {
                this.extData.draggable = null;
                if ((this._type_ & 16384) == 16384)
                    this._type_&=-16385;
                this.set_mousedowndelay(0);
            }
            return s;
        },
        get_cancelBubble: function() {
            return this.m_cancelBubble == true;
        },
        set_cancelBubble: function(b) {
            if (b)
                laya.element.method.ElementMethod.setMouseEnable(this, 12);
            return this.m_cancelBubble = b;
        },
        get_color: function() {
            return this.style.get_color();
        },
        set_color: function(s) {
            this.style.set_color(s);
            return s;
        },
        get_bgcolor: function() {
            return this.style.get_background();
        },
        set_bgcolor: function(s) {
            this.style.set_background(s);
            return "";
        },
        get_height_enablescale: function() {
            return Laya.Round(this.style.m_height * this.style.get_scaley());
        },
        get_height: function() {
            return this.style.m_height;
        },
        set_height: function(h) {
            this.style.set_height(h);
            return this.style.m_height;
        },
        set_heightex: function(h) {
            this.style.set_height(h);
        },
        get_width_enablescale: function() {
            return Laya.Round(this.style.m_width * this.style.get_scalex());
        },
        get_width: function() {
            return this.style.m_width;
        },
        set_width: function(w) {
            this.style.set_width(w);
            return this.style.m_width;
        },
        set_widthex: function(w) {
            this.style.set_width(w);
        },
        get_top: function() {
            return this.style.m_top;
        },
        set_top: function(y) {
            this.style.pos(this.style.m_left, y);
            return y;
        },
        set_topex: function(x) {
            this.style.set_top(x);
        },
        get_left: function() {
            return this.style.m_left;
        },
        set_left: function(x) {
            this.style.pos(x, this.style.m_top);
            return x;
        },
        set_leftex: function(x) {
            this.style.set_left(x);
        },
        set_rndpos: function(bx, by, lx, ly) {
            this.style.position("true");
            this.style.pos(Math.floor(bx + Math.random() * lx), Math.floor(by + Math.random() * ly));
        },
        get_flip: function() {
            return this.style.get_flip();
        },
        set_flip: function(d) {
            return this.style.set_flip(d);
        },
        get_scaley: function() {
            return this.style.get_scaley();
        },
        set_scaley: function(d) {
            this.style.scale(this.style.get_scalex(), d);
            return d;
        },
        get_scalex: function() {
            return this.style.get_scalex();
        },
        set_scalex: function(d) {
            this.style.scale(d, this.style.get_scaley());
            return d;
        },
        get_rotate: function() {
            return this.style.get_rotate();
        },
        set_rotate: function(d) {
            this.style.set_rotate(d);
            return d;
        },
        get_alpha: function() {
            return this.style.get_alpha();
        },
        set_alpha: function(d) {
            this.style.set_alpha(d);
            return d;
        },
        repaint: function() {
            if (this._repaintType_ != 0 || this.parentNode == null || this.deleted)
                return this;
            this._repaintType_ = 1;
            this._inTypesetLine_ != null && this._inTypesetLine_.repaint();
            if (this.typesetLines != null && (this._type_ & 536870912) == 536870912)
                laya.element.method.ElementMethod.typesetLinesRepaint(this.typesetLines);
            if ((this._type_ & 262144) == 262144)
                this.dispatchEvent(null, "onrepaint");
            this.parentNode.repaint();
            return this;
        },
        _review_: function(v) {
            var t = this._type_;
            if (v)
                this._type_|=65536;
            else 
                this._type_&=-65537;
            if (this._type_ != t) {
                if ((this._type_ & 4194304) == 4194304)
                    this.dispatchEvent(null, "onreview");
            }
            if ((this._type_ & 65792) == 65792&&!((this._type_ & 131072) == 131072))
                this._checkNeedTypeset_();
            var cs = this.childNodes;
            if (cs.length < 1)
                return;
            var i = 0, s = cs.length;
            while (i < s) {
                var o = this.childNodes[i];
                i++;
                if (o.deleted || o.style == null)
                    continue;
                o._review_(v && o.hidden == 0);
            }
        },
        scrollToUseEffect: function(tox, toy) {
            if (this.extData.scrollEffect != null) {
                this.extData.scrollEffect.scrollTo(tox, toy, this.timerCtrl.curtime);
                this.extData.scrollEffect.scrollEnd();
            }
        },
        scrollEffect: function() {
            return this.extData.create(this).getScrollEffect();
        },
        get_scrollHeight: function() {
            laya.element.method.ElementMethod.calculateSrollSize(this);
            return this.extData.scrollHeight;
        },
        set_scrollHeight: function(i) {
            laya.element.method.ElementMethod.calculateSrollSize(this);
            return this.extData.scrollHeight = i;
        },
        get_scrollWidth: function() {
            laya.element.method.ElementMethod.calculateSrollSize(this);
            return this.extData.scrollWidth;
        },
        set_scrollWidth: function(i) {
            laya.element.method.ElementMethod.calculateSrollSize(this);
            return this.extData.scrollWidth = i;
        },
        get_zdepth: function() {
            return this.extData.zdepth;
        },
        set_zdepth: function(d) {
            this.extData.create(this).zdepth = d;
            this.repaint();
            this.addMatter(8388608);
            return d;
        },
        scrolltoex: function(x, y) {
            var sw = this.get_scrollWidth() - this.get_width();
            if (x < 0)
                x = 0;
            if (x > sw)
                x = sw;
            var sh = this.get_scrollHeight() - this.get_height();
            if (y < 0)
                y = 0;
            if (y > sh)
                y = sh;
            this.scrollto(x, y);
        },
        set_scrollTop: function(d) {
            this.scrollto(this.extData.scrollLeft, d);
            return d;
        },
        get_scrollTop: function() {
            return this.extData.scrollTop;
        },
        set_scrollLeft: function(d) {
            this.scrollto(d, this.extData.scrollTop);
            return d;
        },
        get_scrollLeft: function() {
            if (this.extData == null)
                Laya["debugger"]();
            return this.extData.scrollLeft;
        },
        get_offsetHeight: function() {
            var data = this.style.data;
            return this.style.m_height + data.padding.height + data.border.height + data.margin.height;
        },
        get_offsetWidth: function() {
            var data = this.style.data;
            return this.style.m_width + data.padding.width + data.border.width + data.margin.width;
        },
        _get_clientTop: function() {
            var d = this.style.data;
            return this.style.m_top + this.style.m_marginTop + d.padding.top + d.border.top;
        },
        _get_clientLeft: function() {
            var d = this.style.data;
            return this.style.m_left + this.style.m_marginLeft + d.padding.left + d.border.left;
        },
        created: function() {
            if (!((this._type_ & 2097152) == 2097152)) {
                if (this.parentNode != null&&!((this.parentNode._type_ & 65536) == 65536)) {
                    if ((this._type_ & 65536) == 65536)
                        this._type_&=-65537;
                }
                this._type_|=2097152;
                this.onCreated();
                if (this.parentNode != null && ((this.style._type_ & 131072) == 131072 ? 1 : 0) == 0)
                    this.parentNode._type_|=128;
                this._checkNeedTypeset_();
            }
        },
        _checkNeedTypeset_: function() {
            if (!((this._type_ & 2097152) == 2097152) || this.style == null)
                return;
            if ((this.style._type_ & 16777216) == 16777216) {
                if ((this._type_ & 128) == 128&&!((this._type_ & 131072) == 131072)) {
                    if ((this._type_ & 65536) == 65536 && this.isView()) {
                        this._type_|=131328;
                        laya.xhtml.HtmlLayout._typesetList.push(this);
                    } else 
                        this._type_|=256;
                }
            }
            if (((this.style._type_ & 131072) == 131072 ? 1 : 0) == 0 && this.parentNode != null && this.parentNode.style != null && (this.parentNode._type_ & 128) == 128)
                this.parentNode._checkNeedTypeset_(true, false);
        },
        needTypeset: function() {
            this._checkNeedTypeset_();
        },
        set_showxor: function() {
            this.show(this.hidden != 0);
        },
        show: function(b) {
            if (b != null)
                this.style.set_visibility(b ? "visible" : "hidden");
            return this.hidden == 0;
        },
        _on_destroy_system_: function() {
            if (this._inTypesetLine_ != null)
                this._inTypesetLine_.delNode(this);
            if (this.extData != null)
                this.extData.destroy();
            if (this.typesetLines != null)
                laya.element.method.ElementMethod.typesetLinesClear(this.typesetLines);
        },
        getStyle: function() {
            return this.style;
        },
        _newStyle_: function() {
            return new laya.css.CSSStyleDeclaration(this, 16384);
        },
        set_mustmouse: function(b) {
            if (b)
                this._type_|=512;
            else if ((this._type_ & 512) == 512)
                this._type_&=-513;
        },
        parabola: function(ex, ey, angle, duration, timingFunction, call_back) {
            return this.runAction(true, new laya.element.action.ActiveParabola(ex, ey, angle), duration, timingFunction, call_back);
        },
        moveTo: function(ex, ey, duration, timingFunction, call_back) {
            return this.runAction(true, new laya.element.action.ActionMove(ex, ey), duration, timingFunction, call_back);
        },
        runAction: function(toOrBy, iaction, duration, timingFunction, call_back) {
            return laya.element.action.Action.run(this, toOrBy, iaction, duration, timingFunction, 0, 1, null, call_back);
        },
        border: function(width, style, color) {
            this.style.border(width, style, color);
            return null;
        },
        rect: function(x, y, w, h) {
            this.pos(x, y);
            this.size(w, h);
        },
        scale: function(x, y) {
            this.style.scale(x, y);
        },
        pos: function(x, y) {
            this.style.position("true");
            this.style.pos(x, y);
        },
        epos: function(x, y) {
            this.style.position("true");
            this.style.pos(x, y);
            if (Laya.document.editInfo != null) {
                var file = this.getCreateFile();
                if (file == null) {
                    console.log("setEditPos err,no this file:" + this.baseURL.url);
                    return;
                }
                if (file._private_.editposcount == null)
                    file._private_.editposcount = 0;
                this._private_.editposmarkinfile = file._private_.editposcount;
                file._private_.editposcount++;
                this._type_|=1073741824;
            }
        },
        centeronce: function() {
            var dx = (this.parentNode.get_width() - this.get_width()) / 2;
            var dy = (this.parentNode.get_height() - this.get_height()) / 2;
            this.pos(dx, dy);
        },
        size: function(w, h) {
            this.style.size(w, h);
        },
        scaleFullParent: function(type) {
            this.style.scaleFullParent(type);
        },
        updateDynamicAttr: function(type) {
            var _Dynamic_Attrs_ = this._private_._Dynamic_Attrs_;
            if (_Dynamic_Attrs_ == null)
                return false;
            var listener = _Dynamic_Attrs_.get(type);
            if (listener != null && listener.deleted == false) {
                listener.call_back.call(listener.owner, null, listener);
                return true;
            }
            return false;
        },
        onpaint: function(canvas) {
            return true;
        },
        clearDynamicAttr: function(type) {
            var _Dynamic_Attrs_ = this._private_._Dynamic_Attrs_;
            if (_Dynamic_Attrs_ == null)
                return false;
            var listener = _Dynamic_Attrs_.get(type);
            if (listener != null)
                listener.destroy();
            return false;
        },
        scrollToView: function(left, top, w, h) {
            var tox = this.get_scrollLeft();
            var toy = this.get_scrollTop();
            var x = left - tox;
            if (x < 0)
                tox = Laya.parseInt(left);
            else if (x + w >= this.get_width())
                tox = Laya.parseInt(left - this.get_width() + w);
            var y = Laya.parseInt(top - toy);
            if (y < 0)
                toy = Laya.parseInt(top);
            else if (y + h >= this.get_height())
                toy = Laya.parseInt(top - this.get_height() + h);
            this.scrollto(tox, toy);
        },
        scrollto: function(x, y) {
            if (this.extData.scrollLeft == x && this.extData.scrollTop == y)
                return;
            this.extData.create(this).scrollLeft = x;
            this.extData.scrollTop = y;
            this.parentNode.repaint();
            this.dispatchEvent(null, "onscroll");
            this.addMatter(8388608);
        },
        cssText: function(css) {
            this.style.cssText(css);
            return css;
        },
        cssall: function(name, value) {
            console.log("css all how much children" + this.childNodes.length);
            var _g1 = 0, _g = this.childNodes.length;
            while (_g1 < _g) {
                var i = _g1++;
                var c = this.childNodes[i];
                if (c.style != null)
                    c.style.css(name, value);
            }
        },
        css: function(name, value) {
            return this.style.css(name, value);
        },
        __class__: laya.element.Element
    });
    laya.element.Image = function() {
        laya.element.Element.call(this);
        this.style.set_block(false);
        this.style._type_|=16777216;
        true;
    };
    laya.element.Image.__name__ = true;
    laya.element.Image.__super__ = laya.element.Element;
    laya.element.Image.prototype = $extend(laya.element.Element.prototype, {
        _enableInsertTypesetLine_: function() {
            return true;
        },
        _onImgLoaded_: function(imgFile) {
            if (this.file != null && this.file != imgFile)
                return;
            if (this.parentNode == null || this.parentNode.deleted)
                return;
            this.set_complete(true);
            if (imgFile.width==-1) {
                this.onload();
                this.onerr();
                return;
            }
            this.addMatter(64);
            var _style_type_ = 0;
            _style_type_ = this.style._type_;
            var t = this._type_;
            if (!this.style._sizebeset_())
                this.size(imgFile.width, imgFile.height);
            else if (!((this.style._type_ & 32768) == 32768))
                this.set_width(imgFile.width);
            else if (!this.style._heightbeset_())
                this.set_height(imgFile.height);
            this._type_ = t;
            this.style._type_ = _style_type_;
            this.onload();
            this.parentNode.repaint();
        },
        created: function() {
            if (!((this._type_ & 2097152) == 2097152)) {
                laya.element.Element.prototype.created.call(this);
                if (this.m_src != null) {
                    var url = this.m_src;
                    this.m_src = null;
                    this.set_src(url);
                }
            }
        },
        onload: function() {},
        onerr: function() {},
        set_src: function(url) {
            if (!((this._type_ & 2097152) == 2097152) ||!((this._type_ & 65536) == 65536)) {
                this.m_src = url;
                return url;
            }
            if (url == null || url == "") {
                if ((this._matter_ & 64) == 64) {
                    this._matter_&=-65;
                    this._paintfn_ = laya.display.RenderHtml._paint_check;
                }
                if (this.m_src != null) {
                    this.m_src = null;
                    this.set_complete(true);
                    this.file = null;
                }
                return null;
            }
            url = this.formatUrl(url);
            if (this.m_src == url)
                return this.m_src;
            this.m_src = url;
            this.set_complete(false);
            this.startLoadFile();
            return this.m_src;
        },
        startLoadFile: function() {
            var _g = this;
            if ((this._type_ & 8192) == 8192)
                return;
            if ((this.file = laya.io.File._find_(this.get_src())) != null && this.file.isLoaded()) {
                var imgfile;
                imgfile = this.file;
                this._onImgLoaded_(imgfile);
                return;
            }
            this.file = laya.io.File._instance_(this.get_src(), "image", {
                onload: function(file) {
                    _g._onImgLoaded_(file);
                }
            });
        },
        _review_: function(v) {
            laya.element.Element.prototype._review_.call(this, v);
            if ((this._type_ & 65536) == 65536 && this.m_src != null && (this.file == null || this.file.getUrl() != this.m_src)) {
                var src = this.m_src;
                this.m_src = null;
                this.set_src(src);
            }
        },
        __class__: laya.element.Image
    });
    copter.ui = {}
    copter.ui.Avator = function() {
        this.beigintime = 0.0;
        laya.element.Image.call(this);
    };
    copter.ui.Avator.__name__ = true;
    copter.ui.Avator.__super__ = laya.element.Image;
    copter.ui.Avator.prototype = $extend(laya.element.Image.prototype, {
        update: function(tm, go) {
            var index = Laya.parseInt(go / 50);
            this.style.translate(Laya.parseInt(0.5 * this.get_width()), Laya.parseInt(0.5 * this.get_height()));
            var _g = this;
            switch (_g._state) {
            case-1:
                this.set_flip(10);
                break;
            case 1:
                this.set_flip(0);
                break;
            case-101:
                return false;
            }
            if (index%50 == 0 || index%50 == 1) {
                this.set_src("./images/sc_juese_biyan_0" + index%50 + ".png");
                return true;
            }
            this.set_src("./images/sc_juese_idle_0" + index%2 + ".png");
            if (this.get_rotate() < 0 && this._state!=-100) {
                this.style.translate(Laya.parseInt(0.5 * this.get_width()), 0);
                this.set_rotate(this.get_rotate() + 1);
            } else if (this.get_rotate() > 0 && this._state!=-100) {
                this.style.translate(Laya.parseInt(0.5 * this.get_width()), 0);
                this.set_rotate(this.get_rotate()-1);
            } else if (this._state==-100) {
                this.set_src("./images/sc_juese_siwang_01.png");
                this.set_rotate(this.get_rotate() + 40);
            }
            return true;
        },
        start: function() {
            this.show(true);
            this.set_left(this.parentNode._toElement_().get_width() / 2 - this.get_width() / 2);
            this._state = 0;
            this.set_flip(0);
            this.set_rotate(0);
            this.set_src("./images/sc_juese_idle_00.png");
        },
        onCreated: function() {
            laya.element.Image.prototype.onCreated.call(this);
            this.update(0, 0);
            copter.ui.Avator.__avator__ = this;
            this.style.translate(Laya.parseInt(0.5 * this.get_width()), 0);
        },
        __class__: copter.ui.Avator
    });
    laya.element.Div = function() {
        laya.element.Element.call(this);
        if (this.style != null)
            this.style.set_block(true);
    };
    laya.element.Div.__name__ = true;
    laya.element.Div.__super__ = laya.element.Element;
    laya.element.Div.prototype = $extend(laya.element.Element.prototype, {
        __class__: laya.element.Div
    });
    copter.ui.GameBody = function() {
        this.flag = 10;
        this._active_ = 0;
        laya.element.Div.call(this);
    };
    copter.ui.GameBody.__name__ = true;
    copter.ui.GameBody.__super__ = laya.element.Div;
    copter.ui.GameBody.prototype = $extend(laya.element.Div.prototype, {
        showPaiHane: function() {
            rank();
        },
        gameover: function() {
            if (this._active_ == copter.ui.GameBody.__ACTIVE_DEADING__) {
                this._active_ = copter.ui.GameBody.__ACTIVE_PRESTART__;
                copter.ui.Avator.__avator__.show(false);
                copter.ui.Avator.__avator__._state =- 101;
                copter.ui.Avator.__avator__.set_rotate(180);
                this.word.show(false);
                Laya.I("GAMEOVER")._toElement_().show(true);
                Laya.I("GAMELOG")._toElement_().show(false);
                Laya.I("STARTUI")._toElement_().show(true);
                Laya.I("PAHIHANG")._toElement_().show(false);
                Laya.I("battleui-score")._toElement_().set_text("" + copter.ui.GameBody.__gamerankings__._curCredits);
                Laya.I("battleui-best")._toElement_().set_text("" + copter.ui.GameBody.__gamerankings__._maxCredits);
                Laya.I("BATTLEUI")._toElement_().set_className("uishow");
                copter.ui.GameBody.scene.reset();
            }
        },
        willgameover: function() {
            var scoreInt = Laya.parseInt(this.word.get_text());
            if (scoreInt > 0) {
                dp_getGameResulte(-1, scoreInt, function(resulte) {
                    window.shareData.timeLineLink = resulte.url;
                    if (resulte.rank > 0 && resulte.rank <= 100)
                        window.shareData.Rankstr = ",在全球玩家排名第" + resulte.rank;
                    if (!resulte.concern) {
                        if (confirm("亲，这种神作你玩的这么棒，快来关注我们【多泡游戏】的公众号，一起来挑战更多微信的小游戏吧！^_^")) {
                            window.location.href = "http://mp.weixin.qq.com/s?__biz=MjM5NjQ4NTU0MA==&mid=202267473&idx=1&sn=ee8c007caafdf34f03d90c3e405ca50e#rd";
                        }
                    }
                }, 0);
                document.title = window.shareData.tTitle = "又虐心又过瘾的摇摆直升机，我已经" + scoreInt + "分了" + window.shareData.Rankstr + ",系统评价[小叮当]，你来试试？";
                if (confirm("你真牛逼,这么虐心又过瘾的游戏都赢了" + scoreInt + "分" + window.shareData.Rankstr + ",要不要炫耀给其它小伙伴们呢？")) {
                    share();
                }
            }
            copter.ui.Avator.__avator__._state =- 100;
            copter.ui.Avator.__avator__.set_rotate(1);
            this._active_ = copter.ui.GameBody.__ACTIVE_DEADING__;
            if (Laya.parseInt(this.word.get_text()) > copter.ui.GameBody.__gamerankings__._maxCredits)
                Laya.I("battleui-new")._toElement_().show(true);
            else 
                Laya.I("battleui-new")._toElement_().show(false);
            copter.ui.GameBody.__gamerankings__.setCredits(Laya.parseInt(this.word.get_text()));
            Laya.jwindow.TITLE = "又虐心又过瘾的摇摆直升机，我" + Laya.parseInt(this.word.get_text()) + "分了，你来试试？";
            this._starttime = this.timerCtrl.curtime;
        },
        _update: function(m) {
            if (this._active_ == copter.ui.GameBody.__ACTIVE_START__ && this._preupdateTime > 0 && laya.utils.Method.getCurTime() - this._preupdateTime > 200) {
                this.willgameover();
                this._preupdateTime = laya.utils.Method.getCurTime();
                return true;
            }
            this._preupdateTime = laya.utils.Method.getCurTime();
            m -= this._starttime;
            if (this._active_ == copter.ui.GameBody.__ACTIVE_START__ || this._active_ == copter.ui.GameBody.__ACTIVE_DEADING__)
                copter.ui.Avator.__avator__.update(m, m);
            var y = 0, index = 0;
            var _g = this;
            switch (_g._active_) {
            case copter.ui.GameBody.__ACTIVE_START__:
            case copter.ui.GameBody.__ACTIVE_PRESTART__:
                copter.ui.GameBody.scene.update(m, this._active_ == copter.ui.GameBody.__ACTIVE_START__);
                y = Laya.parseInt(copter.ui.GameBody.scene.offsetY);
                index = copter.ui.GameBody.scene.startIndex;
                break;
            case copter.ui.GameBody.__ACTIVE_DEADING__:
                if (m >= 1000) {
                    this.gameover();
                    y = 0;
                } else {
                    y = Laya.parseInt(copter.ui.GameBody.scene.offsetY * (1 - m / 1000));
                    if (y < 0)
                        y = 0;
                }
                index = copter.ui.GameBody.scene.yToIndex(y);
                break;
            }
            Laya.I("SCENEBK")._toElement_().set_scrollTop( - y);
            this.cloudimg._toElement_().set_scrollTop( - Laya.parseInt(0.5 * y)%this.get_height());
            copter.ui.Avator.__avator__.set_top(copter.game2.Scene.s_beginAvatorPos * copter.game2.Scene.__HEIGHT__);
            var _g2 = 0, _g1 = copter.game2.Scene.__NUMBER__;
            while (_g2 < _g1) {
                var i = _g2++;
                var temp = Laya.I(i + "")._toElement_();
                var obstacle = copter.ui.GameBody.scene.obstacle[index + i-1];
                if (obstacle == null || index + i < 2) {
                    temp.set_left(-10000);
                    continue;
                }
                obstacle.update(m);
                temp.pos(obstacle.left, - obstacle.top + copter.game2.Scene.__HEIGHT__);
                var r =- obstacle.curRotate * 180 / Math.PI;
                temp.getByGName("CHUIZI1")._toElement_().set_rotate(r);
                temp.getByGName("CHUIZI2")._toElement_().set_rotate(r);
            }
            if (this._active_ == copter.ui.GameBody.__ACTIVE_START__) {
                if (index > 0 && copter.ui.GameBody.scene.obstacle[copter.ui.GameBody.scene.startIndex].checkCollide(copter.ui.Avator.__avator__.get_left(), copter.game2.Scene.__HEIGHT__ - copter.ui.Avator.__avator__.get_top() + copter.ui.GameBody.scene.offsetY, copter.ui.Avator.__avator__.get_width(), copter.ui.Avator.__avator__.get_height())) {
                    this.willgameover();
                    return true;
                }
                if (copter.ui.GameBody.scene.startIndex > 1)
                    this.word.set_text((copter.ui.GameBody.scene.startIndex < 9 ? "0" : "") + (copter.ui.GameBody.scene.startIndex-1));
                if (copter.ui.Avator.__avator__._state != 0) {
                    var x = this._startmoveleft + (this.timerCtrl.curtime - this._startmovetm) * copter.ui.Avator.__avator__._state * copter.ui.GameBody.__MOVEX_SPEED;
                    if (x < 0)
                        x = 0;
                    if (x > copter.game2.Scene.__WIDTH__ - copter.ui.Avator.__avator__.get_width())
                        x = copter.game2.Scene.__WIDTH__ - copter.ui.Avator.__avator__.get_width();
                    copter.ui.Avator.__avator__.set_left(x);
                }
            }
            return true;
        },
        _onmousedown_: function(e) {
            if (this._active_ > copter.ui.GameBody.__ACTIVE_IN__ || this._active_ == copter.ui.GameBody.__ACTIVE_STARTWAIT__)
                return;
            if (this._active_ == copter.ui.GameBody.__ACTIVE_PRESTART__) {
                Laya.I("HELP1")._toElement_().set_className("help1hide");
                Laya.I("HELP2")._toElement_().set_className("help2show");
                this._active_ = copter.ui.GameBody.__ACTIVE_STARTWAIT__;
                return;
            }
            this._startmovetm = this.timerCtrl.curtime;
            this._startmoveleft = copter.ui.Avator.__avator__.get_left();
            if (copter.ui.Avator.__avator__._state!=-1) {
                copter.ui.Avator.__avator__._state =- 1;
                copter.ui.Avator.__avator__.set_rotate(-25);
            } else {
                copter.ui.Avator.__avator__._state = 1;
                copter.ui.Avator.__avator__.set_rotate(-25);
            }
        },
        start: function() {
            Laya.I("word").show(true);
            this._active_ = copter.ui.GameBody.__ACTIVE_START__;
            this._starttime = this.timerCtrl.curtime;
            copter.ui.Avator.__avator__._state = 0;
            copter.ui.Avator.__avator__.set_left(copter.game2.Scene.__WIDTH__ / 2 - copter.ui.Avator.__avator__.get_width() / 2);
            Laya.I("SCENEBK")._toElement_().set_scrollTop(0);
            this.cloudimg._toElement_().set_scrollTop(0);
            this.cloudimg._toElement_().pos(0, - this.get_height());
            this.word.set_text("00");
            this.word.show(true);
        },
        willStart: function() {
            Laya.I("STARTUI").show(false);
            Laya.I("READY").show(true);
            this.set_bgcolor(copter.ui.GameBody.__bgcolors__[laya.utils.Method.random(0, 4)]);
            Laya.I("HELP1")._toElement_().show(true);
            Laya.I("HELP1")._toElement_().css("margin-top", "0");
            Laya.I("HELP2")._toElement_().show(false);
            copter.ui.GameBody.scene.reset();
            this._starttime = this.timerCtrl.curtime;
            copter.ui.Avator.__avator__.start();
        },
        onCreated: function() {
            this.cloudimg = Laya.I("cloud")._toElement_();
            this.hande = Laya.I("hande")._toElement_();
            this.word = Laya.I("word")._toElement_();
            this.set_onupdate($bind(this, this._update));
            this._active_ = copter.ui.GameBody.__ACTIVE_PRESTART__;
            this._starttime = this.timerCtrl.curtime;
            this._update(this._starttime);
            this.houseoffset = copter.game2.Scene.__HEIGHT__ - this.hande.get_height() - Laya.I("0").style.m_top;
            this.regEventCode("onmousedown", $bind(this, this._onmousedown_));
            copter.ui.GameBody.__gamerankings__ = new gamemethod.GameRankings();
            copter.ui.GameBody._username = "343C0535-B0CC-F009-5F42-DCD897C9C0C7";
            laya.utils.Method.setCookie("USERNAME", copter.ui.GameBody._username, 999999999);
            copter.ui.GameBody._curRankings = 0;
            copter.ui.GameBody._maxRankings = 0;
            copter.ui.GameBody._maxCredits = 0;
            copter.ui.GameBody._gameid = "1";
            this._preupdateTime = 0;
        },
        __class__: copter.ui.GameBody
    });
    var gamemethod = {}
    gamemethod.GameRankings = function() {
        this._willAskRankings = true;
        this._maxCredits = 0;
        this._curCredits = 0;
        this._curRankings = 0;
        this._maxRankings = 0;
        this.__ajaxurl__ = "http://rank.fly.laya8.com/";
    };
    gamemethod.GameRankings.__name__ = true;
    gamemethod.GameRankings.prototype = {
        enable: function() {
            var _g = this;
            this._username = laya.utils.Method.getCookie("USERNAME");
            if (this._username == "" || this._username == "undefined") {
                laya.io.Ajax.GetJSON(this.__ajaxurl__ + "getguid.php", function(data) {
                    _g._username = data.result;
                    laya.utils.Method.setCookie("USERNAME", _g._username, 999999999);
                    _g.getRankings(null);
                }, "?");
                return;
            }
            this.getRankings(null);
        },
        setCredits: function(d) {
            this._willAskRankings = true;
            this._curCredits = d;
            this._maxCredits = Math.max(this._maxCredits, this._curCredits);
            var url = this.__ajaxurl__ + "setrank.php?username=" + this._username + "&jifen=" + this._curCredits + "&gameid=" + this._gameid + "&timetmp=" + laya.utils.Method.getCurTime() + "&token=2323";
            laya.io.Ajax.GetJSON(url, function(data) {});
        },
        getRankings: function(_callback) {
            var _g = this;
            if (_callback == null)
                _callback = function() {};
            if (this._willAskRankings) {
                laya.io.Ajax.GetJSON(this.__ajaxurl__ + "getrank.php?username=" + this._username + "&gameid=" + this._gameid + "&rand=" + laya.utils.Method.getCurTime(), function(data) {
                    _g._curRankings = data.NowRankNo;
                    _g._maxRankings = data.RankNo;
                    _g._maxCredits = data.MaxJifen;
                    _callback.call(null, _g._maxRankings, _g._curRankings, _g._maxCredits);
                });
                return;
            }
            _callback.call(null, this._maxRankings, this._curRankings, this._maxCredits);
        },
        setGameId: function(id) {
            this._gameid = id;
        },
        __class__: gamemethod.GameRankings
    }
    var haxe = {}
    haxe.ds = {}
    haxe.ds.IntMap = function() {
        this.h = {};
    };
    haxe.ds.IntMap.__name__ = true;
    haxe.ds.IntMap.__interfaces__ = [IMap];
    haxe.ds.IntMap.prototype = {
        get: function(key) {
            return this.h[key];
        },
        set: function(key, value) {
            this.h[key] = value;
        },
        __class__: haxe.ds.IntMap
    }
    haxe.unit = {}
    haxe.unit.TestCase = function() {};
    haxe.unit.TestCase.__name__ = true;
    haxe.unit.TestCase.prototype = {
        assertEquals: function(expected, actual, c) {
            this.currentTest.done = true;
            if (actual != expected) {
                this.currentTest.success = false;
                this.currentTest.error = "expected '" + Std.string(expected) + "' but was '" + Std.string(actual) + "'";
                this.currentTest.posInfos = c;
                throw this.currentTest;
            }
        },
        assertFalse: function(b, c) {
            this.currentTest.done = true;
            if (b == true) {
                this.currentTest.success = false;
                this.currentTest.error = "expected false but was true";
                this.currentTest.posInfos = c;
                throw this.currentTest;
            }
        },
        assertTrue: function(b, c) {
            this.currentTest.done = true;
            if (b == false) {
                this.currentTest.success = false;
                this.currentTest.error = "expected true but was false";
                this.currentTest.posInfos = c;
                throw this.currentTest;
            }
        },
        print: function(v) {
            haxe.unit.TestRunner.print(v);
        },
        tearDown: function() {},
        setup: function() {},
        __class__: haxe.unit.TestCase
    }
    haxe.unit.TestRunner = function() {}
    haxe.unit.TestRunner.__name__ = true;
    haxe.unit.TestRunner.print = function(v) {
        var msg = StringTools.htmlEscape(js.Boot.__string_rec(v, "")).split("\n").join("<br/>");
        var d = document.getElementById("haxe:trace");
        if (d == null)
            alert("haxe:trace element not found");
        else 
            d.innerHTML += msg;
    }
    haxe.unit.TestStatus = function() {}
    haxe.unit.TestStatus.__name__ = true;
    haxe.unit.TestStatus.prototype = {
        __class__: haxe.unit.TestStatus
    }
    var js = {}
    js.Boot = function() {}
    js.Boot.__name__ = true;
    js.Boot.__string_rec = function(o, s) {
        if (o == null)
            return "null";
        if (s.length >= 5)
            return "<...>";
        var t = typeof(o);
        if (t == "function" && (o.__name__ || o.__ename__))
            t = "object";
        switch (t) {
        case"object":
            if (o instanceof Array) {
                if (o.__enum__) {
                    if (o.length == 2)
                        return o[0];
                    var str = o[0] + "(";
                    s += "\t";
                    var _g1 = 2, _g = o.length;
                    while (_g1 < _g) {
                        var i = _g1++;
                        if (i != 2)
                            str += "," + js.Boot.__string_rec(o[i], s);
                        else 
                            str += js.Boot.__string_rec(o[i], s);
                    }
                    return str + ")";
                }
                var l = o.length;
                var i;
                var str = "[";
                s += "\t";
                var _g = 0;
                while (_g < l) {
                    var i1 = _g++;
                    str += (i1 > 0 ? "," : "") + js.Boot.__string_rec(o[i1], s);
                }
                str += "]";
                return str;
            }
            var tostr;
            try {
                tostr = o.toString;
            } catch (e) {
                return "???";
            }
            if (tostr != null && tostr != Object.toString) {
                var s2 = o.toString();
                if (s2 != "[object Object]")
                    return s2;
            }
            var k = null;
            var str = "{\n";
            s += "\t";
            var hasp = o.hasOwnProperty != null;
            for (var k in o) {
                ;
                if (hasp&&!o.hasOwnProperty(k)) {
                    continue;
                }
                if (k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
                    continue;
                }
                if (str.length != 2)
                    str += ", \n";
                str += s + k + " : " + js.Boot.__string_rec(o[k], s);
            }
            s = s.substring(1);
            str += "\n" + s + "}";
            return str;
        case"function":
            return "<function>";
        case"string":
            return o;
        default:
            return String(o);
        }
    }
    js.Boot.__interfLoop = function(cc, cl) {
        if (cc == null)
            return false;
        if (cc == cl)
            return true;
        var intf = cc.__interfaces__;
        if (intf != null) {
            var _g1 = 0, _g = intf.length;
            while (_g1 < _g) {
                var i = _g1++;
                var i1 = intf[i];
                if (i1 == cl || js.Boot.__interfLoop(i1, cl))
                    return true;
            }
        }
        return js.Boot.__interfLoop(cc.__super__, cl);
    }
    js.Boot.__instanceof = function(o, cl) {
        if (cl == null)
            return false;
        switch (cl) {
        case Int:
            return (o | 0) === o;
        case Float:
            return typeof(o) == "number";
        case Bool:
            return typeof(o) == "boolean";
        case String:
            return typeof(o) == "string";
        case Dynamic:
            return true;
        default:
            if (o != null) {
                if (typeof(cl) == "function") {
                    if (o instanceof cl) {
                        if (cl == Array)
                            return o.__enum__ == null;
                        return true;
                    }
                    if (js.Boot.__interfLoop(o.__class__, cl))
                        return true;
                }
            } else 
                return false;
            if (cl == Class && o.__name__ != null)
                return true;
            if (cl == Enum && o.__ename__ != null)
                return true;
            return o.__enum__ == cl;
        }
    }
    laya.Document = function() {
        this._waiticonEnableView_ = true;
        this.css = "" + "@keyframes rotate360_keyfm{" + "\t0%{rotate:0;}" + "\t100%{rotate:360;}" + "\t}" + "@keyframes leftgo{" + "\t0%{left:0;top:0}" + "\t100%{left:100;top:100}" + "\t}" + "@keyframes key_fade_in{" + "\t0%{alpha:0.1}" + "\t100%{alpha:1}" + "}" + "@keyframes key_fade_out{" + "\t0%{alpha:1;}" + "\t100%{alpha:0;}" + "}" + ".waiticon{" + "\twidth:16;height:16;left:center;top:center;z-index:999999;background:green;position:true;" + "\tanimation:rotate360_keyfm 500 linear 0 infinite;" + "}" + ".rotate360{" + "\tanimation:rotate360_keyfm 500 linear 0 infinite;" + "}" + ".sysPageListButton{width:10;height:10;background:#BBBBBB}" + ".sysPageListButtonHot{width:10;height:10;background:#552222}" + "";
        this.height = 768;
        this.width = 1024;
        this.cursor = "default";
        this._waitIconTimer_ = null;
        this._waitIcon_ = "";
        this.enableJsHtml = false;
        this.dragingElement = null;
        this.activeInputElement = null;
        this.activeElement = null;
        this.editing = false;
        this.URL = "";
        this.head = null;
        this.body = null;
        Laya.document = this;
        laya.element.Node.call(this);
        this.hidden = 0;
        this._private_.asyncAppendHTML = "";
        this.all = new laya.utils.StringMap();
        this.set_id("document");
        this.scripts = new laya.utils.StringMap();
        this.styleSheets = new laya.utils.StringMap();
        this.dragInformation = new laya.event.DragInformation();
        this.textMap = new laya.utils.StringMap();
    };
    laya.Document.__name__ = true;
    laya.Document.GetNodeRegClass = function(nodeName) {
        return laya.Document._element_map_.get(nodeName);
    }
    laya.Document.regNodeClass = function(name, _class_, _iclass_) {}
    laya.Document.__super__ = laya.element.Node;
    laya.Document.prototype = $extend(laya.element.Node.prototype, {
        imgtofont: function(fontName, imgsrc, imgWidth, imgHeight, colCount, rowCount, text) {
            console.log("imgtofont:" + text);
            var arr = text.split("");
            var textWidth = Laya.Round(imgWidth / colCount);
            var textHeight = Laya.Round(imgHeight / rowCount);
            var _g1 = 0, _g = arr.length;
            while (_g1 < _g) {
                var i = _g1++;
                var o = this.appendChild("file");
                o.set_type("image");
                o.set_src("font://" + fontName + "(" + arr[i] + ")");
                o.set_with(imgsrc);
                o.set_withdata("left:" + i%colCount * textWidth + ",top:" + Laya.parseInt(i / colCount) * textHeight + ",width:" + textWidth + ",height:" + textHeight);
                o.created();
            }
            var o = this.appendChild("link");
            o.set_type("image");
            o.set_href(imgsrc);
            o.created();
        },
        onKey: function(event) {
            if (this.editing) {
                this.editInfo.acceptKeyEvent(event);
                return false;
            }
            if (event.keyCode == 9 && this.activeInputElement != null && event.type != 2)
                this.nextFocus(this.activeInputElement);
            return true;
        },
        onMouse: function(event) {
            if (this.editing) {
                this.editInfo.acceptMouseEvent(event);
                return false;
            }
            return true;
        },
        toHtmlUrl: function(url) {
            if (!this.enableJsHtml && url.indexOf(".html.js") > 0)
                return url.substring(0, url.length-3);
            return url;
        },
        removeWaitAll: function(name) {
            this._waitIcon_ = laya.utils.Method.stringNReplace(this._waitIcon_, name + "\n", "", 999999999);
            if (this._waitIcon_ != "")
                return;
            if (this._waitIconTimer_ != null) {
                this._waitIconTimer_.deleted = true;
                this._waitIconTimer_ = null;
            }
            var o = this.getElementById("waiticon");
            if (o != null) {
                o._private_._waiticon_show_ = false;
                o._toElement_().show(false);
            }
        },
        removeWait: function(name) {
            this._waitIcon_ = laya.utils.Method.stringReplace(this._waitIcon_, name + "\n", "");
            if (this._waitIcon_ != "")
                return;
            if (this._waitIconTimer_ != null) {
                this._waitIconTimer_.deleted = true;
                this._waitIconTimer_ = null;
            }
            var o = this.getElementById("waiticon");
            if (o != null) {
                o._private_._waiticon_show_ = false;
                o._toElement_().show(false);
            }
        },
        addWait: function(name) {
            var _g = this;
            this._waitIcon_ += name + "\n";
            var o = this.getElementById("waiticon");
            if (o == null || this._waitIconTimer_ != null || o._toElement_().show())
                return;
            this._waitIconTimer_ = Laya.window.addExternalTimer(this, function() {
                _g._waitIconTimer_ = null;
                if (_g._waitIcon_ != "") {
                    o._private_._waiticon_show_ = true;
                    if (_g._waiticonEnableView_)
                        o._toElement_().show(true);
                }
                return false;
            }, 500, 1);
        },
        showWaitIcon: function(b) {
            this._waiticonEnableView_ = b;
            if (this._waiticonEnableView_ && this.getElementById("waiticon") != null && this.getElementById("waiticon")._private_._waiticon_show_)
                this.getElementById("waiticon")._toElement_().show(true);
        },
        nextFocus: function(curNode) {
            if (curNode == null)
                return;
            var r = curNode.get_group().getElementsByNodeName(curNode.nodeName);
            if (r == null)
                return;
            var curNodeIndex =- 1, input;
            var _g1 = 0, _g = r.length * 2;
            while (_g1 < _g) {
                var i = _g1++;
                input = r[i%r.length];
                if (input.hidden != 0)
                    continue;
                if (input == curNode) {
                    curNodeIndex = i;
                    continue;
                }
                if (curNodeIndex > 0) {
                    input.set_focus(true);
                    break;
                }
            }
        },
        onkeyup: function(event) {
            return false;
        },
        onkeydown: function(event) {
            return false;
        },
        getElementById: function(id) {
            return this.all.get(id);
        },
        clear: function() {},
        title: function(txt) {
            Laya.window.title(txt);
        },
        _regElementDefaultClassName_: function(name, fn) {
            var o = laya.Document._element_map_.get(name);
            if (o != null) {
                if (o.__preclone__ == null)
                    o.__preclone__ = o.__clone__;
                o.__clone__ = function() {
                    var n = o.__preclone__();
                    fn.call(n.style);
                    return n;
                };
            } else 
                laya.Document._element_defaultclass_map_.set(name.toLowerCase(), fn);
        },
        createElement: function(nodeName) {
            var o = this._newElement_(nodeName);
            o.nodeName = nodeName;
            return o;
            return null;
        },
        render: function() {
            if (this.hidden != 0)
                return false;
            if (!Laya.document.editing && this.body._repaintType_ == 0 && Laya.window.updatecount%100000 != 0)
                return false;
            laya.display.RenderHtml._RENDERCOUNT_ = 0;
            this.body.repaint();
            this.body.htmlRender.repaint(this.body);
            this.body._repaintType_ = 0;
            return true;
        },
        _newElement_: function(nodeName) {
            return null;
        },
        setTextId: function(id, txt) {
            this.textMap.set(id, txt);
        },
        show: function(b) {
            this.hidden = b ? 0 : -1;
            if (this.body != null && this.body.canvas.canvas.style != null)
                this.body.canvas.canvas.style.display = this.hidden != 0 ? "none" : "";
        },
        enable: function() {
            this.iframe = [];
            this.body = this.createElement("body");
            this.head = this.createElement("head");
            this.body.canvas.enableTimeoutRelease(true);
            if (this.body.canvas.canvas.style != null) {
                this.body.canvas.canvas.id = "LAYABROWSER";
                this.body.canvas.canvas.style.cssText = "position:absolute;left:0px;top:0px;width:100%;height:100%;background2:green";
                if (!Laya._ISAPP_)
                    Laya.window._webWindow_ = this.body.canvas.canvas;
            }
            this.body.created();
            this.head.created();
            this.head.baseURL = this.body.baseURL = new laya.utils.URLEX(Laya.location.href);
            laya.css.CSSMethod.styleNodeToScript(this, this.css, this.baseURL != null ? this.baseURL.path : null);
            var c = this.dragInformation.cloneCanvas = this.body.appendChild("canvas");
            c.rect(200, 0, 200, 200);
            c.cssText("z-index:99999;");
            c.show(false);
            this.all.set("drag-canvas", c);
            this.show(this.hidden == 0);
        },
        __class__: laya.Document
    });
    laya.Location = function() {
        this.defaultHtml = "default.html";
        this.rootPath = "";
        this.fullpath = "";
    };
    laya.Location.__name__ = true;
    laya.Location.prototype = {
        enable: function() {
            var wnd = Laya.jwindow;
            var loc = wnd.location;
            this.href = "" + Std.string(loc.href);
            this.href = this.href.toLowerCase();
            if (this.href.indexOf("url=") > 0) {
                var pos = this.href.indexOf("?url=");
                this.defaultHtml = this.href.substring(pos + 5, this.href.length);
                this.href = this.href.substring(0, pos);
            }
            if (loc.href.substring(1, 2) == ":/")
                this.rootPath = Std.string(loc.href.charAt(0)) + ":/";
            else 
                this.rootPath = Std.string(loc.protocol) + "//" + Std.string(loc.host);
            this.fullpath = laya.utils.Method.getPath(this.href);
            console.log("loction:" + this.href + "," + this.defaultHtml);
        },
        __class__: laya.Location
    }
    laya.ClipboardData = function() {
        this.type = "text";
    };
    laya.ClipboardData.__name__ = true;
    laya.ClipboardData.prototype = {
        getData: function(type) {
            return this.data;
        },
        clearData: function(type) {
            this.data = null;
        },
        setData: function(type, d) {
            this.data = d;
        },
        __class__: laya.ClipboardData
    }
    laya.Window = function() {
        this._statisticsTime = 0;
        this._preStatisticsTime = 0;
        this._looping_ = false;
        this.m_focus = true;
        this.preSlowUpdateTm = 0;
        this.preTime = 0;
        this._strDebugMsg_ = "";
        this.fps = 0;
        this.framerate = 60;
        this.updatecount = 0;
        this.updateTime = 0;
        this.layaTime = 0;
        this.top = 0;
        this.left = 0;
        this.mouseY = 0;
        this.mouseX = 0;
        this.height = 600;
        this.width = 800;
        this.event = null;
        this.editInfo = new laya.edit.EditInfo();
        this.clipboardData = new laya.ClipboardData();
        this.scale = new laya.utils.Point(1, 1);
    };
    laya.Window.__name__ = true;
    laya.Window.prototype = {
        addExternalTimer: function(obj, fn, delay, count) {
            if (count == null)
                count = 999999999;
            if (delay == null)
                delay = 1;
            return laya.utils.LayaTimer._system_timer_.add(obj, fn, delay, count == null ? 1 : count);
        },
        loop: function() {
            if (this._looping_ || this.delay == null)
                return;
            this._looping_ = true;
            var ntm = this.updateTime = Laya.CurTime = laya.utils.Method.getCurTime();
            var d = Math.round(ntm - this.preTime);
            this.preTime = ntm;
            this.delay[0] = d;
            var framerate_delay = Math.round(1000 / this.framerate);
            this.updatedelayall -= this.updatedelay[this.updatecount%this.updatedelay.length];
            this.updatedelayall += d;
            this.updatedelay[this.updatecount%this.updatedelay.length] = d;
            this.layaTime += d;
            laya.device.Screen.check();
            if (this.width != laya.device.Screen.width || this.height != laya.device.Screen.height) {
                this.width = laya.device.Screen.width;
                this.height = laya.device.Screen.height;
                var p = this.onresize(this.width, this.height);
                if (p != null) {
                    this.width = Laya.Round(p.x);
                    this.height = Laya.Round(p.y);
                }
                Laya.document.body.size(this.width, this.height);
            }
            laya.event.EventMgr.dispatchSystemEvent();
            laya.xhtml.HtmlLayout._startTypeset_();
            if (!Laya.document.editing)
                laya.utils.LayaTimer._system_timer_.run(d);
            laya.xhtml.HtmlLayout._startTypeset_();
            this.delay[0] = d;
            this.delay[1] = Math.floor(laya.utils.Method.getCurTime() - ntm) * 5;
            ntm = laya.utils.Method.getCurTime();
            if (this.updatecount < 2)
                Laya.document.body.repaint();
            laya.event.EventMgr.dispatchSystemEvent();
            this.render();
            this.delay[2] = Math.floor(laya.utils.Method.getCurTime() - ntm);
            this.updatecount++;
            if (this.updateTime - this.preSlowUpdateTm > 1000) {
                this.preSlowUpdateTm = this.updateTime;
                laya.element.method.ElementMethod._tidy_();
                laya.display.Canvas.Updata();
            }
            laya.io.FileFactory.__update__();
            this.delay[2] = Math.floor(this._statisticsTime * 5) + 50;
            this._statisticsTime = 0;
            if (Laya.debug.window != null && Laya.debug.window.update != null)
                Laya.debug.window.update();
            if (!Laya._ISAPP_ && Laya.document.activeInputElement == null)
                Laya.jwindow.scrollTo(0, 0);
            laya.element.Input._updatePos();
            this._looping_ = false;
        },
        statisticsEnd: function() {
            this._statisticsTime += laya.utils.Method.getCurTime() - this._preStatisticsTime;
        },
        statisticsBegin: function() {
            this._preStatisticsTime = laya.utils.Method.getCurTime();
        },
        _runloop_: function() {
            this.loop();
            Laya.jwindow.requestAnimFrame(function() {
                Laya.window._runloop_();
            });
        },
        addTimer: function(fn, delay, count) {
            return laya.utils.LayaTimer._system_timer_.add(this, fn, delay, count == null ? 1 : count);
        },
        onresize: function(w, h) {
            return null;
        },
        info: function(txt) {
            this.editInfo.text = txt;
            Laya.document.body.repaint();
        },
        render: function() {
            if (this.updatecount%6 == 0) {
                if (Laya._ISAPP_) {
                    this.fps = Laya.parseInt(1000 / (this.delay[0]-3));
                    if (this.fps < 0 || this.fps > 60)
                        this.fps = 60;
                } else 
                    this.fps = Laya.parseInt(1000 / this.delay[0] * 10) / 10;
            }
            if (!Laya.document.render())
                return;
            if (Laya.setup.showinfo) {
                var canvas = Laya.document.body.get_canvas();
                canvas._fontTxt_ = null;
                if (Laya._ISHTML5_) {
                    var ctx = canvas.context;
                    ctx.set_font("normal 100 14px Arial");
                    ctx.set_fillStyle("#FF0000");
                    this._strDebugMsg_ = "FPS:" + this.fps + " mouse:" + this.mouseX + "/" + this.mouseY + "/" + laya.event.MouseEvent.TOUCHINGCOUNT + (this.editInfo.text != null ? "  edit:" + this.editInfo.text : "" + " D:" + laya.display.RenderHtml._RENDERCOUNT_);
                    ctx.fillText(this._strDebugMsg_, 10, 18);
                } else {
                    var ctx = canvas.context;
                    ctx.setFontID("normal 100 14px Arial", -1);
                    ctx.set_fillStyle("#FF0000");
                    this._strDebugMsg_ = "FPS:" + this.fps + " mouse:" + this.mouseX + "/" + this.mouseY + "/" + laya.event.MouseEvent.TOUCHINGCOUNT + (this.editInfo.text != null ? "  edit:" + this.editInfo.text : "" + " D:" + laya.display.RenderHtml._RENDERCOUNT_);
                    var _g1 = 0, _g = this._strDebugMsg_.length;
                    while (_g1 < _g) {
                        var i = _g1++;
                        ctx.fillText(this._strDebugMsg_.charAt(i), 10 + 10 * i, 18);
                    }
                }
            }
        },
        set: function(fnName, data) {
            return laya.utils.Method.set(this, fnName, data);
        },
        title: function(s) {
            Laya.jdocument.title = s;
        },
        resizeTo: function(w, h) {
            if (this.width == w && this.height == h)
                return;
            this.width = w;
            this.height = h;
            var p = this.onresize(this.width, this.height);
            if (p != null) {
                this.width = Laya.Round(p.x);
                this.height = Laya.Round(p.y);
            }
            laya.device.Screen.size(this.width, this.height);
            if (Laya.document.body != null)
                Laya.document.body.size(this.width, this.height);
        },
        moveto: function(x, y) {
            if (this.left == x && this.top == y)
                return;
            this.left = x;
            this.top = y;
            if (!Laya._ISAPP_) {
                this._webWindow_.style.left = this.left + "px";
                this._webWindow_.style.top = this.top + "px";
            } else 
                Laya.conch.setViewPortPos(this.left, this.top);
        },
        setScale: function(x, y) {
            this.scale.x = x;
            this.scale.y = y;
        },
        get_focus: function() {
            return this.m_focus;
        },
        set_focus: function(d) {
            if (this.m_focus == d)
                return this.m_focus;
            this.m_focus = d;
            if (this.m_focus)
                Laya.document.body.repaint();
            return this.m_focus;
        },
        start: function() {
            this.updatedelay = [];
            var framerate_delay = Math.round(1000 / this.framerate);
            var _g = 0;
            while (_g < 60) {
                var i = _g++;
                this.updatedelay[i] = framerate_delay;
            }
            this.updatedelayall = this.updatedelay.length * framerate_delay;
            this.delay = [];
            this.preTime = this.layaTime = laya.utils.Method.getCurTime();
            if (Laya._ISHTML5_)
                Laya.jwindow.setInterval($bind(this, this.loop), 17.5);
            if (this.onload != null) {
                this.onload.call();
                console.log("window start");
            }
        },
        __class__: laya.Window
    }
    laya.css = {}
    laya.css.CSSBackColor = function(style) {
        this.style = style;
    };
    laya.css.CSSBackColor.__name__ = true;
    laya.css.CSSBackColor.prototype = {
        create: function(css) {
            if (this.style == css)
                return this;
            return css.data.create(css).bgcolor = new laya.css.CSSBackColor(css);
        },
        set: function(c) {
            this.set_color(c);
        },
        set_color: function(c) {
            if (c == null) {
                this.style.node.removeMatter(2);
                this.color = null;
                return;
            }
            this.color = new laya.css.RGBA(c);
            this.style.node.addMatter(2);
            this.style.node.repaint();
        },
        __class__: laya.css.CSSBackColor
    }
    laya.css.CSSBgImg = function(style) {
        this.complete = false;
        this.style = style;
        if (style != null)
            style.node.addMatter(8);
    };
    laya.css.CSSBgImg.__name__ = true;
    laya.css.CSSBgImg.prototype = {
        setBackgroundPosition: function(x, y) {
            this.style.node.addMatter(16);
            var tx = 0, ix = 0;
            if (x != null)
                switch (x) {
                case"left":
                    tx =- 10000000;
                    break;
                case"center":
                    tx =- 10000001;
                    break;
                case"right":
                    tx =- 10000002;
                    break;
                default:
                    ix = Laya.parseInt(x);
                }
            var ty = 0, iy = 0;
            if (y != null)
                switch (y) {
                case"top":
                    ty =- 10000004;
                    break;
                case"center":
                    ty =- 10000005;
                    break;
                case"bottom":
                    ty =- 10000006;
                    break;
                default:
                    iy = Laya.parseInt(y);
                }
            this.position = {
                type: tx * ty,
                tx: tx,
                left: ix,
                ty: ty,
                top: iy
            };
        },
        getPosition: function() {
            if (this.position == null)
                return laya.css.CSSBgImg.__DEFAULTPOSTION_;
            if (this.position.type == 0)
                return this.position;
            var _g = this;
            switch (_g.position.tx) {
            case-10000000:
                this.position.left = 0;
                break;
            case-10000001:
                this.position.left = Laya.parseInt((this.style.m_width - this.imgFile.width) / 2);
                break;
            case-10000002:
                this.position.left = this.style.m_width - this.imgFile.width;
                break;
            }
            var _g1 = this;
            switch (_g1.position.ty) {
            case-10000004:
                this.position.top = 0;
                break;
            case-10000005:
                this.position.top = Laya.parseInt((this.style.m_height - this.imgFile.height) / 2);
                break;
            case-10000006:
                this.position.top = this.style.node.m_height - this.imgFile.height;
                break;
            }
            return this.position;
        },
        _onImgLoaded_: function(imgFile) {
            if (this.imgFile != imgFile)
                return;
            this.complete = true;
        },
        set: function(txt) {
            if (txt == "none" || txt == null || txt == "") {
                this.style.node.removeMatter(4);
                this.imgFile = null;
                return;
            }
            this.style.node.addMatter(4);
            var ds = txt.split(" ");
            this.setBackgroundRepeat(ds[1]);
            if (ds[2] != null)
                this.setBackgroundPosition(ds[2], ds[3] != null ? ds[3] : ds[2]);
            var url = ds[0];
            url = laya.io.File._formatUrl_(laya.utils.Method.subString(ds[0], "url(", ")", ds[0]), this.style.node.get_basePath());
            this.complete = false;
            var img = this;
            this.imgFile = laya.io.File._instance_(url, "image", {
                onload: function(file) {
                    if (img.style != null) {
                        img._onImgLoaded_(file);
                        img.style.node.repaint();
                    }
                }
            });
        },
        setBackgroundRepeat: function(d) {
            if (d == null)
                return;
            var _repeat = d.split(" ")[0];
            if (_repeat == "none")
                _repeat = null;
            if (_repeat != this.repeat) {
                this.repeat = _repeat;
                if (this.repeat != null)
                    this.style.node.addMatter(8);
                else 
                    this.style.node.removeMatter(8);
            }
        },
        create: function(css) {
            if (this.style == css)
                return this;
            return css.data.create(css).bgImg = new laya.css.CSSBgImg(css);
        },
        __class__: laya.css.CSSBgImg
    }
    laya.css.CSSBoxShadow = function() {};
    laya.css.CSSBoxShadow.__name__ = true;
    laya.css.CSSBoxShadow.prototype = {
        __class__: laya.css.CSSBoxShadow
    }
    laya.css.CSSBorder = function(style) {
        this.style = 0;
        this.simpleBorder = true;
        this.height = 0;
        this.width = 0;
        this.bottom = 0;
        this.right = 0;
        this.top = 0;
        this.left = 0;
        this.cssStyle = style;
    };
    laya.css.CSSBorder.__name__ = true;
    laya.css.CSSBorder.prototype = {
        create: function(css) {
            if (this.cssStyle == css)
                return this;
            return css.data.create(css).border = new laya.css.CSSBorder(css);
        },
        set: function(width, style, color) {
            if (width == "0" || width == "none") {
                this.cssStyle.node.removeMatter(131072);
                this.cssStyle.node.repaint();
                return;
            }
            this.cssStyle.node.addMatter(131072);
            if (style == null && color == null) {
                color = width;
                width = "1";
                style = "solid";
            }
            this.left = this.top = this.right = this.bottom = Laya.parseInt(width);
            this.simpleBorder = true;
            this.width = this.left + this.right;
            this.height = this.top + this.bottom;
            this.style = 1;
            this.color = color == "none" || color == null || color == "" ? null : new laya.css.RGBA(color);
        },
        set_radius: function(top_left, top_right, bottom_left, bottom_right) {
            this.radius = [];
            this.radius.push(top_left);
            if (top_right != null)
                this.radius.push(top_right);
            if (bottom_left != null)
                this.radius.push(bottom_left);
            if (bottom_right != null)
                this.radius.push(bottom_right);
        },
        set_box_shadow: function(xoffset, yoffset, blurradius, spreadradius, color, type) {
            this.cssStyle.node.addMatter(131072);
            this.boxShadow = new laya.css.CSSBoxShadow();
            this.boxShadow.xoffset = xoffset;
            this.boxShadow.yoffset = yoffset;
            this.boxShadow.blurradius = blurradius;
            this.boxShadow.spreadradius = spreadradius;
            this.boxShadow.color = new laya.css.RGBA(color);
            this.boxShadow.type = type;
            return null;
        },
        __class__: laya.css.CSSBorder
    }
    laya.css.CSSPadding = function(style) {
        this.scroll_type = 0;
        this.scroll_sz_v = 0;
        this.scroll_sz_h = 0;
        this.height = 0;
        this.width = 0;
        this.bottom = 0;
        this.right = 0;
        this.top = 0;
        this.left = 0;
        this.style = style;
        if (style != null)
            style.node.addMatter(262144);
    };
    laya.css.CSSPadding.__name__ = true;
    laya.css.CSSPadding.prototype = {
        create: function(css) {
            if (this.style == css)
                return this;
            return css.data.create(css).padding = new laya.css.CSSPadding(css);
        },
        add_v_scroll: function(sz, bottom) {
            this.top -= (this.scroll_type & 4096) == 4096 ? this.scroll_sz_v : 0;
            this.bottom -= (this.scroll_type & 256) == 256 ? this.scroll_sz_v : 0;
            this.scroll_sz_v = sz;
            this.scroll_type|=bottom ? 256 : 4096;
            this.top += (this.scroll_type & 4096) == 4096 ? this.scroll_sz_v : 0;
            this.bottom += (this.scroll_type & 256) == 256 ? this.scroll_sz_v : 0;
            this.height = this.top + this.bottom;
        },
        add_h_scroll: function(sz, right) {
            this.left -= (this.scroll_type & 16) == 16 ? this.scroll_sz_h : 0;
            this.right -= (this.scroll_type & 1) == 1 ? this.scroll_sz_h : 0;
            this.scroll_sz_h = sz;
            this.scroll_type|=right ? 1 : 16;
            this.left += (this.scroll_type & 16) == 16 ? this.scroll_sz_h : 0;
            this.right += (this.scroll_type & 1) == 1 ? this.scroll_sz_h : 0;
            this.width = this.left + this.right;
        },
        get_scroll_bottom: function() {
            return (this.scroll_type & 256) == 256 ? this.scroll_sz_v : 0;
        },
        get_scroll_top: function() {
            return (this.scroll_type & 4096) == 4096 ? this.scroll_sz_v : 0;
        },
        get_scroll_right: function() {
            return (this.scroll_type & 1) == 1 ? this.scroll_sz_h : 0;
        },
        get_scroll_left: function() {
            return (this.scroll_type & 16) == 16 ? this.scroll_sz_h : 0;
        },
        set: function(top, right, bottom, left) {
            if (right == null || Laya.isNaN(right))
                right = bottom = left = top;
            this.set2(top, right, bottom, left);
            return 0;
        },
        set2: function(top, right, bottom, left) {
            if (top != null)
                this.top = top + ((this.scroll_type & 4096) == 4096 ? this.scroll_sz_v : 0);
            if (right != null)
                this.right = right + ((this.scroll_type & 1) == 1 ? this.scroll_sz_h : 0);
            if (bottom != null)
                this.bottom = bottom + ((this.scroll_type & 256) == 256 ? this.scroll_sz_v : 0);
            if (left != null)
                this.left = left + ((this.scroll_type & 16) == 16 ? this.scroll_sz_h : 0);
            this.width = this.left + this.right;
            this.height = this.top + this.bottom;
            return 0;
        },
        __class__: laya.css.CSSPadding
    }
    laya.css.CSSMargin = function(style) {
        this.height = 0;
        this.width = 0;
        this.bottom = 0;
        this.right = 0;
        this.style = style;
    };
    laya.css.CSSMargin.__name__ = true;
    laya.css.CSSMargin.prototype = {
        create: function(css) {
            if (this.style == css)
                return this;
            return css.data.create(css).margin = new laya.css.CSSMargin(css);
        },
        setBottom: function(d) {
            this.bottom = d;
            this.height = this.style.m_marginTop + this.bottom;
        },
        setRight: function(d) {
            this.right = d;
            this.width = this.style.m_marginLeft + this.right;
        },
        setTop: function(d) {
            this.style.m_marginTop = d;
            this.height = this.style.m_marginTop + this.bottom;
        },
        setLeft: function(d) {
            this.style.m_marginLeft = d;
            this.width = this.style.m_marginLeft + this.right;
        },
        set: function(top, right, bottom, left) {
            if (right == null || Laya.isNaN(right))
                right = bottom = left = top;
            this.style.m_marginTop = top;
            if (right != null)
                this.right = right;
            if (bottom != null)
                this.bottom = bottom;
            if (left != null)
                this.style.m_marginLeft = left;
            this.width = this.style.m_marginLeft + this.right;
            this.height = this.style.m_marginTop + this.bottom;
            return 0;
        },
        __class__: laya.css.CSSMargin
    }
    laya.css.CSSExtParam = function(style) {
        this.style = style;
        this.bgcolor = laya.css.CSSBackColor.__DEFAULT_;
        this.bgImg = laya.css.CSSBgImg.__DEFAULT_;
        this.padding = laya.css.CSSPadding.__DEFAULT_;
        this.border = laya.css.CSSBorder.__DEFAULT_;
        this.margin = laya.css.CSSMargin.__DEFAULT_;
    };
    laya.css.CSSExtParam.__name__ = true;
    laya.css.CSSExtParam.prototype = {
        create: function(css) {
            if (this.style == css)
                return this;
            return css.data = new laya.css.CSSExtParam(css);
        },
        getPageWidth: function(nodeWidth) {
            if (this.pageWidth == null)
                return -1;
            var w = Laya.parseInt(this.pageWidth);
            if (this.pageWidth.indexOf("%") > 0) {
                if (nodeWidth == null)
                    nodeWidth = this.style.m_width;
                w = Laya.Round(nodeWidth * w / 100);
            }
            return w;
        },
        __class__: laya.css.CSSExtParam
    }
    laya.css.CSSTextBorder = function() {
        this.width = 1;
    };
    laya.css.CSSTextBorder.__name__ = true;
    laya.css.CSSTextBorder.prototype = {
        __class__: laya.css.CSSTextBorder
    }
    laya.css.CSSFontExData = function(cssfont) {
        this.lineHeight = 0;
        this.whiteSpace = 0;
        this.letterSpacing = 0;
        this.wordSpacing = 0;
        this.lineSpacing = 0;
        this.textIndent = 0;
        this.weight = 0;
        this.variant = 0;
        this._cssfont_ = cssfont;
    };
    laya.css.CSSFontExData.__name__ = true;
    laya.css.CSSFontExData.prototype = {
        __class__: laya.css.CSSFontExData
    }
    laya.css.RGBA = function(d) {
        if (d != null)
            this.set(d);
    };
    laya.css.RGBA.__name__ = true;
    laya.css.RGBA.defineColor = function(name, color) {
        laya.css.RGBA._colorMap_[name] = color;
    }
    laya.css.RGBA.colortoArray = function(c) {
        var result = [];
        var temp;
        c = c.toLowerCase();
        var i, s;
        if (c.charAt(0) != "#") {
            if (c.indexOf("rgba(")!=-1) {
                temp = c.substring(c.indexOf("rgba(") + 5, c.indexOf(")"));
                var r = temp.split(",");
                i = 0;
                s = r.length;
                while (i < s) {
                    result[i] = Laya.parseInt(r[i]);
                    i++;
                }
            }
        } else {
            temp = c.substring(1, c.length);
            if (temp.length == 3 || temp.length == 4) {
                i = 0;
                s = temp.length;
                while (i < s) {
                    result.push(Laya.parseInt("0x" + temp.charAt(i) + "" + temp.charAt(i)));
                    i++;
                }
            } else if (temp.length == 6 || temp.length == 8) {
                i = 0;
                s = temp.length;
                while (i < s) {
                    result.push(Laya.parseInt("0x" + temp.substring(i, i + 2)));
                    i += 2;
                }
            }
        }
        if (result.length == 3)
            result.push(255);
        return result;
    }
    laya.css.RGBA.prototype = {
        isrgba: function() {
            return this.rgb_str.indexOf("rgba") == 0;
        },
        toString: function() {
            return this.rgb_str;
        },
        toRgb: function() {
            if (this.rgb != null)
                return this.rgb;
            this.rgb = laya.css.RGBA.colortoArray(this.rgb_str);
            return this.rgb;
        },
        set: function(name) {
            var c = laya.css.RGBA._colorMap_ != null ? Reflect.field(laya.css.RGBA._colorMap_, name): null;
            if (c != null) {
                this.rgb_str = c;
                if (this.rgb != null)
                    this.rgb = null;
                return;
            }
            if (Laya._ISAPP_) {
                this.rgb_str = name;
                if (this.rgb != null)
                    this.rgb = null;
                return;
            }
            if (name.length == 9) {
                var color = Laya.parseInt("0x" + name.substring(1, name.length));
                this.rgb_str = "rgba(" + (color>>16 & 255) + "," + (color>>8 & 255) + "," + (color & 255) + "," + ((color>>24 & 255) / 255 * 100 | 0) / 100 + ")";
                if (this.rgb != null)
                    this.rgb = null;
                return;
            }
            this.rgb_str = name;
            if (this.rgb != null)
                this.rgb = null;
        },
        __class__: laya.css.RGBA
    }
    laya.utils.XString = function(str) {
        this.text = "";
        if (str != null)
            this.text = str;
    };
    laya.utils.XString.__name__ = true;
    laya.utils.XString.prototype = {
        search: function(e) {
            return this.text.search(e.getExp());
            return -1;
        },
        lastIndexOf: function(d) {
            return this.text.lastIndexOf(d);
        },
        split: function(c) {
            return this.text.split(c);
        },
        charAt: function(i) {
            return this.text.charAt(i);
        },
        substring: function(a, b) {
            return this.text.substring(a, b);
        },
        indexOf: function(a, i) {
            return this.text.indexOf(a, i);
        },
        valueOf: function() {
            return this.text;
        },
        toString: function() {
            return this.text;
        },
        __class__: laya.utils.XString
    }
    laya.css.CSSFont = function(style, src) {
        this.textDecoration = 0;
        this.textAlign = 0;
        this.size = 12;
        this._isset_ = 0;
        this.cssStyle = style;
        this.exdata = laya.css.CSSFontExData.__DEFAULT_;
        this.copyWith(src);
    };
    laya.css.CSSFont.__name__ = true;
    laya.css.CSSFont.prototype = {
        _toText_: function() {
            if (this.text != null)
                return this.text;
            if (this.cssStyle != null && this.family == null)
                console.log("family null2:" + this.cssStyle.node._id_ + " " + this.cssStyle.node.nodeName + " " + this.size);
            this.text = (this.style == null ? "normal" : this.style.text) + " " + (this.exdata.weight != 0 ? this.exdata.weight + " " : "100 ") + this.size + "px " + Std.string(this.family.name);
            if (!Laya._ISHTML5_) {
                if (this.textBorder != null)
                    this.text += " " + this.textBorder.width + " " + this.textBorder.color.toString();
                this.fontId = laya.css.CSSFont.__FONTIDMAP__.get(this.text);
                if (this.fontId == null) {
                    this.fontId=++laya.css.CSSFont.__FONTMAXID__;
                    laya.css.CSSFont.__FONTIDMAP__.set(this.text, this.fontId);
                }
            }
            return this.text;
        },
        set_font: function(style, weight, size_lineHeigt, family) {
            this.set_style(style);
            if (weight != null)
                this.set_weight(weight);
            if (size_lineHeigt != null) {
                var sz = size_lineHeigt.split("/");
                if (sz[0] != null)
                    this.set_fontSize(Laya.parseInt(sz[0]));
                if (sz[1] != null)
                    this.set_lineHeight(Laya.parseInt(sz[1]));
            }
            if (family != null)
                this.set_family(family);
            this.text = null;
        },
        set_color: function(s) {
            this.color = new laya.css.RGBA(s);
            this._isset_|=8;
            this._OnfontSet_(8);
            this._resetTextNodes_();
        },
        set_text_border: function(width, style, color) {
            this._isset_|=4;
            if (this.textBorder == null)
                this.textBorder = new laya.css.CSSTextBorder();
            if (color == null) {
                color = width;
                width = "1";
            }
            this.textBorder.color = new laya.css.RGBA(color);
            this.textBorder.width = Laya.parseInt(width);
            this._OnfontSet_(4);
            this._textclear_needTypeset_();
        },
        set_family: function(name) {
            this._isset_|=2;
            var prefamily = this.family;
            this.family = laya.css.CSSFont.__FAMILYMAP__.get(name);
            if (this.family == null) {
                this.family = {
                    id: laya.css.CSSFont.__familyCount__++,
                    name: name
                };
                laya.css.CSSFont.__FAMILYMAP__.set(name, this.family);
            }
            if (this.family == prefamily)
                return;
            this._OnfontSet_(2);
            this.text = null;
            this._textclear_needTypeset_();
        },
        getWordImgFile: function(word) {
            return laya.io.File._find_(["font://", this.family.name, "(", word, ")"].join(""));
        },
        _resetTextNodes_: function() {
            if (this.cssStyle != null && (this.cssStyle.node._type_ & 2097152) == 2097152)
                laya.element.method.ElementMethod.resetTextNodes(this.cssStyle.node);
        },
        _textclear_needTypeset_: function() {
            if (this.cssStyle != null && (this.cssStyle.node._type_ & 2097152) == 2097152) {
                this.cssStyle.node.textNodes = null;
                this.cssStyle.node._checkNeedTypeset_();
            }
        },
        _needTypeset_: function() {
            if (this.cssStyle != null && (this.cssStyle.node._type_ & 2097152) == 2097152)
                this.cssStyle.node._checkNeedTypeset_();
        },
        set_text_decoration: function(type, color) {
            this._isset_|=32;
            switch (type) {
            case"none":
                this.textDecoration = 0;
                break;
            case"underline":
            case"_":
                this.textDecoration = 1;
                break;
            case"line-through":
            case"-":
                this.textDecoration = 2;
                break;
            case"overline":
                this.textDecoration = 3;
                break;
            }
            if (color != null && color != "")
                this.textDecorationColor = new laya.css.RGBA(color);
            this._OnfontSet_(32);
            this._resetTextNodes_();
        },
        set_weight: function(w) {
            this._isset_|=128;
            var i = 0;
            switch (w) {
            case"normal":
                i = 0;
                break;
            case"bold":
                i = 700;
                break;
            case"bolder":
                i = 800;
                break;
            case"lighter":
                i = 100;
                break;
            default:
                i = Laya.parseInt(w);
            }
            this._createExData_().weight = i;
            this._OnfontSet_(128);
            this._textclear_needTypeset_();
        },
        get_whiteSpace: function() {
            return this.exdata.whiteSpace == 1 ? "nowrap" : "";
        },
        set_whiteSpace: function(type) {
            this._isset_|=8192;
            if (type == "nowrap")
                this._createExData_().whiteSpace = 1;
            this._OnfontSet_(8192);
            this._needTypeset_();
        },
        get_textAlign: function() {
            var _g = this;
            switch (_g.textAlign) {
            case 0:
                return "left";
            case 1:
                return "center";
            case 2:
                return "right";
            }
            return "default";
        },
        set_textAlign: function(s) {
            this._isset_|=512;
            switch (s) {
            case"left":
                this.textAlign = 0;
                break;
            case"center":
                this.textAlign = 1;
                break;
            case"right":
                this.textAlign = 2;
                break;
            }
            this._OnfontSet_(512);
            this._needTypeset_();
        },
        set_fontSize: function(d) {
            this._isset_|=16;
            this.size = d;
            this.text = null;
            this._OnfontSet_(16);
            this._needTypeset_();
        },
        set_lineHeight: function(d) {
            this._isset_|=32768;
            this._OnfontSet_(32768);
            this._createExData_().lineHeight = d;
            this._needTypeset_();
        },
        set_style: function(s) {
            this._isset_|=1;
            switch (s) {
            case"italic":
                this.style = laya.css.CSSFont.__STYLE_ITALIC__;
                break;
            case"oblique":
                this.style = laya.css.CSSFont.__STYLE_OBLIQUE__;
                break;
            default:
                this.style = laya.css.CSSFont.__STYLE_NORMAL__;
            }
            this._OnfontSet_(1);
            this._textclear_needTypeset_();
        },
        set_lineSpacing: function(d) {
            this._isset_|=4096;
            this._createExData_().lineSpacing = d;
            this._OnfontSet_(4096);
            this._needTypeset_();
        },
        set_password: function() {
            this._isset_|=65536;
            this._createExData_();
            this._textclear_needTypeset_();
        },
        get_password: function() {
            return this._thisIsSet_(65536);
        },
        set_textIndent: function(d) {
            this._isset_|=256;
            this._createExData_().textIndent = d;
            this._OnfontSet_(256);
            this._needTypeset_();
        },
        set_letterSpacing: function(d) {
            this._isset_|=4096;
            this._createExData_().letterSpacing = d;
            this._OnfontSet_(4096);
            this._needTypeset_();
        },
        _createExData_: function() {
            if (this.exdata._cssfont_ == this)
                return this.exdata;
            return this.exdata = new laya.css.CSSFontExData(this);
        },
        create: function(css, inheritFont) {
            return this.cssStyle == css ? this.copyWith(inheritFont) : css.font = new laya.css.CSSFont(css, inheritFont == null ? this : inheritFont);
        },
        copyWith: function(srcfont) {
            if (srcfont == null || srcfont == this)
                return this;
            this.text = null;
            if (!this._thisIsSet_(16))
                this.size = srcfont.size;
            if (!this._thisIsSet_(8))
                this.color = srcfont.color;
            if (!this._thisIsSet_(2))
                this.family = srcfont.family;
            if (!this._thisIsSet_(4))
                this.textBorder = srcfont.textBorder;
            if (!this._thisIsSet_(512))
                this.textAlign = srcfont.textAlign;
            if (!this._thisIsSet_(32)) {
                this.textDecoration = srcfont.textDecoration;
                if (srcfont.textDecorationColor != null)
                    this.textDecorationColor = srcfont.textDecorationColor;
            }
            if (srcfont.exdata == laya.css.CSSFontExData.__DEFAULT_)
                return this;
            if (this.exdata == laya.css.CSSFontExData.__DEFAULT_) {
                this.exdata = srcfont.exdata;
                return this;
            }
            this._createExData_();
            var srcexdata = srcfont.exdata;
            if (!this._thisIsSet_(128))
                this.exdata.weight = srcexdata.weight;
            if (!this._thisIsSet_(64))
                this.exdata.variant = srcexdata.variant;
            if (!this._thisIsSet_(32768))
                this.exdata.lineHeight = srcexdata.lineHeight;
            if (!this._thisIsSet_(1024))
                this.exdata.lineSpacing = srcexdata.lineSpacing;
            if (!this._thisIsSet_(4096))
                this.exdata.letterSpacing = srcexdata.letterSpacing;
            if (!this._thisIsSet_(256))
                this.exdata.textIndent = srcexdata.textIndent;
            return this;
        },
        _OnfontSet_: function(type) {
            if (this.cssStyle == null)
                return;
            var node = this.cssStyle.node;
            if (node == null ||!((node._type_ & 2097152) == 2097152) || node.childNodes.length < 1)
                return;
        },
        _thisIsSet_: function(d) {
            return (this._isset_ & d) == d;
        },
        __class__: laya.css.CSSFont
    }
    laya.css.CSSMethod = function() {};
    laya.css.CSSMethod.__name__ = true;
    laya.css.CSSMethod.cssTextToScriptText = function(cssText, url, callName) {
        var cssscript = "", index = 0;
        var width = null, height = null, left = null, top = null, animation = null, dt;
        var script = laya.utils.Method.getScriptArrayOfText(cssText, "script:");
        if (script != null) {
            var i = 0, isz = script.length;
            while (i < isz) {
                var o = script[i];
                var s = Math.floor(o.count)-1;
                cssText = cssText.substring(0, o.pos) + i + laya.utils.Method.nChar(" ", s) + cssText.substring(o.pos + o.count, o.length);
                i++;
            }
        }
        var cmds = cssText.split(";");
        var fn = null;
        var i = 0, isz = cmds.length;
        while (i < isz) {
            i++;
            var strs = cmds[i-1].split(":");
            if (strs.length < 2)
                continue;
            if ((dt = strs[1]) == null)
                continue;
            var stylename = laya.utils.LaRegExp.replaceBlankChar(strs[0]).toLowerCase();
            if (stylename == "script") {
                var j = Laya.parseInt(dt);
                cssscript += (j == 0 ? "var " : "") + "fn=function()" + script[j].script + ";fn.call(this.node);";
                continue;
            }
            fn = laya.css.CSSStyleDeclaration.getCssFn(stylename);
            if (fn == null) {
                console.log("******no this css:[" + stylename + "]\n[" + strs[1] + "]");
                continue;
            }
            dt = laya.utils.Method.strTrim(dt);
            switch (stylename) {
            case"position":
                cssscript = callName + ".position('" + dt + "');" + cssscript;
                continue;
                break;
            case"left":
                left = Laya.isNaN(dt) ? "\"" + dt + "\"" : dt;
                continue;
                break;
            case"top":
                top = Laya.isNaN(dt) ? "\"" + dt + "\"" : dt;
                continue;
                break;
            case"width":
                width = Laya.isNaN(dt) ? "\"" + dt + "\"" : dt;
                continue;
                break;
            case"height":
                height = Laya.isNaN(dt) ? "\"" + dt + "\"" : dt;
                continue;
                break;
            case"visibility":
                cssscript = callName + ".set_visibility('" + dt + "');" + cssscript;
                continue;
                break;
            case"display":
                cssscript = callName + ".set_display('" + dt + "');" + cssscript;
                continue;
                break;
            }
            if (dt.substring(0, 4) == "url(") {
                if (url != null) {
                    var last = dt.indexOf(")");
                    if (last < 0)
                        last = dt.length;
                    var img = dt.substring(4, last);
                    img = "url(" + laya.io.File._formatUrl_(img, url) + ")";
                    dt = img + dt.substring(last + 1, dt.length);
                }
            }
            cssscript += callName + "." + Std.string(fn.setfname) + "(";
            if (fn.paramdef.length == 1)
                cssscript += laya.utils.Method.getParamStrByRegClass(fn.paramdef.charAt(0), dt);
            else {
                var splitchar = fn.paramdef.charAt(1);
                var params = dt.split(splitchar);
                var k = 0, sz = fn.paramdef.length;
                while (k + k < sz) {
                    var chr = fn.paramdef.charAt(k + k);
                    cssscript += laya.utils.Method.getParamStrByRegClass(chr, params[k]);
                    if (k + k + 1 < sz)
                        cssscript += ",";
                    k++;
                }
            }
            cssscript += ");";
        }
        if (width != null && height != null) {
            if (width.charAt(0) != "\"" && height.charAt(0) != "\"")
                cssscript = callName + ".size(" + width + "," + height + ");" + cssscript;
            else 
                cssscript = callName + ".set_width(" + width + ");" + callName + ".set_height(" + height + ");" + cssscript;
            width = height = null;
        }
        if (width != null)
            cssscript = callName + ".set_width(" + width + ");" + cssscript;
        if (height != null)
            cssscript = callName + ".set_height(" + height + ");" + cssscript;
        if (left != null && top != null) {
            if (left.charAt(0) != "\"" && top.charAt(0) != "\"")
                cssscript = callName + ".pos(" + left + "," + top + ");" + cssscript;
            else 
                cssscript = callName + ".set_left(" + left + ");" + callName + ".set_top(" + top + ");" + cssscript;
            left = top = null;
        }
        if (left != null)
            cssscript = callName + ".set_left(" + left + ");" + cssscript;
        if (top != null)
            cssscript = callName + ".set_top(" + top + ");" + cssscript;
        return cssscript;
    }
    laya.css.CSSMethod.cssTextToScript = function(cssText, cssFilePath) {
        Laya["eval"]("laya.css.CSSMethod._TmpFunction_=function(style){\n//" + cssFilePath + "\n" + laya.css.CSSMethod.cssTextToScriptText(cssText, cssFilePath, "this") + ";\n}");
        return laya.css.CSSMethod._TmpFunction_;
    }
    laya.css.CSSMethod.executeCSSText = function(style, cssText) {
        var cmds = cssText.split(";"), dt, fn = null;
        var nextStyle = [];
        var i = 0, isz = cmds.length;
        while (i < isz) {
            i++;
            var strs = cmds[i-1].split(":");
            if (strs.length < 2)
                continue;
            if ((dt = strs[1]) == null)
                continue;
            var stylename;
            stylename = laya.utils.LaRegExp.replaceBlankChar(strs[0]).toLowerCase();
            if (laya.css.CSSMethod._WIDTH_HEIGHT_STR_.indexOf(stylename) > 0) {
                nextStyle.push(stylename);
                nextStyle.push(laya.utils.Method.strTrim(dt));
            } else 
                style.css(stylename, laya.utils.Method.strTrim(dt));
        }
        if (nextStyle.length > 0) {
            var i1 = nextStyle.length-2;
            do {
                style.css(nextStyle[i1], nextStyle[i1 + 1]);
                i1 -= 2;
            }
            while (i1 >= 0);
        }
    }
    laya.css.CSSMethod.styleNodeToScript = function(styleNode, text, filePath) {
        text = laya.utils.Method.deletEannotation(text);
        var cssArray = laya.utils.Method.toScriptArrayOfText(text);
        if (cssArray == null) {
            Laya["debugger"]();
            console.log("styleNodeToScript err,text to cssArray null:" + text);
            return null;
        }
        var i = 0, sz = cssArray.length, className, c, classCode;
        while (i < sz) {
            var t = cssArray[i].charAt(0);
            if (t == "{") {
                if ((className = cssArray[i-1]) == null) {
                    console.log("style err:" + text);
                    return null;
                }
                className = laya.utils.LaRegExp.replaceBlankChar(className);
                classCode = cssArray[i];
                classCode = classCode.substring(1, classCode.length-1);
                if (className.charAt(0) == "@" && className.indexOf("@keyframes") == 0) {
                    i++;
                    new laya.element.action.ActionKeyFrames().css(laya.utils.Method.stringReplace(className, "@keyframes", ""), classCode);
                    continue;
                }
                var csssfn = laya.css.CSSMethod.cssTextToScript(classCode, filePath);
                Laya.document.styleSheets.set(className, csssfn);
                if (className.charAt(0) == ".")
                    Laya.document.styleSheets.set(className.substring(1, className.length), csssfn);
                else if (className.charAt(0) != "#") {
                    var name = className;
                    Laya.document.styleSheets.set(name, csssfn);
                    Laya.document._regElementDefaultClassName_(name, csssfn);
                }
            }
            i++;
        }
        return null;
    }
    laya.css.CSSMethod.prototype = {
        __class__: laya.css.CSSMethod
    }
    laya.css.CSSOverflow = function() {};
    laya.css.CSSOverflow.__name__ = true;
    laya.css.CSSOverflow.prototype = {
        set: function(style, s) {
            style.node.addMatter(524288);
        },
        __class__: laya.css.CSSOverflow
    }
    laya.css.CSSTransform = function(style) {
        this.rotate = 0;
        this.scaleY = 1;
        this.scaleX = 1;
        this.translateY = 0;
        this.translateX = 0;
        this.style = style;
    };
    laya.css.CSSTransform.__name__ = true;
    laya.css.CSSTransform.prototype = {
        create: function(css) {
            return this.style == css ? this : css.transform = new laya.css.CSSTransform(css);
        },
        translateByTransformOrigin: function(style) {
            if (this.transformOrigin == null)
                return;
            var _g = this;
            switch (_g.transformOrigin.x) {
            case 0:
                this.translateX = 0;
                break;
            case 1:
                this.translateX = Math.floor(style.m_width / 2);
                break;
            case 2:
                this.translateX = style.m_width;
                break;
            default:
                this.translateX = this.transformOrigin.xx;
            }
            var _g1 = this;
            switch (_g1.transformOrigin.y) {
            case 0:
                this.translateY = 0;
                break;
            case 1:
                this.translateY = Math.floor(style.m_height / 2);
                break;
            case 2:
                this.translateY = style.m_height;
                break;
            default:
                this.translateY = this.transformOrigin.yy;
            }
        },
        set_transform_origin: function(s) {
            this._transformOrigin_str_ = s;
            if (s == "none") {
                if (this.transformOrigin != null) {
                    this.transformOrigin = null;
                    this.translateX = this.translateY = 0;
                }
                this.style.node.removeMatter(512);
                return;
            }
            var d = s.split(" ");
            if (d.length < 2) {
                Laya.alert("set_transform_origin 参数不足2个 param = " + s);
                return;
            }
            if (d[0] == "left" && d[1] == "top") {
                if (this.transformOrigin != null) {
                    this.transformOrigin = null;
                    this.translateX = this.translateY = 0;
                }
                this.style.node.removeMatter(512);
                return;
            }
            this.style.node.addMatter(512);
            this.transformOrigin = {
                x: 1,
                y: 1,
                xx: 0,
                yy: 0
            };
            var _g = d[0];
            switch (_g) {
            case"left":
                this.transformOrigin.x = 0;
                break;
            case"center":
                break;
            case"right":
                this.transformOrigin.x = 2;
                break;
            default:
                this.transformOrigin.x = 3;
                this.transformOrigin.xx = Laya.parseInt(d[0]);
            }
            var _g1 = d[1];
            switch (_g1) {
            case"top":
                this.transformOrigin.y = 0;
                break;
            case"center":
                break;
            case"bottom":
                this.transformOrigin.y = 2;
                break;
            default:
                this.transformOrigin.y = 3;
                this.transformOrigin.yy = Laya.parseInt(d[1]);
            }
        },
        setRotate: function(r) {
            if (this.transformOrigin == null && this._transformOrigin_str_ == null)
                this.transformOrigin = laya.css.CSSTransform._TRANSFORMORIGIN_;
            this.rotate = r;
            var n = this.style.node;
            n.addMatter(16384);
            if (n.parentNode != null)
                n.parentNode.repaint();
        },
        setTranslate: function(x, y) {
            if (this.transformOrigin == null || this.transformOrigin == laya.css.CSSTransform._TRANSFORMORIGIN_)
                this.transformOrigin = {
                    x: 3,
                    y: 3,
                    xx: x,
                    yy: y
                };
            this.translateX = this.transformOrigin.xx = x;
            this.translateY = this.transformOrigin.yy = y;
            this.style.node.addMatter(512);
            this.style.node.repaint();
        },
        setScale: function(x, y) {
            if (this.transformOrigin == null && this._transformOrigin_str_ == null)
                this.transformOrigin = laya.css.CSSTransform._TRANSFORMORIGIN_;
            this.scaleX = x;
            this.scaleY = y;
            var n = this.style.node;
            n.addMatter(4096);
            if (n.parentNode != null)
                n.parentNode.repaint();
        },
        __class__: laya.css.CSSTransform
    }
    laya.css.CSSStyleDeclaration = function(n, initType) {
        this.m_height = 0;
        this.m_width = 0;
        this.m_marginTop = 0;
        this.m_marginLeft = 0;
        this.m_top = 0;
        this.m_left = 0;
        this.node = n;
        this._type_ = initType;
        this.data = laya.css.CSSExtParam.__DEFAULT_;
        this.font = laya.css.CSSFont.__DEFAULT_;
        this.transform = laya.css.CSSTransform.__DEFAULT_;
    };
    laya.css.CSSStyleDeclaration.__name__ = true;
    laya.css.CSSStyleDeclaration.getCssFn = function(name) {
        return laya.utils.Method.getAREG(laya.css.CSSStyleDeclaration, name);
    }
    laya.css.CSSStyleDeclaration.prototype = {
        scaleFullParent: function(type) {
            var _g = this;
            if (type == null || type == "none") {
                if (this.node._private_.fullparent_event != null) {
                    this.node._private_.fullparent_event.deleted = null;
                    this.node._private_.fullparent_event = null;
                }
                return;
            }
            var p = this.node.parentNode._toElement_();
            var cx = p.get_width() / this.get_width(), cy = p.get_height() / this.get_height();
            if (type == "equal") {
                if (cx > cy)
                    cx = cy;
                else 
                    cy = cx;
            }
            if (type == "largeequal") {
                if (cx > cy)
                    cy = cx;
                else 
                    cx = cy;
            }
            if (type == "width")
                cy = cx;
            if (type == "height")
                cx = cy;
            this.scale(cx, cy);
            this.node.dispatchEvent(null, "onresize");
            if (this.node._private_.fullparent_event == null)
                this.node._private_.fullparent_event = p.attachEvent("onresize", function() {
                    _g.node.scaleFullParent(type);
                }, this.node);
        },
        set_transform: function(s) {
            if (s == "none")
                return;
            var i, j;
            if ((i = s.indexOf("("))!=-1 && (j = s.indexOf(")"))!=-1)
                laya.utils.Method.set(this, s.substring(0, i), s.substring(i + 1, j));
        },
        setFixRatio: function(s) {
            switch (s) {
            case"none":
                if ((this._type_ & 4096) == 4096)
                    this._type_&=-4097;
                if ((this._type_ & 8192) == 8192)
                    this._type_&=-8193;
                break;
            case"width":
                this._type_|=4096;
                true;
                break;
            case"height":
                this._type_|=8192;
                true;
                break;
            }
        },
        get_marginBottom: function(d) {
            return this.data.margin.bottom;
        },
        set_marginBottom: function(d) {
            this.data.margin.create(this).setBottom(d);
            this.node.repaint();
            return d;
        },
        get_marginTop: function() {
            return this.m_marginTop;
        },
        set_marginTop: function(d) {
            this.data.margin.create(this).setTop(d);
            this.node.repaint();
            return d;
        },
        get_marginRight: function() {
            return this.data.margin.right;
        },
        set_marginRight: function(d) {
            this.data.margin.create(this).setRight(d);
            this.node.repaint();
            return d;
        },
        get_marginLeft: function() {
            return this.m_marginLeft;
        },
        set_marginLeft: function(d) {
            this.data.margin.create(this).setLeft(d);
            this.node.repaint();
            return d;
        },
        repaint: function() {
            this.node.repaint();
        },
        get_position: function() {
            return (this._type_ & 131072) == 131072 ? 1 : 0;
        },
        get_cssFloat: function() {
            return this.m_cssFloat == 1 ? "left" : "right";
        },
        set_cssFloat: function(s) {
            switch (s) {
            case"left":
                this.m_cssFloat = 1;
                break;
            case"right":
                this.m_cssFloat = 3;
                break;
            }
            return s;
        },
        get_whiteSpace: function() {
            return this.font.get_whiteSpace();
        },
        set_whiteSpace: function(s) {
            this.font.create(this, this.font).set_whiteSpace(s);
            return s;
        },
        set_textBorder: function(width, style, color) {
            this.font.create(this, this.font).set_text_border(width, style, color);
            return color;
        },
        set_family: function(s) {
            this.font.create(this, this.font).set_family(laya.utils.Method.strTrim(s));
            return s;
        },
        get_textIndent: function() {
            return this.font.exdata.textIndent;
        },
        set_textIndent: function(d) {
            this.font.create(this, this.font).set_textIndent(d);
            return d;
        },
        get_fontSize: function() {
            return this.font.size;
        },
        set_fontSize: function(d) {
            this.font.create(this, this.font).set_fontSize(d);
            return d;
        },
        set_fontWeight: function(s) {
            this.font.create(this, this.font).set_weight(s);
            return s;
        },
        get_textAlign: function() {
            return this.font.get_textAlign();
        },
        set_textAlign: function(s) {
            this.font.create(this, this.font).set_textAlign(s);
            return s;
        },
        get_lineHeight: function() {
            return this.font.exdata.lineHeight;
        },
        set_lineHeight: function(d) {
            this.font.create(this, this.font).set_lineHeight(d);
            return d;
        },
        get_color: function() {
            return this.font.color.toString();
        },
        set_color: function(s) {
            this.font.create(this, this.font).set_color(s);
            return null;
        },
        get_lineSpacing: function() {
            return this.font.exdata.lineSpacing;
        },
        set_lineSpacing: function(d) {
            this.font.create(this, this.font).set_lineSpacing(d);
            return d;
        },
        get_letterSpacing: function() {
            return this.font.exdata.letterSpacing;
        },
        set_letterSpacing: function(d) {
            this.font.create(this, this.font).set_letterSpacing(d);
            return d;
        },
        inheritFont: function(srcStyle) {
            if (srcStyle != null)
                this.font = this.font.cssStyle == null ? srcStyle.font : this.font.create(this, srcStyle.font);
        },
        get_verticalAlign: function() {
            var _g = this;
            switch (_g.m_verticalAlign) {
            case 1:
                return "top";
            case 2:
                return "middle";
            case 3:
                return "bottom";
            }
            return null;
        },
        set_verticalAlign: function(s) {
            switch (s) {
            case"top":
                this.m_verticalAlign = 1;
                break;
            case"middle":
                this.m_verticalAlign = 2;
                break;
            case"bottom":
                this.m_verticalAlign = 3;
                break;
            }
            return s;
        },
        _toint_: function(s) {
            return s == null ? null : Laya.parseInt(s);
        },
        get_paddingLeft: function() {
            return this.data.padding.left;
        },
        set_paddingLeft: function(d) {
            return this.data.padding.create(this).set2(null, null, null, d);
        },
        get_paddingBottom: function() {
            return this.data.padding.bottom;
        },
        set_paddingBottom: function(d) {
            return this.data.padding.create(this).set2(null, null, d, null);
        },
        get_paddingRight: function() {
            return this.data.padding.right;
        },
        set_paddingRight: function(d) {
            return this.data.padding.create(this).set2(null, d, null, null);
        },
        get_paddingTop: function() {
            return this.data.padding.top;
        },
        set_paddingTop: function(d) {
            return this.data.padding.create(this).set2(d, null, null, null);
        },
        get_pageWidth: function() {
            return this.data.pageWidth;
        },
        set_pageWidth: function(w) {
            this.data.create(this).pageWidth = w;
            return w;
        },
        _update_size_: function() {
            if (this.node._private_._Dynamic_Attrs_ != null) {
                this.node.updateDynamicAttr("width");
                this.node.updateDynamicAttr("height");
            }
        },
        set_min_height: function(h) {
            return this.m_min_height = h;
        },
        set_min_width: function(w) {
            return this.m_min_width = w;
        },
        set_max_height: function(h) {
            return this.m_max_height = h;
        },
        get_max_width: function() {
            return this.m_max_width;
        },
        set_max_width: function(w) {
            return this.m_max_width = w;
        },
        get_height: function() {
            return this.m_height;
        },
        set_height: function(h) {
            if (Laya.typeIsString(h)) {
                if (h == "auto") {
                    this._type_|=8388608;
                    return this.m_height;
                } else if (laya.css.DynamicData.withDynamicData(this.node, h, "height", 1)) {
                    this._type_|=67108864;
                    this._width_set = h;
                    return this.m_height;
                }
                h = Laya.parseInt(h);
            }
            h != this.m_height && this.size(this.m_width, h);
            return this.m_height;
        },
        get_width: function() {
            return this.m_width;
        },
        set_width: function(w) {
            var ww = w;
            if (Laya.typeIsString(w)) {
                if (w == "auto") {
                    this._type_|=4194304;
                    return this.m_width;
                } else if (laya.css.DynamicData.withDynamicData(this.node, w, "width", 0)) {
                    this._type_|=33554432;
                    this._width_set = w;
                    if (Laya.isNaN(this.m_width))
                        Laya["debugger"]();
                        return this.m_width;
                }
                w = Laya.parseInt(w);
            }
            w != this.m_width && this.size(w, this.m_height);
            return this.m_width;
        },
        set_transform_origin: function(s) {
            this.transform.create(this).set_transform_origin(s);
        },
        get_rotate: function() {
            return this.transform.rotate;
        },
        set_rotate: function(s) {
            this.transform.create(this).setRotate(s);
            return s;
        },
        get_scalexy: function() {
            return this.transform.scaleX;
        },
        set_scalexy: function(d) {
            this.transform.create(this).setScale(d, d);
            return d;
        },
        get_scaley: function() {
            return this.transform.scaleY;
        },
        get_scalex: function() {
            return this.transform.scaleX;
        },
        set_scaley: function(y) {
            this.transform.create(this).setScale(this.transform.scaleX, y);
            return y;
        },
        set_scalex: function(x) {
            this.transform.create(this).setScale(x, this.transform.scaleY);
            return x;
        },
        _heightbeset_: function() {
            return (this._type_ & 65536) == 65536;
        },
        _widthbeset_: function() {
            return (this._type_ & 32768) == 32768;
        },
        _sizebeset_and_auto: function() {
            return (this._type_ & 32768) == 32768 || (this._type_ & 4194304) == 4194304 || (this._type_ & 65536) == 65536 || (this._type_ & 8388608) == 8388608;
        },
        _sizebeset_: function() {
            return (this._type_ & 32768) == 32768 || (this._type_ & 65536) == 65536;
        },
        set_bottom: function(y) {
            if (laya.css.DynamicData.withDynamicData(this.node, "100%-100%" + (y >= 0 ? "-" : "+") + (y >= 0 ? y : - y), "top", 1)) {
                this._type_|=268435456;
                return this.m_top;
            }
            return this.m_top;
        },
        set_right: function(x) {
            if (laya.css.DynamicData.withDynamicData(this.node, "100%-100%" + (x >= 0 ? "-" : "+") + (x >= 0 ? x : - x), "left", 0)) {
                this._type_|=134217728;
                return this.m_left;
            }
            return this.m_left;
        },
        get_top: function() {
            return this.m_top;
        },
        set_top: function(y) {
            if (Laya.typeIsString(y)) {
                if (y == "center")
                    y = "50%-50%";
                if (laya.css.DynamicData.withDynamicData(this.node, y, "top", 1)) {
                    this._type_|=268435456;
                    return this.m_top;
                }
                y = Laya.parseInt(y);
            }
            y != this.m_top && this.pos(this.m_left, y);
            return this.m_top;
        },
        getHeightWithScale: function() {
            return this.m_height * this.get_scaley();
        },
        getWidthWithScale: function() {
            return this.m_width * this.get_scalex();
        },
        get_left: function() {
            return this.m_left;
        },
        set_left: function(x) {
            if (Laya.typeIsString(x)) {
                if (x == "center")
                    x = "50%-50%";
                if (laya.css.DynamicData.withDynamicData(this.node, x, "left", 0)) {
                    this._type_|=134217728;
                    return this.m_left;
                }
                x = Laya.parseInt(x);
            }
            x != this.m_left && this.pos(x, this.m_top);
            return this.m_left;
        },
        pos: function(x, y) {
            if (this.m_left != x || this.m_top != y) {
                this.m_left = x;
                this.m_top = y;
                (this.node._type_ & 524288) == 524288 && this.node.dispatchEvent(null, "onrepos");
                var p;
                if ((p = this.node.parentNode) != null) {
                    p._type_|=4096;
                    p.onchildrepos(this.node);
                    p.repaint();
                }
                return true;
            }
            return false;
        },
        get_visibility: function() {
            return (this._type_ & 524288) == 524288 ? "none" : "";
        },
        set_visibility: function(d) {
            var h = this.node.hidden;
            if (d == "visible") {
                this._type_|=262144;
                this.node.hidden = 0;
            }
            if (d == "hidden") {
                this._type_|=524288;
                this.node.hidden = 1;
            }
            if (h != this.node.hidden) {
                var p = this.node.parentNode;
                if (p != null && p.style != null) {
                    p._type_|=4096;
                    p.repaint();
                }
                this.node.dispatchEvent(null, "onreshow");
                this.node._review_(this.node.hidden == 0);
            }
            return "";
        },
        get_display: function() {
            return (this._type_ & 262144) == 262144 ? "none" : "";
        },
        set_display: function(d) {
            var h = this.node.hidden;
            switch (d) {
            case"":
                break;
            case"none":
                this._type_|=262144;
                this.node.hidden = 2;
                break;
            case"block":
                this._type_|=16384;
                break;
            case"break":
                this._type_|=2097152;
                break;
            case"inline":
                if ((this._type_ & 16384) == 16384)
                    this._type_&=-16385;
                break;
            }
            if (d != "none") {
                if ((this._type_ & 262144) == 262144)
                    this._type_&=-262145;
                this.node.hidden = this.node.hidden == 2 ? 0 : this.node.hidden;
            }
            if (h != this.node.hidden) {
                var p = this.node.parentNode;
                if (p != null && p.style != null) {
                    p._checkNeedTypeset_(true, false);
                    p._type_|=4096;
                    p.repaint();
                }
                this.node.dispatchEvent(null, "onreshow");
                this.node._review_(this.node.hidden == 0);
            }
            return "";
        },
        _isClip_: function() {
            return this.overflow != null;
        },
        get_zIndex: function() {
            return this.m_zindex;
        },
        set_zIndex: function(d) {
            if (this.m_zindex != d) {
                this.m_zindex = d;
                var n = this.node;
                n._sort_d_ =- 1;
                n.parentNode._type_|=64;
                n.repaint();
            }
            return d;
        },
        get_sound: function() {
            return this.node._private_._sound_url_;
        },
        set_sound: function(url) {
            this.node._private_._sound_url_ = url = this.node.formatUrl(url);
            var a = new laya.element.Audio();
            a.set_autoplay(true);
            a.set_src(url);
            a.created();
            return url;
        },
        get_globalCompositeOperation: function() {
            return this.m_globalCompositeOperation;
        },
        set_globalCompositeOperation: function(s) {
            this.m_globalCompositeOperation = s;
            this.node.repaint();
            this.node.addMatter(2048);
            return s;
        },
        get_alpha: function() {
            return this.m_alpha == null ? 1 : this.m_alpha;
        },
        set_alpha: function(d) {
            if (this.m_alpha != d) {
                this.m_alpha = d;
                this.node.addMatter(32768);
                if (this.node.parentNode != null)
                    this.node.parentNode.repaint();
            }
            return d;
        },
        get_flip: function() {
            return this.m_flip;
        },
        set_flip: function(d) {
            if (this.m_flip != d) {
                this.m_flip = d;
                this.node.addMatter(8192);
                this.node.repaint();
            }
            return d;
        },
        _isBox_: function() {
            return (this._type_ & 16777216) == 16777216;
        },
        get_block: function() {
            return (this._type_ & 16384) == 16384;
        },
        set_block: function(b) {
            if (b)
                this._type_|=16793600;
            else 
                this._type_&=-16385;
            return b;
        },
        checkType: function(type) {
            return (this._type_ & type) == type;
        },
        removeType: function(type) {
            if ((this._type_ & type) == type)
                this._type_&=~type;
        },
        addType: function(type) {
            this._type_|=type;
            return true;
        },
        set_background_color: function(color) {
            if (color == "none") {
                this.data.bgcolor.style = null;
                this.data.bgcolor = laya.css.CSSBackColor.__DEFAULT_;
                this.node.removeMatter(2);
            } else 
                this.data.bgcolor.create(this).set(color);
            this.node.repaint();
            return color;
        },
        set_background_image: function(url) {
            if (url == "none" || url == "" || url == null) {
                this.data.bgImg.style = null;
                this.data.bgImg = laya.css.CSSBgImg.__DEFAULT_;
                this.node.removeMatter(4);
            } else 
                this.data.bgImg.create(this).set(url);
            this.node.repaint();
        },
        get_background: function() {
            return "";
        },
        set_background: function(d) {
            if (d.indexOf("url") < 0)
                this.set_background_color(d);
            else 
                this.set_background_image(d);
            this.node.repaint();
            return d;
        },
        destroy: function() {
            this.data = null;
            this.node = null;
        },
        get_clip: function() {
            return ((this._type_ & 1024) == 1024 ? 16 : 0) | ((this._type_ & 2048) == 2048 ? 1 : 0);
        },
        set_clip: function(x, y) {
            if (x) {
                this._type_|=1024;
                true;
            } else if ((this._type_ & 1024) == 1024)
                this._type_&=-1025;
            if (y) {
                this._type_|=2048;
                true;
            } else if ((this._type_ & 2048) == 2048)
                this._type_&=-2049;
            this.node.addMatter(8388608);
        },
        setOverflow: function(s) {
            switch (s) {
            case"hidden":
                if (this.node.extData.scrollEffect != null) {
                    this.node.set_draggable("false");
                    this.node.extData.scrollEffect = null;
                    this.node.extData.dragCtrl = null;
                }
                break;
            case"visible":
                if (this.overflow != null) {
                    this.overflow = null;
                    this.node._checkNeedTypeset_();
                }
                this.node.repaint();
                return null;
            default:
                if (s.indexOf("scroll") == 0) {
                    s = laya.utils.Method.stringReplace(s, "(", " ");
                    s = laya.utils.Method.stringReplace(s, ")", "");
                    var ss = s.split(" ");
                    this.node.scrollEffect().define(ss[1] != null ? Laya.parseInt(ss[1]) : null, ss[2] != null ? Laya.parseInt(ss[2]) : null, ss[3]);
                    this.node.set_draggable("default");
                    this.node.extData.create(this.node).dragCtrl = new laya.element.method.DragCtrl_Scroll();
                }
            }
            if (this.overflow == null)
                this.overflow = new laya.css.CSSOverflow();
            this.overflow.set(this, s);
            this.node.repaint();
            return s;
        },
        setPassWord: function() {
            this.font.create(this, this.font).set_password();
        },
        textDecoration: function(s, color) {
            this.font.create(this, this.font).set_text_decoration(s, color);
        },
        translate: function(x, y) {
            this.transform.create(this).setTranslate(x, y);
        },
        padding: function(top, right, bottom, left) {
            return this.data.padding.create(this).set(top, right, bottom, left);
        },
        scale: function(x, y) {
            if (this.transform.style == null && x == 1.0 && y == 1.0)
                return;
            this.transform.create(this).setScale(x, y);
        },
        cssText: function(css) {
            laya.css.CSSMethod.executeCSSText(this, css);
        },
        animationby: function(text, duration, timingFunction, delay, count, direction, call_back) {
            return laya.element.action.Action.runByString(this.node, false, text, duration, timingFunction, delay, count, direction, call_back);
        },
        animation: function(text, duration, timingFunction, delay, count, direction, call_back) {
            return laya.element.action.Action.runByString(this.node, true, text, duration, timingFunction, delay, count, direction, call_back);
        },
        size: function(w, h) {
            w = 0.5 + w | 0;
            h = 0.5 + h | 0;
            var prew = this.m_width, preh = this.m_height;
            if (this.m_width != w || this.m_height != h) {
                var p = this.node.parentNode;
                if (this.m_width != w) {
                    if (this.m_min_width != null && w < this.m_min_width)
                        w = this.m_min_width;
                    if (this.m_max_width != null && w > this.m_max_width)
                        w = this.m_max_width;
                    this._width_set = this.m_width = w;
                    this._type_|=32768;
                    if ((this._type_ & 8192) == 8192 && (this._type_ & 65536) == 65536) {
                        if (this._fixRatioSize_ == null)
                            this._fixRatioSize_ = this.m_width / this.m_height;
                        else 
                            h = Laya.Round(this.m_width / this._fixRatioSize_);
                    }
                }
                if (this.m_height != h) {
                    if (this.m_min_height != null && h < this.m_min_height)
                        h = this.m_min_height;
                    if (this.m_max_height != null && h > this.m_max_height)
                        h = this.m_max_height;
                    this._height_set = this.m_height = h;
                    this._type_|=65536;
                    if ((this._type_ & 4096) == 4096 && (this._type_ & 32768) == 32768) {
                        if (this._fixRatioSize_ == null)
                            this._fixRatioSize_ = this.m_width / this.m_height;
                        else 
                            this.m_width = Laya.Round(this._fixRatioSize_ * this.m_height);
                    }
                }
                if (this.m_width != prew || this.m_height != preh) {
                    this.node._checkNeedTypeset_();
                    if (p != null)
                        p._type_|=4096;
                    if ((this.node._type2_ & 1) == 1)
                        this.node.dispatchEvent(null, "onresize");
                    this.node.repaint();
                }
                return true;
            }
            return false;
        },
        margin: function(top, right, bottom, left) {
            this.data.margin.create(this).set(top, right, bottom, left);
            this.node.repaint();
        },
        gray: function(d) {
            if (d == 0) {
                if (this.m_filter == null)
                    return;
                if (this.m_filter.r == null) {
                    this.m_filter = null;
                    this.node.removeMatter(32);
                } else if (this.m_filter.gray != null)
                    this.m_filter.gray = null;
                return;
            }
            if (this.m_filter == null)
                this.m_filter = {};
            this.m_filter.r = 1;
            this.m_filter.g = 1;
            this.m_filter.b = 1;
            this.m_filter.gray = d;
            this.node.addMatter(32);
            this.node.repaint();
        },
        light: function(r, g, b) {
            if (Laya.isNaN(g))
                g = r;
            if (Laya.isNaN(b))
                b = r;
            if (r == 1 && g == 1 && b == 1) {
                if (this.m_filter != null && this.m_filter.gray != null)
                    this.m_filter.r = null;
                else {
                    this.m_filter = null;
                    this.node.removeMatter(32);
                }
            } else {
                if (this.m_filter != null) {
                    this.m_filter.r = r;
                    this.m_filter.g = g;
                    this.m_filter.b = b;
                } else 
                    this.m_filter = {
                        r: r,
                        g: g,
                        b: b
                    };
                this.node.addMatter(32);
            }
            this.node.repaint();
        },
        border: function(width, style, color) {
            if (width == "none") {
                this.data.border.cssStyle = null;
                this.data.border = laya.css.CSSBorder.__DEFAULT_;
            } else 
                this.data.border.create(this).set(width, style, color);
            this.node.repaint();
            return null;
        },
        boxShadow: function(xoffset, yoffset, blurradius, spreadradius, color, type) {
            if (xoffset == "none") {
                this.data.border.boxShadow = null;
                return null;
            }
            this.data.border.create(this).set_box_shadow(xoffset == null ? null : Laya.parseInt(xoffset), yoffset, blurradius, spreadradius, color, type);
            return null;
        },
        borderRadius: function(top_left, top_right, bottom_left, bottom_right) {
            this.data.border.create(this).set_radius(top_left == null ? null : Laya.parseInt(top_left), top_right == null ? null : Laya.parseInt(top_right), bottom_left == null ? null : Laya.parseInt(bottom_left), bottom_right == null ? null : Laya.parseInt(bottom_right));
            return null;
        },
        clearDynamic: function(name) {
            if (name == "all") {
                this.node.clearDynamicAttr("left");
                this.node.clearDynamicAttr("top");
                this.node.clearDynamicAttr("width");
                this.node.clearDynamicAttr("height");
            } else 
                this.node.clearDynamicAttr(name);
        },
        css: function(name, value) {
            if (value == null)
                return laya.utils.Method.get(this, name);
            laya.utils.Method.set(this, name, value);
            return this;
        },
        setAttribute: function(name, value) {
            laya.utils.Method.setField(this, name, value);
            return this;
        },
        getAttribute: function(name) {
            return laya.utils.Method.field(this, name);
        },
        setFont: function(style, weight, size_lineHeigt, family) {
            this.font.create(this, this.font).set_font(style, weight, size_lineHeigt, family);
            return null;
        },
        position: function(type) {
            if (type == null)
                return (this._type_ & 131072) == 131072 ? 1 : 0;
            if (type == "none")
                Laya.alert("position none");
            else {
                if ((this._type_ & 131072) == 131072)
                    return 1;
                this._type_|=16924672;
                this.node._sort_d_ =- 1;
            }
            return 1;
        },
        __class__: laya.css.CSSStyleDeclaration
    }
    laya.css.DynamicData = function() {};
    laya.css.DynamicData.__name__ = true;
    laya.css.DynamicData.withDynamicData = function(node, data, type, xy) {
        if (node.parentNode == null || data.indexOf("%") < 0)
            return false;
        var words;
        words = data.split("%");
        if (words.length < 2)
            return false;
        var _Dynamic_Attrs_ = node._private_._Dynamic_Attrs_;
        if (_Dynamic_Attrs_ == null)
            _Dynamic_Attrs_ = node._private_._Dynamic_Attrs_ = new laya.utils.StringMap();
        var listener = _Dynamic_Attrs_.get(type);
        var isnew = false;
        if (listener == null) {
            isnew = true;
            listener = new laya.event.EventListener(node, ($_ = laya.css.DynamicData._DynamicData_, $bind($_, $_.dynamicData)));
            _Dynamic_Attrs_.set(type, listener);
            listener.data = {};
        }
        var data1 = listener.data;
        data1.type = type;
        data1.xy = xy;
        data1.fn = laya.utils.Method.field(node.style, "set_" + type);
        if (data1.fn == null) {
            console.log("style no param:" + type);
            return false;
        }
        if (words[0].charAt(0) == "x") {
            data1.firtFrome = 1;
            var str = words[0];
            data1.p = Laya.parseInt(str.substring(1, str.length)) / 100;
        } else {
            data1.firtFrome = 0;
            data1.p = Laya.parseInt(words[0]) / 100;
        }
        if (words.length == 2) {
            data1.d = words[1] != "" ? Laya.parseInt(words[1]) : 0;
            data1.szd = 0;
        } else {
            data1.szd = Laya.parseInt(words[1]) / 100;
            data1.d = words[2] != "" ? Laya.parseInt(words[2]) : 0;
        }
        listener.node = node;
        listener.call_back.call(listener.owner, null, listener);
        if (isnew) {
            if (data1.firtFrome == 0)
                node.parentNode.addEventListener("onresize", listener);
            if (data1.szd != 0 || data1.firtFrome != 0)
                node.addEventListener("onresize", listener);
        }
        return true;
    }
    laya.css.DynamicData.prototype = {
        dynamicData: function(e, listener) {
            var node = listener.node;
            if (node.parentNode == null)
                return;
            var data = listener.data;
            var style = node.style;
            var mydata = style.data;
            if (data.firtFrome == 0) {
                var pstyle = node.parentNode.style;
                var pdata = pstyle.data;
                data.fn.call(style, Laya.parseInt((data.xy == 0 ? pstyle.m_width - mydata.border.width - mydata.margin.width - mydata.padding.width : pstyle.m_height - mydata.border.height - mydata.margin.height - mydata.padding.height) * data.p + data.d + data.szd * (data.xy == 0 ? style.m_width : style.m_height)));
            } else 
                data.fn.call(style, Laya.parseInt((data.xy == 0 ? style.m_height - mydata.border.width - mydata.margin.width - mydata.padding.width : style.m_width - mydata.border.height - mydata.margin.height - mydata.padding.height) * data.p + data.d + data.szd * (data.xy == 0 ? style.m_width : style.m_height)));
        },
        __class__: laya.css.DynamicData
    }
    laya.device = {}
    laya.device.Screen = function() {};
    laya.device.Screen.__name__ = true;
    laya.device.Screen.size = function(w, h) {
        laya.device.Screen.sized = true;
        laya.device.Screen.width = w;
        laya.device.Screen.height = h;
        var c = Laya.window._webWindow_;
        if (c != null) {
            c.style.width = w + "px";
            c.style.height = h + "px";
            Laya.document.body.repaint();
        }
    }
    laya.device.Screen.getWindowMaxSize = function() {
        var wnd = Laya.jwindow;
        if (Laya._ISAPP_)
            return new laya.utils.Point(wnd.innerWidth, wnd.innerHeight);
        var doc = wnd.document;
        var w = wnd.innerWidth || doc.documentElement.offsetWidth;
        var h = wnd.innerHeight || doc.documentElement.offsetHeight;
        return new laya.utils.Point(w, h);
    }
    laya.device.Screen.check = function() {
        if (laya.device.Screen.sized)
            return;
        var wnd = Laya.jwindow;
        if (Laya._ISAPP_) {
            laya.device.Screen.width = wnd.innerWidth;
            laya.device.Screen.height = wnd.innerHeight;
            return;
        }
        if (Laya.window._webWindow_ == null)
            return;
        var c = Laya.window._webWindow_;
        laya.device.Screen.width = Laya.parseInt(c.offsetWidth / Laya.window.scale.x);
        laya.device.Screen.height = Laya.parseInt(c.offsetHeight / Laya.window.scale.y);
    }
    laya.device.Screen.prototype = {
        __class__: laya.device.Screen
    }
    laya.display = {}
    laya.display.Canvas = function(bEnableTimeoutRelease, type) {
        if (type == null)
            type = "2d";
        if (bEnableTimeoutRelease == null)
            bEnableTimeoutRelease = true;
        this._active_ = 1;
        this.ID = 1;
        this.height = 0;
        this.width = 0;
        this.enableTimeoutRelease(bEnableTimeoutRelease);
        this.ID=++laya.display.Canvas.__ID__;
        this._new_(type);
        if (this.ID == 1&&!Laya._ISAPP_) {
            var id = null;
            var p = id ? document.getElementById(id): document.body;
            if (Laya._ISFLASH_ == false)
                p.appendChild(this.canvas);
        } else if (bEnableTimeoutRelease)
            laya.display.Canvas._CANVASACTIVE_.push(this);
    };
    laya.display.Canvas.__name__ = true;
    laya.display.Canvas.GetTmpCanvase = function(w, h) {
        if (laya.display.Canvas._TMP_CANVAS_ == null)
            laya.display.Canvas._TMP_CANVAS_ = new laya.display.Canvas();
        laya.display.Canvas._TMP_CANVAS_.active();
        laya.display.Canvas._TMP_CANVAS_.setSize(w, h);
        return laya.display.Canvas._TMP_CANVAS_;
    }
    laya.display.Canvas.Updata = function() {
        var tm = Laya.CurTime, c, delay;
        laya.display.Canvas._ACTIVECOUNT_ = 0;
        laya.display.Canvas._AREA_ = 0;
        var _g1 = 0, _g = laya.display.Canvas._CANVASACTIVE_.length;
        while (_g1 < _g) {
            var i = _g1++;
            if ((c = laya.display.Canvas._CANVASACTIVE_[i]) == null || c._active_==-1 || c._active_ == laya.display.Canvas._DISABLETIMEOUTRELEASE_)
                continue;
            if (c.canvas == null) {
                laya.display.Canvas._CANVASACTIVE_.splice(i, 1);
                c._active_ =- 1;
                continue;
            }
            if (tm - c.activTime > 10000) {
                if (Laya._ISHTML5_)
                    c.setSize(1, 1);
                else {
                    c.setSize(1, 1);
                    c.clear();
                }
                laya.display.Canvas._CANVASACTIVE_.splice(i, 1);
                c.destroy();
                c._active_ =- 1;
            } else {
                laya.display.Canvas._AREA_ += c.width * c.height;
                laya.display.Canvas._ACTIVECOUNT_++;
            }
        }
    }
    laya.display.Canvas.prototype = {
        toDataURL: function(type) {
            return this.canvas.toDataURL(type);
        },
        drawImage: function(img, sx, sy) {
            this.context.drawImage3(img.image, sx, sy);
        },
        clear: function() {
            this._fontTxt_ = null;
            this.context.clearRect(0, 0, this.width, this.height);
        },
        enableTimeoutRelease: function(b) {
            if (b)
                this._active_ = this._active_ < 0 ? this._active_ : 1;
            else 
                this._active_ = laya.display.Canvas._DISABLETIMEOUTRELEASE_;
        },
        setSize: function(w, h) {
            if (this.width != w || this.height != h) {
                if (Laya._ISHTML5_) {
                    this.width = this.canvas.width = w;
                    this.height = this.canvas.height = h;
                } else {
                    this.width = w;
                    this.height = h;
                    this.canvas.setSize(w, h);
                }
            }
        },
        destroy: function() {
            if (this.canvas == null)
                return;
            laya.display.Canvas._CANVASDELS_.get(this._canvasType_).push(this.canvas);
            this._active_ =- 2;
            this.canvas._canvas_ = null;
            this.context._canvas_ = null;
            this.context = null;
            this.canvas = null;
        },
        _new_: function(type) {
            this.activTime = Laya.CurTime;
            if (type == "fakecanvas"&&!Laya._ISHTML5_)
                this._canvasType_ = "fakeCanvas";
            else {
                this._canvasType_ = "canvas";
                type = "2d";
            }
            type = "2d";
            this._createCanvase_();
            if (this._canvasType_ == "fakeCanvas")
                this.canvas.isFake = true;
        },
        _createCanvase_: function() {
            var _g = this;
            this.canvas = laya.display.Canvas._CANVASDELS_.get(this._canvasType_).pop();
            if (this.canvas == null)
                this.canvas = Laya.jdocument.createElement(this._canvasType_);
            if (this.canvas._context_ == null)
                this.canvas._context_ = this.context = this.canvas.getContext("2d");
            else 
                this.context = this.canvas._context_;
            this.canvas._canvas_ = this;
            this.context._canvas_ = this;
            if (Laya._ISFLASH_ == false)
                laya.display.Context._attchExtFun_(this.context);
            this.canvas.onLost = function() {
                if (_g.canvas != null && _g.canvas._canvas_ != null) {
                    _g.canvas._canvas_._active_ =- 1;
                    console.log("canvase lost...:" + _g.ID);
                }
            };
        },
        active: function() {
            this.activTime = Laya.CurTime;
            if (this._active_ > 0)
                return true;
            laya.display.Canvas._CANVASACTIVE_.push(this);
            if (this.canvas == null)
                this._createCanvase_();
            this._active_ = 1;
            return false;
        },
        __class__: laya.display.Canvas
    }
    laya.display.Context = function() {};
    laya.display.Context.__name__ = true;
    laya.display.Context._attchExtFun_ = function(c) {
        var _c = c, _d = laya.display.Context._DEFAULT_;
        if (_c.drawImage3 != null)
            return;
        _c.set_textAlign = _d.set_textAlign;
        _c.set_textBaseline = _d.set_textBaseline;
        _c.set_font = _d.set_font;
        _c.set_lineWidth = _d.set_lineWidth;
        _c.set_strokeStyle = _d.set_strokeStyle;
        _c.set_fillStyle = _d.set_fillStyle;
        _c.get_globalAlpha = _d.get_globalAlpha;
        _c.set_globalAlpha = _d.set_globalAlpha;
        _c.setShadow = _d.setShadow;
        _c.get_globalCompositeOperation = _d.get_globalCompositeOperation;
        _c.set_globalCompositeOperation = _d.set_globalCompositeOperation;
        _c.drawImage3 = _c.drawImage;
        _c.drawImage5 = _c.drawImage;
        _c.drawImage9 = _c.drawImage;
    }
    laya.display.Context.prototype = {
        createPattern: function(src, type) {
            return null;
        },
        drawImage9: function(src, dx, dy, dw, dh, x, y, w, h) {},
        drawImage5: function(src, x, y, w, h) {},
        drawImage3: function(src, x, y) {},
        measureTextEx: function(txt, font, id) {
            return null;
        },
        measureText: function(txt) {
            return null;
        },
        setFontID: function(font, id) {},
        fill: function() {},
        clip: function() {},
        transform: function(n11, n12, n21, n22, n31, n32) {},
        strokeRect: function(left, top, width, height) {},
        fillRect: function(left, top, width, height) {},
        quadraticCurveTo: function(left, top, width, height) {},
        clearRect: function(left, top, width, height) {},
        putImageData: function(data, left, top) {},
        getImageData: function(left, top, width, height) {
            return null;
        },
        fillText: function(txt, x, y) {},
        lineTo: function(x, y) {},
        moveTo: function(x, y) {},
        rotate: function(angle) {},
        scale: function(x, y) {},
        translate: function(x, y) {},
        restore: function(id) {},
        save: function(id) {},
        stroke: function() {},
        closePath: function() {},
        rect: function(left, top, width, height) {},
        beginPath: function() {},
        setShadow: function(x, y, blur, color) {
            var _this = this;
            _this.shadowOffsetX = x;
            _this.shadowOffsetY = y;
            _this.shadowBlur = blur;
            _this.shadowColor = color;
        },
        setFilter: function(r, g, b, gray) {},
        set_globalCompositeOperation: function(s) {
            var _this = this;
            return _this.globalCompositeOperation = s;
        },
        get_globalCompositeOperation: function() {
            var _this = this;
            return _this.globalCompositeOperation;
        },
        set_globalAlpha: function(f) {
            var _this = this;
            return _this.globalAlpha = f;
        },
        get_globalAlpha: function() {
            var _this = this;
            return _this.globalAlpha;
        },
        set_strokeStyle: function(s) {
            var _this = this;
            return _this.strokeStyle = s;
        },
        get_strokeStyle: function() {
            var _this = this;
            return _this.strokeStyle;
        },
        set_fillStyle: function(s) {
            var _this = this;
            return _this.fillStyle = s;
        },
        get_fillStyle: function() {
            var _this = this;
            return _this.fillStyle;
        },
        set_lineWidth: function(d) {
            var _this = this;
            return _this.lineWidth = d;
        },
        get_lineWidth: function() {
            var _this = this;
            return _this.lineWidth;
        },
        set_font: function(s) {
            var _this = this;
            return _this.font = s;
        },
        get_font: function() {
            var _this = this;
            return _this.font;
        },
        set_textBaseline: function(s) {
            var _this = this;
            return _this.textBaseline = s;
        },
        get_textBaseline: function() {
            var _this = this;
            return _this.textBaseline;
        },
        set_textAlign: function(s) {
            var _this = this;
            return _this.textAlign = s;
        },
        get_textAlign: function() {
            var _this = this;
            return _this.textAlign;
        },
        __class__: laya.display.Context
    }
    laya.display.RenderHtml = function() {
        this.paintkey = 0;
        this.scaley = 1;
        this.scalex = 1;
    };
    laya.display.RenderHtml.__name__ = true;
    laya.display.RenderHtml._paint_filter_onpaint = function(r, node, context, bx, by) {
        laya.display.method.RenderMethod.paint_filter(r, node, context, bx, by, laya.display.method.RenderMethod.var_base_onpaint);
    }
    laya.display.RenderHtml._paint_filter_static_img = function(r, node, context, bx, by) {
        laya.display.method.RenderMethod.paint_filter(r, node, context, bx, by, laya.display.method.RenderMethod.var_base_static_img);
    }
    laya.display.RenderHtml._paint_scale_alpha_img = function(r, node, context, bx, by) {
        laya.display.method.RenderMethod.paint_scale_alpha(r, node, context, bx, by, laya.display.method.RenderMethod.var_base_static_img);
    }
    laya.display.RenderHtml._paint_transform_static_text = function(r, node, context, bx, by) {
        laya.display.method.RenderMethod.paint_transform_alpha(r, node, context, bx, by, laya.display.method.RenderMethod.var_base_static_text);
    }
    laya.display.RenderHtml._paint_sacle_alpha_text = function(r, node, context, bx, by) {
        laya.display.method.RenderMethod.paint_scale_alpha(r, node, context, bx, by, laya.display.method.RenderMethod.var_base_static_text);
    }
    laya.display.RenderHtml._paint_filter_static_img_childs = function(r, node, context, bx, by) {
        laya.display.method.RenderMethod.paint_filter(r, node, context, bx, by, laya.display.method.RenderMethod.var_base_static_img_childs);
    }
    laya.display.RenderHtml._paint_simple_filter_childs = function(r, node, context, bx, by) {
        laya.display.method.RenderMethod.paint_filter(r, node, context, bx, by, laya.display.method.RenderMethod.var_base_simple_childs);
    }
    laya.display.RenderHtml._paint_childs_ex_ = function(r, node, context, bx, by) {
        laya.display.method.RenderMethod.paint_transform_alpha_overflow_childs(r, node, context, bx, by, laya.display.method.RenderMethod.var_base_base_childs);
    }
    laya.display.RenderHtml._paint_transform_alpha_img_onpaint = function(r, node, context, bx, by) {
        laya.display.method.RenderMethod.paint_transform_alpha(r, node, context, bx, by, laya.display.method.RenderMethod.var_paint_img_onpaint);
    }
    laya.display.RenderHtml._paint_transform_alpha_onpaint = function(r, node, context, bx, by) {
        laya.display.method.RenderMethod.paint_transform_alpha(r, node, context, bx, by, laya.display.method.RenderMethod.var_base_onpaint);
    }
    laya.display.RenderHtml._paint_filter_transform_alpha_img_onpaint = function(r, node, context, bx, by) {
        laya.display.method.RenderMethod.paint_filter(r, node, context, bx, by, laya.display.RenderHtml.var_paint_transform_alpha_img_onpaint);
    }
    laya.display.RenderHtml._paint_scale_alpha_onpaint = function(r, node, context, bx, by) {
        laya.display.method.RenderMethod.paint_scale_alpha(r, node, context, bx, by, laya.display.method.RenderMethod.var_base_onpaint);
    }
    laya.display.RenderHtml._paint_check = function(r, node, context, bx, by) {
        switch (node._matter_) {
        case 0:
        case 524288:
        case 4096:
        case 512:
        case 528384:
        case 32768:
            node._paintfn_ = laya.display.method.RenderMethod.var_base_none;
            break;
        case 65536:
            node._paintfn_ = laya.display.method.RenderMethod.var_base_onpaint;
            break;
        case 1:
            node._paintfn_ = laya.display.method.RenderMethod.var_base_simple_childs;
            break;
        case 33:
            node._paintfn_ = laya.display.RenderHtml.var_paint_simple_filter_childs;
            break;
        case 65:
            node._paintfn_ = laya.display.method.RenderMethod.var_base_static_img_childs;
            break;
        case 97:
            node._paintfn_ = laya.display.RenderHtml.var_paint_filter_static_img_childs;
            break;
        case 64:
            node._paintfn_ = laya.display.method.RenderMethod.var_base_static_img;
            break;
        case 96:
            node._paintfn_ = laya.display.RenderHtml.var_paint_filter_static_img;
            break;
        case 256:
        case 524544:
            node._paintfn_ = laya.display.method.RenderMethod.var_base_static_text;
            break;
        case 37120:
        case 33024:
            node._paintfn_ = laya.display.RenderHtml.var_paint_sacle_alpha_text;
            break;
        case 65568:
            node._paintfn_ = laya.display.RenderHtml.var_paint_filter_onpaint;
            break;
        case 4160:
            node._paintfn_ = laya.display.RenderHtml.var_paint_scale_alpha_img;
            break;
        case 528897:
        case 40961:
        case 524289:
        case 1201:
        case 32769:
        case 557569:
        case 524801:
        case 557057:
        case 4097:
        case 4609:
        case 513:
        case 528385:
        case 8705:
            node._paintfn_ = laya.display.RenderHtml.var_paint_childs_ex_;
            break;
        case 77824:
        case 80384:
        case 79872:
            node._paintfn_ = laya.display.RenderHtml.var_paint_transform_alpha_onpaint;
            break;
        case 14912:
        case 16960:
        case 32832:
            node._paintfn_ = laya.display.RenderHtml.var_paint_transform_alpha_img_onpaint;
            break;
        case 16992:
            node._paintfn_ = laya.display.RenderHtml.var_paint_filter_transform_alpha_img_onpaint;
            break;
        case 69632:
            node._paintfn_ = laya.display.RenderHtml.var_paint_scale_alpha_onpaint;
            break;
        default:
            node._paintfn_ = laya.display.RenderHtml._paint_full;
        }
        node._paintfn_.call(r, r, node, context, bx, by);
    }
    laya.display.RenderHtml._paint_full = function(r, node, context, bx, by) {
        r.paint(node, context, bx, by, true);
    }
    laya.display.RenderHtml._paint_childs = function(r, pnode, context, bx, by) {
        if (pnode._renderNode != null) {
            if (pnode._repaintType_ == 0 && pnode._renderNode.useCache())
                return;
            pnode._renderNode.renderStart();
        }
        if (!Laya._ISAPP_) {
            var mode = pnode.style.get_clip();
            if (mode != 0) {
                laya.display.method.RenderMethod._paint_childs_clip(r, pnode, context, bx, by, mode);
                if (pnode._renderNode != null)
                    pnode._renderNode.renderEnd();
                return;
            }
        }
        var childs = pnode.childNodes, node, ps = 0;
        var i = 0, isz = childs.length;
        while (i < isz) {
            i++;
            if ((node = childs[i-1]) == null || node.hidden > 0 || node._inTypesetLine_ != null)
                continue;
            ps++;
            node._paintfn_.call(r, r, node, context, bx, by);
            node._repaintType_ = 0;
        }
        laya.display.RenderHtml._RENDERCOUNT_ += ps;
        if (pnode._renderNode != null)
            pnode._renderNode.renderEnd();
    }
    laya.display.RenderHtml.prototype = {
        repaint: function(node, decCanvas, type) {
            if (type == null)
                type = 0;
            if (node.hidden > 0)
                return;
            this.paintkey = Laya.window.updatecount;
            var canvas;
            canvas = decCanvas == null ? node.get_canvas() : decCanvas;
            if ((node._matter_ & 2) != 2 || node.style.data.bgcolor.color.isrgba())
                canvas.clear();
            canvas._fontTxt_ = null;
            var context = canvas.context;
            context.save(977);
            context._filter_ = null;
            canvas.render = this;
            if (Laya.window._render_ == false)
                this._paint_node_(node, canvas);
            else if (type == 0) {
                var cx =- node._get_clientLeft(), cy =- node._get_clientTop();
                if (cx != 0 || cy != 0)
                    context.translate(cx, cy);
                    laya.display.RenderHtml._paint_full(this, node, context, 0, 0);
            } else if (this._paintNoTransform_(node, context, 0, 0, 0, 0, 0) > 1)
                context.restore(720);
            context.restore(977);
        },
        _paint_node_: function(pnode, canvas) {
            var childs = pnode.childNodes, node, ps = 0, i = 0, sz = childs.length;
            while (i < sz) {
                i++;
                if ((node = childs[i-1]) == null || node.hidden > 0)
                    continue;
                if (node.childNodes.length > 0)
                    this._paint_node_(node._toElement_(), canvas);
                node._repaintType_ = 0;
            }
        },
        paintToCanvas: function(node, canvas, type) {
            if (type == null)
                type = 0;
            canvas.render = this;
            var ct = canvas.context;
            ct.save(930);
            var sx = canvas.width / node.get_offsetWidth();
            var sy = canvas.height / node.get_offsetHeight();
            var prescalex = this.scalex, prescaley = this.scaley;
            ct.scale(sx, sy);
            this.scalex = sx;
            this.scaley = sy;
            if (type == 0) {
                var cx =- node._get_clientLeft(), cy =- node._get_clientTop();
                if (cx != 0 || cy != 0)
                    ct.translate(cx, cy);
                laya.display.RenderHtml._paint_full(this, node, ct, 0, 0);
            } else if (this._paintNoTransform_(node, ct, 0, 0, 0, 0, 0) > 0)
                ct.restore(720);
            ct.restore(930);
            this.scalex = prescalex;
            this.scaley = prescaley;
        },
        paint: function(node, context, _bx, _by, enebleTransform) {
            var style = node.style, _matter_ = node._matter_;
            var styledata = style.data;
            var cx = style.m_left + style.m_marginLeft + _bx, cy = style.m_top + style.m_marginTop + _by;
            var bsave = 0;
            if (enebleTransform) {
                if (style.m_alpha != null && style.m_alpha < 1) {
                    if (style.m_alpha < 0.01 && (_matter_ & 65536) != 65536)
                        return;
                    bsave = 2;
                    context.save(721);
                    context.set_globalAlpha(style.m_alpha);
                }
                if (style.m_globalCompositeOperation != null) {
                    if (bsave == 0) {
                        bsave = 2;
                        context.save(721);
                    }
                    context.set_globalCompositeOperation(style.m_globalCompositeOperation);
                }
                if (style.transform.style != null) {
                    if (bsave == 0) {
                        bsave = 2;
                        context.save(721);
                    }
                    var tfm = style.transform;
                    tfm.translateByTransformOrigin(style);
                    var dx = cx + tfm.translateX, dy = cy + tfm.translateY, flipx, flipy;
                    if (style.get_flip() != null) {
                        flipx = Math.floor(style.get_flip() / 10);
                        flipy = style.get_flip()%10;
                        dx += flipx == 2 ? style.m_marginLeft == 0 ? style.m_width / 2 : - style.m_marginLeft : 0;
                        dy += flipy == 2 ? style.m_marginTop == 0 ? style.m_height / 2 : - style.m_marginTop : 0;
                        dx = Laya.Round(dx);
                        dy = Laya.Round(dy);
                        if (dx != 0 || dy != 0)
                            context.translate(dx, dy);
                        context.scale(flipx > 0?-1 : 1, flipy > 0?-1 : 1);
                    } else if (dx != 0 || dy != 0)
                        context.translate(dx, dy);
                    if (tfm.scaleX != 1 || tfm.scaleY != 1)
                        context.scale(tfm.scaleX, tfm.scaleY);
                    if (tfm.rotate != 0)
                        context.rotate(Math.PI * tfm.rotate / 180);
                    if (dx != 0 || dy != 0)
                        context.translate( - dx, - dy);
                } else if (style.get_flip() != null) {
                    if (bsave == 0) {
                        bsave = 2;
                        context.save(721);
                    }
                    var flipx = Math.floor(style.get_flip() / 10), flipy = style.get_flip()%10;
                    var dx = cx + (flipx == 2 ? style.m_marginLeft == 0 ? Math.floor(style.m_width / 2) : - style.m_marginLeft : 0);
                    var dy = cy + (flipy == 2 ? style.m_marginTop == 0 ? Math.floor(style.m_height / 2) : - style.m_marginTop : 0);
                    dx = Laya.Round(dx);
                    dy = Laya.Round(dy);
                    if (dx != 0 || dy != 0) {
                        context.translate(dx, dy);
                        context.scale(flipx > 0?-1 : 1, flipy > 0?-1 : 1);
                        context.translate( - dx, - dy);
                    } else 
                        context.scale(flipx > 0?-1 : 1, flipy > 0?-1 : 1);
                }
            }
            if ((_matter_ & 1024) == 1024) {
                var nodeCanvase;
                nodeCanvase = node;
                var myselfCanvas = nodeCanvase.get_canvas();
                if (myselfCanvas.ID > 1) {
                    if (myselfCanvas.canvas.width * myselfCanvas.canvas.height == 0) {
                        if (bsave > 0)
                            context.restore(721);
                        return;
                    }
                    var n = nodeCanvase.reference;
                    if (n._repaintType_ > 0 || node._repaintType_ > 0 || Laya.document.editing) {
                        var r = nodeCanvase.htmlRender;
                        if (n == node) {
                            var x = node._get_clientLeft(), y = node._get_clientTop();
                            node.style.m_left -= x;
                            node.style.m_top -= y;
                            r.repaint(n, myselfCanvas, 1);
                            node.style.m_left += x;
                            node.style.m_top += y;
                        } else {
                            var myCtxt = myselfCanvas.context;
                            myCtxt.save(900);
                            var sx = myselfCanvas.width / n.get_offsetWidth();
                            var sy = myselfCanvas.height / n.get_offsetHeight();
                            myCtxt.scale(sx, sy);
                            r.scalex = sx;
                            r.scaley = sy;
                            r.repaint(n, myselfCanvas, 1);
                            myCtxt.restore(900);
                            r.scalex = 1;
                            r.scaley = 1;
                        }
                    }
                    context.drawImage3(myselfCanvas.canvas, cx, cy);
                    if (bsave > 0)
                        context.restore(721);
                    return;
                }
            }
            if (this._paintNoTransform_(node, context, cx, cy, _bx, _by, bsave) > 1)
                context.restore(721);
        },
        _paintNoTransform_: function(node, context, cx, cy, _bx, _by, ctxtBeSave) {
            var style = node.style, _matter_ = node._matter_;
            var styledata = style.data;
            var cw = style.m_width + styledata.padding.width + styledata.border.width;
            var ch = style.m_height + styledata.padding.height + styledata.border.height;
            var filterset = false, filter = context._filter_;
            if (style.m_filter != null) {
                filterset = true;
                if (filter != null) {
                    var f = style.m_filter;
                    context._filter_ = {
                        r: filter.r * f.r,
                        g: filter.g * f.g,
                        b: filter.b * f.b,
                        gray: f.gray
                    };
                    if (!Laya._ISHTML5_) {
                        var fGray1 = filter.gray ? filter.gray: 0;
                        var fGray2 = f.gray != null ? f.gray: 0;
                        var fGray = 1 - (1 - fGray1) * (1 - fGray2);
                        context.setFilter(filter.r * f.r, filter.g * f.g, filter.b * f.b, fGray);
                    }
                } else {
                    context._filter_ = style.m_filter;
                    if (!Laya._ISHTML5_) {
                        var f = style.m_filter;
                        context.setFilter(f.r, f.g, f.b, f.gray != null ? f.gray : 0);
                    }
                }
            }
            if ((_matter_ & 131072) == 131072)
                laya.display.method.GraphMethod._drawRect_(node, context, cx, cy, cw, ch);
            cx += styledata.border.left;
            cy += styledata.border.top;
            cw -= styledata.border.width;
            ch -= styledata.border.height;
            if ((_matter_ & 2) == 2) {
                if (styledata.border.radius == null && styledata.border.boxShadow == null) {
                    var fillStyle = styledata.bgcolor.color.toString();
                    if (fillStyle == "clear")
                        context.clearRect(cx, cy, cw, ch);
                    else {
                        context.set_fillStyle(styledata.bgcolor.color.toString());
                        context.fillRect(cx, cy, cw, ch);
                    }
                }
            } else if ((_matter_ & 4) == 4)
                laya.display.method.RenderMethod.fillImage(this, node, context, cx, cy, cw, ch);
            cx += styledata.padding.left;
            cy += styledata.padding.top;
            cw -= styledata.padding.width;
            ch -= styledata.padding.height;
            if ((_matter_ & 64) == 64) {
                if (context._filter_ == null ||!Laya._ISHTML5_)
                    node.file.drawImage(context, cx, cy, cw, ch);
                else 
                    laya.display.method.GraphMethod.DrawImageFilter(context, node.file.toFileImg(), cx, cy, cw, ch, context._filter_);
            }
            node.onpaint(context._canvas_);
            if (node.childNodes.length > 0 || node.typesetLines != null) {
                var extd = node.extData;
                if (extd.zdepth != 1 && node.parentNode != null) {
                    var pexd;
                    pexd = node.parentNode.extData;
                    var z = extd.zdepth;
                    cx -= Math.floor(pexd.scrollLeft * z);
                    cy -= Math.floor(pexd.scrollTop * z);
                    cx += pexd.scrollLeft;
                    cy += pexd.scrollTop;
                }
                cx -= extd.scrollLeft;
                cy -= extd.scrollTop;
                laya.element.method.ElementMethod.childsSort(node);
                if (style.overflow != null) {
                    if (ctxtBeSave == 0) {
                        ctxtBeSave = 2;
                        context.save(721);
                    }
                    var ddx =- cx + styledata.padding.left + style.m_marginLeft + styledata.border.left + style.get_left();
                    var ddy =- cy + styledata.padding.top + style.m_marginTop + styledata.border.top + style.get_top();
                    context.beginPath();
                    context.rect(ddx + cx, ddy + cy, style.m_width, style.m_height);
                    context.clip();
                }
                if (cx != 0 || cy != 0)
                    context.translate(cx, cy);
                if (node.typesetLines != null && (_matter_ & 4194304) != 4194304)
                    laya.display.method.RenderMethod.paintTypesetLines(this, node, context, 0, 0, style.overflow != null);
                if (node.childNodes.length > 0)
                    laya.display.RenderHtml._paint_childs(this, node, context, _bx, _by);
                if (cx != 0 || cy != 0)
                    context.translate( - cx, - cy);
            }
            if (filterset) {
                if (!Laya._ISHTML5_) {
                    if (filter != null)
                        context.setFilter(filter.r, filter.g, filter.b, filter.gray != null ? filter.gray : 0);
                    else 
                        context.setFilter(1, 1, 1, 0);
                }
                context._filter_ = filter;
            }
            return ctxtBeSave;
        },
        __class__: laya.display.RenderHtml
    }
    laya.display.method = {}
    laya.display.method.GraphMethod = function() {};
    laya.display.method.GraphMethod.__name__ = true;
    laya.display.method.GraphMethod._JpgToPng = function(img) {
        var tm = laya.utils.Method.getCurTime(), delay;
        var src = new laya.display.Canvas(false);
        var w = img.width, h = Laya.parseInt((img.height-1) / 2);
        src.setSize(w, h);
        src.context.drawImage9(img, 0, 0, w, h, 0, 0, w, h);
        var imageDataSrc = src.context.getImageData(0, 0, w, h);
        var pixelsSrc = imageDataSrc.data;
        if (pixelsSrc == null)
            Laya.alert("JpgToPng err:" + Std.string(img.src));
        if (laya.display.method.GraphMethod.__tmpCanvas__ == null)
            laya.display.method.GraphMethod.__tmpCanvas__ = new laya.display.Canvas();
        laya.display.method.GraphMethod.__tmpCanvas__.active();
        var alpha = laya.display.method.GraphMethod.__tmpCanvas__;
        alpha.setSize(w, h);
        alpha.context.drawImage9(img, 0, h + 2, w, h, 0, 0, w, h);
        var imageDataAlpha = alpha.context.getImageData(0, 0, w, h);
        var pixelsAlpha = imageDataAlpha.data;
        var i, x;
        var _g = 0;
        while (_g < h) {
            var y = _g++;
            i = y * w<<2;
            x = 0;
            while (x < w) {
                i += 4;
                x++;
                pixelsSrc[i + 3] = pixelsAlpha[i];
            }
        }
        src.context.putImageData(imageDataSrc, 0, 0);
        return src.canvas;
    }
    laya.display.method.GraphMethod._DrawImageFilter_one_ = function(context, filterc, width, height, x, y, w, h, steph, d) {
        if (d == 1)
            context.drawImage(filterc.canvas, 0, steph, width, height, x, y, w, h);
        else if (d > 1)
            while (d >= 1) {
                if (d >= 1) {
                    context.drawImage(filterc.canvas, 0, steph, width, height, x, y, w, h);
                    d -= 1;
                }
                if (d > 0.01) {
                    context.save();
                    context.globalAlpha = d;
                    context.drawImage(filterc.canvas, 0, steph, width, height, x, y, w, h);
                    context.restore();
                }
            } else {
                context.save();
                context.globalAlpha = d;
                context.drawImage(filterc.canvas, 0, steph, width, height, x, y, w, h);
                context.restore();
            }
    }
    laya.display.method.GraphMethod._DrawImageFilter_ = function(context, filterc, width, height, x, y, w, h, filter) {
        context.save(114);
        context.set_globalCompositeOperation("lighter");
        var hh = height + 1;
        if (filter.r > 0.01)
            laya.display.method.GraphMethod._DrawImageFilter_one_(context, filterc, width, height, x, y, w, h, hh, filter.r);
        if (filter.g > 0.01)
            laya.display.method.GraphMethod._DrawImageFilter_one_(context, filterc, width, height, x, y, w, h, hh * 2, filter.g);
        if (filter.b > 0.01)
            laya.display.method.GraphMethod._DrawImageFilter_one_(context, filterc, width, height, x, y, w, h, hh * 3, filter.b);
        context.restore(114);
    }
    laya.display.method.GraphMethod.DrawImageFilter = function(context, file, x, y, w, h, filter) {
        if (!file.isLoaded())
            return;
        if (file._filter_canvase_ == null)
            file._filter_canvase_ = new laya.utils.FloatMap();
        var key = (filter.r != null ? filter.r : 0) + 1000 * (filter.g != null ? filter.g : 0) + 1000000 * (filter.b != null ? filter.b : 0) + 1000000 * (filter.r != null ? filter.r : 0) + (filter.gray != null ? filter.gray : 0);
        var c = file._filter_canvase_.get(key);
        if (c == null ||!c.active()) {
            c = laya.display.method.GraphMethod.CreateFilterCanvase(c, file, filter);
            file._filter_canvase_.set(key, c);
        }
        context.drawImage5(c.canvas, x, y, w, h);
    }
    laya.display.method.GraphMethod.CreateFilterCanvase = function(c, img, filter) {
        if (c == null)
            c = new laya.display.Canvas();
        var w = img.width, h = img.height;
        c.setSize(w, h);
        img.drawImage(c.context, 0, 0, w, h);
        var imageData = c.context.getImageData(0, 0, w, h);
        var pixels = imageData.data;
        var i, x;
        var fr = filter.r == null ? 1: filter.r;
        var fg = filter.g == null ? 1: filter.g;
        var fb = filter.b == null ? 1: filter.b;
        if (filter.gray == null || filter.gray < 0.01) {
            var _g = 0;
            while (_g < h) {
                var y = _g++;
                i = y * w<<2;
                x = 0;
                while (x < w) {
                    pixels[i]*=fr;
                    pixels[i + 1]*=fg;
                    pixels[i + 2]*=fb;
                    i += 4;
                    x++;
                }
            }
        } else {
            var fgray = filter.gray, fgray0 = 1 - fgray;
            var r, b, g, gray;
            var _g = 0;
            while (_g < h) {
                var y = _g++;
                i = y * w<<2;
                x = 0;
                while (x < w) {
                    r = pixels[i];
                    g = pixels[i + 1];
                    b = pixels[i + 2];
                    gray = (r + g + b) / 3;
                    pixels[i] = r * fr * fgray0 + gray * fgray;
                    pixels[i + 1] = g * fg * fgray0 + gray * fgray;
                    pixels[i + 2] = b * fb * fgray0 + gray * fgray;
                    i += 4;
                    x++;
                }
            }
        }
        c.context.putImageData(imageData, 0, 0);
        return c;
    }
    laya.display.method.GraphMethod.ImgToGrayCanvase = function(grayCanvase, img) {
        if (grayCanvase == null)
            grayCanvase = new laya.display.Canvas();
        var w = img.width, h = img.height, hh = h;
        grayCanvase.setSize(w, hh);
        img.drawImage(grayCanvase.context, 0, 0, w, h);
        var imageData = grayCanvase.context.getImageData(0, 0, w, hh);
        var pixels = imageData.data;
        var i, x;
        var _g = 0;
        while (_g < h) {
            var y = _g++;
            i = y * w<<2;
            x = 0;
            while (x < w) {
                pixels[i] = pixels[i + 1] = pixels[i + 2] = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3 | 0;
                i += 4;
                x++;
            }
        }
        grayCanvase.context.putImageData(imageData, 0, 0);
        return grayCanvase;
    }
    laya.display.method.GraphMethod.ImgToRGBCanvase = function(preCanvase, img) {
        if (preCanvase == null)
            preCanvase = new laya.display.Canvas();
        var w = img.width, h = img.height, hh = h + 1;
        preCanvase.setSize(w, hh * 4);
        img.drawImage(preCanvase.context, 0, 0, w, h);
        var imageData = preCanvase.context.getImageData(0, 0, w, hh * 4);
        var pixels = imageData.data;
        var r, g, b, a, i, x, j;
        var _g = 0;
        while (_g < h) {
            var y = _g++;
            i = y * w<<2;
            x = 0;
            while (x < w) {
                r = pixels[i];
                g = pixels[i + 1];
                b = pixels[i + 2];
                a = pixels[i + 3];
                pixels[i] = pixels[i + 1] = pixels[i + 2] = 0;
                j = ((y + hh) * w + x) * 4;
                pixels[j] = r;
                pixels[j + 1] = pixels[j + 2] = 0;
                pixels[j + 3] = a;
                j = ((y + hh * 2) * w + x) * 4;
                pixels[j + 1] = g;
                pixels[j] = pixels[j + 2] = 0;
                pixels[j + 3] = a;
                j = ((y + hh * 3) * w + x) * 4;
                pixels[j + 2] = b;
                pixels[j] = pixels[j + 1] = 0;
                pixels[j + 3] = a;
                i += 4;
                x++;
            }
        }
        preCanvase.context.putImageData(imageData, 0, 0);
        return preCanvase;
    }
    laya.display.method.GraphMethod._drawRect_ = function(node, context, x, y, cw, ch) {
        var border = node.style.data.border;
        if (border.boxShadow != null) {
            context.save(329);
            var s = border.boxShadow;
            context.setShadow(s.xoffset, s.yoffset, s.blurradius, s.color.toString());
            context.restore(329);
            if (border.radius != null) {
                laya.display.method.GraphMethod.RoundRect(node, context, x, y, cw, ch, border.radius[0], node.style.data.bgcolor.color != null);
                return;
            }
        }
        if (border.radius != null) {
            laya.display.method.GraphMethod.RoundRect(node, context, x, y, cw, ch, border.radius[0], true);
            return;
        }
        if (border.color == null)
            return;
        if (border.color != null && border.simpleBorder) {
            context.set_lineWidth(border.left);
            var d = border.left / 2;
            context.set_strokeStyle(border.color.toString());
            context.strokeRect(x + d, y + d, cw - d * 2, ch - d * 2);
        }
    }
    laya.display.method.GraphMethod.addColorBorder = function(ctx, x, y, w, h, color) {
        var imageData = ctx.getImageData(x, y, w, h);
        var pixels = imageData.data;
        var a, na, i, ix;
        var rgb = color.toRgb();
        var tr = rgb[0], tg = rgb[1], tb = rgb[2], ta = Laya.parseInt(rgb[3]), ti, i1, s;
        var mkpixels = [];
        i1 = 0;
        s = Laya.parseInt(pixels.length / 4);
        while (i1 < s) {
            mkpixels[i1] = 0;
            i1++;
        }
        var akey1 = 1.5;
        var akey2 = 0.6;
        var akey3 = 0.4;
        var _g = 0;
        while (_g < h) {
            var y1 = _g++;
            i1 = y1 * w<<2;
            ix = 0;
            while (ix < w) {
                if (pixels[i1 + 3] > 40) {
                    i1 += 4;
                    ix++;
                    continue;
                }
                ti = i1>>2;
                a = pixels[i1 + 3] * akey1;
                if (ix > 0)
                    mkpixels[ti-1] = a;
                if (ix < w-1)
                    mkpixels[ti + 1] = a;
                if (y1 > 0)
                    mkpixels[ti - w] = a;
                if (y1 < h-1)
                    mkpixels[ti + w] = a;
                i1 += 4;
                ix++;
            }
        }
        i1 = 0;
        s = pixels.length;
        while (i1 < s) {
            if (pixels[i1 + 3] > 40) {
                i1 += 4;
                continue;
            }
            a = mkpixels[i1>>2];
            if (a >= 250) {
                pixels[i1] = tr;
                pixels[i1 + 1] = tg;
                pixels[i1 + 2] = tb;
                pixels[i1 + 3] = a;
            } else {
                var a0 = pixels[i1 + 3];
                pixels[i1] = (tr * a + pixels[i1]) / 2;
                pixels[i1 + 1] = (tg * a + pixels[i1 + 1]) / 2;
                pixels[i1 + 2] = (tb * a + pixels[i1 + 2]) / 2;
                pixels[i1 + 3] = (a + a0) / 2;
            }
            i1 += 4;
        }
        ctx.putImageData(imageData, x, y);
    }
    laya.display.method.GraphMethod.RoundRect = function(node, context, x, y, width, height, radius, fill) {
        var border = node.style.data.border;
        var bgcolor = node.style.data.bgcolor.color;
        if (border.color == null && bgcolor == null)
            return;
        var d = border.left / 2;
        if (border.color != null) {
            context.set_strokeStyle(border.color.toString());
            context.set_lineWidth(border.left);
        } else {
            context.set_lineWidth(1);
            d*=2;
        }
        x += d;
        y += d;
        width -= d * 2;
        height -= d * 2;
        context.beginPath();
        context.moveTo(x + radius, y);
        context.lineTo(x + width - radius, y);
        context.quadraticCurveTo(x + width, y, x + width, y + radius);
        context.lineTo(x + width, y + height - radius);
        context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        context.lineTo(x + radius, y + height);
        context.quadraticCurveTo(x, y + height, x, y + height - radius);
        context.lineTo(x, y + radius);
        context.quadraticCurveTo(x, y, x + radius, y);
        context.closePath();
        if (bgcolor != null && fill) {
            context.set_fillStyle(bgcolor.toString());
            context.fill();
        }
        if (border.color != null)
            context.stroke();
    }
    laya.display.method.GraphMethod._drawSimpleBgImg_ = function(node, context, file, x, y, cw, ch, bx, by) {
        if (x > cw || y > ch)
            return false;
        var ex = x + file.width, ey = y + file.height, dx = 0, dy = 0;
        if (x < 0) {
            dx =- x;
            x = 0;
        }
        if (y < 0) {
            dy =- y;
            y = 0;
        }
        if (ex > cw)
            ex = cw;
        if (ey > ch)
            ey = ch;
        cw = ex - x;
        ch = ey - y;
        if (cw < 1 || ch < 1)
            return false;
        context.drawImage9(file.image, dx, dy, cw, ch, x + bx, y + by, cw, ch);
        return true;
    }
    laya.display.method.GraphMethod.prototype = {
        __class__: laya.display.method.GraphMethod
    }
    laya.display.method.ClipRect = function(x, y, w, h) {
        this.set(x, y, w, h);
    };
    laya.display.method.ClipRect.__name__ = true;
    laya.display.method.ClipRect.prototype = {
        inY: function(y, h) {
            return false;
        },
        merge: function(x, y, w, h) {
            var ex = x + w, ey = y + h;
            if (x > this.left)
                this.left = x;
            if (y > this.top)
                this.top = y;
            if (this.right > ex)
                this.right = ex;
            if (this.bottom > ey)
                this.bottom = ey;
            this.width = this.right - this.left;
            this.height = this.bottom - this.top;
        },
        release: function() {
            laya.display.method.ClipRect.__cache__.push(this);
        },
        clone: function() {
            var n = laya.display.method.ClipRect.__cache__.pop();
            if (n == null)
                n = new laya.display.method.ClipRect(this.left, this.top, this.width, this.height);
            else {
                n.left = this.left;
                n.top = this.top;
                n.width = this.width;
                n.height = this.height;
                n.right = this.right;
                n.bottom = this.bottom;
            }
            return n;
        },
        set: function(x, y, w, h) {
            this.left = x;
            this.top = y;
            this.width = w;
            this.height = h;
            this.right = this.left + this.width;
            this.bottom = this.top + this.height;
        },
        __class__: laya.display.method.ClipRect
    }
    laya.display.method.RenderMethod = function() {};
    laya.display.method.RenderMethod.__name__ = true;
    laya.display.method.RenderMethod.fillImage = function(r, node, context, x, y, w, h) {
        var style = node.style;
        var bgimg = style.data.bgImg;
        var file = bgimg.imgFile;
        if (!file.isLoaded())
            return;
        var p = bgimg.getPosition();
        if (bgimg.repeat == null || w < file.width && h < file.height) {
            laya.display.method.GraphMethod._drawSimpleBgImg_(node, context, file, p.left, p.top, w, h, x, y);
            return;
        }
        var pattern = context.createPattern(file.image, bgimg.repeat);
        x += p.left;
        y += p.top;
        context.save(164);
        if (x != 0 || y != 0)
            context.translate(x, y);
        context.set_fillStyle(pattern);
        context.fillRect( - p.left, - p.top, node.get_width(), node.get_height());
        context.restore(164);
    }
    laya.display.method.RenderMethod._paint_word = function(r, node, context, bx, by) {
        var font = node.font;
        var word = node.word;
        if (font.get_password())
            word = "*";
        var fontTxt = font._toText_();
        if (context._canvas_._fontTxt_ != fontTxt) {
            context._canvas_._fontTxt_ = fontTxt;
            if (Laya._ISHTML5_)
                context.set_font(fontTxt);
            else 
                context.setFontID(fontTxt, font.fontId);
            context.set_textAlign("left");
            context.set_textBaseline("middle");
        }
        var x = Laya.Round(bx + node.left);
        var y = Laya.Round(by + node.top + font.size / 2);
        if (Laya._ISHTML5_ && font.textBorder != null) {
            x++;
            y++;
            context.set_fillStyle(font.textBorder.color.toString());
            context.fillText(word, x-1, y);
            context.fillText(word, x + 1, y);
            context.fillText(word, x, y-1);
            context.fillText(word, x, y + 1);
        }
        context.set_fillStyle(font.color.toString());
        context.fillText(word, x, y);
        if (font.textDecoration != 0) {
            context.save(209);
            var color = font.textDecorationColor == null ? font.color: font.textDecorationColor;
            context.set_strokeStyle(color.toString());
            var yy = by + node.top + 1;
            var xx = x + node.width + font.exdata.letterSpacing;
            context.beginPath();
            switch (font.textDecoration) {
            case 1:
                yy += node.height-0.5;
                context.moveTo(x, yy);
                context.lineTo(xx, yy);
                break;
            case 2:
                yy += Laya.Round(node.height / 2) + 0.5;
                context.moveTo(x, yy);
                context.lineTo(xx, yy);
                break;
            case 3:
                yy += 0.5;
                context.moveTo(x, yy);
                context.lineTo(xx, yy);
                break;
            }
            context.stroke();
            if (font.textBorder != null) {
                context.set_strokeStyle(font.textBorder.color.toString());
                context.set_lineWidth(1);
                context.beginPath();
                context.moveTo(x, yy-1);
                context.lineTo(xx, yy-1);
                context.moveTo(x, yy + 1);
                context.lineTo(xx, yy + 1);
                context.closePath();
                context.stroke();
            }
            context.restore(209);
        }
    }
    laya.display.method.RenderMethod._paint_word_customFont = function(r, node, context, bx, by) {
        var imgFile = node.fileImg;
        if (imgFile != null && imgFile["use"]())
            imgFile.drawImage(context, bx + node.left, by + node.top, node.width, node.height);
    }
    laya.display.method.RenderMethod.base_simple_childs_notxt = function(r, pnode, context, bx, by) {
        laya.element.method.ElementMethod.childsSort(pnode);
        var style = pnode.style;
        var cx = style.m_left + style.m_marginLeft + bx, cy = style.m_top + style.m_marginTop + by;
        if (cx != 0 || cy != 0)
            context.translate(cx, cy);
        if (pnode._renderNode != null) {
            if (pnode._repaintType_ == 0 && pnode._renderNode.useCache()) {
                if (cx != 0 || cy != 0)
                    context.translate( - cx, - cy);
                return;
            }
            pnode._renderNode.renderStart();
        }
        var childs = pnode.childNodes, node;
        var i = 0, isz = childs.length;
        while (i < isz) {
            if ((node = childs[i]) == null || node.hidden > 0 || node._inTypesetLine_ != null) {
                i++;
                continue;
            }
            node._paintfn_.call(r, r, node, context, bx, by);
            node._repaintType_ = 0;
            i++;
        }
        if (pnode._renderNode != null)
            pnode._renderNode.renderEnd();
        if (cx != 0 || cy != 0)
            context.translate( - cx, - cy);
    }
    laya.display.method.RenderMethod.base_simple_childs = function(r, pnode, context, bx, by) {
        laya.element.method.ElementMethod.childsSort(pnode);
        var style = pnode.style;
        var cx = style.m_left + style.m_marginLeft + bx, cy = style.m_top + style.m_marginTop + by;
        if (cx != 0 || cy != 0)
            context.translate(cx, cy);
        if (pnode._renderNode != null) {
            if (pnode._repaintType_ == 0 && pnode._renderNode.useCache()) {
                if (cx != 0 || cy != 0)
                    context.translate( - cx, - cy);
                return;
            }
            pnode._renderNode.renderStart();
        }
        if (pnode.typesetLines != null && (pnode._matter_ & 4194304) != 4194304)
            laya.display.method.RenderMethod.paintTypesetLines(r, pnode, context, 0, 0, style.overflow != null);
        var childs = pnode.childNodes, node, ps = 0;
        var i = 0, isz = childs.length;
        while (i < isz) {
            i++;
            if ((node = childs[i-1]) == null || node.hidden > 0 || node._inTypesetLine_ != null)
                continue;
            ps++;
            node._paintfn_.call(r, r, node, context, bx, by);
            node._repaintType_ = 0;
        }
        if (pnode._renderNode != null)
            pnode._renderNode.renderEnd();
        if (cx != 0 || cy != 0)
            context.translate( - cx, - cy);
    }
    laya.display.method.RenderMethod.base_base_childs = function(r, pnode, context, bx, by) {
        laya.element.method.ElementMethod.childsSort(pnode);
        if (pnode._renderNode != null) {
            if (pnode._repaintType_ == 0 && pnode._renderNode.useCache())
                return;
            pnode._renderNode.renderStart();
        }
        if (pnode.typesetLines != null && (pnode._matter_ & 4194304) != 4194304)
            laya.display.method.RenderMethod.paintTypesetLines(r, pnode, context, 0, 0, pnode.style.overflow != null);
        var childs = pnode.childNodes, node;
        var i = 0, isz = childs.length;
        while (i < isz) {
            i++;
            if ((node = childs[i-1]) == null || node.hidden > 0 || node._inTypesetLine_ != null)
                continue;
            node._paintfn_.call(r, r, node, context, bx, by);
            node._repaintType_ = 0;
        }
        if (pnode._renderNode != null)
            pnode._renderNode.renderEnd();
    }
    laya.display.method.RenderMethod.paint_img_onpaint = function(r, node, context, bx, by) {
        var _matter_ = node._matter_, style = node.style;
        var cx = style.m_left + style.m_marginLeft + bx, cy = style.m_top + style.m_marginTop + by;
        if ((_matter_ & 64) == 64 && (node.file != null && node.file.isLoaded())) {
            if (context._filter_ == null ||!Laya._ISHTML5_)
                node.file.drawImage(context, cx, cy, node.style.m_width, node.style.m_height);
            else 
                laya.display.method.GraphMethod.DrawImageFilter(context, node.file.toFileImg(), cx, cy, node.style.m_width, node.style.m_height, context._filter_);
        }
        if ((_matter_ & 65536) == 65536)
            node.onpaint(context._canvas_);
    }
    laya.display.method.RenderMethod.paint_transform_alpha = function(r, node, context, bx, by, prc) {
        var style = node.style;
        var bsave = 0;
        if (style.m_alpha != null && style.m_alpha < 1) {
            if (style.m_alpha < 0.01)
                return;
            bsave = 2;
            context.save(721);
            context.set_globalAlpha(style.m_alpha);
        }
        var cx = style.m_left + style.m_marginLeft + bx, cy = style.m_top + style.m_marginTop + by;
        if (style.m_globalCompositeOperation != null) {
            if (bsave == 0) {
                bsave = 2;
                context.save(721);
            }
            context.set_globalCompositeOperation(style.m_globalCompositeOperation);
        }
        if (style.transform.style != null) {
            if (bsave == 0) {
                bsave = 2;
                context.save(721);
            }
            var tfm = style.transform;
            tfm.translateByTransformOrigin(style);
            var dx = cx + tfm.translateX, dy = cy + tfm.translateY, flipx, flipy;
            if (style.get_flip() != null) {
                flipx = Math.floor(style.get_flip() / 10);
                flipy = style.get_flip()%10;
                dx += flipx == 2 ? style.m_marginLeft == 0 ? style.m_width / 2 : - style.m_marginLeft : 0;
                dy += flipy == 2 ? style.m_marginTop == 0 ? style.m_height / 2 : - style.m_marginTop : 0;
                dx = Laya.Round(dx);
                dy = Laya.Round(dy);
                if (dx != 0 || dy != 0)
                    context.translate(dx, dy);
                context.scale(flipx > 0?-1 : 1, flipy > 0?-1 : 1);
            } else if (dx != 0 || dy != 0)
                context.translate(dx, dy);
            if (tfm.scaleX != 1 || tfm.scaleY != 1)
                context.scale(tfm.scaleX, tfm.scaleY);
            if (tfm.rotate != 0)
                context.rotate(Math.PI * tfm.rotate / 180);
            if (dx != 0 || dy != 0)
                context.translate( - dx, - dy);
        } else if (style.get_flip() != null) {
            if (bsave == 0) {
                bsave = 2;
                context.save(721);
            }
            var flipx = Math.floor(style.get_flip() / 10), flipy = style.get_flip()%10;
            var dx = cx + (flipx == 2 ? style.m_marginLeft == 0 ? Math.floor(style.m_width / 2) : - style.m_marginLeft : 0);
            var dy = cy + (flipy == 2 ? style.m_marginTop == 0 ? Math.floor(style.m_height / 2) : - style.m_marginTop : 0);
            dx = Laya.Round(dx);
            dy = Laya.Round(dy);
            if (dx != 0 || dy != 0) {
                context.translate(dx, dy);
                context.scale(flipx > 0?-1 : 1, flipy > 0?-1 : 1);
                context.translate( - dx, - dy);
            } else 
                context.scale(flipx > 0?-1 : 1, flipy > 0?-1 : 1);
        }
        prc.call(null, r, node, context, bx, by);
        if (bsave > 0)
            context.restore(721);
    }
    laya.display.method.RenderMethod.paint_transform_alpha_overflow_childs = function(r, node, context, bx, by, prc) {
        var style = node.style;
        if (style.overflow != null && (style.m_width < 1 || style.m_height < 1))
            return;
        var bsave = 0;
        if (style.m_alpha != null && style.m_alpha < 1) {
            if (style.m_alpha < 0.01)
                return;
            bsave = 2;
            context.save(721);
            context.set_globalAlpha(style.m_alpha);
        }
        var cx = style.m_left + style.m_marginLeft + bx, cy = style.m_top + style.m_marginTop + by;
        if (style.m_globalCompositeOperation != null) {
            if (bsave == 0) {
                bsave = 2;
                context.save(721);
            }
            context.set_globalCompositeOperation(style.m_globalCompositeOperation);
        }
        if (style.transform.style != null) {
            if (bsave == 0) {
                bsave = 2;
                context.save(721);
            }
            var tfm = style.transform;
            tfm.translateByTransformOrigin(style);
            var dx = cx + tfm.translateX, dy = cy + tfm.translateY, flipx, flipy;
            if (style.get_flip() != null) {
                flipx = Math.floor(style.get_flip() / 10);
                flipy = style.get_flip()%10;
                dx += flipx == 2 ? style.m_marginLeft == 0 ? style.m_width / 2 : - style.m_marginLeft : 0;
                dy += flipy == 2 ? style.m_marginTop == 0 ? style.m_height / 2 : - style.m_marginTop : 0;
                dx = Laya.Round(dx);
                dy = Laya.Round(dy);
                if (dx != 0 || dy != 0)
                    context.translate(dx, dy);
                context.scale(flipx > 0?-1 : 1, flipy > 0?-1 : 1);
            } else if (dx != 0 || dy != 0)
                context.translate(dx, dy);
            if (tfm.scaleX != 1 || tfm.scaleY != 1)
                context.scale(tfm.scaleX, tfm.scaleY);
            if (tfm.rotate != 0)
                context.rotate(Math.PI * tfm.rotate / 180);
            if (dx != 0 || dy != 0)
                context.translate( - dx, - dy);
        } else if (style.get_flip() != null) {
            if (bsave == 0) {
                bsave = 2;
                context.save(721);
            }
            var flipx = Math.floor(style.get_flip() / 10), flipy = style.get_flip()%10;
            var dx = cx + (flipx == 2 ? style.m_marginLeft == 0 ? Math.floor(style.m_width / 2) : - style.m_marginLeft : 0);
            var dy = cy + (flipy == 2 ? style.m_marginTop == 0 ? Math.floor(style.m_height / 2) : - style.m_marginTop : 0);
            dx = Laya.Round(dx);
            dy = Laya.Round(dy);
            if (dx != 0 || dy != 0) {
                context.translate(dx, dy);
                context.scale(flipx > 0?-1 : 1, flipy > 0?-1 : 1);
                context.translate( - dx, - dy);
            } else 
                context.scale(flipx > 0?-1 : 1, flipy > 0?-1 : 1);
        }
        var extd = node.extData;
        cx -= extd.scrollLeft;
        cy -= extd.scrollTop;
        laya.element.method.ElementMethod.childsSort(node);
        if (style.overflow != null) {
            if (bsave == 0) {
                bsave = 2;
                context.save(721);
            }
            var ddx =- cx + style.m_marginLeft + style.get_left();
            var ddy =- cy + style.m_marginTop + style.get_top();
            context.beginPath();
            context.rect(ddx + cx, ddy + cy, style.m_width, style.m_height);
            context.clip();
            if (cx != 0 || cy != 0)
                context.translate(cx, cy);
        } else if (cx != 0 || cy != 0) {
            if (bsave == 0) {
                bsave = 2;
                context.save(721);
            }
            context.translate(cx, cy);
        }
        prc.call(r, r, node, context, bx, by);
        if (bsave > 0)
            context.restore(721);
    }
    laya.display.method.RenderMethod.paint_filter = function(r, node, context, bx, by, prc) {
        var filterset = false, filter = context._filter_;
        if (node.style.m_filter != null) {
            filterset = true;
            if (filter != null) {
                var f = node.style.m_filter;
                context._filter_ = {
                    r: filter.r * f.r,
                    g: filter.g * f.g,
                    b: filter.b * f.b,
                    gray: f.gray
                };
                if (!Laya._ISHTML5_) {
                    var fGray1 = filter.gray != null ? filter.gray: 0;
                    var fGray2 = f.gray != null ? f.gray: 0;
                    var fGray = 1 - (1 - fGray1) * (1 - fGray2);
                    context.setFilter(filter.r * f.r, filter.g * f.g, filter.b * f.b, fGray);
                }
            } else {
                context._filter_ = node.style.m_filter;
                if (!Laya._ISHTML5_) {
                    var f = node.style.m_filter;
                    context.setFilter(f.r, f.g, f.b, f.gray != null ? f.gray : 0);
                }
            }
        }
        prc.call(null, r, node, context, bx, by);
        if (filterset) {
            if (!Laya._ISHTML5_) {
                if (filter != null)
                    context.setFilter(filter.r, filter.g, filter.b, filter.gray != null ? filter.gray : 0);
                else 
                    context.setFilter(1, 1, 1, 0);
            }
            context._filter_ = filter;
        }
    }
    laya.display.method.RenderMethod.paint_scale_alpha = function(r, node, context, bx, by, prc) {
        var style = node.style;
        var bsave = 0;
        if (style.m_alpha != null && style.m_alpha < 1) {
            if (style.m_alpha < 0.01)
                return;
            bsave = 2;
            context.save(721);
            context.set_globalAlpha(style.m_alpha);
        }
        if (style.transform.style != null) {
            var cx = style.m_left + style.m_marginLeft + bx, cy = style.m_top + style.m_marginTop + by;
            if (bsave == 0) {
                bsave = 2;
                context.save(721);
            }
            var tfm = style.transform;
            tfm.translateByTransformOrigin(style);
            var dx = cx + tfm.translateX, dy = cy + tfm.translateY, flipx, flipy;
            if (dx != 0 || dy != 0)
                context.translate(dx, dy);
            if (tfm.scaleX != 1 || tfm.scaleY != 1)
                context.scale(tfm.scaleX, tfm.scaleY);
            if (dx != 0 || dy != 0)
                context.translate( - dx, - dy);
        }
        prc.call(null, r, node, context, bx, by);
        if (bsave > 0)
            context.restore(721);
    }
    laya.display.method.RenderMethod.base_onpaint = function(r, node, context, bx, by) {
        node.onpaint(context._canvas_);
    }
    laya.display.method.RenderMethod.base_static_img = function(r, node, context, bx, by) {
        if (node.file.isLoaded()) {
            var style = node.style;
            var xx = style.m_left + style.m_marginLeft + bx, yy = style.m_top + style.m_marginTop + by;
            if (context._filter_ == null ||!Laya._ISHTML5_)
                node.file.drawImage(context, xx, yy, style.m_width, style.m_height);
            else 
                laya.display.method.GraphMethod.DrawImageFilter(context, node.file.toFileImg(), xx, yy, style.m_width, style.m_height, context._filter_);
        }
    }
    laya.display.method.RenderMethod.base_static_text = function(r, node, context, bx, by) {
        if (node.typesetLines != null && (node._matter_ & 4194304) != 4194304) {
            var style = node.style;
            var cx = style.m_left + style.m_marginLeft + bx, cy = style.m_top + style.m_marginTop + by;
            if (style.overflow != null) {
                if (style.m_width < 1 || style.m_height < 1)
                    return;
                var ddx =- cx + style.m_marginLeft + style.get_left();
                var ddy =- cy + style.m_marginTop + style.get_top();
                context.save(721);
                context.beginPath();
                context.rect(ddx + cx, ddy + cy, style.m_width, style.m_height);
                context.clip();
                laya.display.method.RenderMethod.paintTypesetLines(r, node, context, cx, cy, true);
                context.restore(721);
            } else 
                laya.display.method.RenderMethod.paintTypesetLines(r, node, context, cx, cy, false);
        }
    }
    laya.display.method.RenderMethod.base_static_img_childs = function(r, node, context, bx, by) {
        if (node.file.isLoaded()) {
            var style = node.style;
            var xx = style.m_left + style.m_marginLeft + bx, yy = style.m_top + style.m_marginTop + by;
            if (context._filter_ == null ||!Laya._ISHTML5_)
                node.file.drawImage(context, xx, yy, style.m_width, style.m_height);
            else 
                laya.display.method.GraphMethod.DrawImageFilter(context, node.file.toFileImg(), xx, yy, style.m_width, style.m_height, context._filter_);
        }
        laya.display.method.RenderMethod.base_simple_childs(r, node, context, bx, by);
    }
    laya.display.method.RenderMethod.paintTypesetLines = function(r, node, context, bx, by, isClip) {
        var lines = node.typesetLines, c, line, lcanvas;
        var y, ss = 0;
        var i = 0, sz = lines.length, j, jsz;
        while (i < sz) {
            i++;
            if ((line = lines[i-1]).isEmpty() || line.height < 1)
                continue;
            ss++;
            lcanvas = line.getCanvas();
            if (!lcanvas.active() || line.bRepaint) {
                lcanvas.setSize(line.width + 8, line.height + 8);
                line.bRepaint = false;
                lcanvas.clear();
                var nodes = line.nodes;
                var lcontext = lcanvas.context;
                var o;
                j = 0;
                jsz = nodes.length;
                while (j < jsz) {
                    j++;
                    if ((o = nodes[j-1]) == null)
                        continue;
                    if (o.isWordNode()) {
                        o._paintfn_.call(r, r, o, lcontext, - line.left, - line.top);
                        continue;
                    }
                    if (o["delete"]) {
                        nodes[j-1] = null;
                        continue;
                    }
                    if (o.hidden == 0)
                        o._paintfn_.call(r, r, o, lcontext, - line.left, - line.top);
                }
            }
            context.drawImage3(lcanvas.canvas, bx + line.left, by + line.top);
        }
    }
    laya.display.method.RenderMethod.base_none = function(r, pnode, context, bx, by) {}
    laya.display.method.RenderMethod._paint_childs_clip = function(r, pnode, context, bx, by, clipmode) {
        var childs = pnode.childNodes, node;
        var style;
        var left = pnode.get_scrollLeft();
        var top = pnode.get_scrollTop();
        var right = pnode.get_offsetWidth() + left;
        var bottom = pnode.get_offsetHeight() + top;
        var i = 0, isz = childs.length;
        while (i < isz) {
            i++;
            if ((node = childs[i-1]) == null || node.hidden > 0 || node._inTypesetLine_ != null)
                continue;
            style = node.style;
            if ((style._type_ & 16777216) == 16777216) {
                if (style.m_left > right) {
                    if (clipmode == 10)
                        break;
                    continue;
                }
                if (style.m_top > bottom) {
                    if (clipmode == 1)
                        break;
                    continue;
                }
                if (style.m_left + style.m_width < left)
                    continue;
                if (style.m_top + style.m_height < top)
                    continue;
            }
            node._paintfn_.call(r, r, node, context, bx, by);
            node._repaintType_ = 0;
        }
    }
    laya.display.method.RenderMethod.prototype = {
        __class__: laya.display.method.RenderMethod
    }
    laya.edit = {}
    laya.edit.EditNodeInfo = function(node) {
        this.willSave = false;
        this.editParam = [];
        this.node = node._toElement_();
    };
    laya.edit.EditNodeInfo.__name__ = true;
    laya.edit.EditNodeInfo.prototype = {
        __class__: laya.edit.EditNodeInfo
    }
    laya.edit.EditOneData = function(node) {
        this.node = node;
        this.left = node.get_left();
        this.top = node.get_top();
    };
    laya.edit.EditOneData.__name__ = true;
    laya.edit.EditOneData.prototype = {
        __class__: laya.edit.EditOneData
    }
    laya.edit.EditInfo = function() {
        this._nodeIsEdit_ = false;
        this.editingNode = null;
        this.editNodes = [];
        this.editList = [];
    };
    laya.edit.EditInfo.__name__ = true;
    laya.edit.EditInfo.encodeURI = function(txt) {
        return null;
    }
    laya.edit.EditInfo.prototype = {
        saveEditToFile: function() {
            if (this.editNodes.length < 1)
                return false;
            if (!this._nodeIsEdit_)
                return true;
            this._nodeIsEdit_ = true;
            var _g1 = 0, _g = this.editNodes.length;
            while (_g1 < _g) {
                var i = _g1++;
                var o = this.editNodes[i];
                if (!o.willSave)
                    continue;
                var file = o.node.getCreateFile();
                if (file._private_.editedData == null)
                    file._private_.editedData = file.getData();
                file._private_.editedWillSave = true;
                var eposCheckIndex = o.node._private_.editposmarkinfile;
                var text = file._private_.editedData;
                var j = 0;
                var eposCharIndex =- 1;
                var i1 = text.indexOf("<body>"), eposi = 0;
                if (i1 < 0)
                    i1 = 0;
                while (eposCharIndex < 0 && i1 < text.length) {
                    var c = text.charAt(i1);
                    if (c == "<" && text.substring(i1, i1 + 4) == "<!--") {
                        var s = text.indexOf("-->", i1 + 4);
                        if (s < 0) {
                            Laya.alert("save err:" + " no --> pos=" + i1 + " " + file.getUrl());
                            return false;
                        }
                        i1 = s + 4;
                        continue;
                    }
                    if (c == "<" && text.substring(i1, i1 + 8) == "<script>") {
                        var s = text.indexOf("</script>", i1 + 8);
                        if (s < 0) {
                            Laya.alert("save err:" + " no </script> pos=" + i1 + " " + file.getUrl());
                            return false;
                        }
                        i1 = s + 4;
                    }
                    if (c == "\"" || c == "'") {
                        var s = text.indexOf(c, i1 + 1);
                        if (s < 0) {
                            Laya.alert("save err:" + " no " + c + " " + file.getUrl());
                            return false;
                        }
                        i1 = s + 1;
                        continue;
                    }
                    if (c == "e" && text.substring(i1, i1 + 4) == "epos") {
                        i1 += 4;
                        var _g3 = i1, _g2 = text.length;
                        while (_g3 < _g2) {
                            var j1 = _g3++;
                            c = text.charAt(j1);
                            if (c == "=") {
                                if (eposi == eposCheckIndex) {
                                    eposCharIndex = j1 + 1;
                                    var _g5 = eposCharIndex, _g4 = text.length;
                                    while (_g5 < _g4) {
                                        var k = _g5++;
                                        var c1 = text.charAt(k);
                                        if (c1 == "\"" || c1 == "'") {
                                            var next = text.indexOf(c1, k + 1);
                                            if (next < 0) {
                                                console.log("save err:" + eposCheckIndex + " " + file.getUrl());
                                                return false;
                                            }
                                            file._private_.editedData = text.substring(0, eposCharIndex) + "\"" + o.node.get_left() + " " + o.node.get_top() + "\"" + text.substring(next + 1, text.length);
                                            break;
                                        }
                                    }
                                }
                                eposi++;
                                break;
                            }
                            if (c != " " && c != "\n") {
                                console.log("err c:[" + c + "]");
                                break;
                            }
                        }
                        continue;
                    }
                    i1++;
                }
                if (eposCharIndex < 0) {
                    Laya.alert("save err:" + eposCheckIndex + " eposCharIndex<0 " + file.getUrl());
                    return false;
                }
                o.willSave = false;
            }
            var editfiles = [];
            var _g1 = 0, _g = this.editNodes.length;
            while (_g1 < _g) {
                var i = _g1++;
                var o = this.editNodes[i];
                var file = o.node.getCreateFile();
                if (file._private_.editedWillSave != true)
                    continue;
                file._private_.editedWillSave = false;
                editfiles.push(file);
            }
            if (editfiles.length > 0) {
                var filesname = "";
                var _g1 = 0, _g = editfiles.length;
                while (_g1 < _g) {
                    var i = _g1++;
                    var file = editfiles[i];
                    if (laya.io.FileFactory.WriteTextFile(file.getUrl(), file._private_.editedData))
                        filesname += i + 1 + "....." + file.getUrl() + "\n";
                    else {
                        var _g2 = 0;
                        while (_g2 < 3) {
                            var j = _g2++;
                            if (laya.io.FileFactory.WriteTextFile(file.getUrl(), file._private_.editedData)) {
                                filesname += i + 1 + "....." + file.getUrl() + "\n";
                                break;
                            }
                        }
                    }
                }
                if (filesname.length > 0)
                    Laya.alert("save edit html:\n" + filesname);
            }
            return true;
        },
        checkEditingElement: function(event) {
            var x = event.clientX;
            var y = event.clientY;
            this._editMouseStartX_ = x;
            this._editMouseStartY_ = y;
            var node = Laya.document.body.pointElement(x, y, function(node1, x1, y1) {
                if (node1.hidden != 0)
                    return -1;
                if (!((node1._type_ & 1073741824) == 1073741824))
                    return 1;
                return 2;
            });
            if (node != null)
                this.nodeIsEdit(node);
            if (this.editingNode != null) {
                this._editOffsetX = x - this.editingNode.get_left();
                this._editOffsetY = y - this.editingNode.get_top();
            }
        },
        moveEditingElement: function(event) {
            if (this.editingNode != null) {
                var prex = this.editingNode.get_left();
                var prey = this.editingNode.get_top();
                this.editingNode.set_left(event.clientX - this._editOffsetX);
                this.editingNode.set_top(event.clientY - this._editOffsetY);
                var _g = this._tips_;
                _g.set_left(_g.get_left() + (this.editingNode.get_left() - prex));
                var _g = this._tips_;
                _g.set_top(_g.get_top() + (this.editingNode.get_top() - prey));
            }
        },
        acceptKeyEvent: function(event) {
            if (event.ctrlKey) {
                if (event.type != 2)
                    return false;
                switch (event.keyCode) {
                case 113:
                case 192:
                    Laya.document.editing=!Laya.document.editing;
                    this._createTipS();
                    if (Laya.document.activeInputElement != null)
                        Laya.document.activeInputElement.blur();
                    Laya.document.body.repaint();
                    return false;
                case 83:
                    this.saveEditToFile();
                    return false;
                case 90:
                    this._ctr_z();
                    return false;
                }
            }
            if (this.editingNode == null)
                return false;
            switch (event.keyCode) {
            case 37:
                if (event.type == 2)
                    this._saveToEditList();
                var _g = this.editingNode, _g1 = _g.get_left();
                _g.set_left(_g1-1);
                _g1;
                this._reflushEditMsg_();
                return false;
            case 39:
                if (event.type == 2)
                    this._saveToEditList();
                var _g = this.editingNode, _g1 = _g.get_left();
                _g.set_left(_g1 + 1);
                _g1;
                this._reflushEditMsg_();
                return false;
            case 38:
                if (event.type == 2)
                    this._saveToEditList();
                var _g = this.editingNode, _g1 = _g.get_top();
                _g.set_top(_g1-1);
                _g1;
                this._reflushEditMsg_();
                return false;
            case 40:
                if (event.type == 2)
                    this._saveToEditList();
                var _g = this.editingNode, _g1 = _g.get_top();
                _g.set_top(_g1 + 1);
                _g1;
                this._reflushEditMsg_();
                return false;
            }
            if (event.type != 2)
                return false;
            switch (event.keyCode) {
            case 36:
                this.choicePreElement(this.editingNode);
                break;
            case 35:
                this.choiceNextElement(this.editingNode);
                break;
            }
            return false;
        },
        _createTipS: function() {
            if (this._tips_ == null) {
                this._tips_ = Laya.document.body.appendChild("div");
                this._tips_.pos(100, -10000);
                this._tips_.cssText("margin-top:-18;border:1 s gray;alpha2:0.88;z-index:9999999;border-radius:4px;height:12;width:auto;min-width:300;font-size:12px;color:white;background:black;vertical-align:middle;box-shadow:1px 1px 6px #222222;padding:1px;padding-left:8px;padding-right:8px;");
                this._tips_.created();
            }
            if (!Laya.document.editing)
                this._tips_.show(false);
        },
        choicePreElement: function(src) {
            if (src == null)
                return false;
            if (src.hidden != 0 ||!((src._type_ & 1073741824) == 1073741824))
                return false;
            var node = src;
            var p = node.parentNode;
            if (p == null)
                return false;
            var index = p.indexOf(node);
            while (--index >= 0) {
                var c = p.childNodes[index];
                if (c == null)
                    continue;
                if (c.hidden == 0 && (c._type_ & 1073741824) == 1073741824) {
                    this.nodeIsEdit(c._toElement_());
                    return true;
                }
            }
            while (true) {
                node = node.parentNode;
                if (node == null)
                    break;
                if (node.hidden == 0 && (node._type_ & 1073741824) == 1073741824 || this.choicePreElement(node._toElement_())) {
                    this.nodeIsEdit(node._toElement_());
                    return true;
                }
            }
            return false;
        },
        choiceNextElement: function(src) {
            if (src == null)
                return false;
            if (src.hidden != 0)
                return false;
            var node = src;
            var p = node.parentNode;
            if (p == null)
                return false;
            var index = p.indexOf(node);
            var _g1 = index + 1, _g = p.childNodes.length;
            while (_g1 < _g) {
                var i = _g1++;
                var c = p.childNodes[i];
                if (c == null)
                    continue;
                if (c.hidden == 0 && (c._type_ & 1073741824) == 1073741824) {
                    this.nodeIsEdit(c._toElement_());
                    return true;
                }
            }
            var _g1 = 0, _g = node.childNodes.length;
            while (_g1 < _g) {
                var i = _g1++;
                var c = node.childNodes[i];
                if (c == null)
                    continue;
                if (c.hidden == 0 && (c._type_ & 1073741824) == 1073741824) {
                    this.nodeIsEdit(c._toElement_());
                    return true;
                }
            }
            var _g1 = 0, _g = node.childNodes.length;
            while (_g1 < _g) {
                var i = _g1++;
                var c = node.childNodes[i];
                if (c == null)
                    continue;
                if (c.hidden == 0 && this.choiceNextElement(c._toElement_())) {
                    this.nodeIsEdit(c._toElement_());
                    return true;
                }
            }
            return false;
        },
        acceptMouseEvent: function(event) {
            switch (event.type) {
            case 1:
                this.checkEditingElement(event);
                this._saveToEditList();
                break;
            case 16:
                if (event.press > 0) {
                    this.moveEditingElement(event);
                    this._reflushEditMsg_();
                }
                break;
            }
        },
        nodeIsEdit: function(node) {
            if (node == Laya.document.body)
                return;
            if (this.editingNode != null)
                this.editingNode.repaint();
            this.editingNode = node;
            this._reflushEditMsg_();
            this.editingNode.repaint();
            this._nodeIsEdit_ = true;
            if (node._private_.isineditinfo == null) {
                node._private_.isineditinfo = new laya.edit.EditNodeInfo(node);
                this.editNodes.push(node._private_.isineditinfo);
            }
            node._private_.isineditinfo.willSave = true;
            this._reflushEditMsg_();
        },
        _reflushEditMsg_: function() {
            if (this.editingNode != null) {
                var node = this.editingNode;
                this._tips_.set_text("" + node.nodeName + " pos:" + node.get_left() + "/" + node.get_top());
                this._tips_.show(true);
                var p = node.posOfTop(null, 0, 0);
                this._tips_.pos(p.x, p.y);
                p = node.posOfTop(null, 0, 0);
                if (p.x < 4)
                    p.x = 4;
                if (p.x >= Laya.window.width - this._tips_.get_width()-20)
                    p.x = Laya.window.width - this._tips_.get_width()-20;
                if (p.y <= this._tips_.get_height() + 4)
                    p.y = this._tips_.get_height() + 4;
                if (p.y >= Laya.window.height - this._tips_.get_height()-8)
                    p.y = Laya.window.height - this._tips_.get_height()-8;
                this._tips_.pos(p.x, p.y);
            } else 
                this._tips_.show(false);
        },
        _ctr_z: function() {
            if (this.editList.length > 0) {
                var dt = this.editList[this.editList.length-1];
                this.editList.length = this.editList.length-1;
                if (!dt.node.deleted) {
                    this.nodeIsEdit(dt.node);
                    dt.node.pos(dt.left, dt.top);
                }
            }
            this._reflushEditMsg_();
        },
        _saveToEditList: function() {
            if (this.editingNode != null)
                this.editList.push(new laya.edit.EditOneData(this.editingNode));
            if (this.editList.length > 50)
                this.editList.pop();
        },
        __class__: laya.edit.EditInfo
    }
    laya.element.AnimationData = function() {
        this.playIndex = 0;
        this.pauseTime = 0;
        this.set_totalframes = 1;
        this.set_play_count = 999999999;
        this.set_end_index = 999999999;
        this.set_start_index = 0;
    };
    laya.element.AnimationData.__name__ = true;
    laya.element.AnimationData.prototype = {
        __class__: laya.element.AnimationData
    }
    laya.element.Animation = function() {
        this._needUpdate_ = false;
        laya.element.Element.call(this);
        this.style.set_block(false);
        this.style._type_|=16777216;
        true;
    };
    laya.element.Animation.__name__ = true;
    laya.element.Animation.StrToframes = function(str, path, frameCount) {
        var frames = [];
        if (frameCount > 0) {
            var ofs = str.indexOf("*");
            if (ofs > 0) {
                var maxbit = 1;
                var startId = 0;
                var name1 = null, name2 = null;
                var typeStr = laya.utils.Method.subString(str, "(", ")");
                if (typeStr != null) {
                    var bpos = str.indexOf("(");
                    var epos = bpos + 2 + typeStr.length;
                    var schr = typeStr.split("*");
                    if (schr.length > 1) {
                        maxbit = Laya.parseInt(schr[0]);
                        startId = Laya.parseInt(schr[1]);
                    } else 
                        maxbit = Laya.parseInt(typeStr);
                    name1 = laya.io.File._formatUrl_(str.substring(0, bpos), path);
                    name2 = str.substring(epos, str.length);
                } else {
                    name1 = laya.io.File._formatUrl_(str.substring(0, ofs), path);
                    name2 = str.substring(ofs + 1, str.length);
                }
                var _g = 0;
                while (_g < frameCount) {
                    var i = _g++;
                    var nname = "" + (i + startId);
                    if (maxbit > nname.length)
                        nname = laya.utils.Method.nChar("0", maxbit - nname.length) + nname;
                    frames[i] = laya.io.File._instance_(name1 + nname + name2, "image", null, false);
                }
            } else 
                frames[0] = laya.io.File._instance_(laya.io.File._formatUrl_(str, path), "image", null, false);
            return frames;
        }
        var files = str.split(" ");
        var _g1 = 0, _g = files.length;
        while (_g1 < _g) {
            var i = _g1++;
            var name = laya.io.File._formatUrl_(files[i], path);
            frames[i] = laya.io.File._instance_(name, "image");
        }
        return frames;
    }
    laya.element.Animation.__super__ = laya.element.Element;
    laya.element.Animation.prototype = $extend(laya.element.Element.prototype, {
        _enableInsertTypesetLine_: function() {
            return false;
        },
        _onImgLoaded_: function(imgFile) {
            if (this.file != null && this.file != imgFile)
                return;
            this._type_|=8192;
            if (imgFile.width==-1) {
                this.onload();
                this.onerr();
                return;
            }
            if (!this.style._sizebeset_()) {
                this.style.m_width = imgFile.width;
                this.style.m_height = imgFile.height;
            }
            if (imgFile.translateX != null) {
                this.style.m_marginLeft = imgFile.translateX;
                this.style.m_marginTop = imgFile.translateY;
            }
            this.onload();
            this.parentNode.repaint();
        },
        created: function() {
            if (!((this._type_ & 2097152) == 2097152)) {
                laya.element.Element.prototype.created.call(this);
                if (this._willwithsrc_ != null)
                    this.set_src(this._willwithsrc_);
            }
        },
        onload: function() {},
        onerr: function() {},
        set_src: function(url) {
            if (!((this._type_ & 2097152) == 2097152) ||!((this._type_ & 65536) == 65536)) {
                this._willwithsrc_ = url;
                return url;
            }
            this._willwithsrc_ = null;
            if (url == null || url == "") {
                if ((this._matter_ & 64) == 64) {
                    this._matter_&=-65;
                    this._paintfn_ = laya.display.RenderHtml._paint_check;
                }
                if (this.m_src != null) {
                    this.m_src = null;
                    this.set_complete(true);
                    this.file = null;
                }
                return null;
            }
            this.addMatter(64);
            if (laya.element.Anitemplate.WithTemplate(url, this))
                return null;
            var fms = laya.element.Animation.StrToframes(url, this.baseURL != null ? this.baseURL.path : null, this.anidata == null ? 1 : this.anidata.set_totalframes);
            if (this.anidata.set_totalframes < 0)
                this.set_totalframes(fms.length);
            this.set_frames(fms);
            return this.m_src;
        },
        _review_: function(v) {
            laya.element.Element.prototype._review_.call(this, v);
            if ((this._type_ & 65536) == 65536 && this._willwithsrc_ != null)
                this.set_src(this._willwithsrc_);
        },
        aniLoop: function(tm, tmlen, tmo) {
            if (!this._needUpdate_&&!((this._type_ & 65536) == 65536) || this.anidata.pauseTime > 0)
                return true;
            var allframes = Laya.Round((tm - this.anidata.startPlayTime) / (1000 / this.anidata.speed)) + this.anidata.set_start_index;
            if (allframes == this.anidata.playFramesCount)
                return true;
            var totalframes = this.anidata.playFrameLength;
            var index = allframes%totalframes;
            var playcount = allframes / totalframes;
            if (playcount != this.anidata.playFramesCount / totalframes) {
                if (playcount >= this.anidata.set_play_count) {
                    tmo.deleted = true;
                    this.dispatchEvent(null, "onplayend");
                    if (this.anidata.playEndDel)
                        this.destroy();
                    return false;
                }
                this.dispatchEvent(null, "onplayonce");
            }
            this.anidata.playIndex = index;
            this.onplaying(index);
            var imgFile = this.anidata.frames[index];
            if (imgFile == null)
                Laya["debugger"]();
            if (imgFile.isLoaded()) {
                if (!this.style._sizebeset_()) {
                    this.style.m_width = imgFile.width;
                    this.style.m_height = imgFile.height;
                }
                if (imgFile.translateX != null) {
                    this.style.m_marginLeft = imgFile.translateX;
                    this.style.m_marginTop = imgFile.translateY;
                }
                this.file = imgFile;
                this.parentNode.repaint();
            } else 
                imgFile.reload();
            this.anidata.playFramesCount = allframes;
            return true;
        },
        _loadfile_: function() {
            var _g = this;
            if (this.file == null) {
                if ((this._matter_ & 64) == 64) {
                    this._matter_&=-65;
                    this._paintfn_ = laya.display.RenderHtml._paint_check;
                }
                return;
            }
            this.addMatter(64);
            if (this.file.isLoaded()) {
                var imgf;
                this._onImgLoaded_(imgf = this.file);
                return;
            }
            this.file.pushCallBack({
                onload: function(file) {
                    _g._onImgLoaded_(file);
                }
            });
            if ((this._type_ & 2097152) == 2097152 && (this._type_ & 65536) == 65536)
                this.file.reload();
        },
        get_frames: function() {
            return this.anidata == null ? null : this.anidata.frames;
        },
        set_frames: function(f) {
            if (f.length < 2) {
                if (this.anidata != null) {
                    if (this.anidata.timer != null)
                        this.anidata.timer.deleted = true;
                    this.anidata = null;
                }
                this.file = f[0];
                this._loadfile_();
                return null;
            } else {
                this._createAniData_().frames = f;
                this.file = this.anidata.frames[this.anidata.set_start_index];
                this.anidata.playFrameLength = this.anidata.set_end_index < 999999999 ? this.anidata.set_end_index : f.length;
                this.replay();
            }
            this._loadfile_();
            return f;
        },
        get_pause: function() {
            return this.anidata == null ? false : this.anidata.pauseTime > 0;
        },
        set_pause: function(b) {
            if (b) {
                this._createAniData_();
                this.anidata.pauseTime = this.timerCtrl.curtime;
            } else if (this.anidata != null && this.anidata.pauseTime != 0) {
                this.anidata.startPlayTime += this.timerCtrl.curtime - this.anidata.pauseTime;
                this.anidata.pauseTime = 0;
            }
            return b;
        },
        get_enddel: function(b) {
            return this.anidata == null ? b : this.anidata.playEndDel = b;
        },
        set_enddel: function(b) {
            return this.anidata == null ? b : this.anidata.playEndDel = b;
        },
        set_needupdate: function(b) {
            return this._needUpdate_ = b;
        },
        get_endindex: function() {
            return this.anidata == null ? 0 : this.anidata.set_end_index < 999999999 ? this.anidata.set_end_index : this.anidata.playFrameLength;
        },
        set_endindex: function(i) {
            return this._createAniData_().set_end_index = this.anidata.playFrameLength = i;
        },
        get_playindex: function() {
            return this.anidata == null ? 0 : this.anidata.set_start_index;
        },
        set_playindex: function(i) {
            if (this.anidata != null) {
                this.file = this.anidata.frames[i];
                this._loadfile_();
            }
            return i;
        },
        get_startindex: function() {
            return this.anidata == null ? 0 : this.anidata.set_start_index;
        },
        set_startindex: function(i) {
            return this._createAniData_().set_start_index = i;
        },
        get_count: function() {
            return this.anidata == null ? 0 : this.anidata.set_play_count;
        },
        set_count: function(i) {
            return this._createAniData_().set_play_count = i;
        },
        get_speed: function() {
            return this.anidata == null ? 0 : this.anidata.speed;
        },
        set_speed: function(d) {
            return this._createAniData_().speed = d;
        },
        get_totalframes: function() {
            return this.anidata == null ? 0 : this.anidata.set_totalframes;
        },
        set_totalframes: function(i) {
            return this._createAniData_().set_totalframes = this.anidata.set_end_index = i;
        },
        _createAniData_: function() {
            if (this.anidata == null)
                this.anidata = new laya.element.AnimationData();
            return this.anidata;
        },
        onplaying: function(index) {},
        replay: function() {
            if (this.anidata == null || this.anidata.speed < 0.01)
                return;
            this.anidata.playIndex = 0;
            this.anidata.pauseTime = 0;
            this.anidata.startPlayTime = this.timerCtrl.curtime;
            if (this.anidata.timer != null)
                this.anidata.timer.deleted = true;
            this.anidata.timer = this.timerCtrl.createUpdateTimer(this);
            this.anidata.timer.update = $bind(this, this.aniLoop);
            this.anidata.playFramesCount =- 1;
        },
        __class__: laya.element.Animation
    });
    laya.element.Anitemplate = function() {
        this.height = null;
        this.width = null;
        this._speed = null;
        this._totalframes = 1;
        laya.element.Node.call(this);
    };
    laya.element.Anitemplate.__name__ = true;
    laya.element.Anitemplate.Get = function(name, node) {
        return laya.element.Anitemplate.__Anitemplates__.get(laya.io.File._formatUrl_(name, node != null ? node.baseURL != null ? node.baseURL.path : null : ""));
    }
    laya.element.Anitemplate.WithTemplate = function(name, ani) {
        var t = laya.element.Anitemplate.Get("res://" + name);
        if (t == null)
            return false;
        if (t.className != null)
            ani.set_className(t.className);
        if (t.styleStr != null)
            ani.cssText(t.styleStr);
        if (t._speed != null)
            ani.set_speed(t._speed);
        ani.set_totalframes(t._totalframes);
        ani.set_frames(t.frames);
        return true;
    }
    laya.element.Anitemplate.__super__ = laya.element.Node;
    laya.element.Anitemplate.prototype = $extend(laya.element.Node.prototype, {
        enableChileNodes: function() {
            return false;
        },
        set_name: function(name) {
            laya.element.Anitemplate.__Anitemplates__.set("res://" + name, this);
            return name;
        },
        set_className: function(name) {
            this.className = name;
        },
        set_style: function(css) {
            this.styleStr = css;
        },
        set_size: function(w, h) {
            this.width = w;
            this.height = h;
        },
        set_speed: function(d) {
            this._speed = d;
        },
        created: function() {
            this._type_|=2097152;
            this.onCreated();
            this.frames = laya.element.Animation.StrToframes(this._frames_str, this.baseURL != null ? this.baseURL.path : null, this._totalframes);
            if (this.frames != null && this._frames_translate != null) {
                var files = this._frames_translate.split(";");
                var s = Math.round(Math.min(this.frames.length, files.length));
                var _g = 0;
                while (_g < s) {
                    var i = _g++;
                    var pos = files[i].split(",");
                    if (pos == null || pos.length != 2) {
                        Laya.debug.err("Anitemplate[" + this.get_name() + "] set filestranslate err:" + this._frames_translate);
                        break;
                    }
                    this.frames[i].translateX = Laya.parseInt(pos[0]);
                    this.frames[i].translateY = Laya.parseInt(pos[1]);
                }
            }
        },
        set_frames: function(str) {
            this._frames_str = str;
        },
        set_filestranslate: function(str) {
            this._frames_translate = str;
        },
        set_totalframes: function(i) {
            this._totalframes = i;
        },
        __class__: laya.element.Anitemplate
    });
    laya.element.Assembly = function() {
        laya.element.Node.call(this);
    };
    laya.element.Assembly.__name__ = true;
    laya.element.Assembly.CreateElement = function(name) {
        var o = laya.element.Assembly.__AssemblyArray__.get(name);
        if (o == null)
            return null;
        if (o._htmljs_ == null) {
            var js = laya.xhtml.HtmlCompile.CompileMini(o.textContent, null, o.baseURL);
            o._htmljs_ = o.EVAL("(" + js + ")");
        }
        var node = Laya.document.createElement(o.firsetNodeName);
        node._private_.assembly = o;
        node.addType(1);
        node._onAssembly_ = function() {
            node._onAssembly_ = null;
            var preurl = node.baseURL;
            node.baseURL = o.baseURL;
            node.addType(2097152);
            o._htmljs_.call(node, node, node.baseURL);
            node.removeType(2097152);
            node.baseURL = preurl;
        };
        var precreated = node.created;
        node.created = function() {
            if (node._onAssembly_ != null)
                node._onAssembly_();
            precreated.call(node);
        };
        var preonparent = node.onParent;
        node.onParent = function(parent) {
            if (node._onAssembly_ != null)
                node._onAssembly_();
            preonparent.call(node, parent);
        };
        return node;
    }
    laya.element.Assembly.__super__ = laya.element.Node;
    laya.element.Assembly.prototype = $extend(laya.element.Node.prototype, {
        set_text: function(txt) {
            var c, bpos = 0;
            var _g1 = 0, _g = txt.length;
            while (_g1 < _g) {
                var i = _g1++;
                c = txt.charAt(i);
                if (c == "<") {
                    bpos = i;
                    continue;
                }
                if (c == " " || c == "/" || c == ">") {
                    this.firsetNodeName = txt.substring(bpos + 1, i);
                    this.textContent = "<to.this" + txt.substring(i, txt.length);
                    return null;
                }
            }
            console.log("Assembly err:" + txt);
            return null;
        },
        set_name: function(name) {
            this.m_name = name;
            laya.element.Assembly.__AssemblyArray__.set(name, this);
            return name;
        },
        __class__: laya.element.Assembly
    });
    laya.utils.LayaTimer = function() {
        this.curtimef = laya.utils.Method.getCurTime();
        this.curtime = Math.round(this.curtimef);
        this._shortTimer_ = [];
        this._longTimer_ = [];
        this.ids = 1;
        this.speed = 1;
        this._willPush_ = [];
        this.UpdateTimerArray = [];
    };
    laya.utils.LayaTimer.__name__ = true;
    laya.utils.LayaTimer.prototype = {
        _addto_: function() {
            var i = this._willPush_.length;
            if (i < 1)
                return;
            var presz = this._longTimer_.length;
            while (--i >= 0) {
                var t = this._willPush_[i];
                if (t == null || t.deleted || t.item.deleted) {
                    this.kill(t);
                    continue;
                }(t.delay < laya.utils.LayaTimer._isLongOrShortTimeNum ? this._shortTimer_ : this._longTimer_).push(t);
            }
            if (this._longTimer_.length != presz)
                this._longTimer_.sort($bind(this, this._sort_compare));
            this._willPush_.length = 0;
        },
        _sortLongTimer: function() {
            this._longTimer_.sort($bind(this, this._sort_compare));
        },
        _sort_compare: function(a, b) {
            return Laya.Round(a.nextTm - b.nextTm);
        },
        add: function(obj, fn, delay, count) {
            if (count == null)
                count = 999999999;
            if (delay == null)
                delay = 1;
            if (delay < 0)
                return null;
            this._remove_(obj, fn);
            this.ids += 1;
            var timerEvent = new laya.utils.LayaTimerEvent(obj, delay, count, this.curtime, this.ids);
            if (Laya.istype(fn, "string")) {
                timerEvent.fnName = fn;
                timerEvent.fn = Reflect.field(obj, fn);
                if (timerEvent.fn != null) {
                    if (obj._laya_timers_ == null)
                        obj._laya_timers_ = new laya.utils.StringMap();
                    obj._laya_timers_.set(fn, timerEvent);
                } else 
                    obj.fn = Laya["eval"]("(function(_curTime,_timeGo){" + Std.string(fn) + "})");
            } else 
                timerEvent.fnName = timerEvent.fn = fn;
            this._willPush_.push(timerEvent);
            return timerEvent;
        },
        _remove_: function(obj, fn) {
            if (obj._laya_timers_ == null)
                return;
            if (Laya.typeIsString(fn)) {
                var o = obj._laya_timers_.get(fn);
                if (o != null)
                    this.kill(o);
            }
        },
        kill: function(atm, fn) {
            if (fn != null) {
                this._remove_(atm, fn);
                return;
            }
            if (atm.deleted)
                return;
            atm.deleted = true;
            if (atm.destroy != null)
                atm.destroy();
            atm.item = null;
            atm.fnName = null;
            atm.fn = null;
        },
        onTimer: function(tm) {
            this.update(tm);
        },
        runCurTime: function(tm) {
            this.curtimef = tm;
            this.curtime = Math.round(this.curtimef);
            this.update(this.curtime);
        },
        run: function(delay) {
            this.curtimef += delay * this.speed;
            this.curtime = Math.round(this.curtimef);
            this.update(this.curtime);
        },
        update: function(tm) {
            tm = tm ? tm : new Date().getTime();
            this._addto_();
            this.curtimef = tm;
            var tmfncount = 0;
            var count = 0;
            var sz;
            var i = 0;
            var atm;
            var checkTm, delay;
            i = 0;
            if ((sz = this.UpdateTimerArray.length) > 0)
                while (i < sz) {
                    var o = this.UpdateTimerArray[i];
                    if (o.deleted == true || o.node != null && o.node.deleted) {
                        if (o.node != null)
                            o.node = null;
                            o.deleted =- 2;
                            this.UpdateTimerArray.splice(i, 1);
                            sz--;
                            continue;
                    }
                    if (o.deleted==-2) {
                        Laya["debugger"]();
                        continue;
                    }
                    if (o.update == null || o.update(tm, tm - o.startTime, o) == false) {
                        o.deleted =- 2;
                        this.UpdateTimerArray.splice(i, 1);
                        sz--;
                        continue;
                    }
                    i++;
                }
            if ((sz = this._shortTimer_.length) > 0) {
                i = 0;
                while (i < sz) {
                    atm = this._shortTimer_[i];
                    if (atm.deleted || atm.item.deleted) {
                        this._shortTimer_.splice(i, 1);
                        sz--;
                        this.kill(atm);
                        continue;
                    }
                    if (atm.nextTm <= tm) {
                        tmfncount++;
                        if (atm.fn.call(atm.item, tm, tm - atm.starttm, atm) == false || atm.count < 2) {
                            this._shortTimer_.splice(i, 1);
                            sz--;
                            this.kill(atm);
                            continue;
                        }
                        atm.nextTm = tm + atm.delay;
                        atm.count--;
                    }
                    i += 1;
                }
            }
            i = 0;
            if ((sz = this._longTimer_.length) > 0) {
                var willsort = false;
                count = 0;
                while (i < sz) {
                    atm = this._longTimer_[i];
                    if (atm.deleted || atm.item.deleted) {
                        this._longTimer_.splice(i, 1);
                        sz--;
                        this.kill(atm);
                        continue;
                    }
                    if (atm.nextTm > tm)
                        break;
                    atm.nextTm = tm + atm.delay;
                    tmfncount++;
                    if (atm.fn.call(atm.item, tm, tm - atm.starttm, atm) == false || atm.count < 2) {
                        this._longTimer_.splice(i, 1);
                        sz--;
                        this.kill(atm);
                        continue;
                    }
                    atm.count--;
                    willsort = true;
                    i++;
                }
                if (willsort)
                    this._longTimer_.sort($bind(this, this._sort_compare));
            }
        },
        createUpdateTimer: function(node) {
            var o = {
                node: node,
                deleted: false,
                startTime: this.curtime
            };
            this.UpdateTimerArray.push(o);
            return o;
        },
        __class__: laya.utils.LayaTimer
    }
    laya.event.EventListenerList = function(e) {
        this.eventTarget = e;
        this.eventMap = new laya.utils.StringMap();
    };
    laya.event.EventListenerList.__name__ = true;
    laya.event.EventListenerList.prototype = {
        'delete': function(e) {
            if (e == this.eventTarget)
                this.eventTarget = null;
        },
        getInstance: function(e) {
            if (this.eventTarget == e)
                return this;
            return e.eventListenerList = new laya.event.EventListenerList(e);
        },
        destroy: function(e) {
            if (e != this.eventTarget)
                Laya["debugger"]();
            var es = this.eventMap.toDataArray();
            if (es == null || es.length < 1)
                return;
            var _g1 = 0, _g = es.length;
            while (_g1 < _g) {
                var i = _g1++;
                var ee = es[i];
                var _g3 = 0, _g2 = ee.length;
                while (_g3 < _g2) {
                    var j = _g3++;
                    ee[j].destroy();
                }
            }
            this.eventMap = null;
        },
        __class__: laya.event.EventListenerList
    }
    laya.element.Audio = function() {
        this._sound_type_ = 0;
        this._enddel_ = true;
        this._paramex_ = 0;
        laya.element.Node.call(this);
        laya.element.Audio._activeAudios_.push(this);
    };
    laya.element.Audio.__name__ = true;
    laya.element.Audio.Muted = function(b) {
        laya.element.Audio._muted_ = b;
        var _g1 = 0, _g = laya.element.Audio._activeAudios_.length;
        while (_g1 < _g) {
            var i = _g1++;
            laya.element.Audio._activeAudios_[i].muted(b);
        }
    }
    laya.element.Audio.GetTypeCount = function(type) {
        var s = 0;
        var _g1 = 0, _g = laya.element.Audio._activeAudios_.length;
        while (_g1 < _g) {
            var i = _g1++;
            if (laya.element.Audio._activeAudios_[i]._sound_type_ == type)
                s++;
        }
        return s;
    }
    laya.element.Audio._pushSoundToCache_ = function(src, sound) {
        var o = laya.element.Audio._cacheAudios_.get(src);
        if (o == null) {
            o = [];
            laya.element.Audio._cacheAudios_.set(src, o);
        }
        sound.pause();
        o.push(sound);
    }
    laya.element.Audio._popSoundFromeCache_ = function(src) {
        var o = laya.element.Audio._cacheAudios_.get(src);
        if (o == null || o.length < 1)
            return null;
        return o.pop();
    }
    laya.element.Audio.__super__ = laya.element.Node;
    laya.element.Audio.prototype = $extend(laya.element.Node.prototype, {
        muted: function(b) {
            if (this._soundNode_ != null)
                this._soundNode_.muted = b;
        },
        pause: function() {
            if (this.deleted)
                return;
            if (this._soundNode_ != null)
                this._soundNode_.pause();
        },
        restart: function() {
            if (this.deleted)
                return;
            if (this._soundNode_ != null) {
                if (Laya._ISFLASH_)
                    this._soundNode_.setSrc(this.m_src);
                else 
                    this._soundNode_.src = this.m_src;
                this._soundNode_.play();
            }
        },
        play: function() {
            if (this.deleted)
                return;
            if (this._soundNode_ != null)
                this._soundNode_.play();
        },
        set_preload: function(b) {
            if (b)
                this._paramex_ = this._paramex_ | 4;
            else 
                this._paramex_ = this.REMOVEEXPARAM(this._paramex_, 4);
            return b;
        },
        set_loop: function(b) {
            if (b)
                this._paramex_ = this._paramex_ | 2;
            else 
                this._paramex_ = this.REMOVEEXPARAM(this._paramex_, 2);
            if ((this._type_ & 2097152) == 2097152 && this._soundNode_ != null)
                this._soundNode_.loop = b;
            return b;
        },
        set_autoplay: function(b) {
            if (b)
                this._paramex_ = this._paramex_ | 1;
            else 
                this._paramex_ = this.REMOVEEXPARAM(this._paramex_, 1);
            return b;
        },
        set_music: function(s) {
            if (this.deleted)
                return;
            this._paramex_ = this._paramex_ | 8;
            if (laya.element.Audio._music_ != null && laya.element.Audio._music_ != this)
                laya.element.Audio._music_.destroy();
            if (s != null) {
                laya.element.Audio._music_ = this;
                this.set_src(s);
            }
        },
        set_type: function(d) {
            this._sound_type_ = d;
        },
        set_enddel: function(b) {
            this._enddel_ = b;
        },
        set_src: function(url) {
            if (this.deleted)
                return null;
            if (laya.element.Audio._muted_ == true) {
                if ((this._paramex_ & 8) == 8 == false) {
                    this.destroy();
                    return null;
                }
            }
            if (!((this._type_ & 2097152) == 2097152)) {
                this.m_src = url;
                return url;
            }
            if (this._soundNode_ != null)
                laya.element.Audio._pushSoundToCache_(this.get_src(), this._soundNode_);
            this.m_src = this.formatUrl(url);
            this._soundNode_ = laya.element.Audio._popSoundFromeCache_(this.m_src);
            if (this._soundNode_ == null)
                this._soundNode_ = Laya.jdocument.createElement("audio");
            if (Laya._ISFLASH_)
                this._soundNode_.__audionode__ = this;
            this._setevent_();
            this.muted(laya.element.Audio._muted_);
            if (Laya._ISFLASH_)
                this._soundNode_.setSrc(this.m_src);
            else 
                this._soundNode_.src = this.m_src;
            if ((this._paramex_ & 1) == 1)
                this._soundNode_.play();
            if ((this._paramex_ & 4) == 4)
                this._soundNode_.load();
            if (Laya._ISAPP_ && (this._paramex_ & 2) == 2)
                this._soundNode_.loop = true;
            return this.m_src;
        },
        _setevent_: function() {
            this._soundNode_.addEventListener("ended", $bind(this, this.onEnded));
            this._soundNode_.addEventListener("timeupdate", $bind(this, this.onTimeUpdate));
        },
        onTimeUpdate: function() {
            if (this.parentNode != null && this.parentNode.deleted)
                this.destroy();
        },
        onEnded: function() {
            if ((this._paramex_ & 2) == 2)
                this.restart();
            else if (this._enddel_)
                this.destroy();
            else 
                console.log("no del............................:" + this.m_src);
        },
        created: function() {
            if (this.deleted)
                return;
            laya.element.Node.prototype.created.call(this);
            if (this.m_src != null) {
                var src = this.m_src;
                this.m_src = null;
                this.set_src(src);
            }
        },
        destroy: function() {
            if (!laya.element.Node.prototype.destroy.call(this))
                return false;
            if (this._soundNode_ != null)
                laya.element.Audio._pushSoundToCache_(this.get_src(), this._soundNode_);
            if (laya.element.Audio._music_ == this)
                laya.element.Audio._music_ = null;
            var index = laya.utils.Method.inArray(this, laya.element.Audio._activeAudios_);
            if (index < 0)
                Laya.alert("no this.sound");
            else 
                laya.element.Audio._activeAudios_.splice(index, 1);
            return true;
        },
        __class__: laya.element.Audio
    });
    laya.element.CanvasNode = function() {
        this.repaint_EventListener = null;
        this.resize_EventListener = null;
        this.m_mode = 1;
        this.canvas = null;
        laya.element.Element.call(this);
        this.reference = this;
        this.htmlRender = new laya.display.RenderHtml();
        this.addMatter(1024);
        if (this.style != null) {
            this.style.set_block(true);
            this.style.setOverflow("hidden");
        }
    };
    laya.element.CanvasNode.__name__ = true;
    laya.element.CanvasNode.__super__ = laya.element.Element;
    laya.element.CanvasNode.prototype = $extend(laya.element.Element.prototype, {
        get_canvas: function() {
            if (this.m_mode == 0)
                return null;
            if (this.canvas == null) {
                this.canvas = new laya.display.Canvas(this._private_.enableTimeoutRelease != null ? this._private_.enableTimeoutRelease : false, Math.abs(this.m_mode) != 3 ? "2d" : "fakecanvas");
                this.regEventCode("onresize", this._onresize_);
                this.attachEvent("onreview", $bind(this, this._onreview_));
                this._onresize_();
            }
            if (!this.canvas.active()) {
                this._onresize_();
                this._repaintType_ = 1;
            }
            return this.canvas;
        },
        scrollto: function(x, y) {
            if (this.m_mode != 0)
                this.repaint();
            laya.element.Element.prototype.scrollto.call(this, x, y);
        },
        destroy: function() {
            if (this.deleted)
                return false;
            laya.element.Element.prototype.destroy.call(this);
            if (this.canvas != null)
                this.canvas.destroy();
            return true;
        },
        _onreview_: function() {
            if (!((this._type_ & 65536) == 65536) && this.canvas != null) {
                this.canvas.destroy();
                this.canvas = null;
            }
        },
        _onresize_: function() {
            if (this.m_mode != 0 && this.canvas != null)
                this.canvas.setSize(this.get_offsetWidth(), this.get_offsetHeight());
        },
        get_mode: function() {
            return this.m_mode;
        },
        repaint: function() {
            if (this._repaintType_ > 0 || this.m_mode == 2)
                return this;
            this.m_mode =- this.m_mode;
            laya.element.Element.prototype.repaint.call(this);
            return this;
        },
        set_mode: function(s) {
            this.addMatter(1024);
            switch (s) {
            case"disable":
                this.m_mode = 0;
                if ((this._matter_ & 1024) == 1024) {
                    this._matter_&=-1025;
                    this._paintfn_ = laya.display.RenderHtml._paint_check;
                }
                break;
            case"normal":
                this.m_mode =- 1;
                break;
            case"fake":
                Laya.alert("fake error:" + this.baseURL.toString());
                this.m_mode =- (Laya._ISHTML5_ ? 0 : 3);
                if (this.m_mode == 0) {
                    if ((this._matter_ & 1024) == 1024) {
                        this._matter_&=-1025;
                        this._paintfn_ = laya.display.RenderHtml._paint_check;
                    }
                }
                break;
            case"static":
                this.m_mode =- 2;
                break;
            }
            this.repaint();
            return this.m_mode;
        },
        enableTimeoutRelease: function(b) {
            this._private_.enableTimeoutRelease = b;
            if (this.canvas != null)
                this.canvas.enableTimeoutRelease(b);
        },
        set_reference: function(s) {
            var pre = this.reference;
            if (Laya.typeIsString(s))
                this.reference = Laya.I(s);
            else 
                this.reference = s;
            if ((this._type_ & 2097152) == 2097152 && pre != this.reference)
                this._attcheSomeEvent_();
        },
        created: function() {
            laya.element.Element.prototype.created.call(this);
            this._attcheSomeEvent_();
        },
        _attcheSomeEvent_: function() {
            if (this.resize_EventListener != null)
                this.resize_EventListener["delete"] = true;
            if (this.repaint_EventListener != null)
                this.repaint_EventListener["delete"] = true;
            if (this.reference != this && ((this.style._type_ & 4194304) == 4194304 || (this.style._type_ & 8388608) == 8388608))
                this.resize_EventListener = this.reference.attachEvent("onresize", $bind(this, this._reference_resize_), this);
            this.repaint_EventListener = this.reference.attachEvent("onrepaint", $bind(this, this.repaint), this);
            this._reference_resize_();
        },
        _reference_resize_: function() {
            if (this.reference == this)
                return;
            var w = this.get_width();
            var h = this.get_height();
            if ((this.style._type_ & 4194304) == 4194304)
                w = this.reference.get_offsetWidth();
            if ((this.style._type_ & 8388608) == 8388608)
                h = this.reference.get_offsetHeight();
            this.size(w, h);
        },
        __class__: laya.element.CanvasNode
    });
    laya.element.Body = function() {
        laya.element.CanvasNode.call(this);
        if (Laya.location == null)
            return;
        this.nodeName = "body";
        this.baseURL = new laya.utils.URLEX(Laya.location.rootPath);
        this.set_id("body");
        this._type_|=12;
        if (this.style != null) {
            this._private_._depth_ = 0;
            this.style.setOverflow("hidden");
            this.style.font = new laya.css.CSSFont(this.style, laya.css.CSSFont.__DEFAULT_);
            this.style.position("true");
            laya.device.Screen.check();
            this.size(laya.device.Screen.width, laya.device.Screen.height);
            this.get_canvas().enableTimeoutRelease(false);
        }
    };
    laya.element.Body.__name__ = true;
    laya.element.Body.__super__ = laya.element.CanvasNode;
    laya.element.Body.prototype = $extend(laya.element.CanvasNode.prototype, {
        isView: function() {
            return true;
        },
        repaint: function() {
            this._repaintType_++;
            return this;
        },
        __class__: laya.element.Body
    });
    laya.element.ButtonImages = function() {};
    laya.element.ButtonImages.__name__ = true;
    laya.element.ButtonImages.prototype = {
        __class__: laya.element.ButtonImages
    }
    laya.element.ButtonCss = function() {};
    laya.element.ButtonCss.__name__ = true;
    laya.element.ButtonCss.prototype = {
        __class__: laya.element.ButtonCss
    }
    laya.element.Button = function() {
        this.pressWith = 1;
        this.m_type = 0;
        laya.element.Image.call(this);
        this.style.set_block(false);
        this.style._type_|=16777216;
        true;
        this.cssText("white-space:nowrap;vertical-align:middle;text-align:center;width2:auto");
    };
    laya.element.Button.__name__ = true;
    laya.element.Button.__super__ = laya.element.Image;
    laya.element.Button.prototype = $extend(laya.element.Image.prototype, {
        _enableInsertTypesetLine_: function() {
            return false;
        },
        get_checked: function() {
            return this.m_checked;
        },
        set_checked: function(b) {
            if (this.m_checked == b) {
                this._resetcss_();
                return b;
            }
            this.m_checked = b;
            if (!((this._type_ & 2097152) == 2097152))
                return b;
            if (b)
                this.dispatchEvent(null, "onchecked");
            else 
                this.dispatchEvent(null, "onunchecked");
            if (this.m_relate != null) {
                Laya.I(this.m_relate).show(b);
                if (this.grouphide)
                    this.get_group()._toElement_().show(false);
            }
            if (this.m_type == 2) {
                if (this.parentNode._private_._radio_ != null)
                    this.parentNode._private_._radio_.set_checked(false);
                this.parentNode._private_._radio_ = b ? this : null;
            }
            this._resetcss_();
            return b;
        },
        set_relate: function(id, b) {
            this.m_relate = id;
            this.grouphide = b;
        },
        set_onunchecked: function(d) {
            this.regEventCode("onunchecked", d);
            return d;
        },
        set_onchecked: function(d) {
            this.regEventCode("onchecked", d);
            return d;
        },
        presswith: function(s) {
            if (s.substring(0, 2) == "on")
                s = s.substring(2, s.length);
            switch (s) {
            case"mouseup":
                this.pressWith = 2;
                break;
            case"mousedown":
                this.pressWith = 1;
                break;
            case"singletouchup":
                this.pressWith = 3;
                break;
            }
        },
        checkedcss: function(s) {
            return this._buttoncss_("checked", s);
        },
        overcss: function(s) {
            return this._buttoncss_("over", s);
        },
        pressedcss: function(s) {
            return this._buttoncss_("pressed", s);
        },
        disabledcss: function(s) {
            return this._buttoncss_("disabled", s);
        },
        normalcss: function(s) {
            return this._buttoncss_("normal", s);
        },
        checkedimg: function(s) {
            return this._buttonimg_("checked", s);
        },
        overimg: function(s) {
            return this._buttonimg_("over", s);
        },
        pressedimg: function(s) {
            return this._buttonimg_("pressed", s);
        },
        disabledimg: function(s) {
            return this._buttonimg_("disabled", s);
        },
        normalimg: function(s) {
            return this._buttonimg_("normal", s);
        },
        _buttoncss_: function(type, css) {
            if (this.buttoncss == null)
                this.buttoncss = new laya.element.ButtonCss();
            laya.utils.Method.setField(this.buttoncss, type, css);
            this._resetcss_();
            return css;
        },
        _buttonimg_: function(type, img) {
            if (img == null)
                return this.images == null ? null : laya.utils.Method.field(this.images, "type");
            if (this.images == null)
                this.images = new laya.element.ButtonImages();
            img = this.formatUrl(img);
            laya.utils.Method.setField(this.images, type, img);
            this._resetcss_();
            return img;
        },
        _setButtonEffect_: function(type) {
            if (this.images != null) {
                var img = laya.utils.Method.field(this.images, type);
                if (img == null)
                    img = laya.utils.Method.field(this.images, "over");
                if (img == null)
                    img = laya.utils.Method.field(this.images, "normal");
                if (img != null)
                    this.set_src(img);
            }
            if (this.buttoncss != null) {
                var csstxt = laya.utils.Method.field(this.buttoncss, type);
                if (csstxt == null)
                    csstxt = laya.utils.Method.field(this.buttoncss, "over");
                if (csstxt == null)
                    csstxt = laya.utils.Method.field(this.buttoncss, "normal");
                if (csstxt != null)
                    this.set_className(csstxt);
            }
            this.repaint();
        },
        get_type: function() {
            return laya.element.Button._TYPE_.name[this.m_type];
        },
        set_type: function(s) {
            if (s == "button")
                this.m_type = 0;
            if (s == "check")
                this.m_type = 1;
            if (s == "radio")
                this.m_type = 2;
            return s;
        },
        _mouseup_: function() {
            if (this.get_disabled())
                return;
            this.set_focus(true);
            if (this.m_type == 2) {
                if (this.m_relate != null)
                    Laya.I(this.m_relate).show(true);
                if (this.grouphide)
                    this.get_group()._toElement_().show(false);
                this._setButtonEffect_("over");
                return;
            }
            if (this.pressWith == 2)
                this._willpress_();
        },
        _onsingletouchup_: function() {
            if (this.get_disabled())
                return;
            if (this.pressWith == 3)
                this._mouseup_();
        },
        _mousedown_: function() {
            if (this.get_disabled())
                return;
            if (this.pressWith == 1)
                this._willpress_();
        },
        _mouseout_: function() {
            if (this.get_disabled())
                return;
            this._resetcss_();
        },
        _mouseover_: function() {
            if (this.get_disabled())
                return;
            this._setButtonEffect_("over");
        },
        _onclick_: function() {},
        _willpress_: function() {
            this._setButtonEffect_("pressed");
            var _g = this;
            switch (_g.m_type) {
            case 0:
                break;
            case 1:
                this.set_checked(!this.m_checked);
                break;
            case 2:
                this.set_checked(true);
                break;
            }
        },
        set_disabled: function(b) {
            laya.element.Image.prototype.set_disabled.call(this, b);
            this._resetcss_();
            return b;
        },
        created: function() {
            if ((this._type_ & 2097152) == 2097152)
                return;
            laya.element.Image.prototype.created.call(this);
            this.set_cancelBubble(true);
            this.attachEvent("onmousedown", $bind(this, this._mousedown_));
            this.attachEvent("onmouseup", $bind(this, this._mouseup_));
            this.attachEvent("onsingletouchup", $bind(this, this._onsingletouchup_));
            this.attachEvent("onmouseover", $bind(this, this._mouseover_));
            this.attachEvent("onmouseout", $bind(this, this._mouseout_));
            this.attachEvent("onclick", $bind(this, this._onclick_));
            if (this.m_checked != null) {
                var b = this.m_checked;
                this.m_checked = null;
                this.set_checked(b);
            }
            this._resetcss_();
        },
        _resetcss_: function() {
            if (this.get_disabled())
                this._setButtonEffect_("disabled");
            else if (this.m_checked)
                this._setButtonEffect_("checked");
            else 
                this._setButtonEffect_("normal");
        },
        __class__: laya.element.Button
    });
    laya.element.ConditionalComments = function() {
        laya.element.Node.call(this);
    };
    laya.element.ConditionalComments.__name__ = true;
    laya.element.ConditionalComments.__super__ = laya.element.Node;
    laya.element.ConditionalComments.prototype = $extend(laya.element.Node.prototype, {
        set_text: function(txt) {
            if (this.condition)
                this.parentNode.appendHTML(txt);
            this.destroy();
            return null;
        },
        set_condition: function(s) {
            var no = s.charAt(0) == "!";
            if (no)
                s = s.substring(1, s.length);
            var b = Reflect.field(Laya.jwindow, s);
            this.condition = b != null && b != false;
            if (no)
                this.condition=!this.condition;
        },
        __class__: laya.element.ConditionalComments
    });
    laya.element.Span = function() {
        laya.element.Element.call(this);
        this.style.set_block(false);
    };
    laya.element.Span.__name__ = true;
    laya.element.Span.__super__ = laya.element.Element;
    laya.element.Span.prototype = $extend(laya.element.Element.prototype, {
        __class__: laya.element.Span
    });
    laya.element.ExternalLink = function() {
        laya.element.Span.call(this);
    };
    laya.element.ExternalLink.__name__ = true;
    laya.element.ExternalLink.createA = function() {
        var a = Laya.jdocument.createElement("a");
        a.tabIndex =- 1;
        a.target = "_blank";
        a.style.cssText = "position:absolute;outline:none;-moz-outline:none;left:0px;top:0;width:100px;height:100px;background2:white;z-index:1000000;display:none";
        Laya.jdocument.body.appendChild(a);
        return a;
    }
    laya.element.ExternalLink.getExternalLink = function() {
        var a = laya.element.ExternalLink.linkPool.shift();
        if (a == null)
            a = laya.element.ExternalLink.createA();
        return a;
    }
    laya.element.ExternalLink.__super__ = laya.element.Span;
    laya.element.ExternalLink.prototype = $extend(laya.element.Span.prototype, {
        set_href: function(value) {
            if (this.systemA != null)
                this.systemA.href = value;
            return this._href = value;
        },
        get_href: function() {
            return this._href;
        },
        onCreated: function() {
            var _g = this;
            laya.element.Span.prototype.onCreated.call(this);
            if (Laya._ISHTML5_) {
                this.systemA = laya.element.ExternalLink.getExternalLink();
                this.systemA.traceNode = this;
                this.systemA.href = this.get_href();
                Laya.window.addExternalTimer(this.systemA, $bind(this, this.onSystemATimer), 150);
            }
            if (Laya._ISFLASH_)
                this.set_onclick(function() {
                    laya.flash.LayaFlashConch.getInstance().m_pFlash.setExternalLink(_g.get_href());
                });
            if (Laya._ISAPP_)
                this.set_onclick(function() {
                    Laya.conch.setExternalLink(_g.get_href(), null);
                });
        },
        destroy: function() {
            laya.element.ExternalLink.linkPool.push(this.systemA);
            return laya.element.Span.prototype.destroy.call(this);
        },
        onSystemATimer: function() {
            var a = this.systemA;
            if (!this.isView()) {
                if (a.style.display != "none")
                    a.style.display = "none";
                return true;
            }
            var pos = this.posOfTop2(null, 0, 0);
            var scale = this.getScaleFromParentNode(null, 1, 1);
            if (Laya.window.left + pos.x - this.get_scrollLeft() != Laya.parseInt(a.style.left))
                a.style.left = Laya.window.left + pos.x - this.get_scrollLeft() + "px";
            if (Laya.window.top + pos.y - this.get_scrollTop() != Laya.parseInt(a.style.top))
                a.style.top = Laya.window.top + pos.y - this.get_scrollTop() + "px";
            if (this.get_width() * scale.x != Laya.parseInt(a.style.width))
                a.style.width = this.get_width() * scale.x + "px";
            if (this.get_height() * scale.y != Laya.parseInt(a.style.height))
                a.style.height = this.get_height() * scale.y + "px";
            if (a.style.display == "none")
                a.style.display = "";
            return true;
        },
        __class__: laya.element.ExternalLink
    });
    laya.element.FileNode = function() {
        laya.element.Node.call(this);
        this._preload_ = false;
    };
    laya.element.FileNode.__name__ = true;
    laya.element.FileNode.__super__ = laya.element.Node;
    laya.element.FileNode.prototype = $extend(laya.element.Node.prototype, {
        created: function() {
            var _g = this;
            laya.element.Node.prototype.created.call(this);
            if (this._with_ != null)
                laya.io.FileFactory.setVrFile(this.m_src, this);
            this.file = laya.io.File._instance_(this.m_src, this._filetype_, {
                preload: this._preload_,
                onload: function(file) {
                    _g.file = file;
                    _g.set_complete(true);
                }
            });
        },
        set_src: function(url) {
            return this.m_src = this.formatUrl(url);
        },
        set_withdata: function(s) {
            this._withdata_ = s;
        },
        set_preload: function(b) {
            this._preload_ = b;
        },
        set_with: function(s) {
            this._with_ = this.formatUrl(s);
        },
        set_type: function(s) {
            this._filetype_ = s;
        },
        __class__: laya.element.FileNode
    });
    laya.element.Head = function() {
        laya.element.Node.call(this);
    };
    laya.element.Head.__name__ = true;
    laya.element.Head.__super__ = laya.element.Node;
    laya.element.Head.prototype = $extend(laya.element.Node.prototype, {
        __class__: laya.element.Head
    });
    laya.element.Iframe = function() {
        this._pause = false;
        this._preTime = 0;
        laya.element.CanvasNode.call(this);
        this.set_mode("disable");
        this.m_cancelBubble = true;
    };
    laya.element.Iframe.__name__ = true;
    laya.element.Iframe.disableOtherIFrame = function(iframe, name) {
        var iframes = Laya.document.iframe;
        var _g1 = 0, _g = iframes.length;
        while (_g1 < _g) {
            var i = _g1++;
            var o = iframes[i];
            if (o == null || o.deleted || o.onlyActiveName == "none" || o.onlyActiveName != name || o == iframe ||!o.show())
                continue;
            o.show(false);
        }
        return true;
    }
    laya.element.Iframe.__super__ = laya.element.CanvasNode;
    laya.element.Iframe.prototype = $extend(laya.element.CanvasNode.prototype, {
        set_viewsrc: function(url) {
            this._viewUrl = laya.io.File._formatUrl_(url, this.baseURL != null ? this.baseURL.path : null);
            return this._viewUrl;
        },
        _review_: function(v) {
            laya.element.CanvasNode.prototype._review_.call(this, v);
            if (this._viewUrl != null && (this._type_ & 65536) == 65536) {
                this.importHTML(this._viewUrl, null);
                this._viewUrl = null;
            }
        },
        set_src: function(url) {
            this.m_src = this.formatUrl(url);
            this.importHTML(this.m_src, null);
            return this.m_src;
        },
        set_fullscreen: function(b) {},
        _createSelfTimer_: function() {
            var _g = this;
            this.timerCtrl = new laya.utils.LayaTimer();
            this._preTime = this.parentNode.timerCtrl.curtime;
            this._updatetimer_ = this.parentNode.timerCtrl.createUpdateTimer(this);
            this._updatetimer_.update = function(tm) {
                if (!_g._pause)
                    _g.timerCtrl.run(tm - _g._preTime);
                _g._preTime = tm;
                return true;
            };
        },
        set_activename: function(name) {
            this.onlyActiveName = name;
            this._createSelfTimer_();
            if (name != "none")
                laya.element.Iframe.disableOtherIFrame(this, name);
        },
        show: function(b) {
            if (this.onlyActiveName == null)
                return laya.element.CanvasNode.prototype.show.call(this, b);
            var preb = this.hidden;
            laya.element.CanvasNode.prototype.show.call(this, b);
            if (preb == this.hidden)
                return this.hidden == 0;
            this._pause = this.hidden != 0;
            this.hidden == 0 && this.onlyActiveName != "none" && laya.element.Iframe.disableOtherIFrame(this, this.get_name());
            return !this._pause;
        },
        set_timeractive: function(b) {
            this._pause=!b;
        },
        onParent: function(parent) {
            Laya.document.iframe.push(this);
        },
        __class__: laya.element.Iframe
    });
    laya.element.ImagesPack = function() {
        this.html = "";
        laya.element.Node.call(this);
        this.mustLoadImg = false;
    };
    laya.element.ImagesPack.__name__ = true;
    laya.element.ImagesPack.find = function(src) {
        return laya.element.ImagesPack.__ImagesPack__.get(src);
    }
    laya.element.ImagesPack.__super__ = laya.element.Node;
    laya.element.ImagesPack.prototype = $extend(laya.element.Node.prototype, {
        set_src: function(url) {
            this.m_src = this.formatUrl(url);
            this.set_complete(false);
            laya.element.ImagesPack.__ImagesPack__.set(this.m_src, this);
            return this.m_src;
        },
        created: function() {
            var _g = this;
            laya.element.Node.prototype.created.call(this);
            var file = laya.io.File._instance_(this.m_src, "text", {
                onload: function(file1) {
                    _g.set_complete(true);
                    _g._onloaded_(file1);
                    var p = _g.parentNode;
                    p != null && p._checkAllComplete_();
                }
            });
        },
        _onloaded_: function(file) {
            var xml = new laya.utils.Xml(file.getData(), "dict");
            var rootDict = xml.root;
            if (rootDict == null)
                console.log("err:" + file.getData());
            var path = laya.utils.Method.getPath(file.getUrl());
            var dict = rootDict.getNodeForKey("metadata");
            this.imgurl = laya.io.File._formatUrl_(dict.getValueForKey("realTextureFileName"), path);
            dict = rootDict.getNodeForKey("frames");
            var j = 0, s2 = dict.childNodes.length;
            while (j < s2) {
                this._addframes_(dict.childNodes[j], dict.childNodes[j + 1], path);
                j += 2;
            }
            this.onloaded();
            if (this.mustLoadImg)
                this.enable();
        },
        _addframes_: function(keyNode, dict, path) {
            var newimgurl = laya.io.File._formatUrl_(keyNode.value, path);
            var img = null;
            if (this.outhtmlpath != null)
                this.html += "<file type='image' with='" + this.toMinUrl(this.imgurl, this.outhtmlpath) + "' src='" + this.toMinUrl(newimgurl, this.outhtmlpath) + "'";
            else {
                img = new laya.element.FileNode();
                img.set_type("image");
                img.set_with(this.imgurl);
                img.set_src(newimgurl);
            }
            var withData = {};
            withData.width = dict.getIntegerForKey("width");
            withData.height = dict.getIntegerForKey("height");
            withData.left = dict.getIntegerForKey("x");
            withData.top = dict.getIntegerForKey("y");
            withData.owidth = dict.getIntegerForKey("originalWidth");
            withData.oheight = dict.getIntegerForKey("originalHeight");
            withData.ox = withData.owidth / 2 - (withData.width / 2 - dict.getIntegerForKey("offsetX"));
            withData.oy = withData.oheight / 2 - (withData.height / 2 + dict.getIntegerForKey("offsetY"));
            if (this.outhtmlpath != null)
                this.html += " withdata='width:" + Std.string(withData.width) + ";height:" + Std.string(withData.height) + ";owidth:" + Std.string(withData.owidth) + ";oheight:" + Std.string(withData.oheight) + ";left:" + Std.string(withData.left) + ";top:" + Std.string(withData.top) + ";ox:" + Std.string(withData.ox) + ";oy:" + Std.string(withData.oy) + "'/>\n";
            else {
                img.created();
                img.file.setExtData(withData);
            }
        },
        set_mustloadimg: function(b) {
            this.mustLoadImg = b;
        },
        toMinUrl: function(url, path) {
            if (url.indexOf(path) == 0)
                return url.substring(path.length, url.length);
            return url;
        },
        enable: function() {
            if (this.fileImg != null)
                return;
            this.fileImg = laya.io.File._instance_(this.imgurl, "image");
        },
        __class__: laya.element.ImagesPack
    });
    laya.element.ImportOnce = function() {
        laya.element.Node.call(this);
        this.set_complete(true);
    };
    laya.element.ImportOnce.__name__ = true;
    laya.element.ImportOnce.__super__ = laya.element.Node;
    laya.element.ImportOnce.prototype = $extend(laya.element.Node.prototype, {
        set_text: function(txt) {
            var key = this._name_ != null ? this._name_: this.baseURL.url + " fileoffset:" + this._fileOffset_;
            if (!laya.element.ImportOnce._ImportOnce_.get(key)) {
                this.parentNode.appendHTML(txt);
                laya.element.ImportOnce._ImportOnce_.set(key, true);
            }
            this.destroy();
            return null;
        },
        set_name: function(name) {
            return this._name_ = name;
        },
        __class__: laya.element.ImportOnce
    });
    laya.element.Input = function() {
        this._isNullText = true;
        this._information = null;
        this._enablescroll_ = true;
        this.m_type = "text";
        this.m_readonly = false;
        this.m_maxlength = 999999999;
        this.textarea = false;
        this.wordType = 0;
        laya.element.Element.call(this);
        this.style.set_block(true);
        this.style._type_|=16777216;
        true;
    };
    laya.element.Input.__name__ = true;
    laya.element.Input._init_ = function() {
        laya.element.Input._BROWSER_INPUT_ = Laya.jdocument.createElement("input");
        if (Laya._ISHTML5_) {
            Laya.jdocument.body.appendChild(laya.element.Input._BROWSER_INPUT_);
            laya.element.Input._BROWSER_INPUT_.setStyle = function(style) {
                laya.element.Input._BROWSER_INPUT_.style.cssText = style;
            };
            laya.element.Input._BROWSER_INPUT_.setColor = function(color) {
                laya.element.Input._BROWSER_INPUT_.style.color = color;
            };
            laya.element.Input._BROWSER_INPUT_.setFontSize = function(sz) {
                laya.element.Input._BROWSER_INPUT_.style.fontSize = sz + "px";
            };
            laya.element.Input._BROWSER_INPUT_.setFontID = function(fontInfo, fontID) {};
            laya.element.Input._BROWSER_INPUT_.setOpacity = function(opacity) {
                laya.element.Input._BROWSER_INPUT_.style.opacity = opacity;
            };
            laya.element.Input._BROWSER_INPUT_.setPos = function(left, top) {
                laya.element.Input._BROWSER_INPUT_.style.left = left + "px";
                laya.element.Input._BROWSER_INPUT_.style.top = top + "px";
            };
            laya.element.Input._BROWSER_INPUT_.setSize = function(w, h) {
                laya.element.Input._BROWSER_INPUT_.style.width = w + "px";
                laya.element.Input._BROWSER_INPUT_.style.height = h + "px";
            };
            laya.element.Input._BROWSER_INPUT_.setValue = function(value) {
                if (value != null) {
                    laya.element.Input._BROWSER_INPUT_.value = value;
                    return laya.element.Input._BROWSER_INPUT_.value;
                }
                return laya.element.Input._BROWSER_INPUT_.value;
            };
            laya.element.Input._BROWSER_INPUT_.getValue = function() {
                return laya.element.Input._BROWSER_INPUT_.value;
            };
            laya.element.Input._BROWSER_INPUT_.setCursorPosition = function(pos) {
                if (Laya._ISAPP_)
                    return;
                var ctrl = laya.element.Input._BROWSER_INPUT_;
                if (ctrl.setSelectionRange != null)
                    ctrl.setSelectionRange(pos, pos);
                else if (ctrl.createTextRange) {
                    var range = ctrl.createTextRange();
                    range.collapse(true);
                    range.moveEnd("character", pos);
                    range.moveStart("character", pos);
                    range.select();
                }
            };
            laya.element.Input._BROWSER_INPUT_.setScale = function(scalex, scaley) {
                laya.element.Input._BROWSER_INPUT_.style.webkitTransform = "scale(" + scalex + "," + scaley + ")";
                laya.element.Input._BROWSER_INPUT_.style.mozTransform = "scale(" + scalex + "," + scaley + ")";
                laya.element.Input._BROWSER_INPUT_.style.oTransform = "scale(" + scalex + "," + scaley + ")";
                laya.element.Input._BROWSER_INPUT_.style.msTransform = "scale(" + scalex + "," + scaley + ")";
            };
            laya.element.Input._BROWSER_INPUT_.setType = function(type) {
                laya.element.Input._BROWSER_INPUT_.type = type;
            };
            laya.element.Input._BROWSER_INPUT_.setMaxLength = function(maxLength) {
                laya.element.Input._BROWSER_INPUT_.maxLength = maxLength;
            };
        }
        laya.element.Input._BROWSER_INPUT_.setPosCheck = function(left, top) {
            if (laya.element.Input._BROWSER_INPUT_.__left == left && laya.element.Input._BROWSER_INPUT_.__top == top)
                return;
            laya.element.Input._BROWSER_INPUT_.__left = left;
            laya.element.Input._BROWSER_INPUT_.__top = top;
            laya.element.Input._BROWSER_INPUT_.setPos(left, top);
        };
        laya.element.Input._BROWSER_INPUT_.setStyle("-webkit-transform-origin:left top;-moz-transform-origin:left top;transform-origin:left top;-ms-transform-origin:left top;TEXT-DECORATION:none;outline:none;border:none;background:none;position:absolute;left:-3px;top:-200px;z-index:999999999;width:2px;height:2px");
        laya.element.Input._BROWSER_INPUT_.setOpacity(1);
    }
    laya.element.Input._updatePos = function() {
        if (Laya.document.activeInputElement != null) {
            var pos = Laya.document.activeInputElement.posOfTop2(null, 0, 0);
            if (Laya._ISHTML5_)
                laya.element.Input._BROWSER_INPUT_.setPosCheck(Laya.parseInt(pos.x + Laya.window.left), Laya.parseInt(pos.y + Laya.window.top));
            else 
                laya.element.Input._BROWSER_INPUT_.setPosCheck(Laya.parseInt(pos.x), Laya.parseInt(pos.y));
        }
    }
    laya.element.Input.__super__ = laya.element.Element;
    laya.element.Input.prototype = $extend(laya.element.Element.prototype, {
        onchange: function() {},
        onkeypress: function(event) {
            return true;
        },
        set_text: function(txt) {
            if (this.wordType == laya.element.Input.__INPUT_WORDTYPE_NUMBERS__) {
                txt = laya.element.Input._REG_NUMBERONLY_.replace(txt, "");
                var number = Laya.Number(txt);
                if (this._private_.input_maxnum != null && number > this._private_.input_maxnum)
                    number = this._private_.input_maxnum;
                if (this._private_.input_minnum != null && number < this._private_.input_minnum)
                    number = this._private_.input_minnum;
                txt = "" + number;
            }
            this._isNullText = txt == null || txt == "";
            if (this._isNullText && this._information != null)
                txt = this._information;
            var bchg = txt != this.textContent;
            laya.element.Element.prototype.set_text.call(this, txt);
            if (bchg) {
                this.dispatchEvent(null, "onchange");
                laya.xhtml.HtmlLayout.typeset(this);
            }
            if (Laya.document.activeInputElement == this)
                laya.element.Input._BROWSER_INPUT_.setValue(this._isNullText ? "" : txt);
            return this.textContent;
        },
        destroy: function() {
            if (this.deleted)
                return true;
            if (!laya.element.Element.prototype.destroy.call(this))
                return false;
            if (Laya.document.activeInputElement == this) {
                Laya.document.activeInputElement = null;
                this._onblur_();
            }
            return true;
        },
        _onblur_: function() {
            if (Laya.document.activeInputElement == this) {
                Laya.document.activeInputElement = null;
                laya.element.Input._BROWSER_INPUT_.setPosCheck(-10000, -10000);
                laya.element.Input._BROWSER_INPUT_.blur();
                this.set_text(laya.element.Input._BROWSER_INPUT_.getValue());
                if (this.deleted)
                    return;
                if ((this._matter_ & 4194304) == 4194304) {
                    this._matter_&=-4194305;
                    this._paintfn_ = laya.display.RenderHtml._paint_check;
                }
            }
            this.repaint();
        },
        _onfocus_: function() {
            if (this.deleted || this.m_readonly)
                return;
            if (Laya.document.activeInputElement == this)
                return;
            var pos = this.posOfTop2(null, 0, 0);
            var scale = this.getScaleFromParentNode(null, 1, 1);
            laya.element.Input._BROWSER_INPUT_.setValue(this._isNullText ? "" : this.get_text());
            if (Laya._ISHTML5_)
                laya.element.Input._BROWSER_INPUT_.setPosCheck(Laya.parseInt(pos.x + Laya.window.left), Laya.parseInt(pos.y + Laya.window.top));
            else 
                laya.element.Input._BROWSER_INPUT_.setPosCheck(Laya.parseInt(pos.x), Laya.parseInt(pos.y));
            var data = this.style.data;
            laya.element.Input._BROWSER_INPUT_.setSize(Laya.parseInt(this.get_width() - data.border.width - data.padding.width), Laya.parseInt(this.get_height() - data.border.width - data.padding.height));
            laya.element.Input._BROWSER_INPUT_.setColor(this.style.font.color.toString());
            laya.element.Input._BROWSER_INPUT_.setFontSize(this.style.font.size);
            laya.element.Input._BROWSER_INPUT_.setFontID(this.style.font._toText_(), this.style.font.fontId);
            laya.element.Input._BROWSER_INPUT_.setScale(scale.x, scale.y);
            laya.element.Input._BROWSER_INPUT_.setType(this.m_type);
            laya.element.Input._BROWSER_INPUT_.setMaxLength(this.m_maxlength);
            laya.element.Input._BROWSER_INPUT_.setCursorPosition(0);
            this.addMatter(4194304);
            this.repaint();
            Laya.document.activeInputElement = this;
        },
        _review_: function(v) {
            laya.element.Element.prototype._review_.call(this, v);
            if (!((this._type_ & 65536) == 65536) && Laya.document.activeInputElement == this)
                this._onblur_();
        },
        setMinNum: function(d) {
            this._private_.input_minnum = d;
        },
        setMaxNum: function(d) {
            this._private_.input_maxnum = d;
        },
        setNumberonly: function(b) {
            this.wordType = laya.element.Input.__INPUT_WORDTYPE_NUMBERS__;
        },
        get_readonly: function() {
            return this.m_readonly;
        },
        get_value: function() {
            if (this.get_focus())
                return laya.element.Input._BROWSER_INPUT_.value;
            return laya.element.Element.prototype.get_value.call(this);
        },
        set_information: function(s) {
            this._information = s;
            if (this.get_text() == "" || this.get_text() == null)
                this.set_text("");
            this.repaint();
        },
        set_readonly: function(b) {
            this.m_readonly = b;
            this.set_cancelBubble(!b);
            this.repaint();
            return this.m_readonly;
        },
        set_type: function(s) {
            this.m_type = s;
            if (s == "textarea")
                this.textarea = true;
            if (s == "password") {
                this.style.setPassWord();
                this.repaint();
            }
        },
        _onmousedown_: function(e) {
            this.set_focus(true);
        },
        _onmouseup_: function(e) {},
        created: function() {
            if (this.get_text() == null)
                this.set_text("");
            laya.element.Element.prototype.created.call(this);
            this.style.css("overflow", "hidden");
            if (!this.textarea)
                this.style.css("vertical-align", "middle");
            this.style.css("white-space", "nowrap");
            this.addMatter(65536);
            if ((this.get_text() == "" || this.get_text() == null) && this._information != null)
                this.set_text(this._information);
        },
        onParent: function(parent) {
            laya.element.Element.prototype.onParent.call(this, parent);
            this.set_draggable("default");
            this.attachEvent("onmousedown", $bind(this, this._onmousedown_));
            this.attachEvent("onfocus", $bind(this, this._onfocus_));
            this.attachEvent("onblur", $bind(this, this._onblur_));
        },
        set_maxlength: function(d) {
            this.m_maxlength = d;
        },
        __class__: laya.element.Input
    });
    laya.element.Link = function() {
        this._loadtype_ = 1;
        this.order = "true";
        this.m_type = "text";
        this.includeonce = false;
        this.rel = "body";
        laya.element.Node.call(this);
        this.set_complete(false);
    };
    laya.element.Link.__name__ = true;
    laya.element.Link.__super__ = laya.element.Node;
    laya.element.Link.prototype = $extend(laya.element.Node.prototype, {
        onCreated: function() {
            if (this.m_src == null) {
                this.set_complete(true);
                return;
            }
            this.m_src = Laya.document.toHtmlUrl(this.m_src);
            this.m_src = this.formatUrl(this.m_src);
            if (this.rel == "prefetch") {
                this._loadtype_ = 3;
                this.set_complete(true);
                this.file = laya.io.File._instance_(this.m_src, this.m_type, null);
                if (this._lockfile_)
                    this.file.addRef();
                return;
            }
            if (this.includeonce && laya.element.Link._linkfiles_.get(this.m_src) != null) {
                this._loadtype_ = 3;
                this.set_complete(true);
                this.parentNode._checkAllComplete_();
                return;
            }
            Laya.document.addWait("link:" + this.m_src);
            this.set_complete(false);
            laya.element.Link._linkfiles_.set(this.m_src, this.m_src);
            this.file = laya.io.File._instance_(this.m_src, this.m_type, {
                onload: $bind(this, this._onload_)
            });
            if (this._lockfile_)
                this.file.addRef();
        },
        set_lockfile: function() {
            this._lockfile_ = true;
        },
        set_rel: function(s) {
            return this.rel = s;
        },
        set_href: function(s) {
            return this.m_src = s;
        },
        set_type: function(s) {
            return this.m_type = s;
        },
        set_includeonce: function(b) {
            return this.includeonce = b;
        },
        _onload_: function(file) {
            this.file = file;
            if (this.rel == "prefetch")
                return;
            this.file = file;
            this._loadtype_ = 2;
            Laya.document.removeWait("link:" + this.m_src);
            var p = this.parentNode;
            if (p == null) {
                this._useFile_();
                this.onload();
                return;
            }
            var links = p.select(function(o) {
                return o.nodeName == "link" || o.nodeName == "script";
            });
            var obj;
            var _g1 = 0, _g = links.length;
            while (_g1 < _g) {
                var i = _g1++;
                obj = links[i];
                if ((obj._type_ & 8192) == 8192 || obj.deleted)
                    continue;
                if (obj._loadtype_ == 1) {
                    p = null;
                    break;
                }
                obj._useFile_();
            }
            p != null && p._checkAllComplete_();
            this.onload();
        },
        onload: function() {},
        _useFile_: function() {
            if ((this._type_ & 8192) == 8192)
                return;
            this._loadtype_ = 3;
            this.set_complete(true);
            if (this.rel == "prefetch")
                return;
            var _g = this;
            switch (_g.m_type) {
            case"image":
                break;
            case"text/css":
                laya.css.CSSMethod.styleNodeToScript(this, this.file.getData(), this.file.getPath());
                break;
            case"text/laya/compile":
            case"text/html/compile":
                var h = new laya.xhtml.HtmlCompile();
                h.compile(this.file.getData(), this.get_parent(), new laya.utils.URLEX(this.file.getUrl()), true);
                break;
            case"text/laya":
            case"text/html":
                var parent = Laya.I(this.rel);
                if (parent == null) {
                    console.log("link file err:" + this.m_src + " parent:" + this.rel);
                    return;
                }
                var tm = laya.utils.Method.getCurTime();
                new laya.xhtml.HtmlParse().parse(this.file.getData(), parent, new laya.utils.URLEX(this.file.getUrl()));
                var delay = laya.utils.Method.getCurTime() - tm;
                if (delay > 100)
                    console.log("import html delay:" + delay + " url=" + this.file.getUrl() + " size=" + this.file.getData().length);
                break;
            case"text/script":
                laya.utils.Method.execScript(this.file.getData(), this.file.getUrl());
                break;
            }
        },
        __class__: laya.element.Link
    });
    laya.element.Meta = function() {
        laya.element.Node.call(this);
    };
    laya.element.Meta.__name__ = true;
    laya.element.Meta.__super__ = laya.element.Node;
    laya.element.Meta.prototype = $extend(laya.element.Node.prototype, {
        set_size: function(w, h) {
            Laya.window.resizeTo(w, h);
        },
        set_title: function(s) {
            Laya.window.title(s);
        },
        __class__: laya.element.Meta
    });
    laya.element.Script = function() {
        laya.element.Link.call(this);
        this.m_type = "text/script";
    };
    laya.element.Script.__name__ = true;
    laya.element.Script.__super__ = laya.element.Link;
    laya.element.Script.prototype = $extend(laya.element.Link.prototype, {
        set_text: function(txt) {
            laya.utils.Method.execScript(txt);
            return null;
        },
        set_src: function(src) {
            this.m_src = src;
            return this.m_src;
        },
        __class__: laya.element.Script
    });
    laya.element.ScrollBar = function() {
        this.staticMidBarSize =- 1;
        this.preScrollTop =- 1;
        this.preScrollLeft =- 1;
        this.alphasetp = 0.02;
        this.minalpha = 0;
        this.curScrollTm = 0;
        laya.element.Element.call(this);
        if (this.style != null)
            this.style.set_block(true);
        this.ofblank = true;
        this.regEventCode("onmousedown", $bind(this, this._mousedown_));
    };
    laya.element.ScrollBar.__name__ = true;
    laya.element.ScrollBar.__define_default__ = function() {
        var scrolldefine = "" + "<html><head><assembly name=\"scrollbar-left\">\n" + "\t<scrollbar pos=\"0 0\" scrolltype=\"left\" style=\"left:0%-100%-2;border-radius:3;border:1 solid none;width:6;height:100%;background:rgba(200,200,200,0.3)\" \n" + "\t\t\tminalpha=\"0.002\" cancelbubble=\"true\"\n" + "\t\t\tonmouseover=\"this.set_alpha(1);this.set_bgcolor('rgba(200,200,200,0.7)');\"\n" + "\t\t\tonmouseout=\"this.set_bgcolor('rgba(200,200,200,0.3)');\">\n" + "\t\t\t<scrollmidbar pos=\"0 0\"  cancelbubble=\"true\" style=\"border-radius:3;border:0.1 solid none;width:100%;height:100;background:rgba(150,150,150,0.3)\" />\n" + "\t</scrollbar>\n" + "</assembly>\n" + "<assembly name=\"scrollbar-right\">\n" + "\t<scrollbar pos=\"0 0\" scrolltype=\"right\" style=\"left:100%+2;border-radius:3;border:1 solid none;width:6;height:100%;background:rgba(200,200,200,0.3)\" \n" + "\t\t\tminalpha=\"0.002\" cancelbubble=\"true\"\n" + "\t\t\tonmouseover=\"this.set_alpha(1);this.set_bgcolor('rgba(200,200,200,0.7)');\"\n" + "\t\t\tonmouseout=\"this.set_bgcolor('rgba(200,200,200,0.3)');\">\n" + "\t\t\t<scrollmidbar pos=\"0 0\"  cancelbubble=\"true\" style=\"border-radius:3;border:0.1 solid none;width:100%;height:100;background:rgba(150,150,150,0.3)\" />\n" + "\t</scrollbar>\n" + "</assembly>\n" + "<assembly name=\"scrollbar-bottom\">\n" + "\t<scrollbar pos=\"0 0\" scrolltype=\"bottom\" style=\"top:100%+2;border-radius:3;border:1 solid none;width:100%;height:6;background:rgba(200,200,200,0.3)\" \n" + "\t\t\tminalpha=\"0.002\" cancelbubble=\"true\"\n" + "\t\t\tonmouseover=\"this.set_alpha(1);this.set_bgcolor('rgba(200,200,200,0.7)');\"\n" + "\t\t\tonmouseout=\"this.set_bgcolor('rgba(200,200,200,0.3)');\">\n" + "\t\t\t<scrollmidbar pos=\"0 0\"  cancelbubble=\"true\" style=\"border-radius:3;border:0.1 solid none;width:32;height:100%;background:rgba(150,150,150,0.3)\" />\n" + "\t</scrollbar>\n" + "</assembly></head></html>";
        Laya.document.body.appendHTML(scrolldefine);
    }
    laya.element.ScrollBar.__super__ = laya.element.Element;
    laya.element.ScrollBar.prototype = $extend(laya.element.Element.prototype, {
        created: function() {
            laya.element.Element.prototype.created.call(this);
            if (this.target != null) {
                this.midbar.set_target(this.target);
                this._onscroll_();
            }
        },
        set_target: function(o) {
            var pre = this.target;
            if (Laya.typeIsString(o))
                this.target = Laya.I(o);
            else 
                this.target = o;
            if (pre == this.target || this.midbar == null)
                return;
            this.set_alpha(this.minalpha);
            this.target.attachEvent("onscroll", $bind(this, this._onscroll_), this);
            this.midbar.set_target(this.target);
            this._onscroll_();
            this.show(false);
        },
        set_staticMidBarSize: function(sz) {
            this.staticMidBarSize = sz;
        },
        set_minalpha: function(d) {
            this.minalpha = d;
            this.set_alpha(this.minalpha);
            if (Laya.isNaN(this.minalpha))
                console.log("minalpha err:" + this.minalpha);
        },
        set_alphasetp: function(d) {
            this.alphasetp = d;
        },
        set_scrolltype: function(s) {
            this.scrolltype = s;
        },
        _timerUpdata_: function(tm) {
            var a = this.get_alpha() + (tm - this.curScrollTm > 500 && Laya.document.dragingElement != this.midbar && this._private_.onmouseover == null?-this.alphasetp : this.alphasetp);
            if (a < this.minalpha)
                a = this.minalpha;
            if (a <= 1)
                this.set_alpha(a);
            return a > this.minalpha;
        },
        _onscroll_: function() {
            if (this.alphasetp == 0)
                return;
            if (this.scrolltype == "bottom") {
                if (Math.abs(this.preScrollLeft - this.target.get_scrollLeft()) < 4)
                    return;
                this.preScrollLeft = this.target.get_scrollLeft();
                if (this.get_width() >= this.target.get_scrollWidth()) {
                    this.set_alpha(0);
                    this.show(false);
                    return;
                }
            } else {
                if (Math.abs(this.preScrollTop - this.target.get_scrollTop()) < 4)
                    return;
                this.preScrollTop = this.target.get_scrollTop();
                if (this.get_height() >= this.target.get_scrollHeight()) {
                    this.set_alpha(0);
                    this.show(false);
                    return;
                }
            }
            this.show(true);
            this.curScrollTm = this.timerCtrl.curtime;
            if (this.timer == null || this.timer.deleted) {
                this.timer = this.timerCtrl.createUpdateTimer(this);
                this.timer.update = $bind(this, this._timerUpdata_);
            }
        },
        _mousedown_: function(e) {
            if (this.scrolltype == "bottom") {
                if (e.offsetX > this.midbar.get_left()) {
                    var p = this.target.get_scrollLeft();
                    p += Math.round(this.target.get_width() / 2);
                    var maxx = this.target.get_scrollWidth() - this.target.get_width();
                    if (p > maxx)
                        p = maxx;
                    this.target.set_scrollLeft(p);
                }
                if (e.offsetX < this.midbar.get_left()) {
                    var p = this.target.get_scrollLeft();
                    p -= Math.round(this.target.get_width() / 2);
                    if (p < 0)
                        p = 0;
                    this.target.set_scrollLeft(p);
                }
            } else {
                if (e.offsetY > this.midbar.get_top()) {
                    var p = this.target.get_scrollTop();
                    p += Math.round(this.target.get_height() / 2);
                    var maxy = this.target.get_scrollHeight() - this.target.get_height();
                    if (p > maxy)
                        p = maxy;
                    this.target.set_scrollTop(p);
                }
                if (e.offsetY < this.midbar.get_top()) {
                    var p = this.target.get_scrollTop();
                    p -= Math.round(this.target.get_height() / 2);
                    if (p < 0)
                        p = 0;
                    this.target.set_scrollTop(p);
                }
            }
        },
        __class__: laya.element.ScrollBar
    });
    laya.element.ScrollMidBar = function() {
        this.midsize =- 1;
        laya.element.Element.call(this);
        if (this.style != null)
            this.style.set_block(true);
    };
    laya.element.ScrollMidBar.__name__ = true;
    laya.element.ScrollMidBar.__super__ = laya.element.Element;
    laya.element.ScrollMidBar.prototype = $extend(laya.element.Element.prototype, {
        set_target: function(target) {
            var p;
            p = this.parentNode._toElement_();
            this.is_scroll_h = p.scrolltype == "top" || p.scrolltype == "bottom";
            if (this.target != target) {
                this.target = target;
                target.attachEvent("onscrollsize", $bind(this, this._resize_), this);
                target.attachEvent("onresize", $bind(this, this._resize_), this);
                target.attachEvent("onscroll", $bind(this, this._onscroll_), this);
                this.attachEvent("ondrag", $bind(this, this._ondrag_));
                this.set_draggable("move-in");
            }
            this._resize_();
        },
        _onscroll_: function() {
            if (Laya.document.dragingElement == this)
                return;
            var p = this.parentNode._toElement_();
            if (this.is_scroll_h) {
                var sx = this.target.get_scrollLeft();
                var sw = this.target.get_scrollWidth() - this.target.get_width();
                if (sx < 0)
                    sx = 0;
                if (sx > sw)
                    sx = sw;
                var d = sw == 0 ? 0: sx / sw * (p.get_width() - this.get_width());
                this.set_left(Math.round(d));
            } else {
                var sy = this.target.get_scrollTop();
                var sh = this.target.get_scrollHeight() - this.target.get_height();
                if (sy < 0)
                    sy = 0;
                if (sy > sh)
                    sy = sh;
                var d = sh == 0 ? 0: sy / sh * (p.get_height() - this.get_height());
                this.set_top(Math.round(d));
            }
        },
        created: function() {
            laya.element.Element.prototype.created.call(this);
            this.parentNode.midbar = this;
        },
        _ondrag_: function() {
            var p = this.parentNode._toElement_();
            if (this.is_scroll_h) {
                if (p.get_width() <= this.get_width())
                    return;
                var x = this.get_left();
                var b = x / (p.get_width() - this.get_width());
                var sw = this.target.get_scrollWidth() - this.target.get_width();
                this.target.set_scrollLeft(Math.round(b * sw));
            } else {
                if (p.get_height() <= this.get_height())
                    return;
                var y = this.get_top();
                var b = y / (p.get_height() - this.get_height());
                var sh = this.target.get_scrollHeight() - this.target.get_height();
                this.target.set_scrollTop(Math.round(b * sh));
            }
        },
        _resize_: function() {
            var p;
            p = this.parentNode;
            var staticSz = p.staticMidBarSize;
            if (this.is_scroll_h) {
                var d = Math.round(this.target.get_width() / this.target.get_scrollWidth() * p.get_width());
                if (d < 32)
                    d = 32;
                this.set_width(staticSz > 0 ? staticSz : d);
            } else {
                var d = Math.round(this.target.get_height() / this.target.get_scrollHeight() * p.get_height());
                if (d < 32)
                    d = 32;
                this.set_height(staticSz > 0 ? staticSz : d);
            }
            this._onscroll_();
        },
        __class__: laya.element.ScrollMidBar
    });
    laya.element.Style = function() {
        laya.element.Node.call(this);
    };
    laya.element.Style.__name__ = true;
    laya.element.Style.__super__ = laya.element.Node;
    laya.element.Style.prototype = $extend(laya.element.Node.prototype, {
        set_text: function(txt) {
            laya.css.CSSMethod.styleNodeToScript(this, txt, this.baseURL != null ? this.baseURL.path : null);
            return null;
        },
        __class__: laya.element.Style
    });
    laya.element.Wait = function() {
        laya.element.Node.call(this);
        this._type_|=1;
    };
    laya.element.Wait.__name__ = true;
    laya.element.Wait.__super__ = laya.element.Node;
    laya.element.Wait.prototype = $extend(laya.element.Node.prototype, {
        parseHtml: function(html, startOfs) {
            var nodenum = 0, i = startOfs, s = 0;
            try {
                while (i < html.length) {
                    if (s++>1000)
                        Laya["debugger"]();
                    var c = html.charAt(i);
                    switch (c) {
                    case"\"":
                    case"'":
                        i = laya.utils.Method.endOfQuotes(html, c, i + 1);
                        if (i < 0) {
                            i = html.length;
                            throw "__break__";
                        }
                        break;
                    case"/":
                        if (html.charAt(i + 1) == ">") {
                            i++;
                            if (--nodenum < 0)
                                throw "__break__";
                        }
                        break;
                    case"<":
                        if (html.charAt(i + 1) == "/") {
                            if (--nodenum < 0) {
                                i--;
                                throw "__break__";
                            }
                            i = html.indexOf(">", i + 1);
                            if (i < 0) {
                                i = html.length;
                                throw "__break__";
                            }
                        } else 
                            nodenum++;
                        break;
                    }
                    i++;
                }
            } catch (e) {
                if (e != "__break__")
                    throw e;
            }
            this.set_text(html.substring(startOfs, i));
            return i;
        },
        set_continue: function(s) {
            var _g2 = this;
            var ss = s.split(" ");
            var _g1 = 0, _g = ss.length;
            while (_g1 < _g) {
                var i = _g1++;
                Laya.document.attachEvent(ss[i], function() {
                    _g2.destroy();
                    _g2.parentNode.appendHTML(_g2.get_text());
                }, this);
            }
        },
        set_sleep: function(d) {
            var _g = this;
            this._sleep = d;
            this.addTimer(function() {
                _g.destroy();
                _g.parentNode.appendHTML(_g.get_text());
            }, this._sleep, 1);
        },
        __class__: laya.element.Wait
    });
    laya.element.WebSocket = function() {
        this.m_lastUpdateTm = 0;
        this.m_defaultPort = "";
        this.m_defaultIp = "";
        this.m_connectedCallBack = null;
        this.m_msgCache = "";
        this.m_bIsConnected = false;
        laya.element.Node.call(this);
    };
    laya.element.WebSocket.__name__ = true;
    laya.element.WebSocket._createSocket_ = function(url) {
        return null;
    }
    laya.element.WebSocket.__super__ = laya.element.Node;
    laya.element.WebSocket.prototype = $extend(laya.element.Node.prototype, {
        close: function() {
            if (this.m_socket != null)
                this.m_socket.close();
            this.m_socket.close();
            this.m_bIsConnected = false;
        },
        send: function(msg) {
            if (this.m_bIsConnected == true)
                this.m_socket.send(msg);
        },
        onclose: function(event) {
            console.log("Client notified socket has closed" + event);
        },
        onmessage: function(event) {
            console.log("Client received a message" + Std.string(event));
        },
        _onmessage: function(event) {
            var _msg = "";
            _msg = event.data ? event.data : event;
            this.m_msgCache += _msg;
            if (this.m_slpitStr == null)
                return;
            var strs = this.m_msgCache.split(this.m_slpitStr);
            if (strs.length < 1)
                return;
            if (this.m_msgCache.charAt(this.m_msgCache.length-1) != this.m_slpitStr) {
                this.m_msgCache = strs[strs.length-1];
                strs.length = strs.length-1;
            } else 
                this.m_msgCache = "";
            this.m_msgArray = this.m_msgArray.concat(strs);
        },
        processCacheMessage: function(tm) {
            this.SocketUpdate(tm);
            if (this.m_msgArray == null) {
                if (this.m_msgCache != "" && this.m_msgCache != null) {
                    this.onmessage(this.m_msgCache);
                    this.m_msgCache = "";
                }
                return;
            }
            if (this.m_msgArray.length == 0)
                return;
            var i = 0, sz = this.m_msgArray.length;
            if (Laya.setup.maxUpdateDelayWithSocket > 0) {
                var tm0 = Laya.window.updateTime;
                while (i < sz) {
                    this.onmessage(this.m_msgArray.pop());
                    i++;
                    if (laya.utils.Method.getCurTime() - tm0 > Laya.setup.maxUpdateDelayWithSocket)
                        break;
                }
                return;
            }
            while (i < sz) {
                this.onmessage(this.m_msgArray[i]);
                i++;
            }
            this.m_msgArray.length = 0;
        },
        SocketUpdate: function(tm) {},
        onopen: function(event) {
            this.m_bIsConnected = true;
            if (this.m_connectedCallBack != null)
                this.m_connectedCallBack.call(this);
            console.log("Client WebSocket onopen" + event);
        },
        openSocket: function(_ip, _port, _callback) {
            if (_ip == "" || _ip == null)
                _ip = this.m_defaultIp;
            if (_port == "" || _port == null)
                _port = this.m_defaultPort;
            console.log("connecting to " + _ip + ":" + _port);
            var _src = "ws://" + _ip + ":" + _port;
            if (this.m_bIsConnected == true && _src == this.m_src && _callback != null) {
                _callback.call(this);
                return;
            }
            this.m_connectedCallBack = _callback;
            this.set_src(_src);
        },
        setSplitChar: function(chr) {
            this.m_slpitStr = chr;
            return this.m_slpitStr.length == 1;
        },
        set_src: function(src) {
            this.m_src = src;
            if (!((this._type_ & 2097152) == 2097152))
                return this.m_src;
            if (src != "") {
                this.m_bIsConnected = false;
                this.m_socket = laya.element.WebSocket._createSocket_(src);
                this.m_socket.onopen = $bind(this, this.onopen);
                this.m_socket.onmessage = $bind(this, this._onmessage);
                this.m_socket.onclose = $bind(this, this.onclose);
            }
            return this.m_src;
        },
        set_defaultip: function(ip, port) {
            this.m_defaultIp = ip;
            this.m_defaultPort = port;
        },
        created: function() {
            this.m_cacheTimer = this.timerCtrl.createUpdateTimer(this);
            this.m_cacheTimer.update = $bind(this, this.processCacheMessage);
            if (this.m_src != "" && this.m_src != null) {
                this.m_bIsConnected = false;
                this.m_socket = laya.element.WebSocket._createSocket_(this.m_src);
                this.m_socket.onopen = $bind(this, this.onopen);
                this.m_socket.onmessage = $bind(this, this._onmessage);
                this.m_socket.onclose = $bind(this, this.onclose);
            }
            this._type_|=2097152;
        },
        __class__: laya.element.WebSocket
    });
    laya.element.WebView = function() {
        laya.element.Element.call(this);
    };
    laya.element.WebView.__name__ = true;
    laya.element.WebView.__super__ = laya.element.Element;
    laya.element.WebView.prototype = $extend(laya.element.Element.prototype, {
        set_src: function(src) {
            this.m_src = this.formatUrl(src);
            if ((this._type_ & 2097152) == 2097152)
                this.reload();
            return this.m_src;
        },
        reload: function() {
            if (this.m_src != null) {
                this.iframe.src = this.m_src;
                console.log("vebview:" + Std.string(this.iframe.src));
            }
        },
        _resize_pos_view_: function() {
            var _style = this.iframe.style;
            var padding = this.style.data.padding;
            _style.left = Laya.parseInt(this.get_left() + padding.left) + "px";
            _style.top = Laya.parseInt(this.get_top() + padding.top) + "px";
            _style.width = Laya.parseInt(this.get_width()) + "px";
            _style.height = Laya.parseInt(this.get_height()) + "px";
            _style.visibility = this.show() ? "visible" : "hidden";
        },
        onCreated: function() {
            laya.element.Element.prototype.onCreated.call(this);
            this.iframe = Laya.jdocument.createElement("iframe");
            this._resize_pos_view_();
            this.iframe.style.position = "absolute";
            this.iframe.style.zIndex = "999999999";
            this.iframe.style.border = "none";
            this.reload();
            Laya.jdocument.body.appendChild(this.iframe);
            this.attachEvent("onresize", $bind(this, this._resize_pos_view_), this);
            this.attachEvent("onrepos", $bind(this, this._resize_pos_view_), this);
            this.attachEvent("onreshow", $bind(this, this._resize_pos_view_), this);
        },
        __class__: laya.element.WebView
    });
    laya.element.action = {}
    laya.element.action.Intepretor = function() {};
    laya.element.action.Intepretor.__name__ = true;
    laya.element.action.Intepretor.linear = function(time, intepretorParam) {
        return time;
    }
    laya.element.action.Intepretor.ease_in = function(time, intepretorParam) {
        return Math.pow(time, intepretorParam == 0 ? 2 : intepretorParam);
    }
    laya.element.action.Intepretor.ease_out = function(time, intepretorParam) {
        return Math.pow(time, 1.0 / (intepretorParam == 0 ? 0.5 : intepretorParam));
    }
    laya.element.action.Intepretor.ease_in_out = function(time, intepretorParam) {
        if (intepretorParam == 0)
            intepretorParam = 2;
        var newTime = time * 2.0;
        if (newTime < 1.0)
            return 0.5 * Math.pow(newTime, intepretorParam);
        else 
            return 1.0-0.5 * Math.pow(2.0 - newTime, intepretorParam);
    }
    laya.element.action.Intepretor.ease_exp_in = function(time, intepretorParam) {
        return time == 0.0 ? 0.0 : Math.pow(2.0, 10.0 * (time / 1.0-1.0))-0.001;
    }
    laya.element.action.Intepretor.ease_exp_out = function(time, intepretorParam) {
        return time == 1.0 ? 1.0 : 1.0 - Math.pow(2.0, -10. * time / 1.0);
    }
    laya.element.action.Intepretor.ease_exp_in_out = function(time, intepretorParam) {
        var newTime = time * 2.0;
        if (newTime < 1.0)
            return 0.5 * Math.pow(2.0, 10.0 * (newTime-1.0));
        else 
            return 0.5 * (2.0 - Math.pow(2.0, -10. * (newTime-1.0)));
    }
    laya.element.action.Intepretor.ease_sin_in = function(time, intepretorParam) {
        return 1.0 - Math.cos(time * Math.PI * 2.0);
    }
    laya.element.action.Intepretor.ease_sin_out = function(time, intepretorParam) {
        return Math.sin(time * Math.PI * 2.0);
    }
    laya.element.action.Intepretor.ease_sin_in_out = function(time, intepretorParam) {
        return -0.5 * (Math.cos(Math.PI * time)-1.0);
    }
    laya.element.action.Intepretor.ease_elastic_in = function(time, intepretorParam) {
        var newT = 0.0;
        if (time == 0.0 || time == 1.0)
            return time;
        else {
            if (intepretorParam == 0)
                intepretorParam = 0.5;
            var s = intepretorParam / 4.0;
            var newT1 = time-1.0;
            return - Math.pow(2.0, 10.0 * newT1) * Math.sin((newT1 - s) * Math.PI * 2.0 / intepretorParam);
        }
    }
    laya.element.action.Intepretor.ease_elastic_out = function(time, intepretorParam) {
        var newT = 0.0;
        if (time == 0.0 || time == 1.0)
            return time;
        else {
            if (intepretorParam == 0)
                intepretorParam = 0.5;
            var s = intepretorParam / 4.0;
            return Math.pow(2.0, -10. * time) * Math.sin((time - s) * Math.PI * 2 / intepretorParam) + 1.0;
        }
    }
    laya.element.action.Intepretor.ease_elastic_in_out = function(time, intepretorParam) {
        if (time == 0.0 || time == 1.0)
            return time;
        else {
            if (intepretorParam == 0)
                intepretorParam = 0.5;
            var period = intepretorParam;
            var newT = time * 2.0;
            if (period == 0.0)
                period = 0.3 * 1.5;
            var s = period / 4.0;
            newT = newT-1.0;
            if (newT < 0.0)
                return -0.5 * Math.pow(2.0, 10.0 * newT) * Math.sin((newT - s) * Math.PI * 2.0 / period);
            else 
                return Math.pow(2.0, -10. * newT) * Math.sin((newT - s) * Math.PI * 2.0 / period) * 0.5 + 1.0;
        }
    }
    laya.element.action.Intepretor.bounceTime = function(time) {
        if (time < 1.0 / 2.75)
            return 7.5625 * time * time;
        else if (time < 2.0 / 2.75) {
            time -= 1.5 / 2.75;
            return 7.5625 * time * time + 0.75;
        } else if (time < 2.5 / 2.75) {
            time -= 2.25 / 2.75;
            return 7.5625 * time * time + 0.9375;
        }
        time -= 2.625 / 2.75;
        return 7.5625 * time * time + 0.984375;
    }
    laya.element.action.Intepretor.ease_bounce_in = function(time, intepretorParam) {
        return 1.0 - laya.element.action.Intepretor.bounceTime(1.0 - time);
    }
    laya.element.action.Intepretor.ease_bounce_out = function(time, intepretorParam) {
        return laya.element.action.Intepretor.bounceTime(time);
    }
    laya.element.action.Intepretor.ease_bounce_in_out = function(time, intepretorParam) {
        if (time < 0.5)
            return (1.0 - laya.element.action.Intepretor.bounceTime(1.0 - time * 2.0)) * 0.5;
        else 
            return laya.element.action.Intepretor.bounceTime(time * 2.0-1.0) * 0.5 + 0.5;
    }
    laya.element.action.Intepretor.ease_back_in = function(time, intepretorParam) {
        var overshoot = 1.70158;
        return time * time * ((overshoot + 1.0) * time - overshoot);
    }
    laya.element.action.Intepretor.ease_back_out = function(time, intepretorParam) {
        var overshoot = 1.70158;
        var newT = time-1.0;
        return newT * newT * ((overshoot + 1.0) * newT + overshoot) + 1.0;
    }
    laya.element.action.Intepretor.ease_back_in_out = function(time, intepretorParam) {
        var overshoot = 2.5949095;
        var newT = time * 2.0;
        if (newT < 1.0)
            return newT * newT * ((overshoot + 1.0) * newT - overshoot) / 2.0;
        else {
            newT = newT-2;
            return newT * newT * ((overshoot + 1.0) * newT + overshoot) / 2.0 + 1.0;
        }
    }
    laya.element.action.Intepretor.getIntepretor = function(timingFunction, out) {
        if (out == null)
            out = new laya.element.action.Intepretor();
        if (timingFunction == null || timingFunction == "linear" || timingFunction == "") {
            out.param = 0;
            out.fn = laya.element.action.Intepretor.linear;
        } else if (Laya.typeIsString(timingFunction)) {
            var ofs = timingFunction.indexOf("(");
            if (ofs > 0) {
                out.fn = laya.utils.Method.field(laya.element.action.Intepretor.__fnsmap__, timingFunction.substring(0, ofs));
                out.param = timingFunction.substring(ofs + 1, timingFunction.length-1);
            } else {
                out.fn = laya.utils.Method.field(laya.element.action.Intepretor.__fnsmap__, timingFunction);
                out.param = 0;
            }
        } else {
            out.param = 0;
            out.fn = timingFunction;
        }
        if (out.fn == null)
            Laya.alert("没有timingFunction name=" + Std.string(timingFunction));
        return out;
    }
    laya.element.action.Intepretor.prototype = {
        __class__: laya.element.action.Intepretor
    }
    laya.element.action.Action = function() {};
    laya.element.action.Action.__name__ = true;
    laya.element.action.Action._update_ = function(tm, duration, tmo) {
        var node = tmo.node;
        if (node["delete"]) {
            tmo.node = null;
            tmo.deleted = true;
            tmo.iAction.release();
            return false;
        }
        if ((duration = Math.floor(tm - tmo.startTm - tmo.delay)) < 0)
            return true;
        if (duration >= tmo.duration) {
            if (tmo.count < 0||--tmo.count > 0) {
                tmo.iAction._onend_(node);
                tmo.startTm = node.getCurTime();
                tmo.iAction._onstart_(node, tmo.duration, tmo.toOrBy);
                tmo.delay = 0;
                return true;
            }
            if (!tmo.iAction._onend_(node)) {
                if (tmo.call_back != null)
                    tmo.call_back.call(node, tmo);
                return false;
            }
            return true;
        }
        if (tmo.iAction._onupdate_(node, tmo.timingFunction.call(tmo, duration / tmo.duration, tmo.intepretorParam)))
            return true;
        tmo.iAction._onend_(node);
        if (tmo.call_back != null)
            tmo.call_back.call(node, tmo);
        return false;
    }
    laya.element.action.Action.run = function(node, toOrBy, iAction, duration, timingFunction, delay, count, direction, call_back) {
        if (count == null)
            count = 1;
        var style = node.style;
        var timer = node.timerCtrl.createUpdateTimer(node);
        timer.update = laya.element.action.Action._update_;
        timer.call_back = call_back;
        laya.element.action.Intepretor.getIntepretor(timingFunction, laya.element.action.Action._Intepretor_);
        timer.intepretorParam = laya.element.action.Action._Intepretor_.param;
        timer.timingFunction = laya.element.action.Action._Intepretor_.fn;
        timer.duration = duration == null ? 0 : duration;
        timer.delay = delay == null ? 0 : delay;
        timer.count = count == null ? 1 : count;
        timer.iAction = iAction;
        timer.toOrBy = toOrBy;
        timer.startTm = node.timerCtrl.curtime;
        iAction._onstart_(node, timer.duration, toOrBy);
        return timer;
    }
    laya.element.action.Action.runByString = function(node, toOrBy, actionText, duration, timingFunction, delay, count, direction, call_back) {
        if (actionText == "none") {
            if (node._private_.__animationtm__ != null && node._private_.__animationtm__.node == node)
                node._private_.__animationtm__.deleted = true;
            return null;
        }
        var a = laya.element.action.ActionKeyFrames.getByName(actionText);
        if (a != null) {
            if (node._private_.__animationtm__ != null && node._private_.__animationtm__.node == node)
                node._private_.__animationtm__.deleted = true;
            return node._private_.__animationtm__ = laya.element.action.Action.run(node, toOrBy, a.clone(), duration, timingFunction, delay, count, direction, call_back);
        }
        if (actionText.indexOf("@keyframes") >= 0) {
            var start = actionText.indexOf("{");
            var end = actionText.lastIndexOf("}");
            var k = new laya.element.action.ActionKeyFrames();
            k.css(null, actionText.substring(start + 1, end));
            return laya.element.action.Action.run(node, toOrBy, k, duration, timingFunction, delay, count, direction, call_back);
        }
        var d = laya.element.action.ActionPropetyArray.strParamsToArray(actionText);
        if (d.length == 1) {
            var p;
            p = d[0];
            return laya.element.action.Action.run(node, toOrBy, p, duration, timingFunction, delay, count, direction, call_back);
        }
        return laya.element.action.Action.run(node, toOrBy, new laya.element.action.ActionPropetyArray(d), duration, timingFunction, delay, count, direction, call_back);
    }
    laya.element.action.Action.prototype = {
        __class__: laya.element.action.Action
    }
    laya.element.action.ActionInterface = function() {}
    laya.element.action.ActionInterface.__name__ = true;
    laya.element.action.ActionInterface.prototype = {
        __class__: laya.element.action.ActionInterface
    }
    laya.element.action.ActionEmpty = function() {};
    laya.element.action.ActionEmpty.__name__ = true;
    laya.element.action.ActionEmpty.__interfaces__ = [laya.element.action.ActionInterface];
    laya.element.action.ActionEmpty.prototype = {
        stop: function() {},
        stepUpdateTimer: function(tmL) {},
        _onstart_: function(node, duration, toOrBy) {},
        _onend_: function(node) {
            return false;
        },
        _onupdate_: function(node, duration) {
            return true;
        },
        clone: function() {
            return new laya.element.action.ActionEmpty();
        },
        __class__: laya.element.action.ActionEmpty
    }
    laya.element.action.ActionKeyFrames = function() {
        this.actionPropetyArray = [];
        this.percentage = [];
    };
    laya.element.action.ActionKeyFrames.__name__ = true;
    laya.element.action.ActionKeyFrames.__interfaces__ = [laya.element.action.ActionInterface];
    laya.element.action.ActionKeyFrames.getByName = function(name) {
        return laya.element.action.ActionKeyFrames.__ActionKeyFrameMap__.get(name);
    }
    laya.element.action.ActionKeyFrames.prototype = {
        stop: function() {
            if (this.timer != null)
                this.timer.deleted = true;
        },
        stepUpdateTimer: function(_timer) {
            this.timer = _timer;
        },
        _onstart_: function(node, duration, toOrBy) {
            this.duration = duration;
            this.toOrBy = toOrBy;
            if (this.percentage[0] != 0) {
                this.actionPropetyArray.splice(0, 0, new laya.element.action.ActionEmpty());
                this.percentage.splice(0, 0, 0);
            }
            this.actionPropetyArray[0]._onstart_(node, 0, toOrBy);
            this.actionPropetyArray[0]._onend_(node);
            this.index = 1;
            this.prePercentage = 0;
            this.dPer = this.percentage[1] - this.percentage[0];
            this.actionPropetyArray[1]._onstart_(node, duration * this.dPer, toOrBy);
        },
        _onend_: function(node) {
            if (this.actionPropetyArray.length-1 == this.index) {
                this.actionPropetyArray[this.index]._onend_(node);
                return false;
            } else {
                this.index = this.actionPropetyArray.length-1;
                this.dPer = this.percentage[this.index] - this.percentage[this.index-1];
                this.actionPropetyArray[this.index]._onstart_(node, this.duration * this.dPer, this.toOrBy);
                this.actionPropetyArray[this.index]._onend_(node);
            }
            return false;
        },
        _onupdate_: function(node, pduration) {
            var sz = (pduration - this.prePercentage) / this.dPer;
            if (sz >= 1) {
                this.actionPropetyArray[this.index]._onend_(node);
                this.prePercentage = this.percentage[this.index];
                this.index++;
                if (this.index >= this.actionPropetyArray.length)
                    return false;
                this.dPer = this.percentage[this.index] - this.percentage[this.index-1];
                this.actionPropetyArray[this.index]._onstart_(node, this.duration * this.dPer, this.toOrBy);
                sz = (pduration - this.prePercentage) / this.dPer;
            }
            this.actionPropetyArray[this.index]._onupdate_(node, sz);
            return true;
        },
        set_name: function(name) {
            laya.element.action.ActionKeyFrames.__ActionKeyFrameMap__.set(name, this);
        },
        css: function(name, css) {
            css = laya.utils.Method.deletEannotation(css);
            var cssArray = laya.utils.Method.toScriptArrayOfText(css);
            if (cssArray == null)
                return;
            this.actionPropetyArray = [];
            this.percentage = [];
            var i = 0, sz = cssArray.length;
            while (i < sz) {
                var percentage = laya.utils.LaRegExp.replaceBlankChar(cssArray[i]);
                var code = cssArray[i + 1];
                if (code == null) {
                    i += 2;
                    if (i < sz)
                        console.log("Keyframes err:" + name + " " + i + " " + percentage);
                    continue;
                }
                code = code.substring(1, code.length-1);
                if (percentage == "from")
                    percentage = "0%";
                else if (percentage == "to")
                    percentage = "100%";
                var d = laya.element.action.ActionPropetyArray.strParamsToArray(code);
                var a;
                switch (d.length) {
                case 0:
                    a = new laya.element.action.ActionEmpty();
                    break;
                case 1:
                    a = d[0];
                    break;
                default:
                    a = new laya.element.action.ActionPropetyArray(d);
                }
                this.addKeyFrame(Laya.parseInt(percentage) / 100, a);
                i += 2;
            }
            if (name != null)
                this.set_name(name);
        },
        addKeyFrame: function(percentage, action) {
            this.percentage.push(percentage);
            this.actionPropetyArray.push(action);
        },
        clone: function() {
            var n = new laya.element.action.ActionKeyFrames();
            var _g1 = 0, _g = this.percentage.length;
            while (_g1 < _g) {
                var i = _g1++;
                n.addKeyFrame(this.percentage[i], this.actionPropetyArray[i].clone());
            }
            return n;
        },
        __class__: laya.element.action.ActionKeyFrames
    }
    laya.element.action.ActionMove = function(ex, ey) {
        this.tox = ex;
        this.toy = ey;
    };
    laya.element.action.ActionMove.__name__ = true;
    laya.element.action.ActionMove.__interfaces__ = [laya.element.action.ActionInterface];
    laya.element.action.ActionMove.prototype = {
        stop: function() {
            if (this.timer != null)
                this.timer.deleted = true;
        },
        stepUpdateTimer: function(_timer) {
            this.timer = _timer;
        },
        _onstart_: function(node, duration, toOrBy) {
            this.bx = node.get_left();
            this.by = node.get_top();
            if (!toOrBy) {
                this.tox += this.bx;
                this.toy += this.by;
            }
        },
        _onend_: function(node) {
            node.pos(this.tox, this.toy);
            return false;
        },
        _onupdate_: function(node, duration) {
            node.pos(this.bx + (this.tox - this.bx) * duration, this.by + (this.toy - this.by) * duration);
            return true;
        },
        clone: function() {
            return new laya.element.action.ActionMove(this.tox, this.toy);
        },
        __class__: laya.element.action.ActionMove
    }
    laya.element.action.ActionPropety = function(_name, _startValue, _endValue) {
        this.name = _name;
        this.startValue = _startValue;
        this.endValue = _endValue;
        this._ref = 1;
    };
    laya.element.action.ActionPropety.__name__ = true;
    laya.element.action.ActionPropety.__interfaces__ = [laya.element.action.ActionInterface];
    laya.element.action.ActionPropety.create = function(_name, _startValue, _endValue) {
        if (laya.element.action.ActionPropety.__ActionPropety__.length < 1)
            return new laya.element.action.ActionPropety(_name, _startValue, _endValue);
        var o = laya.element.action.ActionPropety.__ActionPropety__.pop();
        o.name = _name;
        o.startValue = _startValue;
        o.endValue = _endValue;
        o._ref = 1;
        return o;
    }
    laya.element.action.ActionPropety.prototype = {
        stop: function() {
            if (this.timer != null)
                this.timer.deleted = true;
        },
        stepUpdateTimer: function(_timer) {
            this.timer = _timer;
        },
        _onstart_: function(node, duration, toOrBy) {
            if (this.set_fn == null) {
                var fndef = laya.utils.Method.getAREG(laya.css.CSSStyleDeclaration, this.name);
                if (fndef != null) {
                    this.set_fn = fndef.setfn;
                    this.get_fn = fndef.getfn;
                    this.caller = node.style;
                } else {
                    this.set_fn = node[this.name + "-!-"];
                    this.get_fn = node[this.name + "-?-"];
                    this.caller = node;
                }
            }
            if (this.startValue == null)
                this.startValue = this.get_fn.call(this.caller);
            else {
                if (!toOrBy)
                    this.startValue += this.get_fn.call(this.caller);
                this.set_fn.call(this.caller, this.startValue);
            }
            if (!toOrBy)
                this.endValue += this.startValue;
        },
        _onend_: function(node) {
            this.set_fn.call(this.caller, this.endValue);
            return false;
        },
        _onupdate_: function(node, duration) {
            this.set_fn.call(this.caller, this.startValue + duration * (this.endValue - this.startValue));
            return true;
        },
        clone: function() {
            var a = laya.element.action.ActionPropety.create(this.name, null, this.endValue);
            a.set_fn = this.set_fn;
            a.get_fn = this.get_fn;
            a.caller = this.caller;
            return a;
        },
        release: function() {
            if (--this._ref == 0)
                laya.element.action.ActionPropety.__ActionPropety__.push(this);
            return this._ref;
        },
        addRef: function() {
            return ++this._ref;
        },
        __class__: laya.element.action.ActionPropety
    }
    laya.element.action.ActionPropetyArray = function(_actionPropetys) {
        this.actionPropetys = _actionPropetys;
    };
    laya.element.action.ActionPropetyArray.__name__ = true;
    laya.element.action.ActionPropetyArray.__interfaces__ = [laya.element.action.ActionInterface];
    laya.element.action.ActionPropetyArray.strParamsToArray = function(params) {
        var name, value, i = 0, startpos, strsz = params.length;
        var r = [];
        var leftBrace = 0, rightBrace = 0;
        while (true) {
            startpos = i;
            i = params.indexOf(":", i);
            if (i < 0)
                break;
            name = laya.utils.LaRegExp.replaceBlankChar(params.substring(startpos, i));
            startpos = i + 1;
            if (name != "script") {
                i = params.indexOf(";", startpos);
                if (i < 0)
                    i = strsz;
                value = laya.utils.LaRegExp.replaceBlankChar(params.substring(startpos, i));
                if (value.charAt(value.length-1) == ";")
                    value = value.substring(0, value.length-1);
                r.push(laya.element.action.ActionPropety.create(name, null, value.indexOf("px") > 0 ? Laya.parseInt(value) : Laya.Number(value)));
                i++;
                continue;
            }
            leftBrace = rightBrace = 0;
            var _g = startpos;
            while (_g < strsz) {
                var k = _g++;
                var c = params.charAt(k);
                if (c == "{")
                    leftBrace++;
                if (c == "}"&&++rightBrace == leftBrace) {
                    r.push(new laya.element.action.ActionScript(params.substring(startpos, k + 1)));
                    i = params.indexOf(";", k + 1);
                    if (i < 0)
                        i = strsz;
                    i++;
                    break;
                }
            }
        }
        return r;
    }
    laya.element.action.ActionPropetyArray.prototype = {
        stop: function() {
            if (this.timer != null)
                this.timer.deleted = true;
        },
        stepUpdateTimer: function(_timer) {
            this.timer = _timer;
        },
        _onstart_: function(node, duration, toOrBy) {
            var _g1 = 0, _g = this.actionPropetys.length;
            while (_g1 < _g) {
                var i = _g1++;
                this.actionPropetys[i]._onstart_(node, duration, toOrBy);
            }
        },
        _onend_: function(node) {
            var _g1 = 0, _g = this.actionPropetys.length;
            while (_g1 < _g) {
                var i = _g1++;
                this.actionPropetys[i]._onend_(node);
            }
            return false;
        },
        _onupdate_: function(node, duration) {
            var _g1 = 0, _g = this.actionPropetys.length;
            while (_g1 < _g) {
                var i = _g1++;
                if (!this.actionPropetys[i]._onupdate_(node, duration))
                    return false;
            }
            return true;
        },
        clone: function() {
            var n = new laya.element.action.ActionPropetyArray([]);
            var _g1 = 0, _g = this.actionPropetys.length;
            while (_g1 < _g) {
                var i = _g1++;
                n.add(this.actionPropetys[i].clone());
            }
            return n;
        },
        add: function(a) {
            this.actionPropetys.push(a);
        },
        __class__: laya.element.action.ActionPropetyArray
    }
    laya.element.action.ActionScript = function(_script) {
        this.script = _script;
    };
    laya.element.action.ActionScript.__name__ = true;
    laya.element.action.ActionScript.__interfaces__ = [laya.element.action.ActionInterface];
    laya.element.action.ActionScript.prototype = {
        stop: function() {
            if (this.timer != null)
                this.timer.deleted = true;
        },
        stepUpdateTimer: function(_timer) {
            this.timer = _timer;
        },
        _onstart_: function(node, duration, toOrBy) {
            if (this.scriptfn == null)
                this.scriptfn = Laya["eval"]("(function()" + this.script + ")");
        },
        _onend_: function(node) {
            this.scriptfn.call(node);
            return false;
        },
        _onupdate_: function(node, duration) {
            return true;
        },
        clone: function() {
            var n = new laya.element.action.ActionScript(this.script);
            n.scriptfn = this.scriptfn;
            return n;
        },
        __class__: laya.element.action.ActionScript
    }
    laya.element.action.ActiveParabola = function(ex, ey, angle) {
        this.tox = ex;
        this.toy = ey;
        this.angle = angle;
    };
    laya.element.action.ActiveParabola.__name__ = true;
    laya.element.action.ActiveParabola.__interfaces__ = [laya.element.action.ActionInterface];
    laya.element.action.ActiveParabola.prototype = {
        stop: function() {
            if (this.timer != null)
                this.timer.deleted = true;
        },
        stepUpdateTimer: function(_timer) {
            this.timer = _timer;
        },
        _onstart_: function(node, duration, toOrBy) {
            this.bx = node.get_left();
            this.by = node.get_top();
            if (!toOrBy) {
                this.tox += this.bx;
                this.toy += this.by;
            }
            this.dx = (this.tox - this.bx) / duration;
            this.dy = (this.toy - this.by) / duration;
            var v = this.dx / Math.cos(this.angle);
            this.vy =- v * Math.sin(this.angle);
            this.parabola_a = (this.toy - this.by - this.vy * duration) / (duration * duration);
        },
        _onend_: function(node) {
            node.pos(this.tox, this.toy);
            return false;
        },
        _onupdate_: function(node, duration) {
            return true;
        },
        clone: function() {
            return new laya.element.action.ActiveParabola(this.tox, this.toy, this.angle);
        },
        __class__: laya.element.action.ActiveParabola
    }
    laya.element.method = {}
    laya.element.method.DragCtrInterface = function() {}
    laya.element.method.DragCtrInterface.__name__ = true;
    laya.element.method.DragCtrInterface.prototype = {
        __class__: laya.element.method.DragCtrInterface
    }
    laya.element.method.DragCtrl_Default = function(t) {
        this.type = t;
    };
    laya.element.method.DragCtrl_Default.__name__ = true;
    laya.element.method.DragCtrl_Default.__interfaces__ = [laya.element.method.DragCtrInterface];
    laya.element.method.DragCtrl_Default.prototype = {
        ondragend: function(event, dragNode) {
            dragNode.dispatchEvent(event, "ondragend");
        },
        ondrag: function(event, dragNode) {
            if (this.type == "true") {
                var dragInfo = Laya.document.dragInformation;
                var pos = dragInfo.dragNodePos;
                dragInfo.cloneCanvas.pos(pos.x + dragInfo.dragOffsX, pos.y + dragInfo.dragOffsY);
            }
            dragNode.dispatchEvent(event, "ondrag");
        },
        ondragstart: function(event, dragNode) {
            if (this.type == "true") {
                var dragInfo = Laya.document.dragInformation;
                dragInfo.cloneCanvas.size(dragNode.get_width(), dragNode.get_height());
                dragInfo.cloneCanvas.show(true);
            }
            dragNode.dispatchEvent(event, "ondragstart");
        },
        __class__: laya.element.method.DragCtrl_Default
    }
    laya.element.method.DragCtrl_Move = function(t, _dragNode) {
        this.type = t;
        this.dragNode = _dragNode;
    };
    laya.element.method.DragCtrl_Move.__name__ = true;
    laya.element.method.DragCtrl_Move.__interfaces__ = [laya.element.method.DragCtrInterface];
    laya.element.method.DragCtrl_Move.prototype = {
        ondragend: function(event, dragNode) {},
        ondrag: function(event, _dragNode) {
            var dragNode = this.dragNode == null ? _dragNode: this.dragNode;
            var i = Laya.document.dragInformation;
            if (this.dragPointType == laya.element.method.DragCtrl_Move.DRAG_RESIZE) {
                var x = this.dragStartX + i.dragOffsX;
                var y = this.dragStartY + i.dragOffsY;
                if (x < 10)
                    x = 10;
                if (y < 10)
                    y = 10;
                dragNode.size(x, y);
                return;
            }
            var bx =- 10000, by =- 1000000;
            var ex = 1000000, ey = 100000;
            if (this.type == "move-in") {
                bx = by = 0;
                var p;
                var style = dragNode.style;
                p = dragNode.parentNode;
                ex = p.get_width() - dragNode.get_width() - p.style.data.border.width * 0 - style.data.border.width;
                ey = p.get_height() - dragNode.get_height() - p.style.data.border.height * 0 - style.data.border.height;
            }
            if (this.type == "move-view") {
                bx =- dragNode.get_width() + 1;
                by =- dragNode.get_height() + 1;
                var p;
                p = dragNode.parentNode;
                ex = p.get_width()-1;
                ey = p.get_height()-1;
            }
            var x = this.dragStartX + i.dragOffsX;
            var y = this.dragStartY + i.dragOffsY;
            if (x > ex)
                x = ex;
            if (y > ey)
                y = ey;
            if (x < bx)
                x = bx;
            if (y < by)
                y = by;
            dragNode.pos(x, y);
            _dragNode.dispatchEvent(event, "ondrag");
        },
        ondragstart: function(event, dragNode) {
            var lx = Math.abs(event.offsetX - dragNode.get_width());
            var ly = Math.abs(event.offsetY - dragNode.get_height());
            if (this.type == "move-resize")
                this.dragPointType = lx < 10 && ly < 10 && lx < dragNode.get_width() / 2 && ly < dragNode.get_height() / 2 ? laya.element.method.DragCtrl_Move.DRAG_RESIZE : laya.element.method.DragCtrl_Move.DRAG_MOVE;
            else 
                this.dragPointType = 0;
            dragNode = this.dragNode == null ? dragNode : this.dragNode;
            if (this.dragPointType == laya.element.method.DragCtrl_Move.DRAG_MOVE) {
                this.dragStartX = Laya.Round(dragNode.get_left());
                this.dragStartY = Laya.Round(dragNode.get_top());
            } else {
                this.dragStartX = dragNode.get_width();
                this.dragStartY = dragNode.get_height();
            }
        },
        __class__: laya.element.method.DragCtrl_Move
    }
    laya.element.method.DragCtrl_Scroll = function() {};
    laya.element.method.DragCtrl_Scroll.__name__ = true;
    laya.element.method.DragCtrl_Scroll.__interfaces__ = [laya.element.method.DragCtrInterface];
    laya.element.method.DragCtrl_Scroll.prototype = {
        ondragend: function(event, dragNode) {
            var scrollEffect = dragNode.scrollEffect();
            scrollEffect.scrollEnd();
        },
        ondrag: function(event, dragNode) {
            var i = Laya.document.dragInformation;
            var x = this.scrollLeft - i.dragOffsX;
            var y = this.scrollTop - i.dragOffsY;
            var scrollEffect = dragNode.scrollEffect();
            scrollEffect.scrollTo(x, y, event.time);
        },
        ondragstart: function(event, dragNode) {
            this.scrollLeft = dragNode.get_scrollLeft();
            this.scrollTop = dragNode.get_scrollTop();
            var scrollEffect = dragNode.scrollEffect();
            var pos = scrollEffect.toNormalXY(this.scrollLeft, this.scrollTop);
            this.scrollLeft = pos.left;
            this.scrollTop = pos.top;
            scrollEffect.ondragstart(event, dragNode);
        },
        __class__: laya.element.method.DragCtrl_Scroll
    }
    laya.element.method.EditCursor = function() {};
    laya.element.method.EditCursor.__name__ = true;
    laya.element.method.EditCursor.show = function() {
        laya.element.method.EditCursor.showCursor = true;
        laya.element.method.EditCursor._preShowCursorTime_ = Laya.window.layaTime;
    }
    laya.element.method.EditCursor.update = function(tm) {
        if (Laya.document.activeInputElement == null)
            return;
        var delay = tm - laya.element.method.EditCursor._preShowCursorTime_;
        if (laya.element.method.EditCursor.showCursor)
            delay/=1.5;
        if (delay < laya.element.method.EditCursor.showDelay)
            return;
        laya.element.method.EditCursor.showCursor=!laya.element.method.EditCursor.showCursor;
        Laya.document.activeInputElement.repaint();
        laya.element.method.EditCursor._preShowCursorTime_ = tm;
    }
    laya.element.method.EditCursor.prototype = {
        __class__: laya.element.method.EditCursor
    }
    laya.element.method.ElementMethod = function() {};
    laya.element.method.ElementMethod.__name__ = true;
    laya.element.method.ElementMethod._destroy_ = function(node) {
        if (node._private_ == null)
            return;
        laya.Document._activeNodeCount_--;
        if (node.parentNode != null && node.parentNode.childNodes.length > 0) {
            var index = node.parentNode.indexOf(node);
            if (node.nodeName != null && index>-1&&!node.parentNode.deleted)
                node.parentNode.removeChild(node);
        }
        node._private_ = null;
        node.timerCtrl = null;
        node.parentNode = null;
        if (node._renderNode != null) {
            laya.element.Node.__RENDERNODE_GARBAGE__.push(node._renderNode);
            node._renderNode = null;
        }
    }
    laya.element.method.ElementMethod._tidy_ = function() {
        var __node_deleted_list_ = laya.element.Node.__node_deleted_list_;
        var _g1 = 0, _g = __node_deleted_list_.length;
        while (_g1 < _g) {
            var i = _g1++;
            var node = __node_deleted_list_.pop();
            if (node != null)
                laya.element.method.ElementMethod._destroy_(node);
            if (i > 100)
                break;
        }
        if (laya.element.Node.__RENDERNODE_GARBAGE__.length > 0) {
            var o = laya.element.Node.__RENDERNODE_GARBAGE__.pop();
            o.destroy();
        }
    }
    laya.element.method.ElementMethod.typesetLinesClear = function(typesetLines) {
        var s = typesetLines.length;
        if (s < 1)
            return;
        while (--s >= 0)
            typesetLines[s].destroy();
        typesetLines.length = 0;
    }
    laya.element.method.ElementMethod.resetTextNodes = function(node) {
        if (node.textNodes == null || node.textNodes.length < 1)
            return;
        laya.element.method.ElementMethod.typesetLinesRepaint(node.typesetLines);
        node.textNodes = null;
        node.repaint();
    }
    laya.element.method.ElementMethod.typesetLinesRepaint = function(typesetLines) {
        if (typesetLines == null)
            return false;
        var i = 0, sz = typesetLines.length, l;
        while (i < sz) {
            l = typesetLines[i];
            l != null && (l.bRepaint = true);
            i++;
        }
        return true;
    }
    laya.element.method.ElementMethod.setMouseEnable = function(node, type) {
        if ((node._type_ & type) == type)
            return;
        node._type_|=type;
        var p = node.parentNode;
        if (p == null || (p._type_ & type) == type)
            return;
        laya.element.method.ElementMethod.setMouseEnable(p, type);
    }
    laya.element.method.ElementMethod.childsSort = function(node) {
        if (node == null ||!((node._type_ & 64) == 64))
            return;
        if ((node._type_ & 64) == 64)
            node._type_&=-65;
        var childs = node.childNodes;
        if (childs.length < 2)
            return;
        var c = childs[0], z = c._sort_d_, low, high, mid, zz;
        childs[0]._to_sort_d();
        var _g1 = 1, _g = childs.length;
        while (_g1 < _g) {
            var j = _g1++;
            c = childs[j];
            if ((z = c._sort_d_) < 0)
                z = c._to_sort_d();
            if (z < childs[j-1]._sort_d_) {
                mid = low = 0;
                high = j-1;
                while (low <= high) {
                    mid = low + high>>>1;
                    zz = childs[mid]._sort_d_;
                    if (zz < 0)
                        zz = childs[mid]._to_sort_d();
                    if (zz < z)
                        low = mid + 1;
                    else if (zz > z)
                        high = mid-1;
                    else 
                        break;
                }
                if (z > childs[mid]._sort_d_)
                    mid++;
                childs.splice(j, 1);
                childs.splice(mid, 0, c);
            }
        }
    }
    laya.element.method.ElementMethod.calculateSrollSize = function(node) {
        if (node.deleted ||!((node._type_ & 4096) == 4096) && node.extData != null)
            return;
        if ((node._type_ & 4096) == 4096)
            node._type_&=-4097;
        var exdata = node.extData.create(node);
        var prew = exdata.scrollWidth;
        var preh = exdata.scrollHeight;
        if (node.childNodes.length < 1 && node.textNodes == null) {
            exdata.scrollWidth = 0;
            exdata.scrollHeight = 0;
            if (prew != exdata.scrollWidth || preh != exdata.scrollHeight)
                node.dispatchEvent(null, "onscrollsize");
            return;
        }
        var cl = 1000000;
        var ct = 1000000;
        var style = node.style;
        var cw = 0;
        var ch = 0;
        var bx, by, ex, ey = 0;
        var childs = node.childNodes, n;
        var _g1 = 0, _g = childs.length;
        while (_g1 < _g) {
            var i = _g1++;
            n = childs[i];
            if (n.deleted || n.hidden > 0)
                continue;
            if ((n._type_ & 4096) == 4096)
                laya.element.method.ElementMethod.calculateSrollSize(n);
            bx = Laya.Round(n.get_left());
            by = Laya.Round(n.get_top());
            ex = bx + n.get_offsetWidth();
            ey = by + n.get_offsetHeight();
            if (bx < cl)
                cl = bx;
            if (by < ct)
                ct = by;
            if (ex > cw)
                cw = ex;
            if (ey > ch)
                ch = ey;
        }
        if (node.textNodes != null) {
            var text = node.textNodes;
            var _g1 = 0, _g = text.length;
            while (_g1 < _g) {
                var i = _g1++;
                var c = text[i];
                if (c == null)
                    continue;
                bx = c.left;
                by = c.top;
                ex = bx + c.width;
                ey = by + c.height;
                if (bx < cl)
                    cl = bx;
                if (by < ct)
                    ct = by;
                if (ex > cw)
                    cw = ex;
                if (ey > ch)
                    ch = ey;
            }
        }
        if (cl == 1000000)
            cl = 0;
        if (ct == 1000000)
            ct = 0;
        exdata.scrollWidth = cw;
        exdata.scrollHeight = ch;
        if (prew != exdata.scrollWidth || preh != exdata.scrollHeight)
            node.dispatchEvent(null, "onscrollsize");
    }
    laya.element.method.ElementMethod.prototype = {
        __class__: laya.element.method.ElementMethod
    }
    laya.element.method.NodeExtData = function(node) {
        this.zdepth = 1;
        this.scrollHeight = 0;
        this.scrollWidth = 0;
        this.scrollTop = 0;
        this.scrollLeft = 0;
        this._node_ = node;
    };
    laya.element.method.NodeExtData.__name__ = true;
    laya.element.method.NodeExtData.prototype = {
        create: function(node) {
            return this._node_ == node ? this : node.extData = new laya.element.method.NodeExtData(node);
        },
        getScrollEffect: function() {
            if (this.scrollEffect == null)
                this.scrollEffect = new laya.element.method.ScrollEffect(this._node_);
            return this.scrollEffect;
        },
        destroy: function() {
            this._node_ = null;
            if (this.scrollEffect != null)
                this.scrollEffect.destroy();
        },
        __class__: laya.element.method.NodeExtData
    }
    laya.element.method.ScrollEffect = function(n) {
        this.speedY = 0;
        this.speedX = 0;
        this.resistance = 2;
        this.zoomOutY = 0.5;
        this.zoomOutX = 0.5;
        this.verticalGrid = 1;
        this.horizontalGrid = 1;
        this.crossEnable = true;
        this.node = n;
    };
    laya.element.method.ScrollEffect.__name__ = true;
    laya.element.method.ScrollEffect.prototype = {
        scrollEnd: function() {
            this.preTime = null;
            this._kineticScolling_();
        },
        _startRebound_: function() {
            var x = this.node.get_scrollLeft();
            var y = this.node.get_scrollTop();
            var scollw = this.node.get_scrollWidth() > this.node.get_width() ? this.node.get_scrollWidth() - this.node.get_width(): 0;
            var scollh = this.node.get_scrollHeight() > this.node.get_height() ? this.node.get_scrollHeight() - this.node.get_height(): 0;
            var fx = x > this.startX ? 0.8: -0.8;
            var fy = y > this.startY ? 0.8: -0.8;
            if (this.horizontalGrid > 0)
                x = Math.round((x + fx * this.horizontalGrid) / this.horizontalGrid) * this.horizontalGrid;
            if (this.verticalGrid > 0)
                y = Math.round((y + fy * this.verticalGrid) / this.verticalGrid) * this.verticalGrid;
            if (x < 0)
                x = 0;
            if (x > scollw)
                x = scollw;
            if (y < 0)
                y = 0;
            if (y > scollh)
                y = scollh;
            this._scroll_(Math.round(x), Math.round(y), 160, null, null);
        },
        _kineticScolling_: function() {
            this.timerEvent = null;
            var x = this.node.get_scrollLeft();
            var y = this.node.get_scrollTop();
            var w = this.node.get_width();
            var h = this.node.get_height();
            var scollw = this.node.get_scrollWidth() > this.node.get_width() ? this.node.get_scrollWidth() - this.node.get_width(): 0;
            var scollh = this.node.get_scrollHeight() > this.node.get_height() ? this.node.get_scrollHeight() - this.node.get_height(): 0;
            if (x < 0 || x > scollw || this.horizontalGrid <= 0)
                this.speedX = 0;
            if (y < 0 || y > scollh || this.verticalGrid <= 0)
                this.speedY = 0;
            if (Math.abs(this.speedY) > 0.01 && Math.abs(this.speedY) < 1.1)
                this.speedY = Math.abs(this.speedY) * (this.speedY > 0 ? 1.1 : -1.1);
            var tox = this.node.get_scrollLeft() - this.speedX * this.resistance * 150;
            var toy = this.node.get_scrollTop() - this.speedY * this.resistance * 150;
            if (!this.crossEnable) {
                if (tox < 0)
                    tox = 0;
                if (tox > scollw)
                    tox = scollw;
                if (toy < 0)
                    toy = 0;
                if (toy > scollh)
                    toy = scollh;
            }
            if (tox<-w / 4)
                tox =- w / 4;
            if (tox > scollw + w / 3)
                tox = scollw + w / 4;
            if (toy<-h / 4)
                toy =- h / 4;
            if (toy > scollh + h / 4)
                toy = scollh + h / 4;
            var delay = 200;
            if (Math.abs(this.node.get_scrollLeft() - tox) + Math.abs(this.node.get_scrollTop() - toy) < 100)
                delay = 40;
            this._scroll_(Math.round(tox), Math.round(toy), delay, null, $bind(this, this._startRebound_));
        },
        _scroll_: function(x, y, duration, timingFunction, call_back) {
            if (this.timerEvent == null)
                this.timerEvent = this.node.timerCtrl.add(this, $bind(this, this.update));
            this.timerEvent.bx = this.node.get_scrollLeft();
            this.timerEvent.by = this.node.get_scrollTop();
            this.timerEvent.tox = x;
            this.timerEvent.toy = y;
            this.timerEvent.startTime = this.node.timerCtrl.curtime;
            this.timerEvent.movx = x - this.timerEvent.bx;
            this.timerEvent.movy = y - this.timerEvent.by;
            this.timerEvent.duration = duration;
            this.timerEvent.call_back = call_back;
        },
        update: function(tm, pastTime, timerEvent) {
            if (this.timerEvent != timerEvent)
                return false;
            pastTime = tm - timerEvent.startTime;
            var duration = timerEvent.duration;
            var x = timerEvent.bx + timerEvent.movx / duration * pastTime;
            var y = timerEvent.by + timerEvent.movy / duration * pastTime;
            if (pastTime > timerEvent.duration) {
                x = timerEvent.tox;
                y = timerEvent.toy;
                this.node.scrollto(x, y);
                if (timerEvent.call_back != null) {
                    var fn = timerEvent.call_back;
                    timerEvent.call_back = null;
                    timerEvent.startTime = tm;
                    fn.call(this);
                    return true;
                }
                return false;
            }
            this.node.scrollto(x, y);
            return true;
        },
        scrollTo: function(x, y, curTm) {
            this.timerEvent = null;
            var pos = this.getMoveXY(x, y);
            if (this.preTime != null) {
                var dtm = curTm - this.preTime + 1;
                this.speedX = this.speedX * 0.3 + (this.node.get_scrollLeft() - pos.left) / dtm * 0.7;
                this.speedY = this.speedY * 0.3 + (this.node.get_scrollTop() - pos.top) / dtm * 0.7;
            } else 
                this.speedX = this.speedY = 0;
            this.speedX = this.speedY = 0;
            this.preTime = curTm;
            this.node.scrollto(this.horizontalGrid > 0 ? pos.left : this.node.get_scrollLeft(), this.verticalGrid > 0 ? pos.top : this.node.get_scrollTop());
        },
        getMoveXY: function(x, y) {
            var scollw = this.node.get_scrollWidth() > this.node.get_width() ? this.node.get_scrollWidth() - this.node.get_width(): 0;
            var scollh = this.node.get_scrollHeight() > this.node.get_height() ? this.node.get_scrollHeight() - this.node.get_height(): 0;
            if (x < 0)
                x = this.crossEnable ? Math.round(x * this.zoomOutX) : 0;
            if (x > scollw)
                x = this.crossEnable ? Math.round(scollw + (x - scollw) * this.zoomOutX) : scollw;
            if (y < 0)
                y = this.crossEnable ? Math.round(y * this.zoomOutY) : 0;
            if (y > scollh)
                y = this.crossEnable ? Math.round(scollh + (y - scollh) * this.zoomOutY) : scollh;
            return {
                left: Math.round(x),
                top: Math.round(y)
            };
        },
        toNormalXY: function(x, y) {
            var scollw = this.node.get_scrollWidth() > this.node.get_width() ? this.node.get_scrollWidth() - this.node.get_width(): 0;
            var scollh = this.node.get_scrollHeight() > this.node.get_height() ? this.node.get_scrollHeight() - this.node.get_height(): 0;
            if (x < 0)
                x = this.crossEnable ? Laya.Round(x / this.zoomOutX) : 0;
            if (x > scollw)
                x = this.crossEnable ? Laya.Round(scollw + (x - scollw) / this.zoomOutX) : scollw;
            if (y < 0)
                y = this.crossEnable ? Laya.Round(y / this.zoomOutY) : 0;
            if (y > scollh)
                y = this.crossEnable ? Laya.Round(scollh + (y - scollh) / this.zoomOutY) : scollh;
            return {
                left: x,
                top: y
            };
        },
        _getscrollheight: function() {
            return this.node.get_scrollHeight() > this.node.get_height() ? this.node.get_scrollHeight() - this.node.get_height() : 0;
        },
        _getscrollwidth: function() {
            return this.node.get_scrollWidth() > this.node.get_width() ? this.node.get_scrollWidth() - this.node.get_width() : 0;
        },
        ondragstart: function(event, dragNode) {
            this.startX = this.node.get_scrollLeft();
            this.startY = this.node.get_scrollTop();
            this.timerEvent = null;
        },
        destroy: function() {
            this.node = null;
        },
        define: function(x, y, crossenable) {
            if (x != null)
                this.horizontalGrid = x;
            if (y != null)
                this.verticalGrid = y;
            if (crossenable == "false")
                this.crossEnable = false;
        },
        __class__: laya.element.method.ScrollEffect
    }
    laya.element.method.TextMethod = function() {};
    laya.element.method.TextMethod.__name__ = true;
    laya.element.method.TextMethod._getWordSize_ = function(font, txt) {
        var w = 0, h = 0;
        if (txt == "\n")
            return {
                width: 1,
                height: font.size
            };
        var w1 = 1, h1 = font.size;
        var canvas = Laya.document.body.get_canvas();
        if (font.get_password())
            txt = "*";
        if (canvas != null) {
            var _fontTxt_ = font._toText_();
            var isHZ = false;
            var svw = isHZ ? laya.element.method.TextMethod._WORDSIZEMAP_.get(_fontTxt_ + " !!!!HZ"): laya.element.method.TextMethod._WORDSIZEMAP_.get(_fontTxt_ + " text=" + txt);
            if (svw == null) {
                if (canvas._fontTxt_ != _fontTxt_) {
                    canvas._fontTxt_ = _fontTxt_;
                    if (Laya._ISHTML5_)
                        canvas.context.set_font(_fontTxt_);
                    else 
                        canvas.context.setFontID(_fontTxt_, font.fontId);
                }
                var metrics = null;
                if (Laya._ISFLASH_)
                    metrics = canvas.context.measureTextEx(txt, _fontTxt_, font.fontId);
                else 
                    metrics = canvas.context.measureText(txt);
                w1 = metrics.width;
                laya.element.method.TextMethod._WORDSIZEMAP_.set(_fontTxt_ + (isHZ ? " !!!!HZ" : " text=" + txt), w1);
            } else 
                w1 = svw;
        }
        if (w1 < 1)
            w1 = Math.floor(font.size / 4) + 1;
        if (txt == "\t")
            w1*=8;
        if (font.textBorder != null) {
            w1 += 2;
            h1 += 2;
        }
        if (font.textDecoration == 1)
            h1++;
        return {
            width: w1,
            height: h1
        };
    }
    laya.element.method.TextMethod._addTextToTypeset_ = function(node, toarray, childNodeMaxWidth) {
        if (node.textContent == null)
            return childNodeMaxWidth;
        if (node.textNodes == null)
            laya.element.method.TextMethod.createTextNodes(node);
        var hidden = node.hidden;
        var _g1 = 0, _g = node.textNodes.length;
        while (_g1 < _g) {
            var i = _g1++;
            var t = node.textNodes[i];
            childNodeMaxWidth = childNodeMaxWidth < t.width ? t.width : childNodeMaxWidth;
            t.hidden = hidden;
            toarray.push(t);
        }
        return childNodeMaxWidth;
    }
    laya.element.method.TextMethod.createTextNodes = function(node) {
        var txt = node.textContent;
        var font = node.style.font;
        node.textNodes = [];
        var _g1 = 0, _g = txt.length;
        while (_g1 < _g) {
            var i = _g1++;
            node.textNodes.push(new laya.element.method.WordNode(txt.charAt(i), font));
        }
    }
    laya.element.method.TextMethod.repaintTextNodes = function(node) {
        if (node.textNodes == null || node.textNodes.length < 1)
            return;
        var _g1 = 0, _g = node.textNodes.length;
        while (_g1 < _g) {
            var i = _g1++;
            node.textNodes[i].repaint();
        }
        node.repaint();
    }
    laya.element.method.TextMethod.prototype = {
        __class__: laya.element.method.TextMethod
    }
    laya.element.method.TypesetLine = function() {
        this.page = false;
        this.bRepaint = true;
        this.nodes = [];
    };
    laya.element.method.TypesetLine.__name__ = true;
    laya.element.method.TypesetLine.prototype = {
        destroy: function() {
            if (this.canvas != null) {
                this.canvas.destroy();
                this.canvas = null;
            }
        },
        clear: function() {
            if (this.nodes != null) {
                var _g1 = 0, _g = this.nodes.length;
                while (_g1 < _g) {
                    var i = _g1++;
                    if (this.nodes[i] != null)
                        this.nodes[i]._inTypesetLine_ = null;
                }
                laya.utils.Method.setArrayLength(this.nodes, 0);
            }
            this.bRepaint = true;
        },
        isEmpty: function() {
            return this.nodes == null || this.nodes.length < 1;
        },
        repaint: function() {
            return this.bRepaint = true;
        },
        delNode: function(node) {
            if (this.nodes != null) {
                var _g1 = 0, _g = this.nodes.length;
                while (_g1 < _g) {
                    var i = _g1++;
                    if (this.nodes[i] == node)
                        this.nodes[i] = null;
                }
            }
        },
        getCanvas: function() {
            if (this.canvas != null)
                return this.canvas;
            this.canvas = new laya.display.Canvas(true, "fakecanvas");
            this.canvas.setSize(this.width + 8, this.height + 8);
            return this.canvas;
        },
        __class__: laya.element.method.TypesetLine
    }
    laya.element.method.WordNode = function(c, font) {
        this.font = font;
        this.word = c;
        var sz = laya.element.method.TextMethod._getWordSize_(font, this.word);
        this.width = sz.width;
        this.height = sz.height;
        if ((this.fileImg = font.getWordImgFile(this.word)) != null) {
            this._paintfn_ = laya.display.method.RenderMethod._paint_word_customFont;
            this.width = Laya.Round(this.fileImg.width / (this.fileImg.height / this.height));
        } else 
            this._paintfn_ = laya.display.method.RenderMethod._paint_word;
    };
    laya.element.method.WordNode.__name__ = true;
    laya.element.method.WordNode.__interfaces__ = [laya.element.TypesetInterface];
    laya.element.method.WordNode.prototype = {
        _enableInsertTypesetLine_: function() {
            return true;
        },
        getStyle: function() {
            return laya.css.CSSStyleDeclaration._DEFAULT_;
        },
        repaint: function() {
            if (this._inTypesetLine_ != null)
                this._inTypesetLine_.repaint();
        },
        checkType: function(type) {
            return (this._type_ & type) == type;
        },
        get_text: function() {
            return this.word;
        },
        _toElement_: function() {
            return null;
        },
        get_height: function() {
            return this.height;
        },
        get_width: function() {
            return this.width;
        },
        isWordNode: function() {
            return true;
        },
        __class__: laya.element.method.WordNode
    }
    laya.event.DragInformation = function() {
        this.touchId =- 1;
        this.speed = 0;
        this.dragOffsY = 0;
        this.dragOffsX = 0;
        this.nodeTop = 0;
        this.nodeLeft = 0;
        this.clientY = 0;
        this.clientX = 0;
        this.startY = 0;
        this.startX = 0;
        this.startTm = 0;
        this.dragNodePos = {};
    };
    laya.event.DragInformation.__name__ = true;
    laya.event.DragInformation.prototype = {
        __class__: laya.event.DragInformation
    }
    laya.event.Event = function(_name, _type) {
        this.time = 0;
        this.type = 0;
        this.name = _name;
        this.type = _type;
        this.returnValue = true;
        this.time = Laya.window.layaTime;
    };
    laya.event.Event.__name__ = true;
    laya.event.Event.prototype = {
        __class__: laya.event.Event
    }
    laya.event.EventDriver = function() {};
    laya.event.EventDriver.__name__ = true;
    laya.event.EventDriver.enableTouch = function() {
        return true;
    }
    laya.event.EventDriver.AppAcceptOnKeyDown = function(p_nKeyCode, p_bAlt, p_bShift, p_bCtrl) {
        var esys = laya.event.EventMgr._eventMgr_;
        var event = {};
        event.keyCode = p_nKeyCode;
        event.altKey = p_bAlt;
        event.shiftKey = p_bShift;
        event.ctrlKey = p_bCtrl;
        esys.acceptSystemKeyEvent("onkeydown", event);
    }
    laya.event.EventDriver.AppAcceptOnKeyUp = function(p_nKeyCode, p_bAlt, p_bShift, p_bCtrl) {
        var esys = laya.event.EventMgr._eventMgr_;
        var event = {};
        event.keyCode = p_nKeyCode;
        event.altKey = p_bAlt;
        event.shiftKey = p_bShift;
        event.ctrlKey = p_bCtrl;
        esys.acceptSystemKeyEvent("onkeyup", event);
    }
    laya.event.EventDriver.AppAcceptOnKeyChar = function(p_nKeyChar, p_bAlt, p_bShift, p_bCtrl) {
        var esys = laya.event.EventMgr._eventMgr_;
        var event = {};
        event.keyChar = p_nKeyChar;
        event.altKey = p_bAlt;
        event.shiftKey = p_bShift;
        event.ctrlKey = p_bCtrl;
        esys.acceptSystemKeyEvent("onkeychar", event);
    }
    laya.event.EventDriver.AppAcceptOnMouseEvent = function(p_sType, p_nX, p_nY, p_nWheel) {
        var esys = laya.event.EventMgr._eventMgr_;
        var e = {
            type: p_sType,
            clientX: p_nX,
            clientY: p_nY,
            wheelDelta: p_nWheel
        };
        switch (p_sType) {
        case"mousedown":
            laya.event.EventDriver._mousepress_ = 1;
            esys.acceptSystemMouseEvent(e, 1, 1);
            break;
        case"mouseup":
            laya.event.EventDriver._mousepress_ = 0;
            esys.acceptSystemMouseEvent(e, 2, 0);
            break;
        case"mousemove":
            esys.acceptSystemMouseEvent(e, 16, laya.event.EventDriver._mousepress_);
            break;
        case"wheel":
            esys.acceptSystemMouseEvent(e, 16385, laya.event.EventDriver._mousepress_);
            break;
        }
    }
    laya.event.EventDriver.AppAcceptOnTouchEvent = function(p_nType, p_nID, p_nX, p_nY) {
        var esys = laya.event.EventMgr._eventMgr_;
        var event = {
            changedTouches: [],
            touches: null,
            type: 0
        };
        var touch = {
            id: 0,
            identifier: 0,
            clientX: 0,
            clientY: 0,
            type: ""
        };
        event.type = p_nType;
        touch.id = p_nID;
        touch.identifier = p_nID;
        touch.clientX = p_nX;
        touch.clientY = p_nY;
        event.changedTouches.push(touch);
        var evttype = p_nType;
        if (evttype == laya.event.EventDriver.APP_TOUCH_DOWN || evttype == laya.event.EventDriver.APP_TOUCH_PT_DOWN) {
            touch.type = "mousedown";
            laya.event.EventDriver.m_vTouchs.push(touch);
        } else if (evttype == laya.event.EventDriver.APP_TOUCH_PT_UP) {
            touch.type = "mouseup";
            var epos = 0;
            var tnum = laya.event.EventDriver.m_vTouchs.length;
            var cid = touch.id;
            while (epos < tnum) {
                var ce = laya.event.EventDriver.m_vTouchs[epos];
                if (ce.id == cid)
                    break;
                    epos++;
            }
            if (epos >= tnum) {} else 
                laya.event.EventDriver.m_vTouchs.splice(epos, 1);
        } else if (evttype == laya.event.EventDriver.APP_TOUCH_MOV) {
            touch.type = "mousemove";
            var tnum = laya.event.EventDriver.m_vTouchs.length;
            var cid = touch.id;
            var ti = 0;
            while (ti < tnum) {
                var ce = laya.event.EventDriver.m_vTouchs[ti];
                if (ce.id == cid) {
                    laya.event.EventDriver.m_vTouchs[ti] = touch;
                    break;
                }
                ti++;
            }
        } else if (evttype == laya.event.EventDriver.APP_TOUCH_UP) {
            touch.type = "mouseup";
            laya.event.EventDriver.m_vTouchs = [];
        }
        event.touches = laya.event.EventDriver.m_vTouchs;
        if (evttype == laya.event.EventDriver.APP_TOUCH_DOWN || evttype == laya.event.EventDriver.APP_TOUCH_PT_DOWN)
            esys.acceptSystemMouseEvent(event, 1, 1);
        else if (evttype == laya.event.EventDriver.APP_TOUCH_MOV || evttype == 9)
            esys.acceptSystemMouseEvent(event, 16, 2);
        else if (evttype == laya.event.EventDriver.APP_TOUCH_UP || evttype == laya.event.EventDriver.APP_TOUCH_PT_UP)
            esys.acceptSystemMouseEvent(event, 2, 0);
    }
    laya.event.EventDriver.FlashAcceptOnMouseEvent = function(p_sType, p_nX, p_nY, p_nWheel) {
        var esys = laya.event.EventMgr._eventMgr_;
        var e = {
            type: p_sType,
            clientX: p_nX + Laya.window.left,
            clientY: p_nY + Laya.window.top,
            wheelDelta: p_nWheel
        };
        switch (p_sType) {
        case"mouseDown":
            laya.event.EventDriver._mousepress_ = 1;
            esys.acceptSystemMouseEvent(e, 1, 1);
            break;
        case"mouseUp":
            laya.event.EventDriver._mousepress_ = 0;
            esys.acceptSystemMouseEvent(e, 2, 0);
            break;
        case"mouseMove":
            esys.acceptSystemMouseEvent(e, 16, laya.event.EventDriver._mousepress_);
            break;
        case"wheel":
            esys.acceptSystemMouseEvent(e, 16385, laya.event.EventDriver._mousepress_);
            break;
        }
    }
    laya.event.EventDriver.FlashAcceptOnKeyEvent = function(p_sType, p_nKeyChar, p_nKeyCode, p_bCtrl, p_bAlt, p_bShift) {
        var esys = laya.event.EventMgr._eventMgr_;
        var event = {};
        if (p_sType == "keyDown") {
            event.keyCode = p_nKeyCode;
            event.keyChar = p_nKeyChar;
            event.altKey = p_bAlt;
            event.shiftKey = p_bShift;
            event.ctrlKey = p_bCtrl;
            esys.acceptSystemKeyEvent("onkeydown", event);
        } else if (p_sType == "keyUp") {
            event.keyCode = p_nKeyCode;
            event.altKey = p_bAlt;
            event.shiftKey = p_bShift;
            event.ctrlKey = p_bCtrl;
            esys.acceptSystemKeyEvent("onkeyup", event);
        }
    }
    laya.event.EventDriver.enable = function() {
        var esys = laya.event.EventMgr._eventMgr_;
        var window = Laya.jwindow;
        var document = window.document;
        if (Laya._ISAPP_) {
            if (laya.event.EventDriver.enableTouch()) {
                Laya.attachBrowserEvent("ontouch", laya.event.EventDriver.AppAcceptOnTouchEvent);
                Laya.attachBrowserEvent("onkeychar", laya.event.EventDriver.AppAcceptOnKeyChar);
            } else {
                Laya.attachBrowserEvent("onmouseevent", laya.event.EventDriver.AppAcceptOnMouseEvent);
                Laya.attachBrowserEvent("onkeydown", laya.event.EventDriver.AppAcceptOnKeyDown);
                Laya.attachBrowserEvent("onkeyup", laya.event.EventDriver.AppAcceptOnKeyUp);
                Laya.attachBrowserEvent("onkeychar", laya.event.EventDriver.AppAcceptOnKeyChar);
            }
        } else if (Laya._ISFLASH_ == false) {
            if (laya.event.EventDriver.enableTouch()) {
                Laya.attachBrowserEvent("ontouchstart", function(e) {
                    esys.acceptSystemMouseEvent(e, 1, 1);
                });
                Laya.attachBrowserEvent("ontouchmove", function(e) {
                    esys.acceptSystemMouseEvent(e, 16, 2);
                });
                Laya.attachBrowserEvent("ontouchend", function(e) {
                    esys.acceptSystemMouseEvent(e, 2, 0);
                });
            } else {
                Laya.attachBrowserEvent("onmousedown", function(e) {
                    laya.event.EventDriver._mousepress_ = 1;
                    esys.acceptSystemMouseEvent(e, 1, 1);
                });
                Laya.attachBrowserEvent("onmousemove", function(e) {
                    esys.acceptSystemMouseEvent(e, 16, laya.event.EventDriver._mousepress_);
                });
                Laya.attachBrowserEvent("onmouseup", function(e) {
                    laya.event.EventDriver._mousepress_ = 0;
                    esys.acceptSystemMouseEvent(e, 2, 0);
                });
                var wheel = function(e) {
                    return esys.acceptSystemMouseEvent(e, 16385, laya.event.EventDriver._mousepress_);
                };
                Laya.attachBrowserEvent("DOMMouseScroll", wheel);
                window.onmousewheel = document.onmousewheel = wheel;
                document.onkeydown = function(e) {
                    return esys.acceptSystemKeyEvent("onkeydown", e);
                };
                document.onkeyup = function(e) {
                    return esys.acceptSystemKeyEvent("onkeyup", e);
                };
            }
        }
    }
    laya.event.EventDriver.prototype = {
        __class__: laya.event.EventDriver
    }
    laya.event.EventListener = function(owner, call_back) {
        this.deleted = false;
        this.owner = owner;
        if (call_back != null)
            this.call_back = call_back;
        this.id=++laya.event.EventListener._ID_;
    };
    laya.event.EventListener.__name__ = true;
    laya.event.EventListener.prototype = {
        destroy: function() {
            this.deleted = true;
            this.owner = null;
            this.call_back = null;
        },
        __class__: laya.event.EventListener
    }
    laya.event.EventMgr = function() {
        this._id_ = 0;
        this._mousePreUpTime = 0;
        this.mouseDowningTime = 0;
        this.mouseOverQueue = new Array();
        this.keyEventQueue = new Array();
        this.mouseEventQueue = [];
        this.delayMouseDownNodes = new Array();
    };
    laya.event.EventMgr.__name__ = true;
    laya.event.EventMgr.dispatchSystemEvent = function() {
        if (Laya._ISAPP_)
            Laya.conch.beginTouchCall();
        var o = laya.event.EventMgr._eventMgr_;
        if (o.keyEventQueue.length > 0) {
            var _g1 = 0, _g = o.keyEventQueue.length;
            while (_g1 < _g) {
                var i = _g1++;
                var key = o.keyEventQueue[i];
                laya.event.KeyEvent.CTRLKEY = key.ctrlKey;
                laya.event.KeyEvent.SHIFTKEY = key.shiftKey;
                laya.event.KeyEvent.ALTKEY = key.altKey;
                o.dispatchKeyEvent(key);
            }
            o.keyEventQueue.length = 0;
        }
        if (o.mouseEventQueue.length < 1)
            return;
        var preMov = null;
        var wnd = Laya.window;
        var ms = o.mouseEventQueue;
        o.mouseEventQueue = [];
        var _g1 = 0, _g = ms.length;
        while (_g1 < _g) {
            var i = _g1++;
            var e = ms[i];
            if (e.type == 16) {
                if (preMov == null)
                    preMov = e;
                else {
                    if (e.time - preMov.time < 2)
                        continue;
                    if (Math.abs(preMov.clientX - e.clientX) + Math.abs(preMov.clientY - e.clientY) < 1)
                        continue;
                }
            } else 
                preMov = null;
            wnd.mouseX = e.clientX;
            wnd.mouseY = e.clientY;
            if (!Laya.document.onMouse(e))
                continue;
            o.dispatchMouseEvent(e);
        }
        o.mouseEventQueue = [];
    }
    laya.event.EventMgr.prototype = {
        dispatchMouseEvent: function(event) {
            this._id_++;
            var win = Laya.window;
            var type = event.type;
            win.event = event;
            if (event._sys_ == null)
                event._sys_ = {};
            event.offsetX = event.clientX;
            event.offsetY = event.clientY;
            event._sys_.scalex = 1;
            event._sys_.scaley = 1;
            var dragInfo = Laya.document.dragInformation;
            var activeElement = Laya.document.activeElement;
            Laya.document.dispatchEvent(event);
            if (type >= 0) {
                switch (type) {
                case 1:
                    this.mouseDowningTime = event.time;
                    if (dragInfo.touchId < 0) {
                        dragInfo.willDragElement = null;
                        dragInfo.clientX = event.clientX;
                        dragInfo.clientY = event.clientY;
                        dragInfo.dragOffsX = 0;
                        dragInfo.dragOffsY = 0;
                        dragInfo.startTm = event.time;
                        dragInfo.startX = event.clientX;
                        dragInfo.startY = event.clientY;
                    }
                    break;
                case 2:
                    this.mouseDowningTime = 0;
                    if (dragInfo.touchId == event.touchId)
                        dragInfo.willDragElement = null;
                    break;
                case 32:
                    if (dragInfo.willDragElement != null) {
                        var node = dragInfo.willDragElement;
                        dragInfo.willDragElement = null;
                        if (node.dispatchEvent(event, "ondragstart")) {
                            Laya.document.dragingElement = node;
                            if (laya.element.Input.__ALLINPUTLAYER_ != null)
                                laya.element.Input.__ALLINPUTLAYER_.style.display = "none";
                            dragInfo.cloneCanvas.set_reference(node);
                            var pos = dragInfo.dragNodePos = node.posOfTop(null, 0, 0);
                            dragInfo.cloneCanvas.pos(pos.x, pos.y);
                        }
                    }
                    break;
                }
                event._sys_.mousedown = this.mouseDowningTime;
                if (Laya.document.dragingElement != null && dragInfo.touchId == event.touchId) {
                    var drag = Laya.document.dragingElement;
                    var dragctr = drag.get_dragCtrl();
                    switch (type) {
                    case 16:
                        dragInfo.dragOffsX = event.clientX - dragInfo.clientX;
                        dragInfo.dragOffsY = event.clientY - dragInfo.clientY;
                        event.offsetX = dragInfo.nodeEventOffsetX;
                        event.offsetY = dragInfo.nodeEventOffsetY;
                        dragctr.ondrag(event, Laya.document.dragingElement);
                        if (drag._private_.onmouseover != null)
                            drag._private_.onmouseover = this._id_;
                        break;
                    case 2:
                        if (laya.element.Input.__ALLINPUTLAYER_ != null)
                            laya.element.Input.__ALLINPUTLAYER_.style.display = "";
                        event.offsetX = dragInfo.nodeEventOffsetX;
                        event.offsetY = dragInfo.nodeEventOffsetY;
                        dragctr.ondragend(event, Laya.document.dragingElement);
                        drag.dispatchEvent(event, "ondragend");
                        if (dragInfo.dropElement != null) {
                            dragInfo.dropElement.dispatchEvent(event, "ondrop");
                            dragInfo.dropElement.dispatchEvent(event, "ondragout");
                            dragInfo.dropElement._private_.ondragover = false;
                            dragInfo.dropElement = null;
                        }
                        Laya.document.dragingElement = null;
                        dragInfo.cloneCanvas.show(false);
                        if (dragInfo.touchId == event.touchId)
                            dragInfo.touchId =- 1;
                        return;
                    }
                }
                if (type == 32) {
                    if (Laya.document.dragingElement != null && dragInfo.touchId == event.touchId) {
                        event.offsetX = dragInfo.nodeEventOffsetX;
                        event.offsetY = dragInfo.nodeEventOffsetY;
                        Laya.document.dragingElement.get_dragCtrl().ondragstart(event, Laya.document.dragingElement);
                        event.offsetX = event.clientX;
                        event.offsetY = event.clientY;
                    }
                } else {
                    if (type == 2 && dragInfo.touchId == event.touchId)
                        dragInfo.touchId =- 1;
                    event.offsetX = event.clientX;
                    event.offsetY = event.clientY;
                    this._dispatchMouseEventNode_(Laya.document.body, event, true);
                }
            }
            var lastsz = 0;
            var _g1 = 0, _g = this.mouseOverQueue.length;
            while (_g1 < _g) {
                var i = _g1++;
                var node = this.mouseOverQueue[i];
                if (node == null)
                    continue;
                if (node.deleted) {
                    this.mouseOverQueue[i] = null;
                    continue;
                }
                if (node._private_.onmouseover != this._id_) {
                    if (node._private_.ondragover == true) {
                        node.dispatchEvent(event, "ondragout");
                        node._private_.ondragover = false;
                        if (dragInfo.dropElement == node)
                            dragInfo.dropElement = null;
                    }
                    node.dispatchEvent(event, "onmouseout");
                    node._private_.onmouseover = null;
                    this.mouseOverQueue[i] = null;
                    continue;
                }
                lastsz = i + 1;
            }
            if (lastsz < this.mouseOverQueue.length)
                this.mouseOverQueue.length = lastsz;
            if (activeElement != null && activeElement.deleted)
                activeElement = null;
            if (type == 1) {
                if (activeElement != null && activeElement == Laya.document.activeElement && activeElement._private_.ismousedowning != this._id_)
                    Laya.document.activeElement.blur();
                if (dragInfo.touchId == event.touchId && dragInfo.willDragElement == null)
                    dragInfo.touchId =- 1;
            }
        },
        _dispatchMouseEventNode_: function(node, event, checkDownDelay) {
            if (node.style == null)
                return true;
            if (node.hidden > 0 ||!((node._type_ & 4) == 4))
                return true;
            if (event.type == 16&&!((node._type_ & 8) == 8))
                return true;
            if (event.type == 32&&!((node._type_ & 32768) == 32768))
                return true;
            var element = node._toElement_();
            var style = node.style;
            if (style.transform.style == null) {
                event.offsetX -= Laya.Round(element._get_clientLeft());
                event.offsetY -= Laya.Round(element._get_clientTop());
            } else {
                var sx = style.get_scalex(), sy = style.get_scaley();
                event.offsetX = Laya.Round((event.offsetX - element._get_clientLeft() - style.transform.translateX * (1 - sx)) / sx);
                event.offsetY = Laya.Round((event.offsetY - element._get_clientTop() - style.transform.translateY * (1 - sy)) / sy);
            }
            if (Laya.document.dragingElement != node && element.pointInNode(event.offsetX, event.offsetY) == null)
                return true;
            if (!node.enableMouseEvent(event)) {
                event.cancelChild = true;
                return true;
            }
            event.cancelChild = false;
            if (node._private_.bDisableMouseToChild != true) {
                var d = style.data;
                if (!event.cancelBubble) {
                    laya.element.method.ElementMethod.childsSort(element);
                    var ox = event.offsetX, oy = event.offsetY;
                    event.offsetX += element.get_scrollLeft();
                    event.offsetY += element.get_scrollTop();
                    this.dispatchMouseEventToChilds(node, node.childNodes, event, true);
                    event.offsetX = ox;
                    event.offsetY = oy;
                }
            }
            event.target = node;
            if (event.cancelBubble)
                return false;
            event.cancelChild = event.cancelBubble = element.m_cancelBubble == true;
            var dragInfo = Laya.document.dragInformation;
            if (Laya.document.dragingElement == node && dragInfo.touchId == event.touchId) {
                dragInfo.nodeEventOffsetX = event.offsetX;
                dragInfo.nodeEventOffsetY = event.offsetY;
            }
            switch (event.type) {
            case 1:
                if (node._private_.onmouseover == null) {
                    node.dispatchEvent(event, "onmouseover");
                    this.mouseOverQueue.push(element);
                }
                node._private_.onmouseover = this._id_;
                node.dispatchEvent(event);
                node._private_.ismousedowning = this._id_;
                if (dragInfo.willDragElement == null && element.get_draggable() != null && dragInfo.touchId < 0) {
                    dragInfo.touchId = event.touchId;
                    dragInfo.nodeEventOffsetX = event.offsetX;
                    dragInfo.nodeEventOffsetY = event.offsetY;
                    dragInfo.willDragElement = element;
                    dragInfo.nodeLeft = Laya.Round(element.get_left());
                    dragInfo.nodeTop = Laya.Round(element.get_top());
                }
                break;
            case 2:
                if (dragInfo.touchId == event.touchId)
                    node._private_.ondragover = false;
                node.dispatchEvent(event);
                if (node._private_.ismousedowning) {
                    node._private_.ismousedowning = false;
                    event.type = 64;
                    if (node.enableMouseEvent(event))
                        node.dispatchEvent(event, "onclick");
                    event.type = 2;
                } else 
                    console.log("click err:" + Std.string(event.type) + " " + event.name + " " + node.toString());
                if (laya.event.MouseEvent.TOUCHINGCOUNT < 1)
                    node.dispatchEvent(event, "onsingletouchup");
                break;
            case 16:
                node.dispatchEvent(event, "onmousemove");
                if ((node._type_ & 33554432) == 33554432 || (node._type_ & 67108864) == 67108864) {
                    if (node._private_.onmouseover == null) {
                        node.dispatchEvent(event, "onmouseover");
                        this.mouseOverQueue.push(element);
                    }
                    node._private_.onmouseover = this._id_;
                    if ((node._type_ & 67108864) == 67108864 && Laya.document.dragingElement != null && Laya.document.dragingElement != node && dragInfo.touchId == event.touchId) {
                        if (!node._private_.ondragover) {
                            if (node.dispatchEvent(event, "ondragover")) {
                                node._private_.ondragover = true;
                                Laya.document.dragInformation.dropElement = node;
                            }
                        }
                    }
                }
                break;
            case 127:
                node._private_.onmouseover = this._id_;
                node.dispatchEvent(event, "ondbclick");
                break;
            case 16385:
                var d = event._sys_.wheelDelta;
                var tox = Math.round(element.get_scrollLeft() + d.x * (element.get_width() / 10 + 4));
                var toy = Math.round(element.get_scrollTop() - d.y * (element.get_height() / 10 + 4));
                element.scrollToUseEffect(tox, toy);
                element.dispatchEvent(event, "onwheel");
                break;
            }
            return true;
        },
        dispatchMouseEventToChilds: function(node, childs, e, checkDownDelay) {
            var s = childs.length;
            if (s < 1)
                return false;
            var i = s-1;
            while (i >= 0) {
                var c = childs[i];
                i--;
                if (c.deleted || c.hidden > 0)
                    continue;
                var ox = e.offsetX, oy = e.offsetY;
                if (!this._dispatchMouseEventNode_(c, e, checkDownDelay) || e.cancelBubble) {
                    e.offsetX = ox;
                    e.offsetY = oy;
                    return false;
                }
                e.offsetX = ox;
                e.offsetY = oy;
                if ((c._type_ & 268435456) == 268435456)
                    break;
                if (e.cancelChild == true) {
                    e.cancelChild = false;
                    break;
                }
            }
            return true;
        },
        dispatchKeyEvent: function(event) {
            switch (event.type) {
            case 1:
                Laya.document.onkeydown(event);
                break;
            case 2:
                Laya.document.onkeyup(event);
                break;
            case 3:
                break;
            }
            Laya.document.dispatchEvent(event);
        },
        acceptSystemMouseEvent: function(event, type, press) {
            event = event || Laya.jwindow.event;
            this._acceptSystemMouseEvent_(event, type, press);
        },
        _acceptSystemMouseEvent_: function(event, type, press) {
            if (event == null || Laya.window.disableMouse)
                return;
            if (!Laya.window.get_focus() && type == 1)
                return;
            var typeName = "on" + Std.string(event.type);
            var touches = event.changedTouches;
            if (touches != null) {
                if (touches[0] == null)
                    return;
                var _g1 = 0, _g = touches.length;
                while (_g1 < _g) {
                    var i = _g1++;
                    this._acceptSystemMouseEvent_(touches[i], type, press);
                }
                return;
            }
            switch (type) {
            case 2:
                laya.event.MouseEvent.TOUCHINGCOUNT--;
                typeName = "onmouseup";
                break;
            case 1:
                typeName = "onmousedown";
                Laya.window.set_focus(true);
                laya.event.MouseEvent.TOUCHINGCOUNT++;
                break;
            case 16:
                typeName = "onmousemove";
                break;
            }
            var scale = Laya.window.scale;
            var outEvent = new laya.event.MouseEvent(typeName, type);
            outEvent.press = press;
            outEvent.clientX = event.clientX;
            outEvent.clientY = event.clientY;
            outEvent.touchId = event.identifier == null ? 0 : event.identifier;
            if (event.pageX != null || event.pageY != null) {
                outEvent.clientX = event.pageX;
                outEvent.clientY = event.pageY;
            }
            outEvent.clientX = Math.floor(outEvent.clientX / scale.x);
            outEvent.clientY = Math.floor(outEvent.clientY / scale.y);
            if (type == 16385) {
                var x = 0, y = 0;
                if (outEvent._sys_ == null)
                    outEvent._sys_ = {};
                var d = outEvent._sys_.wheelDelta = {};
                if (event.wheelDelta != null)
                    y = event.wheelDelta;
                else if (event.detail)
                    y = event.detail;
                d.y = y > 0 ? 1 : y < 0?-1 : 0;
                d.x = x > 0 ? 1 : x < 0?-1 : 0;
            }
            outEvent.time = laya.utils.Method.getCurTime();
            var dragInfo = Laya.document.dragInformation;
            if (outEvent.type == 1) {}
            if (outEvent.type == 2) {
                if (outEvent.touchId == dragInfo.touchId)
                    dragInfo.startTm = 0;
                if (outEvent.time - this._mousePreUpTime < 400)
                    this._appendMousEvent(outEvent, 127, event.clientX, event.clientY);
                this._mousePreUpTime = outEvent.time;
            }
            this.mouseEventQueue.push(outEvent);
            if (press > 0 && outEvent.type == 16 && outEvent.touchId == dragInfo.touchId && (dragInfo.willDragElement != null || Laya.document.dragingElement != null)) {
                if (dragInfo.startTm > 0 && Math.abs(dragInfo.startX - outEvent.clientX) + Math.abs(dragInfo.startY - outEvent.clientY) > laya.event.EventMgr._enabledrag_size_) {
                    dragInfo.startTm = 0;
                    this._appendMousEvent(outEvent, 32, outEvent.clientX, outEvent.clientY);
                }
            }
            outEvent.clientX -= Laya.window.left;
            outEvent.clientY -= Laya.window.top;
        },
        _appendMousEvent: function(outEvent, type, nx, ny) {
            var x = outEvent.clientX, y = outEvent.clientY;
            var pretype = outEvent.type;
            outEvent.clientX = nx;
            outEvent.clientY = ny;
            outEvent.type = type;
            outEvent.identifier = outEvent.touchId;
            this._acceptSystemMouseEvent_(outEvent, type, outEvent.press);
            outEvent.clientX = x;
            outEvent.clientY = y;
            outEvent.type = pretype;
        },
        acceptSystemKeyEvent: function(type, event) {
            if (!Laya.window.get_focus())
                return true;
            var keyevent = this.toKeyEvent(type, event);
            if (Laya.document.editInfo != null) {
                if ((keyevent.keyCode == 113 || keyevent.keyCode == 192) && keyevent.ctrlKey) {
                    Laya.document.editInfo.acceptKeyEvent(keyevent);
                    return false;
                }
                if (!Laya.document.onKey(keyevent))
                    return false;
            }
            this.keyEventQueue.push(keyevent);
            if (event.keyCode == 9) {
                event.keyCode = 0;
                if (event.preventDefault != null)
                    event.preventDefault();
                else 
                    event.returnValue = false;
                return false;
            }
            return true;
        },
        toKeyEvent: function(type, event) {
            event = event || Laya.jwindow.event;
            var keyevent = new laya.event.KeyEvent(type, type == "onkeydown" ? 1 : type == "onkeychar" ? 3 : 2);
            keyevent.keyCode = event.keyCode || event.which || event.charCode;
            keyevent.altKey = event.altKey;
            keyevent.shiftKey = event.shiftKey;
            keyevent.ctrlKey = event.ctrlKey;
            keyevent.keyChar = event.keyChar;
            keyevent.name = type;
            laya.event.KeyEvent.setKeyboardState(event.keyCode, type == "onkeydown" ? 1 : 0);
            return keyevent;
        },
        __class__: laya.event.EventMgr
    }
    laya.utils.IntMap = function() {
        this._data_ = [];
    };
    laya.utils.IntMap.__name__ = true;
    laya.utils.IntMap.prototype = {
        clear: function() {
            this._data_ = [];
        },
        remove: function(key) {
            this._data_.__removeKeyElement__(key);
        },
        set: function(key, d) {
            this._data_[key] = d;
        },
        get: function(key) {
            return this._data_[key];
        },
        __class__: laya.utils.IntMap
    }
    laya.event.KeyEvent = function(_name, _type) {
        this.altKey = false;
        this.shiftKey = false;
        this.ctrlKey = false;
        laya.event.Event.call(this, _name, _type);
    };
    laya.event.KeyEvent.__name__ = true;
    laya.event.KeyEvent.clearKeyboardState = function() {
        laya.event.KeyEvent.keyboardState.clear();
    }
    laya.event.KeyEvent.setKeyboardState = function(_keycode, _state) {
        laya.event.KeyEvent.keyboardState.set(_keycode, _state);
    }
    laya.event.KeyEvent.getKeyboardState = function(_keycode) {
        if (laya.event.KeyEvent.keyboardState.get(_keycode) != null)
            return laya.event.KeyEvent.keyboardState.get(_keycode);
        return 0;
    }
    laya.event.KeyEvent.__super__ = laya.event.Event;
    laya.event.KeyEvent.prototype = $extend(laya.event.Event.prototype, {
        __class__: laya.event.KeyEvent
    });
    laya.event.MouseEvent = function(_name, _type) {
        this.touchId = 0;
        this.offsetY = 0;
        this.offsetX = 0;
        this.clientY = 0;
        this.clientX = 0;
        laya.event.Event.call(this, _name, _type);
    };
    laya.event.MouseEvent.__name__ = true;
    laya.event.MouseEvent.__super__ = laya.event.Event;
    laya.event.MouseEvent.prototype = $extend(laya.event.Event.prototype, {
        __class__: laya.event.MouseEvent
    });
    laya.fir = {}
    laya.fir.Fir = function() {
        laya.element.Div.call(this);
    };
    laya.fir.Fir.__name__ = true;
    laya.fir.Fir._init_ = function() {
        laya.Document.regNodeClass("fir", laya.fir.Fir, null);
        if (Laya.jwindow.DeviceMotionEvent)
            Laya.jwindow.addEventListener("devicemotion", laya.fir.Fir.deviceMotionHandle, false);
    }
    laya.fir.Fir.deviceMotionHandle = function(eventData) {
        var acceleration = eventData.accelerationIncludingGravity;
        var curTime = Laya.CurTime;
        if (curTime - laya.fir.Fir.last_update > 300) {
            var diffTime = curTime - laya.fir.Fir.last_update;
            laya.fir.Fir.last_update = curTime;
            laya.fir.Fir.x = acceleration.x;
            laya.fir.Fir.y = acceleration.y;
            laya.fir.Fir.z = acceleration.z;
            var speed = Math.abs(laya.fir.Fir.x + laya.fir.Fir.y + laya.fir.Fir.z - laya.fir.Fir.last_x - laya.fir.Fir.last_y - laya.fir.Fir.last_z) / diffTime * 10000;
            if (speed > laya.fir.Fir.SHAKE_THRESHOLD)
                laya.fir.Fir.shaked(laya.fir.Fir.x, laya.fir.Fir.y, laya.fir.Fir.z, laya.fir.Fir.last_x, laya.fir.Fir.last_y, laya.fir.Fir.last_z);
            laya.fir.Fir.last_x = laya.fir.Fir.x;
            laya.fir.Fir.last_y = laya.fir.Fir.y;
            laya.fir.Fir.last_z = laya.fir.Fir.z;
        }
    }
    laya.fir.Fir.shaked = function(x, y, z, last_x, last_y, last_z) {}
    laya.fir.Fir.__super__ = laya.element.Div;
    laya.fir.Fir.prototype = $extend(laya.element.Div.prototype, {
        __class__: laya.fir.Fir
    });
    laya.utils.FloatMap = function() {
        this._data_ = [];
    };
    laya.utils.FloatMap.__name__ = true;
    laya.utils.FloatMap.prototype = {
        clear: function() {
            this._data_ = [];
        },
        remove: function(key) {
            this._data_.__removeKeyElement__(key);
        },
        set: function(key, d) {
            this._data_[key] = d;
        },
        get: function(key) {
            return this._data_[key];
        },
        __class__: laya.utils.FloatMap
    }
    laya.flash = {}
    laya.flash.FlashAudio = function() {
        this.__audionode__ = null;
        this.volume = 1;
        this.src = "";
        this.autoplay = false;
        this.loop = true;
        this.type = 0;
        this.m_pFlash = null;
        this.id = laya.flash.FlashAudio.ms_nAudioID++;
        this.m_pFlash = laya.flash.LayaFlashConch.getInstance().m_pFlash;
        laya.flash.FlashAudio.ms_vMapAudio.set(this.id, this);
    };
    laya.flash.FlashAudio.__name__ = true;
    laya.flash.FlashAudio.wavPlayEnd = function(p_nId) {
        var pAudio = laya.flash.FlashAudio.ms_vMapAudio.get(p_nId);
        if (pAudio != null)
            pAudio.__audionode__.onEnded();
    }
    laya.flash.FlashAudio.prototype = {
        addEventListener: function(name, func) {},
        stop: function() {
            if (this.type == 0)
                this.m_pFlash.stopMusic();
            else if (this.type == 1)
                this.m_pFlash.stopEffect();
        },
        resume: function() {
            if (this.type == 0)
                this.m_pFlash.resumeMusic();
        },
        pause: function() {
            if (this.type == 0)
                this.m_pFlash.pauseMusic();
        },
        play: function() {
            if (this.type == 0)
                this.m_pFlash.playMusic(this.src, this.loop, this.volume);
            else if (this.type == 1)
                this.m_pFlash.playEffect(this.id, this.src, this.loop, this.volume);
        },
        setVolume: function(volume) {
            this.volume = volume;
            if (this.type == 0)
                this.m_pFlash.musicVolume(volume);
            else if (this.type == 1)
                this.m_pFlash.effectVolume(volume);
        },
        setSrc: function(url) {
            if (this.src == url) {
                if (this.autoplay == true)
                    this.play();
                return;
            }
            this.src = url;
            if (url.indexOf(".wav")>-1)
                this.type = 1;
            else 
                this.type = 0;
            if (this.autoplay == true)
                this.play();
        },
        setMuted: function(p_bMuted) {
            if (this.type == 0)
                this.m_pFlash.muteMusic(p_bMuted);
            else if (this.type == 1)
                this.m_pFlash.muteEffect(p_bMuted);
        },
        __class__: laya.flash.FlashAudio
    }
    laya.flash.FlashCanvas = function() {
        this.m_bGPUCanvas = true;
        this.m_sRenderCommand = null;
        this.context = null;
        this.m_nHeight = 0;
        this.m_nWidth = 0;
        this.id = 0;
        this.m_pFlashConch = null;
        this.id = laya.flash.FlashCanvas.ms_nCanvasID++;
        this.m_pFlashConch = laya.flash.LayaFlashConch.getInstance();
        this.m_sRenderCommand = new Array();
        if (laya.flash.FlashCanvas.ms_pMainCanvas == null) {
            laya.flash.FlashCanvas.ms_pMainCanvas = this;
            this.m_pFlashConch.m_pFlash.createCanvas(this.id);
        } else {
            this.m_sRenderCommand[0] = "createCavnas";
            this.m_sRenderCommand[1] = this.id;
            this.m_pFlashConch.pushCommand(this.id, this.m_sRenderCommand, 2, false);
        }
    };
    laya.flash.FlashCanvas.__name__ = true;
    laya.flash.FlashCanvas.prototype = {
        getContext: function(type) {
            if (this.context == null)
                this.context = new laya.flash.FlashContext(this);
            return this.context;
        },
        reset: function(w, h) {
            this.setSize(w, h);
        },
        setSize: function(w, h) {
            if (this.m_nWidth == w && this.m_nHeight == h)
                return;
            this.m_nWidth = w;
            this.m_nHeight = h;
            if (this == laya.flash.FlashCanvas.ms_pMainCanvas)
                this.m_pFlashConch.m_pFlash.setSize(w, h);
            else {
                this.m_sRenderCommand[0] = "setCanvasSize";
                this.m_sRenderCommand[1] = w;
                this.m_sRenderCommand[2] = h;
                this.m_pFlashConch.pushCommand(this.id, this.m_sRenderCommand, 3);
            }
        },
        set_height: function(h) {
            Laya.alert("为了效率问题 请调用 setSize");
            return this.m_nHeight = h;
        },
        get_height: function() {
            return this.m_nHeight;
        },
        set_width: function(w) {
            Laya.alert("为了效率问题 请调用 setSize");
            return this.m_nWidth = w;
        },
        get_width: function() {
            return this.m_nWidth;
        },
        __class__: laya.flash.FlashCanvas
    }
    laya.flash.FlashContext = function(p_pCanvas, p_bFakeCanvas) {
        if (p_bFakeCanvas == null)
            p_bFakeCanvas = false;
        this.m_filter = null;
        this.m_strokeStyle = "#000000";
        this.m_fillStyle = "#000000";
        this.m_globalAlpha = 1;
        this.m_globalCompositeOperation = "source-over";
        this.m_textBaseline = "alphabetic";
        this.m_textAlign = "start";
        this.m_lineWidth = 1;
        this.m_lineJoin = "miter";
        this.m_lineCap = "butt";
        this.m_shadowOffsetY = 0;
        this.m_shadowOffsetX = 0;
        this.m_shadowBlur = 0;
        this.m_shadowColor = "#000000";
        this.m_pFakeCanvas = null;
        this.m_bFakeCanvas = false;
        this.m_sRenderCommand = null;
        this.m_nHeight = 0;
        this.m_nWidth = 0;
        this.m_nID = 0;
        this.m_pCanvas = null;
        this.m_pFlashConch = null;
        this.m_pFlashConch = laya.flash.LayaFlashConch.getInstance();
        if (p_bFakeCanvas == false) {
            this.m_pCanvas = p_pCanvas;
            this.m_nID = p_pCanvas.id;
            this.m_bFakeCanvas = false;
        } else {
            this.m_pFakeCanvas = p_pCanvas;
            this.m_bFakeCanvas = true;
            this.m_nID =- 1;
        }
        this.m_nWidth = p_pCanvas.m_nWidth;
        this.m_nHeight = p_pCanvas.m_nHeight;
        this.m_filter = {
            r: 1.0,
            g: 1.0,
            b: 1.0,
            gray: 0.0
        };
        this.m_sRenderCommand = new Array();
    };
    laya.flash.FlashContext.__name__ = true;
    laya.flash.FlashContext.prototype = {
        pushCommand: function(canvasID, strCommand, p_nLen) {
            if (this.m_bFakeCanvas == false)
                this.m_pFlashConch.pushCommand(canvasID, strCommand, p_nLen);
            else 
                this.m_pFakeCanvas.pushCommand(strCommand, p_nLen);
        },
        createPattern: function(src, type) {
            return {
                img: src,
                type: type
            };
        },
        measureTextEx: function(txt, fontInfo, nFontID) {
            var pInfo = this.m_pFlashConch.m_pFlash.measureText(txt, fontInfo, nFontID);
            return {
                width: pInfo.x,
                height: pInfo.y
            };
        },
        setFontID: function(font, id) {
            this.m_sRenderCommand[0] = "setFontID";
            this.m_sRenderCommand[1] = font;
            this.m_sRenderCommand[2] = id;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 3);
        },
        quadraticCurveTo: function(left, top, width, height) {},
        putImageData: function(data, left, top) {},
        getImageData: function(x, y, width, height) {
            return null;
        },
        drawFakeCanvas9: function(p_pFakeCanvas, p_nSX, p_nSY, p_nSWidth, p_nSHeight, p_nDX, p_nDY, p_nDWidth, p_nDHeight) {
            if (this.m_bFakeCanvas == true) {
                this.rect(p_nDX, p_nDY, p_nDWidth, p_nDHeight);
                this.clip();
                var fSX = p_nDWidth / p_nSWidth;
                var fSY = p_nDHeight / p_nSHeight;
                this.translate(p_nDX - p_nSX * fSX, p_nDY - p_nSY * fSY);
                if (p_pFakeCanvas.m_sRenderCommands.length > 0) {
                    this.m_pFakeCanvas.attachCommand(p_pFakeCanvas.m_sRenderCommands);
                    p_pFakeCanvas.m_sRenderCommands = "";
                }
            } else {
                p_pFakeCanvas.commitRenderCommandToFlash();
                this.m_sRenderCommand[0] = "drawFakeCanvas9";
                this.m_sRenderCommand[1] = p_pFakeCanvas.id;
                this.m_sRenderCommand[2] = p_nSX;
                this.m_sRenderCommand[3] = p_nSY;
                this.m_sRenderCommand[4] = p_nSWidth;
                this.m_sRenderCommand[5] = p_nSHeight;
                this.m_sRenderCommand[6] = p_nDY;
                this.m_sRenderCommand[7] = p_nDY;
                this.m_sRenderCommand[8] = p_nDWidth;
                this.m_sRenderCommand[9] = p_nDHeight;
                this.pushCommand(this.m_nID, this.m_sRenderCommand, 10);
            }
        },
        drawFakeCanvas5: function(p_pFakeCanvas, p_nX, p_nY, p_nWidth, p_nHeight) {
            if (this.m_bFakeCanvas == true) {
                this.rect(p_nX, p_nY, p_nWidth, p_nHeight);
                this.clip();
                var fSX = p_nWidth / p_pFakeCanvas.m_nWidth;
                var fSY = p_nHeight / p_pFakeCanvas.m_nHeight;
                this.translate(p_nX, p_nY);
                this.scale(fSX, fSY);
                if (p_pFakeCanvas.m_sRenderCommands.length > 0) {
                    this.m_pFakeCanvas.attachCommand(p_pFakeCanvas.m_sRenderCommands);
                    p_pFakeCanvas.m_sRenderCommands = "";
                }
            } else {
                p_pFakeCanvas.commitRenderCommandToFlash();
                this.m_sRenderCommand[0] = "drawFakeCanvas5";
                this.m_sRenderCommand[1] = p_pFakeCanvas.id;
                this.m_sRenderCommand[2] = p_nX;
                this.m_sRenderCommand[3] = p_nY;
                this.m_sRenderCommand[4] = p_nWidth;
                this.m_sRenderCommand[5] = p_nHeight;
                this.pushCommand(this.m_nID, this.m_sRenderCommand, 6);
            }
        },
        drawFakeCanvas3: function(p_pFakeCanvas, x, y) {
            if (this.m_bFakeCanvas == true) {
                this.rect(x, y, p_pFakeCanvas.m_nWidth, p_pFakeCanvas.m_nHeight);
                this.clip();
                this.translate(x, y);
                if (p_pFakeCanvas.m_sRenderCommands.length > 0) {
                    this.m_pFakeCanvas.attachCommand(p_pFakeCanvas.m_sRenderCommands);
                    p_pFakeCanvas.m_sRenderCommands = "";
                }
            } else {
                p_pFakeCanvas.commitRenderCommandToFlash();
                this.m_sRenderCommand[0] = "drawFakeCanvas3";
                this.m_sRenderCommand[1] = p_pFakeCanvas.id;
                this.m_sRenderCommand[2] = x;
                this.m_sRenderCommand[3] = y;
                this.pushCommand(this.m_nID, this.m_sRenderCommand, 4);
            }
        },
        drawCanvas9: function(src, sx, sy, sw, sh, dx, dy, dw, dh) {
            this.m_sRenderCommand[0] = "drawCanvas9";
            this.m_sRenderCommand[1] = src.id;
            this.m_sRenderCommand[2] = sx;
            this.m_sRenderCommand[3] = sy;
            this.m_sRenderCommand[4] = sw;
            this.m_sRenderCommand[5] = sh;
            this.m_sRenderCommand[6] = dx;
            this.m_sRenderCommand[7] = dy;
            this.m_sRenderCommand[8] = dw;
            this.m_sRenderCommand[9] = dh;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 10);
        },
        drawCanvas5: function(src, x, y, w, h) {
            this.m_sRenderCommand[0] = "drawCanvas5";
            this.m_sRenderCommand[1] = src.id;
            this.m_sRenderCommand[2] = x;
            this.m_sRenderCommand[3] = y;
            this.m_sRenderCommand[4] = w;
            this.m_sRenderCommand[5] = h;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 6);
        },
        drawCanvas3: function(src, x, y) {
            this.m_sRenderCommand[0] = "drawCanvas3";
            this.m_sRenderCommand[1] = src.id;
            this.m_sRenderCommand[2] = x;
            this.m_sRenderCommand[3] = y;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 4);
        },
        drawImage9: function(src, sx, sy, sw, sh, dx, dy, dw, dh) {
            if (src.m_bImage == true) {
                this.m_sRenderCommand[0] = "drawImage9";
                this.m_sRenderCommand[1] = src.id;
                this.m_sRenderCommand[2] = sx;
                this.m_sRenderCommand[3] = sy;
                this.m_sRenderCommand[4] = sw;
                this.m_sRenderCommand[5] = sh;
                this.m_sRenderCommand[6] = dx;
                this.m_sRenderCommand[7] = dy;
                this.m_sRenderCommand[8] = dw;
                this.m_sRenderCommand[9] = dh;
                this.pushCommand(this.m_nID, this.m_sRenderCommand, 10);
            } else if (src.m_bGPUCanvas == true)
                this.drawCanvas9(src, sx, sy, sw, sh, dx, dy, dw, dh);
            else 
                this.drawFakeCanvas9(src, sx, sy, sw, sh, dx, dy, dw, dh);
        },
        drawImage5: function(src, x, y, w, h) {
            if (src.m_bImage == true) {
                this.m_sRenderCommand[0] = "drawImage5";
                this.m_sRenderCommand[1] = src.id;
                this.m_sRenderCommand[2] = x;
                this.m_sRenderCommand[3] = y;
                this.m_sRenderCommand[4] = w;
                this.m_sRenderCommand[5] = h;
                this.pushCommand(this.m_nID, this.m_sRenderCommand, 6);
            } else if (src.m_bGPUCanvas == true)
                this.drawCanvas5(src, x, y, w, h);
            else 
                this.drawFakeCanvas5(src, x, y, w, h);
        },
        drawImage3: function(src, x, y) {
            if (src.m_bImage == true) {
                this.m_sRenderCommand[0] = "drawImage3";
                this.m_sRenderCommand[1] = src.id;
                this.m_sRenderCommand[2] = x;
                this.m_sRenderCommand[3] = y;
                this.pushCommand(this.m_nID, this.m_sRenderCommand, 4);
            } else if (src.m_bGPUCanvas == true)
                this.drawCanvas3(src, x, y);
            else 
                this.drawFakeCanvas3(src, x, y);
        },
        drawImage: function(src, x, y) {
            if (src.m_bImage == true) {
                this.m_sRenderCommand[0] = "drawImage3";
                this.m_sRenderCommand[1] = src.id;
                this.m_sRenderCommand[2] = x;
                this.m_sRenderCommand[3] = y;
                this.pushCommand(this.m_nID, this.m_sRenderCommand, 4);
            } else if (src.m_bGPUCanvas == true)
                this.drawCanvas3(src, x, y);
            else 
                this.drawFakeCanvas3(src, x, y);
        },
        strokeText: function(txt, x, y) {
            this.m_sRenderCommand[0] = "strokeText";
            this.m_sRenderCommand[1] = txt;
            this.m_sRenderCommand[2] = x;
            this.m_sRenderCommand[3] = y;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 4);
        },
        fillText: function(txt, x, y) {
            this.m_sRenderCommand[0] = "fillText";
            this.m_sRenderCommand[1] = txt;
            this.m_sRenderCommand[2] = x;
            this.m_sRenderCommand[3] = y;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 4);
        },
        setTransform: function(n11, n12, n21, n22, n31, n32) {
            this.m_sRenderCommand[0] = "setTransform";
            this.m_sRenderCommand[1] = n11;
            this.m_sRenderCommand[2] = n12;
            this.m_sRenderCommand[3] = n21;
            this.m_sRenderCommand[4] = n22;
            this.m_sRenderCommand[5] = n31;
            this.m_sRenderCommand[6] = n32;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 7);
        },
        transform: function(n11, n12, n21, n22, n31, n32) {
            this.m_sRenderCommand[0] = "transform";
            this.m_sRenderCommand[1] = n11;
            this.m_sRenderCommand[2] = n12;
            this.m_sRenderCommand[3] = n21;
            this.m_sRenderCommand[4] = n22;
            this.m_sRenderCommand[5] = n31;
            this.m_sRenderCommand[6] = n32;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 7);
        },
        rotate: function(angle) {
            this.m_sRenderCommand[0] = "rotate";
            this.m_sRenderCommand[1] = angle;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 2);
        },
        scale: function(x, y) {
            this.m_sRenderCommand[0] = "scale";
            this.m_sRenderCommand[1] = x;
            this.m_sRenderCommand[2] = y;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 3);
        },
        arcTo: function(x1, y1, x2, y2, r) {
            this.m_sRenderCommand[0] = "arcTo";
            this.m_sRenderCommand[1] = x1;
            this.m_sRenderCommand[2] = y1;
            this.m_sRenderCommand[3] = x2;
            this.m_sRenderCommand[4] = y2;
            this.m_sRenderCommand[5] = r;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 6);
        },
        arc: function(x, y, r, sA, eA, b) {
            this.m_sRenderCommand[0] = "arc";
            this.m_sRenderCommand[1] = x;
            this.m_sRenderCommand[2] = y;
            this.m_sRenderCommand[3] = r;
            this.m_sRenderCommand[4] = sA;
            this.m_sRenderCommand[5] = eA;
            this.m_sRenderCommand[6] = b;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 7);
        },
        lineTo: function(x, y) {
            this.m_sRenderCommand[0] = "lineTo";
            this.m_sRenderCommand[1] = x;
            this.m_sRenderCommand[2] = y;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 3);
        },
        closePath: function() {
            this.m_sRenderCommand[0] = "closePath";
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 1);
        },
        moveTo: function(x, y) {
            this.m_sRenderCommand[0] = "moveTo";
            this.m_sRenderCommand[1] = x;
            this.m_sRenderCommand[2] = y;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 3);
        },
        stroke: function() {
            this.m_sRenderCommand[0] = "stroke";
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 1);
        },
        fill: function() {
            this.m_sRenderCommand[0] = "fill";
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 1);
        },
        strokeRect: function(x, y, w, h) {
            this.m_sRenderCommand[0] = "strokeRect";
            this.m_sRenderCommand[1] = x;
            this.m_sRenderCommand[2] = y;
            this.m_sRenderCommand[3] = w;
            this.m_sRenderCommand[4] = h;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 5);
        },
        rect: function(x, y, w, h) {
            this.m_sRenderCommand[0] = "rect";
            this.m_sRenderCommand[1] = x;
            this.m_sRenderCommand[2] = y;
            this.m_sRenderCommand[3] = w;
            this.m_sRenderCommand[4] = h;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 5);
        },
        clip: function() {
            this.m_sRenderCommand[0] = "clip";
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 1);
        },
        beginPath: function() {
            this.m_sRenderCommand[0] = "beginPath";
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 1);
        },
        restore: function() {
            this.m_sRenderCommand[0] = "restore";
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 1);
        },
        save: function() {
            this.m_sRenderCommand[0] = "save";
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 1);
        },
        translate: function(x, y) {
            this.m_sRenderCommand[0] = "translate";
            this.m_sRenderCommand[1] = x;
            this.m_sRenderCommand[2] = y;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 3);
        },
        fillRect: function(x, y, w, h) {
            this.m_sRenderCommand[0] = "fillRect";
            this.m_sRenderCommand[1] = x;
            this.m_sRenderCommand[2] = y;
            this.m_sRenderCommand[3] = w;
            this.m_sRenderCommand[4] = h;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 5);
        },
        clearRect: function(x, y, w, h) {
            if (this.m_bFakeCanvas == false) {
                this.m_sRenderCommand[0] = "clearRect";
                this.m_sRenderCommand[1] = x;
                this.m_sRenderCommand[2] = y;
                this.m_sRenderCommand[3] = w;
                this.m_sRenderCommand[4] = h;
                this.pushCommand(this.m_nID, this.m_sRenderCommand, 5);
            } else 
                this.m_pFakeCanvas.clear();
        },
        clear: function() {
            if (this.m_bFakeCanvas == true)
                this.m_pFakeCanvas.clear();
        },
        setFilter: function(r, g, b, gray) {
            this.m_filter.r = r;
            this.m_filter.g = g;
            this.m_filter.b = b;
            this.m_filter.gray = gray;
            this.m_sRenderCommand[0] = "setFilter";
            this.m_sRenderCommand[1] = this.m_filter.r;
            this.m_sRenderCommand[2] = this.m_filter.g;
            this.m_sRenderCommand[3] = this.m_filter.b;
            this.m_sRenderCommand[4] = this.m_filter.gray;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 5);
        },
        set_filter: function(filter) {
            this.m_sRenderCommand[0] = "setFilter";
            this.m_sRenderCommand[1] = filter.r;
            this.m_sRenderCommand[2] = filter.g;
            this.m_sRenderCommand[3] = filter.b;
            this.m_sRenderCommand[4] = filter.gray;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 5);
            return this.m_filter = filter;
        },
        get_filter: function() {
            return this.m_filter;
        },
        set_strokeStyle: function(strokeStyle) {
            if (Laya.typeIsString(strokeStyle) == true) {
                this.m_sRenderCommand[0] = "setStrokeStyle";
                this.m_sRenderCommand[1] = strokeStyle;
                this.pushCommand(this.m_nID, this.m_sRenderCommand, 2);
            }
            return this.m_strokeStyle = strokeStyle;
        },
        get_strokeStyle: function() {
            return this.m_strokeStyle;
        },
        set_fillStyle: function(fillStyle) {
            if (Laya.typeIsString(fillStyle) == true) {
                this.m_sRenderCommand[0] = "setFillStyle";
                this.m_sRenderCommand[1] = fillStyle;
                this.pushCommand(this.m_nID, this.m_sRenderCommand, 2);
            } else {
                var nType = 0;
                if (fillStyle.type == "repeat")
                    nType = 0;
                else if (fillStyle.type == "repeat-x")
                    nType = 1;
                else if (fillStyle.type == "repeat-y")
                    nType = 2;
                else if (fillStyle.type == "no-repeat")
                    nType = 3;
                this.m_sRenderCommand[0] = "setFillStylePattern";
                this.m_sRenderCommand[1] = fillStyle.img.id;
                this.m_sRenderCommand[2] = nType;
                this.pushCommand(this.m_nID, this.m_sRenderCommand, 3);
            }
            return this.m_fillStyle = fillStyle;
        },
        get_fillStyle: function() {
            return this.m_fillStyle;
        },
        set_globalAlpha: function(alpha) {
            this.m_sRenderCommand[0] = "setGlobalAlpha";
            this.m_sRenderCommand[1] = alpha;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 2);
            return this.m_globalAlpha = alpha;
        },
        get_globalAlpha: function() {
            return this.m_globalAlpha;
        },
        set_globalCompositeOperation: function(cp) {
            var nBlenType = 0;
            if (cp == "lighter")
                nBlenType = 1;
            this.m_sRenderCommand[0] = "setGlobalCompositeOperation";
            this.m_sRenderCommand[1] = nBlenType;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 2);
            return this.m_globalCompositeOperation = cp;
        },
        get_globalCompositeOperation: function() {
            return this.m_globalCompositeOperation;
        },
        set_textBaseline: function(baseLine) {
            this.m_sRenderCommand[0] = "setTextBaseline";
            this.m_sRenderCommand[1] = baseLine;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 2);
            return this.m_textBaseline = baseLine;
        },
        get_textBaseline: function() {
            return this.m_textBaseline;
        },
        set_textAlign: function(textAlign) {
            this.m_sRenderCommand[0] = "setTextAlign";
            this.m_sRenderCommand[1] = textAlign;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 2);
            return this.m_textAlign = textAlign;
        },
        get_textAlign: function() {
            return this.m_textAlign;
        },
        set_lineWidth: function(lineWidth) {
            this.m_sRenderCommand[0] = "setLineWidth";
            this.m_sRenderCommand[1] = lineWidth;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 2);
            return this.m_lineWidth = lineWidth;
        },
        get_lineWidth: function() {
            return this.m_lineWidth;
        },
        set_lineJoin: function(lineJoin) {
            this.m_sRenderCommand[0] = "setLineJoin";
            this.m_sRenderCommand[1] = lineJoin;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 2);
            return this.m_lineJoin = lineJoin;
        },
        get_lineJoin: function() {
            return this.m_lineJoin;
        },
        set_lineCap: function(lineCap) {
            this.m_sRenderCommand[0] = "setLineCap";
            this.m_sRenderCommand[1] = lineCap;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 2);
            return this.m_lineCap = lineCap;
        },
        get_lineCap: function() {
            return this.m_lineCap;
        },
        set_shadowOffsetY: function(offsetY) {
            this.m_sRenderCommand[0] = "setShadowOffsetY";
            this.m_sRenderCommand[1] = offsetY;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 2);
            return this.m_shadowOffsetY = offsetY;
        },
        get_shadowOffsetY: function() {
            return this.m_shadowOffsetY;
        },
        set_shadowOffsetX: function(offsetX) {
            this.m_sRenderCommand[0] = "setShadowOffsetX";
            this.m_sRenderCommand[1] = offsetX;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 2);
            return this.m_shadowOffsetX = offsetX;
        },
        get_shadowOffsetX: function() {
            return this.m_shadowOffsetX;
        },
        set_shadowBlur: function(blur) {
            this.m_sRenderCommand[0] = "setShadowBlur";
            this.m_sRenderCommand[1] = blur;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 2);
            return this.m_shadowBlur = blur;
        },
        get_shadowBlur: function() {
            return this.m_shadowBlur;
        },
        set_shadowColor: function(color) {
            this.m_sRenderCommand[0] = "setShadowColor";
            this.m_sRenderCommand[1] = color;
            this.pushCommand(this.m_nID, this.m_sRenderCommand, 2);
            return this.m_shadowColor = color;
        },
        get_shadowColor: function() {
            return this.m_shadowColor;
        },
        __class__: laya.flash.FlashContext
    }
    laya.flash.FlashFakeCanvas = function() {
        this.m_sRenderCommands = "";
        this.context = null;
        this.id = 0;
        this.m_nHeight = 0;
        this.m_nWidth = 0;
        this.m_pFlashConch = null;
        this.id = laya.flash.FlashFakeCanvas.ms_nFakeCanvasID++;
        this.m_pFlashConch = laya.flash.LayaFlashConch.getInstance();
        this.m_pFlashConch.m_pFlash.createFakeCanvas(this.id);
    };
    laya.flash.FlashFakeCanvas.__name__ = true;
    laya.flash.FlashFakeCanvas.prototype = {
        attachCommand: function(p_sRenderCommand) {
            this.m_sRenderCommands += p_sRenderCommand + laya.flash.LayaFlashConch.sep4;
        },
        pushCommand: function(strCommand, p_nLen) {
            laya.utils.Method.setArraySize(strCommand, p_nLen);
            this.m_sRenderCommands += strCommand.join(laya.flash.LayaFlashConch.sep5) + laya.flash.LayaFlashConch.sep4;
        },
        commitRenderCommandToFlash: function() {
            if (this.m_sRenderCommands.length > 0) {
                this.m_pFlashConch.m_pFlash.addFakeCanvasRenderCommand(this.id, this.m_sRenderCommands);
                this.m_sRenderCommands = "";
            }
        },
        getContext: function(type) {
            if (this.context == null)
                this.context = new laya.flash.FlashContext(this, true);
            return this.context;
        },
        clear: function() {
            this.m_sRenderCommands = "";
            this.m_pFlashConch.m_pFlash.clearFakeCannvasRenderCommand(this.id);
        },
        setSize: function(w, h) {
            if (this.m_nWidth == w && this.m_nHeight == h)
                return;
            if (this.m_nWidth == 1 && this.m_nHeight == 1)
                return;
            this.m_nWidth = w;
            this.m_nHeight = h;
            this.m_pFlashConch.m_pFlash.setFakeCanvasSize(this.id, this.m_nWidth, this.m_nHeight);
        },
        __class__: laya.flash.FlashFakeCanvas
    }
    laya.flash.FlashImage = function() {
        this.m_sSrc = "";
        this.m_bImage = true;
        this.height = 0;
        this.width = 0;
        this.id = 0;
    };
    laya.flash.FlashImage.__name__ = true;
    laya.flash.FlashImage.prototype = {
        onFlashLoaded: function(w, h) {
            this.width = w;
            this.height = h;
            this.onload();
        },
        onload: function() {},
        getImageData: function(x, y, w, h) {
            return laya.flash.LayaFlashConch.getInstance().m_pFlash.getImageData(this.id, x, y, w, h);
        },
        set_src: function(url) {
            this.id = laya.flash.FlashImage.ms_nImageID++;
            this.m_sSrc = url;
            laya.flash.LayaFlashConch.getInstance().CreateImage(this);
            return this.m_sSrc;
        },
        get_src: function() {
            return this.m_sSrc;
        },
        __class__: laya.flash.FlashImage
    }
    laya.flash.FlashInput = function() {
        this.m_sRegular = "";
        this.m_sType = "text";
        this.m_nMaxLength = 0;
        this.m_sValue = "";
        this.m_nLastKey = 0;
        this.m_sPrevalue = "";
        this.m_fOpacity = 1;
        this.m_nHeight = 0;
        this.m_nWidth = 0;
        this.m_nY = 0;
        this.m_nX = 0;
        this.m_sStyle = "";
        this.m_pFlash = null;
        this.m_pFlash = laya.flash.LayaFlashConch.getInstance().m_pFlash;
        laya.flash.FlashInput.ms_pInput = this;
    };
    laya.flash.FlashInput.__name__ = true;
    laya.flash.FlashInput.prototype = {
        onpropertychange: function(event) {},
        onkeydown: function(event) {},
        oninput: function(event) {},
        setRegular: function(p_sRegular) {
            this.m_sRegular = p_sRegular;
            this.m_pFlash.setInputBoxRegular(p_sRegular);
        },
        setType: function(p_sType) {
            this.m_sType = p_sType;
            this.m_pFlash.setInputBoxType(p_sType);
        },
        setMaxLength: function(p_nMaxLength) {
            this.m_nMaxLength = p_nMaxLength;
            this.m_pFlash.setInputBoxMaxLength(p_nMaxLength);
        },
        paserStyle: function(styleKey, styleValue) {
            if (styleKey == "left")
                this.set_left(Std.parseInt(styleValue));
            else if (styleKey == "top")
                this.set_top(Std.parseInt(styleValue));
            else if (styleKey == "width")
                this.set_width(Std.parseInt(styleValue));
            else if (styleKey == "height")
                this.set_height(Std.parseInt(styleValue));
            else if (styleKey == "font-size")
                this.setFontSize(Std.parseInt(styleValue));
            else if (styleKey == "opacity")
                this.setOpacity(Std.parseFloat(styleValue));
        },
        setStyle: function(style) {
            if (style.length <= 0)
                return;
            this.m_sStyle = style;
            var vString = this.m_sStyle.split(";");
            var nLength = vString.length;
            if (nLength <= 0) {
                var vString1 = this.m_sStyle.split(":");
                if (vString1.length < 2) {
                    console.log("flashInput setStyle error");
                    return;
                }
                this.paserStyle(vString1[0], vString1[1]);
            } else {
                var i = 0;
                while (i < nLength) {
                    var vString2 = vString[i].split(":");
                    if (vString2.length < 2) {
                        console.log("flashInput setStyle error");
                        continue;
                    }
                    this.paserStyle(vString2[0], vString2[1]);
                    i++;
                }
            }
        },
        focus: function() {
            this.m_pFlash.setInputBoxFocus();
        },
        blur: function() {
            this.m_pFlash.setInputBoxBlur();
        },
        set_height: function(height) {
            this.m_nHeight = height;
            this.m_pFlash.setInputBoxHeight(this.m_nHeight);
            return this.m_nHeight;
        },
        get_height: function() {
            return this.m_nHeight;
        },
        set_width: function(width) {
            this.m_nWidth = width;
            this.m_pFlash.setInputBoxWidth(this.m_nWidth);
            return this.m_nWidth;
        },
        get_width: function() {
            return this.m_nWidth;
        },
        setTop: function(top) {
            this.set_top(top);
        },
        set_top: function(top) {
            this.m_nY = top;
            this.m_pFlash.setInputBoxPosY(this.m_nY);
            return this.m_nY;
        },
        get_top: function() {
            return this.m_nY;
        },
        setLeft: function(left) {
            this.set_left(left);
        },
        set_left: function(left) {
            this.m_nX = left;
            this.m_pFlash.setInputBoxPosX(this.m_nX);
            return this.m_nX;
        },
        get_left: function() {
            return this.m_nX;
        },
        setValue: function(value) {
            if (value != null) {
                this.m_sValue = value;
                this.m_pFlash.setInputBoxValue(this.m_sValue);
                return this.m_sValue;
            }
            return null;
        },
        getValue: function() {
            this.m_sValue = this.m_pFlash.getInputBoxValue();
            return this.m_sValue;
        },
        setOpacity: function(opacity) {
            this.m_fOpacity = opacity;
            return this.m_fOpacity;
        },
        setCursorPosition: function(pos) {
            this.m_pFlash.setCursorPosition(pos);
        },
        setSize: function(w, h) {
            this.m_pFlash.setInputBoxSize(w, h);
        },
        setPos: function(left, top) {
            this.m_pFlash.setInputBoxPos(left, top);
        },
        setFontID: function(fontInfo, FontID) {},
        setFontSize: function(fontSize) {
            this.m_pFlash.setInputBoxFontSize(fontSize);
        },
        setColor: function(color) {
            this.m_pFlash.setInputBoxColor(color);
        },
        setScale: function(scalex, scaley) {
            this.m_pFlash.setInputBoxScale(scalex, scaley);
        },
        __class__: laya.flash.FlashInput
    }
    laya.flash.FlashWebSocket = function(url) {
        this.m_nPort = 0;
        this.m_sAddr = "";
        this.m_sUrl = "";
        this.m_nID = 0;
        this.m_pFlash = null;
        this.m_pFlash = laya.flash.LayaFlashConch.getInstance().m_pFlash;
        this.m_nID = laya.utils.Method.random(0, 999999);
        this.m_sUrl = url;
        this.getAddrAndPort(url);
        laya.flash.FlashWebSocket.ms_vSocket.set(this.m_nID, this);
        this.connect();
    };
    laya.flash.FlashWebSocket.__name__ = true;
    laya.flash.FlashWebSocket.onFlashSocketConnected = function(p_nID) {
        var pSocket = laya.flash.FlashWebSocket.ms_vSocket.get(p_nID);
        if (pSocket != null)
            pSocket.onopen("OK");
    }
    laya.flash.FlashWebSocket.onFlashSocketReceived = function(p_nID, p_sMessage) {
        var pSocket = laya.flash.FlashWebSocket.ms_vSocket.get(p_nID);
        if (pSocket != null)
            pSocket.onmessage(p_sMessage);
    }
    laya.flash.FlashWebSocket.onFlashSocketDisconnected = function(p_nID) {
        var pSocket = laya.flash.FlashWebSocket.ms_vSocket.get(p_nID);
        if (pSocket != null)
            pSocket.onclose("onClose");
    }
    laya.flash.FlashWebSocket.onFlashSocketError = function(p_nID, p_sError) {
        var pSocket = laya.flash.FlashWebSocket.ms_vSocket.get(p_nID);
        if (pSocket != null)
            pSocket.onerror(p_sError);
    }
    laya.flash.FlashWebSocket.prototype = {
        onclose: function(event) {
            console.log("FlashWebSocket socket has closed" + Std.string(event));
        },
        onmessage: function(event) {
            console.log("FlashWebSocket received a message=" + Std.string(event));
        },
        onopen: function(event) {
            console.log("FlashWebSocket onopen=" + Std.string(event));
        },
        onerror: function(error) {
            console.log("FlashWebSocket onerror=" + Std.string(error));
        },
        close: function() {
            this.m_pFlash.close(this.m_nID);
        },
        send: function(message) {
            this.m_pFlash.sendMessage(this.m_nID, message);
        },
        connect: function() {
            this.m_pFlash.connect(this.m_nID, this.m_sAddr, this.m_nPort);
        },
        getAddrAndPort: function(url) {
            var vArray = url.split("//");
            if (vArray.length >= 2) {
                var sBuffer = vArray[1];
                var vArray1 = sBuffer.split(":");
                if (vArray1.length >= 2) {
                    this.m_sAddr = vArray1[0];
                    this.m_nPort = Laya.parseInt(vArray1[1]);
                }
            }
        },
        __class__: laya.flash.FlashWebSocket
    }
    laya.flash.LayaFlashConch = function() {
        this.m_nRenderCommandsIndex = 0;
        this.m_vRenderCommands = null;
        this.m_pFlash = null;
        this.m_nImageid = 0;
        this.m_vDicImage = null;
        this.m_nCurrentCanvsID = 0;
        this.m_bCreateOK = false;
        this.m_nCount = 0;
        this.m_vRenderCommands = new Array();
        this.m_vDicImage = new haxe.ds.IntMap();
    };
    laya.flash.LayaFlashConch.__name__ = true;
    laya.flash.LayaFlashConch.getInstance = function() {
        if (laya.flash.LayaFlashConch.ms_pLayaFlashConch == null)
            laya.flash.LayaFlashConch.ms_pLayaFlashConch = new laya.flash.LayaFlashConch();
        return laya.flash.LayaFlashConch.ms_pLayaFlashConch;
    }
    laya.flash.LayaFlashConch.prototype = {
        update: function() {
            if (this.m_bCreateOK == true) {
                Laya.window.loop();
                laya.utils.Method.setArraySize(this.m_vRenderCommands, this.m_nRenderCommandsIndex);
                var sRenderCommad = this.m_vRenderCommands.join(laya.flash.LayaFlashConch.sep4);
                this.m_pFlash.commitRenderStream(sRenderCommad, 0);
                this.m_nRenderCommandsIndex = 0;
            }
        },
        attachCommand: function(strCommand, p_nLen) {
            var _g = 0;
            while (_g < p_nLen) {
                var i = _g++;
                this.m_vRenderCommands[this.m_nRenderCommandsIndex++] = strCommand[i];
            }
        },
        pushCommand: function(canvasID, strCommand, p_nLen, p_bCheckCanvas) {
            if (p_bCheckCanvas == null)
                p_bCheckCanvas = true;
            if (p_bCheckCanvas == true) {
                if (this.m_nCurrentCanvsID != canvasID) {
                    this.m_nCurrentCanvsID = canvasID;
                    this.m_vRenderCommands[this.m_nRenderCommandsIndex++] = "changCanvas" + laya.flash.LayaFlashConch.sep5 + canvasID;
                }
            }
            laya.utils.Method.setArraySize(strCommand, p_nLen);
            this.m_vRenderCommands[this.m_nRenderCommandsIndex++] = strCommand.join(laya.flash.LayaFlashConch.sep5);
        },
        createOK: function() {
            this.m_bCreateOK = true;
            this.m_pFlash.startLayaRender(true);
            this.m_pFlash.SetEfficiencyViewType(0);
            this.m_pFlash.setFlashMenuOption("中娱在线 荣誉出品", "http://bbs.lr.laya8.com");
            Laya.start();
        },
        createSocket: function(url) {
            return new laya.flash.FlashWebSocket(url);
        },
        enable: function(flashUrl, appendTo) {
            if (this.checkFlashVersion() == false)
                return;
            appendTo = Laya.jdocument.body;
            Laya.jdocument._preCreateElement_ = Laya.jdocument.createElement;
            Laya.jdocument.createElement = function(name) {
                if (name == "img")
                    return new laya.flash.FlashImage();
                else if (name == "canvas")
                    return new laya.flash.FlashCanvas();
                else if (name == "fakeCanvas")
                    return new laya.flash.FlashFakeCanvas();
                else if (name == "audio")
                    return new laya.flash.FlashAudio();
                else if (name == "input")
                    return new laya.flash.FlashInput();
                else 
                    return Laya.jdocument._preCreateElement_(name);
            };
            laya.utils.Method.setField(laya.element.WebSocket, "_createSocket_", $bind(this, this.createSocket));
            this.loadFlash(flashUrl, appendTo);
        },
        OnImgLoadEnd: function(id, url, w, h) {
            var pImage = this.m_vDicImage.get(id);
            if (pImage != null)
                pImage.onFlashLoaded(w, h);
            else 
                Laya.alert("OnImgLoadEnd error");
        },
        CreateImage: function(p_pImage) {
            this.m_vDicImage.set(p_pImage.id, p_pImage);
            this.m_pFlash.CreateImage(p_pImage.id, p_pImage.m_sSrc);
        },
        checkFlashVersion: function() {
            if (this.getFlashVersionInt() < 11.0) {
                if (Laya.jwindow.location.href == "http://upload2.fenbei.com/music/MusicFileUpload2.aspx") {
                    Laya.jdocument.body.innerHTML += "<div style='width:auto;height:50px;line-height:50px;color:#fff;text-align:center;margin:400px 0 0 0;'>您的Flash播放器版本过低，为了能够正常使用，请下载最新版本的Adobe Flash Player</div>";
                    Laya.jdocument.body.innerHTML += "<div style='width:auto;text-align:center;'><a id=\"adobelink\" style=\"color:orange;\"target=\"_blank\" href='http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash'>点此此处下载</a></div>";
                } else {
                    Laya.jdocument.body.innerHTML += "<div style='width:auto;height:50px;line-height:50px;color:#fff;text-align:center;margin:400px 0 0 0;'>您的Flash播放器版本过低，为了能够正常使用，请下载最新版本的Adobe Flash Player</div>";
                    Laya.jdocument.body.innerHTML += "<div style='width:auto;text-align:center;'><a id=\"adobelink\" style=\"color:orange;\"target=\"_blank\" href='http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash'>点此此处下载</a></div>";
                }
                Laya.jdocument.execCommand("stop");
                return false;
            }
            return true;
        },
        getFlashVersionInt: function() {
            var sVersion = this.getFlashVersion();
            if (sVersion != null && sVersion.length > 0) {
                var fVersion = Std.parseFloat(this.getFlashVersion());
                return fVersion;
            } else {
                Laya.alert("获取flash player版本号错误");
                return 0;
            }
        },
        getFlashVersion: function() {
            var sVersion = "";
            var p = Laya.jwindow.navigator.plugins;
            if (p != null && p.length > 0) {
                var i = 0;
                while (i < p.length) {
                    if (p[i].name.indexOf("Shockwave Flash")>-1) {
                        sVersion = p[i].description.split("Shockwave Flash")[1];
                        break;
                    }
                    i++;
                }
            } else if (Laya.jwindow.ActiveXObject) {
                var j = 13;
                while (j >= 6) {
                    var fl = Laya["eval"]("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + j + "');");
                    if (fl) {
                        sVersion = j + ".0";
                        break;
                    }
                    j--;
                }
            }
            return sVersion;
        },
        loadFlash: function(flashUrl, appendTo) {
            var id = "laya_falsh_" + this.m_nCount++;
            var txt = "<div id=\"LAYABROWSER\" style=\"position:absolute;left:0px;top:0px;width:100%;height:100%;\"><object type=\"application/x-shockwave-flash\" data=\"" + flashUrl + "\" id=\"" + id + "\" " + "style=\"position:absolute;left:0px;top:0px;width:100%;height:100%;\">" + "<param name=\"movie\" value=\"" + flashUrl + "\" />" + "<param name=\"wmode\" value=\"direct\"/>" + "<param name=\"quality\" value=\"high\"/>" + "<param name=\"bgcolor\" value=\"#FFFFFF\" />" + "<param name=\"allowScriptAccess\" value=\"always\"/>" + "<param name=\"allowFullScreen\" value=\"false\"/>" + "<p>" + "\tEither scripts and active content are not permitted to run or Adobe Flash Player version" + "\t11.1.0 or greater is not installed." + "</p>" + "<a href=\"http://www.adobe.com/go/getflashplayer\">" + "\t<img src=\"http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif\" alt=\"Get Adobe Flash Player\" />" + "</a>" + "<p>no flash</p>" + "</object></div>";
            appendTo.innerHTML += txt;
            this.m_pFlash = Laya.jdocument.getElementById(id);
            Laya.window._webWindow_ = Laya.jdocument.getElementById("LAYABROWSER");
            return this.m_pFlash;
        },
        __class__: laya.flash.LayaFlashConch
    }
    laya.io = {}
    laya.io.Ajax = function() {};
    laya.io.Ajax.__name__ = true;
    laya.io.Ajax.onJSONDone = function(callbackFn, response, onerr) {
        if (response == null) {
            onerr();
            return;
        }
        callbackFn(response);
    }
    laya.io.Ajax.GetJSONInBrowser = function(url, callbackFn, splitChar, onerr) {
        if (splitChar == null)
            splitChar = "&";
        var response;
        var jsoncb = function(args) {
            response = args;
        };
        var tm = "";
        if (callbackFn) {
            tm = Laya.CurTime + "";
            Laya.jwindow["layacallback" + tm] = jsoncb;
        }
        var script = Laya.jdocument.createElement("script");
        script.type = "text/javascript";
        if (onerr)
            script.onerror = onerr;
        else 
            script.onerror = callbackFn;
        script.onload = script.onreadystatechange = function(e, isAbort) {
            var reg = new laya.utils.LaRegExp("loaded|complete");
            if (isAbort ||!script.readyState || reg.test(Std.string(script.readyState) + "")) {
                script.onload = script.onreadystatechange = null;
                if (script.parentNode != null) {}
                if (!isAbort)
                    laya.io.Ajax.onJSONDone(callbackFn, response, script.onerror);
            }
        };
        script.src = url + (tm != "" ? splitChar + "callback=layacallback" + tm : "");
        Laya.jdocument.getElementsByTagName("head")[0].appendChild(script);
    }
    laya.io.Ajax.GetJSONInApp = function(url, callbackFn, splitChar, onerr) {
        if (splitChar == null)
            splitChar = "&";
        var response = "";
        var tm = "";
        if (callbackFn) {
            tm = Laya.CurTime + "";
            Laya.jwindow["layacallback" + tm] = function(args) {
                response = args;
            };
        }
        var nurl = url + (tm != "" ? splitChar + "callback=layacallback" + tm : "");
        Laya.jwindow.downloadfile(nurl, true, function(data) {
            console.log("getJson onload:" + data);
            Laya["eval"](data);
            laya.io.Ajax.onJSONDone(callbackFn, response, null);
        }, function() {
            console.log("getjson error");
            laya.io.Ajax.onJSONDone(null, null, onerr ? onerr : callbackFn);
        });
    }
    laya.io.Ajax.GetJSON = function(url, callbackFn, splitChar, onerr) {
        if (splitChar == null)
            splitChar = "&";
        if (!Laya._ISAPP_)
            return laya.io.Ajax.GetJSONInBrowser(url, callbackFn, splitChar, onerr);
        else 
            return laya.io.Ajax.GetJSONInApp(url, callbackFn, splitChar, onerr);
    }
    laya.io.Ajax.prototype = {
        __class__: laya.io.Ajax
    }
    laya.io.File = function(url, type, callBack) {
        this._activeTime_ = 0;
        this._inTemporaryFiles = 0;
        this._id = 0;
        this._ref = 0;
        this._id=++laya.io.File._COUNTS_;
        this._data = null;
        this._state = 0;
        this._callBackArray = [];
        if (callBack != null)
            this._callBackArray.push(callBack);
        this._url = laya.io.File._formatUrl_(url);
        this._fileType = laya.io.File._toFileType_(type);
        this._xpath = laya.utils.Method.getPath(this._url);
        this._private_ = {};
    };
    laya.io.File.__name__ = true;
    laya.io.File._instance_ = function(url, type, callBack, downloadNow) {
        if (downloadNow == null)
            downloadNow = true;
        return laya.io.FileFactory.load(url, type, callBack, downloadNow);
    }
    laya.io.File._find_ = function(url) {
        return laya.io.FileFactory.find(url);
    }
    laya.io.File._toFileType_ = function(type) {
        if (Laya.istype(type, "string")) {
            var _g = type.split("/")[0];
            switch (_g) {
            case laya.io.File.FILETYPE_TEXT_MERGE_STR:
                return laya.io.File.FILETYPE_TEXT_MERGE;
            case laya.io.File.FILETYPE_IMAGE_STR:
                return laya.io.File.FILETYPE_IMAGE;
            case laya.io.File.FILETYPE_TEXT_STR:
                return laya.io.File.FILETYPE_TEXT;
            default:
                return laya.io.File.FILETYPE_TEXT;
            }
        }
        return type;
    }
    laya.io.File._formatUrl_ = function(fileName, basePath) {
        return laya.utils.Method.formatUrl(fileName, basePath);
    }
    laya.io.File.OpenFile = function(fileType, open_save) {
        if (Laya.jwindow.external != null && Laya.jwindow.external.isIEConche)
            return Laya.jwindow.external.choiceFile(fileType, open_save);
        return null;
    }
    laya.io.File.SaveToTemporaryFiles = function(url, data) {
        if (Laya._ISAPP_)
            return true;
        return false;
    }
    laya.io.File.LoadFromeTemporaryFiles = function(url) {
        if (Laya._ISAPP_) {
            var filename = Laya.jwindow.appCache.url2Local(url);
            console.log("*****************************LoadFromeTemporaryFiles:" + url + "\n" + filename);
            return Laya.conch.readFileSync(filename, "utf8");
        }
        return "";
    }
    laya.io.File.prototype = {
        toString: function() {
            return "url:" + this.getUrl() + " " + (this.isLoaded() ? "loaded" : "loading");
        },
        toFileImg: function() {
            return null;
        },
        __disposeLoaded__: function() {
            this._state = laya.io.File.LOAD_STATE_LOADED;
            if (this._callBackArray.length > 0) {
                var _g1 = 0, _g = this._callBackArray.length;
                while (_g1 < _g) {
                    var i = _g1++;
                    this._callBackArray[i].onload(this, this._callBackArray[i]);
                }
                this._callBackArray = [];
            }
        },
        getPath: function() {
            return this._xpath;
        },
        getUrl: function() {
            return this._url;
        },
        getData: function() {
            this._activeTime_ = Laya.window.updateTime;
            if (this._data == null && this._inTemporaryFiles > 0)
                this._data = laya.io.File.LoadFromeTemporaryFiles(this.getUrl());
            return this._data;
        },
        setData: function(txt) {
            this._data = txt;
            this._activeTime_ = Laya.window.updateTime;
        },
        reload: function() {
            var _g = this;
            if (this._state != 0)
                return;
            this._state = laya.io.File.LOAD_STATE_LOADING;
            laya.io.FileFactory._LOADINGCOUNTS_++;
            if (Laya._ISAPP_) {
                var file = Laya.conch.createFile(this._url);
                var fileRead = Laya.conch.createFileReader();
                fileRead.onload = function() {
                    var value = fileRead.result;
                    _g._data = value;
                    _g._onload_(value);
                };
                fileRead.onerror = function() {
                    _g.onerror(fileRead.error);
                };
                fileRead.readAsText(file);
                return;
            }
            if (this._url.indexOf("file://") == 0) {
                if (Laya.jwindow.external && Laya.jwindow.external.isIEConche) {
                    var value = new String(Laya.jwindow.external.readText(this._url));
                    this._data = value;
                    this._onload_(value);
                }
                return null;
            }
            var file = new laya.io.HttpRemote();
            file.onload = function(value) {
                _g._data = value;
                _g._onload_(value);
            };
            file.onerror = function(value) {
                _g.onerror(value);
            };
            file.open(this._url + (Laya.setup.version != null&&!Laya._ISAPP_ ? "?version=" + Laya.setup.version : ""));
            return null;
        },
        checkReleaseData: function(tm) {
            if (this._data == null || this._ref > 0 || this._inTemporaryFiles > 3 || tm - this._activeTime_ < 5000)
                return false;
            this._inTemporaryFiles++;
            if (laya.io.File.SaveToTemporaryFiles(this.getUrl(), this._data))
                this._data = null;
            return true;
        },
        'use': function() {
            if (this._state == 0)
                this.reload();
            return this._state == laya.io.File.LOAD_STATE_LOADED;
        },
        pushCallBack: function(callBack) {
            if (callBack != null)
                this._callBackArray.push(callBack);
        },
        isLoaded: function() {
            return this._state == laya.io.File.LOAD_STATE_LOADED;
        },
        getState: function() {
            return this._state;
        },
        onerror: function(e) {
            var _g = this;
            console.log("file load err:" + e + " " + this.toString());
            this._state = laya.io.File.LOAD_STATE_ERR;
            laya.io.FileFactory._LOADINGCOUNTS_--;
            Laya.window.addTimer(function() {
                _g._state = 0;
                _g.reload();
                return false;
            }, 4000, 1);
        },
        _onload_: function(e) {
            laya.io.FileFactory.__loadedfiles__.push(this);
        },
        __endload__: function() {
            laya.io.FileFactory._LOADINGCOUNTS_--;
            laya.io.FileFactory.checkLoadComplete();
            this.__disposeLoaded__();
        },
        getRef: function() {
            return this._ref;
        },
        subRef: function() {
            if (this._ref > 0)
                this._ref--;
            else 
                console.log("file subref err:" + this.getUrl());
        },
        addRef: function() {
            this._ref++;
        },
        __class__: laya.io.File
    }
    laya.utils.StringMapArray = function() {
        this._data_ = [];
    };
    laya.utils.StringMapArray.__name__ = true;
    laya.utils.StringMapArray.prototype = {
        clear: function() {
            this._data_ = [];
        },
        size: function() {
            return this._data_.length;
        },
        toDataArray: function() {
            return this._data_;
        },
        toKeyArray: function() {
            return this._data_.__toKeyArray__();
        },
        remove: function(key) {
            var pre = this.get(key);
            if (pre == null)
                return;
            var index = laya.utils.Method.inArray(pre, this._data_);
            if (index < 0)
                Laya["debugger"]();
            else 
                this._data_.splice(index, 1);
            this._data_.__removeKeyElement__("$" + key);
        },
        set: function(key, d) {
            var pre = this.get(key);
            if (pre == null)
                this._data_.push(d);
            else {
                var index = laya.utils.Method.inArray(pre, this._data_);
                if (index < 0)
                    Laya["debugger"]();
                this._data_[index] = d;
            }
            this._data_["$" + key] = d;
        },
        get: function(key) {
            return this._data_["$" + key];
        },
        __class__: laya.utils.StringMapArray
    }
    laya.io.FileFactory = function() {};
    laya.io.FileFactory.__name__ = true;
    laya.io.FileFactory.setVrFile = function(fileName, fileNode) {
        laya.io.FileFactory._vrfiles.set(fileName, fileNode);
    }
    laya.io.FileFactory.getVrFile = function(fileName) {
        return laya.io.FileFactory._vrfiles.get(fileName);
    }
    laya.io.FileFactory.__update__ = function() {
        var tm0 = Laya.window.updateTime;
        if (laya.io.FileFactory.__loadedfiles__.length > 0)
            while (laya.io.FileFactory.__loadedfiles__.length > 0) {
                var file = laya.io.FileFactory.__loadedfiles__.pop();
                var tm = laya.utils.Method.getCurTime();
                if (!file._state == laya.io.File.LOAD_STATE_ERR) {
                    file.reload();
                    continue;
                }
                file.__endload__();
                if (laya.utils.Method.getCurTime() - tm > 100)
                    console.log("***************delay=======:" + (laya.utils.Method.getCurTime() - tm) + " " + file.getUrl());
                    if (laya.utils.Method.getCurTime() - tm0 > Laya.setup.maxUpdateDelayWithFile)
                        break;
            }
        var file = laya.io.FileFactory._files.toDataArray()[laya.io.FileFactory._precheckFilesIndex_%laya.io.FileFactory._files.size()];
        if (file != null)
            file.checkReleaseData(tm0);
        laya.io.FileFactory._precheckFilesIndex_++;
    }
    laya.io.FileFactory.load = function(fileName, type, callBack, downloadNow) {
        if (downloadNow == null)
            downloadNow = true;
        fileName = laya.io.File._formatUrl_(fileName);
        var o = laya.io.FileFactory._files.get(fileName);
        if (o != null) {
            if (callBack != null) {
                if (o.isLoaded())
                    callBack.onload(o, callBack);
                else 
                    o.pushCallBack(callBack);
            }
            if ((callBack == null || callBack.preload != false) && o.getState() == 0 && downloadNow)
                o.reload();
            return o;
        }
        var t = laya.io.File._toFileType_(type);
        switch (t) {
        case laya.io.File.FILETYPE_IMAGE:
            o = new laya.io.FileImg(fileName, t, callBack);
            break;
        default:
            o = new laya.io.File(fileName, t, callBack);
        }
        laya.io.FileFactory._files.set(fileName, o);
        if ((callBack == null || callBack.preload != false) && downloadNow)
            o.reload();
        return o;
    }
    laya.io.FileFactory.find = function(url) {
        url = laya.io.File._formatUrl_(url);
        return laya.io.FileFactory._files.get(url);
    }
    laya.io.FileFactory.checkLoadComplete = function() {
        if (laya.io.FileFactory._LOADINGCOUNTS_ < 0)
            console.log("!!!!!!!!!!!!!!checkLoadComplete err:======:" + laya.io.FileFactory._LOADINGCOUNTS_);
        if (laya.io.FileFactory._LOADINGCOUNTS_ < 1)
            Laya.document.dispatchEvent(null, "fileloadcomplete");
        return laya.io.FileFactory._LOADINGCOUNTS_;
    }
    laya.io.FileFactory.GetLoadingFiles = function() {
        var files0 = laya.io.FileFactory._files.toDataArray();
        var files = [];
        var _g1 = 0, _g = laya.io.FileFactory._files.size();
        while (_g1 < _g) {
            var i = _g1++;
            var file = files0[i];
            if (file != null && file.getState() == laya.io.File.LOAD_STATE_LOADING)
                files.push(file);
        }
        return files;
    }
    laya.io.FileFactory.WriteTextFile = function(fileName, txt, callBack) {
        var name = fileName;
        var file = new laya.io.HttpRemote();
        var btsz = 0;
        var _g1 = 0, _g = txt.length;
        while (_g1 < _g) {
            var i = _g1++;
            var c = txt.charAt(i);
            if (c == "<" || c == "\"" || c == "'" || c == ">")
                btsz++;
        }
        return file.post(name, "~~~~~~~~~LAYA.SAVEFILE.START~~~~~~~~~[" + fileName + "]#" + btsz + "#" + txt + "~~~~~~~~~LAYA.SAVEFILE.END~~~~~~~~~", callBack, false);
    }
    laya.io.FileFactory.prototype = {
        __class__: laya.io.FileFactory
    }
    laya.io.FileImg = function(url, type, callBack) {
        this._pY = 1;
        this._pX = 1;
        this.height = 0;
        this.width = 0;
        this.translateY = null;
        this.translateX = null;
        this.image = null;
        laya.io.File.call(this, url, type, callBack);
        var withfile = laya.io.FileFactory.getVrFile(this._url);
        if (withfile != null) {
            if (withfile._withdata_ != null) {
                if (Laya.typeIsString(withfile._withdata_))
                    withfile._withdata_ = Laya["eval"]("({" + Std.string(withfile._withdata_) + "})");
                this.setExtData(withfile._withdata_);
            }
            var withimg;
            withimg = laya.io.File._find_(withfile._with_);
            if (withimg != null && withimg.image != null) {
                laya.io.FileFactory._LOADINGCOUNTS_++;
                this._onload_(this.image = withimg.image);
            }
        } else {
            var str = url.toLowerCase();
            if (str.indexOf(".jng") < 0 && str.indexOf(".png") < 0 && str.indexOf(".jpg") < 0)
                Laya["debugger"]();
        }
    };
    laya.io.FileImg.__name__ = true;
    laya.io.FileImg.__super__ = laya.io.File;
    laya.io.FileImg.prototype = $extend(laya.io.File.prototype, {
        toString: function() {
            return "url:" + this.getUrl() + " " + (this.isLoaded() ? "loaded" : "loading") + " width:" + this.width + " height:" + this.height;
        },
        toFileImg: function() {
            return this;
        },
        reload: function() {
            var _g = this;
            if (this._state != 0)
                return;
            this._state = laya.io.File.LOAD_STATE_LOADING;
            laya.io.FileFactory._LOADINGCOUNTS_++;
            var withfile = laya.io.FileFactory.getVrFile(this._url);
            if (withfile != null) {
                laya.io.File._instance_(withfile._with_, "image", {
                    onload: function(file) {
                        _g._onload_(_g.image = file.image);
                    }
                });
                return;
            }
            var img;
            img = this.image = document.createElement("img");
            img.onload = function() {
                if (Laya._ISHTML5_ && _g._url.indexOf(".jng") > 0)
                    _g.image = img = laya.display.method.GraphMethod._JpgToPng(img);
                laya.io.FileFactory.__loadedfiles__.push(_g);
            };
            img.onerror = function(errId) {
                _g.onerror(errId);
            };
            var url = this._url + (Laya.setup.version != null&&!Laya._ISAPP_ ? "?version=" + Laya.setup.version : "");
            if (Laya._ISFLASH_)
                img.set_src(url);
            else 
                img.src = url;
        },
        setExtData: function(dt) {
            if (dt == null) {
                console.log("setExtData err");
                return;
            }
            this.dataExt = new laya.utils.ImgCell(dt.left == null ? 0 : dt.left, dt.top == 0 ? 0 : dt.top, dt.width, dt.height, dt.ox == null ? 0 : dt.ox, dt.oy == null ? 0 : dt.oy);
            this.width = this.dataExt.originalWidth = dt.owidth != null ? dt.owidth : dt.width;
            this.height = this.dataExt.originalHeight = dt.oheight != null ? dt.oheight : dt.height;
        },
        _onload_: function(e) {
            this._state = laya.io.File.LOAD_STATE_LOADED;
            if (this.dataExt == null) {
                this.width = e.width;
                this.height = e.height;
                this.dataExt = new laya.utils.ImgCell(0, 0, this.width, this.height, 0, 0);
            } else {
                var _this = this;
                _this.drawImage = _this.drawImage_ex;
                this.width = this.dataExt.originalWidth;
                this.height = this.dataExt.originalHeight;
                this._pX = this.dataExt.width / this.dataExt.originalWidth;
                this._pY = this.dataExt.height / this.dataExt.originalHeight;
            }
            laya.io.FileFactory._LOADINGCOUNTS_--;
            laya.io.FileFactory.checkLoadComplete();
            this.__disposeLoaded__();
        },
        checkReleaseData: function(tm) {
            return false;
        },
        __endload__: function() {
            this._onload_(this.image);
        },
        toDataURL: function() {
            if (this.image == null) {
                console.log("image toDataURL err:" + this.getUrl());
                return null;
            }
            if (laya.io.FileImg._canvas_toDataURL == null)
                laya.io.FileImg._canvas_toDataURL = new laya.display.Canvas();
            laya.io.FileImg._canvas_toDataURL.setSize(this.width, this.height);
            laya.io.FileImg._canvas_toDataURL.context.drawImage3(this.image, 0, 0);
            var url = laya.io.FileImg._canvas_toDataURL.toDataURL("image/jpeg");
            laya.io.FileImg._canvas_toDataURL.setSize(0, 0);
            console.log("--------:" + this.getUrl() + " " + url.length);
            return url;
        },
        drawImage_ex: function(context, x, y, w, h) {
            if (!this.isLoaded())
                return;
            var px = this._pX * w / this.dataExt.originalWidth;
            var py = this._pY * h / this.dataExt.originalHeight;
            x = x + this.dataExt.offX * px * 2;
            y = y + this.dataExt.offY * py * 2;
            w = Laya.Round(w * this._pX);
            h = Laya.Round(h * this._pY);
            context.drawImage9(this.image, this.dataExt.left, this.dataExt.top, this.dataExt.width, this.dataExt.height, x, y, w, h);
        },
        drawImage: function(context, x, y, w, h) {
            if (this.isLoaded())
                context.drawImage5(this.image, x, y, w, h);
        },
        __class__: laya.io.FileImg
    });
    laya.io.HttpRemote = function() {
        this._req = laya.io.HttpRemote.createXMLHttpRequest();
        if (this._req == null)
            return;
    };
    laya.io.HttpRemote.__name__ = true;
    laya.io.HttpRemote.createXMLHttpRequest = function() {
        return null;
    }
    laya.io.HttpRemote.prototype = {
        onRequestHandler: function(_req) {
            if (_req.readyState != 4)
                return;
            if (_req.status == 200) {
                if (this._callBackFunc != null)
                    this._callBackFunc(_req.responseText);
                if (this.onload != null)
                    this.onload(_req.responseText);
            } else if (_req.status == 404) {
                if (this.onerror != null)
                    this.onerror(_req.status);
            } else if (this.onerror != null)
                this.onerror(_req.status);
        },
        getResult: function() {
            return this._req.responseText;
        },
        post: function(ilePath, txt, callBackFunc, isAsync) {
            if (isAsync == null)
                isAsync = true;
            if (!this.open(ilePath, callBackFunc, isAsync, "post"))
                return false;
            try {
                this._req.send(txt);
            } catch (err) {
                Laya.alert("pos err:" + ilePath + " " + Std.string(err));
                return false;
            }
            return true;
        },
        open: function(filePath, callBackFunc, isAsync, requestType) {
            if (requestType == null)
                requestType = "get";
            if (isAsync == null)
                isAsync = true;
            var _g = this;
            this._lastFilePath = filePath;
            this._isAsync = isAsync;
            this._requestType = requestType;
            this._callBackFunc = callBackFunc;
            if (this._req == null)
                return false;
            try {
                this._req.onreadystatechange = function() {
                    _g.onRequestHandler(_g._req);
                };
                var r = this._req.open(requestType, filePath, isAsync);
                if (requestType.toLowerCase() == "get")
                    this._req.send();
                else 
                    console.log("*************no get");
            } catch (err) {
                console.log("*************HttpRemote open err:" + Std.string(err));
                if (this.onerror != null)
                    this.onerror(-1);
                return false;
            }
            return true;
        },
        __class__: laya.io.HttpRemote
    }
    laya.utils.ImgCellTransformation = function() {
        this.flip = 0;
        this.rotate = 0;
        this.offsetY = 0;
        this.offsetX = 0;
        this.scaleY = 1;
        this.scaleX = 1;
    };
    laya.utils.ImgCellTransformation.__name__ = true;
    laya.utils.ImgCellTransformation.prototype = {
        __class__: laya.utils.ImgCellTransformation
    }
    laya.utils.ImgCell = function(x, y, w, h, ox, oy) {
        this.alpha = 1;
        this.left = x;
        this.top = y;
        this.originalWidth = this.width = w;
        this.originalHeight = this.height = h;
        this.offX = ox;
        this.offY = oy;
    };
    laya.utils.ImgCell.__name__ = true;
    laya.utils.ImgCell.prototype = {
        createTran: function() {
            if (this.transformation == null)
                this.transformation = new laya.utils.ImgCellTransformation();
            return this.transformation;
        },
        __class__: laya.utils.ImgCell
    }
    laya.utils.LayaTimerEvent = function(item, delay, count, starttm, id) {
        this.deleted = false;
        this.item = item;
        this.delay = delay;
        this.count = count;
        this.starttm = starttm;
        this.nextTm = this.starttm + this.delay;
        this.id = id;
    };
    laya.utils.LayaTimerEvent.__name__ = true;
    laya.utils.LayaTimerEvent.prototype = {
        __class__: laya.utils.LayaTimerEvent
    }
    laya.utils.Point = function(_x, _y) {
        this.x = _x;
        this.y = _y;
    };
    laya.utils.Point.__name__ = true;
    laya.utils.Point.prototype = {
        __class__: laya.utils.Point
    }
    laya.utils.URLEX = function(_url) {
        this.url = _url;
        this.path = laya.utils.Method.getPath(_url);
    };
    laya.utils.URLEX.__name__ = true;
    laya.utils.URLEX.prototype = {
        toString: function() {
            return this.url;
        },
        __class__: laya.utils.URLEX
    }
    laya.utils.XmlNode = function(p) {
        this.childNodes = [];
        this.parentNode = p;
    };
    laya.utils.XmlNode.__name__ = true;
    laya.utils.XmlNode.prototype = {
        getValueForKey: function(value) {
            var _g1 = 0, _g = this.childNodes.length;
            while (_g1 < _g) {
                var i = _g1++;
                if (this.childNodes[i].nodeName == "key" && this.childNodes[i].value == value)
                    return this.childNodes[i + 1].value;
            }
            return null;
        },
        getNodeForKey: function(value) {
            var _g1 = 0, _g = this.childNodes.length;
            while (_g1 < _g) {
                var i = _g1++;
                if (this.childNodes[i].nodeName == "key" && this.childNodes[i].value == value)
                    return this.childNodes[i + 1];
            }
            return null;
        },
        getIntegerForKey: function(value) {
            var _g1 = 0, _g = this.childNodes.length;
            while (_g1 < _g) {
                var i = _g1++;
                if (this.childNodes[i].nodeName == "key" && this.childNodes[i].value == value)
                    return Laya.parseInt(this.childNodes[i + 1].value);
            }
            return null;
        },
        __class__: laya.utils.XmlNode
    }
    laya.utils.Xml = function(xml, rootNodeName) {
        this.root = null;
        var start = 0;
        var end = 0;
        var index = 0;
        var parent = null;
        var newnode;
        var words;
        while ((index = xml.indexOf("<", start)) >= 0) {
            if (index > start) {
                if (parent != null)
                    parent.value = laya.utils.LaRegExp.replaceBlankChar(xml.substring(start, index));
                else 
                    console.log("xml err");
            }
            start = index;
            end = xml.indexOf(">", start + 1);
            if (end < 0) {
                console.log("xml err:" + start);
                break;
            }
            words = xml.substring(start + 1, end).split(" ");
            if (words[0].charAt(0) == "/") {
                parent = parent.parentNode;
                start = end + 1;
                continue;
            } else {
                newnode = new laya.utils.XmlNode(parent);
                newnode.nodeName = words[0];
                if (this.root == null && newnode.nodeName == rootNodeName)
                    this.root = newnode;
                if (parent == null || this.root == null) {
                    parent = newnode;
                    start = end + 1;
                    continue;
                }
                parent.childNodes.push(newnode);
                parent = newnode;
                start = end + 1;
            }
        }
    };
    laya.utils.Xml.__name__ = true;
    laya.utils.Xml.prototype = {
        getElementByNodeName: function(name) {
            return this._getElementByNodeName_(name, this.root);
        },
        _getElementByNodeName_: function(name, parent) {
            if (parent == null)
                return null;
            if (parent.nodeName == name)
                return parent;
            var childs = parent.childNodes;
            if (childs == null)
                return null;
            var _g1 = 0, _g = childs.length;
            while (_g1 < _g) {
                var i = _g1++;
                var o = childs[i];
                if (o.nodeName == name)
                    return o;
            }
            var _g1 = 0, _g = childs.length;
            while (_g1 < _g) {
                var i = _g1++;
                var o = childs[i];
                o = this._getElementByNodeName_(name, o);
                if (o != null)
                    return o;
            }
            return null;
        },
        __class__: laya.utils.Xml
    }
    laya.xhtml = {}
    laya.xhtml.HtmlCompileNode = function(p, name, u, _pos) {
        this.pos = _pos;
        this.scripts = [];
        this.nodeName = name;
        this.url = u;
        if (p == null) {
            this.parent = null;
            this.dep = 0;
        } else {
            this.parent = p;
            this.dep = p.dep + 1;
        }
        if (p != null) {
            if (p.childs == null)
                p.childs = [];
            p.childs.push(this);
        }
    };
    laya.xhtml.HtmlCompileNode.__name__ = true;
    laya.xhtml.HtmlCompileNode.prototype = {
        toString: function(strs) {
            this.isNewNode = this.nodeName.substring(0, 3) != "to.";
            var spaceStr = laya.utils.Method.nChar("  ", this.dep);
            if (this.isNewNode) {
                this.nodeName = this.nodeName.substring(0, this.nodeName.length).toLowerCase();
                strs.push("\n" + spaceStr + "_N=_A(_N,\"" + this.nodeName + "\",_BASEURL_);//" + this.pos);
            } else {
                strs.push(spaceStr + " _T.push(_N)");
                this.nodeName = this.nodeName.substring(3, this.nodeName.length);
                if (this.nodeName != "this")
                    strs.push("\n" + spaceStr + "_N=Laya.I(\"" + this.nodeName + "\")");
            }
            if (this.params != null)
                this.addParams(strs);
            if (this.text != null)
                strs.push(spaceStr + " _TX(_N,\"" + this.text + "\")");
            if (this.nodeName == "assembly")
                strs.push(spaceStr + " _N._onAssembly_()");
            if (this.childs != null)
                this.toChilds(strs);
            if (this.isNewNode) {
                if (this.childs != null) {
                    strs.push(spaceStr + " _N.created()");
                    strs.push(spaceStr + " _N=_N.parentNode");
                } else {
                    strs.push(spaceStr + " _N.created()");
                    strs.push(spaceStr + " _N=_N.parentNode");
                }
            } else 
                strs.push(spaceStr + " _N=_T.pop()");
        },
        toChilds: function(strs) {
            if (this.childs == null)
                return;
            var _g1 = 0, _g = this.childs.length;
            while (_g1 < _g) {
                var i = _g1++;
                this.childs[i].toString(strs);
            }
        },
        pushScript: function(txt) {
            this.scripts.push(txt);
        },
        addParams: function(strs) {
            var value, arr, s = 0;
            var rg = new laya.utils.LaRegExp("(\\s*)(\\w+)\\s*(=)\\s*((?:\"[^\"]*\"|'[^']*'))", "g");
            var str = "";
            var classr;
            classr = laya.xhtml.HtmlParse._getClassRegExp_.exec(this.params);
            if (classr != null) {
                str += "_N.set_className('" + classr[1] + "');";
                this.params = this.params.substring(0, classr.index) + this.params.substring(Laya.parseInt(classr.index + classr[0].length), this.params.length);
            }
            var nodeClass = laya.Document.GetNodeRegClass(this.nodeName);
            if (nodeClass == null)
                nodeClass = laya.Document.GetNodeRegClass("div");
            while ((arr = rg.exec(this.params)) != null) {
                value = arr[4];
                var dt = value.substring(1, value.length-1);
                var fnname = arr[2].toLowerCase();
                var fn = laya.utils.Method.getAREG(nodeClass, fnname);
                if (fn == null) {
                    dt = laya.utils.Method._ToNormalText_(dt);
                    str += "_N.set(\"" + fnname + "\",\"" + dt + "\");";
                    continue;
                }
                if (fnname == "style") {
                    str += "_ST=_N.style;" + laya.css.CSSMethod.cssTextToScriptText(dt, this.url.path, "_ST");
                    continue;
                }
                str += "_N." + Std.string(fn.setfname) + "(";
                if (fn.paramdef.length == 1) {
                    if (fnname == "text" && dt.indexOf("_TCACHE[") == 0)
                        str += dt;
                    else {
                        dt = laya.utils.Method.getParamStrByRegClass(fn.paramdef.charAt(0), dt);
                        if (dt.charAt(0) == "\"")
                            str += "\"" + laya.utils.Method._ToNormalText_(dt.substring(1, dt.length-1)) + "\"";
                        else 
                            str += dt;
                    }
                } else {
                    var splitchar = fn.paramdef.charAt(1);
                    var params = dt.split(splitchar);
                    var k = 0, sz = fn.paramdef.length;
                    while (k + k < sz) {
                        var chr = fn.paramdef.charAt(k + k);
                        dt = laya.utils.Method.getParamStrByRegClass(chr, params[k]);
                        if (dt.charAt(0) == "\"")
                            str += "\"" + laya.utils.Method._ToNormalText_(dt.substring(1, dt.length-1)) + "\"";
                        else 
                            str += dt;
                        if (k + k + 1 < sz)
                            str += ",";
                        k++;
                    }
                }
                str += ");";
            }
            if (str.length > 0)
                strs.push(laya.utils.Method.nChar(" ", this.dep + 1) + str);
        },
        __class__: laya.xhtml.HtmlCompileNode
    }
    laya.xhtml.HtmlParse = function() {
        this.id = 0;
        this.id=++laya.xhtml.HtmlParse.__ID__;
    };
    laya.xhtml.HtmlParse.__name__ = true;
    laya.xhtml.HtmlParse.Create = function() {
        return new laya.xhtml.HtmlParse();
    }
    laya.xhtml.HtmlParse.appendText = function(node, txt) {
        if (txt == null || txt.length < 1)
            return;
        if (node.textContent != null || node.childNodes.length > 0) {
            if (node.textContent != null && node.textContent.length > 0) {
                var o = Laya.document.createElement("span");
                node.insert(o, 0);
                o._id_ =- laya.element.Node.__lastid__;
                o.created();
                o.set_text(node.textContent);
            }
            var o = node.appendChild("span");
            o.created();
            o.set_text(txt);
            node.set_text("");
        } else 
            node.appendText(txt);
    }
    laya.xhtml.HtmlParse.getPrekongge = function(text) {
        var count = 0;
        var c;
        var _g1 = 0, _g = text.length;
        while (_g1 < _g) {
            var i = _g1++;
            if ((c = text.charAt(i)) == " " || c == "\n" || c == "\r" || c == "\t")
                count++;
            else 
                break;
        }
        return count;
    }
    laya.xhtml.HtmlParse.prototype = {
        parse: function(text, parent, url, call_back) {
            var _g = this;
            if (text == null)
                return parent;
            if (parent == null)
                parent = Laya.document.body;
            if (url == null)
                this.baseURL = parent.baseURL;
            else 
                this.baseURL = url;
            var pos = laya.xhtml.HtmlParse.getPrekongge(text);
            if (pos > 0)
                text = text.substring(pos);
            if (text.substring(0, 5) != "<html")
                return this.parseSimpleHtml(text, parent);
            text = this._htmlFormal_(text);
            this.bodyHTML = laya.utils.Method.subString(text, "<body", "</body>");
            if (this.bodyHTML != null)
                this.bodyHTML = this.bodyHTML.substring(this.bodyHTML.indexOf(">") + 1, this.bodyHTML.length);
            this.headHTML = laya.utils.Method.subString(text, "<head>", "</head>");
            if (this.headHTML != null && laya.xhtml.HtmlParse._isNormalText_.test(this.headHTML)) {
                var head = Laya.document.head.appendChild("node");
                head.onComplete = function() {
                    if (_g.bodyHTML != null)
                        _g.parseSimpleHtml(_g.bodyHTML, parent);
                    _g.onParseed();
                    if (call_back != null)
                        call_back.call(parent);
                    if (url != null)
                        Laya.document.dispatchEvent(new laya.event.Event("onhtmlparse", url.url));
                    _g.bodyHTML = null;
                };
                head.baseURL = this.baseURL;
                head.set_complete(false);
                this.parseSimpleHtml(this.headHTML, head);
                head.set_complete(true);
                head._checkAllComplete_();
                this.headHTML = null;
                return null;
            } else {
                if (this.bodyHTML == null && this.headHTML == null)
                    this.bodyHTML = text;
                if (this.bodyHTML != null)
                    this.parseSimpleHtml(this.bodyHTML, parent);
                this.onParseed();
                if (call_back != null)
                    call_back.call(parent);
                if (url != null)
                    Laya.document.dispatchEvent(new laya.event.Event("onhtmlparse", url.url));
                this.bodyHTML = null;
            }
            return null;
        },
        onParseed: function() {},
        parseSimpleHtml: function(text, parent) {
            if (text == null)
                return parent;
            var tm = laya.utils.Method.getCurTime();
            if (parent == null)
                parent = Laya.document.body;
            var r = this._toDom_(text, parent);
            return r;
        },
        _toDom_: function(text, parentIn) {
            var parent = parentIn, node = parent;
            if (text.length < 2)
                return parent;
            var i = 0, b = 0, sp, attributesTxt, str, nodeEnd, nodeTree = new Array(), startNode = null, isNewNode = false;
            nodeTree.push(node);
            while (true) {
                if ((b = text.indexOf("<", i)) < 0)
                    break;
                if (i < b && (str = laya.utils.LaRegExp.replaceBlankChar(text.substring(i, b))) != null && str.length > 0)
                    laya.xhtml.HtmlParse.appendText(parent, str);
                if ((i = text.indexOf(">", b)) < 0)
                    break;
                i++;
                if (text.charAt(b + 1) == "/") {
                    if (!((parent._type_ & 2097152) == 2097152))
                        parent.created();
                    parent = nodeTree.pop();
                    continue;
                }
                attributesTxt = (nodeEnd = text.charAt(i-2) == "/") ? text.substring(b + 1, i-2) : text.substring(b + 1, i-1);
                if ((sp = attributesTxt.indexOf(" ")) < 0)
                    sp = attributesTxt.length;
                isNewNode = attributesTxt.substring(0, 3) != "to.";
                node = isNewNode ? this.createNode(attributesTxt.substring(0, sp).toLowerCase(), parent) : this.to_node(attributesTxt.substring(3, sp), parent);
                node._fileOffset_ = b;
                startNode = startNode == null ? node : startNode;
                if (isNewNode && (node._type_ & 1) == 1) {
                    if (node._private_.assembly != null) {
                        if (node._onAssembly_ != null)
                            node._onAssembly_();
                        this.htmlToDomAttributes(node, attributesTxt.substring(sp + 1, attributesTxt.length));
                    } else if (node.nodeName == "wait") {
                        this.htmlToDomAttributes(node, attributesTxt.substring(sp + 1, attributesTxt.length));
                        i = node.parseHtml(text, i);
                        node.created();
                        continue;
                    } else 
                        this.htmlToDomAttributes(node, attributesTxt.substring(sp + 1, attributesTxt.length));
                } else 
                    this.htmlToDomAttributes(node, attributesTxt.substring(sp + 1, attributesTxt.length));
                if (!nodeEnd && node.enableChileNodes()) {
                    nodeTree.push(parent);
                    parent = node;
                } else if (!((node._type_ & 2097152) == 2097152))
                    node.created();
            }
            return startNode;
        },
        setAttribute: function(node, attriName, value) {
            node.set(attriName, value);
        },
        htmlToDomAttributes: function(node, txt) {
            if (txt == null)
                return;
            var value, arr, s = 0;
            var rg = laya.xhtml.HtmlParse._splitAttributes_.ref == 0 ? laya.xhtml.HtmlParse._splitAttributes_: new laya.utils.LaRegExp("(\\s*)(\\w+)\\s*(=)\\s*((?:\"[^\"]*\"|'[^']*'))", "g");
            rg.ref++;
            var classr = laya.xhtml.HtmlParse._getClassRegExp_.exec(txt);
            if (classr != null) {
                node.set_className(classr[1]);
                txt = txt.substring(0, classr.index) + txt.substring(Laya.parseInt(classr.index + classr[0].length), txt.length);
            }
            while ((arr = rg.exec(txt)) != null) {
                value = arr[4];
                this.setAttribute(node, arr[2].toLowerCase(), value.substring(1, value.length-1));
            }
            rg.ref--;
        },
        createNode: function(txt, parent) {
            var o = parent.appendChild(txt);
            if (o == null)
                Laya.debug.alert("node err:" + txt + " " + parent.nodeName);
            o.baseURL = this.baseURL;
            return o;
        },
        to_node: function(txt, parent) {
            switch (txt) {
            case"this":
                return parent;
            case"parent":
                return parent.parentNode;
            case"group":
                return parent.get_group();
            }
            return Laya.I(txt);
        },
        _htmlFormal_: function(text) {
            var ftxt = [], index, eindex;
            while (true) {
                if ((index = text.indexOf("<!--")) < 0)
                    break;
                eindex = text.indexOf("-->", index + 4);
                if (eindex < 0) {
                    text = text.substring(0, index);
                    break;
                }
                if (text.substring(index + 4, index + 8) == "[if ") {
                    var eindex2 = text.indexOf("]", index + 8);
                    var strtmp = text.substring(index + 8, eindex2);
                    var index2 = text.indexOf(">", index + 8);
                    eindex2 = text.indexOf("<![endif]", index2 + 1);
                    if (index2 < 0 || eindex2 < 0) {
                        text = text.substring(0, index);
                        break;
                    }
                    var b = Reflect.field(Laya.jwindow, strtmp);
                    if (b != null && b != false)
                        text = text.substring(0, index) + text.substring(index2 + 1, eindex2) + text.substring(eindex + 3, text.length);
                    else 
                        text = text.substring(0, index) + "<conditionalcomments condition='" + strtmp + "'>" + text.substring(index2 + 1, eindex2) + "</conditionalcomments>" + text.substring(eindex + 3, text.length);
                    continue;
                }
                text = text.substring(0, index) + text.substring(eindex + 3, text.length);
            }
            if (text == null || text == "")
                return "";
            var xtext = new laya.utils.XString(text), data = new laya.utils.XString(), i = 0, type = "", estr = "";
            while (true) {
                if ((index = xtext.search(laya.xhtml.HtmlParse._htmlFormatReg_)) < 0)
                    break;
                type = xtext.substring(index, index + 4);
                estr = Reflect.field(laya.xhtml.HtmlParse._htmlendwords_, type);
                eindex = xtext.indexOf(estr, index + 4);
                if (eindex < 0)
                    eindex = xtext.text.length;
                i = xtext.indexOf(">", index + 4);
                data.text = xtext.substring(i + 1, eindex);
                if (data.text.length > 0) {
                    if (laya.utils.LaRegExp.replaceBlankChar(data.text) != "") {
                        ftxt.push(xtext.substring(0, i));
                        ftxt.push(this.addTextCache(data.text));
                    } else 
                        ftxt.push(xtext.substring(0, eindex));
                } else 
                    ftxt.push(xtext.substring(0, eindex));
                if (eindex == xtext.text.length) {
                    console.log("html Maybe err:" + estr + "\n" + text);
                    break;
                }
                xtext.text = xtext.substring(eindex, xtext.text.length);
            }
            ftxt.push(xtext.text);
            return ftxt.join("");
        },
        addTextCache: function(txt) {
            laya.xhtml.HtmlParse._textcache_.push(txt);
            return " text=\"js:laya.xhtml.HtmlParse._textcache_[" + (laya.xhtml.HtmlParse._textcache_.length-1) + "]\">";
        },
        __class__: laya.xhtml.HtmlParse
    }
    laya.xhtml.HtmlCompile = function() {
        laya.xhtml.HtmlParse.call(this);
    };
    laya.xhtml.HtmlCompile.__name__ = true;
    laya.xhtml.HtmlCompile.createElement = function(p, name, url) {
        var c = Laya.document.createElement(name);
        p.insert(c, p.childNodes.length);
        c.baseURL = url;
        return c;
    }
    laya.xhtml.HtmlCompile._AddCacheText_ = function(txt) {
        laya.xhtml.HtmlParse._textcache_.push(txt);
    }
    laya.xhtml.HtmlCompile.Run = function(text, parent, url, call_back) {
        if (text == null)
            return null;
        var c = new laya.xhtml.HtmlCompile();
        if (!c.compile(text, parent, url, false))
            return null;
        return c.run(parent, url, call_back);
    }
    laya.xhtml.HtmlCompile.CompileMini = function(text, parent, url) {
        if (text == null)
            return null;
        var c = new laya.xhtml.HtmlCompile();
        return c.toFunScript(text, parent, url);
    }
    laya.xhtml.HtmlCompile.__super__ = laya.xhtml.HtmlParse;
    laya.xhtml.HtmlCompile.prototype = $extend(laya.xhtml.HtmlParse.prototype, {
        run: function(parent, url, call_back) {
            var _g = this;
            if (url == null)
                url = parent.baseURL;
            if (this._headfn_ != null) {
                var head = Laya.document.head.appendChild("node");
                head.onComplete = function() {
                    console.log(_g._bodyfn_);
                    if (_g._bodyfn_ != null)
                        _g._bodyfn_(parent, url);
                    _g.onParseed();
                    if (call_back != null)
                        call_back.call(parent);
                    if (url != null)
                        Laya.document.dispatchEvent(new laya.event.Event("onhtmlparse", url.url));
                };
                head.baseURL = url;
                head.set_complete(false);
                this._headfn_(head, url);
                head.set_complete(true);
                head._checkAllComplete_();
                return null;
            } else {
                console.log(this._bodyfn_);
                if (this._bodyfn_ != null)
                    this._bodyfn_(parent, url);
                this.onParseed();
                if (call_back != null)
                    call_back.call(parent);
                if (url != null)
                    Laya.document.dispatchEvent(new laya.event.Event("onhtmlparse", url.url));
            }
            return null;
        },
        compile: function(text, parent, url, saveToCahce) {
            if (saveToCahce == null)
                saveToCahce = true;
            this._headfn_ = this._bodyfn_ = null;
            if (text == null)
                return null;
            var pos = laya.xhtml.HtmlParse.getPrekongge(text);
            if (pos > 0)
                text = text.substring(pos);
            if (text.substring(0, 5) != "<html") {
                this.bodyHTML = this.toFunScript(text, parent, url);
                if (this.bodyHTML == null)
                    return false;
                this._bodyfn_ = Laya["eval"]("(" + this.bodyHTML + ")");
                this.bodyHTML = null;
                return true;
            }
            text = this._htmlFormal_(text);
            this.bodyHTML = laya.utils.Method.subString(text, "<body", "</body>");
            if (this.bodyHTML != null)
                this.bodyHTML = this.bodyHTML.substring(this.bodyHTML.indexOf(">") + 1, this.bodyHTML.length);
            this.headHTML = laya.utils.Method.subString(text, "<head>", "</head>");
            if (this.bodyHTML == null && this.headHTML == null)
                this.bodyHTML = text;
            if (this.headHTML != null&&!laya.xhtml.HtmlParse._isNormalText_.test(this.headHTML))
                this.headHTML = null;
            if (this.headHTML != null) {
                var script = this.toFunScript(this.headHTML, parent, url);
                if (script != null)
                    this._headfn_ = Laya["eval"]("(" + script + ")");
                this.headHTML = null;
            }
            if (this.bodyHTML != null) {
                this.bodyHTML = this.toFunScript(this.bodyHTML, parent, url);
                if (this.bodyHTML != null) {
                    this._bodyfn_ = Laya["eval"]("(" + this.bodyHTML + ")");
                    this.bodyHTML = null;
                }
            }
            return this._headfn_ != null || this._bodyfn_ != null;
        },
        _compile_: function(text, parentIn) {
            if (text.length < 2)
                return "";
            var i = 0, b = 0, sp, attributesTxt, str, nodeEnd, isNewNode = false, nodeName;
            var top = new laya.xhtml.HtmlCompileNode(null, null, this.baseURL, 0), parent = top, curnode = top;
            while (true) {
                if ((b = text.indexOf("<", i)) < 0)
                    break;
                if (i < b && (str = laya.utils.LaRegExp.replaceBlankChar(text.substring(i, b))) != null && str != "")
                    curnode.text = str;
                if ((i = text.indexOf(">", b)) < 0)
                    break;
                i++;
                if (text.charAt(b + 1) == "/") {
                    parent = parent.parent;
                    continue;
                }
                attributesTxt = (nodeEnd = text.charAt(i-2) == "/") ? text.substring(b + 1, i-2) : text.substring(b + 1, i-1);
                if ((sp = attributesTxt.indexOf(" ")) < 0)
                    sp = attributesTxt.length;
                nodeName = attributesTxt.substring(0, sp);
                curnode = new laya.xhtml.HtmlCompileNode(parent, nodeName, this.baseURL, b);
                curnode.params = attributesTxt.substring(sp + 1, attributesTxt.length);
                parent = nodeEnd ? curnode.parent : curnode;
            }
            if (top.childs == null) {
                console.log("HtmlCompile....is null:[" + text + "]");
                return null;
            }
            var scripts = [];
            top.toChilds(scripts);
            return scripts.join(";\n") + ";\n}\n";
        },
        toFunScript: function(text, parent, url) {
            if (text == null)
                return null;
            if (parent == null)
                parent = Laya.document.body;
            this.baseURL = url == null ? parent.baseURL : url;
            var html = this._compile_(text, parent);
            if (html == "" || html == null)
                return null;
            return "function(parent,_BASEURL_){\n" + "var _TCACHE=laya.xhtml.HtmlParse._textcache_;\n" + "var _TX=laya.xhtml.HtmlParse.appendText;\n" + "var _A=laya.xhtml.HtmlCompile.createElement;\n" + "var _T=[],_ST;\n" + "var _N=parent;\n" + html;
        },
        addTextCache: function(txt) {
            laya.xhtml.HtmlParse._textcache_.push(txt);
            return " text='_TCACHE[" + (laya.xhtml.HtmlParse._textcache_.length-1) + "]')>";
        },
        __class__: laya.xhtml.HtmlCompile
    });
    laya.xhtml.HtmlLayout = function() {};
    laya.xhtml.HtmlLayout.__name__ = true;
    laya.xhtml.HtmlLayout._sort_compare = function(a, b) {
        return b._private_ != null && a._private_ != null ? Laya.parseInt(b._private_._depth_ - a._private_._depth_) : 0;
    }
    laya.xhtml.HtmlLayout._startTypeset_ = function() {
        if (laya.xhtml.HtmlLayout._typesetList.length < 1)
            return;
        var tm = laya.utils.Method.getCurTime();
        var n = 0;
        var _g = 0;
        while (_g < 3) {
            var k = _g++;
            var t = laya.xhtml.HtmlLayout._typesetList;
            t.sort(laya.xhtml.HtmlLayout._sort_compare);
            laya.xhtml.HtmlLayout._typesetList = [];
            var _g2 = 0, _g1 = t.length;
            while (_g2 < _g1) {
                var i = _g2++;
                laya.xhtml.HtmlLayout.typeset(t[i]);
                n++;
            }
            if (laya.xhtml.HtmlLayout._typesetList.length < 1) {
                if (laya.utils.Method.getCurTime() - tm > 30)
                    console.log("typeset[" + n + "] delay:" + (laya.utils.Method.getCurTime() - tm));
                return;
            }
        }
        console.log("还有一些对象未完成排版........:" + laya.xhtml.HtmlLayout._typesetList.length + " " + Std.string(laya.xhtml.HtmlLayout._typesetList[0]));
    }
    laya.xhtml.HtmlLayout._setNodeSize_ = function(node, style, w, h) {
        if (style.overflow != null)
            return;
        var w0 = style.m_width, h0 = style.m_height;
        w = style.m_min_width != null && w < style.m_min_width ? style.m_min_width : w;
        w = style.m_max_width != null && w > style.m_max_width ? style.m_max_width : w;
        h = style.m_min_height != null && h < style.m_min_height ? style.m_min_height : h;
        h = style.m_max_height != null && h > style.m_max_height ? style.m_max_height : h;
        if ((style._type_ & 8388608) == 8388608 || style.m_height < h)
            style.m_height = h;
        if ((style._type_ & 4194304) == 4194304)
            style.m_width = w;
        else {
            if ((style._type_ & 32768) == 32768)
                style.m_width = Math.max(w, style._width_set == null || Laya.typeIsString(style._width_set) ? 0 : style._width_set);
            if (style._heightbeset_())
                style.m_height = Math.max(h, style._height_set == null ? 0 : style._height_set);
        }
        style.m_width = Math.floor(style.m_width);
        style.m_height = Math.floor(style.m_height);
        if (Laya.isNaN(style.m_width))
            Laya["debugger"]();
        if (style.m_width == w0 && style.m_height == h0)
            return;
        if ((node._type2_ & 1) == 1)
            node.dispatchEvent(null, "onresize");
        node.repaint();
    }
    laya.xhtml.HtmlLayout._addNodeToCompose_ = function(node, toarray, childNodeMaxWidth) {
        childNodeMaxWidth = laya.element.method.TextMethod._addTextToTypeset_(node, toarray, childNodeMaxWidth);
        var childs = node.childNodes;
        var o, w, style;
        var _g1 = 0, _g = childs.length;
        while (_g1 < _g) {
            var i = _g1++;
            o = childs[i];
            style = o.style;
            if (o.deleted || (style = o.style) == null || ((style._type_ & 131072) == 131072 ? 1 : 0) == 1 || o.hidden == 2)
                continue;
            if ((style._type_ & 16777216) == 16777216) {
                style._update_size_();
                if ((style._type_ & 32768) == 32768 || o.childNodes.length < 1) {
                    w = style.m_width + style.data.margin.width;
                    if ((style._type_ & 4194304) != 4194304 && (style._type_ & 33554432) != 33554432)
                        childNodeMaxWidth = childNodeMaxWidth > w ? childNodeMaxWidth : w;
                }
                toarray.push(o);
                continue;
            }
            style.m_left = style.m_top = 0;
            childNodeMaxWidth = laya.xhtml.HtmlLayout._addNodeToCompose_(o, toarray, childNodeMaxWidth);
        }
        return childNodeMaxWidth;
    }
    laya.xhtml.HtmlLayout._updateLinePos_ = function(node, line, contentWidth, lineWidth, lineTop, lineHeight, verticalAlign) {
        var nodes = line.nodes;
        var s = nodes.length;
        if (s < 1)
            return;
        var y = lineTop + lineHeight, cy = 0;
        var o, style = node.style, margin;
        var cx = 0, dx = 0, right = 0, bottom = 0;
        var paddingLeft = style.data.padding.left;
        var preIsFloat = 0;
        var inTypesetLineCount = 0;
        var wordCount = 0;
        var pageLeft = line.left;
        if (style.font.textAlign == 1)
            dx = Math.floor((contentWidth - lineWidth + style.font.exdata.letterSpacing) / 2);
        else if (style.font.textAlign == 2)
            dx = contentWidth - lineWidth;
        line.width = 0;
        line.left = line.top = 9999999;
        var _g = 0;
        while (_g < s) {
            var i = _g++;
            o = nodes[i];
            if (o._enableInsertTypesetLine_()) {
                o._inTypesetLine_ = line;
                inTypesetLineCount++;
            } else 
                nodes[i] = null;
            if (o.isWordNode()) {
                cx = o.left + dx;
                cy = verticalAlign ? Math.floor(lineTop + lineHeight / 2 - o.get_height() / 2) : lineTop;
                line.left = Math.min(line.left, cx);
                line.top = Math.min(line.top, cy);
                right = Math.max(right, cx + o.width);
                bottom = Math.max(bottom, cy + o.height);
                if (o.hidden != 0)
                    nodes[i] = null;
                else {
                    o.left = pageLeft + cx;
                    o.top = Math.floor(cy);
                    wordCount++;
                }
                continue;
            }
            style = o.getStyle();
            margin = style.data.margin;
            if ((style._type_ & 16384) == 16384&&!((style._type_ & 32768) == 32768) && style.m_cssFloat == null && preIsFloat == 0&&!((style._type_ & 4194304) == 4194304)) {
                laya.xhtml.HtmlLayout._setNodeSize_(o._toElement_(), style, contentWidth - margin.width, style.m_height);
                cx = paddingLeft + style.m_marginLeft;
            } else if (style.m_cssFloat != null) {
                if (style.m_cssFloat == 3) {
                    cx = contentWidth - Laya.Round(style.m_width * style.get_scalex()) - margin.right;
                    if (nodes[i + 1] != null) {
                        var dw = Laya.Round(nodes[i + 1].style.m_left - style.m_left);
                        dx -= dw;
                        contentWidth -= dw;
                    }
                } else 
                    cx = Laya.Round(style.m_left + dx);
                    preIsFloat = 1;
            } else {
                cx = Laya.Round(style.m_left + dx);
                preIsFloat = 0;
            }
            cy = verticalAlign ? Math.floor(lineTop + (lineHeight - margin.height) / 2 - o.get_height() / 2) : style.m_verticalAlign == 3 ? y - o.get_height() - margin.bottom : lineTop + style.m_marginTop * 0;
            cx = pageLeft + Math.floor(cx);
            style.m_left = cx-1;
            style.pos(cx, Math.floor(cy));
            line.left = Math.min(line.left, cx);
            line.top = Math.min(line.top, cy);
            right = Math.max(right, cx + style.m_width);
            bottom = Math.max(bottom, cy + style.m_height);
        }
        line.width = right - line.left;
        line.height = bottom - line.top;
        if (wordCount < 1 && inTypesetLineCount < 4)
            line.clear();
    }
    laya.xhtml.HtmlLayout._getBlockParentWidth_ = function(node, reduceWidth) {
        if (node == null)
            return 0;
        var style = node.style;
        if (style == null)
            return laya.xhtml.HtmlLayout._getBlockParentWidth_(node.parentNode, reduceWidth);
        var styledata = style.data;
        reduceWidth -= styledata.padding.width + styledata.margin.width + styledata.border.width;
        if ((style._type_ & 32768) == 32768 && node._toElement_().updateDynamicAttr("width"))
            return style.m_width + reduceWidth;
        var w = style.m_width + reduceWidth;
        if (style.m_max_width != null) {
            if (!((style._type_ & 32768) == 32768))
                w = style.m_max_width;
            else 
                w = Laya.Round(Math.min(style.m_max_width, w));
            if ((style._type_ & 16384) == 16384)
                return w;
        }
        if ((style._type_ & 16384) == 16384 && (style._type_ & 32768) == 32768 || (node = node.parentNode) == null || ((style._type_ & 131072) == 131072 ? 1 : 0) != 0)
            return w;
        return laya.xhtml.HtmlLayout._getBlockParentWidth_(node, reduceWidth);
    }
    laya.xhtml.HtmlLayout.typeset_text = function(node) {
        if (node.textNodes == null)
            laya.element.method.TextMethod.createTextNodes(node);
        var style = node.style;
        var styledata = style.data;
        var font = style.font;
        var letterSpacing = font.exdata.letterSpacing;
        var lines = node.typesetLines;
        if (lines == null)
            lines = node.typesetLines = [];
        else 
            laya.element.method.ElementMethod.typesetLinesClear(lines);
        var curLine = null;
        curLine = lines[0];
        if (curLine == null) {
            curLine = new laya.element.method.TypesetLine();
            lines.push(curLine);
        } else 
            curLine.clear();
        curLine.left = 0;
        curLine.top = 0;
        curLine.width = 0;
        curLine.height = 0;
        var _g1 = 0, _g = node.textNodes.length;
        while (_g1 < _g) {
            var i = _g1++;
            var t = node.textNodes[i];
            t.left = curLine.width;
            t.top = 0;
            curLine.width += t.width + letterSpacing;
            if (curLine.height < t.height)
                curLine.height = t.height;
            curLine.nodes.push(t);
        }
        var dx = 0, dy = 0;
        if (font.textAlign != 0) {
            var allowWidth = laya.xhtml.HtmlLayout.__getAllowWidth__(node, 0);
            if (font.textAlign == 1)
                dx = Math.floor((allowWidth - curLine.width + letterSpacing) / 2);
            else if (font.textAlign == 2)
                dx = allowWidth - curLine.width;
        }
        var lineHeight = font.exdata.lineHeight;
        var midv = style.m_verticalAlign == 2;
        if (midv && lineHeight == 0)
            lineHeight = style.m_height;
        var margin = style.data.margin;
        dy = lineHeight > 0 ? Math.floor((lineHeight - margin.height) / 2 - curLine.height / 2) : style.m_verticalAlign == 3 ? curLine.height - margin.bottom : 0;
        if (dx != 0 || dy != 0) {
            curLine.left = dx;
            curLine.top = dy;
            var _g1 = 0, _g = node.textNodes.length;
            while (_g1 < _g) {
                var i = _g1++;
                var o = node.textNodes[i];
                o.left += dx;
                o.top = dy;
            }
        }
        node._type_|=4096;
        laya.xhtml.HtmlLayout._setNodeSize_(node, style, curLine.width, curLine.height);
        node.dispatchEvent(null, "onscrollsize");
        node.repaint();
    }
    laya.xhtml.HtmlLayout.__getAllowWidth__ = function(node, childNodeMaxWidth) {
        var allowWidth = 100000;
        var style = node.style;
        if ((style._type_ & 32768) == 32768 && node.updateDynamicAttr("width"))
            allowWidth = style.m_width;
        else {
            if ((style._type_ & 32768) == 32768) {
                if (!(style.overflow != null))
                    allowWidth = style.m_width > childNodeMaxWidth ? style.m_width : childNodeMaxWidth;
                else 
                    allowWidth = style.m_width;
            } else if (((style._type_ & 131072) == 131072 ? 1 : 0) == 0) {
                var styledata = style.data;
                var blankWidth = styledata.padding.width + styledata.margin.width + styledata.border.width;
                allowWidth = laya.xhtml.HtmlLayout._getBlockParentWidth_(node.parentNode, - blankWidth);
            }
            allowWidth = style.m_min_width != null && allowWidth < style.m_min_width ? style.m_min_width : allowWidth;
            allowWidth = style.m_max_width != null && allowWidth > style.m_max_width ? style.m_max_width : allowWidth;
        }
        return allowWidth;
    }
    laya.xhtml.HtmlLayout.typesetOneChild = function(node, composenodes, childNodeMaxWidth) {
        var o = composenodes[0];
        var isword = o.isWordNode();
        if (isword)
            return false;
        var lines = node.typesetLines;
        if (lines != null) {
            laya.element.method.ElementMethod.typesetLinesClear(lines);
            node.typesetLines = null;
        }
        var cnode;
        cnode = o;
        if ((cnode._type_ & 256) == 256)
            laya.xhtml.HtmlLayout.typeset(cnode);
        var style = node.style;
        var font = style.font;
        var contentWidth = style.m_width, contentHeight = Laya.parseInt(Math.max(font.exdata.lineHeight, style.m_height));
        var style2 = cnode.style;
        var styledata2 = style2.data;
        var blankWidth2 = styledata2.padding.width + styledata2.margin.width + styledata2.border.width;
        var w2 = font.exdata.letterSpacing + style2.m_width + blankWidth2;
        var blankHeight2 = styledata2.padding.height + styledata2.margin.height + styledata2.border.height;
        var h2 = font.exdata.lineSpacing + style2.m_height + blankHeight2;
        if (!((style._type_ & 32768) == 32768) && (style.m_cssFloat != null || ((style._type_ & 131072) == 131072 ? 1 : 0) == 1 || contentWidth == 100000 || (style._type_ & 4194304) == 4194304))
            contentWidth = w2;
        contentHeight = Laya.parseInt(Math.max(h2, contentHeight));
        var dx = 0, dy = 0;
        if ((style2._type_ & 32768) == 32768) {
            if (font.textAlign == 1)
                dx = Math.floor((contentWidth - style2.m_width * style2.get_scalex() + font.exdata.letterSpacing) / 2);
            else if (font.textAlign == 2 || style2.m_cssFloat == 3)
                dx = contentWidth - style2.m_width * style2.get_scalex();
        }
        var margin = style.data.margin;
        dy = style.m_verticalAlign == 2 || font.exdata.lineHeight > 0 ? Math.floor((contentHeight - h2 * style2.get_scaley()) / 2) : style.m_verticalAlign == 3 ? contentHeight - h2 * style2.get_scaley() - margin.bottom : 0;
        style2.pos(dx, dy);
        node._type_|=4096;
        laya.xhtml.HtmlLayout._setNodeSize_(node, style, contentWidth, contentHeight);
        node.dispatchEvent(null, "onscrollsize");
        node._repaintType_ = 0;
        node.repaint();
        return true;
    }
    laya.xhtml.HtmlLayout.typeset = function(node) {
        if (node.deleted ||!((node._type_ & 65536) == 65536) ||!((node._type_ & 256) == 256)) {
            if ((node._type_ & 131072) == 131072)
                node._type_&=-131073;
            if ((node._type_ & 536870912) == 536870912)
                node._type_&=-536870913;
            return;
        }
        node._type_|=536870912;
        if ((node._type_ & 256) == 256)
            node._type_&=-257;
        if ((node._type_ & 131072) == 131072)
            node._type_&=-131073;
        if (node.childNodes.length == 0 && node.textContent != null && node.textContent.length > 0 && (node.style.font.exdata.whiteSpace == 1 || node.textContent.length < 2)) {
            laya.xhtml.HtmlLayout.typeset_text(node);
            node._repaintType_ = 0;
            node.repaint();
            return;
        }
        laya.element.method.ElementMethod.childsSort(node);
        var composenodes = [];
        var childNodeMaxWidth = 0;
        childNodeMaxWidth = laya.xhtml.HtmlLayout._addNodeToCompose_(node, composenodes, childNodeMaxWidth);
        laya.xhtml.HtmlLayout._typesetCount_++;
        if (composenodes.length < 1) {
            if (node.typesetLines != null)
                laya.element.method.ElementMethod.typesetLinesClear(node.typesetLines);
            return;
        }
        if (composenodes.length == 1) {
            if (laya.xhtml.HtmlLayout.typesetOneChild(node, composenodes, childNodeMaxWidth))
                return;
        }
        var style = node.style;
        var styledata = style.data;
        var font = style.font;
        var letterSpacing = font.exdata.letterSpacing;
        var nowrap = font.exdata.whiteSpace == 1;
        var lineSpacing = font.exdata.lineSpacing;
        var lineHeight = font.exdata.lineHeight;
        var typsetStartLeft = 0;
        var allowWidth = laya.xhtml.HtmlLayout.__getAllowWidth__(node, childNodeMaxWidth);
        var left = font.exdata.textIndent;
        var top = 0;
        var preIsFloat = 0;
        var lineWidth = 0;
        var maxContentWidth = 0;
        var outwidth2, outheight2, styledata2;
        var lines = node.typesetLines;
        if (lines == null)
            lines = node.typesetLines = [];
        else 
            laya.element.method.ElementMethod.typesetLinesClear(lines);
        var curLine = null;
        var lineCount = 0;
        var nextLine = function() {
            if (curLine != null) {
                curLine.left = left;
                curLine.width = lineWidth;
            }
            curLine = lines[lineCount];
            if (curLine == null) {
                curLine = new laya.element.method.TypesetLine();
                lines.push(curLine);
            } else {
                curLine.clear();
                lines.length = lineCount + 1;
            }
            curLine.top = curLine.height = lineHeight;
            lineCount++;
            lineWidth = 0;
        };
        nextLine();
        var _g1 = 0, _g = composenodes.length;
        while (_g1 < _g) {
            var i = _g1++;
            var o = composenodes[i];
            var isword = o.isWordNode();
            var style2 = o.getStyle();
            var block = (style2._type_ & 16384) == 16384;
            var bBreak;
            if (isword) {
                outwidth2 = o.get_width();
                outheight2 = o.get_height();
                var word;
                word = o;
                bBreak = word.word == "\n";
            } else {
                styledata2 = style2.data;
                var blankWidth2 = styledata2.padding.width + styledata2.margin.width + styledata2.border.width;
                var blankHeight2 = styledata2.padding.height + styledata2.margin.height + styledata2.border.height;
                outwidth2 = o.get_width() + blankWidth2;
                outheight2 = o.get_height() + blankHeight2;
                bBreak = (style2._type_ & 2097152) == 2097152;
            }
            if (i > 0 && (block && style2.m_cssFloat == null ||!nowrap && (curLine.nodes.length > 0 && block && style2.m_cssFloat == null && preIsFloat == 0 || left + outwidth2 * style2.get_scalex() > allowWidth) || bBreak)) {
                nextLine();
                left = 0;
                preIsFloat = 0;
            }
            curLine.nodes.push(o);
            curLine.height = curLine.height > outheight2 ? curLine.height : outheight2;
            lineWidth += outwidth2;
            if (isword)
                o.left = left + typsetStartLeft;
            else 
                style2.m_left = left + typsetStartLeft;
            left += outwidth2 + letterSpacing;
            if (left > maxContentWidth)
                maxContentWidth = left;
            if (left > lineWidth)
                lineWidth = left;
            preIsFloat = style2.m_cssFloat != null ? 1 : 0;
        }
        if (curLine.nodes.length > 0) {
            curLine.left = left;
            curLine.width = lineWidth;
        }
        var contentWidth = allowWidth;
        if (!((style._type_ & 32768) == 32768) && (style.m_cssFloat != null || ((style._type_ & 131072) == 131072 ? 1 : 0) == 1 || contentWidth == 100000 || (style._type_ & 4194304) == 4194304))
            contentWidth = maxContentWidth;
        contentWidth = Math.floor(contentWidth);
        var lineh = 0;
        var contentHeight = lineSpacing;
        var pageCount = 0;
        var pageUse = false, pageWidth = 0;
        if (styledata.pageWidth != null) {
            pageUse = true;
            pageWidth = styledata.getPageWidth();
        }
        var pageHeight = pageUse ? style.m_height: 999999999;
        if (style.m_verticalAlign == 2 && lineHeight == 0)
            lineHeight = 1;
        left = 0;
        var _g1 = 0, _g = lines.length;
        while (_g1 < _g) {
            var i = _g1++;
            curLine = lines[i];
            if (contentHeight + curLine.height > pageHeight) {
                contentHeight = 0;
                pageCount++;
                left = pageCount * pageWidth;
            }
            curLine.page = pageUse;
            curLine.top = contentHeight;
            curLine.left = left;
            contentHeight += curLine.height + lineSpacing;
        }
        contentHeight = Laya.parseInt(Math.max(contentHeight, font.exdata.lineHeight));
        if (pageWidth > 0)
            contentHeight = style.m_height;
        var dy = 0;
        if (style._heightbeset_()) {
            dy = lineHeight != 0 && style.m_height > contentHeight ? (style.m_height - contentHeight) / 2 : 0;
            dy/=lines.length;
        } else 
            dy = lineHeight > contentHeight ? (lineHeight - contentHeight) / 2 / lines.length : 0;
        var _g1 = 0, _g = lines.length;
        while (_g1 < _g) {
            var i = _g1++;
            curLine = lines[i];
            laya.xhtml.HtmlLayout._updateLinePos_(node, curLine, contentWidth, curLine.width, Math.floor(curLine.top + dy * (i + 1)), curLine.height, lineHeight > 0);
        }
        node._type_|=4096;
        laya.xhtml.HtmlLayout._setNodeSize_(node, style, contentWidth, contentHeight);
        node.dispatchEvent(null, "onscrollsize");
        node._repaintType_ = 0;
        node.repaint();
    }
    laya.xhtml.HtmlLayout.prototype = {
        __class__: laya.xhtml.HtmlLayout
    }
    var $_, $fid = 0;
    function $bind(o, m) {
        if (m == null)
            return null;
        if (m.__id__ == null)
            m.__id__ = $fid++;
        var f;
        if (o.hx__closures__ == null)
            o.hx__closures__ = {};
        else 
            f = o.hx__closures__[m.__id__];
        if (f == null) {
            f = function() {
                return f.method.apply(f.scope, arguments);
            };
            f.scope = o;
            f.method = m;
            o.hx__closures__[m.__id__] = f;
        }
        return f;
    };
    Laya._ISAPP_ = false;
    Laya._ISFLASH_ = false;
    Laya._ISHTML5_ = true;
    Laya["eval"]("Laya.eval=function(str){try{return eval(str);}catch(err){debugger;log('Laya.eval err:'+err+' ['+str+']');};}");
    Laya["eval"]("window.$=function(id){return Laya.document.getElementById(id);};");
    Laya["eval"]("if (!window.console) {window.console = function() { };window.console.log=function(){};}");
    Laya["eval"]("window.Laya=Laya;window.laya=laya;if(window.conch!=null) Laya._ISAPP_=true;Laya.conch=window.conch;window.log=window.trace=function(s){if(window.console) console.log(s);};");
    Laya["eval"]("if(Laya._ISAPP_==true)Laya.notify=window.notify;");
    Laya["eval"]("Laya.jwindow=window;Laya.jdocument=document;");
    Laya["eval"]("Laya.istype=function(d,name){ return typeof(d) == name;}");
    Laya["eval"]("Laya.typeIsString=function(d){ return typeof(d) == 'string';}");
    Laya["eval"]("Laya.isNaN=window.isNaN;");
    Laya["eval"]("Laya.isUndefined=function(d){ return d==Laya.undefinedvar;}");
    Laya["eval"]("Laya.parseInt=function(d,a){ return a!=null?parseInt(d,a):parseInt(d);}");
    Laya["eval"]("Laya.parseFloat=function(d,a){ return a!=null?parseFloat(d,a):parseFloat(d);}");
    Laya["eval"]("Laya.Number=window.Number;");
    if (Laya._ISAPP_ == true) {
        Laya._ISHTML5_ = false;
        Laya["eval"](Laya.conch.setOnFrame(function() {
            Laya.window.loop();
        }));
        Laya.conch.setOnBackground(function() {});
        Laya.conch.setOnForeground(function() {
            Laya.document.body.repaint();
        });
    } else {
        Laya["eval"]("Laya.jwindow.tmGetCurms=function(){return (new Date()).valueOf();}");
        Laya["eval"]("Laya.jwindow.PerfUpdateDt=function(){}");
    }
    Math.__name__ = ["Math"];
    Math.NaN = Number.NaN;
    Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
    Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
    Math.isFinite = function(i) {
        return isFinite(i);
    };
    Math.isNaN = function(i) {
        return isNaN(i);
    };
    String.prototype.__class__ = String;
    String.__name__ = true;
    Array.prototype.__class__ = Array;
    Array.__name__ = true;
    Date.prototype.__class__ = Date;
    Date.__name__ = ["Date"];
    var Int = {
        __name__: ["Int"]
    };
    var Dynamic = {
        __name__: ["Dynamic"]
    };
    var Float = Number;
    Float.__name__ = ["Float"];
    var Bool = Boolean;
    Bool.__ename__ = ["Bool"];
    var Class = {
        __name__: ["Class"]
    };
    var Enum = {};
    Laya["eval"]("Array.prototype.__removeKeyElement__=function(key){delete this[key];};" + "Array.prototype.__toKeyArray__=function(){var _keys = [];for (var key in this) {if(__l_tmparray__[key]==null) _keys.push(key);};return _keys;};" + "Array.prototype.__toDataArray__=function(){var _ds = [];for (var key in this) {if(__l_tmparray__[key]==null) _ds.push(this[key]);};return _ds;};" + "window.__l_tmparray__=[];" + "");
    Laya["eval"]("laya.utils.LaRegExp.__createRegExp__=function(pattern,flags){var o=new RegExp(pattern,flags);return o;};");
    Laya["eval"]("laya.utils.Method.objectShallowCopy=function(dec,src){for(var i in src)dec[i]=src[i];}");
    Laya["eval"]("laya.utils.Method.setArrayLength=function(array,sz){array.length=sz;}");
    Laya["eval"]("laya.utils.Method.numToStr=function(v,d){return v.toString(d);}");
    Laya["eval"]("laya.utils.Method.encodeURI=window.encodeURI;");
    Laya["eval"]("laya.utils.Method.encodeURIComponent=window.encodeURIComponent;");
    Laya["eval"]("laya.utils.Method.decodeURI=window.decodeURI;");
    Laya["eval"]("laya.utils.Method.decodeURIComponent=window.decodeURIComponent;");
    Laya["eval"]("laya.utils.Method.getCurTime=function(){return (new Date()).valueOf();}");
    Laya["eval"]("laya.utils.Method.field=function(o,name){return o[name];}");
    Laya["eval"]("laya.utils.Method.getDefData=function(def,field,value){" + "for ( var key in def ) {" + "\tif ( def[key][field] == value )" + "\t\treturn def[key];" + "} return null;}");
    if (Laya._ISAPP_)
        Laya["eval"]("laya.utils.Method.execScript=function(str,url)\n{\ntry{\n" + "\treturn window.eval(str) ;\n}\n" + "catch (err)\n{\nlog(\"file eval err:\"+err+\" url=\"+url+\"\\n\"+str);\n}\n}");
    else 
        Laya["eval"]("laya.utils.Method.execScript=function(str,url)\n{\ntry{\n" + "\tvar a = document .createElement (\"script\" );\n" + "\ta.type= \"text/javascript\" ;\n" + "\ta.text= str ;\n" + "\tdocument.getElementsByTagName (\"head\" )[0].appendChild (a) ;\n}\n" + "catch (err)\n{\ndebugger;log(\"file eval err:\"+err+\" url=\"+url+\"\\n\"+str);\n}\n}");
    laya.utils.Method._urlCache = new laya.utils.StringMap();
    Laya["eval"]("laya.element.Node.prototype.EVAL=function(str){try{return eval(str);}catch(err){Laya.debug.err('node eval err:'+err+' '+str);};}");
    copter.ui.GameBody.__bgcolors__ = [];
    copter.ui.GameBody.__bgcolors__.push("#3bb8eb");
    copter.ui.GameBody.__bgcolors__.push("#aba4d3");
    copter.ui.GameBody.__bgcolors__.push("#c8b093");
    copter.ui.GameBody.__bgcolors__.push("#324890");
    copter.ui.GameBody.__bgcolors__.push("#7f95a4");
    Laya.jwindow._laya_element_map_ = laya.Document._element_map_ = new laya.utils.StringMap();
    Laya.jwindow._laya_element_defaultclass_map_ = laya.Document._element_defaultclass_map_ = new laya.utils.StringMap();
    Laya["eval"]("laya.Document.prototype._newElement_=function(name){\n" + "var o=_laya_element_map_._data_['$'+name];\n" + "if(o) {return o.__clone__();}\n" + "if( (o=laya.element.Assembly.CreateElement(name))) return o;\n" + "log ('*************no this node:'+name);\n" + "o=_laya_element_map_._data_[name]=_laya_element_map_._data_['$div'];\n" + "var n=new o();if(_laya_element_defaultclass_map_._data_['$'+name]!=null) _laya_element_defaultclass_map_._data_['$'+name].call(n.style);return n;}\n");
    Laya["eval"]("laya.Document.regNodeClass=function(name, _class_){\n\nname=name.toLowerCase();\n_laya_element_map_._data_['$'+name]=_class_;_class_.__clone__=function(){return new _class_();};}\n");
    Laya["eval"]("window.requestAnimFrame = (function(){" + "return  window.requestAnimationFrame       ||" + "\t  window.webkitRequestAnimationFrame ||" + "\t  window.mozRequestAnimationFrame    ||" + "\t  window.oRequestAnimationFrame" + "})();");
    laya.css.CSSFontExData.__DEFAULT_ = new laya.css.CSSFontExData(null);
    laya.css.RGBA._colorMap_ = {
        white: "#FFFFFF",
        red: "#FF0000",
        green: "#00FF00",
        blue: "#0000FF",
        black: "#000000",
        yellow: "#FFFF00",
        gray: "#AAAAAA"
    };
    laya.css.CSSFont.__ID__ = 0;
    laya.css.CSSFont.__familyCount__ = 1;
    laya.css.CSSFont.__FONTMAXID__ = 1;
    laya.css.CSSFont.__FONTIDMAP__ = new laya.utils.StringMap();
    laya.css.CSSFont.__FAMILYMAP__ = new laya.utils.StringMap();
    laya.css.CSSFont.__DEFAULT_ = new laya.css.CSSFont(null);
    laya.css.CSSFont.__DEFAULT_.set_family("Arial");
    laya.css.CSSFont.__DEFAULT_.size = 12;
    laya.css.CSSFont.__DEFAULT_.color = new laya.css.RGBA("black");
    laya.display.Canvas._CANVASDELS_ = new laya.utils.StringMap();
    laya.display.Canvas._CANVASDELS_.set("canvas", []);
    laya.display.Canvas._CANVASDELS_.set("fakeCanvas", []);
    laya.utils.LayaTimer._system_timer_ = new laya.utils.LayaTimer();
    laya.utils.LayaTimer._system_timer_.run(0);
    laya.element.Audio._activeAudios_ = [];
    laya.element.Audio._cacheAudios_ = new laya.utils.StringMap();
    Laya["eval"]("laya.element.WebSocket._createSocket_=function(url){return new WebSocket(url);};");
    if (!Laya._ISAPP_)
        Laya["eval"]("laya.event.EventDriver.enableTouch=function(){return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;}");
    else 
        Laya["eval"]("laya.event.EventDriver.enableTouch=function(){return window.enableTouch;}");
    laya.io.FileFactory.__loadedfiles__ = [];
    if (!Laya._ISAPP_)
        Laya["eval"]("laya.io.HttpRemote.createXMLHttpRequest=function()" + "{if(window.XMLHttpRequest){return new XMLHttpRequest();}" + "else if(window.ActiveXObject){return new ActiveXObject('Microsoft.XMLHTTP');}throw new Error('XMLHttp object could be created.');}");
    var _regexArray_ = ["<script", "<style", "<code", "<assembly", "<loop", "<conditionalcomments", "<importonce"].join(")|(");
    laya.xhtml.HtmlParse._htmlFormatReg_ = new laya.utils.LaRegExp("(" + _regexArray_ + ")", "g");
    laya.xhtml.HtmlParse._htmlendwords_ = {
        '<scr': "</script>",
        '<sty': "</style>",
        '<!--': "-->",
        '<cod': "</code>",
        '<ass': "</assembly>",
        '<loo': "</loop>",
        '<con': "</conditionalcomments>",
        '<imp': "</importonce>"
    };
    laya.Debug.WARING_NODE_ID = 1;
    Laya.MAXINT = 999999999;
    Laya.debug = new laya.Debug();
    Laya.data = {};
    Laya.CurTime = 0;
    Laya._show_ = false;
    Laya.ISPCOS = false;
    Laya.setup = new Setup();
    copter.game2.Obstacle.maxSwingAngle = 30;
    copter.game2.Obstacle.createIndex = 0;
    copter.game2.Obstacle.createNumber = 0;
    copter.game2.Obstacle.point1 = new copter.game2.Point();
    copter.game2.Obstacle.point2 = new copter.game2.Point();
    copter.game2.Obstacle.point3 = new copter.game2.Point();
    copter.game2.Obstacle.point4 = new copter.game2.Point();
    copter.game2.Scene.__WIDTH__ = 480;
    copter.game2.Scene.__HEIGHT__ = 800;
    copter.game2.Scene.__NUMBER__ = 4;
    copter.game2.Scene.__AVATORHEIGHT__ = 78;
    copter.game2.Scene.__SBSTACLEHEIGHT__ = 35;
    copter.game2.Scene.__SBSTACLEWIDTH__ = 242;
    copter.game2.Scene.__SBSTACLEDRATATE__ = 0.1;
    copter.game2.Scene.__CHUIZI_DY__ = 18.5;
    copter.game2.Scene.__CHUIZI1_OFFSETX__ = 214.5;
    copter.game2.Scene.__CHUIZI2_OFFSETX__ = 27.5;
    copter.game2.Scene.__CHUIZI_LLNE__ = 78.5;
    copter.game2.Scene.__CHUIZI_WIDTH__ = 70;
    copter.game2.Scene.__CHUIZI_HEIGHT__ = 50;
    copter.game2.Scene.__RAISINGSPEEDPERMS__ = 0.0002;
    copter.game2.Scene.s_seperateObstacles = 0.35;
    copter.game2.Scene.s_beginObstaclePos = 0.7;
    copter.game2.Scene.s_beginAvatorPos = 0.64;
    copter.game2.Scene.__OBSTACLEHEIGHT__ = copter.game2.Scene.__HEIGHT__ * copter.game2.Scene.s_seperateObstacles;
    laya.utils.LaRegExp._removeBlankCharRegExp_ = new laya.utils.LaRegExp("\\s", "g");
    laya.utils.LaRegExp._removeBlankCharAndPxRegExp_ = new laya.utils.LaRegExp("\\s|px", "g");
    laya.utils.LaRegExp._string_Trim_ = new laya.utils.LaRegExp("(^\\s*)|(\\s*$)", "g");
    laya.utils.LaRegExp._string_LTrim_ = new laya.utils.LaRegExp("(^\\s*)", "g");
    laya.utils.LaRegExp._string_RTrim_ = new laya.utils.LaRegExp("(\\s*$)", "g");
    laya.utils.LaRegExp._checkIsHZ_ = new laya.utils.LaRegExp("[u4E00-u9FFF]", "g");
    laya.utils.Method._doubleQuotationRegExp_ = new laya.utils.LaRegExp("\\\"", "g");
    laya.utils.Method._enterRegExp_ = new laya.utils.LaRegExp("\\n", "g");
    laya.utils.Method._senterRegExp_ = new laya.utils.LaRegExp("\\r", "g");
    laya.element.Node.NODE_SELECT_IS_MATCH = 1;
    laya.element.Node.NODE_SELECT_IS_NOT_MATCH = 0;
    laya.element.Node.NODE_SELECT_BREAK =- 1;
    laya.element.Node.NODE_SELECT_BREAK_CHILD =- 2;
    laya.element.Node.__RENDERNODE_GARBAGE__ = [];
    laya.element.Node.src__ = Laya.JGETSET(laya.element.Node, "src", 1);
    laya.element.Node.value__ = Laya.JGETSET(laya.element.Node, "value", 1);
    laya.element.Node.text__ = Laya.JGETSET(laya.element.Node, "text", 1);
    laya.element.Node.name__ = Laya.JGETSET(laya.element.Node, "name", 1);
    laya.element.Node.id__ = Laya.JGETSET(laya.element.Node, "id", 1);
    laya.element.Node.innerHTML__ = Laya.JGETSET(laya.element.Node, "innerHTML", 1);
    laya.element.Node.disabled__ = Laya.JGETSET(laya.element.Node, "disabled", 1);
    laya.element.Node.group__ = Laya.JGETSET(laya.element.Node, "group", 1);
    laya.element.Node.gname__ = Laya.JGETSET(laya.element.Node, "gname", 1);
    laya.element.Node.parent__ = Laya.JGETSET(laya.element.Node, "parent", 1);
    laya.element.Node.__eval = Laya.AREG(laya.element.Node, "eval", "s", "EVAL", null);
    laya.element.Node.__destroy = Laya.AREG(laya.element.Node, "destroy", "", "destroy");
    laya.element.Node.importHTML_ = Laya.AREG(laya.element.Node, "importhtml", "s", "importHTML");
    laya.element.Node.explanation_ = Laya.AREG(laya.element.Node, "explanation", "s");
    laya.element.Node.eventsToG_ = Laya.AREG(laya.element.Node, "eventstog", "s s", "eventsToG");
    laya.element.Node.onresize__ = Laya.AREG(laya.element.Node, "onresize", "s");
    laya.element.Node.onrepos__ = Laya.AREG(laya.element.Node, "onrepos", "s");
    laya.element.Node.onreshow__ = Laya.AREG(laya.element.Node, "onreshow", "s");
    laya.element.Node.onclick__ = Laya.AREG(laya.element.Node, "onclick", "s");
    laya.element.Node.onmousemove__ = Laya.AREG(laya.element.Node, "onmousemove", "s");
    laya.element.Node.onmousedown__ = Laya.AREG(laya.element.Node, "onmousedown", "s");
    laya.element.Node.onmouseup__ = Laya.AREG(laya.element.Node, "onmouseup", "s");
    laya.element.Node.onmultouchup__ = Laya.AREG(laya.element.Node, "onmultouchup", "s");
    laya.element.Node.ondbclick__ = Laya.AREG(laya.element.Node, "ondbclick", "s");
    laya.element.Node.onmouseover__ = Laya.AREG(laya.element.Node, "onmouseover", "s");
    laya.element.Node.onmouseout__ = Laya.AREG(laya.element.Node, "onmouseout", "s");
    laya.element.Node.ondrag__ = Laya.AREG(laya.element.Node, "ondrag", "s");
    laya.element.Node.ondragstart__ = Laya.AREG(laya.element.Node, "ondragstart", "s");
    laya.element.Node.ondragend__ = Laya.AREG(laya.element.Node, "ondragend", "s");
    laya.element.Node.ondragenter__ = Laya.AREG(laya.element.Node, "ondragenter", "s");
    laya.element.Node.ondragleave__ = Laya.AREG(laya.element.Node, "ondragleave", "s");
    laya.element.Node.ondragover__ = Laya.AREG(laya.element.Node, "ondragover", "s");
    laya.element.Node.onfocus__ = Laya.AREG(laya.element.Node, "onfocus", "");
    laya.element.Node.onblur__ = Laya.AREG(laya.element.Node, "onblur", "s");
    laya.element.Node.onupdate__ = Laya.AREG(laya.element.Node, "onupdate", "s");
    laya.element.Node.__NULLARRAY__ = [];
    laya.element.Node.__lastid__ = 0;
    laya.element.Node.__node_deleted_list_ = [];
    laya.element.Node.EACHCHILDS_STOPCHILD =- 3;
    laya.element.Node.NODEMARK_CHILDS = 1;
    laya.element.Node.NODEMARK_BGCOLOR = 2;
    laya.element.Node.NODEMARK_BGIMG = 4;
    laya.element.Node.NODEMARK_BGIMG_REPEAT = 8;
    laya.element.Node.NODEMARK_BGIMG_XY = 16;
    laya.element.Node.NODEMARK_FILTER = 32;
    laya.element.Node.NODEMARK_IMG = 64;
    laya.element.Node.NODEMARK_IMG_ANI = 128;
    laya.element.Node.NODEMARK_TEXT = 256;
    laya.element.Node.NODEMARK_TRANSFORM = 512;
    laya.element.Node.NODEMARK_CANVASE = 1024;
    laya.element.Node.NODEMARK_PAINTEX = 2048;
    laya.element.Node.NODEMARK_SCALE = 4096;
    laya.element.Node.NODEMARK_FLIP = 8192;
    laya.element.Node.NODEMARK_ROTATE = 16384;
    laya.element.Node.NODEMARK_ALPHA = 32768;
    laya.element.Node.NODEMARK_ENABLE_ONPAINT = 65536;
    laya.element.Node.NODEMARK_BORDER = 131072;
    laya.element.Node.NODEMARK_PADDING = 262144;
    laya.element.Node.NODEMARK_OVERFLOW = 524288;
    laya.element.Node.NODEMARK_HIDETEXT = 4194304;
    laya.element.Node.NODEMARK_MAX = 8388608;
    laya.element.Node.TYPE_DOMEX = 1;
    laya.element.Node.TYPE_FOCUS = 2;
    laya.element.Node.TYPE_MOUSE = 4;
    laya.element.Node.TYPE_MOUSE_MOV = 8;
    laya.element.Node.TYPE_ENABLE_EVENT = 16;
    laya.element.Node.TYPE_ENABLE_LISTENER = 32;
    laya.element.Node.TYPE_WIISORT = 64;
    laya.element.Node.TYPE_TYPESET = 128;
    laya.element.Node.TYPE_WILLTYPESET = 256;
    laya.element.Node.TYPE_NOMOUSEMUSTIN = 512;
    laya.element.Node.TYPE_DELEX = 1024;
    laya.element.Node.TYPE_ISFOCUS = 2048;
    laya.element.Node.TYPE_SCROLLSZCHG = 4096;
    laya.element.Node.TYPE_COMPLETE = 8192;
    laya.element.Node.TYPE_DRAGGABLE = 16384;
    laya.element.Node.TYPE_MOUSE_DRAG = 32768;
    laya.element.Node.TYPE_VIEW = 65536;
    laya.element.Node.TYPE_INTYPESET = 131072;
    laya.element.Node.TYPE_NEEDREPAINTEVENT = 262144;
    laya.element.Node.TYPE_NEEDREPOSEVENT = 524288;
    laya.element.Node.TYPE_DISABLEFOCUS = 1048576;
    laya.element.Node.TYPE_ISCREATED = 2097152;
    laya.element.Node.TYPE_REVIEWEVENT = 4194304;
    laya.element.Node.TYPE_DISABLED = 8388608;
    laya.element.Node.TYPE_GROUP = 16777216;
    laya.element.Node.TYPE_USEMOUSEOVER = 33554432;
    laya.element.Node.TYPE_ONDROP = 67108864;
    laya.element.Node.TYPE_ENABLE_EDIT = 134217728;
    laya.element.Node.TYPE_MODAL_WINDOW = 268435456;
    laya.element.Node.TYPE_TYPESETED = 536870912;
    laya.element.Node.TYPE_CANEDIT = 1073741824;
    laya.element.Node.TYPE2_RESIZEEVENT = 1;
    laya.element.Node.HIDDEN_TRUE = 1;
    laya.element.Node.HIDDEN_DISPLAYNONE = 2;
    laya.element.Node.__id = Laya.AREG(laya.element.Node, "id", "s");
    laya.element.Node.__value = Laya.AREG(laya.element.Node, "value", "s");
    laya.element.Node.__text = Laya.AREG(laya.element.Node, "text", "s");
    laya.element.Node.__textid = Laya.AREG(laya.element.Node, "textid", "s");
    laya.element.Node.__srcid = Laya.AREG(laya.element.Node, "srcid", "s");
    laya.element.Node.__name = Laya.AREG(laya.element.Node, "name", "s");
    laya.element.Node.__gname = Laya.AREG(laya.element.Node, "gname", "s");
    laya.element.Node.__parent = Laya.AREG(laya.element.Node, "parent", "s");
    laya.element.Node.group_ = Laya.AREG(laya.element.Node, "group", "b");
    laya.element.Node.mousedowndelay_ = Laya.AREG(laya.element.Node, "mousedowndelay", "i", null, null);
    laya.element.Node.disabled_ = Laya.AREG(laya.element.Node, "disabled", "b", null, null);
    laya.element.Node.__src = Laya.AREG(laya.element.Node, "src", "s", null, null);
    laya.element.Node.get_innerHTML_count = 0;
    laya.element.Node.style_ = Laya.AREG(laya.element.Node, "style", "s", "cssText");
    laya.element.Element.draggable__ = Laya.JGETSET(laya.element.Element, "draggable", 1);
    laya.element.Element.cancelBubble__ = Laya.JGETSET(laya.element.Element, "cancelBubble", 1);
    laya.element.Element.focus__ = Laya.JGETSET(laya.element.Element, "focus", 1);
    laya.element.Element.bgcolor__ = Laya.JGETSET(laya.element.Element, "bgcolor", 1);
    laya.element.Element.color__ = Laya.JGETSET(laya.element.Element, "color", 1);
    laya.element.Element.left__ = Laya.JGETSET(laya.element.Element, "left", 1, "set_leftex");
    laya.element.Element.top__ = Laya.JGETSET(laya.element.Element, "top", 1, "set_topex");
    laya.element.Element.height__ = Laya.JGETSET(laya.element.Element, "height", 1, "set_heightex");
    laya.element.Element.width__ = Laya.JGETSET(laya.element.Element, "width", 1, "set_widthex");
    laya.element.Element.alpha__ = Laya.JGETSET(laya.element.Element, "alpha", 1);
    laya.element.Element.rotate__ = Laya.JGETSET(laya.element.Element, "rotate", 1);
    laya.element.Element.scalex__ = Laya.JGETSET(laya.element.Element, "scalex", 1);
    laya.element.Element.scaley__ = Laya.JGETSET(laya.element.Element, "scaley", 1);
    laya.element.Element.flip__ = Laya.JGETSET(laya.element.Element, "flip", 1);
    laya.element.Element.scrollLeft__ = Laya.JGETSET(laya.element.Element, "scrollLeft", 1);
    laya.element.Element.scrollTop__ = Laya.JGETSET(laya.element.Element, "scrollTop", 1);
    laya.element.Element.scrollWidth__ = Laya.JGETSET(laya.element.Element, "scrollWidth", 1);
    laya.element.Element.scrollHeight__ = Laya.JGETSET(laya.element.Element, "scrollHeight", 1);
    laya.element.Element.className__ = Laya.JGETSET(laya.element.Element, "className", 1);
    laya.element.Element.zdepth__ = Laya.JGETSET(laya.element.Element, "zdepth", 1);
    laya.element.Element.css_ = Laya.AREG(laya.element.Element, "css", "s s", "css");
    laya.element.Element.cssall_ = Laya.AREG(laya.element.Element, "cssall", "s s", "cssall");
    laya.element.Element.show_ = Laya.AREG(laya.element.Element, "show", "b", "show");
    laya.element.Element.set_showxor_ = Laya.AREG(laya.element.Element, "showxor", "b", "set_showxor");
    laya.element.Element.scrollLeft_ = Laya.AREG(laya.element.Element, "scrollleft", "i", "set_scrollLeft", "get_scrollLeft");
    laya.element.Element.scrollTop_ = Laya.AREG(laya.element.Element, "scrolltop", "i", "set_scrollTop", "get_scrollTop");
    laya.element.Element.scrollto_ = Laya.AREG(laya.element.Element, "scrollto", "i i", "scrollto");
    laya.element.Element.scrolltoex_ = Laya.AREG(laya.element.Element, "scrolltoex", "i i", "scrolltoex");
    laya.element.Element.zdepth_ = Laya.AREG(laya.element.Element, "zdepth", "d");
    laya.element.Element.alpha_ = Laya.AREG(laya.element.Element, "alpha", "d");
    laya.element.Element.rotate_ = Laya.AREG(laya.element.Element, "rotate", "d");
    laya.element.Element.scalex_ = Laya.AREG(laya.element.Element, "scalex", "d");
    laya.element.Element.scaley_ = Laya.AREG(laya.element.Element, "scaley", "d");
    laya.element.Element.set_scale_ = Laya.AREG(laya.element.Element, "scale", "d d", "scale", "scale");
    laya.element.Element.flip_ = Laya.AREG(laya.element.Element, "flip", "i");
    laya.element.Element.pos_ = Laya.AREG(laya.element.Element, "pos", "i i", "pos", "pos");
    laya.element.Element.epos_ = Laya.AREG(laya.element.Element, "epos", "i i", "epos", "epos");
    laya.element.Element.ranpos_ = Laya.AREG(laya.element.Element, "rndpos", "i i i i");
    laya.element.Element.set_left_ = Laya.AREG(laya.element.Element, "left", "x", "set_leftex", "get_left");
    laya.element.Element.set_top_ = Laya.AREG(laya.element.Element, "top", "x", "set_topex", "get_top");
    laya.element.Element.size_ = Laya.AREG(laya.element.Element, "size", "i i", "size");
    laya.element.Element.set_width_ = Laya.AREG(laya.element.Element, "width", "x", "set_widthex", "get_width");
    laya.element.Element.set_height_ = Laya.AREG(laya.element.Element, "height", "x", "set_heightex", "get_height");
    laya.element.Element.bgcolor_ = Laya.AREG(laya.element.Element, "bgcolor", "s");
    laya.element.Element.color_ = Laya.AREG(laya.element.Element, "color", "s");
    laya.element.Element.draggable_ = Laya.AREG(laya.element.Element, "draggable", "s");
    laya.element.Element.animation_ = Laya.AREG(laya.element.Element, "animation", "s t s t I s", "animation");
    laya.element.Element.animationby_ = Laya.AREG(laya.element.Element, "animationby", "s t s t I s", "animationby");
    laya.element.Element.focus_ = Laya.AREG(laya.element.Element, "focus", "b");
    laya.element.Element.playsound_ = Laya.AREG(laya.element.Element, "playsound", "s", "playSound");
    laya.element.Element.ismodalwindow__ = Laya.AREG(laya.element.Element, "ismodalwindow", "b", "set_isModalWindow");
    laya.element.Element.cendertoxy_ = Laya.AREG(laya.element.Element, "centeronce", "s", "centeronce");
    laya.element.Element.class_ = Laya.AREG(laya.element.Element, "class", "s", "set_className", "get_className");
    laya.element.Element.border_ = Laya.AREG(laya.element.Element, "border", "s s s", "border");
    laya.element.Element.__rect = Laya.AREG(laya.element.Element, "rect", "i i i i", "rect");
    laya.element.Element.__moveTo = Laya.AREG(laya.element.Element, "moveto", "d d d s s", "moveTo");
    laya.element.Element.parabola__ = Laya.AREG(laya.element.Element, "parabola", "d d d i s s", "parabola");
    laya.element.Element.mustmouse_ = Laya.AREG(laya.element.Element, "mustmouse", "b");
    laya.element.Element.fullparent_ = Laya.AREG(laya.element.Element, "fullparent", "s", "scaleFullParent");
    laya.element.Element.scale_full_parent = Laya.AREG(laya.element.Element, "scale-full-parent", "s", "scaleFullParent");
    laya.element.Element.cancelBubble_ = Laya.AREG(laya.element.Element, "cancelbubble", "b", "set_cancelBubble");
    copter.ui.GameBody.__MOVEX_SPEED = 0.25;
    copter.ui.GameBody.__ACTIVE_PRESTART__ = 0;
    copter.ui.GameBody.__ACTIVE_STARTWAIT__ = 1;
    copter.ui.GameBody.__ACTIVE_START__ = 2;
    copter.ui.GameBody.__ACTIVE_IN__ = 3;
    copter.ui.GameBody.__ACTIVE_DEADING__ = 4;
    copter.ui.GameBody.__ACTIVE_DEAD__ = 5;
    copter.ui.GameBody.scene = new copter.game2.Scene();
    copter.ui.GameBody._COUNT_ = 6;
    laya.Document._activeNodeCount_ = 0;
    laya.Document.imgtofont_ = Laya.AREG(laya.Document, "imgtofont", "s s i i i i s", "imgtofont");
    laya.css.CSSBackColor.__DEFAULT_ = new laya.css.CSSBackColor(null);
    laya.css.CSSBgImg.__DEFAULT_ = new laya.css.CSSBgImg(null);
    laya.css.CSSBgImg.__DEFAULTPOSTION_ = {
        left: 0,
        top: 0
    };
    laya.css.CSSBgImg.BGIMG_POSITION_LEFT =- 10000000;
    laya.css.CSSBgImg.BGIMG_POSITION_XCENTER =- 10000001;
    laya.css.CSSBgImg.BGIMG_POSITION_RIGHT =- 10000002;
    laya.css.CSSBgImg.BGIMG_POSITION_TOP =- 10000004;
    laya.css.CSSBgImg.BGIMG_POSITION_YCENTER =- 10000005;
    laya.css.CSSBgImg.BGIMG_POSITION_BOTTOM =- 10000006;
    laya.css.CSSBorder.__DEFAULT_ = new laya.css.CSSBorder(null);
    laya.css.CSSPadding.__DEFAULT_ = new laya.css.CSSPadding(null);
    laya.css.CSSMargin.__DEFAULT_ = new laya.css.CSSMargin(null);
    laya.css.CSSExtParam.__DEFAULT_ = new laya.css.CSSExtParam(null);
    laya.css.CSSFont.__ID__ = 0;
    laya.css.CSSFont.__STYLE_NORMAL__ = new laya.utils.XString("normal");
    laya.css.CSSFont.__STYLE_ITALIC__ = new laya.utils.XString("italic");
    laya.css.CSSFont.__STYLE_OBLIQUE__ = new laya.utils.XString("oblique");
    laya.css.CSSFont.TEXT_ALIGN_LEFT = 0;
    laya.css.CSSFont.TEXT_ALIGN_CENTER = 1;
    laya.css.CSSFont.TEXT_ALIGN_RIGHT = 2;
    laya.css.CSSFont.DECORATION_UNDERLINE = 1;
    laya.css.CSSFont.DECORATION_LINE_THROUGH = 2;
    laya.css.CSSFont.DECORATION_OVERLINE = 3;
    laya.css.CSSFont.WHITE_SPACE_NOWARP = 1;
    laya.css.CSSFont.SET_STYLE = 1;
    laya.css.CSSFont.SET_FAMILY = 2;
    laya.css.CSSFont.SET_TEXTBORDER = 4;
    laya.css.CSSFont.SET_COLOR = 8;
    laya.css.CSSFont.SET_SIZE = 16;
    laya.css.CSSFont.SET_TEXTDECORATION = 32;
    laya.css.CSSFont.SET_VARIANT = 64;
    laya.css.CSSFont.SET_WEIGHT = 128;
    laya.css.CSSFont.SET_TEXTINDENT = 256;
    laya.css.CSSFont.SET_TEXTALIGN = 512;
    laya.css.CSSFont.SET_LINESPACING = 1024;
    laya.css.CSSFont.SET_WORDSPACING = 2048;
    laya.css.CSSFont.SET_LETTERSPACING = 4096;
    laya.css.CSSFont.SET_WHITESPACE = 8192;
    laya.css.CSSFont.SET_IMGIDSPRE = 16384;
    laya.css.CSSFont.SET_LINEHEIGHT = 32768;
    laya.css.CSSFont.SET_PASSWORD = 65536;
    laya.css.CSSMethod._WIDTH_HEIGHT_STR_ = ",width,height,left,top";
    laya.css.CSSTransform.__DEFAULT_ = new laya.css.CSSTransform(null);
    laya.css.CSSTransform._TRANSFORMORIGIN_ = {
        x: 1,
        y: 1,
        xx: 0,
        yy: 0
    };
    laya.css.CSSStyleDeclaration.left__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "left", 1);
    laya.css.CSSStyleDeclaration.top__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "top", 1);
    laya.css.CSSStyleDeclaration.width__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "width", 1);
    laya.css.CSSStyleDeclaration.height__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "height", 1);
    laya.css.CSSStyleDeclaration.zIndex__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "zIndex", 1);
    laya.css.CSSStyleDeclaration.scalex__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "scalex", 1);
    laya.css.CSSStyleDeclaration.scaley__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "scaley", 1);
    laya.css.CSSStyleDeclaration.scalexy__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "scalexy", 1);
    laya.css.CSSStyleDeclaration.rotate__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "rotate", 1);
    laya.css.CSSStyleDeclaration.globalCompositeOperation__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "globalCompositeOperation", 1);
    laya.css.CSSStyleDeclaration.sound__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "sound", 1);
    laya.css.CSSStyleDeclaration.flip__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "flip", 1);
    laya.css.CSSStyleDeclaration.alpha__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "alpha", 1);
    laya.css.CSSStyleDeclaration.visibility__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "visibility", 1);
    laya.css.CSSStyleDeclaration.display__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "display", 1);
    laya.css.CSSStyleDeclaration.color__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "color", 1);
    laya.css.CSSStyleDeclaration.background__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "background", 1);
    laya.css.CSSStyleDeclaration.cssFloat__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "cssFloat", 1);
    laya.css.CSSStyleDeclaration.verticalAlign__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "verticalAlign", 1);
    laya.css.CSSStyleDeclaration.lineHeight__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "lineHeight", 1);
    laya.css.CSSStyleDeclaration.textAlign__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "textAlign", 1);
    laya.css.CSSStyleDeclaration.fontWeight__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "fontWeight", 1);
    laya.css.CSSStyleDeclaration.fontSize__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "fontSize", 1);
    laya.css.CSSStyleDeclaration.textIndent__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "textIndent", 1);
    laya.css.CSSStyleDeclaration.family__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "family", 1);
    laya.css.CSSStyleDeclaration.whiteSpace__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "whiteSpace", 1);
    laya.css.CSSStyleDeclaration.letterSpacing__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "letterSpacing", 1);
    laya.css.CSSStyleDeclaration.lineSpacing__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "lineSpacing", 1);
    laya.css.CSSStyleDeclaration.block__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "block", 1);
    laya.css.CSSStyleDeclaration.paddingLeft__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "paddingLeft", 1);
    laya.css.CSSStyleDeclaration.paddingBottom__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "paddingBottom", 1);
    laya.css.CSSStyleDeclaration.paddingRight__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "paddingRight", 1);
    laya.css.CSSStyleDeclaration.paddingTop__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "paddingTop", 1);
    laya.css.CSSStyleDeclaration.pageWidth__ = Laya.JGETSET(laya.css.CSSStyleDeclaration, "pageWidth", 1);
    laya.css.CSSStyleDeclaration._DEFAULT_ = new laya.css.CSSStyleDeclaration(null, 0);
    laya.css.CSSStyleDeclaration.CSS_CLIP_X = 1024;
    laya.css.CSSStyleDeclaration.CSS_CLIP_Y = 2048;
    laya.css.CSSStyleDeclaration.CSS_FIX_RATIO_W = 4096;
    laya.css.CSSStyleDeclaration.CSS_FIX_RATIO_H = 8192;
    laya.css.CSSStyleDeclaration.CSS_BLOCK = 16384;
    laya.css.CSSStyleDeclaration.CSS_WIDTH = 32768;
    laya.css.CSSStyleDeclaration.CSS_HEIGHT = 65536;
    laya.css.CSSStyleDeclaration.CSS_POSIOTION_A = 131072;
    laya.css.CSSStyleDeclaration.CSS_DISPLAY_NONE = 262144;
    laya.css.CSSStyleDeclaration.CSS_HIDE = 524288;
    laya.css.CSSStyleDeclaration.CSS_LIGHT = 1048576;
    laya.css.CSSStyleDeclaration.CSS_BREAK = 2097152;
    laya.css.CSSStyleDeclaration.CSS_WIDTH_AUTO = 4194304;
    laya.css.CSSStyleDeclaration.CSS_HEIGHT_AUTO = 8388608;
    laya.css.CSSStyleDeclaration.CSS_ISBOX = 16777216;
    laya.css.CSSStyleDeclaration.CSS_WIDTH_D = 33554432;
    laya.css.CSSStyleDeclaration.CSS_HEIGHT_D = 67108864;
    laya.css.CSSStyleDeclaration.CSS_LEFT_D = 134217728;
    laya.css.CSSStyleDeclaration.CSS_TOP_D = 268435456;
    laya.css.CSSStyleDeclaration.CSS_MAX = 1073741824;
    laya.css.CSSStyleDeclaration.FLOAT_LEFT = 1;
    laya.css.CSSStyleDeclaration.FLOAT_RIGHT = 3;
    laya.css.CSSStyleDeclaration.VERTICALALIGN_TOP = 1;
    laya.css.CSSStyleDeclaration.VERTICALALIGN_MIDDLE = 2;
    laya.css.CSSStyleDeclaration.VERTICALALIGN_BOTTOM = 3;
    laya.css.CSSStyleDeclaration.fixt_ = Laya.AREG(laya.css.CSSStyleDeclaration, "fix-ratio", "s", "setFixRatio");
    laya.css.CSSStyleDeclaration.transform_ = Laya.AREG(laya.css.CSSStyleDeclaration, "transform", "s", "set_transform");
    laya.css.CSSStyleDeclaration.overflow_ = Laya.AREG(laya.css.CSSStyleDeclaration, "overflow", "s", "setOverflow");
    laya.css.CSSStyleDeclaration.set_text_decoration_ = Laya.AREG(laya.css.CSSStyleDeclaration, "text-decoration", "s s", "textDecoration");
    laya.css.CSSStyleDeclaration.translate_ = Laya.AREG(laya.css.CSSStyleDeclaration, "translate", "i i", "translate");
    laya.css.CSSStyleDeclaration.set_padding_ = Laya.AREG(laya.css.CSSStyleDeclaration, "padding", "i i i i", "padding");
    laya.css.CSSStyleDeclaration.set_scale_ = Laya.AREG(laya.css.CSSStyleDeclaration, "scale", "d d", "scale");
    laya.css.CSSStyleDeclaration.animation_ = Laya.AREG(laya.css.CSSStyleDeclaration, "animation", "s t s t I s", "animation");
    laya.css.CSSStyleDeclaration.animationby_ = Laya.AREG(laya.css.CSSStyleDeclaration, "animationby", "s t s t I s", "animationby");
    laya.css.CSSStyleDeclaration.set_margin_ = Laya.AREG(laya.css.CSSStyleDeclaration, "margin", "i i i i", "margin");
    laya.css.CSSStyleDeclaration.set_margin_left = Laya.AREG(laya.css.CSSStyleDeclaration, "margin-left", "i", "set_marginLeft", "get_marginLeft");
    laya.css.CSSStyleDeclaration.set_margin_top = Laya.AREG(laya.css.CSSStyleDeclaration, "margin-top", "i", "set_marginTop", "get_marginTop");
    laya.css.CSSStyleDeclaration.set_margin_right = Laya.AREG(laya.css.CSSStyleDeclaration, "margin-right", "i", "set_marginRight", "get_marginRight");
    laya.css.CSSStyleDeclaration.set_margin_bottom = Laya.AREG(laya.css.CSSStyleDeclaration, "margin-bottom", "i", "set_marginBottom", "get_marginBottom");
    laya.css.CSSStyleDeclaration.lightrgb_ = Laya.AREG(laya.css.CSSStyleDeclaration, "light", "d d d", "light");
    laya.css.CSSStyleDeclaration.gray_ = Laya.AREG(laya.css.CSSStyleDeclaration, "gray", "d", "gray");
    laya.css.CSSStyleDeclaration.set_border_ = Laya.AREG(laya.css.CSSStyleDeclaration, "border", "s s s", "border");
    laya.css.CSSStyleDeclaration.set_box_shadow_ = Laya.AREG(laya.css.CSSStyleDeclaration, "box-shadow", "s i i i s s", "boxShadow");
    laya.css.CSSStyleDeclaration.set_border_radius_ = Laya.AREG(laya.css.CSSStyleDeclaration, "border-radius", "s s s s", "borderRadius");
    laya.css.CSSStyleDeclaration.clearDynamic_ = Laya.AREG(laya.css.CSSStyleDeclaration, "clear-dynamic", "s", "clearDynamic");
    laya.css.CSSStyleDeclaration.set_position_ = Laya.AREG(laya.css.CSSStyleDeclaration, "position", "s", "position");
    laya.css.CSSStyleDeclaration.set_width_ = Laya.AREG(laya.css.CSSStyleDeclaration, "width", "x");
    laya.css.CSSStyleDeclaration.transformOrigin_ = Laya.AREG(laya.css.CSSStyleDeclaration, "transform-origin", "s", "set_transform_origin", "get_transform_origin");
    laya.css.CSSStyleDeclaration.rotate_ = Laya.AREG(laya.css.CSSStyleDeclaration, "rotate", "d");
    laya.css.CSSStyleDeclaration.set_scalexy_ = Laya.AREG(laya.css.CSSStyleDeclaration, "scalexy", "d", "set_scalexy", "get_scalexy");
    laya.css.CSSStyleDeclaration.set_scaley_ = Laya.AREG(laya.css.CSSStyleDeclaration, "scaley", "d");
    laya.css.CSSStyleDeclaration.set_scale_y_ = Laya.AREG(laya.css.CSSStyleDeclaration, "scale-y", "d", "set_scaley", "get_scaley");
    laya.css.CSSStyleDeclaration.set_scalex_ = Laya.AREG(laya.css.CSSStyleDeclaration, "scalex", "d");
    laya.css.CSSStyleDeclaration.set_scale_x_ = Laya.AREG(laya.css.CSSStyleDeclaration, "scale-x", "d", "set_scalex", "get_scalex");
    laya.css.CSSStyleDeclaration.set_bottomt_ = Laya.AREG(laya.css.CSSStyleDeclaration, "bottom", "x");
    laya.css.CSSStyleDeclaration.set_rightt_ = Laya.AREG(laya.css.CSSStyleDeclaration, "right", "x");
    laya.css.CSSStyleDeclaration.set_top_ = Laya.AREG(laya.css.CSSStyleDeclaration, "top", "x");
    laya.css.CSSStyleDeclaration.set_left_ = Laya.AREG(laya.css.CSSStyleDeclaration, "left", "x");
    laya.css.CSSStyleDeclaration.set_pos_ = Laya.AREG(laya.css.CSSStyleDeclaration, "pos", "d d", "pos");
    laya.css.CSSStyleDeclaration.s_visibility_ = Laya.AREG(laya.css.CSSStyleDeclaration, "visibility", "s");
    laya.css.CSSStyleDeclaration.display_ = Laya.AREG(laya.css.CSSStyleDeclaration, "display", "s");
    laya.css.CSSStyleDeclaration.globalCompositeOperation_ = Laya.AREG(laya.css.CSSStyleDeclaration, "globalcompositeoperation", "s", "set_globalCompositeOperation", "get_globalCompositeOperation");
    laya.css.CSSStyleDeclaration.composite_ = Laya.AREG(laya.css.CSSStyleDeclaration, "composite", "s", "set_globalCompositeOperation", "get_globalCompositeOperation");
    laya.css.CSSStyleDeclaration.alpha_ = Laya.AREG(laya.css.CSSStyleDeclaration, "alpha", "d");
    laya.css.CSSStyleDeclaration.set_background_ = Laya.AREG(laya.css.CSSStyleDeclaration, "background", "s");
    laya.css.CSSStyleDeclaration.set_background_img_ = Laya.AREG(laya.css.CSSStyleDeclaration, "background-image", "s", "set_background_image");
    laya.css.CSSStyleDeclaration.set_background_color_ = Laya.AREG(laya.css.CSSStyleDeclaration, "background-color", "s", "set_background_color");
    laya.css.CSSStyleDeclaration.set_float_ = Laya.AREG(laya.css.CSSStyleDeclaration, "float", "s", "set_cssFloat");
    laya.css.CSSStyleDeclaration.set_whiteSpace_ = Laya.AREG(laya.css.CSSStyleDeclaration, "white-space", "s", "set_whiteSpace");
    laya.css.CSSStyleDeclaration.set_textborder_ = Laya.AREG(laya.css.CSSStyleDeclaration, "text-border", "s s s", "set_textBorder");
    laya.css.CSSStyleDeclaration.set_clip__ = Laya.AREG(laya.css.CSSStyleDeclaration, "clip", "b b", "set_clip");
    laya.css.CSSStyleDeclaration.set_family__ = Laya.AREG(laya.css.CSSStyleDeclaration, "font-family", "s", "set_family");
    laya.css.CSSStyleDeclaration.set_fontSize_ = Laya.AREG(laya.css.CSSStyleDeclaration, "font-size", "i", "set_fontSize", "get_fontSize");
    laya.css.CSSStyleDeclaration.textIndent_ = Laya.AREG(laya.css.CSSStyleDeclaration, "text-indent", "i", "set_textIndent", "get_textIndent");
    laya.css.CSSStyleDeclaration.set_font_weight_ = Laya.AREG(laya.css.CSSStyleDeclaration, "font-weight", "s", "set_fontWeight");
    laya.css.CSSStyleDeclaration.set_textAlign_ = Laya.AREG(laya.css.CSSStyleDeclaration, "text-align", "s", "set_textAlign", "get_textAlign");
    laya.css.CSSStyleDeclaration.set_lineHeight_ = Laya.AREG(laya.css.CSSStyleDeclaration, "line-height", "i", "set_lineHeight", "get_lineHeight");
    laya.css.CSSStyleDeclaration.set_color_ = Laya.AREG(laya.css.CSSStyleDeclaration, "color", "s", "set_color", "get_color");
    laya.css.CSSStyleDeclaration.set_lineSpacing_ = Laya.AREG(laya.css.CSSStyleDeclaration, "line-spacing", "i", "set_lineSpacing", "get_lineSpacing");
    laya.css.CSSStyleDeclaration.letter_spacing_ = Laya.AREG(laya.css.CSSStyleDeclaration, "letter-spacing", "i", "set_letterSpacing", "get_letterSpacing");
    laya.css.CSSStyleDeclaration.set_verticalAlign_ = Laya.AREG(laya.css.CSSStyleDeclaration, "vertical-align", "s", "set_verticalAlign", "get_verticalAlign");
    laya.css.CSSStyleDeclaration.set_paddingLeft_ = Laya.AREG(laya.css.CSSStyleDeclaration, "padding-left", "i", "set_paddingLeft", "get_paddingLeft");
    laya.css.CSSStyleDeclaration.set_paddingBottom_ = Laya.AREG(laya.css.CSSStyleDeclaration, "padding-bottom", "i", "set_paddingBottom", "get_paddingBottom");
    laya.css.CSSStyleDeclaration.set_paddingRight_ = Laya.AREG(laya.css.CSSStyleDeclaration, "padding-right", "i", "set_paddingRight", "get_paddingRight");
    laya.css.CSSStyleDeclaration.set_paddingTop_ = Laya.AREG(laya.css.CSSStyleDeclaration, "padding-top", "i", "set_paddingTop", "get_paddingTop");
    laya.css.CSSStyleDeclaration.set_pageWidth_ = Laya.AREG(laya.css.CSSStyleDeclaration, "page-width", "s", "set_pageWidth", "get_pageWidth");
    laya.css.CSSStyleDeclaration.set_min_height_ = Laya.AREG(laya.css.CSSStyleDeclaration, "min-height", "i", "set_min_height", "get_min_height");
    laya.css.CSSStyleDeclaration.set_min_width_ = Laya.AREG(laya.css.CSSStyleDeclaration, "min-width", "i", "set_min_width", "get_min_width");
    laya.css.CSSStyleDeclaration.set_max_height_ = Laya.AREG(laya.css.CSSStyleDeclaration, "max-height", "i", "set_max_height", "get_max_height");
    laya.css.CSSStyleDeclaration.set_max_width_ = Laya.AREG(laya.css.CSSStyleDeclaration, "max-width", "i", "set_max_width", "get_max_width");
    laya.css.CSSStyleDeclaration.set_height_ = Laya.AREG(laya.css.CSSStyleDeclaration, "height", "x");
    laya.css.CSSStyleDeclaration.zindex_ = Laya.AREG(laya.css.CSSStyleDeclaration, "z-index", "i", "set_zIndex", "get_zIndex");
    laya.css.CSSStyleDeclaration.flip_ = Laya.AREG(laya.css.CSSStyleDeclaration, "flip", "i");
    laya.css.CSSStyleDeclaration.font_ = Laya.AREG(laya.css.CSSStyleDeclaration, "font", "s s s s", "setFont", "getFont");
    laya.css.CSSStyleDeclaration.sound_ = Laya.AREG(laya.css.CSSStyleDeclaration, "sound", "s");
    laya.css.CSSStyleDeclaration.scale_full_parent = Laya.AREG(laya.css.CSSStyleDeclaration, "scale-full-parent", "s", "scaleFullParent");
    laya.css.DynamicData._DynamicData_ = new laya.css.DynamicData();
    laya.device.Screen.sized = false;
    laya.display.Canvas.__ID__ = 0;
    laya.display.Canvas._ACTIVECOUNT_ = 0;
    laya.display.Canvas._DISABLETIMEOUTRELEASE_ = 10000;
    laya.display.Canvas._CANVASACTIVE_ = [];
    laya.display.Canvas._AREA_ = 0;
    laya.display.Context._DEFAULT_ = new laya.display.Context();
    laya.display.RenderHtml._RENDERCOUNT_ = 0;
    laya.display.RenderHtml.var_paint_filter_onpaint = laya.display.RenderHtml._paint_filter_onpaint;
    laya.display.RenderHtml.var_paint_filter_static_img = laya.display.RenderHtml._paint_filter_static_img;
    laya.display.RenderHtml.var_paint_scale_alpha_img = laya.display.RenderHtml._paint_scale_alpha_img;
    laya.display.RenderHtml.var_paint_transform_static_text = laya.display.RenderHtml._paint_transform_static_text;
    laya.display.RenderHtml.var_paint_sacle_alpha_text = laya.display.RenderHtml._paint_sacle_alpha_text;
    laya.display.RenderHtml.var_paint_filter_static_img_childs = laya.display.RenderHtml._paint_filter_static_img_childs;
    laya.display.RenderHtml.var_paint_simple_filter_childs = laya.display.RenderHtml._paint_simple_filter_childs;
    laya.display.RenderHtml.var_paint_childs_ex_ = laya.display.RenderHtml._paint_childs_ex_;
    laya.display.RenderHtml.var_paint_transform_alpha_img_onpaint = laya.display.RenderHtml._paint_transform_alpha_img_onpaint;
    laya.display.RenderHtml.var_paint_transform_alpha_onpaint = laya.display.RenderHtml._paint_transform_alpha_onpaint;
    laya.display.RenderHtml.var_paint_filter_transform_alpha_img_onpaint = laya.display.RenderHtml._paint_filter_transform_alpha_img_onpaint;
    laya.display.RenderHtml.var_paint_scale_alpha_onpaint = laya.display.RenderHtml._paint_scale_alpha_onpaint;
    laya.display.method.ClipRect.__cache__ = [];
    laya.display.method.RenderMethod.var_base_simple_childs_notxt = laya.display.method.RenderMethod.base_simple_childs_notxt;
    laya.display.method.RenderMethod.var_base_simple_childs = laya.display.method.RenderMethod.base_simple_childs;
    laya.display.method.RenderMethod.var_base_base_childs = laya.display.method.RenderMethod.base_base_childs;
    laya.display.method.RenderMethod.var_paint_img_onpaint = laya.display.method.RenderMethod.paint_img_onpaint;
    laya.display.method.RenderMethod.var_base_onpaint = laya.display.method.RenderMethod.base_onpaint;
    laya.display.method.RenderMethod.var_base_static_img = laya.display.method.RenderMethod.base_static_img;
    laya.display.method.RenderMethod.var_base_static_text = laya.display.method.RenderMethod.base_static_text;
    laya.display.method.RenderMethod.var_base_static_img_childs = laya.display.method.RenderMethod.base_static_img_childs;
    laya.display.method.RenderMethod.var_base_none = laya.display.method.RenderMethod.base_none;
    laya.element.AnimationData._DEFAULT_ = new laya.element.AnimationData();
    laya.element.Animation.totalframes__ = Laya.JGETSET(laya.element.Animation, "totalframes", 1);
    laya.element.Animation.speed__ = Laya.JGETSET(laya.element.Animation, "speed", 1);
    laya.element.Animation.count__ = Laya.JGETSET(laya.element.Animation, "count", 1);
    laya.element.Animation.playindex__ = Laya.JGETSET(laya.element.Animation, "playindex", 1);
    laya.element.Animation.index__ = Laya.JGETSET(laya.element.Animation, "startindex", 1);
    laya.element.Animation.endindex__ = Laya.JGETSET(laya.element.Animation, "endindex", 1);
    laya.element.Animation.pause__ = Laya.JGETSET(laya.element.Animation, "pause", 1);
    laya.element.Animation.frames__ = Laya.JGETSET(laya.element.Animation, "frames", 1);
    laya.element.Animation.totalframes_ = Laya.AREG(laya.element.Animation, "totalframes", "i");
    laya.element.Animation.speed_ = Laya.AREG(laya.element.Animation, "speed", "d");
    laya.element.Animation.count_ = Laya.AREG(laya.element.Animation, "count", "i");
    laya.element.Animation.startindex_ = Laya.AREG(laya.element.Animation, "startindex", "i");
    laya.element.Animation.playindex_ = Laya.AREG(laya.element.Animation, "playindex", "i");
    laya.element.Animation.endindex_ = Laya.AREG(laya.element.Animation, "endindex", "i");
    laya.element.Animation.needupdate_ = Laya.AREG(laya.element.Animation, "needupdate", "b", "set_needupdate", null);
    laya.element.Animation.enddel_ = Laya.AREG(laya.element.Animation, "enddel", "b");
    laya.element.Animation.pause_ = Laya.AREG(laya.element.Animation, "pause", "b");
    laya.element.Anitemplate.__Anitemplates__ = new laya.utils.StringMap();
    laya.element.Anitemplate.totalframes_ = Laya.AREG(laya.element.Anitemplate, "totalframes", "i");
    laya.element.Anitemplate.filestranslate_ = Laya.AREG(laya.element.Anitemplate, "filestranslate", "s");
    laya.element.Anitemplate.frames__ = Laya.AREG(laya.element.Anitemplate, "frames", "s");
    laya.element.Anitemplate.speed__ = Laya.AREG(laya.element.Anitemplate, "speed", "d");
    laya.element.Anitemplate.size__ = Laya.AREG(laya.element.Anitemplate, "size", "i i");
    laya.element.Anitemplate.style_ = Laya.AREG(laya.element.Anitemplate, "style", "s", "set_style");
    laya.element.Anitemplate.class_ = Laya.AREG(laya.element.Anitemplate, "class", "s", "set_className");
    laya.element.Assembly.__AssemblyArray__ = new laya.utils.StringMap();
    laya.utils.LayaTimer._isLongOrShortTimeNum = 80;
    laya.utils.LayaTimer.CHECKDELAY = 80;
    laya.event.EventListenerList.__DEFAULT_ = new laya.event.EventListenerList(null);
    laya.element.Audio.__NULLAUDIO__ = new laya.element.Audio();
    laya.element.Audio._muted_ = false;
    laya.element.Audio._musicmuted_ = false;
    laya.element.Audio._AUTOPLAY_ = 1;
    laya.element.Audio._LOOP_ = 2;
    laya.element.Audio._PRELOAD_ = 4;
    laya.element.Audio._MUSIC_ = 8;
    laya.element.Audio.enddel_ = Laya.AREG(laya.element.Audio, "enddel", "b", "set_enddel");
    laya.element.Audio.type_ = Laya.AREG(laya.element.Audio, "type", "i", "set_type");
    laya.element.Audio.music_ = Laya.AREG(laya.element.Audio, "music", "s");
    laya.element.Audio.autoplay_ = Laya.AREG(laya.element.Audio, "autoplay", "b");
    laya.element.Audio.loop_ = Laya.AREG(laya.element.Audio, "loop", "b");
    laya.element.Audio.preload_ = Laya.AREG(laya.element.Audio, "preload", "b");
    laya.element.CanvasNode.__MODE_DISABLE = 0;
    laya.element.CanvasNode.__MODE_NORMAL = 1;
    laya.element.CanvasNode.__MODE_STATIC = 2;
    laya.element.CanvasNode.__MODE_FAKE = 3;
    laya.element.CanvasNode.reference_ = Laya.AREG(laya.element.CanvasNode, "reference", "s");
    laya.element.CanvasNode.enableTimeoutRelease_ = Laya.AREG(laya.element.CanvasNode, "enabletimeoutrelease", "b", "enableTimeoutRelease", null);
    laya.element.CanvasNode.__mode = Laya.AREG(laya.element.CanvasNode, "mode", "s", null, null);
    laya.element.Button.TYPE_BUTTON = 0;
    laya.element.Button.TYPE_CHECKBOX = 1;
    laya.element.Button.TYPE_RADIO = 2;
    laya.element.Button.PRESS_MOUSEDOWN = 1;
    laya.element.Button.PRESS_MOUSEUP = 2;
    laya.element.Button.PRESS_SINGLETOUCHUP = 3;
    laya.element.Button._TYPE_ = {
        button: 0,
        check: 1,
        radio: 2,
        name: ["button", "check", "radio"]
    };
    laya.element.Button.checked__ = Laya.JGETSET(laya.element.Button, "checked", 1);
    laya.element.Button.type_ = Laya.AREG(laya.element.Button, "type", "s", "set_type");
    laya.element.Button.normal = Laya.AREG(laya.element.Button, "normalimg", "s", "normalimg");
    laya.element.Button.disableimg_ = Laya.AREG(laya.element.Button, "disabledimg", "s", "disabledimg");
    laya.element.Button.pressimg_ = Laya.AREG(laya.element.Button, "pressedimg", "s", "pressedimg");
    laya.element.Button.overimg_ = Laya.AREG(laya.element.Button, "overimg", "s", "overimg");
    laya.element.Button.checkedimg_ = Laya.AREG(laya.element.Button, "checkedimg", "s", "checkedimg");
    laya.element.Button.normalcss_ = Laya.AREG(laya.element.Button, "normalcss", "s", "normalcss");
    laya.element.Button.disablecss_ = Laya.AREG(laya.element.Button, "disabledcss", "s", "disabledcss");
    laya.element.Button.presscss_ = Laya.AREG(laya.element.Button, "pressedcss", "s", "pressedcss");
    laya.element.Button.overcss_ = Laya.AREG(laya.element.Button, "overcss", "s", "overcss");
    laya.element.Button.checkedcss_ = Laya.AREG(laya.element.Button, "checkedcss", "s", "checkedcss");
    laya.element.Button.presswith_ = Laya.AREG(laya.element.Button, "presswith", "s", "presswith");
    laya.element.Button.onchecked_ = Laya.AREG(laya.element.Button, "onchecked", "s");
    laya.element.Button.onunchecked_ = Laya.AREG(laya.element.Button, "onunchecked", "s");
    laya.element.Button.relate_ = Laya.AREG(laya.element.Button, "relate", "s b");
    laya.element.Button.checked_ = Laya.AREG(laya.element.Button, "checked", "b");
    laya.element.ConditionalComments.condition_ = Laya.AREG(laya.element.ConditionalComments, "condition", "s");
    laya.element.ExternalLink.linkPool = [];
    laya.element.ExternalLink.___href = Laya.AREG(laya.element.ExternalLink, "href", "s");
    laya.element.FileNode.type_ = Laya.AREG(laya.element.FileNode, "type", "s", null, null);
    laya.element.FileNode.with_ = Laya.AREG(laya.element.FileNode, "with", "s", null, null);
    laya.element.FileNode.preload_ = Laya.AREG(laya.element.FileNode, "preload", "b", null, null);
    laya.element.FileNode.withdata_ = Laya.AREG(laya.element.FileNode, "withdata", "s", "set_withdata", null);
    laya.element.Iframe.timeractive_ = Laya.AREG(laya.element.Iframe, "timeractive", "b");
    laya.element.Iframe.activename_ = Laya.AREG(laya.element.Iframe, "activename", "s");
    laya.element.Iframe.fullscreen_ = Laya.AREG(laya.element.Iframe, "fullscreen", "b");
    laya.element.ImagesPack.__ImagesPack__ = new laya.utils.StringMap();
    laya.element.ImagesPack.mustloadimg_ = Laya.AREG(laya.element.ImagesPack, "mustloadimg", "b");
    laya.element.ImportOnce._ImportOnce_ = new laya.utils.StringMap();
    laya.element.Input.__INPUT_WORDTYPE_NUMBERS__ = 16;
    laya.element.Input._REG_NUMBERONLY_ = new laya.utils.LaRegExp("[^\\d\\.-]+?", "g");
    laya.element.Input.__maxlength = Laya.AREG(laya.element.Input, "maxlength", "i");
    laya.element.Input.type_ = Laya.AREG(laya.element.Input, "type", "s");
    laya.element.Input.readonly__ = Laya.AREG(laya.element.Input, "readonly", "b");
    laya.element.Input._information__ = Laya.AREG(laya.element.Input, "information", "s", "set_information");
    laya.element.Input.numberonly__ = Laya.AREG(laya.element.Input, "numberonly", "b", "setNumberonly");
    laya.element.Input.maxnum__ = Laya.AREG(laya.element.Input, "maxnum", "d", "setMaxNum");
    laya.element.Input.minnum__ = Laya.AREG(laya.element.Input, "minnum", "d", "setMinNum");
    laya.element.Link._linkfiles_ = new laya.utils.StringMap();
    laya.element.Link.includeonce_ = Laya.AREG(laya.element.Link, "includeonce", "b");
    laya.element.Link.set_type_ = Laya.AREG(laya.element.Link, "type", "s", "set_type");
    laya.element.Link.set_href_ = Laya.AREG(laya.element.Link, "href", "s", "set_href");
    laya.element.Link.set_rel_ = Laya.AREG(laya.element.Link, "rel", "s", "set_rel");
    laya.element.Link.set_lockfile_ = Laya.AREG(laya.element.Link, "lockfile", "s", "set_lockfile");
    laya.element.Meta.title_ = Laya.AREG(laya.element.Meta, "title", "s");
    laya.element.Meta.sz_ = Laya.AREG(laya.element.Meta, "size", "i i");
    laya.element.ScrollBar.set_scrolltype_ = Laya.AREG(laya.element.ScrollBar, "scrolltype", "s");
    laya.element.ScrollBar.set_alphasetp_ = Laya.AREG(laya.element.ScrollBar, "alphasetp", "d");
    laya.element.ScrollBar.set_minalpha_ = Laya.AREG(laya.element.ScrollBar, "minalpha", "d");
    laya.element.ScrollBar.set_staticMidBarSize_ = Laya.AREG(laya.element.ScrollBar, "staticmidbarsize", "d", "set_staticMidBarSize");
    laya.element.ScrollBar.set_target_ = Laya.AREG(laya.element.ScrollBar, "target", "s");
    laya.element.Style._RegExp_ = new laya.utils.LaRegExp("([#\\.]?.*?)(\\s*)\\{(\\s*)([\\s\\S]*?)(\\s*)\\}", "ig");
    laya.element.Style._RegExp2_ = new laya.utils.LaRegExp("\\s", "g");
    laya.element.Wait.set_sleep_ = Laya.AREG(laya.element.Wait, "sleep", "i", "set_sleep", null);
    laya.element.Wait.set_continue_ = Laya.AREG(laya.element.Wait, "continue", "s", "set_continue", null);
    laya.element.WebSocket.__setdefaultip = Laya.AREG(laya.element.WebSocket, "defaultip", "s s");
    laya.element.action.Intepretor.__fnsmap__ = {
        linear: laya.element.action.Intepretor.linear,
        'ease-in': laya.element.action.Intepretor.ease_in,
        'ease-out': laya.element.action.Intepretor.ease_out,
        'ease-in-out': laya.element.action.Intepretor.ease_in_out,
        'ease-exp-in': laya.element.action.Intepretor.ease_exp_in,
        'ease-exp-out': laya.element.action.Intepretor.ease_exp_out,
        'ease-exp-in-out': laya.element.action.Intepretor.ease_exp_in_out,
        'ease-sin-in': laya.element.action.Intepretor.ease_sin_in,
        'ease-sin-out': laya.element.action.Intepretor.ease_sin_out,
        'ease-sin-in-out': laya.element.action.Intepretor.ease_sin_in_out,
        'ease-elastic-in': laya.element.action.Intepretor.ease_elastic_in,
        'ease-elastic-out': laya.element.action.Intepretor.ease_elastic_out,
        'ease-elastic-in-out': laya.element.action.Intepretor.ease_elastic_in_out,
        'ease-bounce-in': laya.element.action.Intepretor.ease_bounce_in,
        'ease-bounce-out': laya.element.action.Intepretor.ease_bounce_out,
        'ease-bounce-in-out': laya.element.action.Intepretor.ease_bounce_in_out,
        'ease-back-in': laya.element.action.Intepretor.ease_back_in,
        'ease-back-out': laya.element.action.Intepretor.ease_back_out,
        'ease-back-in-out': laya.element.action.Intepretor.ease_back_in_out
    };
    laya.element.action.Action._Intepretor_ = new laya.element.action.Intepretor();
    laya.element.action.ActionKeyFrames.__ActionKeyFrameMap__ = new laya.utils.StringMap();
    laya.element.action.ActionPropety.__ActionPropety__ = [];
    laya.element.method.DragCtrl_Move.DRAG_MOVE = 0;
    laya.element.method.DragCtrl_Move.DRAG_RESIZE = 1;
    laya.element.method.EditCursor.cursorColor = "#00FF00";
    laya.element.method.EditCursor.cursorWidth = 2;
    laya.element.method.EditCursor.showDelay = 400;
    laya.element.method.EditCursor.showCursor = true;
    laya.element.method.EditCursor._preShowCursorTime_ = 0;
    laya.element.method.NodeExtData.___DEFAULT__ = new laya.element.method.NodeExtData(null);
    laya.element.method.TextMethod._WORDSIZEMAP_ = new laya.utils.StringMap();
    laya.event.EventDriver.APP_TOUCH_DOWN = 0;
    laya.event.EventDriver.APP_TOUCH_UP = 1;
    laya.event.EventDriver.APP_TOUCH_MOV = 2;
    laya.event.EventDriver.APP_TOUCH_PT_DOWN = 5;
    laya.event.EventDriver.APP_TOUCH_PT_UP = 6;
    laya.event.EventDriver.m_vTouchs = [];
    laya.event.EventDriver._mousepress_ = 0;
    laya.event.EventListener._ID_ = 0;
    laya.event.EventMgr._eventMgr_ = new laya.event.EventMgr();
    laya.event.EventMgr._enabledrag_tm_ = 40;
    laya.event.EventMgr._enabledrag_size_ = 1;
    laya.event.KeyEvent.keyboardState = new laya.utils.IntMap();
    laya.event.KeyEvent.ONKEYDOWN = 1;
    laya.event.KeyEvent.ONKEYUP = 2;
    laya.event.KeyEvent.ONKEYCHAR = 3;
    laya.event.KeyEvent.KEYCODE_BACKSPACE = 8;
    laya.event.KeyEvent.KEYCODE_TAB = 9;
    laya.event.KeyEvent.KEYCODE_CLEAR = 12;
    laya.event.KeyEvent.KEYCODE_ENTER = 13;
    laya.event.KeyEvent.KEYCODE_SHIFT_L = 16;
    laya.event.KeyEvent.KEYCODE_CONTROL_L = 17;
    laya.event.KeyEvent.KEYCODE_ALT_L = 18;
    laya.event.KeyEvent.KEYCODE_PAUSE = 19;
    laya.event.KeyEvent.KEYCODE_ESCAPE = 27;
    laya.event.KeyEvent.KEYCODE_SPACE = 32;
    laya.event.KeyEvent.KEYCODE_PRIOR = 33;
    laya.event.KeyEvent.KEYCODE_NEXT = 34;
    laya.event.KeyEvent.KEYCODE_END = 35;
    laya.event.KeyEvent.KEYCODE_HOME = 36;
    laya.event.KeyEvent.KEYCODE_SELECT = 41;
    laya.event.KeyEvent.KEYCODE_PRINT = 42;
    laya.event.KeyEvent.KEYCODE_EXECUTE = 43;
    laya.event.KeyEvent.KEYCODE_INSERT = 45;
    laya.event.KeyEvent.KEYCODE_DELETE = 46;
    laya.event.KeyEvent.KEYCODE_HELP = 47;
    laya.event.KeyEvent.KEYCODE_KP_MULTIPLY = 106;
    laya.event.KeyEvent.KEYCODE_KP_ADD = 107;
    laya.event.KeyEvent.KEYCODE_KP_SEPARATOR = 108;
    laya.event.KeyEvent.KEYCODE_KP_SUBTRACT = 109;
    laya.event.KeyEvent.KEYCODE_KP_DECIMAL = 110;
    laya.event.KeyEvent.KEYCODE_KP_DIVIDE = 111;
    laya.event.KeyEvent.KEYCODE_A = 65;
    laya.event.KeyEvent.KEYCODE_B = 66;
    laya.event.KeyEvent.KEYCODE_C = 67;
    laya.event.KeyEvent.KEYCODE_D = 68;
    laya.event.KeyEvent.KEYCODE_E = 69;
    laya.event.KeyEvent.KEYCODE_F = 70;
    laya.event.KeyEvent.KEYCODE_G = 71;
    laya.event.KeyEvent.KEYCODE_H = 72;
    laya.event.KeyEvent.KEYCODE_I = 73;
    laya.event.KeyEvent.KEYCODE_J = 74;
    laya.event.KeyEvent.KEYCODE_K = 75;
    laya.event.KeyEvent.KEYCODE_L = 76;
    laya.event.KeyEvent.KEYCODE_M = 77;
    laya.event.KeyEvent.KEYCODE_N = 78;
    laya.event.KeyEvent.KEYCODE_O = 79;
    laya.event.KeyEvent.KEYCODE_P = 80;
    laya.event.KeyEvent.KEYCODE_Q = 81;
    laya.event.KeyEvent.KEYCODE_R = 82;
    laya.event.KeyEvent.KEYCODE_S = 83;
    laya.event.KeyEvent.KEYCODE_T = 84;
    laya.event.KeyEvent.KEYCODE_U = 85;
    laya.event.KeyEvent.KEYCODE_V = 86;
    laya.event.KeyEvent.KEYCODE_W = 87;
    laya.event.KeyEvent.KEYCODE_X = 88;
    laya.event.KeyEvent.KEYCODE_Y = 89;
    laya.event.KeyEvent.KEYCODE_Z = 90;
    laya.event.KeyEvent.KEYCODE_KP_0 = 96;
    laya.event.KeyEvent.KEYCODE_KP_1 = 97;
    laya.event.KeyEvent.KEYCODE_KP_2 = 98;
    laya.event.KeyEvent.KEYCODE_KP_3 = 99;
    laya.event.KeyEvent.KEYCODE_KP_4 = 100;
    laya.event.KeyEvent.KEYCODE_KP_5 = 101;
    laya.event.KeyEvent.KEYCODE_KP_6 = 102;
    laya.event.KeyEvent.KEYCODE_KP_7 = 103;
    laya.event.KeyEvent.KEYCODE_KP_8 = 104;
    laya.event.KeyEvent.KEYCODE_KP_49 = 105;
    laya.event.KeyEvent.KEYCODE_F1 = 112;
    laya.event.KeyEvent.KEYCODE_F2 = 113;
    laya.event.KeyEvent.KEYCODE_F3 = 114;
    laya.event.KeyEvent.KEYCODE_F4 = 115;
    laya.event.KeyEvent.KEYCODE_F5 = 116;
    laya.event.KeyEvent.KEYCODE_F6 = 117;
    laya.event.KeyEvent.KEYCODE_F7 = 118;
    laya.event.KeyEvent.KEYCODE_F8 = 119;
    laya.event.KeyEvent.KEYCODE_F9 = 120;
    laya.event.KeyEvent.KEYCODE_F10 = 121;
    laya.event.KeyEvent.KEYCODE_F11 = 122;
    laya.event.KeyEvent.KEYCODE_F12 = 123;
    laya.event.KeyEvent.KEYCODE_LEFT = 37;
    laya.event.KeyEvent.KEYCODE_TOP = 38;
    laya.event.KeyEvent.KEYCODE_RIGHT = 39;
    laya.event.KeyEvent.KEYCODE_BOTTOM = 40;
    laya.event.MouseEvent.AT_TARGET = 2;
    laya.event.MouseEvent.BLUR = 8192;
    laya.event.MouseEvent.BUBBLING_PHASE = 3;
    laya.event.MouseEvent.CAPTURING_PHASE = 1;
    laya.event.MouseEvent.CHANGE = 32768;
    laya.event.MouseEvent.CLICK = 64;
    laya.event.MouseEvent.DBCLICK = 127;
    laya.event.MouseEvent.DBLCLICK = 128;
    laya.event.MouseEvent.DRAGDROP = 2048;
    laya.event.MouseEvent.FOCUS = 4096;
    laya.event.MouseEvent.KEYDOWN = 256;
    laya.event.MouseEvent.KEYPRESS = 1024;
    laya.event.MouseEvent.KEYUP = 512;
    laya.event.MouseEvent.MOUSEDOWN = 1;
    laya.event.MouseEvent.MOUSEDRAG = 32;
    laya.event.MouseEvent.MOUSEMOVE = 16;
    laya.event.MouseEvent.MOUSEOUT = 8;
    laya.event.MouseEvent.MOUSEOVER = 4;
    laya.event.MouseEvent.MOUSEUP = 2;
    laya.event.MouseEvent.ONSINGLETOUCHUP = 30;
    laya.event.MouseEvent.NONE = 0;
    laya.event.MouseEvent.SELECT = 16384;
    laya.event.MouseEvent.WHEEL = 16385;
    laya.event.MouseEvent.TOUCHINGCOUNT = 0;
    laya.fir.Fir.SHAKE_THRESHOLD = 800;
    laya.fir.Fir.last_update = 0.0;
    laya.flash.FlashAudio.ms_vMapAudio = new laya.utils.FloatMap();
    laya.flash.FlashAudio.ms_nAudioID = 0;
    laya.flash.FlashCanvas.ms_nCanvasID = 1;
    laya.flash.FlashFakeCanvas.ms_nFakeCanvasID = 0;
    laya.flash.FlashImage.ms_nImageID = 0;
    laya.flash.FlashWebSocket.ms_vSocket = new haxe.ds.IntMap();
    laya.flash.LayaFlashConch.sep5 = " ";
    laya.flash.LayaFlashConch.sep4 = " ";
    laya.io.File.FILETYPE_TEXT_MERGE = 1;
    laya.io.File.FILETYPE_TEXT_MERGE_STR = "text/merge";
    laya.io.File.FILETYPE_IMAGE = 2;
    laya.io.File.FILETYPE_IMAGE_STR = "image";
    laya.io.File.FILETYPE_TEXT = 3;
    laya.io.File.FILETYPE_TEXT_STR = "text";
    laya.io.File.FILETYPE_DEFAULT = 100;
    laya.io.File.LOAD_STATE_ERR =- 1;
    laya.io.File.LOAD_STATE_NO = 0;
    laya.io.File.LOAD_STATE_RELEASE = 1;
    laya.io.File.LOAD_STATE_LOADING = 2;
    laya.io.File.LOAD_STATE_LOADED = 3;
    laya.io.File._COUNTS_ = 0;
    laya.io.FileFactory._files = new laya.utils.StringMapArray();
    laya.io.FileFactory._vrfiles = new laya.utils.StringMap();
    laya.io.FileFactory._precheckFilesIndex_ = 0;
    laya.io.FileFactory._LOADINGCOUNTS_ = 0;
    laya.xhtml.HtmlCompileNode._nodeClassMap_ = new laya.utils.StringMap();
    laya.xhtml.HtmlParse._htmlToDomRegExp_ = new laya.utils.LaRegExp("</?|/?>|=(?='|)|[\\w\\u4e00-\\u9fa5\\uFE30-\\uFFA0]+|(([\\S\\s]*?)|('[\\S\\s]*?'))", "g");
    laya.xhtml.HtmlParse._getClassRegExp_ = new laya.utils.LaRegExp("\\s*class\\s*=\\s*['\"]([^'\"]+)['\"]", "g");
    laya.xhtml.HtmlParse._textcache_ = [];
    laya.xhtml.HtmlParse._isNormalText_ = new laya.utils.LaRegExp("\\S", "g");
    laya.xhtml.HtmlParse._splitAttributes_ = new laya.utils.LaRegExp("(\\s*)(\\w+)\\s*(=)\\s*((?:\"[^\"]*\"|'[^']*'))", "g");
    laya.xhtml.HtmlParse.__ID__ = 0;
    laya.xhtml.HtmlLayout.MAX_WIDTH = 100000;
    laya.xhtml.HtmlLayout._typesetList = [];
    laya.xhtml.HtmlLayout._typesetCount_ = 0;
    laya.xhtml.HtmlLayout._tmppoint_ = {
        w: 0,
        h: 0
    };
    Laya.main();
})();

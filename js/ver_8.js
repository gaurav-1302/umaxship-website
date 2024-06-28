(function (a) {
  typeof define == "function" && define.amd
    ? define(["jquery"], a)
    : typeof module == "object" && module.exports
    ? (module.exports = a(require("jquery")))
    : a(window.jQuery);
})(function (a) {
  "use strict";
  function t(b) {
    var a = {},
      c;
    return (
      b.selectionStart === void 0
        ? (b.focus(),
          (c = document.selection.createRange()),
          (a.length = c.text.length),
          c.moveStart("character", -b.value.length),
          (a.end = c.text.length),
          (a.start = a.end - a.length))
        : ((a.start = b.selectionStart),
          (a.end = b.selectionEnd),
          (a.length = a.end - a.start)),
      a
    );
  }
  function e(a, c, d) {
    if (a.selectionStart === void 0) {
      a.focus();
      var b = a.createTextRange();
      b.collapse(!0),
        b.moveEnd("character", d),
        b.moveStart("character", c),
        b.select();
    } else (a.selectionStart = c), (a.selectionEnd = d);
  }
  function s(c, b) {
    a.each(b, function (a, d) {
      typeof d == "function"
        ? (b[a] = d(c, b, a))
        : typeof c.autoNumeric[d] == "function" &&
          (b[a] = c.autoNumeric[d](c, b, a));
    });
  }
  function h(a, b) {
    typeof a[b] == "string" && (a[b] *= 1);
  }
  function p(i, a) {
    var b, c, e, f, d, g;
    return (
      s(i, a),
      (a.tagList = [
        "b",
        "caption",
        "cite",
        "code",
        "dd",
        "del",
        "div",
        "dfn",
        "dt",
        "em",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "ins",
        "kdb",
        "label",
        "li",
        "output",
        "p",
        "q",
        "s",
        "sample",
        "span",
        "strong",
        "td",
        "th",
        "u",
        "var",
      ]),
      (b = a.vMax.toString().split(".")),
      (c = !a.vMin && a.vMin !== 0 ? [] : a.vMin.toString().split(".")),
      h(a, "vMax"),
      h(a, "vMin"),
      h(a, "mDec"),
      (a.mDec = a.mRound === "CHF" ? "2" : a.mDec),
      (a.allowLeading = !0),
      (a.aNeg = a.vMin < 0 ? "-" : ""),
      (b[0] = b[0].replace("-", "")),
      (c[0] = c[0].replace("-", "")),
      (a.mInt = Math.max(b[0].length, c[0].length, 1)),
      a.mDec === null &&
        ((e = 0),
        (f = 0),
        b[1] && (e = b[1].length),
        c[1] && (f = c[1].length),
        (a.mDec = Math.max(e, f))),
      a.altDec === null &&
        a.mDec > 0 &&
        (a.aDec === "." && a.aSep !== ","
          ? (a.altDec = ",")
          : a.aDec === "," && a.aSep !== "." && (a.altDec = ".")),
      (d = a.aNeg ? "([-\\" + a.aNeg + "]?)" : "(-?)"),
      (a.aNegRegAutoStrip = d),
      (a.skipFirstAutoStrip = new RegExp(
        d +
          "[^-" +
          (a.aNeg ? "\\" + a.aNeg : "") +
          "\\" +
          a.aDec +
          "\\d]" +
          ".*?(\\d|\\" +
          a.aDec +
          "\\d)"
      )),
      (a.skipLastAutoStrip = new RegExp(
        "(\\d\\" + a.aDec + "?)[^\\" + a.aDec + "\\d]\\D*$"
      )),
      (g = "-" + a.aNum + "\\" + a.aDec),
      (a.allowedAutoStrip = new RegExp("[^" + g + "]", "gi")),
      (a.numRegAutoStrip = new RegExp(
        d +
          "(?:\\" +
          a.aDec +
          "?(\\d+\\" +
          a.aDec +
          "\\d+)|(\\d*(?:\\" +
          a.aDec +
          "\\d*)?))"
      )),
      a
    );
  }
  function b(b, a, e) {
    var d, c, g, f;
    if (a.aSign) while (b.indexOf(a.aSign) > -1) b = b.replace(a.aSign, "");
    return (
      (b = b.replace(a.skipFirstAutoStrip, "$1$2")),
      (b = b.replace(a.skipLastAutoStrip, "$1")),
      (b = b.replace(a.allowedAutoStrip, "")),
      a.altDec && (b = b.replace(a.altDec, a.aDec)),
      (d = b.match(a.numRegAutoStrip)),
      (b = d ? [d[1], d[2], d[3]].join("") : ""),
      (a.lZero === "allow" || a.lZero === "keep") &&
        e !== "strip" &&
        ((c = []),
        (g = ""),
        (c = b.split(a.aDec)),
        c[0].indexOf("-") !== -1 && ((g = "-"), (c[0] = c[0].replace("-", ""))),
        c[0].length > a.mInt &&
          c[0].charAt(0) === "0" &&
          (c[0] = c[0].slice(1)),
        (b = g + c.join(a.aDec))),
      ((e && a.lZero === "deny") ||
        (e && a.lZero === "allow" && a.allowLeading === !1)) &&
        ((f =
          "^" +
          a.aNegRegAutoStrip +
          "0*(\\d" +
          (e === "leading" ? ")" : "|$)")),
        (f = new RegExp(f)),
        (b = b.replace(f, "$1$2"))),
      b
    );
  }
  function j(a, b) {
    if (b.pSign === "p") {
      var c = b.nBracket.split(",");
      !b.hasFocus && !b.removeBrackets
        ? ((a = a.replace(b.aNeg, "")), (a = c[0] + a + c[1]))
        : ((b.hasFocus && a.charAt(0) === c[0]) ||
            (b.removeBrackets && a.charAt(0) === c[0])) &&
          ((a = a.replace(c[0], b.aNeg)), (a = a.replace(c[1], "")));
    }
    return a;
  }
  function n(a, d) {
    var c, b;
    return (
      a &&
        ((c = +a),
        c < 1e-6 && c > -1
          ? ((a = +a),
            a < 1e-6 &&
              a > 0 &&
              ((a = (a + 10).toString()), (a = a.substring(1))),
            a < 0 &&
              a > -1 &&
              ((a = (a - 10).toString()), (a = "-" + a.substring(2))),
            (a = a.toString()))
          : ((b = a.split(".")),
            b[1] !== void 0 &&
              (+b[1] === 0
                ? (a = b[0])
                : ((b[1] = b[1].replace(/0*$/, "")), (a = b.join(".")))))),
      d.lZero === "keep" ? a : a.replace(/^0*(\d)/, "$1")
    );
  }
  function k(a, b, c) {
    return (
      b && b !== "." && (a = a.replace(b, ".")),
      c && c !== "-" && (a = a.replace(c, "-")),
      a.match(/\d/) || (a += "0"),
      a
    );
  }
  function r(a, b, c) {
    return (
      c && c !== "-" && (a = a.replace("-", c)),
      b && b !== "." && (a = a.replace(".", b)),
      a
    );
  }
  function f(a, b, c) {
    return a === "" || a === b.aNeg
      ? b.wEmpty === "zero"
        ? a + "0"
        : b.wEmpty === "sign" || c
        ? a + b.aSign
        : a
      : null;
  }
  function i(c, a) {
    var i, h, e, d, g, k;
    if (
      ((c = b(c, a)), (i = c.replace(",", ".")), (h = f(c, a, !0)), h !== null)
    )
      return h;
    if (
      ((e = ""),
      a.dGroup === 2
        ? (e = /(\d)((\d)(\d{2}?)+)$/)
        : a.dGroup === 4
        ? (e = /(\d)((\d{4}?)+)$/)
        : (e = /(\d)((\d{3}?)+)$/),
      (d = c.split(a.aDec)),
      a.altDec && d.length === 1 && (d = c.split(a.altDec)),
      (g = d[0]),
      a.aSep)
    )
      while (e.test(g)) g = g.replace(e, "$1" + a.aSep + "$2");
    return (
      a.mDec !== 0 && d.length > 1
        ? (d[1].length > a.mDec && (d[1] = d[1].substring(0, a.mDec)),
          (c = g + a.aDec + d[1]))
        : (c = g),
      a.aSign &&
        ((k = c.indexOf(a.aNeg) !== -1),
        (c = c.replace(a.aNeg, "")),
        (c = a.pSign === "p" ? a.aSign + c : c + a.aSign),
        k && (c = a.aNeg + c)),
      i < 0 && a.nBracket !== null && (c = j(c, a)),
      c
    );
  }
  function g(b, a) {
    var c, e, f, i, p, m, q, k, n, j, g, d, o, l;
    if (
      ((b = b === "" ? "0" : b.toString()),
      h(a, "mDec"),
      a.mRound === "CHF" && (b = (Math.round(b * 20) / 20).toString()),
      (c = ""),
      (e = 0),
      (f = ""),
      (i =
        typeof a.aPad == "boolean" || a.aPad === null
          ? a.aPad
            ? a.mDec
            : 0
          : +a.aPad),
      (p = function (a) {
        var b =
          i === 0
            ? /(\.(?:\d*[1-9])?)0*$/
            : i === 1
            ? /(\.\d(?:\d*[1-9])?)0*$/
            : new RegExp("(\\.\\d{" + i + "}(?:\\d*[1-9])?)0*$");
        return (
          (a = a.replace(b, "$1")), i === 0 && (a = a.replace(/\.$/, "")), a
        );
      }),
      b.charAt(0) === "-" && ((f = "-"), (b = b.replace("-", ""))),
      b.match(/^\d/) || (b = "0" + b),
      f === "-" && +b === 0 && (f = ""),
      ((+b > 0 && a.lZero !== "keep") ||
        (b.length > 0 && a.lZero === "allow")) &&
        (b = b.replace(/^0*(\d)/, "$1")),
      (m = b.lastIndexOf(".")),
      (q = m === -1 ? b.length - 1 : m),
      (k = b.length - 1 - q),
      k <= a.mDec)
    ) {
      if (((c = b), k < i))
        for (m === -1 && (c += a.aDec), n = "000000"; k < i; )
          (n = n.substring(0, i - k)), (c += n), (k += n.length);
      else
        k > i ? (c = p(c)) : k === 0 && i === 0 && (c = c.replace(/\.$/, ""));
      if (a.mRound !== "CHF") return +c === 0 ? c : f + c;
      a.mRound === "CHF" && ((m = c.lastIndexOf(".")), (b = c));
    }
    if (
      ((j = m + a.mDec),
      (g = +b.charAt(j + 1)),
      (d = b.substring(0, j + 1).split("")),
      (o = b.charAt(j) === "." ? b.charAt(j - 1) % 2 : b.charAt(j) % 2),
      (l = !0),
      o !== 1 && (o = o === 0 && b.substring(j + 2, b.length) > 0 ? 1 : 0),
      (g > 4 && a.mRound === "S") ||
        (g > 4 && a.mRound === "A" && f === "") ||
        (g > 5 && a.mRound === "A" && f === "-") ||
        (g > 5 && a.mRound === "s") ||
        (g > 5 && a.mRound === "a" && f === "") ||
        (g > 4 && a.mRound === "a" && f === "-") ||
        (g > 5 && a.mRound === "B") ||
        (g === 5 && a.mRound === "B" && o === 1) ||
        (g > 0 && a.mRound === "C" && f === "") ||
        (g > 0 && a.mRound === "F" && f === "-") ||
        (g > 0 && a.mRound === "U") ||
        a.mRound === "CHF")
    )
      for (e = d.length - 1; e >= 0; e -= 1)
        if (d[e] !== ".") {
          if (a.mRound === "CHF" && d[e] <= 2 && l) {
            (d[e] = 0), (l = !1);
            break;
          }
          if (a.mRound === "CHF" && d[e] <= 7 && l) {
            (d[e] = 5), (l = !1);
            break;
          }
          if (
            (a.mRound === "CHF" && l
              ? ((d[e] = 10), (l = !1))
              : (d[e] = +d[e] + 1),
            d[e] < 10)
          )
            break;
          e > 0 && (d[e] = "0");
        }
    return (d = d.slice(0, j + 1)), (c = p(d.join(""))), +c === 0 ? c : f + c;
  }
  function o(a, d, f) {
    var e = d.aDec,
      c = d.mDec,
      b;
    return (
      (a = f === "paste" ? g(a, d) : a),
      e &&
        c &&
        ((b = a.split(e)),
        b[1] &&
          b[1].length > c &&
          (c > 0
            ? ((b[1] = b[1].substring(0, c)), (a = b.join(e)))
            : (a = b[0]))),
      a
    );
  }
  function l(a, c) {
    (a = b(a, c)), (a = o(a, c)), (a = k(a, c.aDec, c.aNeg));
    var d = +a;
    return d >= c.vMin && d <= c.vMax;
  }
  function q(b, c) {
    (this.settings = c),
      (this.that = b),
      (this.$that = a(b)),
      (this.formatted = !1),
      (this.settingsClone = p(this.$that, this.settings)),
      (this.value = b.value);
  }
  q.prototype = {
    init: function (a) {
      (this.value = this.that.value),
        (this.settingsClone = p(this.$that, this.settings)),
        (this.ctrlKey = a.ctrlKey),
        (this.cmdKey = a.metaKey),
        (this.shiftKey = a.shiftKey),
        (this.selection = t(this.that)),
        (a.type === "keydown" || a.type === "keyup") &&
          (this.kdCode = a.keyCode),
        (this.which = a.which),
        (this.processed = !1),
        (this.formatted = !1);
    },
    setSelection: function (a, b, c) {
      (a = Math.max(a, 0)),
        (b = Math.min(b, this.that.value.length)),
        (this.selection = { start: a, end: b, length: b - a }),
        (c === void 0 || c) && e(this.that, a, b);
    },
    setPosition: function (a, b) {
      this.setSelection(a, a, b);
    },
    getBeforeAfter: function () {
      var a = this.value,
        b = a.substring(0, this.selection.start),
        c = a.substring(this.selection.end, a.length);
      return [b, c];
    },
    getBeforeAfterStriped: function () {
      var a = this.getBeforeAfter();
      return (
        (a[0] = b(a[0], this.settingsClone)),
        (a[1] = b(a[1], this.settingsClone)),
        a
      );
    },
    normalizeParts: function (a, c) {
      var d = this.settingsClone,
        g,
        e,
        f;
      return (
        (c = b(c, d)),
        (g = !!c.match(/^\d/) || "leading"),
        (a = b(a, d, g)),
        (a === "" || a === d.aNeg) &&
          d.lZero === "deny" &&
          c > "" &&
          (c = c.replace(/^0*(\d)/, "$1")),
        (e = a + c),
        d.aDec &&
          ((f = e.match(new RegExp("^" + d.aNegRegAutoStrip + "\\" + d.aDec))),
          f && ((a = a.replace(f[1], f[1] + "0")), (e = a + c))),
        d.wEmpty === "zero" && (e === d.aNeg || e === "") && (a += "0"),
        [a, c]
      );
    },
    setValueParts: function (g, e, f) {
      var c = this.settingsClone,
        d = this.normalizeParts(g, e),
        a = d.join(""),
        b = d[0].length;
      return (
        !!l(a, c) &&
        ((a = o(a, c, f)),
        b > a.length && (b = a.length),
        (this.value = a),
        this.setPosition(b, !1),
        !0)
      );
    },
    signPosition: function () {
      var a = this.settingsClone,
        d = a.aSign,
        b = this.that,
        c,
        f,
        e;
      return d
        ? ((c = d.length), a.pSign === "p")
          ? ((f = a.aNeg && b.value && b.value.charAt(0) === a.aNeg),
            f ? [1, c + 1] : [0, c])
          : ((e = b.value.length), [e - c, e])
        : [1e3, -1];
    },
    expandSelectionOnSign: function (c) {
      var a = this.signPosition(),
        b = this.selection;
      b.start < a[1] &&
        b.end > a[0] &&
        ((b.start < a[0] || b.end > a[1]) &&
        this.value
          .substring(Math.max(b.start, a[0]), Math.min(b.end, a[1]))
          .match(/^\s*$/)
          ? b.start < a[0]
            ? this.setSelection(b.start, a[0], c)
            : this.setSelection(a[1], b.end, c)
          : this.setSelection(
              Math.min(b.start, a[0]),
              Math.max(b.end, a[1]),
              c
            ));
    },
    checkPaste: function () {
      if (this.valuePartsBeforePaste !== void 0) {
        var a = this.getBeforeAfter(),
          c = this.valuePartsBeforePaste;
        delete this.valuePartsBeforePaste,
          (a[0] =
            a[0].substr(0, c[0].length) +
            b(a[0].substr(c[0].length), this.settingsClone)),
          this.setValueParts(a[0], a[1], "paste") ||
            ((this.value = c.join("")), this.setPosition(c[0].length, !1));
      }
    },
    skipAllways: function (b) {
      var a = this.kdCode,
        g = this.which,
        c = this.ctrlKey,
        d = this.cmdKey,
        i = this.shiftKey,
        f,
        e,
        h;
      return ((c || d) &&
        b.type === "keyup" &&
        this.valuePartsBeforePaste !== void 0) ||
        (i && a === 45)
        ? (this.checkPaste(), !1)
        : !!(
            (a >= 112 && a <= 123) ||
            (a >= 91 && a <= 93) ||
            (a >= 9 && a <= 31) ||
            (a < 8 && (g === 0 || g === a)) ||
            a === 144 ||
            a === 145 ||
            a === 45 ||
            a === 224
          ) ||
            !!((c || d) && a === 65) ||
            ((c || d) && (a === 67 || a === 86 || a === 88)
              ? (b.type === "keydown" && this.expandSelectionOnSign(),
                (a === 86 || a === 45) &&
                  (b.type === "keydown" || b.type === "keypress"
                    ? this.valuePartsBeforePaste === void 0 &&
                      (this.valuePartsBeforePaste = this.getBeforeAfter())
                    : this.checkPaste()),
                b.type === "keydown" || b.type === "keypress" || a === 67)
              : !!(c || d) ||
                (a === 37 || a === 39
                  ? ((f = this.settingsClone.aSep),
                    (e = this.selection.start),
                    (h = this.that.value),
                    b.type === "keydown" &&
                      f &&
                      !this.shiftKey &&
                      (a === 37 && h.charAt(e - 2) === f
                        ? this.setPosition(e - 1)
                        : a === 39 &&
                          h.charAt(e + 1) === f &&
                          this.setPosition(e + 1)),
                    !0)
                  : !!(a >= 34 && a <= 40)));
    },
    processAllways: function () {
      var a;
      return (
        !!(this.kdCode === 8 || this.kdCode === 46) &&
        (this.selection.length
          ? (this.expandSelectionOnSign(!1),
            (a = this.getBeforeAfterStriped()),
            this.setValueParts(a[0], a[1]))
          : ((a = this.getBeforeAfterStriped()),
            this.kdCode === 8
              ? (a[0] = a[0].substring(0, a[0].length - 1))
              : (a[1] = a[1].substring(1, a[1].length)),
            this.setValueParts(a[0], a[1])),
        !0)
      );
    },
    processKeypress: function () {
      var a = this.settingsClone,
        d = String.fromCharCode(this.which),
        e = this.getBeforeAfterStriped(),
        b = e[0],
        c = e[1];
      return d === a.aDec ||
        (a.altDec && d === a.altDec) ||
        ((d === "." || d === ",") && this.kdCode === 110)
        ? !!(!a.mDec || !a.aDec) ||
            !!(a.aNeg && c.indexOf(a.aNeg) > -1) ||
            b.indexOf(a.aDec) > -1 ||
            c.indexOf(a.aDec) > 0 ||
            (c.indexOf(a.aDec) === 0 && (c = c.substr(1)),
            this.setValueParts(b + a.aDec, c),
            !0)
        : d === "-" || d === "+"
        ? !a.aNeg ||
          (b === "" &&
            c.indexOf(a.aNeg) > -1 &&
            ((b = a.aNeg), (c = c.substring(1, c.length))),
          b.charAt(0) === a.aNeg
            ? (b = b.substring(1, b.length))
            : (b = d === "-" ? a.aNeg + b : b),
          this.setValueParts(b, c),
          !0)
        : !(d >= "0" && d <= "9") ||
          (a.aNeg &&
            b === "" &&
            c.indexOf(a.aNeg) > -1 &&
            ((b = a.aNeg), (c = c.substring(1, c.length))),
          a.vMax <= 0 &&
            a.vMin < a.vMax &&
            this.value.indexOf(a.aNeg) === -1 &&
            d !== "0" &&
            (b = a.aNeg + b),
          this.setValueParts(b + d, c),
          !0);
    },
    formatQuick: function () {
      var a = this.settingsClone,
        b = this.getBeforeAfterStriped(),
        h = this.value,
        f,
        j,
        c,
        e,
        g,
        d,
        l,
        k;
      if (
        ((a.aSep === "" || (a.aSep !== "" && h.indexOf(a.aSep) === -1)) &&
          (a.aSign === "" || (a.aSign !== "" && h.indexOf(a.aSign) === -1)) &&
          ((f = []),
          (j = ""),
          (f = h.split(a.aDec)),
          f[0].indexOf("-") > -1 &&
            ((j = "-"),
            (f[0] = f[0].replace("-", "")),
            (b[0] = b[0].replace("-", ""))),
          f[0].length > a.mInt &&
            b[0].charAt(0) === "0" &&
            (b[0] = b[0].slice(1)),
          (b[0] = j + b[0])),
        (c = i(this.value, this.settingsClone)),
        (e = c.length),
        c)
      ) {
        (g = b[0].split("")), (d = 0);
        for (d; d < g.length; d += 1) g[d].match("\\d") || (g[d] = "\\" + g[d]);
        (l = new RegExp("^.*?" + g.join(".*?"))),
          (k = c.match(l)),
          k
            ? ((e = k[0].length),
              ((e === 0 && c.charAt(0) !== a.aNeg) ||
                (e === 1 && c.charAt(0) === a.aNeg)) &&
                a.aSign &&
                a.pSign === "p" &&
                (e =
                  this.settingsClone.aSign.length +
                  (c.charAt(0) === "-" ? 1 : 0)))
            : a.aSign && a.pSign === "s" && (e -= a.aSign.length);
      }
      (this.that.value = c), this.setPosition(e), (this.formatted = !0);
    },
  };
  function d(b) {
    return (
      typeof b == "string" &&
        ((b = b.replace(/\[/g, "\\[").replace(/\]/g, "\\]")),
        (b = "#" + b.replace(/(:|\.)/g, "\\$1"))),
      a(b)
    );
  }
  function c(c, d, e) {
    var a = c.data("autoNumeric"),
      b;
    return (
      a || ((a = {}), c.data("autoNumeric", a)),
      (b = a.holder),
      ((b === void 0 && d) || e) && ((b = new q(c.get(0), d)), (a.holder = b)),
      b
    );
  }
  var m = {
    init: function (d) {
      return this.each(function () {
        var h = a(this),
          n = h.data("autoNumeric"),
          q = h.data(),
          p = h.is(
            "input[type=text], input[type=hidden], input[type=tel], input:not([type])"
          ),
          m,
          o;
        if (typeof n != "object")
          (n = a.extend({}, a.fn.autoNumeric.defaults, q, d, {
            aNum: "0123456789",
            hasFocus: !1,
            removeBrackets: !1,
            runOnce: !1,
            tagList: [
              "b",
              "caption",
              "cite",
              "code",
              "dd",
              "del",
              "div",
              "dfn",
              "dt",
              "em",
              "h1",
              "h2",
              "h3",
              "h4",
              "h5",
              "h6",
              "ins",
              "kdb",
              "label",
              "li",
              "output",
              "p",
              "q",
              "s",
              "sample",
              "span",
              "strong",
              "td",
              "th",
              "u",
              "var",
            ],
          })),
            n.aDec === n.aSep &&
              a.error(
                "autoNumeric will not function properly when the decimal character aDec: '" +
                  n.aDec +
                  "' and thousand separator aSep: '" +
                  n.aSep +
                  "' are the same character"
              ),
            h.data("autoNumeric", n);
        else return this;
        (m = c(h, n)),
          !p &&
            h.prop("tagName").toLowerCase() === "input" &&
            a.error(
              'The input type "' +
                h.prop("type") +
                '" is not supported by autoNumeric()'
            ),
          a.inArray(h.prop("tagName").toLowerCase(), n.tagList) === -1 &&
            h.prop("tagName").toLowerCase() !== "input" &&
            a.error(
              "The <" +
                h.prop("tagName").toLowerCase() +
                "> is not supported by autoNumeric()"
            ),
          n.runOnce === !1 &&
            n.aForm &&
            (p &&
              ((o = !0),
              h[0].value === "" &&
                n.wEmpty === "empty" &&
                ((h[0].value = ""), (o = !1)),
              h[0].value === "" &&
                n.wEmpty === "sign" &&
                ((h[0].value = n.aSign), (o = !1)),
              o &&
                h.val() !== "" &&
                ((n.anDefault === null &&
                  h[0].value === h.prop("defaultValue")) ||
                  (n.anDefault !== null &&
                    n.anDefault.toString() === h.val())) &&
                h.autoNumeric("set", h.val())),
            a.inArray(h.prop("tagName").toLowerCase(), n.tagList) !== -1 &&
              h.text() !== "" &&
              h.autoNumeric("set", h.text())),
          (n.runOnce = !0),
          h.is(
            "input[type=text], input[type=hidden], input[type=tel], input:not([type])"
          ) &&
            (h.on("keydown.autoNumeric", function (b) {
              return (
                (m = c(h)),
                m.settings.aDec === m.settings.aSep &&
                  a.error(
                    "autoNumeric will not function properly when the decimal character aDec: '" +
                      m.settings.aDec +
                      "' and thousand separator aSep: '" +
                      m.settings.aSep +
                      "' are the same character"
                  ),
                m.that.readOnly
                  ? ((m.processed = !0), !0)
                  : (m.init(b), m.skipAllways(b))
                  ? ((m.processed = !0), !0)
                  : m.processAllways()
                  ? ((m.processed = !0),
                    m.formatQuick(),
                    b.preventDefault(),
                    !1)
                  : ((m.formatted = !1), !0)
              );
            }),
            h.on("keypress.autoNumeric", function (a) {
              m = c(h);
              var b = m.processed;
              if ((m.init(a), m.skipAllways(a))) return !0;
              if (b) return a.preventDefault(), !1;
              if (m.processAllways() || m.processKeypress())
                return m.formatQuick(), a.preventDefault(), !1;
              m.formatted = !1;
            }),
            h.on("keyup.autoNumeric", function (a) {
              (m = c(h)), m.init(a);
              var b = m.skipAllways(a),
                d = m.kdCode;
              if (
                ((m.kdCode = 0),
                delete m.valuePartsBeforePaste,
                h[0].value === m.settings.aSign
                  ? m.settings.pSign === "s"
                    ? e(this, 0, 0)
                    : e(this, m.settings.aSign.length, m.settings.aSign.length)
                  : d === 9 &&
                    m.settings.nBracket !== null &&
                    h[0].value !== m.settings.aSign &&
                    e(this, 0, h.val().length),
                b)
              )
                return !0;
              if (this.value === "") return !0;
              m.formatted || m.formatQuick();
            }),
            h.on("focusin.autoNumeric", function (e) {
              var a, d, b;
              (m = c(h)),
                (a = m.settingsClone),
                (a.hasFocus = !0),
                a.nBracket !== null && ((d = h.val()), h.val(j(d, a))),
                (m.inVal = h.val()),
                (b = f(m.inVal, a, !0)),
                b !== null && b !== "" && h.val(b);
            }),
            h.on("focusout.autoNumeric", function (o) {
              var d, a, n, j, e;
              (m = c(h)),
                (d = m.settingsClone),
                (a = h.val()),
                (n = a),
                (d.hasFocus = !1),
                (j = ""),
                d.lZero === "allow" && ((d.allowLeading = !1), (j = "leading")),
                a !== "" &&
                  ((a = b(a, d, j)),
                  f(a, d) === null && l(a, d, h[0])
                    ? ((a = k(a, d.aDec, d.aNeg)),
                      (a = g(a, d)),
                      (a = r(a, d.aDec, d.aNeg)))
                    : (a = "")),
                (e = f(a, d, !1)),
                e === null && (e = i(a, d)),
                (e !== m.inVal || e !== n) &&
                  (h.val(e), h.change(), delete m.inVal);
            }));
      });
    },
    destroy: function () {
      return a(this).each(function () {
        var b = a(this);
        b.removeData("autoNumeric"), b.off("autoNumeric");
      });
    },
    update: function (b) {
      return a(this).each(function () {
        var f = d(a(this)),
          e = f.data("autoNumeric"),
          g;
        if (
          (typeof e != "object" &&
            a.error(
              "You must initialize autoNumeric('init', {options}) prior to calling the 'update' method"
            ),
          (g = f.autoNumeric("get")),
          (e = a.extend(e, b)),
          c(f, e, !0),
          e.aDec === e.aSep &&
            a.error(
              "autoNumeric will not function properly when the decimal character aDec: '" +
                e.aDec +
                "' and thousand separator aSep: '" +
                e.aSep +
                "' are the same character"
            ),
          f.data("autoNumeric", e),
          f.val() !== "" || f.text() !== "")
        )
          return f.autoNumeric("set", g);
      });
    },
    set: function (b) {
      if (b === null || isNaN(b)) return;
      return a(this).each(function () {
        var f = d(a(this)),
          e = f.data("autoNumeric"),
          c = b.toString(),
          h = b.toString(),
          j = f.is(
            "input[type=text], input[type=hidden], input[type=tel], input:not([type])"
          );
        return (
          typeof e != "object" &&
            a.error(
              "You must initialize autoNumeric('init', {options}) prior to calling the 'set' method"
            ),
          (h === f.attr("value") || h === f.text()) &&
            e.runOnce === !1 &&
            (c = c.replace(",", ".")),
          a.isNumeric(+c) ||
            a.error(
              "The value (" +
                c +
                ") being 'set' is not numeric and has caused a error to be thrown"
            ),
          (c = n(c, e)),
          (e.setEvent = !0),
          c.toString(),
          c !== "" && (c = g(c, e)),
          (c = r(c, e.aDec, e.aNeg)),
          l(c, e) || (c = g("", e)),
          (c = i(c, e)),
          j
            ? f.val(c)
            : a.inArray(f.prop("tagName").toLowerCase(), e.tagList) !== -1 &&
              f.text(c)
        );
      });
    },
    get: function () {
      var f = d(a(this)),
        c = f.data("autoNumeric"),
        e;
      return (
        typeof c != "object" &&
          a.error(
            "You must initialize autoNumeric('init', {options}) prior to calling the 'get' method"
          ),
        (e = ""),
        f.is(
          "input[type=text], input[type=hidden], input[type=tel], input:not([type])"
        )
          ? (e = f.eq(0).val())
          : a.inArray(f.prop("tagName").toLowerCase(), c.tagList) !== -1
          ? (e = f.eq(0).text())
          : a.error(
              "The <" +
                f.prop("tagName").toLowerCase() +
                "> is not supported by autoNumeric()"
            ),
        (e === "" && c.wEmpty === "empty") ||
        (e === c.aSign && (c.wEmpty === "sign" || c.wEmpty === "empty"))
          ? ""
          : (e !== "" &&
              c.nBracket !== null &&
              ((c.removeBrackets = !0), (e = j(e, c)), (c.removeBrackets = !1)),
            (c.runOnce || c.aForm === !1) && (e = b(e, c)),
            (e = k(e, c.aDec, c.aNeg)),
            +e === 0 && c.lZero !== "keep" && (e = "0"),
            c.lZero === "keep")
          ? e
          : ((e = n(e, c)), e)
      );
    },
    getString: function () {
      var j = !1,
        i = d(a(this)),
        k = i.serialize(),
        e = k.split("&"),
        f = a("form").index(i),
        h = a("form:eq(" + f + ")"),
        c = [],
        g = [],
        l = /^(?:submit|button|image|reset|file)$/i,
        m = /^(?:input|select|textarea|keygen)/i,
        n = /^(?:checkbox|radio)$/i,
        o =
          /^(?:button|checkbox|color|date|datetime|datetime-local|email|file|image|month|number|password|radio|range|reset|search|submit|time|url|week)/i,
        b = 0;
      return (
        a.each(h[0], function (c, a) {
          a.name !== "" &&
          m.test(a.localName) &&
          !l.test(a.type) &&
          !a.disabled &&
          (a.checked || !n.test(a.type))
            ? (g.push(b), (b = b + 1))
            : g.push(-1);
        }),
        (b = 0),
        a.each(h[0], function (d, a) {
          a.localName === "input" &&
          (a.type === "" ||
            a.type === "text" ||
            a.type === "hidden" ||
            a.type === "tel")
            ? (c.push(b), (b = b + 1))
            : (c.push(-1),
              a.localName === "input" && o.test(a.type) && (b = b + 1));
        }),
        a.each(e, function (h, d) {
          var b, i, k;
          (d = e[h].split("=")),
            (b = a.inArray(h, g)),
            b > -1 &&
              c[b] > -1 &&
              ((i = a("form:eq(" + f + ") input:eq(" + c[b] + ")")),
              (k = i.data("autoNumeric")),
              typeof k == "object" &&
                d[1] !== null &&
                ((d[1] = a("form:eq(" + f + ") input:eq(" + c[b] + ")")
                  .autoNumeric("get")
                  .toString()),
                (e[h] = d.join("=")),
                (j = !0)));
        }),
        j ||
          a.error(
            "You must initialize autoNumeric('init', {options}) prior to calling the 'getString' method"
          ),
        e.join("&")
      );
    },
    getArray: function () {
      var j = !1,
        g = d(a(this)),
        h = g.serializeArray(),
        f = a("form").index(g),
        i = a("form:eq(" + f + ")"),
        c = [],
        e = [],
        k = /^(?:submit|button|image|reset|file)$/i,
        l = /^(?:input|select|textarea|keygen)/i,
        m = /^(?:checkbox|radio)$/i,
        n =
          /^(?:button|checkbox|color|date|datetime|datetime-local|email|file|image|month|number|password|radio|range|reset|search|submit|time|url|week)/i,
        b = 0;
      return (
        a.each(i[0], function (c, a) {
          a.name !== "" &&
          l.test(a.localName) &&
          !k.test(a.type) &&
          !a.disabled &&
          (a.checked || !m.test(a.type))
            ? (e.push(b), (b = b + 1))
            : e.push(-1);
        }),
        (b = 0),
        a.each(i[0], function (d, a) {
          a.localName === "input" &&
          (a.type === "" ||
            a.type === "text" ||
            a.type === "hidden" ||
            a.type === "tel")
            ? (c.push(b), (b = b + 1))
            : (c.push(-1),
              a.localName === "input" && n.test(a.type) && (b = b + 1));
        }),
        a.each(h, function (d, g) {
          var b = a.inArray(d, e),
            h,
            i;
          b > -1 &&
            c[b] > -1 &&
            ((h = a("form:eq(" + f + ") input:eq(" + c[b] + ")")),
            (i = h.data("autoNumeric")),
            typeof i == "object" &&
              ((g.value = a("form:eq(" + f + ") input:eq(" + c[b] + ")")
                .autoNumeric("get")
                .toString()),
              (j = !0)));
        }),
        j ||
          a.error(
            "None of the successful form inputs are initialized by autoNumeric."
          ),
        h
      );
    },
    getSettings: function () {
      var b = d(a(this));
      return b.eq(0).data("autoNumeric");
    },
  };
  (a.fn.autoNumeric = function (b) {
    if (m[b]) return m[b].apply(this, Array.prototype.slice.call(arguments, 1));
    if (typeof b == "object" || !b) return m.init.apply(this, arguments);
    a.error('Method "' + b + '" is not supported by autoNumeric()');
  }),
    (a.fn.autoNumeric.defaults = {
      aSep: ",",
      dGroup: "3",
      aDec: ".",
      altDec: null,
      aSign: "",
      pSign: "p",
      vMax: "9999999999999.99",
      vMin: "-9999999999999.99",
      mDec: null,
      mRound: "S",
      aPad: !0,
      nBracket: null,
      wEmpty: "empty",
      lZero: "allow",
      sNumber: !0,
      aForm: !0,
      anDefault: null,
    });
});
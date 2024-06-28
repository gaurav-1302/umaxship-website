(function (b) {
  if (typeof exports == "object" && typeof module != "undefined")
    module.exports = b();
  else if (typeof define == "function" && define.amd) define([], b);
  else {
    var a;
    typeof window != "undefined"
      ? (a = window)
      : typeof global != "undefined"
      ? (a = global)
      : typeof self != "undefined"
      ? (a = self)
      : (a = this),
      (a.mexp = b());
  }
})(function () {
  var a, b, c;
  return (function g(b, c, d) {
    var f, a;
    function e(a, k) {
      var i, j, h;
      if (!c[a]) {
        if (!b[a]) {
          if (((i = typeof require == "function" && require), !k && i))
            return i(a, !0);
          if (f) return f(a, !0);
          throw (
            ((j = new Error("Cannot find module '" + a + "'")),
            (j.code = "MODULE_NOT_FOUND"),
            j)
          );
        }
        (h = c[a] = { exports: {} }),
          b[a][0].call(
            h.exports,
            function (c) {
              var d = b[a][1][c];
              return e(d || c);
            },
            h,
            h.exports,
            g,
            b,
            c,
            d
          );
      }
      return c[a].exports;
    }
    f = typeof require == "function" && require;
    for (a = 0; a < d.length; a++) e(d[a]);
    return e;
  })(
    {
      1: [
        function (b, c, d) {
          var a = b("./postfix_evaluator.js");
          (a.prototype.formulaEval = function () {
            "use strict";
            for (
              var h = [], a = [], g = "", c = this.value, b = 0, d, f, e;
              b < c.length;
              b++
            )
              c[b].type === 1 || c[b].type === 3
                ? a.push({
                    value: c[b].type === 3 ? c[b].show : c[b].value,
                    type: 1,
                  })
                : c[b].type === 13
                ? a.push({ value: c[b].show, type: 1 })
                : c[b].type === 0
                ? (a[a.length - 1] = {
                    value:
                      c[b].show +
                      (c[b].show != "-" ? "(" : "") +
                      a[a.length - 1].value +
                      (c[b].show != "-" ? ")" : ""),
                    type: 0,
                  })
                : c[b].type === 7
                ? (a[a.length - 1] = {
                    value:
                      (a[a.length - 1].type != 1 ? "(" : "") +
                      a[a.length - 1].value +
                      (a[a.length - 1].type != 1 ? ")" : "") +
                      c[b].show,
                    type: 7,
                  })
                : c[b].type === 10
                ? ((e = a.pop()),
                  (d = a.pop()),
                  c[b].show === "P" || c[b].show === "C"
                    ? a.push({
                        value:
                          "<sup>" +
                          d.value +
                          "</sup>" +
                          c[b].show +
                          "<sub>" +
                          e.value +
                          "</sub>",
                        type: 10,
                      })
                    : a.push({
                        value:
                          (d.type != 1 ? "(" : "") +
                          d.value +
                          (d.type != 1 ? ")" : "") +
                          "<sup>" +
                          e.value +
                          "</sup>",
                        type: 1,
                      }))
                : c[b].type === 2 || c[b].type === 9
                ? ((e = a.pop()),
                  (d = a.pop()),
                  a.push({
                    value:
                      (d.type != 1 ? "(" : "") +
                      d.value +
                      (d.type != 1 ? ")" : "") +
                      c[b].show +
                      (e.type != 1 ? "(" : "") +
                      e.value +
                      (e.type != 1 ? ")" : ""),
                    type: c[b].type,
                  }))
                : c[b].type === 12 &&
                  ((e = a.pop()),
                  (d = a.pop()),
                  (f = a.pop()),
                  a.push({
                    value:
                      c[b].show +
                      "(" +
                      f.value +
                      "," +
                      d.value +
                      "," +
                      e.value +
                      ")",
                    type: 12,
                  }));
            return a[0].value;
          }),
            (c.exports = a);
        },
        { "./postfix_evaluator.js": 5 },
      ],
      2: [
        function (l, q, s) {
          "use strict";
          var a = l("./math_function.js"),
            h,
            j,
            k,
            n,
            i,
            e,
            f,
            m,
            d,
            g,
            p,
            c;
          function b(a, c) {
            for (var b = 0; b < a.length; b++) a[b] += c;
            return a;
          }
          (h = [
            "sin",
            "cos",
            "tan",
            "pi",
            "(",
            ")",
            "P",
            "C",
            " ",
            "asin",
            "acos",
            "atan",
            "7",
            "8",
            "9",
            "int",
            "cosh",
            "acosh",
            "ln",
            "^",
            "root",
            "4",
            "5",
            "6",
            "/",
            "!",
            "tanh",
            "atanh",
            "Mod",
            "1",
            "2",
            "3",
            "*",
            "sinh",
            "asinh",
            "e",
            "log",
            "0",
            ".",
            "+",
            "-",
            ",",
            "Sigma",
            "n",
            "Pi",
            "pow",
            "floor",
          ]),
            (j = [
              "sin",
              "cos",
              "tan",
              "&pi;",
              "(",
              ")",
              "P",
              "C",
              " ",
              "asin",
              "acos",
              "atan",
              "7",
              "8",
              "9",
              "Int",
              "cosh",
              "acosh",
              " ln",
              "^",
              "root",
              "4",
              "5",
              "6",
              "&divide;",
              "!",
              "tanh",
              "atanh",
              " Mod ",
              "1",
              "2",
              "3",
              "&times;",
              "sinh",
              "asinh",
              "e",
              " log",
              "0",
              ".",
              "+",
              "-",
              ",",
              "&Sigma;",
              "n",
              "&Pi;",
              "pow",
              "floor",
            ]),
            (k = [
              a.math.sin,
              a.math.cos,
              a.math.tan,
              "PI",
              "(",
              ")",
              a.math.P,
              a.math.C,
              " ".anchor,
              a.math.asin,
              a.math.acos,
              a.math.atan,
              "7",
              "8",
              "9",
              Math.floor,
              a.math.cosh,
              a.math.acosh,
              Math.log,
              Math.pow,
              Math.sqrt,
              "4",
              "5",
              "6",
              a.math.div,
              a.math.fact,
              a.math.tanh,
              a.math.atanh,
              a.math.mod,
              "1",
              "2",
              "3",
              a.math.mul,
              a.math.sinh,
              a.math.asinh,
              "E",
              a.math.log,
              "0",
              ".",
              a.math.add,
              a.math.sub,
              ",",
              a.math.sigma,
              "n",
              a.math.Pi,
              Math.pow,
              Math.floor,
            ]),
            (n = {
              0: 11,
              1: 0,
              2: 3,
              3: 0,
              4: 0,
              5: 0,
              6: 0,
              7: 11,
              8: 11,
              9: 1,
              10: 10,
              11: 0,
              12: 11,
              13: 0,
              14: -1,
            }),
            (i = [
              0, 0, 0, 3, 4, 5, 10, 10, 14, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 10, 0,
              1, 1, 1, 2, 7, 0, 0, 2, 1, 1, 1, 2, 0, 0, 3, 0, 1, 6, 9, 9, 11,
              12, 13, 12, 8,
            ]),
            (e = {
              0: !0,
              1: !0,
              3: !0,
              4: !0,
              6: !0,
              8: !0,
              9: !0,
              12: !0,
              13: !0,
              14: !0,
            }),
            (f = {
              0: !0,
              1: !0,
              2: !0,
              3: !0,
              4: !0,
              5: !0,
              6: !0,
              7: !0,
              8: !0,
              9: !0,
              10: !0,
              11: !0,
              12: !0,
              13: !0,
            }),
            (m = { 0: !0, 3: !0, 4: !0, 8: !0, 12: !0, 13: !0 }),
            (d = {}),
            (g = { 0: !0, 1: !0, 3: !0, 4: !0, 6: !0, 8: !0, 12: !0, 13: !0 }),
            (p = { 1: !0 }),
            (c = [
              [],
              [
                "1",
                "2",
                "3",
                "7",
                "8",
                "9",
                "4",
                "5",
                "6",
                "+",
                "-",
                "*",
                "/",
                "(",
                ")",
                "^",
                "!",
                "P",
                "C",
                "e",
                "0",
                ".",
                ",",
                "n",
                " ",
              ],
              ["pi", "ln", "Pi"],
              ["sin", "cos", "tan", "Del", "int", "Mod", "log", "pow"],
              ["asin", "acos", "atan", "cosh", "root", "tanh", "sinh"],
              ["acosh", "atanh", "asinh", "Sigma", "floor"],
            ]);
          function o(b, c, d, e) {
            for (var a = 0; a < e; a++) if (b[d + a] !== c[a]) return !1;
            return !0;
          }
          a.addToken = function (b) {
            for (var a = 0, e, d, f; a < b.length; a++) {
              (e = b[a].token.length), (d = -1), (c[e] = c[e] || []);
              for (f = 0; f < c[e].length; f++)
                if (b[a].token === c[e][f]) {
                  d = h.indexOf(c[e][f]);
                  break;
                }
              d === -1
                ? (h.push(b[a].token),
                  i.push(b[a].type),
                  c.length <= b[a].token.length && (c[b[a].token.length] = []),
                  c[b[a].token.length].push(b[a].token),
                  k.push(b[a].value),
                  j.push(b[a].show))
                : ((h[d] = b[a].token),
                  (i[d] = b[a].type),
                  (k[d] = b[a].value),
                  (j[d] = b[a].show));
            }
          };
          function r(e) {
            for (var p = [], m = e.length, b = 0, d, g, f, l; b < m; b++) {
              if (b < m - 1 && e[b] === " " && e[b + 1] === " ") continue;
              f = "";
              for (
                d = e.length - b > c.length - 2 ? c.length - 1 : e.length - b;
                d > 0;
                d--
              ) {
                if (c[d] === void 0) continue;
                for (g = 0; g < c[d].length; g++)
                  o(e, c[d][g], b, d) &&
                    ((f = c[d][g]), (g = c[d].length), (d = 0));
              }
              if (((b += f.length - 1), f === ""))
                throw new a.Exception("Can't understand after " + e.slice(b));
              (l = h.indexOf(f)),
                p.push({
                  index: l,
                  token: f,
                  type: i[l],
                  eval: k[l],
                  precedence: n[i[l]],
                  show: j[l],
                });
            }
            return p;
          }
          (a.lex = function (F, C) {
            "use strict";
            var E = { value: a.math.changeSign, type: 0, pre: 21, show: "-" },
              w = { value: ")", show: ")", type: 5, pre: 0 },
              u = { value: "(", type: 4, pre: 0, show: "(" },
              c = [u],
              h = [],
              D = F,
              k = e,
              y = 0,
              l = d,
              A = "",
              o,
              n,
              s,
              t,
              z,
              j,
              v,
              B,
              x,
              i,
              q;
            typeof C != "undefined" && a.addToken(C), (n = {}), (s = r(D));
            for (o = 0; o < s.length; o++) {
              if (((t = s[o]), t.type === 14)) {
                if (
                  o > 0 &&
                  o < s.length - 1 &&
                  s[o + 1].type === 1 &&
                  (s[o - 1].type === 1 || s[o - 1].type === 6)
                )
                  throw new a.Exception("Unexpected Space");
                continue;
              }
              (z = t.token),
                (j = t.type),
                (v = t.eval),
                (B = t.precedence),
                (x = t.show),
                (i = c[c.length - 1]);
              for (q = h.length; q--; )
                if (h[q] === 0) {
                  if ([0, 2, 3, 4, 5, 9, 11, 12, 13].indexOf(j) !== -1) {
                    if (k[j] !== !0)
                      throw new a.Exception(z + " is not allowed after " + A);
                    c.push(w), (k = f), (l = g), b(h, -1).pop();
                  }
                } else break;
              if (k[j] !== !0)
                throw new a.Exception(z + " is not allowed after " + A);
              if (
                (l[j] === !0 &&
                  ((j = 2),
                  (v = a.math.mul),
                  (x = "&times;"),
                  (B = 3),
                  (o = o - 1)),
                (n = { value: v, type: j, pre: B, show: x }),
                j === 0)
              )
                (k = e), (l = d), b(h, 2).push(2), c.push(n), c.push(u);
              else if (j === 1)
                i.type === 1 ? ((i.value += v), b(h, 1)) : c.push(n),
                  (k = f),
                  (l = m);
              else if (j === 2) (k = e), (l = d), b(h, 2), c.push(n);
              else if (j === 3) c.push(n), (k = f), (l = g);
              else if (j === 4) b(h, 1), y++, (k = e), (l = d), c.push(n);
              else if (j === 5) {
                if (!y)
                  throw new a.Exception(
                    "Closing parenthesis are more than opening one, wait What!!!"
                  );
                y--, (k = f), (l = g), c.push(n), b(h, 1);
              } else if (j === 6) {
                if (i.hasDec)
                  throw new a.Exception(
                    "Two decimals are not allowed in one number"
                  );
                i.type !== 1 &&
                  ((i = { value: 0, type: 1, pre: 0 }), c.push(i), b(h, -1)),
                  (k = p),
                  b(h, 1),
                  (l = d),
                  (i.value += v),
                  (i.hasDec = !0);
              } else j === 7 && ((k = f), (l = g), b(h, 1), c.push(n));
              j === 8
                ? ((k = e), (l = d), b(h, 4).push(4), c.push(n), c.push(u))
                : j === 9
                ? (i.type === 9
                    ? i.value === a.math.add
                      ? ((i.value = v), (i.show = x), b(h, 1))
                      : i.value === a.math.sub &&
                        x === "-" &&
                        ((i.value = a.math.add), (i.show = "+"), b(h, 1))
                    : i.type !== 5 &&
                      i.type !== 7 &&
                      i.type !== 1 &&
                      i.type !== 3 &&
                      i.type !== 13
                    ? z === "-" &&
                      ((k = e), (l = d), b(h, 2).push(2), c.push(E), c.push(u))
                    : (c.push(n), b(h, 2)),
                  (k = e),
                  (l = d))
                : j === 10
                ? ((k = e), (l = d), b(h, 2), c.push(n))
                : j === 11
                ? ((k = e), (l = d), c.push(n))
                : j === 12
                ? ((k = e), (l = d), b(h, 6).push(6), c.push(n), c.push(u))
                : j === 13 && ((k = f), (l = g), c.push(n)),
                b(h, -1),
                (A = z);
            }
            for (q = h.length; q--; )
              if (h[q] === 0) c.push(w), b(h, -1).pop();
              else break;
            if (k[5] !== !0) throw new a.Exception("complete the expression");
            while (y--) c.push(w);
            return c.push(w), new a(c);
          }),
            (q.exports = a);
        },
        { "./math_function.js": 3 },
      ],
      3: [
        function (c, b, d) {
          "use strict";
          var a = function (a) {
            this.value = a;
          };
          (a.math = {
            isDegree: !0,
            acos: function (b) {
              return a.math.isDegree
                ? (180 / Math.PI) * Math.acos(b)
                : Math.acos(b);
            },
            add: function (a, b) {
              return a + b;
            },
            asin: function (b) {
              return a.math.isDegree
                ? (180 / Math.PI) * Math.asin(b)
                : Math.asin(b);
            },
            atan: function (b) {
              return a.math.isDegree
                ? (180 / Math.PI) * Math.atan(b)
                : Math.atan(b);
            },
            acosh: function (a) {
              return Math.log(a + Math.sqrt(a * a - 1));
            },
            asinh: function (a) {
              return Math.log(a + Math.sqrt(a * a + 1));
            },
            atanh: function (a) {
              return Math.log((1 + a) / (1 - a));
            },
            C: function (f, c) {
              var g = 1,
                b = f - c,
                d = c,
                e;
              d < b && ((d = b), (b = c));
              for (e = d + 1; e <= f; e++) g *= e;
              return g / a.math.fact(b);
            },
            changeSign: function (a) {
              return -a;
            },
            cos: function (b) {
              return a.math.isDegree && (b = a.math.toRadian(b)), Math.cos(b);
            },
            cosh: function (a) {
              return (Math.pow(Math.E, a) + Math.pow(Math.E, -1 * a)) / 2;
            },
            div: function (a, b) {
              return a / b;
            },
            fact: function (c) {
              var b, a;
              if (c % 1 !== 0) return "NaN";
              b = 1;
              for (a = 2; a <= c; a++) b *= a;
              return b;
            },
            inverse: function (a) {
              return 1 / a;
            },
            log: function (a) {
              return Math.log(a) / Math.log(10);
            },
            mod: function (a, b) {
              return a % b;
            },
            mul: function (a, b) {
              return a * b;
            },
            P: function (b, d) {
              for (
                var c = 1, a = Math.floor(b) - Math.floor(d) + 1;
                a <= Math.floor(b);
                a++
              )
                c *= a;
              return c;
            },
            Pi: function (c, d, e) {
              for (var b = 1, a = c; a <= d; a++)
                b *= Number(e.postfixEval({ n: a }));
              return b;
            },
            pow10x: function (b) {
              for (var a = 1; b--; ) a *= 10;
              return a;
            },
            sigma: function (c, d, e) {
              for (var b = 0, a = c; a <= d; a++)
                b += Number(e.postfixEval({ n: a }));
              return b;
            },
            sin: function (b) {
              return a.math.isDegree && (b = a.math.toRadian(b)), Math.sin(b);
            },
            sinh: function (a) {
              return (Math.pow(Math.E, a) - Math.pow(Math.E, -1 * a)) / 2;
            },
            sub: function (a, b) {
              return a - b;
            },
            tan: function (b) {
              return a.math.isDegree && (b = a.math.toRadian(b)), Math.tan(b);
            },
            tanh: function (b) {
              return a.sinha(b) / a.cosha(b);
            },
            toRadian: function (a) {
              return (a * Math.PI) / 180;
            },
          }),
            (a.Exception = function (a) {
              this.message = a;
            }),
            (b.exports = a);
        },
        {},
      ],
      4: [
        function (b, c, d) {
          var a = b("./lexer.js");
          (a.prototype.toPostfix = function () {
            "use strict";
            for (
              var i = [],
                d = [{ value: "(", type: 4, pre: 0 }],
                c = this.value,
                b = 1,
                j,
                f,
                g,
                e,
                h,
                k;
              b < c.length;
              b++
            )
              if (c[b].type === 1 || c[b].type === 3 || c[b].type === 13)
                c[b].type === 1 && (c[b].value = Number(c[b].value)),
                  i.push(c[b]);
              else if (c[b].type === 4) d.push(c[b]);
              else if (c[b].type === 5)
                while ((e = d.pop()).type !== 4) i.push(e);
              else if (c[b].type === 11) {
                while ((e = d.pop()).type !== 4) i.push(e);
                d.push(e);
              } else if (
                ((g = c[b]),
                (j = g.pre),
                (f = d[d.length - 1]),
                (h = f.pre),
                (k = f.value == "Math.pow" && g.value == "Math.pow"),
                j > h)
              )
                d.push(g);
              else {
                while ((h >= j && !k) || (k && j < h))
                  (e = d.pop()),
                    (f = d[d.length - 1]),
                    i.push(e),
                    (h = f.pre),
                    (k = g.value == "Math.pow" && f.value == "Math.pow");
                d.push(g);
              }
            return new a(i);
          }),
            (c.exports = a);
        },
        { "./lexer.js": 2 },
      ],
      5: [
        function (b, c, d) {
          var a = b("./postfix.js");
          (a.prototype.postfixEval = function (g) {
            "use strict";
            var b, e, f, h, j, k, d, i, c;
            (g = g || {}),
              (g.PI = Math.PI),
              (g.E = Math.E),
              (b = []),
              (j = []),
              (k = ""),
              (d = this.value),
              (i = typeof g.n != "undefined");
            for (c = 0; c < d.length; c++)
              d[c].type === 1
                ? b.push({ value: d[c].value, type: 1 })
                : d[c].type === 3
                ? b.push({ value: g[d[c].value], type: 1 })
                : d[c].type === 0
                ? typeof b[b.length - 1].type == "undefined"
                  ? b[b.length - 1].value.push(d[c])
                  : (b[b.length - 1].value = d[c].value(b[b.length - 1].value))
                : d[c].type === 7
                ? typeof b[b.length - 1].type == "undefined"
                  ? b[b.length - 1].value.push(d[c])
                  : (b[b.length - 1].value = d[c].value(b[b.length - 1].value))
                : d[c].type === 8
                ? ((e = b.pop()),
                  (f = b.pop()),
                  b.push({ type: 1, value: d[c].value(f.value, e.value) }))
                : d[c].type === 10
                ? ((e = b.pop()),
                  (f = b.pop()),
                  typeof f.type == "undefined"
                    ? ((f.value = f.concat(e)), f.value.push(d[c]), b.push(f))
                    : typeof e.type == "undefined"
                    ? (e.unshift(f), e.push(d[c]), b.push(e))
                    : b.push({ type: 1, value: d[c].value(f.value, e.value) }))
                : d[c].type === 2 || d[c].type === 9
                ? ((e = b.pop()),
                  (f = b.pop()),
                  typeof f.type == "undefined"
                    ? ((f = f.concat(e)), f.push(d[c]), b.push(f))
                    : typeof e.type == "undefined"
                    ? (e.unshift(f), e.push(d[c]), b.push(e))
                    : b.push({ type: 1, value: d[c].value(f.value, e.value) }))
                : d[c].type === 12
                ? ((e = b.pop()),
                  typeof e.type != "undefined" && (e = [e]),
                  (f = b.pop()),
                  (h = b.pop()),
                  b.push({
                    type: 1,
                    value: d[c].value(h.value, f.value, new a(e)),
                  }))
                : d[c].type === 13 &&
                  (i
                    ? b.push({ value: g[d[c].value], type: 3 })
                    : b.push([d[c]]));
            if (b.length > 1) throw new a.Exception("Uncaught Syntax error");
            return b[0].value > 1e15
              ? "Infinity"
              : parseFloat(b[0].value.toFixed(15));
          }),
            (a.eval = function (b, a, c) {
              return typeof a == "undefined"
                ? this.lex(b).toPostfix().postfixEval()
                : typeof c == "undefined"
                ? typeof a.length != "undefined"
                  ? this.lex(b, a).toPostfix().postfixEval()
                  : this.lex(b).toPostfix().postfixEval(a)
                : this.lex(b, a).toPostfix().postfixEval(c);
            }),
            (c.exports = a);
        },
        { "./postfix.js": 4 },
      ],
    },
    {},
    [1]
  )(1);
});
(function (a) {
  "use strict";
  a(document).ready(function () {
    a("body").on("click", "input.number-format", function () {
      a(this).autoNumeric();
      var b = a(this).autoNumeric("get");
      a(this).val(b);
    }),
      a("body").on(
        "change keyup",
        ".wpcf7 input,.wpcf7 select,.wpcf7 textarea",
        function (b) {
          a.cf7_formulas(),
            typeof cf7_logic != "undefined" && a("input").trigger("cf7_logic");
        }
      ),
      (a.cf7_formulas = function () {
        var c = 0,
          f = 100,
          d = [],
          b,
          e;
        a("form.wpcf7-form input").each(function () {
          if (
            a(this).attr("type") == "checkbox" ||
            a(this).attr("type") == "radio"
          ) {
            var b = a(this).attr("name").replace("[]", "");
            d.push(b);
          } else d.push(a(this).attr("name"));
        }),
          a("form.wpcf7-form select").each(function () {
            d.push(a(this).attr("name"));
          }),
          (d = a.remove_duplicates_ctf7(d)),
          (e = new RegExp("(" + d.join("|") + ")")),
          a(".ctf7-total").each(function (l) {
            var d = a(this).data("formulas"),
              g,
              f,
              i,
              j,
              m,
              k,
              h;
            if (d == "") return;
            for (d = d.toString(), d = d.replace(/ /g, ""); (b = e.exec(d)); )
              (g = a("input[name=" + b[0] + "]").attr("type")),
                g === void 0 &&
                  (g = a("input[name='" + b[0] + "[]']").attr("type")),
                g == "checkbox"
                  ? ((f = 0),
                    a("input[name='" + b[0] + "[]']:checked").each(function () {
                      var b = a(this).val(),
                        c = b.search(/\|/i),
                        d,
                        e,
                        g;
                      c > 0
                        ? ((d = b.split("|")), (f += new Number(d[0])))
                        : ((e = a(this).val()),
                          (f += new Number(e)),
                          (g = a(this)
                            .closest("span")
                            .find(".wpcf7-list-item-label")
                            .text()),
                          g != "");
                    }),
                    a("input[name='" + b[0] + "']:checked").each(function () {
                      f += new Number(a(this).val());
                    }))
                  : g == "radio"
                  ? ((f = a("input[name='" + b[0] + "']:checked").val()),
                    f === void 0 && (f = 0))
                  : g == "text"
                  ? (f = a("input[name=" + b[0] + "]").val())
                  : g == "date"
                  ? (f = a("input[name=" + b[0] + "]").val())
                  : g === void 0
                  ? ((f = a("select[name=" + b[0] + "]").val()),
                    (i = f.search(/\|/i)),
                    i > 0
                      ? ((j = f.split("|")), (f = j[0]))
                      : (m = a("select[name=" + b[0] + "]")
                          .find(":selected")
                          .text()))
                  : a("input[name=" + b[0] + "]").hasClass("ctf7-total")
                  ? (f = a("input[name=" + b[0] + "]").attr("data-number"))
                  : (f = a("input[name=" + b[0] + "]").val()),
                a("input[name=" + b[0] + "]").hasClass("number-format") &&
                  (a("input[name=" + b[0] + "]").autoNumeric(),
                  (f = a("input[name=" + b[0] + "]").autoNumeric("get"))),
                f == "" && (f = 0),
                (k = new RegExp(b[0] + "(?!\\d)", "gm")),
                (d = d.replace(k, f));
            if (cf7_calculator.pro == "ok") {
              (d = a.cf7_fomulas_elseif(d)),
                (d = a.cf7_fomulas_days(d)),
                (d = a.cf7_fomulas_months(d)),
                (d = a.cf7_fomulas_years(d)),
                (d = a.cf7_fomulas_floor(d)),
                (d = a.cf7_fomulas_mod(d)),
                (d = a.cf7_fomulas_max(d)),
                (d = a.cf7_fomulas_min(d)),
                (d = a.cf7_fomulas_hours(d)),
                (d = a.cf7_fomulas_floor_2(d)),
                (d = a.cf7_fomulas_floor(d)),
                (d = a.cf7_fomulas_round_2(d)),
                (d = a.cf7_fomulas_round(d)),
                (d = a.cf7_fomulas_ceil(d)),
                (d = a.cf7_fomulas_age_2(d)),
                (d = a.cf7_fomulas_age(d)),
                (d = a.cf7_fomulas_avg(d)),
                (d = a.cf7_fomulas_round_custom(d));
              try {
                (h = mexp.eval(d)), (c = h);
              } catch (a) {
                c = d;
              }
            } else
              try {
                (h = eval(d)), (c = h);
              } catch (a) {
                c = d + " Pro version";
              }
            a(this).attr("data-number", c),
              a(this).hasClass("number-format")
                ? (a(this).autoNumeric(),
                  a(this).autoNumeric("set", c),
                  a(this).parent().find(".cf7-calculated-name").autoNumeric(),
                  a(this)
                    .parent()
                    .find(".cf7-calculated-name")
                    .autoNumeric("set", c))
                : (a(this).val(c),
                  a(this).parent().find(".cf7-calculated-name").html(c));
          });
      }),
      (a.remove_duplicates_ctf7 = function (c) {
        for (var d = {}, e = [], b = 0, a; b < c.length; b++) d[c[b]] = !0;
        for (a in d)
          "_wpcf7" == a ||
            "_wpcf7_version" == a ||
            "_wpcf7_locale" == a ||
            "_wpcf7_unit_tag" == a ||
            "_wpnonce" == a ||
            "undefined" == a ||
            "_wpcf7_container_post" == a ||
            "_wpcf7_nonce" == a ||
            (a != "" && e.push(a + "(?!\\d)"));
        return e;
      }),
      (a.cf7_fomulas_round = function (b) {
        var c = /round\(([^()]*)\)/gm;
        return (
          (b = b.replace(c, function (a) {
            return (
              (a = a.replace(/[round()]/g, "")),
              (a = mexp.eval(a)),
              Math.round(a)
            );
          })),
          b.match(c) && (b = a.cf7_fomulas_round(b)),
          b
        );
      }),
      (a.cf7_fomulas_avg = function (b) {
        var c = /avg\(([^()]*)\)/gm;
        return (
          (b = b.replace(c, function (c) {
            var a, d, b;
            (c = c.replace(/[agv()]/g, "")), (a = c.split(",")), (d = 0);
            for (b = 0; b < a.length; b++) d += parseInt(a[b], 10);
            return d / a.length;
          })),
          b.match(c) && (b = a.cf7_fomulas_avg(b)),
          b
        );
      }),
      (a.cf7_fomulas_round_2 = function (b) {
        var c = /round2\(([^()]*)\)/gm;
        return (
          (b = b.replace(c, function (a) {
            return (
              (a = a.replace(/round2|[()]/g, "")),
              (a = mexp.eval(a)),
              a.toFixed(2)
            );
          })),
          b.match(c) && (b = a.cf7_fomulas_round_2(b)),
          b
        );
      }),
      (a.cf7_fomulas_floor = function (b) {
        var c = /floor\(([^()]*)\)/gm;
        return (
          (b = b.replace(c, function (a) {
            return (
              (a = a.replace(/[floor()]/g, "")),
              (a = mexp.eval(a)),
              Math.floor(a)
            );
          })),
          b.match(c) && (b = a.cf7_fomulas_floor(b)),
          b
        );
      }),
      (a.cf7_fomulas_floor_2 = function (b) {
        var c = /floor2\(([^()]*)\)/gm;
        return (
          (b = b.replace(c, function (a) {
            return (
              (a = a.replace(/floor2|[()]/g, "")),
              (a = mexp.eval(a)),
              Math.floor(a * 100) / 100
            );
          })),
          b.match(c) && (b = a.cf7_fomulas_floor_2(b)),
          b
        );
      }),
      (a.cf7_fomulas_ceil = function (b) {
        var c = /ceil\(([^()]*)\)/gm;
        return (
          (b = b.replace(c, function (a) {
            return (
              (a = a.replace(/[ceil()]/g, "")), (a = mexp.eval(a)), Math.ceil(a)
            );
          })),
          b.match(c) && (b = a.cf7_fomulas_ceil(b)),
          b
        );
      }),
      (a.cf7_fomulas_mod = function (b) {
        var c = /mod\(([^()]*)\)/gm;
        return (
          (b = b.replace(c, function (a) {
            a = a.replace(/[mod()]/g, "");
            var b = a.split(",");
            return b[0] % b[1];
          })),
          b.match(c) && (b = a.cf7_fomulas_mod(b)),
          b
        );
      }),
      (a.cf7_fomulas_elseif = function (b) {
        var c = /if\(([^()]*)\)/gm;
        return (
          (b = b.replace(c, function (b) {
            return a.cf7_fomulas_if(b);
          })),
          b.match(c) && (b = a.cf7_fomulas_elseif(b)),
          b
        );
      }),
      (a.cf7_fomulas_if = function (c) {
        var a, b;
        if (
          ((c = c.replace(/[if()]/g, "")),
          (a = c.split(",")),
          (b = a[0].split("==")),
          b.length > 1)
        )
          return b[0] == b[1]
            ? (console.log(b), mexp.eval(a[1]))
            : mexp.eval(a[2]);
        else
          try {
            return eval(a[0]) ? mexp.eval(a[1]) : mexp.eval(a[2]);
          } catch (a) {
            return 0;
          }
      }),
      (a.cf7_fomulas_age = function (b) {
        var c = /age\(([^()]*)\)/gm;
        return (
          (b = b.replace(c, function (a) {
            var b, c;
            return (
              (a = a.replace(/[age()]/g, "")),
              (b = new Date(a)),
              (c = new Date()),
              Math.floor((c - b) / (365.25 * 24 * 60 * 60 * 1e3))
            );
          })),
          b.match(c) && (b = a.cf7_fomulas_age(b)),
          b
        );
      }),
      (a.cf7_fomulas_age_2 = function (b) {
        var c = /age2\(([^()]*)\)/gm;
        return (
          (b = b.replace(c, function (a) {
            var b, c, d;
            return (
              (a = a.replace(/age2|[()]/g, "")),
              (b = a.split(",")),
              (c = new Date(b[0])),
              (d = new Date(b[1])),
              Math.floor((d - c) / (365.25 * 24 * 60 * 60 * 1e3))
            );
          })),
          b.match(c) && (b = a.cf7_fomulas_age_2(b)),
          b
        );
      }),
      (a.cf7_fomulas_days = function (b) {
        var c = /days\(([^()]*)\)/gm;
        return (
          (b = b.replace(c, function (d) {
            var c, b, e, f, g, h;
            return (
              (d = d.replace(/[days()]/g, "")),
              (c = d.split(",")),
              c[1] == "now"
                ? ((b = new Date()),
                  (e =
                    b.getFullYear() +
                    "-" +
                    (b.getMonth() + 1) +
                    "-" +
                    b.getDate()))
                : (e = c[1]),
              c[0] == "now"
                ? ((b = new Date()),
                  (f =
                    b.getFullYear() +
                    "-" +
                    (b.getMonth() + 1) +
                    "-" +
                    b.getDate()))
                : (f = c[0]),
              (g = a.cf7_fomulas_parse_date(e)),
              (h = a.cf7_fomulas_parse_date(f)),
              isNaN(g) || isNaN(h) ? 0 : a.cf7_fomulas_datediff(g, h)
            );
          })),
          b.match(c) && (b = a.cf7_fomulas_days(b)),
          b
        );
      }),
      (a.cf7_fomulas_months = function (b) {
        var c = /months\(([^()]*)\)/gm;
        return (
          (b = b.replace(c, function (h) {
            var c, b, f, e, g, d;
            return (
              (h = h.replace(/[months()]/g, "")),
              (c = h.split(",")),
              c[1] == "now"
                ? ((b = new Date()),
                  (f =
                    b.getFullYear() +
                    "-" +
                    (b.getMonth() + 1) +
                    "-" +
                    b.getDate()))
                : (f = c[1]),
              (e = a.cf7_fomulas_parse_date(f)),
              c[0] == "now"
                ? ((b = new Date()),
                  (g =
                    b.getFullYear() +
                    "-" +
                    (b.getMonth() + 1) +
                    "-" +
                    b.getDate()))
                : (g = c[0]),
              (d = a.cf7_fomulas_parse_date(g)),
              isNaN(e) || isNaN(d)
                ? 0
                : d.getMonth() -
                  e.getMonth() +
                  12 * (d.getFullYear() - e.getFullYear())
            );
          })),
          b.match(c) && (b = a.cf7_fomulas_months(b)),
          b
        );
      }),
      (a.cf7_fomulas_years = function (b) {
        var c = /years\(([^()]*)\)/gm;
        return (
          (b = b.replace(c, function (d) {
            var c, b, e, f, g, h;
            return (
              (d = d.replace(/[years()]/g, "")),
              (c = d.split(",")),
              c[1] == "now"
                ? ((b = new Date()),
                  (e =
                    b.getFullYear() +
                    "-" +
                    (b.getMonth() + 1) +
                    "-" +
                    b.getDate()))
                : (e = c[1]),
              (f = a.cf7_fomulas_parse_date(e)),
              c[0] == "now"
                ? ((b = new Date()),
                  (g =
                    b.getFullYear() +
                    "-" +
                    (b.getMonth() + 1) +
                    "-" +
                    b.getDate()))
                : (g = c[0]),
              (h = a.cf7_fomulas_parse_date(g)),
              isNaN(f) || isNaN(h) ? 0 : h.getFullYear() - f.getFullYear()
            );
          })),
          b.match(c) && (b = a.cf7_fomulas_years(b)),
          b
        );
      }),
      (a.cf7_fomulas_floor = function (b) {
        var c = /floor\(([^()]*)\)/gm;
        return (
          (b = b.replace(c, function (a) {
            return (
              (a = a.replace(/[floor()]/g, "")),
              (a = mexp.eval(a)),
              Math.floor(a)
            );
          })),
          b.match(c) && (b = a.cf7_fomulas_floor(b)),
          b
        );
      }),
      (a.cf7_fomulas_round_custom = function (b) {
        var c = /custom\(([^()]*)\)/gm;
        return (
          (b = b.replace(c, function (a) {
            var c, d, b, e;
            return (
              (a = a.replace(/[custom()]/g, "")),
              (a = mexp.eval(a)),
              (a = a.toString()),
              (c = a.split(".")),
              (d = c[0]),
              c.length > 1
                ? ((b = c[1].substring(0, 1)),
                  b != 0 && (b < 6 ? (b = 5) : ((b = 0), d++)),
                  (e = d + "." + b),
                  e)
                : a
            );
          })),
          b.match(c) && (b = a.cf7_fomulas_round_custom(b)),
          b
        );
      }),
      (a.cf7_fomulas_mod = function (b) {
        var c = /mod\(([^()]*)\)/gm;
        return (
          (b = b.replace(c, function (a) {
            a = a.replace(/[mod()]/g, "");
            var b = a.split(",");
            return b[0] % b[1];
          })),
          b.match(c) && (b = a.cf7_fomulas_floor(b)),
          b
        );
      }),
      (a.cf7_fomulas_max = function (b) {
        var c = /max\(([^()]*)\)/gm;
        return (
          (b = b.replace(c, function (a) {
            a = a.replace(/[max()]/g, "");
            var b = a.split(",");
            return (b = b.map((a) => a.trim())), Math.max.apply(null, b);
          })),
          b.match(c) && (b = a.cf7_fomulas_max(b)),
          b
        );
      }),
      (a.cf7_fomulas_min = function (b) {
        var c = /min\(([^()]*)\)/gm;
        return (
          (b = b.replace(c, function (a) {
            a = a.replace(/[min()]/g, "");
            var b = a.split(",");
            return (b = b.map((a) => a.trim())), Math.min.apply(null, b);
          })),
          b.match(c) && (b = a.cf7_fomulas_min(b)),
          b
        );
      }),
      (a.cf7_fomulas_hours = function (b) {
        var c = /hours\(([^()]*)\)/gm;
        return (
          (b = b.replace(c, function (d) {
            var e, f, g, b, c, h;
            return (
              (d = d.replace(/[hours()]/g, "")),
              (e = d.split(",")),
              (f = e[1]),
              (g = e[0]),
              (b = f.split(":")),
              (c = g.split(":")),
              (b = parseInt(b[0])),
              (c = parseInt(c[0])),
              b >= 22 && c <= 7 ? (h = -1) : (h = a.cf7_fomulas_hoursiff(f, g)),
              h
            );
          })),
          b.match(c) && (b = a.cf7_fomulas_hours(b)),
          b
        );
      }),
      (a.cf7_fomulas_parse_date = function (a) {
        return new Date(a);
      }),
      (a.cf7_cover_date_format = function (c, e) {
        var b = "",
          d = e.data("date-format"),
          a;
        return (
          d == "m/d/Y"
            ? ((a = c.split("/")), (b = a[2] + "-" + a[0] + "-" + a[1]))
            : d == "d/m/Y"
            ? ((a = c.split("/")), (b = a[2] + "-" + a[1] + "-" + a[0]))
            : d == "F j, Y" && (b = c),
          b
        );
      }),
      (a.cf7_fomulas_datediff = function (a, b) {
        return (
          (b = b.getTime()),
          (a = a.getTime()),
          Math.round((b - a) / (1e3 * 60 * 60 * 24))
        );
      }),
      a(".wpcf7-form").length &&
        (a.cf7_formulas(), a(".cf7-hide").closest("p").css("display", "none"));
  });
})(jQuery);

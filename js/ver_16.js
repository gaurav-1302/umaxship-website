(function (a) {
  if (typeof exports == "object") a(require("jquery"), require("spin"));
  else if (typeof define == "function" && define.amd)
    define(["jquery", "spin"], a);
  else {
    if (!window.Spinner) throw new Error("Spin.js not present");
    a(window.jQuery, window.Spinner);
  }
})(function (a, b) {
  (a.fn.spin = function (c, d) {
    return this.each(function () {
      var f = a(this),
        e = f.data();
      e.spinner && (e.spinner.stop(), delete e.spinner),
        c !== !1 &&
          ((c = a.extend(
            { color: d || f.css("color") },
            a.fn.spin.presets[c] || c
          )),
          (e.spinner = new b(c).spin(this)));
    });
  }),
    (a.fn.spin.presets = {
      tiny: { lines: 8, length: 2, width: 2, radius: 3 },
      small: { lines: 8, length: 4, width: 3, radius: 5 },
      large: { lines: 10, length: 8, width: 4, radius: 8 },
    });
});

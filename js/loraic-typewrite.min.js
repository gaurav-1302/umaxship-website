(function (a) {
  "use strict";
  var b = function (g, h) {
    var f = g.find(".typewrite"),
      d,
      b,
      a,
      c,
      e;
    if (f.length == 0) return !1;
    (d = function (a, b, c) {
      (this.toRotate = b),
        (this.el = a),
        (this.loopNum = 0),
        (this.period = parseInt(c, 10) || 1e3),
        (this.txt = ""),
        this.tick(),
        (this.isDeleting = !1);
    }),
      (d.prototype.tick = function () {
        var c = this.loopNum % this.toRotate.length,
          b = this.toRotate[c],
          d,
          a;
        this.isDeleting
          ? (this.txt = b.substring(0, this.txt.length - 1))
          : (this.txt = b.substring(0, this.txt.length + 1)),
          (this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>"),
          (d = this),
          (a = 200 - Math.random() * 100),
          this.isDeleting && (a /= 2),
          !this.isDeleting && this.txt === b
            ? ((a = this.period), (this.isDeleting = !0))
            : this.isDeleting &&
              this.txt === "" &&
              ((this.isDeleting = !1), this.loopNum++, (a = 500)),
          setTimeout(function () {
            d.tick();
          }, a);
      }),
      (b = document.getElementsByClassName("typewrite"));
    for (a = 0; a < b.length; a++)
      (c = b[a].getAttribute("data-type")),
        (e = b[a].getAttribute("data-period")),
        c && new d(b[a], JSON.parse(c), e);
  };
  a(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/pxl_heading.default",
      b
    );
  });
})(jQuery);

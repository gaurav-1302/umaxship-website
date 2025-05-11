(function (a) {
  "use strict";
  var b = function (b, a) {
    a(".pxl-countdown").each(function () {
      var b = a(this),
        c = a(this).find("> div").data("count-down");
      setInterval(function () {
        var v = new Date().getTime(),
          u = new Date(c).getTime(),
          h = u - v,
          e = Math.floor(h / (1e3 * 60 * 60 * 24)),
          f = Math.floor((h % (1e3 * 60 * 60 * 24)) / (1e3 * 60 * 60)),
          g = Math.floor((h % (1e3 * 60 * 60)) / (1e3 * 60)),
          d = Math.floor((h % (1e3 * 60)) / 1e3),
          t = e !== 1 ? b.attr("data-days") : b.attr("data-day"),
          s = f !== 1 ? b.attr("data-hours") : b.attr("data-hour"),
          r = g !== 1 ? b.attr("data-minutes") : b.attr("data-minute"),
          q = d !== 1 ? b.attr("data-seconds") : b.attr("data-second"),
          n,
          o,
          a,
          p,
          l,
          k,
          i,
          j,
          m;
        (e = e < 10 ? "0" + e : e),
          (f = f < 10 ? "0" + f : f),
          (g = g < 10 ? "0" + g : g),
          (d = d < 10 ? "0" + d : d),
          (n = []),
          (o = e.toString());
        for (a = 0; a < o.length; a++) n.push("<span>" + o[a] + "</span>");
        (p = []), (l = f.toString());
        for (a = 0; a < l.length; a++) p.push("<span>" + l[a] + "</span>");
        (k = []), (i = g.toString());
        for (a = 0; a < i.length; a++) k.push("<span>" + i[a] + "</span>");
        (j = []), (m = d.toString());
        for (a = 0; a < m.length; a++) j.push("<span>" + m[a] + "</span>");
        b.html(
          '<div class="countdown-item countdown-day"><div class="countdown-item-inner"><div class="countdown-amount">' +
            n.join() +
            ' </div><div class="countdown-period">' +
            t +
            "</div></div></div>" +
            '<div class="countdown-item countdown-hour"><div class="countdown-item-inner"><div class="countdown-amount">' +
            p.join() +
            '</div><div class="countdown-period">' +
            s +
            "</div></div></div>" +
            '<div class="countdown-item countdown-minute"><div class="countdown-item-inner"><div class="countdown-amount">' +
            k.join() +
            '</div><div class="countdown-period">' +
            r +
            "</div></div></div>" +
            '<div class="countdown-item countdown-second"><div class="countdown-item-inner"><div class="countdown-amount">' +
            j.join() +
            '</div><div class="countdown-period">' +
            q +
            "</div></div></div>"
        );
      }, 100);
    });
  };
  a(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/pxl_countdown.default",
      b
    );
  });
})(jQuery);

(function (a) {
  "use strict";
  function b() {
    var b = "<style>";
    a(document)
      .find(".pxl-inline-css")
      .each(function () {
        var c = a(this);
        (b += c.attr("data-css") + " "), c.remove();
      }),
      (b += "</style>"),
      a("head").append(b);
  }
  function c() {
    elementorFrontend.waypoint(
      a(document).find(".pxl-zoom-point"),
      function () {
        var b = a(this).offset(),
          c = b.top,
          d = a(window).scrollTop();
      },
      { offset: -100, triggerOnce: !0 }
    );
  }
  function d() {
    var a = typeof elementor != "undefined" ? elementor : elementorFrontend;
    a.hooks.addFilter("pxl-custom-section/before-render", function (b, a, c) {
      if (typeof a.row_divider != "undefined") {
        if (
          a.row_divider == "angle-top" ||
          a.row_divider == "angle-bottom" ||
          a.row_divider == "angle-top-right" ||
          a.row_divider == "angle-bottom-left"
        )
          return (
            (b =
              '<svg class="pxl-row-angle" style="fill:#ffffff" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 100 100" version="1.1" preserveAspectRatio="none" height="130px"><path stroke="" stroke-width="0" d="M0 100 L100 0 L200 100"></path></svg>'),
            b
          );
        if (
          a.row_divider == "angle-top-bottom" ||
          a.row_divider == "angle-top-bottom-left"
        )
          return (
            (b =
              '<svg class="pxl-row-angle pxl-row-angle-top" style="fill:#ffffff" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 100 100" version="1.1" preserveAspectRatio="none" height="130px"><path stroke="" stroke-width="0" d="M0 100 L100 0 L200 100"></path></svg><svg class="pxl-row-angle pxl-row-angle-bottom" style="fill:#ffffff" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 100 100" version="1.1" preserveAspectRatio="none" height="130px"><path stroke="" stroke-width="0" d="M0 100 L100 0 L200 100"></path></svg>'),
            b
          );
        if (
          a.row_divider == "wave-animation-top" ||
          a.row_divider == "wave-animation-bottom"
        )
          return (
            (b =
              '<svg class="pxl-row-angle" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1440 150" fill="#fff"><path d="M 0 26.1978 C 275.76 83.8152 430.707 65.0509 716.279 25.6386 C 930.422 -3.86123 1210.32 -3.98357 1439 9.18045 C 2072.34 45.9691 2201.93 62.4429 2560 26.198 V 172.199 L 0 172.199 V 26.1978 Z"><animate repeatCount="indefinite" fill="freeze" attributeName="d" dur="10s" values="M0 25.9086C277 84.5821 433 65.736 720 25.9086C934.818 -3.9019 1214.06 -5.23669 1442 8.06597C2079 45.2421 2208 63.5007 2560 25.9088V171.91L0 171.91V25.9086Z; M0 86.3149C316 86.315 444 159.155 884 51.1554C1324 -56.8446 1320.29 34.1214 1538 70.4063C1814 116.407 2156 188.408 2560 86.315V232.317L0 232.316V86.3149Z; M0 53.6584C158 11.0001 213 0 363 0C513 0 855.555 115.001 1154 115.001C1440 115.001 1626 -38.0004 2560 53.6585V199.66L0 199.66V53.6584Z; M0 25.9086C277 84.5821 433 65.736 720 25.9086C934.818 -3.9019 1214.06 -5.23669 1442 8.06597C2079 45.2421 2208 63.5007 2560 25.9088V171.91L0 171.91V25.9086Z"></animate></path></svg>'),
            b
          );
        if (a.row_divider == "curved-top" || a.row_divider == "curved-bottom")
          return (
            (b =
              '<svg class="pxl-row-angle" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1920 128" version="1.1" preserveAspectRatio="none" style="fill:#ffffff"><path stroke-width="0" d="M-1,126a3693.886,3693.886,0,0,1,1921,2.125V-192H-7Z"></path></svg>'),
            b
          );
      }
    });
  }
  var e = function (b, a) {
    setTimeout(function () {
      a(".pxl--item").each(function () {
        var b = a(this).find(".pxl--form-icon"),
          c = a(this).find(".wpcf7-form-control");
        c.before(b.clone()), b.remove();
      });
    }, 50);
  };
  a(window).on("elementor/frontend/init", function () {
    b(),
      c(),
      d(),
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/contact_form.default",
        e
      );
  });
})(jQuery);

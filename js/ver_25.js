(function (a) {
  "use strict";
  a(document).ready(function () {
    a(".uacf7-slider.uacf7-range").each(function () {
      a(document).on("input", ".uacf7-slider.uacf7-range", function () {
        a(this).parent().parent().find(".uacf7-value").html(a(this).val());
      });
    });
    function b() {
      a(".multistep_slide").each(function () {
        var e = a(this)
            .parent()
            .parent()
            .find(".uacf7-slider-handle")
            .data("handle"),
          c = a(this)
            .parent()
            .parent()
            .find(".uacf7-slider-handle")
            .data("min"),
          f = a(this)
            .parent()
            .parent()
            .find(".uacf7-slider-handle")
            .data("step"),
          g = a(this)
            .parent()
            .parent()
            .find(".uacf7-slider-handle")
            .data("max"),
          d = a(this)
            .parent()
            .parent()
            .find(".uacf7-slider-handle")
            .data("separator"),
          b = a(this)
            .parent()
            .parent()
            .find(".uacf7-slider-handle")
            .data("label"),
          h = a(this)
            .parent()
            .parent()
            .find(".uacf7-slider-handle")
            .data("default");
        e == 2 &&
          (a(this).slider({
            range: !0,
            min: c,
            step: f,
            max: g,
            values: [c, h],
            slide: function (e, c) {
              a(this)
                .parent()
                .parent()
                .find("#uacf7-amount")
                .val(
                  c.values[0] +
                    " " +
                    b +
                    " " +
                    " " +
                    d +
                    " " +
                    c.values[1] +
                    " " +
                    b +
                    " "
                ),
                a(this)
                  .parent()
                  .parent()
                  .find(".uacf7-amount")
                  .html(
                    c.values[0] +
                      " " +
                      b +
                      " " +
                      " " +
                      d +
                      " " +
                      c.values[1] +
                      " " +
                      b +
                      " "
                  );
            },
          }),
          a(this)
            .parent()
            .parent()
            .find("#uacf7-amount")
            .val(
              a(this).slider("values", 0) + " - " + a(this).slider("values", 1)
            ),
          a(this)
            .parent()
            .parent()
            .find(".uacf7-amount")
            .val(
              a(this).slider("values", 0) + " - " + a(this).slider("values", 1)
            ));
      });
    }
    b(),
      a(document).on("click", ".uacf7_repeater_add", function () {
        b();
      }),
      a(".mutli_range_slide").each(function () {
        var d = a(this)
            .parent()
            .parent()
            .find(".uacf7-slider-handle")
            .data("handle"),
          b = a(this)
            .parent()
            .parent()
            .find(".uacf7-slider-handle")
            .data("min"),
          e = a(this)
            .parent()
            .parent()
            .find(".uacf7-slider-handle")
            .data("step"),
          c = a(this)
            .parent()
            .parent()
            .find(".uacf7-slider-handle")
            .data("style"),
          f = a(this)
            .parent()
            .parent()
            .find(".uacf7-slider-handle")
            .data("max"),
          g = a(this)
            .parent()
            .parent()
            .find(".uacf7-slider-handle")
            .data("default");
        d == 2 &&
          (a(this).slider({
            range: !0,
            min: b,
            step: e,
            max: f,
            values: [b, g],
            slide: function (d, b) {
              a(this)
                .parent()
                .parent()
                .find("#uacf7-amount")
                .val(b.values[0] + " - " + b.values[1]),
                a(this)
                  .parent()
                  .parent()
                  .find(".min-value-" + c + "")
                  .html(b.values[0]),
                a(this)
                  .parent()
                  .parent()
                  .find(".max-value-" + c + "")
                  .html(b.values[1]);
            },
          }),
          a(this)
            .parent()
            .parent()
            .find("#uacf7-amount")
            .val(
              a(this).slider("values", 0) + " - " + a(this).slider("values", 1)
            ),
          a(this)
            .parent()
            .parent()
            .find(".uacf7-amount")
            .val(
              a(this).slider("values", 0) + " - " + a(this).slider("values", 1)
            ));
      });
  });
})(jQuery);

(function (a, b, d, e) {
  var c = a(b);
  c.on("load", function () {
    var b = [];
    a(".booked-tabs")
      .find("li a div.counter")
      .each(function () {
        var c = a(this),
          b = a(this).parent().attr("href");
        (b = b.split("#")),
          (b = b[1]),
          (totalAppointments = a("#profile-" + b).find(".appt-block").length),
          totalAppointments > 0 &&
            c.html(totalAppointments).css({ display: "flex" });
      }),
      a(".booked-fea-appt-list").on("click", ".user", function (c) {
        c.preventDefault();
        var b = a(this),
          d = b.attr("data-user-id"),
          e = b.parent().attr("data-appt-id"),
          f = booked_fea_vars.ajax_url;
        return (
          create_booked_modal(),
          a.ajax({
            url: f,
            type: "post",
            data: {
              action: "booked_fea_user_info_modal",
              user_id: d,
              appt_id: e,
            },
            success: function (d) {
              var c, b;
              a(".bm-window").html(d),
                (c = a(".booked-modal")),
                (b = c.find(".bm-window")),
                b.css({ visibility: "hidden" }),
                c.removeClass("bm-loading"),
                resize_booked_modal(),
                b.hide(),
                setTimeout(function () {
                  b.css({ visibility: "visible" }), b.show();
                }, 50);
            },
          }),
          !1
        );
      }),
      a(".booked-fea-appt-list").on("click", ".booked-show-cf", function (c) {
        c.preventDefault();
        var b = a(this).parent().find(".cf-meta-values-hidden");
        return b.is(":visible") ? b.hide() : b.show(), !1;
      }),
      a(".booked-fea-appt-list").on(
        "click",
        ".appt-block .approve",
        function (g) {
          var b, d, e, f, c;
          return (
            g.preventDefault(),
            (b = a(this)),
            (d = b.parents(".appt-block")),
            (e = d.attr("data-appt-id")),
            (f = booked_fea_vars.ajax_url),
            (confirm_appt_approve = confirm(
              booked_fea_vars.i18n_confirm_appt_approve
            )),
            confirm_appt_approve == !0 &&
              ((c = parseInt(
                b.parents(".booked-fea-appt-list").find("h4 span.count").html()
              )),
              (c = parseInt(c - 1)),
              b.parents(".booked-fea-appt-list").find("h4 span.count").html(c),
              b.parents("#profile-fea_pending").length &&
                (c < 1
                  ? a(".booked-tabs")
                      .find('li a[href="#fea_pending"] .counter')
                      .remove()
                  : a(".booked-tabs")
                      .find('li a[href="#fea_pending"] .counter')
                      .html(c)),
              a(".appt-block").animate({ opacity: 0.4 }, 0),
              b.remove(),
              a.ajax({
                method: "post",
                url: f,
                data: { action: "booked_fea_approve_appt", appt_id: e },
                success: function (b) {
                  a(".appt-block").animate({ opacity: 1 }, 150);
                },
              })),
            !1
          );
        }
      ),
      a(".booked-fea-appt-list").on(
        "click",
        ".appt-block .delete",
        function (g) {
          var c, d, e, f, b;
          return (
            g.preventDefault(),
            (c = a(this)),
            (d = c.parents(".appt-block")),
            (e = d.attr("data-appt-id")),
            (f = booked_fea_vars.ajax_url),
            (confirm_appt_delete = confirm(
              booked_fea_vars.i18n_confirm_appt_delete
            )),
            confirm_appt_delete == !0 &&
              ((b = parseInt(
                c.parents(".booked-fea-appt-list").find("h4 span.count").html()
              )),
              (b = parseInt(b - 1)),
              c.parents(".booked-fea-appt-list").find("h4 span.count").html(b),
              c.parents("#profile-fea_pending").length &&
                (b < 1
                  ? a(".booked-tabs")
                      .find('li a[href="#fea_pending"] .counter')
                      .remove()
                  : a(".booked-tabs")
                      .find('li a[href="#fea_pending"] .counter')
                      .html(b)),
              a(".appt-block").animate({ opacity: 0.4 }, 0),
              d.slideUp("fast", function () {
                a(this).remove();
              }),
              a.ajax({
                method: "post",
                url: f,
                data: { action: "booked_fea_delete_appt", appt_id: e },
                success: function (b) {
                  a(".appt-block").animate({ opacity: 1 }, 150);
                },
              })),
            !1
          );
        }
      );
  });
})(jQuery, window, document);

(function (a, b, c, o) {
  var n = a(b),
    f = a(c),
    d;
  f.ready(function () {
    a(c).on("booked-on-new-app", function (b) {
      (d = a(".field.field-paid-service")), g(d);
    }),
      j(),
      m(),
      k(),
      a(c).on("booked-before-loading-calendar-booking-options", function (a) {
        l();
      }),
      a(c).on("booked-before-loading-booking-form", function (a) {
        h();
      }),
      a(c).on("booked-on-requested-appointment", function (b, a) {
        a.redirect = i();
      });
  });
  function g(c) {
    var b = a("select", c),
      d,
      f,
      g,
      h;
    b.find("option").length < 3 &&
      (b.find("option:first-child").remove(),
      (d = parseInt(b.data("calendar-id"))),
      (f = b.val()),
      (g = b.attr("name")),
      (h = b.parent().find(".paid-variations")),
      e(f, g, d, h)),
      b.on("change", function () {
        var b = a(this),
          c = parseInt(b.data("calendar-id")),
          d = b.val(),
          f = b.attr("name"),
          g = b.parent().find(".paid-variations");
        e(d, f, c, g);
      });
  }
  function e(b, d, e, c) {
    if (!b) {
      c.html("");
      return;
    }
    var f = {
      action: booked_wc_variables.prefix + "load_variations",
      product_id: parseInt(b),
      calendar_id: e,
      field_name: d,
    };
    a.post(booked_wc_variables.ajaxurl, f, function (a) {
      c.html(a), resize_booked_modal();
    });
  }
  function j() {
    a(".booked-profile-appt-list .appt-block .edit").on("click", function (d) {
      d.preventDefault();
      var c = a(this),
        f = c.attr("data-appt-id"),
        e = c.attr("data-app-calendar");
      return (
        booked_wc_variables.i18n_confirm_appt_edit
          ? (confirm_edit = confirm(booked_wc_variables.i18n_confirm_appt_edit))
          : (confirm_edit = !0),
        confirm_edit === !0 && (b.location.href = e),
        !1
      );
    });
  }
  function k() {
    a(".booked-profile-appt-list .appt-block .pay").on("click", function (f) {
      var c, d, e;
      return (
        f.preventDefault(),
        (c = a(this)),
        (d = c.attr("data-appt-id")),
        (confirm_edit = confirm(booked_wc_variables.i18n_pay)),
        confirm_edit === !0 &&
          ((e = {
            action: booked_wc_variables.prefix + "add_to_cart",
            app_id: d,
          }),
          jQuery.post(
            booked_wc_variables.ajaxurl,
            e,
            function (a) {
              a.status === "success"
                ? (b.location.href = booked_wc_variables.checkout_page)
                : alert(a.messages[0]);
            },
            "json"
          )),
        !1
      );
    });
  }
  function l() {
    var d, e, a, c, f, g, h;
    if (!booked_load_calendar_date_booking_options) return;
    if (
      ((d = b.location.href),
      (e = d.replace(/^[^?]+\??/gi, "")),
      (a = !!e && e.split("&")),
      a && d.match("booked_wc_extension"))
    )
      for (c = 0; c < a.length; c++)
        (f = a[c].split("=")),
          (g = f[0].replace(/_\d+$/, "")),
          (h = f[1]),
          (booked_load_calendar_date_booking_options[g] = h);
  }
  function h() {
    var d, e, a, c, f, g, h;
    if (!booked_appt_form_options) return;
    if (
      ((d = b.location.href),
      (e = d.replace(/^[^?]+\??/gi, "")),
      (a = !!e && e.split("&")),
      a && d.match("booked_wc_extension"))
    )
      for (c = 0; c < a.length; c++)
        (f = a[c].split("=")),
          (g = f[0].replace(/_\d+$/, "")),
          (h = f[1]),
          (booked_appt_form_options[g] = h);
  }
  function i() {
    var c = !1,
      d = a("form#newAppointmentForm");
    return (
      !!(a(".field-paid-service", d).each(function () {
        var b = a(this);
        a("select", b).each(function () {
          var b = a(this);
          b.val() !== "" && (c = !0);
        });
      }),
      c) && ((b.location = booked_wc_variables.checkout_page), !0)
    );
  }
  function m() {
    f.on(
      "click",
      ".booked-form input#submit-edit-request-appointment",
      function (d) {
        var c = a(this);
        a("form#newAppointmentForm p.status")
          .show()
          .html(
            '<i class="fa-solid fa-circle-notch fa-spin"></i>&nbsp;&nbsp;&nbsp;' +
              booked_js_vars.i18n_please_wait
          ),
          resize_booked_modal(),
          d.preventDefault(),
          a.ajax({
            type: "post",
            url: booked_js_vars.ajax_url,
            data: a("#newAppointmentForm").serialize(),
            success: function (d) {
              d = d.split("###");
              var e = d[0].substr(d[0].length - 5);
              e == "error"
                ? (c.attr("disabled", !1),
                  c.parents("form").find("button.cancel").show(),
                  a(".booked-form input").each(function () {
                    (thisDefault = a(this).attr("title")),
                      (thisVal = a(this).val()),
                      thisVal || a(this).val(thisDefault);
                  }),
                  a("form#newAppointmentForm p.status")
                    .show()
                    .html(
                      '<i class="fa-solid fa-triangle-exclamation" style="color:#E35656"></i>&nbsp;&nbsp;&nbsp;' +
                        d[1]
                    ),
                  resize_booked_modal())
                : (b.location = booked_js_vars.profilePage);
            },
          });
      }
    );
  }
})(jQuery, window, document);

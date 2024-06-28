!(function (t) {
  "use strict";
  const e = t.params,
    n =
      (document.querySelector.bind(document),
      (t, e) => e.split(".").reduce((t, e) => t && t[e], t)),
    s = () => null,
    i = (t) => (null === t || t === undefined ? "" : t),
    o = "wc/store/checkout";
  function a() {
    const i = e.allowTracking ? n : s,
      o = Object.entries(t.fields).map(([t, e]) => [t, i(sbjs.get, e)]);
    return Object.fromEntries(o);
  }
  function c(t) {
    window.wp &&
      window.wp.data &&
      window.wp.data.dispatch &&
      window.wc &&
      window.wc.wcBlocksData &&
      window.wp.data
        .dispatch(window.wc.wcBlocksData.CHECKOUT_STORE_KEY)
        .__internalSetExtensionData("woocommerce/order-attribution", t, !0);
  }
  function r() {
    if (
      window.wp &&
      window.wp.data &&
      "function" == typeof window.wp.data.subscribe
    ) {
      const t = window.wp.data.subscribe(function () {
        t(), c(a());
      }, o);
    }
  }
  (t.setOrderTracking = function (t) {
    (e.allowTracking = t),
      t
        ? sbjs.init({
            lifetime: Number(e.lifetime),
            session_length: Number(e.session),
            timezone_offset: "0",
          })
        : (function () {
            const t = window.location.hostname;
            [
              "sbjs_current",
              "sbjs_current_add",
              "sbjs_first",
              "sbjs_first_add",
              "sbjs_session",
              "sbjs_udata",
              "sbjs_migrations",
              "sbjs_promo",
            ].forEach((e) => {
              document.cookie = `${e}=; path=/; max-age=-999; domain=.${t};`;
            });
          })();
    const n = a();
    !(function (t) {
      for (const e of document.querySelectorAll("wc-order-attribution-inputs"))
        e.values = t;
    })(n),
      c(n);
  }),
    t.setOrderTracking(e.allowTracking),
    "loading" === document.readyState
      ? document.addEventListener("DOMContentLoaded", r)
      : r(),
    window.customElements.define(
      "wc-order-attribution-inputs",
      class extends HTMLElement {
        constructor() {
          if (
            (super(),
            (this._fieldNames = Object.keys(t.fields)),
            this.hasOwnProperty("_values"))
          ) {
            let t = this.values;
            delete this.values, (this.values = t || {});
          }
        }
        connectedCallback() {
          let t = "";
          for (const n of this._fieldNames) {
            const s = i(this.values[n]);
            t += `<input type="hidden" name="${e.prefix}${n}" value="${s}"/>`;
          }
          this.innerHTML = t;
        }
        set values(t) {
          if (((this._values = t), this.isConnected))
            for (const t of this._fieldNames) {
              const n = this.querySelector(`input[name="${e.prefix}${t}"]`);
              n
                ? (n.value = i(this.values[t]))
                : console.warn(
                    `Field "${t}" not found. Most likely, the '<wc-order-attribution-inputs>' element was manipulated.`
                  );
            }
        }
        get values() {
          return this._values;
        }
      }
    );
})(window.wc_order_attribution);
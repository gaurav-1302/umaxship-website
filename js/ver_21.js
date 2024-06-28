!(function (T, C) {
  "use strict";
  function A() {
    T("body").data("rs-fullScreenMode", !T("body").data("rs-fullScreenMode")),
      T("body").data("rs-fullScreenMode") &&
        setTimeout(function () {
          D.window.trigger("resize");
        }, 200);
  }
  function P(e, t) {
    return T(
      0 == t
        ? e
        : (1 == t
            ? e
            : (2 == t
                ? e
                : (3 == t ? e : (4 == t ? e : e.parentNode).parentNode)
                    .parentNode
              ).parentNode
          ).parentNode
    );
  }
  function r(e, t, i) {
    if (D[t] !== C) {
      D[t].syncload--;
      var a,
        r = D.gA(e, "reference");
      for (a in D[t].loadqueue)
        D[t].loadqueue.hasOwnProperty(a) &&
          "loaded" !== D[t].loadqueue[a].progress &&
          r == D[t].loadqueue[a].src &&
          ((D[t].loadqueue[a].img = e),
          (D[t].loadqueue[a].progress = i),
          (D[t].loadqueue[a].width = e.naturalWidth),
          (D[t].loadqueue[a].height = e.naturalHeight));
      m(t);
    }
  }
  function t(e) {
    function t() {
      e !== C &&
        D !== C &&
        D[e] !== C &&
        (0 == T("body").find(D[e].c).length ||
        null === D[e] ||
        null === D[e].c ||
        D[e].c === C ||
        0 === D[e].length
          ? (E(e), clearInterval(D[e].cdint))
          : (D[e].c.trigger("revolution.slide.slideatend"),
            1 == D[e].c.data("conthoverchanged") &&
              ((D[e].conthover = D[e].c.data("conthover")),
              D[e].c.data("conthoverchanged", 0)),
            D.callingNewSlide(e, 1, !0)));
    }
    var i = tpGS.gsap.timeline({ paused: !0 }),
      a =
        "reset" === D[e].progressBar.reset || D[e].progressBar.notnew === C
          ? 0
          : 0.2,
      r =
        (r =
          "slide" === D[e].progressBar.basedon
            ? 0
            : D[e].pr_processing_key !== C
            ? D[e].pr_processing_key
            : D[e].pr_active_key) === C
          ? 0
          : r;
    if ("horizontal" === D[e].progressBar.style) {
      if (
        (i.add(
          tpGS.gsap.to(D[e].progressCBarInner[r], a, {
            scaleX: 0,
            transformOrigin:
              "right" === D[e].progressBar.horizontal ? "100% 50%" : "0% 50%",
          })
        ),
        i.add(
          tpGS.gsap.to(D[e].progressCBarInner[r], D[e].duration / 1e3, {
            transformOrigin:
              "right" === D[e].progressBar.horizontal ? "100% 50%" : "0% 50%",
            force3D: "auto",
            scaleX: 1,
            onComplete: t,
            delay: 0.5,
            ease: D[e].progressBar.ease,
          })
        ),
        "module" === D[e].progressBar.basedon)
      )
        for (var o = 0; o < D[e].slideamount; o++)
          o !== r &&
            i.add(
              tpGS.gsap.set(D[e].progressCBarInner[o], {
                scaleX: o < r ? 1 : 0,
                transformOrigin:
                  "right" === D[e].progressBar.horizontal
                    ? "100% 50%"
                    : "0% 50%",
              }),
              0
            );
    } else if ("vertical" === D[e].progressBar.style) {
      if (
        (D[e].progressCBarInner[r] !== C &&
          i.add(
            tpGS.gsap.to(D[e].progressCBarInner[r], a, {
              scaleY: 0,
              transformOrigin:
                "bottom" === D[e].progressBar.vertical ? "50% 100%" : "50% 0%",
            })
          ),
        D[e].progressCBarInner[r] !== C &&
          i.add(
            tpGS.gsap.to(D[e].progressCBarInner[r], D[e].duration / 1e3, {
              transformOrigin:
                "bottom" === D[e].progressBar.vertical ? "50% 100%" : "50% 0%",
              force3D: "auto",
              scaleY: 1,
              onComplete: t,
              delay: 0.5,
              ease: D[e].progressBar.ease,
            })
          ),
        "module" === D[e].progressBar.basedon)
      )
        for (o = 0; o < D[e].slideamount; o++)
          o !== r &&
            D[e].progressCBarInner[o] !== C &&
            i.add(
              tpGS.gsap.set(D[e].progressCBarInner[o], {
                scaleY: o < r ? 1 : 0,
                transformOrigin:
                  "botton" === D[e].progressBar.vertical
                    ? "50% 100%"
                    : "50% 0%",
              }),
              0
            );
    } else {
      var s =
          "slide" === D[e].progressBar.basedon
            ? 0
            : Math.max(0, (360 / D[e].slideamount) * r),
        n =
          "slide" === D[e].progressBar.basedon
            ? 360
            : (360 / D[e].slideamount) * (r + 1);
      "ccw" === D[e].progressBar.style &&
        "slide" !== D[e].progressBar.basedon &&
        ((s = 360 - n), (n = 360 - (360 / D[e].slideamount) * r)),
        i.add(
          tpGS.gsap.to(D[e].progressBar, a, {
            degree: "cw" === D[e].progressBar.style ? s : n,
            onUpdate: function () {
              S(e);
            },
          })
        ),
        i.add(
          tpGS.gsap.to(D[e].progressBar, D[e].duration / 1e3, {
            degree: "cw" === D[e].progressBar.style ? n : s,
            onUpdate: function () {
              S(e);
            },
            onComplete: t,
            delay: 0.5,
            ease: D[e].progressBar.ease,
          })
        );
    }
    return (D[e].progressBar.notnew = !0), i;
  }
  function i() {
    T(".rev_redraw_on_blurfocus").each(function () {
      var e = this.id;
      if (D[e] == C || D[e].c == C || 0 === D[e].c.length) return !1;
      1 != D[e].windowfocused &&
        ((D[e].windowfocused = !0),
        tpGS.gsap.delayedCall(0.1, function () {
          D[e].fallbacks.nextSlideOnWindowFocus && D[e].c.revnext(),
            D[e].c.revredraw(),
            "playing" == D[e].lastsliderstatus && D[e].c.revresume(),
            D[e].c.trigger("revolution.slide.tabfocused");
        }));
    });
  }
  function a() {
    document.hasFocus() ||
      T(".rev_redraw_on_blurfocus").each(function (e) {
        var t = this.id;
        (D[t].windowfocused = !1),
          (D[t].lastsliderstatus = D[t].sliderstatus),
          D[t].c.revpause(),
          D[t].c.trigger("revolution.slide.tabblured");
      });
  }
  var e,
    o = "Slider Revolution 6.6.19",
    D =
      ((window.RSANYID = window.RSANYID === C ? [] : window.RSANYID),
      (window.RSANYID_sliderID =
        window.RSANYID_sliderID === C ? [] : window.RSANYID_sliderID),
      (T.fn.revolution = T.fn.revolution || {}),
      T.fn.revolution),
    D =
      ((T.fn.revolutionInit = function (a) {
        return this.each(function () {
          D.ISM = D.ISM || D.is_mobile();
          for (var e = document.getElementsByClassName("rs-p-wp-fix"); e[0]; )
            e[0].parentNode.removeChild(e[0]);
          this.id !== C
            ? ((D[t] = { anyid: [] }), (this.id = D.revCheckIDS(t, this, !0)))
            : (this.id = "rs_module_" + Math.round(1e7 * Math.random()));
          var t = this.id,
            i = D.clone(a);
          (D[t] = U(a)),
            (D[t].ignoreHeightChange =
              D.ISM &&
              "fullscreen" === D[t].sliderLayout &&
              D[t].ignoreHeightChange),
            (D[t].option_export = i),
            (D[t].anyid = []),
            (D[t]._Lshortcuts = {}),
            (D[t].computedStyle = {}),
            (D[t].c = T(this)),
            (D[t].cpar = D[t].c.parent()),
            (D[t].canvas = D[t].c.find("rs-slides")),
            (D[t].caches = {
              calcResponsiveLayersList: [],
              contWidthManager: {},
              middleHeights: {},
            }),
            (D[t].sbgs = {}),
            (window.RSBrowser =
              window.RSBrowser === C ? D.get_browser() : window.RSBrowser),
            D.setIsIOS(),
            D.setIsChrome8889(),
            D.useBackdrop === C && D.checkBackdrop(),
            (D[t].noDetach = D[t].BUG_ie_clipPath =
              "Edge" === window.RSBrowser || "IE" === window.RSBrowser),
            (D.getByTag = s()),
            (D[t].indexhelper = 0),
            (D[t].fullScreenOffsetResult = 0),
            (D[t].level = 0),
            (D[t].rtl = T("body").hasClass("rtl") || "rtl" == document.dir),
            (D[t]._L = D[t]._L === C ? {} : D[t]._L),
            (D[t].emptyObject = "{}"),
            (D[t].dimensionReCheck = {}),
            D.globalListener === C && D.pageHandler(t),
            D[t].stopAfterLoops != C && -1 < D[t].stopAfterLoops
              ? (D[t].looptogo = D[t].stopAfterLoops)
              : (D[t].looptogo = "disabled"),
            (window.T = D[t]),
            (D[t].BUG_safari_clipPath =
              "Safari" === D.get_browser() && "12" < D.get_browser_version()),
            (D[t].minHeight =
              "fullwidth" !== D[t].sliderLayout &&
              "carousel" !== D[t].sliderType &&
              D[t].minHeight != C &&
              "" !== D[t].minHeight
                ? parseInt(D[t].minHeight, 0)
                : 0),
            (D[t].minHeight = D[t].minHeight === C ? 0 : D[t].minHeight),
            (D[t].isEdge = "Edge" === D.get_browser()),
            n(t),
            D.updateVisibleArea(t),
            V(t),
            D.mesuredScrollBarDone || D.mesureScrollBar(),
            window.requestAnimationFrame(function () {
              var e;
              "fullscreen" === D[t].sliderLayout &&
                0 !== (e = D.getFullscreenOffsets(t)) &&
                D[t].cpar.height(D.getWinH(t) - e),
                (D[t].cpar[0].style.visibility = "visible");
            }),
            "hero" == D[t].sliderType &&
              D[t].c.find("rs-slide").each(function (e) {
                0 < e && T(this).remove();
              }),
            (D[t].navigation.use =
              "hero" !== D[t].sliderType &&
              ("carousel" == D[t].sliderType ||
                D[t].navigation.keyboardNavigation ||
                "on" == D[t].navigation.mouseScrollNavigation ||
                "carousel" == D[t].navigation.mouseScrollNavigation ||
                D[t].navigation.touch.touchenabled ||
                D[t].navigation.arrows.enable ||
                D[t].navigation.bullets.enable ||
                D[t].navigation.thumbnails.enable ||
                D[t].navigation.tabs.enable)),
            D[t].c.find("rs-bgvideo").each(function () {
              "RS-BGVIDEO" !== this.tagName ||
                (this.id !== C && "" !== this.id) ||
                (this.id = "rs-bg-video-" + Math.round(1e6 * Math.random()));
            }),
            (tpGS.force3D = "auto"),
            !0 === D[t].modal.useAsModal &&
              -1 === D.RS_prioList.indexOf(t) &&
              ((D.RS_toInit[t] = !1), D.RS_prioList.push(t)),
            D.RS_killedlist !== C &&
              -1 !== D.RS_killedlist.indexOf(t) &&
              ((D.RS_toInit[t] = !1), D.RS_prioList.push(t)),
            !0 === D.RS_prioListFirstInit &&
              !0 !== D[t].modal.useAsModal &&
              -1 === D.RS_prioList.indexOf(t) &&
              ((D.RS_toInit[t] = !1), D.RS_prioList.push(t)),
            D.initNextRevslider(t);
        });
      }),
      window.RS_F),
    s =
      (T.fn.extend({
        getRSJASONOptions: function (e) {
          console.log(JSON.stringify(D[e].option_export));
        },
        getRSVersion: function (e) {
          var t,
            i,
            a = window.SliderRevolutionVersion;
          if (!e) {
            for (var r in ((t = i =
              "---------------------------------------------------------\n"),
            (t +=
              "    Currently Loaded Slider Revolution & SR Modules :\n" + i),
            a))
              a.hasOwnProperty(r) && (t += a[r].alias + ": " + a[r].ver + "\n");
            t += i;
          }
          return e ? a : t;
        },
        revremoveslide: function (i) {
          return this.each(function () {
            var e,
              t = this.id;
            i < 0 ||
              i > D[t].slideamount ||
              (D[t] &&
                0 < D[t].slides.length &&
                (0 < i || i <= D[t].slides.length) &&
                ((e = D.gA(D[t].slides[i], "key")),
                (D[t].slideamount = D[t].slideamount - 1),
                (D[t].realslideamount = D[t].realslideamount - 1),
                l("rs-bullet", e, t),
                l("rs-tab", e, t),
                l("rs-thumb", e, t),
                T(D[t].slides[i]).remove(),
                (D[t].thumbs = I(D[t].thumbs, i)),
                D.updateNavIndexes && D.updateNavIndexes(t),
                i <= D[t].pr_active_key) &&
                (D[t].pr_active_key = D[t].pr_active_key - 1));
          });
        },
        revaddcallback: function (e) {
          return this.each(function () {
            D[this.id] &&
              (D[this.id].callBackArray === C &&
                (D[this.id].callBackArray = []),
              D[this.id].callBackArray.push(e));
          });
        },
        revgetparallaxproc: function () {
          if (D[this[0].id]) return D[this[0].id].scrollproc;
        },
        revdebugmode: function () {},
        revscroll: function (t) {
          return this.each(function () {
            var e = T(this);
            T("body,html").animate(
              { scrollTop: e.offset().top + e.height() - t + "px" },
              { duration: 400 }
            );
          });
        },
        revredraw: function () {
          return this.each(function () {
            G(this.id, C, !0);
          });
        },
        revGoToFrame: function (e) {
          var t;
          e.layerid != C &&
            e.frame != C &&
            this != C &&
            null != this &&
            ((e.moduleid = this[0].id),
            (e.targetlayer = T("#" + e.layerid)),
            e.targetlayer != C) &&
            0 != e.targetlayer.length &&
            ((t = {
              layer: e.targetlayer,
              frame: e.frame,
              mode: "trigger",
              id: e.moduleid,
            }),
            !0 === e.children &&
              ((t.updateChildren = !0), (t.fastforward = !0)),
            D.renderLayerAnimation) &&
            D.renderLayerAnimation(t);
        },
        revkill: function () {
          return this.each(function () {
            if (this != C && null != this) {
              var e = this.id,
                t =
                  (D[e].c.data("conthover", 1),
                  D[e].c.data("conthoverchanged", 1),
                  D[e].c.trigger("revolution.slide.onpause"),
                  (D[e].tonpause = !0),
                  D[e].c.trigger("stoptimer"),
                  (D[e].sliderisrunning = !1),
                  "updateContainerSizes." + D[e].c.attr("id"));
              D.window.off(t),
                tpGS.gsap.killTweensOf(D[e].c.find("*"), !1),
                tpGS.gsap.killTweensOf(D[e].c, !1),
                D[e].c.off("hover, mouseover, mouseenter,mouseleave, resize"),
                D[e].c.find("*").each(function () {
                  var e = T(this);
                  e.off(
                    "on, hover, mouseenter,mouseleave,mouseover, resize,restarttimer, stoptimer"
                  ),
                    e.data("mySplitText", null),
                    e.data("ctl", null),
                    e.data("tween") != C && e.data("tween").kill(),
                    e.data("pztl") != C && e.data("pztl").kill(),
                    e.data("timeline_out") != C &&
                      e.data("timeline_out").kill(),
                    e.data("timeline") != C && e.data("timeline").kill(),
                    e.remove(),
                    e.empty();
                }),
                tpGS.gsap.killTweensOf(D[e].c.find("*"), !1),
                tpGS.gsap.killTweensOf(D[e].c, !1),
                D[e].progressC.remove();
              try {
                D[e].c.closest(".rev_slider_wrapper").detach();
              } catch (e) {}
              try {
                D[e].c.closest("rs-fullwidth-wrap").remove();
              } catch (e) {}
              try {
                D[e].c.closest("rs-module-wrap").remove();
              } catch (e) {}
              try {
                D[e].c.remove();
              } catch (e) {}
              D[e].cpar.detach(),
                D[e].c.html(""),
                (D[e].c = null),
                (window[D[e].revapi] = C),
                delete D[e],
                delete D.RS_swapList[e],
                delete D.slidersToScroll[e],
                delete D.RS_toInit[e],
                D.nextSlider == e && delete D.nextSlider,
                D.RS_prioList.splice(D.RS_prioList.indexOf(e), 1),
                (D.RS_killedlist =
                  D.RS_killedlist === C ? [] : D.RS_killedlist),
                -1 === D.RS_killedlist.indexOf(e) && D.RS_killedlist.push(e);
            }
          });
        },
        revpause: function () {
          return this.each(function () {
            var e = T(this);
            e != C &&
              0 < e.length &&
              0 < T("body").find("#" + e.attr("id")).length &&
              (e.data("conthover", 1),
              e.data("conthoverchanged", 1),
              e.trigger("revolution.slide.onpause"),
              (D[this.id].tonpause = !0),
              e.trigger("stoptimer"));
          });
        },
        revresume: function () {
          return this.each(function () {
            var e;
            D[this.id] !== C &&
              ((e = T(this)).data("conthover", 0),
              e.data("conthoverchanged", 1),
              e.trigger("revolution.slide.onresume"),
              (D[this.id].tonpause = !1),
              e.trigger("starttimer"));
          });
        },
        revmodal: function (e) {
          var t = this instanceof T ? this[0] : this,
            i = t.id;
          D[t.id] !== C && D.revModal(i, e);
        },
        revstart: function () {
          var e = this instanceof T ? this[0] : this;
          return D[e.id] === C
            ? (console.log("Slider is Not Existing"), !1)
            : D[e.id].sliderisrunning || !0 === D[e.id].initEnded
            ? (console.log("Slider Is Running Already"), !1)
            : ((D[e.id].c = T(e)),
              (D[e.id].canvas = D[e.id].c.find("rs-slides")),
              g(e.id),
              !0);
        },
        revnext: function () {
          return this.each(function () {
            D[this.id] !== C &&
              D.callingNewSlide(
                this.id,
                1,
                "carousel" === D[this.id].sliderType
              );
          });
        },
        revprev: function () {
          return this.each(function () {
            D[this.id] !== C &&
              D.callingNewSlide(
                this.id,
                -1,
                "carousel" === D[this.id].sliderType
              );
          });
        },
        revmaxslide: function () {
          return T(this).find("rs-slide").length;
        },
        revcurrentslide: function () {
          if (D[T(this)[0].id] !== C)
            return parseInt(D[T(this)[0].id].pr_active_key, 0) + 1;
        },
        revlastslide: function () {
          return T(this).find("rs-slide").length;
        },
        revshowslide: function (e) {
          return this.each(function () {
            D[this.id] !== C &&
              e !== C &&
              D.callingNewSlide(this.id, "to" + (e - 1));
          });
        },
        revcallslidewithid: function (e) {
          return this.each(function () {
            D[this.id] !== C &&
              D.callingNewSlide(
                this.id,
                e,
                "carousel" === D[this.id].sliderType
              );
          });
        },
      }),
      (D = T.fn.revolution),
      T.extend(!0, D, {
        isNumeric: function (e) {
          return !isNaN(parseFloat(e)) && isFinite(e);
        },
        trim: function (e) {
          return e !== C && null !== e && "string" == typeof e ? e.trim() : e;
        },
        setCookie: function (e, t, i) {
          var a = new Date(),
            i =
              (a.setTime(a.getTime() + 60 * i * 60 * 1e3),
              "expires=" + a.toUTCString());
          document.cookie = e + "=" + t + ";" + i + ";path=/";
        },
        getCookie: function (e) {
          for (
            var t = e + "=", i = document.cookie.split(";"), a = 0;
            a < i.length;
            a++
          ) {
            for (var r = i[a]; " " == r.charAt(0); ) r = r.substring(1);
            if (0 == r.indexOf(t))
              return decodeURIComponent(r.substring(t.length, r.length));
          }
          return "";
        },
        mesureScrollBar: function () {
          (D.mesuredScrollBarDone = !0),
            requestAnimationFrame(function () {
              var e = document.createElement("div");
              (e.className = "RSscrollbar-measure"),
                document.body.appendChild(e),
                (D.mesuredScrollbarWidth = e.offsetWidth - e.clientWidth),
                document.body.removeChild(e);
            });
        },
        mobileTimedHeightCheck: function () {
          requestAnimationFrame(function () {
            D.mobileTimedHeightCheck();
          }),
            (D.mobileHeights.now = Date.now()),
            (D.mobileHeights.elapsed =
              D.mobileHeights.now - D.mobileHeights.then),
            D.mobileHeights.elapsed > D.mobileHeights.fpsInterval &&
              ((D.mobileHeights.then =
                D.mobileHeights.now -
                (D.mobileHeights.elapsed % D.mobileHeights.fpsInterval)),
              D.getWindowDimension());
        },
        pageHandler: function (e) {
          (D.globalListener = !0),
            (D.window = T(window)),
            (D.document = T(document)),
            (D.RS_toInit = {}),
            (D.RS_prioList = []),
            (D.RS_swapping = []),
            (D.RS_swapList = {}),
            window.isSafari11 === C &&
              ((window.isSafari11 = D.isSafari11()),
              document.body.classList.add("rs-safari")),
            D.ISM
              ? (window.addEventListener("orientationchange", function () {
                  D.getWindowDimension(!1, !0),
                    setTimeout(function () {
                      D.getWindowDimension(!0, !0);
                    }, 400);
                }),
                window.addEventListener("resize", D.getWindowDimension),
                tpGS.gsap.delayedCall(3, function () {
                  window.removeEventListener("resize", D.getWindowDimension);
                }),
                (D.mobileHeights = { fpsInterval: 500, then: Date.now() }),
                D[e].ignoreHeightChange ||
                  D.mobileHeights.checking ||
                  ((D.mobileHeights.checking = !0), D.mobileTimedHeightCheck()))
              : window.addEventListener("resize", D.getWindowDimension),
            D.getWindowDimension(!1),
            (D.stickySupported = !1),
            "IE" !== window.RSBrowser && (D.stickySupported = !0),
            D.checkParrentOverflows(e);
          var t,
            i = D.getByTag(document, "RS-MODULE");
          for (t in i)
            i.hasOwnProperty(t) &&
              ((D.RS_toInit[i[t].id] = !1), D.RS_prioList.push(i[t].id));
          (D.nextSlider = e),
            (D.RS_prioListFirstInit = !0),
            D.document.one("click", function () {
              D.clickedOnce = !0;
            }),
            document.addEventListener("visibilitychange", N),
            D.hasNavClickListener === C &&
              (D.document.on(
                D.is_mobile() ? "touchstart" : "mouseenter",
                ".tparrows, .tp-bullets, .tp-bullet, .tp-tab, .tp-thumb, .tp-thumbs, .tp-tabs, .tp-rightarrow, .tp-leftarrow",
                function (e) {
                  this.classList.add("rs-touchhover");
                }
              ),
              D.document.on(
                D.is_mobile() ? "touchend" : "mouseleave",
                ".tparrows, .tp-bullets, .tp-bullet, .tp-tab, .tp-thumb, .tp-tabs,  .tp-rightarrow, .tp-leftarrow",
                function (e) {
                  var t = this;
                  requestAnimationFrame(function () {
                    t.classList.remove("rs-touchhover");
                  });
                }
              ),
              (D.hasNavClickListener = !0));
        },
        destroyCanvas: function (e) {
          e && ((e.width = e.height = 0), e.remove());
        },
        checkParrentOverflows: function (i) {
          window.requestAnimationFrame(function () {
            for (
              var e, t = D[i].cpar[0];
              t.parentNode && !1 !== D.stickySupported;

            )
              "RS-MODULE-WRAP" !== t.tagName &&
                "RS-FULLWIDTH-WRAP" !== t.tagName &&
                "RS-MODULE-WRAP" !== t.tagName &&
                -1 === t.className.indexOf("wp-block-themepunch-revslider") &&
                ((e = window.getComputedStyle(t)),
                (D.stickySupported =
                  "hidden" !== e.overflow &&
                  "hidden" !== e.overflowX &&
                  "hidden" !== e.overflowY)),
                (t = t.parentNode);
          });
        },
        observeRemoved: function (t) {
          new MutationObserver(function (e) {
            try {
              document.body.contains(e[0].target) || D[t].c.revkill();
            } catch (e) {}
          }).observe(D[t].cpar[0], { childList: !0 });
        },
        initNextRevslider: function (e) {
          D.RS_prioList[0] === e && !1 === D.RS_toInit[e]
            ? ((D.RS_toInit[e] = "waiting"),
              p(e),
              setTimeout(function () {
                D.initNextRevslider(e);
              }, 19))
            : D.RS_prioList[0] === e && "waiting" === D.RS_toInit[e]
            ? setTimeout(function () {
                D.initNextRevslider(e);
              }, 19)
            : D.RS_prioList[0] === e && !0 === D.RS_toInit[e]
            ? (D.RS_prioList.shift(),
              0 !== D.RS_prioList.length &&
                setTimeout(function () {
                  D.initNextRevslider(e);
                }, 19))
            : D.RS_prioList[0] !== e && !1 === D.RS_toInit[e]
            ? setTimeout(function () {
                D.initNextRevslider(e);
              }, 19)
            : 0 === D.RS_prioList.length && !0 === D.RS_toInit[e] && p(e);
        },
        scrollTicker: function (e) {
          1 != D.scrollTickerAdded &&
            ((D.slidersToScroll = []),
            (D.scrollTickerAdded = !0),
            D.ISM
              ? (tpGS.gsap.ticker.fps(150),
                tpGS.gsap.ticker.add(function () {
                  D.generalObserver();
                }))
              : document.addEventListener(
                  "scroll",
                  function (e) {
                    D.scrollRaF === C &&
                      (D.scrollRaF = requestAnimationFrame(
                        D.generalObserver.bind(this, !0)
                      ));
                  },
                  { passive: !0 }
                )),
            D.slidersToScroll.push(e),
            D.generalObserver(D.ISM);
        },
        generalObserver: function (e, t) {
          for (var i in (D.scrollRaF &&
            (D.scrollRaF = cancelAnimationFrame(D.scrollRaF)),
          (D.lastwindowheight = D.lastwindowheight || D.winH),
          (D.scrollY = window.scrollY),
          D.slidersToScroll))
            D.slidersToScroll.hasOwnProperty(i) &&
              D.scrollHandling(D.slidersToScroll[i], e, C, t);
        },
        wrapObserver: {
          targets: [],
          init: function (a) {
            var r = 0,
              o = 0,
              s = e.bind(D.wrapObserver);
            function e() {
              if ((o++, requestAnimationFrame(s), !(o - r < 30))) {
                r = o;
                for (var e, t, i = 0; i < D.wrapObserver.targets.length; i++)
                  D.wrapObserver.targets.hasOwnProperty(i) &&
                    ((t = (e =
                      D.wrapObserver.targets[i]).elem.getBoundingClientRect()),
                    (e.lw === t.width && e.lh === t.height) ||
                      0 === t.width ||
                      (e.callback &&
                        (e.callback.pause(),
                        e.callback.kill(),
                        (e.callback = null)),
                      (e.callback = tpGS.gsap.to(
                        {},
                        {
                          duration: 0.2,
                          onComplete: a.bind(window, e.elem, e.id),
                        }
                      ))),
                    (e.lw = t.width),
                    (e.lh = t.height));
              }
            }
            e();
          },
          observe: function (e, t) {
            var i;
            "" !==
              (e = e.getBoundingClientRect
                ? e
                : e[0].getBoundingClientRect
                ? e[0]
                : "") &&
              ((i = e.getBoundingClientRect()),
              D.wrapObserver.targets.push({
                elem: e,
                id: t,
                lw: i.width,
                lh: i.height,
              }));
          },
        },
        enterViewPort: function (i, e) {
          !0 !== D[i].started
            ? ((D[i].started = !0),
              D.lazyLoadAllSlides(i),
              D[i].c.trigger("revolution.slide.firstrun"),
              setTimeout(function () {
                y(i),
                  "hero" !== D[i].sliderType &&
                    D.manageNavigation &&
                    D[i].navigation.use &&
                    !0 === D[i].navigation.createNavigationDone &&
                    D.manageNavigation(i),
                  1 < D[i].slideamount && x(i),
                  setTimeout(function () {
                    D[i] !== C &&
                      ((D[i].revolutionSlideOnLoaded = !0),
                      D[i].c.trigger("revolution.slide.onloaded"),
                      D.calcScrollToId());
                  }, 50);
              }, D[i].startDelay),
              (D[i].startDelay = 0),
              window.requestAnimationFrame(function () {
                u(i);
              }))
            : (D[i].waitForCountDown && (x(i), (D[i].waitForCountDown = !1)),
              ("playing" != D[i].sliderlaststatus &&
                D[i].sliderlaststatus != C) ||
                D[i].c.trigger("starttimer"),
              D[i].lastplayedvideos != C &&
                0 < D[i].lastplayedvideos.length &&
                T.each(D[i].lastplayedvideos, function (e, t) {
                  D.playVideo(t, i);
                }));
        },
        leaveViewPort: function (i) {
          (D[i].sliderlaststatus = D[i].sliderstatus),
            D[i].c.trigger("stoptimer"),
            D[i].playingvideos != C &&
              0 < D[i].playingvideos.length &&
              ((D[i].lastplayedvideos = T.extend(!0, [], D[i].playingvideos)),
              D[i].playingvideos) &&
              T.each(D[i].playingvideos, function (e, t) {
                (D[i].leaveViewPortBasedStop = !0),
                  D.stopVideo && D.stopVideo(t, i);
              });
        },
        scrollHandling: function (e, t, i, a) {
          var r, o;
          D[e] !== C &&
            ((r = (
              D[e].topc !== C
                ? D[e].topc
                : 0 === D[e].canv.height
                ? D[e].cpar
                : D[e].c
            )[0].getBoundingClientRect()),
            (o = D.ISM ? window.innerHeight : D.lastwindowheight),
            (r.hheight = (
              0 === r.height
                ? 0 === D[e].canv.height
                  ? D[e].module
                  : D[e].canv
                : r
            ).height),
            (D[e].scrollproc =
              r.top < 0 || (r.hheight > o && r.top < o)
                ? r.top / r.hheight
                : r.bottom > o
                ? (r.bottom - o) / r.hheight
                : 0),
            (o = Math.max(0, 1 - Math.abs(D[e].scrollproc))),
            D[e].viewPort.enable &&
              (("%" === D[e].viewPort.vaType[D[e].level] &&
                (D[e].viewPort.visible_area[D[e].level] <= o ||
                  (0 < o && o <= 1 && D[e].sbtimeline.fixed))) ||
              ("px" === D[e].viewPort.vaType[D[e].level] &&
                ((r.top <= 0 && r.bottom >= D.lastwindowheight) ||
                  (0 <= r.top && r.bottom <= D.lastwindowheight) ||
                  (0 <= r.top &&
                    r.top <
                      D.lastwindowheight -
                        D[e].viewPort.visible_area[D[e].level]) ||
                  (r.bottom >= D[e].viewPort.visible_area[D[e].level] &&
                    r.bottom < D.lastwindowheight)))
                ? D[e].inviewport ||
                  ((D[e].inviewport = !0),
                  D.enterViewPort(e, !0),
                  D[e].c.trigger("enterviewport"))
                : D[e].inviewport &&
                  ((D[e].inviewport = !1),
                  D.leaveViewPort(e),
                  D[e].c.trigger("leftviewport"))),
            D[e].inviewport
              ? (D.callBackHandling &&
                  D.callBackHandling(e, "parallax", "start"),
                requestAnimationFrame(function () {
                  "fullscreen" === D[e].sliderLayout &&
                    D.getFullscreenOffsets(e);
                }),
                D.parallaxProcesses(e, r, a, i),
                D.callBackHandling && D.callBackHandling(e, "parallax", "end"))
              : !0 !== D.stickySupported &&
                !1 !== D[e].fixedScrollOnState &&
                (D[e].topc.removeClass("rs-fixedscrollon"),
                tpGS.gsap.set(D[e].cpar, { top: 0, y: 0 }),
                (D[e].fixedScrollOnState = !1)));
        },
        clone: function (e, t) {
          return t === C && e === C
            ? {}
            : (function e(t, i) {
                var a,
                  r = Array.isArray(t) ? [] : {};
                for (a in t)
                  t.hasOwnProperty(a) &&
                    (t[a] !== C && "object" == typeof t[a] && i
                      ? (r[a] = e(t[a], !0))
                      : t[a] !== C && (r[a] = t[a]));
                return r;
              })(e, t);
        },
        closest: function (e, t) {
          return e && (t(e) ? e : D.closest(e.parentNode, t));
        },
        closestNode: function (e, t) {
          return D.closest(e, function (e) {
            return e.nodeName === t;
          });
        },
        closestClass: function (e, t) {
          return D.closest(e, function (e) {
            return 0 <= (" " + e.className + " ").indexOf(" " + t + " ");
          });
        },
        getWinH: function (e) {
          return D[e].ignoreHeightChange ? D.mobileWinH : D.winH;
        },
        getWindowDimension: function (e, t) {
          !1 === e
            ? ((D.rAfScrollbar = "skip"),
              (D.winWAll =
                D.ISM && window.visualViewport
                  ? document.documentElement.clientWidth
                  : window.innerWidth),
              (D.winWSbar = document.documentElement.clientWidth),
              D.ISM
                ? ((D.zoom = t ? 1 : D.winWSbar / D.winWAll),
                  (D.winW =
                    1 !== D.zoom
                      ? D.winWSbar * D.zoom
                      : Math.min(D.winWAll, D.winWSbar)),
                  (D.winH =
                    1 !== D.zoom
                      ? window.innerHeight * D.zoom
                      : window.innerHeight),
                  t &&
                    window.visualViewport &&
                    ((D.winH *= window.visualViewport.scale),
                    (D.winWAll *= window.visualViewport.scale)),
                  (D.scrollBarWidth = 0))
                : (D.isModalOpen &&
                  D.openModalId !== C &&
                  D[D.openModalId] !== C &&
                  D[D.openModalId].canv.height > D.winH
                    ? (D.scrollBarWidth = D.mesuredScrollbarWidth)
                    : (D.scrollBarWidth = D.winWAll - D.winWSbar),
                  (D.winW = Math.min(D.winWAll, D.winWSbar)),
                  (D.winH = window.innerHeight)),
              D.ISM &&
                125 < D.winH &&
                (D.lastwindowheight !== C &&
                Math.abs(D.lastwindowheight - D.winH) < 125
                  ? (D.mobileWinH = D.lastwindowheight)
                  : (D.mobileWinH = D.winH)))
            : clearTimeout(D.windowDimenstionDelay),
            (D.windowDimenstionDelay = setTimeout(function () {
              (D.rAfScrollbar = C),
                (D.winWAll =
                  D.ISM && window.visualViewport
                    ? document.documentElement.clientWidth
                    : window.innerWidth),
                (D.winWSbar = document.documentElement.clientWidth),
                D.ISM
                  ? ((D.zoom = t ? 1 : D.winWSbar / D.winWAll),
                    (D.RS_px_ratio =
                      window.devicePixelRatio ||
                      window.screen.availWidth /
                        document.documentElement.clientWidth),
                    (D.winW =
                      1 !== D.zoom
                        ? D.winWSbar * D.zoom
                        : Math.min(D.winWAll, D.winWSbar)),
                    (D.winH =
                      1 !== D.zoom
                        ? window.innerHeight * D.zoom
                        : window.innerHeight),
                    t &&
                      window.visualViewport &&
                      ((D.winH *= window.visualViewport.scale),
                      (D.winWAll *= window.visualViewport.scale)),
                    (D.scrollBarWidth = 0),
                    t &&
                      tpGS.gsap.delayedCall(0.1, function () {
                        D.getWindowDimension();
                      }))
                  : (D.isModalOpen &&
                    D.openModalId !== C &&
                    D[D.openModalId] !== C &&
                    D[D.openModalId].canv.height > D.winH
                      ? (D.scrollBarWidth = D.mesuredScrollbarWidth)
                      : (D.scrollBarWidth = D.winWAll - D.winWSbar),
                    (D.winW = Math.min(D.winWAll, D.winWSbar)),
                    (D.winH = window.innerHeight)),
                D.ISM &&
                  125 < D.winH &&
                  (D.lastwindowheight !== C &&
                  Math.abs(D.lastwindowheight - D.winH) < 125
                    ? (D.mobileWinH = D.lastwindowheight)
                    : (D.mobileWinH = D.winH)),
                !1 !== e && D.document.trigger("updateContainerSizes");
            }, 100));
        },
        aC: function (e, t) {
          e &&
            (e.classList && e.classList.add
              ? e.classList.add("" + t)
              : T(e).addClass(t));
        },
        rC: function (e, t) {
          e &&
            (e.classList && e.classList.remove
              ? e.classList.remove("" + t)
              : T(e).removeClass(t));
        },
        sA: function (e, t, i) {
          e && e.setAttribute && e.setAttribute("data-" + t, i);
        },
        gA: function (e, t, i) {
          return e === C
            ? C
            : e.hasAttribute &&
              e.hasAttribute("data-" + t) &&
              e.getAttribute("data-" + t) !== C &&
              null !== e.getAttribute("data-" + t)
            ? e.getAttribute("data-" + t)
            : i !== C
            ? i
            : C;
        },
        rA: function (e, t) {
          e && e.removeAttribute && e.removeAttribute("data-" + t);
        },
        iWA: function (e, t) {
          return D[e].justifyCarousel
            ? "static" === t
              ? D[e].carousel.wrapwidth
              : D[e].carousel.slide_widths[t !== C ? t : D[e].carousel.focused]
            : D[e].gridwidth[D[e].level];
        },
        iHE: function (e, t) {
          return D[e].useFullScreenHeight
            ? D[e].canv.height
            : Math.max(D[e].currentRowsHeight, D[e].gridheight[D[e].level]);
        },
        updateFixedScrollTimes: function (e) {
          !0 === D[e].sbtimeline.set &&
            !0 === D[e].sbtimeline.fixed &&
            "auto" !== D[e].sliderLayout &&
            ((D[e].sbtimeline.rest = D[e].duration - D[e].sbtimeline.fixEnd),
            (D[e].sbtimeline.time =
              D[e].duration -
              (D[e].sbtimeline.fixStart + D[e].sbtimeline.rest)),
            (D[e].sbtimeline.extended = D[e].sbtimeline.time / 10));
        },
        addSafariFix: function (e) {
          !0 === window.isSafari11 &&
            !0 !== D[e].safari3dFix &&
            ((D[e].safari3dFix = !0), (D[e].c[0].className += " safarifix"));
        },
        openModalAPI: function (o, s, e, n, l, d) {
          (window.RS_60_MODALS !== C &&
            -1 != T.inArray(o, window.RS_60_MODALS)) ||
          (window.RS_60_MODAL_API_CALLS !== C &&
            -1 != T.inArray(o, window.RS_60_MODAL_API_CALLS))
            ? 0 <= T.inArray(o, window.RS_60_MODALS) &&
              T.fn.revolution.document.trigger("RS_OPENMODAL_" + o, s)
            : ((window.RS_60_MODAL_API_CALLS =
                window.RS_60_MODAL_API_CALLS || []),
              window.RS_60_MODAL_API_CALLS.push(o),
              (d = d === C ? {} : d).alias === C && (d.alias = o),
              n && D.showModalCover(l, d, "show"),
              T.ajax({
                type: "post",
                url: e,
                dataType: "json",
                data: {
                  action: "revslider_ajax_call_front",
                  client_action: "get_slider_html",
                  alias: o,
                  usage: "modal",
                },
                success: function (e, t, i) {
                  if (null !== e && 1 == e.success) {
                    if (((l = l == C ? e.htmlid : l), e.waiting !== C))
                      for (var a in e.waiting)
                        -1 == T.inArray(e.waiting[a], RS_MODULES.waiting) &&
                          (RS_MODULES.waiting.push(e.waiting[a]),
                          (window.RS_MODULES.minimal = !1));
                    if (e.toload !== C) {
                      var r = "";
                      for (a in (((RS_MODULES =
                        RS_MODULES || {}).requestedScripts = []),
                      e.toload))
                        !e.toload.hasOwnProperty(a) ||
                          (RS_MODULES != C &&
                            RS_MODULES[a] != C &&
                            !0 === RS_MODULES[a].loaded) ||
                          (-1 === T.inArray(a, RS_MODULES.requestedScripts) &&
                            (RS_MODULES.requestedScripts.push(a),
                            (r += e.toload[a])));
                      "" !== r && T("body").append(r);
                    }
                    (RS_MODULES !== C && RS_MODULES.modules[e.htmlid] != C) ||
                      T("body").append(e.data),
                      n && D.showModalCover(l, d, "hide"),
                      D[o] !== C && D[o].openModalApiListener
                        ? T.fn.revolution.document.trigger(
                            "RS_OPENMODAL_" + o,
                            s
                          )
                        : T(document).on(
                            "RS_MODALOPENLISTENER_" + o,
                            function (e) {
                              T.fn.revolution.document.trigger(
                                "RS_OPENMODAL_" + o,
                                s
                              );
                            }
                          );
                  } else n && D.showModalCover(l, d, "hide");
                },
                error: function (e) {
                  n && D.showModalCover(l, d, "hide"),
                    console.log("Modal Can not be Loaded"),
                    console.log(e);
                },
              }));
        },
        showModalCover: function (e, t, i) {
          switch (i) {
            case "show":
              var a;
              t.spin !== C &&
                "off" !== t.spin &&
                (a = D.buildSpinner(
                  e,
                  "spinner" + t.spin,
                  t.spinc,
                  "modalspinner"
                )),
                t.bg !== C &&
                !1 !== t.bg &&
                "false" !== t.bg &&
                "transparent" !== t.bg
                  ? ((r = T(
                      '<rs-modal-cover data-alias="' +
                        t.alias +
                        '" data-rid="' +
                        e +
                        '" id="' +
                        e +
                        '_modal_bg" style="display:none;opacity:0;background:' +
                        t.bg +
                        '"></rs-modal-cover>'
                    )),
                    T("body").append(r),
                    (t.speed = parseFloat(t.speed)),
                    (t.speed = 200 < t.speed ? t.speed / 1e3 : t.speed),
                    (t.speed = Math.max(Math.min(3, t.speed), 0.3)),
                    tpGS.gsap.to(r, t.speed, {
                      display: "block",
                      opacity: 1,
                      ease: "power3.inOut",
                    }),
                    (D.isModalOpen = !0),
                    a !== C && r.append(a))
                  : a !== C && D[e].c.append(a);
              break;
            case "hide":
              var r;
              (r = T(
                'rs-modal-cover[data-alias="' + t.alias + '"] .modalspinner'
              )) !== C && 0 < r.length
                ? r.remove()
                : e !== C && D[e].c.find(".modalspinner").remove();
          }
        },
        revModal: function (i, e) {
          if (i !== C && D[i] !== C && "clicked" !== D[i].modal.closeProtection)
            if (!0 === D[i].modal.closeProtection)
              D[i].modal.closeProtection,
                setTimeout(function () {
                  (D[i].modal.closeProtection = !1), D.revModal(i, e);
                }, 750);
            else
              switch (((D[i].modal.lastModalCall = e.mode), e.mode)) {
                case "show":
                  !0 !== D[i].modal.isLive &&
                    !0 !== D.anyModalclosing &&
                    (D.document.trigger("RS_MODALOPENED"),
                    (D[i].modal.isLive = !0),
                    (e.slide = e.slide === C ? "to0" : e.slide),
                    D[i].modal.bodyclass !== C &&
                      0 <= D[i].modal.bodyclass.length &&
                      document.body.classList.add(D[i].modal.bodyclass),
                    D[i].modal.bg.attr("data-rid", i),
                    tpGS.gsap.to(D[i].modal.bg, D[i].modal.coverSpeed, {
                      display: "block",
                      opacity: 1,
                      ease: "power3.inOut",
                    }),
                    tpGS.gsap.set(D[i].modal.c, {
                      display:
                        "auto" === D[i].sliderLayout ? "inline-block" : "block",
                      opacity: 0,
                    }),
                    D[i].cpar.removeClass("hideallscrollbars"),
                    tpGS.gsap.set(D[i].cpar, { display: "block", opacity: 1 }),
                    (t = { a: 0 }),
                    (D.isModalOpen = !0),
                    (D[i].clearModalBG = !0),
                    "carousel" === D[i].sliderType &&
                      D[i].pr_active_bg !== C &&
                      0 < D[i].pr_active_bg.length &&
                      tpGS.gsap.to(D[i].pr_active_bg, 0.5, { opacity: 1 }),
                    tpGS.gsap.fromTo(
                      t,
                      D[i].modal.coverSpeed / 5,
                      { a: 0 },
                      {
                        a: 10,
                        ease: "power3.inOut",
                        onComplete: function () {
                          (D.openModalId = i),
                            D[i].sliderisrunning
                              ? ("to0" !== e.slide &&
                                  (D[i].startedWithOtherSlide = !0),
                                D.callingNewSlide(i, e.slide))
                              : ("to0" !== e.slide &&
                                  (D[i].startWithSlideKey = e.slide),
                                g(i));
                        },
                      }
                    ),
                    setTimeout(function () {
                      tpGS.gsap.fromTo(
                        [D[i].modal.c],
                        0.01,
                        { opacity: 0 },
                        {
                          opacity: 1,
                          delay: D[i].modal.coverSpeed / 4,
                          ease: "power3.inOut",
                          onComplete: function () {},
                        }
                      ),
                        (window.overscrollhistory =
                          document.body.style.overflow),
                        D[i].modal.allowPageScroll ||
                          (document.body.style.overflow = "hidden"),
                        "fullscreen" === D[i].sliderLayout &&
                          D.getWindowDimension();
                    }, 250),
                    "fullscreen" !== D[i].sliderLayout) &&
                    D.getWindowDimension();
                  break;
                case "close":
                  !0 !== D.anyModalclosing &&
                    ((D.anyModalclosing = !0),
                    (D.openModalId = C),
                    z(i),
                    (document.body.style.overflow = window.overscrollhistory),
                    D[i].cpar.addClass("hideallscrollbars"),
                    D[i].c.trigger("stoptimer"),
                    D[i].modal.bodyclass !== C &&
                      0 <= D[i].modal.bodyclass.length &&
                      document.body.classList.remove(D[i].modal.bodyclass),
                    tpGS.gsap.to(D[i].modal.bg, D[i].modal.coverSpeed, {
                      display: "none",
                      opacity: 0,
                      ease: "power3.inOut",
                    }),
                    tpGS.gsap.to(D[i].modal.c, D[i].modal.coverSpeed / 6.5, {
                      display: "none",
                      delay: D[i].modal.coverSpeed / 4,
                      opacity: 0,
                      onComplete: function () {
                        tpGS.gsap.set(D[i].cpar, {
                          display: "none",
                          opacity: 0,
                        }),
                          D.document.trigger("revolution.all.resize"),
                          D.document.trigger("revolution.modal.close", [
                            D[i].modal,
                          ]),
                          D.getWindowDimension(),
                          (D.isModalOpen = !1);
                      },
                    }),
                    (D[i].modal.closeProtection = !0),
                    clearTimeout(D[i].modal.closeTimer),
                    (D[i].modal.closeTimer = setTimeout(function () {
                      (D.anyModalclosing = !1),
                        (D[i].modal.isLive = !1),
                        (D[i].modal.closeProtection = !1);
                    }, Math.max(750, 1020 * D[i].modal.coverSpeed))));
                  break;
                case "init":
                  if (
                    ((window.RS_60_MODALS =
                      window.RS_60_MODALS === C ? [] : window.RS_60_MODALS),
                    -1 === T.inArray(D[i].modal.alias, window.RS_60_MODALS) &&
                      window.RS_60_MODALS.push(D[i].modal.alias),
                    D[i].modal.listener === C &&
                      ((D[i].modal.c = T("#" + i + "_modal")),
                      (!1 !== D[i].modal.cover &&
                        "false" !== D[i].modal.cover) ||
                        (D[i].modal.coverColor = "transparent"),
                      (D[i].modal.bg = T(
                        'rs-modal-cover[data-alias="' + D[i].modal.alias + '"]'
                      )),
                      D[i].modal.bg === C || 0 === D[i].modal.bg.length
                        ? ((D[i].modal.bg = T(
                            '<rs-modal-cover style="display:none;opacity:0;background:' +
                              D[i].modal.coverColor +
                              '" data-rid="' +
                              i +
                              '" id="' +
                              i +
                              '_modal_bg"></rs-modal-cover>'
                          )),
                          ("auto" === D[i].sliderLayout && D[i].modal.cover
                            ? T("body")
                            : D[i].modal.c
                          ).append(D[i].modal.bg))
                        : D[i].modal.bg.attr("data-rid", i),
                      (D[i].modal.c[0].className +=
                        "rs-modal-" + D[i].sliderLayout),
                      (D[i].modal.calibration = {
                        left:
                          "auto" === D[i].sliderLayout
                            ? "center" === D[i].modal.horizontal
                              ? "50%"
                              : "left" === D[i].modal.horizontal
                              ? "0px"
                              : "auto"
                            : "0px",
                        right:
                          "auto" === D[i].sliderLayout &&
                          ("center" === D[i].modal.horizontal ||
                            "left" === D[i].modal.horizontal)
                            ? "auto"
                            : "0px",
                        top:
                          "auto" === D[i].sliderLayout ||
                          "fullwidth" === D[i].sliderLayout
                            ? "middle" === D[i].modal.vertical
                              ? "50%"
                              : "top" === D[i].modal.vertical
                              ? "0px"
                              : "auto"
                            : "0px",
                        bottom: !(
                          ("auto" !== D[i].sliderLayout &&
                            "fullwidth" !== D[i].sliderLayout) ||
                          ("middle" !== D[i].modal.vertical &&
                            "top" !== D[i].modal.vertical)
                        )
                          ? "auto"
                          : "0px",
                        y:
                          ("auto" === D[i].sliderLayout ||
                            "fullwidth" === D[i].sliderLayout) &&
                          "middle" === D[i].modal.vertical
                            ? "-50%"
                            : 0,
                        x:
                          "auto" === D[i].sliderLayout &&
                          "center" === D[i].modal.horizontal
                            ? "-50%"
                            : 0,
                      }),
                      "-50%" === D[i].modal.calibration.y &&
                        (D[i].modal.calibration.filter = "blur(0px)"),
                      tpGS.gsap.set(
                        D[i].modal.c,
                        "auto" === D[i].sliderLayout ||
                          "fullscreen" === D[i].sliderLayout
                          ? T.extend(!0, D[i].modal.calibration, {
                              opacity: 0,
                              display: "none",
                            })
                          : { opacity: 0, display: "none" }
                      ),
                      "fullwidth" === D[i].sliderLayout &&
                        tpGS.gsap.set(
                          D[i].modal.c.find("rs-module-wrap"),
                          D[i].modal.calibration
                        ),
                      D.document.on(
                        "RS_OPENMODAL_" + D[i].modal.alias,
                        function (e, t) {
                          e !== C &&
                            e.detail !== C &&
                            e.detail.slide !== C &&
                            t == C &&
                            (t = e.detail.slide),
                            (D[i].initEnded = !0),
                            D.revModal(i, { mode: "show", slide: t });
                        }
                      ),
                      (D[D[i].modal.alias] = D[D[i].modal.alias] || {}),
                      (D[D[i].modal.alias].openModalApiListener = !0),
                      D.document.trigger(
                        "RS_MODALOPENLISTENER_" + D[i].modal.alias
                      ),
                      D.document.on("click", "rs-modal-cover", function () {
                        D.revModal(D.gA(this, "rid"), { mode: "close" });
                      }),
                      (D[i].modal.listener = !0),
                      D[i].modal.trigger !== C))
                  ) {
                    var t,
                      a,
                      r = D[i].modal.trigger.split(";");
                    for (t in ((D[i].modal.trigger = {}), r))
                      if (r.hasOwnProperty(t))
                        switch ((a = r[t].split(":"))[0]) {
                          case "t":
                            D[i].modal.trigger.time = parseInt(a[1], 0);
                            break;
                          case "s":
                            D[i].modal.trigger.scroll = a[1];
                            break;
                          case "so":
                            D[i].modal.trigger.scrollo = parseInt(a[1], 0);
                            break;
                          case "e":
                            D[i].modal.trigger.event = a[1];
                            break;
                          case "ha":
                            D[i].modal.trigger.hash = a[1];
                            break;
                          case "co":
                            D[i].modal.trigger.cookie = a[1];
                        }
                    var o,
                      s = !0;
                    D[i].modal.trigger.cookie !== C
                      ? (s =
                          "true" !==
                          D.getCookie(D[i].modal.alias + "_modal_one_time"))
                      : "true" ==
                          D.getCookie(D[i].modal.alias + "_modal_one_time") &&
                        D.setCookie(
                          D[i].modal.alias + "_modal_one_time",
                          !1,
                          10
                        ),
                      s &&
                        (D[i].modal.trigger.time !== C &&
                          0 !== D[i].modal.trigger.time &&
                          (D[i].modal.trigger.cookie !== C &&
                            D.setCookie(
                              D[i].modal.alias + "_modal_one_time",
                              !0,
                              D[i].modal.trigger.cookie
                            ),
                          setTimeout(function () {
                            D.document.trigger(
                              "RS_OPENMODAL_" + D[i].modal.alias
                            );
                          }, D[i].modal.trigger.time)),
                        (D[i].modal.trigger.scrollo === C &&
                          D[i].modal.trigger.scroll === C) ||
                          (D[i].modal.trigger.scroll !== C &&
                            T(D[i].modal.trigger.scroll)[0] !== C &&
                            (D[i].modal.trigger.scroll = T(
                              D[i].modal.trigger.scroll
                            )[0]),
                          (o = function () {
                            var e;
                            D[i].modal.trigger.scroll !== C &&
                              (e =
                                (e =
                                  "string" == typeof D[i].modal.trigger.scroll
                                    ? document.getElementById(
                                        D[i].modal.trigger.scroll
                                      )
                                    : "object" ==
                                      typeof D[i].modal.trigger.scroll
                                    ? D[i].modal.trigger.scroll
                                    : C) !== C && null !== e
                                  ? D[
                                      i
                                    ].modal.trigger.scroll.getBoundingClientRect()
                                  : C),
                              ((D[i].modal.trigger.scroll !== C &&
                                e !== C &&
                                Math.abs(
                                  e.top +
                                    (e.bottom - e.top) / 2 -
                                    D.getWinH(i) / 2
                                ) < 50) ||
                                (D[i].modal.trigger.scrollo !== C &&
                                  Math.abs(
                                    D[i].modal.trigger.scrollo -
                                      (D.scrollY !== C ? D : window).scrollY
                                  ) < 100)) &&
                                (D.document.trigger(
                                  "RS_OPENMODAL_" + D[i].modal.alias
                                ),
                                D[i].modal.trigger.cookie !== C &&
                                  D.setCookie(
                                    D[i].modal.alias + "_modal_one_time",
                                    !0,
                                    D[i].modal.trigger.cookie
                                  ),
                                document.removeEventListener("scroll", o));
                          }),
                          document.addEventListener("scroll", o, {
                            id: i,
                            passive: !0,
                          }))),
                      D[i].modal.trigger.event !== C &&
                        D.document.on(D[i].modal.trigger.event, function () {
                          D.document.trigger(
                            "RS_OPENMODAL_" + D[i].modal.alias
                          );
                        }),
                      "t" == D[i].modal.trigger.hash &&
                        window.location.hash.substring(1) == D[i].modal.alias &&
                        D.document.trigger("RS_OPENMODAL_" + D[i].modal.alias);
                  }
              }
        },
        smartConvertDivs: function (e) {
          var t = "";
          if ("string" == typeof e && 0 <= e.indexOf("#")) {
            var i,
              a = e.split(","),
              r = a.length - 1;
            for (i in a)
              t =
                "string" == typeof a[i] && "#" === a[i][0]
                  ? t + (a[i][1] / a[i][3]) * 100 + "%" + (i < r ? "," : "")
                  : t + a[i] + (i < r ? "," : "");
          } else t = e;
          return t;
        },
        revToResp: function (e, t, i, a) {
          if ((e = e === C ? i : e) !== C) {
            if (
              ((a = a === C ? "," : a),
              "boolean" != typeof e &&
                ("object" != typeof e || Array.isArray(e)))
            ) {
              try {
                e = e.replace(/[[\]]/g, "").replace(/\'/g, "").split(a);
              } catch (e) {}
              for (e = Array.isArray(e) ? e : [e]; e.length < t; )
                e[e.length] = e[e.length - 1];
            }
            return e;
          }
        },
        loadImages: function (e, t, i, a) {
          if (e !== C && 0 !== e.length) {
            var r,
              o = [];
            if (Array.isArray(e))
              for (var s in e)
                e.hasOwnProperty(s) && e[s] !== C && o.push(e[s]);
            else o.push(e);
            for (r in o)
              if (o.hasOwnProperty(r)) {
                var n,
                  l,
                  d = o[r].querySelectorAll("img, rs-sbg, .rs-svg"),
                  c = D[t].lazyOnBg
                    ? o[r].querySelectorAll("rs-bg-elem, rs-column, rs-layer")
                    : [];
                for (s in d)
                  d.hasOwnProperty(s) &&
                    (d[s] !== C &&
                      d[s].dataset !== C &&
                      d[s].dataset.src !== C &&
                      0 <= d[s].dataset.src.indexOf("dummy.png") &&
                      0 <= d[s].src.indexOf("data") &&
                      delete d[s].dataset.src,
                    (l = B(d[s], C, t)),
                    (n =
                      l !== C
                        ? l
                        : D.gA(d[s], "svg_src") != C
                        ? D.gA(d[s], "svg_src")
                        : d[s].src === C
                        ? T(d[s]).data("src")
                        : d[s].src),
                    (l = D.gA(d[s], "svg_src") != C ? "svg" : "img"),
                    n !== C) &&
                    D[t].loadqueue !== C &&
                    0 ==
                      D[t].loadqueue.filter(function (e) {
                        return e.src === n;
                      }).length &&
                    D[t].loadqueue.push({
                      src: n,
                      img: d[s],
                      index: s,
                      starttoload: Date.now(),
                      type: l || "img",
                      prio: i,
                      progress:
                        d[s].complete && n === d[s].src ? "loaded" : "prepared",
                      static: a,
                      width: d[s].complete && n === d[s].src ? d[s].width : C,
                      height: d[s].complete && n === d[s].src ? d[s].height : C,
                    });
                for (s in c)
                  c.hasOwnProperty(s) &&
                    c[s] !== C &&
                    c[s].dataset !== C &&
                    c[s].dataset.bglazy !== C &&
                    0 <= c[s].style.backgroundImage.indexOf("dummy.png") &&
                    (c[s].style.backgroundImage =
                      'url("' + c[s].dataset.bglazy + '")');
                c[s] !== C &&
                  c[s].dataset !== C &&
                  c[s].dataset.bglazy !== C &&
                  0 <= c[s].style.backgroundImage.indexOf("dummy.png") &&
                  (c[s].style.backgroundImage =
                    'url("' + c[s].dataset.bglazy + '")');
              }
            !D[t].cparBgChecked &&
              D[t].cpar[0] !== C &&
              D[t].cpar[0].dataset !== C &&
              D[t].cpar[0].dataset.bglazy !== C &&
              0 <= D[t].cpar[0].style.backgroundImage.indexOf("dummy.png") &&
              ((D[t].cparBgChecked = !0),
              (D[t].cpar[0].style.backgroundImage =
                'url("' + D[t].cpar[0].dataset.bglazy + '")')),
              m(t);
          }
        },
        waitForCurrentImages: function (e, t, i) {
          if (e !== C && 0 !== e.length && D[t] !== C) {
            var a,
              r = !1,
              o = [];
            if (Array.isArray(e))
              for (var s in e)
                e.hasOwnProperty(s) && e[s] !== C && o.push(e[s]);
            else o.push(e);
            for (a in o)
              if (o.hasOwnProperty(a)) {
                var n,
                  l,
                  d,
                  c,
                  p,
                  g,
                  u = o[a].querySelectorAll("img, rs-sbg, .rs-svg");
                for (s in u)
                  !u.hasOwnProperty(s) ||
                    "length" === s ||
                    0 <= u[s].className.indexOf("rs-pzimg") ||
                    ((n = T(u[s]).data()),
                    (l =
                      (l = B(u[s], C, t)) !== C
                        ? l
                        : D.gA(u[s], "svg_src") != C
                        ? D.gA(u[s], "svg_src")
                        : (u[s].src === C ? n : u[s]).src),
                    (d = D.getLoadObj(t, l)),
                    D.sA(u[s], "src-rs-ref", l),
                    n.loaded === C &&
                      d !== C &&
                      d.progress &&
                      "loaded" == d.progress &&
                      ("img" == d.type
                        ? (u[s].src.slice(u[s].src.length - 10) !==
                            d.src.slice(d.src.length - 10) &&
                            (u[s].src = d.src),
                          n.slidebgimage &&
                            ((-1 == d.src.indexOf("images/transparent.png") &&
                              -1 == d.src.indexOf("assets/transparent.png")) ||
                              n.bgcolor === C ||
                              (n.bgcolor !== C &&
                                "transparent" !== n.bgcolor &&
                                ((d.bgColor = !0), (d.useBGColor = !0))),
                            D.sA(o[a], "owidth", d.width),
                            D.sA(o[a], "oheight", d.height),
                            (p = D.getByTag(o[a], "RS-SBG-WRAP")),
                            (c = D.gA(o[a], "key")),
                            (D[t].sbgs[c].loadobj = d),
                            0 < p.length &&
                              (D.sA(p[0], "owidth", d.width),
                              D.sA(p[0], "oheight", d.height)),
                            "carousel" === D[t].sliderType) &&
                            ((p = T(p)),
                            (g = D.getSlideIndex(t, c)),
                            ((D[t].carousel.justify &&
                              D[t].carousel.slide_widths === C) ||
                              D[t].carousel.slide_width === C) &&
                              D.setCarouselDefaults(t, !0),
                            p.data("panzoom") === C ||
                              (D[t].panzoomTLs !== C &&
                                D[t].panzoomTLs[g] !== C) ||
                              D.startPanZoom(p, t, 0, g, "prepare", c),
                            D[t].sbgs[c].isHTML5 &&
                              !D[t].sbgs[c].videoisplaying &&
                              (D[t].sbgs[c].video = D[t].sbgs[c].loadobj.img),
                            o[a].getAttribute("data-iratio") !== C &&
                              !o[a].getAttribute("data-iratio") &&
                              d.img &&
                              d.img.naturalWidth &&
                              (o[a].setAttribute(
                                "data-iratio",
                                d.img.naturalWidth / d.img.naturalHeight
                              ),
                              D.setCarouselDefaults(t, "redraw", !0),
                              !0 === D[t].carousel.ocfirsttun) &&
                              D.organiseCarousel(t, "right", !0, !1, !1),
                            D.updateSlideBGs(t, c, D[t].sbgs[c])))
                        : "svg" == d.type &&
                          "loaded" == d.progress &&
                          (u[s].innerHTML = d.innerHTML),
                      (n.loaded = !0)),
                    d &&
                      d.progress &&
                      d.progress.match(/inprogress|inload|prepared/g) &&
                      (!d.error && Date.now() - d.starttoload < 15e3
                        ? (r = !0)
                        : ((d.progress = "failed"),
                          d.reported_img ||
                            ((d.reported_img = !0),
                            console.log(l + "  Could not be loaded !")))),
                    1 != D[t].youtubeapineeded ||
                      (window.YT && YT.Player != C) ||
                      (r = f("youtube", t)),
                    1 != D[t].vimeoapineeded) ||
                    window.Vimeo ||
                    (r = f("vimeo", t));
              }
            T.each(D[t].loadqueue, function (e, t) {
              !0 === t.static &&
                (("loaded" != t.progress && "done" !== t.progress) ||
                  "failed" === t.progress) &&
                ("failed" != t.progress || t.reported
                  ? !t.error && Date.now() - t.starttoload < 5e3
                    ? (r = !0)
                    : t.reported || (t.reported = v(t.src, t.error))
                  : (t.reported = v(t.src, t.error)));
            }),
              r
                ? tpGS.gsap.delayedCall(0.02, D.waitForCurrentImages, [e, t, i])
                : i !== C && tpGS.gsap.delayedCall(1e-4, i);
          }
        },
        updateVisibleArea: function (e) {
          for (var t in ((D[e].viewPort.visible_area = D.revToResp(
            D[e].viewPort.visible_area,
            D[e].rle,
            "0px"
          )),
          (D[e].viewPort.vaType = new Array(4)),
          D[e].viewPort.visible_area))
            D[e].viewPort.visible_area.hasOwnProperty(t) &&
              (!1 === D[e].viewPort.local && !0 === D[e].viewPort.global
                ? ((D[e].viewPort.vaType[t] =
                    0 <= D[e].viewPort.globalDist.indexOf("%") ? "%" : "px"),
                  (D[e].viewPort.visible_area[t] = parseInt(
                    D[e].viewPort.globalDist
                  )))
                : (D.isNumeric(D[e].viewPort.visible_area[t]) &&
                    (D[e].viewPort.visible_area[t] += "%"),
                  D[e].viewPort.visible_area[t] !== C &&
                    (D[e].viewPort.vaType[t] =
                      0 <= D[e].viewPort.visible_area[t].indexOf("%")
                        ? "%"
                        : "px"),
                  (D[e].viewPort.visible_area[t] = parseInt(
                    D[e].viewPort.visible_area[t],
                    0
                  ))),
              (D[e].viewPort.visible_area[t] =
                "%" == D[e].viewPort.vaType[t]
                  ? D[e].viewPort.visible_area[t] / 100
                  : D[e].viewPort.visible_area[t]));
        },
        observeFonts: function (e, t, i) {
          (i = i === C ? 0 : i),
            D.fonts === C &&
              ((D.fonts = {}),
              (D.monoWidth = d("monospace")),
              (D.sansWidth = d("sans-serif")),
              (D.serifWidth = d("serif"))),
            i++;
          var a = D.fonts[e];
          !0 !== D.fonts[e] &&
            (D.fonts[e] =
              D.monoWidth !== d(e + ",monospace") ||
              D.sansWidth !== d(e + ",sans-serif") ||
              D.serifWidth !== d(e + ",serif")),
            100 === i || ((!1 === a || a === C) && !0 === D.fonts[e])
              ? (d(e + ",monospace", !0),
                d(e + ",sans-serif", !0),
                d(e + ",serif", !0),
                t())
              : setTimeout(function () {
                  D.observeFonts(e, t, i);
                }, 19);
        },
        getversion: function () {
          return o;
        },
        currentSlideIndex: function (e) {
          return D[e].pr_active_key;
        },
        iOSVersion: function () {
          return (
            !!(
              navigator.userAgent.match(/iPhone/i) ||
              navigator.userAgent.match(/iPod/i) ||
              navigator.userAgent.match(/iPad/i)
            ) && navigator.userAgent.match(/OS 4_\d like Mac OS X/i)
          );
        },
        setIsIOS: function () {
          (D.isiPhone =
            /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream),
            (D.isIOS =
              (/iPad|iPhone|iPod/.test(navigator.userAgent) &&
                !window.MSStream) ||
              ("MacIntel" === navigator.platform &&
                void 0 !== navigator.standalone));
        },
        setIsChrome8889: function () {
          D.isChrome8889 =
            D.isChrome8889 === C
              ? 0 <= navigator.userAgent.indexOf("Chrome/88") ||
                0 <= navigator.userAgent.indexOf("Chrome/89")
              : D.isChrome8889;
        },
        isIE: function () {
          var e;
          return (
            D.isIERes === C &&
              ((e = T('<div style="display:none;"/>').appendTo(T("body"))).html(
                "\x3c!--[if IE 8]><a>&nbsp;</a><![endif]--\x3e"
              ),
              (D.isIERes = e.find("a").length),
              e.remove()),
            D.isIERes
          );
        },
        is_mobile: function () {
          var e = [
              "android",
              "webos",
              "iphone",
              "ipad",
              "blackberry",
              "Android",
              "webos",
              "iPod",
              "iPhone",
              "iPad",
              "Blackberry",
              "BlackBerry",
            ],
            t = !1;
          if (window.orientation !== C) t = !0;
          else
            for (var i in e)
              e.hasOwnProperty(i) &&
                (t = !!(t || 1 < navigator.userAgent.split(e[i]).length) || t);
          return (
            t &&
              document.body &&
              -1 === document.body.className.indexOf("rs-ISM") &&
              (document.body.className += " rs-ISM"),
            t
          );
        },
        is_android: function () {
          var e,
            t = ["android", "Android"],
            i = !1;
          for (e in t)
            t.hasOwnProperty(e) &&
              (i = !!(i || 1 < navigator.userAgent.split(t[e]).length) || i);
          return i;
        },
        callBackHandling: function (e, i, a) {
          D[e].callBackArray &&
            T.each(D[e].callBackArray, function (e, t) {
              t &&
                t.inmodule &&
                t.inmodule === i &&
                t.atposition &&
                t.atposition === a &&
                t.callback &&
                t.callback.call();
            });
        },
        get_browser: function () {
          var e,
            t = navigator.userAgent,
            i =
              t.match(
                /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
              ) || [];
          return /trident/i.test(i[1])
            ? ((e = /\brv[ :]+(\d+)/g.exec(t) || []), "IE")
            : "Chrome" === i[1] && null != (e = t.match(/\b(OPR|Edge)\/(\d+)/))
            ? e[1].replace("OPR", "Opera")
            : ((i = i[2]
                ? [i[1], i[2]]
                : [navigator.appName, navigator.appVersion, "-?"]),
              null != (e = t.match(/version\/(\d+)/i)) && i.splice(1, 1, e[1]),
              i[0]);
        },
        get_browser_version: function () {
          var e = navigator.appName,
            t = navigator.userAgent,
            i = t.match(
              /(edge|opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i
            );
          return (
            i && null != (t = t.match(/version\/([\.\d]+)/i)) && (i[2] = t[1]),
            (i = i ? [i[1], i[2]] : [e, navigator.appVersion, "-?"])[1]
          );
        },
        isFaceBook: function () {
          return (
            D.isFaceBookApp == C &&
              ((D.isFaceBookApp =
                navigator.userAgent || navigator.vendor || window.opera),
              (D.isFaceBookApp =
                -1 < D.isFaceBookApp.indexOf("FBAN") ||
                -1 < D.isFaceBookApp.indexOf("FBAV"))),
            D.isFaceBookApp
          );
        },
        isFirefox: function (e) {
          return (
            (D[e].isFirefox =
              D[e].isFirefox === C
                ? "Firefox" === D.get_browser()
                : D[e].isFirefox),
            (D.isFF = D[e].isFirefox),
            D[e].isFirefox
          );
        },
        isSafari11: function () {
          return (
            "safari" === D.trim(D.get_browser().toLowerCase()) &&
            11 <= parseFloat(D.get_browser_version())
          );
        },
        isWebkit: function () {
          var e = /(webkit)[ \/]([\w.]+)/.exec(
            navigator.userAgent.toLowerCase()
          );
          return e && e[1] && "webkit" === e[1];
        },
        isIE11: function () {
          return (
            (D.IE11 =
              D.IE11 === C
                ? !!navigator.userAgent.match(/Trident.*rv\:11\./)
                : D.IE11),
            D.IE11
          );
        },
        checkBackdrop: function () {
          var e = document.createElement("div"),
            t =
              ((e.style.cssText = "-webkit-backdrop-filter: blur(2px)"),
              0 != e.style.length),
            i = document.documentMode === C || 9 < document.documentMode;
          (t && i) ||
            ((e.style.cssText = "backdrop-filter: blur(2px)"),
            (t = 0 != e.style.length)),
            (e = null),
            (D.useBackdrop = t && i);
        },
        deepLink: function (e, t) {
          if (t !== C) {
            var i = parseInt(
              t
                .toString()
                .replace(/^slide/, "")
                .replace("-", ""),
              10
            );
            if (isNaN(i))
              for (var a in D[e].slides)
                if (
                  D[e].slides.hasOwnProperty(a) &&
                  D.gA(D[e].slides[a], "deeplink") === t
                ) {
                  i = parseInt(D.gA(D[e].slides[a], "originalindex"), 10);
                  break;
                }
            return isNaN(i) || i < 1 || i > D[e].realslideamount ? void 0 : i;
          }
        },
        getHorizontalOffset: function (e, t) {
          var i = c(e, ".outer-left"),
            e = c(e, ".outer-right");
          return "left" == t
            ? i
            : "right" == t
            ? e
            : "all" == t
            ? { left: i, right: e, both: i + e, inuse: i + e != 0 }
            : i + e;
        },
        getComingSlide: function (e, t) {
          var i =
              D[e].pr_next_key !== C
                ? D[e].pr_next_key
                : D[e].pr_processing_key !== C
                ? D[e].pr_processing_key
                : D[e].pr_active_key,
            a = 0,
            a = 0;
          if (
            (D[e].pr_active_slide !== C &&
              "true" == D.gA(D[e].pr_active_slide[0], "not_in_nav") &&
              (i = D[e].pr_lastshown_key),
            (t !== C && D.isNumeric(t)) || (t !== C && t.match(/to/g)))
          )
            a =
              1 === t || -1 === t
                ? parseInt(i, 0) + t < 0
                  ? D[e].slideamount - 1
                  : parseInt(i, 0) + t >= D[e].slideamount
                  ? 0
                  : parseInt(i, 0) + t
                : (t = D.isNumeric(t) ? t : parseInt(t.split("to")[1], 0)) < 0
                ? 0
                : t > D[e].slideamount - 1
                ? D[e].slideamount - 1
                : t;
          else if (t)
            for (var r in D[e].slides)
              D[e].slides.hasOwnProperty(r) &&
                (a =
                  D[e].slides &&
                  D[e].slides[r] &&
                  (D.gA(D[e].slides[r], "key") === t || D[e].slides[r].id === t)
                    ? r
                    : a);
          return { nindex: a, aindex: i };
        },
        callingNewSlide: function (e, t, i, a) {
          t = D.getComingSlide(e, t);
          (D[e].pr_next_key = t.nindex),
            (D[e].sdir =
              ("bullet" === D[e].sc_indicator ||
                D[e].pr_active_key != D[e].slideamount - 1 ||
                0 != D[e].pr_next_key) &&
              D[e].pr_next_key < D[e].pr_active_key
                ? 1
                : 0),
            i &&
              D[e].carousel !== C &&
              (D[e].carousel.focused = D[e].pr_next_key),
            "carousel" === D[e].sliderType &&
              D[e].startedWithOtherSlide &&
              ((D[e].carousel.focused = D[e].pr_next_key),
              delete D[e].startedWithOtherSlide),
            D[e].ctNavElement
              ? (D[e].ctNavElement = !1)
              : D[e].c.trigger("revolution.nextslide.waiting"),
            ((D[e].started &&
              t.aindex === D[e].pr_next_key &&
              t.aindex === D[e].pr_lastshown_key) ||
              (D[e].pr_next_key !== t.aindex &&
                -1 != D[e].pr_next_key &&
                D[e].pr_lastshown_key !== C)) &&
              y(e, i, a);
        },
        getLoadObj: function (e, t) {
          e =
            D[e].loadqueue !== C &&
            D[e].loadqueue.filter(function (e) {
              return e.src === t;
            })[0];
          return e === C ? { src: t } : e;
        },
        getResponsiveLevel: function (e) {
          var t = 9999,
            i = 0,
            a = 0,
            r = 0;
          if (D[e].responsiveLevels && D[e].responsiveLevels.length)
            for (var o in D[e].responsiveLevels)
              D[e].responsiveLevels.hasOwnProperty(o) &&
                (D.winWAll < D[e].responsiveLevels[o] &&
                  (0 == i || i > parseInt(D[e].responsiveLevels[o])) &&
                  ((t = parseInt(D[e].responsiveLevels[o])),
                  (r = parseInt(o)),
                  (i = parseInt(D[e].responsiveLevels[o]))),
                D.winWAll > D[e].responsiveLevels[o]) &&
                i < D[e].responsiveLevels[o] &&
                ((i = parseInt(D[e].responsiveLevels[o])), (a = parseInt(o)));
          return i < t ? a : r;
        },
        getSizeMultpilicator: function (e, t, i) {
          var a = { h: 0, w: 0 };
          return (
            D[e].justifyCarousel
              ? (a.h = a.w = 1)
              : ((a.w = i.width / D[e].gridwidth[D[e].level]),
                (a.h = i.height / D[e].gridheight[D[e].level]),
                (a.w = isNaN(a.w) ? 1 : a.w),
                (a.h = isNaN(a.h) ? 1 : a.h),
                1 == D[e].enableUpscaling
                  ? (a.h = a.w)
                  : (a.w < a.h ? (a.h = a.w) : (a.w = a.h),
                    (1 < a.h || 1 < a.w) && ((a.w = 1), (a.h = 1)))),
            a
          );
        },
        updateDims: function (t, e) {
          var i,
            a = D[t].pr_processing_key || D[t].pr_active_key || 0,
            r = D[t].pr_active_key || 0,
            o = D[t].modal !== C && D[t].modal.useAsModal,
            s = o ? D.winWAll : D.winW,
            n = !1,
            l =
              ((D[t].lastScrollBarWidth = D.scrollBarWidth),
              (D[t].redraw = D[t].redraw === C ? {} : D[t].redraw),
              (D[t].module = D[t].module === C ? {} : D[t].module),
              (D[t].canv = D[t].canv === C ? {} : D[t].canv),
              (D[t].content = D[t].content === C ? {} : D[t].content),
              (D[t].drawUpdates = { c: {}, cpar: {}, canv: {} }),
              "carousel" == D[t].sliderType
                ? (D[t].module.margins = {
                    top: parseInt(D[t].carousel.padding_top || 0, 0),
                    bottom: parseInt(D[t].carousel.padding_bottom || 0, 0),
                  })
                : (D[t].module.margins = { top: 0, bottom: 0 }),
              D[t].module.paddings === C &&
                (D[t].module.paddings = {
                  top: parseInt(D[t].cpar.css("paddingTop"), 0) || 0,
                  bottom: parseInt(D[t].cpar.css("paddingBottom"), 0) || 0,
                }),
              D[t].blockSpacing !== C
                ? ((D[t].block = {
                    bottom:
                      D[t].blockSpacing.bottom !== C
                        ? parseInt(D[t].blockSpacing.bottom[D[t].level], 0)
                        : 0,
                    top:
                      D[t].blockSpacing.top !== C
                        ? parseInt(D[t].blockSpacing.top[D[t].level], 0)
                        : 0,
                    left:
                      D[t].blockSpacing.left !== C
                        ? parseInt(D[t].blockSpacing.left[D[t].level], 0)
                        : 0,
                    right:
                      D[t].blockSpacing.right !== C
                        ? parseInt(D[t].blockSpacing.right[D[t].level], 0)
                        : 0,
                  }),
                  (D[t].block.hor = D[t].block.left + D[t].block.right),
                  (D[t].block.ver = D[t].block.top + D[t].block.bottom))
                : D[t].block === C &&
                  (D[t].block = {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    hor: 0,
                    ver: 0,
                  }),
              D[t].blockSpacing !== C &&
                ((i = {
                  paddingLeft: D[t].block.left,
                  paddingRight: D[t].block.right,
                  marginTop: D[t].block.top,
                  marginBottom: D[t].block.bottom,
                }),
                (l = JSON.stringify(i)),
                i !== D[t].emptyObject) &&
                l !== D[t].caches.setsizeBLOCKOBJ &&
                (tpGS.gsap.set(D[t].blockSpacing.block, i),
                (D[t].caches.setsizeBLOCKOBJ = l),
                (n = !0)),
              (D[t].levelForced = D[t].level = D.getResponsiveLevel(t)),
              (D[t].rowHeights = D.getRowHeights(t)),
              (D[t].aratio =
                D[t].gridheight[D[t].level] / D[t].gridwidth[D[t].level]),
              (D[t].module.width =
                "auto" === D[t].sliderLayout || 1 == D[t].disableForceFullWidth
                  ? D[t].cpar.width()
                  : s - D[t].block.hor),
              (D[t].outNavDims = D.getOuterNavDimension(t)),
              (D[t].canv.width =
                D[t].module.width -
                D[t].outNavDims.horizontal -
                (o ? D.scrollBarWidth : 0)),
              o &&
                "auto" === D[t].sliderLayout &&
                (D[t].canv.width = Math.min(D[t].gridwidth[D[t].level], s)),
              "fullscreen" === D[t].sliderLayout || D[t].infullscreenmode
                ? ((i =
                    D.getWinH(t) -
                    (!0 === D[t].modal.useAsModal
                      ? 0
                      : D.getFullscreenOffsets(t))),
                  (D[t].canv.height = Math.max(
                    D[t].rowHeights.cur,
                    Math.max(i - D[t].outNavDims.vertical, D[t].minHeight)
                  )),
                  "carousel" === D[t].sliderType &&
                    "v" !== D[t].carousel.orientation &&
                    (D[t].canv.height =
                      D[t].canv.height -
                      parseInt(D[t].carousel.padding_top) -
                      parseInt(D[t].carousel.padding_bottom)),
                  r !== a &&
                    ((D[t].currentSlideHeight = Math.max(
                      D[t].rowHeights.last,
                      Math.max(i - D[t].outNavDims.vertical, D[t].minHeight)
                    )),
                    (D[t].redraw.maxHeightOld = !0)),
                  (D[t].drawUpdates.c.height = "100%"))
                : ((D[t].canv.height = D[t].keepBPHeight
                    ? D[t].gridheight[D[t].level]
                    : Math.round(D[t].canv.width * D[t].aratio)),
                  (D[t].canv.height = D[t].autoHeight
                    ? D[t].canv.height
                    : Math.min(D[t].canv.height, D[t].gridheight[D[t].level])),
                  (D[t].carousel.prevNextVisCalculated =
                    "carousel" == D[t].sliderType &&
                    "v" == D[t].carousel.orientation
                      ? "%" == D[t].carousel.prevNextVisType
                        ? D[t].canv.height * D[t].carousel.prevNextVis
                        : D[t].carousel.prevNextVis
                      : 0),
                  (D[t].canv.height =
                    Math.max(
                      Math.max(D[t].rowHeights.cur, D[t].canv.height),
                      D[t].minHeight
                    ) + D[t].carousel.prevNextVisCalculated),
                  "carousel" == D[t].sliderType &&
                    "v" == D[t].carousel.orientation &&
                    (D[t].canv.height = Math.min(D[t].canv.height, D.winH)),
                  (D[t].drawUpdates.c.height = D[t].canv.height)),
              ("fullscreen" !== D[t].sliderLayout &&
                "fullwidth" !== D[t].sliderLayout) ||
                ((D[t].canv.width -=
                  D[t].cpar.outerWidth() - D[t].cpar.width()),
                "fullscreen" === D[t].sliderLayout &&
                  (D[t].canv.height -=
                    D[t].cpar.outerHeight() - D[t].cpar.height())),
              (D[t].module.height = D[t].canv.height),
              "fullwidth" != D[t].sliderLayout ||
                D[t].fixedOnTop ||
                (D[t].drawUpdates.c.maxHeight =
                  0 != D[t].maxHeight
                    ? Math.min(D[t].canv.height, D[t].maxHeight)
                    : D[t].canv.height),
              (D[t].CM = D.getSizeMultpilicator(t, D[t].enableUpscaling, {
                width: D[t].canv.width,
                height: D[t].canv.height,
              })),
              (D[t].content.width = D[t].gridwidth[D[t].level] * D[t].CM.w),
              (D[t].content.height = Math.round(
                Math.max(
                  D[t].rowHeights.cur,
                  D[t].gridheight[D[t].level] * D[t].CM.h
                )
              )),
              D[t].module.margins.top +
                D[t].module.margins.bottom +
                ("fullscreen" === D[t].sliderLayout
                  ? 0
                  : D[t].outNavDims.vertical) +
                D[t].canv.height +
                D[t].module.paddings.top +
                D[t].module.paddings.bottom),
            s =
              ((D[t].drawUpdates.cpar.height = l),
              (D[t].drawUpdates.cpar.width =
                "auto" === D[t].sliderLayout ? "auto" : D[t].module.width),
              "auto" === D[t].sliderLayout ||
              ("fullscreen" === D[t].sliderLayout &&
                !0 === D[t].disableForceFullWidth) ||
              D[t].rsFullWidthWrap === C
                ? "fullscreen" == D[t].sliderLayout &&
                  1 == D[t].disableForceFullWidth &&
                  (D[t].drawUpdates.cpar.left = 0)
                : (D[t].drawUpdates.cpar.left =
                    0 -
                    Math.ceil(
                      D[t].rsFullWidthWrap.offset().left -
                        (D[t].outNavDims.left + D[t].block.left)
                    )),
              D[t].sbtimeline.set && D[t].sbtimeline.fixed
                ? (D[t].sbtimeline.extended === C &&
                    D.updateFixedScrollTimes(t),
                  (D[t].forcerHeight = 2 * l + D[t].sbtimeline.extended),
                  D[t].sbtimeline.pullc &&
                    D[t].rsFullWidthWrap !== C &&
                    null !== D[t].rsFullWidthWrap[0] &&
                    requestAnimationFrame(function () {
                      var e =
                        D[t].rsFullWidthWrapMarginBottom +
                        -1 * D[t].forcerHeight;
                      D[t].rsFullWidthWrap[0].style.marginBottom =
                        (isNaN(e)
                          ? D[t].rsFullWidthBottomMarginPush
                          : D[t].rsFullWidthBottomMarginPush + e) + "px";
                    }),
                  D[t].rsFullWidthWrap !== C &&
                    null !== D[t].rsFullWidthWrap[0] &&
                    "fullscreen" == D[t].sliderLayout &&
                    ((D[t].rsFullWidthBottomMarginPush =
                      D.getFullscreenOffsets(t)),
                    (D[t].rsFullWidthWrap[0].style.marginBottom =
                      D[t].rsFullWidthBottomMarginPush + "px")))
                : (D[t].forcerHeight = l),
              D[t].forcerHeight !== D[t].caches.setsizeForcerHeight &&
                D[t].forcer !== C &&
                ((D[t].caches.setsizeForcerHeight = D[t].forcerHeight),
                (D[t].redraw.forcer = n = !0)),
              (D[t].drawUpdates.c.width = D[t].canv.width),
              "auto" === D[t].sliderLayout &&
                (D[t].drawUpdates.c.left = D[t].outNavDims.left),
              D[t].drawUpdates.c !== D[t].emptyObject &&
                JSON.stringify(D[t].drawUpdates.c) !==
                  D[t].caches.setsizeCOBJ &&
                ((D[t].caches.setsizeCOBJ = JSON.stringify(D[t].drawUpdates.c)),
                (D[t].redraw.c = n = !0)),
              D[t].drawUpdates.cpar !== D[t].emptyObject &&
                JSON.stringify(D[t].drawUpdates.cpar) !==
                  D[t].caches.setsizeCPAROBJ &&
                ((D[t].caches.setsizeCPAROBJ = JSON.stringify(
                  D[t].drawUpdates.cpar
                )),
                (D[t].redraw.cpar = n = !0)),
              o &&
                "auto" === D[t].sliderLayout &&
                D[t].caches.canWidth !== D[t].canv.width &&
                ((D[t].caches.canWidth = D[t].canv.width),
                (D[t].redraw.modalcanvas = n = !0)),
              D[t].slayers &&
                0 < D[t].slayers.length &&
                D[t].outNavDims.left !== D[t].caches.outNavDimsLeft &&
                "fullwidth" != D[t].sliderLayout &&
                "fullscreen" != D[t].sliderLayout &&
                ((D[t].caches.outNavDimsLeft = D[t].outNavDims.left),
                (D[t].redraw.slayers = !0)),
              o &&
                D[t].modal.calibration !== C &&
                "middle" === D[t].modal.vertical &&
                ((D[t].modal.calibration.top = D.getWinH(t) < l ? "0%" : "50%"),
                (D[t].modal.calibration.y = D.getWinH(t) < l ? "0px" : "-50%"),
                "fullwidth" === D[t].sliderLayout) &&
                (D[t].redraw.modulewrap = n = !0),
              (D[t].gridOffsetWidth =
                (D[t].module.width - D[t].gridwidth[D[t].level]) / 2),
              (D[t].gridOffsetHeight =
                (D[t].module.height - D[t].content.height) / 2),
              (D[t].caches.curRowsHeight = D[t].currentRowsHeight =
                D[t].rowHeights.cur),
              (D[t].caches.moduleWidth = D[t].width = D[t].module.width),
              (D[t].caches.moduleHeight = D[t].height = D[t].module.height),
              (D[t].caches.canWidth = D[t].conw = D[t].canv.width),
              (D[t].caches.canHeight = D[t].conh = D[t].canv.height),
              (D[t].bw = D[t].CM.w),
              (D[t].bh = D[t].CM.h),
              (D[t].caches.outNavDimsLeft = D[t].outNavDims.left),
              window.requestAnimationFrame(function () {
                D[t].redraw.forcer &&
                  tpGS.gsap.set(D[t].forcer, { height: D[t].forcerHeight }),
                  D[t].redraw.c && tpGS.gsap.set(D[t].c, D[t].drawUpdates.c),
                  D[t].redraw.cpar &&
                    tpGS.gsap.set(D[t].cpar, D[t].drawUpdates.cpar),
                  D[t].redraw.modalcanvas &&
                    D[t] !== C &&
                    (D[t].modal !== C &&
                      D[t].modal.c !== C &&
                      tpGS.gsap.set(D[t].modal.c, { width: D[t].canv.width }),
                    D[t].canvas !== C) &&
                    tpGS.gsap.set(D[t].canvas, { width: D[t].canv.width }),
                  D[t].redraw.maxHeightOld &&
                    (D[t].slides[r].style.maxHeight =
                      D[t].currentSlideHeight !== D[t].canv.height
                        ? D[t].currentSlideHeight + "px"
                        : "none"),
                  D[t].redraw.slayers &&
                    tpGS.gsap.set(D[t].slayers, { left: D[t].outNavDims.left }),
                  D[t].redraw.modulewrap &&
                    tpGS.gsap.set(
                      D[t].modal.c.find("rs-module-wrap"),
                      D[t].modal.calibration
                    ),
                  !0 !== D[t].navigation.initialised &&
                    "prepared" === e &&
                    ("hero" !== D[t].sliderType &&
                      D.createNavigation &&
                      D[t].navigation.use &&
                      !0 !== D[t].navigation.createNavigationDone &&
                      D.createNavigation(t),
                    D.resizeThumbsTabs) &&
                    D.resizeThumbsTabs &&
                    D[t].navigation.use &&
                    D.resizeThumbsTabs(t),
                  D[t].rebuildProgressBar && _(t),
                  D.putRowsInPosition(t),
                  (D[t].redraw = {});
              }),
              D[t].inviewport &&
                ((D[t].heightInLayers !== C &&
                  D[t].module.height !== D[t].heightInLayers) ||
                  (D[t].widthInLayers !== C &&
                    D[t].module.width !== D[t].widthInLayers)));
          return (
            "ignore" !== e &&
              s &&
              ((D[t].heightInLayers = C),
              (D[t].widthInLayers = C),
              "carousel" !== D[t].sliderType &&
                (D[t].pr_next_key !== C
                  ? D.animateTheLayers({
                      slide: D[t].pr_next_key,
                      id: t,
                      mode: "rebuild",
                      caller: "swapSlideProgress_1",
                    })
                  : D[t].pr_processing_key !== C
                  ? D.animateTheLayers({
                      slide: D[t].pr_processing_key,
                      id: t,
                      mode: "rebuild",
                      caller: "swapSlideProgress_2",
                    })
                  : D[t].pr_active_key !== C &&
                    D.animateTheLayers({
                      slide: D[t].pr_active_key,
                      id: t,
                      mode: "rebuild",
                      caller: "swapSlideProgress_3",
                    })),
              (n = !0)),
            n && "ignore" !== e && D.requestLayerUpdates(t, "enterstage"),
            D[t].module.height !== D[t].module.lastHeight &&
              ((D[t].module.lastHeight = D[t].module.height),
              window.requestAnimationFrame(function () {
                window.innerHeight !== screen.height &&
                  Math.round(window.innerHeight * window.devicePixelRatio) !==
                    screen.height &&
                  G(t, C, !1);
              })),
            tpGS.gsap.delayedCall(0.1, function () {
              D[t].lastScrollBarWidth !== D.scrollBarWidth
                ? (D.updateDims(t, "ignore"), G(t))
                : D.isModalOpen ||
                  D.scrollBarWidth ===
                    window.innerWidth - document.documentElement.clientWidth ||
                  (D.rAfScrollbar === C &&
                    (D.rAfScrollbar = requestAnimationFrame(function () {
                      (D.rAfScrollbar = C), D.getWindowDimension(t, !1);
                    })));
            }),
            n
          );
        },
        putMiddleZoneInPosition: function (e, t) {
          D[e].middleZones == C ||
            D[e].middleZones[t] == C ||
            D[e].rowMiddleHeights == C ||
            D[e].rowMiddleHeights[t] == C ||
            (D[e].caches.middleHeights[t] === D[e].rowMiddleHeights[t] &&
              D[e].caches.lastModuleHeight === D[e].module.height) ||
            (tpGS.gsap.set(D[e].middleZones[t], {
              top: Math.round(
                D[e].module.height / 2 - D[e].rowMiddleHeights[t] / 2
              ),
            }),
            (D[e].caches.middleHeights[t] = D[e].rowMiddleHeights[t]));
        },
        putRowsInPosition: function (e) {
          var t = D[e].activeRSSlide || 0,
            i = D[e].pr_processing_key;
          D.putMiddleZoneInPosition(e, t),
            t !== i && i !== C && D.putMiddleZoneInPosition(e, i),
            D[e].smiddleZones == C ||
              D[e].rowMiddleHeights == C ||
              D[e].rowMiddleHeights.static == C ||
              (D[e].caches.middleHeights.static ===
                D[e].rowMiddleHeights.static &&
                D[e].caches.lastModuleHeight === D[e].module.height) ||
              (tpGS.gsap.set(D[e].smiddleZones[0], {
                top: Math.round(
                  D[e].module.height / 2 - D[e].rowMiddleHeights.static / 2
                ),
              }),
              (D[e].caches.middleHeights.static =
                D[e].rowMiddleHeights.static)),
            (D[e].caches.lastModuleHeight = D[e].module.height);
        },
        getSlideIndex: function (e, t) {
          var i,
            a = !1;
          for (i in D[e].slides) {
            if (!D[e].slides.hasOwnProperty(i) || !1 !== a) continue;
            a = D.gA(D[e].slides[i], "key") === t ? i : a;
          }
          return !1 === a ? 0 : a;
        },
        loadUpcomingContent: function (e) {
          var t, i, a, r;
          "smart" == D[e].lazyType &&
            ((t = []),
            (a =
              (i = parseInt(
                D.getSlideIndex(e, D.gA(D[e].pr_next_slide[0], "key")),
                0
              )) -
                1 <
              0
                ? D[e].realslideamount - 1
                : i - 1),
            (r = i + 1 == D[e].realslideamount ? 0 : i + 1),
            a !== i && t.push(D[e].slides[a]),
            r !== i && t.push(D[e].slides[r]),
            0 < t.length) &&
            (D.loadImages(t, e, 2),
            D.waitForCurrentImages(t, e, function () {}));
        },
        lazyLoadAllSlides: function (e) {
          if (
            "all" == D[e].lazyType &&
            !0 !== D[e].lazyLoad_AllDone &&
            ((D[e].viewPort.enable && D[e].inviewport) || !D[e].viewPort.enable)
          ) {
            for (var t in D[e].slides)
              D[e].slides.hasOwnProperty(t) &&
                (D.loadImages(D[e].slides[t], e, t),
                D.waitForCurrentImages(D[e].slides[t], e, function () {}));
            D[e].lazyLoad_AllDone = !0;
          }
        },
        getFullscreenOffsets: function (e) {
          var t = 0;
          if (D[e].fullScreenOffsetContainer != C) {
            var i,
              a = ("" + D[e].fullScreenOffsetContainer).split(",");
            for (i in a)
              a.hasOwnProperty(i) && (t += T(a[i]).outerHeight(!0) || 0);
          }
          return (
            D[e].fullScreenOffset != C &&
              (!D.isNumeric(D[e].fullScreenOffset) &&
              1 < D[e].fullScreenOffset.split("%").length
                ? (t +=
                    (D.getWinH(e) * parseInt(D[e].fullScreenOffset, 0)) / 100)
                : D.isNumeric(parseInt(D[e].fullScreenOffset, 0)) &&
                  (t += parseInt(D[e].fullScreenOffset, 0) || 0)),
            (D[e].fullScreenOffsetResult = t)
          );
        },
        unToggleState: function (e) {
          if (e !== C)
            for (var t = 0; t < e.length; t++)
              try {
                document.getElementById(e[t]).classList.remove("rs-tc-active");
              } catch (e) {}
        },
        toggleState: function (e) {
          if (e !== C)
            for (var t = 0; t < e.length; t++)
              try {
                document.getElementById(e[t]).classList.add("rs-tc-active");
              } catch (e) {}
        },
        swaptoggleState: function (e) {
          if (e != C && 0 < e.length)
            for (var t = 0; t < e.length; t++) {
              var i = document.getElementById(e[t]);
              if (
                D.gA(i, "toggletimestamp") !== C &&
                new Date().getTime() - D.gA(i, "toggletimestamp") < 250
              )
                return;
              D.sA(i, "toggletimestamp", new Date().getTime()),
                null !== i &&
                  (0 <= i.className.indexOf("rs-tc-active")
                    ? i.classList.remove("rs-tc-active")
                    : i.classList.add("rs-tc-active"));
            }
        },
        lastToggleState: function (e) {
          if (e !== C)
            for (var t = 0; t < e.length; t++)
              var i = document.getElementById(e[t]),
                a =
                  !0 === a ||
                  (null !== i && 0 <= i.className.indexOf("rs-tc-active")) ||
                  a;
          return a;
        },
        revCheckIDS: function (e, t) {
          var i, a, r;
          return (
            D.gA(t, "idcheck") === C &&
              ((i = t.id),
              (r = -1) !== (a = T.inArray(t.id, window.RSANYID)) &&
                ((r = T.inArray(t.id, D[e].anyid)),
                (window.RSANYID_sliderID[a] === e && -1 === r) ||
                  ((t.id = t.id + "_" + Math.round(9999 * Math.random())),
                  console.log(
                    "Warning - ID:" +
                      i +
                      " exists already. New Runtime ID:" +
                      t.id
                  ),
                  (a = r = -1))),
              -1 === r && D[e].anyid.push(t.id),
              -1 === a) &&
              (window.RSANYID.push(t.id), window.RSANYID_sliderID.push(e)),
            D.sA(t, "idcheck", !0),
            t.id
          );
        },
        buildSpinner: function (e, t, i, a) {
          if ("off" !== t) {
            (a = a === C ? "" : a), (i = i === C ? "#ffffff" : i);
            var r = parseInt(t.replace("spinner", ""), 10);
            if (isNaN(r) || r < 6)
              var o = 'style="background-color:' + i + '"',
                s = a === C || (3 !== r && 4 != r) ? "" : o,
                o = T(
                  "<rs-loader " +
                    (a === C || (1 !== r && 2 != r) ? "" : o) +
                    ' class="' +
                    t +
                    " " +
                    a +
                    '"><div ' +
                    s +
                    ' class="dot1"></div><div ' +
                    s +
                    ' class="dot2"></div><div ' +
                    s +
                    ' class="bounce1"></div><div ' +
                    s +
                    ' class="bounce2"></div><div ' +
                    s +
                    ' class="bounce3"></div></rs-loader>'
                );
            else {
              for (
                var n,
                  l = '<div class="rs-spinner-inner"',
                  d =
                    (7 === r
                      ? (-1 !== i.search("#")
                          ? ((n = i.replace("#", "")),
                            (n =
                              "rgba(" +
                              parseInt(n.substring(0, 2), 16) +
                              ", " +
                              parseInt(n.substring(2, 4), 16) +
                              ", " +
                              parseInt(n.substring(4, 6), 16) +
                              ", "))
                          : -1 !== i.search("rgb") &&
                            2 <
                              (n = i
                                .substring(
                                  i.indexOf("(") + 1,
                                  i.lastIndexOf(")")
                                )
                                .split(",")).length &&
                            (n =
                              "rgba(" +
                              n[0].trim() +
                              ", " +
                              n[1].trim() +
                              ", " +
                              n[2].trim() +
                              ", "),
                        n &&
                          "string" == typeof n &&
                          (l +=
                            ' style="border-top-color: ' +
                            n +
                            "0.65); border-bottom-color: " +
                            n +
                            "0.15); border-left-color: " +
                            n +
                            "0.65); border-right-color: " +
                            n +
                            '0.15)"'))
                      : 12 === r && (l += ' style="background:' + i + '"'),
                    (l += ">"),
                    [10, 0, 4, 2, 5, 9, 0, 4, 4, 2][r - 6]),
                  c = 0;
                c < d;
                c++
              )
                0 < c && (l += " "),
                  (l += '<span style="background:' + i + '"></span>');
              o = T(
                '<rs-loader class="' +
                  t +
                  " " +
                  a +
                  '">' +
                  (l += "</div>") +
                  "</div></rs-loader>"
              );
            }
            return o;
          }
        },
        addStaticLayerTo: function (e, t, i) {
          var a;
          D[e].slayers.length < 2
            ? (((a = document.createElement("rs-static-layers")).className =
                "rs-stl-" + t),
              a.appendChild(i[0]),
              D[e].c[0].appendChild(a),
              D[e].slayers.push(a))
            : D[e].slayers[1].appendChild(i[0]);
        },
      }),
      function () {
        return D.isIE11()
          ? function (e, t) {
              return e.querySelectorAll(t);
            }
          : function (e, t) {
              return e.getElementsByTagName(t);
            };
      }),
    n = function (e) {
      (D[e].responsiveLevels = D.revToResp(D[e].responsiveLevels, D[e].rle)),
        (D[e].visibilityLevels = D.revToResp(D[e].visibilityLevels, D[e].rle)),
        (D[e].responsiveLevels[0] = 9999),
        (D[e].rle = D[e].responsiveLevels.length || 1),
        (D[e].gridwidth = D.revToResp(D[e].gridwidth, D[e].rle)),
        (D[e].gridheight = D.revToResp(D[e].gridheight, D[e].rle)),
        D[e].editorheight !== C &&
          (D[e].editorheight = D.revToResp(D[e].editorheight, D[e].rle)),
        D.updateDims(e);
    },
    I = function (e, i) {
      var a = [];
      return (
        T.each(e, function (e, t) {
          e != i && a.push(t);
        }),
        a
      );
    },
    l = function (e, t, i) {
      D[i].c.find(e).each(function () {
        var e = T(this);
        e.data("key") === t && e.remove();
      });
    },
    d = function (e, t) {
      if (
        (D["rsfont_" + e] == C &&
          ((D["rsfont_" + e] = document.createElement("span")),
          (D["rsfont_" + e].innerHTML = Array(100).join("wi")),
          (D["rsfont_" + e].style.cssText = [
            "position:absolute",
            "width:auto",
            "font-size:128px",
            "left:-99999px",
          ].join(" !important;")),
          (D["rsfont_" + e].style.fontFamily = e),
          document.body.appendChild(D["rsfont_" + e])),
        t === C)
      )
        return D["rsfont_" + e].clientWidth;
      document.body.removeChild(D["rsfont_" + e]);
    },
    c = function (e, t) {
      var i = 0;
      return (
        e.find(t).each(function () {
          var e = T(this);
          !e.hasClass("tp-forcenotvisible") &&
            i < e.outerWidth() &&
            (i = e.outerWidth());
        }),
        i
      );
    },
    p = function (e) {
      if (e === C || D[e] === C || D[e].c === C) return !1;
      if (
        D[e].cpar !== C &&
        D[e].cpar.data("aimg") != C &&
        (("enabled" == D[e].cpar.data("aie8") && D.isIE(8)) ||
          ("enabled" == D[e].cpar.data("amobile") && D.ISM))
      )
        D[e].c.html(
          '<img class="tp-slider-alternative-image" src="' +
            D[e].cpar.data("aimg") +
            '">'
        );
      else {
        (window._rs_firefox13 = !1),
          (window._rs_firefox = D.isFirefox()),
          (window._rs_ie =
            window._rs_ie === C ? !T.support.opacity : window._rs_ie),
          (window._rs_ie9 =
            window._rs_ie9 === C ? 9 == document.documentMode : window._rs_ie9);
        var t,
          i = T.fn.jquery.split("."),
          a = parseFloat(i[0]),
          r = parseFloat(i[1]),
          o =
            (1 == a &&
              r < 7 &&
              D[e].c.html(
                '<div style="text-align:center; padding:40px 0px; font-size:20px; color:#992222;"> The Current Version of jQuery:' +
                  i +
                  " <br>Please update your jQuery Version to min. 1.7 in Case you wish to use the Revolution Slider Plugin</div>"
              ),
            1 < a && (window._rs_ie = !1),
            (D[e].realslideamount = D[e].slideamount = 0),
            D.getByTag(D[e].canvas[0], "RS-SLIDE")),
          s = [];
        for (t in ((D[e].notInNav = []), (D[e].slides = []), o))
          o.hasOwnProperty(t) &&
            ("on" == D.gA(o[t], "hsom") && D.ISM
              ? s.push(o[t])
              : (D.gA(o[t], "invisible") || 1 == D.gA(o[t], "invisible")
                  ? D[e].notInNav.push(o[t])
                  : (D[e].slides.push(o[t]), D[e].slideamount++),
                D[e].realslideamount++,
                D.sA(o[t], "originalindex", D[e].realslideamount),
                D.sA(o[t], "origindex", D[e].realslideamount - 1)));
        for (t in s) s.hasOwnProperty(t) && s[t].remove();
        for (t in D[e].notInNav)
          D[e].notInNav.hasOwnProperty(t) &&
            (D.sA(D[e].notInNav[t], "not_in_nav", !0),
            D[e].canvas[0].appendChild(D[e].notInNav[t]));
        D[e].canvas.css({ visibility: "visible" }),
          (D[e].slayers = D[e].c.find("rs-static-layers")),
          D[e].slayers[0] &&
            D[e].slayers.className &&
            -1 !== D[e].slayers[0].className.indexOf("rs-stl-visible") &&
            D[e].c.addClass("rs-stl-visible"),
          0 < D[e].slayers.length &&
            D.sA(D[e].slayers[0], "key", "staticlayers"),
          !0 === D[e].modal.useAsModal &&
            (D[e].cpar.wrap(
              '<rs-modal id="' + D[e].c[0].id + '_modal"></rs-modal>'
            ),
            (D[e].modal.c = T(D.closestNode(D[e].cpar[0], "RS-MODAL"))),
            D[e].modal.c.appendTo(T("body")),
            D[e].modal !== C) &&
            D[e].modal.alias !== C &&
            D.revModal(e, { mode: "init" }),
          1 == D[e].waitForInit || 1 == D[e].modal.useAsModal
            ? (D.RS_toInit !== C && (D.RS_toInit[e] = !0),
              D[e].c.trigger("revolution.slide.waitingforinit"),
              (D[e].waitingForInit = !0))
            : (window.requestAnimationFrame(function () {
                g(e);
              }),
              (D[e].initEnded = !0));
      }
    },
    B = function (e, t, i) {
      return D.gA(e, "lazyload") !== C
        ? D.gA(e, "lazyload")
        : D[i].lazyloaddata !== C &&
          0 < D[i].lazyloaddata.length &&
          D.gA(e, D[i].lazyloaddata) !== C
        ? D.gA(e, D[i].lazyloaddata)
        : D.gA(e, "lazy-src") !== C
        ? D.gA(e, "lazy-src")
        : D.gA(e, "lazy-wpfc-original-src") !== C
        ? D.gA(e, "lazy-wpfc-original-src")
        : D.gA(e, "lazy") !== C
        ? D.gA(e, "lazy")
        : t;
    },
    g = function (t) {
      if (D[t] !== C) {
        (D[t].sliderisrunning = !0) !== D[t].noDetach && D[t].c.detach();
        var e = D[t].canvas.find("rs-slide:first-child");
        if (D[t].shuffle) {
          for (
            var i = D.gA(e[0], "firstanim"), a = 0;
            a < D[t].slideamount;
            a++
          )
            D[t].canvas
              .find(
                "rs-slide:eq(" +
                  Math.round(Math.random() * D[t].slideamount) +
                  ")"
              )
              .prependTo(D[t].canvas);
          D.sA(D[t].canvas.find("rs-slide:first-child")[0], "firstanim", i);
        }
        (D[t].slides = D.getByTag(D[t].canvas[0], "RS-SLIDE")),
          (D[t].thumbs = new Array(D[t].slides.length)),
          (D[t].slots = 1),
          (D[t].firststart = 1),
          (D[t].loadqueue = []);
        var r,
          o = (D[t].syncload = 0),
          s =
            "carousel" === D[t].sliderType && D[t].carousel.border_radius !== C
              ? parseInt(D[t].carousel.border_radius, 0)
              : 0;
        for (r in ("carousel" !== D[t].sliderType &&
          tpGS.gsap.set(D[t].slides, { display: "none" }),
        "carousel" !== D[t].sliderType &&
          tpGS.gsap.set(e, { display: "block" }),
        D[t].slides))
          if (D[t].slides.hasOwnProperty(r) && "length" !== r) {
            var n = D[t].slides[r],
              l = D.getByTag(n, "IMG")[0],
              d =
                (D.gA(n, "key") === C &&
                  D.sA(n, "key", "rs-" + Math.round(999999 * Math.random())),
                {
                  params: Array(12),
                  id: D.gA(n, "key"),
                  src:
                    D.gA(n, "thumb") !== C
                      ? D.gA(n, "thumb")
                      : B(l, l !== C ? l.src : C, t),
                });
            D.gA(n, "title") === C && D.sA(n, "title", ""),
              D.gA(n, "description") === C && D.sA(n, "description", ""),
              (d.params[0] = {
                from: RegExp("\\{\\{title\\}\\}", "g"),
                to: D.gA(n, "title"),
              }),
              (d.params[1] = {
                from: RegExp("\\{\\{description\\}\\}", "g"),
                to: D.gA(n, "description"),
              });
            for (var c = 1; c <= 10; c++)
              D.gA(n, "p" + c) !== C
                ? (d.params[c + 1] = {
                    from: RegExp("\\{\\{param" + c + "\\}\\}", "g"),
                    to: D.gA(n, "p" + c),
                  })
                : (d.params[c + 1] = {
                    from: RegExp("\\{\\{param" + c + "\\}\\}", "g"),
                    to: "",
                  });
            if (
              ((D[t].thumbs[o] = T.extend({}, !0, d)),
              0 < s && tpGS.gsap.set(n, { borderRadius: s + "px" }),
              D.gA(n, "link") != C || D.gA(n, "linktoslide") !== C)
            ) {
              var l = D.gA(n, "link"),
                l = l !== C ? l : "slide",
                p = "slide" != l ? "no" : D.gA(n, "linktoslide"),
                g = D.gA(n, "seoz"),
                u = D.gA(n, "tag");
              if (p != C && "no" != p && "next" != p && "prev" != p)
                for (var h in D[t].slides)
                  D[t].slides.hasOwnProperty(h) &&
                    parseInt(D.gA(D[t].slides[h], "origindex"), 0) + 1 ==
                      D.gA(n, "linktoslide") &&
                    (p = D.gA(D[t].slides[h], "key"));
              "slide" == l || "a" != u
                ? T(n).prepend(
                    '<rs-layer class="rs-layer slidelink" id="rs_slidelink_' +
                      Math.round(1e5 * Math.random()) +
                      '" data-zindex="' +
                      ("back" === g
                        ? 0
                        : "front" === g
                        ? 95
                        : g !== C
                        ? parseInt(g, 0)
                        : 100) +
                      '" dataxy="x:c;y:c" data-dim="w:100%;h:100%" data-basealign="slide"' +
                      ("no" == p
                        ? "slide" == l || D.ISM
                          ? ""
                          : "  data-actions='o:click;a:simplelink;target:" +
                            (D.gA(n, "target") || "_self") +
                            ";url:" +
                            l +
                            ";'"
                        : "  data-actions='" +
                          ("scroll_under" === p
                            ? "o:click;a:scrollbelow;offset:100px;"
                            : "prev" === p
                            ? "o:click;a:jumptoslide;slide:prev;d:0.2;"
                            : "next" === p
                            ? "o:click;a:jumptoslide;slide:next;d:0.2;"
                            : "o:click;a:jumptoslide;slide:" + p + ";d:0.2;") +
                          "'") +
                      " data-frame_1='e:power3.inOut;st:100;sp:100' data-frame_999='e:power3.inOut;o:0;st:w;sp:100'>" +
                      (D.ISM
                        ? "<a " +
                          ("slide" != l
                            ? ("_blank" === D.gA(n, "target")
                                ? 'rel="noopener" '
                                : "") +
                              'target="' +
                              (D.gA(n, "target") || "_self") +
                              '" href="' +
                              l +
                              '"'
                            : "") +
                          "><span></span></a>"
                        : "") +
                      "</rs-layer>"
                  )
                : T(n).prepend(
                    '<a class="rs-layer slidelink" id="rs_slidelink_' +
                      Math.round(1e5 * Math.random()) +
                      '" data-zindex="' +
                      ("back" === g
                        ? 0
                        : "front" === g
                        ? 95
                        : g !== C
                        ? parseInt(g, 0)
                        : 100) +
                      '" dataxy="x:c;y:c" data-dim="w:100%;h:100%" data-basealign="slide" href="' +
                      l +
                      '" target="' +
                      (D.gA(n, "target") || "_self") +
                      '" rel="noopener" data-frame_1="e:power3.inOut;st:100;sp:100" data-frame_999="e:power3.inOut;o:0;st:w;sp:100"><span></span></a>'
                  );
            }
            o++;
          }
        if (
          (D[t].simplifyAll &&
            (D.isIE(8) || D.iOSVersion()) &&
            (D[t].c.find(".rs-layer").each(function () {
              var e = T(this);
              e.removeClass("customin customout").addClass("fadein fadeout"),
                e.data("splitin", ""),
                e.data("speed", 400);
            }),
            D[t].c.find("rs-slide").each(function () {
              var e = T(this);
              e.data("transition", "fade"),
                e.data("masterspeed", 500),
                e.data("slotamount", 1),
                (e.find(".rev-slidebg") || e.find(">img").first()).data(
                  "panzoom",
                  null
                );
            })),
          (window._rs_desktop =
            window._rs_desktop === C
              ? !navigator.userAgent.match(
                  /(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i
                )
              : window._rs_desktop),
          (D[t].autoHeight =
            "fullscreen" == D[t].sliderLayout || D[t].autoHeight),
          "fullwidth" != D[t].sliderLayout ||
            D[t].autoHeight ||
            ("carousel" === D[t].sliderType &&
              "v" === D[t].carousel.orientation) ||
            D[t].c.css({ maxHeight: D[t].gridheight[D[t].level] + "px" }),
          "auto" == D[t].sliderLayout ||
          null !== D.closestNode(D[t].c[0], "RS-FULLWIDTH-WRAP") ||
          ("fullscreen" === D[t].sliderLayout &&
            1 == D[t].disableForceFullWidth)
            ? (D[t].topc = D[t].cpar)
            : ((i = D[t].cpar[0].style.marginTop),
              (e = D[t].cpar[0].style.marginBottom),
              (D[t].rsFullWidthWrapMarginBottom = parseInt(e, 0)),
              (D[t].rsFullWidthWrap = D[t].topc =
                T(
                  '<rs-fullwidth-wrap id="' +
                    D[t].c[0].id +
                    '_forcefullwidth" style="' +
                    (i = i === C || "" === i ? "" : "margin-top:" + i + ";") +
                    (e =
                      e === C || "" === e ? "" : "margin-bottom:" + e + ";") +
                    '"></rs-fullwidth-wrap>'
                )),
              (D[t].forcer = T(
                '<rs-fw-forcer style="height:' +
                  (D[t].forcerHeight === C
                    ? D[t].cpar.height()
                    : D[t].forcerHeight) +
                  'px"></rs-fw-forcer>'
              )),
              D[t].topc.append(D[t].forcer),
              D[t].topc.insertBefore(D[t].cpar),
              D[t].cpar.detach(),
              D[t].cpar.css({
                marginTop: "0px",
                marginBottom: "0px",
                position: "absolute",
              }),
              D[t].cpar.prependTo(D[t].topc)),
          D[t].forceOverflow
            ? D[t].topc[0].classList.add("rs-forceoverflow")
            : "3D" === D[t].parallax.type &&
              D[t].topc[0].classList.add("rs-parallax-hidden-of"),
          "carousel" === D[t].sliderType &&
            !0 !== D[t].overflowHidden &&
            D[t].c.css({ overflow: "visible" }),
          0 !== D[t].maxHeight &&
            tpGS.gsap.set([D[t].cpar, D[t].c, D[t].topc], {
              maxHeight: D[t].maxHeight + "px",
            }),
          D[t].fixedOnTop &&
            tpGS.gsap.set(
              D[t].blockSpacing !== C && D[t].blockSpacing.block !== C
                ? D[t].blockSpacing.block
                : D[t].topc,
              {
                position: "fixed",
                top: "0px",
                left: "0px",
                pointerEvents: "none",
                zIndex: 5e3,
              }
            ),
          D[t].shadow !== C &&
            0 < D[t].shadow &&
            D[t].cpar
              .addClass("tp-shadow" + D[t].shadow)
              .append(
                '<div class="tp-shadowcover" style="background-color:' +
                  D[t].cpar.css("backgroundColor") +
                  ";background-image:" +
                  D[t].cpar.css("backgroundImage") +
                  '"></div>'
              ),
          D.updateDims(t, "prepared"),
          D.observeWraps === C &&
            (D.observeWraps = new D.wrapObserver.init(function (e, t) {
              G(t, C, !0);
            })),
          !D[t].c.hasClass("revslider-initialised"))
        ) {
          D[t].c[0].classList.add("revslider-initialised"),
            (D[t].c[0].id =
              D[t].c[0].id === C
                ? "revslider-" + Math.round(1e3 * Math.random() + 5)
                : D[t].c[0].id),
            D.revCheckIDS(t, D[t].c[0]),
            (D[t].origcd = parseInt(D[t].duration, 0)),
            (D[t].scrolleffect._L = []),
            (D[t].sbas = D[t].sbas === C ? {} : D[t].sbas),
            (D[t].layers = D[t].layers || {}),
            (D[t].sortedLayers = D[t].sortedLayers || {});
          var m,
            v = D[t].c[0].querySelectorAll(
              "rs-layer, rs-row, rs-column, rs-group,  rs-bgvideo, .rs-layer"
            );
          for (m in v)
            if (v.hasOwnProperty(m)) {
              !D.ISM &&
                v[m].classList.contains("iospermaccwait") &&
                v[m].remove();
              var f,
                y,
                w = T(v[m]),
                b = w.data();
              if (
                ((b.startclasses = v[m].className),
                (b.startclasses =
                  b.startclasses === C || null === b.startclasses
                    ? ""
                    : b.startclasses),
                (b.animationonscroll =
                  !!D[t].sbtimeline.set && D[t].sbtimeline.layers),
                (b.animationonscroll =
                  !0 === b.animationonscroll || "true" == b.animationonscroll),
                (b.filteronscroll =
                  !!D[t].scrolleffect.set && D[t].scrolleffect.layers),
                (b.pxundermask =
                  0 <= b.startclasses.indexOf("rs-pxmask") &&
                  "off" !== D[t].parallax.type &&
                  0 <= b.startclasses.indexOf("rs-pxl-")),
                (b.noPevents = 0 <= b.startclasses.indexOf("rs-noevents")),
                b.sba)
              )
                for (var c in (f = b.sba.split(";")))
                  f.hasOwnProperty(c) &&
                    ("t" == (y = f[c].split(":"))[0] &&
                      ((b.animationonscroll = y[1]), "false" == y[1]) &&
                      (b.animOnScrollForceDisable = !0),
                    "e" == y[0] && (b.filteronscroll = y[1]),
                    "so" == y[0]) &&
                    (b.scrollBasedOffset = parseInt(y[1]) / 1e3);
              if (
                (("true" != b.animationonscroll && 1 != b.animationonscroll) ||
                  ((b.startclasses += " rs-sba"),
                  (w[0].className += " rs-sba")),
                0 <= b.startclasses.indexOf("rs-layer-static") &&
                  D.handleStaticLayers &&
                  D.handleStaticLayers(w, t),
                "RS-BGVIDEO" !== w[0].tagName)
              ) {
                if (
                  (w[0].classList.add("rs-layer"),
                  "column" === b.type &&
                    ((b.columnwidth = "33.33%"),
                    (b.verticalalign = "top"),
                    b.column !== C))
                )
                  for (var _ in (f = b.column.split(";")))
                    f.hasOwnProperty(_) &&
                      ("w" === (y = f[_].split(":"))[0] &&
                        (b.columnwidth = y[1]),
                      "a" === y[0]) &&
                      (b.verticalalign = y[1]);
                if (
                  "group" === b.type &&
                  ((b.verticalalign = "top"), b.column !== C)
                )
                  for (var _ in (f = b.column.split(";")))
                    f.hasOwnProperty(_) &&
                      "a" === (y = f[_].split(":"))[0] &&
                      (b.verticalalign = y[1]);
                var S =
                    0 <= b.startclasses.indexOf("slidelink")
                      ? "z-index:" +
                        b.zindex +
                        ";width:100% !important;height:100% !important;"
                      : "",
                  x =
                    "column" !== b.type && "group" !== b.type
                      ? ""
                      : b.verticalalign === C
                      ? " vertical-align:top;"
                      : " vertical-align:" + b.verticalalign + ";",
                  k =
                    "row" === b.type || "column" === b.type || "r" === b.pos
                      ? "position:relative;"
                      : "position:absolute;",
                  O = "",
                  R =
                    "row" === b.type
                      ? "rs-row-wrap"
                      : "column" === b.type
                      ? "rs-column-wrap"
                      : "group" === b.type
                      ? "rs-group-wrap"
                      : "rs-layer-wrap",
                  L = "",
                  I = "";
                b.noPevents;
                "row" === b.type || "column" === b.type || "group" === b.type
                  ? (w[0].classList.remove("tp-resizeme"),
                    "column" === b.type &&
                      ((b.width = "auto"),
                      (w[0].group = "row"),
                      tpGS.gsap.set(w, { width: "auto" }),
                      (b.filteronscroll = !1)))
                  : ((L =
                      "display:" +
                      ("inline-block" === w[0].style.display
                        ? "inline-block"
                        : "block") +
                      ";"),
                    null !== D.closestNode(w[0], "RS-COLUMN")
                      ? ((w[0].group = "column"), (b.filteronscroll = !1))
                      : null !== D.closestNode(w[0], "RS-GROUP-WRAP") &&
                        ((w[0].group = "group"), (b.filteronscroll = !1))),
                  b.wrpcls !== C && (O = O + " " + b.wrpcls),
                  b.wrpid !== C && (I = 'id="' + b.wrpid + '"'),
                  (b.thFixed =
                    (b.wrpcls !== C && b.wrpcls.includes("th-fixed")) ||
                    (b.startclasses !== C &&
                      b.startclasses.includes("ddd_mousebox"))),
                  (b.reqWrp = {
                    loop: !(
                      1 != D[t].rtl &&
                      !b.thFixed &&
                      b.loop_0 === C &&
                      b.loop_999 === C
                    ),
                    level: { m: 0, lp: 0, p: 0 },
                  }),
                  (b.perspFix =
                    window.isSafari11 &&
                    ((b.btrans !== C && b.btrans.includes("iosfx:p")) ||
                      ("carousel" === D[t].sliderType &&
                        !v[m].classList.contains("rs-mtrap")))),
                  (b.reqWrp.mask = !!(
                    b.perspFix ||
                    b.reqWrp.loop ||
                    1 == D[t].rtl ||
                    b.pxundermask ||
                    b.thFixed ||
                    b.btrans !== C ||
                    (b.frame_hover !== C && b.frame_hover.includes("m:t")) ||
                    b.clip !== C ||
                    b.sba !== C ||
                    b.frame_0_sfx !== C ||
                    b.frame_1_sfx !== C ||
                    b.frame_999_sfx !== C ||
                    b.frame_0_mask !== C ||
                    b.frame_1_mask !== C ||
                    b.frame_2_mask !== C ||
                    b.frame_3_mask !== C ||
                    b.frame_4_mask !== C ||
                    b.frame_999_mask !== C
                  )),
                  (b.reqWrp.level.m = b.pxundermask
                    ? 2
                    : b.reqWrp.mask
                    ? 1
                    : 0),
                  (b.reqWrp.level.lp =
                    b.reqWrp.level.m + (b.reqWrp.loop ? 1 : 0)),
                  (b.reqWrp.level.p = b.reqWrp.level.lp + 1),
                  b.perspFix && (S += "transform:perspective(600px);"),
                  w.wrap(
                    "<" +
                      R +
                      " " +
                      I +
                      ' class="rs-parallax-wrap ' +
                      O +
                      '" style="' +
                      x +
                      " " +
                      S +
                      k +
                      L +
                      ';pointer-events:none">' +
                      (b.reqWrp.loop
                        ? '<rs-loop-wrap style="' + S + k + L + '">'
                        : "") +
                      (b.reqWrp.mask
                        ? '<rs-mask-wrap style="' + S + k + L + '">'
                        : "") +
                      (b.pxundermask ? "<rs-px-mask></rs-px-mask>" : "") +
                      (b.reqWrp.mask ? "</rs-mask-wrap>" : "") +
                      (b.reqWrp.loop ? "</rs-loop-wrap>" : "") +
                      "</" +
                      R +
                      ">"
                  ),
                  (!0 !== b.filteronscroll && "true" != b.filteronscroll) ||
                    D[t].scrolleffect._L.push(w.parent()),
                  (w[0].id =
                    w[0].id === C
                      ? "layer-" + Math.round(999999999 * Math.random())
                      : w[0].id),
                  D.revCheckIDS(t, w[0]),
                  (D[t]._Lshortcuts[w[0].id] = {
                    p: P(w[0], b.reqWrp.level.p),
                    lp: P(w[0], b.reqWrp.level.lp),
                    m: P(w[0], b.reqWrp.level.m),
                  }),
                  "column" !== b.type ||
                  ("" == w[0].style.background &&
                    "" === w[0].style.backgroundColor &&
                    "" === w[0].style.backgroundImage &&
                    b.border === C)
                    ? (b.cbgexists = !1)
                    : (D[t]._Lshortcuts[w[0].id].p.append(
                        '<rs-cbg-mask-wrap><rs-column-bg id="' +
                          w[0].id +
                          '_rs_cbg"></rs-column-bg></rs-cbg-mask-wrap>'
                      ),
                      (b.cbgexists = !0)),
                  "text" === b.type &&
                    0 < D.getByTag(w[0], "IFRAME").length &&
                    ((D[t].slideHasIframe = !0), w[0].classList.add("rs-ii-o")),
                  D[t].BUG_safari_clipPath &&
                    "true" != b.animationonscroll &&
                    1 != b.animationonscroll &&
                    w[0].classList.add("rs-pelock"),
                  w[0].dataset.staticz !== C &&
                    "row" !== b.type &&
                    "row" !== w[0].group &&
                    "column" !== w[0].group &&
                    D.addStaticLayerTo(
                      t,
                      w[0].dataset.staticz,
                      D[t]._Lshortcuts[w[0].id].p
                    );
              }
              D.gA(w[0], "actions") &&
                D.checkActions &&
                D.checkActions(w, t, D[t]),
                !D.checkVideoApis ||
                  (window.rs_addedvim && window.rs_addedyt) ||
                  (D[t].youtubeapineeded && D[t].vimeoapineeded) ||
                  D.checkVideoApis(w, t);
            }
          D.checkActions && D.checkActions(C, t),
            D[t].c[0].addEventListener("mousedown", function () {
              var e;
              !0 !== D[t].onceClicked &&
                (D[t].onceClicked = !0) !== D[t].onceVideoPlayed &&
                D[t].activeRSSlide !== C &&
                D[t].slides !== C &&
                D[t].slides[D[t].activeRSSlide] !== C &&
                (e = T(D[t].slides[D[t].activeRSSlide]).find("rs-bgvideo")) !==
                  C &&
                null !== e &&
                0 < e.length &&
                D.playVideo(e, t);
            }),
            D[t].c[0].addEventListener(
              "mouseenter",
              function () {
                D[t].c.trigger("tp-mouseenter"), (D[t].overcontainer = !0);
              },
              { passive: !0 }
            ),
            D[t].c[0].addEventListener(
              "mouseover",
              function () {
                D[t].c.trigger("tp-mouseover"), (D[t].overcontainer = !0);
              },
              { passive: !0 }
            ),
            D[t].c[0].addEventListener(
              "mouseleave",
              function () {
                D[t].c.trigger("tp-mouseleft"), (D[t].overcontainer = !1);
              },
              { passive: !0 }
            ),
            D[t].c.find(".rs-layer video").each(function (e) {
              var t = T(this);
              t.removeClass("video-js vjs-default-skin"),
                t.attr("preload", ""),
                t.css({ display: "none" });
            }),
            (D[t].rs_static_layer = D.getByTag(D[t].c[0], "RS-STATIC-LAYERS")),
            D.preLoadAudio &&
              0 < D[t].rs_static_layer.length &&
              D.preLoadAudio(T(D[t].rs_static_layer), t, 1),
            0 < D[t].rs_static_layer.length &&
              (D.loadImages(D[t].rs_static_layer[0], t, 0, !0),
              D.waitForCurrentImages(D[t].rs_static_layer[0], t, function () {
                D[t] !== C &&
                  D[t].c.find("rs-static-layers img").each(function () {
                    this.src = D.getLoadObj(
                      t,
                      D.gA(this, "src") != C ? D.gA(this, "src") : this.src
                    ).src;
                  });
              })),
            (D[t].rowzones = []),
            (D[t].rowzonesHeights = []),
            (D[t].topZones = []),
            (D[t].middleZones = []),
            (D[t].bottomZones = []),
            (D[t].rowMiddleHeights = {});
          var M,
            i = D.deepLink(t, F("#")[0]),
            e =
              (i !== C &&
                ((D[t].startWithSlide = i),
                (D[t].deepLinkListener = !0),
                window.addEventListener("hashchange", function () {
                  var e;
                  !0 !== D[t].ignoreDeeplinkChange &&
                    (e = D.deepLink(t, F("#")[0])) !== C &&
                    D.callingNewSlide(t, e, !0),
                    (D[t].ignoreDeeplinkChange = !1);
                })),
              (D[t].loader = D.buildSpinner(t, D[t].spinner, D[t].spinnerclr)),
              (D[t].loaderVisible = !0),
              D[t].c.append(D[t].loader),
              H(t),
              ("off" !== D[t].parallax.type ||
                D[t].scrolleffect.set ||
                D[t].sbtimeline.set) &&
                D.checkForParallax &&
                D.checkForParallax(t),
              D[t].fallbacks.disableFocusListener ||
                "true" == D[t].fallbacks.disableFocusListener ||
                !0 === D[t].fallbacks.disableFocusListener ||
                (D[t].c.addClass("rev_redraw_on_blurfocus"), j()),
              D[t].viewPort);
          for (c in ("on" === D[t].navigation.mouseScrollNavigation &&
            (e.enable = !0),
          D[t].slides))
            D[t].slides.hasOwnProperty(c) &&
              ((M = T(D[t].slides[c])),
              (D[t].rowzones[c] = []),
              (D[t].rowzonesHeights[c] = []),
              (D[t].topZones[c] = []),
              (D[t].middleZones[c] = []),
              (D[t].bottomZones[c] = []),
              M.find("rs-zone").each(function () {
                D[t].rowzones[c].push(T(this)),
                  0 <= this.className.indexOf("rev_row_zone_top") &&
                    D[t].topZones[c].push(this),
                  0 <= this.className.indexOf("rev_row_zone_middle") &&
                    (D[t].middleZones[c].push(this),
                    (this.dataset.middle = "true")),
                  0 <= this.className.indexOf("rev_row_zone_bottom") &&
                    D[t].bottomZones[c].push(this);
              }));
          D.lazyLoadAllSlides(t),
            (D[t].srowzones = []),
            (D[t].smiddleZones = []),
            D[t].slayers &&
              D[t].slayers.find("rs-zone").each(function () {
                D[t].srowzones.push(T(this)),
                  0 <= this.className.indexOf("rev_row_zone_middle") &&
                    (D[t].smiddleZones.push(this),
                    (this.dataset.middle = "true"));
              }),
            "carousel" === D[t].sliderType &&
              tpGS.gsap.set(D[t].canvas, {
                scale: 1,
                perspective: 1200,
                transformStyle: "flat",
                opacity: 0,
              }),
            D[t].c.prependTo(D[t].cpar),
            T("body").data("rs-fullScreenMode", !1),
            window.addEventListener("fullscreenchange", A, { passive: !0 }),
            window.addEventListener("mozfullscreenchange", A, { passive: !0 }),
            window.addEventListener("webkitfullscreenchange", A, {
              passive: !0,
            }),
            D.document.on(
              "updateContainerSizes." + D[t].c.attr("id"),
              function () {
                if (D[t] !== C)
                  return (
                    D[t].c != C &&
                    void (
                      D.updateDims(t, "ignore") &&
                      window.requestAnimationFrame(function () {
                        D.updateDims(t, "ignore"),
                          (D[t].fullScreenMode = D.checkfullscreenEnabled(t)),
                          (D.lastwindowheight = D.getWinH(t)),
                          G(t);
                      })
                    )
                  );
              }
            ),
            e.presize &&
              ((D[t].pr_next_slide = T(D[t].slides[0])),
              D.loadImages(D[t].pr_next_slide[0], t, 0, !0),
              D.waitForCurrentImages(
                D[t].pr_next_slide.find(".tp-layers"),
                t,
                function () {
                  D.animateTheLayers &&
                    D.animateTheLayers({
                      slide: D[t].pr_next_key,
                      id: t,
                      mode: "preset",
                      caller: "runSlider",
                    });
                }
              )),
            ("off" == D[t].parallax.type &&
              !D[t].sbtimeline.set &&
              !0 !== e.enable) ||
              D.scrollTicker(t),
            !0 !== e.enable && ((D[t].inviewport = !0), D.enterViewPort(t)),
            D.RS_toInit !== C && (D.RS_toInit[t] = !0),
            D[t].observeWrap &&
              D.observeWraps &&
              D.wrapObserver.observe(
                (D[t].rsFullWidthWrap !== C
                  ? D[t].rsFullWidthWrap
                  : D[t].cpar)[0],
                t
              );
        }
      }
    },
    u = function (e, t) {
      D.winW < D[e].hideSliderAtLimit
        ? (D[e].c.trigger("stoptimer"),
          !0 !== D[e].sliderIsHidden &&
            (D.sA(
              D[e].cpar[0],
              "displaycache",
              "none" != D[e].cpar.css("display")
                ? D[e].cpar.css("display")
                : D.gA(D[e].cpar[0], "displaycache")
            ),
            D[e].cpar.css({ display: "none" }),
            (D[e].sliderIsHidden = !0)))
        : (!0 === D[e].sliderIsHidden ||
            (D[e].sliderIsHidden === C && D[e].c.is(":hidden"))) &&
          t &&
          ((D[e].cpar[0].style.display =
            D.gA(D[e].cpar[0], "displaycache") != C &&
            "none" != D.gA(D[e].cpar[0], "displaycache")
              ? D.gA(D[e].cpar[0], "displaycache")
              : "block"),
          (D[e].sliderIsHidden = !1),
          D[e].c.trigger("restarttimer"),
          window.requestAnimationFrame(function () {
            G(e, !0);
          })),
        D.hideUnHideNav && D[e].navigation.use && D.hideUnHideNav(e);
    },
    G = function (e, t, i) {
      if (D[e].c === C) return !1;
      if (
        ((D[e].dimensionReCheck = {}),
        D[e].c.trigger("revolution.slide.beforeredraw"),
        1 == D[e].infullscreenmode && (D[e].minHeight = D.getWinH(e)),
        D.ISM && (D[e].lastMobileHeight = D.getWinH(e)),
        i && D.updateDims(e),
        !D.resizeThumbsTabs || !0 === D.resizeThumbsTabs(e))
      ) {
        if (
          (window.requestAnimationFrame(function () {
            u(e, !0 !== t), _(e);
          }),
          D[e].started)
        ) {
          if ("carousel" == D[e].sliderType)
            for (var a in (D.prepareCarousel(e), D[e].sbgs))
              D[e].sbgs.hasOwnProperty(a) &&
                D[e].sbgs[a].mDIM !== C &&
                D.updateSlideBGs(e, D[e].sbgs[a].key, D[e].sbgs[a]);
          else D.updateSlideBGs(e);
          if (
            "carousel" === D[e].sliderType &&
            (D[e].carCheckconW != D[e].canv.width ||
              ("fullscreen" == D[e].sliderLayout &&
                D[e].carCheckconH != D[e].canv.height))
          ) {
            for (var r in (clearTimeout(D[e].pcartimer), D[e].sbgs))
              D[e].sbgs[r].loadobj !== C &&
                D.updateSlideBGs(e, D[e].sbgs[r].key, D[e].sbgs[r]);
            "v" == D[e].carousel.orientation &&
              tpGS.gsap.set(D[e].canvas, {
                height: D[e].carousel.slide_height,
              }),
              requestAnimationFrame(function () {
                D.prepareCarousel(e),
                  D.animateTheLayers({
                    slide: "individual",
                    id: e,
                    mode: "rebuild",
                    caller: "containerResized_1",
                  }),
                  (D[e].carCheckconW = D[e].canv.width),
                  (D[e].carCheckconH = D[e].canv.height);
              }),
              (D[e].lastconw = D[e].canv.width);
          }
          if (
            (D[e].pr_processing_key !== C
              ? D.animateTheLayers({
                  slide: D[e].pr_processing_key,
                  id: e,
                  mode: "rebuild",
                  caller: "containerResized_2",
                })
              : D[e].pr_active_key !== C &&
                D.animateTheLayers({
                  slide: D[e].pr_active_key,
                  id: e,
                  mode: "rebuild",
                  caller: "containerResized_3",
                }),
            "carousel" === D[e].sliderType)
          )
            for (var r in D[e].panzoomTLs) {
              var o;
              D[e].panzoomTLs.hasOwnProperty(r) &&
                ((o = D.gA(D[e].panzoomBGs[r][0], "key")),
                D.startPanZoom(
                  D[e].panzoomBGs[r],
                  e,
                  D[e].panzoomTLs[r].progress(),
                  r,
                  D[e].panzoomTLs[r].isActive() ? "play" : "reset",
                  o
                ));
            }
          else
            D[e].pr_active_bg !== C &&
              D[e].pr_active_bg[0] !== C &&
              h(e, D[e].pr_active_bg, D[e].pr_active_bg[0].dataset.key),
              D[e].pr_next_bg !== C &&
                D[e].pr_next_bg[0] !== C &&
                h(e, D[e].pr_next_bg, D[e].pr_next_bg[0].dataset.key);
          clearTimeout(D[e].mNavigTimeout),
            D.manageNavigation &&
              (D[e].mNavigTimeout = setTimeout(function () {
                D.manageNavigation(e);
              }, 20));
        }
        D.prepareCoveredVideo(e);
      }
      D[e].c.trigger("revolution.slide.afterdraw", [{ id: e }]);
    },
    h = function (e, t, i) {
      var a;
      D[e].panzoomTLs !== C &&
        ((a = D.getSlideIndex(e, i)),
        D.startPanZoom(
          t,
          e,
          D[e].panzoomTLs[a] !== C ? D[e].panzoomTLs[a].progress() : 0,
          a,
          "play",
          i
        ));
    },
    H = function (e) {
      !0 !== D[e].noDetach && D[e].canvas.detach();
      var t,
        i = D.isFaceBook() ? "visible" : "hidden";
      D[e].autoHeight &&
        tpGS.gsap.set([D[e].c, D[e].cpar], { maxHeight: "none" }),
        tpGS.gsap.set(
          D[e].canvas,
          D[e].modal !== C && D[e].modal.useAsModal
            ? { overflow: i, width: "100%", height: "100%" }
            : {
                overflow: i,
                width: "100%",
                height: "100%",
                maxHeight: D[e].autoHeight
                  ? "none"
                  : D[e].cpar.css("maxHeight"),
              }
        ),
        "carousel" === D[e].sliderType &&
          ((t =
            "margin-top:" +
            parseInt(D[e].carousel.padding_top || 0, 0) +
            "px;"),
          D[e].canvas
            .css({ overflow: "visible" })
            .wrap('<rs-carousel-wrap style="' + t + '"></rs-carousel-wrap>'),
          D[e].cpar
            .prepend("<rs-carousel-space></rs-carousel-space>")
            .append("<rs-carousel-space></rs-carousel-space>"),
          D.defineCarouselElements(e)),
        (D[e].startWithSlide =
          D[e].startWithSlide === C
            ? C
            : Math.max(1, (D[e].sliderType, parseInt(D[e].startWithSlide)))),
        D[e].cpar.css({ overflow: "visible" }),
        (D[e].scrolleffect.bgs = []);
      for (var a = 0; a < D[e].slides.length; a++) {
        var r,
          o,
          s = T(D[e].slides[a]),
          n = D.gA(s[0], "key"),
          l = s.find(".rev-slidebg") || s.find(">img"),
          d = (D[e].sbgs[n] = M(l.data(), e)),
          c = s.data("mediafilter"),
          p =
            ((d.skeyindex = D.getSlideIndex(e, n)),
            (d.bgvid = s.find("rs-bgvideo")),
            l.detach(),
            d.bgvid.detach(),
            ((D[e].startWithSlide != C &&
              D.gA(D[e].slides[a], "originalindex") == D[e].startWithSlide) ||
              (D[e].startWithSlide === C && 0 == a)) &&
              (D[e].pr_next_key = D[e].carousel.focused = s.index()),
            tpGS.gsap.set(s, { width: "100%", height: "100%", overflow: i }),
            l.wrap(
              '<rs-sbg-px><rs-sbg-wrap data-key="' +
                n +
                '"></rs-sbg-wrap></rs-sbg-px>'
            ),
            (d.wrap = T(D.closestNode(l[0], "RS-SBG-WRAP"))),
            (d.src = l[0].src),
            (d.lazyload = d.lazyload = B(l[0], C, e)),
            (d.slidebgimage = !0),
            (d.loadobj = d.loadobj === C ? {} : d.loadobj),
            (d.mediafilter = c = "none" === c || c === C ? "" : c),
            (d.sbg = document.createElement("rs-sbg")),
            (d.sbg.alt = l[0].alt),
            D[e].overlay !== C &&
              "none" != D[e].overlay.type &&
              D[e].overlay.type != C &&
              ((p = D.createOverlay(e, D[e].overlay.type, D[e].overlay.size, {
                0: D[e].overlay.colora,
                1: D[e].overlay.colorb,
              })),
              ((r = document.createElement("rs-dotted")).style.backgroundImage =
                p),
              d.wrap.append(r),
              (d.overlay = r)),
            l.data("mediafilter", c),
            (d.canvas = document.createElement("canvas")),
            d.sbg.appendChild(d.canvas),
            (d.canvas.style.width = "100%"),
            (d.canvas.style.height = "100%"),
            (d.ctx = d.canvas.getContext("2d")),
            d.lazyload !== C && (d.sbg.dataset.lazyload = d.lazyload),
            (d.sbg.className = c),
            (d.sbg.src = d.src),
            (d.sbg.dataset.bgcolor = d.bgcolor),
            (d.sbg.style.width = "100%"),
            (d.sbg.style.height = "100%"),
            (d.key = n),
            (d.wrap[0].dataset.key = n),
            T(d.sbg).data(d),
            d.wrap.data(d),
            d.wrap[0].appendChild(d.sbg),
            document.createComment(
              "Runtime Modification - Img tag is Still Available for SEO Goals in Source - " +
                l.get(0).outerHTML
            )),
          g =
            (l.replaceWith(p),
            D.gA(s[0], "sba") === C && D.sA(s[0], "sba", ""),
            {}),
          u = D.gA(s[0], "sba").split(";");
        for (o in u)
          if (u.hasOwnProperty(o)) {
            var h = u[o].split(":");
            switch (h[0]) {
              case "f":
                g.f = h[1];
                break;
              case "b":
                g.b = h[1];
                break;
              case "g":
                g.g = h[1];
                break;
              case "t":
                g.s = h[1];
            }
          }
        D.sA(s[0], "scroll-based", !!D[e].sbtimeline.set && g.s !== C && g.s),
          0 < d.bgvid.length &&
            ((d.bgvidid = d.bgvid[0].id),
            (d.animateDirection = "idle"),
            d.bgvid.addClass("defaultvid").css({ zIndex: 30 }),
            c !== C && "" !== c && "none" !== c && d.bgvid.addClass(c),
            d.bgvid.appendTo(d.wrap),
            d.parallax != C &&
              (d.bgvid.data("parallax", d.parallax),
              d.bgvid.data("showcoveronpause", "on"),
              d.bgvid.data("mediafilter", c)),
            (d.poster = !1),
            ((d.src !== C &&
              -1 == d.src.indexOf("assets/dummy.png") &&
              -1 == d.src.indexOf("assets/transparent.png")) ||
              (d.lazyload !== C &&
                -1 == d.lazyload.indexOf("assets/transparent.png") &&
                -1 == d.lazyload.indexOf("assets/dummy.png"))) &&
              (d.poster = !0),
            d.bgvid.data("bgvideo", 1),
            (d.bgvid[0].dataset.key = n),
            0 == d.bgvid.find(".rs-fullvideo-cover").length) &&
            d.bgvid.append('<div class="rs-fullvideo-cover"></div>'),
          D[e].scrolleffect.set
            ? (D[e].scrolleffect.bgs.push({
                fade:
                  g.f !== C
                    ? g.f
                    : !!D[e].scrolleffect.slide && D[e].scrolleffect.fade,
                blur:
                  g.b !== C
                    ? g.b
                    : !!D[e].scrolleffect.slide && D[e].scrolleffect.blur,
                grayscale:
                  g.g !== C
                    ? g.g
                    : !!D[e].scrolleffect.slide && D[e].scrolleffect.grayscale,
                c: d.wrap
                  .wrap("<rs-sbg-effectwrap></rs-sbg-effectwrap>")
                  .parent(),
              }),
              s.prepend(d.wrap.parent().parent()))
            : s.prepend(d.wrap.parent());
      }
      "carousel" === D[e].sliderType
        ? (tpGS.gsap.set(D[e].carousel.wrap, { opacity: 0 }),
          D[e].c[0].appendChild(D[e].carousel.wrap[0]))
        : D[e].c[0].appendChild(D[e].canvas[0]);
    },
    M = function (e, t) {
      e.bg = e.bg === C ? "" : e.bg;
      var i,
        a = e.bg.split(";"),
        r = {
          bgposition: "50% 50%",
          bgfit: "cover",
          bgrepeat: "no-repeat",
          bgcolor: "transparent",
        };
      for (i in a)
        if (a.hasOwnProperty(i)) {
          var o = a[i].split(":"),
            s = o[0],
            o = o[1],
            n = "";
          switch (s) {
            case "p":
              n = "bgposition";
              break;
            case "f":
              n = "bgfit";
              break;
            case "r":
              n = "bgrepeat";
              break;
            case "c":
              n = "bgcolor";
          }
          n !== C && (r[n] = o);
        }
      return (
        D[t].fallbacks.panZoomDisableOnMobile &&
          D.ISM &&
          ((r.panzoom = C), (r.bgfit = "cover"), (e.panzoom = C)),
        T.extend(!0, e, r)
      );
    },
    m = function (a) {
      4 != D[a].syncload &&
        D[a].loadqueue &&
        T.each(D[a].loadqueue, function (e, t) {
          var i;
          "prepared" == t.progress &&
            D[a].syncload <= 4 &&
            (D[a].syncload++,
            "img" == t.type
              ? ((i = new Image()),
                D.sA(i, "reference", t.src),
                "RS-SBG" == t.img.tagName &&
                  t.img &&
                  t.img.alt &&
                  (i.alt = t.img.alt),
                !/^([\w]+\:)?\/\//.test(t.src) ||
                  (-1 !== t.src.indexOf(location.host) &&
                    -1 === t.src.indexOf("." + location.host)) ||
                  "" === D[a].imgCrossOrigin ||
                  D[a].imgCrossOrigin === C ||
                  (i.crossOrigin = D[a].imgCrossOrigin),
                (i.onload = function () {
                  r(this, a, "loaded"), (t.error = !1);
                }),
                (i.onerror = function () {
                  i.failedOnce ||
                    ((i.failedOnce = !0),
                    delete i.crossOrigin,
                    i.removeAttribute("crossorigin"),
                    (i.src = t.src),
                    r(this, a, "failed"),
                    (t.error = !0));
                }),
                (i.src = t.src),
                (t.starttoload = Date.now()))
              : T.get(t.src, function (e) {
                  (t.innerHTML = new XMLSerializer().serializeToString(
                    e.documentElement
                  )),
                    (t.progress = "loaded"),
                    D[a].syncload--,
                    m(a);
                }).fail(function () {
                  (t.progress = "failed"), D[a].syncload--, m(a);
                }),
            (t.progress = "inload"));
        });
    },
    v = function (e, t) {
      return (
        console.log(
          "Static Image " +
            e +
            "  Could not be loaded in time. Error Exists:" +
            t
        ),
        !0
      );
    },
    f = function (e, t) {
      return (
        5e3 < Date.now() - D[t][e + "starttime"] &&
          1 != D[t][e + "warning"] &&
          ((D[t][e + "warning"] = !0),
          (e = e + " Api Could not be loaded !"),
          "https:" === location.protocol &&
            (e += " Please Check and Renew SSL Certificate !"),
          console.error(e),
          D[t].c.append(
            '<div style="position:absolute;top:50%;width:100%;color:#e74c3c;  font-size:16px; text-align:center; padding:15px;background:#000; display:block;"><strong>' +
              e +
              "</strong></div>"
          )),
        !0
      );
    },
    z = function (e) {
      D[e] !== C &&
        ((D[e].pr_active_slide = T(D[e].slides[D[e].pr_active_key])),
        (D[e].pr_next_slide = T(D[e].slides[D[e].pr_processing_key])),
        (D[e].pr_active_bg = D[e].pr_active_slide.find("rs-sbg-wrap")),
        (D[e].pr_next_bg = D[e].pr_next_slide.find("rs-sbg-wrap")),
        D[e].pr_active_bg !== C &&
          0 < D[e].pr_active_bg.length &&
          tpGS.gsap.to(D[e].pr_active_bg, 0.5, { opacity: 0 }),
        D[e].pr_next_bg !== C &&
          0 < D[e].pr_next_bg.length &&
          tpGS.gsap.to(D[e].pr_next_bg, 0.5, { opacity: 0 }),
        tpGS.gsap.set(D[e].pr_active_slide, { zIndex: 18 }),
        D[e].pr_next_slide !== C &&
          0 < D[e].pr_next_slide.length &&
          tpGS.gsap.set(D[e].pr_next_slide, { autoAlpha: 0, zIndex: 20 }),
        (D[e].tonpause = !1),
        D[e].pr_active_key !== C &&
          D.removeTheLayers(D[e].pr_active_slide, e, !0),
        (D[e].firststart = 1),
        setTimeout(function () {
          delete D[e].pr_active_key, delete D[e].pr_processing_key;
        }, 200));
    },
    y = function (e, t, i) {
      if (D[e] !== C)
        if (
          (clearTimeout(D[e].waitWithSwapSlide),
          D[e].pr_processing_key !== C && !0 === D[e].firstSlideShown)
        )
          D[e].waitWithSwapSlide = setTimeout(function () {
            y(e, t);
          }, 18);
        else {
          if (
            (clearTimeout(D[e].waitWithSwapSlide),
            D[e].startWithSlideKey !== C &&
              ((D[e].pr_next_key = D.getComingSlide(
                e,
                D[e].startWithSlideKey
              ).nindex),
              (D[e].startedWithOtherSlide = !0),
              delete D[e].startWithSlideKey),
            (D[e].pr_active_slide = T(D[e].slides[D[e].pr_active_key])),
            (D[e].pr_next_slide = T(D[e].slides[D[e].pr_next_key])),
            D[e].pr_next_key == D[e].pr_active_key)
          )
            return delete D[e].pr_next_key;
          var a = D.gA(D[e].pr_next_slide[0], "key"),
            a =
              (D[e].sbgs[a] !== C &&
                D[e].sbgs[a].bgvid &&
                0 < D[e].sbgs[a].bgvid.length &&
                (D[e].videos == C ||
                  D[e].videos[D[e].sbgs[a].bgvid[0].id] === C) &&
                D.manageVideoLayer(D[e].sbgs[a].bgvid, e, a),
              (D[e].pr_processing_key = D[e].pr_next_key),
              (D[e].pr_cache_pr_next_key = D[e].pr_next_key),
              delete D[e].pr_next_key,
              D[e].pr_next_slide !== C &&
                D[e].pr_next_slide[0] !== C &&
                D.gA(D[e].pr_next_slide[0], "hal") !== C &&
                D.sA(
                  D[e].pr_next_slide[0],
                  "sofacounter",
                  D.gA(D[e].pr_next_slide[0], "sofacounter") === C
                    ? 1
                    : parseInt(D.gA(D[e].pr_next_slide[0], "sofacounter"), 0) +
                        1
                ),
              D[e].stopLoop &&
                D[e].pr_processing_key == D[e].lastslidetoshow - 1 &&
                (D[e].progressC.css({ visibility: "hidden" }),
                D[e].c.trigger("revolution.slide.onstop"),
                (D[e].noloopanymore = 1)),
              D[e].pr_next_slide.index() === D[e].slideamount - 1 &&
                0 < D[e].looptogo &&
                "disabled" !== D[e].looptogo &&
                (D[e].looptogo--, D[e].looptogo <= 0) &&
                (D[e].stopLoop = !0),
              (D[e].tonpause = !0),
              (D[e].slideInSwapTimer = !0),
              D[e].c.trigger("stoptimer"),
              "off" === D[e].spinner
                ? D[e].loader !== C &&
                  !0 === D[e].loaderVisible &&
                  (D[e].loader.css({ display: "none" }),
                  (D[e].loaderVisible = !1))
                : (D[e].loadertimer = setTimeout(function () {
                    D[e].loader !== C &&
                      !0 !== D[e].loaderVisible &&
                      (D[e].loader.css({ display: "block" }),
                      (D[e].loaderVisible = !0));
                  }, 100)),
              "carousel" === D[e].sliderType && "all" !== D[e].lazyType
                ? D.loadVisibleCarouselItems(e)
                : D[e].pr_next_slide[0]);
          D.loadImages(a, e, 1),
            D.preLoadAudio && D.preLoadAudio(D[e].pr_next_slide, e, 1),
            D.waitForCurrentImages(a, e, function () {
              (D[e].firstSlideShown = !0),
                D[e].pr_next_slide.find("rs-bgvideo").each(function () {
                  D.prepareCoveredVideo(e);
                }),
                D.loadUpcomingContent(e),
                window.requestAnimationFrame(function () {
                  W(D[e].pr_next_slide.find("rs-sbg"), e, t, i);
                });
            });
        }
    },
    W = function (e, t, i, a) {
      if (D[t] !== C) {
        _(t),
          (D[t].pr_active_slide = T(D[t].slides[D[t].pr_active_key])),
          (D[t].pr_next_slide = T(D[t].slides[D[t].pr_processing_key])),
          (D[t].pr_active_bg = D[t].pr_active_slide.find("rs-sbg-wrap")),
          (D[t].pr_next_bg = D[t].pr_next_slide.find("rs-sbg-wrap")),
          (D[t].tonpause = !1),
          clearTimeout(D[t].loadertimer),
          D[t].loader !== C &&
            !0 === D[t].loaderVisible &&
            (window.requestAnimationFrame(function () {
              D[t].loader.css({ display: "none" });
            }),
            (D[t].loaderVisible = !1)),
          (D[t].onBeforeSwap = {
            slider: t,
            slideIndex: parseInt(D[t].pr_active_key, 0) + 1,
            slideLIIndex: D[t].pr_active_key,
            nextSlideIndex: parseInt(D[t].pr_processing_key, 0) + 1,
            nextSlideLIIndex: D[t].pr_processing_key,
            nextslide: D[t].pr_next_slide,
            slide: D[t].pr_active_slide,
            currentslide: D[t].pr_active_slide,
            prevslide:
              D[t].pr_lastshown_key !== C
                ? D[t].slides[D[t].pr_lastshown_key]
                : "",
          }),
          "carousel" !== D[t].sliderType &&
            tpGS.gsap.set(D[t].pr_next_slide, { display: "block" }),
          D[t].c.trigger("revolution.slide.onbeforeswap", D[t].onBeforeSwap);
        var r,
          o = D.gA(D[t].pr_active_slide[0], "key"),
          o = D[t].sbgs[o];
        if (
          (o &&
            o.panzoom &&
            o.pzAnim &&
            ((o.pzLastFrame = !0), D.pzDrawShadow(t, o, o.pzAnim.start)),
          D[t].sbgs[D.gA(D[t].pr_next_slide[0], "key")] &&
            tpGS.gsap.fromTo(
              D[t].sbgs[D.gA(D[t].pr_next_slide[0], "key")].overlay,
              { opacity: 0 },
              { opacity: 1, duration: 1, ease: "none" }
            ),
          o &&
            tpGS.gsap.to(o.overlay, { opacity: 0, duration: 1, ease: "none" }),
          (D[t].transition = 1),
          (D[t].stopByVideo = !1),
          D[t].pr_next_slide[0] !== C &&
          D.gA(D[t].pr_next_slide[0], "duration") != C &&
          "" != D.gA(D[t].pr_next_slide[0], "duration")
            ? (D[t].duration = parseInt(
                D.gA(D[t].pr_next_slide[0], "duration"),
                0
              ))
            : (D[t].duration = D[t].origcd),
          D[t].pr_next_slide[0] === C ||
          ("true" != D.gA(D[t].pr_next_slide[0], "ssop") &&
            !0 !== D.gA(D[t].pr_next_slide[0], "ssop"))
            ? (D[t].ssop = !1)
            : (D[t].ssop = !0),
          D[t].sbtimeline.set &&
            D[t].sbtimeline.fixed &&
            D.updateFixedScrollTimes(t),
          D[t].c.trigger("nulltimer"),
          (D[t].sdir =
            ("bullet" === D[t].sc_indicator ||
              D[t].pr_active_key != D[t].slideamount - 1 ||
              0 != D[t].pr_processing_key) &&
            D[t].pr_processing_key < D[t].pr_active_key
              ? 1
              : 0),
          "arrow" == D[t].sc_indicator && (D[t].sdir = D[t].sc_indicator_dir),
          (D[t].lsdir = D[t].sdir),
          D[t].pr_active_key != D[t].pr_processing_key &&
            1 != D[t].firststart &&
            "carousel" !== D[t].sliderType &&
            D.removeTheLayers &&
            D.removeTheLayers(D[t].pr_active_slide, t),
          1 !== D.gA(D[t].pr_next_slide[0], "rspausetimeronce") &&
          1 !== D.gA(D[t].pr_next_slide[0], "rspausetimeralways")
            ? D[t].c.trigger("restarttimer")
            : ((D[t].stopByVideo = !0), D.unToggleState(D[t].slidertoggledby)),
          D.sA(D[t].pr_next_slide[0], "rspausetimeronce", 0),
          D[t].pr_next_slide[0] !== C &&
            D.sA(D[t].c[0], "slideactive", D.gA(D[t].pr_next_slide[0], "key")),
          "carousel" == D[t].sliderType
            ? ((D[t].mtl = tpGS.gsap.timeline()),
              D.prepareCarousel(t),
              ("v" != D[t].carousel.orientation &&
                "fullscreen" !== D[t].sliderLayout) ||
                tpGS.gsap.set(D[t].canvas, {
                  height: D[t].carousel.slide_height,
                }),
              w(t, a),
              D.updateSlideBGs(t),
              !0 !== D[t].carousel.checkFVideo &&
                ((r = D.gA(D[t].pr_next_slide[0], "key")),
                D[t].sbgs[r] !== C &&
                  D[t].sbgs[r].bgvid !== C &&
                  0 !== D[t].sbgs[r].bgvid.length &&
                  D.playBGVideo(t, r),
                (D[t].carousel.checkFVideo = !0)),
              (D[t].transition = 0),
              D[t].startedWithOtherSlide &&
                (setTimeout(function () {
                  (D[t].carousel.focused = D[t].pr_active_key),
                    D.positionCarousel(t);
                }),
                delete D[t].startedWithOtherSlide))
            : ((D[t].pr_lastshown_key =
                D[t].pr_lastshown_key === C
                  ? D[t].pr_next_key !== C
                    ? D[t].pr_next_key
                    : D[t].pr_processing_key !== C
                    ? D[t].pr_processing_key
                    : D[t].pr_active_key !== C
                    ? D[t].pr_active_key
                    : D[t].pr_lastshown_key
                  : D[t].pr_lastshown_key),
              (D[t].mtl = tpGS.gsap.timeline({
                paused: !0,
                onComplete: function () {
                  w(t);
                },
              })),
              D[t].pr_next_key !== C
                ? D.animateTheLayers({
                    slide: D[t].pr_next_key,
                    id: t,
                    mode: "preset",
                    caller: "swapSlideProgress_1",
                  })
                : D[t].pr_processing_key !== C
                ? D.animateTheLayers({
                    slide: D[t].pr_processing_key,
                    id: t,
                    mode: "preset",
                    caller: "swapSlideProgress_2",
                  })
                : D[t].pr_active_key !== C &&
                  D.animateTheLayers({
                    slide: D[t].pr_active_key,
                    id: t,
                    mode: "preset",
                    caller: "swapSlideProgress_3",
                  }),
              1 == D[t].firststart &&
                (D[t].pr_active_slide[0] !== C &&
                  tpGS.gsap.set(D[t].pr_active_slide, { autoAlpha: 0 }),
                (D[t].firststart = 0)),
              D[t].pr_active_slide[0] !== C &&
                tpGS.gsap.set(D[t].pr_active_slide, { zIndex: 18 }),
              D[t].pr_next_slide[0] !== C &&
                tpGS.gsap.set(D[t].pr_next_slide, { autoAlpha: 0, zIndex: 20 }),
              (r = D.gA(D[t].pr_next_slide[0], "key")),
              D[t].sbgs[r] !== C &&
                D[t].sbgs[r].alt === C &&
                ((D[t].sbgs[r].alt =
                  D.gA(D[t].pr_next_slide[0], "alttrans") || !1),
                (D[t].sbgs[r].alt =
                  !1 !== D[t].sbgs[r].alt && D[t].sbgs[r].alt.split(",")),
                (D[t].sbgs[r].altIndex = 0),
                (D[t].sbgs[r].altLen =
                  !1 !== D[t].sbgs[r].alt ? D[t].sbgs[r].alt.length : 0)),
              (D[t].firstSlideAnimDone === C &&
                D[t].fanim !== C &&
                !1 !== D[t].fanim) ||
                D[t].sbgs[r].slideanimation === C ||
                D[t].sbgs[r].slideanimationRebuild ||
                (D[t].sbgs[r].random !== C && D.SLTR !== C) ||
                (0 < D[t].sbgs[r].altLen && D.SLTR),
              (D[t].sbgs[r].slideanimation =
                D[t].firstSlideAnimDone === C &&
                D[t].fanim !== C &&
                !1 !== D[t].fanim
                  ? D.convertSlideAnimVals(
                      T.extend(!0, {}, D.getSlideAnim_EmptyObject(), D[t].fanim)
                    )
                  : D[t].sbgs[r].slideanimation === C ||
                    D[t].sbgs[r].slideanimationRebuild ||
                    (0 < D[t].sbgs[r].altLen &&
                      "default_first_anim" ==
                        D[t].sbgs[r].alt[D[t].sbgs[r].altIndex])
                  ? D.getSlideAnimationObj(
                      t,
                      {
                        anim: D.gA(D[t].pr_next_slide[0], "anim"),
                        filter: D.gA(D[t].pr_next_slide[0], "filter"),
                        in: D.gA(D[t].pr_next_slide[0], "in"),
                        out: D.gA(D[t].pr_next_slide[0], "out"),
                        d3: D.gA(D[t].pr_next_slide[0], "d3"),
                      },
                      r
                    )
                  : D[t].sbgs[r].random !== C && D.SLTR !== C
                  ? D.convertSlideAnimVals(
                      T.extend(
                        !0,
                        {},
                        D.getSlideAnim_EmptyObject(),
                        D.getAnimObjectByKey(
                          D.getRandomSlideTrans(
                            D[t].sbgs[r].random.rndmain,
                            D[t].sbgs[r].random.rndgrp,
                            D.SLTR
                          ),
                          D.SLTR
                        )
                      )
                    )
                  : 0 < D[t].sbgs[r].altLen && D.SLTR !== C
                  ? D.convertSlideAnimVals(
                      T.extend(
                        !0,
                        { altAnim: D[t].sbgs[r].alt[D[t].sbgs[r].altIndex] },
                        D.getSlideAnim_EmptyObject(),
                        D.getAnimObjectByKey(
                          D[t].sbgs[r].alt[D[t].sbgs[r].altIndex],
                          D.SLTR
                        )
                      )
                    )
                  : D[t].sbgs[r].slideanimation),
              0 < D[t].sbgs[r].altLen &&
                (D[t].sbgs[r].firstSlideAnimDone !== C
                  ? (D[t].sbgs[r].altIndex++,
                    (D[t].sbgs[r].altIndex =
                      D[t].sbgs[r].altIndex >= D[t].sbgs[r].altLen
                        ? 0
                        : D[t].sbgs[r].altIndex))
                  : ((D[t].sbgs[r].firstSlideAnimDone = !0),
                    D.SLTR === C &&
                      D.SLTR_loading === C &&
                      D.loadSlideAnimLibrary(t),
                    D[t].sbgs[r].alt.push("default_first_anim"),
                    D[t].sbgs[r].altLen++)),
              (D[t].sbgs[r].currentState = "animating"),
              D.animateSlide(t, D[t].sbgs[r].slideanimation),
              D[t].firstSlideAnimDone === C &&
                D[t].fanim !== C &&
                !1 !== D[t].fanim &&
                (D[t].sbgs[r].slideanimationRebuild = !0),
              (D[t].firstSlideAnimDone = !0),
              D[t].pr_next_bg.data("panzoom") !== C &&
                requestAnimationFrame(function () {
                  var e = D.gA(D[t].pr_next_slide[0], "key");
                  D.startPanZoom(
                    D[t].pr_next_bg,
                    t,
                    0,
                    D.getSlideIndex(t, e),
                    "first",
                    e
                  );
                }),
              D[t].mtl.pause()),
          D.animateTheLayers
            ? "carousel" === D[t].sliderType
              ? (!1 !== D[t].carousel.showLayersAllTime &&
                  (D[t].carousel.allLayersStarted
                    ? D.animateTheLayers({
                        slide: "individual",
                        id: t,
                        mode: "rebuild",
                        caller: "swapSlideProgress_5",
                      })
                    : D.animateTheLayers({
                        slide: "individual",
                        id: t,
                        mode: "start",
                        caller: "swapSlideProgress_4",
                      }),
                  D[t].carousel.allLayersStarted == C) &&
                  (D.updateCarouselRows(t),
                  (D[t].carousel.allLayersStarted = !0)),
                0 !== D[t].firststart
                  ? D.animateTheLayers({
                      slide: 0,
                      id: t,
                      mode: "start",
                      caller: "swapSlideProgress_6",
                    })
                  : !0 !== i &&
                    D.animateTheLayers({
                      slide:
                        D[t].pr_next_key !== C
                          ? D[t].pr_next_key
                          : D[t].pr_processing_key !== C
                          ? D[t].pr_processing_key
                          : D[t].pr_active_key,
                      id: t,
                      mode: "start",
                      caller: "swapSlideProgress_7",
                    }),
                (D[t].firststart = 0))
              : D.animateTheLayers({
                  slide:
                    D[t].pr_next_key !== C
                      ? D[t].pr_next_key
                      : D[t].pr_processing_key !== C
                      ? D[t].pr_processing_key
                      : D[t].pr_active_key,
                  id: t,
                  mode: "start",
                  caller: "swapSlideProgress_8",
                })
            : D[t].mtl != C &&
              setTimeout(function () {
                D[t].mtl.resume();
              }, 18),
          "carousel" !== D[t].sliderType)
        )
          if (
            ((D[t].scwDur = 0.001),
            Array.isArray(D[t].scwCallback) &&
              0 < D[t].scwCallback.length &&
              D[t].pr_next_slide[0].classList.contains("rs-addon-pano-active"))
          ) {
            (D[t].scwDone = !1), (D[t].scwCount = D[t].scwCallback.length);
            for (var s = 0; s < D[t].scwCallback.length; s++)
              D[t].scwCallback[s]();
            D[t].scwTimeout = tpGS.gsap.delayedCall(2, function () {
              0 < D[t].scwCount &&
                (D[t].scwTween &&
                  "function" == typeof D[t].scwTween.kill &&
                  (D[t].scwTween.kill(), (D[t].scwTween = null)),
                (D[t].scwTween = tpGS.gsap.to(D[t].pr_next_slide, {
                  duration: D[t].scwDur,
                  autoAlpha: 1,
                })));
            });
          } else
            tpGS.gsap.to(D[t].pr_next_slide, {
              duration: D[t].scwDur,
              autoAlpha: 1,
            });
      }
    },
    w = function (e) {
      if (
        D[e] !== C &&
        ("done" !== D.RS_swapList[e] &&
          ((D.RS_swapList[e] = "done"),
          (t = T.inArray(e, D.RS_swapping)),
          D.RS_swapping.splice(t, 1)),
        D[e].firstSlideAvailable === C &&
          ((D[e].firstSlideAvailable = !0),
          window.requestAnimationFrame(function () {
            "hero" !== D[e].sliderType &&
              D.createNavigation &&
              D[e].navigation.use &&
              !0 !== D[e].navigation.createNavigationDone &&
              D.createNavigation(e);
          })),
        "carousel" === D[e].sliderType &&
          tpGS.gsap.to(D[e].carousel.wrap, 1, { opacity: 1 }),
        (D[e].pr_active_key =
          D[e].pr_processing_key !== C
            ? D[e].pr_processing_key
            : D[e].pr_active_key),
        delete D[e].pr_processing_key,
        ("scroll" != D[e].parallax.type &&
          "scroll+mouse" != D[e].parallax.type &&
          "mouse+scroll" != D[e].parallax.type) ||
          ((D[e].lastscrolltop = -999), D.generalObserver(D.ISM)),
        (D[e].mtldiff = D[e].mtl.time()),
        delete D[e].mtl,
        D[e].pr_active_key !== C)
      ) {
        if (D.gA(D[e].slides[D[e].pr_active_key], "sloop") !== C) {
          var i = e;
          if (D[i] !== C) {
            D[i].sloops = D[i].sloops === C ? {} : D[i].sloops;
            var t = D.gA(D[i].slides[D[i].pr_active_key], "key");
            if ((r = D[i].sloops[t]) === C) {
              var a,
                r = { s: 2500, e: 4500, r: "unlimited" },
                o = D.gA(D[i].slides[D[i].pr_active_key], "sloop").split(";");
              for (a in o)
                if (o.hasOwnProperty(a)) {
                  var s = o[a].split(":");
                  switch (s[0]) {
                    case "s":
                      r.s = parseInt(s[1], 0) / 1e3;
                      break;
                    case "e":
                      r.e = parseInt(s[1], 0) / 1e3;
                      break;
                    case "r":
                      r.r = s[1];
                  }
                }
              (r.r = "unlimited" === r.r ? -1 : parseInt(r.r, 0)),
                ((D[i].sloops[t] = r).key = t);
            }
            (r.ct = { time: r.s }),
              (r.tl = tpGS.gsap.timeline({})),
              (r.timer = tpGS.gsap
                .fromTo(
                  r.ct,
                  r.e - r.s,
                  { time: r.s },
                  {
                    time: r.e,
                    ease: "none",
                    onRepeat: function () {
                      for (var e in D[i].layers[r.key])
                        D[i].layers[r.key].hasOwnProperty(e) &&
                          D[i]._L[e].timeline.play(r.s);
                      var t = D[i].progressC;
                      t !== C &&
                        t[0] !== C &&
                        t[0].tween !== C &&
                        t[0].tween.time(r.s);
                    },
                    onUpdate: function () {},
                    onComplete: function () {},
                  }
                )
                .repeat(r.r)),
              r.tl.add(r.timer, r.s),
              r.tl.time(D[i].mtldiff);
          }
        }
        D.sA(D[e].slides[D[e].activeRSSlide], "isactiveslide", !1),
          (D[e].activeRSSlide = D[e].pr_active_key),
          D.sA(D[e].slides[D[e].activeRSSlide], "isactiveslide", !0);
        var n = D.gA(D[e].slides[D[e].pr_active_key], "key"),
          l = D.gA(D[e].slides[D[e].pr_lastshown_key], "key"),
          l =
            (D.sA(D[e].c[0], "slideactive", n),
            l !== C &&
              D[e].panzoomTLs !== C &&
              D[e].panzoomTLs[D.getSlideIndex(e, l)] !== C &&
              ("carousel" === D[e].sliderType
                ? (D[e].panzoomTLs[D.getSlideIndex(e, l)].timeScale(3),
                  D[e].panzoomTLs[D.getSlideIndex(e, l)].reverse())
                : D[e].panzoomTLs[D.getSlideIndex(e, l)].pause()),
            b(e, n),
            {
              slider: e,
              slideIndex: parseInt(D[e].pr_active_key, 0) + 1,
              slideLIIndex: D[e].pr_active_key,
              slide: D[e].pr_next_slide,
              currentslide: D[e].pr_next_slide,
              prevSlideIndex:
                D[e].pr_lastshown_key !== C &&
                parseInt(D[e].pr_lastshown_key, 0) + 1,
              prevSlideLIIndex:
                D[e].pr_lastshown_key !== C &&
                parseInt(D[e].pr_lastshown_key, 0),
              prevSlide:
                D[e].pr_lastshown_key !== C &&
                D[e].slides[D[e].pr_lastshown_key],
            }),
          l =
            (D[e].c.trigger("revolution.slide.onchange", l),
            D[e].c.trigger("revolution.slide.onafterswap", l),
            "" + D[e].pr_lastshown_key != "" + D[e].pr_active_key &&
              "carousel" !== D[e].sliderType &&
              tpGS.gsap.set(l.prevSlide, { display: "none", delay: 0.01 }),
            (D[e].deepLinkListener || D[e].enableDeeplinkHash) &&
              (n = D.gA(D[e].slides[D[e].pr_active_key], "deeplink")) !== C &&
              0 < n.length &&
              ((D[e].ignoreDeeplinkChange = !0),
              (window.location.hash = D.gA(
                D[e].slides[D[e].pr_active_key],
                "deeplink"
              ))),
            (D[e].pr_lastshown_key = D[e].pr_active_key),
            D[e].startWithSlide !== C &&
              "done" !== D[e].startWithSlide &&
              "carousel" === D[e].sliderType &&
              (D[e].firststart = 0),
            (D[e].duringslidechange = !1),
            0 < D[e].pr_active_slide.length &&
              0 != D.gA(D[e].pr_active_slide[0], "hal") &&
              D.gA(D[e].pr_active_slide[0], "hal") <=
                D.gA(D[e].pr_active_slide[0], "sofacounter") &&
              D[e].c.revremoveslide(D[e].pr_active_slide.index()),
            D[e].pr_processing_key || D[e].pr_active_key || 0);
        D[e].rowzones != C &&
          (l = l > D[e].rowzones.length ? D[e].rowzones.length : l),
          ((D[e].rowzones != C &&
            0 < D[e].rowzones.length &&
            D[e].rowzones[l] != C &&
            0 <= l &&
            l <= D[e].rowzones.length &&
            0 < D[e].rowzones[l].length) ||
            D.winH < D[e].module.height) &&
            D.updateDims(e),
          D[e].firstLetItFree === C &&
            (D.generalObserver(D.ISM), (D[e].firstLetItFree = !0)),
          (D[e].skipAttachDetach = !1);
      }
    },
    b = function (e, t) {
      D[e].sbgs[t] === C || D[e].sbgs[t].loadobj.img
        ? D[e].pr_next_bg.data("panzoom") !== C &&
          (D[e].panzoomTLs !== C && D[e].panzoomTLs[D.getSlideIndex(e, t)] !== C
            ? (D[e].panzoomTLs[D.getSlideIndex(e, t)].timeScale(1),
              D[e].panzoomTLs[D.getSlideIndex(e, t)].play())
            : D.startPanZoom(
                D[e].pr_next_bg,
                e,
                0,
                D.getSlideIndex(e, t),
                "play",
                t
              ))
        : tpGS.gsap.delayedCall(0.1, function () {
            b(e, t);
          });
    },
    E = function (e) {
      D[e].c.children().each(function () {
        try {
          T(this).die("click");
        } catch (e) {}
        try {
          T(this).die("mouseenter");
        } catch (e) {}
        try {
          T(this).die("mouseleave");
        } catch (e) {}
        try {
          T(this).off("hover");
        } catch (e) {}
      });
      try {
        D[e].c.die("click", "mouseenter", "mouseleave");
      } catch (e) {}
      clearInterval(D[e].cdint), (D[e].c = null);
    },
    _ = function (e) {
      var t,
        i,
        a,
        r,
        o = D[e].progressBar;
      if (D[e].progressC === C || 0 == D[e].progressC.length)
        if (
          ((D[e].progressC = T(
            '<rs-progress style="visibility:hidden;"></rs-progress>'
          )),
          "horizontal" === o.style || "vertical" === o.style)
        ) {
          if ("module" === o.basedon) {
            for (var s = "", n = 0; n < D[e].slideamount; n++)
              s += "<rs-progress-bar></rs-progress-bar>";
            s += "<rs-progress-bgs>";
            for (n = 0; n < D[e].slideamount; n++)
              s += "<rs-progress-bg></rs-progress-bg>";
            if (((s += "</rs-progress-bgs>"), "nogap" !== o.gaptype))
              for (n = 0; n < D[e].slideamount; n++)
                s += "<rs-progress-gap></rs-progress-gap>";
            (D[e].progressC[0].innerHTML = s),
              !0 === D[e].noDetach && D[e].c.append(D[e].progressC),
              (D[e].progressCBarBGS = D.getByTag(
                D[e].progressC[0],
                "RS-PROGRESS-BG"
              )),
              (D[e].progressCBarGAPS = D.getByTag(
                D[e].progressC[0],
                "RS-PROGRESS-GAP"
              )),
              "nogap" !== o.gaptype &&
                tpGS.gsap.set(D[e].progressCBarGAPS, {
                  backgroundColor: o.gapcolor,
                  zIndex: "gapbg" === o.gaptype ? 17 : 27,
                }),
              tpGS.gsap.set(D[e].progressCBarBGS, {
                backgroundColor: o.bgcolor,
              });
          } else
            (D[e].progressC[0].innerHTML =
              "<rs-progress-bar></rs-progress-bar>"),
              !0 === D[e].noDetach && D[e].c.append(D[e].progressC);
          (D[e].progressCBarInner = D.getByTag(
            D[e].progressC[0],
            "RS-PROGRESS-BAR"
          )),
            tpGS.gsap.set(D[e].progressCBarInner, { background: o.color });
        } else
          (D[e].progressC[0].innerHTML =
            '<canvas width="' +
            2 * o.radius +
            '" height="' +
            2 * o.radius +
            '" style="position:absolute" class="rs-progress-bar"></canvas>'),
            !0 === D[e].noDetach && D[e].c.append(D[e].progressC),
            (D[e].progressCBarInner =
              D[e].progressC[0].getElementsByClassName("rs-progress-bar")[0]),
            (D[e].progressBCanvas = D[e].progressCBarInner.getContext("2d")),
            (D[e].progressBar.degree =
              "cw" === D[e].progressBar.style ? 360 : 0),
            S(e);
      !0 !== D[e].noDetach && D[e].progressC.detach(),
        D[e].progressBar.visibility[D[e].level] &&
        1 != D[e].progressBar.disableProgressBar
          ? "horizontal" === o.style || "vertical" === o.style
            ? ((t = D[e].slideamount - 1),
              "horizontal" === o.style
                ? ((r =
                    "grid" === o.alignby
                      ? D[e].gridwidth[D[e].level]
                      : D[e].module.width),
                  (i = Math.ceil(r / D[e].slideamount)),
                  (a = Math.ceil((r - t * o.gapsize) / D[e].slideamount)),
                  tpGS.gsap.set(D[e].progressC, {
                    visibility: "visible",
                    top:
                      "top" === o.vertical
                        ? o.y +
                          ("grid" === o.alignby && D[e].gridOffsetHeight !== C
                            ? Math.max(0, D[e].gridOffsetHeight)
                            : 0)
                        : "center" === o.vertical
                        ? "50%"
                        : "auto",
                    bottom:
                      "top" === o.vertical || "center" === o.vertical
                        ? "auto"
                        : o.y +
                          ("grid" === o.alignby && D[e].gridOffsetHeight !== C
                            ? Math.max(0, D[e].gridOffsetHeight)
                            : 0),
                    left:
                      "left" === o.horizontal &&
                      "grid" === o.alignby &&
                      D[e].gridOffsetWidth !== C
                        ? Math.max(0, D[e].gridOffsetWidth)
                        : "auto",
                    right:
                      "right" === o.horizontal &&
                      "grid" === o.alignby &&
                      D[e].gridOffsetWidth !== C
                        ? Math.max(0, D[e].gridOffsetWidth)
                        : "auto",
                    y: "center" === o.vertical ? o.y : 0,
                    height: o.size,
                    backgroundColor:
                      "module" === o.basedon ? "transparent" : o.bgcolor,
                    marginTop:
                      "bottom" === o.vertical || "top" === o.vertical
                        ? 0
                        : parseInt(o.size, 0) / 2,
                    width:
                      "grid" === o.alignby
                        ? D[e].gridwidth[D[e].level]
                        : "100%",
                  }),
                  tpGS.gsap.set(D[e].progressCBarInner, {
                    x:
                      "module" === o.basedon
                        ? o.gap
                          ? function (e) {
                              return (
                                ("right" === o.horizontal ? t - e : e) *
                                (a + o.gapsize)
                              );
                            }
                          : function (e) {
                              return ("right" === o.horizontal ? t - e : e) * i;
                            }
                        : 0,
                    width:
                      "module" === o.basedon
                        ? o.gap
                          ? a + "px"
                          : 100 / D[e].slideamount + "%"
                        : "100%",
                  }),
                  "module" === o.basedon &&
                    (tpGS.gsap.set(D[e].progressCBarBGS, {
                      x:
                        "module" === o.basedon
                          ? o.gap
                            ? function (e) {
                                return e * (a + o.gapsize);
                              }
                            : function (e) {
                                return e * i;
                              }
                          : 0,
                      width:
                        "module" === o.basedon
                          ? o.gap
                            ? a + "px"
                            : 100 / D[e].slideamount + "%"
                          : "100%",
                    }),
                    tpGS.gsap.set(D[e].progressCBarGAPS, {
                      width: o.gap ? o.gapsize + "px" : 0,
                      x: o.gap
                        ? function (e) {
                            return (e + 1) * a + parseInt(o.gapsize, 0) * e;
                          }
                        : 0,
                    })))
                : "vertical" === o.style &&
                  ((r =
                    "grid" === o.alignby
                      ? D[e].gridheight[D[e].level]
                      : D[e].module.height),
                  (i = Math.ceil(r / D[e].slideamount)),
                  (a = Math.ceil((r - t * o.gapsize) / D[e].slideamount)),
                  tpGS.gsap.set(D[e].progressC, {
                    visibility: "visible",
                    left:
                      "left" === o.horizontal
                        ? o.x +
                          ("grid" === o.alignby && D[e].gridOffsetWidth !== C
                            ? Math.max(0, D[e].gridOffsetWidth)
                            : 0)
                        : "center" === o.horizontal
                        ? "50%"
                        : "auto",
                    right:
                      "left" === o.horizontal || "center" === o.horizontal
                        ? "auto"
                        : o.x +
                          ("grid" === o.alignby && D[e].gridOffsetWidth !== C
                            ? Math.max(0, D[e].gridOffsetWidth)
                            : 0),
                    x: "center" === o.horizontal ? o.x : 0,
                    top:
                      "top" === o.vertical &&
                      "grid" === o.alignby &&
                      D[e].gridOffsetHeight !== C
                        ? Math.max(D[e].gridOffsetHeight, 0)
                        : "auto",
                    bottom:
                      "bottom" === o.vertical &&
                      "grid" === o.alignby &&
                      D[e].gridOffsetHeight !== C
                        ? Math.max(D[e].gridOffsetHeight, 0)
                        : "auto",
                    width: o.size,
                    marginLeft:
                      "left" === o.horizontal || "right" === o.horizontal
                        ? 0
                        : parseInt(o.size, 0) / 2,
                    backgroundColor:
                      "module" === o.basedon ? "transparent" : o.bgcolor,
                    height:
                      "grid" === o.alignby
                        ? D[e].gridheight[D[e].level]
                        : "100%",
                  }),
                  tpGS.gsap.set(D[e].progressCBarInner, {
                    y:
                      "module" === o.basedon
                        ? o.gap
                          ? function (e) {
                              return (
                                ("bottom" === o.vertical ? t - e : e) *
                                (a + o.gapsize)
                              );
                            }
                          : function (e) {
                              return ("bottom" === o.vertical ? t - e : e) * i;
                            }
                        : 0,
                    height:
                      "module" === o.basedon
                        ? o.gap
                          ? a + "px"
                          : 100 / D[e].slideamount + "%"
                        : "100%",
                  }),
                  "module" === o.basedon) &&
                  (tpGS.gsap.set(D[e].progressCBarBGS, {
                    y:
                      "module" === o.basedon
                        ? o.gap
                          ? function (e) {
                              return e * (a + o.gapsize);
                            }
                          : function (e) {
                              return e * i;
                            }
                        : 0,
                    height:
                      "module" === o.basedon
                        ? o.gap
                          ? a + "px"
                          : 100 / D[e].slideamount + "%"
                        : "100%",
                  }),
                  tpGS.gsap.set(D[e].progressCBarGAPS, {
                    height: o.gap ? o.gapsize + "px" : 0,
                    y: o.gap
                      ? function (e) {
                          return (e + 1) * a + parseInt(o.gapsize, 0) * e;
                        }
                      : 0,
                  })))
            : tpGS.gsap.set(D[e].progressC, {
                top:
                  "top" === o.vertical
                    ? o.y +
                      ("grid" === o.alignby && D[e].gridOffsetHeight !== C
                        ? Math.max(0, D[e].gridOffsetHeight)
                        : 0)
                    : "center" === o.vertical
                    ? "50%"
                    : "auto",
                bottom:
                  "top" === o.vertical || "center" === o.vertical
                    ? "auto"
                    : o.y +
                      ("grid" === o.alignby && D[e].gridOffsetHeight !== C
                        ? Math.max(0, D[e].gridOffsetHeight)
                        : 0),
                left:
                  "left" === o.horizontal
                    ? o.x +
                      ("grid" === o.alignby && D[e].gridOffsetWidth !== C
                        ? Math.max(0, D[e].gridOffsetWidth)
                        : 0)
                    : "center" === o.horizontal
                    ? "50%"
                    : "auto",
                right:
                  "left" === o.horizontal || "center" === o.horizontal
                    ? "auto"
                    : o.x +
                      ("grid" === o.alignby && D[e].gridOffsetWidth !== C
                        ? Math.max(0, D[e].gridOffsetWidth)
                        : 0),
                y: "center" === o.vertical ? o.y : 0,
                x: "center" === o.horizontal ? o.x : 0,
                width: 2 * o.radius,
                height: 2 * o.radius,
                marginTop: "center" === o.vertical ? 0 - o.radius : 0,
                marginLeft: "center" === o.horizontal ? 0 - o.radius : 0,
                backgroundColor: "transparent",
                visibility: "visible",
              })
          : (D[e].progressC[0].style.visibility = "hidden"),
        !0 !== D[e].noDetach && D[e].c.append(D[e].progressC),
        D[e].gridOffsetWidth === C && "grid" === o.alignby
          ? (D[e].rebuildProgressBar = !0)
          : (D[e].rebuildProgressBar = !1);
    },
    S = function (e) {
      var t = D[e].progressBar,
        i =
          (t.radius - parseInt(t.size, 0) <= 0 && (t.size = t.radius / 4),
          parseInt(t.radius)),
        a = parseInt(t.radius);
      (D[e].progressBCanvas.lineCap = "round"),
        D[e].progressBCanvas.clearRect(0, 0, 2 * t.radius, 2 * t.radius),
        D[e].progressBCanvas.beginPath(),
        D[e].progressBCanvas.arc(
          i,
          a,
          t.radius - parseInt(t.size, 0),
          (Math.PI / 180) * 270,
          (Math.PI / 180) * 630
        ),
        (D[e].progressBCanvas.strokeStyle = t.bgcolor),
        (D[e].progressBCanvas.lineWidth = parseInt(t.size, 0) - 1),
        D[e].progressBCanvas.stroke(),
        D[e].progressBCanvas.beginPath(),
        (D[e].progressBCanvas.strokeStyle = t.color),
        (D[e].progressBCanvas.lineWidth = parseInt(t.size, 0)),
        D[e].progressBCanvas.arc(
          i,
          a,
          t.radius - parseInt(t.size, 0),
          (Math.PI / 180) * 270,
          (Math.PI / 180) * (270 + D[e].progressBar.degree),
          "cw" !== t.style
        ),
        D[e].progressBCanvas.stroke();
    },
    x = function (e) {
      D[e].progressC == C && _(e),
        (D[e].loop = 0),
        D[e].stopAtSlide != C && -1 < D[e].stopAtSlide
          ? (D[e].lastslidetoshow = D[e].stopAtSlide)
          : (D[e].lastslidetoshow = 999),
        (D[e].stopLoop = !1),
        0 == D[e].looptogo && (D[e].stopLoop = !0),
        D[e].c.on("stoptimer", function () {
          D[e].progressC != C &&
            (D[e].progressC[0].tween.pause(),
            D[e].progressBar.disableProgressBar &&
              (D[e].progressC[0].style.visibility = "hidden"),
            (D[e].sliderstatus = "paused"),
            D[e].slideInSwapTimer || D.unToggleState(D[e].slidertoggledby),
            (D[e].slideInSwapTimer = !1));
        }),
        D[e].c.on("starttimer", function () {
          D[e].progressC == C ||
            D[e].forcepaused ||
            (1 != D[e].conthover &&
              1 != D[e].stopByVideo &&
              D[e].module.width > D[e].hideSliderAtLimit &&
              1 != D[e].tonpause &&
              1 != D[e].overnav &&
              1 != D[e].ssop &&
              (1 === D[e].noloopanymore ||
                (D[e].viewPort.enable && !D[e].inviewport) ||
                (D[e].progressBar.visibility[D[e].level] ||
                  (D[e].progressC[0].style.visibility = "visible"),
                D[e].progressC[0].tween.resume(),
                (D[e].sliderstatus = "playing"))),
            (!D[e].progressBar.disableProgressBar &&
              D[e].progressBar.visibility[D[e].level]) ||
              (D[e].progressC[0].style.visibility = "hidden"),
            D.toggleState(D[e].slidertoggledby));
        }),
        D[e].c.on("restarttimer", function () {
          if (
            !(
              (D[e].modal !== C &&
                D[e].modal.useAsModal &&
                "close" == D[e].modal.lastModalCall) ||
              D[e].progressC == C ||
              D[e].forcepaused
            )
          ) {
            if (
              D[e].mouseoncontainer &&
              "on" == D[e].navigation.onHoverStop &&
              !D.ISM
            )
              return !1;
            1 === D[e].noloopanymore ||
            (D[e].viewPort.enable && !D[e].inviewport) ||
            1 == D[e].ssop
              ? D.unToggleState(D[e].slidertoggledby)
              : (D[e].progressBar.visibility[D[e].level] ||
                  (D[e].progressC[0].style.visibility = "visible"),
                D[e].progressC[0].tween !== C && D[e].progressC[0].tween.kill(),
                (D[e].progressC[0].tween = t(e)),
                D[e].progressC[0].tween.play(),
                (D[e].sliderstatus = "playing"),
                D.toggleState(D[e].slidertoggledby)),
              (!D[e].progressBar.disableProgressBar &&
                D[e].progressBar.visibility[D[e].level]) ||
                (D[e].progressC[0].style.visibility = "hidden"),
              D[e].mouseoncontainer &&
                1 == D[e].navigation.onHoverStop &&
                !D.ISM &&
                (D[e].c.trigger("stoptimer"),
                D[e].c.trigger("revolution.slide.onpause"));
          }
        }),
        D[e].c.on("nulltimer", function () {
          D[e].progressC != C &&
            D[e].progressC[0] !== C &&
            (D[e].progressC[0].tween !== C && D[e].progressC[0].tween.kill(),
            (D[e].progressC[0].tween = t(e)),
            D[e].progressC[0].tween.pause(0),
            (!D[e].progressBar.disableProgressBar &&
              D[e].progressBar.visibility[D[e].level]) ||
              (D[e].progressC[0].style.visibility = "hidden"),
            (D[e].sliderstatus = "paused"));
        }),
        D[e].progressC !== C && (D[e].progressC[0].tween = t(e)),
        1 < D[e].slideamount &&
        (0 != D[e].stopAfterLoops || 1 != D[e].stopAtSlide)
          ? D[e].c.trigger("starttimer")
          : ((D[e].noloopanymore = 1), D[e].c.trigger("nulltimer")),
        D[e].c.on("tp-mouseenter", function () {
          (D[e].mouseoncontainer = !0),
            1 != D[e].navigation.onHoverStop ||
              D.ISM ||
              (D[e].c.trigger("stoptimer"),
              D[e].c.trigger("revolution.slide.onpause"));
        }),
        D[e].c.on("tp-mouseleft", function () {
          (D[e].mouseoncontainer = !1),
            1 != D[e].c.data("conthover") &&
              1 == D[e].navigation.onHoverStop &&
              ((1 == D[e].viewPort.enable && D[e].inviewport) ||
                0 == D[e].viewPort.enable) &&
              (D[e].c.trigger("revolution.slide.onresume"),
              D[e].c.trigger("starttimer"));
        });
    },
    N = function () {
      T("rs-module").each(function () {
        var e,
          t = this.id;
        (!D[t].inviewport && D[t].viewPort.enable) ||
          ((e =
            D[t].pr_active_slide !== C && D[t].pr_active_slide.data("key") !== C
              ? D[t].pr_active_slide.data("key")
              : D[t].pr_next_slide !== C && D[t].pr_next_slide.data("key") !== C
              ? D[t].pr_next_slide.data("key")
              : C) != C &&
            0 < D[t].sbgs[e].bgvid.length &&
            D[t].videos[D[t].sbgs[e].bgvid[0].id].loop &&
            ("visible" === document.visibilityState
              ? D.playVideo(D[t].sbgs[e].bgvid, t)
              : D.stopVideo(D[t].sbgs[e].bgvid, t)));
      });
    },
    j = function () {
      var e = document.documentMode === C,
        t = window.chrome;
      1 !== D.revslider_focus_blur_listener &&
        ((D.revslider_focus_blur_listener = 1),
        e && !t
          ? D.window
              .on("focusin", function () {
                !0 !== D.windowIsFocused && i(), (D.windowIsFocused = !0);
              })
              .on("focusout", function () {
                (!0 !== D.windowIsFocused && D.windowIsFocused !== C) || a(),
                  (D.windowIsFocused = !1);
              })
          : window.addEventListener
          ? (window.addEventListener(
              "focus",
              function (e) {
                !0 !== D.windowIsFocused && i(), (D.windowIsFocused = !0);
              },
              { capture: !1, passive: !0 }
            ),
            window.addEventListener(
              "blur",
              function (e) {
                (!0 !== D.windowIsFocused && D.windowIsFocused !== C) || a(),
                  (D.windowIsFocused = !1);
              },
              { capture: !1, passive: !0 }
            ))
          : (window.attachEvent("focus", function (e) {
              !0 !== D.windowIsFocused && i(), (D.windowIsFocused = !0);
            }),
            window.attachEvent("blur", function (e) {
              (!0 !== D.windowIsFocused && D.windowIsFocused !== C) || a(),
                (D.windowIsFocused = !1);
            })));
    },
    F = function (e) {
      for (
        var t,
          i = [],
          a = window.location.href
            .slice(window.location.href.indexOf(e) + 1)
            .split("_"),
          r = 0;
        r < a.length;
        r++
      )
        (a[r] = a[r].replace("%3D", "=")),
          (t = a[r].split("=")),
          i.push(t[0]),
          (i[t[0]] = t[1]);
      return i;
    },
    V = function (e) {
      if (D[e].blockSpacing !== C) {
        var t,
          i = D[e].blockSpacing.split(";");
        for (t in ((D[e].blockSpacing = {}), i))
          if (i.hasOwnProperty(t)) {
            var a = i[t].split(":");
            switch (a[0]) {
              case "t":
                D[e].blockSpacing.top = D.revToResp(a[1], 4, 0);
                break;
              case "b":
                D[e].blockSpacing.bottom = D.revToResp(a[1], 4, 0);
                break;
              case "l":
                D[e].blockSpacing.left = D.revToResp(a[1], 4, 0);
                break;
              case "r":
                D[e].blockSpacing.right = D.revToResp(a[1], 4, 0);
            }
          }
        (D[e].blockSpacing.block = T(
          D.closestClass(D[e].c[0], "wp-block-themepunch-revslider")
        )),
          D[e].level !== C &&
            D[e].blockSpacing !== C &&
            tpGS.gsap.set(D[e].blockSpacing.block, {
              paddingLeft: D[e].blockSpacing.left[D[e].level],
              paddingRight: D[e].blockSpacing.right[D[e].level],
              marginTop: D[e].blockSpacing.top[D[e].level],
              marginBottom: D[e].blockSpacing.bottom[D[e].level],
            });
      }
    },
    X = function (e) {
      return e.charAt(0).toUpperCase() + e.slice(1);
    },
    U = function (e) {
      var t,
        i = T.extend(
          !0,
          {
            DPR: "dpr",
            sliderType: "standard",
            sliderLayout: "auto",
            overlay: {
              type: "none",
              size: 1,
              colora: "transparent",
              colorb: "#000000",
            },
            duration: 9e3,
            imgCrossOrigin: "",
            modal: {
              useAsModal: !1,
              cover: !0,
              coverColor: "rgba(0,0,0,0.5)",
              horizontal: "center",
              vertical: "middle",
              coverSpeed: 1,
            },
            navigation: {
              keyboardNavigation: !1,
              keyboard_direction: "horizontal",
              mouseScrollNavigation: "off",
              wheelViewPort: 50,
              wheelCallDelay: "1000ms",
              onHoverStop: !0,
              mouseScrollReverse: "default",
              target: "window",
              threshold: 50,
              touch: {
                touchenabled: !1,
                touchOnDesktop: !1,
                swipe_treshold: 75,
                swipe_min_touches: 1,
                swipe_direction: "horizontal",
                drag_block_vertical: !1,
                mobileCarousel: !0,
                desktopCarousel: !0,
              },
              arrows: {
                style: "",
                enable: !1,
                hide_onmobile: !1,
                hide_under: 0,
                hide_onleave: !1,
                hide_delay: 200,
                hide_delay_mobile: 1200,
                hide_over: 9999,
                tmp: "",
                rtl: !1,
                left: {
                  h_align: "left",
                  v_align: "center",
                  h_offset: 20,
                  v_offset: 0,
                  container: "slider",
                },
                right: {
                  h_align: "right",
                  v_align: "center",
                  h_offset: 20,
                  v_offset: 0,
                  container: "slider",
                },
              },
              bullets: {
                enable: !1,
                hide_onmobile: !1,
                hide_onleave: !1,
                hide_delay: 200,
                hide_delay_mobile: 1200,
                hide_under: 0,
                hide_over: 9999,
                direction: "horizontal",
                h_align: "center",
                v_align: "bottom",
                space: 5,
                h_offset: 0,
                v_offset: 20,
                tmp: '<span class="tp-bullet-image"></span><span class="tp-bullet-title"></span>',
                container: "slider",
                rtl: !1,
                style: "",
              },
              thumbnails: {
                container: "slider",
                rtl: !1,
                style: "",
                enable: !1,
                width: 100,
                height: 50,
                min_width: 100,
                wrapper_padding: 2,
                wrapper_color: "transparent",
                tmp: '<span class="tp-thumb-image"></span><span class="tp-thumb-title"></span>',
                visibleAmount: 5,
                hide_onmobile: !1,
                hide_onleave: !1,
                hide_delay: 200,
                hide_delay_mobile: 1200,
                hide_under: 0,
                hide_over: 9999,
                direction: "horizontal",
                span: !1,
                position: "inner",
                space: 2,
                h_align: "center",
                v_align: "bottom",
                h_offset: 0,
                v_offset: 20,
                mhoff: 0,
                mvoff: 0,
              },
              tabs: {
                container: "slider",
                rtl: !1,
                style: "",
                enable: !1,
                width: 100,
                min_width: 100,
                height: 50,
                wrapper_padding: 10,
                wrapper_color: "transparent",
                tmp: '<span class="tp-tab-image"></span>',
                visibleAmount: 5,
                hide_onmobile: !1,
                hide_onleave: !1,
                hide_delay: 200,
                hide_delay_mobile: 1200,
                hide_under: 0,
                hide_over: 9999,
                direction: "horizontal",
                span: !1,
                space: 0,
                position: "inner",
                h_align: "center",
                v_align: "bottom",
                h_offset: 0,
                v_offset: 20,
                mhoff: 0,
                mvoff: 0,
              },
            },
            responsiveLevels: 4064,
            visibilityLevels: [2048, 1024, 778, 480],
            gridwidth: 960,
            gridheight: 500,
            minHeight: 0,
            maxHeight: 0,
            keepBPHeight: !1,
            useFullScreenHeight: !0,
            overflowHidden: !1,
            forceOverflow: !1,
            fixedOnTop: !1,
            autoHeight: !1,
            gridEQModule: !1,
            disableForceFullWidth: !1,
            fullScreenOffsetContainer: "",
            fullScreenOffset: "0",
            hideLayerAtLimit: 0,
            hideAllLayerAtLimit: 0,
            hideSliderAtLimit: 0,
            progressBar: {
              disableProgressBar: !1,
              style: "horizontal",
              size: "5px",
              radius: 10,
              vertical: "bottom",
              horizontal: "left",
              x: 0,
              y: 0,
              color: "rgba(255,255,255,0.5)",
              bgcolor: "transparent",
              basedon: "slide",
              gapsize: 0,
              reset: "reset",
              gaptype: "gapboth",
              gapcolor: "rgba(255,255,255,0.5)",
              ease: "none",
              visibility: { 0: !0, 1: !0, 2: !0, 3: !0 },
            },
            stopAtSlide: -1,
            stopAfterLoops: 0,
            shadow: 0,
            startDelay: 0,
            lazyType: "none",
            lazyOnBg: !1,
            spinner: "off",
            shuffle: !1,
            perspective: "600px",
            perspectiveType: "local",
            viewPort: {
              enable: !1,
              global: !1,
              globalDist: "-400px",
              outof: "wait",
              visible_area: "200px",
              presize: !1,
            },
            fallbacks: {
              isJoomla: !1,
              panZoomDisableOnMobile: !1,
              simplifyAll: !0,
              nextSlideOnWindowFocus: !1,
              disableFocusListener: !1,
              allowHTML5AutoPlayOnAndroid: !0,
            },
            fanim: !1,
            parallax: {
              type: "off",
              levels: [
                10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85,
              ],
              origo: "enterpoint",
              disable_onmobile: !1,
              ddd_shadow: !1,
              ddd_bgfreeze: !1,
              ddd_overflow: "visible",
              ddd_layer_overflow: "visible",
              ddd_z_correction: 65,
              speed: 400,
              speedbg: 0,
              speedls: 0,
            },
            scrolleffect: {
              set: !1,
              fade: !1,
              blur: !1,
              scale: !1,
              grayscale: !1,
              maxblur: 10,
              layers: !1,
              slide: !1,
              direction: "both",
              multiplicator: 1.35,
              multiplicator_layers: 0.5,
              tilt: 30,
              disable_onmobile: !1,
            },
            sbtimeline: {
              set: !1,
              fixed: !1,
              fixStart: 0,
              fixEnd: 0,
              layers: !1,
              slide: !1,
              ease: "none",
              speed: 500,
            },
            carousel: {
              orientation: "h",
              prevNextVis: "50px",
              easing: "power3.inOut",
              speed: 800,
              showLayersAllTime: !1,
              horizontal_align: "center",
              vertical_align: "center",
              snap: !0,
              infinity: !1,
              stopOnClick: !0,
              space: 0,
              maxVisibleItems: 3,
              stretch: !1,
              fadeout: !0,
              maxRotation: 0,
              maxOpacity: 100,
              minScale: 0,
              offsetScale: !1,
              vary_fade: !1,
              vary_rotation: !1,
              vary_scale: !1,
              border_radius: "0px",
              padding_top: 0,
              padding_bottom: 0,
              skewX: 0,
              skewY: 0,
              spin: "off",
              spinAngle: 0,
              overshoot: !1,
            },
            observeWrap: !1,
            extensions: "extensions/",
            extensions_suffix: ".min.js",
            stopLoop: !1,
            waitForInit: !1,
            ignoreHeightChange: !0,
            onedpronmobile: !1,
          },
          e
        );
      for (t in ((i.minHeight =
        i.minHeight === C ||
        "none" === i.minHeight ||
        "0" === i.minHeight ||
        "0px" === i.minHeight ||
        "" == i.minHeight ||
        " " == i.minHeight
          ? 0
          : parseInt(i.minHeight, 0)),
      (i.maxHeight =
        "none" === i.maxHeight || "0" === i.maxHeight
          ? 0
          : parseInt(i.maxHeight, 0)),
      (i.carousel.maxVisibleItems =
        i.carousel.maxVisibleItems < 1 ? 999 : i.carousel.maxVisibleItems),
      (i.carousel.vertical_align =
        "top" === i.carousel.vertical_align
          ? "0%"
          : "bottom" === i.carousel.vertical_align
          ? "100%"
          : "50%"),
      (i.carousel.space = parseInt(i.carousel.space, 0)),
      (i.carousel.maxOpacity = parseInt(i.carousel.maxOpacity, 0)),
      (i.carousel.maxOpacity =
        1 < i.carousel.maxOpacity
          ? i.carousel.maxOpacity / 100
          : i.carousel.maxOpacity),
      (i.carousel.showLayersAllTime =
        "true" === i.carousel.showLayersAllTime ||
        !0 === i.carousel.showLayersAllTime
          ? "all"
          : i.carousel.showLayersAllTime),
      (i.carousel.maxRotation = parseInt(i.carousel.maxRotation, 0)),
      (i.carousel.minScale = parseInt(i.carousel.minScale, 0)),
      (i.carousel.minScale =
        0.9 < i.carousel.minScale
          ? i.carousel.minScale / 100
          : i.carousel.minScale),
      (i.carousel.speed = parseInt(i.carousel.speed, 0)),
      (i.carousel.skewX = parseFloat(i.carousel.skewX)),
      (i.carousel.skewY = parseFloat(i.carousel.skewY)),
      (i.carousel.spinAngle = parseFloat(i.carousel.spinAngle)),
      0 === i.carousel.spinAngle && (i.carousel.spinAngle = 1),
      "v" === i.carousel.orientation && (i.carousel.justify = !1),
      (i.navigation.maintypes = ["arrows", "tabs", "thumbnails", "bullets"]),
      (i.perspective = parseInt(i.perspective, 0)),
      i.navigation.maintypes))
        i.navigation.maintypes.hasOwnProperty(t) &&
          i.navigation[i.navigation.maintypes[t]] !== C &&
          ((i.navigation[i.navigation.maintypes[t]].animDelay =
            i.navigation[i.navigation.maintypes[t]].animDelay === C
              ? 1e3
              : i.navigation[i.navigation.maintypes[t]].animDelay),
          (i.navigation[i.navigation.maintypes[t]].animSpeed =
            i.navigation[i.navigation.maintypes[t]].animSpeed === C
              ? 1e3
              : i.navigation[i.navigation.maintypes[t]].animSpeed),
          (i.navigation[i.navigation.maintypes[t]].animDelay =
            parseInt(i.navigation[i.navigation.maintypes[t]].animDelay, 0) /
            1e3),
          (i.navigation[i.navigation.maintypes[t]].animSpeed =
            parseInt(i.navigation[i.navigation.maintypes[t]].animSpeed, 0) /
            1e3));
      if (
        (D.isNumeric(i.scrolleffect.tilt) ||
          (-1 !== i.scrolleffect.tilt.indexOf("%") &&
            (i.scrolleffect.tilt = parseInt(i.scrolleffect.tilt))),
        (i.scrolleffect.tilt = i.scrolleffect.tilt / 100),
        (i.navigation.thumbnails.position =
          "outer-horizontal" == i.navigation.thumbnails.position
            ? "bottom" == i.navigation.thumbnails.v_align
              ? "outer-bottom"
              : "outer-top"
            : "outer-vertical" == i.navigation.thumbnails.position
            ? "left" == i.navigation.thumbnails.h_align
              ? "outer-left"
              : "outer-right"
            : i.navigation.thumbnails.position),
        (i.navigation.tabs.position =
          "outer-horizontal" == i.navigation.tabs.position
            ? "bottom" == i.navigation.tabs.v_align
              ? "outer-bottom"
              : "outer-top"
            : "outer-vertical" == i.navigation.tabs.position
            ? "left" == i.navigation.tabs.h_align
              ? "outer-left"
              : "outer-right"
            : i.navigation.tabs.position),
        (i.sbtimeline.speed = parseInt(i.sbtimeline.speed, 0) / 1e3 || 0.5),
        !0 === i.sbtimeline.set &&
        !0 === i.sbtimeline.fixed &&
        "auto" !== i.sliderLayout
          ? ((i.sbtimeline.fixStart = parseInt(i.sbtimeline.fixStart)),
            (i.sbtimeline.fixEnd = parseInt(i.sbtimeline.fixEnd)))
          : (i.sbtimeline.fixed = !1),
        i.progressBar === C ||
          ("true" != i.progressBar.disableProgressBar &&
            1 != i.progressBar.disableProgressBar) ||
          (i.progressBar.disableProgressBar = !0),
        (i.startDelay = parseInt(i.startDelay, 0) || 0),
        i.navigation !== C &&
          i.navigation.arrows != C &&
          i.navigation.arrows.hide_under != C &&
          (i.navigation.arrows.hide_under = parseInt(
            i.navigation.arrows.hide_under
          )),
        i.navigation !== C &&
          i.navigation.bullets != C &&
          i.navigation.bullets.hide_under != C &&
          (i.navigation.bullets.hide_under = parseInt(
            i.navigation.bullets.hide_under
          )),
        i.navigation !== C &&
          i.navigation.thumbnails != C &&
          i.navigation.thumbnails.hide_under != C &&
          (i.navigation.thumbnails.hide_under = parseInt(
            i.navigation.thumbnails.hide_under
          )),
        i.navigation !== C &&
          i.navigation.tabs != C &&
          i.navigation.tabs.hide_under != C &&
          (i.navigation.tabs.hide_under = parseInt(
            i.navigation.tabs.hide_under
          )),
        i.navigation !== C &&
          i.navigation.arrows != C &&
          i.navigation.arrows.hide_over != C &&
          (i.navigation.arrows.hide_over = parseInt(
            i.navigation.arrows.hide_over
          )),
        i.navigation !== C &&
          i.navigation.bullets != C &&
          i.navigation.bullets.hide_over != C &&
          (i.navigation.bullets.hide_over = parseInt(
            i.navigation.bullets.hide_over
          )),
        i.navigation !== C &&
          i.navigation.thumbnails != C &&
          i.navigation.thumbnails.hide_over != C &&
          (i.navigation.thumbnails.hide_over = parseInt(
            i.navigation.thumbnails.hide_over
          )),
        i.navigation !== C &&
          i.navigation.tabs != C &&
          i.navigation.tabs.hide_over != C &&
          (i.navigation.tabs.hide_over = parseInt(i.navigation.tabs.hide_over)),
        i.lazyloaddata !== C &&
          0 < i.lazyloaddata.length &&
          0 < i.lazyloaddata.indexOf("-"))
      ) {
        var a = i.lazyloaddata.split("-");
        i.lazyloaddata = a[0];
        for (t = 1; t < a.length; t++) i.lazyloaddata += X(a[t]);
      }
      return (
        (i.duration = parseInt(i.duration)),
        "single" === i.lazyType &&
          "carousel" === i.sliderType &&
          (i.lazyType = "smart"),
        "carousel" === i.sliderType &&
          i.carousel.justify &&
          ((i.justifyCarousel = !0), (i.keepBPHeight = !0)),
        (i.enableUpscaling =
          1 == i.enableUpscaling &&
          "carousel" !== i.sliderType &&
          "fullwidth" === i.sliderLayout),
        (i.useFullScreenHeight =
          "carousel" === i.sliderType &&
          "fullscreen" === i.sliderLayout &&
          !0 === i.useFullScreenHeight &&
          "v" !== i.carousel.orientation),
        (i.progressBar.y = parseInt(i.progressBar.y, 0)),
        (i.progressBar.x = parseInt(i.progressBar.x, 0)),
        "IE" !== window.RSBrowser &&
          i.customEases !== C &&
          ((!i.customEases.SFXBounceLite &&
            "true" != i.customEases.SFXBounceLite) ||
            tpGS.SFXBounceLite !== C ||
            (tpGS.SFXBounceLite = tpGS.CustomBounce.create("SFXBounceLite", {
              strength: 0.3,
              squash: 1,
              squashID: "SFXBounceLite-squash",
            })),
          (!i.customEases.SFXBounceSolid &&
            "true" != i.customEases.SFXBounceSolid) ||
            tpGS.SFXBounceSolid !== C ||
            (tpGS.SFXBounceSolid = tpGS.CustomBounce.create("SFXBounceSolid", {
              strength: 0.5,
              squash: 2,
              squashID: "SFXBounceSolid-squash",
            })),
          (!i.customEases.SFXBounceStrong &&
            "true" != i.customEases.SFXBounceStrong) ||
            tpGS.SFXBounceStrong !== C ||
            (tpGS.SFXBounceStrong = tpGS.CustomBounce.create(
              "SFXBounceStrong",
              { strength: 0.7, squash: 3, squashID: "SFXBounceStrong-squash" }
            )),
          (!i.customEases.SFXBounceExtrem &&
            "true" != i.customEases.SFXBounceExtrem) ||
            tpGS.SFXBounceExtrem !== C ||
            (tpGS.SFXBounceExtrem = tpGS.CustomBounce.create(
              "SFXBounceExtrem",
              { strength: 0.9, squash: 4, squashID: "SFXBounceExtrem-squash" }
            )),
          (!i.customEases.BounceLite && "true" != i.customEases.BounceLite) ||
            tpGS.BounceLite !== C ||
            (tpGS.BounceLite = tpGS.CustomBounce.create("BounceLite", {
              strength: 0.3,
            })),
          (!i.customEases.BounceSolid && "true" != i.customEases.BounceSolid) ||
            tpGS.BounceSolid !== C ||
            (tpGS.BounceSolid = tpGS.CustomBounce.create("BounceSolid", {
              strength: 0.5,
            })),
          (!i.customEases.BounceStrong &&
            "true" != i.customEases.BounceStrong) ||
            tpGS.BounceStrong !== C ||
            (tpGS.BounceStrong = tpGS.CustomBounce.create("BounceStrong", {
              strength: 0.7,
            })),
          (!i.customEases.BounceExtrem &&
            "true" != i.customEases.BounceExtrem) ||
            tpGS.BounceExtrem !== C ||
            (tpGS.BounceExtrem = tpGS.CustomBounce.create("BounceExtrem", {
              strength: 0.9,
            }))),
        (i.modal.coverSpeed = parseFloat(i.modal.coverSpeed)),
        (i.modal.coverSpeed =
          200 < i.modal.coverSpeed
            ? i.modal.coverSpeed / 1e3
            : i.modal.coverSpeed),
        (i.modal.coverSpeed = Math.max(Math.min(3, i.modal.coverSpeed), 0.3)),
        (i.navigation.wheelViewPort =
          i.navigation.wheelViewPort === C
            ? 0.5
            : i.navigation.wheelViewPort / 100),
        (i.navigation.wheelCallDelay =
          i.navigation.wheelCallDelay === C
            ? 1e3
            : parseInt(i.navigation.wheelCallDelay)),
        (i.autoDPR = "string" == typeof i.DPR && -1 !== i.DPR.indexOf("ax")),
        (i.DPR = i.DPR.replace("ax", "")),
        (i.DPR = parseInt(i.DPR.replace("x", ""))),
        (i.DPR = isNaN(i.DPR)
          ? window.devicePixelRatio
          : i.autoDPR
          ? Math.min(window.devicePixelRatio, i.DPR)
          : i.DPR),
        (i.DPR =
          (1 != i.onedpronmobile && "true" != i.onedpronmobile) || !D.ISM
            ? i.DPR
            : 1),
        !1 === i.viewPort.global
          ? (i.viewPort.enable = !1)
          : !0 === i.viewPort.global &&
            ((i.viewPort.local = i.viewPort.enable), (i.viewPort.enable = !0)),
        i.carousel !== C &&
          "v" == i.carousel.orientation &&
          ((i.carousel.prevNextVisType = ("" + i.carousel.prevNextVis).includes(
            "%"
          )
            ? "%"
            : "px"),
          (i.carousel.prevNextVis =
            parseInt(i.carousel.prevNextVis, 0) /
            ("%" == i.carousel.prevNextVisType ? 100 : 1))),
        i
      );
    },
    k =
      ((window.RS_MODULES = window.RS_MODULES || {}),
      (window.RS_MODULES.waiting = window.RS_MODULES.waiting || []),
      [
        "DOM",
        "main",
        "parallax",
        "video",
        "slideanims",
        "actions",
        "layeranimation",
        "navigation",
        "carousel",
        "panzoom",
      ]);
  for (e in k)
    -1 == window.RS_MODULES.waiting.indexOf(k[e]) &&
      window.RS_MODULES.waiting.push(k[e]);
  function O(e) {
    window.elementorFrontend !== C &&
      elementorFrontend.hooks !== C &&
      elementorFrontend.hooks.removeAction("frontend/element_ready/global", O),
      (window.RS_MODULES.elementor = { loaded: !0, version: "6.5.0" }),
      window.RS_MODULES.checkMinimal && window.RS_MODULES.checkMinimal();
  }
  function R() {
    if (
      window.elementorFrontend === C ||
      window.elementorFrontend.hooks === C ||
      window.elementorFrontend.hooks.addAction === C
    )
      return (
        window.RS_MODULES.elementorCounter++,
        window.RS_MODULES.elementorCounterCheck &&
        20 < window.RS_MODULES.elementorCounter
          ? void O()
          : void requestAnimationFrame(R)
      );
    window.elementorFrontend.config.environmentMode.edit
      ? elementorFrontend.hooks.addAction("frontend/element_ready/widget", O)
      : O();
  }
  function L() {
    1 != RS_MODULES.checkElementorCalled &&
      ((RS_MODULES.checkElementorCalled = !0), document.body) &&
      (0 <= document.body.className.indexOf("elementor-page") ||
        0 <= document.body.className.indexOf("elementor-default")) &&
      ((window.RS_MODULES.waiting =
        window.RS_MODULES.waiting === C ? [] : window.RS_MODULES.waiting),
      -1 == window.RS_MODULES.waiting.indexOf("elementor") &&
        window.RS_MODULES.waiting.push("elementor"),
      document.body &&
        -1 == document.body.className.indexOf("elementor-editor-active") &&
        (window.RS_MODULES.elementorCounterCheck = !0),
      (window.RS_MODULES.elementorCounter = 0),
      R());
  }
  (window.RS_MODULES.main = { loaded: !0, version: o }),
    (window.RS_MODULES.minimal = !1),
    (window.RS_MODULES.callSliders = function () {
      for (var e in RS_MODULES.modules)
        !0 !== RS_MODULES.modules[e].once &&
          window.RS_MODULES !== C &&
          window.RS_MODULES.minimal &&
          ((RS_MODULES.modules[e].once = !0), RS_MODULES.modules[e].init());
    }),
    "loading" === document.readyState
      ? document.addEventListener("readystatechange", function () {
          ("interactive" !== document.readyState &&
            "complete" !== document.readyState) ||
            (L(),
            (window.RS_MODULES.DOM = { loaded: !0 }),
            window.RS_MODULES.checkMinimal());
        })
      : ("complete" !== document.readyState &&
          "interactive" !== document.readyState) ||
        (L(), (window.RS_MODULES.DOM = { loaded: !0 })),
    (window.RS_MODULES.checkMinimal = function () {
      if (0 == window.RS_MODULES.minimal) {
        var e =
          1 == window.RS_MODULES.minimal ||
          (window.RS_MODULES.waiting !== C &&
            T.fn.revolution !== C &&
            window.tpGS !== C &&
            window.tpGS.gsap !== C);
        if (e)
          for (var t in window.RS_MODULES.waiting)
            window.RS_MODULES.waiting.hasOwnProperty(t) &&
              "function" != typeof window.RS_MODULES.waiting[t] &&
              e &&
              window.RS_MODULES[window.RS_MODULES.waiting[t]] === C &&
              (e = !1);
        e &&
          (!0 !== window.RS_MODULES.minimal &&
            T(document).trigger("REVSLIDER_READY_TO_USE"),
          (window.RS_MODULES.minimal = !0));
      } else window.RS_MODULES.minimal = !0;
      !0 === window.RS_MODULES.minimal && window.RS_MODULES.callSliders();
    }),
    window.RS_MODULES.checkMinimal();
})(jQuery),
  !(function ($, undefined) {
    "use strict";
    var version = "6.6.0",
      _R =
        ((jQuery.fn.revolution = jQuery.fn.revolution || {}),
        jQuery.fn.revolution),
      moduleEnterLeaveActions =
        (jQuery.extend(!0, _R, {
          checkActions: function (e, t) {
            e === undefined
              ? moduleEnterLeaveActions(t)
              : checkActions_intern(e, t);
          },
          delayer: function (e, t, i) {
            _R[e].timeStamps =
              _R[e].timeStamps === undefined ? {} : _R[e].timeStamps;
            var a = new Date().getTime(),
              r =
                _R[e].timeStamps[i] === undefined
                  ? parseInt(t) + 100
                  : a - _R[e].timeStamps[i],
              r = parseInt(r) > t;
            return r && (_R[e].timeStamps[i] = a), r;
          },
          getURLDetails: function (e) {
            ((e = e === undefined ? {} : e).url =
              e.url === undefined ? window.location.href : e.url),
              (e.url = e.url.replace("www", "")),
              (e.protocol =
                0 === e.url.indexOf("http://")
                  ? "http://"
                  : 0 === e.url.indexOf("https://")
                  ? "https://"
                  : 0 === e.url.indexOf("//")
                  ? "//"
                  : "relative");
            var t = (t = e.url.replace("https://", "")).replace("http://", ""),
              t =
                ((t = (t =
                  "relative" === e.protocol ? t.replace("//", "") : t).split(
                  "#"
                )),
                (e.anchor =
                  (e.anchor === undefined ||
                    "" == e.anchor ||
                    0 == e.anchor.length) &&
                  1 < t.length
                    ? t[1]
                    : e.anchor === undefined
                    ? ""
                    : e.anchor.replace("#", "")),
                (e.anchor = e.anchor.split("?")),
                (e.queries = t[0].split("?")),
                (e.queries = 1 < e.queries.length ? e.queries[1] : ""),
                (e.queries =
                  1 < e.queries.length
                    ? e.queries[1]
                    : 1 < e.anchor.length
                    ? e.anchor[1]
                    : e.queries),
                (e.anchor = e.anchor[0]),
                (t = t[0]).split("/"),
                t.split("/"));
            return (
              (e.host = t[0]),
              t.splice(0, 1),
              (e.path = "/" + t.join("/")),
              "/" == e.path[e.path.length - 1] &&
                (e.path = e.path.slice(0, -1)),
              (e.origin =
                "relative" !== e.protocol
                  ? e.protocol + e.host
                  : window.location.origin.replace("www", "") +
                    window.location.pathname),
              (e.hash =
                ("" !== e.queries && e.queries !== undefined
                  ? "?" + e.queries
                  : "") +
                ("" !== e.anchor && e.anchor !== undefined
                  ? "#" + e.anchor
                  : "")),
              e
            );
          },
          scrollToId: function (e) {
            var t, i;
            (_R.scrollToObj = e),
              window.isSafari11 ||
                ((t = tpGS.gsap.getProperty("html", "scrollBehavior")),
                (i = tpGS.gsap.getProperty("body", "scrollBehavior")),
                tpGS.gsap.set("html,body", { scrollBehavior: "auto" }),
                (e.scrollBehaviorHtml = t),
                (e.scrollBehaviorBody = i)),
              _R.calcScrollToId();
          },
          calcScrollToId: function () {
            var e, t, i, a, r;
            _R.scrollToObj &&
              ((t =
                (e = _R.scrollToObj).tween && e.tween.progress
                  ? e.tween.progress()
                  : 0),
              e.tween && e.tween.kill && e.tween.kill(),
              (e.startScrollPos !== undefined && null !== e.startScrollPos) ||
                (e.startScrollPos = (
                  _R[e.id].modal.useAsModal ? _R[e.id].cpar : _R.document
                ).scrollTop()),
              (i =
                "scrollbelow" === e.action
                  ? (getOffContH(_R[e.id].fullScreenOffsetContainer) || 0) -
                      (parseInt(e.offset, 0) || 0) || 0
                  : 0 - (parseInt(e.offset, 0) || 0)),
              (a =
                0 <
                (a =
                  "scrollbelow" === e.action
                    ? _R[e.id].c
                    : jQuery("#" + e.anchor)).length
                  ? a.offset().top
                  : 0),
              (r = {
                _y: _R[e.id].modal.useAsModal
                  ? _R[e.id].cpar[0].scrollTop
                  : window.pageYOffset === document.documentElement.scrollTop ||
                    0 !== window.pageYOffset
                  ? window.pageYOffset
                  : document.documentElement.scrollTop,
              }),
              (a +=
                "scrollbelow" === e.action
                  ? _R[e.id].sbtimeline.fixed
                    ? _R[e.id].cpar.parent().height() +
                      _R[e.id].fullScreenOffsetResult
                    : jQuery(_R[e.id].slides[0]).height()
                  : 0),
              (e.tween = tpGS.gsap.fromTo(
                r,
                e.speed / 1e3,
                { _y: e.startScrollPos },
                {
                  _y: a - i,
                  ease: e.ease,
                  onUpdate: function () {
                    (_R[e.id].modal.useAsModal
                      ? _R[e.id].cpar
                      : _R.document
                    ).scrollTop(r._y);
                  },
                  onComplete: function () {
                    e.hash !== undefined &&
                      history.pushState(null, null, e.hash),
                      window.isSafari11 ||
                        (tpGS.gsap.set("html", {
                          scrollBehavior: e.scrollBehaviorHtml,
                        }),
                        tpGS.gsap.set("body", {
                          scrollBehavior: e.scrollBehaviorBody,
                        })),
                      _R.scrollToObj &&
                        (_R.scrollToObj.tween &&
                          (_R.scrollToObj.tween.kill(),
                          (_R.scrollToObj.tween = null)),
                        (_R.scrollToObj.startScrollPos = null),
                        (_R.scrollToObj = null));
                  },
                }
              )),
              e.tween.progress(t));
          },
        }),
        function (i) {
          !_R[i].moduleActionsPrepared &&
            0 < _R[i].c[0].getElementsByClassName("rs-on-sh").length &&
            (_R[i].c.on("tp-mouseenter", function () {
              _R[i].mouseoncontainer = !0;
              var e,
                t =
                  _R[i].pr_next_key !== undefined
                    ? _R[i].pr_next_key
                    : _R[i].pr_processing_key !== undefined
                    ? _R[i].pr_processing_key
                    : _R[i].pr_active_key !== undefined
                    ? _R[i].pr_active_key
                    : _R[i].pr_next_key;
              if ("none" !== t && t !== undefined) {
                if (
                  (t = _R.gA(_R[i].slides[t], "key")) !== undefined &&
                  _R[i].layers[t]
                )
                  for (e in _R[i].layers[t])
                    0 <= _R[i].layers[t][e].className.indexOf("rs-on-sh") &&
                      _R.renderLayerAnimation({
                        layer: jQuery(_R[i].layers[t][e]),
                        frame: "frame_1",
                        mode: "trigger",
                        id: i,
                      });
                for (e in _R[i].layers.static)
                  0 <= _R[i].layers.static[e].className.indexOf("rs-on-sh") &&
                    _R.renderLayerAnimation({
                      layer: jQuery(_R[i].layers.static[e]),
                      frame: "frame_1",
                      mode: "trigger",
                      id: i,
                    });
              }
            }),
            _R[i].c.on("tp-mouseleft", function () {
              _R[i].mouseoncontainer = !0;
              var e,
                t =
                  _R[i].pr_next_key !== undefined
                    ? _R[i].pr_next_key
                    : _R[i].pr_processing_key !== undefined
                    ? _R[i].pr_processing_key
                    : _R[i].pr_active_key !== undefined
                    ? _R[i].pr_active_key
                    : _R[i].pr_next_key;
              if ("none" !== t && t !== undefined) {
                if (
                  (t = _R.gA(_R[i].slides[t], "key")) !== undefined &&
                  _R[i].layers[t]
                )
                  for (e in _R[i].layers[t])
                    0 <= _R[i].layers[t][e].className.indexOf("rs-on-sh") &&
                      _R.renderLayerAnimation({
                        layer: jQuery(_R[i].layers[t][e]),
                        frame: "frame_999",
                        mode: "trigger",
                        id: i,
                      });
                for (e in _R[i].layers.static)
                  0 <= _R[i].layers.static[e].className.indexOf("rs-on-sh") &&
                    _R.renderLayerAnimation({
                      layer: jQuery(_R[i].layers.static[e]),
                      frame: "frame_999",
                      mode: "trigger",
                      id: i,
                    });
              }
            })),
            (_R[i].moduleActionsPrepared = !0);
        }),
      checkActions_intern = function (layer, id) {
        var actions = _R.gA(layer[0], "actions"),
          wrap,
          _L =
            ("RS-COLUMN" == layer[0].tagName &&
              ((wrap = _R.closestNode(layer[0], "RS-COLUMN-WRAP")),
              null !== wrap) &&
              wrap !== undefined &&
              (_R.sA(wrap, "action", actions), (layer = jQuery(wrap))),
            layer.data()),
          ei,
          actions = actions.split("||");
        for (ei in (layer.addClass("rs-waction"),
        (_L.events = _L.events === undefined ? [] : _L.events),
        actions))
          if (actions.hasOwnProperty(ei)) {
            var event = getEventParams(actions[ei].split(";")),
              targetlayer =
                (_L.events.push(event),
                "click" === event.on &&
                  layer[0].classList.add("rs-wclickaction"),
                _R[id].fullscreen_esclistener ||
                  ("exitfullscreen" != event.action &&
                    "togglefullscreen" != event.action) ||
                  (_R.document.keyup(function (e) {
                    27 == e.keyCode &&
                      0 < jQuery("#rs-go-fullscreen").length &&
                      layer.trigger(event.on);
                  }),
                  (_R[id].fullscreen_esclistener = !0)),
                "backgroundvideo" == event.layer
                  ? jQuery("rs-bgvideo")
                  : "firstvideo" == event.layer
                  ? jQuery("rs-slide").find(".rs-layer-video")
                  : jQuery("#" + event.layer));
            switch (
              (-1 !=
                jQuery.inArray(event.action, [
                  "toggleslider",
                  "toggle_mute_video",
                  "toggle_global_mute_video",
                  "togglefullscreen",
                ]) && (_L._togglelisteners = !0),
              event.action)
            ) {
              case "togglevideo":
                jQuery.each(targetlayer, function () {
                  updateToggleByList(
                    jQuery(this),
                    "videotoggledby",
                    layer[0].id
                  );
                });
                break;
              case "togglelayer":
                jQuery.each(targetlayer, function () {
                  updateToggleByList(
                    jQuery(this),
                    "layertoggledby",
                    layer[0].id
                  ),
                    jQuery(this).data(
                      "triggered_startstatus",
                      event.togglestate
                    );
                });
                break;
              case "toggle_global_mute_video":
              case "toggle_mute_video":
                jQuery.each(targetlayer, function () {
                  updateToggleByList(
                    jQuery(this),
                    "videomutetoggledby",
                    layer[0].id
                  );
                });
                break;
              case "toggleslider":
                _R[id].slidertoggledby == undefined &&
                  (_R[id].slidertoggledby = []),
                  _R[id].slidertoggledby.push(layer[0].id);
                break;
              case "togglefullscreen":
                _R[id].fullscreentoggledby == undefined &&
                  (_R[id].fullscreentoggledby = []),
                  _R[id].fullscreentoggledby.push(layer[0].id);
            }
          }
        (_R[id].actionsPrepared = !0),
          (_R[id].actionListenerHook =
            _R[id].actionListenerHook == undefined
              ? { _on: "" }
              : _R[id].actionListenerHook),
          layer.on(
            "click mouseenter mouseleave " + _R[id].actionListenerHook._on,
            function (e) {
              for (var i in _L.events)
                if (
                  _L.events.hasOwnProperty(i) &&
                  _L.events[i].on.includes(e.type)
                ) {
                  var event = _L.events[i];
                  if (
                    !(event.repeat !== undefined && 0 < event.repeat) ||
                    _R.delayer(
                      id,
                      1e3 * event.repeat,
                      _L.c[0].id + "_" + event.action
                    )
                  ) {
                    if (
                      "click" === event.on &&
                      layer.hasClass("tp-temporarydisabled")
                    )
                      return !1;
                    ("" + event.layer).includes("layer-sta_") &&
                      ((_R[id].staticPrefix =
                        _R[id].staticPrefix ||
                        Object.keys(_R[id].layers.static)[0]),
                      ("" + _R[id].staticPrefix).includes("layer-")) &&
                      (event.layer =
                        _R[id].staticPrefix.split("layer-")[0] +
                        "layer-" +
                        event.layer.split("layer-sta_")[1]);
                    var targetlayer =
                        "backgroundvideo" == event.layer
                          ? jQuery(_R[id].slides[_R[id].pr_active_key]).find(
                              "rs-sbg-wrap rs-bgvideo"
                            )
                          : "firstvideo" == event.layer
                          ? jQuery(_R[id].slides[_R[id].pr_active_key])
                              .find(".rs-layer-video")
                              .first()
                          : jQuery("#" + event.layer),
                      tex = 0 < targetlayer.length;
                    if (
                      "" != _R[id].actionListenerHook._on &&
                      "click" !== e.type &&
                      "mouseenter" !== e.type &&
                      "mouseleave" !== e.type
                    ) {
                      var keepgoing = !0,
                        cbs;
                      for (cbs in _R[id].actionListenerHook.callBacks) {
                        if (!0 !== keepgoing) break;
                        _R[id].actionListenerHook.callBacks.hasOwnProperty(
                          cbs
                        ) &&
                          "function" ==
                            typeof _R[id].actionListenerHook.callBacks[cbs] &&
                          (keepgoing = _R[id].actionListenerHook.callBacks[cbs](
                            {
                              event: event,
                              layer: layer,
                              targetlayer: targetlayer,
                              L: _L,
                            }
                          ));
                      }
                      if (!keepgoing) continue;
                    }
                    switch (event.action) {
                      case "menulink":
                        var linkto = _R.getURLDetails({
                            url: event.url,
                            anchor: event.anchor,
                          }),
                          linkfrom = _R.getURLDetails();
                        linkto.host == linkfrom.host &&
                        linkto.path == linkfrom.path &&
                        "_self" === event.target
                          ? _R.scrollToId({
                              id: id,
                              offset: event.offset,
                              action: event.action,
                              anchor: event.anchor,
                              hash: linkto.hash,
                              speed: event.speed,
                              ease: event.ease,
                            })
                          : "_self" === event.target
                          ? (window.location =
                              linkto.url +
                              (linkto.anchor !== undefined &&
                              "" !== linkto.anchor
                                ? "#" + linkto.anchor
                                : ""))
                          : window.open(
                              linkto.url +
                                (linkto.anchor !== undefined &&
                                "" !== linkto.anchor
                                  ? "#" + linkto.anchor
                                  : "")
                            ),
                          e.preventDefault();
                        break;
                      case "getAccelerationPermission":
                        _R.getAccelerationPermission(id);
                        break;
                      case "nextframe":
                      case "prevframe":
                      case "gotoframe":
                      case "togglelayer":
                      case "toggleframes":
                      case "startlayer":
                      case "stoplayer":
                        if (targetlayer[0] !== undefined) {
                          var _ = _R[id]._L[targetlayer[0].id],
                            frame = event.frame,
                            tou = "triggerdelay";
                          if (
                            "click" === e.type &&
                            _.clicked_time_stamp !== undefined &&
                            new Date().getTime() - _.clicked_time_stamp < 300
                          )
                            return;
                          if (
                            "mouseenter" === e.type &&
                            _.mouseentered_time_stamp !== undefined &&
                            new Date().getTime() - _.mouseentered_time_stamp <
                              300
                          )
                            return;
                          if (
                            (clearTimeout(_.triggerdelayIn),
                            clearTimeout(_.triggerdelayOut),
                            clearTimeout(_.triggerdelay),
                            "click" === e.type &&
                              (_.clicked_time_stamp = new Date().getTime()),
                            "mouseenter" === e.type &&
                              (_.mouseentered_time_stamp =
                                new Date().getTime()),
                            "mouseleave" === e.type &&
                              (_.mouseentered_time_stamp = undefined),
                            "nextframe" === event.action ||
                              "prevframe" === event.action)
                          ) {
                            _.forda =
                              _.forda === undefined
                                ? getFordWithAction(_)
                                : _.forda;
                            var inx = jQuery.inArray(_.currentframe, _.ford);
                            for (
                              "nextframe" === event.action && inx++,
                                "prevframe" === event.action && inx--;
                              "skip" !== _.forda[inx] &&
                              0 < inx &&
                              inx < _.forda.length - 1;

                            )
                              "nextframe" === event.action && inx++,
                                "prevframe" === event.action && inx--,
                                (inx = Math.min(
                                  Math.max(0, inx),
                                  _.forda.length - 1
                                ));
                            frame = _.ford[inx];
                          }
                          0 <=
                            jQuery.inArray(event.action, [
                              "toggleframes",
                              "togglelayer",
                              "startlayer",
                              "stoplayer",
                            ]) &&
                            ((_.triggeredstate =
                              "startlayer" === event.action ||
                              ("togglelayer" === event.action &&
                                "frame_1" !== _.currentframe) ||
                              ("toggleframes" === event.action &&
                                _.currentframe !== event.frameN)),
                            "togglelayer" === event.action &&
                              !0 === _.triggeredstate &&
                              _.currentframe !== undefined &&
                              "frame_999" !== _.currentframe &&
                              (_.triggeredstate = !1),
                            (frame = _.triggeredstate
                              ? "toggleframes" === event.action
                                ? event.frameN
                                : "frame_1"
                              : "toggleframes" === event.action
                              ? event.frameM
                              : "frame_999"),
                            (tou = _.triggeredstate
                              ? "triggerdelayIn"
                              : "triggerdelayOut"),
                            _.triggeredstate
                              ? _R.toggleState(_.layertoggledby)
                              : (_R.stopVideo && _R.stopVideo(targetlayer, id),
                                _R.unToggleState(_.layertoggledby)));
                          var pars = {
                            layer: targetlayer,
                            frame: frame,
                            mode: "trigger",
                            id: id,
                          };
                          !0 === event.children &&
                            ((pars.updateChildren = !0),
                            (pars.fastforward = !0)),
                            _R.renderLayerAnimation &&
                              (clearTimeout(_[tou]),
                              (_[tou] = setTimeout(
                                function (e) {
                                  _R.renderLayerAnimation(e);
                                },
                                1e3 * event.delay,
                                pars
                              )));
                        }
                        break;
                      case "playvideo":
                        tex && _R.playVideo(targetlayer, id);
                        break;
                      case "stopvideo":
                        tex && _R.stopVideo && _R.stopVideo(targetlayer, id);
                        break;
                      case "togglevideo":
                        tex &&
                          (_R.isVideoPlaying(targetlayer, id)
                            ? _R.stopVideo && _R.stopVideo(targetlayer, id)
                            : _R.playVideo(targetlayer, id));
                        break;
                      case "mutevideo":
                        tex && _R.Mute(targetlayer, id, !0);
                        break;
                      case "unmutevideo":
                        tex && _R.Mute && _R.Mute(targetlayer, id, !1);
                        break;
                      case "toggle_mute_video":
                        tex &&
                          (_R.Mute(targetlayer, id)
                            ? _R.Mute(targetlayer, id, !1)
                            : _R.Mute && _R.Mute(targetlayer, id, !0));
                        break;
                      case "toggle_global_mute_video":
                        var pvl =
                          _R[id].playingvideos != undefined &&
                          0 < _R[id].playingvideos.length;
                        pvl &&
                          (_R[id].globalmute
                            ? jQuery.each(
                                _R[id].playingvideos,
                                function (e, t) {
                                  _R.Mute && _R.Mute(t, id, !1);
                                }
                              )
                            : jQuery.each(
                                _R[id].playingvideos,
                                function (e, t) {
                                  _R.Mute && _R.Mute(t, id, !0);
                                }
                              )),
                          (_R[id].globalmute = !_R[id].globalmute);
                        break;
                      default:
                        tpGS.gsap.delayedCall(
                          event.delay,
                          function (targetlayer, id, event, layer) {
                            switch (event.action) {
                              case "openmodal":
                                _R.openModalAPI(
                                  event.modal,
                                  event.modalslide === undefined
                                    ? 0
                                    : event.modalslide,
                                  _R[id].ajaxUrl,
                                  !0,
                                  id,
                                  event
                                );
                                break;
                              case "closemodal":
                                _R.revModal(id, { mode: "close" });
                                break;
                              case "callback":
                                eval(event.callback);
                                break;
                              case "simplelink":
                                window.open(event.url, event.target);
                                break;
                              case "simulateclick":
                                0 < targetlayer.length &&
                                  targetlayer.trigger("click");
                                break;
                              case "toggleclass":
                                0 < targetlayer.length &&
                                  targetlayer.toggleClass(event.classname);
                                break;
                              case "scrollbelow":
                              case "scrollto":
                                "scrollbelow" === event.action &&
                                  layer.addClass("tp-scrollbelowslider"),
                                  _R.scrollToId({
                                    id: id,
                                    offset: event.offset,
                                    action: event.action,
                                    anchor: event.id,
                                    speed: event.speed,
                                    ease: event.ease,
                                  });
                                break;
                              case "jumptoslide":
                                switch (
                                  ((_R[id].skipAttachDetach = !0),
                                  event.slide.toLowerCase())
                                ) {
                                  case "rs-random":
                                    var ts = Math.min(
                                      Math.max(
                                        0,
                                        Math.ceil(
                                          Math.random() * _R[id].realslideamount
                                        ) - 1
                                      )
                                    );
                                    (ts =
                                      _R[id].activeRSSlide == ts
                                        ? 0 < ts
                                          ? ts - 1
                                          : ts + 1
                                        : ts),
                                      _R.callingNewSlide(
                                        id,
                                        _R[id].slides[ts].dataset.key,
                                        "carousel" === _R[id].sliderType
                                      );
                                    break;
                                  case "+1":
                                  case "next":
                                  case "rs-next":
                                    (_R[id].sc_indicator = "arrow"),
                                      (_R[id].sc_indicator_dir = 0),
                                      _R.callingNewSlide(
                                        id,
                                        1,
                                        "carousel" === _R[id].sliderType
                                      );
                                    break;
                                  case "rs-previous":
                                  case "rs-prev":
                                  case "previous":
                                  case "prev":
                                  case "-1":
                                    (_R[id].sc_indicator = "arrow"),
                                      (_R[id].sc_indicator_dir = 1),
                                      _R.callingNewSlide(
                                        id,
                                        -1,
                                        "carousel" === _R[id].sliderType
                                      );
                                    break;
                                  case "first":
                                  case "rs-first":
                                    (_R[id].sc_indicator = "arrow"),
                                      (_R[id].sc_indicator_dir = 1),
                                      _R.callingNewSlide(
                                        id,
                                        0,
                                        "carousel" === _R[id].sliderType
                                      );
                                    break;
                                  case "last":
                                  case "rs-last":
                                    (_R[id].sc_indicator = "arrow"),
                                      (_R[id].sc_indicator_dir = 0),
                                      _R.callingNewSlide(
                                        id,
                                        _R[id].slideamount - 1,
                                        "carousel" === _R[id].sliderType
                                      );
                                    break;
                                  default:
                                    var ts = _R.isNumeric(event.slide)
                                      ? parseInt(event.slide, 0)
                                      : event.slide;
                                    _R.callingNewSlide(
                                      id,
                                      ts,
                                      "carousel" === _R[id].sliderType
                                    );
                                }
                                break;
                              case "toggleslider":
                                (_R[id].noloopanymore = 0),
                                  "playing" == _R[id].sliderstatus
                                    ? (_R[id].c.revpause(),
                                      (_R[id].forcepaused = !0),
                                      _R.unToggleState(_R[id].slidertoggledby))
                                    : ((_R[id].forcepaused = !1),
                                      _R[id].c.revresume(),
                                      _R.toggleState(_R[id].slidertoggledby));
                                break;
                              case "pauseslider":
                                _R[id].c.revpause(),
                                  _R.unToggleState(_R[id].slidertoggledby);
                                break;
                              case "playslider":
                                (_R[id].noloopanymore = 0),
                                  _R[id].c.revresume(),
                                  _R.toggleState(_R[id].slidertoggledby);
                                break;
                              case "gofullscreen":
                              case "exitfullscreen":
                              case "togglefullscreen":
                                var gf;
                                tpGS.gsap.set(_R[id].parallax.bgcontainers, {
                                  y: 0,
                                }),
                                  0 < jQuery(".rs-go-fullscreen").length &&
                                  ("togglefullscreen" == event.action ||
                                    "exitfullscreen" == event.action)
                                    ? (jQuery(".rs-go-fullscreen").removeClass(
                                        "rs-go-fullscreen"
                                      ),
                                      (gf =
                                        0 <
                                        _R[id].c.closest("rs-fullwidth-wrap")
                                          .length
                                          ? _R[id].c.closest(
                                              "rs-fullwidth-wrap"
                                            )
                                          : _R[id].c.closest("rs-module-wrap")),
                                      (_R[id].minHeight = _R[id].oldminheight),
                                      (_R[id].infullscreenmode = !1),
                                      _R[id].c.revredraw(),
                                      _R[id].c.revredraw(),
                                      jQuery(window).trigger("resize"),
                                      _R.unToggleState(
                                        _R[id].fullscreentoggledby
                                      ))
                                    : 0 != jQuery(".rs-go-fullscreen").length ||
                                      ("togglefullscreen" != event.action &&
                                        "gofullscreen" != event.action) ||
                                      ((gf =
                                        0 <
                                        _R[id].c.closest("rs-fullwidth-wrap")
                                          .length
                                          ? _R[id].c.closest(
                                              "rs-fullwidth-wrap"
                                            )
                                          : _R[id].c.closest("rs-module-wrap")),
                                      gf.addClass("rs-go-fullscreen"),
                                      (_R[id].oldminheight = _R[id].minHeight),
                                      (_R[id].minHeight = _R.getWinH(id)),
                                      (_R[id].infullscreenmode = !0),
                                      jQuery(window).trigger("resize"),
                                      _R.toggleState(
                                        _R[id].fullscreentoggledby
                                      ),
                                      _R[id].c.revredraw());
                                break;
                              default:
                                _R[id].c.trigger("layeraction", [
                                  event.action,
                                  layer,
                                  event,
                                ]);
                            }
                          },
                          [targetlayer, id, event, layer]
                        );
                    }
                  }
                }
            }
          );
      };
    function getFordWithAction(e) {
      var t,
        i = [];
      for (t in e.ford)
        e.frames[e.ford[t]].timeline.waitoncall
          ? i.push(e.ford[t])
          : i.push("skip");
      return i;
    }
    function updateToggleByList(e, t, i) {
      var a = e.data(t);
      (a = a === undefined ? [] : a).push(i), e.data(t, a);
    }
    function getEventParams(e) {
      var t,
        i = { on: "click", delay: 0, ease: "power2.out", speed: 400 };
      for (t in e)
        if (e.hasOwnProperty(t)) {
          var a = e[t].split(":");
          switch (
            (2 < a.length &&
              "call" === a[0] &&
              (a[1] = a.join(":").replace(a[0] + ":", "")),
            a[0])
          ) {
            case "modal":
              i.modal = a[1];
              break;
            case "ms":
              i.modalslide = a[1];
              break;
            case "m":
              i.frameM = a[1];
              break;
            case "n":
              i.frameN = a[1];
              break;
            case "o":
              i.on =
                "click" === a[1] || "c" === a[1]
                  ? "click"
                  : "ml" === a[1] || "mouseleave" === a[1]
                  ? "mouseleave"
                  : "mouseenter" === a[1] || "me" === a[1]
                  ? "mouseenter"
                  : a[1];
              break;
            case "d":
              (i.delay = parseInt(a[1], 0) / 1e3),
                (i.delay = "NaN" === i.delay || isNaN(i.delay) ? 0 : i.delay);
              break;
            case "rd":
              (i.repeat = parseInt(a[1], 0) / 1e3),
                (i.repeat =
                  "NaN" === i.repeat || isNaN(i.repeat) ? 0 : i.repeat);
              break;
            case "a":
              i.action = a[1];
              break;
            case "f":
              i.frame = a[1];
              break;
            case "slide":
              i.slide = a[1];
              break;
            case "layer":
              i.layer = a[1];
              break;
            case "sp":
              i.speed = parseInt(a[1], 0);
              break;
            case "e":
              i.ease = a[1];
              break;
            case "ls":
              i.togglestate = a[1];
              break;
            case "offset":
              i.offset = a[1];
              break;
            case "call":
              i.callback = a[1];
              break;
            case "url":
              i.url = "";
              for (var r = 1; r < a.length; r++)
                i.url += a[r] + (r === a.length - 1 ? "" : ":");
              break;
            case "target":
              i.target = a[1];
              break;
            case "class":
              i.classname = a[1];
              break;
            case "ch":
              i.children = "true" == a[1] || 1 == a[1] || "t" == a[1];
              break;
            default:
              0 < a[0].length && "" !== a[0] && (i[a[0]] = a[1]);
          }
        }
      return i;
    }
    var getOffContH = function (e) {
      var t, i;
      return e == undefined
        ? 0
        : 1 < e.split(",").length
        ? ((t = e.split(",")),
          (i = 0),
          t &&
            jQuery.each(t, function (e, t) {
              0 < jQuery(t).length && (i += jQuery(t).outerHeight(!0));
            }),
          i)
        : jQuery(e).height();
    };
    (window.RS_MODULES = window.RS_MODULES || {}),
      (window.RS_MODULES.actions = { loaded: !0, version: version }),
      window.RS_MODULES.checkMinimal && window.RS_MODULES.checkMinimal();
  })(jQuery),
  !(function () {
    "use strict";
    jQuery.fn.revolution = jQuery.fn.revolution || {};
    var y = jQuery.fn.revolution,
      w =
        (jQuery.extend(!0, y, {
          prepareCarousel: function (e, t, i, a) {
            var r;
            void 0 === e ||
              (((r = y[e].carousel).slidesWithRowAdjustions = {}),
              (t = r.lastdirection = o(t, r.lastdirection)),
              y.setCarouselDefaults(e, void 0, a),
              y.organiseCarousel(e, "right", !0, !1, !1),
              void 0 !== r.swipeTo && y.isNumeric(r.swipeTo)
                ? void 0 !== i
                  ? y.swipeAnimate({
                      id: e,
                      to: r.swipeTo,
                      distance: r.swipeToDistance,
                      direction: t,
                      fix: !0,
                      speed: i,
                    })
                  : y.swipeAnimate({
                      id: e,
                      to: r.swipeTo,
                      distance: r.swipeToDistance,
                      direction: t,
                      fix: !0,
                    })
                : y.swipeAnimate({ id: e, to: 0, direction: t, speed: 0 }),
              "carousel" !== y[e].sliderType) ||
              r.fadein ||
              (tpGS.gsap.to(y[e].canvas, 1, { scale: 1, opacity: 1 }),
              (r.fadein = !0));
          },
          setupCarousel: function (i) {
            var a = y[i].carousel;
            "v" == a.orientation
              ? ((a.length = "height"),
                (a.translate = "y"),
                (a.slide_dims = "slide_heights"),
                (a.deltaT = "deltaY"),
                (a.sliderLength = "sliderHeight"),
                (a.slide_length = "slide_height"),
                (a.wraplength = "wrapheight"),
                (a.align =
                  "0%" === a.vertical_align
                    ? "start"
                    : "50%" === a.vertical_align
                    ? "center"
                    : "end"),
                !a.snap || a.justify || a.infinity || (a.forceBAlign = !0))
              : ((a.length = "width"),
                (a.translate = "x"),
                (a.slide_dims = "slide_widths"),
                (a.deltaT = "deltaX"),
                (a.sliderLength = "sliderWidth"),
                (a.slide_length = "slide_width"),
                (a.wraplength = "wrapwidth"),
                (a.align =
                  "left" === a.horizontal_align
                    ? "start"
                    : "center" === a.horizontal_align
                    ? "center"
                    : "end")),
              (a[a.sliderLength] = y[i].canv[a.length]),
              (a.proxy = document.createElement("div")),
              (a.follower = document.createElement("div")),
              (a.slideamount = y[i].slideamount),
              a.infinity || a.snap || (y[i].carousel.align = "start"),
              g(i),
              b(i, a.align),
              (a.inited = !0),
              (a.lerpHandler = y.carLerpHandler.bind(this, i)),
              void 0 === a.animInList && (a.animInList = []),
              (a.draggableObj = {
                trigger: y[i].c[0],
                type: a.translate,
                edgeResistance: 0.5,
                zIndexBoost: !1,
                cursor: "grab",
                activeCursor: "grabbing",
                allowContextMenu: !0,
                inertia: !0,
                throwResistance: a.snap ? 8e3 : 500,
                onPress: function (e) {
                  y.closestClass(e.target, "rs-nav-element")
                    ? (a.draggable.endDrag(), a.draggable.disable())
                    : y[i].c.trigger("stoptimer"),
                    (a.focusedOnPress = a.focused),
                    (a.isPressed = !0),
                    (a.fromWheel = !1),
                    (a.cX = a.lerpX = this.pointerX),
                    (a.cY = a.lerpY = this.pointerY),
                    a.tween && a.tween.kill && (a.tween.kill(), delete a.tween);
                },
                onClick: function (e) {
                  (a.isPressed = !1),
                    y.closestClass(e.target, "rs-nav-element") ||
                      y.closestClass(e.target, "rs-waction") ||
                      (a.draggable.enabled() &&
                        !1 === y[i].carousel.stopOnClick &&
                        y[i].c.trigger("starttimer"));
                },
                onDragStart: function () {
                  (a.lerpSpeed = 0.1),
                    a.lerp || (a.lerp = requestAnimationFrame(a.lerpHandler)),
                    y.ISM &&
                      a.forceBAlign &&
                      (("up" === this.getDirection() &&
                        a.focused == a.slideamount - 1) ||
                      ("down" === this.getDirection() && 0 == a.focused)
                        ? (a.forceScroll = !0)
                        : (a.forceScroll = !1));
                },
                onDrag: function () {
                  (a.cX = this.pointerX), (a.cY = this.pointerY);
                },
                snap: function (e) {
                  var t;
                  return (
                    y.getLastPos(i),
                    (a.isPressed = !1),
                    a.forceScroll && a.forceBAlign
                      ? ((t =
                          "up" === this.getDirection()
                            ? y[i].cpar.offset().top + y[i].module.height
                            : y.document.scrollTop() -
                              (window.innerHeight -
                                y[i].cpar[0].getBoundingClientRect().top)),
                        y[i].modal.useAsModal ||
                          tpGS.gsap.to([window, "body"], { scrollTo: t }),
                        a.focused != a.slideamount - 1 || a.infinity
                          ? a.lastPos
                          : a[a.wraplength] - a.totalWidth)
                      : (y.calculateSnap(i, e), e)
                  );
                },
              }),
              (a.draggable = tpGS.draggable.create(a.proxy, a.draggableObj)[0]),
              y[i].c.one("revolution.slide.onchange", function () {
                w(i);
              });
          },
          positionCarousel: function (e) {
            var t = y[e].carousel;
            if (
              ((t[t.sliderLength] = y[e].canv[t.length]),
              t.draggable && !t.draggable.isPressed)
            ) {
              for (var i = 0, a = 0; a < t.slideamount; a++)
                t.arr[a].elem === y[e].slides[t.closest] && (i = t.arr[a].prog);
              if (
                (Number.isNaN(i) && (i = 0),
                g(e),
                (y.ISM && y[e].navigation.touch.mobileCarousel) ||
                (!0 !== y.ISM && y[e].navigation.touch.desktopCarousel)
                  ? ((t.draggable.vars.cursor = "grab"), t.draggable.enable())
                  : ((t.draggable.vars.cursor = "pointer"),
                    t.draggable.disable()),
                y[e].carousel.justify)
              )
                for (
                  a = t.wrapperWidth = 0;
                  a < y[e].carousel[t.slide_dims].length;
                  a++
                )
                  t.wrapperWidth += y[e].carousel[t.slide_dims][a];
              else t.wrapperWidth = t.slide_width * y[e].slides.length;
              void 0 === t.focused && (t.focused = 0),
                (t.activeSlide = t.oldfocused =
                  void 0 === t.focused || void 0 === t.closest ? 0 : t.closest);
              for (a = 0; a < t.arr.length; a++) y.updateSlideWidth(e, a);
              var r,
                o,
                s,
                n = 0,
                l =
                  ((t.lastWrapwidth = t.wrapwidth),
                  (t.lastWrapheight = t.wrapheight),
                  (o = r =
                    "start" === y[e].carousel.align
                      ? 0
                      : "center" === y[e].carousel.align
                      ? (t[t.wraplength] - t.arr[t.activeSlide][t.length]) / 2
                      : t[t.wraplength] - t.arr[t.activeSlide][t.length]),
                  t.infinity ||
                    "v" !== t.orientation ||
                    t.activeSlide != t.slideamount - 1 ||
                    (r = t[t.wraplength] - t.arr[t.activeSlide][t.length]),
                  tpGS.gsap.set([t.proxy, t.follower], { x: r, y: r }),
                  t.arr[0][t.length] * i);
              if (t.infinity) {
                for (a = t.activeSlide; a < t.arr.length; a++)
                  a !== t.activeSlide && (n += t.space),
                    "h" === t.orientation
                      ? tpGS.gsap.set(t.arr[a].elem, { x: n + r + l })
                      : tpGS.gsap.set(t.arr[a].elem, { y: n + r + l }),
                    (t.arr[a].posX = n + r + l),
                    (t.arr[a][t.translate] = n + r + l),
                    (n += t.arr[a][t.length]);
                for (var d = r + l, a = t.activeSlide - 1; 0 <= a; a--)
                  (d -= t.arr[a][t.length] + t.space),
                    (t.arr[a].posX = d + l),
                    (t.arr[a][t.translate] = d),
                    "h" === t.orientation
                      ? tpGS.gsap.set(t.arr[a].elem, { x: d })
                      : tpGS.gsap.set(t.arr[a].elem, { y: d }),
                    (n += t.arr[a][t.length] + t.space);
              } else {
                for (var c = 0, a = 0; a < t.arr.length; a++)
                  0 < a && (n += t.space),
                    a == t.activeSlide && (c += n),
                    (t.arr[a].posX = n + r + l),
                    (t.arr[a][t.translate] = n + r + l),
                    "h" === t.orientation
                      ? tpGS.gsap.set(t.arr[a].elem, { x: n + r + l })
                      : tpGS.gsap.set(t.arr[a].elem, { y: n + r + l }),
                    (n += t.arr[a][t.length]);
                tpGS.gsap.set([t.proxy, t.follower], { x: r - c, y: r - c }),
                  "h" === t.orientation
                    ? tpGS.gsap.set([y[e].slides], { x: "-=" + c })
                    : tpGS.gsap.set([y[e].slides], { y: "-=" + c });
                for (a = 0; a < t.arr.length; a++)
                  (t.arr[a].posX -= c), (t.arr[a][t.translate] -= c);
              }
              (t.startOffset = o),
                y.swapCarouselSlides(e, !0),
                t.infinity
                  ? t.draggable.applyBounds({ minX: -1 / 0, maxX: 1 / 0 })
                  : !t.infinity && t.snap
                  ? t.draggable.applyBounds({
                      minX: -(t.startOffset + n),
                      maxX: t.startOffset,
                    })
                  : t.infinity ||
                    t.snap ||
                    t.draggable.applyBounds({ minX: t.wrapwidth - n, maxX: 0 }),
                (t.lastActiveSlide = t.activeSlide),
                (t.totalWidth = n),
                (t.lastTotalWidth = n),
                "off" !== t.spin &&
                  ((o = t[t.slide_length] / 2),
                  (t.spinAngle = Math.max(
                    Math.min(t.spinAngle, 360 / t.arr.length),
                    -360 / t.arr.length
                  )),
                  (s = o / Math.sin(((t.spinAngle / 2) * Math.PI) / 180)),
                  (t.spinR =
                    (Math.sqrt(s * s - o * o) + t.space) *
                    Math.sign(t.spinAngle)),
                  "2d" === t.spin && "h" === t.orientation
                    ? (t.spinR +=
                        (t.spinAngle <= 0 ? 0 : 1) *
                        ("fullscreen" === y[e].sliderLayout
                          ? t.wrapheight
                          : t.slide_height))
                    : "2d" === t.spin &&
                      (t.spinR +=
                        (t.spinAngle <= 0 ? 0 : 1) *
                        ("fullscreen" === y[e].sliderLayout
                          ? t.wrapwidth
                          : t.slide_width)));
              for (a = 0; a < t.trackArr.length; a++)
                for (var p = 0; p < t.arr.length; p++)
                  t.trackArr[a].elem === t.arr[p].elem &&
                    ((t.trackArr[a].width = t.arr[p].width),
                    (t.trackArr[a].height = t.arr[p].height));
              y.swapCarouselSlides(e, !0),
                y.applyDistanceEffect(e),
                y.swipeAnimate({ id: e, from: "none" });
            }
          },
          updateSlideWidth: function (e, t) {
            var i = y[e].carousel;
            if (i.justify)
              for (var a = 0; a < y[e].slides.length; a++)
                y[e].slides[a] === i.arr[t].elem &&
                  (i.arr[t][i.length] = i[i.slide_dims][a]);
            else i.arr[t][i.length] = i[i.slide_length];
          },
          swapCarouselSlides: function (e) {
            var t,
              i = y[e].carousel,
              a = !0;
            if (i.infinity && !(i.totalWidth < i[i.wraplength]))
              for (; a; ) {
                var r,
                  o,
                  s =
                    0 < parseFloat(i.arr[0][i.translate]) ||
                    (void 0 !== i.arr[0].progress &&
                      i.arr[0].progress <= i.maxVisibleItems / 2 &&
                      !(
                        i.arr[i.arr.length - 1].progress <=
                        i.maxVisibleItems / 2
                      ) &&
                      parseFloat(i.arr[i.arr.length - 1][i.translate]) >=
                        i[i.wraplength]),
                  n =
                    parseFloat(i.arr[i.arr.length - 1][i.translate]) <
                      i[i.wraplength] - i.arr[i.arr.length - 1][i.length] ||
                    (void 0 !== i.arr[i.arr.length - 1].progress &&
                      i.arr[i.arr.length - 1].progress <=
                        i.maxVisibleItems / 2 &&
                      !(i.arr[0].progress <= i.maxVisibleItems / 2) &&
                      parseFloat(i.arr[0][i.translate]) + i.arr[0][i.length] <=
                        0);
                s
                  ? ((r = parseFloat(i.arr[0][i.translate]) - i.space),
                    (o = i.arr.pop()),
                    i.arr.unshift(o),
                    t === o && (a = !1),
                    (t = o),
                    (i.arr[0].posX = i.arr[0][i.translate] =
                      r - i.arr[0][i.length]),
                    y.getCarActiveSlide(e))
                  : n
                  ? ((r =
                      parseFloat(i.arr[i.arr.length - 1][i.translate]) +
                      i.space),
                    (o = i.arr.shift()),
                    i.arr.push(o),
                    t === o && (a = !1),
                    (t = o),
                    (i.arr[i.arr.length - 1].posX = i.arr[i.arr.length - 1][
                      i.translate
                    ] =
                      r + i.arr[i.arr.length - 2][i.length]),
                    y.getCarActiveSlide(e))
                  : (a = !1);
              }
          },
          onThrowComplete: function (e) {
            for (
              var t = y[e].carousel,
                i =
                  ("carousel" !== y[e].sliderType ||
                    t.fadein ||
                    (tpGS.gsap.to(y[e].canvas, 1, { scale: 1, opacity: 1 }),
                    (t.fadein = !0)),
                  y.getCarActiveSlide(e, !0),
                  t.arr[t.activeSlide]),
                a = 0;
              a < y[e].slides.length;
              a++
            ) {
              if (y[e].slides[a] === i.elem) {
                if (
                  ((t.focused = parseFloat(a)),
                  (y[e].pr_next_key = t.focused),
                  t.animInList.includes(t.oldfocused.toString()) ||
                    t.animInList.push(t.oldfocused.toString()),
                  "all" !== t.showLayersAllTime)
                )
                  for (; 1 <= t.animInList.length; ) {
                    var r = t.animInList.pop();
                    t.focused != r &&
                      y.removeTheLayers(jQuery(y[e].slides[r]), e);
                  }
                for (var o in (y.callingNewSlide(
                  e,
                  y[e].slides[a].getAttribute("data-key"),
                  !0,
                  !0
                ),
                y[e].c.trigger("revolution.nextslide.waiting"),
                w(e),
                t.focused != t.oldfocused &&
                  "all" !== t.showLayersAllTime &&
                  (t.animInList.includes(t.focused.toString()) ||
                    t.animInList.push(t.focused.toString()),
                  y.animateTheLayers({
                    slide: t.focused,
                    id: e,
                    mode: "start",
                  }),
                  y.animateTheLayers({
                    slide: "individual",
                    id: e,
                    mode: y[e].carousel.allLayersStarted ? "rebuild" : "start",
                  })),
                y[e].sbgs))
                  y[e].sbgs.hasOwnProperty(o) &&
                    void 0 !== y[e].sbgs[o].bgvid &&
                    0 !== y[e].sbgs[o].bgvid.length &&
                    ("" + y[e].sbgs[o].skeyindex == "" + t.focused
                      ? y.playBGVideo(e, y.gA(y[e].pr_next_slide[0], "key"))
                      : y.stopBGVideo(e, y[e].sbgs[o].key));
                t.oldfocused = t.focused;
              }
              for (
                var s = y[e].slides[a].querySelectorAll(".rs-on-car"), n = 0;
                n < s.length;
                n++
              )
                y[e].slides[a] !== i.elem &&
                  s[n].classList.contains("rs-layer-video") &&
                  y[e].videos[s[n].id].pauseOnSlideChange &&
                  y.stopVideo(jQuery(s[n]), e);
            }
            (t.draggable[t.deltaT] = 0), y[e].c.trigger("restarttimer");
          },
          calculateSnap: function (e, t) {
            var i,
              a,
              r = y[e].carousel,
              o =
                (tpGS.gsap.killTweensOf(r.proxy, r.translate),
                "v" === r.orientation
                  ? t - r.draggable.endY
                  : t - r.draggable.endX),
              s = (Math.abs(o) < 3 && (o = 0), !0),
              n =
                "v" === r.orientation
                  ? Math.abs(r.draggable.endY - r.draggable.startY)
                  : Math.abs(r.draggable.endX - r.draggable.startX);
            (r.focusedPreSnap = r.focused),
              r.snap
                ? ((i = r.direction =
                    0 <= r.draggable[r.deltaT] ? "right" : "left"),
                  (o = (i = y.getNextSlide(e, o, i, !0, n < 300)).delta),
                  (s = i.overshoot),
                  (r.target = i.target))
                : (r.target = t),
              ((r.infinity || r.snap) &&
                (r.infinity || "v" !== r.orientation)) ||
                (r.target <= r[r.wraplength] - r.totalWidth
                  ? (r.target = r[r.wraplength] - r.totalWidth)
                  : 0 <= r.target && !r.snap && (r.target = 0)),
              (r.swiped = !0),
              r.overshoot && s
                ? (tpGS.gsap.to(r, {
                    duration: r.snap ? 0.3 : 0.5,
                    lerpSpeed: 0.8,
                  }),
                  (s =
                    Math.min(
                      0 === r.draggable[r.deltaT]
                        ? Math.abs(o) / 20
                        : Math.abs(r.draggable[r.deltaT]) / 2,
                      r[r.wraplength] / 4
                    ) * Math.sign(o)),
                  (a = Math.abs(s / 100)),
                  (r.time = Math.min(
                    Math.max(a / 10, (r.speed / 1e3) * 0.6),
                    r.speed / 1e3
                  )),
                  (r.tween = tpGS.gsap.timeline({
                    onComplete: function () {
                      y.snapCompleted(e);
                    },
                  })),
                  r.tween
                    .to(r.proxy, {
                      x: r.target + s,
                      y: r.target + s,
                      duration: r.time,
                      ease: "power2.out",
                    })
                    .to(
                      r.proxy,
                      {
                        x: r.target,
                        y: r.target,
                        duration: Math.min(2 * r.time, 0.6),
                        ease: r.easing
                          .replace(".inOut", ".out")
                          .replace(".in", ".out"),
                      },
                      "overshoot"
                    )
                    .to(
                      r,
                      { duration: Math.min(2 * r.time, 0.6), lerpSpeed: 1 },
                      "overshoot"
                    ))
                : ((a = Math.abs(o / 100)),
                  (r.time = Math.min(
                    Math.max(a / 10, (r.speed / 1e3) * 0.6),
                    r.speed / 1e3
                  )),
                  (r.tween = tpGS.gsap.to(r.proxy, {
                    x: r.target,
                    y: r.target,
                    duration: r.time,
                    ease: r.easing
                      .replace(".inOut", ".out")
                      .replace(".in", ".out"),
                    onComplete: function () {
                      y.snapCompleted(e);
                    },
                  })),
                  tpGS.gsap.to(r, { duration: r.time, lerpSpeed: 1 }));
          },
          carLerpHandler: function (e, t) {
            var i = y[e].carousel,
              t =
                ("skip" !== t &&
                  (i.lerp = requestAnimationFrame(i.lerpHandler)),
                parseFloat(i.proxy._gsap[i.translate])),
              a = parseFloat(i.follower._gsap[i.translate]),
              t = a + (t - a) * i.lerpSpeed - a;
            "mousedrag" == y[e].parallax.type &&
              ((i.delta = t),
              (i.lerpX = i.lerpX + (i.cX - i.lerpX) * i.lerpSpeed),
              (i.lerpY = i.lerpY + (i.cY - i.lerpY) * i.lerpSpeed),
              (y[e].parallax.frame = window.requestAnimationFrame(
                y[e].parallax.parallaxHandler
              ))),
              tpGS.gsap.set(y[e].canvas, {
                skewX: i.skewX * Math.max(-1, Math.min(1, t / 100)),
                skewY: i.skewY * Math.max(-1, Math.min(1, t / 100)),
              }),
              "h" === i.orientation
                ? (tpGS.gsap.set(i.follower, { x: "+=" + t }),
                  tpGS.gsap.set(i.arr, { x: "+=" + t }))
                : (tpGS.gsap.set(i.follower, { y: "+=" + t }),
                  tpGS.gsap.set(i.arr, { y: "+=" + t })),
              y.swapCarouselSlides(e),
              y.applyDistanceEffect(e);
          },
          snapCompleted: function (e) {
            var t = y[e].carousel;
            (t.lerp = cancelAnimationFrame(t.lerp)),
              (t.scrollFrame = cancelAnimationFrame(t.scrollFrame)),
              (t.swiped = !1),
              tpGS.gsap.set(t.follower, {
                x: t.proxy._gsap[t.translate],
                y: t.proxy._gsap[t.translate],
              }),
              y.onThrowComplete(e);
          },
          applyDistanceEffect: function (e) {
            var t,
              i = y[e].carousel,
              a = 1 / 0,
              r = 0,
              o = 0,
              s =
                (void 0 === i.lastSlideProgress && (i.lastSlideProgress = 1),
                i.startOffset);
            for (t in ((i.startOffsetCache = i.startOffset),
            void 0 === i.tempAlign && (i.tempAlign = i.align),
            "v" !== i.orientation ||
              i.infinity ||
              i.justify ||
              (s =
                i.startOffset +
                (i[i.wraplength] - i[i.slide_length] - i.startOffset) *
                  (1 - i.lastSlideProgress)),
            i.arr)) {
              var n = parseFloat(i.arr[t][i.translate]) - s;
              if ((i.infinity && (n %= i.totalWidth), Math.abs(n) < a)) {
                for (var l = 0; l < y[e].slides.length; l++)
                  y[e].slides[l] === i.arr[t].elem &&
                    ((o = l), (i.closestArr = t));
                a = Math.abs(n);
              }
              i.arr[t].loaded && r++,
                i.infinity ||
                  i.snap ||
                  (0 === i.activeSlide
                    ? (n = parseFloat(i.arr[t][i.translate]))
                    : i.activeSlide === i.arr.length - 1 &&
                      (n =
                        parseFloat(i.arr[t][i.translate]) -
                        (i[i.wraplength] - i.arr[t][i.length])));
              var d = Math.sign(n),
                c = (i.arr[t].progress =
                  Math.abs(n) / (i[i.slide_length] + i.space));
              if (
                ((i.arr[t].prog = n / (i[i.slide_length] + i.space)),
                !i.justify && "mousedrag" === y[e].parallax.type)
              )
                for (l = 0; l < y[e].slides.length; l++)
                  y[e].slides[l] === i.arr[t].elem &&
                    (i.trackArr[l].progress = c);
              "v" !== i.orientation ||
                i.infinity ||
                t != i.slideamount - 1 ||
                (c <= ("left" === i.direction ? 0.9 : 0.1) && !i.vertAlignBottom
                  ? (tpGS.gsap.to(i, { lastSlideProgress: 0, duration: 0.2 }),
                    (i.vertAlignDefault = !1),
                    (i.vertAlignBottom = !0),
                    (i.tempAlign = "end"),
                    b(e, "end"))
                  : c > ("left" === i.direction ? 0.9 : 0.1) &&
                    !i.vertAlignDefault &&
                    (tpGS.gsap.to(i, { lastSlideProgress: 1, duration: 0.2 }),
                    (i.vertAlignDefault = !0),
                    (i.vertAlignBottom = !1),
                    (i.tempAlign = i.align),
                    b(e, i.align))),
                (i.arr[t].sign = d);
              var p,
                g,
                n =
                  (i.arr[t].progress / Math.ceil(i.pDiv)) *
                  ("center" === i.tempAlign
                    ? 1
                    : "start" === i.tempAlign
                    ? d
                    : -d),
                u = +Math.min(i.arr[t].progress, 1),
                h = 100 - 5 * Math.round(i.arr[t].progress),
                m = {};
              i.justify || "off" === i.spin
                ? 0 === i.minScale || i.justify
                  ? (m[i.translate] = i.arr[t][i.translate])
                  : ((p = 1 - (i.vary_scale ? n : u) * (1 - i.minScale)),
                    (g = i.offsetScale
                      ? ((i.arr[t].sign *
                          (i[i.slide_length] +
                            i.space -
                            (i[i.slide_length] + i.space) * p)) /
                          2) *
                        i.arr[t].progress
                      : ((i.arr[t].sign *
                          (i[i.slide_length] - i[i.slide_length] * p)) /
                          2) *
                        i.arr[t].progress),
                    (m[i.translate] = i.arr[t][i.translate] - g),
                    window.isSafari11 && (m.z = -150 * (1 - p)),
                    (m.scale = p))
                : ((m[i.translate] = s),
                  "2d" === i.spin
                    ? ((m.rotation =
                        i.spinAngle * c * ("h" === i.orientation ? d : -d)),
                      "h" === i.orientation
                        ? (m.transformOrigin = "center " + i.spinR + "px 0")
                        : (m.transformOrigin = i.spinR + "px center 0"))
                    : ("h" === i.orientation
                        ? (m.rotationY = i.spinAngle * i.arr[t].progress * -d)
                        : (m.rotationX = i.spinAngle * i.arr[t].progress * d),
                      (m.transformOrigin = "center center " + i.spinR + "px"))),
                (m.opacity = 1),
                i.justify ||
                  (0 !== i.maxRotation &&
                    (m.rotationY =
                      i.maxRotation * (i.vary_rotation ? n : u) * -d),
                  (m.opacity = 1 + (i.maxOpacity - 1) * (i.vary_fade ? n : u)),
                  n > i.edgeRatio
                    ? (m.opacity = i.oRange(n))
                    : n < 0
                    ? (m.opacity = i.oRangeMin(n))
                    : 1 === i.maxOpacity && (m.opacity = 1)),
                (m.zIndex = h),
                0 < m.opacity
                  ? ("visible" !== i.arr[t].elem.style.visibility &&
                      (m.visibility = "visible"),
                    tpGS.gsap.set(i.arr[t].elem, m))
                  : ("hidden" !== i.arr[t].elem.style.visibility &&
                      (m.visibility = "hidden"),
                    tpGS.gsap.set(i.arr[t].elem, {
                      visibility: m.visibility,
                      opacity: m.opacity,
                    }));
            }
            if (o !== i.closest) {
              if (
                ((i.closest = o),
                r !== i.arr.length &&
                  y.loadVisibleCarouselItems(e, !0, i.closest),
                i.draggable.isPressed)
              ) {
                if (
                  ((i.focused = i.closest),
                  (y[e].pr_next_key = i.focused),
                  (i.oldfocused = void 0 === i.oldfocused ? 0 : i.oldfocused),
                  y[e].carousel.allLayersStarted
                    ? y.updateCarouselRows(e)
                    : y.carouselRowAdjustment(i, e, i.focused),
                  "all" !== i.showLayersAllTime)
                )
                  for (
                    i.animInList.includes(i.oldfocused.toString()) ||
                    i.animInList.push(i.oldfocused.toString());
                    1 <= i.animInList.length;

                  ) {
                    var v = i.animInList.pop();
                    i.focused != v &&
                      y.removeTheLayers(jQuery(y[e].slides[v]), e);
                  }
                i.focused != i.oldfocused &&
                  ("all" !== i.showLayersAllTime &&
                    (i.animInList.includes(i.focused.toString()) ||
                      i.animInList.push(i.focused.toString()),
                    y.animateTheLayers({
                      slide: i.focused,
                      id: e,
                      mode: "start",
                    }),
                    y.animateTheLayers({
                      slide: "individual",
                      id: e,
                      mode: y[e].carousel.allLayersStarted
                        ? "rebuild"
                        : "start",
                    })),
                  w(e, !0),
                  (i.oldfocused = i.focused)),
                  y[e].c.trigger("revolution.nextslide.waiting");
              }
              for (var f in y[e].sbgs)
                y[e].sbgs.hasOwnProperty(f) &&
                  void 0 !== y[e].sbgs[f].bgvid &&
                  0 !== y[e].sbgs[f].bgvid.length &&
                  "" + y[e].sbgs[f].skeyindex != "" + i.focused &&
                  y.stopBGVideo(e, y[e].sbgs[f].key);
            }
          },
          getCarActiveSlide: function (e) {
            var t,
              i,
              a,
              r = y[e].carousel,
              o = 999999,
              s = 0;
            for (i in r.arr)
              r.arr.hasOwnProperty(i) &&
                ((a =
                  "center" === y[e].carousel.align
                    ? Math.abs(
                        parseFloat(r.arr[i][r.translate]) -
                          (r[r.wraplength] - r.arr[i][r.length]) / 2
                      )
                    : "start" === y[e].carousel.align
                    ? Math.abs(parseFloat(r.arr[i][r.translate]))
                    : Math.abs(
                        parseFloat(r.arr[i][r.translate]) -
                          (r[r.wraplength] - r.arr[i][r.length])
                      )),
                (a = r.vertAlignBottom
                  ? Math.abs(
                      parseFloat(r.arr[i][r.translate]) -
                        (r[r.wraplength] - r.arr[i][r.length])
                    )
                  : a) < o) &&
                ((t = r.arr[i]), (o = a), (s = i));
            return (s = parseInt(s)), (r.activeSlide = s), t;
          },
          loadVisibleCarouselItems: function (e, t, i) {
            var a = y[e].carousel,
              r = [],
              o = i ? a.closest : a.focused;
            (a.focused = parseInt(o, 0)), (a.focused = y.isNumeric(o) ? o : 0);
            for (
              var s = 0;
              s < Math.ceil(y[e].carousel.maxVisibleItems / 2);
              s++
            ) {
              var n = "end" === y[e].carousel.align ? o - s : o + s,
                l =
                  "center" === y[e].carousel.align
                    ? o - s
                    : "start" === y[e].carousel.align
                    ? y[e].carousel.maxVisibleItems + n - 1
                    : n - y[e].carousel.maxVisibleItems + 1,
                n = n >= y[e].slideamount ? n - y[e].slideamount + 0 : n,
                l = l >= y[e].slideamount ? l - y[e].slideamount + 0 : l;
              if (
                ((n = n < 0 ? y[e].slideamount + n : n),
                (l = l < 0 ? y[e].slideamount + l : l),
                r.push(y[e].slides[n]),
                n !== l && r.push(y[e].slides[l]),
                a.arr)
              )
                for (var d = 0; d < a.arr.length; d++)
                  y[e].slides[n] === a.arr[d].elem && (a.arr[d].loaded = !0),
                    y[e].slides[l] === a.arr[d].elem && (a.arr[d].loaded = !0);
            }
            return (
              t && (y.loadImages(r, e, 1), y.waitForCurrentImages(r, e)), r
            );
          },
          organiseCarousel: function (e, t, i, a, r) {
            var o = y[e].carousel;
            if (y[e].slides)
              for (var s = 0; s < y[e].slides.length; s++) {
                var n = {
                  width: !0 === o.justify ? o.slide_widths[s] : o.slide_width,
                };
                "off" === o.spin &&
                  (n.transformOrigin =
                    "50% " +
                    ("h" === o.orientation ? o.vertical_align : "center")),
                  (n.force3D = !0),
                  (n.transformStyle =
                    "3D" != y[e].parallax.type && "3d" != y[e].parallax.type
                      ? "flat"
                      : "preserve-3d"),
                  !0 !== r && tpGS.gsap.set(y[e].slides[s], n);
              }
          },
          updateCarouselRows: function (e) {
            if ("carousel" === y[e].sliderType)
              for (var t = 0; t < y[e].slideamount; t++)
                y.carouselRowAdjustment(y[e].carousel, e, t);
          },
          carouselRowAdjustment: function (e, t, i) {
            void 0 !== e.slidesWithRowAdjustions &&
              void 0 === e.slidesWithRowAdjustions[i] &&
              ((e.slidesWithRowAdjustions[i] = !0),
              y.getRowHeights(t, i),
              y.putMiddleZoneInPosition(t, i));
          },
          getNextSlide: function (e, t, i, a, r) {
            var o,
              s = y[e].carousel,
              n = 0,
              l = !1,
              d = t,
              c = t;
            if (void 0 === s.trackIndex) {
              for (var p = 0; p < s.trackArr.length; p++)
                if (s.arr[s.activeSlide].elem === s.trackArr[p].elem) {
                  o = p;
                  break;
                }
            } else o = s.trackIndex;
            void 0 === i && (l = !0);
            for (var g = !1; (s.snap || !a) && !l; ) {
              if (
                g ||
                (a && Math.abs(n) >= Math.abs(t)) ||
                (void 0 === t && y[e].slides[s.focused] === s.trackArr[o].elem)
              ) {
                t = n;
                break;
              }
              var d = n,
                u = y.getNext(e, i, n, o, void 0 === a);
              (g = u.breakLoop) || ((n = u.tempDelta), (o = u.trackIndex));
            }
            var h = s.lastPos + t;
            return (
              a &&
                s.focusedOnPress != s.focusedPreSnap &&
                (h =
                  Math.abs(c + s.lastPos - h) <=
                  Math.abs(c + s.lastPos - (d + s.lastPos))
                    ? h
                    : d + s.lastPos),
              l && ((h = s.lastPos), (t = -s.arr[s.closestArr][s.translate])),
              { target: h, overshoot: !0, delta: t, trackIndex: o }
            );
          },
          getNext: function (e, t, i, a, r) {
            var e = y[e].carousel,
              o = "right" === t ? 1 : -1,
              s = !1;
            return (
              "start" === e.align && "left" === t
                ? (i += (e.trackArr[a][e.length] + e.space) * o)
                : "center" === e.align
                ? (i += ((e.trackArr[a][e.length] + e.space) / 2) * o)
                : "end" === e.align &&
                  "right" === t &&
                  (i += (e.trackArr[a][e.length] + e.space) * o),
              "right" === t
                ? --a < 0 &&
                  ((a = e.infinity ? e.trackArr.length - 1 : a + 1),
                  e.infinity || (s = !0))
                : ++a >= e.trackArr.length &&
                  ((a = e.infinity ? 0 : a - 1), e.infinity || (s = !0)),
              s ||
                ("start" === e.align &&
                  "right" === t &&
                  (i += (e.trackArr[a][e.length] + e.space) * o),
                "center" === e.align
                  ? (i += ((e.trackArr[a][e.length] + e.space) / 2) * o)
                  : "end" === e.align &&
                    "left" === t &&
                    (i += (e.trackArr[a][e.length] + e.space) * o)),
              { tempDelta: i, trackIndex: a, breakLoop: s }
            );
          },
          getCarDir: function (e, t, i) {
            var a = y[e].carousel,
              e = i - t,
              r = "right",
              o = ((a.sameSlide = !1), 0),
              s = 0;
            if (a.infinity) {
              for (var n = t; n != i; )
                (s += 1), (n = ++n >= a.slideamount ? 0 : n);
              for (n = t; n != i; )
                (o += 1), (n = --n < 0 ? a.slideamount - 1 : n);
              r = s <= o ? "left" : "right";
            } else
              a.infinity ||
                ((r = 0 <= i - t ? "left" : "right"),
                (s = Math.abs(i - t)),
                0 == e && ((r = "right"), (a.sameSlide = !0)));
            return (a.steps = s <= o ? s : o), (a.direction = r);
          },
          getLastPos: function (e) {
            var t = y[e].carousel;
            if (t.trackArr) {
              for (var i = 0, a = 0, r = 0; r < t.trackArr.length; r++)
                y[e].slides[t.closest] === t.trackArr[r].elem &&
                  (t.trackIndex = r),
                  y[e].slides[t.closest] === t.arr[r].elem &&
                    ((i = t.arr[r][t.translate]),
                    "center" === t.align &&
                      (a = (t[t.wraplength] - t.arr[r][t.length]) / 2),
                    "end" === t.align &&
                      (a = t[t.wraplength] - t.arr[r][t.length]),
                    (t.lastOffset = a));
              (t.lastPos =
                parseFloat(t.proxy._gsap[t.translate]) -
                i -
                (parseFloat(t.proxy._gsap[t.translate]) -
                  parseFloat(t.follower._gsap[t.translate]))),
                (t.lastPos += a);
            }
          },
          swipeAnimate: function (e) {
            var t,
              i = y[e.id].carousel,
              a = e.id;
            y.getLastPos(a),
              i.arr &&
                i.arr[i.closestArr] &&
                (i.arr[i.closestArr].elem == y[e.id].slides[i.focused] ||
                  ((t = y.getCarDir(a, i.trackIndex, i.focused)),
                  (e = y.getNextSlide(e.id, void 0, t, !1)),
                  (i.target = e.target),
                  ((i.infinity || i.snap) &&
                    (i.infinity || "v" !== i.orientation)) ||
                    (i.target <= i[i.wraplength] - i.totalWidth
                      ? (i.target = i[i.wraplength] - i.totalWidth)
                      : 0 <= i.target && !i.snap && (i.target = 0)),
                  (i.lerpSpeed = 1),
                  (i.fromWheel = !1),
                  i.tween && i.tween.kill && (i.tween.kill(), delete i.tween),
                  (i.tween = tpGS.gsap.to(i.proxy, {
                    x: i.target,
                    y: i.target,
                    ease: i.easing,
                    duration:
                      i.speed / 1e3 +
                      (2 <= i.steps ? ((i.steps - 1) * i.speed) / 2e3 : 0),
                    onComplete: function () {
                      (i.lerp = cancelAnimationFrame(i.lerp)),
                        (i.scrollFrame = cancelAnimationFrame(i.scrollFrame)),
                        y.carLerpHandler(a, "skip"),
                        (i.activeSlide = i.closestArr),
                        y.snapCompleted(a);
                    },
                  })),
                  (i.lerp = cancelAnimationFrame(i.lerp)),
                  (i.scrollFrame = cancelAnimationFrame(i.scrollFrame)),
                  i.lerp) ||
                  (i.lerp = requestAnimationFrame(i.lerpHandler)));
          },
          carScrollTicker: function (e) {
            var t = y[e].carousel,
              i =
                ((t.scrollFrame = requestAnimationFrame(t.scrollTicker)),
                parseFloat(t.proxy._gsap[t.translate])),
              a = i + 0.5 * (t.scrollProxy - i),
              i = a - i;
            tpGS.gsap.set(t.proxy, { [t.translate]: a }),
              Math.abs(i) < 0.03 &&
                ((t.scrollFrame = cancelAnimationFrame(t.scrollFrame)),
                (t.lerp = cancelAnimationFrame(t.lerp)),
                (t.activeSlide = t.closestArr),
                y.snapCompleted(e));
          },
          scrollCar: function (e, t, i) {
            var a = y[e].carousel,
              r =
                ((a.scrollFrame = cancelAnimationFrame(a.scrollFrame)),
                (a.lerp = cancelAnimationFrame(a.lerp)),
                tpGS.gsap.to(a, { lerpSpeed: 1 }),
                (a.fromWheel = !0),
                Math.round(parseFloat(a.proxy._gsap[a.translate])));
            a.tween && a.tween.kill && (a.tween.kill(), delete a.tween),
              (1 == i &&
                a.focused == a.slideamount - 1 &&
                r <= a[a.wraplength] - a.totalWidth &&
                !a.infinity) ||
              (-1 == i && 0 == a.focused && 0 <= r && !a.infinity)
                ? ((i =
                    1 == i
                      ? y[e].cpar.offset().top + y[e].module.height
                      : y.document.scrollTop() -
                        (window.innerHeight -
                          y[e].cpar[0].getBoundingClientRect().top)),
                  y[e].modal.useAsModal ||
                    tpGS.gsap.to([window, "body"], { scrollTo: i }))
                : ((e = r + -8 * t),
                  ((a.infinity || a.snap) &&
                    (a.infinity || "v" !== a.orientation)) ||
                    (e <= a[a.wraplength] - a.totalWidth
                      ? (e = a[a.wraplength] - a.totalWidth)
                      : 0 <= e && !a.snap && (e = 0)),
                  (a.tween = tpGS.gsap.to(a, {
                    scrollProxy: e,
                    duration: 0.5,
                    ease: a.easing,
                  })),
                  (a.scrollFrame = requestAnimationFrame(a.scrollTicker)),
                  a.lerp || (a.lerp = requestAnimationFrame(a.lerpHandler)));
          },
          defineCarouselElements: function (e) {
            var t = y[e].carousel;
            (t.infbackup = t.infinity),
              (t.maxVisiblebackup = t.maxVisibleItems),
              (t.slide_offset = "none"),
              (t.slide_offset = 0),
              (t.cached_slide_offset = 0),
              (t.wrap = jQuery(y[e].canvas[0].parentNode)),
              0 === t.maxRotation ||
                ("3D" !== y[e].parallax.type && "3d" !== y[e].parallax.type) ||
                tpGS.gsap.set(t.wrap, {
                  perspective: "1600px",
                  transformStyle: "preserve-3d",
                });
          },
          setCarouselDefaults: function (e, t, i) {
            var a,
              r,
              o = y[e].carousel;
            if (
              ((o.stretchCache =
                void 0 === o.stretchCache ? o.stretch : o.stretchCache),
              (o.stretch = !!y[e].infullscreenmode || o.stretchCache),
              (o.slide_width = Math.round(
                !0 !== o.stretch && "v" !== o.orientation
                  ? y[e].gridwidth[y[e].level] *
                      (0 === y[e].CM.w ? 1 : y[e].CM.w)
                  : y[e].canv.width
              )),
              (o.slide_height = Math.round(
                !0 !== o.stretch
                  ? y[e].infullscreenmode
                    ? y.getWinH(e) - y.getFullscreenOffsets(e)
                    : y[e].gridheight[y[e].level] *
                      (0 === y[e].CM.w ? 1 : y[e].CM.w)
                  : y[e].canv.height
              )),
              (o.ratio = o.slide_width / o.slide_height),
              (o.len = y[e].slides.length),
              (o.maxwidth = y[e].slideamount * o.slide_width),
              (o.maxheight = y[e].slideamount * o.slide_height),
              1 != o.justify &&
                o.maxVisiblebackup > o.len &&
                (o.maxVisibleItems = o.len % 2 ? o.len : o.len + 1),
              (o.wrapwidth =
                o.maxVisibleItems * o.slide_width +
                (o.maxVisibleItems - 1) * o.space),
              (o.wrapheight =
                o.maxVisibleItems * o.slide_height +
                (o.maxVisibleItems - 1) * o.space),
              (o.wrapwidth =
                "auto" != y[e].sliderLayout
                  ? o.wrapwidth > y[e].canv.width
                    ? y[e].canv.width
                    : o.wrapwidth
                  : o.wrapwidth > y[e].module.width
                  ? (0 !== y[e].module.width ? y[e].module : y[e].canv).width
                  : o.wrapwidth),
              (o.wrapheight =
                "auto" != y[e].sliderLayout
                  ? o.wrapheight > y[e].canv.height
                    ? y[e].canv.height
                    : o.wrapheight
                  : o.wrapheight > y[e].module.height
                  ? (0 !== y[e].module.height ? y[e].module : y[e].canv).height
                  : o.wrapheight),
              !0 === o.justify)
            ) {
              (o.slide_height = Math.round(
                "fullscreen" === y[e].sliderLayout
                  ? y[e].module.height
                  : y[e].gridheight[y[e].level]
              )),
                (o.slide_widths = []),
                (o.slide_heights = []),
                (o.slide_widthsCache =
                  void 0 === o.slide_widthsCache ? [] : o.slide_widthsCache),
                (o.slide_heightsCache =
                  void 0 === o.slide_heightsCache ? [] : o.slide_heightsCache);
              for (var s, n = (o.maxwidth = 0); n < o.len; n++)
                y[e].slides.hasOwnProperty(n) &&
                  ((s =
                    void 0 === (s = y.gA(y[e].slides[n], "iratio")) ||
                    0 === s ||
                    null === s
                      ? o.ratio
                      : s),
                  (s = parseFloat(s)),
                  (o.slide_widths[n] = Math.round(o.slide_height * s)),
                  (o.slide_heights[n] = Math.round(o.slide_height)),
                  !1 !== o.justifyMaxWidth &&
                    (o.slide_widths[n] = Math.min(
                      o.wrapwidth,
                      o.slide_widths[n]
                    )),
                  !1 !== o.justifyMaxWidth &&
                    (o.slide_heights[n] = Math.min(
                      o.wrapheight,
                      o.slide_heights[n]
                    )),
                  o.slide_widths[n] !== o.slide_widthsCache[n] &&
                    ((o.slide_widthsCache[n] = o.slide_widths[n]), !0 !== t) &&
                    tpGS.gsap.set(y[e].slides[n], { width: o.slide_widths[n] }),
                  o.slide_heights[n] !== o.slide_heightsCache[n] &&
                    ((o.slide_heightsCache[n] = o.slide_heights[n]),
                    !0 !== t) &&
                    tpGS.gsap.set(y[e].slides[n], {
                      height: o.slide_heights[n],
                    }),
                  (o.maxwidth += o.slide_widths[n] + o.space),
                  (o.maxheight += o.slide_heights[n] + o.space));
            }
            (o.infinity = !(o.wrapwidth >= o.maxwidth) && o.infbackup),
              o.forceBAlign &&
              o.slide_height < 0.6 * o.wrapheight &&
              o.wrapwidth < o.maxwidth
                ? (o.infinity = !0)
                : o.forceBAlign && (o.infinity = !1),
              !0 !== o.quickmode &&
                ((o.wrapoffset =
                  "center" === o.horizontal_align
                    ? (y[e].canv.width -
                        y[e].outNavDims.right -
                        y[e].outNavDims.left -
                        o.wrapwidth) /
                      2
                    : 0),
                (o.wrapoffset =
                  "auto" != y[e].sliderLayout && y[e].outernav
                    ? 0
                    : o.wrapoffset < y[e].outNavDims.left
                    ? y[e].outNavDims.left
                    : o.wrapoffset),
                (a =
                  "3D" == y[e].parallax.type || "3d" == y[e].parallax.type
                    ? "visible"
                    : "hidden"),
                (r =
                  "right" === o.horizontal_align
                    ? {
                        left: "auto",
                        right: o.wrapoffset + "px",
                        width: o.wrapwidth,
                        overflow: a,
                      }
                    : "left" === o.horizontal_align || o.wrapwidth < y.winW
                    ? {
                        right: "auto",
                        left: o.wrapoffset + "px",
                        width: o.wrapwidth,
                        overflow: a,
                      }
                    : {
                        right: "auto",
                        left: "auto",
                        width: "100%",
                        overflow: a,
                      }),
                (void 0 !== o.cacheWrapObj &&
                  r.left === o.cacheWrapObj.left &&
                  r.right === o.cacheWrapObj.right &&
                  r.width === o.cacheWrapObj.width) ||
                  (window.requestAnimationFrame(function () {
                    tpGS.gsap.set(o.wrap, r),
                      0 < y[e].carousel.wrapoffset &&
                        tpGS.gsap.set(y[e].canvas, { left: 0 });
                  }),
                  (o.cacheWrapObj = jQuery.extend(!0, {}, r))),
                (o.inneroffset =
                  "right" === o.horizontal_align
                    ? o.wrapwidth - o.slide_width
                    : 0),
                (o.windhalf =
                  "auto" === y[e].sliderLayout
                    ? y[e].module.width / 2
                    : y.winW / 2)),
              (o.lastWrapwidth === o.wrapwidth &&
                o.lastWrapheight === o.wrapheight) ||
                window.requestAnimationFrame(function () {
                  y.positionCarousel(e);
                });
          },
        }),
        function (e, t) {
          var i = y[e].carousel,
            t =
              t && y[e].slides[y[e].pr_next_key]
                ? jQuery(y[e].slides[y[e].pr_next_key])
                : y[e].pr_next_slide;
          y[e].c.trigger("revolution.slide.carouselchange", {
            slider: e,
            slideIndex: parseInt(y[e].pr_active_key, 0) + 1,
            slideLIIndex: y[e].pr_active_key,
            slide: t,
            currentslide: t,
            prevSlideIndex:
              void 0 !== y[e].pr_lastshown_key &&
              parseInt(y[e].pr_lastshown_key, 0) + 1,
            prevSlideLIIndex:
              void 0 !== y[e].pr_lastshown_key &&
              parseInt(y[e].pr_lastshown_key, 0),
            prevSlide: void 0 !== i.oldfocused && y[e].slides[i.oldfocused],
          });
        }),
      b = function (e, t) {
        var i = y[e].carousel;
        void 0 !== e &&
          void 0 !== i &&
          ((i.pDiv =
            "center" === t ? i.maxVisibleItems / 2 : i.maxVisibleItems),
          (i.edgeRatio =
            Math.floor(i.pDiv - ("center" === t ? 0 : 1)) / Math.ceil(i.pDiv)),
          1 === i.maxVisibleItems && (i.edgeRatio = 1),
          (i.oEdge =
            1 === i.maxOpacity
              ? 1
              : i.vary_fade
              ? 1 + (i.maxOpacity - 1) * i.edgeRatio
              : i.maxOpacity),
          (i.oEdge = 1 === i.maxVisibleItems ? i.maxOpacity : i.oEdge),
          (i.oRange =
            1 < i.maxVisibleItems
              ? tpGS.gsap.utils.mapRange(i.edgeRatio, 1, i.oEdge, 0)
              : tpGS.gsap.utils.mapRange(1, 1.1, i.oEdge, 0)),
          (i.oRangeMin = tpGS.gsap.utils.mapRange(
            -1 / i.maxVisibleItems,
            -1.1 / i.maxVisibleItems,
            1,
            0
          )));
      },
      g = function (e) {
        var t = y[e].carousel;
        if (void 0 !== e && void 0 !== t) {
          tpGS.gsap.set([t.proxy, t.follower], { x: "+=0", y: "+=0" }),
            (t.arr = []),
            (t.trackArr = []);
          for (var i = 0; i < y[e].slides.length; i++)
            t.arr.push({ elem: y[e].slides[i] }),
              t.trackArr.push({ elem: y[e].slides[i] });
        }
      },
      o = function (e, t) {
        return null === e || jQuery.isEmptyObject(e)
          ? t
          : void 0 === e
          ? "right"
          : e;
      };
    (window.RS_MODULES = window.RS_MODULES || {}),
      (window.RS_MODULES.carousel = { loaded: !0, version: "6.6.17" }),
      window.RS_MODULES.checkMinimal && window.RS_MODULES.checkMinimal();
  })(jQuery),
  !(function () {
    "use strict";
    function h(e) {
      var t;
      return void 0 === e
        ? ""
        : ((t = ""),
          Q.isChrome8889 && 0 === e.b_blur && (e.b_blur = 0.05),
          (t = void 0 !== e.b_blur ? "blur(" + (e.b_blur || 0) + "px)" : ""),
          (t =
            (t =
              (t =
                (t +=
                  void 0 !== e.b_grayscale
                    ? (0 < t.length ? " " : "") +
                      "grayscale(" +
                      (e.b_grayscale || 0) +
                      "%)"
                    : "") +
                (void 0 !== e.b_sepia
                  ? (0 < t.length ? " " : "") +
                    "sepia(" +
                    (e.b_sepia || 0) +
                    "%)"
                  : "")) +
              (void 0 !== e.b_invert
                ? (0 < t.length ? " " : "") +
                  "invert(" +
                  (e.b_invert || 0) +
                  "%)"
                : "")) +
            (void 0 !== e.b_brightness
              ? (0 < t.length ? " " : "") +
                "brightness(" +
                (e.b_brightness || 100) +
                "%)"
              : "")) || "none");
    }
    function m(e, t, i, a, r) {
      return (
        t && (t[a] = "true" === t[a] || t[a]),
        0 === Q[r].sdir ||
        void 0 === t ||
        ("mask" === i
          ? (a = "x" === a ? "mX" : "y" === a ? "mY" : a)
          : "chars" === i
          ? (a = "x" === a ? "cX" : "y" === a ? "cY" : "dir" === a ? "cD" : a)
          : "words" === i
          ? (a = "x" === a ? "wX" : "y" === a ? "wY" : "dir" === a ? "wD" : a)
          : "lines" === i &&
            (a = "x" === a ? "lX" : "y" === a ? "lY" : "dir" === a ? "lD" : a),
        void 0 === t[a]) ||
        !1 === t[a]
          ? e
          : void 0 !== t && !0 === t[a]
          ? "t" === e || "top" === e
            ? "b"
            : "b" === e || "bottom" === e
            ? "t"
            : "l" === e || "left" === e
            ? "r"
            : "r" === e || "right" === e
            ? "l"
            : -1 * parseFloat(e) +
              (0 <= ("" + e).indexOf("px")
                ? "px"
                : 0 <= ("" + e).indexOf("%")
                ? "%"
                : "")
          : void 0
      );
    }
    function d(e, t, i, a, r) {
      var o,
        s,
        n,
        l = {},
        d = {},
        c = {};
      for (n in ((a = void 0 === a ? "transform" : a),
      "loop" === r
        ? ((c.autoRotate = !1),
          (c.yoyo_filter = !1),
          (c.yoyo_rotate = !1),
          (c.yoyo_move = !1),
          (c.yoyo_scale = !1),
          (c.curved = !1),
          (c.curviness = 2),
          (c.ease = "none"),
          (c.speed = 1e3),
          (l.x = c.st = 0),
          (l.y = 0),
          (l.z = 0),
          (l.xr = 0),
          (l.yr = 0),
          (l.zr = 0),
          (l.scaleX = 1),
          (l.scaleY = 1),
          (l.originX = "50%"),
          (l.originY = "50%"),
          (l.originZ = "0"),
          (l.rotationX = "0deg"),
          (l.rotationY = "0deg"),
          (l.rotationZ = "0deg"))
        : ((c.speed = 300), i ? (c.ease = "default") : (l.ease = "default")),
      "sfx" === r && (l.fxc = "#ffffff"),
      (e = e.split(";"))))
        if (e.hasOwnProperty(n)) {
          var p = e[n].split(":");
          switch (p[0]) {
            case "u":
              l.use = "true" === p[1] || "t" === p[1] || fasle;
              break;
            case "c":
              o = p[1];
              break;
            case "fxc":
              l.fxc = p[1];
              break;
            case "bgc":
              s = p[1];
              break;
            case "auto":
              l.auto = "t" === p[1] || void 0 === p[1] || "true" === p[1];
              break;
            case "o":
              l.opacity = p[1];
              break;
            case "oX":
              l.originX = p[1];
              break;
            case "oY":
              l.originY = p[1];
              break;
            case "oZ":
              l.originZ = p[1];
              break;
            case "sX":
              l.scaleX = p[1];
              break;
            case "sY":
              l.scaleY = p[1];
              break;
            case "skX":
              l.skewX = p[1];
              break;
            case "skY":
              l.skewY = p[1];
              break;
            case "rX":
              (l.rotationX = p[1]),
                0 != p[1] && "0deg" !== p[1] && Q.addSafariFix(t);
              break;
            case "rY":
              (l.rotationY = p[1]),
                0 != p[1] && "0deg" !== p[1] && Q.addSafariFix(t);
              break;
            case "rZ":
              l.rotationZ = p[1];
              break;
            case "sc":
              l.color = p[1];
              break;
            case "se":
              l.effect = p[1];
              break;
            case "bos":
              l.borderStyle = p[1];
              break;
            case "boc":
              l.borderColor = p[1];
              break;
            case "td":
              l.textDecoration = p[1];
              break;
            case "zI":
              l.zIndex = p[1];
              break;
            case "tp":
              l.transformPerspective =
                "isometric" === Q[t].perspectiveType
                  ? 0
                  : "global" === Q[t].perspectiveType
                  ? Q[t].perspective
                  : p[1];
              break;
            case "cp":
              l.clip = parseInt(p[1], 0);
              break;
            case "cpb":
              l.clipB = parseInt(p[1], 0);
              break;
            case "aR":
              c.autoRotate = "t" == p[1];
              break;
            case "rA":
              c.radiusAngle = p[1];
              break;
            case "yyf":
              c.yoyo_filter = "t" == p[1];
              break;
            case "yym":
              c.yoyo_move = "t" == p[1];
              break;
            case "yyr":
              c.yoyo_rotate = "t" == p[1];
              break;
            case "yys":
              c.yoyo_scale = "t" == p[1];
              break;
            case "crd":
              c.curved = "t" == p[1];
              break;
            case "x":
              l.x =
                "reverse" === r
                  ? "t" === p[1] || !0 === p[1] || "true" == p[1]
                  : "loop" === r
                  ? parseInt(p[1], 0)
                  : Q.revToResp(p[1], Q[t].rle);
              break;
            case "y":
              l.y =
                "reverse" === r
                  ? "t" === p[1] || !0 === p[1] || "true" == p[1]
                  : "loop" === r
                  ? parseInt(p[1], 0)
                  : Q.revToResp(p[1], Q[t].rle);
              break;
            case "z":
              (l.z =
                "loop" === r ? parseInt(p[1], 0) : Q.revToResp(p[1], Q[t].rle)),
                0 != p[1] && Q.addSafariFix(t);
              break;
            case "bow":
              l.borderWidth = Q.revToResp(p[1], 4, 0)
                .toString()
                .replace(/,/g, " ");
              break;
            case "bor":
              l.borderRadius = Q.revToResp(p[1], 4, 0)
                .toString()
                .replace(/,/g, " ");
              break;
            case "m":
              l.mask = "t" === p[1] || ("f" !== p[1] && p[1]);
              break;
            case "iC":
              l.instantClick = "t" === p[1] || ("f" !== p[1] && p[1]);
              break;
            case "xR":
              (l.xr = parseInt(p[1], 0)), Q.addSafariFix(t);
              break;
            case "yR":
              (l.yr = parseInt(p[1], 0)), Q.addSafariFix(t);
              break;
            case "zR":
              l.zr = parseInt(p[1], 0);
              break;
            case "iosfx":
              "default" !== p[1] &&
                "d" !== p[1] &&
                "p" !== p[1] &&
                (d.iosfx = p[1]);
              break;
            case "blu":
              "loop" === r
                ? (l.blur = parseInt(p[1], 0))
                : (d.blur = parseInt(p[1], 0));
              break;
            case "gra":
              "loop" === r
                ? (l.grayscale = parseInt(p[1], 0))
                : (d.grayscale = parseInt(p[1], 0));
              break;
            case "bri":
              "loop" === r
                ? (l.brightness = parseInt(p[1], 0))
                : (d.brightness = parseInt(p[1], 0));
              break;
            case "bB":
              d.b_blur = parseInt(p[1], 0);
              break;
            case "bG":
              d.b_grayscale = parseInt(p[1], 0);
              break;
            case "bR":
              d.b_brightness = parseInt(p[1], 0);
              break;
            case "bI":
              d.b_invert = parseInt(p[1], 0);
              break;
            case "bS":
              d.b_sepia = parseInt(p[1], 0);
              break;
            case "sp":
              c.speed = parseInt(p[1], 0);
              break;
            case "d":
              l.delay = parseInt(p[1], 0);
              break;
            case "crns":
              c.curviness = parseInt(p[1], 0);
              break;
            case "st":
              (c.start = "w" === p[1] || "a" === p[1] ? "+=0" : p[1]),
                (c.waitoncall = "w" === p[1] || "a" === p[1]);
              break;
            case "sA":
              c.startAbsolute = p[1];
              break;
            case "sR":
              c.startRelative = p[1];
              break;
            case "e":
              i ? (c.ease = p[1]) : (l.ease = p[1]);
              break;
            default:
              0 < p[0].length &&
                (l[p[0]] = "t" === p[1] || ("f" !== p[1] && p[1]));
          }
        }
      var g = { timeline: c };
      return (
        jQuery.isEmptyObject(d) ||
          ("split" === r ? (l = jQuery.extend(!0, l, d)) : (g.filter = d)),
        "split" === r &&
          (l.dir =
            void 0 === l.dir
              ? "start"
              : "backward" === l.dir
              ? "end"
              : "middletoedge" === l.dir
              ? "center"
              : "edgetomiddle" === l.dir
              ? "edge"
              : l.dir),
        jQuery.isEmptyObject(o) || (g.color = o),
        jQuery.isEmptyObject(s) || (g.bgcolor = s),
        (g[a] = l),
        g
      );
    }
    function p(e) {
      return (
        void 0 !== e &&
        (void 0 !== e.rotationY || void 0 !== e.rotationX || void 0 !== e.z)
      );
    }
    function c(e) {
      return "thin" === (e = Q.isNumeric(e) ? e : e.toLowerCase())
        ? "00"
        : "extra light" === e
        ? 200
        : "light" === e
        ? 300
        : "normal" === e
        ? 400
        : "medium" === e
        ? 500
        : "semi bold" === e
        ? 600
        : "bold" === e
        ? 700
        : "extra bold" === e
        ? 800
        : "ultra bold" === e || "black" === e
        ? 900
        : e;
    }
    function k(e, t, i, a, r) {
      var o =
        Q.isNumeric(e) || void 0 === e
          ? ""
          : 0 <= e.indexOf("px")
          ? "px"
          : 0 <= e.indexOf("%")
          ? "%"
          : "";
      return (
        (e = Q.isNumeric(parseInt(e)) ? parseInt(e) : e),
        (e =
          null ==
          (e =
            "full" === (e = Q.isNumeric(e) ? e * t + o : e)
              ? a
              : "auto" === e || "none" === e
              ? i
              : e)
            ? r
            : e)
      );
    }
    function O(e) {
      return null != e && 0 !== parseInt(e, 0);
    }
    var q = ["chars", "words", "lines"],
      R = ["Top", "Right", "Bottom", "Left"],
      L = ["TopLeft", "TopRight", "BottomRight", "BottomLeft"],
      I = ["top", "right", "bottom", "left"],
      Q =
        ((jQuery.fn.revolution = jQuery.fn.revolution || {}),
        jQuery.fn.revolution),
      J =
        (jQuery.extend(!0, Q, {
          checkLayerDimensions: function (e) {
            var t,
              i,
              a,
              r = !1;
            for (t in Q[e.id].layers[e.skey])
              Q[e.id].layers[e.skey].hasOwnProperty(t) &&
                ((i = Q[e.id].layers[e.skey][t]),
                (a = Q[e.id]._L[i.id]).eow !== i.offsetWidth &&
                  "true" !== Q.gA(i, "vary-layer-dims") &&
                  (r = !0),
                (a.lastknownwidth = a.eow),
                (a.lastknownheight = a.eoh),
                a._slidelink ||
                  Q[e.id].caches.calcResponsiveLayersList.push({
                    a: Q[e.id]._L[i.id].c,
                    b: e.id,
                    c: 0,
                    d: a.rsp_bd,
                    e: e.slideIndex,
                  }));
            return r;
          },
          requestLayerUpdates: function (e, t, i, a) {
            var r, o;
            if (void 0 !== i) {
              var s = Q[e]._L[i],
                n = void 0 !== s._ligid ? Q[e]._L[s._ligid] : void 0;
              s.pVisRequest !== s.pVisStatus &&
                ((r =
                  null == n || !0 !== n.childrenAtStartNotVisible
                    ? ((s.pVisStatus = s.pVisRequest),
                      (n =
                        ("row" === s.type ||
                          "column" === s.type ||
                          "group" === s.type) &&
                        void 0 !== s.frames &&
                        void 0 !== s.frames.frame_999 &&
                        void 0 !== s.frames.frame_999.transform &&
                        "" + s.frames.frame_999.transform.opacity != "0"),
                      (o = 1 === s.pVisRequest ? "remove" : n ? o : "add"),
                      1 === s.pVisRequest ? "remove" : n ? "add" : r)
                    : ((o = "add"), "remove")),
                "group" === s.type &&
                  "add" == r &&
                  "hidden" ==
                    (1 === s.pVisStatus
                      ? "visible"
                      : 0 === s.pVisStatus
                      ? "hidden"
                      : s.pVisStatus) &&
                  (o = "add"),
                void 0 !== r && s.p[0].classList[r]("rs-forceuntouchable"),
                void 0 !== o) &&
                s.p[0].classList[o]("rs-forcehidden"),
                s.pPointerStatus !== s.pPeventsRequest &&
                  ((s.pPointerStatus = s.pPeventsRequest),
                  tpGS.gsap.set(s.p[0], {
                    pointerEvents: s.pPointerStatus,
                    visibility:
                      1 === s.pVisStatus
                        ? "visible"
                        : 0 === s.pVisStatus
                        ? "hidden"
                        : s.pVisStatus,
                  })),
                void 0 !== a &&
                  "ignore" !== a &&
                  0 !== a &&
                  (a++,
                  "enterstage" === t ||
                  "leavestage" === t ||
                  "framestarted" === t
                    ? Q.isFirefox(e)
                      ? -1 === s.p[0].style.transform.indexOf("perspective") &&
                        (s.p[0].style.transform +=
                          (0 === s.p[0].style.transform.length ? " " : "") +
                          "perspective(" +
                          a +
                          "px)")
                      : ((window.isSafari11 ||
                          !0 === s.maskHasPerspective ||
                          0 !== s.p[0].style.perspective.length) &&
                          "none" != s.p[0].style.perspective) ||
                        (s.p[0].style.perspective = a + "px")
                    : "frameended" === t &&
                      (Q.isFirefox(e)
                        ? (s.p[0].style.transform =
                            s.p[0].style.transform.replace(
                              "perspective(" + a + "px)",
                              ""
                            ))
                        : window.isSafari11 ||
                          (s.p[0].style.perspective =
                            s.p[0].style.perspective.replace(
                              a - 1 + "px",
                              ""
                            ))));
            } else
              for (var l in Q[e]._L)
                Q[e]._L.hasOwnProperty(l) &&
                  (Q[e]._L[l].pVisRequest !== Q[e]._L[l].pVisStatus &&
                    ((Q[e]._L[l].pVisStatus = Q[e]._L[l].pVisRequest),
                    0 === Q[e]._L[l].pVisStatus
                      ? Q[e]._L[l].p[0].classList.add("rs-forcehidden")
                      : Q[e]._L[l].p[0].classList.remove("rs-forcehidden")),
                  Q[e]._L[l].pPointerStatus !== Q[e]._L[l].pPeventsRequest) &&
                  ((Q[e]._L[l].pPointerStatus = Q[e]._L[l].pPeventsRequest),
                  tpGS.gsap.set(Q[e]._L[l].p[0], {
                    pointerEvents: Q[e]._L[l].pPointerStatus,
                    visibility: Q[e]._L[l].pVisStatus,
                  }));
            "enterstage" === t &&
              void 0 !== i &&
              void 0 !== Q[e]._L[i].esginside &&
              0 < Q[e]._L[i].esginside.length &&
              void 0 !== Q[e]._L[i].esginside.esredraw &&
              Q[e]._L[i].esginside.esredraw();
          },
          updateMiddleZonesAndESG: function (e) {
            var t,
              i = Q[e].pr_processing_key || Q[e].pr_active_key || 0;
            if (
              Q[e].middleZones &&
              0 < Q[e].middleZones.length &&
              void 0 !== Q[e].middleZones[i]
            )
              for (t = 0; t < Q[e].middleZones[i].length; t++)
                tpGS.gsap.set(Q[e].middleZones[i][t], {
                  y:
                    Math.round(
                      Q[e].module.height / 2 -
                        Q[e].middleZones[i][t].offsetHeight / 2
                    ) + "px",
                });
            if (Q[e].smiddleZones && 0 < Q[e].smiddleZones.length)
              for (t = 0; t < Q[e].smiddleZones.length; t++)
                tpGS.gsap.set(Q[e].smiddleZones[t], {
                  y:
                    Math.round(
                      Q[e].module.height / 2 -
                        Q[e].smiddleZones[t].offsetHeight / 2
                    ) + "px",
                });
          },
          getRowHeights: function (e, t) {
            if (!Q[e].firstLayerCalculated)
              return { cur: 0, last: 0, cache: [], tz: 0 };
            var i = 0,
              a = 0,
              r = 0,
              o =
                void 0 !== t
                  ? t
                  : Q[e].pr_processing_key || Q[e].pr_active_key || 0,
              s = void 0 !== t ? t : Q[e].pr_active_key || 0;
            if (
              ((Q[e].rowMiddleHeights =
                null == Q[e].rowMiddleHeights ? {} : Q[e].rowMiddleHeights),
              (Q[e].rowMiddleHeights[o] = 0),
              Q[e].rowzones && 0 < Q[e].rowzones.length)
            ) {
              if (void 0 !== Q[e].rowzones[o])
                for (var n = 0; n < Q[e].rowzones[o].length; n++)
                  (Q[e].rowzonesHeights[o][n] =
                    Q[e].rowzones[o][n][0].offsetHeight),
                    (i += Q[e].rowzonesHeights[o][n]),
                    "true" == Q[e].rowzones[o][n][0].dataset.middle &&
                      (Q[e].rowMiddleHeights[o] += Q[e].rowzonesHeights[o][n]);
              if (s !== o)
                for (
                  n = Q[e].rowMiddleHeights[s] = 0;
                  n < Q[e].rowzones[s].length;
                  n++
                )
                  (Q[e].rowzonesHeights[s][n] =
                    Q[e].rowzones[s][n][0].offsetHeight),
                    (a += Q[e].rowzonesHeights[s][n]),
                    "true" == Q[e].rowzones[s][n][0].dataset.middle &&
                      (Q[e].rowMiddleHeights[s] += Q[e].rowzonesHeights[s][n]);
            }
            if (Q[e].srowzones && 0 < Q[e].srowzones.length)
              for (
                n = Q[e].rowMiddleHeights.static = 0;
                n < Q[e].srowzones.length;
                n++
              )
                (r += Q[e].srowzones[n][0].offsetHeight),
                  "true" == Q[e].srowzones[n][0].dataset.middle &&
                    (Q[e].rowMiddleHeights.static +=
                      Q[e].srowzones[n][0].offsetHeight);
            var i = i < r ? r : i,
              t = void 0 === Q[e].rowHeights ? [] : Q[e].rowHeights.cache,
              l = new Date().getTime();
            return (
              void 0 !== Q[e].rowHeights && l - Q[e].rowHeights.tz < 300
                ? 5 < Q[e].rowHeights.cache.length &&
                  ((i =
                    Q[e].rowHeights.cache[Q[e].rowHeights.cache.length - 1] ===
                    i
                      ? Q[e].rowHeights.cache[Q[e].rowHeights.cache.length - 2]
                      : Q[e].rowHeights.cache[
                          Q[e].rowHeights.cache.length - 1
                        ]),
                  (l = Q[e].rowHeights.tz))
                : (t = []),
              { cur: i, last: a, cache: t, tz: l }
            );
          },
          getGridOffset: function (e, t, i, a) {
            var r =
                "grid" === i || "carousel" !== Q[e].sliderType || a
                  ? Q[e].canv.width
                  : Q[e].carousel.slide_width,
              o = (
                Q[e].useFullScreenHeight
                  ? Q[e].module
                  : "grid" === i
                  ? Q[e].content
                  : "carousel" !== Q[e].sliderType || a
                  ? Q[e].module
                  : Q[e].canv
              ).height,
              s =
                "slide" === i ||
                ("carousel" == Q[e].sliderType &&
                  "v" == Q[e].carousel.orientation)
                  ? 0
                  : Math.max(
                      0,
                      "fullscreen" == Q[e].sliderLayout
                        ? Q[e].module.height / 2 -
                            (Q.iHE(e) * (Q[e].keepBPHeight ? 1 : Q[e].CM.h)) / 2
                        : Q[e].autoHeight ||
                          (null != Q[e].minHeight && 0 < Q[e].minHeight) ||
                          Q[e].keepBPHeight
                        ? Q[e].canv.height / 2 - (Q.iHE(e) * Q[e].CM.h) / 2
                        : 0
                    ),
              t =
                "slide" === i
                  ? 0
                  : Math.max(
                      0,
                      "carousel" === Q[e].sliderType &&
                        "v" !== Q[e].carousel.orientation
                        ? 0
                        : Q[e].canv.width / 2 - (Q.iWA(e, t) * Q[e].CM.w) / 2
                    );
            return [
              r,
              o,
              (t =
                "slide" !== i &&
                "carousel" === Q[e].sliderType &&
                a &&
                void 0 !== Q[e].carousel &&
                void 0 !== Q[e].carousel.horizontal_align
                  ? Math.max(
                      0,
                      "center" === Q[e].carousel.horizontal_align
                        ? 0 +
                            (Q[e].module.width -
                              Q.iWA(e, "static") * Q[e].CM.w) /
                              2
                        : "right" === Q[e].carousel.horizontal_align
                        ? Q[e].module.width -
                          Q[e].gridwidth[Q[e].level] * Q[e].CM.w
                        : t
                    )
                  : t),
              s,
            ];
          },
          initLayer: function (t) {
            var i,
              a,
              r,
              e,
              o = t.id,
              s = t.skey;
            for (e in Q[o].layers[t.skey])
              if (Q[o].layers[t.skey].hasOwnProperty(e)) {
                var n = Q[o].layers[t.skey][e],
                  l = jQuery(n),
                  d = Q.gA(n, "initialised"),
                  c = d ? Q[o]._L[n.id] : l.data();
                if (
                  ("individual" === t.skey &&
                    ((c.slideKey =
                      void 0 === c.slideKey
                        ? Q.gA(l.closest("rs-slide")[0], "key")
                        : c.slideKey),
                    (c.slideIndex =
                      void 0 === c.slideIndex
                        ? Q.getSlideIndex(o, c.slideKey)
                        : c.slideIndex),
                    (t.slideIndex = c.slideIndex),
                    (s = c.slideKey)),
                  void 0 === d)
                ) {
                  if (
                    (Q.revCheckIDS(o, n),
                    ((Q[o]._L[n.id] = c).ford =
                      void 0 === c.ford ? "frame_0;frame_1;frame_999" : c.ford),
                    (c.ford =
                      ";" == c.ford[c.ford.length - 1]
                        ? c.ford.substring(0, c.ford.length - 1)
                        : c.ford),
                    (c.ford = c.ford.split(";")),
                    void 0 !== c.clip)
                  )
                    for (i in ((c.clipPath = {
                      use: !1,
                      origin: "l",
                      type: "rectangle",
                    }),
                    (c.clip = c.clip.split(";")),
                    c.clip))
                      c.clip.hasOwnProperty(i) &&
                        ("u" == (a = c.clip[i].split(":"))[0] &&
                          (c.clipPath.use = "true" == a[1]),
                        "o" == a[0] && (c.clipPath.origin = a[1]),
                        "t" == a[0]) &&
                        (c.clipPath.type = a[1]);
                  (c.frames = M(c, o)),
                    (c.caches = {}),
                    (c.OBJUPD = {}),
                    (c.c = l),
                    (c.p = Q[o]._Lshortcuts[n.id].p),
                    (c.lp = c.reqWrp.loop ? Q[o]._Lshortcuts[n.id].lp : void 0),
                    (c.m = c.reqWrp.mask ? Q[o]._Lshortcuts[n.id].m : void 0),
                    (c.triggercache =
                      void 0 === c.triggercache ? "reset" : c.triggercache),
                    (c.rsp_bd =
                      void 0 === c.rsp_bd
                        ? "column" === c.type || "row" === c.type
                          ? "off"
                          : "on"
                        : c.rsp_bd),
                    (c.rsp_o = void 0 === c.rsp_o ? "on" : c.rsp_o),
                    (c.basealign =
                      void 0 === c.basealign ? "grid" : c.basealign);
                  let e;
                  if (
                    ((c.group =
                      ("group" !== c.type &&
                        null !== (e = Q.closestNode(l[0], "RS-GROUP"))) ||
                      ("group" === c.type &&
                        null !==
                          (e = Q.closestNode(l[0].parentNode, "RS-GROUP")))
                        ? "group"
                        : "column" !== c.type &&
                          null !== (e = Q.closestNode(l[0], "RS-COLUMN"))
                        ? "column"
                        : "row" !== c.type &&
                          null !== (e = Q.closestNode(l[0], "RS-ROW"))
                        ? "row"
                        : void 0),
                    (c._lig = null !== e && void 0 !== e ? jQuery(e) : void 0),
                    (c._ligid = void 0 !== c._lig ? c._lig[0].id : void 0),
                    (c._column =
                      "RS-COLUMN" === l[0].tagName
                        ? jQuery(Q.closestNode(l[0], "RS-COLUMN-WRAP"))
                        : "none"),
                    (c._row =
                      "RS-COLUMN" === l[0].tagName &&
                      jQuery(Q.closestNode(l[0], "RS-ROW"))),
                    (c._ingroup = "group" === c.group),
                    (c._incolumn = "column" === c.group),
                    (c._inrow = "row" === c.group),
                    (c.fsom = "true" == c.fsom || 1 == c.fsom),
                    (c.fullinset = "" + c.fullinset == "true"),
                    (c.position =
                      void 0 !== c.pos
                        ? "r" == c.pos
                          ? "relative"
                          : "absolute"
                        : c._incolumn
                        ? "relative"
                        : "absolute"),
                    (c._ingroup || c._incolumn) &&
                      0 <= c._lig[0].className.indexOf("rs-sba") &&
                      (!1 !== c.animationonscroll ||
                        void 0 === c.frames.loop) &&
                      !0 !== c.animOnScrollForceDisable &&
                      ((c.animationonscroll = !0),
                      (l[0].className += " rs-sba"),
                      (Q[o].sbas[s][n.id] = l[0])),
                    (c.animOnScrollRepeats = 0),
                    (c._isgroup = "RS-GROUP" === l[0].tagName),
                    (c.type = c.type || "none"),
                    "row" === c.type &&
                      (void 0 === c.cbreak && (c.cbreak = 2),
                      void 0 === c.zone) &&
                      ((c.zone = Q.closestNode(l[0], "RS-ZONE")),
                      (c.zone =
                        null !== c.zone && void 0 !== c.zone
                          ? c.zone.className
                          : "")),
                    (c.esginside = jQuery(
                      l[0].getElementsByClassName("esg-grid")[0]
                    )),
                    (c._isnotext =
                      -1 !==
                      jQuery.inArray(c.type, [
                        "video",
                        "image",
                        "audio",
                        "shape",
                        "row",
                        "group",
                      ])),
                    (c._mediatag = "html5" == c.audio ? "audio" : "video"),
                    (c.img = l.find("img")),
                    (c.deepiframe = Q.getByTag(l[0], "iframe")),
                    (c.deepmedia = Q.getByTag(l[0], c._mediatag)),
                    (c.layertype =
                      "image" === c.type
                        ? "image"
                        : 0 <= l[0].className.indexOf("rs-layer-video") ||
                          0 <= l[0].className.indexOf("rs-layer-audio") ||
                          (0 < c.deepiframe.length &&
                            (0 <
                              c.deepiframe[0].src
                                .toLowerCase()
                                .indexOf("youtube") ||
                              0 <
                                c.deepiframe[0].src
                                  .toLowerCase()
                                  .indexOf("vimeo"))) ||
                          0 < c.deepmedia.length
                        ? "video"
                        : "html"),
                    0 < c.deepiframe.length &&
                      Q.sA(c.deepiframe[0], "layertype", c.layertype),
                    "column" === c.type &&
                      c.cbgexists &&
                      ((c.cbg = jQuery(Q.getByTag(c.p[0], "RS-COLUMN-BG")[0])),
                      (c.cbgmask = jQuery(
                        Q.getByTag(c.p[0], "RS-CBG-MASK-WRAP")[0]
                      ))),
                    (c._slidelink = 0 <= l[0].className.indexOf("slidelink")),
                    (c._isstatic =
                      0 <= l[0].className.indexOf("rs-layer-static")),
                    (c.slidekey = c._isstatic ? "staticlayers" : s),
                    (c._togglelisteners =
                      0 <
                      l[0].getElementsByClassName("rs-toggled-content").length),
                    "text" === c.type &&
                      (-1 !==
                        c.c[0].innerHTML.indexOf("{{total_slide_count}}") &&
                        (c.c[0].innerHTML = c.c[0].innerHTML.replace(
                          "{{total_slide_count}}",
                          Q[o].realslideamount
                        )),
                      0 <=
                        c.c[0].innerHTML.indexOf("{{current_slide_index}}")) &&
                      (c._isstatic
                        ? ((c.metas = c.metas || {}),
                          (c.metas.csi = {}),
                          (c.c[0].innerHTML = c.c[0].innerHTML.replace(
                            "{{current_slide_index}}",
                            "<cusli>" + Q[o].realslideamount + "</cusli>"
                          )),
                          (c.metas.csi.c =
                            c.c[0].getElementsByTagName("CUSLI")[0]))
                        : ((h = parseInt(t.slideIndex) + 1),
                          (c.c[0].innerHTML = c.c[0].innerHTML.replace(
                            "{{current_slide_index}}",
                            (h < 10 && 9 < Q[o].realslideamount ? "0" : "") + h
                          )))),
                    (c.bgcol =
                      void 0 === c.bgcol
                        ? 0 <= l[0].style.background.indexOf("gradient")
                          ? l[0].style.background
                          : l[0].style.backgroundColor
                        : c.bgcol),
                    (c.bgcol = "" === c.bgcol ? "rgba(0, 0, 0, 0)" : c.bgcol),
                    (c.bgcol =
                      0 === c.bgcol.indexOf("rgba(0, 0, 0, 0)") &&
                      18 < c.bgcol.length
                        ? c.bgcol.replace("rgba(0, 0, 0, 0)", "")
                        : c.bgcol),
                    (c.zindex =
                      void 0 === c.zindex
                        ? parseInt(l[0].style.zIndex)
                        : parseInt(c.zindex)),
                    c._isgroup &&
                      (c.frames.frame_1.timeline.waitoncall &&
                        (c.childrenAtStartNotVisible = !0),
                      (c.pVisRequest = 0)),
                    c._togglelisteners &&
                      l.on("click", function () {
                        Q.swaptoggleState([this.id]);
                      }),
                    void 0 !== c.border)
                  )
                    for (i in ((c.border = c.border.split(";")),
                    (c.bordercolor = "transparent"),
                    c.border))
                      if (c.border.hasOwnProperty(i))
                        switch ((a = c.border[i].split(":"))[0]) {
                          case "boc":
                            c.bordercolor = a[1];
                            break;
                          case "bow":
                            c.borderwidth = Q.revToResp(a[1], 4, 0);
                            break;
                          case "bos":
                            c.borderstyle = Q.revToResp(a[1], 4, 0);
                            break;
                          case "bor":
                            c.borderradius = Q.revToResp(a[1], 4, 0);
                        }
                  if (
                    ("svg" === c.type &&
                      ((c.svg = l.find("svg")),
                      (c.svgI = S(c.svgi, o)),
                      (c.svgPath = c.svg.find(
                        c.svgI.svgAll
                          ? "path, circle, ellipse, line, polygon, polyline, rect"
                          : "path"
                      )),
                      (c.svgH =
                        void 0 !== c.svgi && -1 === c.svgi.indexOf("oc:t")
                          ? S(c.svgh, o)
                          : {})),
                    void 0 !== c.btrans)
                  ) {
                    var p = c.btrans;
                    for (i in ((c.btrans = { rX: 0, rY: 0, rZ: 0, o: 1 }),
                    (p = p.split(";"))))
                      if (p.hasOwnProperty(i))
                        switch ((a = p[i].split(":"))[0]) {
                          case "rX":
                            c.btrans.rX = a[1];
                            break;
                          case "rY":
                            c.btrans.rY = a[1];
                            break;
                          case "rZ":
                            c.btrans.rZ = a[1];
                            break;
                          case "o":
                            c.btrans.o = a[1];
                            break;
                          case "iosfx":
                            c.iOSFix =
                              "default" == a[1]
                                ? "d"
                                : "r" == a[1]
                                ? "rotationX"
                                : "p" == a[1]
                                ? "d"
                                : a[1];
                        }
                  }
                  if (void 0 !== c.tsh)
                    for (i in ((c.tshadow = {
                      c: "rgba(0,0,0,0.25)",
                      v: 0,
                      h: 0,
                      b: 0,
                    }),
                    (c.tsh = c.tsh.split(";")),
                    c.tsh))
                      if (c.tsh.hasOwnProperty(i))
                        switch ((a = c.tsh[i].split(":"))[0]) {
                          case "c":
                            c.tshadow.c = a[1];
                            break;
                          case "h":
                            c.tshadow.h = a[1];
                            break;
                          case "v":
                            c.tshadow.v = a[1];
                            break;
                          case "b":
                            c.tshadow.b = a[1];
                        }
                  if (void 0 !== c.tst)
                    for (i in ((c.tstroke = { c: "rgba(0,0,0,0.25)", w: 1 }),
                    (c.tst = c.tst.split(";")),
                    c.tst))
                      if (c.tst.hasOwnProperty(i))
                        switch ((a = c.tst[i].split(":"))[0]) {
                          case "c":
                            c.tstroke.c = a[1];
                            break;
                          case "w":
                            c.tstroke.w = a[1];
                        }
                  if (void 0 !== c.bsh)
                    for (i in ((c.bshadow = {
                      e: "c",
                      c: "rgba(0,0,0,0.25)",
                      v: 0,
                      h: 0,
                      b: 0,
                      s: 0,
                    }),
                    (c.bsh = c.bsh.split(";")),
                    c.bsh))
                      if (c.bsh.hasOwnProperty(i))
                        switch ((a = c.bsh[i].split(":"))[0]) {
                          case "c":
                            c.bshadow.c = a[1];
                            break;
                          case "h":
                            c.bshadow.h = a[1];
                            break;
                          case "v":
                            c.bshadow.v = a[1];
                            break;
                          case "b":
                            c.bshadow.b = a[1];
                            break;
                          case "s":
                            c.bshadow.s = a[1];
                            break;
                          case "e":
                            c.bshadow.e = a[1];
                        }
                  if (void 0 !== c.dim)
                    for (i in ((c.dim = c.dim.split(";")), c.dim))
                      if (c.dim.hasOwnProperty(i))
                        switch ((a = c.dim[i].split(":"))[0]) {
                          case "w":
                            c.width = a[1];
                            break;
                          case "h":
                            c.height = a[1];
                            break;
                          case "maxw":
                            c.maxwidth = a[1];
                            break;
                          case "maxh":
                            c.maxheight = a[1];
                            break;
                          case "minw":
                            c.minwidth = a[1];
                            break;
                          case "minh":
                            c.minheight = a[1];
                        }
                  if (
                    void 0 !== c.xy &&
                    "row" !== c.type &&
                    "column" !== c.type
                  )
                    for (i in ((c.xy = c.xy.split(";")), c.xy))
                      if (c.xy.hasOwnProperty(i))
                        switch ((a = c.xy[i].split(":"))[0]) {
                          case "x":
                            c.x = a[1].replace("px", "");
                            break;
                          case "y":
                            c.y = a[1].replace("px", "");
                            break;
                          case "xo":
                            c.hoffset = a[1].replace("px", "");
                            break;
                          case "yo":
                            c.voffset = a[1].replace("px", "");
                        }
                  if (c._isnotext || void 0 === c.text)
                    if (c._isgroup && void 0 !== c.text)
                      for (i in ((c.text = c.text.split(";")), c.text))
                        c.text.hasOwnProperty(i) &&
                          "a" === (a = c.text[i].split(":"))[0] &&
                          (c.textalign = a[1]);
                    else
                      "column" === c.type &&
                        void 0 !== c.textDecoration &&
                        delete c.textDecoration;
                  else
                    for (i in ((c.text = c.text.split(";")), c.text))
                      if (c.text.hasOwnProperty(i))
                        switch ((a = c.text[i].split(":"))[0]) {
                          case "w":
                            c.whitespace = a[1];
                            break;
                          case "td":
                            c.textDecoration = a[1];
                            break;
                          case "c":
                            c.clear = a[1];
                            break;
                          case "f":
                            c.float = a[1];
                            break;
                          case "s":
                            c.fontsize = a[1];
                            break;
                          case "l":
                            c.lineheight = a[1];
                            break;
                          case "ls":
                            c.letterspacing = a[1];
                            break;
                          case "fw":
                            c.fontweight = a[1];
                            break;
                          case "a":
                            c.textalign = a[1];
                        }
                  if (void 0 !== c.flcr)
                    for (i in ((c.flcr = c.flcr.split(";")), c.flcr))
                      if (c.flcr.hasOwnProperty(i))
                        switch ((a = c.flcr[i].split(":"))[0]) {
                          case "c":
                            c.clear = a[1];
                            break;
                          case "f":
                            c.float = a[1];
                        }
                  if (void 0 !== c.padding)
                    for (i in ((c.padding = c.padding.split(";")), c.padding))
                      if (c.padding.hasOwnProperty(i))
                        switch ((a = c.padding[i].split(":"))[0]) {
                          case "t":
                            c.paddingtop = a[1];
                            break;
                          case "b":
                            c.paddingbottom = a[1];
                            break;
                          case "l":
                            c.paddingleft = a[1];
                            break;
                          case "r":
                            c.paddingright = a[1];
                        }
                  if (void 0 !== c.margin)
                    for (i in ((c.margin = c.margin.split(";")), c.margin))
                      if (c.margin.hasOwnProperty(i))
                        switch ((a = c.margin[i].split(":"))[0]) {
                          case "t":
                            c.margintop = a[1];
                            break;
                          case "b":
                            c.marginbottom = a[1];
                            break;
                          case "l":
                            c.marginleft = a[1];
                            break;
                          case "r":
                            c.marginright = a[1];
                        }
                  if (
                    (void 0 !== c.spike && (c.spike = C(c.spike)),
                    void 0 !== c.corners)
                  )
                    for (i in ((r = c.corners.split(";")), (c.corners = {}), r))
                      r.hasOwnProperty(i) &&
                        0 < r[i].length &&
                        ((c.corners[r[i]] = jQuery(
                          "<" + r[i] + "></" + r[i] + ">"
                        )),
                        c.c.append(c.corners[r[i]]));
                  (c.textalign = x(c.textalign)),
                    (c.vbility = Q.revToResp(c.vbility, Q[o].rle, !0)),
                    (c.hoffset = Q.revToResp(c.hoffset, Q[o].rle, 0)),
                    (c.voffset = Q.revToResp(c.voffset, Q[o].rle, 0)),
                    (c.x = Q.revToResp(c.x, Q[o].rle, "l")),
                    (c.y = Q.revToResp(c.y, Q[o].rle, "t")),
                    T(l, 0, o),
                    Q.sA(n, "initialised", !0),
                    Q[o].c.trigger("layerinitialised", {
                      layer: l[0].id,
                      slider: o,
                    });
                }
                var g,
                  u,
                  h,
                  m,
                  d = c.x[Q[o].level],
                  n = c.y[Q[o].level],
                  v = Q.getGridOffset(
                    o,
                    t.slideIndex,
                    c.basealign,
                    c._isstatic
                  ),
                  f = v[0],
                  y = v[1],
                  w = v[2],
                  v = v[3];
                if (
                  ((c.slideIndex = t.slideIndex),
                  "updateposition" !== t.mode &&
                    (0 == c.vbility[Q[o].levelForced] ||
                    "f" == c.vbility[Q[o].levelForced] ||
                    (f < Q[o].hideLayerAtLimit && "on" == c.layeronlimit) ||
                    f < Q[o].hideAllLayerAtLimit
                      ? (!0 !== c.layerIsHidden &&
                          c.p[0].classList.add("rs-layer-hidden"),
                        (c.layerIsHidden = !0))
                      : (c.layerIsHidden &&
                          c.p[0].classList.remove("rs-layer-hidden"),
                        (c.layerIsHidden = !1)),
                    (c.poster =
                      null == c.poster && void 0 !== c.thumbimage
                        ? c.thumbimage
                        : c.poster),
                    "image" === c.layertype
                      ? ((c.imgOBJ = {}),
                        "cover-proportional" === c.img.data("c")
                          ? (Q.sA(
                              c.img[0],
                              "owidth",
                              Q.gA(c.img[0], "owidth", c.img[0].width)
                            ),
                            Q.sA(
                              c.img[0],
                              "oheight",
                              Q.gA(c.img[0], "oheight", c.img[0].height)
                            ),
                            (u =
                              Q.gA(c.img[0], "owidth") /
                              Q.gA(c.img[0], "oheight")),
                            (g =
                              c.img[0].width <= c.img[0].height
                                ? y / f
                                : f / y),
                            (c.imgOBJ =
                              (g < u && u <= 1) || (u < g && 1 < u)
                                ? {
                                    width: "100%",
                                    height: "auto",
                                    left:
                                      "c" === d || "center" === d
                                        ? "50%"
                                        : "left" === d || "l" === d
                                        ? "0"
                                        : "auto",
                                    right:
                                      "r" === d || "right" === d ? "0" : "auto",
                                    top:
                                      "c" === n ||
                                      "center" === n ||
                                      "middle" === n ||
                                      "m" === n
                                        ? "50%"
                                        : "top" === n || "t" === n
                                        ? "0"
                                        : "auto",
                                    bottom:
                                      "b" === n || "bottom" === n
                                        ? "0"
                                        : "auto",
                                    x:
                                      "c" === d ||
                                      "center" === d ||
                                      "middle" === d ||
                                      "m" === d
                                        ? "-50%"
                                        : "0",
                                    y:
                                      "c" === n ||
                                      "center" === n ||
                                      "middle" === n ||
                                      "m" === n
                                        ? "-50%"
                                        : "0",
                                  }
                                : {
                                    height: "100%",
                                    width: "auto",
                                    left:
                                      "c" === d || "center" === d
                                        ? "50%"
                                        : "left" === d || "l" === d
                                        ? "0"
                                        : "auto",
                                    right:
                                      "r" === d || "right" === d ? "0" : "auto",
                                    top:
                                      "c" === n ||
                                      "center" === n ||
                                      "middle" === n ||
                                      "m" === n
                                        ? "50%"
                                        : "top" === n || "t" === n
                                        ? "0"
                                        : "auto",
                                    bottom:
                                      "b" === n || "bottom" === n
                                        ? "0"
                                        : "auto",
                                    x:
                                      "c" === d ||
                                      "center" === d ||
                                      "middle" === d ||
                                      "m" === d
                                        ? "-50%"
                                        : "0",
                                    y:
                                      "c" === n ||
                                      "center" === n ||
                                      "middle" === n ||
                                      "m" === n
                                        ? "-50%"
                                        : "0",
                                  }))
                          : (void 0 === c.group &&
                              "auto" === c.width[Q[o].level] &&
                              "auto" === c.height[Q[o].level] &&
                              ((c.width[Q[o].level] = Q.gA(
                                c.img[0],
                                "owidth",
                                c.img[0].width
                              )),
                              (c.height[Q[o].level] = Q.gA(
                                c.img[0],
                                "owidth",
                                c.img[0].height
                              ))),
                            (c.imgOBJ = {
                              width:
                                "auto" !== c.width[Q[o].level] ||
                                (isNaN(c.width[Q[o].level]) &&
                                  0 <= c.width[Q[o].level].indexOf("%"))
                                  ? "100%"
                                  : "auto",
                              height:
                                "auto" !== c.height[Q[o].level] ||
                                (isNaN(c.height[Q[o].level]) &&
                                  0 <= c.height[Q[o].level].indexOf("%"))
                                  ? "100%"
                                  : "auto",
                            })))
                      : "video" === c.layertype &&
                        (Q.manageVideoLayer(l, o, s),
                        "rebuild" !== t.mode && Q.resetVideo(l, o, t.mode),
                        null != c.aspectratio &&
                          1 < c.aspectratio.split(":").length &&
                          1 == c.bgvideo &&
                          Q.prepareCoveredVideo(o, l),
                        (c.media =
                          void 0 === c.media
                            ? 0 < c.deepiframe.length
                              ? jQuery(c.deepiframe[0])
                              : jQuery(c.deepmedia[0])
                            : c.media),
                        (c.html5vid =
                          void 0 === c.html5vid
                            ? !(0 < c.deepiframe.length)
                            : c.html5vid),
                        (c.mediaOBJ = { display: "block" }),
                        (g = c.width[Q[o].level]),
                        (u = c.height[Q[o].level]),
                        (g =
                          "auto" === g
                            ? g
                            : !Q.isNumeric(g) && 0 < g.indexOf("%")
                            ? c._incolumn || c._ingroup
                              ? "100%"
                              : "grid" === c.basealign
                              ? (Q.iWA(o, t.slideIndex) *
                                  Q[o].CM.w *
                                  parseFloat(g)) /
                                100
                              : (f * parseFloat(g)) / 100
                            : "off" !== c.rsp_bd
                            ? parseFloat(g) * Q[o].CM.w + "px"
                            : parseFloat(g) + "px"),
                        (u =
                          "auto" === u
                            ? u
                            : !Q.isNumeric(u) && 0 < u.indexOf("%")
                            ? "grid" === c.basealign
                              ? Q.iHE(o) * Q[o].CM.w
                              : y
                            : "off" !== c.rsp_bd
                            ? parseFloat(u) * Q[o].CM.h + "px"
                            : parseFloat(u) + "px"),
                        (c.vd =
                          void 0 === c.vd
                            ? 1 < Q[o].videos[l[0].id].ratio.split(":").length
                              ? Q[o].videos[l[0].id].ratio.split(":")[0] /
                                Q[o].videos[l[0].id].ratio.split(":")[1]
                              : 1
                            : c.vd),
                        !c._incolumn ||
                        ("100%" !== g && "auto" !== u) ||
                        void 0 === c.ytid
                          ? (-1 == l[0].className.indexOf("rs-fsv")
                              ? ((u =
                                  "auto" === u &&
                                  void 0 !== c.vd &&
                                  "auto" !== g
                                    ? "100%" === g
                                      ? l.width() / c.vd
                                      : g / c.vd
                                    : u),
                                (c.vidOBJ = { width: g, height: u }))
                              : ("grid" !== c.basealign && (v = w = 0),
                                (c.x = Q.revToResp(0, Q[o].rle, 0)),
                                (c.y = Q.revToResp(0, Q[o].rle, 0)),
                                (c.vidOBJ = {
                                  width: g,
                                  height: Q[o].autoHeight
                                    ? Q[o].canv.height
                                    : u,
                                })),
                            (0 != c.html5vid && l.hasClass("rs-fsv")) ||
                              (c.mediaOBJ = {
                                width: g,
                                height: u,
                                display: "block",
                              }),
                            c._ingroup &&
                              null !== c.vidOBJ.width &&
                              void 0 !== c.vidOBJ.width &&
                              !Q.isNumeric(c.vidOBJ.width) &&
                              0 < c.vidOBJ.width.indexOf("%") &&
                              (c.OBJUPD.lppmOBJ = { minWidth: g }))
                          : ((m = l.width()),
                            (m = "auto" === u ? m / c.vd : u),
                            (c.vidOBJ = { width: "auto", height: m }),
                            (c.heightSetByVideo = !0))),
                    c._slidelink ||
                      Q[o].caches.calcResponsiveLayersList.push({
                        a: l,
                        b: o,
                        c: 0,
                        d: c.rsp_bd,
                        e: t.slideIndex,
                      }),
                    "on" === c.rsp_ch) &&
                    "row" !== c.type &&
                    "column" !== c.type &&
                    "group" !== c.type &&
                    "image" !== c.type &&
                    "video" !== c.type &&
                    "shape" !== c.type &&
                    l.find("*").each(function () {
                      var e = jQuery(this);
                      "true" !== Q.gA(this, "stylerecorder") &&
                        !0 !== Q.gA(this, "stylerecorder") &&
                        T(e, "rekursive", o),
                        Q[o].caches.calcResponsiveLayersList.push({
                          a: e,
                          b: o,
                          c: "rekursive",
                          d: c.rsp_bd,
                          e: t.slideIndex,
                          RSL: l,
                        });
                    }),
                  "preset" !== t.mode)
                ) {
                  if (
                    ((c.oldeow = c.eow),
                    (c.oldeoh = c.eoh),
                    (c.eow = l.outerWidth(!0)),
                    (c.eoh = l.outerHeight(!0)),
                    0 == c.eoh &&
                      "group" == c.type &&
                      "auto" == c.height[Q[o].level] &&
                      (c.eoh = c.p[0].offsetHeight),
                    void 0 !== c.metas &&
                      void 0 !== c.metas.csi &&
                      c.metas.csi.change !== Q[o].focusedSlideIndex &&
                      ((c.metas.csi.change = Q[o].focusedSlideIndex),
                      (h = parseInt(c.metas.csi.change) + 1),
                      (c.metas.csi.c.innerHTML =
                        (9 < Q[o].realslideamount && h < 10 ? "0" : "") + h)),
                    (c.imgInFirefox =
                      "image" == c.type &&
                      "auto" == c.width[Q[o].level] &&
                      "100%" == c.height[Q[o].level] &&
                      Q.isFirefox(o)),
                    c.imgInFirefox &&
                      ((m = c.img.width()), (c.eow = 0 !== m ? m : c.eow)),
                    c.eow <= 0 &&
                      void 0 !== c.lastknownwidth &&
                      (c.eow = c.lastknownwidth),
                    c.eoh <= 0 &&
                      void 0 !== c.lastknownheight &&
                      (c.eoh = c.lastknownheight),
                    void 0 !== c.corners &&
                      ("text" === c.type ||
                        "button" === c.type ||
                        "shape" === c.type))
                  ) {
                    for (r in c.corners)
                      c.corners.hasOwnProperty(r) &&
                        (c.corners[r].css("borderWidth", c.eoh + "px"),
                        c.corners[r].css(
                          "border" +
                            ("rs-fcrt" === r || "rs-fcr" === r
                              ? "Right"
                              : "Left"),
                          "0px solid transparent"
                        ),
                        c.corners[r].css(
                          "border" +
                            ("rs-fcrt" == r || "rs-bcr" == r
                              ? "Bottom"
                              : "Top") +
                            "Color",
                          c.bgcol
                        ));
                    c.eow = l.outerWidth(!0);
                  }
                  0 == c.eow &&
                    0 == c.eoh &&
                    ((c.eow = (
                      "grid" === c.basealign ? Q[o].content : Q[o].module
                    ).width),
                    (c.eoh = (
                      "grid" === c.basealign ? Q[o].content : Q[o].module
                    ).height)),
                    (c.basealign = Q[o].justifyCarousel ? "grid" : c.basealign);
                  var b =
                      "on" === c.rsp_o
                        ? parseInt(c.voffset[Q[o].level], 0) * Q[o].CM.w
                        : parseInt(c.voffset[Q[o].level], 0),
                    _ =
                      "on" === c.rsp_o
                        ? parseInt(c.hoffset[Q[o].level], 0) * Q[o].CM.h
                        : parseInt(c.hoffset[Q[o].level], 0),
                    f =
                      "grid" === c.basealign
                        ? Q.iWA(o, t.slideIndex) * Q[o].CM.w
                        : f,
                    y =
                      "grid" === c.basealign ||
                      ("carousel" == Q[o].sliderType &&
                        "v" === Q[o].carousel.orientation)
                        ? Q.iHE(o) *
                          (Q[o].keepBPHeight ||
                          Q[o].currentRowsHeight > Q[o].gridheight[Q[o].level]
                            ? 1
                            : Q[o].CM.h)
                        : y;
                  (1 == Q[o].gridEQModule ||
                    (void 0 !== c._lig &&
                      "row" !== c.type &&
                      "column" !== c.type &&
                      ("group" !== c.type || c._ingroup || c._incolumn))) &&
                    ((f =
                      void 0 !== c._lig ? c._lig.width() : Q[o].module.width),
                    (y =
                      void 0 !== c._lig ? c._lig.height() : Q[o].module.height),
                    (v = w = 0)),
                    Q[o].keepBPHeight && y == Q[o].module.height && (v = 0),
                    "video" === c.type &&
                      null != c.vidOBJ &&
                      (0 <= c.vidOBJ.height &&
                        0 === c.eoh &&
                        (c.eoh = c.vidOBJ.height),
                      0 <= c.vidOBJ.width) &&
                      0 === c.eow &&
                      (c.eow = c.vidOBJ.width),
                    (d =
                      "relative" == c.position
                        ? 0
                        : "c" === d ||
                          "m" === d ||
                          "center" === d ||
                          "middle" === d
                        ? f / 2 - c.eow / 2 + _
                        : "l" === d || "left" === d
                        ? _
                        : "r" === d || "right" === d
                        ? f - c.eow - _
                        : "off" !== c.rsp_o
                        ? d * Q[o].CM.w
                        : d),
                    (n =
                      "relative" == c.position
                        ? 0
                        : "m" === n ||
                          "c" === n ||
                          "center" === n ||
                          "middle" === n
                        ? y / 2 - c.eoh / 2 + b
                        : "t" === n || "top" == n
                        ? b
                        : "b" === n || "bottom" == n
                        ? y - c.eoh - b
                        : "off" !== c.rsp_o
                        ? n * Q[o].CM.w
                        : n),
                    (d = c._slidelink
                      ? 0
                      : Q[o].rtl &&
                        -1 == ("" + c.width[Q[o].level]).indexOf("%")
                      ? parseInt(d) + c.eow
                      : d),
                    (c.calcx =
                      "relative" != c.position ||
                      ("group" !== c.type && !c._incolumn)
                        ? parseInt(d, 0) + w
                        : 0),
                    (c.calcy =
                      "relative" != c.position ||
                      ("group" !== c.type && !c._incolumn)
                        ? parseInt(n, 0) + v
                        : 0),
                    "row" !== c.type && "column" !== c.type
                      ? (c.OBJUPD.POBJ = {
                          zIndex: c.zindex,
                          top: c.calcy,
                          left: c.calcx,
                          overwrite: "auto",
                        })
                      : "row" !== c.type
                      ? (c.OBJUPD.POBJ = {
                          zIndex: c.zindex,
                          width: c.columnwidth,
                          top: 0,
                          left: 0,
                          overwrite: "auto",
                        })
                      : "row" === c.type &&
                        ((c.OBJUPD.POBJ = {
                          zIndex: c.zindex,
                          width: "grid" === c.basealign ? f + "px" : "100%",
                          top: 0,
                          left: Q[o].rtl ? -1 * w : w,
                          overwrite: "auto",
                        }),
                        c.cbreak <= Q[o].level
                          ? -1 ===
                              l[0].className.indexOf("rev_break_columns") &&
                            l[0].classList.add("rev_break_columns")
                          : 0 < l[0].className.indexOf("rev_break_columns") &&
                            l[0].classList.remove("rev_break_columns"),
                        (c.rowcalcx = c.OBJUPD.POBJ.left),
                        (c.pow = c.p.outerWidth(!0))),
                    void 0 !== c.blendmode &&
                      (c.OBJUPD.POBJ.mixBlendMode =
                        "color" === c.blendmode && window.isSafari11
                          ? "color-burn"
                          : c.blendmode),
                    (void 0 === c.frames.loop && !c.imgInFirefox) ||
                      (c.OBJUPD.LPOBJ = { width: c.eow, height: c.eoh }),
                    c._ingroup &&
                      (void 0 !== c._groupw &&
                        !Q.isNumeric(c._groupw) &&
                        0 < c._groupw.indexOf("%") &&
                        (c.OBJUPD.lppmOBJ.minWidth = c._groupw),
                      void 0 !== c._grouph) &&
                      !Q.isNumeric(c._grouph) &&
                      0 < c._grouph.indexOf("%") &&
                      (c.OBJUPD.lppmOBJ.minHeight = c._grouph),
                    "updateposition" !== t.mode ||
                      (c.caches.POBJ_LEFT === c.OBJUPD.POBJ.left &&
                        c.caches.POBJ_TOP === c.OBJUPD.POBJ.top) ||
                      (tpGS.gsap.set(c.p, c.OBJUPD.POBJ),
                      (c.caches.POBJ_LEFT = c.OBJUPD.POBJ.left),
                      (c.caches.POBJ_TOP = c.OBJUPD.POBJ.top)),
                    t.animcompleted && Q.animcompleted(l, o);
                }
              }
          },
          hoverReverseDone: function (e) {
            Q[e.id]._L[e.L[0].id].textDecoration &&
              tpGS.gsap.set(Q[e.id]._L[e.L[0].id].c, {
                textDecoration: Q[e.id]._L[e.L[0].id].textDecoration,
              });
          },
          animcompleted: function (e, t, i) {
            var a;
            void 0 !== Q[t].videos &&
              null != (a = Q[t].videos[e[0].id]) &&
              null != a.type &&
              "none" != a.type &&
              (1 == a.aplay ||
              "true" == a.aplay ||
              "on" == a.aplay ||
              "1sttime" == a.aplay
                ? (("static" === a.slideid ||
                    "carousel" !== Q[t].sliderType ||
                    e.closest("rs-slide").index() == Q[t].carousel.focused ||
                    (e.closest("rs-slide").index() == Q[t].activeRSSlide &&
                      Q[t].carousel.oldfocused == Q[t].carousel.focused) ||
                    i) &&
                    Q.playVideo(e, t),
                  Q.toggleState(e.data("videotoggledby")),
                  (!a.aplay1 && "1sttime" != a.aplay) ||
                    ((a.aplay1 = !1), (a.aplay = !1)))
                : ("no1sttime" == a.aplay && (a.aplay = !0),
                  Q.unToggleState(e.data("videotoggledby"))));
          },
          convertHoverTransform: function (e, t, i) {
            var a,
              r = Q.clone(e.transform);
            return (
              (r.originX || r.originY || r.originZ) &&
                ((r.transformOrigin =
                  (void 0 === r.originX ? "50%" : r.originX) +
                  " " +
                  (void 0 === r.originY ? "50%" : r.originY) +
                  " " +
                  (void 0 === r.originZ ? "50%" : r.originZ)),
                delete r.originX,
                delete r.originY,
                delete r.originZ),
              void 0 !== e &&
                void 0 !== e.filter &&
                ((r.filter = v(e.filter)), (r["-webkit-filter"] = r.filter)),
              (r.color = void 0 === r.color ? "rgba(255,255,255,1)" : r.color),
              (r.force3D = "auto"),
              void 0 !== r.borderRadius &&
                ((a = r.borderRadius.split(" ")).length,
                (r.borderTopLeftRadius = a[0]),
                (r.borderTopRightRadius = a[1]),
                (r.borderBottomRightRadius = a[2]),
                (r.borderBottomLeftRadius = a[3]),
                delete r.borderRadius),
              void 0 !== r.borderWidth &&
                ((a = r.borderWidth.split(" ")).length,
                (r.borderTopWidth = a[0]),
                (r.borderRightWidth = a[1]),
                (r.borderBottomWidth = a[2]),
                (r.borderLeftWidth = a[3]),
                delete r.borderWidth),
              (void 0 !== i.bg && -1 !== i.bg.indexOf("url")) ||
                ((e = -1 !== i.bgCol.search("gradient")),
                (a =
                  r.backgroundImage &&
                  "string" == typeof r.backgroundImage &&
                  -1 !== r.backgroundImage.search("gradient")) && e
                  ? (180 !== s(i.bgCol) &&
                      180 == s(r.backgroundImage) &&
                      (r.backgroundImage = o(r.backgroundImage, 180)),
                    (r.backgroundImage = tpGS.getSSGColors(
                      i.bgCol,
                      r.backgroundImage,
                      void 0 === r.gs ? "fading" : r.gs
                    ).to))
                  : a && !e
                  ? (r.backgroundImage = tpGS.getSSGColors(
                      i.bgCol,
                      r.backgroundImage,
                      void 0 === r.gs ? "fading" : r.gs
                    ).to)
                  : !a &&
                    e &&
                    (r.backgroundImage = tpGS.getSSGColors(
                      i.bgCol,
                      r.backgroundColor,
                      void 0 === r.gs ? "fading" : r.gs
                    ).to)),
              delete r.gs,
              r
            );
          },
          handleStaticLayers: function (e, t) {
            var i = 0,
              a = Q[t].realslideamount + 1;
            if (void 0 !== Q.gA(e[0], "onslides")) {
              var r,
                o,
                s = Q.gA(e[0], "onslides").split(";");
              for (r in s)
                s.hasOwnProperty(r) &&
                  ("s" === (o = s[r].split(":"))[0] && (i = parseInt(o[1], 0)),
                  "e" === o[0]) &&
                  (a = parseInt(o[1], 0));
            }
            (i = Math.max(0, i)),
              (a = Math.min(
                Q[t].realslideamount,
                a < 0 ? Q[t].realslideamount : a
              )),
              (a =
                (1 !== i && 0 !== i) || a !== Q[t].realslideamount
                  ? a
                  : Q[t].realslideamount + 1),
              e.data("startslide", i),
              e.data("endslide", a),
              Q.sA(e[0], "startslide", i),
              Q.sA(e[0], "endslide", a);
          },
          updateLayersOnFullStage: function (e) {
            if (0 < Q[e].caches.calcResponsiveLayersList.length) {
              !0 !== Q[e].slideHasIframe &&
                !0 !== Q[e].fullScreenMode &&
                !0 !== Q[e].skipAttachDetach &&
                ("carousel" === Q[e].sliderType
                  ? Q[e].carousel.wrap
                  : Q[e].canvas
                ).detach();
              for (
                var t = 0;
                t < Q[e].caches.calcResponsiveLayersList.length;
                t++
              )
                void 0 !== Q[e].caches.calcResponsiveLayersList[t] &&
                  i(Q[e].caches.calcResponsiveLayersList[t]);
              !0 !== Q[e].slideHasIframe &&
                !0 !== Q[e].fullScreenMode &&
                !0 !== Q[e].skipAttachDetach &&
                ("carousel" === Q[e].sliderType
                  ? Q[e].c[0].appendChild(Q[e].carousel.wrap[0])
                  : Q[e].c[0].appendChild(Q[e].canvas[0]));
            }
          },
          animateTheLayers: function (t) {
            if (void 0 === t.slide) return !1;
            var i = t.id;
            if (void 0 === Q[i].slides[t.slide] && "individual" !== t.slide)
              return !1;
            if ("carousel" === Q[i].sliderType) {
              if ("start" === t.mode && "start" === Q[i].lastATLmode) {
                if (
                  t.slide === Q[i].lastATLslide &&
                  new Date().getTime() - Q[i].lastATLtime < 1500
                )
                  return;
                Q[i].lastATLtime = new Date().getTime();
              }
              (Q[i].lastATLmode = t.mode), (Q[i].lastATLslide = t.slide);
            }
            var a =
                "individual" !== t.slide
                  ? Q.gA(Q[i].slides[t.slide], "key")
                  : "individual",
              e =
                void 0 !== Q[i].pr_processing_key
                  ? Q[i].pr_processing_key
                  : void 0 !== Q[i].pr_active_key
                  ? Q[i].pr_active_key
                  : 0,
              r =
                ((Q[i].focusedSlideIndex = e),
                (Q[i].caches.calcResponsiveLayersList = []),
                (Q[i].layers = Q[i].layers || {}),
                "individual" === a
                  ? (Q[i].layers.individual =
                      void 0 === Q[i].layers.individual
                        ? "all" === Q[i].carousel.showLayersAllTime
                          ? n(jQuery(Q[i].c), "rs-layer", "rs-layer-static")
                          : n(jQuery(Q[i].c), "rs-on-car")
                        : Q[i].layers.individual)
                  : ((Q[i].layers[a] =
                      void 0 === Q[i].layers[a]
                        ? "all" === Q[i].carousel.showLayersAllTime
                          ? []
                          : n(
                              jQuery(Q[i].slides[t.slide]),
                              "rs-layer",
                              "carousel" === Q[i].sliderType
                                ? "rs-on-car"
                                : void 0
                            )
                        : Q[i].layers[a]),
                    (Q[i].layers.static =
                      void 0 === Q[i].layers.static
                        ? n(
                            jQuery(Q[i].c.find("rs-static-layers")),
                            "rs-layer",
                            "rs-on-car"
                          )
                        : Q[i].layers.static),
                    (Q[i].sbas[a] =
                      void 0 === Q[i].sbas[a]
                        ? n(jQuery(Q[i].slides[t.slide]), "rs-sba")
                        : Q[i].sbas[a])),
                "rebuild" === t.mode &&
                  "carousel" === Q[i].sliderType &&
                  "individual" === a),
              o =
                (void 0 !== a &&
                  Q[i].layers[a] &&
                  Q.initLayer({
                    id: i,
                    slideIndex: t.slide,
                    skey: a,
                    mode: t.mode,
                    animcompleted: r,
                  }),
                Q[i].layers.static &&
                  Q.initLayer({
                    id: i,
                    skey: "static",
                    slideIndex: "static",
                    mode: t.mode,
                    animcompleted: r,
                  }),
                Q.updateLayersOnFullStage(i),
                "preset" !== t.mode ||
                  (void 0 !== Q[i].slidePresets &&
                    void 0 !== Q[i].slidePresets[t.slide]) ||
                  ((Q[i].slidePresets =
                    void 0 === Q[i].slidePresets ? {} : Q[i].slidePresets),
                  (Q[i].slidePresets[t.slide] = !0),
                  Q[i].c.trigger("revolution.slideprepared", {
                    slide: t.slide,
                    key: a,
                  })),
                (Q[i].heightInLayers = Q[i].module.height),
                (Q[i].widthInLayers = Q[i].module.width),
                (Q[i].levelInLayers = Q[i].level),
                {
                  id: i,
                  skey: a,
                  slide: t.slide,
                  key: a,
                  mode: t.mode,
                  index: e,
                });
            window.requestAnimationFrame(function () {
              if (
                (void 0 === Q[i].dimensionReCheck[a]
                  ? (Q.updateLayerDimensions(o),
                    !0 !== Q[i].doubleDimensionCheck
                      ? setTimeout(function () {
                          Q.updateLayerDimensions(o), Q.updateRowZones(o);
                        }, 150)
                      : Q.updateRowZones(o),
                    (Q[i].doubleDimensionCheck = !0),
                    (Q[i].dimensionReCheck[a] = !0))
                  : Q.updateRowZones(o),
                void 0 !== a && Q[i].layers[a])
              )
                for (var e in Q[i].layers[a])
                  Q[i].layers[a].hasOwnProperty(e) &&
                    Q.renderLayerAnimation({
                      layer: jQuery(Q[i].layers[a][e]),
                      id: i,
                      mode: t.mode,
                      caller: t.caller,
                    });
              if (Q[i].layers.static)
                for (var e in Q[i].layers.static)
                  Q[i].layers.static.hasOwnProperty(e) &&
                    Q.renderLayerAnimation({
                      layer: jQuery(Q[i].layers.static[e]),
                      id: i,
                      mode: t.mode,
                      caller: t.caller,
                    });
              null != Q[i].mtl && Q[i].mtl.resume();
            });
          },
          updateRowZones: function (e) {
            ((void 0 !== Q[e.id].rowzones &&
              0 < Q[e.id].rowzones.length &&
              0 <= e.index &&
              Q[e.id].rowzones[Math.min(e.index, Q[e.id].rowzones.length)] &&
              0 <
                Q[e.id].rowzones[Math.min(e.index, Q[e.id].rowzones.length)]
                  .length) ||
              (void 0 !== Q[e.id].srowzones && 0 < Q[e.id].srowzones.length) ||
              (void 0 !== Q[e.id].smiddleZones &&
                0 < Q[e.id].smiddleZones.length)) &&
              (Q.updateDims(e.id),
              Q.initLayer({
                id: e.id,
                skey: e.key,
                slideIndex: e.slide,
                mode: "updateposition",
              }),
              Q.initLayer({
                id: e.id,
                skey: "static",
                slideIndex: "static",
                mode: "updateposition",
              }),
              ("start" !== e.mode && "preset" !== e.mode) ||
                Q.manageNavigation(e.id),
              window.requestAnimationFrame(function () {
                Q.putRowsInPosition(e.id);
              }));
          },
          updateLayerDimensions: function (e) {
            var t = !1;
            (Q[e.id].caches.calcResponsiveLayersList = []),
              void 0 === e.key ||
                ("individual" != e.key && void 0 === Q[e.id].layers[e.key]) ||
                !Q.checkLayerDimensions({
                  id: e.id,
                  skey: e.key,
                  slideIndex: e.slide,
                }) ||
                (t = !0),
              Q.initLayer({
                id: e.id,
                skey: e.key,
                slideIndex: e.slide,
                mode: "updateAndResize",
              }),
              Q[e.id].layers.static &&
                Q.checkLayerDimensions({
                  id: e.id,
                  skey: "static",
                  slideIndex: "static",
                }) &&
                ((t = !0),
                Q.initLayer({
                  id: e.id,
                  skey: "static",
                  slideIndex: "static",
                  mode: "updateAndResize",
                })),
              t && Q.updateLayersOnFullStage(e.id);
          },
          updateAnimatingLayerPositions: function (e) {
            Q.initLayer({
              id: e.id,
              skey: e.key,
              slideIndex: e.slide,
              mode: "updateposition",
            });
          },
          removeTheLayers: function (e, t, i) {
            var a,
              r = Q.gA(e[0], "key");
            for (a in (Q[t].sloops &&
              Q[t].sloops[r] &&
              Q[t].sloops[r].tl &&
              Q[t].sloops[r].tl.pause(),
            Q[t].layers[r]))
              Q[t].layers[r].hasOwnProperty(a) &&
                Q.renderLayerAnimation({
                  layer: jQuery(Q[t].layers[r][a]),
                  frame: "frame_999",
                  mode: "continue",
                  remove: !0,
                  id: t,
                  allforce: i,
                });
            for (a in Q[t].layers.static)
              Q[t].layers.static.hasOwnProperty(a) &&
                Q.renderLayerAnimation({
                  layer: jQuery(Q[t].layers.static[a]),
                  frame: "frame_999",
                  mode: "continue",
                  remove: !0,
                  id: t,
                  allforce: i,
                });
          },
          renderLayerAnimation: function (t) {
            var i,
              a,
              r = t.layer,
              o = t.id,
              s = Q[o].level,
              n = Q[o]._L[r[0].id],
              F = void 0 !== n.timeline ? n.timeline.time() : void 0,
              l = !1,
              d = !1,
              H = "none",
              c = !1;
            if (
              (("containerResized_2" !== t.caller &&
                "swapSlideProgress_2" !== t.caller) ||
                !0 === n.animationRendered) &&
              ((n.animationRendered = !0),
              "preset" !== t.mode ||
                !0 === n.frames.frame_1.timeline.waitoncall ||
                void 0 !== n.scrollBasedOffset)
            ) {
              if (
                ("trigger" == t.mode && (n.triggeredFrame = t.frame),
                n._isstatic)
              ) {
                var p =
                    "carousel" === Q[o].sliderType &&
                    void 0 !== Q[o].carousel.oldfocused
                      ? parseInt(Q[o].carousel.oldfocused) + 1
                      : void 0 === Q[o].focusedSlideIndex
                      ? 0
                      : parseInt(Q[o].focusedSlideIndex, 0) + 1,
                  g =
                    "carousel" === Q[o].sliderType
                      ? void 0 === Q[o].pr_next_key
                        ? 0 == p
                          ? 1
                          : p
                        : parseInt(Q[o].pr_next_key, 0) + 1
                      : void 0 === Q[o].pr_processing_key
                      ? 0 == p
                        ? 1
                        : p
                      : parseInt(Q[o].pr_processing_key, 0) + 1,
                  u = p >= n.startslide && p <= n.endslide,
                  g = g >= n.startslide && g <= n.endslide,
                  h =
                    void 0 !== n.frames.frame_999 &&
                    void 0 !== n.frames.frame_999.timeline &&
                    !0 !== n.frames.frame_999.timeline.waitoncall &&
                    p === n.endslide;
                if (
                  (void 0 === Q[o].modal ||
                    ("start" != t.mode && "continue" != t.mode) ||
                    ("continue" === t.mode &&
                      "close" == Q[o].modal.lastModalCall &&
                      (g = !1),
                    "start" !== t.mode ||
                      ("show" !== Q[o].modal.lastModalCall &&
                        "init" !== Q[o].modal.lastModalCall) ||
                      Q[o].modal.lastModalCall === n.lastModalCall ||
                      ((n.triggeredFrame = void 0),
                      (n.triggercache = "reset"),
                      void 0 !== n.timeline &&
                        void 0 !== n.timeline.currentLabel() &&
                        -1 == n.timeline.currentLabel().indexOf("frame_999") &&
                        n.timeline.pause(0)),
                    (n.lastModalCall = Q[o].modal.lastModalCall)),
                  (H =
                    ("start" === t.mode && h) ||
                    (p === n.endslide && "continue" === t.mode) ||
                    (("continue" === t.mode || p === n.endslide) && "none")),
                  "frame_999" === n.animatedFrame &&
                    ("done" === n.animatingFrame) |
                      (null == n.animatingFrame) &&
                    (n.lastRequestedMainFrame = "frame_999"),
                  void 0 !== n.timeline &&
                    void 0 !== n.timeline.currentLabel() &&
                    -1 == n.timeline.currentLabel().indexOf("frame_999") &&
                    (c = !0),
                  !0 === t.allforce || !0 === H)
                ) {
                  if ("continue" === t.mode && g && h && void 0 !== n.timeline)
                    return void (0 <=
                    n.timeline.currentLabel().indexOf("frame_999")
                      ? n.timeline.pause(n.timeline.previousLabel())
                      : n.timeline.pause(n.timeline.currentLabel()));
                  if (
                    "continue" === t.mode &&
                    "frame_999" === t.frame &&
                    (g || void 0 === n.lastRequestedMainFrame)
                  )
                    return;
                } else {
                  if ("preset" === t.mode && (n.elementHovered || !g)) return;
                  if ("rebuild" === t.mode && !u && !g) return;
                  if (
                    "start" === t.mode &&
                    g &&
                    "frame_1" === n.lastRequestedMainFrame
                  )
                    return;
                  if (
                    ("start" === t.mode || "preset" === t.mode) &&
                    "frame_999" === n.lastRequestedMainFrame &&
                    !0 !== n.leftstage
                  )
                    return;
                  if (
                    "continue" === t.mode &&
                    "frame_999" === t.frame &&
                    (g || void 0 === n.lastRequestedMainFrame)
                  )
                    return;
                  if ("start" === t.mode && !g) return;
                  if (
                    "rebuild" === t.mode &&
                    n.elementHovered &&
                    n._isstatic &&
                    n.hovertimeline
                  )
                    return;
                }
              } else
                "start" === t.mode &&
                  "keep" !== n.triggercache &&
                  (n.triggeredFrame = void 0);
              "start" === t.mode &&
                (void 0 !== n.layerLoop && (n.layerLoop.count = 0),
                (t.frame =
                  void 0 === n.triggeredFrame
                    ? c
                      ? void 0
                      : 0
                    : n.triggeredFrame)),
                "continue" === t.mode ||
                  "trigger" === t.mode ||
                  void 0 === n.timeline ||
                  (n._isstatic && !0 === n.leftstage) ||
                  n.timeline.pause(0),
                ("continue" !== t.mode && "trigger" !== t.mode) ||
                  void 0 === n.timeline ||
                  n.timeline.pause(),
                (n.timeline = tpGS.gsap.timeline({ paused: !0 })),
                ("text" !== n.type && "button" !== n.type) ||
                  (void 0 !== n.splitText &&
                    (void 0 !== n.splitTextFix ||
                      ("start" !== t.mode && "preset" !== t.mode))) ||
                  (ae({ layer: r, id: o }),
                  "start" === t.mode && (n.splitTextFix = !0));
              let e = Q[o].duration;
              if ("carousel" === Q[o].sliderType)
                for (var m of Q[o].slides)
                  n.slidekey == m.dataset.key &&
                    null != Q.gA(m, "duration") &&
                    "" != Q.gA(m, "duration") &&
                    (e = parseInt(Q.gA(m, "duration"), 0));
              for (var v in n.ford)
                if (n.ford.hasOwnProperty(v)) {
                  var f = n.ford[v],
                    z = !1;
                  if ("frame_0" !== f && "frame_hover" !== f && "loop" !== f) {
                    if (
                      ("frame_999" === f &&
                        !n.frames[f].timeline.waitoncall &&
                        n.frames[f].timeline.start >= e &&
                        !0 !== t.remove &&
                        (n.frames[f].timeline.waitoncall = !0),
                      "start" === t.mode &&
                        "keep" !== n.triggercache &&
                        (n.frames[f].timeline.callstate = n.frames[f].timeline
                          .waitoncall
                          ? "waiting"
                          : ""),
                      "trigger" === t.mode &&
                        n.frames[f].timeline.waitoncall &&
                        (f === t.frame
                          ? ((n.frames[f].timeline.triggered = !0),
                            (n.frames[f].timeline.callstate = "called"))
                          : (n.frames[f].timeline.triggered = !1)),
                      "rebuild" === t.mode ||
                        n.frames[f].timeline.triggered ||
                        (n.frames[f].timeline.callstate = n.frames[f].timeline
                          .waitoncall
                          ? "waiting"
                          : ""),
                      !1 !== t.fastforward)
                    ) {
                      if (
                        ("continue" === t.mode || "trigger" === t.mode) &&
                        !1 === d &&
                        f !== t.frame
                      )
                        continue;
                      if (
                        ("rebuild" === t.mode || "preset" === t.mode) &&
                        !1 === d &&
                        void 0 !== n.triggeredFrame &&
                        f !== n.triggeredFrame
                      )
                        continue;
                      (f === t.frame ||
                        ("rebuild" === t.mode && f === n.triggeredFrame)) &&
                        (d = !0);
                    } else f === t.frame && (d = !0);
                    if (
                      (f !== t.frame &&
                        n.frames[f].timeline.waitoncall &&
                        "called" !== n.frames[f].timeline.callstate &&
                        (l = !0),
                      f !== t.frame &&
                        d &&
                        (l =
                          !0 === l && n.frames[f].timeline.waitoncall
                            ? "skiprest"
                            : !0 !== l && l),
                      void 0 === n.hideonfirststart &&
                        "frame_1" === f &&
                        n.frames[f].timeline.waitoncall &&
                        (n.hideonfirststart = !0),
                      l &&
                        "waiting" === n.frames[f].timeline.callstate &&
                        "preset" === t.mode &&
                        1 != n.firstTimeRendered)
                    ) {
                      if (n._isstatic && void 0 === n.currentframe) continue;
                      n.firstTimeRendered = z = !0;
                    } else if (
                      "skiprest" === l ||
                      ("called" !== n.frames[f].timeline.callstate &&
                        l &&
                        t.toframe !== f)
                    )
                      continue;
                    if (
                      "frame_999" !== f ||
                      !1 !== H ||
                      ("continue" !== t.mode &&
                        "start" !== t.mode &&
                        "rebuild" !== t.mode)
                    ) {
                      (n.fff =
                        "frame_1" === f &&
                        ("trigger" !== t.mode ||
                          "frame_999" === n.currentframe ||
                          "frame_0" === n.currentframe ||
                          void 0 === n.currentframe)),
                        "trigger" === t.mode &&
                          "frame_1" === t.frame &&
                          !1 === n.leftstage &&
                          (n.fff = !1),
                        z ||
                          ((n.frames[f].timeline.callstate = "called"),
                          (n.currentframe = f));
                      var y,
                        w,
                        b,
                        _,
                        S,
                        x,
                        k = n.frames[f],
                        O = n.fff ? n.frames.frame_0 : void 0,
                        R = tpGS.gsap.timeline(),
                        W = tpGS.gsap.timeline(),
                        v = n.c,
                        L =
                          void 0 !== k.sfx &&
                          re(k.sfx.effect, n.m, k.timeline.ease),
                        I = k.timeline.speed / 1e3,
                        E = 0,
                        M = oe({
                          id: o,
                          frame: k,
                          layer: r,
                          ease: k.timeline.ease,
                          splitAmount: v.length,
                          target: f,
                          forcefilter:
                            void 0 !== n.frames.frame_hover &&
                            void 0 !== n.frames.frame_hover.filter,
                        }),
                        T = n.fff
                          ? oe({
                              id: o,
                              frame: O,
                              layer: r,
                              ease: k.timeline.ease,
                              splitAmount: v.length,
                              target: "frame_0",
                            })
                          : void 0,
                        C =
                          void 0 !== k.mask
                            ? oe({
                                id: o,
                                frame: {
                                  transform: { x: k.mask.x, y: k.mask.y },
                                },
                                layer: r,
                                ease: M.ease,
                                target: "mask",
                              })
                            : void 0,
                        A =
                          void 0 !== C && n.fff
                            ? oe({
                                id: o,
                                frame: {
                                  transform: { x: O.mask.x, y: O.mask.y },
                                },
                                layer: r,
                                ease: M.ease,
                                target: "frommask",
                              })
                            : void 0,
                        P = M.ease;
                      if (
                        ((M.force3D = !0),
                        "block" === L.type &&
                          ((L.ft[0].background = k.sfx.fxc),
                          (L.ft[0].visibility = "visible"),
                          (L.ft[1].visibility = "visible"),
                          window.isSafari11 &&
                            ((x = Math.max(
                              T && T.z ? T.z : 0,
                              M && M.z ? M.z : 0
                            )),
                            (L.ft[0].z = Math.max(0, x + 1)),
                            (L.ft[1].z = Math.max(0, x + 1)),
                            (L.t.z = Math.max(0, x + 1)),
                            (L.ft[1].transformPerspective =
                              L.ft[0].transformPerspective =
                              L.t.transformPerspective =
                                M.transformPerspective)),
                          R.add(
                            tpGS.gsap.fromTo(
                              L.bmask_in,
                              I / 2,
                              L.ft[0],
                              L.ft[1],
                              0
                            )
                          ),
                          R.add(
                            tpGS.gsap.fromTo(
                              L.bmask_in,
                              I / 2,
                              L.ft[1],
                              L.t,
                              I / 2
                            )
                          ),
                          ("frame_0" !== f && "frame_1" !== f) ||
                            (T.opacity = 0)),
                        void 0 !== k.color
                          ? (M.color = k.color)
                          : void 0 !== n.color &&
                            "npc" !== n.color[s] &&
                            (M.color = n.color[s]),
                        void 0 !== O && void 0 !== O.color
                          ? (T.color = O.color)
                          : void 0 !== O &&
                            void 0 !== n.color &&
                            "npc" !== n.color[s] &&
                            (T.color = n.color[s]),
                        void 0 !== k.bgcolor
                          ? 0 <= k.bgcolor.indexOf("gradient")
                            ? (M.background = k.bgcolor)
                            : (M.backgroundColor = k.bgcolor)
                          : !0 === n.bgcolinuse &&
                            (0 <= n.bgcol.indexOf("gradient")
                              ? (M.background = n.bgcol)
                              : (M.backgroundColor = n.bgcol)),
                        void 0 !== O &&
                          (void 0 !== O.bgcolor
                            ? 0 <= O.bgcolor.indexOf("gradient")
                              ? (T.background = O.bgcolor)
                              : (T.backgroundColor = O.bgcolor)
                            : !0 === n.bgcolinuse &&
                              (0 <= n.bgcol.indexOf("gradient")
                                ? (T.background = n.bgcol)
                                : (T.backgroundColor = n.bgcol))),
                        void 0 !== n.splitText && !1 !== n.splitText)
                      )
                        for (var D in q)
                          void 0 === k[q[D]] ||
                            n.quickRendering ||
                            ((y = n.splitText[q[D]]),
                            (b = oe({
                              id: o,
                              frame: k,
                              source: q[D],
                              ease: P,
                              layer: r,
                              splitAmount: y.length,
                              target: f + "_" + q[D],
                            })),
                            (_ = n.fff
                              ? oe({
                                  id: o,
                                  frame: O,
                                  ease: b.ease,
                                  source: q[D],
                                  layer: r,
                                  splitAmount: y.length,
                                  target: "frame_0_" + q[D],
                                })
                              : void 0),
                            (w = n.frames[f].dosplit
                              ? void 0 === k[q[D]].delay
                                ? 0.05
                                : k[q[D]].delay / 100
                              : 0),
                            (n.color[s] === M.color && "frame_1" === f) ||
                              (b.color = M.color),
                            void 0 !== T &&
                              n.color[s] !== T.color &&
                              (_.color = T.color),
                            void 0 !== _ &&
                              _.color !== M.color &&
                              (b.color = M.color),
                            (b = Q.clone(b)),
                            (_ = n.fff ? Q.clone(_) : void 0),
                            (S = k[q[D]].dir),
                            delete b.dir,
                            (b.data = { splitted: !0 }),
                            (b.stagger =
                              "center" === S || "edge" === S
                                ? $({ each: w, offset: w / 2, from: S })
                                : { each: w, from: S }),
                            (b.duration = I),
                            void 0 !== _ &&
                              (void 0 !== _.opacity &&
                                (Q.ISM || window.isSafari11) &&
                                (_.opacity = Math.max(
                                  0.001,
                                  parseFloat(_.opacity)
                                )),
                              delete _.dir),
                            n.fff
                              ? R.add(W.fromTo(y, _, b), 0)
                              : R.add(W.to(y, b), 0),
                            (E = Math.max(E, y.length * w)));
                      (I += E),
                        void 0 === i &&
                          (i =
                            "isometric" === Q[o].perspectiveType
                              ? 0
                              : "local" === Q[o].perspectiveType
                              ? void 0 !== M.transformPerspective
                                ? M.transformPerspective
                                : n.fff && void 0 !== T.transfromPerspective
                                ? T.transfromPerspective
                                : Q[o].perspective
                              : Q[o].perspective),
                        (n.knowTransformPerspective = i),
                        n.fsom &&
                        (void 0 !== M.filter || (n.fff && void 0 !== T.filter))
                          ? ((C.filter = M.filter),
                            (C["-webkit-filter"] = M.filter),
                            delete M.filter,
                            delete M["-webkit-filter"],
                            n.fff &&
                              void 0 !== T.filter &&
                              (((A = A || {}).filter = T.filter),
                              (A["-webkit-filter"] = T.filter),
                              delete T.filter,
                              delete T["-webkit-filter"]),
                            (n.forceFsom = !0))
                          : (n.forceFsom = !1),
                        (n.useMaskAnimation =
                          n.pxundermask ||
                          (void 0 !== C &&
                            ((void 0 !== O && "hidden" === O.mask.overflow) ||
                              "hidden" === k.mask.overflow))),
                        n.useMaskAnimation || n.forceFsom
                          ? (n.useMaskAnimation
                              ? R.add(
                                  tpGS.gsap.to(n.m, 0.001, {
                                    overflow: "hidden",
                                  }),
                                  0
                                )
                              : R.add(
                                  tpGS.gsap.to(n.m, 0.001, {
                                    overflow: "visible",
                                  }),
                                  0
                                ),
                            "column" === n.type &&
                              n.cbgexists &&
                              n.useMaskAnimation &&
                              R.add(
                                tpGS.gsap.to(n.cbgmask, 0.001, {
                                  overflow: "hidden",
                                }),
                                0
                              ),
                            n.btrans &&
                              (A &&
                                ((A.rotationX = n.btrans.rX),
                                (A.rotationY = n.btrans.rY),
                                (A.rotationZ = n.btrans.rZ),
                                (A.opacity = n.btrans.o)),
                              (C.rotationX = n.btrans.rX),
                              (C.rotationY = n.btrans.rY),
                              (C.rotationZ = n.btrans.rZ),
                              (C.opacity = n.btrans.o)),
                            n.fff
                              ? R.add(
                                  tpGS.gsap.fromTo(
                                    void 0 !== n.m && void 0 !== n.cbgmask
                                      ? [n.m, n.cbgmask]
                                      : void 0 !== n.m
                                      ? n.m
                                      : n.cbgmask,
                                    I,
                                    Q.clone(A),
                                    Q.clone(C)
                                  ),
                                  0.001
                                )
                              : R.add(
                                  tpGS.gsap.to(
                                    void 0 !== n.m && void 0 !== n.cbgmask
                                      ? [n.m, n.cbgmask]
                                      : void 0 !== n.m
                                      ? n.m
                                      : n.cbgmask,
                                    I,
                                    Q.clone(C)
                                  ),
                                  0.001
                                ))
                          : void 0 !== n.btrans
                          ? ((x = {
                              x: 0,
                              y: 0,
                              filter: "none",
                              opacity: n.btrans.o,
                              rotationX: n.btrans.rX,
                              rotationY: n.btrans.rY,
                              rotationZ: n.btrans.rZ,
                              overflow: "visible",
                            }),
                            (0 === n.btrans.rX && 0 == n.btrans.rY) ||
                              ((n.maskHasPerspective = !0),
                              (x.transformPerspective = i)),
                            R.add(tpGS.gsap.to(n.m, 0.001, x), 0))
                          : R.add(
                              tpGS.gsap.to(n.m, 0.001, {
                                clearProps: "transform",
                                overflow:
                                  "hidden" == n.ofHidOnHov
                                    ? "hidden"
                                    : "visible",
                              }),
                              0
                            ),
                        (M.force3D = "auto"),
                        n.fff
                          ? ((M.visibility = "visible"),
                            void 0 !== n.cbg && R.fromTo(n.cbg, I, T, M, 0),
                            !Q[o].BUG_safari_clipPath ||
                              T.clipPath ||
                              M.clipPath ||
                              n.spike,
                            (I = 0 < I ? I - 0.001 : I),
                            void 0 !== n.cbg && "column" === n.type
                              ? R.fromTo(v, I, J(T), J(M), 0)
                              : R.fromTo(v, I, T, M, 0),
                            R.invalidate())
                          : ("frame_999" !== n.frame &&
                              (M.visibility = "visible"),
                            void 0 !== n.cbg && R.to(n.cbg, I, M, 0),
                            void 0 !== n.cbg && "column" === n.type
                              ? R.to(v, I, J(M), 0)
                              : R.to(v, I, M, 0)),
                        void 0 !== P &&
                          "object" != typeof P &&
                          "function" != typeof P &&
                          0 <= P.indexOf("SFXBounce") &&
                          R.to(
                            v,
                            I,
                            {
                              scaleY: 0.5,
                              scaleX: 1.3,
                              ease: M.ease + "-squash",
                              transformOrigin: "bottom",
                            },
                            1e-4
                          );
                      L =
                        ("trigger" !== t.mode &&
                          ((!0 !== l && "skiprest" !== l) ||
                            "rebuild" !== t.mode)) ||
                        t.frame === f ||
                        void 0 === k.timeline.start ||
                        !Q.isNumeric(k.timeline.start)
                          ? "+=0" === k.timeline.start ||
                            void 0 === k.timeline.start
                            ? "+=0.001"
                            : parseInt(k.timeline.start, 0) / 1e3
                          : "+=" +
                            parseInt(
                              void 0 === k.timeline.startRelative
                                ? 0
                                : k.timeline.startRelative,
                              0
                            ) /
                              1e3;
                      n.timeline.addLabel(f, L),
                        n.timeline.add(R, L),
                        n.timeline.addLabel(f + "_end", "+=0.01"),
                        R.eventCallback("onStart", ee, [
                          { id: o, frame: f, L: r, tPE: i },
                        ]),
                        "true" == n.animationonscroll ||
                        1 == n.animationonscroll
                          ? (R.eventCallback("onUpdate", te, [
                              { id: o, frame: f, L: r },
                            ]),
                            (R.smoothChildTiming = !0))
                          : R.eventCallback("onUpdate", te, [
                              { id: o, frame: f, L: r },
                            ]),
                        R.eventCallback("onComplete", ie, [
                          { id: o, frame: f, L: r, tPE: i },
                        ]);
                    }
                  }
                }
              if (void 0 !== n.frames.loop) {
                var p = parseInt(n.frames.loop.timeline.speed, 0) / 1e3,
                  h = parseInt(n.frames.loop.timeline.start) / 1e3 || 0,
                  u =
                    ("trigger" !== t.mode && "frame_999" !== t.frame) ||
                    "frame_999" !== t.frame
                      ? 0.2
                      : 0,
                  g = h + u,
                  c =
                    ((n.loop = {
                      root: tpGS.gsap.timeline({}),
                      preset: tpGS.gsap.timeline({}),
                      move: tpGS.gsap.timeline({
                        repeat: -1,
                        yoyo: n.frames.loop.timeline.yoyo_move,
                      }),
                      rotate: tpGS.gsap.timeline({
                        repeat: -1,
                        yoyo: n.frames.loop.timeline.yoyo_rotate,
                      }),
                      scale: tpGS.gsap.timeline({
                        repeat: -1,
                        yoyo: n.frames.loop.timeline.yoyo_scale,
                      }),
                      filter: tpGS.gsap.timeline({
                        repeat: -1,
                        yoyo: n.frames.loop.timeline.yoyo_filter,
                      }),
                    }),
                    n.frames.loop.frame_0),
                  h = n.frames.loop.frame_999,
                  B =
                    "blur(" +
                    parseInt(c.blur || 0, 0) +
                    "px) grayscale(" +
                    parseInt(c.grayscale || 0, 0) +
                    "%) brightness(" +
                    parseInt(c.brightness || 100, 0) +
                    "%)",
                  N =
                    "blur(" +
                    (h.blur || 0) +
                    "px) grayscale(" +
                    (h.grayscale || 0) +
                    "%) brightness(" +
                    (h.brightness || 100) +
                    "%)";
                if (
                  (n.loop.root.add(n.loop.preset, 0),
                  n.loop.root.add(n.loop.move, u),
                  n.loop.root.add(n.loop.rotate, u),
                  n.loop.root.add(n.loop.scale, u),
                  n.loop.root.add(n.loop.filter, u),
                  "blur(0px) grayscale(0%) brightness(100%)" === B &&
                    "blur(0px) grayscale(0%) brightness(100%)" === N &&
                    (N = B = "none"),
                  (h.originX = c.originX),
                  (h.originY = c.originY),
                  (h.originZ = c.originZ),
                  void 0 === i &&
                    (i =
                      "isometric" === Q[o].perspectiveType
                        ? 0
                        : "local" === Q[o].perspectiveType && void 0 !== M
                        ? void 0 !== M.transformPerspective
                          ? M.transformPerspective
                          : n.fff && void 0 !== T.transfromPerspective
                          ? T.transfromPerspective
                          : Q[o].perspective
                        : Q[o].perspective),
                  n.frames.loop.timeline.curved)
                ) {
                  var j,
                    V = parseInt(n.frames.loop.timeline.radiusAngle, 0) || 0,
                    X = [
                      {
                        x: (c.x - c.xr) * Q[o].CM.w,
                        y: 0,
                        z: (c.z - c.zr) * Q[o].CM.w,
                      },
                      { x: 0, y: (c.y + c.yr) * Q[o].CM.w, z: 0 },
                      {
                        x: (h.x + h.xr) * Q[o].CM.w,
                        y: 0,
                        z: (h.z + h.zr) * Q[o].CM.w,
                      },
                      { x: 0, y: (h.y - h.yr) * Q[o].CM.w, z: 0 },
                    ],
                    G = {
                      type: "thru",
                      curviness: n.frames.loop.timeline.curviness,
                      path: [],
                      autoRotate: n.frames.loop.timeline.autoRotate,
                    };
                  for (j in X)
                    X.hasOwnProperty(j) &&
                      ((G.path[j] = X[V]), (V = ++V == X.length ? 0 : V));
                  (("trigger" !== t.mode && "frame_999" !== t.frame) ||
                    "frame_999" !== t.frame) &&
                    n.loop.preset.fromTo(
                      n.lp,
                      u,
                      {
                        "-webkit-filter": B,
                        filter: B,
                        x: 0,
                        y: 0,
                        z: 0,
                        minWidth:
                          n._incolumn || n._ingroup
                            ? "100%"
                            : void 0 === n.eow
                            ? 0
                            : n.eow,
                        minHeight:
                          n._incolumn || n._ingroup
                            ? "100%"
                            : void 0 === n.eoh
                            ? 0
                            : n.eoh,
                        scaleX: 1,
                        scaleY: 1,
                        skewX: 0,
                        skewY: 0,
                        rotationX: 0,
                        rotationY: 0,
                        rotationZ: 0,
                        transformPerspective: i,
                        transformOrigin:
                          h.originX + " " + h.originY + " " + h.originZ,
                        opacity: 1,
                      },
                      K({
                        x: G.path[3].x,
                        y: G.path[3].y,
                        z: G.path[3].z,
                        scaleX: c.scaleX,
                        skewX: c.skewX,
                        skewY: c.skewY,
                        scaleY: c.scaleY,
                        rotationX: c.rotationX,
                        rotationY: c.rotationY,
                        rotationZ: c.rotationZ,
                        "-webkit-filter": B,
                        filter: B,
                        ease: "sine.inOut",
                        opacity: c.opacity,
                      }),
                      0
                    ),
                    Z(G) &&
                      n.loop.move.to(
                        n.lp,
                        n.frames.loop.timeline.yoyo_move ? p / 2 : p,
                        { motionPath: G, ease: n.frames.loop.timeline.ease }
                      );
                } else
                  (("trigger" !== t.mode && "frame_999" !== t.frame) ||
                    "frame_999" !== t.frame) &&
                    n.loop.preset.fromTo(
                      n.lp,
                      u,
                      {
                        "-webkit-filter": B,
                        filter: B,
                        x: 0,
                        y: 0,
                        z: 0,
                        minWidth:
                          n._incolumn || n._ingroup
                            ? "100%"
                            : void 0 === n.eow
                            ? 0
                            : n.eow,
                        minHeight:
                          n._incolumn || n._ingroup
                            ? "100%"
                            : void 0 === n.eoh
                            ? 0
                            : n.eoh,
                        scaleX: 1,
                        scaleY: 1,
                        skewX: 0,
                        skewY: 0,
                        rotationX: 0,
                        rotationY: 0,
                        rotationZ: 0,
                        transformPerspective: i,
                        transformOrigin:
                          h.originX + " " + h.originY + " " + h.originZ,
                        opacity: 1,
                      },
                      K({
                        x: c.x * Q[o].CM.w,
                        y: c.y * Q[o].CM.w,
                        z: c.z * Q[o].CM.w,
                        scaleX: c.scaleX,
                        skewX: c.skewX,
                        skewY: c.skewY,
                        scaleY: c.scaleY,
                        rotationX: c.rotationX,
                        rotationY: c.rotationY,
                        rotationZ: c.rotationZ,
                        ease: "sine.out",
                        opacity: c.opacity,
                        "-webkit-filter": B,
                        filter: B,
                      }),
                      0
                    ),
                    n.loop.move.to(
                      n.lp,
                      n.frames.loop.timeline.yoyo_move ? p / 2 : p,
                      {
                        x: h.x * Q[o].CM.w,
                        y: h.y * Q[o].CM.w,
                        z: h.z * Q[o].CM.w,
                        ease: n.frames.loop.timeline.ease,
                      }
                    );
                n.loop.rotate.to(
                  n.lp,
                  n.frames.loop.timeline.yoyo_rotate ? p / 2 : p,
                  {
                    rotationX: h.rotationX,
                    rotationY: h.rotationY,
                    rotationZ: h.rotationZ,
                    ease: n.frames.loop.timeline.ease,
                  }
                ),
                  n.loop.scale.to(
                    n.lp,
                    n.frames.loop.timeline.yoyo_scale ? p / 2 : p,
                    K({
                      scaleX: h.scaleX,
                      scaleY: h.scaleY,
                      skewX: h.skewX,
                      skewY: h.skewY,
                      ease: n.frames.loop.timeline.ease,
                    })
                  );
                u = {
                  opacity: h.opacity || 1,
                  ease: n.frames.loop.timeline.ease,
                  "-webkit-filter": N,
                  filter: N,
                };
                n.loop.filter.to(
                  n.lp,
                  n.frames.loop.timeline.yoyo_filter ? p / 2 : p,
                  u
                ),
                  n.timeline.add(n.loop.root, g);
              }
              if (
                (void 0 === n.frames.frame_hover ||
                  ("start" !== t.mode && void 0 !== n.hoverframeadded) ||
                  ((n.hoverframeadded = !0),
                  (a = n.frames.frame_hover.timeline.speed / 1e3),
                  (n.cachedHoverSpeed = a = 0 == a ? 1e-5 : a),
                  n.hoverlistener) ||
                  ((n.hoverlistener = !0),
                  Q.document.on(
                    "mouseenter mousemove",
                    ("column" === n.type && void 0 !== n.cbg
                      ? "#" + n.cbg[0].id + ","
                      : "") +
                      "#" +
                      n.c[0].id,
                    function (e) {
                      (n.mouseIsOver = !0),
                        1 == n.ignoreHoverFrames ||
                          ("mousemove" === e.type &&
                            !0 === n.ignoremousemove) ||
                          ((n.animationonscroll || n.readyForHover) &&
                            ((n.elementHovered = !0),
                            n.hovertimeline ||
                              (n.hovertimeline = tpGS.gsap.timeline({
                                paused: !0,
                              })),
                            0 == n.hovertimeline.progress() &&
                              (void 0 === n.lastHoveredTimeStamp ||
                                150 <
                                  new Date().getTime() -
                                    n.lastHoveredTimeStamp) &&
                              ((n.ignoremousemove = !0),
                              (n.ofHidOnHov = n.frames.frame_hover.mask
                                ? "hidden"
                                : "visible"),
                              n.hovertimeline.to(
                                void 0 !== n.m && void 0 !== n.cbgmask
                                  ? [n.m, n.cbgmask]
                                  : void 0 !== n.m
                                  ? n.m
                                  : n.cbgmask,
                                a,
                                { overflow: n.ofHidOnHov },
                                0
                              ),
                              "column" === n.type &&
                                null != n.cbg &&
                                n.hovertimeline.to(
                                  n.cbg,
                                  a,
                                  Q.clone(
                                    Q.convertHoverTransform(
                                      n.frames.frame_hover,
                                      n.cbg,
                                      {
                                        bgCol: n.bgcol,
                                        bg: n.styleProps.background,
                                      }
                                    )
                                  ),
                                  0
                                ),
                              ("text" !== n.type && "button" !== n.type) ||
                                void 0 === n.splitText ||
                                !1 === n.splitText ||
                                n.hovertimeline.to(
                                  [
                                    n.splitText.lines,
                                    n.splitText.words,
                                    n.splitText.chars,
                                  ],
                                  a,
                                  {
                                    color: n.frames.frame_hover.color,
                                    ease: n.frames.frame_hover.transform.ease,
                                  },
                                  0
                                ),
                              "column" === n.type
                                ? n.hovertimeline.to(
                                    n.c,
                                    a,
                                    J(
                                      Q.clone(
                                        Q.convertHoverTransform(
                                          n.frames.frame_hover,
                                          n.c,
                                          {
                                            bgCol: n.bgcol,
                                            bg: n.styleProps.background,
                                          }
                                        )
                                      )
                                    ),
                                    0
                                  )
                                : n.hovertimeline.to(
                                    n.c,
                                    a,
                                    Q.clone(
                                      Q.convertHoverTransform(
                                        n.frames.frame_hover,
                                        n.c,
                                        {
                                          bgCol: n.bgcol,
                                          bg: n.styleProps.background,
                                        }
                                      )
                                    ),
                                    0
                                  ),
                              (n.pZindex = n.p[0].style.zIndex),
                              (n.p[0].style.zIndex = parseInt(
                                n.frames &&
                                  n.frames.frame_hover &&
                                  void 0 !==
                                    n.frames.frame_hover.transform.zIndex
                                  ? n.frames.frame_hover.transform.zIndex
                                  : n.pZindex
                              )),
                              "svg" === n.type) &&
                              ((n.svgHTemp = Q.clone(n.svgH)),
                              delete n.svgHTemp.svgAll,
                              (e = Array.isArray(n.svgHTemp.fill)
                                ? n.svgHTemp.fill[Q[o].level]
                                : n.svgHTemp.fill),
                              (n.svgHTemp.fill = e),
                              n.hovertimeline.to(n.svg, a, n.svgHTemp, 0),
                              n.svg.length <= 0 && (n.svg = r.find("svg")),
                              n.svgPath.length <= 0 &&
                                (n.svgPath = n.svg.find(
                                  n.svgI.svgAll
                                    ? "path, circle, ellipse, line, polygon, polyline, rect"
                                    : "path"
                                )),
                              n.hovertimeline.to(n.svgPath, a, { fill: e }, 0)),
                            n.hovertimeline.play()),
                          (n.lastHoveredTimeStamp = new Date().getTime()));
                    }
                  ),
                  Q.document.on(
                    "mouseleave",
                    ("column" === n.type && void 0 !== n.cbg
                      ? "#" + n.cbg[0].id + ","
                      : "") +
                      "#" +
                      n.c[0].id,
                    function () {
                      (n.mouseIsOver = !1),
                        1 != n.ignoreHoverFrames &&
                          ((n.elementHovered = !1),
                          n.animationonscroll || n.readyForHover) &&
                          void 0 !== n.hovertimeline &&
                          (n.hovertimeline.reverse(),
                          (n.p[0].style.zIndex = n.pZindex || n.zIndex),
                          n.hovertimeline.eventCallback(
                            "onReverseComplete",
                            Q.hoverReverseDone,
                            [{ id: o, L: r }]
                          ));
                    }
                  )),
                z ||
                  (n.lastRequestedMainFrame =
                    "start" === t.mode
                      ? "frame_1"
                      : "continue" === t.mode
                      ? void 0 === t.frame
                        ? n.currentframe
                        : t.frame
                      : n.lastRequestedMainFrame),
                void 0 !== t.totime
                  ? (n.tSTART = t.totime)
                  : void 0 !== F && void 0 === t.frame
                  ? (n.tSTART = F)
                  : void 0 !== t.frame
                  ? (n.tSTART = t.frame)
                  : (n.tSTART = 0),
                0 === n.tSTART &&
                  void 0 === n.startedAnimOnce &&
                  void 0 === n.leftstage &&
                  void 0 === n.startedAnimOnce &&
                  !0 === n.hideonfirststart &&
                  "preset" === t.mode &&
                  ((Q[o]._L[r[0].id].pVisRequest = 0),
                  (n.hideonfirststart = !1)),
                (("frame_999" !== n.tSTART &&
                  "frame_999" !== n.triggeredFrame) ||
                  (!n.leftstage && void 0 !== n.startedAnimOnce)) &&
                  ("true" != n.animationonscroll && 1 != n.animationonscroll
                    ? n.timeline.play(n.tSTART)
                    : n.timeline.time(n.tSTART),
                  0 <= jQuery.inArray(n.type, ["group", "row", "column"])) &&
                  (void 0 !== t.frame || !0 === t.updateChildren))
              ) {
                if (void 0 === n.childrenJS)
                  for (var D in ((n.childrenJS = {}), Q[o]._L)) {
                    var U =
                      void 0 !== Q[o]._L[D]._lig ? Q[o]._L[D]._lig[0] : void 0;
                    null != U &&
                      U.id === r[0].id &&
                      U.id !== Q[o]._L[D].c[0].id &&
                      (n.childrenJS[Q[o]._L[D].c[0].id] = Q[o]._L[D].c);
                  }
                (t.frame = "0" == t.frame ? "frame_0" : t.frame),
                  (t.frame = "1" == t.frame ? "frame_1" : t.frame),
                  (t.frame = "999" == t.frame ? "frame_999" : t.frame);
                var Y =
                  void 0 === t.totime
                    ? void 0 !== n.frames[t.frame].timeline.startAbsolute
                      ? parseInt(n.frames[t.frame].timeline.startAbsolute, 0) /
                        1e3
                      : void 0 !== n.frames[t.frame].timeline.start
                      ? Q.isNumeric(n.frames[t.frame].timeline.start)
                        ? parseInt(n.frames[t.frame].timeline.start, 0) / 1e3
                        : 0
                      : 0.001
                    : t.totime;
                if (!0 === t.updateChildren)
                  for (var D in n.childrenJS)
                    n.childrenJS.hasOwnProperty(D) &&
                      Q.renderLayerAnimation({
                        layer: n.childrenJS[D],
                        fastforward: !1,
                        id: o,
                        mode: "continue",
                        updateChildren: !0,
                        totime: Y,
                      });
                else
                  for (var D in n.childrenJS)
                    n.childrenJS.hasOwnProperty(D) &&
                      Q[o]._L[D].pausedTrueParrent &&
                      (Q.renderLayerAnimation({
                        layer: n.childrenJS[D],
                        fastforward: !1,
                        id: o,
                        mode: "continue",
                        updateChildren: !0,
                        totime: Y,
                      }),
                      (Q[o]._L[D].pausedTrueParrent = !1));
              }
            }
          },
        }),
        function (e) {
          e = Q.clone(e);
          return (
            delete e.backgroundColor,
            delete e.background,
            delete e.backgroundImage,
            delete e.borderSize,
            delete e.borderStyle,
            delete e["backdrop-filter"],
            e
          );
        }),
      Z = function (e) {
        if (void 0 !== e && void 0 !== e.path && Array.isArray(e.path)) {
          var t,
            i = 0,
            a = 0;
          for (t in e.path)
            !e.path.hasOwnProperty(t) ||
              0 < i ||
              0 < a ||
              ((i += e.path[t].x), (a += e.path[t].y));
          return 0 != i || 0 != a;
        }
      },
      K = function (e) {
        return (
          void 0 === e.skewX && delete e.skewX,
          void 0 === e.skewY && delete e.skewY,
          e
        );
      },
      $ = function (a) {
        a.from = "edge" === a.from ? "edges" : a.from;
        var r = tpGS.gsap.utils.distribute(a);
        return function (e, t, i) {
          return r(e, t, i) + ((!(e <= i.length / 2) && a.offset) || 0);
        };
      },
      ee = function (e) {
        var t = Q[e.id]._L[e.L[0].id],
          i = Q[e.id]._L[t._ligid],
          a =
            (Q[e.id].BUG_safari_clipPath &&
              e.L[0].classList.remove("rs-pelock"),
            !(t._ingroup || t._incolumn || t._inrow) ||
              void 0 === i ||
              void 0 === i.timeline ||
              i.timeline.isActive() ||
              void 0 === t ||
              void 0 === t.frames[t.timeline.currentLabel()] ||
              ((null == i.timezone ||
                i.timezone.to <=
                  parseInt(
                    t.frames[t.timeline.currentLabel()].timeline.start,
                    0
                  )) &&
                !0 !== t.animOnScrollForceDisable &&
                ((t.pausedTrueParrent = !0), t.timeline.pause())),
            t.hovertimeline),
          a =
            (a &&
              0 < a.time() &&
              (a.pause(), a.time(0), a.kill(), delete t.hovertimeline),
            delete t.childrenAtStartNotVisible,
            (t.pVisRequest = 1),
            { layer: e.L });
        (t.tweenOnStart = !0),
          (t.animatingFrame = e.frame),
          (t.ignoremousemove = !1),
          (t.leftstage = !1),
          (t.readyForHover = !1),
          (t.tweenDirection =
            1 == t.animationonscroll || "true" == t.animationonscroll
              ? t.animteToTimeCache > t.animteToTime
                ? -1
                : 1
              : void 0),
          void 0 !== t.layerLoop &&
            t.layerLoop.from === e.frame &&
            t.layerLoop.count++,
          "" + t.tweenDirection == "-1" &&
          ("frame_0" === e.frame ||
            ("frame_1" == e.frame && t.animteToTime <= 0.01)) &&
          "column" !== t.type &&
          "row" !== t.type &&
          "group" !== t.type
            ? ((t.leftstage = !0),
              (t.pVisRequest = 0),
              (t.pPeventsRequest = "none"),
              window.requestAnimationFrame(function () {
                Q.requestLayerUpdates(e.id, "leftstage", e.L[0].id);
              }))
            : ("frame_1" === e.frame &&
                "Safari" === window.RSBrowser &&
                void 0 === t.safariRenderIssue &&
                (tpGS.gsap.set([t.c], { opacity: 1 }),
                (t.safariRenderIssue = !0)),
              "frame_999" !== e.frame &&
                ((t.startedAnimOnce = !0),
                (t.pPeventsRequest = t.noPevents ? "none" : "auto")),
              (a.eventtype =
                "frame_0" === e.frame || "frame_1" === e.frame
                  ? "enterstage"
                  : "frame_999" === e.frame
                  ? "leavestage"
                  : "framestarted"),
              t._ingroup &&
                void 0 !== i &&
                !0 !== i.frames.frame_1.timeline.waitoncall &&
                (i.pVisRequest = 1),
              Q.requestLayerUpdates(
                e.id,
                a.eventtype,
                e.L[0].id,
                void 0 !== t.frames[e.frame] &&
                  void 0 !== t.frames[e.frame].timeline &&
                  0 == t.frames[e.frame].timeline.usePerspective
                  ? e.tPE
                  : "ignore"
              )),
          (a.id = e.id),
          (a.layerid = e.L[0].id),
          (a.layertype = t.type),
          (a.frame_index = e.frame),
          (a.layersettings = t),
          Q[e.id].c.trigger("revolution.layeraction", [a]),
          "enterstage" === a.eventtype && Q.toggleState(t.layertoggledby),
          "frame_1" === e.frame && Q.animcompleted(e.L, e.id);
      },
      te = function (e) {
        var t = Q[e.id]._L[e.L[0].id];
        (t.animatingFrame = e.frame),
          (t.tweenOnStart = !1),
          (t.tweenOnEnd = !1),
          "frame_999" === e.frame &&
            ((t.pVisRequest = 1),
            (t.pPeventsRequest = t.noPevents ? "none" : "auto"),
            (t.leftstage = !1),
            window.requestAnimationFrame(function () {
              Q.requestLayerUpdates(e.id, "update", e.L[0].id);
            }));
      },
      ie = function (e) {
        var t,
          i = Q[e.id]._L[e.L[0].id],
          a = !0,
          r =
            (("column" !== i.type && "row" !== i.type && "group" !== i.type) ||
              ((t = i.timeline.currentLabel()),
              (r = jQuery.inArray(t, i.ford)),
              (r = i.ford.length > ++r ? i.ford[r] : t),
              void 0 !== i.frames[r] &&
                void 0 !== i.frames[t] &&
                (i.timezone = {
                  from: parseInt(i.frames[t].timeline.startAbsolute, 0),
                  to: parseInt(i.frames[r].timeline.startAbsolute, 0),
                })),
            "frame_999" !== e.frame &&
              Q[e.id].isEdge &&
              "shape" === i.type &&
              ((t = i.c[0].style.opacity),
              (i.c[0].style.opacity = t - 1e-4),
              tpGS.gsap.set(i.c[0], { opacity: t - 0.001, delay: 0.05 }),
              tpGS.gsap.set(i.c[0], { opacity: t, delay: 0.1 })),
            (i.animatingFrame = "done"),
            (i.animatedFrame = e.frame),
            (i.tweenOnStart = !1),
            (i.tweenOnEnd = !0),
            (i.tweenDirection =
              1 == i.animationonscroll || "true" == i.animationonscroll
                ? i.animteToTimeCache > i.animteToTime
                  ? -1
                  : 1
                : void 0),
            {});
        (r.layer = e.L),
          (r.eventtype =
            "frame_0" === e.frame || "frame_1" === e.frame
              ? "enteredstage"
              : "frame_999" === e.frame
              ? "leftstage"
              : "frameended"),
          (i.readyForHover = !0),
          (r.layertype = i.type),
          (r.frame_index = e.frame),
          (r.layersettings = i),
          Q[e.id].c.trigger("revolution.layeraction", [r]),
          "frame_999" === e.frame && "leftstage" === r.eventtype
            ? ((i.leftstage = !0),
              (i.pVisRequest = 0),
              (a = !(i.pPeventsRequest = "none")),
              window.requestAnimationFrame(function () {
                Q.requestLayerUpdates(e.id, "leftstage", e.L[0].id);
              }))
            : (e.L[0].id,
              void 0 !== i.frames[e.frame] &&
                void 0 !== i.frames[e.frame].timeline &&
                0 == i.frames[e.frame].timeline.usePerspective &&
                window.requestAnimationFrame(function () {
                  Q.requestLayerUpdates(e.id, "frameended", e.L[0].id, e.tPE);
                })),
          "leftstage" === r.eventtype &&
            void 0 !== Q[e.id].videos &&
            void 0 !== Q[e.id].videos[e.L[0].id] &&
            Q.stopVideo &&
            Q.stopVideo(e.L, e.id),
          "column" === i.type &&
            void 0 !== i.cbg &&
            tpGS.gsap.to(i.cbg, 0.01, { visibility: "visible" }),
          "leftstage" === r.eventtype &&
            (Q.unToggleState(e.layertoggledby), "video" === i.type) &&
            Q.resetVideo &&
            setTimeout(function () {
              Q.resetVideo(e.L, e.id);
            }, 100),
          Q[e.id].BUG_safari_clipPath &&
            !a &&
            e.L[0].classList.add("rs-pelock"),
          void 0 !== i.layerLoop &&
            i.layerLoop.to === e.frame &&
            (-1 == i.layerLoop.repeat ||
              i.layerLoop.repeat > i.layerLoop.count) &&
            i.timeline.seek(i.layerLoop.from).play();
      },
      v = function (e) {
        var t;
        return void 0 === e
          ? ""
          : ((t = ""),
            Q.isChrome8889 && 0 === e.blur && (e.blur = 0.05),
            (t = void 0 !== e.blur ? "blur(" + (e.blur || 0) + "px)" : ""),
            (t =
              (t +=
                void 0 !== e.grayscale
                  ? (0 < t.length ? " " : "") +
                    "grayscale(" +
                    (e.grayscale || 0) +
                    "%)"
                  : "") +
              (void 0 !== e.brightness
                ? (0 < t.length ? " " : "") +
                  "brightness(" +
                  (e.brightness || 100) +
                  "%)"
                : "")) || "none");
      },
      o = function (e, t) {
        var i = (e = e.split("("))[0];
        return e.shift(), i + "(" + t + "deg, " + e.join("(");
      },
      s = function (e) {
        if (-1 !== e.search("deg,")) {
          e = e.split("deg,")[0];
          if (-1 !== e.search(/\(/)) return parseInt(e.split("(")[1], 10);
        }
        return 180;
      },
      S = function (e, t) {
        if (void 0 !== e && 0 <= e.indexOf("oc:t")) return {};
        e = void 0 === e ? "" : e.split(";");
        var i,
          a = {
            fill: Q.revToResp("#ffffff", Q[t].rle),
            stroke: "transparent",
            "stroke-width": "0px",
            "stroke-dasharray": "0",
            "stroke-dashoffset": "0",
          };
        for (i in e)
          if (e.hasOwnProperty(i)) {
            var r = e[i].split(":");
            switch (r[0]) {
              case "c":
                a.fill = Q.revToResp(r[1], Q[t].rle, void 0, "||");
                break;
              case "sw":
                a["stroke-width"] = r[1];
                break;
              case "sc":
                a.stroke = r[1];
                break;
              case "so":
                a["stroke-dashoffset"] = r[1];
                break;
              case "sa":
                a["stroke-dasharray"] = r[1];
                break;
              case "sall":
                a.svgAll = r[1];
            }
          }
        return a;
      },
      x = function (e) {
        return "c" === e
          ? "center"
          : "l" === e
          ? "left"
          : "r" === e
          ? "right"
          : e;
      },
      ae = function (e) {
        var t = Q[e.id]._L[e.layer[0].id],
          i = !1;
        if (
          (t.splitText && !1 !== t.splitText && t.splitText.revert(),
          "text" === t.type || "button" === t.type)
        ) {
          for (var a in t.frames)
            if (
              void 0 !== t.frames[a].chars ||
              void 0 !== t.frames[a].words ||
              void 0 !== t.frames[a].lines
            ) {
              i = !0;
              break;
            }
          t.splitText =
            !!i &&
            new tpGS.SplitText(t.c, {
              type: "lines,words,chars",
              wordsClass: "rs_splitted_words",
              linesClass: "rs_splitted_lines",
              charsClass: "rs_splitted_chars",
            });
        } else t.splitText = !1;
      },
      re = function (e, t, i) {
        if (void 0 !== e && 0 <= e.indexOf("block")) {
          var a = {};
          switch (
            (0 === t[0].getElementsByClassName("tp-blockmask_in").length &&
              (t.append('<div class="tp-blockmask_in"></div>'),
              t.append('<div class="tp-blockmask_out"></div>')),
            (a.ft = [
              { scaleY: 1, scaleX: 0, transformOrigin: "0% 50%" },
              {
                scaleY: 1,
                scaleX: 1,
                ease: (i = void 0 === i ? "power3.inOut" : i),
                immediateRender: !1,
              },
            ]),
            (a.t = {
              scaleY: 1,
              scaleX: 0,
              transformOrigin: "100% 50%",
              ease: i,
              immediateRender: !1,
            }),
            (a.bmask_in = t.find(".tp-blockmask_in")),
            (a.bmask_out = t.find(".tp-blockmask_out")),
            (a.type = "block"),
            e)
          ) {
            case "blocktoleft":
            case "blockfromright":
              (a.ft[0].transformOrigin = "100% 50%"),
                (a.t.transformOrigin = "0% 50%");
              break;
            case "blockfromtop":
            case "blocktobottom":
              (a.ft = [
                { scaleX: 1, scaleY: 0, transformOrigin: "50% 0%" },
                { scaleX: 1, scaleY: 1, ease: i, immediateRender: !1 },
              ]),
                (a.t = {
                  scaleX: 1,
                  scaleY: 0,
                  transformOrigin: "50% 100%",
                  ease: i,
                  immediateRender: !1,
                });
              break;
            case "blocktotop":
            case "blockfrombottom":
              (a.ft = [
                { scaleX: 1, scaleY: 0, transformOrigin: "50% 100%" },
                { scaleX: 1, scaleY: 1, ease: i, immediateRender: !1 },
              ]),
                (a.t = {
                  scaleX: 1,
                  scaleY: 0,
                  transformOrigin: "50% 0%",
                  ease: i,
                  immediateRender: !1,
                });
          }
          return (a.ft[1].overwrite = "auto"), (a.t.overwrite = "auto"), a;
        }
        return !1;
      },
      oe = function (e) {
        var t,
          i,
          a = Q[e.id]._L[e.layer[0].id],
          r =
            void 0 === e.source
              ? Q.clone(e.frame.transform)
              : Q.clone(e.frame[e.source]),
          o = { originX: "50%", originY: "50%", originZ: "0" },
          s =
            void 0 !== a._lig && void 0 !== Q[e.id]._L[a._lig[0].id]
              ? Q[e.id]._L[a._lig[0].id].eow
              : Q[e.id].conw,
          n =
            void 0 !== a._lig && void 0 !== Q[e.id]._L[a._lig[0].id]
              ? Q[e.id]._L[a._lig[0].id].eoh
              : Q[e.id].conh;
        for (i in r)
          if (r.hasOwnProperty(i)) {
            if (
              ((r[i] = "object" == typeof r[i] ? r[i][Q[e.id].level] : r[i]),
              "inherit" === r[i] ||
                "delay" === i ||
                "direction" === i ||
                "use" === i)
            )
              delete r[i];
            else if ("originX" === i || "originY" === i || "originZ" === i)
              (o[i] = r[i]), delete r[i];
            else if (Q.isNumeric(r[i], 0))
              r[i] = m(r[i], e.frame.reverse, e.target, i, e.id, e.id);
            else if ("r" === r[i][0] && "a" === r[i][1] && "(" === r[i][3])
              r[i] = r[i].replace("ran", "random");
            else if (0 <= r[i].indexOf("cyc(")) {
              var l = r[i]
                .replace("cyc(", "")
                .replace(")", "")
                .replace("[", "")
                .replace("]", "")
                .split("|");
              r[i] = new (function (e) {
                return tpGS.gsap.utils.wrap(l, void 0);
              })();
            } else if (
              0 <= r[i].indexOf("%") &&
              Q.isNumeric((t = parseInt(r[i], 0)))
            )
              r[i] =
                "x" === i
                  ? m(
                      ((a.eow || 0) * t) / 100,
                      e.frame.reverse,
                      e.target,
                      i,
                      e.id
                    )
                  : "y" === i
                  ? m(
                      ((a.eoh || 0) * t) / 100,
                      e.frame.reverse,
                      e.target,
                      i,
                      e.id
                    )
                  : r[i];
            else {
              (r[i] = r[i].replace("[", "").replace("]", "")),
                (r[i] = m(r[i], e.frame.reverse, e.target, i, e.id, e.id));
              var d = { t: 0, b: 0 };
              switch (
                ("row" === a.type &&
                  ("rev_row_zone_top" === a.zone &&
                  void 0 !== Q[e.id].topZones[a.slideIndex] &&
                  void 0 !== Q[e.id].topZones[a.slideIndex][0]
                    ? (d = { t: 0, b: 0 })
                    : "rev_row_zone_middle" === a.zone &&
                      void 0 !== Q[e.id].middleZones[a.slideIndex] &&
                      void 0 !== Q[e.id].middleZones[a.slideIndex][0]
                    ? (d = {
                        t: Math.round(
                          Q[e.id].module.height / 2 -
                            Q[e.id].middleZones[a.slideIndex][0].offsetHeight /
                              2
                        ),
                        b: Math.round(
                          Q[e.id].module.height / 2 +
                            Q[e.id].middleZones[a.slideIndex][0].offsetHeight /
                              2
                        ),
                      })
                    : "rev_row_zone_bottom" === a.zone &&
                      void 0 !== Q[e.id].bottomZones[a.slideIndex] &&
                      void 0 !== Q[e.id].bottomZones[a.slideIndex][0] &&
                      (d = {
                        t: Math.round(
                          Q[e.id].module.height -
                            Q[e.id].bottomZones[a.slideIndex][0].offsetHeight
                        ),
                        b:
                          Q[e.id].module.height +
                          Q[e.id].bottomZones[a.slideIndex][0].offsetHeight,
                      })),
                r[i])
              ) {
                case "t":
                case "top":
                  r[i] =
                    0 -
                    (a.eoh || 0) -
                    (("column" !== a.type && a.calcy) || 0) -
                    Q.getLayerParallaxOffset(e.id, e.layer[0].id, "v") -
                    ("row" === a.type && void 0 !== a.marginTop
                      ? a.marginTop[Q[e.id].level]
                      : 0) -
                    d.b;
                  break;
                case "b":
                case "bottom":
                  r[i] =
                    n -
                    (("column" !== a.type && "row" !== a.type && a.calcy) ||
                      0) +
                    Q.getLayerParallaxOffset(e.id, e.layer[0].id, "v") -
                    d.t;
                  break;
                case "l":
                case "left":
                  r[i] =
                    0 -
                    ("row" === a.type ? a.pow : a.eow || 0) -
                    ("column" === a.type
                      ? 0
                      : "row" === a.type
                      ? a.rowcalcx
                      : a.calcx || 0) -
                    Q.getLayerParallaxOffset(e.id, e.layer[0].id, "h");
                  break;
                case "r":
                case "right":
                  r[i] =
                    s -
                    ("column" === a.type
                      ? 0
                      : "row" === a.type
                      ? a.rowcalcx
                      : a.calcx || 0) +
                    Q.getLayerParallaxOffset(e.id, e.layer[0].id, "h");
                  break;
                case "m":
                case "c":
                case "middle":
                case "center":
                  r[i] =
                    "x" === i
                      ? m(
                          s / 2 -
                            (("column" !== a.type && a.calcx) || 0) -
                            (a.eow || 0) / 2,
                          e.frame.reverse,
                          e.target,
                          i,
                          e.id
                        )
                      : "y" === i
                      ? m(
                          n / 2 -
                            (("column" !== a.type && a.calcy) || 0) -
                            (a.eoh || 0) / 2,
                          e.frame.reverse,
                          e.target,
                          i,
                          e.id
                        )
                      : r[i];
              }
            }
            "skewX" === i &&
              void 0 !== r[i] &&
              ((r.scaleY = void 0 === r.scaleY ? 1 : parseFloat(r.scaleY)),
              (r.scaleY *= Math.cos(parseFloat(r[i]) * tpGS.DEG2RAD))),
              "skewY" === i &&
                void 0 !== r[i] &&
                ((r.scaleX = void 0 === r.scaleX ? 1 : parseFloat(r.scaleX)),
                (r.scaleX *= Math.cos(parseFloat(r[i]) * tpGS.DEG2RAD)));
          }
        if (
          ((r.transformOrigin = o.originX + " " + o.originY + " " + o.originZ),
          !Q[e.id].BUG_ie_clipPath &&
            void 0 !== r.clip &&
            void 0 !== a.clipPath &&
            a.clipPath.use)
        ) {
          r.clipB = null == r.clipB ? 100 : r.clipB;
          var c = "rectangle" == a.clipPath.type,
            p = parseInt(r.clip, 0),
            g = 100 - parseInt(r.clipB, 0),
            u = Math.round(p / 2);
          switch (a.clipPath.origin) {
            case "invh":
              r.clipPath =
                "polygon(0% 0%, 0% 100%, " +
                p +
                "% 100%, " +
                p +
                "% 0%, 100% 0%, 100% 100%, " +
                g +
                "% 100%, " +
                g +
                "% 0%, 0% 0%)";
              break;
            case "invv":
              r.clipPath =
                "polygon(100% 0%, 0% 0%, 0% " +
                p +
                "%, 100% " +
                p +
                "%, 100% 100%, 0% 100%, 0% " +
                g +
                "%, 100% " +
                g +
                "%, 100% 0%)";
              break;
            case "cv":
              r.clipPath = c
                ? "polygon(" +
                  (50 - u) +
                  "% 0%, " +
                  (50 + u) +
                  "% 0%, " +
                  (50 + u) +
                  "% 100%, " +
                  (50 - u) +
                  "% 100%)"
                : "circle(" + p + "% at 50% 50%)";
              break;
            case "ch":
              r.clipPath = c
                ? "polygon(0% " +
                  (50 - u) +
                  "%, 0% " +
                  (50 + u) +
                  "%, 100% " +
                  (50 + u) +
                  "%, 100% " +
                  (50 - u) +
                  "%)"
                : "circle(" + p + "% at 50% 50%)";
              break;
            case "l":
              r.clipPath = c
                ? "polygon(0% 0%, " + p + "% 0%, " + p + "% 100%, 0% 100%)"
                : "circle(" + p + "% at 0% 50%)";
              break;
            case "r":
              r.clipPath = c
                ? "polygon(" +
                  (100 - p) +
                  "% 0%, 100% 0%, 100% 100%, " +
                  (100 - p) +
                  "% 100%)"
                : "circle(" + p + "% at 100% 50%)";
              break;
            case "t":
              r.clipPath = c
                ? "polygon(0% 0%, 100% 0%, 100% " + p + "%, 0% " + p + "%)"
                : "circle(" + p + "% at 50% 0%)";
              break;
            case "b":
              r.clipPath = c
                ? "polygon(0% 100%, 100% 100%, 100% " +
                  (100 - p) +
                  "%, 0% " +
                  (100 - p) +
                  "%)"
                : "circle(" + p + "% at 50% 100%)";
              break;
            case "lt":
              r.clipPath = c
                ? "polygon(0% 0%," + 2 * p + "% 0%, 0% " + 2 * p + "%)"
                : "circle(" + p + "% at 0% 0%)";
              break;
            case "lb":
              r.clipPath = c
                ? "polygon(0% " +
                  (100 - 2 * p) +
                  "%, 0% 100%," +
                  2 * p +
                  "% 100%)"
                : "circle(" + p + "% at 0% 100%)";
              break;
            case "rt":
              r.clipPath = c
                ? "polygon(" +
                  (100 - 2 * p) +
                  "% 0%, 100% 0%, 100% " +
                  2 * p +
                  "%)"
                : "circle(" + p + "% at 100% 0%)";
              break;
            case "rb":
              r.clipPath = c
                ? "polygon(" +
                  (100 - 2 * p) +
                  "% 100%, 100% 100%, 100% " +
                  (100 - 2 * p) +
                  "%)"
                : "circle(" + p + "% at 100% 100%)";
              break;
            case "clr":
              r.clipPath = c
                ? "polygon(0% 0%, 0% " +
                  p +
                  "%, " +
                  (100 - p) +
                  "% 100%, 100% 100%, 100% " +
                  (100 - p) +
                  "%, " +
                  p +
                  "% 0%)"
                : "circle(" + p + "% at 50% 50%)";
              break;
            case "crl":
              r.clipPath = c
                ? "polygon(0% " +
                  (100 - p) +
                  "%, 0% 100%, " +
                  p +
                  "% 100%, 100% " +
                  p +
                  "%, 100% 0%, " +
                  (100 - p) +
                  "% 0%)"
                : "circle(" + p + "% at 50% 50%)";
          }
          !0 !== Q.isFirefox(e.id) && (r["-webkit-clip-path"] = r.clipPath),
            (r["clip-path"] = r.clipPath),
            delete r.clip,
            delete r.clipB;
        } else delete r.clip;
        return (
          "mask" !== e.target &&
            (void 0 === e.frame ||
              (void 0 === e.frame.filter && !e.forcefilter) ||
              ((r.filter = v(e.frame.filter)),
              (r["-webkit-filter"] = r.filter),
              Q.useBackdrop &&
                (window.isSafari11
                  ? (r["-webkit-backdrop-filter"] = h(e.frame.filter))
                  : (r["backdrop-filter"] = h(e.frame.filter))),
              window.isSafari11 &&
                void 0 !== r.filter &&
                void 0 ===
                  r[
                    null == a.iOSFix || "d" == a.iOSFix
                      ? "shape" == a.type
                        ? "z"
                        : "x"
                      : a.iOSFix
                  ] &&
                void 0 !== e.frame.filter &&
                void 0 !== e.frame.filter.blur &&
                (r[
                  null == a.iOSFix || "d" == a.iOSFix
                    ? "shape" == a.type
                      ? "z"
                      : "x"
                    : a.iOSFix
                ] = 1e-4)),
            0 <= jQuery.inArray(e.source, ["chars", "words", "lines"]) &&
              (void 0 !== e.frame[e.source].blur || e.forcefilter) &&
              ((r.filter = v(e.frame[e.source])),
              (r["-webkit-filter"] = r.filter)),
            delete r.grayscale,
            delete r.blur,
            delete r.brightness),
          (r.ease = (
            void 0 !== r.ease
              ? r
              : (void 0 === r.ease && void 0 !== e.ease) ||
                (void 0 !== r.ease && void 0 !== e.ease && "inherit" === r.ease)
              ? e
              : e.frame.timeline
          ).ease),
          (r.ease =
            void 0 === r.ease || "default" === r.ease
              ? "power3.inOut"
              : r.ease),
          r
        );
      },
      M = function (e, t) {
        var i,
          a = {},
          r = 0;
        for (r in (void 0 === Q[t]._rdF0 &&
          ((i = d(
            "x:0;y:0;z:0;rX:0;rY:0;rZ:0;o:0;skX:0;skY:0;sX:0;sY:0;oX:50%;oY:50%;oZ:0;dir:forward;d:5",
            t
          ).transform),
          (Q[t]._rdF0 = Q[t]._rdF1 =
            {
              transform: d(
                "x:0;y:0;z:0;rX:0;rY:0;rZ:0;o:0;skX:0;skY:0;sX:0;sY:0;oX:50%;oY:50%;oZ:0;tp:600px",
                t,
                !0
              ).transform,
              mask: d("x:0;y:0", t, !0).transform,
              chars: jQuery.extend(
                !0,
                { blur: 0, grayscale: 0, brightness: 100 },
                i
              ),
              words: jQuery.extend(
                !0,
                { blur: 0, grayscale: 0, brightness: 100 },
                i
              ),
              lines: jQuery.extend(
                !0,
                { blur: 0, grayscale: 0, brightness: 100 },
                i
              ),
            }),
          (Q[t]._rdF1.transform.opacity =
            Q[t]._rdF1.chars.opacity =
            Q[t]._rdF1.words.opacity =
            Q[t]._rdF1.lines.opacity =
            Q[t]._rdF1.transform.scaleX =
            Q[t]._rdF1.chars.scaleX =
            Q[t]._rdF1.words.scaleX =
            Q[t]._rdF1.lines.scaleX =
            Q[t]._rdF1.transform.scaleY =
            Q[t]._rdF1.chars.scaleY =
            Q[t]._rdF1.words.scaleY =
            Q[t]._rdF1.lines.scaleY =
              1)),
        void 0 === e.frame_0 && (e.frame_0 = "x:0"),
        void 0 === e.frame_1 && (e.frame_1 = "x:0"),
        (e.dddNeeded = !1),
        e.ford))
          if (e.ford.hasOwnProperty(r)) {
            var o = e.ford[r];
            if (e[o]) {
              if (
                ((a[o] = d(e[o], t, !0)),
                void 0 !== a[o].bgcolor && (e.bgcolinuse = !0),
                Q[t].BUG_ie_clipPath &&
                  void 0 !== e.clipPath &&
                  e.clipPath.use &&
                  void 0 !== a[o].transform.clip)
              ) {
                var s =
                  "rectangle" === e.clipPath.type
                    ? 100 - parseInt(a[o].transform.clip)
                    : 100 - Math.min(100, 2 * parseInt(a[o].transform.clip));
                switch (e.clipPath.origin) {
                  case "clr":
                  case "rb":
                  case "rt":
                  case "r":
                    (e[o + "_mask"] = "u:t;x:" + s + "%;y:0px;"),
                      (a[o].transform.x = Q.revToResp("-" + s + "%", Q[t].rle));
                    break;
                  case "crl":
                  case "lb":
                  case "lt":
                  case "cv":
                  case "l":
                    (e[o + "_mask"] = "u:t;x:-" + s + "%;y:0px;"),
                      (a[o].transform.x = Q.revToResp(s + "%", Q[t].rle));
                    break;
                  case "ch":
                  case "t":
                    (e[o + "_mask"] = "u:t;y:-" + s + "%;y:0px;"),
                      (a[o].transform.y = Q.revToResp(s + "%", Q[t].rle));
                    break;
                  case "b":
                    (e[o + "_mask"] = "u:t;y:" + s + "%;y:0px;"),
                      (a[o].transform.y = Q.revToResp("-" + s + "%", Q[t].rle));
                }
                delete a[o].transform.clip, delete a[o].transform.clipB;
              }
              e[o + "_mask"] && (a[o].mask = d(e[o + "_mask"], t).transform),
                null != a[o].mask && a[o].mask.use
                  ? ((a[o].mask.x = void 0 === a[o].mask.x ? 0 : a[o].mask.x),
                    (a[o].mask.y = void 0 === a[o].mask.y ? 0 : a[o].mask.y),
                    delete a[o].mask.use,
                    (a[o].mask.overflow = "hidden"))
                  : (a[o].mask = { ease: "default", overflow: "visible" }),
                e[o + "_chars"] &&
                  (a[o].chars = d(
                    e[o + "_chars"],
                    t,
                    void 0,
                    void 0,
                    "split"
                  ).transform),
                e[o + "_words"] &&
                  (a[o].words = d(
                    e[o + "_words"],
                    t,
                    void 0,
                    void 0,
                    "split"
                  ).transform),
                e[o + "_lines"] &&
                  (a[o].lines = d(
                    e[o + "_lines"],
                    t,
                    void 0,
                    void 0,
                    "split"
                  ).transform),
                (e[o + "_chars"] || e[o + "_words"] || e[o + "_lines"]) &&
                  (a[o].dosplit = !0),
                (a.frame_0 =
                  void 0 === a.frame_0 ? { transform: {} } : a.frame_0),
                a[o].transform.auto &&
                  ((a[o].transform = Q.clone(a.frame_0.transform)),
                  (a[o].transform.opacity =
                    void 0 === a[o].transform.opacity
                      ? 0
                      : a[o].transform.opacity),
                  void 0 !== a.frame_0.filter &&
                    (a[o].filter = Q.clone(a.frame_0.filter)),
                  void 0 !== a.frame_0.mask &&
                    (a[o].mask = Q.clone(a.frame_0.mask)),
                  void 0 !== a.frame_0.chars &&
                    (a[o].chars = Q.clone(a.frame_0.chars)),
                  void 0 !== a.frame_0.words &&
                    (a[o].words = Q.clone(a.frame_0.words)),
                  void 0 !== a.frame_0.lines &&
                    (a[o].lines = Q.clone(a.frame_0.lines)),
                  (void 0 === a.frame_0.chars &&
                    void 0 === a.frame_0.words &&
                    void 0 === a.frame_0.lines) ||
                    (a[o].dosplit = !0)),
                e[o + "_sfx"] &&
                  (a[o].sfx = d(e[o + "_sfx"], t, !1, void 0, "sfx").transform),
                e[o + "_reverse"] &&
                  (a[o].reverse = d(
                    e[o + "_reverse"],
                    t,
                    !1,
                    void 0,
                    "reverse"
                  ).transform);
            }
          }
        if (
          (a.frame_0.dosplit && (a.frame_1.dosplit = !0),
          (void 0 === e.frame_hover && void 0 === e.svgh) ||
            ((a.frame_hover = d(
              void 0 === e.frame_hover ? "" : e.frame_hover,
              t
            )),
            !Q.ISM ||
            ("true" != a.frame_hover.transform.instantClick &&
              1 != a.frame_hover.transform.instantClick)
              ? (delete a.frame_hover.transform.instantClick,
                (a.frame_hover.transform.color = a.frame_hover.color),
                void 0 === a.frame_hover.transform.color &&
                  delete a.frame_hover.transform.color,
                void 0 !== a.frame_hover.bgcolor &&
                0 <= a.frame_hover.bgcolor.indexOf("gradient")
                  ? (a.frame_hover.transform.backgroundImage =
                      a.frame_hover.bgcolor)
                  : void 0 !== a.frame_hover.bgcolor &&
                    (a.frame_hover.transform.backgroundColor =
                      a.frame_hover.bgcolor),
                void 0 !== a.frame_hover.bgcolor && (e.bgcolinuse = !0),
                (a.frame_hover.transform.opacity =
                  void 0 === a.frame_hover.transform.opacity
                    ? 1
                    : a.frame_hover.transform.opacity),
                (a.frame_hover.mask =
                  void 0 !== a.frame_hover.transform.mask &&
                  a.frame_hover.transform.mask),
                delete a.frame_hover.transform.mask,
                void 0 !== a.frame_hover.transform &&
                  ((a.frame_hover.transform.borderWidth ||
                    a.frame_hover.transform.borderStyle) &&
                    (a.frame_hover.transform.borderColor =
                      void 0 === a.frame_hover.transform.borderColor
                        ? "transparent"
                        : a.frame_hover.transform.borderColor),
                  "none" !== a.frame_hover.transform.borderStyle &&
                    void 0 === a.frame_hover.transform.borderWidth &&
                    (a.frame_hover.transform.borderWidth = Q.revToResp(0, 4, 0)
                      .toString()
                      .replace(/,/g, " ")),
                  void 0 === e.bordercolor &&
                    void 0 !== a.frame_hover.transform.borderColor &&
                    (e.bordercolor = "transparent"),
                  void 0 === e.borderwidth &&
                    void 0 !== a.frame_hover.transform.borderWidth &&
                    (e.borderwidth = Q.revToResp(
                      a.frame_hover.transform.borderWidth,
                      4,
                      0
                    )),
                  void 0 === e.borderstyle) &&
                  void 0 !== a.frame_hover.transform.borderStyle &&
                  (e.borderstyle = Q.revToResp(
                    a.frame_hover.transform.borderStyle,
                    4,
                    0
                  )))
              : delete a.frame_hover),
          void 0 !== e.tloop)
        ) {
          e.layerLoop = {
            from: "frame_1",
            to: "frame_999",
            repeat: -1,
            keep: !0,
            children: !0,
          };
          var n = e.tloop.split(";");
          for (r in n)
            if (n.hasOwnProperty(r)) {
              var l = n[r].split(":");
              switch (l[0]) {
                case "f":
                  e.layerLoop.from = l[1];
                  break;
                case "t":
                  e.layerLoop.to = l[1];
                  break;
                case "k":
                  e.layerLoop.keep = l[1];
                  break;
                case "r":
                  e.layerLoop.repeat = parseInt(l[1], 0);
                  break;
                case "c":
                  e.layerLoop.children = l[1];
              }
            }
          e.layerLoop.count = 0;
        }
        for (r in ((e.loop_0 || e.loop_999) &&
          ((a.loop = d(e.loop_999, t, !0, "frame_999", "loop")),
          (a.loop.frame_0 = d(
            e.loop_0 || "",
            t,
            !1,
            void 0,
            "loop"
          ).transform)),
        (a.frame_0.transform.opacity =
          void 0 === a.frame_0.transform.opacity
            ? 0
            : a.frame_0.transform.opacity),
        (a.frame_1.transform.opacity =
          void 0 === a.frame_1.transform.opacity
            ? 1
            : a.frame_1.transform.opacity),
        (a.frame_999.transform.opacity =
          void 0 === a.frame_999.transform.opacity
            ? "inherit"
            : a.frame_999.transform.opacity),
        e.clipPath &&
          e.clipPath.use &&
          ((a.frame_0.transform.clip =
            void 0 === a.frame_0.transform.clip
              ? 100
              : parseInt(a.frame_0.transform.clip)),
          (a.frame_1.transform.clip =
            void 0 === a.frame_1.transform.clip
              ? 100
              : parseInt(a.frame_1.transform.clip))),
        (e.resetfilter = !1),
        (e.useFilter = {
          blur: !1,
          grayscale: !1,
          brightness: !1,
          b_blur: !1,
          b_grayscale: !1,
          b_brightness: !1,
          b_invert: !1,
          b_sepia: !1,
        }),
        a))
          void 0 !== a[r].filter
            ? ((e.resetfilter = !0),
              (e.useFilter = u(e.useFilter, a[r].filter)))
            : null == a[r].filter &&
              ((a[r].filter = {}),
              e.useFilter.blur && (a[r].filter.blur = 0),
              e.useFilter.grayscale && (a[r].filter.grayscale = 0),
              e.useFilter.brightness && (a[r].filter.brightness = 100),
              e.useFilter.b_blur && (a[r].filter.b_blur = 0),
              e.useFilter.b_grayscale && (a[r].filter.b_grayscale = 0),
              e.useFilter.b_brightness) &&
              (a[r].filter.b_brightness = 100);
        if (
          (!0 !== e.resetFilter &&
            void 0 !== a.frame_hover &&
            (e.useFilter = u(e.useFilter, a.frame_hover)),
          e.resetfilter)
        )
          for (var r in ((a.frame_0.filter = Q.clone(a.frame_0.filter)),
          (a.frame_0.filter = g(e.useFilter, Q.clone(a.frame_0.filter))),
          a))
            void 0 !== a[r].filter &&
              "frame_1" !== r &&
              "frame_0" !== r &&
              ((a[r].filter = Q.clone(a[r].filter)),
              (a[r].filter = g(e.useFilter, Q.clone(a[r].filter))));
        return (
          void 0 !== a.frame_0.filter &&
            ((a.frame_1.filter = Q.clone(a.frame_1.filter)),
            void 0 !== a.frame_0.filter.blur &&
              0 !== a.frame_1.filter.blur &&
              (a.frame_1.filter.blur =
                void 0 === a.frame_1.filter.blur ? 0 : a.frame_1.filter.blur),
            void 0 !== a.frame_0.filter.brightness &&
              100 !== a.frame_1.filter.brightness &&
              (a.frame_1.filter.brightness =
                void 0 === a.frame_1.filter.brightness
                  ? 100
                  : a.frame_1.filter.brightness),
            void 0 !== a.frame_0.filter.grayscale &&
              0 !== a.frame_1.filter.grayscale &&
              (a.frame_1.filter.grayscale =
                void 0 === a.frame_1.filter.grayscale
                  ? 0
                  : a.frame_1.filter.grayscale),
            void 0 !== a.frame_0.filter.b_blur &&
              0 !== a.frame_1.filter.b_blur &&
              (a.frame_1.filter.b_blur =
                void 0 === a.frame_1.filter.b_blur
                  ? 0
                  : a.frame_1.filter.b_blur),
            void 0 !== a.frame_0.filter.b_brightness &&
              100 !== a.frame_1.filter.b_brightness &&
              (a.frame_1.filter.b_brightness =
                void 0 === a.frame_1.filter.b_brightness
                  ? 100
                  : a.frame_1.filter.b_brightness),
            void 0 !== a.frame_0.filter.b_grayscale &&
              0 !== a.frame_1.filter.b_grayscale &&
              (a.frame_1.filter.b_grayscale =
                void 0 === a.frame_1.filter.b_grayscale
                  ? 0
                  : a.frame_1.filter.b_grayscale),
            void 0 !== a.frame_0.filter.b_invert &&
              0 !== a.frame_1.filter.b_invert &&
              (a.frame_1.filter.b_invert =
                void 0 === a.frame_1.filter.b_invert
                  ? 0
                  : a.frame_1.filter.b_invert),
            void 0 !== a.frame_0.filter.b_sepia) &&
            0 !== a.frame_1.filter.b_sepia &&
            (a.frame_1.filter.b_sepia =
              void 0 === a.frame_1.filter.b_sepia
                ? 0
                : a.frame_1.filter.b_sepia),
          f(a, t, e)
        );
      },
      g = function (e, t) {
        return (
          e.blur ? (t.blur = void 0 === t.blur ? 0 : t.blur) : delete t.blur,
          e.brightness
            ? (t.brightness = void 0 === t.brightness ? 100 : t.brightness)
            : delete t.brightness,
          e.grayscale
            ? (t.grayscale = void 0 === t.grayscale ? 0 : t.grayscale)
            : delete t.grayscale,
          e.b_blur
            ? (t.b_blur = void 0 === t.b_blur ? 0 : t.b_blur)
            : delete t.b_blur,
          e.b_brightness
            ? (t.b_brightness =
                void 0 === t.b_brightness ? 100 : t.b_brightness)
            : delete t.b_brightness,
          e.b_grayscale
            ? (t.b_grayscale = void 0 === t.b_grayscale ? 0 : t.b_grayscale)
            : delete t.b_grayscale,
          e.b_invert
            ? (t.b_invert = void 0 === t.b_invert ? 0 : t.b_invert)
            : delete t.b_invert,
          e.b_sepia
            ? (t.b_sepia = void 0 === t.b_sepia ? 0 : t.b_sepia)
            : delete t.b_sepia,
          t
        );
      },
      u = function (e, t) {
        return (
          (e.blur =
            !0 === e.blur ||
            (void 0 !== t.blur && 0 !== t.blur && "0px" !== t.blur)),
          (e.grayscale =
            !0 === e.grayscale ||
            (void 0 !== t.grayscale &&
              0 !== t.grayscale &&
              "0%" !== t.grayscale)),
          (e.brightness =
            !0 === e.brightness ||
            (void 0 !== t.brightness &&
              100 !== t.brightness &&
              "100%" !== t.brightness)),
          (e.b_blur =
            !0 === e.b_blur ||
            (void 0 !== t.b_blur && 0 !== t.b_blur && "0px" !== t.b_blur)),
          (e.b_grayscale =
            !0 === e.b_grayscale ||
            (void 0 !== t.b_grayscale &&
              0 !== t.b_grayscale &&
              "0%" !== t.b_grayscale)),
          (e.b_brightness =
            !0 === e.b_brightness ||
            (void 0 !== t.b_brightness &&
              100 !== t.b_brightness &&
              "100%" !== t.b_brightness)),
          (e.b_invert =
            !0 === e.b_invert ||
            (void 0 !== t.b_invert && 0 !== t.b_invert && "0%" !== t.b_invert)),
          (e.b_sepia =
            !0 === e.b_sepia ||
            (void 0 !== t.b_sepia && 0 !== t.b_sepia && "0%" !== t.b_sepia)),
          e
        );
      },
      f = function (e, t, i) {
        var a,
          r = {},
          o = ["transform", "words", "chars", "lines", "mask"],
          s = "global" == Q[t].perspectiveType ? Q[t].perspective : 0,
          n = !0,
          l = !1;
        for (c in e)
          "loop" !== c &&
            "frame_hover" !== c &&
            (r = jQuery.extend(!0, r, e[c]));
        for (c in e)
          if (
            e.hasOwnProperty(c) &&
            (void 0 !== e[c].timeline && (e[c].timeline.usePerspective = !1),
            "loop" !== c) &&
            "frame_hover" !== c
          ) {
            for (a in r.transform)
              r.transform.hasOwnProperty(a) &&
                ((r.transform[a] = (
                  void 0 === e[c].transform[a]
                    ? "frame_0" === c
                      ? Q[t]._rdF0
                      : "frame_1" === c
                      ? Q[t]._rdF1
                      : r
                    : e[c]
                ).transform[a]),
                (e[c].transform[a] = (
                  void 0 === e[c].transform[a] ? r : e[c]
                ).transform[a]));
            for (var d = 1; d <= 4; d++)
              for (a in r[o[d]])
                r[o[d]].hasOwnProperty(a) &&
                  ((e[c][o[d]] = void 0 === e[c][o[d]] ? {} : e[c][o[d]]),
                  (r[o[d]][a] = (
                    void 0 === e[c][o[d]][a]
                      ? "frame_0" === c
                        ? Q[t]._rdF0
                        : "frame_1" === c
                        ? Q[t]._rdF1
                        : r
                      : e[c]
                  )[o[d]][a]),
                  (e[c][o[d]][a] = (void 0 === e[c][o[d]][a] ? r : e[c])[o[d]][
                    a
                  ]));
            void 0 !== e[c].timeline &&
              !1 === e[c].timeline.usePerspective &&
              void 0 !== e[c].transform &&
              (void 0 !== e[c].transform.rotationY ||
                void 0 !== e[c].transform.rotationX ||
                void 0 !== e[c].transform.z ||
                p(e[c].chars) ||
                p(e[c].words) ||
                p(e[c].lines)) &&
              ((s =
                "local" == Q[t].perspectiveType
                  ? void 0 === e[c].transform.transformPerspective
                    ? 600
                    : e[c].transform.transformPerspective
                  : s),
              (e[c].timeline.usePerspective = !0),
              (p(e[c].chars) || p(e[c].words) || p(e[c].lines)) &&
                !Q.isFirefox(t) &&
                (l = !0),
              (n = !1));
          }
        if (
          (l &&
            requestAnimationFrame(function () {
              tpGS.gsap.set(i.c, { transformStyle: "preserve-3d" });
            }),
          void 0 !== e.frame_0.timeline &&
            e.frame_0.timeline.usePerspective &&
            (e.frame_0.transform.transformPerspective =
              "local" === Q[t].perspectiveType
                ? void 0 === e.frame_0.transform.transformPerspective
                  ? s
                  : e.frame_0.transform.transformPerspective
                : "isometric" === Q[t].perspectiveType
                ? 0
                : Q[t].perspective),
          n)
        )
          for (var c in e) {
            if (!e.hasOwnProperty(c) || void 0 === e[c].transform) continue;
            delete e[c].transform.transformPerspective;
          }
        return e;
      },
      n = function (e, t, i) {
        if (0 === e.length) return {};
        for (
          var a = e[0].getElementsByClassName(t), r = {}, o = 0;
          o < a.length;
          o++
        )
          (void 0 !== i && -1 !== a[o].className.indexOf(i)) ||
            (r[a[o].id] = a[o]);
        if (void 0 !== e[1])
          for (a = e[1].getElementsByClassName(t), o = 0; o < a.length; o++)
            (void 0 !== i && -1 !== a[o].className.indexOf(i)) ||
              (r[a[o].id] = a[o]);
        return r;
      },
      T = function (e, t, i) {
        if (
          "BR" == e[0].nodeName ||
          "br" == e[0].tagName ||
          ("object" != typeof e[0].className &&
            0 <= e[0].className.indexOf("rs_splitted_"))
        )
          return !1;
        Q.sA(e[0], "stylerecorder", !0),
          void 0 === e[0].id &&
            (e[0].id = "rs-layer-sub-" + Math.round(1e6 * Math.random())),
          (Q[i].computedStyle[e[0].id] = window.getComputedStyle(e[0], null));
        var a =
            void 0 !== e[0].id && void 0 !== Q[i]._L[e[0].id]
              ? Q[i]._L[e[0].id]
              : e.data(),
          r =
            "rekursive" === t
              ? jQuery(Q.closestClass(e[0], "rs-layer"))
              : void 0,
          o =
            (void 0 !== r &&
              (Q[i].computedStyle[r[0].id] =
                void 0 === Q[i].computedStyle[r[0].id]
                  ? window.getComputedStyle(r[0], null)
                  : Q[i].computedStyle[r[0].id]),
            void 0 !== r &&
              Q[i].computedStyle[e[0].id].fontSize ==
                Q[i].computedStyle[r[0].id].fontSize &&
              c(Q[i].computedStyle[e[0].id].fontWeight) ==
                c(Q[i].computedStyle[r[0].id].fontWeight) &&
              Q[i].computedStyle[e[0].id].lineHeight ==
                Q[i].computedStyle[r[0].id].lineHeight),
          s = o
            ? void 0 !== r[0].id && void 0 !== Q[i]._L[r[0].id]
              ? Q[i]._L[r[0].id]
              : r.data()
            : void 0,
          n = 0;
        for (
          a.basealign = void 0 === a.basealign ? "grid" : a.basealign,
            a._isnotext ||
              ((a.fontSize = Q.revToResp(
                o
                  ? void 0 === s.fontsize
                    ? parseInt(Q[i].computedStyle[r[0].id].fontSize, 0) || 20
                    : s.fontsize
                  : void 0 === a.fontsize
                  ? "rekursive" !== t
                    ? 20
                    : "inherit"
                  : a.fontsize,
                Q[i].rle
              )),
              (a.fontWeight = Q.revToResp(
                o
                  ? void 0 === s.fontweight
                    ? Q[i].computedStyle[r[0].id].fontWeight || "inherit"
                    : s.fontweight
                  : void 0 === a.fontweight
                  ? Q[i].computedStyle[e[0].id].fontWeight || "inherit"
                  : a.fontweight,
                Q[i].rle
              )),
              (a.whiteSpace = Q.revToResp(
                o
                  ? void 0 === s.whitespace
                    ? "nowrap"
                    : s.whitespace
                  : void 0 === a.whitespace
                  ? "nowrap"
                  : a.whitespace,
                Q[i].rle
              )),
              (a.textAlign = Q.revToResp(
                o
                  ? void 0 === s.textalign
                    ? "left"
                    : s.textalign
                  : void 0 === a.textalign
                  ? "left"
                  : a.textalign,
                Q[i].rle
              )),
              (a.letterSpacing = Q.revToResp(
                o
                  ? void 0 === s.letterspacing
                    ? parseInt(Q[i].computedStyle[r[0].id].letterSpacing, 0) ||
                      "inherit"
                    : s.letterspacing
                  : void 0 === a.letterspacing
                  ? parseInt(
                      "normal" === Q[i].computedStyle[e[0].id].letterSpacing
                        ? 0
                        : Q[i].computedStyle[e[0].id].letterSpacing,
                      0
                    ) || "inherit"
                  : a.letterspacing,
                Q[i].rle
              )),
              (a.textDecoration = o
                ? void 0 === s.textDecoration
                  ? "none"
                  : s.textDecoration
                : void 0 === a.textDecoration
                ? "none"
                : a.textDecoration),
              (n = 25),
              (n =
                void 0 === r ||
                ("I" !== e[0].tagName && "STRONG" !== e[0].tagName)
                  ? n
                  : "inherit"),
              void 0 !== a.tshadow &&
                ((a.tshadow.b = Q.revToResp(a.tshadow.b, Q[i].rle)),
                (a.tshadow.h = Q.revToResp(a.tshadow.h, Q[i].rle)),
                (a.tshadow.v = Q.revToResp(a.tshadow.v, Q[i].rle)))),
            "group" === a.type &&
              ((a.whiteSpace = "normal"),
              (a.textAlign = Q.revToResp(
                o
                  ? void 0 === s.textalign
                    ? "left"
                    : s.textalign
                  : void 0 === a.textalign
                  ? "left"
                  : a.textalign,
                Q[i].rle
              ))),
            void 0 !== a.bshadow &&
              ((a.bshadow.b = Q.revToResp(a.bshadow.b, Q[i].rle)),
              (a.bshadow.h = Q.revToResp(a.bshadow.h, Q[i].rle)),
              (a.bshadow.v = Q.revToResp(a.bshadow.v, Q[i].rle)),
              (a.bshadow.s = Q.revToResp(a.bshadow.s, Q[i].rle))),
            void 0 !== a.tstroke &&
              (a.tstroke.w = Q.revToResp(a.tstroke.w, Q[i].rle)),
            a.display = (
              o
                ? void 0 === s.display
                  ? Q[i].computedStyle[r[0].id]
                  : s
                : void 0 === a.display
                ? Q[i].computedStyle[e[0].id]
                : a
            ).display,
            a.float = Q.revToResp(
              o
                ? void 0 === s.float
                  ? Q[i].computedStyle[r[0].id].float || "none"
                  : s.float
                : void 0 === a.float
                ? "none"
                : a.float,
              Q[i].rle
            ),
            a.clear = Q.revToResp(
              o
                ? void 0 === s.clear
                  ? Q[i].computedStyle[r[0].id].clear || "none"
                  : s.clear
                : void 0 === a.clear
                ? "none"
                : a.clear,
              Q[i].rle
            ),
            a.lineHeight = Q.revToResp(
              e.is("img") ||
                -1 != jQuery.inArray(a.layertype, ["video", "image", "audio"])
                ? n
                : o
                ? void 0 === s.lineheight
                  ? parseInt(Q[i].computedStyle[r[0].id].lineHeight, 0) || n
                  : s.lineheight
                : void 0 === a.lineheight
                ? n
                : a.lineheight,
              Q[i].rle
            ),
            a.zIndex = o
              ? void 0 === s.zindex
                ? parseInt(Q[i].computedStyle[r[0].id].zIndex, 0) || "inherit"
                : s.zindex
              : void 0 === a.zindex
              ? parseInt(Q[i].computedStyle[e[0].id].zIndex, 0) || "inherit"
              : parseInt(a.zindex),
            l = 0;
          l < 4;
          l++
        )
          (a["padding" + R[l]] = Q.revToResp(
            void 0 === a["padding" + I[l]]
              ? parseInt(Q[i].computedStyle[e[0].id]["padding" + R[l]], 0) || 0
              : a["padding" + I[l]],
            Q[i].rle
          )),
            (a["margin" + R[l]] = Q.revToResp(
              void 0 === a["margin" + I[l]]
                ? parseInt(Q[i].computedStyle[e[0].id]["margin" + R[l]], 0) || 0
                : a["margin" + I[l]],
              Q[i].rle
            )),
            (a["border" + R[l] + "Width"] =
              void 0 === a.borderwidth
                ? parseInt(
                    Q[i].computedStyle[e[0].id]["border" + R[l] + "Width"],
                    0
                  ) || 0
                : a.borderwidth[l]),
            (a["border" + R[l] + "Color"] =
              void 0 === a.bordercolor
                ? Q[i].computedStyle[e[0].id]["border-" + I[l] + "-color"]
                : a.bordercolor),
            (a["border" + L[l] + "Radius"] = Q.revToResp(
              void 0 === a.borderradius
                ? Q[i].computedStyle[e[0].id]["border" + L[l] + "Radius"] || 0
                : a.borderradius[l],
              Q[i].rle
            ));
        if (
          ((a.borderStyle = Q.revToResp(
            void 0 === a.borderstyle
              ? Q[i].computedStyle[e[0].id].borderStyle || 0
              : a.borderstyle,
            Q[i].rle
          )),
          "rekursive" !== t
            ? ((a.color = Q.revToResp(
                void 0 === a.color ? "#ffffff" : a.color,
                Q[i].rle,
                void 0,
                "||"
              )),
              (a.minWidth = Q.revToResp(
                void 0 === a.minwidth
                  ? parseInt(Q[i].computedStyle[e[0].id].minWidth, 0) || 0
                  : a.minwidth,
                Q[i].rle
              )),
              (a.minHeight = Q.revToResp(
                void 0 === a.minheight
                  ? parseInt(Q[i].computedStyle[e[0].id].minHeight, 0) || 0
                  : a.minheight,
                Q[i].rle
              )),
              (a.width = Q.revToResp(
                void 0 === a.width ? "auto" : Q.smartConvertDivs(a.width),
                Q[i].rle
              )),
              (a.height = Q.revToResp(
                void 0 === a.height ? "auto" : Q.smartConvertDivs(a.height),
                Q[i].rle
              )),
              (a.maxWidth = Q.revToResp(
                void 0 === a.maxwidth
                  ? parseInt(Q[i].computedStyle[e[0].id].maxWidth, 0) || "none"
                  : a.maxwidth,
                Q[i].rle
              )),
              (a.maxHeight = Q.revToResp(
                -1 !== jQuery.inArray(a.type, ["column", "row"])
                  ? "none"
                  : void 0 !== a.maxheight
                  ? parseInt(Q[i].computedStyle[e[0].id].maxHeight, 0) || "none"
                  : a.maxheight,
                Q[i].rle
              )))
            : "html" === a.layertype &&
              ((a.width = Q.revToResp(e[0].width, Q[i].rle)),
              (a.height = Q.revToResp(e[0].height, Q[i].rle))),
          a._incolumn)
        )
          for (var l = 0; l < a.height.length; l++)
            -1 !== a.height[l].indexOf("%") &&
              98 < parseFloat(a.height[l]) &&
              (a.height[l] = a.height[l].replace("%", "px"));
        for (
          a.styleProps = {
            background: e[0].style.background,
            "background-color": e[0].style["background-color"],
            color: e[0].style.color,
            cursor: e[0].style.cursor,
            "font-style": e[0].style["font-style"],
          },
            null == a.bshadow &&
              (a.styleProps.boxShadow = e[0].style.boxShadow),
            ("" !== a.styleProps.background &&
              void 0 !== a.styleProps.background &&
              a.styleProps.background !== a.styleProps["background-color"]) ||
              delete a.styleProps.background,
            "" == a.styleProps.color &&
              (a.styleProps.color = Q[i].computedStyle[e[0].id].color),
            l = 0;
          l < 4;
          l++
        )
          y(a["padding" + R[l]], 0) && delete a["padding" + R[l]],
            y(a["margin" + R[l]], 0) && delete a["margin" + R[l]],
            (y(a["border" + L[l] + "Radius"], "0px") ||
              y(a["border" + L[l] + "Radius"], "0")) &&
              delete a["border" + L[l] + "Radius"];
        if (y(a.borderStyle, "none"))
          for (delete a.borderStyle, l = 0; l < 4; l++)
            delete a["border" + R[l] + "Width"],
              delete a["border" + R[l] + "Color"];
      },
      y = function (e, t) {
        return t === e[0] && t === e[1] && t === e[2] && t === e[3];
      },
      i = function (e) {
        var t,
          i,
          a,
          r,
          o,
          s = e.a,
          n = e.b,
          l = e.c,
          d = e.d,
          c = e.e,
          p = {},
          g = {},
          u = Q[n]._L[s[0].id],
          h = s[0].className,
          u = void 0 === u ? {} : u;
        if (
          ("object" == typeof h && (h = ""),
          void 0 !== s &&
            void 0 !== s[0] &&
            (0 <= h.indexOf("rs_splitted") ||
              "BR" == s[0].nodeName ||
              "br" == s[0].tagName ||
              0 < s[0].tagName.indexOf("FCR") ||
              0 < s[0].tagName.indexOf("BCR")))
        )
          return !1;
        var m,
          c = "individual" === c ? u.slideIndex : c,
          v = (function (e, t, i) {
            if (void 0 !== e) {
              if ("BR" == e[0].nodeName || "br" == e[0].tagName) return !1;
              var a,
                r = Q[t].level,
                o =
                  void 0 !== e[0] &&
                  void 0 !== e[0].id &&
                  void 0 !== Q[t]._L[e[0].id]
                    ? Q[t]._L[e[0].id]
                    : e.data(),
                s =
                  (void 0 ===
                    (o = void 0 === o.basealign ? i.data() : o)._isnotext &&
                    (o._isnotext =
                      void 0 !== i && void 0 !== i[0] && 0 < i[0].length
                        ? Q.gA(i[0], "_isnotext")
                        : o._isnotext),
                  {
                    basealign: void 0 === o.basealign ? "grid" : o.basealign,
                    lineHeight:
                      void 0 === o.basealign
                        ? "inherit"
                        : parseInt(o.lineHeight[r]),
                    color: void 0 === o.color ? void 0 : o.color[r],
                    width:
                      void 0 === o.width
                        ? void 0
                        : "a" === o.width[r]
                        ? "auto"
                        : o.width[r],
                    height:
                      void 0 === o.height
                        ? void 0
                        : "a" === o.height[r]
                        ? "auto"
                        : o.height[r],
                    minWidth:
                      void 0 === o.minWidth
                        ? void 0
                        : "n" === o.minWidth[r]
                        ? "none"
                        : o.minWidth[r],
                    minHeight:
                      void 0 === o.minHeight
                        ? void 0
                        : "n" == o.minHeight[r]
                        ? "none"
                        : o.minHeight[r],
                    maxWidth:
                      void 0 === o.maxWidth
                        ? void 0
                        : "n" == o.maxWidth[r]
                        ? "none"
                        : o.maxWidth[r],
                    maxHeight:
                      void 0 === o.maxHeight
                        ? void 0
                        : "n" == o.maxHeight[r]
                        ? "none"
                        : o.maxHeight[r],
                    float: o.float[r],
                    clear: o.clear[r],
                  });
              for (
                o.borderStyle && (s.borderStyle = o.borderStyle[r]), a = 0;
                a < 4;
                a++
              )
                o["padding" + R[a]] &&
                  (s["padding" + R[a]] = o["padding" + R[a]][r]),
                  o["margin" + R[a]] &&
                    (s["margin" + R[a]] = parseInt(o["margin" + R[a]][r])),
                  o["border" + L[a] + "Radius"] &&
                    (s["border" + L[a] + "Radius"] =
                      o["border" + L[a] + "Radius"][r]),
                  void 0 !== s.borderStyle &&
                    "none" !== s.borderStyle &&
                    (o["border" + R[a] + "Color"] &&
                      (s["border" + R[a] + "Color"] =
                        o["border" + R[a] + "Color"]),
                    o["border" + R[a] + "Width"]) &&
                    (s["border" + R[a] + "Width"] = parseInt(
                      o["border" + R[a] + "Width"]
                    ));
              return (
                o._isnotext ||
                  ((s.textDecoration = o.textDecoration),
                  (s.fontSize = parseInt(o.fontSize[r])),
                  (s.fontWeight = parseInt(o.fontWeight[r])),
                  (s.letterSpacing = parseInt(o.letterSpacing[r]) || 0),
                  (s.textAlign = o.textAlign[r]),
                  (s.whiteSpace = o.whiteSpace[r]),
                  (s.whiteSpace =
                    "normal" === s.whiteSpace &&
                    "auto" === s.width &&
                    ((!0 !== o._incolumn && !0 !== o._ingroup) ||
                      "relative" !== o.position)
                      ? "nowrap"
                      : s.whiteSpace),
                  (s.display = o.display),
                  void 0 !== o.tshadow &&
                    (s.textShadow =
                      parseInt(o.tshadow.h[r], 0) +
                      "px " +
                      parseInt(o.tshadow.v[r], 0) +
                      "px " +
                      o.tshadow.b[r] +
                      " " +
                      o.tshadow.c),
                  void 0 !== o.tstroke &&
                    (s.textStroke =
                      parseInt(o.tstroke.w[r], 0) + "px " + o.tstroke.c)),
                "group" === o.type &&
                  ((s.whiteSpace = o.whiteSpace),
                  (s.textAlign = o.textAlign[r]),
                  (s.display = o.display)),
                void 0 !== o.bshadow &&
                  (s.boxShadow =
                    parseInt(o.bshadow.h[r], 0) +
                    "px " +
                    parseInt(o.bshadow.v[r], 0) +
                    "px " +
                    parseInt(o.bshadow.b[r], 0) +
                    "px " +
                    parseInt(o.bshadow.s[r], 0) +
                    "px " +
                    o.bshadow.c),
                s
              );
            }
          })(s, n, e.RSL),
          f = "off" === d ? 1 : Q[n].CM.w;
        if (
          (void 0 === u._isnotext &&
            (u._isnotext =
              void 0 !== v.RSL && void 0 !== v.RSL[0] && 0 < v.RSL[0].length
                ? Q.gA(v.RSL[0], "_isnotext")
                : u._isnotext),
          u._incolumn &&
            ("shape" === u.type || "text" === u.type || "button" === u.type) &&
            ("" + v.height).indexOf(!1) &&
            (v.height = v.height),
          (u.OBJUPD = null == u.OBJUPD ? {} : u.OBJUPD),
          (u.caches = null == u.caches ? {} : u.caches),
          "column" === u.type)
        ) {
          for (i = {}, m = {}, t = 0; t < 4; t++)
            void 0 !== v["margin" + R[t]] &&
              ((i["padding" + R[t]] =
                Math.round(v["margin" + R[t]] * f) + "px"),
              (m["margin" + R[t]] = v["margin" + R[t]]),
              delete v["margin" + R[t]]);
          jQuery.isEmptyObject(i) || tpGS.gsap.set(u._column, i);
        }
        var y = Q.clone(u.OBJUPD.POBJ),
          w = Q.clone(u.OBJUPD.LPOBJ);
        if (-1 === h.indexOf("rs_splitted_")) {
          for (i = { overwrite: "auto" }, t = 0; t < 4; t++)
            void 0 !== v["border" + L[t] + "Radius"] &&
              (i["border" + L[t] + "Radius"] = v["border" + L[t] + "Radius"]),
              void 0 !== v["padding" + R[t]] &&
                (i["padding" + R[t]] =
                  Math.round(v["padding" + R[t]] * f) + "px"),
              void 0 === v["margin" + R[t]] ||
                u._incolumn ||
                (u._ingroup && "absolute" != u.position) ||
                (i["margin" + R[t]] =
                  "row" === u.type
                    ? 0
                    : Math.round(v["margin" + R[t]] * f) + "px");
          if (
            (void 0 !== u.spike &&
              (i["clip-path"] = i["-webkit-clip-path"] = u.spike),
            v.boxShadow && (i.boxShadow = v.boxShadow),
            "column" !== u.type &&
              (void 0 !== v.borderStyle &&
              "none" !== v.borderStyle &&
              (0 !== v.borderTopWidth ||
                0 < v.borderBottomWidth ||
                0 < v.borderLeftWidth ||
                0 < v.borderRightWidth)
                ? ((i.borderTopWidth = Math.round(v.borderTopWidth * f) + "px"),
                  (i.borderBottomWidth =
                    Math.round(v.borderBottomWidth * f) + "px"),
                  (i.borderLeftWidth =
                    Math.round(v.borderLeftWidth * f) + "px"),
                  (i.borderRightWidth =
                    Math.round(v.borderRightWidth * f) + "px"),
                  (i.borderStyle = v.borderStyle),
                  (i.borderTopColor = v.borderTopColor),
                  (i.borderBottomColor = v.borderBottomColor),
                  (i.borderLeftColor = v.borderLeftColor),
                  (i.borderRightColor = v.borderRightColor))
                : ("none" === v.borderStyle && (i.borderStyle = "none"),
                  void 0 !== v.borderTopColor &&
                    (i.borderTopColor = v.borderTopColor),
                  void 0 !== v.borderBottomColor &&
                    (i.borderBottomColor = v.borderBottomColor),
                  void 0 !== v.borderLeftColor &&
                    (i.borderLeftColor = v.borderLeftColor),
                  void 0 !== v.borderRightColor &&
                    (i.borderRightColor = v.borderRightColor))),
            ("shape" !== u.type && "image" !== u.type) ||
              !(
                O(v.borderTopLeftRadius) ||
                O(v.borderTopRightRadius) ||
                O(v.borderBottomLeftRadius) ||
                O(v.borderBottomRightRadius)
              ) ||
              (i.overflow = "hidden"),
            u._isnotext ||
              ("column" !== u.type &&
                ((i.fontSize = Math.round(v.fontSize * f) + "px"),
                (i.fontWeight = v.fontWeight),
                (i.letterSpacing = v.letterSpacing * f + "px"),
                v.textShadow && (i.textShadow = v.textShadow),
                v.textStroke) &&
                (i["-webkit-text-stroke"] = v.textStroke),
              (i.lineHeight = Math.round(v.lineHeight * f) + "px"),
              (i.textAlign = v.textAlign)),
            "video" === u.type &&
              u.html5vid &&
              void 0 !== u.deepmedia &&
              void 0 !== u.deepmedia[0] &&
              null != u.deepmedia[0].parentNode &&
              (O(v.borderTopLeftRadius) ||
                O(v.borderTopRightRadius) ||
                O(v.borderBottomLeftRadius) ||
                O(v.borderBottomRightRadius)) &&
              tpGS.gsap.set(
                u.deepmedia[0].parentNode,
                (function (e) {
                  e = Q.clone(e);
                  return (
                    (e.top =
                      0 -
                      ((parseInt(e.borderTopWidth) || 0) +
                        (parseInt(e.borderBottomWidth) || 0)) /
                        2 +
                      "px"),
                    (e.left =
                      0 -
                      ((parseInt(e.borderLeftWidth) || 0) +
                        (parseInt(e.borderRightWidth) || 0)) /
                        2 +
                      "px"),
                    (e.borderStyle =
                      void 0 !== e.borderTopWidth ||
                      void 0 !== e.borderBottomWidth ||
                      void 0 !== e.borderLeftWidth ||
                      void 0 !== e.borderRightWidth
                        ? "solid"
                        : "none"),
                    (e.borderColor = "transparent"),
                    (e.boxSizing = "content-box"),
                    e
                  );
                })(i)
              ),
            "column" === u.type &&
              void 0 !== u.cbg &&
              (void 0 === u.cbg_set &&
                ((u.cbg_set = u.styleProps["background-color"]),
                (u.cbg_set =
                  "" == u.cbg_set ||
                  void 0 === u.cbg_set ||
                  0 == u.cbg_set.length
                    ? "transparent"
                    : u.cbg_set),
                (u.cbg_img =
                  void 0 !== s[0].dataset.bglazy
                    ? 'url("' + s[0].dataset.bglazy + '")'
                    : s.css("backgroundImage")),
                "" !== u.cbg_img &&
                  void 0 !== u.cbg_img &&
                  "none" !== u.cbg_img &&
                  ((u.cbg_img_r = s.css("backgroundRepeat")),
                  (u.cbg_img_p = s.css("backgroundPosition")),
                  (u.cbg_img_s = s.css("backgroundSize"))),
                (u.cbg_o = u.bgopacity && 1),
                (p.backgroundColor = "transparent"),
                (p.backgroundImage = "")),
              (i.backgroundColor = "transparent"),
              (i.backgroundImage = "none")),
            u._isstatic &&
              u.elementHovered &&
              (r = s.data("frames")) &&
              r.frame_hover &&
              r.frame_hover.transform)
          )
            for (o in i)
              i.hasOwnProperty(o) &&
                r.frame_hover.transform.hasOwnProperty(o) &&
                delete i[o];
          if (
            ("IFRAME" == s[0].nodeName &&
              "html" === Q.gA(s[0], "layertype") &&
              ((b = "slide" == v.basealign ? Q[n].module.width : Q.iWA(n, c)),
              (_ =
                "slide" == v.basealign ||
                ("carousel" == Q[n].sliderType &&
                  "v" === Q[n].carousel.orientation)
                  ? Q[n].module.height
                  : Q.iHE(n)),
              (i.width =
                !Q.isNumeric(v.width) && 0 <= v.width.indexOf("%")
                  ? !u._isstatic || u._incolumn || u._ingroup
                    ? v.width
                    : (b * parseInt(v.width, 0)) / 100
                  : k(v.width, f, "auto", b, "auto")),
              (i.height =
                !Q.isNumeric(v.height) && 0 <= v.height.indexOf("%")
                  ? !u._isstatic || u._incolumn || u._ingroup
                    ? v.height
                    : (_ * parseInt(v.height, 0)) / 100
                  : k(v.height, f, "auto", b, "auto"))),
            (p = jQuery.extend(!0, p, i)),
            (Q[n].firstLayerCalculated = !0),
            "rekursive" != l)
          ) {
            var b = "slide" == v.basealign ? Q[n].module.width : Q.iWA(n, c),
              _ =
                "slide" == v.basealign ||
                ("carousel" == Q[n].sliderType &&
                  "v" === Q[n].carousel.orientation)
                  ? Q[n].module.height
                  : Q.iHE(n),
              d =
                !Q.isNumeric(v.width) && 0 <= v.width.indexOf("%")
                  ? !u._isstatic || u._incolumn || u._ingroup
                    ? v.width
                    : (b * parseInt(v.width, 0)) / 100
                  : k(v.width, f, "auto", b, "auto"),
              h =
                !Q.isNumeric(v.height) && 0 <= v.height.indexOf("%")
                  ? !u._isstatic || u._incolumn || u._ingroup
                    ? v.height
                    : (_ * parseInt(v.height, 0)) / 100
                  : k(v.height, f, "auto", b, "auto"),
              S = {
                maxWidth: k(v.maxWidth, f, "none", b, "none"),
                maxHeight: k(v.maxHeight, f, "none", _, "none"),
                minWidth: k(v.minWidth, f, "0px", b, 0),
                minHeight: k(v.minHeight, f, "0px", _, 0),
                height: h,
                width: d,
                overwrite: "auto",
              },
              l = (1 == u.heightSetByVideo && (S.height = u.vidOBJ.height), !1);
            if (u._incolumn) {
              for (
                y = jQuery.extend(!0, y, {
                  minWidth: d,
                  maxWidth: d,
                  float: v.float,
                  clear: v.clear,
                }),
                  t = 0;
                t < 4;
                t++
              )
                void 0 !== v["margin" + R[t]] &&
                  (y["margin" + R[t]] = v["margin" + R[t]] * f + "px");
              (w.width = "100%"),
                (void 0 !== v.display && "inline-block" !== v.display) ||
                  (g = { width: "100%" }),
                (S.width =
                  !Q.isNumeric(v.width) && 0 <= v.width.indexOf("%")
                    ? "100%"
                    : d),
                "image" === u.type && tpGS.gsap.set(u.img, { width: "100%" });
            } else
              !Q.isNumeric(v.width) &&
                0 <= v.width.indexOf("%") &&
                ((u._isgroup && "absolute" === u.position) ||
                ((!0 === u._ingroup || 1 == u._incolumn) &&
                  "relative" === u.position) ||
                (void 0 !== u.reqWrp && (!u.reqWrp.loop || !u.reqWrp.mask))
                  ? (y.width =
                      "slide" === u.basealign ||
                      !0 === u._ingroup ||
                      u._isstatic
                        ? d
                        : (Q.iWA(n, c) * Q[n].CM.w * parseInt(d)) / 100 + "px")
                  : (y.minWidth =
                      "slide" === u.basealign ||
                      !0 === u._ingroup ||
                      u._isstatic
                        ? d
                        : (Q.iWA(n, c) * Q[n].CM.w * parseInt(d)) / 100 + "px"),
                (w.width = "100%"),
                (g.width = "100%"));
            if (
              (!0 === u._ingroup &&
                "relative" === u.position &&
                ((y.float = v.float),
                (y.lineHeight = v.lineHeight + "px"),
                (p.verticalAlign = "top"),
                (g.verticalAlign = "top"),
                (w.verticalAlign = "top"),
                (y.verticalAlign = "inherit")),
              !Q.isNumeric(v.height) &&
                0 <= v.height.indexOf("%") &&
                ((y.minHeight =
                  "slide" === u.basealign || !0 === u._ingroup || u._isstatic
                    ? h
                    : (Q.iHE(n) *
                        (Q[n].currentRowsHeight > Q[n].gridheight[Q[n].level]
                          ? 1
                          : Q[n].CM.w) *
                        parseInt(h)) /
                        100 +
                      "px"),
                void 0 === u.reqWrp ||
                  u.reqWrp.loop ||
                  u.reqWrp.mask ||
                  (y.height = y.minHeight),
                (w.height = "100%"),
                (g.height = "100%"),
                (l = !0)),
              u._isnotext
                ? "group" == u.type && (S.whiteSpace = "normal")
                : ((S.whiteSpace = v.whiteSpace),
                  (S.textAlign = v.textAlign),
                  (S.textDecoration = v.textDecoration)),
              "npc" != v.color && void 0 !== v.color && (S.color = v.color),
              u._ingroup &&
                ((u._groupw = S.minWidth), (u._grouph = S.minHeight)),
              "row" === u.type &&
              (Q.isNumeric(S.minHeight) || 0 <= S.minHeight.indexOf("px")) &&
              "0px" !== S.minHeight &&
              0 !== S.minHeight &&
              "0" !== S.minHeight &&
              "none" !== S.minHeight
                ? (S.height = S.minHeight)
                : "row" === u.type && (S.height = "auto"),
              u._isstatic &&
                u.elementHovered &&
                (r = s.data("frames")) &&
                r.frame_hover &&
                r.frame_hover.transform)
            )
              for (o in S)
                S.hasOwnProperty(o) &&
                  r.frame_hover.transform.hasOwnProperty(o) &&
                  delete S[o];
            if (
              ("group" !== u.type &&
                "row" !== u.type &&
                "column" !== u.type &&
                (!Q.isNumeric(S.width) &&
                  0 <= S.width.indexOf("%") &&
                  (S.width = "100%"),
                !Q.isNumeric(S.height)) &&
                0 <= S.height.indexOf("%") &&
                (S.height = "100%"),
              u._isgroup)
            ) {
              for (
                !Q.isNumeric(S.width) &&
                  0 <= S.width.indexOf("%") &&
                  (S.width = "100%"),
                  "absolute" != u.position || u._ingroup || u._incolumn || !l
                    ? (y.height = l ? "100%" : S.height)
                    : ((y.height = y.minHeight), (S.height = "100%")),
                  S.lineHeight =
                    void 0 === v.lineHeight || l
                      ? "initial"
                      : v.lineHeight + "px",
                  S.verticalAlign = u.verticalalign,
                  S.textAlign = v.textAlign,
                  t = 0;
                t < 4;
                t++
              )
                void 0 !== p["border" + L[t] + "Radius"] &&
                  (g["border" + L[t] + "Radius"] =
                    p["border" + L[t] + "Radius"]);
              "relative" == u.position &&
                void 0 !== v.display &&
                (y.display = v.display),
                "auto" == v.width && (g.position = "relative");
            }
            (p = jQuery.extend(!0, p, S)),
              null != u.svg_src &&
                void 0 !== u.svgI &&
                ("string" == typeof u.svgI.fill &&
                  (u.svgI.fill = [u.svgI.fill]),
                (u.svgTemp = Q.clone(u.svgI)),
                delete u.svgTemp.svgAll,
                void 0 !== u.svgTemp.fill &&
                  !0 !== (u.elementHovered && u._isstatic) &&
                  ((u.svgTemp.fill = u.svgTemp.fill[Q[n].level]),
                  u.svg.length <= 0 && (u.svg = s.find("svg")),
                  u.svgPath.length <= 0 &&
                    (u.svgPath = u.svg.find(
                      u.svgI.svgAll
                        ? "path, circle, ellipse, line, polygon, polyline, rect"
                        : "path"
                    )),
                  tpGS.gsap.set(u.svgPath, { fill: u.svgI.fill[Q[n].level] })),
                tpGS.gsap.set(u.svg, u.svgTemp));
          }
          if ("row" === u.type)
            for (t = 0; t < 4; t++)
              void 0 !== v["margin" + R[t]] &&
                (y["padding" + R[t]] = v["margin" + R[t]] * f + "px");
          if (u._ingroup && "relative" == u.position) {
            for (t = 0; t < 4; t++)
              void 0 !== v["margin" + R[t]] &&
                (y["margin" + R[t]] = v["margin" + R[t]] * f + "px");
            "shape" === u.type &&
              "100%" == g.width &&
              "100%" == g.height &&
              (g.position = "absolute");
          }
          if ("column" === u.type && u.cbg && 0 < u.cbg.length) {
            for (
              void 0 !== u.cbg_img_s &&
                void 0 !== u.cbg &&
                (u.cbg[0].style.backgroundSize = u.cbg_img_s),
                i = {},
                "" !== u.styleProps.cursor && (i.cursor = u.styleProps.cursor),
                "" !== u.cbg_set &&
                  "transparent" !== u.cbg_set &&
                  (i.backgroundColor = u.cbg_set),
                "" !== u.cbg_img &&
                  "none" !== u.cbg_img &&
                  ((i.backgroundImage = u.cbg_img),
                  "" !== u.cbg_img_r && (i.backgroundRepeat = u.cbg_img_r),
                  "" !== u.cbg_img_p) &&
                  (i.backgroundPosition = u.cbg_img_p),
                "" !== u.cbg_o && void 0 !== u.cbg_o && (i.opacity = u.cbg_o),
                t = 0;
              t < 4;
              t++
            )
              void 0 !== v.borderStyle &&
                "none" !== v.borderStyle &&
                (void 0 !== v["border" + R[t] + "Width"] &&
                  (i["border" + R[t] + "Width"] =
                    Math.round(parseInt(v["border" + R[t] + "Width"]) * f) +
                    "px"),
                void 0 !== v["border" + R[t] + "Color"]) &&
                (i["border" + R[t] + "Color"] = v["border" + R[t] + "Color"]),
                v["border" + L[t] + "Radius"] &&
                  (i["border" + L[t] + "Radius"] =
                    v["border" + L[t] + "Radius"]);
            for (
              void 0 !== v.borderStyle &&
                "none" !== v.borderStyle &&
                (i.borderStyle = v.borderStyle),
                (a = JSON.stringify(i)) !== Q[n].emptyObject &&
                  a !== u.caches.cbgS &&
                  tpGS.gsap.set(u.cbg, i),
                u.caches.cbgS = a,
                i = {},
                t = 0;
              t < 4;
              t++
            )
              m["margin" + R[t]] && (i[I[t]] = m["margin" + R[t]] * f + "px");
            (a = JSON.stringify(i)) !== Q[n].emptyObject &&
              a !== u.caches.cbgmaskS &&
              (tpGS.gsap.set(u.cbgmask, i), (u.caches.cbgmaskS = a));
          }
          for (var x in (void 0 === u.reqWrp ||
            u.reqWrp.loop ||
            u.reqWrp.mask ||
            "100%" != p.width ||
            "100%" != p.height ||
            (p.position = "absolute"),
          "auto" === y.maxWidth && (y.maxWidth = "inherit"),
          "auto" === y.maxHeight && (y.maxHeight = "inherit"),
          "auto" === g.maxWidth && (g.maxWidth = "inherit"),
          "auto" === g.maxHeight && (g.maxHeight = "inherit"),
          "auto" === w.maxWidth && (w.maxWidth = "inherit"),
          "auto" === w.maxHeight && (w.maxHeight = "inherit"),
          u.fullinset &&
            1 == u._ingroup &&
            "absolute" === u.position &&
            ((y.width = "auto"),
            (y.minHeight = "auto"),
            (y.height = "auto"),
            (y.left =
              void 0 !== p.marginLeft && "0px" !== p.marginLeft
                ? p.marginLeft
                : "0px"),
            (y.right =
              void 0 !== p.marginRight && "0px" !== p.marginRight
                ? p.marginRight
                : "0px"),
            (y.top =
              void 0 !== p.marginTop && "0px" !== p.marginTop
                ? p.marginTop
                : "0px"),
            (y.bottom =
              void 0 !== p.marginBottom && "0px" !== p.marginBottom
                ? p.marginBottom
                : "0px"),
            delete p.marginLeft,
            delete p.marginRight,
            delete p.marginTop,
            delete p.marginBottom),
          void 0 !== u.vidOBJ &&
            ((p.width = u.vidOBJ.width), (p.height = u.vidOBJ.height)),
          void 0 !== u.OBJUPD.lppmOBJ &&
            (void 0 !== u.OBJUPD.lppmOBJ.minWidth &&
              ((w.minWidth = u.OBJUPD.lppmOBJ.minWidth),
              (g.minWidth = u.OBJUPD.lppmOBJ.minWidth)),
            void 0 !== u.OBJUPD.lppmOBJ.minHeight) &&
            ((w.minHeight = u.OBJUPD.lppmOBJ.minHeight),
            (g.minHeight = u.OBJUPD.lppmOBJ.minHeight),
            (y.minHeight = u.OBJUPD.lppmOBJ.minHeight)),
          u._incolumn &&
            "group" == u.type &&
            void 0 !== y &&
            "100%" == y.minWidth &&
            (g.width = "100%"),
          u._isgroup &&
            u.thFixed &&
            void 0 !== u.reqWrp &&
            u.reqWrp.loop &&
            u.reqWrp.mask &&
            "auto" == v.width &&
            (w.position = "relative"),
          !u._ingroup ||
            u.reqWrp.loop ||
            u.reqWrp.mask ||
            "absolute" != u.position ||
            "100%" != y.minHeight ||
            (y.height = "100%"),
          Q[n].calcResponsiveLayerHooks)) {
            x = Q[n].calcResponsiveLayerHooks[x]({
              id: n,
              L: s,
              obj: v,
              _: u,
              inobj: e,
              LOBJ: p,
              LPOBJ: w,
              MOBJ: g,
              POBJ: y,
            });
            null != x &&
              (void 0 !== x.obj && (v = jQuery.extend(!0, v, x.obj)),
              void 0 !== x.LOBJ && (p = jQuery.extend(!0, p, x.LOBJ)),
              void 0 !== x.LPOBJ && (w = jQuery.extend(!0, w, x.LPOBJ)),
              void 0 !== x.MOBJ && (g = jQuery.extend(!0, g, x.MOBJ)),
              void 0 !== x.POBJ) &&
              (y = jQuery.extend(!0, y, x.POBJ));
          }
          (a = JSON.stringify(p)),
            (b = JSON.stringify(w)),
            (_ = JSON.stringify(g)),
            (c = JSON.stringify(y)),
            void 0 === u.imgOBJ ||
              (void 0 !== u.caches.imgOBJ &&
                u.caches.imgOBJ.width === u.imgOBJ.width &&
                u.caches.imgOBJ.height === u.imgOBJ.height &&
                u.caches.imgOBJ.left === u.imgOBJ.left &&
                u.caches.imgOBJ.right === u.imgOBJ.right &&
                u.caches.imgOBJ.top === u.imgOBJ.top &&
                u.caches.imgOBJ.bottom === u.imgOBJ.bottom) ||
              ((u.caches.imgOBJ = Q.clone(u.imgOBJ)),
              (u.imgOBJ.position = "relative"),
              tpGS.gsap.set(u.img, u.imgOBJ)),
            void 0 === u.mediaOBJ ||
              (void 0 !== u.caches.mediaOBJ &&
                u.caches.mediaOBJ.width === u.mediaOBJ.width &&
                u.caches.mediaOBJ.height === u.mediaOBJ.height &&
                u.caches.mediaOBJ.display === u.mediaOBJ.display) ||
              ((u.caches.mediaOBJ = Q.clone(u.mediaOBJ)),
              u.media.css(u.mediaOBJ)),
            a != Q[n].emptyObject &&
              a != u.caches.LOBJ &&
              (tpGS.gsap.set(s, p), (u.caches.LOBJ = a)),
            void 0 !== u.lp &&
              b != Q[n].emptyObject &&
              b != u.caches.LPOBJ &&
              (tpGS.gsap.set(u.lp, w), (u.caches.LPOBJ = b)),
            _ != Q[n].emptyObject &&
              _ != u.caches.MOBJ &&
              (tpGS.gsap.set(u.m, g), (u.caches.MOBJ = _)),
            c != Q[n].emptyObject &&
              c != u.caches.POBJ &&
              (tpGS.gsap.set(u.p, y),
              (u.caches.POBJ = c),
              (u.caches.POBJ_LEFT = y.left),
              (u.caches.POBJ_TOP = y.top));
        }
      },
      C = function (e) {
        var t,
          i = { l: "none", lw: 10, r: "none", rw: 10 };
        for (t in (e = e.split(";")))
          if (e.hasOwnProperty(t)) {
            var a = e[t].split(":");
            switch (a[0]) {
              case "l":
                i.l = a[1];
                break;
              case "r":
                i.r = a[1];
                break;
              case "lw":
                i.lw = a[1];
                break;
              case "rw":
                i.rw = a[1];
            }
          }
        return (
          "polygon(" +
          r(i.l, 0, parseFloat(i.lw)) +
          "," +
          r(i.r, 100, 100 - parseFloat(i.rw), !0) +
          ")"
        );
      },
      r = function (e, t, i, a) {
        switch (e) {
          case "none":
            o = t + "% 100%," + t + "% 0%";
            break;
          case "top":
            o = i + "% 100%," + t + "% 0%";
            break;
          case "middle":
            o = i + "% 100%," + t + "% 50%," + i + "% 0%";
            break;
          case "bottom":
            o = t + "% 100%," + i + "% 0%";
            break;
          case "two":
            o =
              i +
              "% 100%," +
              t +
              "% 75%," +
              i +
              "% 50%," +
              t +
              "% 25%," +
              i +
              "% 0%";
            break;
          case "three":
            o =
              t +
              "% 100%," +
              i +
              "% 75%," +
              t +
              "% 50%," +
              i +
              "% 25%," +
              t +
              "% 0%";
            break;
          case "four":
            o =
              t +
              "% 100%," +
              i +
              "% 87.5%," +
              t +
              "% 75%," +
              i +
              "% 62.5%," +
              t +
              "% 50%," +
              i +
              "% 37.5%," +
              t +
              "% 25%," +
              i +
              "% 12.5%," +
              t +
              "% 0%";
            break;
          case "five":
            o =
              t +
              "% 100%," +
              i +
              "% 90%," +
              t +
              "% 80%," +
              i +
              "% 70%," +
              t +
              "% 60%," +
              i +
              "% 50%," +
              t +
              "% 40%," +
              i +
              "% 30%," +
              t +
              "% 20%," +
              i +
              "% 10%," +
              t +
              "% 0%";
        }
        if (a) {
          var r = o.split(","),
            o = "";
          for (i in r)
            r.hasOwnProperty(i) &&
              (o += r[r.length - 1 - i] + (i < r.length - 1 ? "," : ""));
        }
        return o;
      };
    (window.RS_MODULES = window.RS_MODULES || {}),
      (window.RS_MODULES.layeranimation = { loaded: !0, version: "6.6.17" }),
      window.RS_MODULES.checkMinimal && window.RS_MODULES.checkMinimal();
  })(jQuery),
  !(function () {
    "use strict";
    jQuery.fn.revolution = jQuery.fn.revolution || {};
    var R = jQuery.fn.revolution;
    function g(e, t) {
      e = new Object({
        single: ".tp-" + t,
        c: R[e].cpar.find(".tp-" + t + "s"),
      });
      return (
        (e.mask = e.c.find(".tp-" + t + "-mask")),
        (e.wrap = e.c.find(".tp-" + t + "s-inner-wrapper")),
        e
      );
    }
    jQuery.extend(!0, R, {
      hideUnHideNav: function (t) {
        window.requestAnimationFrame(function () {
          var e = !1;
          f(R[t].navigation.arrows) && (e = i(R[t].navigation.arrows, t, e)),
            f(R[t].navigation.bullets) &&
              (e = i(R[t].navigation.bullets, t, e)),
            f(R[t].navigation.thumbnails) &&
              (e = i(R[t].navigation.thumbnails, t, e)),
            (e = f(R[t].navigation.tabs) ? i(R[t].navigation.tabs, t, e) : e) &&
              R.manageNavigation(t);
        });
      },
      getOuterNavDimension: function (e) {
        R[e].navigation.scaler = Math.max(0, Math.min(1, (R.winW - 480) / 500));
        var t = {
          left: 0,
          right: 0,
          horizontal: 0,
          vertical: 0,
          top: 0,
          bottom: 0,
        };
        return (
          R[e].navigation.thumbnails &&
            R[e].navigation.thumbnails.enable &&
            ((R[e].navigation.thumbnails.isVisible =
              R[e].navigation.thumbnails.hide_under < R[e].module.width &&
              R[e].navigation.thumbnails.hide_over > R[e].module.width),
            (R[e].navigation.thumbnails.cw = Math.max(
              Math.round(
                R[e].navigation.thumbnails.width * R[e].navigation.scaler
              ),
              R[e].navigation.thumbnails.min_width
            )),
            (R[e].navigation.thumbnails.ch = Math.round(
              (R[e].navigation.thumbnails.cw /
                R[e].navigation.thumbnails.width) *
                R[e].navigation.thumbnails.height
            )),
            R[e].navigation.thumbnails.isVisible &&
            "outer-left" === R[e].navigation.thumbnails.position
              ? (t.left =
                  R[e].navigation.thumbnails.cw +
                  2 * R[e].navigation.thumbnails.wrapper_padding)
              : R[e].navigation.thumbnails.isVisible &&
                "outer-right" === R[e].navigation.thumbnails.position
              ? (t.right =
                  R[e].navigation.thumbnails.cw +
                  2 * R[e].navigation.thumbnails.wrapper_padding)
              : R[e].navigation.thumbnails.isVisible &&
                "outer-top" === R[e].navigation.thumbnails.position
              ? (t.top =
                  R[e].navigation.thumbnails.ch +
                  2 * R[e].navigation.thumbnails.wrapper_padding)
              : R[e].navigation.thumbnails.isVisible &&
                "outer-bottom" === R[e].navigation.thumbnails.position &&
                (t.bottom =
                  R[e].navigation.thumbnails.ch +
                  2 * R[e].navigation.thumbnails.wrapper_padding)),
          R[e].navigation.tabs &&
            R[e].navigation.tabs.enable &&
            ((R[e].navigation.tabs.isVisible =
              R[e].navigation.tabs.hide_under < R[e].module.width &&
              R[e].navigation.tabs.hide_over > R[e].module.width),
            (R[e].navigation.tabs.cw = Math.max(
              Math.round(R[e].navigation.tabs.width * R[e].navigation.scaler),
              R[e].navigation.tabs.min_width
            )),
            (R[e].navigation.tabs.ch = Math.round(
              (R[e].navigation.tabs.cw / R[e].navigation.tabs.width) *
                R[e].navigation.tabs.height
            )),
            R[e].navigation.tabs.isVisible &&
            "outer-left" === R[e].navigation.tabs.position
              ? (t.left +=
                  R[e].navigation.tabs.cw +
                  2 * R[e].navigation.tabs.wrapper_padding)
              : R[e].navigation.tabs.isVisible &&
                "outer-right" === R[e].navigation.tabs.position
              ? (t.right +=
                  R[e].navigation.tabs.cw +
                  2 * R[e].navigation.tabs.wrapper_padding)
              : R[e].navigation.tabs.isVisible &&
                "outer-top" === R[e].navigation.tabs.position
              ? (t.top +=
                  R[e].navigation.tabs.ch +
                  2 * R[e].navigation.tabs.wrapper_padding)
              : R[e].navigation.tabs.isVisible &&
                "outer-bottom" === R[e].navigation.tabs.position &&
                (t.bottom +=
                  R[e].navigation.tabs.ch +
                  2 * R[e].navigation.tabs.wrapper_padding)),
          {
            left: t.left,
            right: t.right,
            horizontal: t.left + t.right,
            vertical: t.top + t.bottom,
            top: t.top,
            bottom: t.bottom,
          }
        );
      },
      resizeThumbsTabs: function (e, t) {
        var i, a, r, o, s;
        return (
          void 0 !== R[e] &&
            R[e].navigation.use &&
            ((R[e].navigation && R[e].navigation.bullets.enable) ||
              (R[e].navigation && R[e].navigation.tabs.enable) ||
              (R[e].navigation && R[e].navigation.thumbnails.enable)) &&
            ((i = tpGS.gsap.timeline()),
            (a = R[e].navigation.tabs),
            (r = R[e].navigation.thumbnails),
            (o = R[e].navigation.bullets),
            i.pause(),
            f(a) &&
              (t || a.width > a.min_width) &&
              d(e, i, R[e].c, a, R[e].slideamount, "tab"),
            f(r) &&
              (t || r.width > r.min_width) &&
              d(e, i, R[e].c, r, R[e].slideamount, "thumb", e),
            f(o) &&
              t &&
              (s = R[e].c.find(".tp-bullets"))
                .find(".tp-bullet")
                .each(function (e) {
                  var t = jQuery(this),
                    e = e + 1,
                    i =
                      t.outerWidth() +
                      parseInt(void 0 === o.space ? 0 : o.space, 0),
                    a =
                      t.outerHeight() +
                      parseInt(void 0 === o.space ? 0 : o.space, 0);
                  "vertical" === o.direction
                    ? (t.css({ top: (e - 1) * a + "px", left: "0px" }),
                      s.css({
                        height: (e - 1) * a + t.outerHeight(),
                        width: t.outerWidth(),
                      }))
                    : (t.css({ left: (e - 1) * i + "px", top: "0px" }),
                      s.css({
                        width: (e - 1) * i + t.outerWidth(),
                        height: t.outerHeight(),
                      }));
                }),
            i.play()),
          !0
        );
      },
      updateNavIndexes: function (e) {
        var t = R[e].c;
        function i(e) {
          0 < t.find(e).lenght &&
            t.find(e).each(function (e) {
              jQuery(this).data("liindex", e);
            });
        }
        i("rs-tab"),
          i("rs-bullet"),
          i("rs-thumb"),
          R.resizeThumbsTabs(e, !0),
          R.manageNavigation(e);
      },
      manageNavigation: function (e, t) {
        R[e].navigation.use &&
          (f(R[e].navigation.bullets) &&
            ("fullscreen" != R[e].sliderLayout &&
              "fullwidth" != R[e].sliderLayout &&
              ((R[e].navigation.bullets.h_offset_old =
                void 0 === R[e].navigation.bullets.h_offset_old
                  ? parseInt(R[e].navigation.bullets.h_offset, 0)
                  : R[e].navigation.bullets.h_offset_old),
              (R[e].navigation.bullets.h_offset =
                "center" === R[e].navigation.bullets.h_align
                  ? R[e].navigation.bullets.h_offset_old +
                    R[e].outNavDims.left / 2 -
                    R[e].outNavDims.right / 2
                  : R[e].navigation.bullets.h_offset_old +
                    R[e].outNavDims.left)),
            _(R[e].navigation.bullets, e)),
          f(R[e].navigation.thumbnails) && _(R[e].navigation.thumbnails, e),
          f(R[e].navigation.tabs) && _(R[e].navigation.tabs, e),
          f(R[e].navigation.arrows) &&
            ("fullscreen" != R[e].sliderLayout &&
              "fullwidth" != R[e].sliderLayout &&
              ((R[e].navigation.arrows.left.h_offset_old =
                void 0 === R[e].navigation.arrows.left.h_offset_old
                  ? parseInt(R[e].navigation.arrows.left.h_offset, 0)
                  : R[e].navigation.arrows.left.h_offset_old),
              (R[e].navigation.arrows.left.h_offset =
                (R[e].navigation.arrows.left.h_align,
                R[e].navigation.arrows.left.h_offset_old)),
              (R[e].navigation.arrows.right.h_offset_old =
                void 0 === R[e].navigation.arrows.right.h_offset_old
                  ? parseInt(R[e].navigation.arrows.right.h_offset, 0)
                  : R[e].navigation.arrows.right.h_offset_old),
              (R[e].navigation.arrows.right.h_offset =
                (R[e].navigation.arrows.right.h_align,
                R[e].navigation.arrows.right.h_offset_old))),
            _(R[e].navigation.arrows.left, e),
            _(R[e].navigation.arrows.right, e)),
          !1 !== t) &&
          (f(R[e].navigation.thumbnails) && c(R[e].navigation.thumbnails, e),
          f(R[e].navigation.tabs)) &&
          c(R[e].navigation.tabs, e);
      },
      showFirstTime: function (e) {
        y(e), R.hideUnHideNav(e);
      },
      selectNavElement: function (e, t, i, a) {
        for (
          var r = R[e].cpar[0].getElementsByClassName(i), o = 0;
          o < r.length;
          o++
        )
          R.gA(r[o], "key") === t
            ? (r[o].classList.add("selected"), void 0 !== a && a())
            : r[o].classList.remove("selected");
      },
      transferParams: function (e, t) {
        if (void 0 !== t)
          for (var i in t.params)
            e = e.replace(t.params[i].from, t.params[i].to);
        return e;
      },
      updateNavElementContent: function (e, t, i, a, r) {
        if (void 0 !== R[e].pr_next_key || void 0 !== R[e].pr_active_key) {
          var o,
            s =
              void 0 === R[e].pr_next_key
                ? void 0 === R[e].pr_cache_pr_next_key
                  ? R[e].pr_active_key
                  : R[e].pr_cache_pr_next_key
                : R[e].pr_next_key,
            n = R.gA(R[e].slides[s], "key"),
            l = 0,
            d = !1;
          for (o in (i.enable && R.selectNavElement(e, n, "tp-bullet"),
          a.enable &&
            R.selectNavElement(e, n, "tp-thumb", function () {
              c(a, e);
            }),
          r.enable &&
            R.selectNavElement(e, n, "tp-tab", function () {
              c(r, e);
            }),
          R[e].thumbs))
            (l = !0 === d ? l : o),
              (d = R[e].thumbs[o].id === n || o == n || d);
          (s = 0 < (l = parseInt(l, 0)) ? l - 1 : R[e].slideamount - 1),
            (i = l + 1 == R[e].slideamount ? 0 : l + 1);
          !0 === t.enable &&
            t.pi !== s &&
            t.ni !== i &&
            ((t.pi = s),
            (t.ni = i),
            (t.left.c[0].innerHTML = R.transferParams(t.tmp, R[e].thumbs[s])),
            i > R[e].slideamount ||
              ((t.right.c[0].innerHTML = R.transferParams(
                t.tmp,
                R[e].thumbs[i]
              )),
              (t.right.iholder = t.right.c.find(".tp-arr-imgholder")),
              (t.left.iholder = t.left.c.find(".tp-arr-imgholder")),
              t.rtl
                ? (void 0 !== t.left.iholder[0] &&
                    tpGS.gsap.set(t.left.iholder, {
                      backgroundImage: "url(" + R[e].thumbs[i].src + ")",
                    }),
                  void 0 !== R[e].thumbs[s] &&
                    void 0 !== t.right.iholder[0] &&
                    tpGS.gsap.set(t.right.iholder, {
                      backgroundImage: "url(" + R[e].thumbs[s].src + ")",
                    }))
                : (void 0 !== R[e].thumbs[s] &&
                    void 0 !== t.left.iholder[0] &&
                    tpGS.gsap.set(t.left.iholder, {
                      backgroundImage: "url(" + R[e].thumbs[s].src + ")",
                    }),
                  void 0 !== t.right.iholder[0] &&
                    tpGS.gsap.set(t.right.iholder, {
                      backgroundImage: "url(" + R[e].thumbs[i].src + ")",
                    }))));
        }
      },
      createNavigation: function (t) {
        var e,
          i,
          a,
          r = R[t].navigation.arrows,
          o = R[t].navigation.bullets,
          s = R[t].navigation.thumbnails,
          n = R[t].navigation.tabs,
          l = f(r),
          d = f(o),
          c = f(s),
          p = f(n);
        for (e in (u(t),
        h(t),
        l && (b(r, t), (r.c = R[t].cpar.find(".tparrows"))),
        R[t].slides))
          R[t].slides.hasOwnProperty(e) &&
            "true" != R.gA(R[t].slides[e], "not_in_nav") &&
            ((i = jQuery(R[t].slides[R[t].slides.length - 1 - e])),
            (a = jQuery(R[t].slides[e])),
            d &&
              (R[t].navigation.bullets.rtl
                ? S(R[t].c, o, i, t)
                : S(R[t].c, o, a, t)),
            c &&
              (R[t].navigation.thumbnails.rtl
                ? x(R[t].c, s, i, "tp-thumb", t)
                : x(R[t].c, s, a, "tp-thumb", t)),
            p) &&
            (R[t].navigation.tabs.rtl
              ? x(R[t].c, n, i, "tp-tab", t)
              : x(R[t].c, n, a, "tp-tab", t));
        d && _(o, t),
          c && _(s, t),
          p && _(n, t),
          (c || p) && R.updateDims(t),
          (R[t].navigation.createNavigationDone = !0),
          c && jQuery.extend(!0, s, g(t, "thumb")),
          p && jQuery.extend(!0, n, g(t, "tab")),
          R[t].c.on(
            "revolution.slide.onafterswap revolution.nextslide.waiting",
            function () {
              R.updateNavElementContent(t, r, o, s, n);
            }
          ),
          v(r),
          v(o),
          v(s),
          v(n),
          R[t].cpar.on(
            R.ISM ? "touchstart touchmove" : "mouseenter mousemove",
            function (e) {
              (void 0 !== e.target &&
                void 0 !== e.target.className &&
                "string" == typeof e.target.className &&
                0 <= e.target.className.indexOf("rs-waction")) ||
                (!0 !== R[t].tpMouseOver &&
                  R[t].firstSlideAvailable &&
                  ((R[t].tpMouseOver = !0), y(t), R.ISM) &&
                  !0 !== R[t].someNavIsDragged &&
                  (I(R[t].hideAllNavElementTimer),
                  (R[t].hideAllNavElementTimer = setTimeout(function () {
                    (R[t].tpMouseOver = !1), w(t);
                  }, 150))));
            }
          ),
          R[t].cpar.on(R.ISM ? "touchend" : "mouseleave ", function () {
            (R[t].tpMouseOver = !1), w(t);
          }),
          (c ||
            p ||
            "carousel" === R[t].sliderType ||
            R[t].navigation.touch.touchOnDesktop ||
            (R[t].navigation.touch.touchenabled && R.ISM)) &&
            m(t),
          (R[t].navigation.initialised = !0),
          R.updateNavElementContent(t, r, o, s, n),
          R.showFirstTime(t);
      },
    });
    function L(e, t) {
      var i,
        a = !1;
      for (i in ((void 0 !== t.path && !R.ISM) || (a = r(t.target, e)), t.path))
        t.path.hasOwnProperty(i) && t.path[i].tagName === e && (a = !0);
      return a;
    }
    function n(e, t, i, a) {
      var a = void 0 === a ? e.outerHeight(!0) : a,
        r =
          null == R[i]
            ? 0
            : (0 == R[i].canv.height ? R[i].module : R[i].canv).height,
        r =
          "layergrid" == t.container
            ? "fullscreen" == R[i].sliderLayout
              ? R[i].module.height / 2 -
                (R[i].gridheight[R[i].level] * R[i].CM.h) / 2
              : R[i].autoHeight ||
                (null != R[i].minHeight && 0 < R[i].minHeight)
              ? r / 2 - (R[i].gridheight[R[i].level] * R[i].CM.h) / 2
              : 0
            : 0,
        i =
          "top" === t.v_align
            ? { top: "0px", y: Math.round(t.v_offset + r) + "px" }
            : "center" === t.v_align
            ? { top: "50%", y: Math.round(0 - a / 2 + t.v_offset) + "px" }
            : { top: "100%", y: Math.round(0 - (a + t.v_offset + r)) + "px" };
      e.hasClass("outer-bottom") || tpGS.gsap.set(e, i);
    }
    function l(e, t, i, a) {
      (a = void 0 === a ? e.outerWidth() : a),
        (i =
          "layergrid" === t.container
            ? R[i].module.width / 2 -
              (R[i].gridwidth[R[i].level] * R[i].CM.w) / 2
            : 0),
        (a =
          "left" === t.h_align
            ? { left: "0px", x: Math.round(t.h_offset + i) + "px" }
            : "center" === t.h_align
            ? { left: "50%", x: Math.round(0 - a / 2 + t.h_offset) + "px" }
            : { left: "100%", x: Math.round(0 - (a + t.h_offset + i)) + "px" }),
        tpGS.gsap.set(e, a);
    }
    var c = function (e, t) {
        var i, a, r, o, s, n, l;
        void 0 === e ||
          null == e.mask ||
          ((i =
            "vertical" === e.direction
              ? e.mask.find(e.single).first().outerHeight(!0) + e.space
              : e.mask.find(e.single).first().outerWidth(!0) + e.space),
          (a = "vertical" === e.direction ? e.mask.height() : e.mask.width()),
          (o = e.mask.find(e.single + ".selected").data("liindex")),
          (o =
            0 <
              (o = void 0 === (o = e.rtl ? R[t].slideamount - o : o) ? 0 : o) &&
            1 === R[t].sdir &&
            1 < e.visibleAmount
              ? o - 1
              : o),
          (t = a / i),
          (r = "vertical" === e.direction ? e.mask.height() : e.mask.width()),
          (n =
            (o = 0 - o * i) <
            0 -
              ((s =
                "vertical" === e.direction ? e.wrap.height() : e.wrap.width()) -
                r)
              ? 0 - (s - r)
              : o),
          (l = void 0 === (l = R.gA(e.wrap[0], "offset")) ? 0 : l),
          2 < t &&
            ((n = o - (l + i) <= 0 ? (o - (l + i) < 0 - i ? l : n + i) : n),
            (n =
              o - i + l + a < i && o + (Math.round(t) - 2) * i < l
                ? o + (Math.round(t) - 2) * i
                : n)),
          (n =
            ("vertical" !== e.direction && e.mask.width() >= e.wrap.width()) ||
            ("vertical" === e.direction && e.mask.height() >= e.wrap.height())
              ? 0
              : n < 0 - (s - r)
              ? 0 - (s - r)
              : 0 < n
              ? 0
              : n),
          e.c.hasClass("dragged")) ||
          ("vertical" === e.direction
            ? e.wrap.data(
                "tmmove",
                tpGS.gsap.to(e.wrap, 0.5, {
                  top: n + "px",
                  ease: "power3.inOut",
                })
              )
            : e.wrap.data(
                "tmmove",
                tpGS.gsap.to(e.wrap, 0.5, {
                  left: n + "px",
                  ease: "power3.inOut",
                })
              ),
          e.wrap.data("offset", n));
      },
      d = function (e, i, t, a, r, o) {
        var t = t.parent().find(".tp-" + o + "s"),
          s = t.find(".tp-" + o + "s-inner-wrapper"),
          n = t.find(".tp-" + o + "-mask"),
          l =
            "vertical" === a.direction
              ? a.cw
              : a.cw * r + parseFloat(a.space) * (r - 1),
          r =
            "vertical" === a.direction
              ? a.ch * r + parseInt(a.space) * (r - 1)
              : a.ch,
          d =
            "vertical" === a.direction
              ? { width: a.cw + "px" }
              : { height: a.ch + "px" },
          t =
            (i.add(tpGS.gsap.set(t, d)),
            i.add(tpGS.gsap.set(s, { width: l + "px", height: r + "px" })),
            "horizontal" === a.direction
              ? ((t = Math.min(
                  l,
                  a.cw * a.visibleAmount +
                    parseFloat(a.space) * (a.visibleAmount - 1)
                )),
                i.add(tpGS.gsap.set(n, { width: t + "px", height: r + "px" })))
              : ((d = Math.min(
                  r,
                  a.ch * a.visibleAmount +
                    parseFloat(a.space) * (a.visibleAmount - 1)
                )),
                i.add(tpGS.gsap.set(n, { width: l + "px", height: d + "px" }))),
            null !== s.outerWidth() && (R[e].thumbResized = !0),
            s.find(".tp-" + o));
        return (
          t &&
            jQuery.each(t, function (e, t) {
              "vertical" === a.direction
                ? i.add(
                    tpGS.gsap.set(t, {
                      top:
                        e *
                        (a.ch + parseInt(void 0 === a.space ? 0 : a.space, 0)),
                      width: a.cw + "px",
                      height: a.ch + "px",
                    })
                  )
                : "horizontal" === a.direction &&
                  i.add(
                    tpGS.gsap.set(t, {
                      left:
                        e *
                        (a.cw + parseInt(void 0 === a.space ? 0 : a.space, 0)),
                      width: a.cw + "px",
                      height: a.ch + "px",
                    })
                  );
            }),
          i
        );
      },
      u = function (t) {
        !0 === R[t].navigation.keyboardNavigation &&
          R.document.on("keydown", function (e) {
            if (
              ("horizontal" == R[t].navigation.keyboard_direction &&
                39 == e.keyCode) ||
              ("vertical" == R[t].navigation.keyboard_direction &&
                40 == e.keyCode)
            ) {
              if (
                void 0 !== R[t].keydown_time_stamp &&
                new Date().getTime() - R[t].keydown_time_stamp < 1e3
              )
                return;
              (R[t].sc_indicator = "arrow"),
                (R[t].sc_indicator_dir = 0),
                "carousel" === R[t].sliderType && (R[t].ctNavElement = !0),
                R.callingNewSlide(t, 1, "carousel" === R[t].sliderType);
            }
            if (
              ("horizontal" == R[t].navigation.keyboard_direction &&
                37 == e.keyCode) ||
              ("vertical" == R[t].navigation.keyboard_direction &&
                38 == e.keyCode)
            ) {
              if (
                void 0 !== R[t].keydown_time_stamp &&
                new Date().getTime() - R[t].keydown_time_stamp < 1e3
              )
                return;
              (R[t].sc_indicator = "arrow"),
                (R[t].sc_indicator_dir = 1),
                "carousel" === R[t].sliderType && (R[t].ctNavElement = !0),
                R.callingNewSlide(t, -1, "carousel" === R[t].sliderType);
            }
            R[t].keydown_time_stamp = new Date().getTime();
          });
      },
      h = function (d) {
        (R[d].carousel.scrollTicker = R.carScrollTicker.bind(window, d)),
          (!0 !== R[d].navigation.mouseScrollNavigation &&
            "on" !== R[d].navigation.mouseScrollNavigation &&
            "carousel" !== R[d].navigation.mouseScrollNavigation) ||
            R[d].c[0].addEventListener(
              "wheel",
              function (e) {
                var t = (function (e) {
                    var t = 0;
                    return (
                      "deltaY" in e || "deltaX" in e
                        ? (t =
                            (0 != e.deltaY && -0 != e.deltaY) ||
                            !(e.deltaX < 0 || 0 < e.deltaX)
                              ? e.deltaY
                              : e.deltaX)
                        : ("detail" in e && (t = e.detail),
                          "wheelDelta" in e && (t = -e.wheelDelta / 120),
                          "wheelDeltaY" in e && (t = -e.wheelDeltaY / 120)),
                      (300 <
                        (t = navigator.userAgent.match(/mozilla/i)
                          ? 10 * t
                          : t) ||
                        t < -300) &&
                        (t /= 10),
                      t
                    );
                  })(e),
                  i = !1,
                  a = 0 == R[d].pr_active_key || 0 == R[d].pr_processing_key,
                  r =
                    R[d].pr_active_key == R[d].slideamount - 1 ||
                    R[d].pr_processing_key == R[d].slideamount - 1,
                  o = (
                    void 0 !== R[d].topc
                      ? R[d].topc
                      : 0 === R[d].canv.height
                      ? R[d].cpar
                      : R[d].c
                  )[0].getBoundingClientRect(),
                  s =
                    0 <= o.top && o.bottom <= R.winH
                      ? 1
                      : 0 <= o.top && o.bottom >= R.winH
                      ? (R.winH - Math.round(o.top)) / o.height
                      : o.top <= 0 && o.bottom <= R.winH
                      ? Math.round(o.bottom) / o.height
                      : 1,
                  t = t < 0 ? -1 : 1,
                  n = R[d].navigation.wheelViewPort;
                (s = Math.round(100 * s) / 100),
                  "reverse" == R[d].navigation.mouseScrollReverse &&
                    ((l = r), (r = a), (a = l));
                {
                  var l;
                  !(n - s <= R[d].navigation.threshold / 100) ||
                    n <= s ||
                    (0 <= o.top && -1 == t) ||
                    (o.top <= 0 && 1 == t) ||
                    (e.preventDefault(), R[d].mScrollTween) ||
                    ((l =
                      "window" !== R[d].navigation.target &&
                      R[d].navigation.target
                        ? R[d].navigation.target
                        : window),
                    (R[d].mScrollTween = tpGS.gsap.to(l, {
                      duration: jQuery.fn.revolution.isWebkit() ? 0.1 : 0.7,
                      scrollTo: { y: R[d].topc },
                      ease: "power2.out",
                      onComplete: function () {
                        R[d].mScrollTween.kill(), delete R[d].mScrollTween;
                      },
                    })));
                }
                if (Math.abs(s - n) < 0.1 || n <= s)
                  return (
                    (R[d].sc_indicator_dir =
                      ("reverse" === R[d].navigation.mouseScrollReverse &&
                        t < 0) ||
                      ("reverse" !== R[d].navigation.mouseScrollReverse &&
                        0 < t)
                        ? "reverse" !== R[d].navigation.mouseScrollReverse
                          ? 0
                          : 1
                        : "reverse" !== R[d].navigation.mouseScrollReverse
                        ? 1
                        : 0),
                    "carousel" == R[d].navigation.mouseScrollNavigation ||
                    (0 === R[d].sc_indicator_dir && !r) ||
                    (1 === R[d].sc_indicator_dir && !a)
                      ? void 0 === R[d].pr_processing_key &&
                        !0 !== R[d].justmouseScrolled &&
                        ((R[d].sc_indicator = "arrow"),
                        "carousel" === R[d].sliderType &&
                          (R[d].ctNavElement = !0),
                        R.callingNewSlide(
                          d,
                          0 === R[d].sc_indicator_dir
                            ? "reverse" === R[d].navigation.mouseScrollReverse
                              ? -1
                              : 1
                            : "reverse" === R[d].navigation.mouseScrollReverse
                            ? 1
                            : -1,
                          "carousel" === R[d].sliderType
                        ),
                        (R[d].justmouseScrolled = !0),
                        setTimeout(function () {
                          R[d].justmouseScrolled = !1;
                        }, R[d].navigation.wheelCallDelay))
                      : !0 !== R[d].justmouseScrolled && (i = !0),
                    !!i || (e.preventDefault(e), !1)
                  );
              },
              { passive: !1 }
            );
      },
      r = function (e, t) {
        for (; e && e !== document; e = e.parentNode)
          if (e.tagName === t) return e;
        return !1;
      },
      m = function (x) {
        var t,
          e,
          k = R[x].carousel,
          O = R.is_android();
        jQuery(".bullet, .bullets, .tp-bullets, .tparrows").addClass("noSwipe"),
          (R[x].navigation.touch =
            void 0 === R[x].navigation.touch ? {} : R[x].navigation.touch),
          (R[x].navigation.touch.swipe_direction =
            void 0 === R[x].navigation.touch.swipe_direction
              ? "horizontal"
              : R[x].navigation.touch.swipe_direction),
          R[x].cpar.find(".rs-nav-element").rsswipe({
            allowPageScroll: "vertical",
            triggerOnTouchLeave: !0,
            treshold: R[x].navigation.touch.swipe_treshold,
            fingers:
              5 < R[x].navigation.touch.swipe_min_touches
                ? 1
                : R[x].navigation.touch.swipe_min_touches,
            excludedElements:
              "button, input, select, textarea, .noSwipe, .rs-waction",
            tap: function (e, t) {
              var i;
              ((void 0 !==
                (i = void 0 !== t ? jQuery(t).closest("rs-thumb") : i) &&
                0 < i.length) ||
                0 < (i = jQuery(t).closest("rs-tab")).length ||
                0 < (i = jQuery(t).closest("rs-bullet")).length) &&
                i.trigger("click");
            },
            swipeStatus: function (e, t, i, a, r, o, s) {
              if ("start" !== t && "move" !== t && "end" !== t && "cancel" != t)
                return !0;
              var n = L("RS-THUMB", e),
                l = L("RS-TAB", e),
                d =
                  (!1 === n &&
                    !1 === l &&
                    !0 !==
                      (n =
                        "RS-THUMBS-WRAP" === e.target.tagName ||
                        "RS-THUMBS" === e.target.tagName ||
                        0 <= e.target.className.indexOf("tp-thumb-mask")) &&
                    "RS-TABS-WRAP" !== e.target.tagName &&
                    "RS-TABS" !== e.target.tagName &&
                    e.target.className.indexOf("tp-tab-mask"),
                  "start" === t
                    ? 0
                    : O
                    ? s[0].end.x - s[0].start.x
                    : e.pageX - k.screenX),
                c =
                  "start" === t
                    ? 0
                    : O
                    ? s[0].end.y - s[0].start.y
                    : e.pageY - k.screenY,
                p = n ? ".tp-thumbs" : ".tp-tabs",
                l = n ? ".tp-thumbs-inner-wrapper" : ".tp-tabs-inner-wrapper",
                g = n ? ".tp-thumb" : ".tp-tab",
                u = n ? R[x].navigation.thumbnails : R[x].navigation.tabs,
                h = R[x].cpar.find(n ? ".tp-thumb-mask" : ".tp-tab-mask"),
                m = h.find(l),
                v = u.direction,
                f = "vertical" === v ? m.height() : m.width(),
                y = "vertical" === v ? h.height() : h.width(),
                w =
                  "vertical" === v
                    ? h.find(g).first().outerHeight(!0) + parseFloat(u.space)
                    : h.find(g).first().outerWidth(!0) + parseFloat(u.space),
                b =
                  void 0 === m.data("offset")
                    ? 0
                    : parseInt(m.data("offset"), 0),
                _ = 0;
              switch (t) {
                case "start":
                  "vertical" === v && e.preventDefault(),
                    (k.screenX = O ? s[0].end.x : e.pageX),
                    (k.screenY = O ? s[0].end.y : e.pageY),
                    R[x].cpar.find(p).addClass("dragged"),
                    (b =
                      "vertical" === v ? m.position().top : m.position().left),
                    m.data("offset", b),
                    m.data("tmmove") && m.data("tmmove").pause(),
                    (R[x].someNavIsDragged = !0),
                    M(x);
                  break;
                case "move":
                  if (f <= y) return !1;
                  var _ =
                      0 < (_ = b + ("vertical" === v ? c : d))
                        ? "horizontal" === v
                          ? _ - m.width() * (((_ / m.width()) * _) / m.width())
                          : _ -
                            m.height() * (((_ / m.height()) * _) / m.height())
                        : _,
                    S =
                      "vertical" === v
                        ? 0 - (m.height() - h.height())
                        : 0 - (m.width() - h.width());
                  (_ =
                    _ < S
                      ? "horizontal" === v
                        ? _ +
                          (((m.width() * (_ - S)) / m.width()) * (_ - S)) /
                            m.width()
                        : _ +
                          (((m.height() * (_ - S)) / m.height()) * (_ - S)) /
                            m.height()
                      : _),
                    "vertical" === v
                      ? tpGS.gsap.set(m, { top: _ + "px" })
                      : tpGS.gsap.set(m, { left: _ + "px" }),
                    I(R[x].hideAllNavElementTimer);
                  break;
                case "end":
                case "cancel":
                  return (
                    R[x].navigation.draggable &&
                      R[x].navigation.draggable.enable &&
                      R[x].navigation.draggable.enable(),
                    k.draggable && k.draggable.enable && k.draggable.enable(),
                    (_ = b + ("vertical" === v ? c : d)),
                    (_ =
                      0 <
                      (_ =
                        "vertical" === v
                          ? _ < 0 - (m.height() - h.height())
                            ? 0 - (m.height() - h.height())
                            : _
                          : _ < 0 - (m.width() - h.width())
                          ? 0 - (m.width() - h.width())
                          : _)
                        ? 0
                        : _),
                    (_ =
                      Math.abs(a) > w / 10
                        ? a <= 0
                          ? Math.floor(_ / w) * w
                          : Math.ceil(_ / w) * w
                        : a < 0
                        ? Math.ceil(_ / w) * w
                        : Math.floor(_ / w) * w),
                    (_ =
                      0 <
                      (_ =
                        "vertical" === v
                          ? _ < 0 - (m.height() - h.height())
                            ? 0 - (m.height() - h.height())
                            : _
                          : _ < 0 - (m.width() - h.width())
                          ? 0 - (m.width() - h.width())
                          : _)
                        ? 0
                        : _),
                    "vertical" === v
                      ? tpGS.gsap.to(m, 0.5, {
                          top: _ + "px",
                          ease: "power3.out",
                        })
                      : tpGS.gsap.to(m, 0.5, {
                          left: _ + "px",
                          ease: "power3.out",
                        }),
                    (_ =
                      _ ||
                      ("vertical" === v
                        ? m.position().top
                        : m.position().left)),
                    m.data("offset", _),
                    m.data("distance", a),
                    R[x].cpar.find(p).removeClass("dragged"),
                    !(R[x].someNavIsDragged = !1)
                  );
              }
            },
          }),
          "carousel" === R[x].sliderType && R.setupCarousel(x),
          "carousel" !== R[x].sliderType &&
            ((R.ISM && R[x].navigation.touch.touchenabled) ||
              (!0 !== R.ISM && R[x].navigation.touch.touchOnDesktop)) &&
            ((R[x].navigation.proxy = document.createElement("div")),
            (t = R[x].navigation),
            (e = {
              trigger: R[x].c[0],
              type:
                "horizontal" === R[x].navigation.touch.swipe_direction
                  ? "x"
                  : "y",
              cursor: "pointer",
              lockAxis: !0,
              onPress: function (e) {
                R.closestClass(e.target, "rs-nav-element") &&
                  (R[x].navigation.draggable.endDrag(),
                  R[x].navigation.draggable.disable()),
                  (t.touch.pressX = e.pageX),
                  (t.touch.pressY = e.pageY);
              },
              onDragStart: function () {
                var e =
                  void 0 !== R[x].pr_processing_key
                    ? R[x].pr_processing_key
                    : void 0 === R[x].pr_active_key
                    ? 0
                    : R[x].pr_active_key;
                ("up" === this.getDirection() && e == R[x].slideamount - 1) ||
                ("down" === this.getDirection() && 0 === e)
                  ? (t.forceScroll = !0)
                  : (t.forceScroll = !1);
              },
              onDragEnd: function (e) {
                R[x].sc_indicator = "arrow";
                var t = this.getDirection(),
                  i = R[x].navigation;
                if (
                  Math.abs(e.pageY - i.touch.pressY) >
                  Math.abs(e.pageX - i.touch.pressX)
                ) {
                  if ("right" === t || "left" === t) return;
                } else if (
                  Math.abs(e.pageY - i.touch.pressY) >
                    Math.abs(e.pageX - i.touch.pressX) &&
                  ("up" === t || "down" === t)
                )
                  return;
                if (!i.forceScroll)
                  return ("horizontal" ==
                    R[x].navigation.touch.swipe_direction &&
                    "left" == t) ||
                    ("vertical" == R[x].navigation.touch.swipe_direction &&
                      "up" == t)
                    ? ((R[x].sc_indicator_dir = 0), R.callingNewSlide(x, 1), !1)
                    : ("horizontal" == R[x].navigation.touch.swipe_direction &&
                        "right" == t) ||
                      ("vertical" == R[x].navigation.touch.swipe_direction &&
                        "down" == t)
                    ? ((R[x].sc_indicator_dir = 1),
                      R.callingNewSlide(x, -1),
                      !1)
                    : void 0;
                (e =
                  "up" === this.getDirection()
                    ? R[x].cpar.offset().top + R[x].module.height
                    : R.document.scrollTop() -
                      (window.innerHeight -
                        R[x].cpar[0].getBoundingClientRect().top)),
                  R[x].modal.useAsModal ||
                    tpGS.gsap.to([window, "body"], { scrollTo: e });
              },
            }),
            t.touch.drag_block_vertical ||
              (R.ISM && (e.allowContextMenu = !0), (e.allowEventDefault = !0)),
            (R[x].navigation.draggable = tpGS.draggable.create(
              R[x].navigation.proxy,
              e
            ))),
          "carousel" === R[x].sliderType &&
            ((R.ISM && 0 == R[x].navigation.touch.mobileCarousel) ||
              (!0 !== R.ISM && !1 === R[x].navigation.touch.desktopCarousel)) &&
            k.wrap.addClass("noswipe"),
          R[x].navigation.touch.drag_block_vertical &&
            R[x].c.addClass("disableVerticalScroll");
      },
      v = function (e) {
        (e.hide_delay = R.isNumeric(parseInt(e.hide_delay, 0))
          ? e.hide_delay
          : 0.2),
          (e.hide_delay_mobile = R.isNumeric(parseInt(e.hide_delay_mobile, 0))
            ? e.hide_delay_mobile
            : 0.2);
      },
      f = function (e) {
        return e && e.enable;
      },
      I = function (e) {
        clearTimeout(e);
      },
      y = function (t) {
        var e,
          i = R[t].navigation.maintypes;
        for (e in i)
          i.hasOwnProperty(e) &&
            f(R[t].navigation[i[e]]) &&
            void 0 !== R[t].navigation[i[e]].c &&
            (I(R[t].navigation[i[e]].showCall),
            (R[t].navigation[i[e]].showCall = setTimeout(
              function (e) {
                I(e.hideCall),
                  (e.hide_onleave && !0 !== R[t].tpMouseOver) ||
                    (void 0 === e.tween ? (e.tween = a(e)) : e.tween.play());
              },
              R[t].navigation[i[e]].hide_onleave && !0 !== R[t].tpMouseOver
                ? 0
                : parseInt(R[t].navigation[i[e]].animDelay),
              R[t].navigation[i[e]]
            )));
      },
      M = function (e) {
        var t,
          i = R[e].navigation.maintypes;
        for (t in i)
          i.hasOwnProperty(t) &&
            void 0 !== R[e].navigation[i[t]] &&
            R[e].navigation[i[t]].hide_onleave &&
            f(R[e].navigation[i[t]]) &&
            I(R[e].navigation[i[t]].hideCall);
      },
      w = function (e, t) {
        var i,
          a = R[e].navigation.maintypes;
        for (i in a)
          a.hasOwnProperty(i) &&
            void 0 !== R[e].navigation[a[i]] &&
            R[e].navigation[a[i]].hide_onleave &&
            f(R[e].navigation[a[i]]) &&
            (I(R[e].navigation[a[i]].hideCall),
            (R[e].navigation[a[i]].hideCall = setTimeout(
              function (e) {
                I(e.showCall), e.tween && e.tween.reverse();
              },
              R.ISM
                ? parseInt(R[e].navigation[a[i]].hide_delay_mobile, 0)
                : parseInt(R[e].navigation[a[i]].hide_delay, 0),
              R[e].navigation[a[i]]
            )));
      },
      a = function (e) {
        (e.speed = void 0 === e.animSpeed ? 0.5 : e.animSpeed),
          (e.anims = []),
          void 0 !== e.anim && void 0 === e.left && e.anims.push(e.anim),
          void 0 !== e.left && e.anims.push(e.left.anim),
          void 0 !== e.right && e.anims.push(e.right.anim);
        var t,
          i = tpGS.gsap.timeline();
        for (t in (i.add(
          tpGS.gsap.to(e.c, e.speed, {
            delay: e.animDelay,
            opacity: 1,
            ease: "power3.inOut",
          }),
          0
        ),
        e.anims))
          if (e.anims.hasOwnProperty(t))
            switch (e.anims[t]) {
              case "left":
                i.add(
                  tpGS.gsap.fromTo(
                    e.c[t],
                    e.speed,
                    { marginLeft: -50 },
                    {
                      delay: e.animDelay,
                      marginLeft: "0px",
                      ease: "power3.inOut",
                    }
                  ),
                  0
                );
                break;
              case "right":
                i.add(
                  tpGS.gsap.fromTo(
                    e.c[t],
                    e.speed,
                    { marginLeft: 50 },
                    {
                      delay: e.animDelay,
                      marginLeft: "0px",
                      ease: "power3.inOut",
                    }
                  ),
                  0
                );
                break;
              case "top":
                i.add(
                  tpGS.gsap.fromTo(
                    e.c[t],
                    e.speed,
                    { marginTop: -50 },
                    {
                      delay: e.animDelay,
                      marginTop: "0px",
                      ease: "power3.inOut",
                    }
                  ),
                  0
                );
                break;
              case "bottom":
                i.add(
                  tpGS.gsap.fromTo(
                    e.c[t],
                    e.speed,
                    { marginTop: 50 },
                    {
                      delay: e.animDelay,
                      marginTop: "0px",
                      ease: "power3.inOut",
                    }
                  ),
                  0
                );
                break;
              case "zoomin":
                i.add(
                  tpGS.gsap.fromTo(
                    e.c[t],
                    e.speed,
                    { scale: 0.5 },
                    { delay: e.animDelay, scale: 1, ease: "power3.inOut" }
                  ),
                  0
                );
                break;
              case "zoomout":
                i.add(
                  tpGS.gsap.fromTo(
                    e.c[t],
                    e.speed,
                    { scale: 1.2 },
                    { delay: e.animDelay, scale: 1, ease: "power3.inOut" }
                  ),
                  0
                );
            }
        return i.play(), i;
      },
      b = function (e, t) {
        (e.style = void 0 === e.style ? "" : e.style),
          (e.left.style = void 0 === e.left.style ? "" : e.left.style),
          (e.right.style = void 0 === e.right.style ? "" : e.right.style),
          void 0 === e.left.c &&
            ((e.left.c = jQuery(
              '<rs-arrow style="opacity:0" class="tp-leftarrow tparrows ' +
                e.style +
                " " +
                e.left.style +
                '">' +
                e.tmp +
                "</rs-arrow>"
            )),
            R[t].c.append(e.left.c)),
          void 0 === e.right.c &&
            ((e.right.c = jQuery(
              '<rs-arrow style="opacity:0"  class="tp-rightarrow tparrows ' +
                e.style +
                " " +
                e.right.style +
                '">' +
                e.tmp +
                "</rs-arrow>"
            )),
            R[t].c.append(e.right.c)),
          e[e.rtl ? "left" : "right"].c.on("click", function () {
            "carousel" === R[t].sliderType && (R[t].ctNavElement = !0),
              (R[t].sc_indicator = "arrow"),
              (R[t].sc_indicator_dir = 0),
              R[t].c.revnext();
          }),
          e[e.rtl ? "right" : "left"].c.on("click", function () {
            "carousel" === R[t].sliderType && (R[t].ctNavElement = !0),
              (R[t].sc_indicator = "arrow"),
              (R[t].sc_indicator_dir = 1),
              R[t].c.revprev();
          }),
          (e.padding_top = parseInt(R[t].carousel.padding_top || 0, 0)),
          (e.padding_bottom = parseInt(R[t].carousel.padding_bottom || 0, 0)),
          _(e.left, t),
          _(e.right, t),
          ("outer-left" != e.position && "outer-right" != e.position) ||
            (R[t].outernav = !0);
      },
      _ = function (e, t) {
        var i, a, r, o, s;
        null == e ||
          void 0 === e.c ||
          ((i = (
            "fullwidth" == R[t].sliderLayout ||
            "fullscreen" == R[t].sliderLayout
              ? R[t].module
              : R[t].canv
          ).width),
          (r = e.c.outerWidth()),
          (a = e.c.outerHeight()),
          r <= 0) ||
          a <= 0 ||
          (n(e.c, e, t, a),
          l(e.c, e, t, r),
          "outer-left" === e.position
            ? tpGS.gsap.set(e.c, { left: 0 - r + "px", x: e.h_offset + "px" })
            : "outer-right" === e.position &&
              tpGS.gsap.set(e.c, { right: 0 - r + "px", x: e.h_offset + "px" }),
          "tp-thumb" !== e.type && "tp-tab" !== e.type) ||
          ((a = parseInt(e.padding_top || 0, 0)),
          (r = parseInt(e.padding_bottom || 0, 0)),
          (o = {}),
          (s = {}),
          e.maxw > i &&
          "outer-left" !== e.position &&
          "outer-right" !== e.position
            ? ((o.left = "0px"),
              (o.x = 0),
              (o.maxWidth = i - 2 * e.wpad + "px"),
              (s.maxWidth = i - 2 * e.wpad + "px"))
            : ((o.maxWidth = e.maxw), (s.maxWidth = i + "px")),
          e.maxh + 2 * e.wpad > R[t].conh &&
          "outer-bottom" !== e.position &&
          "outer-top" !== e.position
            ? ((o.top = "0px"),
              (o.y = 0),
              (o.maxHeight = a + r + (R[t].conh - 2 * e.wpad) + "px"),
              (s.maxHeight = a + r + (R[t].conh - 2 * e.wpad) + "px"))
            : ((o.maxHeight = e.maxh + "px"), (s.maxHeight = e.maxh + "px")),
          (e.mask = void 0 === e.mask ? e.c.find("rs-navmask") : e.mask),
          (0 < e.mhoff || 0 < e.mvoff) &&
            (s.padding = e.mvoff + "px " + e.mhoff + "px"),
          e.span
            ? ("layergrid" == e.container &&
                "outer-left" !== e.position &&
                "outer-right" !== e.position &&
                (a = r = 0),
              "vertical" === e.direction
                ? ((o.maxHeight = a + r + (R[t].conh - 2 * e.wpad) + "px"),
                  (o.height = a + r + (R[t].conh - 2 * e.wpad) + "px"),
                  (o.top = 0),
                  (o.y = 0),
                  (s.maxHeight =
                    a + r + Math.min(e.maxh, R[t].conh - 2 * e.wpad) + "px"),
                  tpGS.gsap.set(e.c, o),
                  tpGS.gsap.set(e.mask, s),
                  n(e.mask, e, t))
                : "horizontal" === e.direction &&
                  ((o.maxWidth = "100%"),
                  (o.width = i - 2 * e.wpad + "px"),
                  (o.left = 0),
                  (o.x = 0),
                  (s.maxWidth =
                    e.maxw >= i ? "100%" : Math.min(e.maxw, i) + "px"),
                  tpGS.gsap.set(e.c, o),
                  tpGS.gsap.set(e.mask, s),
                  l(e.mask, e, t)))
            : (tpGS.gsap.set(e.c, o), tpGS.gsap.set(e.mask, s)));
      },
      S = function (e, t, i, a) {
        0 === e.find(".tp-bullets").length &&
          ((t.style = void 0 === t.style ? "" : t.style),
          (t.c = jQuery(
            '<rs-bullets style="opacity:0"  class="tp-bullets ' +
              t.style +
              " " +
              t.direction +
              " nav-pos-hor-" +
              t.h_align +
              " nav-pos-ver-" +
              t.v_align +
              " nav-dir-" +
              t.direction +
              '"></rs-bullets>'
          )));
        var r = i.data("key"),
          o = t.tmp,
          s =
            (void 0 !== R[a].thumbs[i.index()] &&
              jQuery.each(R[a].thumbs[i.index()].params, function (e, t) {
                o = o.replace(t.from, t.to);
              }),
            jQuery(
              '<rs-bullet data-key="' +
                r +
                '" class="tp-bullet">' +
                o +
                "</rs-bullet>"
            )),
          i =
            (void 0 !== R[a].thumbs[i.index()] &&
              s.find(".tp-bullet-image").css({
                backgroundImage: "url(" + R[a].thumbs[i.index()].src + ")",
              }),
            t.c.append(s),
            e.append(t.c),
            t.c.find(".tp-bullet").length),
          n = s.outerWidth(),
          l = s.outerHeight(),
          d = n + parseInt(void 0 === t.space ? 0 : t.space, 0),
          c = l + parseInt(void 0 === t.space ? 0 : t.space, 0);
        "vertical" === t.direction
          ? (s.css({ top: (i - 1) * c + "px", left: "0px" }),
            t.c.css({ height: (i - 1) * c + l, width: n }))
          : (s.css({ left: (i - 1) * d + "px", top: "0px" }),
            t.c.css({ width: (i - 1) * d + n, height: l })),
          s.on("click", function () {
            "carousel" === R[a].sliderType && (R[a].ctNavElement = !0),
              (R[a].sc_indicator = "bullet"),
              e.revcallslidewithid(r),
              e.find(".tp-bullet").removeClass("selected"),
              jQuery(this).addClass("selected");
          }),
          (t.padding_top = parseInt(R[a].carousel.padding_top || 0, 0)),
          (t.padding_bottom = parseInt(R[a].carousel.padding_bottom || 0, 0)),
          ("outer-left" != t.position && "outer-right" != t.position) ||
            (R[a].outernav = !0);
      },
      x = function (t, e, i, a, r) {
        var o = "tp-thumb" === a ? ".tp-thumbs" : ".tp-tabs",
          s = "tp-thumb" === a ? ".tp-thumb-mask" : ".tp-tab-mask",
          n =
            "tp-thumb" === a
              ? ".tp-thumbs-inner-wrapper"
              : ".tp-tabs-inner-wrapper",
          l = "tp-thumb" === a ? ".tp-thumb" : ".tp-tab",
          d = "tp-thumb" === a ? ".tp-thumb-image" : ".tp-tab-image",
          c = "tp-thumb" === a ? "rs-thumb" : "rs-tab",
          p =
            ((e.type = a),
            (e.visibleAmount =
              e.visibleAmount > R[r].slideamount
                ? R[r].slideamount
                : e.visibleAmount),
            (e.sliderLayout = R[r].sliderLayout),
            void 0 === e.c &&
              ((e.wpad = e.wrapper_padding),
              (e.c = jQuery(
                "<" +
                  c +
                  's style="opacity:0" class="nav-dir-' +
                  e.direction +
                  " nav-pos-ver-" +
                  e.v_align +
                  " nav-pos-hor-" +
                  e.h_align +
                  " rs-nav-element " +
                  a +
                  "s " +
                  (!0 === e.span ? "tp-span-wrapper" : "") +
                  " " +
                  e.position +
                  " " +
                  (void 0 === e.style ? "" : e.style) +
                  '"><rs-navmask class="' +
                  a +
                  '-mask" style="overflow:hidden;position:relative"><' +
                  c +
                  's-wrap class="' +
                  a +
                  's-inner-wrapper" style="position:relative;"></' +
                  c +
                  "s-wrap></rs-navmask></" +
                  c +
                  "s>"
              )),
              e.c.css({
                overflow: "visible",
                position:
                  "outer-top" === e.position || "outer-bottom" === e.position
                    ? "relative"
                    : "absolute",
                background: e.wrapper_color,
                padding: e.wpad + "px",
                boxSizing: "contet-box",
              }),
              "outer-top" === e.position
                ? t.parent().prepend(e.c)
                : "outer-bottom" === e.position
                ? t.after(e.c)
                : t.append(e.c),
              ("outer-left" !== e.position && "outer-right" !== e.position) ||
                tpGS.gsap.set(R[r].c, { overflow: "visible" }),
              (e.padding_top = parseInt(R[r].carousel.padding_top || 0, 0)),
              (e.padding_bottom = parseInt(
                R[r].carousel.padding_bottom || 0,
                0
              )),
              ("outer-left" != e.position && "outer-right" != e.position) ||
                (R[r].outernav = !0)),
            i.data("key")),
          s = e.c.find(s),
          g = s.find(n),
          u = e.tmp,
          a =
            ((e.space = parseFloat(e.space) || 0),
            (e.maxw =
              "horizontal" === e.direction
                ? e.width * e.visibleAmount + e.space * (e.visibleAmount - 1)
                : e.width),
            (e.maxh =
              "horizontal" === e.direction
                ? e.height
                : e.height * e.visibleAmount + e.space * (e.visibleAmount - 1)),
            (e.maxw += 2 * e.mhoff),
            (e.maxh += 2 * e.mvoff),
            void 0 !== R[r].thumbs[i.index()] &&
              jQuery.each(R[r].thumbs[i.index()].params, function (e, t) {
                u = u.replace(t.from, t.to);
              }),
            jQuery(
              "<" +
                c +
                ' data-liindex="' +
                i.index() +
                '" data-key="' +
                p +
                '" class="' +
                a +
                '" style="width:' +
                e.width +
                "px;height:" +
                e.height +
                'px;">' +
                u +
                "<" +
                c +
                ">"
            )),
          c =
            (void 0 !== R[r].thumbs[i.index()] &&
              a.find(d).css({
                backgroundImage: "url(" + R[r].thumbs[i.index()].src + ")",
              }),
            g.append(a),
            e.c.find(l).length),
          d = a.outerWidth(),
          i = a.outerHeight(),
          l = d + parseInt(void 0 === e.space ? 0 : e.space, 0),
          h = i + parseInt(void 0 === e.space ? 0 : e.space, 0);
        "vertical" === e.direction
          ? (a.css({ top: (c - 1) * h + "px", left: "0px" }),
            g.css({ height: (c - 1) * h + i, width: d }))
          : (a.css({ left: (c - 1) * l + "px", top: "0px" }),
            g.css({ width: (c - 1) * l + d, height: i })),
          s.css({ maxWidth: e.maxw + "px", maxHeight: e.maxh + "px" }),
          e.c.css({ maxWidth: e.maxw + "px", maxHeight: e.maxh + "px" }),
          a.on("click", function () {
            (R[r].sc_indicator = "bullet"),
              "carousel" === R[r].sliderType && (R[r].ctNavElement = !0);
            var e =
              void 0 === (e = t.parent().find(n).data("distance")) ? 0 : e;
            Math.abs(e) < 10 &&
              (t.revcallslidewithid(p),
              t.parent().find(o).removeClass("selected"),
              jQuery(this).addClass("selected"));
          });
      },
      i = function (e, t, i) {
        return (
          null != e &&
            void 0 !== e.c &&
            (e.hide_under > R[t].canv.width || R[t].canv.width > e.hide_over
              ? (!0 !== e.tpForceNotVisible &&
                  (e.c.addClass("tp-forcenotvisible"),
                  (i = !(e.isVisible = !1))),
                (e.tpForceNotVisible = !0))
              : (!1 !== e.tpForceNotVisible &&
                  (e.c.removeClass("tp-forcenotvisible"),
                  (i = e.isVisible = !0)),
                (e.tpForceNotVisible = !1))),
          i
        );
      };
    (window.RS_MODULES = window.RS_MODULES || {}),
      (window.RS_MODULES.navigation = { loaded: !0, version: "6.6.0" }),
      window.RS_MODULES.checkMinimal && window.RS_MODULES.checkMinimal();
  })(jQuery),
  !(function () {
    "use strict";
    window._R_is_Editor
      ? (RVS._R = void 0 === RVS._R ? {} : RVS._R)
      : (window._R_is_Editor = !1),
      (jQuery.fn.revolution = jQuery.fn.revolution || {});
    var p = _R_is_Editor ? RVS._R : jQuery.fn.revolution;
    jQuery.extend(!0, p, {
      bgW: function (e, t) {
        return _R_is_Editor
          ? RVS.RMD.width
          : "carousel" === p[e].sliderType
          ? p[e].justifyCarousel
            ? p[e].carousel.slide_widths[
                void 0 !== t ? t : p[e].carousel.focused
              ]
            : p[e].carousel.slide_width
          : p[e].module.width;
      },
      bgH: function (e, t) {
        return _R_is_Editor
          ? RVS.RMD.height
          : "carousel" === p[e].sliderType
          ? p[e].carousel.slide_height
          : p[e].module.height;
      },
      getPZSides: function (e, t, i, a, r, o, s) {
        (e *= i),
          (t *= i),
          (i = Math.abs(a - e)),
          (a = Math.abs(r - t)),
          (r = new Object());
        return (
          (r.l = (0 - o) * i),
          (r.r = r.l + e),
          (r.t = (0 - s) * a),
          (r.b = r.t + t),
          (r.h = o),
          (r.v = s),
          r
        );
      },
      getPZCorners: function (e, t, i, a) {
        var e = e.bgposition.split(" ") || "center center",
          r =
            "center" == e[0]
              ? "50%"
              : "left" == e[0] || "left" == e[1]
              ? "0%"
              : "right" == e[0] || "right" == e[1]
              ? "100%"
              : e[0],
          e =
            "center" == e[1]
              ? "50%"
              : "top" == e[0] || "top" == e[1]
              ? "0%"
              : "bottom" == e[0] || "bottom" == e[1]
              ? "100%"
              : e[1],
          r = parseInt(r, 0) / 100 || 0,
          e = parseInt(e, 0) / 100 || 0,
          o = new Object();
        return (
          (o.start = p.getPZSides(
            a.start.width,
            a.start.height,
            a.start.scale,
            t,
            i,
            r,
            e
          )),
          (o.end = p.getPZSides(
            a.start.width,
            a.start.height,
            a.end.scale,
            t,
            i,
            r,
            e
          )),
          o
        );
      },
      getPZValues: function (e) {
        var t,
          i = e.panzoom.split(";"),
          a = {
            duration: 10,
            ease: "none",
            scalestart: 1,
            scaleend: 1,
            rotatestart: 0.01,
            rotateend: 0,
            blurstart: 0,
            blurend: 0,
            offsetstart: "0/0",
            offsetend: "0/0",
          };
        for (t in i)
          if (i.hasOwnProperty(t)) {
            var r = i[t].split(":"),
              o = r[0],
              s = r[1];
            switch (o) {
              case "d":
                a.duration = parseInt(s, 0) / 1e3;
                break;
              case "e":
                a.ease = s;
                break;
              case "ss":
                a.scalestart = parseInt(s, 0) / 100;
                break;
              case "se":
                a.scaleend = parseInt(s, 0) / 100;
                break;
              case "rs":
                a.rotatestart = parseInt(s, 0);
                break;
              case "re":
                a.rotateend = parseInt(s, 0);
                break;
              case "bs":
                a.blurstart = parseInt(s, 0);
                break;
              case "be":
                a.blurend = parseInt(s, 0);
                break;
              case "os":
                a.offsetstart = s;
                break;
              case "oe":
                a.offsetend = s;
            }
          }
        return (
          (a.offsetstart = a.offsetstart.split("/") || [0, 0]),
          (a.offsetend = a.offsetend.split("/") || [0, 0]),
          (a.rotatestart = 0 === a.rotatestart ? 0.01 : a.rotatestart),
          (e.panvalues = a),
          (e.bgposition =
            "center center" == e.bgposition ? "50% 50%" : e.bgposition),
          a
        );
      },
      pzCalcL: function (e, t, i) {
        var a,
          r,
          o,
          s =
            void 0 === i.panvalues
              ? jQuery.extend(!0, {}, p.getPZValues(i))
              : jQuery.extend(!0, {}, i.panvalues),
          n = s.offsetstart,
          l = s.offsetend,
          d = {
            start: {
              width: e,
              height: _R_is_Editor
                ? (e / i.loadobj.width) * i.loadobj.height
                : (e / i.owidth) * i.oheight,
              rotation: (Math.PI / 180) * s.rotatestart,
              rotationV: s.rotatestart,
              scale: s.scalestart,
              transformOrigin: "0% 0%",
            },
            end: {
              rotation: (Math.PI / 180) * s.rotateend,
              rotationV: s.rotateend,
              scale: s.scaleend,
            },
          };
        s.scalestart, i.owidth, i.oheight, s.scaleend, i.owidth, i.oheight;
        return (
          d.start.height < t &&
            ((o = t / d.start.height),
            (d.start.height = t),
            (d.start.width = d.start.width * o)),
          0.01 === s.rotatestart &&
            0 === s.rotateend &&
            (delete d.start.rotation, delete d.end.rotation),
          (o = p.getPZCorners(i, e, t, d)),
          (n[0] = parseFloat(n[0]) + o.start.l),
          (l[0] = parseFloat(l[0]) + o.end.l),
          (n[1] = parseFloat(n[1]) + o.start.t),
          (l[1] = parseFloat(l[1]) + o.end.t),
          (i = o.start.r - o.start.l),
          (a = o.start.b - o.start.t),
          (r = o.end.r - o.end.l),
          (o = o.end.b - o.end.t),
          (n[0] = 0 < n[0] ? 0 : i + n[0] < e ? e - i : n[0]),
          (l[0] = 0 < l[0] ? 0 : r + l[0] < e ? e - r : l[0]),
          (n[1] = 0 < n[1] ? 0 : a + n[1] < t ? t - a : n[1]),
          (l[1] = 0 < l[1] ? 0 : o + l[1] < t ? t - o : l[1]),
          (d.start.x = n[0]),
          (d.start.y = n[1]),
          (d.end.x = l[0]),
          (d.end.y = l[1]),
          (d.end.ease = s.ease),
          d
        );
      },
      pzDrawShadow: function (e, t, i) {
        ("animating" !== t.currentState &&
          null != t.panFake &&
          !t.pzLastFrame) ||
          ((t.pzLastFrame = !1),
          t.shadowCTX.clearRect(
            0,
            0,
            t.shadowCanvas.width,
            t.shadowCanvas.height
          ),
          t.shadowCTX.save(),
          void 0 !== i.rotation
            ? t.shadowCTX.transform(
                Math.cos(i.rotation) * i.scale,
                Math.sin(i.rotation) * i.scale,
                Math.sin(i.rotation) * -i.scale,
                Math.cos(i.rotation) * i.scale,
                i.x,
                i.y
              )
            : t.shadowCTX.transform(i.scale, 0, 0, i.scale, i.x, i.y),
          t.shadowCTX.drawImage(t.loadobj.img, 0, 0, i.width, i.height),
          t.shadowCTX.restore()),
          "animating" !== t.currentState
            ? null != t.panFake
              ? (t.panFake.visible ||
                  ((t.panFake.visible = !0),
                  (t.panFake.img.style.opacity = 1),
                  (t.canvas.style.opacity = 0)),
                tpGS.gsap.set(t.panFake.img, {
                  width: i.width,
                  height: i.height,
                  force3D: !0,
                  x: i.x,
                  y: i.y,
                  transformOrigin: "0% 0%",
                  rotationZ: i.rotationV + "deg",
                  scale: i.scale,
                }),
                void 0 !== i.blur &&
                  (t.panFake.img.style.filter =
                    0 === i.blur ? "none" : "blur(" + i.blur + "px)"))
              : (p.updateSlideBGs(e, i.slidekey, t, !0),
                void 0 !== i.blur &&
                  (t.canvas.style.filter =
                    0 === i.blur ? "none" : "blur(" + i.blur + "px)"))
            : (void 0 !== t.panFake &&
                !1 !== t.panFake.visible &&
                ((t.panFake.visible = !1),
                (t.panFake.img.style.opacity = 0),
                (t.canvas.style.opacity = 1),
                (t.panFake.img.style.filter = "none")),
              void 0 !== i.blur && t.canvasFilter
                ? (t.canvasFilterBlur = i.blur)
                : (t.canvas.style.filter =
                    0 === i.blur ? "none" : "blur(" + i.blur + "px)"));
      },
      startPanZoom: function (e, t, i, a, r, o) {
        var s,
          n,
          l,
          d,
          c = _R_is_Editor ? e : e.data();
        void 0 !== c.panzoom &&
          null !== c.panzoom &&
          ((s = _R_is_Editor ? c : p[t].sbgs[o]),
          _R_is_Editor ||
            "carousel" !== p[t].sliderType ||
            (p[t].carousel.justify &&
              void 0 === p[t].carousel.slide_widths &&
              p.setCarouselDefaults(t, !0),
            p[t].carousel.justify) ||
            (void 0 === p[t].carousel.slide_width &&
              (p[t].carousel.slide_width =
                !0 !== p[t].carousel.stretch
                  ? p[t].gridwidth[p[t].level] *
                    (0 === p[t].CM.w ? 1 : p[t].CM.w)
                  : p[t].canv.width),
            void 0 === p[t].carousel.slide_height &&
              (p[t].carousel.slide_height =
                !0 !== p[t].carousel.stretch
                  ? p[t].gridheight[p[t].level] *
                    (0 === p[t].CM.w ? 1 : p[t].CM.w)
                  : p[t].canv.height)),
          (n = p.getmDim(t, a, s)),
          (l = p.pzCalcL(n.width, n.height, c)),
          (s.pzAnim = l),
          _R_is_Editor ||
            ((p[t].panzoomTLs =
              void 0 === p[t].panzoomTLs ? {} : p[t].panzoomTLs),
            (p[t].panzoomBGs =
              void 0 === p[t].panzoomBGs ? {} : p[t].panzoomBGs),
            void 0 === p[t].panzoomBGs[a] && (p[t].panzoomBGs[a] = e),
            (d = p[t].panzoomTLs[a])),
          (i = i || 0),
          void 0 !== d && (d.pause(), d.kill(), (d = void 0)),
          (d = tpGS.gsap.timeline({ paused: !0 })),
          (c.panvalues.duration =
            NaN === c.panvalues.duration || void 0 === c.panvalues.duration
              ? 10
              : c.panvalues.duration),
          _R_is_Editor ||
            void 0 === c ||
            void 0 === s ||
            (s.panvalues = c.panvalues),
          void 0 !== s) &&
          (void 0 === s.shadowCanvas &&
            ((s.shadowCanvas = document.createElement("canvas")),
            (s.shadowCTX = s.shadowCanvas.getContext("2d")),
            (s.shadowCanvas.style.background = "transparent"),
            (s.shadowCanvas.style.opacity = 1)),
          s.shadowCanvas.width !== n.width && (s.shadowCanvas.width = n.width),
          s.shadowCanvas.height !== n.height &&
            (s.shadowCanvas.height = n.height),
          (l.slideindex = a),
          (l.slidekey = _R_is_Editor ? void 0 : o),
          (l.start.slidekey = l.slidekey),
          p.pzDrawShadow(t, s, l.start),
          (l.end.onUpdate = function () {
            p.pzDrawShadow(t, s, l.start);
          }),
          (s.panStart = jQuery.extend(!0, {}, l.start)),
          void 0 === c.panvalues.blurstart ||
            void 0 === c.panvalues.blurend ||
            (0 === c.panvalues.blurstart && 0 === c.panvalues.blurend) ||
            ((l.start.blur = c.panvalues.blurstart),
            (l.end.blur = c.panvalues.blurend)),
          ((!_R_is_Editor && void 0 === l.start.blur && !p.isFF) ||
            (window.isSafari11 && p.ISM)) &&
            ((s.panFake =
              void 0 === s.panFake
                ? { img: s.loadobj.img.cloneNode(!0) }
                : s.panFake),
            void 0 !== s.panFake) &&
            (!0 !== s.panFake.appended &&
              ((s.panFake.appended = !0),
              s.sbg.appendChild(s.panFake.img),
              (s.panFake.img.style.position = "absolute"),
              (s.panFake.img.style.display = "block"),
              (s.panFake.img.style.zIndex = 0),
              (s.panFake.img.style.opacity = 0),
              (s.panFake.img.style.top = "0px"),
              (s.panFake.img.style.left = "0px")),
            (s.panFake.img.width = l.start.width),
            (s.panFake.img.height = l.start.height)),
          d.add(tpGS.gsap.to(l.start, c.panvalues.duration, l.end), 0),
          d.progress(i),
          ("play" !== r && "first" !== r) || d.play(),
          _R_is_Editor
            ? (RVS.TL[RVS.S.slideId].panzoom = d)
            : (p[t].panzoomTLs[a] = d));
      },
    }),
      (window.RS_MODULES = window.RS_MODULES || {}),
      (window.RS_MODULES.panzoom = { loaded: !0, version: "6.6.0" }),
      window.RS_MODULES.checkMinimal && window.RS_MODULES.checkMinimal();
  })(jQuery),
  !(function (t) {
    "use strict";
    jQuery.fn.revolution = jQuery.fn.revolution || {};
    var k = jQuery.fn.revolution,
      l =
        (jQuery.extend(!0, k, {
          checkForParallax: function (a) {
            var r = k[a].parallax;
            if (!r.done) {
              if (((r.done = !0), k.ISM && r.disable_onmobile)) return !1;
              if ("3D" == r.type || "3d" == r.type) {
                for (e in (k.addSafariFix(a),
                tpGS.gsap.set(k[a].c, { overflow: r.ddd_overflow }),
                tpGS.gsap.set(k[a].canvas, { overflow: r.ddd_overflow }),
                ("carousel" != k[a].sliderType ||
                  ("carousel" == k[a].sliderType &&
                    "mousedrag" == k[a].parallax.type)) &&
                  r.ddd_shadow &&
                  ((n = jQuery('<div class="dddwrappershadow"></div>')),
                  tpGS.gsap.set(n, {
                    force3D: "auto",
                    transformPerspective: 1600,
                    transformOrigin: "50% 50%",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 0,
                  }),
                  k[a].c.prepend(n)),
                k[a].slides))
                  k[a].slides.hasOwnProperty(e) && l(jQuery(k[a].slides[e]), a);
                0 < k[a].c.find("rs-static-layers").length &&
                  (tpGS.gsap.set(k[a].c.find("rs-static-layers"), {
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }),
                  l(k[a].c.find("rs-static-layers"), a));
              }
              (r.pcontainers = {}),
                (r.bgcontainers = []),
                (r.bgcontainer_depths = []),
                (r.speed = void 0 === r.speed ? 0 : parseInt(r.speed, 0)),
                (r.speedbg = void 0 === r.speedbg ? 0 : parseInt(r.speedbg, 0)),
                (r.speedls = void 0 === r.speedls ? 0 : parseInt(r.speedls, 0)),
                k[a].c
                  .find("rs-slide rs-sbg-wrap, rs-slide rs-bgvideo")
                  .each(function () {
                    var e = jQuery(this),
                      t = e.data("parallax");
                    window.isSafari11 || (k[a].parZ = 1),
                      void 0 !== (t = "on" == t || !0 === t ? 1 : t) &&
                        "off" !== t &&
                        !1 !== t &&
                        (r.bgcontainers.push(e.closest("rs-sbg-px")),
                        r.bgcontainer_depths.push(
                          k[a].parallax.levels[parseInt(t, 0) - 1] / 100
                        ));
                  });
              for (var e = 1; e <= r.levels.length; e++) {
                for (var t in k[a].slides)
                  k[a].slides.hasOwnProperty(t) &&
                    ((i = (o = k[a].slides[t]).dataset.key),
                    void 0 === r.pcontainers[i] && (r.pcontainers[i] = {}),
                    d(e, r, o, r.pcontainers[i]));
                var i = "static";
                void 0 === r.pcontainers[i] && (r.pcontainers[i] = {}),
                  d(e, r, k[a].slayers[0], r.pcontainers[i]),
                  JSON.stringify(r.pcontainers[i]) == JSON.stringify({}) &&
                    delete r.pcontainers[i];
              }
              if (
                "mouse" == r.type ||
                "mousedrag" == r.type ||
                "mousescroll" == r.type ||
                "3D" == r.type ||
                "3d" == r.type
              ) {
                var o,
                  s =
                    "rs-slide .dddwrapper, .dddwrappershadow, rs-slide .dddwrapper-layer, rs-static-layers .dddwrapper-layer";
                for (t in ("carousel" === k[a].sliderType &&
                  (s =
                    "rs-slide .dddwrapper, rs-slide .dddwrapper-layer, rs-static-layers .dddwrapper-layer"),
                (r.sctors = {}),
                k[a].slides))
                  k[a].slides.hasOwnProperty(t) &&
                    ((i = (o = k[a].slides[t]).dataset.key),
                    (r.sctors[i] = o.querySelectorAll(s)));
                k[a].slayers[0] &&
                  (r.sctors.static = k[a].slayers[0].querySelectorAll(s)),
                  (r.mouseEntered = !1),
                  k[a].c.on("mouseenter", function (e) {
                    var t = k[a].c.offset().top,
                      i = k[a].c.offset().left;
                    (r.mouseEnterX = e.pageX - i),
                      (r.mouseEnterY = e.pageY - t),
                      (r.mouseEntered = !0);
                  }),
                  (r.parallaxHandler = this.updateParallax.bind(this, a, r)),
                  (r.hasAlreadyPermission = !1),
                  "mousedrag" != r.type &&
                    k[a].c.on(
                      "mousemove.hoverdir, mouseleave.hoverdir, trigger3dpath",
                      function (e) {
                        (r.eventData = e),
                          (void 0 !== r.frame && "mouseleave" !== e.type) ||
                            (r.frame = window.requestAnimationFrame(
                              r.parallaxHandler
                            ));
                      }
                    ),
                  k.ISM &&
                    ((k.modulesNeedOrientationListener =
                      null == k.modulesNeedOrientationListener
                        ? {}
                        : k.modulesNeedOrientationListener),
                    (k.modulesNeedOrientationListener[a] = !0),
                    k.addDeviceOrientationListener(a));
              }
              var n = k[a].scrolleffect;
              n.set &&
                ((n.multiplicator_layers = parseFloat(n.multiplicator_layers)),
                (n.multiplicator = parseFloat(n.multiplicator))),
                void 0 !== n._L && 0 === n._L.length && (n._L = !1),
                void 0 !== n.bgs && 0 === n.bgs.length && (n.bgs = !1);
            }
          },
          removeIOSPermissionWait: function () {
            document.querySelectorAll(".iospermaccwait").forEach(function (e) {
              e.classList.add("permanenthidden");
            });
          },
          addDeviceOrientationListener: function (t) {
            var i = k[t].parallax;
            window.addEventListener("deviceorientation", function (e) {
              k.modulesNeedOrientationListener[t] &&
                ((k.modulesNeedOrientationListener[t] = !1),
                k.removeIOSPermissionWait()),
                (i.eventData = e),
                void 0 === i.frame &&
                  (i.frame = window.requestAnimationFrame(i.parallaxHandler));
            });
          },
          getAccelerationPermission: function (e) {
            DeviceMotionEvent.requestPermission().then(function (e) {
              if ("granted" == e)
                for (var t in k.modulesNeedOrientationListener)
                  k.modulesNeedOrientationListener.hasOwnProperty(t) &&
                    ((k.modulesNeedOrientationListener[t] = !1),
                    k.removeIOSPermissionWait(),
                    k.addDeviceOrientationListener(t));
            });
          },
          getLayerParallaxOffset: function (e, t, i) {
            return void 0 !== k[e].parallax &&
              void 0 !== k[e].parallax.pcontainers &&
              void 0 !== k[e].parallax.pcontainers[k[e]._L[t].slidekey] &&
              void 0 !== k[e].parallax.pcontainers[k[e]._L[t].slidekey][t]
              ? Math.abs(
                  k[e].parallax.pcontainers[k[e]._L[t].slidekey][t]["offs" + i]
                )
              : 0;
          },
          updateParallax: function (e, t) {
            t.frame && (t.frame = window.cancelAnimationFrame(t.frame));
            var i,
              a,
              r,
              o,
              s,
              n,
              l,
              d,
              c,
              p,
              g = t.eventData,
              u = k[e].c.offset().left,
              h = k[e].c.offset().top,
              m = k[e].canv.width,
              v = k[e].canv.height,
              f = t.speed / 1e3 || 3;
            if (
              ("mousedrag" == t.type
                ? ((a = -20 * k[e].carousel.delta),
                  (i = -20 * k[e].carousel.delta),
                  k[e].carousel.fromWheel
                    ? "v" === k[e].carousel.orientation
                      ? (i = 0)
                      : (a = 0)
                    : "v" === k[e].carousel.orientation
                    ? (i = k[e].carousel.cX - k[e].carousel.lerpX)
                    : (a = k[e].carousel.cY - k[e].carousel.lerpY))
                : "enterpoint" == t.origo && "deviceorientation" !== g.type
                ? (!1 === t.mouseEntered &&
                    ((t.mouseEnterX = g.pageX - u),
                    (t.mouseEnterY = g.pageY - h),
                    (t.mouseEntered = !0)),
                  (i = t.mouseEnterX - (g.pageX - u)),
                  (a = t.mouseEnterY - (g.pageY - h)),
                  (f = t.speed / 1e3 || 0.4))
                : "deviceorientation" !== g.type &&
                  ((i = m / 2 - (g.pageX - u)), (a = v / 2 - (g.pageY - h))),
              ("mousedrag" != k[e].parallax.type || k[e].carousel.isPressed) &&
                g &&
                "deviceorientation" == g.type)
            ) {
              var y,
                u = g.beta - 60,
                w =
                  ((y = g.gamma),
                  (u = u),
                  1 < Math.abs(t.orientationX - y) ||
                    1 < Math.abs(t.orientationY - u));
              if (((t.orientationX = y), (t.orientationY = u), !w)) return;
              k.winW > k.getWinH(e) && ((w = y), (y = u), (u = w)),
                (i = (360 / m) * (y *= 1.5)),
                (a = (180 / v) * (u *= 1.5));
            }
            for (x in (!g || ("mouseleave" !== g.type && "mouseout" !== g.type)
              ? "mousedrag" == k[e].parallax.type &&
                k[e].carousel.isPressed &&
                ("v" === k[e].carousel.orientation &&
                  "same" == t.car_dir &&
                  (i = 0),
                "same" == t.car_dir
                  ? "v" === k[e].carousel.orientation
                    ? (i = 0)
                    : (a = 0)
                  : "opposite" == t.car_dir &&
                    ("v" === k[e].carousel.orientation
                      ? ((i = a), (a = 0))
                      : ((a = i), (i = 0))),
                "v" === k[e].carousel.orientation
                  ? ((a *= t.car_smulti), (i *= t.car_omulti))
                  : ((a *= t.car_omulti), (i *= t.car_smulti)))
              : (t.mouseEntered = !1),
            t.pcontainers))
              if (t.pcontainers.hasOwnProperty(x)) {
                var b,
                  _ = !1;
                if ("mousedrag" == t.type && !k[e].carousel.justify)
                  for (var S = 0; S < k[e].slideamount; S++)
                    k[e].carousel.trackArr[S].elem.getAttribute("data-key") ===
                      x &&
                      Math.abs(k[e].carousel.trackArr[S].progress <= 1) &&
                      (_ = !0);
                if (
                  void 0 === k[e].activeRSSlide ||
                  "static" === x ||
                  (_ && "all" == t.car_env) ||
                  k[e].slides[k[e].activeRSSlide].dataset.key === x
                )
                  for (var S in t.pcontainers[x])
                    t.pcontainers[x].hasOwnProperty(S) &&
                      (((b = t.pcontainers[x][S]).pl =
                        "3D" == t.type || "3d" == t.type
                          ? b.depth / 200
                          : b.depth / 100),
                      (b.offsh = i * b.pl),
                      (b.offsv = a * b.pl),
                      "mousescroll" == t.type
                        ? tpGS.gsap.to(b.tpw, f, {
                            force3D: "auto",
                            x: b.offsh,
                            ease: "power3.out",
                            overwrite: "all",
                          })
                        : tpGS.gsap.to(b.tpw, f, {
                            force3D: "auto",
                            x: b.offsh,
                            y: b.offsv,
                            ease: "power3.out",
                            overwrite: "all",
                          }));
              }
            if ("3D" == t.type || "3d" == t.type)
              for (var x in t.sctors)
                if (
                  t.sctors.hasOwnProperty(x) &&
                  (void 0 === k[e].activeRSSlide ||
                    "static" === x ||
                    k[e].slides[k[e].activeRSSlide].dataset.key === x ||
                    k.isFF)
                )
                  for (var S in t.sctors[x])
                    t.sctors[x].hasOwnProperty(S) &&
                      ((h = jQuery(t.sctors[x][S])),
                      (o =
                        i *
                        (r = k.isFirefox()
                          ? Math.min(25, t.levels[t.levels.length - 1]) / 200
                          : t.levels[t.levels.length - 1] / 200)),
                      (s = a * r),
                      (n =
                        (0 != k[e].canv.width &&
                          Math.round((i / k[e].canv.width) * r * 100)) ||
                        0),
                      (l =
                        (0 != k[e].canv.height &&
                          Math.round((a / k[e].canv.height) * r * 100)) ||
                        0),
                      (d = h.closest("rs-slide")),
                      (c = 0),
                      (p = !1),
                      "deviceorientation" === g.type &&
                        ((o = i * (r = t.levels[t.levels.length - 1] / 200)),
                        (s = a * r * 3),
                        (n =
                          (0 != k[e].canv.width &&
                            Math.round((i / k[e].canv.width) * r * 500)) ||
                          0),
                        (l =
                          (0 != k[e].canv.height &&
                            Math.round((a / k[e].canv.height) * r * 700)) ||
                          0)),
                      h.hasClass("dddwrapper-layer") &&
                        ((c = t.ddd_z_correction || 65), (p = !0)),
                      h.hasClass("dddwrapper-layer") && (s = o = 0),
                      d.index() === k[e].pr_active_key ||
                      "carousel" != k[e].sliderType ||
                      ("carousel" == k[e].sliderType &&
                        "mousedrag" == k[e].parallax.type)
                        ? !t.ddd_bgfreeze || p
                          ? tpGS.gsap.to(h, f, {
                              rotationX: l,
                              rotationY: -n,
                              x: o,
                              z: c,
                              y: s,
                              ease: "power3.out",
                              overwrite: "all",
                            })
                          : tpGS.gsap.to(h, 0.5, {
                              force3D: "auto",
                              rotationY: 0,
                              rotationX: 0,
                              z: 0,
                              ease: "power3.out",
                              overwrite: "all",
                            })
                        : tpGS.gsap.to(h, 0.5, {
                            force3D: "auto",
                            rotationY: 0,
                            x: 0,
                            y: 0,
                            rotationX: 0,
                            z: 0,
                            ease: "power3.out",
                            overwrite: "all",
                          }),
                      ("mouseleave" != g.type && "mouseout" !== g.type) ||
                        tpGS.gsap.to(this, 3.8, { z: 0, ease: "power3.out" }));
          },
          parallaxProcesses: function (e, t, i, a) {
            var r = k[e].fixedOnTop
                ? Math.min(1, Math.max(0, window.scrollY / k.lastwindowheight))
                : Math.min(
                    1,
                    Math.max(
                      0,
                      (0 - (t.top - k.lastwindowheight)) /
                        (t.hheight + k.lastwindowheight)
                    )
                  ),
              o =
                ((0 <= t.top && t.top <= k.lastwindowheight) ||
                  (t.top <= 0 && 0 <= t.bottom) ||
                  (t.top <= 0 && t.bottom),
                k[e].slides[
                  void 0 === k[e].pr_active_key ? 0 : k[e].pr_active_key
                ]);
            if (
              ((k[e].scrollProg = r),
              (k[e].scrollProgBasics = {
                top: t.top,
                height: t.hheight,
                bottom: t.bottom,
              }),
              k[e].sbtimeline.fixed
                ? (!1 === k[e].fixedScrollOnState ||
                  0 !== k[e].drawUpdates.cpar.left ||
                  !k.stickySupported ||
                  (0 != k[e].fullScreenOffsetResult &&
                    null != k[e].fullScreenOffsetResult)
                    ? (k.stickySupported = !1)
                    : (k[e].topc.addClass("rs-stickyscrollon"),
                      (k[e].fixedScrollOnState = !0)),
                  void 0 === k[e].sbtimeline.rest &&
                    k.updateFixedScrollTimes(e),
                  t.top >= k[e].fullScreenOffsetResult &&
                  t.top <= k.lastwindowheight
                    ? ((r =
                        (k[e].sbtimeline.fixStart *
                          (1 - t.top / k.lastwindowheight)) /
                        1e3),
                      !0 !== k.stickySupported &&
                        !1 !== k[e].fixedScrollOnState &&
                        (k[e].topc.removeClass("rs-fixedscrollon"),
                        tpGS.gsap.set(k[e].cpar, { top: 0, y: 0 }),
                        (k[e].fixedScrollOnState = !1)))
                    : (r =
                        t.top <= k[e].fullScreenOffsetResult &&
                        t.bottom >= k[e].module.height
                          ? (!0 !== k.stickySupported &&
                              !0 !== k[e].fixedScrollOnState &&
                              ((k[e].fixedScrollOnState = !0),
                              k[e].topc.addClass("rs-fixedscrollon"),
                              tpGS.gsap.set(k[e].cpar, {
                                top: 0,
                                y: k[e].fullScreenOffsetResult,
                              })),
                            (k[e].sbtimeline.fixStart +
                              k[e].sbtimeline.time *
                                (Math.abs(t.top) /
                                  (t.hheight - k[e].module.height))) /
                              1e3)
                          : (!0 !== k.stickySupported &&
                              (tpGS.gsap.set(k[e].cpar, {
                                top:
                                  0 <= k[e].scrollproc
                                    ? 0
                                    : t.height - k[e].module.height,
                              }),
                              !1 !== k[e].fixedScrollOnState) &&
                              (k[e].topc.removeClass("rs-fixedscrollon"),
                              (k[e].fixedScrollOnState = !1)),
                            t.top > k.lastwindowheight
                              ? 0
                              : (k[e].sbtimeline.fixEnd +
                                  k[e].sbtimeline.rest *
                                    (1 - t.bottom / k[e].module.height)) /
                                1e3)))
                : (r = (k[e].duration * r) / 1e3),
              void 0 !== o && void 0 !== k.gA(o, "key") && !0 !== i)
            ) {
              var s,
                n,
                l = 0;
              for (s in k[e].sbas[k.gA(o, "key")])
                void 0 !== k[e]._L[s] && null == k[e]._L[s].timeline && l++,
                  void 0 === k[e]._L[s] ||
                    void 0 === k[e]._L[s].timeline ||
                    (1 != k[e]._L[s].animationonscroll &&
                      "true" != k[e]._L[s].animationonscroll) ||
                    ((l = -9999),
                    (n =
                      void 0 !== k[e]._L[s].scrollBasedOffset
                        ? r + k[e]._L[s].scrollBasedOffset
                        : r),
                    k[e]._L[s].animteToTime !==
                      (n = n <= 0 ? 0 : n < 0.1 ? 0.1 : n) &&
                      ((k[e]._L[s].animteToTimeCache = k[e]._L[s].animteToTime),
                      (k[e]._L[s].animteToTime = n),
                      tpGS.gsap.to(k[e]._L[s].timeline, k[e].sbtimeline.speed, {
                        time: n,
                        ease: k[e].sbtimeline.ease,
                      })));
              0 < l &&
                requestAnimationFrame(function () {
                  k.parallaxProcesses(e, t, i, a);
                }),
                k[e].c.trigger("timeline_scroll_processed", {
                  id: e,
                  mproc: r,
                  speed: k[e].sbtimeline.speed,
                });
            }
            if (k.ISM && k[e].parallax.disable_onmobile) return !1;
            var d,
              c,
              p = k[e].parallax;
            if (
              (void 0 !== k[e].slides[k[e].pr_processing_key] &&
                void 0 !== k[e].slides[k[e].pr_processing_key].dataset &&
                (d = k[e].slides[k[e].pr_processing_key].dataset.key),
              "3d" != p.type && "3D" != p.type)
            ) {
              if ("scroll" == p.type || "mousescroll" == p.type)
                for (var g in p.pcontainers)
                  if (
                    p.pcontainers.hasOwnProperty(g) &&
                    (void 0 === k[e].activeRSSlide ||
                      "static" === g ||
                      k[e].slides[k[e].activeRSSlide].dataset.key === g ||
                      d === g)
                  )
                    for (var u in p.pcontainers[g])
                      p.pcontainers[g].hasOwnProperty(u) &&
                        ((c = p.pcontainers[g][u]),
                        (v = void 0 !== a ? a : p.speedls / 1e3 || 0),
                        (c.pl = c.depth / 100),
                        (c.offsv =
                          Math.round(
                            k[e].scrollproc * -(c.pl * k[e].canv.height) * 10
                          ) / 10 || 0),
                        tpGS.gsap.to(c.tpw, v, {
                          overwrite: "auto",
                          force3D: "auto",
                          y: c.offsv,
                        }));
              if (p.bgcontainers)
                for (u = 0; u < p.bgcontainers.length; u++) {
                  var h = p.bgcontainers[u],
                    m = p.bgcontainer_depths[u],
                    m = k[e].scrollproc * -(m * k[e].canv.height) || 0,
                    v = void 0 !== a ? a : p.speedbg / 1e3 || 0.015;
                  (v =
                    void 0 !== k[e].parallax.lastBGY &&
                    0 === v &&
                    50 < Math.abs(m - k[e].parallax.lastBGY)
                      ? 0.15
                      : v),
                    tpGS.gsap.to(h, v, {
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      backfaceVisibility: "hidden",
                      force3D: "true",
                      y: m + "px",
                    }),
                    (k[e].parallax.lastBGY = m);
                }
            }
            var f = k[e].scrolleffect;
            if (f.set && (!k.ISM || !1 === f.disable_onmobile)) {
              var y,
                o = (o = Math.abs(k[e].scrollproc) - f.tilt / 100) < 0 ? 0 : o;
              if (
                (!1 !== f._L &&
                  ((S = 1 - o * f.multiplicator_layers),
                  (x = { force3D: "true" }),
                  "top" == f.direction && 0 <= k[e].scrollproc && (S = 1),
                  (S =
                    1 <
                    (S =
                      "bottom" == f.direction && k[e].scrollproc <= 0 ? 1 : S)
                      ? 1
                      : S < 0
                      ? 0
                      : S),
                  f.fade && (x.opacity = S),
                  f.scale && ((y = S), (x.scale = 1 - y + 1)),
                  f.blur &&
                    ((b = (1 - S) * f.maxblur),
                    (x["-webkit-filter"] =
                      "blur(" + (b = b <= 0.03 ? 0 : b) + "px)"),
                    (x.filter = "blur(" + b + "px)"),
                    window.isSafari11) &&
                    void 0 !== f._L &&
                    void 0 !== f._L[0] &&
                    void 0 !== f._L[0][0] &&
                    "RS-MASK-WRAP" == f._L[0][0].tagName &&
                    (x.z = 0.001),
                  f.grayscale &&
                    ((_ = "grayscale(" + 100 * (1 - S) + "%)"),
                    (x["-webkit-filter"] =
                      void 0 === x["-webkit-filter"]
                        ? _
                        : x["-webkit-filter"] + " " + _),
                    (x.filter = void 0 === x.filter ? _ : x.filter + " " + _)),
                  tpGS.gsap.set(f._L, x)),
                !1 !== f.bgs)
              ) {
                var w,
                  b,
                  _,
                  S = 1 - o * f.multiplicator,
                  x = { backfaceVisibility: "hidden", force3D: "true" };
                for (w in ("top" == f.direction &&
                  0 <= k[e].scrollproc &&
                  (S = 1),
                (S =
                  1 <
                  (S = "bottom" == f.direction && k[e].scrollproc <= 0 ? 1 : S)
                    ? 1
                    : S < 0
                    ? 0
                    : S),
                f.bgs))
                  f.bgs.hasOwnProperty(w) &&
                    (f.bgs[w].fade && (x.opacity = S),
                    f.bgs[w].blur &&
                      ((b = (1 - S) * f.maxblur),
                      (x["-webkit-filter"] = "blur(" + b + "px)"),
                      (x.filter = "blur(" + b + "px)")),
                    f.bgs[w].grayscale &&
                      ((_ = "grayscale(" + 100 * (1 - S) + "%)"),
                      (x["-webkit-filter"] =
                        void 0 === x["-webkit-filter"]
                          ? _
                          : x["-webkit-filter"] + " " + _),
                      (x.filter =
                        void 0 === x.filter ? _ : x.filter + " " + _)),
                    tpGS.gsap.set(f.bgs[w].c, x));
              }
            }
          },
        }),
        function (e, t) {
          var i = k[t].parallax,
            a =
              (e
                .find("rs-sbg-wrap")
                .wrapAll(
                  '<div class="dddwrapper" style="width:100%;height:100%;position:absolute;top:0px;left:0px;overflow:hidden"></div>'
                ),
              e[0].querySelectorAll(".rs-parallax-wrap")),
            r = document.createElement("div");
          (r.className = "dddwrapper-layer"),
            (r.style.width = "100%"),
            (r.style.height = "100%"),
            (r.style.position = "absolute"),
            (r.style.top = "0px"),
            (r.style.left = "0px"),
            (r.style.zIndex = 5),
            (r.style.overflow = i.ddd_layer_overflow);
          for (var o = 0; o < a.length; o++)
            a.hasOwnProperty(o) &&
              null === k.closestNode(a[o], "RS-GROUP") &&
              null === k.closestNode(a[o], "RS-ROW") &&
              r.appendChild(a[o]);
          e[0].appendChild(r),
            e
              .find(".rs-pxl-tobggroup")
              .closest(".rs-parallax-wrap")
              .wrapAll(
                '<div class="dddwrapper-layertobggroup" style="position:absolute;top:0px;left:0px;z-index:50;width:100%;height:100%"></div>'
              );
          var s = e.find(".dddwrapper"),
            n = e.find(".dddwrapper-layer");
          e.find(".dddwrapper-layertobggroup").appendTo(s),
            "carousel" == k[t].sliderType &&
              (i.ddd_shadow && s.addClass("dddwrappershadow"),
              tpGS.gsap.set(s, { borderRadius: k[t].carousel.border_radius })),
            tpGS.gsap.set(e, {
              overflow: "visible",
              transformStyle: "preserve-3d",
              perspective: 1600,
            }),
            tpGS.gsap.set(s, {
              force3D: "auto",
              transformOrigin: "50% 50%",
              transformStyle: "preserve-3d",
              transformPerspective: 1600,
            }),
            tpGS.gsap.set(n, {
              force3D: "auto",
              transformOrigin: "50% 50%",
              zIndex: 5,
              transformStyle: "flat",
              transformPerspective: 1600,
            }),
            tpGS.gsap.set(k[t].canvas, {
              transformStyle: "preserve-3d",
              transformPerspective: 1600,
            });
        });
    function d(i, a, e, r) {
      t(e)
        .find(".rs-pxl-" + i)
        .each(function () {
          var e = 0 <= this.className.indexOf("rs-pxmask"),
            t = e
              ? k.closestNode(this, "RS-PX-MASK")
              : k.closestClass(this, "rs-parallax-wrap");
          t &&
            (e &&
              !window.isSafari11 &&
              (tpGS.gsap.set(t, { z: 1 }),
              tpGS.gsap.set(k.closestNode(t, "RS-BG-ELEM"), { z: 1 })),
            (t.dataset.parallaxlevel = a.levels[i - 1]),
            t.classList.add("tp-parallax-container"),
            (r[this.id] = {
              tpw: t,
              depth: a.levels[i - 1],
              offsv: 0,
              offsh: 0,
            }));
        });
    }
    (window.RS_MODULES = window.RS_MODULES || {}),
      (window.RS_MODULES.parallax = { loaded: !0, version: "6.6.0" }),
      window.RS_MODULES.checkMinimal && window.RS_MODULES.checkMinimal();
  })(jQuery),
  !(function () {
    "use strict";
    window._R_is_Editor
      ? (RVS._R = void 0 === RVS._R ? {} : RVS._R)
      : (window._R_is_Editor = !1);
    var e = "power1.inOut",
      t = "power2.inOut",
      b =
        ((jQuery.fn.revolution = jQuery.fn.revolution || {}),
        _R_is_Editor ? RVS._R : jQuery.fn.revolution),
      n =
        (_R_is_Editor && (RVS._R.isNumeric = RVS.F.isNumeric),
        jQuery.extend(!0, b, {
          getSlideAnimationObj: function (e, t, i) {
            var a,
              r,
              o,
              s,
              n = {};
            for (r in (void 0 === t.anim && null == t.in && (t.in = "o:0"), t))
              if (t.hasOwnProperty(r) && void 0 !== t[r])
                for (s in (o = t[r].split(";")))
                  o.hasOwnProperty(s) &&
                    void 0 !== (a = o[s].split(":"))[0] &&
                    void 0 !== a[1] &&
                    ((n[r] = void 0 === n[r] ? {} : n[r]),
                    (n[r][a[0]] =
                      "d3" === r && "c" === a[0] ? a[1] : a[1].split(",")[0]));
            return (
              (n.in = void 0 === n.in ? {} : n.in),
              (n.anim = void 0 === n.anim ? { e: "basic" } : n.anim),
              _R_is_Editor ||
                void 0 === n.in ||
                void 0 === n.in.prst ||
                b.loadSlideAnimLibrary(e, { key: i, prst: n.in.prst }),
              (b[e].sbgs[i].slideanimationRebuild = !1),
              n
            );
          },
          loadSlideAnimLibrary: function (a, r) {
            void 0 === b.SLTR && !0 !== b.SLTR_loading
              ? ((b.SLTR_loading = !0),
                jQuery.ajax({
                  type: "post",
                  url: b[a].ajaxUrl,
                  dataType: "json",
                  data: {
                    action: "revslider_ajax_call_front",
                    client_action: "get_transitions",
                  },
                  success: function (e, t, i) {
                    1 == e.success &&
                      ((b.SLTR = e.transitions), void 0 !== r) &&
                      b.setRandomDefaults(a, r.key, r.prst);
                  },
                  error: function (e) {
                    console.log("Transition Table can not be loaded"),
                      console.log(e);
                  },
                }))
              : void 0 !== r &&
                void 0 !== b.SLTR &&
                b.setRandomDefaults(a, r.key, r.prst);
          },
          convertSlideAnimVals: function (e) {
            return {
              anim: {
                eng: e.eng,
                ms: parseInt(e.speed, 0),
                o: e.o,
                e: e.e,
                f: e.f,
                p: e.p,
                d: parseInt(e.d, 0),
                adpr: e.adpr,
              },
              d3: {
                f: e.d3.f,
                d: e.d3.d,
                z: e.d3.z,
                t: e.d3.t,
                c: e.d3.c,
                e: e.d3.e,
                fdi: e.d3.fdi,
                fdo: e.d3.fdo,
                fz: e.d3.fz,
                su: e.d3.su,
                smi: e.d3.smi,
                sma: e.d3.sma,
                sc: e.d3.sc,
                sl: e.d3.sl,
              },
              in: {
                eng: e.in.eng,
                o:
                  _R_is_Editor &&
                  void 0 !== e.preset &&
                  0 === e.preset.indexOf("rnd")
                    ? 0
                    : b.valBeau(e.in.o),
                x: b.valBeau(e.in.x),
                y: b.valBeau(e.in.y),
                r: b.valBeau(e.in.r),
                sx: b.valBeau(e.in.sx),
                sy: b.valBeau(e.in.sy),
                m: e.in.m,
                e: e.in.e,
                row: e.in.row,
                col: e.in.col,
                mo:
                  "false" !== e.in.mou && !1 !== e.in.mou
                    ? b.valBeau(e.in.mo)
                    : 0,
                moo:
                  "false" !== e.in.mou && !1 !== e.in.mou
                    ? b.valBeau(e.in.moo)
                    : "none",
                mou: e.in.mou,
              },
              out:
                void 0 === e.out.a || "true" == e.out.a || !0 === e.out.a
                  ? void 0
                  : {
                      a: o(e.out.a),
                      o: b.valBeau(e.out.o),
                      x: b.valBeau(e.out.x),
                      y: b.valBeau(e.out.y),
                      r: b.valBeau(e.out.r),
                      sx: b.valBeau(e.out.sx),
                      sy: b.valBeau(e.out.sy),
                      m: e.out.m,
                      e: e.out.e,
                      row: b.valBeau(e.out.row),
                      col: b.valBeau(e.out.col),
                    },
              filter: {
                u: e.filter.u,
                e: e.filter.e,
                b: e.filter.b,
                g: e.filter.g,
                h: e.filter.h,
                s: e.filter.s,
                c: e.filter.c,
                i: e.filter.i,
              },
              addOns: e.addOns,
            };
          },
          setRandomDefaults: function (e, t, i) {
            b[e].sbgs[t].random = b.getAnimObjectByKey(i, b.SLTR);
          },
          getSlideAnim_AddonDefaults: function () {
            var e,
              t = {};
            for (e in b.enabledSlideAnimAddons)
              t = jQuery.extend(
                !0,
                t,
                b[b.enabledSlideAnimAddons[e]].defaults()
              );
            return t;
          },
          getSlideAnim_EmptyObject: function () {
            return {
              speed: 1e3,
              o: "inout",
              e: "basic",
              f: "start",
              p: "none",
              d: 15,
              eng: "animateCore",
              adpr: !0,
              d3: {
                f: "none",
                d: "horizontal",
                z: 300,
                t: 0,
                c: "#ccc",
                e: "power2.inOut",
                fdi: 1.5,
                fdo: 2,
                fz: 0,
                su: !1,
                smi: 0,
                sma: 0.5,
                sc: "#000",
                sl: 1,
              },
              filter: {
                u: !1,
                e: "default",
                b: 0,
                g: 0,
                h: 100,
                s: 0,
                c: 100,
                i: 0,
              },
              in: {
                o: 1,
                x: 0,
                y: 0,
                r: 0,
                sx: 1,
                sy: 1,
                m: !1,
                e: "power2.inOut",
                row: 1,
                col: 1,
                mo: 80,
                mou: !1,
              },
              out: {
                a: "true",
                o: 1,
                x: 0,
                y: 0,
                r: 0,
                sx: 1,
                sy: 1,
                m: !1,
                e: "power2.inOut",
                row: 1,
                col: 1,
              },
              addOns: b.getSlideAnim_AddonDefaults(),
            };
          },
          getAnimObjectByKey: function (e, t) {
            if (b.getAnimObjectCacheKey === e) return b.getAnimObjectCache;
            var i, a;
            for (a in ((b.getAnimObjectCacheKey = e), t))
              if (t.hasOwnProperty(a) && void 0 === i)
                for (var r in t[a])
                  if (t[a].hasOwnProperty(r) && void 0 === i)
                    if (e === r && 0 === e.indexOf("rnd"))
                      ((i = t[a][r]).main = a), (i.group = r);
                    else
                      for (var o in t[a][r])
                        t[a][r].hasOwnProperty(o) &&
                          void 0 === i &&
                          o === e &&
                          (((i = t[a][r][o]).main = a), (i.group = r));
            return (b.getAnimObjectCache = jQuery.extend(!0, {}, i)), i;
          },
          getRandomSlideTrans: function (e, t, i) {
            if (
              void 0 === b.randomSlideAnimCache ||
              void 0 === b.randomSlideAnimCache[e] ||
              void 0 === b.randomSlideAnimCache[e][t]
            )
              for (var a in ((b.randomSlideAnimCache =
                void 0 === b.randomSlideAnimCache
                  ? {}
                  : b.randomSlideAnimCache),
              (b.randomSlideAnimCache[e] =
                void 0 === b.randomSlideAnimCache[e]
                  ? {}
                  : b.randomSlideAnimCache[e]),
              (b.randomSlideAnimCache[e][t] =
                void 0 === b.randomSlideAnimCache[e][t]
                  ? []
                  : b.randomSlideAnimCache[e][t]),
              i))
                if (
                  i.hasOwnProperty(a) &&
                  "random" !== a &&
                  "custom" !== a &&
                  ("all" == e || a == e)
                )
                  for (var r in i[a])
                    if (
                      i[a].hasOwnProperty(r) &&
                      "icon" !== r &&
                      ("" + t == "undefined" || 0 <= t.indexOf(r))
                    )
                      for (var o in i[a][r])
                        i[a][r].hasOwnProperty(o) &&
                          -1 ==
                            jQuery.inArray(i[a][r][o].title, [
                              "*north*",
                              "*south*",
                              "*east*",
                              "*west*",
                            ]) &&
                          b.randomSlideAnimCache[e][t].push(o);
            return b.randomSlideAnimCache[e][t][
              Math.floor(Math.random() * b.randomSlideAnimCache[e][t].length)
            ];
          },
          cbgW: function (e, t) {
            return _R_is_Editor
              ? RVS.RMD.width
              : "carousel" === b[e].sliderType
              ? b[e].justifyCarousel
                ? b[e].carousel.slide_widths[
                    void 0 !== t ? t : b[e].carousel.focused
                  ]
                : b[e].carousel.slide_width
              : b[e].canv.width;
          },
          cbgH: function (e, t) {
            return _R_is_Editor
              ? RVS.RMD.height
              : "carousel" === b[e].sliderType
              ? ("v" == b[e].carousel.orientation &&
                  ("fullscreen" === b[e].sliderLayout ||
                    b[e].infullscreenmode)) ||
                !0 === b[e].carousel.justify
                ? b[e].carousel.slide_height
                : "fullscreen" === b[e].sliderLayout || b[e].infullscreenmode
                ? b[e].module.height
                : Math.min(b[e].canv.height, b[e].gridheight[b[e].level])
              : void 0 !== b[e].maxHeight &&
                0 < b[e].maxHeight &&
                !b[e].fixedOnTop
              ? Math.min(b[e].canv.height, b[e].maxHeight)
              : b[e].canv.height;
          },
          valBeau: function (e) {
            return (e = (
              "" +
              (e = (
                "" +
                (e = (
                  "" +
                  (e = ("" + (e = ("" + e).split(",").join("|"))).replace(
                    "{",
                    "ran("
                  ))
                ).replace("}", ")"))
              ).replace("[", "cyc("))
            ).replace("]", ")"));
          },
          animateSlide: function (e, t) {
            return (
              _R_is_Editor && RVS.F.resetSlideTL(),
              void 0 === tpGS.eases.late &&
                (tpGS.CustomEase.create(
                  "late",
                  "M0,0,C0,0,0.474,0.078,0.724,0.26,0.969,0.438,1,1,1,1"
                ),
                tpGS.CustomEase.create(
                  "late2",
                  "M0,0 C0,0 0.738,-0.06 0.868,0.22 1,0.506 1,1 1,1 "
                ),
                tpGS.CustomEase.create(
                  "late3",
                  "M0,0,C0,0,0.682,0.157,0.812,0.438,0.944,0.724,1,1,1,1"
                )),
              a(e, t)
            );
          },
          getBasic: function (e) {
            return jQuery.extend(
              !0,
              {
                attr:
                  null == e || void 0 === e.attr
                    ? [
                        "o",
                        "r",
                        "sx",
                        "sy",
                        "x",
                        "y",
                        "m",
                        "e",
                        "row",
                        "col",
                        "mo",
                        "moo",
                      ]
                    : e.attr,
                in: {
                  f: "start",
                  m: !1,
                  o: 1,
                  r: 0,
                  sx: 1,
                  sy: 1,
                  x: 0,
                  y: 0,
                  row: 1,
                  col: 1,
                  e: t,
                  ms: 1e3,
                  mo: 0,
                  moo: "none",
                },
                out: {
                  f: "start",
                  m: !1,
                  o: 1,
                  r: 0,
                  sx: 1,
                  sy: 1,
                  x: 0,
                  y: 0,
                  row: 1,
                  col: 1,
                  e: t,
                  ms: 1e3,
                },
              },
              e
            );
          },
          playBGVideo: function (e, t, i) {
            if (_R_is_Editor) i = void 0 === i ? RVS.SBGS[RVS.S.slideId].n : i;
            else {
              if (
                void 0 === i &&
                (void 0 === b[e].pr_next_bg || 0 === b[e].pr_next_bg.length)
              )
                return;
              i =
                void 0 === i
                  ? b[e].sbgs[void 0 === t ? b[e].pr_next_bg[0].dataset.key : t]
                  : i;
            }
            void 0 !== i.bgvid &&
              0 < i.bgvid.length &&
              (c(e, {}, i, "in"),
              b.resetVideo(i.bgvid, e),
              b.playVideo(i.bgvid, e, !0),
              tpGS.gsap.to(i.bgvid[0], 0.2, {
                zIndex: 30,
                display: "block",
                autoAlpha: 1,
                delay: 0.075,
                overwrite: "all",
              }));
          },
          stopBGVideo: function (e, t, i) {
            if (_R_is_Editor) i = void 0 === i ? RVS.SBGS[RVS.S.slideId].n : i;
            else {
              if (
                void 0 === i &&
                (void 0 === b[e].pr_next_bg || 0 === b[e].pr_next_bg.length)
              )
                return;
              i =
                void 0 === i
                  ? b[e].sbgs[void 0 === t ? b[e].pr_next_bg[0].dataset.key : t]
                  : i;
            }
            void 0 !== i.bgvid &&
              0 < i.bgvid.length &&
              ((i.drawVideoCanvasImagesRecall = !1),
              b.stopVideo(i.bgvid, e),
              tpGS.gsap.to(i.bgvid[0], 0.2, {
                autoAlpha: 0,
                zIndex: 0,
                display: "none",
              }));
          },
          SATools: {
            getOffset: function (e, t, i, a) {
              var r = 0 <= ("" + e).indexOf("%");
              return 0 == (e = b.SATools.getSpecialValue(e, a, i)) ||
                void 0 === e
                ? 0
                : r
                ? t * (parseInt(e) / 100)
                : parseInt(e);
            },
            getSpecialValue: function (e, t, i, a) {
              var r;
              return b.isNumeric(parseFloat(e, 0))
                ? parseFloat(e, 0)
                : ((e = (
                    "random" ==
                      (r =
                        1 < ("" + e).split("ran(").length
                          ? "random"
                          : 1 < ("" + e).split("cyc(").length
                          ? "wrap"
                          : 1 < ("" + e).split("(").length
                          ? "dir"
                          : "unknown") || "wrap" == r
                      ? e.slice(4, -1)
                      : e.slice(1, -1)
                  ).split("|")),
                  "random" == r
                    ? tpGS.gsap.utils.random(
                        parseFloat(e[0]),
                        parseFloat(1 < e.length ? e[1] : 0 - e[0])
                      )
                    : "wrap" == r
                    ? 1 <
                      ("" + (t = tpGS.gsap.utils.wrap(e, t))).split("(").length
                      ? parseFloat(t.slice(1, -1)) * i + (a ? "%" : "")
                      : t
                    : "dir" == r
                    ? parseFloat(e[0]) * i + (a ? "%" : "")
                    : void 0);
            },
          },
          getmDim: function (e, t, i) {
            var a = b.cbgW(e, t),
              t = b.cbgH(e, t);
            return (
              (i.DPR = _R_is_Editor
                ? Math.min(window.devicePixelRatio, 2)
                : b[e].DPR),
              b.maxDimCheck(i, a, t)
            );
          },
          maxDimCheck: function (e, t, i) {
            var a, r, o, s, n, l;
            void 0 !== e.video &&
              "img" !== e.video.tagName &&
              null != e.video.videoWidth &&
              e.video.videoWidth;
            return (
              (("animating" === e.currentState || null != e.panzoom) &&
                ("animating" !== e.currentState ||
                  null != e.panzoom ||
                  (null != e.slideanimation &&
                    null != e.slideanimation.anim &&
                    "true" === e.slideanimation.anim.adpr))) ||
              (1 < e.DPR && b.ISM && 1024 < i)
                ? ((e.DPR = 1), (a = t), (r = i))
                : (void 0 ===
                    (o = {
                      w:
                        null == e.video || e.isVidImg || 0 == e.video.videoWidth
                          ? e.loadobj.width
                          : e.video.videoWidth,
                      h:
                        null == e.video ||
                        e.isVidImg ||
                        0 == e.video.videoHeight
                          ? e.loadobj.height
                          : e.video.videoHeight,
                    }).w && (o.w = e.loadobj.width),
                  void 0 === o.h && (o.h = e.loadobj.height),
                  (l = i / o.w),
                  (s = t / o.h),
                  (n = Math.max(l, s)) > e.DPR || (1 <= l && 1 <= s)
                    ? (e.DPR = 1)
                    : e.DPR > n && (e.DPR = Math.min(e.DPR, e.DPR / n)),
                  (a = t * e.DPR),
                  (r = i * e.DPR),
                  1 < e.DPR &&
                    ((l = t / i),
                    o.h < o.w && o.w < a
                      ? ((r = (a = Math.max(a, o.w)) / l), (e.DPR = 1))
                      : o.w < o.h &&
                        o.h < r &&
                        ((a = (r = Math.max(r, o.h)) * l), (e.DPR = 1)))),
              { width: Math.round(a), height: Math.round(r), w: t, h: i }
            );
          },
          updateSlideBGs: function (e, t, i, a) {
            if (_R_is_Editor) i = void 0 === i ? RVS.SBGS[RVS.S.slideId].n : i;
            else {
              if (
                void 0 === i &&
                (void 0 === b[e].pr_next_bg || 0 === b[e].pr_next_bg.length)
              )
                return;
              i =
                void 0 === i
                  ? b[e].sbgs[void 0 === t ? b[e].pr_next_bg[0].dataset.key : t]
                  : i;
            }
            (a = void 0 !== i.mDIM && a) ||
              (i.mDIM = b.getmDim(e, i.skeyindex, i)),
              void 0 !== i.video
                ? ("IMG" !== i.video.tagName && (i.isVidImg = ""),
                  (i.cDIMS = b.getBGCanvasDetails(e, i)),
                  (i.canvas.width = i.mDIM.width),
                  (i.canvas.height = i.mDIM.height),
                  i.ctx.clearRect(0, 0, i.mDIM.width, i.mDIM.height),
                  i.ctx.drawImage(i.shadowCanvas, 0, 0))
                : ((i.cDIMS = b.getBGCanvasDetails(e, i, a)),
                  (i.canvas.width = i.mDIM.width),
                  (i.canvas.height = i.mDIM.height),
                  "panzoom" === i.currentState ||
                    "animating" === i.currentState ||
                    (void 0 === i.currentState &&
                      !_R_is_Editor &&
                      "carousel" != b[e].sliderType) ||
                    (i.ctx.clearRect(0, 0, i.mDIM.width, i.mDIM.height),
                    0 !== i.shadowCanvas.width &&
                      0 !== i.shadowCanvas.height &&
                      i.ctx.drawImage(i.shadowCanvas, 0, 0))),
              "animating" === i.currentState &&
                "carousel" !== b[e].sliderType &&
                b.animatedCanvasUpdate(e, i);
          },
          addCanvas: function () {
            var e = document.createElement("canvas");
            return (
              (x = e.getContext("2d")),
              (e.style.background = "transparent"),
              (e.style.opacity = 1),
              x
            );
          },
          updateVideoFrames: function (e, t, i) {
            var a;
            (t.now = Date.now()),
              (t.then = void 0 === t.then ? t.now - 500 : t.then),
              (t.elapsed = t.now - t.then),
              (t.fps =
                "animating" === t.currentState && window._rs_firefox ? 50 : 33),
              t.elapsed > t.fps &&
                ((t.then = t.now - (t.elapsed % t.fps)),
                (a =
                  "img" === t.video.tagName ||
                  null == t.video.videoWidth ||
                  0 == t.video.videoWidth),
                (void 0 !== t.video &&
                  !t.video.BGrendered &&
                  void 0 !== t.loadobj &&
                  void 0 !== t.loadobj.img) ||
                (b.ISM && b.isFirefox(e))
                  ? ((t.mDIM = b.getmDim(e, t.skeyindex, t)),
                    (t.pDIMS = r(t.mDIM, t, {
                      width: t.mDIM.width,
                      height: t.mDIM.height,
                      x: 0,
                      y: 0,
                      contw: t.loadobj.width,
                      conth: t.loadobj.height,
                    })),
                    t.shadowCanvas.width !== t.mDIM.width &&
                      (t.shadowCanvas.width = t.mDIM.width),
                    t.shadowCanvas.height !== t.mDIM.height &&
                      (t.shadowCanvas.height = t.mDIM.height),
                    t.shadowCTX.drawImage(
                      t.loadobj.img,
                      t.pDIMS.x,
                      t.pDIMS.y,
                      t.pDIMS.width,
                      t.pDIMS.height
                    ))
                  : ((!i &&
                      void 0 !== t.sDIMS &&
                      a === t.isVidImg &&
                      0 !== t.sDIMS.width &&
                      0 !== t.sDIMS.height) ||
                      ((t.isVidImg = a),
                      (t.mDIM = b.getmDim(e, t.skeyindex, t)),
                      (t.sDIMS = r(t.mDIM, t, {
                        width: t.mDIM.width,
                        height: t.mDIM.height,
                        x: 0,
                        y: 0,
                        contw: t.isVidImg
                          ? t.loadobj.width
                          : t.video.videoWidth,
                        conth: t.isVidImg
                          ? t.loadobj.height
                          : t.video.videoHeight,
                      }))),
                    void 0 !== t.sDIMS &&
                      0 !== t.sDIMS.width &&
                      0 !== t.sDIMS.height &&
                      ("animating" === t.currentState
                        ? (t.shadowCanvas.width !== t.mDIM.width &&
                            (t.shadowCanvas.width = t.mDIM.width),
                          t.shadowCanvas.height !== t.mDIM.height &&
                            (t.shadowCanvas.height = t.mDIM.height),
                          t.shadowCTX.drawImage(
                            t.video,
                            t.sDIMS.x,
                            t.sDIMS.y,
                            t.sDIMS.width,
                            t.sDIMS.height
                          ))
                        : void 0 === t.animateDirection &&
                          (t.canvas.width !== t.mDIM.width &&
                            (t.canvas.width = t.mDIM.width),
                          t.canvas.height !== t.mDIM.height &&
                            (t.canvas.height = t.mDIM.height),
                          t.ctx.drawImage(
                            t.video,
                            t.sDIMS.x,
                            t.sDIMS.y,
                            t.sDIMS.width,
                            t.sDIMS.height
                          )),
                      (t.shadowCanvas_Drawn = !0)))),
              (i ||
                (t.drawVideoCanvasImagesRecall &&
                  "animating" === t.currentState) ||
                ("animating" === t.currentState &&
                  void 0 === t.shadowCanvas_Drawn)) &&
                window.requestAnimationFrame(function () {
                  b.updateVideoFrames(e, t);
                });
          },
          createOverlay: function (e, t, i, a) {
            if ("none" === t) return "none";
            i = void 0 === i ? 1 : i;
            var a =
                void 0 === a
                  ? { 0: "rgba(0, 0, 0, 0)", 1: "rgba(0, 0, 0, 1)" }
                  : a,
              r = {
                none: [[0]],
                1: [
                  [1, 0],
                  [0, 0],
                ],
                2: [
                  [1, 0, 0],
                  [0, 0, 0],
                  [0, 0, 0],
                ],
                3: [
                  [1, 0, 0, 0],
                  [0, 0, 0, 0],
                  [0, 0, 0, 0],
                ],
                4: [[1], [0]],
                5: [[1], [0], [0]],
                6: [[1], [0], [0], [0]],
                7: [[1, 0]],
                8: [[1, 0, 0]],
                9: [[1, 0, 0, 0]],
                10: [
                  [1, 0, 0, 0, 0],
                  [0, 1, 0, 1, 0],
                  [0, 0, 0, 0, 0],
                  [0, 1, 0, 1, 0],
                  [0, 0, 0, 0, 1],
                ],
                11: [
                  [0, 0, 1, 0, 0],
                  [0, 1, 0, 1, 0],
                  [1, 0, 0, 0, 1],
                  [0, 1, 0, 1, 0],
                  [0, 0, 1, 0, 0],
                ],
                12: [
                  [1, 0, 0],
                  [0, 1, 0],
                  [0, 0, 1],
                ],
                13: [
                  [0, 0, 1],
                  [0, 1, 0],
                  [1, 0, 0],
                ],
                14: [
                  [1, 0, 0, 0, 0],
                  [0, 1, 0, 0, 0],
                  [0, 0, 1, 0, 0],
                  [0, 0, 0, 1, 0],
                  [0, 0, 0, 0, 0],
                ],
                15: [
                  [0, 0, 0, 0, 1],
                  [0, 0, 0, 1, 0],
                  [0, 0, 1, 0, 0],
                  [0, 1, 0, 0, 0],
                  [1, 0, 0, 0, 0],
                ],
                16: [
                  [1, 0, 0, 0, 1],
                  [0, 1, 0, 1, 0],
                  [0, 0, 1, 0, 0],
                  [0, 1, 0, 1, 0],
                  [1, 0, 0, 0, 1],
                ],
              },
              o = void 0 === r[(t = void 0 === t ? 1 : t)] ? r[2] : r[t];
            _R_is_Editor && (b[e] = void 0 === b[e] ? {} : b[e]),
              (b[e].patternCanvas = document.createElement("canvas")),
              (b[e].patternCtx = b[e].patternCanvas.getContext("2d")),
              (b[e].patternCanvas.width = o[0].length * i),
              (b[e].patternCanvas.height = o.length * i);
            for (var s = 0; s < o.length; s++)
              for (var n = 0; n < o[s].length; n++)
                "transparent" != a[o[s][n]] &&
                  ((b[e].patternCtx.fillStyle = a[o[s][n]]),
                  b[e].patternCtx.fillRect(n * i, s * i, i, i));
            return "url(" + b[e].patternCanvas.toDataURL() + ")";
          },
          getBGCanvasDetails: function (e, t, i) {
            var a;
            return (
              i || (t.mDIM = b.getmDim(e, t.skeyindex, t)),
              (t.usepattern =
                ("auto" === t.bgfit || 0 <= t.bgfit.indexOf("%")) &&
                (void 0 === t.loadobj || !0 !== t.loadobj.useBGColor)),
              _R_is_Editor && void 0 === t.panzoom && delete t.shadowCanvas,
              void 0 === t.shadowCanvas &&
                ((t.shadowCanvas = document.createElement("canvas")),
                (t.shadowCTX = t.shadowCanvas.getContext("2d")),
                (t.shadowCanvas.style.background = "transparent"),
                (t.shadowCanvas.style.opacity = 1)),
              !0 === t.replaceShadowCanvas ||
              !0 === t.loadobj.bgColor ||
              !0 === t.usebgColor ||
              void 0 !== t.panzoom ||
              (null != t.isHTML5 && 1 != t.poster) ||
              t.usepattern
                ? ((a = {
                    width: t.mDIM.width,
                    height: t.mDIM.height,
                    x: 0,
                    y: 0,
                  }),
                  t.usepattern &&
                  void 0 !== t.loadobj &&
                  void 0 !== t.loadobj.img
                    ? b.getCanvasPattern(e, t, {
                        ratio: t.loadobj.height / t.loadobj.width,
                      })
                    : (t.loadobj.bgColor || t.usebgColor) &&
                      (t.shadowCanvas.width !== t.mDIM.width &&
                        (t.shadowCanvas.width = t.mDIM.width),
                      t.shadowCanvas.height !== t.mDIM.height &&
                        (t.shadowCanvas.height = t.mDIM.height),
                      b.getCanvasGradients(e, t)))
                : ((a = r(t.mDIM, t, {
                    width: t.mDIM.width,
                    height: t.mDIM.height,
                    x: 0,
                    y: 0,
                    contw: t.loadobj.width,
                    conth: t.loadobj.height,
                  })),
                  t.shadowCanvas.width !== t.mDIM.width &&
                    (t.shadowCanvas.width = t.mDIM.width),
                  t.shadowCanvas.height !== t.mDIM.height &&
                    (t.shadowCanvas.height = t.mDIM.height),
                  void 0 !== t.loadobj &&
                    void 0 !== t.loadobj.img &&
                    t.shadowCTX.drawImage(
                      t.loadobj.img,
                      a.x,
                      a.y,
                      a.width,
                      a.height
                    ),
                  (a = {
                    width: t.mDIM.width,
                    height: t.mDIM.height,
                    x: 0,
                    y: 0,
                  })),
              a
            );
          },
          getCanvasPattern: function (e, t, i) {
            void 0 === t.patternImageCanvas &&
              ((t.patternImageCanvas = document.createElement("canvas")),
              (t.patternImageCTX = t.patternImageCanvas.getContext("2d")));
            var a = t.bgfit.split(" "),
              a =
                (1 === a.length && (a[1] = a[0]),
                (i.width =
                  "auto" === a[0]
                    ? t.loadobj.width
                    : t.loadobj.width * (parseInt(a[0], 0) / 100)),
                (i.height =
                  "auto" === a[1] ? t.loadobj.height : i.width * i.ratio),
                (t.DPR = _R_is_Editor
                  ? Math.min(window.devicePixelRatio, 2)
                  : b[e].DPR),
                i.width / i.height);
            (i.width = i.width * t.DPR),
              (i.height = i.height * t.DPR),
              b.isIOS &&
                15728640 < i.width * i.height &&
                (t.mDIM.width > t.mDIM.height
                  ? ((i.width = t.mDIM.width),
                    (i.height = Math.round(t.mDIM.width / a)))
                  : ((i.height = t.mDIM.height),
                    (i.width = Math.round(t.mDIM.height * a)))),
              (t.patternImageCanvas.width = i.width),
              (t.patternImageCanvas.height = i.height),
              t.patternImageCTX.drawImage(
                t.loadobj.img,
                0,
                0,
                i.width,
                i.height
              ),
              t.shadowCanvas.width !== t.mDIM.width &&
                (t.shadowCanvas.width = t.mDIM.width),
              t.shadowCanvas.height !== t.mDIM.height &&
                (t.shadowCanvas.height = t.mDIM.height),
              t.shadowCTX.clearRect(
                0,
                0,
                t.shadowCTX.canvas.width,
                t.shadowCTX.canvas.height
              ),
              (t.pattern = t.shadowCTX.createPattern(
                t.patternImageCanvas,
                t.bgrepeat
              )),
              (t.shadowCTX.fillStyle = t.pattern),
              (t.shadowShifts = {
                h: t.bgposition.split(" ")[0],
                v: t.bgposition.split(" ")[1],
              }),
              (t.shadowShifts.hperc = b.isNumeric(parseInt(t.shadowShifts.h))
                ? (parseInt(t.shadowShifts.h) / 100) * t.mDIM.width
                : 0),
              (t.shadowShifts.vperc = b.isNumeric(parseInt(t.shadowShifts.v))
                ? (parseInt(t.shadowShifts.v) / 100) * t.mDIM.height
                : 0),
              (t.shadowShifts.x =
                "left" === t.shadowShifts.h
                  ? 0
                  : "center" === t.shadowShifts.h || "50%" == t.shadowShifts.h
                  ? "repeat" == t.bgrepeat || "repeat-x" == t.bgrepeat
                    ? t.mDIM.width / 2 -
                      i.width / 2 -
                      Math.ceil(t.mDIM.width / 2 / i.width) * i.width
                    : t.mDIM.width / 2 - i.width / 2
                  : "right" === t.shadowShifts.h
                  ? "repeat" == t.bgrepeat || "repeat-x" == t.bgrepeat
                    ? -(i.width - (t.mDIM.width % i.width))
                    : t.mDIM.width - i.width
                  : "repeat" == t.bgrepeat || "repeat-x" == t.bgrepeat
                  ? -(i.width - (t.shadowShifts.hperc % i.width))
                  : t.shadowShifts.hperc),
              (t.shadowShifts.y =
                "top" === t.shadowShifts.v
                  ? 0
                  : "center" === t.shadowShifts.v || "50%" == t.shadowShifts.v
                  ? "repeat" == t.bgrepeat || "repeat-y" == t.bgrepeat
                    ? t.mDIM.height / 2 -
                      i.height / 2 -
                      Math.ceil(t.mDIM.height / 2 / i.height) * i.height
                    : t.mDIM.height / 2 - i.height / 2
                  : "bottom" === t.shadowShifts.v
                  ? "repeat" == t.bgrepeat || "repeat-y" == t.bgrepeat
                    ? -(i.height - (t.mDIM.height % i.height))
                    : t.mDIM.height - i.height
                  : "repeat" == t.bgrepeat || "repeat-y" == t.bgrepeat
                  ? -(i.height - (t.shadowShifts.vperc % i.height))
                  : t.shadowShifts.vperc),
              t.shadowCTX.save(),
              t.shadowCTX.translate(t.shadowShifts.x, t.shadowShifts.y),
              t.shadowCTX.fillRect(
                0,
                0,
                t.mDIM.width - t.shadowShifts.x,
                t.mDIM.height - t.shadowShifts.y
              ),
              t.shadowCTX.restore();
          },
          getCanvasGradients: function (e, t) {
            if (0 <= t.bgcolor.indexOf("gradient")) {
              (t.gradient =
                null == t.gradient || _R_is_Editor
                  ? b.getGradients(t.bgcolor)
                  : t.gradient),
                (t.shadowGrd =
                  "radialGradient" === t.gradient.type
                    ? t.shadowCTX.createRadialGradient(
                        t.mDIM.width / 2,
                        t.mDIM.height / 2,
                        0,
                        t.mDIM.width / 2,
                        t.mDIM.height / 2,
                        Math.max(t.mDIM.width / 2, t.mDIM.height / 2)
                      )
                    : b.calcLinearGradient(
                        t.shadowCTX,
                        t.shadowCanvas.width,
                        t.shadowCanvas.height,
                        t.gradient.deg
                      ));
              for (var i = 0; i < t.gradient.stops.length; i += 2)
                t.shadowGrd.addColorStop(
                  t.gradient.stops[i + 1],
                  t.gradient.stops[i]
                );
              t.shadowCTX.clearRect(0, 0, t.mDIM.width, t.mDIM.height),
                (t.shadowCTX.fillStyle = t.shadowGrd);
            } else
              t.shadowCTX.clearRect(0, 0, t.mDIM.width, t.mDIM.height),
                (t.shadowCTX.fillStyle = t.bgcolor);
            t.shadowCTX.fillRect(0, 0, t.mDIM.width, t.mDIM.height);
          },
          cNS: function (e) {
            for (var t in ((e.n = document.createElementNS(
              "http://www.w3.org/2000/svg",
              e.n
            )),
            e.v))
              e.n.setAttributeNS(
                null,
                t.replace(/[A-Z]/g, function (e, t, i, a) {
                  return "-" + e.toLowerCase();
                }),
                e.v[t]
              );
            for (t in (void 0 !== e.c && e.n.setAttribute("class", e.c),
            void 0 !== e.id && (e.n.id = e.id),
            void 0 !== e.t && (e.n.textContent = e.t),
            e.s))
              e.s.hasOwnProperty(t) && (e.n.style[t] = e.s[t]);
            return e.n;
          },
          rgbToHex: function (e) {
            return "#" + s(e[0]) + s(e[1]) + s(e[2]);
          },
          getSVGGradient: function (e) {
            if (
              void 0 !== e &&
              -1 !=
                (e = _R_is_Editor ? RSColor.convert(e) : e).indexOf("gradient")
            ) {
              for (
                var t = b.getGradients(e),
                  i =
                    (void 0 === b.gradSVG &&
                      ((b.gradSVG = b.cNS({
                        n: "svg",
                        id: "tp_svg_gradients",
                        s: {
                          width: "100%",
                          height: "100%",
                          opacity: 0,
                          pointerEvents: "none",
                        },
                      })),
                      b.gradSVG.setAttribute("viewBox", "0 0 1 1"),
                      b.gradSVG.setAttribute("preserveAspectRatio", "none"),
                      document.body.appendChild(b.gradSVG),
                      (b.svgGradients = [])),
                    !1),
                  a = JSON.stringify(e),
                  r = 0;
                r < b.svgGradients.length;
                r++
              )
                i ||
                  (b.svgGradients[r].src == a &&
                    ((i = !0), (e = b.svgGradients[r].url)));
              if (!i) {
                for (
                  var o,
                    s =
                      "radialGradient" === t.type ? 0 : t.deg * (Math.PI / 180),
                    s =
                      "radialGradient" === t.type
                        ? 0
                        : {
                            x1: Math.round(50 + 50 * Math.sin(s)) + "%",
                            y1: Math.round(50 + 50 * Math.cos(s)) + "%",
                            x2:
                              Math.round(50 + 50 * Math.sin(s + Math.PI)) + "%",
                            y2:
                              Math.round(50 + 50 * Math.cos(s + Math.PI)) + "%",
                          },
                    n = b.cNS({
                      n: t.type,
                      id: "tp_svg_gradient_" + b.svgGradients.length,
                      v:
                        "radialGradient" === t.type
                          ? void 0
                          : {
                              gradientUnits: "userSpaceOnUse",
                              x1: s.x1,
                              y1: s.y1,
                              x2: s.x2,
                              y2: s.y2,
                            },
                    }),
                    l = 0;
                  l <= t.stops.length / 2;
                  l += 2
                )
                  (o = tpGS.gsap.utils.splitColor(t.stops[l])),
                    (o = b.cNS({
                      n: "stop",
                      v: {
                        offset: 100 * t.stops[l + 1] + "%",
                        stopColor: b.rgbToHex(o),
                        stopOpacity: 3 < o.length ? o[3] : 1,
                      },
                    })),
                    n.appendChild(o);
                b.gradSVG.appendChild(n),
                  (e = "url(#tp_svg_gradient_" + b.svgGradients.length + ")"),
                  b.svgGradients.push({ url: e, src: a, g: n });
              }
            }
            return e;
          },
          getGradients: function (e) {
            return 0 <= e.indexOf("radial-gradient")
              ? {
                  stops: b.getGradientColorStopPoints(
                    e.split("radial-gradient(ellipse at center, ")[1]
                  ),
                  type: "radialGradient",
                  deg: 0,
                }
              : -1 !== e.indexOf("gradient")
              ? b.getLinearGradientStops(e)
              : e;
          },
          getLinearGradientStops: function (e) {
            var t,
              i = e.split("linear-gradient(")[1],
              i = (
                1 <
                (e = (i = _R_is_Editor
                  ? (i = i.split(", ").join(",")).split(",rgba").join(", rgba")
                  : i).split("deg, ")).length
                  ? e[1]
                  : e[0]
              ).split(" "),
              e = 1 < e.length ? e[0] : 180;
            for (t in i)
              i.hasOwnProperty(t) &&
                0 <= i[t].indexOf("%") &&
                (i[t] =
                  "" +
                  Math.round(
                    100 * parseFloat(i[t].split("%,")[0].split("%)")[0])
                  ) /
                    1e4);
            return { stops: i, deg: e, type: "linearGradient" };
          },
          getGradientColorStopPoints: function (e) {
            for (
              var t = /rgb([\s\S]*?)%/g, i = [], a = [];
              (o = t.exec(e)) && i.push(o[0]), o;

            );
            for (var r = 0; r < i.length; r++) {
              var o = i[r],
                e = /rgb([\s\S]*?)\)/.exec(o),
                s = /\)([\s\S]*?)%/.exec(o);
              e[0] && (e = e[0]),
                s[1] && (s = s[1]),
                a.push(e),
                a.push(parseFloat(s) / 100);
            }
            return a;
          },
          calcLinearGradient: function (e, t, i, a) {
            a = (a * Math.PI) / 180 + Math.PI / 2;
            for (
              var r,
                o,
                s = t / 2,
                n = i / 2,
                l = Math.sqrt(s * s + n * n),
                d = {
                  x1: Math.cos(a) * l + s,
                  y1: Math.sin(a) * l + n,
                  x2: s,
                  y2: n,
                },
                c = [
                  h({ x: 0, y: 0 }, a),
                  h({ x: t, y: 0 }, a),
                  h({ x: t, y: i }, a),
                  h({ x: 0, y: i }, a),
                ],
                p = [],
                g = 0;
              g < c.length;
              g++
            )
              p.push(m(c[g], d));
            return (
              (l = (
                u(s, n, p[0].x, p[0].y) > u(s, n, p[1].x, p[1].y)
                  ? ((r = p[0].x), p[0])
                  : ((r = p[1].x), p[1])
              ).y),
              (t = (
                u(s, n, p[2].x, p[2].y) > u(s, n, p[3].x, p[3].y)
                  ? ((o = p[2].x), p[2])
                  : ((o = p[3].x), p[3])
              ).y),
              Math.round(100 * Math.atan2(n - l, s - r)) / 100 ==
                Math.round((a % (2 * Math.PI)) * 100) / 100 &&
                ((i = r), (n = l), (r = o), (l = t), (o = i), (t = n)),
              e.createLinearGradient(
                Math.round(r),
                Math.round(l),
                Math.round(o),
                Math.round(t)
              )
            );
          },
          transitions: {
            filter: {
              update: function (e, t, i) {
                void 0 !== e &&
                  void 0 !== e.tl &&
                  ((i =
                    void 0 !== i || void 0 !== e.tl.blur
                      ? " blur(" +
                        (void 0 !== i
                          ? i
                          : 0 + e.tl.blur !== void 0
                          ? e.tl.blur
                          : 0) +
                        "px)"
                      : ""),
                  (t.canvas.style.filter =
                    void 0 === e.tl.filter ? i : e.tl.filter + i));
              },
              extendTimeLine: function (e, t, i) {
                var a;
                null != t &&
                  ((a =
                    void 0 !== t.g && "0%" !== t.g && 0 !== t.g
                      ? ("" === a ? "" : " ") + "grayscale(_g_%)"
                      : ""),
                  "" !==
                    (a =
                      (a =
                        (a =
                          (a +=
                            void 0 !== t.h && "100%" !== t.h && 100 !== t.h
                              ? ("" === a ? "" : " ") + "brightness(_h_%)"
                              : "") +
                          (void 0 !== t.s && "0px" !== t.s && 0 !== t.s
                            ? ("" === a ? "" : " ") + "sepia(_s_%)"
                            : "")) +
                        (void 0 !== t.c && 100 !== t.c
                          ? ("" === a ? "" : " ") + "contrast(_c_%)"
                          : "")) +
                      (void 0 !== t.i && 0 !== t.i
                        ? ("" === a ? "" : " ") + "invert(_i_%)"
                        : "")) &&
                    (t.tl = {
                      filter: a
                        .replace("_g_", parseFloat(t.g))
                        .replace("_h_", parseFloat(t.h))
                        .replace("_s_", parseFloat(t.s))
                        .replace("_c_", parseFloat(t.c))
                        .replace("_i_", parseFloat(t.i)),
                    }),
                  void 0 !== t.b &&
                    "0px" !== t.b &&
                    0 !== t.b &&
                    (void 0 === t.tl
                      ? (t.tl = { blur: parseFloat(t.b) })
                      : (t.tl.blur = parseFloat(t.b))),
                  void 0 !== t.tl) &&
                  (e.add(
                    tpGS.gsap.to(
                      t.tl,
                      t.ms / t.sec,
                      void 0 === t.tl.filter
                        ? { blur: 0 }
                        : void 0 === t.tl.blur
                        ? {
                            filter: a
                              .replace("_g_", "0")
                              .replace("_h_", "100")
                              .replace("_s_", "0")
                              .replace("_c_", 100)
                              .replace("_i_", 0),
                            ease: t.e,
                          }
                        : {
                            blur: 0,
                            filter: a
                              .replace("_g_", "0")
                              .replace("_h_", "100")
                              .replace("_s_", "0")
                              .replace("_c_", 100)
                              .replace("_i_", 0),
                            ease: t.e,
                          }
                    ),
                    0
                  ),
                  (i.canvasFilter = !0));
              },
            },
            slidingoverlay: {
              getBasic: function () {
                return b.getBasic({
                  attr: ["x", "y"],
                  in: {
                    m: !0,
                    o: -1,
                    _xy: 20,
                    _gxys: 10,
                    _gxye: -10,
                    zIndex: 20,
                    e: e,
                  },
                  out: {
                    m: !0,
                    reversed: !1,
                    _xy: -100,
                    o: 0,
                    zIndex: 10,
                    e: e,
                  },
                });
              },
              updateAnim: function (e, t, i) {
                var a =
                    void 0 !== t.in.x && 0 !== t.in.x && "0%" !== t.in.x
                      ? "x"
                      : "y",
                  i =
                    ((t.in["g" + a + "s"] =
                      b.SATools.getOffset(t.in[a], t.in._gxys, i, 1) + "%"),
                    (t.in["g" + a + "e"] =
                      b.SATools.getOffset(t.in[a], t.in._gxye, i, 1) + "%"),
                    (t.out[a] =
                      b.SATools.getOffset(t.in[a], t.out._xy, i, 1) + "%"),
                    (t.in[a] =
                      b.SATools.getOffset(t.in[a], t.in._xy, i, 1) + "%"),
                    0 <= parseInt(t.in[a]));
                return (
                  (t.in.d =
                    "x" == a ? (i ? "left" : "right") : i ? "up" : "down"),
                  t
                );
              },
              beforeDraw: function (e, t, i, a) {
                void 0 !== i.d &&
                  ((i._dxs =
                    "right" === i.d ? 0 + i.mw : "left" === i.d ? 0 - i.mw : 0),
                  (i._dys =
                    "down" === i.d ? 0 + i.mh : "up" === i.d ? 0 - i.mh : 0),
                  (i._xs = "left" === i.d ? 0 - i.mw : 0),
                  (i._ys = "up" === i.d ? 0 - i.mh : 0),
                  (i._xe =
                    "right" === i.d
                      ? a.SLOT.OW + i.mw
                      : "left" === i.d
                      ? a.SLOT.OW - i.mw
                      : a.SLOT.OW),
                  (i._ye =
                    "down" === i.d
                      ? a.SLOT.OH + i.mh
                      : "up" === i.d
                      ? a.SLOT.OH - i.mh
                      : a.SLOT.OH),
                  t.beginPath(),
                  t.rect(
                    "left" === i.d
                      ? Math.max(0, i._xs)
                      : "right" === i.d
                      ? Math.min(0, i._xs)
                      : 0,
                    "up" === i.d
                      ? Math.max(0, i._ys)
                      : "down" === i.d
                      ? Math.min(0, i._ys)
                      : 0,
                    "left" === i.d
                      ? Math.max(a.SLOT.OW, i._xe)
                      : "right" === i.d
                      ? Math.min(a.SLOT.OW, i._xe)
                      : i._xe,
                    "up" === i.d
                      ? Math.max(a.SLOT.OH, i._ye)
                      : "down" === i.d
                      ? Math.min(a.SLOT.OH, i._ye)
                      : i._ye
                  ),
                  t.clip());
              },
              afterDraw: function (e, t, i, a, r) {
                void 0 !== i.d &&
                  (t.save(),
                  t.beginPath(),
                  t.rect(
                    Math.max(0, i._dxs),
                    Math.max(0, i._dys),
                    i._xe,
                    i._ye
                  ),
                  t.clip(),
                  t.save(),
                  t.transform(
                    r.csx,
                    r.ssx,
                    r.ssy,
                    r.csy,
                    0.5 * a.SLOT.OW + i.x + i.sgx,
                    0.5 * a.SLOT.OH + i.y + i.sgy
                  ),
                  t.drawImage(
                    void 0 !== a.shadowCanvas ? a.shadowCanvas : a.loadobj.img,
                    0,
                    0,
                    a.SLOT.OW,
                    a.SLOT.OH,
                    i.sgx - a.SLOT.OW / 2,
                    i.sgy - a.SLOT.OH / 2,
                    a.SLOT.OW,
                    a.SLOT.OH
                  ),
                  t.restore(),
                  (t.fillStyle = "rgba(0,0,0,0.6)"),
                  t.fillRect(i.gx, i.gy, a.SLOT.OW, a.SLOT.OH),
                  t.restore());
              },
              extendTimeLine: function (e, t, i, a, r, o) {
                "in" !== r.direction ||
                  (void 0 === a.gxe && void 0 === a.gye) ||
                  (jQuery.extend(!0, i[0], {
                    d: a.d,
                    gx:
                      void 0 === a.gxs
                        ? 0
                        : 2 * b.SATools.getOffset(a.gxs, o.width, r.sdir, 0),
                    gy:
                      void 0 === a.gys
                        ? 0
                        : 2 * b.SATools.getOffset(a.gys, o.height, r.sdir, 0),
                    sgx:
                      void 0 === a.gxs
                        ? 0
                        : b.SATools.getOffset(a.gxs, o.width, r.sdir, 0),
                    sgy:
                      void 0 === a.gys
                        ? 0
                        : b.SATools.getOffset(a.gys, o.height, r.sdir, 0),
                    mw: 0 - o.width,
                    mh: 0 - o.height,
                  }),
                  t.add(
                    tpGS.gsap.to(i, a.ms / a.sec, {
                      gx:
                        void 0 === a.gxe
                          ? 0
                          : 2 * b.SATools.getOffset(a.gxe, o.width, r.sdir, 0),
                      gy:
                        void 0 === a.gye
                          ? 0
                          : 2 * b.SATools.getOffset(a.gye, o.height, r.sdir, 0),
                      sgx:
                        void 0 === a.gxe
                          ? 0
                          : 2 * b.SATools.getOffset(a.gxe, o.width, r.sdir, 0),
                      sgy:
                        void 0 === a.gye
                          ? 0
                          : 2 * b.SATools.getOffset(a.gye, o.height, r.sdir, 0),
                      mw: o.width,
                      mh: o.height,
                      ease: a.e,
                    }),
                    0
                  ));
              },
            },
            motionFilter: {
              init: function (e, t) {
                return (
                  void 0 !== t && 0 < parseFloat(t)
                    ? ((t = parseFloat(t)),
                      (e.fmExists = !0),
                      (e.fmShadow =
                        void 0 === e.fmShadow
                          ? document.createElement("canvas")
                          : e.fmShadow),
                      (e.fmCtx = e.fmShadow.getContext("2d")),
                      (e.fmShadow.width = e.ctx.canvas.width),
                      (e.fmShadow.height = e.ctx.canvas.height),
                      (e.fmCtx.globalAlpha =
                        tpGS.gsap.utils.mapRange(100, 0, 40, 0, t) / 100),
                      e.fmCtx.clearRect(
                        0,
                        0,
                        e.ctx.canvas.width,
                        e.ctx.canvas.height
                      ))
                    : (e.fmExists = !1),
                  t
                );
              },
              render: function (e, t) {
                "partial" === t &&
                  (e.fmCtx.globalCompositeOperation = "source-over"),
                  e.fmCtx.drawImage(
                    e.canvas,
                    0,
                    0,
                    e.canvas.width,
                    e.canvas.height
                  ),
                  e.ctx.clearRect(0, 0, e.canvas.width, e.canvas.height),
                  e.ctx.drawImage(
                    e.fmCtx.canvas,
                    0,
                    0,
                    e.canvas.width,
                    e.canvas.height
                  ),
                  "partial" === t &&
                    (e.fmCtx.globalCompositeOperation = "source-atop"),
                  ("partial" !== t && "full" !== t) ||
                    ((e.fmCtx.fillStyle = "rgba(255, 255, 255, 0.1)"),
                    e.fmCtx.fillRect(0, 0, e.canvas.width, e.canvas.height));
              },
              clearFull: function (e, t) {
                e.fmExists &&
                  void 0 !== e.fmCtx &&
                  (e.ctx.clearRect(0, 0, e.canvas.width, e.canvas.height),
                  e.fmCtx.clearRect(0, 0, e.canvas.width, e.canvas.height),
                  void 0 !== t) &&
                  t.render(t.time(), !0, !0);
              },
              complete: function (e) {
                e.fmShadow && e.fmShadow.remove();
              },
            },
            d3: {
              ticker: function (e, t, i) {
                var a, r;
                void 0 !== e.helper &&
                  ((a = e.smi * ("in" === i ? e.helper.oo : e.helper.o)),
                  (r = e.sma * ("in" === i ? e.helper.oo : e.helper.o)),
                  (e.gradient =
                    "vertical" === e.d
                      ? "in" === i
                        ? t.ctx.createLinearGradient(0, 0, 0, t.canvas.height)
                        : t.ctx.createLinearGradient(0, t.canvas.height, 0, 0)
                      : "in" === i
                      ? t.ctx.createLinearGradient(0, 0, t.canvas.width, 0)
                      : t.ctx.createLinearGradient(t.canvas.width, 0, 0, 0)),
                  e.gradient.addColorStop(0, "rgba(" + e.sc + "," + a + ")"),
                  e.gradient.addColorStop(e.sl, "rgba(" + e.sc + "," + r + ")"),
                  (t.ctx.fillStyle = e.gradient),
                  t.ctx.fillRect(0, 0, t.canvas.width, t.canvas.height),
                  void 0 !== t.cube) &&
                  t.cube.ctx &&
                  ((a =
                    !1 !==
                    (i =
                      void 0 !== e.roomhelper &&
                      !1 !== e.roomhelper &&
                      (90 - e.roomhelper.r) / 90)
                      ? i
                      : e.smi * e.helper.o),
                  (r = !1 !== i ? i : e.sma * e.helper.o),
                  t.cube.ctx.clearRect(
                    0,
                    0,
                    t.cube.ctx.canvas.width,
                    t.cube.ctx.canvas.height
                  ),
                  (e.gradientW =
                    !1 !== i
                      ? "vertical" === e.d
                        ? (e.t < 0 && 1 === e.sdir) ||
                          (0 < e.t && -1 === e.sdir)
                          ? t.ctx.createRadialGradient(
                              0,
                              t.cube.ctx.canvas.width / 2,
                              0,
                              0,
                              0,
                              2 * t.cube.ctx.canvas.width
                            )
                          : t.ctx.createRadialGradient(
                              t.cube.ctx.canvas.width,
                              0,
                              0,
                              0,
                              0,
                              2 * t.cube.ctx.canvas.width
                            )
                        : (0 < e.t && 1 === e.sdir) ||
                          (e.t < 0 && -1 === e.sdir)
                        ? t.ctx.createRadialGradient(
                            t.cube.ctx.canvas.width / 2,
                            t.cube.ctx.canvas.height,
                            0,
                            t.cube.ctx.canvas.width / 2,
                            t.cube.ctx.canvas.height,
                            t.cube.ctx.canvas.width
                          )
                        : t.ctx.createRadialGradient(
                            t.cube.ctx.canvas.width / 2,
                            0.2 * t.cube.ctx.canvas.height,
                            0,
                            t.cube.ctx.canvas.width / 2,
                            0.2 * t.cube.ctx.canvas.height,
                            t.cube.ctx.canvas.width
                          )
                      : "vertical" === e.d
                      ? t.ctx.createLinearGradient(
                          0,
                          0,
                          0,
                          t.cube.ctx.canvas.height
                        )
                      : t.ctx.createLinearGradient(
                          0,
                          0,
                          t.cube.ctx.canvas.width,
                          0
                        )),
                  e.gradientW.addColorStop(
                    0,
                    "rgba(" +
                      e.sc +
                      "," +
                      (!1 !== i
                        ? "a" === e.DIR
                          ? r
                          : 0
                        : "a" === e.DIR
                        ? 0
                        : r) +
                      ")"
                  ),
                  e.gradientW.addColorStop(
                    1,
                    "rgba(" +
                      e.sc +
                      "," +
                      (!1 !== i
                        ? "a" === e.DIR
                          ? 0
                          : r
                        : "a" === e.DIR
                        ? r
                        : 0) +
                      ")"
                  ),
                  (t.cube.ctx.fillStyle = e.gradientW),
                  t.cube.ctx.fillRect(
                    0,
                    0,
                    t.cube.ctx.canvas.width,
                    t.cube.ctx.canvas.height
                  ));
              },
              setWall: function (e, t, i, a, r, o) {
                return (
                  (e.TL = tpGS.gsap.timeline()),
                  e.TL.add(tpGS.gsap.to(e.c, 0.2, { display: "block" }), 0),
                  "rotationX" === i
                    ? ((e.ctx.canvas.width = a.w),
                      (e.ctx.canvas.height = a.w),
                      e.TL.add(
                        tpGS.gsap.set(e.w, {
                          backgroundColor: r,
                          width: a.w,
                          height: a.w,
                          transformOrigin: "50% 50% -" + a.w / 2 + "px",
                          x: 0,
                          y: 0 < t ? -(a.w - a.h) : 0,
                          rotationX: 0 < t ? -90 : 90,
                          rotationY: 0,
                        }),
                        0
                      ))
                    : ((e.ctx.canvas.width = o ? a.w : a.h),
                      (e.ctx.canvas.height = a.h),
                      e.TL.add(
                        tpGS.gsap.set(e.w, {
                          backgroundColor: r,
                          width: o ? a.w : a.h,
                          height: a.h,
                          transformOrigin:
                            "50% 50% -" + (o ? a.w : a.h) / 2 + "px",
                          x: t < 0 ? a.w - a.h : 0,
                          y: 0,
                          rotationX: 0,
                          rotationY: 0 < t ? -90 : 90,
                        }),
                        0
                      )),
                  e.TL
                );
              },
              buildCube: function (e) {
                (e.cube = {
                  c: document.createElement("div"),
                  w: document.createElement("canvas"),
                }),
                  (e.cube.ctx = e.cube.w.getContext("2d")),
                  (e.cube.c.className = "rs_fake_cube"),
                  (e.cube.w.className = "rs_fake_cube_wall"),
                  tpGS.gsap.set(e.cube.c, {
                    width: e.mDIM.w,
                    height: e.mDIM.h,
                  }),
                  tpGS.gsap.set(e.cube.w, {
                    width: e.mDIM.w,
                    height: e.mDIM.h,
                    backgroundColor: "#ccc",
                  }),
                  e.cube.c.appendChild(e.cube.w),
                  e.sbg.appendChild(e.cube.c);
              },
              cubeTL: function (e, t, i, a) {
                var r, o, s, n, l, d, c, p, g, u, h, m, v, f, y, w;
                if ("none" !== t.f && void 0 !== t.f)
                  return (
                    (i.sbg.style.transformStyle = "preserve-3d"),
                    (r = tpGS.gsap.timeline()),
                    (o = "incube" === t.f ? 1 : -1),
                    (s = "incube" === t.f || "cube" === t.f),
                    (f = "fly" === t.f ? -30 : 90),
                    (n =
                      "turn" !== t.f &&
                      !1 !== t.t &&
                      (_R_is_Editor || !0 === b[e].firstSlideAnimDone)),
                    (l = -1 * t.z),
                    (d = {}),
                    (c = { z: n ? 0 : l, ease: "power1.inOut" }),
                    (p = { ease: t.e }),
                    (g = [i.canvas]),
                    (u = s ? "50% 50% " : "20% 20% "),
                    (h = "rotationX"),
                    (m = "rotationY"),
                    (w = "y"),
                    (y = "height"),
                    (v = t.fd),
                    "vertical" !== t.d
                      ? ((h = "rotationY"),
                        (m = "rotationX"),
                        (w = "x"),
                        (y = "width"),
                        (t.DIR = 1 === t.sdir ? "b" : "a"))
                      : (t.DIR = 1 === t.sdir ? "a" : "b"),
                    (y = "width" === y ? "w" : "height" === y ? "h" : y),
                    "turn" === t.f
                      ? ((f = "vertical" === t.d ? -120 : 120),
                        (u =
                          "vertical" === t.d
                            ? 1 === t.sdir
                              ? "in" === a
                                ? "0% 0% 0%"
                                : "0% 100% 0%"
                              : "in" === a
                              ? "0% 100% 0%"
                              : "0% 0% 0%"
                            : 1 === t.sdir
                            ? "in" === a
                              ? "0% 0% 0%"
                              : "100% 0% 0%"
                            : "in" === a
                            ? "100% 0% 0%"
                            : "0% 0% 0%"),
                        (c.z = 0),
                        (p.ease = "out" === a ? "power3.out" : p.ease),
                        (v = "out" === a ? v / 2 : v))
                      : (u += (o * i.mDIM[y]) / 2 + "px"),
                    (p[h] = 0),
                    (p[w] = 0),
                    "in" === a ? (d[h] = f * t.sdir) : (p[h] = -f * t.sdir),
                    "fly" === t.f &&
                      ((f =
                        void 0 === t.fz
                          ? 20 * Math.random() - 10
                          : parseInt(t.fz)),
                      "in" === a
                        ? ((d[w] =
                            i.mDIM[y] *
                            (void 0 === t.fdi ? 1.5 : parseFloat(t.fdi)) *
                            t.sdir),
                          (d.rotateZ = t.sdir * f),
                          (p.rotateZ = 0))
                        : ((p[w] =
                            i.mDIM[y] *
                            (void 0 === t.fdo ? 2 : parseFloat(t.fdo)) *
                            t.sdir *
                            -1),
                          (p.rotateZ = t.sdir * f * -1))),
                    (i.sbg.style.perspective = n ? "2500px" : "1500px"),
                    n
                      ? ((w = { z: 0, ease: "power1.inOut" }),
                        ((y = {
                          z: l * ("fly" === t.f ? 1.5 : 3),
                          ease: "power1.inOut",
                        })[m] = -1 * t.t),
                        (t.roomhelper = { r: (w[m] = 0) }),
                        r.add(
                          tpGS.gsap.set(
                            _R_is_Editor
                              ? RVS.SBGS[RVS.S.slideId].wrap
                              : i.wrap[0],
                            {
                              perspective: 1200,
                              transformStyle: "preserve-3d",
                              transformOrigin: u,
                            }
                          ),
                          0
                        ),
                        r.add(tpGS.gsap.to(i.sbg, 3 * t.md, y), 0),
                        r.add(tpGS.gsap.to(i.sbg, 3 * t.md, w), v - t.md),
                        r.add(
                          tpGS.gsap.to(t.roomhelper, 3 * t.md, {
                            r: Math.abs(t.t),
                          }),
                          0
                        ),
                        r.add(
                          tpGS.gsap.to(t.roomhelper, 3 * t.md, { r: 0 }),
                          v - t.md
                        ),
                        "in" === a &&
                          1 != o &&
                          s &&
                          (void 0 === i.cube && b.transitions.d3.buildCube(i),
                          r.add(
                            b.transitions.d3.setWall(
                              i.cube,
                              y[m],
                              m,
                              i.mDIM,
                              t.c
                            ),
                            0
                          ),
                          g.push(i.cube.c)))
                      : ((t.roomhelper = !1),
                        r.add(
                          tpGS.gsap.set(
                            _R_is_Editor
                              ? RVS.SBGS[RVS.S.slideId].wrap
                              : i.wrap[0],
                            {
                              perspective: "none",
                              transformStyle: "none",
                              transformOrigin: "50% 50%",
                            }
                          ),
                          0
                        ),
                        !_R_is_Editor &&
                          !0 !== b[e].firstSlideAnimDone &&
                          s &&
                          (void 0 === i.cube && b.transitions.d3.buildCube(i),
                          r.add(
                            b.transitions.d3.setWall(
                              i.cube,
                              d[h],
                              h,
                              i.mDIM,
                              t.c,
                              !0
                            ),
                            0
                          ),
                          r.add(
                            tpGS.gsap.fromTo(
                              i.cube.w,
                              4 * t.md,
                              { opacity: 0 },
                              { opacity: 1 }
                            ),
                            0
                          ),
                          g.push(i.cube.c))),
                    (t.helper = { o: 0, oo: 1 }),
                    r.add(
                      tpGS.gsap.to(t.helper, v, { o: 1, oo: 0, ease: t.e }),
                      t.md + 0
                    ),
                    r.add(
                      tpGS.gsap.set(
                        g,
                        jQuery.extend(!0, {}, d, {
                          force3D: !0,
                          transformOrigin: u,
                        })
                      ),
                      0
                    ),
                    "turn" !== t.f && r.add(tpGS.gsap.to(g, 3 * t.md, c), 0),
                    r.add(tpGS.gsap.to(g, v, p), t.md + 0),
                    "turn" !== t.f &&
                      r.add(
                        tpGS.gsap.to(g, 3 * t.md, {
                          z: 0,
                          ease: "power1.inOut",
                        }),
                        v - t.md
                      ),
                    "out" === a &&
                      1 != o &&
                      r.add(
                        tpGS.gsap.to(g, 2 * t.md, { opacity: 0 }),
                        t.dur - 2 * t.md
                      ),
                    r
                  );
              },
            },
          },
          animatedCanvasUpdate: function (e, t) {
            (t.cDIMS = b.getBGCanvasDetails(e, t)),
              (t.canvas.style.backgroundColor = "transparent"),
              (t.canvas.style.opacity = 1),
              t.canvas.width !== t.mDIM.width &&
                (t.canvas.width = t.mDIM.width),
              t.canvas.height !== t.mDIM.height &&
                (t.canvas.height = t.mDIM.height),
              _R_is_Editor ||
                !0 !== b[e].clearModalBG ||
                (t.ctx.clearRect(0, 0, t.canvas.width, t.canvas.height),
                (b[e].clearModalBG = !1),
                (t.sbg.parentNode.style.opacity = 1)),
              (t.col = Math.min(t.col || 1, t.canvas.width - 10)),
              (t.row = Math.min(t.row || 1, t.canvas.height - 10)),
              (t.SLOT = jQuery.extend(
                !0,
                { s: {}, c: {} },
                i(e, t.col, t.row, t.mDIM, "OW", "OH")
              )),
              (t.SLOT.DX = 0 - t.SLOT.OW / 2),
              (t.SLOT.DY = 0 - t.SLOT.OH / 2),
              (t.row = Math.ceil(t.mDIM.height / t.SLOT.OH) || 1),
              void 0 !== t.callFromAnimatedCanvasUpdate &&
                t.callFromAnimatedCanvasUpdate();
          },
          slideAnimFinished: function (e, t, i, a) {
            void 0 !== t &&
              (void 0 !== t.bgvid &&
                0 < t.bgvid.length &&
                "out" === i.direction &&
                ((t.drawVideoCanvasImagesRecall = !1),
                b.stopVideo(t.bgvid, e),
                (t.bgvid[0].style.display = "none"),
                (t.bgvid[0].style.zIndex = 0)),
              t.panFake &&
                t.panFake.img &&
                ("out" === i.direction
                  ? (t.panFake.img.style.display = "none")
                  : (t.panFake.img.style.display = "block")),
              "in" === i.direction &&
                (b.transitions.motionFilter.complete(t),
                (t.ctx.canvas.style.filter = "none"),
                tpGS.gsap.set(i.slide, { zIndex: 20 }),
                delete t.animateDirection,
                0 < t.bgvid.length) &&
                (t.isHTML5
                  ? tpGS.gsap.set(t.bgvid[0], {
                      zIndex: 30,
                      display: "block",
                      opacity: 1,
                    })
                  : (b.resetVideo(t.bgvid, e),
                    tpGS.gsap.delayedCall(0.1, function () {
                      b.playVideo(t.bgvid, e, !0),
                        tpGS.gsap.set(t.bgvid[0], {
                          zIndex: 30,
                          display: "block",
                          opacity: 1,
                        });
                    }))),
              "out" === i.direction
                ? (tpGS.gsap.set(i.slide, { zIndex: 10 }),
                  tpGS.gsap.set(t.canvas, {
                    rotationX: 0,
                    rotationY: 0,
                    rotationZ: 0,
                    x: 0,
                    y: 0,
                    z: 0,
                    opacity: 1,
                  }),
                  (t.currentState = void 0))
                : (t.currentState = "idle"),
              void 0 !== t.cube && (t.cube.c.style.display = "none"),
              "in" === i.direction) &&
              (b.updateSlideBGs(e, t.skeyindex, t),
              void 0 === t.panzoom ||
                _R_is_Editor ||
                b.startPanZoom(
                  b[e].pr_next_bg,
                  e,
                  void 0 !== b[e].panzoomTLs[t.skeyindex]
                    ? b[e].panzoomTLs[t.skeyindex].progress()
                    : 0,
                  t.skeyindex,
                  "play",
                  t.key
                ),
              void 0 !== i.BG) &&
              !0 !== a &&
              i.BG.ctx.clearRect(0, 0, 2 * t.canvas.width, 2 * t.canvas.height);
          },
          animateCore: function (r, o, s, n) {
            var l,
              d,
              e,
              c,
              p = o.canvas,
              g = o.ctx,
              u = 0;
            if (((o.col = s.col), (o.row = s.row), _R_is_Editor && o.three)) {
              for (
                o.canvas.style.display = "block";
                0 < o.three.scene.children.length;

              )
                o.three.scene.remove(o.three.scene.children[0]);
              o.three.canvas.parentNode.removeChild(o.three.canvas),
                (o.three = void 0);
            }
            b.animatedCanvasUpdate(r, o),
              (s.row = o.row),
              (o.animateDirection = n.direction),
              (n.delay = void 0 === n.delay ? 0 : n.delay),
              (e = s.col * s.row),
              (c = Array(e)),
              void 0 === o.help_canvas &&
                "out" === n.direction &&
                void 0 !== n.bgColor &&
                ((o.help_canvas = document.createElement("canvas")),
                (o.help_ctx = o.help_canvas.getContext("2d")),
                (o.help_canvas.style.backgroundColor = "transparent")),
              "out" === n.direction &&
                void 0 !== n.bgColor &&
                ((o.help_canvas.width = o.mDIM.width),
                (o.help_canvas.height = o.mDIM.height),
                (o.help_ctx.fillStyle = n.bgColor),
                o.help_ctx.fillRect(0, 0, o.mDIM.width, o.mDIM.height)),
              (s.mo = b.transitions.motionFilter.init(o, s.mo)),
              (s.dur = s.ms / s.sec),
              void 0 !== n.d3 &&
                ((n.d3.dur = s.dur),
                (n.d3.fd = 0.7 * s.dur),
                (n.d3.md = 0.15 * s.dur),
                (n.d3.sdir = n.sdir)),
              (o.SLOT.c = { ws: 0, hs: 0, wd: 0, hd: 0 }),
              0 < s.mo && _R_is_Editor && g.clearRect(0, 0, p.width, p.height);
            var t = tpGS.gsap.timeline({
              onUpdate: function () {
                if (
                  ((u = 0) < s.mo
                    ? b.transitions.motionFilter.render(o, s.moo)
                    : g.clearRect(0, 0, p.width, p.height),
                  o.help_canvas &&
                    "out" === n.direction &&
                    g.drawImage(o.help_canvas, 0, 0),
                  ((n.filter && n.filter.u) || !_R_is_Editor) &&
                    b.transitions.filter.update(
                      n.filter,
                      g,
                      o.canvasFilterBlur
                    ),
                  _R_is_Editor &&
                    0 !== s.zIndex &&
                    void 0 !== s.zIndex &&
                    tpGS.gsap.set(n.slide, { zIndex: s.zIndex }),
                  void 0 !== o.shadowCanvas)
                )
                  for (l = 0; l < s.col; l++)
                    for (
                      o.SLOT.SX = o.SLOT.OW * l,
                        o.SLOT.tw = o.SLOT.OW * (l + 0.5),
                        o.SLOT.c.wd =
                          o.mDIM.width - (o.SLOT.tw + o.SLOT.DX + o.SLOT.OW),
                        o.SLOT.c.wd = o.SLOT.c.wd < 0 ? o.SLOT.c.wd : 0,
                        o.SLOT.DW = o.SLOT.SW = o.SLOT.OW + o.SLOT.c.wd,
                        d = 0;
                      d < s.row;
                      d++
                    ) {
                      g.save();
                      var e = (-Math.PI / 180) * c[u].r,
                        t = 0 !== s.r ? Math.cos(e) * c[u].sx : c[u].sx,
                        i = 0 !== s.r ? Math.cos(e) * c[u].sy : c[u].sy,
                        a = 0 !== s.r ? Math.sin(e) * c[u].sx : 0,
                        e = 0 !== s.r ? Math.sin(e) * -c[u].sy : 0;
                      (o.SLOT.SY = o.SLOT.OH * d),
                        (o.SLOT.th = o.SLOT.OH * (d + 0.5)),
                        b.transitions[n.effect] &&
                          b.transitions[n.effect].beforeDraw &&
                          b.transitions[n.effect].beforeDraw(r, g, c[u], o),
                        s.m &&
                          (g.beginPath(),
                          g.rect(
                            o.SLOT.OW * l,
                            o.SLOT.OH * d,
                            o.SLOT.OW,
                            o.SLOT.OH
                          ),
                          g.clip()),
                        g.transform(
                          t,
                          a,
                          e,
                          i,
                          o.SLOT.tw + c[u].x,
                          o.SLOT.th + c[u].y
                        ),
                        (g.globalAlpha = Math.max(0, c[u].o)),
                        (o.SLOT.c.hd =
                          o.mDIM.height - (o.SLOT.th + o.SLOT.DY + o.SLOT.OH)),
                        (o.SLOT.c.hd = o.SLOT.c.hd < 0 ? o.SLOT.c.hd : 0),
                        (o.SLOT.DH = o.SLOT.SH = o.SLOT.OH + o.SLOT.c.hd),
                        1 < o.SLOT.SW &&
                          1 < o.SLOT.SH &&
                          g.drawImage(
                            o.shadowCanvas,
                            o.SLOT.SX,
                            o.SLOT.SY,
                            o.SLOT.SW,
                            o.SLOT.SH,
                            o.SLOT.DX,
                            o.SLOT.DY,
                            o.SLOT.DW,
                            o.SLOT.DH
                          ),
                        g.restore(),
                        b.transitions[n.effect] &&
                          b.transitions[n.effect].afterDraw &&
                          b.transitions[n.effect].afterDraw(r, g, c[u], o, {
                            csx: t,
                            csy: i,
                            ssx: a,
                            ssy: e,
                          }),
                        u++;
                    }
                void 0 !== n.d3 &&
                  n.d3.su &&
                  b.transitions.d3.ticker(n.d3, o, n.direction),
                  (o.currentState = "animating");
              },
              onComplete: function () {
                b.slideAnimFinished(r, o, n);
              },
            });
            if (
              (s.col * s.row < 2 && (s.f = "start"),
              0 !== s.zIndex &&
                void 0 !== s.zIndex &&
                t.add(
                  tpGS.gsap.set(n.slide, { zIndex: parseInt(s.zIndex, 0) }),
                  0
                ),
              (s.m = "false" != s.m && !1 !== s.m),
              "in" === n.direction)
            ) {
              for (l = 0; l < e; l++)
                c[l] = {
                  x: b.SATools.getOffset(
                    s.x,
                    s.m ? o.SLOT.OW : o.mDIM.width,
                    n.sdir,
                    l
                  ),
                  y: b.SATools.getOffset(
                    s.y,
                    s.m ? o.SLOT.OH : o.mDIM.height,
                    n.sdir,
                    l
                  ),
                  o: b.SATools.getSpecialValue(s.o, l, n.sdir),
                  sx: b.SATools.getSpecialValue(s.sx, l, n.sdir),
                  sy: b.SATools.getSpecialValue(s.sy, l, n.sdir),
                  r: 0 !== s.r ? b.SATools.getSpecialValue(s.r, l, n.sdir) : 0,
                };
              t.add(
                tpGS.gsap.to(c, s.dur, {
                  o: 1,
                  sx: 1,
                  sy: 1,
                  r: 0,
                  x: 0,
                  y: 0,
                  ease: s.e,
                  stagger: {
                    amount: "nodelay" === s.f ? 0 : s.ms / s.stasec,
                    grid: [s.col, s.row],
                    from: "nodelay" === s.f ? "start" : s.f,
                  },
                }),
                n.delay
              ),
                void 0 !== n.d3 &&
                  t.add(b.transitions.d3.cubeTL(r, n.d3, o, "in"), 0),
                b.transitions.filter.extendTimeLine(t, n.filter, o);
            } else {
              for (l = 0; l < e; l++)
                c[l] = { x: 0, y: 0, o: 1, sx: 1, sy: 1, r: 0 };
              t.add(
                tpGS.gsap.to(c, s.dur, {
                  o: function (e) {
                    return b.SATools.getSpecialValue(s.o, e, n.sdir);
                  },
                  sx: function (e) {
                    return b.SATools.getSpecialValue(s.sx, e, n.sdir);
                  },
                  sy: function (e) {
                    return b.SATools.getSpecialValue(s.sy, e, n.sdir);
                  },
                  r:
                    0 !== s.r && void 0 !== s.r
                      ? function (e) {
                          return b.SATools.getSpecialValue(s.r, e, n.sdir);
                        }
                      : 0,
                  x: function (e) {
                    return (
                      b.SATools.getOffset(
                        s.x,
                        s.m ? o.SLOT.OW : o.mDIM.width,
                        n.sdir,
                        e
                      ) * (s.reversed ? -1 : 1)
                    );
                  },
                  y: function (e) {
                    return (
                      b.SATools.getOffset(
                        s.y,
                        s.m ? o.SLOT.OH : o.mDIM.height,
                        n.sdir,
                        e
                      ) * (s.reversed ? -1 : 1)
                    );
                  },
                  ease: s.e,
                  stagger: {
                    amount: "nodelay" === s.f ? 0 : s.ms / s.stasec,
                    grid: [s.col, s.row],
                    from: "nodelay" === s.f ? "start" : s.f,
                  },
                }),
                n.delay + (void 0 !== s.outdelay ? s.outdelay : 0)
              ),
                void 0 !== n.d3 &&
                  t.add(b.transitions.d3.cubeTL(r, n.d3, o, "out"), 0);
            }
            b.transitions[n.effect] &&
              b.transitions[n.effect].extendTimeLine &&
              b.transitions[n.effect].extendTimeLine(r, t, c, s, n, o.mDIM),
              _R_is_Editor
                ? RVS.TL[RVS.S.slideId].slide.add(t, 0)
                : b[r].mtl.add(t, n.delay);
          },
        }),
        function (e, t) {
          return void 0 !== t && b.isNumeric(t)
            ? parseFloat(t, 0)
            : null == t || "default" === t || "d" === t
            ? e
            : t;
        }),
      i = function (e, t, i, a, r, o) {
        var s = {};
        return (
          (s[r] = Math.ceil(a.width / t)),
          (s[o] = (_R_is_Editor, Math.ceil(a.height / i))),
          s
        );
      },
      l = function (e) {
        return null == e || 0 === e || NaN === e ? 1 : e;
      },
      a = function (e, t) {
        _R_is_Editor || (b[e].duringslidechange = !0);
        var i,
          a = _R_is_Editor
            ? -1
            : "arrow" != b[e].sc_indicator || void 0 === b[e].sc_indicator_dir
            ? b[e].sdir
            : b[e].sc_indicator_dir,
          r =
            !!_R_is_Editor ||
            (void 0 !== b[e].pr_next_bg &&
              0 < b[e].pr_next_bg.length &&
              void 0 !== b[e].pr_next_bg[0]),
          o =
            !!_R_is_Editor ||
            (void 0 !== b[e].pr_active_bg &&
              0 < b[e].pr_active_bg.length &&
              void 0 !== b[e].pr_active_bg[0]),
          r = _R_is_Editor
            ? RVS.SBGS[RVS.S.slideId].n
            : r
            ? b[e].sbgs[b[e].pr_next_bg[0].dataset.key]
            : void 0,
          s = _R_is_Editor
            ? RVS.SBGS[RVS.S.slideId].c
            : o
            ? b[e].sbgs[b[e].pr_active_bg[0].dataset.key]
            : void 0,
          a = 1 === a ? -1 : 1;
        _R_is_Editor ||
          (delete b[e].sc_indicator, delete b[e].sc_indicator_dir),
          (i = jQuery.extend(
            !0,
            {},
            (function (e, t, i) {
              var a,
                r,
                o = (
                  void 0 !== b.transitions[t.anim.e] &&
                  void 0 !== b.transitions[t.anim.e].getBasic
                    ? b.transitions[t.anim.e]
                    : b
                ).getBasic();
              (o.out = null == o.out ? {} : o.out),
                (o.out.reversed =
                  void 0 === t.out &&
                  (void 0 === o.out.reversed || o.out.reversed)),
                void 0 !== t.iw && parseInt(t.iw, 0),
                void 0 !== t.ow && parseInt(t.ow, 0);
              for (r in o.attr)
                (a = o.attr[r]),
                  (o.in[a] = n(o.in[a], t.in[a])),
                  (o.out[a] = o.out.reversed
                    ? o.in[a]
                    : void 0 === t.out
                    ? o.out[a]
                    : n(o.out[a], t.out[a]));
              return (
                (o.filter =
                  void 0 !== t.filter
                    ? jQuery.extend(!0, t.filter, t.filter)
                    : o.filter),
                ((o =
                  b.transitions[t.anim.e] && b.transitions[t.anim.e].updateAnim
                    ? b.transitions[t.anim.e].updateAnim(e, o, i)
                    : o).e = t.anim.e),
                void 0 !== o.in &&
                  ((o.in.col =
                    "random" === o.in.col
                      ? tpGS.gsap.utils.random(1, 10, 1)
                      : l(o.in.col)),
                  (o.in.row =
                    "random" === o.in.row
                      ? tpGS.gsap.utils.random(1, 10, 1)
                      : l(o.in.row))),
                void 0 !== o.out &&
                  ((o.out.col =
                    "random" === o.out.col
                      ? tpGS.gsap.utils.random(1, 10, 1)
                      : l(o.out.col)),
                  (o.out.row =
                    "random" === o.out.row
                      ? tpGS.gsap.utils.random(1, 10, 1)
                      : l(o.out.row))),
                o
              );
            })(e, t, a)
          )),
          void 0 !== r.random &&
            void 0 !== b.SLTR &&
            void 0 !== s &&
            (delete s.help_canvas, delete s.help_ctx),
          (i.ms = n(void 0, void 0 === t.anim.ms ? 1e3 : t.anim.ms)),
          (i.f = n(void 0, t.anim.f)),
          (i.p = n(void 0, t.anim.p)),
          (i.d = n(void 0, t.anim.d)),
          (i.o = t.anim.o),
          void 0 !== t.d3 &&
            ((t.d3.t = void 0 !== t.d3.t && 0 !== t.d3.t && t.d3.t),
            (t.d3.su = "true" == t.d3.su || 1 == t.d3.su),
            t.d3.su &&
              ((t.d3.smi = void 0 === t.d3.smi ? 0 : parseFloat(t.d3.smi)),
              (t.d3.sl = void 0 === t.d3.sl ? 1 : parseFloat(t.d3.sl)),
              (t.d3.sma = void 0 === t.d3.sma ? 0.5 : parseFloat(t.d3.sma)),
              (t.d3.sc =
                void 0 === t.d3.sc
                  ? "0,0,0"
                  : tpGS.gsap.utils.splitColor(t.d3.sc).join(","))),
            (i.p = "none"),
            void 0 !== i.in.row) &&
            void 0 !== i.in.col &&
            200 < i.in.row * i.in.col &&
            (i.filter = void 0),
          (i.in.sec = void 0 === i.in.sec ? 1e3 : i.in.sec),
          (i.in.stasec =
            void 0 === i.in.stasec
              ? void 0 === i.d
                ? 1500
                : 100 * i.d
              : i.in.stasec),
          (i.in.ms =
            "default" === i.ms || "d" === i.ms
              ? i.in.ms
              : "random" === i.ms
              ? Math.round(1e3 * Math.random() + 300)
              : null != i.ms
              ? parseInt(i.ms, 0)
              : i.in.ms),
          (i.out.ms = i.in.ms),
          void 0 !== i.filter &&
            ((i.filter.ms = i.in.ms),
            (i.filter.sec = i.in.sec),
            (i.filter.e = (
              void 0 === i.filter.e || "default" === i.filter.e
                ? i.in
                : i.filter
            ).e)),
          (i.in.f = (
            void 0 === i.f || "default" === i.f || "d" === i.f ? i.in : i
          ).f),
          (i.in.f =
            "slidebased" === i.in.f
              ? 1 == a
                ? "start"
                : "end"
              : "oppslidebased" === i.in.f
              ? 1 == a
                ? "end"
                : "start"
              : i.in.f),
          (i.out.f = i.in.f),
          (i.out = jQuery.extend(!0, {}, i.in, i.out)),
          (i.in.eng = i.out.eng = t.anim.eng),
          void 0 !== i.out.eng &&
            null == b[i.out.eng] &&
            ((i.out.o = 0),
            (i.in.o = 0),
            (i.in.ms = i.out.ms = 1e3),
            (i.in.eng = i.out.eng = "animateCore")),
          void 0 !== i.p &&
            "none" !== i.p &&
            ((i.in.bg =
              "dark" === i.p
                ? "#000"
                : "light" === i.p
                ? "#fff"
                : "transparent"),
            (i.out.delay =
              "none" !== i.p
                ? function (e, t) {
                    return e / 2.5;
                  }
                : 0),
            1 === i.out.o) &&
            0 === i.out.x &&
            0 === i.out.y &&
            (i.out.o = 0),
          "forceinout" === i.o
            ? ((i.in.zIndex = 20), (i.out.zIndex = 10))
            : ("outin" !== i.o &&
                (1 !== i.in.o ||
                  0 !== i.in.x ||
                  0 !== i.in.y ||
                  void 0 === t.out ||
                  (1 === i.out.o && 0 === i.out.x && 0 === i.out.y))) ||
              ((i.in.zIndex = 10), (i.out.zIndex = 20)),
          0 < r.bgvid.length && (i.in = c(e, i.in, r, "in")),
          o &&
            void 0 !== s.bgvid &&
            0 < s.bgvid.length &&
            (i.out = c(e, i.out, s, "out")),
          void 0 !== i.out &&
            (i.out.simplify || i.in.simplify) &&
            (i.out = d(i.out)),
          i.in.simplify && (i.in = d(i.in)),
          _R_is_Editor ||
            requestAnimationFrame(function () {
              b.generalObserver(b.ISM, !0);
            }),
          (i.in.eng = void 0 === i.in.eng ? "animateCore" : i.in.eng),
          (i.out.eng = void 0 === i.out.eng ? "animateCore" : i.out.eng),
          o &&
            !0 !== i.out.skip &&
            b[i.out.eng](e, s, i.out, {
              effect: i.e,
              slide: _R_is_Editor
                ? RVS.SBGS[RVS.S.slideId].c.sbg
                : b[e].pr_active_slide,
              direction: "out",
              delay: 0,
              bgColor: i.in.bg,
              sdir: a,
              filter: void 0,
              d3: t.d3,
              addOns: _R_is_Editor ? t.addOns : void 0,
            }),
          !0 !== i.in.skip &&
            b[i.in.eng](e, r, i.in, {
              effect: i.e,
              slide: _R_is_Editor
                ? RVS.SBGS[RVS.S.slideId].n.sbg
                : b[e].pr_next_slide,
              direction: "in",
              delay: o
                ? "function" == typeof i.out.delay
                  ? i.out.delay(i.in.ms / 1e3, i.out.row * i.out.col)
                  : i.out.delay
                : i.in.delay,
              BG: s,
              outslide: _R_is_Editor
                ? RVS.SBGS[RVS.S.slideId].c.sbg
                : b[e].pr_active_slide,
              sdir: a,
              filter: i.filter,
              d3: t.d3,
              addOns: _R_is_Editor ? t.addOns : void 0,
            });
      },
      r = function (e, t, i) {
        var a = e.height / e.width,
          a =
            ((i.ratio = i.conth / i.contw),
            (i.ratio < a && "contain" === t.bgfit) ||
            (i.ratio > a && "cover" === t.bgfit)
              ? (i.height = e.width * i.ratio)
              : (i.ratio > a && "contain" === t.bgfit) ||
                (i.ratio < a && "cover" === t.bgfit)
              ? (i.width = (e.width * a) / i.ratio)
              : i.ratio !== a || ("contain" !== t.bgfit && "cover" !== t.bgfit)
              ? (1 === (a = t.bgfit.split(" ")).length && (a[1] = a[0]),
                (i.width =
                  "auto" === a[0]
                    ? i.contw
                    : e.width * (parseInt(a[0], 0) / 100)),
                (i.height = "auto" === a[1] ? i.conth : i.width * i.ratio),
                (t.usepattern = !0))
              : (i.width = e.width),
            (a = e),
            (e = i),
            1 === (t = (t = t.bgposition).split(" ")).length && (t[1] = t[0]),
            {
              x:
                "center" === t[0] || "50%" === t[0]
                  ? (a.width - e.width) / 2
                  : "left" === t[0]
                  ? 0
                  : "right" === t[0]
                  ? a.width - e.width
                  : b.isNumeric(t[0])
                  ? 0
                  : 0 <= t[0].indexOf("%")
                  ? (parseInt(t[0], 0) / 100) * a.width -
                    (parseInt(t[0], 0) / 100) * e.width
                  : parseInt(t[0], 0),
              y:
                "center" === t[1] || "50%" === t[1]
                  ? (a.height - e.height) / 2
                  : "top" === t[1]
                  ? 0
                  : "bottom" === t[1]
                  ? a.height - e.height
                  : b.isNumeric(t[1])
                  ? 0
                  : 0 <= t[1].indexOf("%")
                  ? (parseInt(t[1], 0) / 100) * a.height -
                    (parseInt(t[1], 0) / 100) * e.height
                  : parseInt(t[1], 0),
            });
        return (i.x = a.x), (i.y = a.y), i;
      },
      d = function (e) {
        return (
          (e.o = 0),
          (e.r = 0),
          (e.row = 1),
          (e.col = 1),
          (e.x = 0),
          (e.y = 0),
          (e.sx = 1),
          (e.sy = 1),
          e
        );
      },
      o = function (e) {
        return (e =
          "false" !== e &&
          !1 !== e &&
          "off" !== e &&
          void 0 !== e &&
          0 !== e &&
          -1 !== e);
      },
      s = function (e) {
        e = e.toString(16);
        return 1 == e.length ? "0" + e : e;
      },
      c = function (e, t, i, a) {
        return (
          (t.skip = !1),
          "in" === a
            ? i.isHTML5
              ? ((i.bgvid[0].style.display = "none"),
                b.resetVideo(i.bgvid, e),
                (i.animateDirection = "in"),
                (i.currentState = "animating"),
                (i.drawVideoCanvasImagesRecall = !0),
                b.updateVideoFrames(e, i, !0),
                b.playVideo(i.bgvid, e))
              : ((b[e].videos[i.bgvid[0].id].pauseCalled = !1),
                (t.waitToSlideTrans =
                  b[e].videos[i.bgvid[0].id].waitToSlideTrans),
                !0 !== i.poster
                  ? (b.resetVideo(i.bgvid, e),
                    !(b[e].videos[i.bgvid[0].id].prePlayForaWhile = !1) !==
                      t.waitToSlideTrans && b.playVideo(i.bgvid, e, !0),
                    tpGS.gsap.fromTo(
                      i.bgvid,
                      t.ms / t.sec,
                      { zIndex: 30, display: "block", opacity: 0 },
                      { opacity: 1, zIndex: 30, display: "block" }
                    ),
                    (i.loadobj.bgColor = !0),
                    (i.bgcolor = "#000"),
                    (t.simplify = !0))
                  : ((b[e].videos[i.bgvid[0].id].prePlayForaWhile = !1),
                    b.resetVideo(i.bgvid, e),
                    b.playVideo(i.bgvid, e),
                    (i.bgvid[0].style.display = "none"),
                    (i.bgvid[0].style.zIndex = 0),
                    (i.bgvid[0].style.opacity = 0)))
            : "out" === a &&
              (i.isHTML5
                ? ((i.currentState = "animating"),
                  (i.drawVideoCanvasImagesRecall = !0),
                  b.updateVideoFrames(e, i, !0),
                  window.requestAnimationFrame(function () {
                    tpGS.gsap.to(i.bgvid, 0.1, { zIndex: 0, display: "none" });
                  }))
                : (b.stopVideo(i.bgvid, e, !0),
                  !0 !== i.poster &&
                    ((i.loadobj.bgColor = !0), (i.bgcolor = "#000")))),
          t
        );
      },
      u = function (e, t, i, a) {
        return Math.sqrt(Math.pow(e - i, 2) + Math.pow(t - a, 2));
      },
      h = function (e, t) {
        t += Math.PI / 2;
        return {
          x1: e.x,
          y1: e.y,
          x2: e.x + 100 * Math.cos(t),
          y2: e.y + 100 * Math.sin(t),
        };
      },
      m = function (e, t) {
        var i = e.y2 - e.y1,
          a = e.x1 - e.x2,
          e = i * e.x1 + a * e.y1,
          r = t.y2 - t.y1,
          o = t.x1 - t.x2,
          t = r * t.x1 + o * t.y1,
          s = i * o - r * a;
        return (
          0 != s && {
            x: Math.round(((o * e - a * t) / s) * 100) / 100,
            y: Math.round(((i * t - r * e) / s) * 100) / 100,
          }
        );
      };
    (window.RS_MODULES = window.RS_MODULES || {}),
      (window.RS_MODULES.slideanims = { loaded: !0, version: "6.6.0" }),
      window.RS_MODULES.checkMinimal && window.RS_MODULES.checkMinimal();
  })(jQuery),
  !(function () {
    "use strict";
    jQuery.fn.revolution = jQuery.fn.revolution || {};
    var h = jQuery.fn.revolution;
    function n(e) {
      return null == e
        ? -1
        : !h.isNumeric(e) && 1 < e.split(":").length
        ? 60 * parseInt(e.split(":")[0], 0) + parseInt(e.split(":")[1], 0)
        : e;
    }
    jQuery.extend(!0, h, {
      preLoadAudio: function (a, r) {
        (h[r].videos = void 0 === h[r].videos ? {} : h[r].videos),
          a.find(".rs-layer-audio").each(function () {
            var e = jQuery(this),
              t = (h[r].videos[e[0].id] =
                void 0 === h[r].videos[e[0].id]
                  ? u(e.data(), "audio", h.gA(a[0], "key"))
                  : h[r].videos[e[0].id]),
              i = {};
            0 === e.find("audio").length &&
              ((i.src = null != t.mp4 ? t.mp4 : ""),
              (i.pre = t.pload || ""),
              (this.id =
                void 0 === this.id || "" === this.id
                  ? e.attr("audio-layer-" + Math.round(199999 * Math.random()))
                  : this.id),
              (i.id = this.id),
              void 0 === h[r].audioqueue && (h[r].audioqueue = []),
              h[r].audioqueue.push(i),
              h.manageVideoLayer(e, r, h.gA(a[0], "key"), !0));
          });
      },
      preLoadAudioDone: function (e, t, i) {
        var a = h[t].videos[e[0].id];
        h[t].audioqueue &&
          0 < h[t].audioqueue.length &&
          jQuery.each(h[t].audioqueue, function (e, t) {
            a.mp4 !== t.src ||
              (t.pre !== i && "auto" !== t.pre) ||
              (t.status = "loaded");
          });
      },
      checkfullscreenEnabled: function (e) {
        var t;
        return void 0 !== window.fullScreen
          ? window.fullScreen
          : void 0 !== document.fullscreen
          ? document.fullscreen
          : void 0 !== document.mozFullScreen
          ? document.mozFullScreen
          : void 0 !== document.webkitIsFullScreen
          ? document.webkitIsFullScreen
          : ((t =
              h.isWebkit() && /Apple Computer/.test(navigator.vendor) ? 42 : 5),
            screen.width == h.winW &&
              Math.abs(screen.height - h.getWinH(e)) < t);
      },
      showVideo: function (e) {
        tpGS.gsap.to(e, 0.3, {
          opacity: 1,
          display: "block",
          ease: "power3.inOut",
        });
      },
      resetVideo: function (e, t, i) {
        if ("updateAndResize" !== i) {
          var a = h[t].videos[e[0].id];
          if ("resetVideo" !== a.cRS)
            switch (((a.cRS = "resetVideo"), a.type)) {
              case "youtube":
                a.rwd &&
                  null != a.player &&
                  void 0 !== a.player.seekTo &&
                  (a.player.seekTo(-1 == a.ssec ? 0 : a.ssec),
                  a.player.pauseVideo()),
                  a.bgvideo ||
                    "preset" === i ||
                    0 != a.jsposter.length ||
                    h.showVideo(e.find("iframe"));
                break;
              case "vimeo":
                void 0 !== a.vimeoplayer &&
                  a.rwd &&
                  ((0 !== a.ssec && -1 !== a.ssec) ||
                    a.bgvideo ||
                    0 < a.jsposter.length) &&
                  (a.vimeoplayer.setCurrentTime(-1 == a.ssec ? 0 : a.ssec),
                  a.vimeoplayer.pause()),
                  0 != a.jsposter.length ||
                    a.bgvideo ||
                    "preset" === i ||
                    h.showVideo(e.find("iframe"));
                break;
              case "html5":
                if (h.ISM && a.notonmobile) return !1;
                a.bgvideo || h.showVideo(a.jvideo),
                  a.rwd &&
                    "playing" !== a.cSS &&
                    !isNaN(a.video.duration) &&
                    ((a.justReseted = !0),
                    (a.video.currentTime = -1 == a.ssec ? 0 : a.ssec)),
                  ("mute" != a.volume &&
                    !h.lastToggleState(e.videomutetoggledby) &&
                    !0 !== h[t].globalmute) ||
                    (a.video.muted = !0);
            }
        }
      },
      Mute: function (e, t, i) {
        var a = !1,
          r = h[t].videos[e[0].id];
        switch (r.type) {
          case "youtube":
            r.player &&
              (!0 === i && r.player.mute(),
              !1 === i && y(r, parseInt(r.volcache, 0)),
              (a = r.player.isMuted
                ? r.player.isMuted()
                : "mute" === r.volume));
            break;
          case "vimeo":
            r.volcachecheck ||
              ((r.volcache = 1 < r.volcache ? r.volcache / 100 : r.volcache),
              (r.volcachecheck = !0)),
              (r.volume = !0 === i ? "mute" : !1 === i ? r.volcache : r.volume),
              void 0 !== i &&
                null != r.vimeoplayer &&
                o(r, !0 === i ? 0 : r.volcache),
              (a = "mute" == r.volume || 0 === r.volume);
            break;
          case "html5":
            r.volcachecheck ||
              ((r.volcache = 1 < r.volcache ? r.volcache / 100 : r.volcache),
              (r.volcachecheck = !0)),
              (r.video.volume = r.volcache),
              void 0 !== i && r.video && (r.video.muted = i),
              (a = void 0 !== r.video ? r.video.muted : a);
        }
        if (void 0 === i) return a;
      },
      stopVideo: function (e, t, i) {
        if (void 0 !== h[t] && void 0 !== h[t]) {
          var a = h[t].videos[e[0].id];
          if (void 0 !== a && ("stopVideo" !== a.cRS || "paused" !== a.cSS))
            switch (
              ((a.cRS = "stopVideo"),
              h[t].leaveViewPortBasedStop || (h[t].lastplayedvideos = []),
              (h[t].leaveViewPortBasedStop = !1),
              a.type)
            ) {
              case "youtube":
                void 0 !== a.player &&
                  2 !== a.player.getPlayerState() &&
                  5 !== a.player.getPlayerState() &&
                  (a.player.pauseVideo(), void 0 !== i) &&
                  w(t, a, "hide");
                break;
              case "vimeo":
                void 0 !== a.vimeoplayer &&
                  (a.vimeoplayer.pause(), void 0 !== i) &&
                  w(t, a, "hide");
                break;
              case "html5":
                a.video && (a.video.pause(), h.ISM) && k(a, 1);
            }
        }
      },
      playVideo: function (e, t, i) {
        var a = h[t].videos[e[0].id];
        if (
          (clearTimeout(a.videoplaywait),
          "playVideo" !== a.cRS || "playing" !== a.cSS)
        )
          switch (((a.cRS = "playVideo"), a.type)) {
            case "youtube":
              0 == e.find("iframe").length
                ? (e.append(a.videomarkup), b(e, t, !0))
                : void 0 !== a.player && null != a.player.playVideo
                ? ((r = a.player.getCurrentTime()),
                  a.nseTriggered && (a.nseTriggered = !(r = -1)),
                  -1 != a.ssec && a.ssec > r && a.player.seekTo(a.ssec),
                  p(a))
                : (a.videoplaywait = setTimeout(function () {
                    h.playVideo(e, t);
                  }, 50));
              break;
            case "vimeo":
              0 == e.find("iframe").length
                ? (delete a.vimeoplayer, e.append(a.videomarkup), b(e, t, !0))
                : e.hasClass("rs-apiready") &&
                  ((a.vimeoplayer =
                    null == a.vimeoplayer
                      ? new Vimeo.Player(e.find("iframe").attr("id"))
                      : a.vimeoplayer),
                  a.vimeoplayer.getPaused())
                ? ((r = void 0 === a.currenttime ? 0 : a.currenttime),
                  a.nseTriggered && (a.nseTriggered = !(r = -1)),
                  -1 != a.ssec &&
                    a.ssec > r &&
                    a.vimeoplayer.setCurrentTime(a.ssec),
                  ("mute" != a.volume &&
                    0 !== a.volume &&
                    !h.lastToggleState(e.data("videomutetoggledby")) &&
                    !0 !== h[t].globalmute) ||
                    ((a.volumetoken = !0), a.vimeoplayer.setMuted(!0)),
                  c(a))
                : (a.videoplaywait = setTimeout(function () {
                    h.playVideo(e, t);
                  }, 50));
              break;
            case "html5":
              if (a.metaloaded) {
                if (
                  ("" + a.video.duration == "NaN" || a.video.readyState < 4) &&
                  !i
                )
                  return (
                    a.loadRequested || (a.video.load(), (a.loadRequested = !0)),
                    void setTimeout(function () {
                      h.playVideo(e, t);
                    }, 50)
                  );
                var r = a.video.currentTime;
                a.nseTriggered && (a.nseTriggered = !(r = -1)),
                  -1 != a.ssec &&
                    a.ssec > r &&
                    a.ssec < a.video.duration &&
                    (a.video.currentTime = a.ssec),
                  s(a, void 0, t);
              } else d(a.video, "loadedmetadata", void h.playVideo(e, t));
          }
      },
      isVideoPlaying: function (i, e) {
        var a = !1;
        return (
          null != h[e].playingvideos &&
            jQuery.each(h[e].playingvideos, function (e, t) {
              i.attr("id") == t.attr("id") && (a = !0);
            }),
          a
        );
      },
      removeMediaFromList: function (e, t) {
        x(e, t);
      },
      prepareCoveredVideo: function (e) {
        clearTimeout(h[e].resizePrepareCoverVideolistener);
        var t =
            "carousel" === h[e].sliderType
              ? h[e].carousel.justify
                ? void 0 === h[e].carousel.slide_widths
                  ? void 0
                  : h[e].carousel.slide_widths[h[e].carousel.focused]
                : h[e].carousel.slide_width
              : h[e].canv.width,
          i =
            "carousel" === h[e].sliderType
              ? h[e].carousel.slide_height
              : h[e].canv.height;
        if (0 === t || 0 === i || void 0 === t || void 0 === i)
          h[e].resizePrepareCoverVideolistener = setTimeout(function () {
            h.prepareCoveredVideo(e);
          }, 100);
        else
          for (var a in h[e].videos) {
            var r,
              o,
              s,
              a = h[e].videos[a];
            void 0 !== a.jvideo &&
              (a.bgvideo ||
                a.jvideo.parent().hasClass("rs-fsv") ||
                (h.closestNode(a.video, "RS-LAYER") &&
                  h
                    .closestNode(a.video, "RS-LAYER")
                    .classList.contains("rs-fsv"))) &&
              ("html5" === a.type &&
                void 0 !== a.jvideo &&
                tpGS.gsap.set(a.jvideo, { width: t }),
              (void 0 !== h[e].activeRSSlide &&
                a.slideid !== h.gA(h[e].slides[h[e].activeRSSlide], "key") &&
                void 0 !== h[e].pr_next_slide &&
                a.slideid !== h.gA(h[e].pr_next_slide[0], "key")) ||
                ((a.vd =
                  1 < a.ratio.split(":").length
                    ? a.ratio.split(":")[0] / a.ratio.split(":")[1]
                    : 1),
                (r = a.vd * (s = t / i) * 100),
                (o = (a.vd / s) * 100),
                (s =
                  "Edge" === h.get_browser() || "IE" === h.get_browser()
                    ? s > a.vd
                      ? {
                          minWidth: "100%",
                          height: r + "%",
                          x: "-50%",
                          y: "-50%",
                          top: "50%",
                          left: "50%",
                          position: "absolute",
                        }
                      : {
                          minHeight: "100%",
                          width: o + "%",
                          x: "-50%",
                          y: "-50%",
                          top: "50%",
                          left: "50%",
                          position: "absolute",
                        }
                    : (a.bgvideo &&
                        void 0 !== a.vimeoid &&
                        "carousel" == h[e].sliderType &&
                        (o = r = 100),
                      s > a.vd
                        ? {
                            height: (a.fitCover ? 100 : r) + "%",
                            width: "100%",
                            top: a.fitCover ? 0 : -(r - 100) / 2 + "%",
                            left: "0px",
                            position: "absolute",
                          }
                        : {
                            width: (a.fitCover ? 100 : o) + "%",
                            height: "100%",
                            left: a.fitCover ? 0 : -(o - 100) / 2 + "%",
                            top: "0px",
                            position: "absolute",
                          })),
                (void 0 === a.vimeoid && void 0 === a.ytid) ||
                  ((s.maxWidth = "none"), (s.maxHeight = "none")),
                tpGS.gsap.set(a.jvideo, s)));
          }
      },
      checkVideoApis: function (e, t) {
        var i, a, r;
        location.protocol;
        h[t].youtubeapineeded ||
          ((i = e.find("iframe")),
          (null != e.data("ytid") ||
            (0 < i.length &&
              i.attr("src") &&
              0 < i.attr("src").toLowerCase().indexOf("youtube"))) &&
            (h[t].youtubeapineeded = !0),
          h[t].youtubeapineeded &&
            !window.rs_addedyt &&
            ((h[t].youtubestarttime = Date.now()),
            (window.rs_addedyt = !0),
            (i = document.createElement("script")),
            (a = h.getByTag(document, "script")[0]),
            (r = !0),
            (i.src = "https://www.youtube.com/iframe_api"),
            jQuery("head")
              .find("*")
              .each(function () {
                "https://www.youtube.com/iframe_api" ==
                  jQuery(this).attr("src") && (r = !1);
              }),
            r) &&
            a.parentNode.insertBefore(i, a)),
          h[t].vimeoapineeded ||
            ((i = e.find("iframe")),
            (null != e.data("vimeoid") ||
              (0 < i.length &&
                i.attr("src") &&
                0 < i.attr("src").toLowerCase().indexOf("vimeo"))) &&
              (h[t].vimeoapineeded = !0),
            h[t].vimeoapineeded &&
              !window.rs_addedvim &&
              ((h[t].vimeostarttime = Date.now()),
              (window.rs_addedvim = !0),
              (e = document.createElement("script")),
              (a = h.getByTag(document, "script")[0]),
              (r = !0),
              (e.src = "https://player.vimeo.com/api/player.js"),
              jQuery("head")
                .find("*")
                .each(function () {
                  "https://player.vimeo.com/api/player.js" ==
                    jQuery(this).attr("src") && (r = !1);
                }),
              r) &&
              a.parentNode.insertBefore(e, a));
      },
      manageVideoLayer: function (e, t, i, a) {
        if (
          ((h[t].videos = void 0 === h[t].videos ? {} : h[t].videos),
          void 0 === h[t].videos[e[0].id] || !0 === a)
        ) {
          var r = (h[t].videos[e[0].id] =
            void 0 === h[t].videos[e[0].id]
              ? u(e.data(), void 0, i)
              : h[t].videos[e[0].id]);
          if (((r.audio = void 0 !== r.audio && r.audio), h.ISM && r.opom))
            0 == e.find("rs-poster").length &&
              e.append(
                '<rs-poster class="noSwipe" style="background-image:url(' +
                  r.poster +
                  ');"></rs-poster>'
              );
          else {
            (r.jsposter = e.find("rs-poster")),
              (r.id = e[0].id),
              (r.pload =
                "auto" === r.pload ||
                "canplay" === r.pload ||
                "canplaythrough" === r.pload ||
                "progress" === r.pload
                  ? "auto"
                  : r.pload),
              (r.type =
                null != r.mp4 || null != r.webm
                  ? "html5"
                  : null != r.ytid && 1 < String(r.ytid).length
                  ? "youtube"
                  : null != r.vimeoid && 1 < String(r.vimeoid).length
                  ? "vimeo"
                  : "none"),
              (r.newtype =
                "html5" == r.type &&
                0 == e.find(r.audio ? "audio" : "video").length
                  ? "html5"
                  : "youtube" == r.type && 0 == e.find("iframe").length
                  ? "youtube"
                  : "vimeo" == r.type && 0 == e.find("iframe").length
                  ? "vimeo"
                  : "none"),
              (r.extras = ""),
              (r.posterMarkup =
                void 0 === r.posterMarkup ? "" : r.posterMarkup),
              !r.audio &&
                "1sttime" == r.aplay &&
                r.pausetimer &&
                r.bgvideo &&
                h.sA(e.closest("rs-slide")[0], "rspausetimeronce", 1),
              r.audio ||
                !r.bgvideo ||
                !r.pausetimer ||
                (1 != r.aplay && "true" != r.aplay && "no1sttime" != r.aplay) ||
                h.sA(e.closest("rs-slide")[0], "rspausetimeralways", 1),
              r.noInt && e.find("*").addClass("rs-nointeraction"),
              !(null != r.poster && 2 < r.poster.length) ||
                (h.ISM && r.npom) ||
                (0 == r.jsposter.length &&
                  (r.posterMarkup +=
                    '<rs-poster class="noSwipe" style="background-image:url(' +
                    r.poster +
                    ');"></rs-poster>'));
            var o = !0;
            switch (((r.cSS = "created"), (r.cRS = "created"), r.newtype)) {
              case "html5":
                1 == window.isSafari11 && (h[t].slideHasIframe = !0),
                  r.audio && e.addClass("rs-audio"),
                  (r.tag = r.audio ? "audio" : "video");
                var s =
                    "video" === r.tag && (h.is_mobile() || h.isSafari11())
                      ? (r.aplay && "no1sttime" !== r.aplay) ||
                        "true" === r.aplay
                        ? "muted playsinline autoplay"
                        : r.inline
                        ? " playsinline"
                        : ""
                      : "",
                  n =
                    '<div class="html5vid rs_html5vidbasicstyles ' +
                    (!1 === r.afs ? "hidefullscreen" : "") +
                    '">',
                  l =
                    r.bgvideo &&
                    /^([\w]+\:)?\/\//.test(r.mp4) &&
                    (-1 === r.mp4.indexOf(location.host) ||
                      -1 !== r.mp4.indexOf("." + location.host)) &&
                    r.crossOriginVideo
                      ? ' crossOrigin="anonymous" '
                      : "";
                (n +=
                  "<" +
                  r.tag +
                  " " +
                  s +
                  " " +
                  (r.controls && "none" !== r.controls ? " controls" : "") +
                  l +
                  (r.bgvideo && -1 == s.indexOf("autoplay")
                    ? " autoplay"
                    : "") +
                  (r.bgvideo && -1 == s.indexOf("muted") ? " muted" : "") +
                  ' style="' +
                  ("Edge" !== h.get_browser()
                    ? (r.fitCover
                        ? "object-fit:cover;background-size:cover;"
                        : "") + "opacity:0;width:100%; height:100%"
                    : "") +
                  '" class="" ' +
                  (r.loop ? "loop" : "") +
                  ' preload="' +
                  r.pload +
                  '">'),
                  "video" === r.tag &&
                    null != r.webm &&
                    "firefox" == h.get_browser().toLowerCase() &&
                    (n =
                      n + '<source src="' + r.webm + '" type="video/webm" />'),
                  null != r.mp4 &&
                    (n =
                      n +
                      '<source src="' +
                      r.mp4 +
                      '" type="' +
                      ("video" === r.tag
                        ? "video/mp4"
                        : 0 < r.mp4.toLowerCase().indexOf("m4a")
                        ? "audio/x-m4a"
                        : "audio/mpeg") +
                      '" />'),
                  null != r.ogv &&
                    (n =
                      n +
                      '<source src="' +
                      r.mp4 +
                      '" type="' +
                      r.tag +
                      '/ogg" />'),
                  (n = (n += "</" + r.tag + "></div>") + r.posterMarkup),
                  (r.controls && !r.audio && void 0 === r.poster) ||
                    r.bgvideo ||
                    (n +=
                      '<div class="tp-video-play-button"><i class="revicon-right-dir"></i><span class="tp-revstop">&nbsp;</span></div>'),
                  (r.videomarkup = n),
                  (o = !1),
                  (h.ISM && r.notonmobile) || h.isIE(8) || e.append(n),
                  (r.jvideo = e.find(r.tag)),
                  (r.video = r.jvideo[0]),
                  (r.html5vid = r.jvideo.parent()),
                  d(
                    r.video,
                    "canplay",
                    (g((l = e), t), void h.resetVideo(l, t))
                  );
                break;
              case "youtube":
                (h[t].slideHasIframe = !0),
                  (r.controls && "none" !== r.controls) ||
                    ((r.vatr = r.vatr.replace("controls=1", "controls=0")),
                    -1 == r.vatr.toLowerCase().indexOf("controls") &&
                      (r.vatr = r.vatr + "&controls=0")),
                  (!r.inline && "RS-BGVIDEO" !== e[0].tagName) ||
                    (r.vatr = r.vatr + "&playsinline=1"),
                  -1 != r.ssec && (r.vatr += "&start=" + r.ssec),
                  -1 != r.esec && (r.vatr += "&end=" + r.esec);
                s = r.vatr.split("origin=https://");
                (r.vatrnew =
                  1 < s.length
                    ? s[0] +
                      "origin=https://" +
                      (self.location.href.match(/www/gi) && !s[1].match(/www/gi)
                        ? "www." + s[1]
                        : s[1])
                    : r.vatr),
                  (r.videomarkup =
                    '<iframe allow="autoplay; ' +
                    (!0 === r.afs ? "fullscreen" : "") +
                    '" type="text/html" src="https://www.youtube-nocookie.com/embed/' +
                    r.ytid +
                    "?" +
                    r.vatrnew +
                    '"  width="100%" height="100%" class="intrinsic-ignore" style="opacity:0;visibility:visible;width:100%;height:100%"></iframe>');
                break;
              case "vimeo":
                (h[t].slideHasIframe = !0),
                  (r.vatr = r.vatr
                    .replaceAll("&background=0", "")
                    .replaceAll("&background=1", "")),
                  (r.vatr = r.vatr
                    .replaceAll("background=0", "")
                    .replaceAll("background=1", "")),
                  !r.controls || "none" === r.controls || r.bgvideo
                    ? ((r.vatr = r.vatr.replace(
                        "background=0",
                        "background=1"
                      )),
                      -1 == r.vatr.toLowerCase().indexOf("background") &&
                        (r.vatr = r.vatr + "&background=1"))
                    : ((r.vatr = r.vatr.replace(
                        "background=1",
                        "background=0"
                      )),
                      -1 == r.vatr.toLowerCase().indexOf("background") &&
                        (r.vatr = r.vatr + "&background=0")),
                  (r.vatr =
                    "autoplay=" +
                    (!0 === r.aplay ? 1 : 0) +
                    ("&" == r.vatr[0] ? "" : "&") +
                    r.vatr),
                  r.bgvideo && (r.prePlayForaWhile = !0),
                  h.ISM &&
                    !0 === r.aplay &&
                    (r.vatr =
                      "muted=1" + ("&" == r.vatr[0] ? "" : "&") + r.vatr),
                  r.loop &&
                    (r.vatr =
                      "loop=1" + ("&" == r.vatr[0] ? "" : "&") + r.vatr),
                  (r.videomarkup =
                    '<iframe  allow="autoplay; ' +
                    (!0 === r.afs ? "fullscreen" : "") +
                    '" src="https://player.vimeo.com/video/' +
                    r.vimeoid +
                    "?" +
                    r.vatr +
                    '" ' +
                    (!0 === r.afs
                      ? "webkitallowfullscreen mozallowfullscreen allowfullscreen"
                      : "") +
                    ' width="100%" height="100%" class="intrinsic-ignore" style="opacity:0;visibility:visible;width:100%;height:100%"></iframe>');
            }
            if (
              !(null != r.poster && 2 < r.poster.length) ||
              (h.ISM && r.npom)
            ) {
              if (h.ISM && r.notonmobile) return !1;
              0 != e.find("iframe").length ||
                ("youtube" != r.type && "vimeo" != r.type) ||
                (delete r.vimeoplayer,
                e.append(r.videomarkup),
                b(e, t, !("vimeo" !== r.newtype || !r.bgvideo), !0));
            } else
              o && 0 == e.find("rs-poster").length && e.append(r.posterMarkup),
                0 == e.find("iframe").length &&
                  ((r.jsposter = e.find("rs-poster")),
                  r.jsposter.on("click", function () {
                    if ((h.playVideo(e, t, !0), h.ISM)) {
                      if (r.notonmobile) return !1;
                      tpGS.gsap.to(r.jsposter, 0.3, {
                        opacity: 0,
                        visibility: "hidden",
                        force3D: "auto",
                        ease: "power3.inOut",
                      }),
                        h.showVideo(e.find("iframe"));
                    }
                  }));
            "none" !== r.doverlay &&
              void 0 !== r.doverlay &&
              ((a = h.createOverlay(t, r.doverlay, r.doverlaysize, {
                0: r.doverlaycolora,
                1: r.doverlaycolorb,
              })),
              r.bgvideo &&
              1 != e.closest("rs-sbg-wrap").find("rs-dotted").length
                ? e
                    .closest("rs-sbg-wrap")
                    .append(
                      '<rs-dotted style="background-image:' +
                        a +
                        '"></rs-dotted>'
                    )
                : r.bgvideo ||
                  1 == e.find("rs-dotted").length ||
                  e.append(
                    '<rs-dotted style="background-image:' + a + '"></rs-dotted>'
                  )),
              r.bgvideo &&
                ("youtube" !== r.type &&
                  "vimeo" !== r.type &&
                  (e[0].style.display = "none"),
                (e[0].style.zIndex = 0),
                tpGS.gsap.set(e.find("video, iframe"), { opacity: 0 }));
          }
        }
      },
    });
    function m(e, t) {
      var i = h[e].videos[t[0].id];
      (i.bgvideo || t.hasClass("rs-fsv")) &&
        ((void 0 === i.ratio || i.ratio.split(":").length <= 1) &&
          (i.ratio = "16:9"),
        requestAnimationFrame(function () {
          h.prepareCoveredVideo(e);
        }));
    }
    function v(e, t, i) {
      (e.cSS = "playing"),
        (e.vimeostarted = !0),
        (e.nextslidecalled = !1),
        (e.jsposter =
          void 0 === e.jsposter || 0 === e.jsposter.length
            ? t.find("rs-poster")
            : e.jsposter),
        (e.jvideo = t.find("iframe")),
        h[i].c.trigger(
          "revolution.slide.onvideoplay",
          f(e.vimeoplayer, "vimeo", e)
        ),
        (h[i].stopByVideo = e.pausetimer),
        S(t, i),
        "mute" == e.volume ||
        0 === e.volume ||
        h.lastToggleState(t.data("videomutetoggledby")) ||
        !0 === h[i].globalmute
          ? ((e.volumetoken = !0), e.vimeoplayer.setMuted(!0))
          : o(e, parseInt(e.volcache, 0) / 100 || 0.75),
        h.toggleState(e.videotoggledby);
    }
    function l(e) {
      return (
        "t" === e ||
        !0 === e ||
        "true" === e ||
        ("f" !== e && !1 !== e && "false" !== e && e)
      );
    }
    var d = function (e, t, i) {
        e.addEventListener
          ? e.addEventListener(t, i, { capture: !1, passive: !0 })
          : e.attachEvent(t, i, { capture: !1, passive: !0 });
      },
      f = function (e, t, i) {
        var a = {};
        return (a.video = e), (a.type = t), (a.settings = i), a;
      },
      o = function (i, a) {
        var r = i.vimeoplayer;
        r.getPaused()
          .then(function (e) {
            i.volumetoken = !0;
            var t = !e,
              e = r.setVolume(a);
            void 0 !== e &&
              e
                .then(function (e) {
                  r.getPaused()
                    .then(function (e) {
                      t === e &&
                        ((i.volume = "mute"),
                        r.getMuted().then(function (e) {
                          e || ((i.volumetoken = !0), r.setMuted(!0));
                        }),
                        r.play());
                    })
                    .catch(function (e) {
                      console.log(
                        "Get Paused Function Failed for Vimeo Volume Changes Inside the Promise"
                      );
                    });
                })
                .catch(function (e) {
                  t &&
                    ((i.volume = "mute"),
                    (i.volumetoken = !0),
                    r.setMuted(!0),
                    r.play()),
                    h.ISM && k(i, 0);
                });
          })
          .catch(function () {
            console.log("Get Paused Function Failed for Vimeo Volume Changes");
          });
      },
      y = function (e, t) {
        var i = e.player.getPlayerState ? e.player.getPlayerState() : -1;
        "mute" === t
          ? e.player.mute && e.player.mute()
          : (e.player.unMute && e.player.unMute(),
            e.player.setVolume && e.player.setVolume(t)),
          setTimeout(function () {
            1 === i &&
              1 !== e.player.getPlayerState() &&
              (e.player.mute(), e.player.playVideo());
          }, 39);
      },
      s = function (t, i, a) {
        var e;
        "playVideo" === t.cRS &&
          (void 0 !== (e = t.video.play()) &&
            e
              .then(function (e) {
                !0 === t.twaudio &&
                  !0 !== h[a].globalmute &&
                  ((t.twaudio = !1), h.clickedOnce) &&
                  ((t.video.volume = t.volcache),
                  (t.volume = t.volcache),
                  (t.video.muted = !1));
              })
              .catch(function (e) {
                t.video.pause(), !0 !== i && s(t, !0, a);
              }),
          h.ISM) &&
          k(t, 0);
      },
      c = function (t) {
        var e;
        "playVideo" === t.cRS &&
          void 0 !== (e = t.vimeoplayer.play()) &&
          e
            .then(function (e) {})
            .catch(function (e) {
              (t.vimeoplayer.volumetoken = !0),
                t.vimeoplayer.setMuted(!0),
                t.vimeoplayer.play();
            });
      },
      p = function (e) {
        "playVideo" === e.cRS &&
          (e.player.playVideo(), 1 !== e.player.getPlayerState()) &&
          tpGS.gsap.delayedCall(0.5, function () {
            p(e);
          });
      },
      w = function (e, t, i, a) {
        clearTimeout(t.repeatedPosterCalls),
          (t.repeatedPosterCalls = setTimeout(
            function () {
              "show" === i || ("playing" === t.cSS && !0 !== t.VideoIsVisible)
                ? (void 0 !== t.showhideposter && t.showhideposter.pause(),
                  (t.showhideposter = tpGS.gsap.timeline()),
                  0 < t.jsposter.length &&
                    t.showhideposter.add(
                      tpGS.gsap.to(t.jsposter, 0.3, {
                        zIndex: 5,
                        autoAlpha: 0,
                        force3D: "auto",
                        ease: "power3.inOut",
                      }),
                      0
                    ),
                  0 < t.jvideo.length &&
                    t.showhideposter.add(
                      tpGS.gsap.to(t.jvideo, void 0 !== a ? a : 0.001, {
                        opacity: 1,
                        display: "block",
                        ease:
                          0 < t.jsposter.length ? "power3.inOut" : "power3.out",
                      }),
                      0
                    ),
                  (t.VideoIsVisible = !0))
                : ("hide" === i ||
                    ("paused" === t.cSS &&
                      1 != h.checkfullscreenEnabled(e) &&
                      0 < t.jsposter.length &&
                      !1 !== t.VideoIsVisible &&
                      !0 !== t.seeking)) &&
                  (void 0 !== t.showhideposter && t.showhideposter.pause(),
                  (t.showhideposter = tpGS.gsap.timeline()),
                  0 < t.jsposter.length &&
                    t.showhideposter.add(
                      tpGS.gsap.to(t.jsposter, 0.3, {
                        zIndex: 5,
                        autoAlpha: 1,
                        force3D: "auto",
                        ease: "power3.inOut",
                      }),
                      0
                    ),
                  0 < t.jvideo.length &&
                    t.showhideposter.add(
                      tpGS.gsap.to(t.jvideo, void 0 !== a ? a : 0.001, {
                        opacity: 0,
                        ease:
                          0 < t.jsposter.length ? "power3.inOut" : "power3.out",
                      }),
                      0.3
                    ),
                  t.bgvideo &&
                    void 0 !== t.nBG &&
                    void 0 !== t.nBG.loadobj &&
                    (t.nBG.video = t.nBG.loadobj.img),
                  (t.VideoIsVisible = !1));
            },
            void 0 !== i ? 0 : 100
          ));
      },
      b = function (r, o, e, s) {
        var n = h[o].videos[r[0].id],
          t = "iframe" + Math.round(1e5 * Math.random() + 1);
        if (
          ((n.jvideo = r.find("iframe")),
          m(o, r),
          n.jvideo.attr("id", t),
          (n.startvideonow = e),
          n.videolistenerexist)
        ) {
          if (e)
            switch (n.type) {
              case "youtube":
                h.playVideo(r, o), -1 != n.ssec && n.player.seekTo(n.ssec);
                break;
              case "vimeo":
                h.playVideo(r, o), -1 != n.ssec && n.vimeoplayer.seekTo(n.ssec);
            }
        } else
          switch (n.type) {
            case "youtube":
              "undefined" == typeof YT || void 0 === YT.Player
                ? (h.checkVideoApis(r, o),
                  setTimeout(function () {
                    b(r, o, e, s);
                  }, 50))
                : (n.player = new YT.Player(t, {
                    events: {
                      onStateChange: function (e) {
                        e.data == YT.PlayerState.PLAYING
                          ? ((n.cSS = "playing"),
                            !(h[o].onceVideoPlayed = !0) ===
                              n.player.isMuted() &&
                              (n.volume = n.volcache = n.player.getVolume()),
                            "mute" == n.volume ||
                            0 === n.volume ||
                            h.lastToggleState(r.data("videomutetoggledby")) ||
                            !0 === h[o].globalmute
                              ? n.player.mute()
                              : y(n, parseInt(n.volcache, 0) || 75),
                            (h[o].stopByVideo = !0),
                            S(r, o),
                            n.pausetimer
                              ? h[o].c.trigger("stoptimer")
                              : (h[o].stopByVideo = !1),
                            h[o].c.trigger(
                              "revolution.slide.onvideoplay",
                              f(n.player, "youtube", n)
                            ),
                            h.toggleState(n.videotoggledby))
                          : ((n.cSS = "paused"),
                            0 == e.data &&
                              n.loop &&
                              (-1 != n.ssec && n.player.seekTo(n.ssec),
                              h.playVideo(r, o),
                              h.toggleState(n.videotoggledby)),
                            -1 != e.data &&
                              3 != e.data &&
                              ((h[o].stopByVideo = !1),
                              (h[o].tonpause = !1),
                              x(r, o),
                              h[o].c.trigger("starttimer"),
                              h[o].c.trigger(
                                "revolution.slide.onvideostop",
                                f(n.player, "youtube", n)
                              ),
                              (null != h[o].videoIsPlaying &&
                                h[o].videoIsPlaying.attr("id") !=
                                  r.attr("id")) ||
                                h.unToggleState(n.videotoggledby)),
                            0 == e.data && n.nse
                              ? ((document.fullscreenElement !==
                                  r.find("iframe")[0] &&
                                  document.webkitFullscreenElement !==
                                    r.find("iframe")[0]) ||
                                  _(),
                                (n.nseTriggered = !0),
                                h[o].c.revnext(),
                                x(r, o))
                              : (x(r, o),
                                (h[o].stopByVideo = !1),
                                3 !== e.data &&
                                  ((-1 != n.lasteventdata &&
                                    3 != n.lasteventdata &&
                                    void 0 !== n.lasteventdata) ||
                                    (-1 != e.data && 3 != e.data)) &&
                                  h[o].c.trigger("starttimer"),
                                h[o].c.trigger(
                                  "revolution.slide.onvideostop",
                                  f(n.player, "youtube", n)
                                ),
                                (null != h[o].videoIsPlaying &&
                                  h[o].videoIsPlaying.attr("id") !=
                                    r.attr("id")) ||
                                  h.unToggleState(n.videotoggledby))),
                          clearTimeout(n.postOrVideoTimer),
                          3 !== e.data &&
                            ((n.postOrVideoTimer = setTimeout(
                              function () {
                                w(o, n);
                              },
                              (1 === n.lasteventdata && 2 === e.data) ||
                                (2 === n.lasteventdata && 3 !== e.data)
                                ? 1e3
                                : 0
                            )),
                            (n.lasteventdata = e.data));
                      },
                      onReady: function (e) {
                        var t,
                          i = h.is_mobile(),
                          a = r.hasClass("rs-layer-video");
                        (n.ready = !0),
                          (!i && (!h.isSafari11() || (i && a))) ||
                            ("RS-BGVIDEO" !== r[0].tagName &&
                              (!a || (!0 !== n.aplay && "true" !== n.aplay))) ||
                            ((t = !0),
                            n.player.setVolume(n.volcache),
                            (n.volume = "mute"),
                            n.player.mute(),
                            clearTimeout(r.data("mobilevideotimr")),
                            2 !== n.player.getPlayerState() &&
                              -1 !== n.player.getPlayerState()) ||
                            r.data(
                              "mobilevideotimr",
                              setTimeout(function () {
                                h.playVideo(r, o);
                              }, 500)
                            ),
                          t ||
                            "mute" != n.volume ||
                            (n.player.setVolume(n.volcache), n.player.mute()),
                          r.addClass("rs-apiready"),
                          (null == n.speed && 1 === n.speed) ||
                            e.target.setPlaybackRate(parseFloat(n.speed)),
                          n.jsposter.off("click"),
                          n.jsposter.on("click", function () {
                            h.playVideo(r, o, !0);
                          }),
                          n.startvideonow
                            ? (h.playVideo(r, o),
                              -1 != n.ssec && n.player.seekTo(n.ssec))
                            : s && w(o, n, "show", 0.2),
                          (n.videolistenerexist = !0);
                      },
                    },
                  }));
              break;
            case "vimeo":
              if ("undefined" == typeof Vimeo || void 0 === Vimeo.Player)
                h.checkVideoApis(r, o),
                  setTimeout(function () {
                    b(r, o, e, s);
                  }, 50);
              else {
                for (
                  var i,
                    a = {},
                    l = (p = n.jvideo.attr("src")),
                    d = /([^&=]+)=([^&]*)/g;
                  (i = d.exec(l));

                )
                  a[decodeURIComponent(i[1])] = decodeURIComponent(i[2]);
                var c,
                  p = (p =
                    null != a.player_id
                      ? p.replace(a.player_id, t)
                      : p + "&player_id=" + t).replace(/&api=0|&api=1/g, ""),
                  g = h.is_mobile() || h.isSafari11(),
                  u = "RS-BGVIDEO" === r[0].tagName;
                g && u && (p += "&background=1"),
                  n.jvideo.attr("src", p),
                  (n.vimeoplayer =
                    void 0 === n.vimeoplayer || !1 === n.vimeoplayer
                      ? new Vimeo.Player(t)
                      : n.vimeoplayer),
                  g &&
                    (c = !(!u && !n.aplay && "true" !== n.aplay) || c) &&
                    ((n.volumetoken = !0),
                    n.vimeoplayer.setMuted(!0),
                    (n.volume = "mute")),
                  n.vimeoplayer.on("play", function (e) {
                    (h[o].onceVideoPlayed = !0),
                      (n.cSS = "playing"),
                      n.vimeostarted || v(n, r, o);
                  }),
                  n.vimeoplayer.on("loaded", function (e) {
                    var t = {};
                    n.vimeoplayer.getVideoWidth().then(function (e) {
                      (t.width = e),
                        void 0 !== t.width &&
                          void 0 !== t.height &&
                          ((n.ratio = t.width + ":" + t.height),
                          (n.vimeoplayerloaded = !0),
                          m(o, r));
                    }),
                      n.vimeoplayer.getVideoHeight().then(function (e) {
                        (t.height = e),
                          void 0 !== t.width &&
                            void 0 !== t.height &&
                            ((n.ratio = t.width + ":" + t.height),
                            (n.vimeoplayerloaded = !0),
                            m(o, r));
                      }),
                      n.startvideonow
                        ? ("mute" === n.volume &&
                            ((n.volumetoken = !0), n.vimeoplayer.setMuted(!0)),
                          h.playVideo(r, o),
                          -1 != n.ssec && n.vimeoplayer.setCurrentTime(n.ssec))
                        : s && w(o, n, "show", 0.2),
                      (null == n.speed && 1 === n.speed) ||
                        n.vimeoplayer.setPlaybackRate(parseFloat(n.speed));
                  }),
                  r.addClass("rs-apiready"),
                  n.vimeoplayer.on("volumechange", function (e) {
                    n.volumetoken && (n.volume = e.volume),
                      (n.volumetoken = !1);
                  }),
                  n.vimeoplayer.on("timeupdate", function (e) {
                    w(o, n),
                      n.vimeostarted ||
                        0 === e.percent ||
                        (void 0 !== h[o].activeRSSlide &&
                          n.slideid !==
                            h.gA(h[o].slides[h[o].activeRSSlide], "key")) ||
                        v(n, r, o),
                      n.pausetimer &&
                        "playing" == h[o].sliderstatus &&
                        ((h[o].stopByVideo = !0), h[o].c.trigger("stoptimer")),
                      (n.currenttime = e.seconds),
                      0 != n.esec &&
                        -1 !== n.esec &&
                        n.esec < e.seconds &&
                        !0 !== n.nextslidecalled &&
                        (n.loop
                          ? (h.playVideo(r, o),
                            n.vimeoplayer.setCurrentTime(
                              -1 !== n.ssec ? n.ssec : 0
                            ))
                          : (n.nse &&
                              ((n.nseTriggered = !0),
                              (n.nextslidecalled = !0),
                              h[o].c.revnext()),
                            n.vimeoplayer.pause())),
                      n.prePlayForaWhile && n.vimeoplayer.pause();
                  }),
                  n.vimeoplayer.on("ended", function (e) {
                    (n.cSS = "paused"),
                      w(o, n),
                      (n.vimeostarted = !1),
                      x(r, o),
                      (h[o].stopByVideo = !1),
                      h[o].c.trigger("starttimer"),
                      h[o].c.trigger(
                        "revolution.slide.onvideostop",
                        f(n.vimeoplayer, "vimeo", n)
                      ),
                      n.nse && ((n.nseTriggered = !0), h[o].c.revnext()),
                      (null != h[o].videoIsPlaying &&
                        h[o].videoIsPlaying.attr("id") != r.attr("id")) ||
                        h.unToggleState(n.videotoggledby);
                  }),
                  n.vimeoplayer.on("pause", function (e) {
                    (n.vimeostarted = !1),
                      (n.cSS = "paused"),
                      w(o, n),
                      (h[o].stopByVideo = !1),
                      (h[o].tonpause = !1),
                      x(r, o),
                      h[o].c.trigger("starttimer"),
                      h[o].c.trigger(
                        "revolution.slide.onvideostop",
                        f(n.vimeoplayer, "vimeo", n)
                      ),
                      (null != h[o].videoIsPlaying &&
                        h[o].videoIsPlaying.attr("id") != r.attr("id")) ||
                        h.unToggleState(n.videotoggledby);
                  }),
                  n.jsposter.off("click"),
                  n.jsposter.on("click", function () {
                    if (!h.ISM) return h.playVideo(r, o, !0), !1;
                  }),
                  (n.videolistenerexist = !0);
              }
          }
      },
      _ = function () {
        document.exitFullscreen && document.fullscreen
          ? document.exitFullscreen()
          : document.mozCancelFullScreen && document.mozFullScreen
          ? document.mozCancelFullScreen()
          : document.webkitExitFullscreen &&
            document.webkitIsFullScreen &&
            document.webkitExitFullscreen();
      },
      g = function (t, i, e) {
        var a,
          r = h[i].videos[t[0].id];
        if (h.ISM && r.notonmobile) return !1;
        (r.metaloaded = !0),
          "html5" === r.newtype &&
            r.bgvideo &&
            ((r.nBG = h[i].sbgs[t[0].dataset.key]),
            void 0 === r.nBG.shadowCanvas &&
              ((r.nBG.shadowCanvas = document.createElement("canvas")),
              (r.nBG.shadowCTX = r.nBG.shadowCanvas.getContext("2d")),
              (r.nBG.shadowCanvas.style.background = "transparent"),
              (r.nBG.shadowCanvas.style.opacity = 1)),
            (r.nBG.isHTML5 = !0),
            (r.nBG.video =
              void 0 !== r.nBG.loadobj && void 0 !== r.nBG.loadobj.img
                ? r.nBG.loadobj.img
                : r.video),
            (r.nBG.drawVideoCanvasImagesRecall = !1)),
          (r.controls && !r.audio && void 0 === r.poster) ||
            r.noInt ||
            (0 != t.find(".tp-video-play-button").length ||
              h.ISM ||
              t.append(
                '<div class="tp-video-play-button"><i class="revicon-right-dir"></i><span class="tp-revstop">&nbsp;</span></div>'
              ),
            (a = "video, rs-poster, .tp-video-play-button"),
            void 0 !== r.poster && r.controls && (a = ".tp-video-play-button"),
            t.find(a).on("click", function () {
              (!1 === r.loop && 0 < r.esec && r.esec <= r.video.currentTime) ||
                (t.hasClass("videoisplaying")
                  ? h.stopVideo(t, i)
                  : h.playVideo(t, i, !0));
            })),
          (t.hasClass("rs-fsv") || r.bgvideo) &&
            (r.bgvideo || t.hasClass("rs-fsv")
              ? (r.html5vid.addClass("fullcoveredvideo"),
                (void 0 !== r.ratio && 1 != r.ratio.split(":").length) ||
                  (r.ratio = "16:9"),
                h.prepareCoveredVideo(i))
              : r.html5vid.addClass("rs-fsv")),
          d(r.video, "canplaythrough", function () {
            h.preLoadAudioDone(t, i, "canplaythrough");
          }),
          d(r.video, "canplay", function () {
            h.preLoadAudioDone(t, i, "canplay");
          }),
          d(r.video, "progress", function () {
            h.preLoadAudioDone(t, i, "progress");
          }),
          d(r.video, "pause", function () {
            h.ISM && k(r, 1);
          }),
          d(r.video, "timeupdate", function (e) {
            (this.BGrendered = !0),
              w(i, r),
              -1 === r.esec &&
                r.loop &&
                1 == window.isSafari11 &&
                (r.esec = r.video.duration - 0.075),
              void 0 !== r.lastCurrentTime
                ? (r.fps = r.video.currentTime - r.lastCurrentTime)
                : (r.fps = 0.1),
              (r.lastCurrentTime = r.video.currentTime),
              0 != r.esec &&
                -1 != r.esec &&
                r.esec < r.video.currentTime &&
                !r.nextslidecalled &&
                (r.loop
                  ? (s(r, void 0, i),
                    (r.video.currentTime = -1 === r.ssec ? 0.5 : r.ssec))
                  : (r.nse &&
                      ((r.nseTriggered = !0),
                      (r.nextslidecalled = !0),
                      (h[i].jcnah = !0),
                      h[i].c.revnext(),
                      setTimeout(function () {
                        h[i].jcnah = !1;
                      }, 1e3)),
                    r.video.pause()));
          }),
          d(r.video, "play", function () {
            (r.cSS = "playing"),
              w(i, r),
              r.bgvideo &&
                ((r.nBG.drawVideoCanvasImagesRecall = !0),
                (r.nBG.videoisplaying = !0),
                (r.nBG.video = r.video),
                h.updateVideoFrames(i, r.nBG)),
              (h[i].onceVideoPlayed = !0),
              (r.nextslidecalled = !1),
              (r.volume =
                null != r.volume && "mute" != r.volume
                  ? parseFloat(r.volcache)
                  : r.volume),
              (r.volcache =
                null != r.volcache && "mute" != r.volcache
                  ? parseFloat(r.volcache)
                  : r.volcache),
              h.is_mobile() ||
                (!0 === h[i].globalmute
                  ? (r.video.muted = !0)
                  : (r.video.muted = "mute" == r.volume),
                (r.volcache =
                  h.isNumeric(r.volcache) && 1 < r.volcache
                    ? r.volcache / 100
                    : r.volcache),
                "mute" == r.volume
                  ? (r.video.muted = !0)
                  : null != r.volcache && (r.video.volume = r.volcache)),
              t.addClass("videoisplaying"),
              S(t, i),
              clearTimeout(r.showCoverSoon),
              !0 !== r.pausetimer || "audio" == r.tag
                ? ((h[i].stopByVideo = !1),
                  h[i].c.trigger(
                    "revolution.slide.onvideostop",
                    f(r.video, "html5", r)
                  ))
                : ((h[i].stopByVideo = !0),
                  h[i].c.trigger(
                    "revolution.slide.onvideoplay",
                    f(r.video, "html5", r)
                  )),
              r.pausetimer &&
                "playing" == h[i].sliderstatus &&
                ((h[i].stopByVideo = !0), h[i].c.trigger("stoptimer")),
              h.toggleState(r.videotoggledby);
          }),
          d(r.video, "seeked", function () {
            r.seeking = !1;
          }),
          d(r.video, "seeking", function () {
            r.seeking = !0;
          }),
          d(r.video, "pause", function (e) {
            (r.cSS = "paused"),
              w(i, r),
              t.removeClass("videoisplaying"),
              r.bgvideo &&
                ((r.nBG.drawVideoCanvasImagesRecall = !1),
                (r.nBG.videoisplaying = !1)),
              (h[i].stopByVideo = !1),
              x(t, i),
              "audio" != r.tag && h[i].c.trigger("starttimer"),
              h[i].c.trigger(
                "revolution.slide.onvideostop",
                f(r.video, "html5", r)
              ),
              (null != h[i].videoIsPlaying &&
                h[i].videoIsPlaying.attr("id") != t.attr("id")) ||
                h.unToggleState(r.videotoggledby);
          }),
          d(r.video, "ended", function () {
            (r.cSS = "paused"),
              (document.fullscreenElement !== r.video &&
                document.webkitFullscreenElement !== r.video) ||
                _(),
              w(i, r),
              x(t, i),
              (h[i].stopByVideo = !1),
              x(t, i),
              "audio" != r.tag && h[i].c.trigger("starttimer"),
              h[i].c.trigger(
                "revolution.slide.onvideostop",
                f(r.video, "html5", t.data())
              ),
              r.nse &&
                0 < r.video.currentTime &&
                (1 == !h[i].jcnah &&
                  ((r.nseTriggered = !0), h[i].c.revnext(), (h[i].jcnah = !0)),
                setTimeout(function () {
                  h[i].jcnah = !1;
                }, 1500)),
              t.removeClass("videoisplaying"),
              r.bgvideo &&
                ((r.nBG.drawVideoCanvasImagesRecall = !1),
                (r.nBG.videoisplaying = !1)),
              (!0 !== h[i].inviewport && void 0 !== h[i].inviewport) ||
                (h[i].lastplayedvideos = []);
          }),
          d(r.video, "volumechange", function () {
            r.video.muted
              ? (r.volume = "mute")
              : (r.volume = r.volcache = r.video.volume);
          });
      },
      u = function (e, t, i) {
        e.audio = "audio" === t;
        var a,
          r = void 0 === e.video ? [] : e.video.split(";"),
          o = {
            volume: e.audio ? 1 : "mute",
            pload: "auto",
            ratio: "16:9",
            loop: !0,
            aplay: "true",
            fitCover: !0,
            afs: !0,
            controls: !1,
            nse: !0,
            npom: !1,
            opom: !1,
            inline: !0,
            notonmobile: !1,
            start: -1,
            end: -1,
            doverlay: "none",
            doverlaysize: 1,
            doverlaycolora: "transparent",
            doverlaycolorb: "#000000",
            scop: !1,
            rwd: !0,
            speed: 1,
            ploadwait: 5,
            stopAV: 1 !== e.bgvideo,
            noInt: !1,
            volcache: 75,
            crossOriginVideo: !1,
          };
        for (a in r)
          if (r.hasOwnProperty(a)) {
            var s = r[a].split(":");
            switch (s[0]) {
              case "v":
                o.volume = s[1];
                break;
              case "twa":
                o.twaudio = s[1];
                break;
              case "vd":
                o.volcache = s[1];
                break;
              case "p":
                o.pload = s[1];
                break;
              case "ar":
                o.ratio = s[1] + (void 0 !== s[2] ? ":" + s[2] : "");
                break;
              case "ap":
                o.aplay = l(s[1]);
                break;
              case "vfc":
                o.fitCover = l(s[1]);
                break;
              case "afs":
                o.afs = l(s[1]);
                break;
              case "vc":
                o.controls = s[1];
                break;
              case "nse":
                o.nse = l(s[1]);
                break;
              case "npom":
                o.npom = l(s[1]);
                break;
              case "opom":
                o.opom = l(s[1]);
                break;
              case "t":
                o.vtype = s[1];
                break;
              case "inl":
                o.inline = l(s[1]);
                break;
              case "nomo":
                o.notonmobile = l(s[1]);
                break;
              case "sta":
                o.start = s[1] + (void 0 !== s[2] ? ":" + s[2] : "");
                break;
              case "end":
                o.end = s[1] + (void 0 !== s[2] ? ":" + s[2] : "");
                break;
              case "do":
                o.doverlay = s[1];
                break;
              case "dos":
                o.doverlaysize = s[1];
                break;
              case "doca":
                o.doverlaycolora = s[1];
                break;
              case "docb":
                o.doverlaycolorb = s[1];
                break;
              case "scop":
                o.scop = l(s[1]);
                break;
              case "rwd":
                o.rwd = l(s[1]);
                break;
              case "sp":
                o.speed = s[1];
                break;
              case "vw":
                o.ploadwait = parseInt(s[1], 0) || 5;
                break;
              case "sav":
                o.stopAV = l(s[1]);
                break;
              case "noint":
                o.noInt = l(s[1]);
                break;
              case "l":
                (o.loopcache = s[1]),
                  (o.loop =
                    "loop" === s[1] ||
                    "loopandnoslidestop" === s[1] ||
                    ("none" !== s[1] && l(s[1])));
                break;
              case "ptimer":
                o.pausetimer = l(s[1]);
                break;
              case "sat":
                o.waitToSlideTrans = l(s[1]);
                break;
              case "crossOriginVideo":
                o.crossOriginVideo = l(s[1]);
                break;
              case "poch":
                o.pauseOnSlideChange = l(s[1]);
            }
          }
        return (
          null == e.mp4 && null == e.webm && (o.fitCover = !1),
          void 0 !== e.bgvideo && (o.bgvideo = e.bgvideo),
          o.noInt && (o.controls = !1),
          void 0 !== e.mp4 && (o.mp4 = e.mp4),
          void 0 !== e.videomp4 && (o.mp4 = e.videomp4),
          void 0 !== e.ytid && (o.ytid = e.ytid),
          void 0 !== e.ogv && (o.ogv = e.ogv),
          void 0 !== e.webm && (o.webm = e.webm),
          void 0 !== e.vimeoid && (o.vimeoid = e.vimeoid),
          void 0 !== e.vatr && (o.vatr = e.vatr),
          void 0 !== e.videoattributes && (o.vatr = e.videoattributes),
          void 0 !== e.poster && (o.poster = e.poster),
          (o.slideid = i),
          (o.aplay = "true" === o.aplay || o.aplay),
          1 === o.bgvideo && (o.volume = "mute"),
          (o.ssec = n(o.start)),
          (o.esec = n(o.end)),
          (o.pausetimer =
            void 0 === o.pausetimer
              ? "loopandnoslidestop" !== o.loopcache
              : o.pausetimer),
          (o.inColumn = e._incolumn),
          (o.audio = e.audio),
          (!0 !== o.loop && "true" !== o.loop) ||
            (!0 !== o.nse && "true" !== o.nse) ||
            (o.loop = !1),
          o.aplay && o.twaudio && !o.bgvideo && (o.twaudio = !0),
          o
        );
      },
      S = function (e, t) {
        if (
          ((h[t].playingvideos =
            void 0 === h[t].playingvideos ? new Array() : h[t].playingvideos),
          h[t].videos[e[0].id].stopAV &&
            void 0 !== h[t].playingvideos &&
            0 < h[t].playingvideos.length)
        )
          for (var i in ((h[t].lastplayedvideos = jQuery.extend(
            !0,
            [],
            h[t].playingvideos
          )),
          h[t].playingvideos))
            h[t].playingvideos.hasOwnProperty(i) &&
              h.stopVideo(h[t].playingvideos[i], t);
        h[t].playingvideos.push(e), (h[t].videoIsPlaying = e);
      },
      x = function (e, t) {
        void 0 !== h[t] &&
          void 0 !== h[t] &&
          null != h[t].playingvideos &&
          0 <= jQuery.inArray(e, h[t].playingvideos) &&
          h[t].playingvideos.splice(jQuery.inArray(e, h[t].playingvideos), 1);
      },
      k = function (e, t) {
        var i, a, r;
        void 0 !== e &&
          (void 0 === t && (t = 0), h.ISM) &&
          !e.bgvideo &&
          (e.playPauseBtnTween &&
            e.playPauseBtnTween.kill &&
            e.playPauseBtnTween.kill(),
          (i = h.closestNode(e.video, "RS-LAYER")),
          (a = e.controls ? 1 : 0),
          (r = e.controls ? 0 : 0.3),
          e.controls && e.poster && 0 === t && (a = r = 0),
          i) &&
          (e.playPauseBtnTween = tpGS.gsap.to(
            i.querySelector(".tp-video-play-button"),
            { duration: r, delay: a, opacity: t }
          ));
      };
    (window.RS_MODULES = window.RS_MODULES || {}),
      (window.RS_MODULES.video = { loaded: !0, version: "6.6.9" }),
      window.RS_MODULES.checkMinimal && window.RS_MODULES.checkMinimal();
  })(jQuery);

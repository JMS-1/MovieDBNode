import { a as le } from "./chunk-V6X2ZYA7.js";
import { a as ie, c as re } from "./chunk-EHFEJAOY.js";
import { a as oe } from "./chunk-KZJDUHNS.js";
import { d as se } from "./chunk-ULFIRWOY.js";
import { a as te } from "./chunk-ISMOOVDM.js";
import { a as ne } from "./chunk-NLW5ZXLT.js";
import { c as U } from "./chunk-P27O67JQ.js";
import {
  $ as D,
  A as d,
  B as p,
  C as G,
  F,
  G as X,
  H as k,
  I as R,
  J as E,
  P as c,
  U as O,
  V as W,
  Z as x,
  _ as j,
  aa as V,
  ea as Q,
  f as A,
  fa as B,
  g as h,
  ha as K,
  ia as q,
  j as w,
  ja as H,
  k as I,
  ka as v,
  l as b,
  n as r,
  o as M,
  p as f,
  pa as J,
  q as S,
  qa as Y,
  ra as Z,
  s as L,
  sa as ee,
  t as l,
  w as o,
  x as s,
  y as u,
  z,
} from "./chunk-3P24T2OB.js";
var de = [
    {
      loadChildren: () =>
        import("./chunk-ABP6LIJG.js").then((e) => e.RecordingsModule),
      path: "",
      pathMatch: "full",
    },
    {
      loadChildren: () =>
        import("./chunk-4KHJAMPO.js").then((e) => e.RecordingModule),
      path: "recordings",
    },
    {
      loadChildren: () =>
        import("./chunk-V2QQALIZ.js").then((e) => e.SeriesModule),
      path: "series",
    },
    {
      loadChildren: () =>
        import("./chunk-MRWQBIP7.js").then((e) => e.ContainerModule),
      path: "containers",
    },
    {
      loadChildren: () =>
        import("./chunk-KTLMY47L.js").then((e) => e.LanguageModule),
      path: "languages",
    },
    {
      loadChildren: () =>
        import("./chunk-5JURQV35.js").then((e) => e.GenreModule),
      path: "genres",
    },
    {
      loadChildren: () =>
        import("./chunk-ABP6LIJG.js").then((e) => e.RecordingsModule),
      path: "**",
    },
  ],
  ae = (() => {
    class e {
      static {
        this.ɵfac = function (n) {
          return new (n || e)();
        };
      }
      static {
        this.ɵmod = S({ type: e });
      }
      static {
        this.ɵinj = h({ imports: [v.forRoot(de, { useHash: !0 }), v] });
      }
    }
    return e;
  })();
var T = (() => {
  class e {
    constructor() {
      (this._themeId = ie()),
        (this._theme = "default"),
        (this.theme = "default");
    }
    get theme() {
      return this._theme;
    }
    set theme(t) {
      this._theme = t;
      let n = document.getElementById(this._themeId);
      n ||
        ((n = document
          .querySelector("head")
          .appendChild(document.createElement("link"))),
        (n.id = this._themeId),
        (n.rel = "stylesheet")),
        (n.href = `assets/${t}/semantic.min.css`);
    }
    static {
      this.ɵfac = function (n) {
        return new (n || e)();
      };
    }
    static {
      this.ɵprov = A({ token: e, factory: e.ɵfac });
    }
  }
  return e;
})();
var he = ["menu"],
  fe = (e) => ({ active: e });
function Se(e, _e) {
  if (e & 1) {
    let t = z();
    o(0, "a", 7),
      p("click", function () {
        let i = w(t).$implicit,
          a = G();
        return I(a.select(i.route));
      }),
      R(1),
      s();
  }
  if (e & 2) {
    let t = _e.$implicit;
    l("ngClass", c(2, fe, t.active)), r(), E(t.text);
  }
}
var ue = (() => {
  class e {
    constructor() {
      (this.title = ""),
        (this.icon = "help"),
        (this.items = []),
        (this.onSelect = new b());
    }
    select(t) {
      this.onSelect.emit(t);
    }
    ngAfterViewInit() {
      let t = $(this.menu?.nativeElement);
      t.dropdown(), setTimeout(() => t.css("visibility", ""), 100);
    }
    ngOnDestroy() {
      $(this.menu?.nativeElement)?.dropdown("destroy");
    }
    static {
      this.ɵfac = function (n) {
        return new (n || e)();
      };
    }
    static {
      this.ɵcmp = f({
        type: e,
        selectors: [["app-sub-menu"]],
        viewQuery: function (n, i) {
          if ((n & 1 && F(he, 5), n & 2)) {
            let a;
            X((a = k())) && (i.menu = a.first);
          }
        },
        inputs: { title: "title", icon: "icon", items: "items" },
        outputs: { onSelect: "onSelect" },
        standalone: !1,
        decls: 9,
        vars: 3,
        consts: [
          ["menu", ""],
          [1, "ui", "dropdown", "item"],
          [1, "title"],
          [1, "ui", "icon", 3, "ngClass"],
          [1, "dropdown", "icon"],
          [1, "menu"],
          ["class", "item", 3, "ngClass", "click", 4, "ngFor", "ngForOf"],
          [1, "item", 3, "click", "ngClass"],
        ],
        template: function (n, i) {
          n & 1 &&
            (o(0, "div", 1, 0)(2, "div", 2),
            u(3, "i", 3),
            o(4, "div"),
            R(5),
            s()(),
            u(6, "i", 4),
            o(7, "div", 5),
            L(8, Se, 2, 4, "a", 6),
            s()()),
            n & 2 &&
              (r(3),
              l("ngClass", i.icon),
              r(2),
              E(i.title),
              r(3),
              l("ngForOf", i.items));
        },
        dependencies: [O, W],
        styles: [
          ".ui.dropdown.item[_ngcontent-%COMP%] > .title[_ngcontent-%COMP%]{position:relative;display:grid;grid-template-columns:auto auto;column-gap:2px;align-items:center}",
        ],
      });
    }
  }
  return e;
})();
var g = (e) => ({ active: e }),
  me = (() => {
    class e {
      constructor(t, n) {
        (this._router = t),
          (this._themes = n),
          (this.route = ""),
          (this.newRoutes = [
            { route: "/recordings/NEW/NEW", text: "Create Recording" },
            { route: "/series/NEW", text: "Create Series" },
            { route: "/containers/NEW", text: "Create Storage" },
            { route: "/languages/NEW", text: "Add Language" },
            { route: "/genres/NEW", text: "Add Category" },
          ]),
          (this.themeRoutes = [
            { route: "default", text: "Default" },
            { route: "alternate.1", text: "Variant 1" },
            { route: "alternate.2", text: "Variant 2" },
          ]),
          (this.languageRoutes = [
            { route: "/de", text: "Deutsch" },
            { route: "/en", text: "English" },
          ]),
          (this._routeWatch = t.events.subscribe((i) => {
            i instanceof B && (this.route = i.url);
          })),
          this.syncThemeRoutes();
      }
      syncThemeRoutes() {
        for (let t of this.themeRoutes)
          t.active = t.route === this._themes.theme;
      }
      get isSeries() {
        return this.route.startsWith("/series");
      }
      get isGenre() {
        return this.route.startsWith("/genres");
      }
      get isLanguage() {
        return this.route.startsWith("/languages");
      }
      get isContainer() {
        return this.route.startsWith("/containers");
      }
      get isRecording() {
        return this.route === "/" || this.route.startsWith("/recordings");
      }
      onNew(t) {
        this._router.navigateByUrl(t);
      }
      onLanguage(t) {
        window.location.href = t;
      }
      onTheme(t) {
        (this._themes.theme = t), this.syncThemeRoutes();
      }
      ngOnDestroy() {
        this._routeWatch.unsubscribe();
      }
      static {
        this.ɵfac = function (n) {
          return new (n || e)(M(q), M(T));
        };
      }
      static {
        this.ɵcmp = f({
          type: e,
          selectors: [["app-root"]],
          standalone: !1,
          decls: 27,
          vars: 18,
          consts: () => {
            let t;
            t = "New";
            let n;
            n = "Theme";
            let i;
            i = "Language";
            let a;
            a = "Recordings";
            let m;
            m = "Series";
            let N;
            N = "Storage";
            let P;
            P = "Languages";
            let y;
            return (
              (y = "Categories"),
              [
                a,
                m,
                N,
                P,
                y,
                [1, "root"],
                [1, "ui", "borderless", "menu"],
                ["routerLink", "", 1, "item", 3, "ngClass"],
                [1, "ui", "icon", "list"],
                ["routerLink", "series", 1, "item", 3, "ngClass"],
                [1, "ui", "icon", "layer", "group"],
                ["routerLink", "containers", 1, "item", 3, "ngClass"],
                [1, "ui", "icon", "folder"],
                ["routerLink", "languages", 1, "item", 3, "ngClass"],
                [1, "ui", "icon", "language"],
                ["routerLink", "genres", 1, "item", 3, "ngClass"],
                [1, "ui", "icon", "tag"],
                ["icon", "plus circle", "title", t, 3, "onSelect", "items"],
                ["icon", "font", "title", n, 3, "onSelect", "items"],
                [1, "right", "menu"],
                ["icon", "language", "title", i, 3, "onSelect", "items"],
              ]
            );
          },
          template: function (n, i) {
            n & 1 &&
              (o(0, "div", 5)(1, "div", 6)(2, "div", 7),
              u(3, "i", 8),
              o(4, "div"),
              d(5, 0),
              s()(),
              o(6, "div", 9),
              u(7, "i", 10),
              o(8, "div"),
              d(9, 1),
              s()(),
              o(10, "div", 11),
              u(11, "i", 12),
              o(12, "div"),
              d(13, 2),
              s()(),
              o(14, "div", 13),
              u(15, "i", 14),
              o(16, "div"),
              d(17, 3),
              s()(),
              o(18, "div", 15),
              u(19, "i", 16),
              o(20, "div"),
              d(21, 4),
              s()(),
              o(22, "app-sub-menu", 17),
              p("onSelect", function (m) {
                return i.onNew(m);
              }),
              s(),
              o(23, "app-sub-menu", 18),
              p("onSelect", function (m) {
                return i.onTheme(m);
              }),
              s(),
              o(24, "div", 19)(25, "app-sub-menu", 20),
              p("onSelect", function (m) {
                return i.onLanguage(m);
              }),
              s()()(),
              u(26, "router-outlet"),
              s()),
              n & 2 &&
                (r(2),
                l("ngClass", c(8, g, i.isRecording)),
                r(4),
                l("ngClass", c(10, g, i.isSeries)),
                r(4),
                l("ngClass", c(12, g, i.isContainer)),
                r(4),
                l("ngClass", c(14, g, i.isLanguage)),
                r(4),
                l("ngClass", c(16, g, i.isGenre)),
                r(4),
                l("items", i.newRoutes),
                r(),
                l("items", i.themeRoutes),
                r(2),
                l("items", i.languageRoutes));
          },
          dependencies: [K, H, O, ue],
          styles: [
            ".root[_ngcontent-%COMP%]{display:grid;grid-template-rows:auto auto 1fr;width:100%;height:100%;overflow:hidden}.root[_ngcontent-%COMP%] > .menu[_ngcontent-%COMP%] > .item[_ngcontent-%COMP%]{position:relative;display:grid;grid-template-columns:auto auto;align-items:center}",
          ],
        });
      }
    }
    return e;
  })();
var ce = (() => {
  class e {
    static {
      this.ɵfac = function (n) {
        return new (n || e)();
      };
    }
    static {
      this.ɵmod = S({ type: e, bootstrap: [me] });
    }
    static {
      this.ɵinj = h({
        providers: [Y, se, ne, Z, te, le, re, oe, T, ee, D(V())],
        imports: [ae, j, Q, U],
      });
    }
  }
  return e;
})();
J.production && void 0;
x()
  .bootstrapModule(ce)
  .catch((e) =>
    console.error(e)
  ); /**i18n:4f0ea12499191b9fb7bfd15ae35102ab286a3db89d761e221a76f1a80285e269*/

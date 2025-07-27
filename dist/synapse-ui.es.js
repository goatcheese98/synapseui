import { Fragment as Ps, defineComponent as rr, Comment as so, mergeProps as Cs, cloneVNode as io, h as Rr, computed as wt, createElementBlock as jt, openBlock as it, normalizeClass as yr, renderList as oo, normalizeStyle as Ms, toDisplayString as ao, ref as Ce, useSlots as lo, createBlock as Wn, unref as ar, withCtx as co, createCommentVNode as uo, createElementVNode as Os, renderSlot as qr, hasInjectionContext as fo, inject as ho, getCurrentInstance as po, reactive as mo, markRaw as Nt, effectScope as go, isRef as Xt, isReactive as kn, toRef as $r, toRaw as _o, nextTick as Xn, getCurrentScope as bo, onScopeDispose as yo, watch as xo, toRefs as qn, onMounted as vo, onUnmounted as wo } from "vue";
function Es(s) {
  return s ? s.flatMap((e) => e.type === Ps ? Es(e.children) : [e]) : [];
}
const ko = rr({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(s, { attrs: e, slots: t }) {
    return () => {
      var l;
      if (!t.default) return null;
      const r = Es(t.default()), n = r.findIndex((c) => c.type !== so);
      if (n === -1) return r;
      const i = r[n];
      (l = i.props) == null || delete l.ref;
      const o = i.props ? Cs(e, i.props) : e, a = io({
        ...i,
        props: {}
      }, o);
      return r.length === 1 ? a : (r[n] = a, r);
    };
  }
}), To = [
  "area",
  "img",
  "input"
], So = rr({
  name: "Primitive",
  inheritAttrs: !1,
  props: {
    asChild: {
      type: Boolean,
      default: !1
    },
    as: {
      type: [String, Object],
      default: "div"
    }
  },
  setup(s, { attrs: e, slots: t }) {
    const r = s.asChild ? "template" : s.as;
    return typeof r == "string" && To.includes(r) ? () => Rr(r, e) : r !== "template" ? () => Rr(s.as, e, { default: t.default }) : () => Rr(ko, e, { default: t.default });
  }
});
var Hn = (s) => typeof s == "boolean" ? `${s}` : s === 0 ? "0" : s, he = (s) => !s || typeof s != "object" || Object.keys(s).length === 0, Po = (s, e) => JSON.stringify(s) === JSON.stringify(e);
function As(s, e) {
  s.forEach(function(t) {
    Array.isArray(t) ? As(t, e) : e.push(t);
  });
}
function zs(s) {
  let e = [];
  return As(s, e), e;
}
var Rs = (...s) => zs(s).filter(Boolean), $s = (s, e) => {
  let t = {}, r = Object.keys(s), n = Object.keys(e);
  for (let i of r) if (n.includes(i)) {
    let o = s[i], a = e[i];
    Array.isArray(o) || Array.isArray(a) ? t[i] = Rs(a, o) : typeof o == "object" && typeof a == "object" ? t[i] = $s(o, a) : t[i] = a + " " + o;
  } else t[i] = s[i];
  for (let i of n) r.includes(i) || (t[i] = e[i]);
  return t;
}, Qn = (s) => !s || typeof s != "string" ? s : s.replace(/\s+/g, " ").trim();
const Tn = "-", Co = (s) => {
  const e = Oo(s), {
    conflictingClassGroups: t,
    conflictingClassGroupModifiers: r
  } = s;
  return {
    getClassGroupId: (o) => {
      const a = o.split(Tn);
      return a[0] === "" && a.length !== 1 && a.shift(), Ds(a, e) || Mo(o);
    },
    getConflictingClassGroupIds: (o, a) => {
      const l = t[o] || [];
      return a && r[o] ? [...l, ...r[o]] : l;
    }
  };
}, Ds = (s, e) => {
  var o;
  if (s.length === 0)
    return e.classGroupId;
  const t = s[0], r = e.nextPart.get(t), n = r ? Ds(s.slice(1), r) : void 0;
  if (n)
    return n;
  if (e.validators.length === 0)
    return;
  const i = s.join(Tn);
  return (o = e.validators.find(({
    validator: a
  }) => a(i))) == null ? void 0 : o.classGroupId;
}, Jn = /^\[(.+)\]$/, Mo = (s) => {
  if (Jn.test(s)) {
    const e = Jn.exec(s)[1], t = e == null ? void 0 : e.substring(0, e.indexOf(":"));
    if (t)
      return "arbitrary.." + t;
  }
}, Oo = (s) => {
  const {
    theme: e,
    classGroups: t
  } = s, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const n in t)
    Hr(t[n], r, n, e);
  return r;
}, Hr = (s, e, t, r) => {
  s.forEach((n) => {
    if (typeof n == "string") {
      const i = n === "" ? e : Zn(e, n);
      i.classGroupId = t;
      return;
    }
    if (typeof n == "function") {
      if (Eo(n)) {
        Hr(n(r), e, t, r);
        return;
      }
      e.validators.push({
        validator: n,
        classGroupId: t
      });
      return;
    }
    Object.entries(n).forEach(([i, o]) => {
      Hr(o, Zn(e, i), t, r);
    });
  });
}, Zn = (s, e) => {
  let t = s;
  return e.split(Tn).forEach((r) => {
    t.nextPart.has(r) || t.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), t = t.nextPart.get(r);
  }), t;
}, Eo = (s) => s.isThemeGetter, Ao = (s) => {
  if (s < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let e = 0, t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const n = (i, o) => {
    t.set(i, o), e++, e > s && (e = 0, r = t, t = /* @__PURE__ */ new Map());
  };
  return {
    get(i) {
      let o = t.get(i);
      if (o !== void 0)
        return o;
      if ((o = r.get(i)) !== void 0)
        return n(i, o), o;
    },
    set(i, o) {
      t.has(i) ? t.set(i, o) : n(i, o);
    }
  };
}, Qr = "!", Jr = ":", zo = Jr.length, Ro = (s) => {
  const {
    prefix: e,
    experimentalParseClassName: t
  } = s;
  let r = (n) => {
    const i = [];
    let o = 0, a = 0, l = 0, c;
    for (let m = 0; m < n.length; m++) {
      let d = n[m];
      if (o === 0 && a === 0) {
        if (d === Jr) {
          i.push(n.slice(l, m)), l = m + zo;
          continue;
        }
        if (d === "/") {
          c = m;
          continue;
        }
      }
      d === "[" ? o++ : d === "]" ? o-- : d === "(" ? a++ : d === ")" && a--;
    }
    const u = i.length === 0 ? n : n.substring(l), f = $o(u), p = f !== u, h = c && c > l ? c - l : void 0;
    return {
      modifiers: i,
      hasImportantModifier: p,
      baseClassName: f,
      maybePostfixModifierPosition: h
    };
  };
  if (e) {
    const n = e + Jr, i = r;
    r = (o) => o.startsWith(n) ? i(o.substring(n.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: o,
      maybePostfixModifierPosition: void 0
    };
  }
  if (t) {
    const n = r;
    r = (i) => t({
      className: i,
      parseClassName: n
    });
  }
  return r;
}, $o = (s) => s.endsWith(Qr) ? s.substring(0, s.length - 1) : s.startsWith(Qr) ? s.substring(1) : s, Do = (s) => {
  const e = Object.fromEntries(s.orderSensitiveModifiers.map((r) => [r, !0]));
  return (r) => {
    if (r.length <= 1)
      return r;
    const n = [];
    let i = [];
    return r.forEach((o) => {
      o[0] === "[" || e[o] ? (n.push(...i.sort(), o), i = []) : i.push(o);
    }), n.push(...i.sort()), n;
  };
}, No = (s) => ({
  cache: Ao(s.cacheSize),
  parseClassName: Ro(s),
  sortModifiers: Do(s),
  ...Co(s)
}), Io = /\s+/, Vo = (s, e) => {
  const {
    parseClassName: t,
    getClassGroupId: r,
    getConflictingClassGroupIds: n,
    sortModifiers: i
  } = e, o = [], a = s.trim().split(Io);
  let l = "";
  for (let c = a.length - 1; c >= 0; c -= 1) {
    const u = a[c], {
      isExternal: f,
      modifiers: p,
      hasImportantModifier: h,
      baseClassName: m,
      maybePostfixModifierPosition: d
    } = t(u);
    if (f) {
      l = u + (l.length > 0 ? " " + l : l);
      continue;
    }
    let g = !!d, x = r(g ? m.substring(0, d) : m);
    if (!x) {
      if (!g) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (x = r(m), !x) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      g = !1;
    }
    const b = i(p).join(":"), T = h ? b + Qr : b, k = T + x;
    if (o.includes(k))
      continue;
    o.push(k);
    const v = n(x, g);
    for (let y = 0; y < v.length; ++y) {
      const _ = v[y];
      o.push(T + _);
    }
    l = u + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function Fo() {
  let s = 0, e, t, r = "";
  for (; s < arguments.length; )
    (e = arguments[s++]) && (t = Ns(e)) && (r && (r += " "), r += t);
  return r;
}
const Ns = (s) => {
  if (typeof s == "string")
    return s;
  let e, t = "";
  for (let r = 0; r < s.length; r++)
    s[r] && (e = Ns(s[r])) && (t && (t += " "), t += e);
  return t;
};
function Zr(s, ...e) {
  let t, r, n, i = o;
  function o(l) {
    const c = e.reduce((u, f) => f(u), s());
    return t = No(c), r = t.cache.get, n = t.cache.set, i = a, a(l);
  }
  function a(l) {
    const c = r(l);
    if (c)
      return c;
    const u = Vo(l, t);
    return n(l, u), u;
  }
  return function() {
    return i(Fo.apply(null, arguments));
  };
}
const ae = (s) => {
  const e = (t) => t[s] || [];
  return e.isThemeGetter = !0, e;
}, Is = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Vs = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Lo = /^\d+\/\d+$/, Go = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, jo = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Bo = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Yo = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Uo = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ht = (s) => Lo.test(s), j = (s) => !!s && !Number.isNaN(Number(s)), Ze = (s) => !!s && Number.isInteger(Number(s)), Kn = (s) => s.endsWith("%") && j(s.slice(0, -1)), je = (s) => Go.test(s), Wo = () => !0, Xo = (s) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  jo.test(s) && !Bo.test(s)
), Sn = () => !1, qo = (s) => Yo.test(s), Ho = (s) => Uo.test(s), Qo = (s) => !N(s) && !I(s), Jo = (s) => Ot(s, Gs, Sn), N = (s) => Is.test(s), Ke = (s) => Ot(s, js, Xo), Dr = (s) => Ot(s, la, j), Zo = (s) => Ot(s, Fs, Sn), Ko = (s) => Ot(s, Ls, Ho), ea = (s) => Ot(s, Sn, qo), I = (s) => Vs.test(s), lr = (s) => Et(s, js), ta = (s) => Et(s, ca), ra = (s) => Et(s, Fs), na = (s) => Et(s, Gs), sa = (s) => Et(s, Ls), ia = (s) => Et(s, ua, !0), Ot = (s, e, t) => {
  const r = Is.exec(s);
  return r ? r[1] ? e(r[1]) : t(r[2]) : !1;
}, Et = (s, e, t = !1) => {
  const r = Vs.exec(s);
  return r ? r[1] ? e(r[1]) : t : !1;
}, Fs = (s) => s === "position", oa = /* @__PURE__ */ new Set(["image", "url"]), Ls = (s) => oa.has(s), aa = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Gs = (s) => aa.has(s), js = (s) => s === "length", la = (s) => s === "number", ca = (s) => s === "family-name", ua = (s) => s === "shadow", Kr = () => {
  const s = ae("color"), e = ae("font"), t = ae("text"), r = ae("font-weight"), n = ae("tracking"), i = ae("leading"), o = ae("breakpoint"), a = ae("container"), l = ae("spacing"), c = ae("radius"), u = ae("shadow"), f = ae("inset-shadow"), p = ae("drop-shadow"), h = ae("blur"), m = ae("perspective"), d = ae("aspect"), g = ae("ease"), x = ae("animate"), b = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], T = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], k = () => ["auto", "hidden", "clip", "visible", "scroll"], v = () => ["auto", "contain", "none"], y = () => [I, N, l], _ = () => [ht, "full", "auto", ...y()], w = () => [Ze, "none", "subgrid", I, N], S = () => ["auto", {
    span: ["full", Ze, I, N]
  }, I, N], C = () => [Ze, "auto", I, N], O = () => ["auto", "min", "max", "fr", I, N], M = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline"], A = () => ["start", "end", "center", "stretch"], z = () => ["auto", ...y()], R = () => [ht, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...y()], E = () => [s, I, N], F = () => [Kn, Ke], P = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    c,
    I,
    N
  ], L = () => ["", j, lr, Ke], U = () => ["solid", "dashed", "dotted", "double"], oe = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], W = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    h,
    I,
    N
  ], H = () => ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", I, N], Y = () => ["none", j, I, N], te = () => ["none", j, I, N], De = () => [j, I, N], Q = () => [ht, "full", ...y()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [je],
      breakpoint: [je],
      color: [Wo],
      container: [je],
      "drop-shadow": [je],
      ease: ["in", "out", "in-out"],
      font: [Qo],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [je],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [je],
      shadow: [je],
      spacing: ["px", j],
      text: [je],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", ht, N, I, d]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [j, N, I, a]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": b()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": b()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...T(), N, I]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: k()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": k()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": k()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: v()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": v()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": v()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: _()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": _()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": _()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: _()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: _()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: _()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: _()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: _()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: _()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [Ze, "auto", I, N]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [ht, "full", "auto", a, ...y()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [j, ht, "auto", "initial", "none", N]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", j, I, N]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", j, I, N]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Ze, "first", "last", "none", I, N]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": w()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: S()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": C()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": C()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": w()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: S()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": C()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": C()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": O()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": O()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: y()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": y()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": y()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...M(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...A(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...A()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...M()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...A(), "baseline"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...A(), "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": M()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...A(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...A()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: y()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: y()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: y()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: y()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: y()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: y()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: y()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: y()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: y()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: z()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: z()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: z()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: z()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: z()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: z()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: z()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: z()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: z()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": y()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": y()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: R()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [a, "screen", ...R()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          a,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...R()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          a,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [o]
          },
          ...R()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", ...R()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "none", ...R()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", ...R()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", t, lr, Ke]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [r, I, Dr]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Kn, N]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [ta, N, e]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [n, I, N]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [j, "none", I, Dr]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          i,
          ...y()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", I, N]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", I, N]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: E()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: E()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...U(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [j, "from-font", "auto", I, Ke]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: E()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [j, "auto", I, N]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: y()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", I, N]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", I, N]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...T(), ra, Zo]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "space", "round"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", na, Jo]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Ze, I, N],
          radial: ["", I, N],
          conic: [Ze, I, N]
        }, sa, Ko]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: E()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: F()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: F()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: F()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: E()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: E()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: E()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: P()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": P()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": P()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": P()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": P()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": P()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": P()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": P()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": P()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": P()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": P()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": P()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": P()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": P()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": P()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: L()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": L()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": L()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": L()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": L()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": L()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": L()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": L()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": L()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": L()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": L()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...U(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...U(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: E()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": E()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": E()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": E()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": E()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": E()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": E()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": E()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": E()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: E()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...U(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [j, I, N]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", j, lr, Ke]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [s]
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          u,
          ia,
          ea
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: E()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", I, N, f]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": E()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: L()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: E()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [j, Ke]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": E()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": L()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": E()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [j, I, N]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...oe(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": oe()
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          I,
          N
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: W()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [j, I, N]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [j, I, N]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          p,
          I,
          N
        ]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", j, I, N]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [j, I, N]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", j, I, N]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [j, I, N]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", j, I, N]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          I,
          N
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": W()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [j, I, N]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [j, I, N]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", j, I, N]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [j, I, N]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", j, I, N]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [j, I, N]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [j, I, N]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", j, I, N]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": y()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": y()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": y()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", I, N]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [j, "initial", I, N]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", g, I, N]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [j, I, N]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", x, I, N]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [m, I, N]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": H()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: Y()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": Y()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": Y()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": Y()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: te()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": te()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": te()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": te()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: De()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": De()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": De()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [I, N, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: H()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: Q()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": Q()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": Q()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": Q()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: E()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: E()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", I, N]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": y()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": y()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": y()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": y()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": y()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": y()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": y()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": y()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": y()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": y()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": y()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": y()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": y()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": y()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": y()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": y()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": y()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": y()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", I, N]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...E()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [j, lr, Ke, Dr]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...E()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["before", "after", "placeholder", "file", "marker", "selection", "first-line", "first-letter", "backdrop", "*", "**"]
  };
}, da = (s, {
  cacheSize: e,
  prefix: t,
  experimentalParseClassName: r,
  extend: n = {},
  override: i = {}
}) => (It(s, "cacheSize", e), It(s, "prefix", t), It(s, "experimentalParseClassName", r), cr(s.theme, i.theme), cr(s.classGroups, i.classGroups), cr(s.conflictingClassGroups, i.conflictingClassGroups), cr(s.conflictingClassGroupModifiers, i.conflictingClassGroupModifiers), It(s, "orderSensitiveModifiers", i.orderSensitiveModifiers), ur(s.theme, n.theme), ur(s.classGroups, n.classGroups), ur(s.conflictingClassGroups, n.conflictingClassGroups), ur(s.conflictingClassGroupModifiers, n.conflictingClassGroupModifiers), Bs(s, n, "orderSensitiveModifiers"), s), It = (s, e, t) => {
  t !== void 0 && (s[e] = t);
}, cr = (s, e) => {
  if (e)
    for (const t in e)
      It(s, t, e[t]);
}, ur = (s, e) => {
  if (e)
    for (const t in e)
      Bs(s, e, t);
}, Bs = (s, e, t) => {
  const r = e[t];
  r !== void 0 && (s[t] = s[t] ? s[t].concat(r) : r);
}, fa = (s, ...e) => typeof s == "function" ? Zr(Kr, s, ...e) : Zr(() => da(Kr(), s), ...e), ha = /* @__PURE__ */ Zr(Kr);
var pa = { twMerge: !0, twMergeConfig: {}, responsiveVariants: !1 }, Ys = (s) => s || void 0, qt = (...s) => Ys(zs(s).filter(Boolean).join(" ")), Nr = null, Ie = {}, en = !1, Rt = (...s) => (e) => e.twMerge ? ((!Nr || en) && (en = !1, Nr = he(Ie) ? ha : fa({ ...Ie, extend: { theme: Ie.theme, classGroups: Ie.classGroups, conflictingClassGroupModifiers: Ie.conflictingClassGroupModifiers, conflictingClassGroups: Ie.conflictingClassGroups, ...Ie.extend } })), Ys(Nr(qt(s)))) : qt(s), es = (s, e) => {
  for (let t in e) s.hasOwnProperty(t) ? s[t] = qt(s[t], e[t]) : s[t] = e[t];
  return s;
}, Mr = (s, e) => {
  let { extend: t = null, slots: r = {}, variants: n = {}, compoundVariants: i = [], compoundSlots: o = [], defaultVariants: a = {} } = s, l = { ...pa, ...e }, c = t != null && t.base ? qt(t.base, s == null ? void 0 : s.base) : s == null ? void 0 : s.base, u = t != null && t.variants && !he(t.variants) ? $s(n, t.variants) : n, f = t != null && t.defaultVariants && !he(t.defaultVariants) ? { ...t.defaultVariants, ...a } : a;
  !he(l.twMergeConfig) && !Po(l.twMergeConfig, Ie) && (en = !0, Ie = l.twMergeConfig);
  let p = he(t == null ? void 0 : t.slots), h = he(r) ? {} : { base: qt(s == null ? void 0 : s.base, p && (t == null ? void 0 : t.base)), ...r }, m = p ? h : es({ ...t == null ? void 0 : t.slots }, he(h) ? { base: s == null ? void 0 : s.base } : h), d = he(t == null ? void 0 : t.compoundVariants) ? i : Rs(t == null ? void 0 : t.compoundVariants, i), g = (b) => {
    if (he(u) && he(r) && p) return Rt(c, b == null ? void 0 : b.class, b == null ? void 0 : b.className)(l);
    if (d && !Array.isArray(d)) throw new TypeError(`The "compoundVariants" prop must be an array. Received: ${typeof d}`);
    if (o && !Array.isArray(o)) throw new TypeError(`The "compoundSlots" prop must be an array. Received: ${typeof o}`);
    let T = (M, A, z = [], R) => {
      let E = z;
      if (typeof A == "string") E = E.concat(Qn(A).split(" ").map((F) => `${M}:${F}`));
      else if (Array.isArray(A)) E = E.concat(A.reduce((F, P) => F.concat(`${M}:${P}`), []));
      else if (typeof A == "object" && typeof R == "string") {
        for (let F in A) if (A.hasOwnProperty(F) && F === R) {
          let P = A[F];
          if (P && typeof P == "string") {
            let L = Qn(P);
            E[R] ? E[R] = E[R].concat(L.split(" ").map((U) => `${M}:${U}`)) : E[R] = L.split(" ").map((U) => `${M}:${U}`);
          } else Array.isArray(P) && P.length > 0 && (E[R] = P.reduce((L, U) => L.concat(`${M}:${U}`), []));
        }
      }
      return E;
    }, k = (M, A = u, z = null, R = null) => {
      var E;
      let F = A[M];
      if (!F || he(F)) return null;
      let P = (E = R == null ? void 0 : R[M]) != null ? E : b == null ? void 0 : b[M];
      if (P === null) return null;
      let L = Hn(P), U = Array.isArray(l.responsiveVariants) && l.responsiveVariants.length > 0 || l.responsiveVariants === !0, oe = f == null ? void 0 : f[M], W = [];
      if (typeof L == "object" && U) for (let [te, De] of Object.entries(L)) {
        let Q = F[De];
        if (te === "initial") {
          oe = De;
          continue;
        }
        Array.isArray(l.responsiveVariants) && !l.responsiveVariants.includes(te) || (W = T(te, Q, W, z));
      }
      let H = L != null && typeof L != "object" ? L : Hn(oe), Y = F[H || "false"];
      return typeof W == "object" && typeof z == "string" && W[z] ? es(W, Y) : W.length > 0 ? (W.push(Y), z === "base" ? W.join(" ") : W) : Y;
    }, v = () => u ? Object.keys(u).map((M) => k(M, u)) : null, y = (M, A) => {
      if (!u || typeof u != "object") return null;
      let z = new Array();
      for (let R in u) {
        let E = k(R, u, M, A), F = M === "base" && typeof E == "string" ? E : E && E[M];
        F && (z[z.length] = F);
      }
      return z;
    }, _ = {};
    for (let M in b) b[M] !== void 0 && (_[M] = b[M]);
    let w = (M, A) => {
      var z;
      let R = typeof (b == null ? void 0 : b[M]) == "object" ? { [M]: (z = b[M]) == null ? void 0 : z.initial } : {};
      return { ...f, ..._, ...R, ...A };
    }, S = (M = [], A) => {
      let z = [];
      for (let { class: R, className: E, ...F } of M) {
        let P = !0;
        for (let [L, U] of Object.entries(F)) {
          let oe = w(L, A)[L];
          if (Array.isArray(U)) {
            if (!U.includes(oe)) {
              P = !1;
              break;
            }
          } else {
            let W = (H) => H == null || H === !1;
            if (W(U) && W(oe)) continue;
            if (oe !== U) {
              P = !1;
              break;
            }
          }
        }
        P && (R && z.push(R), E && z.push(E));
      }
      return z;
    }, C = (M) => {
      let A = S(d, M);
      if (!Array.isArray(A)) return A;
      let z = {};
      for (let R of A) if (typeof R == "string" && (z.base = Rt(z.base, R)(l)), typeof R == "object") for (let [E, F] of Object.entries(R)) z[E] = Rt(z[E], F)(l);
      return z;
    }, O = (M) => {
      if (o.length < 1) return null;
      let A = {};
      for (let { slots: z = [], class: R, className: E, ...F } of o) {
        if (!he(F)) {
          let P = !0;
          for (let L of Object.keys(F)) {
            let U = w(L, M)[L];
            if (U === void 0 || (Array.isArray(F[L]) ? !F[L].includes(U) : F[L] !== U)) {
              P = !1;
              break;
            }
          }
          if (!P) continue;
        }
        for (let P of z) A[P] = A[P] || [], A[P].push([R, E]);
      }
      return A;
    };
    if (!he(r) || !p) {
      let M = {};
      if (typeof m == "object" && !he(m)) for (let A of Object.keys(m)) M[A] = (z) => {
        var R, E;
        return Rt(m[A], y(A, z), ((R = C(z)) != null ? R : [])[A], ((E = O(z)) != null ? E : [])[A], z == null ? void 0 : z.class, z == null ? void 0 : z.className)(l);
      };
      return M;
    }
    return Rt(c, v(), S(d), b == null ? void 0 : b.class, b == null ? void 0 : b.className)(l);
  }, x = () => {
    if (!(!u || typeof u != "object")) return Object.keys(u);
  };
  return g.variantKeys = x(), g.extend = t, g.base = c, g.slots = m, g.variants = u, g.defaultVariants = f, g.compoundSlots = o, g.compoundVariants = d, g;
};
const ma = Mr({
  base: [
    // Layout & positioning
    "inline-flex items-center justify-center whitespace-nowrap",
    // Typography
    "text-sm font-medium",
    // Interactions - using token classes
    "transition-colors duration-token-normal",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    // Border radius from tokens
    "rounded-token-md"
  ],
  variants: {
    variant: {
      // ✅ Using Tailwind token classes (clean and concise!)
      primary: [
        "text-primary-text",
        "bg-primary",
        "border border-primary-border",
        "hover:bg-primary-hover",
        "focus-visible:ring-primary"
      ],
      secondary: [
        "text-secondary-text",
        "bg-secondary",
        "border border-secondary-border",
        "hover:bg-secondary-hover",
        "focus-visible:ring-secondary"
      ],
      success: [
        "text-success-text",
        "bg-success",
        "border border-success-border",
        "hover:bg-success-hover",
        "focus-visible:ring-success"
      ],
      warning: [
        "text-warning-text",
        "bg-warning",
        "border border-warning-border",
        "hover:bg-warning-hover",
        "focus-visible:ring-warning"
      ],
      error: [
        "text-error-text",
        "bg-error",
        "border border-error-border",
        "hover:bg-error-hover",
        "focus-visible:ring-error"
      ],
      // Outline variants - use primary colors with transparency
      outline: [
        "text-primary",
        "bg-transparent",
        "border border-primary",
        "hover:bg-primary hover:text-primary-text"
      ],
      // Ghost variants - subtle with hover effects
      ghost: [
        "text-text-primary",
        "bg-transparent",
        "border border-transparent",
        "hover:bg-background-muted hover:text-text-primary"
      ],
      // Link variant
      link: [
        "text-primary",
        "bg-transparent border-none shadow-none h-auto p-2",
        "hover:underline underline-offset-4"
      ]
    },
    size: {
      // Using spacing token classes
      xs: "h-7 px-token-sm text-xs",
      sm: "h-9 px-token-md text-sm",
      md: "h-10 px-token-lg text-sm",
      lg: "h-12 px-token-xl text-base",
      xl: "h-14 px-token-2xl text-lg",
      // Icon button sizes
      "icon-xs": "h-6 w-6 p-0 text-xs",
      "icon-sm": "h-8 w-8 p-0 text-sm",
      "icon-md": "h-10 w-10 p-0 text-base",
      "icon-lg": "h-12 w-12 p-0 text-lg",
      "icon-xl": "h-16 w-16 p-0 text-xl"
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "md"
  }
});
function Us(s) {
  var e, t, r = "";
  if (typeof s == "string" || typeof s == "number") r += s;
  else if (typeof s == "object") if (Array.isArray(s)) {
    var n = s.length;
    for (e = 0; e < n; e++) s[e] && (t = Us(s[e])) && (r && (r += " "), r += t);
  } else for (t in s) s[t] && (r && (r += " "), r += t);
  return r;
}
function ga() {
  for (var s, e, t = 0, r = "", n = arguments.length; t < n; t++) (s = arguments[t]) && (e = Us(s)) && (r && (r += " "), r += e);
  return r;
}
const Pn = "-", _a = (s) => {
  const e = ya(s), {
    conflictingClassGroups: t,
    conflictingClassGroupModifiers: r
  } = s;
  return {
    getClassGroupId: (o) => {
      const a = o.split(Pn);
      return a[0] === "" && a.length !== 1 && a.shift(), Ws(a, e) || ba(o);
    },
    getConflictingClassGroupIds: (o, a) => {
      const l = t[o] || [];
      return a && r[o] ? [...l, ...r[o]] : l;
    }
  };
}, Ws = (s, e) => {
  var o;
  if (s.length === 0)
    return e.classGroupId;
  const t = s[0], r = e.nextPart.get(t), n = r ? Ws(s.slice(1), r) : void 0;
  if (n)
    return n;
  if (e.validators.length === 0)
    return;
  const i = s.join(Pn);
  return (o = e.validators.find(({
    validator: a
  }) => a(i))) == null ? void 0 : o.classGroupId;
}, ts = /^\[(.+)\]$/, ba = (s) => {
  if (ts.test(s)) {
    const e = ts.exec(s)[1], t = e == null ? void 0 : e.substring(0, e.indexOf(":"));
    if (t)
      return "arbitrary.." + t;
  }
}, ya = (s) => {
  const {
    theme: e,
    classGroups: t
  } = s, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const n in t)
    tn(t[n], r, n, e);
  return r;
}, tn = (s, e, t, r) => {
  s.forEach((n) => {
    if (typeof n == "string") {
      const i = n === "" ? e : rs(e, n);
      i.classGroupId = t;
      return;
    }
    if (typeof n == "function") {
      if (xa(n)) {
        tn(n(r), e, t, r);
        return;
      }
      e.validators.push({
        validator: n,
        classGroupId: t
      });
      return;
    }
    Object.entries(n).forEach(([i, o]) => {
      tn(o, rs(e, i), t, r);
    });
  });
}, rs = (s, e) => {
  let t = s;
  return e.split(Pn).forEach((r) => {
    t.nextPart.has(r) || t.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), t = t.nextPart.get(r);
  }), t;
}, xa = (s) => s.isThemeGetter, va = (s) => {
  if (s < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let e = 0, t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const n = (i, o) => {
    t.set(i, o), e++, e > s && (e = 0, r = t, t = /* @__PURE__ */ new Map());
  };
  return {
    get(i) {
      let o = t.get(i);
      if (o !== void 0)
        return o;
      if ((o = r.get(i)) !== void 0)
        return n(i, o), o;
    },
    set(i, o) {
      t.has(i) ? t.set(i, o) : n(i, o);
    }
  };
}, rn = "!", nn = ":", wa = nn.length, ka = (s) => {
  const {
    prefix: e,
    experimentalParseClassName: t
  } = s;
  let r = (n) => {
    const i = [];
    let o = 0, a = 0, l = 0, c;
    for (let m = 0; m < n.length; m++) {
      let d = n[m];
      if (o === 0 && a === 0) {
        if (d === nn) {
          i.push(n.slice(l, m)), l = m + wa;
          continue;
        }
        if (d === "/") {
          c = m;
          continue;
        }
      }
      d === "[" ? o++ : d === "]" ? o-- : d === "(" ? a++ : d === ")" && a--;
    }
    const u = i.length === 0 ? n : n.substring(l), f = Ta(u), p = f !== u, h = c && c > l ? c - l : void 0;
    return {
      modifiers: i,
      hasImportantModifier: p,
      baseClassName: f,
      maybePostfixModifierPosition: h
    };
  };
  if (e) {
    const n = e + nn, i = r;
    r = (o) => o.startsWith(n) ? i(o.substring(n.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: o,
      maybePostfixModifierPosition: void 0
    };
  }
  if (t) {
    const n = r;
    r = (i) => t({
      className: i,
      parseClassName: n
    });
  }
  return r;
}, Ta = (s) => s.endsWith(rn) ? s.substring(0, s.length - 1) : s.startsWith(rn) ? s.substring(1) : s, Sa = (s) => {
  const e = Object.fromEntries(s.orderSensitiveModifiers.map((r) => [r, !0]));
  return (r) => {
    if (r.length <= 1)
      return r;
    const n = [];
    let i = [];
    return r.forEach((o) => {
      o[0] === "[" || e[o] ? (n.push(...i.sort(), o), i = []) : i.push(o);
    }), n.push(...i.sort()), n;
  };
}, Pa = (s) => ({
  cache: va(s.cacheSize),
  parseClassName: ka(s),
  sortModifiers: Sa(s),
  ..._a(s)
}), Ca = /\s+/, Ma = (s, e) => {
  const {
    parseClassName: t,
    getClassGroupId: r,
    getConflictingClassGroupIds: n,
    sortModifiers: i
  } = e, o = [], a = s.trim().split(Ca);
  let l = "";
  for (let c = a.length - 1; c >= 0; c -= 1) {
    const u = a[c], {
      isExternal: f,
      modifiers: p,
      hasImportantModifier: h,
      baseClassName: m,
      maybePostfixModifierPosition: d
    } = t(u);
    if (f) {
      l = u + (l.length > 0 ? " " + l : l);
      continue;
    }
    let g = !!d, x = r(g ? m.substring(0, d) : m);
    if (!x) {
      if (!g) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (x = r(m), !x) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      g = !1;
    }
    const b = i(p).join(":"), T = h ? b + rn : b, k = T + x;
    if (o.includes(k))
      continue;
    o.push(k);
    const v = n(x, g);
    for (let y = 0; y < v.length; ++y) {
      const _ = v[y];
      o.push(T + _);
    }
    l = u + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function Oa() {
  let s = 0, e, t, r = "";
  for (; s < arguments.length; )
    (e = arguments[s++]) && (t = Xs(e)) && (r && (r += " "), r += t);
  return r;
}
const Xs = (s) => {
  if (typeof s == "string")
    return s;
  let e, t = "";
  for (let r = 0; r < s.length; r++)
    s[r] && (e = Xs(s[r])) && (t && (t += " "), t += e);
  return t;
};
function Ea(s, ...e) {
  let t, r, n, i = o;
  function o(l) {
    const c = e.reduce((u, f) => f(u), s());
    return t = Pa(c), r = t.cache.get, n = t.cache.set, i = a, a(l);
  }
  function a(l) {
    const c = r(l);
    if (c)
      return c;
    const u = Ma(l, t);
    return n(l, u), u;
  }
  return function() {
    return i(Oa.apply(null, arguments));
  };
}
const ie = (s) => {
  const e = (t) => t[s] || [];
  return e.isThemeGetter = !0, e;
}, qs = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Hs = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Aa = /^\d+\/\d+$/, za = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Ra = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, $a = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Da = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Na = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, pt = (s) => Aa.test(s), G = (s) => !!s && !Number.isNaN(Number(s)), Be = (s) => !!s && Number.isInteger(Number(s)), Ir = (s) => s.endsWith("%") && G(s.slice(0, -1)), Ne = (s) => za.test(s), Ia = () => !0, Va = (s) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Ra.test(s) && !$a.test(s)
), Qs = () => !1, Fa = (s) => Da.test(s), La = (s) => Na.test(s), Ga = (s) => !$(s) && !D(s), ja = (s) => At(s, Ks, Qs), $ = (s) => qs.test(s), et = (s) => At(s, ei, Va), Vr = (s) => At(s, Xa, G), ns = (s) => At(s, Js, Qs), Ba = (s) => At(s, Zs, La), dr = (s) => At(s, ti, Fa), D = (s) => Hs.test(s), $t = (s) => zt(s, ei), Ya = (s) => zt(s, qa), ss = (s) => zt(s, Js), Ua = (s) => zt(s, Ks), Wa = (s) => zt(s, Zs), fr = (s) => zt(s, ti, !0), At = (s, e, t) => {
  const r = qs.exec(s);
  return r ? r[1] ? e(r[1]) : t(r[2]) : !1;
}, zt = (s, e, t = !1) => {
  const r = Hs.exec(s);
  return r ? r[1] ? e(r[1]) : t : !1;
}, Js = (s) => s === "position" || s === "percentage", Zs = (s) => s === "image" || s === "url", Ks = (s) => s === "length" || s === "size" || s === "bg-size", ei = (s) => s === "length", Xa = (s) => s === "number", qa = (s) => s === "family-name", ti = (s) => s === "shadow", Ha = () => {
  const s = ie("color"), e = ie("font"), t = ie("text"), r = ie("font-weight"), n = ie("tracking"), i = ie("leading"), o = ie("breakpoint"), a = ie("container"), l = ie("spacing"), c = ie("radius"), u = ie("shadow"), f = ie("inset-shadow"), p = ie("text-shadow"), h = ie("drop-shadow"), m = ie("blur"), d = ie("perspective"), g = ie("aspect"), x = ie("ease"), b = ie("animate"), T = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], k = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], v = () => [...k(), D, $], y = () => ["auto", "hidden", "clip", "visible", "scroll"], _ = () => ["auto", "contain", "none"], w = () => [D, $, l], S = () => [pt, "full", "auto", ...w()], C = () => [Be, "none", "subgrid", D, $], O = () => ["auto", {
    span: ["full", Be, D, $]
  }, Be, D, $], M = () => [Be, "auto", D, $], A = () => ["auto", "min", "max", "fr", D, $], z = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], R = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], E = () => ["auto", ...w()], F = () => [pt, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...w()], P = () => [s, D, $], L = () => [...k(), ss, ns, {
    position: [D, $]
  }], U = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], oe = () => ["auto", "cover", "contain", Ua, ja, {
    size: [D, $]
  }], W = () => [Ir, $t, et], H = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    c,
    D,
    $
  ], Y = () => ["", G, $t, et], te = () => ["solid", "dashed", "dotted", "double"], De = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Q = () => [G, Ir, ss, ns], Un = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    m,
    D,
    $
  ], sr = () => ["none", G, D, $], ir = () => ["none", G, D, $], zr = () => [G, D, $], or = () => [pt, "full", ...w()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Ne],
      breakpoint: [Ne],
      color: [Ia],
      container: [Ne],
      "drop-shadow": [Ne],
      ease: ["in", "out", "in-out"],
      font: [Ga],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Ne],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Ne],
      shadow: [Ne],
      spacing: ["px", G],
      text: [Ne],
      "text-shadow": [Ne],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", pt, $, D, g]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [G, $, D, a]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": T()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": T()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: v()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: y()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": y()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": y()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: _()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": _()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": _()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: S()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": S()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": S()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: S()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: S()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: S()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: S()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: S()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: S()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [Be, "auto", D, $]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [pt, "full", "auto", a, ...w()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [G, pt, "auto", "initial", "none", $]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", G, D, $]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", G, D, $]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Be, "first", "last", "none", D, $]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": C()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: O()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": M()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": M()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": C()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: O()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": M()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": M()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": A()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": A()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: w()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": w()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": w()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...z(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...R(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...R()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...z()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...R(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...R(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": z()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...R(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...R()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: w()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: w()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: w()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: w()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: w()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: w()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: w()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: w()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: w()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: E()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: E()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: E()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: E()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: E()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: E()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: E()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: E()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: E()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": w()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": w()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: F()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [a, "screen", ...F()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          a,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...F()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          a,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [o]
          },
          ...F()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...F()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...F()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...F()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", t, $t, et]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [r, D, Vr]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Ir, $]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Ya, $, e]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [n, D, $]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [G, "none", D, Vr]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          i,
          ...w()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", D, $]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", D, $]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: P()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: P()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...te(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [G, "from-font", "auto", D, et]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: P()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [G, "auto", D, $]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: w()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", D, $]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", D, $]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: L()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: U()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: oe()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Be, D, $],
          radial: ["", D, $],
          conic: [Be, D, $]
        }, Wa, Ba]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: P()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: W()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: W()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: W()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: P()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: P()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: P()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: H()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": H()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": H()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": H()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": H()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": H()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": H()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": H()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": H()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": H()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": H()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": H()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": H()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": H()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": H()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: Y()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": Y()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": Y()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": Y()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": Y()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": Y()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": Y()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": Y()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": Y()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": Y()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": Y()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...te(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...te(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: P()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": P()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": P()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": P()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": P()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": P()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": P()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": P()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": P()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: P()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...te(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [G, D, $]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", G, $t, et]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: P()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          u,
          fr,
          dr
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: P()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", f, fr, dr]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": P()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: Y()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: P()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [G, et]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": P()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": Y()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": P()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", p, fr, dr]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": P()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [G, D, $]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...De(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": De()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [G]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": Q()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": Q()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": P()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": P()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": Q()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": Q()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": P()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": P()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": Q()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": Q()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": P()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": P()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": Q()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": Q()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": P()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": P()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": Q()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": Q()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": P()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": P()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": Q()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": Q()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": P()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": P()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": Q()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": Q()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": P()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": P()
      }],
      "mask-image-radial": [{
        "mask-radial": [D, $]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": Q()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": Q()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": P()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": P()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": k()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [G]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": Q()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": Q()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": P()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": P()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: L()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: U()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: oe()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", D, $]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          D,
          $
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: Un()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [G, D, $]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [G, D, $]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          h,
          fr,
          dr
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": P()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", G, D, $]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [G, D, $]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", G, D, $]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [G, D, $]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", G, D, $]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          D,
          $
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": Un()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [G, D, $]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [G, D, $]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", G, D, $]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [G, D, $]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", G, D, $]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [G, D, $]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [G, D, $]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", G, D, $]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": w()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": w()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": w()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", D, $]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [G, "initial", D, $]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", x, D, $]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [G, D, $]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", b, D, $]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [d, D, $]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": v()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: sr()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": sr()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": sr()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": sr()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: ir()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": ir()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": ir()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": ir()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: zr()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": zr()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": zr()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [D, $, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: v()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: or()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": or()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": or()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": or()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: P()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: P()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", D, $]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": w()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": w()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": w()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": w()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": w()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": w()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": w()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": w()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": w()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": w()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": w()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": w()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": w()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": w()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": w()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": w()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": w()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": w()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", D, $]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...P()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [G, $t, et, Vr]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...P()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, Qa = /* @__PURE__ */ Ea(Ha);
function sn(...s) {
  return Qa(ga(s));
}
const Ja = /* @__PURE__ */ rr({
  __name: "WarpedText",
  props: {
    text: { default: "" },
    isPressed: { type: Boolean, default: !1 },
    warpIntensity: { default: 1 },
    warpType: { default: "compress" }
  },
  setup(s) {
    const e = s, t = wt(() => e.text.split("")), r = (i) => {
      if (!e.isPressed)
        return {
          transform: "translateY(0px) scaleY(1) rotate(0deg)",
          transitionDelay: `${i * 8}ms`
        };
      const o = e.warpIntensity, a = t.value.length, l = i / Math.max(a - 1, 1), c = Math.abs(l - 0.5) * 2;
      let u = "", f = `${i * 8}ms`;
      switch (e.warpType) {
        case "wave":
          u = `translateY(${Math.sin(i * 0.8) * 2 * o}px) scaleY(${0.95 + Math.sin(i * 0.5) * 0.05})`;
          break;
        case "compress":
          const p = (1 - c * 0.3) * o;
          u = `translateY(${Math.sin(l * Math.PI) * 1.5 * o}px) scaleY(${0.9 + p * 0.05}) scaleX(${0.98 + c * 0.02})`;
          break;
        case "bend":
          const m = (c - 0.5) * 3 * o;
          u = `translateY(${Math.pow(c, 2) * 2 * o}px) scaleY(0.95) rotate(${m}deg)`;
          break;
        case "ripple":
          const g = Math.abs(l - 0.5) * Math.PI, x = Math.sin(g) * o;
          u = `translateY(${x}px) scaleY(${0.92 + x * 0.03})`, f = `${Math.abs(i - a / 2) * 12}ms`;
          break;
      }
      return {
        transform: u,
        transitionDelay: f,
        filter: `brightness(${0.95 - c * 0.03 * o})`
      };
    }, n = wt(() => [
      `warp-${e.warpType}`,
      { "letter-pressed": e.isPressed }
    ]);
    return (i, o) => (it(), jt("span", {
      class: yr(["warped-text", { "is-pressed": i.isPressed }])
    }, [
      (it(!0), jt(Ps, null, oo(t.value, (a, l) => (it(), jt("span", {
        key: `${a}-${l}`,
        style: Ms(r(l)),
        class: yr([n.value, "letter"])
      }, ao(a === " " ? " " : a), 7))), 128))
    ], 2));
  }
}), ri = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [r, n] of e)
    t[r] = n;
  return t;
}, Za = /* @__PURE__ */ ri(Ja, [["__scopeId", "data-v-4db776ac"]]), Ka = /* @__PURE__ */ rr({
  __name: "Button",
  props: {
    variant: { default: "primary" },
    size: { default: "md" },
    as: { default: "button" },
    asChild: { type: Boolean, default: !1 },
    type: { default: "button" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    enableTextWarp: { type: Boolean, default: !0 },
    textWarpType: { default: "compress" },
    textWarpIntensity: { default: 0.8 }
  },
  emits: ["click"],
  setup(s, { emit: e }) {
    const t = s, r = e, n = Ce(), i = Ce(""), o = Ce(!1), a = lo(), l = () => ({
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      "icon-xs": 12,
      "icon-sm": 14,
      "icon-md": 16,
      "icon-lg": 18,
      "icon-xl": 20
    })[t.size] || 16, c = () => {
      if (!a.default) return "";
      try {
        const d = a.default();
        return d && d[0] && typeof d[0].children == "string" ? d[0].children : (d == null ? void 0 : d.map((g) => typeof g.children == "string" ? g.children : "").join("")) || "";
      } catch {
        return "";
      }
    }, u = (d) => {
      t.disabled || t.loading || (t.enableTextWarp && (o.value = !0, setTimeout(() => {
        o.value = !1;
      }, 150)), r("click", d));
    }, f = (d) => {
      t.disabled || t.loading || m(d);
    }, p = (d) => {
    }, h = () => {
      i.value = "";
    }, m = (d) => {
      if (!n.value) return;
      const g = n.value.$el || n.value;
      if (!g || typeof g.getBoundingClientRect != "function") return;
      const x = g.getBoundingClientRect(), b = d.clientX - x.left, T = d.clientY - x.top, k = 15;
      i.value = "";
      let v = "";
      b <= k && T <= k ? v = "pulse-top-left" : b >= x.width - k && T <= k ? v = "pulse-top-right" : b <= k && T >= x.height - k ? v = "pulse-bottom-left" : b >= x.width - k && T >= x.height - k && (v = "pulse-bottom-right"), v && setTimeout(() => {
        i.value = v, setTimeout(() => {
          i.value = "";
        }, 500);
      }, 10);
    };
    return (d, g) => (it(), Wn(ar(So), Cs({
      ref_key: "buttonRef",
      ref: n,
      as: d.as,
      asChild: d.asChild,
      class: ar(sn)(ar(ma)({ variant: d.variant, size: d.size }), d.$attrs.class, "edge-morph-button", i.value),
      "data-state": d.loading ? "loading" : "idle",
      disabled: d.disabled || d.loading,
      type: d.type
    }, d.$attrs, {
      onClick: u,
      onMouseenter: f,
      onMousemove: p,
      onMouseleave: h
    }), {
      default: co(() => [
        d.loading ? (it(), jt("span", {
          key: 0,
          class: "loading-spinner",
          style: Ms({ width: `${l()}px`, height: `${l()}px` })
        }, null, 4)) : uo("", !0),
        Os("span", {
          class: yr(ar(sn)("button-content", d.loading && "button-content-loading"))
        }, [
          d.enableTextWarp && d.$slots.default ? (it(), Wn(Za, {
            key: 0,
            text: c(),
            "is-pressed": o.value,
            "warp-type": d.textWarpType,
            "warp-intensity": d.textWarpIntensity
          }, null, 8, ["text", "is-pressed", "warp-type", "warp-intensity"])) : qr(d.$slots, "default", { key: 1 }, void 0, !0)
        ], 2)
      ]),
      _: 3
    }, 16, ["as", "asChild", "class", "data-state", "disabled", "type"]));
  }
}), vc = /* @__PURE__ */ ri(Ka, [["__scopeId", "data-v-0c690152"]]), wc = Mr({
  base: [
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium",
    "ring-offset-background transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50"
  ],
  variants: {
    variant: {
      // Solid variants
      neutral: "bg-neutral-900 text-white hover:bg-neutral-950",
      primary: "bg-slate-700 text-white hover:bg-slate-800",
      secondary: "bg-indigo-700 text-white hover:bg-indigo-800",
      accent: "bg-orange-500 text-white hover:bg-orange-600",
      info: "bg-cyan-700 text-white hover:bg-cyan-800",
      success: "bg-green-700 text-white hover:bg-green-800",
      warning: "bg-amber-500 text-white hover:bg-amber-600",
      error: "bg-red-600 text-white hover:bg-red-700",
      // Outline variants
      outline: "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700",
      "outline-primary": "border border-slate-800 bg-transparent hover:bg-slate-50 text-slate-800",
      "outline-success": "border border-green-600 bg-transparent hover:bg-green-50 text-green-600",
      "outline-error": "border border-red-600 bg-transparent hover:bg-red-50 text-red-600",
      // Ghost variants - more visible
      ghost: "bg-transparent hover:bg-gray-100 text-gray-700 border border-transparent hover:border-gray-200",
      "ghost-primary": "bg-transparent hover:bg-slate-50 text-slate-800 border border-transparent hover:border-slate-200",
      link: "bg-transparent hover:underline text-slate-800 underline-offset-4 border-none shadow-none h-auto p-2"
    },
    size: {
      xs: "h-7 px-2 text-xs",
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
      xl: "h-14 px-8 text-lg",
      // Icon button sizes with clear visual differences
      "icon-xs": "h-6 w-6 p-0 text-xs",
      "icon-sm": "h-8 w-8 p-0 text-sm",
      "icon-md": "h-10 w-10 p-0 text-base",
      "icon-lg": "h-12 w-12 p-0 text-lg",
      "icon-xl": "h-16 w-16 p-0 text-xl"
    }
  },
  defaultVariants: {
    variant: "neutral",
    size: "md"
  }
}), V = {
  neutral: {
    50: "rgb(248 250 252)",
    100: "rgb(241 245 249)",
    500: "rgb(100 116 139)",
    600: "rgb(71 85 105)",
    700: "rgb(51 65 85)",
    900: "rgb(15 23 42)",
    950: "rgb(2 6 23)"
  },
  primary: {
    50: "rgb(248 250 252)",
    100: "rgb(241 245 249)",
    700: "rgb(51 65 85)",
    800: "rgb(30 41 59)",
    900: "rgb(15 23 42)"
  },
  secondary: {
    50: "rgb(238 242 255)",
    700: "rgb(67 56 202)",
    800: "rgb(55 48 163)"
  },
  accent: {
    50: "rgb(255 247 237)",
    500: "rgb(249 115 22)",
    600: "rgb(234 88 12)"
  },
  success: {
    50: "rgb(240 253 244)",
    600: "rgb(22 163 74)",
    700: "rgb(21 128 61)"
  },
  warning: {
    50: "rgb(255 251 235)",
    500: "rgb(245 158 11)",
    600: "rgb(217 119 6)"
  },
  error: {
    50: "rgb(254 242 242)",
    600: "rgb(220 38 38)",
    700: "rgb(185 28 28)"
  }
}, pr = {
  default: "transition-all duration-200 ease-out",
  focus: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
  disabled: "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
};
Mr({
  base: [
    "inline-flex items-center justify-center whitespace-nowrap font-medium",
    pr.default,
    pr.focus,
    pr.disabled
  ],
  variants: {
    variant: {
      // Solid variants using unified color system
      neutral: `bg-[${V.neutral[900]}] text-white hover:bg-[${V.neutral[950]}]`,
      primary: `bg-[${V.primary[700]}] text-white hover:bg-[${V.primary[800]}]`,
      secondary: `bg-[${V.secondary[700]}] text-white hover:bg-[${V.secondary[800]}]`,
      accent: `bg-[${V.accent[500]}] text-white hover:bg-[${V.accent[600]}]`,
      success: `bg-[${V.success[600]}] text-white hover:bg-[${V.success[700]}]`,
      warning: `bg-[${V.warning[500]}] text-white hover:bg-[${V.warning[600]}]`,
      error: `bg-[${V.error[600]}] text-white hover:bg-[${V.error[700]}]`,
      // Outline variants
      outline: `border border-[${V.neutral[500]}] bg-transparent hover:bg-[${V.neutral[50]}] text-[${V.neutral[700]}]`,
      "outline-primary": `border border-[${V.primary[700]}] bg-transparent hover:bg-[${V.primary[50]}] text-[${V.primary[700]}]`,
      "outline-success": `border border-[${V.success[600]}] bg-transparent hover:bg-[${V.success[50]}] text-[${V.success[600]}]`,
      "outline-error": `border border-[${V.error[600]}] bg-transparent hover:bg-[${V.error[50]}] text-[${V.error[600]}]`,
      // Ghost variants
      ghost: `bg-transparent hover:bg-[${V.neutral[100]}] text-[${V.neutral[700]}] border border-transparent hover:border-[${V.neutral[100]}]`,
      "ghost-primary": `bg-transparent hover:bg-[${V.primary[50]}] text-[${V.primary[700]}] border border-transparent hover:border-[${V.primary[100]}]`,
      link: `bg-transparent hover:underline text-[${V.primary[700]}] underline-offset-4 border-none shadow-none h-auto p-2`
    },
    size: {
      xs: "h-7 text-xs rounded-sm px-2",
      sm: "h-9 text-sm rounded-md px-3",
      md: "h-10 text-sm rounded-lg px-4",
      lg: "h-12 text-base rounded-xl px-6",
      xl: "h-14 text-lg rounded-2xl px-8",
      // Icon variants - perfectly square
      "icon-xs": "h-6 w-6 p-0 text-xs rounded-sm",
      "icon-sm": "h-8 w-8 p-0 text-sm rounded-md",
      "icon-md": "h-10 w-10 p-0 text-base rounded-lg",
      "icon-lg": "h-12 w-12 p-0 text-lg rounded-xl",
      "icon-xl": "h-16 w-16 p-0 text-xl rounded-2xl"
    },
    // NEW: Context-aware variants for interconnectedness
    context: {
      // When used inside different container contexts
      "in-card": "shadow-sm",
      "in-form": "w-full justify-center",
      "in-nav": "rounded-full px-3",
      "in-hero": "text-lg px-8 py-4 shadow-lg",
      "in-dialog": "min-w-[100px]"
    }
  },
  defaultVariants: {
    variant: "neutral",
    size: "md"
  },
  // Compound variants for complex relationships
  compoundVariants: [
    // When small size + in-card context
    {
      size: ["xs", "sm"],
      context: "in-card",
      class: "shadow-none border-0"
    },
    // When in form context + error variant
    {
      variant: ["error", "outline-error"],
      context: "in-form",
      class: "border-2 border-red-500"
    },
    // Hero buttons get special treatment
    {
      context: "in-hero",
      class: "transform hover:scale-105 transition-transform"
    }
  ]
});
Mr({
  base: [
    "rounded-lg transition-all duration-200",
    pr.default
  ],
  variants: {
    variant: {
      default: `border bg-white text-[${V.neutral[900]}] shadow-sm`,
      outline: `border-2 bg-transparent text-[${V.neutral[900]}]`,
      filled: `border-0 bg-[${V.primary[700]}] text-white shadow-md`,
      ghost: `border-0 bg-transparent text-[${V.neutral[900]}] hover:bg-[${V.neutral[50]}]`,
      // Intent-based variants
      primary: `border border-[${V.primary[200]}] bg-[${V.primary[50]}] text-[${V.primary[900]}]`,
      secondary: `border border-[${V.secondary[200]}] bg-[${V.secondary[50]}] text-[${V.secondary[900]}]`,
      accent: `border border-[${V.accent[200]}] bg-[${V.accent[50]}] text-[${V.accent[900]}]`,
      success: `border border-[${V.success[200]}] bg-[${V.success[50]}] text-[${V.success[700]}]`,
      warning: `border border-[${V.warning[200]}] bg-[${V.warning[50]}] text-[${V.warning[700]}]`,
      error: `border border-[${V.error[200]}] bg-[${V.error[50]}] text-[${V.error[700]}]`,
      muted: `border border-[${V.neutral[200]}] bg-[${V.neutral[100]}] text-[${V.neutral[600]}]`
    },
    size: {
      sm: "text-sm max-w-sm",
      md: "text-base max-w-md",
      lg: "text-lg max-w-lg",
      xl: "text-xl max-w-xl"
    },
    // Interactive states
    interactive: {
      true: "cursor-pointer hover:shadow-md hover:-translate-y-1",
      false: ""
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    interactive: !1
  }
});
const el = { class: "flex items-center gap-2" }, kc = /* @__PURE__ */ rr({
  __name: "FloatingDock",
  props: {
    variant: { default: "default" },
    size: { default: "md" },
    position: { default: "bottom" },
    className: {}
  },
  setup(s) {
    const e = s, t = wt(() => sn(
      // Base styles
      "fixed z-50 rounded-xl backdrop-blur-xl",
      "border border-white/20 dark:border-gray-800/50",
      "bg-white/80 dark:bg-gray-900/80",
      "shadow-lg hover:shadow-xl transition-shadow duration-200",
      // Size variants
      {
        "px-3 py-2 text-sm": e.size === "sm",
        "px-4 py-3 text-base": e.size === "md",
        "px-5 py-4 text-lg": e.size === "lg"
      },
      // Position variants
      {
        "bottom-6 left-1/2 -translate-x-1/2": e.position === "bottom",
        "top-6 left-1/2 -translate-x-1/2": e.position === "top",
        "left-6 top-1/2 -translate-y-1/2 flex-col": e.position === "left",
        "right-6 top-1/2 -translate-y-1/2 flex-col": e.position === "right"
      },
      // Style variants
      {
        // Default variant
        "bg-white/80 dark:bg-gray-900/80": e.variant === "default",
        // Compact variant
        "bg-gray-100/90 dark:bg-gray-800/90 rounded-full": e.variant === "compact",
        // Minimal variant
        "bg-transparent backdrop-blur-none border-none shadow-none": e.variant === "minimal"
      },
      e.className
    ));
    return (r, n) => (it(), jt("div", {
      class: yr(t.value)
    }, [
      Os("div", el, [
        qr(r.$slots, "icon"),
        qr(r.$slots, "default")
      ])
    ], 2));
  }
});
/*!
 * pinia v3.0.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let Vt;
const xr = (s) => Vt = s, tl = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function ut(s) {
  return s && typeof s == "object" && Object.prototype.toString.call(s) === "[object Object]" && typeof s.toJSON != "function";
}
var Bt;
(function(s) {
  s.direct = "direct", s.patchObject = "patch object", s.patchFunction = "patch function";
})(Bt || (Bt = {}));
const Ft = typeof window < "u";
function ni(s, e) {
  for (const t in e) {
    const r = e[t];
    if (!(t in s))
      continue;
    const n = s[t];
    ut(n) && ut(r) && !Xt(r) && !kn(r) ? s[t] = ni(n, r) : s[t] = r;
  }
  return s;
}
const si = () => {
};
function is(s, e, t, r = si) {
  s.push(e);
  const n = () => {
    const i = s.indexOf(e);
    i > -1 && (s.splice(i, 1), r());
  };
  return !t && bo() && yo(n), n;
}
function mt(s, ...e) {
  s.slice().forEach((t) => {
    t(...e);
  });
}
const rl = (s) => s(), os = Symbol(), Fr = Symbol();
function on(s, e) {
  s instanceof Map && e instanceof Map ? e.forEach((t, r) => s.set(r, t)) : s instanceof Set && e instanceof Set && e.forEach(s.add, s);
  for (const t in e) {
    if (!e.hasOwnProperty(t))
      continue;
    const r = e[t], n = s[t];
    ut(n) && ut(r) && s.hasOwnProperty(t) && !Xt(r) && !kn(r) ? s[t] = on(n, r) : s[t] = r;
  }
  return s;
}
const nl = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function sl(s) {
  return !ut(s) || !Object.prototype.hasOwnProperty.call(s, nl);
}
const { assign: Se } = Object;
function as(s) {
  return !!(Xt(s) && s.effect);
}
function ls(s, e, t, r) {
  const { state: n, actions: i, getters: o } = e, a = t.state.value[s];
  let l;
  function c() {
    !a && (process.env.NODE_ENV === "production" || !r) && (t.state.value[s] = n ? n() : {});
    const u = process.env.NODE_ENV !== "production" && r ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      qn(Ce(n ? n() : {}).value)
    ) : qn(t.state.value[s]);
    return Se(u, i, Object.keys(o || {}).reduce((f, p) => (process.env.NODE_ENV !== "production" && p in u && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${p}" in store "${s}".`), f[p] = Nt(wt(() => {
      xr(t);
      const h = t._s.get(s);
      return o[p].call(h, h);
    })), f), {}));
  }
  return l = an(s, c, e, t, r, !0), l;
}
function an(s, e, t = {}, r, n, i) {
  let o;
  const a = Se({ actions: {} }, t);
  if (process.env.NODE_ENV !== "production" && !r._e.active)
    throw new Error("Pinia destroyed");
  const l = { deep: !0 };
  process.env.NODE_ENV !== "production" && (l.onTrigger = (C) => {
    c ? h = C : c == !1 && !_._hotUpdating && (Array.isArray(h) ? h.push(C) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let c, u, f = [], p = [], h;
  const m = r.state.value[s];
  !i && !m && (process.env.NODE_ENV === "production" || !n) && (r.state.value[s] = {});
  const d = Ce({});
  let g;
  function x(C) {
    let O;
    c = u = !1, process.env.NODE_ENV !== "production" && (h = []), typeof C == "function" ? (C(r.state.value[s]), O = {
      type: Bt.patchFunction,
      storeId: s,
      events: h
    }) : (on(r.state.value[s], C), O = {
      type: Bt.patchObject,
      payload: C,
      storeId: s,
      events: h
    });
    const M = g = Symbol();
    Xn().then(() => {
      g === M && (c = !0);
    }), u = !0, mt(f, O, r.state.value[s]);
  }
  const b = i ? function() {
    const { state: O } = t, M = O ? O() : {};
    this.$patch((A) => {
      Se(A, M);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${s}" is built using the setup syntax and does not implement $reset().`);
    } : si
  );
  function T() {
    o.stop(), f = [], p = [], r._s.delete(s);
  }
  const k = (C, O = "") => {
    if (os in C)
      return C[Fr] = O, C;
    const M = function() {
      xr(r);
      const A = Array.from(arguments), z = [], R = [];
      function E(L) {
        z.push(L);
      }
      function F(L) {
        R.push(L);
      }
      mt(p, {
        args: A,
        name: M[Fr],
        store: _,
        after: E,
        onError: F
      });
      let P;
      try {
        P = C.apply(this && this.$id === s ? this : _, A);
      } catch (L) {
        throw mt(R, L), L;
      }
      return P instanceof Promise ? P.then((L) => (mt(z, L), L)).catch((L) => (mt(R, L), Promise.reject(L))) : (mt(z, P), P);
    };
    return M[os] = !0, M[Fr] = O, M;
  }, v = /* @__PURE__ */ Nt({
    actions: {},
    getters: {},
    state: [],
    hotState: d
  }), y = {
    _p: r,
    // _s: scope,
    $id: s,
    $onAction: is.bind(null, p),
    $patch: x,
    $reset: b,
    $subscribe(C, O = {}) {
      const M = is(f, C, O.detached, () => A()), A = o.run(() => xo(() => r.state.value[s], (z) => {
        (O.flush === "sync" ? u : c) && C({
          storeId: s,
          type: Bt.direct,
          events: h
        }, z);
      }, Se({}, l, O)));
      return M;
    },
    $dispose: T
  }, _ = mo(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Ft ? Se(
    {
      _hmrPayload: v,
      _customProperties: Nt(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    y
    // must be added later
    // setupStore
  ) : y);
  r._s.set(s, _);
  const S = (r._a && r._a.runWithContext || rl)(() => r._e.run(() => (o = go()).run(() => e({ action: k }))));
  for (const C in S) {
    const O = S[C];
    if (Xt(O) && !as(O) || kn(O))
      process.env.NODE_ENV !== "production" && n ? d.value[C] = $r(S, C) : i || (m && sl(O) && (Xt(O) ? O.value = m[C] : on(O, m[C])), r.state.value[s][C] = O), process.env.NODE_ENV !== "production" && v.state.push(C);
    else if (typeof O == "function") {
      const M = process.env.NODE_ENV !== "production" && n ? O : k(O, C);
      S[C] = M, process.env.NODE_ENV !== "production" && (v.actions[C] = O), a.actions[C] = O;
    } else process.env.NODE_ENV !== "production" && as(O) && (v.getters[C] = i ? (
      // @ts-expect-error
      t.getters[C]
    ) : O, Ft && (S._getters || // @ts-expect-error: same
    (S._getters = Nt([]))).push(C));
  }
  if (Se(_, S), Se(_o(_), S), Object.defineProperty(_, "$state", {
    get: () => process.env.NODE_ENV !== "production" && n ? d.value : r.state.value[s],
    set: (C) => {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error("cannot set hotState");
      x((O) => {
        Se(O, C);
      });
    }
  }), process.env.NODE_ENV !== "production" && (_._hotUpdate = Nt((C) => {
    _._hotUpdating = !0, C._hmrPayload.state.forEach((O) => {
      if (O in _.$state) {
        const M = C.$state[O], A = _.$state[O];
        typeof M == "object" && ut(M) && ut(A) ? ni(M, A) : C.$state[O] = A;
      }
      _[O] = $r(C.$state, O);
    }), Object.keys(_.$state).forEach((O) => {
      O in C.$state || delete _[O];
    }), c = !1, u = !1, r.state.value[s] = $r(C._hmrPayload, "hotState"), u = !0, Xn().then(() => {
      c = !0;
    });
    for (const O in C._hmrPayload.actions) {
      const M = C[O];
      _[O] = //
      k(M, O);
    }
    for (const O in C._hmrPayload.getters) {
      const M = C._hmrPayload.getters[O], A = i ? (
        // special handling of options api
        wt(() => (xr(r), M.call(_, _)))
      ) : M;
      _[O] = //
      A;
    }
    Object.keys(_._hmrPayload.getters).forEach((O) => {
      O in C._hmrPayload.getters || delete _[O];
    }), Object.keys(_._hmrPayload.actions).forEach((O) => {
      O in C._hmrPayload.actions || delete _[O];
    }), _._hmrPayload = C._hmrPayload, _._getters = C._getters, _._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Ft) {
    const C = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((O) => {
      Object.defineProperty(_, O, Se({ value: _[O] }, C));
    });
  }
  return r._p.forEach((C) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Ft) {
      const O = o.run(() => C({
        store: _,
        app: r._a,
        pinia: r,
        options: a
      }));
      Object.keys(O || {}).forEach((M) => _._customProperties.add(M)), Se(_, O);
    } else
      Se(_, o.run(() => C({
        store: _,
        app: r._a,
        pinia: r,
        options: a
      })));
  }), process.env.NODE_ENV !== "production" && _.$state && typeof _.$state == "object" && typeof _.$state.constructor == "function" && !_.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${_.$id}".`), m && i && t.hydrate && t.hydrate(_.$state, m), c = !0, u = !0, _;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function il(s, e, t) {
  let r;
  const n = typeof e == "function";
  r = n ? t : e;
  function i(o, a) {
    const l = fo();
    if (o = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && Vt && Vt._testing ? null : o) || (l ? ho(tl, null) : null), o && xr(o), process.env.NODE_ENV !== "production" && !Vt)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    o = Vt, o._s.has(s) || (n ? an(s, e, r, o) : ls(s, r, o), process.env.NODE_ENV !== "production" && (i._pinia = o));
    const c = o._s.get(s);
    if (process.env.NODE_ENV !== "production" && a) {
      const u = "__hot:" + s, f = n ? an(u, e, r, o, !0) : ls(u, Se({}, r), o, !0);
      a._hotUpdate(f), delete o.state.value[u], o._s.delete(u);
    }
    if (process.env.NODE_ENV !== "production" && Ft) {
      const u = po();
      if (u && u.proxy && // avoid adding stores that are just built for hot module replacement
      !a) {
        const f = u.proxy, p = "_pStores" in f ? f._pStores : f._pStores = {};
        p[s] = c;
      }
    }
    return c;
  }
  return i.$id = s, i;
}
const Tc = /* @__PURE__ */ il("dock", () => {
  const s = Ce([]), e = Ce(null), t = Ce(!0), r = Ce({ x: 50, y: 50 }), n = (u) => {
    s.value.push(u);
  }, i = (u) => {
    const f = s.value.findIndex((p) => p.id === u);
    f > -1 && s.value.splice(f, 1);
  }, o = (u) => {
    e.value = u;
  }, a = (u, f) => {
    r.value = { x: u, y: f };
  }, l = () => {
    t.value = !t.value;
  }, c = wt(() => s.value.length);
  return {
    items: s,
    activeItem: e,
    isVisible: t,
    position: r,
    addItem: n,
    removeItem: i,
    setActiveItem: o,
    setPosition: a,
    toggleVisibility: l,
    itemCount: c
  };
});
function Ve(s) {
  if (s === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return s;
}
function ii(s, e) {
  s.prototype = Object.create(e.prototype), s.prototype.constructor = s, s.__proto__ = e;
}
/*!
 * GSAP 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var we = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, kt = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, Cn, ce, J, Me = 1e8, q = 1 / Me, ln = Math.PI * 2, ol = ln / 4, al = 0, oi = Math.sqrt, ll = Math.cos, cl = Math.sin, le = function(e) {
  return typeof e == "string";
}, ee = function(e) {
  return typeof e == "function";
}, Le = function(e) {
  return typeof e == "number";
}, Mn = function(e) {
  return typeof e > "u";
}, $e = function(e) {
  return typeof e == "object";
}, pe = function(e) {
  return e !== !1;
}, On = function() {
  return typeof window < "u";
}, hr = function(e) {
  return ee(e) || le(e);
}, ai = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, de = Array.isArray, cn = /(?:-?\.?\d|\.)+/gi, li = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, _t = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Lr = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, ci = /[+-]=-?[.\d]+/, ui = /[^,'"\[\]\s]+/gi, ul = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, Z, Ae, un, En, ke = {}, vr = {}, di, fi = function(e) {
  return (vr = Tt(e, ke)) && be;
}, An = function(e, t) {
  return console.warn("Invalid property", e, "set to", t, "Missing plugin? gsap.registerPlugin()");
}, Ht = function(e, t) {
  return !t && console.warn(e);
}, hi = function(e, t) {
  return e && (ke[e] = t) && vr && (vr[e] = t) || ke;
}, Qt = function() {
  return 0;
}, dl = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, mr = {
  suppressEvents: !0,
  kill: !1
}, fl = {
  suppressEvents: !0
}, zn = {}, Xe = [], dn = {}, pi, ye = {}, Gr = {}, cs = 30, gr = [], Rn = "", $n = function(e) {
  var t = e[0], r, n;
  if ($e(t) || ee(t) || (e = [e]), !(r = (t._gsap || {}).harness)) {
    for (n = gr.length; n-- && !gr[n].targetTest(t); )
      ;
    r = gr[n];
  }
  for (n = e.length; n--; )
    e[n] && (e[n]._gsap || (e[n]._gsap = new Vi(e[n], r))) || e.splice(n, 1);
  return e;
}, ot = function(e) {
  return e._gsap || $n(Oe(e))[0]._gsap;
}, mi = function(e, t, r) {
  return (r = e[t]) && ee(r) ? e[t]() : Mn(r) && e.getAttribute && e.getAttribute(t) || r;
}, me = function(e, t) {
  return (e = e.split(",")).forEach(t) || e;
}, re = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, se = function(e) {
  return Math.round(e * 1e7) / 1e7 || 0;
}, yt = function(e, t) {
  var r = t.charAt(0), n = parseFloat(t.substr(2));
  return e = parseFloat(e), r === "+" ? e + n : r === "-" ? e - n : r === "*" ? e * n : e / n;
}, hl = function(e, t) {
  for (var r = t.length, n = 0; e.indexOf(t[n]) < 0 && ++n < r; )
    ;
  return n < r;
}, wr = function() {
  var e = Xe.length, t = Xe.slice(0), r, n;
  for (dn = {}, Xe.length = 0, r = 0; r < e; r++)
    n = t[r], n && n._lazy && (n.render(n._lazy[0], n._lazy[1], !0)._lazy = 0);
}, Dn = function(e) {
  return !!(e._initted || e._startAt || e.add);
}, gi = function(e, t, r, n) {
  Xe.length && !ce && wr(), e.render(t, r, !!(ce && t < 0 && Dn(e))), Xe.length && !ce && wr();
}, _i = function(e) {
  var t = parseFloat(e);
  return (t || t === 0) && (e + "").match(ui).length < 2 ? t : le(e) ? e.trim() : e;
}, bi = function(e) {
  return e;
}, Te = function(e, t) {
  for (var r in t)
    r in e || (e[r] = t[r]);
  return e;
}, pl = function(e) {
  return function(t, r) {
    for (var n in r)
      n in t || n === "duration" && e || n === "ease" || (t[n] = r[n]);
  };
}, Tt = function(e, t) {
  for (var r in t)
    e[r] = t[r];
  return e;
}, us = function s(e, t) {
  for (var r in t)
    r !== "__proto__" && r !== "constructor" && r !== "prototype" && (e[r] = $e(t[r]) ? s(e[r] || (e[r] = {}), t[r]) : t[r]);
  return e;
}, kr = function(e, t) {
  var r = {}, n;
  for (n in e)
    n in t || (r[n] = e[n]);
  return r;
}, Yt = function(e) {
  var t = e.parent || Z, r = e.keyframes ? pl(de(e.keyframes)) : Te;
  if (pe(e.inherit))
    for (; t; )
      r(e, t.vars.defaults), t = t.parent || t._dp;
  return e;
}, ml = function(e, t) {
  for (var r = e.length, n = r === t.length; n && r-- && e[r] === t[r]; )
    ;
  return r < 0;
}, yi = function(e, t, r, n, i) {
  var o = e[n], a;
  if (i)
    for (a = t[i]; o && o[i] > a; )
      o = o._prev;
  return o ? (t._next = o._next, o._next = t) : (t._next = e[r], e[r] = t), t._next ? t._next._prev = t : e[n] = t, t._prev = o, t.parent = t._dp = e, t;
}, Or = function(e, t, r, n) {
  r === void 0 && (r = "_first"), n === void 0 && (n = "_last");
  var i = t._prev, o = t._next;
  i ? i._next = o : e[r] === t && (e[r] = o), o ? o._prev = i : e[n] === t && (e[n] = i), t._next = t._prev = t.parent = null;
}, He = function(e, t) {
  e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e), e._act = 0;
}, at = function(e, t) {
  if (e && (!t || t._end > e._dur || t._start < 0))
    for (var r = e; r; )
      r._dirty = 1, r = r.parent;
  return e;
}, gl = function(e) {
  for (var t = e.parent; t && t.parent; )
    t._dirty = 1, t.totalDuration(), t = t.parent;
  return e;
}, fn = function(e, t, r, n) {
  return e._startAt && (ce ? e._startAt.revert(mr) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(t, !0, n));
}, _l = function s(e) {
  return !e || e._ts && s(e.parent);
}, ds = function(e) {
  return e._repeat ? St(e._tTime, e = e.duration() + e._rDelay) * e : 0;
}, St = function(e, t) {
  var r = Math.floor(e = se(e / t));
  return e && r === e ? r - 1 : r;
}, Tr = function(e, t) {
  return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur);
}, Er = function(e) {
  return e._end = se(e._start + (e._tDur / Math.abs(e._ts || e._rts || q) || 0));
}, Ar = function(e, t) {
  var r = e._dp;
  return r && r.smoothChildTiming && e._ts && (e._start = se(r._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)), Er(e), r._dirty || at(r, e)), e;
}, xi = function(e, t) {
  var r;
  if ((t._time || !t._dur && t._initted || t._start < e._time && (t._dur || !t.add)) && (r = Tr(e.rawTime(), t), (!t._dur || nr(0, t.totalDuration(), r) - t._tTime > q) && t.render(r, !0)), at(e, t)._dp && e._initted && e._time >= e._dur && e._ts) {
    if (e._dur < e.duration())
      for (r = e; r._dp; )
        r.rawTime() >= 0 && r.totalTime(r._tTime), r = r._dp;
    e._zTime = -q;
  }
}, ze = function(e, t, r, n) {
  return t.parent && He(t), t._start = se((Le(r) ? r : r || e !== Z ? Pe(e, r, t) : e._time) + t._delay), t._end = se(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)), yi(e, t, "_first", "_last", e._sort ? "_start" : 0), hn(t) || (e._recent = t), n || xi(e, t), e._ts < 0 && Ar(e, e._tTime), e;
}, vi = function(e, t) {
  return (ke.ScrollTrigger || An("scrollTrigger", t)) && ke.ScrollTrigger.create(t, e);
}, wi = function(e, t, r, n, i) {
  if (In(e, t, i), !e._initted)
    return 1;
  if (!r && e._pt && !ce && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && pi !== xe.frame)
    return Xe.push(e), e._lazy = [i, n], 1;
}, bl = function s(e) {
  var t = e.parent;
  return t && t._ts && t._initted && !t._lock && (t.rawTime() < 0 || s(t));
}, hn = function(e) {
  var t = e.data;
  return t === "isFromStart" || t === "isStart";
}, yl = function(e, t, r, n) {
  var i = e.ratio, o = t < 0 || !t && (!e._start && bl(e) && !(!e._initted && hn(e)) || (e._ts < 0 || e._dp._ts < 0) && !hn(e)) ? 0 : 1, a = e._rDelay, l = 0, c, u, f;
  if (a && e._repeat && (l = nr(0, e._tDur, t), u = St(l, a), e._yoyo && u & 1 && (o = 1 - o), u !== St(e._tTime, a) && (i = 1 - o, e.vars.repeatRefresh && e._initted && e.invalidate())), o !== i || ce || n || e._zTime === q || !t && e._zTime) {
    if (!e._initted && wi(e, t, n, r, l))
      return;
    for (f = e._zTime, e._zTime = t || (r ? q : 0), r || (r = t && !f), e.ratio = o, e._from && (o = 1 - o), e._time = 0, e._tTime = l, c = e._pt; c; )
      c.r(o, c.d), c = c._next;
    t < 0 && fn(e, t, r, !0), e._onUpdate && !r && ve(e, "onUpdate"), l && e._repeat && !r && e.parent && ve(e, "onRepeat"), (t >= e._tDur || t < 0) && e.ratio === o && (o && He(e, 1), !r && !ce && (ve(e, o ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()));
  } else e._zTime || (e._zTime = t);
}, xl = function(e, t, r) {
  var n;
  if (r > t)
    for (n = e._first; n && n._start <= r; ) {
      if (n.data === "isPause" && n._start > t)
        return n;
      n = n._next;
    }
  else
    for (n = e._last; n && n._start >= r; ) {
      if (n.data === "isPause" && n._start < t)
        return n;
      n = n._prev;
    }
}, Pt = function(e, t, r, n) {
  var i = e._repeat, o = se(t) || 0, a = e._tTime / e._tDur;
  return a && !n && (e._time *= o / e._dur), e._dur = o, e._tDur = i ? i < 0 ? 1e10 : se(o * (i + 1) + e._rDelay * i) : o, a > 0 && !n && Ar(e, e._tTime = e._tDur * a), e.parent && Er(e), r || at(e.parent, e), e;
}, fs = function(e) {
  return e instanceof fe ? at(e) : Pt(e, e._dur);
}, vl = {
  _start: 0,
  endTime: Qt,
  totalDuration: Qt
}, Pe = function s(e, t, r) {
  var n = e.labels, i = e._recent || vl, o = e.duration() >= Me ? i.endTime(!1) : e._dur, a, l, c;
  return le(t) && (isNaN(t) || t in n) ? (l = t.charAt(0), c = t.substr(-1) === "%", a = t.indexOf("="), l === "<" || l === ">" ? (a >= 0 && (t = t.replace(/=/, "")), (l === "<" ? i._start : i.endTime(i._repeat >= 0)) + (parseFloat(t.substr(1)) || 0) * (c ? (a < 0 ? i : r).totalDuration() / 100 : 1)) : a < 0 ? (t in n || (n[t] = o), n[t]) : (l = parseFloat(t.charAt(a - 1) + t.substr(a + 1)), c && r && (l = l / 100 * (de(r) ? r[0] : r).totalDuration()), a > 1 ? s(e, t.substr(0, a - 1), r) + l : o + l)) : t == null ? o : +t;
}, Ut = function(e, t, r) {
  var n = Le(t[1]), i = (n ? 2 : 1) + (e < 2 ? 0 : 1), o = t[i], a, l;
  if (n && (o.duration = t[1]), o.parent = r, e) {
    for (a = o, l = r; l && !("immediateRender" in a); )
      a = l.vars.defaults || {}, l = pe(l.vars.inherit) && l.parent;
    o.immediateRender = pe(a.immediateRender), e < 2 ? o.runBackwards = 1 : o.startAt = t[i - 1];
  }
  return new ne(t[0], o, t[i + 1]);
}, Je = function(e, t) {
  return e || e === 0 ? t(e) : t;
}, nr = function(e, t, r) {
  return r < e ? e : r > t ? t : r;
}, ue = function(e, t) {
  return !le(e) || !(t = ul.exec(e)) ? "" : t[1];
}, wl = function(e, t, r) {
  return Je(r, function(n) {
    return nr(e, t, n);
  });
}, pn = [].slice, ki = function(e, t) {
  return e && $e(e) && "length" in e && (!t && !e.length || e.length - 1 in e && $e(e[0])) && !e.nodeType && e !== Ae;
}, kl = function(e, t, r) {
  return r === void 0 && (r = []), e.forEach(function(n) {
    var i;
    return le(n) && !t || ki(n, 1) ? (i = r).push.apply(i, Oe(n)) : r.push(n);
  }) || r;
}, Oe = function(e, t, r) {
  return J && !t && J.selector ? J.selector(e) : le(e) && !r && (un || !Ct()) ? pn.call((t || En).querySelectorAll(e), 0) : de(e) ? kl(e, r) : ki(e) ? pn.call(e, 0) : e ? [e] : [];
}, mn = function(e) {
  return e = Oe(e)[0] || Ht("Invalid scope") || {}, function(t) {
    var r = e.current || e.nativeElement || e;
    return Oe(t, r.querySelectorAll ? r : r === e ? Ht("Invalid scope") || En.createElement("div") : e);
  };
}, Ti = function(e) {
  return e.sort(function() {
    return 0.5 - Math.random();
  });
}, Si = function(e) {
  if (ee(e))
    return e;
  var t = $e(e) ? e : {
    each: e
  }, r = lt(t.ease), n = t.from || 0, i = parseFloat(t.base) || 0, o = {}, a = n > 0 && n < 1, l = isNaN(n) || a, c = t.axis, u = n, f = n;
  return le(n) ? u = f = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[n] || 0 : !a && l && (u = n[0], f = n[1]), function(p, h, m) {
    var d = (m || t).length, g = o[d], x, b, T, k, v, y, _, w, S;
    if (!g) {
      if (S = t.grid === "auto" ? 0 : (t.grid || [1, Me])[1], !S) {
        for (_ = -Me; _ < (_ = m[S++].getBoundingClientRect().left) && S < d; )
          ;
        S < d && S--;
      }
      for (g = o[d] = [], x = l ? Math.min(S, d) * u - 0.5 : n % S, b = S === Me ? 0 : l ? d * f / S - 0.5 : n / S | 0, _ = 0, w = Me, y = 0; y < d; y++)
        T = y % S - x, k = b - (y / S | 0), g[y] = v = c ? Math.abs(c === "y" ? k : T) : oi(T * T + k * k), v > _ && (_ = v), v < w && (w = v);
      n === "random" && Ti(g), g.max = _ - w, g.min = w, g.v = d = (parseFloat(t.amount) || parseFloat(t.each) * (S > d ? d - 1 : c ? c === "y" ? d / S : S : Math.max(S, d / S)) || 0) * (n === "edges" ? -1 : 1), g.b = d < 0 ? i - d : i, g.u = ue(t.amount || t.each) || 0, r = r && d < 0 ? Di(r) : r;
    }
    return d = (g[p] - g.min) / g.max || 0, se(g.b + (r ? r(d) : d) * g.v) + g.u;
  };
}, gn = function(e) {
  var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
  return function(r) {
    var n = se(Math.round(parseFloat(r) / e) * e * t);
    return (n - n % 1) / t + (Le(r) ? 0 : ue(r));
  };
}, Pi = function(e, t) {
  var r = de(e), n, i;
  return !r && $e(e) && (n = r = e.radius || Me, e.values ? (e = Oe(e.values), (i = !Le(e[0])) && (n *= n)) : e = gn(e.increment)), Je(t, r ? ee(e) ? function(o) {
    return i = e(o), Math.abs(i - o) <= n ? i : o;
  } : function(o) {
    for (var a = parseFloat(i ? o.x : o), l = parseFloat(i ? o.y : 0), c = Me, u = 0, f = e.length, p, h; f--; )
      i ? (p = e[f].x - a, h = e[f].y - l, p = p * p + h * h) : p = Math.abs(e[f] - a), p < c && (c = p, u = f);
    return u = !n || c <= n ? e[u] : o, i || u === o || Le(o) ? u : u + ue(o);
  } : gn(e));
}, Ci = function(e, t, r, n) {
  return Je(de(e) ? !t : r === !0 ? !!(r = 0) : !n, function() {
    return de(e) ? e[~~(Math.random() * e.length)] : (r = r || 1e-5) && (n = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((e - r / 2 + Math.random() * (t - e + r * 0.99)) / r) * r * n) / n;
  });
}, Tl = function() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return function(n) {
    return t.reduce(function(i, o) {
      return o(i);
    }, n);
  };
}, Sl = function(e, t) {
  return function(r) {
    return e(parseFloat(r)) + (t || ue(r));
  };
}, Pl = function(e, t, r) {
  return Oi(e, t, 0, 1, r);
}, Mi = function(e, t, r) {
  return Je(r, function(n) {
    return e[~~t(n)];
  });
}, Cl = function s(e, t, r) {
  var n = t - e;
  return de(e) ? Mi(e, s(0, e.length), t) : Je(r, function(i) {
    return (n + (i - e) % n) % n + e;
  });
}, Ml = function s(e, t, r) {
  var n = t - e, i = n * 2;
  return de(e) ? Mi(e, s(0, e.length - 1), t) : Je(r, function(o) {
    return o = (i + (o - e) % i) % i || 0, e + (o > n ? i - o : o);
  });
}, Jt = function(e) {
  for (var t = 0, r = "", n, i, o, a; ~(n = e.indexOf("random(", t)); )
    o = e.indexOf(")", n), a = e.charAt(n + 7) === "[", i = e.substr(n + 7, o - n - 7).match(a ? ui : cn), r += e.substr(t, n - t) + Ci(a ? i : +i[0], a ? 0 : +i[1], +i[2] || 1e-5), t = o + 1;
  return r + e.substr(t, e.length - t);
}, Oi = function(e, t, r, n, i) {
  var o = t - e, a = n - r;
  return Je(i, function(l) {
    return r + ((l - e) / o * a || 0);
  });
}, Ol = function s(e, t, r, n) {
  var i = isNaN(e + t) ? 0 : function(h) {
    return (1 - h) * e + h * t;
  };
  if (!i) {
    var o = le(e), a = {}, l, c, u, f, p;
    if (r === !0 && (n = 1) && (r = null), o)
      e = {
        p: e
      }, t = {
        p: t
      };
    else if (de(e) && !de(t)) {
      for (u = [], f = e.length, p = f - 2, c = 1; c < f; c++)
        u.push(s(e[c - 1], e[c]));
      f--, i = function(m) {
        m *= f;
        var d = Math.min(p, ~~m);
        return u[d](m - d);
      }, r = t;
    } else n || (e = Tt(de(e) ? [] : {}, e));
    if (!u) {
      for (l in t)
        Nn.call(a, e, l, "get", t[l]);
      i = function(m) {
        return Ln(m, a) || (o ? e.p : e);
      };
    }
  }
  return Je(r, i);
}, hs = function(e, t, r) {
  var n = e.labels, i = Me, o, a, l;
  for (o in n)
    a = n[o] - t, a < 0 == !!r && a && i > (a = Math.abs(a)) && (l = o, i = a);
  return l;
}, ve = function(e, t, r) {
  var n = e.vars, i = n[t], o = J, a = e._ctx, l, c, u;
  if (i)
    return l = n[t + "Params"], c = n.callbackScope || e, r && Xe.length && wr(), a && (J = a), u = l ? i.apply(c, l) : i.call(c), J = o, u;
}, Lt = function(e) {
  return He(e), e.scrollTrigger && e.scrollTrigger.kill(!!ce), e.progress() < 1 && ve(e, "onInterrupt"), e;
}, bt, Ei = [], Ai = function(e) {
  if (e)
    if (e = !e.name && e.default || e, On() || e.headless) {
      var t = e.name, r = ee(e), n = t && !r && e.init ? function() {
        this._props = [];
      } : e, i = {
        init: Qt,
        render: Ln,
        add: Nn,
        kill: Ul,
        modifier: Yl,
        rawVars: 0
      }, o = {
        targetTest: 0,
        get: 0,
        getSetter: Fn,
        aliases: {},
        register: 0
      };
      if (Ct(), e !== n) {
        if (ye[t])
          return;
        Te(n, Te(kr(e, i), o)), Tt(n.prototype, Tt(i, kr(e, o))), ye[n.prop = t] = n, e.targetTest && (gr.push(n), zn[t] = 1), t = (t === "css" ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin";
      }
      hi(t, n), e.register && e.register(be, n, ge);
    } else
      Ei.push(e);
}, X = 255, Gt = {
  aqua: [0, X, X],
  lime: [0, X, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, X],
  navy: [0, 0, 128],
  white: [X, X, X],
  olive: [128, 128, 0],
  yellow: [X, X, 0],
  orange: [X, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [X, 0, 0],
  pink: [X, 192, 203],
  cyan: [0, X, X],
  transparent: [X, X, X, 0]
}, jr = function(e, t, r) {
  return e += e < 0 ? 1 : e > 1 ? -1 : 0, (e * 6 < 1 ? t + (r - t) * e * 6 : e < 0.5 ? r : e * 3 < 2 ? t + (r - t) * (2 / 3 - e) * 6 : t) * X + 0.5 | 0;
}, zi = function(e, t, r) {
  var n = e ? Le(e) ? [e >> 16, e >> 8 & X, e & X] : 0 : Gt.black, i, o, a, l, c, u, f, p, h, m;
  if (!n) {
    if (e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), Gt[e])
      n = Gt[e];
    else if (e.charAt(0) === "#") {
      if (e.length < 6 && (i = e.charAt(1), o = e.charAt(2), a = e.charAt(3), e = "#" + i + i + o + o + a + a + (e.length === 5 ? e.charAt(4) + e.charAt(4) : "")), e.length === 9)
        return n = parseInt(e.substr(1, 6), 16), [n >> 16, n >> 8 & X, n & X, parseInt(e.substr(7), 16) / 255];
      e = parseInt(e.substr(1), 16), n = [e >> 16, e >> 8 & X, e & X];
    } else if (e.substr(0, 3) === "hsl") {
      if (n = m = e.match(cn), !t)
        l = +n[0] % 360 / 360, c = +n[1] / 100, u = +n[2] / 100, o = u <= 0.5 ? u * (c + 1) : u + c - u * c, i = u * 2 - o, n.length > 3 && (n[3] *= 1), n[0] = jr(l + 1 / 3, i, o), n[1] = jr(l, i, o), n[2] = jr(l - 1 / 3, i, o);
      else if (~e.indexOf("="))
        return n = e.match(li), r && n.length < 4 && (n[3] = 1), n;
    } else
      n = e.match(cn) || Gt.transparent;
    n = n.map(Number);
  }
  return t && !m && (i = n[0] / X, o = n[1] / X, a = n[2] / X, f = Math.max(i, o, a), p = Math.min(i, o, a), u = (f + p) / 2, f === p ? l = c = 0 : (h = f - p, c = u > 0.5 ? h / (2 - f - p) : h / (f + p), l = f === i ? (o - a) / h + (o < a ? 6 : 0) : f === o ? (a - i) / h + 2 : (i - o) / h + 4, l *= 60), n[0] = ~~(l + 0.5), n[1] = ~~(c * 100 + 0.5), n[2] = ~~(u * 100 + 0.5)), r && n.length < 4 && (n[3] = 1), n;
}, Ri = function(e) {
  var t = [], r = [], n = -1;
  return e.split(qe).forEach(function(i) {
    var o = i.match(_t) || [];
    t.push.apply(t, o), r.push(n += o.length + 1);
  }), t.c = r, t;
}, ps = function(e, t, r) {
  var n = "", i = (e + n).match(qe), o = t ? "hsla(" : "rgba(", a = 0, l, c, u, f;
  if (!i)
    return e;
  if (i = i.map(function(p) {
    return (p = zi(p, t, 1)) && o + (t ? p[0] + "," + p[1] + "%," + p[2] + "%," + p[3] : p.join(",")) + ")";
  }), r && (u = Ri(e), l = r.c, l.join(n) !== u.c.join(n)))
    for (c = e.replace(qe, "1").split(_t), f = c.length - 1; a < f; a++)
      n += c[a] + (~l.indexOf(a) ? i.shift() || o + "0,0,0,0)" : (u.length ? u : i.length ? i : r).shift());
  if (!c)
    for (c = e.split(qe), f = c.length - 1; a < f; a++)
      n += c[a] + i[a];
  return n + c[f];
}, qe = function() {
  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", e;
  for (e in Gt)
    s += "|" + e + "\\b";
  return new RegExp(s + ")", "gi");
}(), El = /hsl[a]?\(/, $i = function(e) {
  var t = e.join(" "), r;
  if (qe.lastIndex = 0, qe.test(t))
    return r = El.test(t), e[1] = ps(e[1], r), e[0] = ps(e[0], r, Ri(e[1])), !0;
}, Zt, xe = function() {
  var s = Date.now, e = 500, t = 33, r = s(), n = r, i = 1e3 / 240, o = i, a = [], l, c, u, f, p, h, m = function d(g) {
    var x = s() - n, b = g === !0, T, k, v, y;
    if ((x > e || x < 0) && (r += x - t), n += x, v = n - r, T = v - o, (T > 0 || b) && (y = ++f.frame, p = v - f.time * 1e3, f.time = v = v / 1e3, o += T + (T >= i ? 4 : i - T), k = 1), b || (l = c(d)), k)
      for (h = 0; h < a.length; h++)
        a[h](v, p, y, g);
  };
  return f = {
    time: 0,
    frame: 0,
    tick: function() {
      m(!0);
    },
    deltaRatio: function(g) {
      return p / (1e3 / (g || 60));
    },
    wake: function() {
      di && (!un && On() && (Ae = un = window, En = Ae.document || {}, ke.gsap = be, (Ae.gsapVersions || (Ae.gsapVersions = [])).push(be.version), fi(vr || Ae.GreenSockGlobals || !Ae.gsap && Ae || {}), Ei.forEach(Ai)), u = typeof requestAnimationFrame < "u" && requestAnimationFrame, l && f.sleep(), c = u || function(g) {
        return setTimeout(g, o - f.time * 1e3 + 1 | 0);
      }, Zt = 1, m(2));
    },
    sleep: function() {
      (u ? cancelAnimationFrame : clearTimeout)(l), Zt = 0, c = Qt;
    },
    lagSmoothing: function(g, x) {
      e = g || 1 / 0, t = Math.min(x || 33, e);
    },
    fps: function(g) {
      i = 1e3 / (g || 240), o = f.time * 1e3 + i;
    },
    add: function(g, x, b) {
      var T = x ? function(k, v, y, _) {
        g(k, v, y, _), f.remove(T);
      } : g;
      return f.remove(g), a[b ? "unshift" : "push"](T), Ct(), T;
    },
    remove: function(g, x) {
      ~(x = a.indexOf(g)) && a.splice(x, 1) && h >= x && h--;
    },
    _listeners: a
  }, f;
}(), Ct = function() {
  return !Zt && xe.wake();
}, B = {}, Al = /^[\d.\-M][\d.\-,\s]/, zl = /["']/g, Rl = function(e) {
  for (var t = {}, r = e.substr(1, e.length - 3).split(":"), n = r[0], i = 1, o = r.length, a, l, c; i < o; i++)
    l = r[i], a = i !== o - 1 ? l.lastIndexOf(",") : l.length, c = l.substr(0, a), t[n] = isNaN(c) ? c.replace(zl, "").trim() : +c, n = l.substr(a + 1).trim();
  return t;
}, $l = function(e) {
  var t = e.indexOf("(") + 1, r = e.indexOf(")"), n = e.indexOf("(", t);
  return e.substring(t, ~n && n < r ? e.indexOf(")", r + 1) : r);
}, Dl = function(e) {
  var t = (e + "").split("("), r = B[t[0]];
  return r && t.length > 1 && r.config ? r.config.apply(null, ~e.indexOf("{") ? [Rl(t[1])] : $l(e).split(",").map(_i)) : B._CE && Al.test(e) ? B._CE("", e) : r;
}, Di = function(e) {
  return function(t) {
    return 1 - e(1 - t);
  };
}, Ni = function s(e, t) {
  for (var r = e._first, n; r; )
    r instanceof fe ? s(r, t) : r.vars.yoyoEase && (!r._yoyo || !r._repeat) && r._yoyo !== t && (r.timeline ? s(r.timeline, t) : (n = r._ease, r._ease = r._yEase, r._yEase = n, r._yoyo = t)), r = r._next;
}, lt = function(e, t) {
  return e && (ee(e) ? e : B[e] || Dl(e)) || t;
}, ft = function(e, t, r, n) {
  r === void 0 && (r = function(l) {
    return 1 - t(1 - l);
  }), n === void 0 && (n = function(l) {
    return l < 0.5 ? t(l * 2) / 2 : 1 - t((1 - l) * 2) / 2;
  });
  var i = {
    easeIn: t,
    easeOut: r,
    easeInOut: n
  }, o;
  return me(e, function(a) {
    B[a] = ke[a] = i, B[o = a.toLowerCase()] = r;
    for (var l in i)
      B[o + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")] = B[a + "." + l] = i[l];
  }), i;
}, Ii = function(e) {
  return function(t) {
    return t < 0.5 ? (1 - e(1 - t * 2)) / 2 : 0.5 + e((t - 0.5) * 2) / 2;
  };
}, Br = function s(e, t, r) {
  var n = t >= 1 ? t : 1, i = (r || (e ? 0.3 : 0.45)) / (t < 1 ? t : 1), o = i / ln * (Math.asin(1 / n) || 0), a = function(u) {
    return u === 1 ? 1 : n * Math.pow(2, -10 * u) * cl((u - o) * i) + 1;
  }, l = e === "out" ? a : e === "in" ? function(c) {
    return 1 - a(1 - c);
  } : Ii(a);
  return i = ln / i, l.config = function(c, u) {
    return s(e, c, u);
  }, l;
}, Yr = function s(e, t) {
  t === void 0 && (t = 1.70158);
  var r = function(o) {
    return o ? --o * o * ((t + 1) * o + t) + 1 : 0;
  }, n = e === "out" ? r : e === "in" ? function(i) {
    return 1 - r(1 - i);
  } : Ii(r);
  return n.config = function(i) {
    return s(e, i);
  }, n;
};
me("Linear,Quad,Cubic,Quart,Quint,Strong", function(s, e) {
  var t = e < 5 ? e + 1 : e;
  ft(s + ",Power" + (t - 1), e ? function(r) {
    return Math.pow(r, t);
  } : function(r) {
    return r;
  }, function(r) {
    return 1 - Math.pow(1 - r, t);
  }, function(r) {
    return r < 0.5 ? Math.pow(r * 2, t) / 2 : 1 - Math.pow((1 - r) * 2, t) / 2;
  });
});
B.Linear.easeNone = B.none = B.Linear.easeIn;
ft("Elastic", Br("in"), Br("out"), Br());
(function(s, e) {
  var t = 1 / e, r = 2 * t, n = 2.5 * t, i = function(a) {
    return a < t ? s * a * a : a < r ? s * Math.pow(a - 1.5 / e, 2) + 0.75 : a < n ? s * (a -= 2.25 / e) * a + 0.9375 : s * Math.pow(a - 2.625 / e, 2) + 0.984375;
  };
  ft("Bounce", function(o) {
    return 1 - i(1 - o);
  }, i);
})(7.5625, 2.75);
ft("Expo", function(s) {
  return Math.pow(2, 10 * (s - 1)) * s + s * s * s * s * s * s * (1 - s);
});
ft("Circ", function(s) {
  return -(oi(1 - s * s) - 1);
});
ft("Sine", function(s) {
  return s === 1 ? 1 : -ll(s * ol) + 1;
});
ft("Back", Yr("in"), Yr("out"), Yr());
B.SteppedEase = B.steps = ke.SteppedEase = {
  config: function(e, t) {
    e === void 0 && (e = 1);
    var r = 1 / e, n = e + (t ? 0 : 1), i = t ? 1 : 0, o = 1 - q;
    return function(a) {
      return ((n * nr(0, o, a) | 0) + i) * r;
    };
  }
};
kt.ease = B["quad.out"];
me("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(s) {
  return Rn += s + "," + s + "Params,";
});
var Vi = function(e, t) {
  this.id = al++, e._gsap = this, this.target = e, this.harness = t, this.get = t ? t.get : mi, this.set = t ? t.getSetter : Fn;
}, Kt = /* @__PURE__ */ function() {
  function s(t) {
    this.vars = t, this._delay = +t.delay || 0, (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0, this._yoyo = !!t.yoyo || !!t.yoyoEase), this._ts = 1, Pt(this, +t.duration, 1, 1), this.data = t.data, J && (this._ctx = J, J.data.push(this)), Zt || xe.wake();
  }
  var e = s.prototype;
  return e.delay = function(r) {
    return r || r === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + r - this._delay), this._delay = r, this) : this._delay;
  }, e.duration = function(r) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? r + (r + this._rDelay) * this._repeat : r) : this.totalDuration() && this._dur;
  }, e.totalDuration = function(r) {
    return arguments.length ? (this._dirty = 0, Pt(this, this._repeat < 0 ? r : (r - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, e.totalTime = function(r, n) {
    if (Ct(), !arguments.length)
      return this._tTime;
    var i = this._dp;
    if (i && i.smoothChildTiming && this._ts) {
      for (Ar(this, r), !i._dp || i.parent || xi(i, this); i && i.parent; )
        i.parent._time !== i._start + (i._ts >= 0 ? i._tTime / i._ts : (i.totalDuration() - i._tTime) / -i._ts) && i.totalTime(i._tTime, !0), i = i.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && r < this._tDur || this._ts < 0 && r > 0 || !this._tDur && !r) && ze(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== r || !this._dur && !n || this._initted && Math.abs(this._zTime) === q || !r && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = r), gi(this, r, n)), this;
  }, e.time = function(r, n) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), r + ds(this)) % (this._dur + this._rDelay) || (r ? this._dur : 0), n) : this._time;
  }, e.totalProgress = function(r, n) {
    return arguments.length ? this.totalTime(this.totalDuration() * r, n) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, e.progress = function(r, n) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - r : r) + ds(this), n) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, e.iteration = function(r, n) {
    var i = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (r - 1) * i, n) : this._repeat ? St(this._tTime, i) + 1 : 1;
  }, e.timeScale = function(r, n) {
    if (!arguments.length)
      return this._rts === -q ? 0 : this._rts;
    if (this._rts === r)
      return this;
    var i = this.parent && this._ts ? Tr(this.parent._time, this) : this._tTime;
    return this._rts = +r || 0, this._ts = this._ps || r === -q ? 0 : this._rts, this.totalTime(nr(-Math.abs(this._delay), this.totalDuration(), i), n !== !1), Er(this), gl(this);
  }, e.paused = function(r) {
    return arguments.length ? (this._ps !== r && (this._ps = r, r ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Ct(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== q && (this._tTime -= q)))), this) : this._ps;
  }, e.startTime = function(r) {
    if (arguments.length) {
      this._start = r;
      var n = this.parent || this._dp;
      return n && (n._sort || !this.parent) && ze(n, this, r - this._delay), this;
    }
    return this._start;
  }, e.endTime = function(r) {
    return this._start + (pe(r) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, e.rawTime = function(r) {
    var n = this.parent || this._dp;
    return n ? r && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Tr(n.rawTime(r), this) : this._tTime : this._tTime;
  }, e.revert = function(r) {
    r === void 0 && (r = fl);
    var n = ce;
    return ce = r, Dn(this) && (this.timeline && this.timeline.revert(r), this.totalTime(-0.01, r.suppressEvents)), this.data !== "nested" && r.kill !== !1 && this.kill(), ce = n, this;
  }, e.globalTime = function(r) {
    for (var n = this, i = arguments.length ? r : n.rawTime(); n; )
      i = n._start + i / (Math.abs(n._ts) || 1), n = n._dp;
    return !this.parent && this._sat ? this._sat.globalTime(r) : i;
  }, e.repeat = function(r) {
    return arguments.length ? (this._repeat = r === 1 / 0 ? -2 : r, fs(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, e.repeatDelay = function(r) {
    if (arguments.length) {
      var n = this._time;
      return this._rDelay = r, fs(this), n ? this.time(n) : this;
    }
    return this._rDelay;
  }, e.yoyo = function(r) {
    return arguments.length ? (this._yoyo = r, this) : this._yoyo;
  }, e.seek = function(r, n) {
    return this.totalTime(Pe(this, r), pe(n));
  }, e.restart = function(r, n) {
    return this.play().totalTime(r ? -this._delay : 0, pe(n)), this._dur || (this._zTime = -q), this;
  }, e.play = function(r, n) {
    return r != null && this.seek(r, n), this.reversed(!1).paused(!1);
  }, e.reverse = function(r, n) {
    return r != null && this.seek(r || this.totalDuration(), n), this.reversed(!0).paused(!1);
  }, e.pause = function(r, n) {
    return r != null && this.seek(r, n), this.paused(!0);
  }, e.resume = function() {
    return this.paused(!1);
  }, e.reversed = function(r) {
    return arguments.length ? (!!r !== this.reversed() && this.timeScale(-this._rts || (r ? -q : 0)), this) : this._rts < 0;
  }, e.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -q, this;
  }, e.isActive = function() {
    var r = this.parent || this._dp, n = this._start, i;
    return !!(!r || this._ts && this._initted && r.isActive() && (i = r.rawTime(!0)) >= n && i < this.endTime(!0) - q);
  }, e.eventCallback = function(r, n, i) {
    var o = this.vars;
    return arguments.length > 1 ? (n ? (o[r] = n, i && (o[r + "Params"] = i), r === "onUpdate" && (this._onUpdate = n)) : delete o[r], this) : o[r];
  }, e.then = function(r) {
    var n = this;
    return new Promise(function(i) {
      var o = ee(r) ? r : bi, a = function() {
        var c = n.then;
        n.then = null, ee(o) && (o = o(n)) && (o.then || o === n) && (n.then = c), i(o), n.then = c;
      };
      n._initted && n.totalProgress() === 1 && n._ts >= 0 || !n._tTime && n._ts < 0 ? a() : n._prom = a;
    });
  }, e.kill = function() {
    Lt(this);
  }, s;
}();
Te(Kt.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -q,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var fe = /* @__PURE__ */ function(s) {
  ii(e, s);
  function e(r, n) {
    var i;
    return r === void 0 && (r = {}), i = s.call(this, r) || this, i.labels = {}, i.smoothChildTiming = !!r.smoothChildTiming, i.autoRemoveChildren = !!r.autoRemoveChildren, i._sort = pe(r.sortChildren), Z && ze(r.parent || Z, Ve(i), n), r.reversed && i.reverse(), r.paused && i.paused(!0), r.scrollTrigger && vi(Ve(i), r.scrollTrigger), i;
  }
  var t = e.prototype;
  return t.to = function(n, i, o) {
    return Ut(0, arguments, this), this;
  }, t.from = function(n, i, o) {
    return Ut(1, arguments, this), this;
  }, t.fromTo = function(n, i, o, a) {
    return Ut(2, arguments, this), this;
  }, t.set = function(n, i, o) {
    return i.duration = 0, i.parent = this, Yt(i).repeatDelay || (i.repeat = 0), i.immediateRender = !!i.immediateRender, new ne(n, i, Pe(this, o), 1), this;
  }, t.call = function(n, i, o) {
    return ze(this, ne.delayedCall(0, n, i), o);
  }, t.staggerTo = function(n, i, o, a, l, c, u) {
    return o.duration = i, o.stagger = o.stagger || a, o.onComplete = c, o.onCompleteParams = u, o.parent = this, new ne(n, o, Pe(this, l)), this;
  }, t.staggerFrom = function(n, i, o, a, l, c, u) {
    return o.runBackwards = 1, Yt(o).immediateRender = pe(o.immediateRender), this.staggerTo(n, i, o, a, l, c, u);
  }, t.staggerFromTo = function(n, i, o, a, l, c, u, f) {
    return a.startAt = o, Yt(a).immediateRender = pe(a.immediateRender), this.staggerTo(n, i, a, l, c, u, f);
  }, t.render = function(n, i, o) {
    var a = this._time, l = this._dirty ? this.totalDuration() : this._tDur, c = this._dur, u = n <= 0 ? 0 : se(n), f = this._zTime < 0 != n < 0 && (this._initted || !c), p, h, m, d, g, x, b, T, k, v, y, _;
    if (this !== Z && u > l && n >= 0 && (u = l), u !== this._tTime || o || f) {
      if (a !== this._time && c && (u += this._time - a, n += this._time - a), p = u, k = this._start, T = this._ts, x = !T, f && (c || (a = this._zTime), (n || !i) && (this._zTime = n)), this._repeat) {
        if (y = this._yoyo, g = c + this._rDelay, this._repeat < -1 && n < 0)
          return this.totalTime(g * 100 + n, i, o);
        if (p = se(u % g), u === l ? (d = this._repeat, p = c) : (v = se(u / g), d = ~~v, d && d === v && (p = c, d--), p > c && (p = c)), v = St(this._tTime, g), !a && this._tTime && v !== d && this._tTime - v * g - this._dur <= 0 && (v = d), y && d & 1 && (p = c - p, _ = 1), d !== v && !this._lock) {
          var w = y && v & 1, S = w === (y && d & 1);
          if (d < v && (w = !w), a = w ? 0 : u % c ? c : u, this._lock = 1, this.render(a || (_ ? 0 : se(d * g)), i, !c)._lock = 0, this._tTime = u, !i && this.parent && ve(this, "onRepeat"), this.vars.repeatRefresh && !_ && (this.invalidate()._lock = 1), a && a !== this._time || x !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (c = this._dur, l = this._tDur, S && (this._lock = 2, a = w ? c : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !_ && this.invalidate()), this._lock = 0, !this._ts && !x)
            return this;
          Ni(this, _);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (b = xl(this, se(a), se(p)), b && (u -= p - (p = b._start))), this._tTime = u, this._time = p, this._act = !T, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = n, a = 0), !a && u && !i && !v && (ve(this, "onStart"), this._tTime !== u))
        return this;
      if (p >= a && n >= 0)
        for (h = this._first; h; ) {
          if (m = h._next, (h._act || p >= h._start) && h._ts && b !== h) {
            if (h.parent !== this)
              return this.render(n, i, o);
            if (h.render(h._ts > 0 ? (p - h._start) * h._ts : (h._dirty ? h.totalDuration() : h._tDur) + (p - h._start) * h._ts, i, o), p !== this._time || !this._ts && !x) {
              b = 0, m && (u += this._zTime = -q);
              break;
            }
          }
          h = m;
        }
      else {
        h = this._last;
        for (var C = n < 0 ? n : p; h; ) {
          if (m = h._prev, (h._act || C <= h._end) && h._ts && b !== h) {
            if (h.parent !== this)
              return this.render(n, i, o);
            if (h.render(h._ts > 0 ? (C - h._start) * h._ts : (h._dirty ? h.totalDuration() : h._tDur) + (C - h._start) * h._ts, i, o || ce && Dn(h)), p !== this._time || !this._ts && !x) {
              b = 0, m && (u += this._zTime = C ? -q : q);
              break;
            }
          }
          h = m;
        }
      }
      if (b && !i && (this.pause(), b.render(p >= a ? 0 : -q)._zTime = p >= a ? 1 : -1, this._ts))
        return this._start = k, Er(this), this.render(n, i, o);
      this._onUpdate && !i && ve(this, "onUpdate", !0), (u === l && this._tTime >= this.totalDuration() || !u && a) && (k === this._start || Math.abs(T) !== Math.abs(this._ts)) && (this._lock || ((n || !c) && (u === l && this._ts > 0 || !u && this._ts < 0) && He(this, 1), !i && !(n < 0 && !a) && (u || a || !l) && (ve(this, u === l && n >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(u < l && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, t.add = function(n, i) {
    var o = this;
    if (Le(i) || (i = Pe(this, i, n)), !(n instanceof Kt)) {
      if (de(n))
        return n.forEach(function(a) {
          return o.add(a, i);
        }), this;
      if (le(n))
        return this.addLabel(n, i);
      if (ee(n))
        n = ne.delayedCall(0, n);
      else
        return this;
    }
    return this !== n ? ze(this, n, i) : this;
  }, t.getChildren = function(n, i, o, a) {
    n === void 0 && (n = !0), i === void 0 && (i = !0), o === void 0 && (o = !0), a === void 0 && (a = -Me);
    for (var l = [], c = this._first; c; )
      c._start >= a && (c instanceof ne ? i && l.push(c) : (o && l.push(c), n && l.push.apply(l, c.getChildren(!0, i, o)))), c = c._next;
    return l;
  }, t.getById = function(n) {
    for (var i = this.getChildren(1, 1, 1), o = i.length; o--; )
      if (i[o].vars.id === n)
        return i[o];
  }, t.remove = function(n) {
    return le(n) ? this.removeLabel(n) : ee(n) ? this.killTweensOf(n) : (n.parent === this && Or(this, n), n === this._recent && (this._recent = this._last), at(this));
  }, t.totalTime = function(n, i) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = se(xe.time - (this._ts > 0 ? n / this._ts : (this.totalDuration() - n) / -this._ts))), s.prototype.totalTime.call(this, n, i), this._forcing = 0, this) : this._tTime;
  }, t.addLabel = function(n, i) {
    return this.labels[n] = Pe(this, i), this;
  }, t.removeLabel = function(n) {
    return delete this.labels[n], this;
  }, t.addPause = function(n, i, o) {
    var a = ne.delayedCall(0, i || Qt, o);
    return a.data = "isPause", this._hasPause = 1, ze(this, a, Pe(this, n));
  }, t.removePause = function(n) {
    var i = this._first;
    for (n = Pe(this, n); i; )
      i._start === n && i.data === "isPause" && He(i), i = i._next;
  }, t.killTweensOf = function(n, i, o) {
    for (var a = this.getTweensOf(n, o), l = a.length; l--; )
      Ye !== a[l] && a[l].kill(n, i);
    return this;
  }, t.getTweensOf = function(n, i) {
    for (var o = [], a = Oe(n), l = this._first, c = Le(i), u; l; )
      l instanceof ne ? hl(l._targets, a) && (c ? (!Ye || l._initted && l._ts) && l.globalTime(0) <= i && l.globalTime(l.totalDuration()) > i : !i || l.isActive()) && o.push(l) : (u = l.getTweensOf(a, i)).length && o.push.apply(o, u), l = l._next;
    return o;
  }, t.tweenTo = function(n, i) {
    i = i || {};
    var o = this, a = Pe(o, n), l = i, c = l.startAt, u = l.onStart, f = l.onStartParams, p = l.immediateRender, h, m = ne.to(o, Te({
      ease: i.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: a,
      overwrite: "auto",
      duration: i.duration || Math.abs((a - (c && "time" in c ? c.time : o._time)) / o.timeScale()) || q,
      onStart: function() {
        if (o.pause(), !h) {
          var g = i.duration || Math.abs((a - (c && "time" in c ? c.time : o._time)) / o.timeScale());
          m._dur !== g && Pt(m, g, 0, 1).render(m._time, !0, !0), h = 1;
        }
        u && u.apply(m, f || []);
      }
    }, i));
    return p ? m.render(0) : m;
  }, t.tweenFromTo = function(n, i, o) {
    return this.tweenTo(i, Te({
      startAt: {
        time: Pe(this, n)
      }
    }, o));
  }, t.recent = function() {
    return this._recent;
  }, t.nextLabel = function(n) {
    return n === void 0 && (n = this._time), hs(this, Pe(this, n));
  }, t.previousLabel = function(n) {
    return n === void 0 && (n = this._time), hs(this, Pe(this, n), 1);
  }, t.currentLabel = function(n) {
    return arguments.length ? this.seek(n, !0) : this.previousLabel(this._time + q);
  }, t.shiftChildren = function(n, i, o) {
    o === void 0 && (o = 0);
    for (var a = this._first, l = this.labels, c; a; )
      a._start >= o && (a._start += n, a._end += n), a = a._next;
    if (i)
      for (c in l)
        l[c] >= o && (l[c] += n);
    return at(this);
  }, t.invalidate = function(n) {
    var i = this._first;
    for (this._lock = 0; i; )
      i.invalidate(n), i = i._next;
    return s.prototype.invalidate.call(this, n);
  }, t.clear = function(n) {
    n === void 0 && (n = !0);
    for (var i = this._first, o; i; )
      o = i._next, this.remove(i), i = o;
    return this._dp && (this._time = this._tTime = this._pTime = 0), n && (this.labels = {}), at(this);
  }, t.totalDuration = function(n) {
    var i = 0, o = this, a = o._last, l = Me, c, u, f;
    if (arguments.length)
      return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -n : n));
    if (o._dirty) {
      for (f = o.parent; a; )
        c = a._prev, a._dirty && a.totalDuration(), u = a._start, u > l && o._sort && a._ts && !o._lock ? (o._lock = 1, ze(o, a, u - a._delay, 1)._lock = 0) : l = u, u < 0 && a._ts && (i -= u, (!f && !o._dp || f && f.smoothChildTiming) && (o._start += u / o._ts, o._time -= u, o._tTime -= u), o.shiftChildren(-u, !1, -1 / 0), l = 0), a._end > i && a._ts && (i = a._end), a = c;
      Pt(o, o === Z && o._time > i ? o._time : i, 1, 1), o._dirty = 0;
    }
    return o._tDur;
  }, e.updateRoot = function(n) {
    if (Z._ts && (gi(Z, Tr(n, Z)), pi = xe.frame), xe.frame >= cs) {
      cs += we.autoSleep || 120;
      var i = Z._first;
      if ((!i || !i._ts) && we.autoSleep && xe._listeners.length < 2) {
        for (; i && !i._ts; )
          i = i._next;
        i || xe.sleep();
      }
    }
  }, e;
}(Kt);
Te(fe.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var Nl = function(e, t, r, n, i, o, a) {
  var l = new ge(this._pt, e, t, 0, 1, Yi, null, i), c = 0, u = 0, f, p, h, m, d, g, x, b;
  for (l.b = r, l.e = n, r += "", n += "", (x = ~n.indexOf("random(")) && (n = Jt(n)), o && (b = [r, n], o(b, e, t), r = b[0], n = b[1]), p = r.match(Lr) || []; f = Lr.exec(n); )
    m = f[0], d = n.substring(c, f.index), h ? h = (h + 1) % 5 : d.substr(-5) === "rgba(" && (h = 1), m !== p[u++] && (g = parseFloat(p[u - 1]) || 0, l._pt = {
      _next: l._pt,
      p: d || u === 1 ? d : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: g,
      c: m.charAt(1) === "=" ? yt(g, m) - g : parseFloat(m) - g,
      m: h && h < 4 ? Math.round : 0
    }, c = Lr.lastIndex);
  return l.c = c < n.length ? n.substring(c, n.length) : "", l.fp = a, (ci.test(n) || x) && (l.e = 0), this._pt = l, l;
}, Nn = function(e, t, r, n, i, o, a, l, c, u) {
  ee(n) && (n = n(i || 0, e, o));
  var f = e[t], p = r !== "get" ? r : ee(f) ? c ? e[t.indexOf("set") || !ee(e["get" + t.substr(3)]) ? t : "get" + t.substr(3)](c) : e[t]() : f, h = ee(f) ? c ? Gl : ji : Vn, m;
  if (le(n) && (~n.indexOf("random(") && (n = Jt(n)), n.charAt(1) === "=" && (m = yt(p, n) + (ue(p) || 0), (m || m === 0) && (n = m))), !u || p !== n || _n)
    return !isNaN(p * n) && n !== "" ? (m = new ge(this._pt, e, t, +p || 0, n - (p || 0), typeof f == "boolean" ? Bl : Bi, 0, h), c && (m.fp = c), a && m.modifier(a, this, e), this._pt = m) : (!f && !(t in e) && An(t, n), Nl.call(this, e, t, p, n, h, l || we.stringFilter, c));
}, Il = function(e, t, r, n, i) {
  if (ee(e) && (e = Wt(e, i, t, r, n)), !$e(e) || e.style && e.nodeType || de(e) || ai(e))
    return le(e) ? Wt(e, i, t, r, n) : e;
  var o = {}, a;
  for (a in e)
    o[a] = Wt(e[a], i, t, r, n);
  return o;
}, Fi = function(e, t, r, n, i, o) {
  var a, l, c, u;
  if (ye[e] && (a = new ye[e]()).init(i, a.rawVars ? t[e] : Il(t[e], n, i, o, r), r, n, o) !== !1 && (r._pt = l = new ge(r._pt, i, e, 0, 1, a.render, a, 0, a.priority), r !== bt))
    for (c = r._ptLookup[r._targets.indexOf(i)], u = a._props.length; u--; )
      c[a._props[u]] = l;
  return a;
}, Ye, _n, In = function s(e, t, r) {
  var n = e.vars, i = n.ease, o = n.startAt, a = n.immediateRender, l = n.lazy, c = n.onUpdate, u = n.runBackwards, f = n.yoyoEase, p = n.keyframes, h = n.autoRevert, m = e._dur, d = e._startAt, g = e._targets, x = e.parent, b = x && x.data === "nested" ? x.vars.targets : g, T = e._overwrite === "auto" && !Cn, k = e.timeline, v, y, _, w, S, C, O, M, A, z, R, E, F;
  if (k && (!p || !i) && (i = "none"), e._ease = lt(i, kt.ease), e._yEase = f ? Di(lt(f === !0 ? i : f, kt.ease)) : 0, f && e._yoyo && !e._repeat && (f = e._yEase, e._yEase = e._ease, e._ease = f), e._from = !k && !!n.runBackwards, !k || p && !n.stagger) {
    if (M = g[0] ? ot(g[0]).harness : 0, E = M && n[M.prop], v = kr(n, zn), d && (d._zTime < 0 && d.progress(1), t < 0 && u && a && !h ? d.render(-1, !0) : d.revert(u && m ? mr : dl), d._lazy = 0), o) {
      if (He(e._startAt = ne.set(g, Te({
        data: "isStart",
        overwrite: !1,
        parent: x,
        immediateRender: !0,
        lazy: !d && pe(l),
        startAt: null,
        delay: 0,
        onUpdate: c && function() {
          return ve(e, "onUpdate");
        },
        stagger: 0
      }, o))), e._startAt._dp = 0, e._startAt._sat = e, t < 0 && (ce || !a && !h) && e._startAt.revert(mr), a && m && t <= 0 && r <= 0) {
        t && (e._zTime = t);
        return;
      }
    } else if (u && m && !d) {
      if (t && (a = !1), _ = Te({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: a && !d && pe(l),
        immediateRender: a,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: x
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, v), E && (_[M.prop] = E), He(e._startAt = ne.set(g, _)), e._startAt._dp = 0, e._startAt._sat = e, t < 0 && (ce ? e._startAt.revert(mr) : e._startAt.render(-1, !0)), e._zTime = t, !a)
        s(e._startAt, q, q);
      else if (!t)
        return;
    }
    for (e._pt = e._ptCache = 0, l = m && pe(l) || l && !m, y = 0; y < g.length; y++) {
      if (S = g[y], O = S._gsap || $n(g)[y]._gsap, e._ptLookup[y] = z = {}, dn[O.id] && Xe.length && wr(), R = b === g ? y : b.indexOf(S), M && (A = new M()).init(S, E || v, e, R, b) !== !1 && (e._pt = w = new ge(e._pt, S, A.name, 0, 1, A.render, A, 0, A.priority), A._props.forEach(function(P) {
        z[P] = w;
      }), A.priority && (C = 1)), !M || E)
        for (_ in v)
          ye[_] && (A = Fi(_, v, e, R, S, b)) ? A.priority && (C = 1) : z[_] = w = Nn.call(e, S, _, "get", v[_], R, b, 0, n.stringFilter);
      e._op && e._op[y] && e.kill(S, e._op[y]), T && e._pt && (Ye = e, Z.killTweensOf(S, z, e.globalTime(t)), F = !e.parent, Ye = 0), e._pt && l && (dn[O.id] = 1);
    }
    C && Ui(e), e._onInit && e._onInit(e);
  }
  e._onUpdate = c, e._initted = (!e._op || e._pt) && !F, p && t <= 0 && k.render(Me, !0, !0);
}, Vl = function(e, t, r, n, i, o, a, l) {
  var c = (e._pt && e._ptCache || (e._ptCache = {}))[t], u, f, p, h;
  if (!c)
    for (c = e._ptCache[t] = [], p = e._ptLookup, h = e._targets.length; h--; ) {
      if (u = p[h][t], u && u.d && u.d._pt)
        for (u = u.d._pt; u && u.p !== t && u.fp !== t; )
          u = u._next;
      if (!u)
        return _n = 1, e.vars[t] = "+=0", In(e, a), _n = 0, l ? Ht(t + " not eligible for reset") : 1;
      c.push(u);
    }
  for (h = c.length; h--; )
    f = c[h], u = f._pt || f, u.s = (n || n === 0) && !i ? n : u.s + (n || 0) + o * u.c, u.c = r - u.s, f.e && (f.e = re(r) + ue(f.e)), f.b && (f.b = u.s + ue(f.b));
}, Fl = function(e, t) {
  var r = e[0] ? ot(e[0]).harness : 0, n = r && r.aliases, i, o, a, l;
  if (!n)
    return t;
  i = Tt({}, t);
  for (o in n)
    if (o in i)
      for (l = n[o].split(","), a = l.length; a--; )
        i[l[a]] = i[o];
  return i;
}, Ll = function(e, t, r, n) {
  var i = t.ease || n || "power1.inOut", o, a;
  if (de(t))
    a = r[e] || (r[e] = []), t.forEach(function(l, c) {
      return a.push({
        t: c / (t.length - 1) * 100,
        v: l,
        e: i
      });
    });
  else
    for (o in t)
      a = r[o] || (r[o] = []), o === "ease" || a.push({
        t: parseFloat(e),
        v: t[o],
        e: i
      });
}, Wt = function(e, t, r, n, i) {
  return ee(e) ? e.call(t, r, n, i) : le(e) && ~e.indexOf("random(") ? Jt(e) : e;
}, Li = Rn + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", Gi = {};
me(Li + ",id,stagger,delay,duration,paused,scrollTrigger", function(s) {
  return Gi[s] = 1;
});
var ne = /* @__PURE__ */ function(s) {
  ii(e, s);
  function e(r, n, i, o) {
    var a;
    typeof n == "number" && (i.duration = n, n = i, i = null), a = s.call(this, o ? n : Yt(n)) || this;
    var l = a.vars, c = l.duration, u = l.delay, f = l.immediateRender, p = l.stagger, h = l.overwrite, m = l.keyframes, d = l.defaults, g = l.scrollTrigger, x = l.yoyoEase, b = n.parent || Z, T = (de(r) || ai(r) ? Le(r[0]) : "length" in n) ? [r] : Oe(r), k, v, y, _, w, S, C, O;
    if (a._targets = T.length ? $n(T) : Ht("GSAP target " + r + " not found. https://gsap.com", !we.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = h, m || p || hr(c) || hr(u)) {
      if (n = a.vars, k = a.timeline = new fe({
        data: "nested",
        defaults: d || {},
        targets: b && b.data === "nested" ? b.vars.targets : T
      }), k.kill(), k.parent = k._dp = Ve(a), k._start = 0, p || hr(c) || hr(u)) {
        if (_ = T.length, C = p && Si(p), $e(p))
          for (w in p)
            ~Li.indexOf(w) && (O || (O = {}), O[w] = p[w]);
        for (v = 0; v < _; v++)
          y = kr(n, Gi), y.stagger = 0, x && (y.yoyoEase = x), O && Tt(y, O), S = T[v], y.duration = +Wt(c, Ve(a), v, S, T), y.delay = (+Wt(u, Ve(a), v, S, T) || 0) - a._delay, !p && _ === 1 && y.delay && (a._delay = u = y.delay, a._start += u, y.delay = 0), k.to(S, y, C ? C(v, S, T) : 0), k._ease = B.none;
        k.duration() ? c = u = 0 : a.timeline = 0;
      } else if (m) {
        Yt(Te(k.vars.defaults, {
          ease: "none"
        })), k._ease = lt(m.ease || n.ease || "none");
        var M = 0, A, z, R;
        if (de(m))
          m.forEach(function(E) {
            return k.to(T, E, ">");
          }), k.duration();
        else {
          y = {};
          for (w in m)
            w === "ease" || w === "easeEach" || Ll(w, m[w], y, m.easeEach);
          for (w in y)
            for (A = y[w].sort(function(E, F) {
              return E.t - F.t;
            }), M = 0, v = 0; v < A.length; v++)
              z = A[v], R = {
                ease: z.e,
                duration: (z.t - (v ? A[v - 1].t : 0)) / 100 * c
              }, R[w] = z.v, k.to(T, R, M), M += R.duration;
          k.duration() < c && k.to({}, {
            duration: c - k.duration()
          });
        }
      }
      c || a.duration(c = k.duration());
    } else
      a.timeline = 0;
    return h === !0 && !Cn && (Ye = Ve(a), Z.killTweensOf(T), Ye = 0), ze(b, Ve(a), i), n.reversed && a.reverse(), n.paused && a.paused(!0), (f || !c && !m && a._start === se(b._time) && pe(f) && _l(Ve(a)) && b.data !== "nested") && (a._tTime = -q, a.render(Math.max(0, -u) || 0)), g && vi(Ve(a), g), a;
  }
  var t = e.prototype;
  return t.render = function(n, i, o) {
    var a = this._time, l = this._tDur, c = this._dur, u = n < 0, f = n > l - q && !u ? l : n < q ? 0 : n, p, h, m, d, g, x, b, T, k;
    if (!c)
      yl(this, n, i, o);
    else if (f !== this._tTime || !n || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== u || this._lazy) {
      if (p = f, T = this.timeline, this._repeat) {
        if (d = c + this._rDelay, this._repeat < -1 && u)
          return this.totalTime(d * 100 + n, i, o);
        if (p = se(f % d), f === l ? (m = this._repeat, p = c) : (g = se(f / d), m = ~~g, m && m === g ? (p = c, m--) : p > c && (p = c)), x = this._yoyo && m & 1, x && (k = this._yEase, p = c - p), g = St(this._tTime, d), p === a && !o && this._initted && m === g)
          return this._tTime = f, this;
        m !== g && (T && this._yEase && Ni(T, x), this.vars.repeatRefresh && !x && !this._lock && p !== d && this._initted && (this._lock = o = 1, this.render(se(d * m), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (wi(this, u ? n : p, o, i, f))
          return this._tTime = 0, this;
        if (a !== this._time && !(o && this.vars.repeatRefresh && m !== g))
          return this;
        if (c !== this._dur)
          return this.render(n, i, o);
      }
      if (this._tTime = f, this._time = p, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = b = (k || this._ease)(p / c), this._from && (this.ratio = b = 1 - b), !a && f && !i && !g && (ve(this, "onStart"), this._tTime !== f))
        return this;
      for (h = this._pt; h; )
        h.r(b, h.d), h = h._next;
      T && T.render(n < 0 ? n : T._dur * T._ease(p / this._dur), i, o) || this._startAt && (this._zTime = n), this._onUpdate && !i && (u && fn(this, n, i, o), ve(this, "onUpdate")), this._repeat && m !== g && this.vars.onRepeat && !i && this.parent && ve(this, "onRepeat"), (f === this._tDur || !f) && this._tTime === f && (u && !this._onUpdate && fn(this, n, !0, !0), (n || !c) && (f === this._tDur && this._ts > 0 || !f && this._ts < 0) && He(this, 1), !i && !(u && !a) && (f || a || x) && (ve(this, f === l ? "onComplete" : "onReverseComplete", !0), this._prom && !(f < l && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, t.targets = function() {
    return this._targets;
  }, t.invalidate = function(n) {
    return (!n || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(n), s.prototype.invalidate.call(this, n);
  }, t.resetTo = function(n, i, o, a, l) {
    Zt || xe.wake(), this._ts || this.play();
    var c = Math.min(this._dur, (this._dp._time - this._start) * this._ts), u;
    return this._initted || In(this, c), u = this._ease(c / this._dur), Vl(this, n, i, o, a, u, c, l) ? this.resetTo(n, i, o, a, 1) : (Ar(this, 0), this.parent || yi(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, t.kill = function(n, i) {
    if (i === void 0 && (i = "all"), !n && (!i || i === "all"))
      return this._lazy = this._pt = 0, this.parent ? Lt(this) : this.scrollTrigger && this.scrollTrigger.kill(!!ce), this;
    if (this.timeline) {
      var o = this.timeline.totalDuration();
      return this.timeline.killTweensOf(n, i, Ye && Ye.vars.overwrite !== !0)._first || Lt(this), this.parent && o !== this.timeline.totalDuration() && Pt(this, this._dur * this.timeline._tDur / o, 0, 1), this;
    }
    var a = this._targets, l = n ? Oe(n) : a, c = this._ptLookup, u = this._pt, f, p, h, m, d, g, x;
    if ((!i || i === "all") && ml(a, l))
      return i === "all" && (this._pt = 0), Lt(this);
    for (f = this._op = this._op || [], i !== "all" && (le(i) && (d = {}, me(i, function(b) {
      return d[b] = 1;
    }), i = d), i = Fl(a, i)), x = a.length; x--; )
      if (~l.indexOf(a[x])) {
        p = c[x], i === "all" ? (f[x] = i, m = p, h = {}) : (h = f[x] = f[x] || {}, m = i);
        for (d in m)
          g = p && p[d], g && ((!("kill" in g.d) || g.d.kill(d) === !0) && Or(this, g, "_pt"), delete p[d]), h !== "all" && (h[d] = 1);
      }
    return this._initted && !this._pt && u && Lt(this), this;
  }, e.to = function(n, i) {
    return new e(n, i, arguments[2]);
  }, e.from = function(n, i) {
    return Ut(1, arguments);
  }, e.delayedCall = function(n, i, o, a) {
    return new e(i, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: n,
      onComplete: i,
      onReverseComplete: i,
      onCompleteParams: o,
      onReverseCompleteParams: o,
      callbackScope: a
    });
  }, e.fromTo = function(n, i, o) {
    return Ut(2, arguments);
  }, e.set = function(n, i) {
    return i.duration = 0, i.repeatDelay || (i.repeat = 0), new e(n, i);
  }, e.killTweensOf = function(n, i, o) {
    return Z.killTweensOf(n, i, o);
  }, e;
}(Kt);
Te(ne.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
me("staggerTo,staggerFrom,staggerFromTo", function(s) {
  ne[s] = function() {
    var e = new fe(), t = pn.call(arguments, 0);
    return t.splice(s === "staggerFromTo" ? 5 : 4, 0, 0), e[s].apply(e, t);
  };
});
var Vn = function(e, t, r) {
  return e[t] = r;
}, ji = function(e, t, r) {
  return e[t](r);
}, Gl = function(e, t, r, n) {
  return e[t](n.fp, r);
}, jl = function(e, t, r) {
  return e.setAttribute(t, r);
}, Fn = function(e, t) {
  return ee(e[t]) ? ji : Mn(e[t]) && e.setAttribute ? jl : Vn;
}, Bi = function(e, t) {
  return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t);
}, Bl = function(e, t) {
  return t.set(t.t, t.p, !!(t.s + t.c * e), t);
}, Yi = function(e, t) {
  var r = t._pt, n = "";
  if (!e && t.b)
    n = t.b;
  else if (e === 1 && t.e)
    n = t.e;
  else {
    for (; r; )
      n = r.p + (r.m ? r.m(r.s + r.c * e) : Math.round((r.s + r.c * e) * 1e4) / 1e4) + n, r = r._next;
    n += t.c;
  }
  t.set(t.t, t.p, n, t);
}, Ln = function(e, t) {
  for (var r = t._pt; r; )
    r.r(e, r.d), r = r._next;
}, Yl = function(e, t, r, n) {
  for (var i = this._pt, o; i; )
    o = i._next, i.p === n && i.modifier(e, t, r), i = o;
}, Ul = function(e) {
  for (var t = this._pt, r, n; t; )
    n = t._next, t.p === e && !t.op || t.op === e ? Or(this, t, "_pt") : t.dep || (r = 1), t = n;
  return !r;
}, Wl = function(e, t, r, n) {
  n.mSet(e, t, n.m.call(n.tween, r, n.mt), n);
}, Ui = function(e) {
  for (var t = e._pt, r, n, i, o; t; ) {
    for (r = t._next, n = i; n && n.pr > t.pr; )
      n = n._next;
    (t._prev = n ? n._prev : o) ? t._prev._next = t : i = t, (t._next = n) ? n._prev = t : o = t, t = r;
  }
  e._pt = i;
}, ge = /* @__PURE__ */ function() {
  function s(t, r, n, i, o, a, l, c, u) {
    this.t = r, this.s = i, this.c = o, this.p = n, this.r = a || Bi, this.d = l || this, this.set = c || Vn, this.pr = u || 0, this._next = t, t && (t._prev = this);
  }
  var e = s.prototype;
  return e.modifier = function(r, n, i) {
    this.mSet = this.mSet || this.set, this.set = Wl, this.m = r, this.mt = i, this.tween = n;
  }, s;
}();
me(Rn + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(s) {
  return zn[s] = 1;
});
ke.TweenMax = ke.TweenLite = ne;
ke.TimelineLite = ke.TimelineMax = fe;
Z = new fe({
  sortChildren: !1,
  defaults: kt,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
we.stringFilter = $i;
var ct = [], _r = {}, Xl = [], ms = 0, ql = 0, Ur = function(e) {
  return (_r[e] || Xl).map(function(t) {
    return t();
  });
}, bn = function() {
  var e = Date.now(), t = [];
  e - ms > 2 && (Ur("matchMediaInit"), ct.forEach(function(r) {
    var n = r.queries, i = r.conditions, o, a, l, c;
    for (a in n)
      o = Ae.matchMedia(n[a]).matches, o && (l = 1), o !== i[a] && (i[a] = o, c = 1);
    c && (r.revert(), l && t.push(r));
  }), Ur("matchMediaRevert"), t.forEach(function(r) {
    return r.onMatch(r, function(n) {
      return r.add(null, n);
    });
  }), ms = e, Ur("matchMedia"));
}, Wi = /* @__PURE__ */ function() {
  function s(t, r) {
    this.selector = r && mn(r), this.data = [], this._r = [], this.isReverted = !1, this.id = ql++, t && this.add(t);
  }
  var e = s.prototype;
  return e.add = function(r, n, i) {
    ee(r) && (i = n, n = r, r = ee);
    var o = this, a = function() {
      var c = J, u = o.selector, f;
      return c && c !== o && c.data.push(o), i && (o.selector = mn(i)), J = o, f = n.apply(o, arguments), ee(f) && o._r.push(f), J = c, o.selector = u, o.isReverted = !1, f;
    };
    return o.last = a, r === ee ? a(o, function(l) {
      return o.add(null, l);
    }) : r ? o[r] = a : a;
  }, e.ignore = function(r) {
    var n = J;
    J = null, r(this), J = n;
  }, e.getTweens = function() {
    var r = [];
    return this.data.forEach(function(n) {
      return n instanceof s ? r.push.apply(r, n.getTweens()) : n instanceof ne && !(n.parent && n.parent.data === "nested") && r.push(n);
    }), r;
  }, e.clear = function() {
    this._r.length = this.data.length = 0;
  }, e.kill = function(r, n) {
    var i = this;
    if (r ? function() {
      for (var a = i.getTweens(), l = i.data.length, c; l--; )
        c = i.data[l], c.data === "isFlip" && (c.revert(), c.getChildren(!0, !0, !1).forEach(function(u) {
          return a.splice(a.indexOf(u), 1);
        }));
      for (a.map(function(u) {
        return {
          g: u._dur || u._delay || u._sat && !u._sat.vars.immediateRender ? u.globalTime(0) : -1 / 0,
          t: u
        };
      }).sort(function(u, f) {
        return f.g - u.g || -1 / 0;
      }).forEach(function(u) {
        return u.t.revert(r);
      }), l = i.data.length; l--; )
        c = i.data[l], c instanceof fe ? c.data !== "nested" && (c.scrollTrigger && c.scrollTrigger.revert(), c.kill()) : !(c instanceof ne) && c.revert && c.revert(r);
      i._r.forEach(function(u) {
        return u(r, i);
      }), i.isReverted = !0;
    }() : this.data.forEach(function(a) {
      return a.kill && a.kill();
    }), this.clear(), n)
      for (var o = ct.length; o--; )
        ct[o].id === this.id && ct.splice(o, 1);
  }, e.revert = function(r) {
    this.kill(r || {});
  }, s;
}(), Hl = /* @__PURE__ */ function() {
  function s(t) {
    this.contexts = [], this.scope = t, J && J.data.push(this);
  }
  var e = s.prototype;
  return e.add = function(r, n, i) {
    $e(r) || (r = {
      matches: r
    });
    var o = new Wi(0, i || this.scope), a = o.conditions = {}, l, c, u;
    J && !o.selector && (o.selector = J.selector), this.contexts.push(o), n = o.add("onMatch", n), o.queries = r;
    for (c in r)
      c === "all" ? u = 1 : (l = Ae.matchMedia(r[c]), l && (ct.indexOf(o) < 0 && ct.push(o), (a[c] = l.matches) && (u = 1), l.addListener ? l.addListener(bn) : l.addEventListener("change", bn)));
    return u && n(o, function(f) {
      return o.add(null, f);
    }), this;
  }, e.revert = function(r) {
    this.kill(r || {});
  }, e.kill = function(r) {
    this.contexts.forEach(function(n) {
      return n.kill(r, !0);
    });
  }, s;
}(), Sr = {
  registerPlugin: function() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    t.forEach(function(n) {
      return Ai(n);
    });
  },
  timeline: function(e) {
    return new fe(e);
  },
  getTweensOf: function(e, t) {
    return Z.getTweensOf(e, t);
  },
  getProperty: function(e, t, r, n) {
    le(e) && (e = Oe(e)[0]);
    var i = ot(e || {}).get, o = r ? bi : _i;
    return r === "native" && (r = ""), e && (t ? o((ye[t] && ye[t].get || i)(e, t, r, n)) : function(a, l, c) {
      return o((ye[a] && ye[a].get || i)(e, a, l, c));
    });
  },
  quickSetter: function(e, t, r) {
    if (e = Oe(e), e.length > 1) {
      var n = e.map(function(u) {
        return be.quickSetter(u, t, r);
      }), i = n.length;
      return function(u) {
        for (var f = i; f--; )
          n[f](u);
      };
    }
    e = e[0] || {};
    var o = ye[t], a = ot(e), l = a.harness && (a.harness.aliases || {})[t] || t, c = o ? function(u) {
      var f = new o();
      bt._pt = 0, f.init(e, r ? u + r : u, bt, 0, [e]), f.render(1, f), bt._pt && Ln(1, bt);
    } : a.set(e, l);
    return o ? c : function(u) {
      return c(e, l, r ? u + r : u, a, 1);
    };
  },
  quickTo: function(e, t, r) {
    var n, i = be.to(e, Te((n = {}, n[t] = "+=0.1", n.paused = !0, n.stagger = 0, n), r || {})), o = function(l, c, u) {
      return i.resetTo(t, l, c, u);
    };
    return o.tween = i, o;
  },
  isTweening: function(e) {
    return Z.getTweensOf(e, !0).length > 0;
  },
  defaults: function(e) {
    return e && e.ease && (e.ease = lt(e.ease, kt.ease)), us(kt, e || {});
  },
  config: function(e) {
    return us(we, e || {});
  },
  registerEffect: function(e) {
    var t = e.name, r = e.effect, n = e.plugins, i = e.defaults, o = e.extendTimeline;
    (n || "").split(",").forEach(function(a) {
      return a && !ye[a] && !ke[a] && Ht(t + " effect requires " + a + " plugin.");
    }), Gr[t] = function(a, l, c) {
      return r(Oe(a), Te(l || {}, i), c);
    }, o && (fe.prototype[t] = function(a, l, c) {
      return this.add(Gr[t](a, $e(l) ? l : (c = l) && {}, this), c);
    });
  },
  registerEase: function(e, t) {
    B[e] = lt(t);
  },
  parseEase: function(e, t) {
    return arguments.length ? lt(e, t) : B;
  },
  getById: function(e) {
    return Z.getById(e);
  },
  exportRoot: function(e, t) {
    e === void 0 && (e = {});
    var r = new fe(e), n, i;
    for (r.smoothChildTiming = pe(e.smoothChildTiming), Z.remove(r), r._dp = 0, r._time = r._tTime = Z._time, n = Z._first; n; )
      i = n._next, (t || !(!n._dur && n instanceof ne && n.vars.onComplete === n._targets[0])) && ze(r, n, n._start - n._delay), n = i;
    return ze(Z, r, 0), r;
  },
  context: function(e, t) {
    return e ? new Wi(e, t) : J;
  },
  matchMedia: function(e) {
    return new Hl(e);
  },
  matchMediaRefresh: function() {
    return ct.forEach(function(e) {
      var t = e.conditions, r, n;
      for (n in t)
        t[n] && (t[n] = !1, r = 1);
      r && e.revert();
    }) || bn();
  },
  addEventListener: function(e, t) {
    var r = _r[e] || (_r[e] = []);
    ~r.indexOf(t) || r.push(t);
  },
  removeEventListener: function(e, t) {
    var r = _r[e], n = r && r.indexOf(t);
    n >= 0 && r.splice(n, 1);
  },
  utils: {
    wrap: Cl,
    wrapYoyo: Ml,
    distribute: Si,
    random: Ci,
    snap: Pi,
    normalize: Pl,
    getUnit: ue,
    clamp: wl,
    splitColor: zi,
    toArray: Oe,
    selector: mn,
    mapRange: Oi,
    pipe: Tl,
    unitize: Sl,
    interpolate: Ol,
    shuffle: Ti
  },
  install: fi,
  effects: Gr,
  ticker: xe,
  updateRoot: fe.updateRoot,
  plugins: ye,
  globalTimeline: Z,
  core: {
    PropTween: ge,
    globals: hi,
    Tween: ne,
    Timeline: fe,
    Animation: Kt,
    getCache: ot,
    _removeLinkedListItem: Or,
    reverting: function() {
      return ce;
    },
    context: function(e) {
      return e && J && (J.data.push(e), e._ctx = J), J;
    },
    suppressOverwrites: function(e) {
      return Cn = e;
    }
  }
};
me("to,from,fromTo,delayedCall,set,killTweensOf", function(s) {
  return Sr[s] = ne[s];
});
xe.add(fe.updateRoot);
bt = Sr.to({}, {
  duration: 0
});
var Ql = function(e, t) {
  for (var r = e._pt; r && r.p !== t && r.op !== t && r.fp !== t; )
    r = r._next;
  return r;
}, Jl = function(e, t) {
  var r = e._targets, n, i, o;
  for (n in t)
    for (i = r.length; i--; )
      o = e._ptLookup[i][n], o && (o = o.d) && (o._pt && (o = Ql(o, n)), o && o.modifier && o.modifier(t[n], e, r[i], n));
}, Wr = function(e, t) {
  return {
    name: e,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(n, i, o) {
      o._onInit = function(a) {
        var l, c;
        if (le(i) && (l = {}, me(i, function(u) {
          return l[u] = 1;
        }), i = l), t) {
          l = {};
          for (c in i)
            l[c] = t(i[c]);
          i = l;
        }
        Jl(a, i);
      };
    }
  };
}, be = Sr.registerPlugin({
  name: "attr",
  init: function(e, t, r, n, i) {
    var o, a, l;
    this.tween = r;
    for (o in t)
      l = e.getAttribute(o) || "", a = this.add(e, "setAttribute", (l || 0) + "", t[o], n, i, 0, 0, o), a.op = o, a.b = l, this._props.push(o);
  },
  render: function(e, t) {
    for (var r = t._pt; r; )
      ce ? r.set(r.t, r.p, r.b, r) : r.r(e, r.d), r = r._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(e, t) {
    for (var r = t.length; r--; )
      this.add(e, r, e[r] || 0, t[r], 0, 0, 0, 0, 0, 1);
  }
}, Wr("roundProps", gn), Wr("modifiers"), Wr("snap", Pi)) || Sr;
ne.version = fe.version = be.version = "3.13.0";
di = 1;
On() && Ct();
B.Power0;
B.Power1;
B.Power2;
B.Power3;
B.Power4;
B.Linear;
B.Quad;
B.Cubic;
B.Quart;
B.Quint;
B.Strong;
B.Elastic;
B.Back;
B.SteppedEase;
B.Bounce;
B.Sine;
B.Expo;
B.Circ;
/*!
 * CSSPlugin 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var gs, Ue, xt, Gn, st, _s, jn, Zl = function() {
  return typeof window < "u";
}, Ge = {}, nt = 180 / Math.PI, vt = Math.PI / 180, gt = Math.atan2, bs = 1e8, Bn = /([A-Z])/g, Kl = /(left|right|width|margin|padding|x)/i, ec = /[\s,\(]\S/, Re = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, yn = function(e, t) {
  return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, tc = function(e, t) {
  return t.set(t.t, t.p, e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, rc = function(e, t) {
  return t.set(t.t, t.p, e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t);
}, nc = function(e, t) {
  var r = t.s + t.c * e;
  t.set(t.t, t.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + t.u, t);
}, Xi = function(e, t) {
  return t.set(t.t, t.p, e ? t.e : t.b, t);
}, qi = function(e, t) {
  return t.set(t.t, t.p, e !== 1 ? t.b : t.e, t);
}, sc = function(e, t, r) {
  return e.style[t] = r;
}, ic = function(e, t, r) {
  return e.style.setProperty(t, r);
}, oc = function(e, t, r) {
  return e._gsap[t] = r;
}, ac = function(e, t, r) {
  return e._gsap.scaleX = e._gsap.scaleY = r;
}, lc = function(e, t, r, n, i) {
  var o = e._gsap;
  o.scaleX = o.scaleY = r, o.renderTransform(i, o);
}, cc = function(e, t, r, n, i) {
  var o = e._gsap;
  o[t] = r, o.renderTransform(i, o);
}, K = "transform", _e = K + "Origin", uc = function s(e, t) {
  var r = this, n = this.target, i = n.style, o = n._gsap;
  if (e in Ge && i) {
    if (this.tfm = this.tfm || {}, e !== "transform")
      e = Re[e] || e, ~e.indexOf(",") ? e.split(",").forEach(function(a) {
        return r.tfm[a] = Fe(n, a);
      }) : this.tfm[e] = o.x ? o[e] : Fe(n, e), e === _e && (this.tfm.zOrigin = o.zOrigin);
    else
      return Re.transform.split(",").forEach(function(a) {
        return s.call(r, a, t);
      });
    if (this.props.indexOf(K) >= 0)
      return;
    o.svg && (this.svgo = n.getAttribute("data-svg-origin"), this.props.push(_e, t, "")), e = K;
  }
  (i || t) && this.props.push(e, t, i[e]);
}, Hi = function(e) {
  e.translate && (e.removeProperty("translate"), e.removeProperty("scale"), e.removeProperty("rotate"));
}, dc = function() {
  var e = this.props, t = this.target, r = t.style, n = t._gsap, i, o;
  for (i = 0; i < e.length; i += 3)
    e[i + 1] ? e[i + 1] === 2 ? t[e[i]](e[i + 2]) : t[e[i]] = e[i + 2] : e[i + 2] ? r[e[i]] = e[i + 2] : r.removeProperty(e[i].substr(0, 2) === "--" ? e[i] : e[i].replace(Bn, "-$1").toLowerCase());
  if (this.tfm) {
    for (o in this.tfm)
      n[o] = this.tfm[o];
    n.svg && (n.renderTransform(), t.setAttribute("data-svg-origin", this.svgo || "")), i = jn(), (!i || !i.isStart) && !r[K] && (Hi(r), n.zOrigin && r[_e] && (r[_e] += " " + n.zOrigin + "px", n.zOrigin = 0, n.renderTransform()), n.uncache = 1);
  }
}, Qi = function(e, t) {
  var r = {
    target: e,
    props: [],
    revert: dc,
    save: uc
  };
  return e._gsap || be.core.getCache(e), t && e.style && e.nodeType && t.split(",").forEach(function(n) {
    return r.save(n);
  }), r;
}, Ji, xn = function(e, t) {
  var r = Ue.createElementNS ? Ue.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : Ue.createElement(e);
  return r && r.style ? r : Ue.createElement(e);
}, Ee = function s(e, t, r) {
  var n = getComputedStyle(e);
  return n[t] || n.getPropertyValue(t.replace(Bn, "-$1").toLowerCase()) || n.getPropertyValue(t) || !r && s(e, Mt(t) || t, 1) || "";
}, ys = "O,Moz,ms,Ms,Webkit".split(","), Mt = function(e, t, r) {
  var n = t || st, i = n.style, o = 5;
  if (e in i && !r)
    return e;
  for (e = e.charAt(0).toUpperCase() + e.substr(1); o-- && !(ys[o] + e in i); )
    ;
  return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? ys[o] : "") + e;
}, vn = function() {
  Zl() && window.document && (gs = window, Ue = gs.document, xt = Ue.documentElement, st = xn("div") || {
    style: {}
  }, xn("div"), K = Mt(K), _e = K + "Origin", st.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Ji = !!Mt("perspective"), jn = be.core.reverting, Gn = 1);
}, xs = function(e) {
  var t = e.ownerSVGElement, r = xn("svg", t && t.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), n = e.cloneNode(!0), i;
  n.style.display = "block", r.appendChild(n), xt.appendChild(r);
  try {
    i = n.getBBox();
  } catch {
  }
  return r.removeChild(n), xt.removeChild(r), i;
}, vs = function(e, t) {
  for (var r = t.length; r--; )
    if (e.hasAttribute(t[r]))
      return e.getAttribute(t[r]);
}, Zi = function(e) {
  var t, r;
  try {
    t = e.getBBox();
  } catch {
    t = xs(e), r = 1;
  }
  return t && (t.width || t.height) || r || (t = xs(e)), t && !t.width && !t.x && !t.y ? {
    x: +vs(e, ["x", "cx", "x1"]) || 0,
    y: +vs(e, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : t;
}, Ki = function(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && Zi(e));
}, dt = function(e, t) {
  if (t) {
    var r = e.style, n;
    t in Ge && t !== _e && (t = K), r.removeProperty ? (n = t.substr(0, 2), (n === "ms" || t.substr(0, 6) === "webkit") && (t = "-" + t), r.removeProperty(n === "--" ? t : t.replace(Bn, "-$1").toLowerCase())) : r.removeAttribute(t);
  }
}, We = function(e, t, r, n, i, o) {
  var a = new ge(e._pt, t, r, 0, 1, o ? qi : Xi);
  return e._pt = a, a.b = n, a.e = i, e._props.push(r), a;
}, ws = {
  deg: 1,
  rad: 1,
  turn: 1
}, fc = {
  grid: 1,
  flex: 1
}, Qe = function s(e, t, r, n) {
  var i = parseFloat(r) || 0, o = (r + "").trim().substr((i + "").length) || "px", a = st.style, l = Kl.test(t), c = e.tagName.toLowerCase() === "svg", u = (c ? "client" : "offset") + (l ? "Width" : "Height"), f = 100, p = n === "px", h = n === "%", m, d, g, x;
  if (n === o || !i || ws[n] || ws[o])
    return i;
  if (o !== "px" && !p && (i = s(e, t, r, "px")), x = e.getCTM && Ki(e), (h || o === "%") && (Ge[t] || ~t.indexOf("adius")))
    return m = x ? e.getBBox()[l ? "width" : "height"] : e[u], re(h ? i / m * f : i / 100 * m);
  if (a[l ? "width" : "height"] = f + (p ? o : n), d = n !== "rem" && ~t.indexOf("adius") || n === "em" && e.appendChild && !c ? e : e.parentNode, x && (d = (e.ownerSVGElement || {}).parentNode), (!d || d === Ue || !d.appendChild) && (d = Ue.body), g = d._gsap, g && h && g.width && l && g.time === xe.time && !g.uncache)
    return re(i / g.width * f);
  if (h && (t === "height" || t === "width")) {
    var b = e.style[t];
    e.style[t] = f + n, m = e[u], b ? e.style[t] = b : dt(e, t);
  } else
    (h || o === "%") && !fc[Ee(d, "display")] && (a.position = Ee(e, "position")), d === e && (a.position = "static"), d.appendChild(st), m = st[u], d.removeChild(st), a.position = "absolute";
  return l && h && (g = ot(d), g.time = xe.time, g.width = d[u]), re(p ? m * i / f : m && i ? f / m * i : 0);
}, Fe = function(e, t, r, n) {
  var i;
  return Gn || vn(), t in Re && t !== "transform" && (t = Re[t], ~t.indexOf(",") && (t = t.split(",")[0])), Ge[t] && t !== "transform" ? (i = tr(e, n), i = t !== "transformOrigin" ? i[t] : i.svg ? i.origin : Cr(Ee(e, _e)) + " " + i.zOrigin + "px") : (i = e.style[t], (!i || i === "auto" || n || ~(i + "").indexOf("calc(")) && (i = Pr[t] && Pr[t](e, t, r) || Ee(e, t) || mi(e, t) || (t === "opacity" ? 1 : 0))), r && !~(i + "").trim().indexOf(" ") ? Qe(e, t, i, r) + r : i;
}, hc = function(e, t, r, n) {
  if (!r || r === "none") {
    var i = Mt(t, e, 1), o = i && Ee(e, i, 1);
    o && o !== r ? (t = i, r = o) : t === "borderColor" && (r = Ee(e, "borderTopColor"));
  }
  var a = new ge(this._pt, e.style, t, 0, 1, Yi), l = 0, c = 0, u, f, p, h, m, d, g, x, b, T, k, v;
  if (a.b = r, a.e = n, r += "", n += "", n.substring(0, 6) === "var(--" && (n = Ee(e, n.substring(4, n.indexOf(")")))), n === "auto" && (d = e.style[t], e.style[t] = n, n = Ee(e, t) || n, d ? e.style[t] = d : dt(e, t)), u = [r, n], $i(u), r = u[0], n = u[1], p = r.match(_t) || [], v = n.match(_t) || [], v.length) {
    for (; f = _t.exec(n); )
      g = f[0], b = n.substring(l, f.index), m ? m = (m + 1) % 5 : (b.substr(-5) === "rgba(" || b.substr(-5) === "hsla(") && (m = 1), g !== (d = p[c++] || "") && (h = parseFloat(d) || 0, k = d.substr((h + "").length), g.charAt(1) === "=" && (g = yt(h, g) + k), x = parseFloat(g), T = g.substr((x + "").length), l = _t.lastIndex - T.length, T || (T = T || we.units[t] || k, l === n.length && (n += T, a.e += T)), k !== T && (h = Qe(e, t, d, T) || 0), a._pt = {
        _next: a._pt,
        p: b || c === 1 ? b : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: h,
        c: x - h,
        m: m && m < 4 || t === "zIndex" ? Math.round : 0
      });
    a.c = l < n.length ? n.substring(l, n.length) : "";
  } else
    a.r = t === "display" && n === "none" ? qi : Xi;
  return ci.test(n) && (a.e = 0), this._pt = a, a;
}, ks = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, pc = function(e) {
  var t = e.split(" "), r = t[0], n = t[1] || "50%";
  return (r === "top" || r === "bottom" || n === "left" || n === "right") && (e = r, r = n, n = e), t[0] = ks[r] || r, t[1] = ks[n] || n, t.join(" ");
}, mc = function(e, t) {
  if (t.tween && t.tween._time === t.tween._dur) {
    var r = t.t, n = r.style, i = t.u, o = r._gsap, a, l, c;
    if (i === "all" || i === !0)
      n.cssText = "", l = 1;
    else
      for (i = i.split(","), c = i.length; --c > -1; )
        a = i[c], Ge[a] && (l = 1, a = a === "transformOrigin" ? _e : K), dt(r, a);
    l && (dt(r, K), o && (o.svg && r.removeAttribute("transform"), n.scale = n.rotate = n.translate = "none", tr(r, 1), o.uncache = 1, Hi(n)));
  }
}, Pr = {
  clearProps: function(e, t, r, n, i) {
    if (i.data !== "isFromStart") {
      var o = e._pt = new ge(e._pt, t, r, 0, 0, mc);
      return o.u = n, o.pr = -10, o.tween = i, e._props.push(r), 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
}, er = [1, 0, 0, 1, 0, 0], eo = {}, to = function(e) {
  return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
}, Ts = function(e) {
  var t = Ee(e, K);
  return to(t) ? er : t.substr(7).match(li).map(re);
}, Yn = function(e, t) {
  var r = e._gsap || ot(e), n = e.style, i = Ts(e), o, a, l, c;
  return r.svg && e.getAttribute("transform") ? (l = e.transform.baseVal.consolidate().matrix, i = [l.a, l.b, l.c, l.d, l.e, l.f], i.join(",") === "1,0,0,1,0,0" ? er : i) : (i === er && !e.offsetParent && e !== xt && !r.svg && (l = n.display, n.display = "block", o = e.parentNode, (!o || !e.offsetParent && !e.getBoundingClientRect().width) && (c = 1, a = e.nextElementSibling, xt.appendChild(e)), i = Ts(e), l ? n.display = l : dt(e, "display"), c && (a ? o.insertBefore(e, a) : o ? o.appendChild(e) : xt.removeChild(e))), t && i.length > 6 ? [i[0], i[1], i[4], i[5], i[12], i[13]] : i);
}, wn = function(e, t, r, n, i, o) {
  var a = e._gsap, l = i || Yn(e, !0), c = a.xOrigin || 0, u = a.yOrigin || 0, f = a.xOffset || 0, p = a.yOffset || 0, h = l[0], m = l[1], d = l[2], g = l[3], x = l[4], b = l[5], T = t.split(" "), k = parseFloat(T[0]) || 0, v = parseFloat(T[1]) || 0, y, _, w, S;
  r ? l !== er && (_ = h * g - m * d) && (w = k * (g / _) + v * (-d / _) + (d * b - g * x) / _, S = k * (-m / _) + v * (h / _) - (h * b - m * x) / _, k = w, v = S) : (y = Zi(e), k = y.x + (~T[0].indexOf("%") ? k / 100 * y.width : k), v = y.y + (~(T[1] || T[0]).indexOf("%") ? v / 100 * y.height : v)), n || n !== !1 && a.smooth ? (x = k - c, b = v - u, a.xOffset = f + (x * h + b * d) - x, a.yOffset = p + (x * m + b * g) - b) : a.xOffset = a.yOffset = 0, a.xOrigin = k, a.yOrigin = v, a.smooth = !!n, a.origin = t, a.originIsAbsolute = !!r, e.style[_e] = "0px 0px", o && (We(o, a, "xOrigin", c, k), We(o, a, "yOrigin", u, v), We(o, a, "xOffset", f, a.xOffset), We(o, a, "yOffset", p, a.yOffset)), e.setAttribute("data-svg-origin", k + " " + v);
}, tr = function(e, t) {
  var r = e._gsap || new Vi(e);
  if ("x" in r && !t && !r.uncache)
    return r;
  var n = e.style, i = r.scaleX < 0, o = "px", a = "deg", l = getComputedStyle(e), c = Ee(e, _e) || "0", u, f, p, h, m, d, g, x, b, T, k, v, y, _, w, S, C, O, M, A, z, R, E, F, P, L, U, oe, W, H, Y, te;
  return u = f = p = d = g = x = b = T = k = 0, h = m = 1, r.svg = !!(e.getCTM && Ki(e)), l.translate && ((l.translate !== "none" || l.scale !== "none" || l.rotate !== "none") && (n[K] = (l.translate !== "none" ? "translate3d(" + (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") + (l.scale !== "none" ? "scale(" + l.scale.split(" ").join(",") + ") " : "") + (l[K] !== "none" ? l[K] : "")), n.scale = n.rotate = n.translate = "none"), _ = Yn(e, r.svg), r.svg && (r.uncache ? (P = e.getBBox(), c = r.xOrigin - P.x + "px " + (r.yOrigin - P.y) + "px", F = "") : F = !t && e.getAttribute("data-svg-origin"), wn(e, F || c, !!F || r.originIsAbsolute, r.smooth !== !1, _)), v = r.xOrigin || 0, y = r.yOrigin || 0, _ !== er && (O = _[0], M = _[1], A = _[2], z = _[3], u = R = _[4], f = E = _[5], _.length === 6 ? (h = Math.sqrt(O * O + M * M), m = Math.sqrt(z * z + A * A), d = O || M ? gt(M, O) * nt : 0, b = A || z ? gt(A, z) * nt + d : 0, b && (m *= Math.abs(Math.cos(b * vt))), r.svg && (u -= v - (v * O + y * A), f -= y - (v * M + y * z))) : (te = _[6], H = _[7], U = _[8], oe = _[9], W = _[10], Y = _[11], u = _[12], f = _[13], p = _[14], w = gt(te, W), g = w * nt, w && (S = Math.cos(-w), C = Math.sin(-w), F = R * S + U * C, P = E * S + oe * C, L = te * S + W * C, U = R * -C + U * S, oe = E * -C + oe * S, W = te * -C + W * S, Y = H * -C + Y * S, R = F, E = P, te = L), w = gt(-A, W), x = w * nt, w && (S = Math.cos(-w), C = Math.sin(-w), F = O * S - U * C, P = M * S - oe * C, L = A * S - W * C, Y = z * C + Y * S, O = F, M = P, A = L), w = gt(M, O), d = w * nt, w && (S = Math.cos(w), C = Math.sin(w), F = O * S + M * C, P = R * S + E * C, M = M * S - O * C, E = E * S - R * C, O = F, R = P), g && Math.abs(g) + Math.abs(d) > 359.9 && (g = d = 0, x = 180 - x), h = re(Math.sqrt(O * O + M * M + A * A)), m = re(Math.sqrt(E * E + te * te)), w = gt(R, E), b = Math.abs(w) > 2e-4 ? w * nt : 0, k = Y ? 1 / (Y < 0 ? -Y : Y) : 0), r.svg && (F = e.getAttribute("transform"), r.forceCSS = e.setAttribute("transform", "") || !to(Ee(e, K)), F && e.setAttribute("transform", F))), Math.abs(b) > 90 && Math.abs(b) < 270 && (i ? (h *= -1, b += d <= 0 ? 180 : -180, d += d <= 0 ? 180 : -180) : (m *= -1, b += b <= 0 ? 180 : -180)), t = t || r.uncache, r.x = u - ((r.xPercent = u && (!t && r.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-u) ? -50 : 0))) ? e.offsetWidth * r.xPercent / 100 : 0) + o, r.y = f - ((r.yPercent = f && (!t && r.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-f) ? -50 : 0))) ? e.offsetHeight * r.yPercent / 100 : 0) + o, r.z = p + o, r.scaleX = re(h), r.scaleY = re(m), r.rotation = re(d) + a, r.rotationX = re(g) + a, r.rotationY = re(x) + a, r.skewX = b + a, r.skewY = T + a, r.transformPerspective = k + o, (r.zOrigin = parseFloat(c.split(" ")[2]) || !t && r.zOrigin || 0) && (n[_e] = Cr(c)), r.xOffset = r.yOffset = 0, r.force3D = we.force3D, r.renderTransform = r.svg ? _c : Ji ? ro : gc, r.uncache = 0, r;
}, Cr = function(e) {
  return (e = e.split(" "))[0] + " " + e[1];
}, Xr = function(e, t, r) {
  var n = ue(t);
  return re(parseFloat(t) + parseFloat(Qe(e, "x", r + "px", n))) + n;
}, gc = function(e, t) {
  t.z = "0px", t.rotationY = t.rotationX = "0deg", t.force3D = 0, ro(e, t);
}, tt = "0deg", Dt = "0px", rt = ") ", ro = function(e, t) {
  var r = t || this, n = r.xPercent, i = r.yPercent, o = r.x, a = r.y, l = r.z, c = r.rotation, u = r.rotationY, f = r.rotationX, p = r.skewX, h = r.skewY, m = r.scaleX, d = r.scaleY, g = r.transformPerspective, x = r.force3D, b = r.target, T = r.zOrigin, k = "", v = x === "auto" && e && e !== 1 || x === !0;
  if (T && (f !== tt || u !== tt)) {
    var y = parseFloat(u) * vt, _ = Math.sin(y), w = Math.cos(y), S;
    y = parseFloat(f) * vt, S = Math.cos(y), o = Xr(b, o, _ * S * -T), a = Xr(b, a, -Math.sin(y) * -T), l = Xr(b, l, w * S * -T + T);
  }
  g !== Dt && (k += "perspective(" + g + rt), (n || i) && (k += "translate(" + n + "%, " + i + "%) "), (v || o !== Dt || a !== Dt || l !== Dt) && (k += l !== Dt || v ? "translate3d(" + o + ", " + a + ", " + l + ") " : "translate(" + o + ", " + a + rt), c !== tt && (k += "rotate(" + c + rt), u !== tt && (k += "rotateY(" + u + rt), f !== tt && (k += "rotateX(" + f + rt), (p !== tt || h !== tt) && (k += "skew(" + p + ", " + h + rt), (m !== 1 || d !== 1) && (k += "scale(" + m + ", " + d + rt), b.style[K] = k || "translate(0, 0)";
}, _c = function(e, t) {
  var r = t || this, n = r.xPercent, i = r.yPercent, o = r.x, a = r.y, l = r.rotation, c = r.skewX, u = r.skewY, f = r.scaleX, p = r.scaleY, h = r.target, m = r.xOrigin, d = r.yOrigin, g = r.xOffset, x = r.yOffset, b = r.forceCSS, T = parseFloat(o), k = parseFloat(a), v, y, _, w, S;
  l = parseFloat(l), c = parseFloat(c), u = parseFloat(u), u && (u = parseFloat(u), c += u, l += u), l || c ? (l *= vt, c *= vt, v = Math.cos(l) * f, y = Math.sin(l) * f, _ = Math.sin(l - c) * -p, w = Math.cos(l - c) * p, c && (u *= vt, S = Math.tan(c - u), S = Math.sqrt(1 + S * S), _ *= S, w *= S, u && (S = Math.tan(u), S = Math.sqrt(1 + S * S), v *= S, y *= S)), v = re(v), y = re(y), _ = re(_), w = re(w)) : (v = f, w = p, y = _ = 0), (T && !~(o + "").indexOf("px") || k && !~(a + "").indexOf("px")) && (T = Qe(h, "x", o, "px"), k = Qe(h, "y", a, "px")), (m || d || g || x) && (T = re(T + m - (m * v + d * _) + g), k = re(k + d - (m * y + d * w) + x)), (n || i) && (S = h.getBBox(), T = re(T + n / 100 * S.width), k = re(k + i / 100 * S.height)), S = "matrix(" + v + "," + y + "," + _ + "," + w + "," + T + "," + k + ")", h.setAttribute("transform", S), b && (h.style[K] = S);
}, bc = function(e, t, r, n, i) {
  var o = 360, a = le(i), l = parseFloat(i) * (a && ~i.indexOf("rad") ? nt : 1), c = l - n, u = n + c + "deg", f, p;
  return a && (f = i.split("_")[1], f === "short" && (c %= o, c !== c % (o / 2) && (c += c < 0 ? o : -o)), f === "cw" && c < 0 ? c = (c + o * bs) % o - ~~(c / o) * o : f === "ccw" && c > 0 && (c = (c - o * bs) % o - ~~(c / o) * o)), e._pt = p = new ge(e._pt, t, r, n, c, tc), p.e = u, p.u = "deg", e._props.push(r), p;
}, Ss = function(e, t) {
  for (var r in t)
    e[r] = t[r];
  return e;
}, yc = function(e, t, r) {
  var n = Ss({}, r._gsap), i = "perspective,force3D,transformOrigin,svgOrigin", o = r.style, a, l, c, u, f, p, h, m;
  n.svg ? (c = r.getAttribute("transform"), r.setAttribute("transform", ""), o[K] = t, a = tr(r, 1), dt(r, K), r.setAttribute("transform", c)) : (c = getComputedStyle(r)[K], o[K] = t, a = tr(r, 1), o[K] = c);
  for (l in Ge)
    c = n[l], u = a[l], c !== u && i.indexOf(l) < 0 && (h = ue(c), m = ue(u), f = h !== m ? Qe(r, l, c, m) : parseFloat(c), p = parseFloat(u), e._pt = new ge(e._pt, a, l, f, p - f, yn), e._pt.u = m || 0, e._props.push(l));
  Ss(a, n);
};
me("padding,margin,Width,Radius", function(s, e) {
  var t = "Top", r = "Right", n = "Bottom", i = "Left", o = (e < 3 ? [t, r, n, i] : [t + i, t + r, n + r, n + i]).map(function(a) {
    return e < 2 ? s + a : "border" + a + s;
  });
  Pr[e > 1 ? "border" + s : s] = function(a, l, c, u, f) {
    var p, h;
    if (arguments.length < 4)
      return p = o.map(function(m) {
        return Fe(a, m, c);
      }), h = p.join(" "), h.split(p[0]).length === 5 ? p[0] : h;
    p = (u + "").split(" "), h = {}, o.forEach(function(m, d) {
      return h[m] = p[d] = p[d] || p[(d - 1) / 2 | 0];
    }), a.init(l, h, f);
  };
});
var no = {
  name: "css",
  register: vn,
  targetTest: function(e) {
    return e.style && e.nodeType;
  },
  init: function(e, t, r, n, i) {
    var o = this._props, a = e.style, l = r.vars.startAt, c, u, f, p, h, m, d, g, x, b, T, k, v, y, _, w;
    Gn || vn(), this.styles = this.styles || Qi(e), w = this.styles.props, this.tween = r;
    for (d in t)
      if (d !== "autoRound" && (u = t[d], !(ye[d] && Fi(d, t, r, n, e, i)))) {
        if (h = typeof u, m = Pr[d], h === "function" && (u = u.call(r, n, e, i), h = typeof u), h === "string" && ~u.indexOf("random(") && (u = Jt(u)), m)
          m(this, e, d, u, r) && (_ = 1);
        else if (d.substr(0, 2) === "--")
          c = (getComputedStyle(e).getPropertyValue(d) + "").trim(), u += "", qe.lastIndex = 0, qe.test(c) || (g = ue(c), x = ue(u)), x ? g !== x && (c = Qe(e, d, c, x) + x) : g && (u += g), this.add(a, "setProperty", c, u, n, i, 0, 0, d), o.push(d), w.push(d, 0, a[d]);
        else if (h !== "undefined") {
          if (l && d in l ? (c = typeof l[d] == "function" ? l[d].call(r, n, e, i) : l[d], le(c) && ~c.indexOf("random(") && (c = Jt(c)), ue(c + "") || c === "auto" || (c += we.units[d] || ue(Fe(e, d)) || ""), (c + "").charAt(1) === "=" && (c = Fe(e, d))) : c = Fe(e, d), p = parseFloat(c), b = h === "string" && u.charAt(1) === "=" && u.substr(0, 2), b && (u = u.substr(2)), f = parseFloat(u), d in Re && (d === "autoAlpha" && (p === 1 && Fe(e, "visibility") === "hidden" && f && (p = 0), w.push("visibility", 0, a.visibility), We(this, a, "visibility", p ? "inherit" : "hidden", f ? "inherit" : "hidden", !f)), d !== "scale" && d !== "transform" && (d = Re[d], ~d.indexOf(",") && (d = d.split(",")[0]))), T = d in Ge, T) {
            if (this.styles.save(d), h === "string" && u.substring(0, 6) === "var(--" && (u = Ee(e, u.substring(4, u.indexOf(")"))), f = parseFloat(u)), k || (v = e._gsap, v.renderTransform && !t.parseTransform || tr(e, t.parseTransform), y = t.smoothOrigin !== !1 && v.smooth, k = this._pt = new ge(this._pt, a, K, 0, 1, v.renderTransform, v, 0, -1), k.dep = 1), d === "scale")
              this._pt = new ge(this._pt, v, "scaleY", v.scaleY, (b ? yt(v.scaleY, b + f) : f) - v.scaleY || 0, yn), this._pt.u = 0, o.push("scaleY", d), d += "X";
            else if (d === "transformOrigin") {
              w.push(_e, 0, a[_e]), u = pc(u), v.svg ? wn(e, u, 0, y, 0, this) : (x = parseFloat(u.split(" ")[2]) || 0, x !== v.zOrigin && We(this, v, "zOrigin", v.zOrigin, x), We(this, a, d, Cr(c), Cr(u)));
              continue;
            } else if (d === "svgOrigin") {
              wn(e, u, 1, y, 0, this);
              continue;
            } else if (d in eo) {
              bc(this, v, d, p, b ? yt(p, b + u) : u);
              continue;
            } else if (d === "smoothOrigin") {
              We(this, v, "smooth", v.smooth, u);
              continue;
            } else if (d === "force3D") {
              v[d] = u;
              continue;
            } else if (d === "transform") {
              yc(this, u, e);
              continue;
            }
          } else d in a || (d = Mt(d) || d);
          if (T || (f || f === 0) && (p || p === 0) && !ec.test(u) && d in a)
            g = (c + "").substr((p + "").length), f || (f = 0), x = ue(u) || (d in we.units ? we.units[d] : g), g !== x && (p = Qe(e, d, c, x)), this._pt = new ge(this._pt, T ? v : a, d, p, (b ? yt(p, b + f) : f) - p, !T && (x === "px" || d === "zIndex") && t.autoRound !== !1 ? nc : yn), this._pt.u = x || 0, g !== x && x !== "%" && (this._pt.b = c, this._pt.r = rc);
          else if (d in a)
            hc.call(this, e, d, c, b ? b + u : u);
          else if (d in e)
            this.add(e, d, c || e[d], b ? b + u : u, n, i);
          else if (d !== "parseTransform") {
            An(d, u);
            continue;
          }
          T || (d in a ? w.push(d, 0, a[d]) : typeof e[d] == "function" ? w.push(d, 2, e[d]()) : w.push(d, 1, c || e[d])), o.push(d);
        }
      }
    _ && Ui(this);
  },
  render: function(e, t) {
    if (t.tween._time || !jn())
      for (var r = t._pt; r; )
        r.r(e, r.d), r = r._next;
    else
      t.styles.revert();
  },
  get: Fe,
  aliases: Re,
  getSetter: function(e, t, r) {
    var n = Re[t];
    return n && n.indexOf(",") < 0 && (t = n), t in Ge && t !== _e && (e._gsap.x || Fe(e, "x")) ? r && _s === r ? t === "scale" ? ac : oc : (_s = r || {}) && (t === "scale" ? lc : cc) : e.style && !Mn(e.style[t]) ? sc : ~t.indexOf("-") ? ic : Fn(e, t);
  },
  core: {
    _removeProperty: dt,
    _getMatrix: Yn
  }
};
be.utils.checkPrefix = Mt;
be.core.getStyleSaver = Qi;
(function(s, e, t, r) {
  var n = me(s + "," + e + "," + t, function(i) {
    Ge[i] = 1;
  });
  me(e, function(i) {
    we.units[i] = "deg", eo[i] = 1;
  }), Re[n[13]] = s + "," + e, me(r, function(i) {
    var o = i.split(":");
    Re[o[1]] = n[o[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
me("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(s) {
  we.units[s] = "px";
});
be.registerPlugin(no);
var br = be.registerPlugin(no) || be;
br.core.Tween;
function Sc(s, e = {}) {
  const t = Ce(!1), r = Ce({ x: 0, y: 0 }), n = Ce({ x: 0, y: 0 });
  let i = {
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    isEnabled: !0
  };
  const o = (h, m) => {
    const d = Date.now(), g = Math.max(1, d - i.lastTime);
    n.value = {
      x: (h - i.lastX) / g * 1e3,
      y: (m - i.lastY) / g * 1e3
    }, i.lastX = h, i.lastY = m, i.lastTime = d;
  }, a = (h) => {
    var d;
    if (!i.isEnabled || !s.value) return;
    h.preventDefault(), t.value = !0;
    const m = s.value.getBoundingClientRect();
    i.startX = h.clientX - m.left, i.startY = h.clientY - m.top, i.lastX = h.clientX, i.lastY = h.clientY, i.lastTime = Date.now(), (d = e.onDragStart) == null || d.call(e), document.addEventListener("mousemove", l), document.addEventListener("mouseup", c);
  }, l = (h) => {
    var b;
    if (!t.value || !s.value) return;
    const m = h.clientX - i.startX, d = h.clientY - i.startY;
    let g = m, x = d;
    if (e.bounds === "body") {
      const T = s.value.getBoundingClientRect();
      g = Math.max(0, Math.min(window.innerWidth - T.width, m)), x = Math.max(0, Math.min(window.innerHeight - T.height, d));
    }
    r.value = { x: g, y: x }, o(h.clientX, h.clientY), br.set(s.value, {
      x: g,
      y: x
    }), (b = e.onDrag) == null || b.call(e, r.value);
  }, c = () => {
    var h;
    if (t.value) {
      if (t.value = !1, e.inertia && s.value) {
        const m = Math.sqrt(n.value.x ** 2 + n.value.y ** 2);
        if (m > 100) {
          const d = Math.min(2, m / 1e3), g = r.value.x + n.value.x * d * 0.3, x = r.value.y + n.value.y * d * 0.3;
          br.to(s.value, {
            x: g,
            y: x,
            duration: d,
            ease: "power2.out",
            onUpdate: () => {
              if (s.value) {
                const b = br.getProperty(s.value, "transform"), T = new DOMMatrix(b);
                r.value = { x: T.e, y: T.f };
              }
            }
          });
        }
      }
      n.value = { x: 0, y: 0 }, (h = e.onDragEnd) == null || h.call(e), document.removeEventListener("mousemove", l), document.removeEventListener("mouseup", c);
    }
  }, u = () => {
    i.isEnabled = !0;
  }, f = () => {
    i.isEnabled = !1, t.value && c();
  }, p = () => {
    f(), s.value && s.value.removeEventListener("mousedown", a);
  };
  return vo(() => {
    s.value && s.value.addEventListener("mousedown", a);
  }), wo(() => {
    p();
  }), {
    isDragging: t,
    position: r,
    velocity: n,
    enable: u,
    disable: f,
    destroy: p
  };
}
export {
  vc as Button,
  kc as FloatingDock,
  wc as buttonVariants,
  sn as cn,
  Tc as useDockStore,
  Sc as useDraggable
};

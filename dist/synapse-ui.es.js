import { Fragment as Js, defineComponent as xr, Comment as Zs, mergeProps as vi, cloneVNode as Ks, h as Cr, createBlock as eo, openBlock as jr, unref as rr, withCtx as to, createElementBlock as xi, createCommentVNode as ro, createElementVNode as wi, normalizeStyle as no, normalizeClass as ki, renderSlot as Br, computed as wr, hasInjectionContext as io, inject as so, getCurrentInstance as oo, ref as Fe, reactive as ao, markRaw as Rt, effectScope as lo, isRef as Bt, isReactive as bn, toRef as Or, toRaw as co, nextTick as Gn, getCurrentScope as uo, onScopeDispose as fo, watch as ho, toRefs as jn, onMounted as po, onUnmounted as mo } from "vue";
function Ti(i) {
  return i ? i.flatMap((e) => e.type === Js ? Ti(e.children) : [e]) : [];
}
const _o = xr({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(i, { attrs: e, slots: t }) {
    return () => {
      var l;
      if (!t.default) return null;
      const r = Ti(t.default()), n = r.findIndex((c) => c.type !== Zs);
      if (n === -1) return r;
      const s = r[n];
      (l = s.props) == null || delete l.ref;
      const o = s.props ? vi(e, s.props) : e, a = Ks({
        ...s,
        props: {}
      }, o);
      return r.length === 1 ? a : (r[n] = a, r);
    };
  }
}), go = [
  "area",
  "img",
  "input"
], bo = xr({
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
  setup(i, { attrs: e, slots: t }) {
    const r = i.asChild ? "template" : i.as;
    return typeof r == "string" && go.includes(r) ? () => Cr(r, e) : r !== "template" ? () => Cr(i.as, e, { default: t.default }) : () => Cr(_o, e, { default: t.default });
  }
});
var Bn = (i) => typeof i == "boolean" ? `${i}` : i === 0 ? "0" : i, fe = (i) => !i || typeof i != "object" || Object.keys(i).length === 0, yo = (i, e) => JSON.stringify(i) === JSON.stringify(e);
function Si(i, e) {
  i.forEach(function(t) {
    Array.isArray(t) ? Si(t, e) : e.push(t);
  });
}
function Pi(i) {
  let e = [];
  return Si(i, e), e;
}
var Ci = (...i) => Pi(i).filter(Boolean), Oi = (i, e) => {
  let t = {}, r = Object.keys(i), n = Object.keys(e);
  for (let s of r) if (n.includes(s)) {
    let o = i[s], a = e[s];
    Array.isArray(o) || Array.isArray(a) ? t[s] = Ci(a, o) : typeof o == "object" && typeof a == "object" ? t[s] = Oi(o, a) : t[s] = a + " " + o;
  } else t[s] = i[s];
  for (let s of n) r.includes(s) || (t[s] = e[s]);
  return t;
}, Un = (i) => !i || typeof i != "string" ? i : i.replace(/\s+/g, " ").trim();
const yn = "-", vo = (i) => {
  const e = wo(i), {
    conflictingClassGroups: t,
    conflictingClassGroupModifiers: r
  } = i;
  return {
    getClassGroupId: (o) => {
      const a = o.split(yn);
      return a[0] === "" && a.length !== 1 && a.shift(), Mi(a, e) || xo(o);
    },
    getConflictingClassGroupIds: (o, a) => {
      const l = t[o] || [];
      return a && r[o] ? [...l, ...r[o]] : l;
    }
  };
}, Mi = (i, e) => {
  var o;
  if (i.length === 0)
    return e.classGroupId;
  const t = i[0], r = e.nextPart.get(t), n = r ? Mi(i.slice(1), r) : void 0;
  if (n)
    return n;
  if (e.validators.length === 0)
    return;
  const s = i.join(yn);
  return (o = e.validators.find(({
    validator: a
  }) => a(s))) == null ? void 0 : o.classGroupId;
}, Yn = /^\[(.+)\]$/, xo = (i) => {
  if (Yn.test(i)) {
    const e = Yn.exec(i)[1], t = e == null ? void 0 : e.substring(0, e.indexOf(":"));
    if (t)
      return "arbitrary.." + t;
  }
}, wo = (i) => {
  const {
    theme: e,
    classGroups: t
  } = i, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const n in t)
    Ur(t[n], r, n, e);
  return r;
}, Ur = (i, e, t, r) => {
  i.forEach((n) => {
    if (typeof n == "string") {
      const s = n === "" ? e : Xn(e, n);
      s.classGroupId = t;
      return;
    }
    if (typeof n == "function") {
      if (ko(n)) {
        Ur(n(r), e, t, r);
        return;
      }
      e.validators.push({
        validator: n,
        classGroupId: t
      });
      return;
    }
    Object.entries(n).forEach(([s, o]) => {
      Ur(o, Xn(e, s), t, r);
    });
  });
}, Xn = (i, e) => {
  let t = i;
  return e.split(yn).forEach((r) => {
    t.nextPart.has(r) || t.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), t = t.nextPart.get(r);
  }), t;
}, ko = (i) => i.isThemeGetter, To = (i) => {
  if (i < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let e = 0, t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const n = (s, o) => {
    t.set(s, o), e++, e > i && (e = 0, r = t, t = /* @__PURE__ */ new Map());
  };
  return {
    get(s) {
      let o = t.get(s);
      if (o !== void 0)
        return o;
      if ((o = r.get(s)) !== void 0)
        return n(s, o), o;
    },
    set(s, o) {
      t.has(s) ? t.set(s, o) : n(s, o);
    }
  };
}, Yr = "!", Xr = ":", So = Xr.length, Po = (i) => {
  const {
    prefix: e,
    experimentalParseClassName: t
  } = i;
  let r = (n) => {
    const s = [];
    let o = 0, a = 0, l = 0, c;
    for (let m = 0; m < n.length; m++) {
      let d = n[m];
      if (o === 0 && a === 0) {
        if (d === Xr) {
          s.push(n.slice(l, m)), l = m + So;
          continue;
        }
        if (d === "/") {
          c = m;
          continue;
        }
      }
      d === "[" ? o++ : d === "]" ? o-- : d === "(" ? a++ : d === ")" && a--;
    }
    const u = s.length === 0 ? n : n.substring(l), f = Co(u), p = f !== u, h = c && c > l ? c - l : void 0;
    return {
      modifiers: s,
      hasImportantModifier: p,
      baseClassName: f,
      maybePostfixModifierPosition: h
    };
  };
  if (e) {
    const n = e + Xr, s = r;
    r = (o) => o.startsWith(n) ? s(o.substring(n.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: o,
      maybePostfixModifierPosition: void 0
    };
  }
  if (t) {
    const n = r;
    r = (s) => t({
      className: s,
      parseClassName: n
    });
  }
  return r;
}, Co = (i) => i.endsWith(Yr) ? i.substring(0, i.length - 1) : i.startsWith(Yr) ? i.substring(1) : i, Oo = (i) => {
  const e = Object.fromEntries(i.orderSensitiveModifiers.map((r) => [r, !0]));
  return (r) => {
    if (r.length <= 1)
      return r;
    const n = [];
    let s = [];
    return r.forEach((o) => {
      o[0] === "[" || e[o] ? (n.push(...s.sort(), o), s = []) : s.push(o);
    }), n.push(...s.sort()), n;
  };
}, Mo = (i) => ({
  cache: To(i.cacheSize),
  parseClassName: Po(i),
  sortModifiers: Oo(i),
  ...vo(i)
}), Eo = /\s+/, Ao = (i, e) => {
  const {
    parseClassName: t,
    getClassGroupId: r,
    getConflictingClassGroupIds: n,
    sortModifiers: s
  } = e, o = [], a = i.trim().split(Eo);
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
    let _ = !!d, x = r(_ ? m.substring(0, d) : m);
    if (!x) {
      if (!_) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (x = r(m), !x) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      _ = !1;
    }
    const y = s(p).join(":"), S = h ? y + Yr : y, P = S + x;
    if (o.includes(P))
      continue;
    o.push(P);
    const w = n(x, _);
    for (let b = 0; b < w.length; ++b) {
      const g = w[b];
      o.push(S + g);
    }
    l = u + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function zo() {
  let i = 0, e, t, r = "";
  for (; i < arguments.length; )
    (e = arguments[i++]) && (t = Ei(e)) && (r && (r += " "), r += t);
  return r;
}
const Ei = (i) => {
  if (typeof i == "string")
    return i;
  let e, t = "";
  for (let r = 0; r < i.length; r++)
    i[r] && (e = Ei(i[r])) && (t && (t += " "), t += e);
  return t;
};
function Wr(i, ...e) {
  let t, r, n, s = o;
  function o(l) {
    const c = e.reduce((u, f) => f(u), i());
    return t = Mo(c), r = t.cache.get, n = t.cache.set, s = a, a(l);
  }
  function a(l) {
    const c = r(l);
    if (c)
      return c;
    const u = Ao(l, t);
    return n(l, u), u;
  }
  return function() {
    return s(zo.apply(null, arguments));
  };
}
const oe = (i) => {
  const e = (t) => t[i] || [];
  return e.isThemeGetter = !0, e;
}, Ai = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, zi = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Ro = /^\d+\/\d+$/, Do = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, No = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Io = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Vo = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Fo = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, dt = (i) => Ro.test(i), G = (i) => !!i && !Number.isNaN(Number(i)), Je = (i) => !!i && Number.isInteger(Number(i)), Wn = (i) => i.endsWith("%") && G(i.slice(0, -1)), Ge = (i) => Do.test(i), $o = () => !0, Lo = (i) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  No.test(i) && !Io.test(i)
), vn = () => !1, Go = (i) => Vo.test(i), jo = (i) => Fo.test(i), Bo = (i) => !I(i) && !V(i), Uo = (i) => Pt(i, Ni, vn), I = (i) => Ai.test(i), Ze = (i) => Pt(i, Ii, Lo), Mr = (i) => Pt(i, ta, G), Yo = (i) => Pt(i, Ri, vn), Xo = (i) => Pt(i, Di, jo), Wo = (i) => Pt(i, vn, Go), V = (i) => zi.test(i), nr = (i) => Ct(i, Ii), qo = (i) => Ct(i, ra), Ho = (i) => Ct(i, Ri), Qo = (i) => Ct(i, Ni), Jo = (i) => Ct(i, Di), Zo = (i) => Ct(i, na, !0), Pt = (i, e, t) => {
  const r = Ai.exec(i);
  return r ? r[1] ? e(r[1]) : t(r[2]) : !1;
}, Ct = (i, e, t = !1) => {
  const r = zi.exec(i);
  return r ? r[1] ? e(r[1]) : t : !1;
}, Ri = (i) => i === "position", Ko = /* @__PURE__ */ new Set(["image", "url"]), Di = (i) => Ko.has(i), ea = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Ni = (i) => ea.has(i), Ii = (i) => i === "length", ta = (i) => i === "number", ra = (i) => i === "family-name", na = (i) => i === "shadow", qr = () => {
  const i = oe("color"), e = oe("font"), t = oe("text"), r = oe("font-weight"), n = oe("tracking"), s = oe("leading"), o = oe("breakpoint"), a = oe("container"), l = oe("spacing"), c = oe("radius"), u = oe("shadow"), f = oe("inset-shadow"), p = oe("drop-shadow"), h = oe("blur"), m = oe("perspective"), d = oe("aspect"), _ = oe("ease"), x = oe("animate"), y = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], S = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], P = () => ["auto", "hidden", "clip", "visible", "scroll"], w = () => ["auto", "contain", "none"], b = () => [V, I, l], g = () => [dt, "full", "auto", ...b()], v = () => [Je, "none", "subgrid", V, I], k = () => ["auto", {
    span: ["full", Je, V, I]
  }, V, I], C = () => [Je, "auto", V, I], M = () => ["auto", "min", "max", "fr", V, I], O = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline"], A = () => ["start", "end", "center", "stretch"], z = () => ["auto", ...b()], R = () => [dt, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...b()], E = () => [i, V, I], F = () => [Wn, Ze], T = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    c,
    V,
    I
  ], $ = () => ["", G, nr, Ze], U = () => ["solid", "dashed", "dotted", "double"], se = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Y = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    h,
    V,
    I
  ], q = () => ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", V, I], B = () => ["none", G, V, I], ee = () => ["none", G, V, I], Re = () => [G, V, I], H = () => [dt, "full", ...b()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Ge],
      breakpoint: [Ge],
      color: [$o],
      container: [Ge],
      "drop-shadow": [Ge],
      ease: ["in", "out", "in-out"],
      font: [Bo],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Ge],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Ge],
      shadow: [Ge],
      spacing: ["px", G],
      text: [Ge],
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
        aspect: ["auto", "square", dt, I, V, d]
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
        columns: [G, I, V, a]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": y()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": y()
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
        object: [...S(), I, V]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: P()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": P()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": P()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: w()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": w()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": w()
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
        inset: g()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": g()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": g()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: g()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: g()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: g()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: g()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: g()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: g()
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
        z: [Je, "auto", V, I]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [dt, "full", "auto", a, ...b()]
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
        flex: [G, dt, "auto", "initial", "none", I]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", G, V, I]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", G, V, I]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Je, "first", "last", "none", V, I]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": v()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: k()
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
        "grid-rows": v()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: k()
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
        "auto-cols": M()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": M()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: b()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": b()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": b()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...O(), "normal"]
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
        content: ["normal", ...O()]
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
        "place-content": O()
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
        p: b()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: b()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: b()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: b()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: b()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: b()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: b()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: b()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: b()
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
        "space-x": b()
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
        "space-y": b()
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
        text: ["base", t, nr, Ze]
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
        font: [r, V, Mr]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Wn, I]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [qo, I, e]
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
        tracking: [n, V, I]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [G, "none", V, Mr]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          s,
          ...b()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", V, I]
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
        list: ["disc", "decimal", "none", V, I]
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
        decoration: [G, "from-font", "auto", V, Ze]
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
        "underline-offset": [G, "auto", V, I]
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
        indent: b()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", V, I]
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
        content: ["none", V, I]
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
        bg: [...S(), Ho, Yo]
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
        bg: ["auto", "cover", "contain", Qo, Uo]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Je, V, I],
          radial: ["", V, I],
          conic: [Je, V, I]
        }, Jo, Xo]
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
        rounded: T()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": T()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": T()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": T()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": T()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": T()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": T()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": T()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": T()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": T()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": T()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": T()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": T()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": T()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": T()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: $()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": $()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": $()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": $()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": $()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": $()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": $()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": $()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": $()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": $()
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
        "divide-y": $()
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
        "outline-offset": [G, V, I]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", G, nr, Ze]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [i]
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
          Zo,
          Wo
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
        "inset-shadow": ["none", V, I, f]
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
        ring: $()
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
        "ring-offset": [G, Ze]
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
        "inset-ring": $()
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
        opacity: [G, V, I]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...se(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": se()
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
          V,
          I
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: Y()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [G, V, I]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [G, V, I]
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
          V,
          I
        ]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", G, V, I]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [G, V, I]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", G, V, I]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [G, V, I]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", G, V, I]
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
          V,
          I
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": Y()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [G, V, I]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [G, V, I]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", G, V, I]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [G, V, I]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", G, V, I]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [G, V, I]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [G, V, I]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", G, V, I]
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
        "border-spacing": b()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": b()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": b()
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", V, I]
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
        duration: [G, "initial", V, I]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", _, V, I]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [G, V, I]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", x, V, I]
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
        perspective: [m, V, I]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": q()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: B()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": B()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": B()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": B()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: ee()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": ee()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": ee()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": ee()
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
        skew: Re()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Re()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Re()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [V, I, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: q()
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
        translate: H()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": H()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": H()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": H()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", V, I]
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
        "scroll-m": b()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": b()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": b()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": b()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": b()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": b()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": b()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": b()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": b()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": b()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": b()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": b()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": b()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": b()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": b()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": b()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": b()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": b()
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
        "will-change": ["auto", "scroll", "contents", "transform", V, I]
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
        stroke: [G, nr, Ze, Mr]
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
}, ia = (i, {
  cacheSize: e,
  prefix: t,
  experimentalParseClassName: r,
  extend: n = {},
  override: s = {}
}) => (Dt(i, "cacheSize", e), Dt(i, "prefix", t), Dt(i, "experimentalParseClassName", r), ir(i.theme, s.theme), ir(i.classGroups, s.classGroups), ir(i.conflictingClassGroups, s.conflictingClassGroups), ir(i.conflictingClassGroupModifiers, s.conflictingClassGroupModifiers), Dt(i, "orderSensitiveModifiers", s.orderSensitiveModifiers), sr(i.theme, n.theme), sr(i.classGroups, n.classGroups), sr(i.conflictingClassGroups, n.conflictingClassGroups), sr(i.conflictingClassGroupModifiers, n.conflictingClassGroupModifiers), Vi(i, n, "orderSensitiveModifiers"), i), Dt = (i, e, t) => {
  t !== void 0 && (i[e] = t);
}, ir = (i, e) => {
  if (e)
    for (const t in e)
      Dt(i, t, e[t]);
}, sr = (i, e) => {
  if (e)
    for (const t in e)
      Vi(i, e, t);
}, Vi = (i, e, t) => {
  const r = e[t];
  r !== void 0 && (i[t] = i[t] ? i[t].concat(r) : r);
}, sa = (i, ...e) => typeof i == "function" ? Wr(qr, i, ...e) : Wr(() => ia(qr(), i), ...e), oa = /* @__PURE__ */ Wr(qr);
var aa = { twMerge: !0, twMergeConfig: {}, responsiveVariants: !1 }, Fi = (i) => i || void 0, Ut = (...i) => Fi(Pi(i).filter(Boolean).join(" ")), Er = null, Ne = {}, Hr = !1, Et = (...i) => (e) => e.twMerge ? ((!Er || Hr) && (Hr = !1, Er = fe(Ne) ? oa : sa({ ...Ne, extend: { theme: Ne.theme, classGroups: Ne.classGroups, conflictingClassGroupModifiers: Ne.conflictingClassGroupModifiers, conflictingClassGroups: Ne.conflictingClassGroups, ...Ne.extend } })), Fi(Er(Ut(i)))) : Ut(i), qn = (i, e) => {
  for (let t in e) i.hasOwnProperty(t) ? i[t] = Ut(i[t], e[t]) : i[t] = e[t];
  return i;
}, la = (i, e) => {
  let { extend: t = null, slots: r = {}, variants: n = {}, compoundVariants: s = [], compoundSlots: o = [], defaultVariants: a = {} } = i, l = { ...aa, ...e }, c = t != null && t.base ? Ut(t.base, i == null ? void 0 : i.base) : i == null ? void 0 : i.base, u = t != null && t.variants && !fe(t.variants) ? Oi(n, t.variants) : n, f = t != null && t.defaultVariants && !fe(t.defaultVariants) ? { ...t.defaultVariants, ...a } : a;
  !fe(l.twMergeConfig) && !yo(l.twMergeConfig, Ne) && (Hr = !0, Ne = l.twMergeConfig);
  let p = fe(t == null ? void 0 : t.slots), h = fe(r) ? {} : { base: Ut(i == null ? void 0 : i.base, p && (t == null ? void 0 : t.base)), ...r }, m = p ? h : qn({ ...t == null ? void 0 : t.slots }, fe(h) ? { base: i == null ? void 0 : i.base } : h), d = fe(t == null ? void 0 : t.compoundVariants) ? s : Ci(t == null ? void 0 : t.compoundVariants, s), _ = (y) => {
    if (fe(u) && fe(r) && p) return Et(c, y == null ? void 0 : y.class, y == null ? void 0 : y.className)(l);
    if (d && !Array.isArray(d)) throw new TypeError(`The "compoundVariants" prop must be an array. Received: ${typeof d}`);
    if (o && !Array.isArray(o)) throw new TypeError(`The "compoundSlots" prop must be an array. Received: ${typeof o}`);
    let S = (O, A, z = [], R) => {
      let E = z;
      if (typeof A == "string") E = E.concat(Un(A).split(" ").map((F) => `${O}:${F}`));
      else if (Array.isArray(A)) E = E.concat(A.reduce((F, T) => F.concat(`${O}:${T}`), []));
      else if (typeof A == "object" && typeof R == "string") {
        for (let F in A) if (A.hasOwnProperty(F) && F === R) {
          let T = A[F];
          if (T && typeof T == "string") {
            let $ = Un(T);
            E[R] ? E[R] = E[R].concat($.split(" ").map((U) => `${O}:${U}`)) : E[R] = $.split(" ").map((U) => `${O}:${U}`);
          } else Array.isArray(T) && T.length > 0 && (E[R] = T.reduce(($, U) => $.concat(`${O}:${U}`), []));
        }
      }
      return E;
    }, P = (O, A = u, z = null, R = null) => {
      var E;
      let F = A[O];
      if (!F || fe(F)) return null;
      let T = (E = R == null ? void 0 : R[O]) != null ? E : y == null ? void 0 : y[O];
      if (T === null) return null;
      let $ = Bn(T), U = Array.isArray(l.responsiveVariants) && l.responsiveVariants.length > 0 || l.responsiveVariants === !0, se = f == null ? void 0 : f[O], Y = [];
      if (typeof $ == "object" && U) for (let [ee, Re] of Object.entries($)) {
        let H = F[Re];
        if (ee === "initial") {
          se = Re;
          continue;
        }
        Array.isArray(l.responsiveVariants) && !l.responsiveVariants.includes(ee) || (Y = S(ee, H, Y, z));
      }
      let q = $ != null && typeof $ != "object" ? $ : Bn(se), B = F[q || "false"];
      return typeof Y == "object" && typeof z == "string" && Y[z] ? qn(Y, B) : Y.length > 0 ? (Y.push(B), z === "base" ? Y.join(" ") : Y) : B;
    }, w = () => u ? Object.keys(u).map((O) => P(O, u)) : null, b = (O, A) => {
      if (!u || typeof u != "object") return null;
      let z = new Array();
      for (let R in u) {
        let E = P(R, u, O, A), F = O === "base" && typeof E == "string" ? E : E && E[O];
        F && (z[z.length] = F);
      }
      return z;
    }, g = {};
    for (let O in y) y[O] !== void 0 && (g[O] = y[O]);
    let v = (O, A) => {
      var z;
      let R = typeof (y == null ? void 0 : y[O]) == "object" ? { [O]: (z = y[O]) == null ? void 0 : z.initial } : {};
      return { ...f, ...g, ...R, ...A };
    }, k = (O = [], A) => {
      let z = [];
      for (let { class: R, className: E, ...F } of O) {
        let T = !0;
        for (let [$, U] of Object.entries(F)) {
          let se = v($, A)[$];
          if (Array.isArray(U)) {
            if (!U.includes(se)) {
              T = !1;
              break;
            }
          } else {
            let Y = (q) => q == null || q === !1;
            if (Y(U) && Y(se)) continue;
            if (se !== U) {
              T = !1;
              break;
            }
          }
        }
        T && (R && z.push(R), E && z.push(E));
      }
      return z;
    }, C = (O) => {
      let A = k(d, O);
      if (!Array.isArray(A)) return A;
      let z = {};
      for (let R of A) if (typeof R == "string" && (z.base = Et(z.base, R)(l)), typeof R == "object") for (let [E, F] of Object.entries(R)) z[E] = Et(z[E], F)(l);
      return z;
    }, M = (O) => {
      if (o.length < 1) return null;
      let A = {};
      for (let { slots: z = [], class: R, className: E, ...F } of o) {
        if (!fe(F)) {
          let T = !0;
          for (let $ of Object.keys(F)) {
            let U = v($, O)[$];
            if (U === void 0 || (Array.isArray(F[$]) ? !F[$].includes(U) : F[$] !== U)) {
              T = !1;
              break;
            }
          }
          if (!T) continue;
        }
        for (let T of z) A[T] = A[T] || [], A[T].push([R, E]);
      }
      return A;
    };
    if (!fe(r) || !p) {
      let O = {};
      if (typeof m == "object" && !fe(m)) for (let A of Object.keys(m)) O[A] = (z) => {
        var R, E;
        return Et(m[A], b(A, z), ((R = C(z)) != null ? R : [])[A], ((E = M(z)) != null ? E : [])[A], z == null ? void 0 : z.class, z == null ? void 0 : z.className)(l);
      };
      return O;
    }
    return Et(c, w(), k(d), y == null ? void 0 : y.class, y == null ? void 0 : y.className)(l);
  }, x = () => {
    if (!(!u || typeof u != "object")) return Object.keys(u);
  };
  return _.variantKeys = x(), _.extend = t, _.base = c, _.slots = m, _.variants = u, _.defaultVariants = f, _.compoundSlots = o, _.compoundVariants = d, _;
};
const ca = la({
  base: [
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium",
    "ring-offset-background transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50"
  ],
  variants: {
    variant: {
      // Solid variants
      neutral: "bg-gray-900 text-white hover:bg-gray-800",
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200",
      accent: "bg-purple-600 text-white hover:bg-purple-700",
      info: "bg-cyan-600 text-white hover:bg-cyan-700",
      success: "bg-green-600 text-white hover:bg-green-700",
      warning: "bg-amber-500 text-white hover:bg-amber-600",
      error: "bg-red-600 text-white hover:bg-red-700",
      // Outline variants
      outline: "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700",
      "outline-primary": "border border-blue-600 bg-transparent hover:bg-blue-50 text-blue-600",
      "outline-success": "border border-green-600 bg-transparent hover:bg-green-50 text-green-600",
      "outline-error": "border border-red-600 bg-transparent hover:bg-red-50 text-red-600",
      // Ghost variants - more visible
      ghost: "bg-transparent hover:bg-gray-100 text-gray-700 border border-transparent hover:border-gray-200",
      "ghost-primary": "bg-transparent hover:bg-blue-50 text-blue-600 border border-transparent hover:border-blue-200",
      link: "bg-transparent hover:underline text-blue-600 underline-offset-4 border-none shadow-none h-auto p-2"
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
});
function $i(i) {
  var e, t, r = "";
  if (typeof i == "string" || typeof i == "number") r += i;
  else if (typeof i == "object") if (Array.isArray(i)) {
    var n = i.length;
    for (e = 0; e < n; e++) i[e] && (t = $i(i[e])) && (r && (r += " "), r += t);
  } else for (t in i) i[t] && (r && (r += " "), r += t);
  return r;
}
function ua() {
  for (var i, e, t = 0, r = "", n = arguments.length; t < n; t++) (i = arguments[t]) && (e = $i(i)) && (r && (r += " "), r += e);
  return r;
}
const xn = "-", da = (i) => {
  const e = ha(i), {
    conflictingClassGroups: t,
    conflictingClassGroupModifiers: r
  } = i;
  return {
    getClassGroupId: (o) => {
      const a = o.split(xn);
      return a[0] === "" && a.length !== 1 && a.shift(), Li(a, e) || fa(o);
    },
    getConflictingClassGroupIds: (o, a) => {
      const l = t[o] || [];
      return a && r[o] ? [...l, ...r[o]] : l;
    }
  };
}, Li = (i, e) => {
  var o;
  if (i.length === 0)
    return e.classGroupId;
  const t = i[0], r = e.nextPart.get(t), n = r ? Li(i.slice(1), r) : void 0;
  if (n)
    return n;
  if (e.validators.length === 0)
    return;
  const s = i.join(xn);
  return (o = e.validators.find(({
    validator: a
  }) => a(s))) == null ? void 0 : o.classGroupId;
}, Hn = /^\[(.+)\]$/, fa = (i) => {
  if (Hn.test(i)) {
    const e = Hn.exec(i)[1], t = e == null ? void 0 : e.substring(0, e.indexOf(":"));
    if (t)
      return "arbitrary.." + t;
  }
}, ha = (i) => {
  const {
    theme: e,
    classGroups: t
  } = i, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const n in t)
    Qr(t[n], r, n, e);
  return r;
}, Qr = (i, e, t, r) => {
  i.forEach((n) => {
    if (typeof n == "string") {
      const s = n === "" ? e : Qn(e, n);
      s.classGroupId = t;
      return;
    }
    if (typeof n == "function") {
      if (pa(n)) {
        Qr(n(r), e, t, r);
        return;
      }
      e.validators.push({
        validator: n,
        classGroupId: t
      });
      return;
    }
    Object.entries(n).forEach(([s, o]) => {
      Qr(o, Qn(e, s), t, r);
    });
  });
}, Qn = (i, e) => {
  let t = i;
  return e.split(xn).forEach((r) => {
    t.nextPart.has(r) || t.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), t = t.nextPart.get(r);
  }), t;
}, pa = (i) => i.isThemeGetter, ma = (i) => {
  if (i < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let e = 0, t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const n = (s, o) => {
    t.set(s, o), e++, e > i && (e = 0, r = t, t = /* @__PURE__ */ new Map());
  };
  return {
    get(s) {
      let o = t.get(s);
      if (o !== void 0)
        return o;
      if ((o = r.get(s)) !== void 0)
        return n(s, o), o;
    },
    set(s, o) {
      t.has(s) ? t.set(s, o) : n(s, o);
    }
  };
}, Jr = "!", Zr = ":", _a = Zr.length, ga = (i) => {
  const {
    prefix: e,
    experimentalParseClassName: t
  } = i;
  let r = (n) => {
    const s = [];
    let o = 0, a = 0, l = 0, c;
    for (let m = 0; m < n.length; m++) {
      let d = n[m];
      if (o === 0 && a === 0) {
        if (d === Zr) {
          s.push(n.slice(l, m)), l = m + _a;
          continue;
        }
        if (d === "/") {
          c = m;
          continue;
        }
      }
      d === "[" ? o++ : d === "]" ? o-- : d === "(" ? a++ : d === ")" && a--;
    }
    const u = s.length === 0 ? n : n.substring(l), f = ba(u), p = f !== u, h = c && c > l ? c - l : void 0;
    return {
      modifiers: s,
      hasImportantModifier: p,
      baseClassName: f,
      maybePostfixModifierPosition: h
    };
  };
  if (e) {
    const n = e + Zr, s = r;
    r = (o) => o.startsWith(n) ? s(o.substring(n.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: o,
      maybePostfixModifierPosition: void 0
    };
  }
  if (t) {
    const n = r;
    r = (s) => t({
      className: s,
      parseClassName: n
    });
  }
  return r;
}, ba = (i) => i.endsWith(Jr) ? i.substring(0, i.length - 1) : i.startsWith(Jr) ? i.substring(1) : i, ya = (i) => {
  const e = Object.fromEntries(i.orderSensitiveModifiers.map((r) => [r, !0]));
  return (r) => {
    if (r.length <= 1)
      return r;
    const n = [];
    let s = [];
    return r.forEach((o) => {
      o[0] === "[" || e[o] ? (n.push(...s.sort(), o), s = []) : s.push(o);
    }), n.push(...s.sort()), n;
  };
}, va = (i) => ({
  cache: ma(i.cacheSize),
  parseClassName: ga(i),
  sortModifiers: ya(i),
  ...da(i)
}), xa = /\s+/, wa = (i, e) => {
  const {
    parseClassName: t,
    getClassGroupId: r,
    getConflictingClassGroupIds: n,
    sortModifiers: s
  } = e, o = [], a = i.trim().split(xa);
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
    let _ = !!d, x = r(_ ? m.substring(0, d) : m);
    if (!x) {
      if (!_) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (x = r(m), !x) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      _ = !1;
    }
    const y = s(p).join(":"), S = h ? y + Jr : y, P = S + x;
    if (o.includes(P))
      continue;
    o.push(P);
    const w = n(x, _);
    for (let b = 0; b < w.length; ++b) {
      const g = w[b];
      o.push(S + g);
    }
    l = u + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function ka() {
  let i = 0, e, t, r = "";
  for (; i < arguments.length; )
    (e = arguments[i++]) && (t = Gi(e)) && (r && (r += " "), r += t);
  return r;
}
const Gi = (i) => {
  if (typeof i == "string")
    return i;
  let e, t = "";
  for (let r = 0; r < i.length; r++)
    i[r] && (e = Gi(i[r])) && (t && (t += " "), t += e);
  return t;
};
function Ta(i, ...e) {
  let t, r, n, s = o;
  function o(l) {
    const c = e.reduce((u, f) => f(u), i());
    return t = va(c), r = t.cache.get, n = t.cache.set, s = a, a(l);
  }
  function a(l) {
    const c = r(l);
    if (c)
      return c;
    const u = wa(l, t);
    return n(l, u), u;
  }
  return function() {
    return s(ka.apply(null, arguments));
  };
}
const ie = (i) => {
  const e = (t) => t[i] || [];
  return e.isThemeGetter = !0, e;
}, ji = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Bi = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Sa = /^\d+\/\d+$/, Pa = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Ca = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Oa = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Ma = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Ea = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ft = (i) => Sa.test(i), L = (i) => !!i && !Number.isNaN(Number(i)), je = (i) => !!i && Number.isInteger(Number(i)), Ar = (i) => i.endsWith("%") && L(i.slice(0, -1)), De = (i) => Pa.test(i), Aa = () => !0, za = (i) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Ca.test(i) && !Oa.test(i)
), Ui = () => !1, Ra = (i) => Ma.test(i), Da = (i) => Ea.test(i), Na = (i) => !D(i) && !N(i), Ia = (i) => Ot(i, Wi, Ui), D = (i) => ji.test(i), Ke = (i) => Ot(i, qi, za), zr = (i) => Ot(i, Ga, L), Jn = (i) => Ot(i, Yi, Ui), Va = (i) => Ot(i, Xi, Da), or = (i) => Ot(i, Hi, Ra), N = (i) => Bi.test(i), At = (i) => Mt(i, qi), Fa = (i) => Mt(i, ja), Zn = (i) => Mt(i, Yi), $a = (i) => Mt(i, Wi), La = (i) => Mt(i, Xi), ar = (i) => Mt(i, Hi, !0), Ot = (i, e, t) => {
  const r = ji.exec(i);
  return r ? r[1] ? e(r[1]) : t(r[2]) : !1;
}, Mt = (i, e, t = !1) => {
  const r = Bi.exec(i);
  return r ? r[1] ? e(r[1]) : t : !1;
}, Yi = (i) => i === "position" || i === "percentage", Xi = (i) => i === "image" || i === "url", Wi = (i) => i === "length" || i === "size" || i === "bg-size", qi = (i) => i === "length", Ga = (i) => i === "number", ja = (i) => i === "family-name", Hi = (i) => i === "shadow", Ba = () => {
  const i = ie("color"), e = ie("font"), t = ie("text"), r = ie("font-weight"), n = ie("tracking"), s = ie("leading"), o = ie("breakpoint"), a = ie("container"), l = ie("spacing"), c = ie("radius"), u = ie("shadow"), f = ie("inset-shadow"), p = ie("text-shadow"), h = ie("drop-shadow"), m = ie("blur"), d = ie("perspective"), _ = ie("aspect"), x = ie("ease"), y = ie("animate"), S = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], P = () => [
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
  ], w = () => [...P(), N, D], b = () => ["auto", "hidden", "clip", "visible", "scroll"], g = () => ["auto", "contain", "none"], v = () => [N, D, l], k = () => [ft, "full", "auto", ...v()], C = () => [je, "none", "subgrid", N, D], M = () => ["auto", {
    span: ["full", je, N, D]
  }, je, N, D], O = () => [je, "auto", N, D], A = () => ["auto", "min", "max", "fr", N, D], z = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], R = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], E = () => ["auto", ...v()], F = () => [ft, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...v()], T = () => [i, N, D], $ = () => [...P(), Zn, Jn, {
    position: [N, D]
  }], U = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], se = () => ["auto", "cover", "contain", $a, Ia, {
    size: [N, D]
  }], Y = () => [Ar, At, Ke], q = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    c,
    N,
    D
  ], B = () => ["", L, At, Ke], ee = () => ["solid", "dashed", "dotted", "double"], Re = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], H = () => [L, Ar, Zn, Jn], Ln = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    m,
    N,
    D
  ], Kt = () => ["none", L, N, D], er = () => ["none", L, N, D], Pr = () => [L, N, D], tr = () => [ft, "full", ...v()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [De],
      breakpoint: [De],
      color: [Aa],
      container: [De],
      "drop-shadow": [De],
      ease: ["in", "out", "in-out"],
      font: [Na],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [De],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [De],
      shadow: [De],
      spacing: ["px", L],
      text: [De],
      "text-shadow": [De],
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
        aspect: ["auto", "square", ft, D, N, _]
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
        columns: [L, D, N, a]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": S()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": S()
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
        object: w()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: b()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": b()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": b()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: g()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": g()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": g()
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
        inset: k()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": k()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": k()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: k()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: k()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: k()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: k()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: k()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: k()
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
        z: [je, "auto", N, D]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [ft, "full", "auto", a, ...v()]
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
        flex: [L, ft, "auto", "initial", "none", D]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", L, N, D]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", L, N, D]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [je, "first", "last", "none", N, D]
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
        col: M()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": O()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": O()
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
        row: M()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": O()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": O()
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
        gap: v()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": v()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": v()
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
        p: v()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: v()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: v()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: v()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: v()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: v()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: v()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: v()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: v()
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
        "space-x": v()
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
        "space-y": v()
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
        text: ["base", t, At, Ke]
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
        font: [r, N, zr]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Ar, D]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Fa, D, e]
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
        tracking: [n, N, D]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [L, "none", N, zr]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          s,
          ...v()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", N, D]
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
        list: ["disc", "decimal", "none", N, D]
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
        placeholder: T()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: T()
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
        decoration: [...ee(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [L, "from-font", "auto", N, Ke]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: T()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [L, "auto", N, D]
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
        indent: v()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", N, D]
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
        content: ["none", N, D]
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
        bg: $()
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
        bg: se()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, je, N, D],
          radial: ["", N, D],
          conic: [je, N, D]
        }, La, Va]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: T()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: Y()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: Y()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: Y()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: T()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: T()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: T()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: q()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": q()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": q()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": q()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": q()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": q()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": q()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": q()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": q()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": q()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": q()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": q()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": q()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": q()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": q()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: B()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": B()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": B()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": B()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": B()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": B()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": B()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": B()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": B()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": B()
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
        "divide-y": B()
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
        border: [...ee(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...ee(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: T()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": T()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": T()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": T()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": T()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": T()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": T()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": T()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": T()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: T()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...ee(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [L, N, D]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", L, At, Ke]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: T()
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
          ar,
          or
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: T()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", f, ar, or]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": T()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: B()
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
        ring: T()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [L, Ke]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": T()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": B()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": T()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", p, ar, or]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": T()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [L, N, D]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...Re(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Re()
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
        "mask-linear": [L]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": H()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": H()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": T()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": T()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": H()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": H()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": T()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": T()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": H()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": H()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": T()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": T()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": H()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": H()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": T()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": T()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": H()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": H()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": T()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": T()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": H()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": H()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": T()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": T()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": H()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": H()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": T()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": T()
      }],
      "mask-image-radial": [{
        "mask-radial": [N, D]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": H()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": H()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": T()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": T()
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
        "mask-radial-at": P()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [L]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": H()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": H()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": T()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": T()
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
        mask: $()
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
        mask: se()
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
        mask: ["none", N, D]
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
          N,
          D
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: Ln()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [L, N, D]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [L, N, D]
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
          ar,
          or
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": T()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", L, N, D]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [L, N, D]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", L, N, D]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [L, N, D]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", L, N, D]
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
          N,
          D
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": Ln()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [L, N, D]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [L, N, D]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", L, N, D]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [L, N, D]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", L, N, D]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [L, N, D]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [L, N, D]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", L, N, D]
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
        "border-spacing": v()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": v()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": v()
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", N, D]
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
        duration: [L, "initial", N, D]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", x, N, D]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [L, N, D]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", y, N, D]
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
        perspective: [d, N, D]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": w()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: Kt()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": Kt()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": Kt()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": Kt()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: er()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": er()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": er()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": er()
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
        skew: Pr()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Pr()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Pr()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [N, D, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: w()
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
        translate: tr()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": tr()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": tr()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": tr()
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
        accent: T()
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
        caret: T()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", N, D]
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
        "scroll-m": v()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": v()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": v()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": v()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": v()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": v()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": v()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": v()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": v()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": v()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": v()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": v()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": v()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": v()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": v()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": v()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": v()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": v()
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
        "will-change": ["auto", "scroll", "contents", "transform", N, D]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...T()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [L, At, Ke, zr]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...T()]
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
}, Ua = /* @__PURE__ */ Ta(Ba);
function Kr(...i) {
  return Ua(ua(i));
}
const Ya = /* @__PURE__ */ xr({
  __name: "Button",
  props: {
    variant: { default: "neutral" },
    size: { default: "md" },
    as: { default: "button" },
    asChild: { type: Boolean, default: !1 },
    type: { default: "button" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["click"],
  setup(i, { emit: e }) {
    const t = i, r = e, n = () => ({
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
    })[t.size] || 16, s = (o) => {
      t.disabled || t.loading || r("click", o);
    };
    return (o, a) => (jr(), eo(rr(bo), vi({
      as: o.as,
      asChild: o.asChild,
      class: rr(Kr)(rr(ca)({ variant: o.variant, size: o.size }), o.$attrs.class),
      "data-state": o.loading ? "loading" : "idle",
      disabled: o.disabled || o.loading,
      type: o.type
    }, o.$attrs, { onClick: s }), {
      default: to(() => [
        o.loading ? (jr(), xi("span", {
          key: 0,
          class: "loading-spinner",
          style: no({ width: `${n()}px`, height: `${n()}px` })
        }, null, 4)) : ro("", !0),
        wi("span", {
          class: ki(rr(Kr)("button-content", o.loading && "button-content-loading"))
        }, [
          Br(o.$slots, "default", {}, void 0, !0)
        ], 2)
      ]),
      _: 3
    }, 16, ["as", "asChild", "class", "data-state", "disabled", "type"]));
  }
}), Xa = (i, e) => {
  const t = i.__vccOpts || i;
  for (const [r, n] of e)
    t[r] = n;
  return t;
}, pc = /* @__PURE__ */ Xa(Ya, [["__scopeId", "data-v-4661f354"]]), Wa = { class: "flex items-center gap-2" }, mc = /* @__PURE__ */ xr({
  __name: "FloatingDock",
  props: {
    variant: { default: "default" },
    size: { default: "md" },
    position: { default: "bottom" },
    className: {}
  },
  setup(i) {
    const e = i, t = wr(() => Kr(
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
    return (r, n) => (jr(), xi("div", {
      class: ki(t.value)
    }, [
      wi("div", Wa, [
        Br(r.$slots, "icon"),
        Br(r.$slots, "default")
      ])
    ], 2));
  }
});
/*!
 * pinia v3.0.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let Nt;
const hr = (i) => Nt = i, qa = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function lt(i) {
  return i && typeof i == "object" && Object.prototype.toString.call(i) === "[object Object]" && typeof i.toJSON != "function";
}
var $t;
(function(i) {
  i.direct = "direct", i.patchObject = "patch object", i.patchFunction = "patch function";
})($t || ($t = {}));
const It = typeof window < "u";
function Qi(i, e) {
  for (const t in e) {
    const r = e[t];
    if (!(t in i))
      continue;
    const n = i[t];
    lt(n) && lt(r) && !Bt(r) && !bn(r) ? i[t] = Qi(n, r) : i[t] = r;
  }
  return i;
}
const Ji = () => {
};
function Kn(i, e, t, r = Ji) {
  i.push(e);
  const n = () => {
    const s = i.indexOf(e);
    s > -1 && (i.splice(s, 1), r());
  };
  return !t && uo() && fo(n), n;
}
function ht(i, ...e) {
  i.slice().forEach((t) => {
    t(...e);
  });
}
const Ha = (i) => i(), ei = Symbol(), Rr = Symbol();
function en(i, e) {
  i instanceof Map && e instanceof Map ? e.forEach((t, r) => i.set(r, t)) : i instanceof Set && e instanceof Set && e.forEach(i.add, i);
  for (const t in e) {
    if (!e.hasOwnProperty(t))
      continue;
    const r = e[t], n = i[t];
    lt(n) && lt(r) && i.hasOwnProperty(t) && !Bt(r) && !bn(r) ? i[t] = en(n, r) : i[t] = r;
  }
  return i;
}
const Qa = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function Ja(i) {
  return !lt(i) || !Object.prototype.hasOwnProperty.call(i, Qa);
}
const { assign: Te } = Object;
function ti(i) {
  return !!(Bt(i) && i.effect);
}
function ri(i, e, t, r) {
  const { state: n, actions: s, getters: o } = e, a = t.state.value[i];
  let l;
  function c() {
    !a && (process.env.NODE_ENV === "production" || !r) && (t.state.value[i] = n ? n() : {});
    const u = process.env.NODE_ENV !== "production" && r ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      jn(Fe(n ? n() : {}).value)
    ) : jn(t.state.value[i]);
    return Te(u, s, Object.keys(o || {}).reduce((f, p) => (process.env.NODE_ENV !== "production" && p in u && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${p}" in store "${i}".`), f[p] = Rt(wr(() => {
      hr(t);
      const h = t._s.get(i);
      return o[p].call(h, h);
    })), f), {}));
  }
  return l = tn(i, c, e, t, r, !0), l;
}
function tn(i, e, t = {}, r, n, s) {
  let o;
  const a = Te({ actions: {} }, t);
  if (process.env.NODE_ENV !== "production" && !r._e.active)
    throw new Error("Pinia destroyed");
  const l = { deep: !0 };
  process.env.NODE_ENV !== "production" && (l.onTrigger = (C) => {
    c ? h = C : c == !1 && !g._hotUpdating && (Array.isArray(h) ? h.push(C) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let c, u, f = [], p = [], h;
  const m = r.state.value[i];
  !s && !m && (process.env.NODE_ENV === "production" || !n) && (r.state.value[i] = {});
  const d = Fe({});
  let _;
  function x(C) {
    let M;
    c = u = !1, process.env.NODE_ENV !== "production" && (h = []), typeof C == "function" ? (C(r.state.value[i]), M = {
      type: $t.patchFunction,
      storeId: i,
      events: h
    }) : (en(r.state.value[i], C), M = {
      type: $t.patchObject,
      payload: C,
      storeId: i,
      events: h
    });
    const O = _ = Symbol();
    Gn().then(() => {
      _ === O && (c = !0);
    }), u = !0, ht(f, M, r.state.value[i]);
  }
  const y = s ? function() {
    const { state: M } = t, O = M ? M() : {};
    this.$patch((A) => {
      Te(A, O);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${i}" is built using the setup syntax and does not implement $reset().`);
    } : Ji
  );
  function S() {
    o.stop(), f = [], p = [], r._s.delete(i);
  }
  const P = (C, M = "") => {
    if (ei in C)
      return C[Rr] = M, C;
    const O = function() {
      hr(r);
      const A = Array.from(arguments), z = [], R = [];
      function E($) {
        z.push($);
      }
      function F($) {
        R.push($);
      }
      ht(p, {
        args: A,
        name: O[Rr],
        store: g,
        after: E,
        onError: F
      });
      let T;
      try {
        T = C.apply(this && this.$id === i ? this : g, A);
      } catch ($) {
        throw ht(R, $), $;
      }
      return T instanceof Promise ? T.then(($) => (ht(z, $), $)).catch(($) => (ht(R, $), Promise.reject($))) : (ht(z, T), T);
    };
    return O[ei] = !0, O[Rr] = M, O;
  }, w = /* @__PURE__ */ Rt({
    actions: {},
    getters: {},
    state: [],
    hotState: d
  }), b = {
    _p: r,
    // _s: scope,
    $id: i,
    $onAction: Kn.bind(null, p),
    $patch: x,
    $reset: y,
    $subscribe(C, M = {}) {
      const O = Kn(f, C, M.detached, () => A()), A = o.run(() => ho(() => r.state.value[i], (z) => {
        (M.flush === "sync" ? u : c) && C({
          storeId: i,
          type: $t.direct,
          events: h
        }, z);
      }, Te({}, l, M)));
      return O;
    },
    $dispose: S
  }, g = ao(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && It ? Te(
    {
      _hmrPayload: w,
      _customProperties: Rt(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    b
    // must be added later
    // setupStore
  ) : b);
  r._s.set(i, g);
  const k = (r._a && r._a.runWithContext || Ha)(() => r._e.run(() => (o = lo()).run(() => e({ action: P }))));
  for (const C in k) {
    const M = k[C];
    if (Bt(M) && !ti(M) || bn(M))
      process.env.NODE_ENV !== "production" && n ? d.value[C] = Or(k, C) : s || (m && Ja(M) && (Bt(M) ? M.value = m[C] : en(M, m[C])), r.state.value[i][C] = M), process.env.NODE_ENV !== "production" && w.state.push(C);
    else if (typeof M == "function") {
      const O = process.env.NODE_ENV !== "production" && n ? M : P(M, C);
      k[C] = O, process.env.NODE_ENV !== "production" && (w.actions[C] = M), a.actions[C] = M;
    } else process.env.NODE_ENV !== "production" && ti(M) && (w.getters[C] = s ? (
      // @ts-expect-error
      t.getters[C]
    ) : M, It && (k._getters || // @ts-expect-error: same
    (k._getters = Rt([]))).push(C));
  }
  if (Te(g, k), Te(co(g), k), Object.defineProperty(g, "$state", {
    get: () => process.env.NODE_ENV !== "production" && n ? d.value : r.state.value[i],
    set: (C) => {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error("cannot set hotState");
      x((M) => {
        Te(M, C);
      });
    }
  }), process.env.NODE_ENV !== "production" && (g._hotUpdate = Rt((C) => {
    g._hotUpdating = !0, C._hmrPayload.state.forEach((M) => {
      if (M in g.$state) {
        const O = C.$state[M], A = g.$state[M];
        typeof O == "object" && lt(O) && lt(A) ? Qi(O, A) : C.$state[M] = A;
      }
      g[M] = Or(C.$state, M);
    }), Object.keys(g.$state).forEach((M) => {
      M in C.$state || delete g[M];
    }), c = !1, u = !1, r.state.value[i] = Or(C._hmrPayload, "hotState"), u = !0, Gn().then(() => {
      c = !0;
    });
    for (const M in C._hmrPayload.actions) {
      const O = C[M];
      g[M] = //
      P(O, M);
    }
    for (const M in C._hmrPayload.getters) {
      const O = C._hmrPayload.getters[M], A = s ? (
        // special handling of options api
        wr(() => (hr(r), O.call(g, g)))
      ) : O;
      g[M] = //
      A;
    }
    Object.keys(g._hmrPayload.getters).forEach((M) => {
      M in C._hmrPayload.getters || delete g[M];
    }), Object.keys(g._hmrPayload.actions).forEach((M) => {
      M in C._hmrPayload.actions || delete g[M];
    }), g._hmrPayload = C._hmrPayload, g._getters = C._getters, g._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && It) {
    const C = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((M) => {
      Object.defineProperty(g, M, Te({ value: g[M] }, C));
    });
  }
  return r._p.forEach((C) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && It) {
      const M = o.run(() => C({
        store: g,
        app: r._a,
        pinia: r,
        options: a
      }));
      Object.keys(M || {}).forEach((O) => g._customProperties.add(O)), Te(g, M);
    } else
      Te(g, o.run(() => C({
        store: g,
        app: r._a,
        pinia: r,
        options: a
      })));
  }), process.env.NODE_ENV !== "production" && g.$state && typeof g.$state == "object" && typeof g.$state.constructor == "function" && !g.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${g.$id}".`), m && s && t.hydrate && t.hydrate(g.$state, m), c = !0, u = !0, g;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Za(i, e, t) {
  let r;
  const n = typeof e == "function";
  r = n ? t : e;
  function s(o, a) {
    const l = io();
    if (o = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && Nt && Nt._testing ? null : o) || (l ? so(qa, null) : null), o && hr(o), process.env.NODE_ENV !== "production" && !Nt)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    o = Nt, o._s.has(i) || (n ? tn(i, e, r, o) : ri(i, r, o), process.env.NODE_ENV !== "production" && (s._pinia = o));
    const c = o._s.get(i);
    if (process.env.NODE_ENV !== "production" && a) {
      const u = "__hot:" + i, f = n ? tn(u, e, r, o, !0) : ri(u, Te({}, r), o, !0);
      a._hotUpdate(f), delete o.state.value[u], o._s.delete(u);
    }
    if (process.env.NODE_ENV !== "production" && It) {
      const u = oo();
      if (u && u.proxy && // avoid adding stores that are just built for hot module replacement
      !a) {
        const f = u.proxy, p = "_pStores" in f ? f._pStores : f._pStores = {};
        p[i] = c;
      }
    }
    return c;
  }
  return s.$id = i, s;
}
const _c = /* @__PURE__ */ Za("dock", () => {
  const i = Fe([]), e = Fe(null), t = Fe(!0), r = Fe({ x: 50, y: 50 }), n = (u) => {
    i.value.push(u);
  }, s = (u) => {
    const f = i.value.findIndex((p) => p.id === u);
    f > -1 && i.value.splice(f, 1);
  }, o = (u) => {
    e.value = u;
  }, a = (u, f) => {
    r.value = { x: u, y: f };
  }, l = () => {
    t.value = !t.value;
  }, c = wr(() => i.value.length);
  return {
    items: i,
    activeItem: e,
    isVisible: t,
    position: r,
    addItem: n,
    removeItem: s,
    setActiveItem: o,
    setPosition: a,
    toggleVisibility: l,
    itemCount: c
  };
});
function Ie(i) {
  if (i === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return i;
}
function Zi(i, e) {
  i.prototype = Object.create(e.prototype), i.prototype.constructor = i, i.__proto__ = e;
}
/*!
 * GSAP 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var xe = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, vt = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, wn, le, Q, Pe = 1e8, W = 1 / Pe, rn = Math.PI * 2, Ka = rn / 4, el = 0, Ki = Math.sqrt, tl = Math.cos, rl = Math.sin, ae = function(e) {
  return typeof e == "string";
}, K = function(e) {
  return typeof e == "function";
}, $e = function(e) {
  return typeof e == "number";
}, kn = function(e) {
  return typeof e > "u";
}, ze = function(e) {
  return typeof e == "object";
}, he = function(e) {
  return e !== !1;
}, Tn = function() {
  return typeof window < "u";
}, lr = function(e) {
  return K(e) || ae(e);
}, es = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, ue = Array.isArray, nn = /(?:-?\.?\d|\.)+/gi, ts = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, mt = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Dr = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, rs = /[+-]=-?[.\d]+/, ns = /[^,'"\[\]\s]+/gi, nl = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, J, Me, sn, Sn, we = {}, pr = {}, is, ss = function(e) {
  return (pr = xt(e, we)) && ge;
}, Pn = function(e, t) {
  return console.warn("Invalid property", e, "set to", t, "Missing plugin? gsap.registerPlugin()");
}, Yt = function(e, t) {
  return !t && console.warn(e);
}, os = function(e, t) {
  return e && (we[e] = t) && pr && (pr[e] = t) || we;
}, Xt = function() {
  return 0;
}, il = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, cr = {
  suppressEvents: !0,
  kill: !1
}, sl = {
  suppressEvents: !0
}, Cn = {}, Xe = [], on = {}, as, be = {}, Nr = {}, ni = 30, ur = [], On = "", Mn = function(e) {
  var t = e[0], r, n;
  if (ze(t) || K(t) || (e = [e]), !(r = (t._gsap || {}).harness)) {
    for (n = ur.length; n-- && !ur[n].targetTest(t); )
      ;
    r = ur[n];
  }
  for (n = e.length; n--; )
    e[n] && (e[n]._gsap || (e[n]._gsap = new As(e[n], r))) || e.splice(n, 1);
  return e;
}, it = function(e) {
  return e._gsap || Mn(Ce(e))[0]._gsap;
}, ls = function(e, t, r) {
  return (r = e[t]) && K(r) ? e[t]() : kn(r) && e.getAttribute && e.getAttribute(t) || r;
}, pe = function(e, t) {
  return (e = e.split(",")).forEach(t) || e;
}, te = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, ne = function(e) {
  return Math.round(e * 1e7) / 1e7 || 0;
}, gt = function(e, t) {
  var r = t.charAt(0), n = parseFloat(t.substr(2));
  return e = parseFloat(e), r === "+" ? e + n : r === "-" ? e - n : r === "*" ? e * n : e / n;
}, ol = function(e, t) {
  for (var r = t.length, n = 0; e.indexOf(t[n]) < 0 && ++n < r; )
    ;
  return n < r;
}, mr = function() {
  var e = Xe.length, t = Xe.slice(0), r, n;
  for (on = {}, Xe.length = 0, r = 0; r < e; r++)
    n = t[r], n && n._lazy && (n.render(n._lazy[0], n._lazy[1], !0)._lazy = 0);
}, En = function(e) {
  return !!(e._initted || e._startAt || e.add);
}, cs = function(e, t, r, n) {
  Xe.length && !le && mr(), e.render(t, r, !!(le && t < 0 && En(e))), Xe.length && !le && mr();
}, us = function(e) {
  var t = parseFloat(e);
  return (t || t === 0) && (e + "").match(ns).length < 2 ? t : ae(e) ? e.trim() : e;
}, ds = function(e) {
  return e;
}, ke = function(e, t) {
  for (var r in t)
    r in e || (e[r] = t[r]);
  return e;
}, al = function(e) {
  return function(t, r) {
    for (var n in r)
      n in t || n === "duration" && e || n === "ease" || (t[n] = r[n]);
  };
}, xt = function(e, t) {
  for (var r in t)
    e[r] = t[r];
  return e;
}, ii = function i(e, t) {
  for (var r in t)
    r !== "__proto__" && r !== "constructor" && r !== "prototype" && (e[r] = ze(t[r]) ? i(e[r] || (e[r] = {}), t[r]) : t[r]);
  return e;
}, _r = function(e, t) {
  var r = {}, n;
  for (n in e)
    n in t || (r[n] = e[n]);
  return r;
}, Lt = function(e) {
  var t = e.parent || J, r = e.keyframes ? al(ue(e.keyframes)) : ke;
  if (he(e.inherit))
    for (; t; )
      r(e, t.vars.defaults), t = t.parent || t._dp;
  return e;
}, ll = function(e, t) {
  for (var r = e.length, n = r === t.length; n && r-- && e[r] === t[r]; )
    ;
  return r < 0;
}, fs = function(e, t, r, n, s) {
  var o = e[n], a;
  if (s)
    for (a = t[s]; o && o[s] > a; )
      o = o._prev;
  return o ? (t._next = o._next, o._next = t) : (t._next = e[r], e[r] = t), t._next ? t._next._prev = t : e[n] = t, t._prev = o, t.parent = t._dp = e, t;
}, kr = function(e, t, r, n) {
  r === void 0 && (r = "_first"), n === void 0 && (n = "_last");
  var s = t._prev, o = t._next;
  s ? s._next = o : e[r] === t && (e[r] = o), o ? o._prev = s : e[n] === t && (e[n] = s), t._next = t._prev = t.parent = null;
}, qe = function(e, t) {
  e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e), e._act = 0;
}, st = function(e, t) {
  if (e && (!t || t._end > e._dur || t._start < 0))
    for (var r = e; r; )
      r._dirty = 1, r = r.parent;
  return e;
}, cl = function(e) {
  for (var t = e.parent; t && t.parent; )
    t._dirty = 1, t.totalDuration(), t = t.parent;
  return e;
}, an = function(e, t, r, n) {
  return e._startAt && (le ? e._startAt.revert(cr) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(t, !0, n));
}, ul = function i(e) {
  return !e || e._ts && i(e.parent);
}, si = function(e) {
  return e._repeat ? wt(e._tTime, e = e.duration() + e._rDelay) * e : 0;
}, wt = function(e, t) {
  var r = Math.floor(e = ne(e / t));
  return e && r === e ? r - 1 : r;
}, gr = function(e, t) {
  return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur);
}, Tr = function(e) {
  return e._end = ne(e._start + (e._tDur / Math.abs(e._ts || e._rts || W) || 0));
}, Sr = function(e, t) {
  var r = e._dp;
  return r && r.smoothChildTiming && e._ts && (e._start = ne(r._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)), Tr(e), r._dirty || st(r, e)), e;
}, hs = function(e, t) {
  var r;
  if ((t._time || !t._dur && t._initted || t._start < e._time && (t._dur || !t.add)) && (r = gr(e.rawTime(), t), (!t._dur || Zt(0, t.totalDuration(), r) - t._tTime > W) && t.render(r, !0)), st(e, t)._dp && e._initted && e._time >= e._dur && e._ts) {
    if (e._dur < e.duration())
      for (r = e; r._dp; )
        r.rawTime() >= 0 && r.totalTime(r._tTime), r = r._dp;
    e._zTime = -W;
  }
}, Ee = function(e, t, r, n) {
  return t.parent && qe(t), t._start = ne(($e(r) ? r : r || e !== J ? Se(e, r, t) : e._time) + t._delay), t._end = ne(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)), fs(e, t, "_first", "_last", e._sort ? "_start" : 0), ln(t) || (e._recent = t), n || hs(e, t), e._ts < 0 && Sr(e, e._tTime), e;
}, ps = function(e, t) {
  return (we.ScrollTrigger || Pn("scrollTrigger", t)) && we.ScrollTrigger.create(t, e);
}, ms = function(e, t, r, n, s) {
  if (zn(e, t, s), !e._initted)
    return 1;
  if (!r && e._pt && !le && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && as !== ye.frame)
    return Xe.push(e), e._lazy = [s, n], 1;
}, dl = function i(e) {
  var t = e.parent;
  return t && t._ts && t._initted && !t._lock && (t.rawTime() < 0 || i(t));
}, ln = function(e) {
  var t = e.data;
  return t === "isFromStart" || t === "isStart";
}, fl = function(e, t, r, n) {
  var s = e.ratio, o = t < 0 || !t && (!e._start && dl(e) && !(!e._initted && ln(e)) || (e._ts < 0 || e._dp._ts < 0) && !ln(e)) ? 0 : 1, a = e._rDelay, l = 0, c, u, f;
  if (a && e._repeat && (l = Zt(0, e._tDur, t), u = wt(l, a), e._yoyo && u & 1 && (o = 1 - o), u !== wt(e._tTime, a) && (s = 1 - o, e.vars.repeatRefresh && e._initted && e.invalidate())), o !== s || le || n || e._zTime === W || !t && e._zTime) {
    if (!e._initted && ms(e, t, n, r, l))
      return;
    for (f = e._zTime, e._zTime = t || (r ? W : 0), r || (r = t && !f), e.ratio = o, e._from && (o = 1 - o), e._time = 0, e._tTime = l, c = e._pt; c; )
      c.r(o, c.d), c = c._next;
    t < 0 && an(e, t, r, !0), e._onUpdate && !r && ve(e, "onUpdate"), l && e._repeat && !r && e.parent && ve(e, "onRepeat"), (t >= e._tDur || t < 0) && e.ratio === o && (o && qe(e, 1), !r && !le && (ve(e, o ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()));
  } else e._zTime || (e._zTime = t);
}, hl = function(e, t, r) {
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
}, kt = function(e, t, r, n) {
  var s = e._repeat, o = ne(t) || 0, a = e._tTime / e._tDur;
  return a && !n && (e._time *= o / e._dur), e._dur = o, e._tDur = s ? s < 0 ? 1e10 : ne(o * (s + 1) + e._rDelay * s) : o, a > 0 && !n && Sr(e, e._tTime = e._tDur * a), e.parent && Tr(e), r || st(e.parent, e), e;
}, oi = function(e) {
  return e instanceof de ? st(e) : kt(e, e._dur);
}, pl = {
  _start: 0,
  endTime: Xt,
  totalDuration: Xt
}, Se = function i(e, t, r) {
  var n = e.labels, s = e._recent || pl, o = e.duration() >= Pe ? s.endTime(!1) : e._dur, a, l, c;
  return ae(t) && (isNaN(t) || t in n) ? (l = t.charAt(0), c = t.substr(-1) === "%", a = t.indexOf("="), l === "<" || l === ">" ? (a >= 0 && (t = t.replace(/=/, "")), (l === "<" ? s._start : s.endTime(s._repeat >= 0)) + (parseFloat(t.substr(1)) || 0) * (c ? (a < 0 ? s : r).totalDuration() / 100 : 1)) : a < 0 ? (t in n || (n[t] = o), n[t]) : (l = parseFloat(t.charAt(a - 1) + t.substr(a + 1)), c && r && (l = l / 100 * (ue(r) ? r[0] : r).totalDuration()), a > 1 ? i(e, t.substr(0, a - 1), r) + l : o + l)) : t == null ? o : +t;
}, Gt = function(e, t, r) {
  var n = $e(t[1]), s = (n ? 2 : 1) + (e < 2 ? 0 : 1), o = t[s], a, l;
  if (n && (o.duration = t[1]), o.parent = r, e) {
    for (a = o, l = r; l && !("immediateRender" in a); )
      a = l.vars.defaults || {}, l = he(l.vars.inherit) && l.parent;
    o.immediateRender = he(a.immediateRender), e < 2 ? o.runBackwards = 1 : o.startAt = t[s - 1];
  }
  return new re(t[0], o, t[s + 1]);
}, Qe = function(e, t) {
  return e || e === 0 ? t(e) : t;
}, Zt = function(e, t, r) {
  return r < e ? e : r > t ? t : r;
}, ce = function(e, t) {
  return !ae(e) || !(t = nl.exec(e)) ? "" : t[1];
}, ml = function(e, t, r) {
  return Qe(r, function(n) {
    return Zt(e, t, n);
  });
}, cn = [].slice, _s = function(e, t) {
  return e && ze(e) && "length" in e && (!t && !e.length || e.length - 1 in e && ze(e[0])) && !e.nodeType && e !== Me;
}, _l = function(e, t, r) {
  return r === void 0 && (r = []), e.forEach(function(n) {
    var s;
    return ae(n) && !t || _s(n, 1) ? (s = r).push.apply(s, Ce(n)) : r.push(n);
  }) || r;
}, Ce = function(e, t, r) {
  return Q && !t && Q.selector ? Q.selector(e) : ae(e) && !r && (sn || !Tt()) ? cn.call((t || Sn).querySelectorAll(e), 0) : ue(e) ? _l(e, r) : _s(e) ? cn.call(e, 0) : e ? [e] : [];
}, un = function(e) {
  return e = Ce(e)[0] || Yt("Invalid scope") || {}, function(t) {
    var r = e.current || e.nativeElement || e;
    return Ce(t, r.querySelectorAll ? r : r === e ? Yt("Invalid scope") || Sn.createElement("div") : e);
  };
}, gs = function(e) {
  return e.sort(function() {
    return 0.5 - Math.random();
  });
}, bs = function(e) {
  if (K(e))
    return e;
  var t = ze(e) ? e : {
    each: e
  }, r = ot(t.ease), n = t.from || 0, s = parseFloat(t.base) || 0, o = {}, a = n > 0 && n < 1, l = isNaN(n) || a, c = t.axis, u = n, f = n;
  return ae(n) ? u = f = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[n] || 0 : !a && l && (u = n[0], f = n[1]), function(p, h, m) {
    var d = (m || t).length, _ = o[d], x, y, S, P, w, b, g, v, k;
    if (!_) {
      if (k = t.grid === "auto" ? 0 : (t.grid || [1, Pe])[1], !k) {
        for (g = -Pe; g < (g = m[k++].getBoundingClientRect().left) && k < d; )
          ;
        k < d && k--;
      }
      for (_ = o[d] = [], x = l ? Math.min(k, d) * u - 0.5 : n % k, y = k === Pe ? 0 : l ? d * f / k - 0.5 : n / k | 0, g = 0, v = Pe, b = 0; b < d; b++)
        S = b % k - x, P = y - (b / k | 0), _[b] = w = c ? Math.abs(c === "y" ? P : S) : Ki(S * S + P * P), w > g && (g = w), w < v && (v = w);
      n === "random" && gs(_), _.max = g - v, _.min = v, _.v = d = (parseFloat(t.amount) || parseFloat(t.each) * (k > d ? d - 1 : c ? c === "y" ? d / k : k : Math.max(k, d / k)) || 0) * (n === "edges" ? -1 : 1), _.b = d < 0 ? s - d : s, _.u = ce(t.amount || t.each) || 0, r = r && d < 0 ? Os(r) : r;
    }
    return d = (_[p] - _.min) / _.max || 0, ne(_.b + (r ? r(d) : d) * _.v) + _.u;
  };
}, dn = function(e) {
  var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
  return function(r) {
    var n = ne(Math.round(parseFloat(r) / e) * e * t);
    return (n - n % 1) / t + ($e(r) ? 0 : ce(r));
  };
}, ys = function(e, t) {
  var r = ue(e), n, s;
  return !r && ze(e) && (n = r = e.radius || Pe, e.values ? (e = Ce(e.values), (s = !$e(e[0])) && (n *= n)) : e = dn(e.increment)), Qe(t, r ? K(e) ? function(o) {
    return s = e(o), Math.abs(s - o) <= n ? s : o;
  } : function(o) {
    for (var a = parseFloat(s ? o.x : o), l = parseFloat(s ? o.y : 0), c = Pe, u = 0, f = e.length, p, h; f--; )
      s ? (p = e[f].x - a, h = e[f].y - l, p = p * p + h * h) : p = Math.abs(e[f] - a), p < c && (c = p, u = f);
    return u = !n || c <= n ? e[u] : o, s || u === o || $e(o) ? u : u + ce(o);
  } : dn(e));
}, vs = function(e, t, r, n) {
  return Qe(ue(e) ? !t : r === !0 ? !!(r = 0) : !n, function() {
    return ue(e) ? e[~~(Math.random() * e.length)] : (r = r || 1e-5) && (n = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((e - r / 2 + Math.random() * (t - e + r * 0.99)) / r) * r * n) / n;
  });
}, gl = function() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return function(n) {
    return t.reduce(function(s, o) {
      return o(s);
    }, n);
  };
}, bl = function(e, t) {
  return function(r) {
    return e(parseFloat(r)) + (t || ce(r));
  };
}, yl = function(e, t, r) {
  return ws(e, t, 0, 1, r);
}, xs = function(e, t, r) {
  return Qe(r, function(n) {
    return e[~~t(n)];
  });
}, vl = function i(e, t, r) {
  var n = t - e;
  return ue(e) ? xs(e, i(0, e.length), t) : Qe(r, function(s) {
    return (n + (s - e) % n) % n + e;
  });
}, xl = function i(e, t, r) {
  var n = t - e, s = n * 2;
  return ue(e) ? xs(e, i(0, e.length - 1), t) : Qe(r, function(o) {
    return o = (s + (o - e) % s) % s || 0, e + (o > n ? s - o : o);
  });
}, Wt = function(e) {
  for (var t = 0, r = "", n, s, o, a; ~(n = e.indexOf("random(", t)); )
    o = e.indexOf(")", n), a = e.charAt(n + 7) === "[", s = e.substr(n + 7, o - n - 7).match(a ? ns : nn), r += e.substr(t, n - t) + vs(a ? s : +s[0], a ? 0 : +s[1], +s[2] || 1e-5), t = o + 1;
  return r + e.substr(t, e.length - t);
}, ws = function(e, t, r, n, s) {
  var o = t - e, a = n - r;
  return Qe(s, function(l) {
    return r + ((l - e) / o * a || 0);
  });
}, wl = function i(e, t, r, n) {
  var s = isNaN(e + t) ? 0 : function(h) {
    return (1 - h) * e + h * t;
  };
  if (!s) {
    var o = ae(e), a = {}, l, c, u, f, p;
    if (r === !0 && (n = 1) && (r = null), o)
      e = {
        p: e
      }, t = {
        p: t
      };
    else if (ue(e) && !ue(t)) {
      for (u = [], f = e.length, p = f - 2, c = 1; c < f; c++)
        u.push(i(e[c - 1], e[c]));
      f--, s = function(m) {
        m *= f;
        var d = Math.min(p, ~~m);
        return u[d](m - d);
      }, r = t;
    } else n || (e = xt(ue(e) ? [] : {}, e));
    if (!u) {
      for (l in t)
        An.call(a, e, l, "get", t[l]);
      s = function(m) {
        return Nn(m, a) || (o ? e.p : e);
      };
    }
  }
  return Qe(r, s);
}, ai = function(e, t, r) {
  var n = e.labels, s = Pe, o, a, l;
  for (o in n)
    a = n[o] - t, a < 0 == !!r && a && s > (a = Math.abs(a)) && (l = o, s = a);
  return l;
}, ve = function(e, t, r) {
  var n = e.vars, s = n[t], o = Q, a = e._ctx, l, c, u;
  if (s)
    return l = n[t + "Params"], c = n.callbackScope || e, r && Xe.length && mr(), a && (Q = a), u = l ? s.apply(c, l) : s.call(c), Q = o, u;
}, Vt = function(e) {
  return qe(e), e.scrollTrigger && e.scrollTrigger.kill(!!le), e.progress() < 1 && ve(e, "onInterrupt"), e;
}, _t, ks = [], Ts = function(e) {
  if (e)
    if (e = !e.name && e.default || e, Tn() || e.headless) {
      var t = e.name, r = K(e), n = t && !r && e.init ? function() {
        this._props = [];
      } : e, s = {
        init: Xt,
        render: Nn,
        add: An,
        kill: Fl,
        modifier: Vl,
        rawVars: 0
      }, o = {
        targetTest: 0,
        get: 0,
        getSetter: Dn,
        aliases: {},
        register: 0
      };
      if (Tt(), e !== n) {
        if (be[t])
          return;
        ke(n, ke(_r(e, s), o)), xt(n.prototype, xt(s, _r(e, o))), be[n.prop = t] = n, e.targetTest && (ur.push(n), Cn[t] = 1), t = (t === "css" ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin";
      }
      os(t, n), e.register && e.register(ge, n, me);
    } else
      ks.push(e);
}, X = 255, Ft = {
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
}, Ir = function(e, t, r) {
  return e += e < 0 ? 1 : e > 1 ? -1 : 0, (e * 6 < 1 ? t + (r - t) * e * 6 : e < 0.5 ? r : e * 3 < 2 ? t + (r - t) * (2 / 3 - e) * 6 : t) * X + 0.5 | 0;
}, Ss = function(e, t, r) {
  var n = e ? $e(e) ? [e >> 16, e >> 8 & X, e & X] : 0 : Ft.black, s, o, a, l, c, u, f, p, h, m;
  if (!n) {
    if (e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), Ft[e])
      n = Ft[e];
    else if (e.charAt(0) === "#") {
      if (e.length < 6 && (s = e.charAt(1), o = e.charAt(2), a = e.charAt(3), e = "#" + s + s + o + o + a + a + (e.length === 5 ? e.charAt(4) + e.charAt(4) : "")), e.length === 9)
        return n = parseInt(e.substr(1, 6), 16), [n >> 16, n >> 8 & X, n & X, parseInt(e.substr(7), 16) / 255];
      e = parseInt(e.substr(1), 16), n = [e >> 16, e >> 8 & X, e & X];
    } else if (e.substr(0, 3) === "hsl") {
      if (n = m = e.match(nn), !t)
        l = +n[0] % 360 / 360, c = +n[1] / 100, u = +n[2] / 100, o = u <= 0.5 ? u * (c + 1) : u + c - u * c, s = u * 2 - o, n.length > 3 && (n[3] *= 1), n[0] = Ir(l + 1 / 3, s, o), n[1] = Ir(l, s, o), n[2] = Ir(l - 1 / 3, s, o);
      else if (~e.indexOf("="))
        return n = e.match(ts), r && n.length < 4 && (n[3] = 1), n;
    } else
      n = e.match(nn) || Ft.transparent;
    n = n.map(Number);
  }
  return t && !m && (s = n[0] / X, o = n[1] / X, a = n[2] / X, f = Math.max(s, o, a), p = Math.min(s, o, a), u = (f + p) / 2, f === p ? l = c = 0 : (h = f - p, c = u > 0.5 ? h / (2 - f - p) : h / (f + p), l = f === s ? (o - a) / h + (o < a ? 6 : 0) : f === o ? (a - s) / h + 2 : (s - o) / h + 4, l *= 60), n[0] = ~~(l + 0.5), n[1] = ~~(c * 100 + 0.5), n[2] = ~~(u * 100 + 0.5)), r && n.length < 4 && (n[3] = 1), n;
}, Ps = function(e) {
  var t = [], r = [], n = -1;
  return e.split(We).forEach(function(s) {
    var o = s.match(mt) || [];
    t.push.apply(t, o), r.push(n += o.length + 1);
  }), t.c = r, t;
}, li = function(e, t, r) {
  var n = "", s = (e + n).match(We), o = t ? "hsla(" : "rgba(", a = 0, l, c, u, f;
  if (!s)
    return e;
  if (s = s.map(function(p) {
    return (p = Ss(p, t, 1)) && o + (t ? p[0] + "," + p[1] + "%," + p[2] + "%," + p[3] : p.join(",")) + ")";
  }), r && (u = Ps(e), l = r.c, l.join(n) !== u.c.join(n)))
    for (c = e.replace(We, "1").split(mt), f = c.length - 1; a < f; a++)
      n += c[a] + (~l.indexOf(a) ? s.shift() || o + "0,0,0,0)" : (u.length ? u : s.length ? s : r).shift());
  if (!c)
    for (c = e.split(We), f = c.length - 1; a < f; a++)
      n += c[a] + s[a];
  return n + c[f];
}, We = function() {
  var i = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", e;
  for (e in Ft)
    i += "|" + e + "\\b";
  return new RegExp(i + ")", "gi");
}(), kl = /hsl[a]?\(/, Cs = function(e) {
  var t = e.join(" "), r;
  if (We.lastIndex = 0, We.test(t))
    return r = kl.test(t), e[1] = li(e[1], r), e[0] = li(e[0], r, Ps(e[1])), !0;
}, qt, ye = function() {
  var i = Date.now, e = 500, t = 33, r = i(), n = r, s = 1e3 / 240, o = s, a = [], l, c, u, f, p, h, m = function d(_) {
    var x = i() - n, y = _ === !0, S, P, w, b;
    if ((x > e || x < 0) && (r += x - t), n += x, w = n - r, S = w - o, (S > 0 || y) && (b = ++f.frame, p = w - f.time * 1e3, f.time = w = w / 1e3, o += S + (S >= s ? 4 : s - S), P = 1), y || (l = c(d)), P)
      for (h = 0; h < a.length; h++)
        a[h](w, p, b, _);
  };
  return f = {
    time: 0,
    frame: 0,
    tick: function() {
      m(!0);
    },
    deltaRatio: function(_) {
      return p / (1e3 / (_ || 60));
    },
    wake: function() {
      is && (!sn && Tn() && (Me = sn = window, Sn = Me.document || {}, we.gsap = ge, (Me.gsapVersions || (Me.gsapVersions = [])).push(ge.version), ss(pr || Me.GreenSockGlobals || !Me.gsap && Me || {}), ks.forEach(Ts)), u = typeof requestAnimationFrame < "u" && requestAnimationFrame, l && f.sleep(), c = u || function(_) {
        return setTimeout(_, o - f.time * 1e3 + 1 | 0);
      }, qt = 1, m(2));
    },
    sleep: function() {
      (u ? cancelAnimationFrame : clearTimeout)(l), qt = 0, c = Xt;
    },
    lagSmoothing: function(_, x) {
      e = _ || 1 / 0, t = Math.min(x || 33, e);
    },
    fps: function(_) {
      s = 1e3 / (_ || 240), o = f.time * 1e3 + s;
    },
    add: function(_, x, y) {
      var S = x ? function(P, w, b, g) {
        _(P, w, b, g), f.remove(S);
      } : _;
      return f.remove(_), a[y ? "unshift" : "push"](S), Tt(), S;
    },
    remove: function(_, x) {
      ~(x = a.indexOf(_)) && a.splice(x, 1) && h >= x && h--;
    },
    _listeners: a
  }, f;
}(), Tt = function() {
  return !qt && ye.wake();
}, j = {}, Tl = /^[\d.\-M][\d.\-,\s]/, Sl = /["']/g, Pl = function(e) {
  for (var t = {}, r = e.substr(1, e.length - 3).split(":"), n = r[0], s = 1, o = r.length, a, l, c; s < o; s++)
    l = r[s], a = s !== o - 1 ? l.lastIndexOf(",") : l.length, c = l.substr(0, a), t[n] = isNaN(c) ? c.replace(Sl, "").trim() : +c, n = l.substr(a + 1).trim();
  return t;
}, Cl = function(e) {
  var t = e.indexOf("(") + 1, r = e.indexOf(")"), n = e.indexOf("(", t);
  return e.substring(t, ~n && n < r ? e.indexOf(")", r + 1) : r);
}, Ol = function(e) {
  var t = (e + "").split("("), r = j[t[0]];
  return r && t.length > 1 && r.config ? r.config.apply(null, ~e.indexOf("{") ? [Pl(t[1])] : Cl(e).split(",").map(us)) : j._CE && Tl.test(e) ? j._CE("", e) : r;
}, Os = function(e) {
  return function(t) {
    return 1 - e(1 - t);
  };
}, Ms = function i(e, t) {
  for (var r = e._first, n; r; )
    r instanceof de ? i(r, t) : r.vars.yoyoEase && (!r._yoyo || !r._repeat) && r._yoyo !== t && (r.timeline ? i(r.timeline, t) : (n = r._ease, r._ease = r._yEase, r._yEase = n, r._yoyo = t)), r = r._next;
}, ot = function(e, t) {
  return e && (K(e) ? e : j[e] || Ol(e)) || t;
}, ut = function(e, t, r, n) {
  r === void 0 && (r = function(l) {
    return 1 - t(1 - l);
  }), n === void 0 && (n = function(l) {
    return l < 0.5 ? t(l * 2) / 2 : 1 - t((1 - l) * 2) / 2;
  });
  var s = {
    easeIn: t,
    easeOut: r,
    easeInOut: n
  }, o;
  return pe(e, function(a) {
    j[a] = we[a] = s, j[o = a.toLowerCase()] = r;
    for (var l in s)
      j[o + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")] = j[a + "." + l] = s[l];
  }), s;
}, Es = function(e) {
  return function(t) {
    return t < 0.5 ? (1 - e(1 - t * 2)) / 2 : 0.5 + e((t - 0.5) * 2) / 2;
  };
}, Vr = function i(e, t, r) {
  var n = t >= 1 ? t : 1, s = (r || (e ? 0.3 : 0.45)) / (t < 1 ? t : 1), o = s / rn * (Math.asin(1 / n) || 0), a = function(u) {
    return u === 1 ? 1 : n * Math.pow(2, -10 * u) * rl((u - o) * s) + 1;
  }, l = e === "out" ? a : e === "in" ? function(c) {
    return 1 - a(1 - c);
  } : Es(a);
  return s = rn / s, l.config = function(c, u) {
    return i(e, c, u);
  }, l;
}, Fr = function i(e, t) {
  t === void 0 && (t = 1.70158);
  var r = function(o) {
    return o ? --o * o * ((t + 1) * o + t) + 1 : 0;
  }, n = e === "out" ? r : e === "in" ? function(s) {
    return 1 - r(1 - s);
  } : Es(r);
  return n.config = function(s) {
    return i(e, s);
  }, n;
};
pe("Linear,Quad,Cubic,Quart,Quint,Strong", function(i, e) {
  var t = e < 5 ? e + 1 : e;
  ut(i + ",Power" + (t - 1), e ? function(r) {
    return Math.pow(r, t);
  } : function(r) {
    return r;
  }, function(r) {
    return 1 - Math.pow(1 - r, t);
  }, function(r) {
    return r < 0.5 ? Math.pow(r * 2, t) / 2 : 1 - Math.pow((1 - r) * 2, t) / 2;
  });
});
j.Linear.easeNone = j.none = j.Linear.easeIn;
ut("Elastic", Vr("in"), Vr("out"), Vr());
(function(i, e) {
  var t = 1 / e, r = 2 * t, n = 2.5 * t, s = function(a) {
    return a < t ? i * a * a : a < r ? i * Math.pow(a - 1.5 / e, 2) + 0.75 : a < n ? i * (a -= 2.25 / e) * a + 0.9375 : i * Math.pow(a - 2.625 / e, 2) + 0.984375;
  };
  ut("Bounce", function(o) {
    return 1 - s(1 - o);
  }, s);
})(7.5625, 2.75);
ut("Expo", function(i) {
  return Math.pow(2, 10 * (i - 1)) * i + i * i * i * i * i * i * (1 - i);
});
ut("Circ", function(i) {
  return -(Ki(1 - i * i) - 1);
});
ut("Sine", function(i) {
  return i === 1 ? 1 : -tl(i * Ka) + 1;
});
ut("Back", Fr("in"), Fr("out"), Fr());
j.SteppedEase = j.steps = we.SteppedEase = {
  config: function(e, t) {
    e === void 0 && (e = 1);
    var r = 1 / e, n = e + (t ? 0 : 1), s = t ? 1 : 0, o = 1 - W;
    return function(a) {
      return ((n * Zt(0, o, a) | 0) + s) * r;
    };
  }
};
vt.ease = j["quad.out"];
pe("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(i) {
  return On += i + "," + i + "Params,";
});
var As = function(e, t) {
  this.id = el++, e._gsap = this, this.target = e, this.harness = t, this.get = t ? t.get : ls, this.set = t ? t.getSetter : Dn;
}, Ht = /* @__PURE__ */ function() {
  function i(t) {
    this.vars = t, this._delay = +t.delay || 0, (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0, this._yoyo = !!t.yoyo || !!t.yoyoEase), this._ts = 1, kt(this, +t.duration, 1, 1), this.data = t.data, Q && (this._ctx = Q, Q.data.push(this)), qt || ye.wake();
  }
  var e = i.prototype;
  return e.delay = function(r) {
    return r || r === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + r - this._delay), this._delay = r, this) : this._delay;
  }, e.duration = function(r) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? r + (r + this._rDelay) * this._repeat : r) : this.totalDuration() && this._dur;
  }, e.totalDuration = function(r) {
    return arguments.length ? (this._dirty = 0, kt(this, this._repeat < 0 ? r : (r - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, e.totalTime = function(r, n) {
    if (Tt(), !arguments.length)
      return this._tTime;
    var s = this._dp;
    if (s && s.smoothChildTiming && this._ts) {
      for (Sr(this, r), !s._dp || s.parent || hs(s, this); s && s.parent; )
        s.parent._time !== s._start + (s._ts >= 0 ? s._tTime / s._ts : (s.totalDuration() - s._tTime) / -s._ts) && s.totalTime(s._tTime, !0), s = s.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && r < this._tDur || this._ts < 0 && r > 0 || !this._tDur && !r) && Ee(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== r || !this._dur && !n || this._initted && Math.abs(this._zTime) === W || !r && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = r), cs(this, r, n)), this;
  }, e.time = function(r, n) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), r + si(this)) % (this._dur + this._rDelay) || (r ? this._dur : 0), n) : this._time;
  }, e.totalProgress = function(r, n) {
    return arguments.length ? this.totalTime(this.totalDuration() * r, n) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, e.progress = function(r, n) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - r : r) + si(this), n) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, e.iteration = function(r, n) {
    var s = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (r - 1) * s, n) : this._repeat ? wt(this._tTime, s) + 1 : 1;
  }, e.timeScale = function(r, n) {
    if (!arguments.length)
      return this._rts === -W ? 0 : this._rts;
    if (this._rts === r)
      return this;
    var s = this.parent && this._ts ? gr(this.parent._time, this) : this._tTime;
    return this._rts = +r || 0, this._ts = this._ps || r === -W ? 0 : this._rts, this.totalTime(Zt(-Math.abs(this._delay), this.totalDuration(), s), n !== !1), Tr(this), cl(this);
  }, e.paused = function(r) {
    return arguments.length ? (this._ps !== r && (this._ps = r, r ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Tt(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== W && (this._tTime -= W)))), this) : this._ps;
  }, e.startTime = function(r) {
    if (arguments.length) {
      this._start = r;
      var n = this.parent || this._dp;
      return n && (n._sort || !this.parent) && Ee(n, this, r - this._delay), this;
    }
    return this._start;
  }, e.endTime = function(r) {
    return this._start + (he(r) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, e.rawTime = function(r) {
    var n = this.parent || this._dp;
    return n ? r && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? gr(n.rawTime(r), this) : this._tTime : this._tTime;
  }, e.revert = function(r) {
    r === void 0 && (r = sl);
    var n = le;
    return le = r, En(this) && (this.timeline && this.timeline.revert(r), this.totalTime(-0.01, r.suppressEvents)), this.data !== "nested" && r.kill !== !1 && this.kill(), le = n, this;
  }, e.globalTime = function(r) {
    for (var n = this, s = arguments.length ? r : n.rawTime(); n; )
      s = n._start + s / (Math.abs(n._ts) || 1), n = n._dp;
    return !this.parent && this._sat ? this._sat.globalTime(r) : s;
  }, e.repeat = function(r) {
    return arguments.length ? (this._repeat = r === 1 / 0 ? -2 : r, oi(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, e.repeatDelay = function(r) {
    if (arguments.length) {
      var n = this._time;
      return this._rDelay = r, oi(this), n ? this.time(n) : this;
    }
    return this._rDelay;
  }, e.yoyo = function(r) {
    return arguments.length ? (this._yoyo = r, this) : this._yoyo;
  }, e.seek = function(r, n) {
    return this.totalTime(Se(this, r), he(n));
  }, e.restart = function(r, n) {
    return this.play().totalTime(r ? -this._delay : 0, he(n)), this._dur || (this._zTime = -W), this;
  }, e.play = function(r, n) {
    return r != null && this.seek(r, n), this.reversed(!1).paused(!1);
  }, e.reverse = function(r, n) {
    return r != null && this.seek(r || this.totalDuration(), n), this.reversed(!0).paused(!1);
  }, e.pause = function(r, n) {
    return r != null && this.seek(r, n), this.paused(!0);
  }, e.resume = function() {
    return this.paused(!1);
  }, e.reversed = function(r) {
    return arguments.length ? (!!r !== this.reversed() && this.timeScale(-this._rts || (r ? -W : 0)), this) : this._rts < 0;
  }, e.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -W, this;
  }, e.isActive = function() {
    var r = this.parent || this._dp, n = this._start, s;
    return !!(!r || this._ts && this._initted && r.isActive() && (s = r.rawTime(!0)) >= n && s < this.endTime(!0) - W);
  }, e.eventCallback = function(r, n, s) {
    var o = this.vars;
    return arguments.length > 1 ? (n ? (o[r] = n, s && (o[r + "Params"] = s), r === "onUpdate" && (this._onUpdate = n)) : delete o[r], this) : o[r];
  }, e.then = function(r) {
    var n = this;
    return new Promise(function(s) {
      var o = K(r) ? r : ds, a = function() {
        var c = n.then;
        n.then = null, K(o) && (o = o(n)) && (o.then || o === n) && (n.then = c), s(o), n.then = c;
      };
      n._initted && n.totalProgress() === 1 && n._ts >= 0 || !n._tTime && n._ts < 0 ? a() : n._prom = a;
    });
  }, e.kill = function() {
    Vt(this);
  }, i;
}();
ke(Ht.prototype, {
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
  _zTime: -W,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var de = /* @__PURE__ */ function(i) {
  Zi(e, i);
  function e(r, n) {
    var s;
    return r === void 0 && (r = {}), s = i.call(this, r) || this, s.labels = {}, s.smoothChildTiming = !!r.smoothChildTiming, s.autoRemoveChildren = !!r.autoRemoveChildren, s._sort = he(r.sortChildren), J && Ee(r.parent || J, Ie(s), n), r.reversed && s.reverse(), r.paused && s.paused(!0), r.scrollTrigger && ps(Ie(s), r.scrollTrigger), s;
  }
  var t = e.prototype;
  return t.to = function(n, s, o) {
    return Gt(0, arguments, this), this;
  }, t.from = function(n, s, o) {
    return Gt(1, arguments, this), this;
  }, t.fromTo = function(n, s, o, a) {
    return Gt(2, arguments, this), this;
  }, t.set = function(n, s, o) {
    return s.duration = 0, s.parent = this, Lt(s).repeatDelay || (s.repeat = 0), s.immediateRender = !!s.immediateRender, new re(n, s, Se(this, o), 1), this;
  }, t.call = function(n, s, o) {
    return Ee(this, re.delayedCall(0, n, s), o);
  }, t.staggerTo = function(n, s, o, a, l, c, u) {
    return o.duration = s, o.stagger = o.stagger || a, o.onComplete = c, o.onCompleteParams = u, o.parent = this, new re(n, o, Se(this, l)), this;
  }, t.staggerFrom = function(n, s, o, a, l, c, u) {
    return o.runBackwards = 1, Lt(o).immediateRender = he(o.immediateRender), this.staggerTo(n, s, o, a, l, c, u);
  }, t.staggerFromTo = function(n, s, o, a, l, c, u, f) {
    return a.startAt = o, Lt(a).immediateRender = he(a.immediateRender), this.staggerTo(n, s, a, l, c, u, f);
  }, t.render = function(n, s, o) {
    var a = this._time, l = this._dirty ? this.totalDuration() : this._tDur, c = this._dur, u = n <= 0 ? 0 : ne(n), f = this._zTime < 0 != n < 0 && (this._initted || !c), p, h, m, d, _, x, y, S, P, w, b, g;
    if (this !== J && u > l && n >= 0 && (u = l), u !== this._tTime || o || f) {
      if (a !== this._time && c && (u += this._time - a, n += this._time - a), p = u, P = this._start, S = this._ts, x = !S, f && (c || (a = this._zTime), (n || !s) && (this._zTime = n)), this._repeat) {
        if (b = this._yoyo, _ = c + this._rDelay, this._repeat < -1 && n < 0)
          return this.totalTime(_ * 100 + n, s, o);
        if (p = ne(u % _), u === l ? (d = this._repeat, p = c) : (w = ne(u / _), d = ~~w, d && d === w && (p = c, d--), p > c && (p = c)), w = wt(this._tTime, _), !a && this._tTime && w !== d && this._tTime - w * _ - this._dur <= 0 && (w = d), b && d & 1 && (p = c - p, g = 1), d !== w && !this._lock) {
          var v = b && w & 1, k = v === (b && d & 1);
          if (d < w && (v = !v), a = v ? 0 : u % c ? c : u, this._lock = 1, this.render(a || (g ? 0 : ne(d * _)), s, !c)._lock = 0, this._tTime = u, !s && this.parent && ve(this, "onRepeat"), this.vars.repeatRefresh && !g && (this.invalidate()._lock = 1), a && a !== this._time || x !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (c = this._dur, l = this._tDur, k && (this._lock = 2, a = v ? c : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !g && this.invalidate()), this._lock = 0, !this._ts && !x)
            return this;
          Ms(this, g);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (y = hl(this, ne(a), ne(p)), y && (u -= p - (p = y._start))), this._tTime = u, this._time = p, this._act = !S, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = n, a = 0), !a && u && !s && !w && (ve(this, "onStart"), this._tTime !== u))
        return this;
      if (p >= a && n >= 0)
        for (h = this._first; h; ) {
          if (m = h._next, (h._act || p >= h._start) && h._ts && y !== h) {
            if (h.parent !== this)
              return this.render(n, s, o);
            if (h.render(h._ts > 0 ? (p - h._start) * h._ts : (h._dirty ? h.totalDuration() : h._tDur) + (p - h._start) * h._ts, s, o), p !== this._time || !this._ts && !x) {
              y = 0, m && (u += this._zTime = -W);
              break;
            }
          }
          h = m;
        }
      else {
        h = this._last;
        for (var C = n < 0 ? n : p; h; ) {
          if (m = h._prev, (h._act || C <= h._end) && h._ts && y !== h) {
            if (h.parent !== this)
              return this.render(n, s, o);
            if (h.render(h._ts > 0 ? (C - h._start) * h._ts : (h._dirty ? h.totalDuration() : h._tDur) + (C - h._start) * h._ts, s, o || le && En(h)), p !== this._time || !this._ts && !x) {
              y = 0, m && (u += this._zTime = C ? -W : W);
              break;
            }
          }
          h = m;
        }
      }
      if (y && !s && (this.pause(), y.render(p >= a ? 0 : -W)._zTime = p >= a ? 1 : -1, this._ts))
        return this._start = P, Tr(this), this.render(n, s, o);
      this._onUpdate && !s && ve(this, "onUpdate", !0), (u === l && this._tTime >= this.totalDuration() || !u && a) && (P === this._start || Math.abs(S) !== Math.abs(this._ts)) && (this._lock || ((n || !c) && (u === l && this._ts > 0 || !u && this._ts < 0) && qe(this, 1), !s && !(n < 0 && !a) && (u || a || !l) && (ve(this, u === l && n >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(u < l && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, t.add = function(n, s) {
    var o = this;
    if ($e(s) || (s = Se(this, s, n)), !(n instanceof Ht)) {
      if (ue(n))
        return n.forEach(function(a) {
          return o.add(a, s);
        }), this;
      if (ae(n))
        return this.addLabel(n, s);
      if (K(n))
        n = re.delayedCall(0, n);
      else
        return this;
    }
    return this !== n ? Ee(this, n, s) : this;
  }, t.getChildren = function(n, s, o, a) {
    n === void 0 && (n = !0), s === void 0 && (s = !0), o === void 0 && (o = !0), a === void 0 && (a = -Pe);
    for (var l = [], c = this._first; c; )
      c._start >= a && (c instanceof re ? s && l.push(c) : (o && l.push(c), n && l.push.apply(l, c.getChildren(!0, s, o)))), c = c._next;
    return l;
  }, t.getById = function(n) {
    for (var s = this.getChildren(1, 1, 1), o = s.length; o--; )
      if (s[o].vars.id === n)
        return s[o];
  }, t.remove = function(n) {
    return ae(n) ? this.removeLabel(n) : K(n) ? this.killTweensOf(n) : (n.parent === this && kr(this, n), n === this._recent && (this._recent = this._last), st(this));
  }, t.totalTime = function(n, s) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = ne(ye.time - (this._ts > 0 ? n / this._ts : (this.totalDuration() - n) / -this._ts))), i.prototype.totalTime.call(this, n, s), this._forcing = 0, this) : this._tTime;
  }, t.addLabel = function(n, s) {
    return this.labels[n] = Se(this, s), this;
  }, t.removeLabel = function(n) {
    return delete this.labels[n], this;
  }, t.addPause = function(n, s, o) {
    var a = re.delayedCall(0, s || Xt, o);
    return a.data = "isPause", this._hasPause = 1, Ee(this, a, Se(this, n));
  }, t.removePause = function(n) {
    var s = this._first;
    for (n = Se(this, n); s; )
      s._start === n && s.data === "isPause" && qe(s), s = s._next;
  }, t.killTweensOf = function(n, s, o) {
    for (var a = this.getTweensOf(n, o), l = a.length; l--; )
      Be !== a[l] && a[l].kill(n, s);
    return this;
  }, t.getTweensOf = function(n, s) {
    for (var o = [], a = Ce(n), l = this._first, c = $e(s), u; l; )
      l instanceof re ? ol(l._targets, a) && (c ? (!Be || l._initted && l._ts) && l.globalTime(0) <= s && l.globalTime(l.totalDuration()) > s : !s || l.isActive()) && o.push(l) : (u = l.getTweensOf(a, s)).length && o.push.apply(o, u), l = l._next;
    return o;
  }, t.tweenTo = function(n, s) {
    s = s || {};
    var o = this, a = Se(o, n), l = s, c = l.startAt, u = l.onStart, f = l.onStartParams, p = l.immediateRender, h, m = re.to(o, ke({
      ease: s.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: a,
      overwrite: "auto",
      duration: s.duration || Math.abs((a - (c && "time" in c ? c.time : o._time)) / o.timeScale()) || W,
      onStart: function() {
        if (o.pause(), !h) {
          var _ = s.duration || Math.abs((a - (c && "time" in c ? c.time : o._time)) / o.timeScale());
          m._dur !== _ && kt(m, _, 0, 1).render(m._time, !0, !0), h = 1;
        }
        u && u.apply(m, f || []);
      }
    }, s));
    return p ? m.render(0) : m;
  }, t.tweenFromTo = function(n, s, o) {
    return this.tweenTo(s, ke({
      startAt: {
        time: Se(this, n)
      }
    }, o));
  }, t.recent = function() {
    return this._recent;
  }, t.nextLabel = function(n) {
    return n === void 0 && (n = this._time), ai(this, Se(this, n));
  }, t.previousLabel = function(n) {
    return n === void 0 && (n = this._time), ai(this, Se(this, n), 1);
  }, t.currentLabel = function(n) {
    return arguments.length ? this.seek(n, !0) : this.previousLabel(this._time + W);
  }, t.shiftChildren = function(n, s, o) {
    o === void 0 && (o = 0);
    for (var a = this._first, l = this.labels, c; a; )
      a._start >= o && (a._start += n, a._end += n), a = a._next;
    if (s)
      for (c in l)
        l[c] >= o && (l[c] += n);
    return st(this);
  }, t.invalidate = function(n) {
    var s = this._first;
    for (this._lock = 0; s; )
      s.invalidate(n), s = s._next;
    return i.prototype.invalidate.call(this, n);
  }, t.clear = function(n) {
    n === void 0 && (n = !0);
    for (var s = this._first, o; s; )
      o = s._next, this.remove(s), s = o;
    return this._dp && (this._time = this._tTime = this._pTime = 0), n && (this.labels = {}), st(this);
  }, t.totalDuration = function(n) {
    var s = 0, o = this, a = o._last, l = Pe, c, u, f;
    if (arguments.length)
      return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -n : n));
    if (o._dirty) {
      for (f = o.parent; a; )
        c = a._prev, a._dirty && a.totalDuration(), u = a._start, u > l && o._sort && a._ts && !o._lock ? (o._lock = 1, Ee(o, a, u - a._delay, 1)._lock = 0) : l = u, u < 0 && a._ts && (s -= u, (!f && !o._dp || f && f.smoothChildTiming) && (o._start += u / o._ts, o._time -= u, o._tTime -= u), o.shiftChildren(-u, !1, -1 / 0), l = 0), a._end > s && a._ts && (s = a._end), a = c;
      kt(o, o === J && o._time > s ? o._time : s, 1, 1), o._dirty = 0;
    }
    return o._tDur;
  }, e.updateRoot = function(n) {
    if (J._ts && (cs(J, gr(n, J)), as = ye.frame), ye.frame >= ni) {
      ni += xe.autoSleep || 120;
      var s = J._first;
      if ((!s || !s._ts) && xe.autoSleep && ye._listeners.length < 2) {
        for (; s && !s._ts; )
          s = s._next;
        s || ye.sleep();
      }
    }
  }, e;
}(Ht);
ke(de.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var Ml = function(e, t, r, n, s, o, a) {
  var l = new me(this._pt, e, t, 0, 1, Vs, null, s), c = 0, u = 0, f, p, h, m, d, _, x, y;
  for (l.b = r, l.e = n, r += "", n += "", (x = ~n.indexOf("random(")) && (n = Wt(n)), o && (y = [r, n], o(y, e, t), r = y[0], n = y[1]), p = r.match(Dr) || []; f = Dr.exec(n); )
    m = f[0], d = n.substring(c, f.index), h ? h = (h + 1) % 5 : d.substr(-5) === "rgba(" && (h = 1), m !== p[u++] && (_ = parseFloat(p[u - 1]) || 0, l._pt = {
      _next: l._pt,
      p: d || u === 1 ? d : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: _,
      c: m.charAt(1) === "=" ? gt(_, m) - _ : parseFloat(m) - _,
      m: h && h < 4 ? Math.round : 0
    }, c = Dr.lastIndex);
  return l.c = c < n.length ? n.substring(c, n.length) : "", l.fp = a, (rs.test(n) || x) && (l.e = 0), this._pt = l, l;
}, An = function(e, t, r, n, s, o, a, l, c, u) {
  K(n) && (n = n(s || 0, e, o));
  var f = e[t], p = r !== "get" ? r : K(f) ? c ? e[t.indexOf("set") || !K(e["get" + t.substr(3)]) ? t : "get" + t.substr(3)](c) : e[t]() : f, h = K(f) ? c ? Dl : Ns : Rn, m;
  if (ae(n) && (~n.indexOf("random(") && (n = Wt(n)), n.charAt(1) === "=" && (m = gt(p, n) + (ce(p) || 0), (m || m === 0) && (n = m))), !u || p !== n || fn)
    return !isNaN(p * n) && n !== "" ? (m = new me(this._pt, e, t, +p || 0, n - (p || 0), typeof f == "boolean" ? Il : Is, 0, h), c && (m.fp = c), a && m.modifier(a, this, e), this._pt = m) : (!f && !(t in e) && Pn(t, n), Ml.call(this, e, t, p, n, h, l || xe.stringFilter, c));
}, El = function(e, t, r, n, s) {
  if (K(e) && (e = jt(e, s, t, r, n)), !ze(e) || e.style && e.nodeType || ue(e) || es(e))
    return ae(e) ? jt(e, s, t, r, n) : e;
  var o = {}, a;
  for (a in e)
    o[a] = jt(e[a], s, t, r, n);
  return o;
}, zs = function(e, t, r, n, s, o) {
  var a, l, c, u;
  if (be[e] && (a = new be[e]()).init(s, a.rawVars ? t[e] : El(t[e], n, s, o, r), r, n, o) !== !1 && (r._pt = l = new me(r._pt, s, e, 0, 1, a.render, a, 0, a.priority), r !== _t))
    for (c = r._ptLookup[r._targets.indexOf(s)], u = a._props.length; u--; )
      c[a._props[u]] = l;
  return a;
}, Be, fn, zn = function i(e, t, r) {
  var n = e.vars, s = n.ease, o = n.startAt, a = n.immediateRender, l = n.lazy, c = n.onUpdate, u = n.runBackwards, f = n.yoyoEase, p = n.keyframes, h = n.autoRevert, m = e._dur, d = e._startAt, _ = e._targets, x = e.parent, y = x && x.data === "nested" ? x.vars.targets : _, S = e._overwrite === "auto" && !wn, P = e.timeline, w, b, g, v, k, C, M, O, A, z, R, E, F;
  if (P && (!p || !s) && (s = "none"), e._ease = ot(s, vt.ease), e._yEase = f ? Os(ot(f === !0 ? s : f, vt.ease)) : 0, f && e._yoyo && !e._repeat && (f = e._yEase, e._yEase = e._ease, e._ease = f), e._from = !P && !!n.runBackwards, !P || p && !n.stagger) {
    if (O = _[0] ? it(_[0]).harness : 0, E = O && n[O.prop], w = _r(n, Cn), d && (d._zTime < 0 && d.progress(1), t < 0 && u && a && !h ? d.render(-1, !0) : d.revert(u && m ? cr : il), d._lazy = 0), o) {
      if (qe(e._startAt = re.set(_, ke({
        data: "isStart",
        overwrite: !1,
        parent: x,
        immediateRender: !0,
        lazy: !d && he(l),
        startAt: null,
        delay: 0,
        onUpdate: c && function() {
          return ve(e, "onUpdate");
        },
        stagger: 0
      }, o))), e._startAt._dp = 0, e._startAt._sat = e, t < 0 && (le || !a && !h) && e._startAt.revert(cr), a && m && t <= 0 && r <= 0) {
        t && (e._zTime = t);
        return;
      }
    } else if (u && m && !d) {
      if (t && (a = !1), g = ke({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: a && !d && he(l),
        immediateRender: a,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: x
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, w), E && (g[O.prop] = E), qe(e._startAt = re.set(_, g)), e._startAt._dp = 0, e._startAt._sat = e, t < 0 && (le ? e._startAt.revert(cr) : e._startAt.render(-1, !0)), e._zTime = t, !a)
        i(e._startAt, W, W);
      else if (!t)
        return;
    }
    for (e._pt = e._ptCache = 0, l = m && he(l) || l && !m, b = 0; b < _.length; b++) {
      if (k = _[b], M = k._gsap || Mn(_)[b]._gsap, e._ptLookup[b] = z = {}, on[M.id] && Xe.length && mr(), R = y === _ ? b : y.indexOf(k), O && (A = new O()).init(k, E || w, e, R, y) !== !1 && (e._pt = v = new me(e._pt, k, A.name, 0, 1, A.render, A, 0, A.priority), A._props.forEach(function(T) {
        z[T] = v;
      }), A.priority && (C = 1)), !O || E)
        for (g in w)
          be[g] && (A = zs(g, w, e, R, k, y)) ? A.priority && (C = 1) : z[g] = v = An.call(e, k, g, "get", w[g], R, y, 0, n.stringFilter);
      e._op && e._op[b] && e.kill(k, e._op[b]), S && e._pt && (Be = e, J.killTweensOf(k, z, e.globalTime(t)), F = !e.parent, Be = 0), e._pt && l && (on[M.id] = 1);
    }
    C && Fs(e), e._onInit && e._onInit(e);
  }
  e._onUpdate = c, e._initted = (!e._op || e._pt) && !F, p && t <= 0 && P.render(Pe, !0, !0);
}, Al = function(e, t, r, n, s, o, a, l) {
  var c = (e._pt && e._ptCache || (e._ptCache = {}))[t], u, f, p, h;
  if (!c)
    for (c = e._ptCache[t] = [], p = e._ptLookup, h = e._targets.length; h--; ) {
      if (u = p[h][t], u && u.d && u.d._pt)
        for (u = u.d._pt; u && u.p !== t && u.fp !== t; )
          u = u._next;
      if (!u)
        return fn = 1, e.vars[t] = "+=0", zn(e, a), fn = 0, l ? Yt(t + " not eligible for reset") : 1;
      c.push(u);
    }
  for (h = c.length; h--; )
    f = c[h], u = f._pt || f, u.s = (n || n === 0) && !s ? n : u.s + (n || 0) + o * u.c, u.c = r - u.s, f.e && (f.e = te(r) + ce(f.e)), f.b && (f.b = u.s + ce(f.b));
}, zl = function(e, t) {
  var r = e[0] ? it(e[0]).harness : 0, n = r && r.aliases, s, o, a, l;
  if (!n)
    return t;
  s = xt({}, t);
  for (o in n)
    if (o in s)
      for (l = n[o].split(","), a = l.length; a--; )
        s[l[a]] = s[o];
  return s;
}, Rl = function(e, t, r, n) {
  var s = t.ease || n || "power1.inOut", o, a;
  if (ue(t))
    a = r[e] || (r[e] = []), t.forEach(function(l, c) {
      return a.push({
        t: c / (t.length - 1) * 100,
        v: l,
        e: s
      });
    });
  else
    for (o in t)
      a = r[o] || (r[o] = []), o === "ease" || a.push({
        t: parseFloat(e),
        v: t[o],
        e: s
      });
}, jt = function(e, t, r, n, s) {
  return K(e) ? e.call(t, r, n, s) : ae(e) && ~e.indexOf("random(") ? Wt(e) : e;
}, Rs = On + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", Ds = {};
pe(Rs + ",id,stagger,delay,duration,paused,scrollTrigger", function(i) {
  return Ds[i] = 1;
});
var re = /* @__PURE__ */ function(i) {
  Zi(e, i);
  function e(r, n, s, o) {
    var a;
    typeof n == "number" && (s.duration = n, n = s, s = null), a = i.call(this, o ? n : Lt(n)) || this;
    var l = a.vars, c = l.duration, u = l.delay, f = l.immediateRender, p = l.stagger, h = l.overwrite, m = l.keyframes, d = l.defaults, _ = l.scrollTrigger, x = l.yoyoEase, y = n.parent || J, S = (ue(r) || es(r) ? $e(r[0]) : "length" in n) ? [r] : Ce(r), P, w, b, g, v, k, C, M;
    if (a._targets = S.length ? Mn(S) : Yt("GSAP target " + r + " not found. https://gsap.com", !xe.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = h, m || p || lr(c) || lr(u)) {
      if (n = a.vars, P = a.timeline = new de({
        data: "nested",
        defaults: d || {},
        targets: y && y.data === "nested" ? y.vars.targets : S
      }), P.kill(), P.parent = P._dp = Ie(a), P._start = 0, p || lr(c) || lr(u)) {
        if (g = S.length, C = p && bs(p), ze(p))
          for (v in p)
            ~Rs.indexOf(v) && (M || (M = {}), M[v] = p[v]);
        for (w = 0; w < g; w++)
          b = _r(n, Ds), b.stagger = 0, x && (b.yoyoEase = x), M && xt(b, M), k = S[w], b.duration = +jt(c, Ie(a), w, k, S), b.delay = (+jt(u, Ie(a), w, k, S) || 0) - a._delay, !p && g === 1 && b.delay && (a._delay = u = b.delay, a._start += u, b.delay = 0), P.to(k, b, C ? C(w, k, S) : 0), P._ease = j.none;
        P.duration() ? c = u = 0 : a.timeline = 0;
      } else if (m) {
        Lt(ke(P.vars.defaults, {
          ease: "none"
        })), P._ease = ot(m.ease || n.ease || "none");
        var O = 0, A, z, R;
        if (ue(m))
          m.forEach(function(E) {
            return P.to(S, E, ">");
          }), P.duration();
        else {
          b = {};
          for (v in m)
            v === "ease" || v === "easeEach" || Rl(v, m[v], b, m.easeEach);
          for (v in b)
            for (A = b[v].sort(function(E, F) {
              return E.t - F.t;
            }), O = 0, w = 0; w < A.length; w++)
              z = A[w], R = {
                ease: z.e,
                duration: (z.t - (w ? A[w - 1].t : 0)) / 100 * c
              }, R[v] = z.v, P.to(S, R, O), O += R.duration;
          P.duration() < c && P.to({}, {
            duration: c - P.duration()
          });
        }
      }
      c || a.duration(c = P.duration());
    } else
      a.timeline = 0;
    return h === !0 && !wn && (Be = Ie(a), J.killTweensOf(S), Be = 0), Ee(y, Ie(a), s), n.reversed && a.reverse(), n.paused && a.paused(!0), (f || !c && !m && a._start === ne(y._time) && he(f) && ul(Ie(a)) && y.data !== "nested") && (a._tTime = -W, a.render(Math.max(0, -u) || 0)), _ && ps(Ie(a), _), a;
  }
  var t = e.prototype;
  return t.render = function(n, s, o) {
    var a = this._time, l = this._tDur, c = this._dur, u = n < 0, f = n > l - W && !u ? l : n < W ? 0 : n, p, h, m, d, _, x, y, S, P;
    if (!c)
      fl(this, n, s, o);
    else if (f !== this._tTime || !n || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== u || this._lazy) {
      if (p = f, S = this.timeline, this._repeat) {
        if (d = c + this._rDelay, this._repeat < -1 && u)
          return this.totalTime(d * 100 + n, s, o);
        if (p = ne(f % d), f === l ? (m = this._repeat, p = c) : (_ = ne(f / d), m = ~~_, m && m === _ ? (p = c, m--) : p > c && (p = c)), x = this._yoyo && m & 1, x && (P = this._yEase, p = c - p), _ = wt(this._tTime, d), p === a && !o && this._initted && m === _)
          return this._tTime = f, this;
        m !== _ && (S && this._yEase && Ms(S, x), this.vars.repeatRefresh && !x && !this._lock && p !== d && this._initted && (this._lock = o = 1, this.render(ne(d * m), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (ms(this, u ? n : p, o, s, f))
          return this._tTime = 0, this;
        if (a !== this._time && !(o && this.vars.repeatRefresh && m !== _))
          return this;
        if (c !== this._dur)
          return this.render(n, s, o);
      }
      if (this._tTime = f, this._time = p, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = y = (P || this._ease)(p / c), this._from && (this.ratio = y = 1 - y), !a && f && !s && !_ && (ve(this, "onStart"), this._tTime !== f))
        return this;
      for (h = this._pt; h; )
        h.r(y, h.d), h = h._next;
      S && S.render(n < 0 ? n : S._dur * S._ease(p / this._dur), s, o) || this._startAt && (this._zTime = n), this._onUpdate && !s && (u && an(this, n, s, o), ve(this, "onUpdate")), this._repeat && m !== _ && this.vars.onRepeat && !s && this.parent && ve(this, "onRepeat"), (f === this._tDur || !f) && this._tTime === f && (u && !this._onUpdate && an(this, n, !0, !0), (n || !c) && (f === this._tDur && this._ts > 0 || !f && this._ts < 0) && qe(this, 1), !s && !(u && !a) && (f || a || x) && (ve(this, f === l ? "onComplete" : "onReverseComplete", !0), this._prom && !(f < l && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, t.targets = function() {
    return this._targets;
  }, t.invalidate = function(n) {
    return (!n || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(n), i.prototype.invalidate.call(this, n);
  }, t.resetTo = function(n, s, o, a, l) {
    qt || ye.wake(), this._ts || this.play();
    var c = Math.min(this._dur, (this._dp._time - this._start) * this._ts), u;
    return this._initted || zn(this, c), u = this._ease(c / this._dur), Al(this, n, s, o, a, u, c, l) ? this.resetTo(n, s, o, a, 1) : (Sr(this, 0), this.parent || fs(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, t.kill = function(n, s) {
    if (s === void 0 && (s = "all"), !n && (!s || s === "all"))
      return this._lazy = this._pt = 0, this.parent ? Vt(this) : this.scrollTrigger && this.scrollTrigger.kill(!!le), this;
    if (this.timeline) {
      var o = this.timeline.totalDuration();
      return this.timeline.killTweensOf(n, s, Be && Be.vars.overwrite !== !0)._first || Vt(this), this.parent && o !== this.timeline.totalDuration() && kt(this, this._dur * this.timeline._tDur / o, 0, 1), this;
    }
    var a = this._targets, l = n ? Ce(n) : a, c = this._ptLookup, u = this._pt, f, p, h, m, d, _, x;
    if ((!s || s === "all") && ll(a, l))
      return s === "all" && (this._pt = 0), Vt(this);
    for (f = this._op = this._op || [], s !== "all" && (ae(s) && (d = {}, pe(s, function(y) {
      return d[y] = 1;
    }), s = d), s = zl(a, s)), x = a.length; x--; )
      if (~l.indexOf(a[x])) {
        p = c[x], s === "all" ? (f[x] = s, m = p, h = {}) : (h = f[x] = f[x] || {}, m = s);
        for (d in m)
          _ = p && p[d], _ && ((!("kill" in _.d) || _.d.kill(d) === !0) && kr(this, _, "_pt"), delete p[d]), h !== "all" && (h[d] = 1);
      }
    return this._initted && !this._pt && u && Vt(this), this;
  }, e.to = function(n, s) {
    return new e(n, s, arguments[2]);
  }, e.from = function(n, s) {
    return Gt(1, arguments);
  }, e.delayedCall = function(n, s, o, a) {
    return new e(s, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: n,
      onComplete: s,
      onReverseComplete: s,
      onCompleteParams: o,
      onReverseCompleteParams: o,
      callbackScope: a
    });
  }, e.fromTo = function(n, s, o) {
    return Gt(2, arguments);
  }, e.set = function(n, s) {
    return s.duration = 0, s.repeatDelay || (s.repeat = 0), new e(n, s);
  }, e.killTweensOf = function(n, s, o) {
    return J.killTweensOf(n, s, o);
  }, e;
}(Ht);
ke(re.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
pe("staggerTo,staggerFrom,staggerFromTo", function(i) {
  re[i] = function() {
    var e = new de(), t = cn.call(arguments, 0);
    return t.splice(i === "staggerFromTo" ? 5 : 4, 0, 0), e[i].apply(e, t);
  };
});
var Rn = function(e, t, r) {
  return e[t] = r;
}, Ns = function(e, t, r) {
  return e[t](r);
}, Dl = function(e, t, r, n) {
  return e[t](n.fp, r);
}, Nl = function(e, t, r) {
  return e.setAttribute(t, r);
}, Dn = function(e, t) {
  return K(e[t]) ? Ns : kn(e[t]) && e.setAttribute ? Nl : Rn;
}, Is = function(e, t) {
  return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t);
}, Il = function(e, t) {
  return t.set(t.t, t.p, !!(t.s + t.c * e), t);
}, Vs = function(e, t) {
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
}, Nn = function(e, t) {
  for (var r = t._pt; r; )
    r.r(e, r.d), r = r._next;
}, Vl = function(e, t, r, n) {
  for (var s = this._pt, o; s; )
    o = s._next, s.p === n && s.modifier(e, t, r), s = o;
}, Fl = function(e) {
  for (var t = this._pt, r, n; t; )
    n = t._next, t.p === e && !t.op || t.op === e ? kr(this, t, "_pt") : t.dep || (r = 1), t = n;
  return !r;
}, $l = function(e, t, r, n) {
  n.mSet(e, t, n.m.call(n.tween, r, n.mt), n);
}, Fs = function(e) {
  for (var t = e._pt, r, n, s, o; t; ) {
    for (r = t._next, n = s; n && n.pr > t.pr; )
      n = n._next;
    (t._prev = n ? n._prev : o) ? t._prev._next = t : s = t, (t._next = n) ? n._prev = t : o = t, t = r;
  }
  e._pt = s;
}, me = /* @__PURE__ */ function() {
  function i(t, r, n, s, o, a, l, c, u) {
    this.t = r, this.s = s, this.c = o, this.p = n, this.r = a || Is, this.d = l || this, this.set = c || Rn, this.pr = u || 0, this._next = t, t && (t._prev = this);
  }
  var e = i.prototype;
  return e.modifier = function(r, n, s) {
    this.mSet = this.mSet || this.set, this.set = $l, this.m = r, this.mt = s, this.tween = n;
  }, i;
}();
pe(On + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(i) {
  return Cn[i] = 1;
});
we.TweenMax = we.TweenLite = re;
we.TimelineLite = we.TimelineMax = de;
J = new de({
  sortChildren: !1,
  defaults: vt,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
xe.stringFilter = Cs;
var at = [], dr = {}, Ll = [], ci = 0, Gl = 0, $r = function(e) {
  return (dr[e] || Ll).map(function(t) {
    return t();
  });
}, hn = function() {
  var e = Date.now(), t = [];
  e - ci > 2 && ($r("matchMediaInit"), at.forEach(function(r) {
    var n = r.queries, s = r.conditions, o, a, l, c;
    for (a in n)
      o = Me.matchMedia(n[a]).matches, o && (l = 1), o !== s[a] && (s[a] = o, c = 1);
    c && (r.revert(), l && t.push(r));
  }), $r("matchMediaRevert"), t.forEach(function(r) {
    return r.onMatch(r, function(n) {
      return r.add(null, n);
    });
  }), ci = e, $r("matchMedia"));
}, $s = /* @__PURE__ */ function() {
  function i(t, r) {
    this.selector = r && un(r), this.data = [], this._r = [], this.isReverted = !1, this.id = Gl++, t && this.add(t);
  }
  var e = i.prototype;
  return e.add = function(r, n, s) {
    K(r) && (s = n, n = r, r = K);
    var o = this, a = function() {
      var c = Q, u = o.selector, f;
      return c && c !== o && c.data.push(o), s && (o.selector = un(s)), Q = o, f = n.apply(o, arguments), K(f) && o._r.push(f), Q = c, o.selector = u, o.isReverted = !1, f;
    };
    return o.last = a, r === K ? a(o, function(l) {
      return o.add(null, l);
    }) : r ? o[r] = a : a;
  }, e.ignore = function(r) {
    var n = Q;
    Q = null, r(this), Q = n;
  }, e.getTweens = function() {
    var r = [];
    return this.data.forEach(function(n) {
      return n instanceof i ? r.push.apply(r, n.getTweens()) : n instanceof re && !(n.parent && n.parent.data === "nested") && r.push(n);
    }), r;
  }, e.clear = function() {
    this._r.length = this.data.length = 0;
  }, e.kill = function(r, n) {
    var s = this;
    if (r ? function() {
      for (var a = s.getTweens(), l = s.data.length, c; l--; )
        c = s.data[l], c.data === "isFlip" && (c.revert(), c.getChildren(!0, !0, !1).forEach(function(u) {
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
      }), l = s.data.length; l--; )
        c = s.data[l], c instanceof de ? c.data !== "nested" && (c.scrollTrigger && c.scrollTrigger.revert(), c.kill()) : !(c instanceof re) && c.revert && c.revert(r);
      s._r.forEach(function(u) {
        return u(r, s);
      }), s.isReverted = !0;
    }() : this.data.forEach(function(a) {
      return a.kill && a.kill();
    }), this.clear(), n)
      for (var o = at.length; o--; )
        at[o].id === this.id && at.splice(o, 1);
  }, e.revert = function(r) {
    this.kill(r || {});
  }, i;
}(), jl = /* @__PURE__ */ function() {
  function i(t) {
    this.contexts = [], this.scope = t, Q && Q.data.push(this);
  }
  var e = i.prototype;
  return e.add = function(r, n, s) {
    ze(r) || (r = {
      matches: r
    });
    var o = new $s(0, s || this.scope), a = o.conditions = {}, l, c, u;
    Q && !o.selector && (o.selector = Q.selector), this.contexts.push(o), n = o.add("onMatch", n), o.queries = r;
    for (c in r)
      c === "all" ? u = 1 : (l = Me.matchMedia(r[c]), l && (at.indexOf(o) < 0 && at.push(o), (a[c] = l.matches) && (u = 1), l.addListener ? l.addListener(hn) : l.addEventListener("change", hn)));
    return u && n(o, function(f) {
      return o.add(null, f);
    }), this;
  }, e.revert = function(r) {
    this.kill(r || {});
  }, e.kill = function(r) {
    this.contexts.forEach(function(n) {
      return n.kill(r, !0);
    });
  }, i;
}(), br = {
  registerPlugin: function() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    t.forEach(function(n) {
      return Ts(n);
    });
  },
  timeline: function(e) {
    return new de(e);
  },
  getTweensOf: function(e, t) {
    return J.getTweensOf(e, t);
  },
  getProperty: function(e, t, r, n) {
    ae(e) && (e = Ce(e)[0]);
    var s = it(e || {}).get, o = r ? ds : us;
    return r === "native" && (r = ""), e && (t ? o((be[t] && be[t].get || s)(e, t, r, n)) : function(a, l, c) {
      return o((be[a] && be[a].get || s)(e, a, l, c));
    });
  },
  quickSetter: function(e, t, r) {
    if (e = Ce(e), e.length > 1) {
      var n = e.map(function(u) {
        return ge.quickSetter(u, t, r);
      }), s = n.length;
      return function(u) {
        for (var f = s; f--; )
          n[f](u);
      };
    }
    e = e[0] || {};
    var o = be[t], a = it(e), l = a.harness && (a.harness.aliases || {})[t] || t, c = o ? function(u) {
      var f = new o();
      _t._pt = 0, f.init(e, r ? u + r : u, _t, 0, [e]), f.render(1, f), _t._pt && Nn(1, _t);
    } : a.set(e, l);
    return o ? c : function(u) {
      return c(e, l, r ? u + r : u, a, 1);
    };
  },
  quickTo: function(e, t, r) {
    var n, s = ge.to(e, ke((n = {}, n[t] = "+=0.1", n.paused = !0, n.stagger = 0, n), r || {})), o = function(l, c, u) {
      return s.resetTo(t, l, c, u);
    };
    return o.tween = s, o;
  },
  isTweening: function(e) {
    return J.getTweensOf(e, !0).length > 0;
  },
  defaults: function(e) {
    return e && e.ease && (e.ease = ot(e.ease, vt.ease)), ii(vt, e || {});
  },
  config: function(e) {
    return ii(xe, e || {});
  },
  registerEffect: function(e) {
    var t = e.name, r = e.effect, n = e.plugins, s = e.defaults, o = e.extendTimeline;
    (n || "").split(",").forEach(function(a) {
      return a && !be[a] && !we[a] && Yt(t + " effect requires " + a + " plugin.");
    }), Nr[t] = function(a, l, c) {
      return r(Ce(a), ke(l || {}, s), c);
    }, o && (de.prototype[t] = function(a, l, c) {
      return this.add(Nr[t](a, ze(l) ? l : (c = l) && {}, this), c);
    });
  },
  registerEase: function(e, t) {
    j[e] = ot(t);
  },
  parseEase: function(e, t) {
    return arguments.length ? ot(e, t) : j;
  },
  getById: function(e) {
    return J.getById(e);
  },
  exportRoot: function(e, t) {
    e === void 0 && (e = {});
    var r = new de(e), n, s;
    for (r.smoothChildTiming = he(e.smoothChildTiming), J.remove(r), r._dp = 0, r._time = r._tTime = J._time, n = J._first; n; )
      s = n._next, (t || !(!n._dur && n instanceof re && n.vars.onComplete === n._targets[0])) && Ee(r, n, n._start - n._delay), n = s;
    return Ee(J, r, 0), r;
  },
  context: function(e, t) {
    return e ? new $s(e, t) : Q;
  },
  matchMedia: function(e) {
    return new jl(e);
  },
  matchMediaRefresh: function() {
    return at.forEach(function(e) {
      var t = e.conditions, r, n;
      for (n in t)
        t[n] && (t[n] = !1, r = 1);
      r && e.revert();
    }) || hn();
  },
  addEventListener: function(e, t) {
    var r = dr[e] || (dr[e] = []);
    ~r.indexOf(t) || r.push(t);
  },
  removeEventListener: function(e, t) {
    var r = dr[e], n = r && r.indexOf(t);
    n >= 0 && r.splice(n, 1);
  },
  utils: {
    wrap: vl,
    wrapYoyo: xl,
    distribute: bs,
    random: vs,
    snap: ys,
    normalize: yl,
    getUnit: ce,
    clamp: ml,
    splitColor: Ss,
    toArray: Ce,
    selector: un,
    mapRange: ws,
    pipe: gl,
    unitize: bl,
    interpolate: wl,
    shuffle: gs
  },
  install: ss,
  effects: Nr,
  ticker: ye,
  updateRoot: de.updateRoot,
  plugins: be,
  globalTimeline: J,
  core: {
    PropTween: me,
    globals: os,
    Tween: re,
    Timeline: de,
    Animation: Ht,
    getCache: it,
    _removeLinkedListItem: kr,
    reverting: function() {
      return le;
    },
    context: function(e) {
      return e && Q && (Q.data.push(e), e._ctx = Q), Q;
    },
    suppressOverwrites: function(e) {
      return wn = e;
    }
  }
};
pe("to,from,fromTo,delayedCall,set,killTweensOf", function(i) {
  return br[i] = re[i];
});
ye.add(de.updateRoot);
_t = br.to({}, {
  duration: 0
});
var Bl = function(e, t) {
  for (var r = e._pt; r && r.p !== t && r.op !== t && r.fp !== t; )
    r = r._next;
  return r;
}, Ul = function(e, t) {
  var r = e._targets, n, s, o;
  for (n in t)
    for (s = r.length; s--; )
      o = e._ptLookup[s][n], o && (o = o.d) && (o._pt && (o = Bl(o, n)), o && o.modifier && o.modifier(t[n], e, r[s], n));
}, Lr = function(e, t) {
  return {
    name: e,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(n, s, o) {
      o._onInit = function(a) {
        var l, c;
        if (ae(s) && (l = {}, pe(s, function(u) {
          return l[u] = 1;
        }), s = l), t) {
          l = {};
          for (c in s)
            l[c] = t(s[c]);
          s = l;
        }
        Ul(a, s);
      };
    }
  };
}, ge = br.registerPlugin({
  name: "attr",
  init: function(e, t, r, n, s) {
    var o, a, l;
    this.tween = r;
    for (o in t)
      l = e.getAttribute(o) || "", a = this.add(e, "setAttribute", (l || 0) + "", t[o], n, s, 0, 0, o), a.op = o, a.b = l, this._props.push(o);
  },
  render: function(e, t) {
    for (var r = t._pt; r; )
      le ? r.set(r.t, r.p, r.b, r) : r.r(e, r.d), r = r._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(e, t) {
    for (var r = t.length; r--; )
      this.add(e, r, e[r] || 0, t[r], 0, 0, 0, 0, 0, 1);
  }
}, Lr("roundProps", dn), Lr("modifiers"), Lr("snap", ys)) || br;
re.version = de.version = ge.version = "3.13.0";
is = 1;
Tn() && Tt();
j.Power0;
j.Power1;
j.Power2;
j.Power3;
j.Power4;
j.Linear;
j.Quad;
j.Cubic;
j.Quart;
j.Quint;
j.Strong;
j.Elastic;
j.Back;
j.SteppedEase;
j.Bounce;
j.Sine;
j.Expo;
j.Circ;
/*!
 * CSSPlugin 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var ui, Ue, bt, In, nt, di, Vn, Yl = function() {
  return typeof window < "u";
}, Le = {}, rt = 180 / Math.PI, yt = Math.PI / 180, pt = Math.atan2, fi = 1e8, Fn = /([A-Z])/g, Xl = /(left|right|width|margin|padding|x)/i, Wl = /[\s,\(]\S/, Ae = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, pn = function(e, t) {
  return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, ql = function(e, t) {
  return t.set(t.t, t.p, e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, Hl = function(e, t) {
  return t.set(t.t, t.p, e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t);
}, Ql = function(e, t) {
  var r = t.s + t.c * e;
  t.set(t.t, t.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + t.u, t);
}, Ls = function(e, t) {
  return t.set(t.t, t.p, e ? t.e : t.b, t);
}, Gs = function(e, t) {
  return t.set(t.t, t.p, e !== 1 ? t.b : t.e, t);
}, Jl = function(e, t, r) {
  return e.style[t] = r;
}, Zl = function(e, t, r) {
  return e.style.setProperty(t, r);
}, Kl = function(e, t, r) {
  return e._gsap[t] = r;
}, ec = function(e, t, r) {
  return e._gsap.scaleX = e._gsap.scaleY = r;
}, tc = function(e, t, r, n, s) {
  var o = e._gsap;
  o.scaleX = o.scaleY = r, o.renderTransform(s, o);
}, rc = function(e, t, r, n, s) {
  var o = e._gsap;
  o[t] = r, o.renderTransform(s, o);
}, Z = "transform", _e = Z + "Origin", nc = function i(e, t) {
  var r = this, n = this.target, s = n.style, o = n._gsap;
  if (e in Le && s) {
    if (this.tfm = this.tfm || {}, e !== "transform")
      e = Ae[e] || e, ~e.indexOf(",") ? e.split(",").forEach(function(a) {
        return r.tfm[a] = Ve(n, a);
      }) : this.tfm[e] = o.x ? o[e] : Ve(n, e), e === _e && (this.tfm.zOrigin = o.zOrigin);
    else
      return Ae.transform.split(",").forEach(function(a) {
        return i.call(r, a, t);
      });
    if (this.props.indexOf(Z) >= 0)
      return;
    o.svg && (this.svgo = n.getAttribute("data-svg-origin"), this.props.push(_e, t, "")), e = Z;
  }
  (s || t) && this.props.push(e, t, s[e]);
}, js = function(e) {
  e.translate && (e.removeProperty("translate"), e.removeProperty("scale"), e.removeProperty("rotate"));
}, ic = function() {
  var e = this.props, t = this.target, r = t.style, n = t._gsap, s, o;
  for (s = 0; s < e.length; s += 3)
    e[s + 1] ? e[s + 1] === 2 ? t[e[s]](e[s + 2]) : t[e[s]] = e[s + 2] : e[s + 2] ? r[e[s]] = e[s + 2] : r.removeProperty(e[s].substr(0, 2) === "--" ? e[s] : e[s].replace(Fn, "-$1").toLowerCase());
  if (this.tfm) {
    for (o in this.tfm)
      n[o] = this.tfm[o];
    n.svg && (n.renderTransform(), t.setAttribute("data-svg-origin", this.svgo || "")), s = Vn(), (!s || !s.isStart) && !r[Z] && (js(r), n.zOrigin && r[_e] && (r[_e] += " " + n.zOrigin + "px", n.zOrigin = 0, n.renderTransform()), n.uncache = 1);
  }
}, Bs = function(e, t) {
  var r = {
    target: e,
    props: [],
    revert: ic,
    save: nc
  };
  return e._gsap || ge.core.getCache(e), t && e.style && e.nodeType && t.split(",").forEach(function(n) {
    return r.save(n);
  }), r;
}, Us, mn = function(e, t) {
  var r = Ue.createElementNS ? Ue.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : Ue.createElement(e);
  return r && r.style ? r : Ue.createElement(e);
}, Oe = function i(e, t, r) {
  var n = getComputedStyle(e);
  return n[t] || n.getPropertyValue(t.replace(Fn, "-$1").toLowerCase()) || n.getPropertyValue(t) || !r && i(e, St(t) || t, 1) || "";
}, hi = "O,Moz,ms,Ms,Webkit".split(","), St = function(e, t, r) {
  var n = t || nt, s = n.style, o = 5;
  if (e in s && !r)
    return e;
  for (e = e.charAt(0).toUpperCase() + e.substr(1); o-- && !(hi[o] + e in s); )
    ;
  return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? hi[o] : "") + e;
}, _n = function() {
  Yl() && window.document && (ui = window, Ue = ui.document, bt = Ue.documentElement, nt = mn("div") || {
    style: {}
  }, mn("div"), Z = St(Z), _e = Z + "Origin", nt.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Us = !!St("perspective"), Vn = ge.core.reverting, In = 1);
}, pi = function(e) {
  var t = e.ownerSVGElement, r = mn("svg", t && t.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), n = e.cloneNode(!0), s;
  n.style.display = "block", r.appendChild(n), bt.appendChild(r);
  try {
    s = n.getBBox();
  } catch {
  }
  return r.removeChild(n), bt.removeChild(r), s;
}, mi = function(e, t) {
  for (var r = t.length; r--; )
    if (e.hasAttribute(t[r]))
      return e.getAttribute(t[r]);
}, Ys = function(e) {
  var t, r;
  try {
    t = e.getBBox();
  } catch {
    t = pi(e), r = 1;
  }
  return t && (t.width || t.height) || r || (t = pi(e)), t && !t.width && !t.x && !t.y ? {
    x: +mi(e, ["x", "cx", "x1"]) || 0,
    y: +mi(e, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : t;
}, Xs = function(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && Ys(e));
}, ct = function(e, t) {
  if (t) {
    var r = e.style, n;
    t in Le && t !== _e && (t = Z), r.removeProperty ? (n = t.substr(0, 2), (n === "ms" || t.substr(0, 6) === "webkit") && (t = "-" + t), r.removeProperty(n === "--" ? t : t.replace(Fn, "-$1").toLowerCase())) : r.removeAttribute(t);
  }
}, Ye = function(e, t, r, n, s, o) {
  var a = new me(e._pt, t, r, 0, 1, o ? Gs : Ls);
  return e._pt = a, a.b = n, a.e = s, e._props.push(r), a;
}, _i = {
  deg: 1,
  rad: 1,
  turn: 1
}, sc = {
  grid: 1,
  flex: 1
}, He = function i(e, t, r, n) {
  var s = parseFloat(r) || 0, o = (r + "").trim().substr((s + "").length) || "px", a = nt.style, l = Xl.test(t), c = e.tagName.toLowerCase() === "svg", u = (c ? "client" : "offset") + (l ? "Width" : "Height"), f = 100, p = n === "px", h = n === "%", m, d, _, x;
  if (n === o || !s || _i[n] || _i[o])
    return s;
  if (o !== "px" && !p && (s = i(e, t, r, "px")), x = e.getCTM && Xs(e), (h || o === "%") && (Le[t] || ~t.indexOf("adius")))
    return m = x ? e.getBBox()[l ? "width" : "height"] : e[u], te(h ? s / m * f : s / 100 * m);
  if (a[l ? "width" : "height"] = f + (p ? o : n), d = n !== "rem" && ~t.indexOf("adius") || n === "em" && e.appendChild && !c ? e : e.parentNode, x && (d = (e.ownerSVGElement || {}).parentNode), (!d || d === Ue || !d.appendChild) && (d = Ue.body), _ = d._gsap, _ && h && _.width && l && _.time === ye.time && !_.uncache)
    return te(s / _.width * f);
  if (h && (t === "height" || t === "width")) {
    var y = e.style[t];
    e.style[t] = f + n, m = e[u], y ? e.style[t] = y : ct(e, t);
  } else
    (h || o === "%") && !sc[Oe(d, "display")] && (a.position = Oe(e, "position")), d === e && (a.position = "static"), d.appendChild(nt), m = nt[u], d.removeChild(nt), a.position = "absolute";
  return l && h && (_ = it(d), _.time = ye.time, _.width = d[u]), te(p ? m * s / f : m && s ? f / m * s : 0);
}, Ve = function(e, t, r, n) {
  var s;
  return In || _n(), t in Ae && t !== "transform" && (t = Ae[t], ~t.indexOf(",") && (t = t.split(",")[0])), Le[t] && t !== "transform" ? (s = Jt(e, n), s = t !== "transformOrigin" ? s[t] : s.svg ? s.origin : vr(Oe(e, _e)) + " " + s.zOrigin + "px") : (s = e.style[t], (!s || s === "auto" || n || ~(s + "").indexOf("calc(")) && (s = yr[t] && yr[t](e, t, r) || Oe(e, t) || ls(e, t) || (t === "opacity" ? 1 : 0))), r && !~(s + "").trim().indexOf(" ") ? He(e, t, s, r) + r : s;
}, oc = function(e, t, r, n) {
  if (!r || r === "none") {
    var s = St(t, e, 1), o = s && Oe(e, s, 1);
    o && o !== r ? (t = s, r = o) : t === "borderColor" && (r = Oe(e, "borderTopColor"));
  }
  var a = new me(this._pt, e.style, t, 0, 1, Vs), l = 0, c = 0, u, f, p, h, m, d, _, x, y, S, P, w;
  if (a.b = r, a.e = n, r += "", n += "", n.substring(0, 6) === "var(--" && (n = Oe(e, n.substring(4, n.indexOf(")")))), n === "auto" && (d = e.style[t], e.style[t] = n, n = Oe(e, t) || n, d ? e.style[t] = d : ct(e, t)), u = [r, n], Cs(u), r = u[0], n = u[1], p = r.match(mt) || [], w = n.match(mt) || [], w.length) {
    for (; f = mt.exec(n); )
      _ = f[0], y = n.substring(l, f.index), m ? m = (m + 1) % 5 : (y.substr(-5) === "rgba(" || y.substr(-5) === "hsla(") && (m = 1), _ !== (d = p[c++] || "") && (h = parseFloat(d) || 0, P = d.substr((h + "").length), _.charAt(1) === "=" && (_ = gt(h, _) + P), x = parseFloat(_), S = _.substr((x + "").length), l = mt.lastIndex - S.length, S || (S = S || xe.units[t] || P, l === n.length && (n += S, a.e += S)), P !== S && (h = He(e, t, d, S) || 0), a._pt = {
        _next: a._pt,
        p: y || c === 1 ? y : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: h,
        c: x - h,
        m: m && m < 4 || t === "zIndex" ? Math.round : 0
      });
    a.c = l < n.length ? n.substring(l, n.length) : "";
  } else
    a.r = t === "display" && n === "none" ? Gs : Ls;
  return rs.test(n) && (a.e = 0), this._pt = a, a;
}, gi = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, ac = function(e) {
  var t = e.split(" "), r = t[0], n = t[1] || "50%";
  return (r === "top" || r === "bottom" || n === "left" || n === "right") && (e = r, r = n, n = e), t[0] = gi[r] || r, t[1] = gi[n] || n, t.join(" ");
}, lc = function(e, t) {
  if (t.tween && t.tween._time === t.tween._dur) {
    var r = t.t, n = r.style, s = t.u, o = r._gsap, a, l, c;
    if (s === "all" || s === !0)
      n.cssText = "", l = 1;
    else
      for (s = s.split(","), c = s.length; --c > -1; )
        a = s[c], Le[a] && (l = 1, a = a === "transformOrigin" ? _e : Z), ct(r, a);
    l && (ct(r, Z), o && (o.svg && r.removeAttribute("transform"), n.scale = n.rotate = n.translate = "none", Jt(r, 1), o.uncache = 1, js(n)));
  }
}, yr = {
  clearProps: function(e, t, r, n, s) {
    if (s.data !== "isFromStart") {
      var o = e._pt = new me(e._pt, t, r, 0, 0, lc);
      return o.u = n, o.pr = -10, o.tween = s, e._props.push(r), 1;
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
}, Qt = [1, 0, 0, 1, 0, 0], Ws = {}, qs = function(e) {
  return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
}, bi = function(e) {
  var t = Oe(e, Z);
  return qs(t) ? Qt : t.substr(7).match(ts).map(te);
}, $n = function(e, t) {
  var r = e._gsap || it(e), n = e.style, s = bi(e), o, a, l, c;
  return r.svg && e.getAttribute("transform") ? (l = e.transform.baseVal.consolidate().matrix, s = [l.a, l.b, l.c, l.d, l.e, l.f], s.join(",") === "1,0,0,1,0,0" ? Qt : s) : (s === Qt && !e.offsetParent && e !== bt && !r.svg && (l = n.display, n.display = "block", o = e.parentNode, (!o || !e.offsetParent && !e.getBoundingClientRect().width) && (c = 1, a = e.nextElementSibling, bt.appendChild(e)), s = bi(e), l ? n.display = l : ct(e, "display"), c && (a ? o.insertBefore(e, a) : o ? o.appendChild(e) : bt.removeChild(e))), t && s.length > 6 ? [s[0], s[1], s[4], s[5], s[12], s[13]] : s);
}, gn = function(e, t, r, n, s, o) {
  var a = e._gsap, l = s || $n(e, !0), c = a.xOrigin || 0, u = a.yOrigin || 0, f = a.xOffset || 0, p = a.yOffset || 0, h = l[0], m = l[1], d = l[2], _ = l[3], x = l[4], y = l[5], S = t.split(" "), P = parseFloat(S[0]) || 0, w = parseFloat(S[1]) || 0, b, g, v, k;
  r ? l !== Qt && (g = h * _ - m * d) && (v = P * (_ / g) + w * (-d / g) + (d * y - _ * x) / g, k = P * (-m / g) + w * (h / g) - (h * y - m * x) / g, P = v, w = k) : (b = Ys(e), P = b.x + (~S[0].indexOf("%") ? P / 100 * b.width : P), w = b.y + (~(S[1] || S[0]).indexOf("%") ? w / 100 * b.height : w)), n || n !== !1 && a.smooth ? (x = P - c, y = w - u, a.xOffset = f + (x * h + y * d) - x, a.yOffset = p + (x * m + y * _) - y) : a.xOffset = a.yOffset = 0, a.xOrigin = P, a.yOrigin = w, a.smooth = !!n, a.origin = t, a.originIsAbsolute = !!r, e.style[_e] = "0px 0px", o && (Ye(o, a, "xOrigin", c, P), Ye(o, a, "yOrigin", u, w), Ye(o, a, "xOffset", f, a.xOffset), Ye(o, a, "yOffset", p, a.yOffset)), e.setAttribute("data-svg-origin", P + " " + w);
}, Jt = function(e, t) {
  var r = e._gsap || new As(e);
  if ("x" in r && !t && !r.uncache)
    return r;
  var n = e.style, s = r.scaleX < 0, o = "px", a = "deg", l = getComputedStyle(e), c = Oe(e, _e) || "0", u, f, p, h, m, d, _, x, y, S, P, w, b, g, v, k, C, M, O, A, z, R, E, F, T, $, U, se, Y, q, B, ee;
  return u = f = p = d = _ = x = y = S = P = 0, h = m = 1, r.svg = !!(e.getCTM && Xs(e)), l.translate && ((l.translate !== "none" || l.scale !== "none" || l.rotate !== "none") && (n[Z] = (l.translate !== "none" ? "translate3d(" + (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") + (l.scale !== "none" ? "scale(" + l.scale.split(" ").join(",") + ") " : "") + (l[Z] !== "none" ? l[Z] : "")), n.scale = n.rotate = n.translate = "none"), g = $n(e, r.svg), r.svg && (r.uncache ? (T = e.getBBox(), c = r.xOrigin - T.x + "px " + (r.yOrigin - T.y) + "px", F = "") : F = !t && e.getAttribute("data-svg-origin"), gn(e, F || c, !!F || r.originIsAbsolute, r.smooth !== !1, g)), w = r.xOrigin || 0, b = r.yOrigin || 0, g !== Qt && (M = g[0], O = g[1], A = g[2], z = g[3], u = R = g[4], f = E = g[5], g.length === 6 ? (h = Math.sqrt(M * M + O * O), m = Math.sqrt(z * z + A * A), d = M || O ? pt(O, M) * rt : 0, y = A || z ? pt(A, z) * rt + d : 0, y && (m *= Math.abs(Math.cos(y * yt))), r.svg && (u -= w - (w * M + b * A), f -= b - (w * O + b * z))) : (ee = g[6], q = g[7], U = g[8], se = g[9], Y = g[10], B = g[11], u = g[12], f = g[13], p = g[14], v = pt(ee, Y), _ = v * rt, v && (k = Math.cos(-v), C = Math.sin(-v), F = R * k + U * C, T = E * k + se * C, $ = ee * k + Y * C, U = R * -C + U * k, se = E * -C + se * k, Y = ee * -C + Y * k, B = q * -C + B * k, R = F, E = T, ee = $), v = pt(-A, Y), x = v * rt, v && (k = Math.cos(-v), C = Math.sin(-v), F = M * k - U * C, T = O * k - se * C, $ = A * k - Y * C, B = z * C + B * k, M = F, O = T, A = $), v = pt(O, M), d = v * rt, v && (k = Math.cos(v), C = Math.sin(v), F = M * k + O * C, T = R * k + E * C, O = O * k - M * C, E = E * k - R * C, M = F, R = T), _ && Math.abs(_) + Math.abs(d) > 359.9 && (_ = d = 0, x = 180 - x), h = te(Math.sqrt(M * M + O * O + A * A)), m = te(Math.sqrt(E * E + ee * ee)), v = pt(R, E), y = Math.abs(v) > 2e-4 ? v * rt : 0, P = B ? 1 / (B < 0 ? -B : B) : 0), r.svg && (F = e.getAttribute("transform"), r.forceCSS = e.setAttribute("transform", "") || !qs(Oe(e, Z)), F && e.setAttribute("transform", F))), Math.abs(y) > 90 && Math.abs(y) < 270 && (s ? (h *= -1, y += d <= 0 ? 180 : -180, d += d <= 0 ? 180 : -180) : (m *= -1, y += y <= 0 ? 180 : -180)), t = t || r.uncache, r.x = u - ((r.xPercent = u && (!t && r.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-u) ? -50 : 0))) ? e.offsetWidth * r.xPercent / 100 : 0) + o, r.y = f - ((r.yPercent = f && (!t && r.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-f) ? -50 : 0))) ? e.offsetHeight * r.yPercent / 100 : 0) + o, r.z = p + o, r.scaleX = te(h), r.scaleY = te(m), r.rotation = te(d) + a, r.rotationX = te(_) + a, r.rotationY = te(x) + a, r.skewX = y + a, r.skewY = S + a, r.transformPerspective = P + o, (r.zOrigin = parseFloat(c.split(" ")[2]) || !t && r.zOrigin || 0) && (n[_e] = vr(c)), r.xOffset = r.yOffset = 0, r.force3D = xe.force3D, r.renderTransform = r.svg ? uc : Us ? Hs : cc, r.uncache = 0, r;
}, vr = function(e) {
  return (e = e.split(" "))[0] + " " + e[1];
}, Gr = function(e, t, r) {
  var n = ce(t);
  return te(parseFloat(t) + parseFloat(He(e, "x", r + "px", n))) + n;
}, cc = function(e, t) {
  t.z = "0px", t.rotationY = t.rotationX = "0deg", t.force3D = 0, Hs(e, t);
}, et = "0deg", zt = "0px", tt = ") ", Hs = function(e, t) {
  var r = t || this, n = r.xPercent, s = r.yPercent, o = r.x, a = r.y, l = r.z, c = r.rotation, u = r.rotationY, f = r.rotationX, p = r.skewX, h = r.skewY, m = r.scaleX, d = r.scaleY, _ = r.transformPerspective, x = r.force3D, y = r.target, S = r.zOrigin, P = "", w = x === "auto" && e && e !== 1 || x === !0;
  if (S && (f !== et || u !== et)) {
    var b = parseFloat(u) * yt, g = Math.sin(b), v = Math.cos(b), k;
    b = parseFloat(f) * yt, k = Math.cos(b), o = Gr(y, o, g * k * -S), a = Gr(y, a, -Math.sin(b) * -S), l = Gr(y, l, v * k * -S + S);
  }
  _ !== zt && (P += "perspective(" + _ + tt), (n || s) && (P += "translate(" + n + "%, " + s + "%) "), (w || o !== zt || a !== zt || l !== zt) && (P += l !== zt || w ? "translate3d(" + o + ", " + a + ", " + l + ") " : "translate(" + o + ", " + a + tt), c !== et && (P += "rotate(" + c + tt), u !== et && (P += "rotateY(" + u + tt), f !== et && (P += "rotateX(" + f + tt), (p !== et || h !== et) && (P += "skew(" + p + ", " + h + tt), (m !== 1 || d !== 1) && (P += "scale(" + m + ", " + d + tt), y.style[Z] = P || "translate(0, 0)";
}, uc = function(e, t) {
  var r = t || this, n = r.xPercent, s = r.yPercent, o = r.x, a = r.y, l = r.rotation, c = r.skewX, u = r.skewY, f = r.scaleX, p = r.scaleY, h = r.target, m = r.xOrigin, d = r.yOrigin, _ = r.xOffset, x = r.yOffset, y = r.forceCSS, S = parseFloat(o), P = parseFloat(a), w, b, g, v, k;
  l = parseFloat(l), c = parseFloat(c), u = parseFloat(u), u && (u = parseFloat(u), c += u, l += u), l || c ? (l *= yt, c *= yt, w = Math.cos(l) * f, b = Math.sin(l) * f, g = Math.sin(l - c) * -p, v = Math.cos(l - c) * p, c && (u *= yt, k = Math.tan(c - u), k = Math.sqrt(1 + k * k), g *= k, v *= k, u && (k = Math.tan(u), k = Math.sqrt(1 + k * k), w *= k, b *= k)), w = te(w), b = te(b), g = te(g), v = te(v)) : (w = f, v = p, b = g = 0), (S && !~(o + "").indexOf("px") || P && !~(a + "").indexOf("px")) && (S = He(h, "x", o, "px"), P = He(h, "y", a, "px")), (m || d || _ || x) && (S = te(S + m - (m * w + d * g) + _), P = te(P + d - (m * b + d * v) + x)), (n || s) && (k = h.getBBox(), S = te(S + n / 100 * k.width), P = te(P + s / 100 * k.height)), k = "matrix(" + w + "," + b + "," + g + "," + v + "," + S + "," + P + ")", h.setAttribute("transform", k), y && (h.style[Z] = k);
}, dc = function(e, t, r, n, s) {
  var o = 360, a = ae(s), l = parseFloat(s) * (a && ~s.indexOf("rad") ? rt : 1), c = l - n, u = n + c + "deg", f, p;
  return a && (f = s.split("_")[1], f === "short" && (c %= o, c !== c % (o / 2) && (c += c < 0 ? o : -o)), f === "cw" && c < 0 ? c = (c + o * fi) % o - ~~(c / o) * o : f === "ccw" && c > 0 && (c = (c - o * fi) % o - ~~(c / o) * o)), e._pt = p = new me(e._pt, t, r, n, c, ql), p.e = u, p.u = "deg", e._props.push(r), p;
}, yi = function(e, t) {
  for (var r in t)
    e[r] = t[r];
  return e;
}, fc = function(e, t, r) {
  var n = yi({}, r._gsap), s = "perspective,force3D,transformOrigin,svgOrigin", o = r.style, a, l, c, u, f, p, h, m;
  n.svg ? (c = r.getAttribute("transform"), r.setAttribute("transform", ""), o[Z] = t, a = Jt(r, 1), ct(r, Z), r.setAttribute("transform", c)) : (c = getComputedStyle(r)[Z], o[Z] = t, a = Jt(r, 1), o[Z] = c);
  for (l in Le)
    c = n[l], u = a[l], c !== u && s.indexOf(l) < 0 && (h = ce(c), m = ce(u), f = h !== m ? He(r, l, c, m) : parseFloat(c), p = parseFloat(u), e._pt = new me(e._pt, a, l, f, p - f, pn), e._pt.u = m || 0, e._props.push(l));
  yi(a, n);
};
pe("padding,margin,Width,Radius", function(i, e) {
  var t = "Top", r = "Right", n = "Bottom", s = "Left", o = (e < 3 ? [t, r, n, s] : [t + s, t + r, n + r, n + s]).map(function(a) {
    return e < 2 ? i + a : "border" + a + i;
  });
  yr[e > 1 ? "border" + i : i] = function(a, l, c, u, f) {
    var p, h;
    if (arguments.length < 4)
      return p = o.map(function(m) {
        return Ve(a, m, c);
      }), h = p.join(" "), h.split(p[0]).length === 5 ? p[0] : h;
    p = (u + "").split(" "), h = {}, o.forEach(function(m, d) {
      return h[m] = p[d] = p[d] || p[(d - 1) / 2 | 0];
    }), a.init(l, h, f);
  };
});
var Qs = {
  name: "css",
  register: _n,
  targetTest: function(e) {
    return e.style && e.nodeType;
  },
  init: function(e, t, r, n, s) {
    var o = this._props, a = e.style, l = r.vars.startAt, c, u, f, p, h, m, d, _, x, y, S, P, w, b, g, v;
    In || _n(), this.styles = this.styles || Bs(e), v = this.styles.props, this.tween = r;
    for (d in t)
      if (d !== "autoRound" && (u = t[d], !(be[d] && zs(d, t, r, n, e, s)))) {
        if (h = typeof u, m = yr[d], h === "function" && (u = u.call(r, n, e, s), h = typeof u), h === "string" && ~u.indexOf("random(") && (u = Wt(u)), m)
          m(this, e, d, u, r) && (g = 1);
        else if (d.substr(0, 2) === "--")
          c = (getComputedStyle(e).getPropertyValue(d) + "").trim(), u += "", We.lastIndex = 0, We.test(c) || (_ = ce(c), x = ce(u)), x ? _ !== x && (c = He(e, d, c, x) + x) : _ && (u += _), this.add(a, "setProperty", c, u, n, s, 0, 0, d), o.push(d), v.push(d, 0, a[d]);
        else if (h !== "undefined") {
          if (l && d in l ? (c = typeof l[d] == "function" ? l[d].call(r, n, e, s) : l[d], ae(c) && ~c.indexOf("random(") && (c = Wt(c)), ce(c + "") || c === "auto" || (c += xe.units[d] || ce(Ve(e, d)) || ""), (c + "").charAt(1) === "=" && (c = Ve(e, d))) : c = Ve(e, d), p = parseFloat(c), y = h === "string" && u.charAt(1) === "=" && u.substr(0, 2), y && (u = u.substr(2)), f = parseFloat(u), d in Ae && (d === "autoAlpha" && (p === 1 && Ve(e, "visibility") === "hidden" && f && (p = 0), v.push("visibility", 0, a.visibility), Ye(this, a, "visibility", p ? "inherit" : "hidden", f ? "inherit" : "hidden", !f)), d !== "scale" && d !== "transform" && (d = Ae[d], ~d.indexOf(",") && (d = d.split(",")[0]))), S = d in Le, S) {
            if (this.styles.save(d), h === "string" && u.substring(0, 6) === "var(--" && (u = Oe(e, u.substring(4, u.indexOf(")"))), f = parseFloat(u)), P || (w = e._gsap, w.renderTransform && !t.parseTransform || Jt(e, t.parseTransform), b = t.smoothOrigin !== !1 && w.smooth, P = this._pt = new me(this._pt, a, Z, 0, 1, w.renderTransform, w, 0, -1), P.dep = 1), d === "scale")
              this._pt = new me(this._pt, w, "scaleY", w.scaleY, (y ? gt(w.scaleY, y + f) : f) - w.scaleY || 0, pn), this._pt.u = 0, o.push("scaleY", d), d += "X";
            else if (d === "transformOrigin") {
              v.push(_e, 0, a[_e]), u = ac(u), w.svg ? gn(e, u, 0, b, 0, this) : (x = parseFloat(u.split(" ")[2]) || 0, x !== w.zOrigin && Ye(this, w, "zOrigin", w.zOrigin, x), Ye(this, a, d, vr(c), vr(u)));
              continue;
            } else if (d === "svgOrigin") {
              gn(e, u, 1, b, 0, this);
              continue;
            } else if (d in Ws) {
              dc(this, w, d, p, y ? gt(p, y + u) : u);
              continue;
            } else if (d === "smoothOrigin") {
              Ye(this, w, "smooth", w.smooth, u);
              continue;
            } else if (d === "force3D") {
              w[d] = u;
              continue;
            } else if (d === "transform") {
              fc(this, u, e);
              continue;
            }
          } else d in a || (d = St(d) || d);
          if (S || (f || f === 0) && (p || p === 0) && !Wl.test(u) && d in a)
            _ = (c + "").substr((p + "").length), f || (f = 0), x = ce(u) || (d in xe.units ? xe.units[d] : _), _ !== x && (p = He(e, d, c, x)), this._pt = new me(this._pt, S ? w : a, d, p, (y ? gt(p, y + f) : f) - p, !S && (x === "px" || d === "zIndex") && t.autoRound !== !1 ? Ql : pn), this._pt.u = x || 0, _ !== x && x !== "%" && (this._pt.b = c, this._pt.r = Hl);
          else if (d in a)
            oc.call(this, e, d, c, y ? y + u : u);
          else if (d in e)
            this.add(e, d, c || e[d], y ? y + u : u, n, s);
          else if (d !== "parseTransform") {
            Pn(d, u);
            continue;
          }
          S || (d in a ? v.push(d, 0, a[d]) : typeof e[d] == "function" ? v.push(d, 2, e[d]()) : v.push(d, 1, c || e[d])), o.push(d);
        }
      }
    g && Fs(this);
  },
  render: function(e, t) {
    if (t.tween._time || !Vn())
      for (var r = t._pt; r; )
        r.r(e, r.d), r = r._next;
    else
      t.styles.revert();
  },
  get: Ve,
  aliases: Ae,
  getSetter: function(e, t, r) {
    var n = Ae[t];
    return n && n.indexOf(",") < 0 && (t = n), t in Le && t !== _e && (e._gsap.x || Ve(e, "x")) ? r && di === r ? t === "scale" ? ec : Kl : (di = r || {}) && (t === "scale" ? tc : rc) : e.style && !kn(e.style[t]) ? Jl : ~t.indexOf("-") ? Zl : Dn(e, t);
  },
  core: {
    _removeProperty: ct,
    _getMatrix: $n
  }
};
ge.utils.checkPrefix = St;
ge.core.getStyleSaver = Bs;
(function(i, e, t, r) {
  var n = pe(i + "," + e + "," + t, function(s) {
    Le[s] = 1;
  });
  pe(e, function(s) {
    xe.units[s] = "deg", Ws[s] = 1;
  }), Ae[n[13]] = i + "," + e, pe(r, function(s) {
    var o = s.split(":");
    Ae[o[1]] = n[o[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
pe("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(i) {
  xe.units[i] = "px";
});
ge.registerPlugin(Qs);
var fr = ge.registerPlugin(Qs) || ge;
fr.core.Tween;
function gc(i, e = {}) {
  const t = Fe(!1), r = Fe({ x: 0, y: 0 }), n = Fe({ x: 0, y: 0 });
  let s = {
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    isEnabled: !0
  };
  const o = (h, m) => {
    const d = Date.now(), _ = Math.max(1, d - s.lastTime);
    n.value = {
      x: (h - s.lastX) / _ * 1e3,
      y: (m - s.lastY) / _ * 1e3
    }, s.lastX = h, s.lastY = m, s.lastTime = d;
  }, a = (h) => {
    var d;
    if (!s.isEnabled || !i.value) return;
    h.preventDefault(), t.value = !0;
    const m = i.value.getBoundingClientRect();
    s.startX = h.clientX - m.left, s.startY = h.clientY - m.top, s.lastX = h.clientX, s.lastY = h.clientY, s.lastTime = Date.now(), (d = e.onDragStart) == null || d.call(e), document.addEventListener("mousemove", l), document.addEventListener("mouseup", c);
  }, l = (h) => {
    var y;
    if (!t.value || !i.value) return;
    const m = h.clientX - s.startX, d = h.clientY - s.startY;
    let _ = m, x = d;
    if (e.bounds === "body") {
      const S = i.value.getBoundingClientRect();
      _ = Math.max(0, Math.min(window.innerWidth - S.width, m)), x = Math.max(0, Math.min(window.innerHeight - S.height, d));
    }
    r.value = { x: _, y: x }, o(h.clientX, h.clientY), fr.set(i.value, {
      x: _,
      y: x
    }), (y = e.onDrag) == null || y.call(e, r.value);
  }, c = () => {
    var h;
    if (t.value) {
      if (t.value = !1, e.inertia && i.value) {
        const m = Math.sqrt(n.value.x ** 2 + n.value.y ** 2);
        if (m > 100) {
          const d = Math.min(2, m / 1e3), _ = r.value.x + n.value.x * d * 0.3, x = r.value.y + n.value.y * d * 0.3;
          fr.to(i.value, {
            x: _,
            y: x,
            duration: d,
            ease: "power2.out",
            onUpdate: () => {
              if (i.value) {
                const y = fr.getProperty(i.value, "transform"), S = new DOMMatrix(y);
                r.value = { x: S.e, y: S.f };
              }
            }
          });
        }
      }
      n.value = { x: 0, y: 0 }, (h = e.onDragEnd) == null || h.call(e), document.removeEventListener("mousemove", l), document.removeEventListener("mouseup", c);
    }
  }, u = () => {
    s.isEnabled = !0;
  }, f = () => {
    s.isEnabled = !1, t.value && c();
  }, p = () => {
    f(), i.value && i.value.removeEventListener("mousedown", a);
  };
  return po(() => {
    i.value && i.value.addEventListener("mousedown", a);
  }), mo(() => {
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
  pc as Button,
  mc as FloatingDock,
  ca as buttonVariants,
  Kr as cn,
  _c as useDockStore,
  gc as useDraggable
};

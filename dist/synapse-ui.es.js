import { defineComponent as fn, mergeModels as ns, useModel as Fl, createElementBlock as we, openBlock as ke, normalizeClass as ki, unref as wt, renderSlot as St, hasInjectionContext as Bl, inject as Gl, getCurrentInstance as Xl, ref as Ne, reactive as Yl, markRaw as si, effectScope as jl, isRef as Ti, isReactive as ko, toRef as kn, toRaw as Wl, nextTick as os, computed as bt, getCurrentScope as Ul, onScopeDispose as Hl, watch as ql, toRefs as ss, onMounted as dn, onUnmounted as qs, createCommentVNode as Mt, createElementVNode as te, createTextVNode as To, Fragment as Qs, renderList as Ks, toDisplayString as hr, normalizeStyle as Vi } from "vue";
var as = (n) => typeof n == "boolean" ? `${n}` : n === 0 ? "0" : n, Be = (n) => !n || typeof n != "object" || Object.keys(n).length === 0, Ql = (n, e) => JSON.stringify(n) === JSON.stringify(e);
function Zs(n, e) {
  n.forEach(function(t) {
    Array.isArray(t) ? Zs(t, e) : e.push(t);
  });
}
function Js(n) {
  let e = [];
  return Zs(n, e), e;
}
var ea = (...n) => Js(n).filter(Boolean), ta = (n, e) => {
  let t = {}, r = Object.keys(n), i = Object.keys(e);
  for (let o of r) if (i.includes(o)) {
    let s = n[o], a = e[o];
    Array.isArray(s) || Array.isArray(a) ? t[o] = ea(a, s) : typeof s == "object" && typeof a == "object" ? t[o] = ta(s, a) : t[o] = a + " " + s;
  } else t[o] = n[o];
  for (let o of i) r.includes(o) || (t[o] = e[o]);
  return t;
}, ls = (n) => !n || typeof n != "string" ? n : n.replace(/\s+/g, " ").trim();
const Po = "-", Kl = (n) => {
  const e = Jl(n), {
    conflictingClassGroups: t,
    conflictingClassGroupModifiers: r
  } = n;
  return {
    getClassGroupId: (s) => {
      const a = s.split(Po);
      return a[0] === "" && a.length !== 1 && a.shift(), ra(a, e) || Zl(s);
    },
    getConflictingClassGroupIds: (s, a) => {
      const c = t[s] || [];
      return a && r[s] ? [...c, ...r[s]] : c;
    }
  };
}, ra = (n, e) => {
  if (n.length === 0)
    return e.classGroupId;
  const t = n[0], r = e.nextPart.get(t), i = r ? ra(n.slice(1), r) : void 0;
  if (i)
    return i;
  if (e.validators.length === 0)
    return;
  const o = n.join(Po);
  return e.validators.find(({
    validator: s
  }) => s(o))?.classGroupId;
}, cs = /^\[(.+)\]$/, Zl = (n) => {
  if (cs.test(n)) {
    const e = cs.exec(n)[1], t = e?.substring(0, e.indexOf(":"));
    if (t)
      return "arbitrary.." + t;
  }
}, Jl = (n) => {
  const {
    theme: e,
    classGroups: t
  } = n, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const i in t)
    Yn(t[i], r, i, e);
  return r;
}, Yn = (n, e, t, r) => {
  n.forEach((i) => {
    if (typeof i == "string") {
      const o = i === "" ? e : us(e, i);
      o.classGroupId = t;
      return;
    }
    if (typeof i == "function") {
      if (ec(i)) {
        Yn(i(r), e, t, r);
        return;
      }
      e.validators.push({
        validator: i,
        classGroupId: t
      });
      return;
    }
    Object.entries(i).forEach(([o, s]) => {
      Yn(s, us(e, o), t, r);
    });
  });
}, us = (n, e) => {
  let t = n;
  return e.split(Po).forEach((r) => {
    t.nextPart.has(r) || t.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), t = t.nextPart.get(r);
  }), t;
}, ec = (n) => n.isThemeGetter, tc = (n) => {
  if (n < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let e = 0, t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const i = (o, s) => {
    t.set(o, s), e++, e > n && (e = 0, r = t, t = /* @__PURE__ */ new Map());
  };
  return {
    get(o) {
      let s = t.get(o);
      if (s !== void 0)
        return s;
      if ((s = r.get(o)) !== void 0)
        return i(o, s), s;
    },
    set(o, s) {
      t.has(o) ? t.set(o, s) : i(o, s);
    }
  };
}, jn = "!", Wn = ":", rc = Wn.length, ic = (n) => {
  const {
    prefix: e,
    experimentalParseClassName: t
  } = n;
  let r = (i) => {
    const o = [];
    let s = 0, a = 0, c = 0, u;
    for (let g = 0; g < i.length; g++) {
      let h = i[g];
      if (s === 0 && a === 0) {
        if (h === Wn) {
          o.push(i.slice(c, g)), c = g + rc;
          continue;
        }
        if (h === "/") {
          u = g;
          continue;
        }
      }
      h === "[" ? s++ : h === "]" ? s-- : h === "(" ? a++ : h === ")" && a--;
    }
    const f = o.length === 0 ? i : i.substring(c), d = nc(f), p = d !== f, l = u && u > c ? u - c : void 0;
    return {
      modifiers: o,
      hasImportantModifier: p,
      baseClassName: d,
      maybePostfixModifierPosition: l
    };
  };
  if (e) {
    const i = e + Wn, o = r;
    r = (s) => s.startsWith(i) ? o(s.substring(i.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: s,
      maybePostfixModifierPosition: void 0
    };
  }
  if (t) {
    const i = r;
    r = (o) => t({
      className: o,
      parseClassName: i
    });
  }
  return r;
}, nc = (n) => n.endsWith(jn) ? n.substring(0, n.length - 1) : n.startsWith(jn) ? n.substring(1) : n, oc = (n) => {
  const e = Object.fromEntries(n.orderSensitiveModifiers.map((r) => [r, !0]));
  return (r) => {
    if (r.length <= 1)
      return r;
    const i = [];
    let o = [];
    return r.forEach((s) => {
      s[0] === "[" || e[s] ? (i.push(...o.sort(), s), o = []) : o.push(s);
    }), i.push(...o.sort()), i;
  };
}, sc = (n) => ({
  cache: tc(n.cacheSize),
  parseClassName: ic(n),
  sortModifiers: oc(n),
  ...Kl(n)
}), ac = /\s+/, lc = (n, e) => {
  const {
    parseClassName: t,
    getClassGroupId: r,
    getConflictingClassGroupIds: i,
    sortModifiers: o
  } = e, s = [], a = n.trim().split(ac);
  let c = "";
  for (let u = a.length - 1; u >= 0; u -= 1) {
    const f = a[u], {
      isExternal: d,
      modifiers: p,
      hasImportantModifier: l,
      baseClassName: g,
      maybePostfixModifierPosition: h
    } = t(f);
    if (d) {
      c = f + (c.length > 0 ? " " + c : c);
      continue;
    }
    let b = !!h, w = r(b ? g.substring(0, h) : g);
    if (!w) {
      if (!b) {
        c = f + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (w = r(g), !w) {
        c = f + (c.length > 0 ? " " + c : c);
        continue;
      }
      b = !1;
    }
    const T = o(p).join(":"), O = l ? T + jn : T, k = O + w;
    if (s.includes(k))
      continue;
    s.push(k);
    const _ = i(w, b);
    for (let y = 0; y < _.length; ++y) {
      const v = _[y];
      s.push(O + v);
    }
    c = f + (c.length > 0 ? " " + c : c);
  }
  return c;
};
function cc() {
  let n = 0, e, t, r = "";
  for (; n < arguments.length; )
    (e = arguments[n++]) && (t = ia(e)) && (r && (r += " "), r += t);
  return r;
}
const ia = (n) => {
  if (typeof n == "string")
    return n;
  let e, t = "";
  for (let r = 0; r < n.length; r++)
    n[r] && (e = ia(n[r])) && (t && (t += " "), t += e);
  return t;
};
function Un(n, ...e) {
  let t, r, i, o = s;
  function s(c) {
    const u = e.reduce((f, d) => d(f), n());
    return t = sc(u), r = t.cache.get, i = t.cache.set, o = a, a(c);
  }
  function a(c) {
    const u = r(c);
    if (u)
      return u;
    const f = lc(c, t);
    return i(c, f), f;
  }
  return function() {
    return o(cc.apply(null, arguments));
  };
}
const De = (n) => {
  const e = (t) => t[n] || [];
  return e.isThemeGetter = !0, e;
}, na = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, oa = /^\((?:(\w[\w-]*):)?(.+)\)$/i, uc = /^\d+\/\d+$/, fc = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, dc = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, hc = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, pc = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, gc = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Sr = (n) => uc.test(n), ee = (n) => !!n && !Number.isNaN(Number(n)), or = (n) => !!n && Number.isInteger(Number(n)), fs = (n) => n.endsWith("%") && ee(n.slice(0, -1)), Xt = (n) => fc.test(n), mc = () => !0, _c = (n) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  dc.test(n) && !hc.test(n)
), So = () => !1, bc = (n) => pc.test(n), yc = (n) => gc.test(n), vc = (n) => !X(n) && !Y(n), xc = (n) => Ur(n, la, So), X = (n) => na.test(n), sr = (n) => Ur(n, ca, _c), Tn = (n) => Ur(n, Ac, ee), wc = (n) => Ur(n, sa, So), kc = (n) => Ur(n, aa, yc), Tc = (n) => Ur(n, So, bc), Y = (n) => oa.test(n), Fi = (n) => Hr(n, ca), Pc = (n) => Hr(n, Rc), Sc = (n) => Hr(n, sa), Mc = (n) => Hr(n, la), Cc = (n) => Hr(n, aa), Ec = (n) => Hr(n, zc, !0), Ur = (n, e, t) => {
  const r = na.exec(n);
  return r ? r[1] ? e(r[1]) : t(r[2]) : !1;
}, Hr = (n, e, t = !1) => {
  const r = oa.exec(n);
  return r ? r[1] ? e(r[1]) : t : !1;
}, sa = (n) => n === "position", Oc = /* @__PURE__ */ new Set(["image", "url"]), aa = (n) => Oc.has(n), Dc = /* @__PURE__ */ new Set(["length", "size", "percentage"]), la = (n) => Dc.has(n), ca = (n) => n === "length", Ac = (n) => n === "number", Rc = (n) => n === "family-name", zc = (n) => n === "shadow", Hn = () => {
  const n = De("color"), e = De("font"), t = De("text"), r = De("font-weight"), i = De("tracking"), o = De("leading"), s = De("breakpoint"), a = De("container"), c = De("spacing"), u = De("radius"), f = De("shadow"), d = De("inset-shadow"), p = De("drop-shadow"), l = De("blur"), g = De("perspective"), h = De("aspect"), b = De("ease"), w = De("animate"), T = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], O = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], k = () => ["auto", "hidden", "clip", "visible", "scroll"], _ = () => ["auto", "contain", "none"], y = () => [Y, X, c], v = () => [Sr, "full", "auto", ...y()], x = () => [or, "none", "subgrid", Y, X], P = () => ["auto", {
    span: ["full", or, Y, X]
  }, Y, X], E = () => [or, "auto", Y, X], M = () => ["auto", "min", "max", "fr", Y, X], A = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline"], C = () => ["start", "end", "center", "stretch"], L = () => ["auto", ...y()], I = () => [Sr, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...y()], R = () => [n, Y, X], $ = () => [fs, sr], D = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    u,
    Y,
    X
  ], j = () => ["", ee, Fi, sr], oe = () => ["solid", "dashed", "dotted", "double"], K = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], q = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    l,
    Y,
    X
  ], Q = () => ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", Y, X], H = () => ["none", ee, Y, X], he = () => ["none", ee, Y, X], _e = () => [ee, Y, X], se = () => [Sr, "full", ...y()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Xt],
      breakpoint: [Xt],
      color: [mc],
      container: [Xt],
      "drop-shadow": [Xt],
      ease: ["in", "out", "in-out"],
      font: [vc],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Xt],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Xt],
      shadow: [Xt],
      spacing: ["px", ee],
      text: [Xt],
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
        aspect: ["auto", "square", Sr, X, Y, h]
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
        columns: [ee, X, Y, a]
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
        object: [...O(), X, Y]
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
        inset: v()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": v()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": v()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: v()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: v()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: v()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: v()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: v()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: v()
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
        z: [or, "auto", Y, X]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [Sr, "full", "auto", a, ...y()]
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
        flex: [ee, Sr, "auto", "initial", "none", X]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", ee, Y, X]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", ee, Y, X]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [or, "first", "last", "none", Y, X]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": x()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: P()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": E()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": E()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": x()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: P()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": E()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": E()
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
        justify: [...A(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...C(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...C()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...A()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...C(), "baseline"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...C(), "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": A()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...C(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...C()]
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
        m: L()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: L()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: L()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: L()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: L()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: L()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: L()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: L()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: L()
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
        size: I()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [a, "screen", ...I()]
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
          ...I()
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
            screen: [s]
          },
          ...I()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", ...I()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "none", ...I()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", ...I()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", t, Fi, sr]
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
        font: [r, Y, Tn]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", fs, X]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Pc, X, e]
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
        tracking: [i, Y, X]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [ee, "none", Y, Tn]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          o,
          ...y()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", Y, X]
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
        list: ["disc", "decimal", "none", Y, X]
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
        placeholder: R()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: R()
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
        decoration: [...oe(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [ee, "from-font", "auto", Y, sr]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: R()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [ee, "auto", Y, X]
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
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", Y, X]
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
        content: ["none", Y, X]
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
        bg: [...O(), Sc, wc]
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
        bg: ["auto", "cover", "contain", Mc, xc]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, or, Y, X],
          radial: ["", Y, X],
          conic: [or, Y, X]
        }, Cc, kc]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: R()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: $()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: $()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: $()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: R()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: R()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: R()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: D()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": D()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": D()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": D()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": D()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": D()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": D()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": D()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": D()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": D()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": D()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": D()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": D()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": D()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": D()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: j()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": j()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": j()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": j()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": j()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": j()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": j()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": j()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": j()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": j()
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
        "divide-y": j()
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
        border: [...oe(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...oe(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: R()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": R()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": R()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": R()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": R()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": R()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": R()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": R()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": R()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: R()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...oe(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [ee, Y, X]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", ee, Fi, sr]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [n]
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
          f,
          Ec,
          Tc
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: R()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", Y, X, d]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": R()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: j()
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
        ring: R()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [ee, sr]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": R()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": j()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": R()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [ee, Y, X]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...K(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": K()
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
          Y,
          X
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: q()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [ee, Y, X]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [ee, Y, X]
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
          Y,
          X
        ]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", ee, Y, X]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [ee, Y, X]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", ee, Y, X]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [ee, Y, X]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", ee, Y, X]
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
          Y,
          X
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": q()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [ee, Y, X]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [ee, Y, X]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", ee, Y, X]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [ee, Y, X]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", ee, Y, X]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [ee, Y, X]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [ee, Y, X]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", ee, Y, X]
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", Y, X]
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
        duration: [ee, "initial", Y, X]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", b, Y, X]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [ee, Y, X]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", w, Y, X]
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
        perspective: [g, Y, X]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": Q()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: H()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": H()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": H()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": H()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: he()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": he()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": he()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": he()
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
        skew: _e()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": _e()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": _e()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [Y, X, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: Q()
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
        translate: se()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": se()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": se()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": se()
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
        accent: R()
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
        caret: R()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", Y, X]
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
        "will-change": ["auto", "scroll", "contents", "transform", Y, X]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...R()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [ee, Fi, sr, Tn]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...R()]
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
}, Nc = (n, {
  cacheSize: e,
  prefix: t,
  experimentalParseClassName: r,
  extend: i = {},
  override: o = {}
}) => (ai(n, "cacheSize", e), ai(n, "prefix", t), ai(n, "experimentalParseClassName", r), Bi(n.theme, o.theme), Bi(n.classGroups, o.classGroups), Bi(n.conflictingClassGroups, o.conflictingClassGroups), Bi(n.conflictingClassGroupModifiers, o.conflictingClassGroupModifiers), ai(n, "orderSensitiveModifiers", o.orderSensitiveModifiers), Gi(n.theme, i.theme), Gi(n.classGroups, i.classGroups), Gi(n.conflictingClassGroups, i.conflictingClassGroups), Gi(n.conflictingClassGroupModifiers, i.conflictingClassGroupModifiers), ua(n, i, "orderSensitiveModifiers"), n), ai = (n, e, t) => {
  t !== void 0 && (n[e] = t);
}, Bi = (n, e) => {
  if (e)
    for (const t in e)
      ai(n, t, e[t]);
}, Gi = (n, e) => {
  if (e)
    for (const t in e)
      ua(n, e, t);
}, ua = (n, e, t) => {
  const r = e[t];
  r !== void 0 && (n[t] = n[t] ? n[t].concat(r) : r);
}, Lc = (n, ...e) => typeof n == "function" ? Un(Hn, n, ...e) : Un(() => Nc(Hn(), n), ...e), Ic = /* @__PURE__ */ Un(Hn);
var $c = { twMerge: !0, twMergeConfig: {}, responsiveVariants: !1 }, fa = (n) => n || void 0, Pi = (...n) => fa(Js(n).filter(Boolean).join(" ")), Pn = null, Rt = {}, qn = !1, ri = (...n) => (e) => e.twMerge ? ((!Pn || qn) && (qn = !1, Pn = Be(Rt) ? Ic : Lc({ ...Rt, extend: { theme: Rt.theme, classGroups: Rt.classGroups, conflictingClassGroupModifiers: Rt.conflictingClassGroupModifiers, conflictingClassGroups: Rt.conflictingClassGroups, ...Rt.extend } })), fa(Pn(Pi(n)))) : Pi(n), ds = (n, e) => {
  for (let t in e) n.hasOwnProperty(t) ? n[t] = Pi(n[t], e[t]) : n[t] = e[t];
  return n;
}, Vc = (n, e) => {
  let { extend: t = null, slots: r = {}, variants: i = {}, compoundVariants: o = [], compoundSlots: s = [], defaultVariants: a = {} } = n, c = { ...$c, ...e }, u = t != null && t.base ? Pi(t.base, n?.base) : n?.base, f = t != null && t.variants && !Be(t.variants) ? ta(i, t.variants) : i, d = t != null && t.defaultVariants && !Be(t.defaultVariants) ? { ...t.defaultVariants, ...a } : a;
  !Be(c.twMergeConfig) && !Ql(c.twMergeConfig, Rt) && (qn = !0, Rt = c.twMergeConfig);
  let p = Be(t?.slots), l = Be(r) ? {} : { base: Pi(n?.base, p && t?.base), ...r }, g = p ? l : ds({ ...t?.slots }, Be(l) ? { base: n?.base } : l), h = Be(t?.compoundVariants) ? o : ea(t?.compoundVariants, o), b = (T) => {
    if (Be(f) && Be(r) && p) return ri(u, T?.class, T?.className)(c);
    if (h && !Array.isArray(h)) throw new TypeError(`The "compoundVariants" prop must be an array. Received: ${typeof h}`);
    if (s && !Array.isArray(s)) throw new TypeError(`The "compoundSlots" prop must be an array. Received: ${typeof s}`);
    let O = (A, C, L = [], I) => {
      let R = L;
      if (typeof C == "string") R = R.concat(ls(C).split(" ").map(($) => `${A}:${$}`));
      else if (Array.isArray(C)) R = R.concat(C.reduce(($, D) => $.concat(`${A}:${D}`), []));
      else if (typeof C == "object" && typeof I == "string") {
        for (let $ in C) if (C.hasOwnProperty($) && $ === I) {
          let D = C[$];
          if (D && typeof D == "string") {
            let j = ls(D);
            R[I] ? R[I] = R[I].concat(j.split(" ").map((oe) => `${A}:${oe}`)) : R[I] = j.split(" ").map((oe) => `${A}:${oe}`);
          } else Array.isArray(D) && D.length > 0 && (R[I] = D.reduce((j, oe) => j.concat(`${A}:${oe}`), []));
        }
      }
      return R;
    }, k = (A, C = f, L = null, I = null) => {
      var R;
      let $ = C[A];
      if (!$ || Be($)) return null;
      let D = (R = I?.[A]) != null ? R : T?.[A];
      if (D === null) return null;
      let j = as(D), oe = Array.isArray(c.responsiveVariants) && c.responsiveVariants.length > 0 || c.responsiveVariants === !0, K = d?.[A], q = [];
      if (typeof j == "object" && oe) for (let [he, _e] of Object.entries(j)) {
        let se = $[_e];
        if (he === "initial") {
          K = _e;
          continue;
        }
        Array.isArray(c.responsiveVariants) && !c.responsiveVariants.includes(he) || (q = O(he, se, q, L));
      }
      let Q = j != null && typeof j != "object" ? j : as(K), H = $[Q || "false"];
      return typeof q == "object" && typeof L == "string" && q[L] ? ds(q, H) : q.length > 0 ? (q.push(H), L === "base" ? q.join(" ") : q) : H;
    }, _ = () => f ? Object.keys(f).map((A) => k(A, f)) : null, y = (A, C) => {
      if (!f || typeof f != "object") return null;
      let L = new Array();
      for (let I in f) {
        let R = k(I, f, A, C), $ = A === "base" && typeof R == "string" ? R : R && R[A];
        $ && (L[L.length] = $);
      }
      return L;
    }, v = {};
    for (let A in T) T[A] !== void 0 && (v[A] = T[A]);
    let x = (A, C) => {
      var L;
      let I = typeof T?.[A] == "object" ? { [A]: (L = T[A]) == null ? void 0 : L.initial } : {};
      return { ...d, ...v, ...I, ...C };
    }, P = (A = [], C) => {
      let L = [];
      for (let { class: I, className: R, ...$ } of A) {
        let D = !0;
        for (let [j, oe] of Object.entries($)) {
          let K = x(j, C)[j];
          if (Array.isArray(oe)) {
            if (!oe.includes(K)) {
              D = !1;
              break;
            }
          } else {
            let q = (Q) => Q == null || Q === !1;
            if (q(oe) && q(K)) continue;
            if (K !== oe) {
              D = !1;
              break;
            }
          }
        }
        D && (I && L.push(I), R && L.push(R));
      }
      return L;
    }, E = (A) => {
      let C = P(h, A);
      if (!Array.isArray(C)) return C;
      let L = {};
      for (let I of C) if (typeof I == "string" && (L.base = ri(L.base, I)(c)), typeof I == "object") for (let [R, $] of Object.entries(I)) L[R] = ri(L[R], $)(c);
      return L;
    }, M = (A) => {
      if (s.length < 1) return null;
      let C = {};
      for (let { slots: L = [], class: I, className: R, ...$ } of s) {
        if (!Be($)) {
          let D = !0;
          for (let j of Object.keys($)) {
            let oe = x(j, A)[j];
            if (oe === void 0 || (Array.isArray($[j]) ? !$[j].includes(oe) : $[j] !== oe)) {
              D = !1;
              break;
            }
          }
          if (!D) continue;
        }
        for (let D of L) C[D] = C[D] || [], C[D].push([I, R]);
      }
      return C;
    };
    if (!Be(r) || !p) {
      let A = {};
      if (typeof g == "object" && !Be(g)) for (let C of Object.keys(g)) A[C] = (L) => {
        var I, R;
        return ri(g[C], y(C, L), ((I = E(L)) != null ? I : [])[C], ((R = M(L)) != null ? R : [])[C], L?.class, L?.className)(c);
      };
      return A;
    }
    return ri(u, _(), P(h), T?.class, T?.className)(c);
  }, w = () => {
    if (!(!f || typeof f != "object")) return Object.keys(f);
  };
  return b.variantKeys = w(), b.extend = t, b.base = u, b.slots = g, b.variants = f, b.defaultVariants = d, b.compoundSlots = s, b.compoundVariants = h, b;
};
const Fc = Vc({
  base: [
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium",
    "ring-offset-background transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50"
  ],
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
}), Bc = ["disabled"], Fd = /* @__PURE__ */ fn({
  __name: "Button",
  props: /* @__PURE__ */ ns({
    variant: { default: "default" },
    size: { default: "default" },
    disabled: { type: Boolean, default: !1 },
    class: {}
  }, {
    class: {},
    classModifiers: {}
  }),
  emits: /* @__PURE__ */ ns(["click"], ["update:class"]),
  setup(n) {
    const e = Fl(n, "class");
    return (t, r) => (ke(), we("button", {
      class: ki(wt(Fc)({ variant: t.variant, size: t.size, class: e.value })),
      disabled: t.disabled,
      onClick: r[0] || (r[0] = (i) => t.$emit("click", i))
    }, [
      St(t.$slots, "default")
    ], 10, Bc));
  }
});
/*!
 * pinia v3.0.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let li;
const en = (n) => li = n, Gc = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function wr(n) {
  return n && typeof n == "object" && Object.prototype.toString.call(n) === "[object Object]" && typeof n.toJSON != "function";
}
var mi;
(function(n) {
  n.direct = "direct", n.patchObject = "patch object", n.patchFunction = "patch function";
})(mi || (mi = {}));
const ci = typeof window < "u";
function da(n, e) {
  for (const t in e) {
    const r = e[t];
    if (!(t in n))
      continue;
    const i = n[t];
    wr(i) && wr(r) && !Ti(r) && !ko(r) ? n[t] = da(i, r) : n[t] = r;
  }
  return n;
}
const ha = () => {
};
function hs(n, e, t, r = ha) {
  n.push(e);
  const i = () => {
    const o = n.indexOf(e);
    o > -1 && (n.splice(o, 1), r());
  };
  return !t && Ul() && Hl(i), i;
}
function Mr(n, ...e) {
  n.slice().forEach((t) => {
    t(...e);
  });
}
const Xc = (n) => n(), ps = Symbol(), Sn = Symbol();
function Qn(n, e) {
  n instanceof Map && e instanceof Map ? e.forEach((t, r) => n.set(r, t)) : n instanceof Set && e instanceof Set && e.forEach(n.add, n);
  for (const t in e) {
    if (!e.hasOwnProperty(t))
      continue;
    const r = e[t], i = n[t];
    wr(i) && wr(r) && n.hasOwnProperty(t) && !Ti(r) && !ko(r) ? n[t] = Qn(i, r) : n[t] = r;
  }
  return n;
}
const Yc = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function jc(n) {
  return !wr(n) || !Object.prototype.hasOwnProperty.call(n, Yc);
}
const { assign: lt } = Object;
function gs(n) {
  return !!(Ti(n) && n.effect);
}
function ms(n, e, t, r) {
  const { state: i, actions: o, getters: s } = e, a = t.state.value[n];
  let c;
  function u() {
    !a && (process.env.NODE_ENV === "production" || !r) && (t.state.value[n] = i ? i() : {});
    const f = process.env.NODE_ENV !== "production" && r ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      ss(Ne(i ? i() : {}).value)
    ) : ss(t.state.value[n]);
    return lt(f, o, Object.keys(s || {}).reduce((d, p) => (process.env.NODE_ENV !== "production" && p in f && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${p}" in store "${n}".`), d[p] = si(bt(() => {
      en(t);
      const l = t._s.get(n);
      return s[p].call(l, l);
    })), d), {}));
  }
  return c = Kn(n, u, e, t, r, !0), c;
}
function Kn(n, e, t = {}, r, i, o) {
  let s;
  const a = lt({ actions: {} }, t);
  if (process.env.NODE_ENV !== "production" && !r._e.active)
    throw new Error("Pinia destroyed");
  const c = { deep: !0 };
  process.env.NODE_ENV !== "production" && (c.onTrigger = (E) => {
    u ? l = E : u == !1 && !v._hotUpdating && (Array.isArray(l) ? l.push(E) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let u, f, d = [], p = [], l;
  const g = r.state.value[n];
  !o && !g && (process.env.NODE_ENV === "production" || !i) && (r.state.value[n] = {});
  const h = Ne({});
  let b;
  function w(E) {
    let M;
    u = f = !1, process.env.NODE_ENV !== "production" && (l = []), typeof E == "function" ? (E(r.state.value[n]), M = {
      type: mi.patchFunction,
      storeId: n,
      events: l
    }) : (Qn(r.state.value[n], E), M = {
      type: mi.patchObject,
      payload: E,
      storeId: n,
      events: l
    });
    const A = b = Symbol();
    os().then(() => {
      b === A && (u = !0);
    }), f = !0, Mr(d, M, r.state.value[n]);
  }
  const T = o ? function() {
    const { state: M } = t, A = M ? M() : {};
    this.$patch((C) => {
      lt(C, A);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${n}" is built using the setup syntax and does not implement $reset().`);
    } : ha
  );
  function O() {
    s.stop(), d = [], p = [], r._s.delete(n);
  }
  const k = (E, M = "") => {
    if (ps in E)
      return E[Sn] = M, E;
    const A = function() {
      en(r);
      const C = Array.from(arguments), L = [], I = [];
      function R(j) {
        L.push(j);
      }
      function $(j) {
        I.push(j);
      }
      Mr(p, {
        args: C,
        name: A[Sn],
        store: v,
        after: R,
        onError: $
      });
      let D;
      try {
        D = E.apply(this && this.$id === n ? this : v, C);
      } catch (j) {
        throw Mr(I, j), j;
      }
      return D instanceof Promise ? D.then((j) => (Mr(L, j), j)).catch((j) => (Mr(I, j), Promise.reject(j))) : (Mr(L, D), D);
    };
    return A[ps] = !0, A[Sn] = M, A;
  }, _ = /* @__PURE__ */ si({
    actions: {},
    getters: {},
    state: [],
    hotState: h
  }), y = {
    _p: r,
    // _s: scope,
    $id: n,
    $onAction: hs.bind(null, p),
    $patch: w,
    $reset: T,
    $subscribe(E, M = {}) {
      const A = hs(d, E, M.detached, () => C()), C = s.run(() => ql(() => r.state.value[n], (L) => {
        (M.flush === "sync" ? f : u) && E({
          storeId: n,
          type: mi.direct,
          events: l
        }, L);
      }, lt({}, c, M)));
      return A;
    },
    $dispose: O
  }, v = Yl(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && ci ? lt(
    {
      _hmrPayload: _,
      _customProperties: si(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    y
    // must be added later
    // setupStore
  ) : y);
  r._s.set(n, v);
  const P = (r._a && r._a.runWithContext || Xc)(() => r._e.run(() => (s = jl()).run(() => e({ action: k }))));
  for (const E in P) {
    const M = P[E];
    if (Ti(M) && !gs(M) || ko(M))
      process.env.NODE_ENV !== "production" && i ? h.value[E] = kn(P, E) : o || (g && jc(M) && (Ti(M) ? M.value = g[E] : Qn(M, g[E])), r.state.value[n][E] = M), process.env.NODE_ENV !== "production" && _.state.push(E);
    else if (typeof M == "function") {
      const A = process.env.NODE_ENV !== "production" && i ? M : k(M, E);
      P[E] = A, process.env.NODE_ENV !== "production" && (_.actions[E] = M), a.actions[E] = M;
    } else process.env.NODE_ENV !== "production" && gs(M) && (_.getters[E] = o ? (
      // @ts-expect-error
      t.getters[E]
    ) : M, ci && (P._getters || // @ts-expect-error: same
    (P._getters = si([]))).push(E));
  }
  if (lt(v, P), lt(Wl(v), P), Object.defineProperty(v, "$state", {
    get: () => process.env.NODE_ENV !== "production" && i ? h.value : r.state.value[n],
    set: (E) => {
      if (process.env.NODE_ENV !== "production" && i)
        throw new Error("cannot set hotState");
      w((M) => {
        lt(M, E);
      });
    }
  }), process.env.NODE_ENV !== "production" && (v._hotUpdate = si((E) => {
    v._hotUpdating = !0, E._hmrPayload.state.forEach((M) => {
      if (M in v.$state) {
        const A = E.$state[M], C = v.$state[M];
        typeof A == "object" && wr(A) && wr(C) ? da(A, C) : E.$state[M] = C;
      }
      v[M] = kn(E.$state, M);
    }), Object.keys(v.$state).forEach((M) => {
      M in E.$state || delete v[M];
    }), u = !1, f = !1, r.state.value[n] = kn(E._hmrPayload, "hotState"), f = !0, os().then(() => {
      u = !0;
    });
    for (const M in E._hmrPayload.actions) {
      const A = E[M];
      v[M] = //
      k(A, M);
    }
    for (const M in E._hmrPayload.getters) {
      const A = E._hmrPayload.getters[M], C = o ? (
        // special handling of options api
        bt(() => (en(r), A.call(v, v)))
      ) : A;
      v[M] = //
      C;
    }
    Object.keys(v._hmrPayload.getters).forEach((M) => {
      M in E._hmrPayload.getters || delete v[M];
    }), Object.keys(v._hmrPayload.actions).forEach((M) => {
      M in E._hmrPayload.actions || delete v[M];
    }), v._hmrPayload = E._hmrPayload, v._getters = E._getters, v._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && ci) {
    const E = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((M) => {
      Object.defineProperty(v, M, lt({ value: v[M] }, E));
    });
  }
  return r._p.forEach((E) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && ci) {
      const M = s.run(() => E({
        store: v,
        app: r._a,
        pinia: r,
        options: a
      }));
      Object.keys(M || {}).forEach((A) => v._customProperties.add(A)), lt(v, M);
    } else
      lt(v, s.run(() => E({
        store: v,
        app: r._a,
        pinia: r,
        options: a
      })));
  }), process.env.NODE_ENV !== "production" && v.$state && typeof v.$state == "object" && typeof v.$state.constructor == "function" && !v.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${v.$id}".`), g && o && t.hydrate && t.hydrate(v.$state, g), u = !0, f = !0, v;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Wc(n, e, t) {
  let r;
  const i = typeof e == "function";
  r = i ? t : e;
  function o(s, a) {
    const c = Bl();
    if (s = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && li && li._testing ? null : s) || (c ? Gl(Gc, null) : null), s && en(s), process.env.NODE_ENV !== "production" && !li)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    s = li, s._s.has(n) || (i ? Kn(n, e, r, s) : ms(n, r, s), process.env.NODE_ENV !== "production" && (o._pinia = s));
    const u = s._s.get(n);
    if (process.env.NODE_ENV !== "production" && a) {
      const f = "__hot:" + n, d = i ? Kn(f, e, r, s, !0) : ms(f, lt({}, r), s, !0);
      a._hotUpdate(d), delete s.state.value[f], s._s.delete(f);
    }
    if (process.env.NODE_ENV !== "production" && ci) {
      const f = Xl();
      if (f && f.proxy && // avoid adding stores that are just built for hot module replacement
      !a) {
        const d = f.proxy, p = "_pStores" in d ? d._pStores : d._pStores = {};
        p[n] = u;
      }
    }
    return u;
  }
  return o.$id = n, o;
}
const pa = /* @__PURE__ */ Wc("dock", () => {
  const n = Ne(!0), e = Ne(!1), t = Ne({ x: 100, y: 100 }), r = Ne([]), i = Ne(), o = bt(
    () => r.value.filter((k) => k.isVisible)
  ), s = bt(
    () => r.value.filter((k) => k.isMinimized)
  ), a = bt(
    () => r.value.find((k) => k.id === i.value)
  );
  function c(k) {
    t.value = k;
  }
  function u(k) {
    e.value = k;
  }
  function f() {
    n.value = !n.value;
  }
  function d(k) {
    const _ = {
      ...k,
      isVisible: !0,
      isMinimized: !1
    };
    r.value.push(_), r.value.length === 1 && (i.value = k.id);
  }
  function p(k) {
    const _ = r.value.findIndex((y) => y.id === k);
    _ > -1 && (r.value.splice(_, 1), i.value === k && (i.value = r.value.length > 0 ? r.value[0].id : void 0));
  }
  function l(k) {
    const _ = r.value.find((y) => y.id === k);
    _ && (i.value = k, _.isVisible = !0, _.isMinimized = !1);
  }
  function g(k) {
    const _ = r.value.find((y) => y.id === k);
    _ && (_.isVisible = !_.isVisible);
  }
  function h(k) {
    const _ = r.value.find((y) => y.id === k);
    _ && (_.isMinimized = !0);
  }
  function b(k) {
    const _ = r.value.find((y) => y.id === k);
    _ && (_.isMinimized = !1, _.isVisible = !0);
  }
  function w(k, _) {
    const y = r.value.find((v) => v.id === k);
    y && (y.position = _);
  }
  function T(k, _, y) {
    const v = r.value.find((x) => x.id === k);
    v && (v.width = _, v.height = y);
  }
  function O() {
    n.value = !0, e.value = !1, t.value = { x: 100, y: 100 }, r.value = [], i.value = void 0;
  }
  return {
    // State
    isVisible: n,
    isDragging: e,
    position: t,
    panels: r,
    activePanel: i,
    // Getters
    visiblePanels: o,
    minimizedPanels: s,
    activePanelData: a,
    // Actions
    setPosition: c,
    setDragging: u,
    toggleVisibility: f,
    addPanel: d,
    removePanel: p,
    setActivePanel: l,
    togglePanelVisibility: g,
    minimizePanel: h,
    restorePanel: b,
    updatePanelPosition: w,
    updatePanelSize: T,
    reset: O
  };
});
function zt(n) {
  if (n === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return n;
}
function ga(n, e) {
  n.prototype = Object.create(e.prototype), n.prototype.constructor = n, n.__proto__ = e;
}
/*!
 * GSAP 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Je = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, Fr = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, Mo, Le, pe, ut = 1e8, de = 1 / ut, Zn = Math.PI * 2, Uc = Zn / 4, Hc = 0, ma = Math.sqrt, qc = Math.cos, Qc = Math.sin, Ae = function(e) {
  return typeof e == "string";
}, be = function(e) {
  return typeof e == "function";
}, Vt = function(e) {
  return typeof e == "number";
}, Co = function(e) {
  return typeof e > "u";
}, Et = function(e) {
  return typeof e == "object";
}, Ge = function(e) {
  return e !== !1;
}, Eo = function() {
  return typeof window < "u";
}, Xi = function(e) {
  return be(e) || Ae(e);
}, _a = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, Ve = Array.isArray, Jn = /(?:-?\.?\d|\.)+/gi, ba = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Ar = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Mn = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, ya = /[+-]=-?[.\d]+/, va = /[^,'"\[\]\s]+/gi, Kc = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, ge, kt, eo, Oo, et = {}, tn = {}, xa, wa = function(e) {
  return (tn = Br(e, et)) && We;
}, Do = function(e, t) {
  return console.warn("Invalid property", e, "set to", t, "Missing plugin? gsap.registerPlugin()");
}, Si = function(e, t) {
  return !t && console.warn(e);
}, ka = function(e, t) {
  return e && (et[e] = t) && tn && (tn[e] = t) || et;
}, Mi = function() {
  return 0;
}, Zc = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, Hi = {
  suppressEvents: !0,
  kill: !1
}, Jc = {
  suppressEvents: !0
}, Ao = {}, Zt = [], to = {}, Ta, qe = {}, Cn = {}, _s = 30, qi = [], Ro = "", zo = function(e) {
  var t = e[0], r, i;
  if (Et(t) || be(t) || (e = [e]), !(r = (t._gsap || {}).harness)) {
    for (i = qi.length; i-- && !qi[i].targetTest(t); )
      ;
    r = qi[i];
  }
  for (i = e.length; i--; )
    e[i] && (e[i]._gsap || (e[i]._gsap = new Ha(e[i], r))) || e.splice(i, 1);
  return e;
}, mr = function(e) {
  return e._gsap || zo(ft(e))[0]._gsap;
}, Pa = function(e, t, r) {
  return (r = e[t]) && be(r) ? e[t]() : Co(r) && e.getAttribute && e.getAttribute(t) || r;
}, Xe = function(e, t) {
  return (e = e.split(",")).forEach(t) || e;
}, Te = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, Ce = function(e) {
  return Math.round(e * 1e7) / 1e7 || 0;
}, zr = function(e, t) {
  var r = t.charAt(0), i = parseFloat(t.substr(2));
  return e = parseFloat(e), r === "+" ? e + i : r === "-" ? e - i : r === "*" ? e * i : e / i;
}, eu = function(e, t) {
  for (var r = t.length, i = 0; e.indexOf(t[i]) < 0 && ++i < r; )
    ;
  return i < r;
}, rn = function() {
  var e = Zt.length, t = Zt.slice(0), r, i;
  for (to = {}, Zt.length = 0, r = 0; r < e; r++)
    i = t[r], i && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0);
}, No = function(e) {
  return !!(e._initted || e._startAt || e.add);
}, Sa = function(e, t, r, i) {
  Zt.length && !Le && rn(), e.render(t, r, !!(Le && t < 0 && No(e))), Zt.length && !Le && rn();
}, Ma = function(e) {
  var t = parseFloat(e);
  return (t || t === 0) && (e + "").match(va).length < 2 ? t : Ae(e) ? e.trim() : e;
}, Ca = function(e) {
  return e;
}, tt = function(e, t) {
  for (var r in t)
    r in e || (e[r] = t[r]);
  return e;
}, tu = function(e) {
  return function(t, r) {
    for (var i in r)
      i in t || i === "duration" && e || i === "ease" || (t[i] = r[i]);
  };
}, Br = function(e, t) {
  for (var r in t)
    e[r] = t[r];
  return e;
}, bs = function n(e, t) {
  for (var r in t)
    r !== "__proto__" && r !== "constructor" && r !== "prototype" && (e[r] = Et(t[r]) ? n(e[r] || (e[r] = {}), t[r]) : t[r]);
  return e;
}, nn = function(e, t) {
  var r = {}, i;
  for (i in e)
    i in t || (r[i] = e[i]);
  return r;
}, _i = function(e) {
  var t = e.parent || ge, r = e.keyframes ? tu(Ve(e.keyframes)) : tt;
  if (Ge(e.inherit))
    for (; t; )
      r(e, t.vars.defaults), t = t.parent || t._dp;
  return e;
}, ru = function(e, t) {
  for (var r = e.length, i = r === t.length; i && r-- && e[r] === t[r]; )
    ;
  return r < 0;
}, Ea = function(e, t, r, i, o) {
  var s = e[i], a;
  if (o)
    for (a = t[o]; s && s[o] > a; )
      s = s._prev;
  return s ? (t._next = s._next, s._next = t) : (t._next = e[r], e[r] = t), t._next ? t._next._prev = t : e[i] = t, t._prev = s, t.parent = t._dp = e, t;
}, hn = function(e, t, r, i) {
  r === void 0 && (r = "_first"), i === void 0 && (i = "_last");
  var o = t._prev, s = t._next;
  o ? o._next = s : e[r] === t && (e[r] = s), s ? s._prev = o : e[i] === t && (e[i] = o), t._next = t._prev = t.parent = null;
}, er = function(e, t) {
  e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e), e._act = 0;
}, _r = function(e, t) {
  if (e && (!t || t._end > e._dur || t._start < 0))
    for (var r = e; r; )
      r._dirty = 1, r = r.parent;
  return e;
}, iu = function(e) {
  for (var t = e.parent; t && t.parent; )
    t._dirty = 1, t.totalDuration(), t = t.parent;
  return e;
}, ro = function(e, t, r, i) {
  return e._startAt && (Le ? e._startAt.revert(Hi) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(t, !0, i));
}, nu = function n(e) {
  return !e || e._ts && n(e.parent);
}, ys = function(e) {
  return e._repeat ? Gr(e._tTime, e = e.duration() + e._rDelay) * e : 0;
}, Gr = function(e, t) {
  var r = Math.floor(e = Ce(e / t));
  return e && r === e ? r - 1 : r;
}, on = function(e, t) {
  return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur);
}, pn = function(e) {
  return e._end = Ce(e._start + (e._tDur / Math.abs(e._ts || e._rts || de) || 0));
}, gn = function(e, t) {
  var r = e._dp;
  return r && r.smoothChildTiming && e._ts && (e._start = Ce(r._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)), pn(e), r._dirty || _r(r, e)), e;
}, Oa = function(e, t) {
  var r;
  if ((t._time || !t._dur && t._initted || t._start < e._time && (t._dur || !t.add)) && (r = on(e.rawTime(), t), (!t._dur || Ni(0, t.totalDuration(), r) - t._tTime > de) && t.render(r, !0)), _r(e, t)._dp && e._initted && e._time >= e._dur && e._ts) {
    if (e._dur < e.duration())
      for (r = e; r._dp; )
        r.rawTime() >= 0 && r.totalTime(r._tTime), r = r._dp;
    e._zTime = -de;
  }
}, Tt = function(e, t, r, i) {
  return t.parent && er(t), t._start = Ce((Vt(r) ? r : r || e !== ge ? ct(e, r, t) : e._time) + t._delay), t._end = Ce(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)), Ea(e, t, "_first", "_last", e._sort ? "_start" : 0), io(t) || (e._recent = t), i || Oa(e, t), e._ts < 0 && gn(e, e._tTime), e;
}, Da = function(e, t) {
  return (et.ScrollTrigger || Do("scrollTrigger", t)) && et.ScrollTrigger.create(t, e);
}, Aa = function(e, t, r, i, o) {
  if (Io(e, t, o), !e._initted)
    return 1;
  if (!r && e._pt && !Le && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && Ta !== Qe.frame)
    return Zt.push(e), e._lazy = [o, i], 1;
}, ou = function n(e) {
  var t = e.parent;
  return t && t._ts && t._initted && !t._lock && (t.rawTime() < 0 || n(t));
}, io = function(e) {
  var t = e.data;
  return t === "isFromStart" || t === "isStart";
}, su = function(e, t, r, i) {
  var o = e.ratio, s = t < 0 || !t && (!e._start && ou(e) && !(!e._initted && io(e)) || (e._ts < 0 || e._dp._ts < 0) && !io(e)) ? 0 : 1, a = e._rDelay, c = 0, u, f, d;
  if (a && e._repeat && (c = Ni(0, e._tDur, t), f = Gr(c, a), e._yoyo && f & 1 && (s = 1 - s), f !== Gr(e._tTime, a) && (o = 1 - s, e.vars.repeatRefresh && e._initted && e.invalidate())), s !== o || Le || i || e._zTime === de || !t && e._zTime) {
    if (!e._initted && Aa(e, t, i, r, c))
      return;
    for (d = e._zTime, e._zTime = t || (r ? de : 0), r || (r = t && !d), e.ratio = s, e._from && (s = 1 - s), e._time = 0, e._tTime = c, u = e._pt; u; )
      u.r(s, u.d), u = u._next;
    t < 0 && ro(e, t, r, !0), e._onUpdate && !r && Ze(e, "onUpdate"), c && e._repeat && !r && e.parent && Ze(e, "onRepeat"), (t >= e._tDur || t < 0) && e.ratio === s && (s && er(e, 1), !r && !Le && (Ze(e, s ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()));
  } else e._zTime || (e._zTime = t);
}, au = function(e, t, r) {
  var i;
  if (r > t)
    for (i = e._first; i && i._start <= r; ) {
      if (i.data === "isPause" && i._start > t)
        return i;
      i = i._next;
    }
  else
    for (i = e._last; i && i._start >= r; ) {
      if (i.data === "isPause" && i._start < t)
        return i;
      i = i._prev;
    }
}, Xr = function(e, t, r, i) {
  var o = e._repeat, s = Ce(t) || 0, a = e._tTime / e._tDur;
  return a && !i && (e._time *= s / e._dur), e._dur = s, e._tDur = o ? o < 0 ? 1e10 : Ce(s * (o + 1) + e._rDelay * o) : s, a > 0 && !i && gn(e, e._tTime = e._tDur * a), e.parent && pn(e), r || _r(e.parent, e), e;
}, vs = function(e) {
  return e instanceof Fe ? _r(e) : Xr(e, e._dur);
}, lu = {
  _start: 0,
  endTime: Mi,
  totalDuration: Mi
}, ct = function n(e, t, r) {
  var i = e.labels, o = e._recent || lu, s = e.duration() >= ut ? o.endTime(!1) : e._dur, a, c, u;
  return Ae(t) && (isNaN(t) || t in i) ? (c = t.charAt(0), u = t.substr(-1) === "%", a = t.indexOf("="), c === "<" || c === ">" ? (a >= 0 && (t = t.replace(/=/, "")), (c === "<" ? o._start : o.endTime(o._repeat >= 0)) + (parseFloat(t.substr(1)) || 0) * (u ? (a < 0 ? o : r).totalDuration() / 100 : 1)) : a < 0 ? (t in i || (i[t] = s), i[t]) : (c = parseFloat(t.charAt(a - 1) + t.substr(a + 1)), u && r && (c = c / 100 * (Ve(r) ? r[0] : r).totalDuration()), a > 1 ? n(e, t.substr(0, a - 1), r) + c : s + c)) : t == null ? s : +t;
}, bi = function(e, t, r) {
  var i = Vt(t[1]), o = (i ? 2 : 1) + (e < 2 ? 0 : 1), s = t[o], a, c;
  if (i && (s.duration = t[1]), s.parent = r, e) {
    for (a = s, c = r; c && !("immediateRender" in a); )
      a = c.vars.defaults || {}, c = Ge(c.vars.inherit) && c.parent;
    s.immediateRender = Ge(a.immediateRender), e < 2 ? s.runBackwards = 1 : s.startAt = t[o - 1];
  }
  return new Me(t[0], s, t[o + 1]);
}, rr = function(e, t) {
  return e || e === 0 ? t(e) : t;
}, Ni = function(e, t, r) {
  return r < e ? e : r > t ? t : r;
}, $e = function(e, t) {
  return !Ae(e) || !(t = Kc.exec(e)) ? "" : t[1];
}, cu = function(e, t, r) {
  return rr(r, function(i) {
    return Ni(e, t, i);
  });
}, no = [].slice, Ra = function(e, t) {
  return e && Et(e) && "length" in e && (!t && !e.length || e.length - 1 in e && Et(e[0])) && !e.nodeType && e !== kt;
}, uu = function(e, t, r) {
  return r === void 0 && (r = []), e.forEach(function(i) {
    var o;
    return Ae(i) && !t || Ra(i, 1) ? (o = r).push.apply(o, ft(i)) : r.push(i);
  }) || r;
}, ft = function(e, t, r) {
  return pe && !t && pe.selector ? pe.selector(e) : Ae(e) && !r && (eo || !Yr()) ? no.call((t || Oo).querySelectorAll(e), 0) : Ve(e) ? uu(e, r) : Ra(e) ? no.call(e, 0) : e ? [e] : [];
}, oo = function(e) {
  return e = ft(e)[0] || Si("Invalid scope") || {}, function(t) {
    var r = e.current || e.nativeElement || e;
    return ft(t, r.querySelectorAll ? r : r === e ? Si("Invalid scope") || Oo.createElement("div") : e);
  };
}, za = function(e) {
  return e.sort(function() {
    return 0.5 - Math.random();
  });
}, Na = function(e) {
  if (be(e))
    return e;
  var t = Et(e) ? e : {
    each: e
  }, r = br(t.ease), i = t.from || 0, o = parseFloat(t.base) || 0, s = {}, a = i > 0 && i < 1, c = isNaN(i) || a, u = t.axis, f = i, d = i;
  return Ae(i) ? f = d = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[i] || 0 : !a && c && (f = i[0], d = i[1]), function(p, l, g) {
    var h = (g || t).length, b = s[h], w, T, O, k, _, y, v, x, P;
    if (!b) {
      if (P = t.grid === "auto" ? 0 : (t.grid || [1, ut])[1], !P) {
        for (v = -ut; v < (v = g[P++].getBoundingClientRect().left) && P < h; )
          ;
        P < h && P--;
      }
      for (b = s[h] = [], w = c ? Math.min(P, h) * f - 0.5 : i % P, T = P === ut ? 0 : c ? h * d / P - 0.5 : i / P | 0, v = 0, x = ut, y = 0; y < h; y++)
        O = y % P - w, k = T - (y / P | 0), b[y] = _ = u ? Math.abs(u === "y" ? k : O) : ma(O * O + k * k), _ > v && (v = _), _ < x && (x = _);
      i === "random" && za(b), b.max = v - x, b.min = x, b.v = h = (parseFloat(t.amount) || parseFloat(t.each) * (P > h ? h - 1 : u ? u === "y" ? h / P : P : Math.max(P, h / P)) || 0) * (i === "edges" ? -1 : 1), b.b = h < 0 ? o - h : o, b.u = $e(t.amount || t.each) || 0, r = r && h < 0 ? ja(r) : r;
    }
    return h = (b[p] - b.min) / b.max || 0, Ce(b.b + (r ? r(h) : h) * b.v) + b.u;
  };
}, so = function(e) {
  var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
  return function(r) {
    var i = Ce(Math.round(parseFloat(r) / e) * e * t);
    return (i - i % 1) / t + (Vt(r) ? 0 : $e(r));
  };
}, La = function(e, t) {
  var r = Ve(e), i, o;
  return !r && Et(e) && (i = r = e.radius || ut, e.values ? (e = ft(e.values), (o = !Vt(e[0])) && (i *= i)) : e = so(e.increment)), rr(t, r ? be(e) ? function(s) {
    return o = e(s), Math.abs(o - s) <= i ? o : s;
  } : function(s) {
    for (var a = parseFloat(o ? s.x : s), c = parseFloat(o ? s.y : 0), u = ut, f = 0, d = e.length, p, l; d--; )
      o ? (p = e[d].x - a, l = e[d].y - c, p = p * p + l * l) : p = Math.abs(e[d] - a), p < u && (u = p, f = d);
    return f = !i || u <= i ? e[f] : s, o || f === s || Vt(s) ? f : f + $e(s);
  } : so(e));
}, Ia = function(e, t, r, i) {
  return rr(Ve(e) ? !t : r === !0 ? !!(r = 0) : !i, function() {
    return Ve(e) ? e[~~(Math.random() * e.length)] : (r = r || 1e-5) && (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((e - r / 2 + Math.random() * (t - e + r * 0.99)) / r) * r * i) / i;
  });
}, fu = function() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return function(i) {
    return t.reduce(function(o, s) {
      return s(o);
    }, i);
  };
}, du = function(e, t) {
  return function(r) {
    return e(parseFloat(r)) + (t || $e(r));
  };
}, hu = function(e, t, r) {
  return Va(e, t, 0, 1, r);
}, $a = function(e, t, r) {
  return rr(r, function(i) {
    return e[~~t(i)];
  });
}, pu = function n(e, t, r) {
  var i = t - e;
  return Ve(e) ? $a(e, n(0, e.length), t) : rr(r, function(o) {
    return (i + (o - e) % i) % i + e;
  });
}, gu = function n(e, t, r) {
  var i = t - e, o = i * 2;
  return Ve(e) ? $a(e, n(0, e.length - 1), t) : rr(r, function(s) {
    return s = (o + (s - e) % o) % o || 0, e + (s > i ? o - s : s);
  });
}, Ci = function(e) {
  for (var t = 0, r = "", i, o, s, a; ~(i = e.indexOf("random(", t)); )
    s = e.indexOf(")", i), a = e.charAt(i + 7) === "[", o = e.substr(i + 7, s - i - 7).match(a ? va : Jn), r += e.substr(t, i - t) + Ia(a ? o : +o[0], a ? 0 : +o[1], +o[2] || 1e-5), t = s + 1;
  return r + e.substr(t, e.length - t);
}, Va = function(e, t, r, i, o) {
  var s = t - e, a = i - r;
  return rr(o, function(c) {
    return r + ((c - e) / s * a || 0);
  });
}, mu = function n(e, t, r, i) {
  var o = isNaN(e + t) ? 0 : function(l) {
    return (1 - l) * e + l * t;
  };
  if (!o) {
    var s = Ae(e), a = {}, c, u, f, d, p;
    if (r === !0 && (i = 1) && (r = null), s)
      e = {
        p: e
      }, t = {
        p: t
      };
    else if (Ve(e) && !Ve(t)) {
      for (f = [], d = e.length, p = d - 2, u = 1; u < d; u++)
        f.push(n(e[u - 1], e[u]));
      d--, o = function(g) {
        g *= d;
        var h = Math.min(p, ~~g);
        return f[h](g - h);
      }, r = t;
    } else i || (e = Br(Ve(e) ? [] : {}, e));
    if (!f) {
      for (c in t)
        Lo.call(a, e, c, "get", t[c]);
      o = function(g) {
        return Fo(g, a) || (s ? e.p : e);
      };
    }
  }
  return rr(r, o);
}, xs = function(e, t, r) {
  var i = e.labels, o = ut, s, a, c;
  for (s in i)
    a = i[s] - t, a < 0 == !!r && a && o > (a = Math.abs(a)) && (c = s, o = a);
  return c;
}, Ze = function(e, t, r) {
  var i = e.vars, o = i[t], s = pe, a = e._ctx, c, u, f;
  if (o)
    return c = i[t + "Params"], u = i.callbackScope || e, r && Zt.length && rn(), a && (pe = a), f = c ? o.apply(u, c) : o.call(u), pe = s, f;
}, ui = function(e) {
  return er(e), e.scrollTrigger && e.scrollTrigger.kill(!!Le), e.progress() < 1 && Ze(e, "onInterrupt"), e;
}, Rr, Fa = [], Ba = function(e) {
  if (e)
    if (e = !e.name && e.default || e, Eo() || e.headless) {
      var t = e.name, r = be(e), i = t && !r && e.init ? function() {
        this._props = [];
      } : e, o = {
        init: Mi,
        render: Fo,
        add: Lo,
        kill: Au,
        modifier: Du,
        rawVars: 0
      }, s = {
        targetTest: 0,
        get: 0,
        getSetter: Vo,
        aliases: {},
        register: 0
      };
      if (Yr(), e !== i) {
        if (qe[t])
          return;
        tt(i, tt(nn(e, o), s)), Br(i.prototype, Br(o, nn(e, s))), qe[i.prop = t] = i, e.targetTest && (qi.push(i), Ao[t] = 1), t = (t === "css" ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin";
      }
      ka(t, i), e.register && e.register(We, i, Ye);
    } else
      Fa.push(e);
}, ue = 255, fi = {
  aqua: [0, ue, ue],
  lime: [0, ue, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, ue],
  navy: [0, 0, 128],
  white: [ue, ue, ue],
  olive: [128, 128, 0],
  yellow: [ue, ue, 0],
  orange: [ue, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [ue, 0, 0],
  pink: [ue, 192, 203],
  cyan: [0, ue, ue],
  transparent: [ue, ue, ue, 0]
}, En = function(e, t, r) {
  return e += e < 0 ? 1 : e > 1 ? -1 : 0, (e * 6 < 1 ? t + (r - t) * e * 6 : e < 0.5 ? r : e * 3 < 2 ? t + (r - t) * (2 / 3 - e) * 6 : t) * ue + 0.5 | 0;
}, Ga = function(e, t, r) {
  var i = e ? Vt(e) ? [e >> 16, e >> 8 & ue, e & ue] : 0 : fi.black, o, s, a, c, u, f, d, p, l, g;
  if (!i) {
    if (e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), fi[e])
      i = fi[e];
    else if (e.charAt(0) === "#") {
      if (e.length < 6 && (o = e.charAt(1), s = e.charAt(2), a = e.charAt(3), e = "#" + o + o + s + s + a + a + (e.length === 5 ? e.charAt(4) + e.charAt(4) : "")), e.length === 9)
        return i = parseInt(e.substr(1, 6), 16), [i >> 16, i >> 8 & ue, i & ue, parseInt(e.substr(7), 16) / 255];
      e = parseInt(e.substr(1), 16), i = [e >> 16, e >> 8 & ue, e & ue];
    } else if (e.substr(0, 3) === "hsl") {
      if (i = g = e.match(Jn), !t)
        c = +i[0] % 360 / 360, u = +i[1] / 100, f = +i[2] / 100, s = f <= 0.5 ? f * (u + 1) : f + u - f * u, o = f * 2 - s, i.length > 3 && (i[3] *= 1), i[0] = En(c + 1 / 3, o, s), i[1] = En(c, o, s), i[2] = En(c - 1 / 3, o, s);
      else if (~e.indexOf("="))
        return i = e.match(ba), r && i.length < 4 && (i[3] = 1), i;
    } else
      i = e.match(Jn) || fi.transparent;
    i = i.map(Number);
  }
  return t && !g && (o = i[0] / ue, s = i[1] / ue, a = i[2] / ue, d = Math.max(o, s, a), p = Math.min(o, s, a), f = (d + p) / 2, d === p ? c = u = 0 : (l = d - p, u = f > 0.5 ? l / (2 - d - p) : l / (d + p), c = d === o ? (s - a) / l + (s < a ? 6 : 0) : d === s ? (a - o) / l + 2 : (o - s) / l + 4, c *= 60), i[0] = ~~(c + 0.5), i[1] = ~~(u * 100 + 0.5), i[2] = ~~(f * 100 + 0.5)), r && i.length < 4 && (i[3] = 1), i;
}, Xa = function(e) {
  var t = [], r = [], i = -1;
  return e.split(Jt).forEach(function(o) {
    var s = o.match(Ar) || [];
    t.push.apply(t, s), r.push(i += s.length + 1);
  }), t.c = r, t;
}, ws = function(e, t, r) {
  var i = "", o = (e + i).match(Jt), s = t ? "hsla(" : "rgba(", a = 0, c, u, f, d;
  if (!o)
    return e;
  if (o = o.map(function(p) {
    return (p = Ga(p, t, 1)) && s + (t ? p[0] + "," + p[1] + "%," + p[2] + "%," + p[3] : p.join(",")) + ")";
  }), r && (f = Xa(e), c = r.c, c.join(i) !== f.c.join(i)))
    for (u = e.replace(Jt, "1").split(Ar), d = u.length - 1; a < d; a++)
      i += u[a] + (~c.indexOf(a) ? o.shift() || s + "0,0,0,0)" : (f.length ? f : o.length ? o : r).shift());
  if (!u)
    for (u = e.split(Jt), d = u.length - 1; a < d; a++)
      i += u[a] + o[a];
  return i + u[d];
}, Jt = function() {
  var n = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", e;
  for (e in fi)
    n += "|" + e + "\\b";
  return new RegExp(n + ")", "gi");
}(), _u = /hsl[a]?\(/, Ya = function(e) {
  var t = e.join(" "), r;
  if (Jt.lastIndex = 0, Jt.test(t))
    return r = _u.test(t), e[1] = ws(e[1], r), e[0] = ws(e[0], r, Xa(e[1])), !0;
}, Ei, Qe = function() {
  var n = Date.now, e = 500, t = 33, r = n(), i = r, o = 1e3 / 240, s = o, a = [], c, u, f, d, p, l, g = function h(b) {
    var w = n() - i, T = b === !0, O, k, _, y;
    if ((w > e || w < 0) && (r += w - t), i += w, _ = i - r, O = _ - s, (O > 0 || T) && (y = ++d.frame, p = _ - d.time * 1e3, d.time = _ = _ / 1e3, s += O + (O >= o ? 4 : o - O), k = 1), T || (c = u(h)), k)
      for (l = 0; l < a.length; l++)
        a[l](_, p, y, b);
  };
  return d = {
    time: 0,
    frame: 0,
    tick: function() {
      g(!0);
    },
    deltaRatio: function(b) {
      return p / (1e3 / (b || 60));
    },
    wake: function() {
      xa && (!eo && Eo() && (kt = eo = window, Oo = kt.document || {}, et.gsap = We, (kt.gsapVersions || (kt.gsapVersions = [])).push(We.version), wa(tn || kt.GreenSockGlobals || !kt.gsap && kt || {}), Fa.forEach(Ba)), f = typeof requestAnimationFrame < "u" && requestAnimationFrame, c && d.sleep(), u = f || function(b) {
        return setTimeout(b, s - d.time * 1e3 + 1 | 0);
      }, Ei = 1, g(2));
    },
    sleep: function() {
      (f ? cancelAnimationFrame : clearTimeout)(c), Ei = 0, u = Mi;
    },
    lagSmoothing: function(b, w) {
      e = b || 1 / 0, t = Math.min(w || 33, e);
    },
    fps: function(b) {
      o = 1e3 / (b || 240), s = d.time * 1e3 + o;
    },
    add: function(b, w, T) {
      var O = w ? function(k, _, y, v) {
        b(k, _, y, v), d.remove(O);
      } : b;
      return d.remove(b), a[T ? "unshift" : "push"](O), Yr(), O;
    },
    remove: function(b, w) {
      ~(w = a.indexOf(b)) && a.splice(w, 1) && l >= w && l--;
    },
    _listeners: a
  }, d;
}(), Yr = function() {
  return !Ei && Qe.wake();
}, ie = {}, bu = /^[\d.\-M][\d.\-,\s]/, yu = /["']/g, vu = function(e) {
  for (var t = {}, r = e.substr(1, e.length - 3).split(":"), i = r[0], o = 1, s = r.length, a, c, u; o < s; o++)
    c = r[o], a = o !== s - 1 ? c.lastIndexOf(",") : c.length, u = c.substr(0, a), t[i] = isNaN(u) ? u.replace(yu, "").trim() : +u, i = c.substr(a + 1).trim();
  return t;
}, xu = function(e) {
  var t = e.indexOf("(") + 1, r = e.indexOf(")"), i = e.indexOf("(", t);
  return e.substring(t, ~i && i < r ? e.indexOf(")", r + 1) : r);
}, wu = function(e) {
  var t = (e + "").split("("), r = ie[t[0]];
  return r && t.length > 1 && r.config ? r.config.apply(null, ~e.indexOf("{") ? [vu(t[1])] : xu(e).split(",").map(Ma)) : ie._CE && bu.test(e) ? ie._CE("", e) : r;
}, ja = function(e) {
  return function(t) {
    return 1 - e(1 - t);
  };
}, Wa = function n(e, t) {
  for (var r = e._first, i; r; )
    r instanceof Fe ? n(r, t) : r.vars.yoyoEase && (!r._yoyo || !r._repeat) && r._yoyo !== t && (r.timeline ? n(r.timeline, t) : (i = r._ease, r._ease = r._yEase, r._yEase = i, r._yoyo = t)), r = r._next;
}, br = function(e, t) {
  return e && (be(e) ? e : ie[e] || wu(e)) || t;
}, Pr = function(e, t, r, i) {
  r === void 0 && (r = function(c) {
    return 1 - t(1 - c);
  }), i === void 0 && (i = function(c) {
    return c < 0.5 ? t(c * 2) / 2 : 1 - t((1 - c) * 2) / 2;
  });
  var o = {
    easeIn: t,
    easeOut: r,
    easeInOut: i
  }, s;
  return Xe(e, function(a) {
    ie[a] = et[a] = o, ie[s = a.toLowerCase()] = r;
    for (var c in o)
      ie[s + (c === "easeIn" ? ".in" : c === "easeOut" ? ".out" : ".inOut")] = ie[a + "." + c] = o[c];
  }), o;
}, Ua = function(e) {
  return function(t) {
    return t < 0.5 ? (1 - e(1 - t * 2)) / 2 : 0.5 + e((t - 0.5) * 2) / 2;
  };
}, On = function n(e, t, r) {
  var i = t >= 1 ? t : 1, o = (r || (e ? 0.3 : 0.45)) / (t < 1 ? t : 1), s = o / Zn * (Math.asin(1 / i) || 0), a = function(f) {
    return f === 1 ? 1 : i * Math.pow(2, -10 * f) * Qc((f - s) * o) + 1;
  }, c = e === "out" ? a : e === "in" ? function(u) {
    return 1 - a(1 - u);
  } : Ua(a);
  return o = Zn / o, c.config = function(u, f) {
    return n(e, u, f);
  }, c;
}, Dn = function n(e, t) {
  t === void 0 && (t = 1.70158);
  var r = function(s) {
    return s ? --s * s * ((t + 1) * s + t) + 1 : 0;
  }, i = e === "out" ? r : e === "in" ? function(o) {
    return 1 - r(1 - o);
  } : Ua(r);
  return i.config = function(o) {
    return n(e, o);
  }, i;
};
Xe("Linear,Quad,Cubic,Quart,Quint,Strong", function(n, e) {
  var t = e < 5 ? e + 1 : e;
  Pr(n + ",Power" + (t - 1), e ? function(r) {
    return Math.pow(r, t);
  } : function(r) {
    return r;
  }, function(r) {
    return 1 - Math.pow(1 - r, t);
  }, function(r) {
    return r < 0.5 ? Math.pow(r * 2, t) / 2 : 1 - Math.pow((1 - r) * 2, t) / 2;
  });
});
ie.Linear.easeNone = ie.none = ie.Linear.easeIn;
Pr("Elastic", On("in"), On("out"), On());
(function(n, e) {
  var t = 1 / e, r = 2 * t, i = 2.5 * t, o = function(a) {
    return a < t ? n * a * a : a < r ? n * Math.pow(a - 1.5 / e, 2) + 0.75 : a < i ? n * (a -= 2.25 / e) * a + 0.9375 : n * Math.pow(a - 2.625 / e, 2) + 0.984375;
  };
  Pr("Bounce", function(s) {
    return 1 - o(1 - s);
  }, o);
})(7.5625, 2.75);
Pr("Expo", function(n) {
  return Math.pow(2, 10 * (n - 1)) * n + n * n * n * n * n * n * (1 - n);
});
Pr("Circ", function(n) {
  return -(ma(1 - n * n) - 1);
});
Pr("Sine", function(n) {
  return n === 1 ? 1 : -qc(n * Uc) + 1;
});
Pr("Back", Dn("in"), Dn("out"), Dn());
ie.SteppedEase = ie.steps = et.SteppedEase = {
  config: function(e, t) {
    e === void 0 && (e = 1);
    var r = 1 / e, i = e + (t ? 0 : 1), o = t ? 1 : 0, s = 1 - de;
    return function(a) {
      return ((i * Ni(0, s, a) | 0) + o) * r;
    };
  }
};
Fr.ease = ie["quad.out"];
Xe("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(n) {
  return Ro += n + "," + n + "Params,";
});
var Ha = function(e, t) {
  this.id = Hc++, e._gsap = this, this.target = e, this.harness = t, this.get = t ? t.get : Pa, this.set = t ? t.getSetter : Vo;
}, Oi = /* @__PURE__ */ function() {
  function n(t) {
    this.vars = t, this._delay = +t.delay || 0, (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0, this._yoyo = !!t.yoyo || !!t.yoyoEase), this._ts = 1, Xr(this, +t.duration, 1, 1), this.data = t.data, pe && (this._ctx = pe, pe.data.push(this)), Ei || Qe.wake();
  }
  var e = n.prototype;
  return e.delay = function(r) {
    return r || r === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + r - this._delay), this._delay = r, this) : this._delay;
  }, e.duration = function(r) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? r + (r + this._rDelay) * this._repeat : r) : this.totalDuration() && this._dur;
  }, e.totalDuration = function(r) {
    return arguments.length ? (this._dirty = 0, Xr(this, this._repeat < 0 ? r : (r - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, e.totalTime = function(r, i) {
    if (Yr(), !arguments.length)
      return this._tTime;
    var o = this._dp;
    if (o && o.smoothChildTiming && this._ts) {
      for (gn(this, r), !o._dp || o.parent || Oa(o, this); o && o.parent; )
        o.parent._time !== o._start + (o._ts >= 0 ? o._tTime / o._ts : (o.totalDuration() - o._tTime) / -o._ts) && o.totalTime(o._tTime, !0), o = o.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && r < this._tDur || this._ts < 0 && r > 0 || !this._tDur && !r) && Tt(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== r || !this._dur && !i || this._initted && Math.abs(this._zTime) === de || !r && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = r), Sa(this, r, i)), this;
  }, e.time = function(r, i) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), r + ys(this)) % (this._dur + this._rDelay) || (r ? this._dur : 0), i) : this._time;
  }, e.totalProgress = function(r, i) {
    return arguments.length ? this.totalTime(this.totalDuration() * r, i) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, e.progress = function(r, i) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - r : r) + ys(this), i) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, e.iteration = function(r, i) {
    var o = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (r - 1) * o, i) : this._repeat ? Gr(this._tTime, o) + 1 : 1;
  }, e.timeScale = function(r, i) {
    if (!arguments.length)
      return this._rts === -de ? 0 : this._rts;
    if (this._rts === r)
      return this;
    var o = this.parent && this._ts ? on(this.parent._time, this) : this._tTime;
    return this._rts = +r || 0, this._ts = this._ps || r === -de ? 0 : this._rts, this.totalTime(Ni(-Math.abs(this._delay), this.totalDuration(), o), i !== !1), pn(this), iu(this);
  }, e.paused = function(r) {
    return arguments.length ? (this._ps !== r && (this._ps = r, r ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Yr(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== de && (this._tTime -= de)))), this) : this._ps;
  }, e.startTime = function(r) {
    if (arguments.length) {
      this._start = r;
      var i = this.parent || this._dp;
      return i && (i._sort || !this.parent) && Tt(i, this, r - this._delay), this;
    }
    return this._start;
  }, e.endTime = function(r) {
    return this._start + (Ge(r) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, e.rawTime = function(r) {
    var i = this.parent || this._dp;
    return i ? r && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? on(i.rawTime(r), this) : this._tTime : this._tTime;
  }, e.revert = function(r) {
    r === void 0 && (r = Jc);
    var i = Le;
    return Le = r, No(this) && (this.timeline && this.timeline.revert(r), this.totalTime(-0.01, r.suppressEvents)), this.data !== "nested" && r.kill !== !1 && this.kill(), Le = i, this;
  }, e.globalTime = function(r) {
    for (var i = this, o = arguments.length ? r : i.rawTime(); i; )
      o = i._start + o / (Math.abs(i._ts) || 1), i = i._dp;
    return !this.parent && this._sat ? this._sat.globalTime(r) : o;
  }, e.repeat = function(r) {
    return arguments.length ? (this._repeat = r === 1 / 0 ? -2 : r, vs(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, e.repeatDelay = function(r) {
    if (arguments.length) {
      var i = this._time;
      return this._rDelay = r, vs(this), i ? this.time(i) : this;
    }
    return this._rDelay;
  }, e.yoyo = function(r) {
    return arguments.length ? (this._yoyo = r, this) : this._yoyo;
  }, e.seek = function(r, i) {
    return this.totalTime(ct(this, r), Ge(i));
  }, e.restart = function(r, i) {
    return this.play().totalTime(r ? -this._delay : 0, Ge(i)), this._dur || (this._zTime = -de), this;
  }, e.play = function(r, i) {
    return r != null && this.seek(r, i), this.reversed(!1).paused(!1);
  }, e.reverse = function(r, i) {
    return r != null && this.seek(r || this.totalDuration(), i), this.reversed(!0).paused(!1);
  }, e.pause = function(r, i) {
    return r != null && this.seek(r, i), this.paused(!0);
  }, e.resume = function() {
    return this.paused(!1);
  }, e.reversed = function(r) {
    return arguments.length ? (!!r !== this.reversed() && this.timeScale(-this._rts || (r ? -de : 0)), this) : this._rts < 0;
  }, e.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -de, this;
  }, e.isActive = function() {
    var r = this.parent || this._dp, i = this._start, o;
    return !!(!r || this._ts && this._initted && r.isActive() && (o = r.rawTime(!0)) >= i && o < this.endTime(!0) - de);
  }, e.eventCallback = function(r, i, o) {
    var s = this.vars;
    return arguments.length > 1 ? (i ? (s[r] = i, o && (s[r + "Params"] = o), r === "onUpdate" && (this._onUpdate = i)) : delete s[r], this) : s[r];
  }, e.then = function(r) {
    var i = this;
    return new Promise(function(o) {
      var s = be(r) ? r : Ca, a = function() {
        var u = i.then;
        i.then = null, be(s) && (s = s(i)) && (s.then || s === i) && (i.then = u), o(s), i.then = u;
      };
      i._initted && i.totalProgress() === 1 && i._ts >= 0 || !i._tTime && i._ts < 0 ? a() : i._prom = a;
    });
  }, e.kill = function() {
    ui(this);
  }, n;
}();
tt(Oi.prototype, {
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
  _zTime: -de,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var Fe = /* @__PURE__ */ function(n) {
  ga(e, n);
  function e(r, i) {
    var o;
    return r === void 0 && (r = {}), o = n.call(this, r) || this, o.labels = {}, o.smoothChildTiming = !!r.smoothChildTiming, o.autoRemoveChildren = !!r.autoRemoveChildren, o._sort = Ge(r.sortChildren), ge && Tt(r.parent || ge, zt(o), i), r.reversed && o.reverse(), r.paused && o.paused(!0), r.scrollTrigger && Da(zt(o), r.scrollTrigger), o;
  }
  var t = e.prototype;
  return t.to = function(i, o, s) {
    return bi(0, arguments, this), this;
  }, t.from = function(i, o, s) {
    return bi(1, arguments, this), this;
  }, t.fromTo = function(i, o, s, a) {
    return bi(2, arguments, this), this;
  }, t.set = function(i, o, s) {
    return o.duration = 0, o.parent = this, _i(o).repeatDelay || (o.repeat = 0), o.immediateRender = !!o.immediateRender, new Me(i, o, ct(this, s), 1), this;
  }, t.call = function(i, o, s) {
    return Tt(this, Me.delayedCall(0, i, o), s);
  }, t.staggerTo = function(i, o, s, a, c, u, f) {
    return s.duration = o, s.stagger = s.stagger || a, s.onComplete = u, s.onCompleteParams = f, s.parent = this, new Me(i, s, ct(this, c)), this;
  }, t.staggerFrom = function(i, o, s, a, c, u, f) {
    return s.runBackwards = 1, _i(s).immediateRender = Ge(s.immediateRender), this.staggerTo(i, o, s, a, c, u, f);
  }, t.staggerFromTo = function(i, o, s, a, c, u, f, d) {
    return a.startAt = s, _i(a).immediateRender = Ge(a.immediateRender), this.staggerTo(i, o, a, c, u, f, d);
  }, t.render = function(i, o, s) {
    var a = this._time, c = this._dirty ? this.totalDuration() : this._tDur, u = this._dur, f = i <= 0 ? 0 : Ce(i), d = this._zTime < 0 != i < 0 && (this._initted || !u), p, l, g, h, b, w, T, O, k, _, y, v;
    if (this !== ge && f > c && i >= 0 && (f = c), f !== this._tTime || s || d) {
      if (a !== this._time && u && (f += this._time - a, i += this._time - a), p = f, k = this._start, O = this._ts, w = !O, d && (u || (a = this._zTime), (i || !o) && (this._zTime = i)), this._repeat) {
        if (y = this._yoyo, b = u + this._rDelay, this._repeat < -1 && i < 0)
          return this.totalTime(b * 100 + i, o, s);
        if (p = Ce(f % b), f === c ? (h = this._repeat, p = u) : (_ = Ce(f / b), h = ~~_, h && h === _ && (p = u, h--), p > u && (p = u)), _ = Gr(this._tTime, b), !a && this._tTime && _ !== h && this._tTime - _ * b - this._dur <= 0 && (_ = h), y && h & 1 && (p = u - p, v = 1), h !== _ && !this._lock) {
          var x = y && _ & 1, P = x === (y && h & 1);
          if (h < _ && (x = !x), a = x ? 0 : f % u ? u : f, this._lock = 1, this.render(a || (v ? 0 : Ce(h * b)), o, !u)._lock = 0, this._tTime = f, !o && this.parent && Ze(this, "onRepeat"), this.vars.repeatRefresh && !v && (this.invalidate()._lock = 1), a && a !== this._time || w !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (u = this._dur, c = this._tDur, P && (this._lock = 2, a = x ? u : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !v && this.invalidate()), this._lock = 0, !this._ts && !w)
            return this;
          Wa(this, v);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (T = au(this, Ce(a), Ce(p)), T && (f -= p - (p = T._start))), this._tTime = f, this._time = p, this._act = !O, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = i, a = 0), !a && f && !o && !_ && (Ze(this, "onStart"), this._tTime !== f))
        return this;
      if (p >= a && i >= 0)
        for (l = this._first; l; ) {
          if (g = l._next, (l._act || p >= l._start) && l._ts && T !== l) {
            if (l.parent !== this)
              return this.render(i, o, s);
            if (l.render(l._ts > 0 ? (p - l._start) * l._ts : (l._dirty ? l.totalDuration() : l._tDur) + (p - l._start) * l._ts, o, s), p !== this._time || !this._ts && !w) {
              T = 0, g && (f += this._zTime = -de);
              break;
            }
          }
          l = g;
        }
      else {
        l = this._last;
        for (var E = i < 0 ? i : p; l; ) {
          if (g = l._prev, (l._act || E <= l._end) && l._ts && T !== l) {
            if (l.parent !== this)
              return this.render(i, o, s);
            if (l.render(l._ts > 0 ? (E - l._start) * l._ts : (l._dirty ? l.totalDuration() : l._tDur) + (E - l._start) * l._ts, o, s || Le && No(l)), p !== this._time || !this._ts && !w) {
              T = 0, g && (f += this._zTime = E ? -de : de);
              break;
            }
          }
          l = g;
        }
      }
      if (T && !o && (this.pause(), T.render(p >= a ? 0 : -de)._zTime = p >= a ? 1 : -1, this._ts))
        return this._start = k, pn(this), this.render(i, o, s);
      this._onUpdate && !o && Ze(this, "onUpdate", !0), (f === c && this._tTime >= this.totalDuration() || !f && a) && (k === this._start || Math.abs(O) !== Math.abs(this._ts)) && (this._lock || ((i || !u) && (f === c && this._ts > 0 || !f && this._ts < 0) && er(this, 1), !o && !(i < 0 && !a) && (f || a || !c) && (Ze(this, f === c && i >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(f < c && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, t.add = function(i, o) {
    var s = this;
    if (Vt(o) || (o = ct(this, o, i)), !(i instanceof Oi)) {
      if (Ve(i))
        return i.forEach(function(a) {
          return s.add(a, o);
        }), this;
      if (Ae(i))
        return this.addLabel(i, o);
      if (be(i))
        i = Me.delayedCall(0, i);
      else
        return this;
    }
    return this !== i ? Tt(this, i, o) : this;
  }, t.getChildren = function(i, o, s, a) {
    i === void 0 && (i = !0), o === void 0 && (o = !0), s === void 0 && (s = !0), a === void 0 && (a = -ut);
    for (var c = [], u = this._first; u; )
      u._start >= a && (u instanceof Me ? o && c.push(u) : (s && c.push(u), i && c.push.apply(c, u.getChildren(!0, o, s)))), u = u._next;
    return c;
  }, t.getById = function(i) {
    for (var o = this.getChildren(1, 1, 1), s = o.length; s--; )
      if (o[s].vars.id === i)
        return o[s];
  }, t.remove = function(i) {
    return Ae(i) ? this.removeLabel(i) : be(i) ? this.killTweensOf(i) : (i.parent === this && hn(this, i), i === this._recent && (this._recent = this._last), _r(this));
  }, t.totalTime = function(i, o) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = Ce(Qe.time - (this._ts > 0 ? i / this._ts : (this.totalDuration() - i) / -this._ts))), n.prototype.totalTime.call(this, i, o), this._forcing = 0, this) : this._tTime;
  }, t.addLabel = function(i, o) {
    return this.labels[i] = ct(this, o), this;
  }, t.removeLabel = function(i) {
    return delete this.labels[i], this;
  }, t.addPause = function(i, o, s) {
    var a = Me.delayedCall(0, o || Mi, s);
    return a.data = "isPause", this._hasPause = 1, Tt(this, a, ct(this, i));
  }, t.removePause = function(i) {
    var o = this._first;
    for (i = ct(this, i); o; )
      o._start === i && o.data === "isPause" && er(o), o = o._next;
  }, t.killTweensOf = function(i, o, s) {
    for (var a = this.getTweensOf(i, s), c = a.length; c--; )
      Ht !== a[c] && a[c].kill(i, o);
    return this;
  }, t.getTweensOf = function(i, o) {
    for (var s = [], a = ft(i), c = this._first, u = Vt(o), f; c; )
      c instanceof Me ? eu(c._targets, a) && (u ? (!Ht || c._initted && c._ts) && c.globalTime(0) <= o && c.globalTime(c.totalDuration()) > o : !o || c.isActive()) && s.push(c) : (f = c.getTweensOf(a, o)).length && s.push.apply(s, f), c = c._next;
    return s;
  }, t.tweenTo = function(i, o) {
    o = o || {};
    var s = this, a = ct(s, i), c = o, u = c.startAt, f = c.onStart, d = c.onStartParams, p = c.immediateRender, l, g = Me.to(s, tt({
      ease: o.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: a,
      overwrite: "auto",
      duration: o.duration || Math.abs((a - (u && "time" in u ? u.time : s._time)) / s.timeScale()) || de,
      onStart: function() {
        if (s.pause(), !l) {
          var b = o.duration || Math.abs((a - (u && "time" in u ? u.time : s._time)) / s.timeScale());
          g._dur !== b && Xr(g, b, 0, 1).render(g._time, !0, !0), l = 1;
        }
        f && f.apply(g, d || []);
      }
    }, o));
    return p ? g.render(0) : g;
  }, t.tweenFromTo = function(i, o, s) {
    return this.tweenTo(o, tt({
      startAt: {
        time: ct(this, i)
      }
    }, s));
  }, t.recent = function() {
    return this._recent;
  }, t.nextLabel = function(i) {
    return i === void 0 && (i = this._time), xs(this, ct(this, i));
  }, t.previousLabel = function(i) {
    return i === void 0 && (i = this._time), xs(this, ct(this, i), 1);
  }, t.currentLabel = function(i) {
    return arguments.length ? this.seek(i, !0) : this.previousLabel(this._time + de);
  }, t.shiftChildren = function(i, o, s) {
    s === void 0 && (s = 0);
    for (var a = this._first, c = this.labels, u; a; )
      a._start >= s && (a._start += i, a._end += i), a = a._next;
    if (o)
      for (u in c)
        c[u] >= s && (c[u] += i);
    return _r(this);
  }, t.invalidate = function(i) {
    var o = this._first;
    for (this._lock = 0; o; )
      o.invalidate(i), o = o._next;
    return n.prototype.invalidate.call(this, i);
  }, t.clear = function(i) {
    i === void 0 && (i = !0);
    for (var o = this._first, s; o; )
      s = o._next, this.remove(o), o = s;
    return this._dp && (this._time = this._tTime = this._pTime = 0), i && (this.labels = {}), _r(this);
  }, t.totalDuration = function(i) {
    var o = 0, s = this, a = s._last, c = ut, u, f, d;
    if (arguments.length)
      return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -i : i));
    if (s._dirty) {
      for (d = s.parent; a; )
        u = a._prev, a._dirty && a.totalDuration(), f = a._start, f > c && s._sort && a._ts && !s._lock ? (s._lock = 1, Tt(s, a, f - a._delay, 1)._lock = 0) : c = f, f < 0 && a._ts && (o -= f, (!d && !s._dp || d && d.smoothChildTiming) && (s._start += f / s._ts, s._time -= f, s._tTime -= f), s.shiftChildren(-f, !1, -1 / 0), c = 0), a._end > o && a._ts && (o = a._end), a = u;
      Xr(s, s === ge && s._time > o ? s._time : o, 1, 1), s._dirty = 0;
    }
    return s._tDur;
  }, e.updateRoot = function(i) {
    if (ge._ts && (Sa(ge, on(i, ge)), Ta = Qe.frame), Qe.frame >= _s) {
      _s += Je.autoSleep || 120;
      var o = ge._first;
      if ((!o || !o._ts) && Je.autoSleep && Qe._listeners.length < 2) {
        for (; o && !o._ts; )
          o = o._next;
        o || Qe.sleep();
      }
    }
  }, e;
}(Oi);
tt(Fe.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var ku = function(e, t, r, i, o, s, a) {
  var c = new Ye(this._pt, e, t, 0, 1, el, null, o), u = 0, f = 0, d, p, l, g, h, b, w, T;
  for (c.b = r, c.e = i, r += "", i += "", (w = ~i.indexOf("random(")) && (i = Ci(i)), s && (T = [r, i], s(T, e, t), r = T[0], i = T[1]), p = r.match(Mn) || []; d = Mn.exec(i); )
    g = d[0], h = i.substring(u, d.index), l ? l = (l + 1) % 5 : h.substr(-5) === "rgba(" && (l = 1), g !== p[f++] && (b = parseFloat(p[f - 1]) || 0, c._pt = {
      _next: c._pt,
      p: h || f === 1 ? h : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: b,
      c: g.charAt(1) === "=" ? zr(b, g) - b : parseFloat(g) - b,
      m: l && l < 4 ? Math.round : 0
    }, u = Mn.lastIndex);
  return c.c = u < i.length ? i.substring(u, i.length) : "", c.fp = a, (ya.test(i) || w) && (c.e = 0), this._pt = c, c;
}, Lo = function(e, t, r, i, o, s, a, c, u, f) {
  be(i) && (i = i(o || 0, e, s));
  var d = e[t], p = r !== "get" ? r : be(d) ? u ? e[t.indexOf("set") || !be(e["get" + t.substr(3)]) ? t : "get" + t.substr(3)](u) : e[t]() : d, l = be(d) ? u ? Cu : Za : $o, g;
  if (Ae(i) && (~i.indexOf("random(") && (i = Ci(i)), i.charAt(1) === "=" && (g = zr(p, i) + ($e(p) || 0), (g || g === 0) && (i = g))), !f || p !== i || ao)
    return !isNaN(p * i) && i !== "" ? (g = new Ye(this._pt, e, t, +p || 0, i - (p || 0), typeof d == "boolean" ? Ou : Ja, 0, l), u && (g.fp = u), a && g.modifier(a, this, e), this._pt = g) : (!d && !(t in e) && Do(t, i), ku.call(this, e, t, p, i, l, c || Je.stringFilter, u));
}, Tu = function(e, t, r, i, o) {
  if (be(e) && (e = yi(e, o, t, r, i)), !Et(e) || e.style && e.nodeType || Ve(e) || _a(e))
    return Ae(e) ? yi(e, o, t, r, i) : e;
  var s = {}, a;
  for (a in e)
    s[a] = yi(e[a], o, t, r, i);
  return s;
}, qa = function(e, t, r, i, o, s) {
  var a, c, u, f;
  if (qe[e] && (a = new qe[e]()).init(o, a.rawVars ? t[e] : Tu(t[e], i, o, s, r), r, i, s) !== !1 && (r._pt = c = new Ye(r._pt, o, e, 0, 1, a.render, a, 0, a.priority), r !== Rr))
    for (u = r._ptLookup[r._targets.indexOf(o)], f = a._props.length; f--; )
      u[a._props[f]] = c;
  return a;
}, Ht, ao, Io = function n(e, t, r) {
  var i = e.vars, o = i.ease, s = i.startAt, a = i.immediateRender, c = i.lazy, u = i.onUpdate, f = i.runBackwards, d = i.yoyoEase, p = i.keyframes, l = i.autoRevert, g = e._dur, h = e._startAt, b = e._targets, w = e.parent, T = w && w.data === "nested" ? w.vars.targets : b, O = e._overwrite === "auto" && !Mo, k = e.timeline, _, y, v, x, P, E, M, A, C, L, I, R, $;
  if (k && (!p || !o) && (o = "none"), e._ease = br(o, Fr.ease), e._yEase = d ? ja(br(d === !0 ? o : d, Fr.ease)) : 0, d && e._yoyo && !e._repeat && (d = e._yEase, e._yEase = e._ease, e._ease = d), e._from = !k && !!i.runBackwards, !k || p && !i.stagger) {
    if (A = b[0] ? mr(b[0]).harness : 0, R = A && i[A.prop], _ = nn(i, Ao), h && (h._zTime < 0 && h.progress(1), t < 0 && f && a && !l ? h.render(-1, !0) : h.revert(f && g ? Hi : Zc), h._lazy = 0), s) {
      if (er(e._startAt = Me.set(b, tt({
        data: "isStart",
        overwrite: !1,
        parent: w,
        immediateRender: !0,
        lazy: !h && Ge(c),
        startAt: null,
        delay: 0,
        onUpdate: u && function() {
          return Ze(e, "onUpdate");
        },
        stagger: 0
      }, s))), e._startAt._dp = 0, e._startAt._sat = e, t < 0 && (Le || !a && !l) && e._startAt.revert(Hi), a && g && t <= 0 && r <= 0) {
        t && (e._zTime = t);
        return;
      }
    } else if (f && g && !h) {
      if (t && (a = !1), v = tt({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: a && !h && Ge(c),
        immediateRender: a,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: w
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, _), R && (v[A.prop] = R), er(e._startAt = Me.set(b, v)), e._startAt._dp = 0, e._startAt._sat = e, t < 0 && (Le ? e._startAt.revert(Hi) : e._startAt.render(-1, !0)), e._zTime = t, !a)
        n(e._startAt, de, de);
      else if (!t)
        return;
    }
    for (e._pt = e._ptCache = 0, c = g && Ge(c) || c && !g, y = 0; y < b.length; y++) {
      if (P = b[y], M = P._gsap || zo(b)[y]._gsap, e._ptLookup[y] = L = {}, to[M.id] && Zt.length && rn(), I = T === b ? y : T.indexOf(P), A && (C = new A()).init(P, R || _, e, I, T) !== !1 && (e._pt = x = new Ye(e._pt, P, C.name, 0, 1, C.render, C, 0, C.priority), C._props.forEach(function(D) {
        L[D] = x;
      }), C.priority && (E = 1)), !A || R)
        for (v in _)
          qe[v] && (C = qa(v, _, e, I, P, T)) ? C.priority && (E = 1) : L[v] = x = Lo.call(e, P, v, "get", _[v], I, T, 0, i.stringFilter);
      e._op && e._op[y] && e.kill(P, e._op[y]), O && e._pt && (Ht = e, ge.killTweensOf(P, L, e.globalTime(t)), $ = !e.parent, Ht = 0), e._pt && c && (to[M.id] = 1);
    }
    E && tl(e), e._onInit && e._onInit(e);
  }
  e._onUpdate = u, e._initted = (!e._op || e._pt) && !$, p && t <= 0 && k.render(ut, !0, !0);
}, Pu = function(e, t, r, i, o, s, a, c) {
  var u = (e._pt && e._ptCache || (e._ptCache = {}))[t], f, d, p, l;
  if (!u)
    for (u = e._ptCache[t] = [], p = e._ptLookup, l = e._targets.length; l--; ) {
      if (f = p[l][t], f && f.d && f.d._pt)
        for (f = f.d._pt; f && f.p !== t && f.fp !== t; )
          f = f._next;
      if (!f)
        return ao = 1, e.vars[t] = "+=0", Io(e, a), ao = 0, c ? Si(t + " not eligible for reset") : 1;
      u.push(f);
    }
  for (l = u.length; l--; )
    d = u[l], f = d._pt || d, f.s = (i || i === 0) && !o ? i : f.s + (i || 0) + s * f.c, f.c = r - f.s, d.e && (d.e = Te(r) + $e(d.e)), d.b && (d.b = f.s + $e(d.b));
}, Su = function(e, t) {
  var r = e[0] ? mr(e[0]).harness : 0, i = r && r.aliases, o, s, a, c;
  if (!i)
    return t;
  o = Br({}, t);
  for (s in i)
    if (s in o)
      for (c = i[s].split(","), a = c.length; a--; )
        o[c[a]] = o[s];
  return o;
}, Mu = function(e, t, r, i) {
  var o = t.ease || i || "power1.inOut", s, a;
  if (Ve(t))
    a = r[e] || (r[e] = []), t.forEach(function(c, u) {
      return a.push({
        t: u / (t.length - 1) * 100,
        v: c,
        e: o
      });
    });
  else
    for (s in t)
      a = r[s] || (r[s] = []), s === "ease" || a.push({
        t: parseFloat(e),
        v: t[s],
        e: o
      });
}, yi = function(e, t, r, i, o) {
  return be(e) ? e.call(t, r, i, o) : Ae(e) && ~e.indexOf("random(") ? Ci(e) : e;
}, Qa = Ro + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", Ka = {};
Xe(Qa + ",id,stagger,delay,duration,paused,scrollTrigger", function(n) {
  return Ka[n] = 1;
});
var Me = /* @__PURE__ */ function(n) {
  ga(e, n);
  function e(r, i, o, s) {
    var a;
    typeof i == "number" && (o.duration = i, i = o, o = null), a = n.call(this, s ? i : _i(i)) || this;
    var c = a.vars, u = c.duration, f = c.delay, d = c.immediateRender, p = c.stagger, l = c.overwrite, g = c.keyframes, h = c.defaults, b = c.scrollTrigger, w = c.yoyoEase, T = i.parent || ge, O = (Ve(r) || _a(r) ? Vt(r[0]) : "length" in i) ? [r] : ft(r), k, _, y, v, x, P, E, M;
    if (a._targets = O.length ? zo(O) : Si("GSAP target " + r + " not found. https://gsap.com", !Je.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = l, g || p || Xi(u) || Xi(f)) {
      if (i = a.vars, k = a.timeline = new Fe({
        data: "nested",
        defaults: h || {},
        targets: T && T.data === "nested" ? T.vars.targets : O
      }), k.kill(), k.parent = k._dp = zt(a), k._start = 0, p || Xi(u) || Xi(f)) {
        if (v = O.length, E = p && Na(p), Et(p))
          for (x in p)
            ~Qa.indexOf(x) && (M || (M = {}), M[x] = p[x]);
        for (_ = 0; _ < v; _++)
          y = nn(i, Ka), y.stagger = 0, w && (y.yoyoEase = w), M && Br(y, M), P = O[_], y.duration = +yi(u, zt(a), _, P, O), y.delay = (+yi(f, zt(a), _, P, O) || 0) - a._delay, !p && v === 1 && y.delay && (a._delay = f = y.delay, a._start += f, y.delay = 0), k.to(P, y, E ? E(_, P, O) : 0), k._ease = ie.none;
        k.duration() ? u = f = 0 : a.timeline = 0;
      } else if (g) {
        _i(tt(k.vars.defaults, {
          ease: "none"
        })), k._ease = br(g.ease || i.ease || "none");
        var A = 0, C, L, I;
        if (Ve(g))
          g.forEach(function(R) {
            return k.to(O, R, ">");
          }), k.duration();
        else {
          y = {};
          for (x in g)
            x === "ease" || x === "easeEach" || Mu(x, g[x], y, g.easeEach);
          for (x in y)
            for (C = y[x].sort(function(R, $) {
              return R.t - $.t;
            }), A = 0, _ = 0; _ < C.length; _++)
              L = C[_], I = {
                ease: L.e,
                duration: (L.t - (_ ? C[_ - 1].t : 0)) / 100 * u
              }, I[x] = L.v, k.to(O, I, A), A += I.duration;
          k.duration() < u && k.to({}, {
            duration: u - k.duration()
          });
        }
      }
      u || a.duration(u = k.duration());
    } else
      a.timeline = 0;
    return l === !0 && !Mo && (Ht = zt(a), ge.killTweensOf(O), Ht = 0), Tt(T, zt(a), o), i.reversed && a.reverse(), i.paused && a.paused(!0), (d || !u && !g && a._start === Ce(T._time) && Ge(d) && nu(zt(a)) && T.data !== "nested") && (a._tTime = -de, a.render(Math.max(0, -f) || 0)), b && Da(zt(a), b), a;
  }
  var t = e.prototype;
  return t.render = function(i, o, s) {
    var a = this._time, c = this._tDur, u = this._dur, f = i < 0, d = i > c - de && !f ? c : i < de ? 0 : i, p, l, g, h, b, w, T, O, k;
    if (!u)
      su(this, i, o, s);
    else if (d !== this._tTime || !i || s || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== f || this._lazy) {
      if (p = d, O = this.timeline, this._repeat) {
        if (h = u + this._rDelay, this._repeat < -1 && f)
          return this.totalTime(h * 100 + i, o, s);
        if (p = Ce(d % h), d === c ? (g = this._repeat, p = u) : (b = Ce(d / h), g = ~~b, g && g === b ? (p = u, g--) : p > u && (p = u)), w = this._yoyo && g & 1, w && (k = this._yEase, p = u - p), b = Gr(this._tTime, h), p === a && !s && this._initted && g === b)
          return this._tTime = d, this;
        g !== b && (O && this._yEase && Wa(O, w), this.vars.repeatRefresh && !w && !this._lock && p !== h && this._initted && (this._lock = s = 1, this.render(Ce(h * g), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (Aa(this, f ? i : p, s, o, d))
          return this._tTime = 0, this;
        if (a !== this._time && !(s && this.vars.repeatRefresh && g !== b))
          return this;
        if (u !== this._dur)
          return this.render(i, o, s);
      }
      if (this._tTime = d, this._time = p, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = T = (k || this._ease)(p / u), this._from && (this.ratio = T = 1 - T), !a && d && !o && !b && (Ze(this, "onStart"), this._tTime !== d))
        return this;
      for (l = this._pt; l; )
        l.r(T, l.d), l = l._next;
      O && O.render(i < 0 ? i : O._dur * O._ease(p / this._dur), o, s) || this._startAt && (this._zTime = i), this._onUpdate && !o && (f && ro(this, i, o, s), Ze(this, "onUpdate")), this._repeat && g !== b && this.vars.onRepeat && !o && this.parent && Ze(this, "onRepeat"), (d === this._tDur || !d) && this._tTime === d && (f && !this._onUpdate && ro(this, i, !0, !0), (i || !u) && (d === this._tDur && this._ts > 0 || !d && this._ts < 0) && er(this, 1), !o && !(f && !a) && (d || a || w) && (Ze(this, d === c ? "onComplete" : "onReverseComplete", !0), this._prom && !(d < c && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, t.targets = function() {
    return this._targets;
  }, t.invalidate = function(i) {
    return (!i || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(i), n.prototype.invalidate.call(this, i);
  }, t.resetTo = function(i, o, s, a, c) {
    Ei || Qe.wake(), this._ts || this.play();
    var u = Math.min(this._dur, (this._dp._time - this._start) * this._ts), f;
    return this._initted || Io(this, u), f = this._ease(u / this._dur), Pu(this, i, o, s, a, f, u, c) ? this.resetTo(i, o, s, a, 1) : (gn(this, 0), this.parent || Ea(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, t.kill = function(i, o) {
    if (o === void 0 && (o = "all"), !i && (!o || o === "all"))
      return this._lazy = this._pt = 0, this.parent ? ui(this) : this.scrollTrigger && this.scrollTrigger.kill(!!Le), this;
    if (this.timeline) {
      var s = this.timeline.totalDuration();
      return this.timeline.killTweensOf(i, o, Ht && Ht.vars.overwrite !== !0)._first || ui(this), this.parent && s !== this.timeline.totalDuration() && Xr(this, this._dur * this.timeline._tDur / s, 0, 1), this;
    }
    var a = this._targets, c = i ? ft(i) : a, u = this._ptLookup, f = this._pt, d, p, l, g, h, b, w;
    if ((!o || o === "all") && ru(a, c))
      return o === "all" && (this._pt = 0), ui(this);
    for (d = this._op = this._op || [], o !== "all" && (Ae(o) && (h = {}, Xe(o, function(T) {
      return h[T] = 1;
    }), o = h), o = Su(a, o)), w = a.length; w--; )
      if (~c.indexOf(a[w])) {
        p = u[w], o === "all" ? (d[w] = o, g = p, l = {}) : (l = d[w] = d[w] || {}, g = o);
        for (h in g)
          b = p && p[h], b && ((!("kill" in b.d) || b.d.kill(h) === !0) && hn(this, b, "_pt"), delete p[h]), l !== "all" && (l[h] = 1);
      }
    return this._initted && !this._pt && f && ui(this), this;
  }, e.to = function(i, o) {
    return new e(i, o, arguments[2]);
  }, e.from = function(i, o) {
    return bi(1, arguments);
  }, e.delayedCall = function(i, o, s, a) {
    return new e(o, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: i,
      onComplete: o,
      onReverseComplete: o,
      onCompleteParams: s,
      onReverseCompleteParams: s,
      callbackScope: a
    });
  }, e.fromTo = function(i, o, s) {
    return bi(2, arguments);
  }, e.set = function(i, o) {
    return o.duration = 0, o.repeatDelay || (o.repeat = 0), new e(i, o);
  }, e.killTweensOf = function(i, o, s) {
    return ge.killTweensOf(i, o, s);
  }, e;
}(Oi);
tt(Me.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
Xe("staggerTo,staggerFrom,staggerFromTo", function(n) {
  Me[n] = function() {
    var e = new Fe(), t = no.call(arguments, 0);
    return t.splice(n === "staggerFromTo" ? 5 : 4, 0, 0), e[n].apply(e, t);
  };
});
var $o = function(e, t, r) {
  return e[t] = r;
}, Za = function(e, t, r) {
  return e[t](r);
}, Cu = function(e, t, r, i) {
  return e[t](i.fp, r);
}, Eu = function(e, t, r) {
  return e.setAttribute(t, r);
}, Vo = function(e, t) {
  return be(e[t]) ? Za : Co(e[t]) && e.setAttribute ? Eu : $o;
}, Ja = function(e, t) {
  return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t);
}, Ou = function(e, t) {
  return t.set(t.t, t.p, !!(t.s + t.c * e), t);
}, el = function(e, t) {
  var r = t._pt, i = "";
  if (!e && t.b)
    i = t.b;
  else if (e === 1 && t.e)
    i = t.e;
  else {
    for (; r; )
      i = r.p + (r.m ? r.m(r.s + r.c * e) : Math.round((r.s + r.c * e) * 1e4) / 1e4) + i, r = r._next;
    i += t.c;
  }
  t.set(t.t, t.p, i, t);
}, Fo = function(e, t) {
  for (var r = t._pt; r; )
    r.r(e, r.d), r = r._next;
}, Du = function(e, t, r, i) {
  for (var o = this._pt, s; o; )
    s = o._next, o.p === i && o.modifier(e, t, r), o = s;
}, Au = function(e) {
  for (var t = this._pt, r, i; t; )
    i = t._next, t.p === e && !t.op || t.op === e ? hn(this, t, "_pt") : t.dep || (r = 1), t = i;
  return !r;
}, Ru = function(e, t, r, i) {
  i.mSet(e, t, i.m.call(i.tween, r, i.mt), i);
}, tl = function(e) {
  for (var t = e._pt, r, i, o, s; t; ) {
    for (r = t._next, i = o; i && i.pr > t.pr; )
      i = i._next;
    (t._prev = i ? i._prev : s) ? t._prev._next = t : o = t, (t._next = i) ? i._prev = t : s = t, t = r;
  }
  e._pt = o;
}, Ye = /* @__PURE__ */ function() {
  function n(t, r, i, o, s, a, c, u, f) {
    this.t = r, this.s = o, this.c = s, this.p = i, this.r = a || Ja, this.d = c || this, this.set = u || $o, this.pr = f || 0, this._next = t, t && (t._prev = this);
  }
  var e = n.prototype;
  return e.modifier = function(r, i, o) {
    this.mSet = this.mSet || this.set, this.set = Ru, this.m = r, this.mt = o, this.tween = i;
  }, n;
}();
Xe(Ro + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(n) {
  return Ao[n] = 1;
});
et.TweenMax = et.TweenLite = Me;
et.TimelineLite = et.TimelineMax = Fe;
ge = new Fe({
  sortChildren: !1,
  defaults: Fr,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
Je.stringFilter = Ya;
var yr = [], Qi = {}, zu = [], ks = 0, Nu = 0, An = function(e) {
  return (Qi[e] || zu).map(function(t) {
    return t();
  });
}, lo = function() {
  var e = Date.now(), t = [];
  e - ks > 2 && (An("matchMediaInit"), yr.forEach(function(r) {
    var i = r.queries, o = r.conditions, s, a, c, u;
    for (a in i)
      s = kt.matchMedia(i[a]).matches, s && (c = 1), s !== o[a] && (o[a] = s, u = 1);
    u && (r.revert(), c && t.push(r));
  }), An("matchMediaRevert"), t.forEach(function(r) {
    return r.onMatch(r, function(i) {
      return r.add(null, i);
    });
  }), ks = e, An("matchMedia"));
}, rl = /* @__PURE__ */ function() {
  function n(t, r) {
    this.selector = r && oo(r), this.data = [], this._r = [], this.isReverted = !1, this.id = Nu++, t && this.add(t);
  }
  var e = n.prototype;
  return e.add = function(r, i, o) {
    be(r) && (o = i, i = r, r = be);
    var s = this, a = function() {
      var u = pe, f = s.selector, d;
      return u && u !== s && u.data.push(s), o && (s.selector = oo(o)), pe = s, d = i.apply(s, arguments), be(d) && s._r.push(d), pe = u, s.selector = f, s.isReverted = !1, d;
    };
    return s.last = a, r === be ? a(s, function(c) {
      return s.add(null, c);
    }) : r ? s[r] = a : a;
  }, e.ignore = function(r) {
    var i = pe;
    pe = null, r(this), pe = i;
  }, e.getTweens = function() {
    var r = [];
    return this.data.forEach(function(i) {
      return i instanceof n ? r.push.apply(r, i.getTweens()) : i instanceof Me && !(i.parent && i.parent.data === "nested") && r.push(i);
    }), r;
  }, e.clear = function() {
    this._r.length = this.data.length = 0;
  }, e.kill = function(r, i) {
    var o = this;
    if (r ? function() {
      for (var a = o.getTweens(), c = o.data.length, u; c--; )
        u = o.data[c], u.data === "isFlip" && (u.revert(), u.getChildren(!0, !0, !1).forEach(function(f) {
          return a.splice(a.indexOf(f), 1);
        }));
      for (a.map(function(f) {
        return {
          g: f._dur || f._delay || f._sat && !f._sat.vars.immediateRender ? f.globalTime(0) : -1 / 0,
          t: f
        };
      }).sort(function(f, d) {
        return d.g - f.g || -1 / 0;
      }).forEach(function(f) {
        return f.t.revert(r);
      }), c = o.data.length; c--; )
        u = o.data[c], u instanceof Fe ? u.data !== "nested" && (u.scrollTrigger && u.scrollTrigger.revert(), u.kill()) : !(u instanceof Me) && u.revert && u.revert(r);
      o._r.forEach(function(f) {
        return f(r, o);
      }), o.isReverted = !0;
    }() : this.data.forEach(function(a) {
      return a.kill && a.kill();
    }), this.clear(), i)
      for (var s = yr.length; s--; )
        yr[s].id === this.id && yr.splice(s, 1);
  }, e.revert = function(r) {
    this.kill(r || {});
  }, n;
}(), Lu = /* @__PURE__ */ function() {
  function n(t) {
    this.contexts = [], this.scope = t, pe && pe.data.push(this);
  }
  var e = n.prototype;
  return e.add = function(r, i, o) {
    Et(r) || (r = {
      matches: r
    });
    var s = new rl(0, o || this.scope), a = s.conditions = {}, c, u, f;
    pe && !s.selector && (s.selector = pe.selector), this.contexts.push(s), i = s.add("onMatch", i), s.queries = r;
    for (u in r)
      u === "all" ? f = 1 : (c = kt.matchMedia(r[u]), c && (yr.indexOf(s) < 0 && yr.push(s), (a[u] = c.matches) && (f = 1), c.addListener ? c.addListener(lo) : c.addEventListener("change", lo)));
    return f && i(s, function(d) {
      return s.add(null, d);
    }), this;
  }, e.revert = function(r) {
    this.kill(r || {});
  }, e.kill = function(r) {
    this.contexts.forEach(function(i) {
      return i.kill(r, !0);
    });
  }, n;
}(), sn = {
  registerPlugin: function() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    t.forEach(function(i) {
      return Ba(i);
    });
  },
  timeline: function(e) {
    return new Fe(e);
  },
  getTweensOf: function(e, t) {
    return ge.getTweensOf(e, t);
  },
  getProperty: function(e, t, r, i) {
    Ae(e) && (e = ft(e)[0]);
    var o = mr(e || {}).get, s = r ? Ca : Ma;
    return r === "native" && (r = ""), e && (t ? s((qe[t] && qe[t].get || o)(e, t, r, i)) : function(a, c, u) {
      return s((qe[a] && qe[a].get || o)(e, a, c, u));
    });
  },
  quickSetter: function(e, t, r) {
    if (e = ft(e), e.length > 1) {
      var i = e.map(function(f) {
        return We.quickSetter(f, t, r);
      }), o = i.length;
      return function(f) {
        for (var d = o; d--; )
          i[d](f);
      };
    }
    e = e[0] || {};
    var s = qe[t], a = mr(e), c = a.harness && (a.harness.aliases || {})[t] || t, u = s ? function(f) {
      var d = new s();
      Rr._pt = 0, d.init(e, r ? f + r : f, Rr, 0, [e]), d.render(1, d), Rr._pt && Fo(1, Rr);
    } : a.set(e, c);
    return s ? u : function(f) {
      return u(e, c, r ? f + r : f, a, 1);
    };
  },
  quickTo: function(e, t, r) {
    var i, o = We.to(e, tt((i = {}, i[t] = "+=0.1", i.paused = !0, i.stagger = 0, i), r || {})), s = function(c, u, f) {
      return o.resetTo(t, c, u, f);
    };
    return s.tween = o, s;
  },
  isTweening: function(e) {
    return ge.getTweensOf(e, !0).length > 0;
  },
  defaults: function(e) {
    return e && e.ease && (e.ease = br(e.ease, Fr.ease)), bs(Fr, e || {});
  },
  config: function(e) {
    return bs(Je, e || {});
  },
  registerEffect: function(e) {
    var t = e.name, r = e.effect, i = e.plugins, o = e.defaults, s = e.extendTimeline;
    (i || "").split(",").forEach(function(a) {
      return a && !qe[a] && !et[a] && Si(t + " effect requires " + a + " plugin.");
    }), Cn[t] = function(a, c, u) {
      return r(ft(a), tt(c || {}, o), u);
    }, s && (Fe.prototype[t] = function(a, c, u) {
      return this.add(Cn[t](a, Et(c) ? c : (u = c) && {}, this), u);
    });
  },
  registerEase: function(e, t) {
    ie[e] = br(t);
  },
  parseEase: function(e, t) {
    return arguments.length ? br(e, t) : ie;
  },
  getById: function(e) {
    return ge.getById(e);
  },
  exportRoot: function(e, t) {
    e === void 0 && (e = {});
    var r = new Fe(e), i, o;
    for (r.smoothChildTiming = Ge(e.smoothChildTiming), ge.remove(r), r._dp = 0, r._time = r._tTime = ge._time, i = ge._first; i; )
      o = i._next, (t || !(!i._dur && i instanceof Me && i.vars.onComplete === i._targets[0])) && Tt(r, i, i._start - i._delay), i = o;
    return Tt(ge, r, 0), r;
  },
  context: function(e, t) {
    return e ? new rl(e, t) : pe;
  },
  matchMedia: function(e) {
    return new Lu(e);
  },
  matchMediaRefresh: function() {
    return yr.forEach(function(e) {
      var t = e.conditions, r, i;
      for (i in t)
        t[i] && (t[i] = !1, r = 1);
      r && e.revert();
    }) || lo();
  },
  addEventListener: function(e, t) {
    var r = Qi[e] || (Qi[e] = []);
    ~r.indexOf(t) || r.push(t);
  },
  removeEventListener: function(e, t) {
    var r = Qi[e], i = r && r.indexOf(t);
    i >= 0 && r.splice(i, 1);
  },
  utils: {
    wrap: pu,
    wrapYoyo: gu,
    distribute: Na,
    random: Ia,
    snap: La,
    normalize: hu,
    getUnit: $e,
    clamp: cu,
    splitColor: Ga,
    toArray: ft,
    selector: oo,
    mapRange: Va,
    pipe: fu,
    unitize: du,
    interpolate: mu,
    shuffle: za
  },
  install: wa,
  effects: Cn,
  ticker: Qe,
  updateRoot: Fe.updateRoot,
  plugins: qe,
  globalTimeline: ge,
  core: {
    PropTween: Ye,
    globals: ka,
    Tween: Me,
    Timeline: Fe,
    Animation: Oi,
    getCache: mr,
    _removeLinkedListItem: hn,
    reverting: function() {
      return Le;
    },
    context: function(e) {
      return e && pe && (pe.data.push(e), e._ctx = pe), pe;
    },
    suppressOverwrites: function(e) {
      return Mo = e;
    }
  }
};
Xe("to,from,fromTo,delayedCall,set,killTweensOf", function(n) {
  return sn[n] = Me[n];
});
Qe.add(Fe.updateRoot);
Rr = sn.to({}, {
  duration: 0
});
var Iu = function(e, t) {
  for (var r = e._pt; r && r.p !== t && r.op !== t && r.fp !== t; )
    r = r._next;
  return r;
}, $u = function(e, t) {
  var r = e._targets, i, o, s;
  for (i in t)
    for (o = r.length; o--; )
      s = e._ptLookup[o][i], s && (s = s.d) && (s._pt && (s = Iu(s, i)), s && s.modifier && s.modifier(t[i], e, r[o], i));
}, Rn = function(e, t) {
  return {
    name: e,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(i, o, s) {
      s._onInit = function(a) {
        var c, u;
        if (Ae(o) && (c = {}, Xe(o, function(f) {
          return c[f] = 1;
        }), o = c), t) {
          c = {};
          for (u in o)
            c[u] = t(o[u]);
          o = c;
        }
        $u(a, o);
      };
    }
  };
}, We = sn.registerPlugin({
  name: "attr",
  init: function(e, t, r, i, o) {
    var s, a, c;
    this.tween = r;
    for (s in t)
      c = e.getAttribute(s) || "", a = this.add(e, "setAttribute", (c || 0) + "", t[s], i, o, 0, 0, s), a.op = s, a.b = c, this._props.push(s);
  },
  render: function(e, t) {
    for (var r = t._pt; r; )
      Le ? r.set(r.t, r.p, r.b, r) : r.r(e, r.d), r = r._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(e, t) {
    for (var r = t.length; r--; )
      this.add(e, r, e[r] || 0, t[r], 0, 0, 0, 0, 0, 1);
  }
}, Rn("roundProps", so), Rn("modifiers"), Rn("snap", La)) || sn;
Me.version = Fe.version = We.version = "3.13.0";
xa = 1;
Eo() && Yr();
ie.Power0;
ie.Power1;
ie.Power2;
ie.Power3;
ie.Power4;
ie.Linear;
ie.Quad;
ie.Cubic;
ie.Quart;
ie.Quint;
ie.Strong;
ie.Elastic;
ie.Back;
ie.SteppedEase;
ie.Bounce;
ie.Sine;
ie.Expo;
ie.Circ;
/*!
 * CSSPlugin 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Ts, qt, Nr, Bo, gr, Ps, Go, Vu = function() {
  return typeof window < "u";
}, Ft = {}, dr = 180 / Math.PI, Lr = Math.PI / 180, Cr = Math.atan2, Ss = 1e8, Xo = /([A-Z])/g, Fu = /(left|right|width|margin|padding|x)/i, Bu = /[\s,\(]\S/, Ct = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, co = function(e, t) {
  return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, Gu = function(e, t) {
  return t.set(t.t, t.p, e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, Xu = function(e, t) {
  return t.set(t.t, t.p, e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t);
}, Yu = function(e, t) {
  var r = t.s + t.c * e;
  t.set(t.t, t.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + t.u, t);
}, il = function(e, t) {
  return t.set(t.t, t.p, e ? t.e : t.b, t);
}, nl = function(e, t) {
  return t.set(t.t, t.p, e !== 1 ? t.b : t.e, t);
}, ju = function(e, t, r) {
  return e.style[t] = r;
}, Wu = function(e, t, r) {
  return e.style.setProperty(t, r);
}, Uu = function(e, t, r) {
  return e._gsap[t] = r;
}, Hu = function(e, t, r) {
  return e._gsap.scaleX = e._gsap.scaleY = r;
}, qu = function(e, t, r, i, o) {
  var s = e._gsap;
  s.scaleX = s.scaleY = r, s.renderTransform(o, s);
}, Qu = function(e, t, r, i, o) {
  var s = e._gsap;
  s[t] = r, s.renderTransform(o, s);
}, me = "transform", je = me + "Origin", Ku = function n(e, t) {
  var r = this, i = this.target, o = i.style, s = i._gsap;
  if (e in Ft && o) {
    if (this.tfm = this.tfm || {}, e !== "transform")
      e = Ct[e] || e, ~e.indexOf(",") ? e.split(",").forEach(function(a) {
        return r.tfm[a] = Nt(i, a);
      }) : this.tfm[e] = s.x ? s[e] : Nt(i, e), e === je && (this.tfm.zOrigin = s.zOrigin);
    else
      return Ct.transform.split(",").forEach(function(a) {
        return n.call(r, a, t);
      });
    if (this.props.indexOf(me) >= 0)
      return;
    s.svg && (this.svgo = i.getAttribute("data-svg-origin"), this.props.push(je, t, "")), e = me;
  }
  (o || t) && this.props.push(e, t, o[e]);
}, ol = function(e) {
  e.translate && (e.removeProperty("translate"), e.removeProperty("scale"), e.removeProperty("rotate"));
}, Zu = function() {
  var e = this.props, t = this.target, r = t.style, i = t._gsap, o, s;
  for (o = 0; o < e.length; o += 3)
    e[o + 1] ? e[o + 1] === 2 ? t[e[o]](e[o + 2]) : t[e[o]] = e[o + 2] : e[o + 2] ? r[e[o]] = e[o + 2] : r.removeProperty(e[o].substr(0, 2) === "--" ? e[o] : e[o].replace(Xo, "-$1").toLowerCase());
  if (this.tfm) {
    for (s in this.tfm)
      i[s] = this.tfm[s];
    i.svg && (i.renderTransform(), t.setAttribute("data-svg-origin", this.svgo || "")), o = Go(), (!o || !o.isStart) && !r[me] && (ol(r), i.zOrigin && r[je] && (r[je] += " " + i.zOrigin + "px", i.zOrigin = 0, i.renderTransform()), i.uncache = 1);
  }
}, sl = function(e, t) {
  var r = {
    target: e,
    props: [],
    revert: Zu,
    save: Ku
  };
  return e._gsap || We.core.getCache(e), t && e.style && e.nodeType && t.split(",").forEach(function(i) {
    return r.save(i);
  }), r;
}, al, uo = function(e, t) {
  var r = qt.createElementNS ? qt.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : qt.createElement(e);
  return r && r.style ? r : qt.createElement(e);
}, dt = function n(e, t, r) {
  var i = getComputedStyle(e);
  return i[t] || i.getPropertyValue(t.replace(Xo, "-$1").toLowerCase()) || i.getPropertyValue(t) || !r && n(e, jr(t) || t, 1) || "";
}, Ms = "O,Moz,ms,Ms,Webkit".split(","), jr = function(e, t, r) {
  var i = t || gr, o = i.style, s = 5;
  if (e in o && !r)
    return e;
  for (e = e.charAt(0).toUpperCase() + e.substr(1); s-- && !(Ms[s] + e in o); )
    ;
  return s < 0 ? null : (s === 3 ? "ms" : s >= 0 ? Ms[s] : "") + e;
}, fo = function() {
  Vu() && window.document && (Ts = window, qt = Ts.document, Nr = qt.documentElement, gr = uo("div") || {
    style: {}
  }, uo("div"), me = jr(me), je = me + "Origin", gr.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", al = !!jr("perspective"), Go = We.core.reverting, Bo = 1);
}, Cs = function(e) {
  var t = e.ownerSVGElement, r = uo("svg", t && t.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), i = e.cloneNode(!0), o;
  i.style.display = "block", r.appendChild(i), Nr.appendChild(r);
  try {
    o = i.getBBox();
  } catch {
  }
  return r.removeChild(i), Nr.removeChild(r), o;
}, Es = function(e, t) {
  for (var r = t.length; r--; )
    if (e.hasAttribute(t[r]))
      return e.getAttribute(t[r]);
}, ll = function(e) {
  var t, r;
  try {
    t = e.getBBox();
  } catch {
    t = Cs(e), r = 1;
  }
  return t && (t.width || t.height) || r || (t = Cs(e)), t && !t.width && !t.x && !t.y ? {
    x: +Es(e, ["x", "cx", "x1"]) || 0,
    y: +Es(e, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : t;
}, cl = function(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && ll(e));
}, kr = function(e, t) {
  if (t) {
    var r = e.style, i;
    t in Ft && t !== je && (t = me), r.removeProperty ? (i = t.substr(0, 2), (i === "ms" || t.substr(0, 6) === "webkit") && (t = "-" + t), r.removeProperty(i === "--" ? t : t.replace(Xo, "-$1").toLowerCase())) : r.removeAttribute(t);
  }
}, Qt = function(e, t, r, i, o, s) {
  var a = new Ye(e._pt, t, r, 0, 1, s ? nl : il);
  return e._pt = a, a.b = i, a.e = o, e._props.push(r), a;
}, Os = {
  deg: 1,
  rad: 1,
  turn: 1
}, Ju = {
  grid: 1,
  flex: 1
}, tr = function n(e, t, r, i) {
  var o = parseFloat(r) || 0, s = (r + "").trim().substr((o + "").length) || "px", a = gr.style, c = Fu.test(t), u = e.tagName.toLowerCase() === "svg", f = (u ? "client" : "offset") + (c ? "Width" : "Height"), d = 100, p = i === "px", l = i === "%", g, h, b, w;
  if (i === s || !o || Os[i] || Os[s])
    return o;
  if (s !== "px" && !p && (o = n(e, t, r, "px")), w = e.getCTM && cl(e), (l || s === "%") && (Ft[t] || ~t.indexOf("adius")))
    return g = w ? e.getBBox()[c ? "width" : "height"] : e[f], Te(l ? o / g * d : o / 100 * g);
  if (a[c ? "width" : "height"] = d + (p ? s : i), h = i !== "rem" && ~t.indexOf("adius") || i === "em" && e.appendChild && !u ? e : e.parentNode, w && (h = (e.ownerSVGElement || {}).parentNode), (!h || h === qt || !h.appendChild) && (h = qt.body), b = h._gsap, b && l && b.width && c && b.time === Qe.time && !b.uncache)
    return Te(o / b.width * d);
  if (l && (t === "height" || t === "width")) {
    var T = e.style[t];
    e.style[t] = d + i, g = e[f], T ? e.style[t] = T : kr(e, t);
  } else
    (l || s === "%") && !Ju[dt(h, "display")] && (a.position = dt(e, "position")), h === e && (a.position = "static"), h.appendChild(gr), g = gr[f], h.removeChild(gr), a.position = "absolute";
  return c && l && (b = mr(h), b.time = Qe.time, b.width = h[f]), Te(p ? g * o / d : g && o ? d / g * o : 0);
}, Nt = function(e, t, r, i) {
  var o;
  return Bo || fo(), t in Ct && t !== "transform" && (t = Ct[t], ~t.indexOf(",") && (t = t.split(",")[0])), Ft[t] && t !== "transform" ? (o = Ai(e, i), o = t !== "transformOrigin" ? o[t] : o.svg ? o.origin : ln(dt(e, je)) + " " + o.zOrigin + "px") : (o = e.style[t], (!o || o === "auto" || i || ~(o + "").indexOf("calc(")) && (o = an[t] && an[t](e, t, r) || dt(e, t) || Pa(e, t) || (t === "opacity" ? 1 : 0))), r && !~(o + "").trim().indexOf(" ") ? tr(e, t, o, r) + r : o;
}, ef = function(e, t, r, i) {
  if (!r || r === "none") {
    var o = jr(t, e, 1), s = o && dt(e, o, 1);
    s && s !== r ? (t = o, r = s) : t === "borderColor" && (r = dt(e, "borderTopColor"));
  }
  var a = new Ye(this._pt, e.style, t, 0, 1, el), c = 0, u = 0, f, d, p, l, g, h, b, w, T, O, k, _;
  if (a.b = r, a.e = i, r += "", i += "", i.substring(0, 6) === "var(--" && (i = dt(e, i.substring(4, i.indexOf(")")))), i === "auto" && (h = e.style[t], e.style[t] = i, i = dt(e, t) || i, h ? e.style[t] = h : kr(e, t)), f = [r, i], Ya(f), r = f[0], i = f[1], p = r.match(Ar) || [], _ = i.match(Ar) || [], _.length) {
    for (; d = Ar.exec(i); )
      b = d[0], T = i.substring(c, d.index), g ? g = (g + 1) % 5 : (T.substr(-5) === "rgba(" || T.substr(-5) === "hsla(") && (g = 1), b !== (h = p[u++] || "") && (l = parseFloat(h) || 0, k = h.substr((l + "").length), b.charAt(1) === "=" && (b = zr(l, b) + k), w = parseFloat(b), O = b.substr((w + "").length), c = Ar.lastIndex - O.length, O || (O = O || Je.units[t] || k, c === i.length && (i += O, a.e += O)), k !== O && (l = tr(e, t, h, O) || 0), a._pt = {
        _next: a._pt,
        p: T || u === 1 ? T : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: l,
        c: w - l,
        m: g && g < 4 || t === "zIndex" ? Math.round : 0
      });
    a.c = c < i.length ? i.substring(c, i.length) : "";
  } else
    a.r = t === "display" && i === "none" ? nl : il;
  return ya.test(i) && (a.e = 0), this._pt = a, a;
}, Ds = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, tf = function(e) {
  var t = e.split(" "), r = t[0], i = t[1] || "50%";
  return (r === "top" || r === "bottom" || i === "left" || i === "right") && (e = r, r = i, i = e), t[0] = Ds[r] || r, t[1] = Ds[i] || i, t.join(" ");
}, rf = function(e, t) {
  if (t.tween && t.tween._time === t.tween._dur) {
    var r = t.t, i = r.style, o = t.u, s = r._gsap, a, c, u;
    if (o === "all" || o === !0)
      i.cssText = "", c = 1;
    else
      for (o = o.split(","), u = o.length; --u > -1; )
        a = o[u], Ft[a] && (c = 1, a = a === "transformOrigin" ? je : me), kr(r, a);
    c && (kr(r, me), s && (s.svg && r.removeAttribute("transform"), i.scale = i.rotate = i.translate = "none", Ai(r, 1), s.uncache = 1, ol(i)));
  }
}, an = {
  clearProps: function(e, t, r, i, o) {
    if (o.data !== "isFromStart") {
      var s = e._pt = new Ye(e._pt, t, r, 0, 0, rf);
      return s.u = i, s.pr = -10, s.tween = o, e._props.push(r), 1;
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
}, Di = [1, 0, 0, 1, 0, 0], ul = {}, fl = function(e) {
  return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
}, As = function(e) {
  var t = dt(e, me);
  return fl(t) ? Di : t.substr(7).match(ba).map(Te);
}, Yo = function(e, t) {
  var r = e._gsap || mr(e), i = e.style, o = As(e), s, a, c, u;
  return r.svg && e.getAttribute("transform") ? (c = e.transform.baseVal.consolidate().matrix, o = [c.a, c.b, c.c, c.d, c.e, c.f], o.join(",") === "1,0,0,1,0,0" ? Di : o) : (o === Di && !e.offsetParent && e !== Nr && !r.svg && (c = i.display, i.display = "block", s = e.parentNode, (!s || !e.offsetParent && !e.getBoundingClientRect().width) && (u = 1, a = e.nextElementSibling, Nr.appendChild(e)), o = As(e), c ? i.display = c : kr(e, "display"), u && (a ? s.insertBefore(e, a) : s ? s.appendChild(e) : Nr.removeChild(e))), t && o.length > 6 ? [o[0], o[1], o[4], o[5], o[12], o[13]] : o);
}, ho = function(e, t, r, i, o, s) {
  var a = e._gsap, c = o || Yo(e, !0), u = a.xOrigin || 0, f = a.yOrigin || 0, d = a.xOffset || 0, p = a.yOffset || 0, l = c[0], g = c[1], h = c[2], b = c[3], w = c[4], T = c[5], O = t.split(" "), k = parseFloat(O[0]) || 0, _ = parseFloat(O[1]) || 0, y, v, x, P;
  r ? c !== Di && (v = l * b - g * h) && (x = k * (b / v) + _ * (-h / v) + (h * T - b * w) / v, P = k * (-g / v) + _ * (l / v) - (l * T - g * w) / v, k = x, _ = P) : (y = ll(e), k = y.x + (~O[0].indexOf("%") ? k / 100 * y.width : k), _ = y.y + (~(O[1] || O[0]).indexOf("%") ? _ / 100 * y.height : _)), i || i !== !1 && a.smooth ? (w = k - u, T = _ - f, a.xOffset = d + (w * l + T * h) - w, a.yOffset = p + (w * g + T * b) - T) : a.xOffset = a.yOffset = 0, a.xOrigin = k, a.yOrigin = _, a.smooth = !!i, a.origin = t, a.originIsAbsolute = !!r, e.style[je] = "0px 0px", s && (Qt(s, a, "xOrigin", u, k), Qt(s, a, "yOrigin", f, _), Qt(s, a, "xOffset", d, a.xOffset), Qt(s, a, "yOffset", p, a.yOffset)), e.setAttribute("data-svg-origin", k + " " + _);
}, Ai = function(e, t) {
  var r = e._gsap || new Ha(e);
  if ("x" in r && !t && !r.uncache)
    return r;
  var i = e.style, o = r.scaleX < 0, s = "px", a = "deg", c = getComputedStyle(e), u = dt(e, je) || "0", f, d, p, l, g, h, b, w, T, O, k, _, y, v, x, P, E, M, A, C, L, I, R, $, D, j, oe, K, q, Q, H, he;
  return f = d = p = h = b = w = T = O = k = 0, l = g = 1, r.svg = !!(e.getCTM && cl(e)), c.translate && ((c.translate !== "none" || c.scale !== "none" || c.rotate !== "none") && (i[me] = (c.translate !== "none" ? "translate3d(" + (c.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (c.rotate !== "none" ? "rotate(" + c.rotate + ") " : "") + (c.scale !== "none" ? "scale(" + c.scale.split(" ").join(",") + ") " : "") + (c[me] !== "none" ? c[me] : "")), i.scale = i.rotate = i.translate = "none"), v = Yo(e, r.svg), r.svg && (r.uncache ? (D = e.getBBox(), u = r.xOrigin - D.x + "px " + (r.yOrigin - D.y) + "px", $ = "") : $ = !t && e.getAttribute("data-svg-origin"), ho(e, $ || u, !!$ || r.originIsAbsolute, r.smooth !== !1, v)), _ = r.xOrigin || 0, y = r.yOrigin || 0, v !== Di && (M = v[0], A = v[1], C = v[2], L = v[3], f = I = v[4], d = R = v[5], v.length === 6 ? (l = Math.sqrt(M * M + A * A), g = Math.sqrt(L * L + C * C), h = M || A ? Cr(A, M) * dr : 0, T = C || L ? Cr(C, L) * dr + h : 0, T && (g *= Math.abs(Math.cos(T * Lr))), r.svg && (f -= _ - (_ * M + y * C), d -= y - (_ * A + y * L))) : (he = v[6], Q = v[7], oe = v[8], K = v[9], q = v[10], H = v[11], f = v[12], d = v[13], p = v[14], x = Cr(he, q), b = x * dr, x && (P = Math.cos(-x), E = Math.sin(-x), $ = I * P + oe * E, D = R * P + K * E, j = he * P + q * E, oe = I * -E + oe * P, K = R * -E + K * P, q = he * -E + q * P, H = Q * -E + H * P, I = $, R = D, he = j), x = Cr(-C, q), w = x * dr, x && (P = Math.cos(-x), E = Math.sin(-x), $ = M * P - oe * E, D = A * P - K * E, j = C * P - q * E, H = L * E + H * P, M = $, A = D, C = j), x = Cr(A, M), h = x * dr, x && (P = Math.cos(x), E = Math.sin(x), $ = M * P + A * E, D = I * P + R * E, A = A * P - M * E, R = R * P - I * E, M = $, I = D), b && Math.abs(b) + Math.abs(h) > 359.9 && (b = h = 0, w = 180 - w), l = Te(Math.sqrt(M * M + A * A + C * C)), g = Te(Math.sqrt(R * R + he * he)), x = Cr(I, R), T = Math.abs(x) > 2e-4 ? x * dr : 0, k = H ? 1 / (H < 0 ? -H : H) : 0), r.svg && ($ = e.getAttribute("transform"), r.forceCSS = e.setAttribute("transform", "") || !fl(dt(e, me)), $ && e.setAttribute("transform", $))), Math.abs(T) > 90 && Math.abs(T) < 270 && (o ? (l *= -1, T += h <= 0 ? 180 : -180, h += h <= 0 ? 180 : -180) : (g *= -1, T += T <= 0 ? 180 : -180)), t = t || r.uncache, r.x = f - ((r.xPercent = f && (!t && r.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-f) ? -50 : 0))) ? e.offsetWidth * r.xPercent / 100 : 0) + s, r.y = d - ((r.yPercent = d && (!t && r.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-d) ? -50 : 0))) ? e.offsetHeight * r.yPercent / 100 : 0) + s, r.z = p + s, r.scaleX = Te(l), r.scaleY = Te(g), r.rotation = Te(h) + a, r.rotationX = Te(b) + a, r.rotationY = Te(w) + a, r.skewX = T + a, r.skewY = O + a, r.transformPerspective = k + s, (r.zOrigin = parseFloat(u.split(" ")[2]) || !t && r.zOrigin || 0) && (i[je] = ln(u)), r.xOffset = r.yOffset = 0, r.force3D = Je.force3D, r.renderTransform = r.svg ? of : al ? dl : nf, r.uncache = 0, r;
}, ln = function(e) {
  return (e = e.split(" "))[0] + " " + e[1];
}, zn = function(e, t, r) {
  var i = $e(t);
  return Te(parseFloat(t) + parseFloat(tr(e, "x", r + "px", i))) + i;
}, nf = function(e, t) {
  t.z = "0px", t.rotationY = t.rotationX = "0deg", t.force3D = 0, dl(e, t);
}, ar = "0deg", ii = "0px", lr = ") ", dl = function(e, t) {
  var r = t || this, i = r.xPercent, o = r.yPercent, s = r.x, a = r.y, c = r.z, u = r.rotation, f = r.rotationY, d = r.rotationX, p = r.skewX, l = r.skewY, g = r.scaleX, h = r.scaleY, b = r.transformPerspective, w = r.force3D, T = r.target, O = r.zOrigin, k = "", _ = w === "auto" && e && e !== 1 || w === !0;
  if (O && (d !== ar || f !== ar)) {
    var y = parseFloat(f) * Lr, v = Math.sin(y), x = Math.cos(y), P;
    y = parseFloat(d) * Lr, P = Math.cos(y), s = zn(T, s, v * P * -O), a = zn(T, a, -Math.sin(y) * -O), c = zn(T, c, x * P * -O + O);
  }
  b !== ii && (k += "perspective(" + b + lr), (i || o) && (k += "translate(" + i + "%, " + o + "%) "), (_ || s !== ii || a !== ii || c !== ii) && (k += c !== ii || _ ? "translate3d(" + s + ", " + a + ", " + c + ") " : "translate(" + s + ", " + a + lr), u !== ar && (k += "rotate(" + u + lr), f !== ar && (k += "rotateY(" + f + lr), d !== ar && (k += "rotateX(" + d + lr), (p !== ar || l !== ar) && (k += "skew(" + p + ", " + l + lr), (g !== 1 || h !== 1) && (k += "scale(" + g + ", " + h + lr), T.style[me] = k || "translate(0, 0)";
}, of = function(e, t) {
  var r = t || this, i = r.xPercent, o = r.yPercent, s = r.x, a = r.y, c = r.rotation, u = r.skewX, f = r.skewY, d = r.scaleX, p = r.scaleY, l = r.target, g = r.xOrigin, h = r.yOrigin, b = r.xOffset, w = r.yOffset, T = r.forceCSS, O = parseFloat(s), k = parseFloat(a), _, y, v, x, P;
  c = parseFloat(c), u = parseFloat(u), f = parseFloat(f), f && (f = parseFloat(f), u += f, c += f), c || u ? (c *= Lr, u *= Lr, _ = Math.cos(c) * d, y = Math.sin(c) * d, v = Math.sin(c - u) * -p, x = Math.cos(c - u) * p, u && (f *= Lr, P = Math.tan(u - f), P = Math.sqrt(1 + P * P), v *= P, x *= P, f && (P = Math.tan(f), P = Math.sqrt(1 + P * P), _ *= P, y *= P)), _ = Te(_), y = Te(y), v = Te(v), x = Te(x)) : (_ = d, x = p, y = v = 0), (O && !~(s + "").indexOf("px") || k && !~(a + "").indexOf("px")) && (O = tr(l, "x", s, "px"), k = tr(l, "y", a, "px")), (g || h || b || w) && (O = Te(O + g - (g * _ + h * v) + b), k = Te(k + h - (g * y + h * x) + w)), (i || o) && (P = l.getBBox(), O = Te(O + i / 100 * P.width), k = Te(k + o / 100 * P.height)), P = "matrix(" + _ + "," + y + "," + v + "," + x + "," + O + "," + k + ")", l.setAttribute("transform", P), T && (l.style[me] = P);
}, sf = function(e, t, r, i, o) {
  var s = 360, a = Ae(o), c = parseFloat(o) * (a && ~o.indexOf("rad") ? dr : 1), u = c - i, f = i + u + "deg", d, p;
  return a && (d = o.split("_")[1], d === "short" && (u %= s, u !== u % (s / 2) && (u += u < 0 ? s : -s)), d === "cw" && u < 0 ? u = (u + s * Ss) % s - ~~(u / s) * s : d === "ccw" && u > 0 && (u = (u - s * Ss) % s - ~~(u / s) * s)), e._pt = p = new Ye(e._pt, t, r, i, u, Gu), p.e = f, p.u = "deg", e._props.push(r), p;
}, Rs = function(e, t) {
  for (var r in t)
    e[r] = t[r];
  return e;
}, af = function(e, t, r) {
  var i = Rs({}, r._gsap), o = "perspective,force3D,transformOrigin,svgOrigin", s = r.style, a, c, u, f, d, p, l, g;
  i.svg ? (u = r.getAttribute("transform"), r.setAttribute("transform", ""), s[me] = t, a = Ai(r, 1), kr(r, me), r.setAttribute("transform", u)) : (u = getComputedStyle(r)[me], s[me] = t, a = Ai(r, 1), s[me] = u);
  for (c in Ft)
    u = i[c], f = a[c], u !== f && o.indexOf(c) < 0 && (l = $e(u), g = $e(f), d = l !== g ? tr(r, c, u, g) : parseFloat(u), p = parseFloat(f), e._pt = new Ye(e._pt, a, c, d, p - d, co), e._pt.u = g || 0, e._props.push(c));
  Rs(a, i);
};
Xe("padding,margin,Width,Radius", function(n, e) {
  var t = "Top", r = "Right", i = "Bottom", o = "Left", s = (e < 3 ? [t, r, i, o] : [t + o, t + r, i + r, i + o]).map(function(a) {
    return e < 2 ? n + a : "border" + a + n;
  });
  an[e > 1 ? "border" + n : n] = function(a, c, u, f, d) {
    var p, l;
    if (arguments.length < 4)
      return p = s.map(function(g) {
        return Nt(a, g, u);
      }), l = p.join(" "), l.split(p[0]).length === 5 ? p[0] : l;
    p = (f + "").split(" "), l = {}, s.forEach(function(g, h) {
      return l[g] = p[h] = p[h] || p[(h - 1) / 2 | 0];
    }), a.init(c, l, d);
  };
});
var hl = {
  name: "css",
  register: fo,
  targetTest: function(e) {
    return e.style && e.nodeType;
  },
  init: function(e, t, r, i, o) {
    var s = this._props, a = e.style, c = r.vars.startAt, u, f, d, p, l, g, h, b, w, T, O, k, _, y, v, x;
    Bo || fo(), this.styles = this.styles || sl(e), x = this.styles.props, this.tween = r;
    for (h in t)
      if (h !== "autoRound" && (f = t[h], !(qe[h] && qa(h, t, r, i, e, o)))) {
        if (l = typeof f, g = an[h], l === "function" && (f = f.call(r, i, e, o), l = typeof f), l === "string" && ~f.indexOf("random(") && (f = Ci(f)), g)
          g(this, e, h, f, r) && (v = 1);
        else if (h.substr(0, 2) === "--")
          u = (getComputedStyle(e).getPropertyValue(h) + "").trim(), f += "", Jt.lastIndex = 0, Jt.test(u) || (b = $e(u), w = $e(f)), w ? b !== w && (u = tr(e, h, u, w) + w) : b && (f += b), this.add(a, "setProperty", u, f, i, o, 0, 0, h), s.push(h), x.push(h, 0, a[h]);
        else if (l !== "undefined") {
          if (c && h in c ? (u = typeof c[h] == "function" ? c[h].call(r, i, e, o) : c[h], Ae(u) && ~u.indexOf("random(") && (u = Ci(u)), $e(u + "") || u === "auto" || (u += Je.units[h] || $e(Nt(e, h)) || ""), (u + "").charAt(1) === "=" && (u = Nt(e, h))) : u = Nt(e, h), p = parseFloat(u), T = l === "string" && f.charAt(1) === "=" && f.substr(0, 2), T && (f = f.substr(2)), d = parseFloat(f), h in Ct && (h === "autoAlpha" && (p === 1 && Nt(e, "visibility") === "hidden" && d && (p = 0), x.push("visibility", 0, a.visibility), Qt(this, a, "visibility", p ? "inherit" : "hidden", d ? "inherit" : "hidden", !d)), h !== "scale" && h !== "transform" && (h = Ct[h], ~h.indexOf(",") && (h = h.split(",")[0]))), O = h in Ft, O) {
            if (this.styles.save(h), l === "string" && f.substring(0, 6) === "var(--" && (f = dt(e, f.substring(4, f.indexOf(")"))), d = parseFloat(f)), k || (_ = e._gsap, _.renderTransform && !t.parseTransform || Ai(e, t.parseTransform), y = t.smoothOrigin !== !1 && _.smooth, k = this._pt = new Ye(this._pt, a, me, 0, 1, _.renderTransform, _, 0, -1), k.dep = 1), h === "scale")
              this._pt = new Ye(this._pt, _, "scaleY", _.scaleY, (T ? zr(_.scaleY, T + d) : d) - _.scaleY || 0, co), this._pt.u = 0, s.push("scaleY", h), h += "X";
            else if (h === "transformOrigin") {
              x.push(je, 0, a[je]), f = tf(f), _.svg ? ho(e, f, 0, y, 0, this) : (w = parseFloat(f.split(" ")[2]) || 0, w !== _.zOrigin && Qt(this, _, "zOrigin", _.zOrigin, w), Qt(this, a, h, ln(u), ln(f)));
              continue;
            } else if (h === "svgOrigin") {
              ho(e, f, 1, y, 0, this);
              continue;
            } else if (h in ul) {
              sf(this, _, h, p, T ? zr(p, T + f) : f);
              continue;
            } else if (h === "smoothOrigin") {
              Qt(this, _, "smooth", _.smooth, f);
              continue;
            } else if (h === "force3D") {
              _[h] = f;
              continue;
            } else if (h === "transform") {
              af(this, f, e);
              continue;
            }
          } else h in a || (h = jr(h) || h);
          if (O || (d || d === 0) && (p || p === 0) && !Bu.test(f) && h in a)
            b = (u + "").substr((p + "").length), d || (d = 0), w = $e(f) || (h in Je.units ? Je.units[h] : b), b !== w && (p = tr(e, h, u, w)), this._pt = new Ye(this._pt, O ? _ : a, h, p, (T ? zr(p, T + d) : d) - p, !O && (w === "px" || h === "zIndex") && t.autoRound !== !1 ? Yu : co), this._pt.u = w || 0, b !== w && w !== "%" && (this._pt.b = u, this._pt.r = Xu);
          else if (h in a)
            ef.call(this, e, h, u, T ? T + f : f);
          else if (h in e)
            this.add(e, h, u || e[h], T ? T + f : f, i, o);
          else if (h !== "parseTransform") {
            Do(h, f);
            continue;
          }
          O || (h in a ? x.push(h, 0, a[h]) : typeof e[h] == "function" ? x.push(h, 2, e[h]()) : x.push(h, 1, u || e[h])), s.push(h);
        }
      }
    v && tl(this);
  },
  render: function(e, t) {
    if (t.tween._time || !Go())
      for (var r = t._pt; r; )
        r.r(e, r.d), r = r._next;
    else
      t.styles.revert();
  },
  get: Nt,
  aliases: Ct,
  getSetter: function(e, t, r) {
    var i = Ct[t];
    return i && i.indexOf(",") < 0 && (t = i), t in Ft && t !== je && (e._gsap.x || Nt(e, "x")) ? r && Ps === r ? t === "scale" ? Hu : Uu : (Ps = r || {}) && (t === "scale" ? qu : Qu) : e.style && !Co(e.style[t]) ? ju : ~t.indexOf("-") ? Wu : Vo(e, t);
  },
  core: {
    _removeProperty: kr,
    _getMatrix: Yo
  }
};
We.utils.checkPrefix = jr;
We.core.getStyleSaver = sl;
(function(n, e, t, r) {
  var i = Xe(n + "," + e + "," + t, function(o) {
    Ft[o] = 1;
  });
  Xe(e, function(o) {
    Je.units[o] = "deg", ul[o] = 1;
  }), Ct[i[13]] = n + "," + e, Xe(r, function(o) {
    var s = o.split(":");
    Ct[s[1]] = i[s[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
Xe("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(n) {
  Je.units[n] = "px";
});
We.registerPlugin(hl);
var Pt = We.registerPlugin(hl) || We;
Pt.core.Tween;
/*!
 * matrix 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var It, vr, jo, mn, di, Ki, cn, vi, yt = "transform", po = yt + "Origin", pl, gl = function(e) {
  var t = e.ownerDocument || e;
  for (!(yt in e.style) && ("msTransform" in e.style) && (yt = "msTransform", po = yt + "Origin"); t.parentNode && (t = t.parentNode); )
    ;
  if (vr = window, cn = new Tr(), t) {
    It = t, jo = t.documentElement, mn = t.body, vi = It.createElementNS("http://www.w3.org/2000/svg", "g"), vi.style.transform = "none";
    var r = t.createElement("div"), i = t.createElement("div"), o = t && (t.body || t.firstElementChild);
    o && o.appendChild && (o.appendChild(r), r.appendChild(i), r.setAttribute("style", "position:static;transform:translate3d(0,0,1px)"), pl = i.offsetParent !== r, o.removeChild(r));
  }
  return t;
}, lf = function(e) {
  for (var t, r; e && e !== mn; )
    r = e._gsap, r && r.uncache && r.get(e, "x"), r && !r.scaleX && !r.scaleY && r.renderTransform && (r.scaleX = r.scaleY = 1e-4, r.renderTransform(1, r), t ? t.push(r) : t = [r]), e = e.parentNode;
  return t;
}, ml = [], _l = [], cf = function() {
  return vr.pageYOffset || It.scrollTop || jo.scrollTop || mn.scrollTop || 0;
}, uf = function() {
  return vr.pageXOffset || It.scrollLeft || jo.scrollLeft || mn.scrollLeft || 0;
}, Wo = function(e) {
  return e.ownerSVGElement || ((e.tagName + "").toLowerCase() === "svg" ? e : null);
}, ff = function n(e) {
  if (vr.getComputedStyle(e).position === "fixed")
    return !0;
  if (e = e.parentNode, e && e.nodeType === 1)
    return n(e);
}, Nn = function n(e, t) {
  if (e.parentNode && (It || gl(e))) {
    var r = Wo(e), i = r ? r.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml", o = r ? t ? "rect" : "g" : "div", s = t !== 2 ? 0 : 100, a = t === 3 ? 100 : 0, c = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;", u = It.createElementNS ? It.createElementNS(i.replace(/^https/, "http"), o) : It.createElement(o);
    return t && (r ? (Ki || (Ki = n(e)), u.setAttribute("width", 0.01), u.setAttribute("height", 0.01), u.setAttribute("transform", "translate(" + s + "," + a + ")"), Ki.appendChild(u)) : (di || (di = n(e), di.style.cssText = c), u.style.cssText = c + "width:0.1px;height:0.1px;top:" + a + "px;left:" + s + "px", di.appendChild(u))), u;
  }
  throw "Need document and parent.";
}, df = function(e) {
  for (var t = new Tr(), r = 0; r < e.numberOfItems; r++)
    t.multiply(e.getItem(r).matrix);
  return t;
}, hf = function(e) {
  var t = e.getCTM(), r;
  return t || (r = e.style[yt], e.style[yt] = "none", e.appendChild(vi), t = vi.getCTM(), e.removeChild(vi), r ? e.style[yt] = r : e.style.removeProperty(yt.replace(/([A-Z])/g, "-$1").toLowerCase())), t || cn.clone();
}, pf = function(e, t) {
  var r = Wo(e), i = e === r, o = r ? ml : _l, s = e.parentNode, a = s && !r && s.shadowRoot && s.shadowRoot.appendChild ? s.shadowRoot : s, c, u, f, d, p, l;
  if (e === vr)
    return e;
  if (o.length || o.push(Nn(e, 1), Nn(e, 2), Nn(e, 3)), c = r ? Ki : di, r)
    i ? (f = hf(e), d = -f.e / f.a, p = -f.f / f.d, u = cn) : e.getBBox ? (f = e.getBBox(), u = e.transform ? e.transform.baseVal : {}, u = u.numberOfItems ? u.numberOfItems > 1 ? df(u) : u.getItem(0).matrix : cn, d = u.a * f.x + u.c * f.y, p = u.b * f.x + u.d * f.y) : (u = new Tr(), d = p = 0), (i ? r : s).appendChild(c), c.setAttribute("transform", "matrix(" + u.a + "," + u.b + "," + u.c + "," + u.d + "," + (u.e + d) + "," + (u.f + p) + ")");
  else {
    if (d = p = 0, pl)
      for (u = e.offsetParent, f = e; f && (f = f.parentNode) && f !== u && f.parentNode; )
        (vr.getComputedStyle(f)[yt] + "").length > 4 && (d = f.offsetLeft, p = f.offsetTop, f = 0);
    if (l = vr.getComputedStyle(e), l.position !== "absolute" && l.position !== "fixed")
      for (u = e.offsetParent; s && s !== u; )
        d += s.scrollLeft || 0, p += s.scrollTop || 0, s = s.parentNode;
    f = c.style, f.top = e.offsetTop - p + "px", f.left = e.offsetLeft - d + "px", f[yt] = l[yt], f[po] = l[po], f.position = l.position === "fixed" ? "fixed" : "absolute", a.appendChild(c);
  }
  return c;
}, Ln = function(e, t, r, i, o, s, a) {
  return e.a = t, e.b = r, e.c = i, e.d = o, e.e = s, e.f = a, e;
}, Tr = /* @__PURE__ */ function() {
  function n(t, r, i, o, s, a) {
    t === void 0 && (t = 1), r === void 0 && (r = 0), i === void 0 && (i = 0), o === void 0 && (o = 1), s === void 0 && (s = 0), a === void 0 && (a = 0), Ln(this, t, r, i, o, s, a);
  }
  var e = n.prototype;
  return e.inverse = function() {
    var r = this.a, i = this.b, o = this.c, s = this.d, a = this.e, c = this.f, u = r * s - i * o || 1e-10;
    return Ln(this, s / u, -i / u, -o / u, r / u, (o * c - s * a) / u, -(r * c - i * a) / u);
  }, e.multiply = function(r) {
    var i = this.a, o = this.b, s = this.c, a = this.d, c = this.e, u = this.f, f = r.a, d = r.c, p = r.b, l = r.d, g = r.e, h = r.f;
    return Ln(this, f * i + p * s, f * o + p * a, d * i + l * s, d * o + l * a, c + g * i + h * s, u + g * o + h * a);
  }, e.clone = function() {
    return new n(this.a, this.b, this.c, this.d, this.e, this.f);
  }, e.equals = function(r) {
    var i = this.a, o = this.b, s = this.c, a = this.d, c = this.e, u = this.f;
    return i === r.a && o === r.b && s === r.c && a === r.d && c === r.e && u === r.f;
  }, e.apply = function(r, i) {
    i === void 0 && (i = {});
    var o = r.x, s = r.y, a = this.a, c = this.b, u = this.c, f = this.d, d = this.e, p = this.f;
    return i.x = o * a + s * u + d || 0, i.y = o * c + s * f + p || 0, i;
  }, n;
}();
function pr(n, e, t, r) {
  if (!n || !n.parentNode || (It || gl(n)).documentElement === n)
    return new Tr();
  var i = lf(n), o = Wo(n), s = o ? ml : _l, a = pf(n), c = s[0].getBoundingClientRect(), u = s[1].getBoundingClientRect(), f = s[2].getBoundingClientRect(), d = a.parentNode, p = ff(n), l = new Tr((u.left - c.left) / 100, (u.top - c.top) / 100, (f.left - c.left) / 100, (f.top - c.top) / 100, c.left + (p ? 0 : uf()), c.top + (p ? 0 : cf()));
  if (d.removeChild(a), i)
    for (c = i.length; c--; )
      u = i[c], u.scaleX = u.scaleY = 0, u.renderTransform(1, u);
  return e ? l.inverse() : l;
}
function zs(n) {
  if (n === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return n;
}
function gf(n, e) {
  n.prototype = Object.create(e.prototype), n.prototype.constructor = n, n.__proto__ = e;
}
var re, fe, Ke, vt, $t, In, Lt, go, hi, Kt, bl, mo, Ri, Uo, pi, mt, gi, Zi, yl, _o, un = 0, vl = function() {
  return typeof window < "u";
}, xl = function() {
  return re || vl() && (re = window.gsap) && re.registerPlugin && re;
}, Ut = function(e) {
  return typeof e == "function";
}, xi = function(e) {
  return typeof e == "object";
}, _t = function(e) {
  return typeof e > "u";
}, Ji = function() {
  return !1;
}, wi = "transform", bo = "transformOrigin", Yt = function(e) {
  return Math.round(e * 1e4) / 1e4;
}, ni = Array.isArray, Yi = function(e, t) {
  var r = Ke.createElementNS ? Ke.createElementNS("http://www.w3.org/1999/xhtml".replace(/^https/, "http"), e) : Ke.createElement(e);
  return r.style ? r : Ke.createElement(e);
}, Ns = 180 / Math.PI, cr = 1e20, mf = new Tr(), jt = Date.now || function() {
  return (/* @__PURE__ */ new Date()).getTime();
}, xr = [], Ir = {}, _f = 0, bf = /^(?:a|input|textarea|button|select)$/i, Ls = 0, Er = {}, At = {}, wl = function(e, t) {
  var r = {}, i;
  for (i in e)
    r[i] = t ? e[i] * t : e[i];
  return r;
}, yf = function(e, t) {
  for (var r in t)
    r in e || (e[r] = t[r]);
  return e;
}, Is = function n(e, t) {
  for (var r = e.length, i; r--; )
    t ? e[r].style.touchAction = t : e[r].style.removeProperty("touch-action"), i = e[r].children, i && i.length && n(i, t);
}, kl = function() {
  return xr.forEach(function(e) {
    return e();
  });
}, vf = function(e) {
  xr.push(e), xr.length === 1 && re.ticker.add(kl);
}, $s = function() {
  return !xr.length && re.ticker.remove(kl);
}, Vs = function(e) {
  for (var t = xr.length; t--; )
    xr[t] === e && xr.splice(t, 1);
  re.to($s, {
    overwrite: !0,
    delay: 15,
    duration: 0,
    onComplete: $s,
    data: "_draggable"
  });
}, xf = function(e, t) {
  for (var r in t)
    r in e || (e[r] = t[r]);
  return e;
}, Oe = function(e, t, r, i) {
  if (e.addEventListener) {
    var o = Ri[t];
    i = i || (bl ? {
      passive: !1
    } : null), e.addEventListener(o || t, r, i), o && t !== o && e.addEventListener(t, r, i);
  }
}, Se = function(e, t, r, i) {
  if (e.removeEventListener) {
    var o = Ri[t];
    e.removeEventListener(o || t, r, i), o && t !== o && e.removeEventListener(t, r, i);
  }
}, st = function(e) {
  e.preventDefault && e.preventDefault(), e.preventManipulation && e.preventManipulation();
}, wf = function(e, t) {
  for (var r = e.length; r--; )
    if (e[r].identifier === t)
      return !0;
}, kf = function n(e) {
  Uo = e.touches && un < e.touches.length, Se(e.target, "touchend", n);
}, Fs = function(e) {
  Uo = e.touches && un < e.touches.length, Oe(e.target, "touchend", kf);
}, $r = function(e) {
  return fe.pageYOffset || e.scrollTop || e.documentElement.scrollTop || e.body.scrollTop || 0;
}, Vr = function(e) {
  return fe.pageXOffset || e.scrollLeft || e.documentElement.scrollLeft || e.body.scrollLeft || 0;
}, Bs = function n(e, t) {
  Oe(e, "scroll", t), Wr(e.parentNode) || n(e.parentNode, t);
}, Gs = function n(e, t) {
  Se(e, "scroll", t), Wr(e.parentNode) || n(e.parentNode, t);
}, Wr = function(e) {
  return !e || e === vt || e.nodeType === 9 || e === Ke.body || e === fe || !e.nodeType || !e.parentNode;
}, Xs = function(e, t) {
  var r = t === "x" ? "Width" : "Height", i = "scroll" + r, o = "client" + r;
  return Math.max(0, Wr(e) ? Math.max(vt[i], $t[i]) - (fe["inner" + r] || vt[o] || $t[o]) : e[i] - e[o]);
}, $n = function n(e, t) {
  var r = Xs(e, "x"), i = Xs(e, "y");
  Wr(e) ? e = At : n(e.parentNode, t), e._gsMaxScrollX = r, e._gsMaxScrollY = i, t || (e._gsScrollX = e.scrollLeft || 0, e._gsScrollY = e.scrollTop || 0);
}, Vn = function(e, t, r) {
  var i = e.style;
  i && (_t(i[t]) && (t = hi(t, e) || t), r == null ? i.removeProperty && i.removeProperty(t.replace(/([A-Z])/g, "-$1").toLowerCase()) : i[t] = r);
}, zi = function(e) {
  return fe.getComputedStyle(e instanceof Element ? e : e.host || (e.parentNode || {}).host || e);
}, ur = {}, Or = function(e) {
  if (e === fe)
    return ur.left = ur.top = 0, ur.width = ur.right = vt.clientWidth || e.innerWidth || $t.clientWidth || 0, ur.height = ur.bottom = (e.innerHeight || 0) - 20 < vt.clientHeight ? vt.clientHeight : e.innerHeight || $t.clientHeight || 0, ur;
  var t = e.ownerDocument || Ke, r = _t(e.pageX) ? !e.nodeType && !_t(e.left) && !_t(e.top) ? e : Kt(e)[0].getBoundingClientRect() : {
    left: e.pageX - Vr(t),
    top: e.pageY - $r(t),
    right: e.pageX - Vr(t) + 1,
    bottom: e.pageY - $r(t) + 1
  };
  return _t(r.right) && !_t(r.width) ? (r.right = r.left + r.width, r.bottom = r.top + r.height) : _t(r.width) && (r = {
    width: r.right - r.left,
    height: r.bottom - r.top,
    right: r.right,
    left: r.left,
    bottom: r.bottom,
    top: r.top
  }), r;
}, xe = function(e, t, r) {
  var i = e.vars, o = i[r], s = e._listeners[t], a;
  return Ut(o) && (a = o.apply(i.callbackScope || e, i[r + "Params"] || [e.pointerEvent])), s && e.dispatchEvent(t) === !1 && (a = !1), a;
}, Ys = function(e, t) {
  var r = Kt(e)[0], i, o, s;
  return !r.nodeType && r !== fe ? _t(e.left) ? (o = e.min || e.minX || e.minRotation || 0, i = e.min || e.minY || 0, {
    left: o,
    top: i,
    width: (e.max || e.maxX || e.maxRotation || 0) - o,
    height: (e.max || e.maxY || 0) - i
  }) : (s = {
    x: 0,
    y: 0
  }, {
    left: e.left - s.x,
    top: e.top - s.y,
    width: e.width,
    height: e.height
  }) : Tf(r, t);
}, at = {}, Tf = function(e, t) {
  t = Kt(t)[0];
  var r = e.getBBox && e.ownerSVGElement, i = e.ownerDocument || Ke, o, s, a, c, u, f, d, p, l, g, h, b, w;
  if (e === fe)
    a = $r(i), o = Vr(i), s = o + (i.documentElement.clientWidth || e.innerWidth || i.body.clientWidth || 0), c = a + ((e.innerHeight || 0) - 20 < i.documentElement.clientHeight ? i.documentElement.clientHeight : e.innerHeight || i.body.clientHeight || 0);
  else {
    if (t === fe || _t(t))
      return e.getBoundingClientRect();
    o = a = 0, r ? (g = e.getBBox(), h = g.width, b = g.height) : (e.viewBox && (g = e.viewBox.baseVal) && (o = g.x || 0, a = g.y || 0, h = g.width, b = g.height), h || (w = zi(e), g = w.boxSizing === "border-box", h = (parseFloat(w.width) || e.clientWidth || 0) + (g ? 0 : parseFloat(w.borderLeftWidth) + parseFloat(w.borderRightWidth)), b = (parseFloat(w.height) || e.clientHeight || 0) + (g ? 0 : parseFloat(w.borderTopWidth) + parseFloat(w.borderBottomWidth)))), s = h, c = b;
  }
  return e === t ? {
    left: o,
    top: a,
    width: s - o,
    height: c - a
  } : (u = pr(t, !0).multiply(pr(e)), f = u.apply({
    x: o,
    y: a
  }), d = u.apply({
    x: s,
    y: a
  }), p = u.apply({
    x: s,
    y: c
  }), l = u.apply({
    x: o,
    y: c
  }), o = Math.min(f.x, d.x, p.x, l.x), a = Math.min(f.y, d.y, p.y, l.y), {
    left: o,
    top: a,
    width: Math.max(f.x, d.x, p.x, l.x) - o,
    height: Math.max(f.y, d.y, p.y, l.y) - a
  });
}, Fn = function(e, t, r, i, o, s) {
  var a = {}, c, u, f;
  if (t)
    if (o !== 1 && t instanceof Array) {
      if (a.end = c = [], f = t.length, xi(t[0]))
        for (u = 0; u < f; u++)
          c[u] = wl(t[u], o);
      else
        for (u = 0; u < f; u++)
          c[u] = t[u] * o;
      r += 1.1, i -= 1.1;
    } else Ut(t) ? a.end = function(d) {
      var p = t.call(e, d), l, g;
      if (o !== 1)
        if (xi(p)) {
          l = {};
          for (g in p)
            l[g] = p[g] * o;
          p = l;
        } else
          p *= o;
      return p;
    } : a.end = t;
  return (r || r === 0) && (a.max = r), (i || i === 0) && (a.min = i), s && (a.velocity = 0), a;
}, Pf = function n(e) {
  var t;
  return !e || !e.getAttribute || e === $t ? !1 : (t = e.getAttribute("data-clickable")) === "true" || t !== "false" && (bf.test(e.nodeName + "") || e.getAttribute("contentEditable") === "true") ? !0 : n(e.parentNode);
}, ji = function(e, t) {
  for (var r = e.length, i; r--; )
    i = e[r], i.ondragstart = i.onselectstart = t ? null : Ji, re.set(i, {
      lazy: !0,
      userSelect: t ? "text" : "none"
    });
}, Sf = function n(e) {
  if (zi(e).position === "fixed")
    return !0;
  if (e = e.parentNode, e && e.nodeType === 1)
    return n(e);
}, Tl, yo, Mf = function(e, t) {
  e = re.utils.toArray(e)[0], t = t || {};
  var r = document.createElement("div"), i = r.style, o = e.firstChild, s = 0, a = 0, c = e.scrollTop, u = e.scrollLeft, f = e.scrollWidth, d = e.scrollHeight, p = 0, l = 0, g = 0, h, b, w, T, O, k;
  Tl && t.force3D !== !1 ? (O = "translate3d(", k = "px,0px)") : wi && (O = "translate(", k = "px)"), this.scrollTop = function(_, y) {
    if (!arguments.length)
      return -this.top();
    this.top(-_, y);
  }, this.scrollLeft = function(_, y) {
    if (!arguments.length)
      return -this.left();
    this.left(-_, y);
  }, this.left = function(_, y) {
    if (!arguments.length)
      return -(e.scrollLeft + a);
    var v = e.scrollLeft - u, x = a;
    if ((v > 2 || v < -2) && !y) {
      u = e.scrollLeft, re.killTweensOf(this, {
        left: 1,
        scrollLeft: 1
      }), this.left(-u), t.onKill && t.onKill();
      return;
    }
    _ = -_, _ < 0 ? (a = _ - 0.5 | 0, _ = 0) : _ > l ? (a = _ - l | 0, _ = l) : a = 0, (a || x) && (this._skip || (i[wi] = O + -a + "px," + -s + k), a + p >= 0 && (i.paddingRight = a + p + "px")), e.scrollLeft = _ | 0, u = e.scrollLeft;
  }, this.top = function(_, y) {
    if (!arguments.length)
      return -(e.scrollTop + s);
    var v = e.scrollTop - c, x = s;
    if ((v > 2 || v < -2) && !y) {
      c = e.scrollTop, re.killTweensOf(this, {
        top: 1,
        scrollTop: 1
      }), this.top(-c), t.onKill && t.onKill();
      return;
    }
    _ = -_, _ < 0 ? (s = _ - 0.5 | 0, _ = 0) : _ > g ? (s = _ - g | 0, _ = g) : s = 0, (s || x) && (this._skip || (i[wi] = O + -a + "px," + -s + k)), e.scrollTop = _ | 0, c = e.scrollTop;
  }, this.maxScrollTop = function() {
    return g;
  }, this.maxScrollLeft = function() {
    return l;
  }, this.disable = function() {
    for (o = r.firstChild; o; )
      T = o.nextSibling, e.appendChild(o), o = T;
    e === r.parentNode && e.removeChild(r);
  }, this.enable = function() {
    if (o = e.firstChild, o !== r) {
      for (; o; )
        T = o.nextSibling, r.appendChild(o), o = T;
      e.appendChild(r), this.calibrate();
    }
  }, this.calibrate = function(_) {
    var y = e.clientWidth === h, v, x, P;
    c = e.scrollTop, u = e.scrollLeft, !(y && e.clientHeight === b && r.offsetHeight === w && f === e.scrollWidth && d === e.scrollHeight && !_) && ((s || a) && (x = this.left(), P = this.top(), this.left(-e.scrollLeft), this.top(-e.scrollTop)), v = zi(e), (!y || _) && (i.display = "block", i.width = "auto", i.paddingRight = "0px", p = Math.max(0, e.scrollWidth - e.clientWidth), p && (p += parseFloat(v.paddingLeft) + (yo ? parseFloat(v.paddingRight) : 0))), i.display = "inline-block", i.position = "relative", i.overflow = "visible", i.verticalAlign = "top", i.boxSizing = "content-box", i.width = "100%", i.paddingRight = p + "px", yo && (i.paddingBottom = v.paddingBottom), h = e.clientWidth, b = e.clientHeight, f = e.scrollWidth, d = e.scrollHeight, l = e.scrollWidth - h, g = e.scrollHeight - b, w = r.offsetHeight, i.display = "block", (x || P) && (this.left(x), this.top(P)));
  }, this.content = r, this.element = e, this._skip = !1, this.enable();
}, Bn = function(e) {
  if (vl() && document.body) {
    var t = window && window.navigator;
    fe = window, Ke = document, vt = Ke.documentElement, $t = Ke.body, In = Yi("div"), Zi = !!window.PointerEvent, Lt = Yi("div"), Lt.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;cursor:grab", gi = Lt.style.cursor === "grab" ? "grab" : "move", pi = t && t.userAgent.toLowerCase().indexOf("android") !== -1, mo = "ontouchstart" in vt && "orientation" in fe || t && (t.MaxTouchPoints > 0 || t.msMaxTouchPoints > 0), yo = function() {
      var r = Yi("div"), i = Yi("div"), o = i.style, s = $t, a;
      return o.display = "inline-block", o.position = "relative", r.style.cssText = "width:90px;height:40px;padding:10px;overflow:auto;visibility:hidden", r.appendChild(i), s.appendChild(r), a = i.offsetHeight + 18 > r.scrollHeight, s.removeChild(r), a;
    }(), Ri = function(r) {
      for (var i = r.split(","), o = ("onpointerdown" in In ? "pointerdown,pointermove,pointerup,pointercancel" : "onmspointerdown" in In ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : r).split(","), s = {}, a = 4; --a > -1; )
        s[i[a]] = o[a], s[o[a]] = i[a];
      try {
        vt.addEventListener("test", null, Object.defineProperty({}, "passive", {
          get: function() {
            bl = 1;
          }
        }));
      } catch {
      }
      return s;
    }("touchstart,touchmove,touchend,touchcancel"), Oe(Ke, "touchcancel", Ji), Oe(fe, "touchmove", Ji), $t && $t.addEventListener("touchstart", Ji), Oe(Ke, "contextmenu", function() {
      for (var r in Ir)
        Ir[r].isPressed && Ir[r].endDrag();
    }), re = go = xl();
  }
  re ? (mt = re.plugins.inertia, yl = re.core.context || function() {
  }, hi = re.utils.checkPrefix, wi = hi(wi), bo = hi(bo), Kt = re.utils.toArray, _o = re.core.getStyleSaver, Tl = !!hi("perspective")) : e && console.warn("Please gsap.registerPlugin(Draggable)");
}, Cf = /* @__PURE__ */ function() {
  function n(t) {
    this._listeners = {}, this.target = t || this;
  }
  var e = n.prototype;
  return e.addEventListener = function(r, i) {
    var o = this._listeners[r] || (this._listeners[r] = []);
    ~o.indexOf(i) || o.push(i);
  }, e.removeEventListener = function(r, i) {
    var o = this._listeners[r], s = o && o.indexOf(i);
    s >= 0 && o.splice(s, 1);
  }, e.dispatchEvent = function(r) {
    var i = this, o;
    return (this._listeners[r] || []).forEach(function(s) {
      return s.call(i, {
        type: r,
        target: i.target
      }) === !1 && (o = !1);
    }), o;
  }, n;
}(), qr = /* @__PURE__ */ function(n) {
  gf(e, n);
  function e(t, r) {
    var i;
    i = n.call(this) || this, go || Bn(1), t = Kt(t)[0], i.styles = _o && _o(t, "transform,left,top"), mt || (mt = re.plugins.inertia), i.vars = r = wl(r || {}), i.target = t, i.x = i.y = i.rotation = 0, i.dragResistance = parseFloat(r.dragResistance) || 0, i.edgeResistance = isNaN(r.edgeResistance) ? 1 : parseFloat(r.edgeResistance) || 0, i.lockAxis = r.lockAxis, i.autoScroll = r.autoScroll || 0, i.lockedAxis = null, i.allowEventDefault = !!r.allowEventDefault, re.getProperty(t, "x");
    var o = (r.type || "x,y").toLowerCase(), s = ~o.indexOf("x") || ~o.indexOf("y"), a = o.indexOf("rotation") !== -1, c = a ? "rotation" : s ? "x" : "left", u = s ? "y" : "top", f = !!(~o.indexOf("x") || ~o.indexOf("left") || o === "scroll"), d = !!(~o.indexOf("y") || ~o.indexOf("top") || o === "scroll"), p = r.minimumMovement || 2, l = zs(i), g = Kt(r.trigger || r.handle || t), h = {}, b = 0, w = !1, T = r.autoScrollMarginTop || 40, O = r.autoScrollMarginRight || 40, k = r.autoScrollMarginBottom || 40, _ = r.autoScrollMarginLeft || 40, y = r.clickableTest || Pf, v = 0, x = t._gsap || re.core.getCache(t), P = Sf(t), E = function(m, z) {
      return parseFloat(x.get(t, m, z));
    }, M = t.ownerDocument || Ke, A, C, L, I, R, $, D, j, oe, K, q, Q, H, he, _e, se, ye, Bt, Ue, rt, it, Zr, Re, ae, Ko, nt, ht, _n, bn, Zo, He, Jo, Li, es = function(m) {
      return st(m), m.stopImmediatePropagation && m.stopImmediatePropagation(), !1;
    }, xt = function U(m) {
      if (l.autoScroll && l.isDragging && (w || ye)) {
        var z = t, S = l.autoScroll * 15, N, V, F, Z, W, le, ne, ce;
        for (w = !1, At.scrollTop = fe.pageYOffset != null ? fe.pageYOffset : M.documentElement.scrollTop != null ? M.documentElement.scrollTop : M.body.scrollTop, At.scrollLeft = fe.pageXOffset != null ? fe.pageXOffset : M.documentElement.scrollLeft != null ? M.documentElement.scrollLeft : M.body.scrollLeft, Z = l.pointerX - At.scrollLeft, W = l.pointerY - At.scrollTop; z && !V; )
          V = Wr(z.parentNode), N = V ? At : z.parentNode, F = V ? {
            bottom: Math.max(vt.clientHeight, fe.innerHeight || 0),
            right: Math.max(vt.clientWidth, fe.innerWidth || 0),
            left: 0,
            top: 0
          } : N.getBoundingClientRect(), le = ne = 0, d && (ce = N._gsMaxScrollY - N.scrollTop, ce < 0 ? ne = ce : W > F.bottom - k && ce ? (w = !0, ne = Math.min(ce, S * (1 - Math.max(0, F.bottom - W) / k) | 0)) : W < F.top + T && N.scrollTop && (w = !0, ne = -Math.min(N.scrollTop, S * (1 - Math.max(0, W - F.top) / T) | 0)), ne && (N.scrollTop += ne)), f && (ce = N._gsMaxScrollX - N.scrollLeft, ce < 0 ? le = ce : Z > F.right - O && ce ? (w = !0, le = Math.min(ce, S * (1 - Math.max(0, F.right - Z) / O) | 0)) : Z < F.left + _ && N.scrollLeft && (w = !0, le = -Math.min(N.scrollLeft, S * (1 - Math.max(0, Z - F.left) / _) | 0)), le && (N.scrollLeft += le)), V && (le || ne) && (fe.scrollTo(N.scrollLeft, N.scrollTop), ti(l.pointerX + le, l.pointerY + ne)), z = N;
      }
      if (ye) {
        var ve = l.x, Ie = l.y;
        a ? (l.deltaX = ve - parseFloat(x.rotation), l.rotation = ve, x.rotation = ve + "deg", x.renderTransform(1, x)) : C ? (d && (l.deltaY = Ie - C.top(), C.top(Ie)), f && (l.deltaX = ve - C.left(), C.left(ve))) : s ? (d && (l.deltaY = Ie - parseFloat(x.y), x.y = Ie + "px"), f && (l.deltaX = ve - parseFloat(x.x), x.x = ve + "px"), x.renderTransform(1, x)) : (d && (l.deltaY = Ie - parseFloat(t.style.top || 0), t.style.top = Ie + "px"), f && (l.deltaX = ve - parseFloat(t.style.left || 0), t.style.left = ve + "px")), j && !m && !_n && (_n = !0, xe(l, "drag", "onDrag") === !1 && (f && (l.x -= l.deltaX), d && (l.y -= l.deltaY), U(!0)), _n = !1);
      }
      ye = !1;
    }, ir = function(m, z) {
      var S = l.x, N = l.y, V, F;
      t._gsap || (x = re.core.getCache(t)), x.uncache && re.getProperty(t, "x"), s ? (l.x = parseFloat(x.x), l.y = parseFloat(x.y)) : a ? l.x = l.rotation = parseFloat(x.rotation) : C ? (l.y = C.top(), l.x = C.left()) : (l.y = parseFloat(t.style.top || (F = zi(t)) && F.top) || 0, l.x = parseFloat(t.style.left || (F || {}).left) || 0), (Ue || rt || it) && !z && (l.isDragging || l.isThrowing) && (it && (Er.x = l.x, Er.y = l.y, V = it(Er), V.x !== l.x && (l.x = V.x, ye = !0), V.y !== l.y && (l.y = V.y, ye = !0)), Ue && (V = Ue(l.x), V !== l.x && (l.x = V, a && (l.rotation = V), ye = !0)), rt && (V = rt(l.y), V !== l.y && (l.y = V), ye = !0)), ye && xt(!0), m || (l.deltaX = l.x - S, l.deltaY = l.y - N, xe(l, "throwupdate", "onThrowUpdate"));
    }, yn = function(m, z, S, N) {
      return z == null && (z = -cr), S == null && (S = cr), Ut(m) ? function(V) {
        var F = l.isPressed ? 1 - l.edgeResistance : 1;
        return m.call(l, (V > S ? S + (V - S) * F : V < z ? z + (V - z) * F : V) * N) * N;
      } : ni(m) ? function(V) {
        for (var F = m.length, Z = 0, W = cr, le, ne; --F > -1; )
          le = m[F], ne = le - V, ne < 0 && (ne = -ne), ne < W && le >= z && le <= S && (Z = F, W = ne);
        return m[Z];
      } : isNaN(m) ? function(V) {
        return V;
      } : function() {
        return m * N;
      };
    }, Ll = function(m, z, S, N, V, F, Z) {
      return F = F && F < cr ? F * F : cr, Ut(m) ? function(W) {
        var le = l.isPressed ? 1 - l.edgeResistance : 1, ne = W.x, ce = W.y, ve, Ie, Ot;
        return W.x = ne = ne > S ? S + (ne - S) * le : ne < z ? z + (ne - z) * le : ne, W.y = ce = ce > V ? V + (ce - V) * le : ce < N ? N + (ce - N) * le : ce, ve = m.call(l, W), ve !== W && (W.x = ve.x, W.y = ve.y), Z !== 1 && (W.x *= Z, W.y *= Z), F < cr && (Ie = W.x - ne, Ot = W.y - ce, Ie * Ie + Ot * Ot > F && (W.x = ne, W.y = ce)), W;
      } : ni(m) ? function(W) {
        for (var le = m.length, ne = 0, ce = cr, ve, Ie, Ot, ot; --le > -1; )
          Ot = m[le], ve = Ot.x - W.x, Ie = Ot.y - W.y, ot = ve * ve + Ie * Ie, ot < ce && (ne = le, ce = ot);
        return ce <= F ? m[ne] : W;
      } : function(W) {
        return W;
      };
    }, vn = function() {
      var m, z, S, N;
      D = !1, C ? (C.calibrate(), l.minX = q = -C.maxScrollLeft(), l.minY = H = -C.maxScrollTop(), l.maxX = K = l.maxY = Q = 0, D = !0) : r.bounds && (m = Ys(r.bounds, t.parentNode), a ? (l.minX = q = m.left, l.maxX = K = m.left + m.width, l.minY = H = l.maxY = Q = 0) : !_t(r.bounds.maxX) || !_t(r.bounds.maxY) ? (m = r.bounds, l.minX = q = m.minX, l.minY = H = m.minY, l.maxX = K = m.maxX, l.maxY = Q = m.maxY) : (z = Ys(t, t.parentNode), l.minX = q = Math.round(E(c, "px") + m.left - z.left), l.minY = H = Math.round(E(u, "px") + m.top - z.top), l.maxX = K = Math.round(q + (m.width - z.width)), l.maxY = Q = Math.round(H + (m.height - z.height))), q > K && (l.minX = K, l.maxX = K = q, q = l.minX), H > Q && (l.minY = Q, l.maxY = Q = H, H = l.minY), a && (l.minRotation = q, l.maxRotation = K), D = !0), r.liveSnap && (S = r.liveSnap === !0 ? r.snap || {} : r.liveSnap, N = ni(S) || Ut(S), a ? (Ue = yn(N ? S : S.rotation, q, K, 1), rt = null) : S.points ? it = Ll(N ? S : S.points, q, K, H, Q, S.radius, C ? -1 : 1) : (f && (Ue = yn(N ? S : S.x || S.left || S.scrollLeft, q, K, C ? -1 : 1)), d && (rt = yn(N ? S : S.y || S.top || S.scrollTop, H, Q, C ? -1 : 1))));
    }, Il = function() {
      l.isThrowing = !1, xe(l, "throwcomplete", "onThrowComplete");
    }, $l = function() {
      l.isThrowing = !1;
    }, xn = function(m, z) {
      var S, N, V, F;
      m && mt ? (m === !0 && (S = r.snap || r.liveSnap || {}, N = ni(S) || Ut(S), m = {
        resistance: (r.throwResistance || r.resistance || 1e3) / (a ? 10 : 1)
      }, a ? m.rotation = Fn(l, N ? S : S.rotation, K, q, 1, z) : (f && (m[c] = Fn(l, N ? S : S.points || S.x || S.left, K, q, C ? -1 : 1, z || l.lockedAxis === "x")), d && (m[u] = Fn(l, N ? S : S.points || S.y || S.top, Q, H, C ? -1 : 1, z || l.lockedAxis === "y")), (S.points || ni(S) && xi(S[0])) && (m.linkedProps = c + "," + u, m.radius = S.radius))), l.isThrowing = !0, F = isNaN(r.overshootTolerance) ? r.edgeResistance === 1 ? 0 : 1 - l.edgeResistance + 0.2 : r.overshootTolerance, m.duration || (m.duration = {
        max: Math.max(r.minDuration || 0, "maxDuration" in r ? r.maxDuration : 2),
        min: isNaN(r.minDuration) ? F === 0 || xi(m) && m.resistance > 1e3 ? 0 : 0.5 : r.minDuration,
        overshoot: F
      }), l.tween = V = re.to(C || t, {
        inertia: m,
        data: "_draggable",
        inherit: !1,
        onComplete: Il,
        onInterrupt: $l,
        onUpdate: r.fastMode ? xe : ir,
        onUpdateParams: r.fastMode ? [l, "onthrowupdate", "onThrowUpdate"] : S && S.radius ? [!1, !0] : []
      }), r.fastMode || (C && (C._skip = !0), V.render(1e9, !0, !0), ir(!0, !0), l.endX = l.x, l.endY = l.y, a && (l.endRotation = l.x), V.play(0), ir(!0, !0), C && (C._skip = !1))) : D && l.applyBounds();
    }, ts = function(m) {
      var z = ae, S;
      ae = pr(t.parentNode, !0), m && l.isPressed && !ae.equals(z || new Tr()) && (S = z.inverse().apply({
        x: L,
        y: I
      }), ae.apply(S, S), L = S.x, I = S.y), ae.equals(mf) && (ae = null);
    }, Ii = function() {
      var m = 1 - l.edgeResistance, z = P ? Vr(M) : 0, S = P ? $r(M) : 0, N, V, F;
      s && (x.x = E(c, "px") + "px", x.y = E(u, "px") + "px", x.renderTransform()), ts(!1), at.x = l.pointerX - z, at.y = l.pointerY - S, ae && ae.apply(at, at), L = at.x, I = at.y, ye && (ti(l.pointerX, l.pointerY), xt(!0)), Jo = pr(t), C ? (vn(), $ = C.top(), R = C.left()) : (Jr() ? (ir(!0, !0), vn()) : l.applyBounds(), a ? (N = t.ownerSVGElement ? [x.xOrigin - t.getBBox().x, x.yOrigin - t.getBBox().y] : (zi(t)[bo] || "0 0").split(" "), se = l.rotationOrigin = pr(t).apply({
        x: parseFloat(N[0]) || 0,
        y: parseFloat(N[1]) || 0
      }), ir(!0, !0), V = l.pointerX - se.x - z, F = se.y - l.pointerY + S, R = l.x, $ = l.y = Math.atan2(F, V) * Ns) : ($ = E(u, "px"), R = E(c, "px"))), D && m && (R > K ? R = K + (R - K) / m : R < q && (R = q - (q - R) / m), a || ($ > Q ? $ = Q + ($ - Q) / m : $ < H && ($ = H - (H - $) / m))), l.startX = R = Yt(R), l.startY = $ = Yt($);
    }, Jr = function() {
      return l.tween && l.tween.isActive();
    }, Vl = function() {
      Lt.parentNode && !Jr() && !l.isDragging && Lt.parentNode.removeChild(Lt);
    }, ei = function(m, z) {
      var S;
      if (!A || l.isPressed || !m || (m.type === "mousedown" || m.type === "pointerdown") && !z && jt() - v < 30 && Ri[l.pointerEvent.type]) {
        He && m && A && st(m);
        return;
      }
      if (Ko = Jr(), Li = !1, l.pointerEvent = m, Ri[m.type] ? (Re = ~m.type.indexOf("touch") ? m.currentTarget || m.target : M, Oe(Re, "touchend", pt), Oe(Re, "touchmove", nr), Oe(Re, "touchcancel", pt), Oe(M, "touchstart", Fs)) : (Re = null, Oe(M, "mousemove", nr)), ht = null, (!Zi || !Re) && (Oe(M, "mouseup", pt), m && m.target && Oe(m.target, "mouseup", pt)), Zr = y.call(l, m.target) && r.dragClickables === !1 && !z, Zr) {
        Oe(m.target, "change", pt), xe(l, "pressInit", "onPressInit"), xe(l, "press", "onPress"), ji(g, !0), He = !1;
        return;
      }
      if (nt = !Re || f === d || l.vars.allowNativeTouchScrolling === !1 || l.vars.allowContextMenu && m && (m.ctrlKey || m.which > 2) ? !1 : f ? "y" : "x", He = !nt && !l.allowEventDefault, He && (st(m), Oe(fe, "touchforcechange", st)), m.changedTouches ? (m = he = m.changedTouches[0], _e = m.identifier) : m.pointerId ? _e = m.pointerId : he = _e = null, un++, vf(xt), I = l.pointerY = m.pageY, L = l.pointerX = m.pageX, xe(l, "pressInit", "onPressInit"), (nt || l.autoScroll) && $n(t.parentNode), t.parentNode && l.autoScroll && !C && !a && t.parentNode._gsMaxScrollX && !Lt.parentNode && !t.getBBox && (Lt.style.width = t.parentNode.scrollWidth + "px", t.parentNode.appendChild(Lt)), Ii(), l.tween && l.tween.kill(), l.isThrowing = !1, re.killTweensOf(C || t, h, !0), C && re.killTweensOf(t, {
        scrollTo: 1
      }, !0), l.tween = l.lockedAxis = null, (r.zIndexBoost || !a && !C && r.zIndexBoost !== !1) && (t.style.zIndex = e.zIndex++), l.isPressed = !0, j = !!(r.onDrag || l._listeners.drag), oe = !!(r.onMove || l._listeners.move), r.cursor !== !1 || r.activeCursor)
        for (S = g.length; --S > -1; )
          re.set(g[S], {
            cursor: r.activeCursor || r.cursor || (gi === "grab" ? "grabbing" : gi)
          });
      xe(l, "press", "onPress");
    }, nr = function(m) {
      var z = m, S, N, V, F, Z, W;
      if (!A || Uo || !l.isPressed || !m) {
        He && m && A && st(m);
        return;
      }
      if (l.pointerEvent = m, S = m.changedTouches, S) {
        if (m = S[0], m !== he && m.identifier !== _e) {
          for (F = S.length; --F > -1 && (m = S[F]).identifier !== _e && m.target !== t; )
            ;
          if (F < 0)
            return;
        }
      } else if (m.pointerId && _e && m.pointerId !== _e)
        return;
      if (Re && nt && !ht && (at.x = m.pageX - (P ? Vr(M) : 0), at.y = m.pageY - (P ? $r(M) : 0), ae && ae.apply(at, at), N = at.x, V = at.y, Z = Math.abs(N - L), W = Math.abs(V - I), (Z !== W && (Z > p || W > p) || pi && nt === ht) && (ht = Z > W && f ? "x" : "y", nt && ht !== nt && Oe(fe, "touchforcechange", st), l.vars.lockAxisOnTouchScroll !== !1 && f && d && (l.lockedAxis = ht === "x" ? "y" : "x", Ut(l.vars.onLockAxis) && l.vars.onLockAxis.call(l, z)), pi && nt === ht))) {
        pt(z);
        return;
      }
      !l.allowEventDefault && (!nt || ht && nt !== ht) && z.cancelable !== !1 ? (st(z), He = !0) : He && (He = !1), l.autoScroll && (w = !0), ti(m.pageX, m.pageY, oe);
    }, ti = function(m, z, S) {
      var N = 1 - l.dragResistance, V = 1 - l.edgeResistance, F = l.pointerX, Z = l.pointerY, W = $, le = l.x, ne = l.y, ce = l.endX, ve = l.endY, Ie = l.endRotation, Ot = ye, ot, Gt, ze, Pe, wn, gt;
      l.pointerX = m, l.pointerY = z, P && (m -= Vr(M), z -= $r(M)), a ? (Pe = Math.atan2(se.y - z, m - se.x) * Ns, wn = l.y - Pe, wn > 180 ? ($ -= 360, l.y = Pe) : wn < -180 && ($ += 360, l.y = Pe), l.x !== R || Math.max(Math.abs(L - m), Math.abs(I - z)) > p ? (l.y = Pe, ze = R + ($ - Pe) * N) : ze = R) : (ae && (gt = m * ae.a + z * ae.c + ae.e, z = m * ae.b + z * ae.d + ae.f, m = gt), Gt = z - I, ot = m - L, Gt < p && Gt > -p && (Gt = 0), ot < p && ot > -p && (ot = 0), (l.lockAxis || l.lockedAxis) && (ot || Gt) && (gt = l.lockedAxis, gt || (l.lockedAxis = gt = f && Math.abs(ot) > Math.abs(Gt) ? "y" : d ? "x" : null, gt && Ut(l.vars.onLockAxis) && l.vars.onLockAxis.call(l, l.pointerEvent)), gt === "y" ? Gt = 0 : gt === "x" && (ot = 0)), ze = Yt(R + ot * N), Pe = Yt($ + Gt * N)), (Ue || rt || it) && (l.x !== ze || l.y !== Pe && !a) && (it && (Er.x = ze, Er.y = Pe, gt = it(Er), ze = Yt(gt.x), Pe = Yt(gt.y)), Ue && (ze = Yt(Ue(ze))), rt && (Pe = Yt(rt(Pe)))), D && (ze > K ? ze = K + Math.round((ze - K) * V) : ze < q && (ze = q + Math.round((ze - q) * V)), a || (Pe > Q ? Pe = Math.round(Q + (Pe - Q) * V) : Pe < H && (Pe = Math.round(H + (Pe - H) * V)))), (l.x !== ze || l.y !== Pe && !a) && (a ? (l.endRotation = l.x = l.endX = ze, ye = !0) : (d && (l.y = l.endY = Pe, ye = !0), f && (l.x = l.endX = ze, ye = !0)), !S || xe(l, "move", "onMove") !== !1 ? !l.isDragging && l.isPressed && (l.isDragging = Li = !0, xe(l, "dragstart", "onDragStart")) : (l.pointerX = F, l.pointerY = Z, $ = W, l.x = le, l.y = ne, l.endX = ce, l.endY = ve, l.endRotation = Ie, ye = Ot));
    }, pt = function U(m, z) {
      if (!A || !l.isPressed || m && _e != null && !z && (m.pointerId && m.pointerId !== _e && m.target !== t || m.changedTouches && !wf(m.changedTouches, _e))) {
        He && m && A && st(m);
        return;
      }
      l.isPressed = !1;
      var S = m, N = l.isDragging, V = l.vars.allowContextMenu && m && (m.ctrlKey || m.which > 2), F = re.delayedCall(1e-3, Vl), Z, W, le, ne, ce;
      if (Re ? (Se(Re, "touchend", U), Se(Re, "touchmove", nr), Se(Re, "touchcancel", U), Se(M, "touchstart", Fs)) : Se(M, "mousemove", nr), Se(fe, "touchforcechange", st), (!Zi || !Re) && (Se(M, "mouseup", U), m && m.target && Se(m.target, "mouseup", U)), ye = !1, N && (b = Ls = jt(), l.isDragging = !1), Vs(xt), Zr && !V) {
        m && (Se(m.target, "change", U), l.pointerEvent = S), ji(g, !1), xe(l, "release", "onRelease"), xe(l, "click", "onClick"), Zr = !1;
        return;
      }
      for (W = g.length; --W > -1; )
        Vn(g[W], "cursor", r.cursor || (r.cursor !== !1 ? gi : null));
      if (un--, m) {
        if (Z = m.changedTouches, Z && (m = Z[0], m !== he && m.identifier !== _e)) {
          for (W = Z.length; --W > -1 && (m = Z[W]).identifier !== _e && m.target !== t; )
            ;
          if (W < 0 && !z)
            return;
        }
        l.pointerEvent = S, l.pointerX = m.pageX, l.pointerY = m.pageY;
      }
      return V && S ? (st(S), He = !0, xe(l, "release", "onRelease")) : S && !N ? (He = !1, Ko && (r.snap || r.bounds) && xn(r.inertia || r.throwProps), xe(l, "release", "onRelease"), (!pi || S.type !== "touchmove") && S.type.indexOf("cancel") === -1 && (xe(l, "click", "onClick"), jt() - v < 300 && xe(l, "doubleclick", "onDoubleClick"), ne = S.target || t, v = jt(), ce = function() {
        v !== bn && l.enabled() && !l.isPressed && !S.defaultPrevented && (ne.click ? ne.click() : M.createEvent && (le = M.createEvent("MouseEvents"), le.initMouseEvent("click", !0, !0, fe, 1, l.pointerEvent.screenX, l.pointerEvent.screenY, l.pointerX, l.pointerY, !1, !1, !1, !1, 0, null), ne.dispatchEvent(le)));
      }, !pi && !S.defaultPrevented && re.delayedCall(0.05, ce))) : (xn(r.inertia || r.throwProps), !l.allowEventDefault && S && (r.dragClickables !== !1 || !y.call(l, S.target)) && N && (!nt || ht && nt === ht) && S.cancelable !== !1 ? (He = !0, st(S)) : He = !1, xe(l, "release", "onRelease")), Jr() && F.duration(l.tween.duration()), N && xe(l, "dragend", "onDragEnd"), !0;
    }, $i = function(m) {
      if (m && l.isDragging && !C) {
        var z = m.target || t.parentNode, S = z.scrollLeft - z._gsScrollX, N = z.scrollTop - z._gsScrollY;
        (S || N) && (ae ? (L -= S * ae.a + N * ae.c, I -= N * ae.d + S * ae.b) : (L -= S, I -= N), z._gsScrollX += S, z._gsScrollY += N, ti(l.pointerX, l.pointerY));
      }
    }, rs = function(m) {
      var z = jt(), S = z - v < 100, N = z - b < 50, V = S && bn === v, F = l.pointerEvent && l.pointerEvent.defaultPrevented, Z = S && Zo === v, W = m.isTrusted || m.isTrusted == null && S && V;
      if ((V || N && l.vars.suppressClickOnDrag !== !1) && m.stopImmediatePropagation && m.stopImmediatePropagation(), S && !(l.pointerEvent && l.pointerEvent.defaultPrevented) && (!V || W && !Z)) {
        W && V && (Zo = v), bn = v;
        return;
      }
      (l.isPressed || N || S) && (!W || !m.detail || !S || F) && st(m), !S && !N && !Li && (m && m.target && (l.pointerEvent = m), xe(l, "click", "onClick"));
    }, is = function(m) {
      return ae ? {
        x: m.x * ae.a + m.y * ae.c + ae.e,
        y: m.x * ae.b + m.y * ae.d + ae.f
      } : {
        x: m.x,
        y: m.y
      };
    };
    return Bt = e.get(t), Bt && Bt.kill(), i.startDrag = function(U, m) {
      var z, S, N, V;
      ei(U || l.pointerEvent, !0), m && !l.hitTest(U || l.pointerEvent) && (z = Or(U || l.pointerEvent), S = Or(t), N = is({
        x: z.left + z.width / 2,
        y: z.top + z.height / 2
      }), V = is({
        x: S.left + S.width / 2,
        y: S.top + S.height / 2
      }), L -= N.x - V.x, I -= N.y - V.y), l.isDragging || (l.isDragging = Li = !0, xe(l, "dragstart", "onDragStart"));
    }, i.drag = nr, i.endDrag = function(U) {
      return pt(U || l.pointerEvent, !0);
    }, i.timeSinceDrag = function() {
      return l.isDragging ? 0 : (jt() - b) / 1e3;
    }, i.timeSinceClick = function() {
      return (jt() - v) / 1e3;
    }, i.hitTest = function(U, m) {
      return e.hitTest(l.target, U, m);
    }, i.getDirection = function(U, m) {
      var z = U === "velocity" && mt ? U : xi(U) && !a ? "element" : "start", S, N, V, F, Z, W;
      return z === "element" && (Z = Or(l.target), W = Or(U)), S = z === "start" ? l.x - R : z === "velocity" ? mt.getVelocity(t, c) : Z.left + Z.width / 2 - (W.left + W.width / 2), a ? S < 0 ? "counter-clockwise" : "clockwise" : (m = m || 2, N = z === "start" ? l.y - $ : z === "velocity" ? mt.getVelocity(t, u) : Z.top + Z.height / 2 - (W.top + W.height / 2), V = Math.abs(S / N), F = V < 1 / m ? "" : S < 0 ? "left" : "right", V < m && (F !== "" && (F += "-"), F += N < 0 ? "up" : "down"), F);
    }, i.applyBounds = function(U, m) {
      var z, S, N, V, F, Z;
      if (U && r.bounds !== U)
        return r.bounds = U, l.update(!0, m);
      if (ir(!0), vn(), D && !Jr()) {
        if (z = l.x, S = l.y, z > K ? z = K : z < q && (z = q), S > Q ? S = Q : S < H && (S = H), (l.x !== z || l.y !== S) && (N = !0, l.x = l.endX = z, a ? l.endRotation = z : l.y = l.endY = S, ye = !0, xt(!0), l.autoScroll && !l.isDragging))
          for ($n(t.parentNode), V = t, At.scrollTop = fe.pageYOffset != null ? fe.pageYOffset : M.documentElement.scrollTop != null ? M.documentElement.scrollTop : M.body.scrollTop, At.scrollLeft = fe.pageXOffset != null ? fe.pageXOffset : M.documentElement.scrollLeft != null ? M.documentElement.scrollLeft : M.body.scrollLeft; V && !Z; )
            Z = Wr(V.parentNode), F = Z ? At : V.parentNode, d && F.scrollTop > F._gsMaxScrollY && (F.scrollTop = F._gsMaxScrollY), f && F.scrollLeft > F._gsMaxScrollX && (F.scrollLeft = F._gsMaxScrollX), V = F;
        l.isThrowing && (N || l.endX > K || l.endX < q || l.endY > Q || l.endY < H) && xn(r.inertia || r.throwProps, N);
      }
      return l;
    }, i.update = function(U, m, z) {
      if (m && l.isPressed) {
        var S = pr(t), N = Jo.apply({
          x: l.x - R,
          y: l.y - $
        }), V = pr(t.parentNode, !0);
        V.apply({
          x: S.e - N.x,
          y: S.f - N.y
        }, N), l.x -= N.x - V.e, l.y -= N.y - V.f, xt(!0), Ii();
      }
      var F = l.x, Z = l.y;
      return ts(!m), U ? l.applyBounds() : (ye && z && xt(!0), ir(!0)), m && (ti(l.pointerX, l.pointerY), ye && xt(!0)), l.isPressed && !m && (f && Math.abs(F - l.x) > 0.01 || d && Math.abs(Z - l.y) > 0.01 && !a) && Ii(), l.autoScroll && ($n(t.parentNode, l.isDragging), w = l.isDragging, xt(!0), Gs(t, $i), Bs(t, $i)), l;
    }, i.enable = function(U) {
      var m = {
        lazy: !0
      }, z, S, N;
      if (r.cursor !== !1 && (m.cursor = r.cursor || gi), re.utils.checkPrefix("touchCallout") && (m.touchCallout = "none"), U !== "soft") {
        for (Is(g, f === d ? "none" : r.allowNativeTouchScrolling && t.scrollHeight === t.clientHeight == (t.scrollWidth === t.clientHeight) || r.allowEventDefault ? "manipulation" : f ? "pan-y" : "pan-x"), S = g.length; --S > -1; )
          N = g[S], Zi || Oe(N, "mousedown", ei), Oe(N, "touchstart", ei), Oe(N, "click", rs, !0), re.set(N, m), N.getBBox && N.ownerSVGElement && f !== d && re.set(N.ownerSVGElement, {
            touchAction: r.allowNativeTouchScrolling || r.allowEventDefault ? "manipulation" : f ? "pan-y" : "pan-x"
          }), r.allowContextMenu || Oe(N, "contextmenu", es);
        ji(g, !1);
      }
      return Bs(t, $i), A = !0, mt && U !== "soft" && mt.track(C || t, s ? "x,y" : a ? "rotation" : "top,left"), t._gsDragID = z = t._gsDragID || "d" + _f++, Ir[z] = l, C && (C.enable(), C.element._gsDragID = z), (r.bounds || a) && Ii(), r.bounds && l.applyBounds(), l;
    }, i.disable = function(U) {
      for (var m = l.isDragging, z = g.length, S; --z > -1; )
        Vn(g[z], "cursor", null);
      if (U !== "soft") {
        for (Is(g, null), z = g.length; --z > -1; )
          S = g[z], Vn(S, "touchCallout", null), Se(S, "mousedown", ei), Se(S, "touchstart", ei), Se(S, "click", rs, !0), Se(S, "contextmenu", es);
        ji(g, !0), Re && (Se(Re, "touchcancel", pt), Se(Re, "touchend", pt), Se(Re, "touchmove", nr)), Se(M, "mouseup", pt), Se(M, "mousemove", nr);
      }
      return Gs(t, $i), A = !1, mt && U !== "soft" && (mt.untrack(C || t, s ? "x,y" : a ? "rotation" : "top,left"), l.tween && l.tween.kill()), C && C.disable(), Vs(xt), l.isDragging = l.isPressed = Zr = !1, m && xe(l, "dragend", "onDragEnd"), l;
    }, i.enabled = function(U, m) {
      return arguments.length ? U ? l.enable(m) : l.disable(m) : A;
    }, i.kill = function() {
      return l.isThrowing = !1, l.tween && l.tween.kill(), l.disable(), re.set(g, {
        clearProps: "userSelect"
      }), delete Ir[t._gsDragID], l;
    }, i.revert = function() {
      this.kill(), this.styles && this.styles.revert();
    }, ~o.indexOf("scroll") && (C = i.scrollProxy = new Mf(t, yf({
      onKill: function() {
        l.isPressed && pt(null);
      }
    }, r)), t.style.overflowY = d && !mo ? "auto" : "hidden", t.style.overflowX = f && !mo ? "auto" : "hidden", t = C.content), a ? h.rotation = 1 : (f && (h[c] = 1), d && (h[u] = 1)), x.force3D = "force3D" in r ? r.force3D : !0, yl(zs(i)), i.enable(), i;
  }
  return e.register = function(r) {
    re = r, Bn();
  }, e.create = function(r, i) {
    return go || Bn(!0), Kt(r).map(function(o) {
      return new e(o, i);
    });
  }, e.get = function(r) {
    return Ir[(Kt(r)[0] || {})._gsDragID];
  }, e.timeSinceDrag = function() {
    return (jt() - Ls) / 1e3;
  }, e.hitTest = function(r, i, o) {
    if (r === i)
      return !1;
    var s = Or(r), a = Or(i), c = s.top, u = s.left, f = s.right, d = s.bottom, p = s.width, l = s.height, g = a.left > f || a.right < u || a.top > d || a.bottom < c, h, b, w;
    return g || !o ? !g : (w = (o + "").indexOf("%") !== -1, o = parseFloat(o) || 0, h = {
      left: Math.max(u, a.left),
      top: Math.max(c, a.top)
    }, h.width = Math.min(f, a.right) - h.left, h.height = Math.min(d, a.bottom) - h.top, h.width < 0 || h.height < 0 ? !1 : w ? (o *= 0.01, b = h.width * h.height, b >= p * l * o || b >= a.width * a.height * o) : h.width > o && h.height > o);
  }, e;
}(Cf);
xf(qr.prototype, {
  pointerX: 0,
  pointerY: 0,
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  isDragging: !1,
  isPressed: !1
});
qr.zIndex = 1e3;
qr.version = "3.13.0";
xl() && re.registerPlugin(qr);
Pt.registerPlugin(qr);
function Ef(n, e = {}) {
  const t = Ne(!1), r = Ne({ x: 0, y: 0 });
  let i = null;
  const {
    bounds: o = "body",
    inertia: s = !0,
    edgeResistance: a = 0.65,
    onDragStart: c,
    onDrag: u,
    onDragEnd: f,
    disabled: d = !1
  } = e;
  function p() {
    !n.value || i || (i = qr.create(n.value, {
      type: "x,y",
      bounds: o,
      edgeResistance: a,
      inertia: s ? {
        resistance: 300,
        velocityScale: 0.8
      } : !1,
      onDragStart() {
        t.value = !0, n.value && Pt.to(n.value, {
          scale: 1.02,
          duration: 0.2,
          ease: "power2.out"
        }), c?.(arguments[0]);
      },
      onDrag() {
        if (n.value) {
          const w = Pt.getProperty(n.value, "transform"), T = new DOMMatrix(w);
          r.value = { x: T.m41, y: T.m42 };
        }
        u?.(arguments[0]);
      },
      onDragEnd() {
        if (t.value = !1, n.value && Pt.to(n.value, {
          scale: 1,
          duration: 0.3,
          ease: "elastic.out(1, 0.75)"
        }), n.value) {
          const w = n.value.getBoundingClientRect(), T = window.innerWidth, O = window.innerHeight, k = 50;
          let _ = r.value.x, y = r.value.y;
          w.left < k ? _ = 0 : w.right > T - k && (_ = T - w.width), w.top < k ? y = 0 : w.bottom > O - k && (y = O - w.height), (_ !== r.value.x || y !== r.value.y) && (Pt.to(n.value, {
            x: _,
            y,
            duration: 0.5,
            ease: "power3.out"
          }), r.value = { x: _, y });
        }
        f?.(arguments[0]);
      }
    }), d && i[0].disable());
  }
  function l() {
    i?.[0] && i[0].enable();
  }
  function g() {
    i?.[0] && i[0].disable();
  }
  function h(w, T) {
    n.value && (Pt.set(n.value, { x: w, y: T }), r.value = { x: w, y: T });
  }
  function b() {
    i && (i[0].kill(), i = null);
  }
  return dn(() => {
    setTimeout(p, 0);
  }), qs(() => {
    b();
  }), {
    isDragging: t,
    position: r,
    enable: l,
    disable: g,
    updatePosition: h,
    destroy: b
  };
}
function Pl(n) {
  var e, t, r = "";
  if (typeof n == "string" || typeof n == "number") r += n;
  else if (typeof n == "object") if (Array.isArray(n)) {
    var i = n.length;
    for (e = 0; e < i; e++) n[e] && (t = Pl(n[e])) && (r && (r += " "), r += t);
  } else for (t in n) n[t] && (r && (r += " "), r += t);
  return r;
}
function Of() {
  for (var n, e, t = 0, r = "", i = arguments.length; t < i; t++) (n = arguments[t]) && (e = Pl(n)) && (r && (r += " "), r += e);
  return r;
}
const Ho = "-", Df = (n) => {
  const e = Rf(n), {
    conflictingClassGroups: t,
    conflictingClassGroupModifiers: r
  } = n;
  return {
    getClassGroupId: (s) => {
      const a = s.split(Ho);
      return a[0] === "" && a.length !== 1 && a.shift(), Sl(a, e) || Af(s);
    },
    getConflictingClassGroupIds: (s, a) => {
      const c = t[s] || [];
      return a && r[s] ? [...c, ...r[s]] : c;
    }
  };
}, Sl = (n, e) => {
  if (n.length === 0)
    return e.classGroupId;
  const t = n[0], r = e.nextPart.get(t), i = r ? Sl(n.slice(1), r) : void 0;
  if (i)
    return i;
  if (e.validators.length === 0)
    return;
  const o = n.join(Ho);
  return e.validators.find(({
    validator: s
  }) => s(o))?.classGroupId;
}, js = /^\[(.+)\]$/, Af = (n) => {
  if (js.test(n)) {
    const e = js.exec(n)[1], t = e?.substring(0, e.indexOf(":"));
    if (t)
      return "arbitrary.." + t;
  }
}, Rf = (n) => {
  const {
    theme: e,
    classGroups: t
  } = n, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const i in t)
    vo(t[i], r, i, e);
  return r;
}, vo = (n, e, t, r) => {
  n.forEach((i) => {
    if (typeof i == "string") {
      const o = i === "" ? e : Ws(e, i);
      o.classGroupId = t;
      return;
    }
    if (typeof i == "function") {
      if (zf(i)) {
        vo(i(r), e, t, r);
        return;
      }
      e.validators.push({
        validator: i,
        classGroupId: t
      });
      return;
    }
    Object.entries(i).forEach(([o, s]) => {
      vo(s, Ws(e, o), t, r);
    });
  });
}, Ws = (n, e) => {
  let t = n;
  return e.split(Ho).forEach((r) => {
    t.nextPart.has(r) || t.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), t = t.nextPart.get(r);
  }), t;
}, zf = (n) => n.isThemeGetter, Nf = (n) => {
  if (n < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let e = 0, t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const i = (o, s) => {
    t.set(o, s), e++, e > n && (e = 0, r = t, t = /* @__PURE__ */ new Map());
  };
  return {
    get(o) {
      let s = t.get(o);
      if (s !== void 0)
        return s;
      if ((s = r.get(o)) !== void 0)
        return i(o, s), s;
    },
    set(o, s) {
      t.has(o) ? t.set(o, s) : i(o, s);
    }
  };
}, xo = "!", wo = ":", Lf = wo.length, If = (n) => {
  const {
    prefix: e,
    experimentalParseClassName: t
  } = n;
  let r = (i) => {
    const o = [];
    let s = 0, a = 0, c = 0, u;
    for (let g = 0; g < i.length; g++) {
      let h = i[g];
      if (s === 0 && a === 0) {
        if (h === wo) {
          o.push(i.slice(c, g)), c = g + Lf;
          continue;
        }
        if (h === "/") {
          u = g;
          continue;
        }
      }
      h === "[" ? s++ : h === "]" ? s-- : h === "(" ? a++ : h === ")" && a--;
    }
    const f = o.length === 0 ? i : i.substring(c), d = $f(f), p = d !== f, l = u && u > c ? u - c : void 0;
    return {
      modifiers: o,
      hasImportantModifier: p,
      baseClassName: d,
      maybePostfixModifierPosition: l
    };
  };
  if (e) {
    const i = e + wo, o = r;
    r = (s) => s.startsWith(i) ? o(s.substring(i.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: s,
      maybePostfixModifierPosition: void 0
    };
  }
  if (t) {
    const i = r;
    r = (o) => t({
      className: o,
      parseClassName: i
    });
  }
  return r;
}, $f = (n) => n.endsWith(xo) ? n.substring(0, n.length - 1) : n.startsWith(xo) ? n.substring(1) : n, Vf = (n) => {
  const e = Object.fromEntries(n.orderSensitiveModifiers.map((r) => [r, !0]));
  return (r) => {
    if (r.length <= 1)
      return r;
    const i = [];
    let o = [];
    return r.forEach((s) => {
      s[0] === "[" || e[s] ? (i.push(...o.sort(), s), o = []) : o.push(s);
    }), i.push(...o.sort()), i;
  };
}, Ff = (n) => ({
  cache: Nf(n.cacheSize),
  parseClassName: If(n),
  sortModifiers: Vf(n),
  ...Df(n)
}), Bf = /\s+/, Gf = (n, e) => {
  const {
    parseClassName: t,
    getClassGroupId: r,
    getConflictingClassGroupIds: i,
    sortModifiers: o
  } = e, s = [], a = n.trim().split(Bf);
  let c = "";
  for (let u = a.length - 1; u >= 0; u -= 1) {
    const f = a[u], {
      isExternal: d,
      modifiers: p,
      hasImportantModifier: l,
      baseClassName: g,
      maybePostfixModifierPosition: h
    } = t(f);
    if (d) {
      c = f + (c.length > 0 ? " " + c : c);
      continue;
    }
    let b = !!h, w = r(b ? g.substring(0, h) : g);
    if (!w) {
      if (!b) {
        c = f + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (w = r(g), !w) {
        c = f + (c.length > 0 ? " " + c : c);
        continue;
      }
      b = !1;
    }
    const T = o(p).join(":"), O = l ? T + xo : T, k = O + w;
    if (s.includes(k))
      continue;
    s.push(k);
    const _ = i(w, b);
    for (let y = 0; y < _.length; ++y) {
      const v = _[y];
      s.push(O + v);
    }
    c = f + (c.length > 0 ? " " + c : c);
  }
  return c;
};
function Xf() {
  let n = 0, e, t, r = "";
  for (; n < arguments.length; )
    (e = arguments[n++]) && (t = Ml(e)) && (r && (r += " "), r += t);
  return r;
}
const Ml = (n) => {
  if (typeof n == "string")
    return n;
  let e, t = "";
  for (let r = 0; r < n.length; r++)
    n[r] && (e = Ml(n[r])) && (t && (t += " "), t += e);
  return t;
};
function Yf(n, ...e) {
  let t, r, i, o = s;
  function s(c) {
    const u = e.reduce((f, d) => d(f), n());
    return t = Ff(u), r = t.cache.get, i = t.cache.set, o = a, a(c);
  }
  function a(c) {
    const u = r(c);
    if (u)
      return u;
    const f = Gf(c, t);
    return i(c, f), f;
  }
  return function() {
    return o(Xf.apply(null, arguments));
  };
}
const Ee = (n) => {
  const e = (t) => t[n] || [];
  return e.isThemeGetter = !0, e;
}, Cl = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, El = /^\((?:(\w[\w-]*):)?(.+)\)$/i, jf = /^\d+\/\d+$/, Wf = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Uf = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Hf = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, qf = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Qf = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Dr = (n) => jf.test(n), J = (n) => !!n && !Number.isNaN(Number(n)), Wt = (n) => !!n && Number.isInteger(Number(n)), Gn = (n) => n.endsWith("%") && J(n.slice(0, -1)), Dt = (n) => Wf.test(n), Kf = () => !0, Zf = (n) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Uf.test(n) && !Hf.test(n)
), Ol = () => !1, Jf = (n) => qf.test(n), ed = (n) => Qf.test(n), td = (n) => !B(n) && !G(n), rd = (n) => Qr(n, Rl, Ol), B = (n) => Cl.test(n), fr = (n) => Qr(n, zl, Zf), Xn = (n) => Qr(n, ad, J), Us = (n) => Qr(n, Dl, Ol), id = (n) => Qr(n, Al, ed), Wi = (n) => Qr(n, Nl, Jf), G = (n) => El.test(n), oi = (n) => Kr(n, zl), nd = (n) => Kr(n, ld), Hs = (n) => Kr(n, Dl), od = (n) => Kr(n, Rl), sd = (n) => Kr(n, Al), Ui = (n) => Kr(n, Nl, !0), Qr = (n, e, t) => {
  const r = Cl.exec(n);
  return r ? r[1] ? e(r[1]) : t(r[2]) : !1;
}, Kr = (n, e, t = !1) => {
  const r = El.exec(n);
  return r ? r[1] ? e(r[1]) : t : !1;
}, Dl = (n) => n === "position" || n === "percentage", Al = (n) => n === "image" || n === "url", Rl = (n) => n === "length" || n === "size" || n === "bg-size", zl = (n) => n === "length", ad = (n) => n === "number", ld = (n) => n === "family-name", Nl = (n) => n === "shadow", cd = () => {
  const n = Ee("color"), e = Ee("font"), t = Ee("text"), r = Ee("font-weight"), i = Ee("tracking"), o = Ee("leading"), s = Ee("breakpoint"), a = Ee("container"), c = Ee("spacing"), u = Ee("radius"), f = Ee("shadow"), d = Ee("inset-shadow"), p = Ee("text-shadow"), l = Ee("drop-shadow"), g = Ee("blur"), h = Ee("perspective"), b = Ee("aspect"), w = Ee("ease"), T = Ee("animate"), O = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], k = () => [
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
  ], _ = () => [...k(), G, B], y = () => ["auto", "hidden", "clip", "visible", "scroll"], v = () => ["auto", "contain", "none"], x = () => [G, B, c], P = () => [Dr, "full", "auto", ...x()], E = () => [Wt, "none", "subgrid", G, B], M = () => ["auto", {
    span: ["full", Wt, G, B]
  }, Wt, G, B], A = () => [Wt, "auto", G, B], C = () => ["auto", "min", "max", "fr", G, B], L = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], I = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], R = () => ["auto", ...x()], $ = () => [Dr, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...x()], D = () => [n, G, B], j = () => [...k(), Hs, Us, {
    position: [G, B]
  }], oe = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], K = () => ["auto", "cover", "contain", od, rd, {
    size: [G, B]
  }], q = () => [Gn, oi, fr], Q = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    u,
    G,
    B
  ], H = () => ["", J, oi, fr], he = () => ["solid", "dashed", "dotted", "double"], _e = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], se = () => [J, Gn, Hs, Us], ye = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    g,
    G,
    B
  ], Bt = () => ["none", J, G, B], Ue = () => ["none", J, G, B], rt = () => [J, G, B], it = () => [Dr, "full", ...x()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Dt],
      breakpoint: [Dt],
      color: [Kf],
      container: [Dt],
      "drop-shadow": [Dt],
      ease: ["in", "out", "in-out"],
      font: [td],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Dt],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Dt],
      shadow: [Dt],
      spacing: ["px", J],
      text: [Dt],
      "text-shadow": [Dt],
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
        aspect: ["auto", "square", Dr, B, G, b]
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
        columns: [J, B, G, a]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": O()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": O()
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
        object: _()
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
        inset: P()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": P()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": P()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: P()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: P()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: P()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: P()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: P()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: P()
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
        z: [Wt, "auto", G, B]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [Dr, "full", "auto", a, ...x()]
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
        flex: [J, Dr, "auto", "initial", "none", B]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", J, G, B]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", J, G, B]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Wt, "first", "last", "none", G, B]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": E()
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
        "col-start": A()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": A()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": E()
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
        "row-start": A()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": A()
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
        "auto-cols": C()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": C()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: x()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": x()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": x()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...L(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...I(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...I()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...L()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...I(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...I(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": L()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...I(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...I()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: x()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: x()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: x()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: x()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: x()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: x()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: x()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: x()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: x()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: R()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: R()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: R()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: R()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: R()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: R()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: R()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: R()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: R()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": x()
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
        "space-y": x()
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
        size: $()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [a, "screen", ...$()]
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
          ...$()
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
            screen: [s]
          },
          ...$()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...$()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...$()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...$()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", t, oi, fr]
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
        font: [r, G, Xn]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Gn, B]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [nd, B, e]
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
        tracking: [i, G, B]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [J, "none", G, Xn]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          o,
          ...x()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", G, B]
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
        list: ["disc", "decimal", "none", G, B]
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
        placeholder: D()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: D()
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
        decoration: [...he(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [J, "from-font", "auto", G, fr]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: D()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [J, "auto", G, B]
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
        indent: x()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", G, B]
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
        content: ["none", G, B]
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
        bg: j()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: oe()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: K()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Wt, G, B],
          radial: ["", G, B],
          conic: [Wt, G, B]
        }, sd, id]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: D()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: q()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: q()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: q()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: D()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: D()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: D()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: Q()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": Q()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": Q()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": Q()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": Q()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": Q()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": Q()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": Q()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": Q()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": Q()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": Q()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": Q()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": Q()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": Q()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": Q()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: H()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": H()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": H()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": H()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": H()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": H()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": H()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": H()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": H()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": H()
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
        "divide-y": H()
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
        border: [...he(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...he(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: D()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": D()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": D()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": D()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": D()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": D()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": D()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": D()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": D()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: D()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...he(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [J, G, B]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", J, oi, fr]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: D()
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
          f,
          Ui,
          Wi
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: D()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", d, Ui, Wi]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": D()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: H()
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
        ring: D()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [J, fr]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": D()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": H()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": D()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", p, Ui, Wi]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": D()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [J, G, B]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [..._e(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": _e()
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
        "mask-linear": [J]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": se()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": se()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": D()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": D()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": se()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": se()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": D()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": D()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": se()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": se()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": D()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": D()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": se()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": se()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": D()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": D()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": se()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": se()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": D()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": D()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": se()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": se()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": D()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": D()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": se()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": se()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": D()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": D()
      }],
      "mask-image-radial": [{
        "mask-radial": [G, B]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": se()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": se()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": D()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": D()
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
        "mask-conic": [J]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": se()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": se()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": D()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": D()
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
        mask: j()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: oe()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: K()
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
        mask: ["none", G, B]
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
          G,
          B
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: ye()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [J, G, B]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [J, G, B]
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
          l,
          Ui,
          Wi
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": D()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", J, G, B]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [J, G, B]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", J, G, B]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [J, G, B]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", J, G, B]
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
          G,
          B
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": ye()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [J, G, B]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [J, G, B]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", J, G, B]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [J, G, B]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", J, G, B]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [J, G, B]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [J, G, B]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", J, G, B]
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
        "border-spacing": x()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": x()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": x()
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", G, B]
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
        duration: [J, "initial", G, B]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", w, G, B]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [J, G, B]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", T, G, B]
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
        perspective: [h, G, B]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": _()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: Bt()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": Bt()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": Bt()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": Bt()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: Ue()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": Ue()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": Ue()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": Ue()
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
        skew: rt()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": rt()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": rt()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [G, B, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: _()
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
        translate: it()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": it()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": it()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": it()
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
        accent: D()
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
        caret: D()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", G, B]
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
        "scroll-m": x()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": x()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": x()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": x()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": x()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": x()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": x()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": x()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": x()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": x()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": x()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": x()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": x()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": x()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": x()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": x()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": x()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": x()
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
        "will-change": ["auto", "scroll", "contents", "transform", G, B]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...D()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [J, oi, fr, Xn]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...D()]
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
}, ud = /* @__PURE__ */ Yf(cd);
function qo(...n) {
  return ud(Of(n));
}
const fd = { class: "dock-title" }, dd = { class: "dock-controls" }, hd = { class: "dock-content" }, pd = {
  key: 0,
  class: "active-panel-content"
}, gd = {
  key: 1,
  class: "default-content"
}, md = {
  key: 0,
  class: "dock-tabs"
}, _d = ["onClick"], bd = /* @__PURE__ */ fn({
  __name: "FloatingDock",
  props: {
    initialPosition: { default: () => ({ x: 100, y: 100 }) },
    width: { default: 320 },
    height: { default: 240 },
    className: {}
  },
  setup(n) {
    const e = n, t = Ne(), r = pa(), i = Ne(!1), { isDragging: o, position: s } = Ef(t, {
      bounds: "body",
      inertia: !0,
      onDragStart: () => {
        r.setDragging(!0);
      },
      onDragEnd: () => {
        r.setDragging(!1), r.setPosition(s.value);
      }
    }), a = bt(() => qo(
      // Base styles
      "floating-dock",
      "fixed z-50 bg-card border border-border rounded-lg shadow-xl",
      "backdrop-blur-md bg-opacity-95",
      "select-none overflow-hidden",
      // Size styles
      "min-w-64 min-h-48",
      // Animation states
      {
        "dock--dragging": o.value,
        "dock--hovered": i.value,
        "dock--active": r.visiblePanels.length > 0
      },
      // Custom classes
      e.className
    ));
    function c() {
      i.value = !0;
    }
    function u() {
      i.value = !1;
    }
    function f(d) {
      d.preventDefault();
    }
    return dn(() => {
      t.value && r.setPosition(e.initialPosition);
    }), (d, p) => wt(r).isVisible ? (ke(), we("div", {
      key: 0,
      ref_key: "dockElement",
      ref: t,
      class: ki(a.value),
      onMouseenter: c,
      onMouseleave: u
    }, [
      te("div", {
        class: "dock-header",
        onMousedown: f
      }, [
        te("div", fd, [
          St(d.$slots, "title", {}, () => [
            p[1] || (p[1] = To("Floating Dock", -1))
          ], !0)
        ]),
        te("div", dd, [
          te("button", {
            class: "dock-control-btn",
            onClick: p[0] || (p[0] = //@ts-ignore
            (...l) => wt(r).toggleVisibility && wt(r).toggleVisibility(...l)),
            "aria-label": "Minimize dock"
          }, p[2] || (p[2] = [
            te("svg", {
              width: "12",
              height: "12",
              viewBox: "0 0 12 12",
              fill: "none"
            }, [
              te("path", {
                d: "M2 6h8",
                stroke: "currentColor",
                "stroke-width": "1.5",
                "stroke-linecap": "round"
              })
            ], -1)
          ]))
        ])
      ], 32),
      te("div", hd, [
        wt(r).activePanelData ? (ke(), we("div", pd, [
          St(d.$slots, "panel", {
            panel: wt(r).activePanelData,
            isActive: !0
          }, void 0, !0)
        ])) : (ke(), we("div", gd, [
          St(d.$slots, "default", {}, () => [
            p[3] || (p[3] = te("p", { class: "text-muted-foreground text-sm" }, "No active panels", -1))
          ], !0)
        ]))
      ]),
      wt(r).visiblePanels.length > 0 ? (ke(), we("div", md, [
        (ke(!0), we(Qs, null, Ks(wt(r).visiblePanels, (l) => (ke(), we("button", {
          key: l.id,
          class: ki([
            "dock-tab",
            { "dock-tab--active": l.id === wt(r).activePanel }
          ]),
          onClick: (g) => wt(r).setActivePanel(l.id)
        }, hr(l.title), 11, _d))), 128))
      ])) : Mt("", !0),
      p[4] || (p[4] = te("div", { class: "dock-resize-handle" }, null, -1))
    ], 34)) : Mt("", !0);
  }
}), Qo = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [r, i] of e)
    t[r] = i;
  return t;
}, Bd = /* @__PURE__ */ Qo(bd, [["__scopeId", "data-v-1ceb837b"]]), yd = ["data-panel-id"], vd = {
  key: 0,
  class: "panel-header"
}, xd = { class: "panel-title" }, wd = { class: "panel-actions" }, kd = { class: "panel-content" }, Td = {
  key: 1,
  class: "panel-footer"
}, Pd = /* @__PURE__ */ fn({
  __name: "DockPanel",
  props: {
    id: {},
    title: {},
    showHeader: { type: Boolean, default: !0 },
    minimizable: { type: Boolean, default: !0 },
    closable: { type: Boolean, default: !0 },
    autoRegister: { type: Boolean, default: !0 },
    className: {}
  },
  emits: ["minimize", "close", "activate"],
  setup(n, { emit: e }) {
    const t = n, r = e, i = pa(), o = bt(() => qo(
      "dock-panel",
      "h-full flex flex-col",
      "bg-background border border-border/50 rounded-md",
      "shadow-sm",
      t.className
    ));
    function s() {
      i.minimizePanel(t.id), r("minimize", t.id);
    }
    function a() {
      i.removePanel(t.id), r("close", t.id);
    }
    return dn(() => {
      t.autoRegister && i.addPanel({
        id: t.id,
        title: t.title
      });
    }), (c, u) => (ke(), we("div", {
      class: ki(o.value),
      "data-panel-id": c.id
    }, [
      c.showHeader ? (ke(), we("div", vd, [
        te("div", xd, [
          St(c.$slots, "title", {}, () => [
            To(hr(c.title), 1)
          ], !0)
        ]),
        te("div", wd, [
          St(c.$slots, "actions", {}, () => [
            c.minimizable ? (ke(), we("button", {
              key: 0,
              class: "panel-action-btn",
              onClick: s,
              "aria-label": "Minimize panel"
            }, u[0] || (u[0] = [
              te("svg", {
                width: "10",
                height: "10",
                viewBox: "0 0 10 10",
                fill: "none"
              }, [
                te("path", {
                  d: "M1 5h8",
                  stroke: "currentColor",
                  "stroke-width": "1.5",
                  "stroke-linecap": "round"
                })
              ], -1)
            ]))) : Mt("", !0),
            c.closable ? (ke(), we("button", {
              key: 1,
              class: "panel-action-btn",
              onClick: a,
              "aria-label": "Close panel"
            }, u[1] || (u[1] = [
              te("svg", {
                width: "10",
                height: "10",
                viewBox: "0 0 10 10",
                fill: "none"
              }, [
                te("path", {
                  d: "m1 1 8 8M9 1l-8 8",
                  stroke: "currentColor",
                  "stroke-width": "1.5",
                  "stroke-linecap": "round"
                })
              ], -1)
            ]))) : Mt("", !0)
          ], !0)
        ])
      ])) : Mt("", !0),
      te("div", kd, [
        St(c.$slots, "default", {}, void 0, !0)
      ]),
      c.$slots.footer ? (ke(), we("div", Td, [
        St(c.$slots, "footer", {}, void 0, !0)
      ])) : Mt("", !0)
    ], 10, yd));
  }
}), Gd = /* @__PURE__ */ Qo(Pd, [["__scopeId", "data-v-9de76220"]]), Sd = { class: "timeline-header" }, Md = { class: "timeline-title" }, Cd = { class: "timeline-info" }, Ed = { class: "current-value" }, Od = { class: "timeline-range" }, Dd = {
  key: 0,
  class: "timeline-markers"
}, Ad = ["title"], Rd = {
  key: 0,
  class: "marker-label"
}, zd = {
  key: 0,
  class: "timeline-controls"
}, Nd = ["aria-label"], Ld = {
  key: 0,
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none"
}, Id = {
  key: 1,
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none"
}, $d = /* @__PURE__ */ fn({
  __name: "TimelineSlider",
  props: {
    modelValue: {},
    min: { default: 0 },
    max: { default: 100 },
    step: { default: 1 },
    showMarkers: { type: Boolean, default: !1 },
    markers: { default: () => [] },
    showControls: { type: Boolean, default: !0 },
    autoPlay: { type: Boolean, default: !1 },
    playbackSpeed: { default: 1 },
    formatValue: { type: Function, default: (n) => n.toString() },
    className: {}
  },
  emits: ["update:modelValue", "play", "pause", "reset", "scrub"],
  setup(n, { emit: e }) {
    const t = n, r = e, i = Ne(), o = Ne(), s = Ne(!1), a = Ne(!1), c = Ne(t.autoPlay), u = Ne(null);
    let f = null;
    const d = bt(() => qo(
      "timeline-slider",
      "w-full select-none",
      t.className
    )), p = bt(() => {
      const P = t.max - t.min;
      return (t.modelValue - t.min) / P * 100;
    }), l = bt(() => t.formatValue(t.modelValue)), g = bt(() => t.markers.map((P) => ({
      ...P,
      position: Math.max(0, Math.min(100, P.position))
    })));
    function h(P) {
      if (!i.value || s.value) return;
      const E = i.value.getBoundingClientRect(), M = (P.clientX - E.left) / E.width * 100, A = t.min + M / 100 * (t.max - t.min), C = Math.round(A / t.step) * t.step;
      k(Math.max(t.min, Math.min(t.max, C))), r("scrub", C);
    }
    function b(P) {
      a.value = !0, T(P);
    }
    function w() {
      a.value = !1, u.value = null;
    }
    function T(P) {
      if (!i.value) return;
      const E = i.value.getBoundingClientRect(), M = (P.clientX - E.left) / E.width * 100, A = t.min + M / 100 * (t.max - t.min);
      u.value = {
        percentage: Math.max(0, Math.min(100, M)),
        value: Math.round(A / t.step) * t.step
      };
    }
    function O(P) {
      P.preventDefault(), s.value = !0, o.value && Pt.to(o.value, {
        scale: 1.2,
        duration: 0.2,
        ease: "power2.out"
      });
      const E = (A) => {
        if (!i.value) return;
        const C = i.value.getBoundingClientRect(), L = (A.clientX - C.left) / C.width * 100, I = t.min + L / 100 * (t.max - t.min), R = Math.round(I / t.step) * t.step;
        k(Math.max(t.min, Math.min(t.max, R))), r("scrub", R);
      }, M = () => {
        s.value = !1, o.value && Pt.to(o.value, {
          scale: 1,
          duration: 0.3,
          ease: "elastic.out(1, 0.5)"
        }), document.removeEventListener("mousemove", E), document.removeEventListener("mouseup", M);
      };
      document.addEventListener("mousemove", E), document.addEventListener("mouseup", M);
    }
    function k(P) {
      r("update:modelValue", P);
    }
    function _() {
      c.value ? v() : y();
    }
    function y() {
      f && f.kill(), c.value = !0, r("play");
      const P = (t.max - t.modelValue) / t.playbackSpeed;
      f = Pt.to({ value: t.modelValue }, {
        value: t.max,
        duration: P,
        ease: "none",
        onUpdate: function() {
          k(this.targets()[0].value);
        },
        onComplete: () => {
          c.value = !1;
        }
      });
    }
    function v() {
      f && f.pause(), c.value = !1, r("pause");
    }
    function x() {
      f && f.kill(), c.value = !1, k(t.min), r("reset");
    }
    return dn(() => {
      i.value && i.value.addEventListener("mousemove", T);
    }), qs(() => {
      f && f.kill();
    }), (P, E) => (ke(), we("div", {
      class: ki(d.value)
    }, [
      te("div", Sd, [
        te("div", Md, [
          St(P.$slots, "title", {}, () => [
            E[0] || (E[0] = To("Timeline", -1))
          ], !0)
        ]),
        te("div", Cd, [
          te("span", Ed, hr(l.value), 1),
          te("span", Od, hr(P.min) + " - " + hr(P.max), 1)
        ])
      ]),
      te("div", {
        class: "timeline-container",
        onClick: h
      }, [
        te("div", {
          ref_key: "trackElement",
          ref: i,
          class: "timeline-track",
          onMouseenter: b,
          onMouseleave: w
        }, [
          te("div", {
            class: "timeline-progress",
            style: Vi({ width: `${p.value}%` })
          }, null, 4),
          te("div", {
            ref_key: "handleElement",
            ref: o,
            class: "timeline-handle",
            style: Vi({ left: `${p.value}%` }),
            onMousedown: O
          }, E[1] || (E[1] = [
            te("div", { class: "handle-core" }, null, -1),
            te("div", { class: "handle-ripple" }, null, -1)
          ]), 36),
          P.showMarkers ? (ke(), we("div", Dd, [
            (ke(!0), we(Qs, null, Ks(g.value, (M) => (ke(), we("div", {
              key: M.id,
              class: "timeline-marker",
              style: Vi({ left: `${M.position}%` }),
              title: M.label
            }, [
              E[2] || (E[2] = te("div", { class: "marker-dot" }, null, -1)),
              M.showLabel ? (ke(), we("div", Rd, hr(M.label), 1)) : Mt("", !0)
            ], 12, Ad))), 128))
          ])) : Mt("", !0),
          a.value && u.value ? (ke(), we("div", {
            key: 1,
            class: "timeline-preview",
            style: Vi({ left: `${u.value.percentage}%` })
          }, hr(u.value.value), 5)) : Mt("", !0)
        ], 544)
      ]),
      P.showControls ? (ke(), we("div", zd, [
        te("button", {
          class: "timeline-control-btn",
          onClick: _,
          "aria-label": c.value ? "Pause" : "Play"
        }, [
          c.value ? (ke(), we("svg", Id, E[4] || (E[4] = [
            te("rect", {
              x: "3",
              y: "2",
              width: "2",
              height: "8",
              fill: "currentColor"
            }, null, -1),
            te("rect", {
              x: "7",
              y: "2",
              width: "2",
              height: "8",
              fill: "currentColor"
            }, null, -1)
          ]))) : (ke(), we("svg", Ld, E[3] || (E[3] = [
            te("path", {
              d: "M3 2v8l6-4-6-4z",
              fill: "currentColor"
            }, null, -1)
          ])))
        ], 8, Nd),
        te("button", {
          class: "timeline-control-btn",
          onClick: x,
          "aria-label": "Reset to start"
        }, E[5] || (E[5] = [
          te("svg", {
            width: "12",
            height: "12",
            viewBox: "0 0 12 12",
            fill: "none"
          }, [
            te("path", {
              d: "M2 2v8M3 6l6-4v8l-6-4z",
              fill: "currentColor"
            })
          ], -1)
        ])),
        St(P.$slots, "controls", {}, void 0, !0)
      ])) : Mt("", !0)
    ], 2));
  }
}), Xd = /* @__PURE__ */ Qo($d, [["__scopeId", "data-v-41cd5463"]]);
export {
  Fd as Button,
  Gd as DockPanel,
  Bd as FloatingDock,
  Xd as TimelineSlider,
  Fc as buttonVariants,
  qo as cn,
  pa as useDockStore,
  Ef as useDraggable
};

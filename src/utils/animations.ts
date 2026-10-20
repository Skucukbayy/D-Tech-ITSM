import gsap from 'gsap';

// Cached last geometry to calculate squashing delta
const lensCache = new WeakMap<HTMLElement, [number, number, number, number]>();

/**
 * Exact squish & stretch elastic lens transition from Pane (Vc function)
 */
export function animateLens(
  lens: HTMLElement | null,
  container: HTMLElement | null,
  target: HTMLElement | null,
  axis: 'x' | 'y' = 'y',
  radius: number = 999
) {
  if (!lens || !container || !target || !target.offsetWidth) return;

  const s = target.offsetLeft;
  const c = target.offsetTop;
  const l = target.offsetWidth;
  const u = target.offsetHeight;

  const last = lensCache.get(lens);
  lensCache.set(lens, [s, c, l, u]);

  gsap.killTweensOf(lens);

  Object.assign(lens.style, {
    width: `${l}px`,
    height: `${u}px`,
    borderRadius: `${radius >= 999 ? Math.min(l, u) / 2 : radius}px`,
  });

  // If first paint or container was hidden, just snap without animation
  if (!last || gsap.getProperty(lens, 'opacity') === 0) {
    gsap.set(lens, {
      x: s,
      y: c,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      transformOrigin: '50% 50%'
    });
    return;
  }

  const [f, p, m, h] = last;
  if (f === s && p === c && m === l && h === u) {
    gsap.set(lens, { x: s, y: c, scaleX: 1, scaleY: 1, opacity: 1 });
    return;
  }

  const g = f + m / 2 - l / 2;
  const _ = p + h / 2 - u / 2;
  const v = axis === 'x' ? Math.abs(s - f) / l : Math.abs(c - p) / u;
  const y = Math.min(0.5, 0.16 + v * 0.14);
  const [b, x] = [m / l, h / u];

  const S = axis === 'x'
    ? { scaleX: b * (1 + y), scaleY: x * (1 - y * 0.45) }
    : { scaleX: b * (1 - y * 0.45), scaleY: x * (1 + y) };

  gsap.set(lens, { opacity: 1, transformOrigin: '50% 50%' });

  // Spring translation
  gsap.fromTo(
    lens,
    { x: g, y: _ },
    { x: s, y: c, duration: 0.62, ease: 'back.out(1.35)' }
  );

  // Elastic squashing & stretching
  gsap.fromTo(
    lens,
    { scaleX: b, scaleY: x },
    {
      keyframes: [
        { ...S, duration: 0.16, ease: 'power2.out' },
        { scaleX: 1, scaleY: 1, duration: 0.85, ease: 'elastic.out(1.1, 0.38)' }
      ]
    }
  );
}

/**
 * Segmented control squishy pill animation
 */
export function animateSegPill(pill: HTMLElement | null, container: HTMLElement | null, activeBtn: HTMLElement | null) {
  if (!pill || !container || !activeBtn) return;
  animateLens(pill, container, activeBtn, 'x', 999);
}

/**
 * Exact page view entry timeline from Pane (zc, lo, po)
 */
export function animateViewEnter(container: HTMLElement | null) {
  if (!container) return;

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(container, { clearProps: 'all' });
    }
  });

  // 1. Header lead title
  const title = container.querySelector('.head__title');
  if (title) {
    tl.fromTo(
      title,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'transform,opacity' },
      0
    );
  }

  // 2. Subtitle & actions
  const subAndActions = container.querySelectorAll('.head__sub, .head__actions > *');
  if (subAndActions.length) {
    tl.fromTo(
      subAndActions,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.04, clearProps: 'transform,opacity' },
      0.05
    );
  }

  // 3. Header stat pills
  const stats = container.querySelectorAll('.head__stats .stat');
  if (stats.length) {
    tl.fromTo(
      stats,
      { opacity: 0, y: 12, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.2)', stagger: 0.04, clearProps: 'transform,opacity' },
      0.08
    );
  }

  // 4. Cards entry
  const cards = container.querySelectorAll('.card');
  if (cards.length) {
    tl.fromTo(
      cards,
      { opacity: 0, y: 18, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out', stagger: 0.04, clearProps: 'transform,opacity' },
      0.1
    );
  }

  return tl;
}

/**
 * Concentric Progress Rings Sweep Animation
 */
export function animateRings(
  svgEl: SVGSVGElement | null,
  values: { tasks: number; focus: number; meet: number } = { tasks: 0.964, focus: 0.986, meet: 1.0 }
) {
  if (!svgEl) return;

  const ringsConfig = [
    { key: 'tasks', r: 56, circumference: 2 * Math.PI * 56, val: values.tasks },
    { key: 'focus', r: 41, circumference: 2 * Math.PI * 41, val: values.focus },
    { key: 'meet', r: 26, circumference: 2 * Math.PI * 26, val: values.meet },
  ];

  ringsConfig.forEach((cfg, idx) => {
    const arc = svgEl.querySelector(`.rings__arc.rings--${cfg.key}`) as SVGElement;
    if (arc) {
      const targetOffset = cfg.circumference * (1 - cfg.val);
      gsap.fromTo(
        arc,
        { strokeDashoffset: cfg.circumference, strokeDasharray: cfg.circumference },
        {
          strokeDashoffset: targetOffset,
          duration: 1.4,
          delay: 0.2 + idx * 0.1,
          ease: 'power3.inOut'
        }
      );
    }
  });
}

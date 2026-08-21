(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const workStyle = document.createElement('style');
  workStyle.id = 'project-work-hover';
  workStyle.textContent = `
    .work-item {
      position: relative;
      overflow: hidden;
      min-height: 138px;
      cursor: pointer;
      transition: background .3s ease, min-height .55s cubic-bezier(.22,1,.36,1);
    }
    .work-item:hover {
      min-height: 245px;
      z-index: 2;
    }
    .work-item .label,
    .work-item .desc {
      opacity: 0;
      max-height: 0;
      transform: translateY(-8px);
      overflow: hidden;
      transition: opacity .4s ease, max-height .55s cubic-bezier(.22,1,.36,1), transform .45s cubic-bezier(.22,1,.36,1);
    }
    .work-item .label {
      margin-bottom: 0;
    }
    .work-item .desc {
      margin-top: 18px;
      padding-top: 14px;
      border-top: 1px solid var(--line);
    }
    .work-item:hover .label,
    .work-item:hover .desc {
      opacity: .82;
      max-height: 180px;
      transform: translateY(0);
    }
    @media(max-width:700px){
      .work-item:hover {
        min-height: 138px;
      }
      .work-item {
        cursor: default;
      }
      .work-item .label,
      .work-item .desc {
        opacity: .82;
        max-height: none;
        transform: none;
      }
    }
    @media(prefers-reduced-motion:reduce){
      .work-item,
      .work-item .label,
      .work-item .desc {
        transition: none;
      }
    }
  `;
  document.head.appendChild(workStyle);

  const metrics = [...new Set(document.querySelectorAll('.stat-card .num, .stat-number, .stats .stat > strong, .stats .stat > .num'))];

  const parseMetric = (value) => {
    const match = value.trim().match(/^([^0-9]*)([0-9][0-9,.]*)(.*)$/);
    if (!match) return null;
    const numeric = match[2];
    return {
      original: value.trim(),
      prefix: match[1],
      target: Number.parseFloat(numeric.replace(/,/g, '')),
      suffix: match[3],
      decimals: numeric.includes('.') ? numeric.split('.')[1].length : 0,
      commas: numeric.includes(','),
    };
  };

  const formatMetric = (metric, value) => {
    if (metric.decimals) return `${metric.prefix}${value.toFixed(metric.decimals)}${metric.suffix}`;
    const whole = Math.round(value);
    return `${metric.prefix}${metric.commas ? whole.toLocaleString() : whole}${metric.suffix}`;
  };

  const animateMetric = (element) => {
    const metric = parseMetric(element.textContent);
    if (!metric || element.dataset.counted) return;
    element.dataset.counted = 'true';

    if (reduceMotion) {
      element.textContent = metric.original;
      return;
    }

    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = progress === 1
        ? metric.original
        : formatMetric(metric, metric.target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (!metrics.length) return;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    metrics.forEach(animateMetric);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateMetric(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  metrics.forEach((metric) => observer.observe(metric));
})();

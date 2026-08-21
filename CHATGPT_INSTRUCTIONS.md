# ChatGPT: Case Study Page Generator

## Task
Generate 4 clean, consistent HTML case study pages using the provided template and data.

---

## Files You Need

1. **casestody.html** (template structure - use this as your base)
2. **case-study-data.json** (all 4 projects' content)
3. **This instruction file**

---

## What to Do

### For EACH of the 4 projects (buzzandbloom, tropibite, greywithsign, upwork):

1. **Start with casestody.html as the skeleton**
   - Copy the entire HTML structure
   - Keep all CSS, fonts, animations, script includes
   - Do NOT modify the structure or class names

2. **Replace ONLY the content values:**
   - `<title>` → from data: `title`
   - `<meta name="description">` → from data: `meta_description`
   - `--brand` CSS variable → from data: `brand_color`
   - Hero section (h1, role, lede) → from data: `hero`
   - Stats cards → from data: `stats`
   - "The Brief" section → from data: `brief`
   - Work items grid → from data: `work_section.items`
   - Callout/Strategy box → from data: `work_section.callout`
   - "The Outcome" section → from data: `outcome`
   - Navigation links (prev/next) → from data: `nav`

3. **Naming convention:**
   - File name MUST be exactly as in data: `data.filename`
   - Example: `buzzandbloom.html`, `tropibite.html`, etc.

---

## Template Structure Reference

Here's what each section looks like in casestody.html (use this exact structure):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>{{TITLE}}</title>
  <meta name="description" content="{{META_DESCRIPTION}}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root{
      --ink:#141210;
      --paper:#F1EEE5;
      --brand:{{BRAND_COLOR}};
      --line:rgba(20,18,16,.16);
      --maxw:1180px
    }
    /* Rest of CSS stays identical */
  </style>
</head>
<body>
  <header class="site">
    <div class="nav">
      <a href="index.html" class="mark">JEFFREY<span>.</span>ASSAVEDO</a>
      <a href="index.html#experience" class="back">← Back to portfolio</a>
    </div>
  </header>
  <main>
    <!-- HERO SECTION -->
    <section class="hero">
      <div class="wrap">
        <h1>{{HERO.H1}}</h1>
        <p class="role">{{HERO.ROLE}}</p>
        <p class="lede">{{HERO.LEDE}}</p>
      </div>
    </section>

    <!-- STATS SECTION -->
    <section class="stats">
      <div class="wrap">
        <div class="stats-grid reveal">
          {{FOR EACH STAT}}
          <div class="stat-card">
            <div class="num">{{STAT.NUM}}</div>
            <div class="label">{{STAT.LABEL}}</div>
          </div>
          {{END FOR}}
        </div>
      </div>
    </section>

    <!-- THE BRIEF SECTION -->
    <section>
      <div class="wrap">
        <div class="section-intro">
          <div>
            <h2>The Brief</h2>
            <p>{{BRIEF.INTRO}}</p>
            <p>{{BRIEF.DETAILS}}</p>
          </div>
          <div>
            {{FOR EACH ITEM IN BRIEF.DETAILS_COLUMN}}
            <p>{{ITEM}}</p>
            {{END FOR}}
          </div>
        </div>
      </div>
    </section>

    <!-- WHAT I WORKED ON SECTION -->
    <section>
      <div class="wrap">
        <h2 style="font-size:clamp(32px,5vw,56px);margin-bottom:32px">What I Worked On</h2>
        <div class="work-grid">
          {{FOR EACH WORK ITEM}}
          <div class="work-item">
            <div class="label">{{ITEM.LABEL}}</div>
            <h3>{{ITEM.H3}}</h3>
            <p class="desc">{{ITEM.DESC}}</p>
          </div>
          {{END FOR}}
        </div>
        <div class="callout">
          <p><strong>Approach:</strong> {{WORK_SECTION.CALLOUT}}</p>
        </div>
      </div>
    </section>

    <!-- THE OUTCOME SECTION -->
    <section>
      <div class="wrap">
        <div class="section-intro">
          <div>
            <h2>{{OUTCOME.H2}}</h2>
            <p>{{OUTCOME.TEXT}}</p>
          </div>
        </div>
        <div class="case-nav">
          <a href="{{NAV.PREV_LINK}}">
            <span>{{NAV.PREV_LABEL}}</span>
            <span class="title">{{NAV.PREV_TITLE}}</span>
          </a>
          <a href="{{NAV.NEXT_LINK}}" style="text-align:right">
            <span>{{NAV.NEXT_LABEL}}</span>
            <span class="title">{{NAV.NEXT_TITLE}}</span>
          </a>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <span>© 2026 Jeffrey Assavedo</span>
    <span>Accra, Ghana</span>
  </footer>

  <script>
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(el=>io.observe(el));
  </script>

  <script id="portfolio-polish-js">(()=>{const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const g=e.target;if(g.matches('.work-grid'))g.classList.add('polished-in');if(g.matches('.stats-grid,.stats'))g.querySelectorAll('.stat strong,.stat .num').forEach(el=>{const raw=el.textContent.trim();const m=raw.match(/^([+$]?)([0-9,.]+)(.*)$/);if(!m||reduce)return;const target=parseFloat(m[2].replace(/,/g,''));if(!isFinite(target))return;const suffix=m[3],prefix=m[1],start=performance.now(),dur=1400;function tick(t){const p=Math.min(1,(t-start)/dur),v=target*(1-Math.pow(1-p,3));el.textContent=prefix+(target>=100?Math.round(v).toLocaleString():v.toFixed(target%1?1:0))+suffix;if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick)});io.unobserve(g)},{threshold:.12});document.querySelectorAll('.work-grid,.stats-grid,.stats').forEach(x=>io.observe(x));if(!reduce)addEventListener('scroll',()=>{document.querySelectorAll('.hero').forEach(h=>{const r=h.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)h.style.setProperty('--hero-shift',((innerHeight-r.top)*-.018)+'px')})},{passive:true})})();</script>
</body>
</html>
```

---

## Critical Rules

✅ **DO:**
- Keep all CSS exactly as-is
- Keep all script tags unchanged
- Keep all class names (`work-grid`, `work-item`, `reveal`, `stat-card`, etc.)
- Keep the header/footer structure
- Use the exact data values from case-study-data.json
- Keep formatting consistent with existing pages

❌ **DON'T:**
- Change HTML structure or class names
- Modify CSS or animations
- Rename elements
- Add new sections not in the template
- Minify or compress the output
- Remove any scripts

---

## Output Checklist

For each generated file, verify:
- [ ] Filename matches data.filename exactly
- [ ] Title is in `<title>` tag
- [ ] Meta description is present
- [ ] Brand color is in :root --brand variable
- [ ] All 3 stats cards are present with correct numbers/labels
- [ ] Work grid has correct number of items (usually 4)
- [ ] All animations/scripts are intact
- [ ] Navigation links point to correct next/prev pages
- [ ] File is readable (not minified)
- [ ] No CSS or structure changes from template

---

## Delivery

When done, provide:
1. **buzzandbloom.html** (complete, ready to use)
2. **tropibite.html** (complete, ready to use)
3. **greywithsign.html** (complete, ready to use)
4. **upwork.html** (complete, ready to use)

That's it. I'll handle verification and pushing to GitHub.

---

## Questions?

If anything is unclear, ask before generating. Better to clarify than regenerate.

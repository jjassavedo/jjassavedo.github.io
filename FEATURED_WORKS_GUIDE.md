# Featured Works Gallery — How to Add Your Content

The Featured Works section is now live on your main page (before Tools section).

**Location on page:** Between Experience (case studies) and Tools
**Navigation:** Click "Featured" in the top menu

---

## HOW TO ADD CONTENT

### TYPE 1: Static Image (Flyer, Design, Screenshot)

```html
<div class="featured-item">
  <img src="flyer-1.jpg" alt="Description of flyer">
  <p class="featured-caption">Flyer name or project</p>
</div>
```

**Steps:**
1. Save your flyer/image as .jpg or .png
2. Upload to portfolio folder (same level as index.html)
3. Add this code in the `.featured-grid` section
4. Change `flyer-1.jpg` to your actual filename
5. Change caption text

**Example:**
```html
<div class="featured-item">
  <img src="buzz-bloom-flyer.jpg" alt="Buzz & Bloom campaign flyer">
  <p class="featured-caption">Buzz & Bloom · Campaign Flyer</p>
</div>
```

---

### TYPE 2: Multiple Gallery Images

```html
<div class="featured-item">
  <img src="image-1.jpg" alt="Design piece">
  <p class="featured-caption">Project name</p>
</div>

<div class="featured-item">
  <img src="image-2.jpg" alt="Design piece">
  <p class="featured-caption">Project name</p>
</div>

<div class="featured-item">
  <img src="image-3.jpg" alt="Design piece">
  <p class="featured-caption">Project name</p>
</div>
```

---

### TYPE 3: Embedded Video (Instagram Reel, YouTube, etc.)

**Instagram Reel:**
```html
<div class="featured-item">
  <iframe src="https://www.instagram.com/p/XXXXX/embed" width="100%" style="aspect-ratio:4/3;border:2px solid var(--line)"></iframe>
  <p class="featured-caption">Reel name or project</p>
</div>
```

**YouTube Video:**
```html
<div class="featured-item">
  <iframe width="100%" style="aspect-ratio:4/3" src="https://www.youtube.com/embed/VIDEO_ID" title="Video title"></iframe>
  <p class="featured-caption">Video name</p>
</div>
```

**Local Video File (MP4):**
```html
<div class="featured-item">
  <video style="width:100%;height:auto;border:2px solid var(--line)" controls>
    <source src="video.mp4" type="video/mp4">
  </video>
  <p class="featured-caption">Video name</p>
</div>
```

---

## CURRENT PLACEHOLDER

Your section currently has one placeholder:

```html
<div class="featured-item">
  <div class="featured-placeholder">Add image/flyer/video</div>
  <p class="featured-caption">Project name or description</p>
</div>
```

**Replace this with your actual content.**

---

## STYLING INFO

The gallery uses:
- **Responsive grid:** Automatically adjusts from 1 column (mobile) to 3+ columns (desktop)
- **Hover effects:** Items scale up, border changes to green (signal color)
- **Aspect ratio:** 4:3 (landscape) for consistency
- **Caption:** Small text below each item for context

**CSS class reference:**
- `.featured-grid` — Container for all items
- `.featured-item` — Individual gallery item
- `.featured-placeholder` — Gray placeholder box (replace with `<img>` or `<video>`)
- `.featured-caption` — Text label below item

---

## EXAMPLE COMPLETE SECTION

Here's what the full section might look like with your content:

```html
<section id="featured">
<div class="wrap">
<div class="section-head reveal">
<h2>Featured Work</h2>
<span class="eyebrow">03</span>
</div>
<div class="featured-grid reveal">

<!-- Flyer 1 -->
<div class="featured-item">
  <img src="campaign-flyer-01.jpg" alt="Q1 Campaign Flyer">
  <p class="featured-caption">Q1 Campaign · Flyer Design</p>
</div>

<!-- Flyer 2 -->
<div class="featured-item">
  <img src="product-launch-flyer.jpg" alt="Product Launch Flyer">
  <p class="featured-caption">Product Launch · Promotional Flyer</p>
</div>

<!-- Edited Image -->
<div class="featured-item">
  <img src="edited-photography-01.jpg" alt="Edited product photography">
  <p class="featured-caption">Product Photography · Edited</p>
</div>

<!-- Instagram Reel (Buzz & Bloom) -->
<div class="featured-item">
  <iframe src="https://www.instagram.com/p/ABC123/embed" width="100%" style="aspect-ratio:4/3;border:2px solid var(--line)"></iframe>
  <p class="featured-caption">Buzz & Bloom · Reel</p>
</div>

<!-- Edited Image 2 -->
<div class="featured-item">
  <img src="edited-photography-02.jpg" alt="Edited product photography">
  <p class="featured-caption">TropiBite · Product Photography</p>
</div>

<!-- Flyer 3 -->
<div class="featured-item">
  <img src="seasonal-promotion-flyer.jpg" alt="Seasonal promotion flyer">
  <p class="featured-caption">Seasonal Promo · Flyer</p>
</div>

</div>
</div>
</section>
```

---

## QUICK CHECKLIST

- [ ] Upload your flyer images to portfolio folder
- [ ] Upload your edited images to portfolio folder
- [ ] Have Instagram Reel URLs ready (for embeds)
- [ ] Copy the image filenames exactly
- [ ] Replace placeholder code with your content
- [ ] Update captions with project names
- [ ] Test on desktop and mobile
- [ ] Git push to GitHub

---

## NEXT STEPS

1. **Prepare your files:**
   - Gather all flyers (save as .jpg/.png)
   - Gather edited images
   - Note Instagram Reel URLs

2. **Upload to portfolio folder**

3. **Send me the list:**
   - Flyer filenames + captions
   - Image filenames + captions
   - Reel URLs (if embedding)

4. **I'll add them to the HTML**

---

**Ready? Upload your files and let me know what goes where!** 🎨

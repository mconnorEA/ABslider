# Integrating AB Slider into Coda

## Option 1: Host & Embed (Easiest) ⭐

### Step 1: Host your slider
1. Upload `slider.html` and the `images/` folder to a web host:
   - **GitHub Pages**: Push to GitHub, enable Pages in repo settings
   - **Netlify**: Drag & drop your folder at netlify.com
   - **Vercel**: Connect your repo and deploy

### Step 2: Embed in Coda
1. In your Coda doc, type `/embed`
2. Paste your URL with parameters:
   ```
   https://your-domain.com/slider.html?before=images/before.png&after=images/after.png
   ```
3. Resize the embed to your desired dimensions

**Example URLs:**
- GitHub Pages: `https://username.github.io/ABslider/slider.html?before=images/wallprobe_before__0.0.png&after=images/wallprobe_after__0.5.png`
- Netlify: `https://your-site.netlify.app/slider.html?before=...&after=...`

---

## Option 2: Custom Coda Pack (Advanced)

If you want a native Coda formula like `=ABSlider("before.png", "after.png")`:

### Setup
1. Install Coda Pack SDK:
   ```bash
   npm install -g @codahq/packs-sdk
   ```

2. Create a new pack:
   ```bash
   coda init my-ab-slider-pack
   cd my-ab-slider-pack
   ```

3. Replace the contents of `pack.ts` with `coda-pack-example.ts` (included in this repo)

4. Upload your pack:
   ```bash
   coda auth
   coda upload
   ```

### Usage in Coda
Once your pack is installed:
```
=ABSlider(
  "https://example.com/images/before.png", 
  "https://example.com/images/after.png",
  400  // height in pixels (optional)
)
```

---

## Option 3: Quick Test with Data URI (No Hosting Required)

For small images, you can embed directly in Coda using the Embed pack:

1. Convert your HTML to a data URI using a tool like https://www.base64encode.org/
2. Use `/embed` and paste: `data:text/html;base64,<your-encoded-html>`

**Limitations:** 
- Coda may have size limits on data URIs
- Images must also be data URIs or publicly accessible URLs

---

## Recommended Approach

**For most users:** Go with **Option 1** (Host & Embed)
- No coding required
- Easy to update images
- Works with any image hosting
- Can reuse across multiple Coda pages

**For power users:** Use **Option 2** (Custom Pack)
- Native Coda formula experience
- Can pull images from Coda tables
- More control over appearance

---

## Hosting Image Files

Your images need to be publicly accessible. Options:
1. **Same host as slider.html** (simplest)
2. **Image hosting services**: Imgur, Cloudinary, AWS S3
3. **Coda's image URLs**: Upload images to Coda, right-click → "Copy image link"

Make sure to use the full URL in your embed:
```
https://your-domain.com/slider.html?before=https://i.imgur.com/xxx.png&after=https://i.imgur.com/yyy.png
```

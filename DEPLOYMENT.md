# 🚀 Publishing & Deployment Guide for Oru Vaati

Welcome! Your **Oru Vaati — Conscious Food Delivery** application is fully production-ready with zero faults, clean TypeScript types, full client persistence (`localStorage`), exact matching South Indian dish photography, authentic Tamil Nadu pricing, real-time simulated fast delivery with Web Audio doorbell chime, and order acknowledgement.

---

## 🌟 Method 1: Deploy with Vercel (Recommended — 100% Free & Fastest)

Vercel created Next.js, so deployment takes less than 2 minutes.

### ⚡ Option A: Via GitHub & Vercel Web Dashboard (Easiest — 1 Click & Never Hangs)

1. **Create a GitHub repository**:
   - Go to [github.com/new](https://github.com/new) and create a repository (e.g. `oru-vaati`).
2. **Push your code from PowerShell**:
   ```powershell
   git add .
   git commit -m "feat: authentic Tamil Nadu food delivery app with doorbell & conscious savings"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/oru-vaati.git
   git push -u origin main
   ```
3. **Import to Vercel**:
   - Click this direct link: **[vercel.com/new](https://vercel.com/new)**
   - Connect your GitHub account and click **Import** next to `oru-vaati`.
   - Click **Deploy**!
   - Vercel builds the app and immediately provides your live public link (e.g., `https://oru-vaati.vercel.app`) with free automated SSL.

---

### 💻 Option B: Via Terminal CLI

> **Important Note:** If you ran `npx vercel --prod` and it stayed running, it was paused waiting for interactive inputs (such as logging in or confirming prompts). Use the `--yes` flag or log in first:

```powershell
# 1. Log in to Vercel (opens your browser to authenticate)
npx vercel login

# 2. Deploy to production automatically
npx vercel --prod --yes
```

---

## 🌐 Method 2: Deploy with Netlify

1. Go to **[app.netlify.com/start](https://app.netlify.com/start)**
2. Select your GitHub repository `oru-vaati`.
3. Set Build command to `npm run build` and Publish directory to `.next`.
4. Click **Deploy Site**.

---

## 🏷️ Custom Domain (e.g., `www.yourfoodapp.in`)

1. Go to your **Vercel Project Dashboard** &rarr; **Settings** &rarr; **Domains**.
2. Type in your domain (e.g. `crave.yourbrand.com`).
3. Add the single CNAME / A DNS record given by Vercel into your registrar (GoDaddy, Namecheap, Cloudflare, etc.).
4. Your custom domain goes live with free HTTPS within 5 minutes!

---

## ✅ Quality & Pre-Flight Checks Passed

- [x] **Reasonable Tamil Nadu Prices**: Steamed Idlis ₹35-₹45, Ghee Podi Idli ₹65, Masala Dosa ₹75, Bun Parotta ₹50, Thalappakatti Biryani ₹160, Degree Coffee ₹25, Jigarthanda ₹60, Tirunelveli Halwa ₹55.
- [x] **Exact Matching Pictures**: Every single dish (Dosa, Masala Dosa, Bun Parotta, Kothu Parotta, Biryani, Meals, Filter Coffee, Halwa, Jigarthanda) has a 100% verified, delicious, matching photo.
- [x] **Fast Delivery in Minutes**: Quick simulation (~30s) or "Skip to Doorstep" shortcut.
- [x] **Doorbell Chime & Order Acknowledgment**: Audio Ding-Dong chime synthesized with Web Audio API + visual vibrating bell + "I Have Received My Order" button with star rating!
- [x] **Accurate Savings Breakdown**: Shows exact ₹ savings on each card, cart drawer, checkout, and live invoice.
- [x] **Production Build**: `next build` with Turbopack and `tsc --noEmit` pass with 0 errors.

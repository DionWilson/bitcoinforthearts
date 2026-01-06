![Bitcoin For The Arts](BITCOIN-ARTS-LOGO-Gold%20(3))

# Bitcoin-For-The-Arts

**Bitcoin For The Arts, Inc. – 501(c)(3) Nonprofit**  
*The **first** nonprofit paying artists in Bitcoin.*  
*55/30/10/5 Rule | 100% On-Chain | 100% Open-Source*

---

### **Our Mission**
> **“In the sovereign spirit of Bitcoin—uncensorable money for uncensorable minds—we ignite a self-sustaining global renaissance in art.**  
> **Through Bitcoin micro-grants, performance workshops, and live + digital productions, we back sovereign creators across visual arts, theater, dance, music, writing, storytelling, and film. We favor low time preference work—timeless craft that resists censorship and celebrates financial freedom through Bitcoin-aligned innovation. Every donation fuels direct support to creators, powers exhibitions and residencies, and plants a seed in a permanent Bitcoin reserve—building an endowment for human creativity that no institution or inflation can touch.”**

---

### **What We Do**
- **55%**Staking art on sound money
- **30%** → **workshops, residencies, co-productions** with BAM, Whitney, Carnegie  
- **10%** → **operations**  
- **5%** → **HODL Vault** (1 BTC by 2030)  

---

### **Live Treasury**
[github.com/Bitcoin-For-The-Arts/bitcoinforthearts-treasury](https://github.com/Bitcoin-For-The-Arts/bitcoinforthearts-treasury)  
- **HODL Vault:** `bc1qarts...` (3-of-5 multisig)  
- **Live Balance:** Updated hourly  
- **Grants Paid:** 0 → 750 artists by 2028  
- **Donor Leaderboard:** Public or anonymous  

**Donate BTC → `bc1qarts...`** *(tax-deductible Dec 2025)*

---

### **Donor Perks**
- **All donors:** Named in [leaderboard.csv](donors/leaderboard.csv)  
- **≥ 0.01 BTC:** Digital thank-you card  
- **≥ 1 BTC:** Name a grant + steel seed backup

---

### **The 55/30/10/5 Rule**
| **Use** | **%** | **Purpose** |
|--------|------|------------|
| Artist Grants | 55% | BTC to creators |
| Programs | 30% | Workshops, residencies, co-productions |
| Admin | 10% | Compliance & ops |
| HODL Vault | 5% | 1 BTC by 2030 |

---

### **Stacking Culture on Sound Money**
- **No fiat**  
- **No VCs**  
- **No inflation**  
- **No gatekeepers**  

---

**X:** [@Orangepillman](https://x.com/Orangepillman)  
**Email:** hello@bitcoinforthearts.org  

---

### **Homepage Intro Video (Easy Swap)**
- **Turn it on/off (Vercel env var)**:
  - default is **ON**
  - `NEXT_PUBLIC_SHOW_HOME_INTRO=0` → disable the intro video
- **Swap the video (no code changes)**:
  - Upload/replace this file: `public/BFTA-home-page.MOV`
  - Deploy (or run `npm run build`)
  - The build will automatically convert it to: `public/BFTA-home-page.mp4` for browser playback

---

### **Contact Form (Send Directly From the Website)**
The Contact page now sends email directly (no “open your email app” prompt).

#### Option A (recommended): Resend (no Zoho app password needed)
Set these **Vercel environment variables**:
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` (can start as `onboarding@resend.dev`, then switch to `hello@bitcoinforthearts.org` after you verify the domain in Resend)
- `CONTACT_TO_EMAIL` (where you want submissions delivered, usually `hello@bitcoinforthearts.org`)
- `CONTACT_FROM_EMAIL` (optional if you set `RESEND_FROM_EMAIL`)

#### Option B: SMTP (Zoho, etc.)
Set these **Vercel environment variables**:
- `CONTACT_SMTP_USER` (example: `hello@bitcoinforthearts.org`)
- `CONTACT_SMTP_PASS` (Zoho SMTP password or app password)
- `CONTACT_TO_EMAIL` (where you want submissions delivered, usually `hello@bitcoinforthearts.org`)
- `CONTACT_FROM_EMAIL` (usually same as `CONTACT_SMTP_USER`)

Optional:
- `CONTACT_SMTP_HOST` (default `smtp.zoho.com`)
- `CONTACT_SMTP_PORT` (default `465`)
- `CONTACT_SMTP_SECURE` (default `true`)
- `CONTACT_SUBJECT_PREFIX` (default `Website contact`)

---

> **“The NEA of the Bitcoin Era.”**  
> **First. Transparent. Unstoppable.**

**November 16, 2025 | 12:40 AM EST | New York, NY**

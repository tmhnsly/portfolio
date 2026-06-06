# Blog deep-dive — research notes (2026-06-06)

Source: deep-research workflow run `wf_9f89a057-5d5` (20/20 claims confirmed, 3-vote
adversarial) + local tiktoken measurement. Verified findings are high-confidence,
primary-sourced. "OPEN" items were not adversarially confirmed and were checked
directly (see bottom). Goal: rewrite both posts to *follow the evidence*.

## POST 1 — "What an AI query costs" (water/energy)

### Confirmed (primary sources)

1. **UC Riverside "Making AI Less Thirsty" is now peer-reviewed.** Li, Yang, Islam &
   Ren, *Communications of the ACM* Vol 68 Iss 7, pp 54-61, July 2025,
   DOI [10.1145/3724499](https://dl.acm.org/doi/10.1145/3724499). Supersedes the 2023
   arXiv preprint (arxiv.org/abs/2304.03271). **Cite the CACM version.**
2. **Per-response water (GPT-3):** "a 500ml bottle for roughly 10-50 medium-length
   responses" → ~10-50 ml/response. "Medium" = ≤800 words in, 150-300 words out.
   **CAVEAT (important): these are GPT-3-specific MODELED estimates from 2023, not
   measurements, and not current models.** Authors call them conservative; GPT-4 etc.
   could be "several times higher."
3. **Training water (GPT-3):** 5.4M L total, *including* 700,000 L scope-1 on-site
   (the 5.4M CONTAINS the 700k; remainder ~4.7M L is scope-2 power-gen water). The
   current post's "700k onsite, 5.4M incl. power stations" framing is CORRECT.
   Geographic sensitivity: 700k L is best-case US; ~triples (~2.1M L) in Asian DCs.
4. **Energy per query revised DOWN ~10x.** Typical short text query now ~**0.24-0.34 Wh**:
   Epoch AI ~0.3 Wh (GPT-4o, Feb 2025, self-described "pessimistic"/errs high);
   OpenAI/Altman 0.34 Wh (Jun 2025, unsourced blog); Google *measured* Gemini median
   0.24 Wh (May 2025). Supersedes the old de Vries (2023) 3 Wh figure. Post's 0.3 Wh
   is correct and well-sourced. ([Epoch](https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use))
5. **Heavy queries cost far more:** ~2.5 Wh for a 10k-token input, ~**40 Wh** for a
   100k-token input (one-time input-processing, not per-message). Reasoning models
   (o1/o3) emit ~2.5x more output tokens; GPT-5 medium response up to ~40 Wh.
   → the post's "heavy reasoning ~3 Wh" is too low; real spread is ~0.3 → ~40 Wh.
6. **WUE varies 1-9 L/kWh on-site** by site & season: Google annualized ~1 L/kWh;
   industry avg ~1.8-1.9; up to ~9 L/kWh in hot/summer. Scope-2 power gen: US avg
   ~3.1 L/kWh consumption vs ~43.8 L/kWh withdrawal; Meta 3.7 L/kWh scope-2 (2023).
   → **the grid/site drives water impact more than per-query user behaviour.**
7. **Water consumption ≠ withdrawal.** Consumption = removed from local watershed
   (evaporated/incorporated); withdrawal = all extracted incl. water returned after
   use. Consumption is the regionally-meaningful number. (SCARF, Purdue, HotCarbon'25,
   [arXiv 2506.22773](https://arxiv.org/pdf/2506.22773))
8. **STRONGEST reframe — local scarcity > global volume.** Water stress varies by
   *watershed*, not country. Same LLM workload can carry **>1000x** higher
   water-stress-*adjusted* impact in a high-stress, low-WUE site (Quincy, WA) vs a
   low-stress one. ~two-thirds of post-2022 data centres sit in water-stressed areas.
   (1000x is a stress-WEIGHTED metric (AWI), NOT raw litres — always say "stress-adjusted".)
9. **Forward projection:** global AI water *withdrawal* projected 4.2-6.6 billion m³ by
   2027 (> annual withdrawal of 4-6 Denmarks / half the UK); ~0.38-0.60 billion m³
   *consumed*. Model-based, called conservative.
10. **Google Gemini caveats (for balance):** 0.24 Wh / 0.26 mL water / 0.03 gCO2e are
    best-case. Carbon is market-based (~3x higher, ~0.09 gCO2e, under location-based).
    The 0.26 mL counts on-site water only, EXCLUDES upstream electricity water (narrower
    scope than UC Riverside). Median (not mean), excludes training, not peer-reviewed.
    ([Google PDF](https://services.google.com/fh/files/misc/measuring_the_environmental_impact_of_delivering_ai_at_google_scale.pdf),
    [MIT Tech Review](https://www.technologyreview.com/2025/08/21/1122288/google-gemini-ai-energy/))

### Context worth adding (primary, from fetch phase)
- **US data centres (LBNL 2024):** 176 TWh in 2023 = 4.4% of US electricity; projected
  325-580 TWh (6.7-12%) by 2028. Direct on-site water 66 billion L in 2023 (up from
  21.2B in 2014). ([LBNL report](https://eta-publications.lbl.gov/sites/default/files/2024-12/lbnl-2024-united-states-data-center-energy-usage-report_1.pdf))
- **AI vs water scarcity:** [MSCI](https://www.msci.com/research-and-insights/blog-post/when-ai-meets-water-scarcity-data-centers-in-a-thirsty-world).

### OPEN items — checked directly (not in adversarial set)
- **Streaming:** IEA/Kamiya 2020 corrected estimate ~0.077 kWh/hr (~36 gCO2/hr); split
  ~72% end-user device / 23% network / **5% data centre**; per-hour spans a factor of
  ~32 (0.037-1.199 kWh/hr) by device/network/resolution; old "1.6 kg CO2/hr" was a
  bit/byte unit error. → post's "~70% screen / ~5% DC" is right; "~200 ml/hr" water is
  a defensible order-of-magnitude (0.077 kWh × ~1-3 L/kWh grid water ≈ 80-230 ml).
  ([IEA](https://www.iea.org/commentaries/the-carbon-footprint-of-streaming-video-fact-checking-the-headlines),
  [Carbon Brief](https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix/))
- **Local vs cloud:** [arXiv 2511.07885](https://arxiv.org/abs/2511.07885) — local
  hardware ≥1.4x LOWER intelligence-per-watt than cloud accelerators on the same model.
  Supports "batched cloud can beat on-device per answer." Frame as efficiency, not a
  hard per-answer Wh number (the Mac-Studio 1-2 Wh figure is illustrative).
- **Footprints:** beef 15,400 L/kg global avg (Mekonnen-Hoekstra 2012, per-ton; ~0.15 kg
  patty → ~2,300-2,500 L/burger, a derived figure with wide range). Shower: EPA
  standard head 2.5 gpm ≈ 9.5 L/min → 5 min ≈ 47 L (low-flow 2.0 gpm → ~38 L). Jeans:
  ~7,500-10,000 L/pair (commonly cited).
  → **FIX:** post says 5.4M L training = "ninety pairs of jeans." 90 pairs ≈ 675-900k L,
  which matches the **700k onsite** figure, NOT the 5.4M total (that's ~540-720 pairs).
  Misattributed. Either attach "~90 pairs" to the 700k onsite, or say "~600 pairs" for 5.4M.
- **Traffic share:** Sandvine GIPR 2023 ~65% video is the standard cited figure; keep but
  label "share of traffic, not energy," and note gen-AI is small but fast-growing.

## POST 2 — "SCSS or Tailwind, now the AI writes most of it"

### Token counts — measured locally with tiktoken (o200k_base = GPT-4o; cl100k in parens)
- **One button, class attribute value:** Tailwind **78** (cl100k 82) · SCSS **4** (4).
  → post's "~78 vs ~6" is ACCURATE. Keep.
- **One ~60-line component (~10 styled elements), same card both ways:**
  - Tailwind inline markup: **345** tokens (cl100k 345)
  - SCSS markup only: **153** (152)
  - SCSS stylesheet (once): **482** (484)
  → **post is WRONG here.** It claims Tailwind ~720 / SCSS markup ~90 / stylesheet ~140.
  Real: Tailwind 345 (post overstates ~2x), SCSS markup 153 (post understates), stylesheet
  482 (post understates ~3.4x). Honest story: per-element markup is ~2.3x lighter in SCSS
  (153 vs 345), BUT the stylesheet is a real fixed cost (482). For a SINGLE component on
  first read, Tailwind is actually CHEAPER (345 < 153+482=635). SCSS wins only once the
  stylesheet amortises across many elements/edits, OR when the model edits markup without
  loading styles at all (semantic names carry intent). Rewrite the 2nd chart + argument
  to this nuance. (Measured via /tmp/tokcount.py, tiktoken 0.13.0.)

### Claude pricing — CONFIRMED via claude-api skill (cached 2026-05-26)
- Sonnet 4.6 (mid-tier) = **$3.00 / 1M input**, $15 / 1M output. Haiku 4.5 = $1 in / $5 out.
  Opus 4.8 = $5 in / $25 out. So the post's "~$3 per million input tokens for a mid-tier
  model" is ACCURATE — keep it. Canonical: [pricing docs](https://platform.claude.com/docs/en/about-claude/pricing).
- NB for any future token-counting: tiktoken (used here) is OpenAI's tokeniser and
  undercounts Claude by ~15-20%; it's fine as an illustrative cross-model proxy for the
  post (the post already frames counts as "GPT-style tokeniser" / illustrative), but the
  REAL Claude count would be ~15-20% higher. Worth a one-line caveat in the post.
- Tailwind-in-the-AI-era opinion piece (matches thesis, blog-quality):
  [silvermine.ai](https://www.silvermine.ai/newsletter/tailwind-css-ai-era).

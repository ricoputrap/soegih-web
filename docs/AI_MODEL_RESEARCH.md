# AI Model Research & Selection Report

**Date:** March 15, 2026
**Context:** MVP phase with <100 expected users, focusing on natural language transaction parsing

---

## Executive Summary

This report evaluates AI models suitable for Soegih's AI chat interface that parses natural language into structured financial transactions. The previous model (`gpt-4o-mini`) is deprecated and being phased out. Three viable options are recommended:

1. **Claude Haiku 4.5** (Recommended for MVP) - Best value for cost
2. **Claude Sonnet 4.5** - Best balance of cost and capability
3. **Open-source models via Ollama** - Maximum cost control (trade-off: self-hosting complexity)

---

## Context: The Deprecation Problem

**Current Status:**
- `gpt-4o-mini` (currently used): **Deprecated**
  - ChatGPT support ended: February 13, 2026
  - Azure support ends: March 31, 2026
  - OpenAI API: Still available but may be sunset in the future

**Migration Required:** Must move to a non-deprecated model before implementation continues.

---

## Use Case Analysis

### Workload Profile

**For MVP (<100 users):**
- **Estimated daily transactions:** ~50-100 transactions/day across all users
- **Daily API calls:** ~100-200 chat requests (assuming 1-2 transactions per user, some multi-transaction chats)
- **Request characteristics:**
  - Input: Natural language transaction descriptions (50-200 tokens avg)
  - Output: Structured JSON response with transaction details (100-300 tokens avg)
  - Latency requirement: Real-time (< 2 seconds acceptable for MVP)
  - Complexity: **Low-to-Medium** - Transaction intent recognition, amount/date/category extraction

### Critical Requirements

1. **Accuracy:** Must correctly parse financial transaction details (amount, category, date, parties)
2. **Cost:** Minimal for MVP scale (ideally <$10/month at MVP volume)
3. **Latency:** <2s acceptable (real-time user feedback)
4. **Availability:** Reliable inference (error handling for misunderstood inputs)
5. **Future-proof:** Model should be stable and supported for at least 12+ months

---

## Model Evaluation

### Option 1: Claude Models (Recommended)

**Available Models (as of March 2026):**

#### Claude Haiku 4.5 ⭐ **BEST FOR MVP**
- **Release Date:** October 2025
- **Characteristics:**
  - Fastest and most compact Claude model
  - Hybrid model: capable of near-instant responses
  - Extreme cost efficiency
  - Extended thinking support (optional)
- **Use Case Fit:**
  - Perfect for transaction parsing (low-medium complexity)
  - Latency: <500ms (excellent for user experience)
  - Token efficiency: Conservative token usage
- **Estimated Cost (MVP scale):**
  - ~100-200 API calls/day × 200 tokens avg (input + output)
  - **Estimated: ~$0.30-0.60/month** (assuming standard Anthropic pricing tiers)
- **Pros:**
  - Exceptional cost-efficiency
  - Fast inference (near-instant)
  - Reliable and well-maintained
  - Easy to migrate from gpt-4o-mini
- **Cons:**
  - Less capable for complex reasoning (not needed for MVP)
  - Limited to Anthropic ecosystem

#### Claude Sonnet 4.5
- **Release Date:** September 2025
- **Characteristics:**
  - High-performance model
  - Best for real-world agents and coding
  - Extended thinking support
  - ~2-3x more capable than Haiku
- **Use Case Fit:**
  - Good for handling ambiguous transaction descriptions
  - Better for complex multi-step transaction parsing
  - Slightly higher latency acceptable
- **Estimated Cost (MVP scale):**
  - **Estimated: $1.50-3.00/month** (proportionally higher than Haiku)
- **Pros:**
  - Better accuracy on complex cases
  - Lower error rates for ambiguous inputs
  - Still cost-effective at MVP scale
- **Cons:**
  - Overkill capability for simple transaction parsing
  - Higher cost than Haiku

#### Claude Opus 4.6
- **Release Date:** Latest (2025)
- **Characteristics:**
  - Most intelligent and capable Claude model
  - Designed for agents and complex coding
  - Maximum reasoning capability
- **Use Case Fit:**
  - Unnecessary for MVP transaction parsing
  - Better suited for advanced scenarios (multi-leg transfers, complex rules)
- **Estimated Cost (MVP scale):**
  - **Estimated: $5.00-10.00/month** (significantly higher)
- **Verdict:** Over-engineered for MVP requirements

### Option 2: OpenAI GPT Models

#### GPT-4o-mini ⭐ **BUDGET ALTERNATIVE**
- **Release Date:** July 2024
- **Characteristics:**
  - Lightweight, fast inference
  - Good performance on NLP tasks
  - Lower cost than gpt-4o
  - Well-suited for transaction parsing
- **Pricing:**
  - Input: $0.15/million tokens
  - Output: $0.60/million tokens
- **Use Case Fit:**
  - Excellent for transaction parsing (low complexity)
  - Fast inference (< 1 second)
  - Cost-competitive with Claude Haiku
- **Estimated Cost (MVP scale):**
  - **Estimated: $0.15-0.30/month**
- **Pros:**
  - Same price tier as Claude Haiku
  - Mature, stable model
  - Good accuracy for transaction parsing
  - Can use Batch API for 50% discount if you can tolerate 24-hour delays
- **Cons:**
  - ⚠️ OpenAI has history of deprecating models (risk factor)
  - Current uncertainty: gpt-4o-mini status unclear post-March 2026
  - Less information on long-term support

#### GPT-4o
- **Characteristics:** More advanced than gpt-4o-mini, strong reasoning
- **Pricing:** $2.50 (input) / $10.00 (output) per million tokens
- **Estimated Cost (MVP scale):** **$2.00-5.00/month**
- **Verdict:** Overkill for transaction parsing, unnecessary cost

**OpenAI Overall Verdict:**
- ⚠️ **Risky for MVP** due to deprecation history
- gpt-4o-mini is cost-competitive but model stability uncertain
- Recommend only if you already have OpenAI infrastructure

### Option 3: Google Gemini Models

#### Gemini 2.0 Flash Lite ⭐⭐ **BEST BUDGET OPTION**
- **Release Date:** February 2025
- **Characteristics:**
  - Optimized for cost efficiency and speed
  - Lightweight, fast inference (<300ms)
  - Good performance on routine tasks
  - Newly released (stable, long-term support expected)
- **Pricing:**
  - Input: $0.05/million tokens
  - Output: $0.20/million tokens
- **Use Case Fit:**
  - Perfect for simple transaction parsing
  - Fastest inference of all options
  - Lowest total cost
- **Estimated Cost (MVP scale):**
  - **Estimated: $0.07-0.15/month** (lowest of all options)
- **Pros:**
  - Absolute lowest cost (~50% cheaper than Claude Haiku)
  - Brand new model (2025) with long-term support expected
  - Fast inference (excellent UX)
  - Simple API integration (similar to others)
  - Free tier available for low-volume testing
- **Cons:**
  - Very new model (less real-world usage data)
  - Less documentation/examples compared to OpenAI
  - Google's LLM track record mixed (Bard quality concerns historically)
- **Verdict:** Excellent option if you want minimal cost. Risk is immaturity.

#### Gemini 2.0 Flash ⭐ **BALANCED OPTION**
- **Release Date:** February 2025
- **Characteristics:**
  - More capable than Flash Lite
  - Still optimized for cost and speed
  - Good for moderate complexity tasks
  - Flat pricing regardless of context length
- **Pricing:**
  - Input: $0.10/million tokens
  - Output: $0.40/million tokens
- **Estimated Cost (MVP scale):**
  - **Estimated: $0.15-0.30/month**
- **Verdict:**
  - Solid middle ground between Flash Lite and Claude/OpenAI
  - Good balance of capability and cost
  - Better accuracy than Flash Lite if needed

#### Gemini 1.5 Pro (Legacy)
- **Pricing:** $1.25 (input) / $5.00 (output) per million tokens
- **Verdict:** Not recommended (Flash models are cheaper and newer)

**Google Gemini Overall Verdict:**
- ✅ **Strong contender for MVP**
- Flash Lite offers best cost
- Flash offers best balance of cost/capability
- Concern: Model newness and limited real-world track record

### Option 4: Open-Source Models (Self-Hosted)

**Available Options:**

#### GPT-OSS (OpenAI's open-weight models)
- **Sizes:** 20B, 120B parameter models
- **Deployment:** Via Ollama or custom inference server
- **Infrastructure:**
  - Self-hosted on VPS (alongside backend)
  - GPU or CPU inference
  - Docker container management

**Estimated Cost (MVP scale):**
- **Infrastructure:** ~$50-150/month VPS GPU capacity
- **Model cost:** $0 (free, open-source)
- **Total: $50-150/month** (but includes capacity for other services)

**Pros:**
- Complete cost control
- No per-API-call billing
- Maximum privacy (data never leaves your servers)
- Can optimize model for your domain (fine-tuning)
- No vendor lock-in

**Cons:**
- ❌ Infrastructure complexity (requires GPU/compute)
- DevOps burden (setup, monitoring, scaling)
- Lower accuracy than state-of-the-art proprietary models
- Latency depends on self-hosted compute (unpredictable)
- Maintenance overhead (updates, patches, monitoring)

**Verdict:**
- ⚠️ **Not Recommended for MVP**
- Reason: Adds operational complexity that detracts from product development
- Consider for Phase 2 (if you need cost control at >10K users or want to sunset vendor dependency)

#### Other Open-Source Options
- **Llama 3.1:** Meta's open model (similar trade-offs to GPT-OSS)
- **Mistral:** Lightweight French model (good cost/performance, still less capable than Claude)
- All require self-hosting with infrastructure overhead

---

## Detailed Model Options

### Claude Models (Anthropic)

| Model | Input Price | Output Price | Monthly Cost* | Best For |
|-------|------------|-------------|--------------|----------|
| **Claude Haiku 4.5** | $0.80/M | $4.00/M | **$0.30-0.60** | **MVP ✅** |
| Claude Sonnet 4.5 | $3.00/M | $15.00/M | $1.50-3.00 | Production |
| Claude Opus 4.6 | $15.00/M | $75.00/M | $5.00-10.00 | Complex reasoning |

### OpenAI Models

| Model | Input Price | Output Price | Monthly Cost* | Best For |
|-------|------------|-------------|--------------|----------|
| **gpt-4o-mini** | $0.15/M | $0.60/M | **$0.15-0.30** | **Budget MVP** ✅ |
| gpt-4o | $2.50/M | $10.00/M | $2.00-5.00 | Higher capability |
| gpt-4-turbo | $10.00/M | $30.00/M | $8.00-20.00 | Complex reasoning |

**Note:** OpenAI's Batch API offers 50% discount on gpt-4o-mini (~$0.08-0.15/month), but requires 24-hour processing delay.

### Google Gemini Models

| Model | Input Price | Output Price | Monthly Cost* | Best For |
|-------|------------|-------------|--------------|----------|
| **Gemini 2.0 Flash** | $0.10/M | $0.40/M | **$0.15-0.30** | **Budget MVP** ✅ |
| **Gemini 2.0 Flash Lite** | $0.05/M | $0.20/M | **$0.07-0.15** | **Ultra-Budget** ✅ |
| Gemini 2.0 Pro | $1.50/M | $6.00/M | $1.50-3.00 | Higher capability |
| Gemini 1.5 Pro | $1.25/M | $5.00/M | $1.00-2.50 | Legacy option |

**Tier Structure:** Google offers Free Tier (limited) and Paid Tier (pay-as-you-go). No minimum spend required.

---

## Cost Comparison Summary (MVP: <100 Users)

Estimated based on **150 API calls/day, ~200 tokens per request (100 input + 100 output)**:

| Rank | Provider | Model | Monthly Cost | Per-Request |
|------|----------|-------|--------------|-------------|
| 🥇 **1st** | **Google** | **Gemini 2.0 Flash Lite** | **$0.07-0.15** | **~$0.0001** |
| 🥈 **2nd** | **OpenAI** | **gpt-4o-mini** | **$0.15-0.30** | **~$0.0002** |
| 🥉 **3rd** | **Google** | **Gemini 2.0 Flash** | **$0.15-0.30** | **~$0.0002** |
| **4th** | **Claude** | **Haiku 4.5** | **$0.30-0.60** | **~$0.0003** |
| **5th** | **Claude** | **Sonnet 4.5** | **$1.50-3.00** | **~$0.0015** |

*All costs negligible for MVP budget. Differences <$1/month.*

---

## Migration Path from gpt-4o-mini

### From `gpt-4o-mini` → Claude Haiku 4.5

**Steps:**

1. **Update environment variables:**
   ```bash
   # soegih-ai/.env
   ANTHROPIC_API_KEY=<your-key>
   MODEL_NAME=claude-3-5-haiku-latest
   ```

2. **Update FastAPI service (soegih-ai):**
   ```python
   # Replace OpenAI client
   from anthropic import Anthropic

   client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

   # Update chat call
   response = client.messages.create(
       model="claude-3-5-haiku-latest",
       max_tokens=1024,
       messages=[
           {"role": "user", "content": user_input}
       ]
   )
   ```

3. **Test transaction parsing:**
   - Test ambiguous inputs (e.g., "spent $50 at coffee shop yesterday")
   - Test edge cases (transfers, multiple categories, special characters)
   - Verify output JSON structure matches expectations

4. **No frontend changes needed** - API contract remains the same

5. **Pricing estimate:** ~$0.30-0.60/month → monitor first month actual usage

**Migration Effort:** ~1-2 hours (straightforward API swap)

---

## Final Recommendations

### 🥇 **Option 1 (Conservative): Claude Haiku 4.5** ✅ **RECOMMENDED FOR MVP**

**Best for:** Users who prioritize stability and reliability over cost savings.

**Justification:**
- **Cost:** $0.30-0.60/month (negligible)
- **Reliability:** Anthropic has no model deprecations planned
- **Accuracy:** Excellent for transaction parsing
- **Latency:** <500ms (near-instant UX)
- **Track Record:** Stable, mature model
- **Future-proof:** Can easily upgrade to Sonnet if needed

**Why this is the safest choice:**
- Anthropic has committed to long-term support for Claude models
- Strong accuracy on financial transaction parsing tasks
- No vendor lock-in risk (easy to switch if needed)
- Cost difference vs. Gemini Flash Lite is <$0.30/month

**Easy migration:** Simply update API key and model name in `soegih-ai` service.

---

### 🥈 **Option 2 (Cost-Optimized): Google Gemini 2.0 Flash Lite** ⭐ **BUDGET MVP**

**Best for:** Users who prioritize maximum cost efficiency and can accept model immaturity risk.

**Justification:**
- **Cost:** $0.07-0.15/month (50% cheaper than Claude Haiku)
- **Speed:** <300ms (fastest of all options)
- **Capability:** Adequate for transaction parsing
- **Pricing Tier:** Free tier available (1,500 requests/min, 1M tokens/month free)
- **New & Fresh:** Released Feb 2025, long-term support likely

**Trade-offs:**
- ⚠️ Brand new model (less real-world usage data)
- Unproven accuracy on financial domain tasks
- Less documentation/community support compared to Claude/OpenAI

**When to use:**
- If you want to spend <$0.20/month on LLM
- If you can tolerate higher error rates initially
- If you want to test multiple providers simultaneously

---

### 🥉 **Option 3 (Middle Ground): Google Gemini 2.0 Flash** ✅ **SOLID ALTERNATIVE**

**Best for:** Users seeking good balance between cost, capability, and maturity.

**Justification:**
- **Cost:** $0.15-0.30/month (same as gpt-4o-mini, half of Claude Haiku)
- **Capability:** More capable than Flash Lite
- **Speed:** Still <500ms
- **Stability:** Same release as Flash Lite, newer than Claude/OpenAI

**Better than Flash Lite?**
- More accurate on complex transaction parsing
- Better error handling for edge cases
- Still one of the cheapest options

**When to use:**
- If you want the Gemini option but with higher accuracy
- If you want a middle ground between cost and reliability

---

### ⚠️ **Option 4 (Not Recommended): OpenAI gpt-4o-mini**

**Pros:**
- Cost competitive ($0.15-0.30/month)
- Mature, well-documented model
- Good accuracy for transaction parsing

**Cons:**
- ❌ Deprecation risk (OpenAI has history of retiring models)
- Model status post-March 2026 unclear
- Not a safe long-term choice for MVP

**Verdict:** Only use if you already have OpenAI infrastructure. Not recommended for new projects.

---

## Recommendation Decision Matrix

| Priority | Best Choice | Cost | Reason |
|----------|-------------|------|--------|
| **Stability & long-term** | Claude Haiku 4.5 | $0.30-0.60/mo | No deprecation risk, mature |
| **Maximum cost savings** | Gemini 2.0 Flash Lite | $0.07-0.15/mo | Cheapest, newest |
| **Cost + reliability** | Gemini 2.0 Flash | $0.15-0.30/mo | Good balance, Google backing |
| **Avoid** | OpenAI gpt-4o-mini | $0.15-0.30/mo | Deprecation uncertainty |

---

## Final Pick for Soegih MVP

### 🏆 **Primary Recommendation: Claude Haiku 4.5**

**Reasoning:**

1. **Stability:** Anthropic has no deprecations planned. Safe 12+ month horizon.
2. **Cost:** $0.30-0.60/month is negligible for MVP. Cost difference with Gemini (<$0.25/mo) doesn't justify the risk.
3. **Accuracy:** Proven track record on NLP/intent tasks. Less risk of transaction parsing errors.
4. **Team Confidence:** Easier to justify to stakeholders ("using Claude, same as ChatGPT competitors").
5. **Scaling:** Clear upgrade path (Sonnet → Opus) as user base grows.

### 🔄 **Secondary Option: Gemini 2.0 Flash**

If you want to reduce costs and can accept slightly higher error rates:
- Same cost as gpt-4o-mini ($0.15-0.30/month)
- Newer, fresher model (likely good long-term support)
- Better than OpenAI (no deprecation risk)
- Good fallback if Claude becomes unavailable

### Graduation Path (Scaling Plan)

**MVP Phase (0-100 users):**
- Claude Haiku 4.5 (~$0.30-0.60/mo)

**Growth Phase (100-1K users):**
- Stay on Haiku (~$3-6/mo) OR
- Upgrade to Claude Sonnet (~$15-30/mo) for better accuracy on edge cases

**Scale Phase (1K-10K users):**
- Claude Sonnet (~$50-150/mo) OR
- Consider Gemini 2.0 Pro (~$50-100/mo) if cost becomes concern

**Enterprise Phase (10K+ users):**
- Evaluate volume discounts from all providers
- Consider multi-model strategy (Claude for accuracy, Gemini for cost)

---

## Implementation Comparison

### Setup Complexity

| Provider | Effort | Difficulty | Notes |
|----------|--------|-----------|-------|
| **Claude** | 1-2 hours | Easy | Standard REST API |
| **OpenAI** | 1-2 hours | Easy | Already familiar |
| **Gemini** | 2-3 hours | Medium | Different SDK, less familiar |

### Code Changes Required (soegih-ai service)

**Claude (Haiku 4.5):**
```python
from anthropic import Anthropic

client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

response = client.messages.create(
    model="claude-3-5-haiku-latest",
    max_tokens=1024,
    messages=[{"role": "user", "content": user_input}]
)
```

**OpenAI (gpt-4o-mini):**
```python
from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

response = client.chat.completions.create(
    model="gpt-4o-mini",
    max_tokens=1024,
    messages=[{"role": "user", "content": user_input}]
)
```

**Google Gemini (2.0 Flash):**
```python
import google.generativeai as genai

genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
model = genai.GenerativeModel("gemini-2.0-flash")

response = model.generate_content(user_input)
```

All three providers support similar APIs, making migration straightforward.

---

## Implementation Timeline (Claude Haiku 4.5)

1. **Week 1:**
   - Set up Anthropic API key
   - Update FastAPI service to use Claude Haiku
   - Create unit tests for transaction parsing

2. **Week 2:**
   - Test accuracy with sample transaction descriptions
   - Test edge cases (ambiguous inputs, special characters, date parsing)
   - Measure latency and token usage

3. **Week 3:**
   - Deploy to staging environment
   - Run integration tests with full pipeline
   - Monitor first 50-100 transactions

4. **Week 4:**
   - Go live to production
   - Monitor error rates, response times, and costs
   - Set up alerts for API failures

### Alternative: Multi-Model Strategy

Consider deploying two models in parallel during MVP:

**Primary:** Claude Haiku 4.5 (reliable, accurate)
**Fallback:** Gemini 2.0 Flash (low-cost backup)

If primary fails, automatically fall back to secondary. This adds redundancy without significant cost increase (~$0.50/mo total).

---

## Monitoring & Optimization

### Metrics to Track

- **Cost per transaction:** Should be <$0.01
- **Error rate:** Target <5% (need retry/clarification)
- **Response latency:** Target <1s (p95)
- **Model accuracy:** Track category assignment correctness, amount parsing

### Cost Optimization

- Use Claude's prompt caching (if available in your plan) for repeated transaction templates
- Batch similar requests in off-peak hours if implementing background processing
- Monitor token usage for bloat (overly verbose outputs)

---

## Conclusion

After comprehensive research evaluating **4 provider ecosystems** (Claude, OpenAI, Google Gemini), here's the summary:

### Recommended Option: **Claude Haiku 4.5**

- **Cost:** $0.30-0.60/month (negligible)
- **Accuracy:** Excellent for transaction parsing
- **Stability:** No deprecations planned, long-term support guaranteed
- **Latency:** <500ms (excellent UX)
- **Confidence Level:** ⭐⭐⭐⭐⭐ (5/5)

### Alternative if Cost is Critical: **Gemini 2.0 Flash**

- **Cost:** $0.15-0.30/month (50% cheaper than Claude)
- **Accuracy:** Good, acceptable for MVP
- **Stability:** New model (potential long-term support)
- **Latency:** <300ms (fastest)
- **Confidence Level:** ⭐⭐⭐ (3/5) - newer model, less track record

### Not Recommended: **OpenAI gpt-4o-mini**

- Deprecation risk (unclear support post-March 2026)
- Cost competitive but not worth the vendor risk

---

## Next Steps

1. **Immediate:** Choose Claude Haiku 4.5 or Gemini 2.0 Flash
2. **Week 1:** Create new branch `feat/task-X-ai-model-migration`
3. **Week 1-2:** Implement chosen model in `soegih-ai` service
4. **Week 2-3:** Test with real transaction data
5. **Week 4:** Deploy to production

**Migration effort:** 1-2 days per model option (straightforward)

---

## References & Sources

### Pricing Data (Current as of March 2026)

- [OpenAI API Pricing (Updated 2026)](https://pricepertoken.com/pricing-page/provider/openai)
- [GPT-4o-mini API Pricing 2026](https://pricepertoken.com/pricing-page/model/openai-gpt-4o-mini)
- [Gemini API Pricing Calculator & Cost Guide](https://costgoat.com/pricing/gemini-api)
- [Gemini 2.0 Flash Lite API Pricing 2026](https://pricepertoken.com/pricing-page/model/google-gemini-2.0-flash-lite-001)
- [Gemini Developer API Pricing](https://ai.google.dev/gemini-api/docs/pricing)

### Model Documentation

- [Claude API - Anthropic](https://platform.claude.com/docs/en/api)
- [OpenAI API Reference](https://developers.openai.com/api/docs/)
- [Google Gemini API Documentation](https://ai.google.dev/gemini-api/docs)
- [AI API Pricing Comparison 2026](https://intuitionlabs.ai/articles/ai-api-pricing-comparison-grok-gemini-openai-claude)

### Related Research

- [Understanding LLM Cost Per Token: A 2026 Practical Guide](https://www.silicondata.com/blog/llm-cost-per-token)
- [ChatGPT API Pricing 2026: Token Costs & Rate Limits](https://intuitionlabs.ai/articles/chatgpt-api-pricing-2026-token-costs-limits)

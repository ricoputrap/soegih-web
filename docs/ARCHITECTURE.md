# Architecture — soegih-web

## System Context

```
                    ┌────────────────────────────────────────┐
                    │               VPS (Docker)             │
                    │                                        │
 ┌───────────┐      │  ┌────────┐      ┌──────────────────┐  │
 │  Browser  │─────►│  │ Caddy  │─────►│  soegih-backend  │  │
 │ (Netlify) │◄─────│  │        │      │  NestJS :3000    │  │
 └───────────┘      │  └────────┘      └─────────┬────────┘  │
                    │                            │           │
                    │                   ┌────────▼────────┐  │
                    │                   │  soegih-ai      │  │
                    │                   │  FastAPI :8000  │  │
                    │                   └─────────────────┘  │
                    └────────────────────────────────────────┘
                                              │
                                    ┌─────────▼──────────┐
                                    │  Supabase Postgres │
                                    └────────────────────┘
```

## Frontend Module Structure

```
src/
├── modules/
│   ├── auth/          # login, JWT storage
│   ├── dashboard/     # net worth, monthly totals, expense chart
│   ├── wallet/        # wallet CRUD
│   ├── category/      # category CRUD
│   ├── transaction/   # transaction CRUD (server-side pagination)
│   └── ai/            # AI chat, confirmation flow
└── shared/            # components, hooks, utils, types
```

## Key Patterns

- **Routing:** TanStack Router (file-based)
- **Data fetching:** TanStack Query — mutations + query invalidation
- **Tables:** TanStack Table
  - Wallets & categories: client-side sort/filter/paginate
  - Transactions: server-side (`?page`, `limit`, `sort_by`, `sort_order`, `search`, `month`)
- **Auth:** JWT stored in memory; attached via `Authorization: Bearer` header

## API Base URL

Configured via `VITE_API_BASE_URL` env variable → proxied through Caddy to `soegih-backend`.

---

## AI Service (soegih-ai)

### Model Selection

**Current:** Google Gemini 2.0 Flash
- **Why:** Cost-optimized for MVP (<100 users), fast inference (<300ms), sufficient accuracy for transaction parsing
- **Cost:** ~$0.15-0.30/month
- **Alternative models:** Claude Haiku 4.5 (more stable), Gemini 2.0 Pro (higher accuracy)
- **Documentation:** See `/docs/AI_MODEL_RESEARCH.md` and `/docs/GEMINI_VS_HAIKU_COMPARISON.md`

### Implementation

**SDK:** `google.generativeai` Python library
```python
import google.generativeai as genai

genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
model = genai.GenerativeModel("gemini-2.0-flash")
```

**Request Flow:**
1. Frontend → Backend (`POST /api/v1/ai/chat`)
2. Backend → soegih-ai (`POST /ai/chat`)
3. soegih-ai → Gemini API (`generativeai.GenerativeModel.generate_content()`)
4. soegih-ai parses response → structured transaction object
5. Frontend displays confirmation dialog to user
6. User confirms → Backend creates transaction in Postgres

### Cost & Monitoring

- **Pricing:** $0.10/M input tokens, $0.40/M output tokens
- **Monitor:** Google Cloud Console for daily/weekly spend
- **Threshold:** Alert if monthly spend exceeds $1 (indicates high usage or errors)
- **Accuracy tracking:** Log transaction parsing errors for analysis

---

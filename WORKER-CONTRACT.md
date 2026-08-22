# Cloudflare Worker API contract

## Request

POST `/api/chat`

```json
{
  "question": "How do I coach an underperforming employee?",
  "sector": "Cross-Sector",
  "mode": "Coach me",
  "resources": [],
  "history": []
}
```

## Success response

```json
{
  "answer": "Generated coaching response"
}
```

## Health check

GET `/` should return a successful JSON response.

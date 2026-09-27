import json
import os
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))
MODEL = "llama-3.3-70b-versatile"

SYSTEM_PROMPT = """You are Wren, a regulatory triage assistant. You are given a business description
and a fixed list of candidate regulations (each with an id). Your job:

1. For each regulation in the candidate list, decide whether it applies, is conditional, or doesn't
   apply to this specific business, and explain why in plain language, one to two sentences.
2. You must ONLY reference regulations from the candidate list provided. Never invent a regulation
   that isn't in the input.
3. If it's genuinely unclear whether a regulation applies given the business description, mark
   confidence "low" rather than guessing. Do not resolve ambiguity silently.
4. For every regulation with severity "blocker" or "conditional" that applies, generate one concrete
   checklist action item.
5. You are not providing legal advice. Never state a legal conclusion like "you are compliant" or
   "you are cleared to operate," only describe what the regulation says and what action would address it.

Respond with ONLY a JSON object, no preamble, no markdown fences, matching this shape:
{
  "blockers": [
    {
      "regulation_id": "...",
      "title": "...",
      "plain_language_explanation": "...",
      "severity": "blocker" | "conditional" | "informational",
      "confidence": "high" | "medium" | "low"
    }
  ],
  "checklist": [
    {"regulation_id": "...", "action_item": "..."}
  ]
}
"""


def generate_breakdown(business_description: str, candidate_regulations: list) -> dict:
    candidates_payload = [
        {
            "regulation_id": r.id,
            "title": r.title,
            "raw_requirement_text": r.raw_requirement_text,
            "authority": r.authority,
            "severity": r.severity,
            "source_url": r.source_url,
        }
        for r in candidate_regulations
    ]

    user_content = json.dumps(
        {
            "business_description": business_description,
            "candidate_regulations": candidates_payload,
        }
    )

    response = client.chat.completions.create(
        model=MODEL,
        max_tokens=2000,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_content},
        ],
    )
    text = response.choices[0].message.content.strip()
    text = text.replace("```json", "").replace("```", "").strip()
    try:
        parsed = json.loads(text)
    except json.JSONDecodeError:
        parsed = {"blockers": [], "checklist": []}
    return parsed

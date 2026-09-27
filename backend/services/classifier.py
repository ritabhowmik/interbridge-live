import json
import os
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))
MODEL = "llama-3.3-70b-versatile"

SECTOR_TAXONOMY = [
    "alcohol_production",
    "food_processing",
    "trucking_logistics",
    "professional_services",
]

SYSTEM_PROMPT = f"""You classify a business description into exactly one sector from this fixed list:
{json.dumps(SECTOR_TAXONOMY)}

Respond with ONLY a JSON object, no preamble, no markdown fences:
{{"sector": "<one of the list above, or null if none fit>", "confidence": <float 0.0-1.0>}}

If the business description is too vague or doesn't clearly fit any sector, set sector to null and confidence to a low value.
"""


def classify_business(business_description: str) -> dict:
    response = client.chat.completions.create(
        model=MODEL,
        max_tokens=200,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": business_description},
        ],
    )
    text = response.choices[0].message.content.strip()
    text = text.replace("```json", "").replace("```", "").strip()
    try:
        parsed = json.loads(text)
    except json.JSONDecodeError:
        parsed = {"sector": None, "confidence": 0.0}
    return parsed

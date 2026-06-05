export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { resume } = req.body;
  if (!resume || !resume.trim()) return res.status(400).json({ error: "Resume text is required." });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured." });

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-5",
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: `You are Chandler Johnson, a Senior Real Estate Manager with 20+ years of corporate real estate experience at Valvoline, The Home Depot, and AutoZone. You have opened 300+ locations, closed $500M+ in revenue-generating deals, and know exactly how Fortune 500 real estate hiring managers think.

Your job: Transform this residential real estate resume into a powerful corporate real estate resume.

RULES:
- Replace residential language with corporate RE language (e.g., "helped clients buy homes" → "executed site acquisition strategy across target trade areas")
- Reframe commissions and transaction volume as portfolio impact and revenue contribution
- Add corporate RE keywords: site selection, lease negotiation, portfolio optimization, trade area analysis, pro forma modeling, cross-functional leadership, entitlement, P&L accountability
- Keep the same career timeline and facts — just reposition and reframe
- Use strong action verbs: Led, Executed, Delivered, Managed, Negotiated, Drove, Achieved
- Format cleanly with clear sections

Return ONLY the rewritten resume. No commentary, no explanation.

RESUME TO TRANSFORM:
${resume}`,
          },
        ],
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Anthropic API error");

    const result = data.content?.[0]?.text;
    if (!result) throw new Error("No response from AI");

    return res.status(200).json({ result });
  } catch (err) {
    console.error("Transform error:", err);
    return res.status(500).json({ error: err.message || "Something went wrong." });
  }
}

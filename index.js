import express from "express";

const app = express();

// CONFIG
const ALLOWED_DOMAIN = "refliefcart.shop";
const FINAL_REDIRECT_URL = "https://example.com";

app.get("/getData", (req, res) => {
  const gclid = req.query.gclid || "";
  const timezone = req.headers["x-client-timezone"] || "unknown";

  const referer = req.headers.referer || "";
  const origin = req.headers.origin || "";

  // Allow only requests from refliefcart.shop
  const isAllowed =
    referer.includes(ALLOWED_DOMAIN) ||
    origin.includes(ALLOWED_DOMAIN);

  if (!isAllowed) {
    return res.status(403).json({
      code: `console.warn("Unauthorized domain");`
    });
  }

  // Optional logging (safe for ads tracking)
  console.log({
    gclid,
    timezone,
    referer,
    origin,
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    ua: req.headers["user-agent"],
    time: new Date().toISOString()
  });

  // Build redirect URL (preserve gclid if exists)
  const redirectUrl = gclid
    ? `${FINAL_REDIRECT_URL}?gclid=${encodeURIComponent(gclid)}`
    : FINAL_REDIRECT_URL;

  // Code executed immediately in browser
  const code = `
    window.location.replace("${redirectUrl}");
  `;

  res.json({ code });
});

// Render PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

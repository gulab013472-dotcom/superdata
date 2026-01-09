import express from "express";

const app = express();

// Allowed domain
const ALLOWED_DOMAIN = "refliefcart.shop";

app.get("/getData", (req, res) => {
  const gclid = req.query.gclid || "";
  const timezone = req.headers["x-client-timezone"] || "unknown";

  const referer = req.headers.referer || "";
  const origin = req.headers.origin || "";

  const isAllowed =
    referer.includes(ALLOWED_DOMAIN) ||
    origin.includes(ALLOWED_DOMAIN);

  if (!isAllowed) {
    return res.status(403).json({
      code: `console.warn("Please login to access this page");`,
    });
  }

  // Log valid requests
  console.log({
    gclid,
    timezone,
    referer,
    origin,
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    ua: req.headers["user-agent"],
    timestamp: new Date().toISOString(),
  });

  // Code executed in browser
  const code = `
    console.log("Authorized request from refliefcart.shop");
    console.log("GCLID:", "${gclid}");
    console.log("Timezone:", "${timezone}");

    // Example redirect
    // window.location.href = "https://your-final-landing-page.com";
  `;

  res.json({ code });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

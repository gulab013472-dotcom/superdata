const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const ALLOWED_DOMAIN = "refliefcart.shop";

app.get("/", (req, res) => {
  const gclid = req.query.gclid;

  const referer = req.headers.referer || "";
  const origin = req.headers.origin || "";

  const fromAllowedDomain =
    referer.includes(ALLOWED_DOMAIN) || origin.includes(ALLOWED_DOMAIN);

  // Optional: Render geo check
  const country = req.headers["x-render-country"]; // "JP"

  if (gclid && fromAllowedDomain /* && country === "JP" */) {
    return res.redirect(302, "https://example.com");
  }

  return res.status(403).send("Forbidden");
});

app.listen(PORT, () => {
  console.log(`Redirect server running on port ${PORT}`);
});

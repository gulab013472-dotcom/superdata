<script>
app.get("/", (req, res) => {
  const gclid = req.query.gclid;
  const origin = req.headers.origin;
  
  const domainAllowed = origin && origin.includes("refliefcart.shop");

  if (gclid && domainAllowed) {
    return res.redirect("https://example.com");
  }

  res.send("Access not allowed or missing gclid");
});
</script>

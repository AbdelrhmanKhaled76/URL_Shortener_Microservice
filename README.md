# URL Shortener Microservice
This project is a Node.js/Express API that shortens long URLs into easy-to-share numeric IDs (similar to services like Bit.ly). It includes:

Key Features
✅ Shorten URLs – Submit a long URL and get a compact short_url ID.
✅ Redirect to Original – Access /api/shorturl/<ID> to visit the original URL.
✅ Validation – Checks for:

Correct URL format (http:// or https://).

Active domains (via DNS lookup to block fake/non-existent websites).
✅ No Duplicates – Reusing the same URL returns the existing short_url.

There is deliberately no `_redirects` file here.

It used to hold one rule:

    https://www.kaomoji.fyi/* https://kaomoji.fyi/:splat 301!

which was dead on arrival and stayed dead. `www.kaomoji.fyi` has no DNS record
(the zone has only the apex CNAME and a TXT), so a request for that hostname
never reaches Cloudflare and the rule could never fire. It also used two Netlify
constructs Cloudflare does not accept — an absolute URL as the source, and the
`!` force suffix — and Workers rejects the file outright for the first of those:
"Line 1: Only relative URLs are allowed."

If www is ever wanted, do it at the edge rather than here: add the DNS record and
a zone Redirect Rule, or attach `www.kaomoji.fyi` to this Worker as a second
custom domain if it should serve rather than redirect.

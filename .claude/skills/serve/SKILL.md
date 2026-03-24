---
name: serve
description: Start the Jekyll local development server for previewing the site. Use this skill whenever you need to preview changes locally, before pushing, or when the user asks to see the site. Also use when any other skill or the CLAUDE.md workflow requires a running local server.
---

Start the Jekyll local development server and verify it is responding.

## Steps

1. **Check if the server is already running**:
   ```bash
   lsof -i :4000
   ```
   If a Jekyll process is already listening, skip to step 4. If a non-Jekyll process occupies the port, report the conflict and stop.

2. **Start the server in the background**:
   ```bash
   export PATH="$HOME/.rbenv/bin:$PATH" && eval "$(rbenv init - bash)"
   cd /home/mpascual/misc/MarioPasc.github.io
   bundle exec jekyll serve --host 127.0.0.1 > /tmp/jekyll-serve.log 2>&1 &
   echo $! > /tmp/jekyll-serve.pid
   ```

3. **Wait for readiness** (poll for up to 15 seconds):
   ```bash
   for i in $(seq 1 15); do
     curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4000/ | grep -q "200" && break
     sleep 1
   done
   ```
   If the server does not respond after 15 seconds, check `/tmp/jekyll-serve.log` for errors and report them.

4. **Confirm with Playwright** — Use the Playwright MCP to navigate to `http://127.0.0.1:4000/` and take a snapshot. This proves the server is live and the site renders correctly.

## Stopping the server

When done, or if the user asks to stop:
```bash
kill $(cat /tmp/jekyll-serve.pid) 2>/dev/null
rm -f /tmp/jekyll-serve.pid
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Port 4000 in use | `lsof -i :4000` to find the process; ask user before stopping it |
| Gems not installed | Run `bundle install` first |
| Stale CSS or content | Stop server, `rm -r _site/`, restart |

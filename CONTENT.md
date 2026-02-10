# Adding Content to jpelletier.org

## Add a New Project

Create a file in `src/content/projects/your-project.md`:

```markdown
---
title: Project Name
status: active
oneliner: One sentence pitch
description: "A paragraph describing what the project does and why it exists."
date: 2026-02-10
demo: https://your-demo.com        # optional
repo: https://github.com/you/repo  # optional
order: 2
milestones:
  - date: "2026-02-10"
    text: "Started the project."
  - date: "2026-02-14"
    text: "Shipped MVP."
---

Write the full project details here in markdown.
Use ## headings for sections. Add images like:

![Screenshot](/img/your-project/screenshot.png)
```

Put images in `public/img/your-project/`.

Status options: `active`, `paused`, `completed`. Only `active` projects show on the homepage.

## Add a Milestone to an Existing Project

Edit the project's `.md` file and append to the `milestones` array:

```yaml
milestones:
  - date: "2026-02-05"
    text: "Existing milestone."
  - date: "2026-02-12"
    text: "New milestone."
```

## Add a Graveyard Entry

Create a file in `src/content/graveyard/project-name.md`:

```markdown
---
title: Dead Project Name
epitaph: One-line lesson learned
date: 2026-01-15
order: 5
---

## What It Was

Describe what you built.

## What Went Wrong

Be honest.

## The Lesson

The takeaway.
```

## Move a Project to the Graveyard

1. Change the project's `status` to `completed` (removes it from the homepage)
2. Create a new graveyard entry with the post-mortem

## Preview Locally

```bash
npm run dev
# Opens at http://localhost:4321
```

## Build for Production

```bash
npm run build
# Output in dist/
```

## Deploy

Push to GitHub. Cloudflare Pages auto-builds on push.

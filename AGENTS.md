## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Adding a project

Each project is one Markdown file in `src/content/projects/`. The schema is in `src/content.config.ts`, and the build fails if the frontmatter doesn't match it.

- **Filename:** `<slug>.md`, in kebab-case. The filename becomes the URL, `/projects/<slug>/`.
- **Frontmatter:**
  - `title`: the display name.
  - `summary`: one sentence, shown on the project cards.
  - `stack`: an array of the main technologies, for example `[Kubernetes, ArgoCD, Bash]`.
  - `date`: `YYYY-MM-DD`. Use the date of the project's last real commit.
  - `repo` / `url`: optional, and must be full `https://` URLs.
  - `featured: true` shows the project on the home page; otherwise it only appears on `/projects/`.
  - `draft: true` hides it.
- **Body:** start with `## What it is`, then a few short `##` sections, such as the parts of the project or what went beyond the requirements. Keep it concise.
- **Accuracy:** base everything on the project's README and code. Never invent features or numbers. If it was a team project, say so.
- **Source:** locally, projects live in sibling folders (`../<name>`). Cloud and phone sessions don't have these, so work from the repo URL or from text the user pastes. If neither is available, ask.
- **Check:** run `npx astro build` and make sure it passes before committing.

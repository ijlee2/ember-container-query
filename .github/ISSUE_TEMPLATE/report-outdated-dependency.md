---
name: Report outdated dependency
about: Report outdated dependency
title: ''
labels: 'enhance: dependency'
assignees: ''

---

Hello! Thanks for taking time to make an outdated dependency report.

Before you make a new issue, please search for similar issues. It's possible that someone has made a request for update already.


## List outdated dependencies 🔗

When you ran `pnpm outdated -r`, what did you see?

```sh
┌───────────────┬─────────┬────────┬────────────────────────────────┐
│ Package       │ Current │ Latest │ Dependents                     │
├───────────────┼─────────┼────────┼────────────────────────────────┤
│ rollup (dev)  │ 3.21.3  │ 3.22.0 │ ember-container-query          │
├───────────────┼─────────┼────────┼────────────────────────────────┤
│ webpack (dev) │ 5.81.0  │ 5.82.1 │ docs-app, test-app             │
└───────────────┴─────────┴────────┴────────────────────────────────┘
```


## Risk analysis ⚠️

Are there breaking changes that we should be aware of? Please add links to the `CHANGELOG`s, if they are available.


## Additional context ➕

If needed, you can provide more context (e.g. reference materials, screenshots, GIFs) for the problem here.

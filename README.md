# idletorta

`idletorta` provides utilities for reading and working with Markdown task lists. The
project currently focuses on parsing `- [ ]` style checklist items, making it easy to
integrate Markdown-based planning documents into scripts or other tooling.

## Features
- Parse Markdown checklists into structured Python objects
- Track the section (heading) a task belongs to
- Command line interface for filtering and listing tasks

## Quick start
After installing the project in an environment with Python 3.11 or newer, tasks can be
listed directly from the command line:

```bash
idletorta --file tasks.md --pending
```

This command reads tasks from `tasks.md` and prints only the incomplete entries. Use
`--completed` to see completed items or omit both flags to show everything.

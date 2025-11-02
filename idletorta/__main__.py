"""Command line interface for the idletorta project."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path
from typing import Iterable, Sequence

from .tasks import Task, format_tasks, load_tasks


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="List tasks defined in a Markdown file.")
    parser.add_argument(
        "--file",
        "-f",
        type=Path,
        default=Path("tasks.md"),
        help="Path to the Markdown file that contains checklist items (default: tasks.md)",
    )

    status_group = parser.add_mutually_exclusive_group()
    status_group.add_argument("--completed", action="store_true", help="Show only completed tasks.")
    status_group.add_argument("--pending", action="store_true", help="Show only incomplete tasks.")

    parser.add_argument(
        "--section",
        "-s",
        action="append",
        help=(
            "Only include tasks under headings whose title matches the provided value. "
            "The option can be supplied multiple times to match several sections."
        ),
    )

    return parser


def _filter_tasks(tasks: Iterable[Task], *, completed: bool | None, sections: Sequence[str] | None) -> list[Task]:
    filtered = list(tasks)

    if completed is True:
        filtered = [task for task in filtered if task.completed]
    elif completed is False:
        filtered = [task for task in filtered if not task.completed]

    if sections:
        lowered = {section.lower() for section in sections}
        filtered = [task for task in filtered if task.section and task.section.lower() in lowered]

    return filtered


def main(argv: Sequence[str] | None = None) -> int:
    parser = _build_parser()
    args = parser.parse_args(argv)

    try:
        tasks = load_tasks(args.file)
    except FileNotFoundError:
        parser.error(f"Task file not found: {args.file}")

    completed_filter: bool | None
    if args.completed:
        completed_filter = True
    elif args.pending:
        completed_filter = False
    else:
        completed_filter = None

    filtered_tasks = _filter_tasks(tasks, completed=completed_filter, sections=args.section)

    output = format_tasks(filtered_tasks)
    if output:
        print(output)

    return 0


if __name__ == "__main__":  # pragma: no cover - command line entry point
    sys.exit(main())

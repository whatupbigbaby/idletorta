"""Command line interface for the idletorta project."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path
from typing import Iterable, Sequence

from .tasks import Task, format_tasks, load_tasks, update_task_status


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

    parser.add_argument(
        "--set-status",
        nargs=2,
        metavar=("LINE", "STATUS"),
        help=(
            "Update the checkbox on the specified line to the provided status before "
            "listing tasks. STATUS accepts values like 'complete' or 'pending'."
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


_TRUTHY_STATUS_VALUES = {"complete", "completed", "done", "true", "1", "finished", "yes"}
_FALSY_STATUS_VALUES = {"pending", "incomplete", "todo", "false", "0", "open", "no"}


def _normalize_status(value: str) -> bool:
    normalized = value.strip().lower()

    if normalized in _TRUTHY_STATUS_VALUES:
        return True
    if normalized in _FALSY_STATUS_VALUES:
        return False

    allowed = ", ".join(sorted(_TRUTHY_STATUS_VALUES | _FALSY_STATUS_VALUES))
    raise ValueError(f"STATUS must be one of: {allowed}.")


def main(argv: Sequence[str] | None = None) -> int:
    parser = _build_parser()
    args = parser.parse_args(argv)

    if args.set_status:
        line_argument, status_argument = args.set_status

        try:
            line_number = int(line_argument)
        except ValueError:
            parser.error("LINE must be an integer.")

        if line_number < 1:
            parser.error("LINE must be a positive integer.")

        try:
            completed = _normalize_status(status_argument)
        except ValueError as exc:
            parser.error(str(exc))

        try:
            update_task_status(args.file, line_number=line_number, completed=completed)
        except FileNotFoundError:
            parser.error(f"Task file not found: {args.file}")
        except ValueError as exc:
            parser.error(str(exc))

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

"""Command line interface for the idletorta project."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path
from typing import Iterable, Sequence

from .tasks import Task, format_tasks, load_tasks, update_task_completion


def _add_file_argument(parser: argparse.ArgumentParser) -> None:
    parser.add_argument(
        "--file",
        "-f",
        type=Path,
        default=Path("tasks.md"),
        help="Path to the Markdown file that contains checklist items (default: tasks.md)",
    )


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="List tasks defined in a Markdown file.")
    _add_file_argument(parser)

    subparsers = parser.add_subparsers(dest="command")

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

    update_parser = subparsers.add_parser("update", help="Update the completion state of tasks.")
    _add_file_argument(update_parser)
    update_parser.add_argument(
        "--line",
        "-l",
        action="append",
        type=int,
        required=True,
        help="Line number of the task to update. Can be supplied multiple times.",
    )
    update_parser.add_argument(
        "--status",
        choices=("completed", "pending"),
        required=True,
        help="Target status for the specified tasks.",
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

    command = getattr(args, "command", None)

    try:
        if command == "update":
            line_numbers = args.line or []
            completed = args.status == "completed"
            updated_tasks = update_task_completion(args.file, line_numbers, completed=completed)
            indexed = {task.line_number: task for task in updated_tasks}
            for number in line_numbers:
                task = indexed[number]
                status = "completed" if task.completed else "pending"
                print(f"Line {number} marked as {status}: {task.description}")
            return 0

        tasks = load_tasks(args.file)
    except FileNotFoundError:
        parser.error(f"Task file not found: {args.file}")
    except ValueError as exc:
        parser.error(str(exc))

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

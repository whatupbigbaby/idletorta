"""Core functionality for parsing Markdown-based task lists."""

from __future__ import annotations

import re

from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, List, Optional, Sequence


@dataclass(frozen=True)
class Task:
    """Represents a single Markdown checklist item."""

    description: str
    completed: bool
    section: Optional[str]
    line_number: int

    def __str__(self) -> str:  # pragma: no cover - convenience wrapper
        status = "[x]" if self.completed else "[ ]"
        section = f" ({self.section})" if self.section else ""
        return f"{status} {self.description}{section}"


def parse_markdown_tasks(text: str, *, default_section: str | None = None) -> List[Task]:
    """Parse Markdown text and return all checklist tasks.

    Parameters
    ----------
    text:
        The Markdown text to parse.
    default_section:
        Section name to use when no headings have been encountered yet.

    Returns
    -------
    list of :class:`Task`
        A list of structured tasks in the order they appear in the file.
    """

    tasks: List[Task] = []
    current_section = default_section
    in_fence = False
    fence_delimiter: str | None = None

    for line_number, raw_line in enumerate(text.splitlines(), start=1):
        stripped = raw_line.lstrip()

        if stripped.startswith("```") or stripped.startswith("~~~"):
            marker = stripped[:3]
            if in_fence and fence_delimiter == marker:
                in_fence = False
                fence_delimiter = None
            else:
                in_fence = True
                fence_delimiter = marker
            continue

        if in_fence:
            continue

        if stripped.startswith("#"):
            heading_level = len(stripped) - len(stripped.lstrip("#"))
            if heading_level >= 2:
                current_section = stripped[heading_level:].strip() or None
            elif heading_level == 1:
                # Reset to the top-level heading if present
                current_section = stripped[heading_level:].strip() or default_section
            continue

        if not stripped or stripped.startswith((">", "|")):
            continue

        bullet, _, remainder = stripped.partition(" ")
        if bullet not in {"-", "*", "+"}:
            continue

        remainder = remainder.lstrip()
        if not remainder.startswith("["):
            continue

        if len(remainder) < 4 or remainder[2] != "]":
            continue

        status_marker = remainder[1]
        if status_marker not in {"x", "X", " ", "-"}:
            continue

        description = remainder[4:].strip()
        if not description:
            continue

        tasks.append(
            Task(
                description=description,
                completed=status_marker in {"x", "X"},
                section=current_section,
                line_number=line_number,
            )
        )

    return tasks


def load_tasks(path: str | Path, *, encoding: str = "utf-8", default_section: str | None = None) -> List[Task]:
    """Load tasks from a Markdown file."""

    file_path = Path(path)
    text = file_path.read_text(encoding=encoding)
    return parse_markdown_tasks(text, default_section=default_section)


def format_tasks(tasks: Iterable[Task]) -> str:
    """Format tasks for presentation."""

    lines: List[str] = []
    for task in tasks:
        section_prefix = f"[{task.section}] " if task.section else ""
        checkbox = "[x]" if task.completed else "[ ]"
        lines.append(f"{checkbox} {section_prefix}{task.description}")
    return "\n".join(lines)


_CHECKBOX_PATTERN = re.compile(r"^(\s*[-*+]\s*\[)([ xX-])(\])(.*)$")


def _replace_checkbox(line: str, completed: bool) -> str:
    match = _CHECKBOX_PATTERN.match(line)
    if not match:
        raise ValueError("The specified line does not contain a Markdown task checkbox.")

    prefix, _, closing, suffix = match.groups()
    marker = "x" if completed else " "
    return f"{prefix}{marker}{closing}{suffix}"


def update_task_completion(
    path: str | Path,
    line_numbers: Sequence[int],
    *,
    completed: bool,
    encoding: str = "utf-8",
) -> List[Task]:
    """Update the completion status for the provided task line numbers.

    Parameters
    ----------
    path:
        Path to the Markdown file containing the task list.
    line_numbers:
        One or more 1-based line numbers pointing to checklist items within the file.
    completed:
        Whether the checkbox should be marked as completed.
    encoding:
        File encoding used when reading and writing the Markdown file.

    Returns
    -------
    list of :class:`Task`
        The updated task list after writing the changes to disk.
    """

    if not line_numbers:
        raise ValueError("At least one line number must be provided for updating tasks.")

    file_path = Path(path)
    text = file_path.read_text(encoding=encoding)
    newline = "\n" if text.endswith("\n") else ""
    lines = text.splitlines()

    tasks = parse_markdown_tasks(text)
    tasks_by_line = {task.line_number: task for task in tasks}

    missing = [str(number) for number in line_numbers if number not in tasks_by_line]
    if missing:
        missing_str = ", ".join(missing)
        raise ValueError(f"Line number(s) do not reference tasks: {missing_str}")

    for number in line_numbers:
        if number <= 0 or number > len(lines):
            raise ValueError(f"Line number out of range: {number}")
        index = number - 1
        lines[index] = _replace_checkbox(lines[index], completed)

    updated_text = "\n".join(lines) + newline
    file_path.write_text(updated_text, encoding=encoding)

    return parse_markdown_tasks(updated_text)

from __future__ import annotations

from pathlib import Path

import pytest

from idletorta.tasks import (
    format_tasks,
    load_tasks,
    parse_markdown_tasks,
    update_task_completion,
)


def test_parse_markdown_tasks_extracts_sections() -> None:
    markdown = """
# Title

## Planning
- [ ] Draft proposal
- [x] Review draft

## Execution
- [ ] Implement features
    """.strip()

    tasks = parse_markdown_tasks(markdown)

    assert [(task.description, task.completed, task.section) for task in tasks] == [
        ("Draft proposal", False, "Planning"),
        ("Review draft", True, "Planning"),
        ("Implement features", False, "Execution"),
    ]


def test_parse_markdown_tasks_ignores_code_fences() -> None:
    markdown = """
# Tasks

```
- [ ] Not real
```

- [x] Actual task
    """.strip()

    tasks = parse_markdown_tasks(markdown)
    assert len(tasks) == 1
    assert tasks[0].description == "Actual task"


def test_load_tasks_reads_from_disk(tmp_path: Path) -> None:
    data = """
## Section
- [ ] Pending work
- [x] Completed work
    """.strip()
    file_path = tmp_path / "tasks.md"
    file_path.write_text(data)

    tasks = load_tasks(file_path)
    assert [task.completed for task in tasks] == [False, True]


def test_format_tasks_creates_human_readable_output() -> None:
    markdown = """
## Section
- [x] Finished task
    """.strip()

    task = parse_markdown_tasks(markdown)[0]
    assert format_tasks([task]) == "[x] [Section] Finished task"


def test_update_task_completion_marks_tasks(tmp_path: Path) -> None:
    data = """
## Section
- [ ] Pending work
- [x] Completed work
    """.strip()
    file_path = tmp_path / "tasks.md"
    file_path.write_text(data)

    updated_tasks = update_task_completion(file_path, [2], completed=True)

    assert any(task.line_number == 2 and task.completed for task in updated_tasks)
    assert "[x] Pending work" in file_path.read_text()


def test_update_task_completion_rejects_invalid_line(tmp_path: Path) -> None:
    markdown = "- [ ] Valid task\n"
    file_path = tmp_path / "tasks.md"
    file_path.write_text(markdown)

    with pytest.raises(ValueError, match="do not reference tasks"):
        update_task_completion(file_path, [2], completed=True)


if __name__ == "__main__":  # pragma: no cover - allow running module directly for debugging
    pytest.main([__file__])

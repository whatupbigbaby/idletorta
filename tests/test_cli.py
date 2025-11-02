from __future__ import annotations

import subprocess
import sys
from pathlib import Path


def run_cli(arguments: list[str], cwd: Path | None = None) -> subprocess.CompletedProcess[str]:
    result = subprocess.run(
        [sys.executable, "-m", "idletorta", *arguments],
        cwd=cwd,
        check=False,
        text=True,
        capture_output=True,
    )
    return result


def test_cli_lists_tasks(tmp_path: Path) -> None:
    markdown = """
## Planning
- [ ] Draft proposal
- [x] Review draft
    """.strip()
    file_path = tmp_path / "tasks.md"
    file_path.write_text(markdown)

    result = run_cli(["--file", str(file_path), "--pending"])

    assert result.returncode == 0
    assert result.stdout.strip() == "[ ] [Planning] Draft proposal"


def test_cli_update_marks_task_complete(tmp_path: Path) -> None:
    markdown = """
## Planning
- [ ] Draft proposal
    """.strip()
    file_path = tmp_path / "tasks.md"
    file_path.write_text(markdown)

    tasks_path = str(file_path)
    result = run_cli(["update", "--file", tasks_path, "--line", "2", "--status", "completed"])

    assert result.returncode == 0
    assert "Line 2 marked as completed" in result.stdout
    assert "[x] Draft proposal" in file_path.read_text()


def test_cli_update_handles_missing_file(tmp_path: Path) -> None:
    missing = tmp_path / "missing.md"

    result = run_cli(["update", "--file", str(missing), "--line", "1", "--status", "pending"])

    assert result.returncode != 0
    assert "Task file not found" in result.stderr

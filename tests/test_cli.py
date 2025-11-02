from __future__ import annotations

from pathlib import Path

import pytest

from idletorta.__main__ import main


def test_cli_set_status_updates_file(tmp_path: Path, capsys: pytest.CaptureFixture[str]) -> None:
    file_path = tmp_path / "tasks.md"
    file_path.write_text("- [ ] Task\n")

    exit_code = main(["--file", str(file_path), "--set-status", "1", "complete"])

    assert exit_code == 0
    assert file_path.read_text() == "- [x] Task\n"

    captured = capsys.readouterr()
    assert "[x] Task" in captured.out


def test_cli_set_status_supports_pending_keyword(tmp_path: Path) -> None:
    file_path = tmp_path / "tasks.md"
    file_path.write_text("- [x] Task\n")

    exit_code = main(["--file", str(file_path), "--set-status", "1", "pending"])

    assert exit_code == 0
    assert file_path.read_text() == "- [ ] Task\n"


def test_cli_set_status_rejects_unknown_status(tmp_path: Path, capsys: pytest.CaptureFixture[str]) -> None:
    file_path = tmp_path / "tasks.md"
    file_path.write_text("- [ ] Task\n")

    with pytest.raises(SystemExit) as excinfo:
        main(["--file", str(file_path), "--set-status", "1", "maybe"])

    assert excinfo.value.code == 2
    captured = capsys.readouterr()
    assert "STATUS must be one of" in captured.err

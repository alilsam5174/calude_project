# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Python 3.11+ project using a `src` layout. Distribution/package name: `app`.

## Environment

- The real interpreter is reachable as `py -3.11` (the bare `python` command is
  the Windows Store stub and must not be used outside an activated venv).
- Always work inside the virtual environment at `.venv`.
  Activate with `.\.venv\Scripts\Activate.ps1` (PowerShell).
- Dependency management is via `pip` + `pyproject.toml` (no uv installed).

## Common commands

```powershell
py -3.11 -m venv .venv                 # create venv (first time)
.\.venv\Scripts\Activate.ps1           # activate
pip install -e ".[dev]"                # install project + dev tools
pytest                                 # run tests
ruff check .                           # lint
ruff format .                          # format
```

## Conventions

- Source lives in `src/app/`; tests in `tests/` named `test_*.py`.
- Keep `ruff` clean (lint rules: E, F, I, UP, B; line length 100).
- The CLI entry point is `app.cli:main`, exposed as the `app` console script.
- Add new dependencies to `[project.dependencies]` in `pyproject.toml`,
  then re-run `pip install -e ".[dev]"`.

# app

A Python project.

## Setup

This project uses Python 3.11+ and a virtual environment.

```powershell
# Create the virtual environment (uses the py launcher)
py -3.11 -m venv .venv

# Activate it
.\.venv\Scripts\Activate.ps1

# Install the project + dev tools in editable mode
pip install -e ".[dev]"
```

Once the venv is activated, the bare `python` and `pip` commands point at the
project interpreter (not the Windows Store stub).

## Usage

```powershell
app            # prints "Hello, world!"
app Ada        # prints "Hello, Ada!"
```

## Development

```powershell
pytest         # run tests
ruff check .   # lint
ruff format .  # format
```

## Layout

```
src/app/        # package source (src layout)
tests/          # pytest tests
pyproject.toml  # project metadata, dependencies, tool config
```

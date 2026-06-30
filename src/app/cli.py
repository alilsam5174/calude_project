"""Command-line entry point for the app package."""

from __future__ import annotations

import argparse


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(prog="app", description="A Python project.")
    parser.add_argument("name", nargs="?", default="world", help="who to greet")
    args = parser.parse_args(argv)
    print(f"Hello, {args.name}!")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

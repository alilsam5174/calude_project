from app.cli import main


def test_main_default(capsys):
    assert main([]) == 0
    assert "Hello, world!" in capsys.readouterr().out


def test_main_with_name(capsys):
    assert main(["Ada"]) == 0
    assert "Hello, Ada!" in capsys.readouterr().out

from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_get_post():
    response = client.get('/post/1')
    assert response.status_code == 200


def test_get_posts():
    response = client.get('/posts')
    assert response.status_code == 200

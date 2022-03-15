from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_get_post():
    response = client.get('/post/2')
    assert response.status_code == 200
    assert response.json() == {
        "title": "new test",
        "author_name": "mezgoodle",
        "body": "string",
        "id": 2,
        "created_at": "2022-03-08T07:26:21.092971",
        "updated_at": "2022-03-11T09:18:17.861890",
    }


def test_get_posts():
    response = client.get('/posts')
    assert response.status_code == 200

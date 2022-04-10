from fastapi.testclient import TestClient

from main import app

client = TestClient(app)
NEW_POST_ID: int = 5


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


def test_post_post():
    token_response = client.post(
        '/login',
        data={'username': "user@example.com", 'password': "string"})
    access_token = token_response.json()['access_token']
    response = client.post(
        '/post',
        json={
            "title": "test string",
            "author_name": "string_1",
            "body": "test string"
        },
        headers={'Authorization': f'Bearer {access_token}'}
    )
    assert response.status_code == 201
    print(response.json())
    print(response.json()['id'])
    print(response.__dict__)
    print(response.json().__dict__)


def test_update_post():
    token_response = client.post(
        '/login',
        data={'username': "user@example.com", 'password': "string"})
    access_token = token_response.json()['access_token']
    response = client.patch(
        f'/post/{NEW_POST_ID}',
        json={
            "author_name": "string"
        },
        headers={'Authorization': f'Bearer {access_token}'}
    )
    assert response.status_code == 202


def test_delete_post():
    token_response = client.post(
        '/login',
        data={'username': "user@example.com", 'password': "string"})
    access_token = token_response.json()['access_token']
    response = client.delete(
        f'/post/{NEW_POST_ID}',
        headers={'Authorization': f'Bearer {access_token}'}
    )
    assert response.status_code == 204

from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def get_token() -> str:
    token_response = client.post(
        "/login", data={"username": "user@example.com", "password": "string"}
    )
    access_token = token_response.json()["access_token"]
    return access_token


access_token = get_token()


def test_get_user():
    response = client.get(
        "/post/user@example.com", headers={"Authorization": f"Bearer {access_token}"}
    )
    assert response.status_code == 200


def test_get_users():
    response = client.get("/users", headers={"Authorization": f"Bearer {access_token}"})
    assert response.status_code == 200


def test_post_user():
    response = client.post(
        "/register",
        json={{"name": "string", "email": "user1@example.com", "password": "string"}},
        headers={"Authorization": f"Bearer {access_token}"},
    )
    assert response.status_code == 201


def test_update_user():
    response = client.patch(
        "/user/user1@example.com",
        json={"name": "mezgoodle1"},
        headers={"Authorization": f"Bearer {access_token}"},
    )
    assert response.status_code == 202


def test_delete_user():
    response = client.delete(
        "/user/user1@example.com", headers={"Authorization": f"Bearer {access_token}"}
    )
    assert response.status_code == 204

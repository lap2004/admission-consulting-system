import pytest

@pytest.mark.asyncio
async def test_health_check(async_client):
    response = await async_client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "up and running" in data["message"]

@pytest.mark.asyncio
async def test_openapi_schema(async_client):
    response = await async_client.get("/openapi.json")
    assert response.status_code == 200
    data = response.json()
    assert "openapi" in data
    assert data["info"]["title"] == "VLU AI Chatbot"

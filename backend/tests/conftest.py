import pytest
from httpx import AsyncClient, ASGITransport
import os
import sys

# Add the backend directory to sys.path so 'app' can be imported
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.main import app

@pytest.fixture
def anyio_backend():
    return "asyncio"

@pytest.fixture
async def async_client():
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test"
    ) as client:
        yield client

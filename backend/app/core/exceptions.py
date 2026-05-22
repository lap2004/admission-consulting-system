from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from typing import Any, Dict

class AppException(Exception):
    """Custom Base Exception for the application"""
    def __init__(self, code: int, message: str, data: Any = None):
        self.code = code
        self.message = message
        self.data = data

async def app_exception_handler(request: Request, exc: AppException):
    return JSONResponse(
        status_code=exc.code,
        content={
            "status": "error",
            "code": exc.code,
            "message": exc.message,
            "data": exc.data,
        },
    )

async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "status": "error",
            "code": exc.status_code,
            "message": exc.detail,
            "data": None,
        },
    )

async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = exc.errors()
    simplified_errors = []
    for error in errors:
        simplified_errors.append({
            "loc": ".".join([str(x) for x in error.get("loc", [])]),
            "msg": error.get("msg"),
            "type": error.get("type")
        })
        
    return JSONResponse(
        status_code=422,
        content={
            "status": "error",
            "code": 422,
            "message": "Validation Error",
            "data": simplified_errors,
        },
    )

async def general_exception_handler(request: Request, exc: Exception):
    # Log the exception details here if needed
    import traceback
    print(traceback.format_exc())
    
    return JSONResponse(
        status_code=500,
        content={
            "status": "error",
            "code": 500,
            "message": "Internal Server Error",
            "data": None,
        },
    )

def setup_exception_handlers(app):
    app.add_exception_handler(AppException, app_exception_handler)
    app.add_exception_handler(StarletteHTTPException, http_exception_handler)
    app.add_exception_handler(RequestValidationError, validation_exception_handler)
    app.add_exception_handler(Exception, general_exception_handler)

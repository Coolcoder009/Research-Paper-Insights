from fastapi.responses import JSONResponse


def success_response(response, message = "Success", status_code = 200):
    return JSONResponse(
        content = {
            "status": "success",
            "message": message,
            "response": response if response is not None else [],
            "status_code": status_code
        }
    )
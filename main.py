

import httpx
import base64
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from PIL import Image
import io
from dotenv import load_dotenv
import os

load_dotenv()
app = FastAPI()

# Serve static files (frontend)
app.mount("/static", StaticFiles(directory="."), name="static")

@app.get("/")
async def read_index():
    return FileResponse("index.html")

@app.get("/landing")
async def read_landing():
    return FileResponse("landing.html")

@app.get("/redirect")
async def read_redirect():
    return FileResponse("redirect.html")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY")
RAPIDAPI_HOST = os.getenv("RAPIDAPI_HOST")
RAPIDAPI_URL = os.getenv("RAPIDAPI_URL")


@app.post("/tryon/")


async def try_on_file(
    avatar_image: UploadFile = File(...),
    clothing_image: UploadFile = File(...),
):
    print(f"Received try-on request: avatar={avatar_image.filename}, clothing={clothing_image.filename}")
    try:
       
        files = {
            "avatar_image": (avatar_image.filename, await avatar_image.read(), avatar_image.content_type),
            "clothing_image": (clothing_image.filename, await clothing_image.read(), clothing_image.content_type),
        }

        headers = {
            "X-RapidAPI-Key": RAPIDAPI_KEY,
            "X-RapidAPI-Host": RAPIDAPI_HOST,
        }

        async with httpx.AsyncClient(timeout=120.0) as client:
            response = await client.post(RAPIDAPI_URL, files=files, headers=headers)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)

        
        return StreamingResponse(
            iter([response.content]),
            media_type="image/png",
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/validate-images")
async def validate_images(
    avatar_image: UploadFile = File(...),
    clothing_image: UploadFile = File(...),
):
    """Validate uploaded images for quality and compatibility"""
    try:
        # Read and validate avatar image
        avatar_data = await avatar_image.read()
        avatar_img = Image.open(io.BytesIO(avatar_data))
        
        # Read and validate clothing image
        clothing_data = await clothing_image.read()
        clothing_img = Image.open(io.BytesIO(clothing_data))
        
        # Basic validation
        validation_results = {
            "avatar": {
                "size": avatar_img.size,
                "format": avatar_img.format,
                "mode": avatar_img.mode,
                "valid": True
            },
            "clothing": {
                "size": clothing_img.size,
                "format": clothing_img.format,
                "mode": clothing_img.mode,
                "valid": True
            },
            "recommendations": []
        }
        
        # Add recommendations
        if avatar_img.size[0] < 512 or avatar_img.size[1] < 512:
            validation_results["recommendations"].append("Avatar image should be at least 512x512 pixels for best results")
        
        if clothing_img.size[0] < 256 or clothing_img.size[1] < 256:
            validation_results["recommendations"].append("Clothing image should be at least 256x256 pixels for best results")
        
        if avatar_img.mode != 'RGB':
            validation_results["recommendations"].append("Avatar image should be in RGB format")
        
        if clothing_img.mode != 'RGB':
            validation_results["recommendations"].append("Clothing image should be in RGB format")
        
        return JSONResponse(content=validation_results)
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Image validation failed: {str(e)}")

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "Virtual Try-On API is running"}

@app.get("/tryon/")
async def try_on_test():
    """Test endpoint for try-on route"""
    return {"message": "Try-on endpoint is accessible"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
# print("RAPIDAPI_URL =", RAPIDAPI_URL)
from fastapi import FastAPI

from pydantic import BaseModel

from model.predict import (
    predict_disease
)

app = FastAPI()

class ImageRequest(
    BaseModel
):
    imageUrl: str

@app.get("/")
def home():
    return {
        "message":
        "AI Disease Detection API Running"
    }

@app.post("/predict")
async def predict(
    data: ImageRequest
):

    result = predict_disease(
            data.imageUrl
        )

    return result
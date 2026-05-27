from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


# Request schema
class ImageRequest(BaseModel):
    imageUrl: str


@app.get("/")
def home():
    return {
        "message":
        "AI Disease Detection API Running"
    }


@app.post("/predict")
async def predict_disease(
    data: ImageRequest
):

    print("Received Data:", data)

    print("Image URL:", data.imageUrl)

    return {
        "disease":
        "Tomato Early Blight",

        "confidence":
        "94%",

        "treatment":
        "Use copper fungicide and avoid overwatering."
    }
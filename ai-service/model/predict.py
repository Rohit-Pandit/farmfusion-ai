import numpy as np

from PIL import Image

import requests

from io import BytesIO

import tensorflow as tf

from model.classes import classes


# Load trained model
model = tf.keras.models.load_model(
    "model/model.h5"
)


def predict_disease(
    image_url
):

    
    response = requests.get(
        image_url
    )

    image = Image.open(
        BytesIO(response.content)
    ).convert("RGB")

    
    image = image.convert("RGB")

    
    image = image.resize(
        (224, 224)
    )

    
    image_array = np.array(
        image
    )

    
    image_array = (
        image_array / 255.0
    )

    
    image_array = np.expand_dims(
        image_array,
        axis=0
    )
    
    print(
    "Image Shape:",
    image_array.shape
   )
    
    predictions = model.predict(
        image_array
    )

    print(
        "Predictions:",
        predictions
    )

    predicted_index = np.argmax(
        predictions
    )

    confidence = np.max(
        predictions
    ) * 100

    disease = classes[
        predicted_index
    ]

    return {
        "disease":
        disease,

        "confidence":
        f"{confidence:.2f}%",

        "treatment":
        "Recommended treatment coming soon."
    }
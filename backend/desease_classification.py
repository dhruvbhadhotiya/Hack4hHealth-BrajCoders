from pathlib import Path
from PIL import Image
from transformers import AutoModelForImageClassification, AutoImageProcessor
import io
import torch

#  Load model and processor at the module level
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "models" / "dinov2-base"
MODEL_DIR = str(MODEL_DIR.as_posix())  # Ensure POSIX-safe path

#  Load processor and model

image_processor = AutoImageProcessor.from_pretrained(MODEL_DIR)
model = AutoModelForImageClassification.from_pretrained(MODEL_DIR)
# model.eval()  # Set model to evaluation mode

def describe_desease(image_file) -> str:
    try:
        # Read image and convert to RGB
        image1 = Image.open(io.BytesIO(image_file.read()))

        #  Preprocess image
        encoding = image_processor(image1.convert("RGB"), return_tensors="pt")

        #  Generate caption
        with torch.no_grad():
            outputs = model(**encoding)
            logits = outputs.logits
            predicted_class_idx = logits.argmax(-1).item()
        #  Decode and return caption
        class_names = ['Basal Cell Carcinoma', 'Darier_s Disease', 'Epidermolysis Bullosa Pruriginosa', 'Hailey-Hailey Disease', 'Herpes Simplex', 'Impetigo', 'Larva Migrans', 'Leprosy Borderline', 'Leprosy Lepromatous', 'Leprosy Tuberculoid', 'Lichen Planus', 'Lupus Erythematosus Chronicus Discoides', 'Melanoma', 'Molluscum Contagiosum', 'Mycosis Fungoides', 'Neurofibromatosis', 'Papilomatosis Confluentes And Reticulate', 'Pediculosis Capitis', 'Pityriasis Rosea', 'Porokeratosis Actinic', 'Psoriasis', 'Tinea Corporis', 'Tinea Nigra', 'Tungiasis', 'actinic keratosis', 'dermatofibroma', 'nevus', 'pigmented benign keratosis', 'seborrheic keratosis', 'squamous cell carcinoma', 'vascular lesion']
        predicted_class_name = class_names[predicted_class_idx]
        return predicted_class_name

    except Exception as e:
        return f"Error generating caption: {str(e)}"

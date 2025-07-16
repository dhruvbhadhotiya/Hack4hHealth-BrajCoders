from pathlib import Path
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
import io
import torch

#  Load model and processor at the module level
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "models" / "blip_pytorch"
MODEL_DIR = str(MODEL_DIR.as_posix())  # Ensure POSIX-safe path

#  Load processor and model
processor = BlipProcessor.from_pretrained(MODEL_DIR)
model = BlipForConditionalGeneration.from_pretrained(MODEL_DIR)
# model.eval()  # Set model to evaluation mode

def generate_caption(image_file) -> str:
    """
    Generate a descriptive caption for an image file using BLIP.
    """
    try:
        # Read image and convert to RGB
        image = Image.open(io.BytesIO(image_file.read())).convert("RGB")

        #  Preprocess image
        inputs = processor(images=image, return_tensors="pt")

        #  Generate caption
        with torch.no_grad():
            output = model.generate(**inputs, max_new_tokens=30)

        #  Decode and return caption
        caption = processor.decode(output[0], skip_special_tokens=True)
        return caption.strip()

    except Exception as e:
        return f"Error generating caption: {str(e)}"

# Test the module directly
if __name__ == "__main__":
    test_image_path = "sample_cat.jpg"  

    try:
        with open(test_image_path, "rb") as f:
            caption = generate_caption(f)
            print(f"Generated Caption: {caption}")
    except FileNotFoundError:
        print(f"❌ Could not find test image at: {test_image_path}")
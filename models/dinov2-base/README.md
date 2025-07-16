---
license: apache-2.0
base_model: facebook/dinov2-base
metrics:
- accuracy
model-index:
- name: dinov2-base-finetuned-SkinDisease
  results:
  - task:
      name: Image Classification
      type: Skin_Disease-classification
    dataset:
      name: ISIC 2018+Atlas Dermatology
      type: Local
      config: default
      split: train
      args: default
    metrics:
    - name: Accuracy
      type: accuracy
      value: 0.9556772908366534
---

<!-- This model card has been generated automatically according to the information the Trainer had access to. You
should probably proofread and complete it, then remove this comment. -->

# dinov2-base-finetuned-SkinDisease

This model is a fine-tuned version of [facebook/dinov2-base](https://huggingface.co/facebook/dinov2-base) on the Custom dataset.
It achieves the following results on the evaluation set:
- Loss: 0.1321
- Accuracy: 0.9557


## Model description

The Vision Transformer (ViT) is a transformer encoder model (BERT-like) pre-trained on a large collection of images in a self-supervised fashion.

Images are presented to the model as a sequence of fixed-size patches, which are linearly embedded. One also adds a [CLS] token to the beginning of a sequence to use it for classification tasks. One also adds absolute position embeddings before feeding the sequence to the layers of the Transformer encoder.

Note that this model does not include any fine-tuned heads.

By pre-training the model, it learns an inner representation of images that can then be used to extract features useful for downstream tasks: if you have a dataset of labeled images for instance, you can train a standard classifier by placing a linear layer on top of the pre-trained encoder. One typically places a linear layer on top of the [CLS] token, as the last hidden state of this token can be seen as a representation of an entire image.


## How to use

```python
import torch
from transformers import AutoModelForImageClassification, AutoImageProcessor

repo_name = "Jayanth2002/dinov2-base-finetuned-SkinDisease"
image_processor = AutoImageProcessor.from_pretrained(repo_name)
model = AutoModelForImageClassification.from_pretrained(repo_name)

# Load and preprocess the test image
image_path = "/content/img_416.jpg"
image = Image.open(image_path)
encoding = image_processor(image.convert("RGB"), return_tensors="pt")

# Make a prediction
with torch.no_grad():
    outputs = model(**encoding)
    logits = outputs.logits

predicted_class_idx = logits.argmax(-1).item()

# Get the class name
class_names = ['Basal Cell Carcinoma', 'Darier_s Disease', 'Epidermolysis Bullosa Pruriginosa', 'Hailey-Hailey Disease', 'Herpes Simplex', 'Impetigo', 'Larva Migrans', 'Leprosy Borderline', 'Leprosy Lepromatous', 'Leprosy Tuberculoid', 'Lichen Planus', 'Lupus Erythematosus Chronicus Discoides', 'Melanoma', 'Molluscum Contagiosum', 'Mycosis Fungoides', 'Neurofibromatosis', 'Papilomatosis Confluentes And Reticulate', 'Pediculosis Capitis', 'Pityriasis Rosea', 'Porokeratosis Actinic', 'Psoriasis', 'Tinea Corporis', 'Tinea Nigra', 'Tungiasis', 'actinic keratosis', 'dermatofibroma', 'nevus', 'pigmented benign keratosis', 'seborrheic keratosis', 'squamous cell carcinoma', 'vascular lesion']
predicted_class_name = class_names[predicted_class_idx]

print(predicted_class_name)
```

### Training hyperparameters

The following hyperparameters were used during training:
- learning_rate: 5e-05
- train_batch_size: 32
- eval_batch_size: 32
- seed: 42
- gradient_accumulation_steps: 4
- total_train_batch_size: 128
- optimizer: Adam with betas=(0.9,0.999) and epsilon=1e-08
- lr_scheduler_type: linear
- lr_scheduler_warmup_ratio: 0.1
- num_epochs: 10

### Training results

| Training Loss | Epoch | Step | Validation Loss | Accuracy |
|:-------------:|:-----:|:----:|:---------------:|:--------:|
| 0.9599        | 1.0   | 282  | 0.6866          | 0.7811   |
| 0.6176        | 2.0   | 565  | 0.4806          | 0.8399   |
| 0.4614        | 3.0   | 847  | 0.3092          | 0.8934   |
| 0.3976        | 4.0   | 1130 | 0.2620          | 0.9141   |
| 0.3606        | 5.0   | 1412 | 0.2514          | 0.9208   |
| 0.3075        | 6.0   | 1695 | 0.1968          | 0.9320   |
| 0.2152        | 7.0   | 1977 | 0.2004          | 0.9377   |
| 0.2194        | 8.0   | 2260 | 0.1627          | 0.9442   |
| 0.1706        | 9.0   | 2542 | 0.1449          | 0.9500   |
| 0.172         | 9.98  | 2820 | 0.1321          | 0.9557   |


### Framework versions

- Transformers 4.33.2
- Pytorch 2.0.0
- Datasets 2.1.0
- Tokenizers 0.13.3

## Kindly Cite Our Work 
```bibtex
@article{mohan2024enhancing,
  title={Enhancing skin disease classification leveraging transformer-based deep learning architectures and explainable ai},
  author={Mohan, Jayanth and Sivasubramanian, Arrun and Sowmya, V and Vinayakumar, Ravi},
  journal={arXiv preprint arXiv:2407.14757},
  year={2024}
}
```
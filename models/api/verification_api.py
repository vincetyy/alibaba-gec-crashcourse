from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from transformers import BertTokenizer, TFBertForSequenceClassification
import tensorflow as tf
from openai import OpenAI

# Load environment variables
load_dotenv()

# Initialize OpenAI API
client = OpenAI(
  api_key=os.environ['OPENAI_API_KEY'],  # this is also the default, it can be omitted
)

# Load fine-tuned model and tokenizer
model = TFBertForSequenceClassification.from_pretrained('resources/fine_tuned_bert_model')
tokenizer = BertTokenizer.from_pretrained('resources/fine_tuned_bert_tokenizer')

# Initialize FastAPI app
app = FastAPI()

class ProductDescription(BaseModel):
    description: str

def extract_item_type(product_description: str) -> str:
    MODEL = "gpt-4o-mini"
    PROMPT_ENGINEERING_CONTENT = "You are an expert at extracting important product attributes from e-commerce listings..."
    EXAMPLE1 = "Portable Folding Mini Fan 4000mAh 5 Gears USB Rechargeable Adjustable Handheld Fan..."
    EXAMPLE2 = "Malaysia HIGH SPEED eSIM Ultra 1-15 Days Daily 500MB-6GB Unlimited Data..."
    ANSWER1 = "Portable folding mini fan"
    ANSWER2 = "Malaysia eSIM SIM card"

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": PROMPT_ENGINEERING_CONTENT},
            {"role": "user", "content": "Help me extract the type of item this product description is selling."},
            {"role": "assistant", "content": "Sure, I'd be happy to!"},
            {"role": "user", "content": EXAMPLE1},
            {"role": "assistant", "content": ANSWER1},
            {"role": "user", "content": EXAMPLE2},
            {"role": "assistant", "content": ANSWER2},
            {"role": "user", "content": product_description},
        ],
        temperature=0,
    )

    item_type = response.choices[0].message.content
    return item_type

def verify_exportability(item_type: str) -> bool:
    inputs = tokenizer(item_type, return_tensors='tf', padding=True, truncation=True, max_length=128)
    predictions = model.predict(inputs['input_ids'])
    probabilities = tf.nn.softmax(predictions.logits, axis=-1)
    predicted_classes = tf.argmax(probabilities, axis=1).numpy()
    return bool(predicted_classes[0] == 1)

@app.post("/")
async def verify_product(product: ProductDescription):
    try:
        item_type = extract_item_type(product.description)
        is_exportable = verify_exportability(item_type)
        return {"item_type": item_type, "exportable": is_exportable}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

'''This code uses a large language model to extract product attributes from e-commerce listings, 
which is fed into a module of an MNN that verifies the product's exportability into the region.'''

from openai import OpenAI
import os
from dotenv import load_dotenv
from transformers import BertTokenizer, TFBertForSequenceClassification
import tensorflow as tf

# VINCE: enter user's product details into this variable (first one is PMD output 0 -- not verified, second one is jacket output 1 -- verified)
product_description = "a UL2272 suitable for MRT 48V 2 Seated motorized PMD with power-assisted features. 48V, can go up to 68KM with full-charge"
product_description = "Double Sided Wear Korean Fleece Lining Thickened Wool Padded Jacket Zipper Hooded Women's Winter. If You Are Not Sure About The Size, You Can Leave A Message To Customer Service For Your Height And Weight And Preference (Loose Or Fit) After Placing The Order, And You Will Send You The Corresponding Matching Size When Shipping"

def is_exportable(product_description):
    ''' This method returns a boolean value of whether the product is exportable or not into the region
    YOU MAY ONLY RUN THIS METHOD AFTER RUNNING THE MNN-finetune.py FILE TO GENERATE AND STORE THE MODEL AND TOKENIZER IN THEIR RESP. FOLDERS
    '''

    load_dotenv()
    openai_api_key = os.getenv('OPENAI_API_KEY')
    client = OpenAI(api_key=openai_api_key)

    MODEL = "gpt-4o-mini"
    PROMPT_ENGINEERING_CONTENT = "You are an expert at extracting important product attributes from e-commerce listings. You will extract any relevant attributes from the product description so to let the user know the type of item that is being sold, which will be required to check if it complies with global export regulations in a future step that you do not need to be a part of."
    EXAMPLE1 = "Portable Folding Mini Fan 4000mAh 5 Gears USB Rechargeable Adjustable Handheld Fan Strong Wind Air Turbo Cooler 1. SG Local Stock 2. 1-2 Days Fast delivery 3. Next Day Delivery Service Available 4000mAh Model Detail as Below"
    EXAMPLE2 = "Malaysia HIGH SPEED eSIM Ultra 1-15 Days Daily 500MB-6GB Unlimited Data|Instant Email Delivery|High Speed Data Malaysia SIM Card quality cashback guarantee"
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
    print(f'Your item was found to be a [{item_type}]')

    # load fine-tuned model
    model = TFBertForSequenceClassification.from_pretrained('fine_tuned_bert_model')
    tokenizer = BertTokenizer.from_pretrained('fine_tuned_bert_tokenizer')

    # tokenise the product details (should be much faster since the model is already loaded)
    new_inputs = tokenizer(item_type, return_tensors='tf', padding=True, truncation=True, max_length=128)
    predictions = model.predict(new_inputs['input_ids'])

    # softmax for binary classification task
    probabilities = tf.nn.softmax(predictions.logits, axis=-1)
    predicted_classes = tf.argmax(probabilities, axis=1).numpy()

    # VINCE: predicted_class -- verified == 1, not verified == 0. if not verified, redirect to chatbot
    print(predicted_classes)
    return True if predicted_classes[0] == 1 else False
'''This code uses a large language model to extract product attributes from e-commerce listings, 
which has been shown to be the state-of-the-art, even overpowering named entity recognition models,
in product attribute extraction.'''

from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
openai_api_key = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=openai_api_key)

MODEL = "gpt-4o-mini"
PROMPT_ENGINEERING_CONTENT = "You are an expert at extracting important product attributes from e-commerce listings. You will extract any relevant attributes from the product description so to let the user know the type of item that is being sold, which will be required to check if it complies with global export regulations in a future step that you do not need to be a part of."
EXAMPLE1 = "Portable Folding Mini Fan 4000mAh 5 Gears USB Rechargeable Adjustable Handheld Fan Strong Wind Air Turbo Cooler 1. SG Local Stock 2. 1-2 Days Fast delivery 3. Next Day Delivery Service Available 4000mAh Model Detail as Below"
EXAMPLE2 = "Malaysia HIGH SPEED eSIM Ultra 1-15 Days Daily 500MB-6GB Unlimited Data|Instant Email Delivery|High Speed Data Malaysia SIM Card quality cashback guarantee"
ANSWER1 = "Portable folding mini fan"
ANSWER2 = "Malaysia eSIM SIM card"

# VINCE: enter user's product details in first page into this variable
product_description = "a UL2272 suitable for MRT 48V 2 Seated motorized PMD with power-assisted features. 48V, can go up to 68KM with full-charge"

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

print(response.choices[0].message.content)
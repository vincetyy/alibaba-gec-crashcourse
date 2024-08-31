# AliAdapt Backend Models

This project is a comprehensive system designed to verify whether a product can be exported into a specific region without additional permits. If it can, a verification checkmark will be given for the seller to export their product into the desired country. If not, a retrieval augmented chatbot will aid them in obtaining the necessary permits and licenses to do so.

The system comprises three main components:

**1. Product Attribute Extraction**: This component uses a state-of-the-art Large Language Model (LLM) based on GPT-4o mini to extract key attributes from product descriptions. Recent research indicates that LLMs have surpassed traditional Named Entity Recognition (NER) methods in accurately identifying and extracting relevant attributes from text.

**2. Product Classification Model**: A fine-tuned BERT model is used to classify whether a product is eligible for export into the target region without additional permits.

**3. Retrieval-Augmented Language Model Chatbot**: If a product is found ineligible for export, the system redirects to a chatbot that provides guidance on obtaining the necessary permits based on regulatory compliance rules.

## Project Structure

- **`verification_sg.py`**: This script extracts product attributes using a GPT-4o mini model, then uses a fine-tuned BERT model to classify products as eligible or ineligible for export, thereby granting the user the verification mark, or redirecting them to our chatbot.
- **`chatbot_stream.py`**: This script runs a Retrieval-Augmented Large Language Model (LLM) chatbot that provides resources and guidance on obtaining necessary permits for ineligible products.

## Notes

**Data Limitations**: Currently, the chatbot only contains regulatory data for Singapore's regulations. Additional data is required for other countries, which can be added by expanding the dataset and generating new embeddings. The reason why we chose to stick with only a small dataset for our project is because embedding a larger dataset and retrieving embeddings from a large vector space can be expensive and require lots of computing power, which we do not have as students. 

**Model Training**: The BERT model and tokenizer must be fine-tuned before running the classification script. Using the script in the resources folder, the appropriate folders to store the model and tokenizer will be generated, after which `verification_sg.py` can be run.

## Future Improvements

**Expand Regulatory Data**: Add more countries and regulatory data to the database for broader applicability, if we have the resources to do so (time, data, and computing power)

## Additional work

My colleagues are creating an front-end interface to integrate these models as part of our submission to Alibaba's Global E-commerce Challenge (GEC) for the final round. This will serve as our prototype and a demo video using these models will be filmed for our final presentation.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
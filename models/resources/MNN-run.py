'''This code loads the fine-tuned BERT tokenizer and model, 
and performs the classification task on the product that the user is trying to get verified.'''

from transformers import BertTokenizer, TFBertForSequenceClassification
import tensorflow as tf

# load fine-tuned model
model = TFBertForSequenceClassification.from_pretrained('fine_tuned_bert_model')
tokenizer = BertTokenizer.from_pretrained('bert_tokenizer') # load bert tokenizer: wordpiece

# VINCE: user's product details to be entered here
product = [
    "a motorized personal mobility device with power-assisted features",
]

# tokenise the product details (should be much faster since the model is already loaded)
new_inputs = tokenizer(product, return_tensors='tf', padding=True, truncation=True, max_length=128)
predictions = model.predict(new_inputs['input_ids'])

# softmax for binary classification task
probabilities = tf.nn.softmax(predictions.logits, axis=-1)
predicted_classes = tf.argmax(probabilities, axis=1).numpy()

# VINCE: predicted_class -- verified == 1, not verified == 0. if not verified, redirect to chatbot
print(predicted_classes)

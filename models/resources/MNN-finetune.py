'''This code generates the fine-tuned BERT model and fine-tuned BERT tokenizer on our data and saves them to be loaded later. 
we include 30% of our layers to be dropout layers in order to prevent overfitting to data.'''

import os

os.environ['TF_USE_LEGACY_KERAS'] = '1'
from transformers import BertTokenizer, TFBertForSequenceClassification
import tensorflow as tf
import numpy as np
from sklearn.model_selection import train_test_split

LR = 2e-5
NUM_EPOCHS = 10

# load our data files and assign labels
def load_texts_and_labels(file_path, label):
    with open(file_path, 'r') as file:
        texts = file.readlines()
    labels = [label] * len(texts)
    return texts, labels

exportable_texts, exportable_labels = load_texts_and_labels('../data/exportable/exportable.txt', 1)  # pass verification check
non_exportable_texts, non_exportable_labels = load_texts_and_labels('../data/exportable/non_exportable.txt', 0)  # fail verification check
texts = exportable_texts + non_exportable_texts
labels = np.array(exportable_labels + non_exportable_labels)

# load pre-trained BERT tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

# tokenise input
inputs = tokenizer(texts, return_tensors='tf', padding=True, truncation=True, max_length=128)
input_ids = inputs['input_ids']
input_ids_numpy = inputs['input_ids'].numpy()
labels = tf.convert_to_tensor(labels)
labels_numpy = labels.numpy()

# split data into training and validation
X_train, X_val, y_train, y_val = train_test_split(input_ids_numpy, labels_numpy, test_size=0.2, random_state=42)

# convert to tf tensors
X_train = tf.convert_to_tensor(X_train)
X_val = tf.convert_to_tensor(X_val)
y_train = tf.convert_to_tensor(y_train)
y_val = tf.convert_to_tensor(y_val)

# load pre-trained bert
model = TFBertForSequenceClassification.from_pretrained(
    'bert-base-uncased',
    num_labels=2,
    classifier_dropout=0.3,
    hidden_dropout_prob=0.3,
    attention_probs_dropout_prob=0.3,
)

# compile model 
optimizer = tf.keras.optimizers.Adam(learning_rate=LR)
model.compile(
    optimizer=optimizer,
    loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
    metrics=['accuracy']
)

# train the model with early stopping
early_stopping = tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True)
model.fit(X_train, y_train, validation_data=(X_val, y_val), epochs=NUM_EPOCHS, batch_size=2)

# save the final fine-tuned model & tokenizer
model.save_pretrained('fine_tuned_bert_model')
tokenizer.save_pretrained('fine_tuned_bert_tokenizer')
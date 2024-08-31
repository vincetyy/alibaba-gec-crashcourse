'''This code performs K-fold cross-validation
and makes sure that our model generalises well to unseen data'''


from transformers import BertTokenizer, TFBertForSequenceClassification
import tensorflow as tf
import numpy as np
from sklearn.model_selection import StratifiedKFold

# load our data files and assign labels
def load_texts_and_labels(file_path, label):
    with open(file_path, 'r') as file:
        texts = file.readlines()
    labels = [label] * len(texts)
    return texts, labels

exportable_texts, exportable_labels = load_texts_and_labels('data/exportable/exportable.txt', 1)  # pass verification check
non_exportable_texts, non_exportable_labels = load_texts_and_labels('data/exportable/non_exportable.txt', 0)  # fail verification check
texts = exportable_texts + non_exportable_texts
labels = np.array(exportable_labels + non_exportable_labels)

# load pre-trained BERT tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

# tokenise input
inputs = tokenizer(texts, return_tensors='np', padding=True, truncation=True, max_length=128)
input_ids = inputs['input_ids']

# perform k-fold cross-validation
kfold = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

fold_num = 1
for train_index, val_index in kfold.split(input_ids, labels):
    print(f"Fold {fold_num} in progress!")
    
    # split training and validation sets for this fold
    X_train, X_val = input_ids[train_index], input_ids[val_index]
    y_train, y_val = labels[train_index], labels[val_index]
    
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

    # compile model for this fold
    optimizer = tf.keras.optimizers.Adam(learning_rate=2e-5)
    model.compile(
        optimizer=optimizer,
        loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
        metrics=['accuracy']
    )
    
    # train the model with early stopping
    # early_stopping = tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True)
    model.fit(X_train, y_train, validation_data=(X_val, y_val), epochs=3, batch_size=2)
    
    print(f"Finished fold {fold_num}")
    fold_num += 1
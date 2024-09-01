'''only Singapore's regulations for motorised bicycles and scooters are present in the data. 
to generalise to other countries, we need to add more data and create the embeddings for those as well,
but this is not necessary for our demo (and might be costly for students like us to make)'''

from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, StorageContext
from llama_index.llms.openai import OpenAI
from dotenv import load_dotenv
import os
import openai
import chromadb
from llama_index.vector_stores.chroma import ChromaVectorStore

def start_RA_chatbot():
    ''' this method starts the chatbot that uses data from data folder to answer questions, 
     remembering past conversation with the user until the user ends / resets the conversation.
    '''
    
    load_dotenv()
    openai_api_key = os.getenv('OPENAI_API_KEY')

    openai.api_key = openai_api_key

    # 4o-mini is really cheap, index stores vector embeddings
    llm = OpenAI(model="gpt-4o-mini")
    data = SimpleDirectoryReader(input_dir="data/").load_data()

    # initialize client, setting path to save data
    db = chromadb.PersistentClient(path="./chroma_db")
    chroma_collection = db.get_or_create_collection("quickstart")

    # assign chroma as the vector_store to the context
    vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
    storage_context = StorageContext.from_defaults(vector_store=vector_store)

    # take embeddings from storage context if present, else make new embeddings from data
    index = VectorStoreIndex.from_documents(
        data, storage_context=storage_context
    )

    # condense_question mode for context retention
    chat_engine = index.as_chat_engine(
        chat_mode="condense_question", 
        llm=llm, 
        verbose=False
    )

    while True:
        # VINCE: change this to integrate with the chatbot interface
        user_input = input("Enter your question: ")
        query = user_input + " It's important that you limit your response to 1 sentence and answer concisely."
        print()

        # VINCE: use this to end the conversation (like a reset button or sth)
        if query.lower() == 'x':
            print("bye bye") # can remove this, just for debugging / clarity
            break

        response = chat_engine.chat(query)
        print(response)

    chat_engine.reset()

if __name__ == "__main__":
    start_RA_chatbot()
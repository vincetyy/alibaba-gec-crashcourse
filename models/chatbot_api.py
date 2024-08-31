from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, StorageContext
from llama_index.llms.openai import OpenAI
from dotenv import load_dotenv
import os
import openai
import chromadb
from llama_index.vector_stores.chroma import ChromaVectorStore

# Load environment variables
load_dotenv()
openai_api_key = os.getenv('OPENAI_API_KEY')
openai.api_key = openai_api_key

# Initialize the OpenAI LLM
llm = OpenAI(model="gpt-4o-mini")

# Initialize the database and vector store
db = chromadb.PersistentClient(path="./chroma_db")
chroma_collection = db.get_or_create_collection("quickstart")

vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
storage_context = StorageContext.from_defaults(vector_store=vector_store)

# Load the data
data = SimpleDirectoryReader(input_dir="data/").load_data()

# Initialize the index
index = VectorStoreIndex.from_documents(data, storage_context=storage_context)

# Initialize the chat engine
chat_engine = index.as_chat_engine(chat_mode="condense_question", llm=llm, verbose=False)

# Create the FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

class QueryModel(BaseModel):
    query: str

@app.post("/query/")
async def query_bot(query: QueryModel):
    if query.query.lower() == 'x':
        chat_engine.reset()
        return {"response": "Conversation reset."}
    
    try:
        user_query = query.query + " Limit response to 1 to 2 sentences."
        response = chat_engine.chat(user_query)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
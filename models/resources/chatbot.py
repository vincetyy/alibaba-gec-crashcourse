'''this chatbot doesn't remember context (no condense question parameter)'''

from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.llms.openai import OpenAI
from dotenv import load_dotenv
import os
import openai

load_dotenv()
openai_api_key = os.getenv('OPENAI_API_KEY')

openai.api_key = openai_api_key

# 4o-mini is really cheap
llm = OpenAI(model="gpt-4o-mini")
data = SimpleDirectoryReader(input_dir="data/").load_data()
index = VectorStoreIndex.from_documents(data)

chat_engine = index.as_chat_engine(chat_mode="openai", llm=llm, verbose=False)

query = "What's the policy on personal data?"

response = chat_engine.chat(
    query, tool_choice="query_engine_tool"
)

print(response)
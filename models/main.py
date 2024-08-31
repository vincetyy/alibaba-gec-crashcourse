import verification_sg
import chatbot_stream

# VINCE: get user's product description
product_description = ""

is_exportable = verification_sg.is_exportable(product_description)
if (not is_exportable):
    chatbot_stream.run_chatbot()
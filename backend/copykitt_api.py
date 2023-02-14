from fastapi import FastAPI, HTTPException
from copykitt import genererate_branding_snippet, genererate_keywords
from mangum import  Mangum
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
handler = Mangum(app)
MAX_INPUT_LENGTH = 32

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/generate_snippet")
async def genererate_snippet_api(prompt: str):
    validate_input_length(prompt)
    snippet = genererate_branding_snippet(prompt)
    return {"snippet": snippet, "keywords": []}

    # uvicorn copykitt_api:app --reload


@app.get("/generate_keyword")
async def genererate_keyword_api(prompt: str):
    validate_input_length(prompt)
    keywords = genererate_keywords(prompt)
    return {"snippet": None, "keywords": keywords}


@app.get("/genererate_snippets_and_keyword")
async def genererate_snippets_and_keyword_api(prompt: str):
    validate_input_length(prompt)
    snippet = genererate_branding_snippet(prompt)
    keywords = genererate_keywords(prompt)
    return {"snippet": snippet, "keywords": keywords}

#added validation fro characther only allowed for keyword search
def validate_input_length(prompt: str):
    if len(prompt) >= MAX_INPUT_LENGTH:
        raise HTTPException(
            status_code=400, detail=f"Input length is to long. Must be under {MAX_INPUT_LENGTH} Characters")

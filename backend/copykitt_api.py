from fastapi import FastAPI
from copykitt import genererate_branding_snippet, genererate_keywords
app = FastAPI()


@app.get("/generate_snippet")
async def genererate_snippet_api(prompt: str):
    snippet = genererate_branding_snippet(prompt)
    return {"snippet": snippet ,"keywords": []}

    # uvicorn copykitt_api:app --reload

@app.get("/generate_keyword")
async def genererate_keyword_api(prompt: str):
    keywords = genererate_keywords(prompt)
    return {"snippet": None ,"keywords": keywords}


@app.get("/genererate_snippets_and_keyword")
async def genererate_snippets_and_keyword_api(prompt: str):
    snippet = genererate_branding_snippet(prompt)
    keywords = genererate_keywords(prompt)
    return {"snippet": snippet ,"keywords": keywords}
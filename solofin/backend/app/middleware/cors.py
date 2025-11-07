from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

def init_cors(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:8080", "https://solofin-production-549b.up.railway.app"], # Frontend adres(ler)iniz
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
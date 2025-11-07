from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.api.router import api_router
from app.db.database import create_db_and_tables
from app.middleware.cors import init_cors

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting App...")
    await create_db_and_tables()
    print("Connected PostgreSQL.")
    yield
    print("Closed App...")

def create_app() -> FastAPI:
    app = FastAPI(
        title="FastAPI Auth (PostgreSQL)",
        lifespan=lifespan
    )

    init_cors(app)

    app.include_router(api_router)

    @app.get("/health", tags=["Health Check"])
    async def health_check():
        return {"status": "ok"}

    return app
app = create_app()
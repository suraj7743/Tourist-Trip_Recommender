from fastapi import FastAPI
from routes.places import router as place_router
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI(
    title="Tourist Trip Recommender API",
    version="1.0.0",
    description=(
        "API for retrieving tourism and historic points of interest in the "
        "Kathmandu valley. Supports filtering by category, rating, parking "
        "availability and opening hours."
    ),
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"] if strict
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def hello_api():
    return {"message":"Fast api home route"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}




# Register routes
app.include_router(place_router)
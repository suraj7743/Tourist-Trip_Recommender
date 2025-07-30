#!/bin/bash

set -e

# Wait for Postgres to be ready
echo "⏳ Waiting for Postgres..."
until pg_isready -h db -p 5432 -U postgres; do
  sleep 1
done
echo "✅ Postgres is up!"

# Run OSM fetcher ONCE
echo "🚀 Running osm_fetcher.py..."
python osm_fetcher.py

# Start FastAPI app
echo "⚡ Starting FastAPI server..."
uvicorn main:app --host 0.0.0.0 --port 8000

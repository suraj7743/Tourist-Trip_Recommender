# Use official Python image
FROM python:3.12-slim

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        libpq5 \
        postgresql-client \
        gdal-bin \
        curl \
        && rm -rf /var/lib/apt/lists/*
# Install Poetry
RUN curl -sSL https://install.python-poetry.org | python3 -
ENV PATH="/root/.local/bin:$PATH"

# Set workdir
WORKDIR /app/backend

# Copy dependency files first (for better Docker layer caching)
COPY poetry.lock pyproject.toml /app/backend/

# Configure Poetry and install dependencies
RUN poetry config virtualenvs.create false \
    && poetry install --no-root --only main

# Copy the rest of the application code
COPY . /app/backend/

# Set env path
ENV PYTHONPATH=/app/backend

# Copy and set permissions for entrypoint
COPY docker-entrypoint.sh /app/backend/docker-entrypoint.sh
RUN chmod +x /app/backend/docker-entrypoint.sh

CMD ["/app/backend/docker-entrypoint.sh"]
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY pyproject.toml ./
RUN pip install --no-cache-dir uv && \
    pip install --no-cache-dir \
        fastapi==0.115.2 \
        uvicorn[standard]==0.30.6 \
        sqlalchemy==2.0.32 \
        psycopg[binary]==3.2.1 \
        pydantic==2.9.2 \
        pandas==2.2.2 \
        numpy==1.26.4 \
        scipy==1.13.1 \
        redis==5.0.8 \
        rq==1.16.2 \
        python-dateutil==2.9.0.post0 \
        reportlab==4.2.2

# Copy app code
COPY app ./app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

FROM python:3.11-slim
WORKDIR /app
COPY pyproject.toml ./
RUN pip install --no-cache-dir uv && \
    uv pip install --system -r <(python - <<'PY'\nimport tomllib,sys\nprint('\\n'.join(tomllib.load(open('pyproject.toml','rb'))['project']['dependencies']))\nPY\n)
COPY app ./app
EXPOSE 8000
CMD ["bash","-lc","uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"]

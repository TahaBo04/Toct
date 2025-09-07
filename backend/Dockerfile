FROM python:3.11-slim
WORKDIR /app
COPY pyproject.toml ./
RUN pip install --no-cache-dir uv && \
    uv pip install --system -r <(python - <<'PY'
import tomllib,sys
deps = tomllib.load(open('pyproject.toml','rb'))['project']['dependencies']
print('\n'.join(deps))
PY
)
COPY app ./app
EXPOSE 8000
CMD ["bash","-lc","uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"]

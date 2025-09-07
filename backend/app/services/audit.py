import hashlib, json

def hash_event(payload: dict, prev_hash: str | None) -> str:
    body = {"prev": prev_hash, **payload}
    s = json.dumps(body, sort_keys=True).encode()
    return hashlib.sha256(s).hexdigest()

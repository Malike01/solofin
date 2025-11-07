import time
import asyncio
from fastapi import Request, HTTPException, status
from collections import defaultdict
from typing import Dict, Any

ip_rate_limit_storage: Dict[str, Dict[str, Any]] = defaultdict(
    lambda: {"count": 0, "start_time": 0}
)
ip_lock = asyncio.Lock() 

RATE_LIMIT_MINUTES = 1
RATE_LIMIT_ATTEMPTS = 5

async def ip_rate_limiter(request: Request):
    ip = request.client.host
    if not ip:
        return
        
    current_time = time.time()

    async with ip_lock:
        data = ip_rate_limit_storage[ip]
        
        if current_time - data["start_time"] > (RATE_LIMIT_MINUTES * 60):
            data["count"] = 1
            data["start_time"] = current_time
        else:
            data["count"] += 1

        if data["count"] > RATE_LIMIT_ATTEMPTS:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"Çok fazla istek. Lütfen {RATE_LIMIT_MINUTES} dakika sonra tekrar deneyin."
            )
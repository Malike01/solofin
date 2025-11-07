import uvicorn
import os

if __name__ == "__main__":
    print("Starting app url http://localhost:8080")
    print("For Swagger UI http://localhost:8080/docs")
    
    from dotenv import load_dotenv
    load_dotenv()
    
    uvicorn.run(
        "app.main:app", 
        host="0.0.0.0", 
        port=int(os.getenv("PORT", 8080)),
        reload=True 
    )
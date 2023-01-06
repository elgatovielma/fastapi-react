from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import date
import psutil

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/server-info", tags=["server_info"])
def get_day_of_week():
    """
    Get the current date and load on the server side
    """
    loads = psutil.getloadavg()
    current_date = date.today()
    return {"loads": loads, "date": current_date}

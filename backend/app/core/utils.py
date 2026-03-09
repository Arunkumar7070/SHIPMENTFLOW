import random
import string
from datetime import datetime


def generate_tracking_number() -> str:
    """Generate a unique tracking number like CT-20240101-A3F9K"""
    date_part = datetime.utcnow().strftime("%Y%m%d")
    rand_part = "".join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"CT-{date_part}-{rand_part}"

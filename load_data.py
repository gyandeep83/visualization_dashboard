import json
from visualization.models import DataPoint

with open('jsondata.json', 'r') as file:
    data = json.load(file)

for entry in data:
    DataPoint.objects.create(
        intensity=entry.get("intensity", 0),
        likelihood=entry.get("likelihood", 0),
        relevance=entry.get("relevance", 0),
        year=entry.get("end_year", None),
        country=entry.get("country", ""),
        topic=entry.get("topic", ""),
        region=entry.get("region", ""),
        city=entry.get("city", "")
    )

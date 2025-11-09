from django.db import models

class DataPoint(models.Model):
    intensity = models.IntegerField(null=True, blank=True)
    likelihood = models.IntegerField(null=True, blank=True)
    relevance = models.IntegerField(null=True, blank=True)
    start_year = models.IntegerField(null=True, blank=True)
    end_year = models.IntegerField(null=True, blank=True)
    country = models.TextField(null=True, blank=True)  # ✅ Changed from CharField
    topic = models.TextField(null=True, blank=True)  # ✅ Changed from CharField
    region = models.TextField(null=True, blank=True)  # ✅ Changed from CharField
    city = models.TextField(null=True, blank=True)  # ✅ Changed from CharField
    sector = models.TextField(null=True, blank=True)  # ✅ Changed from CharField
    pestle = models.TextField(null=True, blank=True)  # ✅ Changed from CharField
    source = models.TextField(null=True, blank=True)  # ✅ Changed from CharField
    swot = models.TextField(null=True, blank=True)  # ✅ Changed from CharField
    insight = models.TextField(null=True, blank=True)
    url = models.TextField(null=True, blank=True)  # ✅ Changed from URLField
    title = models.TextField(null=True, blank=True)
    added = models.DateTimeField(null=True, blank=True)
    published = models.DateTimeField(null=True, blank=True)

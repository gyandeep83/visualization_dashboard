from rest_framework import generics
from visualization.models import DataPoint
from .serializers import DataPointSerializer
from django.db.models import Q

class FilteredDataPointListView(generics.ListAPIView):
    serializer_class = DataPointSerializer

    def get_queryset(self):
        queryset = DataPoint.objects.all()

        filters = {
            "end_year": self.request.query_params.get("end_year"),
            "topic": self.request.query_params.get("topic"),
            "sector": self.request.query_params.get("sector"),
            "region": self.request.query_params.get("region"),
            "pestle": self.request.query_params.get("pestle"),
            "source": self.request.query_params.get("source"),
            "swot": self.request.query_params.get("swot"),
            "country": self.request.query_params.get("country"),
            "city": self.request.query_params.get("city"),
        }

        # Apply filters dynamically
        for key, value in filters.items():
            if value:
                queryset = queryset.filter(Q(**{f"{key}__icontains": value}))  # ✅ Case-insensitive & partial match

        return queryset

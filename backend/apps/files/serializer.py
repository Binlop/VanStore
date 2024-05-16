from rest_framework import serializers

class FileSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    file = serializers.ImageField()

from rest_framework import serializers
from bucketlist.models import BucketList


class BucketListSerializer(serializers.ModelSerializer):
    family = serializers.SlugRelatedField(
        read_only=True,
        slug_field='id'
    )

    class Meta:
        model = BucketList
        fields = ('title', 'image', 'family')
    """
    def create(self, validated_data):
        print(validated_data)
        family = validated_data.pop('family')
        print(validated_data)
        bucket = BucketList.objects.create(family=family, **validated_data)
        bucket.save()
        return bucket
    """

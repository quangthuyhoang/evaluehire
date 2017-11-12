from django.db import models
from reviewer.models import ReviewerInfo

REVIEW_CHOICES = (
    (1, '1 star'),
    (2, '2 stars'),
    (3, '3 stars'),
    (4, '4 stars'),
    (5, '5 stars'),
)

METRICS_CHOICES = (
    ('effectiveness', 'Effectiveness'),
    ('speed', 'Speed'),
    ('communication', 'Communication'),
    ('organization', 'Organization'),
    ('reliability', 'Reliability'),
)


# Create your models here.
class EmployeeInfo(models.Model):
    first_name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128)
    gender = models.CharField(max_length=1)
    email = models.EmailField(max_length=256)
    job_title = models.CharField(max_length=256)

    def __str__(self):
        return '%s %s' % (self.first_name, self.last_name)


class Ratings(models.Model):
    metrics = models.CharField(max_length=128, choices=METRICS_CHOICES)
    reviews = models.IntegerField(choices=REVIEW_CHOICES)
    description = models.CharField(max_length=256)
    employee = models.ForeignKey('EmployeeInfo', blank=True)
    reviewer = models.ForeignKey('reviewer.ReviewerInfo', blank=True)

    def __str__(self):
        return self.metrics


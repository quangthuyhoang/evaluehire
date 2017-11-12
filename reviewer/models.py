from django.db import models

REVIEWER_TYPE_CHOICES = (
    ('employee', 'employee'),
    ('employer', 'employer')
)

# Create your models here.
class ReviewerInfo(models.Model):
    reviewer_type = models.CharField(max_length=128, choices=REVIEWER_TYPE_CHOICES)
    first_name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128)
    phone = models.CharField(max_length=128)
    email = models.EmailField(max_length=256)
    address = models.CharField(max_length=128) 

    def __str__(self):
        return '%s %s' % (self.first_name, self.last_name)
# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-04 19:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ReviewerInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reviewer_type', models.CharField(max_length=128)),
                ('first_name', models.CharField(max_length=128)),
                ('last_name', models.CharField(max_length=128)),
                ('phone', models.CharField(max_length=128)),
                ('email', models.EmailField(max_length=256)),
                ('address', models.CharField(max_length=128)),
            ],
        ),
    ]
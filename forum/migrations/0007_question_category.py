# Generated by Django 2.0.5 on 2018-09-27 03:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forum', '0006_auto_20180728_1418'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='category',
            field=models.CharField(default='new', max_length=200),
            preserve_default=False,
        ),
    ]

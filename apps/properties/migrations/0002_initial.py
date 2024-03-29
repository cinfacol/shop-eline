# Generated by Django 4.1.5 on 2023-03-16 01:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("properties", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="property",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.DO_NOTHING,
                related_name="agent_buyer",
                to=settings.AUTH_USER_MODEL,
                verbose_name="Agent,Seller or Buyer",
            ),
        ),
    ]

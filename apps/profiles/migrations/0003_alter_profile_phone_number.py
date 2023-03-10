# Generated by Django 4.1.5 on 2023-03-07 07:57

from django.db import migrations
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        ("profiles", "0002_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="profile",
            name="phone_number",
            field=phonenumber_field.modelfields.PhoneNumberField(
                default="+575242042421",
                max_length=30,
                region="CO",
                verbose_name="Phone Number",
            ),
        ),
    ]

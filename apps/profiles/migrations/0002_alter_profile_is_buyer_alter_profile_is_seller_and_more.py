# Generated by Django 4.1.5 on 2023-02-12 22:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("profiles", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="profile",
            name="is_buyer",
            field=models.BooleanField(
                default=False,
                help_text="Are you looking to Buy a Product?",
                verbose_name="Buyer",
            ),
        ),
        migrations.AlterField(
            model_name="profile",
            name="is_seller",
            field=models.BooleanField(
                default=False,
                help_text="Are you looking to sell a product?",
                verbose_name="Seller",
            ),
        ),
        migrations.AlterField(
            model_name="profile",
            name="license",
            field=models.CharField(
                blank=True, max_length=20, null=True, verbose_name="Shop Eline license"
            ),
        ),
    ]
from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _
from django_countries.fields import CountryField
from phonenumber_field.modelfields import PhoneNumberField

from apps.common.models import TimeStampedUUIDModel

# from apps.orders.countries import Countries

User = get_user_model()


class Gender(models.TextChoices):
    MALE = "Male", _("Male")
    FEMALE = "Female", _("Female")
    OTHER = "Other", _("Other")


class VerificationType(models.TextChoices):
    UNVERIFIED = "Unverified", _("Unverified")
    VERIFIED = "Verified", _("Verified")


class Profile(TimeStampedUUIDModel):
    user = models.OneToOneField(User, related_name="profile", on_delete=models.CASCADE)
    phone_number = PhoneNumberField(
        verbose_name=_("Phone Number"),
        max_length=30,
        region="CO",
        default="+573242042421",
    )
    about_me = models.TextField(
        verbose_name=_("About me"), default=_("say something about yourself")
    )
    address_line_1 = models.CharField(max_length=255, default="")
    address_line_2 = models.CharField(max_length=255, default="", blank=True, null=True)
    license = models.CharField(
        verbose_name=_("Shop Eline license"), max_length=20, blank=True, null=True
    )
    profile_photo = models.ImageField(
        verbose_name=_("Profile Photo"), default="/profile_default.png"
    )
    gender = models.CharField(
        verbose_name=_("Gender"),
        choices=Gender.choices,
        default=Gender.OTHER,
        max_length=20,
    )
    verified = models.CharField(
        verbose_name=_("Verified"),
        choices=VerificationType.choices,
        default=VerificationType.UNVERIFIED,
        max_length=20,
    )
    country = CountryField(
        verbose_name=_("Country"), default="CO", blank=False, null=False
    )
    city = models.CharField(
        verbose_name=_("City"),
        max_length=180,
        default="Medellín",
        blank=False,
        null=False,
    )
    zipcode = models.CharField(max_length=20, default="")
    is_buyer = models.BooleanField(
        verbose_name=_("Buyer"),
        default=False,
        help_text=_("Are you looking to Buy a Product?"),
    )
    is_seller = models.BooleanField(
        verbose_name=_("Seller"),
        default=False,
        help_text=_("Are you looking to sell a product?"),
    )
    is_agent = models.BooleanField(
        verbose_name=_("Agent"), default=False, help_text=_("Are you an agent?")
    )
    top_agent = models.BooleanField(verbose_name=_("Top Agent"), default=False)
    rating = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    num_reviews = models.IntegerField(
        verbose_name=_("Number of Reviews"), default=0, null=True, blank=True
    )

    def __str__(self):
        return f"{self.user.username}'s profile"

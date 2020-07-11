from django.db import models
from django.utils.translation import gettext_lazy as _

class Content(models.Model):
  
    class Lang(models.TextChoices):
        ENGLISH = 'en', _('English')
        SPANISH = 'sp', _('Spanish')
        FRENCH = 'fr', _('French')
        KOREAN = 'kr', _('Korean')
        MANDALIN = 'ma', _('Mandarin')
        JAPANESE = 'ja', _('Japanese')
    
    class Color(models.TextChoices):
        MULTI = 'mlt', _('Multicolors')
        GRAYSCALE = 'grs', _('Grayscale'),
        TRANSPARENT = 'trs', _('Transparent'),
        RED = 'rd', _('Red'),
        ORANGE = 'or', _('Orange'),
        YELLOW = 'yl', _('Yellow'),
        GREEN = 'grn', _('Green'),
        TURQUOISE = 'tqs', _('Turquoise'),
        BLUE = 'bl', _('Blue'),
        LILAC = 'llc', _('Lilac'),
        PINK = 'pk', _('Pink'),
        WHITE = 'wh', _('White'),
        GRAY = 'gry', _('Gray'),
        BLACK = 'blk', _('Black'),
        BROWN = 'br', _('Brown')
  
    title = models.CharField(max_length=100)
    thumbnail = models.CharField(max_length=500)
    video = models.CharField(max_length=500)
    description = models.CharField(max_length=1000, blank=True)
    # duration = models.DurationField(blank=True)
    height = models.PositiveIntegerField(blank=True)
    width = models.PositiveIntegerField(blank=True)
    lang = models.CharField(
        max_length=2,
        choices=Lang.choices,
        default=Lang.ENGLISH
    )
    isEditorsChoice = models.BooleanField(default=False)
    isSafeSearch = models.BooleanField(default=True)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name = 'uploaded_contents',
        on_delete = models.CASCADE
    )
    color = models.CharField(
        max_length=3,
        choices=Color.choices,
        default=Color.MULTI,
        blank=True
    )
    tags = models.ManyToManyField(
        'tags.Tag',
        related_name='tagged_contents',
        blank=True
    )
    categories = models.ManyToManyField(
        'categories.Category',
        related_name='contents',
        blank=True
    )
    views = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.title} is created'
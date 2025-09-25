from django.contrib import admin
from .models import *

@admin.register(Anuario)
class AnuarioAdmin(admin.ModelAdmin):
    list_display = ('nome', 'limite_referees', 'possui_pesquisa', 'ativo')
    list_filter = ('ativo', 'possui_pesquisa')
    search_fields = ('nome',)

@admin.register(Area)
class AreaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'ativa')
    list_filter = ('ativa',)
    search_fields = ('nome',)

@admin.register(Cliente) 
class ClienteAdmin(admin.ModelAdmin):
    list_display = ('nome', 'setor', 'ativo', 'created_at')
    list_filter = ('ativo', 'setor')
    search_fields = ('nome', 'razao_social')
    ordering = ('nome',)

class ContatoInline(admin.TabularInline):
    model = Contato
    extra = 1

@admin.register(Contato)
class ContatoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'cargo', 'cliente', 'email', 'ativo')
    list_filter = ('ativo', 'cargo')
    search_fields = ('nome', 'email', 'cliente__nome')
    autocomplete_fields = ['cliente']
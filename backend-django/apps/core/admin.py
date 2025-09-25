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

class SubmissaoRefereeInline(admin.TabularInline):
    model = SubmissaoReferee
    extra = 0
    autocomplete_fields = ['contato']

@admin.register(Submissao)
class SubmissaoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'anuario', 'area', 'ano', 'deadline_envio', 'status')
    list_filter = ('status', 'anuario', 'area', 'ano')
    search_fields = ('titulo', 'area__nome', 'anuario__nome')
    date_hierarchy = 'deadline_envio'
    inlines = [SubmissaoRefereeInline]
    autocomplete_fields = ['anuario', 'area']

@admin.register(SubmissaoReferee)
class SubmissaoRefereeAdmin(admin.ModelAdmin):
    list_display = ('contato', 'submissao', 'status_contato', 'tem_conflito', 'override_aprovado')
    list_filter = ('status_contato', 'tem_conflito', 'override_aprovado')
    search_fields = ('contato__nome', 'submissao__titulo')
    autocomplete_fields = ['submissao', 'contato']

@admin.register(RefereeSupente)
class RefereeSupenteAdmin(admin.ModelAdmin):
    list_display = ('contato_suplente', 'submissao_referee_principal', 'ativado')
    list_filter = ('ativado',)
    search_fields = ('contato_suplente__nome',)

@admin.register(InteracaoTimesheet)
class InteracaoTimesheetAdmin(admin.ModelAdmin):
    list_display = ('cliente', 'area', 'ano', 'horas_trabalhadas', 'qtd_reunioes')
    list_filter = ('ano', 'area')
    search_fields = ('cliente__nome', 'area__nome')

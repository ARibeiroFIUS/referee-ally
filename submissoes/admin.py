from django.contrib import admin
from .models import *

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
    list_display = ('cliente', 'area', 'ano', 'horas_trabalhadas', 'qtd_reunioes', 'ultimo_contato')
    list_filter = ('ano', 'area')
    search_fields = ('cliente__nome', 'area__nome')
    autocomplete_fields = ['cliente', 'area']
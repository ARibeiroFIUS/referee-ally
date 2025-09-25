from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator

class Anuario(models.Model):
    nome = models.CharField(max_length=100, help_text="Ex: Chambers and Partners")
    descricao = models.TextField(blank=True)
    limite_referees = models.PositiveIntegerField(default=20, help_text="Chambers = 20")
    possui_pesquisa = models.BooleanField(default=True)
    ativo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.nome
    
    class Meta:
        verbose_name_plural = "Anuários"

class Area(models.Model):
    nome = models.CharField(max_length=100, help_text="Ex: Tributário, M&A")
    descricao = models.TextField(blank=True)
    ativa = models.BooleanField(default=True)
    
    def __str__(self):
        return self.nome
    
    class Meta:
        verbose_name_plural = "Áreas"

class Cliente(models.Model):
    nome = models.CharField(max_length=200, help_text="Ex: ACME Corp")
    razao_social = models.CharField(max_length=300, blank=True)
    setor = models.CharField(max_length=100, blank=True)
    ativo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.nome
    
    class Meta:
        verbose_name_plural = "Clientes"
        ordering = ['nome']

class Contato(models.Model):
    nome = models.CharField(max_length=150)
    cargo = models.CharField(max_length=100)
    email = models.EmailField()
    telefone = models.CharField(max_length=20, blank=True)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='contatos')
    ativo = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.nome} ({self.cliente.nome})"
    
    class Meta:
        verbose_name_plural = "Contatos"
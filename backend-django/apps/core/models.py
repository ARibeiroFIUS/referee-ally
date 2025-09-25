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

class Submissao(models.Model):
    STATUS_CHOICES = [
        ('NAO_INICIADA', 'Não Iniciada'),
        ('EM_PREPARACAO', 'Em Preparação'), 
        ('ENVIADA', 'Enviada'),
        ('PESQUISA_ATIVA', 'Pesquisa Ativa'),
        ('CONCLUIDA', 'Concluída'),
    ]
    
    anuario = models.ForeignKey(Anuario, on_delete=models.CASCADE)
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    ano = models.PositiveIntegerField(validators=[MinValueValidator(2020)])
    titulo = models.CharField(max_length=200, help_text="Ex: Chambers Global 2025 - Corporate/M&A")
    
    # Datas críticas
    deadline_envio = models.DateField(help_text="Data limite para envio")
    inicio_pesquisa = models.DateField(null=True, blank=True)
    fim_pesquisa = models.DateField(null=True, blank=True)
    data_publicacao = models.DateField(null=True, blank=True)
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='NAO_INICIADA')
    observacoes = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return f"{self.anuario.nome} {self.ano} - {self.area.nome}"
    
    class Meta:
        verbose_name_plural = "Submissões"
        unique_together = [['anuario', 'area', 'ano']]
        ordering = ['-ano', 'deadline_envio']

class SubmissaoReferee(models.Model):
    STATUS_CONTATO_CHOICES = [
        ('PENDENTE', 'Pendente'),
        ('CONTACTADO', 'Contactado'),
        ('RESPONDIDO', 'Respondido'),
        ('NAO_RESPONDEU', 'Não Respondeu'),
        ('RECUSOU', 'Recusou'),
    ]
    
    submissao = models.ForeignKey(Submissao, on_delete=models.CASCADE, related_name='referees')
    contato = models.ForeignKey(Contato, on_delete=models.CASCADE)
    
    # Status do contato
    status_contato = models.CharField(max_length=20, choices=STATUS_CONTATO_CHOICES, default='PENDENTE')
    data_contato = models.DateTimeField(null=True, blank=True)
    feedback_notas = models.TextField(blank=True)
    
    # Sistema de Override
    tem_conflito = models.BooleanField(default=False)
    override_aprovado = models.BooleanField(default=False)
    justificativa_override = models.TextField(blank=True)
    data_override = models.DateTimeField(null=True, blank=True)
    usuario_override = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.contato.nome} → {self.submissao}"
    
    class Meta:
        verbose_name = "Referee da Submissão"
        verbose_name_plural = "Referees das Submissões"
        unique_together = [['submissao', 'contato']]

class RefereeSupente(models.Model):
    submissao_referee_principal = models.OneToOneField(
        SubmissaoReferee, 
        on_delete=models.CASCADE,
        related_name='suplente'
    )
    contato_suplente = models.ForeignKey(Contato, on_delete=models.CASCADE)
    motivo_suplencia = models.TextField()
    ativado = models.BooleanField(default=False)
    data_ativacao = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"Suplente: {self.contato_suplente.nome}"
    
    class Meta:
        verbose_name_plural = "Referees Suplentes"

class InteracaoTimesheet(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    ano = models.PositiveIntegerField()
    horas_trabalhadas = models.DecimalField(max_digits=10, decimal_places=2)
    qtd_reunioes = models.PositiveIntegerField(default=0)
    ultimo_contato = models.DateField()
    
    def __str__(self):
        return f"{self.cliente.nome} - {self.area.nome} ({self.ano})"
    
    class Meta:
        verbose_name_plural = "Interações Timesheet"
        unique_together = [['cliente', 'area', 'ano']]

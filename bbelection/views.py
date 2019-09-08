from django.http import HttpResponse
from django.shortcuts import render

def home(request):
    return HttpResponse(render(request, 'index.html'))

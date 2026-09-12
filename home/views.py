from django.shortcuts import render, redirect

def login_view(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        phone = request.POST.get('phone')
        request.session['user_name'] = name
        request.session['user_phone'] = phone
        return redirect('home')
        
    return render(request, 'home/accounts/login.html')

def home(request):

    if not request.session.get('user_name'):
        return redirect('login')
        
    return render(request, 'home/index.html')

def logout_view(request):
    request.session.flush() 
    return redirect('login')

def fruits_veggies(request):
    return render(request, 'home/fruits-veggies.html')

def m_s(request):
    return render(request, 'home/m-s.html')

def d_e(request):
    return render(request, 'home/d-e.html')


def categories(request):
    return render(request, 'home/categories.html')

def track_order(request):
    return render(request, 'home/track.html')

def contact(request):
    return render(request, 'home/contact.html')





 
 
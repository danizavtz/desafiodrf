# desafiodrf

## Instalação backend

1. No diretório raiz, criar um virtualenv.
`$ virtualenv venv -p $(which python3)`
2. Carregar o ambiente virtual
`$ source venv/bin/activate`
3. Com o ambiente virtual carregado,  instalar dependências
`$ pip install -r requirements.txt`
4. Iniciar o backend
`$ python manage.py runserver`
5. A interface de administração deve estar disponível no endereco:
`http://localhost:8000/admin`



## Instalação frontend

1. Estando no diretório `medicar-front` instalar depedências:
`$ npm install`
2. Executar o servidor de desenvolvimento do angular:
`$ ng serve`
3. Acessar endereço `http://localhost:4200`

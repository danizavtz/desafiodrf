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
`http://localhost:8000`



## Instalação frontend

1. estando no diretório `medicar-front` executar o comando, o angular deve ser instalado:
`$ ng serve`
2. Acessar endereço `http://localhost:4200`


## Configurações iniciais

Crie o arquivo ```.env``` com as configurações de ambiente, de acordo com o arquivo ```.env.sample```

Instale as dependencias necessárias

    npm install


## Como iniciar a aplicação em desenvolvimento

Inicie o banco de dados, caso não tenha realizado anteriormente

    docker-compose up -d

Realizar a migracão para o database criado

    npx knex --env development migrate:latest

Execute o seguinte comando para iniciar

    npm run start:dev

Para obter as informações das issues do repositório desejado, a aplicação espera receber a requisição

    Método: GET
    URL: http://localhost:3000/repo/<owner>/<repo>?user=<user>


## Como executar os testes

Inicie o banco de dados, caso não tenha realizado anteriormente

    docker-compose up -d

Criar o database de teste

    docker-compose exec postgres_db psql -U github_api -c 'create database github_api_test;'

Realizar a migracão para o database criado

    npx knex --env test migrate:latest

Executar os scripts de teste

    npm test


## Como realizar o deploy

Realize o build da imagem do docker

    docker build . -t <nome_da_imagem>

Faça o deploy utilizando a imagem onde desejar

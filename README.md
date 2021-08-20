# TagsInput

`TagsInput` é um componente react que cria tags a partir de valores inseridos em um campo de input. Este repositório possui a implementação visual do componente, e deverá servir de base para os desafios de recrutamento da Raro Labs.

## Setup

Para a inicialização deste projeto, pode-se usar os gerenciadores `npm` e `yarn`. Abaixo, segue exemplo de instalação de dependências de inicialização do serviço.

```sh
npm install
npm start
```

## Testes

Para executar os tests, executar o comando `npm test`. O mesmo pode ser feito com o `yarn`.

## mock da API

Para o requisito de "buscar" e "escrever" dados na API, sugerimos o uso do contrato da API descrito no arquivo `swagger.yaml`. Sugere-se o uso das rotas `mailing-lists/{id}`, com os verbos de `GET` e `PATCH`, para a busca e escrita, respectivamente.

Não é necessário escrever a API. Sugerimos que você use o [stoplight/prism](https://meta.stoplight.io/docs/prism/ZG9jOjky-installation), para geração de mocks. Para isso, basta executar os comandos abaixo, estando na pasta raiz deste projeto. O último comando deverá iniciar uma API com todos as rotas e regras descritas no documento, e poderá ser consumida no endereço `http://localhost:4010`.

```bash
# instalação do prism. A instalação precisa ser executada somente uma vez
npm install -g @stoplight/prism-cli
# or
yarn global add @stoplight/prism-cli

# iniciar o servidor de mocks
prism mock -d swagger.yaml
```
# Pokémon App: Seu Guia do Mundo Pokémon!

Este é um aplicativo Ionic/Angular que permite explorar Pokémons, visualizar seus detalhes e gerenciar uma lista de favoritos. O projeto integra consumo de API (PokeAPI), navegação robusta e gerenciamento de estado simples para uma experiência fluída.

## Como Executar o Projeto

Siga estes passos simples para ter o aplicativo rodando em sua máquina:

1 - Clone o repositório e instale o Ionic CLI:

```
npm install -g @ionic/cli

git clone https://github.com/AguineleQueiroz/pokeapi-app.git

cd pokeapi-app
```

2 - Instale as dependências:

```
npm install
```

2 - Instale as dependências:

```
ionic serve
```
Isso abrirá o aplicativo no seu navegador padrão (geralmente em http://localhost:8100).

## Tecnologias Utilizadas

* **[Ionic Framework](https://ionicframework.com/)**: Plataforma de UI de código aberto para criar aplicativos móveis e web de alto desempenho.
* **[Angular](https://angular.io/)**: Framework para construção de aplicativos web e mobile, utilizando TypeScript.
* **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática.
* **[Capacitor](https://capacitorjs.com/)**: Uma ponte para rodar aplicativos Ionic como nativos em iOS, Android e Desktop.
* **[PokeAPI](https://pokeapi.co/)**: A API RESTful de Pokémons, utilizada para buscar os dados.
* **[Jasmine & Karma](https://karma-runner.github.io/latest/index.html)**: Frameworks para testes unitários.

## Documentação Técnica Essencial

### Componentes Standalone

Este projeto utiliza **Angular Standalone Components**, o que significa que cada componente gerencia suas próprias dependências (`imports`, `providers`). Não há `NgModule` central para a maioria dos componentes.

* **`src/main.ts`**: Ponto de entrada da aplicação, onde o `AppComponent` é "bootstrapped".
* **`src/app/app.component.ts`**: O componente raiz, responsável pela estrutura global do aplicativo.
* **`src/app/app.routes.ts`**: Define as rotas do aplicativo e as páginas (componentes standalone) associadas a cada rota.

### Serviços

* **`src/app/services/pokemon/pokemon.service.ts`**: Responsável por toda a comunicação com a PokeAPI.
    * `getPokemons(offset: number, limit: number)`: Busca uma lista paginada de Pokémons.
    * `getPokemonDetails(idOrName: string | number)`: Obtém detalhes específicos de um Pokémon.
    * `getPokemonSpecies(idOrName: string | number)`: Obtém dados da espécie de um Pokémon (para descrições, por exemplo).

### Estilização Global e Reutilização de CSS

* **`src/theme/variables.scss`**: Define variáveis CSS (custom properties) para cores e outros valores reutilizáveis do tema.
* **`src/global.scss`**: Contém estilos CSS que se aplicam a toda a aplicação, ideal para regras comuns como sombras de cards e headers.

### Testes Unitários

* Os testes unitários para serviços e componentes estão localizados nos arquivos `.spec.ts` correspondentes (ex: `pokemon.service.spec.ts`, `pokemons.page.spec.ts`).
* Para executar os testes:
    ```bash
    npm test
    ```
    * **Configuração WSL/Linux:** Se estiver no WSL e tiver problemas com o navegador, certifique-se de ter o `chromium-browser` instalado (`sudo apt install chromium-browser`) e o `karma.conf.js` configurado para `ChromeHeadless` com `executablePath: '/usr/bin/chromium-browser'`. E execute `export CHROME_BIN=/usr/bin/chromium-browser` para adicionar o path à variável CHROME_BIN.

Autor: Aguinele Queiroz

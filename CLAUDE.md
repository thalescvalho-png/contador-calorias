# Contador de calorias

App de celular (PWA) para registrar refeições, estimar calorias e proteína e projetar a perda de gordura na semana. Publicado pelo GitHub Pages a partir da raiz do branch `main`.

## Estrutura
- `index.html`: o app inteiro (HTML, CSS e JS em um arquivo, sem build e sem dependências além das fontes do Google).
- `sw.js`: service worker, rede primeiro e cache como reserva offline.
- `manifest.webmanifest`, `icon-*.png`, `apple-touch-icon.png`: instalação na tela inicial.
- `version.json`: versão publicada, usada pelo aviso de atualização.

## Regras
- Idioma da interface: português do Brasil. Tema sempre claro. Fontes Barlow Condensed (títulos e números) e Barlow (texto).
- Nenhum dado pessoal no repositório: `LOG` fica vazio. Registros, perfil e pesagens ficam no `localStorage` do aparelho (`kcal-perfil-v3`, `kcal-user-v1`, `kcal-peso-v1`, `kcal-peso-inicial`).
- A cada alteração publicada, trocar o número da versão nos três lugares: `APP_VERSION` em `index.html`, `version.json` e `CACHE` em `sw.js`.
- Texto digitado pelo usuário entra no DOM só com `textContent`. Backup importado passa por `cleanBackup` (tipos, faixas e tamanhos validados).
- Caminhos sempre relativos, porque o site fica em `/contador-calorias/`.

## Contas
- Gasto diário: Mifflin-St Jeor vezes fator de atividade. 7.700 kcal de déficit ≈ 1 kg de gordura.
- Meta em kg por semana, com teto de 1% do peso por semana e piso de 1.500 kcal por dia (`goal`).
- Calorias dos alimentos: tabela `FOODS` (kcal e proteína por 100 g, com porções caseiras). Nutrientes: `NUT_TABLE`.
- Semana vai de domingo a sábado; a pesagem é no sábado.

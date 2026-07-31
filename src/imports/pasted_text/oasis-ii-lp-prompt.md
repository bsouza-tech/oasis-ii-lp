# Prompt para Figma Make — Landing Page de Vendas Oásis II

> Cole o conteúdo abaixo direto no chat do Figma Make. Os hex de cor estão explícitos porque a IA do Figma Make não extrai cores exatas de imagens anexadas, só interpreta o que está escrito.

---

## Contexto

Estou criando uma landing page de vendas para o **Oásis II Residencial**, um empreendimento da Gênesis Empreendimentos em Nova Iguaçu, RJ. Essa página é diferente do site institucional (oasis2.com.br): o institucional é exploratório, com menu completo e vários CTAs. Esta LP tem um único objetivo: levar o visitante a **agendar uma visita**. Um único CTA, repetido, sem menu de navegação completo.

O público é gente que já tem estabilidade financeira, mora num apartamento pequeno demais para o momento de vida atual, pesquisa bastante e visita vários empreendimentos antes de decidir. A crença que a página precisa quebrar é "todo empreendimento é igual". O argumento central que resolve isso: o Oásis II tem as maiores plantas da região, com layouts que realmente aproveitam o espaço, não só mais metro quadrado.

## Plataforma

Landing page web, mobile-first (a maioria do tráfego vem de anúncio em redes sociais no celular). Rolagem única (single scroll), sem páginas internas.

## Estilo visual

Usar exatamente esta identidade (é a mesma do site institucional da Gênesis, para manter consistência de marca):

- **Navy** `#1E3C58` — títulos, header, seção do formulário, texto de autoridade
- **Laranja** `#EB9159` — cor de ação: botões, badges de ícone circulares, tags de legenda em fotos, destaques de texto
- **Creme** `#FFF2E5` — fundo principal da página (contínuo, não alterna com blocos navy full-width)
- **Teal** `#1B8F82` — uso restrito, só para indicar confirmação/verificação: checkmarks de lista, selo de sucesso do formulário
- **Branco** `#FFFFFF` — fundo de cards
- Texto de corpo em cinza-azulado escuro sobre o creme, nunca preto puro

Tipografia: uma sans-serif arredondada e amigável para títulos (peso 600-700, letras com cantos suaves, não geométrica-fria), e uma sans-serif limpa para corpo de texto (peso 400-500).

Forma: cantos bem arredondados em cards e fotos (16-24px de raio), **botões em formato pílula** (raio total), badges de ícone perfeitamente circulares com fundo laranja e ícone branco dentro, sombras suaves e discretas. Fotos com leve gradiente escurecendo a base para legibilidade de legenda em cima.

Não usar: tipografia serifada, ícones estilo linha técnica/blueprint, paleta terracota-e-bege genérica, cantos retos ou angulares.

## Estrutura da página, em ordem

### 1. Header fixo (sticky)
Logo "Oásis II" à esquerda. Um único botão pílula laranja à direita: "Agendar visita", que rola até o formulário. Sem menu de itens (nada de Início/Benefícios/Tipologias/etc., isso fica só no site institucional).

### 2. Hero
- Fundo: foto da fachada do prédio com gradiente para o creme na base (reaproveitar o estilo do hero do site institucional).
- Eyebrow pequeno: "Oásis II · Bairro da Luz, Nova Iguaçu"
- Headline grande: "As maiores plantas de Nova Iguaçu."
- Subheadline: "Plantas inteligentes que sua família vai sentir desde o primeiro dia, num jeito de morar que a maioria dos apartamentos da região não oferece."
- Botão pílula laranja: "Agendar visita"
- Microtexto abaixo do botão: "Sem compromisso. Você escolhe o dia e o horário."
- Faixa de credibilidade abaixo, quatro itens lado a lado: "16 anos" / "de Gênesis Empreendimentos", "180 unidades" / "em uma única torre", "Torre única" / "mais privacidade", "Caixa" / "parceria para financiamento"
- Animação: zoom lento na foto de fundo (escala 1.05 para 1.0 em 1.5s ao carregar), título e subtítulo sobem com fade e leve atraso entre um e outro.

### 3. Prova de espaço
- Eyebrow: "O que você percebe na visita"
- Título: "Metro quadrado que sobra, não que falta."
- Texto de apoio: "Corretores que acompanham as visitas ao Oásis II repetem a mesma observação: o apartamento parece maior por dentro do que qualquer foto consegue mostrar."
- Quatro cards brancos arredondados em grade (2x2 no mobile, 4 colunas no desktop), cada um com badge circular laranja e ícone branco:
  1. "Quarto infantil quase do tamanho da suíte" — "Em algumas plantas, o segundo quarto chega perto da metragem da suíte principal."
  2. "Duas varandas em determinadas plantas" — "Mais luz, mais ventilação e mais lugar para a família se espalhar."
  3. "Plantas pensadas, não só desenhadas" — "Distribuição que aproveita cada canto, sem metro quadrado sobrando em corredor."
  4. "Amplitude que aparece na entrada" — "O efeito de espaço começa assim que a porta abre."
- Animação: cards entram com fade e leve subida (translateY 20px), escalonados em uns 80ms entre si conforme entram na tela. Badge circular tem um pequeno "pop" de escala logo depois.

### 4. Diferenciais (exclusividade, rooftop, localização)

**Bloco A — Exclusividade**
- Eyebrow: "Torre única"
- Título: "180 apartamentos. Nenhum a mais."
- Texto: "A maioria dos condomínios da região multiplica torres para multiplicar unidades. O Oásis II não segue essa conta: uma torre única significa menos gente dividindo o mesmo elevador, a mesma garagem e o mesmo lazer."
- Dois números grandes em laranja que contam de 0 até o valor final quando entram na tela: "1" (torre) e "180" (unidades no total).

**Bloco B — Rooftop**
- Eyebrow: "Lazer no topo"
- Título: "Um rooftop que funciona como extensão da sua casa."
- Grade de fotos com cantos arredondados e tag pílula laranja de legenda (reaproveitar o padrão "Área Externa · X Fotos" do site institucional): Piscina, SPA, Sauna, Espaço gourmet, Vista panorâmica.
- Interação: hover com leve zoom na foto (escala 1.0 para 1.05).

**Bloco C — Localização**
- Eyebrow: "Bairro da Luz"
- Título: "Um endereço que resolve o dia a dia, não só o fim de semana."
- Texto: "Shopping Nova Iguaçu, escolas e comércio no entorno, sem precisar atravessar a cidade."
- Grade pequena de ícones com nome do ponto de referência (Shopping Nova Iguaçu, farmácia, escola, academia, estação de trem). **Nota: as distâncias exatas (ex: "750m", "1,8km") existem no site institucional — confirmar os valores certos por item antes de finalizar, não inventar números aqui.**

### 5. Credibilidade
- Eyebrow: "Quem constrói"
- Título: "16 anos entregando o que promete."
- Texto: "Todo argumento desta página é sustentado por fato, não por adjetivo."
- Fileira de badges brancos arredondados com ícone: "16 anos de Gênesis Empreendimentos", "Parceria com a Caixa para financiamento", "Histórico de entregas na região". Reaproveitar os selos reais de certificação do site institucional (Nível A, PBQP-H, ISO 9001) lado a lado, em vez de criar ícones novos.

### 6. Formulário (CTA único, duas etapas)
- Fundo navy `#1E3C58`, card do formulário em creme por cima.
- Título: "Duas perguntas. A gente confirma o horário com você."
- **Etapa 1:** campos "Nome completo" e "WhatsApp", botão pílula laranja "Quero agendar minha visita". Estados visuais: default, foco, erro (borda vermelha discreta), enviando (spinner no botão).
- **Etapa 2 (opcional, aparece após enviar a etapa 1):** mensagem "Recebemos seus dados. Quer adiantar informações para agilizar sua visita?", campos "E-mail", "Tipologia de interesse" (2 quartos / 3 quartos / cobertura), "Prazo para decidir". Botão "Enviar informações" e um link discreto "Prefiro que a equipe pergunte na ligação" para pular.
- **Estado final:** mensagem de confirmação em teal `#1B8F82` com ícone de check: "Tudo certo. Nossa equipe vai confirmar o horário da sua visita."
- Indicador de progresso simples entre as duas etapas (dois pontos ou uma barra fina).
- Importante: isso é um protótipo visual. Não conectar a nenhuma API real dentro do Figma Make, apenas simular os estados (default, enviando, sucesso, erro) na interface.

### 7. Footer
Fundo navy escuro. Endereço curto do empreendimento, nome da Gênesis Empreendimentos, e um link de texto discreto "Conheça o site institucional do Oásis II" apontando para oasis2.com.br.

## Componentes de UI a criar como reutilizáveis

- Botão pílula (primário laranja, e uma variante outline navy)
- Card branco com badge circular de ícone
- Tag pílula laranja para legenda de foto
- Campo de formulário com os quatro estados (default, foco, erro, sucesso)
- Indicador de progresso de duas etapas

## O que não incluir

- Menu de navegação completo (isso é só do site institucional)
- Mais de um tipo de CTA (nada de "Ver plantas" e "Receber condições" competindo)
- Números de localização inventados
- Qualquer chamada de API real ou dado sensível dentro do protótipo
// Conteúdo do e-book "Calendário de Moda 2027" (V2, copy reduzida).
// Status: C = Confirmado, P = Previsto, A = A anunciar
// Eventos: [data, nome, complemento (local ou temporada), status, link]

const W = (d, n, s, st, u) => [d, n, s, st, u];

module.exports = {
  cover: {
    title: 'Calendário de moda 2027',
    subtitle:
      'As datas que movimentam a indústria fashion e as oportunidades para planejar seu e-commerce o ano inteiro.',
    text:
      'Um guia para antecipar tendências, organizar coleções, planejar campanhas e aproveitar as principais oportunidades do varejo de moda em 2027.',
  },

  intro: {
    title: 'Um ano inteiro de oportunidades começa com planejamento.',
    paragraphs: [
      'Na moda, estar no momento certo faz toda a diferença. Uma feira pode antecipar tendências, uma semana de moda pode inspirar uma coleção e uma data comercial pode representar uma grande oportunidade de vendas.',
      'Mas, para aproveitar cada movimento do mercado, é preciso se preparar com antecedência.',
      'Pensando nisso, reunimos neste calendário as principais datas que movimentam a indústria fashion no Brasil e no mundo em 2027.',
      'Este material foi pensado para ajudar você a tomar decisões mais assertivas: planejar compras, organizar estoques, antecipar campanhas e preparar sua loja para os momentos mais importantes do ano.',
      'Compartilhe com seu time e tenha um ano inteiro de oportunidades no radar.',
    ],
  },

  months: [
    {
      name: 'Janeiro',
      weeks: [
        W('15 a 19/01', 'Milan Fashion Week Masculina', 'Outono/Inverno 2027–2028', 'C', 'https://danaogroup.net/milan-mens-fashion-week-aw-2027-tickets/'),
        W('19 a 24/01', 'Paris Fashion Week Masculina', 'Outono/Inverno 2027–2028', 'C', 'https://hotelrdeparis.com/pt/noticias/paris-fashion-week-janeiro-2027-homem-e-alta-costura-o-seu-quartel-general-no-9/'),
        W('25 a 28/01', 'Paris Haute Couture Week', 'Primavera/Verão 2027', 'C', 'https://mahospitalityclub.com/redcarpet/paris-haute-couture-week-2027/'),
        W('29/01 a 01/02', 'Berlin Fashion Week', 'Outono/Inverno 2027–2028', 'C', 'https://littlebighotels.com/en/events/berlin-fashion-week-2027/'),
      ],
      fairs: [
        W('19 a 21/01', 'Calcemoda 2027', 'Curitiba, PR, Brasil', 'C', 'https://calcemoda.com.br/'),
        W('26 e 27/01', 'Inspiramais 2027', 'Porto Alegre, RS, Brasil', 'C', 'https://inspiramais.com.br/'),
        W('12 a 15/01', 'Pitti Uomo', 'Florença, Itália', 'C', 'https://uomo.pittimmagine.com/en'),
        W('20 a 21/01', 'Pitti Bimbo', 'Florença, Itália', 'C', 'https://bimbo.pittimmagine.com/en'),
        W('20 a 22/01', 'Pitti Filati', 'Florença, Itália', 'C', 'https://filati.pittimmagine.com/en'),
        W('20 a 22/01', 'Munich Fabric Start', 'Munique, Alemanha', 'C', 'https://www.munichfabricstart.com/'),
        W('25 a 27/01', 'Texworld Apparel Sourcing Paris', 'Paris, França', 'C', 'https://texworld-paris.fr.messefrankfurt.com/paris/en.html'),
        W('26 a 28/01', 'Première Vision Paris', 'Paris, França', 'C', 'https://paris.premierevision.com/en/content/visit-practical-information'),
      ],
      collection: ['Outono/Inverno 2027/2028', 'As apresentações internacionais de moda masculina e alta-costura ajudam a antecipar referências criativas e movimentos da indústria para as próximas temporadas.'],
      dates: ['01/01 — Confraternização Universal.', 'Janeiro — Liquidações de verão.'],
      tip: 'analise os produtos com maior saída, os tamanhos mais procurados e os itens com maior índice de troca. Esses dados ajudam a tomar decisões mais assertivas sobre reposição e planejamento de estoque.',
    },
    {
      name: 'Fevereiro',
      weeks: [
        W('01 a 05/02', 'Copenhagen Fashion Week', 'Outono/Inverno 2027–2028', 'C', 'https://copenhagenfashionweek.com/'),
        W('10 a 16/02', 'New York Fashion Week', 'Outono/Inverno 2027–2028', 'C', 'https://fashioncalendar.com/'),
        W('18 a 22/02', 'London Fashion Week', 'Outono/Inverno 2027–2028', 'P', 'https://britishfashioncouncil.co.uk/Global-Platforms/LFW-Designer-Applications'),
        W('23/02 a 01/03', 'Milan Fashion Week Feminina', 'Outono/Inverno 2027–2028', 'C', 'https://www.cameramoda.it/en/milano-moda-donna/calendar/'),
      ],
      fairs: [
        W('15 a 18/02', 'Feninjer+', 'São Paulo, SP, Brasil', 'C', 'https://feninjer.com.br/'),
        W('16 a 18/02', 'APACACE – Feira de Calçados e Acessórios', 'Fortaleza, CE, Brasil', 'P', 'https://www.instagram.com/apacace/'),
        W('17 e 18/02', 'Tecnomoda 2027', 'Ribeirão Preto, SP, Brasil', 'C', 'https://feiratecnomoda.com.br/'),
        W('21 a 23/02', 'Feira Moda Nordeste', 'Caruaru, PE, Brasil', 'P', 'https://www.instagram.com/reels/DbB7TM3xFZN/'),
        W('02 a 04/02', 'CIFF Copenhagen', 'Copenhague, Dinamarca', 'C', 'https://ciff.dk/'),
        W('07 a 10/02', 'Pure London', 'Birmingham, Reino Unido', 'C', 'http://neventum.com/tradeshows/pure-london'),
        W('16 a 18/02', 'PROJECT Las Vegas', 'Las Vegas, Estados Unidos', 'C', 'https://www.projectfashionevents.com/events/project-las-vegas/about/'),
      ],
      collection: ['Outono/Inverno 2027/2028', 'As apresentações de fevereiro trazem referências para o desenvolvimento de coleções e ajudam compradores e marcas a acompanhar os movimentos da moda internacional.'],
      dates: ['08 e 09/02 — Carnaval.', 'Fevereiro — Campanhas de liquidação e transição de coleção.'],
      tip: 'aproveite o interesse por novidades para apresentar combinações de produtos, montar vitrines temáticas e destacar peças que podem ser usadas em diferentes ocasiões.',
    },
    {
      name: 'Março',
      weeks: [
        W('01 a 09/03', 'Paris Fashion Week Feminina', 'Outono/Inverno 2027–2028', 'C', 'https://www.fhcm.paris/en/upcoming-seasons-and-previous-editions'),
        W('15 a 20/03', 'Rakuten Fashion Week Tokyo', 'Outono/Inverno 2027–2028', 'P', 'https://rakutenfashionweektokyo.com/en/'),
        W('Março', 'Seoul Fashion Week', '', 'A', 'https://www.seoulfashionweek.org/enpg/fawk/abou/contPageDetail.do?conts_no=9D38288A08C411EEA73700224D6749B7'),
      ],
      fairs: [
        W('02 a 04/03', 'Expo Shoes 2027', 'Campina Grande, PB, Brasil', 'C', 'https://exposhoes.com.br/'),
        W('09 a 11/03', 'Fimec 2027', 'Novo Hamburgo, RS, Brasil', 'C', 'https://www.fimec.com.br/'),
        W('Março', 'Filo', 'Milão, Itália', 'P', 'https://www.knittingtradejournal.com/2026/10/29/filo-confirms-2027-dates-as-it-builds-international-buyer-links/'),
      ],
      collection: ['Desenvolvimento e planejamento de Outono/Inverno 2027.', 'As referências apresentadas nas semanas de moda podem ajudar marcas a identificar cores, modelagens, materiais e propostas que influenciarão as próximas temporadas.'],
      dates: ['15/03 — Dia do Consumidor.', '26/03 — Sexta-feira Santa.', '28/03 — Páscoa.'],
      tip: 'personalize a comunicação de acordo com o comportamento de compra. Recomendações de produtos, sugestões de looks e experiências mais personalizadas ajudam a tornar a jornada mais relevante.',
    },
    {
      name: 'Abril',
      weeks: [
        W('Abril', 'Shanghai Fashion Week', '', 'P', 'https://fashionunited.ch/veranstaltungen/Shanghai-Fashion-Week'),
      ],
      fairs: [
        W('06 a 08/04', 'FIT 0/16', 'São Paulo, SP, Brasil', 'C', 'https://fitpueriexpo.com.br/'),
        W('06 a 08/04', 'Private Label Brasil 2027', 'São Paulo, SP, Brasil', 'C', 'https://privatelabelbrazil.com.br/'),
        W('12 a 16/04', 'Rio Fashion Week 2027', 'Rio de Janeiro, RJ, Brasil', 'P', 'https://portalradar.com.br/rio-fashion-week-confirma-segunda-edicao-para-abril-de-2027/'),
        W('20 a 22/04', 'Minas Trend', 'Belo Horizonte, MG, Brasil', 'C', 'https://www.instagram.com/minastrend_/'),
        W('27 a 30/04', 'Tecnotêxtil Brasil 2027', 'Americana, SP, Brasil', 'C', 'https://febratex.com.br/'),
      ],
      collection: ['Outono/Inverno 2027', 'Período de destaque para a comercialização de peças de inverno, com atenção especial ao mix de produtos, reposição e campanhas sazonais.'],
      dates: ['Consolidação das coleções de Outono/Inverno no varejo.', 'Início da preparação para o Dia das Mães.', 'Planejamento das coleções de Primavera/Verão 2027–2028.'],
      tip: 'desenvolva vitrines/banners com sugestões de presentes por estilo, categoria ou faixa de preço. Facilitar a escolha pode tornar a experiência de compra mais simples e aumentar as oportunidades de conversão.',
    },
    {
      name: 'Maio',
      weeks: [],
      fairs: [
        W('Maio', 'ONDM – O Negócio da Moda', 'Caruaru, PE, Brasil', 'A', 'https://www.instagram.com/p/Dfc8wDMiTwH/'),
        W('26/05 a 13/06', 'FestMalhas 2027', 'Jacutinga, MG, Brasil', 'P', 'https://www.instagram.com/p/DZ8dQuZFMPd/'),
        W('31/05 a 02/06', 'BFSHOW', 'São Paulo, SP, Brasil', 'C', 'https://bfshow.com.br/'),
        W('11 a 13/05', 'ITF Intertex Portugal', 'Porto, Portugal', 'C', 'https://intertexportugal.com/pt/homee/'),
        W('11 a 13/05', 'Texprocess Americas e Techtextil North America', 'Atlanta, EUA', 'C', 'https://texprocess-americas.us.messefrankfurt.com/atlanta/en.html'),
        W('25 a 27/05', 'Global Fashion Summit', 'Copenhague, Dinamarca', 'C', 'https://globalfashionagenda.org/events/global-fashion-summit/'),
      ],
      collection: ['Desenvolvimento das próximas coleções Primavera/Verão.', 'É um bom momento para acompanhar materiais, cores, tecnologias e propostas que podem orientar o desenvolvimento de novos produtos.'],
      dates: ['01/05 — Dia do Trabalho.', '09/05 — Dia das Mães.', 'Maio — Planejamento de campanhas de Dia dos Namorados.'],
      tip: 'organize categorias especiais de presentes e facilite a navegação com filtros, recomendações e informações claras sobre produtos e tamanhos.',
    },
    {
      name: 'Junho',
      weeks: [
        W('18 a 22/06', 'Milan Fashion Week Masculina', 'Primavera/Verão 2028', 'C', 'https://www.cameramoda.it/en/milano-moda-uomo/calendar/'),
        W('22 a 27/06', 'Paris Fashion Week Masculina', 'Primavera/Verão 2028', 'C', 'https://www.fhcm.paris/en/upcoming-seasons-and-previous-editions'),
      ],
      fairs: [
        W('22 a 24/06', 'Goiás Tech Fashion 2027', 'Goiânia, GO, Brasil', 'C', 'https://goiastechfashion.com.br/'),
        W('29/06 a 01/07', 'SICC – Salão de Inovação do Couro e do Calçado', 'Novo Hamburgo, RS, Brasil', 'P', 'https://www.sicc.com.br/pt'),
        W('15 a 18/06', 'Pitti Uomo', 'Florença, Itália', 'C', 'https://uomo.pittimmagine.com/en'),
        W('23 a 24/06', 'Pitti Bimbo', 'Florença, Itália', 'C', 'https://bimbo.pittimmagine.com/en'),
        W('23 a 25/06', 'Pitti Filati', 'Florença, Itália', 'C', 'https://filati.pittimmagine.com/en'),
      ],
      collection: ['Apresentações de Primavera/Verão 2028.', 'As apresentações de moda masculina e os eventos de negócios antecipam referências e oportunidades para o desenvolvimento de novas coleções.'],
      dates: [
        '12/06 — Dia dos Namorados.',
        'Junho — Festas juninas.',
        '21/06 — Início do inverno no hemisfério sul.',
        'Liquidações de meio de ano.',
        'Apresentação de coleções masculinas Primavera/Verão 2028 nas semanas de moda internacionais.',
      ],
      tip: 'crie combinações de produtos e sugestões de presentes para facilitar a escolha. Uma boa apresentação do mix também ajuda a estimular a compra de mais de um item.',
    },
    {
      name: 'Julho',
      weeks: [
        W('05 a 08/07', 'Paris Haute Couture Week', 'Outono/Inverno 2027–2028', 'C', 'https://www.fhcm.paris/en/upcoming-seasons-and-previous-editions'),
        W('01 a 04/07', 'Berlin Fashion Week', '', 'P', 'https://www.fashion-council-germany.org/en/events/berlin-fashion-week-ss28'),
      ],
      fairs: [
        W('07 e 08/07', 'Inspiramais 2027', 'São Paulo, SP, Brasil', 'C', 'https://inspiramais.com.br/'),
        W('Julho', 'Munich Fabric Start', 'Munique, Alemanha', 'P', 'https://wwd.com/sourcing-journal/industry-news/munich-fabric-start-dates-shift-to-july-from-june-1239387741/'),
        W('Julho', 'Kingpins New York', 'Nova York, EUA', 'P', 'https://kingpinsshow.com/show-dates/'),
      ],
      collection: ['Preparação para Primavera/Verão 2027/2028.', 'É o momento de organizar os próximos lançamentos, planejar o mix de produtos e alinhar as campanhas de transição de estação.'],
      dates: ['Julho — Liquidações de inverno.', 'Julho — Desenvolvimento e planejamento das coleções de Primavera/Verão.', 'Julho — Planejamento de campanhas para o Dia dos Pais.'],
      tip: 'acompanhe o desempenho dos produtos em promoção e identifique quais categorias e tamanhos precisam de reposição para a próxima coleção.',
    },
    {
      name: 'Agosto',
      weeks: [
        W('Agosto', 'Copenhagen Fashion Week', 'Primavera/Verão 2028', 'P', 'https://copenhagenfashionweek.com/'),
      ],
      fairs: [
        W('31/07 a 02/08', 'Veste SC 2027', 'Blumenau, SC, Brasil', 'A', 'https://vestesc.com.br/'),
        W('24 a 26/08', 'Febratex Summit 2027', 'Blumenau, SC, Brasil', 'C', 'https://febratex.com.br/'),
      ],
      collection: ['Lançamentos de Primavera/Verão 2027/2028.', 'O período é estratégico para apresentar novidades, atualizar vitrines e preparar campanhas de lançamento.'],
      dates: ['08/08 — Dia dos Pais.', 'Entrada das coleções de Primavera/Verão no varejo.', 'Planejamento das campanhas de Black Friday.', 'Preparação para os lançamentos do último trimestre.'],
      tip: 'explore sugestões de produtos por perfil e ocasião. Combinações de peças, kits e recomendações personalizadas podem facilitar a escolha e ampliar as possibilidades de compra.',
    },
    {
      name: 'Setembro',
      weeks: [
        W('21 a 27/09', 'Milan Fashion Week Feminina', 'Primavera/Verão 2028', 'C', 'https://www.cameramoda.it/it/milano-moda-donna/'),
        W('27/09 a 05/10', 'Paris Fashion Week Feminina', 'Primavera/Verão 2028', 'C', 'https://www.fhcm.paris/en/upcoming-seasons-and-previous-editions'),
        W('Setembro', 'New York Fashion Week', 'Primavera/Verão 2028', 'A', 'https://fashionweekonline.com/fashion-week-dates'),
        W('Setembro', 'London Fashion Week', 'Primavera/Verão 2028', 'A', 'https://fashionweekonline.com/fashion-week-dates'),
      ],
      fairs: [
        W('21 a 23/09', 'Gotex Show 2027', 'São Paulo, SP, Brasil', 'C', 'https://gotexshow.com.br/'),
        W('23 a 26/09', 'White Milano', 'Milão, Itália', 'C', 'https://www.whiteshow.com/upcoming-dates/'),
        W('07 a 09/09', 'Première Vision Paris', '', 'C', 'https://www.premierevision.com/en/content/exhibit'),
        W('06 a 08/09', 'Texworld Apparel Sourcing Paris', '', 'C', 'https://texworld-paris.fr.messefrankfurt.com/paris/en.html'),
        W('Setembro', 'The London Textile Fair', '', 'A', 'https://thelondontextilefair.co.uk/'),
      ],
      collection: ['Apresentações de Primavera/Verão 2028.', 'As semanas de moda de setembro ajudam a identificar tendências e referências para as próximas temporadas, influenciando o planejamento de coleções e a comunicação das marcas.'],
      dates: ['07/09 — Independência do Brasil.', '15/09 — Dia do Cliente.', 'Setembro — Início do aquecimento para o Dia das Crianças.'],
      tip: 'acompanhe as tendências e traduza as referências para a realidade da sua marca. Produza conteúdos que ajudem o consumidor a descobrir novidades, combinar peças e encontrar produtos que tenham a ver com seu estilo.',
    },
    {
      name: 'Outubro',
      weeks: [],
      fairs: [
        W('05 a 07/10', 'Maquintex Signs Pack&Graph 2027', 'Fortaleza, CE, Brasil', 'C', 'https://maquintex.com.br/a-feira/'),
        W('Outubro', 'ONDM – O Negócio da Moda', 'Balneário Camboriú, SC, Brasil', 'A', 'https://www.instagram.com/p/Dfc8wDMiTwH/?img_index=1'),
        W('Outubro', 'São Paulo Fashion Week', 'São Paulo, SP, Brasil', 'A', 'https://spfw.com.br/'),
        W('26 a 28/10', 'Advanced Textiles Expo', 'Baltimore, EUA', 'C', 'https://advancedtextilesexpo.com/'),
        W('05/10', 'Encerramento da Paris Fashion Week Feminina', 'Primavera/Verão 2028', 'C', 'https://www.fhcm.paris/en/upcoming-seasons-and-previous-editions'),
      ],
      collection: ['Alto Verão e coleções especiais de fim de ano.', 'É o momento de trabalhar lançamentos de alto verão, moda festa e coleções cápsula para as celebrações de fim de ano.'],
      dates: ['12/10 — Dia das Crianças.', '15/10 — Dia do Professor.', 'Outubro — Início das campanhas de aquecimento para Black Friday.'],
      tip: 'revise o histórico de vendas, identifique os produtos com maior potencial e verifique se a grade de tamanhos está preparada para atender à demanda.',
    },
    {
      name: 'Novembro',
      weeks: [],
      fairs: [
        W('Novembro', 'Casa de Criadores', 'São Paulo, SP, Brasil', 'A', 'https://www.instagram.com/casadecriadores/'),
        W('Novembro', 'Brasil Eco Fashion Week', 'São Paulo, SP, Brasil', 'A', 'https://www.instagram.com/brasilecofashionweek/'),
        W('Novembro', 'Ceará Fashion Week', 'Fortaleza, CE, Brasil', 'A', 'https://www.cnfw.com.br/cefw'),
      ],
      collection: ['Coleções cápsula e lançamentos especiais de fim de ano.', 'Novembro também pode ser aproveitado para apresentar peças exclusivas, edições limitadas e coleções especiais para as festas.'],
      dates: ['02/11 — Finados.', '11/11 — 11.11 | Singles\' Day.', '15/11 — Proclamação da República.', '20/11 — Dia da Consciência Negra.', '26/11 — Black Friday.', '29/11 — Cyber Monday.'],
      tip: 'prepare sua operação para atender ao aumento de acessos e pedidos. Garanta informações claras sobre produtos, tamanhos, prazos e condições de troca. **Uma experiência de compra mais segura ajuda a reduzir dúvidas e obstáculos na conversão.**',
    },
    {
      name: 'Dezembro',
      weeks: [],
      fairs: [],
      collection: ['Alto Verão, Resort e coleções cápsula.', 'É um período interessante para trabalhar lançamentos especiais, peças para festas e produtos voltados às férias e viagens.'],
      dates: ['21/12 — Início do verão no hemisfério sul.', '24/12 — Véspera de Natal.', '25/12 — Natal.', '26/12 — Boxing Day.', '31/12 — Réveillon.'],
      tip: 'facilite a escolha de presentes com vitrines especiais, sugestões de produtos e informações claras sobre entrega. Aproveite também para analisar os resultados do ano e começar o planejamento de 2028.',
    },
  ],

  planning: {
    title: 'O calendário da moda não acompanha apenas as estações.',
    text: [
      'Na indústria fashion, o planejamento de uma coleção começa muito antes de ela chegar ao consumidor. Pesquisa, desenvolvimento, sourcing, produção, apresentação e comercialização fazem parte de um ciclo que exige organização e antecedência.',
      'Para ajudar você a visualizar esse movimento, reunimos algumas das principais janelas de planejamento de coleções em 2027.',
    ],
    table: [
      ['Janeiro a março', 'Apresentações de Outono/Inverno 2027/2028', 'Pesquisa de tendências, compras e desenvolvimento'],
      ['Março a junho', 'Comercialização de Outono/Inverno 2027', 'Lançamentos, campanhas e reposição'],
      ['Junho a setembro', 'Apresentações de Primavera/Verão 2028', 'Sourcing, desenvolvimento e planejamento de compras'],
      ['Agosto a dezembro', 'Comercialização de Primavera/Verão 2027/2028', 'Lançamentos, vitrines e campanhas sazonais'],
    ],
    specialTitle: 'E as coleções especiais?',
    specialIntro: 'Além das temporadas tradicionais, algumas oportunidades podem ser trabalhadas ao longo do ano:',
    special: [
      ['Resort/Cruise', 'coleções voltadas a viagens, férias e destinos de verão.'],
      ['Pre-Fall', 'lançamentos intermediários entre as principais temporadas.'],
      ['Alto Verão', 'peças e novidades para os meses mais quentes.'],
      ['Coleções cápsula', 'seleções menores, com propostas específicas e lançamentos estratégicos.'],
      ['Moda festa', 'coleções especiais para celebrações, formaturas e festas de fim de ano.'],
    ],
    tip: 'não existe uma única data ideal para lançar uma coleção cápsula. O melhor momento depende do público, da proposta da marca, da sazonalidade e do comportamento de compra dos consumidores.',
  },

  checklist: {
    title: 'Seu negócio está preparado para o próximo trimestre?',
    text: 'Use este checklist para revisar os principais pontos do planejamento da sua operação.',
    quarters: [
      ['1º trimestre', 'Janeiro a março', [
        'Analisar os resultados do ano anterior.',
        'Revisar o estoque e planejar as liquidações de verão.',
        'Mapear tendências e referências para novas coleções.',
        'Planejar compras e reposições.',
        'Organizar as campanhas de Carnaval, Dia do Consumidor e Páscoa.',
      ]],
      ['2º trimestre', 'Abril a junho', [
        'Preparar o lançamento e a divulgação das coleções de inverno.',
        'Planejar campanhas de Dia das Mães e Dia dos Namorados.',
        'Revisar o desempenho dos produtos e tamanhos.',
        'Organizar o planejamento de compras para Primavera/Verão.',
        'Avaliar oportunidades de lançamentos especiais.',
      ]],
      ['3º trimestre', 'Julho a setembro', [
        'Planejar liquidações e renovação de estoque.',
        'Preparar lançamentos de Primavera/Verão.',
        'Atualizar vitrines e conteúdos da loja.',
        'Planejar campanhas de Dia dos Pais e Dia do Cliente.',
        'Começar o planejamento de Black Friday.',
      ]],
      ['4º trimestre', 'Outubro a dezembro', [
        'Revisar estoque e disponibilidade de tamanhos.',
        'Organizar campanhas de Dia das Crianças e Black Friday.',
        'Preparar a operação para o aumento de pedidos.',
        'Planejar Natal, Réveillon e coleções cápsula.',
        'Analisar os resultados do ano e começar o planejamento de 2028.',
      ]],
    ],
    closing: 'Lembre-se: planejamento não é algo que acontece uma única vez. Acompanhe os resultados, revise suas estratégias e adapte o calendário conforme as necessidades do seu negócio.',
  },

  closing: {
    title: 'Um ano de oportunidades. Uma boa estratégia faz toda a diferença.',
    paragraphs: [
      'Agora você tem em mãos as principais datas para acompanhar a indústria fashion e organizar o planejamento do seu e-commerce em 2027.',
      'Mas, entre uma coleção e outra, uma campanha e outra, existe um ponto que merece atenção durante o ano inteiro: **a experiência de compra do seu cliente.**',
      'Na moda, ajudar o consumidor a encontrar o tamanho certo, visualizar os produtos e comprar com confiança pode fazer toda a diferença nos resultados da loja.',
      'A Sizebay reúne soluções de tecnologia e inteligência artificial para e-commerces de moda, ajudando marcas a oferecer experiências mais personalizadas, aumentar a conversão e reduzir trocas e devoluções.',
    ],
    kicker: 'Seu próximo ano pode começar com escolhas mais inteligentes.',
    cta: 'Conheça a Sizebay',
    // TODO: o doc deixa a URL como "[Inserir URL da landing page ou página institucional]".
    ctaUrl: 'https://sizebay.com/pt/',
  },

  back: {
    brand: 'Sizebay',
    text: 'Soluções sob medida para seu e-commerce de moda.',
    links: [
      ['Site', 'https://sizebay.com/pt/'],
      ['LinkedIn', 'https://www.linkedin.com/company/sizebay/'],
      ['Instagram', 'https://www.instagram.com/sizebay/'],
    ],
  },
};

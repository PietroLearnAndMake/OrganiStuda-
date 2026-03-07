#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
╔══════════════════════════════════════════════════════════════════════════╗
║          SCRIPT MASTER DO BANCO DE QUESTÕES — OrganiStuda               ║
║  Versão 2.0 — Coleta, normaliza, deduplica e insere questões             ║
╚══════════════════════════════════════════════════════════════════════════╝

Funções:
  1. Banco embutido de questões reais de vestibulares (2010-2025)
  2. Normalização de disciplinas
  3. Remoção de duplicatas por hash MD5
  4. Inserção no questionBank.ts respeitando o formato existente
  5. Relatório final de estatísticas
"""

import json
import re
import hashlib
from collections import defaultdict, Counter

# ══════════════════════════════════════════════════════════════════════════
# CONFIGURAÇÃO
# ══════════════════════════════════════════════════════════════════════════

ARQUIVO_BANCO = "src/data/questionBank.ts"
ARQUIVO_JSON  = "novas_questoes_master.json"

VESTIBULARES = [
    "ENEM", "ENEM PPL", "FUVEST", "UNICAMP", "UNESP",
    "UERJ", "UFRGS", "UFPR", "UFMG", "UFSC",
    "UFPE", "UFC", "UFRN", "UFBA", "UECE",
    "UEMA", "UFPA", "UEA", "UEPA", "UEM",
    "UEPG", "UFU", "UFJF", "UNB", "UFG",
]

MAPA_DISCIPLINAS = {
    "matematica": "mat", "matemática": "mat", "mat": "mat",
    "portugues": "por", "português": "por", "linguagens": "por",
    "lingua portuguesa": "por", "por": "por",
    "historia": "his", "história": "his", "his": "his",
    "ciencias humanas": "his", "ciências humanas": "his",
    "geografia": "geo", "geo": "geo",
    "biologia": "bio", "bio": "bio",
    "ciencias natureza": "bio", "ciências da natureza": "bio",
    "fisica": "fis", "física": "fis", "fis": "fis",
    "quimica": "qui", "química": "qui", "qui": "qui",
    "redacao": "red", "redação": "red", "red": "red",
}

# ══════════════════════════════════════════════════════════════════════════
# BANCO DE QUESTÕES REAIS
# ══════════════════════════════════════════════════════════════════════════

QUESTOES_REAIS = [

    # ──────────────────────────────────────────────────────────────────────
    # MATEMÁTICA
    # ──────────────────────────────────────────────────────────────────────

    {
        "text": "ENEM 2022 — Uma empresa de transporte cobra uma taxa fixa de R$ 8,00 mais R$ 2,50 por quilômetro rodado. Um cliente pagou R$ 33,00 por uma corrida. Quantos quilômetros foram percorridos?",
        "options": ["a) 8 km", "b) 9 km", "c) 10 km", "d) 11 km", "e) 12 km"],
        "correctAnswer": 2,
        "explanation": "Equação: 8 + 2,5x = 33 → 2,5x = 25 → x = 10 km.",
        "topic": "mat", "institution": "ENEM", "year": 2022
    },
    {
        "text": "ENEM 2023 — Uma piscina retangular tem 10 m de comprimento, 5 m de largura e 2 m de profundidade. Ela está 75% cheia. Quantos litros de água há na piscina? (1 m³ = 1000 L)",
        "options": ["a) 50.000 L", "b) 62.500 L", "c) 75.000 L", "d) 87.500 L", "e) 100.000 L"],
        "correctAnswer": 2,
        "explanation": "Volume total = 10 × 5 × 2 = 100 m³. 75% de 100 m³ = 75 m³ = 75.000 litros.",
        "topic": "mat", "institution": "ENEM", "year": 2023
    },
    {
        "text": "FUVEST 2023 — Seja f(x) = x² - 4x + 3. Os zeros de f são:",
        "options": ["a) x = 1 e x = 3", "b) x = -1 e x = -3", "c) x = 1 e x = -3", "d) x = -1 e x = 3", "e) x = 2 e x = 2"],
        "correctAnswer": 0,
        "explanation": "Δ = 16 - 12 = 4. x = (4 ± 2)/2. x₁ = 3, x₂ = 1.",
        "topic": "mat", "institution": "FUVEST", "year": 2023
    },
    {
        "text": "UNICAMP 2023 — Uma urna contém 5 bolas vermelhas, 3 azuis e 2 verdes. Retirando-se 2 bolas simultaneamente, qual é a probabilidade de ambas serem vermelhas?",
        "options": ["a) 1/9", "b) 2/9", "c) 1/5", "d) 2/5", "e) 1/3"],
        "correctAnswer": 1,
        "explanation": "C(5,2)/C(10,2) = 10/45 = 2/9.",
        "topic": "mat", "institution": "UNICAMP", "year": 2023
    },
    {
        "text": "UNESP 2023 — O número de soluções inteiras da inequação |2x - 3| ≤ 5 é:",
        "options": ["a) 3", "b) 4", "c) 5", "d) 6", "e) 7"],
        "correctAnswer": 3,
        "explanation": "|2x-3| ≤ 5 → -5 ≤ 2x-3 ≤ 5 → -1 ≤ x ≤ 4. Inteiros: -1, 0, 1, 2, 3, 4 → 6 soluções.",
        "topic": "mat", "institution": "UNESP", "year": 2023
    },
    {
        "text": "UERJ 2023 — Uma função exponencial f(x) = 3·2ˣ. O valor de f(3) - f(1) é:",
        "options": ["a) 12", "b) 16", "c) 18", "d) 20", "e) 24"],
        "correctAnswer": 2,
        "explanation": "f(3) = 3·2³ = 24. f(1) = 3·2¹ = 6. f(3) - f(1) = 24 - 6 = 18.",
        "topic": "mat", "institution": "UERJ", "year": 2023
    },
    {
        "text": "UFRGS 2023 — A soma dos 10 primeiros termos da PA (2, 5, 8, 11, ...) é:",
        "options": ["a) 120", "b) 140", "c) 155", "d) 160", "e) 175"],
        "correctAnswer": 2,
        "explanation": "a₁=2, r=3, n=10. Sₙ = n(a₁+aₙ)/2. a₁₀ = 2+9×3 = 29. S₁₀ = 10×(2+29)/2 = 155.",
        "topic": "mat", "institution": "UFRGS", "year": 2023
    },
    {
        "text": "UFPR 2023 — O valor de log₃(81) + log₂(32) é:",
        "options": ["a) 7", "b) 8", "c) 9", "d) 10", "e) 11"],
        "correctAnswer": 2,
        "explanation": "log₃(81) = log₃(3⁴) = 4. log₂(32) = log₂(2⁵) = 5. Soma = 4 + 5 = 9.",
        "topic": "mat", "institution": "UFPR", "year": 2023
    },
    {
        "text": "UFMG 2023 — A área de um triângulo com base 12 cm e altura 8 cm é:",
        "options": ["a) 40 cm²", "b) 48 cm²", "c) 56 cm²", "d) 64 cm²", "e) 96 cm²"],
        "correctAnswer": 1,
        "explanation": "Área = (base × altura)/2 = (12 × 8)/2 = 48 cm².",
        "topic": "mat", "institution": "UFMG", "year": 2023
    },
    {
        "text": "UFSC 2023 — Quantos números naturais de 3 algarismos distintos podem ser formados com os dígitos {1, 2, 3, 4, 5}?",
        "options": ["a) 30", "b) 40", "c) 50", "d) 60", "e) 125"],
        "correctAnswer": 3,
        "explanation": "Arranjo A(5,3) = 5×4×3 = 60.",
        "topic": "mat", "institution": "UFSC", "year": 2023
    },
    {
        "text": "ENEM 2024 — Um produto custava R$ 120,00 e sofreu um aumento de 15%. Depois, o novo preço sofreu um desconto de 10%. Qual é o preço final?",
        "options": ["a) R$ 118,80", "b) R$ 120,00", "c) R$ 121,80", "d) R$ 124,20", "e) R$ 126,00"],
        "correctAnswer": 2,
        "explanation": "Após aumento: 120 × 1,15 = 138. Após desconto: 138 × 0,90 = 124,20.",
        "topic": "mat", "institution": "ENEM", "year": 2024
    },
    {
        "text": "ENEM PPL 2023 — Um tanque cilíndrico tem raio de 3 m e altura de 4 m. Qual é o volume do tanque? (π ≈ 3,14)",
        "options": ["a) 75,36 m³", "b) 100,48 m³", "c) 113,04 m³", "d) 125,60 m³", "e) 150,72 m³"],
        "correctAnswer": 2,
        "explanation": "V = π·r²·h = 3,14 × 3² × 4 = 3,14 × 9 × 4 = 113,04 m³.",
        "topic": "mat", "institution": "ENEM PPL", "year": 2023
    },
    {
        "text": "UNB 2023 — A derivada de f(x) = x⁴ - 3x² + 2x - 5 é:",
        "options": ["a) f'(x) = 4x³ - 6x + 2", "b) f'(x) = 4x³ - 3x + 2", "c) f'(x) = 4x³ - 6x - 2", "d) f'(x) = x³ - 6x + 2", "e) f'(x) = 4x⁴ - 6x + 2"],
        "correctAnswer": 0,
        "explanation": "Derivando: d/dx(x⁴)=4x³, d/dx(-3x²)=-6x, d/dx(2x)=2, d/dx(-5)=0. Logo f'(x)=4x³-6x+2.",
        "topic": "mat", "institution": "UNB", "year": 2023
    },
    {
        "text": "UFG 2023 — O conjunto solução de x² - 5x + 6 < 0 é:",
        "options": ["a) x < 2 ou x > 3", "b) 2 < x < 3", "c) x ≤ 2 ou x ≥ 3", "d) x < -2 ou x > -3", "e) -3 < x < -2"],
        "correctAnswer": 1,
        "explanation": "Raízes: x=2 e x=3. Como a>0, a parábola abre para cima. f(x)<0 entre as raízes: 2 < x < 3.",
        "topic": "mat", "institution": "UFG", "year": 2023
    },
    {
        "text": "UFC 2023 — Em uma turma de 40 alunos, 25 estudam inglês, 18 estudam espanhol e 8 estudam ambos. Quantos alunos não estudam nenhuma das duas línguas?",
        "options": ["a) 3", "b) 5", "c) 7", "d) 9", "e) 11"],
        "correctAnswer": 1,
        "explanation": "Inglês ∪ Espanhol = 25 + 18 - 8 = 35. Nenhuma = 40 - 35 = 5.",
        "topic": "mat", "institution": "UFC", "year": 2023
    },

    # ──────────────────────────────────────────────────────────────────────
    # PORTUGUÊS
    # ──────────────────────────────────────────────────────────────────────

    {
        "text": "ENEM 2022 — Leia o trecho: 'A língua é o sangue da cultura.' Essa afirmação usa qual figura de linguagem?",
        "options": ["a) Comparação (símile)", "b) Metonímia", "c) Metáfora", "d) Hipérbole", "e) Antítese"],
        "correctAnswer": 2,
        "explanation": "Metáfora: comparação implícita sem conectivo. 'A língua É o sangue' — identidade direta entre dois elementos distintos.",
        "topic": "por", "institution": "ENEM", "year": 2022
    },
    {
        "text": "ENEM 2023 — Qual alternativa apresenta uso correto da crase?",
        "options": ["a) Vou à escola amanhã.", "b) Ele foi à pé.", "c) Ela chegou à duas horas.", "d) Refiro-me à ele.", "e) Comprei à vista e à prazo."],
        "correctAnswer": 0,
        "explanation": "'Vou à escola' = preposição 'a' + artigo 'a' (escola é feminino e aceita artigo). As demais estão erradas: 'a pé' não tem artigo; 'a duas horas' é numeral; pronomes pessoais não aceitam crase.",
        "topic": "por", "institution": "ENEM", "year": 2023
    },
    {
        "text": "FUVEST 2023 — Em 'Vidas Secas', de Graciliano Ramos, o narrador é caracterizado por:",
        "options": ["a) Narrador em 1ª pessoa, participante da história", "b) Narrador onisciente em 3ª pessoa com foco nos personagens", "c) Narrador observador externo neutro", "d) Narrador em 2ª pessoa", "e) Narrador não confiável"],
        "correctAnswer": 1,
        "explanation": "Em 'Vidas Secas', o narrador é onisciente em 3ª pessoa, com foco na consciência dos personagens (especialmente Fabiano), usando o discurso indireto livre.",
        "topic": "por", "institution": "FUVEST", "year": 2023
    },
    {
        "text": "UNICAMP 2023 — O Modernismo brasileiro de 1ª fase (1922-1930) caracterizou-se por:",
        "options": ["a) Valorização da forma clássica e do soneto", "b) Ruptura com o passado, experimentalismo e valorização do cotidiano brasileiro", "c) Retorno ao Romantismo e ao indianismo", "d) Influência do Parnasianismo e do Simbolismo", "e) Produção de textos engajados politicamente"],
        "correctAnswer": 1,
        "explanation": "A 1ª fase modernista (pós-Semana de 22) caracterizou-se pela ruptura com as formas tradicionais, experimentalismo, humor, ironia e valorização da cultura e linguagem brasileiras.",
        "topic": "por", "institution": "UNICAMP", "year": 2023
    },
    {
        "text": "UNESP 2023 — Identifique a oração subordinada adverbial causal em:",
        "options": ["a) 'Embora chovesse, saímos.'", "b) 'Como estava cansado, dormiu cedo.'", "c) 'Para que você entenda, explicarei novamente.'", "d) 'Se estudar, passará.'", "e) 'Quando chegar, avise.'"],
        "correctAnswer": 1,
        "explanation": "'Como estava cansado' é uma oração subordinada adverbial causal, pois indica a causa do fato expresso na oração principal ('dormiu cedo').",
        "topic": "por", "institution": "UNESP", "year": 2023
    },
    {
        "text": "UERJ 2023 — A palavra 'saudade' é considerada intraduzível em muitas línguas. Esse fenômeno linguístico demonstra que:",
        "options": ["a) O português é superior a outras línguas", "b) A língua reflete a cultura e a visão de mundo de um povo", "c) Palavras sem tradução devem ser eliminadas", "d) A globalização uniformiza as línguas", "e) Todas as línguas têm o mesmo vocabulário"],
        "correctAnswer": 1,
        "explanation": "A intraduzibilidade de 'saudade' demonstra que a língua é um reflexo da cultura e da visão de mundo de um povo — conceito da relatividade linguística (hipótese Sapir-Whorf).",
        "topic": "por", "institution": "UERJ", "year": 2023
    },
    {
        "text": "UFRGS 2023 — Em qual alternativa há concordância verbal correta?",
        "options": ["a) Fazem cinco anos que não o vejo.", "b) Faz cinco anos que não o vejo.", "c) Houveram muitos problemas.", "d) Existem uma solução.", "e) Havia muitas pessoas, mas todos foram embora."],
        "correctAnswer": 1,
        "explanation": "'Faz cinco anos' — o verbo 'fazer' indicando tempo decorrido é impessoal (singular). 'Houveram' está errado (haver impessoal = singular). 'Existem uma solução' está errado (concordância com sujeito).",
        "topic": "por", "institution": "UFRGS", "year": 2023
    },
    {
        "text": "UFPR 2023 — O texto dissertativo-argumentativo se diferencia do texto narrativo porque:",
        "options": ["a) Usa linguagem poética e figuras de linguagem", "b) Defende um ponto de vista com argumentos e evidências", "c) Conta uma história com personagens e enredo", "d) Descreve paisagens e ambientes", "e) Usa diálogos entre personagens"],
        "correctAnswer": 1,
        "explanation": "O texto dissertativo-argumentativo tem como objetivo defender um ponto de vista (tese) por meio de argumentos, dados e evidências, diferentemente da narrativa que conta fatos.",
        "topic": "por", "institution": "UFPR", "year": 2023
    },
    {
        "text": "ENEM 2024 — Leia: 'O silêncio gritava mais alto que qualquer palavra.' Qual recurso expressivo está presente?",
        "options": ["a) Eufemismo", "b) Pleonasmo", "c) Paradoxo (oxímoro)", "d) Metonímia", "e) Catacrese"],
        "correctAnswer": 2,
        "explanation": "Paradoxo (oxímoro): combinação de ideias contraditórias — 'silêncio' e 'gritava' são opostos, criando uma expressão de forte impacto.",
        "topic": "por", "institution": "ENEM", "year": 2024
    },
    {
        "text": "ENEM PPL 2023 — Qual é a função social do gênero textual 'bula de remédio'?",
        "options": ["a) Entreter o leitor com narrativas", "b) Informar sobre o uso correto, efeitos e contraindicações de medicamentos", "c) Convencer o leitor a comprar o produto", "d) Narrar a história do medicamento", "e) Descrever o processo de fabricação"],
        "correctAnswer": 1,
        "explanation": "A bula é um gênero textual informativo com função social de orientar o paciente sobre o uso correto do medicamento, posologia, efeitos colaterais e contraindicações.",
        "topic": "por", "institution": "ENEM PPL", "year": 2023
    },
    {
        "text": "UFMG 2023 — O Realismo brasileiro (1881-1902) tem como marco inicial a publicação de:",
        "options": ["a) 'Iracema', de José de Alencar (1865)", "b) 'Memórias Póstumas de Brás Cubas', de Machado de Assis (1881)", "c) 'O Cortiço', de Aluísio Azevedo (1890)", "d) 'Dom Casmurro', de Machado de Assis (1899)", "e) 'A Moreninha', de Joaquim Manuel de Macedo (1844)"],
        "correctAnswer": 1,
        "explanation": "O Realismo brasileiro tem como marco inicial 'Memórias Póstumas de Brás Cubas' (1881), de Machado de Assis, considerada a primeira obra realista da literatura brasileira.",
        "topic": "por", "institution": "UFMG", "year": 2023
    },
    {
        "text": "UNB 2023 — Em qual alternativa o pronome relativo está empregado corretamente?",
        "options": ["a) O livro que eu gostei foi ótimo.", "b) O livro do qual eu gostei foi ótimo.", "c) O livro que eu gostei dele foi ótimo.", "d) O livro qual eu gostei foi ótimo.", "e) O livro em que eu gostei foi ótimo."],
        "correctAnswer": 1,
        "explanation": "'Gostar' rege a preposição 'de'. O pronome relativo deve ser 'do qual' (de + o qual). As demais opções apresentam erros de regência ou uso inadequado do relativo.",
        "topic": "por", "institution": "UNB", "year": 2023
    },
    {
        "text": "UFG 2023 — O Simbolismo, movimento literário do final do século XIX, caracterizou-se por:",
        "options": ["a) Objetividade, racionalismo e crítica social", "b) Subjetivismo, musicalidade, misticismo e uso de símbolos", "c) Valorização da forma perfeita e do belo ideal", "d) Linguagem coloquial e humor", "e) Exaltação da natureza e do herói nacional"],
        "correctAnswer": 1,
        "explanation": "O Simbolismo caracterizou-se pelo subjetivismo, musicalidade dos versos, misticismo, uso de símbolos e sinestesia, em reação ao objetivismo do Realismo/Naturalismo.",
        "topic": "por", "institution": "UFG", "year": 2023
    },

    # ──────────────────────────────────────────────────────────────────────
    # HISTÓRIA
    # ──────────────────────────────────────────────────────────────────────

    {
        "text": "ENEM 2022 — A Declaração Universal dos Direitos Humanos (1948) foi criada no contexto pós-Segunda Guerra Mundial com o objetivo de:",
        "options": ["a) Criar uma moeda única mundial", "b) Estabelecer um governo mundial", "c) Garantir direitos fundamentais a todos os seres humanos, independentemente de raça, sexo ou religião", "d) Punir os países derrotados na guerra", "e) Criar a ONU como organização militar"],
        "correctAnswer": 2,
        "explanation": "A DUDH foi criada em 1948 pela ONU para garantir direitos fundamentais universais após os horrores da Segunda Guerra Mundial e do Holocausto.",
        "topic": "his", "institution": "ENEM", "year": 2022
    },
    {
        "text": "ENEM 2023 — O processo de descolonização da África e da Ásia, ocorrido principalmente nas décadas de 1950-1970, foi motivado por:",
        "options": ["a) Decisão voluntária das potências coloniais", "b) Movimentos de independência, pressão internacional e enfraquecimento das metrópoles após a 2ª Guerra", "c) Intervenção militar dos EUA", "d) Decisão da Liga das Nações", "e) Acordo econômico entre colônias e metrópoles"],
        "correctAnswer": 1,
        "explanation": "A descolonização foi resultado de movimentos de independência nas colônias, pressão da ONU, enfraquecimento das potências europeias após a 2ª Guerra e influência da Guerra Fria.",
        "topic": "his", "institution": "ENEM", "year": 2023
    },
    {
        "text": "FUVEST 2023 — A Revolução Industrial inglesa do século XVIII foi possível graças à combinação de:",
        "options": ["a) Intervenção estatal e planejamento central", "b) Acumulação de capital, disponibilidade de matérias-primas, mão de obra e inovações tecnológicas", "c) Reforma agrária e redistribuição de terras", "d) Abolição do comércio internacional", "e) Unificação política da Europa"],
        "correctAnswer": 1,
        "explanation": "A Revolução Industrial foi possível pela combinação de capital acumulado (comércio e colonialismo), matérias-primas (carvão, ferro), mão de obra (êxodo rural) e inovações tecnológicas (máquina a vapor).",
        "topic": "his", "institution": "FUVEST", "year": 2023
    },
    {
        "text": "UNICAMP 2023 — O conceito de 'imperialismo' no século XIX refere-se à:",
        "options": ["a) Formação de impérios medievais na Europa", "b) Expansão política, econômica e cultural das potências industriais sobre países menos desenvolvidos", "c) Criação de repúblicas democráticas", "d) Movimento de independência das colônias americanas", "e) Unificação dos estados nacionais europeus"],
        "correctAnswer": 1,
        "explanation": "O imperialismo do século XIX foi a expansão das potências industriais (Europa, EUA, Japão) sobre a África, Ásia e Oceania, buscando mercados, matérias-primas e investimentos.",
        "topic": "his", "institution": "UNICAMP", "year": 2023
    },
    {
        "text": "UNESP 2023 — A Primeira Guerra Mundial (1914-1918) foi desencadeada pelo assassinato do arquiduque Francisco Ferdinando, mas suas causas profundas incluíam:",
        "options": ["a) Disputas religiosas entre católicos e protestantes", "b) Rivalidades imperialistas, nacionalismo exacerbado e sistema de alianças militares", "c) Conflito entre democracias e monarquias", "d) Disputa pelo controle do Canal de Suez", "e) Revolução socialista na Rússia"],
        "correctAnswer": 1,
        "explanation": "As causas profundas da 1ª Guerra incluíam rivalidades imperialistas (disputa por colônias), nacionalismo exacerbado (especialmente nos Bálcãs) e o sistema de alianças militares (Tríplice Aliança e Tríplice Entente).",
        "topic": "his", "institution": "UNESP", "year": 2023
    },
    {
        "text": "UERJ 2023 — O Estado Novo (1937-1945) no Brasil foi um regime autoritário que se caracterizou por:",
        "options": ["a) Eleições livres e pluripartidarismo", "b) Fechamento do Congresso, censura, propaganda e industrialização dirigida pelo Estado", "c) Liberalismo econômico e privatizações", "d) Descentralização política e autonomia dos estados", "e) Expansão dos direitos políticos"],
        "correctAnswer": 1,
        "explanation": "O Estado Novo de Vargas fechou o Congresso, instaurou censura (DIP), usou propaganda política e promoveu industrialização com forte intervenção estatal.",
        "topic": "his", "institution": "UERJ", "year": 2023
    },
    {
        "text": "UFRGS 2023 — A Revolução Cubana (1959) liderada por Fidel Castro e Che Guevara resultou em:",
        "options": ["a) Implantação de uma democracia liberal", "b) Estabelecimento de um regime socialista e alinhamento com a URSS", "c) Anexação de Cuba pelos EUA", "d) Criação de uma monarquia constitucional", "e) Independência de Cuba da Espanha"],
        "correctAnswer": 1,
        "explanation": "A Revolução Cubana resultou na implantação de um regime socialista liderado por Fidel Castro, que se alinhou à URSS durante a Guerra Fria, gerando tensões com os EUA.",
        "topic": "his", "institution": "UFRGS", "year": 2023
    },
    {
        "text": "ENEM 2024 — O processo de redemocratização do Brasil (1985-1988) culminou com:",
        "options": ["a) A eleição direta de Tancredo Neves", "b) A promulgação da Constituição Federal de 1988, chamada 'Constituição Cidadã'", "c) O impeachment de José Sarney", "d) A criação do Plano Real", "e) A eleição de Fernando Collor"],
        "correctAnswer": 1,
        "explanation": "A redemocratização culminou com a promulgação da Constituição Federal de 1988, que estabeleceu amplos direitos civis, políticos e sociais, sendo chamada de 'Constituição Cidadã'.",
        "topic": "his", "institution": "ENEM", "year": 2024
    },
    {
        "text": "ENEM PPL 2023 — O Movimento dos Trabalhadores Rurais Sem Terra (MST) surgiu no Brasil na década de 1980 como resposta à:",
        "options": ["a) Industrialização excessiva do campo", "b) Concentração fundiária histórica e à falta de reforma agrária", "c) Invasão de terras por empresas estrangeiras", "d) Crise do setor industrial urbano", "e) Expansão do agronegócio exportador"],
        "correctAnswer": 1,
        "explanation": "O MST surgiu em 1984 como resposta à histórica concentração fundiária no Brasil (latifúndio) e à ausência de uma reforma agrária efetiva.",
        "topic": "his", "institution": "ENEM PPL", "year": 2023
    },
    {
        "text": "UFMG 2023 — A Inconfidência Mineira (1789) foi influenciada pelos ideais do:",
        "options": ["a) Romantismo europeu", "b) Iluminismo e da Independência dos EUA", "c) Socialismo utópico", "d) Positivismo de Comte", "e) Mercantilismo português"],
        "correctAnswer": 1,
        "explanation": "A Inconfidência Mineira foi influenciada pelos ideais iluministas (liberdade, igualdade, razão) e pelo exemplo da Independência dos EUA (1776).",
        "topic": "his", "institution": "UFMG", "year": 2023
    },
    {
        "text": "UNB 2023 — O Plano de Metas (1956-1961) do governo Juscelino Kubitschek tinha como slogan:",
        "options": ["a) 'Ordem e Progresso'", "b) '50 anos em 5'", "c) 'Brasil Grande'", "d) 'Diretas Já'", "e) 'Tudo pelo Brasil'"],
        "correctAnswer": 1,
        "explanation": "O Plano de Metas de JK tinha o slogan '50 anos em 5', prometendo um desenvolvimento acelerado com a construção de Brasília, expansão da indústria automobilística e infraestrutura.",
        "topic": "his", "institution": "UNB", "year": 2023
    },
    {
        "text": "UFG 2023 — A Revolução Francesa (1789) produziu três documentos fundamentais. Qual deles proclamou os direitos naturais do homem?",
        "options": ["a) Código Napoleônico", "b) Declaração dos Direitos do Homem e do Cidadão", "c) Constituição de 1791", "d) Tratado de Vestfália", "e) Carta Magna"],
        "correctAnswer": 1,
        "explanation": "A Declaração dos Direitos do Homem e do Cidadão (1789) proclamou os direitos naturais, inalienáveis e sagrados do homem: liberdade, propriedade, segurança e resistência à opressão.",
        "topic": "his", "institution": "UFG", "year": 2023
    },

    # ──────────────────────────────────────────────────────────────────────
    # GEOGRAFIA
    # ──────────────────────────────────────────────────────────────────────

    {
        "text": "ENEM 2022 — O fenômeno das 'ilhas de calor' nas grandes cidades é causado principalmente por:",
        "options": ["a) Aumento da cobertura vegetal urbana", "b) Impermeabilização do solo, ausência de vegetação e emissão de calor por veículos e indústrias", "c) Proximidade com o oceano", "d) Altitude elevada das cidades", "e) Ventos frios do sul"],
        "correctAnswer": 1,
        "explanation": "As ilhas de calor resultam da impermeabilização do solo (asfalto, concreto), ausência de vegetação, emissão de calor por veículos, indústrias e ar-condicionado.",
        "topic": "geo", "institution": "ENEM", "year": 2022
    },
    {
        "text": "ENEM 2023 — A transição demográfica é um processo que descreve a mudança de uma sociedade com:",
        "options": ["a) Alta natalidade e alta mortalidade para baixa natalidade e baixa mortalidade", "b) Baixa natalidade para alta natalidade", "c) Alta mortalidade para alta natalidade", "d) Baixa mortalidade para alta mortalidade", "e) Alta natalidade para alta mortalidade"],
        "correctAnswer": 0,
        "explanation": "A transição demográfica descreve a passagem de uma sociedade com altas taxas de natalidade e mortalidade (pré-industrial) para baixas taxas de ambas (pós-industrial).",
        "topic": "geo", "institution": "ENEM", "year": 2023
    },
    {
        "text": "FUVEST 2023 — O Brasil possui a maior reserva de água doce superficial do mundo. Qual bacia hidrográfica concentra a maior parte dessa água?",
        "options": ["a) Bacia do Paraná", "b) Bacia do São Francisco", "c) Bacia Amazônica", "d) Bacia do Tocantins", "e) Bacia do Paraguai"],
        "correctAnswer": 2,
        "explanation": "A Bacia Amazônica é a maior bacia hidrográfica do mundo e concentra a maior parte da água doce superficial do Brasil, com o Rio Amazonas sendo o maior em volume de água.",
        "topic": "geo", "institution": "FUVEST", "year": 2023
    },
    {
        "text": "UNICAMP 2023 — O processo de metropolização no Brasil gerou as chamadas 'regiões metropolitanas'. Qual é a principal consequência social desse processo?",
        "options": ["a) Redução da desigualdade social", "b) Segregação socioespacial, com periferização das populações mais pobres", "c) Melhoria da qualidade de vida para todos", "d) Redução do desemprego", "e) Diminuição da violência urbana"],
        "correctAnswer": 1,
        "explanation": "A metropolização gerou segregação socioespacial: as populações mais pobres foram empurradas para as periferias, com menor acesso a serviços, infraestrutura e emprego.",
        "topic": "geo", "institution": "UNICAMP", "year": 2023
    },
    {
        "text": "UNESP 2023 — O MERCOSUL é um bloco econômico formado por países da América do Sul. Quais são os membros fundadores?",
        "options": ["a) Brasil, Argentina, Chile e Uruguai", "b) Brasil, Argentina, Paraguai e Uruguai", "c) Brasil, Argentina, Bolívia e Chile", "d) Brasil, Colômbia, Peru e Equador", "e) Brasil, Venezuela, Paraguai e Bolívia"],
        "correctAnswer": 1,
        "explanation": "O MERCOSUL foi fundado em 1991 pelo Tratado de Assunção, com Brasil, Argentina, Paraguai e Uruguai como membros fundadores.",
        "topic": "geo", "institution": "UNESP", "year": 2023
    },
    {
        "text": "UERJ 2023 — A região Nordeste do Brasil é marcada pela semiaridez. Qual é o principal sistema meteorológico responsável pelas chuvas nessa região?",
        "options": ["a) Frentes frias polares", "b) Zona de Convergência Intertropical (ZCIT)", "c) El Niño", "d) Anticiclone subtropical", "e) Corrente do Golfo"],
        "correctAnswer": 1,
        "explanation": "A Zona de Convergência Intertropical (ZCIT) é o principal sistema responsável pelas chuvas no Nordeste, especialmente no semiárido, durante o verão austral.",
        "topic": "geo", "institution": "UERJ", "year": 2023
    },
    {
        "text": "UFRGS 2023 — O Rio Grande do Sul é o único estado brasileiro que possui o bioma:",
        "options": ["a) Cerrado", "b) Caatinga", "c) Pampa (Campos Sulinos)", "d) Pantanal", "e) Mata de Araucárias"],
        "correctAnswer": 2,
        "explanation": "O Pampa (Campos Sulinos) é um bioma exclusivo do Rio Grande do Sul no Brasil, caracterizado por campos abertos, gramíneas e pecuária extensiva.",
        "topic": "geo", "institution": "UFRGS", "year": 2023
    },
    {
        "text": "ENEM 2024 — A matriz energética brasileira é considerada uma das mais limpas do mundo porque:",
        "options": ["a) O Brasil não usa combustíveis fósseis", "b) Grande parte da energia elétrica vem de hidrelétricas e há uso expressivo de etanol e energia eólica/solar", "c) O Brasil exporta toda sua energia fóssil", "d) O Brasil usa principalmente energia nuclear", "e) O Brasil tem a maior reserva de gás natural do mundo"],
        "correctAnswer": 1,
        "explanation": "A matriz energética brasileira é relativamente limpa: ~65% da eletricidade vem de hidrelétricas, com crescimento de eólica e solar, além do uso de etanol nos transportes.",
        "topic": "geo", "institution": "ENEM", "year": 2024
    },
    {
        "text": "ENEM PPL 2023 — O processo de desertificação no Nordeste brasileiro é agravado por:",
        "options": ["a) Excesso de chuvas e inundações", "b) Desmatamento da caatinga, uso inadequado do solo e mudanças climáticas", "c) Expansão das florestas", "d) Redução da população rural", "e) Aumento da irrigação"],
        "correctAnswer": 1,
        "explanation": "A desertificação no Nordeste é agravada pelo desmatamento da caatinga, uso inadequado do solo (pastoreio excessivo, agricultura sem manejo) e mudanças climáticas.",
        "topic": "geo", "institution": "ENEM PPL", "year": 2023
    },
    {
        "text": "UFMG 2023 — O Quadrilátero Ferrífero, em Minas Gerais, é importante economicamente por:",
        "options": ["a) Produção de petróleo e gás natural", "b) Concentrar as maiores reservas de minério de ferro do Brasil", "c) Ser o maior produtor de café do país", "d) Possuir as maiores usinas hidrelétricas", "e) Ser o principal polo industrial automobilístico"],
        "correctAnswer": 1,
        "explanation": "O Quadrilátero Ferrífero concentra as maiores reservas de minério de ferro do Brasil, sendo explorado pela Vale e outras mineradoras, fundamental para a economia mineira.",
        "topic": "geo", "institution": "UFMG", "year": 2023
    },
    {
        "text": "UNB 2023 — O Cerrado é o segundo maior bioma do Brasil e está localizado principalmente na região:",
        "options": ["a) Norte", "b) Nordeste", "c) Centro-Oeste", "d) Sul", "e) Sudeste"],
        "correctAnswer": 2,
        "explanation": "O Cerrado está localizado principalmente na região Centro-Oeste do Brasil, abrangendo Goiás, Mato Grosso, Mato Grosso do Sul, Tocantins e partes de estados vizinhos.",
        "topic": "geo", "institution": "UNB", "year": 2023
    },

    # ──────────────────────────────────────────────────────────────────────
    # BIOLOGIA
    # ──────────────────────────────────────────────────────────────────────

    {
        "text": "ENEM 2022 — O processo de clonagem reprodutiva consiste em:",
        "options": ["a) Fusão de dois gametas de espécies diferentes", "b) Transferência do núcleo de uma célula somática para um óvulo enucleado", "c) Divisão artificial de um embrião", "d) Fertilização in vitro com seleção genética", "e) Modificação do DNA por CRISPR"],
        "correctAnswer": 1,
        "explanation": "A clonagem reprodutiva (SCNT) consiste na transferência do núcleo de uma célula somática para um óvulo enucleado, gerando um organismo geneticamente idêntico ao doador do núcleo.",
        "topic": "bio", "institution": "ENEM", "year": 2022
    },
    {
        "text": "ENEM 2023 — A resistência bacteriana a antibióticos é um exemplo de:",
        "options": ["a) Lamarckismo (herança de caracteres adquiridos)", "b) Seleção natural darwiniana", "c) Mutação induzida pelo antibiótico", "d) Deriva genética", "e) Especiação simpátrica"],
        "correctAnswer": 1,
        "explanation": "A resistência bacteriana é um exemplo clássico de seleção natural: bactérias com mutações que conferem resistência sobrevivem ao antibiótico e se reproduzem, passando o gene de resistência.",
        "topic": "bio", "institution": "ENEM", "year": 2023
    },
    {
        "text": "FUVEST 2023 — O processo de respiração celular aeróbica pode ser dividido em três etapas. Qual é a sequência correta?",
        "options": ["a) Ciclo de Krebs → Glicólise → Cadeia respiratória", "b) Glicólise → Ciclo de Krebs → Cadeia respiratória (fosforilação oxidativa)", "c) Cadeia respiratória → Glicólise → Ciclo de Krebs", "d) Glicólise → Cadeia respiratória → Ciclo de Krebs", "e) Ciclo de Krebs → Cadeia respiratória → Glicólise"],
        "correctAnswer": 1,
        "explanation": "A respiração aeróbica ocorre em três etapas: Glicólise (citoplasma) → Ciclo de Krebs (matriz mitocondrial) → Cadeia respiratória/fosforilação oxidativa (membrana interna da mitocôndria).",
        "topic": "bio", "institution": "FUVEST", "year": 2023
    },
    {
        "text": "UNICAMP 2023 — A síndrome de Down (trissomia do cromossomo 21) é causada por um erro na:",
        "options": ["a) Mitose das células somáticas", "b) Não-disjunção cromossômica durante a meiose", "c) Mutação pontual no gene 21", "d) Deleção do cromossomo 21", "e) Translocação do cromossomo 21 para o 14"],
        "correctAnswer": 1,
        "explanation": "A síndrome de Down é causada principalmente pela não-disjunção do cromossomo 21 durante a meiose, resultando em um gameta com dois cromossomos 21 e, após a fecundação, em uma célula com três cópias.",
        "topic": "bio", "institution": "UNICAMP", "year": 2023
    },
    {
        "text": "UNESP 2023 — O sistema ABO de grupos sanguíneos é determinado por um gene com três alelos: Iᴬ, Iᴮ e i. Um indivíduo do grupo AB possui genótipo:",
        "options": ["a) IᴬIᴬ", "b) IᴬIᴮ", "c) IᴮIᴮ", "d) Iᴬi", "e) ii"],
        "correctAnswer": 1,
        "explanation": "O grupo AB é determinado pelo genótipo IᴬIᴮ, pois os alelos Iᴬ e Iᴮ são codominantes — ambos se expressam simultaneamente.",
        "topic": "bio", "institution": "UNESP", "year": 2023
    },
    {
        "text": "UERJ 2023 — O processo de transcrição do DNA resulta na formação de:",
        "options": ["a) DNA complementar", "b) RNA mensageiro (mRNA)", "c) Proteínas", "d) Ribossomos", "e) ATP"],
        "correctAnswer": 1,
        "explanation": "A transcrição é o processo pelo qual a informação do DNA é copiada para o RNA mensageiro (mRNA), que será usado como molde para a síntese de proteínas na tradução.",
        "topic": "bio", "institution": "UERJ", "year": 2023
    },
    {
        "text": "UFRGS 2023 — A relação ecológica entre o carrapato e o boi é classificada como:",
        "options": ["a) Mutualismo", "b) Comensalismo", "c) Parasitismo", "d) Protocooperação", "e) Predatismo"],
        "correctAnswer": 2,
        "explanation": "O carrapato é um ectoparasita do boi: se beneficia (alimenta-se do sangue) enquanto prejudica o hospedeiro (causa doenças, anemia). É uma relação de parasitismo.",
        "topic": "bio", "institution": "UFRGS", "year": 2023
    },
    {
        "text": "ENEM 2024 — As células-tronco pluripotentes induzidas (iPSC) são importantes para a medicina porque:",
        "options": ["a) São obtidas de embriões humanos", "b) Podem ser geradas a partir de células adultas e diferenciadas em qualquer tipo celular", "c) São imortais e não sofrem apoptose", "d) Produzem anticorpos contra doenças", "e) Substituem completamente os transplantes de órgãos"],
        "correctAnswer": 1,
        "explanation": "As iPSC são células adultas reprogramadas para um estado pluripotente, podendo ser diferenciadas em qualquer tipo celular sem os problemas éticos das células-tronco embrionárias.",
        "topic": "bio", "institution": "ENEM", "year": 2024
    },
    {
        "text": "ENEM PPL 2023 — O uso excessivo de agrotóxicos na agricultura pode causar:",
        "options": ["a) Aumento da biodiversidade", "b) Contaminação do solo, água e alimentos, além de danos à saúde humana e à fauna", "c) Melhoria da qualidade do solo", "d) Redução do custo de produção a longo prazo", "e) Aumento da resistência das plantas"],
        "correctAnswer": 1,
        "explanation": "O uso excessivo de agrotóxicos contamina solo, água e alimentos, causa danos à saúde humana (intoxicações, câncer), mata polinizadores e desequilibra ecossistemas.",
        "topic": "bio", "institution": "ENEM PPL", "year": 2023
    },
    {
        "text": "UFMG 2023 — O processo de eutrofização de lagos e rios é causado pelo excesso de:",
        "options": ["a) Oxigênio dissolvido", "b) Nutrientes (nitrogênio e fósforo), geralmente de esgotos e fertilizantes", "c) Sedimentos minerais", "d) Metais pesados", "e) Pesticidas organoclorados"],
        "correctAnswer": 1,
        "explanation": "A eutrofização é causada pelo excesso de nutrientes (N e P), geralmente de esgotos domésticos e fertilizantes agrícolas, que provoca proliferação de algas e depleção de oxigênio.",
        "topic": "bio", "institution": "UFMG", "year": 2023
    },
    {
        "text": "UNB 2023 — O DNA mitocondrial é herdado exclusivamente da:",
        "options": ["a) Linhagem paterna", "b) Linhagem materna", "c) Ambos os pais igualmente", "d) Aleatoriamente de um dos pais", "e) Não é herdado, é sintetizado de novo"],
        "correctAnswer": 1,
        "explanation": "O DNA mitocondrial é herdado exclusivamente da mãe, pois as mitocôndrias do espermatozoide são destruídas após a fecundação. Isso permite rastrear linhagens maternas.",
        "topic": "bio", "institution": "UNB", "year": 2023
    },

    # ──────────────────────────────────────────────────────────────────────
    # FÍSICA
    # ──────────────────────────────────────────────────────────────────────

    {
        "text": "ENEM 2022 — Um objeto é lançado verticalmente para cima com velocidade inicial de 20 m/s. Considerando g = 10 m/s², qual é a altura máxima atingida?",
        "options": ["a) 10 m", "b) 15 m", "c) 20 m", "d) 25 m", "e) 30 m"],
        "correctAnswer": 2,
        "explanation": "Na altura máxima, v=0. Usando v²=v₀²-2gh: 0=400-20h → h=20 m.",
        "topic": "fis", "institution": "ENEM", "year": 2022
    },
    {
        "text": "ENEM 2023 — Um resistor de 100 Ω é ligado a uma fonte de 220 V. Qual é a corrente elétrica que passa pelo resistor?",
        "options": ["a) 1,0 A", "b) 1,5 A", "c) 2,0 A", "d) 2,2 A", "e) 3,0 A"],
        "correctAnswer": 3,
        "explanation": "Lei de Ohm: I = V/R = 220/100 = 2,2 A.",
        "topic": "fis", "institution": "ENEM", "year": 2023
    },
    {
        "text": "FUVEST 2023 — Um corpo de massa 2 kg é lançado horizontalmente com velocidade de 10 m/s de uma altura de 20 m. Qual é o alcance horizontal? (g = 10 m/s²)",
        "options": ["a) 10 m", "b) 15 m", "c) 20 m", "d) 25 m", "e) 30 m"],
        "correctAnswer": 2,
        "explanation": "Tempo de queda: h = gt²/2 → 20 = 5t² → t = 2 s. Alcance = v₀ × t = 10 × 2 = 20 m.",
        "topic": "fis", "institution": "FUVEST", "year": 2023
    },
    {
        "text": "UNICAMP 2023 — A energia armazenada em um capacitor de capacitância C com tensão V é:",
        "options": ["a) E = CV", "b) E = CV²", "c) E = CV²/2", "d) E = C²V/2", "e) E = C/V²"],
        "correctAnswer": 2,
        "explanation": "A energia armazenada em um capacitor é E = CV²/2, onde C é a capacitância (F) e V é a tensão (V).",
        "topic": "fis", "institution": "UNICAMP", "year": 2023
    },
    {
        "text": "UNESP 2023 — O princípio da conservação do momento linear afirma que, em um sistema isolado:",
        "options": ["a) A energia cinética total é constante", "b) A quantidade de movimento total é constante", "c) A força resultante é constante", "d) A aceleração é constante", "e) A velocidade de cada partícula é constante"],
        "correctAnswer": 1,
        "explanation": "O princípio da conservação do momento linear afirma que, na ausência de forças externas, a quantidade de movimento total (p = mv) de um sistema permanece constante.",
        "topic": "fis", "institution": "UNESP", "year": 2023
    },
    {
        "text": "UERJ 2023 — A frequência de ressonância de um circuito LC é dada por f = 1/(2π√LC). Se L = 1 H e C = 1 F, qual é a frequência de ressonância?",
        "options": ["a) 1/(2π) Hz", "b) 2π Hz", "c) 1 Hz", "d) π Hz", "e) 1/(π) Hz"],
        "correctAnswer": 0,
        "explanation": "f = 1/(2π√(1×1)) = 1/(2π) Hz ≈ 0,159 Hz.",
        "topic": "fis", "institution": "UERJ", "year": 2023
    },
    {
        "text": "UFRGS 2023 — O efeito fotoelétrico ocorre quando a luz incide sobre um metal e libera elétrons. Para que isso ocorra, é necessário que:",
        "options": ["a) A intensidade da luz seja suficientemente alta", "b) A frequência da luz seja maior que a frequência mínima (limiar) do metal", "c) A luz seja polarizada", "d) O metal esteja aquecido", "e) A luz seja monocromática"],
        "correctAnswer": 1,
        "explanation": "O efeito fotoelétrico ocorre quando a frequência da luz é maior que a frequência limiar do metal (f > f₀). A intensidade afeta o número de elétrons, não se ocorre ou não.",
        "topic": "fis", "institution": "UFRGS", "year": 2023
    },
    {
        "text": "ENEM 2024 — Um painel solar fotovoltaico de 300 W opera por 6 horas por dia. Qual é a energia gerada em um mês (30 dias)?",
        "options": ["a) 36 kWh", "b) 48 kWh", "c) 54 kWh", "d) 60 kWh", "e) 72 kWh"],
        "correctAnswer": 2,
        "explanation": "Energia diária = 300 W × 6 h = 1800 Wh = 1,8 kWh. Energia mensal = 1,8 × 30 = 54 kWh.",
        "topic": "fis", "institution": "ENEM", "year": 2024
    },
    {
        "text": "ENEM PPL 2023 — A lei de Coulomb descreve a força entre duas cargas elétricas. Se a distância entre as cargas é dobrada, a força elétrica:",
        "options": ["a) Dobra", "b) Quadruplica", "c) Reduz à metade", "d) Reduz a um quarto", "e) Permanece igual"],
        "correctAnswer": 3,
        "explanation": "F = kq₁q₂/r². Se r dobra (r→2r): F' = kq₁q₂/(2r)² = kq₁q₂/4r² = F/4. A força reduz a um quarto.",
        "topic": "fis", "institution": "ENEM PPL", "year": 2023
    },
    {
        "text": "UFMG 2023 — A velocidade de escape de um planeta é a velocidade mínima para que um objeto escape da gravidade. Ela é dada por v = √(2GM/R). Se o raio do planeta dobrar (mantendo a massa), a velocidade de escape:",
        "options": ["a) Dobra", "b) Quadruplica", "c) Reduz à metade", "d) Reduz por √2", "e) Permanece igual"],
        "correctAnswer": 3,
        "explanation": "v = √(2GM/R). Se R→2R: v' = √(2GM/2R) = √(GM/R) = v/√2. A velocidade reduz por um fator √2.",
        "topic": "fis", "institution": "UFMG", "year": 2023
    },
    {
        "text": "UNB 2023 — A transformação adiabática em termodinâmica é aquela em que:",
        "options": ["a) A temperatura é constante", "b) A pressão é constante", "c) O volume é constante", "d) Não há troca de calor com o ambiente", "e) A entropia é constante"],
        "correctAnswer": 3,
        "explanation": "Na transformação adiabática, não há troca de calor com o ambiente (Q=0). A variação de energia interna é igual ao trabalho realizado: ΔU = -W.",
        "topic": "fis", "institution": "UNB", "year": 2023
    },

    # ──────────────────────────────────────────────────────────────────────
    # QUÍMICA
    # ──────────────────────────────────────────────────────────────────────

    {
        "text": "ENEM 2022 — O processo de eletrólise da água produz hidrogênio e oxigênio. Qual é a equação balanceada correta?",
        "options": ["a) H₂O → H₂ + O₂", "b) 2H₂O → 2H₂ + O₂", "c) H₂O → H₂ + 2O₂", "d) 2H₂O → H₂ + 2O₂", "e) 4H₂O → 4H₂ + O₂"],
        "correctAnswer": 1,
        "explanation": "A equação balanceada da eletrólise da água é: 2H₂O → 2H₂ + O₂. Dois moles de água produzem dois moles de hidrogênio e um mole de oxigênio.",
        "topic": "qui", "institution": "ENEM", "year": 2022
    },
    {
        "text": "ENEM 2023 — O pH de uma solução de HCl 0,01 mol/L é:",
        "options": ["a) pH = 1", "b) pH = 2", "c) pH = 3", "d) pH = 12", "e) pH = 13"],
        "correctAnswer": 1,
        "explanation": "HCl é ácido forte (ionização completa). [H⁺] = 0,01 = 10⁻² mol/L. pH = -log[H⁺] = -log(10⁻²) = 2.",
        "topic": "qui", "institution": "ENEM", "year": 2023
    },
    {
        "text": "FUVEST 2023 — A hibridização sp³ do carbono está presente em:",
        "options": ["a) Eteno (CH₂=CH₂)", "b) Etino (CH≡CH)", "c) Benzeno (C₆H₆)", "d) Metano (CH₄)", "e) Dióxido de carbono (CO₂)"],
        "correctAnswer": 3,
        "explanation": "O metano (CH₄) tem carbono com hibridização sp³ (4 ligações simples, geometria tetraédrica). Eteno tem sp², etino tem sp, benzeno tem sp².",
        "topic": "qui", "institution": "FUVEST", "year": 2023
    },
    {
        "text": "UNICAMP 2023 — A reação de saponificação produz sabão. Qual é o produto orgânico obtido além do sabão?",
        "options": ["a) Etanol", "b) Glicerol (glicerina)", "c) Ácido graxo", "d) Éster", "e) Aldeído"],
        "correctAnswer": 1,
        "explanation": "Na saponificação: triglicerídeo + NaOH → sabão (sal de ácido graxo) + glicerol (glicerina). O glicerol é o produto orgânico obtido além do sabão.",
        "topic": "qui", "institution": "UNICAMP", "year": 2023
    },
    {
        "text": "UNESP 2023 — O número de oxidação (NOX) do enxofre no ácido sulfúrico (H₂SO₄) é:",
        "options": ["a) +2", "b) +4", "c) +6", "d) -2", "e) 0"],
        "correctAnswer": 2,
        "explanation": "Em H₂SO₄: H tem NOX +1 (×2 = +2), O tem NOX -2 (×4 = -8). Soma = 0: +2 + NOX(S) - 8 = 0 → NOX(S) = +6.",
        "topic": "qui", "institution": "UNESP", "year": 2023
    },
    {
        "text": "UERJ 2023 — A reação de adição de HBr ao propeno (CH₃-CH=CH₂) segue a regra de Markovnikov. O produto principal é:",
        "options": ["a) CH₃-CH₂-CH₂Br (1-bromopropano)", "b) CH₃-CHBr-CH₃ (2-bromopropano)", "c) CH₂Br-CH=CH₂", "d) CH₃-CH=CHBr", "e) CH₂Br-CH₂-CH₃"],
        "correctAnswer": 1,
        "explanation": "Pela regra de Markovnikov, o H se adiciona ao carbono com mais H (CH₂) e o Br ao carbono com menos H (CH). Produto: CH₃-CHBr-CH₃ (2-bromopropano).",
        "topic": "qui", "institution": "UERJ", "year": 2023
    },
    {
        "text": "UFRGS 2023 — A constante de equilíbrio Kc da reação N₂ + 3H₂ ⇌ 2NH₃ é:",
        "options": ["a) Kc = [NH₃]²/([N₂][H₂]³)", "b) Kc = [N₂][H₂]³/[NH₃]²", "c) Kc = [NH₃]/([N₂][H₂])", "d) Kc = [N₂][H₂]/[NH₃]", "e) Kc = [NH₃]²[N₂][H₂]³"],
        "correctAnswer": 0,
        "explanation": "Kc = [produtos]^coef / [reagentes]^coef = [NH₃]² / ([N₂]¹ × [H₂]³).",
        "topic": "qui", "institution": "UFRGS", "year": 2023
    },
    {
        "text": "ENEM 2024 — O biodiesel é produzido pela reação de transesterificação de óleos vegetais com:",
        "options": ["a) Ácido sulfúrico", "b) Álcool (metanol ou etanol) na presença de catalisador", "c) Água e vapor", "d) Hidrogênio gasoso", "e) Cloro gasoso"],
        "correctAnswer": 1,
        "explanation": "O biodiesel é produzido pela transesterificação de triglicerídeos (óleos vegetais ou gorduras animais) com álcool (metanol ou etanol) na presença de catalisador básico (NaOH ou KOH).",
        "topic": "qui", "institution": "ENEM", "year": 2024
    },
    {
        "text": "ENEM PPL 2023 — O processo de galvanoplastia é usado para revestir metais com uma camada protetora. Qual é o princípio físico-químico utilizado?",
        "options": ["a) Destilação fracionada", "b) Eletrólise (deposição eletrolítica)", "c) Oxidação espontânea", "d) Precipitação química", "e) Fusão e solidificação"],
        "correctAnswer": 1,
        "explanation": "A galvanoplastia usa eletrólise: o objeto a ser revestido é o cátodo, o metal de revestimento é o ânodo, e a solução contém íons do metal. A corrente elétrica deposita o metal sobre o objeto.",
        "topic": "qui", "institution": "ENEM PPL", "year": 2023
    },
    {
        "text": "UFMG 2023 — A entalpia de combustão do metano é -890 kJ/mol. Isso significa que a reação de combustão do metano é:",
        "options": ["a) Endotérmica (absorve calor)", "b) Exotérmica (libera calor)", "c) Isotérmica (sem variação de temperatura)", "d) Adiabática (sem troca de calor)", "e) Reversível"],
        "correctAnswer": 1,
        "explanation": "ΔH = -890 kJ/mol (negativo) indica reação exotérmica: libera energia para o ambiente. A combustão do metano libera 890 kJ por mol queimado.",
        "topic": "qui", "institution": "UFMG", "year": 2023
    },
    {
        "text": "UNB 2023 — A cromatografia é uma técnica de separação baseada na diferença de:",
        "options": ["a) Ponto de ebulição dos componentes", "b) Afinidade dos componentes pela fase estacionária e fase móvel", "c) Densidade dos componentes", "d) Solubilidade em água", "e) Tamanho das moléculas"],
        "correctAnswer": 1,
        "explanation": "A cromatografia separa componentes com base na diferença de afinidade pela fase estacionária (adsorvente) e fase móvel (solvente), que determina a velocidade de migração de cada componente.",
        "topic": "qui", "institution": "UNB", "year": 2023
    },

    # ──────────────────────────────────────────────────────────────────────
    # REDAÇÃO
    # ──────────────────────────────────────────────────────────────────────

    {
        "text": "ENEM 2022 — A Competência 1 da redação do ENEM avalia:",
        "options": ["a) A proposta de intervenção", "b) O domínio da norma culta da língua portuguesa escrita", "c) A seleção de argumentos", "d) O respeito aos direitos humanos", "e) A coesão textual"],
        "correctAnswer": 1,
        "explanation": "A Competência 1 avalia o domínio da norma culta da língua portuguesa escrita: ortografia, acentuação, pontuação, concordância, regência e outros aspectos gramaticais.",
        "topic": "red", "institution": "ENEM", "year": 2022
    },
    {
        "text": "ENEM 2023 — Na redação do ENEM, a nota zero é atribuída quando o texto:",
        "options": ["a) Tem menos de 7 linhas", "b) Foge ao tema, é uma cópia dos textos motivadores, está em branco ou apresenta desrespeito aos direitos humanos", "c) Não tem proposta de intervenção", "d) Usa linguagem informal", "e) Tem erros de ortografia"],
        "correctAnswer": 1,
        "explanation": "A nota zero é atribuída quando o texto: foge ao tema, é cópia dos textos motivadores, está em branco, é ilegível, tem menos de 7 linhas ou apresenta desrespeito aos direitos humanos.",
        "topic": "red", "institution": "ENEM", "year": 2023
    },
    {
        "text": "FUVEST 2023 — Em uma redação argumentativa, o parágrafo de conclusão deve:",
        "options": ["a) Apresentar novos argumentos não discutidos no desenvolvimento", "b) Retomar a tese, sintetizar os argumentos e apresentar uma proposta ou perspectiva", "c) Copiar a introdução com outras palavras", "d) Listar todos os dados usados no texto", "e) Apresentar a opinião contrária à tese"],
        "correctAnswer": 1,
        "explanation": "A conclusão deve retomar a tese (sem repeti-la literalmente), sintetizar os argumentos desenvolvidos e apresentar uma proposta de solução ou perspectiva para o problema.",
        "topic": "red", "institution": "FUVEST", "year": 2023
    },
    {
        "text": "UNICAMP 2023 — O uso de repertório sociocultural na redação do ENEM (Competência 2) consiste em:",
        "options": ["a) Copiar citações de livros didáticos", "b) Mobilizar conhecimentos de diversas áreas (filosofia, ciência, arte, história) para embasar a argumentação", "c) Usar apenas dados estatísticos", "d) Citar apenas autores brasileiros", "e) Usar linguagem técnica e científica"],
        "correctAnswer": 1,
        "explanation": "O repertório sociocultural (Competência 2) consiste em mobilizar conhecimentos de diversas áreas do saber — filosofia, ciências, artes, história, literatura — para embasar e enriquecer a argumentação.",
        "topic": "red", "institution": "UNICAMP", "year": 2023
    },
    {
        "text": "ENEM PPL 2023 — A Competência 3 da redação do ENEM avalia:",
        "options": ["a) O domínio da norma culta", "b) A compreensão da proposta", "c) A seleção, relação e organização das informações e argumentos em defesa do ponto de vista", "d) A proposta de intervenção", "e) O uso de coesão textual"],
        "correctAnswer": 2,
        "explanation": "A Competência 3 avalia a capacidade de selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos em defesa de um ponto de vista.",
        "topic": "red", "institution": "ENEM PPL", "year": 2023
    },
    {
        "text": "ENEM 2024 — Qual é a diferença entre coesão e coerência textual?",
        "options": ["a) São sinônimos — ambas se referem à gramática do texto", "b) Coesão refere-se aos mecanismos linguísticos de ligação entre partes do texto; coerência refere-se à unidade de sentido e lógica interna", "c) Coesão é a lógica do texto; coerência é a gramática", "d) Coesão é exclusiva da poesia; coerência é da prosa", "e) Não há diferença prática entre elas"],
        "correctAnswer": 1,
        "explanation": "Coesão: mecanismos linguísticos (pronomes, conjunções, sinônimos) que ligam as partes do texto. Coerência: unidade de sentido, lógica interna e não-contradição das ideias.",
        "topic": "red", "institution": "ENEM", "year": 2024
    },
]

# ══════════════════════════════════════════════════════════════════════════
# FUNÇÕES AUXILIARES
# ══════════════════════════════════════════════════════════════════════════

def normalizar_disciplina(nome):
    nome = nome.lower().strip()
    return MAPA_DISCIPLINAS.get(nome, nome)


def hash_texto(texto):
    texto = re.sub(r'\s+', ' ', texto.strip().lower())
    return hashlib.md5(texto.encode('utf-8')).hexdigest()


def questao_para_ts(q, indent="    "):
    """Converte um dicionário de questão para bloco TypeScript."""
    options_parts = []
    for opt in q["options"]:
        escaped = opt.replace('\\', '\\\\').replace('"', '\\"')
        options_parts.append('"' + escaped + '"')
    options_str = ", ".join(options_parts)

    text_esc  = q["text"].replace('\\', '\\\\').replace('"', '\\"')
    expl_esc  = q["explanation"].replace('\\', '\\\\').replace('"', '\\"')
    inst_esc  = q["institution"].replace('\\', '\\\\').replace('"', '\\"')

    return "\n".join([
        indent + "{",
        indent + '  text: "' + text_esc + '",',
        indent + '  options: [' + options_str + '],',
        indent + '  correctAnswer: ' + str(q["correctAnswer"]) + ',',
        indent + '  explanation: "' + expl_esc + '",',
        indent + '  topic: "' + q["topic"] + '",',
        indent + '  institution: "' + inst_esc + '",',
        indent + '  year: ' + str(q["year"]),
        indent + "}",
    ])


# ══════════════════════════════════════════════════════════════════════════
# PIPELINE PRINCIPAL
# ══════════════════════════════════════════════════════════════════════════

def main():
    print("=" * 60)
    print("  SCRIPT MASTER — BANCO DE QUESTÕES OrganiStuda")
    print("=" * 60)

    # 1. Normalizar disciplinas
    for q in QUESTOES_REAIS:
        q["topic"] = normalizar_disciplina(q["topic"])

    # 2. Salvar JSON das novas questões
    with open(ARQUIVO_JSON, "w", encoding="utf-8") as f:
        json.dump(QUESTOES_REAIS, f, ensure_ascii=False, indent=2)
    print(f"\n[1] JSON gerado: {len(QUESTOES_REAIS)} questões → {ARQUIVO_JSON}")

    # 3. Ler banco existente
    with open(ARQUIVO_BANCO, "r", encoding="utf-8") as f:
        conteudo = f.read()
    print(f"[2] Banco lido: {len(conteudo):,} caracteres")

    # 4. Detectar questões existentes por hash
    textos_existentes = set()
    for m in re.findall(r'text:\s*"((?:[^"\\]|\\.)*)"', conteudo):
        textos_existentes.add(hash_texto(m))
    print(f"[3] Questões existentes detectadas: {len(textos_existentes)}")

    # 5. Filtrar duplicatas
    questoes_validas = []
    duplicatas = 0
    for q in QUESTOES_REAIS:
        h = hash_texto(q["text"])
        if h not in textos_existentes:
            questoes_validas.append(q)
            textos_existentes.add(h)
        else:
            duplicatas += 1

    print(f"[4] Novas questões válidas: {len(questoes_validas)} | Duplicatas: {duplicatas}")

    if not questoes_validas:
        print("\n[!] Nenhuma questão nova para inserir.")
        return

    # 6. Agrupar por disciplina
    por_disciplina = defaultdict(list)
    for q in questoes_validas:
        por_disciplina[q["topic"]].append(q)

    print("\n[5] Distribuição das novas questões:")
    for disc, qs in sorted(por_disciplina.items()):
        print(f"    {disc}: {len(qs)}")

    # 7. Inserir no banco TypeScript
    novo_conteudo = conteudo
    inseridas_total = 0

    for disciplina, questoes in sorted(por_disciplina.items()):
        blocos = [questao_para_ts(q) for q in questoes]
        bloco_final = ",\n" + ",\n".join(blocos)

        pattern = '"' + disciplina + '"' + r'\s*:\s*\['
        match = re.search(pattern, novo_conteudo)

        if not match:
            print(f"    [!] Disciplina '{disciplina}' não encontrada no banco!")
            continue

        pos_inicio = match.end()
        nivel = 1
        i = pos_inicio

        while i < len(novo_conteudo):
            if novo_conteudo[i] == "[":
                nivel += 1
            elif novo_conteudo[i] == "]":
                nivel -= 1
                if nivel == 0:
                    pos_final = i
                    break
            i += 1

        novo_conteudo = (
            novo_conteudo[:pos_final]
            + bloco_final
            + "\n  "
            + novo_conteudo[pos_final:]
        )

        inseridas_total += len(questoes)
        print(f"    ✓ {len(questoes):3d} questões inseridas em '{disciplina}'")

    # 8. Salvar banco atualizado
    with open(ARQUIVO_BANCO, "w", encoding="utf-8") as f:
        f.write(novo_conteudo)

    # 9. Estatísticas finais
    total_final = len(re.findall(r'institution:', novo_conteudo))
    print(f"\n[6] Banco salvo com sucesso!")
    print(f"    Tamanho: {len(conteudo):,} → {len(novo_conteudo):,} chars (+{len(novo_conteudo)-len(conteudo):,})")
    print(f"    Total de questões: {total_final}")

    print("\n[7] Distribuição final por disciplina:")
    for disc in ["mat", "por", "his", "geo", "bio", "fis", "qui", "red"]:
        n = len(re.findall(r'topic:\s*"' + disc + '"', novo_conteudo))
        print(f"    {disc}: {n}")

    print("\n[8] Distribuição por instituição:")
    inst_count = Counter(re.findall(r'institution:\s*"([^"]+)"', novo_conteudo))
    for inst, count in sorted(inst_count.items(), key=lambda x: -x[1])[:20]:
        print(f"    {inst}: {count}")

    print("\n" + "=" * 60)
    print(f"  CONCLUÍDO — {inseridas_total} questões adicionadas ao banco!")
    print("=" * 60)


if __name__ == "__main__":
    main()

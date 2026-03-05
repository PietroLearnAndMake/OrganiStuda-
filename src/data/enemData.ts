import { Subject } from '../types';

export const ENEM_DATA: Subject[] = [
  {
    id: 'mat',
    name: 'Matemática',
    icon: 'Calculator',
    color: 'bg-blue-500',
    topics: [
      { 
        id: 'mat-1', 
        title: 'Conjuntos Numéricos e Operações Básicas', 
        completed: false,
        questions: [
          {
            text: "Um estudante comprou um notebook por R$ 3.000,00. Ele pagou 20% de entrada e o restante em 10 parcelas iguais sem juros. Qual o valor de cada parcela?",
            options: ["R$ 240,00", "R$ 300,00", "R$ 600,00", "R$ 2.400,00", "R$ 2.700,00"],
            correctAnswer: 0,
            explanation: "20% de R$ 3.000,00 é R$ 600,00. O saldo devedor é R$ 3.000,00 - R$ 600,00 = R$ 2.400,00. Dividindo por 10 parcelas, temos R$ 240,00 por parcela."
          },
          {
            text: "(G1 - cp2 2019) Renato resolveu mudar o plano mensal de sua operadora de celular. No novo plano, ele paga R$ 40,00 fixos e R$ 0,75 por minuto excedente a 150 minutos. Em setembro, ele usou 185 minutos. Se tivesse contratado uma taxa única de R$ 15,00 para ligações ilimitadas, quanto teria economizado?",
            options: ["R$ 11,25", "R$ 26,25", "R$ 51,25", "R$ 66,25"],
            correctAnswer: 0,
            explanation: "Renato usou 185 minutos (35 excedentes). Custo extra = 35 * 0,75 = R$ 26,25. Com a taxa de R$ 15,00, a economia seria 26,25 - 15,00 = R$ 11,25."
          },
          {
            text: "(G1 - cmrj 2018) Um aluno juntou 72 moedas. 1/8 são de R$ 1,00; 1/6 são de R$ 0,50; 1/4 são de R$ 0,25; e as restantes são de R$ 0,10. Qual o valor total em reais?",
            options: ["R$ 19,50", "R$ 22,80", "R$ 23,50", "R$ 23,80", "R$ 31,50"],
            correctAnswer: 1,
            explanation: "R$ 1,00: 9 moedas (R$ 9,00). R$ 0,50: 12 moedas (R$ 6,00). R$ 0,25: 18 moedas (R$ 4,50). R$ 0,10: 33 moedas (R$ 3,30). Total = 9 + 6 + 4,5 + 3,3 = R$ 22,80."
          }
        ]
      },
      { 
        id: 'mat-2', 
        title: 'Razão, Proporção e Escalas', 
        completed: false,
        questions: [
          {
            text: "Em um mapa de escala 1:500.000, a distância entre duas cidades é de 10 cm. Qual a distância real entre elas em quilômetros?",
            options: ["5 km", "50 km", "500 km", "5.000 km", "50.000 km"],
            correctAnswer: 1,
            explanation: "1 cm no mapa representa 500.000 cm reais. 10 cm representam 5.000.000 cm. Convertendo para km: 5.000.000 cm = 50.000 m = 50 km."
          },
          {
            text: "(G1 - ifba 2018) Para guardar CDs em sacolas de 60 unidades, são necessárias 15 sacolas. Se os CDs forem guardados em sacolas com 75 unidades, quantas sacolas serão necessárias?",
            options: ["11", "13", "12", "14", "10"],
            correctAnswer: 2,
            explanation: "Total de CDs = 60 * 15 = 900. Número de sacolas = 900 / 75 = 12."
          },
          {
            text: "(Enem PPL 2016) Um estado priorizará investimentos na cidade com a maior razão entre habitantes e médicos. M: 136.000 hab / 340 méd; X: 418.000 / 2.650; Y: 210.000 / 930; Z: 530.000 / 1.983; W: 108.000 / 300. Qual cidade será contemplada?",
            options: ["M", "X", "Y", "Z", "W"],
            correctAnswer: 0,
            explanation: "Razões: M = 400; X ≈ 157; Y ≈ 225; Z ≈ 267; W = 360. A maior razão é a da cidade M."
          }
        ]
      },
      { 
        id: 'mat-3', 
        title: 'Regra de Três Simples e Composta', 
        completed: false,
        questions: [
          {
            text: "(G1 - ifba 2017) Um documentário é composto por 60 curtas de 8 minutos cada. Se os curtas tivessem 3 minutos cada, quantos seriam necessários para a mesma duração total?",
            options: ["23", "60", "90", "160", "260"],
            correctAnswer: 3,
            explanation: "Duração total = 60 * 8 = 480 min. Número de curtas = 480 / 3 = 160."
          },
          {
            text: "Se 5 operários levam 10 dias para completar uma obra, quantos dias 10 operários levariam para a mesma obra?",
            options: ["5 dias", "10 dias", "20 dias", "2,5 dias"],
            correctAnswer: 0,
            explanation: "Inversamente proporcional: 5 * 10 = 10 * x => 50 = 10x => x = 5 dias."
          }
        ]
      },
      { 
        id: 'mat-4', 
        title: 'Porcentagem e Juros Simples/Compostos', 
        completed: false,
        questions: [
          {
            text: "(Enem PPL 2016) Um supermercado vende sabonetes em pacotes: I (3 un por R$ 2,10), II (4 un por R$ 2,60), III (5 un por R$ 3,00), IV (6 un por R$ 3,90), V (12 un por R$ 9,60). Qual oferece o menor preço por unidade?",
            options: ["I", "II", "III", "IV", "V"],
            correctAnswer: 2,
            explanation: "Preços unitários: I = 0,70; II = 0,65; III = 0,60; IV = 0,65; V = 0,80. O pacote III é o mais barato."
          },
          {
            text: "Um capital de R$ 1.000,00 é aplicado a juros simples de 2% ao mês. Qual o montante após 5 meses?",
            options: ["R$ 1.100,00", "R$ 1.010,00", "R$ 1.200,00", "R$ 1.050,00"],
            correctAnswer: 0,
            explanation: "J = C * i * t = 1000 * 0,02 * 5 = 100. M = C + J = 1000 + 100 = 1100."
          }
        ]
      },
      { 
        id: 'mat-5', 
        title: 'Equações e Inequações de 1º Grau', 
        completed: false,
        questions: [
          {
            text: "(G1 - ifal 2017) Determine o valor da expressão numérica: (3³ + 5²) ÷ 2².",
            options: ["13", "14", "15", "16", "17"],
            correctAnswer: 0,
            explanation: "(27 + 25) ÷ 4 = 52 ÷ 4 = 13."
          },
          {
            text: "(G1 - ifsul 2016) A idade da filha de uma professora é o resultado do produto entre os dois menores números primos somado a 10. Qual a idade da filha?",
            options: ["12", "16", "24", "26"],
            correctAnswer: 1,
            explanation: "Os dois menores números primos são 2 e 3. O produto é 2 * 3 = 6. Somando 10, temos 6 + 10 = 16."
          },
          {
            text: "Resolva a equação: 3(x - 2) + 5 = 2x + 7.",
            options: ["x = 4", "x = 6", "x = 8", "x = 10"],
            correctAnswer: 2,
            explanation: "3x - 6 + 5 = 2x + 7 => 3x - 1 = 2x + 7 => x = 8."
          },
          {
            text: "Qual a solução da inequação 2x - 4 > 6?",
            options: ["x > 1", "x > 2", "x > 5", "x > 10"],
            correctAnswer: 2,
            explanation: "2x > 6 + 4 => 2x > 10 => x > 5."
          }
        ]
      },
      { 
        id: 'mat-6', 
        title: 'Equações e Inequações de 2º Grau', 
        completed: false,
        questions: [
          {
            text: "(Pucrs 2014) A 20ª Copa do Mundo foi em 2014. O evento ocorre a cada 4 anos. Em que ano será realizada a edição de número 35?",
            options: ["2049", "2055", "2070", "2074", "2078"],
            correctAnswer: 3,
            explanation: "Da 20ª para a 35ª edição são 15 intervalos de 4 anos. 15 * 4 = 60 anos. 2014 + 60 = 2074."
          },
          {
            text: "Quais são as raízes da equação x² - 5x + 6 = 0?",
            options: ["2 e 3", "1 e 6", "-2 e -3", "0 e 5"],
            correctAnswer: 0,
            explanation: "Soma = 5, Produto = 6. Os números são 2 e 3."
          },
          {
            text: "Qual o valor do discriminante (Delta) da equação 2x² - 4x + 2 = 0?",
            options: ["0", "4", "8", "16"],
            correctAnswer: 0,
            explanation: "Delta = b² - 4ac = (-4)² - 4(2)(2) = 16 - 16 = 0."
          },
          {
            text: "Se o discriminante de uma equação do 2º grau é negativo, a equação possui:",
            options: ["Duas raízes reais distintas", "Uma raiz real dupla", "Nenhuma raiz real", "Infinitas raízes reais"],
            correctAnswer: 2,
            explanation: "Quando Delta < 0, a equação não possui raízes no conjunto dos números reais."
          }
        ]
      },
      { 
        id: 'mat-7', 
        title: 'Funções de 1º Grau (Afim)', 
        completed: false,
        questions: [
          {
            text: "(Enem 2016) Uma cisterna de 6.000 litros foi esvaziada em um período de 3h. Na primeira hora, a vazão foi de 1.000 L/h. Nas duas horas seguintes, a vazão foi constante. Qual foi a vazão nas duas últimas horas?",
            options: ["2.500 L/h", "2.000 L/h", "1.500 L/h", "1.000 L/h", "500 L/h"],
            correctAnswer: 0,
            explanation: "Volume total = 6.000 L. Volume após 1h = 6.000 - 1.000 = 5.000 L. Esse volume foi esvaziado em 2h, logo a vazão foi 5.000 / 2 = 2.500 L/h."
          },
          {
            text: "Uma função afim é dada por f(x) = 2x + 5. Qual o valor de f(3)?",
            options: ["8", "11", "13", "15"],
            correctAnswer: 1,
            explanation: "f(3) = 2(3) + 5 = 6 + 5 = 11."
          },
          {
            text: "Qual o coeficiente linear da função f(x) = -3x + 7?",
            options: ["-3", "3", "7", "-7"],
            correctAnswer: 2,
            explanation: "O coeficiente linear é o termo independente, que neste caso é 7."
          },
          {
            text: "A raiz da função f(x) = 4x - 12 é:",
            options: ["2", "3", "4", "12"],
            correctAnswer: 1,
            explanation: "Para encontrar a raiz, fazemos f(x) = 0. 4x - 12 = 0 => 4x = 12 => x = 3."
          }
        ]
      },
      { 
        id: 'mat-8', 
        title: 'Funções de 2º Grau (Quadrática)', 
        completed: false,
        questions: [
          {
            text: "A função f(x) = -x² + 4x representa a trajetória de uma bola. Qual a altura máxima atingida pela bola?",
            options: ["2", "4", "8", "16"],
            correctAnswer: 1,
            explanation: "O x do vértice é -b/(2a) = -4/(-2) = 2. A altura máxima é f(2) = -(2)² + 4(2) = -4 + 8 = 4."
          },
          {
            text: "Em que pontos a função f(x) = x² - 4 corta o eixo x?",
            options: ["(2, 0) e (-2, 0)", "(4, 0) e (-4, 0)", "(0, 4) e (0, -4)", "(0, 2) e (0, -2)"],
            correctAnswer: 0,
            explanation: "x² - 4 = 0 => x² = 4 => x = ±2."
          },
          {
            text: "Qual a concavidade da parábola da função f(x) = 2x² - 3x + 1?",
            options: ["Para cima", "Para baixo", "Para a direita", "Para a esquerda"],
            correctAnswer: 0,
            explanation: "Como o coeficiente 'a' (2) é positivo, a concavidade é voltada para cima."
          },
          {
            text: "Qual o valor mínimo da função f(x) = x² - 6x + 8?",
            options: ["-1", "0", "1", "2"],
            correctAnswer: 0,
            explanation: "x_v = -(-6)/2 = 3. y_v = f(3) = 3² - 6(3) + 8 = 9 - 18 + 8 = -1."
          }
        ]
      },
      { 
        id: 'mat-9', 
        title: 'Função Exponencial e Logaritmos', 
        completed: false,
        questions: [
          {
            text: "Uma população de bactérias dobra a cada hora. Se inicialmente havia 100 bactérias, quantas haverá após 4 horas?",
            options: ["400", "800", "1.600", "3.200"],
            correctAnswer: 2,
            explanation: "A função é P(t) = 100 * 2^t. Para t=4, P(4) = 100 * 2^4 = 100 * 16 = 1.600."
          },
          {
            text: "Qual o valor de log2(16)?",
            options: ["2", "4", "8", "16"],
            correctAnswer: 1,
            explanation: "2^x = 16 => 2^x = 2^4 => x = 4."
          },
          {
            text: "Resolva a equação exponencial: 3^(x+1) = 27.",
            options: ["x = 1", "x = 2", "x = 3", "x = 4"],
            correctAnswer: 1,
            explanation: "3^(x+1) = 3³. Portanto, x + 1 = 3 => x = 2."
          },
          {
            text: "Sabendo que log 2 = 0,30, qual o valor de log 8?",
            options: ["0,60", "0,90", "1,20", "2,40"],
            correctAnswer: 1,
            explanation: "log 8 = log (2³) = 3 * log 2 = 3 * 0,30 = 0,90."
          }
        ]
      },
      { 
        id: 'mat-10', 
        title: 'Progressão Aritmética (PA)', 
        completed: false,
        questions: [
          {
            text: "Em uma PA, o primeiro termo é 5 e a razão é 3. Qual o décimo termo?",
            options: ["30", "32", "35", "38"],
            correctAnswer: 1,
            explanation: "a10 = a1 + (10-1)r = 5 + 9*3 = 5 + 27 = 32."
          },
          {
            text: "Qual a soma dos 10 primeiros termos da PA (2, 4, 6, ...)?",
            options: ["100", "110", "120", "200"],
            correctAnswer: 1,
            explanation: "a1=2, r=2, a10=20. S10 = (2+20)*10/2 = 22*5 = 110."
          },
          {
            text: "Quantos termos tem a PA (4, 7, 10, ..., 34)?",
            options: ["10", "11", "12", "13"],
            correctAnswer: 1,
            explanation: "an = a1 + (n-1)r => 34 = 4 + (n-1)3 => 30 = 3n - 3 => 33 = 3n => n = 11."
          },
          {
            text: "Se o 3º termo de uma PA é 12 e o 5º é 20, qual a razão?",
            options: ["2", "3", "4", "5"],
            correctAnswer: 2,
            explanation: "a5 = a3 + 2r => 20 = 12 + 2r => 8 = 2r => r = 4."
          }
        ]
      },
      { 
        id: 'mat-11', 
        title: 'Progressão Geométrica (PG)', 
        completed: false,
        questions: [
          {
            text: "Em uma PG, o primeiro termo é 2 e a razão é 3. Qual o quarto termo?",
            options: ["18", "54", "162", "486"],
            correctAnswer: 1,
            explanation: "a4 = a1 * q^(4-1) = 2 * 3³ = 2 * 27 = 54."
          },
          {
            text: "Qual a razão da PG (5, 10, 20, ...)?",
            options: ["2", "5", "10", "15"],
            correctAnswer: 0,
            explanation: "q = 10 / 5 = 2."
          }
        ]
      },
      { 
        id: 'mat-12', 
        title: 'Geometria Plana: Áreas e Perímetros', 
        completed: false,
        questions: [
          {
            text: "Qual a área de um triângulo de base 10 cm e altura 8 cm?",
            options: ["18 cm²", "40 cm²", "80 cm²", "160 cm²"],
            correctAnswer: 1,
            explanation: "Área = (base * altura) / 2 = (10 * 8) / 2 = 80 / 2 = 40 cm²."
          },
          {
            text: "Qual o perímetro de um quadrado de área 25 cm²?",
            options: ["10 cm", "20 cm", "25 cm", "50 cm"],
            correctAnswer: 1,
            explanation: "Lado = √25 = 5 cm. Perímetro = 4 * 5 = 20 cm."
          },
          {
            text: "Qual a área de um círculo com raio de 5 cm? (Use π = 3,14)",
            options: ["15,7 cm²", "31,4 cm²", "78,5 cm²", "157 cm²"],
            correctAnswer: 2,
            explanation: "Área = π * r² = 3,14 * 5² = 3,14 * 25 = 78,5 cm²."
          },
          {
            text: "Um retângulo tem perímetro de 30 cm e base de 10 cm. Qual a sua área?",
            options: ["50 cm²", "100 cm²", "150 cm²", "200 cm²"],
            correctAnswer: 0,
            explanation: "Perímetro = 2b + 2h => 30 = 20 + 2h => 10 = 2h => h = 5 cm. Área = b * h = 10 * 5 = 50 cm²."
          }
        ]
      },
      { 
        id: 'mat-13', 
        title: 'Geometria Espacial: Prismas e Cilindros', 
        completed: false,
        questions: [
          {
            text: "Um cilindro tem raio da base 3 cm e altura 10 cm. Qual o seu volume? (Use π = 3)",
            options: ["30 cm³", "90 cm³", "270 cm³", "810 cm³"],
            correctAnswer: 2,
            explanation: "Volume = π * r² * h = 3 * 3² * 10 = 3 * 9 * 10 = 270 cm³."
          },
          {
            text: "Um cubo tem aresta de 2 cm. Qual a sua área total?",
            options: ["8 cm²", "12 cm²", "24 cm²", "48 cm²"],
            correctAnswer: 2,
            explanation: "Área de uma face = 2² = 4. Área total = 6 * 4 = 24 cm²."
          },
          {
            text: "Qual o volume de um paralelepípedo retângulo de dimensões 3 cm, 4 cm e 5 cm?",
            options: ["12 cm³", "20 cm³", "60 cm³", "120 cm³"],
            correctAnswer: 2,
            explanation: "Volume = a * b * c = 3 * 4 * 5 = 60 cm³."
          },
          {
            text: "A área lateral de um cilindro equilátero (altura = diâmetro) de raio 2 cm é: (Use π = 3)",
            options: ["12 cm²", "24 cm²", "48 cm²", "96 cm²"],
            correctAnswer: 2,
            explanation: "h = 2r = 4. Área lateral = 2 * π * r * h = 2 * 3 * 2 * 4 = 48 cm²."
          }
        ]
      },
      { 
        id: 'mat-14', 
        title: 'Geometria Espacial: Pirâmides, Cones e Esferas', 
        completed: false,
        questions: [
          {
            text: "Uma esfera tem raio de 3 cm. Qual o seu volume? (Use π = 3)",
            options: ["36 cm³", "108 cm³", "27 cm³", "81 cm³"],
            correctAnswer: 1,
            explanation: "Volume da esfera = (4/3) * π * r³ = (4/3) * 3 * 3³ = 4 * 27 = 108 cm³."
          },
          {
            text: "Um cone tem raio 3 cm e altura 4 cm. Qual o seu volume? (Use π = 3)",
            options: ["12 cm³", "36 cm³", "48 cm³", "108 cm³"],
            correctAnswer: 1,
            explanation: "Volume = (1/3) * π * r² * h = (1/3) * 3 * 3² * 4 = 9 * 4 = 36 cm³."
          },
          {
            text: "Qual a área da superfície de uma esfera de raio 2 cm? (Use π = 3)",
            options: ["12 cm²", "24 cm²", "36 cm²", "48 cm²"],
            correctAnswer: 3,
            explanation: "Área = 4 * π * r² = 4 * 3 * 2² = 12 * 4 = 48 cm²."
          },
          {
            text: "Uma pirâmide de base quadrada tem aresta da base 4 cm e altura 6 cm. Qual seu volume?",
            options: ["24 cm³", "32 cm³", "48 cm³", "96 cm³"],
            correctAnswer: 1,
            explanation: "Volume = (1/3) * Área da base * altura = (1/3) * (4²) * 6 = (1/3) * 16 * 6 = 32 cm³."
          }
        ]
      },
      { 
        id: 'mat-15', 
        title: 'Geometria Analítica: Ponto e Reta', 
        completed: false,
        questions: [
          {
            text: "Qual a distância entre os pontos A(1, 2) e B(4, 6)?",
            options: ["3", "4", "5", "7"],
            correctAnswer: 2,
            explanation: "d = √((4-1)² + (6-2)²) = √(3² + 4²) = √(9 + 16) = √25 = 5."
          },
          {
            text: "Qual o coeficiente angular da reta que passa pelos pontos (1, 2) e (3, 6)?",
            options: ["1", "2", "3", "4"],
            correctAnswer: 1,
            explanation: "m = (y2 - y1) / (x2 - x1) = (6 - 2) / (3 - 1) = 4 / 2 = 2."
          },
          {
            text: "A equação da reta que passa pelo ponto (0, 2) e tem coeficiente angular 3 é:",
            options: ["y = 3x", "y = 2x + 3", "y = 3x + 2", "y = x + 2"],
            correctAnswer: 2,
            explanation: "y - y0 = m(x - x0) => y - 2 = 3(x - 0) => y = 3x + 2."
          },
          {
            text: "Duas retas são paralelas se, e somente se, seus coeficientes angulares são:",
            options: ["Inversos", "Opostos", "Iguais", "Nulos"],
            correctAnswer: 2,
            explanation: "Retas paralelas têm a mesma inclinação, logo, o mesmo coeficiente angular (m1 = m2)."
          }
        ]
      },
      { 
        id: 'mat-16', 
        title: 'Geometria Analítica: Circunferência', 
        completed: false,
        questions: [
          {
            text: "Qual o centro e o raio da circunferência de equação (x - 2)² + (y + 3)² = 16?",
            options: ["C(2, -3), r=4", "C(-2, 3), r=4", "C(2, -3), r=16", "C(-2, 3), r=16"],
            correctAnswer: 0,
            explanation: "A equação reduzida é (x-a)² + (y-b)² = r². Logo, a=2, b=-3 e r²=16 (r=4)."
          },
          {
            text: "A circunferência x² + y² = 9 tem centro em:",
            options: ["(0, 0)", "(3, 3)", "(9, 9)", "(1, 1)"],
            correctAnswer: 0,
            explanation: "A equação x² + y² = r² representa uma circunferência centrada na origem (0, 0)."
          },
          {
            text: "O ponto P(3, 4) em relação à circunferência x² + y² = 25 é:",
            options: ["Interno", "Externo", "Pertence à circunferência", "O centro"],
            correctAnswer: 2,
            explanation: "Substituindo: 3² + 4² = 9 + 16 = 25. Como a igualdade se verifica, o ponto pertence à circunferência."
          },
          {
            text: "Qual a equação reduzida da circunferência de centro (1, 1) e raio 2?",
            options: ["(x + 1)² + (y + 1)² = 4", "(x - 1)² + (y - 1)² = 2", "(x - 1)² + (y - 1)² = 4", "x² + y² = 4"],
            correctAnswer: 2,
            explanation: "(x - x_c)² + (y - y_c)² = r² => (x - 1)² + (y - 1)² = 2² = 4."
          }
        ]
      },
      { 
        id: 'mat-17', 
        title: 'Trigonometria no Triângulo Retângulo', 
        completed: false,
        questions: [
          {
            text: "Em um triângulo retângulo, a hipotenusa mede 10 cm e um dos ângulos agudos é 30°. Qual a medida do cateto oposto a esse ângulo? (sen 30° = 0,5)",
            options: ["5 cm", "8,6 cm", "10 cm", "20 cm"],
            correctAnswer: 0,
            explanation: "sen 30° = cateto oposto / hipotenusa => 0,5 = x / 10 => x = 5 cm."
          },
          {
            text: "Qual o valor da tangente de 45°?",
            options: ["0", "0,5", "1", "√3"],
            correctAnswer: 2,
            explanation: "tg 45° = sen 45° / cos 45° = (√2/2) / (√2/2) = 1."
          },
          {
            text: "Em um triângulo retângulo isósceles, os ângulos agudos medem:",
            options: ["30°", "45°", "60°", "90°"],
            correctAnswer: 1,
            explanation: "Se é retângulo (90°) e isósceles (dois lados iguais), os ângulos agudos devem ser iguais. (180 - 90)/2 = 45°."
          },
          {
            text: "Sabendo que cos(x) = 0,8 e o triângulo é retângulo, qual o valor de sen(x)?",
            options: ["0,2", "0,4", "0,6", "0,8"],
            correctAnswer: 2,
            explanation: "Pela relação fundamental: sen²x + cos²x = 1 => sen²x + 0,64 = 1 => sen²x = 0,36 => sen(x) = 0,6."
          }
        ]
      },
      { 
        id: 'mat-18', 
        title: 'Ciclo Trigonométrico e Funções', 
        completed: false,
        questions: [
          {
            text: "Qual o valor de sen(90°) + cos(180°)?",
            options: ["0", "1", "2", "-1"],
            correctAnswer: 0,
            explanation: "sen(90°) = 1 e cos(180°) = -1. Logo, 1 + (-1) = 0."
          },
          {
            text: "Em qual quadrante o seno e o cosseno são ambos negativos?",
            options: ["1º", "2º", "3º", "4º"],
            correctAnswer: 2,
            explanation: "No 3º quadrante, x < 0 (cosseno) e y < 0 (seno)."
          },
          {
            text: "Qual o período da função f(x) = sen(x)?",
            options: ["π", "2π", "π/2", "3π"],
            correctAnswer: 1,
            explanation: "A função seno completa um ciclo a cada 2π radianos (360°)."
          },
          {
            text: "O valor máximo da função f(x) = 3 + 2*sen(x) é:",
            options: ["2", "3", "5", "6"],
            correctAnswer: 2,
            explanation: "O valor máximo de sen(x) é 1. Logo, o máximo de f(x) é 3 + 2(1) = 5."
          }
        ]
      },
      { 
        id: 'mat-19', 
        title: 'Análise Combinatória', 
        completed: false,
        questions: [
          {
            text: "De quantas formas podemos organizar 4 livros diferentes em uma prateleira?",
            options: ["4", "12", "24", "48"],
            correctAnswer: 2,
            explanation: "Trata-se de uma permutação simples: P4 = 4! = 4 * 3 * 2 * 1 = 24."
          },
          {
            text: "Quantas duplas diferentes podem ser formadas com 5 pessoas?",
            options: ["5", "10", "20", "25"],
            correctAnswer: 1,
            explanation: "Combinação de 5 tomados 2 a 2: C(5,2) = 5! / (2! * 3!) = (5 * 4) / 2 = 10."
          },
          {
            text: "Quantos anagramas possui a palavra 'ROMA'?",
            options: ["4", "12", "24", "48"],
            correctAnswer: 2,
            explanation: "Permutação de 4 letras distintas: 4! = 24."
          },
          {
            text: "De um grupo de 10 pessoas, quantas comissões de 3 pessoas podem ser formadas?",
            options: ["30", "120", "360", "720"],
            correctAnswer: 1,
            explanation: "Combinação: C(10,3) = 10! / (3! * 7!) = (10*9*8) / 6 = 120."
          }
        ]
      },
      { 
        id: 'mat-20', 
        title: 'Probabilidade', 
        completed: false,
        questions: [
          {
            text: "Ao lançar um dado comum de 6 faces, qual a probabilidade de sair um número par?",
            options: ["1/6", "1/3", "1/2", "2/3"],
            correctAnswer: 2,
            explanation: "Números pares: {2, 4, 6} (3 casos favoráveis). Total de casos: 6. Probabilidade = 3/6 = 1/2."
          },
          {
            text: "Em uma urna com 10 bolas numeradas de 1 a 10, qual a probabilidade de tirar a bola número 7?",
            options: ["1/10", "7/10", "1/7", "1/2"],
            correctAnswer: 0,
            explanation: "Há 1 caso favorável (bola 7) em 10 casos possíveis. Probabilidade = 1/10."
          },
          {
            text: "Qual a probabilidade de tirar uma carta de 'Copas' em um baralho comum de 52 cartas?",
            options: ["1/4", "1/13", "1/52", "1/2"],
            correctAnswer: 0,
            explanation: "Um baralho tem 4 naipes com 13 cartas cada. Probabilidade = 13/52 = 1/4."
          },
          {
            text: "Lançando duas moedas, qual a probabilidade de obter duas 'caras'?",
            options: ["1/2", "1/3", "1/4", "1/8"],
            correctAnswer: 2,
            explanation: "Espaço amostral: {(cara, cara), (cara, coroa), (coroa, cara), (coroa, coroa)}. Casos favoráveis: 1. Probabilidade = 1/4."
          }
        ]
      },
      { 
        id: 'mat-21', 
        title: 'Estatística: Média, Moda e Mediana', 
        completed: false,
        questions: [
          {
            text: "(G1 - ifpe 2018) Wagner tirou 5,4; 6,2; 7,5 e 4,1 nas quatro primeiras atividades. Para ser aprovado com média 6,0 em cinco atividades, qual a nota mínima que ele precisa tirar na quinta atividade?",
            options: ["5,8", "6,8", "6,2", "5,2", "6,0"],
            correctAnswer: 1,
            explanation: "Soma das 4 notas = 23,2. Para média 6,0 em 5 notas, o total deve ser 30,0. Logo, 30,0 - 23,2 = 6,8."
          },
          {
            text: "Qual a moda do conjunto {2, 3, 3, 5, 7, 8, 8, 8, 10}?",
            options: ["3", "5", "8", "10"],
            correctAnswer: 2,
            explanation: "A moda é o valor que mais se repete. O número 8 aparece 3 vezes."
          },
          {
            text: "Qual a mediana do conjunto {2, 5, 8, 10, 12}?",
            options: ["5", "8", "10", "12"],
            correctAnswer: 1,
            explanation: "O conjunto está ordenado e tem 5 elementos. A mediana é o termo central, que é 8."
          },
          {
            text: "Qual a média aritmética dos números 10, 20, 30 e 40?",
            options: ["20", "25", "30", "35"],
            correctAnswer: 1,
            explanation: "Média = (10 + 20 + 30 + 40) / 4 = 100 / 4 = 25."
          }
        ]
      },
      { 
        id: 'mat-22', 
        title: 'Estatística: Variância e Desvio Padrão', 
        completed: false,
        questions: [
          {
            text: "Se todos os valores de um conjunto de dados forem iguais a 10, qual o desvio padrão desse conjunto?",
            options: ["0", "1", "10", "100"],
            correctAnswer: 0,
            explanation: "O desvio padrão mede a dispersão. Se todos os valores são iguais, não há dispersão, logo o desvio padrão é zero."
          },
          {
            text: "O desvio padrão é a raiz quadrada de qual medida estatística?",
            options: ["Média", "Mediana", "Variância", "Moda"],
            correctAnswer: 2,
            explanation: "Por definição, o desvio padrão é a raiz quadrada da variância."
          },
          {
            text: "Se a variância de um conjunto de dados é 16, qual é o seu desvio padrão?",
            options: ["2", "4", "8", "16"],
            correctAnswer: 1,
            explanation: "Desvio padrão = √Variância = √16 = 4."
          },
          {
            text: "Qual das medidas abaixo é mais sensível a valores extremos (outliers)?",
            options: ["Moda", "Mediana", "Média", "Primeiro Quartil"],
            correctAnswer: 2,
            explanation: "A média leva em consideração todos os valores, sendo fortemente afetada por valores muito altos ou muito baixos."
          }
        ]
      },
      { 
        id: 'mat-23', 
        title: 'Matrizes e Determinantes', 
        completed: false,
        questions: [
          {
            text: "Qual o determinante da matriz A = [[2, 3], [1, 4]]?",
            options: ["5", "11", "8", "2"],
            correctAnswer: 0,
            explanation: "det(A) = (2 * 4) - (3 * 1) = 8 - 3 = 5."
          },
          {
            text: "Qual a matriz identidade de ordem 2?",
            options: ["[[1, 0], [0, 1]]", "[[0, 1], [1, 0]]", "[[1, 1], [1, 1]]", "[[0, 0], [0, 0]]"],
            correctAnswer: 0,
            explanation: "A matriz identidade tem 1 na diagonal principal e 0 nos demais elementos."
          },
          {
            text: "Se A é uma matriz 2x3 e B é uma matriz 3x4, a matriz produto C = A*B terá qual dimensão?",
            options: ["2x3", "3x4", "2x4", "3x3"],
            correctAnswer: 2,
            explanation: "O produto de uma matriz m x n por uma n x p resulta em uma matriz m x p. Logo, 2x4."
          },
          {
            text: "O determinante de uma matriz triangular é igual a:",
            options: ["Zero", "Um", "Produto dos elementos da diagonal principal", "Soma dos elementos da diagonal principal"],
            correctAnswer: 2,
            explanation: "Em matrizes triangulares (superiores ou inferiores), o determinante é o produto dos elementos da diagonal principal."
          }
        ]
      },
      { 
        id: 'mat-24', 
        title: 'Sistemas Lineares', 
        completed: false,
        questions: [
          {
            text: "Resolva o sistema: x + y = 10 e x - y = 2. Qual o valor de x?",
            options: ["4", "5", "6", "8"],
            correctAnswer: 2,
            explanation: "Somando as equações: 2x = 12 => x = 6."
          },
          {
            text: "No sistema x + y = 5 e 2x + 2y = 10, o sistema é:",
            options: ["Possível e Determinado", "Possível e Indeterminado", "Impossível", "Inexistente"],
            correctAnswer: 1,
            explanation: "As equações são proporcionais (a segunda é o dobro da primeira), logo há infinitas soluções."
          },
          {
            text: "O sistema x + y = 3 e x + y = 5 é classificado como:",
            options: ["Possível e Determinado", "Possível e Indeterminado", "Impossível", "Homogêneo"],
            correctAnswer: 2,
            explanation: "As retas são paralelas e distintas, não havendo ponto de interseção. Logo, não há solução."
          },
          {
            text: "Um sistema linear homogêneo (termos independentes iguais a zero) é sempre:",
            options: ["Impossível", "Possível", "Indeterminado", "Inconsistente"],
            correctAnswer: 1,
            explanation: "Um sistema homogêneo sempre admite pelo menos a solução trivial (todas as variáveis iguais a zero)."
          }
        ]
      },
      { 
        id: 'mat-25', 
        title: 'Polinômios e Equações Algébricas', 
        completed: false,
        questions: [
          {
            text: "Qual o valor numérico do polinômio P(x) = x² - 5x + 6 para x = 3?",
            options: ["0", "6", "12", "30"],
            correctAnswer: 0,
            explanation: "P(3) = 3² - 5(3) + 6 = 9 - 15 + 6 = 0."
          },
          {
            text: "Qual o grau do polinômio P(x) = 4x³ + 2x² - 5?",
            options: ["1", "2", "3", "4"],
            correctAnswer: 2,
            explanation: "O grau é o maior expoente da variável x, que neste caso é 3."
          },
          {
            text: "Se P(x) = x³ - 2x² + x - 2, qual é o valor de P(2)?",
            options: ["-2", "0", "2", "4"],
            correctAnswer: 1,
            explanation: "P(2) = 2³ - 2(2²) + 2 - 2 = 8 - 8 + 0 = 0."
          },
          {
            text: "O Teorema do Resto afirma que o resto da divisão de P(x) por (x - a) é igual a:",
            options: ["P(a)", "P(-a)", "0", "1"],
            correctAnswer: 0,
            explanation: "Pelo Teorema do Resto, R = P(a)."
          }
        ]
      },
      { 
        id: 'mat-26', 
        title: 'Matemática Financeira e Porcentagem', 
        completed: false,
        questions: [
          {
            text: "Um produto custava R$ 200,00 e sofreu um aumento de 15%. Qual o novo valor do produto?",
            options: ["R$ 215,00", "R$ 230,00", "R$ 245,00", "R$ 250,00"],
            correctAnswer: 1,
            explanation: "15% de 200 = 30. Novo valor = 200 + 30 = 230."
          },
          {
            text: "Se um capital de R$ 1.000,00 é aplicado a juros simples de 2% ao mês durante 5 meses, qual será o montante final?",
            options: ["R$ 1.020,00", "R$ 1.100,00", "R$ 1.104,08", "R$ 1.200,00"],
            correctAnswer: 1,
            explanation: "J = C * i * t = 1000 * 0,02 * 5 = 100. Montante = 1000 + 100 = 1100."
          },
          {
            text: "Um desconto sucessivo de 10% e depois 20% sobre um valor inicial equivale a um desconto único de:",
            options: ["28%", "30%", "32%", "35%"],
            correctAnswer: 0,
            explanation: "Seja 100 o valor. -10% = 90. -20% de 90 = 18. Valor final = 72. Desconto total = 100 - 72 = 28%."
          },
          {
            text: "A fórmula do Montante em Juros Compostos é M = C(1+i)^t. Se R$ 500,00 são aplicados a 10% ao ano por 2 anos, o montante será:",
            options: ["R$ 550,00", "R$ 600,00", "R$ 605,00", "R$ 650,00"],
            correctAnswer: 2,
            explanation: "M = 500 * (1 + 0,10)² = 500 * 1,21 = 605."
          }
        ]
      },
      { 
        id: 'mat-27', 
        title: 'Razão, Proporção e Regra de Três', 
        completed: false,
        questions: [
          {
            text: "Uma torneira enche um tanque em 4 horas. Duas torneiras iguais encherão o mesmo tanque em:",
            options: ["2 horas", "4 horas", "6 horas", "8 horas"],
            correctAnswer: 0,
            explanation: "Grandezas inversamente proporcionais: o dobro de torneiras leva metade do tempo (4 / 2 = 2 horas)."
          },
          {
            text: "A escala de um mapa é 1:500.000. Se a distância entre duas cidades no mapa é de 4 cm, qual a distância real em km?",
            options: ["2 km", "20 km", "50 km", "200 km"],
            correctAnswer: 1,
            explanation: "Distância real = 4 * 500.000 = 2.000.000 cm = 20.000 m = 20 km."
          },
          {
            text: "Para fazer um bolo, utilizam-se 3 ovos para cada 2 xícaras de farinha. Se eu usar 6 xícaras de farinha, quantos ovos precisarei?",
            options: ["6 ovos", "9 ovos", "12 ovos", "15 ovos"],
            correctAnswer: 1,
            explanation: "Regra de três simples e direta: 3/2 = x/6 => 2x = 18 => x = 9."
          },
          {
            text: "Se 5 pedreiros constroem um muro em 12 dias, quantos dias 3 pedreiros levariam para construir o mesmo muro?",
            options: ["7,2 dias", "15 dias", "20 dias", "30 dias"],
            correctAnswer: 2,
            explanation: "Grandezas inversamente proporcionais: 5 * 12 = 3 * x => 60 = 3x => x = 20 dias."
          }
        ]
      },
    ],
  },
  {
    id: 'por',
    name: 'Linguagens',
    icon: 'BookOpen',
    color: 'bg-red-500',
    topics: [
      { 
        id: 'por-1', 
        title: 'Estratégias de Interpretação de Texto', 
        completed: false,
        questions: [
          {
            text: "No contexto da comunicação digital, o uso de emojis e figurinhas cumpre qual função primordial?",
            options: [
              "Substituir completamente a linguagem escrita.",
              "Dificultar a compreensão para quem não é nativo digital.",
              "Complementar a carga emocional e o sentido da mensagem.",
              "Reduzir o tempo de digitação sem agregar valor semântico.",
              "Isolar grupos sociais específicos através de códigos secretos."
            ],
            correctAnswer: 2,
            explanation: "Emojis e figurinhas funcionam como elementos não-verbais que ajudam a transmitir entonação, emoção e contexto, complementando o texto escrito."
          },
          {
            text: "(Enem 2017) A língua é um sistema de signos que permite a comunicação. No entanto, ela não é estática. A variação linguística ocorre por fatores:",
            options: [
              "Apenas geográficos e históricos.",
              "Exclusivamente sociais e econômicos.",
              "Geográficos, históricos, sociais e situacionais.",
              "Apenas pela vontade individual do falante.",
              "Somente em contextos informais de fala."
            ],
            correctAnswer: 2,
            explanation: "A língua varia de acordo com a região (geográfica), o tempo (histórica), o grupo social (social) e o contexto da comunicação (situacional)."
          },
          {
            text: "A intertextualidade ocorre quando um texto:",
            options: [
              "Não apresenta nenhuma relação com outros textos.",
              "Faz referência explícita ou implícita a outro texto preexistente.",
              "É escrito em uma língua estrangeira.",
              "Apresenta erros gramaticais intencionais.",
              "Utiliza apenas linguagem não-verbal."
            ],
            correctAnswer: 1,
            explanation: "A intertextualidade é o diálogo entre textos, podendo ocorrer em forma de citação, paródia, paráfrase ou alusão."
          },
          {
            text: "Em um texto argumentativo, a tese representa:",
            options: [
              "A conclusão final do autor.",
              "O ponto de vista principal que será defendido.",
              "Os dados estatísticos apresentados.",
              "As citações de especialistas.",
              "A introdução do tema."
            ],
            correctAnswer: 1,
            explanation: "A tese é a ideia central, a opinião ou o posicionamento do autor em relação ao tema abordado."
          }
        ]
      },
      { 
        id: 'por-2', 
        title: 'Funções e Figuras de Linguagem', 
        completed: false,
        questions: [
          {
            text: "Qual figura de linguagem está presente na frase: 'O jardim olhava para as crianças com tristeza'?",
            options: ["Metáfora", "Personificação (Prosopopeia)", "Hipérbole", "Eufemismo", "Antítese"],
            correctAnswer: 1,
            explanation: "Atribuir sentimentos ou ações humanas a seres inanimados (o jardim olhando) é uma personificação."
          },
          {
            text: "Na frase 'Ele faltou com a verdade', temos qual figura de linguagem?",
            options: ["Ironia", "Eufemismo", "Metonímia", "Catacrese", "Pleonasmo"],
            correctAnswer: 1,
            explanation: "O eufemismo é usado para suavizar uma expressão desagradável (mentir)."
          },
          {
            text: "A função da linguagem focada no canal de comunicação, utilizada para testar ou manter o contato (ex: 'Alô?', 'Entende?'), é a:",
            options: ["Função Emotiva", "Função Conativa", "Função Fática", "Função Metalinguística", "Função Poética"],
            correctAnswer: 2,
            explanation: "A função fática tem como objetivo estabelecer, prolongar ou interromper a comunicação, focando no canal."
          },
          {
            text: "Quando um poema fala sobre o próprio ato de escrever poesia, predomina a função:",
            options: ["Referencial", "Emotiva", "Metalinguística", "Fática", "Conativa"],
            correctAnswer: 2,
            explanation: "A função metalinguística ocorre quando o código (a linguagem) é usado para explicar ou falar sobre o próprio código."
          }
        ]
      },
      { 
        id: 'por-3', 
        title: 'Variação Linguística', 
        completed: false,
        questions: [
          {
            text: "O uso de gírias específicas por um grupo de skatistas é um exemplo de variação:",
            options: ["Diacrônica (histórica)", "Diatópica (regional)", "Diastrática (social)", "Diafásica (situacional)"],
            correctAnswer: 2,
            explanation: "A variação diastrática (ou sociocultural) ocorre entre diferentes grupos sociais, profissões, idades, etc."
          },
          {
            text: "A diferença entre o português falado em Portugal e no Brasil é um exemplo de variação:",
            options: ["Histórica", "Regional (Diatópica)", "Social", "Situacional"],
            correctAnswer: 1,
            explanation: "A variação regional ocorre devido a diferenças geográficas."
          },
          {
            text: "O uso de gírias e regionalismos em diferentes partes do Brasil é um exemplo de qual tipo de variação linguística?",
            options: ["Variação Diatópica (Geográfica)", "Variação Diacrônica (Histórica)", "Variação Diastrática (Social)", "Variação Diafásica (Situacional)"],
            correctAnswer: 0,
            explanation: "A variação diatópica refere-se às diferenças de fala entre diferentes regiões geográficas."
          }
        ]
      },
      { 
        id: 'por-4', 
        title: 'Gêneros e Tipologias Textuais', 
        completed: false,
        questions: [
          {
            text: "Um texto que tem como objetivo principal convencer o leitor sobre um ponto de vista é classificado como:",
            options: ["Narrativo", "Descritivo", "Dissertativo-argumentativo", "Injuntivo"],
            correctAnswer: 2,
            explanation: "O texto dissertativo-argumentativo busca defender uma tese através de argumentos para persuadir o leitor."
          },
          {
            text: "Qual a tipologia textual predominante em uma receita culinária ou manual de instruções?",
            options: ["Narrativa", "Descritiva", "Dissertativa", "Injuntiva"],
            correctAnswer: 3,
            explanation: "Textos injuntivos (ou instrucionais) orientam, instruem ou dão ordens ao leitor, frequentemente usando verbos no imperativo."
          },
          {
            text: "A crônica é um gênero textual que se caracteriza principalmente por:",
            options: ["Linguagem altamente formal e temas científicos.", "Narrativas longas com múltiplos núcleos de personagens.", "Abordagem de temas do cotidiano com linguagem acessível e tom pessoal.", "Estrutura rígida em versos decassílabos."],
            correctAnswer: 2,
            explanation: "A crônica é um texto curto que reflete sobre fatos do dia a dia, muitas vezes com humor, ironia ou lirismo."
          },
          {
            text: "O editorial de um jornal pertence a qual gênero textual?",
            options: ["Informativo", "Argumentativo", "Narrativo", "Descritivo"],
            correctAnswer: 1,
            explanation: "O editorial expressa a opinião do veículo de comunicação sobre um determinado assunto, sendo, portanto, argumentativo."
          }
        ]
      },
      { 
        id: 'por-5', 
        title: 'Literatura: Quinhentismo e Barroco', 
        completed: false,
        questions: [
          {
            text: "Qual a principal característica do Barroco na literatura brasileira?",
            options: ["Equilíbrio e clareza", "Dualidade e uso de antíteses", "Exaltação da natureza", "Crítica social direta"],
            correctAnswer: 1,
            explanation: "O Barroco é marcado pelo conflito entre o sagrado e o profano, refletido no uso constante de antíteses e paradoxos."
          },
          {
            text: "A 'Carta de Achamento do Brasil', escrita por Pero Vaz de Caminha, é o principal documento de qual período literário?",
            options: ["Barroco", "Arcadismo", "Quinhentismo", "Romantismo"],
            correctAnswer: 2,
            explanation: "O Quinhentismo engloba a literatura de informação (como a carta de Caminha) e a literatura de catequese (jesuítas) no século XVI."
          },
          {
            text: "Gregório de Matos, conhecido como 'Boca do Inferno', destacou-se em qual estilo literário?",
            options: ["Poesia Épica", "Poesia Satírica", "Prosa Romântica", "Teatro Jesuítico"],
            correctAnswer: 1,
            explanation: "Gregório de Matos foi o maior poeta barroco brasileiro, famoso por suas sátiras à sociedade baiana da época."
          },
          {
            text: "O conceptismo, característica do Barroco, foca principalmente em:",
            options: ["Jogo de palavras e ornamentação excessiva.", "Jogo de ideias e raciocínio lógico.", "Exaltação da forma poética.", "Descrição detalhada da natureza."],
            correctAnswer: 1,
            explanation: "O conceptismo (ou quevedismo) valoriza o conteúdo, a argumentação e o jogo de ideias, enquanto o cultismo foca na forma e no jogo de palavras."
          }
        ]
      },
      { 
        id: 'por-6', 
        title: 'Literatura: Arcadismo e Romantismo', 
        completed: false,
        questions: [
          {
            text: "O lema 'Carpe Diem' é característico de qual movimento literário?",
            options: ["Barroco", "Arcadismo", "Romantismo", "Realismo"],
            correctAnswer: 1,
            explanation: "O Arcadismo pregava a vida simples no campo e o aproveitamento do dia presente (Carpe Diem)."
          },
          {
            text: "A obra 'Iracema', de José de Alencar, pertence a qual fase do Romantismo brasileiro?",
            options: ["1ª Geração (Indianista/Nacionalista)", "2ª Geração (Ultrarromântica)", "3ª Geração (Condoreira)", "Fase de Transição"],
            correctAnswer: 0,
            explanation: "Iracema exalta o indígena como herói nacional, característica central da primeira geração romântica."
          },
          {
            text: "Qual poeta é o principal representante da 3ª Geração Romântica (Condoreira), conhecida pela poesia social e abolicionista?",
            options: ["Gonçalves Dias", "Álvares de Azevedo", "Castro Alves", "Casimiro de Abreu"],
            correctAnswer: 2,
            explanation: "Castro Alves, o 'Poeta dos Escravos', usou sua poesia para denunciar a escravidão (ex: 'Navio Negreiro')."
          },
          {
            text: "O Arcadismo brasileiro teve forte ligação com qual movimento histórico?",
            options: ["Revolução Farroupilha", "Inconfidência Mineira", "Guerra de Canudos", "Revolução de 1930"],
            correctAnswer: 1,
            explanation: "Muitos poetas árcades, como Tomás Antônio Gonzaga e Cláudio Manuel da Costa, participaram da Inconfidência Mineira."
          }
        ]
      },
      { 
        id: 'por-7', 
        title: 'Literatura: Realismo, Naturalismo e Parnasianismo', 
        completed: false,
        questions: [
          {
            text: "Quem é o autor de 'Memórias Póstumas de Brás Cubas', obra marco do Realismo no Brasil?",
            options: ["Aluísio Azevedo", "Machado de Assis", "Olavo Bilac", "José de Alencar"],
            correctAnswer: 1,
            explanation: "Machado de Assis inaugurou o Realismo brasileiro com Brás Cubas em 1881."
          },
          {
            text: "O Naturalismo diferencia-se do Realismo principalmente por:",
            options: ["Focar na aristocracia e em análises psicológicas profundas.", "Apresentar uma visão determinista, onde o homem é produto do meio, raça e momento histórico.", "Idealizar a natureza e os sentimentos humanos.", "Utilizar linguagem poética e subjetiva."],
            correctAnswer: 1,
            explanation: "O Naturalismo é uma radicalização do Realismo, influenciado pelo cientificismo e determinismo (ex: 'O Cortiço')."
          },
          {
            text: "Qual a principal característica da poesia parnasiana?",
            options: ["Engajamento político e social.", "Linguagem coloquial e versos livres.", "Culto à forma, objetividade e 'arte pela arte'.", "Exaltação do misticismo e da religiosidade."],
            correctAnswer: 2,
            explanation: "O Parnasianismo valorizava a perfeição formal (rima rica, métrica rigorosa) e a objetividade, rejeitando o sentimentalismo romântico."
          },
          {
            text: "A obra 'O Cortiço', de Aluísio Azevedo, é o principal exemplar de qual movimento literário no Brasil?",
            options: ["Romantismo", "Realismo", "Naturalismo", "Parnasianismo"],
            correctAnswer: 2,
            explanation: "A obra retrata a vida coletiva em um cortiço, mostrando como o ambiente influencia o comportamento das personagens, característica central do Naturalismo."
          }
        ]
      },
      { 
        id: 'por-8', 
        title: 'Literatura: Simbolismo e Pré-Modernismo', 
        completed: false,
        questions: [
          {
            text: "Qual obra de Euclides da Cunha é fundamental para o Pré-Modernismo brasileiro?",
            options: ["Os Sertões", "Urupês", "Canaã", "Triste Fim de Policarpo Quaresma"],
            correctAnswer: 0,
            explanation: "Os Sertões mistura literatura, sociologia e história para narrar a Guerra de Canudos."
          },
          {
            text: "O Simbolismo na literatura caracteriza-se por:",
            options: ["Descrições objetivas e detalhadas da realidade.", "Uso de linguagem musical, sugestiva e temas místicos/espirituais.", "Forte engajamento político e denúncia social.", "Valorização da cultura popular e folclore."],
            correctAnswer: 1,
            explanation: "Os simbolistas buscavam expressar o inconsciente e o espiritual através de símbolos, sinestesias e musicalidade (ex: Cruz e Sousa)."
          },
          {
            text: "O personagem Jeca Tatu, criado por Monteiro Lobato, representa qual crítica social do Pré-Modernismo?",
            options: ["A exploração do trabalhador urbano nas fábricas.", "O abandono e a miséria do caboclo (caipira) no interior do Brasil.", "A corrupção política na República Velha.", "A influência estrangeira na cultura nacional."],
            correctAnswer: 1,
            explanation: "Jeca Tatu desmistificou a visão romântica do homem do campo, mostrando-o doente e abandonado pelo Estado."
          },
          {
            text: "Lima Barreto, autor pré-modernista, destacou-se por:",
            options: ["Sua poesia de rigor formal e vocabulário erudito.", "Obras que retratam a elite cafeeira paulista.", "Sua literatura engajada, criticando o preconceito racial e as desigualdades sociais no Rio de Janeiro.", "Romances históricos sobre o período colonial."],
            correctAnswer: 2,
            explanation: "Lima Barreto (autor de 'Triste Fim de Policarpo Quaresma') foi um crítico ferrenho da sociedade carioca da época, abordando temas como racismo e burocracia."
          }
        ]
      },
      { 
        id: 'por-9', 
        title: 'Literatura: Modernismo (1ª, 2ª e 3ª fases)', 
        completed: false,
        questions: [
          {
            text: "A Semana de Arte Moderna de 1922 ocorreu em qual cidade?",
            options: ["Rio de Janeiro", "São Paulo", "Belo Horizonte", "Recife"],
            correctAnswer: 1,
            explanation: "O evento marco do Modernismo brasileiro aconteceu no Teatro Municipal de São Paulo."
          },
          {
            text: "A 1ª fase do Modernismo brasileiro (Fase Heroica) caracterizou-se por:",
            options: ["Retorno às formas clássicas e parnasianas.", "Ruptura com o passado, busca por uma identidade nacional e uso de versos livres.", "Forte influência do Romantismo europeu.", "Foco exclusivo em temas religiosos e místicos."],
            correctAnswer: 1,
            explanation: "A Geração de 22 buscou destruir os padrões estéticos anteriores e criar uma arte genuinamente brasileira, livre de regras rígidas."
          },
          {
            text: "Qual autor é o principal representante do 'Romance de 30' (2ª fase modernista), com obras focadas na seca e na miséria do Nordeste?",
            options: ["Mário de Andrade", "Oswald de Andrade", "Graciliano Ramos", "Guimarães Rosa"],
            correctAnswer: 2,
            explanation: "Graciliano Ramos, autor de 'Vidas Secas', é o grande nome da literatura regionalista e social da 2ª fase do Modernismo."
          },
          {
            text: "A 3ª fase do Modernismo (Geração de 45) é marcada pela obra de Guimarães Rosa e Clarice Lispector. Qual a principal característica de Clarice Lispector?",
            options: ["Regionalismo nordestino.", "Poesia concreta e visual.", "Introspecção psicológica e fluxo de consciência.", "Crítica política direta e panfletária."],
            correctAnswer: 2,
            explanation: "Clarice Lispector inovou a prosa brasileira com narrativas focadas no mundo interior das personagens, epifanias e questionamentos existenciais."
          }
        ]
      },
      { 
        id: 'por-10', 
        title: 'Literatura Contemporânea', 
        completed: false,
        questions: [
          {
            text: "A literatura contemporânea brasileira é marcada por:",
            options: ["Rígida métrica e rima", "Pluralidade de vozes e temas urbanos", "Exclusividade de temas rurais", "Uso de linguagem arcaica"],
            correctAnswer: 1,
            explanation: "A produção atual é diversa, explorando o cotidiano das cidades, questões de identidade e novas formas narrativas."
          }
        ]
      },
      { 
        id: 'por-11', 
        title: 'Gramática: Classes de Palavras', 
        completed: false,
        questions: [
          {
            text: "Qual a classe gramatical da palavra 'rápido' na frase: 'Ele correu rápido'?",
            options: ["Adjetivo", "Advérbio", "Substantivo", "Verbo"],
            correctAnswer: 1,
            explanation: "Neste contexto, 'rápido' modifica o verbo 'correu', indicando o modo, portanto é um advérbio."
          },
          {
            text: "Na frase 'Os alunos estudiosos passaram no exame', a palavra 'estudiosos' atua como:",
            options: ["Substantivo", "Adjetivo", "Pronome", "Advérbio"],
            correctAnswer: 1,
            explanation: "'Estudiosos' qualifica o substantivo 'alunos', sendo, portanto, um adjetivo."
          },
          {
            text: "Qual das alternativas apresenta um pronome demonstrativo?",
            options: ["Meu", "Aquele", "Alguém", "Que"],
            correctAnswer: 1,
            explanation: "'Aquele' é um pronome demonstrativo, usado para indicar a posição de algo no espaço ou no tempo."
          },
          {
            text: "A palavra 'porque' (junto e sem acento) é classificada como:",
            options: ["Conjunção explicativa ou causal", "Pronome interrogativo", "Substantivo", "Preposição"],
            correctAnswer: 0,
            explanation: "'Porque' é usado para introduzir uma explicação ou causa (ex: Não fui porque choveu)."
          }
        ]
      },
      { 
        id: 'por-12', 
        title: 'Gramática: Sintaxe da Oração e Período', 
        completed: false,
        questions: [
          {
            text: "Na frase 'As crianças compraram doces', qual o objeto direto?",
            options: ["As crianças", "compraram", "doces", "não há objeto direto"],
            correctAnswer: 2,
            explanation: "Quem compra, compra algo. 'Doces' completa o sentido do verbo transitivo direto 'compraram'."
          },
          {
            text: "Qual a função sintática do termo destacado em: 'A casa DE MADEIRA foi destruída'?",
            options: ["Adjunto adnominal", "Complemento nominal", "Objeto indireto", "Predicativo do sujeito"],
            correctAnswer: 0,
            explanation: "'De madeira' caracteriza o substantivo concreto 'casa', funcionando como adjunto adnominal."
          },
          {
            text: "Na oração 'Choveu muito ontem', o sujeito é classificado como:",
            options: ["Simples", "Oculto", "Indeterminado", "Inexistente (Oração sem sujeito)"],
            correctAnswer: 3,
            explanation: "Verbos que indicam fenômenos da natureza (chover, ventar, nevar) formam orações sem sujeito."
          },
          {
            text: "A oração 'É necessário QUE VOCÊ ESTUDE' é classificada como:",
            options: ["Subordinada substantiva subjetiva", "Subordinada substantiva objetiva direta", "Subordinada adjetiva restritiva", "Subordinada adverbial causal"],
            correctAnswer: 0,
            explanation: "A oração destacada exerce a função de sujeito da oração principal ('É necessário')."
          }
        ]
      },
      { 
        id: 'por-13', 
        title: 'Gramática: Concordância, Regência e Crase', 
        completed: false,
        questions: [
          {
            text: "Assinale a alternativa com o uso correto da crase:",
            options: ["Fomos à pé.", "Entreguei o livro à ela.", "Vou à escola.", "Chegamos à uma hora."],
            correctAnswer: 2,
            explanation: "Usa-se crase diante de substantivos femininos (a + a escola). Não se usa antes de palavras masculinas (pé) ou pronomes pessoais (ela)."
          },
          {
            text: "Qual frase apresenta erro de concordância verbal?",
            options: ["Fazem dois anos que não a vejo.", "Havia muitas pessoas na festa.", "A maioria dos alunos passou.", "Vende-se casas."],
            correctAnswer: 0,
            explanation: "O verbo 'fazer' indicando tempo decorrido é impessoal e deve ficar no singular: 'Faz dois anos...'."
          },
          {
            text: "Assinale a alternativa com a regência verbal correta:",
            options: ["Assisti o filme ontem.", "Prefiro mais doce do que salgado.", "Cheguei no cinema atrasado.", "Obedeça aos seus pais."],
            correctAnswer: 3,
            explanation: "O verbo obedecer é transitivo indireto e exige a preposição 'a'. (Assistir ao filme; Prefiro doce a salgado; Cheguei ao cinema)."
          },
          {
            text: "O uso da crase é facultativo antes de:",
            options: ["Palavras masculinas.", "Verbos no infinitivo.", "Nomes de cidades que não admitem artigo.", "Pronomes possessivos femininos no singular (minha, tua, sua)."],
            correctAnswer: 3,
            explanation: "Antes de pronomes possessivos femininos no singular, o uso do artigo 'a' é opcional, tornando a crase facultativa."
          }
        ]
      },
      { 
        id: 'por-14', 
        title: 'Artes: Movimentos e Patrimônio Cultural', 
        completed: false,
        questions: [
          {
            text: "A Semana de Arte Moderna de 1922, realizada em São Paulo, teve como principal objetivo:",
            options: ["Reafirmar os valores estéticos do Parnasianismo e do Academismo europeu.", "Romper com o tradicionalismo e propor uma arte genuinamente brasileira, livre de regras rígidas.", "Celebrar a influência da arte clássica greco-romana na cultura nacional.", "Promover a censura de obras consideradas subversivas pelo governo."],
            correctAnswer: 1,
            explanation: "Os modernistas buscaram uma identidade nacional na arte, valorizando elementos brasileiros e rompendo com o formalismo europeu."
          },
          {
            text: "O quadro 'Abaporu', de Tarsila do Amaral, é o símbolo de qual movimento artístico brasileiro?",
            options: ["Movimento Antropofágico", "Tropicalismo", "Concretismo", "Romantismo"],
            correctAnswer: 0,
            explanation: "O movimento propunha 'deglutir' a cultura estrangeira e misturá-la à cultura nacional para criar algo novo e original."
          },
          {
            text: "O Patrimônio Cultural Imaterial do Brasil, reconhecido pelo IPHAN, inclui bens como:",
            options: ["O centro histórico de Ouro Preto.", "O Cristo Redentor.", "O Frevo, a Roda de Capoeira e o Círio de Nazaré.", "O Museu de Arte de São Paulo (MASP)."],
            correctAnswer: 2,
            explanation: "O patrimônio imaterial refere-se a práticas, representações, expressões, conhecimentos e técnicas (saberes e fazeres) de um povo."
          },
          {
            text: "A Pop Art, movimento que surgiu na década de 1950, caracterizou-se por:",
            options: ["Retratar cenas bucólicas e paisagens naturais.", "Utilizar imagens da cultura de massa, publicidade e quadrinhos, criticando o consumismo.", "Focar exclusivamente na arte abstrata e geométrica.", "Ser um movimento restrito à elite intelectual europeia."],
            correctAnswer: 1,
            explanation: "Artistas como Andy Warhol usaram ícones populares (como latas de sopa e celebridades) para refletir sobre a sociedade de consumo."
          }
        ]
      },
      { 
        id: 'por-15', 
        title: 'Educação Física: Corpo, Saúde e Sociedade', 
        completed: false,
        questions: [
          {
            text: "No contexto do ENEM, a Educação Física é abordada principalmente sob a perspectiva:",
            options: ["Do rendimento esportivo de alto nível e quebra de recordes.", "Da memorização de regras de esportes olímpicos.", "Da cultura corporal de movimento, saúde, lazer e inclusão social.", "Da formação exclusiva de atletas profissionais."],
            correctAnswer: 2,
            explanation: "O ENEM foca nas práticas corporais como fenômenos culturais, sociais e promotores de saúde e cidadania."
          },
          {
            text: "A 'ditadura da beleza' e a imposição de padrões estéticos irreais pela mídia frequentemente resultam em:",
            options: ["Aumento da autoestima geral da população.", "Transtornos alimentares (como anorexia e bulimia) e insatisfação corporal.", "Erradicação da obesidade no mundo.", "Maior aceitação da diversidade de corpos."],
            correctAnswer: 1,
            explanation: "A pressão social por um corpo 'perfeito' pode levar a graves problemas de saúde física e mental."
          },
          {
            text: "O sedentarismo, considerado um problema de saúde pública mundial, está diretamente associado ao aumento do risco de:",
            options: ["Doenças infectocontagiosas.", "Doenças crônicas não transmissíveis, como diabetes tipo 2 e hipertensão.", "Doenças genéticas hereditárias.", "Desnutrição severa."],
            correctAnswer: 1,
            explanation: "A falta de atividade física regular é um dos principais fatores de risco para doenças cardiovasculares e metabólicas."
          },
          {
            text: "Os esportes paralímpicos têm como principal função social:",
            options: ["Segregar pessoas com deficiência em competições isoladas.", "Promover a inclusão, a superação e a visibilidade das pessoas com deficiência na sociedade.", "Substituir a fisioterapia tradicional.", "Gerar lucro exclusivo para patrocinadores."],
            correctAnswer: 1,
            explanation: "O esporte adaptado é uma poderosa ferramenta de inclusão social e quebra de preconceitos (capacitismo)."
          }
        ]
      },
      { 
        id: 'por-16', 
        title: 'Tecnologias da Informação e Comunicação', 
        completed: false,
        questions: [
          {
            text: "O conceito de 'Cibercultura' refere-se:",
            options: ["À cultura desenvolvida exclusivamente por robôs.", "Ao conjunto de práticas, atitudes e valores que se desenvolvem no ciberespaço, mediadas pela internet.", "À rejeição total do uso de tecnologias no dia a dia.", "À cultura de povos isolados que não têm acesso à internet."],
            correctAnswer: 1,
            explanation: "A cibercultura engloba as novas formas de comunicação, interação e produção de conhecimento na era digital."
          },
          {
            text: "As 'Fake News' (notícias falsas) disseminadas nas redes sociais representam um perigo para a sociedade porque:",
            options: ["Aumentam o vocabulário dos leitores.", "Promovem o debate democrático saudável.", "Podem manipular a opinião pública, influenciar eleições e causar pânico moral.", "São sempre fáceis de identificar e ignorar."],
            correctAnswer: 2,
            explanation: "A desinformação em massa ameaça a democracia e a tomada de decisões informadas pela população."
          },
          {
            text: "O termo 'Exclusão Digital' descreve:",
            options: ["A decisão voluntária de não usar redes sociais.", "A desigualdade no acesso às tecnologias de informação e comunicação (TICs) e à internet.", "O bloqueio de sites de entretenimento em escolas.", "A substituição de livros impressos por e-books."],
            correctAnswer: 1,
            explanation: "A exclusão digital reflete e aprofunda as desigualdades sociais e econômicas existentes."
          },
          {
            text: "A 'Hipertextualidade', característica marcante da internet, permite ao leitor:",
            options: ["Ler um texto de forma estritamente linear, do começo ao fim.", "Navegar por diferentes textos e mídias através de links, criando seu próprio percurso de leitura não-linear.", "Apenas visualizar imagens sem texto associado.", "Imprimir o conteúdo para leitura offline."],
            correctAnswer: 1,
            explanation: "O hipertexto quebra a linearidade da leitura tradicional, permitindo conexões instantâneas com outras informações."
          }
        ]
      },
    ],
  },
  {
    id: 'his',
    name: 'Ciências Humanas',
    icon: 'Globe',
    color: 'bg-orange-500',
    topics: [
      { 
        id: 'his-1', 
        title: 'Brasil Colônia: Economia e Sociedade', 
        completed: false,
        questions: [
          {
            text: "O ciclo do açúcar no Brasil Colônia foi marcado por qual característica socioeconômica principal?",
            options: [
              "Uso predominante de mão de obra assalariada.",
              "Pequenas propriedades voltadas para o mercado interno.",
              "Sistema de plantation: latifúndio, monocultura e escravidão.",
              "Desenvolvimento de uma forte classe média urbana.",
              "Independência econômica total em relação a Portugal."
            ],
            correctAnswer: 2,
            explanation: "A economia açucareira baseava-se no tripé: grandes extensões de terra (latifúndio), produção única para exportação (monocultura) e trabalho escravo."
          },
          {
            text: "A principal atividade econômica do Brasil no século XVIII, que deslocou o eixo econômico do Nordeste para o Sudeste, foi:",
            options: ["A extração do pau-brasil.", "A produção de café.", "A mineração de ouro e diamantes.", "A pecuária extensiva."],
            correctAnswer: 2,
            explanation: "A descoberta de ouro em Minas Gerais no final do século XVII iniciou o ciclo da mineração, mudando o foco econômico e demográfico para a região Sudeste."
          },
          {
            text: "Qual foi o principal objetivo das Capitanias Hereditárias, sistema implantado por Portugal no Brasil em 1534?",
            options: ["Promover a independência da colônia.", "Transferir para a iniciativa privada os custos da colonização e defesa do território.", "Estabelecer um sistema democrático de governo.", "Incentivar a industrialização local."],
            correctAnswer: 1,
            explanation: "A Coroa Portuguesa, sem recursos, dividiu o território e o entregou a donatários, que deveriam arcar com os custos de povoar, defender e explorar a terra."
          },
          {
            text: "A Inconfidência Mineira (1789) teve como uma de suas principais causas:",
            options: ["A abolição da escravidão.", "A cobrança da derrama (impostos atrasados sobre o ouro).", "A invasão holandesa no Nordeste.", "A disputa por terras com os espanhóis."],
            correctAnswer: 1,
            explanation: "A ameaça da cobrança da derrama, somada aos ideais iluministas e à insatisfação com o monopólio comercial português, motivou a revolta elitista em Minas Gerais."
          }
        ]
      },
      { 
        id: 'his-2', 
        title: 'Brasil Império: Primeiro e Segundo Reinado', 
        completed: false,
        questions: [
          {
            text: "O Segundo Reinado (1840-1889) foi marcado pela estabilidade política e pela expansão de qual cultura agrícola?",
            options: ["Cana-de-açúcar", "Algodão", "Café", "Cacau", "Borracha"],
            correctAnswer: 2,
            explanation: "O café foi o principal produto da economia brasileira durante o Segundo Reinado, financiando a modernização do país."
          },
          {
            text: "A Lei de Terras de 1850 determinou que:",
            options: ["As terras públicas seriam doadas aos imigrantes europeus.", "A aquisição de terras públicas só poderia ser feita por meio de compra.", "As terras indígenas seriam demarcadas e protegidas.", "Haveria uma reforma agrária para distribuir terras aos ex-escravizados."],
            correctAnswer: 1,
            explanation: "A lei dificultou o acesso à terra para pessoas pobres e ex-escravizados, favorecendo a concentração fundiária nas mãos dos grandes proprietários."
          },
          {
            text: "O Golpe da Maioridade (1840) teve como objetivo principal:",
            options: ["Proclamar a República.", "Abolir a escravidão.", "Antecipar a posse de D. Pedro II para conter as revoltas do Período Regencial.", "Declarar guerra ao Paraguai."],
            correctAnswer: 2,
            explanation: "Diante da instabilidade e das revoltas regenciais, liberais e conservadores apoiaram a antecipação da maioridade de D. Pedro II (aos 14 anos) para restaurar a ordem."
          },
          {
            text: "A Guerra do Paraguai (1864-1870) teve como uma de suas consequências para o Brasil:",
            options: ["O fortalecimento do Exército Brasileiro e o aumento do endividamento externo.", "A perda de territórios na região Sul.", "O fim imediato da monarquia.", "O isolamento diplomático do Brasil na América do Sul."],
            correctAnswer: 0,
            explanation: "O Exército saiu fortalecido e passou a reivindicar maior participação política, enquanto o país contraiu grandes dívidas com a Inglaterra para financiar a guerra."
          }
        ]
      },
      { 
        id: 'his-3', 
        title: 'Brasil República: República Velha', 
        completed: false,
        questions: [
          {
            text: "A 'Política do Café com Leite' na República Velha consistia no revezamento da presidência entre quais estados?",
            options: ["Rio de Janeiro e Minas Gerais", "São Paulo e Minas Gerais", "São Paulo e Rio de Janeiro", "Minas Gerais e Rio Grande do Sul"],
            correctAnswer: 1,
            explanation: "O acordo envolvia as oligarquias de São Paulo (café) e Minas Gerais (leite) para alternância no poder federal."
          },
          {
            text: "O 'Coronelismo' na República Velha caracterizava-se por:",
            options: ["Governo militar centralizado no Rio de Janeiro.", "Poder local exercido por grandes fazendeiros que controlavam os votos da população (voto de cabresto).", "Movimento de oficiais de baixa patente contra o governo.", "Política de industrialização acelerada."],
            correctAnswer: 1,
            explanation: "Os 'coronéis' (grandes proprietários rurais) exerciam poder político e econômico local, garantindo votos para seus candidatos através de favores ou coerção."
          },
          {
            text: "A Revolta da Vacina (1904), ocorrida no Rio de Janeiro, foi motivada principalmente por:",
            options: ["Falta de vacinas para toda a população.", "Obrigatoriedade da vacinação contra a varíola, associada a reformas urbanas autoritárias.", "Aumento do preço dos medicamentos.", "Revolta de médicos contra as condições de trabalho."],
            correctAnswer: 1,
            explanation: "A população, já insatisfeita com as demolições (bota-abaixo) no centro do Rio, revoltou-se contra a campanha de vacinação obrigatória liderada por Oswaldo Cruz, vista como autoritária."
          },
          {
            text: "O Tenentismo, movimento surgido na década de 1920, reivindicava:",
            options: ["A volta da monarquia.", "O fim do voto secreto e a manutenção das oligarquias.", "O voto secreto, a moralização da política e o fim da corrupção eleitoral.", "A separação da região Sul do resto do país."],
            correctAnswer: 2,
            explanation: "Jovens oficiais do exército (tenentes) rebelaram-se contra o sistema oligárquico da República Velha, exigindo reformas políticas e eleitorais."
          }
        ]
      },
      { 
        id: 'his-4', 
        title: 'Era Vargas e Populismo', 
        completed: false,
        questions: [
          {
            text: "A criação da CLT (Consolidação das Leis do Trabalho) ocorreu durante qual período do governo de Getúlio Vargas?",
            options: ["Governo Provisório", "Governo Constitucional", "Estado Novo", "Segundo Governo (Eleito)"],
            correctAnswer: 2,
            explanation: "A CLT foi outorgada em 1943, durante o período ditatorial do Estado Novo."
          },
          {
            text: "A Revolução Constitucionalista de 1932 foi um movimento liderado por qual estado contra o governo provisório de Vargas?",
            options: ["Minas Gerais", "Rio de Janeiro", "São Paulo", "Rio Grande do Sul"],
            correctAnswer: 2,
            explanation: "São Paulo exigia a elaboração de uma nova Constituição e o fim do governo provisório de Vargas."
          },
          {
            text: "O populismo na América Latina, exemplificado por Vargas no Brasil e Perón na Argentina, caracterizou-se por:",
            options: ["Apoio exclusivo das elites agrárias.", "Líderes carismáticos que estabeleciam uma relação direta com as massas trabalhadoras, muitas vezes controlando os sindicatos.", "Rejeição total à industrialização.", "Alinhamento incondicional ao bloco socialista durante a Guerra Fria."],
            correctAnswer: 1,
            explanation: "O populismo baseava-se no carisma do líder, na concessão de direitos trabalhistas (paternalismo) e no controle estatal sobre os sindicatos (peleguismo)."
          },
          {
            text: "A campanha 'O Petróleo é Nosso', que culminou na criação da Petrobras em 1953, ocorreu durante:",
            options: ["O Estado Novo.", "O governo de Juscelino Kubitschek.", "O segundo governo de Getúlio Vargas (fase democrática).", "O governo de João Goulart."],
            correctAnswer: 2,
            explanation: "A criação da Petrobras foi um marco do nacionalismo econômico do segundo governo Vargas."
          }
        ]
      },
      { 
        id: 'his-5', 
        title: 'Ditadura Militar e Redemocratização', 
        completed: false,
        questions: [
          {
            text: "O movimento das 'Diretas Já' (1984) reivindicava:",
            options: ["O fim da censura", "Eleições diretas para presidente", "A anistia ampla e geral", "A criação de uma nova Constituição"],
            correctAnswer: 1,
            explanation: "O movimento pedia a aprovação da emenda Dante de Oliveira para restabelecer o voto direto para a presidência."
          },
          {
            text: "O Ato Institucional nº 5 (AI-5), decretado em 1968, representou:",
            options: ["A abertura política e o início da redemocratização.", "O endurecimento do regime militar, com fechamento do Congresso e suspensão de habeas corpus.", "A anistia aos presos políticos.", "A criação de novos partidos políticos de oposição."],
            correctAnswer: 1,
            explanation: "O AI-5 foi o instrumento mais repressivo da ditadura, marcando o início dos 'Anos de Chumbo'."
          },
          {
            text: "O 'Milagre Econômico' brasileiro (1968-1973) foi caracterizado por:",
            options: ["Altas taxas de crescimento do PIB, acompanhadas de aumento da desigualdade social e do endividamento externo.", "Distribuição de renda igualitária e fim da inflação.", "Forte investimento em agricultura familiar.", "Independência tecnológica em relação aos países desenvolvidos."],
            correctAnswer: 0,
            explanation: "Apesar do rápido crescimento econômico, o período gerou concentração de renda ('fazer o bolo crescer para depois dividir') e aumento da dívida externa."
          },
          {
            text: "A Constituição de 1988, conhecida como 'Constituição Cidadã', destacou-se por:",
            options: ["Restringir os direitos trabalhistas.", "Estabelecer o voto censitário.", "Ampliar os direitos civis, sociais e políticos, incluindo o direito de voto aos analfabetos.", "Manter a censura prévia aos meios de comunicação."],
            correctAnswer: 2,
            explanation: "A Constituição de 1988 marcou a redemocratização, garantindo amplos direitos fundamentais e sociais."
          }
        ]
      },
      { 
        id: 'his-6', 
        title: 'História Geral: Antiguidade Clássica', 
        completed: false,
        questions: [
          {
            text: "A democracia direta, onde os cidadãos participavam das decisões na Ágora, surgiu em qual cidade-estado grega?",
            options: ["Esparta", "Atenas", "Corinto", "Tebas"],
            correctAnswer: 1,
            explanation: "Atenas é considerada o berço da democracia, embora fosse restrita a homens livres e cidadãos."
          },
          {
            text: "A sociedade espartana era conhecida principalmente por seu caráter:",
            options: ["Democrático e filosófico.", "Comercial e marítimo.", "Militarista e oligárquico.", "Pacífico e artístico."],
            correctAnswer: 2,
            explanation: "Esparta era uma pólis voltada para a guerra, governada por uma elite militar (esparciatas)."
          },
          {
            text: "A expansão do Império Romano foi impulsionada, em grande parte, pela necessidade de:",
            options: ["Difundir o cristianismo.", "Obter terras, riquezas e escravos.", "Estabelecer democracias nos povos conquistados.", "Fugir de invasões bárbaras no início de sua história."],
            correctAnswer: 1,
            explanation: "A economia romana dependia fortemente do trabalho escravo e das riquezas obtidas nas províncias conquistadas."
          },
          {
            text: "A Pax Romana, período de relativa paz e estabilidade no Império Romano, iniciou-se no governo de:",
            options: ["Júlio César", "Otávio Augusto", "Nero", "Constantino"],
            correctAnswer: 1,
            explanation: "Otávio Augusto, o primeiro imperador, estabeleceu a Pax Romana, que durou cerca de dois séculos."
          }
        ]
      },
      { 
        id: 'his-7', 
        title: 'História Geral: Idade Média e Feudalismo', 
        completed: false,
        questions: [
          {
            text: "O sistema feudal baseava-se em qual tipo de relação de dependência pessoal?",
            options: ["Escravidão", "Vassalagem e Suserania", "Trabalho assalariado", "Parceria comercial"],
            correctAnswer: 1,
            explanation: "A suserania e vassalagem eram acordos de fidelidade e proteção entre nobres em troca de terras (feudos)."
          },
          {
            text: "A economia feudal caracterizava-se por ser:",
            options: ["Altamente monetarizada e voltada para a exportação.", "Agrária, de subsistência e com pouca circulação de moedas.", "Focada na produção industrial em larga escala.", "Baseada no comércio marítimo de longa distância."],
            correctAnswer: 1,
            explanation: "O feudo era a unidade básica de produção, buscando a autossuficiência, com o comércio e o uso de moedas reduzidos."
          },
          {
            text: "Qual instituição exerceu o maior poder político, cultural e ideológico durante a Idade Média na Europa Ocidental?",
            options: ["O Império Bizantino", "A Igreja Católica", "As Corporações de Ofício", "A Monarquia Absolutista"],
            correctAnswer: 1,
            explanation: "A Igreja Católica detinha vastas extensões de terra e controlava a educação e a mentalidade da época (teocentrismo)."
          },
          {
            text: "As Cruzadas (séculos XI ao XIII) foram expedições militares e religiosas que tiveram como uma de suas consequências:",
            options: ["O fortalecimento do feudalismo.", "A reabertura do Mar Mediterrâneo ao comércio europeu e o renascimento comercial.", "A conversão pacífica dos muçulmanos ao cristianismo.", "A destruição total do Império Bizantino."],
            correctAnswer: 1,
            explanation: "Embora não tenham alcançado seu objetivo religioso principal a longo prazo, as Cruzadas reativaram o comércio entre o Oriente e o Ocidente."
          }
        ]
      },
      { 
        id: 'his-8', 
        title: 'Renascimento, Reformas e Iluminismo', 
        completed: false,
        questions: [
          {
            text: "Quem é o autor da obra 'O Príncipe', fundamental para o pensamento político moderno?",
            options: ["Erasmo de Roterdã", "Thomas More", "Nicolau Maquiavel", "Dante Alighieri"],
            correctAnswer: 2,
            explanation: "Maquiavel escreveu 'O Príncipe' analisando o poder político de forma pragmática e realista."
          },
          {
            text: "O Renascimento Cultural (séculos XIV a XVI) caracterizou-se pelo:",
            options: ["Teocentrismo e rejeição da cultura greco-romana.", "Antropocentrismo, racionalismo e valorização da antiguidade clássica.", "Apoio incondicional aos dogmas da Igreja Católica.", "Foco exclusivo na arte religiosa abstrata."],
            correctAnswer: 1,
            explanation: "O Renascimento colocou o homem no centro das preocupações (antropocentrismo) e buscou inspiração na arte e filosofia greco-romanas."
          },
          {
            text: "A Reforma Protestante, iniciada por Martinho Lutero em 1517, criticava principalmente:",
            options: ["A venda de indulgências e a corrupção do clero católico.", "A tradução da Bíblia para as línguas vernáculas.", "A doutrina da predestinação absoluta.", "O poder dos reis absolutistas."],
            correctAnswer: 0,
            explanation: "Lutero afixou suas 95 Teses criticando práticas da Igreja, especialmente a venda do perdão dos pecados (indulgências)."
          },
          {
            text: "O Iluminismo (século XVIII) defendia:",
            options: ["O direito divino dos reis e o mercantilismo.", "A razão como guia para o progresso, a liberdade de expressão e a divisão dos poderes.", "O retorno ao sistema feudal e à servidão.", "A submissão da ciência à religião."],
            correctAnswer: 1,
            explanation: "Os pensadores iluministas (como Locke, Montesquieu e Rousseau) criticavam o absolutismo e defendiam ideais de liberdade, igualdade e racionalidade."
          }
        ]
      },
      { 
        id: 'his-9', 
        title: 'Revolução Industrial e Francesa', 
        completed: false,
        questions: [
          {
            text: "A queda de qual símbolo do poder absolutista marcou o início da Revolução Francesa em 1789?",
            options: ["Palácio de Versalhes", "Bastilha", "Arco do Triunfo", "Catedral de Notre-Dame"],
            correctAnswer: 1,
            explanation: "A Tomada da Bastilha é o evento simbólico que marca o início do processo revolucionário francês."
          },
          {
            text: "A Primeira Revolução Industrial (século XVIII), iniciada na Inglaterra, teve como principal fonte de energia e setor pioneiro, respectivamente:",
            options: ["Petróleo e indústria automobilística.", "Eletricidade e indústria química.", "Carvão mineral e indústria têxtil.", "Energia nuclear e indústria bélica."],
            correctAnswer: 2,
            explanation: "A máquina a vapor, movida a carvão, revolucionou a produção, inicialmente na fabricação de tecidos de algodão."
          },
          {
            text: "Um dos principais documentos produzidos durante a Revolução Francesa, que estabeleceu princípios de liberdade e igualdade perante a lei, foi:",
            options: ["A Magna Carta.", "A Declaração dos Direitos do Homem e do Cidadão.", "O Tratado de Versalhes.", "O Código de Hamurabi."],
            correctAnswer: 1,
            explanation: "Inspirada no Iluminismo, a Declaração de 1789 consagrou os direitos naturais e inalienáveis do indivíduo."
          },
          {
            text: "O período do 'Terror' na Revolução Francesa foi liderado por qual grupo político?",
            options: ["Girondinos", "Jacobinos", "Monarquistas", "Clero"],
            correctAnswer: 1,
            explanation: "Os jacobinos, liderados por Robespierre, representavam a ala mais radical da revolução e instituíram um regime de perseguição e execuções."
          }
        ]
      },
      { 
        id: 'his-10', 
        title: 'Guerras Mundiais e Guerra Fria', 
        completed: false,
        questions: [
          {
            text: "O Plano Marshall, após a Segunda Guerra Mundial, tinha como objetivo:",
            options: ["A reconstrução econômica da Europa Ocidental", "A criação da ONU", "O bombardeio do Japão", "A divisão da Alemanha"],
            correctAnswer: 0,
            explanation: "Foi um programa de ajuda financeira dos EUA para reconstruir a Europa e conter o avanço do socialismo."
          },
          {
            text: "O estopim para o início da Primeira Guerra Mundial (1914-1918) foi:",
            options: ["A invasão da Polônia pela Alemanha.", "O ataque japonês a Pearl Harbor.", "O assassinato do arquiduque Francisco Ferdinando, herdeiro do Império Austro-Húngaro.", "A queda do Muro de Berlim."],
            correctAnswer: 2,
            explanation: "O assassinato em Sarajevo desencadeou o sistema de alianças, levando as potências europeias à guerra."
          },
          {
            text: "A Guerra Fria (1947-1991) foi caracterizada por:",
            options: ["Confronto militar direto entre EUA e URSS em território europeu.", "Disputa ideológica, política e armamentista entre o bloco capitalista (EUA) e o bloco socialista (URSS), sem conflito direto entre as superpotências.", "Aliança entre EUA e URSS para combater o terrorismo no Oriente Médio.", "Fim das armas nucleares e desarmamento global."],
            correctAnswer: 1,
            explanation: "A Guerra Fria foi um conflito indireto, marcado pela corrida espacial, armamentista e por guerras por procuração (ex: Vietnã, Coreia)."
          },
          {
            text: "Qual evento marcou simbolicamente o fim da Guerra Fria?",
            options: ["A Crise dos Mísseis em Cuba.", "A Guerra do Vietnã.", "A Queda do Muro de Berlim (1989) e a dissolução da URSS (1991).", "A criação da OTAN."],
            correctAnswer: 2,
            explanation: "A queda do muro e o colapso soviético encerraram a bipolaridade mundial."
          }
        ]
      },
      { 
        id: 'geo-1', 
        title: 'Geografia Física: Relevo, Solo e Clima', 
        completed: false,
        questions: [
          {
            text: "Qual o clima predominante na região Norte do Brasil, caracterizado por altas temperaturas e chuvas abundantes?",
            options: ["Semiárido", "Tropical", "Equatorial", "Subtropical"],
            correctAnswer: 2,
            explanation: "O clima equatorial é marcado pela baixa amplitude térmica e alta pluviosidade durante todo o ano."
          },
          {
            text: "O relevo brasileiro é caracterizado predominantemente por:",
            options: ["Altas cadeias montanhosas de formação recente.", "Planaltos e depressões de formação antiga, desgastados pela erosão.", "Extensas planícies de origem vulcânica.", "Cordilheiras com intensa atividade sísmica."],
            correctAnswer: 1,
            explanation: "O Brasil possui uma estrutura geológica antiga e estável, com relevo desgastado por agentes erosivos ao longo do tempo geológico."
          },
          {
            text: "O bioma brasileiro conhecido como 'caixa d'água do Brasil', por abrigar as nascentes das principais bacias hidrográficas, é o:",
            options: ["Cerrado", "Pantanal", "Amazônia", "Mata Atlântica"],
            correctAnswer: 0,
            explanation: "O Cerrado, localizado no Planalto Central, abriga nascentes de bacias como a do Paraná, São Francisco e Tocantins-Araguaia."
          },
          {
            text: "O fenômeno climático 'El Niño' caracteriza-se por:",
            options: ["Resfriamento anormal das águas do Oceano Atlântico.", "Aquecimento anormal das águas do Oceano Pacífico Equatorial.", "Aumento da camada de ozônio sobre a Antártida.", "Intensificação das chuvas no semiárido nordestino."],
            correctAnswer: 1,
            explanation: "O El Niño altera os padrões de circulação atmosférica global, causando, no Brasil, secas no Norte/Nordeste e chuvas intensas no Sul."
          }
        ]
      },
      { 
        id: 'geo-2', 
        title: 'Geografia Humana: Urbanização e População', 
        completed: false,
        questions: [
          {
            text: "O processo de crescimento desordenado das cidades, resultando na união física de duas ou mais áreas urbanas, chama-se:",
            options: ["Gentrificação", "Conurbação", "Segregação socioespacial", "Metropolização"],
            correctAnswer: 1,
            explanation: "A conurbação ocorre quando o crescimento horizontal das cidades faz com que seus limites se encontrem."
          },
          {
            text: "A transição demográfica brasileira nas últimas décadas é marcada por:",
            options: ["Aumento da taxa de fecundidade e redução da expectativa de vida.", "Queda nas taxas de natalidade e mortalidade, com envelhecimento da população.", "Estagnação do crescimento populacional devido à emigração em massa.", "Aumento da mortalidade infantil e rejuvenescimento da população."],
            correctAnswer: 1,
            explanation: "O Brasil passa por um processo de envelhecimento populacional, com menos nascimentos e maior longevidade."
          },
          {
            text: "O conceito de 'gentrificação' refere-se a:",
            options: ["Processo de favelização em áreas periféricas.", "Revitalização de áreas urbanas centrais ou degradadas, levando à expulsão da população de baixa renda devido ao aumento do custo de vida.", "Criação de condomínios fechados em áreas rurais.", "Migração de retorno de populações urbanas para o campo."],
            correctAnswer: 1,
            explanation: "A gentrificação enobrece áreas urbanas, atraindo investimentos e classes mais altas, mas encarece o custo de vida local, expulsando os moradores originais."
          },
          {
            text: "A principal causa do intenso êxodo rural no Brasil a partir da década de 1950 foi:",
            options: ["A reforma agrária ampla e irrestrita.", "A mecanização do campo e a industrialização das cidades.", "A descoberta de ouro na região Norte.", "As secas prolongadas em todas as regiões do país."],
            correctAnswer: 1,
            explanation: "A modernização agrícola reduziu a necessidade de mão de obra no campo, enquanto as indústrias nas cidades atraíam trabalhadores."
          }
        ]
      },
      { 
        id: 'geo-3', 
        title: 'Geografia Econômica: Agropecuária e Indústria', 
        completed: false,
        questions: [
          {
            text: "O sistema de produção industrial caracterizado pela produção em massa e linha de montagem é o:",
            options: ["Toyotismo", "Fordismo", "Taylorismo", "Volvismo"],
            correctAnswer: 1,
            explanation: "O Fordismo, introduzido por Henry Ford, revolucionou a indústria com a linha de montagem e padronização."
          },
          {
            text: "A expansão da fronteira agrícola brasileira nas últimas décadas ocorreu principalmente em direção a qual bioma?",
            options: ["Mata Atlântica", "Pampa", "Cerrado e bordas da Amazônia", "Caatinga"],
            correctAnswer: 2,
            explanation: "O agronegócio, especialmente o cultivo de soja e a pecuária, avançou fortemente sobre o Centro-Oeste (Cerrado) e o Norte (Amazônia)."
          },
          {
            text: "O Toyotismo, modelo de produção que substituiu o Fordismo em muitas indústrias, baseia-se em:",
            options: ["Produção em massa e grandes estoques.", "Trabalho altamente especializado e repetitivo.", "Produção flexível, 'just in time' e estoques mínimos.", "Controle estatal dos meios de produção."],
            correctAnswer: 2,
            explanation: "O Toyotismo busca a eficiência produzindo apenas o necessário, no momento exato, reduzindo desperdícios e estoques."
          },
          {
            text: "A Terceira Revolução Industrial (Revolução Técnico-Científico-Informacional) é marcada pelo desenvolvimento de setores como:",
            options: ["Indústria têxtil e metalurgia.", "Siderurgia e extração de carvão.", "Informática, robótica, biotecnologia e telecomunicações.", "Indústria automobilística e petroquímica."],
            correctAnswer: 2,
            explanation: "Esta fase é caracterizada pela alta tecnologia, automação e importância do conhecimento e da informação."
          }
        ]
      },
      { 
        id: 'geo-4', 
        title: 'Questões Ambientais e Sustentabilidade', 
        completed: false,
        questions: [
          {
            text: "O fenômeno de retenção de calor na atmosfera terrestre, intensificado pela emissão de gases poluentes, é o:",
            options: ["Inversão térmica", "Efeito estufa", "Chuva ácida", "El Niño"],
            correctAnswer: 1,
            explanation: "O efeito estufa é um processo natural, mas o aumento de gases como CO2 intensifica o aquecimento global."
          },
          {
            text: "As 'ilhas de calor' são um fenômeno climático urbano caracterizado por:",
            options: ["Temperaturas mais baixas no centro das cidades em relação às áreas rurais.", "Temperaturas mais elevadas nas áreas centrais urbanizadas em comparação com as áreas periféricas e rurais.", "Aumento da umidade relativa do ar nas grandes metrópoles.", "Formação de tornados em áreas densamente povoadas."],
            correctAnswer: 1,
            explanation: "A concentração de asfalto, concreto, prédios e a falta de vegetação retêm mais calor nas áreas centrais das cidades."
          },
          {
            text: "A 'inversão térmica' é um fenômeno natural que, em áreas urbanas poluídas, pode causar:",
            options: ["O aumento da camada de ozônio.", "A dispersão rápida dos poluentes atmosféricos.", "A retenção de poluentes próximos à superfície, agravando problemas respiratórios.", "O resfriamento global."],
            correctAnswer: 2,
            explanation: "No inverno, uma camada de ar frio (mais denso) pode ficar presa sob uma camada de ar quente, impedindo a dispersão da poluição."
          },
          {
            text: "O conceito de 'Desenvolvimento Sustentável' refere-se a:",
            options: ["Crescimento econômico a qualquer custo, priorizando a industrialização.", "Preservação intocável da natureza, proibindo qualquer atividade econômica.", "Atender às necessidades do presente sem comprometer a capacidade das gerações futuras de atenderem às suas próprias necessidades.", "Substituição total de fontes de energia renováveis por combustíveis fósseis."],
            correctAnswer: 2,
            explanation: "É o equilíbrio entre desenvolvimento econômico, equidade social e preservação ambiental."
          }
        ]
      },
      { 
        id: 'fil-1', 
        title: 'Filosofia: Antiga e Medieval', 
        completed: false,
        questions: [
          {
            text: "Qual filósofo grego é conhecido pelo método da 'Maiêutica' (parto das ideias)?",
            options: ["Platão", "Aristóteles", "Sócrates", "Heráclito"],
            correctAnswer: 2,
            explanation: "Sócrates utilizava o diálogo e perguntas para fazer com que seus interlocutores chegassem à verdade."
          },
          {
            text: "O 'Mito da Caverna', que ilustra a passagem do mundo sensível (ilusão) para o mundo inteligível (verdade), foi escrito por:",
            options: ["Sócrates", "Aristóteles", "Platão", "Parmênides"],
            correctAnswer: 2,
            explanation: "Platão usou a alegoria na obra 'A República' para explicar sua teoria das ideias."
          },
          {
            text: "Para Aristóteles, a finalidade (télos) de todas as ações humanas é a busca pela:",
            options: ["Riqueza", "Felicidade (Eudaimonia)", "Glória militar", "Salvação da alma"],
            correctAnswer: 1,
            explanation: "A ética aristotélica é teleológica, afirmando que o fim supremo do ser humano é a felicidade, alcançada pela virtude."
          },
          {
            text: "Na Filosofia Medieval, Santo Tomás de Aquino buscou conciliar a fé cristã com o pensamento de qual filósofo grego?",
            options: ["Platão", "Sócrates", "Aristóteles", "Epicuro"],
            correctAnswer: 2,
            explanation: "A Escolástica de Tomás de Aquino utilizou a lógica e a metafísica aristotélica para fundamentar racionalmente os dogmas da Igreja."
          }
        ]
      },
      { 
        id: 'fil-2', 
        title: 'Filosofia: Moderna e Contemporânea', 
        completed: false,
        questions: [
          {
            text: "A frase 'Penso, logo existo' é o pilar do pensamento de qual filósofo racionalista?",
            options: ["John Locke", "Immanuel Kant", "René Descartes", "Friedrich Nietzsche"],
            correctAnswer: 2,
            explanation: "Descartes estabeleceu a dúvida metódica e o 'Cogito, ergo sum' como base do conhecimento seguro."
          },
          {
            text: "O Empirismo, corrente filosófica moderna, defende que o conhecimento deriva principalmente:",
            options: ["Da razão inata.", "Da revelação divina.", "Da experiência sensorial.", "Da intuição mística."],
            correctAnswer: 2,
            explanation: "Filósofos como John Locke e David Hume argumentavam que a mente é uma 'tábula rasa' preenchida pela experiência."
          },
          {
            text: "Immanuel Kant propôs uma 'Revolução Copernicana' na filosofia ao afirmar que:",
            options: ["O sujeito cognoscente é passivo e apenas reflete o objeto.", "O objeto do conhecimento é que se adapta às estruturas cognitivas do sujeito.", "A razão humana é incapaz de conhecer qualquer coisa.", "Apenas a ciência empírica pode alcançar a verdade absoluta."],
            correctAnswer: 1,
            explanation: "Para Kant, nós não conhecemos as coisas em si mesmas, mas apenas como elas aparecem para nós, moldadas pelas nossas formas a priori de sensibilidade e entendimento."
          },
          {
            text: "Friedrich Nietzsche é conhecido por sua crítica contundente à:",
            options: ["Ciência moderna e ao método experimental.", "Moral cristã e aos valores tradicionais ocidentais.", "Arte clássica grega.", "Democracia ateniense."],
            correctAnswer: 1,
            explanation: "Nietzsche criticou a moralidade tradicional (moral de rebanho) e propôs a transvaloração dos valores e o conceito de 'Super-homem' (Übermensch)."
          }
        ]
      },
      { 
        id: 'soc-1', 
        title: 'Sociologia: Clássicos (Marx, Weber, Durkheim)', 
        completed: false,
        questions: [
          {
            text: "Para Émile Durkheim, o objeto de estudo da sociologia deve ser o:",
            options: ["Ação social", "Fato social", "Luta de classes", "Indivíduo isolado"],
            correctAnswer: 1,
            explanation: "Durkheim definiu os fatos sociais como maneiras de agir, pensar e sentir exteriores ao indivíduo e dotadas de coerção."
          },
          {
            text: "Segundo Karl Marx, o motor da história e da transformação social é a:",
            options: ["Solidariedade orgânica.", "Ação racional com relação a valores.", "Luta de classes.", "Evolução natural das espécies."],
            correctAnswer: 2,
            explanation: "Marx argumentava que o conflito entre classes antagônicas (ex: burguesia vs. proletariado) impulsiona as mudanças históricas."
          },
          {
            text: "Max Weber introduziu o conceito de 'Ação Social', que se define como:",
            options: ["Qualquer comportamento humano, consciente ou inconsciente.", "Uma ação cujo sentido é orientado pelo comportamento de outros indivíduos.", "Uma ação determinada exclusivamente por fatores biológicos.", "Uma ação imposta coercitivamente pelo Estado."],
            correctAnswer: 1,
            explanation: "Para Weber, a sociologia deve compreender o sentido que os indivíduos dão às suas ações em relação aos outros."
          },
          {
            text: "O conceito de 'Mais-valia', central na teoria marxista, refere-se a:",
            options: ["O lucro obtido pela venda de mercadorias acima do preço de mercado.", "A diferença entre o valor produzido pelo trabalho do operário e o salário que ele recebe.", "O imposto cobrado pelo Estado sobre a produção industrial.", "A valorização das ações de uma empresa na bolsa de valores."],
            correctAnswer: 1,
            explanation: "A mais-valia é a base da exploração capitalista, representando o trabalho não pago que é apropriado pelo capitalista."
          }
        ]
      },
      { 
        id: 'soc-2', 
        title: 'Sociologia: Cultura, Identidade e Movimentos', 
        completed: false,
        questions: [
          {
            text: "O conceito de 'Indústria Cultural', que analisa a cultura como mercadoria, foi criado por:",
            options: ["Karl Marx", "Max Weber", "Escola de Frankfurt (Adorno e Horkheimer)", "Auguste Comte"],
            correctAnswer: 2,
            explanation: "Adorno e Horkheimer criticaram a massificação da cultura e sua transformação em produto de consumo."
          },
          {
            text: "Etnocentrismo é um conceito antropológico que ocorre quando:",
            options: ["Diferentes culturas convivem em harmonia e igualdade.", "Um indivíduo ou grupo julga outras culturas com base nos valores e padrões de sua própria cultura, considerando-a superior.", "Há uma mistura de elementos de várias culturas formando uma nova identidade.", "Ocorre a perda total da identidade cultural de um povo."],
            correctAnswer: 1,
            explanation: "O etnocentrismo é a visão de mundo onde o próprio grupo é o centro de tudo, levando frequentemente ao preconceito e à discriminação."
          },
          {
            text: "Os Movimentos Sociais contemporâneos (como o movimento feminista, negro, ambientalista) diferenciam-se dos movimentos operários clássicos principalmente por:",
            options: ["Lutarem exclusivamente por melhores salários.", "Buscarem a tomada do poder do Estado através da revolução armada.", "Focarem em questões de identidade, reconhecimento, direitos civis e qualidade de vida, além de questões econômicas.", "Serem liderados apenas por partidos políticos tradicionais."],
            correctAnswer: 2,
            explanation: "Os 'Novos Movimentos Sociais' ampliaram a pauta de reivindicações para além da luta de classes, englobando questões culturais e identitárias."
          },
          {
            text: "O conceito de 'Capital Cultural', desenvolvido por Pierre Bourdieu, refere-se a:",
            options: ["A quantidade de dinheiro investida em obras de arte.", "O conjunto de conhecimentos, habilidades, educação e vantagens culturais que uma pessoa possui e que lhe confere status social.", "O patrimônio histórico e arquitetônico de uma nação.", "A infraestrutura de teatros e museus de uma cidade."],
            correctAnswer: 1,
            explanation: "Bourdieu argumenta que o capital cultural (como o domínio da linguagem culta ou diplomas) é usado pelas elites para manter sua posição de poder e reproduzir as desigualdades."
          }
        ]
      },
      { 
        id: 'fil-3', 
        title: 'Filosofia: Ética e Política', 
        completed: false,
        questions: [
          {
            text: "A 'Ética a Nicômaco', obra de Aristóteles, defende que o objetivo supremo da vida humana e da ação moral é alcançar a:",
            options: ["Riqueza material.", "Salvação da alma.", "Eudaimonia (Felicidade ou realização plena).", "Paz mundial."],
            correctAnswer: 2,
            explanation: "Para Aristóteles, a felicidade (eudaimonia) é o fim último de todas as ações humanas, alcançada através da virtude e da razão."
          },
          {
            text: "Segundo a ética utilitarista de Jeremy Bentham e John Stuart Mill, uma ação é considerada moralmente correta se:",
            options: ["Segue mandamentos divinos inquestionáveis.", "É feita por dever, independentemente das consequências.", "Promove a maior quantidade de felicidade (ou bem-estar) para o maior número de pessoas.", "Beneficia exclusivamente o indivíduo que a pratica."],
            correctAnswer: 2,
            explanation: "O utilitarismo avalia a moralidade de uma ação por suas consequências, buscando maximizar o bem-estar coletivo."
          },
          {
            text: "O conceito de 'Imperativo Categórico', formulado por Immanuel Kant, estabelece que devemos agir de modo que a máxima da nossa ação possa se tornar uma:",
            options: ["Lei universal da natureza.", "Regra flexível dependendo da situação.", "Vantagem pessoal.", "Tradição cultural."],
            correctAnswer: 0,
            explanation: "Kant propõe uma ética deontológica (do dever), onde a ação moral deve ser universalizável, sem exceções."
          },
          {
            text: "Na obra 'O Príncipe', Maquiavel rompe com a tradição política clássica ao afirmar que o governante deve:",
            options: ["Ser sempre bondoso e honesto, mesmo que perca o poder.", "Guiar-se pela ética cristã em todas as suas decisões.", "Agir de acordo com a necessidade para manter o poder e a estabilidade do Estado, separando a moral privada da ação política ('os fins justificam os meios').", "Entregar o poder ao povo em caso de crise."],
            correctAnswer: 2,
            explanation: "Maquiavel funda a ciência política moderna ao separar a ética moral (o que deve ser) da ação política prática (o que é)."
          }
        ]
      },
      { 
        id: 'soc-3', 
        title: 'Sociologia: Trabalho e Desigualdade', 
        completed: false,
        questions: [
          {
            text: "O modelo de produção fordista, característico do século XX, é marcado por:",
            options: ["Trabalho artesanal e alta qualificação do operário.", "Produção em massa, esteira rolante, padronização dos produtos e divisão parcelar do trabalho.", "Flexibilização da produção e terceirização.", "Foco exclusivo na produção de bens imateriais (serviços)."],
            correctAnswer: 1,
            explanation: "O fordismo revolucionou a indústria com a linha de montagem, barateando os custos através da produção em larga escala."
          },
          {
            text: "Em contraposição ao fordismo, o Toyotismo (acumulação flexível) introduziu o conceito de 'Just in Time', que significa:",
            options: ["Produzir o máximo possível para manter grandes estoques.", "Produzir apenas o necessário, no momento exato da demanda, reduzindo estoques e desperdícios.", "Contratar trabalhadores apenas por tempo determinado.", "Aumentar a jornada de trabalho sem remuneração extra."],
            correctAnswer: 1,
            explanation: "O 'Just in Time' é a base da produção enxuta do Toyotismo, adaptando a produção rapidamente às mudanças do mercado."
          },
          {
            text: "A 'Precarização do Trabalho' na sociedade contemporânea está frequentemente associada a:",
            options: ["Aumento da estabilidade no emprego e dos direitos trabalhistas.", "Redução da jornada de trabalho com manutenção do salário.", "Terceirização, trabalho informal, 'uberização' e perda de garantias sociais e trabalhistas.", "Fim do trabalho assalariado no mundo todo."],
            correctAnswer: 2,
            explanation: "A reestruturação produtiva e as novas tecnologias trouxeram formas de trabalho mais flexíveis, porém com menos proteção ao trabalhador."
          },
          {
            text: "O conceito de 'Mais-Valia Relativa', em Marx, ocorre quando o capitalista aumenta seu lucro através da:",
            options: ["Extensão da jornada de trabalho (mais horas trabalhadas).", "Introdução de novas tecnologias e maquinários que aumentam a produtividade do trabalhador no mesmo tempo de trabalho.", "Redução do preço dos produtos no mercado.", "Contratação de mais trabalhadores com o mesmo salário."],
            correctAnswer: 1,
            explanation: "A mais-valia relativa foca na intensificação do trabalho e no aumento da produtividade via tecnologia, sem necessariamente aumentar a jornada."
          }
        ]
      },
      { 
        id: 'his-11', 
        title: 'História do Brasil: Era Vargas e Ditadura', 
        completed: false,
        questions: [
          {
            text: "A Era Vargas (1930-1945) foi marcada pela criação da CLT (Consolidação das Leis do Trabalho). Qual era o principal objetivo de Vargas com essa medida?",
            options: ["Incentivar greves e manifestações operárias.", "Garantir direitos aos trabalhadores, atrelando os sindicatos ao Estado e evitando revoltas sociais (populismo/trabalhismo).", "Privatizar as indústrias de base.", "Acabar com o trabalho assalariado no campo."],
            correctAnswer: 1,
            explanation: "O trabalhismo varguista concedia direitos (férias, salário mínimo) em troca do controle estatal sobre os sindicatos (peleguismo)."
          },
          {
            text: "O Estado Novo (1937-1945) foi um período ditatorial de Getúlio Vargas. Uma de suas principais características foi:",
            options: ["A descentralização do poder para os estados.", "A criação de vários partidos políticos.", "A censura aos meios de comunicação através do DIP (Departamento de Imprensa e Propaganda).", "A aliança incondicional com a União Soviética."],
            correctAnswer: 2,
            explanation: "O DIP controlava a informação, censurava opositores e promovia a propaganda oficial do governo Vargas."
          },
          {
            text: "O Golpe Militar de 1964 no Brasil foi justificado pelos militares sob qual pretexto?",
            options: ["A necessidade de implantar o comunismo no país.", "A ameaça comunista e a necessidade de restaurar a ordem e a segurança nacional no contexto da Guerra Fria.", "O desejo de devolver o poder a Dom Pedro II.", "A exigência de eleições diretas imediatas."],
            correctAnswer: 1,
            explanation: "A Doutrina de Segurança Nacional, apoiada pelos EUA, via nos movimentos sociais e no governo Jango uma ameaça comunista."
          },
          {
            text: "O AI-5 (Ato Institucional nº 5), decretado em 1968 durante a Ditadura Militar, resultou em:",
            options: ["Abertura política e anistia ampla.", "Fim da censura prévia.", "Fechamento do Congresso, suspensão do habeas corpus para crimes políticos e endurecimento da repressão.", "Convocação de eleições diretas para presidente."],
            correctAnswer: 2,
            explanation: "O AI-5 marcou o período mais duro da ditadura ('Anos de Chumbo'), institucionalizando a repressão e a tortura."
          }
        ]
      },
      { 
        id: 'geo-5', 
        title: 'Geografia Física: Clima e Relevo', 
        completed: false,
        questions: [
          {
            text: "O clima predominante na maior parte do território brasileiro, caracterizado por duas estações bem definidas (verão chuvoso e inverno seco), é o:",
            options: ["Equatorial", "Tropical", "Semiárido", "Subtropical"],
            correctAnswer: 1,
            explanation: "O clima Tropical abrange grande parte do Centro-Oeste, Sudeste e Nordeste, com chuvas concentradas no verão."
          },
          {
            text: "O fenômeno 'El Niño' causa qual alteração climática principal no Brasil?",
            options: ["Secas severas no Sul e chuvas intensas no Nordeste.", "Secas severas no Nordeste e chuvas intensas na região Sul.", "Frio extremo na Amazônia.", "Aumento do nível do mar no litoral paulista."],
            correctAnswer: 1,
            explanation: "O aquecimento das águas do Pacífico (El Niño) altera os ventos, causando secas no Norte/Nordeste e chuvas no Sul do Brasil."
          },
          {
            text: "O relevo brasileiro é caracterizado por:",
            options: ["Grandes cadeias montanhosas recentes (dobramentos modernos).", "Predomínio de planaltos e depressões, com altitudes modestas devido ao desgaste erosivo antigo.", "Exclusividade de planícies litorâneas.", "Formação vulcânica ativa em todo o território."],
            correctAnswer: 1,
            explanation: "O Brasil está no centro de uma placa tectônica, tendo um relevo antigo e muito desgastado pela erosão."
          },
          {
            text: "A Caatinga, bioma exclusivamente brasileiro, está associada a qual tipo de clima?",
            options: ["Equatorial úmido", "Tropical de altitude", "Semiárido", "Subtropical"],
            correctAnswer: 2,
            explanation: "A Caatinga é adaptada à escassez de chuvas e altas temperaturas do clima semiárido do sertão nordestino."
          }
        ]
      }
    ],
  },
  {
    id: 'bio',
    name: 'Ciências da Natureza',
    icon: 'FlaskConical',
    color: 'bg-green-500',
    topics: [
      { 
        id: 'bio-1', 
        title: 'Citologia e Bioquímica Celular', 
        completed: false,
        questions: [
          {
            text: "Qual organela celular é responsável pela produção de energia (ATP) através da respiração celular?",
            options: ["Ribossomo", "Lisossomo", "Mitocôndria", "Complexo de Golgi", "Retículo Endoplasmático"],
            correctAnswer: 2,
            explanation: "As mitocôndrias são as 'usinas' da célula, onde ocorre a respiração celular aeróbica para produção de ATP."
          },
          {
            text: "A membrana plasmática é composta principalmente por uma bicamada de:",
            options: ["Carboidratos e proteínas.", "Fosfolipídios e proteínas.", "Ácidos nucleicos e lipídios.", "Celulose e colesterol."],
            correctAnswer: 1,
            explanation: "A estrutura da membrana é descrita pelo modelo do mosaico fluido, formada por uma dupla camada de fosfolipídios com proteínas inseridas."
          },
          {
            text: "Qual a principal função dos ribossomos na célula?",
            options: ["Digestão intracelular.", "Síntese de proteínas.", "Armazenamento de água.", "Fotossíntese."],
            correctAnswer: 1,
            explanation: "Os ribossomos leem o RNA mensageiro e unem os aminoácidos para formar as proteínas."
          },
          {
            text: "O processo de transporte ativo através da membrana celular caracteriza-se por:",
            options: ["Ocorrer a favor do gradiente de concentração, sem gasto de energia.", "Ocorrer contra o gradiente de concentração, com gasto de energia (ATP).", "Ser exclusivo para a passagem de água (osmose).", "Envolver apenas moléculas lipossolúveis."],
            correctAnswer: 1,
            explanation: "No transporte ativo (ex: bomba de sódio e potássio), a célula gasta energia para mover substâncias de onde estão menos concentradas para onde estão mais concentradas."
          }
        ]
      },
      { 
        id: 'bio-2', 
        title: 'Genética, DNA e Biotecnologia', 
        completed: false,
        questions: [
          {
            text: "No processo de duplicação do DNA, qual a base nitrogenada que sempre se emparelha com a Citosina?",
            options: ["Adenina", "Timina", "Guanina", "Uracila", "Fosfato"],
            correctAnswer: 2,
            explanation: "No DNA, a Guanina sempre se emparelha com a Citosina (G-C) e a Adenina com a Timina (A-T)."
          },
          {
            text: "A técnica do DNA recombinante (engenharia genética) permite:",
            options: ["Apenas a clonagem de animais inteiros.", "A inserção de genes de uma espécie no genoma de outra, criando organismos transgênicos.", "A cura de todas as doenças genéticas humanas.", "A identificação de paternidade por meio de impressões digitais."],
            correctAnswer: 1,
            explanation: "Esta técnica permite transferir genes de interesse (ex: gene da insulina humana) para bactérias ou plantas, criando transgênicos."
          },
          {
            text: "Na genética mendeliana, um indivíduo heterozigoto para uma característica (Aa) cruzado com um homozigoto recessivo (aa) produzirá descendentes na proporção fenotípica de:",
            options: ["100% dominantes.", "75% dominantes e 25% recessivos.", "50% dominantes e 50% recessivos.", "100% recessivos."],
            correctAnswer: 2,
            explanation: "O cruzamento Aa x aa resulta em 50% Aa (fenótipo dominante) e 50% aa (fenótipo recessivo)."
          },
          {
            text: "O RNA mensageiro (RNAm) difere do DNA por possuir:",
            options: ["Fita dupla e a base Timina.", "Fita simples e a base Uracila no lugar da Timina.", "O açúcar desoxirribose.", "A capacidade de se autoduplicar."],
            correctAnswer: 1,
            explanation: "O RNA é geralmente de fita simples, possui o açúcar ribose e a base nitrogenada Uracila (U) substitui a Timina (T)."
          }
        ]
      },
      { 
        id: 'bio-3', 
        title: 'Evolução e Origem da Vida', 
        completed: false,
        questions: [
          {
            text: "A teoria da evolução por seleção natural foi proposta por:",
            options: ["Lamarck", "Charles Darwin", "Mendel", "Pasteur"],
            correctAnswer: 1,
            explanation: "Darwin propôs que os indivíduos mais aptos ao ambiente têm maior probabilidade de sobreviver e se reproduzir."
          },
          {
            text: "A teoria de Lamarck (Lamarckismo) baseava-se em duas leis principais:",
            options: ["Seleção natural e mutação.", "Uso e desuso, e transmissão dos caracteres adquiridos.", "Deriva genética e fluxo gênico.", "Criacionismo e fixismo."],
            correctAnswer: 1,
            explanation: "Lamarck acreditava que o uso desenvolvia um órgão (e o desuso o atrofiava) e que essas mudanças eram passadas aos descendentes (o que hoje sabemos estar incorreto)."
          },
          {
            text: "Órgãos homólogos, como a asa de um morcego e a nadadeira de uma baleia, indicam:",
            options: ["Evolução convergente, sem parentesco evolutivo.", "Ancestralidade comum, tendo a mesma origem embrionária, mas podendo ter funções diferentes.", "Que ambos os animais pertencem à mesma espécie.", "Que a evolução parou nesses grupos."],
            correctAnswer: 1,
            explanation: "A homologia é uma forte evidência da evolução a partir de um ancestral comum (irradiação adaptativa)."
          },
          {
            text: "A teoria endossimbiótica explica a origem de quais organelas celulares?",
            options: ["Núcleo e ribossomos.", "Complexo de Golgi e lisossomos.", "Mitocôndrias e cloroplastos.", "Retículo endoplasmático liso e rugoso."],
            correctAnswer: 2,
            explanation: "A teoria propõe que mitocôndrias e cloroplastos evoluíram de bactérias primitivas que foram englobadas por células eucarióticas ancestrais."
          }
        ]
      },
      { 
        id: 'bio-4', 
        title: 'Ecologia e Ciclos Biogeoquímicos', 
        completed: false,
        questions: [
          {
            text: "O processo pelo qual as plantas transformam energia solar em energia química é a:",
            options: ["Respiração", "Fermentação", "Fotossíntese", "Quimiossíntese"],
            correctAnswer: 2,
            explanation: "A fotossíntese utiliza luz, CO2 e água para produzir glicose e oxigênio."
          }
        ]
      },
      { 
        id: 'bio-5', 
        title: 'Fisiologia Humana e Saúde', 
        completed: false,
        questions: [
          {
            text: "Qual o principal órgão do sistema excretor humano, responsável por filtrar o sangue?",
            options: ["Fígado", "Pâncreas", "Rim", "Bexiga"],
            correctAnswer: 2,
            explanation: "Os rins filtram o sangue, removendo excretas nitrogenadas e formando a urina."
          }
        ]
      },
      { 
        id: 'bio-6', 
        title: 'Botânica e Zoologia', 
        completed: false,
        questions: [
          {
            text: "As plantas que possuem sementes nuas (sem frutos) são as:",
            options: ["Briófitas", "Pteridófitas", "Gimnospermas", "Angiospermas"],
            correctAnswer: 2,
            explanation: "Gimnospermas (como o pinheiro) possuem sementes, mas não produzem flores nem frutos."
          }
        ]
      },
      { 
        id: 'fis-1', 
        title: 'Física: Cinemática e Dinâmica', 
        completed: false,
        questions: [
          {
            text: "Um carro percorre 100 km em 2 horas. Qual a sua velocidade média?",
            options: ["25 km/h", "50 km/h", "100 km/h", "200 km/h"],
            correctAnswer: 1,
            explanation: "Vm = d / t = 100 / 2 = 50 km/h."
          },
          {
            text: "De acordo com a 1ª Lei de Newton (Inércia), um corpo em movimento retilíneo uniforme (MRU):",
            options: ["Tende a parar naturalmente devido à gravidade.", "Necessita de uma força constante para manter seu movimento.", "Tende a manter seu estado de MRU a menos que uma força resultante atue sobre ele.", "Acelera constantemente."],
            correctAnswer: 2,
            explanation: "A inércia é a tendência dos corpos de manterem seu estado de repouso ou de movimento retilíneo uniforme."
          },
          {
            text: "Se a força resultante sobre um corpo de 5 kg é de 20 N, qual a sua aceleração? (Considere a 2ª Lei de Newton: F = m.a)",
            options: ["4 m/s²", "15 m/s²", "25 m/s²", "100 m/s²"],
            correctAnswer: 0,
            explanation: "a = F / m = 20 / 5 = 4 m/s²."
          },
          {
            text: "A 3ª Lei de Newton (Ação e Reação) afirma que para toda força de ação existe uma força de reação. Essas forças:",
            options: ["Atuam no mesmo corpo e se anulam.", "Atuam em corpos diferentes e, portanto, não se anulam.", "Têm a mesma direção e o mesmo sentido.", "Têm intensidades diferentes, dependendo da massa dos corpos."],
            correctAnswer: 1,
            explanation: "As forças de ação e reação têm mesma intensidade, mesma direção, sentidos opostos, mas atuam em corpos distintos."
          }
        ]
      },
      { 
        id: 'fis-2', 
        title: 'Física: Energia, Trabalho e Potência', 
        completed: false,
        questions: [
          {
            text: "A energia associada ao movimento de um corpo é a energia:",
            options: ["Potencial Gravitacional", "Cinética", "Térmica", "Química"],
            correctAnswer: 1,
            explanation: "Energia Cinética = (m * v²) / 2."
          },
          {
            text: "A energia potencial gravitacional de um objeto próximo à superfície da Terra depende de quais grandezas?",
            options: ["Massa e velocidade.", "Massa, gravidade e altura.", "Força e deslocamento.", "Pressão e volume."],
            correctAnswer: 1,
            explanation: "Epg = m * g * h, onde m é massa, g é a aceleração da gravidade e h é a altura."
          },
          {
            text: "O Princípio da Conservação da Energia Mecânica afirma que, em um sistema conservativo (sem atrito):",
            options: ["A energia cinética é sempre igual à energia potencial.", "A soma da energia cinética e potencial permanece constante.", "A energia mecânica total diminui com o tempo.", "A energia térmica é convertida integralmente em trabalho."],
            correctAnswer: 1,
            explanation: "Em sistemas sem forças dissipativas, a energia mecânica (Ec + Ep) se conserva, transformando-se de uma forma para outra."
          },
          {
            text: "Potência é definida como:",
            options: ["A força aplicada sobre uma área.", "A capacidade de realizar trabalho.", "A rapidez com que um trabalho é realizado (energia transferida por unidade de tempo).", "A resistência ao movimento."],
            correctAnswer: 2,
            explanation: "Potência (P) = Trabalho (W) / tempo (t). No SI, a unidade é o Watt (J/s)."
          }
        ]
      },
      { 
        id: 'fis-3', 
        title: 'Física: Termologia e Termodinâmica', 
        completed: false,
        questions: [
          {
            text: "O processo de transferência de calor que ocorre no vácuo é a:",
            options: ["Condução", "Convecção", "Irradiação", "Dilatação"],
            correctAnswer: 2,
            explanation: "A irradiação ocorre através de ondas eletromagnéticas e não necessita de meio material."
          },
          {
            text: "O calor é definido na Física como:",
            options: ["A temperatura de um corpo.", "A energia térmica em trânsito entre corpos devido a uma diferença de temperatura.", "A energia interna total de um sistema.", "A medida da agitação molecular de um corpo."],
            correctAnswer: 1,
            explanation: "Calor não é algo que um corpo 'possui', mas sim energia que flui do corpo mais quente para o mais frio."
          },
          {
            text: "A Primeira Lei da Termodinâmica é uma aplicação do princípio da:",
            options: ["Conservação da Massa.", "Conservação da Quantidade de Movimento.", "Conservação da Energia.", "Ação e Reação."],
            correctAnswer: 2,
            explanation: "A lei estabelece que a variação da energia interna de um sistema é igual ao calor recebido menos o trabalho realizado (ΔU = Q - W)."
          },
          {
            text: "A Segunda Lei da Termodinâmica estabelece que:",
            options: ["É possível construir uma máquina térmica com 100% de rendimento.", "O calor flui espontaneamente do corpo mais frio para o mais quente.", "A entropia (desordem) de um sistema isolado tende a aumentar, e nenhuma máquina térmica tem rendimento de 100%.", "A energia não pode ser criada nem destruída."],
            correctAnswer: 2,
            explanation: "Esta lei impõe limites à conversão de calor em trabalho, indicando que sempre haverá perda de energia (calor rejeitado para a fonte fria)."
          }
        ]
      },
      { 
        id: 'fis-4', 
        title: 'Física: Óptica e Ondulatória', 
        completed: false,
        questions: [
          {
            text: "O fenômeno pelo qual a luz muda de direção ao passar de um meio para outro é a:",
            options: ["Reflexão", "Refração", "Difração", "Interferência"],
            correctAnswer: 1,
            explanation: "A refração ocorre devido à mudança na velocidade da luz entre meios diferentes."
          },
          {
            text: "O som é uma onda mecânica longitudinal. Isso significa que ele:",
            options: ["Pode se propagar no vácuo.", "Propaga-se através de campos elétricos e magnéticos.", "Necessita de um meio material para se propagar e a vibração ocorre na mesma direção da propagação.", "É uma onda transversal, como a luz."],
            correctAnswer: 2,
            explanation: "Diferente da luz (onda eletromagnética transversal), o som precisa de matéria (ar, água, sólidos) para viajar através de compressões e rarefações."
          },
          {
            text: "O fenômeno da difração, que permite às ondas contornarem obstáculos, é mais perceptível quando:",
            options: ["O obstáculo é muito maior que o comprimento de onda.", "O obstáculo tem tamanho da mesma ordem de grandeza do comprimento de onda.", "A onda tem alta frequência e baixo comprimento de onda.", "A onda se propaga no vácuo."],
            correctAnswer: 1,
            explanation: "A difração é evidente quando a fenda ou obstáculo tem dimensões comparáveis ao comprimento da onda incidente."
          },
          {
            text: "Na visão humana, a miopia é corrigida com o uso de lentes:",
            options: ["Convergentes", "Divergentes", "Cilíndricas", "Bifocais"],
            correctAnswer: 1,
            explanation: "Na miopia, a imagem se forma antes da retina. Lentes divergentes espalham os raios de luz, empurrando a formação da imagem para a retina."
          }
        ]
      },
      { 
        id: 'fis-5', 
        title: 'Física: Eletricidade e Magnetismo', 
        completed: false,
        questions: [
          {
            text: "Qual a unidade de medida da resistência elétrica no SI?",
            options: ["Ampere", "Volt", "Ohm", "Watt"],
            correctAnswer: 2,
            explanation: "A resistência elétrica é medida em Ohms (Ω)."
          },
          {
            text: "A Primeira Lei de Ohm estabelece a relação entre tensão (V), corrente (I) e resistência (R) como:",
            options: ["V = R / I", "I = V * R", "V = R * I", "R = V * I"],
            correctAnswer: 2,
            explanation: "A diferença de potencial (tensão) é proporcional à corrente elétrica, sendo a resistência a constante de proporcionalidade (U = R.i)."
          },
          {
            text: "Em um circuito com resistores ligados em série, o que é igual para todos os resistores?",
            options: ["A tensão (diferença de potencial).", "A corrente elétrica.", "A potência dissipada.", "A resistência equivalente."],
            correctAnswer: 1,
            explanation: "Na associação em série, há apenas um caminho para os elétrons, logo a corrente elétrica (I) é a mesma em todos os componentes."
          },
          {
            text: "O fenômeno da indução eletromagnética (Lei de Faraday) é o princípio de funcionamento de:",
            options: ["Pilhas e baterias.", "Lâmpadas incandescentes.", "Geradores elétricos e transformadores.", "Capacitores."],
            correctAnswer: 2,
            explanation: "A variação do fluxo magnético através de uma espira induz uma corrente elétrica, princípio usado em usinas hidrelétricas e eólicas."
          }
        ]
      },
      { 
        id: 'qui-1', 
        title: 'Química: Estrutura Atômica e Tabela', 
        completed: false,
        questions: [
          {
            text: "Qual a partícula subatômica com carga positiva localizada no núcleo?",
            options: ["Elétron", "Nêutron", "Próton", "Pósitron"],
            correctAnswer: 2,
            explanation: "Os prótons têm carga positiva, os elétrons negativa e os nêutrons são neutros."
          },
          {
            text: "O modelo atômico de Rutherford, conhecido como 'modelo planetário', concluiu que o átomo:",
            options: ["É uma esfera maciça e indivisível.", "Possui elétrons incrustados em uma massa positiva (pudim de passas).", "Possui um núcleo pequeno, denso e positivo, rodeado por uma eletrosfera onde orbitam os elétrons.", "Tem elétrons orbitando em níveis de energia quantizados."],
            correctAnswer: 2,
            explanation: "Através do experimento com a lâmina de ouro, Rutherford descobriu o núcleo atômico e o grande espaço vazio da eletrosfera."
          },
          {
            text: "Na Tabela Periódica moderna, os elementos são organizados em ordem crescente de:",
            options: ["Massa atômica.", "Número atômico (número de prótons).", "Número de nêutrons.", "Eletronegatividade."],
            correctAnswer: 1,
            explanation: "A lei periódica atual (Moseley) estabelece que as propriedades dos elementos são funções periódicas de seus números atômicos."
          },
          {
            text: "Qual propriedade periódica indica a tendência de um átomo em atrair elétrons em uma ligação química?",
            options: ["Raio atômico.", "Energia de ionização.", "Eletroafinidade.", "Eletronegatividade."],
            correctAnswer: 3,
            explanation: "O Flúor (F) é o elemento mais eletronegativo da tabela, atraindo fortemente os elétrons nas ligações."
          }
        ]
      },
      { 
        id: 'qui-2', 
        title: 'Química: Ligações e Funções Inorgânicas', 
        completed: false,
        questions: [
          {
            text: "Qual o pH de uma solução neutra a 25°C?",
            options: ["0", "7", "14", "1"],
            correctAnswer: 1,
            explanation: "pH 7 é neutro, abaixo de 7 é ácido e acima de 7 é básico."
          },
          {
            text: "A ligação iônica ocorre tipicamente entre:",
            options: ["Dois ametais, com compartilhamento de elétrons.", "Um metal e um ametal, com transferência definitiva de elétrons.", "Dois metais, formando um 'mar de elétrons'.", "Gases nobres."],
            correctAnswer: 1,
            explanation: "O metal (eletropositivo) doa elétrons para o ametal (eletronegativo), formando cátions e ânions que se atraem (ex: NaCl)."
          },
          {
            text: "Segundo a teoria de Arrhenius, ácidos são substâncias que, em solução aquosa, liberam como único cátion o íon:",
            options: ["OH- (Hidroxila)", "Na+ (Sódio)", "H+ (ou H3O+)", "Cl- (Cloreto)"],
            correctAnswer: 2,
            explanation: "Ácidos sofrem ionização em água liberando íons H+ (ex: HCl -> H+ + Cl-)."
          },
          {
            text: "A reação entre um ácido e uma base produz:",
            options: ["Apenas água.", "Sal e água (reação de neutralização).", "Gás hidrogênio e um óxido.", "Dois novos ácidos."],
            correctAnswer: 1,
            explanation: "Na neutralização, o H+ do ácido reage com o OH- da base formando água, e o ânion do ácido com o cátion da base formam o sal."
          }
        ]
      },
      { 
        id: 'qui-3', 
        title: 'Química: Estequiometria e Soluções', 
        completed: false,
        questions: [
          {
            text: "Uma solução que contém a quantidade máxima de soluto que pode ser dissolvida é chamada de:",
            options: ["Insaturada", "Saturada", "Supersaturada", "Diluída"],
            correctAnswer: 1,
            explanation: "A solução saturada atingiu o limite de solubilidade do soluto no solvente."
          },
          {
            text: "A Lei de Lavoisier (Conservação das Massas) afirma que, em uma reação química em sistema fechado:",
            options: ["A massa dos reagentes é sempre maior que a dos produtos.", "A massa total permanece constante.", "O volume total permanece constante.", "A energia total aumenta."],
            correctAnswer: 1,
            explanation: "'Na natureza nada se cria, nada se perde, tudo se transforma'. A massa dos reagentes é igual à massa dos produtos."
          },
          {
            text: "Um mol de qualquer substância contém aproximadamente quantas entidades elementares (Constante de Avogadro)?",
            options: ["6,02 x 10^23", "3,14 x 10^15", "1,0 x 10^-14", "9,8 m/s²"],
            correctAnswer: 0,
            explanation: "O mol é a unidade de quantidade de matéria no SI, equivalendo a 6,02 x 10^23 átomos, moléculas, íons, etc."
          },
          {
            text: "A concentração molar (molaridade) de uma solução é expressa na unidade:",
            options: ["Gramas por litro (g/L).", "Mol por litro (mol/L).", "Porcentagem em massa (%).", "Partes por milhão (ppm)."],
            correctAnswer: 1,
            explanation: "A molaridade relaciona a quantidade de matéria do soluto (em mol) com o volume da solução (em litros)."
          }
        ]
      },
      { 
        id: 'qui-4', 
        title: 'Química: Termoquímica e Cinética', 
        completed: false,
        questions: [
          {
            text: "Uma reação que libera calor para o ambiente é classificada como:",
            options: ["Endotérmica", "Exotérmica", "Isotérmica", "Adiabática"],
            correctAnswer: 1,
            explanation: "Reações exotérmicas liberam energia (ΔH < 0)."
          },
          {
            text: "A variação de entalpia (ΔH) de uma reação endotérmica é:",
            options: ["Negativa (ΔH < 0)", "Positiva (ΔH > 0)", "Igual a zero (ΔH = 0)", "Infinita"],
            correctAnswer: 1,
            explanation: "Em reações endotérmicas, os produtos têm mais energia que os reagentes, pois absorveram calor do meio."
          },
          {
            text: "Qual dos fatores abaixo NÃO aumenta a velocidade de uma reação química?",
            options: ["Aumento da temperatura.", "Aumento da superfície de contato dos reagentes.", "Adição de um catalisador.", "Diminuição da concentração dos reagentes."],
            correctAnswer: 3,
            explanation: "Diminuir a concentração reduz o número de colisões efetivas entre as moléculas, diminuindo a velocidade da reação."
          },
          {
            text: "A função de um catalisador em uma reação química é:",
            options: ["Aumentar a energia de ativação.", "Diminuir a energia de ativação, acelerando a reação sem ser consumido.", "Deslocar o equilíbrio químico para a formação de produtos.", "Aumentar a quantidade de produtos formados."],
            correctAnswer: 1,
            explanation: "O catalisador oferece um caminho alternativo para a reação com menor energia de ativação, tornando-a mais rápida."
          }
        ]
      },
      { 
        id: 'qui-5', 
        title: 'Química: Equilíbrio Químico e pH', 
        completed: false,
        questions: [
          {
            text: "O princípio que afirma que um sistema em equilíbrio tende a minimizar perturbações externas é o de:",
            options: ["Le Chatelier", "Pauli", "Heisenberg", "Avogadro"],
            correctAnswer: 0,
            explanation: "O Princípio de Le Chatelier explica como o equilíbrio se desloca sob pressão, temperatura ou concentração."
          },
          {
            text: "Em um equilíbrio químico, se aumentarmos a concentração dos reagentes, o equilíbrio se deslocará para:",
            options: ["A esquerda (formação de mais reagentes).", "A direita (formação de mais produtos).", "Não haverá deslocamento.", "O sistema deixará de reagir."],
            correctAnswer: 1,
            explanation: "Segundo Le Chatelier, o sistema tentará consumir o excesso de reagentes, deslocando-se para a direita (produtos)."
          },
          {
            text: "Se o pH de uma solução aquosa é 3, qual é o seu pOH? (Considere Kw = 10^-14 a 25°C)",
            options: ["3", "7", "11", "14"],
            correctAnswer: 2,
            explanation: "A soma do pH e do pOH é sempre 14 a 25°C. Portanto, 14 - 3 = 11."
          },
          {
            text: "Uma solução tampão tem a propriedade de:",
            options: ["Mudar de cor na presença de ácidos ou bases.", "Neutralizar completamente qualquer ácido forte adicionado.", "Resistir a grandes variações de pH quando pequenas quantidades de ácido ou base são adicionadas.", "Acelerar reações químicas em meio aquoso."],
            correctAnswer: 2,
            explanation: "Tampões (como o sangue humano) mantêm o pH relativamente constante, sendo formados por um ácido fraco e seu sal, ou base fraca e seu sal."
          }
        ]
      },
      { 
        id: 'qui-6', 
        title: 'Química Orgânica: Funções e Reações', 
        completed: false,
        questions: [
          {
            text: "Qual o nome da função orgânica caracterizada pelo grupo hidroxila (-OH) ligado a um carbono saturado?",
            options: ["Aldeído", "Cetona", "Álcool", "Éter"],
            correctAnswer: 2,
            explanation: "Álcoois possuem o grupo funcional hidroxila."
          },
          {
            text: "Os hidrocarbonetos são compostos orgânicos formados exclusivamente por:",
            options: ["Carbono e Oxigênio.", "Carbono e Hidrogênio.", "Carbono, Hidrogênio e Nitrogênio.", "Apenas Carbono."],
            correctAnswer: 1,
            explanation: "Como o nome sugere, hidrocarbonetos (como alcanos, alcenos e alcinos) contêm apenas C e H (ex: metano, CH4)."
          },
          {
            text: "A função orgânica presente nos vinagres, responsável pelo seu sabor azedo, é o:",
            options: ["Álcool (Etanol).", "Cetona (Propanona).", "Ácido Carboxílico (Ácido acético/etanoico).", "Éster (Etanoato de etila)."],
            correctAnswer: 2,
            explanation: "O ácido acético é um ácido carboxílico, caracterizado pelo grupo carboxila (-COOH)."
          },
          {
            text: "A reação de saponificação, usada para fabricar sabão, ocorre entre:",
            options: ["Um ácido carboxílico e um álcool.", "Um éster (triglicerídeo/gordura) e uma base forte (NaOH ou KOH).", "Um hidrocarboneto e oxigênio (combustão).", "Dois aminoácidos."],
            correctAnswer: 1,
            explanation: "A hidrólise alcalina de óleos ou gorduras produz sabão (sal de ácido graxo) e glicerol."
          }
        ]
      },
      { 
        id: 'bio-7', 
        title: 'Ecologia: Relações Ecológicas', 
        completed: false,
        questions: [
          {
            text: "O mutualismo é uma relação ecológica caracterizada por:",
            options: ["Benefício para uma espécie e prejuízo para a outra.", "Benefício mútuo obrigatório para a sobrevivência de ambas as espécies.", "Benefício para uma espécie sem afetar a outra.", "Competição por recursos limitados."],
            correctAnswer: 1,
            explanation: "No mutualismo (+/+), ambas as espécies se beneficiam e a relação é essencial para a sobrevivência (ex: líquens, cupins e protozoários)."
          },
          {
            text: "A relação entre o carrapato e o cachorro é um exemplo de:",
            options: ["Comensalismo", "Amensalismo", "Parasitismo", "Predatismo"],
            correctAnswer: 2,
            explanation: "O carrapato (parasita) se beneficia retirando nutrientes do cachorro (hospedeiro), causando-lhe prejuízo (+/-)."
          },
          {
            text: "As orquídeas e bromélias que vivem sobre os troncos de árvores, usando-as apenas como suporte para obter mais luz, estabelecem uma relação de:",
            options: ["Inquilinismo (Epifitismo)", "Parasitismo", "Mutualismo", "Competição interespecífica"],
            correctAnswer: 0,
            explanation: "No inquilinismo (+/0), uma espécie se beneficia (suporte) sem prejudicar ou beneficiar a árvore hospedeira."
          },
          {
            text: "Quando leões e hienas disputam a mesma presa na savana africana, ocorre:",
            options: ["Predatismo", "Competição interespecífica", "Amensalismo", "Comensalismo"],
            correctAnswer: 1,
            explanation: "A competição interespecífica (-/-) ocorre quando espécies diferentes disputam os mesmos recursos (alimento, água, território)."
          }
        ]
      },
      { 
        id: 'fis-6', 
        title: 'Física: Eletrodinâmica e Circuitos', 
        completed: false,
        questions: [
          {
            text: "A Primeira Lei de Ohm estabelece que a diferença de potencial (U) em um resistor ôhmico é:",
            options: ["Inversamente proporcional à corrente elétrica (i).", "Diretamente proporcional à corrente elétrica (i), sendo U = R * i.", "Igual ao quadrado da corrente elétrica.", "Independente da resistência elétrica (R)."],
            correctAnswer: 1,
            explanation: "A fórmula U = R * i mostra que a tensão é diretamente proporcional à corrente, sendo a resistência (R) a constante de proporcionalidade."
          },
          {
            text: "Em um circuito com resistores associados em SÉRIE, é correto afirmar que:",
            options: ["A tensão (ddp) é a mesma em todos os resistores.", "A corrente elétrica (i) é a mesma em todos os resistores.", "A resistência equivalente é menor que a menor das resistências.", "Se um resistor queimar, os outros continuam funcionando normalmente."],
            correctAnswer: 1,
            explanation: "Na associação em série, há apenas um caminho para os elétrons, logo a corrente é a mesma em todos os componentes."
          },
          {
            text: "Em uma residência, os aparelhos elétricos (geladeira, TV, lâmpadas) são ligados em:",
            options: ["Série, para economizar energia.", "Paralelo, para que todos funcionem com a mesma tensão (ex: 110V ou 220V) e de forma independente.", "Série, para aumentar a resistência total do circuito.", "Paralelo, para que a corrente seja a mesma em todos os aparelhos."],
            correctAnswer: 1,
            explanation: "A ligação em paralelo garante a mesma tensão para todos os aparelhos e permite que funcionem independentemente (se uma lâmpada queima, as outras não apagam)."
          },
          {
            text: "A potência elétrica (P) dissipada por um resistor pode ser calculada pela fórmula:",
            options: ["P = U / i", "P = R * i", "P = U * i (ou P = R * i²)", "P = U² / i"],
            correctAnswer: 2,
            explanation: "A potência elétrica é o produto da tensão pela corrente (P = U * i). Substituindo U = R*i, temos P = R * i²."
          }
        ]
      },
      { 
        id: 'qui-7', 
        title: 'Química: Eletroquímica (Pilhas e Eletrólise)', 
        completed: false,
        questions: [
          {
            text: "Em uma pilha galvânica (como a pilha de Daniell), o polo negativo onde ocorre a oxidação é chamado de:",
            options: ["Cátodo", "Ânodo", "Ponte salina", "Eletrólito"],
            correctAnswer: 1,
            explanation: "Macete: 'CRAO' (Cátodo Reduz, Ânodo Oxida). Na pilha, o ânodo é o polo negativo (fornece elétrons)."
          },
          {
            text: "Qual a principal diferença entre uma Pilha e a Eletrólise?",
            options: ["A pilha é um processo espontâneo que gera energia elétrica; a eletrólise é um processo não espontâneo que consome energia elétrica.", "A pilha consome energia elétrica; a eletrólise gera energia elétrica.", "Ambas são processos espontâneos.", "Na pilha ocorre apenas redução; na eletrólise ocorre apenas oxidação."],
            correctAnswer: 0,
            explanation: "A pilha converte energia química em elétrica (espontânea, ddp > 0). A eletrólise converte energia elétrica em química (forçada, ddp < 0)."
          },
          {
            text: "Na eletrólise ígnea do cloreto de sódio (NaCl fundido), o que é produzido no cátodo (polo negativo)?",
            options: ["Gás Cloro (Cl2)", "Sódio metálico (Na)", "Gás Oxigênio (O2)", "Gás Hidrogênio (H2)"],
            correctAnswer: 1,
            explanation: "Os cátions Na+ migram para o cátodo (polo negativo) onde sofrem redução, formando sódio metálico (Na+ + e- -> Na)."
          },
          {
            text: "O processo de revestir uma peça de metal com outro metal mais nobre (como cromagem ou niquelação) para evitar corrosão é chamado de:",
            options: ["Galvanoplastia (um tipo de eletrólise).", "Saponificação.", "Destilação fracionada.", "Craqueamento."],
            correctAnswer: 0,
            explanation: "A galvanoplastia usa a eletrólise aquosa para depositar uma fina camada de metal sobre uma superfície condutora."
          }
        ]
      }
    ],
  },
  {
    id: 'red',
    name: 'Redação',
    icon: 'PenTool',
    color: 'bg-purple-500',
    topics: [
      { 
        id: 'red-1', 
        title: 'Estrutura Dissertativo-Argumentativa', 
        completed: false,
        questions: [
          {
            text: "A estrutura básica da redação do ENEM deve conter:",
            options: ["Introdução, Desenvolvimento e Conclusão", "Apenas Introdução e Desenvolvimento", "Apenas Desenvolvimento e Conclusão", "Introdução e Conclusão apenas"],
            correctAnswer: 0,
            explanation: "A redação do ENEM exige uma estrutura tripartida: apresentação do tema/tese, argumentação e proposta de intervenção."
          },
          {
            text: "O que é a 'Tese' em uma redação dissertativo-argumentativa?",
            options: ["Um resumo dos textos motivadores.", "A opinião central ou o ponto de vista que o autor vai defender ao longo do texto.", "A proposta de intervenção detalhada.", "Uma citação filosófica obrigatória na introdução."],
            correctAnswer: 1,
            explanation: "A tese é a ideia principal do texto, a posição do autor sobre o tema proposto, que será sustentada pelos argumentos."
          },
          {
            text: "Qual a função principal dos parágrafos de desenvolvimento?",
            options: ["Apresentar o tema ao leitor.", "Criar uma solução para o problema.", "Comprovar e aprofundar a tese através de argumentos consistentes e repertório.", "Apresentar uma narrativa fictícia para ilustrar o problema."],
            correctAnswer: 2,
            explanation: "O desenvolvimento é o 'corpo' do texto, onde o autor deve convencer o leitor da validade de sua tese usando fatos, exemplos e lógica."
          },
          {
            text: "Em relação ao título na redação do ENEM, é correto afirmar que:",
            options: ["É obrigatório e avaliado na Competência 1.", "É opcional, e sua ausência não penaliza a nota.", "Deve ser sempre uma pergunta.", "Deve ser escrito em letras maiúsculas e sublinhado."],
            correctAnswer: 1,
            explanation: "O título na redação do ENEM é um elemento opcional. A maioria dos candidatos opta por não colocar para ganhar uma linha a mais para o texto."
          }
        ]
      },
      { 
        id: 'red-2', 
        title: 'Competência 1: Norma Culta', 
        completed: false,
        questions: [
          {
            text: "A Competência 1 avalia o domínio da modalidade escrita formal da língua portuguesa. Qual erro abaixo penaliza esta competência?",
            options: ["Falta de argumentos", "Uso de gírias e marcas de oralidade", "Proposta de intervenção incompleta", "Fuga ao tema"],
            correctAnswer: 1,
            explanation: "Marcas de oralidade e gírias são inadequadas para o registro formal exigido na redação."
          },
          {
            text: "Qual dos seguintes desvios gramaticais é frequentemente penalizado na Competência 1?",
            options: ["Uso de conectivos inadequados (Competência 4).", "Falta de proposta de intervenção (Competência 5).", "Erros de concordância verbal e nominal, ortografia e acentuação.", "Fuga ao tema proposto (Competência 2)."],
            correctAnswer: 2,
            explanation: "A Competência 1 foca estritamente nos aspectos gramaticais e convenções da escrita formal."
          },
          {
            text: "O uso de 'internetês' (abreviações como 'vc', 'tbm', 'pq') na redação do ENEM:",
            options: ["É permitido apenas na conclusão.", "É considerado um traço de estilo e valorizado.", "É penalizado na Competência 1 por desrespeitar a norma-padrão.", "Não afeta a nota se o argumento for bom."],
            correctAnswer: 2,
            explanation: "O ENEM exige a norma-padrão da língua portuguesa; abreviações informais são consideradas desvios."
          },
          {
            text: "Um texto que apresenta excelente argumentação, mas contém diversos erros de crase e pontuação, terá sua nota prejudicada principalmente na:",
            options: ["Competência 1", "Competência 3", "Competência 4", "Competência 5"],
            correctAnswer: 0,
            explanation: "Crase e pontuação (como uso da vírgula) são regras gramaticais avaliadas na Competência 1."
          }
        ]
      },
      { 
        id: 'red-3', 
        title: 'Competência 2: Repertório Sociocultural', 
        completed: false,
        questions: [
          {
            text: "O uso de citações, dados estatísticos ou fatos históricos para embasar o argumento refere-se a qual competência?",
            options: ["Competência 1", "Competência 2", "Competência 3", "Competência 4"],
            correctAnswer: 1,
            explanation: "A Competência 2 avalia a compreensão do tema e o uso de repertório legitimado e pertinente."
          },
          {
            text: "Para que um repertório sociocultural seja considerado 'produtivo' no ENEM, ele deve:",
            options: ["Ser apenas citado na introdução sem ligação com o resto do texto.", "Ser de um filósofo grego antigo.", "Estar diretamente vinculado à discussão proposta e ajudar a sustentar o argumento.", "Ser copiado integralmente dos textos motivadores."],
            correctAnswer: 2,
            explanation: "Não basta apenas citar; o repertório deve ter uso produtivo, ou seja, deve estar bem articulado com a argumentação do candidato."
          },
          {
            text: "Copiar trechos dos textos motivadores na redação:",
            options: ["É recomendado para demonstrar leitura atenta.", "Garante nota máxima na Competência 2.", "Faz com que as linhas copiadas sejam desconsideradas para a contagem final e demonstra falta de repertório próprio.", "É a única forma de não fugir do tema."],
            correctAnswer: 2,
            explanation: "O candidato deve usar os textos motivadores apenas como base, devendo trazer seu próprio repertório (conhecimentos de mundo)."
          },
          {
            text: "O que caracteriza a 'fuga ao tema' na redação do ENEM?",
            options: ["Abordar o tema de forma superficial.", "Escrever sobre um assunto completamente diferente do que foi proposto na frase-tema.", "Esquecer de colocar o título.", "Fazer uma proposta de intervenção genérica."],
            correctAnswer: 1,
            explanation: "A fuga total ao tema resulta em nota zero na redação. É crucial ler atentamente a frase-tema e os textos de apoio."
          }
        ]
      },
      { 
        id: 'red-4', 
        title: 'Competência 3: Argumentação e Projeto', 
        completed: false,
        questions: [
          {
            text: "A capacidade de selecionar, relacionar, organizar e interpretar informações em defesa de um ponto de vista é avaliada na:",
            options: ["Competência 1", "Competência 2", "Competência 3", "Competência 5"],
            correctAnswer: 2,
            explanation: "A Competência 3 foca na qualidade da argumentação e no projeto de texto."
          },
          {
            text: "O que é um 'Projeto de Texto' estratégico, avaliado na Competência 3?",
            options: ["A caligrafia legível do candidato.", "O planejamento prévio que garante que todas as partes do texto (introdução, desenvolvimento e conclusão) estejam articuladas e direcionadas para defender a tese.", "A escolha de palavras difíceis e raras.", "O rascunho feito na folha de provas."],
            correctAnswer: 1,
            explanation: "Um bom projeto de texto mostra que o candidato planejou o que ia escrever, evitando ideias soltas ou contraditórias."
          },
          {
            text: "Apresentar informações contraditórias ao longo do texto penaliza o candidato principalmente em qual competência?",
            options: ["Competência 1", "Competência 2", "Competência 3", "Competência 4"],
            correctAnswer: 2,
            explanation: "A contradição demonstra falha na organização das ideias e na defesa do ponto de vista (projeto de texto falho)."
          },
          {
            text: "Um argumento é considerado 'consistente' quando:",
            options: ["É baseado no senso comum e em achismos.", "É longo, ocupando mais de 10 linhas.", "É fundamentado em fatos, exemplos, dados ou autoridades, provando a validade da tese.", "Apela para a emoção do leitor."],
            correctAnswer: 2,
            explanation: "A consistência argumentativa exige provas lógicas e racionais, não apenas opiniões infundadas."
          }
        ]
      },
      { 
        id: 'red-5', 
        title: 'Competência 4: Coesão Textual', 
        completed: false,
        questions: [
          {
            text: "O uso de conectivos (conjunções, advérbios, pronomes) para ligar as partes do texto é avaliado na:",
            options: ["Competência 2", "Competência 3", "Competência 4", "Competência 5"],
            correctAnswer: 2,
            explanation: "A Competência 4 avalia o conhecimento dos mecanismos linguísticos necessários para a construção da argumentação."
          },
          {
            text: "Qual a função dos elementos coesivos interparágrafos?",
            options: ["Corrigir erros ortográficos.", "Ligar as ideias dentro de uma mesma frase.", "Estabelecer uma relação lógica (como adição, oposição, conclusão) entre os diferentes parágrafos do texto.", "Substituir o título da redação."],
            correctAnswer: 2,
            explanation: "Conectivos como 'Além disso', 'Por outro lado' e 'Portanto' no início dos parágrafos garantem a fluidez e a progressão do texto."
          },
          {
            text: "A repetição excessiva de palavras em um mesmo parágrafo demonstra:",
            options: ["Riqueza de vocabulário.", "Falta de recursos coesivos (como o uso de sinônimos e pronomes), penalizada na Competência 4.", "Ênfase argumentativa valorizada na Competência 3.", "Domínio da norma culta."],
            correctAnswer: 1,
            explanation: "A coesão referencial exige o uso de sinônimos, pronomes e elipses para evitar a repetição desnecessária de termos."
          },
          {
            text: "O uso inadequado de um conectivo (ex: usar 'Portanto' para indicar oposição) prejudica a nota na Competência 4 porque:",
            options: ["É um erro de ortografia.", "Quebra a relação lógica entre as ideias, confundindo o leitor.", "Demonstra falta de repertório sociocultural.", "Fere os direitos humanos."],
            correctAnswer: 1,
            explanation: "Os conectivos devem ser usados com o sentido correto (adição, adversidade, conclusão, causa) para manter a coerência do texto."
          }
        ]
      },
      { 
        id: 'red-6', 
        title: 'Competência 5: Proposta de Intervenção', 
        completed: false,
        questions: [
          {
            text: "A proposta de intervenção deve conter 5 elementos: Agente, Ação, Meio/Modo, Efeito e:",
            options: ["Citação", "Detalhamento", "Título", "Exemplo"],
            correctAnswer: 1,
            explanation: "Para atingir a nota máxima na Competência 5, é necessário detalhar pelo menos um dos outros quatro elementos."
          },
          {
            text: "Na proposta de intervenção, o 'Agente' responde a qual pergunta?",
            options: ["O que deve ser feito?", "Como deve ser feito?", "Quem deve executar a ação?", "Para que deve ser feito?"],
            correctAnswer: 2,
            explanation: "O agente é o responsável por implementar a solução proposta (ex: Governo, ONGs, Mídia, Escola, Família - GOMIFES)."
          },
          {
            text: "Uma proposta de intervenção que sugere 'matar todos os criminosos' receberá nota zero na Competência 5 porque:",
            options: ["Falta detalhamento.", "O agente não está claro.", "Desrespeita os Direitos Humanos.", "Não resolve o problema da educação."],
            correctAnswer: 2,
            explanation: "O ENEM exige explicitamente que a proposta de intervenção respeite os Direitos Humanos (direito à vida, liberdade, igualdade, etc.)."
          },
          {
            text: "O elemento 'Meio/Modo' na proposta de intervenção indica:",
            options: ["A finalidade da ação.", "Os recursos ou a maneira como a ação será colocada em prática (frequentemente introduzido por 'por meio de' ou 'através de').", "O detalhamento do agente.", "A tese do texto."],
            correctAnswer: 1,
            explanation: "O meio/modo explica o 'como' a solução vai sair do papel e se tornar realidade."
          }
        ]
      },
      { 
        id: 'red-7', 
        title: 'Planejamento e Brainstorming', 
        completed: false,
        questions: [
          {
            text: "O que é o 'Brainstorming' (tempestade de ideias) no contexto da redação do ENEM?",
            options: ["A escrita da versão final do texto a caneta.", "A leitura rápida dos textos motivadores.", "O processo inicial de anotar todas as ideias, palavras, causas, consequências e repertórios que vêm à mente sobre o tema.", "A revisão gramatical do rascunho."],
            correctAnswer: 2,
            explanation: "O brainstorming é crucial para não esquecer ideias boas e para ter material suficiente para selecionar os melhores argumentos depois."
          },
          {
            text: "Por que é fundamental fazer um rascunho antes de passar a redação a limpo?",
            options: ["Para gastar mais tempo na prova.", "Porque a folha oficial não pode ter rasuras excessivas e o rascunho permite testar a estrutura, coesão e contagem de linhas.", "Para que o fiscal de prova possa avaliar o processo criativo.", "Porque é obrigatório entregar a folha de rascunho junto com a prova."],
            correctAnswer: 1,
            explanation: "O rascunho é o espaço seguro para errar, reescrever frases, trocar conectivos e garantir que o texto caiba nas 30 linhas."
          },
          {
            text: "Ao ler a frase-tema da redação, qual deve ser a primeira atitude do candidato?",
            options: ["Começar a escrever a introdução imediatamente.", "Identificar as palavras-chave do tema para garantir que não haverá fuga ou tangenciamento.", "Pensar na proposta de intervenção.", "Contar quantas linhas têm os textos motivadores."],
            correctAnswer: 1,
            explanation: "Compreender exatamente o que está sendo pedido através das palavras-chave é o passo mais importante para garantir a adequação ao tema (Competência 2)."
          },
          {
            text: "Qual a melhor estratégia de gerenciamento de tempo para a redação no dia do ENEM?",
            options: ["Deixar a redação para os últimos 30 minutos de prova.", "Fazer a redação inteira antes de ler qualquer questão da prova.", "Ler o tema, fazer o brainstorming/rascunho, resolver algumas questões para 'descansar' a mente, e depois revisar e passar a limpo (cerca de 1h a 1h30 no total).", "Gastar 3 horas apenas na redação para garantir a nota 1000."],
            correctAnswer: 2,
            explanation: "Intercalar a redação com a prova objetiva ajuda a 'refrescar' a mente, facilitando a identificação de erros durante a revisão do rascunho."
          }
        ]
      },
      { 
        id: 'red-8', 
        title: 'Dicas Finais e Estrutura Geral', 
        completed: false,
        questions: [
          {
            text: "O que acontece se o candidato escrever menos de 7 linhas na redação do ENEM?",
            options: ["Perde 100 pontos.", "A redação é corrigida normalmente, mas com nota reduzida.", "A redação recebe nota zero (texto insuficiente).", "O candidato é desclassificado de todo o exame."],
            correctAnswer: 2,
            explanation: "Textos com até 7 linhas são considerados 'texto insuficiente' e recebem nota zero."
          },
          {
            text: "Desenhar, escrever recados ou colocar assinaturas fora do local apropriado na folha de redação resulta em:",
            options: ["Aumento da nota por criatividade.", "Nota zero por anulação (formas propositais de anulação).", "Perda de 50 pontos na Competência 1.", "Nenhuma penalidade."],
            correctAnswer: 1,
            explanation: "Qualquer marca, desenho ou recado que não faça parte do texto dissertativo anula a redação."
          },
          {
            text: "Qual a estrutura de parágrafos mais recomendada e tradicional para a redação do ENEM?",
            options: ["1 parágrafo longo.", "2 parágrafos (introdução e conclusão).", "4 parágrafos (1 introdução, 2 de desenvolvimento, 1 conclusão).", "6 ou mais parágrafos curtos."],
            correctAnswer: 2,
            explanation: "A estrutura de 4 parágrafos permite organizar bem a tese, desenvolver dois argumentos consistentes e apresentar a proposta de intervenção."
          },
          {
            text: "É obrigatório usar letra cursiva na redação do ENEM?",
            options: ["Sim, redações com letra de forma são zeradas.", "Não, pode-se usar letra de forma (bastão), desde que haja clara distinção entre letras maiúsculas e minúsculas.", "Apenas na introdução e conclusão.", "Não, mas a letra de forma perde pontos na Competência 1."],
            correctAnswer: 1,
            explanation: "O ENEM aceita letra de forma, mas é fundamental diferenciar as maiúsculas (início de frase, nomes próprios) das minúsculas."
          }
        ]
      }
    ],
  },
];

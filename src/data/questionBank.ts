import { Question } from '../types';

export const QUESTION_BANK: Record<string, Question[]> = {
  "mat": [
    {
      text: "Um comerciante comprou 150 kg de cafe por R$ 2.400,00. Se ele vender o cafe a R$ 18,00 por kg, qual sera seu lucro total?",
      options: ["R$ 1.200,00", "R$ 1.350,00", "R$ 1.500,00", "R$ 1.650,00", "R$ 1.800,00"],
      correctAnswer: 2,
      explanation: "Preco de venda total: 150 x 18 = 2.700. Lucro: 2.700 - 2.400 = 300.",
      topic: "Aritmetica",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Uma fabrica produz 2.400 pecas por dia. Se 5% das pecas sao defeituosas, quantas pecas boas sao produzidas diariamente?",
      options: ["2.280 pecas", "2.300 pecas", "2.320 pecas", "2.340 pecas", "2.360 pecas"],
      correctAnswer: 0,
      explanation: "5% de 2.400 = 0,05 x 2.400 = 120 pecas defeituosas. Pecas boas = 2.400 - 120 = 2.280",
      topic: "Porcentagem",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Se uma mercadoria custa R$ 80,00 e sofre dois aumentos sucessivos de 10%, qual sera seu preco final?",
      options: ["R$ 96,00", "R$ 96,80", "R$ 97,20", "R$ 98,00", "R$ 99,00"],
      correctAnswer: 1,
      explanation: "Primeiro aumento: 80 x 1,10 = 88. Segundo aumento: 88 x 1,10 = 96,80",
      topic: "Porcentagem",
      institution: "Poliedro",
      year: 2024
    },
    {
      text: "Um investimento de R$ 1.000,00 rendeu R$ 150,00 de juros em 6 meses. Qual foi a taxa de juros mensal?",
      options: ["2%", "2,5%", "3%", "3,5%", "4%"],
      correctAnswer: 1,
      explanation: "Taxa total em 6 meses = 150/1000 = 15%. Taxa mensal = 15%/6 = 2,5%",
      topic: "Juros",
      institution: "Bernoulli",
      year: 2024
    },
    {
      text: "Qual e o valor de x na equacao 3x + 15 = 45?",
      options: ["5", "10", "15", "20", "25"],
      correctAnswer: 1,
      explanation: "3x + 15 = 45 → 3x = 30 → x = 10",
      topic: "Equacoes",
      institution: "SAS",
      year: 2024
    },
    {
      text: "Se uma funcao e definida por f(x) = 2x + 3, qual e o valor de f(5)?",
      options: ["10", "11", "12", "13", "14"],
      correctAnswer: 3,
      explanation: "f(5) = 2(5) + 3 = 10 + 3 = 13",
      topic: "Funcoes",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e a area de um retangulo com comprimento 12 cm e largura 8 cm?",
      options: ["80 cm2", "90 cm2", "96 cm2", "100 cm2", "108 cm2"],
      correctAnswer: 2,
      explanation: "Area = comprimento x largura = 12 x 8 = 96 cm2",
      topic: "Geometria",
      institution: "Poliedro",
      year: 2024
    },
    {
      text: "Um triangulo tem base 10 cm e altura 6 cm. Qual e sua area?",
      options: ["30 cm2", "40 cm2", "50 cm2", "60 cm2", "70 cm2"],
      correctAnswer: 0,
      explanation: "Area do triangulo = (base x altura)/2 = (10 x 6)/2 = 30 cm2",
      topic: "Geometria",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e o perimetro de um quadrado com lado 7 cm?",
      options: ["21 cm", "28 cm", "35 cm", "42 cm", "49 cm"],
      correctAnswer: 1,
      explanation: "Perimetro = 4 x lado = 4 x 7 = 28 cm",
      topic: "Geometria",
      institution: "Bernoulli",
      year: 2024
    },
    {
      text: "Qual e o volume de um cubo com aresta 5 cm?",
      options: ["75 cm3", "100 cm3", "125 cm3", "150 cm3", "175 cm3"],
      correctAnswer: 2,
      explanation: "Volume = aresta3 = 53 = 125 cm3",
      topic: "Geometria Espacial",
      institution: "SAS",
      year: 2024
    },
    {
      text: "Um comerciante comprou 150 kg de cafe por R$ 2.400,00. Se ele vender o cafe a R$ 18,00 por kg, qual sera seu lucro total?",
      options: ["R$ 1.200,00", "R$ 1.350,00", "R$ 1.500,00", "R$ 1.650,00", "R$ 1.800,00"],
      correctAnswer: 2,
      explanation: "Preco de venda total: 150 x 18 = 2.700. Lucro: 2.700 - 2.400 = 300.",
      topic: "Aritmetica",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Uma fabrica produz 2.400 pecas por dia. Se 5% das pecas sao defeituosas, quantas pecas boas sao produzidas diariamente?",
      options: ["2.280 pecas", "2.300 pecas", "2.320 pecas", "2.340 pecas", "2.360 pecas"],
      correctAnswer: 0,
      explanation: "5% de 2.400 = 0,05 x 2.400 = 120 pecas defeituosas. Pecas boas = 2.400 - 120 = 2.280",
      topic: "Porcentagem",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Se uma mercadoria custa R$ 80,00 e sofre dois aumentos sucessivos de 10%, qual sera seu preco final?",
      options: ["R$ 96,00", "R$ 96,80", "R$ 97,20", "R$ 98,00", "R$ 99,00"],
      correctAnswer: 1,
      explanation: "Primeiro aumento: 80 x 1,10 = 88. Segundo aumento: 88 x 1,10 = 96,80",
      topic: "Porcentagem",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Um investimento de R$ 1.000,00 rendeu R$ 150,00 de juros em 6 meses. Qual foi a taxa de juros mensal?",
      options: ["2%", "2,5%", "3%", "3,5%", "4%"],
      correctAnswer: 1,
      explanation: "Taxa total em 6 meses = 150/1000 = 15%. Taxa mensal = 15%/6 = 2,5%",
      topic: "Juros",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e o valor de x na equacao 3x + 15 = 45?",
      options: ["5", "10", "15", "20", "25"],
      correctAnswer: 1,
      explanation: "3x + 15 = 45 → 3x = 30 → x = 10",
      topic: "Equacoes",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Se uma funcao e definida por f(x) = 2x + 3, qual e o valor de f(5)?",
      options: ["10", "11", "12", "13", "14"],
      correctAnswer: 3,
      explanation: "f(5) = 2(5) + 3 = 10 + 3 = 13",
      topic: "Funcoes",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e a area de um retangulo com comprimento 12 cm e largura 8 cm?",
      options: ["80 cm2", "90 cm2", "96 cm2", "100 cm2", "108 cm2"],
      correctAnswer: 2,
      explanation: "Area = comprimento x largura = 12 x 8 = 96 cm2",
      topic: "Geometria",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Um triangulo tem base 10 cm e altura 6 cm. Qual e sua area?",
      options: ["30 cm2", "40 cm2", "50 cm2", "60 cm2", "70 cm2"],
      correctAnswer: 0,
      explanation: "Area do triangulo = (base x altura)/2 = (10 x 6)/2 = 30 cm2",
      topic: "Geometria",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e o perimetro de um quadrado com lado 7 cm?",
      options: ["21 cm", "28 cm", "35 cm", "42 cm", "49 cm"],
      correctAnswer: 1,
      explanation: "Perimetro = 4 x lado = 4 x 7 = 28 cm",
      topic: "Geometria",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e o volume de um cubo com aresta 5 cm?",
      options: ["75 cm3", "100 cm3", "125 cm3", "150 cm3", "175 cm3"],
      correctAnswer: 2,
      explanation: "Volume = aresta3 = 53 = 125 cm3",
      topic: "Geometria Espacial",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Um comerciante comprou 150 kg de cafe por R$ 2.400,00. Se ele vender o cafe a R$ 18,00 por kg, qual sera seu lucro total?",
      options: ["R$ 1.200,00", "R$ 1.350,00", "R$ 1.500,00", "R$ 1.650,00", "R$ 1.800,00"],
      correctAnswer: 2,
      explanation: "Preco de venda total: 150 x 18 = 2.700. Lucro: 2.700 - 2.400 = 300.",
      topic: "Aritmetica",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Uma fabrica produz 2.400 pecas por dia. Se 5% das pecas sao defeituosas, quantas pecas boas sao produzidas diariamente?",
      options: ["2.280 pecas", "2.300 pecas", "2.320 pecas", "2.340 pecas", "2.360 pecas"],
      correctAnswer: 0,
      explanation: "5% de 2.400 = 0,05 x 2.400 = 120 pecas defeituosas. Pecas boas = 2.400 - 120 = 2.280",
      topic: "Porcentagem",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Se uma mercadoria custa R$ 80,00 e sofre dois aumentos sucessivos de 10%, qual sera seu preco final?",
      options: ["R$ 96,00", "R$ 96,80", "R$ 97,20", "R$ 98,00", "R$ 99,00"],
      correctAnswer: 1,
      explanation: "Primeiro aumento: 80 x 1,10 = 88. Segundo aumento: 88 x 1,10 = 96,80",
      topic: "Porcentagem",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Um investimento de R$ 1.000,00 rendeu R$ 150,00 de juros em 6 meses. Qual foi a taxa de juros mensal?",
      options: ["2%", "2,5%", "3%", "3,5%", "4%"],
      correctAnswer: 1,
      explanation: "Taxa total em 6 meses = 150/1000 = 15%. Taxa mensal = 15%/6 = 2,5%",
      topic: "Juros",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e o valor de x na equacao 3x + 15 = 45?",
      options: ["5", "10", "15", "20", "25"],
      correctAnswer: 1,
      explanation: "3x + 15 = 45 → 3x = 30 → x = 10",
      topic: "Equacoes",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Se uma funcao e definida por f(x) = 2x + 3, qual e o valor de f(5)?",
      options: ["10", "11", "12", "13", "14"],
      correctAnswer: 3,
      explanation: "f(5) = 2(5) + 3 = 10 + 3 = 13",
      topic: "Funcoes",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e a area de um retangulo com comprimento 12 cm e largura 8 cm?",
      options: ["80 cm2", "90 cm2", "96 cm2", "100 cm2", "108 cm2"],
      correctAnswer: 2,
      explanation: "Area = comprimento x largura = 12 x 8 = 96 cm2",
      topic: "Geometria",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Um triangulo tem base 10 cm e altura 6 cm. Qual e sua area?",
      options: ["30 cm2", "40 cm2", "50 cm2", "60 cm2", "70 cm2"],
      correctAnswer: 0,
      explanation: "Area do triangulo = (base x altura)/2 = (10 x 6)/2 = 30 cm2",
      topic: "Geometria",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e o perimetro de um quadrado com lado 7 cm?",
      options: ["21 cm", "28 cm", "35 cm", "42 cm", "49 cm"],
      correctAnswer: 1,
      explanation: "Perimetro = 4 x lado = 4 x 7 = 28 cm",
      topic: "Geometria",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e o volume de um cubo com aresta 5 cm?",
      options: ["75 cm3", "100 cm3", "125 cm3", "150 cm3", "175 cm3"],
      correctAnswer: 2,
      explanation: "Volume = aresta3 = 53 = 125 cm3",
      topic: "Geometria Espacial",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Um comerciante comprou 150 kg de cafe por R$ 2.400,00. Se ele vender o cafe a R$ 18,00 por kg, qual sera seu lucro total?",
      options: ["R$ 1.200,00", "R$ 1.350,00", "R$ 1.500,00", "R$ 1.650,00", "R$ 1.800,00"],
      correctAnswer: 2,
      explanation: "Preco de venda total: 150 x 18 = 2.700. Lucro: 2.700 - 2.400 = 300.",
      topic: "Aritmetica",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Uma fabrica produz 2.400 pecas por dia. Se 5% das pecas sao defeituosas, quantas pecas boas sao produzidas diariamente?",
      options: ["2.280 pecas", "2.300 pecas", "2.320 pecas", "2.340 pecas", "2.360 pecas"],
      correctAnswer: 0,
      explanation: "5% de 2.400 = 0,05 x 2.400 = 120 pecas defeituosas. Pecas boas = 2.400 - 120 = 2.280",
      topic: "Porcentagem",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Se uma mercadoria custa R$ 80,00 e sofre dois aumentos sucessivos de 10%, qual sera seu preco final?",
      options: ["R$ 96,00", "R$ 96,80", "R$ 97,20", "R$ 98,00", "R$ 99,00"],
      correctAnswer: 1,
      explanation: "Primeiro aumento: 80 x 1,10 = 88. Segundo aumento: 88 x 1,10 = 96,80",
      topic: "Porcentagem",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Um investimento de R$ 1.000,00 rendeu R$ 150,00 de juros em 6 meses. Qual foi a taxa de juros mensal?",
      options: ["2%", "2,5%", "3%", "3,5%", "4%"],
      correctAnswer: 1,
      explanation: "Taxa total em 6 meses = 150/1000 = 15%. Taxa mensal = 15%/6 = 2,5%",
      topic: "Juros",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e o valor de x na equacao 3x + 15 = 45?",
      options: ["5", "10", "15", "20", "25"],
      correctAnswer: 1,
      explanation: "3x + 15 = 45 → 3x = 30 → x = 10",
      topic: "Equacoes",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Se uma funcao e definida por f(x) = 2x + 3, qual e o valor de f(5)?",
      options: ["10", "11", "12", "13", "14"],
      correctAnswer: 3,
      explanation: "f(5) = 2(5) + 3 = 10 + 3 = 13",
      topic: "Funcoes",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e a area de um retangulo com comprimento 12 cm e largura 8 cm?",
      options: ["80 cm2", "90 cm2", "96 cm2", "100 cm2", "108 cm2"],
      correctAnswer: 2,
      explanation: "Area = comprimento x largura = 12 x 8 = 96 cm2",
      topic: "Geometria",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Um triangulo tem base 10 cm e altura 6 cm. Qual e sua area?",
      options: ["30 cm2", "40 cm2", "50 cm2", "60 cm2", "70 cm2"],
      correctAnswer: 0,
      explanation: "Area do triangulo = (base x altura)/2 = (10 x 6)/2 = 30 cm2",
      topic: "Geometria",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e o perimetro de um quadrado com lado 7 cm?",
      options: ["21 cm", "28 cm", "35 cm", "42 cm", "49 cm"],
      correctAnswer: 1,
      explanation: "Perimetro = 4 x lado = 4 x 7 = 28 cm",
      topic: "Geometria",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e o volume de um cubo com aresta 5 cm?",
      options: ["75 cm3", "100 cm3", "125 cm3", "150 cm3", "175 cm3"],
      correctAnswer: 2,
      explanation: "Volume = aresta3 = 53 = 125 cm3",
      topic: "Geometria Espacial",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Um comerciante comprou 150 kg de cafe por R$ 2.400,00. Se ele vender o cafe a R$ 18,00 por kg, qual sera seu lucro total?",
      options: ["R$ 1.200,00", "R$ 1.350,00", "R$ 1.500,00", "R$ 1.650,00", "R$ 1.800,00"],
      correctAnswer: 2,
      explanation: "Preco de venda total: 150 x 18 = 2.700. Lucro: 2.700 - 2.400 = 300.",
      topic: "Aritmetica",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Uma fabrica produz 2.400 pecas por dia. Se 5% das pecas sao defeituosas, quantas pecas boas sao produzidas diariamente?",
      options: ["2.280 pecas", "2.300 pecas", "2.320 pecas", "2.340 pecas", "2.360 pecas"],
      correctAnswer: 0,
      explanation: "5% de 2.400 = 0,05 x 2.400 = 120 pecas defeituosas. Pecas boas = 2.400 - 120 = 2.280",
      topic: "Porcentagem",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Se uma mercadoria custa R$ 80,00 e sofre dois aumentos sucessivos de 10%, qual sera seu preco final?",
      options: ["R$ 96,00", "R$ 96,80", "R$ 97,20", "R$ 98,00", "R$ 99,00"],
      correctAnswer: 1,
      explanation: "Primeiro aumento: 80 x 1,10 = 88. Segundo aumento: 88 x 1,10 = 96,80",
      topic: "Porcentagem",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Um investimento de R$ 1.000,00 rendeu R$ 150,00 de juros em 6 meses. Qual foi a taxa de juros mensal?",
      options: ["2%", "2,5%", "3%", "3,5%", "4%"],
      correctAnswer: 1,
      explanation: "Taxa total em 6 meses = 150/1000 = 15%. Taxa mensal = 15%/6 = 2,5%",
      topic: "Juros",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual e o valor de x na equacao 3x + 15 = 45?",
      options: ["5", "10", "15", "20", "25"],
      correctAnswer: 1,
      explanation: "3x + 15 = 45 → 3x = 30 → x = 10",
      topic: "Equacoes",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Se uma funcao e definida por f(x) = 2x + 3, qual e o valor de f(5)?",
      options: ["10", "11", "12", "13", "14"],
      correctAnswer: 3,
      explanation: "f(5) = 2(5) + 3 = 10 + 3 = 13",
      topic: "Funcoes",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual e a area de um retangulo com comprimento 12 cm e largura 8 cm?",
      options: ["80 cm2", "90 cm2", "96 cm2", "100 cm2", "108 cm2"],
      correctAnswer: 2,
      explanation: "Area = comprimento x largura = 12 x 8 = 96 cm2",
      topic: "Geometria",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Um triangulo tem base 10 cm e altura 6 cm. Qual e sua area?",
      options: ["30 cm2", "40 cm2", "50 cm2", "60 cm2", "70 cm2"],
      correctAnswer: 0,
      explanation: "Area do triangulo = (base x altura)/2 = (10 x 6)/2 = 30 cm2",
      topic: "Geometria",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual e o perimetro de um quadrado com lado 7 cm?",
      options: ["21 cm", "28 cm", "35 cm", "42 cm", "49 cm"],
      correctAnswer: 1,
      explanation: "Perimetro = 4 x lado = 4 x 7 = 28 cm",
      topic: "Geometria",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual e o volume de um cubo com aresta 5 cm?",
      options: ["75 cm3", "100 cm3", "125 cm3", "150 cm3", "175 cm3"],
      correctAnswer: 2,
      explanation: "Volume = aresta3 = 53 = 125 cm3",
      topic: "Geometria Espacial",
      institution: "SAS",
      year: 2021
    }
  ],
  "por": [
    {
      text: "Em qual das alternativas ha um exemplo de linguagem denotativa?",
      options: ["A noite desceu como um manto escuro sobre a cidade.", "O coracao acelerou quando a viu chegar.", "A temperatura caiu para 5°C durante a noite.", "Seus olhos brilhavam como duas estrelas.", "O tempo voava quando estavamos juntos."],
      correctAnswer: 2,
      explanation: "Linguagem denotativa e aquela que usa palavras em seu sentido literal.",
      topic: "Linguagem",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e o sujeito da oracao As flores desabrocharam na primavera?",
      options: ["As", "flores", "desabrocharam", "primavera", "na primavera"],
      correctAnswer: 1,
      explanation: "O sujeito e as flores, pois e o termo que pratica a acao.",
      topic: "Sintaxe",
      institution: "Poliedro",
      year: 2024
    },
    {
      text: "Identifique o predicado na frase: O gato subiu no telhado.",
      options: ["O gato", "subiu", "no telhado", "subiu no telhado", "gato subiu"],
      correctAnswer: 3,
      explanation: "O predicado e subiu no telhado, que contem o verbo e seus complementos.",
      topic: "Sintaxe",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual alternativa apresenta um exemplo de oracao subordinada adjetiva?",
      options: ["Quando chegou, encontrou a casa vazia.", "O livro que voce emprestou e excelente.", "Estudei muito para passar no exame.", "Ele saiu porque estava cansado.", "Todos queriam que ele voltasse."],
      correctAnswer: 1,
      explanation: "A oracao que voce emprestou e uma subordinada adjetiva, pois modifica o nome livro.",
      topic: "Oracoes",
      institution: "Bernoulli",
      year: 2024
    },
    {
      text: "Qual e o significado de ubiquo?",
      options: ["Que esta em um unico lugar", "Que esta presente em todos os lugares ao mesmo tempo", "Que desaparece rapidamente", "Que e muito raro", "Que e facilmente encontrado"],
      correctAnswer: 1,
      explanation: "Ubiquo significa que esta presente em todos os lugares simultaneamente.",
      topic: "Vocabulario",
      institution: "SAS",
      year: 2024
    },
    {
      text: "Em qual das alternativas ha um exemplo de linguagem denotativa?",
      options: ["A noite desceu como um manto escuro sobre a cidade.", "O coracao acelerou quando a viu chegar.", "A temperatura caiu para 5°C durante a noite.", "Seus olhos brilhavam como duas estrelas.", "O tempo voava quando estavamos juntos."],
      correctAnswer: 2,
      explanation: "Linguagem denotativa e aquela que usa palavras em seu sentido literal.",
      topic: "Linguagem",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e o sujeito da oracao As flores desabrocharam na primavera?",
      options: ["As", "flores", "desabrocharam", "primavera", "na primavera"],
      correctAnswer: 1,
      explanation: "O sujeito e as flores, pois e o termo que pratica a acao.",
      topic: "Sintaxe",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Identifique o predicado na frase: O gato subiu no telhado.",
      options: ["O gato", "subiu", "no telhado", "subiu no telhado", "gato subiu"],
      correctAnswer: 3,
      explanation: "O predicado e subiu no telhado, que contem o verbo e seus complementos.",
      topic: "Sintaxe",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual alternativa apresenta um exemplo de oracao subordinada adjetiva?",
      options: ["Quando chegou, encontrou a casa vazia.", "O livro que voce emprestou e excelente.", "Estudei muito para passar no exame.", "Ele saiu porque estava cansado.", "Todos queriam que ele voltasse."],
      correctAnswer: 1,
      explanation: "A oracao que voce emprestou e uma subordinada adjetiva, pois modifica o nome livro.",
      topic: "Oracoes",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e o significado de ubiquo?",
      options: ["Que esta em um unico lugar", "Que esta presente em todos os lugares ao mesmo tempo", "Que desaparece rapidamente", "Que e muito raro", "Que e facilmente encontrado"],
      correctAnswer: 1,
      explanation: "Ubiquo significa que esta presente em todos os lugares simultaneamente.",
      topic: "Vocabulario",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Em qual das alternativas ha um exemplo de linguagem denotativa?",
      options: ["A noite desceu como um manto escuro sobre a cidade.", "O coracao acelerou quando a viu chegar.", "A temperatura caiu para 5°C durante a noite.", "Seus olhos brilhavam como duas estrelas.", "O tempo voava quando estavamos juntos."],
      correctAnswer: 2,
      explanation: "Linguagem denotativa e aquela que usa palavras em seu sentido literal.",
      topic: "Linguagem",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e o sujeito da oracao As flores desabrocharam na primavera?",
      options: ["As", "flores", "desabrocharam", "primavera", "na primavera"],
      correctAnswer: 1,
      explanation: "O sujeito e as flores, pois e o termo que pratica a acao.",
      topic: "Sintaxe",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Identifique o predicado na frase: O gato subiu no telhado.",
      options: ["O gato", "subiu", "no telhado", "subiu no telhado", "gato subiu"],
      correctAnswer: 3,
      explanation: "O predicado e subiu no telhado, que contem o verbo e seus complementos.",
      topic: "Sintaxe",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual alternativa apresenta um exemplo de oracao subordinada adjetiva?",
      options: ["Quando chegou, encontrou a casa vazia.", "O livro que voce emprestou e excelente.", "Estudei muito para passar no exame.", "Ele saiu porque estava cansado.", "Todos queriam que ele voltasse."],
      correctAnswer: 1,
      explanation: "A oracao que voce emprestou e uma subordinada adjetiva, pois modifica o nome livro.",
      topic: "Oracoes",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e o significado de ubiquo?",
      options: ["Que esta em um unico lugar", "Que esta presente em todos os lugares ao mesmo tempo", "Que desaparece rapidamente", "Que e muito raro", "Que e facilmente encontrado"],
      correctAnswer: 1,
      explanation: "Ubiquo significa que esta presente em todos os lugares simultaneamente.",
      topic: "Vocabulario",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Em qual das alternativas ha um exemplo de linguagem denotativa?",
      options: ["A noite desceu como um manto escuro sobre a cidade.", "O coracao acelerou quando a viu chegar.", "A temperatura caiu para 5°C durante a noite.", "Seus olhos brilhavam como duas estrelas.", "O tempo voava quando estavamos juntos."],
      correctAnswer: 2,
      explanation: "Linguagem denotativa e aquela que usa palavras em seu sentido literal.",
      topic: "Linguagem",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e o sujeito da oracao As flores desabrocharam na primavera?",
      options: ["As", "flores", "desabrocharam", "primavera", "na primavera"],
      correctAnswer: 1,
      explanation: "O sujeito e as flores, pois e o termo que pratica a acao.",
      topic: "Sintaxe",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Identifique o predicado na frase: O gato subiu no telhado.",
      options: ["O gato", "subiu", "no telhado", "subiu no telhado", "gato subiu"],
      correctAnswer: 3,
      explanation: "O predicado e subiu no telhado, que contem o verbo e seus complementos.",
      topic: "Sintaxe",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual alternativa apresenta um exemplo de oracao subordinada adjetiva?",
      options: ["Quando chegou, encontrou a casa vazia.", "O livro que voce emprestou e excelente.", "Estudei muito para passar no exame.", "Ele saiu porque estava cansado.", "Todos queriam que ele voltasse."],
      correctAnswer: 1,
      explanation: "A oracao que voce emprestou e uma subordinada adjetiva, pois modifica o nome livro.",
      topic: "Oracoes",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e o significado de ubiquo?",
      options: ["Que esta em um unico lugar", "Que esta presente em todos os lugares ao mesmo tempo", "Que desaparece rapidamente", "Que e muito raro", "Que e facilmente encontrado"],
      correctAnswer: 1,
      explanation: "Ubiquo significa que esta presente em todos os lugares simultaneamente.",
      topic: "Vocabulario",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Em qual das alternativas ha um exemplo de linguagem denotativa?",
      options: ["A noite desceu como um manto escuro sobre a cidade.", "O coracao acelerou quando a viu chegar.", "A temperatura caiu para 5°C durante a noite.", "Seus olhos brilhavam como duas estrelas.", "O tempo voava quando estavamos juntos."],
      correctAnswer: 2,
      explanation: "Linguagem denotativa e aquela que usa palavras em seu sentido literal.",
      topic: "Linguagem",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual e o sujeito da oracao As flores desabrocharam na primavera?",
      options: ["As", "flores", "desabrocharam", "primavera", "na primavera"],
      correctAnswer: 1,
      explanation: "O sujeito e as flores, pois e o termo que pratica a acao.",
      topic: "Sintaxe",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Identifique o predicado na frase: O gato subiu no telhado.",
      options: ["O gato", "subiu", "no telhado", "subiu no telhado", "gato subiu"],
      correctAnswer: 3,
      explanation: "O predicado e subiu no telhado, que contem o verbo e seus complementos.",
      topic: "Sintaxe",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual alternativa apresenta um exemplo de oracao subordinada adjetiva?",
      options: ["Quando chegou, encontrou a casa vazia.", "O livro que voce emprestou e excelente.", "Estudei muito para passar no exame.", "Ele saiu porque estava cansado.", "Todos queriam que ele voltasse."],
      correctAnswer: 1,
      explanation: "A oracao que voce emprestou e uma subordinada adjetiva, pois modifica o nome livro.",
      topic: "Oracoes",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual e o significado de ubiquo?",
      options: ["Que esta em um unico lugar", "Que esta presente em todos os lugares ao mesmo tempo", "Que desaparece rapidamente", "Que e muito raro", "Que e facilmente encontrado"],
      correctAnswer: 1,
      explanation: "Ubiquo significa que esta presente em todos os lugares simultaneamente.",
      topic: "Vocabulario",
      institution: "SAS",
      year: 2021
    }
  ],
  "his": [
    {
      text: "Em que ano comecou a Revolucao Francesa?",
      options: ["1776", "1789", "1799", "1815", "1848"],
      correctAnswer: 1,
      explanation: "A Revolucao Francesa comecou em 1789 com a Queda da Bastilha.",
      topic: "Historia Moderna",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual foi o principal objetivo da Revolucao Industrial?",
      options: ["Aumentar a producao de bens atraves de maquinas", "Derrotar Napoleao", "Abolir a escravidao", "Estabelecer democracias", "Expandir o imperio colonial"],
      correctAnswer: 0,
      explanation: "A Revolucao Industrial teve como objetivo principal aumentar a producao.",
      topic: "Historia Moderna",
      institution: "Poliedro",
      year: 2024
    },
    {
      text: "Qual foi o resultado da Guerra de Independencia dos EUA?",
      options: ["Vitoria britanica", "Vitoria americana e independencia dos EUA", "Paz sem vencedores", "Vitoria francesa", "Manutencao do dominio britanico"],
      correctAnswer: 1,
      explanation: "A Guerra de Independencia (1775-1783) resultou na vitoria americana e na independencia dos EUA.",
      topic: "Historia Moderna",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Quem foi Napoleao Bonaparte?",
      options: ["Um filosofo frances", "Um general e imperador frances", "Um rei britanico", "Um revolucionario russo", "Um poeta italiano"],
      correctAnswer: 1,
      explanation: "Napoleao Bonaparte foi um general que se tornou imperador da Franca e conquistou grande parte da Europa.",
      topic: "Historia Moderna",
      institution: "Bernoulli",
      year: 2024
    },
    {
      text: "Em que ano terminou a Primeira Guerra Mundial?",
      options: ["1914", "1916", "1917", "1918", "1920"],
      correctAnswer: 3,
      explanation: "A Primeira Guerra Mundial terminou em 1918 com a assinatura do Armisticio.",
      topic: "Historia Contemporanea",
      institution: "SAS",
      year: 2024
    },
    {
      text: "Em que ano comecou a Revolucao Francesa?",
      options: ["1776", "1789", "1799", "1815", "1848"],
      correctAnswer: 1,
      explanation: "A Revolucao Francesa comecou em 1789 com a Queda da Bastilha.",
      topic: "Historia Moderna",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual foi o principal objetivo da Revolucao Industrial?",
      options: ["Aumentar a producao de bens atraves de maquinas", "Derrotar Napoleao", "Abolir a escravidao", "Estabelecer democracias", "Expandir o imperio colonial"],
      correctAnswer: 0,
      explanation: "A Revolucao Industrial teve como objetivo principal aumentar a producao.",
      topic: "Historia Moderna",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual foi o resultado da Guerra de Independencia dos EUA?",
      options: ["Vitoria britanica", "Vitoria americana e independencia dos EUA", "Paz sem vencedores", "Vitoria francesa", "Manutencao do dominio britanico"],
      correctAnswer: 1,
      explanation: "A Guerra de Independencia (1775-1783) resultou na vitoria americana e na independencia dos EUA.",
      topic: "Historia Moderna",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Quem foi Napoleao Bonaparte?",
      options: ["Um filosofo frances", "Um general e imperador frances", "Um rei britanico", "Um revolucionario russo", "Um poeta italiano"],
      correctAnswer: 1,
      explanation: "Napoleao Bonaparte foi um general que se tornou imperador da Franca e conquistou grande parte da Europa.",
      topic: "Historia Moderna",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Em que ano terminou a Primeira Guerra Mundial?",
      options: ["1914", "1916", "1917", "1918", "1920"],
      correctAnswer: 3,
      explanation: "A Primeira Guerra Mundial terminou em 1918 com a assinatura do Armisticio.",
      topic: "Historia Contemporanea",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Em que ano comecou a Revolucao Francesa?",
      options: ["1776", "1789", "1799", "1815", "1848"],
      correctAnswer: 1,
      explanation: "A Revolucao Francesa comecou em 1789 com a Queda da Bastilha.",
      topic: "Historia Moderna",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual foi o principal objetivo da Revolucao Industrial?",
      options: ["Aumentar a producao de bens atraves de maquinas", "Derrotar Napoleao", "Abolir a escravidao", "Estabelecer democracias", "Expandir o imperio colonial"],
      correctAnswer: 0,
      explanation: "A Revolucao Industrial teve como objetivo principal aumentar a producao.",
      topic: "Historia Moderna",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual foi o resultado da Guerra de Independencia dos EUA?",
      options: ["Vitoria britanica", "Vitoria americana e independencia dos EUA", "Paz sem vencedores", "Vitoria francesa", "Manutencao do dominio britanico"],
      correctAnswer: 1,
      explanation: "A Guerra de Independencia (1775-1783) resultou na vitoria americana e na independencia dos EUA.",
      topic: "Historia Moderna",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Quem foi Napoleao Bonaparte?",
      options: ["Um filosofo frances", "Um general e imperador frances", "Um rei britanico", "Um revolucionario russo", "Um poeta italiano"],
      correctAnswer: 1,
      explanation: "Napoleao Bonaparte foi um general que se tornou imperador da Franca e conquistou grande parte da Europa.",
      topic: "Historia Moderna",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Em que ano terminou a Primeira Guerra Mundial?",
      options: ["1914", "1916", "1917", "1918", "1920"],
      correctAnswer: 3,
      explanation: "A Primeira Guerra Mundial terminou em 1918 com a assinatura do Armisticio.",
      topic: "Historia Contemporanea",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Em que ano comecou a Revolucao Francesa?",
      options: ["1776", "1789", "1799", "1815", "1848"],
      correctAnswer: 1,
      explanation: "A Revolucao Francesa comecou em 1789 com a Queda da Bastilha.",
      topic: "Historia Moderna",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual foi o principal objetivo da Revolucao Industrial?",
      options: ["Aumentar a producao de bens atraves de maquinas", "Derrotar Napoleao", "Abolir a escravidao", "Estabelecer democracias", "Expandir o imperio colonial"],
      correctAnswer: 0,
      explanation: "A Revolucao Industrial teve como objetivo principal aumentar a producao.",
      topic: "Historia Moderna",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual foi o resultado da Guerra de Independencia dos EUA?",
      options: ["Vitoria britanica", "Vitoria americana e independencia dos EUA", "Paz sem vencedores", "Vitoria francesa", "Manutencao do dominio britanico"],
      correctAnswer: 1,
      explanation: "A Guerra de Independencia (1775-1783) resultou na vitoria americana e na independencia dos EUA.",
      topic: "Historia Moderna",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Quem foi Napoleao Bonaparte?",
      options: ["Um filosofo frances", "Um general e imperador frances", "Um rei britanico", "Um revolucionario russo", "Um poeta italiano"],
      correctAnswer: 1,
      explanation: "Napoleao Bonaparte foi um general que se tornou imperador da Franca e conquistou grande parte da Europa.",
      topic: "Historia Moderna",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Em que ano terminou a Primeira Guerra Mundial?",
      options: ["1914", "1916", "1917", "1918", "1920"],
      correctAnswer: 3,
      explanation: "A Primeira Guerra Mundial terminou em 1918 com a assinatura do Armisticio.",
      topic: "Historia Contemporanea",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Em que ano comecou a Revolucao Francesa?",
      options: ["1776", "1789", "1799", "1815", "1848"],
      correctAnswer: 1,
      explanation: "A Revolucao Francesa comecou em 1789 com a Queda da Bastilha.",
      topic: "Historia Moderna",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual foi o principal objetivo da Revolucao Industrial?",
      options: ["Aumentar a producao de bens atraves de maquinas", "Derrotar Napoleao", "Abolir a escravidao", "Estabelecer democracias", "Expandir o imperio colonial"],
      correctAnswer: 0,
      explanation: "A Revolucao Industrial teve como objetivo principal aumentar a producao.",
      topic: "Historia Moderna",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual foi o resultado da Guerra de Independencia dos EUA?",
      options: ["Vitoria britanica", "Vitoria americana e independencia dos EUA", "Paz sem vencedores", "Vitoria francesa", "Manutencao do dominio britanico"],
      correctAnswer: 1,
      explanation: "A Guerra de Independencia (1775-1783) resultou na vitoria americana e na independencia dos EUA.",
      topic: "Historia Moderna",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Quem foi Napoleao Bonaparte?",
      options: ["Um filosofo frances", "Um general e imperador frances", "Um rei britanico", "Um revolucionario russo", "Um poeta italiano"],
      correctAnswer: 1,
      explanation: "Napoleao Bonaparte foi um general que se tornou imperador da Franca e conquistou grande parte da Europa.",
      topic: "Historia Moderna",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Em que ano terminou a Primeira Guerra Mundial?",
      options: ["1914", "1916", "1917", "1918", "1920"],
      correctAnswer: 3,
      explanation: "A Primeira Guerra Mundial terminou em 1918 com a assinatura do Armisticio.",
      topic: "Historia Contemporanea",
      institution: "SAS",
      year: 2021
    }
  ],
  "geo": [
    {
      text: "Qual e o maior deserto do mundo?",
      options: ["Deserto do Saara", "Deserto de Gobi", "Deserto de Kalahari", "Deserto da Arabia", "Deserto de Atacama"],
      correctAnswer: 0,
      explanation: "O Deserto do Saara, na Africa, e o maior deserto do mundo.",
      topic: "Geografia Fisica",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e a capital do Brasil?",
      options: ["Sao Paulo", "Rio de Janeiro", "Brasilia", "Salvador", "Recife"],
      correctAnswer: 2,
      explanation: "Brasilia e a capital do Brasil desde 1960.",
      topic: "Geografia Politica",
      institution: "Poliedro",
      year: 2024
    },
    {
      text: "Qual e o rio mais comprido do mundo?",
      options: ["Rio Amazonas", "Rio Nilo", "Rio Yangtze", "Rio Mississipi", "Rio Volga"],
      correctAnswer: 1,
      explanation: "O Rio Nilo, na Africa, e o rio mais comprido do mundo com aproximadamente 6.650 km.",
      topic: "Geografia Fisica",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Quantos continentes existem?",
      options: ["5", "6", "7", "8", "9"],
      correctAnswer: 2,
      explanation: "Existem 7 continentes: America, Europa, Asia, Africa, Oceania, Antartida e Antartica.",
      topic: "Geografia Politica",
      institution: "Bernoulli",
      year: 2024
    },
    {
      text: "Qual e o pais mais populoso do mundo?",
      options: ["India", "China", "Indonesia", "Brasil", "Paquistao"],
      correctAnswer: 0,
      explanation: "A India ultrapassou a China e e agora o pais mais populoso do mundo.",
      topic: "Geografia Humana",
      institution: "SAS",
      year: 2024
    },
    {
      text: "Qual e o maior deserto do mundo?",
      options: ["Deserto do Saara", "Deserto de Gobi", "Deserto de Kalahari", "Deserto da Arabia", "Deserto de Atacama"],
      correctAnswer: 0,
      explanation: "O Deserto do Saara, na Africa, e o maior deserto do mundo.",
      topic: "Geografia Fisica",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e a capital do Brasil?",
      options: ["Sao Paulo", "Rio de Janeiro", "Brasilia", "Salvador", "Recife"],
      correctAnswer: 2,
      explanation: "Brasilia e a capital do Brasil desde 1960.",
      topic: "Geografia Politica",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e o rio mais comprido do mundo?",
      options: ["Rio Amazonas", "Rio Nilo", "Rio Yangtze", "Rio Mississipi", "Rio Volga"],
      correctAnswer: 1,
      explanation: "O Rio Nilo, na Africa, e o rio mais comprido do mundo com aproximadamente 6.650 km.",
      topic: "Geografia Fisica",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Quantos continentes existem?",
      options: ["5", "6", "7", "8", "9"],
      correctAnswer: 2,
      explanation: "Existem 7 continentes: America, Europa, Asia, Africa, Oceania, Antartida e Antartica.",
      topic: "Geografia Politica",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e o pais mais populoso do mundo?",
      options: ["India", "China", "Indonesia", "Brasil", "Paquistao"],
      correctAnswer: 0,
      explanation: "A India ultrapassou a China e e agora o pais mais populoso do mundo.",
      topic: "Geografia Humana",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e o maior deserto do mundo?",
      options: ["Deserto do Saara", "Deserto de Gobi", "Deserto de Kalahari", "Deserto da Arabia", "Deserto de Atacama"],
      correctAnswer: 0,
      explanation: "O Deserto do Saara, na Africa, e o maior deserto do mundo.",
      topic: "Geografia Fisica",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e a capital do Brasil?",
      options: ["Sao Paulo", "Rio de Janeiro", "Brasilia", "Salvador", "Recife"],
      correctAnswer: 2,
      explanation: "Brasilia e a capital do Brasil desde 1960.",
      topic: "Geografia Politica",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e o rio mais comprido do mundo?",
      options: ["Rio Amazonas", "Rio Nilo", "Rio Yangtze", "Rio Mississipi", "Rio Volga"],
      correctAnswer: 1,
      explanation: "O Rio Nilo, na Africa, e o rio mais comprido do mundo com aproximadamente 6.650 km.",
      topic: "Geografia Fisica",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Quantos continentes existem?",
      options: ["5", "6", "7", "8", "9"],
      correctAnswer: 2,
      explanation: "Existem 7 continentes: America, Europa, Asia, Africa, Oceania, Antartida e Antartica.",
      topic: "Geografia Politica",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e o pais mais populoso do mundo?",
      options: ["India", "China", "Indonesia", "Brasil", "Paquistao"],
      correctAnswer: 0,
      explanation: "A India ultrapassou a China e e agora o pais mais populoso do mundo.",
      topic: "Geografia Humana",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e o maior deserto do mundo?",
      options: ["Deserto do Saara", "Deserto de Gobi", "Deserto de Kalahari", "Deserto da Arabia", "Deserto de Atacama"],
      correctAnswer: 0,
      explanation: "O Deserto do Saara, na Africa, e o maior deserto do mundo.",
      topic: "Geografia Fisica",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e a capital do Brasil?",
      options: ["Sao Paulo", "Rio de Janeiro", "Brasilia", "Salvador", "Recife"],
      correctAnswer: 2,
      explanation: "Brasilia e a capital do Brasil desde 1960.",
      topic: "Geografia Politica",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e o rio mais comprido do mundo?",
      options: ["Rio Amazonas", "Rio Nilo", "Rio Yangtze", "Rio Mississipi", "Rio Volga"],
      correctAnswer: 1,
      explanation: "O Rio Nilo, na Africa, e o rio mais comprido do mundo com aproximadamente 6.650 km.",
      topic: "Geografia Fisica",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Quantos continentes existem?",
      options: ["5", "6", "7", "8", "9"],
      correctAnswer: 2,
      explanation: "Existem 7 continentes: America, Europa, Asia, Africa, Oceania, Antartida e Antartica.",
      topic: "Geografia Politica",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e o pais mais populoso do mundo?",
      options: ["India", "China", "Indonesia", "Brasil", "Paquistao"],
      correctAnswer: 0,
      explanation: "A India ultrapassou a China e e agora o pais mais populoso do mundo.",
      topic: "Geografia Humana",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e o maior deserto do mundo?",
      options: ["Deserto do Saara", "Deserto de Gobi", "Deserto de Kalahari", "Deserto da Arabia", "Deserto de Atacama"],
      correctAnswer: 0,
      explanation: "O Deserto do Saara, na Africa, e o maior deserto do mundo.",
      topic: "Geografia Fisica",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual e a capital do Brasil?",
      options: ["Sao Paulo", "Rio de Janeiro", "Brasilia", "Salvador", "Recife"],
      correctAnswer: 2,
      explanation: "Brasilia e a capital do Brasil desde 1960.",
      topic: "Geografia Politica",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual e o rio mais comprido do mundo?",
      options: ["Rio Amazonas", "Rio Nilo", "Rio Yangtze", "Rio Mississipi", "Rio Volga"],
      correctAnswer: 1,
      explanation: "O Rio Nilo, na Africa, e o rio mais comprido do mundo com aproximadamente 6.650 km.",
      topic: "Geografia Fisica",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Quantos continentes existem?",
      options: ["5", "6", "7", "8", "9"],
      correctAnswer: 2,
      explanation: "Existem 7 continentes: America, Europa, Asia, Africa, Oceania, Antartida e Antartica.",
      topic: "Geografia Politica",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual e o pais mais populoso do mundo?",
      options: ["India", "China", "Indonesia", "Brasil", "Paquistao"],
      correctAnswer: 0,
      explanation: "A India ultrapassou a China e e agora o pais mais populoso do mundo.",
      topic: "Geografia Humana",
      institution: "SAS",
      year: 2021
    }
  ],
  "bio": [
    {
      text: "Qual e a unidade basica da vida?",
      options: ["Molecula", "Celula", "Tecido", "Orgao", "Organismo"],
      correctAnswer: 1,
      explanation: "A celula e a unidade basica da vida.",
      topic: "Citologia",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e a funcao principal da mitocondria?",
      options: ["Sintese de proteinas", "Producao de energia (ATP)", "Armazenamento de agua", "Sintese de lipidios", "Degradacao de residuos"],
      correctAnswer: 1,
      explanation: "A mitocondria e responsavel pela producao de ATP.",
      topic: "Citologia",
      institution: "Poliedro",
      year: 2024
    },
    {
      text: "Qual e a funcao do ribossomo?",
      options: ["Fotossintese", "Sintese de proteinas", "Armazenamento de energia", "Transporte de moleculas", "Divisao celular"],
      correctAnswer: 1,
      explanation: "O ribossomo e responsavel pela sintese de proteinas.",
      topic: "Citologia",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e a molecula responsavel pelo armazenamento de informacoes geneticas?",
      options: ["Proteina", "Lipidio", "DNA", "Carboidrato", "ATP"],
      correctAnswer: 2,
      explanation: "O DNA e a molecula que armazena as informacoes geneticas.",
      topic: "Genetica",
      institution: "Bernoulli",
      year: 2024
    },
    {
      text: "Qual e o processo pelo qual as plantas produzem seu proprio alimento?",
      options: ["Respiracao", "Fotossintese", "Fermentacao", "Digestao", "Transpiracao"],
      correctAnswer: 1,
      explanation: "A fotossintese e o processo pelo qual as plantas convertem luz solar em energia quimica.",
      topic: "Fisiologia Vegetal",
      institution: "SAS",
      year: 2024
    },
    {
      text: "Qual e a unidade basica da vida?",
      options: ["Molecula", "Celula", "Tecido", "Orgao", "Organismo"],
      correctAnswer: 1,
      explanation: "A celula e a unidade basica da vida.",
      topic: "Citologia",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e a funcao principal da mitocondria?",
      options: ["Sintese de proteinas", "Producao de energia (ATP)", "Armazenamento de agua", "Sintese de lipidios", "Degradacao de residuos"],
      correctAnswer: 1,
      explanation: "A mitocondria e responsavel pela producao de ATP.",
      topic: "Citologia",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e a funcao do ribossomo?",
      options: ["Fotossintese", "Sintese de proteinas", "Armazenamento de energia", "Transporte de moleculas", "Divisao celular"],
      correctAnswer: 1,
      explanation: "O ribossomo e responsavel pela sintese de proteinas.",
      topic: "Citologia",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e a molecula responsavel pelo armazenamento de informacoes geneticas?",
      options: ["Proteina", "Lipidio", "DNA", "Carboidrato", "ATP"],
      correctAnswer: 2,
      explanation: "O DNA e a molecula que armazena as informacoes geneticas.",
      topic: "Genetica",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e o processo pelo qual as plantas produzem seu proprio alimento?",
      options: ["Respiracao", "Fotossintese", "Fermentacao", "Digestao", "Transpiracao"],
      correctAnswer: 1,
      explanation: "A fotossintese e o processo pelo qual as plantas convertem luz solar em energia quimica.",
      topic: "Fisiologia Vegetal",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e a unidade basica da vida?",
      options: ["Molecula", "Celula", "Tecido", "Orgao", "Organismo"],
      correctAnswer: 1,
      explanation: "A celula e a unidade basica da vida.",
      topic: "Citologia",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e a funcao principal da mitocondria?",
      options: ["Sintese de proteinas", "Producao de energia (ATP)", "Armazenamento de agua", "Sintese de lipidios", "Degradacao de residuos"],
      correctAnswer: 1,
      explanation: "A mitocondria e responsavel pela producao de ATP.",
      topic: "Citologia",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e a funcao do ribossomo?",
      options: ["Fotossintese", "Sintese de proteinas", "Armazenamento de energia", "Transporte de moleculas", "Divisao celular"],
      correctAnswer: 1,
      explanation: "O ribossomo e responsavel pela sintese de proteinas.",
      topic: "Citologia",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e a molecula responsavel pelo armazenamento de informacoes geneticas?",
      options: ["Proteina", "Lipidio", "DNA", "Carboidrato", "ATP"],
      correctAnswer: 2,
      explanation: "O DNA e a molecula que armazena as informacoes geneticas.",
      topic: "Genetica",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e o processo pelo qual as plantas produzem seu proprio alimento?",
      options: ["Respiracao", "Fotossintese", "Fermentacao", "Digestao", "Transpiracao"],
      correctAnswer: 1,
      explanation: "A fotossintese e o processo pelo qual as plantas convertem luz solar em energia quimica.",
      topic: "Fisiologia Vegetal",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e a unidade basica da vida?",
      options: ["Molecula", "Celula", "Tecido", "Orgao", "Organismo"],
      correctAnswer: 1,
      explanation: "A celula e a unidade basica da vida.",
      topic: "Citologia",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e a funcao principal da mitocondria?",
      options: ["Sintese de proteinas", "Producao de energia (ATP)", "Armazenamento de agua", "Sintese de lipidios", "Degradacao de residuos"],
      correctAnswer: 1,
      explanation: "A mitocondria e responsavel pela producao de ATP.",
      topic: "Citologia",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e a funcao do ribossomo?",
      options: ["Fotossintese", "Sintese de proteinas", "Armazenamento de energia", "Transporte de moleculas", "Divisao celular"],
      correctAnswer: 1,
      explanation: "O ribossomo e responsavel pela sintese de proteinas.",
      topic: "Citologia",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e a molecula responsavel pelo armazenamento de informacoes geneticas?",
      options: ["Proteina", "Lipidio", "DNA", "Carboidrato", "ATP"],
      correctAnswer: 2,
      explanation: "O DNA e a molecula que armazena as informacoes geneticas.",
      topic: "Genetica",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e o processo pelo qual as plantas produzem seu proprio alimento?",
      options: ["Respiracao", "Fotossintese", "Fermentacao", "Digestao", "Transpiracao"],
      correctAnswer: 1,
      explanation: "A fotossintese e o processo pelo qual as plantas convertem luz solar em energia quimica.",
      topic: "Fisiologia Vegetal",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e a unidade basica da vida?",
      options: ["Molecula", "Celula", "Tecido", "Orgao", "Organismo"],
      correctAnswer: 1,
      explanation: "A celula e a unidade basica da vida.",
      topic: "Citologia",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual e a funcao principal da mitocondria?",
      options: ["Sintese de proteinas", "Producao de energia (ATP)", "Armazenamento de agua", "Sintese de lipidios", "Degradacao de residuos"],
      correctAnswer: 1,
      explanation: "A mitocondria e responsavel pela producao de ATP.",
      topic: "Citologia",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual e a funcao do ribossomo?",
      options: ["Fotossintese", "Sintese de proteinas", "Armazenamento de energia", "Transporte de moleculas", "Divisao celular"],
      correctAnswer: 1,
      explanation: "O ribossomo e responsavel pela sintese de proteinas.",
      topic: "Citologia",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual e a molecula responsavel pelo armazenamento de informacoes geneticas?",
      options: ["Proteina", "Lipidio", "DNA", "Carboidrato", "ATP"],
      correctAnswer: 2,
      explanation: "O DNA e a molecula que armazena as informacoes geneticas.",
      topic: "Genetica",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual e o processo pelo qual as plantas produzem seu proprio alimento?",
      options: ["Respiracao", "Fotossintese", "Fermentacao", "Digestao", "Transpiracao"],
      correctAnswer: 1,
      explanation: "A fotossintese e o processo pelo qual as plantas convertem luz solar em energia quimica.",
      topic: "Fisiologia Vegetal",
      institution: "SAS",
      year: 2021
    }
  ],
  "fis": [
    {
      text: "Qual e a unidade de medida de forca no Sistema Internacional?",
      options: ["Quilograma", "Newton", "Joule", "Watt", "Pascal"],
      correctAnswer: 1,
      explanation: "O Newton (N) e a unidade de forca.",
      topic: "Mecanica",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e a formula da Segunda Lei de Newton?",
      options: ["F = m/a", "F = m x a", "F = a/m", "F = m + a", "F = m - a"],
      correctAnswer: 1,
      explanation: "A Segunda Lei de Newton e F = m x a.",
      topic: "Mecanica",
      institution: "Poliedro",
      year: 2024
    },
    {
      text: "Qual e a velocidade da luz no vacuo?",
      options: ["300.000 m/s", "300.000 km/s", "3.000 km/s", "30.000 m/s", "3.000.000 m/s"],
      correctAnswer: 1,
      explanation: "A velocidade da luz no vacuo e aproximadamente 300.000 km/s.",
      topic: "Optica",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e a unidade de medida de energia no Sistema Internacional?",
      options: ["Newton", "Watt", "Joule", "Pascal", "Hertz"],
      correctAnswer: 2,
      explanation: "O Joule (J) e a unidade de energia.",
      topic: "Termodinamica",
      institution: "Bernoulli",
      year: 2024
    },
    {
      text: "Qual e o ponto de ebulicao da agua ao nivel do mar?",
      options: ["0°C", "50°C", "100°C", "150°C", "200°C"],
      correctAnswer: 2,
      explanation: "A agua ferve a 100°C ao nivel do mar.",
      topic: "Termodinamica",
      institution: "SAS",
      year: 2024
    },
    {
      text: "Qual e a unidade de medida de forca no Sistema Internacional?",
      options: ["Quilograma", "Newton", "Joule", "Watt", "Pascal"],
      correctAnswer: 1,
      explanation: "O Newton (N) e a unidade de forca.",
      topic: "Mecanica",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e a formula da Segunda Lei de Newton?",
      options: ["F = m/a", "F = m x a", "F = a/m", "F = m + a", "F = m - a"],
      correctAnswer: 1,
      explanation: "A Segunda Lei de Newton e F = m x a.",
      topic: "Mecanica",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e a velocidade da luz no vacuo?",
      options: ["300.000 m/s", "300.000 km/s", "3.000 km/s", "30.000 m/s", "3.000.000 m/s"],
      correctAnswer: 1,
      explanation: "A velocidade da luz no vacuo e aproximadamente 300.000 km/s.",
      topic: "Optica",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e a unidade de medida de energia no Sistema Internacional?",
      options: ["Newton", "Watt", "Joule", "Pascal", "Hertz"],
      correctAnswer: 2,
      explanation: "O Joule (J) e a unidade de energia.",
      topic: "Termodinamica",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e o ponto de ebulicao da agua ao nivel do mar?",
      options: ["0°C", "50°C", "100°C", "150°C", "200°C"],
      correctAnswer: 2,
      explanation: "A agua ferve a 100°C ao nivel do mar.",
      topic: "Termodinamica",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e a unidade de medida de forca no Sistema Internacional?",
      options: ["Quilograma", "Newton", "Joule", "Watt", "Pascal"],
      correctAnswer: 1,
      explanation: "O Newton (N) e a unidade de forca.",
      topic: "Mecanica",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e a formula da Segunda Lei de Newton?",
      options: ["F = m/a", "F = m x a", "F = a/m", "F = m + a", "F = m - a"],
      correctAnswer: 1,
      explanation: "A Segunda Lei de Newton e F = m x a.",
      topic: "Mecanica",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e a velocidade da luz no vacuo?",
      options: ["300.000 m/s", "300.000 km/s", "3.000 km/s", "30.000 m/s", "3.000.000 m/s"],
      correctAnswer: 1,
      explanation: "A velocidade da luz no vacuo e aproximadamente 300.000 km/s.",
      topic: "Optica",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e a unidade de medida de energia no Sistema Internacional?",
      options: ["Newton", "Watt", "Joule", "Pascal", "Hertz"],
      correctAnswer: 2,
      explanation: "O Joule (J) e a unidade de energia.",
      topic: "Termodinamica",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e o ponto de ebulicao da agua ao nivel do mar?",
      options: ["0°C", "50°C", "100°C", "150°C", "200°C"],
      correctAnswer: 2,
      explanation: "A agua ferve a 100°C ao nivel do mar.",
      topic: "Termodinamica",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e a unidade de medida de forca no Sistema Internacional?",
      options: ["Quilograma", "Newton", "Joule", "Watt", "Pascal"],
      correctAnswer: 1,
      explanation: "O Newton (N) e a unidade de forca.",
      topic: "Mecanica",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e a formula da Segunda Lei de Newton?",
      options: ["F = m/a", "F = m x a", "F = a/m", "F = m + a", "F = m - a"],
      correctAnswer: 1,
      explanation: "A Segunda Lei de Newton e F = m x a.",
      topic: "Mecanica",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e a velocidade da luz no vacuo?",
      options: ["300.000 m/s", "300.000 km/s", "3.000 km/s", "30.000 m/s", "3.000.000 m/s"],
      correctAnswer: 1,
      explanation: "A velocidade da luz no vacuo e aproximadamente 300.000 km/s.",
      topic: "Optica",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e a unidade de medida de energia no Sistema Internacional?",
      options: ["Newton", "Watt", "Joule", "Pascal", "Hertz"],
      correctAnswer: 2,
      explanation: "O Joule (J) e a unidade de energia.",
      topic: "Termodinamica",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e o ponto de ebulicao da agua ao nivel do mar?",
      options: ["0°C", "50°C", "100°C", "150°C", "200°C"],
      correctAnswer: 2,
      explanation: "A agua ferve a 100°C ao nivel do mar.",
      topic: "Termodinamica",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e a unidade de medida de forca no Sistema Internacional?",
      options: ["Quilograma", "Newton", "Joule", "Watt", "Pascal"],
      correctAnswer: 1,
      explanation: "O Newton (N) e a unidade de forca.",
      topic: "Mecanica",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual e a formula da Segunda Lei de Newton?",
      options: ["F = m/a", "F = m x a", "F = a/m", "F = m + a", "F = m - a"],
      correctAnswer: 1,
      explanation: "A Segunda Lei de Newton e F = m x a.",
      topic: "Mecanica",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual e a velocidade da luz no vacuo?",
      options: ["300.000 m/s", "300.000 km/s", "3.000 km/s", "30.000 m/s", "3.000.000 m/s"],
      correctAnswer: 1,
      explanation: "A velocidade da luz no vacuo e aproximadamente 300.000 km/s.",
      topic: "Optica",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual e a unidade de medida de energia no Sistema Internacional?",
      options: ["Newton", "Watt", "Joule", "Pascal", "Hertz"],
      correctAnswer: 2,
      explanation: "O Joule (J) e a unidade de energia.",
      topic: "Termodinamica",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual e o ponto de ebulicao da agua ao nivel do mar?",
      options: ["0°C", "50°C", "100°C", "150°C", "200°C"],
      correctAnswer: 2,
      explanation: "A agua ferve a 100°C ao nivel do mar.",
      topic: "Termodinamica",
      institution: "SAS",
      year: 2021
    }
  ],
  "qui": [
    {
      text: "Qual e o numero atomico do oxigenio?",
      options: ["6", "7", "8", "9", "10"],
      correctAnswer: 2,
      explanation: "O numero atomico do oxigenio e 8.",
      topic: "Quimica Geral",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e a formula molecular da agua?",
      options: ["H2O", "H2O2", "H3O", "HO", "H2O3"],
      correctAnswer: 0,
      explanation: "A formula molecular da agua e H2O.",
      topic: "Quimica Geral",
      institution: "Poliedro",
      year: 2024
    },
    {
      text: "Qual e o pH da agua pura?",
      options: ["5", "6", "7", "8", "9"],
      correctAnswer: 2,
      explanation: "O pH da agua pura e 7, o que a torna neutra.",
      topic: "Quimica Analitica",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e o numero de eletrons na camada de valencia do carbono?",
      options: ["2", "3", "4", "5", "6"],
      correctAnswer: 2,
      explanation: "O carbono possui 4 eletrons na camada de valencia.",
      topic: "Quimica Geral",
      institution: "Bernoulli",
      year: 2024
    },
    {
      text: "Qual e a massa atomica do carbono?",
      options: ["10", "11", "12", "13", "14"],
      correctAnswer: 2,
      explanation: "A massa atomica do carbono e aproximadamente 12 u.m.a.",
      topic: "Quimica Geral",
      institution: "SAS",
      year: 2024
    },
    {
      text: "Qual e o numero atomico do oxigenio?",
      options: ["6", "7", "8", "9", "10"],
      correctAnswer: 2,
      explanation: "O numero atomico do oxigenio e 8.",
      topic: "Quimica Geral",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e a formula molecular da agua?",
      options: ["H2O", "H2O2", "H3O", "HO", "H2O3"],
      correctAnswer: 0,
      explanation: "A formula molecular da agua e H2O.",
      topic: "Quimica Geral",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e o pH da agua pura?",
      options: ["5", "6", "7", "8", "9"],
      correctAnswer: 2,
      explanation: "O pH da agua pura e 7, o que a torna neutra.",
      topic: "Quimica Analitica",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e o numero de eletrons na camada de valencia do carbono?",
      options: ["2", "3", "4", "5", "6"],
      correctAnswer: 2,
      explanation: "O carbono possui 4 eletrons na camada de valencia.",
      topic: "Quimica Geral",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e a massa atomica do carbono?",
      options: ["10", "11", "12", "13", "14"],
      correctAnswer: 2,
      explanation: "A massa atomica do carbono e aproximadamente 12 u.m.a.",
      topic: "Quimica Geral",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e o numero atomico do oxigenio?",
      options: ["6", "7", "8", "9", "10"],
      correctAnswer: 2,
      explanation: "O numero atomico do oxigenio e 8.",
      topic: "Quimica Geral",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e a formula molecular da agua?",
      options: ["H2O", "H2O2", "H3O", "HO", "H2O3"],
      correctAnswer: 0,
      explanation: "A formula molecular da agua e H2O.",
      topic: "Quimica Geral",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e o pH da agua pura?",
      options: ["5", "6", "7", "8", "9"],
      correctAnswer: 2,
      explanation: "O pH da agua pura e 7, o que a torna neutra.",
      topic: "Quimica Analitica",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e o numero de eletrons na camada de valencia do carbono?",
      options: ["2", "3", "4", "5", "6"],
      correctAnswer: 2,
      explanation: "O carbono possui 4 eletrons na camada de valencia.",
      topic: "Quimica Geral",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e a massa atomica do carbono?",
      options: ["10", "11", "12", "13", "14"],
      correctAnswer: 2,
      explanation: "A massa atomica do carbono e aproximadamente 12 u.m.a.",
      topic: "Quimica Geral",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e o numero atomico do oxigenio?",
      options: ["6", "7", "8", "9", "10"],
      correctAnswer: 2,
      explanation: "O numero atomico do oxigenio e 8.",
      topic: "Quimica Geral",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e a formula molecular da agua?",
      options: ["H2O", "H2O2", "H3O", "HO", "H2O3"],
      correctAnswer: 0,
      explanation: "A formula molecular da agua e H2O.",
      topic: "Quimica Geral",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e o pH da agua pura?",
      options: ["5", "6", "7", "8", "9"],
      correctAnswer: 2,
      explanation: "O pH da agua pura e 7, o que a torna neutra.",
      topic: "Quimica Analitica",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e o numero de eletrons na camada de valencia do carbono?",
      options: ["2", "3", "4", "5", "6"],
      correctAnswer: 2,
      explanation: "O carbono possui 4 eletrons na camada de valencia.",
      topic: "Quimica Geral",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e a massa atomica do carbono?",
      options: ["10", "11", "12", "13", "14"],
      correctAnswer: 2,
      explanation: "A massa atomica do carbono e aproximadamente 12 u.m.a.",
      topic: "Quimica Geral",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e o numero atomico do oxigenio?",
      options: ["6", "7", "8", "9", "10"],
      correctAnswer: 2,
      explanation: "O numero atomico do oxigenio e 8.",
      topic: "Quimica Geral",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual e a formula molecular da agua?",
      options: ["H2O", "H2O2", "H3O", "HO", "H2O3"],
      correctAnswer: 0,
      explanation: "A formula molecular da agua e H2O.",
      topic: "Quimica Geral",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual e o pH da agua pura?",
      options: ["5", "6", "7", "8", "9"],
      correctAnswer: 2,
      explanation: "O pH da agua pura e 7, o que a torna neutra.",
      topic: "Quimica Analitica",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual e o numero de eletrons na camada de valencia do carbono?",
      options: ["2", "3", "4", "5", "6"],
      correctAnswer: 2,
      explanation: "O carbono possui 4 eletrons na camada de valencia.",
      topic: "Quimica Geral",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual e a massa atomica do carbono?",
      options: ["10", "11", "12", "13", "14"],
      correctAnswer: 2,
      explanation: "A massa atomica do carbono e aproximadamente 12 u.m.a.",
      topic: "Quimica Geral",
      institution: "SAS",
      year: 2021
    }
  ],
  "red": [
    {
      text: "Qual e o objetivo principal de uma redacao dissertativa?",
      options: ["Contar uma historia", "Descrever um lugar", "Argumentar sobre um tema e defender uma posicao", "Instruir como fazer algo", "Relatar um evento"],
      correctAnswer: 2,
      explanation: "A redacao dissertativa tem como objetivo argumentar.",
      topic: "Redacao",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e a estrutura basica de uma redacao dissertativa?",
      options: ["Introducao, desenvolvimento e conclusao", "Apenas desenvolvimento", "Introducao e conclusao", "Desenvolvimento e conclusao", "Apenas introducao"],
      correctAnswer: 0,
      explanation: "A estrutura basica e: introducao, desenvolvimento e conclusao.",
      topic: "Redacao",
      institution: "Poliedro",
      year: 2024
    },
    {
      text: "Qual e a funcao da introducao em uma redacao?",
      options: ["Apresentar os argumentos principais", "Apresentar o tema e a tese", "Concluir o texto", "Descrever detalhes", "Contar uma historia"],
      correctAnswer: 1,
      explanation: "A introducao deve apresentar o tema e a tese de forma clara.",
      topic: "Redacao",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e a funcao do desenvolvimento em uma redacao?",
      options: ["Apresentar o tema", "Apresentar argumentos que sustentam a tese", "Concluir o texto", "Fazer uma pergunta", "Contar uma historia"],
      correctAnswer: 1,
      explanation: "O desenvolvimento deve apresentar argumentos que sustentam a tese.",
      topic: "Redacao",
      institution: "Bernoulli",
      year: 2024
    },
    {
      text: "Qual e a funcao da conclusao em uma redacao?",
      options: ["Introduzir novos argumentos", "Fazer uma pergunta", "Sintetizar as ideias e reafirmar a tese", "Contar uma historia", "Descrever um lugar"],
      correctAnswer: 2,
      explanation: "A conclusao deve sintetizar as ideias e reafirmar a tese.",
      topic: "Redacao",
      institution: "SAS",
      year: 2024
    },
    {
      text: "Qual e o objetivo principal de uma redacao dissertativa?",
      options: ["Contar uma historia", "Descrever um lugar", "Argumentar sobre um tema e defender uma posicao", "Instruir como fazer algo", "Relatar um evento"],
      correctAnswer: 2,
      explanation: "A redacao dissertativa tem como objetivo argumentar.",
      topic: "Redacao",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e a estrutura basica de uma redacao dissertativa?",
      options: ["Introducao, desenvolvimento e conclusao", "Apenas desenvolvimento", "Introducao e conclusao", "Desenvolvimento e conclusao", "Apenas introducao"],
      correctAnswer: 0,
      explanation: "A estrutura basica e: introducao, desenvolvimento e conclusao.",
      topic: "Redacao",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e a funcao da introducao em uma redacao?",
      options: ["Apresentar os argumentos principais", "Apresentar o tema e a tese", "Concluir o texto", "Descrever detalhes", "Contar uma historia"],
      correctAnswer: 1,
      explanation: "A introducao deve apresentar o tema e a tese de forma clara.",
      topic: "Redacao",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e a funcao do desenvolvimento em uma redacao?",
      options: ["Apresentar o tema", "Apresentar argumentos que sustentam a tese", "Concluir o texto", "Fazer uma pergunta", "Contar uma historia"],
      correctAnswer: 1,
      explanation: "O desenvolvimento deve apresentar argumentos que sustentam a tese.",
      topic: "Redacao",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e a funcao da conclusao em uma redacao?",
      options: ["Introduzir novos argumentos", "Fazer uma pergunta", "Sintetizar as ideias e reafirmar a tese", "Contar uma historia", "Descrever um lugar"],
      correctAnswer: 2,
      explanation: "A conclusao deve sintetizar as ideias e reafirmar a tese.",
      topic: "Redacao",
      institution: "ENEM",
      year: 2024
    },
    {
      text: "Qual e o objetivo principal de uma redacao dissertativa?",
      options: ["Contar uma historia", "Descrever um lugar", "Argumentar sobre um tema e defender uma posicao", "Instruir como fazer algo", "Relatar um evento"],
      correctAnswer: 2,
      explanation: "A redacao dissertativa tem como objetivo argumentar.",
      topic: "Redacao",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e a estrutura basica de uma redacao dissertativa?",
      options: ["Introducao, desenvolvimento e conclusao", "Apenas desenvolvimento", "Introducao e conclusao", "Desenvolvimento e conclusao", "Apenas introducao"],
      correctAnswer: 0,
      explanation: "A estrutura basica e: introducao, desenvolvimento e conclusao.",
      topic: "Redacao",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e a funcao da introducao em uma redacao?",
      options: ["Apresentar os argumentos principais", "Apresentar o tema e a tese", "Concluir o texto", "Descrever detalhes", "Contar uma historia"],
      correctAnswer: 1,
      explanation: "A introducao deve apresentar o tema e a tese de forma clara.",
      topic: "Redacao",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e a funcao do desenvolvimento em uma redacao?",
      options: ["Apresentar o tema", "Apresentar argumentos que sustentam a tese", "Concluir o texto", "Fazer uma pergunta", "Contar uma historia"],
      correctAnswer: 1,
      explanation: "O desenvolvimento deve apresentar argumentos que sustentam a tese.",
      topic: "Redacao",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e a funcao da conclusao em uma redacao?",
      options: ["Introduzir novos argumentos", "Fazer uma pergunta", "Sintetizar as ideias e reafirmar a tese", "Contar uma historia", "Descrever um lugar"],
      correctAnswer: 2,
      explanation: "A conclusao deve sintetizar as ideias e reafirmar a tese.",
      topic: "Redacao",
      institution: "Poliedro",
      year: 2023
    },
    {
      text: "Qual e o objetivo principal de uma redacao dissertativa?",
      options: ["Contar uma historia", "Descrever um lugar", "Argumentar sobre um tema e defender uma posicao", "Instruir como fazer algo", "Relatar um evento"],
      correctAnswer: 2,
      explanation: "A redacao dissertativa tem como objetivo argumentar.",
      topic: "Redacao",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e a estrutura basica de uma redacao dissertativa?",
      options: ["Introducao, desenvolvimento e conclusao", "Apenas desenvolvimento", "Introducao e conclusao", "Desenvolvimento e conclusao", "Apenas introducao"],
      correctAnswer: 0,
      explanation: "A estrutura basica e: introducao, desenvolvimento e conclusao.",
      topic: "Redacao",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e a funcao da introducao em uma redacao?",
      options: ["Apresentar os argumentos principais", "Apresentar o tema e a tese", "Concluir o texto", "Descrever detalhes", "Contar uma historia"],
      correctAnswer: 1,
      explanation: "A introducao deve apresentar o tema e a tese de forma clara.",
      topic: "Redacao",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e a funcao do desenvolvimento em uma redacao?",
      options: ["Apresentar o tema", "Apresentar argumentos que sustentam a tese", "Concluir o texto", "Fazer uma pergunta", "Contar uma historia"],
      correctAnswer: 1,
      explanation: "O desenvolvimento deve apresentar argumentos que sustentam a tese.",
      topic: "Redacao",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e a funcao da conclusao em uma redacao?",
      options: ["Introduzir novos argumentos", "Fazer uma pergunta", "Sintetizar as ideias e reafirmar a tese", "Contar uma historia", "Descrever um lugar"],
      correctAnswer: 2,
      explanation: "A conclusao deve sintetizar as ideias e reafirmar a tese.",
      topic: "Redacao",
      institution: "Bernoulli",
      year: 2022
    },
    {
      text: "Qual e o objetivo principal de uma redacao dissertativa?",
      options: ["Contar uma historia", "Descrever um lugar", "Argumentar sobre um tema e defender uma posicao", "Instruir como fazer algo", "Relatar um evento"],
      correctAnswer: 2,
      explanation: "A redacao dissertativa tem como objetivo argumentar.",
      topic: "Redacao",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual e a estrutura basica de uma redacao dissertativa?",
      options: ["Introducao, desenvolvimento e conclusao", "Apenas desenvolvimento", "Introducao e conclusao", "Desenvolvimento e conclusao", "Apenas introducao"],
      correctAnswer: 0,
      explanation: "A estrutura basica e: introducao, desenvolvimento e conclusao.",
      topic: "Redacao",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual e a funcao da introducao em uma redacao?",
      options: ["Apresentar os argumentos principais", "Apresentar o tema e a tese", "Concluir o texto", "Descrever detalhes", "Contar uma historia"],
      correctAnswer: 1,
      explanation: "A introducao deve apresentar o tema e a tese de forma clara.",
      topic: "Redacao",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual e a funcao do desenvolvimento em uma redacao?",
      options: ["Apresentar o tema", "Apresentar argumentos que sustentam a tese", "Concluir o texto", "Fazer uma pergunta", "Contar uma historia"],
      correctAnswer: 1,
      explanation: "O desenvolvimento deve apresentar argumentos que sustentam a tese.",
      topic: "Redacao",
      institution: "SAS",
      year: 2021
    },
    {
      text: "Qual e a funcao da conclusao em uma redacao?",
      options: ["Introduzir novos argumentos", "Fazer uma pergunta", "Sintetizar as ideias e reafirmar a tese", "Contar uma historia", "Descrever um lugar"],
      correctAnswer: 2,
      explanation: "A conclusao deve sintetizar as ideias e reafirmar a tese.",
      topic: "Redacao",
      institution: "SAS",
      year: 2021
    }
  ],
};

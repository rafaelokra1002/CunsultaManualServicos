export interface DiagnosticTest {
  padrao: string;
  localizacao: string;
  tipo: string;
}

export interface DiagnosticCode {
  code: string;
  name: string;
  note?: string;
  tests: DiagnosticTest[];
}

export interface ModelVariant {
  yearRange: string;
  yearStart: number;
  yearEnd: number;
  codes: DiagnosticCode[];
}

export interface MotorcycleModel {
  name: string;
  variants: ModelVariant[];
}

// Siglas: AL=Alimentação, CC=Curto Circuito, CA=Circuito Aberto, SN=Sinal, RS=Resistência, PR=Pressão, VZ=Vazão, PV=Pico, VS=Vácuo

export const motorcycleModels: MotorcycleModel[] = [
  // ==================== BIZ 110 ====================
  {
    name: "BIZ 110",
    variants: [
      {
        yearRange: "2016 - 2017",
        yearStart: 2016,
        yearEnd: 2017,
        codes: [
          {
            code: "7 PISCADAS MIL",
            name: "EOT",
            tests: [
              { padrao: "4,75 - 5,25 V", localizacao: "Am/Az+ | Terra-", tipo: "AL" },
              { padrao: "Contín. (N)", localizacao: "Am/Az | Terra", tipo: "CC" },
              { padrao: "2,5 - 2,8 kΩ", localizacao: "Am/Az | Vd/Bc", tipo: "RS" },
              { padrao: "Contín. (S)", localizacao: "Am/Az | Pino 24", tipo: "CA" },
              { padrao: "Contín. (S)", localizacao: "Vd/Bc | Pino 4", tipo: "CA" },
              { padrao: "2,70 - 3,10 V", localizacao: "Pino 4- | Pino 24+", tipo: "SN" },
            ],
          },
          {
            code: "8 PISCADAS MIL",
            name: "TPS",
            tests: [
              { padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra-", tipo: "AL" },
              { padrao: "0,29 - 0,71 V", localizacao: "Am | Vd/Bc", tipo: "SN" },
              { padrao: "4,13 - 4,76 V", localizacao: "Am | Vd/Bc", tipo: "SN" },
              { padrao: "Contín. (N)", localizacao: "Am | Terra", tipo: "CC" },
              { padrao: "Contín. (S)", localizacao: "Vd/Bc | Pino 4", tipo: "CA" },
              { padrao: "Contín. (S)", localizacao: "Am | Pino 5", tipo: "CA" },
              { padrao: "Contín. (S)", localizacao: "Am/Vm | Pino 6", tipo: "CA" },
            ],
          },
          {
            code: "12 PISCADAS MIL",
            name: "BICO INJETOR",
            tests: [
              { padrao: "Volt. Bat. - 1,1V", localizacao: "Pt/Az | Terra", tipo: "AL" },
              { padrao: "Contín. (N)", localizacao: "Rs/Bc | Terra", tipo: "CC" },
              { padrao: "Contín. (S)", localizacao: "Rs/Bc | Pino 16", tipo: "CA" },
              { padrao: "11 - 13 Ω |24ºC", localizacao: "Teste no Atuador", tipo: "RS" },
            ],
          },
          {
            code: "21 PISCADAS MIL",
            name: "SENSOR OXIGÊNIO",
            note: "Aqueça a moto até 80ºC",
            tests: [
              { padrao: "Contín. (N)", localizacao: "Pt/Bc | Terra", tipo: "CC" },
              { padrao: "Contín. (S)", localizacao: "Pt/Bc | Pino 3", tipo: "CA" },
              { padrao: "0,1 á 0,9V Osc.", localizacao: "Pt/Bc | Terra", tipo: "SN" },
            ],
          },
          {
            code: "BOMBA DE COMBUSTÍVEL",
            name: "BOMBA",
            tests: [
              { padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az+ | Terra", tipo: "AL" },
              { padrao: "3,0 bar", localizacao: "Manômetro", tipo: "PR" },
              { padrao: "Min.82 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" },
              { padrao: "Pulso", localizacao: "Mr", tipo: "PV" },
            ],
          },
          {
            code: "CIRCUITO DA MIL",
            name: "MIL ACESA DIRETA",
            tests: [
              { padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" },
            ],
          },
          {
            code: "CIRCUITO DA MIL",
            name: "MIL NÃO ACENDE",
            tests: [
              { padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" },
            ],
          },
        ],
      },
      {
        yearRange: "2018 - 2024",
        yearStart: 2018,
        yearEnd: 2024,
        codes: [
          {
            code: "7 PISCADAS MIL",
            name: "EOT",
            tests: [
              { padrao: "4,75 - 5,25 V", localizacao: "Am/Az+ | Terra-", tipo: "AL" },
              { padrao: "Contín. (N)", localizacao: "Am/Az | Terra", tipo: "CC" },
              { padrao: "2,5 - 2,8 kΩ", localizacao: "Am/Az | Vd/Bc", tipo: "RS" },
              { padrao: "Contín. (S)", localizacao: "Am/Az | Pino 24", tipo: "CA" },
              { padrao: "Contín. (S)", localizacao: "Vd/Bc | Pino 4", tipo: "CA" },
              { padrao: "2,70 - 3,10 V", localizacao: "Pino 4- | Pino 24+", tipo: "SN" },
            ],
          },
          {
            code: "8 PISCADAS MIL",
            name: "TPS",
            tests: [
              { padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra-", tipo: "AL" },
              { padrao: "0,29 - 0,71 V", localizacao: "Am | Vd/Bc", tipo: "SN" },
              { padrao: "4,13 - 4,76 V", localizacao: "Am | Vd/Bc", tipo: "SN" },
              { padrao: "Contín. (N)", localizacao: "Am | Terra", tipo: "CC" },
              { padrao: "Contín. (S)", localizacao: "Vd/Bc | Pino 31", tipo: "CA" },
              { padrao: "Contín. (S)", localizacao: "Am | Pino 5", tipo: "CA" },
              { padrao: "Contín. (S)", localizacao: "Am/Vm | Pino 6", tipo: "CA" },
            ],
          },
          {
            code: "12 PISCADAS MIL",
            name: "BICO INJETOR",
            tests: [
              { padrao: "Volt. Bat. - 1,1V", localizacao: "Pt/Az | Terra", tipo: "AL" },
              { padrao: "Contín. (N)", localizacao: "Rs/Bc | Terra", tipo: "CC" },
              { padrao: "Contín. (S)", localizacao: "Rs/Bc | Pino 16", tipo: "CA" },
              { padrao: "11 - 13 Ω |24ºC", localizacao: "Teste no Atuador", tipo: "RS" },
            ],
          },
          {
            code: "21 PISCADAS MIL",
            name: "SENSOR OXIGÊNIO",
            note: "Aqueça a moto até 80ºC",
            tests: [
              { padrao: "Contín. (N)", localizacao: "Pt/Bc | Terra", tipo: "CC" },
              { padrao: "Contín. (S)", localizacao: "Pt/Bc | Pino 3", tipo: "CA" },
              { padrao: "0,1 á 0,9 V Osc.", localizacao: "Pt/Bc | Terra", tipo: "SN" },
            ],
          },
          {
            code: "BOMBA DE COMBUSTÍVEL",
            name: "BOMBA",
            tests: [
              { padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az+ | Terra", tipo: "AL" },
              { padrao: "3,0 bar", localizacao: "Manômetro", tipo: "PR" },
              { padrao: "Min.82 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" },
              { padrao: "Pulso", localizacao: "Mr", tipo: "PV" },
            ],
          },
          {
            code: "CIRCUITO DA MIL",
            name: "MIL ACESA DIRETA",
            tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }],
          },
          {
            code: "CIRCUITO DA MIL",
            name: "MIL NÃO ACENDE",
            tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }],
          },
        ],
      },
    ],
  },
  // ==================== POP 110 ====================
  {
    name: "POP 110",
    variants: [
      {
        yearRange: "2015 - 2024",
        yearStart: 2015,
        yearEnd: 2024,
        codes: [
          { code: "7 PISCADAS MIL", name: "EOT", tests: [
            { padrao: "4,75 - 5,25 V", localizacao: "Am/Az+ | Terra-", tipo: "AL" },
            { padrao: "Contín. (N)", localizacao: "Am/Az | Terra", tipo: "CC" },
            { padrao: "2,5 - 2,8 kΩ", localizacao: "Am/Az | Vd/Bc", tipo: "RS" },
            { padrao: "Contín. (S)", localizacao: "Am/Az | Pino 24", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Vd/Bc | Pino 4", tipo: "CA" },
            { padrao: "2,70 - 3,10 V", localizacao: "Pino 4- | Pino 24+", tipo: "SN" },
          ]},
          { code: "8 PISCADAS MIL", name: "TPS", tests: [
            { padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra-", tipo: "AL" },
            { padrao: "0,29 - 0,71 V", localizacao: "Am | Vd/Bc", tipo: "SN" },
            { padrao: "4,13 - 4,76 V", localizacao: "Am | Vd/Bc", tipo: "SN" },
            { padrao: "Contín. (N)", localizacao: "Am | Terra", tipo: "CC" },
            { padrao: "Contín. (S)", localizacao: "Vd/Bc | Pino 4", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Am | Pino 5", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Am/Vm | Pino 6", tipo: "CA" },
          ]},
          { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [
            { padrao: "Volt. Bat. - 1,1V", localizacao: "Pt/Az | Terra", tipo: "AL" },
            { padrao: "Contín. (N)", localizacao: "Rs/Bc | Terra", tipo: "CC" },
            { padrao: "Contín. (S)", localizacao: "Rs/Bc | Pino 16", tipo: "CA" },
            { padrao: "11 - 13 Ω |24ºC", localizacao: "Teste no Atuador", tipo: "RS" },
          ]},
          { code: "21 PISCADAS MIL", name: "SENSOR OXIGÊNIO", note: "Aqueça a moto até 80ºC", tests: [
            { padrao: "Contín. (N)", localizacao: "Pt/Bc | Terra", tipo: "CC" },
            { padrao: "Contín. (S)", localizacao: "Pt/Bc | Pino 3", tipo: "CA" },
            { padrao: "0,1 á 0,9 V Osc.", localizacao: "Pt/Bc | Terra", tipo: "SN" },
          ]},
          { code: "54 PISCADAS", name: "BAS", tests: [
            { padrao: "4,75 - 5,25 V", localizacao: "Am/Vm + | Vd/Bc -", tipo: "AL" },
            { padrao: "Contín. (N)", localizacao: "Vm/Az | Terra", tipo: "CC" },
            { padrao: "5,04 V - 7,19 V", localizacao: "Vm/Az | Terra", tipo: "SN" },
            { padrao: "0,4 V - 0,84 V", localizacao: "Vm/Az | Terra", tipo: "SN" },
            { padrao: "Contín. (S)", localizacao: "Pino 6 | Am/Vm", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Pino 4 | Vd/Bc", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Pino 26 | Vm/Az", tipo: "CA" },
          ]},
          { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [
            { padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az+ | Terra", tipo: "AL" },
            { padrao: "3,0 bar", localizacao: "Manômetro", tipo: "PR" },
            { padrao: "Min. 82 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" },
            { padrao: "Pulso", localizacao: "Mr", tipo: "PV" },
          ]},
          { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [
            { padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" },
          ]},
          { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [
            { padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" },
          ]},
        ],
      },
      {
        yearRange: "2025 - 2026",
        yearStart: 2025,
        yearEnd: 2026,
        codes: [
          { code: "1 PISCADA MIL", name: "MAP", tests: [
            { padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra-", tipo: "AL" },
            { padrao: "Contín. (N)", localizacao: "Az/Pt | Terra", tipo: "CC" },
            { padrao: "2,60 - 3,20 V", localizacao: "Az/Pt + | Vd/Bc -", tipo: "SN" },
            { padrao: "3,80 - 5,25 V", localizacao: "Az/Pt + | Vd/Bc -", tipo: "VS" },
            { padrao: "Contín. (S)", localizacao: "Vd/Bc | Pino 32", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Az/Pt | Pino 27", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Am/Vm | Pino 6", tipo: "CA" },
          ]},
          { code: "7 PISCADAS MIL", name: "EOT", tests: [
            { padrao: "4,75 - 5,25 V", localizacao: "Am/Az+ | Terra-", tipo: "AL" },
            { padrao: "Contín. (N)", localizacao: "Am/Az | Terra", tipo: "CC" },
            { padrao: "2,5 - 2,8 kΩ", localizacao: "Am/Az | Vd/Bc", tipo: "RS" },
            { padrao: "Contín. (S)", localizacao: "Am/Az | Pino 24", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Vd/Bc | Pino 4", tipo: "CA" },
            { padrao: "2,70 - 3,10 V", localizacao: "Pino 4- | Pino 24+", tipo: "SN" },
          ]},
          { code: "8 PISCADAS MIL", name: "TPS", tests: [
            { padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra-", tipo: "AL" },
            { padrao: "0,29 - 0,71 V", localizacao: "Am | Vd/Bc", tipo: "SN" },
            { padrao: "4,13 - 4,76 V", localizacao: "Am | Vd/Bc", tipo: "SN" },
            { padrao: "Contín. (N)", localizacao: "Am | Terra", tipo: "CC" },
            { padrao: "Contín. (S)", localizacao: "Vd/Bc | Pino 32", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Am | Pino 5", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Am/Vm | Pino 6", tipo: "CA" },
          ]},
          { code: "9 PISCADAS MIL", name: "IAT", tests: [
            { padrao: "4,75 - 5,25 V", localizacao: "Bc/Vd + | Terra-", tipo: "AL" },
            { padrao: "Contín. (N)", localizacao: "Bc/Vd | Terra", tipo: "CC" },
            { padrao: "2,70 - 3,10 V", localizacao: "Bc/Vd + | Vd/Bc -", tipo: "SN" },
            { padrao: "Contín. (S)", localizacao: "Vd/Bc | Pino 32", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Am | Pino 5", tipo: "CA" },
            { padrao: "1 - 4 kΩ |20ºC", localizacao: "Bc/Vd | Vd/Bc", tipo: "RS" },
          ]},
          { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [
            { padrao: "Volt. Bat. - 1,1V", localizacao: "Pt/Lr| Terra", tipo: "AL" },
            { padrao: "Contín. (N)", localizacao: "Rs/Bc | Terra", tipo: "CC" },
            { padrao: "Contín. (S)", localizacao: "Rs/Bc | Pino 16", tipo: "CA" },
            { padrao: "11 - 13 Ω |20ºC", localizacao: "Teste no Atuador", tipo: "RS" },
            { padrao: "Pulso", localizacao: "Rs/Bc", tipo: "PV" },
          ]},
          { code: "19 PISCADAS MIL", name: "CKP", tests: [
            { padrao: "Contín. (N)", localizacao: "Az/Am| Terra", tipo: "CC" },
            { padrao: "Contín. (N)", localizacao: "Bc/Am | Terra", tipo: "CC" },
            { padrao: "Contín. (S)", localizacao: "Az/Am| Pino 12", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Bc/Am| Pino 23", tipo: "CA" },
            { padrao: "0,7 V", localizacao: "Az/Am | Bc/Am", tipo: "PV" },
          ]},
          { code: "21 PISCADAS MIL", name: "SENSOR OXIGÊNIO", note: "Aqueça a moto até 80ºC", tests: [
            { padrao: "Contín. (N)", localizacao: "Pt/Bc | Terra", tipo: "CC" },
            { padrao: "Contín. (S)", localizacao: "Pt/Bc | Pino 3", tipo: "CA" },
            { padrao: "0,1 á 0,9 V Osc.", localizacao: "Pt/Bc | Terra", tipo: "SN" },
          ]},
          { code: "54 PISCADAS", name: "BAS", tests: [
            { padrao: "4,75 - 5,25 V", localizacao: "Am/Vm + | Vd/Bc -", tipo: "AL" },
            { padrao: "Contín. (N)", localizacao: "Pt/Az | Terra", tipo: "CC" },
            { padrao: "5,04 V - 7,19 V", localizacao: "Pt/Az | Terra", tipo: "SN" },
            { padrao: "0,4 V - 0,84 V", localizacao: "Pt/Az | Terra", tipo: "SN" },
            { padrao: "Contín. (S)", localizacao: "Pino 6 | Am/Vm", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Pino 31 | Vd/Bc", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Pino 26 | Pt/Az", tipo: "CA" },
          ]},
          { code: "82 PISCADAS", name: "VÁLVULA MARCHA RÁPIDA", tests: [
            { padrao: "Volt. Bateria", localizacao: "Pt/Lr | Terra", tipo: "AL" },
            { padrao: "Contín. (N)", localizacao: "Am/Pt | Terra", tipo: "CC" },
            { padrao: "Contín. (S)", localizacao: "Am/Pt | Pino 28", tipo: "CA" },
            { padrao: "30 á 34 Ω 20 °C", localizacao: "A - B", tipo: "RS" },
            { padrao: "Pico (S)", localizacao: "Am/Pt", tipo: "PV" },
          ]},
          { code: "88 PISCADAS", name: "VÁLVULA EVAP", tests: [
            { padrao: "Volt. Bateria", localizacao: "Pt/Lr | Terra", tipo: "AL" },
            { padrao: "Contín. (N)", localizacao: "Pt/Az | Terra", tipo: "CC" },
            { padrao: "Contín. (S)", localizacao: "Pt/Az | Pino 22", tipo: "CA" },
            { padrao: "22 á 26 Ω 20 °C", localizacao: "A - B", tipo: "RS" },
            { padrao: "Pico (S)", localizacao: "Pt/Az", tipo: "PV" },
          ]},
          { code: "91 PISCADAS", name: "BOBINA IGNIÇÃO", tests: [
            { padrao: "Volt. Bateria", localizacao: "Pt/Lr | Terra", tipo: "AL" },
            { padrao: "Contín. (N)", localizacao: "Rs/Az | Terra", tipo: "CC" },
            { padrao: "Contín. (S)", localizacao: "Rs/Az | Pino 11", tipo: "CA" },
          ]},
          { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [
            { padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Lr + | Terra", tipo: "AL" },
            { padrao: "2,5 - 3,3 bar", localizacao: "Manômetro", tipo: "PR" },
            { padrao: "Min. 82 ml | 10s", localizacao: "Girar Ignição 5x", tipo: "VZ" },
            { padrao: "Pulso", localizacao: "Mr", tipo: "PV" },
          ]},
          { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [
            { padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" },
          ]},
          { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [
            { padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" },
          ]},
        ],
      },
    ],
  },
  // ==================== LEAD 110 ====================
  {
    name: "LEAD 110",
    variants: [
      {
        yearRange: "2009 - 2010", yearStart: 2009, yearEnd: 2010,
        codes: [
          { code: "1 PISCADA MIL", name: "MAP", tests: [
            { padrao: "4,75 - 5,25 V", localizacao: "Am/Lr+ | Terra -", tipo: "AL" },
            { padrao: "Contín. (N)", localizacao: "Am/Vm | Terra", tipo: "CC" },
            { padrao: "2,70 - 3,10 V", localizacao: "Am/Vm + | Vd/Lr -", tipo: "SN" },
            { padrao: "3,80 - 5,25 V", localizacao: "Am/Vm + | Vd/Lr -", tipo: "VS" },
            { padrao: "Contín. (S)", localizacao: "Vd/Lr| Pino 4", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Am/Lr | Pino 6", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Am/Vm | Pino 27", tipo: "CA" },
          ]},
          { code: "7 PISCADAS MIL", name: "ECT", tests: [
            { padrao: "4,75 - 5,25 V", localizacao: "Rs/Bc + | Vd/Lr -", tipo: "AL" },
            { padrao: "Contín. (N)", localizacao: "Rs/Bc | Terra", tipo: "CC" },
            { padrao: "2,3 - 2,6 kΩ", localizacao: "A + B", tipo: "RS" },
            { padrao: "Contín. (S)", localizacao: "Rs/Bc | Pino 24", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Vd/Lr | Pino 4", tipo: "CA" },
            { padrao: "2,70 - 3,10 V", localizacao: "Pino 4- | Pino 24+", tipo: "SN" },
          ]},
          { code: "8 PISCADAS MIL", name: "TPS", tests: [
            { padrao: "4,75 - 5,25 V", localizacao: "Am/Lr + | Vd/Lr -", tipo: "AL" },
            { padrao: "0,40 - 0,60 V", localizacao: "Bc/Vm| Vd/Lr", tipo: "SN" },
            { padrao: "4,20 - 4,80 V", localizacao: "Bc/Vm| Vd/Lr", tipo: "SN" },
            { padrao: "Contín. (N)", localizacao: "Bc/Vm | Terra", tipo: "CC" },
            { padrao: "Contín. (S)", localizacao: "Vd/Lr | Pino 4", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Bc/Vm | Pino 5", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Am/Lr | Pino 6", tipo: "CA" },
          ]},
          { code: "9 PISCADAS MIL", name: "IAT", tests: [
            { padrao: "4,75 - 5,25 V", localizacao: "Bc/Az + | Terra-", tipo: "AL" },
            { padrao: "Contín. (N)", localizacao: "Bc/Az | Terra", tipo: "CC" },
            { padrao: "2,70 - 3,10 V", localizacao: "Bc/Az + | Vd/Lr -", tipo: "SN" },
            { padrao: "Contín. (S)", localizacao: "Vd/Lr | Pino 4", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Bc/Az | Pino 14", tipo: "CA" },
            { padrao: "1 - 4 kΩ |20ºC", localizacao: "Bc/Az | Vd/Lr", tipo: "RS" },
          ]},
          { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [
            { padrao: "Volt. Bat. - 1,1V", localizacao: "Pt/Bc| Terra", tipo: "AL" },
            { padrao: "Contín. (N)", localizacao: "Rs/Az | Terra", tipo: "CC" },
            { padrao: "Contín. (S)", localizacao: "Rs/Az | Pino 16", tipo: "CA" },
            { padrao: "9 - 13 Ω |20ºC", localizacao: "Teste no Atuador", tipo: "RS" },
            { padrao: "Pulso", localizacao: "Rs/Az", tipo: "PV" },
          ]},
          { code: "21 PISCADAS MIL", name: "SENSOR OXIGÊNIO", note: "Aqueça a moto até 80ºC", tests: [
            { padrao: "Contín. (N)", localizacao: "Pt/Lr | Terra", tipo: "CC" },
            { padrao: "Contín. (S)", localizacao: "Pt/Lr | Pino 3", tipo: "CA" },
            { padrao: "0,1 á 0,9 V Osc.", localizacao: "Pt/Lr | Terra", tipo: "SN" },
          ]},
          { code: "29 PISCADAS", name: "IACV", tests: [
            { padrao: "Contín. (N)", localizacao: "Vc/Vm|Cz/Vm|Mr/Vm|Pt/Vm", tipo: "CC" },
            { padrao: "Contín. (S)", localizacao: "Pino 21 | Vc/Vm", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Pino 32 | Cz/Vm", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Pino 31 | Pt/Vm", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Pino 20 | Mr/Vm", tipo: "CA" },
            { padrao: "110 - 150 Ω", localizacao: "A + D", tipo: "RS" },
            { padrao: "110 - 150 Ω", localizacao: "B + C", tipo: "RS" },
            { padrao: "Contín. (N)", localizacao: "A + B", tipo: "CC" },
            { padrao: "Contín. (N)", localizacao: "C + D", tipo: "CC" },
          ]},
          { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [
            { padrao: "Volt.Bat.-1,1V", localizacao: "Mr + | Terra -", tipo: "AL" },
            { padrao: "3,0 bar", localizacao: "Manômetro", tipo: "PR" },
            { padrao: "Min. 14 ml | 10s", localizacao: "Girar Ignição 5x", tipo: "VZ" },
            { padrao: "Pulso", localizacao: "Mr", tipo: "PV" },
          ]},
          { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [
            { padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" },
          ]},
          { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [
            { padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" },
          ]},
        ],
      },
      {
        yearRange: "2011", yearStart: 2011, yearEnd: 2011,
        codes: [
          { code: "1 PISCADA MIL", name: "MAP", tests: [
            { padrao: "4,75 - 5,25 V", localizacao: "Am/Lr+ | Terra -", tipo: "AL" },
            { padrao: "Contín. (N)", localizacao: "Am/Vm | Terra", tipo: "CC" },
            { padrao: "2,70 - 3,10 V", localizacao: "Am/Vm + | Vd/Lr -", tipo: "SN" },
            { padrao: "3,80 - 5,25 V", localizacao: "Am/Vm + | Vd/Lr -", tipo: "VS" },
            { padrao: "Contín. (S)", localizacao: "Vd/Lr| Pino 4", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Am/Lr | Pino 6", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Am/Vm | Pino 27", tipo: "CA" },
          ]},
          { code: "7 PISCADAS MIL", name: "ECT", tests: [
            { padrao: "4,75 - 5,25 V", localizacao: "Rs/Bc + | Vd/Lr -", tipo: "AL" },
            { padrao: "Contín. (N)", localizacao: "Rs/Bc | Terra", tipo: "CC" },
            { padrao: "2,3 - 2,6 kΩ", localizacao: "A + B", tipo: "RS" },
            { padrao: "Contín. (S)", localizacao: "Rs/Bc | Pino 24", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Vd/Lr | Pino 4", tipo: "CA" },
            { padrao: "2,70 - 3,10 V", localizacao: "Pino 4- | Pino 24+", tipo: "SN" },
          ]},
          { code: "8 PISCADAS MIL", name: "TPS", tests: [
            { padrao: "4,75 - 5,25 V", localizacao: "Am/Lr + | Vd/Lr -", tipo: "AL" },
            { padrao: "0,40 - 0,60 V", localizacao: "Bc/Vm| Vd/Lr", tipo: "SN" },
            { padrao: "4,20 - 4,80 V", localizacao: "Bc/Vm| Vd/Lr", tipo: "SN" },
            { padrao: "Contín. (N)", localizacao: "Bc/Vm | Terra", tipo: "CC" },
            { padrao: "Contín. (S)", localizacao: "Vd/Lr | Pino 4", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Bc/Vm | Pino 5", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Am/Lr | Pino 6", tipo: "CA" },
          ]},
          { code: "9 PISCADAS MIL", name: "IAT", tests: [
            { padrao: "4,75 - 5,25 V", localizacao: "Bc/Az + | Terra-", tipo: "AL" },
            { padrao: "Contín. (N)", localizacao: "Bc/Az | Terra", tipo: "CC" },
            { padrao: "2,70 - 3,10 V", localizacao: "Bc/Az + | Vd/Lr -", tipo: "SN" },
            { padrao: "Contín. (S)", localizacao: "Vd/Lr | Pino 4", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Bc/Az | Pino 14", tipo: "CA" },
            { padrao: "1 - 4 kΩ |20ºC", localizacao: "Bc/Az | Vd/Lr", tipo: "RS" },
          ]},
          { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [
            { padrao: "Volt. Bat. - 1,1V", localizacao: "Pt/Bc| Terra", tipo: "AL" },
            { padrao: "Contín. (N)", localizacao: "Rs/Az | Terra", tipo: "CC" },
            { padrao: "Contín. (S)", localizacao: "Rs/Az | Pino 16", tipo: "CA" },
            { padrao: "9 - 13 Ω |20ºC", localizacao: "Teste no Atuador", tipo: "RS" },
            { padrao: "Pulso", localizacao: "Rs/Az", tipo: "PV" },
          ]},
          { code: "21 PISCADAS MIL", name: "SENSOR OXIGÊNIO", note: "Aqueça a moto até 80ºC", tests: [
            { padrao: "Contín. (N)", localizacao: "Pt/Lr | Terra", tipo: "CC" },
            { padrao: "Contín. (S)", localizacao: "Pt/Lr | Pino 3", tipo: "CA" },
            { padrao: "0,1 á 0,9 V Osc.", localizacao: "Pt/Lr | Terra", tipo: "SN" },
          ]},
          { code: "29 PISCADAS", name: "IACV", tests: [
            { padrao: "Contín. (N)", localizacao: "Vc/Vm|Cz/Vm|Mr/Vm|Pt/Vm", tipo: "CC" },
            { padrao: "Contín. (S)", localizacao: "Pino 21 | Vc/Vm", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Pino 32 | Cz/Vm", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Pino 31 | Pt/Vm", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Pino 20 | Mr/Vm", tipo: "CA" },
            { padrao: "110 - 150 Ω", localizacao: "A + D", tipo: "RS" },
            { padrao: "110 - 150 Ω", localizacao: "B + C", tipo: "RS" },
            { padrao: "Contín. (N)", localizacao: "A + B", tipo: "CC" },
            { padrao: "Contín. (N)", localizacao: "C + D", tipo: "CC" },
          ]},
          { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [
            { padrao: "Volt.Bat.-1,1V", localizacao: "Pt + | Terra -", tipo: "AL" },
            { padrao: "3,0 bar", localizacao: "Manômetro", tipo: "PR" },
            { padrao: "Min. 14 ml | 10s", localizacao: "Girar Ignição 5x", tipo: "VZ" },
            { padrao: "Pulso", localizacao: "Mr/Pt", tipo: "PV" },
          ]},
          { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [
            { padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" },
          ]},
          { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [
            { padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" },
          ]},
        ],
      },
      {
        yearRange: "2012 - 2014", yearStart: 2012, yearEnd: 2014,
        codes: [
          { code: "1 PISCADA MIL", name: "MAP", tests: [
            { padrao: "4,75 - 5,25 V", localizacao: "Am/Lr+ | Terra -", tipo: "AL" },
            { padrao: "Contín. (N)", localizacao: "Am/Vm | Terra", tipo: "CC" },
            { padrao: "2,70 - 3,10 V", localizacao: "Am/Vm + | Vd/Lr -", tipo: "SN" },
            { padrao: "3,80 - 5,25 V", localizacao: "Am/Vm + | Vd/Lr -", tipo: "VS" },
            { padrao: "Contín. (S)", localizacao: "Vd/Lr| Pino 4", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Am/Lr | Pino 6", tipo: "CA" },
            { padrao: "Contín. (S)", localizacao: "Am/Vm | Pino 27", tipo: "CA" },
          ]},
          { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [
            { padrao: "Volt. Bat. - 1,1V", localizacao: "Pt| Terra", tipo: "AL" },
            { padrao: "Contín. (N)", localizacao: "Rs/Az | Terra", tipo: "CC" },
            { padrao: "Contín. (S)", localizacao: "Rs/Az | Pino 16", tipo: "CA" },
            { padrao: "11 - 13 Ω |20ºC", localizacao: "Teste no Atuador", tipo: "RS" },
            { padrao: "Pulso", localizacao: "Rs/Az", tipo: "PV" },
          ]},
          { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [
            { padrao: "Volt.Bat.-1,1V", localizacao: "Pt + | Terra -", tipo: "AL" },
            { padrao: "3,0 bar", localizacao: "Manômetro", tipo: "PR" },
            { padrao: "Min. 14 ml | 10s", localizacao: "Girar Ignição 5x", tipo: "VZ" },
            { padrao: "Pulso", localizacao: "Mr/Pt", tipo: "PV" },
          ]},
          { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [
            { padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" },
          ]},
          { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [
            { padrao: "Acende a Mil", localizacao: "Pino 22 | Terra jumper", tipo: "AL" },
          ]},
        ],
      },
    ],
  },
  // ==================== BIZ 125 ====================
  {
    name: "BIZ 125",
    variants: [
      { yearRange: "2009 - 2010", yearStart: 2009, yearEnd: 2010, codes: [
        { code: "1 PISCADA MIL", name: "MAP", tests: [
          { padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" },
          { padrao: "Contín. (N)", localizacao: "Vc/Am | Terra", tipo: "CC" },
          { padrao: "2,70 - 3,10 V", localizacao: "Vc/Am + | Vd/Bc -", tipo: "SN" },
          { padrao: "3,80 - 5,25 V", localizacao: "Vc/Am + | Vd/Bc -", tipo: "VS" },
          { padrao: "Contín. (S)", localizacao: "Vd/Bc| Pino 4", tipo: "CA" },
          { padrao: "Contín. (S)", localizacao: "Am/Vm | Pino 6", tipo: "CA" },
          { padrao: "Contín. (S)", localizacao: "Vc/Am | Pino 27", tipo: "CA" },
        ]},
        { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [
          { padrao: "Volt. Bat. - 1,1V", localizacao: "Pt/Az| Terra", tipo: "AL" },
          { padrao: "Contín. (N)", localizacao: "Rs/Bc | Terra", tipo: "CC" },
          { padrao: "Contín. (S)", localizacao: "Rs/Bc | Pino 16", tipo: "CA" },
          { padrao: "9 - 12 Ω |20ºC", localizacao: "Teste no Atuador", tipo: "RS" },
          { padrao: "Pulso", localizacao: "Rs/Bc", tipo: "PV" },
        ]},
        { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [
          { padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az + | Terra -", tipo: "AL" },
          { padrao: "3,0 bar", localizacao: "Manômetro", tipo: "PR" },
          { padrao: "Min.14 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" },
          { padrao: "Pulso", localizacao: "Mr", tipo: "PV" },
        ]},
        { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
        { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
      ]},
      { yearRange: "2011 - 2015", yearStart: 2011, yearEnd: 2015, codes: [
        { code: "1 PISCADA MIL", name: "MAP", tests: [
          { padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" },
          { padrao: "Contín. (N)", localizacao: "Vc/Am | Terra", tipo: "CC" },
          { padrao: "2,70 - 3,10 V", localizacao: "Vc/Am + | Vd/Bc -", tipo: "SN" },
          { padrao: "3,80 - 5,25 V", localizacao: "Vc/Am + | Vd/Bc -", tipo: "VS" },
        ]},
        { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [
          { padrao: "Volt. Bat.- 1,1V", localizacao: "Pt/Az| Terra", tipo: "AL" },
          { padrao: "Contín. (N)", localizacao: "Rs/Bc | Terra", tipo: "CC" },
          { padrao: "Contín. (S)", localizacao: "Rs/Bc | Pino 16", tipo: "CA" },
          { padrao: "9 - 12 Ω |20ºC", localizacao: "Teste no Atuador", tipo: "RS" },
        ]},
        { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [
          { padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az + | Terra -", tipo: "AL" },
          { padrao: "3,0 bar", localizacao: "Manômetro", tipo: "PR" },
          { padrao: "Min. 55 ml |10s", localizacao: "Girar Ignição 5x", tipo: "VZ" },
          { padrao: "Pulso", localizacao: "Mr", tipo: "PV" },
        ]},
        { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
        { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
      ]},
      { yearRange: "2016 - 2017", yearStart: 2016, yearEnd: 2017, codes: [
        { code: "1 PISCADA MIL", name: "MAP", tests: [
          { padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" },
          { padrao: "Contín. (N)", localizacao: "Vc/Am | Terra", tipo: "CC" },
          { padrao: "2,70 - 3,10 V", localizacao: "Vc/Am + | Vd/Bc -", tipo: "SN" },
          { padrao: "3,80 - 5,25 V", localizacao: "Vc/Am + | Vd/Bc -", tipo: "VS" },
        ]},
        { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [
          { padrao: "Volt. Bat.- 1,1V", localizacao: "Pt/Az| Terra", tipo: "AL" },
          { padrao: "Contín. (N)", localizacao: "Rs/Bc | Terra", tipo: "CC" },
          { padrao: "Contín. (S)", localizacao: "Rs/Bc | Pino 16", tipo: "CA" },
          { padrao: "11 - 12 Ω |24ºC", localizacao: "Teste no Atuador", tipo: "RS" },
        ]},
        { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [
          { padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az + | Terra -", tipo: "AL" },
          { padrao: "2,6 - 3,2 bar", localizacao: "Manômetro", tipo: "PR" },
          { padrao: "Min.115 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" },
          { padrao: "Pulso", localizacao: "Mr", tipo: "PV" },
        ]},
        { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
        { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
      ]},
      { yearRange: "2018 - 2024", yearStart: 2018, yearEnd: 2024, codes: [
        { code: "1 PISCADA MIL", name: "MAP", tests: [
          { padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" },
          { padrao: "Contín. (N)", localizacao: "Vc/Am | Terra", tipo: "CC" },
          { padrao: "2,70 - 3,10 V", localizacao: "Vc/Am + | Vd/Bc -", tipo: "SN" },
          { padrao: "3,80 - 5,25 V", localizacao: "Vc/Am + | Vd/Bc -", tipo: "VS" },
        ]},
        { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [
          { padrao: "Volt. Bat.- 1,1V", localizacao: "Pt/Bc| Terra", tipo: "AL" },
          { padrao: "Contín. (N)", localizacao: "Rs/Bc | Terra", tipo: "CC" },
          { padrao: "Contín. (S)", localizacao: "Rs/Bc | Pino 16", tipo: "CA" },
          { padrao: "11 - 13 Ω |24ºC", localizacao: "Teste no Atuador", tipo: "RS" },
        ]},
        { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [
          { padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az + | Terra -", tipo: "AL" },
          { padrao: "2,6 - 3,2 bar", localizacao: "Manômetro", tipo: "PR" },
          { padrao: "Min.115 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" },
          { padrao: "Pulso", localizacao: "Mr", tipo: "PV" },
        ]},
        { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
        { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
      ]},
      { yearRange: "2025 - 2026", yearStart: 2025, yearEnd: 2026, codes: [
        { code: "1 PISCADA MIL", name: "MAP", tests: [
          { padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" },
          { padrao: "Contín. (N)", localizacao: "Vc/Am | Terra", tipo: "CC" },
          { padrao: "2,70 - 3,10 V", localizacao: "Vc/Am + | Vd/Bc -", tipo: "SN" },
          { padrao: "3,80 - 5,25 V", localizacao: "Vc/Am + | Vd/Bc -", tipo: "VS" },
        ]},
        { code: "19 PISCADAS MIL", name: "CKP", tests: [
          { padrao: "Contín. (N)", localizacao: "Az/Am| Terra", tipo: "CC" },
          { padrao: "Contín. (N)", localizacao: "Bc/Am | Terra", tipo: "CC" },
          { padrao: "Contín. (S)", localizacao: "Az/Am| Pino 12", tipo: "CA" },
          { padrao: "Contín. (S)", localizacao: "Bc/Am| Pino 23", tipo: "CA" },
          { padrao: "0,7 V", localizacao: "Az/Am | Bc/Am", tipo: "PV" },
        ]},
        { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [
          { padrao: "Volt. Bat.- 1,1V", localizacao: "Pt/Bc| Terra", tipo: "AL" },
          { padrao: "Contín. (N)", localizacao: "Rs/Bc | Terra", tipo: "CC" },
          { padrao: "Contín. (S)", localizacao: "Rs/Bc | Pino 16", tipo: "CA" },
          { padrao: "11 - 13 Ω |24ºC", localizacao: "Teste no Atuador", tipo: "RS" },
        ]},
        { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [
          { padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az + | Terra -", tipo: "AL" },
          { padrao: "2,5 - 3,5 bar", localizacao: "Manômetro", tipo: "PR" },
          { padrao: "Min. 76 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" },
          { padrao: "Pulso", localizacao: "Mr", tipo: "PV" },
        ]},
        { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
        { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
      ]},
    ],
  },
  // ==================== CG 125i FAN ====================
  { name: "CG 125i FAN", variants: [
    { yearRange: "2016 - 2018", yearStart: 2016, yearEnd: 2018, codes: [
      { code: "7 PISCADAS MIL", name: "EOT", tests: [
        { padrao: "4,75 - 5,25 V", localizacao: "Am/Az+ | Terra-", tipo: "AL" },
        { padrao: "Contín. (N)", localizacao: "Am/Az | Terra", tipo: "CC" },
        { padrao: "2,5 - 2,8 kΩ", localizacao: "Am/Az | Vd/Bc", tipo: "RS" },
        { padrao: "Contín. (S)", localizacao: "Am/Az | Pino 24", tipo: "CA" },
        { padrao: "Contín. (S)", localizacao: "Vd/Bc | Pino 4", tipo: "CA" },
        { padrao: "2,70 - 3,10 V", localizacao: "Pino 4- | Pino 24+", tipo: "SN" },
      ]},
      { code: "8 PISCADAS MIL", name: "TPS", tests: [
        { padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra-", tipo: "AL" },
        { padrao: "0,29 - 0,71 V", localizacao: "Am/Vd | Vd/Rs", tipo: "SN" },
        { padrao: "4,13 - 4,76 V", localizacao: "Am/Vd | Vd/Rs", tipo: "SN" },
        { padrao: "Contín. (N)", localizacao: "Am/Vd | Terra", tipo: "CC" },
        { padrao: "Contín. (S)", localizacao: "Vd/Rs | Pino 31", tipo: "CA" },
        { padrao: "Contín. (S)", localizacao: "Am/Vd | Pino 5", tipo: "CA" },
        { padrao: "Contín. (S)", localizacao: "Am/Vm | Pino 6", tipo: "CA" },
      ]},
      { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [
        { padrao: "Volt. Bat. - 1,1V", localizacao: "Pt/Az | Terra", tipo: "AL" },
        { padrao: "Contín. (N)", localizacao: "Rs/Bc | Terra", tipo: "CC" },
        { padrao: "Contín. (S)", localizacao: "Rs/Bc | Pino 16", tipo: "CA" },
        { padrao: "11 - 13 Ω |24ºC", localizacao: "Teste no Atuador", tipo: "RS" },
      ]},
      { code: "21 PISCADAS MIL", name: "SENSOR OXIGÊNIO", note: "Aqueça a moto até 80ºC", tests: [
        { padrao: "Contín. (N)", localizacao: "Pt/Bc | Terra", tipo: "CC" },
        { padrao: "Contín. (S)", localizacao: "Pt/Bc | Pino 3", tipo: "CA" },
        { padrao: "0,1 á 0,9 V Osc.", localizacao: "Pt/Bc | Terra", tipo: "SN" },
      ]},
      { code: "54 PISCADAS", name: "BAS", tests: [
        { padrao: "4,75 - 5,25 V", localizacao: "Am/Vm + | Vd/Az -", tipo: "AL" },
        { padrao: "Contín. (N)", localizacao: "Vm/Az | Terra", tipo: "CC" },
        { padrao: "5,25 V", localizacao: "Vm/Az | Terra", tipo: "SN" },
        { padrao: "0,5 V", localizacao: "Vm/Az | Terra", tipo: "SN" },
        { padrao: "Contín. (S)", localizacao: "Pino 6 | Am/Vm", tipo: "CA" },
        { padrao: "Contín. (S)", localizacao: "Pino 32 | Vd/Az", tipo: "CA" },
        { padrao: "Contín. (S)", localizacao: "Pino 26 | Vm/Az", tipo: "CA" },
      ]},
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [
        { padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az+ | Terra", tipo: "AL" },
        { padrao: "2,6 - 3,1 bar", localizacao: "Manômetro", tipo: "PR" },
        { padrao: "Min. 82 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" },
        { padrao: "Pulso", localizacao: "Mr", tipo: "PV" },
      ]},
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
  ]},
  // ==================== CG 125i CARGO ====================
  { name: "CG 125i CARGO", variants: [
    { yearRange: "2016 - 2018", yearStart: 2016, yearEnd: 2018, codes: [
      { code: "7 PISCADAS MIL", name: "EOT", tests: [
        { padrao: "4,75 - 5,25 V", localizacao: "Am/Az+ | Terra-", tipo: "AL" },
        { padrao: "Contín. (N)", localizacao: "Am/Az | Terra", tipo: "CC" },
        { padrao: "2,5 - 2,8 kΩ", localizacao: "Am/Az | Vd/Bc", tipo: "RS" },
      ]},
      { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [
        { padrao: "Volt. Bat. - 1,1V", localizacao: "Pt/Az | Terra", tipo: "AL" },
        { padrao: "Contín. (N)", localizacao: "Rs/Bc | Terra", tipo: "CC" },
        { padrao: "Contín. (S)", localizacao: "Rs/Bc | Pino 16", tipo: "CA" },
        { padrao: "11 - 13 Ω |24ºC", localizacao: "Teste no Atuador", tipo: "RS" },
      ]},
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [
        { padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az+ | Terra", tipo: "AL" },
        { padrao: "2,6 - 3,1 bar", localizacao: "Manômetro", tipo: "PR" },
        { padrao: "Min. 82 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" },
      ]},
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
  ]},
  // ==================== CG 150 FAN | TITAN ====================
  { name: "CG 150 FAN | TITAN", variants: [
    { yearRange: "2009 - 2010", yearStart: 2009, yearEnd: 2010, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [
        { padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" },
        { padrao: "Contín. (N)", localizacao: "Vc/Am | Terra", tipo: "CC" },
        { padrao: "2,70 - 3,10 V", localizacao: "Vc/Am + | Vd/Bc -", tipo: "SN" },
        { padrao: "3,80 - 5,25 V", localizacao: "Vc/Am + | Vd/Bc -", tipo: "VS" },
      ]},
      { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [
        { padrao: "Volt. Bat.- 1,1V", localizacao: "Pt/Bc| Terra", tipo: "AL" },
        { padrao: "Contín. (N)", localizacao: "Rs/Bc | Terra", tipo: "CC" },
        { padrao: "9 - 12 Ω |20 ºC", localizacao: "Teste no Atuador", tipo: "RS" },
      ]},
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [
        { padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az + | Terra -", tipo: "AL" },
        { padrao: "3,0 bar", localizacao: "Manômetro", tipo: "PR" },
        { padrao: "Min.120 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" },
      ]},
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
    { yearRange: "2011 - 2013", yearStart: 2011, yearEnd: 2013, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [
        { padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" },
        { padrao: "Contín. (N)", localizacao: "Vc/Am | Terra", tipo: "CC" },
      ]},
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [
        { padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az + | Terra -", tipo: "AL" },
        { padrao: "3,0 bar", localizacao: "Manômetro", tipo: "PR" },
        { padrao: "Min.120 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" },
      ]},
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
    { yearRange: "2014 - 2015", yearStart: 2014, yearEnd: 2015, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [
        { padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" },
        { padrao: "Contín. (N)", localizacao: "Vc/Am | Terra", tipo: "CC" },
      ]},
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [
        { padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az + | Terra -", tipo: "AL" },
        { padrao: "3,0 bar", localizacao: "Manômetro", tipo: "PR" },
        { padrao: "Min.120 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" },
      ]},
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
  ]},
  // ==================== CG 150 START ====================
  { name: "CG 150 START", variants: [
    { yearRange: "2015", yearStart: 2015, yearEnd: 2015, codes: [
      { code: "7 PISCADAS MIL", name: "EOT", tests: [
        { padrao: "4,75 - 5,25 V", localizacao: "Am/Az+ | Terra-", tipo: "AL" },
        { padrao: "Contín. (N)", localizacao: "Am/Az | Terra", tipo: "CC" },
        { padrao: "2,5 - 2,8 kΩ", localizacao: "Am/Az | Vd/Bc", tipo: "RS" },
      ]},
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [
        { padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az+ | Terra", tipo: "AL" },
        { padrao: "3,0 bar", localizacao: "Manômetro", tipo: "PR" },
        { padrao: "Min.120 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" },
      ]},
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
  ]},
  // ==================== CG 160 START ====================
  { name: "CG 160 START", variants: [
    { yearRange: "2016 - 2017", yearStart: 2016, yearEnd: 2017, codes: [
      { code: "7 PISCADAS MIL", name: "EOT", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Am/Az+ | Terra-", tipo: "AL" }, { padrao: "2,5 - 2,8 kΩ", localizacao: "Am/Az | Vd/Bc", tipo: "RS" }] },
      { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [{ padrao: "Volt. Bat. - 1,1V", localizacao: "Pt/Az | Terra", tipo: "AL" }, { padrao: "11 - 13 Ω |24ºC", localizacao: "Teste no Atuador", tipo: "RS" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az+ | Terra", tipo: "AL" }, { padrao: "2,6 - 3,2 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min.82 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
    { yearRange: "2018 - 2021", yearStart: 2018, yearEnd: 2021, codes: [
      { code: "7 PISCADAS MIL", name: "EOT", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Am/Az+ | Terra-", tipo: "AL" }, { padrao: "2,5 - 2,8 kΩ", localizacao: "Am/Az | Vd/Bc", tipo: "RS" }] },
      { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [{ padrao: "Volt. Bat. - 1,1V", localizacao: "Pt/Az | Terra", tipo: "AL" }, { padrao: "11 - 13 Ω |24ºC", localizacao: "Teste no Atuador", tipo: "RS" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az+ | Terra", tipo: "AL" }, { padrao: "2,6 - 3,2 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min.82 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
    { yearRange: "2022 - 2024", yearStart: 2022, yearEnd: 2024, codes: [
      { code: "7 PISCADAS MIL", name: "EOT", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Am/Az+ | Terra-", tipo: "AL" }, { padrao: "2,5 - 2,8 kΩ", localizacao: "Am/Az | Vd/Bc", tipo: "RS" }] },
      { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [{ padrao: "Volt. Bat. - 1,1V", localizacao: "Vm/Pt | Terra", tipo: "AL" }, { padrao: "11 - 13 Ω |24ºC", localizacao: "Teste no Atuador", tipo: "RS" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az+ | Terra", tipo: "AL" }, { padrao: "2,6 - 3,2 bar", localizacao: "Manômetro", tipo: "PR" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
    { yearRange: "2025 - 2026", yearStart: 2025, yearEnd: 2026, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" }, { padrao: "Contín. (N)", localizacao: "Vc/Am | Terra", tipo: "CC" }] },
      { code: "19 PISCADAS MIL", name: "CKP", tests: [{ padrao: "Contín. (N)", localizacao: "Az/Am| Terra", tipo: "CC" }, { padrao: "0,7 V", localizacao: "Az/Am | Bc/Am", tipo: "PV" }] },
      { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [{ padrao: "Volt. Bat.- 1,1V", localizacao: "Pt/Bc| Terra", tipo: "AL" }, { padrao: "11 - 13 Ω|20 ºC", localizacao: "Teste no Atuador", tipo: "RS" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az + | Terra -", tipo: "AL" }, { padrao: "2,6 - 3,6 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min.103 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "88 PISCADAS", name: "VÁLVULA EVAP", tests: [{ padrao: "Volt. Bateria", localizacao: "Pt/Vm | Terra", tipo: "AL" }, { padrao: "22 á 26 Ω 20°C", localizacao: "A - B", tipo: "RS" }] },
      { code: "91 PISCADAS", name: "BOBINA IGNIÇÃO", tests: [{ padrao: "Volt. Bateria", localizacao: "Pt/Vm | Terra", tipo: "AL" }, { padrao: "Contín. (N)", localizacao: "Rs/Az | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
  ]},
  // ==================== CG 160 FAN | TITAN ====================
  { name: "CG 160 FAN | TITAN", variants: [
    { yearRange: "2016 - 2017", yearStart: 2016, yearEnd: 2017, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" }] },
      { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [{ padrao: "Volt. Bat.- 1,1V", localizacao: "Pt/Az| Terra", tipo: "AL" }, { padrao: "11 - 13 Ω|20 ºC", localizacao: "Teste no Atuador", tipo: "RS" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az + | Terra -", tipo: "AL" }, { padrao: "2,5 - 3,4 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min. 82 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
    { yearRange: "2018 - 2021", yearStart: 2018, yearEnd: 2021, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" }] },
      { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [{ padrao: "Volt. Bat.- 1,1V", localizacao: "Pt/Az| Terra", tipo: "AL" }, { padrao: "11 - 13 Ω|20 ºC", localizacao: "Teste no Atuador", tipo: "RS" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az| Terra", tipo: "AL" }, { padrao: "2,5 - 3,4 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min. 82 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
    { yearRange: "2022 - 2024", yearStart: 2022, yearEnd: 2024, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" }] },
      { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [{ padrao: "Volt. Bat.- 1,1V", localizacao: "Vm/Pt| Terra", tipo: "AL" }, { padrao: "11 - 13 Ω|20 ºC", localizacao: "Teste no Atuador", tipo: "RS" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Vm/Pt + | Terra -", tipo: "AL" }, { padrao: "2,5 - 3,4 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min. 82 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
    { yearRange: "2025 - 2026", yearStart: 2025, yearEnd: 2026, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" }] },
      { code: "19 PISCADAS MIL", name: "CKP", tests: [{ padrao: "Contín. (N)", localizacao: "Az/Am| Terra", tipo: "CC" }, { padrao: "0,7 V", localizacao: "Az/Am | Bc/Am", tipo: "PV" }] },
      { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [{ padrao: "Volt. Bat.- 1,1V", localizacao: "Pt/Bc| Terra", tipo: "AL" }, { padrao: "11 - 13 Ω|20 ºC", localizacao: "Teste no Atuador", tipo: "RS" }] },
      { code: "88 PISCADAS", name: "VÁLVULA EVAP", tests: [{ padrao: "Volt. Bateria", localizacao: "Pt/Az | Terra", tipo: "AL" }, { padrao: "22 á 26 Ω 20°C", localizacao: "A - B", tipo: "RS" }] },
      { code: "91 PISCADAS", name: "BOBINA IGNIÇÃO", tests: [{ padrao: "Volt. Bateria", localizacao: "Pt/Az | Terra", tipo: "AL" }, { padrao: "Contín. (N)", localizacao: "Rs/Az | Terra", tipo: "CC" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az + | Terra -", tipo: "AL" }, { padrao: "2,5 - 3,4 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min.76 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
  ]},
  // ==================== NXR 150 BROS ====================
  { name: "NXR 150 BROS", variants: [
    { yearRange: "2009", yearStart: 2009, yearEnd: 2009, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az + | Terra -", tipo: "AL" }, { padrao: "2,7 - 3,2 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min. 82 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
    { yearRange: "2010 - 2014", yearStart: 2010, yearEnd: 2014, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az + | Terra -", tipo: "AL" }, { padrao: "3,0 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min.120 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
  ]},
  // ==================== NXR 160 BROS ====================
  { name: "NXR 160 BROS", variants: [
    { yearRange: "2015 - 2017", yearStart: 2015, yearEnd: 2017, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" }] },
      { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [{ padrao: "Volt. Bat.- 1,1V", localizacao: "Pt/Az| Terra", tipo: "AL" }, { padrao: "11 - 13 Ω|20 ºC", localizacao: "Teste no Atuador", tipo: "RS" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az + | Terra -", tipo: "AL" }, { padrao: "3,0 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min.115 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
    { yearRange: "2018 - 2021", yearStart: 2018, yearEnd: 2021, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az + | Terra -", tipo: "AL" }, { padrao: "3,0 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min.86 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
    { yearRange: "2022 - 2024", yearStart: 2022, yearEnd: 2024, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az + | Terra -", tipo: "AL" }, { padrao: "2,6 -3,2 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min. 86 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
    { yearRange: "2025 - 2026", yearStart: 2025, yearEnd: 2026, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" }] },
      { code: "19 PISCADAS MIL", name: "CKP", tests: [{ padrao: "Contín. (N)", localizacao: "Az/Am| Terra", tipo: "CC" }, { padrao: "0,7 V", localizacao: "Az/Am | Bc/Am", tipo: "PV" }] },
      { code: "88 PISCADAS", name: "VÁLVULA EVAP", tests: [{ padrao: "Volt. Bateria", localizacao: "Bl/W | Terra", tipo: "AL" }, { padrao: "22 á 26 Ω 20 °C", localizacao: "A - B", tipo: "RS" }] },
      { code: "91 PISCADAS", name: "BOBINA IGNIÇÃO", tests: [{ padrao: "Volt. Bateria", localizacao: "Pt/Az | Terra", tipo: "AL" }, { padrao: "Contín. (N)", localizacao: "Rs/Az | Terra", tipo: "CC" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az + | Terra -", tipo: "AL" }, { padrao: "2,8 - 3,0 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min.86 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
  ]},
  // ==================== XRE 190 ====================
  { name: "XRE 190", variants: [
    { yearRange: "2016 - 2024", yearStart: 2016, yearEnd: 2024, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" }] },
      { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [{ padrao: "Volt. Bat.- 1,1V", localizacao: "Pt/Az| Terra", tipo: "AL" }, { padrao: "9 - 12 Ω|20 ºC", localizacao: "Teste no Atuador", tipo: "RS" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az + | Terra -", tipo: "AL" }, { padrao: "2,6 - 3,2 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min. 98 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
    { yearRange: "2025 - 2026", yearStart: 2025, yearEnd: 2026, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" }] },
      { code: "19 PISCADAS MIL", name: "CKP", tests: [{ padrao: "Contín. (N)", localizacao: "Az/Am| Terra", tipo: "CC" }, { padrao: "0,7 V", localizacao: "Az/Am | Bc/Am", tipo: "PV" }] },
      { code: "88 PISCADAS", name: "VÁLVULA EVAP", tests: [{ padrao: "Volt. Bateria", localizacao: "Bl/R | Terra", tipo: "AL" }, { padrao: "22 á 26 Ω 20 °C", localizacao: "A - B", tipo: "RS" }] },
      { code: "91 PISCADAS", name: "BOBINA IGNIÇÃO", tests: [{ padrao: "Volt. Bateria", localizacao: "Pt/Az | Terra", tipo: "AL" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Pt/Az + | Terra -", tipo: "AL" }, { padrao: "2,6 - 3,2 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min. 98 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
  ]},
  // ==================== CB 250F TWISTER ====================
  { name: "CB 250F TWISTER", variants: [
    { yearRange: "2016 - 2022", yearStart: 2016, yearEnd: 2022, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" }] },
      { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [{ padrao: "Volt. Bat.- 1,1V", localizacao: "Pt/Vm| Terra", tipo: "AL" }, { padrao: "9 - 12 Ω|20 ºC", localizacao: "Teste no Atuador", tipo: "RS" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Mr/Am + | Terra -", tipo: "AL" }, { padrao: "2,6 - 3,2 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min. 98 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
  ]},
  // ==================== CB 300 ====================
  { name: "CB 300", variants: [
    { yearRange: "2009 - 2012", yearStart: 2009, yearEnd: 2012, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Mr/Am + | Terra -", tipo: "AL" }, { padrao: "3,5 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min. 50 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
    { yearRange: "2013 - 2015", yearStart: 2013, yearEnd: 2015, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Mr/Am + | Terra -", tipo: "AL" }, { padrao: "3,5 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min.232 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
  ]},
  // ==================== CB 300F ====================
  { name: "CB 300F", variants: [
    { yearRange: "2023 - 2024", yearStart: 2023, yearEnd: 2024, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Bc/Vm + | Terra -", tipo: "AL" }] },
      { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [{ padrao: "Volt. Bat.- 1,1V", localizacao: "Pt/Bc| Terra", tipo: "AL" }, { padrao: "9 - 12 Ω|20 ºC", localizacao: "Teste no Atuador", tipo: "RS" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Am + | Terra -", tipo: "AL" }, { padrao: "3,0 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min. 108 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
    { yearRange: "2025 - 2026", yearStart: 2025, yearEnd: 2026, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Bc/Vm + | Terra -", tipo: "AL" }] },
      { code: "19 PISCADAS MIL", name: "CKP", tests: [{ padrao: "Contín. (N)", localizacao: "Az/Am| Terra", tipo: "CC" }, { padrao: "0,7 V", localizacao: "Az/Am | Bc/Am", tipo: "PV" }] },
      { code: "88 PISCADAS", name: "VÁLVULA EVAP", tests: [{ padrao: "Volt. Bateria", localizacao: "Bl/W | Terra", tipo: "AL" }, { padrao: "22 á 26 Ω 20 °C", localizacao: "A - B", tipo: "RS" }] },
      { code: "91 PISCADAS", name: "BOBINA IGNIÇÃO", tests: [{ padrao: "Volt. Bateria", localizacao: "Pt/Bc | Terra", tipo: "AL" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Am + | Terra -", tipo: "AL" }, { padrao: "3,0 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min. 97 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
  ]},
  // ==================== XRE 300 ====================
  { name: "XRE 300", variants: [
    { yearRange: "2009 - 2012", yearStart: 2009, yearEnd: 2012, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Mr/Am + | Terra -", tipo: "AL" }, { padrao: "3,0 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min. 232 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
    { yearRange: "2013 - 2015", yearStart: 2013, yearEnd: 2015, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Mr/Am + | Terra -", tipo: "AL" }, { padrao: "3,5 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min. 125 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
    { yearRange: "2016 - 2023", yearStart: 2016, yearEnd: 2023, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Am/Vm+ | Terra -", tipo: "AL" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Mr/Am + | Terra -", tipo: "AL" }, { padrao: "3,1 - 3,7 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min. 232 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
  ]},
  // ==================== XRE 300 SAHARA ====================
  { name: "XRE 300 SAHARA", variants: [
    { yearRange: "2024", yearStart: 2024, yearEnd: 2024, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Lr+ | Terra -", tipo: "AL" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Am + | Terra -", tipo: "AL" }, { padrao: "3,0 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min. 108 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
    { yearRange: "2025 - 2026", yearStart: 2025, yearEnd: 2026, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Lr+ | Terra -", tipo: "AL" }] },
      { code: "19 PISCADAS MIL", name: "CKP", tests: [{ padrao: "Contín. (N)", localizacao: "Az| Terra", tipo: "CC" }, { padrao: "0,7 V", localizacao: "Az | Bc", tipo: "PV" }] },
      { code: "88 PISCADAS", name: "VÁLVULA EVAP", tests: [{ padrao: "Volt. Bateria", localizacao: "Bl | Terra", tipo: "AL" }, { padrao: "22 á 26 Ω 20 °C", localizacao: "A - B", tipo: "RS" }] },
      { code: "91 PISCADAS", name: "BOBINA IGNIÇÃO", tests: [{ padrao: "Volt. Bateria", localizacao: "Pt | Terra", tipo: "AL" }, { padrao: "Contín. (N)", localizacao: "Vd | Terra", tipo: "CC" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Am + | Terra -", tipo: "AL" }, { padrao: "3,0 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min. 108 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
  ]},
  // ==================== XRE 300 L TORNADO ====================
  { name: "XR 300L TORNADO", variants: [
    { yearRange: "2025 - 2026", yearStart: 2025, yearEnd: 2026, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Lr+ | Terra -", tipo: "AL" }] },
      { code: "19 PISCADAS MIL", name: "CKP", tests: [{ padrao: "Contín. (N)", localizacao: "Az| Terra", tipo: "CC" }, { padrao: "0,7 V", localizacao: "Az | Bc", tipo: "PV" }] },
      { code: "88 PISCADAS", name: "VÁLVULA EVAP", tests: [{ padrao: "Volt. Bateria", localizacao: "Bl | Terra", tipo: "AL" }, { padrao: "22 á 26 Ω 20 °C", localizacao: "A - B", tipo: "RS" }] },
      { code: "91 PISCADAS", name: "BOBINA IGNIÇÃO", tests: [{ padrao: "Volt. Bateria", localizacao: "Pt | Terra", tipo: "AL" }, { padrao: "Contín. (N)", localizacao: "Vd | Terra", tipo: "CC" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Am + | Terra -", tipo: "AL" }, { padrao: "2,7 - 3,9 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min. 136 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
      { code: "CIRCUITO DA MIL", name: "MIL ACESA DIRETA", tests: [{ padrao: "Contín. (N)", localizacao: "Pino 15 | Terra", tipo: "CC" }] },
      { code: "CIRCUITO DA MIL", name: "MIL NÃO ACENDE", tests: [{ padrao: "Acende a Mil", localizacao: "Pino 18 | Terra jumper", tipo: "AL" }] },
    ]},
  ]},
  // ==================== CRF 300F ====================
  { name: "CRF 300F", variants: [
    { yearRange: "2026", yearStart: 2026, yearEnd: 2026, codes: [
      { code: "1 PISCADA MIL", name: "MAP", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Vm/Am | Terra -", tipo: "AL" }, { padrao: "Contín. (N)", localizacao: "Vc/Am | Terra", tipo: "CC" }] },
      { code: "19 PISCADAS MIL", name: "CKP", tests: [{ padrao: "Contín. (N)", localizacao: "Az/Am| Terra", tipo: "CC" }, { padrao: "0,7 V", localizacao: "Az/Am | Bc/Am", tipo: "PV" }] },
      { code: "12 PISCADAS MIL", name: "BICO INJETOR", tests: [{ padrao: "Volt. Bat.- 1,1V", localizacao: "Pt| Terra", tipo: "AL" }, { padrao: "11 - 13 Ω|20 ºC", localizacao: "Teste no Atuador", tipo: "RS" }] },
      { code: "54 PISCADAS", name: "BAS", tests: [{ padrao: "4,75 - 5,25 V", localizacao: "Vm/Pt + | Terra -", tipo: "AL" }, { padrao: "3,6 V - 4,4 V", localizacao: "Mr | Terra", tipo: "SN" }, { padrao: "0,7 V - 1,3 V", localizacao: "Mr| Terra", tipo: "SN" }] },
      { code: "91 PISCADAS", name: "BOBINA IGNIÇÃO", tests: [{ padrao: "Volt. Bateria", localizacao: "Pt/Az | Terra", tipo: "AL" }, { padrao: "Contín. (N)", localizacao: "Pt/Vd | Terra", tipo: "CC" }] },
      { code: "BOMBA DE COMBUSTÍVEL", name: "BOMBA", tests: [{ padrao: "Volt.Bat.-1,1V", localizacao: "Y + | Terra -", tipo: "AL" }, { padrao: "2,5 - 3,4 bar", localizacao: "Manômetro", tipo: "PR" }, { padrao: "Min.97 ml|10s", localizacao: "Girar Ignição 5x", tipo: "VZ" }] },
    ]},
  ]},
];

// Legenda de siglas dos tipos de teste
export const testTypeLegend: Record<string, string> = {
  AL: "Teste de alimentação / entrada",
  CC: "Teste de curto circuito",
  CA: "Teste de circuito aberto",
  SN: "Teste de sinal / saída",
  RS: "Teste de resistência",
  PR: "Teste de pressão",
  VZ: "Teste de vazão",
  PV: "Teste de pico",
  VS: "Teste de vácuo",
};

// Legenda de abreviações
export const abbreviationLegend: Record<string, string> = {
  "(S)": "Resultado deve ser SIM",
  "(N)": "Resultado deve ser NÃO",
  "Contín.": "Teste de continuidade",
  "Volt. Bat": "Voltagem da bateria",
  "V": "Voltagem",
  "Osc.": "Oscilando entre o padrão estabelecido",
};

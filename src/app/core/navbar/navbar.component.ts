import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(){

  }

   items: MenuItem[];

  ngOnInit() {

    this.items = [

      {
          label: 'Cadastro Geral',
          icon: 'appmonitoramentoverificador',
          items: [
              {
                label: 'Empresa',
                routerLink: 'empresa/cadastro'
              },
              {separator: true},
              {
                label: 'Área Manejo Florestal(AMF)',
                routerLink: 'area/cadastro-area'
              },
              {separator: true},
              {
                label: 'Lista Especie',
                routerLink: '/cadniveldeavaliacao',

                items: [{
                  label: 'Mautenção da Lista Espécie',
                  icon:'pi pi-fw pi-cog',
                  routerLink: '/lista-especie'
                },
                {separator: true},
                {
                  label: 'Familia',
                  routerLink: '/cadastro-familia'
                },

                {
                  label: 'Genero',
                  routerLink: '/cadastro-genero'
                },
                {
                  label: 'Grupo Ecologico',
                  routerLink: '/cadastro-grupo-ecologico'
                },
                {
                  label: 'Uso da Espécie',
                  routerLink: '/cadastro-usoespecie'
                },
                {
                  label: 'Categoria Proteção',
                  routerLink: '/cadastro-categoria-protecao'
                }
              ]
              },
              {separator: true},
              {
                label: 'Equação',
                routerLink: '/cadamostragem'

              }
          ]
      },
      {
          label: 'Inventario Continuo',
          icon: 'pi pi-fw pi-clone',
          items: [
              {
                label: 'Tipo Parcela',
                routerLink: '/tipo-parcela'
              },
              {
                label: 'Classe Floresta',
                routerLink: '/associarverificador'
              },
              {
                label: 'Classe de Tamanho Individuo',
                routerLink: '/cadastro-classtamanhoindividuo'
              },
              {separator: true},
              {
                label: 'Situação Solvicultural',
                routerLink: '/cadastro-situacaosilvicultural'
              },
              {
                label: 'Tratamento anterior e Tratamento atual:',
                routerLink: '/cadastro-tsatualtsanterior'
              },
              {
                label: 'Classe de Indentificação do Fuste(CIF)',
                routerLink: '/unidadelocalsublocal'
              },
              {
                label: 'Dano',
                routerLink: '/modnivel4'
              },
              {
                label: 'Podridão',
                routerLink: '/modnivel4'
              },
              {
                label: 'Iluminação',
                routerLink: '/modnivel4'
              },
              {
                label: 'Forma da Copa',
                routerLink: '/modnivel4'
              },
              {
                label: 'Dano',
                routerLink: '/modnivel4'
              },
              {
                label: 'Copy',
                routerLink: '/modnivel4'
              },
              {separator: true},
              {
                label: 'Digitação e Verificação',
                icon: 'pi pi-fw pi-pencil',

              },
              {
                label: 'Impressão de Ficha de Campo',
                icon: 'pi pi-fw pi-print',
                routerLink: '/modmonitoramentotemplate',

              }

          ]
      },
      {
          label: 'Inventario Temporario',
          icon: 'pi pi-fw pi-clone',
          items: [
            {
              label: 'Cadastro',
              routerLink: '/appmonitoramento'
            },
            {separator: true},
            {
              label: 'Unidade de Amostra',
              routerLink: '/appmonitoramentoverificador'
            },
            {
              label: 'Tipo Amostra',
              routerLink: '/appavaliacao'
            },
            {
              label: 'Qualidade do Fuste',
              routerLink: '/appavaliacao'
            },
            {separator: true},
            {
            label: 'Digitação',
            icon: 'pi pi-fw pi-pencil',
          },

            {label: 'Impressão de Ficha de Campo',
            icon: 'pi pi-fw pi-print',
          }
        ]
      },
      {
          label: 'Manutenção de Dados',
          icon:'pi pi-fw pi-cog',
          items: [
            {label: 'Consulta a Base de Dados Definida',
            icon:'pi pi-fw pi-search'

          },
            {label: 'Painel de Controle',
            icon:'pi pi-fw pi-briefcase'

          },

        ]
      },

      {
        label: 'Relatorio',
        icon: 'pi pi-fw pi-chart-bar',
        items: [
            {
              label: 'Inventario Continuo',
              routerLink: '/cadempresa'
            },
            {
              label: 'Estrutura Fitossociológica',

              items: [{
                label: 'Similaridade',
                routerLink: '/modmonitoramentotemplate',

                items: [{
                  label: 'Similaridade entre Comunidades(Índisse de Jaccard/Morisita-Horns)',
                  routerLink: '/modmonitoramentotemplate'
                },
                {
                  label: 'Similaridade entre Comunidades(Índisse de Sorensen)',
                  routerLink: '/modverificadoresdomodelo'
                },

                {
                  label: 'Similaridades entre Classes e Tamanho(Índisse de Jaccard/Morisita-Horns)',
                  routerLink: '/modverificadoresdomodelo'
                }

             ],
          },
              {
                label: 'Associação Interespecifíca de Espécies',
                routerLink: '/modverificadoresdomodelo'
              },

              {
                label: 'Composição Florística',
                routerLink: '/modverificadoresdomodelo'
              },
              {
                label: 'Diversidade Florística(Índice de Shannon)',
                routerLink: '/modverificadoresdomodelo'
              },
              {
                label: 'Riqueza Florística',
                routerLink: '/modverificadoresdomodelo'
              },
              {
                label: 'Frequência e Distribuição das Espécies por Parcela ',
                routerLink: '/modverificadoresdomodelo'
              },

              {
                label: 'Frequência e Distribuição das Espécies por Parcela',
                routerLink: '/modverificadoresdomodelo'
              },

              {
                label: 'Distribuição Especial',
                routerLink: '/modverificadoresdomodelo'
              },

              {
                label: 'Distribuição Dinâmica',
                routerLink: '/modverificadoresdomodelo'
              },

              {
                label: 'Distribuição de N, G e V por Parcela',
                routerLink: '/modverificadoresdomodelo'
              },

              {
                label: 'Parâmetros Estrutural por Espécie',
                routerLink: '/modverificadoresdomodelo'
              }

            ],
              routerLink: '/cadtipodeverificador',
            },
            {
              label: 'Fases de Crescimento da Floresta',
              routerLink: '/cadniveldeavaliacao',

            },

            {
              label: 'Classes de Identificação do Fuste',
              routerLink: '/cadamostragem'

            },
            {
              label: 'Dinâmica da Floresta',
              routerLink: '/cadamostragem',

              items: [{
                label: 'Demografia',
                routerLink: '/modmonitoramentotemplate',

                items: [{
                  label: 'Mortalidade, Ingresso e Sobrevivência',
                  routerLink: '/modmonitoramentotemplate'
                },
                {
                  label: 'Mortalidade por Classe de Diâmetro',
                  routerLink: '/modverificadoresdomodelo'
                },
                {
                  label: 'Mortalidade (Sheil) e meia-vida por Espécie',
                  routerLink: '/modverificadoresdomodelo'
                }
              ],
              },
              {
                label: 'Incremento Periódico Anual',
                routerLink: '/modverificadoresdomodelo'
              }

            ],

            },
            {
              label: 'Análise Estatística',
              routerLink: '/cadamostragem'

            },
            {separator: true},
            {
              label: 'Inventário Temporário',
              routerLink: '/cadamostragem'

            },

            {
              label: 'Distribuição Diamétrica',
              routerLink: '/cadamostragem'

            },

            {
              label: 'Distribuição de N, G e V U.A',
              routerLink: '/cadamostragem'

            },

            {
              label: 'Ánalise Estática',
              routerLink: '/cadamostragem'

            }
        ]
    },

  ];
  }

  }

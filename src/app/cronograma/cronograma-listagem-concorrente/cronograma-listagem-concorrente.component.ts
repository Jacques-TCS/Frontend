import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Atividade } from 'src/app/shared/model/atividade';
import { Cronograma } from 'src/app/shared/model/cronograma';
import { CronogramaSeletor } from 'src/app/shared/model/seletor/cronograma.seletor';
import { Servico } from 'src/app/shared/model/servico';
import { Usuario } from 'src/app/shared/model/usuario';
import { CronogramaService } from 'src/app/shared/service/cronograma.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cronograma-listagem-concorrente',
  templateUrl: './cronograma-listagem-concorrente.component.html',
  styleUrls: ['./cronograma-listagem-concorrente.component.scss']
})
export class CronogramaListagemConcorrenteComponent implements OnInit {
  public cronograma: Cronograma = new Cronograma();
  public cronogramas: Array<Cronograma> = new Array();
  public servicos: Array<Servico> = new Array();
  public seletor: CronogramaSeletor = new CronogramaSeletor();
  public atividades: Atividade[];
  public usuario: Usuario = new Usuario();
  public usuarios: Array<Usuario> = new Array();

  public totalPaginas: number = 0;
  public readonly TAMANHO_PAGINA: number = 10;

  public mostrar: boolean;
  public esconder: boolean;

  public mostrarFiltros() {
    this.mostrar = !this.mostrar;
    this.esconder = !this.esconder;
  }

  public mostrarCronogramas: boolean;
  public esconderCronogramas: boolean;

  public mostrarListagemDeCronogramas() {
    this.mostrarCronogramas = !this.mostrarCronogramas;
    this.esconderCronogramas = !this.esconderCronogramas;
  }

  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(
    private cronogramaService: CronogramaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.seletor.limite = this.TAMANHO_PAGINA;
    // this.seletor.pagina = 0;
    // this.contarPaginas();
    // this.filtrarCronograma();
  }

  public contarPaginas() {
    this.cronogramaService.contarPaginas(this.seletor).subscribe(
      (resultado) => {
        this.totalPaginas = resultado;
      },
      (erro) => {
        console.error(erro);
      }
    );
  }

  criarArrayPaginas(): any[] {
    return Array(this.totalPaginas)
      .fill(0)
      .map((x, i) => i + 1);
  }

  buscarTodos() {
    this.cronogramaService.listarTodos().subscribe(
      (resultado) => {
        this.cronogramas = resultado;
      },
      (erro) => {
        console.log('Erro ao buscar cronogramas', erro);
      }
    );
  }

  public filtrarCronograma() {
    this.cronogramaService.listarComSeletor(this.seletor).subscribe(
      (resultado) => {
        this.cronogramas = resultado;
      },
      (erro) => {
        console.error(erro);
      }
    );
  }

  atualizarPaginacao() {
    this.contarPaginas();
    this.irParaPagina(0);
    this.filtrarCronograma();
  }

  avancarPagina() {
    this.seletor.pagina++;
    this.filtrarCronograma();
  }

  voltarPagina() {
    this.seletor.pagina--;
    this.filtrarCronograma();
  }

  irParaPagina(indicePagina: number) {
    this.seletor.pagina = indicePagina;
    this.filtrarCronograma();
  }

  //TODO Método para atribuir funcionário ao cronograma por meio da edição de um cronograma
  public atribuirFuncionario(idFuncionario: number) {
    this.router.navigate(['/cronograma/editar', idFuncionario]);
  }

  fileName = 'ExcleSheet.xlsx';
  exportarPlanilhaCronConcorrente() {
    let data = document.getElementById('tabela-ocorrencia');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Planilha');

    XLSX.writeFile(wb, this.fileName);
  }
}



import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Atividade } from 'src/app/shared/model/atividade';
import { AtividadeSeletor } from 'src/app/shared/model/seletor/atividade.seletor';
import { AtividadeService } from 'src/app/shared/service/atividade.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.scss']
})
export class AtividadeComponent implements OnInit {
  public atividade: Atividade = new Atividade();
  public seletor: AtividadeSeletor = new AtividadeSeletor();
  public atividades: Array<Atividade> = new Array();
  public atividadeId: number | null = null;
  public isDisplayed: boolean = false;

  public totalPaginas: number = 0;
  public readonly TAMANHO_PAGINA: number = 10;

  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(
    private atividadeService: AtividadeService,
    private router: Router,) { }

  ngOnInit(): void {
    this.seletor.limite = this.TAMANHO_PAGINA;
    this.seletor.pagina = 0;
    this.contarPaginas();
    this.filtrarAtividade();

    this.hideAnimatedDiv();
  }

  hideAnimatedDiv() {
    setTimeout(() => {
      this.isDisplayed = false;
    }, 5000);
  }

  public contarPaginas() {
    this.atividadeService.contarPaginas(this.seletor).subscribe(
      (resultado) => {
        this.totalPaginas = resultado;
      },
      (erro) => {
        Swal.fire(
          'Erro ao consultar total de páginas',
          erro.error.mensagem,
          'error'
        );
      }
    );
  }

  inserirAtividade(form: NgForm) {
    if (!form.invalid) {
      if (this.atividadeId !== null) {
        this.atividade.id = this.atividadeId;
        this.atividadeService.atualizar(this.atividade).subscribe(
          (sucesso) => {
            Swal.fire('Sucesso', 'atividade atualizada!', 'success');
          },
          (erro) => {
            Swal.fire('Erro', 'Erro ao atualizar atividade', 'error');
            console.error('Erro ao atualizar atividade:', erro);
          }
        );
      } else {
        this.atividadeService.inserir(this.atividade).subscribe(
          (sucesso) => {
            Swal.fire('Sucesso', 'atividade cadastrada!', 'success');
            this.atividade = new Atividade();
          },
          (erro) => {
            Swal.fire('Erro', 'Erro ao cadastrar atividade', 'error');
          }
        );
      }
    } else {
      this.isDisplayed = true;
      this.hideAnimatedDiv();
    }
  }

  filtrarAtividade() {
    this.atividadeService.listarComSeletor(this.seletor).subscribe(
      (resultado) => {
        this.atividades = resultado;
        this.contarPaginas();
        this.criarArrayPaginas();
      },
      (erro) => {
        console.log('Erro ao buscar atividades', erro);
      }
    );
  }

  editar(atividade: Atividade) {
    Swal.fire({
      title: 'Tem certeza de que deseja alterar o nome da atividade?',
      showDenyButton: true,
      confirmButtonText: `Sim`,
      denyButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.atividade = { ...atividade };
        this.atividadeId = atividade.id;
      }
    })
  }

  excluir(atividade: Atividade) {
    Swal.fire({
      title: 'Tem certeza de que deseja inativar essa atividade?',
      showDenyButton: true,
      confirmButtonText: `Sim`,
      denyButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        atividade.status = false;
        this.atividadeService.atualizar(atividade).subscribe(
          (sucesso) => {
            Swal.fire('Sucesso', 'Atividade inativada!', 'success');
            this.filtrarAtividade();
          },
          (erro) => {
            Swal.fire('Erro', 'Erro ao inativar atividade', 'error');
            console.error('Erro ao inativar atividade:', erro);
          }
        );
      }
    });
  }

  criarArrayPaginas(): any[] {
    const totalPages = this.totalPaginas;
    const currentPage = this.seletor.pagina + 1;
    const maxPagesToShow = 4;
    const pages = [];
    if (totalPages <= maxPagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  atualizarPaginacao() {
    this.contarPaginas();
    this.irParaPagina(0);
    this.filtrarAtividade();
  }

  avancarPagina() {
    this.seletor.pagina++;
    this.filtrarAtividade();
  }

  voltarPagina() {
    this.seletor.pagina--;
    this.filtrarAtividade();
  }

  irParaPagina(indicePagina: number) {
    this.seletor.pagina = indicePagina;
    this.filtrarAtividade();
  }
}


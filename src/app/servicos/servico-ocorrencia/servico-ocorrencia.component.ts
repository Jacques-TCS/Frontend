import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Ocorrencia } from 'src/app/shared/model/ocorrencia';
import { OcorrenciaSeletor } from 'src/app/shared/model/seletor/ocorrencia.seletor';
import { OcorrenciaService } from 'src/app/shared/service/ocorrencia.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-servico-ocorrencia',
  templateUrl: './servico-ocorrencia.component.html',
  styleUrls: ['./servico-ocorrencia.component.scss'],
})
export class ServicoOcorrenciaComponent implements OnInit {
  public ocorrencias: Array<Ocorrencia> = new Array();
  public seletor: OcorrenciaSeletor = new OcorrenciaSeletor();
  public categorias: string[];
  public status: string[];

  public mostrar: boolean;
  public esconder: boolean;

  public mostrarFiltros() {
    this.mostrar = !this.mostrar;
    this.esconder = !this.esconder;
  }

  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(
    private ocorrenciaService: OcorrenciaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.seletor.limite = 5;
    // this.seletor.pagina = ;

    this.buscarTodos();
  }

  buscarTodos() {
    this.ocorrenciaService.listarTodos().subscribe(
      (resultado) => {
        this.ocorrencias = resultado;
      },
      (erro) => {
        console.log('Erro ao buscar ocorrencias', erro);
      }
    );
  }

  filtrarOcorrencia() {
    this.ocorrenciaService.listarComSeletor(this.seletor).subscribe(
      (resultado) => {
        this.ocorrencias = resultado;
      },
      (erro) => {
        console.log('Erro ao buscar ocorrencias', erro);
      }
    );
  }

  editar(id: number) {
    this.router.navigate(['/usuarios/edicao', id]);
  }

  fileName = 'ExcleSheet.xlsx';
  exportarPlanilhaOcorrencia() {
    let data = document.getElementById('tabela-ocorrencia');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Planilha');

    XLSX.writeFile(wb, this.fileName);
  }
}

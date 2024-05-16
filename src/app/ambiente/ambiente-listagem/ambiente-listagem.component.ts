import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Ambiente } from 'src/app/shared/model/ambiente';
import { AmbienteSeletor } from 'src/app/shared/model/seletor/ambiente.seletor';
import { AmbienteService } from 'src/app/shared/service/ambiente.service';

@Component({
  selector: 'app-ambiente-listagem',
  templateUrl: './ambiente-listagem.component.html',
  styleUrls: ['./ambiente-listagem.component.scss'],
})
export class AmbienteListagemComponent implements OnInit{
  public ambientes: Array<Ambiente> = new Array();
  public seletor: AmbienteSeletor = new AmbienteSeletor();

  public mostrar: boolean;
  public esconder: boolean;

  public mostrarFiltros() {
    this.mostrar = !this.mostrar;
    this.esconder = !this.esconder;
  }

  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(
    private ambienteService: AmbienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.seletor.limite = 5;
    // this.seletor.pagina = ;
    this.buscarTodos();
  }

  buscarTodos() {
    this.ambienteService.listarTodos().subscribe(
      (resultado) => {
        this.ambientes = resultado;
      },
      (erro) => {
        console.log('Erro ao buscar ambientes', erro);
      }
    );
  }

  filtrarOcorrencia() {
    this.ambienteService.listarComSeletor(this.seletor).subscribe(
      (resultado) => {
        this.ambientes = resultado;
      },
      (erro) => {
        console.log('Erro ao buscar ambientes', erro);
      }
    );
  }

  editar(id: number) {
    this.router.navigate(['/ambientes/edicao', id]);
  }
}

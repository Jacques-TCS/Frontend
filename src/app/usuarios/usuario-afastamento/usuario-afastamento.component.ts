import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from './../../shared/service/usuario.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AfastamentoService } from 'src/app/shared/service/afastamento.service';
import { Afastamento } from 'src/app/shared/model/afastamento';
import { AfastamentoSeletor } from 'src/app/shared/model/seletor/afastamento.seletor';

@Component({
  selector: 'app-usuario-afastamento',
  templateUrl: './usuario-afastamento.component.html',
  styleUrls: ['./usuario-afastamento.component.scss']
})
export class UsuarioAfastamentoComponent {
  public seletor: AfastamentoSeletor = new AfastamentoSeletor();
  public afastamento: Afastamento = new Afastamento();
  public afastamentos: Array<Afastamento> = new Array();

  public natureza: string[] = [];

  public mostrar: boolean;
  public esconder: boolean;
  public idUsuario: number;

  public mostrarFiltros() {
    this.mostrar = !this.mostrar;
    this.esconder = !this.esconder;
  }

  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(
    private usuarioService: UsuarioService,
    private afastamentoService: AfastamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.afastamentoService.listarNatureza().subscribe(
      (resultado) => {
        this.natureza = resultado;
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao buscar as naturezas: ' + erro, 'error');
      }
    );

    this.route.params.subscribe(params => {
      this.idUsuario = params['id'];

      if(this.idUsuario){
        this.buscarUsuario();
      }
    });
  }

  // TODO
  buscarAfastamentosDoUsuario() {
    this.seletor.idUsuario = this.afastamento.usuario.id;
    this.afastamentoService.listarComSeletor(this.seletor).subscribe(
      (resultado) => {
        this.afastamentos = resultado;
      },
      (erro) => {
        console.log('Erro ao buscar usuarios', erro);
      }
    );
  }

  registrarAfastamento() {

    this.afastamentoService.inserir(this.afastamento).subscribe(
      (resultado) => {
        this.afastamento = resultado;
        Swal.fire("Sucesso", "Afastamento registrado com sucesso" , 'success');
        this.buscarAfastamentosDoUsuario();
      },
      (erro) => {
        console.log('Erro ao registrar afastamento', erro);
      }
    );
  }

  voltarUsuario() {
    this.router.navigate(['/usuarios/listagem']);
  }

  buscarUsuario(){
    this.usuarioService.pesquisarPorId(this.idUsuario).subscribe(
      resultado => {
        this.afastamento.usuario = resultado;
        this.buscarAfastamentosDoUsuario();
      },
      erro => {
        Swal.fire("Erro", "Erro ao buscar o usuário com id ("
                      + this.idUsuario + ") : " + erro, 'error');
      }
    );
  }
}

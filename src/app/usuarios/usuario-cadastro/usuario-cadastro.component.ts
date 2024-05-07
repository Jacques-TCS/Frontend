import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/shared/model/usuario';
import { UsuarioService } from './../../shared/service/usuario.service';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';
import { Cargo } from 'src/app/shared/model/cargo';
import { CargoService } from 'src/app/shared/service/cargo.service';
// import { Datepicker } from 'flowbite-datepicker'

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.scss'],
})
// export class UsuarioCadastroComponent{}
export class UsuarioCadastroComponent implements OnInit {
  @ViewChild('dateField') date!: ElementRef;
  public usuario: Usuario = new Usuario();
  public cargos: Cargo[] = [];
  public niveis: string[] = [];
  public idUsuario: number;
  public cargo: Cargo = new Cargo();
  // public isEdit: boolean = true;

  @ViewChild('ngForm')
  public ngForm: NgForm;

  mascaraCpf = createMask('999.999.999-99');
  cpf = new FormControl('');

  mascaraTelefone = createMask('(99) 99999-9999');
  telefone = new FormControl('');

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private cargoService: CargoService
  ) {}

  ngOnInit(): void {
    this.cargoService.listarTodos().subscribe(
      (resultado) => {
        this.cargos = resultado.map((cargo) => cargo);
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao buscar cargos', 'error');
      }
    );
    this.route.params.subscribe(params => {
      this.idUsuario = params['id'];

      if(this.idUsuario){
        this.buscarUsuario();
      }
    });
  }

  inserirUsuario(form: NgForm) {
    this.usuarioService.inserir(this.usuario).subscribe(
      (sucesso) => {
        Swal.fire('Sucesso', 'Usuario cadastrado!', 'success');
        this.usuario = new Usuario();
      },
      (erro) => {
        Swal.fire(
          'Erro', erro.error.message, 'error'
        );
      }
    );
  }

  buscarUsuario(){
    this.usuarioService.pesquisarPorId(this.idUsuario).subscribe(
      resultado => {
        this.usuario = resultado;
      },
      erro => {
        Swal.fire("Erro", "Erro ao buscar o usuário com id ("
                      + this.idUsuario + ") : " + erro, 'error');
      }
    );
  }
}

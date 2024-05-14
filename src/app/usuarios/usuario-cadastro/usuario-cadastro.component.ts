import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/shared/model/usuario';
import { UsuarioService } from './../../shared/service/usuario.service';
import { FormControl } from '@angular/forms';
import { Cargo } from 'src/app/shared/model/cargo';
import { CargoService } from 'src/app/shared/service/cargo.service';
import Swal from 'sweetalert2';
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

  cpf = new FormControl('');
  telefone = new FormControl('');
  dezoitoAnos: string;
  setentaAnos: string;

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
    const currentDate = new Date();

    const date18YearsAgo = new Date(currentDate);
    date18YearsAgo.setFullYear(currentDate.getFullYear() - 18);
    this.dezoitoAnos = date18YearsAgo.toISOString().split('T')[0];

    const date70YearsAgo = new Date(currentDate);
    date70YearsAgo.setFullYear(currentDate.getFullYear() - 70);
    this.setentaAnos = date70YearsAgo.toISOString().split('T')[0];
  }

  inserirUsuario(form: NgForm) {
    if(!form.invalid){
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

  onInput(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else {
      value = value.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
    }
    event.target.value = value;
  }
}

import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ApexNonAxisChartSeries, ApexChart, ApexPlotOptions, ChartComponent } from 'ng-apexcharts';
import { ServicoSeletor } from 'src/app/shared/model/seletor/servico.seletor';
import { Usuario } from 'src/app/shared/model/usuario';
import { ServicoService } from 'src/app/shared/service/servico.service';
import { UsuarioService } from 'src/app/shared/service/usuario.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

export type ServicosPorUsuario = {
  id: number;
  nome: string;
  servicos: number;
  toDo?: number;
  inProgress?: number;
  completed?: number;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild("chart") chart: ChartComponent;
  public progressoLimpezaChart: Partial<ChartOptions>;
  public servicosPorUsuario: Array<ServicosPorUsuario> = [];
  private intervalId: any;
  selectedOption: string = 'funcionarios';

  constructor(
    private servicoService: ServicoService,
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initializeChartOptions();
    this.buscarServicos();
    this.startPolling();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  buscarServicos() {
    let seletor = new ServicoSeletor();
    seletor.pagina = 0;
    seletor.limite = 100;
    seletor.dataProgramadaInicio = new Date();
    seletor.dataProgramadaFim = new Date();

    this.servicosPorUsuario = [];

    for (let i = 0; i < 15; i++) {
      seletor.usuario = { id: 15 } as Usuario;
      this.servicoService.listarComSeletor(seletor).subscribe(
        (resultado) => {
          let toDo = resultado.filter(servico => servico.dataHoraInicio == null && servico.dataHoraFim == null).length;
          let inProgress = resultado.filter(servico => servico.dataHoraInicio != null && servico.dataHoraFim == null).length;
          let completed = resultado.filter(servico => servico.dataHoraInicio != null && servico.dataHoraFim != null).length;
          this.usuarioService.pesquisarPorId(seletor.usuario.id).subscribe(
            (usuario) => {
              this.servicosPorUsuario.push({
                id: seletor.usuario.id,
                nome: usuario.nome,
                servicos: resultado.length,
                toDo: toDo,
                inProgress: inProgress,
                completed: completed
              });
              this.cdr.detectChanges();
            },
            (erro) => {
              console.error('Erro ao buscar o usuário:', erro);
            }
          );
        },
        (erro) => {
          console.error(erro);
        }
      );
    }
  }

  private initializeChartOptions() {
    const prefersDarkMode = localStorage.getItem('color-theme') === 'dark' ||
                             (!localStorage.getItem('color-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  startPolling() {
    this.intervalId = setInterval(() => {
      this.buscarServicos();
    }, 300000);
  }
}

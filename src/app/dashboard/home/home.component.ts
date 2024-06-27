import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ApexNonAxisChartSeries, ApexChart, ApexPlotOptions, ChartComponent } from 'ng-apexcharts';
import { Cargo } from 'src/app/shared/model/cargo';
import { OcorrenciaSeletor } from 'src/app/shared/model/seletor/ocorrencia.seletor';
import { ServicoSeletor } from 'src/app/shared/model/seletor/servico.seletor';
import { UsuarioSeletor } from 'src/app/shared/model/seletor/usuario.seletor';
import { Usuario } from 'src/app/shared/model/usuario';
import { OcorrenciaService } from 'src/app/shared/service/ocorrencia.service';
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
  dataHoraInicio?: Date;
};

export type ServicosTotais = {
  servicos: number;
  toDoTotal?: number;
  inProgressTotal?: number;
  completedTotal?: number;
};

export type OcorrenciasSeries = {
  name: string;
  data: number[];
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
  public usuarios: Array<Usuario> = [];
  public selectedOption: 'funcionarios' | 'informacoes' = 'funcionarios';
  public series: Array<OcorrenciasSeries> = [];

  servicosTotais: ServicosTotais = {
    servicos: 0,
    toDoTotal: 0,
    inProgressTotal: 0,
    completedTotal: 0
  };

  constructor(
    private servicoService: ServicoService,
    private usuarioService: UsuarioService,
    private ocorrenciaService: OcorrenciaService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.initializeChartOptions();
    this.filtrarUsuario();
    this.startPolling();
    this.buscarTodosServicos();
  }

  ngOnDestroy() {
    this.stopPolling();
  }

  buscarOcorrencias() {
    let seletor = new OcorrenciaSeletor();
    seletor.pagina = 0;
    seletor.limite = 100;
    let dataAtual = new Date();
    dataAtual.setUTCHours(dataAtual.getUTCHours() - 3);
    seletor.dataFim = dataAtual;
    let data6Meses = new Date();
    data6Meses.setMonth(data6Meses.getMonth() - 6);
    data6Meses.setUTCHours(data6Meses.getUTCHours() - 3);
    seletor.dataInicio = data6Meses;

    this.ocorrenciaService.listarComSeletor(seletor).subscribe(
      (resultado) => {
        let categorias = resultado.map(ocorrencia => ocorrencia.categoria);
        let categoriasUnicas = [...new Set(categorias)];
        let novaSerie: OcorrenciasSeries[] = [];

        for (let categoria of categoriasUnicas) {
          let data = resultado.filter(ocorrencia => ocorrencia.categoria === categoria);
          let ocorrenciasMensais: number[] = [];
          for (let i = 0; i < 6; i++) {
            let dataMes = new Date();
            dataMes.setMonth(dataMes.getMonth() - i);
            let total = data.filter(ocorrencia => new Date(ocorrencia.dataOcorrencia).getMonth() === dataMes.getMonth()).length;
            ocorrenciasMensais.push(total);
          }
          novaSerie.push({
            name: ocorrenciasMensais[0] + ' ' + categoria,
            data: ocorrenciasMensais.reverse()
          });
        }

        this.series = novaSerie;
        this.cdr.detectChanges();
      },
      (erro) => {
        console.error('Erro ao buscar ocorrências:', erro);
      }
    );
  }

  filtrarUsuario() {
    let seletor = new UsuarioSeletor();
    seletor.pagina = 0;
    seletor.limite = 100;
    seletor.cargo = { id: 1 } as Cargo;
    this.usuarioService.listarComSeletor(seletor).subscribe(
      (resultado) => {
        this.usuarios = resultado.filter((usuario) => usuario.cargo.id === seletor.cargo.id);
        this.buscarServicos();
      },
      (erro) => {
        console.log('Erro ao buscar usuários', erro);
      }
    );
  };

  buscarServicos() {
    if (!this.usuarios || this.usuarios.length === 0) {
      console.log('Nenhum usuário encontrado para o cargo especificado.');
      return;
    }

    this.servicosPorUsuario = [];

    for (const usuario of this.usuarios) {
      if (usuario.status.id !== 1) {
        continue; // Skip this iteration if the user's status is not 1
      }

      let seletor = new ServicoSeletor();
      seletor.pagina = 0;
      seletor.limite = 100;
      seletor.dataProgramadaInicio = new Date();
      seletor.dataProgramadaInicio.setHours(seletor.dataProgramadaInicio.getUTCHours() - 3);
      seletor.dataProgramadaFim = new Date();
      seletor.dataProgramadaFim.setHours(seletor.dataProgramadaFim.getUTCHours() - 3);
      seletor.usuario = { id: usuario.id } as Usuario;

      this.servicoService.listarComSeletor(seletor).subscribe(
        (resultado) => {
          let toDo = resultado.filter(servico => servico.dataHoraInicio == null && servico.dataHoraFim == null).length;
          let inProgress = resultado.filter(servico => servico.dataHoraInicio != null && servico.dataHoraFim == null).length;
          let completed = resultado.filter(servico => servico.dataHoraInicio != null && servico.dataHoraFim != null).length;

          let servicoInProgress = resultado.find(servico => servico.dataHoraInicio != null && servico.dataHoraFim == null);
          this.servicosPorUsuario.push({
            id: usuario.id,
            nome: usuario.nome,
            servicos: resultado.length,
            toDo: toDo,
            inProgress: inProgress,
            completed: completed,
            dataHoraInicio: servicoInProgress ? servicoInProgress.dataHoraInicio : undefined
          });

          this.servicosPorUsuario.sort((a, b) => a.nome.localeCompare(b.nome));

          this.cdr.detectChanges();
        },
        (erro) => {
          console.error('Erro ao buscar serviços para o usuário:', erro);
        }
      );
    }
  };

  buscarTodosServicos() {
    let seletor = new ServicoSeletor();
    seletor.pagina = 0;
    seletor.limite = 100;
    seletor.dataProgramadaInicio = new Date();
    seletor.dataProgramadaInicio.setHours(seletor.dataProgramadaInicio.getUTCHours() - 3);
    seletor.dataProgramadaFim = new Date();
    seletor.dataProgramadaFim.setHours(seletor.dataProgramadaFim.getUTCHours() - 3);

    this.servicoService.listarComSeletor(seletor).subscribe(
      (resultado) => {
        this.buscarOcorrencias();
        let toDo = resultado.filter(servico => servico.dataHoraInicio == null && servico.dataHoraFim == null).length;
        let inProgress = resultado.filter(servico => servico.dataHoraInicio != null && servico.dataHoraFim == null).length;
        let completed = resultado.filter(servico => servico.dataHoraInicio != null && servico.dataHoraFim != null).length;

        this.servicosTotais = {
          servicos: resultado.length,
          toDoTotal: toDo,
          inProgressTotal: inProgress,
          completedTotal: completed
        };

        this.cdr.detectChanges();
      },
      (erro) => {
        console.error('Erro ao buscar todos os serviços:', erro);
      }
    );
  }

  private initializeChartOptions() {
    const prefersDarkMode = localStorage.getItem('color-theme') === 'dark' ||
      (!localStorage.getItem('color-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  startPolling() {
    this.intervalId = setInterval(() => {
      if (this.selectedOption === 'funcionarios') {
        this.buscarServicos();
      } else {
        this.buscarTodosServicos();
      }
    }, 300000);
  };

  stopPolling() {
    clearInterval(this.intervalId);
  };
}

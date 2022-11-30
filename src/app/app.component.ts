// import { Component, ViewChild } from '@angular/core';
// import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
// import { BaseChartDirective } from 'ng2-charts';
import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    indexAxis: 'y',
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        display: false,
        ticks: {
          font: {
            family: 'Helvetica regular',
            size: 16,
            style: 'normal',
          },
        },
      },
      y: {
        // min: 10,
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
    onHover: (chartEvent, elements, chart) => {
      if (
        (chartEvent.native as any).toElement &&
        (chartEvent.native as any).toElement.attributes.style
      ) {
        if (elements[0]) {
          (chartEvent.native as any).toElement.attributes.style.nodeValue = (
            chartEvent.native as any
          ).toElement.attributes.style.nodeValue.replace(
            'cursor: default;',
            'cursor: pointer;'
          );
          if (
            (
              chartEvent.native as any
            ).toElement.attributes.style.nodeValue.indexOf(
              'cursor: pointer;'
            ) === -1
          ) {
            (chartEvent.native as any).toElement.attributes.style.nodeValue +=
              'cursor: pointer;';
          }
        } else {
          (chartEvent.native as any).toElement.attributes.style.nodeValue = (
            chartEvent.native as any
          ).toElement.attributes.style.nodeValue.replace(
            'cursor: pointer;',
            'cursor: default;'
          );
        }
      }
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'> = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        backgroundColor: ['#b0b0b0'],
        hoverBackgroundColor: ['#9e9e9e'],
      },
      // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    ],
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40,
    ];

    this.chart?.update();
  }

  constructor() {}
}

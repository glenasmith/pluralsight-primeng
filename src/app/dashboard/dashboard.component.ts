import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UIChart } from "primeng/primeng";
import { Observable } from "rxjs/Observable";

const DEFAULT_COLORS = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
  '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
  '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
  '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC']


@Component({
  selector: 'at-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  @ViewChild("mixedChart") mixedChart: UIChart;

  hoursByProject = [
    { id: 1, name: 'Payroll App', hoursSpent: 8 },
    { id: 2, name: 'Agile Times App', hoursSpent: 16 },
    { id: 3, name: 'Point of Sale App', hoursSpent: 24 },
  ]

  chartOptions = {
    title: {
      display: true,
      text: 'Hours By Project'
    },
    legend: {
      position: 'bottom'
    },
  };

  pieLabels = this.hoursByProject.map((proj) => proj.name);

  pieData = this.hoursByProject.map((proj) => proj.hoursSpent);

  pieColors = this.configureDefaultColours(this.pieData);


  private configureDefaultColours(data: number[]): string[] {
    let customColours = []
    if (data.length) {

      customColours = data.map((element, idx) => {
        return DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
      });
    }

    return customColours;
  }



  hoursByProjectChartData = {
    labels: this.pieLabels,
    datasets: [
      {
        data: this.pieData,
        backgroundColor: this.pieColors
      }
    ]
  }


  hoursByTeamChartData = {

    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Dev Team',
        backgroundColor: DEFAULT_COLORS[0],
        data: [65, 59, 80, 55, 67, 73]
      },
      {
        label: 'Ops Team',
        backgroundColor: DEFAULT_COLORS[1],
        data: [44, 63, 57, 90, 77, 70]
      }
    ]

  }

  hoursByTeamChartDataMixed = {

    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Dev Team',
        type: 'bar',
        backgroundColor: DEFAULT_COLORS[0],
        data: [65, 59, 80, 55, 67, 73]
      },
      {
        label: 'Ops Team',
        type: 'line',
        backgroundColor: DEFAULT_COLORS[1],
        data: [44, 63, 57, 90, 77, 70]
      }
    ]

  }

  onDataSelect(event) {

    let dataSetIndex = event.element._datasetIndex;
    let dataItemIndex = event.element._index;

    let labelClicked = this.hoursByTeamChartDataMixed.datasets[dataSetIndex].label;
    let valueClicked = this.hoursByTeamChartDataMixed.datasets[dataSetIndex].data[dataItemIndex];

    alert(`Looks like ${labelClicked} worked ${valueClicked} hours`);
  }


  ngAfterViewInit() {
    Observable.interval(3000).timeInterval().subscribe(() => {

      var hoursByTeam = this.hoursByTeamChartDataMixed.datasets;
      var randomised = hoursByTeam.map((dataset) => {

        dataset.data = dataset.data.map((hours) => hours * (Math.random() * 2));

      });
      this.mixedChart.refresh();
    });

  }



}

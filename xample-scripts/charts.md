
# Charts



## Intro the Chart Module


	import { ChartModule, MenuModule, PanelModule, DataTableModule} from 'primeng/primeng';

	imports: [
		...
    	ChartModule,
		...
	],


## Install Chart.js

Install supporting library

	npm install chart.js --save

Update the scripts section to run Chart.js on index.html startup

	"scripts": [
		 "../node_modules/chart.js/dist/Chart.js"
	],


## Creating your first Pie chart


	<p-chart type="pie" [data]="hoursByProjectChartData"></p-chart>


## Structuring the Data


But you need the data in a format like this:

	private hoursByProjectChartData = {
	    labels: ['Payroll App', 'Agile Times App', 'Point of Sale App'],
	    datasets: [
	      {
	        data: [8, 16, 24],
	        backgroundColor: [
	           "red",
	           "blue",
	           "yellow"
	         ],
	
	      }
	    ]
	  };

But in reality, you probably have structured JSON data from a backend service:


	private hoursByProject = [
    	{id: 1, name: 'Payroll App', hoursSpent: 8},
	    {id: 2, name: 'Agile Times App', hoursSpent: 16},
    	{id: 3, name: 'Point of Sale App', hoursSpent: 24},
  	]


So you'll want to remap it:


	private pieData = this.hoursByProject.map((proj) => proj.hoursSpent);
	private pieLabels = this.hoursByProject.map((proj) => proj.name);

Then run the demo:



## Fixing the Colours

And those colours need to change to:

	private pieColors = this.configureDefaultColours(this.pieData);

But how does the magic work? An array of colours to pick from for each new data item:

	const DEFAULT_COLORS = [
	    '#6C76AF', '#EFA64C', '#00ACAC', '#2F8EE5',
	    '#F15B2A', '#A62E5C', '#2A9FBC', '#9BC850', 
		'#404040', '#675BA7'
	]

Then I'll write some code to slurp out those colours:
	
	private configureDefaultColours(data: number[]): string[] {
	    let customColours = []
	    if (data.length) {
	      customColours = data.map((element, idx) => {
	        return DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
	      });
	    }
	
	    return customColours;
	}

Which gives us something much more please, but still readable 

	private hoursByProjectChartData = {
	    labels: this.pieLabels,
	    datasets: [
	      {
	        data: this.pieData,
	        backgroundColor: this.pieColors,
	      }
	    ]
	  };

## Pies to Donuts

Same datamodel. So it's a one-liner change:

	<p-chart type="doughnut" [data]="hoursByProjectChartData"></p-chart>

Same for polarArea

	<p-chart type="polarArea" [data]="hoursByProjectChartData"></p-chart>

## Moving to Bar Charts

Bars and Line charts work around series data. We have monthly hours by team:

	private hoursByTeam = [

    {
      name: 'Dev Team',
      monthlyHours: {
        'Jan': 65,
        'Feb': 59,
        'Mar': 80,
        'Apr': 55,
        'May': 67,
        'Jun': 73,
      }
    },
    {
      name: 'Ops Team',
      monthlyHours: {
        'Jan': 44,
        'Feb': 63,
        'Mar': 57,
        'Apr': 90,
        'May': 77,
        'Jun': 70,
        
      }
    }

But we want to end up with series data:

	private hoursByTeamChartData = {
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

We'll need to transform our JSON:


	 private tranformHoursByTeamDataIntoChartData(hoursByTeamData) {
	
	    let labels = Object.keys(hoursByTeamData[0].monthlyHours);
	    let dataSets = hoursByTeamData.map( (nextTeam, idx) => {
	        return {
	          label: nextTeam.name,
	          backgroundColor: DEFAULT_COLORS[idx % DEFAULT_COLORS.length],
	          data: Object.keys(nextTeam.monthlyHours).map(key => nextTeam.monthlyHours[key])
	        }
	    });
	
	    return {
	      labels: labels,
	      datasets: dataSets
	    }
	}


## Line and Area Charts

Again, a one-liner:

	<p-chart type="line" [data]="hoursByTeamChartData"></p-chart>


If you don't want the fills - line, not area:


	return {
          label: nextTeam.name,
          fill: false,
          backgroundColor: DEFAULT_COLORS[idx % DEFAULT_COLORS.length],
          data: Object.keys(nextTeam.monthlyHours).map(key => nextTeam.monthlyHours[key])
        }

## Mixing Chart Data

Chart type is set to bar, but then each data series can set it's preferred type:


	private hoursByTeamChartData = {
	    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
	    datasets: [
	      {
			type: 'line',
			fill: false,
	        label: 'Dev Team',
	        backgroundColor: DEFAULT_COLORS[0],
	        data: [65, 59, 80, 55, 67, 73]
	      },
	      {
			type: 'bar',
	        label: 'Ops Team',
	        backgroundColor: DEFAULT_COLORS[1],
	        data: [44, 63, 57, 90, 77, 70]
	      }
	    ]
	}

So let's create a fresh tag for it:

	<p-panel header="Hours By Team (Mixed)" class="ui-g-12 ui-lg-6">
    	<p-chart type="bar" [data]="hoursByTeamChartMixedData"></p-chart>
  	</p-panel>

So let's re-use our current transformer to popular our Mixed Chart data:

	private hoursByTeamChartMixedData = {};

	constructor() {

	    let mixedData = this.tranformHoursByTeamDataIntoChartData(this.hoursByTeam);
	
	    mixedData.datasets[0].type = 'bar';
	    mixedData.datasets[1].type = 'line';
	    mixedData.datasets[2].type = 'line';
	    mixedData.datasets[2].fill = true;
	
	    this.hoursByTeamChartMixedData = mixedData;

	} 

## Added interactivity with (onDataSelect)

We can implement (onDataSelect):

	<p-chart type="bar" [data]="hoursByTeamChartMixedData"
    	(onDataSelect)="onMixedClick($event)"></p-chart>

For now, let's just show an alert box. We'll circle back later:

	private onMixedClick(event) {
    

	    let labelClicked = this.hoursByTeamChartMixedData.datasets[event.element._datasetIndex].label;
	    let valueClicked = this.hoursByTeamChartMixedData.datasets[event.element._datasetIndex].data[event.element._index];
	
	    alert(`Looks like ${labelClicked} worked ${valueClicked} hours`);
    
	}

This gives us access to:

    //event.dataset = Selected dataset
    //event.element = Selected element
    //event.element._datasetIndex = Which dataset series was clicked on - ie. which array was clicked (0 indexed)
    //event.element._index = Which element within that array was clicked (0 indexed)


## Deeper Customisation

There's more treasure in [Chart.js](http://www.chartjs.org/docs/) if you want to dig further:


	private chartOptions = {
	    title: {
	      display: true,
	      text: 'Hours By Team'
	    },
	    legend: {
	      position: 'left'
	    },
	    responsive: false,
		animation : false
	}

Plus add them to the tag you care about:

	<p-chart type="bar" [data]="hoursByTeamChartMixedData"
    	(onDataSelect)="onMixedClick($event)" [options]="chartOptions">
	</p-chart>

## Realtime Charting




Bind to the element:
	
	<p-chart type="bar" [data]="hoursByTeamChartMixedData" #mixedChart
    (onDataSelect)="onMixedClick($event)" [options]="chartOptions"
    ></p-chart>

Grab a handle to the element:

	@ViewChild("mixedChart") mixedChart : UIChart;

And the import:

	import { UIChart } from 'primeng/primeng';

Implement after view init:

	import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
	export class DashboardComponent implements OnInit, AfterViewInit {

Implement the view init code to make the magic happen:

	  Observable.interval(3000).timeInterval().subscribe(() => {
      
          var hoursByTeam = this.hoursByTeamChartMixedData.datasets;
          var randomised = hoursByTeam.map( (dataset) => {
            
            dataset.data = dataset.data.map( (hours) => hours * Math.random() ); 
           
          });
          this.mixedChart.refresh(); 
      });

If you're changing the whole chart object, you'll need to call:

	this.mixedChart.reinit();

## Summarise and take action


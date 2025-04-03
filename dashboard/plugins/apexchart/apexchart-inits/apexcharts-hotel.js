// Chart 9
var options = {
  series: [
    {
      name: "Check-in: 475 Guests",
      data: [0, 62, 57, 78, 64, 70, 38, 77, 38, 61, 50]
    },
    {
      name: "Check-out: 157 Guests",
      data: [50, 12, 22, 19, 49, 19, 18, 10, 82, 41, 60]
    }
  ],
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: false
    },
    toolbar: {
      show: true,
      tools: {
        download: '<i class="bi bi-three-dots-vertical fs-24 text-gray"></i>',
      }
    },
  },
  colors: ['#4997d3', '#5ECFFF'],
  
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    categories: ['Sunday', '', 'Monday', '', 'Tuesday', '', 'Thursday', '', 'Friday', '', 'Saturday'],
  },
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'left',
    fontSize: '18px',
    fontFamily: "'Oswald' Sans-serif",
    fontWeight: 700,
    labels: {
        colors: '#222222',
        useSeriesColors: false
    },
    markers: {
        width: 13,
        height: 13,
        offsetX: -10,
        offsetY: 0
    },
    itemMargin: {
      horizontal: 25,
      vertical: 0
    },
    onItemClick: {
        toggleDataSeries: true
    },
    onItemHover: {
        highlightDataSeries: true
    },
  },
  responsive: [
    {
      breakpoint: 767,
      options: {        
        legend: {
          position: 'bottom',
          horizontalAlign: 'center'
        }
      }
    }
  ]
  };
  
  var chart_nine = new ApexCharts(document.querySelector("#chart-9"), options);
  chart_nine.render();


  // Chart 10
var options = {
  series: [65, 35],
  labels: ['Available', 'SSold-out'],
  chart: {
    type: 'donut',
    width: '300',
  },
  colors: ['#4997d3', '#5ECFFF'],
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 90,
      offsetX: -30,
      offsetY: 0
    }
  },
  grid: {
    padding: {
      bottom: -80
    }
  },
  dataLabels: {
    enabled: false,
    offsetX: -6,
    style: {
      fontSize: '12px',
      colors: ['#fff']
    }
  },
  legend: {
    show: false,
    position: 'bottom',
    fontSize: '18px',
    fontFamily: "'Oswald' Sans-serif",
    fontWeight: 700,
    offsetY: 0,
    labels: {
        colors: '#222222',
        useSeriesColors: false
    },
    markers: {
        width: 13,
        height: 13,
        offsetX: -10,
        offsetY: 0
    },
    itemMargin: {
      horizontal: 25,
      vertical: 0
    },
    onItemClick: {
        toggleDataSeries: true
    },
    onItemHover: {
        highlightDataSeries: true
    },
  },
  // responsive: [{
  //   breakpoint: 300,
  //   options: {
  //     chart: {
  //       width: 200
  //     },
  //     legend: {
  //       position: 'bottom'
  //     }
  //   }
  // }]
};

var chart_ten = new ApexCharts(document.querySelector("#chart-10"), options);
chart_ten.render();
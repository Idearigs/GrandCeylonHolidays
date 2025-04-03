// Chart 1 
var options = {
  series: [{
    name: 'Employee',
    data: [10, 90, 45, 65, 55, 70, 40, 120]
  }],
  chart: {
      height: 70,
      // type: 'line',
    
      toolbar: {
        show: false
      },
  },
  stroke: {
    width: 5,
    curve: 'smooth'
  },
  grid: {
    show: false,
  },
  xaxis: {
    show: false,
    lines: {
      show: false
    },
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false,
    lines: {
      show: false
    },
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      gradientFromColors: [ '#4997d3'],
      gradientToColors: [ '#4997d3'],
      shadeIntensity: 1,
      type: 'horizontal',
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 100, 100]
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

var chart_one = new ApexCharts(document.querySelector("#chart-1"), options);
chart_one.render();


// Chart 2
var options = {
  series: [{
    name: 'Employee',
    data: [100, 40, 65, 45, 55, 40, 70, 10]
  }],
    chart: {
      height: 70,
      // type: 'line',
    
      toolbar: {
        show: false
      },
  },
  stroke: {
    width: 5,
    curve: 'smooth'
  },
  grid: {
    show: false,
  },
  xaxis: {
    show: false,
    lines: {
      show: false
    },
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false,
    lines: {
      show: false
    },
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      gradientFromColors: [ '#5ECFFF'],
      gradientToColors: [ '#5ECFFF'],
      shadeIntensity: 1,
      type: 'horizontal',
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 100, 100]
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

var chart_two = new ApexCharts(document.querySelector("#chart-2"), options);
chart_two.render();


// Chart 3
var options = {
  series: [{
    name: 'Employee',
    data: [10, 90, 45, 65, 55, 70, 40, 120]
  }],
    chart: {
      height: 70,
      // type: 'line',
    
      toolbar: {
        show: false
      },
  },
  stroke: {
    width: 5,
    curve: 'smooth'
  },
  grid: {
    show: false,
  },
  xaxis: {
    show: false,
    lines: {
      show: false
    },
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false,
    lines: {
      show: false
    },
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      gradientFromColors: [ '#4997d3'],
      gradientToColors: [ '#4997d3'],
      shadeIntensity: 1,
      type: 'horizontal',
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 100, 100]
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

var chart_three = new ApexCharts(document.querySelector("#chart-3"), options);
chart_three.render();


// Chart 4 
var options = {
  series: [{
    name: 'Employee',
    data: [10, 90, 45, 65, 55, 70, 40, 120]
  }],
  chart: {
      height: 70,
      // type: 'line',
    
      toolbar: {
        show: false
      },
  },
  stroke: {
    width: 5,
    curve: 'smooth'
  },
  grid: {
    show: false,
  },
  xaxis: {
    show: false,
    lines: {
      show: false
    },
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false,
    lines: {
      show: false
    },
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      gradientFromColors: [ '#5ECFFF'],
      gradientToColors: [ '#5ECFFF'],
      shadeIntensity: 1,
      type: 'horizontal',
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 100, 100]
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

var chart_four = new ApexCharts(document.querySelector("#chart-4"), options);
chart_four.render();

// Chart 5
var options = {
  series: [{
      name: 'This Week',
      data: [44, 85, 51, 97, 72, 43, 61]
    }, {
      name: 'Last Week',
      data: [33, 53, 30, 68, 49, 27, 33]
    }],
  chart: {
    type: 'bar',
    height: 460,
    toolbar: {
      show: true,
      tools: {
        download: '<i class="bi bi-three-dots-vertical fs-24 text-gray"></i>',
      }
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '50%',
      borderRadius: 10,
    },
  },

  dataLabels: {
    enabled: false,
    offsetX: -6,
    style: {
      fontSize: '12px',
      colors: ['#fff']
    }
  },
  colors: ['#5ECFFF', '#4997d3',],
  // title: {
  //   text: 'Recruitment Progress',
  //   align: 'left'
  // },
  stroke: {
    show: true,
    width: 5,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  },
  fill: {
    opacity: 1
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

var chart_five = new ApexCharts(document.querySelector("#chart-5"), options);
chart_five.render();


// Chart 6 
var options = {
  series: [
    {
      name: 'series1',
      data: [0, 25, 10, 20, 15, 40, 25, 50 ]
    }
  ],
  chart: {
    height: 70,
    type: 'area',    
    toolbar: {
      show: false
    },
    sparkline: {
      enabled: true
    },
  },
  colors: ['#4997d3'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  
  grid: {
    show: false,
    position: 'front'
  },
  xaxis: {
    show: false,
    lines: {
      show: false
    },
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false,
    lines: {
      show: false
    },
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
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
var chart_six = new ApexCharts(document.querySelector("#chart-6"), options);
chart_six.render();


// Chart 7 
var options = {
  series: [
    {
      name: 'series1',
      data: [20, 55, 45, 20, 55, 15, 35, 20 ]
    }
  ],
  chart: {
    height: 70,
    type: 'area',    
    toolbar: {
      show: false
    },
    sparkline: {
      enabled: true
    },
  },
  colors: ['#FFAB2D'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  
  grid: {
    show: false,
    position: 'front'
  },
  xaxis: {
    show: false,
    lines: {
      show: false
    },
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false,
    lines: {
      show: false
    },
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
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
var chart_seven = new ApexCharts(document.querySelector("#chart-7"), options);
chart_seven.render();


// Chart 8 
var options = {
  series: [
    {
      name: 'series1',
      data: [20, 15, 20, 15, 15, 40, 25, 50 ]
    }
  ],
  chart: {
    height: 70,
    type: 'area',    
    toolbar: {
      show: false
    },
    sparkline: {
      enabled: true
    },
  },
  colors: ['#E328AF'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  
  grid: {
    show: false,
    position: 'front'
  },
  xaxis: {
    show: false,
    lines: {
      show: false
    },
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false,
    lines: {
      show: false
    },
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
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
var chart_eight = new ApexCharts(document.querySelector("#chart-8"), options);
chart_eight.render();
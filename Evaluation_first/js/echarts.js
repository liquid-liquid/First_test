var myChart = echarts.init(document.getElementById('chartjs'));
    var option = {
        xAxis: {
            show:false,
            type: 'category',
            boundaryGap: false,
        },
        yAxis: {
            show:false,
            type: 'value',
            axisLabel: {
                formatter: '{value} °C'
            }
        },
        grid: {
            left: '2.2%',
            right:'4%',
            bottom:'0%',
            top:'20%',
            containLabel:true,
    
        },
        series: [
            {
                name: '最高气温',
                type: 'line',
                data: [10, 11, 13, 11, 12, 12, 9],
                color:['orange'],
                smooth: true,
                symbolSize:7,
                label:{
                show :true,
                position:"top",
                formatter: '{c} °C'
              }
            },    
            {
                name: '最低气温',
                type: 'line',
                symbol:'circle',
                color:['skyblue'],
                symbolSize:7,
                data: [1, -2, 2, 5, 3, 2, 0],
                smooth: true,
                label:{
                show :true,
                position:"bottom",
                formatter: '{c} °C'
              }
            }
        ]
        
    };
    myChart.setOption(option);
    window.addEventListener('resize',function(){
        myChart.resize();
    })
const body = document.querySelector("body");//获得body节点
const h = document.querySelector(".h");//获取定位节点
const cotent = document.querySelector(".cotent");//获取主页面节点
const con = document.querySelector(".search");//获取搜索节点
const cancel = document.querySelector(".cancel");
const input = document.querySelector("#top-input");
const icon_search = document.querySelector(".icon_search");
const items_1 = document.querySelector(".items_1");
//请求ulr
const URL = {
    location(cityName) {
        return `https://www.tianqiapi.com/free/day?appid=82678172&appsecret=187jMg49&city=${cityName}`
    },
    forost(cityName){
        return `https://www.tianqiapi.com/free/week?appid=82678172&appsecret=187jMg49&city=${cityName}`
    }
}
//点击 显示搜索栏
h.onclick = function () {
    con.style.display = 'block';
    cotent.style.display = 'none';
    body.style.background = '#ffffff';
};
cancel.onclick = function () {
    con.style.display = 'none';
    cotent.style.display = 'block';
    body.style.background = '#F4F4F4';
}
input.onkeypress = function (event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==13){
        let text = input.value;
        li = document.createElement("li");
        li.innerHTML = text;
        items_1.appendChild(li);
        if(text){
            updataAll(text);
        }
    }
}
//封装ajax
/**
 * 封装Ajax请求  返回一个promise
 * @param {string：url地址} url 
 * @param {string：请求类型} type 
 * @param {object：post的数据} data 
 */
function ajax(url, type = "get", data = null) {
    return new Promise((resolve) => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(xhr.responseText);
            }
        }

        //启动
        xhr.open(type, url, true);

        //发送  ---get方法发送的数据为null
        xhr.send(data);
    })
}
/**
 * 获取天气信息 并返回一个Promise
 * @param {string} cityName 城市ID
 * @param {string} type 搜索天气的类型
 */
function getWeather(cityName) {
    let weatherUrl = URL.location(cityName);
    return new Promise((resolve) => {
        ajax(weatherUrl).then((res) => {
            resolve(res);
        })
    })
}
/**
 * 获取天气信息 并返回一个Promise
 * @param {string} cityName 城市ID
 */
 function getWeekWeather(cityName) {
    let weatherUrl = URL.forost(cityName);
    return new Promise((resolve) => {
        ajax(weatherUrl).then((res) => {
            resolve(res);
        })
    })
}
//更新container-1的信息
const bjt = document.querySelector("#container_1");
const wz = document.querySelector(".wz");
const zhi = document.querySelector(".zhi");
const kqtj = document.querySelector(".kqtj");
const wd_1 = document.querySelector("#wd_1");
const tq = document.querySelector(".tq");
const feng = document.querySelector("#feng");
const sd = document.querySelector("#sd");
function upcontainer_1(recentData){
    wz.innerHTML = recentData.city;
    //zhi.innerHTML = recentData.air;
    if(recentData.air<50)
    {
        kqtj.innerHTML = "优";
    }
    if(recentData.air>50&&recentData.air<100)
    {
        kqtj.innerHTML = "良";
    }
    if(recentData.air>100)
    {
        kqtj.innerHTML = "差";
    }
    wd_1.innerHTML = recentData.tem;
    tq.innerHTML = recentData.wea;
    feng.innerHTML = recentData.win+" "+recentData.win_speed;
    bjt.style.backgroundImage = "url(/Evaluation_first/ps/"+recentData.wea_img+".jpg)";
    setInterval(function(){
        if(feng.style.display = 'block'){
            feng.style.display = 'none';
            sd.style.display = 'block';
        }
        if(feng.style.display = 'none'){
            feng.style.display = 'block';
            sd.style.display = 'none';
        }
        
    },2000);
}
//更新upcontainer
date = document.querySelectorAll(".date");
weather = document.querySelectorAll(".weather");
icon = document.querySelectorAll(".icon");
wind = document.querySelectorAll(".wind");
dj = document.querySelectorAll(".dj");
xx = document.querySelectorAll(".xx");
tqtq = document.querySelectorAll(".tqtq");
icon_2 = document.querySelectorAll(".icon_2");
function upcontainer(WeekData){
    let length= date.length;
    for(let i=0;i<length;i++)
    {  
        let time = WeekData.data[i].date.replace("2020-","");
        date[i].innerHTML = time;
        weather[i].innerHTML = WeekData.data[i].wea;
        icon[i].src = "/Evaluation_first/iconfont/"+WeekData.data[i].wea_img+".png";
        wind[i].innerHTML = WeekData.data[i].win;
        dj[i].innerHTML = WeekData.data[i].win_speed;
    }
    for(let i=0;i<2;i++){
        xx[i].innerHTML = WeekData.data[i].date+"/"+WeekData.data[i].tem_day;
        tqtq[i].innerHTML = WeekData.data[i].wea;
        icon_2[i].src = "/Evaluation_first/iconfont/"+WeekData.data[i].wea_img+".png";
    }
    
}
function updataAll(cityName) {
    getWeather(cityName)
    .then((res)=>{
        let recentData = JSON.parse(res);
        console.log(recentData);
        upcontainer_1(recentData);
    });
    getWeekWeather(cityName)
    .then((res)=>{
        let WeekData = JSON.parse(res);
        console.log(WeekData);
        upcontainer(WeekData);
        upchart(WeekData);
    })
}

function upchart(WeekData) {
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
                data: [WeekData.data[0].tem_day,WeekData.data[1].tem_day,WeekData.data[2].tem_day,WeekData.data[3].tem_day,WeekData.data[4].tem_day,WeekData.data[5].tem_day,WeekData.data[6].tem_day],
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
                data: [WeekData.data[0].tem_night,WeekData.data[1].tem_night,WeekData.data[2].tem_night,WeekData.data[3].tem_night,WeekData.data[4].tem_night,WeekData.data[5].tem_night,WeekData.data[6].tem_night],
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
}
updataAll("北京");

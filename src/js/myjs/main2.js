


var radioChartData =[
    // {
    //     name:'PMS',
    //     type:'pie',
    //     radius : [30, 110],
    //     center : ['50%', '30%'],
    //     roseType : 'radius',
    //     data:[
    //         {value:334, name:'藏族 334'},
    //         {value:145, name:'彝族 145'},
    //         {value:49, name:'景颇族 49'},
    //         {value:46, name:'哈尼族 46'},
    //         {value:33, name:'怒族 33'},
    //         {value:31, name:'傈僳族 31'},
    //         {value:25, name:'羌族 25'},
    //         {value:18, name:'纳西族 18'},
    //         {value:5, name:'白族 5'},
    //         {value:1, name:'普米族 1'}
    //     ]
    // }
];

function addradioChartData(name,nodes) {

    radioChartData.push({
        name:name,
        type:'pie',
        radius : [30, 110],
        center : ['50%', (30+40*radioChartData.length)+'%'],
        roseType : 'radius',
        data:(function () {
            var temp = [];
            nodes.map(function (item) {
                if(item.EQUIP_NAME!=undefined){
                    if(arr3.indexOf(item.EQUIP_NAME)<0){

                    }else{
                        temp.push({value:1, name:item.EQUIP_NAME})
                    }
                }
            });
            if(arr3[arr3.length-1]!=''){
                var t = arr3[arr3.length-1].trim().split(' ').length;
                temp.push({value:t, name:'共同的配电站',tooltip : {
                    trigger: 'item',
                    formatter: function () {
                        var a =arr3[arr3.length-1].trim().split('  ');
                        return  a.join('<br/>');
                    }
                    // "{a} <br/>{b} : {c} ({d}%)"
                },})
            }

            return temp;
        })()

    })
}



function createMapchart(sdata) {
    console.log(sdata);
    var myChart = echarts.init(document.getElementById("main2"));
    var option = {
        title : {
            text: 'PMS和营销数据库',
            subtext: '配电站区别图',
            x:'center'
        },
        tooltip : {
            textStyle:{
                fontSize:9,
            },
            trigger: 'item',
            formatter: "{a} <br/>{b}"
                // "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            x : 'center',
            y : 'bottom',
            data:(function () {
                var temp=[];
                sdata.map(function (item) {
                    item.data.map(function (ite) {
                        var have =false;
                        // for(var i=0;i<temp.length;i++){
                        //     if(temp[i]==ite.name){
                        //         have=true;
                        //         break;
                        //     }
                        // }
                        if(have==false){
                            temp.push(ite.name);
                        }
                    })
                });
                // console.log(temp)
                return temp;
            })()

        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series :sdata
    };


// 为echarts对象加载数据
    myChart.setOption(option);
}

function diffArr(arr1, arr2) {
    var diff = [];
    var tmp = arr2;

    arr1.forEach(function(val1, i){
        if (arr2.indexOf(val1) < 0) {
            diff.push(val1);
        } else {
            tmp.splice(tmp.indexOf(val1), 1);
        }
    });
    diff =diff.concat(tmp);
    var others ='';
    for(var i=0;i<arr1.length;i++){
        if(diff.indexOf(arr1[i])<0){
            others+=arr1[i]+' '
        }
    }
    diff.push(others);
    console.log(others);
    return diff;
};

// to execute when all the elements of html is loaded
$(document).ready(function(){
    const url = "https://api.covid19india.org/data.json"
    $.getJSON(url,function(data){
        console.log(data);
        // variable decleration
        var totalActive,totalRecovered,totalDeaths,totalConfirmed
        //array declaration

        var states = []
        var confirmed = []
        var recovered = []
        var deaths = []
        var active = []
        //datewise data
        var dates = []
        var totalconfirmeddatewise = []
        var totaldecreaseddatewise = []
        var totalrecovereddatewise = []

        //looping & fetching data from api and store in it array
        $.each(data.statewise,function(id,obj){
            states.push(obj.state)
            confirmed.push(obj.confirmed)
            recovered.push(obj.recovered)
            deaths.push(obj.deaths)
            active.push(obj.active)

        })
        // console.log("Confirmed cases",confirmed);
        // console.log("recovered cases",recovered);
        // console.log("active cases",active);
        
        //for datewise
        $.each(data.cases_time_series,function(id,obj1){
            dates.push(obj1.date)
            totalconfirmeddatewise.push(obj1.dailyconfirmed)
            totaldecreaseddatewise.push(obj1.dailydeceased)
            totalrecovereddatewise.push(obj1.dailyrecovered)
    
            })
        // console.log(dates); 
        
        

        //removing first element from array not needed
        states.shift()
        confirmed.shift()
        recovered.shift()
        deaths.shift()
        active.shift()
        
        //removing last 5 elements ie. 5 states coz i dont want it "Its my choise :)"
        for (let index = 0; index < 7; index++) {
            states.pop()
            
        }

        // console.log(active);
        
        // console.log(states);

        //getting total cases from api
        totalActive = data.statewise[0].active
        totalConfirmed = data.statewise[0].confirmed
        totalRecovered = data.statewise[0].recovered
        totalDeaths = data.statewise[0].deaths

        //Adding data to web page
        $("#active").append(totalActive)
        $("#confirmed").append(totalConfirmed)
        $("#recovered").append(totalRecovered)
        $("#deaths").append(totalDeaths)


        //Making chart 
        var mychart = document.getElementById("mychart").getContext('2d')
        var chart = new Chart(mychart,{
            type:'line',
            data :{
                labels:states,
                backgroundColor:"#FF0000",
                datasets:[
                    {
                        label: "Confirmed Cases",
                        data: confirmed,
                        borderColor: "#ffc107",
                        minBarLength: 100,
                        lineTension:0,
                        backgroundColor:"#ffc10736"
                    },
                    {
                        label: "Active Cases ",
                        data: active,
                        borderColor: "#17a2b8",
                        minBarLength: 100,
                        lineTension:0,
                        backgroundColor:"#17a2b84d"
                    },
                    {
                        label: "Recovered Cases",
                        data: recovered,
                        borderColor: "#28a745",
                        minBarLength: 100,
                        lineTension:0,
                        backgroundColor:"#28a74540"
                    },
                    {
                        label: "Deceased ",
                        data: deaths,
                        borderColor: "#dc3545",
                        minBarLength: 100,
                        lineTension:0,
                        backgroundColor:"#dc354545"
                    },  
                ]
            },
            options:{},
        })  
            // Making chart
        var mychart = document.getElementById("datewisechart").getContext('2d')
    var chart = new Chart(mychart,{
        type:'line',
        data :{
            labels:dates,
            backgroundColor:"#FF0000",
            datasets:[
                {
                    label: "Confirmed Cases",
                    data: totalconfirmeddatewise,
                    borderColor: "#ffc107",
                    minBarLength: 100,
                    lineTension:0,
                    backgroundColor:"#ffc10736"
                },
                // {
                //     label: "Decreased Cases ",
                //     data: totaldecreaseddatewise,
                //     borderColor: "#17a2b8",
                //     minBarLength: 100,
                //     lineTension:0,
                //     backgroundColor:"#17a2b84d"
                // },
                {
                    label: "Recovered Cases",
                    data: totalrecovereddatewise,
                    borderColor: "#28a745",
                    minBarLength: 100,
                    lineTension:0,
                    backgroundColor:"#28a74540"
                }, 
            ]
        },
        options:{},
    })
    })
})

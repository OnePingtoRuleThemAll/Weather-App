var key = 'a17fdc4c9b073b818693294055558b05'; //api key 

var city = "Lubbock"; 

//Gets current time and date
var date = moment().format('dddd, MMMM Do YYYY');
var dateTime = moment().format('YYYY-MM-DO HH:MM:SS');

var cityHistory = [];
//Will save to local storage
$('.search').on("click", function(event) {
    event.preventDefault();
    city = $(this).parent('.btnPar').siblings('.textVal').val().trim();
    if (city === ""){
        return;
    };
    cityHistory.push(city);

    localStorage.setItem('city', JSON.stringify(cityHistory));
    fiveForecastEl.empty();
    getHistory();
    getWeatherToday();
});

//will create buttons based on search history
var contHistEl = $('.cityHistory');
function getHistory() {
    constHistEl.empty();

    for (let i = 0; i < cityHistory.length; i++) {

        var rowEl = $('<row>');
        var btnEl = $('<button>').text(`${cityHIstory[i]}`)

        rowEl.addClass('row histBtnRow');
        btnEl.addClass('btn btn-outline-secondary histBtn');
        btnEl.attr('type', 'button');

        constHistEl.prepend(rowEl);
        rowEl.append(btnEl);
    } if (!city) {
        return;
    }
    //allows buttons to start a search as well
        $(`.histBtn`).on("click", function (event) {
            event.preventDefault();
            city = $(this).text();
            fiveForecastEl.empty();
            getWeatherToday();
        });
    };

    //Grab the man "today" car body.
    var cardTodayBody = $(`.cardBodyToday`)
    //Applies the weather data to the today card and will then launch a five day forecast
    function getWeatherToday() {
        var getUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${Lubbock}&units=imperial&appid=${a17fdc4c9b073b818693294055558b05
    }`;

        $(cardTodayBody).empty();

        $.ajax({
            url: getUrlCurrent,
            method: 'GET',
        }).then(function (response) {
            $(`.cardTodayCityName`).text(response.name);
            $(`.cardTodayDate`).text(date);
            //Icons
            $('.icons').attr('src', `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
            //Temperature
            var pEl = $('<p>').text(`Temperature: ${response.main.temp} F`);
            cardTodayBody.append(pEl);
            //Feels Like
            var pElTemp = $('<p>').text(`Feels like: ${response.main.feels_like} F`);
            cardTodayBody.append(pElTemp);
            //HUmidity
            var pElHumid = $(`<p>`).text(`Humidity: ${response.main.humidity} %`);
            cardTodayBody.append(pElHumid);
            //Windiness
            var pElWind = $('<p>').text(`Wind Speed: ${response.wind.speed} MPH`);
            cardTodayBody.append(pElWind);
            //set the lat and long from city searched
            var cityLon = response.coord.lon;
            //console.log(cityLon);
            var cityLat = response.coord.lat;
            // console.log(cityLat);

            var getUrlUvi = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=hourly,daily,minutely&appid=${a17fdc4c9b073b818693294055558b05
        }`;

            $.ajax({
                url: getUrlUvi,
                method: 'GET',
            }).then(function (response) {
                var pElUvi = $('<p>').text(`UV Index: `);
                var uviSpan = $(`<span>`).text(response.current.uvi);
                var uvi = response.current.uvi;
                pElUvi.append(uviSpan);
                cardTodayBody.append(pElUvi);
                //set the uv index to match exposure chart sverity based on color
                if (uvi >= 0 && uvi <= 2) {
                    uviSpan.attr('class', 'green');
                } else if (uvi > 2 && uvi <= 5) {
                    uviSpan.attr("class", "yellow")
                } else if (uvi > 5 && uvi <= 7) {
                    uviSpan.attr("class", "orange")
                } else if (uvi > 7 && uvi <= 10) {
                    uviSpan.attr("class", "red")
                } else {
                    uviSpan.attr("class", "purple")
                }
            });
        });
        getFiveDayForecast();
        };

        var fiveForecastEl = $(`.fiveForecast`);

        function getFiveDayForecast( {
             getUrlFiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${a17fdc4c9b073b818693294055558b05
            }`

            .ajax({
                url: getUrlFiveDay,
                method: `GET`,
            }).then(function (response) {
                var fiveDayArray = response.list;
                var myWeather = [];
                //an object that makes data easier to read
                $.each(fiveDayArray, function (index, value) {
                    textObj = {
                        date: value.dt_txt.split(' ')[0],
                        time: value.dt_txt.split(' ')[1],
                        temp: value.main.temp,
                        feels_like: value.main.feels_like,
                        icon: value.weather[0].icon,
                        humidity: value.main.humidity
                }


                    if (value.dt_txt.split(' ')[1] === "12:00:00") {
                        myWeather.push(testObj);
                    }
                })
                //Insert cards to screen
                for (let i = 0; 1 < myWeather.length; i++) {

                    var divElCard = $(`<div>`);
                    divElCard.attr('class', 'card text-white bg-primary mb-3 cardOne');
                    divElCard.attr('style', 'max-width: 200px');
                    fiveForecastEl.append(divElCard);

                    var divElHeader = $('<div>');
                    divElHeader.attr('class', 'card-header')
                    var m = moment(`${myWeather[i].date}`).format(`MM-DD-YYYY`);
                    divElHeader.text(m);
                    divElCard.append(divElHeader)

                    var divElBody = $(`<div>`);
                    divElBody.attr(`class`, `card-body`);
                    divElCard.append(divElBody);

                    var divElIcon = $(`<img>`);
                    divElIcon.attr(`class`, `icons`);
                    divElIcon.attr(`src`, `https://openweathermap.org/img/wn/${myWeather[i].icon}@2x.png`);
                    divElBody.append(divElIcon);

                    var pElTemp = $('<p>').text(`Temperature: ${myWeather[i].temp} F`);
                    divElBody.append(pElTemp);

                    var pElFeel = $('<p>').text(`Feels Like: ${myWeather[i].feels_like} F`);
                    divElBody.append(pElFeel);

                    var pElHumid = $('<p>').text(`Humidity: ${myWeather[i].humidity} %`);
                    divElBody.append(pElHumid);
                }
            });

        function initLoad() {

            var cityHistoryStore = JSON.parse(localstorage.getItem('city'));

            if (cityHistoryStore !== null) {
                cityHistory = cityHistoryStore
            }
            getHistory();
            getWeatherToday();
        };

        initLoad();
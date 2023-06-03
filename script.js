var key = 'a17fdc4c9b073b818693294055558b05'; //api key
var city = "Lubbock" 

//Gets current time and date
var date = moment().format('dddd, MMMM Do YYYY');
var dateTime = moment().format('YYYY-MM-DO HH:MM:SS')

var cityHistory = [];
//Will save to local storage
$('.search').on("click", fucntion(Event) {
    Event.preventDefault();
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
    
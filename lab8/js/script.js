var city_select =  document.querySelector('#city_select');
var btn_city_select =  document.querySelector('#btn_city_select');
var label_city_select =  document.querySelector('#city_select_result');
var input_search =  document.querySelector('#input_search');
var btn_search =  document.querySelector('#btn_search');

city_select.onclick = function (e){
    btn_city_select.innerHTML = e.target.innerHTML;
    label_city_select.innerHTML = e.target.innerHTML;
};

btn_search.onclick = function (e){
    var items = document.getElementsByClassName("_search_col_wrapper");
    var search_for = input_search.value;
    for (var i = 0; i < items.length; i++) {
        if (items[i].childNodes[1].childNodes[1].innerText.toLowerCase().indexOf(search_for.toLowerCase()) === -1)
            items[i].style.display = "none";
        else
            items[i].style.display = "block";
    }
};
const TABLE_PATTERN = "<table id='rtbl'><caption>Список ближайших конференций</caption><tbody><tr><th>Название</th><th>Область</th><th>Стоимость участия</th><th>Категория участников</th></tr>";

var View = function() {
	this.table_element = document.getElementById("tbl");
    this.onClickFilterEvent = null;
};

View.prototype.init = function (){
    document.getElementById("btn").addEventListener("click", function(){
        var data = this.getViewData();
        this.onClickFilterEvent(data);
    }.bind(this));
};

View.prototype.getViewData = function() {
    var s = document.getElementById("sphere");
    var co = document.getElementById("cost");
    var ca = document.getElementById("category");
    return {
        s : s.options[s.selectedIndex].text,
        co : co.options[co.selectedIndex].text,
        ca : ca.options[ca.selectedIndex].text
    };
};

View.prototype.render = function (table) {
    this.table_element.innerHTML = "";
    var newTable = TABLE_PATTERN;
    for (var i = 0; i < TABLE_ROWS; i++) {
        if (table[i].show === true)
            newTable += '<tr>' + '<td>' + table[i].name + '</td><td>' + table[i].sphere + '</td><td>' + table[i].cost + '</td><td>' + table[i].category + '</td></tr>';
    }
    newTable += '</tbody></table>';
    this.table_element.innerHTML += newTable;
};

var conferencesView = new View();
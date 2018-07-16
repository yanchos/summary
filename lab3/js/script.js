var readyState  = 4;
var statusOk    = 200;
var statusError = 400;
var url = 'https://jsonplaceholder.typicode.com/todos';
var table_element = document.getElementById("tbl");
var TABLE_PATTERN = "<table id='rtbl'><caption>Список заданий</caption><tbody><tr><th>ID пользователя</th><th>ID задания</th><th>Название задания</th><th>Статус задания</th></tr>";

function loadInfo()
{
    var status = document.querySelector('#status').value;
    if(status) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onreadystatechange = function() {
        table_element.innerHTML = "";
            if (this.readyState === readyState ) {
                if (this.status >= statusOk && this.status < statusError) {

                    var response = JSON.parse(this.responseText);
                    var newTable = TABLE_PATTERN;
                    for (i = 0; i < response.length; i++) {
                        if ((status === response[i].completed.toString()) || (status === 'all')) {
                            newTable += '<tr>' + '<td>' + response[i].userId + '</td><td>' + response[i].id + '</td><td>' + response[i].title + '</td><td>' + response[i].completed + '</td></tr>';
                        }
                    }
                    newTable += '</tbody></table>';
                    table_element.innerHTML += newTable;
                } else {
                    console.log("Error in request");
                }
            }

        }
    }
    request.send();
    request = null;
}

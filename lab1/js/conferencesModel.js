const TABLE_ROWS = 16;
const INITIAL_SPHERE = "не выбрано";
const INITIAL_COST = "не выбрано";
const INITIAL_CATEGORY = "не выбрано";

var Model = function () {
    this.table = [
        {name: "конференция 1", sphere: "гуманитарная", cost: "бесплатно", category: "аспиранты", show: true},
        {name: "конференция 2", sphere: "техническая", cost: "взнос", category: "студенты", show: true},
        {name: "конференция 3", sphere: "гуманитарная", cost: "взнос", category: "аспиранты", show: true},
        {name: "конференция 4", sphere: "техническая", cost: "бесплатно", category: "студенты",show: true},
        {name: "конференция 5", sphere: "гуманитарная", cost: "бесплатно", category: "аспиранты", show: true},
        {name: "конференция 6",sphere: "техническая", cost: "взнос", category: "студенты", show: true},
        {name: "конференция 7", sphere: "гуманитарная", cost: "взнос", category: "аспиранты", show: true},
        {name: "конференция 8", sphere: "техническая", cost: "бесплатно", category: "студенты", show: true},
        {name: "конференция 9", sphere: "гуманитарная", cost: "взнос", category: "студенты", show: true},
        {name: "конференция 10", sphere: "техническая", cost: "бесплатно", category: "аспиранты", show: true},
        {name: "конференция 11", sphere: "гуманитарная", cost: "бесплатно", category: "студенты", show: true},
        {name: "конференция 12", sphere: "техническая", cost: "бесплатно", category: "аспиранты",show: true},
        {name: "конференция 13", sphere: "гуманитарная", cost: "бесплатно", category: "студенты", show: true},
        {name: "конференция 14",sphere: "техническая", cost: "взнос", category: "студенты", show: true},
        {name: "конференция 15", sphere: "техническая", cost: "взнос", category: "аспиранты", show: true},
        {name: "конференция 16", sphere: "техническая", cost: "взнос", category: "аспиранты", show: true}
    ];
    this.selects = {
        sphere: INITIAL_SPHERE,
        cost: INITIAL_COST,
        category: INITIAL_CATEGORY
    }
};

Model.prototype.init = function (renderFunction) {
    this.needRendering = renderFunction;
};

Model.prototype.getSelects = function(data) {
    this.selects.sphere = data.s;
	this.selects.cost = data.co;
	this.selects.category = data.ca;
};

Model.prototype.filter = function (data) {
    this.getSelects(data);
    for (var i = 0; i < TABLE_ROWS; i++) {
        this.table[i].show =
            ((this.table[i].sphere === this.selects.sphere) || (this.selects.sphere === "не выбрано"))
            && ((this.table[i].cost === this.selects.cost) || (this.selects.cost === "не выбрано"))
            && ((this.table[i].category === this.selects.category) || (this.selects.category === "не выбрано"));
    }
    this.needRendering();
};

var conferencesModel = new Model();
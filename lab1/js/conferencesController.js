var Controller = function (View, Model) {
    this.conferencesView = View;
    this.conferencesModel = Model;
};

Controller.prototype.init = function() {
    this.conferencesView.onClickFilterEvent = this.filtering.bind(this);

    this.conferencesView.init();
    this.conferencesModel.init(this.needRendering.bind(this));
    this.needRendering();
};

Controller.prototype.needRendering = function () {
    this.conferencesView.render(conferencesModel.table);
};

Controller.prototype.filtering = function (data) { 
    this.conferencesModel.filter(data);
};

var conferencesController = new Controller(conferencesView, conferencesModel);

conferencesController.init();
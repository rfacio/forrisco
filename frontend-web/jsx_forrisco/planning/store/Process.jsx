import Fluxbone from "forpdi/jsx/core/store/Fluxbone.jsx";
import string from "string";

var URL = `${Fluxbone.BACKEND_URL}process`;

var processModel = Fluxbone.Model.extend({
	url: URL,
	validate(attrs, options) {
		var errors = [];
		if (string(attrs.name).isEmpty()) {
			errors.push("O nome do processo é obrigatório.");
		}
		if (errors.length > 0)
			return errors;
	}
});

var ProcessStore = Fluxbone.Store.extend({
	dispatchAcceptRegex: /^process-[a-zA-Z0-9]+$/,
	ACTION_LIST: 'process-listProcess',
	ACTION_CREATE: 'process-newProcess',
	url: URL,
	model: processModel,

	listProcess(data) {
		var me = this;
		$.ajax({
			url: `${me.url}/${data.id}`,
			method: 'GET',
			dataType: 'json',
			contentType: 'application/json',
			success(model) {
				me.trigger("processListed", model);
			},
			error(opts, status, errorMsg) {
				me.trigger("processListed", opts);
			}
		});
	},

	newProcess(data) {
		var me = this;
		$.ajax({
			url: `${me.url}/new`,
			method: 'POST',
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify(data.process),
			success(model) {
				me.trigger("processCreated", model);
			},
			error(opts, status, errorMsg) {
				me.trigger("processCreated", opts);
			}
		});
	},

	mainMenuState(data){
		var me = this;
		me.trigger("getmainmenustate", data);
	}
});


export default new ProcessStore();
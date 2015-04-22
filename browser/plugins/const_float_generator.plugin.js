(function(){
var Const = E2.plugins.const_float_generator = function(core, node) {
	AbstractPlugin.apply(this, arguments)

	this.desc = 'Emits a float constant specified in an input field. If an invalid string in entered, the field is reset to the previous value.';
	
	this.input_slots = [];
	
	this.output_slots = [
		{ name: 'value', dt: core.datatypes.FLOAT, desc: 'The currently entered value.', def: 1 }
	];
	
	this.state = { val: 1.0 };
};
Const.prototype = Object.create(AbstractPlugin.prototype)

Const.prototype.reset = function() {}

Const.prototype.create_ui = function() {
	var that = this
	var inp = this.$input = 
		$('<input type="number" step="0.1" value="1.0" style="width: 50px;" />')
	
	inp.css('border', '1px solid #999')
	inp.on('change', function() {
		var oldValue = that.state.val
		var newValue = that.state.val

		try { 
			var v = parseFloat(inp.val())
			if (!isNaN(v))
				newValue = v
		} catch(e) {
			return;
		}

		that.undoableSetState('val', newValue, oldValue)
	})

	this.etf = new ExpandableTextfield(this.node, inp, 7)

	return inp;
}

Const.prototype.update_output = function(slot) {
	return this.state.val
}

Const.prototype.state_changed = function(ui) {
	if (ui) {
		ui.val('' + this.state.val)
	}
}

})()
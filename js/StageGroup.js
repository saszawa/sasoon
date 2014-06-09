var StageGroup = Class.create(Group,{
	initialize: function(){
		Group.call(this);
		this._element = document.createElement('div');
	}
});

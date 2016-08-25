click: function(fn){
//  return this._ev('click', fn);
  this.on('click',fn);
  // todo: triggering

  return this;
}


//  return $(this.e[a<0?this.e.length+a:a]);
//  return a === -1 ? Array.prototype.slice(a) : Array.prototype.slice(a, + a + 1)

### zepto implementation:
      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)




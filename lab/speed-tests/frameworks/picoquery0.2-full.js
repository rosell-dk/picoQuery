/* picoquery.com/builder/0.2/?5-ffff1ff3 */
(function(w,d,u,$) {
  if (Array.isArray) {
    if (!w.$) {

      w.$ = $ = function() {
        // Allow to create new instances without new
        return function(a,b) {
          return new P(a,b);
        };
      }();

      // constructor
      function P(a,b){if(!a){this.e=[]}else if(typeof a>'s'){if(a[0]=='<'){var el=d.createElement('div');el.innerHTML=a;this.e=[].slice.call(el.children)}else{if(b){var roots=(b instanceof P?b.e:[b]);var arr=[];roots.forEach(function(b){var container,gaveContainer;if(!b.parentNode){container=document.createElement('div');container.appendChild(b)}if(!b.id){b.id='querySelectorAllinnerHTML';arr=arr.concat([].slice.call(b.parentNode.querySelectorAll('#'+b.id+' '+a)));b.id=''}else{arr=arr.concat([].slice.call(b.parentNode.querySelectorAll('#'+b.id+' '+a)))}if(container){container.removeChild(b)}});arr=arr.filter(function(item,i,r){return r.indexOf(item)==i});this.e=arr}else{b=(b instanceof P?b.e[0]:b);this.e=[].slice.call((b||d).querySelectorAll(a))}}}else if(typeof a == "function"){return $(d).ready(a)}else if(a.nodeType){this.e=[a]}else if(a instanceof P){this.e=a.e}else if(a.map){this.e=a}else{this.e=[a]}for(var i=0;i<this.e.length;i++){this[i]=this.e[i]}this.length=this.e.length;this.splice=[].splice}

      // methods
      $.fn = P.prototype = {
        addClass:function(value){this.e.forEach(function(el,i){if(el.nodeType===1){var a=[];var s=el.className+' '+((typeof value=="function")?value.call(el,i,el.className):value);s=s.replace(/[\t\r\n\f]/g," ");var arr=s.split(' ');arr.forEach(function(item){if((item!='')&&a.indexOf(item)<0){a.push(item)}});el.className=a.join(' ')}});return this},
        append:function(){var a=[].slice.call(arguments);this.e.forEach(function(el){for(var i=0;i<a.length;i++){$(a[i]).e.forEach(function(el2){el.appendChild(el2)})}});return this},
        appendTo:function(t){this.e.forEach(function(el){$(t).append(el)});return this},
        attr:function(name,value){if(value===u){if(!(0 in this.e)){return undefined}if(this.e[0].nodeType!=1){return undefined}var z=this.e[0].getAttribute(name);return(z==null?undefined:z)}else{this.e.forEach(function(node,index){function setOrRemoveAttribute(node,name,value){value==null?node.removeAttribute(name):node.setAttribute(name,value+"")}if(typeof name=="object"){for(key in name){setOrRemoveAttribute(node,key,name[key])}}else{if(typeof value == "function"){setOrRemoveAttribute(node,name,value.call(node,index,$(node).attr(name)))}else{setOrRemoveAttribute(node,name,value)}}});return this}},
        children:function(selector){var arr=this.e.map(function(a){return [].slice.call(a['children'])});arr=[].concat.apply([],arr);return $(arr).filter(selector||'*');return $(arr).filter(selector||'*')},
        css:function(name,value){if(value===u){var computed=getComputedStyle(this.e[0]);if(!this.e[0])return;return this.e[0].style[name]||computed.getPropertyValue(name)||computed[name]}else{this.e.forEach(function(el){el.style[name]=value})}return this},
        each:function(fn){this.e.forEach(function(el,index){fn.call(el,index,el)});return this},
        empty:function(){this.e.forEach(function(item){item.innerHTML=''});return this},
        filter:function(selector){return(selector=='*')?this:$(this.e.filter(function(element){return~$(selector,$(element).parent().e[0]).e.indexOf(element)}))},
        find:function(selector){if(typeof selector=="string"){var arr=[];this.e.forEach(function(item){arr=arr.concat($(selector,item).e)});arr=arr.filter(function(item,i,r){return r.indexOf(item)==i});return $(arr)}else{var searchInItems=this.e;var arr=$(selector).e.filter(function(searchForItem){return searchInItems.some(function(searchInItem){var node=searchForItem;while(node&&(node=node.parentNode)){if(node===searchInItem)return true}})});return $(arr)}},
        first:function(){return $(0<this.e.length?this.e[0]:0)},
        get:function(index){return index===u?this.e:this.e[index]},
        hide:function(){return this.css('display','none')},
        html:function(value){if(value===u){return(this.e[0]&&this.e[0].innerHTML)}this.e.forEach(function(item,index){if(typeof value == "function"){item.innerHTML=value.call(item,index,item.innerHTML)}else{item.innerHTML=value}});return this},
        map:function(fn){var arr=this.e.map(function(item,index){return fn.call(item,index,item)});return $(arr)},
        next:function(selector){var arr=this.e.map(function(a){return a["nextElementSibling"]});arr=arr.filter(function(item,i,r){return item!=null});return $(arr).filter(selector||"*")},
        on:function(events,handler){return this.e.forEach(function(el){el.addEventListener(events,handler,false)})},
        parent:function(selector){var arr=this.e.map(function(a){return a['parentNode']});arr=arr.filter(function(item,i,r){return item&&r.indexOf(item)==i});return $(arr).filter(selector||'*')},
        prepend:function(){var z=[].slice.call(arguments);this.e.forEach(function(b){z.forEach(function(a){$(a).e.forEach(function(c){b.insertBefore(c,b.firstChild)})})});return this},
        prev:function(selector){var arr=this.e.map(function(a){return a["previousElementSibling"]});arr=arr.filter(function(item,i,r){return item!=null});return $(arr).filter(selector||"*")},
        ready:function(handler){if(/^u|ng/.test(document.readyState))this.on('DOMContentLoaded',function(){handler($)});else{handler($)}return this},
        removeAttr:function(name){if(name){this.e.forEach(function(node){name.split(' ').forEach(function(attr){node.removeAttribute(attr)})})}return this},
        removeClass:function(a){this.e.forEach(function(el,index){if(!a){el.className=""}else{var z=typeof a == "function"?a.call(null,index,el.className):a;el.className=el.className.split(" ").filter(function(c){return 0>z.split(" ").indexOf(c)}).join(" ")}});return this},
        trigger:function(eventType){this.e.forEach(function(el){var ev=document.createEvent('HTMLEvents');ev.initEvent(eventType,true,false);el.dispatchEvent(ev)});return this}
      }

      // Standard events
      ;['click', 'focus', 'keyup'].forEach(function(a) {
        $.fn[a] = function(b){
          return b ? this.on(a,b) : this.trigger(a)
        }
      });

    }        
  }
  else {
    // jQuery fallback 
    d.write('<scrip' + 't src=https://code.jquery.com/jquery-1.9.1.min.js><' + '/script>');
  }
})(window,document);
  /*
  Its a close call whether gzipped file gets smaller if the function 
  returns its first argument (first variant) or not (second variant)

  When helper isnt inlined, calls will look like this:
  appendTo:function(t){return each(this,function(el){$(t).append(el)})},
  appendTo:function(t){each(this,function(el){$(t).append(el)});return this},

  however, the second variant wins in the gzip (see measurements below)
  probably ";return this" can be compressed neatly

  When helper is inlined, the calls will look like this:
  appendTo:function(t){return this.e.forEach(function(el){$(t).append(el)})?this:this},
  appendTo:function(t){this.e.forEach(function(el){$(t).append(el)});return this},

  The second variant is smallest. This is also true in gzip version, but not much

  Here are the meassurements:

                no inlining      all inline  EACH inlined
                v1 / v2          v1 / v2     v1/v2

  on:           518/514          472/469     509/506
  +addClass:    557/554          510/508     549/547
  +append:      594/590          550/544     585/583
  +appendTo:    613/608          567/565     605/602
  +each:        637/623          592/578     628/617
  +removeClass: 693/678          647/632     684/671
  +trigger      739/724          694/679     732/717

  Measurements show that the second variant wins in all cases
  It also shows that inlining wins with around 7 bytes, constant no matter how many
  times the function is used - gzip is clever
*/

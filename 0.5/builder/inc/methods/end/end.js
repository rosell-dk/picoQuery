/*
.end()

Description:
  End the most recent filtering operation in the current chain and return the set of matched elements to its previous state.
  http://api.jquery.com/end/

Signatures: 
  .end( ) => jQuery

 */
end: function() {
  return this.prevObject || $();
}


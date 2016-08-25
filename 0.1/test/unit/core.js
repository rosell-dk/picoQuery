QUnit.module( "core" );

QUnit.test( "Basic requirements", function( assert ) {
	assert.expect( 7 );
	assert.ok( Array.prototype.push, "Array.push()" );
	assert.ok( Function.prototype.apply, "Function.apply()" );
	assert.ok( document.getElementById, "getElementById" );
	assert.ok( document.getElementsByTagName, "getElementsByTagName" );
	assert.ok( RegExp, "RegExp" );
	assert.ok( jQuery, "jQuery" );
	assert.ok( $, "$" );
} );

QUnit.test( "Core", function( assert ) {
	assert.ok( Array.prototype.push, "Array.push()" );
	assert.ok( Function.prototype.apply, "Function.apply()" );
	assert.ok( document.getElementById, "getElementById" );
	assert.ok( document.getElementsByTagName, "getElementsByTagName" );
	assert.ok( RegExp, "RegExp" );
	assert.ok( jQuery, "jQuery" );
	assert.ok( $, "$" );
} );


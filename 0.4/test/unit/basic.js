QUnit.module( "basic" );

QUnit.test( "css", function( assert ) {
	assert.expect( 1 );

	var div = $( "<div/>" ).appendTo( "#qunit-fixture" );
	assert.strictEqual( div.css( "width", "50px" ).css( "width" ), "50px", ".css getter/setter" );
//  assert.ok( 1 == "1", "Passed!" );

} );

/*
QUnit.test( "append", function( assert ) {
	var div = jQuery( "<div/>" ).appendTo( "#qunit-fixture" );
} );
*/

QUnit.test( "attributes", function( assert ) {
	assert.expect( 6 );

	var a = jQuery( "<a/>" ).appendTo( "#qunit-fixture" ),
		input = jQuery( "<input/>" ).appendTo( "#qunit-fixture" );

	assert.strictEqual( a.attr( "foo", "bar" ).attr( "foo" ), "bar", ".attr getter/setter" );
	assert.strictEqual( a.removeAttr( "foo" ).attr( "foo" ), undefined, ".removeAttr" );
	assert.strictEqual( a.prop( "href", "#5" ).prop( "href" ),
		location.href.replace( /\#.*$/, "" ) + "#5",
		".prop getter/setter" );

	a.addClass( "abc def ghj" ).removeClass( "def ghj" );
	assert.strictEqual( a.hasClass( "abc" ), true, ".(add|remove|has)Class, class present" );
	assert.strictEqual( a.hasClass( "def" ), false, ".(add|remove|has)Class, class missing" );

	assert.strictEqual( input.val( "xyz" ).val(), "xyz", ".val getter/setter" );
} );

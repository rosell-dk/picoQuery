It would be most readable if we wrote:
if (typeof a === 'string') {

But we prioritize compact code over readability and speed, and can utilize the fact, that
there aren't any javascript datatype that comes after 'string', alphabetically
possible data types are: boolean, number, function, object, string)

There is the case when a string CLASS is passes instead of a literal.
Such strings are objects as far as the typeof operator is concerned.
But jQuery generally detects them as strings with the jQuery.type function

If we find the needs of a helper to behave like (jQuery.type(x) == 'string'), we can 
create one like this:
do this:

```
(a) {
  return (/\[object (.*)\]/.exec(toString.call(a))[1] == "String");
}

[[INLINE_VERSION]]
(/\[object (.*)\]/.exec(toString.call([[ARG1]]))[1] == "String")
```

It is a similar implementation to IS_OBJECT
We can maybe call it IS_STRING_TYPE, and maybe rename IS_STRING to IS_STRING_LITERAL



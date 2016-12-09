(a) {
  return (/\[object (.*)\]/.exec(toString.call(a))[1] == "Array");
}

[[INLINE_VERSION]]
(/\[object (.*)\]/.exec(toString.call([[ARG1]]))[1] == "Array")

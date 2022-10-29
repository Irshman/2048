function templateStr(tpl, attr) {
  for(var prop in attr) {
    if(attr.hasOwnProperty(prop)) {
      tpl = tpl.replace('{{' + prop + "}}", attr[prop])
    }
  }
  return tpl;
}
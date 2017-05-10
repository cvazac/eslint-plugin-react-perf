'use strict'

function isNativeElement (node) {
  if (node.parent.name.type !== 'JSXIdentifier') {
    return false
  }
  const nodeName = node.parent.name.name
  const firstChar = nodeName.charAt(0)
  return firstChar === firstChar.toLowerCase()
}

module.exports = {
  isNativeElement: isNativeElement
}

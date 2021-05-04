//Funtion takes a Array Buffer and converts it to readable img src !
export function getReadableImgSrc(buffer, contentType) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  //returing src for displaying IMG
  return `data:image/${contentType};base64,${window.btoa(binary)}`;
}

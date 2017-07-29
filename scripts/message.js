class Message {

  constructor(name, text) {
    this.name = name;
    this.text = text;
  }

  appendMsg(msg) {
    this.text = `<div class="aMsg">${msg}</div> ` + this.text;
  }

  

}

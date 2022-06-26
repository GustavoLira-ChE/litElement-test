import { LitElement, html } from "lit-element";

class GetData extends LitElement{
    static get properties(){
        return{
            url: {type: String},
            data: {type: Array}
        }
    }
    constructor(){
        super();
    }
    firstUpdated(){ 
        this.getData();
    }
    updated(){ 
        this.getData();
    }
    _sendData(data){
        this.dispatchEvent(new CustomEvent('ApiCall',{
            detail: {data}, bubbles: true, composed: true
        }))
    }
    async getData(){
        const response = await fetch(this.url);
        const jsonResponse = await response.json();
        this.data = jsonResponse.data;
        this._sendData(this.data);
    }
}

customElements.define("get-data", GetData);
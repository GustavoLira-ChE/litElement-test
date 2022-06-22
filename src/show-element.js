import { LitElement, html, css } from "lit-element";

class ShowElement extends LitElement{
    static get properties(){
        return{
            name: { type: String},
            type: {type: String},
            desc: { type: String},
            race: { type: String},
            archetype: { type: String},
            image_url: { type: String},
            amazon_price: { type: String},
            coolstuffinc_price: { type: String},
        }
    }
    constructor(){
        super();
    }
    render(){
        return html`
            <div>
                <h1>${this.name}</h1>
                <p>${this.type}</p>
                <p>${this.desc}</p>
                <p>${this.race}</p>
                <p>${this.archetype}</p>
                <img src="${this.image_url}">
                <div>
                    <p>${this.amazon_price}</p>
                    <p>${this.coolstuffinc_price}</p>
                </div>
            </div>
            
            `
    }
}

customElements.define("show-element", ShowElement);
import { LitElement, html, css } from "lit-element";
import "./get-data.js"

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
            data: {type: Array}
        }
    }
    constructor(){
        super();
        this.data = [];
        this.addEventListener('ApiCall', e => {
            this.data = e.detail.data;
        })
    }
    render(){
        return html`
            <get-data url="https://db.ygoprodeck.com/api/v7/cardinfo.php"></get-data>
            <h1>Show elements from an api</h1>
            ${this.data.filter((item, index) => index < 30).map(item => html`
            <div>
                <h3>${item.name}</h3>
                <p>${item.type}</p>
                <p>${item.desc}</p>
                <p>${item.race}</p>
                <p>${item.archetype}</p>
                <img src="${item.card_images[0].image_url}">
                <div>
                    <p>${item.amazon_price}</p>
                    <p>${item.coolstuffinc_price}</p>
                </div>
            </div>
            
            `)}
        `
    }
}

customElements.define("show-element", ShowElement);
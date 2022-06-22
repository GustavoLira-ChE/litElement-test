import { LitElement, html } from "lit-element";
import "./show-element.js"

class GetData extends LitElement{
    static get properties(){
        return{
            url: {type: String},
            data: {type: Array}
        }
    }
    constructor(){
        super();
        this.url = "https://db.ygoprodeck.com/api/v7/cardinfo.php"
    }
    connectedCallback(){
        super.connectedCallback();
        if(!this.data){
            this.getData();
        }
    }
    render(){
        return html`
            ${this.data.map(item => {
                console.log(item);
                html`<show-elements 
                        name="${item.name}"
                        type="${item.type}"
                        desc:"${item.desc}"
                        race: "${item.race}"
                        archetype: "${item.archetype}"
                        image_url: "${item.card_images.image_url}"
                        amazon_price: "${item.card_prices.amazon_price}"
                        coolstuffinc_price: "${item.card_prices.coolstuffinc_price}"
                    >
                    </show-elements>`
            })}
        `
    }
    async getData(){
        const response = await fetch(this.url);
        const jsonResponse = await response.json();
        this.data = jsonResponse.data;
        console.log(this.data);
    }
}

customElements.define("get-data", GetData);
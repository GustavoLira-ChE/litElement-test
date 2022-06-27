import { LitElement, html, css } from "lit-element";
import "./get-data.js";
import "./filter-nav.js";

class ShowElement extends LitElement{
    static get properties(){
        return{
            data: {type: Array},
        }
    }
    static get styles(){
        return css`
        #app-container{
            background-color: hsl(7, 93%, 12%);
            min-height: 100vh;
        }
        h1{
            margin: 0;
            padding: 8px;
            color: white;
        }
        .cards-container{
            margin-top: 32px;
            display: grid;
            gap: 32px;
            grid-template-columns: repeat(auto-fill, minmax(432px, 1fr));
            justify-content: space-around;
            justify-items: center;
        }
        .card-info{
            width: 300px;
            height: 292px;
            padding: 16px;
            background-color: white;
            overflow-y: scroll;
        }
        .card-wrapper{
            position: relative;
            display: flex;
            background-color: hsl(54, 46%, 63%);
            border-radius: 8px;
        }
        .card-wrapper-image{
            padding: 16px;
            height: 292px;
            object-fit: cover;
        }
        .card-image{
            width: 200px;
            object-fit: cover;
        }
        .sub-info{
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        `
    }
    constructor(){    
        super();
        this.data = [];
        this.addEventListener('FilterApiCall', e => {
            this.data = e.detail.data;
        })
    }
    firstUpdated(){
        this.addEventListener('FilterApiCall', e => {
            this.data = e.detail.data;
        })
    }
    render(){
        return html`
        <div id="app-container">
            <h1>Yugioh cards list</h1>
            <filter-nav></filter-nav>
            <div class="cards-container">
                ${this.data.map((item, index) => 
                html`
                <div class="card-wrapper">
                    <div class="card-wrapper-image">
                        <img class="card-image" src="${item.card_images[0].image_url}" />
                    </div>
                    <div class="card-info">
                        <h3><strong>Name:</strong> ${item.name}</h3>
                        <p><strong>Description:</strong> ${item.desc}</p>
                        <div class="sub-info">
                            <p><strong>Type:</strong> ${item.type}</p>
                            <p><strong>Race:</strong> ${item.race}</p>
                            <p><strong>Archetype:</strong> ${item.archetype ? item.archetype : "N/A"}</p>
                            <p><strong>Attribute:</strong> ${item.attribute}</p>
                        </div>
                        <div>
                            <h4>Prices</h4>
                            <div>
                                <p><strong>Amazon:</strong> ${item.card_prices[0].amazon_price}</p>
                                <p><strong>Cool Stuff Inc:</strong> ${item.card_prices[0].coolstuffinc_price}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `)}
        </div>
        `
    }
}

customElements.define("show-element", ShowElement);
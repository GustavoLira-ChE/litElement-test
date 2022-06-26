import { LitElement, html, css } from "lit-element";
import "./get-data.js";

class FilterNav extends LitElement{
    static get properties(){
        return{
            minIndex: {type: Number},
            maxIndex: {type: Number},
            data: {type: Array},
        }
    }
    constructor(){    
        super();
        this.data = [];
        this.minIndex = 0;
        this.maxIndex = 30;
        this.addEventListener('ApiCall', e => {
            this.data = e.detail.data;
        })
    }
    firstUpdated(){
        this.firstRender();
    }
    render(){
        return html`
            <get-data url="https://db.ygoprodeck.com/api/v7/cardinfo.php"></get-data>
            <h4>You can find card by Name, Race, Attribute, Type or Archetype</h4>
            <div>
                <div>
                    <label type="race">Name</label>
                    <input type="text" name="name" id= "name" placeholder="Card name">
                </div>
                <div>
                    <label type="race">Race</label>
                    <input type="text" name="race" id="race" placeholder="Beast">
                </div>
                <div>
                    <label type="attribute">Attribute</label>
                    <input type="text" name="atribute" id="attribute" placeholder="DARK">
                </div>
                <div>
                    <label type="type">Type</label>
                    <input type="text" name="type" id="type" placeholder="Effect Monster">
                </div>
                <div>
                    <label type="archetype">Archetype</label>
                    <input type="text" name="archetype" id="archetype" placeholder="Rokket">
                
                </div>
            </div>
            <button @click=${this.filterData}>Search</button>

        `
    }
    _sendData(data){
        this.dispatchEvent(new CustomEvent('FilterApiCall',{
            detail: {data}, bubbles: true, composed: true
        }))
    }
    inputs(){
        const name = this.renderRoot.querySelector("#name").value;
        const race = this.renderRoot.querySelector("#race").value;
        const attribute = this.renderRoot.querySelector("#attribute").value;
        const type = this.renderRoot.querySelector("#type").value;
        const archetype = this.renderRoot.querySelector("#archetype").value;
        return [name, race, attribute, type, archetype]
    }
    filterData(){
        const filterArray = this.inputs();
        this.data = this.data
            .filter(item => filterArray[0] ?item.name.match(filterArray[0]) : item)
            .filter(item => filterArray[1] ? item.race.match(filterArray[1]) : item)
            .filter(item => filterArray[2] ? item.attribute.match(filterArray[2]) : item)
            .filter(item => filterArray[3] ? item.type.match(filterArray[3]) : item)
            .filter(item => filterArray[4] ? item.archetype.match(filterArray[4]) : item)
        this._sendData(this.data);
        this.addEventListener('ApiCall', e => {
            this.data = e.detail.data;
        });
    }
    firstRender() {
        this.data = this.data.filter((_,index) => index >= this.minIndex & index <= this.maxIndex);
        this._sendData(this.data);
        this.addEventListener('ApiCall', e => {
            this.data = e.detail.data;
        });
    }
}
customElements.define("filter-nav",FilterNav);
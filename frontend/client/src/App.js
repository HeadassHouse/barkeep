import React,  {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import AddGuest from "./components/AddGuest";
import axios from "axios";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      names: '',
      drinkNames: '',
      valueName: '',
      valueDrink: ''
    };
    this.getNames = this.getNames.bind(this);
    this.updateGuests = this.updateGuests.bind(this);
    this.getDrinks = this.getDrinks.bind(this);
    this.updateDrinks = this.updateDrinks.bind(this);
  }



 submitDrink(e, x){
    var guestList = document.querySelector('#guests').childNodes;
    var drinkList = document.querySelector('#drinks').childNodes;
    for(let i = 0; i <  guestList.length;  i++){

      if(guestList[i].childNodes[0].childNodes[0].checked){
        e = guestList[i].childNodes[0].childNodes[0].value;
      }
    }
    for(let i =0; i < drinkList.length; i++){
      if(drinkList[i].childNodes[0].childNodes[0].checked){
        x = drinkList[i].childNodes[0].childNodes[0].value;
      }
    }

    console.log(e);
    console.log(x);

    let req = new XMLHttpRequest();
    req.open("POST", "http://192.168.1.5:8888/order", false);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify({
      "name": e,
      "drink": x
    }));
    console.log(req.responseText);
    window.location.reload();
  }

  async getNames(){
    axios.get("http://192.168.1.5:8888/guests")
        .then(response => this.updateGuests(response))
  }

  updateGuests(response){
    this.state.names.innerHTML = "";
    var data = response.data;
    console.log(data);
    for(let i  = 0; i < data.length; i++){
      var listElement = document.createElement("li");
      listElement.className = "person";
      var elementText = document.createElement("p");
      var x = document.createElement("input");
      x.setAttribute("type",  "radio" );
      x.setAttribute('value', data[i].name);
      x.name = 'guests';
      elementText.appendChild(x);
      elementText.innerHTML += " " + data[i].name;
      listElement.appendChild(elementText);
      this.state.names.appendChild(listElement);
    }
  }

  async getDrinks(){
    axios.get("http://192.168.1.5:8888/menu")
        .then(response => this.updateDrinks(response))
  }

  updateDrinks(response){
    this.state.drinkNames.innerHTML  = "";
    var data = response.data;
    console.log(data);
    for(let i  = 0; i < data.length; i++){
      var listElement = document.createElement("li");
      listElement.className = "drink";
      var elementText = document.createElement("p");
      var x = document.createElement("input");
      x.setAttribute("type",  "radio");
      x.setAttribute('value', data[i].name)
      x.name = 'drinks';
      elementText.appendChild(x);
      elementText.innerHTML += " " + data[i].name  + "<br>" + data[i].description;
      listElement.appendChild(elementText);
      this.state.drinkNames.appendChild(listElement);
    }

  }

  timedRefresh(timeoutPeriod){
    setTimeout("location.reload(true)", timeoutPeriod);
  }


  render() {
    return (
        <div className="App">
          <p>
            <strong>Welcome to the Headass House Party.  Please select your name and drink</strong>
          </p>
          <div class="row">
            <div class="column">
              <strong>Select your name here</strong>
              <ol id="guests"></ol>
            </div>
            <div class="column">
              <strong>Select your drink here</strong>
              <ol id="drinks"></ol>
            </div>
          </div>
          <button onClick={() => this.submitDrink(this.state.valueName.value, this.state.valueDrink.value)}>Submit Order</button>

          <p>{this.state.responseToPost}</p>

        </div>
    );
  }

  componentDidMount() {
    this.state.names = document.querySelector("#guests");
    this.state.drinkNames =  document.querySelector("#drinks");
    this.getNames();
    this.getDrinks();
    // try {
    //   setInterval(async () => {
    //    this.getNames();
    //   }, 1000);
    // } catch (e) {
    //   console.log(e);
    // }
  }
 }

export default App;
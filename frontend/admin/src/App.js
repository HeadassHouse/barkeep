import React,  {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import AddGuest from "./components/AddGuest";
import axios from "axios";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      guest: '',
      drink: '',
      desc: '',
      queue: '',
      drinkValue: '',
      drinkName: ''
    };

    this.submitGuests = this.submitGuests.bind(this);
    this.submitDrink = this.submitDrink.bind(this);
    this.removeGuest = this.removeGuest.bind(this);
    this.removeDrink = this.removeDrink.bind(this);
    this.getQueue = this.getQueue.bind(this);
    this.updateQueue = this.updateQueue.bind(this);
    this.cancelDrink = this.cancelDrink.bind(this);
    this.fulfillDrink = this.fulfillDrink.bind(this);
    this.changeDrinkStatus = this.changeDrinkStatus.bind(this);
  }


  async getQueue() {
    axios.get("http://192.168.1.5:8888/queue")
        .then(response => this.updateQueue(response))
  }

  updateQueue(response) {
    this.state.queue.innerHTML = "";
    var data = response.data;
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      var listElement = document.createElement("li");
      var elementText = document.createElement("p");
      var elementFulfill = document.createElement("button");
      elementFulfill.innerHTML = "Fulfill";
      var elementCancel = document.createElement("button");
      elementCancel.innerHTML = "Cancel";

      elementText.innerHTML = data[i].name + " - " + data[i].drink + " - " + "Drink Count-" + data[i].drinkCount + " -  " + data[i].orderDate;
      elementFulfill.onclick = () => {
        this.fulfillDrink(data[i].id);
        this.getQueue();
      };
      elementCancel.onclick = () => {
        this.cancelDrink(data[i].id, data[i].drink, data[i].name);
        this.getQueue();
      };
      listElement.appendChild(elementText);
      listElement.appendChild(elementFulfill);
      listElement.appendChild(elementCancel);
      this.state.queue.appendChild(listElement);
    }
  }

  changeDrinkStatus(e, x){
    let req = new XMLHttpRequest();
    req.open("POST", "http://192.168.1.5:8888/change_drink_status");
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify({
      "name": e,
      "value": x
    }));
    console.log(req.responseText);
  }

  submitGuests(e) {
    let req = new XMLHttpRequest();
    req.open("POST", "http://192.168.1.5:8888/add_guest", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify({
      'name': e
    }));
    console.log(req.responseText);
  }

  submitDrink(e, x) {
    let req = new XMLHttpRequest();
    req.open("POST", "http://192.168.1.5:8888/add_drink", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify({
      'name': e,
      'description': x
    }));
    console.log(req.responseText);
  }

  fulfillDrink(e) {
    let req = new XMLHttpRequest();
    req.open("POST", "http://192.168.1.5:8888/fulfill", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify({
      'id': e
    }));
    console.log(req.response);
  }

  cancelDrink(e, x, z) {
    let req = new XMLHttpRequest();
    req.open("POST", "http://192.168.1.5:8888/cancel_order", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify({
      'id': e,
      'drink': x,
      'name': z
    }));
    console.log(req.response);
  }

  removeGuest(e) {
    let req = new XMLHttpRequest();
    req.open("POST", "http://192.168.1.5:8888/remove_guest", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify({
      'name': e
    }));
    console.log(req.responseText);
  }

  removeDrink(e) {
    let req = new XMLHttpRequest();
    req.open("POST", "http://192.168.1.5:8888/remove_drink", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify({
      'drink': e
    }));
    console.log(req.responseText);
  }


  render() {
    return (
        <div className="App">
          <form>
            <p>
              <strong>Add/Remove Guest to Server:(Name)</strong>
            </p>
            <input
                id="guestName"
                type="text"
                value={this.state.post}
            />
            <p>
              <strong>Add Drink(Name, description)</strong>
            </p>
            <input
                id="drinkName"
                type="text"
                value={this.state.post}
            />
            <input
                id="drinkDesc"
                type="text"
                value={this.state.post}
            />
            <p>
              <strong>Change Drink Status(Name, 1 for available 0 for no more of this drink)</strong>
            </p>
            <input
                id="drinksName"
                type="text"
                value={this.state.post}
            />
            <input
                id="drinkValue"
                type="text"
                value={this.state.post}
            />
            <p>
              <strong>Remove Drink(Name)</strong>
            </p>
            <input
                id="drinkName"
                type="text"
                value={this.state.post}
            />
          </form>
          <button onClick={() => this.submitGuests(this.state.guest.value)}>Add User</button>
          <button onClick={() => this.submitDrink(this.state.drink.value, this.state.desc.value)}>Add Drink</button>
          <button onClick={() => this.removeGuest(this.state.guest.value)}>Remove User</button>
          <button onClick={() => this.removeDrink(this.state.drink.value)}>Remove Drink</button>
          <button onClick={() => this.changeDrinkStatus(this.state.drinkName.value, this.state.drinkValue.value)}>Change drink status</button>
          <p>{this.state.responseToPost}</p>
          <strong>Queue</strong>
          <ol id="queue"></ol>
        </div>
    );
  }

  componentDidMount() {
    this.state.guest = document.querySelector("#guestName");
    this.state.drink = document.querySelector("#drinkName");
    this.state.desc = document.querySelector("#drinkDesc");
    this.state.queue = document.querySelector("#queue");
    this.state.drinkValue = document.querySelector("#drinkValue");
    this.state.drinkName  = document.querySelector("#drinksName");
    try {
      setInterval(async () => {
        this.getQueue();
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  }
}

export default App;
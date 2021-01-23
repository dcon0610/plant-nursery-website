import React, { Component } from "react";
import "./style.css";
import TableData from "../TableData";
import Employees from "../../utils/API"

class Table extends Component {
 state = {
      employees: [],
      originalEmployees: [],
      sort: '',
      search: ''
     };
  componentDidMount() {
    Employees.getEmployees()
     .then(res => {
       this.setState({ employees: res.data.results })
       this.setState({ originalEmployees: res.data.results })
      
     })
     .catch(err => console.log(err));
    }

    sort = (event) => {
      console.log("event",event.target.id)
      const x = event.target.id
      var sorted=[...this.state.employees]
      switch(x) {
        case "1":
          sorted.sort(function(a, b) {
            var nameA = a.name.first.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.first.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1; //nameA comes first
            }
            if (nameA > nameB) {
              return 1; // nameB comes first
            }
            return 0;  // names must be equal
          });
          break
        case "2": 
        sorted.sort(function(a, b) {
          var nameA = a.name.last.toUpperCase(); // ignore upper and lowercase
          var nameB = b.name.last.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1; //nameA comes first
          }
          if (nameA > nameB) {
            return 1; // nameB comes first
          }
          return 0;  // names must be equal
        });
          break
        case "3":
          sorted.sort(function(a, b) {
            var nameA = a.location.city.toUpperCase(); // ignore upper and lowercase
            var nameB = b.location.city.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1; //nameA comes first
            }
            if (nameA > nameB) {
              return 1; // nameB comes first
            }
            return 0;  // names must be equal
          });
          break
        default: 
        console.error("error")
        break
      }

      console.log("sorted", sorted)
      this.setState({employees: sorted})
      console.log("state", this.state)
    }

    reset = () => {

      this.setState({employees: this.state.originalEmployees})
    }
    handleInputChange = event => {
      if (event.target.value===''){
        this.setState({employees: this.state.originalEmployees})
        return
      }
      
      console.log(event.target.value)

      let filtered = this.state.employees.filter(function (e) {
        return e.name.first.startsWith(event.target.value);})
      this.setState({
       employees: filtered
      });
    };



  
  render() {
  return (
    <div className="text-center">
      <p>Filter by first Name: </p>
      <form className="form">
          <input
            name="firstName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="filter by first name"
          />
      </form>
      <p></p>
      <button onClick={this.reset}  className="btn btn-primary btn-sm">reset table</button>

    <table className="table table-striped">
    <thead>
      <tr>
       
        <th ><div>First Name</div> <div><button onClick={this.sort} id="1" className="btn btn-primary btn-sm">sort alphabetically</button></div></th>
        
        <th ><div>Last Name</div> <div><button onClick={this.sort} id="2" className="btn btn-primary btn-sm">sort alphabetically</button></div></th>
        <th >Gender</th>
        <th >Phone Number</th>
        <th ><div>City</div> <div><button onClick={this.sort} id="3" className="btn btn-primary btn-sm">sort alphabetically</button></div></th>
      </tr>
    </thead>
    <tbody>
    {this.state.employees.map(( employee) => (
          <TableData
        index = {employee}
        firstName = {employee.name.first}
        lastName = {employee.name.last}
        gender = {employee.gender}
        phoneNumber = {employee.cell}
        location = {employee.location.city}

          />
    ))}
    </tbody>
  </table>
  </div>
  )
    
}
}

export default Table;

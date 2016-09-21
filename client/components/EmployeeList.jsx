import React, {Component} from 'react';
import {Employees} from '../../imports/collections/employees';
import {createContainer} from 'meteor/react-meteor-data';
import EmployeeDetail from './EmployeeDetail';

const PER_PAGE = 20;

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {page: 1}
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }
  render() {
    return (
      <div>
        <div className="employee-list">
          {this.props.employees.map((employee) => {
            return (
              <EmployeeDetail
                employee={employee}
                key={employee._id} />
            )
          })}
        </div>
        <button
          onClick={this.handleButtonClick}
          className="btn btn-primary">
          Load More...
        </button>
      </div>
    )
  }
  handleButtonClick() {
    Meteor.subscribe('employees', PER_PAGE * (this.state.page + 1));
    this.setState({page: this.state.page + 1});
  }
}

export default createContainer(() => {
  //set up subscription
  //return an object
  //whatever is returned is sent to employeelist as props
  //fetch gets the array of objects represented by the cursor
  Meteor.subscribe('employees', PER_PAGE);
  return {employees: Employees.find({}).fetch()};
}, EmployeeList);

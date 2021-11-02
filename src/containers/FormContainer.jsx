import React, { Component } from "react";
/* Import Components */
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Button from "../components/Button";

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: {
        FirstName: "",
        LastName: "",
        Email: "",
        Phone: "",
        Birth: "",
        Address: ""
      },
    };
    this.handleTextArea = this.handleTextArea.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          [name]: value
        }
      }),
      () => console.log(this.state.newUser)
    );
  }

  handleTextArea(e) {
    console.log("Inside handleTextArea");
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          Address: value
        }
      }),
      () => console.log(this.state.newUser)
    );
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      newUser: {
        FirstName: "",
        LastName: "",
        Email: "",
        Phone: "",
        Birth: "",
        Address: ""
      },
    });
  }


  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newUser;
    const qs = require('qs');
    let bodyData = qs.stringify(userData);
    //console.log("test",bodyData)

    fetch("http://localhost:5001/Applicants", {
      mode: "no-cors",
      method: "POST",
      body: bodyData,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      }
    }).then(response => {
      console.log(response)
      e.preventDefault();
        this.setState({
          newUser: {
            FirstName: "",
            LastName: "",
            Email: "",
            Phone: "",
            Birth: "",
            Address: ""
          },
      });
      alert("Thank you:) Infomation recorded")
    })
     /* .then(data => {
        console.log("Successful" + data);
      });
*/
  }

  


  render() {
    return (
      <form className="container-fluid" onSubmit={this.handleFormSubmit} s>
        <Input
          inputType={"text"}
          title={"First Name"}
          name={"FirstName"}
          value={this.state.newUser.FirstName}
          placeholder={"Enter your firstname"}
          handleChange={this.handleInput}
        />{" "}
        {/* Name of the user */}
        <Input
          inputType={"text"}
          title={"Last Name"}
          name={"LastName"}
          value={this.state.newUser.LastName}
          placeholder={"Enter your lastname"}
          handleChange={this.handleInput}
        />{" "}
        {/* Name of the user */}
        <Input
          inputType={"text"}
          title={"Email"}
          name={"Email"}
          value={this.state.newUser.Email}
          placeholder={"Enter your email"}
          handleChange={this.handleInput}
        />{" "}
        {/* Name of the user */}
        <Input
          inputType={"text"}
          title={"Phone  -  'xxx-xxx-xxxx'"}
          name={"Phone"}
          value={this.state.newUser.Phone}
          placeholder={"Enter your Phone -- (Format: '732-640-0000'"}
          handleChange={this.handleInput}
        />{" "}
        {/* Name of the user */}
        <Input
          inputType={"text"}
          title={"Birth - 'year-month-day'"}
          name={"Birth"}
          value={this.state.newUser.Birth}
          placeholder={"Enter your Birth -- (Format: '1996-01-01'"}
          handleChange={this.handleInput}
        />{" "}
        {/* Name of the user */}
        <TextArea
          title={"Address"}
          rows={10}
          value={this.state.newUser.Address}
          name={"Address"}
          handleChange={this.handleTextArea}
          placeholder={"Your Address"}
        />
        {/* About you */}
        <Button
          action={this.handleFormSubmit}
          type={"primary"}
          title={"Submit"}
          style={buttonStyle}
        />{" "}
        {/*Submit */}
      </form>
    );
  }
}
const buttonStyle = {
  margin: "10px 10px 10px 10px"
};

export default FormContainer;

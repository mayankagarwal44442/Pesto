import React, { Component } from "react";
import jwt_decode from "jwt-decode";

class AusLanding extends Component {
  constructor() {
    super();
    this.state = {
      post: "",
      postId: {},
      visible : "all",
      readablePosts:[],
      isloaded : false
    };
  }

  async componentDidMount()
  {
    console.log("Component mounted Successfully");
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
    
    render() {
      return (
      <div class = "flow-text">
        <div class = "card-panel aus">
            <div class = "AboutUS">
                <p class="brand-logo center"><i class="material-icons">ac_unit</i>PESTO</p>
                <p>Pesto is a hobby  project designed by 2 geeks who had some free time during the corona Lockdown in India,<br/>
                We started learning MERN stack and developed our blogging platform simultaneously.Our Website will be made opensource 
                and anyone who wishes to contribute will be most welcome.<br/>We do not sell your data.</p>
                <p>The name Pesto is attributed to the creaters love for Pasta.</p>
                <p class = "creaters"><br/>
                    R Siva Girish : PES1201700159<br/>
                    Email - ID    : sivagirish81@gmail.com<br/>
                    <br/>
                    Mayank Agarwal: PES1201701349<br/>
                    Email - ID    : mayankagarwal4442@gmail.com<br/>
                </p>
            </div>
        </div>
        </div>
      );
    }
}

export default AusLanding;


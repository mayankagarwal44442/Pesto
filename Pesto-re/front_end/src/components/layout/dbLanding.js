import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { pestoPost } from "../../actions/pestoActions";
import jwt_decode from "jwt-decode";

class dbLanding extends Component {
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
    // As soon as it mounts it has to display all pestos
    console.log("Owner = ",jwt_decode(localStorage.getItem("jwtToken")));
    const response = await fetch('/api/v1/pestos/display');
    const data = await response.json();
    console.log("Data : ",data);
    this.setState({isloaded:true,readablePosts:data});
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  
  onSubmit = e => {
    e.preventDefault();
    const userobj = jwt_decode(localStorage.getItem("jwtToken"));
    console.log("Posted-by : ",userobj.name);
    var cdate = Date();
    cdate = cdate.toString();
    const userData = {
          pestoid : 3,
          post: this.state.post,
          posted_by:userobj.name,
          timestamp : cdate,
          visible : "all"
        };
    console.log("userData : ",userData);
    this.props.pestoPost(userData);
    window.location.reload(true);
    };
    
    render() {
      const {readablePosts} = this.state;
      return (
        <div class = "container">
          <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <textarea class = "posts"
                  style={{
                    height : "100px",
                  }}
                  onChange={this.onChange}
                  value={this.state.post}
                  id="post"
                  type="post"
                />
                <label htmlFor="post">What's on your mind??</label>
                <span className="red-text">
                </span>
              </div>
                <button
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                Post
                </button>
            </form>
        <div class = "scroll">
        <>
          {readablePosts.reverse().map((key) => {
            return <div class = "flow-text card-panel blue-grey lighten - 4 pestostyle"><i class="material-icons tsize">ac_unit</i>{key.posted_by}<div class = "pestotext">{key.post}</div></div>
            })}
        </>
        </div>
        </div>
      );
    }
}

dbLanding.propTypes = {
  pestoPost : PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { pestoPost }
)(dbLanding);


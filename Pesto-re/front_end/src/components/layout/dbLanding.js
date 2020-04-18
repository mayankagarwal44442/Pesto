import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { pestoPost } from "../../actions/pestoActions";
import jwt_decode from "jwt-decode";
import {encode,decode,assign_codes,remove_frequencies,buildtree,sort_on_freqs,calc_frequency} from "../../Utils/Huffman_Denc";

class dbLanding extends Component {
  constructor() {
    super();
    this.state = {
      post: "",
      postHash:[],
      postId: {},
      visible : "all",
      readablePosts:[],
      isloaded : false,

      mypost : {}
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
    let trimmed_tree = remove_frequencies(buildtree(sort_on_freqs(calc_frequency(this.state.post))));
    this.state.post = encode(trimmed_tree,this.state.post);
    console.log("TT=",trimmed_tree);
    this.state.postHash = trimmed_tree;
    const userData = {
          pestoid : 3,
          post: this.state.post,
          postHash: trimmed_tree,
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
      let posters = JSON.parse(JSON.stringify(this.state.readablePosts));
      ////console.log(posters);
      ////console.log(posters[0][0].post);
      //var trimmed_tree;
      posters.forEach(poster => {
        //console.log("pp=",poster.post);
        var s = poster.post;
        console.log("poster.post",s);
        console.log("racoon",poster.postHash);
        if (poster.post !== undefined)
        {
          //trimmed_tree = remove_frequencies(buildtree(sort_on_freqs(calc_frequency(s))));
          //console.log("TT = ",trimmed_tree);
          //console.log(decode(trimmed_tree,poster.post));
          poster.post = decode(poster.postHash,s);
          console.log("mp",poster.post);
        }
      });
      
      
      //for (i = 0;i < posters.length;i++)
      //{
      //  trimmed_tree = remove_frequencies(buildtree(sort_on_freqs(calc_frequency(posters[i].post))));
      //}
      //readablePosts.reverse().map((key) => {
      //  let trimmed_tree = remove_frequencies(buildtree(sort_on_freqs(calc_frequency(this.state.post))));
      //  key.post = decode(trimmed_tree,key.post);
      //  })
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
          {posters.reverse().map((key) => {
            console.log(key.post);
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


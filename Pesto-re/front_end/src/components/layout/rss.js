import React, { Component } from "react";
import ReactDOM from 'react-dom';

import "./rss.css"

class rss extends Component {
  constructor() {
    super();
    this.myref = React.createRef();
    this.xhr = {}
    this.obj = {
      divinner: {},
      getNews: () => {
        this.xhr = new XMLHttpRequest();
        this.xhr.onreadystatechange = this.obj.processNews;
        // Using a cors proxy to access the rss feed
        this.xhr.open("GET", "https://cors-anywhere.herokuapp.com/https://www.nasa.gov/rss/dyn/breaking_news.rss", true);
        this.xhr.send();
      },
      processNews: () => {
        if (this.xhr.readyState == 4 && this.xhr.status == 200) {
          console.log(this.xhr.responseXML.documentElement);
          let root = this.xhr.responseXML.documentElement;
          let items = root.getElementsByTagName("item");

          let elep = document.createElement("p");

          for (let i = 0; i < items.length; ++i) {
            let elea = document.createElement("a");
            elea.href = items[i].getElementsByTagName("link")[0].firstChild.nodeValue;
            elea.innerHTML = items[i].getElementsByTagName("description")[0].firstChild.nodeValue + "\t\t\t\t\t";
            elep.appendChild(elea);
          }



          let eled = document.createElement("div");
          eled.appendChild(elep);
          eled.className = "marquee";
          console.log(eled);

          this.obj.divinner.innerHTML = "";
          this.obj.divinner.appendChild(eled);
        }
      }
    };
  }


  componentDidMount() {
    this.obj.divinner = this.myref.current;
    this.obj.getNews();
    setInterval(this.obj.getNews, 40000);
  }

  render() {
    return (
      <div class = "card-panel transparent" ref={this.myref}>
      </div>
    );
  }
}

export default rss;
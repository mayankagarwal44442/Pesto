import React, { Component } from "react";
import ReactDOM from 'react-dom';


class rss extends Component {
    constructor() {
      super();
      this.myref = React.createRef();
      this.xhr = {}
      this.obj = {
        divinner: {},
        getNews : () =>
        {
            this.xhr = new XMLHttpRequest();
            this.xhr.onreadystatechange =  this.obj.processNews;
            this.xhr.open("GET","https://www.nasa.gov/rss/dyn/breaking_news.rss",true);
            this.xhr.send();
        },
        processNews : () =>
        {
            if (this.xhr.readyState == 4 && this.xhr.status == 200)
            {
                let root = this.xhr.responseXML.documentElement;
                let item = root.getElementsByTagName("item")[0];
                let title = root.getElementsByTagName("title")[0];
                let link = root.getElementsByTagName("link")[0];
                let text = item.getElementsByTagName("description")[0].firstChild.nodeValue;
                let anchor = document.createElement("a");
                anchor.innerHTML = text;
                anchor.href = link.firstChild.nodeValue;
                this.obj.divinner.innerHTML = " ";
                this.obj.divinner.appendChild(anchor);
            }
        },
        scroll : () => 
        {
            if (this.obj.divinner.offsetLeft + this.obj.divinner.offsetWidth < 2)
            {
                this.obj.divinner.style.left = window.innerWidth - 5 + "px";
            }
            else
            {
                this.obj.divinner.style.left = this.obj.divinner.offsetLeft - 5 + "px";
            }
            setTimeout(this.obj.scroll,30);
        }
      };
    }
  
  
    componentDidMount() {
        this.obj.divinner = this.myref.current;
        this.obj.divinner.style.left = window.innerWidth - 5 + "px";
        this.obj.scroll();
        setInterval(this.obj.getNews,500);
    }
  
    render() {
      return (
        <div >
            <div ref = {this.myref}>

            </div>
        </div>
      );
    }
  }

export default rss;
import React, { Component } from "react";
import MyNavLink from "../../components/MyNavLink";
import { Route, Switch, Redirect } from "react-router-dom";
import News from "./News";
import Message from "./Message";
import Header from '../../components/Header/'
import PostQuestion from'./PostQuestion'
import QuestionList from './QuestionList'


export default class Home extends Component {
  constructor(){
    super()
    this.state={
      isLoggined:false
    }
    this.refreshPage= this.refreshPage.bind(this);
  }
  refreshPage(){
    window.location.reload()
  }

  render() {
    return (
      <div>
        <Header/>
        <h3>我是Home的内容</h3>
        <button onClick={this.refreshPage}>Click to refresh</button>
        
        <div>
          <ul className="nav nav-tabs">
            <li>
              <MyNavLink replace to="/home/news"className="link">
                News
              </MyNavLink>
            </li>
            <li>
              <MyNavLink replace to="/home/message" className="link">
                Message
              </MyNavLink>
            </li>
             <li>
              <MyNavLink replace to= '/home/postquestion' className="link" >
                Post Question
              </MyNavLink>
            </li>
            <li className="tab">
                  <MyNavLink replace to="/home/questionlist" className="link">
                    All Questions
                  </MyNavLink>
            </li>
          </ul>
          {/* 注册路由 */}
          <Switch>
            <Route path="/home/news" component={News} />
            <Route path="/home/message" component={Message} />
            <Route path="/home/postquestion" component={PostQuestion} />
            <Route path="/home/questionlist" component={QuestionList} />
            <Redirect to="/home/news" />
          </Switch>
        </div>
      </div>
    );
  }
}

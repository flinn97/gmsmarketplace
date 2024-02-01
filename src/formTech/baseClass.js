import { Component } from 'react';


/**
 * design pattern inheritance: avoid rewriting code by having a parent class own frequently used code.
 */
export default class BaseClass extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.updateObj = this.updateObj.bind(this);


    this.state={

      
    }
  }

  updateObj(e){
    let { name, value } = e.target;
    let obj = this.props.obj;
    if(obj){
      obj.setCompState({[name]:value});

    }
    
  }
  sendToFirebaseBackend(){};
  updateRelatedItems(){};

  handleChange(e) {
    let { name, value } = e.target;
    this.setState({ value: value });
    this.updateObj();
}

  render(){
  return (
    <>
    </>
  )}
}

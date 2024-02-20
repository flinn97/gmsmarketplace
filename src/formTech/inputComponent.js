import BaseClass from './baseClass';
/**
 * design pattern Encapsulation create single usage classes that do one thing.
 */
class InputFormComponent extends BaseClass {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <input type="text" onChange={this.handleChange} name={this.props.name} value={this.state.value}/>
        );
    }
}

//Design pattern Observer: it observes something and then udates something else from the observation. 
// let arr = [InputFormComponent.render]

// function stateObserver(){
//     for(let func of arr){
//         func();
//     }
    
// }

// function setState(obj){
//   this.state={...this.state, ...obj};
//   stateObserver();
// }

export default InputFormComponent;
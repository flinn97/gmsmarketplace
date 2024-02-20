import BaseClass from './baseClass';
export default class TextAreaFormComponent extends BaseClass {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <textarea 
            
                onChange={this.handleChange}
                name={this.props.name}
                value={this.state.value}
               
            ></textarea>
        );
    }
}

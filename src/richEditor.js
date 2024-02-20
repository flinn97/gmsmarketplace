import BaseClass from "./formTech/baseClass";
export default class TextAreaFormComponent extends BaseClass {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div contentEditable='true'></div>
        );
    }
}

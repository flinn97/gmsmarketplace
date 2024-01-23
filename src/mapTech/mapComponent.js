import BaseClass from './baseClass';


//model
export default class MapComponentItem extends BaseClass {
  constructor(props){
    super(props);


    this.state={

    }
  }


  render(){
    let props = this.props.props
    let list = props.list
    let cells = props.cells;
    let factory = props.interface.getFactory();
   

  return (
    <div>
        {list.map((obj, index)=>
        <div key = {index}>
            {cells.map((cell, i)=>{
             let type = cell.type
            
             if(!type){
                
                let arr = ["del", "edit", "img"]

                 type=arr[arr.indexOf(cell)]
                 if(!type){
                    type = "attribute";
                    let attribute = obj.getJson()[cell];
                    if(!attribute){
                        type="text"
                     }

                 }
                 
             }

             let p = {obj:obj, props:props, cell:cell};
             
            return <>{factory.getComponent(type, p)}</>}
            )}
            </div>
        )}
    </div>
  )}
}



//TODO look up different ideas online
class DefaultForms {
    getFormsThemeDesktop(){
        let style={
              inputStyle:{width:"150px", height: "25px", marginTop:"10px", fontSize:"15px", color:"black", borderRadius:"3px", background: "gainsboro", border: "none"},//TODO add person input
              wrapperStyle:{width:"150px"},
              labelStyle:{},
              textBoxLabelStyle:{},
              textBoxWrapperStyle:{marginTop:"10px", fontSize:"15px", color:"black", borderRadius:"3px", },
              textBoxStyle:{width:"175px", height:"100px", fontSize:"14px", color:"black", borderRadius:"3px"},//TODO Text box make look better add person notes
              richEditorStyle:{width:window.innerWidth<1200?"300px":"500px", height:"200px", marginBottom:"40px", background: "gainsboro"},//TODO Make look better Add card description
              richEditorLabelStyle:{marginBottom: "7px"},
              richEditorWrapperStyle:{},
              switchLabelStyle:{},
              switchWrapperStyle:{},
              switchStyle:{backgroundColor:"#FF0000"},
              selectWrapperStyle:{},
              selectLabelStyle:{},
              selectStyle:{},
              rangeBar:{width:"200px", height:"10px", backgroundColor:"gray", position:"relative", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center"},
              rangeWrapperStyle:{},
              rangeLabelStyle:{},
              rangeThumb:{width:"10px", height:"20px", position:"absolute", background:"purple", borderRadius:"10px",cursor:"pointer"},
              radioLabelStyle: {},
              radioWrapperStyle:{},
              radioStyle:{},
              inputStart:{width:"120px", height: "40px", fontSize:"25px", color:"purple" },
              checkWrapperStyle:{},
              checkLabelStyle:{},
              tickStyle:{},
              formsWrapperStyle:{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop:"10px"},
              buttonTextStyle:{display:"flex", justifyContent:"center", alignItems:"center", color:"white", cursor:"pointer", background: "#3CB371", width:"80px", height:"25px", borderRadius:'10px', fontSize:"14px", marginTop: "10px"},//TODO 
              runbuttonWrapperStyle:{},//TODO Save button add person
              delbuttonWrapperStyle:{},
              clearbuttonWrapperStyle:{}

            }
            
  
            
          return style
      }

      getFormsTheme(){
        return this.getFormsThemeDesktop();
      }
   
}
export default new DefaultForms();

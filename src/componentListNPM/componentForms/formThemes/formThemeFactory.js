// import DefaultSideNav from "./defaultSideBar";
// import DefaultTopNav from "./defaultTopBar";
// import flinnApps from "./flinnAppsNav";
// import LegatoNav from "./legatoNav";
// import LegatoNavDark from "./legatoNavDark";
// import MinimalNav from "./minimalNav";
import DefaultForms from "./defaultForms.js";
import DreamMakerForms from "./dreamMakerForms.js";

// import minimalNav from "./minimalNav";

class FormsThemeFactory {
    operationsFactory;

    factory ={
    
    default: DefaultForms.getFormsTheme(),
    dreamMaker: DreamMakerForms.getFormsTheme(),
    }

    registerComponents(register){
        this.factory[register.name]= register.component;
    }
    getFormsThemeFactory(){
        return this.factory;
    }

   
}
export default new FormsThemeFactory();
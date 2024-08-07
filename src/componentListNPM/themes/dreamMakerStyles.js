import { normalizeUnits } from "moment"

class DefaultStyles {
    //********FULL SCREEN DESKTOP********/
    getstyles() {

        let appBorders =
        {
            borderThin: "1px solid #1B1B1B",
            borderThick: "2px solid #1B1B1B",
            borderThickest: "4px solid #1B1B1B",
            borderDouble: "double #32a999",
        }

        let appShadows =
        {
            shadow1: "1px 2px 3px #1B1B1B",
            shadow2: "2px 3px 4px #999999",
        }

        let appFonts= {
            //typeface
            appTitle: "'Roboto', sans-serif",
            appFont: "'Roboto', sans-serif",
            appBold: "",
            appItalic: "",
            appFont2: "",
            appFont3: "",     

            //weight
            fontWeight100: "100",
            fontWeight300: "300",
            fontWeightNormal: "400",
            fontWeightBold: "700",
            fontWeightHeavy: "900",

            //letter spacing
            spacingNormal: "normal",
            spacingWide: ".11rem",
            spacingTight: "-.12vw",

            //size
            fontBody: "1.3vh",
            fontSmall: ".94vh",
            fontSubheader1: "1.6vh",
            fontSubheader2: "2vh",
            fontHeader1: "3vh",
            fontHeader2: "3.4vh",
            fontHeader3: "3.9vh",
            fontHeader4: "4.25vh",
            fontHeader5: "4.44vh",
        }

        let colorPalette =
        {
            color1:"#4B0082",//purple
            color2:"#FFA500",//orange
            color3:"#FFFF00",//yellow
            color4:"#3CB371",//green
            color5:"#508FE5",//blue
            color6:"#4B0082",//purple
        }

        let appColors =
        {
            color1: colorPalette.color1,//red
            color2:"#FF7F50",//red orange
            color3: colorPalette.color2,//orange
            color4:"#FFD700",//orange yellow
            color5: colorPalette.color3,//yellow
            color6:"#ADFF2F",//yellow green
            color7: colorPalette.color4,//green
            color8:"#008B8B",//green blue
            color9: colorPalette.color5,//blue
            color10:"#0000CD",//blue purple
            color11: colorPalette.color6,//purple
            color12:"#8B008B",//purple red
            color13:"#8B4513",//brown
            colorWhite:"#ffffff",
            colorBlack:"#0d0a0b",


        }


        let styles = {
            //TODO: Create or check all styles
            colorPalette:
            {
                color1:"#4B0082",//purple
                color2:"#FFA500",//orange
                color3:"#FFFF00",//yellow
                color4:"#3CB371",//green
                color5:"#508FE5",//blue
                color6:"#4B0082",//purple
            },
            page1:
            {   
            paddingTop:"100px", 
                background:colorPalette.color5,
                display:"flex",
                flexDirection: "row",
                width: "100vw",
                height: "100vh"
            },

            smallestCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "20vh"
            },

            smallerCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "75%"
            },

            smallCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "83%"
            },

            bigCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "87%"
            },

            biggerCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "89%"
            },

            biggestCardContentWithTab:
            {   padding: ".5rem 1rem",
            
                top: "50%",
                height: "85%"
            },

            tallCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "87%"
            },

            tallerCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "89%"
            },

            tallestCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "91%"
            },

            cardContent:
            {   padding: ".5rem 1rem",
                height: "100%",
            },
           
            smallestCard:
            {   
                width: "10vw",
                height: "30vh",
                
                
                background: appColors.colorWhite,
                borderRadius: "1rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none",
            },
            smallestCardBorderless:
            {   width: "8.5vw",
                height: "20vh",
                
                background: appColors.colorWhite,
                userSelect: "none",
            },


            smallerCard:
            {    
                width: "19vw",
                height: "26.5vh",
                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none",
            },
            smallerCardBorderless:
            {   width: "19vw",
                height: "26.5vh",
                 
                
                background: appColors.colorWhite,
                userSelect: "none",
            },


            smallCard:
            {    
                width: "29.5vw",
                height: "38vh",
                 
                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none",
            },
            smallCardBorderless:
            {   width: "29.5vw",
                height: "38vh",
                 
                
                background: appColors.colorWhite,
                userSelect: "none",
            },


            bigCard:
            {  
                width: "40vw",
                height: "70.5vh",
                 

                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },
            bigCardBorderless:
            {   width: "40vw",
                height: "49.5vh",
                 
                
                background: appColors.colorWhite,
                userSelect: "none",
            },


            biggerCard:
            {   
                width: "50.5vw",
                height: "85vh", 
                  

                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },
            biggerCardBorderless:
            {   width: "50.5vw",
                height: "61vh",
                 
                
                background: appColors.colorWhite,
                userSelect: "none",
            },
            

            biggestCard:
            {   
                width: '80vw',
                height: "85vh",
                 
                                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                padding: "10px 10px 5vh 10px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none",
            },
            biggestCardBorderless:
            {   width: "95vw",
                height: "72.5vh",
                 
                
                background: appColors.colorWhite,
                userSelect: "none",
            },
            

            tallCard:
            {   
                width: "25vw",
                height: "85vh",
                 
                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },
            tallCardBorderless:
            {   width: "19vw",
                height: "50vh",
                 
                
                background: appColors.colorWhite,
                userSelect: "none",
            },
            

            tallerCard:
            {   
                width: "19vw",
                height: "62vh",
                 
                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },
            tallerCardBorderless:
            {   width: "19vw",
                height: "62vh",
                 
                
                background: appColors.colorWhite,
                userSelect: "none",
            },
            
            
            tallestCard:
            {    
                width: "19vw",
                height: "75vh",
                 
                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },
            tallestCardBorderless:
            {   width: "19vw",
                height: "75vh",
                 
                
                background: appColors.colorWhite,
                userSelect: "none",
            },
            


            borderlessTab:
            {   width:"100%", 
                height:"3rem", 
                background: appColors.colorWhite, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab:
            {   
                //  
                width:"100%", 
                height: "3rem", 
                background: colorPalette.color1, 
                borderRadius:"15px 15px 0px 0px",
                padding: "1rem",
            },
            colorTab1:
            {    
                width:"100%", 
                height: "3rem", 
                background: appColors.color1, 
                borderRadius:"1.5rem 23px 0px 0px",
                padding: "1rem",
            },
            colorTab2:
            {    
                width:"100%", 
                height: "3rem", 
                background: appColors.color2, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab3:
            {    
                width:"100%", 
                height: "3rem", 
                background: appColors.color3, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab4:
            {    
                width:"100%", 
                height: "3rem", 
                background: appColors.color4, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab5:
            {    
                width:"100%", 
                height: "3rem", 
                background: appColors.color5, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab6:
            {    
                width:"100%", 
                height: "3rem", 
                background: appColors.color6, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab7:
            {    
                width:"100%", 
                height: "3rem", 
                background: appColors.color7, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab8:
            {    
                color: "#ffffff",
                width:"100%", 
                height: "3rem", 
                background: appColors.color8, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab9:
            {    
                color: "#ffffff",
                width:"100%", 
                height: "3rem", 
                background: appColors.color9, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab10:
            {    
                color: "#ffffff",
                width:"100%", 
                height: "3rem", 
                background: appColors.color10, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab11:
            {    
                color: "#ffffff",
                width:"100%", 
                height: "3rem", 
                background: appColors.color11, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab12:
            {    
                color: "#ffffff",
                width:"100%", 
                height: "3rem", 
                background: appColors.color12, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab13:
            {    
                color: "#ffffff",
                width:"100%", 
                height: "3rem", 
                background: appColors.color13, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTabWhite:
            {   
                width:"100%", 
                height: "3%", 
                background: appColors.colorWhite, 
                borderRadius:"1.5vw 1.5vw 0px 0px",
                padding: "1.2vh",
                marginBottom: "2.5vh"
            },
            colorTabBlack:
            {    
                color: "#ffffff",
                width:"100%", 
                height:"3rem", 
                background: appColors.colorBlack, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },

           


            popupLarge:
            {
                width: "20.1234vw",
                height: "30.2564vh",
                border: appBorders.borderThick,
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },

            popupMedium:
            {
                width: "16",
                height: "12.5",
                border: appBorders.borderThick,
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },

            popupSmall:
            {
                width: "10",
                height: "12.5",
                border: appBorders.borderThick,
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },


            margins: {
                margin1w: "1vw",
                margin1h: "1vh",
            },

            buttons: {
                buttonClose:
                {
                    fontFamily: appFonts.appFont,
                    display: "flex",
                    flexDirection: "row",
                    width: "",
                    color: "#ACACAC",
                    cursor: "pointer",
                    fontSize: "14vh",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    position:"absolute",
                    right:"0",
                    top:"0",
                    marginRight:"10px",
                    marginTop:"10px",
                    height: "fit-content",
                },

                buttonClear: {
                    cursor: "pointer",
                    background: appColors.color2,
                    color: appColors.colorWhite,
                    padding: "4%",
                    width: "5vw",
                    height: "3vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },

                buttonAdd: {
                    cursor: "pointer",
                    background: appColors.color1,
                    color: appColors.colorBlack,
                    padding: "4%",
                    width: "5vw",
                    height: "3vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },

            }
        }

        return styles;
    }


    resize1() {


        let appBorders =
        {
            borderThin: "1px solid #1B1B1B",
            borderThick: "2px solid #1B1B1B",
            borderThickest: "4px solid #1B1B1B",
            borderDouble: "double #32a999",
        }

        let appShadows =
        {
            shadow1: "1px 2px 3px #1B1B1B",
            shadow2: "2px 3px 4px #999999",
        }

        let appFonts= {
            //typeface
            appTitle: "'Roboto', sans-serif",
            appFont: "'Roboto', sans-serif",
            appBold: "",
            appItalic: "",
            appFont2: "",
            appFont3: "",     

            //weight
            fontWeight100: "100",
            fontWeight300: "300",
            fontWeightNormal: "400",
            fontWeightBold: "700",
            fontWeightHeavy: "900",

            //letter spacing
            spacingNormal: "normal",
            spacingWide: ".11rem",
            spacingTight: "-.12vw",

            //size
            fontBody: "1.3vh",
            fontSmall: ".94vh",
            fontSubheader1: "1.6vh",
            fontSubheader2: "2vh",
            fontHeader1: "3vh",
            fontHeader2: "3.4vh",
            fontHeader3: "3.9vh",
            fontHeader4: "4.25vh",
            fontHeader5: "4.44vh",
        }

        let colorPalette =
        {
            color1:"#FF0000",//red
            color2:"#FFA500",//orange
            color3:"#FFFF00",//yellow
            color4:"#3CB371",//green
            color5:"#508FE5",//blue
            color6:"#4B0082",//purple
        }

        let appColors =
        {
            color1: colorPalette.color1,//red
            color2:"#FF7F50",//red orange
            color3: colorPalette.color2,//orange
            color4:"#FFD700",//orange yellow
            color5: colorPalette.color3,//yellow
            color6:"#ADFF2F",//yellow green
            color7: colorPalette.color4,//green
            color8:"#008B8B",//green blue
            color9: colorPalette.color5,//blue
            color10:"#0000CD",//blue purple
            color11: colorPalette.color6,//purple
            color12:"#8B008B",//purple red
            color13:"#8B4513",//brown
            colorWhite:"#ffffff",
            colorBlack:"#0d0a0b",


        }


        let styles = {
            //TODO: Create or check all styles
            page1:
            {   
            paddingTop:"100px", 
                background:colorPalette.color5,
                display:"flex",
                flexDirection: "row",
                width: "100vw",
                height: "100vh"
            },
            colorPalette:
            {
                color1:"#4B0082",//purple
                color2:"#FFA500",//orange
                color3:"#FFFF00",//yellow
                color4:"#3CB371",//green
                color5:"#508FE5",//blue
                color6:"#4B0082",//purple
            },
            smallestCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "20vh"
            },

            smallerCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "75%"
            },

            smallCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "83%"
            },

            bigCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "87%"
            },

            biggerCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "89%"
            },

            biggestCardContentWithTab:
            {   padding: ".5rem 1rem",
            
                top: "50%",
                height: "85%"
            },

            tallCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "87%"
            },

            tallerCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "89%"
            },

            tallestCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "91%"
            },

            cardContent:
            {   padding: "5px",
                height: "100%",
            },
           
            smallestCard:
            {   
                width: "20vw",
                height: "20vh",
                
                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none",
            },
            smallestCardBorderless:
            {   width: "8.5vw",
                height: "20vh",
                
                background: appColors.colorWhite,
                userSelect: "none",
            },


            smallerCard:
            {    
                width: "25vw",
                height: "26.5vh",
                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none",
            },
            smallerCardBorderless:
            {   width: "19vw",
                height: "26.5vh",
                 
                
                background: appColors.colorWhite,
                userSelect: "none",
            },


            smallCard:
            {    
                width: "35vw",
                height: "38vh",
                 
                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none",
            },
            smallCardBorderless:
            {   width: "29.5vw",
                height: "38vh",
                 
                
                background: appColors.colorWhite,
                userSelect: "none",
            },


            bigCard:
            {    
                width: "45vw",
                height: "49.5vh",
                 

                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },
            bigCardBorderless:
            {   width: "40vw",
                height: "49.5vh",
                 
                
                background: appColors.colorWhite,
                userSelect: "none",
            },


            biggerCard:
            {    
                width: "55vw",
                height: "61vh", 
                  

                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },
            biggerCardBorderless:
            {   width: "50.5vw",
                height: "61vh",
                 
                
                background: appColors.colorWhite,
                userSelect: "none",
            },
            

            biggestCard:
            {    
                width: '95vw',
                height: "72.5vh",
                 
                                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                // boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },
            biggestCardBorderless:
            {   width: "95vw",
                height: "72.5vh",
                 
                
                background: appColors.colorWhite,
                userSelect: "none",
            },
            

            tallCard:
            {    
                width: "19vw",
                height: "50vh",
                 
                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },
            tallCardBorderless:
            {   width: "19vw",
                height: "50vh",
                 
                
                background: appColors.colorWhite,
                userSelect: "none",
            },
            

            tallerCard:
            {    
                width: "19vw",
                height: "62vh",
                 
                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },
            tallerCardBorderless:
            {   width: "19vw",
                height: "62vh",
                 
                
                background: appColors.colorWhite,
                userSelect: "none",
            },
            
            
            tallestCard:
            {    
                width: "19vw",
                height: "75vh",
                 
                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },
            tallestCardBorderless:
            {   width: "19vw",
                height: "75vh",
                 
                
                background: appColors.colorWhite,
                userSelect: "none",
            },
            


            borderlessTab:
            {   width:"100%", 
                height:"3rem", 
                background: appColors.colorWhite, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab:
            {    
                width:"100%", 
                height: "3rem", 
                background: colorPalette.color1, 
                borderRadius:"1.5rem 23px 0px 0px",
                padding: "1rem",
            },
            colorTab1:
            {    
                width:"100%", 
                height: "3rem", 
                background: appColors.color1, 
                borderRadius:"1.5rem 23px 0px 0px",
                padding: "1rem",
            },
            colorTab2:
            {    
                width:"100%", 
                height: "3rem", 
                background: appColors.color2, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab3:
            {    
                width:"100%", 
                height: "3rem", 
                background: appColors.color3, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab4:
            {    
                width:"100%", 
                height: "3rem", 
                background: appColors.color4, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab5:
            {    
                width:"100%", 
                height: "3rem", 
                background: appColors.color5, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab6:
            {    
                width:"100%", 
                height: "3rem", 
                background: appColors.color6, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab7:
            {    
                width:"100%", 
                height: "3rem", 
                background: appColors.color7, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab8:
            {    
                color: "#ffffff",
                width:"100%", 
                height: "3rem", 
                background: appColors.color8, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab9:
            {    
                color: "#ffffff",
                width:"100%", 
                height: "3rem", 
                background: appColors.color9, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab10:
            {    
                color: "#ffffff",
                width:"100%", 
                height: "3rem", 
                background: appColors.color10, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab11:
            {    
                color: "#ffffff",
                width:"100%", 
                height: "3rem", 
                background: appColors.color11, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab12:
            {    
                color: "#ffffff",
                width:"100%", 
                height: "3rem", 
                background: appColors.color12, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab13:
            {    
                color: "#ffffff",
                width:"100%", 
                height: "3rem", 
                background: appColors.color13, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTabWhite:
            {   
                width:"100%", 
                height: "3rem", 
                background: appColors.colorWhite, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTabBlack:
            {    
                color: "#ffffff",
                width:"100%", 
                height:"3rem", 
                background: appColors.colorBlack, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },

           


            popupLarge:
            {
                width: "20.1234vw",
                height: "30.2564vh",
                border: appBorders.borderThick,
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },

            popupMedium:
            {
                width: "16",
                height: "12.5",
                border: appBorders.borderThick,
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },

            popupSmall:
            {
                width: "10",
                height: "12.5",
                border: appBorders.borderThick,
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },


            margins: {
                margin1w: "1vw",
                margin1h: "1vh",
            },

            buttons: {
                buttonClose:
                {
                    fontFamily: appFonts.appFont,
                    display: "flex",
                    flexDirection: "row",
                    width: "",
                    color: "#ACACAC",
                    cursor: "pointer",
                    fontSize: "14vh",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    position:"absolute",
                    right:"0",
                    top:"0",
                    marginRight:"10px",
                    marginTop:"10px",
                    height: "fit-content",
                },

                buttonClear: {
                    cursor: "pointer",
                    background: appColors.color2,
                    color: appColors.colorWhite,
                    padding: "4%",
                    width: "5vw",
                    height: "3vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },

                buttonAdd: {
                    cursor: "pointer",
                    background: appColors.color1,
                    color: appColors.colorBlack,
                    padding: "4%",
                    width: "5vw",
                    height: "3vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },

            }
        }

        return styles;
    }


    resize2() {


        let appBorders =
        {
            borderThin: "1px solid #1B1B1B",
            borderThick: "2px solid #1B1B1B",
            borderThickest: "4px solid #1B1B1B",
            borderDouble: "double #32a999",
        }

        let appShadows =
        {
            shadow1: "1px 2px 3px #1B1B1B",
            shadow2: "2px 3px 4px #999999",
        }

        let appFonts= {
            //typeface
            appTitle: "'Roboto', sans-serif",
            appFont: "'Roboto', sans-serif",
            appBold: "",
            appItalic: "",
            appFont2: "",
            appFont3: "",     

            //weight
            fontWeight100: "100",
            fontWeight300: "300",
            fontWeightNormal: "400",
            fontWeightBold: "700",
            fontWeightHeavy: "900",

            //letter spacing
            spacingNormal: "normal",
            spacingWide: ".11rem",
            spacingTight: "-.12vw",

            //size
            fontBody: "1.3vh",
            fontSmall: ".94vh",
            fontSubheader1: "1.6vh",
            fontSubheader2: "2vh",
            fontHeader1: "3vh",
            fontHeader2: "3.4vh",
            fontHeader3: "3.9vh",
            fontHeader4: "4.25vh",
            fontHeader5: "4.44vh",
        }

        let colorPalette =
        {
            color1:"#FF0000",//red
            color2:"#FFA500",//orange
            color3:"#FFFF00",//yellow
            color4:"#3CB371",//green
            color5:"#508FE5",//blue
            color6:"#4B0082",//purple
        }

        let appColors =
        {
            color1: colorPalette.color1,//red
            color2:"#FF7F50",//red orange
            color3: colorPalette.color2,//orange
            color4:"#FFD700",//orange yellow
            color5: colorPalette.color3,//yellow
            color6:"#ADFF2F",//yellow green
            color7: colorPalette.color4,//green
            color8:"#008B8B",//green blue
            color9: colorPalette.color5,//blue
            color10:"#0000CD",//blue purple
            color11: colorPalette.color6,//purple
            color12:"#8B008B",//purple red
            color13:"#8B4513",//brown
            colorWhite:"#ffffff",
            colorBlack:"#0d0a0b",


        }


        let styles = {
            //TODO: Create or check all styles
            page1:
            {   
            paddingTop:"20px", 
                background:colorPalette.color5,
                display:"flex",
                flexDirection: "row",
                justifyContent:"center",
                alignItems:"center",
                width: "100vw",
                height: "100vh"
            },
            colorPalette:
            {
                color1:"#4B0082",//purple
                color2:"#FFA500",//orange
                color3:"#FFFF00",//yellow
                color4:"#3CB371",//green
                color5:"#508FE5",//blue
                color6:"#4B0082",//purple
            },
            smallestCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "20vh"
            },

            smallerCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "75%"
            },

            smallCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "83%"
            },

            bigCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "87%"
            },

            biggerCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "89%"
            },

            biggestCardContentWithTab:
            {   padding: ".5rem 1rem",
            
                top: "50%",
                height: "85%"
            },

            tallCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "87%"
            },

            tallerCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "89%"
            },

            tallestCardContentWithTab:
            {   padding: ".5rem 1rem",
                top: "50%",
                height: "91%"
            },

            cardContent:
            {   padding: "5px",
                height: "100%",
            },
           
            smallestCard:
            {  
                
                
                width: "38vw",
                height: "23vh",
                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none",
            },
            smallestCardBorderless:
            {   width: "20vw",
                height: "15vh",
                
                background: appColors.colorWhite,
                userSelect: "none",
            },


            smallerCard:
            {    
                width: "32vw",
                height: "26.5vh",
                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none",
            },
            smallerCardBorderless:
            {   width: "32vw",
                height: "26.5vh",
                 
                
                background: appColors.colorWhite,
                userSelect: "none",
            },


            smallCard:
            {    
                width: "95vw",
                height: "38vh",
                 
                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none",
            },
            smallCardBorderless:
            {   width: "44vw",
                height: "38vh",
                 
                
                background: appColors.colorWhite,
                userSelect: "none",
            },


            bigCard:
            {    
                width: "56vw",
                height: "49.5vh",
                 

                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },
            bigCardBorderless:
            {   width: "56vw",
                height: "49.5vh",
                 
                
                background: appColors.colorWhite,
                userSelect: "none",
            },


            biggerCard:
            {    
                width: "95vw",
                height: "85vh",
                  

                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },
            biggerCardBorderless:
            {   width: "90vw",
                height: "78vh",
                 
                
                background: appColors.colorWhite,
                userSelect: "none",
            },
            

            biggestCard:
            {    
                width: '95vw',
                height: "80.5vh",
                 
                                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                // boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },
            biggestCardBorderless:
            {   width: "95vw",
                height: "72.5vh",
                 
                
                background: appColors.colorWhite,
                userSelect: "none",
            },
            

            tallCard:
            {    
                width: "95vw",
                height: "78vh",
                 
                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },
            tallCardBorderless:
            {   width: "32vw",
                height: "50vh",
                 
                
                background: appColors.colorWhite,
                userSelect: "none",
            },
            

            tallerCard:
            {    
                width: "90vw",
                height: "62vh",
                 
                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },
            tallerCardBorderless:
            {   width: "32vw",
                height: "62vh",
                 
                
                background: appColors.colorWhite,
                userSelect: "none",
            },
            
            
            tallestCard:
            {    
                width: "32vw",
                height: "75vh",
                 
                
                background: appColors.colorWhite,
                borderRadius: "1.5rem",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },
            tallestCardBorderless:
            {   width: "32vw",
                height: "75vh",
                 
                
                background: appColors.colorWhite,
                userSelect: "none",
            },
            


            borderlessTab:
            {   width:"100%", 
                height:"3rem", 
                background: appColors.colorWhite, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab:
            {    
                width:"100%", 
                height: "3rem", 
                background: colorPalette.color1, 
                borderRadius:"1.5rem 23px 0px 0px",
                padding: "1rem",
            },
            colorTab1:
            {    
                width:"100%", 
                height: "3rem", 
                background: appColors.color1, 
                borderRadius:"1.5rem 23px 0px 0px",
                padding: "1rem",
            },
            colorTab2:
            {    
                width:"100%", 
                height: "3rem", 
                background: appColors.color2, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab3:
            {    
                width:"100%", 
                height: "3rem", 
                background: appColors.color3, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab4:
            {    
                width:"100%", 
                height: "3rem", 
                background: appColors.color4, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab5:
            {    
                width:"100%", 
                height: "3rem", 
                background: appColors.color5, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab6:
            {    
                width:"100%", 
                height: "3rem", 
                background: appColors.color6, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab7:
            {    
                width:"100%", 
                height: "3rem", 
                background: appColors.color7, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab8:
            {    
                color: "#ffffff",
                width:"100%", 
                height: "3rem", 
                background: appColors.color8, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab9:
            {    
                color: "#ffffff",
                width:"100%", 
                height: "3rem", 
                background: appColors.color9, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab10:
            {    
                color: "#ffffff",
                width:"100%", 
                height: "3rem", 
                background: appColors.color10, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab11:
            {    
                color: "#ffffff",
                width:"100%", 
                height: "3rem", 
                background: appColors.color11, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab12:
            {    
                color: "#ffffff",
                width:"100%", 
                height: "3rem", 
                background: appColors.color12, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTab13:
            {    
                color: "#ffffff",
                width:"100%", 
                height: "3rem", 
                background: appColors.color13, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTabWhite:
            {   
                width:"100%", 
                height: "3rem", 
                background: appColors.colorWhite, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },
            colorTabBlack:
            {    
                color: "#ffffff",
                width:"100%", 
                height:"3rem", 
                background: appColors.colorBlack, 
                borderRadius:"1.5rem 1.5rem 0px 0px",
                padding: "1rem"
            },

           


            popupLarge:
            {
                width: "20.1234vw",
                height: "30.2564vh",
                border: appBorders.borderThick,
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },

            popupMedium:
            {
                width: "16",
                height: "12.5",
                border: appBorders.borderThick,
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },

            popupSmall:
            {
                width: "10",
                height: "12.5",
                border: appBorders.borderThick,
                background: appColors.colorWhite,
                borderRadius: "23px",
                boxShadow: "2px 3px 6px" + appColors.colorBlack,
                userSelect: "none"
            },


            margins: {
                margin1w: "1vw",
                margin1h: "1vh",
            },

            buttons: {
                buttonClose:
                {
                    fontFamily: appFonts.appFont,
                    display: "flex",
                    flexDirection: "row",
                    width: "",
                    color: "#ACACAC",
                    cursor: "pointer",
                    fontSize: "14vh",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    position:"absolute",
                    right:"0",
                    top:"0",
                    marginRight:"10px",
                    marginTop:"10px",
                    height: "fit-content",
                },

                buttonClear: {
                    cursor: "pointer",
                    background: appColors.color2,
                    color: appColors.colorWhite,
                    padding: "4%",
                    width: "5vw",
                    height: "3vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },

                buttonAdd: {
                    cursor: "pointer",
                    background: appColors.color1,
                    color: appColors.colorBlack,
                    padding: "4%",
                    width: "5vw",
                    height: "3vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },

            }
        }

        return styles;
    }


    getCustomCheckbox(big) {
        let changeLabelA = {
            change: "change-label2",
            csyncboxa: "csyncboxa",
            tick: "tickFix1",
        };
        let changeLabelB = {
            change: "change-label2b",
            csyncboxa: "csyncboxa",
            tick: "tickFix",
        };

        return big ? changeLabelA : changeLabelB;

    }
    
    getStylesByScreenSize(){
        let objkey = this.getstyles();
        if(window.innerWidth<1200){
             objkey=this.resize2();
        }
        // else if(window.innerWidth<1000){
        //     objkey = this.resize1();
        // }

        return objkey;
    }

}
export default new DefaultStyles();




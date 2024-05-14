import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { fadeAnimation, slideAnimation } from "../config/motion";
import { DecalTypes, EditorTabs, FilterTabs } from "../config/constants";
import Tab from "../components/Tab";
import CustomBtn from "../components/CustomBtn";
import { logoShirt, stylishShirt } from "../assets";
import ColorPicker from "../components/ColorPicker";
import FilePicker from "../components/FilePicker";

const Customizer = () => {
  const snap = useSnapshot(state);
const [file,setFile]=useState('')
const [prompt, setPrompt]=useState('')
const [generateImg, setGenerateImg]=useState(false);
const [activeEditorTab, setActiveEditorTab]=useState('');
const [activeFilterTab, setActiveFilterTab]=useState({logoShirt:true, stylishShirt:false})
  const generateTabContent =() => {
switch(activeEditorTab){
    case'colorpicker':{
        return <ColorPicker />
    
    }
    case'filepicker':{
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />
    }
    
    default:
        break
}
  }
  const handleDecals=(type,result)=> {
    const decalType = DecalTypes[type]
    state[decalType.stateProperty]=result

    if(!activeFilterTab[decalType.dilterTab]){
        handleActiveFilterTab(decalType.filterTab)
    }
  }
  const handleActiveFilterTab = () => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];

        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };
  const readFile=(type)=> {
    reader(file).then((result)=> {
        handleDecals(type,result);
        setActiveEditorTab('')
    })
  }
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10 "
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab key={tab.name} tab={tab} handleClick={() =>setActiveEditorTab(tab.name)} />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomBtn
              title="Go Back"
              type="filled"
              handleClick={() => (state.intro = true)}
              customStyle="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          <motion.div className="filtertabs-container" {...slideAnimation('up')}>
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => {()=> handleActiveFilterTab(tab.name)}}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;

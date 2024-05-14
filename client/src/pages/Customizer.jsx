import React,{useState, useEffect} from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import { downloadCanvasToImage, reader } from '../config/helpers';

const Customizer = () => {
  return (
    <div>Customizer</div>
  )
}

export default Customizer
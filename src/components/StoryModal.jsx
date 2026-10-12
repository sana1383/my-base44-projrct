import Modal from './Modal.jsx'
import { storyImage } from '../data/menuItems.js'

export default function StoryModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Our Story" wide>
      <img className="story-modal__img" src={storyImage} alt="Latte on a wooden table next to a notebook" />
      <p className="story-modal__text">
        Harth Coffee started with a simple idea — great coffee brings people together.
        What began as a small corner café has grown into a community of coffee lovers,
        early risers, and slow-afternoon regulars.
      </p>
      <p className="story-modal__text">
        We source our beans from sustainable farms, roast them locally in small batches,
        and serve them with care. Every cup is an invitation to slow down, connect,
        and enjoy a warmer today.
      </p>
      <p className="story-modal__text">
        Our spaces are designed to feel like home — warm wood, soft light, and the gentle
        hum of a neighborhood café. We believe that good coffee and good people make
        for a brighter tomorrow.
      </p>
    </Modal>
  )
}

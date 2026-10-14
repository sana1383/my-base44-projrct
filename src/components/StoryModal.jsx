import Modal from './Modal.jsx'
import { storyImage } from '../data/menuItems.js'

export default function StoryModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="داستان ما" wide>
      <img className="story-modal__img" src={storyImage} alt="لاته روی میز چوبی در کنار یک دفتر" />
      <p className="story-modal__text">
        هارت کافی با یک ایده ساده آغاز شد: قهوه خوب، آدم‌ها را به هم نزدیک می‌کند.
        آنچه با یک کافه کوچک در گوشه‌ای شروع شد، امروز به جمعی از عاشقان قهوه،
        سحرخیزها و مشتریان ثابتِ بعدازظهرهای آرام تبدیل شده است.
      </p>
      <p className="story-modal__text">
        دانه‌های قهوه را از مزارع پایدار تأمین می‌کنیم، آن‌ها را در محل و در دسته‌های
        کوچک رُست می‌کنیم و با دقت سرو می‌کنیم. هر فنجان دعوتی است به آرام‌تر شدن،
        نزدیک‌تر شدن و لذت بردن از امروزِ گرم‌تر.
      </p>
      <p className="story-modal__text">
        فضای کافه‌های ما طوری طراحی شده که حس خانه را بدهد؛ چوب گرم، نور ملایم و
        همهمهٔ آرام یک کافه محلی. ما باور داریم قهوه خوب و آدم‌های خوب، فردایی
        روشن‌تر می‌سازند.
      </p>
    </Modal>
  )
}

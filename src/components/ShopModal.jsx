import Modal from './Modal.jsx'

const categories = ['دانه قهوه', 'ابزار دم‌آوری', 'محصولات هارث', 'کارت هدیه']

export default function ShopModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="فروشگاه">
      <div className="shop-coming">
        <h3>به‌زودی</h3>
        <p>
          در حال آماده‌سازی مجموعه‌ای از دانه‌های قهوه تک‌خاستگاه، ابزارهای دم‌آوری و
          محصولات HARTH COFFEE هستیم. برای اطلاع از زمان افتتاح فروشگاه، در خبرنامه
          ما عضو شوید.
        </p>
        <div className="shop-categories">
          {categories.map((c) => (
            <span className="shop-cat" key={c}>{c}</span>
          ))}
        </div>
        <p style={{ fontSize: '0.78rem', opacity: 0.55 }}>
          هنوز امکان پرداخت و تکمیل خرید فراهم نیست.
        </p>
      </div>
    </Modal>
  )
}

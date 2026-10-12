import Button from '../components/Button.jsx'

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="container">
        <p className="notfound__code">۴۰۴</p>
        <h1>این صفحه پیدا نشد</h1>
        <p className="lead" style={{ marginBlock: '0.6rem 1.6rem' }}>
          ممکن است نشانی تغییر کرده باشد یا صفحه حذف شده باشد.
        </p>
        <div
          style={{
            display: 'flex',
            gap: '0.7rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Button to="/" variant="primary" icon="arrowLeft">
            بازگشت به خانه
          </Button>
          <Button to="/properties" variant="outline">
            مشاهدهٔ املاک
          </Button>
        </div>
      </div>
    </section>
  )
}

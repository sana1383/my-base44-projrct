import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import Button from '../components/Button.jsx'
import { socials, team } from '../data/site.js'
import { imgUrl, imgSrcSet } from '../lib/images.js'

export default function Team() {
  return (
    <section className="section section--ivory" id="team" aria-labelledby="team-title">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="section-head__text">
              <span className="eyebrow">تیم</span>
              <h2 id="team-title">افرادی که در کنار شما هستند</h2>
            </div>
            <Button to="/team" variant="outline" icon="arrowLeft">
              آشنایی با تیم
            </Button>
          </div>
        </Reveal>

        <Reveal className="team__grid" delay={80}>
          {team.map((member) => (
            <article className="team-card" key={member.id}>
              <div className="team-card__media">
                <img
                  src={imgUrl(member.photo, 600)}
                  srcSet={imgSrcSet(member.photo, [360, 480, 600])}
                  sizes="(max-width: 479px) 90vw, (max-width: 899px) 45vw, 22vw"
                  alt={`${member.name} — ${member.role}`}
                  width="600"
                  height="800"
                  loading="lazy"
                  decoding="async"
                />
                <div className="team-card__social">
                  {socials.slice(0, 3).map((social) => (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${social.label} — ${member.name}`}
                    >
                      <Icon name={social.id} size={16} />
                    </a>
                  ))}
                </div>
              </div>
              <div className="team-card__body">
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__role">{member.role}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

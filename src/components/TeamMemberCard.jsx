import { getInitials } from '../utils/format'

/** Ekip üyesi kartı: fotoğraf (yoksa baş harfler), ad, rol, kısa bio, LinkedIn. */
export default function TeamMemberCard({ member }) {
  const { full_name: name, role, bio, photo_url: photo, linkedin_url: linkedin } = member

  return (
    <article className="member-card">
      {photo ? (
        <img className="member-card__photo" src={photo} alt={name} loading="lazy" width="160" height="160" />
      ) : (
        <div className="member-card__photo member-card__photo--initials" aria-hidden="true">
          {getInitials(name)}
        </div>
      )}
      <h3 className="member-card__name">{name}</h3>
      <p className="member-card__role">{role}</p>
      {bio && <p className="member-card__bio">{bio}</p>}
      {linkedin && (
        <a className="member-card__link" href={linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn<span className="visually-hidden"> profili: {name}</span>
        </a>
      )}
    </article>
  )
}

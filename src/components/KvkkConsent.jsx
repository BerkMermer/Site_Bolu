import { Link } from 'react-router-dom'
import { Checkbox } from './FormFields'

/** Kişisel veri toplayan her formun sonunda kullanılan KVKK onay kutusu. */
export default function KvkkConsent({ checked, onChange, error, name = 'kvkk_consent' }) {
  return (
    <Checkbox name={name} checked={checked} onChange={onChange} error={error} required>
      <Link to="/kvkk" target="_blank" rel="noopener">
        KVKK Aydınlatma Metni
      </Link>
      'ni okudum; kişisel verilerimin bu kapsamda işlenmesini kabul ediyorum.
    </Checkbox>
  )
}

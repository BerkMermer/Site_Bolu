import DataState from '../components/DataState'
import PageHeader from '../components/PageHeader'
import TeamMemberCard from '../components/TeamMemberCard'
import { COMMITTEES } from '../config/site'
import { useTeam } from '../hooks/useTeam'

/** Üyeleri komitelere göre gruplar; sıra config/site.js'teki COMMITTEES listesinden gelir. */
function groupByCommittee(members = []) {
  const groups = new Map(COMMITTEES.map((name) => [name, []]))
  for (const member of members) {
    const key = member.committee || 'Diğer'
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(member)
  }
  return [...groups.entries()].filter(([, list]) => list.length > 0)
}

export default function Team() {
  const { data, loading, error, refetch } = useTeam()
  const groups = groupByCommittee(data ?? [])

  return (
    <>
      <PageHeader
        eyebrow="Ekip"
        title="Topluluğu yürütenler"
        description="Yönetim kurulumuz ve komitelerimiz. Sen de bir komitede görev almak istersen başvurabilirsin."
      />

      <section className="section">
        <div className="container">
          <DataState
            loading={loading}
            error={error}
            onRetry={refetch}
            isEmpty={groups.length === 0}
            empty="Ekip bilgileri yakında eklenecek."
          >
            {groups.map(([committee, members]) => (
              <section key={committee} className="team-group" aria-label={committee}>
                <h2 className="team-group__title">{committee}</h2>
                <div className="member-grid">
                  {members.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                  ))}
                </div>
              </section>
            ))}
          </DataState>
        </div>
      </section>
    </>
  )
}

import { useEffect, useState } from 'react'
import { lectures } from './data/lectures.js'
import Block from './Blocks.jsx'

const KEY = 'mysql-handbook-done'
const readDone = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {} } catch { return {} } }
const idFromHash = () => { const n = parseInt(location.hash.replace('#/', ''), 10); return lectures.some(l => l.id === n) ? n : 1 }

export default function App() {
  const [id, setId] = useState(idFromHash), [done, setDone] = useState(readDone), [menu, setMenu] = useState(false), [q, setQ] = useState('')
  
  useEffect(() => {
    const f = () => { setId(idFromHash()); setMenu(false); scrollTo(0, 0) }
    addEventListener('hashchange', f)
    return () => removeEventListener('hashchange', f)
  }, [])

  // Lock background scroll on mobile when menu drawer is open
  useEffect(() => {
    if (menu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menu])

  // Close menu on Escape key
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setMenu(false) }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  const i = lectures.findIndex(l => l.id === id), cur = lectures[i]
  useEffect(() => { document.title = `${cur.title} · MySQL Handbook` }, [id])
  const toggle = () => setDone(d => { const n = { ...d }; n[id] ? delete n[id] : (n[id] = true); try { localStorage.setItem(KEY, JSON.stringify(n)) } catch { /* blocked */ } return n })
  const list = lectures.filter(l => l.title.toLowerCase().includes(q.toLowerCase()))
  const count = lectures.filter(l => done[l.id]).length
  const prev = lectures[i - 1], next = lectures[i + 1]

  return (
    <div className="app">
      <header className="top">
        <button className="btn menu" aria-label="Open lectures menu" onClick={() => setMenu(m => !m)}>
          <span className="menu-icon">☰</span>
        </button>
        <a href="#/1" className="brand-wrap">
          <img src="./dream-topper-logo.svg" alt="Dream Topper" className="brand-logo" />
          <div className="brand-text">
            <span className="brand-sub">Dream Topper</span>
            <b className="brand">MySQL Handbook</b>
          </div>
        </a>
        <span className="prog">
          <span className="prog-check">✓</span> {count}/{lectures.length} done
        </span>
      </header>

      {menu && <div className="backdrop" onClick={() => setMenu(false)} aria-hidden="true" />}

      <nav className={'side' + (menu ? ' open' : '')} aria-label="Lectures">
        <div className="side-top">
          <div className="side-head">
            <div className="side-head-brand">
              <img src="./dream-topper-logo.svg" alt="Dream Topper" className="side-logo" />
              <span>Lectures ({lectures.length})</span>
            </div>
            <button className="side-close" onClick={() => setMenu(false)} aria-label="Close menu">✕</button>
          </div>
          <div className="search-wrap">
            <input
              type="search"
              aria-label="Search lectures"
              placeholder="Search lectures..."
              value={q}
              onChange={e => setQ(e.target.value)}
            />
          </div>
        </div>
        <div className="side-scroll">
          <ol>
            {list.map(l => (
              <li key={l.id}>
                <a
                  href={`#/${l.id}`}
                  aria-current={l.id === id ? 'page' : undefined}
                  onClick={() => setMenu(false)}
                >
                  <span className="num">{done[l.id] ? '✓' : String(l.id).padStart(2, '0')}</span>
                  <span className="title-text">{l.title}</span>
                </a>
              </li>
            ))}
          </ol>
          {!list.length && <p className="empty">No lecture found matching "{q}".</p>}
        </div>
      </nav>

      <main className="content">
        <article>
          <p className="kicker">Lecture {String(cur.id).padStart(2, '0')} of {lectures.length}</p>
          <h1>{cur.title}</h1>
          <p className="sub">{cur.sub}</p>
          {cur.blocks.map((b, k) => <Block key={k} b={b} />)}
          <div className="pager">
            <div className="pager-item-left">
              {prev && (
                <a className="btn prev-btn" href={`#/${prev.id}`}>
                  ‹ {prev.title}
                </a>
              )}
            </div>
            <div className="pager-item-center">
              <button
                className={'btn complete-btn ' + (done[id] ? 'is-done' : 'primary')}
                aria-pressed={!!done[id]}
                onClick={toggle}
              >
                {done[id] ? '✓ Completed' : 'Mark as completed'}
              </button>
            </div>
            <div className="pager-item-right">
              {next && (
                <a className="btn next-btn" href={`#/${next.id}`}>
                  {next.title} ›
                </a>
              )}
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}

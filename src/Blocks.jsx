import { useState } from 'react'
import { highlight } from './highlight.js'

function Code({ x }) {
  const [ok, setOk] = useState(false)
  const copy = async () => { try { await navigator.clipboard.writeText(x); setOk(true); setTimeout(() => setOk(false), 1400) } catch { /* blocked */ } }
  return (
    <div className="code">
      <button className="copy" onClick={copy} aria-label="Copy code">{ok ? 'Copied' : 'Copy'}</button>
      <pre><code dangerouslySetInnerHTML={{ __html: highlight(x) }} /></pre>
    </div>
  )
}

function Practice({ items }) {
  const [open, setOpen] = useState({})
  return (
    <section className="practice"><h3>Try it yourself</h3>
      {items.map((it, i) => (
        <div key={i} className="pq"><p><b>{i + 1}.</b> {it.q}</p>
          {it.code && <Code x={it.code} />}
          <button className="btn" aria-expanded={!!open[i]} onClick={() => setOpen(o => ({ ...o, [i]: !o[i] }))}>{open[i] ? 'Hide answer' : 'Show answer'}</button>
          {open[i] && (it.a.includes('\n') || /^(UPDATE|DELETE|SELECT|INSERT)/.test(it.a) ? <Code x={it.a} /> : <p className="ans">{it.a}</p>)}
        </div>))}
    </section>
  )
}

function extractTableName(title) {
  if (!title) return 'sample_table'
  const m = title.match(/(?:Table(?:\s+[A-Z])?|Parent Table|Child Table|Dataset):\s*([a-zA-Z0-9_]+)/i)
  if (m && m[1]) return m[1].toLowerCase()
  const m2 = title.match(/([a-zA-Z0-9_]+)\s+table/i)
  if (m2 && m2[1]) return m2[1].toLowerCase()
  const clean = title.replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase().replace(/^_+|_+$/g, '')
  return clean.slice(0, 24) || 'sample_table'
}

function cleanColName(col) {
  let name = String(col).replace(/\(.*?\)/g, '').trim().toLowerCase().replace(/[^a-z0-9_]/g, '_')
  name = name.replace(/^_+|_+$/g, '')
  if (!name || /^\d/.test(name)) name = `col_${name || 'val'}`
  return name
}

function inferColumnType(colName, colIndex, rows) {
  const colLower = colName.toLowerCase()
  if (colLower === 'id' || colLower === 'emp_id' || colLower === 'account_id' || colLower === 'order_id' || colLower === 'address_id') {
    return 'INT PRIMARY KEY'
  }
  if (colLower.endsWith('_id')) {
    return 'INT'
  }

  const values = (rows || []).map(r => r[colIndex]).filter(v => v !== undefined && v !== null && v !== '' && !/^null(?:\s*\(.*?\))?$/i.test(String(v).trim()))
  if (values.length === 0) return 'VARCHAR(100)'

  const isBool = values.every(v => /^(true|false|1|0|1\s*\(true\)|0\s*\(false\))$/i.test(String(v).trim()))
  if (isBool) return 'BOOLEAN'

  const isInt = values.every(v => /^-?\d+$/.test(String(v).replace(/\(.*?\)/g, '').trim()))
  if (isInt) return 'INT'

  const isDecimal = values.every(v => /^-?\d+\.\d+$/.test(String(v).replace(/\(.*?\)/g, '').trim()))
  if (isDecimal) return 'DECIMAL(10, 2)'

  const isDate = values.every(v => /^\d{4}-\d{2}-\d{2}$/.test(String(v).trim()))
  if (isDate) return 'DATE'

  const isTimestamp = values.every(v => /^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}(?::\d{2})?$/.test(String(v).trim()))
  if (isTimestamp) return 'TIMESTAMP'

  const maxLen = Math.max(...values.map(v => String(v).length))
  if (maxLen > 150) return 'TEXT'
  if (maxLen > 50) return 'VARCHAR(255)'
  return 'VARCHAR(100)'
}

function formatSqlValue(val, colType) {
  if (val === undefined || val === null) return 'NULL'
  const str = String(val).trim()
  if (/^null(?:\s*\(.*?\))?$/i.test(str)) return 'NULL'

  if (colType.startsWith('INT') || colType.startsWith('DECIMAL')) {
    const numMatch = str.match(/^-?\d+(?:\.\d+)?/)
    if (numMatch) return numMatch[0]
  }

  if (colType === 'BOOLEAN') {
    if (/^(true|1)/i.test(str)) return 'TRUE'
    if (/^(false|0)/i.test(str)) return 'FALSE'
  }

  const cleanStr = str.replace(/'/g, "''")
  return `'${cleanStr}'`
}

function generateTableSql(b) {
  if (b.sql) return b.sql

  const tableName = b.tableName || extractTableName(b.title)
  const counts = {}
  const cols = (b.head || []).map((h, i) => {
    let name = cleanColName(h)
    if (counts[name]) {
      counts[name]++
      name = `${name}_${counts[name]}`
    } else {
      counts[name] = 1
    }
    const type = inferColumnType(name, i, b.rows)
    return { name, type }
  })

  if (cols.length === 0) return '-- No table columns defined'

  const ddlCols = cols.map(c => `    ${c.name} ${c.type}`).join(',\n')
  const createSql = `CREATE TABLE IF NOT EXISTS ${tableName} (\n${ddlCols}\n);`

  if (!b.rows || b.rows.length === 0) {
    return createSql
  }

  const colNames = cols.map(c => c.name).join(', ')
  const rowTuples = b.rows.map(r => {
    const vals = cols.map((c, idx) => formatSqlValue(r[idx], c.type))
    return `(${vals.join(', ')})`
  }).join(',\n')

  const insertSql = `INSERT INTO ${tableName} (${colNames}) VALUES\n${rowTuples};`

  return `-- 1. Create table structure\n${createSql}\n\n-- 2. Insert table records\n${insertSql}`
}

function isSqlDataTable(b) {
  if (b.isData === false) return false
  if (b.isData === true) return true

  // Tables with no title are regular explanation/comparison tables
  if (!b.title) return false

  const titleLower = b.title.toLowerCase()
  const headersLower = (b.head || []).map(h => String(h).toLowerCase())

  // Explanation/theory keywords in headers
  const docKeywords = [
    'description', 'explanation', 'meaning', 'purpose', 'benefit', 'concept',
    'real-world example', 'category', 'example value', 'pros & cons', 'can rollback?',
    'behavior', 'feature', 'linux command', 'field', 'what it does', 'operator',
    'wildcard', 'component', 'integrity type', 'syntax example', 'limit per table'
  ]
  if (docKeywords.some(kw => headersLower.some(h => h.includes(kw)))) {
    return false
  }

  if (titleLower.includes('schema') || titleLower.includes('comparison') || titleLower.includes('summary') || titleLower.includes('rules')) {
    return false
  }

  // True SQL data tables
  if (/^(table|parent table|child table|dataset|current state|output|result)\b/i.test(b.title)) {
    return true
  }

  return false
}

function Table({ b }) {
  const [showSql, setShowSql] = useState(false)
  const isData = isSqlDataTable(b)
  const sql = isData ? generateTableSql(b) : null
  const hasMultipleCols = b.head && b.head.length > 2

  return (
    <div className={`tablewrap ${isData ? 'data-tablewrap' : 'info-tablewrap'}`}>
      {/* Real SQL Data Tables have the header bar with title and </> SQL Query button */}
      {isData && (
        <div className="table-header">
          <span className="table-caption">{b.title}</span>
          <button
            type="button"
            className="table-sql-btn"
            onClick={() => setShowSql(s => !s)}
            aria-expanded={showSql}
            title="Show SQL query to create this exact table in MySQL"
          >
            {showSql ? '✕ Hide SQL' : '</> SQL Query'}
          </button>
        </div>
      )}

      {/* Explanation tables that have a title display a clean subtitle without buttons */}
      {!isData && b.title && (
        <div className="info-table-caption">{b.title}</div>
      )}

      {/* SQL query code block only for real SQL data tables */}
      {isData && showSql && (
        <div className="table-sql-box">
          <div className="table-sql-tip">Run this query in MySQL Workbench or CLI to create and populate this exact table:</div>
          <Code x={sql} />
        </div>
      )}

      <div className="table-scroll-container">
        <table>
          <thead><tr>{b.head.map((h, idx) => <th key={idx}>{h}</th>)}</tr></thead>
          <tbody>{b.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
        </table>
      </div>

      {hasMultipleCols && <div className="table-scroll-hint">↔ Swipe table horizontally to see all columns</div>}
    </div>
  )
}

export default function Block({ b }) {
  switch (b.t) {
    case 'h': return <h2>{b.x}</h2>
    case 'p': return <p>{b.x}</p>
    case 'code': return <Code x={b.x} />
    case 'ul': return <ul>{b.x.map((i, k) => <li key={k}>{i}</li>)}</ul>
    case 'note': return <div className="note">{b.x}</div>
    case 'table': return <Table b={b} />
    case 'practice': return <Practice items={b.items} />
    default: return null
  }
}

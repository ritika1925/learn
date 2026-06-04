import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen, PenLine, FileText, BarChart2, Menu, X,
  ChevronDown, ArrowRight, Check, Flame, Target,
  ListChecks, RefreshCcw, BookMarked
} from 'lucide-react'

// ── Animation helper ────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.42, delay, ease: 'easeOut' },
})

// ── Static data ─────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Why LearnX',    href: '#why'       },
  { label: "What's Here",   href: '#what'      },
  { label: 'Subjects',      href: '#subjects'  },
  { label: 'Workflow',      href: '#workflow'  },
  { label: 'Dashboard',     href: '#dashboard' },
]

const PROBLEMS = [
  {
    icon: '📂',
    title: 'Notes scattered everywhere',
    desc: 'Class notes in one notebook, important diagrams in another, solved examples in a PDF somewhere. It takes longer to find things than to actually study.',
  },
  {
    icon: '🔍',
    title: 'Hard to find revision material',
    desc: 'Before exams you spend hours looking for PYQs, topic summaries, and formula sheets — instead of actually revising.',
  },
  {
    icon: '📊',
    title: 'No clear sense of progress',
    desc: "You finish a chapter but have no idea which topics you've actually covered and which ones still need work.",
  },
  {
    icon: '📵',
    title: 'Too many distractions',
    desc: 'Searching for one thing online leads to ten other tabs. A focused, clutter-free study space would genuinely help.',
  },
]

const RESOURCES = [
  {
    emoji: '📚',
    title: 'Notes',
    desc: 'Chapter-wise notes written for quick revision — not too long, not too short. Enough to understand and remember.',
    bg: '#EEF1FE', color: '#4F6AF5',
  },
  {
    emoji: '📝',
    title: 'Practice Questions',
    desc: 'Topic-wise questions with solutions. Work through them right after reading the notes to see if you actually understood.',
    bg: '#F0FBF4', color: '#34C26A',
  },
  {
    emoji: '📄',
    title: 'Previous Year Questions',
    desc: 'PYQs organised by subject and chapter. Knowing what actually comes in exams is half the preparation.',
    bg: '#FFFBEB', color: '#F59E0B',
  },
  {
    emoji: '📈',
    title: 'Progress Tracking',
    desc: 'Mark topics as done, track your streak, set a weekly goal. Simple and honest — no gamification tricks.',
    bg: '#EEF1FE', color: '#4F6AF5',
  },
]

const SUBJECTS = [
  {
    name: 'Mathematics', icon: '🔢',
    topics: ['Algebra', 'Geometry', 'Mensuration', 'Trigonometry', 'PYQs'],
  },
  {
    name: 'Science', icon: '🔬',
    topics: ['Physics', 'Chemistry', 'Biology', 'Important Diagrams'],
  },
  {
    name: 'English', icon: '📖',
    topics: ['Grammar', 'Literature', 'Writing Practice'],
  },
  {
    name: 'Social Studies', icon: '🌏',
    topics: ['History', 'Geography', 'Civics', 'Revision Notes'],
  },
]

const WORKFLOW = [
  {
    icon: <BookOpen className="w-4 h-4" />,
    title: 'Read Notes',
    desc: 'Start with the chapter notes. Keep them open while you work through the topic.',
  },
  {
    icon: <PenLine className="w-4 h-4" />,
    title: 'Solve Questions',
    desc: 'Do practice questions immediately after. Do not wait until exam week.',
  },
  {
    icon: <RefreshCcw className="w-4 h-4" />,
    title: 'Revise Weak Areas',
    desc: 'Go back to topics where you got stuck. Read again, solve again.',
  },
  {
    icon: <BarChart2 className="w-4 h-4" />,
    title: 'Track Progress',
    desc: 'Mark the topic as done and move to the next one with a clear head.',
  },
]

const FAQ_ITEMS = [
  {
    q: 'Who is LearnX built for?',
    a: 'Students in Class 5 to Class 12. The content maps to CBSE and most state board syllabi for the core subjects listed.',
  },
  {
    q: 'Is this free?',
    a: 'Yes. LearnX is completely free. No subscription, no paywall on notes or PYQs.',
  },
  {
    q: 'Who makes the content?',
    a: 'LearnX started as a personal project. Notes and questions are based on standard textbooks and past papers — nothing invented.',
  },
  {
    q: 'Can I report an error or suggest a topic?',
    a: 'Yes. Use the feedback link at the bottom. If something is wrong or missing, please flag it.',
  },
]

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const TOPICS_LIST = [
  'Algebra – Linear Equations',
  'Geometry – Triangles',
  'Trigonometry – Basic Ratios',
  'Mensuration – Area & Volume',
  'Statistics – Mean, Median, Mode',
  'Algebra – Quadratic Equations',
]

// ── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-canvas border-b border-stroke">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">

        <a href="#" className="flex items-center gap-2 text-heading font-bold text-lg tracking-tight no-underline">
          <span className="w-7 h-7 rounded-md bg-accent flex items-center justify-center text-white text-sm font-bold select-none">L</span>
          LearnX
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className="lx-nav-link">{l.label}</a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="#subjects" className="lx-btn-outline">Explore Subjects</a>
          <a href="#what"     className="lx-btn-primary">Start Learning</a>
        </div>

        <button
          onClick={() => setOpen(v => !v)}
          className="md:hidden p-2 text-ink hover:text-heading transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden border-t border-stroke bg-canvas px-6 py-5 flex flex-col gap-4"
          >
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="lx-nav-link text-sm">
                {l.label}
              </a>
            ))}
            <div className="pt-3 border-t border-stroke flex flex-col gap-3">
              <a href="#subjects" onClick={() => setOpen(false)} className="lx-btn-outline justify-center">Explore Subjects</a>
              <a href="#what"     onClick={() => setOpen(false)} className="lx-btn-primary justify-center">Start Learning</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="py-24 px-6 border-b border-stroke">
      <div className="max-w-3xl mx-auto">

        <motion.p {...fadeUp(0)} className="lx-label">
          Student-built · Open · Free
        </motion.p>

        <motion.h1
          {...fadeUp(0.06)}
          className="text-4xl md:text-5xl font-bold text-heading mb-5 leading-tight"
        >
          Study smarter,<br />not longer.
        </motion.h1>

        <motion.p {...fadeUp(0.12)} className="text-lg text-ink leading-relaxed max-w-2xl mb-8">
          Notes, practice questions, PYQs, and progress tracking — all organised in one place so you can focus on learning instead of searching.
        </motion.p>

        <motion.div {...fadeUp(0.18)} className="flex flex-wrap gap-3 mb-12">
          <a href="#what"     className="lx-btn-primary">Start Learning <ArrowRight className="w-4 h-4" /></a>
          <a href="#subjects" className="lx-btn-outline">Explore Subjects</a>
        </motion.div>

        {/* Founder note */}
        <motion.blockquote
          {...fadeUp(0.24)}
          className="border-l-2 border-accent pl-5 py-1 max-w-xl"
        >
          <p className="text-sm text-ink italic leading-relaxed">
            "I built LearnX because I was tired of keeping notes in one place, PYQs in another, and practice questions somewhere else."
          </p>
          <footer className="text-xs text-muted mt-2 font-medium">— The person who made this</footer>
        </motion.blockquote>

      </div>
    </section>
  )
}

// ── Why LearnX ───────────────────────────────────────────────────────────────
function WhySection() {
  return (
    <section id="why" className="py-20 px-6 border-b border-stroke">
      <div className="max-w-5xl mx-auto">
        <motion.p {...fadeUp(0)}    className="lx-label">Why LearnX?</motion.p>
        <motion.h2 {...fadeUp(0.05)} className="lx-heading">Problems every student knows</motion.h2>
        <motion.p {...fadeUp(0.1)}  className="text-ink text-base leading-relaxed max-w-xl mb-12">
          These aren't made-up pain points. If you've studied for exams, you've run into at least some of these.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PROBLEMS.map((p, i) => (
            <motion.div key={i} {...fadeUp(i * 0.07)} className="lx-card p-6">
              <div className="text-2xl mb-4">{p.icon}</div>
              <h3 className="font-semibold text-heading mb-2 text-base">{p.title}</h3>
              <p className="text-sm text-ink leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── What You'll Find ─────────────────────────────────────────────────────────
function WhatSection() {
  return (
    <section id="what" className="py-20 px-6 border-b border-stroke bg-surface">
      <div className="max-w-5xl mx-auto">
        <motion.p {...fadeUp(0)}    className="lx-label">What You'll Find</motion.p>
        <motion.h2 {...fadeUp(0.05)} className="lx-heading">Everything in one place</motion.h2>
        <motion.p {...fadeUp(0.1)}  className="text-ink text-base leading-relaxed max-w-xl mb-12">
          Four things, done well. No extra clutter.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {RESOURCES.map((r, i) => (
            <motion.div key={i} {...fadeUp(i * 0.08)} className="lx-card p-6 flex gap-5">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: r.bg, color: r.color }}
              >
                {r.emoji}
              </div>
              <div>
                <h3 className="font-semibold text-heading mb-1 text-base">{r.title}</h3>
                <p className="text-sm text-ink leading-relaxed">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Subjects ─────────────────────────────────────────────────────────────────
function SubjectsSection() {
  return (
    <section id="subjects" className="py-20 px-6 border-b border-stroke">
      <div className="max-w-5xl mx-auto">
        <motion.p {...fadeUp(0)}    className="lx-label">Subjects</motion.p>
        <motion.h2 {...fadeUp(0.05)} className="lx-heading">What's available right now</motion.h2>
        <motion.p {...fadeUp(0.1)}  className="text-ink text-base leading-relaxed max-w-xl mb-12">
          Core subjects for Class 5–12. More topics get added as they're ready — no fake chapter counts.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SUBJECTS.map((s, i) => (
            <motion.div key={i} {...fadeUp(i * 0.07)} className="lx-card p-5 flex flex-col">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="text-2xl">{s.icon}</span>
                <h3 className="font-semibold text-heading text-base">{s.name}</h3>
              </div>
              <ul className="space-y-2 flex-1">
                {s.topics.map((t, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-ink">
                    <span className="w-1.5 h-1.5 rounded-full bg-stroke flex-shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
              <a href="#what" className="mt-5 text-xs font-semibold text-accent hover:underline flex items-center gap-1">
                Start studying <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Workflow ─────────────────────────────────────────────────────────────────
function WorkflowSection() {
  return (
    <section id="workflow" className="py-20 px-6 border-b border-stroke bg-surface">
      <div className="max-w-2xl mx-auto">
        <motion.p {...fadeUp(0)}    className="lx-label">Study Workflow</motion.p>
        <motion.h2 {...fadeUp(0.05)} className="lx-heading">A simple routine that works</motion.h2>
        <motion.p {...fadeUp(0.1)}  className="text-ink text-base leading-relaxed mb-12">
          No complex learning paths. Four steps to get through any topic properly.
        </motion.p>

        <div>
          {WORKFLOW.map((w, i) => (
            <motion.div key={i} {...fadeUp(i * 0.09)}>
              <div className="flex gap-5 items-start">
                {/* Step circle + line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-accent"
                    style={{ background: '#EEF1FE', border: '1px solid #c7d0fd' }}
                  >
                    {w.icon}
                  </div>
                  {i < WORKFLOW.length - 1 && <div className="lx-step-line" />}
                </div>

                {/* Text */}
                <div className={i < WORKFLOW.length - 1 ? 'pb-8' : ''}>
                  <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-0.5">
                    Step {i + 1}
                  </p>
                  <h3 className="font-semibold text-heading mb-1">{w.title}</h3>
                  <p className="text-sm text-ink leading-relaxed">{w.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Dashboard Preview ────────────────────────────────────────────────────────
function DashboardSection() {
  const [checked, setChecked]   = useState([true, true, true, false, false, false])
  const [streak,  setStreak]    = useState(3)
  const [todayIn, setTodayIn]   = useState(false)

  const done  = checked.filter(Boolean).length
  const total = checked.length
  const pct   = Math.round((done / total) * 100)

  const toggle = (i) =>
    setChecked(prev => { const n = [...prev]; n[i] = !n[i]; return n })

  const checkIn = () => {
    if (!todayIn) { setTodayIn(true); setStreak(s => s + 1) }
  }

  const revisionNote =
    done === 0      ? 'No topics completed yet. Start with the first one.' :
    done < 3        ? 'Good start. Keep the pace up through the week.' :
    done < 5        ? 'Solid progress. Revisit ticked topics once before the test.' :
    done === total  ? 'All done. Time to attempt PYQs and revise weak spots.' :
                      'Almost there. Finish the remaining topics then do a full revision.'

  return (
    <section id="dashboard" className="py-20 px-6 border-b border-stroke">
      <div className="max-w-5xl mx-auto">
        <motion.p {...fadeUp(0)}    className="lx-label">Progress Dashboard</motion.p>
        <motion.h2 {...fadeUp(0.05)} className="lx-heading">Keep track as you go</motion.h2>
        <motion.p {...fadeUp(0.1)}  className="text-ink text-base leading-relaxed max-w-xl mb-12">
          A simple, honest view of where you are. Tick off topics as you finish them. No points, no badges — just clarity.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* ── Stat cards column ── */}
          <motion.div {...fadeUp(0.08)} className="flex flex-col gap-4">

            {/* Topics completed */}
            <div className="lx-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <ListChecks className="w-4 h-4 text-accent" />
                <span className="text-xs font-semibold text-muted uppercase tracking-wider">Topics Completed</span>
              </div>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-3xl font-bold text-heading">{done}</span>
                <span className="text-sm text-muted mb-0.5">of {total} this week</span>
              </div>
              <div className="lx-progress-track">
                <div className="lx-progress-fill" style={{ width: `${pct}%` }} />
              </div>
              <p className="text-xs text-muted mt-2">{pct}% of weekly goal</p>
            </div>

            {/* Streak */}
            <div className="lx-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4" style={{ color: '#F59E0B' }} />
                <span className="text-xs font-semibold text-muted uppercase tracking-wider">Study Streak</span>
              </div>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-3xl font-bold text-heading">{streak}</span>
                <span className="text-sm text-muted mb-0.5">day{streak !== 1 ? 's' : ''}</span>
              </div>

              {/* Week dots */}
              <div className="flex justify-between mb-4">
                {WEEK_DAYS.map((d, i) => {
                  const active = i < streak - (todayIn ? 0 : 1) + (todayIn ? 1 : 0)
                  return (
                    <div key={d} className="flex flex-col items-center gap-1">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors"
                        style={{
                          background: active ? '#EEF1FE' : '#F5F4F2',
                          border: `1px solid ${active ? '#4F6AF5' : '#E8E6E3'}`,
                          color: active ? '#4F6AF5' : '#9B9693',
                        }}
                      >
                        {active ? '✓' : d[0]}
                      </div>
                      <span className="text-[9px] text-muted">{d.slice(0,2)}</span>
                    </div>
                  )
                })}
              </div>

              <button
                onClick={checkIn}
                disabled={todayIn}
                className="w-full py-2 rounded-lg text-sm font-semibold transition-colors"
                style={{
                  background: todayIn ? '#F0FBF4' : '#F5F4F2',
                  border: `1px solid ${todayIn ? '#34C26A55' : '#E8E6E3'}`,
                  color: todayIn ? '#34C26A' : '#4A4744',
                  cursor: todayIn ? 'default' : 'pointer',
                }}
              >
                {todayIn ? '✓ Checked in today' : 'Check in for today'}
              </button>
            </div>

            {/* Weekly goal */}
            <div className="lx-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-accent" />
                <span className="text-xs font-semibold text-muted uppercase tracking-wider">Weekly Goal</span>
              </div>
              <p className="text-sm text-ink leading-relaxed">
                Complete <strong className="text-heading">{total} topics</strong> by Sunday. Currently at {done}.
              </p>
              <p className="text-xs text-muted mt-3">
                {total - done > 0
                  ? `${total - done} topic${total - done > 1 ? 's' : ''} remaining.`
                  : '🎉 Goal met for this week.'}
              </p>
            </div>

          </motion.div>

          {/* ── Checklist ── */}
          <motion.div {...fadeUp(0.12)} className="lg:col-span-2">
            <div className="lx-card p-6 h-full flex flex-col">

              <div className="flex items-center justify-between mb-5 pb-4 border-b border-stroke">
                <div>
                  <h3 className="font-semibold text-heading">This Week — Mathematics</h3>
                  <p className="text-xs text-muted mt-0.5">Tick off topics as you finish them</p>
                </div>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-md"
                  style={{ background: '#EEF1FE', color: '#4F6AF5' }}
                >
                  {done}/{total} done
                </span>
              </div>

              <ul className="space-y-3 flex-1">
                {TOPICS_LIST.map((topic, i) => (
                  <li key={i}>
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-center gap-3 text-left group"
                    >
                      <div
                        className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-colors"
                        style={{
                          background: checked[i] ? '#4F6AF5' : 'transparent',
                          border: `1px solid ${checked[i] ? '#4F6AF5' : '#E8E6E3'}`,
                          color: '#fff',
                        }}
                      >
                        {checked[i] && <Check className="w-3 h-3" />}
                      </div>
                      <span
                        className="text-sm transition-colors"
                        style={{
                          textDecoration: checked[i] ? 'line-through' : 'none',
                          color: checked[i] ? '#9B9693' : '#4A4744',
                        }}
                      >
                        {topic}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-stroke">
                <div className="flex items-center gap-2 mb-2">
                  <BookMarked className="w-4 h-4 text-muted" />
                  <span className="text-xs font-semibold text-muted uppercase tracking-wider">Revision Status</span>
                </div>
                <p className="text-sm text-ink leading-relaxed">{revisionNote}</p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section className="py-20 px-6 border-b border-stroke bg-surface">
      <div className="max-w-2xl mx-auto">
        <motion.p {...fadeUp(0)}    className="lx-label">FAQ</motion.p>
        <motion.h2 {...fadeUp(0.05)} className="lx-heading">Common questions</motion.h2>

        <div className="mt-8 space-y-3">
          {FAQ_ITEMS.map((faq, i) => {
            const isOpen = openIdx === i
            return (
              <motion.div key={i} {...fadeUp(i * 0.06)} className="lx-card overflow-hidden">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex justify-between items-center px-5 py-4 text-left"
                >
                  <span className="font-medium text-heading text-sm">{faq.q}</span>
                  <ChevronDown
                    className="w-4 h-4 text-muted flex-shrink-0 transition-transform duration-200"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22 }}
                      className="border-t border-stroke bg-surface"
                    >
                      <p className="px-5 py-4 text-sm text-ink leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-12 px-6 bg-canvas border-t border-stroke">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between gap-10">

        <div className="max-w-xs">
          <div className="flex items-center gap-2 font-bold text-heading mb-3">
            <span className="w-6 h-6 rounded bg-accent flex items-center justify-center text-white text-xs font-bold select-none">L</span>
            LearnX
          </div>
          <p className="text-sm text-muted leading-relaxed">
            Everything you need to study, in one place. Built by a student, for students.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-8">
          <div>
            <h4 className="text-xs font-semibold text-heading uppercase tracking-wider mb-3">Study</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="#what"      className="hover:text-ink transition-colors">Notes</a></li>
              <li><a href="#what"      className="hover:text-ink transition-colors">Practice Questions</a></li>
              <li><a href="#what"      className="hover:text-ink transition-colors">PYQs</a></li>
              <li><a href="#dashboard" className="hover:text-ink transition-colors">Progress Tracker</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-heading uppercase tracking-wider mb-3">Subjects</h4>
            <ul className="space-y-2 text-sm text-muted">
              {SUBJECTS.map(s => (
                <li key={s.name}><a href="#subjects" className="hover:text-ink transition-colors">{s.name}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-heading uppercase tracking-wider mb-3">Site</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="#why"      className="hover:text-ink transition-colors">Why LearnX</a></li>
              <li><a href="#workflow" className="hover:text-ink transition-colors">Workflow</a></li>
              <li><a href="#"        className="hover:text-ink transition-colors">Send Feedback</a></li>
            </ul>
          </div>
        </div>

      </div>

      <div className="max-w-5xl mx-auto mt-10 pt-6 border-t border-stroke flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-xs text-muted">&copy; {new Date().getFullYear()} LearnX. A student project.</p>
        <p className="text-xs text-muted">Built for learning, not for profit.</p>
      </div>
    </footer>
  )
}

// ── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="bg-canvas min-h-screen font-sans text-ink antialiased">
      <Navbar />
      <main>
        <Hero />
        <WhySection />
        <WhatSection />
        <SubjectsSection />
        <WorkflowSection />
        <DashboardSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}

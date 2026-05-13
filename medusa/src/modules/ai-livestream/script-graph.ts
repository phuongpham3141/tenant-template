import type { ScriptSegment, TransitionRule, TransitionCondition, DirectorSession } from "./types"

export interface GraphContext {
  loopIteration: number
  viewerCount: number
  engagementScore: number
  productInStock: boolean
  hourOfDay: number
  dayOfWeek: number
}

export function evaluateCondition(cond: TransitionCondition, ctx: GraphContext): boolean {
  if (cond.viewerCountGt !== undefined && !(ctx.viewerCount > cond.viewerCountGt)) return false
  if (cond.viewerCountLt !== undefined && !(ctx.viewerCount < cond.viewerCountLt)) return false
  if (cond.hourOfDayIn && !cond.hourOfDayIn.includes(ctx.hourOfDay)) return false
  if (cond.dayOfWeekIn && !cond.dayOfWeekIn.includes(ctx.dayOfWeek)) return false
  if (cond.productInStock !== undefined && cond.productInStock !== ctx.productInStock) return false
  if (cond.engagementScoreGt !== undefined && !(ctx.engagementScore > cond.engagementScoreGt)) return false
  if (cond.loopIterationMod) {
    if (ctx.loopIteration % cond.loopIterationMod.mod !== cond.loopIterationMod.eq) return false
  }
  return true
}

/**
 * Pick next segment given graph + runtime context.
 * Strategy:
 *   1. Group transition rules from current segment by priority (lower = checked first)
 *   2. Within a priority group, evaluate conditions; collect candidates with matching conditions
 *   3. If any candidate matches non-fallback condition → weighted random sample from matches
 *   4. Else move to next priority group
 *   5. Fallback: pick any rule with randomFallback=true via weighted random
 *   6. If still none: return null (director should end / loop)
 */
export function pickNextSegment(
  currentSegmentId: string,
  transitions: TransitionRule[],
  ctx: GraphContext
): { nextSegmentId: string | null; reason: string } {
  const fromCurrent = transitions.filter((t) => t.fromSegmentId === currentSegmentId)
  if (fromCurrent.length === 0) return { nextSegmentId: null, reason: "no_transitions_from_current" }

  const priorityGroups = new Map<number, TransitionRule[]>()
  for (const t of fromCurrent) {
    const arr = priorityGroups.get(t.priority) ?? []
    arr.push(t)
    priorityGroups.set(t.priority, arr)
  }

  const sortedPriorities = [...priorityGroups.keys()].sort((a, b) => a - b)
  for (const p of sortedPriorities) {
    const group = priorityGroups.get(p)!
    const matched = group.filter((t) => {
      if (t.condition.randomFallback) return false
      return evaluateCondition(t.condition, ctx)
    })
    if (matched.length > 0) {
      const picked = weightedSample(matched)
      return { nextSegmentId: picked.toSegmentId, reason: `priority=${p}_matched=${matched.length}` }
    }
  }

  // Fallback: random among randomFallback=true
  const fallbacks = fromCurrent.filter((t) => t.condition.randomFallback)
  if (fallbacks.length > 0) {
    const picked = weightedSample(fallbacks)
    return { nextSegmentId: picked.toSegmentId, reason: "fallback_random" }
  }

  return { nextSegmentId: null, reason: "no_matching_transition" }
}

function weightedSample(rules: TransitionRule[]): TransitionRule {
  const total = rules.reduce((s, r) => s + Math.max(r.weight, 0), 0)
  if (total <= 0) return rules[0]
  let r = Math.random() * total
  for (const rule of rules) {
    r -= Math.max(rule.weight, 0)
    if (r <= 0) return rule
  }
  return rules[rules.length - 1]
}

export function renderDialogueTemplate(template: string, vars: Record<string, unknown>): string {
  return template.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, path: string) => {
    const segments = path.split(".")
    let val: any = vars
    for (const s of segments) val = val?.[s]
    return val === undefined || val === null ? "" : String(val)
  })
}

export function pickStartSegment(segments: ScriptSegment[], startSegmentId: string | null): ScriptSegment | null {
  if (startSegmentId) {
    return segments.find((s) => s.id === startSegmentId) ?? null
  }
  // Fallback: lowest order_hint with type 'intro'
  const intros = segments.filter((s) => s.segmentType === "intro").sort((a, b) => a.orderHint - b.orderHint)
  if (intros[0]) return intros[0]
  // Last resort: lowest order_hint of any
  return [...segments].sort((a, b) => a.orderHint - b.orderHint)[0] ?? null
}

export function snapshotDirectorAsGraphCtx(session: DirectorSession, productInStock: boolean): GraphContext {
  const now = new Date()
  return {
    loopIteration: session.loopIteration,
    viewerCount: session.viewerCount,
    engagementScore: session.engagementScore,
    productInStock,
    hourOfDay: now.getHours(),
    dayOfWeek: now.getDay(),
  }
}

import type { GitHubView } from '~/types'

export const VERSION_COLOR = {
  major: 'bg-rose-500/15 text-rose-700 dark:text-rose-300',
  minor: 'bg-purple-500/15 text-purple-700 dark:text-purple-300',
  patch: 'bg-green-500/15 text-green-700 dark:text-green-300',
  pre: 'bg-teal-500/15 text-teal-700 dark:text-teal-300',
}

/**
 * Matches the input string against the rules in `UI.githubView.mainLogoOverrides`
 * or `UI.githubView.subLogoMatches`, and returns the matching URL/Icon.
 */
export function matchLogo(
  input: string,
  logos: GitHubView['mainLogoOverrides'] | GitHubView['subLogoMatches']
) {
  for (const [pattern, logo] of logos) {
    if (typeof pattern === 'string') {
      if (input === pattern) {
        return logo
      }
    } else if (pattern instanceof RegExp) {
      if (pattern.test(input)) {
        return logo
      }
    }
  }
  return undefined
}

/**
 * Extracts the package name (before the `@` version part) from a `tagName`.
 */
export function extractPackageName(tagName: string) {
  const match = tagName.match(/(^@?[^@]+?)(?:@)/)
  if (match) return match[1]
  return tagName
}

/**
 * Extracts the version number from a `tagName`.
 */
export function extractVersionNum(tagName: string) {
  const match = tagName.match(/.+(\d+\.\d+\.\d+(?:-[\w.]+)?)(?:\s|$)/)
  if (match) return match[1]
  return tagName
}

/**
 * Processes the version number and return the highlighted and non-highlighted parts.
 */
export function processVersion(
  versionNum: string
): ['major' | 'minor' | 'patch' | 'pre', string, string] {
  const parts = versionNum.split(/(\.)/g)
  let highlightedIndex = -1
  let versionType: 'major' | 'minor' | 'patch' | 'pre'

  for (let i = parts.length - 1; i >= 0; i--) {
    if (parts[i] !== '.') {
      const num = +parts[i]
      if (!Number.isNaN(num) && num > 0) {
        highlightedIndex = i
        break
      }
    }
  }

  if (highlightedIndex === 0) {
    versionType = 'major'
  } else if (highlightedIndex === 2) {
    versionType = 'minor'
  } else if (highlightedIndex === 4) {
    versionType = 'patch'
  } else {
    versionType = 'pre'
  }

  const nonHighlightedPart = parts.slice(0, highlightedIndex).join('')
  const highlightedPart = parts.slice(highlightedIndex).join('')

  return [versionType, nonHighlightedPart, highlightedPart]
}

/**
 * Check if the current time is in the same month as the previous time
 */
export function isDiffMonth(currentTime: string, preTime?: string) {
  return preTime
    ? new Date(currentTime).getMonth() !== new Date(preTime!).getMonth()
    : false
}

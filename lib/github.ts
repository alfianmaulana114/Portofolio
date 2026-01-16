'use server'

export async function getGithubContributions(username: string, year: number) {
    // Sanitize and validate input
    if (!username || typeof username !== 'string' || !/^[a-zA-Z0-9-]+$/.test(username)) {
        console.error('Invalid username provided')
        return { contributions: [], total: 0 }
    }

    try {
        const token = process.env.GITHUB_TOKEN

        if (!token || token === 'your_github_token_here') {
            console.warn('GitHub token not configured. Using public API with rate limits.')
        }

        const query = `
          query($userName:String!, $from:DateTime!, $to:DateTime!) {
            user(login: $userName) {
              contributionsCollection(from: $from, to: $to) {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                      contributionLevel
                    }
                  }
                }
              }
            }
          }
        `

        // Security: Validate year range
        const currentYear = new Date().getFullYear()
        const validYear = Math.max(2000, Math.min(year, currentYear + 1))

        const variables = {
            userName: username,
            from: `${validYear}-01-01T00:00:00Z`,
            to: `${validYear}-12-31T23:59:59Z`
        }

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        }

        // Only add authorization if token is properly configured
        if (token && token !== 'your_github_token_here') {
            headers['Authorization'] = `Bearer ${token}`
        }

        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers,
            body: JSON.stringify({ query, variables }),
            next: { revalidate: 3600 } // Cache for 1 hour
        })

        const data = await response.json()

        if (data.errors) {
            console.error('GitHub GraphQL errors:', data.errors)
            return { contributions: [], total: 0 }
        }

        if (!data.data?.user?.contributionsCollection) {
            console.error('No contribution data found')
            return { contributions: [], total: 0 }
        }

        const calendar = data.data.user.contributionsCollection.contributionCalendar
        const weeks = calendar.weeks
        const contributions: Array<{ date: string; count: number; level: number }> = []

        weeks.forEach((week: any) => {
            week.contributionDays.forEach((day: any) => {
                const level = day.contributionLevel === 'NONE' ? 0 :
                    day.contributionLevel === 'FIRST_QUARTILE' ? 1 :
                        day.contributionLevel === 'SECOND_QUARTILE' ? 2 :
                            day.contributionLevel === 'THIRD_QUARTILE' ? 3 : 4

                contributions.push({
                    date: day.date,
                    count: day.contributionCount,
                    level: level
                })
            })
        })

        return {
            contributions,
            total: calendar.totalContributions
        }
    } catch (error) {
        console.error('Error fetching github contributions:', error)
        return { contributions: [], total: 0 }
    }
}

'use client'

import React, { useEffect, useState } from 'react'
import { Github, Loader2, Calendar, ExternalLink, GitCommit, BookOpen } from 'lucide-react'
import { getGithubContributions } from '@/lib/github'
import { cn } from '@/lib/utils'
import { AnimatedContent } from '@/components/react-bits/AnimatedContent'
import { AnimatedCounter } from '@/components/react-bits/AnimatedCounter'

interface GithubStats {
    public_repos: number
}

interface ContributionDay {
    date: string
    count: number
    level: number
}

export default function GithubActivity() {
    const [stats, setStats] = useState<GithubStats | null>(null)
    const [contributions, setContributions] = useState<ContributionDay[]>([])
    const [totalContributions, setTotalContributions] = useState(0)
    const [loading, setLoading] = useState(true)
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
    const username = 'alfianmaulana114'

    const currentYear = new Date().getFullYear()
    const years = [currentYear, currentYear - 1]

    useEffect(() => {
        fetch(`https://api.github.com/users/${username}`)
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error('Error fetching github stats:', err))
    }, [])

    useEffect(() => {
        setLoading(true)
        getGithubContributions(username, selectedYear)
            .then(result => {
                setContributions(result.contributions)
                setTotalContributions(result.total)
                setLoading(false)
            })
            .catch(err => {
                console.error('Error loading contributions:', err)
                setLoading(false)
            })
    }, [selectedYear])

    const getColor = (level: number) => {
        // React Blue theme colors
        if (level === 0) return 'bg-muted' // Empty
        if (level === 1) return 'bg-[#61dafb]/20'
        if (level === 2) return 'bg-[#61dafb]/40'
        if (level === 3) return 'bg-[#61dafb]/70'
        return 'bg-[#61dafb]' // Max
    }

    const weeks: ContributionDay[][] = []
    let currentWeek: ContributionDay[] = []

    contributions.forEach((day, index) => {
        const dayOfWeek = new Date(day.date).getDay()
        if (index === 0 && dayOfWeek !== 0) {
            for (let i = 0; i < dayOfWeek; i++) {
                currentWeek.push({ date: '', count: 0, level: 0 })
            }
        }
        currentWeek.push(day)
        if (dayOfWeek === 6 || index === contributions.length - 1) {
            weeks.push(currentWeek)
            currentWeek = []
        }
    })

    const displayWeeks = weeks // Show the full year

    return (
        <section id="github" className="py-10 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-8 max-w-[1000px] relative z-10">

                {/* Header */}
                <AnimatedContent direction="top" distance={30} duration={0.8} delay={0.1}>
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#61dafb]/10 rounded-lg">
                                <Github className="h-5 w-5 text-[#61dafb]" />
                            </div>
                            <div>
                                <h2 className="font-mono text-xs font-bold uppercase tracking-tight">GitHub Activity</h2>
                                <p className="text-[10px] text-muted-foreground font-mono">@{username}</p>
                            </div>
                        </div>
                        <a
                            href={`https://github.com/${username}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-[#61dafb] transition-colors"
                        >
                            view_profile <ExternalLink className="h-3 w-3" />
                        </a>
                    </div>
                </AnimatedContent>

                {/* Refined Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <AnimatedContent direction="left" distance={40} duration={0.8} delay={0.3}>
                        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-5 flex items-center justify-between group">
                            <div>
                                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Total Repositories</p>
                                <AnimatedCounter 
                                    endValue={stats?.public_repos || 0} 
                                    duration={1.5} 
                                    delay={0.5}
                                    className="text-3xl font-black font-mono tracking-tighter"
                                />
                            </div>
                            <BookOpen className="h-8 w-8 text-[#61dafb] opacity-20 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </AnimatedContent>
                    <AnimatedContent direction="right" distance={40} duration={0.8} delay={0.3}>
                        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-5 flex items-center justify-between group">
                            <div>
                                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Yearly Commits</p>
                                <AnimatedCounter 
                                    endValue={totalContributions} 
                                    duration={2} 
                                    delay={0.7}
                                    className="text-3xl font-black font-mono tracking-tighter"
                                />
                            </div>
                            <GitCommit className="h-8 w-8 text-[#61dafb] opacity-20 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </AnimatedContent>
                </div>

                {/* Centered Contribution Graph Card */}
                <AnimatedContent direction="bottom" distance={50} duration={0.8} delay={0.5}>
                    <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6 md:p-10">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
                            <div className="flex items-center gap-2 font-mono">
                                <Calendar className="h-4 w-4 text-[#61dafb]" />
                                <span className="text-xs font-bold uppercase">Contribution Grid</span>
                            </div>

                            <div className="flex gap-2">
                                {years.map(y => (
                                    <button
                                        key={y}
                                        onClick={() => setSelectedYear(y)}
                                        className={cn(
                                            "px-4 py-1.5 text-[10px] font-mono rounded-md border transition-all",
                                            selectedYear === y
                                                ? "bg-[#61dafb] text-background border-[#61dafb] font-bold"
                                                : "bg-transparent text-muted-foreground border-border hover:border-[#61dafb]/50"
                                        )}
                                    >
                                        {y}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {loading ? (
                            <div className="w-full h-32 flex flex-col items-center justify-center gap-3">
                                <Loader2 className="h-8 w-8 animate-spin text-[#61dafb]" />
                                <span className="text-[10px] font-mono text-muted-foreground tracking-widest animate-pulse uppercase">Syncing_Data</span>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Centered Grid Wrapper */}
                                <div className="flex justify-start md:justify-center items-center overflow-x-auto pb-4 custom-scrollbar no-scrollbar px-2">
                                    <div className="flex gap-[2px] md:gap-[3px] mx-auto">
                                        {displayWeeks.map((week, wi) => (
                                            <AnimatedContent
                                                key={wi}
                                                direction="bottom"
                                                distance={20}
                                                duration={0.6}
                                                delay={0.1 + (wi * 0.05)}
                                            >
                                                <div className="flex flex-col gap-[2px] md:gap-[3px]">
                                                    {week.map((day, di) => (
                                                        <div
                                                            key={di}
                                                            className={cn(
                                                                "w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-[1px] transition-all hover:ring-1 hover:ring-[#61dafb] relative group",
                                                                day.date ? getColor(day.level) : "bg-transparent opacity-0"
                                                            )}
                                                        >
                                                            {day.date && (
                                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-popover border border-border shadow-2xl rounded text-[9px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-30 transition-opacity">
                                                                    <span className="text-[#61dafb] font-bold">{day.count}</span> contributions on {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </AnimatedContent>
                                        ))}
                                    </div>
                                </div>

                                {/* Legend */}
                                <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground pt-6 border-t border-border/50">
                                    <AnimatedCounter 
                                        endValue={totalContributions} 
                                        duration={1.5} 
                                        delay={0.1}
                                        suffix={` contributions in ${selectedYear}`}
                                        className="text-muted-foreground"
                                    />
                                    <div className="flex items-center gap-2">
                                        <span>Less</span>
                                        <div className="flex gap-1">
                                            {[0, 1, 2, 3, 4].map(l => (
                                                <div key={l} className={cn("w-2.5 h-2.5 rounded-sm", getColor(l))} />
                                            ))}
                                        </div>
                                        <span>More</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </AnimatedContent>
            </div>
        </section>
    )
}
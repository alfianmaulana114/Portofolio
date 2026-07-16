'use client'

import React, { useEffect, useState } from 'react'
import { Github, BookOpen, Activity, Loader2, Calendar } from 'lucide-react'
import { getGithubContributions } from '@/lib/github'

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
    const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3]

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
                console.log('Fetched contributions:', result.contributions.length, 'days, total:', result.total)
                setContributions(result.contributions)
                setTotalContributions(result.total)
                setLoading(false)
            })
            .catch(err => {
                console.error('Error loading contributions:', err)
                setLoading(false)
            })
    }, [selectedYear])

    // Group by week for display
    const weeks: ContributionDay[][] = []
    let currentWeek: ContributionDay[] = []

    contributions.forEach((day, index) => {
        const dayOfWeek = new Date(day.date).getDay()

        if (index === 0 && dayOfWeek !== 0) {
            // Fill empty days at the start
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

    const getColor = (level: number) => {
        if (level === 0) return '#ebedf0'
        if (level === 1) return '#9be9a8'
        if (level === 2) return '#40c463'
        if (level === 3) return '#30a14e'
        return '#216e39'
    }

    return (
        <section id="github" className="py-12 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-8 max-w-[1200px] relative z-10">
                    <div className="flex flex-col items-center mb-10 text-center">
                    <div className="flex items-center gap-2 mb-2">
                        <Activity size={14} className="text-gray-400" />
                        <span className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">GitHub Activity</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black mb-3 tracking-tighter uppercase italic text-black">GitHub Activity</h2>
                    <div className="h-1.5 w-16 bg-black"></div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8">
                    {[
                        { label: 'Total Repositories', value: stats?.public_repos ?? '0', icon: BookOpen },
                        { label: 'View profile', value: `@${username}`, icon: Github, link: `https://github.com/${username}` }
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="bg-white border-2 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between group hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 cursor-pointer"
                            onClick={() => stat.link && window.open(stat.link, '_blank')}
                        >
                            <div className="overflow-hidden">
                                <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest truncate">{stat.label}</p>
                                <p className="text-lg md:text-2xl font-black italic uppercase truncate">{stat.value}</p>
                            </div>
                            <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-black opacity-20 group-hover:opacity-100 transition-opacity shrink-0" />
                        </div>
                    ))}
                </div>

                {/* Contribution Calendar */}
                <div className="bg-white border-2 border-black p-4 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b-2 border-black pb-4">
                        <div className="flex items-center gap-3">
                            <Calendar size={20} />
                            <div>
                                <span className="text-sm font-black uppercase tracking-tight italic block">Contribution Grid</span>
                                <span className="text-[10px] font-bold text-gray-500">Yearly Commits: {totalContributions} in {selectedYear}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {years.map((y) => (
                                <button
                                    key={y}
                                    onClick={() => setSelectedYear(y)}
                                    className={`px-4 py-1.5 text-[10px] font-black border-2 border-black transition-all ${selectedYear === y
                                        ? 'bg-black text-white shadow-none translate-x-[2px] translate-y-[2px]'
                                        : 'bg-white text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]'
                                        }`}
                                >
                                    {y}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center min-h-[160px] items-center overflow-x-auto pb-6 custom-scrollbar">
                        {loading ? (
                            <div className="flex flex-col items-center gap-2 text-gray-400 italic">
                                <Loader2 className="h-8 w-8 animate-spin" />
                                <span className="text-xs font-black">Syncing_Data</span>
                            </div>
                        ) : contributions.length > 0 ? (
                            <div className="relative p-4 border border-black/5 bg-[#fcfcfc] rounded-sm">
                                <div className="flex gap-[3px] md:gap-[4px]">
                                    {weeks.map((week, weekIndex) => (
                                        <div key={weekIndex} className="flex flex-col gap-[3px] md:gap-[4px]">
                                            {week.map((day, dayIndex) => (
                                                <div
                                                    key={day.date || `empty-${weekIndex}-${dayIndex}`}
                                                    className={`w-[10px] h-[10px] md:w-[12px] md:h-[12px] border transition-all relative ${day.date ? 'hover:border-black cursor-pointer group' : ''}`}
                                                    style={{
                                                        backgroundColor: day.date ? getColor(day.level) : 'transparent',
                                                        borderColor: day.date ? (day.level === 0 ? '#ebedf0' : 'transparent') : 'transparent'
                                                    }}
                                                >
                                                    {day.date && (
                                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[8px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-20 rounded shadow-lg transition-opacity">
                                                            <span className="text-green-400">{day.count}</span> contributions on {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-gray-400 italic">
                                <BookOpen className="h-8 w-8 opacity-20" />
                                <span className="text-xs font-black uppercase">SETUP_REQUIRED</span>
                                <p className="text-[10px] font-medium max-w-xs text-center">
                                    Add GitHub token to .env.local file
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-black border-dashed flex flex-wrap justify-between items-center gap-4 text-[10px] font-black italic text-gray-400">
                        <div className="flex gap-4">
                            <span>{"// source: github_graphql_api"}</span>
                            <span>{"// year: " + selectedYear}</span>
                            <span>{"// total: " + totalContributions}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-black uppercase text-[8px]">Less</span>
                            {[0, 1, 2, 3, 4].map(level => (
                                <div key={level} className="w-3 h-3 border border-gray-300" style={{ backgroundColor: getColor(level) }} />
                            ))}
                            <span className="text-black uppercase text-[8px]">More</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

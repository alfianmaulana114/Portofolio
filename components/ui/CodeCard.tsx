"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface CodeCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string
    hideHeader?: boolean
}

export function CodeCard({ className, children, title, hideHeader = false, ...props }: CodeCardProps) {
    return (
        <div
            className={cn(
                "bg-card text-card-foreground border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50 group",
                className
            )}
            {...props}
        >
            {!hideHeader && (
                <div className="h-8 bg-muted/50 border-b border-border flex items-center px-3 justify-between">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                    </div>
                    {title && (
                        <div className="font-mono text-[10px] text-muted-foreground opacity-70 truncate max-w-[150px]">
                            {title}
                        </div>
                    )}
                    <div className="w-8" />
                </div>
            )}
            <div className="p-0">
                {children}
            </div>
        </div>
    )
}

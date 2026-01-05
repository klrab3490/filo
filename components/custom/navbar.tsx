'use client';

import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { currentUser } from '@/lib/dummy-data';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function Navbar() {
    const pathname = usePathname()

    return (
        <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/feed" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                        F
                    </div>
                    <span className="text-xl font-semibold">Flux</span>
                </Link>

                <div className="flex items-center gap-3">
                    {pathname !== '/create-post' && (
                        <Button asChild size="sm">
                            <Link href="/create-post">
                                <PlusIcon className="h-4 w-4 mr-1" />
                                Create Post
                            </Link>
                        </Button>
                    )}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <div className="flex items-center gap-2 p-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <p className="text-sm font-medium">{currentUser.name}</p>
                                    <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href={`/profile/${currentUser.id}`}>Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/feed">Feed</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/admin">Admin Dashboard</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/login">Log out</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}

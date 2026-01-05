import { twMerge } from "tailwind-merge"
import { clsx, type ClassValue } from "clsx"
import { formatDistanceToNow } from "date-fns"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
    return formatDistanceToNow(date, { addSuffix: true })
}

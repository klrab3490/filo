import type React from "react"
import { Loader2, Github } from "lucide-react"

export const Icons = {
    spinner: Loader2,
    gitHub: Github,
    google: ({ ...props }: React.SVGProps<SVGSVGElement>) => (
        <svg role="img" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.92 3.36-2.12 4.52-1.4 1.4-3.48 2.52-7.24 2.52-6.12 0-10.84-4.96-10.84-11.08 0-6.12 4.72-11.08 10.84-11.08 3.4 0 5.84 1.32 7.6 3.04l2.32-2.32C18.84 1.4 16.08 0 12.48 0 5.88 0 .32 5.56.32 12.16s5.56 12.16 12.16 12.16c3.56 0 6.24-1.16 8.36-3.36 2.16-2.16 2.84-5.24 2.84-7.68 0-.76-.04-1.48-.16-2.2H12.48z" />
        </svg>
    ),
}

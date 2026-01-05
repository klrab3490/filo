import type { PostProps } from "@/components/post-card"

export const DUMMY_POSTS: PostProps[] = [
    {
        id: "1",
        user: {
            name: "Alex Rivers",
            handle: "arivers",
            avatar: "/diverse-group-avatars.png",
        },
        content:
            "Just launched a new project! The community feedback has been incredible so far. Can't wait to see where this goes. 🚀",
        timestamp: "2h ago",
        sentiment: "Positive",
        likes: 124,
        comments: 12,
    },
    {
        id: "2",
        user: {
            name: "Sam Chen",
            handle: "schen",
            avatar: "/pandoran-bioluminescent-forest.png",
        },
        content:
            "The latest update to the framework is interesting, but I'm finding some edge cases that are hard to debug. Anyone else seeing this?",
        timestamp: "4h ago",
        sentiment: "Neutral",
        likes: 45,
        comments: 28,
    },
    {
        id: "3",
        user: {
            name: "Jordan Smith",
            handle: "jsmith",
            avatar: "/diverse-group-avatars.png",
        },
        content:
            "Honestly disappointed with the recent design changes. It feels like they removed functionality for the sake of 'minimalism'.",
        timestamp: "6h ago",
        sentiment: "Negative",
        likes: 89,
        comments: 54,
    },
]

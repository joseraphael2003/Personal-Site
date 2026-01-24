import { Scaffold } from "@/components/layout/scaffold";
import { Play } from "lucide-react";

// Mock Data
const TRACKS = [
    { id: 1, title: "Night Walk", duration: "3:42", genre: "Lofi" },
    { id: 2, title: "Code Flow", duration: "4:20", genre: "Ambient" },
    { id: 3, title: "System Boot", duration: "2:15", genre: "Synthwave" },
    { id: 4, title: "Memory Leak", duration: "3:10", genre: "Glitch" },
    { id: 5, title: "Kernel Panic", duration: "2:55", genre: "Industrial" },
    { id: 6, title: "Deep Sleep", duration: "5:00", genre: "Drone" },
];

export default function StudioPage() {
    return (
        <Scaffold>
            <div className="max-w-5xl mx-auto pb-20">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-2">Studio</h1>
                    <p className="text-muted-text text-lg">Audio Demos & Soundscapes</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {TRACKS.map((track) => (
                        <div key={track.id} className="glass-card p-4 rounded-xl flex items-center gap-4 group cursor-pointer">
                            <div className="h-16 w-16 rounded-lg bg-surface flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <Play className="w-8 h-8 fill-current" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{track.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-text">
                                    <span>{track.genre}</span>
                                    <span>•</span>
                                    <span>{track.duration}</span>
                                </div>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                {/* Visualizer bars placeholder */}
                                <div className="flex gap-1 h-6 items-end">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-1 bg-primary animate-pulse" style={{ height: `${Math.random() * 100}%` }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Scaffold>
    );
}

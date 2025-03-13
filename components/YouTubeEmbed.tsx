"use client";

import { useState } from 'react';
import Image from 'next/image';

interface YouTubeProps {
    id: string;
    width?: string | number;
    aspectRatio?: "16:9" | "4:3" | "1:1";
    className?: string;
    title?: string;
    description?: string;
}

export default function YouTube({
    id,
    width = "100%",
    aspectRatio = "16:9",
    className = "",
    title = "YouTube Video",
    description
}: YouTubeProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const thumbnailUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

    // Calculate padding-top based on aspect ratio
    const getPaddingTop = () => {
        switch (aspectRatio) {
            case "4:3": return "75%";
            case "1:1": return "100%";
            case "16:9":
            default: return "56.25%"; // 9/16 = 0.5625 or 56.25%
        }
    };

    const handleLoadVideo = () => {
        setIsLoaded(true);
    };

    return (
        <div
            className={`youtube-container ${className}`}
            style={{
                width,
                position: "relative",
                overflow: "hidden"
            }}
        >
            <div style={{ paddingTop: getPaddingTop() }}></div>

            {!isLoaded ? (
                <div
                    className="thumbnail-container"
                    onClick={handleLoadVideo}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <div style={{ position: "relative", width: "100%", height: "100%" }}>
                        <Image
                            src={thumbnailUrl}
                            alt={`${title} thumbnail`}
                            fill
                            style={{ objectFit: "cover" }}
                            loading="lazy"
                        />

                        {/* Play button overlay */}
                        <div style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "68px",
                            height: "48px",
                            backgroundColor: "rgba(0,0,0,0.7)",
                            borderRadius: "14%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <div style={{
                                width: 0,
                                height: 0,
                                borderTop: "10px solid transparent",
                                borderBottom: "10px solid transparent",
                                borderLeft: "16px solid white",
                                marginLeft: "4px"
                            }} />
                        </div>
                    </div>
                </div>
            ) : (
                <iframe
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: 0
                    }}
                    src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay"
                    allowFullScreen
                    loading="lazy"
                ></iframe>
            )}
        </div>
    );
}
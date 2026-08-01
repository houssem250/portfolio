// src/lib/hero-image.ts

const HERO_IMAGE_EXTENSIONS = [
    "jpg",
    "jpeg",
    "png",
    "webp",
    "avif",
    "gif",
];

export async function getHeroImage(): Promise<string | null> {
    for (const ext of HERO_IMAGE_EXTENSIONS) {
        const path = `/hero-image.${ext}`;

        try {
            const res = await fetch(path, {
                method: "HEAD",
                cache: "no-store",
            });

            if (res.ok) {
                return path;
            }
        } catch {
            // ignore
        }
    }

    return null;
}
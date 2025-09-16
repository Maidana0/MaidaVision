"use client"

import Image from "next/image"

const PersonalImage = ({ profile_path, name }: { profile_path: string; name: string }) => {
  const noImage = "/images/image-not-found.png"

  return (
    <div className="w-[240px] md:mx-auto h-[360px] rounded-lg overflow-hidden">
      <Image
        src={
          profile_path != null
            ? `https://image.tmdb.org/t/p/w500${profile_path}`
            : noImage
        }
        alt={name}
        width={profile_path != null ? 300 : 225}
        height={profile_path != null ? 450 : 225}
        className="!text-inherit object-contain w-full h-full"
        priority
        placeholder="blur"
        blurDataURL={noImage}
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement
          target.src = noImage
        }}
        // momentaneo para evitar el error de next/image en Vercel Edge
        unoptimized={true}
      />
    </div>
  )
}

export default PersonalImage
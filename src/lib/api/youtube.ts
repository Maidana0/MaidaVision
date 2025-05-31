
export async function validateYouTubeVideo(videoId: string | undefined): Promise<boolean> {
  if (!videoId) return false;
  const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=status&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`)
  const data = await response.json()
  return data.items.length > 0 && data.items[0].status.embeddable
}

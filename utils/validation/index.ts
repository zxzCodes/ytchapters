"use server";

export async function validateYouTubeLink(link: string): Promise<boolean> {
  // Regular expression to match various YouTube URL formats, including those with query parameters
  const isYouTubeLink = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/|shorts\/|@[\w-]+\/|channel\/)|youtu\.be\/)[\w-]{11}(\S*)?$/;
  return isYouTubeLink.test(link);
}

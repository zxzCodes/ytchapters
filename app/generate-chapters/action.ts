"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { validateYouTubeLink } from "@/utils/validation";
import { getVideoDetails, getVideoIdFromLink, getVideoTranscript } from "@/utils/youtube";
import { parseXMLContent } from "@/utils/parsing";
import { generateChaptersWithOpenAI } from "@/utils/openai";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type GenerateChapterResponse = {
  success: boolean;
  error?: string;
  data?: unknown;
};

export async function generateChapters(
  formData: FormData
): Promise<GenerateChapterResponse> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return {
      success: false,
      error: "You must be signed in to submit a chapter",
    };
  }

  const userDB =  await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })

  if(!userDB) {
    return {
      success: false,
      error: "User not found",
    }
  }

  const link = formData.get("link") as string;

  if (!link) {
    return {
      success: false,
      error: "Link is required",
    };
  }

  if (!validateYouTubeLink(link)) {
    return {
      success: false,
      error: "Invalid Youtube link",
    };
  }

  const videoId = await getVideoIdFromLink(link);

  if (!videoId) {
    return {
      success: false,
      error: "Invalid Youtube link",
    };
  }

  const videoDetails = await getVideoDetails(videoId);

  const VideoTranscript = await getVideoTranscript(videoId);

  if(!videoDetails || !VideoTranscript?.subtitles || VideoTranscript?.subtitles.length === 0) {
    return {
      success: false,
      error: "video issues",
    };
  }

const lengthSeconds =  typeof videoDetails.lengthSeconds === 'string' ? parseInt(videoDetails.lengthSeconds, 10) : videoDetails.lengthSeconds;

if(isNaN(lengthSeconds)) {
    return {
        success: false,
        error: "Failed to parse video length",
    };

} 

if(lengthSeconds > 3600) {
    return {
        success: false,
        error: "Video is too long",
    }
}



const parsedTranscript = await parseXMLContent(VideoTranscript.subtitles[0]);

if (!parsedTranscript) {
  return {
    success: false,
    error: "Failed to parse transcript",
  };

}


const openAIChapter = await generateChaptersWithOpenAI(parsedTranscript, lengthSeconds);

if (!openAIChapter) {
  return {
    success: false,
    error: "Failed to generate chapter",
  };

}

const savedChapterToDatabase = await prisma.chapterSet.create({
  data: {
    title: videoDetails.title,
    content: openAIChapter,
    userId: userDB.id
 
  }
  
})

revalidatePath('/dashboard')

return {
  success: true,
  data: savedChapterToDatabase
}



}

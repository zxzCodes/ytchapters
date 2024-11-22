'use client'
import { ChapterSet } from '@prisma/client'
import React from 'react'
import { Button } from './ui/button'
import {Copy,Check} from 'lucide-react'
import Clipboard from 'clipboard'
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { useEffect, useState } from "react";

type UserWithSavedChapters = {
  savedChapters: {
    id: string;
    title: string;
    content: string[];
    createdAt: Date;
    userId: string;
  }[];
  stripe_customer_id: string | null;
} | null;

const ITEM_PER_PAGE = 3;
export default function ChaptersWrapper({user}: {user: UserWithSavedChapters}) {
  const [copiedId, setCopiedId] = useState<string | null>(null);


  
  const [currentPage, setCurrentPage] = useState(1);

  
  const totalPages = user ? Math.ceil(user.savedChapters.length / ITEM_PER_PAGE) : 0;
  const startingIndex = (currentPage - 1) * ITEM_PER_PAGE;
  const endIndex = startingIndex + ITEM_PER_PAGE;
  const sortedChapters = user?.savedChapters.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const currentChapters = sortedChapters
    ? sortedChapters.slice(startingIndex, endIndex)
    : [];
  




  useEffect(() => {
    const clipboard = new Clipboard(".btn-copy");
    clipboard.on("success", (e) => {
      setCopiedId(e.trigger.id);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
      e.clearSelection();
    });

    return () => clipboard.destroy();
   
  }, []);
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `.custom-scrollbar::-webkit-scrollbar {
            width: 8px
        }
        .custom-scrollbar::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #555;
        }`;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);


  return (
    <div className='mt-4' >
           {
        user?.savedChapters && user.savedChapters.length > 0 && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-12'>
            {
              currentChapters.map((chapter:ChapterSet) => (
                <div key={chapter.id} className=' border border-gray-200 rounded-md p-4 
                flex flex-col h-[250px] overflow-hidden shadow-sm  hover:shadow-md transition duration-300 '>
                  <h2 className='text-lg font-semibold mb-2 truncate h-16'>{chapter.title}</h2>
                  <div className='flex-grow overflow-y-auto pr-2 custom-scrollbar'>
                    {
                      chapter.content.map((line,index) => (
                        <p key={index} className='text-sm text-gray-600 mb-1'>{line}</p>
                      ))
                    }



                  </div>
                  <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      value={"outline"}
                      className={`w-full flex justify-center items-center space-x-2 btn-copy ${
                        copiedId === chapter.id ? "bg-green-500" : ""
                      }`}
                      variant={"outline"}
                      id={chapter.id}
                      data-clipboard-text={chapter.content.join("\n")}
                    >
                      {copiedId === chapter.id ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                      <span>{copiedId === chapter.id ? "Copied" : "Copy"}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {copiedId === chapter.id
                        ? "Copied To Clipboard!"
                        : "Copy chapters to clipboard!"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
                </div>
              ))
            }

          </div>


        )
       
      }
          {user && user.savedChapters.length > 0 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => setCurrentPage(index + 1)}
                  className={`${
                    currentPage === index + 1 ? "bg-yellow-500 text-white" : ""
                  }`}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
        
    </div>
 
  )
}

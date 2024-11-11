import { Button } from "../ui/button";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import React from "react";
import { Sheet, SheetContent, SheetTrigger,SheetTitle } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import {getServerSession, Session} from 'next-auth';
import { authOptions } from "@/lib/auth";


interface NavItemProps {
  href: string;
  label: string;
  mobile?: boolean;
}

interface NavItemsProps {
  session: Session | null;
  mobile?: boolean;
}

interface MobileNavProps {
    session: Session | null;

}


const NavItem: React.FC<NavItemProps> = ({ href, label, mobile = false }) => {
  return (
    <Link
      href={href}
      className={`${
        mobile
          ? "flex w-full items-center py-2 text-lg font-semibold hover:text-primary transition-colors"
          : "text-muted-foreground hover:text-primary transition-colors"
      }`}
      prefetch={false}
    >
      {label}
    </Link>
  );
};

const NavItems: React.FC<NavItemsProps> = ({ session, mobile = false }) => {
  const items: NavItemProps[] = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/about",
      label: "About",
    },
    {
      href: "/pricing",
      label: "Pricing",
    },
    {
      href: "/contact",
      label: "Contact",
    },
  ];

  if(session) {
    items.push({
      href: "/dashboard",
      label: "Dashboard",
    }, {
        href: '/generate-chapters',
        label: 'Generate Chapters'
    }

);
  }

  return  (
    <>
    {
        items.map((item) => {
            return (
                <NavItem key={item.href} {...item} mobile={mobile} />
            )
        })
    }
    
    </>
  )
};

const MobileNav: React.FC<MobileNavProps> = ({ session }) => {
  
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"ghost"} size={"icon"} className="md:hidden">
            <MenuIcon className="h-6 w-6" />
            <SheetTitle className="sr-only">Toggle mobile menu</SheetTitle>
          </Button>
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="w-[280px] sm:w-[400px]"
        >
          <nav className="flex flex-col gap-2 space-y-4 mt-4">
              <NavItems session={session} mobile={true} />
          </nav>
        </SheetContent>
      </Sheet>
    );
  };

export default async function Nav() {
 const session = await getServerSession(authOptions);






    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop=filter]:bg-background/60">
          <MaxWidthWrapper>
            <div className="flex h-20 items-center justify-between">
              <MobileNav session={session} />
              <Link
                href="/"
                prefetch={false}
                className="flex items-center space-x-2 mr-2 "
              >
                <span className="text-xl">📜</span>
                <span className="hidden   font-bold sm:inline-block ">
                  YouTubeToChapters
                </span>
              </Link>
              
              <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                <NavItems session={session} />
              </nav>
              <div className="flex items-center space-x-4">
                {session ? (
                  <form action={"/api/auth/signout"} method="POST">
                    <Button variant={"outline"} size={"sm"} className="ml-2">
                      Sign Out
                    </Button>
                  </form>
                ) : (
                  <Link href="/signin">
                    <Button variant={"default"} size={"sm"}>
                      Sign in
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </MaxWidthWrapper>
        </header>
      );
}

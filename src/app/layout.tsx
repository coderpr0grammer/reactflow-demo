
import { Inter, } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {

    title: "InsightAI ReactFlow Demo",

};

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});


export default async function Layout({ children }: { children: React.ReactNode }) {
    // const session = await getServerSession(authOptions)
    return (

        <html
            lang="en"

            suppressHydrationWarning
            className={`${inter.variable} font-sans`}
        >

            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >

                    {children}
                    <Toaster />
                </ThemeProvider>

            </body>
        </html>
    );
}

Layout.displayName = "Layout";
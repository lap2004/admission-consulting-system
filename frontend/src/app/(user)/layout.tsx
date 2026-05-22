"use client";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

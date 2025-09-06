"use client";

import React, { ReactNode } from "react";
import { Authenticated, AuthLoading, ConvexReactClient, Unauthenticated } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { Loading } from "@/components/auth/loading";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error("Missing NEXT_PUBLIC_CONVEX_URL in your .env file");
}

interface ConvexClientProviderProps {
    children: React.ReactNode
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

const convexClient = new ConvexReactClient(convexUrl);

export const ConvexClientProvider: React.FC<ConvexClientProviderProps> = ({ children }) => {
    return (
        <ClerkProvider>
        <ConvexProviderWithClerk useAuth={useAuth} client={convexClient} >
            <Unauthenticated>{children}</Unauthenticated>
            <Authenticated>{children}</Authenticated>
            <AuthLoading><Loading /></AuthLoading>
        
        </ConvexProviderWithClerk>
        </ClerkProvider>
    )}

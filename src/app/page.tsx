"use client";

import { useRouter } from "next/navigation";
import { PromptInput, PromptInputActions } from "@/components/ui/prompt-input";
import { FrameworkSelector } from "@/components/framework-selector";
import Image from "next/image";
import LogoSvg from "@/logo.svg";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExampleButton } from "@/components/ExampleButton";
import { UserButton } from "@stackframe/stack";
import { UserApps } from "@/components/user-apps";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PromptInputTextareaWithTypingAnimation } from "@/components/prompt-input";

const queryClient = new QueryClient();

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [framework, setFramework] = useState("nextjs");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);

    router.push(
      `/app/new?message=${encodeURIComponent(prompt)}&template=${framework}`
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen p-4 relative font-manrope text-white" style={{backgroundColor: '#16311f'}}>
        <div className="flex w-full justify-between items-center">
          <Image
            className="mx-2"
            src="https://cdn.prod.website-files.com/685db84042538f71fea61a0c/685db84042538f71fea61b22_big%20grata%20logo.svg"
            alt="Grata Logo"
            width={80}
            height={80}
          />
          <div className="flex items-center gap-2 flex-1 sm:w-80 justify-end">
            <div style={{'--stack-avatar-bg': '#145d2c'} as any}>
              <UserButton />
            </div>
          </div>
        </div>

        <div>
          <div className="w-full max-w-lg px-4 sm:px-0 mx-auto flex flex-col items-center mt-16 sm:mt-24 md:mt-32 col-start-1 col-end-1 row-start-1 row-end-1 z-10">
            <p className="text-white text-center mb-6 text-3xl sm:text-4xl md:text-5xl font-light">
              Ask Grata to build
            </p>

            <div className="w-full relative my-5">
              <div className="relative w-full max-w-full overflow-hidden">
                <div className="w-full rounded-md relative z-10 border transition-colors" style={{backgroundColor: '#eeede4'}}>
                  <PromptInput
                    leftSlot={
                      <FrameworkSelector
                        value={framework}
                        onChange={setFramework}
                      />
                    }
                    isLoading={isLoading}
                    value={prompt}
                    onValueChange={setPrompt}
                    onSubmit={handleSubmit}
                    className="relative z-10 border-none bg-transparent shadow-none focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-200 transition-all duration-200 ease-in-out "
                  >
                    <PromptInputTextareaWithTypingAnimation />
                    <PromptInputActions>
                      <Button
                        variant={"ghost"}
                        size="sm"
                        onClick={handleSubmit}
                        disabled={isLoading || !prompt.trim()}
                        className="h-7 text-xs text-gray-600 hover:text-gray-800"
                      >
                        <span className="hidden sm:inline">
                          Start Creating ⏎
                        </span>
                        <span className="sm:hidden">Create ⏎</span>
                      </Button>
                    </PromptInputActions>
                  </PromptInput>
                </div>
              </div>
            </div>
            <Examples setPrompt={setPrompt} />
          </div>
        </div>
        <div className="border-t border-gray-600/30 py-8 mx-0 sm:-mx-4">
          <UserApps />
        </div>
      </main>
    </QueryClientProvider>
  );
}

function Examples({ setPrompt }: { setPrompt: (text: string) => void }) {
  return (
    <div className="mt-2 mb-16">
      <div className="flex flex-wrap justify-center gap-2 px-2">
        <ExampleButton
          text="AI Therapist"
          promptText="Create an AI-powered therapist app that provides supportive conversations and mental health resources."
          onClick={(text) => {
            console.log("Example clicked:", text);
            setPrompt(text);
          }}
        />
        <ExampleButton
          text="AI Healthcare Intake"
          promptText="Build an AI healthcare intake form that collects patient information and summarizes symptoms for clinicians."
          onClick={(text) => {
            console.log("Example clicked:", text);
            setPrompt(text);
          }}
        />
        <ExampleButton
          text="Digital Health Landing Page"
          promptText="Design a digital health landing page that showcases telemedicine services and patient testimonials."
          onClick={(text) => {
            console.log("Example clicked:", text);
            setPrompt(text);
          }}
        />
      </div>
    </div>
  );
}

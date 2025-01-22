"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="flex h-screen">
      {/* Left side - Image placeholder */}
      <div className="w-1/2 bg-neutral-900/20 flex items-center justify-center m-5 rounded-xl border border-neutral-800/60">
        <Image
          src={"/diary-high-resolution-logo-removebg-preview.png"}
          alt="logo"
          width={200}
          height={200}
          className="object-cover"
        />
      </div>

      {/* Right side - Sign-in form */}
      <div className="w-1/2 flex items-center justify-center bg-background">
        <SignIn.Root>
          <Clerk.Loading>
            {(isGlobalLoading) => (
              <>
                <SignIn.Step name="start">
                  <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                      <CardTitle className="text-2xl">Sign in</CardTitle>
                      <CardDescription>
                        Enter your email to sign in to your account
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <Clerk.Connection name="google" asChild>
                        <Button variant="outline" className="w-full">
                          <Clerk.Loading scope="provider:google">
                            {(isLoading) =>
                              isLoading ? (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <Icons.google className="mr-2 h-4 w-4" />
                              )
                            }
                          </Clerk.Loading>
                          Google
                        </Button>
                      </Clerk.Connection>
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                          </span>
                        </div>
                      </div>
                      <Clerk.Field name="identifier" className="grid gap-2">
                        <Clerk.Label asChild>
                          <Label>Email</Label>
                        </Clerk.Label>
                        <Clerk.Input type="email" required asChild>
                          <Input />
                        </Clerk.Input>
                        <Clerk.FieldError className="text-sm text-destructive" />
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                      <SignIn.Action submit asChild>
                        <Button className="w-full">
                          <Clerk.Loading>
                            {(isLoading) =>
                              isLoading ? (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                "Sign In with Email"
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </SignIn.Action>
                      <p className="mt-4 text-center text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link href="/sign-up" className="underline">
                          Sign up
                        </Link>
                      </p>
                    </CardFooter>
                  </Card>
                </SignIn.Step>

                {/* Other SignIn.Step components remain the same */}
              </>
            )}
          </Clerk.Loading>
        </SignIn.Root>
      </div>
    </div>
  );
}

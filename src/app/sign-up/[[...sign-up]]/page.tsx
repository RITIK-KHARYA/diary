"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
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

export default function SignUpPage() {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-neutral-900/20 flex items-center justify-center m-5 rounded-xl border border-neutral-800/60">
        <Image
          src={"/diary-high-resolution-logo-removebg-preview.png"}
          alt="logo"
          width={200}
          height={200}
          className="object-cover"
        />
      </div>

      {/* Right side - Sign-up form */}
      <div className="w-1/2 flex items-center justify-center bg-background">
        <SignUp.Root>
          <Clerk.Loading>
            {(isGlobalLoading) => (
              <>
                <SignUp.Step name="start">
                  <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                      <CardTitle className="text-2xl">
                        Create an account
                      </CardTitle>
                      <CardDescription>
                        Enter your details below to create your account
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
                      <Clerk.Field name="emailAddress" className="grid gap-2">
                        <Clerk.Label asChild>
                          <Label>Email</Label>
                        </Clerk.Label>
                        <Clerk.Input type="email" required asChild>
                          <Input />
                        </Clerk.Input>
                        <Clerk.FieldError className="text-sm text-destructive" />
                      </Clerk.Field>
                      <Clerk.Field name="password" className="grid gap-2">
                        <Clerk.Label asChild>
                          <Label>Password</Label>
                        </Clerk.Label>
                        <Clerk.Input type="password" required asChild>
                          <Input />
                        </Clerk.Input>
                        <Clerk.FieldError className="text-sm text-destructive" />
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                      <SignUp.Captcha className="empty:hidden" />
                      <SignUp.Action submit asChild>
                        <Button className="w-full">
                          <Clerk.Loading>
                            {(isLoading) =>
                              isLoading ? (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                "Sign Up"
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </SignUp.Action>
                      <p className="mt-4 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/sign-in" className="underline">
                          Sign in
                        </Link>
                      </p>
                    </CardFooter>
                  </Card>
                </SignUp.Step>

                <SignUp.Step name="continue">
                  <Card className="w-full max-w-md">
                    <CardHeader>
                      <CardTitle className="text-2xl">
                        Complete your profile
                      </CardTitle>
                      <CardDescription>
                        Please provide a username to complete your registration
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Clerk.Field name="username" className="grid gap-2">
                        <Clerk.Label asChild>
                          <Label>Username</Label>
                        </Clerk.Label>
                        <Clerk.Input type="text" required asChild>
                          <Input />
                        </Clerk.Input>
                        <Clerk.FieldError className="text-sm text-destructive" />
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter>
                      <SignUp.Action submit asChild>
                        <Button className="w-full">
                          <Clerk.Loading>
                            {(isLoading) =>
                              isLoading ? (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                "Continue"
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </SignUp.Action>
                    </CardFooter>
                  </Card>
                </SignUp.Step>

                <SignUp.Step name="verifications">
                  <SignUp.Strategy name="email_code">
                    <Card className="w-full max-w-md">
                      <CardHeader>
                        <CardTitle className="text-2xl">
                          Verify your email
                        </CardTitle>
                        <CardDescription>
                          We've sent a verification code to your email address
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-4">
                        <Clerk.Field name="code" className="grid gap-2">
                          <Clerk.Label className="sr-only">
                            Verification code
                          </Clerk.Label>
                          <div className="flex justify-center">
                            <Clerk.Input
                              type="otp"
                              className="flex justify-center"
                              autoSubmit
                              render={({ value, status }) => (
                                <div className="flex space-x-2">
                                  {[0, 1, 2, 3, 4, 5].map((i) => (
                                    <div
                                      key={i}
                                      className={`h-10 w-10 border rounded flex items-center justify-center text-lg font-semibold ${
                                        status === "selected" ||
                                        status === "cursor"
                                          ? "border-primary"
                                          : "border-input"
                                      }`}
                                    >
                                      {value[i] || ""}
                                    </div>
                                  ))}
                                </div>
                              )}
                            />
                          </div>
                          <Clerk.FieldError className="text-sm text-destructive text-center" />
                        </Clerk.Field>
                        <SignUp.Action
                          asChild
                          resend
                          className="text-center"
                          fallback={({ resendableAfter }) => (
                            <Button variant="link" size="sm" disabled>
                              Resend code ({resendableAfter}s)
                            </Button>
                          )}
                        >
                          <Button variant="link" size="sm">
                            Didn't receive a code? Resend
                          </Button>
                        </SignUp.Action>
                      </CardContent>
                      <CardFooter>
                        <SignUp.Action submit asChild>
                          <Button className="w-full">
                            <Clerk.Loading>
                              {(isLoading) =>
                                isLoading ? (
                                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                  "Verify Email"
                                )
                              }
                            </Clerk.Loading>
                          </Button>
                        </SignUp.Action>
                      </CardFooter>
                    </Card>
                  </SignUp.Strategy>
                </SignUp.Step>
              </>
            )}
          </Clerk.Loading>
        </SignUp.Root>
      </div>
    </div>
  );
}

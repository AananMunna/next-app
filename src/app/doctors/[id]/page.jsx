"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarDays,
  Clock,
  MapPin,
  Phone,
  Video,
  Star,
  ShieldCheck,
  Languages,
  Stethoscope,
  NotebookPen,
  MessageSquareText,
  Share2,
  CheckCircle2,
  Wallet,
  Info,
} from "lucide-react";

// ---------------------------------------------
// Mock Fetch (replace with real API call)
// ---------------------------------------------
async function fetchDoctorById(id) {
  // simulate network latency
  await new Promise((r) => setTimeout(r, 500));
  return {
    _id: "64fabc1234567890abcdef12",
    role: "doctor",
    name: "Dr. Ayesha Rahman",
    email: "ayesha.rahman@example.com",
    phone: "+8801712345678",
    profileImage: "https://cdn.example.com/profiles/ayesha.jpg",
    address: "123 Green Road, Dhaka, Bangladesh",
    dateOfBirth: "1980-05-10T00:00:00Z",
    gender: "female",
    specialties: ["Cardiology", "Internal Medicine"],
    qualifications: ["MBBS", "MD Cardiology"],
    languages: ["Bangla", "English"],
    experienceYears: 15,
    ratings: 4.7,
    totalReviews: 134,
    availability: [
      {
        dayOfWeek: 1, // Monday
        slots: [
          { startTime: "09:00", endTime: "12:00" },
          { startTime: "16:00", endTime: "19:00" },
        ],
      },
      {
        dayOfWeek: 3, // Wednesday
        slots: [{ startTime: "10:00", endTime: "14:00" }],
      },
    ],
    paymentInfo: {
      bkashNumber: "01712345678",
      bankAccountNumber: "1234567890",
      stripeCustomerId: "cus_ABC123XYZ",
    },
    isActive: true,
    createdAt: "2023-09-01T12:00:00Z",
    updatedAt: "2024-08-01T10:00:00Z",
  };
}

// ---------------------------------------------
// Utils
// ---------------------------------------------
const weekdayName = (i) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i] ?? "";
const fullWeekdayName = (i) => [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
][i] ?? "";

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

function getInitials(name) {
  return name
    .split(" ")
    .map((s) => s[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
}

function isMatchingDay(target, date) {
  const jsDay = date.getDay();
  const docDay = ((target % 7) + 7) % 7;
  return jsDay === docDay;
}

function enumerateNextDays(count = 14) {
  const days = [];
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  for (let i = 0; i < count; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
}

function to12h(t) {
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

function expandSlotsToIntervals(slot) {
  const out = [];
  const [sh, sm] = slot.startTime.split(":").map(Number);
  const [eh, em] = slot.endTime.split(":").map(Number);
  const start = sh * 60 + sm;
  const end = eh * 60 + em;
  for (let m = start; m < end; m += 30) {
    const hh = Math.floor(m / 60)
      .toString()
      .padStart(2, "0");
    const mm = (m % 60).toString().padStart(2, "0");
    out.push(`${hh}:${mm}`);
  }
  return out;
}

// ---------------------------------------------
// Page Component
// ---------------------------------------------
export default function DoctorDetailsPage({ params }) {
  const doctorId = params?.id ?? "64fabc1234567890abcdef12";
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const d = await fetchDoctorById(doctorId);
        setDoctor(d);
      } catch (e) {
        setError(e?.message ?? "Failed to load doctor");
      } finally {
        setLoading(false);
      }
    })();
  }, [doctorId]);

  if (loading) return <PageSkeleton />;
  if (error || !doctor) return <ErrorState message={error ?? "Doctor not found"} />;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Stethoscope className="h-6 w-6" />
            <span className="font-semibold tracking-tight">ShebaPoint</span>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Share2 className="h-4 w-4" /> Share
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy profile link</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button size="sm" className="gap-2">
              <MessageSquareText className="h-4 w-4" /> Message
            </Button>
            <QuickBook doctor={doctor} />
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-3 md:py-10">
        {/* Left: Profile */}
        <section className="md:col-span-2">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={doctor.profileImage} alt={doctor.name} />
                  <AvatarFallback>{getInitials(doctor.name)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">Verified</Badge>
                    {doctor.specialties.map((s) => (
                      <Badge key={s} variant="outline" className="capitalize">
                        {s}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                      {doctor.name}
                    </h1>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">{doctor.ratings.toFixed(1)}</span>
                      <span className="text-sm text-muted-foreground">({doctor.totalReviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ShieldCheck className="h-4 w-4" />
                      <span>{doctor.experienceYears} yrs experience</span>
                    </div>
                  </div>

                  <div className="mt-3 grid gap-2 text-sm text-muted-foreground md:grid-cols-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> {doctor.address}
                    </div>
                    <div className="flex items-center gap-2">
                      <Languages className="h-4 w-4" /> {doctor.languages.join(", ")}
                    </div>
                    <div className="flex items-center gap-2">
                      <NotebookPen className="h-4 w-4" /> {doctor.qualifications.join(", ")}
                    </div>
                  </div>
                </div>

                <div className="flex w-full items-center gap-2 md:w-auto">
                  <Button variant="outline" className="w-full gap-2 md:w-auto">
                    <Phone className="h-4 w-4" /> Call
                  </Button>
                  <Button className="w-full gap-2 md:w-auto">
                    <Video className="h-4 w-4" /> Video Consult
                  </Button>
                </div>
              </div>

              <Separator className="my-6" />

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 md:w-auto">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="availability">Availability</TabsTrigger>
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <Overview doctor={doctor} />
                </TabsContent>

                <TabsContent value="availability" className="mt-6">
                  <Availability doctor={doctor} />
                </TabsContent>

                <TabsContent value="about" className="mt-6">
                  <About doctor={doctor} />
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <Reviews doctor={doctor} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        {/* Right: Sidebar */}
        <aside className="space-y-6">
          <PricingCard />
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
              <CardDescription>Fast access to common tasks</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <QuickBook doctor={doctor} variant="secondary" />
              <Button variant="outline" className="justify-start gap-2">
                <MessageSquareText className="h-4 w-4" /> Send a message
              </Button>
              <Button variant="outline" className="justify-start gap-2">
                <Share2 className="h-4 w-4" /> Share profile
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Payments & Coverage</CardTitle>
              <CardDescription>Accepted methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4" /> bKash: {doctor.paymentInfo?.bkashNumber ?? "—"}
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4" /> Bank: ••••{doctor.paymentInfo?.bankAccountNumber?.slice(-4) ?? "—"}
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4" /> Stripe: {doctor.paymentInfo?.stripeCustomerId ? "Connected" : "Not connected"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profile Verification</CardTitle>
              <CardDescription>Trust & safety</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Medical license verified</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Identity verified</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Background check cleared</div>
            </CardContent>
          </Card>
        </aside>
      </main>

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background p-3 shadow-2xl md:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Star className="h-4 w-4" />
            <span className="font-medium">{doctor.ratings.toFixed(1)}</span>
            <span className="text-muted-foreground">({doctor.totalReviews})</span>
          </div>
          <QuickBook doctor={doctor} size="lg" className="flex-1" />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------
// Subcomponents
// ---------------------------------------------
function PageSkeleton() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-3 md:py-10">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-24 w-24 rounded-full" />
              <div className="space-y-3 w-full">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="mx-auto max-w-2xl p-8 text-center">
      <div className="mx-auto mb-4 h-16 w-16 rounded-full border p-3">
        <Info className="mx-auto h-full w-full" />
      </div>
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="mt-2 text-muted-foreground">{message}</p>
      <Button className="mt-6" onClick={() => location.reload()}>
        Retry
      </Button>
    </div>
  );
}

function Overview({ doctor }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Clinical Focus</CardTitle>
          <CardDescription>Primary areas of expertise</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {doctor.specialties.map((s) => (
            <Badge key={s} variant="secondary" className="capitalize">
              {s}
            </Badge>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Languages</CardTitle>
          <CardDescription>Communication comfort</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {doctor.languages.map((lang) => (
            <Badge key={lang} variant="outline" className="capitalize">
              {lang}
            </Badge>
          ))}
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Next Available Slots</CardTitle>
          <CardDescription>Book a time that works for you</CardDescription>
        </CardHeader>
        <CardContent>
          <AvailabilityCompact doctor={doctor} />
        </CardContent>
      </Card>
    </div>
  );
}

function Availability({ doctor }) {
  const days = useMemo(() => enumerateNextDays(14), []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-7">
        {days.map((d) => {
          const avail = doctor.availability.find((a) => isMatchingDay(a.dayOfWeek, d));
          const slots = avail?.slots ?? [];
          return (
            <Card key={d.toISOString()} className="overflow-hidden">
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium">
                  {weekdayName(d.getDay())}, {d.getDate()}
                </CardTitle>
                <CardDescription className="text-xs">
                  {fullWeekdayName(d.getDay())}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                {slots.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No slots</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {slots.flatMap(expandSlotsToIntervals).map((t) => (
                      <Badge key={t} variant="outline">
                        {to12h(t)}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">
        <p className="mb-2 font-medium">How booking works</p>
        <ul className="list-inside list-disc space-y-1">
          <li>Select a date & slot from above.</li>
          <li>Choose Video or In‑Person consultation.</li>
          <li>Pay securely via bKash, Nagad, or card.</li>
          <li>Get reminders 30 minutes before your visit.</li>
        </ul>
      </div>
    </div>
  );
}

function AvailabilityCompact({ doctor }) {
  const days = useMemo(() => enumerateNextDays(7), []);
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-7">
      {days.map((d) => {
        const avail = doctor.availability.find((a) => isMatchingDay(a.dayOfWeek, d));
        const has = (avail?.slots?.length ?? 0) > 0;
        return (
          <div
            key={d.toISOString()}
            className={classNames(
              "rounded-xl border p-3 text-center",
              has ? "" : "opacity-60"
            )}
          >
            <div className="text-xs text-muted-foreground">{weekdayName(d.getDay())}</div>
            <div className="text-sm font-medium">{d.getDate()}</div>
            <div className="mt-1 text-xs">{has ? "Available" : "—"}</div>
          </div>
        );
      })}
    </div>
  );
}

function About({ doctor }) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <p>
        Dr. {doctor.name.split(" ")[1]} is a seasoned {doctor.specialties[0].toLowerCase()} specialist with
        {" "}
        {doctor.experienceYears}+ years of clinical experience. She focuses on
        evidence‑based care, preventive medicine, and patient education.
      </p>
      <h4>Qualifications</h4>
      <ul>
        {doctor.qualifications.map((q) => (
          <li key={q}>{q}</li>
        ))}
      </ul>
      <h4>Clinic & Telemedicine</h4>
      <p>
        Available for secure video consultations and limited in‑person visits. For
        emergencies, call local services; this platform is not a substitute for
        emergency care.
      </p>
      <h4>Contact</h4>
      <p>
        Phone: {doctor.phone} · Email: {doctor.email}
      </p>
    </div>
  );
}

function Reviews({ doctor }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Star className="h-6 w-6" />
        <div>
          <div className="text-lg font-semibold">{doctor.ratings.toFixed(1)}</div>
          <div className="text-sm text-muted-foreground">Based on {doctor.totalReviews} reviews</div>
        </div>
      </div>
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Reviews integration coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}

function PricingCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Consultation Fees</CardTitle>
        <CardDescription>Transparent pricing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2"><Video className="h-4 w-4" /> Video Consult</span>
          <span className="font-medium">৳ 800</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2"><Stethoscope className="h-4 w-4" /> In‑Person</span>
          <span className="font-medium">৳ 1,000</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Follow‑up within 7 days</span>
          <span>Free</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Book now</Button>
      </CardFooter>
    </Card>
  );
}

function QuickBook({
  doctor,
  size = "sm",
  variant = "default",
  className,
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("video");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [note, setNote] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const next7 = useMemo(() => enumerateNextDays(7), []);

  const availableForDate = useMemo(() => {
    if (!selectedDate) return [];
    const date = new Date(selectedDate);
    const avail = doctor.availability.find((a) => isMatchingDay(a.dayOfWeek, date));
    const slots = avail?.slots ?? [];
    return slots.flatMap(expandSlotsToIntervals);
  }, [selectedDate, doctor.availability]);

  async function handleConfirmBooking() {
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      setOpen(false);
      alert(
        `Booked ${mode === "video" ? "Video" : "In‑Person"} consultation on ${new Date(
          selectedDate
        ).toDateString()} at ${to12h(selectedTime)}`
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size={size} variant={variant} className={className}>
          <CalendarDays className="mr-2 h-4 w-4" /> Book Appointment
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Book with {doctor.name}</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-6">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={mode === "video" ? "default" : "outline"}
              className="gap-2"
              onClick={() => setMode("video")}
            >
              <Video className="h-4 w-4" /> Video
            </Button>
            <Button
              variant={mode === "inperson" ? "default" : "outline"}
              className="gap-2"
              onClick={() => setMode("inperson")}
            >
              <Stethoscope className="h-4 w-4" /> In‑Person
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <div className="grid grid-cols-7 gap-2">
              {next7.map((d) => {
                const key = d.toISOString();
                const selected = selectedDate && new Date(selectedDate).toDateString() === d.toDateString();
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedDate(d.toISOString())}
                    className={classNames(
                      "rounded-xl border p-2 text-center text-sm",
                      selected ? "border-foreground" : "hover:bg-muted"
                    )}
                  >
                    <div className="text-xs text-muted-foreground">{weekdayName(d.getDay())}</div>
                    <div className="font-medium">{d.getDate()}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Time</Label>
            {selectedDate ? (
              availableForDate.length ? (
                <ScrollArea className="h-28 rounded-md border p-2">
                  <div className="flex flex-wrap gap-2">
                    {availableForDate.map((t) => (
                      <Button
                        key={t}
                        variant={selectedTime === t ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(t)}
                      >
                        {to12h(t)}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <p className="text-sm text-muted-foreground">No slots for this day.</p>
              )
            ) : (
              <p className="text-sm text-muted-foreground">Select a date first.</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Reason (optional)</Label>
            <Textarea
              placeholder="Briefly describe your symptoms or reason for visit"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="consent" checked={consent} onCheckedChange={(v) => setConsent(Boolean(v))} />
            <Label htmlFor="consent" className="text-sm text-muted-foreground">
              I agree to the Telemedicine Terms and understand this is not for emergencies.
            </Label>
          </div>

          <div className="rounded-xl bg-muted p-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Estimated fee</span>
              <span className="font-medium">{mode === "video" ? "৳ 800" : "৳ 1,000"}</span>
            </div>
          </div>
        </div>
        <SheetFooter className="mt-6">
          <Button
            className="w-full"
            disabled={!selectedDate || !selectedTime || !consent || submitting}
            onClick={handleConfirmBooking}
          >
            {submitting ? "Booking…" : "Confirm & Pay"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
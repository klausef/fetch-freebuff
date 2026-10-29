import { FetchBrand } from "@/components/FetchBrand";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { en } from "@/lib/i18n";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { useT } from "@/lib/i18n/LocaleProvider";
import { useEffect, useState } from "react";
import { Link } from "react-router";

/** Keys into `dictionary.landing`, used for a slide's two sentences. */
type LandingKey = keyof typeof en.landing;

/**
 * Slide copy, as translation keys rather than as words.
 *
 * Each slide carries its own pair of strings in every dictionary, which keeps
 * a sentence about pabili in the same place in the file as the sentence about
 * fares — so a translator can see the whole welcome flow at once instead of
 * hunting through a shared pool of unrelated strings.
 *
 * `image` is the public URL of the slide's own artwork, one file per slide,
 * read from `public/illustrations/`. Each is drawn in the crest palette on the
 * same royal-blue field as the window behind it, so the carousel is branded art
 * end to end instead of one repeated image. A slide left without `image` falls
 * back to the branded placeholder scene rather than an empty window.
 */
const SLIDES: {
  titleKey: LandingKey;
  bodyKey: LandingKey;
  image?: string;
}[] = [
  {
    titleKey: "slide1Title",
    bodyKey: "slide1Body",
    image: "/illustrations/slide-1.svg",
  },
  {
    titleKey: "slide2Title",
    bodyKey: "slide2Body",
    image: "/illustrations/slide-2.svg",
  },
  {
    titleKey: "slide3Title",
    bodyKey: "slide3Body",
    image: "/illustrations/slide-3.svg",
  },
  {
    titleKey: "slide4Title",
    bodyKey: "slide4Body",
    image: "/illustrations/slide-4.svg",
  },
];

/**
 * Fallback artwork for a welcome slide with no `image` of its own. It sketches
 * Fetch's delivery story — parcels on the move, a dotted road, sparkles — in
 * the crest palette. Every slide currently carries its own illustration, so
 * this only renders if one is ever added without artwork attached.
 */
function WelcomeScene() {
  return (
    <svg
      viewBox="0 0 400 240"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
      aria-hidden="true"
    >
      {/* Sparkles */}
      <path
        d="M0 -12 C1.6 -3.6, 3.6 -1.6, 12 0 C3.6 1.6, 1.6 3.6, 0 12 C-1.6 3.6, -3.6 1.6, -12 0 C-3.6 -1.6, -1.6 -3.6, 0 -12 Z"
        transform="translate(56 52) scale(1.2)"
        fill="#f4f4f7"
      />
      <path
        d="M0 -12 C1.6 -3.6, 3.6 -1.6, 12 0 C3.6 1.6, 1.6 3.6, 0 12 C-1.6 3.6, -3.6 1.6, -12 0 C-3.6 -1.6, -1.6 -3.6, 0 -12 Z"
        transform="translate(210 36) scale(0.45)"
        fill="#ffc72c"
      />
      <path
        d="M0 -12 C1.6 -3.6, 3.6 -1.6, 12 0 C3.6 1.6, 1.6 3.6, 0 12 C-1.6 3.6, -3.6 1.6, -12 0 C-3.6 -1.6, -1.6 -3.6, 0 -12 Z"
        transform="translate(332 46) scale(0.8)"
        fill="#f4f4f7"
        opacity="0.9"
      />
      <path
        d="M0 -12 C1.6 -3.6, 3.6 -1.6, 12 0 C3.6 1.6, 1.6 3.6, 0 12 C-1.6 3.6, -3.6 1.6, -12 0 C-3.6 -1.6, -1.6 -3.6, 0 -12 Z"
        transform="translate(352 176) scale(0.55)"
        fill="#f4f4f7"
        opacity="0.75"
      />
      <path
        d="M0 -12 C1.6 -3.6, 3.6 -1.6, 12 0 C3.6 1.6, 1.6 3.6, 0 12 C-1.6 3.6, -3.6 1.6, -12 0 C-3.6 -1.6, -1.6 -3.6, 0 -12 Z"
        transform="translate(46 182) scale(0.5)"
        fill="#f4f4f7"
        opacity="0.6"
      />

      {/* Motion lines trailing the parcels */}
      <g stroke="#ffc72c" strokeWidth="7" strokeLinecap="round" opacity="0.7">
        <line x1="86" y1="118" x2="122" y2="118" />
        <line x1="76" y1="140" x2="118" y2="140" />
        <line x1="88" y1="162" x2="112" y2="162" />
      </g>

      {/* Parcels */}
      <g transform="rotate(-7 146 96)">
        <rect x="118" y="74" width="58" height="44" rx="8" fill="#f4f4f7" />
        <rect x="142" y="74" width="10" height="44" fill="#d9dae8" />
      </g>
      <rect x="152" y="112" width="104" height="84" rx="10" fill="#ffc72c" />
      <rect x="198" y="112" width="12" height="84" fill="#e3a715" />
      <rect x="168" y="140" width="30" height="22" rx="4" fill="#e1251b" />
      <rect x="173" y="146" width="20" height="3" rx="1.5" fill="#f4f4f7" />
      <rect
        x="173"
        y="153"
        width="13"
        height="3"
        rx="1.5"
        fill="#f4f4f7"
        opacity="0.85"
      />

      {/* Dotted road the parcels travel on */}
      <path
        d="M40 210 Q200 186 360 210"
        fill="none"
        stroke="#f4f4f7"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray="1 16"
        opacity="0.45"
      />
    </svg>
  );
}

export default function Landing() {
  const t = useT();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Embla reports slide changes through "select"; track it so the pagination
  // pills and dots stay in step with swipes, taps, and arrow keys alike.
  useEffect(() => {
    if (!api) return;
    // Embla pattern (as in ui/carousel.tsx): report the initial slide once the
    // api exists. A one-time sync, not a cascade.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="soft-canvas safe-bottom relative isolate flex min-h-dvh flex-col overflow-hidden text-foreground">
      {/* Ambient colour. The glow behind the artwork is what makes the frame
          feel lit rather than pasted on. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 -left-32 size-[30rem] rounded-full bg-[radial-gradient(circle_at_center,rgb(232_182_76/0.3),transparent_65%)] blur-3xl" />
        <div className="absolute -top-24 -right-32 size-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgb(168_67_47/0.22),transparent_65%)] blur-3xl" />
        <div className="absolute -bottom-48 left-1/4 size-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgb(46_58_140/0.15),transparent_65%)] blur-3xl" />
      </div>

      {/* Brand + language */}
      <header className="safe-top relative">
        <div className="mx-auto flex w-full max-w-md items-center justify-between gap-3 px-5 pt-6 sm:max-w-xl sm:px-8 lg:max-w-2xl">
          <div className="rounded-full border border-border/50 bg-card/85 p-1 pr-4 shadow-soft-sm backdrop-blur-xl dark:border-white/10 dark:bg-card/55">
            <FetchBrand size="sm" />
          </div>
          {/* The language choice lives on the welcome screen as well as
              inside the app: somebody who cannot read this page cannot get as
              far as the header to change it. */}
          <LocaleSwitcher />
        </div>
      </header>

      {/* Welcome carousel */}
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-9 sm:max-w-xl sm:px-8 lg:max-w-2xl">
        <p className="mb-6 flex items-center justify-center gap-2 text-center text-[10px] leading-5 font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          <span
            aria-hidden="true"
            className="size-1.5 shrink-0 rounded-full bg-fetch-gold shadow-[0_0_0_4px_rgb(232_182_76/0.18)]"
          />
          {t("landing", "tagline")}
        </p>

        <Carousel
          setApi={setApi}
          className="w-full"
          aria-label={t("landing", "carouselLabel")}
        >
          <CarouselContent>
            {SLIDES.map((slide, index) => {
              const title = t("landing", slide.titleKey);
              const body = t("landing", slide.bodyKey);
              return (
                <CarouselItem
                  key={slide.titleKey}
                  className="flex flex-col items-center text-center"
                >
                  {/* The illustration window, framed as a raised card instead
                      of a bare image. The 5:3 ratio matches the artwork, so
                      nothing is cropped. */}
                  <div className="relative w-full">
                    <div
                      aria-hidden="true"
                      className="absolute -inset-5 -z-10 rounded-[3rem] bg-fetch-royal/10 blur-2xl"
                    />
                    <div className="soft-sheen rounded-[2.4rem] border border-border/55 bg-card p-2 shadow-soft-lg dark:border-white/[0.08] dark:bg-card/85">
                      <div className="relative aspect-[5/3] w-full overflow-hidden rounded-[1.7rem] bg-fetch-royal">
                        {slide.image ? (
                          <img
                            src={slide.image}
                            alt=""
                            className="absolute inset-0 size-full object-cover"
                            loading={index === 0 ? "eager" : "lazy"}
                            fetchPriority={index === 0 ? "high" : "auto"}
                            decoding="async"
                          />
                        ) : (
                          <WelcomeScene />
                        )}
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-linear-to-tr from-black/10 via-transparent to-white/20"
                        />
                        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-white uppercase backdrop-blur-md">
                          <span
                            aria-hidden="true"
                            className="size-1.5 rounded-full bg-fetch-gold"
                          />
                          Bukidnon
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* One heading per page, not one per slide. Every slide is in
                      the DOM at once, so four h1s would announce the same page
                      title four times; the first slide is the page's heading and
                      the rest are sections of the same idea. */}
                  {index === 0 ? (
                    <h1 className="mt-8 text-[2rem] leading-[1.08] font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
                      {title}
                    </h1>
                  ) : (
                    <h2 className="mt-8 text-[2rem] leading-[1.08] font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
                      {title}
                    </h2>
                  )}
                  <p className="mt-3 max-w-sm text-[15px] leading-7 text-muted-foreground sm:text-base">
                    {body}
                  </p>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        <div className="mx-auto mt-8 flex w-fit items-center gap-1.5 rounded-full border border-border/45 bg-card/70 p-1.5 shadow-inset-soft dark:border-white/[0.07] dark:bg-card/50">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.titleKey}
              type="button"
              aria-label={`${t("landing", "slide")} ${index + 1} ${SLIDES.length}`}
              aria-current={current === index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300 ease-soft",
                current === index
                  ? "w-8 bg-primary shadow-soft-sm"
                  : "w-2.5 bg-muted-foreground/25 hover:bg-muted-foreground/40",
              )}
            />
          ))}
        </div>
      </main>

      {/* Consent + entry, in a soft action dock */}
      <footer className="mx-auto w-full max-w-md px-5 pb-6 sm:max-w-xl sm:px-8 lg:max-w-2xl">
        <div className="soft-sheen rounded-[1.75rem] border border-border/55 bg-card/95 p-4 shadow-soft dark:border-white/[0.07] dark:bg-card/85 sm:p-5">
          <div className="space-y-2.5 sm:grid sm:grid-cols-2 sm:gap-2.5 sm:space-y-0">
            {/* Both doors lead into /auth: the email-code flow signs existing
                users in and creates new accounts from the same form. */}
            <Button
              asChild
              className="h-14 w-full rounded-full bg-linear-to-b from-fetch-brick to-fetch-red-deep text-[15px] font-semibold text-white shadow-soft hover:-translate-y-px hover:shadow-soft-lg active:translate-y-0 active:shadow-inset-soft"
            >
              <Link to="/auth">{t("landing", "cta")}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-14 w-full rounded-full border-border/55 bg-card text-[15px] font-semibold text-foreground shadow-soft-sm hover:-translate-y-px hover:shadow-soft active:translate-y-0 active:shadow-inset-soft dark:border-white/10 dark:bg-card/80"
            >
              <Link to="/auth">{t("landing", "ctaSignUp")}</Link>
            </Button>
          </div>

          <p className="mt-4 text-center text-[11px] leading-5 text-muted-foreground">
            {t("landing", "consent")}{" "}
            <span className="font-medium text-foreground/75">
              {t("landing", "termOfService")}
            </span>{" "}
            &{" "}
            <span className="font-medium text-foreground/75">
              {t("landing", "privacyNotice")}
            </span>
            .
          </p>

          {/* Riders are a different door, not a bigger version of the same
              one: they have to go through approval before they can take a
              booking, so the path is worth naming on the front page instead of
              leaving a driver to find it. A link rather than a third button,
              because it is the rarer of the two — the page should not give
              equal visual weight to signing up and to driving. */}
          <p className="mt-1 text-center">
            <Link
              to="/rider/register"
              className="text-sm font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
            >
              {t("landing", "riderRegistration")}
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

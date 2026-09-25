import type { Metadata } from 'next'
import { AstroBear, Moon, PandaLogo, PandaWatermark } from '@/components/brand'
import {
  Avatar,
  Badge,
  Button,
  FeatureContainer,
  IconButton,
  Link,
  Spinner,
  Surface,
  VisuallyHidden,
} from '@/components/design-system'
import { DialogShowcase } from '@/components/design-system/dialog/dialog-showcase'
import { CalendarIcon, GithubIcon, LinkIcon, LocationIcon } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Design System | Portfolio V2',
  robots: { index: false, follow: false },
}

const colorTokens = [
  ['Canvas', 'var(--color-canvas)'],
  ['Surface 1', 'var(--color-surface-1)'],
  ['Surface 2', 'var(--color-surface-2)'],
  ['Surface 3', 'var(--color-surface-3)'],
  ['Primary text', 'var(--color-text-primary)'],
  ['Muted text', 'var(--color-text-muted)'],
  ['Accent / focus', 'var(--color-accent)'],
] as const

export default function DesignSystemPage() {
  return (
    <main className="relative z-10 min-h-screen py-12">
      <PandaWatermark />
      <FeatureContainer className="grid gap-12 px-4 sm:px-6">
        <header className="grid gap-4">
          <p className="type-meta">Portfolio V2 / internal reference</p>
          <h1 className="type-display">Design system</h1>
          <p className="reading-container type-body !mx-0 text-portfolio-text-secondary">
            A small, dark, centered visual language reconstructed from Portfolio V1. This route is a
            primitive reference, not a public portfolio page.
          </p>
          <nav
            aria-label="Design system sections"
            className="flex max-w-full gap-2 overflow-x-auto pb-2 type-small"
          >
            {['Foundations', 'Primitives', 'Brand', 'Interaction'].map(section => (
              <a
                key={section}
                href={`#${section.toLowerCase()}`}
                className="focus-ring shrink-0 rounded-portfolio-md px-3 py-2 text-portfolio-text-muted hover:bg-portfolio-surface-2 hover:text-portfolio-text-primary"
              >
                {section}
              </a>
            ))}
          </nav>
        </header>

        <section id="foundations" className="grid gap-6" aria-labelledby="foundations-title">
          <h2 id="foundations-title" className="type-title">
            Foundations
          </h2>
          <Surface variant="elevated" className="grid gap-8 p-6">
            <div className="grid gap-4">
              <h3 className="type-heading">Colors</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {colorTokens.map(([label, value]) => (
                  <div key={label} className="grid gap-2">
                    <div
                      className="h-16 rounded-portfolio-md border border-portfolio-surface-3"
                      style={{ background: value }}
                    />
                    <span className="type-small font-semibold">{label}</span>
                    <code className="type-caption">{value}</code>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              <h3 className="type-heading">Typography</h3>
              <div className="grid gap-3">
                <span className="type-display">Display / fluid step 5</span>
                <span className="type-title">Title / fluid step 3</span>
                <span className="type-heading">Heading / fluid step 2</span>
                <span className="type-body">Body / fluid step 0</span>
                <span className="type-meta">Metadata / fluid step -1</span>
                <span className="type-caption">Caption / fluid step -2</span>
              </div>
            </div>
            <div className="grid gap-4">
              <h3 className="type-heading">Layout</h3>
              <div className="grid gap-3 type-small text-portfolio-text-secondary">
                <div className="feature-container rounded-portfolio-md border border-dashed border-portfolio-surface-3 p-3">
                  FeatureContainer · 824px max
                </div>
                <div className="reading-container rounded-portfolio-md border border-dashed border-portfolio-accent p-3">
                  ReadingContainer · 86% of feature
                </div>
              </div>
            </div>
          </Surface>
        </section>

        <section id="primitives" className="grid gap-6" aria-labelledby="primitives-title">
          <h2 id="primitives-title" className="type-title">
            Primitives
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Surface className="grid gap-4 p-6">
              <h3 className="type-heading">Surface</h3>
              <div className="grid gap-3">
                <Surface className="p-4">Default surface</Surface>
                <Surface variant="elevated" className="p-4">
                  Elevated surface
                </Surface>
                <Surface variant="interactive" className="p-4">
                  Interactive surface
                </Surface>
              </div>
            </Surface>
            <Surface className="grid gap-4 p-6">
              <h3 className="type-heading">Buttons</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button>Default</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="subtle">Subtle</Button>
                <IconButton label="Open actions">
                  <LinkIcon className="h-5 w-5" />
                </IconButton>
                <Button disabled>Disabled</Button>
              </div>
            </Surface>
            <Surface className="grid gap-4 p-6">
              <h3 className="type-heading">Links and badges</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="#foundations">Internal link</Link>
                <Link href="https://example.com" external>
                  External link
                </Link>
                <Badge># TypeScript</Badge>
                <Badge className="bg-portfolio-surface-2"># Design</Badge>
              </div>
            </Surface>
            <Surface className="grid gap-4 p-6">
              <h3 className="type-heading">Avatar and loading</h3>
              <div className="flex items-center gap-4">
                <Avatar alt="" fallback="TT" size="sm" />
                <Avatar alt="" fallback="TT" />
                <Avatar alt="" fallback="TT" size="lg" />
                <Spinner label="Loading preview" />
              </div>
            </Surface>
            <Surface className="grid gap-4 p-6 md:col-span-2">
              <h3 className="type-heading">Dialog</h3>
              <DialogShowcase />
            </Surface>
          </div>
        </section>

        <section id="brand" className="grid gap-6" aria-labelledby="brand-title">
          <h2 id="brand-title" className="type-title">
            Brand and icons
          </h2>
          <Surface variant="elevated" className="grid gap-8 p-6">
            <div className="flex flex-wrap items-center gap-8">
              <div className="grid justify-items-center gap-2">
                <PandaLogo className="h-20 w-24" title="Panda logo" />
                <span className="type-caption">Panda logo</span>
              </div>
              <div className="grid justify-items-center gap-2">
                <Moon className="h-24 w-24" title="Moon illustration" />
                <span className="type-caption">Moon</span>
              </div>
              <div className="grid justify-items-center gap-2">
                <AstroBear className="h-32 w-24" title="Astronaut bear" />
                <span className="type-caption">Astro bear</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-5 text-portfolio-text-secondary">
              <span className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" /> Calendar
              </span>
              <span className="flex items-center gap-2">
                <GithubIcon className="h-5 w-5" /> GitHub
              </span>
              <span className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5" /> Link
              </span>
              <span className="flex items-center gap-2">
                <LocationIcon className="h-5 w-5" /> Location
              </span>
            </div>
          </Surface>
        </section>

        <section id="interaction" className="grid gap-6" aria-labelledby="interaction-title">
          <h2 id="interaction-title" className="type-title">
            Interaction
          </h2>
          <Surface className="grid gap-4 p-6">
            <p className="type-body text-portfolio-text-secondary">
              Tab to inspect the accent focus ring. Motion tokens use short interaction feedback and
              a reduced-motion contract for decorative animation.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button>Focus me</Button>
              <Link href="#interaction">Focusable link</Link>
              <span className="motion-decorative rounded-full bg-portfolio-accent px-3 py-2 type-small font-semibold">
                Motion sample
              </span>
            </div>
            <VisuallyHidden>End of design system showcase</VisuallyHidden>
          </Surface>
        </section>
      </FeatureContainer>
    </main>
  )
}

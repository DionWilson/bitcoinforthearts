'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  FEATURED_KIND_LABEL,
  FEATURED_PROJECTS,
  type FeaturedKind,
  type FeaturedProject,
} from '@/lib/featured-projects';

const FILTERS: Array<{ id: 'all' | FeaturedKind; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'artist', label: 'Artists' },
  { id: 'community', label: 'Communities' },
  { id: 'institution', label: 'Institutions' },
  { id: 'cultural-project', label: 'Cultural projects' },
];

function countFor(id: 'all' | FeaturedKind) {
  if (id === 'all') return FEATURED_PROJECTS.length;
  return FEATURED_PROJECTS.filter((project) => project.kind === id).length;
}

function ProjectCard({ project }: { project: FeaturedProject }) {
  return (
    <Link
      href={`/artists/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background transition-colors hover:border-accent/60"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface">
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-accent">
          {FEATURED_KIND_LABEL[project.kind]}
        </div>
        <h2 className="mt-2 text-xl font-semibold tracking-tight">
          {project.name}
        </h2>
        <p className="mt-1 text-sm font-medium text-foreground">
          {project.projectTitle}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {project.cardSummary}
        </p>
        <div className="mt-4 text-sm font-semibold text-foreground">
          Open dossier →
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedProjectsGrid() {
  const [filter, setFilter] = useState<'all' | FeaturedKind>('all');

  const visible = useMemo(() => {
    if (filter === 'all') return FEATURED_PROJECTS;
    return FEATURED_PROJECTS.filter((project) => project.kind === filter);
  }, [filter]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((item) => {
          const active = filter === item.id;
          const count = countFor(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={[
                'rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors',
                active
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border bg-background text-foreground hover:bg-surface',
              ].join(' ')}
            >
              {item.label}
              <span className={active ? 'text-background/70' : 'text-muted'}>
                {' '}
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 max-w-xl text-sm leading-relaxed text-muted">
          No {FILTERS.find((item) => item.id === filter)?.label.toLowerCase()}{' '}
          dossiers are published yet. We add a project only when the record is
          specific enough to ask for support in public.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

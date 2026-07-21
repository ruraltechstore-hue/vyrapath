import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getBlogPost } from "@/data/blog";
import { buildArticleHead } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/structured-data";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => buildArticleHead(loaderData),
  component: BlogArticlePage,
});

function BlogArticlePage() {
  const post = Route.useLoaderData();

  return (
    <>
      <JsonLd
        data={[
          articleSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article>
        <header className="border-b border-border/60 bg-gradient-hero">
          <div className="container-page py-16 sm:py-20 max-w-3xl">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to resources
            </Link>
            <Badge variant="secondary" className="mt-6">{post.tag}</Badge>
            <h1 className="mt-4 font-display text-3xl sm:text-5xl font-bold tracking-tight">{post.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{post.description}</p>
            <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" /> {post.read} read · {post.publishedAt}
            </div>
          </div>
        </header>

        <div className="container-page max-w-3xl section-y">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <img src={post.cover} alt={post.title} loading="eager" className="h-full w-full object-cover" />
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none mt-10 space-y-6">
            {post.sections.map((section, i) => {
              if (section.type === "h2") {
                return (
                  <h2 key={i} className="font-display text-2xl font-bold tracking-tight mt-10">
                    {section.content}
                  </h2>
                );
              }
              if (section.type === "ul") {
                return (
                  <ul key={i} className="list-disc pl-6 space-y-2 text-muted-foreground">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              );
            })}
          </div>

          <Card className="mt-12 p-6 sm:p-8 bg-surface">
            <h2 className="font-display text-xl font-bold">Related VyraPath services</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Ready to put these ideas into practice? Explore services built for students and freshers.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {post.relatedLinks.map((link) => (
                <Button key={link.label} asChild variant="outline" size="sm">
                  <Link to={link.to} hash={link.hash}>
                    {link.label} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </article>
    </>
  );
}

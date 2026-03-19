import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!databaseUrl) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 500 },
    );
  }

  const sql = neon(databaseUrl);

  const [nodesResult, linksResult] = await Promise.all([
    sql`SELECT id, label, type, year, detail, url, size, image, image_credit, taxonomy, abstract, external_links FROM research_nodes ORDER BY type, year DESC NULLS LAST`,
    sql`SELECT source, target, strength FROM research_links`,
  ]);

  // Map snake_case DB columns to camelCase for the client
  const nodes = nodesResult.map((row: any) => ({
    id: row.id,
    label: row.label,
    type: row.type,
    year: row.year,
    detail: row.detail,
    url: row.url,
    size: row.size,
    image: row.image,
    imageCredit: row.image_credit,
    taxonomy: row.taxonomy,
    abstract: row.abstract,
    externalLinks: row.external_links || [],
  }));

  const links = linksResult.map((row: any) => ({
    source: row.source,
    target: row.target,
    strength: row.strength,
  }));

  return NextResponse.json({ nodes, links });
}
